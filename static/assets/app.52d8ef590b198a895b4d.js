!(function(e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var i = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if ((n.r(a), Object.defineProperty(a, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
        for (var i in e)
          n.d(
            a,
            i,
            function(t) {
              return e[t];
            }.bind(null, i),
          );
      return a;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = '/'),
    n((n.s = 43));
})([
  function(e, t, n) {
    (function(t) {
      var n = (function(e) {
        var t = /\blang(?:uage)?-([\w-]+)\b/i,
          n = 0,
          a = {
            manual: e.Prism && e.Prism.manual,
            disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
            util: {
              encode: function(e) {
                return e instanceof i
                  ? new i(e.type, a.util.encode(e.content), e.alias)
                  : Array.isArray(e)
                  ? e.map(a.util.encode)
                  : e
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/\u00a0/g, ' ');
              },
              type: function(e) {
                return Object.prototype.toString.call(e).slice(8, -1);
              },
              objId: function(e) {
                return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id;
              },
              clone: function e(t, n) {
                var i,
                  r,
                  s = a.util.type(t);
                switch (((n = n || {}), s)) {
                  case 'Object':
                    if (((r = a.util.objId(t)), n[r])) return n[r];
                    for (var o in ((i = {}), (n[r] = i), t)) t.hasOwnProperty(o) && (i[o] = e(t[o], n));
                    return i;
                  case 'Array':
                    return (
                      (r = a.util.objId(t)),
                      n[r]
                        ? n[r]
                        : ((i = []),
                          (n[r] = i),
                          t.forEach(function(t, a) {
                            i[a] = e(t, n);
                          }),
                          i)
                    );
                  default:
                    return t;
                }
              },
            },
            languages: {
              extend: function(e, t) {
                var n = a.util.clone(a.languages[e]);
                for (var i in t) n[i] = t[i];
                return n;
              },
              insertBefore: function(e, t, n, i) {
                var r = (i = i || a.languages)[e],
                  s = {};
                for (var o in r)
                  if (r.hasOwnProperty(o)) {
                    if (o == t) for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
                    n.hasOwnProperty(o) || (s[o] = r[o]);
                  }
                var c = i[e];
                return (
                  (i[e] = s),
                  a.languages.DFS(a.languages, function(t, n) {
                    n === c && t != e && (this[t] = s);
                  }),
                  s
                );
              },
              DFS: function e(t, n, i, r) {
                r = r || {};
                var s = a.util.objId;
                for (var o in t)
                  if (t.hasOwnProperty(o)) {
                    n.call(t, o, t[o], i || o);
                    var l = t[o],
                      c = a.util.type(l);
                    'Object' !== c || r[s(l)]
                      ? 'Array' !== c || r[s(l)] || ((r[s(l)] = !0), e(l, n, o, r))
                      : ((r[s(l)] = !0), e(l, n, null, r));
                  }
              },
            },
            plugins: {},
            highlightAll: function(e, t) {
              a.highlightAllUnder(document, e, t);
            },
            highlightAllUnder: function(e, t, n) {
              var i = {
                callback: n,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
              };
              a.hooks.run('before-highlightall', i);
              for (var r, s = e.querySelectorAll(i.selector), o = 0; (r = s[o++]); )
                a.highlightElement(r, !0 === t, i.callback);
            },
            highlightElement: function(n, i, r) {
              for (var s, o = 'none', l = n; l && !t.test(l.className); ) l = l.parentNode;
              l && ((o = (l.className.match(t) || [, 'none'])[1].toLowerCase()), (s = a.languages[o])),
                (n.className = n.className.replace(t, '').replace(/\s+/g, ' ') + ' language-' + o),
                n.parentNode &&
                  ((l = n.parentNode),
                  /pre/i.test(l.nodeName) &&
                    (l.className = l.className.replace(t, '').replace(/\s+/g, ' ') + ' language-' + o));
              var c = { element: n, language: o, grammar: s, code: n.textContent },
                d = function(e) {
                  (c.highlightedCode = e),
                    a.hooks.run('before-insert', c),
                    (c.element.innerHTML = c.highlightedCode),
                    a.hooks.run('after-highlight', c),
                    a.hooks.run('complete', c),
                    r && r.call(c.element);
                };
              if ((a.hooks.run('before-sanity-check', c), c.code))
                if ((a.hooks.run('before-highlight', c), c.grammar))
                  if (i && e.Worker) {
                    var p = new Worker(a.filename);
                    (p.onmessage = function(e) {
                      d(e.data);
                    }),
                      p.postMessage(JSON.stringify({ language: c.language, code: c.code, immediateClose: !0 }));
                  } else d(a.highlight(c.code, c.grammar, c.language));
                else d(a.util.encode(c.code));
              else a.hooks.run('complete', c);
            },
            highlight: function(e, t, n) {
              var r = { code: e, grammar: t, language: n };
              return (
                a.hooks.run('before-tokenize', r),
                (r.tokens = a.tokenize(r.code, r.grammar)),
                a.hooks.run('after-tokenize', r),
                i.stringify(a.util.encode(r.tokens), r.language)
              );
            },
            matchGrammar: function(e, t, n, r, s, o, l) {
              for (var c in n)
                if (n.hasOwnProperty(c) && n[c]) {
                  if (c == l) return;
                  var d = n[c];
                  d = 'Array' === a.util.type(d) ? d : [d];
                  for (var p = 0; p < d.length; ++p) {
                    var u = d[p],
                      m = u.inside,
                      g = !!u.lookbehind,
                      f = !!u.greedy,
                      b = 0,
                      h = u.alias;
                    if (f && !u.pattern.global) {
                      var _ = u.pattern.toString().match(/[imuy]*$/)[0];
                      u.pattern = RegExp(u.pattern.source, _ + 'g');
                    }
                    u = u.pattern || u;
                    for (var v = r, w = s; v < t.length; w += t[v].length, ++v) {
                      var y = t[v];
                      if (t.length > e.length) return;
                      if (!(y instanceof i)) {
                        if (f && v != t.length - 1) {
                          if (((u.lastIndex = w), !(T = u.exec(e)))) break;
                          for (
                            var k = T.index + (g ? T[1].length : 0),
                              E = T.index + T[0].length,
                              x = v,
                              S = w,
                              A = t.length;
                            x < A && (S < E || (!t[x].type && !t[x - 1].greedy));
                            ++x
                          )
                            k >= (S += t[x].length) && (++v, (w = S));
                          if (t[v] instanceof i) continue;
                          (I = x - v), (y = e.slice(w, S)), (T.index -= w);
                        } else {
                          u.lastIndex = 0;
                          var T = u.exec(y),
                            I = 1;
                        }
                        if (T) {
                          g && (b = T[1] ? T[1].length : 0);
                          E = (k = T.index + b) + (T = T[0].slice(b)).length;
                          var N = y.slice(0, k),
                            R = y.slice(E),
                            F = [v, I];
                          N && (++v, (w += N.length), F.push(N));
                          var O = new i(c, m ? a.tokenize(T, m) : T, h, T, f);
                          if (
                            (F.push(O),
                            R && F.push(R),
                            Array.prototype.splice.apply(t, F),
                            1 != I && a.matchGrammar(e, t, n, v, w, !0, c),
                            o)
                          )
                            break;
                        } else if (o) break;
                      }
                    }
                  }
                }
            },
            tokenize: function(e, t) {
              var n = [e],
                i = t.rest;
              if (i) {
                for (var r in i) t[r] = i[r];
                delete t.rest;
              }
              return a.matchGrammar(e, n, t, 0, 0, !1), n;
            },
            hooks: {
              all: {},
              add: function(e, t) {
                var n = a.hooks.all;
                (n[e] = n[e] || []), n[e].push(t);
              },
              run: function(e, t) {
                var n = a.hooks.all[e];
                if (n && n.length) for (var i, r = 0; (i = n[r++]); ) i(t);
              },
            },
            Token: i,
          };
        function i(e, t, n, a, i) {
          (this.type = e),
            (this.content = t),
            (this.alias = n),
            (this.length = 0 | (a || '').length),
            (this.greedy = !!i);
        }
        if (
          ((e.Prism = a),
          (i.stringify = function(e, t) {
            if ('string' == typeof e) return e;
            if (Array.isArray(e))
              return e
                .map(function(e) {
                  return i.stringify(e, t);
                })
                .join('');
            var n = {
              type: e.type,
              content: i.stringify(e.content, t),
              tag: 'span',
              classes: ['token', e.type],
              attributes: {},
              language: t,
            };
            if (e.alias) {
              var r = Array.isArray(e.alias) ? e.alias : [e.alias];
              Array.prototype.push.apply(n.classes, r);
            }
            a.hooks.run('wrap', n);
            var s = Object.keys(n.attributes)
              .map(function(e) {
                return e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"';
              })
              .join(' ');
            return (
              '<' +
              n.tag +
              ' class="' +
              n.classes.join(' ') +
              '"' +
              (s ? ' ' + s : '') +
              '>' +
              n.content +
              '</' +
              n.tag +
              '>'
            );
          }),
          !e.document)
        )
          return e.addEventListener
            ? (a.disableWorkerMessageHandler ||
                e.addEventListener(
                  'message',
                  function(t) {
                    var n = JSON.parse(t.data),
                      i = n.language,
                      r = n.code,
                      s = n.immediateClose;
                    e.postMessage(a.highlight(r, a.languages[i], i)), s && e.close();
                  },
                  !1,
                ),
              a)
            : a;
        var r = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
        return (
          r &&
            ((a.filename = r.src),
            a.manual ||
              r.hasAttribute('data-manual') ||
              ('loading' !== document.readyState
                ? window.requestAnimationFrame
                  ? window.requestAnimationFrame(a.highlightAll)
                  : window.setTimeout(a.highlightAll, 16)
                : document.addEventListener('DOMContentLoaded', a.highlightAll))),
          a
        );
      })(
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
          ? self
          : {},
      );
      e.exports && (e.exports = n),
        void 0 !== t && (t.Prism = n),
        (n.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: /<!DOCTYPE[\s\S]+?>/i,
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
            greedy: !0,
            inside: {
              tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
              'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] },
              },
              punctuation: /\/?>/,
              'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
            },
          },
          entity: /&#?[\da-z]{1,8};/i,
        }),
        (n.languages.markup.tag.inside['attr-value'].inside.entity = n.languages.markup.entity),
        n.hooks.add('wrap', function(e) {
          'entity' === e.type && (e.attributes.title = e.content.replace(/&amp;/, '&'));
        }),
        Object.defineProperty(n.languages.markup.tag, 'addInlined', {
          value: function(e, t) {
            var a = {};
            (a['language-' + t] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: n.languages[t],
            }),
              (a.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var i = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: a } };
            i['language-' + t] = { pattern: /[\s\S]+/, inside: n.languages[t] };
            var r = {};
            (r[e] = {
              pattern: RegExp(
                /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, e),
                'i',
              ),
              lookbehind: !0,
              greedy: !0,
              inside: i,
            }),
              n.languages.insertBefore('markup', 'cdata', r);
          },
        }),
        (n.languages.xml = n.languages.extend('markup', {})),
        (n.languages.html = n.languages.markup),
        (n.languages.mathml = n.languages.markup),
        (n.languages.svg = n.languages.markup),
        (function(e) {
          var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } },
            url: {
              pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
              inside: { function: /^url/i, punctuation: /^\(|\)$/ },
            },
            selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
            string: { pattern: t, greedy: !0 },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/,
          }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
          var n = e.languages.markup;
          n &&
            (n.tag.addInlined('style', 'css'),
            e.languages.insertBefore(
              'inside',
              'attr-value',
              {
                'style-attr': {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    'attr-name': { pattern: /^\s*style/i, inside: n.tag.inside },
                    punctuation: /^\s*=\s*['"]|['"]\s*$/,
                    'attr-value': { pattern: /.+/i, inside: e.languages.css },
                  },
                  alias: 'language-css',
                },
              },
              n.tag,
            ));
        })(n),
        (n.languages.clike = {
          comment: [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
          ],
          string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          'class-name': {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          boolean: /\b(?:true|false)\b/,
          function: /\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (n.languages.javascript = n.languages.extend('clike', {
          'class-name': [
            n.languages.clike['class-name'],
            {
              pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
              pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
          function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
        })),
        (n.languages.javascript[
          'class-name'
        ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
        n.languages.insertBefore('javascript', 'keyword', {
          regex: {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
            lookbehind: !0,
            greedy: !0,
          },
          'function-variable': {
            pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: 'function',
          },
          parameter: [
            {
              pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
            { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: n.languages.javascript },
            {
              pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
            {
              pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: n.languages.javascript,
            },
          ],
          constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        }),
        n.languages.insertBefore('javascript', 'string', {
          'template-string': {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
              'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
              interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                  'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
                  rest: n.languages.javascript,
                },
              },
              string: /[\s\S]+/,
            },
          },
        }),
        n.languages.markup && n.languages.markup.tag.addInlined('script', 'javascript'),
        (n.languages.js = n.languages.javascript),
        'undefined' != typeof self &&
          self.Prism &&
          self.document &&
          document.querySelector &&
          ((self.Prism.fileHighlight = function(e) {
            e = e || document;
            var t = {
              js: 'javascript',
              py: 'python',
              rb: 'ruby',
              ps1: 'powershell',
              psm1: 'powershell',
              sh: 'bash',
              bat: 'batch',
              h: 'c',
              tex: 'latex',
            };
            Array.prototype.slice.call(e.querySelectorAll('pre[data-src]')).forEach(function(e) {
              if (!e.hasAttribute('data-src-loaded')) {
                for (
                  var a, i = e.getAttribute('data-src'), r = e, s = /\blang(?:uage)?-([\w-]+)\b/i;
                  r && !s.test(r.className);

                )
                  r = r.parentNode;
                if ((r && (a = (e.className.match(s) || [, ''])[1]), !a)) {
                  var o = (i.match(/\.(\w+)$/) || [, ''])[1];
                  a = t[o] || o;
                }
                var l = document.createElement('code');
                (l.className = 'language-' + a), (e.textContent = ''), (l.textContent = 'Loading…'), e.appendChild(l);
                var c = new XMLHttpRequest();
                c.open('GET', i, !0),
                  (c.onreadystatechange = function() {
                    4 == c.readyState &&
                      (c.status < 400 && c.responseText
                        ? ((l.textContent = c.responseText),
                          n.highlightElement(l),
                          e.setAttribute('data-src-loaded', ''))
                        : c.status >= 400
                        ? (l.textContent = '✖ Error ' + c.status + ' while fetching file: ' + c.statusText)
                        : (l.textContent = '✖ Error: File does not exist or is empty'));
                  }),
                  c.send(null);
              }
            }),
              n.plugins.toolbar &&
                n.plugins.toolbar.registerButton('download-file', function(e) {
                  var t = e.element.parentNode;
                  if (
                    t &&
                    /pre/i.test(t.nodeName) &&
                    t.hasAttribute('data-src') &&
                    t.hasAttribute('data-download-link')
                  ) {
                    var n = t.getAttribute('data-src'),
                      a = document.createElement('a');
                    return (
                      (a.textContent = t.getAttribute('data-download-link-label') || 'Download'),
                      a.setAttribute('download', ''),
                      (a.href = n),
                      a
                    );
                  }
                });
          }),
          document.addEventListener('DOMContentLoaded', function() {
            self.Prism.fileHighlight();
          }));
    }.call(this, n(1)));
  },
  function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t) {
    !(function(e) {
      var t =
          '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
        n = {
          environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
          variable: [
            {
              pattern: /\$?\(\([\s\S]+?\)\)/,
              greedy: !0,
              inside: {
                variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
                number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/,
              },
            },
            { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } },
            {
              pattern: /\$\{[^}]+\}/,
              greedy: !0,
              inside: {
                operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                punctuation: /[\[\]]/,
                environment: { pattern: RegExp('(\\{)' + t), lookbehind: !0, alias: 'constant' },
              },
            },
            /\$(?:\w+|[#?*!@$])/,
          ],
          entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
        };
      e.languages.bash = {
        shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
        comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
        'function-name': [
          { pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: 'function' },
          { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
        ],
        'for-or-select': { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: 'variable', lookbehind: !0 },
        'assign-left': {
          pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
          inside: { environment: { pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t), lookbehind: !0, alias: 'constant' } },
          alias: 'variable',
          lookbehind: !0,
        },
        string: [
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,
            lookbehind: !0,
            greedy: !0,
            inside: n,
          },
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,
            lookbehind: !0,
            greedy: !0,
          },
          { pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/, greedy: !0, inside: n },
        ],
        environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
        variable: n.variable,
        function: {
          pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
          lookbehind: !0,
        },
        keyword: {
          pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
          lookbehind: !0,
        },
        builtin: {
          pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
          lookbehind: !0,
          alias: 'class-name',
        },
        boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/, lookbehind: !0 },
        'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
        operator: {
          pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
          inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
      };
      for (
        var a = [
            'comment',
            'function-name',
            'for-or-select',
            'assign-left',
            'string',
            'environment',
            'function',
            'keyword',
            'builtin',
            'boolean',
            'file-descriptor',
            'operator',
            'punctuation',
            'number',
          ],
          i = n.variable[1].inside,
          r = 0;
        r < a.length;
        r++
      )
        i[a[r]] = e.languages.bash[a[r]];
      e.languages.shell = e.languages.bash;
    })(Prism);
  },
  function(e, t) {
    (Prism.languages.c = Prism.languages.extend('clike', {
      'class-name': { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 },
      keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
      operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
      number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
    })),
      Prism.languages.insertBefore('c', 'string', {
        macro: {
          pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
          lookbehind: !0,
          alias: 'property',
          inside: {
            string: { pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0 },
            directive: {
              pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
              lookbehind: !0,
              alias: 'keyword',
            },
          },
        },
        constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
      }),
      delete Prism.languages.c.boolean;
  },
  function(e, t) {
    Prism.languages.clike = {
      comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
      ],
      string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      'class-name': {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
      },
      keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      boolean: /\b(?:true|false)\b/,
      function: /\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
      punctuation: /[{}[\];(),.:]/,
    };
  },
  function(e, t) {
    (Prism.languages.cpp = Prism.languages.extend('c', {
      'class-name': { pattern: /(\b(?:class|enum|struct)\s+)\w+/, lookbehind: !0 },
      keyword: /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
      number: {
        pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
        greedy: !0,
      },
      operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      boolean: /\b(?:true|false)\b/,
    })),
      Prism.languages.insertBefore('cpp', 'string', {
        'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 },
      });
  },
  function(e, t) {
    !(function(e) {
      e.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m] };
      var t = {
        'deleted-sign': '-',
        'deleted-arrow': '<',
        'inserted-sign': '+',
        'inserted-arrow': '>',
        unchanged: ' ',
        diff: '!',
      };
      Object.keys(t).forEach(function(n) {
        var a = t[n],
          i = [];
        /^\w+$/.test(n) || i.push(/\w+/.exec(n)[0]),
          'diff' === n && i.push('bold'),
          (e.languages.diff[n] = { pattern: RegExp('^(?:[' + a + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'), alias: i });
      }),
        Object.defineProperty(e.languages.diff, 'PREFIXES', { value: t });
    })(Prism);
  },
  function(e, t) {
    (Prism.languages.docker = {
      keyword: {
        pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
        lookbehind: !0,
      },
      string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      comment: /#.*/,
      punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
    }),
      (Prism.languages.dockerfile = Prism.languages.docker);
  },
  function(e, t) {
    Prism.languages.erlang = {
      comment: /%.+/,
      string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
      'quoted-function': { pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/, alias: 'function' },
      'quoted-atom': { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: 'atom' },
      boolean: /\b(?:true|false)\b/,
      keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
      number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i],
      function: /\b[a-z][\w@]*(?=\()/,
      variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
      operator: [
        /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
        { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
        { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
      ],
      atom: /\b[a-z][\w@]*/,
      punctuation: /[()[\]{}:;,.#|]|<<|>>/,
    };
  },
  function(e, t) {
    Prism.languages.elm = {
      comment: /--.*|{-[\s\S]*?-}/,
      char: { pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/, greedy: !0 },
      string: [
        { pattern: /"""[\s\S]*?"""/, greedy: !0 },
        { pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/, greedy: !0 },
      ],
      import_statement: {
        pattern: /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+([A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
        inside: { keyword: /\b(?:import|as|exposing)\b/ },
      },
      keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
      builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
      number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
      operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
      hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
      constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
      punctuation: /[{}[\]|(),.:]/,
    };
  },
  function(e, t) {
    Prism.languages.git = {
      comment: /^#.*/m,
      deleted: /^[-–].*/m,
      inserted: /^\+.*/m,
      string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
      command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
      coord: /^@@.*@@$/m,
      commit_sha1: /^commit \w{40}$/m,
    };
  },
  function(e, t) {
    (Prism.languages.go = Prism.languages.extend('clike', {
      keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
      builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
      boolean: /\b(?:_|iota|nil|true|false)\b/,
      operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
      number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
      string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    })),
      delete Prism.languages.go['class-name'];
  },
  function(e, t) {
    Prism.languages.graphql = {
      comment: /#.*/,
      string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
      number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:true|false)\b/,
      variable: /\$[a-z_]\w*/i,
      directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
      'attr-name': { pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i, greedy: !0 },
      'class-name': {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
        lookbehind: !0,
      },
      fragment: { pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/, lookbehind: !0, alias: 'function' },
      keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
      operator: /[!=|]|\.{3}/,
      punctuation: /[!(){}\[\]:=,]/,
      constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
    };
  },
  function(e, t) {
    (Prism.languages.haskell = {
      comment: {
        pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
        lookbehind: !0,
      },
      char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
      string: {
        pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
        greedy: !0,
      },
      keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
      import_statement: {
        pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
      },
      builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
      number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
      operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][\w']*\.)*[_a-z][\w']*`/,
      hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
      constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
      punctuation: /[{}[\];(),.:]/,
    }),
      (Prism.languages.hs = Prism.languages.haskell);
  },
  function(e, t) {
    !(function(e) {
      var t = /\b(?:abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while|var|null|exports|module|open|opens|provides|requires|to|transitive|uses|with)\b/,
        n = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
      (e.languages.java = e.languages.extend('clike', {
        'class-name': [n, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
        keyword: t,
        function: [e.languages.clike.function, { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 }],
        number: /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|([-+&|])\2|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
      })),
        e.languages.insertBefore('java', 'class-name', {
          annotation: { alias: 'punctuation', pattern: /(^|[^.])@\w+/, lookbehind: !0 },
          namespace: {
            pattern: /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)[a-z]\w*(\.[a-z]\w*)+/,
            lookbehind: !0,
            inside: { punctuation: /\./ },
          },
          generics: {
            pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
            inside: { 'class-name': n, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/ },
          },
        });
    })(Prism);
  },
  function(e, t) {
    (Prism.languages.javascript = Prism.languages.extend('clike', {
      'class-name': [
        Prism.languages.clike['class-name'],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
          lookbehind: !0,
        },
      ],
      keyword: [
        { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
        {
          pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0,
        },
      ],
      number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
      function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
    })),
      (Prism.languages.javascript[
        'class-name'
      ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
      Prism.languages.insertBefore('javascript', 'keyword', {
        regex: {
          pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
          lookbehind: !0,
          greedy: !0,
        },
        'function-variable': {
          pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
          alias: 'function',
        },
        parameter: [
          {
            pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
          { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
      }),
      Prism.languages.insertBefore('javascript', 'string', {
        'template-string': {
          pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
          greedy: !0,
          inside: {
            'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
            interpolation: {
              pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
              lookbehind: !0,
              inside: {
                'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
                rest: Prism.languages.javascript,
              },
            },
            string: /[\s\S]+/,
          },
        },
      }),
      Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'),
      (Prism.languages.js = Prism.languages.javascript);
  },
  function(e, t) {
    Prism.languages.json = {
      property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
      string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
      comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:true|false)\b/,
      null: { pattern: /\bnull\b/, alias: 'keyword' },
    };
  },
  function(e, t) {
    !(function(e) {
      var t = e.util.clone(e.languages.javascript);
      (e.languages.jsx = e.languages.extend('markup', t)),
        (e.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
        (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
        (e.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
        (e.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
        e.languages.insertBefore(
          'inside',
          'attr-name',
          {
            spread: {
              pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
              inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ },
            },
          },
          e.languages.jsx.tag,
        ),
        e.languages.insertBefore(
          'inside',
          'attr-value',
          {
            script: {
              pattern: /=(\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
              inside: { 'script-punctuation': { pattern: /^=(?={)/, alias: 'punctuation' }, rest: e.languages.jsx },
              alias: 'language-javascript',
            },
          },
          e.languages.jsx.tag,
        );
      var n = function(e) {
          return e
            ? 'string' == typeof e
              ? e
              : 'string' == typeof e.content
              ? e.content
              : e.content.map(n).join('')
            : '';
        },
        a = function(t) {
          for (var i = [], r = 0; r < t.length; r++) {
            var s = t[r],
              o = !1;
            if (
              ('string' != typeof s &&
                ('tag' === s.type && s.content[0] && 'tag' === s.content[0].type
                  ? '</' === s.content[0].content[0].content
                    ? i.length > 0 && i[i.length - 1].tagName === n(s.content[0].content[1]) && i.pop()
                    : '/>' === s.content[s.content.length - 1].content ||
                      i.push({ tagName: n(s.content[0].content[1]), openedBraces: 0 })
                  : i.length > 0 && 'punctuation' === s.type && '{' === s.content
                  ? i[i.length - 1].openedBraces++
                  : i.length > 0 && i[i.length - 1].openedBraces > 0 && 'punctuation' === s.type && '}' === s.content
                  ? i[i.length - 1].openedBraces--
                  : (o = !0)),
              (o || 'string' == typeof s) && i.length > 0 && 0 === i[i.length - 1].openedBraces)
            ) {
              var l = n(s);
              r < t.length - 1 &&
                ('string' == typeof t[r + 1] || 'plain-text' === t[r + 1].type) &&
                ((l += n(t[r + 1])), t.splice(r + 1, 1)),
                r > 0 &&
                  ('string' == typeof t[r - 1] || 'plain-text' === t[r - 1].type) &&
                  ((l = n(t[r - 1]) + l), t.splice(r - 1, 1), r--),
                (t[r] = new e.Token('plain-text', l, null, l));
            }
            s.content && 'string' != typeof s.content && a(s.content);
          }
        };
      e.hooks.add('after-tokenize', function(e) {
        ('jsx' !== e.language && 'tsx' !== e.language) || a(e.tokens);
      });
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      (e.languages.kotlin = e.languages.extend('clike', {
        keyword: {
          pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
          lookbehind: !0,
        },
        function: [/\w+(?=\s*\()/, { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 }],
        number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
        operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
      })),
        delete e.languages.kotlin['class-name'],
        e.languages.insertBefore('kotlin', 'string', {
          'raw-string': { pattern: /("""|''')[\s\S]*?\1/, alias: 'string' },
        }),
        e.languages.insertBefore('kotlin', 'keyword', {
          annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: 'builtin' },
        }),
        e.languages.insertBefore('kotlin', 'function', { label: { pattern: /\w+@|@\w+/, alias: 'symbol' } });
      var t = [
        {
          pattern: /\$\{[^}]+\}/,
          inside: { delimiter: { pattern: /^\$\{|\}$/, alias: 'variable' }, rest: e.languages.kotlin },
        },
        { pattern: /\$\w+/, alias: 'variable' },
      ];
      e.languages.kotlin.string.inside = e.languages.kotlin['raw-string'].inside = { interpolation: t };
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      var t = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
        n = { 'equation-command': { pattern: t, alias: 'regex' } };
      (e.languages.latex = {
        comment: /%.*/m,
        cdata: { pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/, lookbehind: !0 },
        equation: [
          {
            pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
            inside: n,
            alias: 'string',
          },
          {
            pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: !0,
            inside: n,
            alias: 'string',
          },
        ],
        keyword: {
          pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: !0,
        },
        url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
        headline: {
          pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
          lookbehind: !0,
          alias: 'class-name',
        },
        function: { pattern: t, alias: 'selector' },
        punctuation: /[[\]{}&]/,
      }),
        (e.languages.tex = e.languages.latex),
        (e.languages.context = e.languages.latex);
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      function t(e) {
        return RegExp('(\\()' + e + '(?=[\\s\\)])');
      }
      function n(e) {
        return RegExp('([\\s([])' + e + '(?=[\\s)])');
      }
      var a = '[-+*/_~!@$%^=<>{}\\w]+',
        i = '(\\()',
        r = {
          heading: { pattern: /;;;.*/, alias: ['comment', 'title'] },
          comment: /;.*/,
          string: {
            pattern: /"(?:[^"\\]|\\.)*"/,
            greedy: !0,
            inside: { argument: /[-A-Z]+(?=[.,\s])/, symbol: RegExp('`' + a + "'") },
          },
          'quoted-symbol': { pattern: RegExp("#?'" + a), alias: ['variable', 'symbol'] },
          'lisp-property': { pattern: RegExp(':' + a), alias: 'property' },
          splice: { pattern: RegExp(',@?' + a), alias: ['symbol', 'variable'] },
          keyword: [
            {
              pattern: RegExp(
                i +
                  '(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)(?=\\s)',
              ),
              lookbehind: !0,
            },
            { pattern: RegExp(i + '(?:for|do|collect|return|finally|append|concat|in|by)(?=\\s)'), lookbehind: !0 },
          ],
          declare: { pattern: t('declare'), lookbehind: !0, alias: 'keyword' },
          interactive: { pattern: t('interactive'), lookbehind: !0, alias: 'keyword' },
          boolean: { pattern: n('(?:t|nil)'), lookbehind: !0 },
          number: { pattern: n('[-+]?\\d+(?:\\.\\d*)?'), lookbehind: !0 },
          defvar: {
            pattern: RegExp(i + 'def(?:var|const|custom|group)\\s+' + a),
            lookbehind: !0,
            inside: { keyword: /^def[a-z]+/, variable: RegExp(a) },
          },
          defun: {
            pattern: RegExp(i + '(?:cl-)?(?:defun\\*?|defmacro)\\s+' + a + '\\s+\\([\\s\\S]*?\\)'),
            lookbehind: !0,
            inside: {
              keyword: /^(?:cl-)?def\S+/,
              arguments: null,
              function: { pattern: RegExp('(^\\s)' + a), lookbehind: !0 },
              punctuation: /[()]/,
            },
          },
          lambda: {
            pattern: RegExp(i + 'lambda\\s+\\((?:&?' + a + '\\s*)*\\)'),
            lookbehind: !0,
            inside: { keyword: /^lambda/, arguments: null, punctuation: /[()]/ },
          },
          car: { pattern: RegExp(i + a), lookbehind: !0 },
          punctuation: [/(['`,]?\(|[)\[\]])/, { pattern: /(\s)\.(?=\s)/, lookbehind: !0 }],
        },
        s = {
          'lisp-marker': RegExp('&[-+*/_~!@$%^=<>{}\\w]+'),
          rest: {
            argument: { pattern: RegExp(a), alias: 'variable' },
            varform: {
              pattern: RegExp(i + a + '\\s+\\S[\\s\\S]*(?=\\))'),
              lookbehind: !0,
              inside: { string: r.string, boolean: r.boolean, number: r.number, symbol: r.symbol, punctuation: /[()]/ },
            },
          },
        },
        o = '\\S+(?:\\s+\\S+)*',
        l = {
          pattern: RegExp(i + '[\\s\\S]*(?=\\))'),
          lookbehind: !0,
          inside: {
            'rest-vars': { pattern: RegExp('&(?:rest|body)\\s+' + o), inside: s },
            'other-marker-vars': { pattern: RegExp('&(?:optional|aux)\\s+' + o), inside: s },
            keys: { pattern: RegExp('&key\\s+' + o + '(?:\\s+&allow-other-keys)?'), inside: s },
            argument: { pattern: RegExp(a), alias: 'variable' },
            punctuation: /[()]/,
          },
        };
      (r.lambda.inside.arguments = l),
        (r.defun.inside.arguments = e.util.clone(l)),
        (r.defun.inside.arguments.inside.sublist = l),
        (e.languages.lisp = r),
        (e.languages.elisp = r),
        (e.languages.emacs = r),
        (e.languages['emacs-lisp'] = r);
    })(Prism);
  },
  function(e, t) {
    Prism.languages.lua = {
      comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
      string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
        greedy: !0,
      },
      number: /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
      keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
      function: /(?!\d)\w+(?=\s*(?:[({]))/,
      operator: [/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/, { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 }],
      punctuation: /[\[\](){},;]|\.+|:+/,
    };
  },
  function(e, t) {
    Prism.languages.makefile = {
      comment: { pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/, lookbehind: !0 },
      string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
      symbol: { pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m, inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ } },
      variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
      keyword: [
        /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
        {
          pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
          lookbehind: !0,
        },
      ],
      operator: /(?:::|[?:+!])?=|[|@]/,
      punctuation: /[:;(){}]/,
    };
  },
  function(e, t) {
    !(function(e) {
      var t = /(?:\\.|[^\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))/.source;
      function n(e, n) {
        return (
          (e = e.replace(/<inner>/g, t)),
          n && (e = e + '|' + e.replace(/_/g, '\\*')),
          RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + e + ')')
        );
      }
      var a = /(?:\\.|``.+?``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,
        i = /\|?__(?:\|__)+\|?(?:(?:\r?\n|\r)|$)/.source.replace(/__/g, a),
        r = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\r?\n|\r)/.source;
      (e.languages.markdown = e.languages.extend('markup', {})),
        e.languages.insertBefore('markdown', 'prolog', {
          blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
          table: {
            pattern: RegExp('^' + i + r + '(?:' + i + ')*', 'm'),
            inside: {
              'table-data-rows': {
                pattern: RegExp('^(' + i + r + ')(?:' + i + ')*$'),
                lookbehind: !0,
                inside: { 'table-data': { pattern: RegExp(a), inside: e.languages.markdown }, punctuation: /\|/ },
              },
              'table-line': {
                pattern: RegExp('^(' + i + ')' + r + '$'),
                lookbehind: !0,
                inside: { punctuation: /\||:?-{3,}:?/ },
              },
              'table-header-row': {
                pattern: RegExp('^' + i + '$'),
                inside: {
                  'table-header': { pattern: RegExp(a), alias: 'important', inside: e.languages.markdown },
                  punctuation: /\|/,
                },
              },
            },
          },
          code: [
            {
              pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,
              lookbehind: !0,
              alias: 'keyword',
            },
            { pattern: /``.+?``|`[^`\r\n]+`/, alias: 'keyword' },
            {
              pattern: /^```[\s\S]*?^```$/m,
              greedy: !0,
              inside: {
                'code-block': { pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m, lookbehind: !0 },
                'code-language': { pattern: /^(```).+/, lookbehind: !0 },
                punctuation: /```/,
              },
            },
          ],
          title: [
            {
              pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,
              alias: 'important',
              inside: { punctuation: /==+$|--+$/ },
            },
            { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } },
          ],
          hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
          list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
          'url-reference': {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
              string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              punctuation: /^[\[\]!:]|[<>]/,
            },
            alias: 'url',
          },
          bold: {
            pattern: n(/__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__/.source, !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ },
          },
          italic: {
            pattern: n(/_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_/.source, !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ },
          },
          strike: {
            pattern: n(/(~~?)(?:(?!~)<inner>)+?\2/.source, !1),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ },
          },
          url: {
            pattern: n(
              /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source,
              !1,
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
              variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
              content: { pattern: /(^!?\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
              string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
            },
          },
        }),
        ['url', 'bold', 'italic', 'strike'].forEach(function(t) {
          ['url', 'bold', 'italic', 'strike'].forEach(function(n) {
            t !== n && (e.languages.markdown[t].inside.content.inside[n] = e.languages.markdown[n]);
          });
        }),
        e.hooks.add('after-tokenize', function(e) {
          ('markdown' !== e.language && 'md' !== e.language) ||
            (function e(t) {
              if (t && 'string' != typeof t)
                for (var n = 0, a = t.length; n < a; n++) {
                  var i = t[n];
                  if ('code' === i.type) {
                    var r = i.content[1],
                      s = i.content[3];
                    if (
                      r &&
                      s &&
                      'code-language' === r.type &&
                      'code-block' === s.type &&
                      'string' == typeof r.content
                    ) {
                      var o =
                        'language-' +
                        r.content
                          .trim()
                          .split(/\s+/)[0]
                          .toLowerCase();
                      s.alias
                        ? 'string' == typeof s.alias
                          ? (s.alias = [s.alias, o])
                          : s.alias.push(o)
                        : (s.alias = [o]);
                    }
                  } else e(i.content);
                }
            })(e.tokens);
        }),
        e.hooks.add('wrap', function(t) {
          if ('code-block' === t.type) {
            for (var n = '', a = 0, i = t.classes.length; a < i; a++) {
              var r = t.classes[a],
                s = /language-(.+)/.exec(r);
              if (s) {
                n = s[1];
                break;
              }
            }
            var o = e.languages[n];
            if (o) {
              var l = t.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
              t.content = e.highlight(l, o, n);
            } else if (n && 'none' !== n && e.plugins.autoloader) {
              var c = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
              (t.attributes.id = c),
                e.plugins.autoloader.loadLanguages(n, function() {
                  var t = document.getElementById(c);
                  t && (t.innerHTML = e.highlight(t.textContent, e.languages[n], n));
                });
            }
          }
        }),
        (e.languages.md = e.languages.markdown);
    })(Prism);
  },
  function(e, t) {
    (Prism.languages.markup = {
      comment: /<!--[\s\S]*?-->/,
      prolog: /<\?[\s\S]+?\?>/,
      doctype: /<!DOCTYPE[\s\S]+?>/i,
      cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
        greedy: !0,
        inside: {
          tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
          'attr-value': {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
            inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] },
          },
          punctuation: /\/?>/,
          'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
        },
      },
      entity: /&#?[\da-z]{1,8};/i,
    }),
      (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
      Prism.hooks.add('wrap', function(e) {
        'entity' === e.type && (e.attributes.title = e.content.replace(/&amp;/, '&'));
      }),
      Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
        value: function(e, t) {
          var n = {};
          (n['language-' + t] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[t],
          }),
            (n.cdata = /^<!\[CDATA\[|\]\]>$/i);
          var a = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: n } };
          a['language-' + t] = { pattern: /[\s\S]+/, inside: Prism.languages[t] };
          var i = {};
          (i[e] = {
            pattern: RegExp(
              /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, e),
              'i',
            ),
            lookbehind: !0,
            greedy: !0,
            inside: a,
          }),
            Prism.languages.insertBefore('markup', 'cdata', i);
        },
      }),
      (Prism.languages.xml = Prism.languages.extend('markup', {})),
      (Prism.languages.html = Prism.languages.markup),
      (Prism.languages.mathml = Prism.languages.markup),
      (Prism.languages.svg = Prism.languages.markup);
  },
  function(e, t) {
    Prism.languages.nasm = {
      comment: /;.*$/m,
      string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      label: { pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m, lookbehind: !0, alias: 'function' },
      keyword: [
        /\[?BITS (?:16|32|64)\]?/,
        { pattern: /(^\s*)section\s*[a-zA-Z.]+:?/im, lookbehind: !0 },
        /(?:extern|global)[^;\r\n]*/i,
        /(?:CPU|FLOAT|DEFAULT).*$/m,
      ],
      register: {
        pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s)\b/i,
        alias: 'variable',
      },
      number: /(?:\b|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,
      operator: /[\[\]*+\-\/%<>=&|$!]/,
    };
  },
  function(e, t) {
    (Prism.languages.nginx = Prism.languages.extend('clike', {
      comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
      keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
    })),
      Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i });
  },
  function(e, t) {
    (Prism.languages.objectivec = Prism.languages.extend('c', {
      keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
      string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
      operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
    })),
      delete Prism.languages.objectivec['class-name'];
  },
  function(e, t) {
    Prism.languages.ocaml = {
      comment: /\(\*[\s\S]*?\*\)/,
      string: [
        { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
        { pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i, greedy: !0 },
      ],
      number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
      type: { pattern: /\B['`]\w*/, alias: 'variable' },
      directive: { pattern: /\B#\w+/, alias: 'function' },
      keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
      boolean: /\b(?:false|true)\b/,
      operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
      punctuation: /[(){}\[\]|_.,:;]/,
    };
  },
  function(e, t) {
    !(function(e) {
      var t = /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/;
      (e.languages.protobuf = e.languages.extend('clike', {
        'class-name': { pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/, lookbehind: !0 },
        keyword: /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|service|syntax|to)\b/,
      })),
        e.languages.insertBefore('protobuf', 'operator', {
          map: {
            pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[A-Za-z_]\w*\s*[=;])/,
            alias: 'class-name',
            inside: { punctuation: /[<>.,]/, builtin: t },
          },
          builtin: t,
          'positional-class-name': {
            pattern: /(?:\b|\B\.)[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s+[A-Za-z_]\w*\s*[=;])/,
            alias: 'class-name',
            inside: { punctuation: /\./ },
          },
          annotation: { pattern: /(\[\s*)[A-Za-z_]\w*(?=\s*=)/, lookbehind: !0 },
        });
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      e.languages.pug = {
        comment: { pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m, lookbehind: !0 },
        'multiline-script': {
          pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: !0,
          inside: { rest: e.languages.javascript },
        },
        filter: {
          pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: !0,
          inside: { 'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' } },
        },
        'multiline-plain-text': {
          pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: !0,
        },
        markup: { pattern: /(^[\t ]*)<.+/m, lookbehind: !0, inside: { rest: e.languages.markup } },
        doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
        'flow-control': {
          pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
          lookbehind: !0,
          inside: {
            each: { pattern: /^each .+? in\b/, inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ } },
            branch: { pattern: /^(?:if|unless|else|case|when|default|while)\b/, alias: 'keyword' },
            rest: e.languages.javascript,
          },
        },
        keyword: { pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m, lookbehind: !0 },
        mixin: [
          {
            pattern: /(^[\t ]*)mixin .+/m,
            lookbehind: !0,
            inside: { keyword: /^mixin/, function: /\w+(?=\s*\(|\s*$)/, punctuation: /[(),.]/ },
          },
          {
            pattern: /(^[\t ]*)\+.+/m,
            lookbehind: !0,
            inside: { name: { pattern: /^\+\w+/, alias: 'function' }, rest: e.languages.javascript },
          },
        ],
        script: {
          pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
          lookbehind: !0,
          inside: { rest: e.languages.javascript },
        },
        'plain-text': { pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m, lookbehind: !0 },
        tag: {
          pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
          lookbehind: !0,
          inside: {
            attributes: [
              { pattern: /&[^(]+\([^)]+\)/, inside: { rest: e.languages.javascript } },
              {
                pattern: /\([^)]+\)/,
                inside: {
                  'attr-value': {
                    pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                    lookbehind: !0,
                    inside: { rest: e.languages.javascript },
                  },
                  'attr-name': /[\w-]+(?=\s*!?=|\s*[,)])/,
                  punctuation: /[!=(),]+/,
                },
              },
            ],
            punctuation: /:/,
          },
        },
        code: [{ pattern: /(^[\t ]*(?:-|!?=)).+/m, lookbehind: !0, inside: { rest: e.languages.javascript } }],
        punctuation: /[.\-!=|]+/,
      };
      for (
        var t = /(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/.source,
          n = [
            { filter: 'atpl', language: 'twig' },
            { filter: 'coffee', language: 'coffeescript' },
            'ejs',
            'handlebars',
            'less',
            'livescript',
            'markdown',
            { filter: 'sass', language: 'scss' },
            'stylus',
          ],
          a = {},
          i = 0,
          r = n.length;
        i < r;
        i++
      ) {
        var s = n[i];
        (s = 'string' == typeof s ? { filter: s, language: s } : s),
          e.languages[s.language] &&
            (a['filter-' + s.filter] = {
              pattern: RegExp(t.replace('{{filter_name}}', s.filter), 'm'),
              lookbehind: !0,
              inside: { 'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' }, rest: e.languages[s.language] },
            });
      }
      e.languages.insertBefore('pug', 'filter', a);
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      var t = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' },
        n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,
        a = /\\[wsd]|\.|\\p{[^{}]+}/i,
        i = '(?:[^\\\\-]|' + n.source + ')',
        r = RegExp(i + '-' + i),
        s = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: 'variable' },
        o = [/\\(?![123][0-7]{2})[1-9]/, { pattern: /\\k<[^<>']+>/, inside: { 'group-name': s } }];
      (e.languages.regex = {
        charset: {
          pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
          lookbehind: !0,
          inside: {
            'charset-negation': { pattern: /(^\[)\^/, lookbehind: !0 },
            'charset-punctuation': /^\[|\]$/,
            range: { pattern: r, inside: { escape: n, 'range-punctuation': /-/ } },
            'special-escape': t,
            charclass: a,
            backreference: o,
            escape: n,
          },
        },
        'special-escape': t,
        charclass: a,
        backreference: o,
        anchor: /[$^]|\\[ABbGZz]/,
        escape: n,
        group: [
          {
            pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
            inside: { 'group-name': s },
          },
          /\)/,
        ],
        quantifier: /[+*?]|\{(?:\d+,?\d*)\}/,
        alternation: /\|/,
      }),
        ['actionscript', 'coffescript', 'flow', 'javascript', 'typescript', 'vala'].forEach(function(t) {
          var n = e.languages[t];
          n &&
            (n.regex.inside = {
              'regex-flags': /[a-z]+$/,
              'regex-delimiter': /^\/|\/$/,
              'language-regex': { pattern: /[\s\S]+/, inside: e.languages.regex },
            });
        });
    })(Prism);
  },
  function(e, t) {
    !(function(e) {
      e.languages.ruby = e.languages.extend('clike', {
        comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
        keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/,
      });
      var t = {
        pattern: /#\{[^}]+\}/,
        inside: { delimiter: { pattern: /^#\{|\}$/, alias: 'tag' }, rest: e.languages.ruby },
      };
      delete e.languages.ruby.function,
        e.languages.insertBefore('ruby', 'keyword', {
          regex: [
            {
              pattern: /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t },
            },
            { pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/, greedy: !0, inside: { interpolation: t } },
            {
              pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
              greedy: !0,
              inside: { interpolation: t },
            },
            { pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/, greedy: !0, inside: { interpolation: t } },
            { pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/, greedy: !0, inside: { interpolation: t } },
            {
              pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
              lookbehind: !0,
              greedy: !0,
            },
          ],
          variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
          symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
          'method-definition': {
            pattern: /(\bdef\s+)[\w.]+/,
            lookbehind: !0,
            inside: { function: /\w+$/, rest: e.languages.ruby },
          },
        }),
        e.languages.insertBefore('ruby', 'number', {
          builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
          constant: /\b[A-Z]\w*(?:[?!]|\b)/,
        }),
        (e.languages.ruby.string = [
          {
            pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: !0,
            inside: { interpolation: t },
          },
          { pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0, inside: { interpolation: t } },
          {
            pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
            greedy: !0,
            inside: { interpolation: t },
          },
          { pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/, greedy: !0, inside: { interpolation: t } },
          { pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0, inside: { interpolation: t } },
          {
            pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
            inside: { interpolation: t },
          },
        ]),
        (e.languages.rb = e.languages.ruby);
    })(Prism);
  },
  function(e, t) {
    Prism.languages.rust = {
      comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
      ],
      string: [
        { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
        { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
      ],
      char: { pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/, alias: 'string' },
      'lifetime-annotation': { pattern: /'[^\s>']+/, alias: 'symbol' },
      keyword: /\b(?:abstract|alignof|as|async|await|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
      attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: 'attr-name' },
      function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
      'macro-rules': { pattern: /\w+!/, alias: 'function' },
      number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
      'closure-params': { pattern: /\|[^|]*\|(?=\s*[{-])/, inside: { punctuation: /[|:,]/, operator: /[&*]/ } },
      punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
      operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
    };
  },
  function(e, t) {
    (Prism.languages.scala = Prism.languages.extend('java', {
      keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
      string: [
        { pattern: /"""[\s\S]*?"""/, greedy: !0 },
        { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
      ],
      builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
      number: /\b0x[\da-f]*\.?[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e\d+)?[dfl]?/i,
      symbol: /'[^\d\s\\]\w*/,
    })),
      delete Prism.languages.scala['class-name'],
      delete Prism.languages.scala.function;
  },
  function(e, t) {
    Prism.languages.sql = {
      comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
      variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
      string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
      function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
      keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
      boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
      number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
      operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
      punctuation: /[;[\]()`,.]/,
    };
  },
  function(e, t) {
    (Prism.languages.swift = Prism.languages.extend('clike', {
      string: {
        pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: {
          interpolation: {
            pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
            inside: { delimiter: { pattern: /^\\\(|\)$/, alias: 'variable' } },
          },
        },
      },
      keyword: /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
      number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
      constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
      atrule: /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
      builtin: /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
    })),
      (Prism.languages.swift.string.inside.interpolation.inside.rest = Prism.languages.swift);
  },
  function(e, t) {
    !(function(e) {
      var t = '(?:[\\w-]+|\'[^\'\n\r]*\'|"(?:\\.|[^\\\\"\r\n])*")';
      e.languages.toml = {
        comment: { pattern: /#.*/, greedy: !0 },
        table: {
          pattern: RegExp('(^\\s*\\[\\s*(?:\\[\\s*)?)' + t + '(?:\\s*\\.\\s*' + t + ')*(?=\\s*\\])', 'm'),
          lookbehind: !0,
          greedy: !0,
          alias: 'class-name',
        },
        key: {
          pattern: RegExp('(^\\s*|[{,]\\s*)' + t + '(?:\\s*\\.\\s*' + t + ')*(?=\\s*=)', 'm'),
          lookbehind: !0,
          greedy: !0,
          alias: 'property',
        },
        string: { pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
        date: [
          { pattern: /\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?/i, alias: 'number' },
          { pattern: /\d{2}:\d{2}:\d{2}(?:\.\d+)?/i, alias: 'number' },
        ],
        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?(?:inf|nan)\b/,
        boolean: /\b(?:true|false)\b/,
        punctuation: /[.,=[\]{}]/,
      };
    })(Prism);
  },
  function(e, t) {
    var n = Prism.util.clone(Prism.languages.typescript);
    Prism.languages.tsx = Prism.languages.extend('jsx', n);
  },
  function(e, t) {
    (Prism.languages.typescript = Prism.languages.extend('javascript', {
      keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|var|void|while|with|yield)\b/,
      builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
    })),
      (Prism.languages.ts = Prism.languages.typescript);
  },
  function(e, t) {
    Prism.languages.vim = {
      string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
      comment: /".*/,
      function: /\w+(?=\()/,
      keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
      builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
      number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
      operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
      punctuation: /[{}[\](),;:]/,
    };
  },
  function(e, t) {
    Prism.languages.wasm = {
      comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
      string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
      keyword: [
        { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
        {
          pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
          inside: { punctuation: /\./ },
        },
        /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
      ],
      variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
      number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
      punctuation: /[()]/,
    };
  },
  function(e, t) {
    (Prism.languages.yaml = {
      scalar: {
        pattern: /([\-:]\s*(?:![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\2[^\r\n]+)*)/,
        lookbehind: !0,
        alias: 'string',
      },
      comment: /#.*/,
      key: {
        pattern: /(\s*(?:^|[:\-,[{\r\n?])[ \t]*(?:![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,
        lookbehind: !0,
        alias: 'atrule',
      },
      directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
      datetime: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?)(?=[ \t]*(?:$|,|]|}))/m,
        lookbehind: !0,
        alias: 'number',
      },
      boolean: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:true|false)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: 'important',
      },
      null: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)(?:null|~)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
        alias: 'important',
      },
      string: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)("|')(?:(?!\2)[^\\\r\n]|\\.)*\2(?=[ \t]*(?:$|,|]|}|\s*#))/m,
        lookbehind: !0,
        greedy: !0,
      },
      number: {
        pattern: /([:\-,[{]\s*(?:![^\s]+)?[ \t]*)[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+\.?\d*|\.?\d+)(?:e[+-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,
        lookbehind: !0,
      },
      tag: /![^\s]+/,
      important: /[&*][\w]+/,
      punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
    }),
      (Prism.languages.yml = Prism.languages.yaml);
  },
  function(e, t, n) {
    'use strict';
    n.r(t);
    var a = n(0),
      i = n.n(a);
    n(2),
      n(3),
      n(4),
      n(5),
      n(6),
      n(7),
      n(8),
      n(9),
      n(10),
      n(11),
      n(12),
      n(13),
      n(14),
      n(15),
      n(16),
      n(17),
      n(18),
      n(19),
      n(20),
      n(21),
      n(22),
      n(23),
      n(24),
      n(25),
      n(26),
      n(27),
      n(28),
      n(29),
      n(30),
      n(31),
      n(32),
      n(33),
      n(34),
      n(35),
      n(36),
      n(37),
      n(38),
      n(39),
      n(40),
      n(41),
      n(42);
    function r(e) {
      return new Promise(function(t, n, a) {
        (a = new XMLHttpRequest()).open('GET', e, (a.withCredentials = !0)),
          (a.onload = function() {
            200 === a.status ? t() : n();
          }),
          a.send();
      });
    }
    var s,
      o =
        (s = document.createElement('link')).relList && s.relList.supports && s.relList.supports('prefetch')
          ? function(e) {
              return new Promise(function(t, n, a) {
                ((a = document.createElement('link')).rel = 'prefetch'),
                  (a.href = e),
                  (a.onload = t),
                  (a.onerror = n),
                  document.head.appendChild(a);
              });
            }
          : r,
      l =
        window.requestIdleCallback ||
        function(e) {
          var t = Date.now();
          return setTimeout(function() {
            e({
              didTimeout: !1,
              timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - t));
              },
            });
          }, 1);
        },
      c = new Set();
    function d(e, t, n) {
      if (!(n = navigator.connection) || (!n.saveData && !/2g/.test(n.effectiveType)))
        return Promise.all(
          [].concat(e).map(function(e) {
            if (!c.has(e))
              return (
                c.add(e),
                (t
                  ? function(e) {
                      return window.fetch ? fetch(e, { credentials: 'include' }) : r(e);
                    }
                  : o)(new URL(e, location.href).toString())
              );
          }),
        );
    }
    !(function(e) {
      if ((e || (e = {}), window.IntersectionObserver)) {
        var t = (function(e) {
            e = e || 1;
            var t = [],
              n = 0;
            function a() {
              n < e && t.length > 0 && (t.shift()(), n++);
            }
            return [
              function(e) {
                t.push(e) > 1 || a();
              },
              function() {
                n--, a();
              },
            ];
          })(e.throttle || 1 / 0),
          n = t[0],
          a = t[1],
          i = e.limit || 1 / 0,
          r = e.origins || [location.hostname],
          s = e.ignores || [],
          o = e.timeoutFn || l,
          p = new IntersectionObserver(function(t) {
            t.forEach(function(t) {
              t.isIntersecting &&
                (p.unobserve((t = t.target)),
                c.size < i &&
                  n(function() {
                    d(t.href, e.priority)
                      .then(a)
                      .catch(function(t) {
                        a(), e.onError && e.onError(t);
                      });
                  }));
            });
          });
        o(
          function() {
            (e.el || document).querySelectorAll('a').forEach(function(e) {
              (r.length && !r.includes(e.hostname)) ||
                (function e(t, n) {
                  return Array.isArray(n)
                    ? n.some(function(n) {
                        return e(t, n);
                      })
                    : (n.test || n).call(n, t.href, t);
                })(e, s) ||
                p.observe(e);
            });
          },
          { timeout: e.timeout || 2e3 },
        );
      }
    })(),
      document.removeEventListener('DOMContentLoaded', i.a.highlightAll, !1);
    const p = document.querySelectorAll('pre code'),
      u = (e, t) => {
        const n = `highlight-${t}`,
          a = e.parentNode,
          r = e.className.match(/language-.+:(.+)/);
        (a.id = n),
          r &&
            ((e.className = e.className.replace(/(language-.+)(:.+)/, '$1')),
            a.insertAdjacentHTML('afterbegin', `<span class="highlight-filename">${r[1]}</span>`)),
          i.a.highlightElement(e);
      };
    p && Array.from(p).forEach(u);
  },
]);
