function $(a) {
    return document.getElementById(a)
};

function attachevent(a, b, c) {
    a.attachEvent ? a.attachEvent('on' + b, c) : a.addEventListener(b, c, false)
};

function detachevent(a, b, c) {
    a.detachEvent ? a.detachEvent('on' + b, c) : a.removeEventListener(b, c, false)
};

function nextSibling(a) {
    var n = a.nextSibling;
    return n && n.nodeType != 1 ? arguments.callee(n) : n
};

function preSibling(a) {
    var n = a.previousSibling;
    return n && n.nodeType != 1 ? arguments.callee(n) : n
};

function trim(s) {
    return s.replace(/^\s*/, '').replace(/\s*$/, '')
};

function get(a) {
    return encodeURI(trim(typeof a == 'object' ? a.value : $(a).value))
};

function addCookie(a, b, c) {
    var d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    c = c ? c.substring(0, c.lastIndexOf('/')) : '/';
    document.cookie = a + '=' + encodeURIComponent(b) + '; path=' + c + '; max-age=' + (31536000) + '; expires=' + d.toGMTString()
};

function getCookie(a) {
    var b = new RegExp('(^|;) ?' + a + '=([^;]+)(;|$)');
    var c = b.exec(document.cookie);
    return c == null ? false : decodeURIComponent(c[2])
};

function delCookie(a, b) {
    var c = new Date();
    c.setFullYear(c.getFullYear() - 1);
    b = b ? b.substring(0, b.lastIndexOf('/')) : '/';
    document.cookie = a + '= ; path=' + b + '; max-age=0; expires=' + c.toGMTString()
};
ajax = {
    createXMLHttpRequest: function() {
        return window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP')
    },
    startRequest: function(a) {
        var b = ajax.createXMLHttpRequest();
        b.onreadystatechange = function() {
            if (b.readyState == 4) {
                if (b.status == 200 && a.doRequest) {
                    a.doRequest(a.text ? b.responseText : b.responseXML)
                }
            }
        };
        b.open(a.method || 'get', a.url, true);
        b.setRequestHeader('Content-type', a.enctype || 'application/x-www-form-urlencoded');
        b.send(a.action || null)
    }
};
base64 = {
    map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    decode: function(a) {
        var b = d = '';
        for (var i = 0; i < a.length; i++) {
            if (a.substr(i, 1) == '=') {
                break
            };
            var c = this.map.indexOf(a.charAt(i)).toString(2);
            d += {
                1: '00000',
                2: '0000',
                3: '000',
                4: '00',
                5: '0',
                6: ''
            }[c.length] + c
        };
        var d = d.match(/[0-1]{8}/g);
        for (var i = 0; i < d.length; i++) {
            b += String.fromCharCode(parseInt(d[i], 2))
        };
        return b
    }
};
message = {
    box: null,
    init: function() {
        if (this.box) {
            return
        };
        var a = document.createElement('div');
        a.id = 'message';
        document.body.appendChild(a);
        this.box = a
    },
    show: function(a) {
        this.init();
        this.write(a);
        this.box.style.display = 'block';
        this.box.style.marginLeft = '-' + Math.floor(this.box.offsetWidth / 2) + 'px'
    },
    hidden: function() {
        message.box.style.display = 'none'
    },
    flash: function(a) {
        this.show(a);
        setTimeout(function() {
            message.hidden()
        }, 1000)
    },
    write: function(a) {
        this.box.innerHTML = a
    }
};

function transition(b) {
    var c = b.begin + b.change,
        startTime = new Date().getTime();
    if (b.obj.style[b.type] == c + 'px') {
        return false
    };
    (function() {
        setTimeout(function() {
            var a = new Date().getTime() - startTime,
                delta = b.ease(a / 400);
            if (delta) {
                b.obj.style[b.type] = Math.ceil(b.begin + delta * b.change) + 'px';
                b.action && b.action()
            };
            if (a >= 400) {
                b.obj.style[b.type] = c + 'px';
                b.end && b.end()
            } else {
                setTimeout(arguments.callee, 20)
            }
        }, 20)
    })()
};

