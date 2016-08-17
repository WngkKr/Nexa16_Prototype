//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html
//
//==============================================================================

// ==============================================================================
// nexacro system Utility API's
// ==============================================================================

// ============================================================================
if (nexacro._Browser != "Runtime")
{
    "use strict";

    var _process = true;

    if (window._popup && window.opener && window.opener != window)
    {
        window._application = window.opener._application;
        window.system = window.opener.system;
        //window._pApplication = window.opener.nexacro.Application;

     //   window.nexacro._typedefinition_url = window.opener.nexacro._typedefinition_url;
     //   window.nexacro._project_url = window.opener.nexacro._project_url;
     //   window.nexacro._project_fullurl = window.opener.nexacro._project_fullurl;
     //   window.nexacro._addlocalthemecacheurl = window.opener.nexacro._addlocalthemecacheurl;
     //   window.nexacro._curscreen = window.opener.nexacro._curscreen;
     //   window.nexacro._initvaluefileid = window.opener.nexacro._initvaluefileid;
      //  window.nexacro._initvalue = window.opener.nexacro._initvalue;
        if (window.opener.nexacro.Application)
        	window.nexacro.Application = window.opener.nexacro.Application;
        else
        {
            var _parent = window.opener;
            while (!_parent.nexacro.Application)
                _parent = _parent.opener;

            if (_parent)
            {
            	window.nexacro.Application = _parent.nexacro.Application;
            }
        }
    }


    if (!nexacro._Init_systembase_html)
    {
        nexacro._Init_systembase_html = true;

        //==============================================================================
        // trace Function
        //==============================================================================
        if (window.console)
        {
            window.trace = function ()
            {
                var a = arguments;
                var n = arguments.length;
                switch (n)
                {
                    case 1:
                        window.console.log(a[0] + '');
                        break;
                    case 2:
                        window.console.log(a[0], ' ', a[1]);
                        break;
                    case 3:
                        window.console.log(a[0], ' ', a[1], ' ', a[2]);
                        break;
                    case 4:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3]);
                        break;
                    case 5:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4]);
                        break;
                    case 6:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5]);
                        break;
                    case 7:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6]);
                        break;
                    case 8:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7]);
                        break;
                    case 9:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7], ' ', a[8]);
                        break;
                    case 10:
                        window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7], ' ', a[8], ' ', a[9]);
                        break;
                }
            };
        }
        else
        {
            trace = function ()
            {
                if (nexacro._OS == "Windows Phone")
                {
                    var str = arguments[0];
                    var params = '{"message":"' + str + '"}';
                    var jsonstr = 'DebugConsole,Debug,' + this._id + ',' + params;
                    window.external.Notify(jsonstr);
                }
                else if (nexacro._Browser == "IE")
                {
                    // IE8 with VisualStudio
                    var str = "";
                    var a = arguments;
                    for (var i = 0; i < a.length; i++)
                    {
                        str += a[i];
                        str += ' ';
                    }

                    // DebugTrace -> str
                    var aa = 0;
                }
            };
        }

        nexacro._nexacroconsole = function (str, w, h)
        {

           
            var target = document.getElementById("mainframe");
            var console = document.getElementById("nexacroconsole");
            
            if (!console)
            {
                console = document.createElement("div");
                console.id = "nexacroconsole";
                //console.className = "nexacroconsole";
                console.style.backgroundColor = "black";
                console.style.color = "white";
                console.style.fontSize = "34";
                console.style.position = "absolute";
                console.style.left = 400;
                console.style.width = 600;
                console.style.height = 1000;

                if (w)
                {
                    console.style.width = (parseInt(w) | 0) + "px";
                }
                if (h)
                {
                    console.style.height = (parseInt(h) | 0) + "px";
                }

                target && target.appendChild(console);
            }
            
            console.innerHTML = str + "<br>" + console.innerHTML;
        };

        //==============================================================================
        // Browser Type detection
        //==============================================================================
        // i:HTML5, 2:Legacy, 9:Runtime
        nexacro._Browser_ColorAlpha = false;
        nexacro._Browser_RoundBorder = 0; // 0:none, 1:HTML5/Runtime, 2:Legacy
        nexacro._Browser_RoundShadow = false;
        nexacro._Browser_Gradient = 0; // 0:none, 1:HTML5/Runtime, 2:Legacy
        nexacro._Browser_Transform = 0; // 0:none, 1:HTML5/Runtime, 2:Legacy
        nexacro._Browser_Transform3d = 0; // 0:none, 1:HTML5/Runtime, 2:Legacy
        nexacro._Browser_BorderImage = 0; // 0:none, 1:HTML5/Runtime, 2:Legacy

        nexacro._OS = "";           // (like systemtype)    - Windows, Windows Phone, iOS, Android, Mac OS, Linux
        nexacro._OSVersion = "";    // (OS Version String)  - Windows 7, Linux, iOS 5, Android 3.1, Mac OS X, ...
        nexacro._DEVICE = "";       // Web/Desktop Runtime : "", Mobile App(Android Runtime, Hybrid) : mobideproducttype
        nexacro._SystemType = "";   // win32(Win64 없음), ipad, iphone, android, winphone, mac, linux
        nexacro._BrowserLang = "";
        if (nexacro._Browser == "IE")
        {
            if (nexacro._BrowserVersion >= 9)
            {
                nexacro._Browser_ColorAlpha = true;
                nexacro._Browser_RoundBorder = 1;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Transform = 2;
            }
            if (nexacro._BrowserVersion >= 10)
            {
                nexacro._Browser_Gradient = 1;
                nexacro._Browser_Transform = 1;
                nexacro._Browser_Transform3d = 1;
            }
            if (nexacro._BrowserVersion >= 11)
            {
                nexacro._Browser_BorderImage = 1;
            }
        }
        else if (nexacro._Browser == "Chrome")
        {
            nexacro._Browser_ColorAlpha = true;
            if (nexacro._BrowserVersion >= 4)
            {
                nexacro._Browser_RoundBorder = 2;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Transform = 2;
            }
            if (nexacro._BrowserVersion >= 5)
            {
                nexacro._Browser_RoundBorder = 1;
            }
            if (nexacro._BrowserVersion >= 7)
            {
                nexacro._Browser_BorderImage = 2;
            }
            if (nexacro._BrowserVersion >= 10)
            {
                nexacro._Browser_Gradient = 2;
            }
            if (nexacro._BrowserVersion >= 12)
            {
                nexacro._Browser_Transform3d = 2;
            }
            if (nexacro._BrowserVersion >= 16)
            {
                nexacro._Browser_BorderImage = 1;
            }
            if (nexacro._BrowserVersion >= 26)
            {
                nexacro._Browser_Gradient = 1;
            }
            if (nexacro._BrowserVersion >= 36)
            {
                nexacro._Browser_Transform = 1;
                nexacro._Browser_Transform3d = 1;
            }
        }
        else if (nexacro._Browser == "Gecko")
        {
            nexacro._Browser_ColorAlpha = true;
            if (nexacro._BrowserVersion >= 3)
            {
                nexacro._Browser_RoundBorder = 2;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Gradient = 2;
                nexacro._Browser_Transform = 2;
                nexacro._Browser_BorderImage = 2;
            }
            if (nexacro._BrowserVersion >= 4)
            {
                nexacro._Browser_RoundBorder = 1;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Transform3d = 2;
            }
            if (nexacro._BrowserVersion >= 15)
            {
                nexacro._Browser_BorderImage = 1;
            }
            if (nexacro._BrowserVersion >= 16)
            {
                nexacro._Browser_Gradient = 1;
                nexacro._Browser_Transform = 1;
                nexacro._Browser_Transform3d = 1;
            }
        }
        else if (nexacro._Browser == "Opera")
        {
            nexacro._Browser_ColorAlpha = true;
            if (nexacro._BrowserVersion >= 11)
            {
                nexacro._Browser_RoundBorder = 1;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Gradient = 2;
                nexacro._Browser_Transform = 2;
                nexacro._Browser_BorderImage = 2;
            }
            if (nexacro._BrowserVersion >= 12)
            {
                nexacro._Browser_Gradient = 1;
            }
            if (nexacro._BrowserVersion >= 15)
            {
                nexacro._Browser_BorderImage = 1;
            }
            if (nexacro._BrowserVersion >= 23)
            {
                nexacro._Browser_Transform = 1;
                nexacro._Browser_Transform3d = 1;
            }
        }
        else if (nexacro._Browser == "MobileSafari")
        {
            nexacro._Browser_ColorAlpha = true;
            nexacro._Browser_RoundBorder = 1;
            nexacro._Browser_RoundShadow = true;
            nexacro._Browser_BorderImage = 1;
            nexacro._Browser_Gradient = 1;
            nexacro._Browser_Transform = 1;
            nexacro._Browser_Transform3d = 2;
        }
        else if (nexacro._Browser == "Safari")
        {   //사파리 버젼을 추가하였는데, 다른버젼과 충돌 테스트 미확인
            //nexacro._Browser_RoundBorder 등 아래 내용은 Webkit내용 그대로 가져옴
            nexacro._Browser_ColorAlpha = true;
            if (nexacro._BrowserVersion >= 3)
            {
                nexacro._Browser_RoundBorder = 2;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Transform = 2;
                nexacro._Browser_BorderImage = 2;
            }
            if (nexacro._BrowserVersion >= 4)
            {
                nexacro._Browser_Transform3d = 2;
            }
            if (nexacro._BrowserVersion >= 5)
            {
                nexacro._Browser_RoundBorder = 1;
                nexacro._Browser_RoundShadow = true;
                nexacro._Browser_Gradient = 2;
            }
            if (nexacro._BrowserVersion >= 6)
            {
                nexacro._Browser_Gradient = 1;
                nexacro._Browser_BorderImage = 1;
            }
        }
        else if (nexacro._Browser == "WebKit")
        {
            nexacro._Browser_ColorAlpha = true;
            nexacro._Browser_RoundBorder = 2;
            nexacro._Browser_RoundShadow = true;
            nexacro._Browser_BorderImage = 2;
            nexacro._Browser_Gradient = 2;
            nexacro._Browser_Transform = 2;
            nexacro._Browser_BorderImage = 2;
        }

        // detect OS
        (function ()
        {
            var _regexp_detectos = [
                    { OS: "Windows", systype: "win32", expr: "Windows\\sNT\\s([0-9\\.]*)" },
                    { OS: "Windows Phone", systype: "win32", expr: "Windows Phone.*OS\\s([\\d_]+)" },
                    { OS: "Mac OS", systype: "mac", expr: "Mac\\sOS[\\s|a-z|A-Z]+\\s([\\d_]+)" },
                    { OS: "iOS", systype: "ipad", expr: "iPad[\\s|a-z|A-Z|;]+OS\\s([\\d_]+)" },
                    { OS: "iOS", systype: "iphone", expr: "iPhone\\sOS\\s([\\d_]+)" },
                    { OS: "Android", systype: "android", expr: "Android\\s+([\\d.]+)" },
                    { OS: "Linux", systype: "linux", expr: "Linux\\s+([\\w]+)" }
            ];

            var cnt = _regexp_detectos.length;
            for (var i = 0; i < cnt; i++)
            {
                var info = _regexp_detectos[i];
                var version = navigator.userAgent.match(new RegExp(info.expr, 'i'));
                if (version)
                {
                    nexacro._OS = info.OS;
                    // Mobile Web에서는 Device 정보를 정확히 모르기 때문에 체크하지 않아야 함.
                    nexacro._SystemType = info.systype;
                    nexacro._OSVersion = version[1].replace(/_/g, '.');
                    break;
                }
            }

            if (nexacro._OS === "")
            {
                var version = navigator.userAgent.match("Android");

                if (version)
                    nexacro._OS = version[0];
            }
        })();


        if (navigator)
        {
            nexacro._BrowserLang = (navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage);
            nexacro._SystemLang = (navigator.systemLanguage || nexacro._BrowserLang);
        }

        // for Browser's status
        nexacro._checkDocument =
        {
            hasInnerText: document.documentElement.innerText !== undefined,
            hasTextContent: document.documentElement.textContent !== undefined,
            hasElementFromPoint: document.documentElement.elementFromPoint !== undefined,
            hasScreenLeftTop: (document.defaultView || document.parentWindow).screenLeft !== undefined,
            hasGetBoxObjectFor: document.getBoxObjectFor !== undefined,
            hasGetBoundingClientRect: document.documentElement.getBoundingClientRect !== undefined,
            hasOnInput: document.documentElement.oninput !== undefined,
            quirksMode: document.compatMode === "BackCompat",
            strictMode: document.compatMode === "CSS1Compat"
        };

       
    	//IE8에서 grid의 경우 div subnode의 개수가 정해져 있어서 대용량 데이타를 처리하기 위해 임시노드가 필요해 innernode 를 이용해서 처리함
        //현재는 IE8에서 innernode가 생성됨
    	/****** Android 기본브라우저 mobile safari 사용시 ******
		* scrollTop 사용 : 터치시 화면반응속도 느림, 스크롤속도 느림, 화면출렁거림 가끔 - innernode 가 필요없음
		* translate 사용 : 터치시 화면반응속도 빠름, 스크롤속도 빠름(텍스트량이 적을시만), 화면출렁거림 잦음(텍스트량이 많을시만) - innernode가 필요함
		* position 이동  : 터치시 화면반응속도 중간, 스크롤속도 중간, 화면출렁거림 거의없음 (노드량이 많으면 느려질 수 있음) - innernode가 필요함
		/*******************************************************/

        nexacro._use_translate_scroll = 1;
     //   if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari"))
	//	   nexacro._use_translate_scroll = 0;

        //==============================================================================
        if (nexacro._Browser == "MobileSafari")
        {
            nexacro.KeyCode_ImeInput = 0;
        }
        else
        {
            nexacro.KeyCode_ImeInput = 229;
        }

        //==============================================================================
        // error Function
        nexacro._error = function (e, at)
        {
            var msg = [];
            msg.push(e.toString());
            if (at && at.length)
            {
                msg.push("at : " + at);
            }
            if (e.fileName)
            {
                msg.push("at : " + e.fileName + ": " + e.lineNumber);
            }
            if (self.__debuginfo)
            {
                msg.push("at : " + self.__debuginfo);
            }
            alert(msg.join('\n'));
        };


        nexacro._alert = function (cur_frame, str, caption, type)
        {
            var handle, _window;
            if (cur_frame instanceof nexacro.Frame)
            {
                _window = cur_frame._getWindow();
                if (_window)
                {
                    _window._cancelEvent();
                    handle = _window.handle;
                }
                else
                    handle = nexacro._getMainWindowHandle();
            }
            else
            {
                handle = nexacro._getMainWindowHandle();
            }

            str = nexacro._toString(str);
            handle.alert(str);
        };


        nexacro._confirm = function (cur_frame, str, caption, type)
        {
            var handle, _window;
            if (cur_frame instanceof nexacro.Frame)
            {
                _window = cur_frame._getWindow();
                if (_window)
                    handle = _window.handle;
                else
                    handle = nexacro._getMainWindowHandle();
            }
            else
            {
                handle = nexacro._getMainWindowHandle();
            }

            return handle.confirm(str);
        };

        //==============================================================================
        nexacro._setCookie = function (name, value, days)
        {
            var expires = "";
            if (days)
            {
                if (typeof (days) == "string")
                {
                    expires = "; expires=" + days;
                }
                else if ((typeof days) == "object" && (days instanceof Date))
                {
                    expires = "; expires=" + days.toGMTString();
                }
            }
            else
            {
                expires = "";
            }

            document.cookie = name + "=" + value + expires + "; path=/";
        };

        nexacro._getCookie = function (name)
        {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++)
            {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                {
                    c = c.substring(1);
                }
                if (c.indexOf(nameEQ) === 0)
                {
                    return c.substring(nameEQ.length);
                }
            }
            return null;
        };

        nexacro._removeCookie = function (name)
        {
            this.setCookie(name, "", -1);
        };

        // sandbox
        nexacro._setFileSecureLevel = nexacro._emptyFn;
        nexacro._setNetworkSecureLevel = nexacro._emptyFn;
        nexacro._setEnableScreenCapture =nexacro._emptyFn;
        nexacro._setEnableCookie = nexacro._emptyFn;
        nexacro._setEnableCache = nexacro._emptyFn;
        nexacro._setEnableClipboard = nexacro._emptyFn;

        // get Exception Message
        if (nexacro._Browser == "IE")
        {
            nexacro._getExceptionMessage = function (e)
            {
                var msg = e.message;
                if (e.stack) msg += "\r\n" + e.stack;

                return msg;
            };
            nexacro._getEvalExceptionMessage = function (e, src_url, base_line)
            {
                var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
                return msg;
            };
        }
        else if (nexacro._Browser == "Gecko")
        {
            nexacro._getExceptionMessage = function (e)
            {
                var msg = e.toString() + "\r\n"; // + sourceName;
                msg += "\r\n" + e.stack;

                return msg;
            };
            nexacro._getEvalExceptionMessage = function (e, src_url, base_line)
            {
                var msg = e.toString() + '\r\nat line ' + (e.lineNumber - base_line);
                msg += ', in eval script(' + decodeURI(src_url) + ')';
                return msg;
            };
        }
        else if (nexacro._Browser == "Chrome")
        {
            // for error message
            Error.prepareStackTrace = function (error, stack)
            {
                return stack;
            };

            nexacro._getExceptionMessage = function (e)
            {
                var msg = e.toString();
                if (e.stack && e.stack.length > 0)
                {
                    var frame = e.stack[0];
                    var url = frame.getEvalOrigin();
                    msg += "\r\nat line " + frame.getLineNumber() + ", in function: " + frame.getMethodName() + " in " + decodeURI(url);
                }
                return msg;
            };
            nexacro._getEvalExceptionMessage = function (e, src_url, base_line)
            {
                var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
                return msg;
            };
        }
        else if (nexacro._BrowserType == "WebKit")
        {
            nexacro._getExceptionMessage = function (e)
            {
                var sourceName = e.sourceURL ? decodeURI(e.sourceURL) : "(anonymous)";
                var lineNumber = e.line;

                var msg = e.toString() + "\r\n" + sourceName + ' (at line ' + lineNumber + ')';
                if (e.stack) msg += "\r\n" + e.stack;
                alert(msg);
                return msg;
            };
            nexacro._getEvalExceptionMessage = function (e, src_url, base_line)
            {
                var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
                return msg;
            };
        }
        else
        {
            nexacro._getExceptionMessage = function (e)
            {
                var msg = e.toString();
                if (e.stack) msg += "\r\n" + e.stack;
                return msg;
            };
            nexacro._getEvalExceptionMessage = function (e, src_url, base_line)
            {
                var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
                return msg;
            };
        }

        // IE Pseudo Leak 처리 (removeChild를  사용하면 Leak 이 남는다.)
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro.__pseudoGarbageCollector = function ()
            {
                this.handle = null;
                this._hasGargageNode = false;
            };
            var _pGarbageCollector = nexacro.__pseudoGarbageCollector.prototype;
            _pGarbageCollector.init = function (_cur_doc, id)
            {
                if (_cur_doc)
                {
                    var gc = _cur_doc.getElementById(id);
                    if (!gc)
                    {
                        gc = _cur_doc.createElement('div');
                        gc.id = id;
                        gc.style.display = 'none';
                        _cur_doc.body.appendChild(gc);
                        this._hasGargageNode = false;
                    }
                    this.handle = gc;
                }
            };
            _pGarbageCollector.append = function (node)
            {
                if (this.handle && node)
                {
                    this.handle.appendChild(node);
                    this._hasGargageNode = true;
                }
            };
            _pGarbageCollector.clear = function ()
            {
                if (this.handle && this._hasGargageNode)
                {
                    this.handle.innerText = "";
                    this._hasGargageNode = false;
                }
            };
            _pGarbageCollector.destroy = function ()
            {
                if (this.handle)
                {
                    this.clear();
                    this.handle = null;
                }
            };


            nexacro._createWindowGC_Funcs = function (_cur_win)
            {
                _cur_win.__createGC = function ()
                {
                    var _doc = _cur_win.document;
                    // gc
                    var gc = new nexacro.__pseudoGarbageCollector();
                    gc.init(_doc, 'nexacro__pseudoGarbageCollector');
                    _doc.__nexacro_gc = gc;

                    // unlink gc
                    var unlinkgc = new nexacro.__pseudoGarbageCollector();
                    unlinkgc.init(_doc, 'nexacro__unlinkGarbageCollector');
                    _doc.__nexacro_unlinkgc = unlinkgc;
                };
                _cur_win.__clearGC = function ()
                {
                    var _doc = _cur_win.document;
                    var gc = _doc.__nexacro_gc;
                    if (gc)
                    {
                        gc.clear();
                    }
                };
                _cur_win.__destroyGC = function ()
                {
                    var _doc = _cur_win.document;

                    var unlinkgc = _doc.__nexacro_unlinkgc;
                    if (unlinkgc && unlinkgc.handle)
                    {
                        var node = unlinkgc.handle.firstChild;
                        while (node)
                        {
                            var next = node.nextSibling;
                            var elem = node._linked_element;
                            if (elem)
                            {
                                if (elem.linkedcontrol)
                                {
                                    elem.linkedcontrol.destroy();
                                }
                                else
                                {
                                    elem.destroy();
                                }
                            }
                            node = next;
                        }
                        unlinkgc.destroy();
                    }
                    _doc.__nexacro_unlinkgc = null;

                    var gc = _doc.__nexacro_gc;
                    if (gc)
                    {
                        gc.destroy();
                    }
                    _doc.__nexacro_gc = null;
                };
            };

            nexacro.__appendDOMNode = function (parent_node, node)
            {
                parent_node.appendChild(node);
            };
            nexacro.__insertDOMNode = function (parent_node, node, before_node)
            {
                if (before_node)
                    parent_node.insertBefore(node, before_node);
                else
                    parent_node.appendChild(node);
            };

            nexacro.__removeDOMNode = function (parent_node, node)
            {
                // unlink use for temp : use it always unlink & append pare
                // ==> parent_node != null
                if (node)
                {
                    if (!parent_node)
                    {
                        parent_node = node.parentNode;
                    }

                    // 닫히고 있는 window에서 호출될 경우 object가 망가져있어서 사용할수 없는 인터페이스라는 오류가 발생한다.
                    try
                    {
                        // IE7에서 VML Node는 removeChild를 먼저 해줘야 함
                        parent_node.removeChild(node);
                        var gc = node.ownerDocument.__nexacro_gc;
                        if (gc)
                        {
                            gc.append(node);
                        }
                        else
                        {
                            gc = document.__nexacro_gc;
                            if (gc)
                                gc.append(node);
                        }
                    }
                    catch (e)
                    {
                    }
                }
            };
            nexacro.__unlinkDOMNode = function (parent_node, node)
            {
                // unlink use for temp : use it always unlink & append pare
                if (node)
                {
                    if (!parent_node)
                    {
                        parent_node = node.parentNode;
                    }
                    // IE7에서 VML Node는 removeChild를 먼저 해줘야 함
                    parent_node.removeChild(node);
                    //var gc = node.ownerDocument.__nexacro_unlinkgc;
                    //if (gc)
                    //{
                    //   gc.append(node);
                    //}
                }
            };
            nexacro.__removeDOMAllChildren = function (parent_node)
            {
                if (parent_node)
                {
                    // 닫히고 있는 window에서 호출될 경우 object가 망가져있어서 사용할수 없는 인터페이스라는 오류가 발생한다.
                    try
                    {
                        var node = parent_node.firstChild;
                        while (node)
                        {
                            parent_node.removeChild(node);
                            var gc = node.ownerDocument.__nexacro_gc;
                            if (gc)
                            {
                                gc.append(node);
                            }
                            else
                            {
                                gc = document.__nexacro_gc;
                                if (gc)
                                    gc.append(node);
                            }
                            node = parent_node.firstChild;
                        }
                    }
                    catch (e)
                    {
                    }
                }
            };
        }
        else
        {
            nexacro._createWindowGC_Funcs = function (_cur_win)
            {
                _cur_win.__createGC = nexacro._emptyFn;
                _cur_win.__clearGC = nexacro._emptyFn;
                _cur_win.__destroyGC = nexacro._emptyFn;
            };

            nexacro.__appendDOMNode = function (parent_node, node)
            {
                parent_node.appendChild(node);
            };
            nexacro.__insertDOMNode = function (parent_node, node, before_node)
            {
                if (before_node)
                    parent_node.insertBefore(node, before_node);
                else
                    parent_node.appendChild(node);
            };

            nexacro.__removeDOMNode = function (parent_node, node)
            {
                if (node && parent_node)
                {
                    // 닫히고 있는 window에서 호출될 경우 object가 망가져있어서 사용할수 없는 인터페이스라는 오류가 발생한다.
                    try
                    {
                        parent_node.removeChild(node);
                    }
                    catch (e)
                    {
                    }
                }
            };
            nexacro.__unlinkDOMNode = function (parent_node, node)
            {
                // unlink use for temp : use it always unlink & append pare
                if (node && parent_node)
                {
                    parent_node.removeChild(node);
                }
            };
            nexacro.__removeDOMAllChildren = function (parent_node)
            {
                if (parent_node)
                {
                    // 닫히고 있는 window에서 호출될 경우 object가 망가져있어서 사용할수 없는 인터페이스라는 오류가 발생한다.
                    try
                    {
                        var node = parent_node.firstChild;
                        while (node)
                        {
                            parent_node.removeChild(node);
                            node = parent_node.firstChild;
                        }
                    }
                    catch (e)
                    {
                    }
                }
            };
        }

        //=============================================================================
        // DOM Node Tree Controll APIs : HTML only
        //=============================================================================
        nexacro.__getPrevDOMNode = function (node)
        {
            do
            {
                node = node.prevSibling;
            }
            while (node && node.nodeType != 1);
            return node;
        };
        nexacro.__getNextDOMNode = function (node)
        {
            do
            {
                node = node.nextSibling;
            }
            while (node && node.nodeType != 1);
            return node;
        };

        //nexacro.__getFirstChildDOMNode = function (node)
        //{
        //    var child_node = node.firstChild;
        //    while (child_node && child_node.nodeType != 1)
        //        child_node = child_node.nextSibling;
        //    return child_node;
        //};
        nexacro.__getLastChildDOMNode = function (node)
        {
            var child_node = node.lastChild;
            while (child_node && child_node.nodeType != 1)
                child_node = child_node.prevSibling;
            return child_node;
        };

        nexacro.__bringDOMNodeToFront = function (node)
        {
            // send to Last
            var parent_node = node.parentNode;
            if (parent_node)
            {
                var last_node = nexacro.__getLastChildDOMNode(parent_node);
                if (node != last_node)
                {
                    //IE에서 removeChild 하면 Memory Leak발생하기 때문에 바로 appendChild한다.
                    parent_node.appendChild(node);
                }
            }
        };
        nexacro.__sendDOMNodeToBack = function (node)
        {
            // send to First
            var parent_node = node.parentNode;
            if (parent_node)
            {
                var first_node = parent_node.firstChild;
                if (node != first_node)
                {
                    //IE에서 removeChild 하면 Memory Leak발생하기 때문에 바로 appendChild한다.
                    parent_node.insertBefore(node, first_node);
                }
            }
        };

        nexacro.__moveDOMNodeToPrev = function (node, target_node)
        {
            if (target_node && target_node != node)
            {
                var parent_node = node.parentNode;
                if (parent_node && parent_node == target_node.parentNode)
                {
                    //next check
                    var next_node = nexacro.__getNextDOMNode(target_node);
                    if (next_node != node)
                    {
                        //IE에서 removeChild 하면 Memory Leak발생하기 때문에 바로 appendChild한다.
                        if (next_node)
                        {
                            parent_node.insertBefore(node, next_node);
                        }
                        else
                        {
                            parent_node.appendChild(node);
                        }
                    }
                }
            }
        };

        nexacro.__moveDOMNodeToNext = function (node, target_node)
        {
            if (target_node && target_node != node)
            {
                var parent_node = node.parentNode;
                if (parent_node && parent_node == target_node.parentNode)
                {
                    //prev check
                    var target_prev_node = nexacro.__getPrevDOMNode(target_node);
                    if (target_prev_node != node)
                    {
                        //IE에서 removeChild 하면 Memory Leak발생하기 때문에 바로 appendChild한다.
                        parent_node.insertBefore(node, target_node);
                    }
                }
            }
        };

        //=============================================================================
        // DOM Node Control APIs : HTML only
        //=============================================================================
        nexacro.__setDOMNode_ClassName = function (node, classname)
        {
            node.className = classname;
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro.__setDOMNode_Status = function (node, status)
            {
                node.status = status;
                node.setAttribute("status", status);

                node.className = node.className; // for refreshing bug         
            };
        }
        else
        {
            nexacro.__setDOMNode_Status = function (node, status)
            {
                node.status = status;
                node.setAttribute("status", status);
            };
        }

        nexacro.__setDOMNode_Text = function (node, text)
        {
            node.text = text;
        };

        nexacro.__getHTMLAttr_Status = function (status)
        {
            return " status=" + status;
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro.__setDOMNode_UserStatus = function (node, userstatus)
            {
                node.userstatus = userstatus;
                node.setAttribute("userstatus", userstatus);

                node.className = node.className; // for refreshing bug
            };
        }
        else
        {
            nexacro.__setDOMNode_UserStatus = function (node, userstatus)
            {
                node.userstatus = userstatus;
                node.setAttribute("userstatus", userstatus);

            };
        }

        nexacro.__getHTMLAttr_UserStatus = function (userstatus)
        {
            return " userstatus=" + userstatus;
        };

        if (nexacro._OS == "iOS")
        {
            nexacro.__setDOMNode_Enable = function (node, enable_flag)
            {
                node.disabled = (enable_flag ? false : true);

                // for iOS : [RP_37187] - Text not visible when input node was disable
                node.style.nexaStatusDisabled = node.disabled;
                if (enable_flag)
                {
                    node.style.opacity = "";
                    node.style.webkitTextFillColor = "";
                }
                else
                {
                    node.style.opacity = 1;
                    node.style.webkitTextFillColor = node.style.color;

                }
            };

            nexacro.__getHTMLStyle_Enable = function (enable_flag, color)
            {
                if (!enable_flag)
                {
                    return "opacity:1;-webkit-text-fill-color:" + (color ? color._sysvalue : "") + ";";
                }
                else
                {
                    return "";
                }
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9)
        {
            nexacro.__setDOMNode_Enable = function (node, enable_flag)
            {
                if (!enable_flag)
                {
                    var owner_doc = (node.ownerDocument || node.document);
                    if (node.setSelectionRange)
                    {
                        var begin = node.selectionStart;
                        var end = node.selectionEnd;
                        if (begin != end)
                        {
                            var pos = (node.selectionDirection == "backward" ? begin : end);
                            node.setSelectionRange(pos, pos);
                        }
                    }
                }

                node.disabled = (enable_flag ? false : true);
            };

            nexacro.__getHTMLStyle_Enable = function(enable_flag)
            {
                return "";
            };
        }
        else
        {
            nexacro.__setDOMNode_Enable = function (node, enable_flag)
            {
                node.disabled = (enable_flag ? false : true);
            };

            nexacro.__getHTMLStyle_Enable = function(enable_flag)
            {
                return "";
            };
        }

        nexacro.__setTextAreaDOMNode_Enable = function (node, enable_flag)
        {
            nexacro.__setDOMNode_Enable(node, enable_flag);
            nexacro.__setDOMNode_Selectable(node, enable_flag);
        };

        nexacro.__getHTMLAttr_Enable = function (enable_flag)
        {
            return (enable_flag ? "" : " disabled='true'");
        };

        nexacro.__getTextAreaHTMLAttr_Enable = function (enable_flag)
        {
            return enable_flag ? nexacro.__getHTMLAttr_Selectable(enable_flag) : (" disabled='true'" + nexacro.__getHTMLAttr_Selectable(enable_flag));
        };

        if ((nexacro._Browser == "IE" && nexacro._BrowserVersion <= 9) || nexacro._Browser == "Opera")
        {
            nexacro.__getHTMLAttr_Selectable = function (selectable_flag)
            {
                return " unselectable=" + (selectable_flag ? "'off'" : "'on'");
            };
            nexacro.__getHTMLStyle_Selectable = function (selectable_flag)
            {
                return "";
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 9)
        {
            nexacro.__getHTMLAttr_Selectable = function (selectable_flag)
            {
                return "";
            };
            nexacro.__getHTMLStyle_Selectable = function (selectable_flag)
            {
                return selectable_flag ? "" : "-ms-user-select:none;";
            };
        }
        else if (nexacro._BrowserType == "Gecko")
        {
            nexacro.__getHTMLAttr_Selectable = function (selectable_flag)
            {
                return "";
            };
            nexacro.__getHTMLStyle_Selectable = function (selectable_flag)
            {
                return selectable_flag ? "" : "-moz-user-select:none;";
            };
        }
        else if (nexacro._BrowserType == "WebKit")
        {
            nexacro.__getHTMLAttr_Selectable = function (selectable_flag)
            {
                return "";
            };
            nexacro.__getHTMLStyle_Selectable = function (selectable_flag)
            {
                return selectable_flag ? "" : "-webkit-user-select:none;";
            };
        }
        else
        {
            nexacro.__getHTMLAttr_Selectable = function (selectable_flag)
            {
                return "";
            };
            nexacro.__getHTMLStyle_Selectable = function (selectable_flag)
            {
                return selectable_flag ? "" : "user-select:none;";
            };
        }

        nexacro.__getHTMLAttr_InputType = function (inputtype)
        {
            switch (inputtype)
            {
                case "password":
                    return " type = 'password'";
                    break;
                case "date":
                    return " type = 'date'";
                    break;
                case "tel":
                    return " type = 'tel'";
                    break;
                case "text":
                default:
                    return " type = 'text'";
                    break;
            }
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__setDOMNode_ReadOnly = function (node, readonly_flag)
            {
                node.readOnly = readonly_flag ? "readonly" : "";
            };
        }
        else
        {
            nexacro.__setDOMNode_ReadOnly = function (node, readonly_flag)
            {
                node.readOnly = readonly_flag;
            };
        }

        nexacro.__getHTMLAttr_ReadOnly = function (readonly_flag)
        {
            return (readonly_flag ? " readonly" : "");
        };

        nexacro.__setDOMNode_TabIndex = function (node, index)
        {
            node.tabIndex = index;
        };
        nexacro.__getHTMLAttr_TabIndex = function (index)
        {
            return " tabindex ='" + index + "' ";
        };

        nexacro.__setDOMNode_Id = function (node, parentid, id)
        {
            node.id = parentid + id;
        };

        nexacro.__setDOMNode_ToolTip = function (node, tooltiptext, tooltiptype)
        {
            // 가상커서 지원 안하기 때문에 불필요한 if문으로 판단됨.
            // if (nexacro._AccessibilityUtil.isUseTooltipText())
            node.title = tooltiptext;
        };

        //nexacro.__getDOMNode_ToolTip = function (node)
        //{
        //	if (node)
        //		return node.title;
        //	return "";
        //}
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
        {   // IE 6,7은 pre-wrap이 없음. 'white-space:pre;word-wrap:break-word;'로 설정하면 pre-wrap과 동일한 결과.
        	nexacro.__setDOMNodeStyle_WordWrap = function (node_style, wordwrap)
            {
                if (wordwrap == "char")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "break-all";
                }
                else if (wordwrap == "english")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "normal";
                }
                else if (wordwrap == "none")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "normal";
                }
                else
                {
                    node_style.whiteSpace = "";
                    node_style.wordWrap = "";
                    node_style.wordBreak = "";
                }
            };
        }
        else
        {
            nexacro.__setDOMNodeStyle_WordWrap = function (node_style, wordwrap)
            {
                if (wordwrap == "char") // 오페라는 word가 english로 동작함.
                {
                    node_style.whiteSpace = "pre-wrap";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "break-all";
                }
                else if (wordwrap == "english")
                {
                    node_style.whiteSpace = "pre-wrap";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "normal";
                }
                else if (wordwrap == "none")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "normal";
                    node_style.wordBreak = "";
                }
                else
                {
                    node_style.whiteSpace = "";
                    node_style.wordWrap = "";
                    node_style.wordBreak = "";
                }
            };
        }



        if ((nexacro._Browser == "IE" && nexacro._BrowserVersion <= 9) || nexacro._Browser == "Opera")
        {
            nexacro.__setDOMNode_Selectable = function (node, selectable_flag)
            {
                node.unselectable = selectable_flag ? "off" : "on";
            };
            nexacro.__isDOMNodeSelectable = function (node)
            {
                return (node.unselectable == "off");
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 9)
        {
            nexacro.__setDOMNode_Selectable = function (node, selectable_flag)
            {
                node.style.msUserSelect = selectable_flag ? "text" : "none";
            };
            nexacro.__isDOMNodeSelectable = function (node)
            {
                return (node.style.msUserSelect === "");
            };
        }
        else if (nexacro._BrowserType == "Gecko")
        {
            nexacro.__setDOMNode_Selectable = function (node, selectable_flag)
            {
                node.style.MozUserSelect = selectable_flag ? "" : "none";
            };
            nexacro.__isDOMNodeSelectable = function (node)
            {
                return (node.style.MozUserSelect === "");
            };
        }
        else if (nexacro._BrowserType == "WebKit")
        {
            nexacro.__setDOMNode_Selectable = function (node, selectable_flag)
            {
                node.style.webkitUserSelect = selectable_flag ? "" : "none";
            };
            nexacro.__isDOMNodeSelectable = function (node)
            {
                return (node.style.webkitUserSelect === "");
            };
        }
        else
        {
            nexacro.__setDOMNode_Selectable = function (node, selectable_flag)
            {
                node.style.userSelect = selectable_flag ? "" : "none";
            };
            nexacro.__isDOMNodeSelectable = function (node)
            {
                return (node.style.userSelect === "");
            };
        }

        nexacro.__setDOMNode_Title = function (node, text)
        {
            if (!text)
            {
                text = "";
            }

            if (!node.title || node.title != text)
                return node.title = text;
        };

        nexacro.__setDOMNode_Alt = function (node, text)
        {
            if (!text)
                text = "";

            if (!node.alt || node.alt != text)
                return node.alt = text;
        };

        // nexacro.__setDOMNode_MaxLength : only for inputfilterextDOMNode
        nexacro.__setDOMNode_MaxLength = function (node, maxlength)
        {
        	node.maxLength = (maxlength > 0) ? maxlength : 65535;
        };

        //-----------------------------------------------------------------------------
        // new DOM API for 14.1
        //-----------------------------------------------------------------------------
        if (nexacro._OS == "iOS")
        {
            nexacro.__setDOMStyle_ColorObject = function (node_style, color)
            {
                // for iOS : [RP_37187] - Text not visible when input node was disable
                if (node_style.nexaStatusDisabled)
                {
                    node_style.webkitTextFillColor = (color ? color._sysvalue : "");
                }
                else
                {
                    node_style.color = (color ? color._sysvalue : "");
                }
            };
        }
        else
        {
            nexacro.__setDOMStyle_ColorObject = function (node_style, color)
            {
                node_style.color = (color ? color._sysvalue : "");
            };
        }

        nexacro.__getHTMLStyle_ColorObject = function (color)
        {
            return color ? ("color:" + color._sysvalue + ";") : "";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro.__setDOMStyle_FontObject = function (node_style, font)
            {
                if (font && font.value)
                    node_style.font = font.value;
                else
                {
                    node_style.fontSize = "";
                    node_style.fontFamily = "";
                    node_style.fontStyle = "";
                    node_style.fontWeight = "";
                }
            };
        }
        else
        {
            nexacro.__setDOMStyle_FontObject = function (node_style, font)
            {
                if (font && font.value)
                    node_style.font = font.value;
                else
                    node_style.font = "";
            };
        }


        nexacro.__getHTMLStyle_FontObject = function (font)
        {
            return (font && font.value) ? ("font:" + font.value + ";") : "";
        };

        nexacro.__setDOMStyle_TextDecorationObject = function (node_style, decoration)
        {
            if (decoration && decoration.value)
                node_style.textDecoration = decoration.value;
            else
                node_style.textDecoration = "";
        };
        nexacro.__getHTMLStyle_TextDecorationObject = function (decoration)
        {
            return (decoration && decoration.value) ? ("text-decoration:" + decoration.value + ";") : "";
        };

        nexacro.__setDOMStyle_LineHeightObject = function (node_style, lineheight)
        {
            if (lineheight && lineheight.value)
                node_style.lineHeight = lineheight.value;
            else
                node_style.lineHeight = "";
        };
        nexacro.__getHTMLStyle_LineHeightObject = function (lineheight)
        {
            return (lineheight && lineheight.value) ? ("line-height:" + lineheight.value + ";") : "";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9)
        {
            nexacro.__setDOMStyle_WordSpacingObject = function (node_style, wordspacing)
            {
                if (wordspacing && wordspacing.value)
                    node_style.wordSpacing = wordspacing.value + "px";
                else
                    node_style.wordSpacing = "";
            };
        }
        else
        {
            nexacro.__setDOMStyle_WordSpacingObject = function (node_style, wordspacing)
            {
                if (wordspacing && wordspacing.value)
                    node_style.wordSpacing = wordspacing.value;
                else
                    node_style.wordSpacing = "";
            };
        }
        
        nexacro.__getHTMLStyle_WordSpacingObject = function (wordspacing)
        {
            return (wordspacing && wordspacing.value) ? ("word-spacing:" + wordspacing.value + ";") : "";
        };

        nexacro.__setDOMStyle_LetterSpacingObject = function (node_style, letterspacing)
        {
            if (letterspacing && letterspacing.value)
                node_style.letterSpacing = letterspacing.value;
            else
                node_style.letterSpacing = "";
        };
        nexacro.__getHTMLStyle_LetterSpacingObject = function (letterspacing)
        {
            return (letterspacing && letterspacing.value) ? ("letter-spacing:" + letterspacing.value + ";") : "";
        };
        nexacro.__setDOMStyle_LetterSpacingObject = function (node_style, letterspacing)
        {
            if (letterspacing && letterspacing.value)
                node_style.letterSpacing = letterspacing.value;
            else
                node_style.letterSpacing = "";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
        {
            nexacro.__getHTMLStyle_WordWrap = function (wordwrap)
            {
                if (wordwrap == "char")
                    return "white-space:pre; word-wrap:break-word; word-break:break-all;";
                else if (wordwrap == "english")
                    return "white-space:pre; word-wrap:break-word; word-break:normal;";
                else
                    return "white-space:pre; word-wrap:normal;";
            };
        }
        else
        {
            nexacro.__getHTMLStyle_WordWrap = function (wordwrap)
            {
                if (wordwrap == "char")
                    return "white-space:pre-wrap; word-wrap:break-word; word-break:break-all;";
                else if (wordwrap == "english")
                    return "white-space:pre-wrap; word-wrap:break-word; word-break:normal;";
                else
                    return "white-space:pre; word-wrap:normal;word-break:normal;";
            };
        }

        //-----------------------------------------------------------------------------
        if (nexacro._Browser_RoundBorder === 0)
        { // IE7,8
            nexacro.__setDOMStyle_BorderRadiusObject = function (node_style, borderRadius)
            {
            };
            nexacro.__getHTMLStyle_BorderRadiusObject = function (borderRadius)
            {
                return "";
            };
        }
        else if (nexacro._Browser_RoundBorder == 1)
        { // HTML5
            nexacro.__setDOMStyle_BorderRadiusObject = function (node_style, borderRadius)
            {
                node_style.borderRadius = (borderRadius ? borderRadius.value : "");
            };
            nexacro.__getHTMLStyle_BorderRadiusObject = function (borderRadius)
            {
                return borderRadius ? ("border-radius:" + borderRadius.value + ";") : "";
            };
        }
        else if (nexacro._Browser_RoundBorder == 2)
        { // legacy
            if (nexacro._Browser == "Gecko")
            {
                nexacro.__setDOMStyle_BorderRadiusObject = function (node_style, borderRadius)
                {
                    node_style.MozBorderRadius = (borderRadius ? borderRadius.value : "");
                };
                nexacro.__getHTMLStyle_BorderRadiusObject = function (borderRadius)
                {
                    return borderRadius ? ("-moz-border-radius:" + borderRadius.value + ";") : "";
                };
            }
            else if (nexacro._BrowserType == "WebKit")
            {
                nexacro.__setDOMStyle_BorderRadiusObject = function (node_style, borderRadius)
                {
                    if (borderRadius)
                    {
                        node_style.webkitBorderRadius = borderRadius.value;
                        //node_style.webkitTransform = "translateZ(0)";
                        //node_style.webkitMaskImage = "-webkit-radial-gradient(circle, white, black)";
                    }
                    else
                    {
                        node_style.webkitBorderRadius = "";
                        //node_style.webkitTransform = "";
                        //node_style.webkitMaskImage = "";
                    }
                };
                nexacro.__getHTMLStyle_BorderRadiusObject = function (borderRadius)
                {
                    return borderRadius ? ("-webkit-border-radius:" + borderRadius.value + ";") : "";
                };
            }
        }

        nexacro.__setDOMStyle_BorderObject = function (node_style, border)
        {
            if (border)
            {
                if (border._single)
                    node_style.border = border.value;
                else
                {
                    if (border.bottom) // > 3
                    {
                        if (border.left)
                        {   //4
                            node_style.borderTop = border.top.value;
                            node_style.borderRight = border.right.value;
                            node_style.borderBottom = border.bottom.value;
                            node_style.borderLeft = border.left.value;
                        }
                        else //3
                        {
                            var right_value = border.right.value;
                            node_style.borderTop = border.top.value;
                            node_style.borderRight = right_value;
                            node_style.borderBottom = border.bottom.value;
                            node_style.borderLeft = right_value;
                        }
                    }
                    else //2
                    {
                        var right_value = border.right.value;
                        var top_value = border.top.value;
                        node_style.borderTop = top_value;
                        node_style.borderRight = right_value;
                        node_style.borderBottom = top_value;
                        node_style.borderLeft = right_value;
                    }
                }
            }
            else
                node_style.border = "";

        };

        nexacro.__setDOMStyle_BorderLeftNone = function (node_style, borderleftnone)
        {
            if (borderleftnone)
                node_style.borderLeft = "none";
            else
                node_style.borderLeft = "";

        };

        nexacro.__getHTMLStyle_BorderLeftNone = function (border)
        {
            return "border-left:none;";
        };

        nexacro.__setDOMStyle_BorderTopNone = function (node_style, bordertopnone)
        {
            if (bordertopnone)
                node_style.borderTop = "none";
            else
                node_style.borderTop = "";
        };

        nexacro.__getHTMLStyle_BorderTopNone = function (border)
        {
            return "border-top:none;";
        };

        nexacro.__setDOMStyle_BorderRightNone = function (node_style, borderrightnone)
        {
            if (borderrightnone)
                node_style.borderRight = "none";
            else
                node_style.borderRight = "";
        };

        nexacro.__getHTMLStyle_BorderRightNone = function (border)
        {
            return "border-right:none;";
        };

        nexacro.__setDOMStyle_BorderBottomNone = function (node_style, borderbottomnone)
        {
            if (borderbottomnone)
                node_style.borderBottom = "none";
            else
                node_style.borderBottom = "";
        };

        nexacro.__getHTMLStyle_BorderBottomNone = function (border)
        {
            return "border-bottom:none;";
        };
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro.__setDOMStyle_BorderNone = function (node_style, borderleft, bordertop, borderright, borderbottom, border)
            {
                //_win.getComputedStyle
                if (borderleft)
                    node_style.borderLeft = "none";
                else
                    node_style.borderLeft = (border) ? border.left.value : "";

                if (borderright)
                    node_style.borderRight = "none";
                else
                    node_style.borderRight = (border) ? border.right.value : "";

                if (bordertop)
                    node_style.borderTop = "none";
                else
                    node_style.borderTop = (border) ? border.top.value : "";

                if (borderbottom)
                    node_style.borderBottom = "none";
                else
                    node_style.borderBottom = (border) ? border.bottom.value : "";
            };
        }
        else
        {
            nexacro.__setDOMStyle_BorderNone = function (node_style, borderleft, bordertop, borderright, borderbottom, border)
        {

            if (borderleft)
                node_style.borderLeft = "none";
            else
                node_style.borderLeft = "";

            if (borderright)
                node_style.borderRight = "none";
            else
                node_style.borderRight = "";

            if (bordertop)
                node_style.borderTop = "none";
            else
                node_style.borderTop = "";

            if (borderbottom)
                node_style.borderBottom = "none";
            else
                node_style.borderBottom = "";
        };
        }

        nexacro.__getHTMLStyle_BorderObject = function (border)
        {
            if (border)
            {
                if (border._single)
                    return border ? ("border:" + border.value + ";") : "";
                else
                {
                    return "border-top:" + border.top.value + ";border-right:" + border.right.value +
                    ";border-bottom:" + border.bottom.value + ";border-left:" + border.left.value + ";";
                }
            }
            return "";
        };

        nexacro.__setDOMStyle_BackgroundObject = function (node_style, background)
        {
            if (background)
            {
                node_style.background = nexacro.__getHTMLStyle_BackgroundObject_Shorthand(background);
            }
            else
            {
                node_style.background = "";
            }
        };

        nexacro.__getHTMLStyle_BackgroundObject = function (background)
        {
            var str = "";
            if (background)
            {
                str = "background:";
                str += nexacro.__getHTMLStyle_BackgroundObject_Shorthand(background);
                str += ";";
            }

            return str;
        };

        if (nexacro._Browser_Gradient === 0)
        { // IE7,8,9

            nexacro.__getHTMLStyle_BackgroundObject_Shorthand = function (background)
            {
                var str = "";
                if (background._syscolor || background.gradient)
                {
                    str = (background.gradient ? background.gradient._sysvalue : background._syscolor);
                }

                if (background.url && background.url != "none")
                {
                    str += " url(" + background._sysurl + ") ";
                    str += background.repeat;
                    str += " " + background.pos_x + " " + background.pos_y;
                }

                return str;
            };
        }
        else
        { // legacy / HTML5

            nexacro.__getHTMLStyle_BackgroundObject_Shorthand = function (background)
            {
                var str = "";
                if (background._syscolor)
                {
                    str += background._syscolor;
                }

                if (background.url && background.url != "none")
                {
                    str += " url(" + background._sysurl + ") ";
                    str += background.repeat;
                    str += " " + background.pos_x + " " + background.pos_y;
                }
                else if (background.gradient)
                {
                    str += " " + background.gradient._sysvalue;
                }

                return str;
            };
        }

        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_MarginObject = function (node_style, margin)
        {
            node_style.margin = (margin ? margin.value : "");
        };
        nexacro.__getHTMLStyle_MarginObject = function (margin)
        {
            return margin ? ("margin:" + margin.value + ";") : "";
        };

        nexacro.__setDOMStyle_PaddingObject = function (node_style, padding)
        {
            if (padding)
                node_style.padding = padding.value;
            else
                node_style.padding = "";
        };
        nexacro.__getHTMLStyle_PaddingObject = function (padding)
        {
            return padding ? ("padding:" + padding.value + ";") : "";
        };

        nexacro.__getHTMLStylePaddingLeft = function (left)
        {
            return "padding-left:" + left + "px;";
        };
        nexacro.__getHTMLStylePaddingTop = function (top)
        {
            return "padding-top:" + top + "px;";
        };
        nexacro.__getHTMLStylePaddingRight = function (right)
        {
            return "padding-right:" + right + "px;";
        };
        nexacro.__getHTMLStylePaddingBottom = function (bottom)
        {
            return "padding-bottom:" + bottom + "px;";
        };


        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_CursorObject = function (node_style, cursor)
        {
            node_style.cursor = (cursor ? cursor._sysvalue : "");
        };
        nexacro.__getHTMLStyle_CursorObject = function (cursor)
        {
            return cursor ? ("cursor:" + cursor._sysvalue + ";") : "";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        { // IE7,8
            nexacro.__setDOMStyle_OpacityObject = function (node_style, opacity)
            {
            };
            nexacro.__getHTMLStyle_OpacityObject = function (opacity)
            {
                return "";
            };

            nexacro.__setDOMStyle_ShadowObject = function (node_style, shadow)
            {
            };
            nexacro.__getHTMLStyle_ShadowObject = function (shadow)
            {
                return "";
            };
        }
        else
        {
            nexacro.__setDOMStyle_OpacityObject = function (node_style, opacity)
            {
                node_style.opacity = (opacity ? opacity._sysvalue : "");
            };
            nexacro.__getHTMLStyle_OpacityObject = function (opacity)
            {
                return opacity ? ("opacity:" + opacity._sysvalue + ";") : "";
            };

            nexacro.__setDOMStyle_ShadowObject = function (node_style, shadow)
            {
                node_style.boxShadow = (shadow ? shadow.value : "");
            };
            nexacro.__getHTMLStyle_ShadowObject = function (shadow)
            {
                return shadow ? ("box-shadow:" + shadow.value + ";") : "";
            };
        }

        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_textAlign = function (node_style, halign)
        {
            if (halign)
            {
                node_style.textAlign = halign;
            }
            else
            {
                node_style.textAlign = "";
            }
        };
        nexacro.__getHTMLStyle_textAlign = function (halign)
        {
            return halign ? ("text-align:" + halign + ";") : "";
        };

        nexacro.__setDOMStyle_verticalAlign = function (node_style, valign)
        {
            if (valign)
            {
                node_style.verticalAlign = valign;
            }
            else
            {
                node_style.verticalAlign = "";
            }
        };
        nexacro.__getHTMLStyle_verticalAlign = function (valign)
        {
            return valign ? ("vertical-align:" + valign + ";") : "";
        };

        //-----------------------------------------------------------------------------
        if (nexacro._Browser_BorderImage == 1)
        {
            nexacro.__setDOMStyle_EdgeObject = function (node_style, edge)
            {
                if (edge)
                {
                    node_style.borderImage = "url(" + edge._sysurl + ")" + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px';
                }
                else
                {
                    node_style.borderImage = "";
                }
            };
            nexacro.__getHTMLStyle_EdgeObject = function (edge)
            {
                if (edge)
                {
                    return "border-image:url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px;';
                }
                else
                {
                    return "";
                }
            };
        }
        else if (nexacro._Browser_BorderImage == 2)
        {
            if (nexacro._Browser == "Gecko")
            {
                nexacro.__setDOMStyle_EdgeObject = function (node_style, edge)
                {
                    if (edge)
                    {
                        // IE11, Firefox에서는 이미지가 로드되기전에 border가 잠시 나타나는 문제가 있다.
                        node_style.borderColor = "transparent";
                        node_style.MozBorderImage = "url(" + edge._sysurl + ")" + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px';
                    }
                    else
                    {
                        node_style.borderWidth = "";
                        node_style.MozBorderImage = "";
                    }
                };
                nexacro.__getHTMLStyle_EdgeObject = function (edge)
                {
                    if (edge)
                    {
                        return "border-color:transparent;-moz-border-image:url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px;';
                    }
                    else
                    {
                        return "";
                    }
                };
            }
            else if (nexacro._Browser == "WebKit" || nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")
            {
                nexacro.__setDOMStyle_EdgeObject = function (node_style, edge, zoom)
                {
                    if (edge)
                    {
                        // update contents
                        node_style.borderWidth = edge.edge_y + "px " + edge.edge_x + "px";
                        node_style.webkitBorderImage = "url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + " fill";
                    }
                    else
                    {
                        node_style.borderWidth = "";
                        node_style.webkitBorderImage = "";
                    }
                };
                nexacro.__getHTMLStyle_EdgeObject = function (edge)
                {
                    if (edge)
                    {
                        return "border-width:" + edge.edge_y + "px " + edge.edge_x + "px;-webkit-border-image:url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + " fill";
                    }
                    else
                    {
                        return "";
                    }
                };
            }
            else if (nexacro._Browser == "Opera")
            {
                nexacro.__setDOMStyle_EdgeObject = function (node_style, edge, zoom)
                {
                    // update contents
                    if (edge)
                    {
                        node_style.OBorderImage = "url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px';
                    }
                    else
                    {
                        node_style.OBorderImage = "";
                    }
                };
                nexacro.__getHTMLStyle_EdgeObject = function (edge)
                {
                    if (edge)
                    {
                        return "-o-border-image:url(" + edge._sysurl + ") " + edge.edge_y + ' ' + edge.edge_x + ' fill / ' + edge.edge_y + 'px ' + edge.edge_x + 'px;';
                    }
                    else
                    {
                        return "";
                    }
                };
            }
        }
        else
        { // IE7,8,9
            nexacro.__setDOMStyle_EdgeObject = nexacro._emptyFn;
            nexacro.__getHTMLStyle_EdgeObject = function (edge)
            {
            	return "";
            };
        }

        nexacro.__setDOMStyle_TextWidth = function (node_style, width)
        {
            node_style.width = (width | 0) + "px";
        };

        nexacro.__clearDOMStyle_TextWidth = function (node_style)
        {
            node_style.width = "";
        };

        nexacro.__getHTMLStyle_TextWidth = function (textwidth)
        {
        	return "width:" + (textwidth | 0) + "px;";
        };
        //-----------------------------------------------------------------------------
        // endof new DOM API for 14.1
        //-----------------------------------------------------------------------------

        //-----------------------------------------------------------------------------
        // direct DOM Handling API for 14.1
        //-----------------------------------------------------------------------------
        nexacro.__setDOMNode_ImageUrl = function (node, imgurl)
        {
            node.src = imgurl;
        };
        nexacro.__getHTMLAttr_ImageUrl = function (imgurl)
        {
            return " src='" + imgurl + "'";
        };

        nexacro.__setCanvasNodeSize = function (node, width, height)
        {
            if (width >= 0 && height >= 0)
            {
                node.width = width;
                node.height = height;
            }
        };

        //---------------------------------------------------------------------------
        // scroll position
        nexacro.__setDOMNode_Offset = function (node, offset_x, offset_y)
        {
            node.scrollLeft = offset_x;
            node.scrollTop = offset_y;
        };
        nexacro.__setDOMNode_HScrollPos = function (node, pos)
        {
            node.scrollLeft = pos;
        };
        nexacro.__setDOMNode_VScrollPos = function (node, pos)
        {
            node.scrollTop = pos;
        };

        //---------------------------------------------------------------------------
        // style position
        nexacro.__setDOMStyle_Pos = function (node_style, left, top)
        {
            node_style.left = (left | 0) + "px";
            node_style.top = (top | 0) + "px";
        };
        nexacro.__clearDOMStyle_Pos = function (node_style)
        {
            node_style.left = "";
            node_style.top = "";
        };
        nexacro.__getHTMLStyle_Pos = function (left, top)
        {
            return "left:" + (left | 0) + "px;top:" + (top | 0) + "px;";
        };

        nexacro.__setDOMStyle_Size = function (node_style, width, height)
        {
            if (width >= 0 && height >= 0)
            {
                node_style.width = (width | 0) + "px";
                node_style.height = (height | 0) + "px";
            }
        };
        nexacro.__clearDOMStyle_Size = function (node_style)
        {
            node_style.width = "";
            node_style.height = "";
        };
        nexacro.__getHTMLStyle_Size = function (width, height)
        {
            return "width:" + (width | 0) + "px;height:" + (height | 0) + "px;";
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__setCanvasNodeStylePos = nexacro.__setDOMStyle_Pos;
        }
        else
        {
            nexacro.__setCanvasNodeStylePos = function (node_style, left, top)
            {
                node_style.left = (left | 0) + "px";
                node_style.top = (top | 0) + "px";
            };
        }

        //-----------------------------------------------------------------------------
        // display attribute change
        nexacro.__setDOMStyle_Visible = function (node_style, visible_flag)
        {
            node_style.visibility = (visible_flag == true) ? "" : "hidden";
        };
        nexacro.__getHTMLStyle_Visible = function (visible_flag)
        {
            return (visible_flag == true) ? "" : "visibility:hidden;";
        };

        nexacro.__setDOMStyle_ForceVisibility = function (node_style, visible_flag)
        {
            node_style.visibility = (visible_flag === true) ? "visible" : "hidden";
        };
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 7)
        {
            nexacro.__setDOMStyle_Display = function (node_style, v)
            {
                if (v == "inline-block")
                    node_style.display = "inline";
                else
                    node_style.display = v;
            };
            nexacro.__getHTMLStyle_Display = function (v)
            {
                return (v == "inline-block") ? "display:inline;" : ("display:" + v + ";");
            };
        }
        else
        {
            nexacro.__setDOMStyle_Display = function (node_style, v)
            {
                node_style.display = v;
            };
            nexacro.__getHTMLStyle_Display = function (v)
            {
                return ("display:" + v + ";");
            };
        }

        nexacro.__setDOMStyle_BKImageUrl = function (node_style, imgurl)
        {
            node_style.backgroundImage = "url(" + imgurl + ")";
        };
        nexacro.__getHTMLStyle_BKImageUrl = function (imgurl)
        {
            return "background-image:url(" + imgurl + ");";
        };

        nexacro.__setDOMStyle_BKImageUrl2 = function (node_style, imgurl)
        {
            node_style.backgroundImage = imgurl;
        };
        nexacro.__getHTMLStyle_BKImageUrl2 = function (imgurl)
        {
            return "background-image:" + imgurl + ";";
        };

        nexacro.__setDOMStyle_BKImageAlign = function (node_style, halign, valign)
        {
            node_style.backgroundPosition = halign + " " + (valign == "middle" ? "center" : valign);
        };
        nexacro.__clearDOMStyle_BKImageAlign = function (node_style)
        {
            node_style.backgroundPosition = "";
        };
        nexacro.__getHTMLStyle_BKImageAlign = function (halign, valign)
        {
            return "background-position:" + halign + " " + (valign == "middle" ? "center" : valign) + ";";
        };


        nexacro.__setDOMNode_Value = function (node, value)
        {
            node.value = value;
        };

        //==============================================================================
        nexacro.__setDOMStyle_Zindex = function (node_style, zindex)
        {
            node_style.zIndex = zindex;
        };

        nexacro.__getDOMNode_Zoom = function (node_style)
        {
            return node_style.zoom;
        };

        nexacro.__setDOMNode_Zoom = function (node_style, zoomFactor)
        {
            node_style.zoom = zoomFactor + "%";
        };

        nexacro.__setDOMStyle_Direction = function (node_style, direction)
        {
            if (direction)
                node_style.direction = direction;
            else
                node_style.direction = "";
        };
        nexacro.__getHTMLStyle_Direction = function (direction)
        {
            return (direction) ? ("direction:" + direction + ";") : "";
        };

        if (nexacro._Browser_Transform3d === 0)
        { // not support
            nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
            {
                nexacro.__setDOMStyle_Pos(node_style, offset_x, offset_y);
            };
            nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
            {
                node_style.left = pos + "px";
            };
            nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
            {
                node_style.top = pos + "px";
            };
            nexacro.__clearDOMStyle_Translate = function (node_style)
            {
                node_style.left = "";
                node_style.top = "";
            };
        }
        else if (nexacro._Browser_Transform3d == 1)
        { // HTML5
            nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
            {
                node_style.transform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
            };
            nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
            {
                node_style.transform = "translateX(" + pos + "px)";
            };
            nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
            {
                node_style.transform = "translateY(" + pos + "px)";
            };
            nexacro.__clearDOMStyle_Translate = function (node_style)
            {
                node_style.transform = "";
            };
        }
        else if (nexacro._Browser_Transform3d == 2)
        { // Lagacy
            if (nexacro._Browser == "IE")
            {
                nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
                {
                    node_style.msTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
                };
                nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
                {
                    node_style.msTransform = "translateX(" + pos + "px)";
                };
                nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
                {
                    node_style.msTransform = "translateY(" + pos + "px)";
                };
                nexacro.__clearDOMStyle_Translate = function (node_style)
                {
                    node_style.msTransform = "";
                };
            }
            else if (nexacro._BrowserType == "WebKit")
            {
                nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
                {
                    node_style.WebkitTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
                };
                nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
                {
                    node_style.WebkitTransform = "translateX(" + pos + "px)";
                };
                nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
                {
                    node_style.WebkitTransform = "translateY(" + pos + "px)";
                };
                nexacro.__clearDOMStyle_Translate = function (node_style)
                {
                    node_style.WebkitTransform = "";
                };
            }
            else if (nexacro._Browser == "Gecko")
            {
                nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
                {
                    node_style.MozTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
                };
                nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
                {
                    node_style.MozTransform = "translateX(" + pos + "px)";
                };
                nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
                {
                    node_style.MozTransform = "translateY(" + pos + "px)";
                };
                nexacro.__clearDOMStyle_Translate = function (node_style)
                {
                    node_style.MozTransform = "";
                };
            }
            else if (nexacro._Browser == "Opera")
            {
                nexacro.__setDOMStyle_Translate = function (node_style, offset_x, offset_y)
                {
                    node_style.OTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
                };
                nexacro.__setDOMStyle_TranslateX = function (node_style, pos)
                {
                    node_style.OTransform = "translateX(" + pos + "px)";
                };
                nexacro.__setDOMStyle_TranslateY = function (node_style, pos)
                {
                    node_style.OTransform = "translateY(" + pos + "px)";
                };
                nexacro.__clearDOMStyle_Translate = function (node_style)
                {
                    node_style.OTransform = "";
                };
            }
        }
        //==============================================================================
        // HTML Node Text Setting util
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            // only innerText
            // for use cache Object : use closure
            (function ()
            {
               

                nexacro.__setDOMNode_SinglelineText = function (node, text)
                {
                	var re_check = /\r|\n/;
                	var re_newline = /\r\n|\n|\r/g;
                    // must be setted to node : whiteSpace="pre"/"pre-wrap", wordWrap="normal"
                    if (re_check.test(text))
                        node.innerText = text.replace(re_newline, " ");
                    else
                        node.innerText = text;
                };
                nexacro.__getHTMLAttr_SinglelineText = function (text)
                {
                	var re_check = /\r|\n/;
                	var re_newline = /\r\n|\n|\r/g;
                    if (re_check.test(text))
                    	text = text.replace(re_newline, " ");
                  
                    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\r\n|\r|\n/g, "<br/>").replace(/ /g, "&nbsp;");
                    
                };

                nexacro.__setDOMNode_MultilineText = function (node, text)
                {
                    // must be setted to node : whiteSpace="pre"/"pre-wrap", wordWrap="normal"
                    node.innerText = text;
                };
                nexacro.__setTextAreaDOMNode_Text = function (node, text)
                {
                    // must be setted to node : whiteSpace="pre", wordWrap="normal"
                    node.value = text;
                };
                nexacro.__getHTMLAttr_MultilineText = function (text)
                {
                	var re_check = /\r|\n/;
                	var re_newline = /\r\n|\n|\r/g;
                	if (re_check.test(text))
                		text = text.replace(re_newline, " ");

                	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\r\n|\r|\n/g, "<br/>").replace(/ /g, "&nbsp;");

                };
            })();
        }
        else
        {
            // has textContents & innerText
            // for use cache Object : use closure
            (function ()
            {
                nexacro.__setDOMNode_SinglelineText = function (node, text)
                {
                	var re_check = /\r|\n/;
                	var re_newline = /\r\n|\n|\r/g;
                    // must be setted to node : whiteSpace="pre", wordWrap="normal"
                    if (re_check.test(text))
                        node.textContent = text.replace(re_newline, " ");
                    else
                        node.textContent = text;
                };
                nexacro.__getHTMLAttr_SinglelineText = function (text)
                {
                	var re_check = /\r|\n/;
                	var re_newline = /\r\n|\n|\r/g;

                    if (re_check.test(text))
                        text = text.replace(re_newline, " ");
                    return text;
                };

                if (nexacro._Browser == "IE" || nexacro._Browser == "Safari")
                {
                    nexacro.__setDOMNode_MultilineText = function (node, text)
                    {
                    	// must be setted to node : whiteSpace="pre", wordWrap="normal"
                    	var re_check = /\r|\n/;
                    	var re_newline = /\r\n|\n|\r/g;

                        if (re_check.test(text))
                            text = text.replace(re_newline, "\n");
                        node.textContent = text;
                    };
                    nexacro.__getHTMLAttr_MultilineText = function (text)
                    {
                    	var re_check = /\r|\n/;
                    	var re_newline = /\r\n|\n|\r/g;

                        if (re_check.test(text))
                            text = text.replace(re_newline, "\n");
                        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\r\n|\r|\n/g, "<br/>");

                    };
                }
                else
                {
                    nexacro.__setDOMNode_MultilineText = function (node, text)
                    {
                    	// must be setted to node : whiteSpace="pre", wordWrap="normal"
                    	var re_check = /\r|\n/;
                    	var re_newline = /\r\n|\n|\r/g;
                        if (re_check.test(text))
                            text = text.replace(re_newline, "\r\n");
                        node.textContent = text;
                    };
                    nexacro.__getHTMLAttr_MultilineText = function (text)
                    {
                    	var re_check = /\r|\n/;
                    	var re_newline = /\r\n|\n|\r/g;
                        if (re_check.test(text))
                        	text = text.replace(re_newline, "\r\n");

                        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\r\n|\r|\n/g, "<br/>");
                        
                    };
                }
                nexacro.__setTextAreaDOMNode_Text = function (node, text)
                {
                    // must be setted to node : whiteSpace="pre", wordWrap="normal"
                    node.value = text;
                };
            })();
        }

        //process new line , not exist singleline
        nexacro.__setDOMNode_Text = function (node, text, _wordwrap)
        {
           // if (_wordwrap == "none")
           //     nexacro.__setDOMNode_SinglelineText(node, text);
           // else
                nexacro.__setDOMNode_MultilineText(node, text);
        };

        nexacro.__getHTMLAttr_Text = function (text, _wordwrap)
        {
            //if (_wordwrap == "none")
            //    return nexacro.__getHTMLAttr_SinglelineText(text);
           // else
                return nexacro.__getHTMLAttr_MultilineText(text);
        };

        nexacro.__setDOMNode_DecorateText = function (node, text)
        {
            node.innerHTML = nexacro._decorateString(text);
        };
        nexacro.__getHTMLAttr_DecorateText = function (text)
        {
            return nexacro._decorateString(text);
        };

        nexacro.__setHTMLAttr_Proeprty = function (node, property, value)
        {
            node.setAttribute(property, value);
        };

        nexacro.__getHTMLAttr_Proeprty = function (node, property)
        {
            return node.getAttribute(property);
        };

        nexacro.__removeHTMLAttr_Proeprty = function (node, property)
        {
            node.removeAttribute(property);
        };

        nexacro.__setHTMLElem_Proeprty = function (node, property, value)
        {
            node[property] =  value;
        };

        //-----------------------------------------------------------------------------
        // endof new DOM API for 14.1
        //-----------------------------------------------------------------------------


        //-----------------------------------------------------------------------------
        // old DOM Handling API for 14.1
        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_Absolute = function (node_style)
        {
            node_style.position = "absolute";
            node_style.overflow = "hidden";
        };
        //nexacro.__setDOMStyle_Relative = function (node_style)
        //{
        //    node_style.position = "relative";
        //    node_style.overflow = "hidden";
        //};
        nexacro.__setDOMStyle_Fixed = function (node_style)
        {
            node_style.position = "fixed";
            node_style.overflow = "hidden";
        };

        nexacro.__setDOMStyle_AbsoluteTransparent = function (node_style)
        {
            node_style.position = "absolute";
            node_style.overflow = "hidden";

            node_style.overflowX = "hidden";
            node_style.overflowY = "hidden";

            node_style.backgroundColor = "transparent";
        };

        nexacro.__getHTMLStyle_AbsoluteTransparent = function ()
        {
            return "position:absolute;overflow:hidden:overflow-x:hidden;overflow-y:hidden;background:transparent;";
        };


        //nexacro.__setDOMStyle_TextOverFlow = function (node_style)
        //{
        //    node_style.textOverflow = "ellipsis";
        //    node_style.whiteSpace = "nowrap";
        //    node_style.overflow = "hidden";
        //};

        // for TextArea
        if (nexacro._OS == "Android" || nexacro._Browser == "Opera")
        {
            nexacro.__setTextAreaDOMStyle_AbsoluteTransparent = function (node_style)
            {
                node_style.position = "absolute";
                node_style.overflow = "hidden";
                node_style.backgroundColor = "transparent";
            };

            nexacro.__getTextAreaHTMLStyle_AbsoluteTransparent = function ()
            {
                return "position:absolute;overflow:hidden;overflow-x:hidden;overflow-y:hidden;background:transparent;";
            };
        }
        else
        {
            nexacro.__setTextAreaDOMStyle_AbsoluteTransparent = function (node_style)
            {
                node_style.position = "absolute";
                node_style.overflow = "scroll";
                node_style.backgroundColor = "transparent";
            };

            nexacro.__getTextAreaHTMLStyle_AbsoluteTransparent = function ()
            {
                return "position:absolute;overflow:scroll;overflow-x:scroll;overflow-y:scroll;background:transparent;";
            };
        }

        //iOS Mobile Web Browser
        nexacro.__setMobileIframeDOMNodeStyleScroll = function (node_style)
        {
            node_style.overflow = "auto";
            node_style.webkitOverflowScrolling = "touch";
        };

        //doctype 추가로 인해 "px"를 붙여야 함 분리코드(nexacro._NEED_PIXEL_UNIT) 삭제
        //nexacro.__setDOMStyle_PosLeftTop = function (node_style, left, top)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.left = (left | 0) + "px";
        //    node_style.top = (top | 0) + "px";
        //};
        //nexacro.__setDOMStyle_PosRightTop = function (node_style, right, top)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.right = (right | 0) + "px";
        //    node_style.top = (top | 0) + "px";
        //};
        //nexacro.__setDOMStyle_PosLeftBottom = function (node_style, left, bottom)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.left = (left | 0) + "px";
        //    node_style.bottom = (bottom | 0) + "px";
        //};
        //nexacro.__setDOMStyle_PosRightBottom = function (node_style, right, bottom)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.right = (right | 0) + "px";
        //    node_style.bottom = (bottom | 0) + "px";
        //};

        //nexacro.__setDOMStyle_PosSize = function (node_style, left, top, width, height)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.left = (left | 0) + "px";
        //    node_style.top = (top | 0) + "px";
        //    node_style.width = (width | 0) + "px";
        //    node_style.height = (height | 0) + "px";
        //};
        //nexacro.__setDOMStyle_PosUnitSize = function (node_style, left, top, width, height)
        //{
        //    node_style.position = "absolute";
        //    node_style.overflow = "hidden";
        //    node_style.left = (left | 0) + "px";
        //    node_style.top = (top | 0) + "px";
        //    node_style.width = width;
        //    node_style.height = height;
        //};

        //if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
        //{
        //    nexacro.__setDOMStyle_TextSize = function (node_style, height)
        //    {
        //        node_style.maxHeight = (height | 0) + "px";
        //        node_style.height = (height | 0) + "px";
        //    };
        //}
        //else
        //{
        //    nexacro.__setDOMStyle_TextSize = function (node_style, height)
        //    {
        //        node_style.maxHeight = (height | 0) + "px";
        //    };
        //}


        //-----------------------------------------------------------------------------------
        // Control Style API Function
        //-----------------------------------------------------------------------------------
        if (nexacro._Browser == "IE")
        {
            if (nexacro._BrowserVersion < 9)
            {
                nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height)
                {
                    if (halign != node_style.textAlign)
                    {
                        node_style.textAlign = "";
                        if (halign) node_style.textAlign = halign;
                    }
                    var offset_top = 0;
                    if (valign && parent_height && txt_height)
                    {
                        switch (valign)
                        {
                            case "middle":
                                if (parent_height <= txt_height)
                                    break;
                                offset_top = ((parent_height - txt_height) / 2);
                                break;
                            case "bottom":
                                offset_top = (parent_height - txt_height);
                                break;
                        }
                        node_style.paddingTop = offset_top + "px";
                        node_style.paddingBottom = "";
                        node_style.height = (parent_height - offset_top) + "px";
                        node_style.width = parent_width + "px";
                    }
                };
            }
            else if (nexacro._BrowserVersion < 11)
            {
                nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height)
                {
                    node_style.textAlign = halign;
                    if (valign && parent_height && txt_height)
                    {
                        var offset_top = 0, offset_bottom = 0;
                        switch (valign)
                        {
                            case "top":
                                offset_bottom = (parent_height - txt_height);
                                break;
                            case "bottom":
                                offset_top = (parent_height - txt_height);
                                break;
                        }
                        node_style.paddingTop = offset_top + "px";
                        node_style.paddingBottom = offset_bottom + "px";
                        node_style.height = (parent_height - offset_top - offset_bottom) + "px";
                        node_style.width = parent_width + "px";
                    }
                };
            }
            else
            {
                nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height)
                {
                    node_style.textAlign = halign;
                    if (valign && parent_height && txt_height)
                    {
                        switch (valign)
                        {
                            case "top":
                                node_style.paddingTop = "0px";
                                node_style.paddingBottom = (parent_height - txt_height) > 0 ? (parent_height - txt_height) + "px" : "0px";
                                break;
                            case "middle":
                                node_style.paddingTop = "0px";
                                node_style.paddingBottom = "0px";
                                break;
                            case "bottom":
                                node_style.paddingTop = (parent_height - txt_height) + "px";
                                node_style.paddingBottom = "0px";
                                break;
                        }
                    }
                };
            }
        }
        else if (nexacro._Browser == "WebKit" || nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")
        {
            nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height)
            {
                node_style.textAlign = halign;
                if (valign && parent_height && txt_height)
                {
                    switch (valign)
                    {
                        case "top":
                            node_style.top = "0px";
                            node_style.height = txt_height + "px";
                            break;
                        case "middle":
                            node_style.top = "0px";
                            node_style.height = parent_height + "px";
                            break;
                        case "bottom":
                            node_style.top = (parent_height - txt_height) + "px";
                            node_style.height = txt_height + "px";
                            break;
                    }
                }
            };
        }
        else
        {
            nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height)
            {
                node_style.textAlign = halign;
                if (valign && parent_height && txt_height)
                {
                    switch (valign)
                    {
                        case "top":
                            node_style.paddingTop = "0px";
                            node_style.paddingBottom = (parent_height - txt_height) > 0 ? (parent_height - txt_height) + "px" : "0px";
                            break;
                        case "middle":
                            node_style.paddingTop = "0px";
                            node_style.paddingBottom = "0px";
                            break;
                        case "bottom":
                            node_style.paddingTop = (parent_height - txt_height) + "px";
                            node_style.paddingBottom = "0px";
                            break;
                    }
                }
            };
        }

        nexacro.__setTextAreaDOMNodeStyleAlignXY = function (node_style, halign, valign, blank_height)
        {
            node_style.textAlign = halign;

            switch (valign)
            {
                case "top":
                    node_style.paddingTop = "0px";
                    node_style.paddingBottom = "0px";
                    break;
                case "middle":
                    node_style.paddingTop = (blank_height / 2) + "px";
                    node_style.paddingBottom = "0px";
                    break;
                case "bottom":
                    node_style.paddingTop = blank_height + "px";
                    node_style.paddingBottom = "0px";
                    break;
            }
        };

        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_LineHeight = function (node_style, lineheight)
        {
            node_style.lineHeight = (lineheight < 0) ? "" : lineheight + "px";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
        {   // IE 6,7 은 pre-wrap이 없음. 'white-space:pre;word-wrap:break-word;'로 설정하면 pre-wrap과 동일한 결과.
            nexacro.__setDOMStyle_WordWrap = function (node_style, use_wordwrap)
            {
                if (use_wordwrap == "char")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "break-all";
                }
                else if (use_wordwrap == "english")
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "";
                }
                else
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "normal";
                }
            };
        }
        else
        {
            nexacro.__setDOMStyle_WordWrap = function (node_style, use_wordwrap)
            {
                if (use_wordwrap == "char") // 오페라는 word가 english로 동작함.
                {
                    node_style.whiteSpace = "pre-wrap";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "break-all";
                }
                else if (use_wordwrap == "english")
                {
                    node_style.whiteSpace = "pre-wrap";
                    node_style.wordWrap = "break-word";
                    node_style.wordBreak = "";
                }
                else
                {
                    node_style.whiteSpace = "pre";
                    node_style.wordWrap = "normal";
                    node_style.wordBreak = "";
                }
            };
        }

        nexacro.__setTextAreaDOMNode_WordWrap = function (node, wordwrap)
        {
            var node_style = node.style;

            if (wordwrap == "char" || wordwrap == "english")
                node.wrap = "hard";
            else
                node.wrap = "off";

            nexacro.__setDOMStyle_WordWrap(node_style, wordwrap);
        };

        nexacro.__setDOMNode_FocusBorder = function (node, border)
        {
            // TODO
        };

        nexacro.__setDOMNode_TabIndentSize = function (node, nTabSize)
        {
            //TODO : 2014.01.14
            //Implemented by zoo
            //Chrome only
            var node_style = node.style;

            node_style.tabSize = nTabSize;

        };

        nexacro.__setDOMNode_SelectBackgroundColor = function (node, color)
        {
            //TODO :
        };
        nexacro.__setDOMNode_SelectColor = function (node, color)
        {
            //TODO :
        };
        nexacro.__setDOMNode_CaretColor = function (node, color)
        {
            //TODO :
        };
        nexacro.__setDOMNode_CompositeColor = function (node, color)
        {
            //TODO :
        };

        if (nexacro._Browser_Transform === 0)
        { // not support
            nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
            {
            };
            nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
            {
            };

            nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
            {
                return "";
            };
            nexacro.__getHTMLStyle_TransformScale = function (scale)
            {
                return "";
            };
        }
        else if (nexacro._Browser_Transform == 1)
        { // HTML5
            nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
            {
                var value = "";
                if (bMirror)
                {
                    value = "ScaleX(-1)";
                }
                node_style.transform = value;
            };
            nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
            {
                node_style.transformOrigin = "0 0";
                node_style.transform = "scale(" + scale + ", " + scale + ")";
            };

            nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
            {
                if (bMirror)
                    return "transform:ScaleX(-1);";
                return "";
            };
            nexacro.__getHTMLStyle_TransformScale = function (scale)
            {
                return "transform-origin:0 0;transform:scale(" + scale + "," + scale + ");";
            };
        }
        else if (nexacro._Browser_Transform == 2)
        { // Legacy
            if (nexacro._Browser == "IE")
            {
                nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
                {
                    var value = "";
                    if (bMirror)
                    {
                        value = "ScaleX(-1)";
                    }
                    node_style.msTransform = value;
                };
                nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
                {
                    node_style.msTransformOrigin = "0 0";
                    node_style.msTransform = "scale(" + scale + ", " + scale + ")";
                };

                nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
                {
                    if (bMirror)
                        return "-ms-transform:ScaleX(-1);";
                    return "";
                };
                nexacro.__getHTMLStyle_TransformScale = function (scale)
                {
                    return "-ms-transform-origin:0 0;-ms-transform:scale(" + scale + "," + scale + ");";
                };
            }
            else if (nexacro._BrowserType == "WebKit")
            {
                nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
                {
                    var value = "";
                    if (bMirror)
                    {
                        value = "ScaleX(-1)";
                    }
                    node_style.WebkitTransform = value;
                };
                nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
                {
                    // RTL Mirror 기능과 중첩될 경우 문제가 발생할 가능성이 있으나
                    // Mirror는 BackgroundImage에 적용되고 Scale은 Form의 Container에만 적용이 된다.
                    // 동시 사용될 경우 다른 방식으로 구현해야 함.
                    node_style.WebkitTransformOriginX = 0;
                    node_style.WebkitTransformOriginY = 0;
                    node_style.WebkitTransform = "scale(" + scale + ", " + scale + ")";
                };

                nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
                {
                    if (bMirror)
                        return "-webkit-transform:ScaleX(-1);";
                    return "";
                };
                nexacro.__getHTMLStyle_TransformScale = function (scale)
                {
                    return "-webkit-transform-origin:0 0;-webkit-transform:scale(" + scale + "," + scale + ");";
                };
            }
            else if (nexacro._BrowserType == "Gecko")
            {
                nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
                {
                    var value = "";
                    if (bMirror)
                    {
                        value = "ScaleX(-1)";
                    }
                    node_style.MozTransform = value;
                };
                nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
                {
                    node_style.MozTransformOrigin = "0px 0px";
                    node_style.MozTransform = "scale(" + scale + ", " + scale + ")";
                };

                nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
                {
                    if (bMirror)
                        return "-moz-transform:ScaleX(-1);";
                    return "";
                };
                nexacro.__getHTMLStyle_TransformScale = function (scale)
                {
                    return "-moz-transform-origin:0px 0px;-moz-transform:scale(" + scale + "," + scale + ");";
                };
            }
            else if (nexacro._BrowserType == "Opera")
            {
                nexacro.__setDOMStyle_TransformMirror = function (node_style, bMirror)
                {
                    var value = "";
                    if (bMirror)
                    {
                        value = "ScaleX(-1)";
                    }
                    node_style.OTransform = value;
                };
                nexacro.__setDOMStyle_TransformScale = function (node_style, scale)
                {
                    node_style.OTransformOriginX = 0;
                    node_style.OTransformOriginY = 0;
                    node_style.OTransform = "scale(" + scale + ", " + scale + ")";
                };

                nexacro.__getHTMLStyle_TransformMirror = function (bMirror)
                {
                    if (bMirror)
                        return "-o-transform:ScaleX(-1);";
                    return "";
                };
                nexacro.__getHTMLStyle_TransformScale = function (scale)
                {
                    return "-o-transform-origin-x:0;-o-transform-origin-y:0;-o-transform:scale(" + scale + "," + scale + ");";
                };
            }
        }


        //====================================================
        // Input
        //====================================================

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        { // IE7,8
            nexacro.__changeInputDOMNodeType = function (node, type)
            {
                if (node.type == type)
                    return node;

                var doc = node.ownerDocument;
                var parent = (node.parentNode || node.parentElement);
                var outerHTML = node.outerHTML;

                outerHTML = outerHTML.replace(/type=[a-z]*/, "");
                outerHTML = outerHTML.replace(/value=""/, "value=\"" + node.value + "\"");

                var new_node = doc.createElement(outerHTML);
                new_node.setAttribute("type", type ? type : "text");

                nexacro.__insertDOMNode(parent, new_node, node);
                nexacro.__removeDOMNode(parent, node);

                return new_node;
            };
        }
        else
        {
            nexacro.__changeInputDOMNodeType = function (node, type)
            {
                if (node.type != type)
                    node.type = type;
                return node;
            };
        }

        nexacro.__setDOMNode_ImeMode = function (node, mode)
        {
            var imemodestr = null;
            if (mode == "alpha" || mode == "alpha,full")
            {
                imemodestr = "inactive";
            }
            else if (mode == "hangul" || mode == "hangul,full")
            {
                imemodestr = "active";
            }
            else if (mode == "katakana" || mode == "katakana,full")
            {
                imemodestr = "auto";
            }
            else if (mode == "hiragana")
            {
                imemodestr = "active";
            }
            else if (mode == "direct")
            {
                imemodestr = "inactive";
            }
            else if (mode == "disabled")
            {
                imemodestr = "disabled";
            }
            else
            {
                imemodestr = "";
            }
            node.style.imeMode = imemodestr;
        };

        nexacro.__setDOMNodeTextTransform = function (node, mode)
        {
            var modestr = null;
            if (mode == "upper")
            {
                modestr = "uppercase";
            }
            else if (mode == "lower")
            {
                modestr = "lowercase";
            }
            else
            {
                modestr = "";
            }
            node.style.textTransform = modestr;
        };

        nexacro.__setDOMNode_Select = function (_doc, node)
        {
            node.select();
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__setDOMNode_SetSelect = function (_doc, node, start, end)
            {
                if (typeof start == 'number')
                {
                    end = (typeof end == 'number') ? end : start;
                    if (node.createTextRange)
                    {
                        var range = node.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    }
                }
            };

            nexacro.__setTextAreaDOMNodeSetSelect = function (_doc, node, start, end)
            {
                if (typeof start == 'number')
                {
                    if (node.createTextRange)
                    {
                        var range = node.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    }
                }
            };
        }
        else
        {
            nexacro.__setDOMNode_SetSelect = function (_doc, node, start, end)
            {
                if (typeof start == 'number')
                {
                    end = (typeof end == 'number') ? end : start;
                    if (node.setSelectionRange)
                    {
                        node.setSelectionRange(start, end);
                    }
                    else if (node.createTextRange)
                    {
                        var range = node.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    }
                }
            };

            nexacro.__setTextAreaDOMNodeSetSelect = function (_doc, node, start, end)
            {
                if (typeof start == 'number')
                {
                    if (node.setSelectionRange)
                    {
                        node.setSelectionRange(start, end);
                    }
                    else if (node.createTextRange)
                    {
                        var range = node.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    }
                }
            };
        }

        nexacro.__getDOMNodeCaretPos = function (_doc, node)
        {
            if (_doc.activeElement != node)
                return -1;

            var sel = nexacro.__getDOMNodeSelectionRange(_doc, node);
            return { begin: sel[0], end: sel[1] };
        };

        nexacro.__getTextAreaDOMNodeCaretPos = function (_doc, node)
        {
            if (_doc.activeElement != node)
                return -1;

            var sel = nexacro.__getTextAreaDOMNodeSelectionRange(_doc, node);
            return { begin: sel[0], end: sel[1] };
        };

        nexacro.__getDOMNodeSelectionRange = function (_doc, node)
        {
            var begin = 0, end = 0, direction = "none";
            if (node.setSelectionRange)
            {
                // selectionStart/selectionEnd on input type=“number” no longer allowed in Chrome
                try
                {
                    begin = node.selectionStart;
                    end = node.selectionEnd;
                    direction = ('selectionDirection' in node ? node.selectionDirection : "none");
                }
                catch (e)
                {

                }
            }
            else if (_doc.selection && _doc.selection.createRange)
            {
                var range = _doc.selection.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }

            return [begin, end, direction];
        };

        nexacro.__getTextAreaDOMNodeSelectionRange = function (_doc, node)
        {
            var begin = 0, end = 0, direction = "none";
            var value = node.value;

            if (node.setSelectionRange)
            {
                begin = node.selectionStart;
                end = node.selectionEnd;
                direction = ('selectionDirection' in node ? node.selectionDirection : "none");

                //begin += value.slice(0, begin).split('\n').length - 1;
                //end += value.slice(0, end).split('\n').length - 1;
            }
            else if (_doc.selection && _doc.selection.createRange)
            {
                var range = _doc.selection.createRange();
                if (range && range.parentElement() == node)
                {
                    var n_value = value.replace(/\r\n/g, '\n');
                    var len = n_value.length;

                    var txtRange = node.createTextRange();
                    txtRange.moveToBookmark(range.getBookmark());
                    var endRange = node.createTextRange();
                    endRange.collapse(false);

                    if (txtRange.compareEndPoints('StartToEnd', endRange) > -1)
                    {
                        begin = end = len;
                    }
                    else
                    {
                        begin = -txtRange.moveStart('character', -len);
                        //begin += n_value.slice(0, begin).split('\n').length - 1;
                        if (txtRange.compareEndPoints('EndToEnd', endRange) > -1)
                        {
                            end = len;
                        }
                        else
                        {
                            end = -txtRange.moveEnd('character', -len);
                            //end += n_value.slice(0, end).split('\n').length - 1;
                        }
                    }
                }
            }

            return [begin, end, direction];
        };

        nexacro.__getDOMNodeCaretLine = function (_doc, node, wordwrap, font)
        {
            if (!font)
            {
                var font_val;
                var _win = _doc.defaultView || _doc.parentWindow;
                if (_win.getComputedStyle)
                {
                    font_val = _win.getComputedStyle(node).getPropertyValue("font");
                }
                else // for IE
                {
                    font_val = node.currentStyle["font"];
                }
                font = nexacro.FontObject(font_val);
            }

            var start = 0;
            if (typeof node.selectionStart == "number" && typeof node.selectionEnd == "number")
            {
                if (nexacro._Browser != "IE" && node.selectionDirection == "backward")
                    start = node.selectionEnd;
                else // forward | none
                    start = node.selectionStart;

                var text = node.value.slice(0, start);
                var textarr = text.split("\n");
                if (textarr == null)
                    return 1;

                var len = textarr.length;
                if (wordwrap != "none" && len > 0 && font != null)
                {
                    var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                    if (cacheManager == null)
                    {
                        cacheManager = new nexacro._TextInfoCacheManager(font);
                        nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                    }

                    var line = 0;
                    var text_size, font_height = cacheManager.font_height;
                    var content_width = parseInt(node.clientWidth);
                    for (var i = 0; i < len; i++)
                    {
                        text_size = nexacro._getWordwrapTextSize(cacheManager, textarr[i], content_width, wordwrap);
                        line += Math.round(text_size[1] / font_height);
                    }

                    return line;
                }
                else
                {
                    return len;
                }
            }
            else
            {
                node.setActive();

                var range = _doc.selection.createRange();
                if (range && range.parentElement() == node)
                {
                    var len = node.value.length;

                    var textInputRange = node.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());

                    var endRange = node.createTextRange();
                    endRange.collapse(false);

                    var text;
                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1)
                    {
                        text = node.value;
                    }
                    else
                    {
                        start = -textInputRange.moveStart("character", -len);
                        text = node.value.slice(0, start);
                    }

                    var textarr = text.replace(/\r\n/g, "\n").split("\n");
                    if (textarr == null)
                        return 1;

                    len = textarr.length;
                    if (wordwrap != "none" && len > 0 && font != null)
                    {
                        var content_width = parseInt(node.clientWidth);

                        var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                        if (cacheManager == null)
                        {
                            cacheManager = new nexacro._TextInfoCacheManager(font);
                            nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                        }

                        var line = 0;
                        var text_size, font_height = cacheManager.font_height;
                        for (var i = 0; i < len; i++)
                        {
                            text_size = nexacro._getWordwrapTextSize(cacheManager, textarr[i], content_width, wordwrap);
                            line += Math.round(text_size[1] / font_height);
                        }
                        return line;
                    }
                    else
                    {
                        return len;
                    }
                }
            }
            return 0;
        };

        nexacro.__getDOMNodeTextLineCount = function (_doc, node, text, wordwrap, font)
        {
            if (!font)
            {
                var font_val;
                var _win = _doc.defaultView || _doc.parentWindow;
                if (_win.getComputedStyle)
                {
                    font_val = _win.getComputedStyle(node).getPropertyValue("font");
                }
                else // for IE
                {
                    font_val = node.currentStyle["font"];
                }
                font = nexacro.FontObject(font_val);
            }

            if (text == "")
                return 0;

            if (wordwrap != "none" && font != null)
            {
                var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                if (cacheManager == null)
                {
                    cacheManager = new nexacro._TextInfoCacheManager(font);
                    nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                }

                var font_height = cacheManager.font_height;
                var content_width = parseInt(node.clientWidth);
                var text_size = nexacro._getWordwrapTextSize(cacheManager, text, content_width, wordwrap);
                return Math.round(text_size[1] / font_height);

                return line;
            }
            else
            {
                var textarr = text.replace(/\r\n/g, "\n").split("\n");
                return textarr.length;
            }
        };

        // recognize '\t' charater
        nexacro.__getTextAreaDOMNodeCaretLine = function (_doc, node, wordwrap, font)
        {
            if (!font)
            {
                var font_val;
                var _win = _doc.defaultView || _doc.parentWindow;
                if (_win.getComputedStyle)
                {
                    font_val = _win.getComputedStyle(node).getPropertyValue("font");
                }
                else // for IE
                {
                    font_val = node.currentStyle["font"];
                }
                font = nexacro.FontObject(font_val);
            }

            var start = 0;
            if (typeof node.selectionStart == "number" && typeof node.selectionEnd == "number")
            {
                if (nexacro._Browser != "IE" && node.selectionDirection == "backward")
                    start = node.selectionEnd;
                else // forward | none
                    start = node.selectionStart;

                var text = node.value.slice(0, start);
                var textarr = text.split("\n");
                if (textarr == null)
                    return 1;

                var len = textarr.length;
                if (wordwrap != "none" && len > 0 && font != null)
                {
                    var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                    if (cacheManager == null)
                    {
                        cacheManager = new nexacro._TextInfoCacheManager(font);
                        nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                    }

                    var line = 0;
                    var text_size, font_height = cacheManager.font_height;
                    var content_width = parseInt(node.clientWidth);
                    for (var i = 0; i < len; i++)
                    {
                        text_size = nexacro._getTextAreaWordwrapTextSize(cacheManager, textarr[i], content_width, wordwrap);
                        line += Math.round(text_size[1] / font_height);
                    }

                    return line;
                }
                else
                {
                    return len;
                }
            }
            else
            {
                node.setActive();

                var range = _doc.selection.createRange();
                if (range && range.parentElement() == node)
                {
                    var len = node.value.length;

                    var textInputRange = node.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());

                    var endRange = node.createTextRange();
                    endRange.collapse(false);

                    var text;
                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1)
                    {
                        text = node.value;
                    }
                    else
                    {
                        start = -textInputRange.moveStart("character", -len);
                        text = node.value.slice(0, start);
                    }

                    var textarr = text.replace(/\r\n/g, "\n").split("\n");
                    if (textarr == null)
                        return 1;

                    len = textarr.length;
                    if (wordwrap != "none" && len > 0 && font != null)
                    {
                        var content_width = parseInt(node.clientWidth);

                        var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                        if (cacheManager == null)
                        {
                            cacheManager = new nexacro._TextInfoCacheManager(font);
                            nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                        }

                        var line = 0;
                        var text_size, font_height = cacheManager.font_height;
                        for (var i = 0; i < len; i++)
                        {
                            text_size = nexacro._getTextAreaWordwrapTextSize(cacheManager, textarr[i], content_width, wordwrap);
                            line += Math.round(text_size[1] / font_height);
                        }
                        return line;
                    }
                    else
                    {
                        return len;
                    }
                }
            }
            return 0;
        };

        // recognize '\t' charater
        nexacro.__getTextAreaDOMNodeTextLineCount = function (_doc, node, text, wordwrap, font)
        {
            if (!font)
            {
                var font_val;
                var _win = _doc.defaultView || _doc.parentWindow;
                if (_win.getComputedStyle)
                {
                    font_val = _win.getComputedStyle(node).getPropertyValue("font");
                }
                else // for IE
                {
                    font_val = node.currentStyle["font"];
                }
                font = nexacro.FontObject(font_val);
            }

            if (text == "")
                return 0;

            if (wordwrap != "none" && font != null)
            {
                var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
                if (cacheManager == null)
                {
                    cacheManager = new nexacro._TextInfoCacheManager(font);
                    nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
                }

                var font_height = cacheManager.font_height;
                var content_width = parseInt(node.clientWidth);
                var text_size = nexacro._getTeatAreaWordwrapTextSize(cacheManager, text, content_width, wordwrap);
                return Math.round(text_size[1] / font_height);

                return line;
            }
            else
            {
                var textarr = text.replace(/\r\n/g, "\n").split("\n");
                return textarr.length;
            }
        };

        nexacro.__getDOMNodeValue = function (node)
        {
            if (node)
                return node.value;
        };



        //=============================================================================
        nexacro.__getHTMLStyleAbsolute = function ()
        {
            return "position:absolute;overflow:hidden;";
        };
        nexacro.__getHTMLStyleRelative = function ()
        {
            return "position:relative;overflow:hidden;";
        };
        nexacro.__getHTMLStyleAbsoluteTransparent = function ()
        {
            return "position:absolute;overflow:hidden;background-color:transparent;";
        };

        //For iOS
        nexacro.__getHTMLStyleMobileIframeDOMNodeStyleScroll = function ()
        {
            return " overflow : auto; webkitOverflowScrolling :touch;";
        };

        // for TextArea

        nexacro.__getTextAreaHTMLStyleAbsoluteTransparent = function ()
        {
            return "position:relative;overflow:scroll;background-color:transparent;";
        };


        //iOS Mobile Web Browser
        nexacro.__getMobileIframeHTMLStyleScroll = function ()
        {
            return "overflow:auto;-webkit-overflow-scrolling:touch;";
        };

        nexacro.__getHTMLStylePosLeftTop = function (left, top)
        {
            return "position:absolute;overflow:hidden;left:" + (left | 0) + "px;top:" + (top | 0) + "px;";
        };
        nexacro.__getHTMLStylePosRightTop = function (right, top)
        {
            return "position:absolute;overflow:hidden;right:" + (right | 0) + "px;top:" + (top | 0) + "px;";
        };
        nexacro.__getHTMLStylePosLeftBottom = function (left, bottom)
        {
            return "position:absolute;overflow:hidden;left:" + (left | 0) + "px;bottom:" + (bottom | 0) + "px;";
        };
        nexacro.__getHTMLStylePosRightBottom = function (right, bottom)
        {
            return "position:absolute;overflow:hidden;right:" + (right | 0) + "px;bottom:" + (bottom | 0) + "px;";
        };

        nexacro.__getHTMLStylePosSize = function (left, top, width, height)
        {
            return "position:absolute;overflow:hidden;" +
    		    "left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;" +
			    "width:" + (width | 0) + "px;" + "height:" + (height | 0) + "px;";
        };
        nexacro.__getHTMLStylePosUnitSize = function (left, top, width, height)
        {
            return "position:absolute;overflow:hidden;" +
    		    "left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;" +
			    "width:" + width + ";" + "height:" + height + ";";
        };

        nexacro.__getHTMLStylePos = function (left, top)
        {
            return "left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;";
        };
        nexacro.__getHTMLStyleSize = function (width, height)
        {
            if (width >= 0 && height >= 0)
            {
                return "width:" + (width | 0) + "px;" + "height:" + (height | 0) + "px;";
            }
            return "";
        };
        nexacro.__getHTMLStyleUnitSize = function (width, height)
        {
            return "width:" + (width | 0) + ";" + "height:" + (height | 0) + ";";
        };

        //-----------------------------------------------------------------------------
        nexacro.__getHTMLAttrSize = function (width, height)
        {
            if (width >= 0 && height >= 0)
            {
                return " width='" + width + "px' height='" + height + "px'";
            }
            return "";
        };
        nexacro.__getHTMLCanvasAttrSize = function (width, height)
        {
            if (width >= 0 && height >= 0)
            {
                return " width='" + width + "' height='" + height + "'";
            }
            return "";
        };



        (function ()
        {
            var re_check = /\r|\n/;
            var re_newline = /\r\n|\n|\r/g;
            nexacro.__getSinglelineText = function (text)
            {
                if (re_check.test(text))
                {
                    return text.replace(re_newline, " ");
                }
                else
                {
                    return text;
                }
            };
        })();


        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height)
            {
                var halign_str = "text-align:" + halign + ";";
                if (valign == "top")
                {
                    return halign_str + "padding-top:0px;";
                }
                else if (valign == "middle")
                {
                    return halign_str + ((container_height > txt_height) ?
					    "padding-top:" + ((container_height - txt_height) / 2) + "px;" : "");
                }
                else if (valign == "bottom")
                {
                    return halign_str + ((container_height - txt_height) ?
					    "padding-top:" + (container_height - txt_height) + "px;" : "");
                }
                return halign_str;
            };
        }
        else if (nexacro._BrowserType == "WebKit")
        {
            nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height)
            {
                var halign_str = "text-align:" + halign + ";";
                if (valign == "top")
                {
                    return halign_str + "top:0px;height:" + txt_height + "px;";
                }
                else if (valign == "middle")
                {
                    return halign_str + "top:0px;height:" + container_height + "px;";
                }
                else if (valign == "bottom")
                {
                    return halign_str + "top:" + (container_height - txt_height) + "px;height:" + txt_height + "px;";
                }
                return halign_str;
            };
        }
        else
        {
            nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height)
            {
                var halign_str = "text-align:" + halign + ";";
                if (valign == "top")
                {
                    return halign_str + "padding-top:0px;padding-bottom:" + (container_height - txt_height) + "px;";
                }
                else if (valign == "middle")
                {
                    return halign_str + "padding-top:0px;padding-bottom:0px;";
                }
                else if (valign == "bottom")
                {
                    return halign_str + "padding-top:" + (container_height - txt_height) + "px;padding-bottom:0px;";
                }
                return halign_str;
            };
        }

        nexacro.__getTextAreaHTMLStyleAlignXY = function (halign, valign, blank_height)
        {
            blank_height = blank_height >= 0 ? blank_height : 0;
            if (valign == "top")
            {
                return "text-align:" + halign + ";padding-top:0px;padding-bottom:0px;";
            }
            else if (valign == "middle")
            {
                return "text-align:" + halign + ";padding-top:" + (blank_height / 2) + "px;padding-bottom:0px;";
            }
            else if (valign == "bottom")
            {
                return "text-align:" + halign + ";padding-top:" + blank_height + "px;padding-bottom:0px;";
            }
            return "text-align:" + halign + ";";
        };

        nexacro.__getHTMLStyleVAlignMargin = function (valign, container_height, txt_height)
        {
            var offset = 0;
            if (valign == "middle")
            {
                offset = (container_height - txt_height) / 2;
            }
            else if (valign == "bottom")
            {
                offset = (container_height - txt_height);
            }
            return "margin-top:" + offset + "px;";
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        { // IE7,8
            nexacro.__getHTMLStyleCursor = function (cursor, deftype)
            {
                var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
                if (cur_type == "no")
                {
                    cur_type = "not-allowed"; // it was not work in opera
                }
                else if (cur_type == "pointer")
                {
                    // For MS old browser(ie6, 7, 8)
                    cur_type = "hand";
                }
                else if (cur_type == "arrowwait")
                {
                    cur_type = "progress";
                }
                else if (cur_type == "arrow")
                {
                    cur_type = "default";
                }
                return "cursor:" + cur_type + ";";
            };
        }
        else if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9))
        { // HTML5 || IE9 ==> not IE7,8
            nexacro.__getHTMLStyleCursor = function (cursor, deftype)
            {
                var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
                if (cur_type == "no")
                {
                    cur_type = "not-allowed"; // it was not work in opera
                }
                else if (cur_type == "hand")
                {
                    cur_type = "pointer";
                }
                else if (cur_type == "text")
                {
                    cur_type = "text";
                }
                else if (cur_type == "arrow")
                {
                    cur_type = "default";
                }
                else if (cur_type == "arrowwait")
                {
                    cur_type = "progress";
                }
                return "cursor:" + cur_type + ";";
            };
        }

        //if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        //{ // IE7,8
        //    nexacro.__getHTMLStyleShadow = function (shadow)
        //    {
        //        return "";
        //    };
        //}
        //else if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9)
        //{ // IE9
        //    nexacro.__getHTMLStyleShadow = function (shadow)
        //    {
        //        return "box-shadow:" + shadow._sysvalue + ";";
        //    };
        //}
        //else if (nexacro._Browser == "Gecko" && nexacro._BrowserVersion < 2)
        //{ // not HTML5 -> Gecko
        //    nexacro.__getHTMLStyleShadow = function (shadow)
        //    {
        //        return "-moz-box-shadow:" + shadow._sysvalue + ";";
        //    };
        //}
        //else if (nexacro._BrowserType == "WebKit")
        //{ // non HTML5 -> Webkit
        //    nexacro.__getHTMLStyleShadow = function (shadow)
        //    {
        //        return "-webkit-box-shadow:" + shadow._sysvalue + ";";
        //    };
        //}
        //else
        //{ // HTML5
        //    nexacro.__getHTMLStyleShadow = function (shadow)
        //    {
        //        return "box-shadow:" + shadow._sysvalue + ";";
        //    };
        //}

        //-----------------------------------------------------------------------------
        nexacro.__setDOMStyle_LineHeight = function (lineheight)
        {
            return (lineheight < 0) ? "" : "line-height:" + lineheight + "px;";
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__getHTMLAttrWordWrap = function (use_wordwrap)
            {
                if (use_wordwrap != "none")
                    return " wrap='hard'";
                else
                    return " wrap='off'";
            };
        }
        else
        {
            nexacro.__getHTMLAttrWordWrap = function (use_wordwrap)
            {
                return "";
            };
        }

        //if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
        //{   // IE 6,7은 pre-wrap이 없음. 'white-space:pre;word-wrap:break-word;'로 설정하면 pre-wrap과 동일한 결과.
        //    nexacro.__getHTMLStyleWordWrap = function (use_wordwrap)
        //    {
        //        if (use_wordwrap == "char" || use_wordwrap == "english")
        //            return "white-space:pre;word-wrap:break-word;";
        //        else
        //            return "white-space:pre;word-wrap:normal;";
        //    };
        //}
        //else
        //{
        //    nexacro.__getHTMLStyleWordWrap = function (use_wordwrap)
        //    {
        //        if (use_wordwrap == "char")
        //            return "white-space:pre;word-wrap:break-word;";
        //        else if (use_wordwrap == "english")
        //            return "white-space:pre-wrap;word-wrap:break-word;";
        //        else
        //            return "white-space:pre;word-wrap:normal;";
        //    };
        //}

        nexacro.__getHTMLAttrFocusBorder = function (shadow)
        {
            // TODO
            return "";
        };

        nexacro.__getHTMLAttr_TabIndentSize = function (size)
        {
            // TODO
            return "";
        };

        nexacro.__getHTMLAttr_MaxLength = function (maxlength)
        {
            return " maxLength='" + ((maxlength > 0) ? maxlength : 65535) + "'";
        };

        //====================================================
        // Input
        //====================================================
        //nexacro.__getHTMLStyleDecorateText = function (text)
        //{
        //    "text-decoration:" + nexacro._encodeXML(nexacro._decorateString(text)) + ";";
        //};

        nexacro.__getHTMLStyle_ImeMode = function (mode)
        {
            var imemodestr = null;
            if (mode == "alpha" || mode == "alpha,full")
            {
                imemodestr = "inactive";
            }
            else if (mode == "hangul" || mode == "hangul,full")
            {
                imemodestr = "active";
            }
            else if (mode == "katakana" || mode == "katakana,full")
            {
                imemodestr = "auto";
            }
            else if (mode == "hiragana")
            {
                imemodestr = "active";
            }
            else if (mode == "direct")
            {
                imemodestr = "inactive";
            }
            else if (mode == "disabled")
            {
                imemodestr = "disabled";
            }
            else
            {
                return "";
            }
            return "ime-mode:" + imemodestr + ";";
        };

        nexacro.__getHTMLAttrSelectBackgroundColor = function (color)
        {
            // TODO
            return "";
        };
        nexacro.__getHTMLAttrSelectColor = function (color)
        {
            // TODO
            return "";
        };
        nexacro.__getHTMLAttrCaretColor = function (color)
        {
            // TODO
            return "";
        };
        nexacro.__getHTMLAttrCompositeColor = function (color)
        {
            // TODO
            return "";
        };

        nexacro.__getHTMLStyle_TextTransfrom = function (mode)
        {
            var modestr = null;
            if (mode == "upper")
            {
                modestr = "uppercase";
            }
            else if (mode == "lower")
            {
                modestr = "lowercase";
            }
            else
            {
                return "";
            }
            return "text-transform:" + modestr + ";";
        };

        //=============================================================================
        // focus
        nexacro._firstLoadFocus = true; //IE11
        nexacro.__isActiveWindow = function (_doc)
        {
            if (_doc.hasFocus)
                return _doc.hasFocus();
        };

        // 최초 실행시 Window의 active여부를 알수 없기때문에 내부 플래그 세팅을 위해 호출
        // Window의 Active여부를 리턴한다. 내부 flag변수도 세팅한다.
        nexacro._checkWindowActive = function (_window)
        {
            var is_active;
            var _doc = _window._doc;
            if (_doc)
            {
                if (_doc.hasFocus)
                {
                    is_active = _doc.hasFocus();
                    _window._is_active_window = is_active;
                }

                // hasFocus 미지원 브라우저 -> 최초에는 어쩔수가 없음.
                if (is_active === undefined)
                    is_active = _window._is_active_window;
            }

            return is_active;
        };


        if (nexacro._Browser == "IE")
        {
            if (nexacro._BrowserVersion <= 8)
            {
                nexacro.__setDOMNode_Focus = function (node)
                {
                    var is_active_window;
                    var owner_doc = (node.ownerDocument || node.document);
                    if (owner_doc.hasFocus)
                    {
                        is_active_window = owner_doc.hasFocus();
                    }
                    if (is_active_window === undefined)
                    {
                        // active window flag 통일 (nexacro.Window)
                        var _window = nexacro._findDocumentWindow(owner_doc);
                        if (_window)
                        {
                            is_active_window = _window._is_active_window;
                        }
                    }

                    if (is_active_window)
                    {
                        owner_doc.focus();

                        if (node.unselectable == "on")
                        {
                            node.unselectable == "off";
                            try
                            {
                                node.setActive();
                            }
                            catch (e)
                            {
                                // IE8이하에서 unselectable 처리 시 에러발생하는 경우가 있음.
                            }
                            node.unselectable == "on";
                        }
                        else
                        {
                            node.setActive();
                        }
                    }
                };
                nexacro.__setInputDOMNodeFocus = function (node)
                {
                    var is_active_window;
                    var owner_doc = (node.ownerDocument || node.document);
                    if (owner_doc.hasFocus)
                    {
                        is_active_window = owner_doc.hasFocus();
                    }
                    if (is_active_window === undefined)
                    {
                        // active window flag 통일 (nexacro.Window)
                        var _window = nexacro._findDocumentWindow(owner_doc);
                        if (_window)
                        {
                            is_active_window = _window._is_active_window;
                        }
                    }

                    if (is_active_window)
                    {
                        owner_doc.focus();

                        // parent node의 visibility는 Element에서 체크할 것.
                        if (node.style.visibility == "hidden" || node.style.display == "none")
                        {
                            node.setActive();
                        }
                        else if (node.offsetWidth === 0 || node.offsetHeight === 0)
                        {   // check viewport offset
                            node.setActive();
                        }
                        else if (node.readOnly || node.disabled)
                        {   // XP의 IE에서 readonly인 input에 click하면 스크립트 에러 발생.
                            node.setActive();
                        }
                        else
                        {
                            node.setActive();
                            node.blur();

                            try
                            {
                                node.focus();
                            }
                            catch (e)
                            {
                                ;   // parentNode visibility가 hidden인 경우 error발생
                            }
                        }
                    }
                };
            }
            else
            { // >= IE 9
                nexacro.__setDOMNode_Focus = function (node, selffocus)
                {
                    var is_active_window;
                    var owner_doc = (node.ownerDocument || node.document);
                    var _window = nexacro._findDocumentWindow(owner_doc);
                    if (owner_doc.hasFocus)
                    {
                        is_active_window = _window ? (_window._is_active_window || owner_doc.hasFocus()) : owner_doc.hasFocus();
                    }
                    if (is_active_window === undefined && _window)
                    {
                        is_active_window = _window._is_active_window;
                    }

                    if (is_active_window)
                    {
                        if (selffocus)
                        {
                            owner_doc.focus();
                            node.focus();
                        }
                        else
                        {
                            var owner_bodynode = owner_doc.body;
                            if (owner_bodynode)
                                owner_bodynode.focus();
                        }
                    }
                };
                nexacro.__setInputDOMNodeFocus = function (node)
                {
                    var is_active_window;
                    var owner_doc = (node.ownerDocument || node.document);
                    if (owner_doc.hasFocus)
                    {
                        is_active_window = owner_doc.hasFocus();
                    }
                    if (is_active_window === undefined)
                    {
                        // active window flag 통일 (nexacro.Window)
                        var _window = nexacro._findDocumentWindow(owner_doc);
                        if (_window)
                        {
                            is_active_window = _window._is_active_window;
                        }
                    }

                    if (is_active_window)
                    {
                        owner_doc.focus();
                        node.focus();
                    }

                    if (nexacro._BrowserVersion >= 10)
                    {
                        if (!is_active_window && nexacro._firstLoadFocus)
                        {
                            owner_doc.focus();
                            node.focus();
                            nexacro._firstLoadFocus = false;
                        }
                    }
                };
            }
        }
        else
        {   // HTML5, except IE9
            nexacro.__setDOMNode_Focus = function (node, selffocus)
            {
                var is_active_window;
                // hasFocus로 체크하는 것이 정확하나 Google Chrome이 alert직후 hasFocus가 false로 나오는 문제로
                // alert직후 setFocus를 호출하면 무시된다. 때문에 비 IE계열은 hasFocus체크를 하지 않음 2013.08.26 neoarc

                var owner_doc = (node.ownerDocument || node.document);

                // active window flag 통일 (nexacro.Window)
                var _window = nexacro._findDocumentWindow(owner_doc);
                if (_window)
                {
                    if (owner_doc.hasFocus)
                        is_active_window = _window._is_active_window || owner_doc.hasFocus();
                    else
                        is_active_window = _window._is_active_window;
                }

                if (is_active_window)
                {
                    if (selffocus)
                    {
                        node.focus();
                    }
                    else
                    {
                        var owner_body = owner_doc.body;
                        if (owner_body)
                            owner_body.focus();
                    }
                }
            };
            nexacro.__setInputDOMNodeFocus = function (node)
            {
                var is_active_window;
                // hasFocus로 체크하는 것이 정확하나 Google Chrome이 alert직후 hasFocus가 false로 나오는 문제로
                // alert직후 setFocus를 호출하면 무시된다. 때문에 비 IE계열은 hasFocus체크를 하지 않음 2013.08.26 neoarc

                var owner_doc = (node.ownerDocument || node.document);

                // active window flag 통일 (nexacro.Window)
                var _window = nexacro._findDocumentWindow(owner_doc);
                if (_window)
                {
                    if (owner_doc.hasFocus)
                        is_active_window = _window._is_active_window || owner_doc.hasFocus();
                    else
                        is_active_window = _window._is_active_window;
                }

                // TODO : FF
                var bDirectFocus = true;
                var evt = window.event;
                if (evt)
                {
                    var evt_node = (evt.target || evt.srcElement);
                    if (node != evt_node)
                    {
                        bDirectFocus = false;
                    }
                }

                if (is_active_window && !bDirectFocus)
                {
                    node.focus();
                }
            };
        }

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro.__setDOMNode_Blur = function (node)
            {
                try
                {
                    node.blur();
                }
                catch (e)
                {

                }
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 9)
        {
            // edge브라우저 고려해서 분기. 현재 edge 고려 안함.
            nexacro.__setDOMNode_Blur = function (node)
            {
                // [RP_36757] IE > 9, Edge : blur should be done before select.empty
                node.blur();

                // [RP_39765] IE > 9, Edge : case run on iframe, caret(or selection) is still show after blur.
                var owner_doc = (node.ownerDocument || node.document);
                if (owner_doc)
                {
                    if (owner_doc.hasFocus)
                    {
                        is_active_window = owner_doc.hasFocus();
                        if (is_active_window && ('selection' in document))
                        {
                            var selection = owner_doc.selection;
                            var range = selection.createRange();
                            if (node == range.parentElement())
                            {
                                selection.empty();
                            }
                        }
                    }
                }
            };
        }
        else
        {
            nexacro.__setDOMNode_Blur = function (node)
            {
                node.blur();
            };
        }

        nexacro._removeInputDOMNodeCaret = function (node)
        {
            if (node)
            {
                var owner_doc = (node.ownerDocument || node.document);
                var owner_win = owner_doc.defaultView || owner_doc.parentWindow;

                var pos = nexacro.__getDOMNodeCaretPos(owner_doc, node);
                if (pos)
                {
                    var begin = pos.begin;
                    var end = pos.end;

                    if (begin == end)
                    {
                        if ('selection' in document)
                        {
                            var selection = document.selection;
                            var range = selection.createRange();
                            if (node == range.parentElement())
                            {
                                selection.empty();
                            }
                        }
                        else if (owner_win.getSelection)
                        {
                            var selection = owner_win.getSelection();
                            selection.removeAllRanges();
                        }
                    }
                }
            }
        };

        //==============================================================================
        // canvas
        //==============================================================================

        nexacro._degreesToRadians = function (degrees)
        {
            return degrees * (Math.PI / 180);
        };

        nexacro._radiansToDegrees = function (radians)
        {
            return radians * (180 / Math.PI);
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        { // IE7,8
            nexacro._createMatrixIdentity = function ()
            {
                return [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ];
            };

            nexacro._matrixMultiply = function (m1, m2)
            {
                var result = nexacro._createMatrixIdentity();

                for (var x = 0; x < 3; x++)
                {
                    for (var y = 0; y < 3; y++)
                    {
                        var sum = 0;

                        for (var z = 0; z < 3; z++)
                        {
                            sum += m1[x][z] * m2[z][y];
                        }
                        result[x][y] = sum;
                    }
                }
                return result;
            };

            nexacro._setMatrix = function (canvas, m, updateLineScale)
            {
                if (!nexacro._matrixIsFinite(m)) return;
                canvas._matrix = m;

                if (updateLineScale)
                {
                    var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
                    canvas._line_scale = Math.sqrt(Math.abs(det));
                }
            };

            nexacro._matrixIsFinite = function (m)
            {
                for (var i = 0; i < 3; i++)
                {
                    for (var j = 0; j < 2; j++)
                    {
                        if (!isFinite(m[i][j]) || isNaN(m[i][j]))
                        {
                            return false;
                        }
                    }
                }
                return true;
            };

            nexacro._isPointInPath = function (path, pt)
            {
                for (var c = false, i = -1, l = path.length, j = l - 1; ++i < l; j = i)
                {
                    if (((path[i].y <= pt.y && pt.y < path[j].y) || (path[j].y <= pt.y && pt.y < path[i].y))
                    && (pt.x < (path[j].x - path[i].x) * (pt.y - path[i].y) / (path[j].y - path[i].y) + path[i].x)
                    && (c = !c))
                        c = true;
                }
                return c;
            };




            nexacro.__setCanvasFillStyle = function (canvas, clrrgb, clra) { /* support. nothing to do here*/ };
            nexacro.__setCanvasStrokeStyle = function (canvas, strokecolor)
            {
                canvas._stroke_color = nexacro._getWebColorFromXreColor(strokecolor.value);
                canvas._stroke_alpha = nexacro._getXreColorAlpha(strokecolor.value) / 255;
            };
            nexacro.__setCanvasLineCap = function (canvas, eCapType) { /* not support */ };
            nexacro.__setCanvasLineJoin = function (canvas, eJoinType) { /* not support */ };
            nexacro.__setCanvasLineWidth = function (canvas, nSize) { /* support. nothing to do here* */ };
            nexacro.__setCanvasMiterLimit = function (canvas, nLimit) { /* not support */ };
            nexacro.__setCanvasShadowColor = function (canvas, clrRGA, clrA) { /* not support */ };
            nexacro.__setCanvasShadowOffsetX = function (canvas, sX) { /* not support */ };
            nexacro.__setCanvasShadowOffsetY = function (canvas, sY) { /* not support */ };
            nexacro.__setCanvasShadowBlur = function (canvas, nFact) { /* not support */ };
            nexacro.__setCanvasFont = function (canvas, font, sysvalue) { /* not support */ };

            nexacro.__setCanvasFillColor = function (canvas, fillstyle)
            {
                canvas._fill_type = 1;
                canvas._fill_color = nexacro._getWebColorFromXreColor(fillstyle.value);
                canvas._fill_alpha = nexacro._getXreColorAlpha(fillstyle.value) / 255;
            };

            nexacro.__setCanvasFillGradation = function (canvas, fillstyle)
            {
                canvas._fill_type = 2;
                canvas._fill_gradient = fillstyle;
            };

            nexacro.__setCanvasTextAlign = function (canvas, eAlignValue)
            {
                //0 = center(default) , 1 = end, 2 = start, 3 = right, 4 = left
                if (eAlignValue == "center")
                    canvas._textAlign = 0;
                else if (eAlignValue == "end")
                    canvas._textAlign = 1;
                else if (eAlignValue == "start")
                    canvas._textAlign = 2;
                else if (eAlignValue == "right")
                    canvas._textAlign = 3;
                else if (eAlignValue == "left")
                    canvas._textAlign = 4;
            };
            nexacro.__setCanvasTextBaseline = function (canvas, eBaseValue)
            {
                //0 = alphabetic, 1 = hanging, 2 = top, 3 = bottom, 4 = middle
                if (eBaseValue == "alphabetic")
                    canvas._textBaseline = 0;
                else if (eBaseValue == "hanging")
                    canvas._textBaseline = 1;
                else if (eBaseValue == "top")
                    canvas._textBaseline = 2;
                else if (eBaseValue == "bottom")
                    canvas._textBaseline = 3;
                else if (eBaseValue == "middle")
                    canvas._textBaseline = 4;
            };

            nexacro.__drawCanvasBeginPath = function (canvas)
            {
                canvas._path_str = "";
            };
            nexacro.__drawCanvasClosePath = function (canvas)
            {
                canvas._path_str += 'x ';
            };

            nexacro.__drawCanvasStrokeRect = function (canvas, x, y, dx, dy)
            {
                nexacro.__rectCanvas(canvas, x, y, dx, dy, true);
                nexacro.__strokeCanvas(canvas);
                nexacro.__drawCanvasBeginPath(canvas);
            };
            nexacro.__drawCanvasFillRect = function (canvas, x, y, dx, dy)
            {
                nexacro.__drawCanvasmoveTo(canvas, x, y);
                nexacro.__drawCanvaslineTo(canvas, x + dx, y);
                nexacro.__drawCanvaslineTo(canvas, x + dx, y + dy);
                nexacro.__drawCanvaslineTo(canvas, x, y + dy);
                nexacro.__drawCanvasClosePath(canvas);
                nexacro.__fillCanvas(canvas);
            };
            nexacro.__drawCanvasRect = nexacro.__drawCanvasStrokeRect;
            nexacro.__drawCanvasClearRect = function (canvas)
            {
                //canvas.innerHTML = "";
                //canvas._vml_str = "";
            };

            nexacro.__drawCanvaslineTo = function (canvas, x, y)
            {
                var elem = canvas._linked_element;
                var pt = elem._getCoordSize(x, y);
                canvas._pathArray.push({ x: canvas._curx, y: canvas._cury });
                canvas._pathArray.push({ x: pt.x, y: pt.y });
                var sub = 'l ' + pt.x + ',' + pt.y + ' ';
                canvas._path_str += sub;
                canvas._curx = pt.x;
                canvas._cury = pt.y;
            };
            nexacro.__drawCanvasmoveTo = function (canvas, x, y)
            {
                var elem = canvas._linked_element;
                var pt = elem._getCoordSize(x, y);
                var sub = 'm ' + pt.x + ',' + pt.y + ' ';
                canvas._path_str += sub;
                canvas._curx = pt.x;
                canvas._cury = pt.y;
            };
            nexacro.__drawCanvasQuadraticCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y)
            {
                if (!canvas._curx)
                {
                    nexacro.__drawCanvasmoveTo(canvas, cp1x, cp1y);
                }
                var elem = canvas._linked_element;
                var cp = elem._getCoordSize(cp1x, cp1y);
                var p = elem._getCoordSize(cp2x, cp2y);

                var cp1 = {
                    x: Math.round(canvas._curx + 2.0 / 3.0 * (cp.x - canvas._curx)),
                    y: Math.round(canvas._cury + 2.0 / 3.0 * (cp.y - canvas._cury))
                };
                var cp2 = {
                    x: Math.round(cp1.x + (p.x - canvas._curx) / 3.0),
                    y: Math.round(cp1.y + (p.y - canvas._cury) / 3.0)
                };

                canvas._pathArray.push({ x: cp1.x, y: cp1.y });
                canvas._pathArray.push({ x: cp2.x, y: cp2.y });
                canvas._pathArray.push({ x: p.x, y: p.y });

                var sub = 'c ' + cp1.x + ',' + cp1.y + ',' + cp2.x + ',' + cp2.y + ',' + p.x + ',' + p.y + ' ';

                canvas._path_str += sub;
                canvas._curx = p.x;
                canvas._cury = p.y;
            };
            nexacro.__drawCanvasBezierCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y, x, y)
            {
                if (!canvas._curx)
                {
                    nexacro.__drawCanvasmoveTo(canvas, cp1x, cp1y);
                }
                var elem = canvas._linked_element;
                var p = elem._getCoordSize(cp1x, cp1y);
                canvas._pathArray.push({ x: p.x, y: p.y });
                var cp1 = elem._getCoordSize(cp2x, cp2y);
                canvas._pathArray.push({ x: cp1.x, y: cp1.y });
                var cp2 = elem._getCoordSize(x, y);
                canvas._pathArray.push({ x: cp2.x, y: cp2.y });
                var sub = 'c ' + p.x + ',' + p.y + ',' + cp1.x + ',' + cp1.y + ',' + cp2.x + ',' + cp2.y + ' ';

                canvas._path_str += sub;
                canvas._curx = cp2.x;
                canvas._cury = cp2.y;
            };
            nexacro.__darwCanvasArc = function (canvas, x, y, r, sA, eA, eCw)
            {
                var _canvas = canvas;
                var scale = canvas._scale;
                var hscale = canvas._half_scale;
                var _r = r * scale;
                var arcType = eCw ? 'at' : 'wa';
                var xStart = x + Math.cos(sA) * _r - hscale;
                var yStart = y + Math.sin(sA) * _r - hscale;
                var xEnd = x + Math.cos(eA) * _r - hscale;
                var yEnd = y + Math.sin(eA) * _r - hscale;
                var elem = canvas._linked_element;
                var p = elem._getCoordSize(x, y);
                var pStart = elem._getCoordSize(xStart, yStart);
                var pEnd = elem._getCoordSize(xEnd, yEnd);

                // IE won't render arches drawn counter clockwise if xStart == xEnd.
                if (parseInt(xStart) == parseInt(xStart) && eCw)
                {
                    pStart.x -= 1;
                    pStart.y -= 1;
                    //   xStart += 0.125;    // Offset xStart by 1/80 of a pixel. Use something
                    // that can be represented in binary
                }
                else
                {
                    pStart.x += 1;
                    pStart.y += 1;
                }
                var sub = arcType + ' ' + (p.x - _r) + ',' + (p.y - _r) + ' ' + (p.x + _r) + ',' + (p.y + _r) + ' ' +
                    parseInt(pStart.x) + ',' + parseInt(pStart.y) + ' ' + parseInt(pEnd.x) + ',' + parseInt(pEnd.y) + ' ';

                canvas._curx = pEnd.x;
                canvas._cury = pEnd.y;
                canvas._path_str += sub;
            };
            nexacro.__drawCanvasArcTo = function (canvas, x, y, x2, y2, r)
            {
                if (canvas._curx)
                {
                    var p0 = { x: canvas._curx / 10, y: canvas._cury / 10 };
                    var p1 = { x: x, y: y };
                    var p2 = { x: x2, y: y2 };

                    var radius = r;

                    if ((p1.x == p0.x && p1.y == p0.y) || (p1.x == p2.x && p1.y == p2.y) || radius == 0)
                    {
                        nexacro.__drawCanvaslineTo(canvas, p1.x, p1.y);
                        return true;
                    }

                    var p1p0 = { x: (p0.x - p1.x), y: (p0.y - p1.y) };
                    var p1p2 = { x: (p2.x - p1.x), y: (p2.y - p1.y) };
                    var p1p0_length = Math.sqrt(p1p0.x * p1p0.x + p1p0.y * p1p0.y);
                    var p1p2_length = Math.sqrt(p1p2.x * p1p2.x + p1p2.y * p1p2.y);

                    var cos_phi = (p1p0.x * p1p2.x + p1p0.y * p1p2.y) / (p1p0_length * p1p2_length);
                    // all points on a line logic
                    if (-1 == cos_phi)
                    {
                        element.lineTo(p1.x, p1.y);
                        return true;
                    }

                    if (1 == cos_phi)
                    {
                        // add infinite far away point
                        var max_length = 65535;
                        var factor_max = max_length / p1p0_length;
                        var ep = { x: (p0.x + factor_max * p1p0.x), y: (p0.y + factor_max * p1p0.y) };
                        nexacro.__drawCanvaslineTo(canvas, Math.round(ep.x), Math.round(ep.y));
                        return true;
                    }

                    var tangent = radius / Math.tan(Math.acos(cos_phi) / 2);
                    var factor_p1p0 = tangent / p1p0_length;
                    var t_p1p0 = { x: (p1.x + factor_p1p0 * p1p0.x), y: (p1.y + factor_p1p0 * p1p0.y) };

                    var orth_p1p0 = { x: p1p0.y, y: -p1p0.x };
                    var orth_p1p0_length = Math.sqrt(orth_p1p0.x * orth_p1p0.x + orth_p1p0.y * orth_p1p0.y);
                    var factor_ra = radius / orth_p1p0_length;

                    var cos_alpha = (orth_p1p0.x * p1p2.x + orth_p1p0.y * p1p2.y) / (orth_p1p0_length * p1p2_length);
                    if (cos_alpha < 0)
                    {
                        orth_p1p0.x = -orth_p1p0.x;
                        orth_p1p0.y = -orth_p1p0.y;
                    }

                    var p = { x: (t_p1p0.x + factor_ra * orth_p1p0.x), y: (t_p1p0.y + factor_ra * orth_p1p0.y) };

                    orth_p1p0.x = -orth_p1p0.x;
                    orth_p1p0.y = -orth_p1p0.y;

                    var sa = Math.acos(orth_p1p0.x / orth_p1p0_length);
                    if (orth_p1p0.y < 0)
                        sa = 2 * Math.PI - sa;

                    var anticlockwise = false;

                    var factor_p1p2 = tangent / p1p2_length;
                    var t_p1p2 = { x: p1.x + factor_p1p2 * p1p2.x, y: p1.y + factor_p1p2 * p1p2.y };
                    var orth_p1p2 = { x: t_p1p2.x - p.x, y: t_p1p2.y - p.y };
                    var orth_p1p2_length = Math.sqrt(orth_p1p2.x * orth_p1p2.x + orth_p1p2.y * orth_p1p2.y);
                    var ea = Math.acos(orth_p1p2.x / orth_p1p2_length);

                    if (orth_p1p2.y < 0)
                        ea = 2 * Math.PI - ea;
                    if ((sa > ea) && ((sa - ea) < Math.PI))
                        anticlockwise = true;
                    if ((sa < ea) && ((ea - sa) > Math.PI))
                        anticlockwise = true;

                    nexacro.__drawCanvaslineTo(canvas, Math.round(t_p1p0.x), Math.round(t_p1p0.y));
                    nexacro.__darwCanvasArc(canvas, Math.round(p.x), Math.round(p.y), radius, sa, ea, anticlockwise);
                    return true;
                }
                else
                { //Chrome과 동작을 맞추기 위해 삽입
                    nexacro.__drawCanvasmoveTo(canvas, x, y);
                }
            };

            nexacro.__isPointInCanvasPath = function (canvas, x, y)
            {
                if (canvas)
                {
                    var elem = canvas._linked_element;
                    var p = elem._getCoordSize(x, y);
                    return nexacro._isPointInPath(canvas._pathArray, p);
                }
            };
            nexacro.__clipCanvas = function (canvas)
            {
                //implemnet
            };
            nexacro.__setCanvasTransform = function (canvas, a, b, c, d, e, f)
            {
                var m = [
			      [a, b, 0],
			      [c, d, 0],
			      [e, f, 1]
                ];

                nexacro._setMatrix(canvas, m, true);
            };
            nexacro.__measureCanvas = function (canvas, text) { /* not support */ };

            nexacro.__createCanvasLinearGradient = function (canvas, aX0, aY0, aX1, aY1)
            {
                var gradient = new nexacro.CanvasGradient('gradient');
                gradient.x0 = aX0;
                gradient.y0 = aY0;
                gradient.x1 = aX1;
                gradient.y1 = aY1;
                return gradient;
            };
            nexacro.__createCanvasRadialGradient = function (canvas, x0, y0, x1, y1, r0, r1)
            {
                var gradient = new nexacro.CanvasGradient('gradientradial');
                gradient.x0 = x0;
                gradient.y0 = y0;
                gradient.r0 = r0;
                gradient.x1 = x1;
                gradient.y1 = y1;
                gradient.r1 = r1;
                return gradient;
            };

            nexacro.__rectCanvas = function (canvas, x, y, w, h)
            {
                var element = canvas._linked_element;
                if (canvas._path_str)
                {
                    var gap = element.lineOffset;
                    var gap2 = (h > 0) ? gap : -gap;
                    element.moveTo(x - gap, y - gap2);
                    element.lineTo(x + w + gap, y - gap2);
                    element.lineTo(x + w + gap, y + h + gap2);
                    element.lineTo(x - gap, y + h + gap2);
                    element.closePath();
                    element.moveTo(x + gap, y + gap2);
                    element.lineTo(x + w - gap, y + gap2);
                    element.lineTo(x + w - gap, y + h - gap2);
                    element.lineTo(x + gap, y + h - gap2);
                    element.closePath();
                }
                else
                {
                    element.moveTo(x, y);
                    element.lineTo(x + w, y);
                    element.lineTo(x + w, y + h);
                    element.lineTo(x, y + h);
                    element.closePath();
                }
            };
            nexacro.__fillCanvas = function (canvas)
            {
                var elem = canvas._linked_element;

                if (canvas && canvas._path_str)
                {
                    var vml_str = "<v:shape filled='t' stroked='f' style='position:absolute;width:10px;height:10px;' " +
	                              "coordorigin='0 0' coordsize='" + canvas._scale * 10 + ' ' + canvas._scale * 10 + "' ";
                    if (canvas._fill_type == 2)
                    {
                        var gradient = canvas._fill_gradient;
                        var angle = Math.atan2(gradient.x1 - gradient.x0, gradient.y1 - gradient.y0) * 180 / Math.PI;
                        var grd_colors = gradient.colors;
                        var start_color = grd_colors[0].color;
                        var end_color = grd_colors[1].color;
                        vml_str += "fillcolor='red' path='" + canvas._path_str + "'>" +
	                               "<v:fill type ='gradient' color= '" + end_color + "' color2 = '" + start_color + "' colors = ' 0 " + end_color + "; 1 " + start_color + "' " +
	                               "opacity = '1' " + "angle = '" + angle + "'/>";
                    }
                    else
                    {
                        vml_str += "fillcolor='" + canvas._fill_color + "' ";
                        if (canvas._fill_alpha != 1) vml_str += "opacity='" + canvas._fill_alpha + "' ";
                        vml_str += "path='" + canvas._path_str + "' />";
                    }

                    canvas._vml_str += vml_str;
                    canvas._draw_node.innerHTML = canvas._vml_str; //Draw VML
                }
            };
            nexacro.__strokeCanvas = function (canvas)
            {
                var elem = canvas._linked_element;
                if (canvas._path_str)
                {
                    var lineWidth = canvas._line_scale * elem.lineWidth;
                    var vml_str = "";
                    vml_str += "<v:shape filled='f' stroked='t' style='position:absolute;width:10px;height:10px;' ";
                    vml_str += "coordorigin='0 0' coordsize='" + canvas._scale * 10 + ' ' + canvas._scale * 10 + "' ";
                    vml_str += "strokeweight='" + lineWidth + "px" + "' ";
                    vml_str += "strokecolor='" + canvas._stroke_color + "' ";
                    vml_str += "path='" + canvas._path_str + "' >";

                    vml_str += "<v:stroke ";
                    if (canvas._stroke_alpha && canvas._stroke_alpha != 1)
                    {
                        vml_str += "opacity='" + canvas._stroke_alpha + "' ";
                    }

                    vml_str += "joinstyle='" + elem.lineJoin + "' ";
                    vml_str += "miterlimit='" + elem.miterLimit + "' ";
                    vml_str += "endcap='" + elem._getLineCapStr() + "'  />";
                    vml_str += "</v:shape>";
                    canvas._vml_str += vml_str;
                    canvas._draw_node.innerHTML = canvas._vml_str; //Draw VML
                }
            };
            nexacro.__fillCanvasRect = function (canvas, x, y, dx, dy)
            {
                var elem = canvas._linked_element;

                elem.beginPath();
                elem.moveTo(x, y);
                elem.lineTo(x + dx, y);
                elem.lineTo(x + dx, y + dy);
                elem.lineTo(x, y + dy);
                elem.closePath();
                elem.fill();
            };
            nexacro.__scaleCanvas = function (canvas, dx, dy)
            {
                canvas._scale *= dx;
                canvas._half_scale *= dy;
                var m1 = [
			      [dx, 0, 0],
			      [0, dy, 0],
			      [0, 0, 1]
                ];

                nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), true);
            };
            nexacro.__rotateCanvas = function (canvas, angle)
            {
                var c = Math.cos(angle);
                var s = Math.sin(angle);
                var m1 = [
			      [c, s, 0],
			      [-s, c, 0],
			      [0, 0, 1]
                ];

                nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), false);
            };
            nexacro.__translateCanvas = function (canvas, dX, dY)
            {
                var m1 = [
			      [1, 0, 0],
			      [0, 1, 0],
			      [dX, dY, 1]
                ];

                nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), false);
            };
            nexacro.__transformCanvas = function (canvas, a, b, c, d, e, f)
            {
                var m1 = [
			      [a, b, 0],
			      [c, d, 0],
			      [e, f, 1]
                ];

                nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), true);
            };


            nexacro.__drawCanvasFillText = function (canvas, text, x, y, maxwidth)
            {
                var element = canvas._linked_element;
                if (typeof text == "string")
                    text = nexacro._encodeXml(text);
                var textAlign = canvas._textAlign;
                var font = element.font;
                var color = canvas._fill_color;
                var textsize = nexacro._getTextSize(text, font);
                var textwidth = textsize[0];
                var textheight = textsize[1];
                var conY = nexacro._getTextBaseline(canvas._textBaseline, y, textheight);
                var carlen = (textwidth / text.length);
                if (nexacro._BrowserVersion == 8)
                    carlen *= 1.5;
                var x1, y1 = conY, x2, y2 = conY + 0.125;
                var vtextAlign = "left";
                if (textAlign == 2 || textAlign == 4 || textAlign === undefined) //default, center
                {
                    x1 = x;
                    x2 = x1 + textwidth;
                }
                else if (textAlign == 1 || textAlign == 3) //end , right
                {
                    x1 = x - textwidth - carlen;
                    x2 = x;
                    vtextAlign = "right";
                }
                else //center 0
                {
                    x1 = (x - textwidth / 2) - carlen;
                    x2 = (x + textwidth / 2);
                }

                var bpt = element._getCoordPos(x1, y1);
                var ept = element._getCoordPos(x2, y2);
                //canvas._textAlign -------      0 = center(default) , 1 = end, 2 = start, 3 = right, 4 = left
                var vml_str = "<v:line from='" + bpt.x + " " + bpt.y + "' to='" + ept.x + " " + ept.y + "' filled='t' stroked='f' "
                         + "fillcolor='" + color + "'><v:path textpathok='t'/>"
                            + "<v:textpath on='t' fitpath='True' style=\"v-text-align: " + vtextAlign + "; font:" + font._sysvalue + ";\" "
                            + "string='" + text + "'/></v:line>";
                canvas._vml_str += vml_str;
                canvas._draw_node.innerHTML = canvas._vml_str; //Draw VML
            };
            nexacro.__drawCanvasStrokeText = function (canvas, text, x, y)
            {
                var element = canvas._linked_element;
                if (typeof text == "string")
                {
                    text = nexacro._encodeXml(text);
                }

                var vml_str = "";
                var pt = element._getCoordPos(x, y);
                if (canvas)
                {
                    var strokecolor = canvas._stroke_color;

                    var font = element._font;

                    vml_str += "<v:line from='" + x + " " + y + "' to='" + (pt.x + 100) + " " + (pt.y + 0.125) + "' filled='t' stroked='f' ";
                    vml_str += "fillcolor='" + strokecolor + "'><v:path textpathok='t'/>";
                    vml_str += "<v:textpath on='t' style=\"v-text-align:left; font:" + font + ";\" ";
                    vml_str += "string='" + text + "'/></v:line>";
                }
                canvas._vml_str += vml_str;
                canvas._draw_node.innerHTML = canvas._vml_str; //Draw VML
            };

            nexacro.__drawCanvasImage = function (canvas, image, x, y, imgWidth, imgHeight)
            {
                var dx, dy, dw, dh, sx, sy, sw, sh;
                var elem = canvas._linked_element;

                // get the original size
                var w = image.width;
                var h = image.height;

                if (arguments.length == 4)
                {
                    dx = x;
                    dy = y;
                    sx = sy = 0;
                    sw = dw = w;
                    sh = dh = h;
                }
                else if (arguments.length == 6)
                {
                    dx = x;
                    dy = y;
                    dw = imgWidth;
                    dh = imgHeight;
                    sx = sy = 0;
                    sw = w;
                    sh = h;
                }
                else
                {
                    throw Error('Invalid number of arguments');
                }

                var d = elem._getCoordSize(dx, dy);

                var w2 = sw / 2;
                var h2 = sh / 2;

                var vmlStr = [];

                // For some reason that I've now forgotten, using divs didn't work
                vmlStr.push(' <v:group',
						    ' coordsize="', 100, ',', 100, '"',
						    ' coordorigin="0,0"',
						    ' style="width:', 10, 'px;height:', 10, 'px;position:absolute;');

                // If filters are necessary (rotation exists), create them
                // filters are bog-slow, so only create them if abbsolutely necessary
                // The following check doesn't account for skews (which don't exist
                // in the canvas spec (yet) anyway.

                if (canvas._matrix[0][0] != 1 || canvas._matrix[0][1])
                {
                    var filter = [];

                    // Note the 12/21 reversal
                    filter.push('M11=', canvas._matrix[0][0], ',',
							    'M12=', canvas._matrix[1][0], ',',
							    'M21=', canvas._matrix[0][1], ',',
							    'M22=', canvas._matrix[1][1], ',',
							    'Dx=', Math.round(d.x / 10), ',',
							    'Dy=', Math.round(d.y / 10), '');

                    // Bounding box calculation (need to minimize displayed area so that
                    // filters don't waste time on unused pixels.
                    var max = d;
                    var c2 = elem._getCoordSize(dx + dw, dy);
                    var c3 = elem._getCoordSize(dx, dy + dh);
                    var c4 = elem._getCoordSize(dx + dw, dy + dh);

                    max.x = Math.max(max.x, c2.x, c3.x, c4.x);
                    max.y = Math.max(max.y, c2.y, c3.y, c4.y);

                    vmlStr.push('padding:0 ', Math.round(max.x / 10), 'px ', Math.round(max.y / 10),
							    'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
							    filter.join(''), ", sizingmethod='clip');");
                }
                else
                {
                    vmlStr.push('top:', Math.round(d.y / 10), 'px;left:', Math.round(d.x / 10), 'px;');
                }

                vmlStr.push(' ">',
						    '<v:image src="', image.src, '"',
						    ' style="width:', 10 * dw, 'px;',
						    ' height:', 10 * dh, 'px;"',
						    ' cropleft="', sx / w, '"',
						    ' croptop="', sy / h, '"',
						    ' cropright="', (w - sx - sw) / w, '"',
						    ' cropbottom="', (h - sy - sh) / h, '"',
						    ' />',
						    '</v:group>');

                canvas.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
                canvas._vml_str += vmlStr;
            };
            nexacro.__setCanvasGlobalAlpha = function (canvas, f)
            {
                // TODO: Implement
            };
            nexacro.__setCanvasGlobalCompositeOperation = function (canvas, eOperation)
            {
                //TODO : Implement
            };
            nexacro.__toDataURLCanvas = function (handle)
            {
                //TODO : Implement
            };
            nexacro.__restoreCanvas = function (canvas)
            {
                var element = canvas._linked_element;
                var cur_status = element._status_stack.pop();
                if (cur_status)
                {
                    element.setElementStrokeStyle(nexacro.ColorObject(cur_status.strokeStyle));
                    element.setElementFillStyle(nexacro.ColorObject(cur_status.fillStyle));
                    element.setElementGlobalAlpha(cur_status.globalAlpha);
                    element.setElementLineWidth(cur_status.lineWidth); element.setElementLineCap(cur_status.lineCap);
                    element.setElementLineJoin(cur_status.lineJoin);
                    element.setElementMiterLimit(cur_status.miterLimit);
                    element.setElementShadowOffsetX(cur_status.shadowOffsetX);
                    element.setElementShadowOffsetY(cur_status.shadowOffsetY);
                    element.setElementShadowBlur(cur_status.shadowBlur);
                    element.setElementShadowColor(nexacro.ColorObject(cur_status.shadowColor));
                    element.setElementGlobalCompositeOperation(cur_status.globalCompositeOperation);
                    element.setElementFont(cur_status.font);
                    element.setElementTextAlign(cur_status.textAlign);
                    element.setElementTextBaseline(cur_status.textBaseline);
                    element.setElementStrokeStyle(cur_status.strokeColor);
                }

                canvas._matrix = element._matrix_stack.pop();
            };
            nexacro.__saveCanvas = function (canvas)
            {
                var elem = canvas._linked_element;
                var cur_status = {
                    "strokeStyle": elem.strokeStyle,
                    "fillStyle": elem.fillStyle,
                    "globalAlpha": elem.globalAlpha,
                    "lineWidth": elem.lineWidth,
                    "lineCap": elem.lineCap,
                    "lineJoin": elem.lineJoin,
                    "miterLimit": elem.miterLimit,
                    "shadowOffsetX": elem.shadowOffsetX,
                    "shadowOffsetY": elem.shadowOffsetY,
                    "shadowBlur": elem.shadowBlur,
                    "shadowColor": elem.shadowColor,
                    "globalCompositeOperation": elem.globalCompositeOperation,
                    "font": elem.font,
                    "textAlign": elem.textAlign,
                    "textBaseline": elem.textBaseline,
                    "strokeColor": elem.strokeColor,
                    "lineScale": canvas._line_scale
                };
                elem._status_stack.push(cur_status);
                elem._matrix_stack.push(canvas._matrix);
                canvas._matrix = nexacro._matrixMultiply(nexacro._createMatrixIdentity(), canvas._matrix);
            };
        }
        else
        { // HTML5 || IE9 ==> not IE7,8
            nexacro.__setCanvasFillColor = function (canvas, color)
            {
                //canvas._draw_ctx.fillStyle = nexacro._getWebColorFromXreColor(color.value);
                canvas._draw_ctx.fillStyle = color.value;
            };
            /*
	        nexacro.__setCanvasFillGradation = function (canvas, fillstyle)
	        {
	        	var gradient = nexacro.__createCanvasLinearGradient(canvas, fillstyle._start_x, fillstyle._start_y, fillstyle._end_x, fillstyle._end_y);
	        	gradient.addColorStop(0, fillstyle.start_color);
	        	gradient.addColorStop(1, fillstyle.end_color);
	        	canvas._draw_ctx.fillStyle = gradient;
	        };
            */
            nexacro.__setCanvasFillGradation = function (canvas, fillstyle)
            {
                canvas._draw_ctx.fillStyle = fillstyle;
            };

            nexacro.__setCanvasFillStyle = function (canvas, clrrgb, clra)
            {
                canvas._draw_ctx.fillStyle = clrrgb;
            };
            nexacro.__setCanvasStrokeStyle = function (canvas, color)
            {
                canvas._draw_ctx.strokeStyle = color._sysvalue;
            };
            nexacro.__setCanvasLineCap = function (canvas, eCapType)
            {
                canvas._draw_ctx.lineCap = eCapType;
            };
            nexacro.__setCanvasLineJoin = function (canvas, eJoinType)
            {
                canvas._draw_ctx.lineJoin = eJoinType;
            };
            nexacro.__setCanvasLineWidth = function (canvas, nSize)
            {
                canvas._draw_ctx.lineWidth = nSize;
            };
            nexacro.__setCanvasMiterLimit = function (canvas, nLimit)
            {
                canvas._draw_ctx.miterLimit = nLimit;
            };
            nexacro.__setCanvasShadowColor = function (canvas, clrRGA, clrA)
            {
                canvas._draw_ctx.shadowColor = canvas._shadowColor;
            };
            nexacro.__setCanvasShadowOffsetX = function (canvas, sX)
            {
                canvas._draw_ctx.shadowOffsetX = sX;
            };
            nexacro.__setCanvasShadowOffsetY = function (canvas, sY)
            {
                canvas._draw_ctx.shadowOffsetY = sY;
            };
            nexacro.__setCanvasShadowBlur = function (canvas, nFact)
            {
                canvas._draw_ctx.shadowBlur = nFact;
            };
            nexacro.__setCanvasFont = function (canvas, font, sysvalue)
            {
                canvas._draw_ctx.font = sysvalue;
            };
            nexacro.__setCanvasTextAlign = function (canvas, eAlignValue)
            {
                canvas._draw_ctx.textAlign = eAlignValue;
            };
            nexacro.__setCanvasTextBaseline = function (canvas, eBaseValue)
            {
                canvas._draw_ctx.textBaseline = eBaseValue;
            };

            nexacro.__drawCanvasBeginPath = function (canvas)
            {
                canvas._draw_ctx.beginPath();
            };
            nexacro.__drawCanvasClosePath = function (canvas)
            {
                canvas._draw_ctx.closePath();
            };
            nexacro.__drawCanvasFillRect = function (canvas, x, y, dx, dy)
            {
                var ctx = canvas._draw_ctx;
                ctx.rect(x, y, dx, dy);
                ctx.fill();
                ctx.beginPath();
            };
            nexacro.__drawCanvasStrokeRect = function (canvas, x, y, dx, dy)
            {
                canvas._draw_ctx.strokeRect(x, y, dx, dy);
            };
            nexacro.__drawCanvasRect = function (canvas, x, y, dx, dy)
            {
                var ctx = canvas._draw_ctx;
                crx.rect(x, y, dx, dy);
                ctx.stroke();
                ctx.beginPath();
            };
            nexacro.__drawCanvasClearRect = function (canvas, x, y, dx, dy)
            {
                canvas._draw_ctx.clearRect(x, y, dx, dy);
            };

            nexacro.__drawCanvaslineTo = function (canvas, x, y)
            {
                canvas._draw_ctx.lineTo(x, y);
            };
            nexacro.__drawCanvasmoveTo = function (canvas, x, y)
            {
                canvas._draw_ctx.moveTo(x, y);
            };
            nexacro.__drawCanvasQuadraticCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y)
            {
                canvas._draw_ctx.quadraticCurveTo(cp1x, cp1y, cp2x, cp2y);
            };
            nexacro.__drawCanvasBezierCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y, x, y)
            {
                canvas._draw_ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            nexacro.__darwCanvasArc = function (canvas, x, y, r, sA, eA, eCw)
            {
                canvas._draw_ctx.arc(x, y, r, sA, eA, eCw);
            };
            nexacro.__drawCanvasArcTo = function (canvas, x, y, x2, y2, r)
            {
                canvas._draw_ctx.arcTo(x, y, x2, y2, r);
            };

            nexacro.__isPointInCanvasPath = function (canvas, x, y)
            {
                return canvas._draw_ctx.isPointInPath(x, y);
            };
            nexacro.__clipCanvas = function (canvas)
            {
                canvas._draw_ctx.clip();
            };
            nexacro.__setCanvasTransform = function (canvas, a, b, c, d, e, f)
            {
                canvas._draw_ctx.setTransform(a, b, c, d, e, f);
            };
            nexacro.__measureCanvas = function (canvas, text)
            {
                canvas._draw_ctx.measureText(text);
            };

            nexacro.__createCanvasLinearGradient = function (canvas, aX0, aY0, aX1, aY1)
            {
                return canvas._draw_ctx.createLinearGradient(aX0, aY0, aX1, aY1);
            };
            nexacro.__createCanvasRadialGradient = function (canvas, x0, y0, x1, y1, r0, r1)
            {
                return canvas._draw_ctx.createRadialGradient(x0, y0, x1, y1, r0, r1);
            };
            nexacro.__rectCanvas = function (canvas, x, y, w, h)
            {
                canvas._draw_ctx.rect(x, y, w, h);
            };
            nexacro.__fillCanvas = function (canvas)
            {
                canvas._draw_ctx.fill();
            };
            nexacro.__strokeCanvas = function (canvas)
            {
                canvas._draw_ctx.stroke();
            };
            nexacro.__fillCanvasRect = function (canvas, x, y, dx, dy)
            {
                canvas._draw_ctx.fillRect(x, y, dx, dy);
            };
            nexacro.__scaleCanvas = function (canvas, dx, dy)
            {
                canvas._draw_ctx.scale(dx, dy);
            };
            nexacro.__rotateCanvas = function (canvas, angle)
            {
                canvas._draw_ctx.rotate(angle);
            };
            nexacro.__translateCanvas = function (canvas, dX, dY)
            {
                canvas._draw_ctx.translate(dX, dY);
            };
            nexacro.__transformCanvas = function (canvas, a, b, c, d, e, f)
            {
                canvas._draw_ctx.transform(a, b, c, d, e, f);
            };
            nexacro.__drawCanvasFillText = function (canvas, text, x, y, maxWidth)
            {
                if (maxWidth)
                    canvas._draw_ctx.fillText(text, x, y, maxWidth);
                else
                    canvas._draw_ctx.fillText(text, x, y);
            };
            nexacro.__drawCanvasStrokeText = function (canvas, text, x, y, maxWidth)
            {
                if (maxWidth)
                    canvas._draw_ctx.strokeText(text, x, y, maxWidth);
                else
                    canvas._draw_ctx.strokeText(text, x, y);
            };

            nexacro.__drawCanvasImage = function (canvas, image, x, y, imgWidth, imgHeight)
            {
                canvas._draw_ctx.drawImage(image, x, y, imgWidth, imgHeight);
            };
            nexacro.__setCanvasGlobalAlpha = function (canvas, f)
            {
                canvas._draw_ctx.globalAlpha = f;
            };
            nexacro.__setCanvasGlobalCompositeOperation = function (canvas, eOperation)
            {
                canvas._draw_ctx.globalCompositeOperation = eOperation;
            };
            nexacro.__toDataURLCanvas = function (canvas)
            {
                var url = canvas._draw_node.toDataURL();
                if (url)
                {
                    var imgObj = new nexacro.Image();
                    imgObj.set_src(url);
                    return imgObj;
                }
            };
            nexacro.__restoreCanvas = function (canvas)
            {
                canvas._draw_ctx.restore();
            };
            nexacro.__saveCanvas = function (canvas)
            {
                canvas._draw_ctx.save();
            };
        }


        //======================================================================
        // Accessibility
        //======================================================================

        nexacro.__setDOMAccessibility_Disabled = function (node)
        {
            node.setAttribute("role", "document");
            node.setAttribute("aria-label", " ");
            node.setAttribute("aria-description", "");
            node.setAttribute("aria-labelledby", "accessibility_notify_0");
        };
        nexacro.__getDOMAccessibilityStr_Disabled = function ()
        {
            return "role='document' aria-label=' ' aria-description='' aria-labelledby='accessibility_notify_0'";
        };

        nexacro.__setDOMAccessibility_Role = function (node, role)
        {
            node.setAttribute("role", (role ? role : "document"));
        };
        nexacro.__getDOMAccessibilityStr_Role = function (role)
        {
            return "role='" + (role ? role : "document") + "'";
        };

        nexacro.__setDOMAccessibility_Label = function (node, label)
        {
            node.setAttribute("aria-label", (label ? label : " "));
        };
        nexacro.__getDOMAccessibilityStr_Label = function (label)
        {
            return " aria-label='" + (label ? label : " ") + "'";
        };

        nexacro.__setDOMAccessibility_DescLevel = function (node, label)
        {
            node.setAttribute("aria-label", " ");
        };
        nexacro.__getDOMAccessibilityStr_DescLevel = function (label)
        {
            return " aria-label=' '";
        };

        nexacro.__setDOMAccessibility_LabelBy = function (node, id)
        {
            node.setAttribute("aria-labelledby", (id ? id : "accessibility_notify_0"));
        };
        nexacro.__getDOMAccessibilityStr_LabelBy = function (id)
        {
            return " aria-labelledby='" + (id ? id : "accessibility_notify_0") + "'";
        };

        nexacro.__setDOMAccessibility_Description = function (node, desc)
        {
            node.setAttribute("aria-description", desc);
        };
        nexacro.__getDOMAccessibilityStr_Description = function (desc)
        {
            return " aria-description='" + (desc ? desc : "") + "'";
        };

        nexacro.__setDOMAccessibility_DescriptionBy = function (node, id)
        {
            if (id)
            {
                node.setAttribute("aria-describedby", id);
            }
        };
        nexacro.__getDOMAccessibilityStr_DescriptionBy = function (id)
        {
            return id ? (" aria-describedby='" + id + "'") : "";
        };


        //stat/Flag
        nexacro.__setDOMAccessibility_StatNormal = function (node, normal)
        {
            //
        };

        nexacro.__setDOMAccessibility_StatDisabled = function (node, disable)
        {
            node.setAttribute("aria-disabled", (disable ? "true" : "false"));
        };
        nexacro.__getDOMAccessibilityStr_StatDisabled = function (disable)
        {
            return " aria-disabled='" + (disable ? "true" : "false") + "'";
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__setDOMAccessibility_StatHidden = function (node, hidden)
            {
                node.setAttribute("aria-hidden", (hidden ? "true" : "false"));
            };
            nexacro.__getDOMAccessibilityStr_StatHidden = function (hidden)
            {
                return " aria-hidden='" + (hidden ? "true" : "false") + "'";
            };
        }
        else
        {
            nexacro.__setDOMAccessibility_StatHidden = nexacro._emptyFn;
            nexacro.__getDOMAccessibilityStr_StatHidden = function (hidden)
            {
                return "";
            };
        }

        nexacro.__setDOMAccessibility_StatChecked = function (node, check)
        {
            node.setAttribute("aria-checked", check);
        };
        nexacro.__getDOMAccessibilityStr_StatChecked = function (check)
        {
            return " aria-checked='" + check + "'";
        };

        nexacro.__setDOMAccessibility_StatPressed = function (node, press)
        {
            node.setAttribute("aria-pressed", press);
        };
        nexacro.__getDOMAccessibilityStr_StatPressed = function (press)
        {
            return " aria-pressed='" + press + "'";
        };

        nexacro.__setDOMAccessibility_StatSelected = function (node, select)
        {
            node.setAttribute("aria-selected", select);
        };
        nexacro.__getDOMAccessibilityStr_StatSelected = function (select)
        {
            return " aria-selected='" + select + "'";
        };

        nexacro.__setDOMAccessibility_StatExpanded = function (node, expanded)
        {
            node.setAttribute("aria-expanded", expanded);
        };
        nexacro.__getDOMAccessibilityStr_StatExpanded = function (expanded)
        {
            return " aria-expanded='" + expanded + "'";
        };

        nexacro.__setDOMAccessibility_StatAutoComplete = function (node, autocomplete)
        {
            node.setAttribute("aria-autocomplete", autocomplete);
        };
        nexacro.__getDOMAccessibilityStr_StatAutoComplete = function (autocomplete)
        {
            return " aria-autocomplete='" + autocomplete + "'";
        };

        nexacro.__setDOMAccessibility_StatHasPopup = function (node, haspopup)
        {
            node.setAttribute("aria-haspopup", haspopup);
        };
        nexacro.__getDOMAccessibilityStr_StatHasPopup = function (haspopup)
        {
            return " aria-haspopup='" + haspopup + "'";
        };

        nexacro.__setDOMAccessibility_FlagFocusable = function (node, focus)
        {
            //
        };
        nexacro.__getDOMAccessibilityStr_FlagFocusable = function (focus)
        {
            return "";
        };

        nexacro.__setDOMAccessibility_FlagReadOnly = function (node, readonly)
        {
            node.setAttribute("aria-readonly", readonly);
        };
        nexacro.__getDOMAccessibilityStr_FlagReadOnly = function (readonly)
        {
            return " aria-readonly='" + readonly + "'";
        };

        nexacro.__setDOMAccessibility_FlagPassword = function (node, password)
        {
            //
        };
        nexacro.__getDOMAccessibilityStr_FlagPassword = function (password)
        {
            return "";
        };

        nexacro.__setDOMAccessibility_FlagMultiLine = function (node, multiline)
        {
            node.setAttribute("aria-multiline", multiline);
        };
        nexacro.__getDOMAccessibilityStr_FlagMultiLine = function (node, multiline)
        {
            return " aria-multiline='" + multiline + "'";
        };

        nexacro.__setDOMAccessibility_FlagSelectable = function (node, selectable)
        {
            node.setAttribute("aria-selected", selectable);
        };
        nexacro.__getDOMAccessibilityStr_FlagSelectable = function (selectable)
        {
            return " aria-selected" + selectable + "'";
        };

        nexacro.__setDOMAccessibility_FlagMultiSelectable = function (node, multiselectable)
        {
            node.setAttribute("aria-multiselectable", multiselectable);
        };
        nexacro.__getDOMAccessibilityStr_FlagMultiSelectable = function (multiselectable)
        {
            return " aria-multiselectable='" + multiselectable + "'";
        };

        nexacro.__setDOMAccessibility_FlagDefaultButton = function (node, button)
        {
            //
        };
        nexacro.__getDOMAccessibilityStr_FlagDefaultButton = function (button)
        {
            return "";
        };


        nexacro.__setDOMAccessibility_InfoCount = function (node, count)
        {
            node.setAttribute("aria-setsize", count);
        };
        nexacro.__getDOMAccessibilityStr_InfoCount = function (count)
        {
            return " aria-setsize='" + count + "'";
        };

        nexacro.__setDOMAccessibility_InfoIndex = function (node, index)
        {
            node.setAttribute("aria-posinset", index);
        };
        nexacro.__getDOMAccessibilityStr_InfoIndex = function (index)
        {
            return " aria-posinset='" + index + "'";
        };

        nexacro.__setDOMAccessibility_InfoValueMax = function (node, maxvalue)
        {
            node.setAttribute("aria-valuemax", maxvalue);
        };
        nexacro.__getDOMAccessibilityStr_InfoValueMax = function (maxvalue)
        {
            return " aria-valuemax='" + maxvalue + "'";
        };

        nexacro.__setDOMAccessibility_InfoValueMin = function (node, minvalue)
        {
            node.setAttribute("aria-valuemin", minvalue);
        };
        nexacro.__getDOMAccessibilityStr_InfoValueMin = function (minvalue)
        {
            return " aria-valuemin='" + minvalue + "'";
        };

        nexacro.__setDOMAccessibility_InfoValueCur = function (node, value)
        {
            node.setAttribute("aria-valuenow", value);
        };
        nexacro.__getDOMAccessibilityStr_InfoValueCur = function (value)
        {
            return " aria-valuenow='" + value + "'";
        };

        nexacro.__setDOMAccessibility_InfoValueText = function (node, text)
        {
            node.setAttribute("aria-valuetext", text);
        };
        nexacro.__getDOMAccessibilityStr_InfoValueText = function (text)
        {
            return " aria-valuetext='" + text + "'";
        };

        nexacro.__setDOMAccessibility_InfoLevel = function (node, level)
        {
            if (level)
                node.setAttribute("aria-level", level);
        };


        if (nexacro._Browser == "IE")
        {
            nexacro.__setDOMAccessibility_StatFocus = function (node, label)
            {

                var acclabel = label;
                if (!label)
                    acclabel = node.getAttribute("aria-label");
                nexacro.__notifyAccessibility(node, acclabel, "focus");
                //ie일 경우에만 강제 읽기 실행 `
            };
        }
        else
        {
            nexacro.__setDOMAccessibility_StatFocus = function (node, label)
            {

                var acclabel = label;
                if (!label)
                    acclabel = node.getAttribute("aria-label");
                nexacro.__notifyAccessibility(node, acclabel, "focus");

            };
        }

        nexacro.__setDOMAccessibility_Selection = function (node, select)
        {
            //Todo..
        };

        nexacro.__setDOMAccessibility_HotKey = function (node, select)
        {
            //Todo..
        };

        nexacro.__setDOMAccessibility_ActiveDescendant = function (node, id)
        {
            node.setAttribute("aria-activedescendant", id);
        };

        nexacro.__setDOMAccessibility_TabStop = function (node, id)
        {

        };

        nexacro.__setDOMAccessibility_Live = function (node)
        {
            node.innerHTML = "accessibilityLiveNode";
            node.setAttribute("aria-relevant", "text");
            node.setAttribute("aria-live", "assertive");
            node.setAttribute("aria-atomic", "false");
        };

        //변경된 값만 읽는다.
        nexacro.__setDOMAccessibility_Value = function (node, value, elem, bfocus)
        {
            nexacro.__notifyAccessibility(node, value, "valuechange", elem, bfocus);
        };

        /*
        강제읽기 기능 분기 처리, accessibilityreplayhotkey, accessibilitywholereadtype, accessibilitybackwardkey 키등
        playaccessibility나 notifyaccessibility를 통해 강제읽기 기능으로 구현된 기능에서 브라우져 버그가 발생하여 분기처리함.
        14.11.23. Snare
        15.01.10 IE11 및 캘린더 분기 처리 (팝업 캘린더시 notify_node로 포커스를 주어 접근성 상태일때 포커스 빠지는 현상 IE8, IE11해결)
        */

        nexacro._AccessibilityNotifyManager = function ()
        {
            this._nodes = [];
            this._index = -1;
            this._count = 0;
        };

        var _pAccessibilityNotifyManager = nexacro._createPrototype(Object, nexacro._AccessibilityNotifyManager);
        nexacro._AccessibilityNotifyManager.prototype = _pAccessibilityNotifyManager;

        if (nexacro._Browser == "Gecko")
        {
            _pAccessibilityNotifyManager._getNotifyNode = function ()
            {
                if (this._index == -1)
                {
                    var _doc = document;
                    var node = _doc.createElement("div");
                    node.id = "accessibility_notify_" + this._count;

                    var node_style = node.style;
                    nexacro.__setDOMStyle_Absolute(node_style);
                    nexacro.__setDOMStyle_Size(node_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node, -1);
                    nexacro.__setDOMAccessibility_Role(node, "document");
                    _doc.body.appendChild(node);


                    this._nodes.push(node);

                    this._count = this._count + 1;

                    var node2 = _doc.createElement("div");
                    node2.id = "accessibility_notify_" + this._count;

                    var node2_style = node2.style;
                    nexacro.__setDOMStyle_Absolute(node2_style);
                    nexacro.__setDOMStyle_Size(node2_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node2, -1);

                    _doc.body.appendChild(node2);
                    nexacro.__setDOMAccessibility_Role(node2, "document");
                    this._nodes.push(node2);
                    this._index = 0;
                }

                return this._nodes;
            };

            _pAccessibilityNotifyManager._notify = function (handle, label, notifyevent, elem)
            {
                var nodes = this._getNotifyNode();
                if (nodes)
                {
                    if (notifyevent == "notify")
                    {
                        var node = nodes[this._index];
                        node.innerText = label;
                        nexacro.__setDOMNode_Title(node, label);
                        node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMNode_Title(node, label);
                    }
                }
                this._index = this._index ^ 1;
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 11)
        {
            _pAccessibilityNotifyManager._getNotifyNode = function ()
            {
                if (this._index == -1)
                {
                    var _doc = document;
                    var node = _doc.createElement("div");
                    node.id = "accessibility_notify_" + this._count;

                    var node_style = node.style;
                    nexacro.__setDOMStyle_Absolute(node_style);
                    nexacro.__setDOMStyle_Size(node_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node, -1);
                    nexacro.__setDOMAccessibility_Role(node, "document");
                    _doc.body.appendChild(node);


                    this._nodes.push(node);

                    this._count = this._count + 1;

                    var node2 = _doc.createElement("div");
                    node2.id = "accessibility_notify_" + this._count;

                    var node2_style = node2.style;
                    nexacro.__setDOMStyle_Absolute(node2_style);
                    nexacro.__setDOMStyle_Size(node2_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node2, -1);

                    _doc.body.appendChild(node2);
                    nexacro.__setDOMAccessibility_Role(node2, "document");
                    this._nodes.push(node2);
                    this._index = 0;
                }

                return this._nodes;
            };

            _pAccessibilityNotifyManager._notify = function (handle, label, notifyevent, elem, bfocus)
            {
                var nodes = this._getNotifyNode();
                if (nodes)
                {
                    if (notifyevent == "notify")
                    {
                        var node = nodes[this._index];
                        node.innerText = label;
                        if (elem)
                        {
                            if (elem.accessibility_role != "textbox")
                            {
                                nexacro.__setDOMAccessibility_Role(node, elem.accessibility_role);
                            }
                            else
                            {
                                nexacro.__setDOMAccessibility_Role(node, "document");
                            }
                            nexacro.__setDOMStyle_Pos(node.style, elem.left, elem.top);
                        }
                        else
                        {
                            nexacro.__setDOMAccessibility_Role(node, handle.getAttribute('role'));
                        }
                        node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "valuechange")
                    {
                        var node = nodes[0];
                        node.innerText = "";
                        if (elem && elem.input_handle)
                        {
                            //nexacro.__setDOMAccessibility_Role(elem.input_handle, elem._parent_elem.accessibility_role);
                        }
                        if (bfocus)
                            node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "daychange")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "wholeread")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMAccessibility_Role(node, "document");
                        node.focus();
                    }
                    else
                    {
                        var node = nodes[0];
                        node.innerText = label;
                    }
                }
                this._index = this._index ^ 1;
            };
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9)
        {
            _pAccessibilityNotifyManager._getNotifyNode = function ()
            {
                if (this._index == -1)
                {
                    var _doc = document;
                    var node = _doc.createElement("div");
                    node.id = "accessibility_notify_" + this._count;

                    var node_style = node.style;
                    nexacro.__setDOMStyle_Absolute(node_style);
                    nexacro.__setDOMStyle_Size(node_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node, -1);
                    nexacro.__setDOMAccessibility_Role(node, "document");
                    _doc.body.appendChild(node);


                    this._nodes.push(node);

                    this._count = this._count + 1;

                    var node2 = _doc.createElement("div");
                    node2.id = "accessibility_notify_" + this._count;

                    var node2_style = node2.style;
                    nexacro.__setDOMStyle_Absolute(node2_style);
                    nexacro.__setDOMStyle_Size(node2_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node2, -1);

                    _doc.body.appendChild(node2);
                    nexacro.__setDOMAccessibility_Role(node2, "document");
                    this._nodes.push(node2);
                    this._index = 0;
                }

                return this._nodes;
            };

            _pAccessibilityNotifyManager._notify = function (handle, label, notifyevent, elem, bfocus)
            {
                var nodes = this._getNotifyNode();
                if (nodes)
                {
                    if (notifyevent == "notify")
                    {
                        var node = nodes[this._index];
                        node.innerText = label;

                        if (elem)
                        {
                            if (elem.accessibility_role != "textbox")
                            {
                                nexacro.__setDOMAccessibility_Role(node, elem.accessibility_role);
                            }
                            else
                            {
                                nexacro.__setDOMAccessibility_Role(node, "document");
                            }
                            nexacro.__setDOMStyle_Pos(node.style, elem.left, elem.top);
                        }
                        else
                        {
                            nexacro.__setDOMAccessibility_Role(node, handle.getAttribute('role'));
                        }
                        node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "valuechange")
                    {
                        var node = nodes[0];
                        node.innerText = "";

                        if (elem && elem.input_handle)
                        {
                            //nexacro.__setDOMAccessibility_Role(elem.input_handle, "document");
                        }
                        if (bfocus)
                            node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "daychange")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "wholeread")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMAccessibility_Role(node, "document");
                        node.focus();
                    }
                    else
                    {
                        var node = nodes[0];
                        node.innerText = label;
                    }
                }
                this._index = this._index ^ 1;
            };
        }
        else if (true) // || nexacro._Browser == "IE" || nexacro._Browser == "Chrome")
        {
            _pAccessibilityNotifyManager._getNotifyNode = function ()
            {
                if (this._index == -1)
                {
                    var _doc = document;
                    var node = _doc.createElement("div");
                    node.id = "accessibility_notify_" + this._count;

                    var node_style = node.style;
                    nexacro.__setDOMStyle_Absolute(node_style);
                    nexacro.__setDOMStyle_Size(node_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node, -1);
                    nexacro.__setDOMAccessibility_Role(node, "document");
                    _doc.body.appendChild(node);


                    this._nodes.push(node);

                    this._count = this._count + 1;

                    var node2 = _doc.createElement("div");
                    node2.id = "accessibility_notify_" + this._count;

                    var node2_style = node2.style;
                    nexacro.__setDOMStyle_Absolute(node2_style);
                    nexacro.__setDOMStyle_Size(node2_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node2, -1);

                    _doc.body.appendChild(node2);
                    nexacro.__setDOMAccessibility_Role(node2, "document");
                    this._nodes.push(node2);
                    this._index = 0;
                }

                return this._nodes;
            };

            _pAccessibilityNotifyManager._notify = function (handle, label, notifyevent, elem, bfocus)
            {
                var nodes = this._getNotifyNode();
                if (nodes)
                {
                    if (notifyevent == "notify")
                    {

                        var node = nodes[this._index];
                        node.innerText = label;

                        if (elem)
                        {
                            if (elem.accessibility_role != "textbox")
                            {
                                nexacro.__setDOMAccessibility_Role(node, elem.accessibility_role);
                            }
                            else
                            {
                                nexacro.__setDOMAccessibility_Role(node, "document");
                            }
                            nexacro.__setDOMStyle_Pos(node.style, elem.left, elem.top);
                        }
                        else
                        {
                            nexacro.__setDOMAccessibility_Role(node, handle.getAttribute('role'));
                        }
                        node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "valuechange")
                    {
                        var node = nodes[0];
                        if (label == "#textarea:msg_accessibility_emptyline")
                        {
                            label = nexacro._getErrorMessge("msg_accessibility_emptyline");
                        }
                        node.innerText = label;
                        nexacro.__setDOMAccessibility_Role(node, "listitem");
                        nexacro.__setDOMAccessibility_ActiveDescendant(handle, node.id);

                        if (elem && elem.input_handle)
                        {
                            //nexacro.__setDOMAccessibility_Role(elem.input_handle, "document");
                        }
                        if (bfocus)
                            node.focus();
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "daychange")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMAccessibility_ActiveDescendant(handle, node.id);
                        nexacro.__setDOMStyle_Pos(node.style, 0, 0);
                    }
                    else if (notifyevent == "wholeread")
                    {
                        var node = nodes[0];
                        node.innerText = label;
                        nexacro.__setDOMAccessibility_Role(node, "document");
                        node.focus();
                    }
                    else
                    {
                        var node = nodes[0];
                        node.innerText = label;
                    }
                }
                this._index = this._index ^ 1;
            };
        }
        else
        {
            _pAccessibilityNotifyManager._getNotifyNode = function ()
            {
                if (this._index == -1)
                {
                    var _doc = document;
                    var node = _doc.createElement("div");
                    node.id = "accessibility_notify_" + this._count;

                    var node_style = node.style;
                    nexacro.__setDOMStyle_Absolute(node_style);
                    nexacro.__setDOMStyle_Size(node_style, 0, 0);
                    nexacro.__setDOMNode_TabIndex(node, -1);
                    _doc.body.appendChild(node);

                    node_style.background = "transparent";
                    nexacro.__setDOMAccessibility_Role(node, "log");
                    nexacro.__setDOMAccessibility_Label(node, "temporary");
                    nexacro.__setDOMAccessibility_Live(node);

                    this._nodes.push(node);

                    this._count = this._count + 1;

                    this._index = 0;
                }

                return this._nodes;
            };

            _pAccessibilityNotifyManager._notify = function (handle, label)
            {
                var nodes = this._getNotifyNode();
                if (nodes)
                {
                    var node = nodes[this._index];
                    nexacro._AccessibilityUtil.setDOMNodeLabel(node, label);
                }
            };
        }


        nexacro.__notifyAccessibility = function (node, label, notifyevent, elem, bfocus)
        {
            if (!nexacro._AccessibilityNotifyNode)
                nexacro._AccessibilityNotifyNode = new nexacro._AccessibilityNotifyManager();
            nexacro._AccessibilityNotifyNode._notify(node, label, notifyevent, elem, bfocus);
        };

        //특수한 케이스에대해 예외처리를 해주기위해
        nexacro._notifyAccessibilityValue = function (elem, label, notifyevent)
        {
            if (!nexacro._AccessibilityNotifyNode)
                nexacro._AccessibilityNotifyNode = new nexacro._AccessibilityNotifyManager();
            var handle = elem.handle;
            if (handle)
            {
                nexacro._AccessibilityNotifyNode._notify(handle, label, notifyevent, elem);
            }
        };



        //전체 읽기 , valuechange




        //==============================================================================
        // Util Functions
        //==============================================================================
        // for use object cache : use closure
        (function ()
        {
            // for multiple replace -- single replacement with map function is fast
            var re_special_htmlchar = /&|"|'|\<|\>|\r|\n/g;
            function _replace_htmlChar(chr)
            {
                if (chr == "&") return "&amp;";
                else if (chr == "'") return "&#39;";
                else if (chr == '"') return "&quot;";
                else if (chr == "<") return "&lt;";
                else if (chr == ">") return "&gt;";
                else if (chr == "\r") return "";
                else if (chr == "\n") return "<br/>";
                else return chr;
            }
            nexacro.__toInnerHTMLText = function (text)
            {
                return text.replace(re_special_htmlchar, _replace_htmlChar);
            };
        })();

        (function ()
        {
            var re_special_xmlchar = /[&"'\<\>\r\n\t ]/g;
            function _encode_xmlChar(chr)
            {
                if (chr == "&") return "&amp;";
                else if (chr == "'") return "&#39;";
                else if (chr == '"') return "&quot;";
                else if (chr == "<") return "&lt;";
                else if (chr == ">") return "&gt;";
                else if (chr == "\r") return "&#13;";
                else if (chr == "\n") return "&#10;";
                else if (chr == "\t") return "&#9;";
                else if (chr == " ") return "&#32;";
                else return chr;
            }
            nexacro._encodeXml = function (str)
            {
                if (!nexacro._isNull(str))  //passing an empty-string
                {
                    return str.replace(re_special_xmlchar, _encode_xmlChar);
                }
            };

            var re_encoded_xmlchar = /&#[0-9]+;|&[a-z]+;/g;
            function _decode_xmlStr(str)
            {
                if (str.charAt(1) == "#")
                {
                    return String.fromCharCode(str.substring(2, str.length - 1) | 0);
                }
                else
                {
                    var code = str.substring(1, str.length - 1);
                    if (code == "amp") return "&";
                    else if (code == "quot") return "\"";
                    else if (code == "apos") return "\'";
                    else if (code == "lt") return "<";
                    else if (code == "gt") return ">";
                    else return "";
                }
            }
            nexacro._decodeXml = function (str)
            {
                if (str.indexOf("&") >= 0)
                    return str.replace(re_encoded_xmlchar, _decode_xmlStr);
                return str;
            };
        })();

        nexacro._getDisplayText = function (text, _type)
        {
            return text;
        };

        nexacro._getHTMLOuter = function (node, doc)
        {
            if (!node || !node.tagName) return '';
            var txt = node.outerHTML;
            if (!txt)
            {
                var el = doc.createElement("div");

                el.appendChild(node);
                txt = el.innerHTML;
                el = null;
            }

            return txt;
        };


        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro._getCloneNode = function (node)
            {
                var clone = document.createElement("div");  // cloneNode_function destroy vml_code
                clone.innerHTML = node.innerHTML;
                return clone;
            };

            nexacro._makeFakePrintNode = function (comps)
            {
                var remove_targets = [];

                for (var i = 0, len = comps.length; i < len; i++)
                {
                    if (comps[i]._type_name == "WebBrowser")
                    {
                        var doc = comps[i].document;
                        if (doc)
                        {
                            // 위치 조정, 크기 조정
                            var fake_chart_node = document.createElement("div");
                            fake_chart_node.innerHTML = doc.body.innerHTML;

                            var style = comps[i]._control_element._client_element._handle.style;
                            fake_chart_node.style.position = "absolute";
                            fake_chart_node.style.left = style.left;
                            fake_chart_node.style.top = style.top;
                            fake_chart_node.style.width = style.width;
                            fake_chart_node.style.height = style.height;
                            comps[i]._control_element._handle.appendChild(fake_chart_node);
                            remove_targets.push(fake_chart_node);
                        }
                    }
                }

                return remove_targets;
            };
        }
        else // HTML5 (IE9~ / FF / Chrome)
        {
            nexacro._getCloneNode = function (node)
            {
                return node.cloneNode(true);
            };

            nexacro._makeFakePrintNode = function (comps)
            {
                var remove_targets = [];

                for (var i = 0, len = comps.length; i < len; i++)
                {
                    var doc = comps[i].document;
                    if (doc)
                    {
                        var canvases = doc.getElementsByTagName("canvas");
                        if (canvases && canvases.length)
                        {
                            var cv = doc.createElement("canvas");
                            var context = cv.getContext("2d");

                            var w, h;
                            w = h = 0;

                            for (var j = 0, cv_len = canvases.length; j < cv_len ; j++)
                            {
                                if (w < canvases[j].clientWidth)
                                    w = canvases[j].clientWidth;

                                if (h < canvases[j].clientHeight)
                                    h = canvases[j].clientHeight;
                            }
                            cv.width = w;
                            cv.height = h;

                            for (var j = 0, cv_len = canvases.length; j < cv_len ; j++)
                            {
                                context.drawImage(canvases[j], parseInt(canvases[j].style.left), parseInt(canvases[j].style.top), canvases[j].clientWidth, canvases[j].clientHeight);
                            }

                            var fake_chart_node = document.createElement("img");
                            fake_chart_node.src = cv.toDataURL("image/png");

                            var style = comps[i]._control_element._client_element._handle.style;
                            fake_chart_node.style.position = style.position;
                            fake_chart_node.style.left = style.left;
                            fake_chart_node.style.top = style.top;
                            fake_chart_node.style.width = style.width;
                            fake_chart_node.style.height = style.height;
                            comps[i]._control_element._handle.appendChild(fake_chart_node);
                            remove_targets.push(fake_chart_node);
                        }
                    }
                }

                return remove_targets;
            };
        }

        nexacro._searchFakePrintNode = function (comp, make_targets)
        {
            if (comp._is_form)
            {
                var comps = comp.components;
                for (var i = 0, len = comps.length; i < len; i++)
                {
                    if (comps[i]._type_name == "WebBrowser")
                    {
                        make_targets.push(comps[i]);
                    }
                    else if (comps[i]._is_form) //recursive
                    {
                        make_targets = nexacro._searchFakePrintNode(comps[i], make_targets);
                    }
                }
            }

            return make_targets;
        };

        nexacro._beforePrintCheckPlugin = function (comp, refform, defaultprint, valign, halign, fitonepage)
        {
            var make_targets = [];
            var remove_targets = [];

            if (comp._is_form)
            {
                make_targets = nexacro._searchFakePrintNode(comp, make_targets);
                remove_targets = nexacro._makeFakePrintNode(make_targets);
            }
            else if (comp._type_name == "WebBrowser")
            {
                if (nexacro._BrowserVersion > 8 && (nexacro._Browser == "Edge" || nexacro._Browser == "IE"))
                {
                    make_targets.push(comp);
                    remove_targets = nexacro._makeFakePrintNode(make_targets);
                }
                else
                {
                    nexacro._printInnerContents(comp);
                    return;
                }
            }

            nexacro._print(comp, comp._refform, defaultprint, valign, halign);

            for (var i = 0, len = remove_targets.length; i < len; i++)
            {
                remove_targets[i].parentNode.removeChild(remove_targets[i]);
            }

            make_targets = null;
            remove_targets = null;
        };

        nexacro._print = function (pThis, refform, defaultprint, valign, halign)
        {
            var form_elem = refform.getElement();
            var doc = form_elem.getRootWindowHandle();

            //var clone_handle = pThis._control_element._handle.cloneNode(true);
            var clone_handle = nexacro._getCloneNode(pThis._control_element._handle);

            if (pThis._control_element.container_maxwidth)
            {
                clone_handle.style.width = pThis._control_element.container_maxwidth + "px";
                if (clone_handle.firstChild)
                    clone_handle.firstChild.style.width = pThis._control_element.container_maxwidth + "px";
            }
            if (pThis._control_element.container_maxheight)
            {
                clone_handle.style.height = pThis._control_element.container_maxheight + "px";
                if (clone_handle.firstChild)
                    clone_handle.firstChild.style.height = pThis._control_element.container_maxheight + "px";
            }

            if (clone_handle.lastChild && clone_handle.lastChild.id == clone_handle.id + "_vscrollbar")
            {
                clone_handle.removeChild(clone_handle.lastChild);
            }
            if (clone_handle.lastChild && clone_handle.lastChild.id == clone_handle.id + "_hscrollbar")
            {
                clone_handle.lastChild.style.width = clone_handle.style.width;
                clone_handle.lastChild.style.top = parseInt(clone_handle.style.height) - parseInt(clone_handle.lastChild.style.height) + "px";
            }


            // left top으로 맞춤
            clone_handle.style.left = "0px";
            clone_handle.style.top = "0px";
            clone_handle.style.overflow = ""; // overflow hidden bug in ie


            var html = '<HTML lang=\"' + nexacro._BrowserLang.substr(0, 2) + '\">\n<HEAD>\n';

            if (doc.getElementsByTagName != null)
            {
                var headTags = doc.getElementsByTagName("head");

                if (headTags.length > 0)
                {
                    html += headTags[0].innerHTML;
                }
            }

            if (clone_handle.getElementsByTagName != null)
            {
                var inputTags = clone_handle.getElementsByTagName("input");
                var temp = pThis._control_element._handle.getElementsByTagName("input");
                for (var i = 0; i < inputTags.length; i++)
                {
                    inputTags[i].setAttribute("value", temp[i].value);
                }
            }

            html += '\n</HEAD>\n\n';
            html += '<BODY onLoad="self.print(); self.close();">\n';
            //html += '<BODY>\n';
            html += nexacro._getHTMLOuter(clone_handle, doc);//form_elem._handle.innerHTML;
            html += '</BODY>\n\n</HTML>\n\n';

            var wnd = window;
            if (refform && refform._control_element && refform._control_element.linkedcontrol && refform._control_element.linkedcontrol._getWindow()._doc.parentWindow)
            {
                wnd = doc.parentWindow;
            }

            var printWin = window.open("", "printSpecial", "top=" + wnd.screenTop + ",left=" + wnd.screenLeft + ", width=auto, height=auto");
            //var printWin = window.open("", "printSpecial", "top=" + wnd.screenTop + ",left=" + wnd.screenLeft + ", width=800, height=1000, scrollbars=yes, resizable=yes");
            printWin.document.open();
            printWin.document.write(html);
            printWin.document.close();
        };

        if (nexacro._Browser == "Edge" || nexacro._Browser == "IE")
        {
            nexacro._printInnerContents = function (comp)
            {
                try
                {
                    var current_focus = document.activeElement;
                    var win = comp._ifrm_elem._handle.contentWindow;
                    if (!win.onafterprint)
                    {
                        win.onafterprint = function ()
                        {
                            current_focus.focus();
                        }
                    }
                    win.document.body.focus();
                    win.print();

                    // TO DO - enable accessbility
                    return true;
                }
                catch (e)
                {
                    return false;
                }
            };
        }
        else
        {
            nexacro._printInnerContents = function (comp)
            {
                try
                {
                    comp.callMethod("print");
                    return true;
                }
                catch (e)
                {
                    return false;
                }
            };
        }

        //==============================================================================
        nexacro._managerFrameDoc = null;
        nexacro._managerFrameNode = null;
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro._managerFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							      + "<head>\n"
							      + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
							      + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "</head>\n"
							      + "<body style='margin:0;border:none;'>\n"
							      + "<script type='text/javascript'>\n"
							      + "nexacro = parent.nexacro;"
							      + 'nexacro._imgloadhandler_onload_forward = function() { nexacro._imgloadhandler_onload(window.event.srcElement); };'
							      + 'nexacro._imgloadhandler_onerror_forward = function () { nexacro._imgloadhandler_onerror(window.event.srcElement); };'
							      + "</script>\n"
							      + "</body>\n"
							      + "</html>";
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9)
        {
            nexacro._managerFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							      + "<head>\n"
							      + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
							      + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "</head>\n"
							      + "<body style='margin:0;border:none;'>\n"
							      + "<script type='text/javascript'>\n"
							      + "nexacro = parent.nexacro;"
							      + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.target); };'
							      + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.target); };'
							      + "</script>\n"
							      + "</body>\n"
							      + "</html>";
        }
        else if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 9) //IE 10
        {
            nexacro._managerFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							      + "<head>\n"
							      + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
							      + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "</head>\n"
							      + "<body style='margin:0;border:none;'>\n"
							      + "<script type='text/javascript'>\n"
							      + "nexacro = parent.nexacro;"
							      + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.srcElement); };'
							      + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.srcElement); };'
							      + "</script>\n"
							      + "</body>\n"
							      + "</html>";
        }
        else
        {
            nexacro._managerFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							      + "<head>\n"
							      + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
							      + "</head>\n"
							      + "<body style='margin:0;border:none;'>\n"
							      + "<script type='text/javascript'>\n"
							      + "nexacro = parent.nexacro;"
							      + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.target); };'
							      + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.target); };'
							      + "</script>\n"
							      + "</body>\n"
							      + "</html>";
        }

        if (nexacro._Browser == "IE")
        {
            nexacro._managerPopupFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							          + "<head>\n"
							          + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
							          + "</head>\n"
							          + "<body style='margin:0;border:none;'>\n"
							          + "<script type='text/javascript'>\n"
							          + "nexacro = parent.nexacro;"
							          + "</script>\n"
							          + "</body>\n"
							          + "</html>";
        }
        else
        {
            nexacro._managerPopupFrameSrc = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							          + "<head/>\n"
							          + "<body style='margin:0;border:none;'>\n"
							          + "<script type='text/javascript'>\n"
							          + "nexacro = parent.nexacro;"
							          + "</script>\n"
							          + "</body>\n"
							          + "</html>";
        }

        nexacro._preparePopupManagerFrame = function (popupWin)
        {

            var _doc = popupWin.document;
            var iframeobj = _doc.createElement("IFRAME");
            iframeobj.frameborder = "0";
            iframeobj.scrolling = "no";
            iframeobj.style.visibility = 'hidden';
            iframeobj.style.position = 'absolute';
            iframeobj.style.border = 'none';

            nexacro.__setDOMNode_Title(iframeobj, "");

            _doc.body.appendChild(iframeobj);
            iframeobj.src = "about:blank";
            var _frame_doc;
            if (nexacro._Browser == "IE")
            {
                _frame_doc = iframeobj.contentWindow.document;
            }
            else
            {
                _frame_doc = iframeobj.contentDocument;
            }
            _frame_doc.open();
            _frame_doc.write(nexacro._managerPopupFrameSrc);
            _frame_doc.close();
            nexacro._managerPopupFrameNode = iframeobj;
            nexacro._managerPopupFrameDoc = _frame_doc;

        };

        nexacro._prepareManagerFrame = function ()
        {
            var _doc = document;
            var iframeobj = _doc.createElement("IFRAME");
            iframeobj.frameborder = "0";
            iframeobj.scrolling = "no";

            iframeobj.style.visibility = 'hidden';
            iframeobj.style.position = 'absolute';
            iframeobj.style.border = 'none';
            if (nexacro._OS == "iOS")
            {
                iframeobj.style.display = 'none'; //ios hybrid에선 iframe이 visibility 로 hidden 되지 않음.
            }

            nexacro.__setDOMNode_Title(iframeobj, "");

            _doc.body.appendChild(iframeobj);
            iframeobj.src = "about:blank";
            var _frame_doc;
            if (nexacro._Browser == "IE")
            {
                _frame_doc = iframeobj.contentWindow.document;
            }
            else
            {
                _frame_doc = iframeobj.contentDocument;
            }
            _frame_doc.open();
            _frame_doc.write(nexacro._managerFrameSrc);
            _frame_doc.close();
            nexacro._managerFrameNode = iframeobj;
            nexacro._managerFrameDoc = _frame_doc;
        };

        nexacro._destroyManagerFrame = function (_win_handle)
        {
            var dest_handle = nexacro._getWindowDestinationHandle(_win_handle);
            if (nexacro._managerFrameNode && dest_handle)
            {
                nexacro.__removeDOMNode(dest_handle, nexacro._managerFrameNode);
            }
            nexacro._managerFrameNode = null;
            nexacro._managerFrameDoc = null;
        };


        if (nexacro._Browser == "IE")
        {
            nexacro._createFrameNode = function (node, left, top, _doc)
            {
                var framehandle = _doc.createElement("iframe");
                framehandle.id = node.id + "_iframe";
                framehandle.frameborder = 0;
                framehandle.scrolling = "no";
                framehandle.style.border = 'none';
                framehandle.style.filter = "Alpha(Opacity=0);";

                framehandle.left = left;
                framehandle.top = top;

                framehandle.style.width = "100%";
                framehandle.style.height = "100%";
                nexacro.__appendDOMNode(node, framehandle);

                return framehandle;
            };

            nexacro._destroyFrameNode = function (node, framehandle)
            {
                if (framehandle)
                {
                    nexacro.__removeDOMNode(node, framehandle);
                }
                framehandle = null;
            };
        }
        else
        {
            nexacro._createFrameNode = nexacro._destroyFrameNode = nexacro._emptyFn;
        }

        //==============================================================================

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            // for old Browser <-- not support canvas
            // use DOM Node update & get clientWIdth & clientHeight
            nexacro._TextCacheNodeCnt = 0;
            nexacro._TextInfoCacheManager = function (font, wordspacing, letterspacing, lineheight)
            {
                this.font = font;
                this.nowrapnode_arr = [];
                this.font_height = 0;
                this.space_width = 0;
                this.cache = {};
                if (wordspacing)
                    this.wordspacing = wordspacing;
                if (letterspacing)
                    this.letterspacing = letterspacing;
                if (lineheight)
                    this.lineheight = lineheight;
                this._getFontInfo();
                this.wordwrapnode = null;
                this.TextAreaWordwrapnode = null;
            };
            _pTextInfoCacheManager = nexacro._createPrototype(Object, nexacro._TextInfoCacheManager);
            nexacro._TextInfoCacheManager.prototype = _pTextInfoCacheManager;

            //_pTextInfoCacheManager.getNode = function ()
            //{
            //    return this.getNowrapTextNode();
            //};          

            _pTextInfoCacheManager.restoreNode = function (node)
            {
                this.restoreNowrapTextNode(node);
            };
            

            _pTextInfoCacheManager._getFontInfo = function ()
            {
                var node = this.getNowrapTextNode();
                var node_style = node.style;
                var letterspacing = this.letterspacing;
                if (letterspacing)
                    nexacro.__setDOMStyle_LetterSpacingObject(node_style, letterspacing);
                var wordspacing = this.wordspacing;
                if (wordspacing)
                    nexacro.__setDOMStyle_WordSpacingObject(node_style, wordspacing);
                var lineheight = this.lineheight;
                if (lineheight)
                    nexacro.__setDOMStyle_LineHeightObject(node_style, lineheight);
                nexacro.__setDOMNode_SinglelineText(node, "gH");
                this.font_height = node.clientHeight;
                nexacro.__setDOMNode_SinglelineText(node, " ");
                this.space_width = node.clientWidth;
                this.restoreNowrapTextNode(node);
            };

            _pTextInfoCacheManager.getWordTextWidth = function (word)
            {
                var letterspacing = this.letterspacing;
                var text_width = this.cache[word + " " + letterspacing];
                if (text_width == null)
                {
                    var textnode = this.getNowrapTextNode();

                    // Set Text
                    try
                    {
                        nexacro.__setDOMNode_SinglelineText(textnode, word);
                        if (letterspacing)
                            nexacro.__setDOMStyle_LetterSpacing(textnode.style, letterspacing);
                    }
                    catch (e)
                    {
                    }
                    text_width = textnode.clientWidth;
                    this.restoreNowrapTextNode(textnode);
                    this.cache[word + " " + letterspacing] = text_width;
                }
                return text_width;
            };
        }
        else
        {
            // for mordern Browser <-- support canvas
            // use canvas & neasureText() API
            nexacro._TextCacheNodeCnt = 0;
            nexacro._TextInfoCacheManager = function (font, wordspacing, letterspacing, lineheight)
            {
                this.font = font;
                this.nowrapnode_arr = [];
                this.canvas_arr = [];
                this.font_height = 0;
                this.space_width = 0;
                if (wordspacing)
                    this.wordspacing = wordspacing;
                if (letterspacing)
                    this.letterspacing = letterspacing;
                if (lineheight)
                    this.lineheight = lineheight;
                this.cache = {};
                this._getFontInfo();
                this.wordwrapnode = null;
               
            };
            var _pTextInfoCacheManager = nexacro._createPrototype(Object, nexacro._TextInfoCacheManager);
            nexacro._TextInfoCacheManager.prototype = _pTextInfoCacheManager;

            if (nexacro._Browser == "Gecko")
            {
                nexacro._HTMLNodeSizeGap = 1;
            }
            else
            {
                nexacro._HTMLNodeSizeGap = 0;
            }

            //_pTextInfoCacheManager.getNode = function ()
            //{
            //    return this.getCanvasNode();
            //};

            _pTextInfoCacheManager.getCanvasNode = function ()
            {
                var canvasinfo = this.canvas_arr.pop();
                if (canvasinfo == null)
                {
                    // canvas no need append to HTML document
                    // only measure Text widhh
                    // ==> no need use Iframe nexacro._managerFrameDoc
                    var node = document.createElement("canvas");
                    var ctx = node.getContext('2d');
                    this._setCanvasStyleFont(ctx, this.font);

                    canvasinfo = { node: node, ctx: ctx };
                }
                return canvasinfo;
            };

            _pTextInfoCacheManager.restoreNode = function (node)
            {
                this.restoreCanvasNode(node);
            };

            _pTextInfoCacheManager.restoreCanvasNode = function (canvas_info)
            {
                this.canvas_arr.push(canvas_info);
            };

            _pTextInfoCacheManager._getFontInfo = function ()
            {
                var _doc = nexacro._managerFrameDoc;
                var node = _doc.createElement("div");
                var is_letterspacing_wordspacing = false;
                node.id = "calculate_text_" + nexacro._TextCacheNodeCnt;

                var node_style = node.style;
                node_style.position = "absolute";
                node_style.height = "auto";
                node_style.width = "auto";
                node_style.left = "0px";
                node_style.top = "0px";
                node_style.visibility = "hidden";

                this._setStyleFont(node_style, this.font);
                var letterspacing = this.letterspacing;
                if (letterspacing)
                {
                    nexacro.__setDOMStyle_LetterSpacingObject(node_style, letterspacing);
                    is_letterspacing_wordspacing = true;
                }
                var wordspacing = this.wordspacing;
                if (wordspacing)
                {
                    nexacro.__setDOMStyle_WordSpacingObject(node_style, wordspacing);
                    is_letterspacing_wordspacing = true;
                }
                var lineheight = this.lineheight;
                if (lineheight)
                    nexacro.__setDOMStyle_LineHeightObject(node_style, lineheight);

                _doc.body.appendChild(node);
                nexacro._TextCacheNodeCnt++;

                nexacro.__setDOMNode_SinglelineText(node, "gH");
                this.font_height = node.clientHeight - nexacro._HTMLNodeSizeGap;               
                if (is_letterspacing_wordspacing)
                {
                    var gh_width = node.clientWidth;
                    nexacro.__setDOMNode_SinglelineText(node, 'g H');
                    this.space_width = node.clientWidth - gh_width;
                    _doc.body.removeChild(node);
                }
                else
                {
                        // canvas no need append to HTML document
                        // only measure Text widhh
                        // ==> no need use Iframe nexacro._managerFrameDoc
                        var node = document.createElement("canvas");
                        var ctx = node.getContext('2d');
                        this._setCanvasStyleFont(ctx, this.font);

                        this.space_width = ctx.measureText(" ").width;

                        this.restoreCanvasNode({
                    node: node, ctx: ctx });
                }                
            };

            _pTextInfoCacheManager.getWordTextWidth = function (word)
            {
                var letterspacing = this.letterspacing;
                var text_width = this.cache[word + " " + letterspacing];
                if (text_width == null)
                {
                    if (letterspacing)
                    {
                        var textnode = this.getNowrapTextNode();

                        // Set Text
                        try
                        {
                            nexacro.__setDOMNode_SinglelineText(textnode, word);
                            if (letterspacing)
                                nexacro.__setDOMStyle_LetterSpacing(textnode.style, letterspacing);
                        }
                        catch (e)
                        {
                        }
                        text_width = textnode.clientWidth;
                        this.restoreNowrapTextNode(textnode);
                    }
                    else
                    {
                        var canvasinfo = this.getCanvasNode();
                        text_width = canvasinfo.ctx.measureText(word).width;
                        this.restoreCanvasNode(canvasinfo);
                    }
                    this.cache[word + " " + letterspacing] = text_width;
                }
                return text_width;
            };
        }

        _pTextInfoCacheManager.restoreNowrapTextNode = function (node)
        {
            this.nowrapnode_arr.push(node);
        };

        _pTextInfoCacheManager.getNowrapTextNode = function ()
        {
            var node = this.nowrapnode_arr.pop();
            if (node == null)
            {
                var _doc = nexacro._managerFrameDoc;
                node = _doc.createElement("div");
                node.id = "calculate_text_" + nexacro._TextCacheNodeCnt;

                var node_style = node.style;
                node_style.position = "absolute";
                node_style.height = "auto";
                node_style.width = "auto";
                node_style.left = "0px";
                node_style.top = "0px";
                node_style.visibility = "hidden";
                this._setStyleFont(node_style, this.font);
                var letterspacing = this.letterspacing;
                if (letterspacing)
                    nexacro.__setDOMStyle_LetterSpacingObject(node_style, letterspacing);

                var wordspacing = this.wordspacing;
                if (wordspacing)
                    nexacro.__setDOMStyle_WordSpacingObject(node_style, wordspacing);

                var lineheight = this.lineheight;
                if (lineheight)
                    nexacro.__setDOMStyle_LineHeightObject(node_style, lineheight);

                _doc.body.appendChild(node);
                nexacro._TextCacheNodeCnt++;
            }

            return node;
        };

        _pTextInfoCacheManager.getWordwrapTextNode = function (width, wordwrap, wordspacing, letterspacing, lineheight)
        {
            var node = this.wordwrapnode;
            if (node == null)
            {
                var _doc = nexacro._managerFrameDoc;
                node = _doc.createElement("div");
                node.id = "calculate_wraptext_" + nexacro._TextCacheNodeCnt;

                var node_style = node.style;
                node_style.position = "absolute";
                node_style.height = "auto";
                node_style.width = width + "px";
                node_style.left = "0px";
                node_style.top = "0px";
                node_style.visibility = "hidden";
                this._setStyleFont(node_style, this.font);
                var wordspacing = wordspacing || this.wordspacing;
                if (wordspacing)
                    nexacro.__setDOMStyle_WordSpacingObject(node_style, wordspacing);
                var letterspacing = letterspacing || this.letterspacing;
                if (letterspacing)
                    nexacro.__setDOMStyle_LetterSpacingObject(node_style, letterspacing);

                var lineheight = lineheight | this.lineheight;
                if (lineheight)
                    nexacro.__setDOMStyle_LineHeightObject(node_style, lineheight);

                if (wordwrap === undefined || wordwrap === true || wordwrap == "true")
                    wordwrap = "char";
                else if (wordwrap === false || wordwrap == "false")
                    wordwrap = "none";

                nexacro.__setDOMStyle_WordWrap(node_style, wordwrap);

                _doc.body.appendChild(node);
                nexacro._TextCacheNodeCnt++;

                this.wordwrapnode = node;
            }
            else
            {
                node.style.width = width + "px";
            }

            return node;
        };

        _pTextInfoCacheManager.getWordWrapTextSize = function (text, width, wordwrap, wordspace, letterspace, lineheight)
        {
            var strw = text + "#width" + width;
            var strh = strw + "#height";

            var text_width = this.cache[strw];
            var text_height = this.cache[strh];
            if (text_width == null)
            {
                var textnode = this.getWordwrapTextNode(width, wordwrap, wordspace, letterspace, lineheight);

                // Set Text
                try
                {
                    nexacro.__setDOMNode_MultilineText(textnode, text);
                }
                catch (e)
                {
                }
                text_width = textnode.clientWidth;
                text_height = textnode.clientHeight;
                this.cache[strw] = text_width;
                this.cache[strh] = text_height;

                nexacro.__setDOMNode_MultilineText(textnode, "");
            }
            return [text_width, text_height];
        };

        _pTextInfoCacheManager.getTextAreaWordwrapTextNode = function (width, wordwrap)
        {
            var node = this.TextAreaWordwrapnode;
            if (node == null)
            {
                var _doc = nexacro._managerFrameDoc;
                node = _doc.createElement("textarea");
                node.id = "calculate_wraptext_" + nexacro._TextCacheNodeCnt;

                var node_style = node.style;
                node_style.position = "absolute";
                node_style.overflow = "hidden";
                node_style.height = "1px";
                node_style.width = width + "px";
                node_style.left = "0px";
                node_style.top = "0px";
                node_style.visibility = "hidden";
                node_style.disabled = "true";
                this._setStyleFont(node_style, this.font);

                if (wordwrap == undefined || wordwrap == true || wordwrap == "true")
                    wordwrap = "char";
                else if (wordwrap == false || wordwrap == "false")
                    wordwrap = "none";

                nexacro.__setTextAreaDOMNodeWordWrap(node, wordwrap);

                _doc.body.appendChild(node);
                nexacro._TextCacheNodeCnt++;

                this.TextAreaWordwrapnode = node;
            }
            else
            {
                node.style.width = width + "px";
                nexacro.__setTextAreaDOMNodeWordWrap(node, wordwrap);
            }

            return node;
        };

        _pTextInfoCacheManager.getTextAreaWordwrapTextSize = function (text, width, wordwrap)
        {
            var bcache = true;
            if (text.length > 1024) bcache = false;

            var strw, strh, text_width, text_height;
            if (bcache)
            {
                strw = text + "#prewidth" + width;
                strh = strw + "#preheight";

                text_width = this.cache[strw];
                text_height = this.cache[strh];
            }

            if (text_width == null)
            {
                var textnode = this.getTextAreaWordwrapTextNode(width, wordwrap);

                // Set Text
                try
                {
                    nexacro.__setTextAreaDOMNodeText(textnode, text);
                }
                catch (e)
                {
                }
                text_width = textnode.scrollWidth;
                text_height = textnode.scrollHeight;

                if (bcache)
                {
                    this.cache[strw] = text_width;
                    this.cache[strh] = text_height;
                }

                nexacro.__setTextAreaDOMNodeText(textnode, "");
            }
            return [text_width, text_height];
        };

        if (nexacro._Browser == "IE")
        {
            _pTextInfoCacheManager._setStyleFont = function (node_style, font)
            {
                /*
	            if (font._bold)
	            {
	                node_style.fontWeight = "bold";
	            }
	            else
	            {
                    node_style.fontWeight = "normal";
	            }

	            if (font._italic)
	            {
	                node_style.fontStyle = "italic";
	            }
	            else
	            {
                    node_style.fontStyle = "normal";
	            }

	            node_style.fontFamily = font.face;
	            node_style.fontSize = font.size >= 0 ? font.size + "pt" : Math.abs(font.size) + "px";
                */
                node_style.font = font.value;
            };
        }
        else
        {
            _pTextInfoCacheManager._setStyleFont = function (node_style, font)
            {
                node_style.font = font._sysvalue;
            };
        }

        _pTextInfoCacheManager._setCanvasStyleFont = function (node_style, font)
        {
            node_style.font = font._sysvalue;
        };


        //==============================================================================
        nexacro._TextSizeCacheManagers = {};

        (function ()
        {
            // for RegExpcahe : use closure
            var re_newline = /\r\n|\n|\r/;
            var re_space = /\s/;

            nexacro.__getSinglelineTextSize = function (manager, text)
            {
                var words = text.split(re_space);
                var wcnt = words.length;
                var text_size = 0;
                for (var i = 0; i < wcnt; i++)
                {
                    var word = words[i];
                    if (word)
                    {
                        text_size += manager.getWordTextWidth(word);
                    }
                }
                text_size += (wcnt - 1) * manager.space_width;
                return text_size;
            };
                        

            nexacro._getSinglelineTextSize = function (manager, text)
            {
                var text_width = nexacro.__getSinglelineTextSize(manager, text.replace(/\r\n|\n|\r/, ' '));
                return [text_width, manager.font_height];
            };          

            nexacro._getMultilineTextSize = function (manager, text, wordspace, letterspace, lineheight)
            {
                var lines = text.split(re_newline);
                var lcnt = lines.length;
                var text_width = 0;
                for (var i = 0; i < lcnt; i++)
                {
                    var line_width = nexacro.__getSinglelineTextSize(manager, lines[i]);
                    if (line_width > text_width)
                        text_width = line_width;
                }
                return [text_width, manager.font_height * lcnt];
            };

            /* html에서는 캐릭터 단위임. 14/07/29 cmc
		    nexacro._getWordwrapTextSize = function (manager, text, content_width)
		    {
			    var lines = text.split(re_newline);
			    var lcnt = lines.length;
			    var line_cnt = lcnt;
			    var text_size = [0, 0];
			    var space_width = manager.getWordTextWidth(" ");

			    for (var i = 0; i < lcnt; i++)
			    {
				    var line = lines[i];
				    if (line)
				    {
					    var cur_size = nexacro._getSinglelineTextSize(manager, line);
					    if (cur_size[0] > content_width) // overflow
					    {
						    var words = line.split(re_space);
						    var wcnt = words.length;
						    var start = true;
						    var word_width = 0;
						    var temp_content_width = content_width - (space_width * (wcnt - 1));

						    var remain_space = temp_content_width;

						    for (var j = 0; j < wcnt; j++)
						    {
							    var word = words[j];
							    if (start)
							    {
								    if (!word) continue;
							    }
							    else
							    {
							        remain_space -= manager.space_width;
								    if (remain_space <= 0)
								    {
								        remain_space = temp_content_width;
									    line_cnt++;
									    start = true;
									    if (!word) continue;
								    }
							    }

							    word_width = manager.getWordTextWidth(word);
							    if (word_width > remain_space) // overflow
							    {
							        var ccnt = word.length;
							        for (var k = 0; k < ccnt; k++)
							        {
							            var char_width = manager.getWordTextWidth(word.charAt(k));
							            if (char_width > remain_space)
							            {
							                line_cnt++;
							                remain_space = temp_content_width - char_width;
							            }
							            else
							            {
							                remain_space -= char_width;
							            }
							        }
							        remain_space = temp_content_width;
							    }
							    else
							    {
							        remain_space -= word_width;
							    }
						    }
					    }
				    }
				    text_size = [content_width, manager.font_height * line_cnt];

				    manager.restoreNode(manager.getNode());
			    }
			    return text_size;
		    };*/

            nexacro._getWordwrapTextSize = function (manager, text, content_width, wordwrap)//, wordspace, letterspace, lineheight)
            {
                var text_size = manager.getWordWrapTextSize(text, content_width, wordwrap);//, wordspace, letterspace, lineheight);
                return text_size;
            };

            // tab(\t) preserved
            nexacro._getTextAreaWordwrapTextSize = function (manager, text, content_width, wordwrap)
            {
                var text_size = manager.getTextAreaWordwrapTextSize(text, content_width, wordwrap);
                return text_size;
            };
        })();

        nexacro._getFontHeight = function (font)
        {
            var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
            if (cacheManager == null)
            {
                cacheManager = new nexacro._TextInfoCacheManager(font);
                nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
            }
            return cacheManager.font_height;
        };

        nexacro._getTextSize = function (text, font, multiline, content_width, wordwrap, wordspacing, letterspacing, lineheight)
        {
            if (text && text.length > 0 && font && font._sysvalue)
            {
                wordspacing = wordspacing ? wordspacing : "";
                letterspacing = letterspacing ? letterspacing : "";
                lineheight = lineheight ? lineheight : "";

                var fontvalue = font._sysvalue + " " + wordspacing + letterspacing + lineheight;
                fontvalue = fontvalue.trim();
                var cacheManager = nexacro._TextSizeCacheManagers[fontvalue];
                if (cacheManager == null)
                {
                    cacheManager = new nexacro._TextInfoCacheManager(font, wordspacing, letterspacing, lineheight);
                    nexacro._TextSizeCacheManagers[fontvalue] = cacheManager;
                }

                //check multiline
                if (multiline === undefined)
                {
                    var newline = /(\r\n|\n|\r)/.exec(text);
                    if (newline)
                    {
                        multiline = true;
                    }
                }

                if (multiline)
                {
                    if (content_width != null)
                    {
                        return nexacro._getWordwrapTextSize(cacheManager, text, content_width, wordwrap, wordspacing, letterspacing, lineheight);
                    }
                    else
                    {
                        return nexacro._getMultilineTextSize(cacheManager, text); //, wordspace, letterspace, lineheight);
                    }
                }
                else
                {
                    return nexacro._getSinglelineTextSize(cacheManager, text); //, wordspace, letterspace, lineheight);
                }
            }
            return [0, 0];
        };
       
        nexacro.getTextSize = function (text, font, width, wordwrap, wordspacing, letterspacing, lineheight)
        {
            if (typeof (wordwrap) == "string")
                wordwrap = wordwrap.toLowerCase();

            if (wordwrap === true || wordwrap == "true")
                wordwrap = "char";
            else if (wordwrap === false || wordwrap == "false" || wordwrap == undefined)
                wordwrap = "none";

            var line = true;

            if (wordwrap == "none")
                line = false;
            else if (wordwrap == "line")
                wordwrap = null;

            var retn = nexacro._getTextSize(text, font, line, width, wordwrap, wordspacing, letterspacing, lineheight);
            var obj = { nx: retn[0], ny: retn[1] };

            return obj;
        };

        nexacro._getTextBaseline = function (textBaseline, y, h)
        {
            //canvas._textBaseline --------- 0 = alphabetic, 1 = hanging, 2 = top, 3 = bottom, 4 = middle
            var cony = y;
            var s = h / 7; // seven is magic number
            if (textBaseline == 3) // bottom
                cony -= h / 3 - s;
            else if (textBaseline == 2) //top
                cony += h / 2;
            else if (textBaseline === 0) //alphabetic
                cony = y - h / 3 + s;
            else if (textBaseline == 1) //hanging
                cony = y + h / 2 + s;
            return cony;
        };
        nexacro._getLineCountWithWordwrap = function (elem, text, wordwrap)
        {
            var gap = (parseInt(elem.handle.style.paddingLeft) | 0) + (parseInt(elem.handle.style.paddingRight) | 0);
            var content_width = parseInt(elem.width) - gap - 2;	// textarea가 기본으로 좌우 패딩 1씩 갖고 있으므로 여기서 빼줌.

            var cacheManager = nexacro._TextSizeCacheManagers[elem.font._sysvalue];
            if (cacheManager == null)
            {
                cacheManager = new nexacro._TextInfoCacheManager(elem.font);
                nexacro._TextSizeCacheManagers[elem.font._sysvalue] = cacheManager;
            }

            var text_size = nexacro._getWordwrapTextSize(cacheManager, text, content_width, wordwrap);
            var linecount = Math.round(text_size[1] / cacheManager.font_height);
            return Math.max(linecount, 1);
        };

        nexacro._getDOMNodeLineCountWithWordwrap = function (node, text, wordwrap, font)
        {
            if (font == null)
                return 1;

            var content_width = parseInt(node.clientWidth);

            var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
            if (cacheManager == null)
            {
                cacheManager = new nexacro._TextInfoCacheManager(font);
                nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
            }

            var text_size = nexacro._getWordwrapTextSize(cacheManager, text, content_width, wordwrap);
            var linecount = Math.round(text_size[1] / cacheManager.font_height);
            return linecount;
        };

        /* 현재 사용 안하여 주석처리 14/10/07 cmc
	    nexacro._getLineCountWithWordwrap2 = function (font, text, contents_width, wordwrap)
	    {
		    var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
		    if (cacheManager == null)
		    {
			    cacheManager = new nexacro._TextInfoCacheManager(elem.font);
			    nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
		    }

		    var text_size = nexacro._getWordwrapTextSize(cacheManager, text, content_width, wordwrap);
		    var linecount = Math.round(text_size[1] / cacheManager.font_height);
		    return linecount;
	    };
        */

        //------------------------------------------------------------------------------

        //==============================================================================
        nexacro._ImgInfoCacheManager =
	    {
	        cnt: 0,
	        ready: [],
	        loadinglist: {},
	        get_imgnode: function (img_url)
	        {
	            var node = this.find_imgnode(img_url);
	            if (node == null)
	            {
	                var _doc = nexacro._managerFrameDoc;
	                node = _doc.createElement("img");
	                node.id = "calculate_img_" + this.cnt;
	                nexacro.__setDOMNode_Alt(node, "");
	                //-------------------------------------------------------------
	                // 큰 이미지가 iframe안의 body에 바로 붙게될경우 iframe 밖의 body 스크롤에 영향을 미침 (iOS)
	                if (nexacro._allow_default_pinchzoom)
	                {
	                    var imgcontainer = _doc.getElementById("calculate_img_container");
	                    if (!imgcontainer)
	                    {
	                        imgcontainer = _doc.createElement("div");
	                        imgcontainer.id = "calculate_img_container";
	                        imgcontainer.style.position = 'absolute';
	                        imgcontainer.style.overflow = 'hidden';
	                        imgcontainer.style.width = "1px";
	                        imgcontainer.style.height = "1px";
	                        _doc.body.appendChild(imgcontainer);
	                    }
	                    imgcontainer.appendChild(node);
	                }
	                else
	                    _doc.body.appendChild(node);
	                this.cnt++;
	            }
	            return node;
	        },
	        restore_imgnode: function (node)
	        {
	            //for reducing the use of memory, but IE10 has a problem that image is broken	
	            if (!node._keep && !(nexacro._Browser == "Edge" || nexacro._Browser == "IE" && nexacro._BrowserVersion >= 10))
	            {
	                var src = node.getAttributeNode("src");
	                if (src)
	                    node.removeAttributeNode(src);
	            }
                this.ready.push(node);
	        },
	        find_imgnode: function (img_url)
	        {
	            for (var i = 0, objs = this.ready, len = objs.length; i < len; i++)
	            {
	                var obj = objs[i];
	                if (obj.src == img_url)
	                    return obj;
	            }
	        },
	        clear_imgnode: function ()
	        {
	            var _doc = nexacro._managerFrameDoc;
	            var node = null;
	            while (this.ready.length > 0)
	            {
	                node = this.ready.pop();
	                nexacro.__removeDOMNode(_doc.body, node);
	                node = null;
	            }
	            this.ready = null;
	        }
	    };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 9)
        {
            nexacro._bind_imgloadhandler_onload_recall = function (node)
            {
                return function ()
                {
                    if (node)
                    {
                        nexacro._imgloadhandler_onload(node);
                    }
                };
            };
        }

        nexacro._imgloadhandler_onload = function (node)
        {
            var img_url = node._cacheurl;
            node._cacheurl = null;

            var width = node.width;
            var height = node.height;

            //set to Cache & remove loadinglist
            nexacro._ImgInfoCacheList[img_url] = { width: width, height: height };
            delete nexacro._ImgInfoCacheManager.loadinglist[img_url];

            nexacro._stopSysObserving(node, "load", "onload", nexacro._imgloadhandler_onload_forward);
            nexacro._stopSysObserving(node, "error", "onerror", nexacro._imgloadhandler_onerror_forward);

            if (node._callbackList)
            {
                var callbacklist = node._callbackList;
                var cnt = callbacklist.length;
                for (var i = 0; i < cnt; i++)
                {
                    callbacklist[i].callback.call(callbacklist[i].target, img_url, width, height);
                    callbacklist[i].target = null;
                }
                node._callbackList = null;
            }
            nexacro._ImgInfoCacheManager.restore_imgnode(node);
        };

        nexacro._imgloadhandler_onerror = function (node)
        {
            var img_url = node._cacheurl;
            delete node._cacheurl;
            node._cacheurl = null;

            // set to Cache
            nexacro._ImgInfoCacheList[img_url] = { width: 0, height: 0 };
            delete nexacro._ImgInfoCacheManager.loadinglist[img_url];

            nexacro._stopSysObserving(node, "load", "onload", nexacro._imgloadhandler_onload_forward);
            nexacro._stopSysObserving(node, "error", "onerror", nexacro._imgloadhandler_onerror_forward);

            if (node._callbackList)
            {
                var callbacklist = node._callbackList;
                var cnt = callbacklist.length;
                for (var i = 0; i < cnt; i++)
                {
                    callbacklist[i].callback.call(callbacklist[i].target, img_url, 0, 0, node, -1);
                }
                delete node._callbackList;
                node._callbackList = null;
            }
            nexacro._ImgInfoCacheManager.restore_imgnode(node);
        };

        nexacro._getImageSize = function (src, callbackFn, pThis, base_url)
        {
            if (!src) return null;
            if (src.substring(0, 4).toLowerCase() == "url(")
            {
                src = src.substring(5, src.length - 2);
            }

            if (!src)
            {
                return null;
            }

            var img_url = src;
            var retval = nexacro._ImgInfoCacheList[img_url];
            if (retval)
            {
                return retval;
            }

            if (img_url.substring(0, 17) == "data:image;base64")
            {
                var frontStr = img_url.substr(0, 10);
                var rearStr = img_url.substr(10, img_url.length - 1);
                if (nexacro._Browser == "Chrome")
                {
                    img_url = frontStr + "/*" + rearStr;
                }
            }
            else
            {
                img_url = nexacro._getImageLocation(src, base_url);
            }

            retval = nexacro._ImgInfoCacheList[img_url];
            if (retval)
            {
                return retval;
            }

            if (img_url)
            {
                var imgnode = nexacro._ImgInfoCacheManager.loadinglist[img_url];
                if (imgnode)
                {
                    imgnode._callbackList.push({ target: pThis, callback: callbackFn });
                }
                else
                {
                    imgnode = nexacro._ImgInfoCacheManager.get_imgnode("");
                    nexacro._ImgInfoCacheManager.loadinglist[img_url] = imgnode;
                    imgnode._callbackList = [{ target: pThis, callback: callbackFn }];
                    imgnode._cacheurl = img_url;
                    nexacro._observeSysEvent(imgnode, "load", "onload", nexacro._imgloadhandler_onload_forward);
                    nexacro._observeSysEvent(imgnode, "error", "onerror", nexacro._imgloadhandler_onerror_forward);
                    imgnode.src = img_url;
                }
                retval = nexacro._ImgInfoCacheList[img_url];

                //imgnode = null;

            }
            return retval ? retval : null;
        };

        nexacro._getImageObject = function (src, callbackFn, pThis, base_url)
        {
            if (src.substring(0, 4).toLowerCase() == "url(")
            {
                src = src.substring(5, src.length - 2);
            }

            if (!src)
                return null;


            var img_url = nexacro._getImageLocation(src, base_url);

            if (img_url)
            {
                var retval = nexacro._ImgInfoCacheList[img_url];

                var imgnode = nexacro._ImgInfoCacheManager.loadinglist[img_url];
                if (imgnode)
                {
                    imgnode._keep = true;
                    imgnode._callbackList.push({ target: pThis, callback: callbackFn });
                    var retval = nexacro._ImgInfoCacheList[img_url];
                    if (retval) nexacro._imgloadhandler_onload_forward(imgnode);
                }
                else
                {
                    //keep setting
                    imgnode = nexacro._ImgInfoCacheManager.get_imgnode(img_url);
                    imgnode._keep = true;
                    var imagesize = nexacro._ImgInfoCacheList[img_url];
                    if (imagesize)
                    {
                        imgnode.src = img_url;
                        callbackFn.call(pThis, img_url, imagesize.width, imagesize.height, imgnode);
                    }
                    else
                    {
                        nexacro._ImgInfoCacheManager.loadinglist[img_url] = imgnode;
                        imgnode._callbackList = [{ target: pThis, callback: callbackFn }];
                        imgnode._cacheurl = img_url;
                        nexacro._observeSysEvent(imgnode, "load", "onload", nexacro._imgloadhandler_onload_forward);
                        nexacro._observeSysEvent(imgnode, "error", "onerror", nexacro._imgloadhandler_onerror_forward);
                        imgnode.src = img_url;
                    }

                }
                return imgnode;
            }

            return null;
        };



        // FileUpload용 IFrame
        // 생성 , 소멸 , item 추가 , 삭제
        nexacro._IframeManager =
	    {
	        formlist: [],
	        create_form: function (name, iframe_id, pThis)
	        {
	            var _doc = nexacro._managerFrameDoc;
	            var node = _doc.createElement("FORM");
	            node.id = name;
	            node.name = name;
	            node.enctype = "multipart/form-data";
	            node.encoding = "multipart/form-data";
	            node.method = "post";
	            node.target = iframe_id;

	            var uploadiframe;
	            if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
	            {
	                uploadiframe = _doc.createElement("<IFRAME name='" + node.target + "'/>");
	            }
	            else
	            {
	                uploadiframe = _doc.createElement("IFRAME");
	                uploadiframe.name = node.target;
	            }
	            uploadiframe.id = node.target;

	            nexacro.__setDOMNode_Title(uploadiframe, "");

	            var inputlist = [];

	            nexacro._observeSysEvent(uploadiframe, "load", "onload", nexacro._fileinputhandler_onload_forward);
	            this.formlist.push({ form: node, inputlist: inputlist, uploadiframe: uploadiframe });

	            node.appendChild(uploadiframe);
	            _doc.body.appendChild(node);
	            return uploadiframe;
	        },
	        search_form: function (form_id)
	        {
	            var form = null;
	            for (var i = 0; i < this.formlist.length; i++)
	            {
	                if (this.formlist[i].form.id == form_id)
	                {
	                    form = this.formlist[i].form;
	                    return { idx: i, node: form };
	                }
	            }
	            return form;
	        },
	        search_iframe: function (form_target)
	        {
	            var iframe = null;
	            for (var i = 0; i < this.formlist.length; i++)
	            {
	                if (this.formlist[i].uploadiframe.id == form_target)
	                {
	                    iframe = this.formlist[i].uploadiframe;
	                    return { idx: i, node: iframe };
	                }
	            }
	            return iframe;
	        },
	        search_input: function (form, input_id)
	        {
	            var input = null;
	            var idx = 0;

	            for (var j = 0; j < form.node.length; j++)
	            {
	                if (form.node[j].name == input_id)
	                {
	                    input = form.node[j];
	                    return { idx: j, node: input };
	                }
	            }
	            return input;
	        },

	        get_node: function (id)
	        {
	            var form = this.search_form(id);
	            var iframe = this.search_iframe(form.node.target);
	            return iframe.node.contentWindow.document;
	        },
	        get_doc: function (node)
	        {
	            var xmlDoc = node;
	            if (node.XMLDocument)
	            {
	                xmlDoc = node.XMLDocument;
	            }
	            return xmlDoc;
	        }
	    };

        nexacro._getXMLDocument = function (id)
        {
            var manager = nexacro._IframeManager;
            var node = null, xmldoc = null;
            if (manager)
            {
                var node = manager.get_node(id);
                if (node)
                {
                    xmldoc = manager.get_doc(node);
                }
            }
            return xmldoc;
        };
        if (nexacro._Browser == "IE")
        {
            nexacro._findclick = function (comp_name, item_comp_name, item_comp)
            {
                if (item_comp._isPopupFrame())
                {
                    item_comp._getWindow().handle._inputDOM_nodeClick(item_comp._input_node);
                }
                else
                {
                    var manager = nexacro._IframeManager;
                    if (manager)
                    {
                        var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
                        if (input)
                            input.node.click();
                    }
                }
            };
        }
        else
        {
            nexacro._findclick = function (comp_name, item_comp_name, item_comp)
            {
                var manager = nexacro._IframeManager;
                if (manager)
                {
                    var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
                    if (input)
                        input.node.click();
                }
            };
        }

        nexacro._file_changed = nexacro._emptyFn;

        nexacro._setMultipleFile = function (comp_name, item_comp_name, flag)
        {
            var manager = nexacro._IframeManager;
            if (manager)
            {
                var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
                if (input)
                    input.node.multiple = flag;
            }
        };

        nexacro._randomId = function (_window)
        {
            var rid = "";
            var doc = nexacro._getWindowDocumentHandle(_window.handle);
            do
            {
                rid = Math.random().toString().substr(2, 30);
            }
            while (doc.getElementById(rid));
            return rid;
        };

        nexacro._get_hidden_frame = function (form_id)
        {
            var manager = nexacro._IframeManager;
            return manager.search_form(form_id);
        };

        nexacro._create_hidden_frame = function (name, iframe_id, callback_fn, pThis)
        {
            var iframe = nexacro._IframeManager.create_form(name, iframe_id, pThis);
            iframe._callbackList = [{ target: pThis, callback: callback_fn }];
        };

        nexacro._destroy_hidden_frame = function (form_id, pThis)
        {
            var _doc = nexacro._managerFrameDoc;
            var manager = nexacro._IframeManager;
            var form = manager.search_form(form_id);
            var inputlist = manager.formlist[form.idx].inputlist;

            var inputnode = null;
            if (form && form.node)
            {
                while (inputlist.length > 0)
                {
                    inputnode = inputlist.pop();
                    delete inputnode._callbackList;
                    inputnode._callbackList = null;
                    nexacro.__removeDOMNode(form.node, inputnode);
                    inputnode = null;
                }
                var ret_iframe = manager.formlist[form.idx].uploadiframe;
                if (ret_iframe)
                {
                    nexacro._stopSysObserving(ret_iframe, "load", "onload", nexacro._fileinputhandler_onload_forward);
                    delete ret_iframe._callbackList;
                    ret_iframe._callbackList = null;
                    nexacro.__removeDOMNode(form.node, ret_iframe);
                    ret_iframe = null;
                }
                nexacro.__removeDOMNode(_doc.body, form.node);
                manager.formlist.splice(form.idx, 1);
                form.node = null;
            }
        };

        nexacro._create_filedownload_handle = nexacro._emptyFn;
        nexacro._destroy_filedownload_handle = nexacro._emptyFn;

        nexacro._getDataFromDOM = function (doc)
        {
            return doc.body.innerHTML;
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro._download = function (url) //  window is closed  when file(office2007 type) opened in ie7~8
            {
                var index = url.lastIndexOf(".");
                var extension;
                if (index > 0)
                {
                    extension = url.substr(index + 1);
                    if (extension == "xlsx")
                    {
                        window.location.href = url;
                        return;
                    }
                }
                window.open(url);
            };
        }
        else if (nexacro._Browser == "Safari")
        {
            nexacro._download = function (url)
            {
                download = window.open('');
                download.location = url;
                download.setTimeout('window.close();', 500);
            };
        }
        else if (nexacro._Browser == "MobileSafari" && nexacro._OS == "iOS")
        {
            nexacro._download = function (url)
            {
				if (nexacro._isHybrid())
				{
                    var params = '{"url":"' + url + '"}';
                    var jsonstr = '{"id":"", "div":"Browser", "method":"execBrowser", "params":' + params + '}';

					nexacro.Device.exec(jsonstr);
				}
				else
				{
				    var bChange = false;

				    var version_arr = nexacro._OSVersion.split(".");
				    var major_version = version_arr[0];
				    var minor_version = version_arr[1];
				    var third_version = version_arr.length == 3 ? version_arr[2] : null;

				    if (major_version >= 8 && minor_version >= 1)
				    {
				        if (minor_version == 1)
				        {
				            if (third_version && third_version >= 3)
				            {
				                bChange = true;
				            }
				        }
						else
						{
							bChange = true;
						}
					}

				    if (bChange)
				    {
                        var download = window.open('');
                        setTimeout(function () { download.location = url; }, 1200);
				    }
					else
					{
						window.open(url);
				    }
				}
            };
        }
        else
        {
            nexacro._download = function (url)
            {
                window.open(url);
            };
        }

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 8)
        {
            nexacro._append_hidden_item = function (form_id, input_id, callback_fn, pThis, handle, multiselect)
            {

                var _doc;
                _doc = nexacro._managerFrameDoc;

                var manager = nexacro._IframeManager;
                var form = manager.search_form(form_id);
                var input = null;
                if (form && form.node)
                {
                    var node = form.node;
                    input = _doc.createElement("INPUT");
                    input.type = "file";
                    if (multiselect && nexacro._BrowserVersion > 9)
                    {
                        input.multiple = multiselect;
                    }
                    input.name = input_id;
                    input._callbackList = [{ target: pThis, callback: callback_fn }];
                    manager.formlist[form.idx].inputlist.push(input);

                    node.appendChild(input);
                    nexacro._observeSysEvent(input, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
                }
                pThis._input_node = input;
            };

            nexacro._remove_hidden_item = function (form_id, input_id)
            {
                var manager = nexacro._IframeManager;
                var form = manager.search_form(form_id);
                if (form && form.node)
                {
                    var input = manager.search_input(form, input_id);
                    if (input && input.node)
                    {
                        nexacro._stopSysObserving(input.node, "propertychanage", "onpropertychange", nexacro._fileinputhandler_onchange_forward);
                        nexacro.__removeDOMNode(form.node, input.node);
                        manager.formlist[form.idx].inputlist.splice(input.idx, 1);
                    }
                }
            };
        }
        else
        {
            nexacro._append_hidden_item = function (form_id, input_id, callback_fn, pThis, handle, multiselect)
            {
                var _doc = nexacro._managerFrameDoc;
                var manager = nexacro._IframeManager;
                var form = manager.search_form(form_id);
                var input = null;
                if (form && form.node)
                {
                    var node = form.node;
                    input = _doc.createElement("INPUT");
                    input.type = "file";
                    if (multiselect && nexacro._Browser != "IE")
                    {
                        input.multiple = multiselect;
                    }
                    input.name = input_id;

                    input._callbackList = [{ target: pThis, callback: callback_fn }];
                    manager.formlist[form.idx].inputlist.push(input);

                    node.appendChild(input);
                    nexacro._observeSysEvent(input, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
                }
                pThis._input_node = input;
            };

            nexacro._remove_hidden_item = function (form_id, input_id)
            {
                var manager = nexacro._IframeManager;
                var form = manager.search_form(form_id);
                if (form && form.node)
                {
                    var input = manager.search_input(form, input_id);
                    if (input && input.node)
                    {
                        nexacro._stopSysObserving(input.node, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
                        nexacro.__removeDOMNode(form.node, input.node);
                        manager.formlist[form.idx].inputlist.splice(input.idx, 1);
                    }
                }
            };
        }

        nexacro._submit = function (form_id, action)
        {
            var manager = nexacro._IframeManager;
            var form = manager.search_form(form_id);
            if (form && form.node)
            {
                var node = form.node;
                node.action = action;
                node.submit();
            }
        };

        nexacro._setImportCommand = function (comp_name, item_comp_name, item_comp, handle, value)
        {
            var manager = nexacro._IframeManager;
            if (manager)
            {
                var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
                if (input)
                    input.node.value = value;
                else
                    return false;
            }
            return true;
        };

        nexacro._append_hidden_textitem = function (form_id, input_id)
        {
            var _doc;
            _doc = nexacro._managerFrameDoc;
            var manager = nexacro._IframeManager;
            var form = manager.search_form(form_id);
            var input = null;
            if (form && form.node)
            {
                var node = form.node;
                input = _doc.createElement("INPUT");
                input.type = "text";
                input.name = input_id;

                manager.formlist[form.idx].inputlist.push(input);

                node.appendChild(input);
            }
        };

        nexacro._fileinputhandler_onchange = function (node)
        {
            var value = "";
            var path = "";
            var index = -1;
            var node_value = node.value;
            var files = node.files;
            if (node.multiple)
            {
                var fLen = files.length;
                if (fLen > 0)
                {
                    value = path + files[0].name;
                    for (var j = 1; j < fLen; j++)
                    {
                        value += ", " + path + files[j].name;
                    }
                }
            }
            else
            {
                value = node_value;
            }

            if (node._callbackList)
            {
                var cnt = 0, callbackitem = null;
                var callbacklist = node._callbackList;
                if (callbacklist)
                    cnt = callbacklist.length;
                for (var i = 0; i < cnt; i++)
                {
                    callbackitem = callbacklist[i];
                    callbackitem.callback.call(callbackitem.target, value);
                    if (files)
                    {
                        callbackitem.target._changeFiles(files);
                    }
                }
            }
        };

        nexacro._fileinputhandler_onload = function (node)
        {
            if (node._callbackList)
            {
                var cnt = 0;
                var callbacklist = node._callbackList;
                if (callbacklist)
                    cnt = callbacklist.length;
                for (var i = 0; i < cnt; i++)
                {

                    callbacklist[i].callback.call(callbacklist[i].target, node);
                }
            }
        };

        if (nexacro._Browser == "IE")
        {
            if (nexacro._BrowserVersion <= "8")
            {
                nexacro._fileinputhandler_onchange_forward = function (evt)
                {
                    var target = evt.srcElement;
                    nexacro._fileinputhandler_onchange(target);
                };
            }
            else
            {
                nexacro._fileinputhandler_onchange_forward = function (evt)
                {
                    var target = evt.srcElement;
                    nexacro._fileinputhandler_onchange(target);
                };
            }

            nexacro._fileinputhandler_onload_forward = function (evt)
            {
                var target = evt.srcElement;
                nexacro._fileinputhandler_onload(target);
            };
        }
        else
        {
            nexacro._fileinputhandler_onchange_forward = function (evt)
            {
                var target = evt.target;
                nexacro._fileinputhandler_onchange(target);
            };
            nexacro._fileinputhandler_onload_forward = function (evt)
            {
                var target = evt.target;
                nexacro._fileinputhandler_onload(target);
            };
        }

        //==============================================================================
        // Script Load Utils
        //==============================================================================
        nexacro._filedownload_iframe = null; //  iframe for fileupload

        // __createHttpRequest (html only)
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) //<7 -> <=8    Because speed better than  'XMLHttpRequest' by comnik 20150324
        {
            nexacro.__createHttpRequest = function (win_handle)
            {
                var _ajax = {};
                _ajax._destroy = nexacro._emptyFn;
                _ajax.handle = new nexacro._getXmlParser();
                return _ajax;
            };
        }
        else
        {
            // IE7, IE8, IE9, other
            nexacro.__createHttpRequest = function (win_handle)
            {
                var _ajax = {};
                _ajax._destroy = nexacro._emptyFn;
                if (win_handle)
                    _ajax.handle = new win_handle.XMLHttpRequest();
                else
                    _ajax.handle = new XMLHttpRequest();

                return _ajax;
            };
        }

        nexacro.__createFakeHttpRequest = function (ndatatype, compress)
        {
        	if (nexacro._isHybrid && nexacro._isHybrid())
        	{
        		var _ajax = {};
        		_ajax._destroy = function () { if (this.handle) this.handle.destory(); };
        		_ajax.handle = new nexacro.FakeXMLHttpRequest("FakeXMLHttpRequest", this, ndatatype, compress);
        		return _ajax;
        	}
        	else
        	{
        		return nexacro.__createHttpRequest(win_handle);
        	}
        };

        nexacro.__checkAjaxSuccess = function (ajax)
        {
            var ajax_handle = ajax.handle;
            if (ajax_handle.readyState == 4)
            {
                var statusNum = ajax_handle.status || 200;
                return (statusNum >= 200 && statusNum < 300) ? statusNum : -statusNum;
            }
            ajax_handle = null;
            return 0;
        };
        nexacro.__checkAjaxStatus = function (ajax)
        {
            var ajax_handle = ajax.handle;
            var ajaxstatus = ajax_handle.readyState;
            if (ajaxstatus == 4)
            {
                // File Protocol일땐 안타도록.
                if (ajax._protocol != 2)
                {
                    //chrome, ff
                    if (ajax_handle.status === 0 && ajax_handle.statusText === "")
                    {
                        return 0;
                    }
                }

                var statusNum = ajax_handle.status || 200;
                ajax_handle = null;
                return (statusNum >= 200 && statusNum < 300) ? statusNum : -statusNum;
            }
            else
            {
                ajax_handle = null;
                return ajaxstatus === 0 ? 1 : ajaxstatus;
            }
        };

        //==============================================================================
        nexacro.__httpErrorTable =
	    {
	        301: -0x1004A,
	        302: -0x1004B,
	        305: -0x1004D,
	        307: -0x1004E,
	        400: -0x1003B,
	        401: -0x10042,
	        402: -0x10043,
	        403: -0x10044,
	        404: -0x1003C,
	        405: -0x1003D,
	        406: -0x10045,
	        407: -0x10046,
	        408: -0x10047,
	        500: -0x1003E,
	        503: -0x1003F,
	        499: -0x10040,
	        599: -0x10041,
	        0: 0
	    };

        nexacro.__getHttpErrorCode = function (statuscode)
        {
            var errorcode = this.__httpErrorTable[statuscode];
            if (!errorcode)
            {
                if (statuscode < 500)
                    errorcode = "0x80010040";
                else
                    errorcode = "0x80010041";
            }
            return errorcode;
        };


        nexacro.__bindLoadModuleHandler = function (_ajax, pthis)
        {
            return function ()
            {
            	
                if (!_ajax || !_ajax.handle) return;
                var ajax_handle = _ajax.handle;
                var is_abort = _ajax.aborted;
                var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
                if (status > 0)
                {
                    if (status >= 4)
                    {
                        var cookie = "";
                        if (pthis.context)
                        {
                            if (pthis.context._is_component)
                                cookie = pthis.context._getWindow()._doc.cookie;
                            else
                                cookie = document ? document.cookie : null;

                        }
                        var data = ajax_handle.responseText;
                           var last_modified = ajax_handle.getResponseHeader("Last-Modified");
								
                        pthis.on_load_module(data, cookie, last_modified);
                        _ajax._destroy();
                        _ajax = null;
                        pthis = null;
                    }
                }
                else
                {
                    if (status == -304)     //Not Modified
                    {
                        var cookie = "";
                        if (pthis.context)
                        {
                            if (pthis.context._is_component)
                                cookie = pthis.context._getWindow()._doc.cookie;
                            else
                                cookie = document ? document.cookie : null;
                        }

                        pthis.bcache = false;
                        var m_cache = nexacro._CacheList[pthis.path];
                        pthis.on_load_module(m_cache.data, cookie, m_cache.last_modified);
                    }
                    else
                    {
                        var errcode = nexacro.__getHttpErrorCode(-status);

                        //status : 마이너스값 , errorcode : 에러 테이블코드, returncode : 301.. 505, , locationurl: 301인 경우
                        var locationurl = "";
                        pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
                    }
                    _ajax._destroy();
                    _ajax = null;
                    pthis = null;

                }
                ajax_handle = null;
            };
        };
        nexacro.__bindLoadTextHandler = function (_ajax, pthis)
        {
            return function ()
            {
                if (!_ajax || !_ajax.handle) return;
                var ajax_handle = _ajax.handle;
                var is_abort = _ajax.aborted;
                var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
                if (status > 0)
                {
                    if (status >= 4)
                    {
                        var cookie = "";
                        if (pthis.context)
                        {
                            if (pthis.context._is_component)
                                cookie = pthis.context._getWindow()._doc.cookie;
                            else
                                cookie = document ? document.cookie : null;
                        }
                        var data = ajax_handle.responseText;
                        var last_modified = ajax_handle.getResponseHeader("Last-Modified");
                        pthis.on_load_text(data, cookie, last_modified);
                        _ajax._destroy();
                        _ajax = null;
                        pthis = null;
                    }
                }
                else
                {
                    if (_ajax._user_aborted)
                        pthis.on_error(0, "comm_cancel_byuser");
                    else if (status == -304)     //Not Modified
                    {
                        var cookie = "";
                        if (pthis.context)
                        {
                            if (pthis.context._is_component)
                                cookie = pthis.context._getWindow()._doc.cookie;
                            else
                                cookie = document ? document.cookie : null;
                        }

                        pthis.bcache = false;
                        var m_cache = nexacro._CacheList[pthis.path];
                        pthis.on_load_text(m_cache.data, cookie, m_cache.last_modified);
                    }
                    else
                    {
                        var errcode = nexacro.__getHttpErrorCode(-status);
                        var locationurl = "";
                        pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
                    }
                    _ajax._destroy();
                    _ajax = null;
                    pthis = null;
                }
                ajax_handle = null;
            };
        };
        if (nexacro._Browser == "MobileSafari" || nexacro._Browser == "Safari")
        {
            nexacro.__bindLoadCSSHandler = function (_ajax, pthis)
            {
                if (!_ajax || !_ajax.handle) return;
                if (_ajax.aborted)
                {
                    if (_ajax._user_aborted)
                        pthis.on_error(0, "comm_cancel_byuser");
                }

                var stylesheets = document.styleSheets;
                var stylesheetcnt = stylesheets.length;
                var path = pthis.path.replace("./", "");  //stylesheets[i].href 가 fullpath
                if (_ajax._stylesheetcnt != stylesheetcnt)
                {
                    for (var i = 0; i < stylesheetcnt; i++)
                    {
                        if (stylesheets[i].href && stylesheets[i].href.indexOf(path) >= 0) //
                        {
                            var cssrules = stylesheets[i].cssRules ? stylesheets[i].cssRules : stylesheets[i].rules;
                            if (cssrules.length > 0)
                                pthis.on_load_text("", "", "");
                            else
                                pthis.on_error(-1, "comm_fail_loaddetail", 0, pthis.path);
                            break;
                        }
                    }
                }
                else
                {
                    setTimeout(function () { nexacro.__bindLoadCSSHandler(_ajax, pthis); }, 10);
                }
                return;

            };

        }
        else
        {
            nexacro.__bindLoadCSSHandler = function (_ajax, pthis)
            {
            	return function ()
            	{
            		if (!_ajax || !_ajax.handle) return;
            		if (_ajax.aborted)
            		{
            			if (_ajax._user_aborted)
            				pthis.on_error(0, "comm_cancel_byuser");
            		}

            		pthis.on_load_text("", "", "");
            		return;
            	};
            };
        }



        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        {
            nexacro.__checkloadData = function (xmlstr)
            {
                if (xmlstr)
                {
                    var chkstr = xmlstr.substring(0, 5);
                    if (chkstr.indexOf("xml") >= 0)
                        return true;
                }
                return false;
            };

            nexacro.__bindLoadDataHandler = function (_ajax, pthis)
            {
                return function ()
                {
                    if (!_ajax || !_ajax.handle) return;
                    var ajax_handle = _ajax.handle;
                    var is_abort = _ajax.aborted;
                    var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
                    if (status > 0)
                    {
                        try
                        {
                            if (status >= 4)
                            {
                                var _doc = null;
                                var cookie = "";//_ajax.getResponseHeader ("Set-Cookie");
                                var last_modified = ajax_handle.getResponseHeader("Last-Modified");

                                if (pthis.context)
                                {
                                    if (pthis.context._is_component)
                                        cookie = pthis.context._getWindow()._doc.cookie;
                                    else
                                        cookie = document ? document.cookie : null;
                                }
                                if (pthis._check_responseXML)
                                {
                                    _doc = ajax_handle.responseXML;
                                    if (_doc && _doc.childNodes && _doc.childNodes.length > 0)
                                    {
                                        pthis.on_load_xmldom(_doc, cookie, last_modified);
                                    }
                                    else
                                    {
                                        var data = ajax_handle.responseText;
                                        if (data)
                                        {
                                            pthis.on_load_data(data, cookie, last_modified);
                                        }
                                        else
                                        {
                                            pthis.on_load_data("", cookie, last_modified);
                                        }
                                    }
                                }
                                else
                                {
                                    var data = ajax_handle.responseText;
                                    if (data)
                                    {
                                        pthis.on_load_data(data, cookie, last_modified);
                                    }
                                    else
                                    {
                                        pthis.on_load_data("", cookie, last_modified);
                                    }
                                }

                                _doc = null;
                                _ajax._destroy();
                                _ajax = null;
                                pthis = null;
                            }
                        }
                        catch (e)
                        {
                            var err_code = -1;
                            var err_message = "";
                            var err_type = "comm_fail_unknown";

                            if (e)
                            {
                                err_code = e.number;
                                err_message = e.message;
                            }

                            nexacro.addErrorMessage(system._language, err_type, err_message);

                            pthis.on_error(err_code, err_type, err_code, "");
                            _ajax._destroy();
                            _ajax = null;
                            pthis = null;
                        }
                    }
                    else
                    {
                        if (_ajax._user_aborted)
                            pthis.on_error(0, "comm_cancel_byuser");
                        else
                        {
                            var errcode = nexacro.__getHttpErrorCode(-status);
                            var locationurl = "";
                            pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
                        }
                        _ajax._destroy();
                        _ajax = null;
                        pthis = null;
                    }

                    ajax_handle = null;
                };
            };
        }
        else
        {
            nexacro.__bindLoadDataHandler = function (_ajax, pthis)
            {
                return function ()
                {
                    if (!_ajax || !_ajax.handle) return;
                    var ajax_handle = _ajax.handle;
                    var is_abort = _ajax.aborted;

                    var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
                    if (status > 0)
                    {
                        try
                        {
                            if (status >= 4)
                            {
                                var _doc = null;
                                var cookie = "";
                                var last_modified = ajax_handle.getResponseHeader("Last-Modified");

                                if (pthis.context)
                                {
                                    if (pthis.context._is_component)
                                        cookie = pthis.context._getWindow()._doc.cookie;
                                    else
                                        cookie = document ? document.cookie : null;
                                }
                                var data = ajax_handle.responseText;
                                if (!data) data = "";

                                if (!data && pthis._check_responseXML)
                                {
                                    _doc = ajax_handle.responseXML;
                                    if (_doc)
                                    {
                                        pthis.on_load_xmldom(_doc, cookie, last_modified);
                                    }
                                    else
                                    {
                                        pthis.on_load_data("", cookie, last_modified);
                                    }
                                }
                                else
                                {
                                    pthis.on_load_data(data, cookie, last_modified);
                                }
                                _ajax._destroy();
                                _ajax = null;
                                pthis = null;
                            }
                            else if (status == 3)   // progress data
                            {
                                if (pthis instanceof nexacro.TransactionItem)
                                {
                                    if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 10)
                                        return;

                                    if (pthis._is_unknowntype_data)
                                        return;

                                    if (pthis._progress_data && !pthis._progress_data._needParseForFirstCount())
                                        return;

                                    if (nexacro._Browser == "Edge" || nexacro._Browser == "IE")
                                    {
                                        pthis._progress_cnt++;
                                        if (pthis._progress_cnt > 3 && (pthis._progress_cnt % 30) != 3)  // for performance of IE
                                            return;
                                    }

                                    var data = ajax_handle.responseText;
                                    if (!data) data = "";

                                    pthis.on_progress_data(data, false);
                                }
                            }
                        }
                        catch (e)
                        {
                            var err_code = -1;
                            var err_message = "";
                            var err_type = "comm_fail_unknown";

                            if (e)
                            {
                                err_code = e.number;
                                err_message = e.message;
                            }

                            nexacro.addErrorMessage(system._language, err_type, err_message);

                            pthis.on_error(err_code, err_type, err_code, "");
                            _ajax._destroy();
                            _ajax = null;
                            pthis = null;
                        }
                    }
                    else
                    {
                        if (_ajax._user_aborted)
                            pthis.on_error(0, "comm_cancel_byuser");
                        else
                        {
                            var errcode = nexacro.__getHttpErrorCode(-status);
                            var locationurl = "";
                            pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
                        }
                        _ajax._destroy();
                        _ajax = null;
                        pthis = null;
                    }

                    ajax_handle = null;
                };
            };
        }

        nexacro.__bindLoadUpdateHandler = function (_ajax, pthis)
        {
            return function ()
            {
                if (!_ajax || !_ajax.handle) return;
                var ajax_handle = _ajax.handle;
                var is_abort = _ajax.aborted;
                var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
                if (status > 0)
                {
                    if (status >= 4)
                    {
                        var cookie = "";
                        if (pthis.context)
                        {
                            if (pthis.context._is_component)
                                cookie = pthis.context._getWindow()._doc.cookie;
                            else
                                cookie = document ? document.cookie : null;
                        }

                        var data = ajax_handle.responseText;
                        pthis.on_load_update(data, cookie);
                        _ajax._destroy();
                        _ajax = null;
                        pthis = null;
                    }
                }
                else
                {
                    var errcode = nexacro.__getHttpErrorCode(-status);

                    var locationurl = "";
                    pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
                    _ajax = null;
                    pthis = null;
                }
                _ajax._destroy();
                ajax_handle = null;
            };
        };

        nexacro.__startCommunication = function (loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service)
        {
            var _ajax;
            if (loadItem.type == "data" && (nexacro._isHybrid && nexacro._isHybrid()) && ndatatype == 1)
                _ajax = nexacro.__createFakeHttpRequest(ndatatype, compress);
            else if (loadItem.type == "css")
            {
                _ajax = {};
                _ajax.handle = document.createElement("link");
                _ajax.handle.type = "text/css";
                _ajax.handle.rel = "stylesheet";
            }
            else
                _ajax = nexacro.__createHttpRequest();

            var ajax_handle = _ajax.handle;

            // parse protocol
            if (path.indexOf("://") > -1)
            {
                var ar = path.split("://");
                var protocol = ar[0];
                switch (protocol)
                {
                    case "http": _ajax._protocol = 0; break;
                    case "https": _ajax._protocol = 1; break;
                    case "file": _ajax._protocol = 2; break;
                    default: _ajax._protocol = -1; break;
                }
            }

            var bindfn = null;
            var method = "GET";
            var mime_xml = false;

            if (loadItem.type == "module")
            {
                bindfn = nexacro.__bindLoadModuleHandler(_ajax, loadItem);
            }
            else if (loadItem.type == "data")
            {
                bindfn = nexacro.__bindLoadDataHandler(_ajax, loadItem);
                method = "POST";
                mime_xml = true;
                path = encodeURI(path);
            }
            else if (loadItem.type == "text")
            {
                bindfn = nexacro.__bindLoadTextHandler(_ajax, loadItem);
            }
            else if (loadItem.type == "css")
            {
                ajax_handle.href = path;
                _ajax._href = path;
                _ajax._stylesheetcnt = document.styleSheets.length;
                var headnode = document.getElementsByTagName('head')[0];
                headnode.appendChild(ajax_handle);
                bindfn = nexacro.__bindLoadCSSHandler(_ajax, loadItem);
                ajax_handle.onload = bindfn;
                return _ajax;
            }
            else  //for update
            {
                bindfn = nexacro.__bindLoadUpdateHandler(_ajax, loadItem);
            }

            if (async)
                ajax_handle.onreadystatechange = bindfn;

            try
            {
                ajax_handle.open(method, path, !!async);
            }
            catch (e)
            {
                loadItem.on_error(e.number, "comm_fail_loaddetail", e.number);
                _ajax = null;
                return null;
            }

            if (mime_xml)
            {
                ajax_handle.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                ajax_handle.setRequestHeader("Accept", "application/xml, text/xml, */*");
                ajax_handle.setRequestHeader("Content-Type", "text/xml");
                //   ajax_handle.setRequestHeader("cache-control", "no-cache");
            }
/*
            var header_vars = _application._header_variables;
            var header_vars_len = header_vars.length;
            if (header_vars_len > 0)
            {
                var header_id, header_value;
                for (var i = 0; i < header_vars_len; i++)
                {
                    header_id = header_vars[i];
                    header_value = _application[header_id];
                    if (header_id && header_value)
                        ajax_handle.setRequestHeader(header_id, header_value);
                }
            }
*/
            if (service)
            {
                if (service.cachelevel == "none")
                {
                    ajax_handle.setRequestHeader("cache-control", "no-cache, no-store");
                    ajax_handle.setRequestHeader("Pragma", "no-cache");
                    ajax_handle.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
                    ajax_handle.setRequestHeader("Expires", -1);
                }
                else
                {
                    ajax_handle.setRequestHeader("cache-control", "no-cache");
                    ajax_handle.setRequestHeader("If-Modified-Since", loadItem.last_modified);
                }
            }

            try
            {
                if (async)
                {
                	// httptimeout property use for only async
					var httptimeout = nexacro._httptimeout;
                	if (ajax_handle.timeout != undefined && httptimeout >= 0 && httptimeout<= 2147483) //no have property from made by activeObject, add check property by comnik 20150324
                        ajax_handle.timeout = httptimeout * 1000;
                }
                ajax_handle.send(senddata ? senddata : null);
                if (!async)
                    bindfn(_ajax, loadItem);
            }
            catch (e)
            {
                if (_ajax._user_aborted)
                    loadItem.on_error(e.number, "comm_stop_transaction_byesc");
                else
                    loadItem.on_error(e.number, "comm_fail_loaddetail", e.number);
                return null;
            }
            ajax_handle = null;
            return _ajax;
        };

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 6)
        {
            nexacro.__cancelCommunication = function (_ajax)
            {
                var ajax_handle = _ajax.handle;
                _ajax.aborted = true;
                ajax_handle.abort();
                ajax_handle = null;
                return false;
            };
        }
        else
        {
            nexacro.__cancelCommunication = function (_ajax)
            {
                var ajax_handle = _ajax.handle;
                _ajax.aborted = true;
                ajax_handle.abort();
                ajax_handle = null;
                return false;
            };
        }

        nexacro._convertDatasetSSVToBIN = function (ssvdata)
        {
            // not use
        };
        nexacro._convertDatasetBINToSSV = function (bindata)
        {
            // not use
        };

        nexacro._convertStreamSSVToBIN = function (ssvdata)
        {
            // not use
        };
        nexacro._convertStreamBINToSSV = function (bindata)
        {
            // not use
        };

        nexacro._completedUpdateResource = nexacro._emptyFn;

        nexacro.__openSystemCalendar = nexacro._emptyFn;
        nexacro.__closeSystemCalendar = nexacro._emptyFn;

        //==============================================================================
        // nexacro._ProgressData
        //==============================================================================
        nexacro._ProgressData = function (parent)
        {
            this._data_buffer = "";  // raw data buffer for runtime
            this._cur_idx = 0;       // index for parsing

            this._received_data_length = 0;
            this._parent = parent;          // parent object (TransactionItem)
            this._rs;                       //record separator
            this._cs;                       //column(unit) separator

            this._data_type = null;               // SSV,CSV,PPX
            this._parse_mode = 0;               //["root","header", "parameters", "dataset", "constcolinfo", "collinfo", "record","JSON_id","JSON_string"]
            this._load_completed = false;       //
            //	    this._ppos = 0;                     // parse position.

            this._parameters = [];
            this._datasets = {};                // buffer of datasets
            this._cur_dataset_id = "";          // id of dataset that it is being processed...

            this._error_info = [0, "SUCCESS"];  // received error information

            this._parsing_min_size = 1024 * 4;      // it's minimum size of parsing ;

            this._init();
        };

        var _pProgressData = nexacro._createPrototype(nexacro.Object, nexacro._ProgressData);
        nexacro._ProgressData.prototype = _pProgressData;

        _pProgressData._init = function ()
        {
            var out_datasets = this._parent.outputDatasets;
            var form = this._parent.context;

            if (out_datasets && out_datasets.length)
            {
                var outDataCnt = out_datasets.length;

                for (var i = 0; i < outDataCnt; i++)
                {
                    var param = out_datasets[i];
                    if (!this._datasets[param.rval])
                    {
                        var ds = form._getDatasetObject(param.lval);
                        if (ds)
                        {
                            this._datasets[param.rval] = {
                                _isEnable: false,
                                _target_ds: ds,
                                _firefirstcount: ds.firefirstcount,
                                _is_loaded: false,
                                _is_loaded_firstcount: (ds.firefirstcount > 0) ? false : true,
                                _is_first_load: true,
                                _useclientlayout: ds.useclientlayout,
                                _viewrecords_length: 0,

                                _next_record_idx: 0,  // next record index for loading

                                _ds_start_idx: -1,
                                _ds_end_idx: -1,

                                _row_start_idx: -1,
                                _firstrow_end_idx: -1,
                                _row_end_idx: -1,

                                _colinfo_start_idx: -1,
                                _colinfo_end_idx: -1
                            };
                        }
                    }
                }
            }
        };

        _pProgressData._applyChange_inputDataset = function ()
        {
            // inputDatasets
            var in_datasets = this._parent.inputDatasets;
            var form = this._parent.context;

            if (in_datasets && in_datasets.length)
            {
                var in_ds_cnt = in_datasets.length;
                for (var i = 0; i < in_ds_cnt; i++)
                {
                    var param = in_datasets[i];
                    var ds = form._getDatasetObject(param.rval);
                    if (ds)
                    {
                        ds.applyChange();
                    }
                }
            }
        };

        _pProgressData._on_progress = function (data, bFinal)
        {
            var received_len = data.length - this._received_data_length;

            if (!bFinal && (received_len < this._parsing_min_size))
            {
                // skip parsing
                return;
            }

            this._received_data_length = data.length;
            var error_cd = this._error_info[0];
            if (error_cd >= 0)
            {
                this._parse(data, bFinal);
            }

        };

        _pProgressData._needParseForFirstCount = function ()
        {
            for (var buff_ds in this._datasets)
            {
                if (!this._datasets[buff_ds]._is_loaded_firstcount)
                    return true;
            }
            return false;
        };

        _pProgressData._appendData = function (data)
        {
            if (!data)
                return;

            if (nexacro._Browser == "Runtime")
            {
                this._data_buffer[this._data_buffer.length] = data;
                this._received_data_length += data.length;
            }

        };

        _pProgressData._parseHeader = function (data)
        {
            var n = -1;
            var rs_len = 0;

            if (this._rs instanceof Array)
            {
                var rss = this._rs;
                var i;
                for (i = 0; i < rss.length; i++)
                {
                    var rs = rss[i];
                    n = data.indexOf(rs, this._cur_idx);
                    if (n >= 0)
                    {
                        rs_len = this._rs[i].length;
                        this._rs = this._rs[i];
                        break;
                    }
                }
            }
            else
            {
                n = data.indexOf(this._rs, this._cur_idx);
                rs_len = this._rs.length;
            }

            if (n >= 0)
                this._cur_idx = n + rs_len;
            else
                return false;

            return true;
        };

        _pProgressData._parseParameters = function (data)
        {
            var line = "";
            var n = -1;
            var rs_len = 0;

            if (this._rs instanceof Array)
            {
                var rss = this._rs;
                var i;
                for (i = 0; i < rss.length; i++)
                {
                    var rs = rss[i];
                    n = data.indexOf(rs, this._cur_idx);
                    if (n >= 0)
                    {
                        rs_len = this._rs[i].length;
                        break;
                    }
                }
            }
            else
            {
                n = data.indexOf(this._rs, this._cur_idx);
                rs_len = this._rs.length;
            }

            if (n >= 0)
            {
                line = data.substring(this._cur_idx, n);
            }
            else
                return false;

            this._cur_idx = n + rs_len;

            var param_arr = line.split(this._cs);
            var param_cnt = param_arr.length;
            var form = this._parent.context;

            for (var i = 0; i < param_cnt; i++)
            {
                var param_str = param_arr[i];
                if (this._data_type == "CSV")
                {
                    if (param_str.charAt(0) == "\"" || param_str.charAt(0) == "\'")
                    {
                        param_str = param_str.substring(1, param_str.length - 1);
                    }
                }
                var varInfo = param_str;
                var val = undefined;
                var sep_pos = param_str.indexOf("=");
                if (sep_pos >= 0)
                {
                    varInfo = param_str.substring(0, sep_pos);
                    val = param_str.substring(sep_pos + 1);
                    if (val == String.fromCharCode(3))
                        val = undefined;
                }

                if (varInfo)
                {
                    var id = varInfo;
                    var sep_pos = varInfo.indexOf(":");
                    if (sep_pos >= 0)
                    {
                        id = varInfo.substring(0, sep_pos);
                    }

                    if (id == "ErrorCode")
                    {
                        var code = parseInt(val) | 0;
                        if (isFinite(code) === false)
                        {
                            val = -1;
                        }
                        else
                        {
                            val = code;
                        }

                        this._error_info[0] = val;
                    }
                    else if (id == "ErrorMsg")
                    {
                        this._error_info[1] = val;
                    }
                    else if (id in form)  //1.form(application) variable
                    {
                        if (typeof (form[id]) != "object")
                        {
                            form[id] = val;
                        }
                    }
                    else //application globalvariable
                    {
						var app = nexacro.getApplication();
	    				if (app && app._existVariable(id))
						{
	    					app[id]= val;
						}
						else
						{
	    					var hasvariable = nexacro._hasEnvironmentVariable(id);
	    					if (hasvariable)
	    						nexacro.setEnvironmentVariable(id, val);
						}
                    }

                    this._parameters[this._parameters.length] = { id: id, value: val };
                }
            }

            if (this._error_info[0] >= 0)
                this._applyChange_inputDataset();

            return true;
        };

        _pProgressData._parseDataset = function (data)
        {
            var line = "";
            var rs_len = 0;
            if (this._rs instanceof Array)
            {
                var rss = this._rs;
                var i;
                for (i = 0; i < rss.length; i++)
                {
                    var rs = rss[i];
                    n = data.indexOf(rs, this._cur_idx);
                    if (n >= 0)
                    {
                        rs_len = this._rs[i].length;
                        break;
                    }
                }
            }
            else
            {
                n = data.indexOf(this._rs, this._cur_idx);
                rs_len = this._rs.length;
            }

            if (n >= 0)
            {
                line = data.substring(this._cur_idx, n);
            }
            else
                return false;

            if (this._cur_dataset_id)
            {
                var cur_buffer_obj = this._datasets[this._cur_dataset_id];
                cur_buffer_obj._row_end_idx = this._cur_idx - rs_len;
            }

            var sep_pos = line.indexOf(":");
            if (sep_pos > 0)
            {
                var remoteId = line.substring(sep_pos + 1);
                if (remoteId && remoteId.length)
                {
                    var buffer_obj = this._datasets[remoteId];
                    if (buffer_obj)
                    {
                        buffer_obj._isEnable = true;
                        this._cur_dataset_id = remoteId;

                        buffer_obj._ds_start_idx = this._cur_idx;
                        buffer_obj._ds_end_idx = this._cur_idx + n;
                    }
                    else
                    {
                        this._cur_dataset_id = "";
                        this._parse_mode = 9;
                    }
                }
            }
            //else skip

            this._cur_idx = n + rs_len;
            return true;
        };

        _pProgressData._parseColInfo = function (data)
        {
            var rs_len = 0;
            if (this._rs instanceof Array)
            {
                var rss = this._rs;
                var i;
                for (i = 0; i < rss.length; i++)
                {
                    var rs = rss[i];
                    n = data.indexOf(rs, this._cur_idx);
                    if (n >= 0)
                    {
                        rs_len = this._rs[i].length;
                        break;
                    }
                }
            }
            else
            {
                n = data.indexOf(this._rs, this._cur_idx);
                rs_len = this._rs.length;
            }


            if (n > 0)
            {
                if (this._cur_dataset_id)
                {
                    var buffer_obj = this._datasets[this._cur_dataset_id];
                    if (buffer_obj._colinfo_start_idx < 0)
                        buffer_obj._colinfo_start_idx = this._cur_idx;

                    buffer_obj._colinfo_end_idx = n;
                }
            }
            else
            {
                this._parse_mode = 3;
                return false;
            }

            this._cur_idx = n + rs_len;

            return true;
        };

        _pProgressData._parseRecord = function (data)
        {
            var n = -1;
            var rs_len = 0;
            if (this._rs instanceof Array)
            {
                var rss = this._rs;
                var i;
                for (i = 0; i < rss.length; i++)
                {
                    var rs = rss[i];
                    n = data.indexOf(rs, this._cur_idx);
                    if (n >= 0)
                    {
                        rs_len = rs.length;
                        break;
                    }

                }
            }
            else
            {
                n = data.indexOf(this._rs, this._cur_idx);
                rs_len = this._rs.length;
            }

            if (n < 0)
                return false;

            var buffer_obj;
            if (this._cur_dataset_id)
            {
                buffer_obj = this._datasets[this._cur_dataset_id];
                var firstcount = buffer_obj._firefirstcount;

                if (buffer_obj._row_start_idx < 0)
                    buffer_obj._row_start_idx = this._cur_idx;

                if (this._data_type == "SSV" || this._data_type == "PPX")
                {
                    var rowtype = data.charAt(this._cur_idx);
                    if (rowtype != "d" || rowtype != "D")
                        buffer_obj._viewrecords_length++;
                }
                else
                    buffer_obj._viewrecords_length++;
            }

            this._cur_idx = n + rs_len;

            if (buffer_obj && buffer_obj._viewrecords_length == firstcount && firstcount > 0)
            {
                buffer_obj._firstrow_end_idx = n;
                return false;
            }

            return true;
        };


        _pProgressData._parse = function (data, bFinal)
        {
            var bLoop = true;
            var pre_parse_mode;
            var rows_buffer, buffer_obj, ds, lines, line_idx;

            while (bLoop)
            {
                pre_parse_mode = this._parse_mode;
                bLoop = this._setNextParseMode(data);
                if (pre_parse_mode == 2 && this._parse_mode != 2) {
                    if (this._error_info[0] < 0) {
                        bLoop = false;
                    }
                }

                if (!bLoop)
                    break;

                switch (this._parse_mode)
                {
                    case 0://root
                        break;
                    case 1://header
                        bLoop = this._parseHeader(data);
                        break;
                    case 2://parameters
                        bLoop = this._parseParameters(data);
                        break;
                    case 3://dataset
                        bLoop = this._parseDataset(data);
                        break;
                    case 4://constcolinfo
                    case 5://collinfo
                        bLoop = this._parseColInfo(data);
                        break;
                    case 6://record
                        bLoop = this._parseRecord(data);

                        if (!bLoop)
                        {
                            var buffer_obj = this._datasets[this._cur_dataset_id];
                            if (buffer_obj && buffer_obj._viewrecords_length == buffer_obj._firefirstcount && !buffer_obj._is_loaded_firstcount)   //check firstrow and do firstrow processing...
                            {
                                this._on_fire_onload(data, buffer_obj, 1);

                                buffer_obj._is_loaded_firstcount = true;
                                bLoop = true;
                            }
                        }
                        break;
                    case 9: //skip
                        break;
                    case 10:                    //on_fire_on_load(0,"",0)
                        var buffer_obj = this._datasets[this._cur_dataset_id];
                        if (!buffer_obj._isEnable)
                            continue;

                        this._on_fire_onload(data, buffer_obj, 0);
                        buffer_obj._is_loaded = true;
                        this._parse_mode = 9;
                        break;
                    default:
                        break;
                }
            }

            if (bFinal)
            {
                // outputDatasets
                for (var val in this._datasets)
                {
                    buffer_obj = this._datasets[val];
                    if (!buffer_obj._isEnable || buffer_obj._is_loaded)
                    {
                        if (!this._parent.bcache)
                            this._datasets[val] = null;
                        continue;
                    }

                    this._on_fire_onload(data, buffer_obj, 0);
                    if (!this._parent.bcache)
                        this._datasets[val] = null;
                }

                this._data_buffer = null;
            }
        };

        _pProgressData._on_fire_onload = function (data, bufferObj, nLoadType)
        {
            var ds = bufferObj._target_ds;
            if (nLoadType == 1)
            {
                var buff = data.slice(bufferObj._colinfo_start_idx, bufferObj._firstrow_end_idx);
            }
            else
            {
                if (bufferObj._row_end_idx < 0)
                    bufferObj._row_end_idx = data.length - 1;
                var buff = data.slice(bufferObj._colinfo_start_idx, bufferObj._row_end_idx);
            }

            var rs = "";
            if (this._rs instanceof Array)
                rs = this._rs.join("|");
            else
                rs = this._rs;

            var lines = buff.split(new RegExp(rs));
            buff = null;

            ds.rowposition = -1;
            switch (this._data_type)
            {
                case "CSV":
                    //_pDataset._loadFromCSVArray2 = function (csvColLine,csvLines,curRowIdx, bOrgLayout, bClear)
                    var colLine = lines[0];
                    lines.splice(0, 1);
                    line_idx = ds._loadFromCSVArray(colLine, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
                    break;
                case "SSV":
                    var colLines = ds._getColLinesFromSSVLines(lines, 0);
                    lines.splice(0, colLines.length);
                    line_idx = ds._loadFromSSVArray(colLines, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
                    break;
                case "PPX":
                    var colLines = ds._getColLinesFromPPXLines(lines, 0);
                    lines.splice(0, colLines.length);
                    line_idx = ds._loadFromPPXArray(colLines, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
                    break;
                default:
                    break;
            }
            bufferObj._is_first_load = false;

            if (nLoadType === 0 && !bufferObj._is_loaded_firstcount)     // it runs just once if firstcount is bigger than rowcount.
            {
                bufferObj._is_loaded_firstcount = true;
            }
            lines = null;

            if (ds.colinfos)
            {
                ds._reFilter();
                ds._resetSortGroup();
            }

            if (ds._eventstat)
            {
                ds.on_fire_onload(0, "", nLoadType); //nexacro.Dataset.REASON_LOAD
                if (ds._viewRecords && ds._viewRecords.length > 0)
                {
                    ds._forcesetRowPosition(0, 51); //nexacro.Dataset.REASON_ROWCHANGE;
                }
                else
                {
                    ds._forcesetRowPosition(-1, 51); //nexacro.Dataset.REASON_ROWCHANGE;
                }
            }
            else if (ds._viewRecords && ds._viewRecords.length > 0)
            {
                ds.rowposition = 0;
            }

            bufferObj._next_record_idx = line_idx;
        };

        _pProgressData._parseConstColInfo = nexacro._emptyFn;
        _pProgressData._setNextParseMode = nexacro._emptyFn;

        delete _pProgressData;

        nexacro._ProgressDataCSV = function (parent)
        {
            nexacro._ProgressData.call(this, parent);
            this._data_type = "CSV";

            this._rs = ["\r\n", "\n"];
            this._cs = ",";
        };

        var _pProgressDataCSV = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataCSV);
        nexacro._ProgressDataCSV.prototype = _pProgressDataCSV;

        _pProgressDataCSV._setNextParseMode = function (data)
        {
            var sec_type_max_len = 10;
            var sec = data.substr(this._cur_idx, sec_type_max_len).toUpperCase();

            if (this._parse_mode === 0)
            {
                this._parse_mode = 1;   //header
            }
            else if (sec.indexOf("DATASET") === 0)
            {
                this._parse_mode = 3;
            }
            else
            {
                switch (this._parse_mode)
                {
                    case 0://root
                        break;
                    case 1://header
                        this._parse_mode = 2;
                        break;
                    case 2://parameters
                        //this._parse_mode = 2;
                        break;
                    case 3://dataset
                        this._parse_mode = 5;
                        break;
                    case 5://collinfo
                        this._parse_mode = 6;
                        break;
                    case 6://record
                        var buffer_obj = this._datasets[this._cur_dataset_id];

                        if (buffer_obj._is_loaded_firstcount)
                        {
                            var buff = data.slice(this._cur_idx, data.length);
                            var n = -1;
                            var rss = this._rs;
                            for (var i = 0; i < rss.length; i++)
                            {
                                var rs = rss[i];
                                var regexp = new RegExp(rs + "dataset", "gi");
                                n = buff.search(regexp);
                                if (n >= 0)
                                    break;
                            }

                            if (n >= 0)
                            {
                                buffer_obj._row_end_idx = this._cur_idx + n;
                                this._cur_idx += n + rs.length;
                                this._parse_mode = 10;      // fire onload
                            }
                            else
                            {
                                this._cur_idx = data.length - 1;
                                buffer_obj._row_end_idx = this._cur_idx - 1;
                                return false;
                            }
                        }
                        break;
                    case 9: //skip
                        var buff = data.slice(this._cur_idx, data.length);
                        var rss = this._rs;
                        for (var i = 0; i < rss.length; i++)
                        {
                            var rs = rss[i];
                            var regexp = new RegExp(rs + "dataset", "gi");
                            n = buff.search(regexp);
                            if (n >= 0)
                                break;
                        }

                        if (n >= 0)
                        {
                            this._cur_idx += n + rs.length;
                            this._parse_mode = 3;      // fire onload
                        }
                        else
                        {
                            this._cur_idx = data.length - 1;
                            return false;
                        }
                        break;
                    default:
                        return false;

                }
            }
            return true;
        };

        delete _pProgressDataCSV;

        nexacro._ProgressDataSSV = function (parent)
        {
            nexacro._ProgressData.call(this, parent);
            this._data_type = "SSV";

            this._rs = String.fromCharCode(30);
            this._cs = String.fromCharCode(31);
        };

        var _pProgressDataSSV = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataSSV);
        nexacro._ProgressDataSSV.prototype = _pProgressDataSSV;

        _pProgressDataSSV._setNextParseMode = function (data)
        {
            var sec_type_max_len = 10;
            var sec = data.substr(this._cur_idx, sec_type_max_len).toUpperCase();

            if (this._parse_mode === 0)
            {
                this._parse_mode = 1;   //header
            }
            else if (sec.indexOf("DATASET") === 0)
            {
                this._parse_mode = 3;
            }
            else if (sec.indexOf("JSONOBJECT") === 0)
            {
                this._parse_mode = 7;
            }
            else
            {
                switch (this._parse_mode)
                {
                    case 0://root
                        break;
                    case 1://header
                        this._parse_mode = 2;
                        break;
                    case 2://parameters
                        //this._parse_mode = 2;
                        break;
                    case 3://dataset
                        if (sec.indexOf("_CONST_") === 0)
                            this._parse_mode = 4;
                        else
                            this._parse_mode = 5;
                        break;
                    case 4://constcolinfo
                        this._parse_mode = 5;
                        break;
                    case 5://collinfo
                        this._parse_mode = 6;
                        break;
                    case 6://record
                        var buffer_obj = this._datasets[this._cur_dataset_id];
                        if (buffer_obj._is_loaded_firstcount)
                        {
                            var buff = data.slice(this._cur_idx, data.length);
                            //var regexp = new RegExp("\\x" + this._rs.charCodeAt(0).toString(16) + "dataset", "gi");
                            var regexp = new RegExp(this._rs + "dataset", "gi");
                            var n = buff.search(regexp);
                            if (n >= 0)
                            {
                                buffer_obj._row_end_idx = this._cur_idx + n;
                                this._cur_idx += n + this._rs.length;
                                this._parse_mode = 10;      // fire onload
                            }
                            else
                            {
                                this._cur_idx = data.length - 1;
                                return false;
                            }
                        }
                        break;
                    case 7://JSON_id
                        this._parse_mode = 8;
                        break;
                    case 8://JSON_string
                        break;
                    case 9:
                        var buff = data.slice(this._cur_idx, data.length);
                        var regexp = new RegExp(this._rs + "dataset", "gi");
                        var n = buff.search(regexp);
                        if (n >= 0)
                        {
                            this._cur_idx += n + this._rs.length;
                            this._parse_mode = 3;
                        }
                        else
                        {
                            this._cur_idx = data.length - 1;
                            return false;
                        }
                        break;
                    default:
                        return false;
                }
            }
            return true;
        };

        delete _pProgressDataSSV;

        nexacro._ProgressDataPPX = function (parent)
        {
            nexacro._ProgressData.call(this, parent);
            this._data_type = "PPX";

            this._rs = String.fromCharCode(30);
            this._cs = String.fromCharCode(31);
        };

        var _pProgressDataPPX = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataPPX);
        nexacro._ProgressDataPPX.prototype = _pProgressDataPPX;

        _pProgressDataPPX._parseParameters = function (data)
        {
            var line = "";
            var n = -1;

            n = data.indexOf(this._rs, this._cur_idx);

            if (n >= 0)
            {
                line = data.substring(this._cur_idx, n);
            }
            else
                return false;

            this._cur_idx = n + this._rs.length;

            var form = this._parent.context;
            var param_arr = line.split(this._cs);
            var id = param_arr[1];
            var val = param_arr[2];

            if (val == String.fromCharCode(3))
                val = undefined;

            if (id == "ErrorCode")
            {
                code = parseInt(val) | 0;
                if (isFinite(code) === false)
                {
                    val = -1;
                }
                else
                {
                    val = code;
                }

                this._error_info[0] = val;
            }
            else if (id == "ErrorMsg")
            {
                this._error_info[1] = param_arr[2];
            }
            else if (id in form)    //1.form(application) variable
            {
                if (typeof (form[id]) != "object")
                {
                    form[id] = val;
                }
            }
            else                   //2.application globalvariable
            {
            	var app = nexacro.getApplication();
            	if (app && app._existVariable(id))
            	{
            		app[id] = val;
            	}
            	else
            	{
            		var hasvariable = nexacro._hasEnvironmentVariable(id);
            		if (hasvariable)
            			nexacro.setEnvironmentVariable(id, val);
            	}

            }

            this._parameters[this._parameters.length] = { id: id, value: val };

            if (this._error_info[0] >= 0)
                this._applyChange_inputDataset();

            return true;
        };

        _pProgressDataPPX._parseDataset = function (data)
        {
            var line = "";

            var n = data.indexOf(this._rs, this._cur_idx);
            if (n > 0)
            {
                line = data.substring(this._cur_idx, n);
            }
            else
                return false;

            if (this._cur_dataset_id)
            {
                var cur_buffer_obj = this._datasets[this._cur_dataset_id];
                cur_buffer_obj._row_end_idx = this._cur_idx - this._rs.length;
            }

            var remoteId = line.split(this._cs)[1];
            if (remoteId && remoteId.length)
            {
                var buffer_obj = this._datasets[remoteId];
                if (buffer_obj)
                {
                    buffer_obj._isEnable = true;
                    this._cur_dataset_id = remoteId;

                    buffer_obj._ds_start_idx = this._cur_idx;
                    buffer_obj._ds_end_idx = this._cur_idx + n;
                }
                else
                {
                    this._cur_dataset_id = "";
                    this._parse_mode = 9;
                }
            }
            //else skip

            this._cur_idx = n + this._rs.length;
            return true;
        };

        _pProgressDataPPX._setNextParseMode = function (data)
        {

            if (this._parse_mode === 0)
            {
                this._parse_mode = 1;   //header
            }
            else if (data.charAt(this._cur_idx) == "D")
            {
                this._parse_mode = 3;   //Dataset
            }
            else
            {
                switch (this._parse_mode)
                {
                    case 0://root
                        break;
                    case 1://header
                        this._parse_mode = 2;
                        break;
                    case 2://parameters
                        //this._parse_mode = 2;
                        break;
                    case 3://dataset
                    case 4://constcolinfo
                    case 5://collinfo
                        if (data.charAt(this._cur_idx) == "V")
                            this._parse_mode = 4;
                        else if (data.charAt(this._cur_idx) == "C")
                            this._parse_mode = 5;
                        else
                            this._parse_mode = 6;
                        break;
                    case 6://record
                        var buffer_obj = this._datasets[this._cur_dataset_id];
                        if (buffer_obj._is_loaded_firstcount)
                        {
                            var buff = data.slice(this._cur_idx, data.length);
                            //var regexp = new RegExp("\\x" + this._rs.charCodeAt(0).toString(16) + "D", "gi");
                            var regexp = new RegExp(this._rs + "D", "gi");
                            var n = buff.search(regexp);
                            if (n >= 0)
                            {
                                buffer_obj._row_end_idx = this._cur_idx + n;
                                this._cur_idx += n + this._rs.length;
                                this._parse_mode = 10;      // fire onload
                            }
                            else
                            {
                                this._cur_idx = data.length - 1;
                                return false;
                            }
                        }
                        break;
                    case 9:
                        var buff = data.slice(this._cur_idx, data.length);
                        var regexp = new RegExp(this._rs + "D", "gi");
                        var n = buff.search(regexp);
                        if (n >= 0)
                        {
                            this._cur_idx += n + this._rs.length;
                            this._parse_mode = 3;
                        }
                        else
                        {
                            this._cur_idx = data.length - 1;
                            return false;
                        }
                        break;
                    default:
                        return false;

                }
            }

            return true;
        };

        delete _pProgressDataPPX;

        nexacro._ProgressDataXML = function (parent)
        {
            nexacro._ProgressData.call(this, parent);
            this._data_type = "XML";

            this._rs = String.fromCharCode(30);
            this._cs = String.fromCharCode(31);

            this._parameters_start_idx = -1;
            this._parameters_end_idx = -1;

            this._parameters_tag = ["<Parameters>", "</Parameters>", "<Parameters/>"];
            this._dataset_tag = ["<Dataset", "</Dataset>", "<Dataset/>"];
            this._colinfo_tag = ["<ColumnInfo>", "</ColumnInfo>", "<ColumnInfo/>"];
            this._col_tag = ["<Col ", "</Col>", "<Col/>"];
            this._rows_tag = ["<Rows>", "</Rows>", "<Rows/>"];
            this._row_tag = ["<Row", "</Row>", "<Row/>"];

        };

        var _pProgressDataXML = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataXML);
        nexacro._ProgressDataXML.prototype = _pProgressDataXML;

        _pProgressDataXML._setNextParseMode = function (data)
        {
            var start_idx, end_idx;

            if (this._parse_mode == 0)
            {
                this._parse_mode = 1;   //header
            }
            else
            {
                switch (this._parse_mode)
                {
                    case 0://root
                        break;
                    case 1://header
                        start_idx = data.indexOf(this._parameters_tag[0], this._cur_idx);

                        if (start_idx > -1)
                        {
                            this._parameters_start_idx = start_idx;
                            this._cur_idx = start_idx;

                            var end_idx = data.indexOf(this._parameters_tag[1], this._cur_idx);

                            if (end_idx > -1)
                            {
                                this._parameters_end_idx = end_idx + this._parameters_tag[1].length;
                                this._cur_idx = end_idx + this._parameters_tag[1].length;
                                this._parse_mode = 2;
                            }
                            else
                                return false;
                        }
                        else
                        {
                            start_idx = data.indexOf(this._parameters_tag[2], this._cur_idx);

                            if (start_idx > -1)
                            {
                                this._parameters_start_idx = start_idx;
                                this._parameters_end_idx = start_idx + this._parameters_tag[2].length;
                                this._cur_idx += this._parameters_tag[2].length;
                            }

                            this._parse_mode = 3;
                        }
                        break;
                    case 2://parameters
                        start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

                        if (start_idx > -1)
                        {
                            this._parse_mode = 3;
                        }
                        else
                            return false;

                        break;
                    case 3://dataset
                        start_idx = data.indexOf(this._colinfo_tag[0], this._cur_idx);

                        if (start_idx > -1)
                        {
                            this._parse_mode = 5;
                        }
                        else
                            return false;

                        break;
                    case 4://constcolinfo
                    case 5://collinfo
                        start_idx = data.indexOf(this._rows_tag[0], this._cur_idx);
                        if (start_idx > -1)
                        {
                            this._cur_idx = start_idx + this._rows_tag[0].length;
                            this._parse_mode = 6;
                        }
                        else
                            return false;

                        break;
                    case 6://record
                        var buffer_obj = this._datasets[this._cur_dataset_id];
                        if (buffer_obj._is_loaded_firstcount)
                        {
                            start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);
                            if (start_idx >= 0)
                            {
                                buffer_obj._row_end_idx = start_idx - 1;
                                this._cur_idx = start_idx;
                                this._parse_mode = 10;      // fire onload
                            }
                            else
                            {
                                this._cur_idx = data.length - 1;
                                return false;
                            }
                        }
                        break;
                    case 9:
                        start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);
                        if (start_idx > -1)
                        {
                            this._cur_idx = start_idx;
                            this._parse_mode = 3;
                        }
                        else
                        {
                            this._cur_idx = data.length - 1;
                            return false;
                        }
                        break;
                    case 33:
                        this._parse_mode = 3;
                        break;
                    default:
                        return false;

                }
            }

            return true;
        };

        _pProgressDataXML._parseHeader = function (data)
        {
            return true;
        };

        _pProgressDataXML._parseParameters = function (data)
        {
            var form = this._parent.context;

            var parameter_str = data.slice(this._parameters_start_idx, this._parameters_end_idx);
            var params_info = nexacro._getXMLTagData(parameter_str, 0, "<Parameters>", "</Parameters>");

            if (params_info)
            {
                var paramsData = params_info[0];
                var param_parse_pos = 0;

                var varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
                while (varInfo)
                {
                    param_parse_pos = varInfo[3];
                    var attrStr = varInfo[1];
                    var id = nexacro._getXMLAttributeID(attrStr);
                    if (id && id.length)
                    {
                        var val = varInfo[0];

                        if (id == "ErrorCode")
                        {
                            var code = parseInt(val) | 0;
                            if (isFinite(code) == false)
                            {
                                val = -1;
                            }
                            else
                                val = code;

                            this._error_info[0] = val;
                        }
                        else if (id == "ErrorMsg")
                        {
                            val = nexacro._decodeXml(val);
                            this._error_info[1] = val;
                        }
                        else if (id in form)   //1.form(application) variable
                        {
                            if (!(id in form["all"]))
                            {
                                val = nexacro._decodeXml(val);
                                form[id] = val;
                            }
                        }
                        else                 //2.application globalvariable
                        {
                        	var app = nexacro.getApplication();
                        	if (app && app._existVariable(id))
                        	{
                        		app[id] = val;
                        	}
                        	else
                        	{
                        		var hasvariable = nexacro._hasEnvironmentVariable(id);
                        		if (hasvariable)
                        			nexacro.setEnvironmentVariable(id, val);
                        	}
                        }

                        this._parameters[this._parameters.length] = { id: id, value: val };
                    }
                    // for Next
                    varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
                }
            }

            if (this._error_info[0] >= 0)
                this._applyChange_inputDataset();

            return true;
        };

        _pProgressDataXML._parseDataset = function (data)
        {
            var start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

            if (start_idx < 0)
            {
                this._parse_mode = 9;
                return false;
            }

            var end_idx = data.indexOf(">", start_idx);

            if (end_idx > -1)
            {
                var attstr = data.slice(start_idx, end_idx + 1);
                var remoteId = nexacro._getXMLAttributeData(attstr, "id");

                if (this._cur_dataset_id)
                {
                    var cur_buffer_obj = this._datasets[this._cur_dataset_id];
                    cur_buffer_obj._row_end_idx = this._cur_idx;
                }

                if (remoteId && remoteId.length)
                {
                    var buffer_obj = this._datasets[remoteId];
                    if (buffer_obj)
                    {
                        buffer_obj._isEnable = true;
                        this._cur_dataset_id = remoteId;

                        buffer_obj._ds_start_idx = start_idx;
                        buffer_obj._ds_end_idx = end_idx + 1;
                    }
                    else
                    {
                        this._cur_dataset_id = "";
                        this._parse_mode = 9;
                    }
                }
                //else skip

                this._cur_idx = end_idx + 1;
            }
            else
            {
                this._parse_mode = 9;
                return false;
            }

            return true;
        };

        _pProgressDataXML._parseColInfo = function (data)
        {
            var start_idx = data.indexOf(this._colinfo_tag[0], this._cur_idx);

            if (start_idx < 0)
                return false;

            var end_idx = data.indexOf(this._colinfo_tag[1], start_idx);

            if (end_idx > 0)
            {
                if (this._cur_dataset_id)
                {
                    var buffer_obj = this._datasets[this._cur_dataset_id];
                    if (buffer_obj._colinfo_start_idx < 0)
                        buffer_obj._colinfo_start_idx = start_idx;

                    buffer_obj._colinfo_end_idx = end_idx + 1;
                }
            }
            else
            {
                this._parse_mode = 3;
                return false;
            }

            this._cur_idx = end_idx + 1;

            return true;
        };


        _pProgressDataXML._parseRecord = function (data)
        {
            var start_idx = data.indexOf(this._row_tag[0], this._cur_idx);
            var end_idx;

            var next_ds_start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

            if (next_ds_start_idx > -1 && start_idx > next_ds_start_idx)
            {
                this._parse_mode = 33;
                return true;
            }

            if (start_idx < 0)
            {
                start_idx = data.indexOf(this._row_tag[2], this._cur_idx);

                if (start_idx > -1)
                {
                    end_idx = start_idx + this._row_tag[2].length;
                }
                else
                    return false;
            }
            else
            {
                end_idx = data.indexOf(this._row_tag[1], start_idx);

                if (end_idx > -1)
                    end_idx += this._row_tag[1].length;
                else
                    return false;
            }

            var buffer_obj;
            if (this._cur_dataset_id)
            {
                buffer_obj = this._datasets[this._cur_dataset_id];
                var firstcount = buffer_obj._firefirstcount;

                if (buffer_obj._row_start_idx < 0)
                    buffer_obj._row_start_idx = start_idx;

                var attr_end_idx = data.indexOf(">", start_idx);
                var attstr = data.slice(start_idx, attr_end_idx + 1);

                var type = nexacro._getXMLAttributeType(attstr);
                if (type)
                {
                    var typeChar = type.charAt(0);
                    if (!(typeChar == "d" || typeChar == "D"))
                        buffer_obj._viewrecords_length++;
                }
                else
                    buffer_obj._viewrecords_length++;
            }

            this._cur_idx = end_idx;

            if (buffer_obj && buffer_obj._viewrecords_length == firstcount && firstcount > 0)
            {
                buffer_obj._firstrow_end_idx = end_idx;
                return false;
            }

            return true;
        };

        _pProgressDataXML._on_fire_onload = function (data, bufferObj, nLoadType)
        {
            var ds = bufferObj._target_ds;
            var xml_str;

            if (nLoadType == 1)
            {
                xml_str = data.slice(bufferObj._colinfo_start_idx, bufferObj._firstrow_end_idx);
            }
            else
            {
                if (bufferObj._row_end_idx < 0)
                    bufferObj._row_end_idx = data.length - 1;
                xml_str = data.slice(bufferObj._colinfo_start_idx, bufferObj._row_end_idx);
            }

            ds.rowposition = -1;
            var xml_parse_pos = ds._loadFromXMLStr(xml_str, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
            bufferObj._is_first_load = false;

            if (ds.colinfos)
            {
                ds._reFilter();
                ds._resetSortGroup();
            }

            if (ds._eventstat)
            {
                ds.on_fire_onload(0, "", nLoadType); //nexacro.Dataset.REASON_LOAD

                if (ds._viewRecords && ds._viewRecords.length > 0)
                {
                    ds._forcesetRowPosition(0, 51); //nexacro.Dataset.REASON_ROWCHANGE;
                }
                else
                {
                    ds._forcesetRowPosition(-1, 51); //nexacro.Dataset.REASON_ROWCHANGE;
                }
            }
            else if (ds._viewRecords && ds._viewRecords.length > 0)
            {
                ds.rowposition = 0;
            }

            bufferObj._next_record_idx = xml_parse_pos;
        };

        delete _pProgressDataXML;

        //==============================================================================
        // XML Parse & Serialize Utils
        //==============================================================================
        if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._BrowserType == "Edge"))
        {
            nexacro._parseXMLDocument = function (str)
            {
                return (new DOMParser()).parseFromString(str, "text/xml");
            };
            nexacro._documentToXml = function (xmldoc)
            {
                return (new XMLSerializer()).serializeToString(xmldoc);
            };

            // firefox
            //
            //  <parsererror xmlns="http://www.mozilla.org/newlayout/xml/parsererror.xml">
            //      (error description)
            //      <sourcetext>(a snippet of the source XML)</sourcetext>
            //  </parsererror>
            if (nexacro._Browser == "Gecko")
            {
                nexacro._getParserError = function (xmldoc)
                {
                    var node = xmldoc.documentElement;
                    if (node.nodeName == "parsererror")
                    {
                        //trace(nexacro._documentToXml(xmldoc));
                        var msg = "", desc = "";

                        var childs = node.childNodes;
                        msg = nexacro._decodeXml(childs[0].nodeValue);
                        desc = childs[1].textContent;

                        return { "line": undefined, "column": undefined, "message": msg, "desc": desc };
                    }
                    return null;
                };
            }
            else
            {
                // chrome/safari/opera
                //
                //  <root> (or <html><body>)
                //      <parsererror style>
                //          <h3>title text</h3>
                //          <div style>(error description)</div>
                //          <h3>text</h3>
                //      <sourcetext>(a snippet of the source XML)</sourcetext>
                //  </parsererror>
                //  </root> (or </body></html>)
                nexacro._getParserError = function (xmldoc)
                {
                    var errors = xmldoc.getElementsByTagName("parsererror");
                    if (errors.length > 0)
                    {
                        var msg = "";
                        var node = errors[0].firstChild;
                        while (node)
                        {
                            if (node.nodeName == "div")
                            {
                                msg = node.textContent;
                                break;
                            }
                            node = node.nextSibling;
                        }
                        return { "line": undefined, "column": undefined, "message": msg, "desc": "" };
                    }
                    return null;
                };
            }
        }
        else
        { // IE
            nexacro._getXmlDom = function ()
            {
                var xmlDomProgIDs;
                if (nexacro._BrowserVersion <= 8)
                {
                    // xml로 변환할 문자열에 "&#0;"가 있으면 잘못된 유니코드 에러 발생시키나, xmldom을 사용하면 발생 안함 (RP 37946)
                    xmlDomProgIDs = ["Microsoft.XmlDom", "MSXML2.DOMDocument", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.6.0",
                                            "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0"];
                }
                else
                {
                    xmlDomProgIDs = ["MSXML2.DOMDocument", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.6.0",
                                        "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "Microsoft.XmlDom"];
                }

                for (var i = 0; i < xmlDomProgIDs.length; i++)
                {
                    try
                    {
                        var progObj = new ActiveXObject(xmlDomProgIDs[i]);
                        return progObj;
                    }
                    catch (e)
                    {
                        // do nothing
                    }
                }
                return null;
            };
            nexacro._getXmlParser = function ()
            {
                var xmlDomProgIDs = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.6.0'];

                for (var i = xmlDomProgIDs.length - 1; i >= 0; i--) // find higher version, speed better. comnik 20150324
                {
                    try
                    {
                        var progObj = new ActiveXObject(xmlDomProgIDs[i]);
                        return progObj;
                    }
                    catch (e)
                    {
                        // do nothing
                    }
                }
                return null;
            };

            nexacro._parseXMLDocument = function (str)
            {
                var XMLDom = nexacro._getXmlDom();
                XMLDom.async = false;
                XMLDom.loadXML(str);
                return XMLDom;
            };
            nexacro._documentToXml = function (document)
            {
                return document.xml;
            };

            nexacro._getParserError = function (xmldoc)
            {
                var error = xmldoc.parseError;
                if (error && error.errorCode !== 0)
                {
                    var infos = ["Error on line ", error.line,
                                 " at column ", error.linepos,
                                 ": ", error.errorCode,
                                 " ", error.reason];

                    var msg = infos.join('');
                    var desc = error.srcText || "";

                    return { "line": error.line, "column": error.linepos, "message": msg, "desc": desc };
                }
                return null;
            };
        }

        if (nexacro._Browser == "Chrome")
        {
            // for use object cache : use closure
            (function ()
            {
                var re_newline = /\r\n|\n/;

                nexacro.__toInnerHTMLText = function (text)
                {
                    return text.split("&").join("&amp;").split("\"").join("&quot;").split("'").join("&#39;").replace("<", "&lt;").split(">").join("&gt;").split(re_newline).join("<br/>");
                };
            })();
        }
        else if (nexacro._Browser == "Gecko")
        {
            // for use object cache : use closure
            (function ()
            {
                var re_special = /[&"'\<\>]/g;
                var re_newline = /\r\n|\n/g;
                var _map = {
                    "&": "&amp;",
                    "'": "&#39;",
                    '"': "&quot;",
                    "<": "&lt;",
                    ">": "&gt;"
                };
                function _replaceEntity(chr)
                {
                    return _map[chr];
                }

                nexacro.__toInnerHTMLText = function (text)
                {
                    return text.replace(re_special, _replaceEntity).replace(re_newline, "<br/>");
                };
            })();
        }
        else
        {
            // for use object cache : use closure
            (function ()
            {
                var re_amp = /&/g;
                var re_apos = /'/g;
                var re_quot = /"/g;
                var re_lt = /</g;
                var re_gt = />/g;
                var re_newline = /\r\n|\n|\r/g;

                nexacro.__toInnerHTMLText = function (text)
                {
                    return text.replace(re_amp, "&amp;").replace(re_apos, "&#39;").replace(re_quot, "&quot;").replace(re_lt, "&lt;").replace(re_gt, "&gt;").replace(re_newline, "<br/>");
                };
            })();
        }

        nexacro._decorateString = function (str)
        {
            var strtemp = str;

            var expPrefixMap = [/<\/?ff\s+[v]\s*=\'/g, /<\/?fs\s*[v]\s*=\'/g, /<\/?fc\s+[v]\s*=\'/g, /<\/?b\s+[v].*?>/g, /<\/?i\s+[v].*?>/g, /<\/?u\s+[v].*?>/g, /<\/?s\s+[v].*?>/g];
            var expSufixMap = [/<\/ff>/g, /<\/fs>/g, /<\/fc>/g, /<\/b>/g, /<\/i>/g, /<\/u>/g, /<\/s>/g];

            for (var i = 0; i <= expPrefixMap.length - 1; i++)
            {
                var idx = 0;
                var preexp = expPrefixMap[i];
                var sufexp = expSufixMap[i];
                var preexec = preexp.exec(strtemp);

                while (preexec)
                {
                    var sufexec = sufexp.exec(strtemp);
                    var startidx = preexec.index;
                    var endidx = sufexp.lastIndex;

                    var frontstr = strtemp.substring(0, startidx);
                    var endstr = strtemp.substring(endidx, strtemp.length);
                    var changestr = strtemp.substring(startidx, endidx);

                    switch (i)
                    {
                        case 0:
                            changestr = changestr.replace(preexec[0], "<span style=\"font-family:").replace("\'>", "\">").replace(sufexec[0], "</span>");
                            break;
                        case 1:
                            changestr = changestr.replace(preexec[0], "<span style=\"font-size:").replace("\'>", "pt\">").replace(sufexec[0], "</span>");
                            break;
                        case 2:
                            changestr = changestr.replace(preexec[0], "<span style=\"color:").replace("\'>", "\">").replace(sufexec[0], "</span>");
                            var startidx = changestr.indexOf(":");
                            var endidx = changestr.indexOf("\">");
                            var colorstr = changestr.substring(startidx + 1, endidx);
                            changestr = changestr.replace(colorstr, nexacro._getWebColorFromXreColor(colorstr));
                            break;
                            break;
                        case 3:
                            changestr = changestr.replace(preexec[0], "<b>");
                            break;
                        case 4:
                            changestr = changestr.replace(preexec[0], "<i>");
                            break;
                        case 5:
                            changestr = changestr.replace(preexec[0], "<u>");
                            break;
                        case 6:
                            changestr = changestr.replace(preexec[0], "<s>");
                            break;
                        case 7:
                            break;
                    }

                    strtemp = frontstr + changestr + endstr;

                    preexp.lastIndex = 0;
                    preexec = preexp.exec(strtemp);
                    if (preexec)
                    {
                        sufexp.lastIndex = preexp.lastIndex;
                    }
                }
            }

            strtemp = strtemp.replace(/\&lt;/g, "&amp;lt;").replace(/\&gt;/g, "&amp;gt;").replace(/\&quot;/g, "&amp;quot;").replace(/\&apos;/g, "&amp;apos;");

            //// hyperlink 처리
            ////strtemp = strtemp.replace(/<\/?l\s+[v]\s*=/g, "<a target='_blank' href=").replace(/l\s*>/g, "a>");
            //if (strtemp.indexOf("\"") >= 0 || strtemp.indexOf("\'") >= 0)
            //{
            //    strtemp = nexacro._replaceAll(strtemp, "\"", "");
            //    strtemp = nexacro._replaceAll(strtemp, "\'", "");
            //}

            return strtemp;
        };

        nexacro._quoteStr = function (str)
        {
            if (/[\r\n\"\t]/.test(str))
            {
                return "\"" + str.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\"/g, "\\\"") + "\"";
            }
            else if (/[,\']/.test(str))
            {
                return "\"" + str + "\"";
            }
            else
            {
                return str;
            }
        };
        nexacro._unQuoteStr = function (str)
        {
            if (str.charAt(0) != "\"" && str.charAt(0) != "\'")
            {
                return str;
            }
            else if (str.indexOf("\\") >= 0)
            {
                str = str.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\/g, "");
                return str.substring(1, str.length - 1);
            }
            else
            {
                return str.substring(1, str.length - 1);
            }
        };

        //==============================================================================
        // Screen & Element Position APIs
        //==============================================================================
        if (nexacro._checkDocument.hasGetBoundingClientRect)
        {
            if (nexacro._Browser == "IE")
            {
                nexacro._getElementXYInWindow = function (node)
                {
                    var point_x, point_y;
                    var _doc = (node.ownerDocument || node.document);
                    var doc_elem = _doc.documentElement;
                    var body = _doc.body;
                    var box = node.getBoundingClientRect();
                    point_x = Math.round(box.left) - doc_elem.clientLeft;
                    point_y = Math.round(box.top) - doc_elem.clientTop;

                    // why?
                    var docBox = body.getBoundingClientRect();
                    var physicalW = docBox.right - docBox.left;
                    var logicalW = body.offsetWidth;
                    // the zoom level is always an integer percent value
                    if (physicalW != logicalW)
                    {
                        var factor = Math.round((physicalW / logicalW) * 100) / 100;
                        point_x = Math.round(point_x / factor);
                        point_y = Math.round(point_y / factor);
                    }

                    return [point_x, point_y];
                };
            }
            else
            {
                nexacro._getElementXYInWindow = function (node)
                {
                    var point_x, point_y;

                    if (nexacro._allow_default_pinchzoom)
                    {
                        // TODO CHECK ElementPositionInFrame과 용도 중복 아닌지? (body 스크롤 포함)
                        if (!node)
                            return [0, 0];
                        var _doc = (node.ownerDocument || node.document);
                        var elem_pos = nexacro.__getHTMLNodePositionInFrame(_doc, node);
                        if (elem_pos)
                            return [elem_pos.x, elem_pos.y];
                    }

                    if (node)
                    {
                        var box = node.getBoundingClientRect();
                        point_x = Math.round(box.left);
                        point_y = Math.round(box.top);
                    }
                    else
                    {
                        trace("error (nexacro._getElementXYInWindow)");
                    }

                    return [point_x, point_y];
                };
            }
        }
        else
        {
            // [2014-03-20] by ODH, Major Browser(Chrome, Firefox, IE, Safari. Opera)는
            // 'getBoundingClientRect' 지원함.
            // firefox는 overflow 속성의 값에 따라 offsetLeft 값이 달라지는 문제가 있기 때문에
            // 이 분기를 타지 않도록 주의할 것.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=353363
            nexacro._getElementXYInWindow = function (node)
            {
                var point_x = 0, point_y = 0;
                point_x += node.offsetLeft;
                point_y += node.offsetTop;

                var pnode = node.offsetParent;
                while (pnode)
                {
                    point_x += (pnode.offsetLeft + (pnode.clientLeft | 0) - pnode.scrollLeft);
                    point_y += (pnode.offsetTop + (pnode.clientTop | 0) - pnode.scrollTop);
                    pnode = pnode.offsetParent;
                }

                // case : use in iframe
                var doc_elem = document.documentElement;
                point_x += doc_elem.scrollLeft;
                point_y += doc_elem.scrollTop;

                return [point_x, point_y];
            };
        }

        //----------------------------------------------
        nexacro._getElementPositionInFrame = function (elem)
        {
            var node = elem.handle;
            if (!node)
                return { x: 0, y: 0 };

            var _doc = (node.ownerDocument || node.document);
            return nexacro.__getHTMLNodePositionInFrame(_doc, node);
        };
        nexacro.__getHTMLNodePositionInFrame = function (_doc, node)
        {
            var p = {
                x: 0,
                y: 0
            };
            if (!_doc || !node)
                return p;

            if (nexacro._checkDocument.hasGetBoundingClientRect)
            {
                var box = node.getBoundingClientRect();
                //To do check
                p.x = box.left; // box.left + (_doc.scrollLeft || _doc.body.scrollLeft);
                p.y = box.top; // + (_doc.scrollTop || _doc.body.scrollTop);
                p.x = Math.round(p.x);
                p.y = Math.round(p.y);
            }
            else
            {
                if (nexacro._checkDocument.hasGetBoxObjectFor)
                {
                    var box = _doc.getBoxObjectFor(node);
                    p.x = box.x;
                    p.y = box.y;
                    var style = _doc.defaultView.getComputedStyle(node, "");
                    p.x -= parseInt(style.borderLeftWidth) | 0;
                    p.y -= parseInt(style.borderTopWidth) | 0;
                    node = node.parentNode;
                    while (node.nodeType == 1)
                    {
                        p.x -= node.scrollLeft;
                        p.y -= node.scrollTop;
                        node = node.parentNode;
                    }
                }
                else
                {
                    p.x = node.offsetLeft;
                    p.y = node.offsetTop;
                    var pnode = node.offsetParent;
                    while (pnode)
                    {
                        p.x += pnode.offsetLeft;
                        p.y += pnode.offsetTop;
                        pnode = pnode.offsetParent;
                    }
                    var body = _doc.body || _doc.getElementsByTagName("body")[0];
                    node = node.parentNode || body;
                    while (node.nodeType == 1 && node != body)
                    {
                        p.x -= node.scrollLeft;
                        p.y -= node.scrollTop;
                        node = node.parentNode;
                    }
                }
            }
            return p;
        };

        // Edge 브라우저는 아래 동작에서는 IE와 동일하게 동작 하면 안됨
        if (nexacro._Browser == "IE" && nexacro._BrowserType !== "Edge")
        {
            nexacro._getElementScreenPosition = function (elem)
            {
                var handle = elem.handle;
                if (handle)
                {
                    var _doc = handle.ownerDocument || handle.document;
                    var p = nexacro.__getHTMLNodePositionInFrame(_doc, handle);

                    var win = _doc.parentWindow;
                    p.x += win.screenLeft;
                    p.y += win.screenTop;

                    return p;
                }
                return { x: 0, y: 0 };
            };
        }
        else if (nexacro._Browser == "Gecko")
        {
            nexacro._getElementScreenPosition = function (elem)
            {
                var handle = elem.handle;
                if (handle)
                {
                    var _doc = handle.ownerDocument || handle.document;
                    var p = nexacro.__getHTMLNodePositionInFrame(_doc, handle);

                    var win = _doc.defaultView;
                    p.x += win.mozInnerScreenX;
                    p.y += win.mozInnerScreenY;

                    return p;
                }
                return { x: 0, y: 0 };
            };
        }
        else
        {
            nexacro._getElementScreenPosition = function (elem)
            {
                var handle = elem.handle;
                if (handle)
                {
                    var _doc = handle.ownerDocument || handle.document;
                    var p = nexacro.__getHTMLNodePositionInFrame(_doc, handle);

                    var win = _doc.defaultView;

                    p.x += nexacro._gap_client_width;
                    p.y += nexacro._gap_client_height;

                    return p;
                }
                return { x: 0, y: 0 };
            };
        }

        nexacro.__getHTMLElementPosition = function (node)
        {
            var top = 0;
            var left = 0;
            var skipTd = false;
            while (node.parentNode && node != window.document.body)
            {
                var nodetagname = node.tagName;
                if (skipTd && nodetagname == "TABLE")
                {
                    skipTd = false;
                }
                if ((skipTd && nodetagname == "TD") || nodetagname == "TR" || nodetagname == "TBODY")
                {
                    node = node.parentNode;
                    continue;
                }

                var node_style = node.style;
                if (node_style.position == "absolute")
                {
                    skipTd = true;
                }

                left -= (node.scrollLeft | 0);
                top -= (node.scrollTop | 0);
                var borderWidth = (node_style.borderLeftWidth | 0);
                var borderHeight = (node_style.borderTopWidth | 0);
                if ((nexacro._Browser == "Gecko" || nexacro._Browser == "KHTML") && node.tagName != "TABLE")
                {
                    left += borderWidth * 2;
                    top += borderWidth * 2;
                }
                else if (nexacro._Browser == "IE" || nexacro._Browser == "WebKit")
                {
                    top += borderWidth;
                    left += borderWidth;
                } // border
                top += (node.offsetTop | 0);
                left += (node.offsetLeft | 0);
                node = node.parentNode;
            }
            return { top: top, left: left };
        };

        nexacro.__getHTMLPageSize = function ()
        {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY)
            {
                xScroll = document.body.scrollWidth;
                yScroll = window.innerHeight + window.scrollMaxY;
            }
            else
            {
                if (document.body.scrollHeight > document.body.offsetHeight)
                { // all
                    // but
                    // Explorer
                    // Mac
                    xScroll = document.body.scrollWidth;
                    yScroll = document.body.scrollHeight;
                }
                else
                {
                    if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight)
                    {
                        // Explorer 6
                        // strict
                        // mode
                        xScroll = document.documentElement.scrollWidth;
                        yScroll = document.documentElement.scrollHeight;
                    }
                    else
                    {
                        // Explorer Mac...would also work in Mozilla and
                        // Safari
                        xScroll = document.body.offsetWidth;
                        yScroll = document.body.offsetHeight;
                    }
                }
            }
            var windowWidth, windowHeight;
            if (self.innerHeight)
            { // all except Explorer
                windowWidth = self.innerWidth;
                windowHeight = self.innerHeight;
            }
            else
            {
                if (document.documentElement && document.documentElement.clientHeight)
                {
                    // Explorer 6
                    // Strict Mode
                    windowWidth = document.documentElement.clientWidth;
                    windowHeight = document.documentElement.clientHeight;
                }
                else
                {
                    if (document.body)
                    {
                        // other Explorers
                        windowWidth = document.body.clientWidth;
                        windowHeight = document.body.clientHeight;
                    }
                }
            }
            // for small pages with total height less then height of the viewport
            if (yScroll < windowHeight)
            {
                pageHeight = windowHeight;
            }
            else
            {
                pageHeight = yScroll;
            }
            // for small pages with total width less then width of the viewport
            if (xScroll < windowWidth)
            {
                pageWidth = windowWidth;
            }
            else
            {
                pageWidth = xScroll;
            }
            return [pageWidth, pageHeight, windowWidth, windowHeight];
        };


        nexacro.__findParentElement = function (node)
        {
            if (node)
            {
                while (node)
                {
                    var elem = node._linked_element;
                    if (elem) return elem;
                    node = node.parentNode;
                }
            }
            return;
        };

        if (nexacro._Browser == "IE")
        {
            nexacro.__findParentElementForKeyEvent = function (node, win)
            {
                var active_node = win._dest_doc.activeElement;
                if (active_node.tagName == "OBJECT")
                {
                    win._last_focused_elem = null;
                }

                // LastFocus가 있는 경우 LastFocus Elem을 리턴
                if (win && win._last_focused_elem)
                {
                    // 포커스가 날라간 경우 예외처리
                    var focused_elem = win._last_focused_elem;
                    if (!focused_elem.visible || focused_elem.handle == null)
                        win._last_focused_elem = null;
                    else
                        return win._last_focused_elem;
                }

                // 그렇지 않은경우 Node Element
                return nexacro.__findParentElement(node);
            };
        }
        else
        {
            nexacro.__findParentElementForKeyEvent = function (node, win)
            {
                // LastFocus가 있는 경우 LastFocus Elem을 리턴
                if (win && win._last_focused_elem)
                {
                    // 포커스가 날라간 경우 예외처리
                    var focused_elem = win._last_focused_elem;
                    if (!focused_elem.visible || focused_elem.handle == null)
                        win._last_focused_elem = null;
                    else
                        return win._last_focused_elem;
                }

                // 그렇지 않은경우 Node Element
                return nexacro.__findParentElement(node);
            };
        }

        nexacro.__getWheelDelta = nexacro.__getWheelDeltaY;

        if (nexacro._Browser == "Gecko")
        {
            nexacro.__getWheelDeltaX = function (e)
            {
                if (e.axis === 2)
                {
                    var wheel_deltax = 0;
                }
                else
                {
                    var wheel_deltax = -40 * e.detail;
                }
                return wheel_deltax;
            };

            nexacro.__getWheelDeltaY = function (e)
            {
                if (e.axis === 2)
                {
                    var wheel_deltay = -40 * e.detail;
                }
                else
                {
                    var wheel_deltay = 0;
                }
                return wheel_deltay;
            };
        }
        else if (nexacro._Browser == "IE")
        {
            nexacro.__getWheelDeltaX = function (e)
            {
                return 0;
            };

            nexacro.__getWheelDeltaY = function (e)
            {
                return e.wheelDelta;
            };
        }
        else
        {
            nexacro.__getWheelDeltaX = function (e)
            {
                return e.wheelDeltaX;
            };

            nexacro.__getWheelDeltaY = function (e)
            {
                return e.wheelDeltaY;
            };
        }

        if (nexacro._Browser != "IE")
        {
            nexacro._getSysEventElement = function (sysevt)
            {
                var node = sysevt.target;
                return (node) ? nexacro.__findParentElement(node) : null;
            };
            nexacro._getSysEventKey = function (sysevt)
            {
                return sysevt.charCode || sysevt.keyCode;
            };

            if (nexacro._Browser == "Gecko")
            {
                nexacro._getSysEventKeyCode = function (sysevt)
                {
                    var k = sysevt.keyCode;
                    return ((k > 0 && k <= 46) ? k : sysevt.charCode === 0 ? k : sysevt.charCode);
                };
            }
            else
            {
                nexacro._getSysEventKeyCode = function (sysevt)
                {
                    return sysevt.keyCode;
                };
            }

            nexacro._getSysEventX = function (sysevt)
            {
                return sysevt.pageX + document.body.scrollLeft;
            };
            nexacro._getSysEventY = function (sysevt)
            {
                return sysevt.pageY + document.body.scrollTop;
            };

            // TODO: FF
            // (0: left, 1: right, 2: wheel button)
            nexacro._getSysEventBtnCode = function (sysevt, code)
            {
                return sysevt.which ? (sysevt.which - 1) : (sysevt.button);
            };


            nexacro._stopSysEvent = function (sysevt)
            {
                if (sysevt.cancelable) sysevt.preventDefault();
                if (sysevt.bubbles) sysevt.stopPropagation();
                sysevt.stopped = true;
                return false;
            };

            nexacro._stopPropagation = function (sysevt)
            {
                sysevt.stopPropagation();
                return false;
            };

            nexacro._observeSysEvent = function (node, name, onname, callback)
            {
                node.addEventListener(name, callback, false);
            };
            nexacro._stopSysObserving = function (node, name, onname, callback)
            {
                node.removeEventListener(name, callback, false);
                callback = null;
            };
        }
        else
        { // IE
            nexacro._getSysEventElement = function (sysevt)
            {
                var node = sysevt.srcElement;
                return node ? nexacro.__findParentElement(node) : null;
            };
            nexacro._getSysEventKey = function (sysevt)
            {
                return sysevt.charCode || sysevt.keyCode;
            };
            nexacro._getSysEventKeyCode = function (sysevt)
            {
                return sysevt.keyCode;
            };

            nexacro._getSysEventX = function (sysevt)
            {
                return sysevt.clientX + document.body.scrollLeft;
            };
            nexacro._getSysEventY = function (sysevt)
            {
                return sysevt.clientY + document.body.scrollTop;
            };
            if (nexacro._BrowserVersion < 11)
            {
                // (0: left(click), 1: right, 2: wheel button)
                nexacro._getSysEventBtnCode = function (sysevt, code)
                {
                    // lbutton,wheel이 모두 1로 들어온다...
                    //return [0, 0, 2, -1, 1][sysevt.button];
                    return sysevt.button;
                };
            }
            else
            {
                nexacro._getSysEventBtnCode = function (sysevt, code)
                {
                    return sysevt.which ? (sysevt.which - 1) : (sysevt.button);
                };
            }


            nexacro._stopSysEvent = function (sysevt)
            {
                sysevt.returnValue = false;
                sysevt.cancelBubble = true;
                sysevt.stopped = true;


                //ex)oncontextmenu
                if (sysevt.preventDefault)
                {
                    sysevt.preventDefault();
                }
                if (sysevt.stopPropagation)
                {
                    sysevt.stopPropagation();
                }
                return false;
            };

            // DOM Input에서 발생한 이벤트의 bubble을 막음.
            nexacro._stopPropagation = function (sysevt)
            {
                sysevt.cancelBubble = true;
                return false;
            };

            if (nexacro._BrowserVersion > 8)
            {
                nexacro._observeSysEvent = function (node, name, onname, callback)
                {
                    node.addEventListener(name, callback);
                };
                nexacro._stopSysObserving = function (node, name, onname, callback)
                {
                    node.removeEventListener(name, callback, false);
                    callback = null;
                };
            }
            else
            {
                nexacro._observeSysEvent = function (node, name, onname, callback)
                {
                    if (onname in node)
                    {
                        node.attachEvent(onname, callback);
                    }
                };
                nexacro._stopSysObserving = function (node, name, onname, callback)
                {
                    if (onname in node)
                    {
                        node.detachEvent(onname, callback);
                    }
                    callback = null;
                };
            }
        }

        nexacro._getSysEventBtnString = function (sysevt)
        {
            switch (nexacro._getSysEventBtnCode(sysevt))
            {
                case nexacro_HTMLSysEvent.MOUSE_LBUTTON:
                    return "lbutton";
                case nexacro_HTMLSysEvent.MOUSE_MBUTTON:
                    return "mbutton";
                case nexacro_HTMLSysEvent.MOUSE_RBUTTON:
                    return "rbutton";
                default:
                    return "none";
            }
        };

        // for element : The node should be 'element handle'.
        nexacro._observeEvent = nexacro._observeSysEvent;
        nexacro._stopObserving = nexacro._stopSysObserving;

        if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
        {
            nexacro.__fireHTMLEvent = function (node, name, onname)
            {
                if (node.fireEvent)
                {
                    node.fireEvent(onname);
                }
            };
        }
        else
        {
            nexacro.__fireHTMLEvent = function (node, name, onname)
            {
                var doc = node.ownerDocument || node.document;

                if (doc.createEvent)
                {
                    var evt = doc.createEvent('HTMLEvents');
                    evt.initEvent(name, true, true);
                    node.dispatchEvent(evt);
                }
            };
        }

        //==============================================================================
        // for CSS object Control for Web Browser
        //==============================================================================
        // color table
        nexacro._xreNamedColorList =
        {
            "": "",
            "transparent": "transparent",
            "@gradation": "",
            "aliceblue": "#F0F8FF",
            "antiquewhite": "#FAEBD7",
            "aqua": "#00FFFF",
            "aquamarine": "#7FFFD4",
            "azure": "#F0FFFF",
            "beige": "#F5F5DC",
            "bisque": "#FFE4C4",
            "black": "#000000",
            "blanchedalmond": "#FFEBCD",
            "blue": "#0000FF",
            "blueviolet": "#8A2BE2",
            "brown": "#A52A2A",
            "burlywood": "#DEB887",
            "cadetblue": "#5F9EA0",
            "chartreuse": "#7FFF00",
            "chocolate": "#D2691E",
            "coral": "#FF7F50",
            "cornflowerblue": "#6495ED",
            "cornsilk": "#FFF8DC",
            "crimson": "#DC143C",
            "cyan": "#00FFFF",
            "darkblue": "#00008B",
            "darkcyan": "#008B8B",
            "darkgoldenrod": "#B8860B",
            "darkgray": "#A9A9A9",
            "darkgreen": "#006400",
            "darkgrey": "#A9A9A9",
            "darkkhaki": "#BDB76B",
            "darkmagenta": "#8B008B",
            "darkolivegreen": "#556B2F",
            "darkorange": "#FF8C00",
            "darkorchid": "#9932CC",
            "darkred": "#8B0000",
            "darksalmon": "#E9967A",
            "darkseagreen": "#8FBC8F",
            "darkslateblue": "#483D8B",
            "darkslategray": "#2F4F4F",
            "darkslategrey": "#2F4F4F",
            "darkturquoise": "#00CED1",
            "darkviolet": "#9400D3",
            "deeppink": "#FF1493",
            "deepskyblue": "#00BFFF",
            "dimgray": "#696969",
            "dimgrey": "#696969",
            "dodgerblue": "#1E90FF",
            "firebrick": "#B22222",
            "floralwhite": "#FFFAF0",
            "forestgreen": "#228B22",
            "fuchsia": "#FF00FF",
            "gainsboro": "#DCDCDC",
            "ghostwhite": "#F8F8FF",
            "gold": "#FFD700",
            "goldenrod": "#DAA520",
            "gray": "#808080",
            "green": "#008000",
            "greenyellow": "#ADFF2F",
            "grey": "#808080",
            "honeydew": "#F0FFF0",
            "hotpink": "#FF69B4",
            "indianred": "#CD5C5C",
            "indigo": "#4B0082",
            "ivory": "#FFFFF0",
            "khaki": "#F0E68C",
            "lavender": "#E6E6FA",
            "lavenderblush": "#FFF0F5",
            "lawngreen": "#7CFC00",
            "lemonchiffon": "#FFFACD",
            "lightblue": "#ADD8E6",
            "lightcoral": "#F08080",
            "lightcyan": "#E0FFFF",
            "lightgoldenrodyellow": "#FAFAD2",
            "lightgray": "#D3D3D3",
            "lightgreen": "#90EE90",
            "lightgrey": "#D3D3D3",
            "lightpink": "#FFB6C1",
            "lightsalmon": "#FFA07A",
            "lightseagreen": "#20B2AA",
            "lightskyblue": "#87CEFA",
            "lightslategray": "#778899",
            "lightslategrey": "#778899",
            "lightsteelblue": "#B0C4DE",
            "lightyellow": "#FFFFE0",
            "lime": "#00FF00",
            "limegreen": "#32CD32",
            "linen": "#FAF0E6",
            "magenta": "#FF00FF",
            "maroon": "#800000",
            "mediumaquamarine": "#66CDAA",
            "mediumblue": "#0000CD",
            "mediumorchid": "#BA55D3",
            "mediumpurple": "#9370DB",
            "mediumseagreen": "#3CB371",
            "mediumslateblue": "#7B68EE",
            "mediumspringgreen": "#00FA9A",
            "mediumturquoise": "#48D1CC",
            "mediumvioletred": "#C71585",
            "midnightblue": "#191970",
            "mintcream": "#F5FFFA",
            "mistyrose": "#FFE4E1",
            "moccasin": "#FFE4B5",
            "navajowhite": "#FFDEAD",
            "navy": "#000080",
            "oldlace": "#FDF5E6",
            "olive": "#808000",
            "olivedrab": "#6B8E23",
            "orange": "#FFA500",
            "orangered": "#FF4500",
            "orchid": "#DA70D6",
            "palegoldenrod": "#EEE8AA",
            "palegreen": "#98FB98",
            "paleturquoise": "#AFEEEE",
            "palevioletred": "#DB7093",
            "papayawhip": "#FFEFD5",
            "peachpuff": "#FFDAB9",
            "peru": "#CD853F",
            "pink": "#FFC0CB",
            "plum": "#DDA0DD",
            "powderblue": "#B0E0E6",
            "purple": "#800080",
            "red": "#FF0000",
            "rosybrown": "#BC8F8F",
            "royalblue": "#4169E1",
            "saddlebrown": "#8B4513",
            "salmon": "#FA8072",
            "sandybrown": "#F4A460",
            "seagreen": "#2E8B57",
            "seashell": "#FFF5EE",
            "sienna": "#A0522D",
            "silver": "#C0C0C0",
            "skyblue": "#87CEEB",
            "slateblue": "#6A5ACD",
            "slategray": "#708090",
            "slategrey": "#708090",
            "snow": "#FFFAFA",
            "springgreen": "#00FF7F",
            "steelblue": "#4682B4",
            "tan": "#D2B48C",
            "teal": "#008080",
            "thistle": "#D8BFD8",
            "tomato": "#FF6347",
            "turquoise": "#40E0D0",
            "violet": "#EE82EE",
            "wheat": "#F5DEB3",
            "white": "#FFFFFF",
            "whitesmoke": "#F5F5F5",
            "yellow": "#FFFF00",
            "yellowgreen": "#9ACD32"
        };

        if (nexacro._Browser_ColorAlpha)
        {
            nexacro._getSupportedWebColor = function (val)
            {
                val = val.trim();
                val = val.toLowerCase();
                if (val[0] == '#' || nexacro._xreNamedColorList[val])
                {
                    return val;
                }
                /*
                var type = val.substr(0, 3)
                if (type != "rgb" && type != "hsl")
                {
                    return "";
                }
                */
                return val;

            };
        }
        else // IE7,8
        {
            nexacro._getSupportedWebColor = function (val)
            {
            	val = val.trim();
            	val = val.toLowerCase();
                if (val.charAt(0) == '#' || nexacro._xreNamedColorList[val])
                {
                    return val;
                }
                if (val.substr(0, 3) == "rgb")
                {
                    if (val.charAt(3) != "a")
                        return val;
                    var varr = (val.substring(val.indexOf("(") + 1, val.lastIndexOf(")"))).split(',');
                    if (!varr[3]) return val;
                    var a = varr[3].trim();
                    return (a === 0) ? "transparent" : "rgb(" + varr[0].trim() + "," + varr[1].trim() + "," + varr[2].trim() + ")";
                }
                else if (val.substr(0, 3) == "hsl")
                {
                    var r, g, b, a, rs, gs, bs;
                    var varr = (val.substring(val.indexOf("(") + 1, val.lastIndexOf(")"))).split(',');
                    if (!((varr.length == 4 && val.charAt(3) == "a") || varr.length == 3))
                    {
                        // invalid
                        return "";
                    }

                    if (varr.length == 4)
                    {
                        a = varr[3].trim();
                        if (a == 0)
                            return "transparent";
                    }

                    rs = varr[0].trim();//replace(/^\s+|\s+$/g, ''); 
                    gs = varr[1].trim();//replace(/^\s+|\s+$/g, '');
                    bs = varr[2].trim();//replace(/^\s+|\s+$/g, '');

                    if (rs.charAt(rs.length - 1) == "%")
                        r = (parseInt(rs) * 255 / 100) | 0;
                    else
                        r = ((rs | 0) * 255 / 360) | 0;
                    if (gs.charAt(gs.length - 1) == "%")
                        g = (parseInt(gs) * 255 / 100) | 0;
                    else
                        g = ((gs | 0) * 255 / 360) | 0;
                    if (bs.charAt(bs.length - 1) == "%")
                        b = (parseInt(bs) * 255 / 100) | 0;
                    else
                        b = ((bs | 0) * 255 / 360) | 0;

                    return "rgb(" + r + "," + g + "," + b + ")";
                }
                return "";
            };
        }

        if (nexacro._Browser_Gradient == 1)
        {
            nexacro._getSupportedWebGradient = function (val)
            {
                return val;
            };
        }
        else if (nexacro._Browser_Gradient == 2) // legacy Gradient
        {
            if (nexacro._Browser == "Gecko")
                nexacro._regacy_gradient_name = "-moz-linear-gradient";
            else if (nexacro._Browser == "WebKit" || nexacro._Browser == "Chrome" || nexacro._Browser == "MobileSafari" || nexacro._Browser == "Safari")
                nexacro._regacy_gradient_name = "-webkit-linear-gradient";
            else if (nexacro._Browser == "Opera" || nexacro._Browser == "Chrome" || nexacro._Browser == "MobileSafari" || nexacro._Browser == "Safari")
                nexacro._regacy_gradient_name = "-o-linear-gradient";

            nexacro._getSupportedWebGradient = function (val)
            {
                var props = val.substring(val.indexOf("(") + 1, val.lastIndexOf(")")).trim().split(/\s?,\s?/);
                var first = props[0].trim();
                if (first.substr(0, 2) == "to")
                {
                    start = first.substring(3).trim().replace(/\s+/, " ");
                    switch (start)
                    {
                        case "left":
                            start = "right";
                            break;
                        case "right":
                            start = "left";
                            break;
                        case "top":
                            start = "bottom";
                            break;
                        case "bottom":
                            start = "top";
                            break;
                        case "left top":
                            start = "right bottom";
                            break;
                        case "right top":
                            start = "left bottom";
                            break;
                        case "left bottom":
                            start = "right top";
                            break;
                        case "right bottom":
                            start = "left top";
                            break;
                    }
                    props[0] = start;
                    return nexacro._regacy_gradient_name + "(" + props.join(",") + ")";
                }
                else
                {
                    return nexacro._regacy_gradient_name + "(top," + props.join(",") + ")";
                }
            };
        }
        else // ==> backgroundColor
        {
            if (nexacro._Browser_ColorAlpha)
            {
                nexacro._getSupportedWebGradient = function (val)
                {
                    var props = val.substring(val.indexOf("(") + 1, val.lastIndexOf(")")).trim().split(/\s?,\s?/);
                    var color = props[0];
                    if (color.substr(0, 2) == "to")
                        color = props[1].trim();
                    var pos = color.indexOf(" ");
                    if (color.indexOf(" ") > 0)
                        return color.substr(0, pos);
                    return color;
                };
            }
            else
            {
                nexacro._getSupportedWebGradient = function (val)
                {
                    var props = val.substring(val.indexOf("(") + 1, val.lastIndexOf(")")).trim().split(",");
                    var color = props[0].trim();
                    if (color.substr(0, 2) == "to")
                        color = props[1].trim();
                    var pos = color.indexOf(" ");
                    if (color.indexOf(" ") > 0)
                        return nexacro._getSupportedWebColor(color.substr(0, pos));
                    return nexacro._getSupportedWebColor(color);
                };
            }
        }

        if (nexacro._Browser == "Chrome")
        {
            nexacro._getSupportedImageUrl = function (url, baseurl)
            {
                if (url && url.substring(0, 17) == "data:image;base64")
                {
                    return "data:image/*;base64" + url.substr(17, url.length - 1);
                }
                return nexacro._getSupportedImageLocation(nexacro._getURIValue(url), baseurl);
            };
        }
        else
        {
            nexacro._getSupportedImageUrl = function (url, baseurl)
            {
                if (url && url.substring(0, 17) == "data:image;base64")
                {
                    return url;
                }
                return nexacro._getSupportedImageLocation(nexacro._getURIValue(url), baseurl);
            };
        }

        nexacro._getSupportedImageLocation = function (str, baseurl)
        {
			var url = str;

        	//var application = nexacro.getApplication();
        	//if (application)
        	//{				
			//	if (application.images[str])
        	//		baseurl = nexacro._project_url + application._globalvar_uri;			
			//}

        	typedefinition_url = nexacro._typedefinition_url;

        	if (!baseurl)
        		baseurl = nexacro._project_url;

        	return nexacro._transurl(baseurl, typedefinition_url, url);
        };
		       
       

        //==============================================================================
        if (nexacro._Browser_ColorAlpha)
        {
            nexacro._getWebColorFromXreColor = function (color)
            {
                var v = nexacro._xreNamedColorList[color];
                if (v)
                {
                    return v;
                }

                var len = color.length;
                if (color.substring(0, 1) == '#')
                {
                    if (len == 7)
                    { // "#00ff00"
                        return color;
                    }
                    if (len == 9)
                    { // "#00ff00ff"
                        var alpha = color.substring(7);
                        if (alpha == "00")
                        {
                            return "transparent";
                        }
                        else
                        {
                            var str = "rgba(";
                            str += parseInt(color.substring(1, 3), 16) + ',';
                            str += parseInt(color.substring(3, 5), 16) + ',';
                            str += parseInt(color.substring(5, 7), 16) + ',';
                            str += (parseInt(alpha, 16) / 255);
                            str += ")";
                            return str;
                        }
                    }
                }
                if (color.substring(0, 2) == "0x")
                {
                    if (len == 8)
                    { // "0x00ff00"
                        return "#" + color.substring(2);
                    }
                    if (len == 10)
                    { // "0x00ff00ff"
                        var alpha = color.substring(8);
                        if (alpha == "00")
                        {
                            return "transparent";
                        }
                        else
                        {
                            var str = "rgba(";
                            str += parseInt(color.substring(2, 4), 16) + ',';
                            str += parseInt(color.substring(4, 6), 16) + ',';
                            str += parseInt(color.substring(6, 8), 16) + ',';
                            str += (parseInt(alpha, 16) / 255);
                            str += ")";
                            return str;
                        }
                    }
                }
                return "";
            };
        }
        else
        {
            nexacro._getWebColorFromXreColor = function (color)
            {
                var v = nexacro._xreNamedColorList[color];
                if (v)
                {
                    return v;
                }

                var len = color.length;
                if (color.substring(0, 1) == '#')
                {
                    if (len == 7)
                    { // "#00ff00"
                        return color;
                    }
                    if (len == 9)
                    { // "#00ff00ff"
                        var alpha = color.substring(7);
                        if (alpha == "00")
                        {
                            return "transparent";
                        }
                        return "#" + color.substr(1, 6);
                    }
                }
                if (color.substring(0, 2) == "0x")
                {
                    if (len == 8)
                    { // "0x00ff00"
                        return "#" + color.substring(2);
                    }
                    if (len == 10)
                    { // "0x00ff00ff"
                        var alpha = color.substring(8);
                        if (alpha == "00")
                        {
                            return "transparent";
                        }
                        return "#" + color.substring(2, 8);
                    }
                }
                return "";
            };
        }

        nexacro._getXreColorAlpha = function (color)
        {
            if (!color)
                return 255;
            if (typeof color != "string")
            {
                color = color.toString();
            }
            var v = nexacro._xreNamedColorList[color];
            if (v)
            {
                return 255;
            }
            var len = color.length;
            if (len == 7)
            { // "#00ff00"
                return 255;
            }
            if (len == 9)
            { // "#00ff00ff"
                return parseInt(color.substr(7), 16);
            }
            if (len == 8)
            { // "0x00ff00"
                return 255;
            }
            if (len == 10)
            { // "0x00ff00ff"
                return parseInt(color.substr(8), 16);
            }
            return 255;
        };

        nexacro._getXreColorOpacity = function (color)
        {
            if (!color)
                return 100;
            if (typeof color != "string")
            {
                color = color.toString();
            }
            var v = nexacro._xreNamedColorList[color];
            if (v)
            {
                return 100;
            }
            len = color.length;
            if (len == 7)
            { // "#00ff00"
                return 100;
            }
            if (len == 9)
            { // "#00ff00ff"
                return Math.round(parseInt(color.substring(7), 16) * 100 / 255);
            }
            if (len == 8)
            { // "0x00ff00"
                return 100;
            }
            if (len == 10)
            { // "0x00ff00ff"
                return Math.round(parseInt(color.substring(8), 16) * 100 / 255);
            }
            return 100;
        };

        if (nexacro._Browser == "IE")
        {
            // IE's filter color == #AARRGGBB
            nexacro._getFilterColorFromXreColor = function (color)
            {
                if (color == undefined) return;
                if (typeof color != "string")
                {
                    color = color.toString();
                }
                var v = nexacro._xreNamedColorList[color];
                if (v)
                {
                    return v;
                }
                len = color.length;
                if (len == 7)
                { // "#00ff00"
                    return "#" + color.substring(1);
                }
                if (len == 9)
                { // "#00ff00ff"
                    var alpha = color.substring(7);
                    if (alpha == "00")
                    {
                        return;
                    }
                    return "#" + alpha + color.substr(1, 6);
                }
                if (len == 8)
                { // "0x00ff00"
                    return "#" + color.substring(2);
                }
                if (len == 10)
                { // "0x00ff00ff"
                    var alpha = color.substring(8);
                    if (alpha == "00")
                    {
                        return;
                    }
                    return "#" + alpha + color.substring(2, 8);
                }
                return;
            };

            nexacro._getOpacityFilterFromXreColor = function (color)
            {
                var filterColor = nexacro._getFilterColorFromXreColor(color);
                if (filterColor)
                {
                    return ("progid:DXImageTransform.Microsoft.gradient(startColorStr=" + filterColor + ",endColorStr=" + filterColor + ")");
                }
                return "";
            };
        }
        else
        {
            nexacro._getOpacityFilterFromXreColor = function (color)
            {
                return "";
            };
        }

        //==============================================================================
        // for CSS Gradation for Web Browser
        //==============================================================================
        if (nexacro._Browser == "IE")
        {
            if (nexacro._BrowserVersion == 9)
            { // IE 9
                nexacro._makeGradationSysValue = function (cssobj)
                {
                    if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color))
                    {
                        var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
                        var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
                        var start_x = cssobj._start_x, start_y = cssobj._start_y;
                        var end_x = cssobj._end_x, end_y = cssobj._end_y;

                        if (start_color && start_x != null && start_y != null)
                        {
                            cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
                        }
                        if (end_color && end_x != null && end_y != null)
                        {
                            cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
                        }

                        //default value set
                        if (start_color && !end_color)
                        {
                            end_color = "black";
                        }
                        else if (!start_color && end_color)
                        {
                            start_color = "white";
                        }

                        var direction = "x1='" + start_x + "%' y1='" + start_y + "%' ";
                        direction += "x2='" + end_x + "%' y2='" + end_y + "%'";

                        var svgstr = "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1 1' preserveAspectRatio='none'>";
                        svgstr += "<linearGradient id='_sysgradation' gradientUnits='userSpaceOnUse' " + direction + ">";
                        svgstr += "<stop stop-color='" + start_color + "' offset='0'/><stop stop-color='" + end_color + "' offset='1'/></linearGradient>";
                        svgstr += "<rect width='1' height='1' fill='url(#_sysgradation)' />";
                        svgstr += "</svg>";

                        cssobj._sysvalue = "url(data:image/svg+xml;base64," + nexacro.base64Encode(svgstr) + ")";
                    }
                    else
                    {
                        cssobj._sysvalue = "";
                    }
                };
            }
            else if (nexacro._BrowserVersion == 10)
            { // IE 10
                nexacro._makeGradationSysValue = function (cssobj)
                {
                    if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color))
                    {
                        var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
                        var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
                        var start_x = cssobj._start_x, start_y = cssobj._start_y;
                        var end_x = cssobj._end_x, end_y = cssobj._end_y;

                        if (start_color && start_x != null && start_y != null)
                        {
                            cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
                        }
                        if (end_color && end_x != null && end_y != null)
                        {
                            cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
                        }

                        //default value set
                        if (start_color && !end_color) end_color = "black";
                        else if (!start_color && end_color) start_color = "white";

                        var val = "linear-gradient(to ";
                        if (start_x == end_x)
                        {
                            if (start_y > end_y)
                            {
                                val += "top, ";
                            }
                            else if (start_y < end_y)
                            {
                                val += "bottom, ";
                            }
                        }
                        else if (start_x > end_x)
                        {
                            if (start_y == end_y)
                            {
                                val += "left, ";
                            }
                            else if (start_y > end_y)
                            {
                                val += "top left, ";
                            }
                            else if (start_y < end_y)
                            {
                                val += "bottom left, ";
                            }
                        }
                        else if (start_x < end_x)
                        {
                            if (start_y == end_y)
                            {
                                val += "right, ";
                            }
                            else if (start_y > end_y)
                            {
                                val += "top right, ";
                            }
                            else if (start_y < end_y)
                            {
                                val += "bottom right, ";
                            }
                        }

                        val += start_color;
                        val += " 0%,";
                        // add paglist
                        if (cssobj.peglist.length)
                        {
                            var arr = cssobj._parsePegList(cssobj.peglist);
                            var len = arr.length;
                            var valarr;
                            for (var i = 0; i < len; i++)
                            {
                                valarr = arr[i];
                                val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
                            }
                        }
                        // end paglist
                        val += end_color;
                        val += " 100%)";

                        cssobj._sysvalue = val;
                    }
                    else
                    {
                        cssobj._sysvalue = "";
                    }
                };
            }
            else
                nexacro._makeGradationSysValue = nexacro._emptyFn;
        }
        else if (nexacro._Browser == "Gecko")
        {
            nexacro._makeGradationSysValue = function (cssobj)
            {
                if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color))
                {
                    var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
                    var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
                    var start_x = cssobj._start_x, start_y = cssobj._start_y;
                    var end_x = cssobj._end_x, end_y = cssobj._end_y;

                    if (start_color && start_x != null && start_y != null)
                    {
                        cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
                    }
                    if (end_color && end_x != null && end_y != null)
                    {
                        cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
                    }

                    //default value set
                    if (start_color && !end_color)
                    {
                        end_color = "black";
                    }
                    else if (!start_color && end_color)
                    {
                        start_color = "white";
                    }

                    var val = "-moz-linear-gradient(";
                    if (start_x == end_x)
                    {
                        if (start_y > end_y)
                        {
                            val += "to top, ";
                        }
                        else if (start_y < end_y)
                        {
                            val += "to bottom, ";
                        }
                        else if (start_y == end_y)
                        {
                            val += "center, ";
                        }
                    }
                    else if (start_x > end_x)
                    {
                        if (start_y == end_y)
                        {
                            val += "to left, ";
                        }
                        else if (start_y > end_y)
                        {
                            val += "to top left, ";
                        }
                        else if (start_y < end_y)
                        {
                            val += "to bottom left, ";
                        }
                        else
                        {
                            val += "center, ";
                        }
                    }
                    else if (start_x < end_x)
                    {
                        if (start_y == end_y)
                        {
                            val += "to right, ";
                        }
                        else if (start_y > end_y)
                        {
                            val += "to top right, ";
                        }
                        else if (start_y < end_y)
                        {
                            val += "to bottom right, ";
                        }
                        else
                        {
                            val += "center, ";
                        }
                    }

                    val += start_color;
                    val += " 0%,";
                    // add paglist
                    if (cssobj.peglist.length)
                    {
                        var arr = cssobj._parsePegList(cssobj.peglist);
                        var len = arr.length;
                        var valarr;
                        for (var i = 0; i < len; i++)
                        {
                            valarr = arr[i];
                            val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
                        }
                    }
                    // end paglist
                    val += end_color;
                    val += " 100%)";

                    cssobj._sysvalue = val;
                }
                else
                {
                    cssobj._sysvalue = "";
                }
            };
        }
        else if (nexacro._Browser == "WebKit" || nexacro._Browser == "Chrome" || nexacro._Browser == "MobileSafari" || nexacro._Browser == "Safari")
        { // webkit, chrome
            nexacro._makeGradationSysValue = function (cssobj)
            {
                if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color))
                {
                    var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
                    var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
                    var start_x = cssobj._start_x, start_y = cssobj._start_y;
                    var end_x = cssobj._end_x, end_y = cssobj._end_y;

                    if (start_color && start_x != null && start_y != null)
                    {
                        cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
                    }
                    if (end_color && end_x != null && end_y != null)
                    {
                        cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
                    }

                    //default value set
                    if (start_color && !end_color)
                    {
                        end_color = "black";
                    }
                    else if (!start_color && end_color)
                    {
                        start_color = "white";
                    }

                    var val = "-webkit-gradient(linear,";
                    val += start_x + "% " + start_y + "%,";
                    val += end_x + "% " + end_y + "%,";
                    val += "from(";
                    val += start_color;
                    val += "),";
                    // add paglist
                    if (cssobj.peglist.length)
                    {
                        var arr = cssobj._parsePegList(cssobj.peglist);
                        var len = arr.length;
                        var valarr;
                        for (var i = 0; i < len; i++)
                        {
                            valarr = arr[i];
                            val += "color-stop(" + valarr[0] + "%," + nexacro._getWebColorFromXreColor(valarr[1]) + "),";
                        }
                    }
                    // end paglist
                    val += "to(";
                    val += end_color;
                    val += "))";
                    cssobj._sysvalue = val;
                }
                else
                {
                    cssobj._sysvalue = "";
                }
            };
        }
        else if (nexacro._Browser == "Opera")
        { // opera
            nexacro._makeGradationSysValue = function (cssobj)
            {
                if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color))
                {
                    var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
                    var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
                    var start_x = cssobj._start_x, start_y = cssobj._start_y;
                    var end_x = cssobj._end_x, end_y = cssobj._end_y;

                    if (start_color && start_x != null && start_y != null)
                    {
                        cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
                    }
                    if (end_color && end_x != null && end_y != null)
                    {
                        cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
                    }

                    //calculate degree
                    var dx = end_x - start_x;
                    var dy = end_y - start_y;
                    var ang = (((Math.atan2(dx, dy)) * 180) / Math.PI) - 90;
                    if (ang == NaN) ang = 45;

                    //default value set
                    if (start_color && !end_color) end_color = "black";
                    else if (!start_color && end_color) start_color = "white";

                    var val = "-o-linear-gradient(";
                    val += ang + "deg, ";

                    val += start_color;
                    val += " 0%,";
                    // add paglist
                    if (cssobj.peglist.length)
                    {
                        var arr = cssobj._parsePegList(cssobj.peglist);
                        var len = arr.length;
                        var valarr;
                        for (var i = 0; i < len; i++)
                        {
                            valarr = arr[i];
                            val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
                        }
                    }
                    // end paglist
                    val += end_color;
                    val += " 100%)";
                    cssobj._sysvalue = val;
                }
                else
                {
                    cssobj._sysvalue = "";
                }
            };
        }
        else
        {
            nexacro._makeGradationSysValue = nexacro._emptyFn;
        }

        //==============================================================================
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 9)
        { // IE 7,8
            nexacro._getSupportedWebCursor = function (cursor)
            {
                if (cursor == "auto")
                {
                    return "default";
                }
                else if (cursor == "no")
                {
                    return "not-allowed"; // it was not work in opera
                }
                //else if (cursor == "pointer")
                //{
                //    // For MS old browser(ie6, 7, 8)
                //    return "hand";
                //}
                //else if (cursor == "arrowwait")
                //{
                //    return "progress";
                //}
                //else if (cursor == "arrow")
                //{
                //    return "default";
                //}
                //else if (cursor == "coll-resize" || cursor == "colr-resize")
                //{
                //    return "col-resize";
                //}
                //else if (cursor == "rowt-resize" || cursor == "rowb-resize")
                //{
                //    return "row-resize";
                //}
                /*
	            else if (cursor == "e-resize" || cursor == "w-resize")
	            {
	                return "col-resize";
	            }
	            else if (cursor == "n-resize" || cursor == "s-resize")
	            {
	                return "row-resize";
	            }
                */
                return cursor ? cursor : "default";
            };
        }
        else
        {
            nexacro._getSupportedWebCursor = function (cursor)
            {
                if (cursor == "auto")
                {
                    return "default";
                }
                //else if (cursor == "no")
                //{
                //    return "not-allowed"; // it was not work in opera
                //}
                //else if (cursor == "hand")
                //{
                //    return "pointer";
                //}
                //else if (cursor == "text")
                //{
                //    return "text";
                //}
                //else if (cursor == "arrow")
                //{
                //    return "default";
                //}
                //else if (cursor == "arrowwait")
                //{
                //    return "progress";
                //}
                //else if (cursor == "coll-resize" || cursor == "colr-resize")
                //{
                //    return "col-resize";
                //}
                //else if (cursor == "rowt-resize" || cursor == "rowb-resize")
                //{
                //    return "row-resize";
                //}
                /*
	            else if (cursor == "e-resize" || cursor == "w-resize")
	            {
	                return "col-resize";
	            }
	            else if (cursor == "n-resize" || cursor == "s-resize")
	            {
	                return "row-resize";
	            }
                */
                return cursor ? cursor : "default";
            };
        }

        //==============================================================================
        //==============================================================================
        // by ODH : IE10에서 Popup Window에 setInterval 시 closure로 생성한 callback function 진입 시 스크립트 오류 발생함.
        //          Script Context의 문제로 보이는데 IE10 이상에서만 발생하며 Expression 방식으로 callback을 전달하면 괜찮다.
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 10)
        {
            nexacro._initHTMLSysTimerManager = function (_cur_win)
            {
                nexacro._createSysTimer_CallbackFuncs(_cur_win);
                _cur_win.nexacro_HTMLSysTimerManager = new nexacro.HTMLSysTimerManager(_cur_win);
            };
            nexacro._finalizeHTMLSysTimerManager = function (_cur_win)
            {
                _cur_win.nexacro_HTMLSysTimerManager = null;
            };

            nexacro.HTMLSysTimerManager = function (_cur_win)
            {
                this._cur_win = _cur_win;
                this._timer_idno = 0;
                this._timers = [];

                this._syshandler_timercallback = _cur_win._syshandler_timercallback;
                _cur_win._syshandler_timercallback = null;
            };
            var _pHTMLSysTimerManager = nexacro.HTMLSysTimerManager.prototype;

            _pHTMLSysTimerManager.setInterval = function (timerfn, interval)
            {
                var timeritem = null;
                var tid = Math.max((this._timer_idno + 1) | 0, 1);
                while ((timeritem = this._timers[tid])) { tid = Math.max((tid + 1) | 0, 1); };

                this._timer_idno = tid;
                this._timers[tid] = { "id": "", "callback": timerfn };

                var sys_tid = this._cur_win.setInterval("nexacro_HTMLSysTimerManager._syshandler_timercallback(" + tid + ")", interval);
                this._timers[tid].id = sys_tid;
                return tid;
            };
            _pHTMLSysTimerManager.clearInterval = function (timerid)
            {
                var sys_tid = this._timers[timerid].id;
                this._cur_win.clearInterval(sys_tid);

                delete this._timers[timerid];
            };

            nexacro._createSysTimer_CallbackFuncs = function (_cur_win)
            {
                _cur_win._syshandler_timercallback = function ()
                {
                    if (arguments.length > 0)
                    {
                        var tid = arguments[0];
                        var callback = _cur_win.nexacro_HTMLSysTimerManager._timers[tid].callback;
                        if (callback)
                        {
                            try
                            {
                                callback.apply(null, arguments);
                            }
                            catch (e)
                            {
                                var sys_tid = _cur_win.nexacro_HTMLSysTimerManager._timers[tid].id;
                                _cur_win.clearInterval(sys_tid);
                                delete _cur_win.nexacro_HTMLSysTimerManager._timers[tid];
                            }
                        }
                    }
                };
            };

            nexacro._setSystemTimer = function (_win_handle, timerfn, interval)
            {
                if (_win_handle)
                {
                    return _win_handle.nexacro_HTMLSysTimerManager.setInterval(timerfn, interval);
                }
                return null;
            };
            nexacro._clearSystemTimer = function (_win_handle, timer_handle)
            {
                if (_win_handle)
                {
                    _win_handle.nexacro_HTMLSysTimerManager.clearInterval(timer_handle);
                }
            };
        }
        else
        {
            nexacro._initHTMLSysTimerManager = nexacro._emptyFn;
            nexacro._finalizeHTMLSysTimerManager = nexacro._emptyFn;

            nexacro._setSystemTimer = function (_win_handle, timerfn, interval)
            {
                if (_win_handle) // && typeof _win_handle.setInterval != "undefined")
                {
                    return _win_handle.setInterval(timerfn, interval);
                }
                return null;
            };
            nexacro._clearSystemTimer = function (_win_handle, timer_handle)
            {
                if (_win_handle)
                {
                    _win_handle.clearInterval(timer_handle);
                }
            };
        }

        // 경로에 마지막"/"을 포함한다.
        nexacro._getProjectBaseURL = function (url)
        {
            var location = window.location.href;
            if (location.length > 0)
            {
                return location.substring(0, location.lastIndexOf("/") + 1);
            }

            return "";
        };

        nexacro._checkLicense = nexacro._emptyFn;
        nexacro._updateEngine = nexacro._emptyFn;
        nexacro._addUpdateResoruce = nexacro._emptyFn;
        nexacro._updateResource = nexacro._emptyFn;

        nexacro._checkActiveElement = function (element)
        {
            var _doc = element._getRootWindowHandle();
            if (!_doc)
                return false;
            var win = nexacro._findDocumentWindow(_doc);
            if (!win)
                return false;

            if (!win._is_active_window)
                return false;

            return (_doc.activeElement == element.input_handle) ? true : false;
        };

        nexacro._loadImageURL = function (source, target, handler)
        {
            var handle = nexacro.ImageElement(target.getElement());
            handle.setElementImageUrl(source);
            handler.call(target, errorcode, errormsg, source, source);
            return handle;
        };

        nexacro._loadImageBase64 = function (source, target, handler)
        {
            var data = source.toString();
            var handle = nexacro.ImageElement(target.getElement());

            if (data.substring(0, 5) == "data:")
                data = source;
            else
                data = "data:image/png;base64," + source;

            handle.setElementImageUrl(data);

            handler.call(target, errorcode, errormsg, source, data);
            return handle;
        };

        nexacro._convertRealPath = function (path)
        {
            //return 0;
        };

        nexacro._execBrowser = function (url)
        {
            var _url = url.toLowerCase();

            var prefix = "mailto:";
            var reg = new RegExp(prefix);
            if (reg.test(_url))
            {
                var iframe = document.createElement("iframe");
                var body = document.body;
                iframe.src = prefix + url.substring(7, url.length);
                iframe.style.display = "none";

                nexacro.__setDOMNode_Title(iframe, "");

                body.appendChild(iframe);
                nexacro.__removeDOMNode(body, iframe);
                iframe = null;
                return 0;
            }

            reg = new RegExp("tel:");
            if (reg.test(_url))
            {
                window.open(url);
                return 0;
            }

            url = nexacro._getImageLocation(nexacro._checkDomain(url));
            window.open(url);
            return 0;
        };

        nexacro._checkDomain = function (url)
        {
        	// 특정 url이 match에서 정규식 복잡도로 인해 수행 시간 지연되는 현상
        	//var expr = new RegExp("^(https?:\\/\\/)?((([a-z\d](([a-z\d-]*[a-z\d])|([ㄱ-힣]))*)\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$");
        	var expr = new RegExp("^(https?:\\/\\/)");
        	if (!expr.test(url))
        	{
        		return "http://" + url;
        	}
        	return url;
        }

        nexacro._execShell = function ()
        {
        };

        nexacro._execNexacro = function (command)
        {
        };

        nexacro._setClipboard = function (format, data)
        {
            if (window.clipboardData)
            {
                if (format == "CF_TEXT")
                    window.clipboardData.setData("text", data);
            }
        };

        nexacro._getClipboard = function (format)
        {
            var retVal = "";
            if (window.clipboardData)
            {
                if (format == "CF_TEXT")
                    retVal = window.clipboardData.getData("text");
                return retVal;
            }
        };

        nexacro._clearClipboard = function ()
        {
            if (window.clipboardData)
            {
                window.clipboardData.clearData("text");
            }
        };

        nexacro._getScreenWidth = function (monitor_index)
        {
            if (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Chrome")
            {
                // orientation값만 바뀌고 screen 바뀌지 않는 케이스가 발견됨.
                // 세로로 길쭉한 장비가 확실한 경우, 직접 값을 swap해서 넘기도록...
                var is_portrait_device = nexacro._searchDeviceExceptionValue("is_portrait_device");
                if (is_portrait_device === true)
                {
                    var orientation = nexacro._getMobileOrientation();
                    var is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
                    var is_delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
                    if (orientation == 2 || orientation == 3) // landscape
                    {
                        if (is_swap_screen === true && !is_delayed_swap_screen)
                        {
                            // swap되어서 w>h 이어야 하는 상황인데 그렇지 않음->오류상황
                            if (screen.width < screen.height)
                                return screen.height;
                        }
                    }
                }
            }

            return screen.width;
        };

        nexacro._getScreenHeight = function (monitor_index)
        {
            if (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Chrome")
            {
                // orientation값만 바뀌고 screen 바뀌지 않는 케이스가 발견됨.
                // 세로로 길쭉한 장비가 확실한 경우, 직접 값을 swap해서 넘기도록...
                var is_portrait_device = nexacro._searchDeviceExceptionValue("is_portrait_device");
                if (is_portrait_device === true)
                {
                    var orientation = nexacro._getMobileOrientation();
                    var is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
                    var is_delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
                    if (orientation == 2 || orientation == 3) // landscape
                    {
                        if (is_swap_screen === true && !is_delayed_swap_screen)
                        {
                            // swap되어서 w>h 이어야 하는 상황인데 그렇지 않음->오류상황
                            if (screen.width < screen.height)
                                return screen.width;
                        }
                    }
                }
            }

            return screen.height;
        };

        nexacro._getScreenAvailWidth = function (monitor_index)
        {
            return screen.availWidth;
        };

        nexacro._getScreenAvailHeight = function (monitor_index)
        {
            return screen.availHeight;
        };

        nexacro._getScreenRect = function (monitor_index)
        {
            return new nexacro.Rect(0, 0, screen.width, screen.height);
        };

        nexacro._isPrimaryMonitor = function (monitor_index)
        {
            //
        };

        nexacro._getMonitorIndex = function (cursorX, cursorY)
        {
            //
        };

        //system.osversion
        nexacro._getOS = function ()
        {
            return nexacro._OS;
        };

        nexacro._getOSVersion = function ()
        {
            if (nexacro._OS.indexOf("Win") >= 0)
            {
                //getOSVer //OS 사용량이 많은순으로 검색 7->XP->8->etc..
                switch (nexacro._OSVersion)
                {
                    case "5.0":
                        return "Windows 2000";
                    case "5.01":
                        return "Windows 2000, Service Pack 1 (SP1)";
                    case "5.1":
                        return "Windows XP";
                    case "5.2":
                        return "Windows Server 2003 / Windows XP 64-bit";
                    case "6.0":
                        return "Windows Vista";
                    case "6.1":
                        return "Windows 7";
                    case "6.2":
                        return "Windows 8";
                }
            }

            if (!nexacro._OS) return;
            return (nexacro._OSVersion ? (nexacro._OS + " " + nexacro._OSVersion) : nexacro._OS);
        };

        nexacro._getTaskbarSize = function ()
        {
            return 0;
        };

        //system.computername
        nexacro._getComputerName = function ()
        {
            return "";
        };

        nexacro._getCPUArchitecture = function ()
        {
            return "UNKNOWN";
        };

        nexacro._getCPUCount = function ()
        {
            return 1;
        };

        nexacro._getCPUType = function ()
        {
            return "UNKNOWN PROCESSOR";
        };

        nexacro._getLocale = function ()
        {
            return nexacro._BrowserLang;
        };
        nexacro._getLanguage = function ()
        {
            var arr = nexacro._BrowserLang.split('-');    // ko-KR
            return arr ? arr[0] : 'en';
        };

        nexacro._getLoginUser = function ()
        {
            return "";
        };

        nexacro._getMobileOrientation = function ()
        {
            var orientation;
            if (!nexacro._isTouchInteraction)
            {
                orientation = 4;//"resize";
            }
            else
            {
                //mobile 처리 필요
                var o = window ? window.orientation : 0;
                if (o == 90)
                {
                    orientation = 3;//"LandscapeLeft";
                }
                else if (o == -90)
                {
                    orientation = 2;//"LandscapeRight";
                }
                else if (o == 180)
                {
                    orientation = 1;//"ReversePortrait";
                }
                else
                {
                    orientation = 0;
                }
            }

            return orientation;
        };



        nexacro._getMobilePhoneNumber = function ()
        {
            return "";
        };

        nexacro._getMobileProductType = function ()
        {
            return nexacro._DEVICE;
        };

        nexacro._getMobileUniqueID = function ()
        {
            return "";
        };

        nexacro._getMonitorCount = function ()
        {
            return 1;
        };

        nexacro._getNavigatorName = function ()
        {
            //2013.03.19 yjoh - add NavigatorName for iphone/ipad
            /*
	        if ((/(iPhone\sOS)\s([\d_]+)/).test(navigator.userAgent))
	        {
	            return "nexacro";
      	    }
	        else if ((/(iPad).*OS\s([\d_]+)/).test(navigator.userAgent))
	        {
	            return "nexacro";
            }
	        else
	        {
	            return nexacro._Browser;
            }
          */

            return nexacro._Browser;
        };

		//추후 삭제
		/*
        nexacro._getCurrentScreenID = function ()
        {
            if (application._curscreen)
                return application._curscreen.name;

            // TODO 일단 현재는 HTML버젼 Screen Simulation은 지원하지 않음
            return application._simulator_screenid;
        };
		*/

        nexacro._getCursorX = function (e)
        {
            var x;
            if (window.event)
                x = window.event.screenX;
            else //firefox 일경우
                return e ? e.screenX : undefined;
            return x;
        };

        nexacro._getCursorY = function (e)
        {
            var y;
            if (window.event)
                y = window.event.screenY;
            else //firefox 일경우
                return e ? e.screenY : undefined;
            return y;
        };

        if ((nexacro._Browser == "IE" && nexacro._BrowserVersion < 9))
        {
            nexacro._fireBeforeDblclick = function (comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
            {
                var win = comp._getWindow();
                comp._on_lbuttondown(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, undefined, null, comp);
                win._on_default_sys_lbuttonup(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
                comp._on_lbuttonup(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, undefined, null, comp, comp._control_element);
                comp._on_click(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
            };
        }
        else
        {
            nexacro._fireBeforeDblclick = nexacro._emptyFn;
        }

        nexacro._getCompOffsetSize = function (comp)
        {
            var elem = comp._control_element;
            var offs = {};
            if (!comp || !comp._control_element)
            {
                offs.width = 0;
                offs.height = 0;
            }
            else
            {
                //var p = nexacro._getElementPositionInFrame(elem);
                var w = comp._getWindow();
                offs.width = w.getWidth() - (parseInt(elem.left) | 0);
                offs.height = w.getHeight() - ((parseInt(elem.top) | 0) + (parseInt(elem.height) | 0));
            }
            return offs;
        };

        //high contrast
        if (nexacro._Browser == "IE" && nexacro._BrowserVersion > 9)
        {
            nexacro.__checkHighContrast = function ()
            {
                if (window.matchMedia("screen and (-ms-high-contrast)").matches)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            };
        }
        else if (nexacro._Browser == "IE")
        {
            nexacro.__checkHighContrast = function ()
            {
                var _doc = window.document;
                if (_doc)
                {
                    var _usehighcontrast = false;
                    if (!_doc.getElementById('styleTest'))
                    {
                        var css = _doc.createElement("style");
                        css.type = "text/css";
                        css.id = "styleTest";
                        var styles = ".checkHighContrast {background : red;}";
                        styles += "@media screen and (-ms-high-contrast:active) {.checkHighContrast  { background : white;}}";
                        if (css.styleSheet) css.styleSheet.cssText = styles;
                        else css.appendChild(_doc.createTextNode(styles));
                        var headRef = _doc.getElementsByTagName('head')[0];
                        if (headRef)
                            headRef.appendChild(css);
                    }
                    var handle = _doc.createElement("div");
                    if (handle && _doc.body)
                    {
                        _doc.body.appendChild(handle);
                        handle.className = "checkHighContrast";
                        var color = handle.currentStyle.getAttribute("backgroundColor");
                        if (color != "red")
                        {
                            _usehighcontrast = true;
                        }

                        //delete handle
                        _doc.body.removeChild(handle);
                    }
                    return _usehighcontrast;
                }

                return false;
            };
        }
        else
        {
            nexacro.__checkHighContrast = function ()
            {
                return false;
            };
        }

        nexacro._adjustPopupPosition = function (comp, x, y, align)
        {
            var alignPosition = comp._getAlignPosition(x, y, align);

            var _width = comp._width;
            var _height = comp._height;
            var _left = alignPosition[0];
            var _top = alignPosition[1];
            var mainframe = comp._getMainFrame();
            var screenXY = nexacro._getElementScreenPosition(mainframe._control_element);
            var m_screenX = screenXY.x;
            var m_screenY = screenXY.y;

            var m_c_width = mainframe._adjust_width;
            var m_c_height = mainframe._adjust_height;

            if (_left < m_screenX)
            {
                _left = m_screenX;
            }
            else if (_left + _width >= m_screenX + m_c_width)
            {
                _left = m_screenX + m_c_width - _width;
            }

            if (_top < m_screenY)
            {
                _top = m_screenY;
            }
            else if (_top + _height >= m_screenY + m_c_height)
            {
                _top = m_screenY + m_c_height - _height;
            }
            comp._popup(_left, _top, _width, _height);
        };

        if (nexacro._Browser == "IE")
        {
            if (nexacro._OSVersion >= 6.0)	// XP later
            {
                nexacro._roleList =
                 {    //nexacro role : present role , //problem - checked
                     "alert": "alert",
                     "application": "application",
                     "button": "button",
                     "calendar": "document",
                     "chart": "document",
                     "checkbox": "checkbox",
                     "columnheader": "document",
                     "combobox": "combobox",
                     "datepicker": "document",
                     "dialog": "dialog",
                     "edit": "textbox",
                     "fileupload": "document",
                     "form": "document",
                     "frame": "document",
                     "grid": "document",
                     "gridcell": "gridcell",
                     "groupbox": "group",
                     "image": "img",
                     "listbox": "listbox",
                     "listboxitem": "listitem",
                     "menubar": "menubar",
                     "menu": "menu",
                     "menuitem": "menuitem",
                     "none": "document",
                     "progressbar": "document", //sensereader bug
                     //"radio": "radiogroup",
                     "radio": "document",
                     "radioitem": "radio",
                     "rowheader": "document",
                     "scrollbar": "scrollbar",
                     "slider": "slider",
                     "spin": "spinbutton",
                     "splitter": "document",
                     "static": "document",
                     "statusbar": "status",
                     "step": "document",
                     "tab": "tablist",
                     "tabitem": "tab",
                     "tabpage": "tabpanel",
                     "textbox": "textbox",
                     "titlebar": "region",
                     "toolbar": "toolbar",
                     "tooltip": "tooltip",
                     "treegrid": "tree",
                     "treeitem": "treeitem",
                     "webbrowser": "document",
                     "link": "link",
                     "heading": "document"
                 };
            }
            else	//windows XP
            {
                nexacro._roleList =
				 {    //nexacro role : present role , //problem - checked
				     "alert": "alert",
				     "application": "application",
				     "button": "button",
				     "calendar": "alert",
				     "chart": "alert",
				     "checkbox": "checkbox",
				     "columnheader": "alert",
				     "combobox": "combobox",
				     "datepicker": "alert",
				     "dialog": "dialog",
				     "edit": "textbox",
				     "fileupload": "alert",
				     "form": "alert",
				     "frame": "alert",
				     "grid": "alert",
				     "gridcell": "gridcell",
				     "groupbox": "group",
				     "image": "img",
				     "listbox": "listbox",
				     "listboxitem": "listitem",
				     "menubar": "menubar",
				     "menu": "menu",
				     "menuitem": "menuitem",
				     "none": "alert",
				     "progressbar": "alert", //sensereader bug
				     //"radio": "radiogroup",
				     "radio": "alert",
				     "radioitem": "radio",
				     "rowheader": "alert",
				     "scrollbar": "scrollbar",
				     "slider": "slider",
				     "spin": "spinbutton",
				     "splitter": "alert",
				     "static": "alert",
				     "statusbar": "status",
				     "step": "alert",
				     "tab": "tablist",
				     "tabitem": "tab",
				     "tabpage": "tabpanel",
				     "textbox": "textbox",
				     "titlebar": "region",
				     "toolbar": "toolbar",
				     "tooltip": "tooltip",
				     "treegrid": "tree",
				     "treeitem": "treeitem",
				     "webbrowser": "alert",
				     "link": "link",
				     "heading": "alert"
				 };
            }
        }
        else if (nexacro._Browser == "Gecko")
        {
            nexacro._roleList =
            {    //nexacro role : present role , //problem - checked
                "alert": "alert",
                "application": "application",
                "button": "button",
                "calendar": "",
                "chart": "",
                "checkbox": "checkbox",
                "columnheader": "",
                "combobox": "combobox",
                "datepicker": "",
                "dialog": "dialog",
                //"edit": "textbox",
                "fileupload": "",
                "form": "",
                "frame": "",
                "grid": "",
                "gridcell": "gridcell",
                "groupbox": "group",
                "image": "img",
                "listbox": "listbox",
                "listboxitem": "option",
                "menubar": "menubar",
                "menu": "menu",
                "menuitem": "menuitem",
                "none": "",
                "progressbar": "", //sensereader bug
                //"radio": "radiogroup",
                "radio": "document",
                "radioitem": "radio",
                "rowheader": "",
                "scrollbar": "scrollbar",
                "slider": "slider",
                "spin": "spinbutton",
                "splitter": "",
                "static": "",
                "statusbar": "status",
                "step": "",
                "tab": "tablist",
                "tabitem": "tab",
                "tabpage": "tabpanel",
                //"textbox": "textbox",
                "textbox": "textbox",
                "titlebar": "region",
                "toolbar": "toolbar",
                "tooltip": "tooltip",
                "treegrid": "treegrid",
                "treeitem": "treeitem",
                "webbrowser": "",
                "link": "link",
                "heading": ""
            };
        }
        else
        {
            nexacro._roleList =
            {    //nexacro role : present role , //problem - checked
                "alert": "alert",
                "application": "application",
                "button": "button",
                "calendar": "document",
                "chart": "",
                "checkbox": "checkbox",
                "columnheader": "",
                "combobox": "combobox",
                "datepicker": "",
                "dialog": "dialog",
                //"edit": "textbox",
                "fileupload": "",
                "form": "",
                "frame": "",
                "grid": "",
                "gridcell": "gridcell",
                "groupbox": "group",
                "image": "img",
                "listbox": "listbox",
                "listboxitem": "option",
                "menubar": "menubar",
                "menu": "menu",
                "menuitem": "menuitem",
                "none": "",
                "progressbar": "", //sensereader bug
                //"radio": "radiogroup",
                "radio": "document",
                "radioitem": "radio",
                "rowheader": "",
                "scrollbar": "scrollbar",
                "slider": "slider",
                "spin": "spinbutton",
                "splitter": "",
                "static": "",
                "statusbar": "status",
                "step": "",
                "tab": "tablist",
                "tabitem": "tab",
                "tabpage": "tabpanel",
                //"textbox": "textbox",
                "titlebar": "region",
                "toolbar": "toolbar",
                "tooltip": "tooltip",
                "treegrid": "treegrid",
                "treeitem": "treeitem",
                "webbrowser": "",
                "link": "link",
                "heading": ""
            };
        }

        nexacro.__setEnableAccessibility = nexacro._emptyFn;
        nexacro.__setAccessibilityType = nexacro._emptyFn;
        nexacro._observeGlobalEvent = nexacro._emptyFn;
        nexacro._stopGlobalEvent = nexacro._emptyFn;
        nexacro._setBrowserErrorMsg = nexacro._emptyFn;
        nexacro._initApplication = nexacro._emptyFn;
        nexacro._refreshWindowRegion = nexacro._emptyFn;

        nexacro._appliedTitleBarHeight = function (frame, h)
        {
            return (frame && frame._is_window) ? 0 : h;
        };

        nexacro._appliedStatusBarHeight = function (frame, h)
        {        	
            return (frame && frame._is_window) ? 0 : h;
        };

        nexacro._isShowTitleBar = function (frame, show)
        {
			return (frame && frame._is_window) ? false: show;
        };

        nexacro._isShowStatusBar = function (frame, show)
        {
			return (frame && frame._is_window) ? false: show;
        };

        nexacro._isPluginMode = function ()
        {
            return false;
        };

        nexacro._isMobile = function ()
        {
            var uA = navigator.userAgent.toLowerCase();
            // android mobile 이면 안드로이드 폰.
            if (uA.indexOf("mobile") >= 0)
                return true;
            return false;
        };

        nexacro._isHybrid = function ()
        {
        	return false;
        };

        nexacro._getUserAgent = function ()
        {
            return navigator.userAgent;
        };

        nexacro._refreshCaret = function ()
        {
            //var refresh_node = document.createElement("div");
            //refresh_node.id = "iOS_refesh_node";
            //document.body.appendChild(refresh_node);
            //nexacro._OnceCallbackTimer.callonce("", function ()
            //{
            //    document.body.removeChild(refresh_node);
            //    refresh_node = null;
            //});
        };

        nexacro._deleteRefreshNode = function ()
        {
            var refresh_node = document.getElementById("iOS_refresh_node");
            if (refresh_node)
            {
                document.body.removeChild(refresh_node);
                refresh_node = null;
            }
        };

        nexacro._applyZoomEdge = function (control_elem, v)
        {
            var edge = control_elem._bkimage_elem;

            if (edge)
            {
                var x = edge._edgex, y = edge._edgey;
                var edgewidth = 0, edgeheight = 0;

                x = Math.ceil(x * v / 100);
                y = Math.ceil(y * v / 100);
                if (edge.parent)
                {
                    edgewidth = edge.parent._node_width;
                    edgeheight = edge.parent._node_height;
                }
                nexacro.__setDOMStyle_EdgeBorder(edge.handle.style, edge._img_url, edge._edgex, edge._edgey, x, y);
                nexacro.__setDOMStyle_Size(edge.handle.style, edgewidth - x * 2, edgeheight - y * 2);
            }
        };

        // dataprotocol
        nexacro._isRuntimeProtocol = function ()
        {
        	return false;
        };

        nexacro._setProtocolVar = nexacro._emptyFn;

        nexacro._createdContents = function (form)
        {
        	var _window = form._getWindow();

        	_window.handle.__clearGC();  //IE8에서 gc에 있는 node때문에 getElementByID에 잘못된 handle 이 넘어옴

            var control_elem = form._control_element;
            var step_count = control_elem._step_count;
            if (step_count)
            {
                var arr_step_str = [];
                var arr_all_str = "";
                for (var i = 0; i < step_count; i++)
                {
                    arr_step_str[i] = "";
                }
                var comps = form.components;
                var len = comps.length;
                for (var i = 0; i < len; i++)
                {
                    var comp = comps[i];
                    var position_step = comp.getElement().position_step;
                    if (position_step < 0)
                        arr_all_str += comp.createCommand();
                    else
                        arr_step_str[position_step] += comp.createCommand();
                }

                for (var i = 0; i < step_count; i++)
                {
                    var container = control_elem.getContainerElement(i);
                    var dest_handle = container.dest_handle;
                    dest_handle.innerHTML = arr_all_str + arr_step_str[i];
                }

                for (var i = 0; i < len; i++)
                {
                    comps[i].attachHandle(_window);
                }
            }
            else
            {
            	

                var container = control_elem.getContainerElement();
                var dest_handle = container.dest_handle;

                var comps = form.components;
                var len = comps.length;
                var str = "";
                for (var i = 0; i < len; i++)
                {
                    str += comps[i].createCommand();
                }
                dest_handle.innerHTML = str;

                for (var i = 0; i < len; i++)
                {
                    comps[i].attachHandle(_window);
                }
            }
        };

     /*   nexacro._createdContents = function (form)
        {
        	var _window = form._getWindow();
        	var comps = form.components;
        	var len = comps.length;
        	for (var i = 0; i < len; i++)
        	{
        		comps[i].on_created(_window);
        	}
        };
*/
        nexacro._setProjectURL = function (url)
        {
			var projecturl = nexacro._getProjectBaseURL(url);
        	nexacro._project_url = ".";
        	nexacro._project_absolutepath = projecturl;
			return projecturl;
			//nexacro._getProjectBaseURL(projecturl);
        };


    	// env 초기화 
    	//screen 결정 후 screen별 env 설정 
        nexacro._initEnvironment = function (screeninfo)
        {
        	if (screeninfo)
        	{
        		var selectscreen = nexacro._getScreen(screeninfo);
        		nexacro._applySelectedScreen(selectscreen);
        		nexacro._setCurrentScreen(selectscreen);
        		nexacro._setLocalStorage("screeninfo", JSON.stringify(selectscreen), 2);
        	}
        	else
        	{
				//open : main 창에 설정된 screen값을 가져와서 처리 
        		var savedscreeninfo = nexacro._getLocalStorage("screeninfo", 2);
        		if (savedscreeninfo)
        		{
        			//trace(savedscreeninfo);
        			var selectscreen = JSON.parse(savedscreeninfo);
        			nexacro._applySelectedScreen(selectscreen);
        			nexacro._setCurrentScreen(selectscreen);
        		}
        	}
        };

    }
}


if (_process)
{
    delete _process;

    delete _pGarbageCollector;
    delete _pCanvasGradient;
    delete _pAccessibilityNotifyManager;
    delete _pTextInfoCacheManager;
    delete _pProgressData;
    delete _pProgressDataCSV;
    delete _pProgressDataSSV;
    delete _pProgressDataPPX;
    delete _pProgressDataXML;
    delete _pHTMLSysTimerManager;
}
