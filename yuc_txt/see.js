/\/([0-9]+)\/([0-9]+)\.html$/.test(location.href);
var bid = RegExp.$1;
var sid = RegExp.$2;
var bname = document.title.split('_')[0];
var sname = document.title.split('_')[1];
addCookie('cachebookhref', location.pathname, location.pathname);
addCookie('cachecname', sname, location.pathname);
bookhistory.init();
bookhistory.add(bid, bname, sid, sname);
dir = {
    sportState: 'stop',
    state: 'hidden',
    barOffset: 20,
    init: function() {
        this.box = $('dbox');
        this.list = $('dlist');
        this.load();
        $('dir_b').onclick = function() {
            dir.state == 'hidden' ? dir.show() : dir.hidden()
        };
        attachevent(window, 'resize', function() {
            dir.setWidth()
        });
        attachevent(document.body, 'click', function(e) {
            var e = e || event;
            var a = e.srcElement || e.target;
            if (dir.state == 'show') {
                while (a) {
                    if (a == dir.box) {
                        return
                    };
                    a = a.parentNode
                };
                dir.hidden()
            }
        })
    },
    load: function() {
        ajax.startRequest({
            url: '/book/' + bid + '/dir.xml',
            doRequest: function(b) {
                var c = b.getElementsByTagName('root');
                var d = '';
                if (c.length == 1) {
                    for (var i = 0; i < c[0].childNodes.length; i++) {
                        var e = document.createElement(c[0].childNodes[i].tagName);
                        var f = c[0].childNodes[i].getAttribute('id');
                        var g = c[0].childNodes[i].firstChild.nodeValue;
                        if (f) {
                            var a = document.createElement('a');
                            a.href = '/book/' + bid + '/' + f + '.html';
                            a.title = g;
                            a.appendChild(document.createTextNode(g));
                            e.appendChild(a)
                        } else {
                            e.appendChild(document.createTextNode(g))
                        };
                        dir.list.appendChild(e)
                    };
                    scrollBar.attach(dir.box, dir.box, dir.list, 1);
                    dir.box.style.backgroundImage = 'none'
                }
            }
        })
    },
    setWidth: function() {
        var a = $('content').offsetWidth - 80;
        this.box.style.width = (a > 670 ? 670 : a) + 'px';
        if (this.state == 'hidden') {
            this.box.style.right = -this.box.offsetWidth - 1 + 'px'
        }
    },
    show: function() {
        if (this.sportState != 'stop') {
            return false
        };
        this.setWidth();
        this.state = 'show';
        this.sportState = 'move';
        transition({
            obj: this.box,
            begin: -this.box.offsetWidth,
            change: this.box.offsetWidth - 1,
            ease: function(t) {
                return Math.sqrt(1 - Math.pow((t - 1), 2)) || 0
            },
            type: 'right',
            end: function() {
                dir.sportState = 'stop';
                dir.box.focus()
            }
        })
    },
    hidden: function() {
        if (this.sportState != 'stop') {
            return false
        };
        this.state = 'hidden';
        this.sportState = 'move';
        transition({
            obj: this.box,
            begin: -1,
            change: -this.box.offsetWidth,
            ease: function(t) {
                return -(Math.sqrt(1 - (t * t)) - 1) || 0
            },
            type: 'right',
            end: function() {
                dir.sportState = 'stop';
                content.box.focus()
            }
        })
    }
};
var scrollBar = {
    init: function(c, d, f, g) {
        this.sportState = 'stop';
        this.buttonTop = 0;
        this.buttonHeight = 0;
        this.top = 0;
        this.y = 0;
        this.startY = 0;
        this.historyY = 0;
        this.time = 0;
        this.v = 0;
        this.ticker = null;
        var h = 20;
        this.button = document.createElement('div');
        this.slot = document.createElement('div');
        this.slot.appendChild(this.button);
        this.slot.style.top = h + 'px';
        this.slot.style.height = (c.offsetHeight - h * 2) + 'px';
        this.button.className = 'scrollbar';
        this.slot.className = 'slot';
        c.appendChild(this.slot);
        if (g == 2) {
            var i = document.createElement('div');
            var j = document.createElement('div');
            i.className = 'slot2';
            this.slot.appendChild(i);
            this.slot.appendChild(j)
        } else {
            this.button.style.height = Math.floor(d.offsetHeight * this.slot.offsetHeight / f.offsetHeight) + 'px'
        };
        this.button.changeStyle = function(a) {
            if (g == 2) {
                if (a == 'in') {
                    i.style.background = '#e0dbc8';
                    j.className = 'bar barover';
                    this.className = 'scrollbar scrollbarover'
                } else {
                    i.style.background = '#e9e4d2';
                    j.className = 'bar';
                    this.className = 'scrollbar'
                }
            } else {
                this.style.background = a == 'out' ? '#d1cdba' : '#1bb582'
            }
        };
        this.button.changeStyle('out');
        this.slot.onmouseover = (function(s) {
            return function(e) {
                var e = e || event;
                var a = e.fromElement || e.relatedTarget;
                if (this.contains) {
                    if (a == this || this.contains(a)) {
                        return false
                    }
                } else {
                    if (this.compareDocumentPosition(a) == this || this.compareDocumentPosition(a) - 19 > 0) {
                        return false
                    }
                };
                s.button.changeStyle('in');
                s.buttonHeight = s.button.offsetHeight
            }
        })(this);
        this.slot.onmouseout = (function(s) {
            return function(e) {
                if (s.sportState == 'drag') {
                    return false
                };
                var e = e || event;
                var a = e.toElement || e.relatedTarget;
                if (this.contains) {
                    if (this.contains(a)) {
                        return false
                    }
                } else {
                    if (this.compareDocumentPosition(a) - 19 > 0) {
                        return false
                    }
                };
                s.button.changeStyle('out')
            }
        })(this);
        this.buttonHeight = this.button.offsetHeight;
        if (d.offsetHeight - f.offsetHeight > 0) {
            this.slot.style.display = 'none'
        };
        this.sport = function(a, b) {
            if (d.offsetHeight - f.offsetHeight > 0) {
                return false
            };
            if (b == 1) {
                this.button.style.top = Math.min(Math.max(this.buttonTop + a, 0), this.slot.offsetHeight - this.buttonHeight) + 'px';
                f.style.top = -Math.floor((f.offsetHeight - d.offsetHeight) * (this.button.offsetTop) / (this.slot.offsetHeight - this.buttonHeight)) + 'px'
            } else if (b == 2) {
                f.style.top = Math.max(Math.min(f.offsetTop - a, 0), d.offsetHeight - f.offsetHeight) + 'px';
                this.button.style.top = Math.min(this.slot.offsetHeight - this.buttonHeight, Math.floor(-f.offsetTop * (this.slot.offsetHeight - this.buttonHeight) / (f.offsetHeight - d.offsetHeight))) + 'px';
                this.buttonTop = this.button.offsetTop
            };
            if (g == 2) {
                j.style.height = this.button.offsetTop + 8 + 'px'
            }
        };
        this.reset = function() {
            if (d.offsetHeight - f.offsetHeight > 0) {
                this.button.style.top = f.style.top = 0;
                if (j) {
                    j.style.height = 0
                };
                this.slot.style.display = 'none';
                return false
            };
            this.slot.style.display = 'block';
            this.slot.style.height = (c.offsetHeight - h * 2) + 'px';
            if (g == 1) {
                this.button.style.height = Math.floor(d.offsetHeight * this.slot.offsetHeight / f.offsetHeight) + 'px';
                this.buttonHeight = this.button.offsetHeight
            };
            this.sport(0, 2)
        }
    },
    attach: function(d, f, g, h) {
        var i = new this.init(d, f, g, h);
        i.buttonTop = i.button.offsetTop;
        f.setAttribute('tabindex', 0);
        f.style.outline = 0;

        function move(e) {
            var e = e || event;
            if (i.sportState == 'drag') {
                i.sport((e.pageY || e.clientY) - i.y, 1)
            }
        };

        function up(e) {
            var e = e || event;
            var a = e.target || e.srcElement;
            if (a != i.button) {
                i.button.changeStyle('out')
            };
            if (i.sportState == 'drag') {
                i.buttonTop = i.button.offsetTop;
                i.sportState = 'stop';
                if (i.button.releaseCapture) {
                    i.button.releaseCapture();
                    return false
                };
                detachevent(document, 'mousemove', move);
                detachevent(document, 'mouseup', up)
            }
        };
        i.button.onmousedown = function(e) {
            if (i.sportState == 'stop') {
                var e = e || event;
                i.y = e.pageY || e.clientY;
                i.sportState = 'drag';
                if (i.button.setCapture) {
                    i.button.setCapture();
                    return false
                };
                attachevent(document, 'mousemove', move);
                attachevent(document, 'mouseup', up)
            }
        };
        i.slot.onmousedown = function(e) {
            var e = e || event;
            if (i.sportState == 'drag') {
                return false
            };
            i.sport((e.layerY || e.offsetY) - (i.button.offsetHeight / 2) - i.buttonTop, 1);
            i.buttonTop = i.button.offsetTop
        };
        i.button.onmousemove = move;
        i.button.onmouseup = up;
        attachevent(f, navigator.userAgent.indexOf("Firefox") != -1 ? 'DOMMouseScroll' : 'mousewheel', function(e) {
            var e = e || event;
            var a = e.wheelDelta ? -e.wheelDelta / 8 : e.detail * 8;
            if (a) {
                i.sport(a * 4, 2)
            }
        });
        attachevent(f, 'keydown', function(e) {
            var e = e || event;
            var a = e.which || e.keyCode;
            var b = {
                32: Math.floor(f.offsetHeight * 9 / 10),
                33: b = -Math.floor(f.offsetHeight * 9 / 10),
                34: Math.floor(f.offsetHeight * 9 / 10),
                35: g.scrollHeight - f.offsetHeight + g.offsetTop,
                36: g.offsetTop,
                38: -40,
                40: 40
            }[a] || 0;
            if (b) {
                i.sport(b, 2)
            }
        });
        attachevent(window, 'resize', function() {
            i.reset()
        });

        function track() {
            var a = i.y - i.historyY;
            i.historyY = i.y;
            var b = Date.now();
            var c = b - i.time;
            i.time = b;
            i.v = 100 * a / (1 + c)
        };

        function transition(b) {
            var c = b.begin + b.change,
                startTime = new Date().getTime();
            b.obj.setAttribute('state', 'move');
            (function() {
                setTimeout(function() {
                    if (b.obj.getAttribute('state') == 'stop') {
                        return false
                    };
                    var a = new Date().getTime() - startTime,
                        delta = b.ease(a / b.time);
                    i.sport(g.offsetTop - Math.ceil(b.begin + delta * b.change), 2);
                    if (a >= b.time || b.change == 0) {
                        i.sport(Math.ceil(g.offsetTop - c), 2)
                    } else {
                        setTimeout(arguments.callee, 20)
                    }
                }, 20)
            })()
        };

        function autoScroll() {
            var a = Math.min(Math.max(Math.floor(i.v * 0.8), f.offsetHeight - g.offsetTop - g.offsetHeight), -g.offsetTop);
            if (a == 0) {
                return false
            };
            transition({
                obj: g,
                begin: g.offsetTop,
                change: a,
                time: 800,
                ease: function(t) {
                    return Math.sqrt(1 - Math.pow((t - 1), 2)) || 0
                }
            })
        };
        attachevent(f, 'touchstart', function() {
            g.setAttribute('state', 'stop');
            i.y = i.historyY = i.startY = event.touches[0].screenY;
            i.top = g.offsetTop;
            clearInterval(i.ticker);
            i.ticker = setInterval(track, 50)
        });
        attachevent(f, 'touchmove', function() {
            i.y = event.touches[0].screenY;
            i.time = Date.now();
            var a = i.y - i.startY;
            if (Math.abs(a) > 5) {
                i.sport(g.offsetTop - i.top - a, 2)
            }
        });
        attachevent(f, 'touchend', function() {
            clearInterval(i.ticker);
            autoScroll();
            i.buttonTop = i.button.offsetTop
        });
        return i
    }
};
var content = {
    page: 0,
    mode: 2,
    star: 0,
    childNode: [],
    sportState: 'stop',
    init: function() {
        this.body = $('content');
        this.box = this.body.parentNode;
        this.height = this.box.offsetHeight;
        var a = base64.decode(document.getElementsByTagName('meta')[4].getAttribute('content')).split(/[A-Z]+%/);
        var j = 0;
        for (var i = 0; i < this.body.childNodes.length; i++) {
            if (this.body.childNodes[i].tagName == 'H2') {
                this.star = i + 1
            };
            if (this.body.childNodes[i].tagName == 'DIV' && this.body.childNodes[i].className != 'chapter') {
                break
            }
        };
        for (var i = 0; i < a.length; i++) {
            if (a[i] < 5) {
                this.childNode[a[i]] = this.body.childNodes[i + this.star];
                j++
            } else {
                this.childNode[a[i] - j] = this.body.childNodes[i + this.star]
            }
        };
        for (var i = 0; i < this.childNode.length; i++) {
            if (!this.childNode[i]) {
                continue
            };
            this.childNode[i].style.display = 'block';
            this.body.appendChild(this.childNode[i])
        };
        this.box.style.backgroundImage = 'none';
        this.drag = scrollBar.attach(document.body, content.box, content.body, 2);
        this.box.focus()
    },
    setMode: function(a) {
        this.mode = a;
        if (a == 2) {
            this.body.style.height = this.height + 'px'
        }
    },
    page: function(a, b) {
        if (this.sportState != 'stop') {
            return false
        };
        this.sportState = 'move';
        var c = this;

        function s() {
            c.drag.sport(0, 2)
        }
    },
    nextpage: function() {},
    prepage: function() {}
};
attachevent(document, 'touchmove', function() {
    event.preventDefault()
});
attachevent(document.body, 'keydown', function(e) {
    var e = e || event;
    var a = e.which || e.keyCode;
    var b = $('pre');
    var c = $('next');
    if (a == 37) {
        b ? location.href = b.href : message.flash('已经是第一页了')
    } else if (a == 39) {
        c ? location.href = c.href : message.flash('已经是最后页了')
    }
});
clickStat();
content.init();
dir.init();
