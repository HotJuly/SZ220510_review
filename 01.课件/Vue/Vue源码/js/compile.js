function Compile(el, vm) {
    //new Compile("#app", vm);
    //this->com对象

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        // 这就是挂载
        this.$el.appendChild(this.$fragment);
        //此处就应该是mounted生命周期的执行时间
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素
        var fragment = document.createDocumentFragment(),
            child;

        // 如果将页面上的一个节点,插入到文档碎片中
        // 那么该节点会从页面上消失
        // 这里在将app元素抄家,所有的子节点全部转移到了文档碎片中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // 第一次:el->文档碎片对象
        // 第二次:el->p元素节点

        // childNodes是伪数组,[text节点,p元素节点,text节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // 第一次进入:[text节点,p元素节点,text节点].forEach(function(node) {
        // 第二次进入:[text节点].forEach(function(node) {

        // 第一次:node->p元素节点
        // 第二次:node->text节点

        // 获取到p元素节点的文本内容=>"{{msg}}"
        //     var text = node.textContent;

        // 正则中,.的意思是a-zA-Z0-9._
        // 正则语法中,出现括号,那么括号内部的内容等下可以直接获取到
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(p元素节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(text节点, 'msg');
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(p元素节点);
        //     }
        // });

    },

    compile: function(node) {
        // com.compile(p元素节点);
        // this->com对象
        // node->p元素节点
        // attributes中可以获取到当前元素的所有标签属性节点组成的伪数组
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        //me.compileText(text节点, 'msg');
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, 'msg');
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(text节点, vm, 'msg');
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, 'msg', 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, 'msg', 'text');

        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];
        // var updateFn = textUpdater;

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // textUpdater && textUpdater(text节点, this._getVMVal(vm, 'msg'));
        // textUpdater && textUpdater(text节点, 'hello mvvm');

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

        // new Watcher(vm,'msg' , function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, 'msg')

        var val = vm._data;

        // exp->["msg"]
        // exp->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        //     val = vm._data['person'];
        //     val = person['name'];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};