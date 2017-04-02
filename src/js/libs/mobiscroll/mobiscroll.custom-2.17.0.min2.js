/* 01996fe2-7d57-4b57-96d9-379b673bae6e */
(function(a, m) {
    function s(a) {
        for (var d in a)
            if (p[a[d]] !== m)
                return !0;
        return !1
    }
    function t(e, b, g) {
        var o = e;
        if ("object" === typeof b)
            return e.each(function() {
                d[this.id] && d[this.id].destroy();
                new a.mobiscroll.classes[b.component || "Scroller"](this,b)
            });
        "string" === typeof b && e.each(function() {
            var a;
            if ((a = d[this.id]) && a[b])
                if (a = a[b].apply(this, Array.prototype.slice.call(g, 1)),
                    a !== m)
                    return o = a,
                        !1
        });
        return o
    }
    function h(a) {
        if (j.tapped && !a.tap && !("TEXTAREA" == a.target.nodeName && "mousedown" == a.type))
            return a.stopPropagation(),
                a.preventDefault(),
                !1
    }
    var j, e = +new Date, d = {}, r = a.extend, p = document.createElement("modernizr").style, b = s(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), g = s(["flex", "msFlex", "WebkitBoxDirection"]), W = function() {
        var a = ["Webkit", "Moz", "O", "ms"], b;
        for (b in a)
            if (s([a[b] + "Transform"]))
                return "-" + a[b].toLowerCase() + "-";
        return ""
    }(), i = W.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
    a.fn.mobiscroll = function(b) {
        r(this, a.mobiscroll.components);
        return t(this, b, arguments)
    }
    ;
    j = a.mobiscroll = a.mobiscroll || {
            version: "2.17.0",
            running: 1,
            util: {
                prefix: W,
                jsPrefix: i,
                has3d: b,
                hasFlex: g,
                isOldAndroid: /android [1-3]/i.test(navigator.userAgent),
                preventClick: function() {
                    j.tapped++;
                    setTimeout(function() {
                        j.tapped--
                    }, 500)
                },
                testTouch: function(b, d) {
                    if ("touchstart" == b.type)
                        a(d).attr("data-touch", "1");
                    else if (a(d).attr("data-touch"))
                        return a(d).removeAttr("data-touch"),
                            !1;
                    return !0
                },
                objectToArray: function(a) {
                    var b = [], d;
                    for (d in a)
                        b.push(a[d]);
                    return b
                },
                arrayToObject: function(a) {
                    var b = {}, d;
                    if (a)
                        for (d = 0; d < a.length; d++)
                            b[a[d]] = a[d];
                    return b
                },
                isNumeric: function(a) {
                    return 0 <= a - parseFloat(a)
                },
                isString: function(a) {
                    return "string" === typeof a
                },
                getCoord: function(a, b, d) {
                    var e = a.originalEvent || a
                        , b = (d ? "client" : "page") + b;
                    return e.changedTouches ? e.changedTouches[0][b] : a[b]
                },
                getPosition: function(d, e) {
                    var g = window.getComputedStyle ? getComputedStyle(d[0]) : d[0].style, o, i;
                    b ? (a.each(["t", "webkitT", "MozT", "OT", "msT"], function(a, b) {
                        if (g[b + "ransform"] !== m)
                            return o = g[b + "ransform"],
                                !1
                    }),
                        o = o.split(")")[0].split(", "),
                        i = e ? o[13] || o[5] : o[12] || o[4]) : i = e ? g.top.replace("px", "") : g.left.replace("px", "");
                    return i
                },
                addIcon: function(b, d) {
                    var e = {}
                        , g = b.parent()
                        , i = g.find(".mbsc-err-msg")
                        , h = b.attr("data-icon-align") || "left"
                        , k = b.attr("data-icon");
                    a('<span class="mbsc-input-wrap"></span>').insertAfter(b).append(b);
                    i && g.find(".mbsc-input-wrap").append(i);
                    k && (-1 !== k.indexOf("{") ? e = JSON.parse(k) : e[h] = k,
                        r(e, d),
                        g.addClass((e.right ? "mbsc-ic-right " : "") + (e.left ? " mbsc-ic-left" : "")).find(".mbsc-input-wrap").append(e.left ? '<span class="mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' + e.left + '"></span>' : "").append(e.right ? '<span class="mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + e.right + '"></span>' : ""))
                },
                constrain: function(a, b, d) {
                    return Math.max(b, Math.min(a, d))
                },
                vibrate: function(a) {
                    "vibrate"in navigator && navigator.vibrate(a || 50)
                }
            },
            tapped: 0,
            autoTheme: "mobiscroll",
            presets: {
                scroller: {},
                numpad: {},
                listview: {},
                menustrip: {}
            },
            themes: {
                form: {},
                frame: {},
                listview: {},
                menustrip: {},
                progress: {}
            },
            i18n: {},
            instances: d,
            classes: {},
            components: {},
            defaults: {
                context: "body",
                mousewheel: !0,
                vibrate: !0
            },
            setDefaults: function(a) {
                r(this.defaults, a)
            },
            presetShort: function(a, b, d) {
                this.components[a] = function(e) {
                    return t(this, r(e, {
                        component: b,
                        preset: !1 === d ? m : a
                    }), arguments)
                }
            }
        };
    a.mobiscroll.classes.Base = function(b, g) {
        var i, o, h, j, k, f, u = a.mobiscroll, y = u.util, I = y.getCoord, n = this;
        n.settings = {};
        n._presetLoad = function() {}
        ;
        n._init = function(a) {
            h = n.settings;
            r(g, a);
            n._hasDef && (f = u.defaults);
            r(h, n._defaults, f, g);
            if (n._hasTheme) {
                k = h.theme;
                if ("auto" == k || !k)
                    k = u.autoTheme;
                "default" == k && (k = "mobiscroll");
                g.theme = k;
                j = u.themes[n._class] ? u.themes[n._class][k] : {}
            }
            n._hasLang && (i = u.i18n[h.lang]);
            n._hasTheme && n.trigger("onThemeLoad", [i, g]);
            r(h, j, i, f, g);
            if (n._hasPreset && (n._presetLoad(h),
                    o = u.presets[n._class][h.preset]))
                o = o.call(b, n),
                    r(h, o, g)
        }
        ;
        n._destroy = function() {
            n.trigger("onDestroy", []);
            delete d[b.id];
            n = null
        }
        ;
        n.tap = function(b, f, d) {
            function e(b) {
                if (!l && (d && b.preventDefault(),
                        l = this,
                        x = I(b, "X"),
                        o = I(b, "Y"),
                        k = !1,
                    "pointerdown" == b.type))
                    a(document).on("pointermove", g).on("pointerup", c)
            }
            function g(a) {
                if (l && !k && 20 < Math.abs(I(a, "X") - x) || 20 < Math.abs(I(a, "Y") - o))
                    k = !0
            }
            function c(b) {
                l && (k || (b.preventDefault(),
                    f.call(l, b, n)),
                "pointerup" == b.type && a(document).off("pointermove", g).off("pointerup", c),
                    l = !1,
                    y.preventClick())
            }
            function i() {
                l = !1
            }
            var x, o, l, k;
            if (h.tap)
                b.on("touchstart.dw pointerdown.dw", e).on("touchcancel.dw pointercancel.dw", i).on("touchmove.dw", g).on("touchend.dw", c);
            b.on("click.dw", function(a) {
                a.preventDefault();
                f.call(this, a, n)
            })
        }
        ;
        n.trigger = function(d, e) {
            var i;
            e.push(n);
            a.each([f, j, o, g], function(a, f) {
                f && f[d] && (i = f[d].apply(b, e))
            });
            return i
        }
        ;
        n.option = function(a, b) {
            var f = {};
            "object" === typeof a ? f = a : f[a] = b;
            n.init(f)
        }
        ;
        n.getInst = function() {
            return n
        }
        ;
        g = g || {};
        b.id || (b.id = "mobiscroll" + ++e);
        d[b.id] = n
    }
    ;
    document.addEventListener && a.each(["mouseover", "mousedown", "mouseup", "click"], function(a, b) {
        document.addEventListener(b, h, !0)
    })
})($);
(function(a) {
    a.mobiscroll.i18n.zh = {
        setText: "\u786e\u5b9a",
        cancelText: "\u53d6\u6d88",
        clearText: "\u660e\u786e",
        selectedText: "{count} \u9009",
        dateFormat: "yy/mm/dd",
        dateOrder: "yymmdd",
        dayNames: "\u5468\u65e5,\u5468\u4e00,\u5468\u4e8c,\u5468\u4e09,\u5468\u56db,\u5468\u4e94,\u5468\u516d".split(","),
        dayNamesShort: "\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),
        dayNamesMin: "\u65e5,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d".split(","),
        dayText: "\u65e5",
        hourText: "\u65f6",
        minuteText: "\u5206",
        monthNames: "1\u6708,2\u6708,3\u6708,4\u6708,5\u6708,6\u6708,7\u6708,8\u6708,9\u6708,10\u6708,11\u6708,12\u6708".split(","),
        monthNamesShort: "\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d,\u5341,\u5341\u4e00,\u5341\u4e8c".split(","),
        monthText: "\u6708",
        secText: "\u79d2",
        timeFormat: "HH:ii",
        timeWheels: "HHii",
        yearText: "\u5e74",
        nowText: "\u5f53\u524d",
        pmText: "\u4e0b\u5348",
        amText: "\u4e0a\u5348",
        dateText: "\u65e5",
        timeText: "\u65f6\u95f4",
        calendarText: "\u65e5\u5386",
        closeText: "\u5173\u95ed",
        fromText: "\u5f00\u59cb\u65f6\u95f4",
        toText: "\u7ed3\u675f\u65f6\u95f4",
        wholeText: "\u5408\u8ba1",
        fractionText: "\u5206\u6570",
        unitText: "\u5355\u4f4d",
        labels: "\u5e74,\u6708,\u65e5,\u5c0f\u65f6,\u5206\u949f,\u79d2,".split(","),
        labelsShort: "\u5e74,\u6708,\u65e5,\u70b9,\u5206,\u79d2,".split(","),
        startText: "\u5f00\u59cb",
        stopText: "\u505c\u6b62",
        resetText: "\u91cd\u7f6e",
        lapText: "\u5708",
        hideText: "\u9690\u85cf",
        backText: "\u80cc\u90e8",
        undoText: "\u590d\u539f",
        offText: "\u5173\u95ed",
        onText: "\u5f00\u542f"
    }
})($);
(function(a, m) {
    var s = function() {}
        , t = a.mobiscroll;
    t.classes.Progress = function(h, j, e) {
        function d() {
            var a = r("value", o);
            a !== f && p(a)
        }
        function r(a, b) {
            var f = g.attr(a);
            return f === m || "" === f ? b : +f
        }
        function p(b, d, e, h) {
            b = a.mobiscroll.running && Math.min(B, Math.max(b, o));
            i.css("width", 100 * (b - o) / (B - o) + "%");
            e === m && (e = !0);
            h === m && (h = e);
            (b !== f || d) && y._display(b);
            b !== f && (f = b,
            e && g.attr("value", f),
            h && g.change())
        }
        var b, g, W, i, O, v, A, o, B, C, k, f, u, y = this;
        t.classes.Base.call(this, h, j, !0);
        y._onInit = s;
        y._onDestroy = s;
        y._display = function(a) {
            u = k && C.returnAffix ? k.replace(/\{value\}/, a).replace(/\{max\}/, B) : a;
            O && O.html(u);
            b && b.html(u)
        }
        ;
        y._attachChange = function() {
            g.on("change", d)
        }
        ;
        y.init = function(d) {
            var e, u;
            y._init(d);
            C = y.settings;
            g = a(h);
            W = y._$parent = g.parent();
            o = y._min = d.min === m ? r("min", C.min) : d.min;
            B = y._max = d.max === m ? r("max", C.max) : d.max;
            f = r("value", o);
            e = g.attr("data-val") || C.val;
            u = g.attr("data-step-labels") || C.stepLabels;
            k = g.attr("data-template") || (100 == B && !C.template ? "{value}%" : C.template);
            A = y._css + " mbsc-progress-w mbsc-" + C.theme + (C.baseTheme ? " mbsc-" + C.baseTheme : "");
            W.addClass(A);
            y._wrap && t.util.addIcon(g);
            g.attr("min", o).attr("max", B);
            W.find(".mbsc-input-wrap").append('<span class="mbsc-progress-cont"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-progress-bar"></span></span></span>');
            i = y._$progress = W.find(".mbsc-progress-bar");
            v = y._$track = W.find(".mbsc-progress-track");
            O = a(g.attr("data-target") || C.target);
            e && (b = a('<span class="mbsc-progress-value"></span>'),
                W.addClass("mbsc-progress-value-" + ("right" == e ? "right" : "left")).find(".mbsc-input-wrap").append(b));
            if (u) {
                u = JSON.parse(u);
                for (e = 0; e < u.length; ++e)
                    v.append('<span class="mbsc-progress-step-label" style="left: ' + 100 * (u[e] - o) / (B - o) + '%" >  ' + u[e] + "</span>")
            }
            y._onInit(d);
            y._attachChange();
            y.refresh()
        }
        ;
        y.refresh = function() {
            p(r("value", o), !0, !1)
        }
        ;
        y.destroy = function() {
            y._onDestroy();
            W.find(".mbsc-progress-cont").remove();
            W.removeClass(A).find(".mbsc-input-wrap").before(g).remove();
            g.removeClass("mbsc-control").off("change", d);
            y._destroy()
        }
        ;
        y.getVal = function() {
            return f
        }
        ;
        y.setVal = function(a, b, f) {
            p(a, !0, b, f)
        }
        ;
        e || y.init(j)
    }
    ;
    t.classes.Progress.prototype = {
        _class: "progress",
        _css: "mbsc-progress",
        _hasTheme: !0,
        _wrap: !0,
        _defaults: {
            min: 0,
            max: 100,
            returnAffix: !0
        }
    };
    t.presetShort("progress", "Progress")
})($);
(function(a, m) {
    var s = function() {}
        , t = a.mobiscroll
        , h = t.util
        , j = h.getCoord
        , e = h.testTouch;
    t.classes.Slider = function(d, r, p) {
        function b(b) {
            e(b, this) && !H && !d.disabled && a.mobiscroll.running && (H = !0,
                x = Y = !1,
                fa = j(b, "X"),
                w = j(b, "Y"),
                M = fa,
                c.removeClass("mbsc-progress-anim"),
                I = D ? a(".mbsc-slider-handle", this) : K,
                n = I.parent().addClass("mbsc-active"),
                q = +I.attr("data-index"),
                ha = c.outerWidth(),
                N = c.offset().left,
            "mousedown" === b.type && (b.preventDefault(),
                a(document).on("mousemove", g).on("mouseup", W)))
        }
        function g(a) {
            if (H) {
                M = j(a, "X");
                P = j(a, "Y");
                L = M - fa;
                l = P - w;
                if (5 < Math.abs(L) || Y)
                    Y = !0,
                    50 < Math.abs(ua - new Date) && (ua = new Date,
                        k(M, ga.round, Q));
                Y ? a.preventDefault() : 7 < Math.abs(l) && C(a)
            }
        }
        function W(a) {
            H && (a.preventDefault(),
            D || c.addClass("mbsc-progress-anim"),
                k(M, !0, !0),
            !Y && !x && (h.preventClick(),
                E._onTap(V[q])),
                C())
        }
        function i() {
            H && C()
        }
        function O() {
            var c = E._readValue(a(this))
                , b = +a(this).attr("data-index");
            c !== V[b] && (V[b] = c,
                u(c, b))
        }
        function v(a) {
            a.stopPropagation()
        }
        function A(a) {
            a.preventDefault()
        }
        function o(c) {
            var b;
            if (!d.disabled) {
                switch (c.keyCode) {
                    case 38:
                    case 39:
                        b = 1;
                        break;
                    case 40:
                    case 37:
                        b = -1
                }
                b && (c.preventDefault(),
                da || (q = +a(this).attr("data-index"),
                    u(V[q] + ea * b, q, !0),
                    da = setInterval(function() {
                        u(V[q] + ea * b, q, !0)
                    }, 200)))
            }
        }
        function B(a) {
            a.preventDefault();
            clearInterval(da);
            da = null
        }
        function C() {
            H = !1;
            n.removeClass("mbsc-active");
            a(document).off("mousemove", g).off("mouseup", W)
        }
        function k(a, c, b) {
            a = c ? Math.min(100 * Math.round(Math.max(100 * (a - N) / ha, 0) / ia / ea) * ea / (S - aa), 100) : Math.max(0, Math.min(100 * (a - N) / ha, 100));
            u(Math.round((aa + a / ia) * X) / X, q, b, a)
        }
        function f(a) {
            return 100 * (a - aa) / (S - aa)
        }
        function u(a, c, b, d, e, g) {
            var l = K.eq(c)
                , i = l.parent()
                , a = Math.min(S, Math.max(a, aa));
            g === m && (g = b);
            J ? 0 === c ? (a = Math.min(a, V[1]),
                F.css({
                    width: f(V[1]) - f(a) + "%",
                    left: f(a) + "%"
                })) : (a = Math.max(a, V[0]),
                F.css({
                    width: f(a) - f(V[0]) + "%"
                })) : D || !U ? i.css({
                left: (d || f(a)) + "%",
                right: "auto"
            }) : F.css("width", (d || f(a)) + "%");
            Z && R.eq(c).html(a);
            a > aa ? i.removeClass("mbsc-slider-start") : (V[c] > aa || e) && i.addClass("mbsc-slider-start");
            !D && (V[c] != a || e) && E._display(a);
            b && V[c] != a && (x = !0,
                V[c] = a,
                E._fillValue(a, c, g));
            l.attr("aria-valuenow", a)
        }
        var y, I, n, K, G, T, F, R, c, H, x, L, l, N, M, P, q, U, Z, J, Q, S, aa, Y, D, ea, ga, ia, fa, w, X, da, ha, V, E = this, ua = new Date;
        t.classes.Progress.call(this, d, r, !0);
        E._onTap = s;
        E.__onInit = s;
        E._readValue = function(a) {
            return +a.val()
        }
        ;
        E._fillValue = function(a, c, b) {
            y.eq(c).val(a);
            b && y.eq(c).change()
        }
        ;
        E._attachChange = function() {
            y.on(ga.changeEvent, O)
        }
        ;
        E._onInit = function(f) {
            var d;
            E.__onInit();
            T = E._$parent;
            c = E._$track;
            F = E._$progress;
            y = T.find("input");
            ga = E.settings;
            aa = E._min;
            S = E._max;
            ea = f.step === m ? +y.attr("step") || ga.step : f.step;
            Q = "true" === y.attr("data-live") || ga.live;
            Z = "true" === y.attr("data-tooltip") || ga.tooltip;
            U = "false" !== y.attr("data-highlight") && !1 !== ga.highlight && 3 > y.length;
            X = 0 !== ea % 1 ? 100 / (100 * +(ea % 1).toFixed(2)) : 1;
            ia = 100 / (S - aa) || 100;
            D = 1 < y.length;
            J = U && 2 == y.length;
            V = [];
            Z && T.addClass("mbsc-slider-has-tooltip");
            if (1 != ea) {
                d = (S - aa) / ea;
                for (f = 0; f <= d; ++f)
                    c.append('<span class="mbsc-slider-step" style="left:' + 100 / d * f + '%"></span>')
            }
            a.each(y, function(b) {
                V[b] = E._readValue(a(this));
                a(this).attr("data-index", b).attr("min", aa).attr("max", S).attr("step", ea);
                ga.handle && (U ? F : c).append('<span class="mbsc-slider-handle-cont' + (J && !b ? " mbsc-slider-handle-left" : "") + '"><span tabindex="0" class="mbsc-slider-handle" aria-valuemin="' + aa + '" aria-valuemax="' + S + '" data-index="' + b + '"></span>' + (Z ? '<span class="mbsc-slider-tooltip"></span>' : "") + "</span>")
            });
            K = T.find(".mbsc-slider-handle");
            R = T.find(".mbsc-slider-tooltip");
            G = T.find(D ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont");
            K.on("keydown", o).on("keyup", B).on("blur", B);
            G.on("touchstart mousedown", b).on("touchmove", g).on("touchend touchcancel", W).on("pointercancel", i);
            y.on("click", v);
            T.on("click", A)
        }
        ;
        E._onDestroy = function() {
            T.off("click", A);
            y.off(ga.changeEvent, O).off("click", v);
            K.off("keydown", o).off("keyup", B).off("blur", B);
            G.off("touchstart mousedown", b).off("touchmove", g).off("touchend", W).off("touchcancel pointercancel", i)
        }
        ;
        E.refresh = function() {
            y.each(function(c) {
                u(E._readValue(a(this)), c, !0, !1, !0, !1)
            })
        }
        ;
        E.getVal = function() {
            return D ? V.slice(0) : V[0]
        }
        ;
        E.setVal = E._setVal = function(c, b, f) {
            a.isArray(c) || (c = [c]);
            a.each(c, function(a, c) {
                u(c, a, !0, !1, !0, f)
            })
        }
        ;
        p || E.init(r)
    }
    ;
    t.classes.Slider.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-slider",
        _hasTheme: !0,
        _wrap: !0,
        _defaults: {
            changeEvent: "change",
            min: 0,
            max: 100,
            step: 1,
            live: !0,
            handle: !0,
            round: !0,
            returnAffix: !0
        }
    };
    t.presetShort("slider", "Slider")
})($);
(function(a, m, s, t) {
    var h, j, e = a.mobiscroll, d = e.util, r = d.jsPrefix, p = d.has3d, b = d.constrain, g = d.isString, W = d.isOldAndroid, d = /(iphone|ipod|ipad).* os 8_/i.test(navigator.userAgent), i = function() {}, O = function(a) {
        a.preventDefault()
    };
    e.classes.Frame = function(d, A, o) {
        function B(c) {
            P && P.removeClass("dwb-a");
            P = a(this);
            !P.hasClass("dwb-d") && !P.hasClass("dwb-nhl") && P.addClass("dwb-a");
            if ("mousedown" === c.type)
                a(s).on("mouseup", C);
            else if ("pointerdown" === c.type)
                a(s).on("pointerup", C)
        }
        function C(c) {
            P && (P.removeClass("dwb-a"),
                P = null);
            "mouseup" === c.type ? a(s).off("mouseup", C) : "pointerup" === c.type && a(s).off("pointerup", C)
        }
        function k(a) {
            13 == a.keyCode ? w.select() : 27 == a.keyCode && w.cancel()
        }
        function f(b) {
            var f, d, e, g = D.focusOnClose;
            w._markupRemove();
            c.remove();
            h && !b && setTimeout(function() {
                if (g === t || !0 === g) {
                    j = !0;
                    f = h[0];
                    e = f.type;
                    d = f.value;
                    try {
                        f.type = "button"
                    } catch (c) {}
                    h.focus();
                    f.type = e;
                    f.value = d
                } else
                    g && a(g).focus()
            }, 200);
            w._isVisible = !1;
            U("onHide", [])
        }
        function u(a) {
            clearTimeout(ha[a.type]);
            ha[a.type] = setTimeout(function() {
                var c = "scroll" == a.type;
                (!c || ea) && w.position(!c)
            }, 200)
        }
        function y(a) {
            a.target.nodeType && !L[0].contains(a.target) && L.focus()
        }
        function I(c, b) {
            c && c();
            a(s.activeElement).is("input,textarea") && a(s.activeElement).blur();
            !1 !== w.show() && (h = b,
                setTimeout(function() {
                    j = !1
                }, 300))
        }
        function n() {
            w._fillValue();
            U("onSelect", [w._value])
        }
        function K() {
            U("onCancel", [w._value])
        }
        function G() {
            w.setVal(null, !0)
        }
        var T, F, R, c, H, x, L, l, N, M, P, q, U, Z, J, Q, S, aa, Y, D, ea, ga, ia, fa, w = this, X = a(d), da = [], ha = {};
        e.classes.Base.call(this, d, A, !0);
        w.position = function(f) {
            var d, e, g, i, o, oa, h, k, H, u, q = 0, j = 0;
            H = {};
            var B = Math.min(l[0].innerWidth || l.innerWidth(), x.width())
                , r = l[0].innerHeight || l.innerHeight();
            if (!(ia === B && fa === r && f || Y))
                if ((w._isFullScreen || /top|bottom/.test(D.display)) && L.width(B),
                    !1 !== U("onPosition", [c, B, r]) && J) {
                    e = l.scrollLeft();
                    f = l.scrollTop();
                    i = D.anchor === t ? X : a(D.anchor);
                    w._isLiquid && "liquid" !== D.layout && (400 > B ? c.addClass("dw-liq") : c.removeClass("dw-liq"));
                    !w._isFullScreen && /modal|bubble/.test(D.display) && (N.width(""),
                        a(".mbsc-w-p", c).each(function() {
                            d = a(this).outerWidth(!0);
                            q += d;
                            j = d > j ? d : j
                        }),
                        d = q > B ? j : q,
                        N.width(d + 1).css("white-space", q > B ? "" : "nowrap"));
                    Q = L.outerWidth();
                    S = L.outerHeight(!0);
                    ea = S <= r && Q <= B;
                    (w.scrollLock = ea) ? F.addClass("mbsc-fr-lock") : F.removeClass("mbsc-fr-lock");
                    "modal" == D.display ? (e = Math.max(0, e + (B - Q) / 2),
                        g = f + (r - S) / 2) : "bubble" == D.display ? (u = !0,
                        k = a(".dw-arrw-i", c),
                        g = i.offset(),
                        oa = Math.abs(F.offset().top - g.top),
                        h = Math.abs(F.offset().left - g.left),
                        o = i.outerWidth(),
                        i = i.outerHeight(),
                        e = b(h - (L.outerWidth(!0) - o) / 2, e + 3, e + B - Q - 3),
                        g = oa - S,
                        g < f || oa > f + r ? (L.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
                            g = oa + i) : L.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),
                        k = k.outerWidth(),
                        o = b(h + o / 2 - (e + (Q - k) / 2), 0, k),
                        a(".dw-arr", c).css({
                            left: o
                        })) : "top" == D.display ? g = f : "bottom" == D.display && (g = f + r - S);
                    g = 0 > g ? 0 : g;
                    H.top = g;
                    H.left = e;
                    L.css(H);
                    x.height(0);
                    H = Math.max(g + S, "body" == D.context ? a(s).height() : F[0].scrollHeight);
                    x.css({
                        height: H
                    });
                    if (u && (g + S > f + r || oa > f + r))
                        Y = !0,
                            setTimeout(function() {
                                Y = false
                            }, 300),
                            l.scrollTop(Math.min(g + S - r, H - r));
                    ia = B;
                    fa = r
                }
        }
        ;
        w.attachShow = function(a, c) {
            da.push({
                readOnly: a.prop("readonly"),
                el: a
            });
            if ("inline" !== D.display) {
                if (ga && a.is("input"))
                    a.prop("readonly", !0).on("mousedown.dw", function(a) {
                        a.preventDefault()
                    });
                if (D.showOnFocus)
                    a.on("focus.dw", function() {
                        j || I(c, a)
                    });
                D.showOnTap && (a.on("keydown.dw", function(b) {
                    if (32 == b.keyCode || 13 == b.keyCode)
                        b.preventDefault(),
                            b.stopPropagation(),
                            I(c, a)
                }),
                    w.tap(a, function() {
                        I(c, a)
                    }))
            }
        }
        ;
        w.select = function() {
            J ? w.hide(!1, "set", !1, n) : n()
        }
        ;
        w.cancel = function() {
            J ? w.hide(!1, "cancel", !1, K) : n()
        }
        ;
        w.clear = function() {
            U("onClear", [c]);
            J && !w.live ? w.hide(!1, "clear", !1, G) : G()
        }
        ;
        w.enable = function() {
            D.disabled = !1;
            w._isInput && X.prop("disabled", !1)
        }
        ;
        w.disable = function() {
            D.disabled = !0;
            w._isInput && X.prop("disabled", !0)
        }
        ;
        w.show = function(b, f) {
            var d;
            if (!D.disabled && !w._isVisible) {
                w._readValue();
                if (!1 === U("onBeforeShow", []))
                    return !1;
                q = W ? !1 : D.animate;
                !1 !== q && ("top" == D.display && (q = "slidedown"),
                "bottom" == D.display && (q = "slideup"));
                d = '<div lang="' + D.lang + '" class="mbsc-' + D.theme + (D.baseTheme ? " mbsc-" + D.baseTheme : "") + " dw-" + D.display + " " + (D.cssClass || "") + (w._isLiquid ? " dw-liq" : "") + (W ? " mbsc-old" : "") + (Z ? "" : " dw-nobtn") + '"><div class="dw-persp">' + (J ? '<div class="dwo"></div>' : "") + "<div" + (J ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (D.rtl ? " dw-rtl" : " dw-ltr") + '">' + ("bubble" === D.display ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr"><div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (D.headerText ? '<div class="dwv">' + (g(D.headerText) ? D.headerText : "") + "</div>" : "") + '<div class="dwcc">';
                d += w._generateContent();
                d += "</div>";
                Z && (d += '<div class="dwbc">',
                    a.each(M, function(a, c) {
                        c = g(c) ? w.buttons[c] : c;
                        if (c.handler === "set")
                            c.parentClass = "dwb-s";
                        if (c.handler === "cancel")
                            c.parentClass = "dwb-c";
                        d = d + ("<div" + (D.btnWidth ? ' style="width:' + 100 / M.length + '%"' : "") + ' class="dwbw ' + (c.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + a + " dwb-e " + (c.cssClass === t ? D.btnClass : c.cssClass) + (c.icon ? " mbsc-ic mbsc-ic-" + c.icon : "") + '">' + (c.text || "") + "</div></div>")
                    }),
                    d += "</div>");
                d += "</div></div></div></div>";
                c = a(d);
                x = a(".dw-persp", c);
                H = a(".dwo", c);
                N = a(".dwwr", c);
                R = a(".dwv", c);
                L = a(".dw", c);
                T = a(".dw-aria", c);
                w._markup = c;
                w._header = R;
                w._isVisible = !0;
                aa = "orientationchange resize";
                w._markupReady(c);
                U("onMarkupReady", [c]);
                if (J) {
                    a(m).on("keydown", k);
                    if (D.scrollLock)
                        c.on("touchmove mousewheel wheel", function(a) {
                            ea && a.preventDefault()
                        });
                    "Moz" !== r && a("input,select,button", F).each(function() {
                        this.disabled || a(this).addClass("dwtd").prop("disabled", true)
                    });
                    e.activeInstance && e.activeInstance.hide();
                    aa += " scroll";
                    e.activeInstance = w;
                    c.appendTo(F);
                    if (D.focusTrap)
                        l.on("focusin", y);
                    p && q && !b && c.addClass("dw-in dw-trans").on("webkitAnimationEnd animationend", function() {
                        c.off("webkitAnimationEnd animationend").removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + q);
                        f || L.focus();
                        w.ariaMessage(D.ariaMessage)
                    }).find(".dw").addClass("dw-" + q)
                } else
                    X.is("div") && !w._hasContent ? X.html(c) : c.insertAfter(X);
                w._markupInserted(c);
                U("onMarkupInserted", [c]);
                w.position();
                l.on(aa, u);
                c.on("selectstart mousedown", O).on("click", ".dwb-e", O).on("keydown", ".dwb-e", function(c) {
                    if (c.keyCode == 32) {
                        c.preventDefault();
                        c.stopPropagation();
                        a(this).click()
                    }
                }).on("keydown", function(b) {
                    if (b.keyCode == 32)
                        b.preventDefault();
                    else if (b.keyCode == 9 && J && D.focusTrap) {
                        var f = c.find('[tabindex="0"]').filter(function() {
                            return this.offsetWidth > 0 || this.offsetHeight > 0
                        })
                            , d = f.index(a(":focus", c))
                            , e = f.length - 1
                            , g = 0;
                        if (b.shiftKey) {
                            e = 0;
                            g = -1
                        }
                        if (d === e) {
                            f.eq(g).focus();
                            b.preventDefault()
                        }
                    }
                });
                a("input,select,textarea", c).on("selectstart mousedown", function(a) {
                    a.stopPropagation()
                }).on("keydown", function(a) {
                    a.keyCode == 32 && a.stopPropagation()
                });
                a.each(M, function(b, f) {
                    w.tap(a(".dwb" + b, c), function(a) {
                        f = g(f) ? w.buttons[f] : f;
                        (g(f.handler) ? w.handlers[f.handler] : f.handler).call(this, a, w)
                    }, true)
                });
                D.closeOnOverlay && w.tap(H, function() {
                    w.cancel()
                });
                J && !q && (f || L.focus(),
                    w.ariaMessage(D.ariaMessage));
                c.on("touchstart mousedown pointerdown", ".dwb-e", B).on("touchend", ".dwb-e", C);
                w._attachEvents(c);
                U("onShow", [c, w._tempValue])
            }
        }
        ;
        w.hide = function(b, d, g, i) {
            if (!w._isVisible || !g && !w._isValid && "set" == d || !g && !1 === U("onBeforeClose", [w._tempValue, d]))
                return !1;
            if (c) {
                "Moz" !== r && a(".dwtd", F).each(function() {
                    a(this).prop("disabled", !1).removeClass("dwtd")
                });
                if (p && J && q && !b && !c.hasClass("dw-trans"))
                    c.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + q).on("webkitAnimationEnd animationend", function() {
                        f(b)
                    });
                else
                    f(b);
                l.off(aa, u).off("focusin", y)
            }
            J && (F.removeClass("mbsc-fr-lock"),
                a(m).off("keydown", k),
                delete e.activeInstance);
            i && i();
            U("onClosed", [w._value])
        }
        ;
        w.ariaMessage = function(a) {
            T.html("");
            setTimeout(function() {
                T.html(a)
            }, 100)
        }
        ;
        w.isVisible = function() {
            return w._isVisible
        }
        ;
        w.setVal = i;
        w.getVal = i;
        w._generateContent = i;
        w._attachEvents = i;
        w._readValue = i;
        w._fillValue = i;
        w._markupReady = i;
        w._markupInserted = i;
        w._markupRemove = i;
        w._processSettings = i;
        w._presetLoad = function(a) {
            a.buttons = a.buttons || ("inline" !== a.display ? ["set", "cancel"] : []);
            a.headerText = a.headerText === t ? "inline" !== a.display ? "{value}" : !1 : a.headerText
        }
        ;
        w.destroy = function() {
            w.hide(!0, !1, !0);
            a.each(da, function(a, c) {
                c.el.off(".dw").prop("readonly", c.readOnly)
            });
            w._destroy()
        }
        ;
        w.init = function(c) {
            c.onClose && (c.onBeforeClose = c.onClose);
            w._init(c);
            w._isLiquid = "liquid" === (D.layout || (/top|bottom/.test(D.display) ? "liquid" : ""));
            w._processSettings();
            X.off(".dw");
            M = D.buttons || [];
            J = "inline" !== D.display;
            ga = D.showOnFocus || D.showOnTap;
            l = a("body" == D.context ? m : D.context);
            F = a(D.context);
            w.context = l;
            w.live = !0;
            a.each(M, function(a, c) {
                if (c == "ok" || c == "set" || c.handler == "set")
                    return w.live = false
            });
            w.buttons.set = {
                text: D.setText,
                handler: "set"
            };
            w.buttons.cancel = {
                text: w.live ? D.closeText : D.cancelText,
                handler: "cancel"
            };
            w.buttons.clear = {
                text: D.clearText,
                handler: "clear"
            };
            w._isInput = X.is("input");
            Z = 0 < M.length;
            w._isVisible && w.hide(!0, !1, !0);
            U("onInit", []);
            J ? (w._readValue(),
            w._hasContent || w.attachShow(X)) : w.show();
            X.on("change.dw", function() {
                w._preventChange || w.setVal(X.val(), true, false);
                w._preventChange = false
            })
        }
        ;
        w.buttons = {};
        w.handlers = {
            set: w.select,
            cancel: w.cancel,
            clear: w.clear
        };
        w._value = null;
        w._isValid = !0;
        w._isVisible = !1;
        D = w.settings;
        U = w.trigger;
        o || w.init(A)
    }
    ;
    e.classes.Frame.prototype._defaults = {
        lang: "en",
        setText: "Set",
        selectedText: "{count} selected",
        closeText: "Close",
        cancelText: "Cancel",
        clearText: "Clear",
        disabled: !1,
        closeOnOverlay: !0,
        showOnFocus: !1,
        showOnTap: !0,
        display: "modal",
        scrollLock: !0,
        tap: !0,
        btnClass: "dwb",
        btnWidth: !0,
        focusTrap: !0,
        focusOnClose: !d
    };
    e.themes.frame.mobiscroll = {
        rows: 5,
        showLabel: !1,
        headerText: !1,
        btnWidth: !1,
        selectedLineHeight: !0,
        selectedLineBorder: 1,
        dateOrder: "MMddyy",
        weekDays: "min",
        checkIcon: "ion-ios7-checkmark-empty",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    };
    a(m).on("focus", function() {
        h && (j = !0)
    })
})($, window, document);
(function(a, m, s, t) {
    var h, j = a.extend, e = a.mobiscroll, d = e.classes, r = e.util, p = r.prefix, b = r.jsPrefix, g = r.has3d, W = r.getCoord, i = r.testTouch, O = r.vibrate, v = 1, A = function() {}, o = m.requestAnimationFrame || function(a) {
            a()
        }
        , B = m.cancelAnimationFrame || A, C = "webkitAnimationEnd animationend", k = "transparent";
    d.ListView = function(f, e) {
        function y() {
            Kb = Lb = !1;
            fc = oa = 0;
            gc = new Date;
            ab = ka.width();
            Db = ea(ka);
            ra = Db.index(ba);
            Ca = ba.outerHeight();
            La = ba[0].offsetTop;
            za = ub[ba.attr("data-type") || "defaults"];
            Eb = za.stages
        }
        function I(c) {
            "touchstart" === c.type && (Mb = !0,
                clearTimeout(hc));
            if (i(c, this) && !pa && !ib && !h && !Nb && a.mobiscroll.running && (Fa = pa = !0,
                    Ob = W(c, "X"),
                    Pb = W(c, "Y"),
                    Ea = la = 0,
                    ba = a(this),
                    y(),
                    Xb = ca.onItemTap || za.tap || ba.hasClass("mbsc-lv-parent") || ba.hasClass("mbsc-lv-back"),
                    Ma.offset(),
                    pb = ba.offset().top,
                Xb && (Ba = setTimeout(function() {
                    ba.addClass("mbsc-lv-item-active");
                    xa("onItemActivate", [ba, c])
                }, 120)),
                $.sortable && !ba.hasClass("mbsc-lv-back") && (($.sortable.group || (Yb = ba.nextUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item"),
                    Zb = ba.prevUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item")),
                    qb = (!$.sortable.group ? Zb.length ? Zb.eq(-1) : ba : ka.children("li").eq(0))[0].offsetTop - La,
                    jb = (!$.sortable.group ? Yb.length ? Yb.eq(-1) : ba : ka.children("li").eq(-1))[0].offsetTop - La,
                    $.sortable.handle) ? a(c.target).hasClass("mbsc-lv-handle") && (clearTimeout(Ba),
                    "Moz" === b ? (c.preventDefault(),
                        R()) : Qb = setTimeout(function() {
                        R()
                    }, 100)) : Qb = setTimeout(function() {
                    if (ca.fillAnimation) {
                        va.appendTo(ba);
                        va[0].style[b + "Animation"] = "mbsc-lv-fill " + (ca.sortDelay - 100) + "ms linear"
                    }
                    clearTimeout(bb);
                    clearTimeout(Ba);
                    Fa = false;
                    Qb = setTimeout(function() {
                        va[0].style[b + "Animation"] = "";
                        R()
                    }, ca.sortDelay - 80)
                }, 80)),
                "mousedown" == c.type))
                a(s).on("mousemove", n).on("mouseup", K)
        }
        function n(a) {
            var c = !1
                , b = !0;
            if (pa)
                if (rb = W(a, "X"),
                        Fb = W(a, "Y"),
                        la = rb - Ob,
                        Ea = Fb - Pb,
                        clearTimeout(bb),
                    !Wa && !kb && !vb && !ba.hasClass("mbsc-lv-back") && (10 < Math.abs(Ea) ? (vb = !0,
                        ba.trigger("mousemove" == a.type ? "mouseup" : "touchend"),
                        clearTimeout(Ba)) : 7 < Math.abs(la) ? G() : "touchmove" === a.type && (bb = setTimeout(function() {
                        ba.trigger("touchend")
                    }, 300))),
                        kb)
                    a.preventDefault(),
                        oa = 100 * (la / ab),
                        T();
                else if (Wa) {
                    a.preventDefault();
                    var f, d = Ha.scrollTop(), a = Math.max(qb, Math.min(Ea + wb, jb)), e = Ta ? pb - $b + d - wb : pb;
                    Gb + d < e + a + Ca ? (Ha.scrollTop(e + a - Gb + Ca),
                        f = !0) : e + a < d && (Ha.scrollTop(e + a),
                        f = !0);
                    f && (f = Ta ? Ha.scrollTop() - d : 0,
                        wb += f);
                    if (lb && ($.sortable.multiLevel && sa.hasClass("mbsc-lv-parent") ? La + Ca / 4 + a > lb ? c = !0 : La + Ca - Ca / 4 + a > lb && (Ia = sa.addClass("mbsc-lv-item-hl"),
                            b = !1) : La + Ca / 2 + a > lb && (sa.hasClass("mbsc-lv-back") ? $.sortable.multiLevel && (ma = sa.addClass("mbsc-lv-item-hl"),
                            b = !1) : c = !0),
                            c))
                        cb.insertAfter(sa),
                            Na = sa,
                            sa = ia(sa, "next"),
                            mb = lb,
                            lb = sa.length && sa[0].offsetTop,
                            ya++;
                    if (!c && mb && ($.sortable.multiLevel && Na.hasClass("mbsc-lv-parent") ? La + Ca - Ca / 4 + a < mb ? c = !0 : La + Ca / 4 + a < mb && (Ia = Na.addClass("mbsc-lv-item-hl"),
                            b = !1) : La + Ca / 2 + a < mb && (Na.hasClass("mbsc-lv-back") ? $.sortable.multiLevel && (ma = Na.addClass("mbsc-lv-item-hl"),
                            b = !1) : c = !0),
                            c))
                        cb.insertBefore(Na),
                            sa = Na,
                            Na = ia(Na, "prev"),
                            lb = mb,
                            mb = Na.length && Na[0].offsetTop + Na.outerHeight(),
                            ya--;
                    if (b && (Ia && (Ia.removeClass("mbsc-lv-item-hl"),
                            Ia = !1),
                            ma))
                        ma.removeClass("mbsc-lv-item-hl"),
                            ma = !1;
                    c && xa("onSortChange", [ba, ya]);
                    q(ba, a);
                    xa("onSort", [ba, ya])
                } else
                    (5 < Math.abs(la) || 5 < Math.abs(Ea)) && U()
        }
        function K(b) {
            var f, d;
            if (pa) {
                pa = !1;
                U();
                "mouseup" == b.type && a(s).off("mousemove", n).off("mouseup", K);
                vb || (hc = setTimeout(function() {
                    Mb = !1
                }, 300));
                if (kb || vb || Wa)
                    Kb = !0;
                kb ? F() : Wa ? (f = ka,
                    Ia ? (S(ba.detach()),
                        b = db[Ia.attr("data-ref")],
                        ya = ea(b.child).length,
                        Ia.removeClass("mbsc-lv-item-hl"),
                        ca.navigateOnDrop ? ha(Ia, function() {
                            $.add(null, ba, null, null, Ia, !0);
                            X(ba);
                            c(ba, ra, f, !0)
                        }) : ($.add(null, ba, null, null, Ia, !0),
                            c(ba, ra, f, !0))) : ma ? (S(ba.detach()),
                        b = db[ma.attr("data-back")],
                        ya = ea(b.parent).index(b.item) + 1,
                        ma.removeClass("mbsc-lv-item-hl"),
                        ca.navigateOnDrop ? ha(ma, function() {
                            $.add(null, ba, ya, null, ka, !0);
                            X(ba);
                            c(ba, ra, f, !0)
                        }) : ($.add(null, ba, ya, null, b.parent, !0),
                            c(ba, ra, f, !0))) : (b = cb[0].offsetTop - La,
                        q(ba, b, 6 * Math.abs(b - Math.max(qb, Math.min(Ea + wb, jb))), function() {
                            S(ba);
                            ba.insertBefore(cb);
                            c(ba, ra, f, ya !== ra)
                        })),
                    Wa = !1) : !vb && 5 > Math.abs(la) && 5 > Math.abs(Ea) && (za.tap && (d = za.tap.call(Qa, ba, ra, b, $)),
                Xb && ("touchend" === b.type && r.preventClick(),
                    ba.addClass("mbsc-lv-item-active"),
                    xa("onItemActivate", [ba, b])),
                    d = xa("onItemTap", [ba, ra, b]),
                !1 !== d && ha(ba));
                clearTimeout(Ba);
                setTimeout(function() {
                    ba.removeClass("mbsc-lv-item-active");
                    xa("onItemDeactivate", [ba])
                }, 100);
                vb = !1;
                Ja = null
            }
        }
        function G() {
            if (kb = aa(za.swipe, [ba, ra, 0 < la ? "right" : "left", $]))
                U(),
                    clearTimeout(Ba),
                    za.actions ? (ja = w(za),
                        Oa.html(za.icons).show().children().css("width", ja + "%"),
                        Oa.find(".mbsc-lv-multi-ic-right").css("margin-left", 100 - ja + "%"),
                        Da.hide(),
                        a(".mbsc-lv-ic-m", Aa).removeClass("mbsc-lv-ic-disabled"),
                        a(za.leftMenu).each(x),
                        a(za.rightMenu).each(x)) : (Da.show(),
                        Oa.hide(),
                        Ra = za.start + (0 < la ? 0 : 1),
                        sb = Eb[Ra - 1],
                        tb = Eb[Ra]),
                    ba.addClass("mbsc-lv-item-swiping").removeClass("mbsc-lv-item-active"),
                    Rb.css("line-height", Ca + "px"),
                    Aa.css({
                        top: La,
                        height: Ca,
                        backgroundColor: (0 < la ? za.right : za.left).color || k
                    }).addClass("mbsc-lv-stage-c-v").appendTo(ka),
                ca.iconSlide && ba.append(Da),
                    xa("onSlideStart", [ba, ra])
        }
        function T() {
            var a = !1;
            if (!Sb) {
                if (za.actions)
                    Aa.attr("class", "mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-" + (0 > oa ? "right" : "left"));
                else if (sb && oa <= sb.percent ? (Ra--,
                        tb = sb,
                        sb = Eb[Ra],
                        a = !0) : tb && oa >= tb.percent && (Ra++,
                        sb = tb,
                        tb = Eb[Ra],
                        a = !0),
                        a)
                    if (Ja = 0 < oa ? sb : tb)
                        Z(Ja, ca.iconSlide),
                            xa("onStageChange", [ba, ra, Ja]);
                xb || (Sb = !0,
                    ic = o(N))
            }
        }
        function F(c) {
            var b, f, d = !1;
            B(ic);
            Sb = !1;
            xb || N();
            if (za.actions)
                10 < Math.abs(oa) && ja && (P(ba, 0 > oa ? -ja : ja, 200),
                    h = d = !0,
                    Ka = ba,
                    gb = ra,
                    a(s).on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
                        a.preventDefault();
                        M(ba, !0, c)
                    }));
            else if (ca.quickSwipe && !xb && (f = new Date - gc,
                    b = 300 > f && -50 > la,
                    f = 300 > f && 50 < la,
                    b ? (Lb = !0,
                        Ja = za.left,
                        Z(Ja, ca.iconSlide)) : f && (Lb = !0,
                        Ja = za.right,
                        Z(Ja, ca.iconSlide))),
                Ja && Ja.action)
                Sa = aa(Ja.disabled, [ba, ra, $]),
                Sa || (d = !0,
                    (h = xb || aa(Ja.confirm, [ba, ra, $])) ? (P(ba, 100 * (0 > oa ? -1 : 1) * Da.outerWidth(!0) / ab, 200, !0),
                        l(Ja, ba, ra, !1, c)) : L(Ja, ba, ra, c));
            d || M(ba, !0, c);
            kb = !1
        }
        function R() {
            Wa = !0;
            ma = Ia = !1;
            wb = 0;
            ya = ra;
            ca.vibrate && O();
            sa = ia(ba, "next");
            lb = sa.length && sa[0].offsetTop;
            Na = ia(ba, "prev");
            mb = Na.length && Na[0].offsetTop + Na.outerHeight();
            cb.height(Ca).insertAfter(ba);
            ba.css({
                top: La
            }).addClass("mbsc-lv-item-dragging").removeClass("mbsc-lv-item-active").appendTo(Ua);
            xa("onSortStart", [ba, ya])
        }
        function c(a, c, b, f) {
            a.removeClass("mbsc-lv-item-dragging");
            cb.remove();
            xa("onSortStop", [a, ya]);
            ca.vibrate && O();
            f && ($.addUndoAction(function(f) {
                $.move(a, c, null, f, b, !0)
            }, !0),
                xa("onSortUpdate", [a, ya]))
        }
        function H() {
            Mb || (clearTimeout(Hb),
            h && a(s).trigger("touchstart"),
            yb && ($.close(Ga, Xa),
                yb = !1,
                Ga = null))
        }
        function x(c, b) {
            aa(b.disabled, [ba, ra, $]) && a(".mbsc-ic-" + b.icon, Aa).addClass("mbsc-lv-ic-disabled")
        }
        function L(c, b, f, d) {
            var e, g = {
                icon: "undo2",
                text: ca.undoText,
                color: "#b1b1b1",
                action: function() {
                    $.undo()
                }
            };
            c.undo && ($.startActionTrack(),
            a.isFunction(c.undo) && $.addUndoAction(function() {
                c.undo.call(Qa, b, $, f)
            }),
                Tb = b.attr("data-ref"));
            e = c.action.call(Qa, b, $, f);
            c.undo ? ($.endActionTrack(),
            !1 !== e && P(b, 0 > +b.attr("data-pos") ? -100 : 100, 200),
                cb.height(Ca).insertAfter(b),
                b.css("top", La).addClass("mbsc-lv-item-undo"),
                Oa.hide(),
                Da.show(),
                Aa.append(Da),
                Z(g),
                l(g, b, f, !0, d)) : M(b, e, d)
        }
        function l(c, b, f, d, e) {
            var g, oa;
            h = !0;
            a(s).off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
                a.preventDefault();
                d && Q(b);
                M(b, !0, e)
            });
            if (!Ya)
                Da.off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function(a) {
                    a.stopPropagation();
                    g = W(a, "X");
                    oa = W(a, "Y")
                }).on("touchend.mbsc-lv-conf mouseup.mbsc-lv-conf", function(a) {
                    a.preventDefault();
                    "touchend" === a.type && r.preventClick();
                    20 > Math.abs(W(a, "X") - g) && 20 > Math.abs(W(a, "Y") - oa) && (L(c, b, f, e),
                    d && (Ub = null,
                        Q(b)))
                })
        }
        function N() {
            P(ba, fc + 100 * la / ab);
            Sb = !1
        }
        function M(c, b, f) {
            a(s).off(".mbsc-lv-conf");
            Da.off(".mbsc-lv-conf");
            !1 !== b ? P(c, 0, "0" !== c.attr("data-pos") ? 200 : 0, !1, function() {
                J(c, f);
                S(c)
            }) : J(c, f);
            h = !1
        }
        function P(a, c, f, d, e) {
            c = Math.max("right" == kb ? 0 : -100, Math.min(c, "left" == kb ? 0 : 100));
            Za = a[0].style;
            a.attr("data-pos", c);
            g ? (Za[b + "Transform"] = "translate3d(" + (d ? ab * c / 100 + "px" : c + "%") + ",0,0)",
                Za[b + "Transition"] = p + "transform " + (f || 0) + "ms") : Za.left = c + "%";
            e && (ib++,
                setTimeout(function() {
                    e();
                    ib--
                }, f));
            oa = c
        }
        function q(a, c, f, d) {
            c = Math.max(qb, Math.min(c, jb));
            Za = a[0].style;
            g ? (Za[b + "Transform"] = "translate3d(0," + c + "px,0)",
                Za[b + "Transition"] = p + "transform " + (f || 0) + "ms ease-out") : Za.top = La + c + "px";
            d && (ib++,
                setTimeout(function() {
                    d();
                    ib--
                }, f))
        }
        function U() {
            clearTimeout(Qb);
            !Fa && $.sortable && ca.fillAnimation && (Fa = !0,
                va.remove())
        }
        function Z(a, c) {
            var b = aa(a.text, [ba, ra, $]) || "";
            aa(a.disabled, [ba, ra, $]) ? Aa.addClass("mbsc-lv-ic-disabled") : Aa.removeClass("mbsc-lv-ic-disabled");
            Aa.css("background-color", a.color || (0 === a.percent ? (0 < oa ? za.right : za.left).color || k : k));
            Da.attr("class", "mbsc-lv-ic-c mbsc-lv-ic-" + (c ? "move-" : "") + (0 > oa ? "right" : "left"));
            na.attr("class", " mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-" + (a.icon || "none"));
            Rb.attr("class", "mbsc-lv-ic-text" + (a.icon ? "" : " mbsc-lv-ic-text-only") + (b ? "" : " mbsc-lv-ic-only")).html(b || "&nbsp;");
            ca.animateIcons && (Lb ? na.addClass("mbsc-lv-ic-v") : setTimeout(function() {
                na.addClass("mbsc-lv-ic-a")
            }, 10))
        }
        function J(a, c) {
            pa || (na.attr("class", "mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"),
                Aa.attr("style", "").removeClass("mbsc-lv-stage-c-v"),
                Rb.html(""));
            Aa.removeClass("mbsc-lv-left mbsc-lv-right");
            a && (xa("onSlideEnd", [a, ra]),
            c && c())
        }
        function Q(a) {
            a.css("top", "").removeClass("mbsc-lv-item-undo");
            Ub ? $.animate(cb, "collapse", function() {
                cb.remove()
            }) : cb.remove();
            J();
            Ub = Tb = null
        }
        function S(a) {
            Za = a[0].style;
            Za[b + "Transform"] = "";
            Za[b + "Transition"] = "";
            Za.top = "";
            a.removeClass("mbsc-lv-item-swiping")
        }
        function aa(c, b) {
            return a.isFunction(c) ? c.apply(this, b) : c
        }
        function Y(c) {
            var b;
            c.attr("data-ref") || (b = v++,
                c.attr("data-ref", b),
                db[b] = {
                    item: c,
                    child: c.children("ul,ol"),
                    parent: c.parent(),
                    ref: c.parent()[0] === Qa ? null : c.parent().parent().attr("data-ref")
                });
            c.addClass("mbsc-lv-item");
            $.sortable.handle && "list-divider" != c.attr("data-role") && !c.children(".mbsc-lv-handle-c").length && c.append(nb);
            if (ca.enhance && !c.hasClass("mbsc-lv-item-enhanced")) {
                b = c.attr("data-icon");
                var f = c.find("img").eq(0).addClass("mbsc-lv-img");
                f.is(":first-child") ? c.addClass("mbsc-lv-img-" + (ca.rtl ? "right" : "left")) : f.length && c.addClass("mbsc-lv-img-" + (ca.rtl ? "left" : "right"));
                c.addClass("mbsc-lv-item-enhanced").children().each(function(c, b) {
                    b = a(b);
                    b.is("p, h1, h2, h3, h4, h5, h6") && b.addClass("mbsc-lv-txt")
                });
                b && c.addClass("mbsc-lv-item-ic-" + (c.attr("data-icon-align") || (ca.rtl ? "right" : "left"))).append('<div class="mbsc-lv-item-ic mbsc-ic mbsc-ic-' + b + '"></div')
            }
        }
        function D(c) {
            a("li", c).not(".mbsc-lv-item").each(function() {
                Y(a(this))
            });
            a('li[data-role="list-divider"]', c).removeClass("mbsc-lv-item").addClass("mbsc-lv-gr-title");
            a("ul,ol", c).not(".mbsc-lv").addClass("mbsc-lv").prepend(Pa).parent().addClass("mbsc-lv-parent").prepend($a);
            a(".mbsc-lv-back", c).each(function() {
                a(this).attr("data-back", a(this).parent().parent().attr("data-ref"))
            })
        }
        function ea(a) {
            return a.children("li").not(".mbsc-lv-back").not(".mbsc-lv-removed").not(".mbsc-lv-ph")
        }
        function ga(c) {
            "object" !== typeof c && (c = a('li[data-id="' + c + '"]', wa));
            return c
        }
        function ia(a, c) {
            for (a = a[c](); a.length && (!a.hasClass("mbsc-lv-item") || a.hasClass("mbsc-lv-ph") || a.hasClass("mbsc-lv-item-dragging")); ) {
                if (!$.sortable.group && a.hasClass("mbsc-lv-gr-title"))
                    return !1;
                a = a[c]()
            }
            return a
        }
        function fa(a) {
            return r.isNumeric(a) ? a + "" : 0
        }
        function w(a) {
            return +(0 > la ? fa((a.actionsWidth || 0).right) || fa(a.actionsWidth) || fa(ca.actionsWidth.right) || fa(ca.actionsWidth) : fa((a.actionsWidth || 0).left) || fa(a.actionsWidth) || fa(ca.actionsWidth.left) || fa(ca.actionsWidth))
        }
        function X(a) {
            var c;
            a && (a = a.offset().top,
                c = Ta ? $b : Ha.scrollTop(),
                a < c ? Ha.scrollTop(a - (Ta ? Ha.children().offset().top : 0)) : a > c + Gb && Ha.scrollTop(a - Gb / 2))
        }
        function da(a, c, b, f) {
            var d = c.parent()
                , e = c.prev()
                , f = f || A;
            e[0] === Da[0] && (e = Da.prev());
            ka[0] !== c[0] ? (xa("onNavStart", [zb, a, c]),
                ac.prepend(c.addClass("mbsc-lv-v mbsc-lv-sl-new")),
                X(wa),
                V(ac, "mbsc-lv-sl-" + a, function() {
                    ka.removeClass("mbsc-lv-sl-curr");
                    c.removeClass("mbsc-lv-sl-new").addClass("mbsc-lv-sl-curr");
                    hb && hb.length ? ka.removeClass("mbsc-lv-v").insertAfter(hb) : ob.append(ka.removeClass("mbsc-lv-v"));
                    hb = e;
                    ob = d;
                    ka = c;
                    X(b);
                    f.call(Qa, b);
                    xa("onNavEnd", [zb, a, c])
                })) : (X(b),
                f.call(Qa, b))
        }
        function ha(a, c) {
            ib || (a.hasClass("mbsc-lv-parent") ? (zb++,
                da("r", db[a.attr("data-ref")].child, null, c)) : a.hasClass("mbsc-lv-back") && (zb--,
                da("l", db[a.attr("data-back")].parent, db[a.attr("data-back")].item, c)))
        }
        function V(a, c, b) {
            function f() {
                clearTimeout(d);
                ib--;
                a.off(C, f).removeClass(c);
                b.call(Qa, a)
            }
            var d, b = b || A;
            g && ca.animation && "mbsc-lv-item-none" !== c ? (ib++,
                a.on(C, f).addClass(c),
                d = setTimeout(f, 500)) : b.call(Qa, a)
        }
        function E(a, c) {
            var b, f = a.attr("data-ref");
            b = bc[f] = bc[f] || [];
            c && b.push(c);
            a.attr("data-action") || (c = b.shift(),
                a.attr("data-action", 1),
                c(function() {
                    a.removeAttr("data-action");
                    b.length ? E(a) : delete bc[f]
                }))
        }
        function ua(c, b, f) {
            var d, e;
            c && c.length && (d = 100 / (c.length + 2),
                a.each(c, function(a, g) {
                    g.key === t && (g.key = cc++);
                    g.percent === t && (g.percent = b * d * (a + 1),
                    f && (e = j({}, g),
                        e.key = cc++,
                        e.percent = -d * (a + 1),
                        c.push(e),
                        Vb[e.key] = e));
                    Vb[g.key] = g
                }))
        }
        var pa, ja, Ba, oa, Fa, Ka, gb, wa, ya, qa, ka, hb, ob, Db, Ja, Ra, Va, Ya, Sa, la, Ea, Ia, ma, Wa, Ua, bb, rb, Fb, xa, va, eb, ta, Ab, Bb, Wb, z, Ta, nb, Ib, Ga, yb, Xa, fb, Hb, Pa, $a, na, Da, Aa, ab, ba, Ca, ra, pb, jb, qb, Oa, sa, lb, tb, Yb, Kb, Mb, hc, Zb, cb, Na, mb, sb, Lb, ic, Sb, ca, vb, xb, ac, cc, Eb, fc, gc, Ob, Pb, Za, kb, dc, jc, Xb, Rb, Qb, za, ub, Tb, Ub, Ha, Gb, wb, $b, $ = this, Qa = f, Ma = a(Qa), ib = 0, zb = 0, La = 0, Vb = {}, bc = {}, db = {};
        d.Base.call(this, f, e, !0);
        $.animate = function(a, c, b) {
            V(a, "mbsc-lv-item-" + c, b)
        }
        ;
        $.add = function(c, b, f, d, e, g) {
            var oa, i, l, o, h, x, k = "", H = e === t ? Ma : ga(e), u = H, q = "object" !== typeof b ? a('<li data-ref="' + v++ + '" data-id="' + c + '">' + b + "</li>") : b, B = 0 > q.attr("data-pos") ? "left" : "right", r = q.attr("data-ref"), d = d || A;
            r || (r = v++,
                q.addClass("mbsc-lv-item").attr("data-ref", r));
            Y(q);
            g || $.addUndoAction(function(a) {
                o ? $.navigate(H, function() {
                    u.remove();
                    H.removeClass("mbsc-lv-parent").children(".mbsc-lv-arr").remove();
                    h.child = H.children("ul,ol");
                    $.remove(q, null, a, true)
                }) : $.remove(q, null, a, true)
            }, !0);
            E(q, function(c) {
                S(q.css("top", "").removeClass("mbsc-lv-item-undo"));
                if (H.is("li")) {
                    x = H.attr("data-ref");
                    if (!H.children("ul,ol").length) {
                        o = true;
                        H.append("<ul></ul>")
                    }
                } else
                    x = H.children(".mbsc-lv-back").attr("data-back");
                if (h = db[x])
                    if (h.child.length)
                        u = h.child;
                    else {
                        H.addClass("mbsc-lv-parent").prepend($a);
                        u = H.children("ul,ol").prepend(Pa).addClass("mbsc-lv");
                        h.child = u;
                        a(".mbsc-lv-back", H).attr("data-back", x)
                    }
                db[r] = {
                    item: q,
                    child: q.children("ul,ol"),
                    parent: u,
                    ref: x
                };
                l = ea(u);
                i = l.length;
                if (f === t || f === null)
                    f = i;
                g && (k = "mbsc-lv-item-new-" + (g ? B : ""));
                D(q.addClass(k));
                if (f !== false)
                    if (i)
                        f < i ? q.insertBefore(l.eq(f)) : q.insertAfter(l.eq(i - 1));
                    else {
                        oa = a(".mbsc-lv-back", u);
                        oa.length ? q.insertAfter(oa) : u.append(q)
                    }
                if (u.hasClass("mbsc-lv-v"))
                    $.animate(q.height(q.outerHeight()), g && Tb === r ? "none" : "expand", function(a) {
                        $.animate(a.height(""), g ? "add-" + B : "pop-in", function(a) {
                            d.call(Qa, a.removeClass(k));
                            c()
                        })
                    });
                else {
                    d.call(Qa, q.removeClass(k));
                    c()
                }
                wa.trigger("mbsc-enhance", [{
                    theme: ca.theme,
                    lang: ca.lang
                }]);
                xa("onItemAdd", [q])
            })
        }
        ;
        $.swipe = function(a, c, b, f, d) {
            ba = a = ga(a);
            Ya = f;
            pa = xb = !0;
            b = b === t ? 300 : b;
            la = 0 < c ? 1 : -1;
            y();
            G();
            P(a, c, b);
            clearTimeout(jc);
            clearInterval(dc);
            dc = setInterval(function() {
                oa = 100 * (r.getPosition(a) / ab);
                T()
            }, 10);
            jc = setTimeout(function() {
                clearInterval(dc);
                oa = c;
                T();
                F(d);
                pa = xb = Ya = !1
            }, b)
        }
        ;
        $.openStage = function(a, c, b, f) {
            Vb[c] && $.swipe(a, Vb[c].percent, b, f)
        }
        ;
        $.openActions = function(a, c, b, f) {
            var d = w(ub[a.attr("data-type") || "defaults"]);
            $.swipe(a, "left" == c ? -d : d, b, f)
        }
        ;
        $.close = function(a, c) {
            $.swipe(a, 0, c)
        }
        ;
        $.remove = function(a, c, b, f) {
            var d, e, b = b || A, a = ga(a);
            a.length && (e = a.parent(),
                d = ea(e).index(a),
            f || (a.attr("data-ref") === Tb && (Ub = !0),
                $.addUndoAction(function(c) {
                    $.add(null, a, d, c, e, !0)
                }, !0)),
                E(a, function(d) {
                    c = c || a.attr("data-pos") < 0 ? "left" : "right";
                    if (e.hasClass("mbsc-lv-v"))
                        $.animate(a.addClass("mbsc-lv-removed"), f ? "pop-out" : "remove-" + c, function(a) {
                            $.animate(a.height(a.outerHeight()), "collapse", function(a) {
                                S(a.height("").removeClass("mbsc-lv-removed").remove());
                                b.call(Qa, a);
                                d()
                            })
                        });
                    else {
                        a.remove();
                        b.call(Qa, a);
                        d()
                    }
                    xa("onItemRemove", [a])
                }))
        }
        ;
        $.move = function(a, c, b, f, d, e) {
            a = ga(a);
            e || $.startActionTrack();
            Aa.append(Da);
            $.remove(a, b, null, e);
            $.add(null, a, c, f, d, e);
            e || $.endActionTrack()
        }
        ;
        $.navigate = function(a, c) {
            var b, f, a = ga(a);
            b = db[a.attr("data-ref")];
            f = 0;
            for (var d = db[a.attr("data-ref")]; d.ref; )
                f++,
                    d = db[d.ref];
            b && (da(f >= zb ? "r" : "l", b.parent, a, c),
                zb = f)
        }
        ;
        $.init = function(c) {
            var b = Ma.find("ul,ol").length ? "left" : "right"
                , f = 0
                , d = ""
                , e = ""
                , i = "";
            $._init(c);
            c = ca.sort || ca.sortable;
            "group" === c && (c = {
                group: !1,
                multiLevel: !0
            });
            !0 === c && (c = {
                group: !0,
                multiLevel: !0,
                handle: ca.sortHandle
            });
            c && c.handle === t && (c.handle = ca.sortHandle);
            $.sortable = c || !1;
            d += '<div class="mbsc-lv-multi-c"></div><div class="mbsc-lv-ic-c"><div class="mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"></div><div class="mbsc-lv-ic-text"></div></div>';
            Ma.addClass("mbsc-lv mbsc-lv-v mbsc-lv-root").show();
            Aa = a('<div class="mbsc-lv-stage-c">' + d + "</div>");
            Da = a(".mbsc-lv-ic-c", Aa);
            Oa = a(".mbsc-lv-multi-c", Aa);
            na = a(".mbsc-lv-ic-s", Aa);
            Rb = a(".mbsc-lv-ic-text", Aa);
            cb = a('<li class="mbsc-lv-item mbsc-lv-ph"></li>');
            va = a('<div class="mbsc-lv-fill-item"></div>');
            wa = a('<div class="mbsc-lv-cont mbsc-lv-' + ca.theme + (ca.baseTheme ? " mbsc-lv-" + ca.baseTheme : "") + (ca.animateIcons ? " mbsc-lv-ic-anim" : "") + (g ? "" : " mbsc-lv-no3d") + (ca.altRow ? " mbsc-lv-alt-row " : "") + '"><ul class="mbsc-lv mbsc-lv-dummy"></ul><div class="mbsc-lv-sl-c"></div></div>');
            Ta = "body" !== ca.context;
            Ha = a(Ta ? ca.context : m);
            Ua = a(".mbsc-lv-dummy", wa);
            wa.insertAfter(Ma);
            $.sortable.handle && (z = !0 === $.sortable.handle ? b : $.sortable.handle,
                nb = '<div class="mbsc-lv-handle-c mbsc-lv-item-h-' + z + ' mbsc-lv-handle"><div class="' + ca.handleClass + ' mbsc-lv-handle-bar-c mbsc-lv-handle">' + ca.handleMarkup + "</div></div>",
                wa.addClass("mbsc-lv-handle-" + z));
            Ha.on("orientationchange.mbsc-lv resize.mbsc-lv", function() {
                clearTimeout(Va);
                Va = setTimeout(function() {
                    Gb = Ha[0].innerHeight || Ha.innerHeight();
                    $b = Ta ? Ha.offset().top : 0;
                    if (pa) {
                        La = ba[0].offsetTop;
                        Ca = ba.outerHeight();
                        Aa.css({
                            top: La,
                            height: Ca
                        })
                    }
                }, 200)
            }).trigger("resize.mbsc-lv");
            wa.on("touchstart mousedown", ".mbsc-lv-item", I).on("touchmove", ".mbsc-lv-item", n).on("touchend touchcancel", ".mbsc-lv-item", K);
            Qa.addEventListener && Qa.addEventListener("click", function(a) {
                if (Kb) {
                    a.stopPropagation();
                    a.preventDefault();
                    Kb = false
                }
            }, !0);
            wa.on("touchstart mousedown", ".mbsc-lv-ic-m", function(a) {
                if (!Ya) {
                    a.stopPropagation();
                    a.preventDefault()
                }
                Ob = W(a, "X");
                Pb = W(a, "Y")
            }).on("touchend mouseup", ".mbsc-lv-ic-m", function(c) {
                if (!Ya) {
                    c.type === "touchend" && r.preventClick();
                    h && !a(this).hasClass("mbsc-lv-ic-disabled") && Math.abs(W(c, "X") - Ob) < 20 && Math.abs(W(c, "Y") - Pb) < 20 && L((oa < 0 ? za.rightMenu : za.leftMenu)[a(this).index()], Ka, gb)
                }
            });
            ac = a(".mbsc-lv-sl-c", wa).append(Ma.addClass("mbsc-lv-sl-curr")).attr("data-ref", v++);
            ka = Ma;
            ob = wa;
            Pa = '<li class="mbsc-lv-item mbsc-lv-back">' + ca.backText + '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ca.leftArrowClass + '"></div></li>';
            $a = '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ca.rightArrowClass + '"></div>';
            D(Ma);
            cc = 0;
            ub = ca.itemGroups || {};
            ub.defaults = {
                swipeleft: ca.swipeleft,
                swiperight: ca.swiperight,
                stages: ca.stages,
                actions: ca.actions,
                actionsWidth: ca.actionsWidth
            };
            a.each(ub, function(c, b) {
                b.swipe = b.swipe || ca.swipe;
                b.stages = b.stages || [];
                ua(b.stages, 1, true);
                ua(b.stages.left, 1);
                ua(b.stages.right, -1);
                if (b.stages.left || b.stages.right)
                    b.stages = [].concat(b.stages.left || [], b.stages.right || []);
                eb = false;
                if (!b.stages.length) {
                    b.swipeleft && b.stages.push({
                        percent: -30,
                        action: b.swipeleft
                    });
                    b.swiperight && b.stages.push({
                        percent: 30,
                        action: b.swiperight
                    })
                }
                a.each(b.stages, function(a, c) {
                    if (c.percent === 0) {
                        eb = true;
                        return false
                    }
                });
                eb || b.stages.push({
                    percent: 0
                });
                b.stages.sort(function(a, c) {
                    return a.percent - c.percent
                });
                a.each(b.stages, function(a, c) {
                    if (c.percent === 0) {
                        b.start = a;
                        return false
                    }
                });
                if (eb)
                    b.left = b.right = b.stages[b.start];
                else {
                    b.left = b.stages[b.start - 1] || {};
                    b.right = b.stages[b.start + 1] || {}
                }
                if (b.actions) {
                    b.leftMenu = b.actions.left || b.actions;
                    b.rightMenu = b.actions.right || b.leftMenu;
                    i = e = "";
                    for (f = 0; f < b.leftMenu.length; f++)
                        e = e + ('<div class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + b.leftMenu[f].icon + '"></div>');
                    for (f = 0; f < b.rightMenu.length; ++f)
                        i = i + ('<div class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + b.rightMenu[f].icon + '"></div>');
                    if (b.actions.left)
                        b.swipe = b.actions.right ? b.swipe : "right";
                    if (b.actions.right)
                        b.swipe = b.actions.left ? b.swipe : "left";
                    b.icons = '<div class="mbsc-lv-multi mbsc-lv-multi-ic-left">' + e + '</div><div class="mbsc-lv-multi mbsc-lv-multi-ic-right">' + i + "</div>"
                }
            });
            ca.fixedHeader && (ta = a('<div class="mbsc-lv-fixed-header"></div>'),
                Ab = a(".mbsc-lv-gr-title", Ma),
                Ta ? (Ha.before(ta),
                    ta.addClass("mbsc-lv-fixed-header-ctx mbsc-lv-" + ca.theme + (ca.baseTheme ? " mbsc-lv-" + ca.baseTheme : ""))) : wa.prepend(ta),
                Ha.on("scroll.mbsc-lv touchmove.mbsc-lv", function() {
                    if (Wa || !pa) {
                        var c = a(this).scrollTop()
                            , b = Ma.offset().top;
                        Ab.each(function(f, d) {
                            if (a(d).offset().top - (Ta ? b : 0) < c)
                                Bb = f
                        });
                        qa = Ab[Bb];
                        b < (Ta ? Ha.offset().top : c) && c < (Ta ? Ma[0].scrollHeight : b + Ma.height()) ? ta.empty().append(a(qa).clone()).show() : ta.hide()
                    }
                }));
            ca.rtl && wa.addClass("mbsc-lv-rtl");
            ca.hover && (Xa = ca.hover.time || 200,
                fb = ca.hover.timeout || 200,
                Ib = ca.hover.direction || ca.hover || "right",
                wa.on("mouseenter.mbsc-lv", ".mbsc-lv-item", function() {
                    if (!Ga || Ga[0] != this) {
                        H();
                        Ga = a(this);
                        if (ub[Ga.attr("data-type") || "defaults"].actions)
                            Hb = setTimeout(function() {
                                if (Mb)
                                    Ga = null;
                                else {
                                    yb = true;
                                    $.openActions(Ga, Ib, Xa, false)
                                }
                            }, fb)
                    }
                }).on("mouseleave.mbsc-lv", H));
            Ma.is("[mbsc-enhance]") && (Wb = !0,
                Ma.removeAttr("mbsc-enhance"),
                wa.attr("mbsc-enhance", ""));
            wa.trigger("mbsc-enhance", [{
                theme: ca.theme,
                lang: ca.lang
            }]);
            xa("onInit", [])
        }
        ;
        $.destroy = function() {
            ob.append(ka);
            Ta && ta && ta.remove();
            Wb && Ma.attr("mbsc-enhance", "");
            wa.find(".mbsc-lv-txt,.mbsc-lv-img").removeClass("mbsc-lv-txt mbsc-lv-img");
            wa.find("ul,ol").removeClass("mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr").find("li").removeClass("mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right").removeAttr("data-ref");
            a(".mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic", wa).remove();
            Ma.insertAfter(wa);
            wa.off().remove();
            Aa.remove();
            Ha.off(".mbsc-lv");
            $._destroy()
        }
        ;
        var Nb, kc = [], Cb = [], ec = [], Jb = 0;
        $.startActionTrack = function() {
            Jb || (ec = []);
            Jb++
        }
        ;
        $.endActionTrack = function() {
            Jb--;
            Jb || Cb.push(ec)
        }
        ;
        $.addUndoAction = function(a, c) {
            var b = {
                action: a,
                async: c
            };
            Jb ? ec.push(b) : (Cb.push([b]),
            Cb.length > ca.undoLimit && Cb.shift())
        }
        ;
        $.undo = function() {
            function a() {
                0 > f ? (Nb = !1,
                    c()) : (b = d[f],
                    f--,
                    b.async ? b.action(a) : (b.action(),
                        a()))
            }
            function c() {
                if (d = kc.shift())
                    Nb = !0,
                        f = d.length - 1,
                        a()
            }
            var b, f, d;
            Cb.length && kc.push(Cb.pop());
            Nb || c()
        }
        ;
        ca = $.settings;
        xa = $.trigger;
        $.init(e)
    }
    ;
    d.ListView.prototype = {
        _class: "listview",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: {
            actionsWidth: 90,
            sortDelay: 250,
            undoLimit: 10,
            swipe: !0,
            quickSwipe: !0,
            animateIcons: !0,
            fillAnimation: !0,
            animation: !0,
            revert: !0,
            handleClass: "",
            handleMarkup: '<div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div>',
            leftArrowClass: "mbsc-ic-arrow-left4",
            rightArrowClass: "mbsc-ic-arrow-right4",
            backText: "Back",
            undoText: "Undo",
            stages: []
        }
    };
    e.themes.listview.mobiscroll = {
        leftArrowClass: "mbsc-ic-arrow-left5",
        rightArrowClass: "mbsc-ic-arrow-right5"
    };
    e.presetShort("listview", "ListView")
})($, window, document);
(function(a, m) {
    var s, t = function() {}, h = a.mobiscroll, j = h.util, e = j.getCoord, d = j.testTouch;
    h.classes.Form = function(r, m) {
        function b(b) {
            var d = {}
                , e = b[0]
                , g = b.parent()
                , i = b.attr("data-password-toggle")
                , o = b.attr("data-icon-show") || "eye"
                , h = b.attr("data-icon-hide") || "eye-blocked";
            i && (d.right = "password" == e.type ? o : h);
            j.addIcon(b, d);
            i && k.tap(g.find(".mbsc-right-ic"), function() {
                if (e.type == "text") {
                    e.type = "password";
                    a(this).addClass("mbsc-ic-" + o).removeClass("mbsc-ic-" + h)
                } else {
                    e.type = "text";
                    a(this).removeClass("mbsc-ic-" + o).addClass("mbsc-ic-" + h)
                }
            })
        }
        function g() {
            if (!a(this).hasClass("mbsc-textarea-scroll")) {
                var b = this.offsetHeight + (this.scrollHeight - this.offsetHeight);
                this.scrollTop = 0;
                this.style.height = b + "px"
            }
        }
        function W(b) {
            var d, e;
            if (b.offsetHeight && (b.style.height = "",
                    d = b.scrollHeight - b.offsetHeight,
                    d = b.offsetHeight + (0 < d ? d : 0),
                    e = Math.round(d / 24),
                    10 < e ? (b.scrollTop = d,
                        d = 240 + (d - 24 * e),
                        a(b).addClass("mbsc-textarea-scroll")) : a(b).removeClass("mbsc-textarea-scroll"),
                    d))
                b.style.height = d + "px"
        }
        function i() {
            clearTimeout(o);
            o = setTimeout(function() {
                a("textarea.mbsc-control", C).each(function() {
                    W(this)
                })
            }, 100)
        }
        function O(a) {
            return !(!a.id || !h.instances[a.id])
        }
        var v, A, o, B, C = a(r), k = this;
        h.classes.Base.call(this, r, m, !0);
        k.refresh = function() {
            a("input,select,textarea,progress,button", C).each(function() {
                function f() {
                    a("input", t).val(-1 != v.selectedIndex ? v.options[v.selectedIndex].text : "")
                }
                var i, r, m, n, v = this, p = a(v), t = p.parent();
                i = p.attr("data-role");
                var F = p.attr("type") || v.nodeName.toLowerCase();
                if ("false" != p.attr("data-enhance") && a.mobiscroll.running) {
                    if (!p.hasClass("mbsc-control"))
                        switch (/(switch|range|segmented|stepper)/.test(i) && (F = i),
                        "button" != F && "submit" != F && "segmented" != F && (t.find("label").addClass("mbsc-label"),
                            t.contents().filter(function() {
                                return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue)
                            }).each(function() {
                                a('<span class="mbsc-label"></span>').insertAfter(this).append(this)
                            })),
                            p.addClass("mbsc-control"),
                            F) {
                            case "button":
                            case "submit":
                                i = p.attr("data-icon");
                                p.addClass("mbsc-btn");
                                i && (p.prepend('<span class="mbsc-btn-ic mbsc-ic mbsc-ic-' + i + '"></span>'),
                                "" === p.text() && p.addClass("mbsc-btn-icon-only"));
                                break;
                            case "switch":
                                t.prepend(p);
                                O(v) || new h.classes.Switch(v,{
                                    theme: A.theme,
                                    onText: A.onText,
                                    offText: A.offText
                                });
                                break;
                            case "checkbox":
                                t.prepend(p).addClass("mbsc-checkbox");
                                p.after('<span class="mbsc-checkbox-box"></span>');
                                break;
                            case "range":
                                !t.hasClass("mbsc-slider") && !O(v) && new h.classes.Slider(v,{
                                    theme: A.theme
                                });
                                break;
                            case "progress":
                                O(v) || new h.classes.Progress(v,{
                                    theme: A.theme
                                });
                                break;
                            case "radio":
                                t.addClass("mbsc-radio");
                                p.after('<span class="mbsc-radio-box"><span></span></span>');
                                break;
                            case "select":
                            case "select-one":
                            case "select-multiple":
                                i = p.prev().is("input.mbsc-control") ? p.prev() : a('<input tabindex="-1" type="text" class="mbsc-control mbsc-control-ev" readonly>');
                                b(p);
                                t.addClass("mbsc-input mbsc-select");
                                p.after(i);
                                i.after('<span class="mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"></span>');
                                break;
                            case "textarea":
                                b(p);
                                t.addClass("mbsc-input mbsc-textarea");
                                break;
                            case "segmented":
                                var R, c;
                                p.parent().hasClass("mbsc-segmented-item") || (c = a('<div class="mbsc-segmented"></div>'),
                                    t.after(c),
                                    a('input[name="' + p.attr("name") + '"]', C).each(function(b, d) {
                                        R = a(d).parent();
                                        R.addClass("mbsc-segmented-item").append('<span class="mbsc-segmented-content">' + (a(d).attr("data-icon") ? ' <span class="mbsc-ic mbsc-ic-' + a(d).attr("data-icon") + '"></span> ' : "") + (R.text() || "") + "</span>");
                                        R.contents().filter(function() {
                                            return this.nodeType === 3
                                        }).remove();
                                        c.append(R)
                                    }));
                                break;
                            case "stepper":
                                O(v) || new h.classes.Stepper(v,{
                                    form: k
                                });
                                break;
                            case "hidden":
                                break;
                            default:
                                b(p),
                                    t.addClass("mbsc-input")
                        }
                    if (!p.hasClass("mbsc-control-ev")) {
                        /select/.test(F) && (p.on("change.mbsc-form", f),
                            f());
                        if ("textarea" == F)
                            p.on("keydown.mbsc-form input.mbsc-form", function() {
                                clearTimeout(o);
                                o = setTimeout(function() {
                                    W(v)
                                }, 100)
                            }).on("scroll.mbsc-form", g);
                        p.addClass("mbsc-control-ev").on("touchstart.mbsc-form mousedown.mbsc-form", function(c) {
                            if (d(c, this)) {
                                m = e(c, "X", true);
                                n = e(c, "Y", true);
                                s && s.removeClass("mbsc-active");
                                if (!v.disabled) {
                                    r = true;
                                    s = a(this);
                                    a(this).addClass("mbsc-active");
                                    B("onControlActivate", [a(this), c])
                                }
                            }
                        }).on("touchmove.mbsc-form mousemove.mbsc-form", function(a) {
                            if (r && Math.abs(e(a, "X", true) - m) > 20 || Math.abs(e(a, "Y", true) - n) > 20) {
                                p.removeClass("mbsc-active");
                                B("onControlDeactivate", [p, a]);
                                r = false
                            }
                        }).on("touchend.mbsc-form touchcancel.mbsc-form mouseleave.mbsc-form mouseup.mbsc-form", function(a) {
                            if (r && a.type == "touchend" && !v.readOnly) {
                                p.focus();
                                /(button|submit|checkbox|switch|radio)/.test(F) && a.preventDefault();
                                if (!/select/.test(F)) {
                                    var c = (a.originalEvent || a).changedTouches[0]
                                        , b = document.createEvent("MouseEvents");
                                    b.initMouseEvent("click", true, true, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, false, false, false, false, 0, null);
                                    b.tap = true;
                                    v.dispatchEvent(b);
                                    j.preventClick()
                                }
                            }
                            r && setTimeout(function() {
                                p.removeClass("mbsc-active");
                                B("onControlDeactivate", [p, a])
                            }, 100);
                            r = false;
                            s = null
                        })
                    }
                }
            });
            i()
        }
        ;
        k.init = function(b) {
            k._init(b);
            h.themes.form[A.theme] || (A.theme = "mobiscroll");
            v = "mbsc-form mbsc-" + A.theme + (A.baseTheme ? " mbsc-" + A.baseTheme : "") + (A.rtl ? " mbsc-rtl" : " mbsc-ltr");
            C.hasClass("mbsc-form") || C.addClass(v).on("touchstart", t).show();
            a(window).on("resize orientationchange", i);
            k.refresh()
        }
        ;
        k.destroy = function() {
            C.removeClass(v).off("touchstart", t);
            a(window).off("resize orientationchange", i);
            a(".mbsc-control", C).off(".mbsc-form").removeClass("mbsc-control-ev");
            k._destroy();
            a(".mbsc-progress progress", C).mobiscroll("destroy");
            a(".mbsc-slider input", C).mobiscroll("destroy");
            a(".mbsc-stepper input", C).mobiscroll("destroy");
            a(".mbsc-switch input", C).mobiscroll("destroy")
        }
        ;
        A = k.settings;
        B = k.trigger;
        k.init(m)
    }
    ;
    h.classes.Form.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "form",
        _defaults: {
            tap: !0,
            lang: "en",
            offText: "Off",
            onText: "On"
        }
    };
    h.themes.form.mobiscroll = {};
    h.presetShort("form", "Form");
    h.classes.Stepper = function(r, j) {
        function b(c) {
            32 == c.keyCode && (c.preventDefault(),
            !t && !r.disabled && (k = a(this).addClass("mbsc-active"),
                o(c)))
        }
        function g(a) {
            t && (a.preventDefault(),
                B(!0))
        }
        function W(c) {
            if (d(c, this) && !r.disabled && a.mobiscroll.running && (k = a(this).addClass("mbsc-active").focus(),
                Q && Q.trigger("onControlActivate", [k, c]),
                    o(c),
                "mousedown" === c.type))
                a(document).on("mousemove", O).on("mouseup", i)
        }
        function i(c) {
            t && (c.preventDefault(),
                B(!0, c),
            "mouseup" === c.type && a(document).off("mousemove", O).off("mouseup", i))
        }
        function O(a) {
            t && (T = e(a, "X"),
                F = e(a, "Y"),
                s = T - l,
                G = F - N,
            (7 < Math.abs(s) || 7 < Math.abs(G)) && B())
        }
        function v() {
            var c;
            r.disabled || (c = parseFloat(a(this).val()),
                A(isNaN(c) ? M : c))
        }
        function A(a, b, d) {
            J = M;
            b === m && (b = !0);
            d === m && (d = b);
            M = a !== m ? Math.min(c, Math.max(Math.round(a / x) * x, H)) : Math.min(c, Math.max(M + (k.hasClass("mbsc-stepper-minus") ? -x : x), H));
            n = !0;
            y.removeClass("mbsc-step-disabled");
            b && q.val(M);
            M == H ? u.addClass("mbsc-step-disabled") : M == c && f.addClass("mbsc-step-disabled");
            M !== J && d && q.change()
        }
        function o(a) {
            t || (t = !0,
                n = !1,
                l = e(a, "X"),
                N = e(a, "Y"),
                clearInterval(R),
                clearTimeout(R),
                R = setTimeout(function() {
                    A();
                    R = setInterval(function() {
                        A()
                    }, 150)
                }, 300))
        }
        function B(a, c) {
            clearInterval(R);
            clearTimeout(R);
            !n && a && A();
            n = t = !1;
            k.removeClass("mbsc-active");
            Q && setTimeout(function() {
                Q.trigger("onControlDeactivate", [k, c])
            }, 100)
        }
        function C(a, c) {
            var b = q.attr(a);
            return b === m || "" === b ? c : +b
        }
        var k, f, u, y, t, n, s, G, T, F, R, c, H, x, L, l, N, M, P = this, q = a(r), U = q.hasClass("mbsc-stepper-ready"), Z = U ? q.closest(".mbsc-stepper-cont") : q.parent(), J = M, Q = j.form;
        h.classes.Base.call(this, r, j, !0);
        P.getVal = function() {
            var a = parseFloat(q.val())
                , a = isNaN(a) ? M : a;
            return Math.min(c, Math.max(Math.round(a / x) * x, H))
        }
        ;
        P.setVal = function(a, c, b) {
            a = parseFloat(a);
            A(isNaN(a) ? M : a, c, b)
        }
        ;
        P.init = function(d) {
            P._init(d);
            L = P.settings;
            H = d.min === m ? C("min", L.min) : d.min;
            c = d.max === m ? C("max", L.max) : d.max;
            x = d.step === m ? C("step", L.step) : d.step;
            M = Math.round(+r.value / x) * x || 0;
            U || Z.addClass("mbsc-stepper-cont").append('<span class="mbsc-segmented mbsc-stepper"></span>').find(".mbsc-stepper").append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (M == H ? "mbsc-step-disabled" : "") + '"  tabindex="0"><span class="mbsc-segmented-content"><span class="mbsc-ic mbsc-ic-minus"></span></span></span>').append('<span class="mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (M == c ? "mbsc-step-disabled" : "") + '"  tabindex="0"><span class="mbsc-segmented-content"> <span class="mbsc-ic mbsc-ic-plus"></span> </span></span>').prepend(q);
            u = a(".mbsc-stepper-minus", Z);
            f = a(".mbsc-stepper-plus", Z);
            U || ("left" == q.attr("data-val") ? (Z.addClass("mbsc-stepper-val-left"),
                q.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : "right" == q.attr("data-val") ? (Z.addClass("mbsc-stepper-val-right"),
                f.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content"></span></span>')) : u.after('<span class="mbsc-segmented-item"><span class="mbsc-segmented-content mbsc-stepper-val"></span></span>'));
            q.val(M).attr("data-role", "stepper").attr("min", H).attr("max", c).attr("step", x).on("change", v);
            y = a(".mbsc-stepper-control", Z).on("keydown", b).on("keyup", g).on("mousedown touchstart", W).on("touchmove", O).on("touchend touchcancel", i);
            q.addClass("mbsc-stepper-ready mbsc-control");
        }
        ;
        P.destroy = function() {
            q.removeClass("mbsc-control").off("change", v);
            y.off("keydown", b).off("keyup", g).off("mousedown touchstart", W).off("touchmove", O).off("touchend touchcancel", i);
            P._destroy()
        }
        ;
        P.init(j)
    }
    ;
    h.classes.Stepper.prototype = {
        _class: "stepper",
        _defaults: {
            min: 0,
            max: 100,
            step: 1
        }
    };
    h.presetShort("stepper", "Stepper");
    h.classes.Switch = function(d, e) {
        var b, g, j, i = this, e = e || {};
        a.extend(e, {
            changeEvent: "click",
            min: 0,
            max: 1,
            step: 1,
            live: !1,
            round: !1,
            handle: !1,
            highlight: !1
        });
        h.classes.Slider.call(this, d, e, !0);
        i._readValue = function() {
            return d.checked ? 1 : 0
        }
        ;
        i._fillValue = function(a, d, e) {
            b.prop("checked", !!a);
            e && b.change()
        }
        ;
        i._onTap = function(a) {
            i._setVal(a ? 0 : 1)
        }
        ;
        i.__onInit = function() {
            j = i.settings;
            b = a(d);
            g = b.parent();
            b.attr("data-role", "switch").after('<span class="mbsc-progress-cont mbsc-switch-track"><span class="mbsc-progress-track mbsc-progress-anim"><span class="mbsc-slider-handle-cont"><span class="mbsc-slider-handle mbsc-switch-handle" data-index="0"><span class="mbsc-switch-txt-off">' + j.offText + '</span><span class="mbsc-switch-txt-on">' + j.onText + "</span></span></span></span></span>");
            i._$track = g.find(".mbsc-progress-track")
        }
        ;
        i.getVal = function() {
            return d.checked
        }
        ;
        i.setVal = function(a, b, d) {
            i._setVal(a ? 1 : 0, b, d)
        }
        ;
        i.init(e)
    }
    ;
    h.classes.Switch.prototype = {
        _class: "switch",
        _css: "mbsc-switch",
        _hasTheme: !0,
        _defaults: {}
    };
    h.presetShort("switch", "Switch");
    a(function() {
        a("[mbsc-enhance]").each(function() {
            a(this).mobiscroll().form()
        });
        a(document).on("mbsc-enhance", function(d, e) {
            a(d.target).is("[mbsc-enhance]") ? a(d.target).mobiscroll().form(e) : a("[mbsc-enhance]", d.target).each(function() {
                a(this).mobiscroll().form(e)
            })
        });
        a(document).on("mbsc-refresh", function(d) {
            a(d.target).is("[mbsc-enhance]") ? a(d.target).mobiscroll("refresh") : a("[mbsc-enhance]", d.target).each(function() {
                a(this).mobiscroll("refresh")
            })
        })
    })
})($);
(function(a, m, s, t) {
    var m = a.mobiscroll
        , h = m.classes
        , j = m.util
        , e = j.jsPrefix
        , d = j.has3d
        , r = j.hasFlex
        , p = j.getCoord
        , b = j.constrain
        , g = j.testTouch;
    m.presetShort("scroller", "Scroller", !1);
    h.Scroller = function(m, i, O) {
        function v(c) {
            if (g(c, this) && !X && !aa && !M && !I(this) && a.mobiscroll.running && (c.preventDefault(),
                    c.stopPropagation(),
                    P = "clickpick" != J.mode,
                    X = a(".dw-ul", this),
                    K(X),
                    ia = (Y = pa[da] !== t) ? Math.round(-j.getPosition(X, !0) / q) : ja[da],
                    D = p(c, "Y"),
                    ea = new Date,
                    ga = D,
                    F(X, da, ia, 0.001),
                P && X.closest(".dwwl").addClass("dwa"),
                "mousedown" === c.type))
                a(s).on("mousemove", A).on("mouseup", o)
        }
        function A(a) {
            if (X && P && (a.preventDefault(),
                    a.stopPropagation(),
                    ga = p(a, "Y"),
                3 < Math.abs(ga - D) || Y))
                F(X, da, b(ia + (D - ga) / q, fa - 1, w + 1)),
                    Y = !0
        }
        function o(c) {
            if (X) {
                var f = new Date - ea, e = b(Math.round(ia + (D - ga) / q), fa - 1, w + 1), g = e, i, l = X.offset().top;
                c.stopPropagation();
                "mouseup" === c.type && a(s).off("mousemove", A).off("mouseup", o);
                d && 300 > f ? (i = (ga - D) / f,
                    f = i * i / J.speedUnit,
                0 > ga - D && (f = -f)) : f = ga - D;
                if (Y)
                    g = b(Math.round(ia - f / q), fa, w),
                        f = i ? Math.max(0.1, Math.abs((g - e) / i) * J.timeUnit) : 0.1;
                else {
                    var e = Math.floor((ga - l) / q)
                        , h = a(a(".dw-li", X)[e]);
                    i = h.hasClass("dw-v");
                    l = P;
                    f = 0.1;
                    !1 !== S("onValueTap", [h]) && i ? g = e : l = !0;
                    l && i && (h.addClass("dw-hl"),
                        setTimeout(function() {
                            h.removeClass("dw-hl")
                        }, 100));
                    if (!U && (!0 === J.confirmOnTap || J.confirmOnTap[da]) && h.hasClass("dw-sel")) {
                        E.select();
                        X = !1;
                        return
                    }
                }
                P && H(X, da, g, 0, f, !0);
                X = !1
            }
        }
        function B(c) {
            M = a(this);
            g(c, this) && a.mobiscroll.running && y(c, M.closest(".dwwl"), M.hasClass("dwwbp") ? x : L);
            if ("mousedown" === c.type)
                a(s).on("mouseup", C)
        }
        function C(c) {
            M = null;
            aa && (clearInterval(V),
                aa = !1);
            "mouseup" === c.type && a(s).off("mouseup", C)
        }
        function k(c) {
            38 == c.keyCode ? y(c, a(this), L) : 40 == c.keyCode && y(c, a(this), x)
        }
        function f() {
            aa && (clearInterval(V),
                aa = !1)
        }
        function u(c) {
            if (!I(this) && a.mobiscroll.running) {
                c.preventDefault();
                var c = c.originalEvent || c
                    , d = c.deltaY || c.wheelDelta || c.detail
                    , f = a(".dw-ul", this);
                K(f);
                F(f, da, b(((0 > d ? -20 : 20) - Z[da]) / q, fa - 1, w + 1));
                clearTimeout(Q);
                Q = setTimeout(function() {
                    H(f, da, Math.round(ja[da]), 0 < d ? 1 : 2, 0.1)
                }, 200)
            }
        }
        function y(a, c, b) {
            a.stopPropagation();
            a.preventDefault();
            if (!aa && !I(c) && !c.hasClass("dwa")) {
                aa = !0;
                var d = c.find(".dw-ul");
                K(d);
                clearInterval(V);
                V = setInterval(function() {
                    b(d)
                }, J.delay);
                b(d)
            }
        }
        function I(c) {
            return a.isArray(J.readonly) ? (c = a(".dwwl", N).index(c),
                J.readonly[c]) : J.readonly
        }
        function n(c) {
            var b = '<div class="dw-bf">'
                , c = Ba[c]
                , d = 1
                , f = c.labels || []
                , e = c.values || []
                , g = c.keys || e;
            a.each(e, function(c, e) {
                0 === d % 20 && (b += '</div><div class="dw-bf">');
                b += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + g[c] + '"' + (f[c] ? ' aria-label="' + f[c] + '"' : "") + ' style="height:' + q + "px;line-height:" + q + 'px;"><div class="dw-i"' + (1 < ha ? ' style="line-height:' + Math.round(q / ha) + "px;font-size:" + Math.round(0.8 * (q / ha)) + 'px;"' : "") + ">" + e + "</div></div>";
                d++
            });
            return b += "</div>"
        }
        function K(c) {
            U = c.closest(".dwwl").hasClass("dwwms");
            fa = a(".dw-li", c).index(a(U ? ".dw-li" : ".dw-v", c).eq(0));
            w = Math.max(fa, a(".dw-li", c).index(a(U ? ".dw-li" : ".dw-v", c).eq(-1)) - (U ? J.rows - ("scroller" == J.mode ? 1 : 3) : 0));
            da = a(".dw-ul", N).index(c)
        }
        function G(a) {
            var c = J.headerText;
            return c ? "function" === typeof c ? c.call(m, a) : c.replace(/\{value\}/i, a) : ""
        }
        function T(a, c) {
            clearTimeout(pa[c]);
            delete pa[c];
            a.closest(".dwwl").removeClass("dwa")
        }
        function F(a, c, b, f, g) {
            var i = -b * q
                , l = a[0].style;
            i == Z[c] && pa[c] || (Z[c] = i,
                d ? (l[e + "Transition"] = j.prefix + "transform " + (f ? f.toFixed(3) : 0) + "s ease-out",
                    l[e + "Transform"] = "translate3d(0," + i + "px,0)") : l.top = i + "px",
            pa[c] && T(a, c),
            f && g && (a.closest(".dwwl").addClass("dwa"),
                pa[c] = setTimeout(function() {
                    T(a, c)
                }, 1E3 * f)),
                ja[c] = b)
        }
        function R(c, d, f, e, g) {
            var i = a('.dw-li[data-val="' + c + '"]', d)
                , l = a(".dw-li", d)
                , c = l.index(i)
                , h = l.length;
            if (e)
                K(d);
            else if (!i.hasClass("dw-v")) {
                for (var o = i, k = 0, x = 0; 0 <= c - k && !o.hasClass("dw-v"); )
                    k++,
                        o = l.eq(c - k);
                for (; c + x < h && !i.hasClass("dw-v"); )
                    x++,
                        i = l.eq(c + x);
                (x < k && x && 2 !== f || !k || 0 > c - k || 1 == f) && i.hasClass("dw-v") ? c += x : (i = o,
                    c -= k)
            }
            f = i.hasClass("dw-sel");
            g && (e || (a(".dw-sel", d).removeAttr("aria-selected"),
                i.attr("aria-selected", "true")),
                a(".dw-sel", d).removeClass("dw-sel"),
                i.addClass("dw-sel"));
            return {
                selected: f,
                v: e ? b(c, fa, w) : c,
                val: i.hasClass("dw-v") || e ? i.attr("data-val") : null
            }
        }
        function c(c, b, d, f, e) {
            !1 !== S("validate", [N, b, c, f]) && (a(".dw-ul", N).each(function(d) {
                var g = a(this)
                    , i = g.closest(".dwwl").hasClass("dwwms")
                    , l = d == b || b === t
                    , i = R(E._tempWheelArray[d], g, f, i, !0);
                if (!i.selected || l)
                    E._tempWheelArray[d] = i.val,
                        F(g, d, i.v, l ? c : 0.1, l ? e : !1)
            }),
                S("onValidated", [b]),
                E._tempValue = J.formatValue(E._tempWheelArray, E),
            E.live && (E._hasValue = d || E._hasValue,
                l(d, d, 0, !0)),
                E._header.html(G(E._tempValue)),
            d && S("onChange", [E._tempValue]))
        }
        function H(d, f, e, g, i, l) {
            e = b(e, fa, w);
            E._tempWheelArray[f] = a(".dw-li", d).eq(e).attr("data-val");
            F(d, f, e, i, l);
            setTimeout(function() {
                c(i, f, !0, g, l)
            }, 10)
        }
        function x(a) {
            var c = ja[da] + 1;
            H(a, da, c > w ? fa : c, 1, 0.1)
        }
        function L(a) {
            var c = ja[da] - 1;
            H(a, da, c < fa ? w : c, 2, 0.1)
        }
        function l(a, b, d, f, e) {
            E._isVisible && !f && c(d);
            E._tempValue = J.formatValue(E._tempWheelArray, E);
            e || (E._wheelArray = E._tempWheelArray.slice(0),
                E._value = E._hasValue ? E._tempValue : null);
            a && (S("onValueFill", [E._hasValue ? E._tempValue : "", b]),
            E._isInput && ua.val(E._hasValue ? E._tempValue : ""),
            b && (E._preventChange = !0,
                ua.change()))
        }
        var N, M, P, q, U, Z, J, Q, S, aa, Y, D, ea, ga, ia, fa, w, X, da, ha, V, E = this, ua = a(m), pa = {}, ja = {}, Ba = [];
        h.Frame.call(this, m, i, !0);
        E.setVal = E._setVal = function(c, b, d, f, e) {
            E._hasValue = null !== c && c !== t;
            E._tempWheelArray = a.isArray(c) ? c.slice(0) : J.parseValue.call(m, c, E) || [];
            l(b, d === t ? b : d, e, !1, f)
        }
        ;
        E.getVal = E._getVal = function(a) {
            a = E._hasValue || a ? E[a ? "_tempValue" : "_value"] : null;
            return j.isNumeric(a) ? +a : a
        }
        ;
        E.setArrayVal = E.setVal;
        E.getArrayVal = function(a) {
            return a ? E._tempWheelArray : E._wheelArray
        }
        ;
        E.setValue = function(a, c, b, d, f) {
            E.setVal(a, c, f, d, b)
        }
        ;
        E.getValue = E.getArrayVal;
        E.changeWheel = function(b, d, f) {
            if (N) {
                var e = 0
                    , g = b.length;
                a.each(J.wheels, function(i, l) {
                    a.each(l, function(i, l) {
                        if (-1 < a.inArray(e, b) && (Ba[e] = l,
                                a(".dw-ul", N).eq(e).html(n(e)),
                                g--,
                                !g))
                            return E.position(),
                                c(d, t, f),
                                !1;
                        e++
                    });
                    if (!g)
                        return !1
                })
            }
        }
        ;
        E.getValidCell = R;
        E.scroll = F;
        E._generateContent = function() {
            var c, b = "", d = 0;
            a.each(J.wheels, function(f, e) {
                b += '<div class="mbsc-w-p dwc' + ("scroller" != J.mode ? " dwpm" : " dwsc") + (J.showLabel ? "" : " dwhl") + '"><div class="dwwc"' + (J.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (r ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');
                a.each(e, function(a, f) {
                    Ba[d] = f;
                    c = f.label !== t ? f.label : a;
                    b += "<" + (r ? "div" : "td") + ' class="dwfl" style="' + (J.fixedWidth ? "width:" + (J.fixedWidth[d] || J.fixedWidth) + "px;" : (J.minWidth ? "min-width:" + (J.minWidth[d] || J.minWidth) + "px;" : "min-width:" + J.width + "px;") + (J.maxWidth ? "max-width:" + (J.maxWidth[d] || J.maxWidth) + "px;" : "")) + '"><div class="dwwl dwwl' + d + (f.multiple ? " dwwms" : "") + '">' + ("scroller" != J.mode ? '<div class="dwb-e dwwb dwwbp ' + (J.btnPlusClass || "") + '" style="height:' + q + "px;line-height:" + q + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm ' + (J.btnMinusClass || "") + '" style="height:' + q + "px;line-height:" + q + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + c + '</div><div tabindex="0" aria-live="off" aria-label="' + c + '" role="listbox" class="dwww"><div class="dww" style="height:' + J.rows * q + 'px;"><div class="dw-ul" style="margin-top:' + (f.multiple ? "scroller" == J.mode ? 0 : q : J.rows / 2 * q - q / 2) + 'px;">';
                    b += n(d) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (J.selectedLineHeight ? ' style="height:' + q + "px;margin-top:-" + (q / 2 + (J.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (r ? "</div>" : "</td>");
                    d++
                });
                b += (r ? "" : "</tr></table>") + "</div></div>"
            });
            return b
        }
        ;
        E._attachEvents = function(a) {
            a.on("keydown", ".dwwl", k).on("keyup", ".dwwl", f).on("touchstart mousedown", ".dwwl", v).on("touchmove", ".dwwl", A).on("touchend", ".dwwl", o).on("touchstart mousedown", ".dwwb", B).on("touchend touchcancel", ".dwwb", C);
            if (J.mousewheel)
                a.on("wheel mousewheel", ".dwwl", u)
        }
        ;
        E._markupReady = function(a) {
            N = a;
            Z = {};
            c()
        }
        ;
        E._fillValue = function() {
            E._hasValue = !0;
            l(!0, !0, 0, !0)
        }
        ;
        E._readValue = function() {
            var a = ua.val() || "";
            "" !== a && (E._hasValue = !0);
            E._tempWheelArray = E._hasValue && E._wheelArray ? E._wheelArray.slice(0) : J.parseValue.call(m, a, E) || [];
            l()
        }
        ;
        E._processSettings = function() {
            J = E.settings;
            S = E.trigger;
            q = J.height;
            ha = J.multiline;
            E._isLiquid = "liquid" === (J.layout || (/top|bottom/.test(J.display) && 1 == J.wheels.length ? "liquid" : ""));
            J.formatResult && (J.formatValue = J.formatResult);
            1 < ha && (J.cssClass = (J.cssClass || "") + " dw-ml");
            "scroller" != J.mode && (J.rows = Math.max(3, J.rows))
        }
        ;
        E._selectedValues = {};
        O || E.init(i)
    }
    ;
    h.Scroller.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _hasPreset: !0,
        _class: "scroller",
        _defaults: a.extend({}, h.Frame.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 300,
            readonly: !1,
            showLabel: !0,
            confirmOnTap: !0,
            wheels: [],
            mode: "scroller",
            preset: "",
            speedUnit: 0.0012,
            timeUnit: 0.08,
            formatValue: function(a) {
                return a.join(" ")
            },
            parseValue: function(b, d) {
                var e = [], g = [], h = 0, o, j;
                null !== b && b !== t && (e = (b + "").split(" "));
                a.each(d.settings.wheels, function(b, d) {
                    a.each(d, function(b, d) {
                        j = d.keys || d.values;
                        o = j[0];
                        a.each(j, function(a, b) {
                            if (e[h] == b)
                                return o = b,
                                    !1
                        });
                        g.push(o);
                        h++
                    })
                });
                return g
            }
        })
    };
    m.themes.scroller = m.themes.frame
})($, window, document);
(function(a, m) {
    var s = a.mobiscroll
        , t = s.util.isNumeric
        , h = function() {}
        , j = s.classes;
    j.Numpad = function(e, d, h) {
        function p(c) {
            var d, g = (d = B.validate.call(e, k.slice(0), T, n) || []) && d.disabled || [];
            n._isValid = d.invalid ? !1 : !0;
            n._tempValue = B.formatValue.call(e, k.slice(0), T, n);
            o = k.length;
            f = d.length || u;
            if (n._isVisible && a.mobiscroll.running) {
                a(".mbsc-np-ph", O).each(function(c) {
                    a(this).html("ltr" == B.fill ? c >= o ? A : C || k[c] : c >= u - f ? c + o < u ? A : C || k[c + o - u] : "")
                });
                a(".mbsc-np-cph", O).each(function() {
                    a(this).html(T[a(this).attr("data-var")] || a(this).attr("data-ph"))
                });
                if (o === u)
                    for (d = 0; 9 >= d; d++)
                        g.push(d);
                a(".mbsc-np-btn", O).removeClass(v);
                for (d = 0; d < g.length; d++)
                    a('.mbsc-np-btn[data-val="' + g[d] + '"]', O).addClass(v);
                n._isValid ? a(".dwb-s .dwb", O).removeClass(v) : a(".dwb-s .dwb", O).addClass(v);
                n.live && (n._hasValue = c || n._hasValue,
                    b(c))
            }
        }
        function b(c, b, d, f) {
            b && p();
            f || (y = k.slice(0),
                F = a.extend({}, T),
                K = G.slice(0),
                n._value = n._tempValue);
            c && (n._isInput && s.val(n._hasValue && n._isValid ? n._value : ""),
            d && (n._preventChange = !0,
                s.change()))
        }
        function g(a) {
            var b, d = a || [], f = [];
            G = [];
            T = {};
            for (a = 0; a < d.length; a++)
                /:/.test(d[a]) ? (b = d[a].split(":"),
                    T[b[0]] = b[1],
                    G.push(b[0])) : (f.push(d[a]),
                    G.push("digit"));
            return f
        }
        function W(c, b) {
            if (!(!o && !b && !B.allowLeadingZero || c.hasClass("dwb-d") || c.hasClass("mbsc-np-btn-empty")) && o < u && a.mobiscroll.running)
                G.push("digit"),
                    k.push(b),
                    p(!0)
        }
        function i() {
            var a, b, d = G.pop();
            if (o || "digit" !== d) {
                if ("digit" !== d && T[d]) {
                    delete T[d];
                    b = G.slice(0);
                    G = [];
                    for (a = 0; a < b.length; a++)
                        b[a] !== d && G.push(b[a])
                } else
                    k.pop();
                p(!0)
            }
        }
        var O, v, A, o, B, C, k, f, u, y, s = a(e), n = this, K = [], G = [], T = {}, F = {}, R = {
            48: 0,
            49: 1,
            50: 2,
            51: 3,
            52: 4,
            53: 5,
            54: 6,
            55: 7,
            56: 8,
            57: 9,
            96: 0,
            97: 1,
            98: 2,
            99: 3,
            100: 4,
            101: 5,
            102: 6,
            103: 7,
            104: 8,
            105: 9
        };
        j.Frame.call(this, e, d, !0);
        n.setVal = n._setVal = function(c, d, f, i) {
            n._hasValue = null !== c && c !== m;
            k = g(a.isArray(c) ? c.slice(0) : B.parseValue.call(e, c, n));
            b(d, !0, f === m ? d : f, i)
        }
        ;
        n.getVal = n._getVal = function(a) {
            return n._hasValue || a ? n[a ? "_tempValue" : "_value"] : null
        }
        ;
        n.setArrayVal = n.setVal;
        n.getArrayVal = function(a) {
            return a ? k.slice(0) : n._hasValue ? y.slice(0) : null
        }
        ;
        n.setValue = n.setVal;
        n.getValue = n.getArrayVal;
        n._readValue = function() {
            var a = s.val() || "";
            "" !== a && (n._hasValue = !0);
            C ? (T = {},
                G = [],
                k = []) : (T = n._hasValue ? F : {},
                G = n._hasValue ? K : [],
                k = n._hasValue && y ? y.slice(0) : g(B.parseValue.call(e, a, n)),
                b(!1, !0))
        }
        ;
        n._fillValue = function() {
            n._hasValue = !0;
            b(!0, !1, !0)
        }
        ;
        n._generateContent = function() {
            var c, b, d, f = 1;
            c = "";
            var e;
            e = "" + ('<div class="mbsc-np-hdr"><div role="button" tabindex="0" aria-label="' + B.deleteText + '" class="mbsc-np-del dwb-e mbsc-ic mbsc-ic-' + B.deleteIcon + '"></div><div class="mbsc-np-dsp">');
            c = B.template.replace(/d/g, '<span class="mbsc-np-ph">' + A + "</span>").replace(/&#100;/g, "d");
            c = c.replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '<span class="mbsc-np-cph" data-var="$1" data-ph="$2">$2</span>');
            e = e + c + '</div></div><div class="mbsc-np-tbl-c mbsc-w-p"><div class="mbsc-np-tbl">';
            for (c = 0; 4 > c; c++) {
                e += '<div class="mbsc-np-row">';
                for (b = 0; 3 > b; b++)
                    d = f,
                        10 == f || 12 == f ? d = "" : 11 == f && (d = 0),
                        e = "" === d ? 10 == f && B.leftButton ? e + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (B.leftButton.variable ? 'data-var="' + B.leftButton.variable + '"' : "") + ' data-val="' + B.leftButton.value + '" >' + B.leftButton.text + "</div>") : 12 == f && B.rightButton ? e + ('<div role="button" tabindex="0" class="mbsc-np-btn mbsc-np-btn-custom dwb-e" ' + (B.rightButton.variable ? 'data-var="' + B.rightButton.variable + '"' : "") + ' data-val="' + B.rightButton.value + '" >' + B.rightButton.text + "</div>") : e + '<div class="mbsc-np-btn mbsc-np-btn-empty"></div>' : e + ('<div tabindex="0" role="button" class="mbsc-np-btn dwb-e" data-val="' + d + '">' + d + "</div>"),
                        f++;
                e += "</div>"
            }
            return e + "</div></div>"
        }
        ;
        n._markupReady = function() {
            O = n._markup;
            p()
        }
        ;
        n._attachEvents = function(c) {
            c.on("keydown", function(c) {
                R[c.keyCode] !== m ? W(a('.mbsc-np-btn[data-val="' + R[c.keyCode] + '"]'), R[c.keyCode]) : 8 == c.keyCode && (c.preventDefault(),
                    i())
            });
            n.tap(a(".mbsc-np-btn", c), function() {
                var c = a(this);
                if (c.hasClass("mbsc-np-btn-custom")) {
                    var b = c.attr("data-val")
                        , d = c.attr("data-var");
                    if (!c.hasClass("dwb-d")) {
                        d && (c = d.split(":"),
                            G.push(c[0]),
                            T[c[0]] = c[1]);
                        if (b.length + o <= f)
                            for (c = 0; c < b.length; ++c)
                                G.push("digit"),
                                    k.push(t(b[c]) ? +b[c] : b[c]);
                        p(!0)
                    }
                } else
                    W(c, +c.attr("data-val"))
            });
            n.tap(a(".mbsc-np-del", c), i)
        }
        ;
        n._processSettings = function() {
            B = n.settings;
            B.headerText = (B.headerText || "").replace("{value}", "");
            B.cssClass = (B.cssClass || "") + " mbsc-np";
            B.template = B.template.replace(/\\d/, "&#100;");
            A = B.placeholder;
            u = (B.template.match(/d/g) || []).length;
            v = "dwb-d " + (B.disabledClass || "");
            (C = B.mask) && s.is("input") && s.attr("type", "password")
        }
        ;
        n._indexOf = function(a, b) {
            var d;
            for (d = 0; d < a.length; ++d)
                if (a[d].toString() === b.toString())
                    return d;
            return -1
        }
        ;
        h || n.init(d)
    }
    ;
    j.Numpad.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _hasPreset: !0,
        _class: "numpad",
        _defaults: a.extend({}, j.Frame.prototype._defaults, {
            template: "dd.dd",
            placeholder: "0",
            deleteIcon: "backspace",
            allowLeadingZero: !1,
            fill: "rtl",
            deleteText: "Delete",
            validate: h,
            parseValue: h,
            formatValue: function(e, d, h) {
                var j, b = 1;
                j = h.settings;
                var h = j.placeholder
                    , g = j.template
                    , m = e.length
                    , i = g.length
                    , t = "";
                for (j = 0; j < i; j++)
                    "d" == g[i - j - 1] ? (t = b <= m ? e[m - b] + t : h + t,
                        b++) : t = g[i - j - 1] + t;
                a.each(d, function(a, b) {
                    t = t.replace("{" + a + "}", b)
                });
                return a("<div>" + t + "</div>").text()
            }
        })
    };
    s.themes.numpad = s.themes.frame;
    s.presetShort("numpad", "Numpad", !1)
})($);
(function(a) {
    var m = a.mobiscroll
        , s = {
        min: 0,
        max: 99.99,
        scale: 2,
        prefix: "",
        suffix: "",
        returnAffix: !1
    };
    m.presets.numpad.decimal = function(t) {
        function h(a) {
            var h;
            h = a.slice(0);
            for (a = 0; h.length; )
                a = 10 * a + h.shift();
            for (h = 0; h < e.scale; h++)
                a /= 10;
            return a
        }
        var j = a.extend({}, t.settings)
            , e = a.extend(t.settings, s, j);
        t.getVal = function(a) {
            a = t._getVal(a);
            return m.util.isNumeric(a) ? +a : a
        }
        ;
        return {
            template: e.prefix.replace(/d/g, "\\d") + Array((Math.floor(e.max) + "").length + 1).join("d") + (e.scale ? "." + Array(e.scale + 1).join("d") : "") + e.suffix.replace(/d/g, "\\d"),
            parseValue: function(a) {
                var h, j;
                h = a || e.defaultValue;
                a = [];
                if (h && (j = (h + "").match(/\d+\.?\d*/g))) {
                    j = (+j[0]).toFixed(e.scale);
                    for (h = 0; h < j.length; h++)
                        "." != j[h] && (+j[h] ? a.push(+j[h]) : a.length && a.push(0))
                }
                return a
            },
            formatValue: function(a) {
                a = h(a).toFixed(e.scale);
                return e.returnAffix ? e.prefix + a + e.suffix : a
            },
            validate: function(d) {
                var j = h(d).toFixed(e.scale)
                    , m = [];
                !d.length && !e.allowLeadingZero && m.push(0);
                t.isVisible() && a(".mbsc-np-dsp", t._markup).html(e.prefix + j + e.suffix);
                return {
                    disabled: m,
                    invalid: +j > e.max || +j < e.min || (e.invalid ? -1 != t._indexOf(e.invalid, +j) : !1)
                }
            }
        }
    }
})($);
(function(a) {
    function m(a) {
        for (var e = 0, d = 1, h = 0; a.length; )
            3 < e ? d = 3600 : 1 < e && (d = 60),
                h += a.pop() * d * (e % 2 ? 10 : 1),
                e++;
        return h
    }
    var s = a.mobiscroll
        , t = ["h", "m", "s"]
        , h = {
        min: 0,
        max: 362439,
        defaultValue: 0,
        hourTextShort: "h",
        minuteTextShort: "m",
        secTextShort: "s"
    };
    s.presets.numpad.timespan = function(j) {
        function e(b) {
            var d, e = "", i = 3600;
            a(t).each(function(a, h) {
                d = Math.floor(b / i);
                b -= d * i;
                i /= 60;
                if (0 < d || "s" == h && !e)
                    e = e + (e ? " " : "") + d + p[h]
            });
            return e
        }
        var d = a.extend({}, j.settings)
            , r = a.extend(j.settings, h, d)
            , p = {
            h: r.hourTextShort.replace(/d/g, "\\d"),
            m: r.minuteTextShort.replace(/d/g, "\\d"),
            s: r.secTextShort.replace(/d/g, "\\d")
        }
            , d = 'd<span class="mbsc-np-sup mbsc-np-time">' + p.s + "</span>";
        9 < r.max && (d = "d" + d);
        99 < r.max && (d = '<span class="mbsc-np-ts-m">' + (639 < r.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.m + "</span>" + d);
        6039 < r.max && (d = '<span class="mbsc-np-ts-h">' + (38439 < r.max ? "d" : "") + 'd</span><span class="mbsc-np-sup mbsc-np-time">' + p.h + "</span>" + d);
        j.setVal = function(a, d, h, i) {
            s.util.isNumeric(a) && (a = e(a));
            return j._setVal(a, d, h, i)
        }
        ;
        j.getVal = function(a) {
            return j._hasValue || a ? m(j.getArrayVal(a)) : null
        }
        ;
        return {
            template: d,
            parseValue: function(b) {
                var d, h = b || e(r.defaultValue), i = [];
                h && a(t).each(function(a, b) {
                    (d = RegExp("(\\d+)" + p[b], "gi").exec(h)) ? (d = +d[1],
                        9 < d ? (i.push(Math.floor(d / 10)),
                            i.push(d % 10)) : (i.length && i.push(0),
                        (d || i.length) && i.push(d))) : i.length && (i.push(0),
                        i.push(0))
                });
                return i
            },
            formatValue: function(a) {
                return e(m(a))
            },
            validate: function(a) {
                var d = m(a.slice(0))
                    , e = [];
                a.length || e.push(0);
                return {
                    disabled: e,
                    invalid: d > r.max || d < r.min || (r.invalid ? -1 != j._indexOf(r.invalid, +d) : !1)
                }
            }
        }
    }
})($);
(function(a) {
    var m = {
        timeFormat: "hh:ii A",
        amText: "am",
        pmText: "pm"
    };
    a.mobiscroll.presets.numpad.time = function(s) {
        function t(b, d) {
            var e, i = "";
            for (e = 0; e < b.length; ++e)
                i += b[e] + (e % 2 == (1 == b.length % 2 ? 0 : 1) && e != b.length - 1 ? ":" : "");
            a.each(d, function(a, b) {
                i += " " + b
            });
            return i
        }
        var h = a.extend({}, s.settings)
            , j = a.extend(s.settings, m, h)
            , e = j.timeFormat.split(":")
            , d = j.timeFormat.match(/a/i)
            , r = d ? "a" == d[0] ? j.amText : j.amText.toUpperCase() : ""
            , p = d ? "a" == d[0] ? j.pmText : j.pmText.toUpperCase() : ""
            , b = 0
            , g = j.min ? "" + j.min.getHours() : ""
            , W = j.max ? "" + j.max.getHours() : ""
            , i = j.min ? "" + (10 > j.min.getMinutes() ? "0" + j.min.getMinutes() : j.min.getMinutes()) : ""
            , O = j.max ? "" + (10 > j.max.getMinutes() ? "0" + j.max.getMinutes() : j.max.getMinutes()) : ""
            , v = j.min ? "" + (10 > j.min.getSeconds() ? "0" + j.min.getSeconds() : j.min.getSeconds()) : ""
            , A = j.max ? "" + (10 > j.max.getSeconds() ? "0" + j.max.getSeconds() : j.max.getSeconds()) : "";
        j.min && j.min.setFullYear(2014, 7, 20);
        j.max && j.max.setFullYear(2014, 7, 20);
        return {
            placeholder: "-",
            allowLeadingZero: !0,
            template: (3 == e.length ? "dd:dd:dd" : 2 == e.length ? "dd:dd" : "dd") + (d ? '<span class="mbsc-np-sup">{ampm:--}</span>' : ""),
            leftButton: d ? {
                text: r,
                variable: "ampm:" + r,
                value: "00"
            } : {
                text: ":00",
                value: "00"
            },
            rightButton: d ? {
                text: p,
                variable: "ampm:" + p,
                value: "00"
            } : {
                text: ":30",
                value: "30"
            },
            parseValue: function(a) {
                var b, e = a || j.defaultValue, i = [];
                if (e) {
                    e += "";
                    if (b = e.match(/\d/g))
                        for (a = 0; a < b.length; a++)
                            i.push(+b[a]);
                    d && i.push("ampm:" + (e.match(RegExp(j.pmText, "gi")) ? p : r))
                }
                return i
            },
            formatValue: function(a, b) {
                return t(a, b)
            },
            validate: function(a, h) {
                var r = t(a, h), k = 3 <= a.length ? new Date(2014,7,20,"" + a[0] + (0 === a.length % 2 ? a[1] : ""),"" + a[0 === a.length % 2 ? 2 : 1] + a[0 === a.length % 2 ? 3 : 2]) : "", f, u, m, p, n, K, G = [];
                b = f = 2 * e.length;
                a.length || (d && (G.push(0),
                    G.push(j.leftButton.value)),
                    G.push(j.rightButton.value));
                if (!d && (2 > f - a.length || 1 != a[0] && (2 < a[0] || 3 < a[1]) && 2 >= f - a.length))
                    G.push("30"),
                        G.push("00");
                if ((d ? 1 < a[0] || 2 < a[1] : 1 != a[0] && (2 < a[0] || 3 < a[1])) && a[0])
                    a.unshift(0),
                        b = f - 1;
                if (a.length == f)
                    for (f = 0; 9 >= f; ++f)
                        G.push(f);
                else if (1 == a.length && d && 1 == a[0] || a.length && 0 === a.length % 2 || !d && 2 == a[0] && 3 < a[1] && 1 == a.length % 2)
                    for (f = 6; 9 >= f; ++f)
                        G.push(f);
                m = void 0 !== a[1] ? "" + a[0] + a[1] : "";
                p = +O == +(void 0 !== a[3] ? "" + a[2] + a[3] : 0);
                if (j.invalid)
                    for (f = 0; f < j.invalid.length; ++f)
                        if (u = j.invalid[f].getHours(),
                                n = j.invalid[f].getMinutes(),
                                K = j.invalid[f].getSeconds(),
                            u == +m)
                            if (2 == e.length && (10 > n ? 0 : +("" + n)[0]) == +a[2]) {
                                G.push(10 > n ? n : +("" + n)[1]);
                                break
                            } else if ((10 > K ? 0 : +("" + K)[0]) == +a[4]) {
                                G.push(10 > K ? K : +("" + K)[1]);
                                break
                            }
                if (j.min || j.max) {
                    u = +g == +m;
                    n = (m = +W == +m) && p;
                    p = u && p;
                    if (0 === a.length) {
                        for (f = d ? 2 : 19 < g ? g[0] : 3; f <= (1 == g[0] ? 9 : g[0] - 1); ++f)
                            G.push(f);
                        if (10 <= g && (G.push(0),
                            2 == g[0]))
                            for (f = 3; 9 >= f; ++f)
                                G.push(f);
                        if (W && 10 > W || g && 10 <= g)
                            for (f = W && 10 > W ? +W[0] + 1 : 0; f < (g && 10 <= g ? g[0] : 10); ++f)
                                G.push(f)
                    }
                    if (1 == a.length) {
                        if (0 === a[0])
                            for (f = 0; f < g[0]; ++f)
                                G.push(f);
                        if (g && 0 !== a[0] && (d ? 1 == a[0] : 2 == a[0]))
                            for (f = d ? 3 : 4; 9 >= f; ++f)
                                G.push(f);
                        if (a[0] == g[0])
                            for (f = 0; f < g[1]; ++f)
                                G.push(f);
                        if (a[0] == W[0] && !d)
                            for (f = +W[1] + 1; 9 >= f; ++f)
                                G.push(f)
                    }
                    if (2 == a.length && (u || m))
                        for (f = m ? +O[0] + 1 : 0; f < (u ? +i[0] : 10); ++f)
                            G.push(f);
                    if (3 == a.length && (m && a[2] == O[0] || u && a[2] == i[0]))
                        for (f = m && a[2] == O[0] ? +O[1] + 1 : 0; f < (u && a[2] == i[0] ? +i[1] : 10); ++f)
                            G.push(f);
                    if (4 == a.length && (p || n))
                        for (f = n ? +A[0] + 1 : 0; f < (p ? +v[0] : 10); ++f)
                            G.push(f);
                    if (5 == a.length && (p && a[4] == v[0] || n && a[4] == A[0]))
                        for (f = n && a[4] == A[0] ? +A[1] + 1 : 0; f < (p && a[4] == v[0] ? +v[1] : 10); ++f)
                            G.push(f)
                }
                return {
                    disabled: G,
                    length: b,
                    invalid: (d ? !RegExp("^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9]) (?:" + j.amText + "|" + j.pmText + ")$", "i").test(r) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(r)) || (j.invalid ? -1 != s._indexOf(j.invalid, k) : !1) || !((j.min ? j.min <= k : 1) && (j.max ? k <= j.max : 1))
                }
            }
        }
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = {
        dateOrder: "mdy",
        dateFormat: "mm/dd/yy",
        delimiter: "/"
    };
    m.presets.numpad.date = function(t) {
        function h(a) {
            return new Date(+("" + a[j] + a[j + 1] + a[j + 2] + a[j + 3]),+("" + a[e] + a[e + 1]) - 1,+("" + a[d] + a[d + 1]))
        }
        var j, e, d, r, p = [];
        r = a.extend({}, t.settings);
        var b = a.extend(t.settings, m.datetime.defaults, s, r)
            , g = b.dateOrder
            , W = b.min ? "" + (b.getMonth(b.min) + 1) : 0
            , i = b.max ? "" + (b.getMonth(b.max) + 1) : 0
            , O = b.min ? "" + b.getDay(b.min) : 0
            , v = b.max ? "" + b.getDay(b.max) : 0
            , A = b.min ? "" + b.getYear(b.min) : 0
            , o = b.max ? "" + b.getYear(b.max) : 0
            , g = g.replace(/y+/gi, "yyyy")
            , g = g.replace(/m+/gi, "mm")
            , g = g.replace(/d+/gi, "dd");
        j = g.toUpperCase().indexOf("Y");
        e = g.toUpperCase().indexOf("M");
        d = g.toUpperCase().indexOf("D");
        g = "";
        p.push({
            val: j,
            n: "yyyy"
        }, {
            val: e,
            n: "mm"
        }, {
            val: d,
            n: "dd"
        });
        p.sort(function(a, b) {
            return a.val - b.val
        });
        a.each(p, function(a, b) {
            g += b.n
        });
        j = g.indexOf("y");
        e = g.indexOf("m");
        d = g.indexOf("d");
        g = "";
        for (r = 0; 8 > r; ++r)
            if (g += "d",
                r + 1 == j || r + 1 == e || r + 1 == d)
                g += b.delimiter;
        t.getVal = function(a) {
            return t._hasValue || a ? h(t.getArrayVal(a)) : null
        }
        ;
        return {
            placeholder: "-",
            fill: "ltr",
            allowLeadingZero: !0,
            template: g,
            parseValue: function(a) {
                var d, e = [];
                d = a || b.defaultValue;
                a = m.datetime.parseDate(b.dateFormat, d);
                if (d)
                    for (d = 0; d < p.length; ++d)
                        e = /m/i.test(p[d].n) ? e.concat(((9 > b.getMonth(a) ? "0" : "") + (b.getMonth(a) + 1)).split("")) : /d/i.test(p[d].n) ? e.concat(((10 > b.getDay(a) ? "0" : "") + b.getDay(a)).split("")) : e.concat((b.getYear(a) + "").split(""));
                return e
            },
            formatValue: function(a) {
                return m.datetime.formatDate(b.dateFormat, h(a))
            },
            validate: function(a) {
                var g = h(a), k, f, m, r, p = [], n = void 0 !== a[j + 3] ? "" + a[j] + a[j + 1] + a[j + 2] + a[j + 3] : "", s = void 0 !== a[e + 1] ? "" + a[e] + a[e + 1] : "", G = void 0 !== a[d + 1] ? "" + a[d] + a[d + 1] : "", T = "" + b.getMaxDayOfMonth(n || 2012, s - 1 || 0), F = A === n && +W === +s, R = o === n && +i === +s;
                if (b.invalid)
                    for (k = 0; k < b.invalid.length; ++k) {
                        f = b.getYear(b.invalid[k]);
                        m = b.getMonth(b.invalid[k]);
                        r = b.getDay(b.invalid[k]);
                        if (f == +n && m + 1 == +s && (10 > r ? 0 : +("" + r)[0]) == +a[d]) {
                            p.push(10 > r ? r : +("" + r)[1]);
                            break
                        }
                        if (m + 1 == +s && r == +G && ("" + f).substring(0, 3) == "" + a[j] + a[j + 1] + a[j + 2]) {
                            p.push(("" + f)[3]);
                            break
                        }
                        if (f == +n && r == +G && (10 > m ? 0 : +("" + (m + 1))[0]) == +a[e]) {
                            p.push(10 > m ? m : +("" + (m + 1))[1]);
                            break
                        }
                    }
                if ("31" == G && (a.length == e || a.length == e + 1))
                    1 != a[e] ? p.push(2, 4, 6, 9, 11) : p.push(1);
                "30" == G && 0 === a[e] && a.length <= e + 1 && p.push(2);
                if (a.length == e) {
                    for (k = o === n && 10 > +i ? 1 : 2; 9 >= k; ++k)
                        p.push(k);
                    A === n && 10 <= +W && p.push(0)
                }
                if (a.length == e + 1) {
                    if (1 == a[e]) {
                        for (k = o === n ? +i[1] + 1 : 3; 9 >= k; ++k)
                            p.push(k);
                        if (A == n)
                            for (k = 0; k < +W[1]; ++k)
                                p.push(k)
                    }
                    if (0 === a[e] && (p.push(0),
                        o === n || A === n))
                        for (k = o === n ? +G > +v ? +i : +i + 1 : 0; k <= (A === n ? +W - 1 : 9); ++k)
                            p.push(k)
                }
                if (a.length == d) {
                    for (k = R ? (10 < +v ? +v[0] : 0) + 1 : +T[0] + 1; 9 >= k; ++k)
                        p.push(k);
                    if (F)
                        for (k = 0; k < (10 > +O ? 0 : O[0]); ++k)
                            p.push(k)
                }
                if (a.length == d + 1) {
                    if (3 <= a[d] || "02" == s)
                        for (k = +T[1] + 1; 9 >= k; ++k)
                            p.push(k);
                    if (R && +v[0] == a[d])
                        for (k = +v[1] + 1; 9 >= k; ++k)
                            p.push(k);
                    if (F && O[0] == a[d])
                        for (k = 0; k < +O[1]; ++k)
                            p.push(k);
                    if (0 === a[d] && (p.push(0),
                        R || F))
                        for (k = R ? +v + 1 : 1; k <= (F ? +O - 1 : 9); ++k)
                            p.push(k)
                }
                if (void 0 !== a[j + 2] && "02" == s && "29" == G)
                    for (f = +("" + a[j] + a[j + 1] + a[j + 2] + 0); f <= +("" + a[j] + a[j + 1] + a[j + 2] + 9); ++f)
                        p.push(!(0 === f % 4 && 0 !== f % 100 || 0 === f % 400) ? f % 10 : "");
                if (a.length == j) {
                    if (b.min)
                        for (k = 0; k < +A[0]; ++k)
                            p.push(k);
                    if (b.max)
                        for (k = +o[0] + 1; 9 >= k; ++k)
                            p.push(k);
                    p.push(0)
                }
                if (b.min || b.max)
                    for (f = 1; 4 > f; ++f)
                        if (a.length == j + f) {
                            if (a[j + f - 1] == +A[f - 1] && (3 == f ? a[j + f - 2] == +A[f - 2] : 1))
                                for (k = 0; k < +A[f] + (3 == f && a[e + 1] && +W > +s ? 1 : 0); ++k)
                                    p.push(k);
                            if (a[j + f - 1] == +o[f - 1] && (3 == f ? a[j + f - 2] == +o[f - 2] : 1))
                                for (k = +o[f] + (3 == f && +i < +s ? 0 : 1); 9 >= k; ++k)
                                    p.push(k)
                        }
                return {
                    disabled: p,
                    invalid: !("Invalid Date" != g && (b.min ? b.min <= g : 1) && (b.max ? g <= b.max : 1)) || (b.invalid ? -1 != t._indexOf(b.invalid, g) : !1)
                }
            }
        }
    }
})($);
(function(a) {
    var m = a.mobiscroll;
    m.datetime = {
        defaults: {
            shortYearCutoff: "+10",
            monthNames: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            monthNamesShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            dayNames: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            dayNamesShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
            dayNamesMin: "S,M,T,W,T,F,S".split(","),
            amText: "am",
            pmText: "pm",
            getYear: function(a) {
                return a.getFullYear()
            },
            getMonth: function(a) {
                return a.getMonth()
            },
            getDay: function(a) {
                return a.getDate()
            },
            getDate: function(a, m, h, j, e, d, r) {
                return new Date(a,m,h,j || 0,e || 0,d || 0,r || 0)
            },
            getMaxDayOfMonth: function(a, m) {
                return 32 - (new Date(a,m,32)).getDate()
            },
            getWeekNumber: function(a) {
                a = new Date(a);
                a.setHours(0, 0, 0);
                a.setDate(a.getDate() + 4 - (a.getDay() || 7));
                var m = new Date(a.getFullYear(),0,1);
                return Math.ceil(((a - m) / 864E5 + 1) / 7)
            }
        },
        formatDate: function(s, t, h) {
            if (!t)
                return null;
            var h = a.extend({}, m.datetime.defaults, h), j = function(a) {
                for (var b = 0; r + 1 < s.length && s.charAt(r + 1) == a; )
                    b++,
                        r++;
                return b
            }, e = function(a, b, d) {
                b = "" + b;
                if (j(a))
                    for (; b.length < d; )
                        b = "0" + b;
                return b
            }, d = function(a, b, d, e) {
                return j(a) ? e[b] : d[b]
            }, r, p, b = "", g = !1;
            for (r = 0; r < s.length; r++)
                if (g)
                    "'" == s.charAt(r) && !j("'") ? g = !1 : b += s.charAt(r);
                else
                    switch (s.charAt(r)) {
                        case "d":
                            b += e("d", h.getDay(t), 2);
                            break;
                        case "D":
                            b += d("D", t.getDay(), h.dayNamesShort, h.dayNames);
                            break;
                        case "o":
                            b += e("o", (t.getTime() - (new Date(t.getFullYear(),0,0)).getTime()) / 864E5, 3);
                            break;
                        case "m":
                            b += e("m", h.getMonth(t) + 1, 2);
                            break;
                        case "M":
                            b += d("M", h.getMonth(t), h.monthNamesShort, h.monthNames);
                            break;
                        case "y":
                            p = h.getYear(t);
                            b += j("y") ? p : (10 > p % 100 ? "0" : "") + p % 100;
                            break;
                        case "h":
                            p = t.getHours();
                            b += e("h", 12 < p ? p - 12 : 0 === p ? 12 : p, 2);
                            break;
                        case "H":
                            b += e("H", t.getHours(), 2);
                            break;
                        case "i":
                            b += e("i", t.getMinutes(), 2);
                            break;
                        case "s":
                            b += e("s", t.getSeconds(), 2);
                            break;
                        case "a":
                            b += 11 < t.getHours() ? h.pmText : h.amText;
                            break;
                        case "A":
                            b += 11 < t.getHours() ? h.pmText.toUpperCase() : h.amText.toUpperCase();
                            break;
                        case "'":
                            j("'") ? b += "'" : g = !0;
                            break;
                        default:
                            b += s.charAt(r)
                    }
            return b
        },
        parseDate: function(s, t, h) {
            var h = a.extend({}, m.datetime.defaults, h)
                , j = h.defaultValue || new Date;
            if (!s || !t)
                return j;
            if (t.getTime)
                return t;
            var t = "object" == typeof t ? t.toString() : t + "", e = h.shortYearCutoff, d = h.getYear(j), r = h.getMonth(j) + 1, p = h.getDay(j), b = -1, g = j.getHours(), W = j.getMinutes(), i = 0, O = -1, v = !1, A = function(a) {
                (a = k + 1 < s.length && s.charAt(k + 1) == a) && k++;
                return a
            }, o = function(a) {
                A(a);
                a = t.substr(C).match(RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 : "y" == a ? 4 : "o" == a ? 3 : 2) + "}"));
                if (!a)
                    return 0;
                C += a[0].length;
                return parseInt(a[0], 10)
            }, B = function(a, b, d) {
                a = A(a) ? d : b;
                for (b = 0; b < a.length; b++)
                    if (t.substr(C, a[b].length).toLowerCase() == a[b].toLowerCase())
                        return C += a[b].length,
                        b + 1;
                return 0
            }, C = 0, k;
            for (k = 0; k < s.length; k++)
                if (v)
                    "'" == s.charAt(k) && !A("'") ? v = !1 : C++;
                else
                    switch (s.charAt(k)) {
                        case "d":
                            p = o("d");
                            break;
                        case "D":
                            B("D", h.dayNamesShort, h.dayNames);
                            break;
                        case "o":
                            b = o("o");
                            break;
                        case "m":
                            r = o("m");
                            break;
                        case "M":
                            r = B("M", h.monthNamesShort, h.monthNames);
                            break;
                        case "y":
                            d = o("y");
                            break;
                        case "H":
                            g = o("H");
                            break;
                        case "h":
                            g = o("h");
                            break;
                        case "i":
                            W = o("i");
                            break;
                        case "s":
                            i = o("s");
                            break;
                        case "a":
                            O = B("a", [h.amText, h.pmText], [h.amText, h.pmText]) - 1;
                            break;
                        case "A":
                            O = B("A", [h.amText, h.pmText], [h.amText, h.pmText]) - 1;
                            break;
                        case "'":
                            A("'") ? C++ : v = !0;
                            break;
                        default:
                            C++
                    }
            100 > d && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= ("string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10)) ? 0 : -100));
            if (-1 < b) {
                r = 1;
                p = b;
                do {
                    e = 32 - (new Date(d,r - 1,32)).getDate();
                    if (p <= e)
                        break;
                    r++;
                    p -= e
                } while (1)
            }
            g = h.getDate(d, r - 1, p, -1 == O ? g : O && 12 > g ? g + 12 : !O && 12 == g ? 0 : g, W, i);
            return h.getYear(g) != d || h.getMonth(g) + 1 != r || h.getDay(g) != p ? j : g
        }
    };
    m.formatDate = m.datetime.formatDate;
    m.parseDate = m.datetime.parseDate
})($);
(function(a, m) {
    var s = {
        invalid: [],
        showInput: !0,
        inputClass: ""
    };
    a.mobiscroll.presets.scroller.list = function(t) {
        function h(b, d, c, f) {
            for (var e, g = 0; g < d; ) {
                var i = a(".dwwl" + g, b), h;
                e = 0;
                h = void 0;
                for (var j = c, k = []; e < g; ) {
                    var q = f[e];
                    for (h in j)
                        if (j[h].key == q) {
                            j = j[h].children;
                            break
                        }
                    e++
                }
                for (e = 0; e < j.length; )
                    j[e].invalid && k.push(j[e].key),
                        e++;
                h = k;
                for (e = 0; e < h.length; e++)
                    a('.dw-li[data-val="' + h[e] + '"]', i).removeClass("dw-v");
                g++
            }
        }
        function j(a, b) {
            for (var c = []; a; )
                c[--a] = !0;
            c[b] = !1;
            return c
        }
        function e(a, b, c) {
            var f = 0, e, g, i = [[]], h = n;
            if (b)
                for (e = 0; e < b; e++)
                    O ? i[0][e] = {} : i[e] = [{}];
            for (; f < a.length; ) {
                O ? i[0][f] = r(h, K[f]) : i[f] = [r(h, K[f])];
                e = 0;
                for (b = m; e < h.length && b === m; ) {
                    if (h[e].key == a[f] && (c !== m && f <= c || c === m))
                        b = e;
                    e++
                }
                if (b !== m && h[b].children)
                    f++,
                        h = h[b].children;
                else if ((g = d(h)) && g.children)
                    f++,
                        h = g.children;
                else
                    break
            }
            return i
        }
        function d(a, b) {
            if (!a)
                return !1;
            for (var c = 0, d; c < a.length; )
                if (!(d = a[c++]).invalid)
                    return b ? c - 1 : d;
            return !1
        }
        function r(a, b) {
            for (var c = {
                keys: [],
                values: [],
                label: b
            }, d = 0; d < a.length; )
                c.values.push(a[d].value),
                    c.keys.push(a[d].key),
                    d++;
            return c
        }
        function p(b, d) {
            a(".dwfl", b).css("display", "").slice(d).hide()
        }
        function b(a, b) {
            var c = [], f = n, e = 0, g = !1, i, h;
            if (a[e] !== m && e <= b) {
                g = 0;
                i = a[e];
                for (h = m; g < f.length && h === m; )
                    f[g].key == a[e] && !f[g].invalid && (h = g),
                        g++
            } else
                h = d(f, !0),
                    i = f[h].key;
            g = h !== m ? f[h].children : !1;
            for (c[e] = i; g; ) {
                f = f[h].children;
                e++;
                if (a[e] !== m && e <= b) {
                    g = 0;
                    i = a[e];
                    for (h = m; g < f.length && h === m; )
                        f[g].key == a[e] && !f[g].invalid && (h = g),
                            g++
                } else
                    h = d(f, !0),
                        h = !1 === h ? m : h,
                        i = f[h].key;
                g = h !== m && d(f[h].children) ? f[h].children : !1;
                c[e] = i
            }
            return {
                lvl: e + 1,
                nVector: c
            }
        }
        function g(b) {
            var d = [];
            k = k > f++ ? k : f;
            b.children("li").each(function(c) {
                var b = a(this)
                    , f = b.clone();
                f.children("ul,ol").remove();
                var f = t._processMarkup ? t._processMarkup(f) : f.html().replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                    , e = b.attr("data-invalid") ? !0 : !1
                    , c = {
                    key: b.attr("data-val") === m || null === b.attr("data-val") ? c : b.attr("data-val"),
                    value: f,
                    invalid: e,
                    children: null
                }
                    , b = b.children("ul,ol");
                b.length && (c.children = g(b));
                d.push(c)
            });
            f--;
            return d
        }
        var W = a.extend({}, t.settings), i = a.extend(t.settings, s, W), W = i.layout || (/top|bottom/.test(i.display) ? "liquid" : ""), O = "liquid" == W, v = i.readonly, A = a(this), o, B, C = this.id + "_dummy", k = 0, f = 0, u = {}, y, I = [], n = i.wheelArray || g(A), K = function(a) {
            var b = [], c;
            for (c = 0; c < a; c++)
                b[c] = i.labels && i.labels[c] ? i.labels[c] : c;
            return b
        }(k), G = function(a) {
            var b = [], c;
            c = !0;
            for (var f = 0; c; )
                c = d(a),
                    b[f++] = c.key,
                (c = c.children) && (a = c);
            return b
        }(n), T = e(G, k);
        a("#" + C).remove();
        i.showInput && (o = a('<input type="text" id="' + C + '" value="" class="' + i.inputClass + '" placeholder="' + (i.placeholder || "") + '" readonly />').insertBefore(A),
            i.anchor = o,
            t.attachShow(o));
        i.wheelArray || A.hide().closest(".ui-field-contain").trigger("create");
        return {
            width: 50,
            wheels: T,
            layout: W,
            headerText: !1,
            formatValue: function(a) {
                if (y === m)
                    y = b(a, a.length).lvl;
                return a.slice(0, y).join(" ")
            },
            parseValue: function(a) {
                return a ? (a + "").split(" ") : (i.defaultValue || G).slice(0)
            },
            onBeforeShow: function() {
                var a = t.getArrayVal(true);
                I = a.slice(0);
                i.wheels = e(a, k, k);
                B = true
            },
            onValueFill: function(a) {
                y = m;
                o && o.val(a)
            },
            onShow: function(b) {
                a(".dwwl", b).on("mousedown touchstart", function() {
                    clearTimeout(u[a(".dwwl", b).index(this)])
                })
            },
            onDestroy: function() {
                o && o.remove();
                A.show()
            },
            validate: function(a, d, c) {
                var f = [], g = t.getArrayVal(true), r = (d || 0) + 1, l, o;
                if (d !== m && I[d] != g[d] || d === m && !B) {
                    i.wheels = e(g, null, d);
                    o = b(g, d === m ? g.length : d);
                    y = o.lvl;
                    for (l = 0; l < g.length; l++)
                        g[l] = o.nVector[l] || 0;
                    for (; r < o.lvl; )
                        f.push(r++);
                    if (f.length) {
                        i.readonly = j(k, d);
                        clearTimeout(u[d]);
                        u[d] = setTimeout(function() {
                            B = true;
                            p(a, o.lvl);
                            I = g.slice(0);
                            t.changeWheel(f, d === m ? c : 0, d !== m);
                            i.readonly = v
                        }, d === m ? 0 : c * 1E3);
                        return false
                    }
                } else {
                    o = b(g, g.length);
                    y = o.lvl
                }
                I = g.slice(0);
                h(a, o.lvl, n, g);
                p(a, o.lvl);
                B = false
            }
        }
    }
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = s.classes
        , h = s.util
        , j = h.constrain
        , e = h.jsPrefix
        , d = h.prefix
        , r = h.has3d
        , p = h.getCoord
        , b = h.getPosition
        , g = h.testTouch
        , W = h.isNumeric
        , i = h.isString
        , O = window.requestAnimationFrame || function(a) {
                a()
            }
        , v = window.cancelAnimationFrame || function() {}
        ;
    t.ScrollView = function(h, o, s) {
        function C(d) {
            if ((!ja.lock || !J) && g(d, this) && !Z && a.mobiscroll.running) {
                "mousedown" == d.type && d.preventDefault();
                K && K.removeClass("mbsc-btn-a");
                N = !1;
                K = a(d.target).closest(".mbsc-btn-e", this);
                K.length && !K.hasClass("mbsc-btn-d") && (N = !0,
                    G = setTimeout(function() {
                        K.addClass("mbsc-btn-a")
                    }, 100));
                Z = !0;
                U = !1;
                V.scrolled = J;
                ia = p(d, "X");
                fa = p(d, "Y");
                L = ia;
                c = R = F = 0;
                ga = new Date;
                ea = +b(X, ha) || 0;
                n(ea, 1);
                if ("mousedown" === d.type)
                    a(document).on("mousemove", k).on("mouseup", u);
                else if ("pointerdown" === d.type)
                    a(document).on("pointermove", k).on("pointerup", u);
                da("onScrollStart", [E])
            }
        }
        function k(a) {
            if (Z) {
                L = p(a, "X");
                l = p(a, "Y");
                F = L - ia;
                R = l - fa;
                c = ha ? R : F;
                if (N && (5 < Math.abs(R) || 5 < Math.abs(F)))
                    clearTimeout(G),
                        K.removeClass("mbsc-btn-a"),
                        N = !1;
                !U && 5 < Math.abs(c) && (V.scrolled = !0,
                ja.liveSwipe && !S && (S = !0,
                    Q = O(f)));
                ha || ja.scrollLock ? a.preventDefault() : V.scrolled ? a.preventDefault() : 7 < Math.abs(R) && (U = !0,
                    V.scrolled = !0,
                    Ba.trigger("touchend"))
            }
        }
        function f() {
            P && (c = j(c, -Y * P, Y * P));
            n(j(ea + c, q - x, M + x));
            S = !1
        }
        function u(b) {
            if (Z) {
                var d;
                d = new Date - ga;
                v(Q);
                S = !1;
                !U && V.scrolled && (ja.momentum && r && 300 > d && (d = c / d,
                    c = Math.max(Math.abs(c), d * d / ja.speedUnit) * (0 > c ? -1 : 1)),
                    I(c));
                N && (clearTimeout(G),
                    K.addClass("mbsc-btn-a"),
                    setTimeout(function() {
                        K.removeClass("mbsc-btn-a")
                    }, 100),
                !U && !V.scrolled && da("onBtnTap", [K]));
                "mouseup" == b.type ? a(document).off("mousemove", k).off("mouseup", u) : "pointerup" == b.type && a(document).off("pointermove", k).off("pointerup", u);
                Z = !1
            }
        }
        function y(b) {
            b = b.originalEvent || b;
            if ((c = ha ? b.deltaY || b.wheelDelta || b.detail : b.deltaX) && a.mobiscroll.running)
                b.preventDefault(),
                    c = 0 > c ? 20 : -20,
                    ea = E,
                S || (S = !0,
                    Q = O(f)),
                    clearTimeout(aa),
                    aa = setTimeout(function() {
                        v(Q);
                        S = false;
                        I(c)
                    }, 200)
        }
        function I(a) {
            var b;
            P && (a = j(a, -Y * P, Y * P));
            ua = Math.round((ea + a) / Y);
            b = j(ua * Y, q, M);
            if (D) {
                if (0 > a)
                    for (a = D.length - 1; 0 <= a; a--) {
                        if (Math.abs(b) + T >= D[a].breakpoint) {
                            ua = a;
                            pa = 2;
                            b = D[a].snap2;
                            break
                        }
                    }
                else if (0 <= a)
                    for (a = 0; a < D.length; a++)
                        if (Math.abs(b) <= D[a].breakpoint) {
                            ua = a;
                            pa = 1;
                            b = D[a].snap1;
                            break
                        }
                b = j(b, q, M)
            }
            n(b, ja.time || (E < q || E > M ? 200 : Math.max(200, Math.abs(b - E) * ja.timeUnit)), function() {
                da("onScrollEnd", [E])
            })
        }
        function n(a, b, c) {
            var f = function() {
                J = !1;
                c && c()
            };
            J = !0;
            r ? (w[e + "Transition"] = b ? d + "transform " + Math.round(b) + "ms " + ja.easing : "",
                w[e + "Transform"] = "translate3d(" + (ha ? "0," + a + "px," : a + "px,0,") + "0)",
                E == a || !b ? f() : b && setTimeout(function() {
                    w[e + "Transition"] = "";
                    f()
                }, b)) : (setTimeout(f, b || 0),
                w[H] = a + "px");
            E = a
        }
        var K, G, T, F, R, c, H, x, L, l, N, M, P, q, U, Z, J, Q, S, aa, Y, D, ea, ga, ia, fa, w, X, da, ha, V = this, E = 0, ua = 0, pa = 1, ja = o, Ba = a(h);
        t.Base.call(this, h, o, !0);
        V.scrolled = !1;
        V.scroll = function(b, c, d) {
            b = W(b) ? Math.round(b / Y) * Y : Math.ceil((a(b, h).length ? Math.round(X.offset()[H] - a(b, h).offset()[H]) : E) / Y) * Y;
            ua = Math.round(b / Y);
            n(j(b, q, M), c, d)
        }
        ;
        V.refresh = function() {
            var a;
            T = ja.contSize === m ? ha ? Ba.height() : Ba.width() : ja.contSize;
            q = ja.minScroll === m ? ha ? T - X.height() : T - X.width() : ja.minScroll;
            M = ja.maxScroll === m ? 0 : ja.maxScroll;
            !ha && ja.rtl && (a = M,
                M = -q,
                q = -a);
            i(ja.snap) && (D = [],
                X.find(ja.snap).each(function() {
                    var a = ha ? this.offsetTop : this.offsetLeft
                        , b = ha ? this.offsetHeight : this.offsetWidth;
                    D.push({
                        breakpoint: a + b / 2,
                        snap1: -a,
                        snap2: T - a - b
                    })
                }));
            Y = W(ja.snap) ? ja.snap : 1;
            P = ja.snap ? ja.maxSnapScroll : 0;
            x = ja.elastic ? W(ja.snap) ? Y : W(ja.elastic) ? ja.elastic : 0 : 0;
            V.scroll(ja.snap ? D ? D[ua]["snap" + pa] : ua * Y : E)
        }
        ;
        V.init = function(a) {
            V._init(a);
            H = (ha = "Y" == ja.axis) ? "top" : "left";
            X = ja.moveElement || Ba.children().eq(0);
            w = X[0].style;
            V.refresh();
            if (ja.swipe)
                Ba.on("touchstart mousedown pointerdown", C).on("touchmove", k).on("touchend touchcancel pointercancel", u);
            if (ja.mousewheel)
                Ba.on("wheel mousewheel", y);
            h.addEventListener && h.addEventListener("click", function(a) {
                V.scrolled && (a.stopPropagation(),
                    a.preventDefault())
            }, !0)
        }
        ;
        V.destroy = function() {
            Ba.off("touchstart mousedown pointerdown", C).off("touchmove", k).off("touchend touchcancel pointercancel", u).off("wheel mousewheel", y);
            V._destroy()
        }
        ;
        ja = V.settings;
        da = V.trigger;
        s || V.init(o)
    }
    ;
    t.ScrollView.prototype = {
        _class: "scrollview",
        _defaults: {
            speedUnit: 0.0022,
            timeUnit: 0.8,
            axis: "Y",
            easing: "ease-out",
            swipe: !0,
            liveSwipe: !0,
            momentum: !0,
            elastic: !0
        }
    };
    s.presetShort("scrollview", "ScrollView", !1)
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = s.datetime
        , h = new Date
        , j = {
        startYear: h.getFullYear() - 100,
        endYear: h.getFullYear() + 1,
        separator: " ",
        dateFormat: "mm/dd/yy",
        dateOrder: "mmddy",
        timeWheels: "hhiiA",
        timeFormat: "hh:ii A",
        dayText: "Day",
        monthText: "Month",
        yearText: "Year",
        hourText: "Hours",
        minuteText: "Minutes",
        ampmText: "&nbsp;",
        secText: "Seconds",
        nowText: "Now"
    }
        , e = function(d) {
        function e(a, b, c) {
            return M[b] !== m ? +a[M[b]] : P[b] !== m ? P[b] : c !== m ? c : q[b](ea)
        }
        function h(a, b, c, d) {
            a.push({
                values: c,
                keys: b,
                label: d
            })
        }
        function b(a, b, c, d) {
            return Math.min(d, Math.floor(a / b) * b + c)
        }
        function g(a) {
            if (null === a)
                return a;
            var b = e(a, "y")
                , c = e(a, "m")
                , d = Math.min(e(a, "d", 1), x.getMaxDayOfMonth(b, c))
                , f = e(a, "h", 0);
            return x.getDate(b, c, d, e(a, "a", 0) ? f + 12 : f, e(a, "i", 0), e(a, "s", 0), e(a, "u", 0))
        }
        function W(a, b) {
            var c, d, f = !1, e = !1, h = 0, l = 0;
            w = g(B(w));
            X = g(B(X));
            if (i(a))
                return a;
            a < w && (a = w);
            a > X && (a = X);
            d = c = a;
            if (2 !== b)
                for (f = i(c); !f && c < X; )
                    c = new Date(c.getTime() + 864E5),
                        f = i(c),
                        h++;
            if (1 !== b)
                for (e = i(d); !e && d > w; )
                    d = new Date(d.getTime() - 864E5),
                        e = i(d),
                        l++;
            return 1 === b && f ? c : 2 === b && e ? d : l <= h && e ? d : c
        }
        function i(a) {
            return a < w || a > X ? !1 : O(a, Z) ? !0 : O(a, U) ? !1 : !0
        }
        function O(a, b) {
            var c, d, f;
            if (b)
                for (d = 0; d < b.length; d++)
                    if (c = b[d],
                            f = c + "",
                            !c.start)
                        if (c.getTime) {
                            if (a.getFullYear() == c.getFullYear() && a.getMonth() == c.getMonth() && a.getDate() == c.getDate())
                                return !0
                        } else if (f.match(/w/i)) {
                            if (f = +f.replace("w", ""),
                                f == a.getDay())
                                return !0
                        } else if (f = f.split("/"),
                                f[1]) {
                            if (f[0] - 1 == a.getMonth() && f[1] == a.getDate())
                                return !0
                        } else if (f[0] == a.getDate())
                            return !0;
            return !1
        }
        function v(a, b, c, d, f, e, g) {
            var h, i, l;
            if (a)
                for (h = 0; h < a.length; h++)
                    if (i = a[h],
                            l = i + "",
                            !i.start)
                        if (i.getTime)
                            x.getYear(i) == b && x.getMonth(i) == c && (e[x.getDay(i) - 1] = g);
                        else if (l.match(/w/i)) {
                            l = +l.replace("w", "");
                            for (n = l - d; n < f; n += 7)
                                0 <= n && (e[n] = g)
                        } else
                            l = l.split("/"),
                                l[1] ? l[0] - 1 == c && (e[l[1] - 1] = g) : e[l[0] - 1] = g
        }
        function A(d, f, e, g, h, i, j, k, q) {
            var J, n, r, w, p, D, u, P, t, v, E, A, N, s, O, M, y, B, Q = {}, L = {
                h: ga,
                i: ia,
                s: fa,
                a: 1
            }, V = x.getDate(h, i, j), ha = ["a", "h", "i", "s"];
            d && (a.each(d, function(a, b) {
                if (b.start && (b.apply = !1,
                        J = b.d,
                        n = J + "",
                        r = n.split("/"),
                    J && (J.getTime && h == x.getYear(J) && i == x.getMonth(J) && j == x.getDay(J) || !n.match(/w/i) && (r[1] && j == r[1] && i == r[0] - 1 || !r[1] && j == r[0]) || n.match(/w/i) && V.getDay() == +n.replace("w", ""))))
                    b.apply = !0,
                        Q[V] = !0
            }),
                a.each(d, function(d, g) {
                    E = s = N = 0;
                    A = m;
                    u = D = !0;
                    O = !1;
                    if (g.start && (g.apply || !g.d && !Q[V])) {
                        w = g.start.split(":");
                        p = g.end.split(":");
                        for (v = 0; 3 > v; v++)
                            w[v] === m && (w[v] = 0),
                            p[v] === m && (p[v] = 59),
                                w[v] = +w[v],
                                p[v] = +p[v];
                        w.unshift(11 < w[0] ? 1 : 0);
                        p.unshift(11 < p[0] ? 1 : 0);
                        Y && (12 <= w[1] && (w[1] -= 12),
                        12 <= p[1] && (p[1] -= 12));
                        for (v = 0; v < f; v++)
                            if (l[v] !== m) {
                                P = b(w[v], L[ha[v]], c[ha[v]], H[ha[v]]);
                                t = b(p[v], L[ha[v]], c[ha[v]], H[ha[v]]);
                                B = y = M = 0;
                                Y && 1 == v && (M = w[0] ? 12 : 0,
                                    y = p[0] ? 12 : 0,
                                    B = l[0] ? 12 : 0);
                                D || (P = 0);
                                u || (t = H[ha[v]]);
                                if ((D || u) && P + M < l[v] + B && l[v] + B < t + y)
                                    O = !0;
                                l[v] != P && (D = !1);
                                l[v] != t && (u = !1)
                            }
                        if (!q)
                            for (v = f + 1; 4 > v; v++)
                                0 < w[v] && (N = L[e]),
                                p[v] < H[ha[v]] && (s = L[e]);
                        O || (P = b(w[f], L[e], c[e], H[e]) + N,
                            t = b(p[f], L[e], c[e], H[e]) - s,
                        D && (E = 0 > P ? 0 : P > H[e] ? a(".dw-li", k).length : o(k, P) + 0),
                        u && (A = 0 > t ? 0 : t > H[e] ? a(".dw-li", k).length : o(k, t) + 1));
                        if (D || u || O)
                            q ? a(".dw-li", k).slice(E, A).addClass("dw-v") : a(".dw-li", k).slice(E, A).removeClass("dw-v")
                    }
                }))
        }
        function o(b, c) {
            return a(".dw-li", b).index(a('.dw-li[data-val="' + c + '"]', b))
        }
        function B(b, c) {
            var d = [];
            if (null === b || b === m)
                return b;
            a.each("y,m,d,a,h,i,s,u".split(","), function(a, f) {
                M[f] !== m && (d[M[f]] = q[f](b));
                c && (P[f] = q[f](b))
            });
            return d
        }
        function C(a) {
            var b, c, d, f = [];
            if (a) {
                for (b = 0; b < a.length; b++)
                    if (c = a[b],
                        c.start && c.start.getTime)
                        for (d = new Date(c.start); d <= c.end; )
                            f.push(new Date(d.getFullYear(),d.getMonth(),d.getDate())),
                                d.setDate(d.getDate() + 1);
                    else
                        f.push(c);
                return f
            }
            return a
        }
        var k = a(this), f = {}, u;
        if (k.is("input")) {
            switch (k.attr("type")) {
                case "date":
                    u = "yy-mm-dd";
                    break;
                case "datetime":
                    u = "yy-mm-ddTHH:ii:ssZ";
                    break;
                case "datetime-local":
                    u = "yy-mm-ddTHH:ii:ss";
                    break;
                case "month":
                    u = "yy-mm";
                    f.dateOrder = "mmyy";
                    break;
                case "time":
                    u = "HH:ii:ss"
            }
            var y = k.attr("min")
                , k = k.attr("max");
            y && (f.minDate = t.parseDate(u, y));
            k && (f.maxDate = t.parseDate(u, k))
        }
        var I, n, K, G, T, F, R, c, H, y = a.extend({}, d.settings), x = a.extend(d.settings, s.datetime.defaults, j, f, y), L = 0, l = [], f = [], N = [], M = {}, P = {}, q = {
            y: function(a) {
                return x.getYear(a)
            },
            m: function(a) {
                return x.getMonth(a)
            },
            d: function(a) {
                return x.getDay(a)
            },
            h: function(a) {
                a = a.getHours();
                a = Y && 12 <= a ? a - 12 : a;
                return b(a, ga, da, E)
            },
            i: function(a) {
                return b(a.getMinutes(), ia, ha, ua)
            },
            s: function(a) {
                return b(a.getSeconds(), fa, V, pa)
            },
            u: function(a) {
                return a.getMilliseconds()
            },
            a: function(a) {
                return aa && 11 < a.getHours() ? 1 : 0
            }
        }, U = x.invalid, Z = x.valid, y = x.preset, J = x.dateOrder, Q = x.timeWheels, S = J.match(/D/), aa = Q.match(/a/i), Y = Q.match(/h/), D = "datetime" == y ? x.dateFormat + x.separator + x.timeFormat : "time" == y ? x.timeFormat : x.dateFormat, ea = new Date, k = x.steps || {}, ga = k.hour || x.stepHour || 1, ia = k.minute || x.stepMinute || 1, fa = k.second || x.stepSecond || 1, k = k.zeroBased, w = x.minDate || new Date(x.startYear,0,1), X = x.maxDate || new Date(x.endYear,11,31,23,59,59), da = k ? 0 : w.getHours() % ga, ha = k ? 0 : w.getMinutes() % ia, V = k ? 0 : w.getSeconds() % fa, E = Math.floor(((Y ? 11 : 23) - da) / ga) * ga + da, ua = Math.floor((59 - ha) / ia) * ia + ha, pa = Math.floor((59 - ha) / ia) * ia + ha;
        u = u || D;
        if (y.match(/date/i)) {
            a.each(["y", "m", "d"], function(a, b) {
                I = J.search(RegExp(b, "i"));
                -1 < I && N.push({
                    o: I,
                    v: b
                })
            });
            N.sort(function(a, b) {
                return a.o > b.o ? 1 : -1
            });
            a.each(N, function(a, b) {
                M[b.v] = a
            });
            k = [];
            for (n = 0; 3 > n; n++)
                if (n == M.y) {
                    L++;
                    G = [];
                    K = [];
                    T = x.getYear(w);
                    F = x.getYear(X);
                    for (I = T; I <= F; I++)
                        K.push(I),
                            G.push((J.match(/yy/i) ? I : (I + "").substr(2, 2)) + (x.yearSuffix || ""));
                    h(k, K, G, x.yearText)
                } else if (n == M.m) {
                    L++;
                    G = [];
                    K = [];
                    for (I = 0; 12 > I; I++)
                        T = J.replace(/[dy]/gi, "").replace(/mm/, (9 > I ? "0" + (I + 1) : I + 1) + (x.monthSuffix || "")).replace(/m/, I + 1 + (x.monthSuffix || "")),
                            K.push(I),
                            G.push(T.match(/MM/) ? T.replace(/MM/, '<span class="dw-mon">' + x.monthNames[I] + "</span>") : T.replace(/M/, '<span class="dw-mon">' + x.monthNamesShort[I] + "</span>"));
                    h(k, K, G, x.monthText)
                } else if (n == M.d) {
                    L++;
                    G = [];
                    K = [];
                    for (I = 1; 32 > I; I++)
                        K.push(I),
                            G.push((J.match(/dd/i) && 10 > I ? "0" + I : I) + (x.daySuffix || ""));
                    h(k, K, G, x.dayText)
                }
            f.push(k)
        }
        if (y.match(/time/i)) {
            R = !0;
            N = [];
            a.each(["h", "i", "s", "a"], function(a, b) {
                a = Q.search(RegExp(b, "i"));
                -1 < a && N.push({
                    o: a,
                    v: b
                })
            });
            N.sort(function(a, b) {
                return a.o > b.o ? 1 : -1
            });
            a.each(N, function(a, b) {
                M[b.v] = L + a
            });
            k = [];
            for (n = L; n < L + 4; n++)
                if (n == M.h) {
                    L++;
                    G = [];
                    K = [];
                    for (I = da; I < (Y ? 12 : 24); I += ga)
                        K.push(I),
                            G.push(Y && 0 === I ? 12 : Q.match(/hh/i) && 10 > I ? "0" + I : I);
                    h(k, K, G, x.hourText)
                } else if (n == M.i) {
                    L++;
                    G = [];
                    K = [];
                    for (I = ha; 60 > I; I += ia)
                        K.push(I),
                            G.push(Q.match(/ii/) && 10 > I ? "0" + I : I);
                    h(k, K, G, x.minuteText)
                } else if (n == M.s) {
                    L++;
                    G = [];
                    K = [];
                    for (I = V; 60 > I; I += fa)
                        K.push(I),
                            G.push(Q.match(/ss/) && 10 > I ? "0" + I : I);
                    h(k, K, G, x.secText)
                } else
                    n == M.a && (L++,
                        y = Q.match(/A/),
                        h(k, [0, 1], y ? [x.amText.toUpperCase(), x.pmText.toUpperCase()] : [x.amText, x.pmText], x.ampmText));
            f.push(k)
        }
        d.getVal = function(a) {
            return d._hasValue || a ? g(d.getArrayVal(a)) : null
        }
        ;
        d.setDate = function(a, b, c, f, e) {
            d.setArrayVal(B(a), b, e, f, c)
        }
        ;
        d.getDate = d.getVal;
        d.format = D;
        d.order = M;
        d.handlers.now = function() {
            d.setDate(new Date, !1, 0.3, !0, !0)
        }
        ;
        d.buttons.now = {
            text: x.nowText,
            handler: "now"
        };
        U = C(U);
        Z = C(Z);
        c = {
            y: w.getFullYear(),
            m: 0,
            d: 1,
            h: da,
            i: ha,
            s: V,
            a: 0
        };
        H = {
            y: X.getFullYear(),
            m: 11,
            d: 31,
            h: E,
            i: ua,
            s: pa,
            a: 1
        };
        return {
            wheels: f,
            headerText: x.headerText ? function() {
                return t.formatDate(D, g(d.getArrayVal(!0)), x)
            }
                : !1,
            formatValue: function(a) {
                return t.formatDate(u, g(a), x)
            },
            parseValue: function(a) {
                a || (P = {});
                return B(a ? t.parseDate(u, a, x) : x.defaultValue || new Date, !!a && !!a.getTime)
            },
            validate: function(b, f, h, i) {
                var f = W(g(d.getArrayVal(!0)), i)
                    , j = B(f)
                    , k = e(j, "y")
                    , n = e(j, "m")
                    , p = !0
                    , Y = !0;
                a.each("y,m,d,a,h,i,s".split(","), function(d, f) {
                    if (M[f] !== m) {
                        var g = c[f]
                            , h = H[f]
                            , i = 31
                            , l = e(j, f)
                            , D = a(".dw-ul", b).eq(M[f]);
                        if (f == "d") {
                            h = i = x.getMaxDayOfMonth(k, n);
                            S && a(".dw-li", D).each(function() {
                                var b = a(this)
                                    , c = b.data("val")
                                    , d = x.getDate(k, n, c).getDay()
                                    , c = J.replace(/[my]/gi, "").replace(/dd/, (c < 10 ? "0" + c : c) + (x.daySuffix || "")).replace(/d/, c + (x.daySuffix || ""));
                                a(".dw-i", b).html(c.match(/DD/) ? c.replace(/DD/, '<span class="dw-day">' + x.dayNames[d] + "</span>") : c.replace(/D/, '<span class="dw-day">' + x.dayNamesShort[d] + "</span>"))
                            })
                        }
                        p && w && (g = q[f](w));
                        Y && X && (h = q[f](X));
                        if (f != "y") {
                            var u = o(D, g)
                                , P = o(D, h);
                            a(".dw-li", D).removeClass("dw-v").slice(u, P + 1).addClass("dw-v");
                            f == "d" && a(".dw-li", D).removeClass("dw-h").slice(i).addClass("dw-h")
                        }
                        l < g && (l = g);
                        l > h && (l = h);
                        p && (p = l == g);
                        Y && (Y = l == h);
                        if (f == "d") {
                            g = x.getDate(k, n, 1).getDay();
                            h = {};
                            v(U, k, n, g, i, h, 1);
                            v(Z, k, n, g, i, h, 0);
                            a.each(h, function(b, c) {
                                c && a(".dw-li", D).eq(b).removeClass("dw-v")
                            })
                        }
                    }
                });
                R && a.each(["a", "h", "i", "s"], function(c, f) {
                    var g = e(j, f)
                        , h = e(j, "d")
                        , q = a(".dw-ul", b).eq(M[f]);
                    M[f] !== m && (A(U, c, f, j, k, n, h, q, 0),
                        A(Z, c, f, j, k, n, h, q, 1),
                        l[c] = +d.getValidCell(g, q, i).val)
                });
                d._tempWheelArray = j
            }
        }
    };
    a.each(["date", "time", "datetime"], function(a, h) {
        s.presets.scroller[h] = e
    })
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = {
        batch: 50,
        min: 0,
        max: 100,
        defUnit: "",
        units: null,
        unitNames: null,
        invalid: [],
        sign: !1,
        step: 0.05,
        scale: 2,
        convert: function(a) {
            return a
        },
        signText: "&nbsp;",
        wholeText: "Whole",
        fractionText: "Fraction",
        unitText: "Unit"
    };
    s.presets.scroller.measurement = function(h) {
        function j(a) {
            return Math.max(ea, Math.min(ga, L ? 0 > a ? Math.ceil(a) : Math.floor(a) : p(Math.round(a - X), P) + X))
        }
        function e(a) {
            return L ? p((Math.abs(a) - Math.abs(j(a))) * M - da, P) + da : 0
        }
        function d(a) {
            var b = j(a)
                , c = e(a);
            c >= M && (0 > a ? b-- : b++,
                c = 0);
            return [0 > a ? "-" : "+", b, c]
        }
        function r(a) {
            var b = +a[S]
                , c = L ? g(a[Q]) / M * (0 > b ? -1 : 1) : 0;
            return (R && "-" == a[0] ? -1 : 1) * (b + c)
        }
        function p(a, b) {
            return Math.round(a / b) * b
        }
        function b(a, b) {
            for (a += ""; a.length < b; )
                a = "0" + a;
            return a
        }
        function g(a) {
            return a ? (a + "").replace(/\+|\-/g, "") : ""
        }
        function s(a, b, c) {
            return b === c || !C.convert ? a : C.convert.call(this, a, b, c)
        }
        function i(a, b, c) {
            a = a > c ? c : a;
            return a < b ? b : a
        }
        function O(a) {
            Y = s(C.min, H, a);
            D = s(C.max, H, a);
            L ? (ea = 0 > Y ? Math.ceil(Y) : Math.floor(Y),
                ga = 0 > D ? Math.ceil(D) : Math.floor(D),
                ia = e(Y),
                fa = e(D)) : (ea = Math.round(Y),
                ga = Math.round(D),
                ga = ea + Math.floor((ga - ea) / P) * P,
                X = ea % P)
        }
        function v(a, b) {
            var c = +ea, d = +ga, f = L ? 1 : P, e;
            R && (d = Math.abs(c) > Math.abs(d) ? Math.abs(c) : Math.abs(d),
                c = 0 > c ? 0 : c);
            e = b - n * f;
            e = e < c ? c : e;
            c = e + 2 * n * f;
            c = c > d ? d : c;
            if (e !== K || c !== G) {
                u.values = [];
                u.label = C.wholeText;
                for (V = e; V <= c; V += f)
                    u.values.push(V);
                T = e;
                F = c;
                return !0
            }
            return !1
        }
        function A(c) {
            if (l) {
                var d = I.length, c = a.inArray(+c, I), f, e;
                y.keys = [];
                y.values = [];
                for (V = -50; 50 > V; V++)
                    f = (V + c) % d,
                        e = I[0 > f ? d + f : f],
                        f = Math.abs(Math.floor((V + c) / d)),
                        y.keys.push(Array(f).join(0 > V + c ? "-" : "+") + e),
                        y.values.push("." + b(e, N))
            }
        }
        function o(a) {
            return r(a).toFixed(L ? N : 0) + (c ? " " + x[a[aa]] : "")
        }
        var B = a.extend({}, h.settings), C = a.extend(h.settings, t, B), B = {}, k = [[]], f = {}, u = {}, y = {}, I = [], n = C.batch, K, G, T, F, R = C.sign, c = C.units && C.units.length, H = c ? C.defUnit || C.units[0] : "", x = C.unitNames || C.units, L = 1 > C.step, l = !1, N = L ? Math.max(C.scale, (C.step + "").split(".")[1].length) : 1, M = Math.pow(10, N), P = Math.round(L ? C.step * M : C.step), q, U, Z, J = -1, Q, S, aa, Y, D, ea, ga, ia, fa, w, X = 0, da = 0, ha = {}, V, E = 0;
        h.setVal = function(b, c, d, f, e) {
            h._setVal(a.isArray(b) ? o(b) : b, c, d, f, e)
        }
        ;
        h.setValue = function(a, b, c, d, f) {
            h.setVal(a, b, f, d, c)
        }
        ;
        O(H);
        if (R)
            if (R = !1,
                    c)
                for (V = 0; V < C.units.length; V++)
                    0 > s(C.min, H, C.units[V]) && (R = !0);
            else
                R = 0 > C.min;
        R && (k[0].push({
            values: ["-", "+"],
            label: C.signText
        }),
            J = E++);
        k[0].push(u);
        S = E++;
        if (L) {
            k[0].push(y);
            y.keys = [];
            y.values = [];
            y.label = C.fractionText;
            for (V = da; V < M; V += P)
                I.push(V),
                    y.keys.push(V),
                    y.values.push("." + b(V, N));
            l = I.length > C.rows;
            Q = E++;
            q = Math.ceil(100 / P);
            C.invalid && C.invalid.length && (a.each(C.invalid, function(a, b) {
                var c = b > 0 ? Math.floor(b) : Math.ceil(b);
                c === 0 && (c = b <= 0 ? -0.001 : 0.001);
                f[c] = (f[c] || 0) + 1;
                if (b === 0) {
                    c = 0.001;
                    f[c] = (f[c] || 0) + 1
                }
            }),
                a.each(f, function(a, b) {
                    b < q ? delete f[a] : f[a] = a
                }))
        }
        if (c) {
            B = {
                keys: [],
                values: [],
                label: C.unitText
            };
            for (V = 0; V < C.units.length; V++)
                B.keys.push(V),
                    B.values.push(x[V]);
            k[0].push(B)
        }
        aa = E;
        return {
            width: 55,
            wheels: k,
            showLabel: !1,
            formatValue: o,
            parseValue: function(b) {
                var f = ((b || C.defaultValue) + "").split(" ")
                    , b = +f[0]
                    , e = []
                    , g = "";
                if (c) {
                    g = a.inArray(f[1], x);
                    g = g == -1 ? a.inArray(H, C.units) : g;
                    g = g == -1 ? 0 : g
                }
                Z = c ? C.units[g] : "";
                O(Z);
                b = isNaN(b) ? 0 : b;
                b = i(b, Y, D);
                f = d(b);
                f[1] = i(f[1], ea, ga);
                U = b;
                if (R) {
                    e[0] = f[0];
                    f[1] = Math.abs(f[1])
                }
                e[S] = f[1];
                L && (e[Q] = f[2]);
                c && (e[aa] = g);
                return e
            },
            onBeforeShow: function() {
                v(Z, h._tempWheelArray[S]);
                A(g(h._tempWheelArray[Q]));
                K = T;
                G = F;
                w = true
            },
            onShow: function(b) {
                a(".dwwl", b).on("mousedown touchstart", function() {
                    clearTimeout(ha[a(".dwwl", b).index(this)])
                })
            },
            onCancel: function() {
                U = m
            },
            validate: function(b, e, j, k) {
                var q = h._tempWheelArray, n, o = [], u, t, E, N, x, M, y, B = +g(q[Q]), I = c ? C.units[q[aa]] : "";
                if (R && e === 0) {
                    U = Math.abs(U) * (q[e] === "-" ? -1 : 1);
                    o = l ? [S, Q] : [S]
                }
                if (e === S || e === Q && L || U === m || e === m && !w) {
                    U = r(q);
                    Z = I
                }
                if (c && e === aa && Z !== I || e === m && !w) {
                    O(I);
                    U = s(U, Z, I);
                    Z = I;
                    t = d(U);
                    R && (q[0] = t[0]);
                    v(I, R ? Math.abs(t[1]) : t[1]);
                    A(B);
                    o = l ? [S, Q] : [S];
                    u = e ? 0.2 : j
                }
                U = i(U, Y, D);
                t = d(U);
                N = R ? Math.abs(t[1]) : t[1];
                n = R ? q[0] == "-" : U < 0;
                q[S] = N;
                n && (t[0] = "-");
                L && (q[Q] = t[2]);
                if (e === S || R && e === 0)
                    x = v(I, N);
                e === S && x && o.push(S);
                if (e === Q && l) {
                    A(B);
                    o.push(Q)
                }
                if (o.length) {
                    ha[e] = setTimeout(function() {
                        w = true;
                        K = T;
                        G = F;
                        h.changeWheel(o, u, e !== m)
                    }, e === m ? 0 : j * 1E3);
                    return false
                }
                if (R && e === m) {
                    M = a(".dw-ul", b).eq(J);
                    a(".dw-li", M).addClass("dw-v");
                    Y > 0 && a(".dw-li", M).eq(0).removeClass("dw-v");
                    D < 0 && a(".dw-li", M).eq(1).removeClass("dw-v")
                }
                M = a(".dw-ul", b).eq(S);
                if (R && !e) {
                    a(".dw-li", M).addClass("dw-v");
                    V = a(".dw-li", M).index(a('.dw-li[data-val="' + Math.abs(n ? ea : ga) + '"]', M));
                    V != -1 && a(".dw-li", M).slice(V + 1).removeClass("dw-v")
                }
                a.each(L ? f : C.invalid, function(b, c) {
                    if (R && n)
                        if (c <= 0)
                            c = Math.abs(c);
                        else
                            return;
                    a('.dw-li[data-val="' + p(s(c, H, I), L ? 1 : P) + '"]', M).removeClass("dw-v")
                });
                q[S] = +h.getValidCell(N, M, k).val;
                t[1] = q[S] * (R && n ? -1 : 1);
                if (e !== Q && L) {
                    M = a(".dw-ul", b).eq(Q);
                    a(".dw-li", M).addClass("dw-v");
                    b = R ? q[0] + g(q[1]) : (U < 0 ? "-" : "+") + Math.abs(t[1]);
                    j = (Y < 0 ? "-" : "+") + Math.abs(ea);
                    k = (D < 0 ? "-" : "+") + Math.abs(ga);
                    b === j && a(".dw-li", M).each(function() {
                        y = g(a(this).attr("data-val"));
                        (n ? y > ia : y < ia) && a(this).removeClass("dw-v")
                    });
                    b === k && a(".dw-li", M).each(function() {
                        y = g(a(this).attr("data-val"));
                        (n ? y < fa : y > fa) && a(this).removeClass("dw-v")
                    });
                    a.each(C.invalid, function(b, c) {
                        E = d(s(c, H, I));
                        (t[0] === E[0] || t[1] === 0 && E[1] === 0 && E[2] === 0) && t[1] === E[1] && a(".dw-li", M).each(function() {
                            g(a(this).attr("data-val")) == E[2] && a(this).removeClass("dw-v")
                        })
                    })
                }
                w = false
            }
        }
    }
    ;
    s.presetShort("measurement")
})($);
(function(a, m, s, t) {
    var h = a.mobiscroll
        , j = h.presets.scroller
        , e = h.util
        , d = e.has3d
        , r = e.jsPrefix
        , p = e.testTouch
        , b = {
        controls: ["calendar"],
        firstDay: 0,
        weekDays: "short",
        maxMonthWidth: 170,
        months: 1,
        preMonths: 1,
        highlight: !0,
        highlightNow: !0,
        swipe: !0,
        liveSwipe: !0,
        divergentDayChange: !0,
        quickNav: !0,
        navigation: "yearMonth",
        todayClass: "dw-cal-today",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
        dateText: "Date",
        timeText: "Time",
        calendarText: "Calendar",
        todayText: "Today",
        prevMonthText: "Previous Month",
        nextMonthText: "Next Month",
        prevYearText: "Previous Year",
        nextYearText: "Next Year"
    };
    j.calbase = function(g) {
        function m(b, c, d) {
            var f, e, g, h, i = {}, l = na + Ia;
            b && a.each(b, function(a, b) {
                f = b.d || b.start || b;
                e = f + "";
                if (b.start && b.end)
                    for (h = new Date(b.start); h <= b.end; )
                        g = new Date(h.getFullYear(),h.getMonth(),h.getDate()),
                            i[g] = i[g] || [],
                            i[g].push(b),
                            h.setDate(h.getDate() + 1);
                else if (f.getTime)
                    g = new Date(f.getFullYear(),f.getMonth(),f.getDate()),
                        i[g] = i[g] || [],
                        i[g].push(b);
                else if (e.match(/w/i)) {
                    var j = +e.replace("w", "")
                        , k = 0
                        , q = z.getDate(c, d - na - ma, 1).getDay();
                    1 < z.firstDay - q + 1 && (k = 7);
                    for (N = 0; N < 5 * Ea; N++)
                        g = z.getDate(c, d - na - ma, 7 * N - k - q + 1 + j),
                            i[g] = i[g] || [],
                            i[g].push(b)
                } else if (e = e.split("/"),
                        e[1])
                    11 <= d + l && (g = z.getDate(c + 1, e[0] - 1, e[1]),
                        i[g] = i[g] || [],
                        i[g].push(b)),
                    1 >= d - l && (g = z.getDate(c - 1, e[0] - 1, e[1]),
                        i[g] = i[g] || [],
                        i[g].push(b)),
                        g = z.getDate(c, e[0] - 1, e[1]),
                        i[g] = i[g] || [],
                        i[g].push(b);
                else
                    for (N = 0; N < Ea; N++)
                        g = z.getDate(c, d - na - ma + N, e[0]),
                        z.getDay(g) == e[0] && (i[g] = i[g] || [],
                            i[g].push(b))
            });
            return i
        }
        function i(a, b) {
            Ja = m(z.invalid, a, b);
            Db = m(z.valid, a, b);
            g.onGenMonth(a, b)
        }
        function O(a, b, c, d, f, e, g) {
            var h = '<div class="dw-cal-h dw-cal-sc-c dw-cal-' + a + "-c " + (z.calendarClass || "") + '"><div class="dw-cal-sc"><div class="dw-cal-sc-p"><div class="dw-cal-sc-tbl"><div class="dw-cal-sc-row">';
            for (l = 1; l <= b; l++)
                h = 12 >= l || l > c ? h + '<div class="dw-cal-sc-m-cell dw-cal-sc-cell dw-cal-sc-empty"><div class="dw-i">&nbsp;</div></div>' : h + ('<div tabindex="0" role="button"' + (e ? ' aria-label="' + e[l - 13] + '"' : "") + ' class="dwb-e dwb-nhl dw-cal-sc-m-cell dw-cal-sc-cell dw-cal-' + a + '-s" data-val=' + (d + l - 13) + '><div class="dw-i dw-cal-sc-tbl"><div class="dw-cal-sc-cell">' + (g ? g[l - 13] : d + l - 13 + f) + "</div></div></div>"),
                l < b && (0 === l % 12 ? h += '</div></div></div><div class="dw-cal-sc-p" style="' + (Pa ? "top" : Xa ? "right" : "left") + ":" + 100 * Math.round(l / 12) + '%"><div class="dw-cal-sc-tbl"><div class="dw-cal-sc-row">' : 0 === l % 3 && (h += '</div><div class="dw-cal-sc-row">'));
            return h + "</div></div></div></div></div>"
        }
        function v(b, c) {
            var d, f, e, h, i, l, j, k, q, J, n, o, m, p, w = 1, v = 0;
            d = z.getDate(b, c, 1);
            var D = z.getYear(d)
                , Y = z.getMonth(d)
                , r = null === z.defaultValue && !g._hasValue ? null : g.getDate(!0)
                , u = z.getDate(D, Y, 1).getDay()
                , P = '<div class="dw-cal-table">'
                , E = '<div class="dw-week-nr-c">';
            1 < z.firstDay - u + 1 && (v = 7);
            for (p = 0; 42 > p; p++)
                m = p + z.firstDay - v,
                    d = z.getDate(D, Y, m - u + 1),
                    f = d.getFullYear(),
                    e = d.getMonth(),
                    h = d.getDate(),
                    i = z.getMonth(d),
                    l = z.getDay(d),
                    o = z.getMaxDayOfMonth(f, e),
                    j = f + "-" + e + "-" + h,
                    e = a.extend({
                        valid: d < new Date(gb.getFullYear(),gb.getMonth(),gb.getDate()) || d > wa ? !1 : Ja[d] === t || Db[d] !== t,
                        selected: r && r.getFullYear() === f && r.getMonth() === e && r.getDate() === h
                    }, g.getDayProps(d, r)),
                    k = e.valid,
                    q = e.selected,
                    f = e.cssClass,
                    J = d.getTime() === (new Date).setHours(0, 0, 0, 0),
                    n = i !== Y,
                    Ab[j] = e,
                0 === p % 7 && (P += (p ? "</div>" : "") + '<div class="dw-cal-row' + (z.highlight && r && 0 <= r - d && 6048E5 > r - d ? " dw-cal-week-hl" : "") + '">'),
                nb && 1 == d.getDay() && ("month" == nb && n && 1 < w ? w = 1 == h ? 1 : 2 : "year" == nb && (w = z.getWeekNumber(d)),
                    E += '<div class="dw-week-nr"><div class="dw-week-nr-i">' + w + "</div></div>",
                    w++),
                    P += '<div role="button" tabindex="-1" aria-label="' + (J ? z.todayText + ", " : "") + z.dayNames[d.getDay()] + ", " + z.monthNames[i] + " " + l + " " + (e.ariaLabel ? ", " + e.ariaLabel : "") + '"' + (n && !Wa ? ' aria-hidden="true"' : "") + (q ? ' aria-selected="true"' : "") + (k ? "" : ' aria-disabled="true"') + ' data-day="' + m % 7 + '" data-full="' + j + '"class="dw-cal-day ' + (z.dayClass || "") + (q ? " dw-sel" : "") + (J ? " " + z.todayClass : "") + (f ? " " + f : "") + (1 == l ? " dw-cal-day-first" : "") + (l == o ? " dw-cal-day-last" : "") + (n ? " dw-cal-day-diff" : "") + (k ? " dw-cal-day-v dwb-e dwb-nhl" : " dw-cal-day-inv") + '"><div class="dw-i ' + (q ? ra : "") + " " + (z.innerDayClass || "") + '"><div class="dw-cal-day-fg">' + l + "</div>" + (e.markup || "") + '<div class="dw-cal-day-frame"></div></div></div>';
            return P + ("</div></div>" + E + "</div>")
        }
        function A(b, c, d) {
            var f = z.getDate(b, c, 1)
                , e = z.getYear(f)
                , f = z.getMonth(f)
                , g = e + Ca;
            if ($a) {
                bb && bb.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(ra);
                rb && rb.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(ra);
                bb = a('.dw-cal-year-s[data-val="' + e + '"]', q).addClass("dw-sel").attr("aria-selected", "true");
                rb = a('.dw-cal-month-s[data-val="' + f + '"]', q).addClass("dw-sel").attr("aria-selected", "true");
                bb.find(".dw-i").addClass(ra);
                rb.find(".dw-i").addClass(ra);
                Ua && Ua.scroll(bb, d);
                a(".dw-cal-month-s", q).removeClass("dwb-d");
                if (e === pa)
                    for (l = 0; l < Ba; l++)
                        a('.dw-cal-month-s[data-val="' + l + '"]', q).addClass("dwb-d");
                if (e === ja)
                    for (l = oa + 1; 12 >= l; l++)
                        a('.dw-cal-month-s[data-val="' + l + '"]', q).addClass("dwb-d")
            }
            1 == E.length && E.attr("aria-label", e).html(g);
            for (l = 0; l < la; ++l)
                f = z.getDate(b, c - ma + l, 1),
                    e = z.getYear(f),
                    f = z.getMonth(f),
                    g = e + Ca,
                    a(ha[l]).attr("aria-label", z.monthNames[f] + (Da ? "" : " " + e)).html((!Da && ua < V ? g + " " : "") + w[f] + (!Da && ua > V ? " " + g : "")),
                1 < E.length && a(E[l]).html(g);
            z.getDate(b, c - ma - 1, 1) < Fa ? B(a(".dw-cal-prev-m", q)) : o(a(".dw-cal-prev-m", q));
            z.getDate(b, c + la - ma, 1) > Ka ? B(a(".dw-cal-next-m", q)) : o(a(".dw-cal-next-m", q));
            z.getDate(b, c, 1).getFullYear() <= Fa.getFullYear() ? B(a(".dw-cal-prev-y", q)) : o(a(".dw-cal-prev-y", q));
            z.getDate(b, c, 1).getFullYear() >= Ka.getFullYear() ? B(a(".dw-cal-next-y", q)) : o(a(".dw-cal-next-y", q))
        }
        function o(a) {
            a.removeClass(qb).find(".dw-cal-btn-txt").removeAttr("aria-disabled")
        }
        function B(a) {
            a.addClass(qb).find(".dw-cal-btn-txt").attr("aria-disabled", "true")
        }
        function C(b, c) {
            if (Y && ("calendar" === Va || c)) {
                var d, f, e = z.getDate(qa, ka, 1), h = Math.abs(12 * (z.getYear(b) - z.getYear(e)) + z.getMonth(b) - z.getMonth(e));
                g.needsSlide && h && (qa = z.getYear(b),
                    ka = z.getMonth(b),
                    b > e ? (f = h > na - ma + la - 1,
                        ka -= f ? 0 : h - na,
                        d = "next") : b < e && (f = h > na + ma,
                        ka += f ? 0 : h - na,
                        d = "prev"),
                    y(qa, ka, d, Math.min(h, na), f, !0));
                c || (g.trigger("onDayHighlight", [b]),
                z.highlight && (a(".dw-sel .dw-i", Z).removeClass(ra),
                    a(".dw-sel", Z).removeClass("dw-sel").removeAttr("aria-selected"),
                    a(".dw-cal-week-hl", Z).removeClass("dw-cal-week-hl"),
                (null !== z.defaultValue || g._hasValue) && a('.dw-cal-day[data-full="' + b.getFullYear() + "-" + b.getMonth() + "-" + b.getDate() + '"]', Z).addClass("dw-sel").attr("aria-selected", "true").find(".dw-i").addClass(ra).closest(".dw-cal-row").addClass("dw-cal-week-hl")));
                g.needsSlide = !0
            }
        }
        function k(a, b) {
            i(a, b);
            for (l = 0; l < Ea; l++)
                va[l].html(v(a, b - ma - na + l));
            u();
            g.needsRefresh = !1;
            g.trigger("onMonthLoaded", [a, b])
        }
        function f(b, c, d) {
            var f = na
                , e = na;
            if (d) {
                for (; e && z.getDate(b, c + f + la - ma - 1, 1) > Ka; )
                    e--;
                for (; f && z.getDate(b, c - e - ma, 1) < Fa; )
                    f--
            }
            a.extend(X.settings, {
                contSize: la * Q,
                snap: Q,
                minScroll: S - (Xa ? f : e) * Q,
                maxScroll: S + (Xa ? e : f) * Q
            });
            X.refresh()
        }
        function u() {
            nb && ga.html(a(".dw-week-nr-c", va[na]).html());
            a(".dw-cal-slide-a .dw-cal-day", J).attr("tabindex", 0)
        }
        function y(b, c, d, e, h, j, q) {
            b && eb.push({
                y: b,
                m: c,
                dir: d,
                slideNr: e,
                load: h,
                active: j,
                callback: q
            });
            if (!Ya) {
                var o = eb.shift()
                    , b = o.y
                    , c = o.m
                    , d = "next" === o.dir
                    , e = o.slideNr
                    , h = o.load
                    , j = o.active
                    , q = o.callback || Bb
                    , o = z.getDate(b, c, 1)
                    , b = z.getYear(o)
                    , c = z.getMonth(o);
                Ya = !0;
                g.changing = !0;
                g.trigger("onMonthChange", [b, c]);
                i(b, c);
                if (h)
                    for (l = 0; l < la; l++)
                        va[d ? Ea - la + l : l].html(v(b, c - ma + l));
                j && xa.addClass("dw-cal-slide-a");
                setTimeout(function() {
                    g.ariaMessage(z.monthNames[c] + " " + b);
                    A(b, c, 200);
                    S = d ? S - Q * e * fb : S + Q * e * fb;
                    X.scroll(S, fa ? 200 : 0, function() {
                        setTimeout(function() {
                            var i;
                            if (va.length) {
                                xa.removeClass("dw-cal-slide-a").attr("aria-hidden", "true");
                                if (d) {
                                    i = va.splice(0, e);
                                    for (l = 0; l < e; l++)
                                        va.push(i[l]),
                                            n(va[va.length - 1], +va[va.length - 2].data("curr") + 100 * fb)
                                } else {
                                    i = va.splice(Ea - e, e);
                                    for (l = e - 1; 0 <= l; l--)
                                        va.unshift(i[l]),
                                            n(va[0], +va[1].data("curr") - 100 * fb)
                                }
                                for (l = 0; l < e; l++)
                                    va[d ? Ea - e + l : l].html(v(b, c - ma - na + l + (d ? Ea - e : 0))),
                                    h && va[d ? l : Ea - e + l].html(v(b, c - ma - na + l + (d ? 0 : Ea - e)));
                                for (l = 0; l < la; l++)
                                    va[na + l].addClass("dw-cal-slide-a").removeAttr("aria-hidden");
                                f(b, c, !0);
                                Ya = !1
                            }
                            eb.length ? setTimeout(function() {
                                y()
                            }, 10) : (qa = b,
                                ka = c,
                                g.changing = !1,
                                a(".dw-cal-day", J).attr("tabindex", -1),
                                u(),
                                g.needsRefresh ? g.isVisible() && Y && k(qa, ka) : g.trigger("onMonthLoaded", [b, c]),
                                q())
                        }, fa ? 0 : 200)
                    })
                }, 10)
            }
        }
        function I() {
            var b = a(this)
                , c = g.live
                , d = g.getDate(!0)
                , f = b.attr("data-full")
                , e = f.split("-")
                , e = new Date(e[0],e[1],e[2])
                , d = new Date(e.getFullYear(),e.getMonth(),e.getDate(),d.getHours(),d.getMinutes(),d.getSeconds())
                , h = b.hasClass("dw-sel");
            if ((Wa || !b.hasClass("dw-cal-day-diff")) && !1 !== g.trigger("onDayChange", [a.extend(Ab[f], {
                    date: d,
                    cell: this,
                    selected: h
                })]))
                g.needsSlide = !1,
                    aa = !0,
                    g.setDate(d, c, 0.2, !c, !0),
                z.divergentDayChange && (Sa = !0,
                    e < z.getDate(qa, ka - ma, 1) ? G() : e > z.getDate(qa, ka - ma + la, 0) && K(),
                    Sa = !1)
        }
        function n(a, b) {
            a.data("curr", b);
            d ? a[0].style[r + "Transform"] = "translate3d(" + (Pa ? "0," + b + "%," : b + "%,0,") + "0)" : a[0].style[Pa ? "top" : "left"] = b + "%"
        }
        function K() {
            Sa && z.getDate(qa, ka + la - ma, 1) <= Ka && a.mobiscroll.running && y(qa, ++ka, "next", 1, !1, !0, K)
        }
        function G() {
            Sa && z.getDate(qa, ka - ma - 1, 1) >= Fa && a.mobiscroll.running && y(qa, --ka, "prev", 1, !1, !0, G)
        }
        function T(b) {
            Sa && z.getDate(qa, ka, 1) <= z.getDate(z.getYear(Ka) - 1, z.getMonth(Ka) - Ia, 1) && a.mobiscroll.running ? y(++qa, ka, "next", na, !0, !0, function() {
                T(b)
            }) : Sa && !b.hasClass("dwb-d") && a.mobiscroll.running && y(z.getYear(Ka), z.getMonth(Ka) - Ia, "next", na, !0, !0)
        }
        function F(b) {
            Sa && z.getDate(qa, ka, 1) >= z.getDate(z.getYear(Fa) + 1, z.getMonth(Fa) + ma, 1) && a.mobiscroll.running ? y(--qa, ka, "prev", na, !0, !0, function() {
                F(b)
            }) : Sa && !b.hasClass("dwb-d") && a.mobiscroll.running && y(z.getYear(Fa), z.getMonth(Fa) + ma, "prev", na, !0, !0)
        }
        function R(a, b) {
            a.hasClass("dw-cal-v") || (a.addClass("dw-cal-v" + (b ? "" : " dw-cal-p-in")).removeClass("dw-cal-p-out dw-cal-h"),
                g.trigger("onSelectShow", []))
        }
        function c(a, b) {
            a.hasClass("dw-cal-v") && a.removeClass("dw-cal-v dw-cal-p-in").addClass("dw-cal-h" + (b ? "" : " dw-cal-p-out"))
        }
        function H(a, b) {
            (b || a).hasClass("dw-cal-v") ? c(a) : R(a)
        }
        function x() {
            a(this).removeClass("dw-cal-p-out dw-cal-p-in")
        }
        var L, l, N, M, P, q, U, Z, J, Q, S, aa, Y, D, ea, ga, ia, fa, w, X, da, ha, V, E, ua, pa, ja, Ba, oa, Fa, Ka, gb, wa, ya, qa, ka, hb, ob, Db, Ja, Ra, Va, Ya, Sa, la, Ea, Ia, ma, Wa, Ua, bb, rb, Fb = this, xa = [], va = [], eb = [], ta = {}, Ab = {}, Bb = function() {}, Wb = a.extend({}, g.settings), z = a.extend(g.settings, b, Wb), Ta = "full" == z.weekDays ? "" : "min" == z.weekDays ? "Min" : "Short", nb = z.weekCounter, Ib = z.layout || (/top|bottom/.test(z.display) ? "liquid" : ""), Ga = "liquid" == Ib && "bubble" !== z.display, yb = "modal" == z.display, Xa = z.rtl, fb = Xa ? -1 : 1, Hb = Ga ? null : z.calendarWidth, Pa = "vertical" == z.swipeDirection, $a = z.quickNav, na = z.preMonths, Da = "yearMonth" == z.navigation, Aa = z.controls.join(","), ab = (!0 === z.tabs || !1 !== z.tabs && Ga) && 1 < z.controls.length, ba = !ab && z.tabs === t && !Ga && 1 < z.controls.length, Ca = z.yearSuffix || "", ra = z.activeClass || "", pb = "dw-sel " + (z.activeTabClass || ""), jb = z.activeTabInnerClass || "", qb = "dwb-d " + (z.disabledClass || ""), Oa = "", sa = "";
        Aa.match(/calendar/) ? Y = !0 : $a = !1;
        Aa.match(/date/) && (ta.date = 1);
        Aa.match(/time/) && (ta.time = 1);
        Y && ta.date && (ab = !0,
            ba = !1);
        z.layout = Ib;
        z.preset = (ta.date || Y ? "date" : "") + (ta.time ? "time" : "");
        if ("inline" == z.display)
            a(this).closest('[data-role="page"]').on("pageshow", function() {
                g.position()
            });
        g.changing = !1;
        g.needsRefresh = !1;
        g.needsSlide = !0;
        g.getDayProps = Bb;
        g.onGenMonth = Bb;
        g.prepareObj = m;
        g.refresh = function() {
            g.changing ? g.needsRefresh = true : g.isVisible() && Y && k(qa, ka)
        }
        ;
        g.navigate = function(a, b) {
            var c, d, e = g.isVisible();
            if (b && e)
                C(a, true);
            else {
                c = z.getYear(a);
                d = z.getMonth(a);
                if (e && (c != qa || d != ka)) {
                    g.trigger("onMonthChange", [c, d]);
                    A(c, d);
                    k(c, d)
                }
                qa = c;
                ka = d
            }
        }
        ;
        g.showMonthView = function() {
            if ($a && !fa) {
                c(sa, true);
                c(Oa, true);
                R(ia, true);
                fa = true
            }
        }
        ;
        g.changeTab = function(b) {
            if (g._isVisible && ta[b] && Va != b) {
                Va = b;
                a(".dw-cal-pnl", q).removeClass("dw-cal-p-in").addClass("dw-cal-pnl-h");
                a(".dw-cal-tab", q).removeClass(pb).removeAttr("aria-selected").find(".dw-i").removeClass(jb);
                a('.dw-cal-tab[data-control="' + b + '"]', q).addClass(pb).attr("aria-selected", "true").find(".dw-i").addClass(jb);
                ta[Va].removeClass("dw-cal-pnl-h").addClass("dw-cal-p-in");
                if (Va === "calendar") {
                    L = g.getDate(true);
                    (L.getFullYear() !== ya.getFullYear() || L.getMonth() !== ya.getMonth() || L.getDate() !== ya.getDate()) && C(L)
                } else {
                    ya = g.getDate(true);
                    g.setDate(ya, false, 0, true)
                }
                g.showMonthView();
                g.trigger("onTabChange", [Va])
            }
        }
        ;
        M = j.datetime.call(this, g);
        V = z.dateOrder.search(/m/i);
        ua = z.dateOrder.search(/y/i);
        a.extend(M, {
            ariaMessage: z.calendarText,
            onMarkupReady: function(b) {
                var f, i, j = "";
                q = b;
                U = z.display == "inline" ? a(this).is("div") ? a(this) : a(this).parent() : g.context;
                ya = g.getDate(true);
                if (!qa) {
                    qa = z.getYear(ya);
                    ka = z.getMonth(ya)
                }
                S = 0;
                ea = true;
                Ya = false;
                w = z.monthNames;
                Va = "calendar";
                if (z.minDate) {
                    Fa = new Date(z.minDate.getFullYear(),z.minDate.getMonth(),1);
                    gb = z.minDate
                } else
                    gb = Fa = new Date(z.startYear,0,1);
                if (z.maxDate) {
                    Ka = new Date(z.maxDate.getFullYear(),z.maxDate.getMonth(),1);
                    wa = z.maxDate
                } else
                    wa = Ka = new Date(z.endYear,11,31,23,59,59);
                b.addClass("dw-calendar" + (d ? "" : " dw-cal-no3d"));
                P = a(".dw", b);
                Ra = a(".dwcc", b);
                ta.date ? ta.date = a(".dwc", q).eq(0) : Y && a(".dwc", q).eq(0).addClass("dwc-hh");
                if (ta.time)
                    ta.time = a(".dwc", q).eq(1);
                if (Y) {
                    la = z.months == "auto" ? Math.max(1, Math.min(3, Math.floor((Hb || U[0].innerWidth || U.innerWidth()) / 280))) : z.months;
                    Ea = la + 2 * na;
                    Ia = Math.floor(la / 2);
                    ma = Math.round(la / 2) - 1;
                    Wa = z.showDivergentDays === t ? la < 2 : z.showDivergentDays;
                    Pa = Pa && la < 2;
                    i = '<div class="dw-cal-btnw"><div class="' + (Xa ? "dw-cal-next-m" : "dw-cal-prev-m") + ' dw-cal-prev dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (z.btnCalPrevClass || "") + '" aria-label="' + z.prevMonthText + '"></div></div>';
                    for (l = 0; l < la; ++l)
                        i = i + ('<div class="dw-cal-btnw-m" style="width: ' + 100 / la + '%"><span role="button" class="dw-cal-month"></span></div>');
                    i = i + ('<div class="' + (Xa ? "dw-cal-prev-m" : "dw-cal-next-m") + ' dw-cal-next dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (z.btnCalNextClass || "") + '" aria-label="' + z.nextMonthText + '"></div></div></div>');
                    Da && (j = '<div class="dw-cal-btnw"><div class="' + (Xa ? "dw-cal-next-y" : "dw-cal-prev-y") + ' dw-cal-prev dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (z.btnCalPrevClass || "") + '" aria-label="' + z.prevYearText + '"></div></div><span role="button" class="dw-cal-year"></span><div class="' + (Xa ? "dw-cal-prev-y" : "dw-cal-next-y") + ' dw-cal-next dw-cal-btn dwb dwb-e"><div role="button" tabindex="0" class="dw-cal-btn-txt ' + (z.btnCalNextClass || "") + '" aria-label="' + z.nextYearText + '"></div></div></div>');
                    if ($a) {
                        pa = z.getYear(Fa);
                        ja = z.getYear(Ka);
                        Ba = z.getMonth(Fa);
                        oa = z.getMonth(Ka);
                        ob = Math.ceil((ja - pa + 1) / 12) + 2;
                        Oa = O("month", 36, 24, 0, "", z.monthNames, z.monthNamesShort);
                        sa = O("year", ob * 12, ja - pa + 13, pa, Ca)
                    }
                    D = '<div class="mbsc-w-p dw-cal-c"><div class="dw-cal ' + (la > 1 ? " dw-cal-multi " : "") + (nb ? " dw-weeks " : "") + (Pa ? " mbsc-cal-vertical" : "") + (Wa ? "" : " dw-hide-diff ") + (z.highlightNow ? " dw-hl-now " : "") + (z.calendarClass || "") + '"><div class="dw-cal-header"><div class="dw-cal-btnc ' + (Da ? "dw-cal-btnc-ym" : "dw-cal-btnc-m") + '">' + (ua < V || la > 1 ? j + i : i + j) + '</div></div><div class="dw-cal-body"><div class="dw-cal-m-c dw-cal-v"><div class="dw-cal-days-c">';
                    for (N = 0; N < la; ++N) {
                        D = D + ('<div aria-hidden="true" class="dw-cal-days" style="width: ' + 100 / la + '%"><table cellpadding="0" cellspacing="0"><tr>');
                        for (l = 0; l < 7; l++)
                            D = D + ("<th>" + z["dayNames" + Ta][(l + z.firstDay) % 7] + "</th>");
                        D = D + "</tr></table></div>"
                    }
                    D = D + ('</div><div class="dw-cal-anim-c ' + (z.calendarClass || "") + '"><div class="dw-week-nrs-c ' + (z.weekNrClass || "") + '"><div class="dw-week-nrs"></div></div><div class="dw-cal-anim">');
                    for (l = 0; l < la + 2 * na; l++)
                        D = D + '<div class="dw-cal-slide" aria-hidden="true"></div>';
                    D = D + ("</div></div></div>" + Oa + sa + "</div></div></div>");
                    ta.calendar = a(D)
                }
                a.each(z.controls, function(b, c) {
                    ta[c] = a('<div class="dw-cal-pnl" id="' + (Fb.id + "_dw_pnl_" + b) + '"></div>').append(a('<div class="dw-cal-pnl-i"></div>').append(ta[c])).appendTo(Ra)
                });
                f = '<div class="dw-cal-tabs"><ul role="tablist">';
                a.each(z.controls, function(a, b) {
                    ta[b] && (f = f + ('<li role="tab" aria-controls="' + (Fb.id + "_dw_pnl_" + a) + '" class="dw-cal-tab ' + (a ? "" : pb) + '" data-control="' + b + '"><a href="#" class="dwb-e dwb-nhl dw-i ' + (!a ? jb : "") + '">' + z[b + "Text"] + "</a></li>"))
                });
                f = f + "</ul></div>";
                Ra.before(f);
                Z = a(".dw-cal-anim-c", q);
                J = a(".dw-cal-anim", Z);
                ga = a(".dw-week-nrs", Z);
                if (Y) {
                    fa = true;
                    xa = a(".dw-cal-slide", J).each(function(b, c) {
                        va.push(a(c))
                    });
                    xa.slice(na, na + la).addClass("dw-cal-slide-a").removeAttr("aria-hidden");
                    for (l = 0; l < Ea; l++)
                        n(va[l], 100 * (l - na) * fb);
                    k(qa, ka);
                    X = new h.classes.ScrollView(Z[0],{
                        axis: Pa ? "Y" : "X",
                        easing: "",
                        contSize: 0,
                        snap: 1,
                        maxSnapScroll: na,
                        moveElement: J,
                        mousewheel: z.mousewheel,
                        swipe: z.swipe,
                        liveSwipe: z.liveSwipe,
                        time: 200,
                        lock: true,
                        onScrollStart: function(a, b) {
                            b.settings.scrollLock = g.scrollLock
                        },
                        onScrollEnd: function(a) {
                            (a = Math.round((a - S) / Q) * fb) && y(qa, ka - a, a > 0 ? "prev" : "next", a > 0 ? a : -a)
                        }
                    })
                }
                ha = a(".dw-cal-month", q);
                E = a(".dw-cal-year", q);
                ia = a(".dw-cal-m-c", q);
                if ($a) {
                    ia.on("webkitAnimationEnd animationend", x);
                    Oa = a(".dw-cal-month-c", q).on("webkitAnimationEnd animationend", x);
                    sa = a(".dw-cal-year-c", q).on("webkitAnimationEnd animationend", x);
                    a(".dw-cal-sc-p", q);
                    hb = {
                        axis: Pa ? "Y" : "X",
                        contSize: 0,
                        snap: 1,
                        maxSnapScroll: 1,
                        rtl: z.rtl,
                        mousewheel: z.mousewheel,
                        swipe: z.swipe,
                        liveSwipe: z.liveSwipe,
                        time: 200
                    };
                    Ua = new h.classes.ScrollView(sa[0],hb);
                    da = new h.classes.ScrollView(Oa[0],hb)
                }
                Ga ? b.addClass("dw-cal-liq") : a(".dw-cal", q).width(Hb || 280 * la);
                z.calendarHeight && a(".dw-cal-anim-c", q).height(z.calendarHeight);
                g.tap(Z, function(b) {
                    b = a(b.target);
                    if (!Ya && !X.scrolled) {
                        b = b.closest(".dw-cal-day", this);
                        b.hasClass("dw-cal-day-v") && I.call(b[0])
                    }
                });
                a(".dw-cal-btn", q).on("touchstart mousedown keydown", function(b) {
                    var c = a(this);
                    if (b.type !== "keydown") {
                        b.preventDefault();
                        b = p(b, this)
                    } else
                        b = b.keyCode === 32;
                    if (!Sa && b && !c.hasClass("dwb-d")) {
                        Sa = true;
                        c.hasClass("dw-cal-prev-m") ? G() : c.hasClass("dw-cal-next-m") ? K() : c.hasClass("dw-cal-prev-y") ? F(c) : c.hasClass("dw-cal-next-y") && T(c);
                        a(s).on("mouseup.dwbtn", function() {
                            a(s).off(".dwbtn");
                            Sa = false
                        })
                    }
                }).on("touchend touchcancel keyup", function() {
                    Sa = false
                });
                a(".dw-cal-tab", q).on("touchstart click", function(b) {
                    p(b, this) && a.mobiscroll.running && g.changeTab(a(this).attr("data-control"))
                });
                if ($a) {
                    g.tap(a(".dw-cal-month", q), function() {
                        if (!sa.hasClass("dw-cal-v")) {
                            H(ia);
                            fa = ia.hasClass("dw-cal-v")
                        }
                        H(Oa);
                        c(sa)
                    });
                    g.tap(a(".dw-cal-year", q), function() {
                        sa.hasClass("dw-cal-v") || Ua.scroll(bb);
                        if (!Oa.hasClass("dw-cal-v")) {
                            H(ia);
                            fa = ia.hasClass("dw-cal-v")
                        }
                        H(sa);
                        c(Oa)
                    });
                    g.tap(a(".dw-cal-month-s", q), function() {
                        !da.scrolled && !a(this).hasClass("dwb-d") && g.navigate(z.getDate(qa, a(this).attr("data-val"), 1))
                    });
                    g.tap(a(".dw-cal-year-s", q), function() {
                        if (!Ua.scrolled) {
                            L = z.getDate(a(this).attr("data-val"), ka, 1);
                            g.navigate(new Date(e.constrain(L, Fa, Ka)))
                        }
                    });
                    g.tap(sa, function() {
                        if (!Ua.scrolled) {
                            c(sa);
                            R(ia);
                            fa = true
                        }
                    });
                    g.tap(Oa, function() {
                        if (!da.scrolled) {
                            c(Oa);
                            R(ia);
                            fa = true
                        }
                    })
                }
            },
            onShow: function() {
                Y && A(qa, ka)
            },
            onPosition: function(b, c, d) {
                var e, h, i, j = 0, k = 0, o = 0;
                if (Ga) {
                    yb && Z.height("");
                    Ra.height("");
                    J.width("")
                }
                Q && (i = Q);
                if (Q = Math.round(Math.round(parseInt(Z.css(Pa ? "height" : "width"))) / la)) {
                    q.removeClass("mbsc-cal-m mbsc-cal-l");
                    Q > 1024 ? q.addClass("mbsc-cal-l") : Q > 640 && q.addClass("mbsc-cal-m")
                }
                if (ab && (ea || Ga) || ba) {
                    a(".dw-cal-pnl", q).removeClass("dw-cal-pnl-h");
                    a.each(ta, function(a, b) {
                        e = b.outerWidth();
                        j = Math.max(j, e);
                        k = Math.max(k, b.outerHeight());
                        o = o + e
                    });
                    if (ab || ba && o > (U[0].innerWidth || U.innerWidth())) {
                        h = true;
                        Va = a(".dw-cal-tabs .dw-sel", q).attr("data-control");
                        P.addClass("dw-cal-tabbed")
                    } else {
                        Va = "calendar";
                        k = j = "";
                        P.removeClass("dw-cal-tabbed");
                        Ra.css({
                            width: "",
                            height: ""
                        })
                    }
                }
                if (Ga && yb) {
                    g._isFullScreen = true;
                    h && Y && Ra.height(ta.calendar.outerHeight());
                    b = P.outerHeight();
                    d >= b && Z.height(d - b + Z.outerHeight());
                    Y && (k = Math.max(k, ta.calendar.outerHeight()))
                }
                if (h) {
                    Ra.css({
                        width: Ga ? "" : j,
                        height: k
                    });
                    Q = Math.round(Math.round(parseInt(Z.css(Pa ? "height" : "width"))) / la)
                }
                if (Q) {
                    J[Pa ? "height" : "width"](Q);
                    if (Q !== i) {
                        if (Da) {
                            w = z.maxMonthWidth > a(".dw-cal-btnw-m", q).width() ? z.monthNamesShort : z.monthNames;
                            for (l = 0; l < la; ++l)
                                a(ha[l]).text(w[z.getMonth(z.getDate(qa, ka - ma + l, 1))])
                        }
                        if ($a) {
                            d = sa[Pa ? "height" : "width"]();
                            a.extend(Ua.settings, {
                                contSize: d,
                                snap: d,
                                minScroll: (2 - ob) * d,
                                maxScroll: -d
                            });
                            a.extend(da.settings, {
                                contSize: d,
                                snap: d,
                                minScroll: -d,
                                maxScroll: -d
                            });
                            Ua.refresh();
                            da.refresh();
                            sa.hasClass("dw-cal-v") && Ua.scroll(bb)
                        }
                        if (Ga && !ea && i) {
                            d = S / i;
                            S = d * Q
                        }
                        f(qa, ka, !i)
                    }
                } else
                    Q = i;
                if (h) {
                    a(".dw-cal-pnl", q).addClass("dw-cal-pnl-h");
                    ta[Va].removeClass("dw-cal-pnl-h")
                }
                g.trigger("onCalResize", []);
                ea = false
            },
            onHide: function() {
                eb = [];
                va = [];
                ka = qa = Va = null;
                Ya = true;
                Q = 0;
                X && X.destroy();
                if ($a && Ua && da) {
                    Ua.destroy();
                    da.destroy()
                }
            },
            onValidated: function(a) {
                var b, c, d;
                c = g.getDate(true);
                if (aa)
                    b = "calendar";
                else
                    for (d in g.order)
                        d && g.order[d] === a && (b = /[mdy]/.test(d) ? "date" : "time");
                g.trigger("onSetDate", [{
                    date: c,
                    control: b
                }]);
                C(c);
                aa = false
            }
        });
        return M
    }
})($, window, document);
(function(a, m) {
    var s = a.mobiscroll
        , t = s.presets.scroller
        , h = s.datetime
        , j = s.util.testTouch
        , e = {
        autoCorrect: !0,
        showSelector: !0,
        minRange: 1,
        fromText: "Start",
        toText: "End"
    };
    s.presetShort("rangepicker");
    s.presetShort("range");
    t.range = t.rangepicker = function(d) {
        function r(a, b) {
            a && (a.setFullYear(b.getFullYear()),
                a.setMonth(b.getMonth()),
                a.setDate(b.getDate()))
        }
        function p(b, d) {
            var e = !0;
            if (b && f && u && (u - f > c.maxRange - 1 && (e = !1,
                    F ? f = new Date(u - c.maxRange + 1) : u = new Date(+f + c.maxRange - 1)),
                u - f < c.minRange - 1))
                e = !1,
                    F ? f = new Date(u - c.minRange + 1) : u = new Date(+f + c.minRange - 1);
            if (!f || !u)
                e = !1;
            if (d) {
                var g, l, j, o, n, m = 0, p = x || !F ? " dw-cal-day-hl dw-cal-sel-start" : " dw-cal-sel-start", r = x || F ? " dw-cal-day-hl dw-cal-sel-end" : " dw-cal-sel-end";
                C = f ? h.formatDate(v, f, c) : "";
                k = u ? h.formatDate(v, u, c) : "";
                if (i && (a(".dw-drv0", i).html(C || "&nbsp;"),
                        a(".dw-drv1", i).html(k || "&nbsp;"),
                        g = f ? new Date(f) : null,
                        j = u ? new Date(u) : null,
                    !g && j && (g = new Date(j)),
                    !j && g && (j = new Date(g)),
                        n = F ? j : g,
                        a(".dw-cal-table .dw-sel .dw-i", i).removeClass(L),
                        a(".dw-cal-table .dw-cal-day-hl", i).removeClass(N),
                        a(".dw-cal-table .dw-sel", i).removeClass("dw-sel dw-cal-sel-start dw-cal-sel-end").removeAttr("aria-selected"),
                    g && j)) {
                    l = g.setHours(0, 0, 0, 0);
                    for (o = j.setHours(0, 0, 0, 0); j >= g && 84 > m; )
                        a('.dw-cal-day[data-full="' + n.getFullYear() + "-" + n.getMonth() + "-" + n.getDate() + '"]', i).addClass("dw-sel" + (n.getTime() === l ? p : "") + (n.getTime() === o ? r : "")).attr("aria-selected", "true").find(".dw-i ").addClass(L),
                            n.setDate(n.getDate() + (F ? -1 : 1)),
                            m++
                }
            }
            return e
        }
        function b(a) {
            a.addClass("dw-sel").attr("aria-checked", "true").find(".dw-dr").addClass(L)
        }
        function g() {
            K && (a(".dw-dr-c", i).removeClass("dw-sel").removeAttr("aria-checked").find(".dw-dr", i).removeClass(L),
                x ? (f && b(a(".dw-dr-c", i).eq(0)),
                u && b(a(".dw-dr-c", i).eq(1))) : b(a(".dw-dr-c", i).eq(F)))
        }
        var s, i, O, v, A, o, B, C, k, f, u, y, I, n, K, G = d._startDate, T = d._endDate, F = 0;
        A = new Date;
        var R = a.extend({}, d.settings)
            , c = a.extend(d.settings, e, R)
            , H = c.anchor
            , x = c.rangeTap
            , L = c.activeClass || ""
            , l = "dwb-d " + (c.disabledClass || "")
            , N = "dw-cal-day-hl"
            , M = null === c.defaultValue ? [] : c.defaultValue || [new Date(A.setHours(0, 0, 0, 0)), new Date(A.getFullYear(),A.getMonth(),A.getDate() + 6,23,59,59,999)];
        x && (c.tabs = !0);
        A = t.calbase.call(this, d);
        s = a.extend({}, A);
        v = d.format;
        y = "time" === c.controls.join("");
        K = 1 == c.controls.length && "calendar" == c.controls[0] ? c.showSelector : !0;
        c.startInput && (I = a(c.startInput).prop("readonly"),
            d.attachShow(a(c.startInput).prop("readonly", !0), function() {
                F = 0;
                c.anchor = H || a(c.startInput)
            }));
        c.endInput && (n = a(c.endInput).prop("readonly"),
            d.attachShow(a(c.endInput).prop("readonly", !0), function() {
                F = 1;
                c.anchor = H || a(c.endInput)
            }));
        d.setVal = function(a, b, e, g, i) {
            var j = a || [];
            if (j[0] === m || j[0] === null || j[0].getTime) {
                B = true;
                C = (f = j[0] || null) ? h.formatDate(v, f, c) : "";
                F || (a = s.parseValue(C, d))
            }
            if (j[1] === m || j[1] === null || j[1].getTime) {
                B = true;
                k = (u = j[1] || null) ? h.formatDate(v, u, c) : "";
                F && (a = s.parseValue(k, d))
            }
            if (!g) {
                d._startDate = G = f;
                d._endDate = T = u
            }
            d._setVal(a, b, e, g, i)
        }
        ;
        d.getVal = function(a) {
            return a ? [f, u] : d._hasValue ? [G, T] : null
        }
        ;
        d.getDayProps = function(a) {
            var b = f ? new Date(f.getFullYear(),f.getMonth(),f.getDate()) : null
                , c = u ? new Date(u.getFullYear(),u.getMonth(),u.getDate()) : null;
            return {
                selected: b && c && a >= b && a <= u,
                cssClass: ((x || !F) && b && b.getTime() === a.getTime() || (x || F) && c && c.getTime() === a.getTime() ? N : "") + (b && b.getTime() === a.getTime() ? " dw-cal-sel-start" : "") + (c && c.getTime() === a.getTime() ? " dw-cal-sel-end" : "")
            }
        }
        ;
        d.setActiveDate = function(b) {
            b = (F = b == "start" ? 0 : 1) ? u : f;
            if (d.isVisible()) {
                if (!x) {
                    g();
                    a(".dw-cal-table .dw-cal-day-hl", i).removeClass(N);
                    b && a('.dw-cal-day[data-full="' + b.getFullYear() + "-" + b.getMonth() + "-" + b.getDate() + '"]', i).addClass(N)
                }
                if (b) {
                    o = true;
                    d.setDate(b, false, 0.2, true)
                }
            }
        }
        ;
        d.setValue = function(a, b, c, e, f) {
            d.setVal(a, b, f, e, c)
        }
        ;
        d.getValue = d.getVal;
        a.extend(A, {
            highlight: !1,
            divergentDayChange: !1,
            formatValue: function() {
                return C + (c.endInput ? "" : k ? " - " + k : "")
            },
            parseValue: function(b) {
                b = b ? b.split(" - ") : [];
                c.defaultValue = M[1];
                T = c.endInput ? a(c.endInput).val() ? h.parseDate(v, a(c.endInput).val(), c) : M[1] : b[1] ? h.parseDate(v, b[1], c) : M[1];
                c.defaultValue = M[0];
                G = c.startInput ? a(c.startInput).val() ? h.parseDate(v, a(c.startInput).val(), c) : M[0] : b[0] ? h.parseDate(v, b[0], c) : M[0];
                c.defaultValue = M[F];
                C = G ? h.formatDate(v, G, c) : "";
                k = T ? h.formatDate(v, T, c) : "";
                d._startDate = G;
                d._endDate = T;
                return s.parseValue(F ? k : C, d)
            },
            onValueFill: function(b, e) {
                d._startDate = G = f;
                d._endDate = T = u;
                if (c.startInput) {
                    a(c.startInput).val(C);
                    e && a(c.startInput).change()
                }
                if (c.endInput) {
                    a(c.endInput).val(k);
                    e && a(c.endInput).change()
                }
            },
            onBeforeClose: function(a, b) {
                if (b === "set" && !p(true, true)) {
                    d.setActiveDate(F ? "start" : "end");
                    return false
                }
            },
            onHide: function() {
                s.onHide.call(d);
                F = 0;
                i = null;
                c.anchor = H
            },
            onClear: function() {
                x && (F = 0)
            },
            onBeforeShow: function() {
                c.headerText = false;
                f = G;
                u = T;
                if (c.counter)
                    c.headerText = function() {
                        var a = f && u ? Math.max(1, Math.round(((new Date(u)).setHours(0, 0, 0, 0) - (new Date(f)).setHours(0, 0, 0, 0)) / 864E5) + 1) : 0;
                        return (a > 1 ? c.selectedPluralText || c.selectedText : c.selectedText).replace(/{count}/, a)
                    }
                    ;
                B = true
            },
            onMarkupReady: function(b) {
                var e;
                i = b;
                if (f) {
                    o = true;
                    d.setDate(f, false, 0, true);
                    f = d.getDate(true)
                }
                if (u) {
                    o = true;
                    d.setDate(u, false, 0, true);
                    u = d.getDate(true)
                }
                if (F && u || !F && f) {
                    o = true;
                    d.setDate(F ? u : f, false, 0, true)
                }
                s.onMarkupReady.call(this, b);
                b.addClass("dw-range");
                if (K) {
                    e = '<div class="dw-dr-t" role="radiogroup"><div class="dw-dr-c dw-dr0"><div role="radio" class="dwb-e dwb-nhl dw-i dw-dr">' + c.fromText + '<div class="dw-drv dw-drv0">' + (C || "&nbsp;") + '</div></div></div><div class="dw-dr-c dw-dr1"><div role="radio" class="dwb-e dwb-nhl dw-i dw-dr">' + c.toText + '<div class="dw-drv dw-drv1">' + (k || "&nbsp;") + "</div></div></div></div>";
                    a(".dw-cal-tabs", b).before(e);
                    g()
                }
                a(".dw-dr-c", b).on("touchstart click", function(b) {
                    if (j(b, this)) {
                        d.showMonthView();
                        d.setActiveDate(a(this).index() ? "end" : "start")
                    }
                })
            },
            onDayChange: function(a) {
                a.active = F ? "end" : "start";
                O = true
            },
            onSetDate: function(b) {
                var e = b.date
                    , h = d.order;
                if (!o) {
                    h.h === m && e.setHours(F ? 23 : 0);
                    h.i === m && e.setMinutes(F ? 59 : 0);
                    h.s === m && e.setSeconds(F ? 59 : 0);
                    e.setMilliseconds(F ? 999 : 0);
                    if (!B || O) {
                        if (x && O) {
                            F == 1 && e < f && (F = 0);
                            F ? e.setHours(23, 59, 59, 999) : e.setHours(0, 0, 0, 0)
                        }
                        F ? u = new Date(e) : f = new Date(e);
                        if (y) {
                            r(f, e);
                            r(u, e)
                        }
                        x && O && !F && (u = null)
                    }
                }
                d._isValid = p(B || O || c.autoCorrect, !o);
                b.active = F ? "end" : "start";
                if (!o && x) {
                    O && (F = F ? 0 : 1);
                    g()
                }
                d.isVisible() && (d._isValid ? a(".dwb-s .dwb", d._markup).removeClass(l) : a(".dwb-s .dwb", d._markup).addClass(l));
                o = B = O = false
            },
            onTabChange: function() {
                p(true, true)
            },
            onDestroy: function() {
                a(c.startInput).prop("readonly", I);
                a(c.endInput).prop("readonly", n)
            }
        });
        return A
    }
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = {
        controls: ["start", "reset"],
        autostart: !1,
        step: 1,
        useShortLabels: !1,
        labels: "Years,Months,Days,Hours,Minutes,Seconds,".split(","),
        labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs,".split(","),
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Lap",
        hideText: "Hide"
    };
    s.presetShort("timer");
    s.presets.scroller.timer = function(h) {
        function j(a) {
            return new Date(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())
        }
        function e(b) {
            var c = {};
            if (Y && L[J].index > L.days.index) {
                var d, e, f, g;
                d = new Date;
                var h = B ? d : aa;
                d = B ? aa : d;
                d = j(d);
                h = j(h);
                c.years = h.getFullYear() - d.getFullYear();
                c.months = h.getMonth() - d.getMonth();
                c.days = h.getDate() - d.getDate();
                c.hours = h.getHours() - d.getHours();
                c.minutes = h.getMinutes() - d.getMinutes();
                c.seconds = h.getSeconds() - d.getSeconds();
                c.fract = (h.getMilliseconds() - d.getMilliseconds()) / 10;
                for (d = x.length; 0 < d; d--)
                    e = x[d - 1],
                        f = L[e],
                        g = x[a.inArray(e, x) - 1],
                    L[g] && 0 > c[e] && (c[g]--,
                        c[e] += "months" == g ? 32 - (new Date(h.getFullYear(),h.getMonth(),32)).getDate() : f.until + 1);
                "months" == J && (c.months += 12 * c.years,
                    delete c.years)
            } else
                a(x).each(function(a, d) {
                    L[d].index <= L[J].index && (c[d] = Math.floor(b / L[d].limit),
                        b -= c[d] * L[d].limit)
                });
            return c
        }
        function d(c, d) {
            var e = 1
                , g = L[c]
                , h = g.wheel
                , i = g.prefix
                , j = L[x[a.inArray(c, x) - 1]];
            K = 0;
            G = g.until;
            c == J && (K = Math.max(0, d[c] - 50),
                G = K + 100,
                k = K + 5,
                f = G - 5);
            if (g.index <= L[J].index && (!j || j.limit > Z)) {
                l[c] || ea[0].push(h);
                l[c] = 1;
                h.keys = [];
                h.values = [];
                h.label = g.label || "";
                Z >= g.limit && (e = Math.max(Math.round(Z / g.limit), 1),
                    s = e * g.limit);
                for (b = K; b <= G; b += e)
                    h.keys.push(b),
                        h.values.push((i || "") + (10 > b ? "0" : "") + b + '<span class="dwtlbl">' + (g.label || "") + "</span>")
            }
        }
        function r(b) {
            var c = [], d, f = e(b);
            a(x).each(function(a, b) {
                l[b] && (d = Math.max(Math.round(Z / L[b].limit), 1),
                    c.push(Math.round(f[b] / d) * d))
            });
            return c
        }
        function p(a) {
            Y ? (A = aa - new Date,
                0 > A ? (A *= -1,
                    B = !0) : B = !1,
                o = 0,
                U = !0) : (aa !== m ? (U = !1,
                A = 1E3 * aa,
                B = "down" !== c.countDirection) : (A = 0,
                U = B = "down" !== c.countDirection),
            a && (o = 0))
        }
        var b, g, s, i, O, v, A, o, B, C, k, f, u, y, I, n, K, G, T, F, R = a.extend({}, h.settings), c = a.extend(h.settings, t, R), H = c.useShortLabels ? c.labelsShort : c.labels, x = "years,months,days,hours,minutes,seconds,fract".split(","), L = {
            years: {
                index: 6,
                until: 10,
                limit: 31536E6,
                label: H[0],
                wheel: {}
            },
            months: {
                index: 5,
                until: 11,
                limit: 2592E6,
                label: H[1],
                wheel: {}
            },
            days: {
                index: 4,
                until: 31,
                limit: 864E5,
                label: H[2],
                wheel: {}
            },
            hours: {
                index: 3,
                until: 23,
                limit: 36E5,
                label: H[3],
                wheel: {}
            },
            minutes: {
                index: 2,
                until: 59,
                limit: 6E4,
                label: H[4],
                wheel: {}
            },
            seconds: {
                index: 1,
                until: 59,
                limit: 1E3,
                label: H[5],
                wheel: {}
            },
            fract: {
                index: 0,
                until: 99,
                limit: 10,
                label: H[6],
                prefix: ".",
                wheel: {}
            }
        }, l = {}, N = [], M = 0, P = !1, q = !0, U = !1, Z = Math.max(10, 1E3 * c.step), J = c.maxWheel, Q = c.locked || Y, S = (a.isArray(c.controls) ? c.controls : []).join(","), aa = c.targetTime, Y = aa && aa.getTime !== m, D = "jqm" == c.theme, ea = [[]];
        h.start = function() {
            q && h.reset();
            if (!P && (p(),
                U || !(o >= A)))
                P = !0,
                    q = !1,
                    O = new Date,
                    i = o,
                    c.readonly = !0,
                    h.setValue(r(B ? o : A - o), !0, 0.1),
                    g = setInterval(function() {
                        o = new Date - O + i;
                        h.setValue(r(B ? o : A - o), !0, 0.1);
                        !U && o + s >= A && (clearInterval(g),
                            setTimeout(function() {
                                h.stop();
                                o = A;
                                h.setValue(r(B ? o : 0), !0, 0.1);
                                h.trigger("onFinish", [A]);
                                q = !0
                            }, A - o))
                    }, s),
                    a(".dwwr", C).addClass("dw-running dw-locked"),
                    a(".dw-timer-st", C).removeClass(c.btnStartClass || "").addClass(c.btnStopClass || "").attr("title", c.stopText).find(".dwb-txt").text(c.stopText),
                    h.trigger("onStart", [])
        }
        ;
        h.stop = function() {
            P && (P = !1,
                clearInterval(g),
                o = new Date - O + i,
                a(".dwwr", C).removeClass("dw-running"),
                a(".dw-timer-st", C).removeClass(c.btnStopClass || "").addClass(c.btnStartClass || "").attr("title", c.startText).find(".dwb-txt").text(c.startText),
                h.trigger("onStop", [o]))
        }
        ;
        h.reset = function() {
            h.stop();
            o = 0;
            N = [];
            M = 0;
            h.setValue(r(B ? 0 : A), !0, 0.1);
            h.settings.readonly = Q;
            q = !0;
            Q || a(".dwwr", C).removeClass("dw-locked");
            h.trigger("onReset", [])
        }
        ;
        h.lap = function() {
            P && (v = new Date - O + i,
                u = v - M,
                M = v,
                N.push(v),
                h.trigger("lap", [v, u, N]))
        }
        ;
        h.getTime = function() {
            return A
        }
        ;
        h.setTime = function(a) {
            aa = a / 1E3;
            A = a
        }
        ;
        h.getElapsedTime = h.getEllapsedTime = function() {
            return P ? new Date - O + i : 0
        }
        ;
        h.setElapsedTime = h.setEllapsedTime = function(a, b) {
            q || (i = o = a,
                O = new Date,
                h.setValue(r(B ? o : A - o), !0, 0.1, !1, b))
        }
        ;
        p(!0);
        !J && !A && (J = "minutes");
        J || a(x).each(function(a, b) {
            if (!J && A >= L[b].limit)
                return J = b,
                    !1
        });
        n = e(A);
        a(x).each(function(a, b) {
            d(b, n)
        });
        s = Math.max(87, s);
        c.autostart && setTimeout(function() {
            h.start()
        }, 0);
        return {
            wheels: ea,
            headerText: !1,
            readonly: Q,
            parseValue: function() {
                return r(B ? 0 : A)
            },
            formatValue: function(b) {
                var c = ""
                    , d = 0;
                a(x).each(function(a, e) {
                    "fract" != e && l[e] && (c += b[d] + ("seconds" == e && l.fract ? "." + b[d + 1] : "") + " " + H[a] + " ",
                        d++)
                });
                return c
            },
            validate: function(b, c, g) {
                var i, j, n = 0, r = h._tempWheelArray, b = !1;
                q && c !== m && (aa = 0,
                    a(x).each(function(a, b) {
                        l[b] && (aa += L[b].limit * r[n],
                            n++)
                    }),
                    aa /= 1E3,
                    p(!0));
                if (q && 0 === c)
                    b = !0,
                        i = e(A);
                else if (!y && (r[0] < k || r[0] > f))
                    i = e(B ? o : A - o),
                        b = !0;
                if (b && (d(J, i),
                    T !== K || F !== G))
                    j = r[0],
                        I = setTimeout(function() {
                            T = K;
                            F = G;
                            y = true;
                            r[0] = j;
                            h.changeWheel([0], m, c !== m)
                        }, 1E3 * g);
                y = !1
            },
            onBeforeShow: function() {
                c.mode = "scroller";
                c.showLabel = !0
            },
            onMarkupReady: function(b) {
                var d = 0;
                C = b;
                b.addClass("dw-timer");
                P ? a(".dwwr", b).addClass("dw-running") : a(".dwwr", b).removeClass("dw-running");
                Q && a(".dwwr", C).addClass("dw-locked");
                a(".dwbc", b).remove();
                a(".dwwl0", b).on("mousedown touchstart", function() {
                    clearTimeout(I)
                });
                a(x).each(function(c, e) {
                    l[e] && (a(".dwwl" + d, b).addClass("dwwl-" + e),
                        d++)
                });
                var e = S.match(/start/)
                    , f = S.match(/reset/) && !Y
                    , g = S.match(/lap/) && !Y
                    , i = "inline" !== c.display;
                if (e || f || g || i)
                    a(".dwwr", b).addClass("dw-timer-btns").append('<div class="dwbc">' + (e ? '<span class="dwbw dwbgr dwbgrf' + (!f && !g ? " dwbgrl" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-st ' + (P ? c.btnStopClass || "" : c.btnStartClass || "") + '"' + (D ? ' data-role="button" data-icon="arrow-r" data-iconpos="notext"' : "") + ' title="' + (P ? c.stopText : c.startText) + '"><span class="dwb-i"><span class="dwb-txt">' + (P ? c.stopText : c.startText) + "</span></span></a></span>" : "") + (f ? '<span class="dwbw dwbgr' + (!e ? " dwbgrf" : "") + (!g ? " dwbgrl" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-r ' + (c.btnResetClass || "") + '"' + (D ? ' data-role="button" data-icon="delete" data-iconpos="notext"' : "") + ' title="' + c.resetText + '"><span class="dwb-i"><span class="dwb-txt">' + c.resetText + "</span></span></a></span>" : "") + (g ? '<span class="dwbw dwbgr dwbgrl' + (!e && !f ? " dwbgrf" : "") + '"><a href="#" role="button" class="dwb-e dwb dw-timer-l ' + (c.btnLapClass || "") + '"' + (D ? ' data-role="button" data-icon="refresh" data-iconpos="notext"' : "") + ' title="' + c.lapText + '"><span class="dwb-i"><span class="dwb-txt">' + c.lapText + "</span></span></a></span>" : "") + (i ? '<span class="dwbw dwtcl"><a href="#" role="button" class="dwb-e dwb dw-timer-cl ' + (c.btnHideClass || "") + ' "' + (D ? ' data-role="button" data-mini="true"' : "") + ">" + c.hideText + "</a></span>" : "") + "</div>"),
                        h.tap(a(".dw-timer-st", b), function() {
                            P ? h.stop() : h.start()
                        }, !0),
                        h.tap(a(".dw-timer-r", b), function() {
                            h.reset()
                        }, !0),
                        h.tap(a(".dw-timer-l", b), function() {
                            h.lap()
                        }, !0),
                        h.tap(a(".dw-timer-cl", b), function() {
                            h.hide()
                        }, !0)
            },
            onPosition: function(b) {
                a(".dwwr", b).css("min-width", 0).css("min-width", a(".dwbc", b).outerWidth())
            },
            onDestroy: function() {
                clearInterval(g)
            }
        }
    }
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = {
        wheelOrder: "hhiiss",
        useShortLabels: !1,
        minTime: 0,
        maxTime: Infinity,
        labels: "Years,Months,Days,Hours,Minutes,Seconds".split(","),
        labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(",")
    };
    s.presetShort("timespan");
    s.presets.scroller.timespan = function(h) {
        function j(b) {
            var c = {};
            a(n).each(function(a, d) {
                c[d] = F[d] ? Math.floor(b / K[d].limit) : 0;
                b -= c[d] * K[d].limit
            });
            return c
        }
        function e(a, b) {
            var c = !1
                , d = T[F[a] - 1] || 1
                , e = K[a]
                , h = e.wheel
                , i = e.prefix;
            A = 0;
            o = e.until;
            a == R && (A = Math.max(k[a], b[a] - 50 * d),
                o = Math.min(f[a], A + 100 * d),
                g = A + 5 * d,
                W = o - 5 * d);
            h.keys = [];
            h.values = [];
            h.label = e.label;
            I.match(RegExp(e.re + e.re, "i")) && (c = !0);
            for (r = A; r <= o; r += d)
                h.keys.push(r),
                    h.values.push((i || "") + (10 > r && c ? "0" : "") + r + '<span class="dwtlbl">' + e.label + "</span>")
        }
        function d(b) {
            var c = 0;
            a.each(G, function(a, d) {
                isNaN(+b[0]) || (c += K[d.v].limit * b[a])
            });
            return c
        }
        var r, p, b, g, W, i, O, v, A, o, B, C, k, f, u = a.extend({}, h.settings), y = a.extend(h.settings, t, u), I = y.wheelOrder, u = y.useShortLabels ? y.labelsShort : y.labels, n = "years,months,days,hours,minutes,seconds".split(","), K = {
            years: {
                ord: 0,
                index: 6,
                until: 10,
                limit: 31536E6,
                label: u[0],
                re: "y",
                wheel: {}
            },
            months: {
                ord: 1,
                index: 5,
                until: 11,
                limit: 2592E6,
                label: u[1],
                re: "m",
                wheel: {}
            },
            days: {
                ord: 2,
                index: 4,
                until: 31,
                limit: 864E5,
                label: u[2],
                re: "d",
                wheel: {}
            },
            hours: {
                ord: 3,
                index: 3,
                until: 23,
                limit: 36E5,
                label: u[3],
                re: "h",
                wheel: {}
            },
            minutes: {
                ord: 4,
                index: 2,
                until: 59,
                limit: 6E4,
                label: u[4],
                re: "i",
                wheel: {}
            },
            seconds: {
                ord: 5,
                index: 1,
                until: 59,
                limit: 1E3,
                label: u[5],
                re: "s",
                wheel: {}
            }
        }, G = [], T = y.steps || [], F = {}, R = "seconds", c = 0, H = y.defaultValue || Math.max(y.minTime, Math.min(0, y.maxTime)), x = [[]];
        b = 0;
        v = j(b);
        k = j(y.minTime);
        f = j(y.maxTime);
        a(n).each(function(a, b) {
            p = I.search(RegExp(K[b].re, "i"));
            -1 < p && (G.push({
                o: p,
                v: b
            }),
            K[b].index > K[R].index && (R = b))
        });
        G.sort(function(a, b) {
            return a.o > b.o ? 1 : -1
        });
        a.each(G, function(a, b) {
            b.v == R && (c = a);
            F[b.v] = a + 1;
            x[0].push(K[b.v].wheel);
            e(b.v, v)
        });
        h.getVal = function(a, b) {
            return b ? h._getVal(a) : h._hasValue || a ? d(h.getArrayVal(a)) : null
        }
        ;
        return {
            mode: "scroller",
            showLabel: !0,
            wheels: x,
            parseValue: function(b) {
                var c = [], d;
                s.util.isNumeric(b) || !b ? (v = j(b || H),
                    a.each(G, function(a, b) {
                        c.push(v[b.v])
                    })) : a.each(G, function(a, e) {
                    d = RegExp("(\\d+)\\s?(" + y.labels[K[e.v].ord] + "|" + y.labelsShort[K[e.v].ord] + ")", "gi").exec(b);
                    c.push(d ? d[1] : 0)
                });
                a(c).each(function(a, b) {
                    c[a] = Math.floor(b / (T[a] || 1)) * (T[a] || 1)
                });
                return c
            },
            formatValue: function(b) {
                var c = "";
                a.each(G, function(a, d) {
                    c += +b[a] ? b[a] + " " + K[d.v].label + " " : ""
                });
                return c.replace(/\s+$/g, "")
            },
            validate: function(p, l, r) {
                var v, t, q = h._tempWheelArray;
                b = d(q);
                v = j(b);
                if (l === c || !i && (q[c] < g || q[c] > W))
                    if (e(R, v),
                        B !== A || C !== o)
                        t = q[c],
                            O = setTimeout(function() {
                                B = A;
                                C = o;
                                i = !0;
                                q[c] = t;
                                h.changeWheel([c], m, l !== m)
                            }, 1E3 * r);
                var u = !0
                    , s = !0;
                a(n).each(function(b, c) {
                    if (F[c] !== m) {
                        var d = a(".dw-ul", p).eq(F[c] - 1)
                            , e = a(".dw-li", d).index(a('.dw-li[data-val="' + f[c] + '"]', d))
                            , g = a(".dw-li", d).index(a('.dw-li[data-val="' + k[c] + '"]', d));
                        a(".dw-li", d).addClass("dw-v");
                        u && -1 < e && a(".dw-li", d).slice(e + 1).removeClass("dw-v");
                        s && -1 < g && a(".dw-li", d).slice(0, g).removeClass("dw-v");
                        u = u && v[c] == f[c];
                        s = s && v[c] == k[c]
                    }
                });
                i = !1
            },
            onBeforeShow: function() {
                b = d(h._tempWheelArray);
                v = j(b);
                k = j(y.minTime);
                f = j(y.maxTime);
                e(R, v)
            },
            onMarkupReady: function(b) {
                b.addClass("dw-timespan");
                a(".dwwl" + c, b).on("mousedown touchstart", function() {
                    clearTimeout(O)
                })
            }
        }
    }
})($);
(function(a, m) {
    function s(b) {
        var d = [Math.round(b.r).toString(16), Math.round(b.g).toString(16), Math.round(b.b).toString(16)];
        a.each(d, function(a, b) {
            1 == b.length && (d[a] = "0" + b)
        });
        return "#" + d.join("")
    }
    function t(a) {
        a = parseInt(-1 < a.indexOf("#") ? a.substring(1) : a, 16);
        return {
            r: a >> 16,
            g: (a & 65280) >> 8,
            b: a & 255
        }
    }
    function h(a) {
        var b, d, e;
        b = a.h;
        var g = 255 * a.s / 100
            , a = 255 * a.v / 100;
        if (0 === g)
            b = d = e = a;
        else {
            var g = (255 - g) * a / 255
                , h = (a - g) * (b % 60) / 60;
            360 == b && (b = 0);
            60 > b ? (b = a,
                e = g,
                d = g + h) : 120 > b ? (d = a,
                e = g,
                b = a - h) : 180 > b ? (d = a,
                b = g,
                e = g + h) : 240 > b ? (e = a,
                b = g,
                d = a - h) : 300 > b ? (e = a,
                d = g,
                b = g + h) : 360 > b ? (b = a,
                d = g,
                e = a - h) : b = d = e = 0
        }
        return {
            r: b,
            g: d,
            b: e
        }
    }
    function j(a) {
        var b = 0, d;
        d = Math.min(a.r, a.g, a.b);
        var e = Math.max(a.r, a.g, a.b)
            , b = e - d
            , b = (d = e ? 255 * b / e : 0) ? a.r == e ? (a.g - a.b) / b : a.g == e ? 2 + (a.b - a.r) / b : 4 + (a.r - a.g) / b : -1
            , b = 60 * b;
        0 > b && (b += 360);
        return {
            h: b,
            s: d * (100 / 255),
            v: e * (100 / 255)
        }
    }
    function e(a) {
        return s(h(a))
    }
    function d(a) {
        var b = a.h
            , d = a.l
            , a = a.s / 100
            , a = a * (50 >= d ? d : 100 - d)
            , d = d + a;
        return {
            h: b,
            s: 100 * (d ? 2 * a / d : 0),
            v: d
        }
    }
    function r(a) {
        return j(t(a))
    }
    var p = a.mobiscroll
        , b = p.util.prefix
        , g = p.presets.scroller
        , W = {
        preview: !0,
        previewText: !0,
        label: "Color",
        refineLabel: "Refine",
        step: 10,
        nr: 10,
        format: "hex",
        hueText: "Hue",
        saturationText: "Saturation",
        valueText: "Value"
    };
    p.presetShort("colorpicker");
    p.presetShort("color");
    g.color = g.colorpicker = function(g) {
        function p(a) {
            return isNaN(+a) ? 0 : +a
        }
        function v(a) {
            return a.r ? s(a) : a.h ? e(a) : a
        }
        function A(a) {
            a = v(a);
            return "rgb" === N ? (a = t(a),
            Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b)) : "hsv" === N ? (a = r(a),
            Math.round(a.h) + "," + Math.round(a.s) + "," + Math.round(a.v)) : a
        }
        function o(a) {
            return x ? "hsv" == N ? a.join(",") : "rgb" == N ? (a = h({
                h: a[0],
                s: a[1],
                v: a[2]
            }),
            Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b)) : e({
                h: a[0],
                s: a[1],
                v: a[2]
            }) : l ? a[1] : a[0]
        }
        function B(a, c, d) {
            a[0].style.backgroundImage = b + ("-webkit-" == b ? "gradient(linear,left top,left bottom,from(" + c + "),to(" + d + "))" : "linear-gradient(" + c + "," + d + ")")
        }
        function C(b, c) {
            var d = g._tempWheelArray;
            1 !== c && 2 !== c && B(a(".dwwl1 .dw-ul", b), e({
                h: d[0],
                s: 0,
                v: 100
            }), e({
                h: d[0],
                s: 100,
                v: 100
            }));
            2 !== c && B(a(".dwwl2 .dw-ul", b), e({
                h: d[0],
                s: d[1],
                v: 0
            }), e({
                h: d[0],
                s: d[1],
                v: 100
            }));
            if (M) {
                var f = h({
                    h: d[0],
                    s: d[1],
                    v: d[2]
                })
                    , f = 0.299 * f.r + 0.587 * f.g + 0.114 * f.b;
                a(".dw-color-preview", b).attr("style", "background:" + e({
                        h: d[0],
                        s: d[1],
                        v: d[2]
                    }) + ";color:" + (130 < f ? "#000" : "#fff")).text(P ? o(d) : "")
            }
        }
        function k() {
            var a = 0
                , b = {
                keys: [],
                values: [],
                labels: [],
                label: q
            }
                , c = {
                keys: [],
                values: [],
                labels: [],
                label: U
            }
                , d = {
                keys: [],
                values: [],
                labels: [],
                label: Z
            };
            for (a; 360 > a; a += 3)
                b.keys.push(a),
                    b.values.push('<div class="dw-color" style="background:' + e({
                            h: a,
                            s: 100,
                            v: 100
                        }) + '"><div class="dw-color-hl"></div></div>'),
                    b.labels.push(a);
            for (a = 0; 101 > a; a += 1)
                c.keys.push(a),
                    d.keys.push(a),
                    c.values.push('<div class="dw-color"><div class="dw-color-hl"></div></div>'),
                    d.values.push('<div class="dw-color"><div class="dw-color-hl"></div></div>'),
                    c.labels.push(a),
                    d.labels.push(a);
            return [[b, c, d]]
        }
        function f(b, c, d) {
            var e, f, g = {
                keys: [],
                values: [],
                label: c || H.label
            };
            a.each(b, function(a, b) {
                e = v(b);
                f = A(b);
                g.keys.push(f);
                g.values.push('<div class="dw-cbc"><div class="dw-cb' + ("circle" === H.style ? " dw-cb-circle" : "") + '" style="background:' + e + '"></div></div>' + f);
                d && (G[f] = d)
            });
            return g
        }
        function u(a, b, c) {
            var f, g = a.h, h = (2 - a.s / 100) * a.v, a = a.s * a.v, a = (f = 100 >= h ? h : 200 - h) ? a / f : 0;
            f = h / 2 - c / 2 * b;
            for (h = []; 0 > f + b; )
                f += b;
            for (c = f + (c + 1) * b; 100 <= c - b; )
                c -= b;
            for (; f <= c; f += b)
                h.push(e(d({
                    h: g,
                    s: a,
                    l: Math.max(0, Math.min(f, 100))
                })));
            return h
        }
        var y, I, n, K, G = {}, T = {}, F = {}, R, c = a.extend({}, g.settings), H = a.extend(g.settings, W, c), x = !H.colors, c = a.isArray(H.colors) ? H.colors : [H.colors], L = H.defaultValue || c[0], l = H.refine && 1 < c.length, N = H.format, M = x && H.preview, P = H.previewText, q = H.hueText, U = H.saturationText, Z = H.valueText;
        !x && 1 == c.length && (c = u(r(v(c[0])), H.step, H.nr));
        x ? (K = k(),
            F = {
                width: 70,
                height: 15,
                rows: 13,
                speedUnit: 0.006,
                timeUnit: 0.05,
                showLabel: !0
            }) : l ? (a.each(c, function(a, b) {
            I = v(b);
            n = A(b);
            T[n] = f(u(r(I), H.step, H.nr), H.refineLabel, n);
            a || (y = T[n])
        }),
            K = [[f(c), y]]) : (F = {
            width: 180
        },
            K = [[f(c)]]);
        return a.extend({
            wheels: K,
            parseValue: function(a) {
                if (x) {
                    if (a = a || L) {
                        if (N == "hsv") {
                            a = a.split(",");
                            a = {
                                h: p(a[0]),
                                s: p(a[1]),
                                v: p(a[2])
                            }
                        } else if (N == "rgb") {
                            a = a.split(",");
                            a = j({
                                r: p(a[0]),
                                g: p(a[1]),
                                b: p(a[2])
                            })
                        } else {
                            a = a.replace("#", "");
                            a.length == 3 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]);
                            a = r(a)
                        }
                        var b = Math.round(a.h);
                        return [Math.floor(b / 3) * 3, Math.round(a.s), Math.round(a.v)]
                    }
                    return [0, 100, 100]
                }
                if (l) {
                    if (a && G[a])
                        return [G[a], a];
                    A(L);
                    return [G[L], L]
                }
                return [a || A(L)]
            },
            formatValue: o,
            onBeforeShow: function() {
                if (x)
                    H.mode = "scroller";
                if (M)
                    H.headerText = false
            },
            onMarkupReady: function(a) {
                a.addClass("dw-colorpicker");
                M && a.find(".dwc").before('<div class="dw-color-preview"></div>');
                if (x) {
                    a.addClass("dw-cp-hsv");
                    C(a)
                }
            },
            validate: function(a, b) {
                var c = g._tempWheelArray;
                if (x)
                    setTimeout(function() {
                        C(a, b)
                    }, 1);
                else if (l && !b && !R) {
                    R = true;
                    K[0][1] = T[c[0]];
                    b === 0 && (c[1] = c[0]);
                    g.changeWheel([1], m, b !== m)
                }
                R = false
            }
        }, F)
    }
    ;
    p.colorpicker = {
        hsv2hex: e,
        hsv2rgb: h,
        rgb2hsv: j,
        rgb2hex: s,
        hex2rgb: t,
        hex2hsv: r
    }
})($);
(function(a) {
    var a = a.mobiscroll
        , m = a.presets.scroller;
    m.treelist = m.list;
    a.presetShort("list");
    a.presetShort("treelist")
})($);
(function(a, m, s, t) {
    var h = a.extend
        , j = a.mobiscroll
        , e = j.classes;
    e.MenuStrip = function(d, r) {
        function p(a) {
            clearTimeout(K);
            K = setTimeout(function() {
                v("load" !== a.type)
            }, 200)
        }
        function b(b, c) {
            if (b.length) {
                var d = b.offset().left
                    , e = b[0].offsetLeft
                    , f = b.outerWidth()
                    , h = o.offset().left;
                A = b;
                c === t && (c = !I);
                G && c && (I ? b.attr("data-selected") ? s(b) : g(b) : (s(a(".mbsc-ms-item-sel", l)),
                    g(b)));
                "a" == R ? d < h ? F.scroll(-e, 200) : d + f > h + k && F.scroll(k - e - f, 200) : F.scroll(k / 2 - e - f / 2, 200);
                c && x("onItemTap", [b])
            }
        }
        function g(a) {
            a.addClass(T).attr("data-selected", "true").attr("aria-selected", "true")
        }
        function s(a) {
            a.removeClass(T).removeAttr("data-selected").removeAttr("aria-selected")
        }
        function i(a) {
            "object" !== typeof a && (a = l.children('[data-id="' + a + '"]'));
            return a
        }
        function O() {
            l.children().each(function(b) {
                var d, e = a(this), g = G && "true" == e.attr("data-selected"), h = "true" == e.attr("data-disabled"), i = e.attr("data-icon");
                0 === b && (B = e);
                G && !I && g && (A = e);
                1 !== e.children().length && a("<span></span>").append(e.contents()).appendTo(e);
                d = e.children().eq(0);
                i && (f = !0);
                d.html() && (u = !0);
                d.hasClass("mbsc-ms-item-i") || (b = a('<span class="mbsc-ms-item-i-t"><span class="mbsc-ms-item-i-c"></span></span>'),
                    b.find(".mbsc-ms-item-i-c").append(d.contents()),
                    d.addClass("mbsc-ms-item-i" + (i ? " mbsc-ms-ic mbsc-ic mbsc-ic-" + i : "")).append(b),
                    e.attr("data-role", "button").attr("aria-selected", g ? "true" : null).attr("aria-disabled", h ? "true" : null).addClass("mbsc-ms-item mbsc-btn-e " + (c.itemClass || "") + (g ? T : "") + (h ? " mbsc-btn-d " + (c.disabledClass || "") : "")))
            });
            f && o.addClass("mbsc-ms-icons");
            u && o.addClass("mbsc-ms-txt")
        }
        function v(a) {
            k = o.width();
            a && n === k || (n = k,
            c.itemWidth && (y = k / Math.min(Math.floor(k / c.itemWidth), l.children().length),
                l.children().css("width", y + "px")),
                l.contents().filter(function() {
                    return this.nodeType == 3 && !/\S/.test(this.nodeValue)
                }).remove(),
                H = l.width(),
                h(F.settings, {
                    contSize: k,
                    maxSnapScroll: c.paging ? 1 : !1,
                    maxScroll: 0,
                    minScroll: H > k ? k - H : 0,
                    snap: c.paging ? k : c.snap ? y || ".mbsc-ms-item" : !1,
                    elastic: H > k ? y || k : !1
                }),
                F.refresh())
        }
        var A, o, B, C, k, f, u, y, I, n, K, G, T, F, R, c, H, x, L = this, l = a(d);
        e.Base.call(this, d, r, !0);
        L.navigate = function(a, c) {
            b(i(a), c)
        }
        ;
        L.next = function(a) {
            var c = A ? A.next() : B;
            c.length && (A = c,
                b(A, a))
        }
        ;
        L.prev = function(a) {
            var c = A ? A.prev() : B;
            c.length && (A = c,
                b(A, a))
        }
        ;
        L.select = function(b) {
            I || s(a(".mbsc-ms-item-sel", l));
            g(i(b))
        }
        ;
        L.deselect = function(a) {
            s(i(a))
        }
        ;
        L.enable = function(a) {
            i(a).removeClass("mbsc-btn-d").removeAttr("data-disabled").removeAttr("aria-disabled")
        }
        ;
        L.disable = function(a) {
            i(a).addClass("mbsc-btn-d").attr("data-disabled", "true").attr("aria-disabled", "true")
        }
        ;
        L.refresh = function() {
            l.height("");
            O();
            v();
            l.height(l.height())
        }
        ;
        L.init = function(d) {
            L._init(d);
            C = a("body" == c.context ? m : c.context);
            "tabs" == c.type ? (c.select = c.select || "single",
                c.variant = c.variant || "b") : "options" == c.type ? (c.select = c.select || "multi",
                c.variant = c.variant || "a") : "menu" == c.type && (c.select = c.select || "off",
                c.variant = c.variant || "a");
            c.itemWidth && c.snap === t && (c.snap = !0);
            R = c.variant;
            G = "off" != c.select;
            I = "multi" == c.select;
            T = " mbsc-ms-item-sel " + (c.activeClass || "");
            o = a('<div class="mbsc-ms-c mbsc-ms-' + R + " mbsc-ms-" + c.display + " mbsc-" + c.theme + " " + (c.baseTheme ? " mbsc-" + c.baseTheme : "") + " " + (c.cssClass || "") + " " + (c.wrapperClass || "") + (c.rtl ? " mbsc-ms-rtl" : " mbsc-ms-ltr") + (c.itemWidth ? " mbsc-ms-hasw" : "") + ("body" == c.context ? "" : " mbsc-ms-ctx") + (G ? "" : " mbsc-ms-nosel") + '"><div class="mbsc-ms-sc"></div></div>').insertAfter(l);
            o.find(".mbsc-ms-sc").append(l);
            l.css("display", "").addClass("mbsc-ms " + (c.groupClass || ""));
            O();
            x("onMarkupReady", [o]);
            l.height(l.height());
            F = new j.classes.ScrollView(o[0],{
                axis: "X",
                contSize: 0,
                maxScroll: 0,
                maxSnapScroll: 1,
                minScroll: 0,
                snap: 1,
                elastic: 1,
                rtl: c.rtl,
                mousewheel: c.mousewheel,
                onBtnTap: function(a) {
                    b(a, true)
                }
            });
            v();
            o.find("img").on("load", p);
            C.on("orientationchange resize", p);
            x("onInit", [])
        }
        ;
        L.destroy = function() {
            C.off("orientationchange resize", p);
            l.height("").insertAfter(o).find(".mbsc-ms-item").width("");
            o.off().remove();
            F.destroy();
            L._destroy()
        }
        ;
        c = L.settings;
        x = L.trigger;
        L.init(r)
    }
    ;
    e.MenuStrip.prototype = {
        _class: "menustrip",
        _hasDef: !0,
        _hasTheme: !0,
        _defaults: {
            type: "options",
            display: "inline"
        }
    };
    j.presetShort("menustrip", "MenuStrip")
})($, window, document);
(function(a) {
    var m = a.mobiscroll
        , s = m.classes;
    s.Widget = function(m, h, j) {
        function e(d) {
            !a(".dwcc", d).hasClass("mbsc-w-p") && a.mobiscroll.running && a(".dwcc", d).addClass("mbsc-w-p").append(b.show())
        }
        var d, r, p, b = a(m), g = this;
        s.Frame.call(this, m, h, !0);
        g._generateContent = function() {
            return ""
        }
        ;
        g._markupReady = function(a) {
            "inline" != d.display && e(a)
        }
        ;
        g._markupInserted = function(a) {
            "inline" == d.display && e(a);
            a.trigger("mbsc-enhance", [{
                theme: d.theme,
                lang: d.lang
            }])
        }
        ;
        g._markupRemove = function() {
            b.hide();
            r ? r.prepend(b) : p.after(b)
        }
        ;
        g._processSettings = function() {
            d = g.settings;
            g.buttons.close = {
                text: d.closeText,
                handler: "cancel"
            };
            g.buttons.ok = {
                text: d.okText,
                handler: "set"
            };
            d.cssClass = (d.cssClass || "") + " mbsc-wdg";
            d.buttons = d.buttons || ("inline" == d.display ? [] : ["ok"]);
            p = b.prev();
            p.length || (r = b.parent());
            b.hide()
        }
        ;
        j || g.init(h)
    }
    ;
    s.Widget.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasContent: !0,
        _class: "widget",
        _defaults: a.extend({}, s.Frame.prototype._defaults, {
            okText: "OK"
        })
    };
    m.themes.widget = m.themes.frame;
    m.presetShort("widget", "Widget", !1)
})($);
(function(a) {
    var a = a.mobiscroll
        , m = a.presets.scroller;
    m.number = m.measurement;
    a.presetShort("number")
})($);
(function(a, m, s, t) {
    var h = a.mobiscroll
        , j = a.extend
        , e = h.util
        , d = h.datetime
        , r = h.presets.scroller
        , p = {
        labelsShort: "Yrs,Mths,Days,Hrs,Mins,Secs".split(","),
        fromText: "Start",
        toText: "End",
        eventText: "event",
        eventsText: "events"
    };
    h.presetShort("calendar");
    r.calendar = function(b) {
        function g(b) {
            if (b) {
                if (L[b])
                    return L[b];
                var c = a('<div style="background-color:' + b + ';"></div>').appendTo("body")
                    , d = (m.getComputedStyle ? getComputedStyle(c[0]) : c[0].style).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(",")
                    , d = 130 < 0.299 * d[0] + 0.587 * d[1] + 0.114 * d[2] ? "#000" : "#fff";
                c.remove();
                return L[b] = d
            }
        }
        function s(a) {
            return a.sort(function(a, b) {
                var c = a.d || a.start
                    , d = b.d || b.start
                    , c = !c.getTime ? 0 : a.start && a.end && a.start.toDateString() !== a.end.toDateString() ? 1 : c.getTime()
                    , d = !d.getTime ? 0 : b.start && b.end && b.start.toDateString() !== b.end.toDateString() ? 1 : d.getTime();
                return c - d
            })
        }
        function i(b) {
            var c;
            c = a(".dw-cal-c", k).outerHeight();
            var d = b.outerHeight()
                , e = b.outerWidth()
                , g = b.offset().top - a(".dw-cal-c", k).offset().top
                , h = 2 > b.closest(".dw-cal-row").index();
            c = f.addClass("dw-cal-events-t").css({
                top: h ? g + d : "0",
                bottom: h ? "0" : c - g
            }).addClass("dw-cal-events-v").height();
            f.css(h ? "bottom" : "top", "auto").removeClass("dw-cal-events-t");
            n.css("max-height", c);
            I.refresh();
            I.scroll(0);
            h ? f.addClass("dw-cal-events-b") : f.removeClass("dw-cal-events-b");
            a(".dw-cal-events-arr", f).css("left", b.offset().left - f.offset().left + e / 2)
        }
        function O(c, d) {
            var e = y[c];
            if (e) {
                var j, k, n, m, p, o = '<ul class="dw-cal-event-list">';
                u = d;
                d.addClass(N).find(".dw-i").addClass(P);
                d.hasClass(M) && d.attr("data-hl", "true").removeClass(M);
                s(e);
                a.each(e, function(a, b) {
                    m = b.d || b.start;
                    p = b.start && b.end && b.start.toDateString() !== b.end.toDateString();
                    n = b.color;
                    g(n);
                    k = j = "";
                    m.getTime && (j = h.datetime.formatDate((p ? "MM d yy " : "") + l.timeFormat, m));
                    b.end && (k = h.datetime.formatDate((p ? "MM d yy " : "") + l.timeFormat, b.end));
                    var c = o, d = '<li role="button" aria-label="' + b.text + (j ? ", " + l.fromText + " " + j : "") + (k ? ", " + l.toText + " " + k : "") + '" class="dw-cal-event"><div class="dw-cal-event-color" style="' + (n ? "background:" + n + ";" : "") + '"></div><div class="dw-cal-event-text">' + (m.getTime && !p ? '<div class="dw-cal-event-time">' + h.datetime.formatDate(l.timeFormat, m) + "</div>" : "") + b.text + "</div>", e;
                    if (b.start && b.end) {
                        e = l.labelsShort;
                        var f = Math.abs(b.end - b.start) / 1E3
                            , i = f / 60
                            , r = i / 60
                            , q = r / 24
                            , u = q / 365;
                        e = '<div class="dw-cal-event-dur">' + (45 > f && Math.round(f) + " " + e[5].toLowerCase() || 45 > i && Math.round(i) + " " + e[4].toLowerCase() || 24 > r && Math.round(r) + " " + e[3].toLowerCase() || 30 > q && Math.round(q) + " " + e[2].toLowerCase() || 365 > q && Math.round(q / 30) + " " + e[1].toLowerCase() || Math.round(u) + " " + e[0].toLowerCase()) + "</div>"
                    } else
                        e = "";
                    o = c + (d + e + "</li>")
                });
                o += "</ul>";
                K.html(o);
                i(u);
                b.tap(a(".dw-cal-event", K), function(d) {
                    I.scrolled || b.trigger("onEventSelect", [d, e[a(this).index()], c])
                });
                G = !0;
                b.trigger("onEventBubbleShow", [u, f])
            }
        }
        function v() {
            f && f.removeClass("dw-cal-events-v");
            u && (u.removeClass(N).find(".dw-i").removeClass(P),
            u.attr("data-hl") && u.removeAttr("data-hl").addClass(M));
            G = !1
        }
        function A(a) {
            return new Date(a.getFullYear(),a.getMonth(),a.getDate())
        }
        function o(a) {
            Q = {};
            if (a && a.length)
                for (F = 0; F < a.length; F++)
                    Q[A(a[F])] = a[F]
        }
        function B() {
            S && v();
            b.refresh()
        }
        var C, k, f, u, y, I, n, K, G, T, F, R, c, H, x, L = {};
        H = j({}, b.settings);
        var l = j(b.settings, p, H)
            , N = "dw-sel dw-cal-day-ev"
            , M = "dw-cal-day-hl"
            , P = l.activeClass || ""
            , q = l.multiSelect || "week" == l.selectType
            , U = l.markedDisplay
            , Z = !0 === l.events || !0 === l.markedText
            , J = 0
            , Q = {}
            , S = a.isArray(l.events)
            , aa = S ? j(!0, [], l.events) : [];
        H = r.calbase.call(this, b);
        C = j({}, H);
        T = l.firstSelectDay === t ? l.firstDay : l.firstSelectDay;
        if (l.selectedValues)
            for (F = 0; F < l.selectedValues.length; F++)
                Q[A(l.selectedValues[F])] = l.selectedValues[F];
        S && a.each(aa, function(a, b) {
            b._id === t && (b._id = J++)
        });
        b.onGenMonth = function(a, c) {
            y = b.prepareObj(aa, a, c);
            R = b.prepareObj(l.marked, a, c)
        }
        ;
        b.getDayProps = function(b) {
            for (var c = q ? Q[b] !== t : S ? b.getTime() === (new Date).setHours(0, 0, 0, 0) : t, d = R[b] ? R[b][0] : !1, e = y[b] ? y[b][0] : !1, f = d || e, d = d.text || (e ? y[b].length + " " + (1 < y[b].length ? l.eventsText : l.eventText) : 0), e = R[b] || y[b] || [], h = f.color, i = Z && d ? g(h) : "", j = "", k = '<div class="dw-cal-day-m"' + (h ? ' style="background-color:' + h + ";border-color:" + h + " " + h + ' transparent transparent"' : "") + "></div>", b = 0; b < e.length; b++)
                e[b].icon && (j += '<span class="mbsc-ic mbsc-ic-' + e[b].icon + '"' + (e[b].text ? "" : e[b].color ? ' style="color:' + e[b].color + ';"' : "") + "></span>\n");
            if ("bottom" == U) {
                k = '<div class="dw-cal-day-m"><div class="dw-cal-day-m-t">';
                for (b = 0; b < e.length; b++)
                    k += '<div class="dw-cal-day-m-c"' + (e[b].color ? ' style="background:' + e[b].color + ';"' : "") + "></div>";
                k += "</div></div>"
            }
            return {
                marked: f,
                selected: S ? !1 : c,
                cssClass: S && c ? "dw-cal-day-hl" : f ? "dw-cal-day-marked" : "",
                ariaLabel: Z || S ? d : "",
                markup: Z && d ? '<div class="dw-cal-day-txt-c"><div class="dw-cal-day-txt ' + (l.eventTextClass || "") + '" title="' + a("<div>" + d + "</div>").text() + '"' + (h ? ' style="background:' + h + ";color:" + i + ';text-shadow:none;"' : "") + ">" + j + d + "</div></div>" : Z && j ? '<div class="dw-cal-day-ic-c">' + j + "</div>" : f ? k : ""
            }
        }
        ;
        b.addValue = function(a) {
            Q[A(a)] = a;
            B()
        }
        ;
        b.removeValue = function(a) {
            delete Q[A(a)];
            B()
        }
        ;
        b.setVal = function(a, c, d, e, f) {
            q && (o(a),
                a = a ? a[0] : null);
            b._setVal(a, c, d, e, f);
            B()
        }
        ;
        b.getVal = function(a) {
            return q ? e.objectToArray(Q) : b.getDate(a)
        }
        ;
        b.setValues = function(a, c) {
            b.setDate(a ? a[0] : null, c);
            o(a);
            B()
        }
        ;
        b.getValues = function() {
            return q ? b.getVal() : [b.getDate()]
        }
        ;
        S && (b.addEvent = function(b) {
                var c = []
                    , b = j(!0, [], a.isArray(b) ? b : [b]);
                a.each(b, function(a, b) {
                    b._id === t && (b._id = J++);
                    aa.push(b);
                    c.push(b._id)
                });
                B();
                return c
            }
                ,
                b.removeEvent = function(b) {
                    b = a.isArray(b) ? b : [b];
                    a.each(b, function(b, c) {
                        a.each(aa, function(a, b) {
                            if (b._id === c)
                                return aa.splice(a, 1),
                                    !1
                        })
                    });
                    B()
                }
                ,
                b.getEvents = function(a) {
                    var c;
                    return a ? (a.setHours(0, 0, 0, 0),
                        c = b.prepareObj(aa, a.getFullYear(), a.getMonth()),
                        c[a] ? s(c[a]) : []) : j(!0, [], aa)
                }
                ,
                b.setEvents = function(b) {
                    var c = [];
                    aa = j(!0, [], b);
                    a.each(aa, function(a, b) {
                        b._id === t && (b._id = J++);
                        c.push(b._id)
                    });
                    B();
                    return c
                }
        );
        j(H, {
            highlight: !q && !S,
            divergentDayChange: !q && !S,
            buttons: S && "inline" !== l.display ? ["cancel"] : l.buttons,
            parseValue: function(a) {
                var c, e;
                if (q && a && typeof a === "string") {
                    Q = {};
                    a = a.split(",");
                    for (c = 0; c < a.length; c++) {
                        e = d.parseDate(b.format, a[c].replace(/^\s+|\s+$/g, ""), l);
                        Q[A(e)] = e
                    }
                    a = a[0]
                }
                return C.parseValue.call(this, a)
            },
            formatValue: function(a) {
                var c, e = [];
                if (q) {
                    for (c in Q)
                        e.push(d.formatDate(b.format, Q[c], l));
                    return e.join(", ")
                }
                return C.formatValue.call(this, a)
            },
            onClear: function() {
                if (q) {
                    Q = {};
                    b.refresh()
                }
            },
            onBeforeShow: function() {
                if (S)
                    l.headerText = false;
                if (l.closeOnSelect)
                    l.divergentDayChange = false;
                if (l.counter && q)
                    l.headerText = function() {
                        var b = 0
                            , c = l.selectType == "week" ? 7 : 1;
                        a.each(Q, function() {
                            b++
                        });
                        b = Math.round(b / c);
                        return (b > 1 ? l.selectedPluralText || l.selectedText : l.selectedText).replace(/{count}/, b)
                    }
            },
            onMarkupReady: function(d) {
                C.onMarkupReady.call(this, d);
                k = d;
                if (q) {
                    a(".dwv", d).attr("aria-live", "off");
                    c = j({}, Q)
                }
                Z && a(".dw-cal", d).addClass("dw-cal-ev");
                U && a(".dw-cal", d).addClass("dw-cal-m-" + U);
                if (S) {
                    d.addClass("dw-cal-em");
                    f = a('<div class="dw-cal-events ' + (l.eventBubbleClass || "") + '"><div class="dw-cal-events-arr"></div><div class="dw-cal-events-i"><div class="dw-cal-events-sc"></div></div></div>').appendTo(a(".dw-cal-c", d));
                    n = a(".dw-cal-events-i", f);
                    K = a(".dw-cal-events-sc", f);
                    I = new h.classes.ScrollView(n[0]);
                    G = false;
                    b.tap(n, function() {
                        I.scrolled || v()
                    })
                }
            },
            onMonthChange: function() {
                S && v()
            },
            onSelectShow: function() {
                S && v()
            },
            onMonthLoaded: function() {
                if (x) {
                    O(x.d, a('.dw-cal-day-v[data-full="' + x.full + '"]:not(.dw-cal-day-diff)', k));
                    x = false
                }
            },
            onDayChange: function(c) {
                var d = c.date
                    , e = A(d)
                    , f = a(c.cell)
                    , c = c.selected;
                if (S) {
                    v();
                    f.hasClass("dw-cal-day-ev") || setTimeout(function() {
                        b.changing ? x = {
                            d: e,
                            full: f.attr("data-full")
                        } : O(e, f)
                    }, 10)
                } else if (q)
                    if (l.selectType == "week") {
                        var g, h, i = e.getDay() - T, i = i < 0 ? 7 + i : i;
                        l.multiSelect || (Q = {});
                        for (g = 0; g < 7; g++) {
                            h = new Date(e.getFullYear(),e.getMonth(),e.getDate() - i + g);
                            c ? delete Q[h] : Q[h] = h
                        }
                        B()
                    } else {
                        g = a('.dw-cal .dw-cal-day[data-full="' + f.attr("data-full") + '"]', k);
                        if (c) {
                            g.removeClass("dw-sel").removeAttr("aria-selected").find(".dw-i").removeClass(P);
                            delete Q[e]
                        } else {
                            g.addClass("dw-sel").attr("aria-selected", "true").find(".dw-i").addClass(P);
                            Q[e] = e
                        }
                    }
                if (!S && !l.multiSelect && l.closeOnSelect && l.display !== "inline") {
                    b.needsSlide = false;
                    b.setDate(d);
                    b.select();
                    return false
                }
            },
            onCalResize: function() {
                G && i(u)
            },
            onCancel: function() {
                !b.live && q && (Q = j({}, c))
            }
        });
        return H
    }
})($, window, document);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller;
    m.presetShort("image");
    s.image = function(m) {
        m.settings.enhance && (m._processMarkup = function(h) {
                var j = h.attr("data-icon");
                h.children().each(function(e, d) {
                    d = a(d);
                    d.is("img") ? a('<div class="mbsc-img-c"></div>').insertAfter(d).append(d.addClass("mbsc-img")) : d.is("p") && d.addClass("mbsc-img-txt")
                });
                j && h.prepend('<div class="mbsc-ic mbsc-ic-' + j + '"></div');
                h.html('<div class="mbsc-img-w">' + h.html() + "</div>");
                return h.html()
            }
        );
        return s.list.call(this, m)
    }
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = s.util
        , h = t.isString
        , j = {
        batch: 40,
        inputClass: "",
        invalid: [],
        rtl: !1,
        showInput: !0,
        groupLabel: "Groups",
        checkIcon: "checkmark",
        dataText: "text",
        dataValue: "value",
        dataGroup: "group",
        dataDisabled: "disabled"
    };
    s.presetShort("select");
    s.presets.scroller.select = function(e) {
        function d() {
            var b, c, d, e, f, g = 0, h = 0, i = {};
            X = {};
            da = {};
            I = [];
            B = [];
            fa.length = 0;
            aa ? a.each(N.data, function(a, g) {
                e = g[N.dataText];
                f = g[N.dataValue];
                c = g[N.dataGroup];
                d = {
                    value: f,
                    text: e,
                    index: a
                };
                X[f] = d;
                I.push(d);
                Y && (i[c] === m ? (b = {
                    text: c,
                    value: h,
                    options: [],
                    index: h
                },
                    da[h] = b,
                    i[c] = h,
                    B.push(b),
                    h++) : b = da[i[c]],
                ea && (d.index = b.options.length),
                    d.group = i[c],
                    b.options.push(d));
                g[N.dataDisabled] && fa.push(f)
            }) : Y ? a("optgroup", q).each(function(b) {
                da[b] = {
                    text: this.label,
                    value: b,
                    options: [],
                    index: b
                };
                B.push(da[b]);
                a("option", this).each(function(a) {
                    d = {
                        value: this.value,
                        text: this.text,
                        index: ea ? a : g++,
                        group: b
                    };
                    X[this.value] = d;
                    I.push(d);
                    da[b].options.push(d);
                    this.disabled && fa.push(this.value)
                })
            }) : a("option", q).each(function(a) {
                d = {
                    value: this.value,
                    text: this.text,
                    index: a
                };
                X[this.value] = d;
                I.push(d);
                this.disabled && fa.push(this.value)
            });
            I.length && (A = I[0].value);
            ga && (I = [],
                g = 0,
                a.each(da, function(b, c) {
                    f = "__group" + b;
                    d = {
                        text: c.text,
                        value: f,
                        group: b,
                        index: g++
                    };
                    X[f] = d;
                    I.push(d);
                    fa.push(d.value);
                    a.each(c.options, function(a, b) {
                        b.index = g++;
                        I.push(b)
                    })
                }))
        }
        function r(a, b, d, e, f, g, h) {
            var i = []
                , j = []
                , e = Math.max(0, (d[e] !== m ? d[e].index : 0) - M)
                , k = Math.min(b.length - 1, e + 2 * M);
            if (c[f] !== e || H[f] !== k) {
                for (d = e; d <= k; d++)
                    j.push(b[d].text),
                        i.push(b[d].value);
                R[f] = !0;
                x[f] = e;
                L[f] = k;
                b = {
                    multiple: g,
                    values: j,
                    keys: i,
                    label: h
                };
                P ? a[0][f] = b : a[f] = [b]
            } else
                R[f] = !1
        }
        function p(a) {
            r(a, B, da, o, f, !1, N.groupLabel)
        }
        function b(a) {
            r(a, ea ? da[o].options : I, X, K, n, U, J)
        }
        function g(b) {
            U && (b && h(b) && (b = b.split(",")),
            a.isArray(b) && (b = b[0]));
            K = b === m || null === b || "" === b || !X[b] ? A : b;
            D && (T = o = X[K] ? X[K].group : null)
        }
        function s(a, b) {
            var c = a ? e._tempWheelArray : e._hasValue ? e._wheelArray : null;
            return c ? N.group && b ? c : c[n] : null
        }
        function i() {
            var a, b;
            a = [];
            var c = 0;
            if (U) {
                b = [];
                for (c in w)
                    a.push(X[c] ? X[c].text : ""),
                        b.push(c);
                a = a.join(", ")
            } else
                b = K,
                    a = X[K] ? X[K].text : "";
            e._tempValue = b;
            y.val(a);
            q.val(b)
        }
        function O(a) {
            var b = a.attr("data-val")
                , c = a.hasClass("dw-msel");
            if (U && a.closest(".dwwl").hasClass("dwwms"))
                return a.hasClass("dw-v") && (c ? (a.removeClass(Q).removeAttr("aria-selected"),
                    delete w[b]) : (a.addClass(Q).attr("aria-selected", "true"),
                    w[b] = b)),
                    !1;
            a.hasClass("dw-w-gr") && (k = a.attr("data-val"))
        }
        var v, A, o, B, C, k, f, u, y, I, n, K, G, T, F, R = {}, c = {}, H = {}, x = {}, L = {}, l = a.extend({}, e.settings), N = a.extend(e.settings, j, l), M = N.batch, l = N.layout || (/top|bottom/.test(N.display) ? "liquid" : ""), P = "liquid" == l, q = a(this), U = N.multiple || q.prop("multiple"), Z = this.id + "_dummy";
        u = a('label[for="' + this.id + '"]').attr("for", Z);
        var J = N.label !== m ? N.label : u.length ? u.text() : q.attr("name")
            , Q = "dw-msel mbsc-ic mbsc-ic-" + N.checkIcon
            , S = N.readonly
            , aa = !!N.data
            , Y = aa ? !!N.group : a("optgroup", q).length;
        u = N.group;
        var D = Y && u && !1 !== u.groupWheel
            , ea = Y && u && D && !0 === u.clustered
            , ga = Y && (!u || !1 !== u.header && !ea)
            , ia = q.val() || []
            , fa = []
            , w = {}
            , X = {}
            , da = {};
        N.invalid.length || (N.invalid = fa);
        D ? (f = 0,
            n = 1) : (f = -1,
            n = 0);
        if (U) {
            q.prop("multiple", !0);
            ia && h(ia) && (ia = ia.split(","));
            for (u = 0; u < ia.length; u++)
                w[ia[u]] = ia[u]
        }
        d();
        g(q.val());
        a("#" + Z).remove();
        q.next().is("input.mbsc-control") ? y = q.off(".mbsc-form").next().removeAttr("tabindex") : (y = a('<input type="text" id="' + Z + '" class="mbsc-control mbsc-control-ev ' + N.inputClass + '" readonly />'),
        N.showInput && y.insertBefore(q));
        e.attachShow(y.attr("placeholder", N.placeholder || ""));
        q.addClass("dw-hsel").attr("tabindex", -1).closest(".ui-field-contain").trigger("create");
        i();
        e.setVal = function(a, b, c, d, f) {
            if (U) {
                a && h(a) && (a = a.split(","));
                w = t.arrayToObject(a);
                a = a ? a[0] : null
            }
            e._setVal(a, b, c, d, f)
        }
        ;
        e.getVal = function(a, b) {
            return U ? t.objectToArray(w) : s(a, b)
        }
        ;
        e.refresh = function() {
            d();
            c = {};
            H = {};
            var a = N
                , h = [[]];
            D && p(h);
            b(h);
            a.wheels = h;
            c[f] = x[f];
            H[f] = L[f];
            c[n] = x[n];
            H[n] = L[n];
            v = true;
            g(K);
            e._tempWheelArray = D ? [o, K] : [K];
            e._isVisible && e.changeWheel(D ? [f, n] : [n])
        }
        ;
        e.getValues = e.getVal;
        e.getValue = s;
        return {
            width: 50,
            layout: l,
            headerText: !1,
            anchor: y,
            confirmOnTap: D ? [!1, !0] : !0,
            formatValue: function(a) {
                var b, c = [];
                if (U) {
                    for (b in w)
                        c.push(X[b] ? X[b].text : "");
                    return c.join(", ")
                }
                a = a[n];
                return X[a] ? X[a].text : ""
            },
            parseValue: function(a) {
                g(a === m ? q.val() : a);
                return D ? [o, K] : [K]
            },
            onValueTap: O,
            onValueFill: i,
            onBeforeShow: function() {
                if (U && N.counter)
                    N.headerText = function() {
                        var b = 0;
                        a.each(w, function() {
                            b++
                        });
                        return (b > 1 ? N.selectedPluralText || N.selectedText : N.selectedText).replace(/{count}/, b)
                    }
                    ;
                g(q.val());
                if (D)
                    e._tempWheelArray = [o, K];
                e.refresh()
            },
            onMarkupReady: function(b) {
                b.addClass("dw-select");
                a(".dwwl" + f, b).on("mousedown touchstart", function() {
                    clearTimeout(F)
                });
                a(".dwwl" + n, b).on("mousedown touchstart", function() {
                    C || clearTimeout(F)
                });
                ga && a(".dwwl" + n, b).addClass("dw-select-gr");
                if (U) {
                    b.addClass("dwms");
                    a(".dwwl", b).on("keydown", function(b) {
                        if (b.keyCode == 32) {
                            b.preventDefault();
                            b.stopPropagation();
                            O(a(".dw-sel", this))
                        }
                    }).eq(n).attr("aria-multiselectable", "true");
                    G = a.extend({}, w)
                }
            },
            validate: function(d, g, h, i) {
                var j, l = [];
                j = e.getArrayVal(true);
                var r = j[f]
                    , q = j[n]
                    , u = a(".dw-ul", d).eq(f)
                    , s = a(".dw-ul", d).eq(n);
                c[f] > 1 && a(".dw-li", u).slice(0, 2).removeClass("dw-v").addClass("dw-fv");
                H[f] < B.length - 2 && a(".dw-li", u).slice(-2).removeClass("dw-v").addClass("dw-fv");
                c[n] > 1 && a(".dw-li", s).slice(0, 2).removeClass("dw-v").addClass("dw-fv");
                H[n] < (ea ? da[r].options : I).length - 2 && a(".dw-li", s).slice(-2).removeClass("dw-v").addClass("dw-fv");
                if (!v) {
                    K = q;
                    if (D) {
                        o = X[K].group;
                        if (g === m || g === f) {
                            o = +j[f];
                            C = false;
                            if (o !== T) {
                                K = da[o].options[0].value;
                                c[n] = null;
                                H[n] = null;
                                C = true;
                                N.readonly = [false, true]
                            } else
                                N.readonly = S
                        }
                    }
                    if (Y && (/__group/.test(K) || k)) {
                        q = K = da[X[k || K].group].options[0].value;
                        k = false
                    }
                    e._tempWheelArray = D ? [r, q] : [q];
                    if (D) {
                        p(N.wheels);
                        R[f] && l.push(f)
                    }
                    b(N.wheels);
                    R[n] && l.push(n);
                    clearTimeout(F);
                    F = setTimeout(function() {
                        if (l.length) {
                            v = true;
                            C = false;
                            T = o;
                            c[f] = x[f];
                            H[f] = L[f];
                            c[n] = x[n];
                            H[n] = L[n];
                            e._tempWheelArray = D ? [r, K] : [K];
                            e.changeWheel(l, 0, g !== m)
                        }
                        if (D) {
                            g === n && e.scroll(u, f, e.getValidCell(o, u, i, false, true).v, 0.1);
                            e._tempWheelArray[f] = o
                        }
                        N.readonly = S
                    }, g === m ? 100 : h * 1E3);
                    if (l.length)
                        return C ? false : true
                }
                if (g === m && U) {
                    j = w;
                    h = 0;
                    a(".dwwl" + n + " .dw-li", d).removeClass(Q).removeAttr("aria-selected");
                    for (h in j)
                        a(".dwwl" + n + ' .dw-li[data-val="' + j[h] + '"]', d).addClass(Q).attr("aria-selected", "true")
                }
                ga && a('.dw-li[data-val^="__group"]', d).addClass("dw-w-gr");
                a.each(N.invalid, function(b, c) {
                    a('.dw-li[data-val="' + c + '"]', s).removeClass("dw-v dw-fv")
                });
                v = false
            },
            onValidated: function() {
                K = e._tempWheelArray[n]
            },
            onClear: function(b) {
                w = {};
                y.val("");
                a(".dwwl" + n + " .dw-li", b).removeClass(Q).removeAttr("aria-selected")
            },
            onCancel: function() {
                !e.live && U && (w = a.extend({}, G))
            },
            onDestroy: function() {
                y.hasClass("mbsc-control") || y.remove();
                q.removeClass("dw-hsel").removeAttr("tabindex")
            }
        }
    }
})($);
(function(a) {
    a.each(["date", "time", "datetime"], function(m, s) {
        a.mobiscroll.presetShort(s)
    })
})($);
(function(a, m) {
    var s = a.mobiscroll
        , t = {
        inputClass: "",
        values: 5,
        order: "desc",
        style: "icon",
        invalid: [],
        layout: "fixed",
        icon: {
            filled: "star3",
            empty: "star3"
        }
    };
    s.presetShort("rating");
    s.presets.scroller.rating = function(h) {
        var j = a.extend({}, h.settings), e = a.extend(h.settings, t, j), d = a(this), j = this.id + "_dummy", r = a('label[for="' + this.id + '"]').attr("for", j), p = e.label !== m ? e.label : r.length ? r.text() : d.attr("name"), b = e.defaultValue, r = [[]], p = {
            keys: [],
            values: [],
            labels: [],
            label: p
        }, g = {}, W = [], i, O = !1, v, A, o, B, C, k, f = "grade" === e.style ? "circle" : "icon";
        d.is("select") && (e.values = {},
            a("option", d).each(function() {
                e.values[a(this).val()] = a(this).text()
            }),
            a("#" + j).remove());
        if (a.isArray(e.values))
            for (v = 0; v < e.values.length; v++)
                o = +e.values[v],
                isNaN(o) && (o = v + 1,
                    O = !0),
                    W.push({
                        order: o,
                        key: e.values[v],
                        value: e.values[v]
                    });
        else if (a.isPlainObject(e.values))
            for (A in v = 1,
                O = !0,
                e.values)
                o = +A,
                isNaN(o) && (o = v),
                    W.push({
                        order: o,
                        key: A,
                        value: e.values[A]
                    }),
                    v++;
        else
            for (v = 1; v <= e.values; v++)
                W.push({
                    order: v,
                    key: v,
                    value: v
                });
        e.showText === m && O && (e.showText = !0);
        e.icon.empty === m && (e.icon.empty = e.icon.filled);
        W.sort(function(a, b) {
            return e.order == "desc" ? b.order - a.order : a.order - b.order
        });
        k = "desc" == e.order ? W[0].order : W[W.length - 1].order;
        for (v = 0; v < W.length; v++) {
            C = W[v].order;
            o = W[v].key;
            B = W[v].value;
            O = "";
            for (A = 1; A < C + 1; A++)
                O += '<span class="mbsc-rating-' + f + ("circle" === f ? "" : " mbsc-ic mbsc-ic-" + e.icon.filled) + ' ">' + ("circle" == f ? A : " ") + "</span>";
            for (A = C + 1; A <= k; A++)
                O += '<span class="mbsc-rating-' + f + ("circle" === f ? " mbsc-rating-circle-unf" : " mbsc-ic mbsc-ic-" + (e.icon.empty ? e.icon.empty + " mbsc-rating-icon-unf" : "") + (e.icon.empty === e.icon.filled ? " mbsc-rating-icon-same" : "")) + '"></span>';
            b === m && (b = o);
            O += e.showText ? '<span class="mbsc-rating-txt">' + B + "</span>" : "";
            p.keys.push(o);
            p.values.push(O);
            p.labels.push(B);
            g[o] = B
        }
        d.is("select") && (i = a('<input type="text" id="' + j + '" value="' + g[d.val()] + '" class="' + e.inputClass + '" placeholder="' + (e.placeholder || "") + '" readonly />').insertBefore(d));
        r[0].push(p);
        i && h.attachShow(i);
        d.is("select") && d.hide().closest(".ui-field-contain").trigger("create");
        h.getVal = function(a) {
            a = h._hasValue ? h[a ? "_tempWheelArray" : "_wheelArray"][0] : null;
            return s.util.isNumeric(a) ? +a : a
        }
        ;
        return {
            anchor: i,
            wheels: r,
            headerText: !1,
            formatValue: function(a) {
                return g[a[0]]
            },
            parseValue: function(a) {
                for (var d in g)
                    if (i && d == a || !i && g[d] == a)
                        return [d];
                return [b]
            },
            validate: function(b) {
                a.each(e.invalid, function(d, e) {
                    a('.dw-li[data-val="' + e + '"]', b).removeClass("dw-v")
                })
            },
            onMarkupReady: function(a) {
                a.addClass("dw-rating")
            },
            onValueFill: function(a) {
                if (i) {
                    i.val(a);
                    d.val(h._tempWheelArray[0])
                }
            },
            onDestroy: function() {
                i && i.remove();
                d.show()
            }
        }
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller
        , t = {
        min: 0,
        max: 100,
        defUnit: "km",
        units: "m,km,in,ft,yd,mi".split(",")
    }
        , h = {
        mm: 0.001,
        cm: 0.01,
        dm: 0.1,
        m: 1,
        dam: 10,
        hm: 100,
        km: 1E3,
        "in": 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        ch: 20.1168,
        fur: 201.168,
        mi: 1609.344,
        lea: 4828.032
    };
    m.presetShort("distance");
    s.distance = function(j) {
        var e = a.extend({}, t, j.settings), d = [], m, p;
        if (e.units)
            for (p = 0; p < e.units.length; p++)
                m = e.units[p],
                h[m] && d.push(m);
        a.extend(j.settings, e, {
            sign: !1,
            units: d,
            unitNames: null,
            convert: function(a, d, e) {
                return a * h[d] / h[e]
            }
        });
        return s.measurement.call(this, j)
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller
        , t = {
        min: 0,
        max: 100,
        defUnit: "N",
        units: ["N", "kp", "lbf", "pdl"]
    }
        , h = {
        N: 1,
        kp: 9.80665,
        lbf: 4.448222,
        pdl: 0.138255
    };
    m.presetShort("force");
    s.force = function(j) {
        var e = a.extend({}, t, j.settings), d = [], m, p;
        if (e.units)
            for (p = 0; p < e.units.length; p++)
                m = e.units[p],
                h[m] && d.push(m);
        a.extend(j.settings, e, {
            sign: !1,
            units: d,
            unitNames: null,
            convert: function(a, d, e) {
                return a * h[d] / h[e]
            }
        });
        return s.measurement.call(this, j)
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller
        , t = {
        min: 0,
        max: 1E3,
        defUnit: "kg",
        units: ["g", "kg", "oz", "lb"],
        unitNames: {
            tlong: "t (long)",
            tshort: "t (short)"
        }
    }
        , h = {
        mg: 0.001,
        cg: 0.01,
        dg: 0.1,
        g: 1,
        dag: 10,
        hg: 100,
        kg: 1E3,
        t: 1E6,
        drc: 1.7718452,
        oz: 28.3495,
        lb: 453.59237,
        st: 6350.29318,
        qtr: 12700.58636,
        cwt: 50802.34544,
        tlong: 1016046.9088,
        tshort: 907184.74
    };
    m.presetShort("mass");
    s.mass = function(j) {
        var e = a.extend({}, t, j.settings), d = [], m = [], p, b;
        if (e.units)
            for (b = 0; b < e.units.length; b++)
                p = e.units[b],
                h[p] && (d.push(p),
                    m.push(e.unitNames[p] || p));
        a.extend(j.settings, e, {
            sign: !1,
            units: d,
            unitNames: m,
            convert: function(a, b, d) {
                return a * h[b] / h[d]
            }
        });
        return s.measurement.call(this, j)
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller
        , t = {
        min: 0,
        max: 100,
        defUnit: "kph",
        units: ["kph", "mph", "mps", "fps", "knot"],
        unitNames: {
            kph: "km/h",
            mph: "mi/h",
            mps: "m/s",
            fps: "ft/s",
            knot: "knot"
        }
    }
        , h = {
        kph: 1,
        mph: 1.60934,
        mps: 3.6,
        fps: 1.09728,
        knot: 1.852
    };
    m.presetShort("speed");
    s.speed = function(j) {
        var e = a.extend({}, t, j.settings), d = [], m = [], p, b;
        if (e.units)
            for (b = 0; b < e.units.length; b++)
                p = e.units[b],
                h[p] && (d.push(p),
                    m.push(e.unitNames[p] || p));
        a.extend(j.settings, e, {
            sign: !1,
            units: d,
            unitNames: m,
            convert: function(a, b, d) {
                return a * h[b] / h[d]
            }
        });
        return s.measurement.call(this, j)
    }
})($);
(function(a) {
    var m = a.mobiscroll
        , s = m.presets.scroller
        , t = {
        min: -20,
        max: 40,
        defUnit: "c",
        units: ["c", "k", "f", "r"],
        unitNames: {
            c: "\u00b0C",
            k: "K",
            f: "\u00b0F",
            r: "\u00b0R"
        }
    }
        , h = {
        c: 1,
        k: 1,
        f: 1,
        r: 1
    }
        , j = {
        c2k: function(a) {
            return a + 273.15
        },
        c2f: function(a) {
            return 9 * a / 5 + 32
        },
        c2r: function(a) {
            return 9 * (a + 273.15) / 5
        },
        k2c: function(a) {
            return a - 273.15
        },
        k2f: function(a) {
            return 9 * a / 5 - 459.67
        },
        k2r: function(a) {
            return 9 * a / 5
        },
        f2c: function(a) {
            return 5 * (a - 32) / 9
        },
        f2k: function(a) {
            return 5 * (a + 459.67) / 9
        },
        f2r: function(a) {
            return a + 459.67
        },
        r2c: function(a) {
            return 5 * (a - 491.67) / 9
        },
        r2k: function(a) {
            return 5 * a / 9
        },
        r2f: function(a) {
            return a - 459.67
        }
    };
    m.presetShort("temperature");
    s.temperature = function(e) {
        var d = a.extend({}, t, e.settings), m = [], p = [], b, g;
        if (d.units)
            for (g = 0; g < d.units.length; g++)
                b = d.units[g],
                h[b] && (m.push(b),
                    p.push(d.unitNames[b] || b));
        a.extend(e.settings, d, {
            sign: !0,
            units: m,
            unitNames: p,
            convert: function(a, b, d) {
                return j[b + "2" + d](a)
            }
        });
        return s.measurement.call(this, e)
    }
})($);
(function(a) {
    var m, s, t, h = a.mobiscroll, j = h.themes;
    s = navigator.userAgent.match(/Android|iPhone|iPad|iPod|Windows|Windows Phone|MSIE/i);
    if (/Android/i.test(s)) {
        if (m = "android-holo",
                s = navigator.userAgent.match(/Android\s+([\d\.]+)/i))
            s = s[0].replace("Android ", ""),
                m = 5 <= s.split(".")[0] ? "material" : 4 <= s.split(".")[0] ? "android-holo" : "android"
    } else if (/iPhone/i.test(s) || /iPad/i.test(s) || /iPod/i.test(s)) {
        if (m = "ios",
                s = navigator.userAgent.match(/OS\s+([\d\_]+)/i))
            s = s[0].replace(/_/g, ".").replace("OS ", ""),
                m = "7" <= s ? "ios" : "ios-classic"
    } else if (/Windows/i.test(s) || /MSIE/i.test(s) || /Windows Phone/i.test(s))
        m = "wp";
    a.each(j, function(e, d) {
        a.each(d, function(a, d) {
            if (d.baseTheme == m)
                return h.autoTheme = a,
                    t = !0,
                    !1;
            a == m && (h.autoTheme = a)
        });
        if (t)
            return !1
    })
})($);

// WEBPACK FOOTER //
// ./src/js/libs/mobiscroll/mobiscroll.custom-2.17.0.min.js