function clickStat() {
    var a = location.pathname;
    ajax.startRequest({
        url: '/command/clickstat.php?href=' + decodeURIComponent(a)
    })
};
bookhistory = {
    init: function() {
        this.value = getCookie('bh') || '';
        this.count = this.value && this.search() ? this.value.split('},{').length : 0
    },
    set: function() {
        addCookie('bh', this.value)
    },
    search: function(a) {
        if (!this.value) {
            return false
        };
        if (!a) {
            a = '[0-9]+'
        };
        var b = new RegExp('{"bid":"' + a + '","bname":"[^"]+","sid":"[0-9]+","sname":"[^"]+"}[,]?');
        return b.test(this.value)
    },
    add: function(a, b, c, d) {
        if (this.search(a)) {
            this.rework(a, c, d);
            return false
        };
        var e = '{"bid":"' + a + '","bname":"' + decodeURIComponent(b) + '","sid":"' + c + '","sname":"' + decodeURIComponent(d) + '"}';
        this.value = this.value ? this.value + ',' + e : e;
        this.count++;
        if (this.count > 3) {
            this.del()
        } else {
            this.set()
        }
    },
    rework: function(a, b, c) {
        if (!this.value) {
            return false
        };
        var d = new RegExp('({"bid":"' + a + '","bname":"[^"]+","sid":")[0-9]+(","sname":")[^"]+("}[,]?)');
        this.value = this.value.replace(d, '$1' + b + '$2' + decodeURIComponent(c) + '$3');
        this.set()
    },
    del: function(a) {
        if (!this.value) {
            return false
        };
        var b = new RegExp(a ? '{"bid":"' + a + '","bname":"[^"]+","sid":"[0-9]+","sname":"[^"]+"}[,]?' : '^{"bid":"[0-9]+","bname":"[^"]+","sid":"[0-9]+","sname":"[^"]+"}[,]?');
        if (!b.test(this.value)) {
            return false
        };
        this.value = this.value.replace(b, '').replace(/,$/, '');
        this.count--;
        this.set()
    }
};
bookfavorite = {
    init: function() {
        this.value = getCookie('bf') || '';
        this.count = this.value && this.search() ? this.value.split('},{').length : 0
    },
    set: function() {
        addCookie('bf', this.value)
    },
    search: function(a) {
        if (!this.value) {
            return false
        };
        if (!a) {
            a = '[0-9]+'
        };
        var b = new RegExp('{"bid":"' + a + '"}[,]?');
        return b.test(this.value)
    },
    add: function(a) {
        if (this.search(a)) {
            message.flash('这本书已经在您的书架中,无须再收藏');
            return false
        };
        var b = '{"bid":"' + a + '"}';
        this.value = this.value ? b + ',' + this.value : b;
        this.count++;
        this.set();
        message.flash('成功放入书架')
    },
    del: function(a) {
        if (!this.value) {
            return false
        };
        var b = new RegExp('{"bid":"' + a + '"}[,]?');
        if (!b.test(this.value)) {
            return false
        };
        this.value = this.value.replace(b, '').replace(/,$/, '');
        this.count--;
        this.set();
        message.flash('成功删除')
    }
};
scrollTop = {
    button: null,
    state: 'stop',
    transition: function(c) {
        var d = 0,
            startTime = new Date().getTime();
        var e = 0 - c;
        this.state = 'move';

        function ease(t) {
            return Math.sqrt(1 - Math.pow((t - 1), 2)) || 0
        };
        (function() {
            setTimeout(function() {
                var a = new Date().getTime() - startTime,
                    delta = ease(a / 600);
                var b = Math.ceil(c + delta * e);
                if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) > b) {
                    window.scrollTo(0, b)
                };
                if (a >= 600) {
                    window.scrollTo(0, 0);
                    scrollTop.state = 'stop'
                } else {
                    setTimeout(arguments.callee, 20)
                }
            }, 20)
        })()
    },
    show: function() {
        if (this.state != 'stop' || !($('body') || ($('left') && $('right')))) {
            return false
        };
        if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) == 0) {
            scrollTop.button.style.display = 'none';
            return false
        };
        this.button.style.display = 'block';
        this.button.style.left = ($('body') ? $('body').offsetWidth + $('body').offsetLeft : $('right').offsetWidth + $('right').offsetLeft) + 10 + 'px'
    },
    init: function() {
        this.button = document.createElement('div');
        this.button.className = 'scrolltop';
        this.button.onclick = function() {
            scrollTop.button.style.display = 'none';
            scrollTop.transition(Math.max(document.documentElement.scrollTop, document.body.scrollTop))
        };
        document.body.appendChild(this.button);
        scrollTop.show();
        attachevent(window, 'resize', function() {
            scrollTop.show()
        });
        attachevent(window, 'scroll', function() {
            scrollTop.show();
            if (!-[1, ] && !window.XMLHttpRequest) {
                scrollTop.button.style.position = 'absolute';
                scrollTop.button.style.top = document.documentElement.clientHeight - document.body.getBoundingClientRect().top - 200 + 'px'
            }
        })
    }
};
var _hmt = _hmt || [];
(function() {
    var a = document.createElement("script");
    a.src = "https://hm.baidu.com/hm.js?6b5b5b85e781a918b0d754fe3fc5861f";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(a, s)
})();
