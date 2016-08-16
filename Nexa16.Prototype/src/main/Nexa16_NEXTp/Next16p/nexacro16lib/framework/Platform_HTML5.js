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

//==============================================================================
// nexacro Platform Objects
//==============================================================================
if (nexacro._Browser != "Runtime" && !nexacro._init_platform_HTML5)
{
	"use strict";

	var _process = true;
	nexacro._init_platform_HTML5 = true;

	nexacro._isTouchInteraction = (nexacro._Browser == "MobileSafari" || nexacro._OS == "Android" || nexacro._OS == "iOS" || nexacro._OS == "Windows Phone"); //nexacro._OS == "wp7"
	nexacro._SupportOrientation = ((typeof window.orientation != 'undefined') && ('onorientationchange' in window));
	nexacro._SupportTouch = ("ontouchstart" in window || window.navigator.msPointerEnabled);
	nexacro._SupportAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) ? true : false;
	nexacro._resize_popup_inbound = true;

    //==============================================================================
    if (nexacro._Browser == "IE")
    {
        nexacro._createSysEvent_ForwardFuncs = function (_cur_win)
        {
            //------------------------------------------------------------------------------
            // define SysEvent Handlers
            _cur_win._is_capture = false;
            // capture 처리 
            _cur_win._syshandler_onmousedown_forward = function (evt)
            { 
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                var elem = nexacro.__findParentElement(evt.srcElement);
                if (nexacro._BrowserType != "Edge" && evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON && !_cur_win._is_capture && !elem.isInputElement())
                {
                    var body = _cur_win.document.body;
                    // ODH : srcElement가 아니라 body에 capture를 걸어서 사용하려면 IE11은 반드시 false를 셋팅해야 함.
                    body.setCapture(false);
                    _cur_win._is_capture = true;
                }

                return nexacro._syshandler_onmousedown(_cur_win.nexacro_HTMLSysEvent,  evt.srcElement, evt);
            };

            _cur_win._syshandler_onmouseup_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                if(_cur_win._is_capture)
                {
                    var body = _cur_win.document.body;
                    _cur_win._is_capture = false;
                    body.releaseCapture();
                }
                return nexacro._syshandler_onmouseup(_cur_win.nexacro_HTMLSysEvent,  evt.srcElement, evt);
            };
            _cur_win._syshandler_lock_onmouseup_forward = nexacro._emptyFn;

            _cur_win._syshandler_onmousemove_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_lock_onmousemove_forward = nexacro._emptyFn;

            _cur_win._syshandler_onlosecapture_forward = function (evt)
            {
            	evt = _cur_win.event;
            	if (_cur_win._is_capture)
            	{
            		_cur_win._is_capture = false;

            		var body = _cur_win.document.body;
            		var win = nexacro._findWindow(_cur_win.nexacro_HTMLSysEvent._cur_win);
            		var elem = nexacro.__findParentElement(evt.srcElement);

            		body.releaseCapture();

            		_cur_win.__clearGC();

            		var ret = win._on_sys_lbuttonup(win._cur_ldown_elem, evt.button, evt.alt, evt.ctrl, evt.shift, evt.wx, evt.wy, evt.sx, evt.sy);

            		if (!elem.isInputElement())
            			nexacro._stopSysEvent(evt);

            		return ret;
            	}
            	return true;
            };

        	// IE는 IE10 이상 버젼부터 Touch를 지원함.
            _cur_win._syshandler_ontouchstart_forward = function (evt)
            {
                if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse")
                    return;

                var evt2 = {};
                evt2.srcElement = evt.srcElement;
                evt2.changedTouches = [];

                var touch = {};
                touch.clientX = evt.clientX;
                touch.clientY = evt.clientY;
                touch.screenX = evt.screenX;
                touch.screenY = evt.screenY;
                touch.timeStamp = evt.timeStamp;
                touch.identifier = evt.pointerId;

                evt2.changedTouches.push(touch);
                evt = evt2;
                return nexacro._syshandler_ontouchstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_ontouchend_forward = function (evt)
            {
                if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse")
                    return;

                var evt2 = {};
                evt2.srcElement = evt.srcElement;
                evt2.changedTouches = [];

                var touch = {};
                touch.clientX = evt.clientX;
                touch.clientY = evt.clientY;
                touch.screenX = evt.screenX;
                touch.screenY = evt.screxxY;
                touch.timeStamp = evt.timeStamp;
                touch.identifier = evt.pointerId;

                evt2.changedTouches.push(touch);
                evt = evt2;

                return nexacro._syshandler_ontouchend(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_ontouchmove_forward = function (evt)
            {
                if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse")
                    return;

                var evt2 = {};
                evt2.srcElement = evt.srcElement;
                evt2.changedTouches = [];

                var touch = {};
                touch.clientX = evt.clientX;
                touch.clientY = evt.clientY;
                touch.screenX = evt.screenX;
                touch.screenY = evt.screenY;
                touch.timeStamp = evt.timeStamp;
                touch.identifier = evt.pointerId;

                evt2.changedTouches.push(touch);
                evt = evt2;

                return nexacro._syshandler_ontouchmove(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_ontouchcancel_forward = function (evt)
            {
                if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse")
                    return;

                var evt2 = {};
                evt2.srcElement = evt.srcElement;
                evt2.changedTouches = [];

                var touch = {};
                touch.clientX = evt.clientX;
                touch.clientY = evt.clientY;
                touch.screenX = evt.screenX;
                touch.screenY = evt.screenY;
                touch.timeStamp = evt.timeStamp;
                touch.identifier = evt.pointerId;

                evt2.changedTouches.push(touch);
                evt = evt2;

                return nexacro._syshandler_ontouchcancel(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

           

            _cur_win._syshandler_ondblclick_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_ondblclick(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

            _cur_win._syshandler_onmouseover_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onmouseover(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.fromElement, evt);
            };
            _cur_win._syshandler_onmouseout_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onmouseout(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt.toElement, evt);
            };

            _cur_win._syshandler_onkeydown_forward = function (evt)
            {
                if (_cur_win.event)
                evt = _cur_win.event;
            
                if (_cur_win._linked_window && _cur_win._linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116)
                {
                    evt.keyCode = 0;
                    evt.cancelBubble = true;
                    evt.returnValue = false;
                }

                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeydown(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

          
            _cur_win._syshandler_onkeypress_forward = function (evt)
            {
                if (_cur_win.event)
                    evt = _cur_win.event;

                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeypress(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

            _cur_win._syshandler_onkeyup_forward = function (evt)
            {
                if (_cur_win.event)
                    evt = _cur_win.event;

                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeyup(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

            _cur_win._syshandler_onmousewheel_forward = function (evt)
            {
                evt = _cur_win.event;
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onmousewheel(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

            _cur_win._syshandler_oncontextmenu_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_oncontextmenu(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_dragstart_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_dragstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };
            _cur_win._syshandler_onselectstart_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onselectstart(_cur_win.nexacro_HTMLSysEvent, evt.srcElement, evt);
            };

            _cur_win._syshandler_onactivate_forward = function (evt) //window activate using focus
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onactivate(_cur_win.nexacro_HTMLSysEvent, evt);
            };

            if (nexacro._BrowserVersion <= 8) // under ie8
            {
            	_cur_win._syshandler_ondeactivate_forward = function (evt) //window deactivate using focusout at ie
            	{
            		// ie8 이하 open창을 닫을때 발생하는 deactivate 이벤트 처리도중
            		// close처리가 되면서 내부 object들이 망가져 있는 문제가 발생함.
            		// (IE와 js엔진간 쓰레드 lock 문제로 판단됨)
            		try
            		{
            			evt = _cur_win.event;
            			if (evt.toElement || evt.relatedTarget) // evt.relatedTarget for ie11
            				return true;
            			return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
            		}
            		catch (e) { }
            	};
            }
            else
            {
                _cur_win._syshandler_ondeactivate_forward = function (evt) //window deactivate using focusout at ie
                {
                    evt = _cur_win.event;
                    if (evt.toElement || evt.relatedTarget) // evt.relatedTarget for ie11
                        return true;
                    return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
                };
            }

            _cur_win._syshandler_onbeforeclose_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onbeforeclose(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onclose_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onclose(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onresize_forward = function (evt) //window resize
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onresize(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onorientationchange_forward = function (evt) //window resize
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onorientationchange(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onmove_forward = function (evt) //window move
            {
                // beforeClose시 타이머를 죽이고 있으나, 이미 수행중인 경우 문제가 됨 (IE, FF)
                try
                {
                    // detecting browser window move
                    var oldX = _cur_win._old_screenx;
                    var oldY = _cur_win._old_screeny;

                    if (oldX != _cur_win.screenLeft || oldY != _cur_win.screenTop)
                    {
                        _cur_win._old_screenx = _cur_win.screenLeft;
                        _cur_win._old_screeny = _cur_win.screenTop;
                
                        evt = _cur_win.event;
                        return nexacro._syshandler_onmove(_cur_win.nexacro_HTMLSysEvent, evt);
                    }
                } catch(e) { }
            };
            _cur_win._syshandler_onload_forward = function (evt)
            {
                evt = _cur_win.event;
                return nexacro._syshandler_onload(_cur_win.nexacro_HTMLSysEvent, evt);
            };
        };
    }
    else if (nexacro._Browser != "IE")
    {
        nexacro._createSysEvent_ForwardFuncs = function (_cur_win)
        {
            _cur_win._syshandler_onmousedown_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                if (nexacro._isTouchInteraction)
                {
                    // TODO Android에서 Input Caret이동을 원할 경우 mouse이벤트도
                    // preventDefault 하지 않아야 한다. 아래 주석처리하고 return만 해야 함.
                    // -> mousedown, mouseup, mousemove
                    if (nexacro._OS == "Android")
                    {
                        var win = nexacro._findWindow(_cur_win);
                        var elem = nexacro.__findParentElement(evt.target);

                        // 대상이 Input이면 Caret 이동 등 처리를 위해 Pass.
                        // 대상이 Input이 아니면 preventDefault (node가 포커스를 가져가선 안됨)
                        if (elem)
                        {
                            if (elem.isInputElement() && elem.enable)
                            {
                                
                                }
                            else
                            {
                                var last_focused_elem = win._last_focused_elem;
                                if (!last_focused_elem || !(last_focused_elem.isInputElement() && last_focused_elem.enable))
                                {
                                evt.preventDefault();
                            }
                        }
                    }
                    }
                    else
                    {
                    	if (elem && !elem.isInputElement())
                        {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                    return false;
                }
                return nexacro._syshandler_onmousedown(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_onmouseup_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                if (nexacro._isTouchInteraction)
                {
                    if (nexacro._OS == "Android")
                    {
                        ;
                    }
                    else
                    {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                    return false;
                }

                return nexacro._syshandler_onmouseup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_lock_onmouseup_forward = function (evt)
            {
                return nexacro._syshandler_lock_onmouseup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_onmousemove_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                if (nexacro._isTouchInteraction)
                {
                    if (nexacro._OS == "Android")
                    {
                    
                    }
                    else
                    {
                        evt.stopPropagation();
                      //  evt.preventDefault();
                    }
                    return false;
                }
                return nexacro._syshandler_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_lock_onmousemove_forward = function (evt)
            {
                return nexacro._syshandler_lock_onmousemove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_onlosecapture_forward = nexacro._emptyFn;

        	// Modern Browser는 Touch를 지원함.
            _cur_win._syshandler_ontouchstart_forward = function (evt)
            {
                //evt.preventDefault();
                var elem = nexacro.__findParentElement(evt.target);
                if (elem.isInputElement() && elem.enable)
                {
                    elem._is_input_touchstart = true;
                    elem._on_sys_touchstart();
                }
                
                return nexacro._syshandler_ontouchstart(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_ontouchend_forward = function (evt)
            {
                var elem = nexacro.__findParentElement(evt.target);
                if (elem.isInputElement() && elem.enable)
                {
                    elem._on_sys_touchend();
                }
                return nexacro._syshandler_ontouchend(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_ontouchmove_forward = function (evt)
            {
                //evt.preventDefault();
                var elem = nexacro.__findParentElement(evt.target);
                if (elem.isInputElement() && elem.enable)
                {
                    elem._on_sys_touchmove();
                }
                return nexacro._syshandler_ontouchmove(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_ontouchcancel_forward = function (evt)
            {
                var elem = nexacro.__findParentElement(evt.target);
                if (elem.isInputElement() && elem.enable)
                {
                    return;
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_ontouchcancel(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
                      

            _cur_win._syshandler_ondblclick_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                if (nexacro._isTouchInteraction)
                {
                    if (nexacro._OS == "Android")
                    {
                        ;
                    }
                    else
                    {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }
                    return false;
                }
                return nexacro._syshandler_ondblclick(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_onmouseover_forward = function (evt)
            {
                return nexacro._syshandler_onmouseover(_cur_win.nexacro_HTMLSysEvent, evt.target, evt.relatedTarget, evt);
            };
            _cur_win._syshandler_onmouseout_forward = function (evt)
            {
                return nexacro._syshandler_onmouseout(_cur_win.nexacro_HTMLSysEvent, evt.target, evt.relatedTarget, evt);
            };

            _cur_win._syshandler_onkeydown_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win) || (_cur_win._linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeydown(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_onkeypress_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeypress(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_onkeyup_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onkeyup(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_onmousewheel_forward = function (evt)
            {
                if (!nexacro.__getWindowHandleEnable(_cur_win))
                {
                    nexacro._stopSysEvent(evt);
                    return;
                }
                return nexacro._syshandler_onmousewheel(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_oncontextmenu_forward = function (evt)
            {
                return nexacro._syshandler_oncontextmenu(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_dragstart_forward = function (evt)
            {
                return nexacro._syshandler_dragstart(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };
            _cur_win._syshandler_onselectstart_forward = function (evt)
            {
                return nexacro._syshandler_onselectstart(_cur_win.nexacro_HTMLSysEvent, evt.target, evt);
            };

            _cur_win._syshandler_onactivate_forward = function (evt) //window activate using focus
            {
                return nexacro._syshandler_onactivate(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_ondeactivate_forward = function (evt) //window deactivate using blur except ie
            {
                return nexacro._syshandler_ondeactivate(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onbeforeclose_forward = function (evt)
            {
                return nexacro._syshandler_onbeforeclose(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onclose_forward = function (evt)
            {
                return nexacro._syshandler_onclose(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onresize_forward = function (evt) //window resize
            {
                return nexacro._syshandler_onresize(_cur_win.nexacro_HTMLSysEvent, evt);
            };
            _cur_win._syshandler_onorientationchange_forward = function (evt)
            {
                // 안드로이드 장비의 경우 화면을 돌렸을때 screen.w/h 값이 서로 바뀌기때문에
                // 그에맞게 viewport를 다시 세팅해줘야 함. (기기마다 다르다 -> 예외테이블로 관리)

                // 또한 화면 회전이 되어도 기존 contents width가 유지되는 경우도 있음
                // (가로,세로 해상도 swap이 되어야 하는데 되지 않음)

                // 기본브라우저 뿐만이 아니고 Chrome에서도 발생함.

                // viewport를 다시 세팅해줘도 반영되지 않는 기기/브라우저도 있음. (-> 이경우 처리 불가)

                var reset_viewport = nexacro._searchDeviceExceptionValue("orientationchange_reset_viewport");
                if (nexacro._OS == "Android" && reset_viewport)// && nexacro._Browser != "Chrome")
                {
                    // screen width,height 값의 swap 여부가 기기/브라우저마다 모두 다르다.
                    // 또한 swap 되지만 늦게 swap되는 경우도 있다.
                    var _tester = nexacro._device_exception_tester;
                    if (_tester.screen_checked && _tester.screen_swap_checked === false)
                    {
                        if (_tester.is_init_screen_portrait != nexacro._isPortrait())
                        {
                            if (_tester.init_screen_width == nexacro._getScreenWidth())
                                _tester.swap_screen = false;
                            else
                                _tester.swap_screen = true;
                            _tester.screen_swap_checked = true;
                        }
                    }

                    // OS 버젼 체크해야 할수도.
                    var delayed_swap_screen = _tester.delayed_swap_screen;
                    if (delayed_swap_screen === undefined)
                        delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
                    if (delayed_swap_screen === true)
                    {
                        // 한번이라도 테스트가 수행됐거나, 예외 테이블에 명시된 경우...
                        // 지연되어 swap되는 경우, 바귈때까지 기다림.
                        _tester.swap_screen_timer = setInterval(function ()
                        {
                            var p_w = _tester["portrait_screen_width"];
                            var l_w = _tester["landscape_screen_width"];
                            var is_changed = false;
                            if (!nexacro._isPortrait() && ((p_w && p_w != nexacro._getScreenWidth()) || (l_w && l_w == nexacro._getScreenWidth())))
                                is_changed = true;
                            else if (nexacro._isPortrait() && ((l_w && l_w != nexacro._getScreenWidth()) || (p_w && p_w == nexacro._getScreenWidth())))
                                is_changed = true;
                            if (is_changed)
                            {
                                clearInterval(_tester.swap_screen_timer);
                                _tester.swap_screen_timer = null;

                                nexacro.__setViewportScale();
                            }
                        }, 100);
                    }
                    else
                    {
                        var reset_viewport_delay = nexacro._searchDeviceExceptionValue("reset_viewport_delay");
                        if (reset_viewport_delay <= 0)
                        {
                            // 정보가 없는 경우 일단 수행
                            nexacro.__setViewportScale();
                        }
                        else
                        {
                            setTimeout(function ()
                            {
                                nexacro.__setViewportScale();
                            }, parseInt(reset_viewport_delay));
                        }

                        // 지연되어 swap 되는지 정보가 없는 경우 테스트 수행
                        if (_tester.swap_screen === false && _tester.delayed_swap_screen_checked === false)
                        {
                            // screen 값이 swap 되지 않는 것으로 보였을때... 늦게 바뀌는지 체크
                            _tester.delayed_swap_screen_check_cnt = 0;
                            if (_tester.swap_screen_timer)
                                clearInterval(_tester.swap_screen_timer);
                            _tester.swap_screen_timer = setInterval(function ()
                            {
                                // 혹시나 screen의 값이 swap 되었는지 체크
                                var p_w = _tester["portrait_screen_width"];
                                var l_w = _tester["landscape_screen_width"];
                                var is_changed = false;
                                if (!nexacro._isPortrait() && ((p_w && p_w != nexacro._getScreenWidth()) || (l_w && l_w == nexacro._getScreenWidth())))
                                    is_changed = true;
                                else if (nexacro._isPortrait() && ((l_w && l_w != nexacro._getScreenWidth()) || (p_w && p_w == nexacro._getScreenWidth())))
                                    is_changed = true;
                                if (is_changed || _tester.delayed_swap_screen_check_cnt == 10)
                                {
                                    clearInterval(_tester.swap_screen_timer);
                                    _tester.swap_screen_timer = null;
                                    _tester.delayed_swap_screen = is_changed;
                                    _tester.delayed_swap_screen_checked = true;
                                    
                                    // screen 값이 늦게 swap되는 이상한 환경이다!
                                    if (is_changed)
                                        nexacro.__setViewportScale();
                                    return;
                                }

                                _tester.delayed_swap_screen_check_cnt++;
                            }, 100);
                        }
                    }

                    // 좀 늦게 반영해야 제대로 동작하는 기기도 있다....
                }

                evt = _cur_win.event;
                return nexacro._syshandler_onorientationchange(_cur_win.nexacro_HTMLSysEvent, evt);
            };

            _cur_win._syshandler_onmove_forward = function (evt) //window move
            {
                // beforeClose시 타이머를 죽이고 있으나, 이미 수행중인 경우 문제가 됨 (IE, FF)
                try
                {
                    // detecting browser window move
                    var oldX = _cur_win._old_screenx;
                    var oldY = _cur_win._old_screeny;
            
                    if (oldX != _cur_win.screenX || oldY != _cur_win.screenY)
                    {
                        _cur_win._old_screenx = _cur_win.screenX;
                        _cur_win._old_screeny = _cur_win.screenY;

                        evt = _cur_win.event;
                        return nexacro._syshandler_onmove(_cur_win.nexacro_HTMLSysEvent, evt);
                    }
                } catch(e) {; }
            };
            _cur_win._syshandler_onload_forward = function (evt)
            {
                return nexacro._syshandler_onload(_cur_win.nexacro_HTMLSysEvent, evt);
            };
        };
    }
		
	//==============================================================================
    nexacro.HTMLSysEvent = function (_win_win, _win_doc, _cur_win, _cur_doc)
	{
		this._win_win = _win_win;
		this._win_doc = _win_doc;
		this._cur_win = _cur_win;
		this._cur_doc = _cur_doc;
		
		this._cur_over_elem = null;
				
		this._syshandler_onmousedown_forward = _cur_win._syshandler_onmousedown_forward;
		this._syshandler_onmouseup_forward = _cur_win._syshandler_onmouseup_forward;
		this._syshandler_lock_onmouseup_forward = _cur_win._syshandler_lock_onmouseup_forward;
		this._syshandler_onmousemove_forward = _cur_win._syshandler_onmousemove_forward;
		this._syshandler_lock_onmousemove_forward = _cur_win._syshandler_lock_onmousemove_forward;
		this._syshandler_onlosecapture_forward = _cur_win._syshandler_onlosecapture_forward;
		this._syshandler_ontouchstart_forward = _cur_win._syshandler_ontouchstart_forward;
		this._syshandler_ontouchend_forward = _cur_win._syshandler_ontouchend_forward;
		this._syshandler_ontouchmove_forward = _cur_win._syshandler_ontouchmove_forward;
		this._syshandler_ontouchcancel_forward = _cur_win._syshandler_ontouchcancel_forward;
		this._syshandler_ondblclick_forward = _cur_win._syshandler_ondblclick_forward;
		this._syshandler_onmouseover_forward = _cur_win._syshandler_onmouseover_forward;
		this._syshandler_onmouseout_forward = _cur_win._syshandler_onmouseout_forward;
        this._syshandler_onkeydown_forward = _cur_win._syshandler_onkeydown_forward;
		this._syshandler_onkeypress_forward = _cur_win._syshandler_onkeypress_forward;
		this._syshandler_onkeyup_forward = _cur_win._syshandler_onkeyup_forward;
		this._syshandler_onmousewheel_forward = _cur_win._syshandler_onmousewheel_forward;
		this._syshandler_oncontextmenu_forward = _cur_win._syshandler_oncontextmenu_forward;
		this._syshandler_dragstart_forward = _cur_win._syshandler_dragstart_forward;
		this._syshandler_onselectstart_forward = _cur_win._syshandler_onselectstart_forward;
		this._syshandler_onactivate_forward = _cur_win._syshandler_onactivate_forward;
		this._syshandler_ondeactivate_forward = _cur_win._syshandler_ondeactivate_forward;
		this._syshandler_onbeforeclose_forward = _cur_win._syshandler_onbeforeclose_forward;
		this._syshandler_onclose_forward = _cur_win._syshandler_onclose_forward;
		this._syshandler_onresize_forward = _cur_win._syshandler_onresize_forward;
		this._syshandler_onorientationchange_forward = _cur_win._syshandler_onorientationchange_forward;
		this._syshandler_onmove_forward = _cur_win._syshandler_onmove_forward;
		this._syshandler_onload_forward = _cur_win._syshandler_onload_forward;

		_cur_win._syshandler_onmousedown_forward = null;
		_cur_win._syshandler_onmouseup_forward = null;
		_cur_win._syshandler_lock_onmouseup_forward = null;
		_cur_win._syshandler_onmousemove_forward = null;
		_cur_win._syshandler_lock_onmousemove_forward = null;
		_cur_win._syshandler_onlosecapture_forward = null;
		_cur_win._syshandler_ontouchstart_forward = null;
		_cur_win._syshandler_ontouchend_forward = null;
		_cur_win._syshandler_ontouchmove_forward = null;
		_cur_win._syshandler_ontouchcancel_forward = null;
		_cur_win._syshandler_ondblclick_forward = null;
		_cur_win._syshandler_onmouseover_forward = null;
		_cur_win._syshandler_onmouseout_forward = null;
		_cur_win._syshandler_onkeydown_forward = null;
		_cur_win._syshandler_onkeypress_forward = null;
		_cur_win._syshandler_onkeyup_forward = null;
		_cur_win._syshandler_onmousewheel_forward = null;
		_cur_win._syshandler_oncontextmenu_forward = null;
		_cur_win._syshandler_dragstart_forward = null;
		_cur_win._syshandler_onselectstart_forward = null;
		_cur_win._syshandler_onactivate_forward = null;
		_cur_win._syshandler_ondeactivate_forward = null;
		_cur_win._syshandler_onbeforeclose_forward = null;
		_cur_win._syshandler_onclose_forward = null;
		_cur_win._syshandler_onresize_forward = null;
        _cur_win._syshandler_onorientationchange_forward = null;
        _cur_win._syshandler_onmove_forward = null;
        _cur_win._syshandler_onload_forward = null;
	};
	var _pHTMLSysEvent = nexacro.HTMLSysEvent.prototype;

	_pHTMLSysEvent.KEY_BACKSPACE = 8;
	_pHTMLSysEvent.KEY_TAB = 9;
	_pHTMLSysEvent.KEY_RETURN = 13;
	_pHTMLSysEvent.KEY_ESC = 27;
	_pHTMLSysEvent.KEY_SPACE = 32;
	_pHTMLSysEvent.KEY_LEFT = 37;
	_pHTMLSysEvent.KEY_UP = 38;
	_pHTMLSysEvent.KEY_RIGHT = 39;
	_pHTMLSysEvent.KEY_DOWN = 40;
	_pHTMLSysEvent.KEY_DELETE = 46;
	_pHTMLSysEvent.KEY_HOME = 36;
	_pHTMLSysEvent.KEY_END = 35;
	_pHTMLSysEvent.KEY_PAGEUP = 33;
	_pHTMLSysEvent.KEY_PAGEDOWN = 34;
	_pHTMLSysEvent.KEY_INSERT = 45;

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11)
    {
	    _pHTMLSysEvent.MOUSE_LBUTTON = 1;
	    _pHTMLSysEvent.MOUSE_MBUTTON = 4;
	    _pHTMLSysEvent.MOUSE_RBUTTON = 2;
    }
    else
    {
        _pHTMLSysEvent.MOUSE_LBUTTON = 0;
        _pHTMLSysEvent.MOUSE_MBUTTON = 1;
        _pHTMLSysEvent.MOUSE_RBUTTON = 2;
    }
	
    if (nexacro._Browser == "IE")
    {
	    _pHTMLSysEvent._initDocEventHandler = function ()
	    {
		    var _cur_win = this._cur_win;
		    var _cur_doc = this._cur_doc;
		    var body = _cur_doc.body;
		    nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
		    nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		    nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
		    nexacro._observeSysEvent(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
		    if (nexacro._SupportTouch)
		    {
		        nexacro._observeSysEvent(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
		        nexacro._observeSysEvent(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
		        nexacro._observeSysEvent(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
		        nexacro._observeSysEvent(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
		    }
		    nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
		    nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
		    nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
		    nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
		    nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
		    nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
		    nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
		    if (!nexacro._isTouchInteraction)
		    {
			    nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
		    }
		    nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
		    nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
		    nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);

		    nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
		    nexacro._observeSysEvent(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
		    nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
		    nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
		    nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
            nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

            nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);

		    this._startDetectWindowMove();
	    };
	    _pHTMLSysEvent._stopDocEventHandler = function ()
	    {
		    var _cur_win = this._cur_win;
		    var _cur_doc = this._cur_doc;
		    var body = _cur_doc.body;

		    this._stopDetectWindowMove();

		    nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
		    nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		    nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
		    nexacro._stopSysObserving(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
		    if (nexacro._SupportTouch)
		    {
		        nexacro._stopSysObserving(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
		        nexacro._stopSysObserving(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
		        nexacro._stopSysObserving(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
		        nexacro._stopSysObserving(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
		    }
		    nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
		    nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
		    nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
		    nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
		    nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
		    nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
		    nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
		    if (!nexacro._isTouchInteraction)
		    {
			    nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
		    }
		    nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
		    nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
		    nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);

		    nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
		    nexacro._stopSysObserving(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
		    nexacro._stopSysObserving(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
		    nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
		    nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
		    nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

		    nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
	    };
	
	    _pHTMLSysEvent.lockMouseMove = function (node)
	    {
	    };
	    _pHTMLSysEvent.unloackMouseMove = function (node)
	    {
	    };
    }
    else if (nexacro._Browser != "IE")
    {
	    _pHTMLSysEvent._initDocEventHandler = function ()
	    {
		    var _cur_win = this._cur_win;
		    var body = this._cur_doc.body;
		    nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
		    nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		    nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
		    //nexacro._observeSysEvent(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
		    if (nexacro._SupportTouch)
		    {
			    nexacro._observeSysEvent(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
			    nexacro._observeSysEvent(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
			    nexacro._observeSysEvent(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
			    nexacro._observeSysEvent(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
		    }
		    nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
		    nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
		    nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
		    nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
		    nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
		    nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
		    nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
		    nexacro._observeSysEvent(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
		    if (!nexacro._isTouchInteraction)
		    {
		        nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
		    }
		    nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
		    nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);
		    nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
		
		    nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
		    nexacro._observeSysEvent(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
		    nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
		    nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
		    if ( nexacro._SupportOrientation )
		    {
		        nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
                nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
		    }
		    else
		    {
			    nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
		    }

		    nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);

		    this._startDetectWindowMove();
	    };
	    _pHTMLSysEvent._stopDocEventHandler = function ()
	    {
		    var _cur_win = this._cur_win;
		    var body = this._cur_doc.body;

		    this._stopDetectWindowMove();

		    nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
		    nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		    nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
	    	//nexacro._stopSysObserving(body, "losecapture", "onlosecapture", this._syshandler_onlosecapture_forward);
		    if (nexacro._SupportTouch)
		    {
			    nexacro._stopSysObserving(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
			    nexacro._stopSysObserving(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
			    nexacro._stopSysObserving(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
			    nexacro._stopSysObserving(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
		    }
		    nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
		    nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
		    nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
		    nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
		    nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
		    nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
		    nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
		    nexacro._stopSysObserving(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
		    if (!nexacro._isTouchInteraction)
		    {
		        nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
		    }
		    nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
		    nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
		    nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
		
		    nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
		    nexacro._stopSysObserving(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
		    nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
		    if ( nexacro._SupportOrientation )
		    {
		        nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
                nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
		    }
		    else
		    {
			    nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
		    }

		    nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
	    };
	
	    _pHTMLSysEvent.lockMouseMove = function (node)
	    {
		    var _cur_body = this._cur_doc.body;
		    nexacro._stopSysObserving(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
		    nexacro._stopSysObserving(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
		    nexacro._observeSysEvent(this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
		    nexacro._observeSysEvent(this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
	    };
	    _pHTMLSysEvent.unlockMouseMove = function (node)
	    {
		    var _cur_body = this._cur_doc.body;
		    nexacro._stopSysObserving(this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
		    nexacro._stopSysObserving(this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
		    nexacro._observeSysEvent(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
		    nexacro._observeSysEvent(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
	    };
    }

    _pHTMLSysEvent._move_detect_timer = -1;
    _pHTMLSysEvent._startDetectWindowMove = function ()
    {
        // detecting browser window move
        var _cur_win = this._cur_win;
        _cur_win._old_screenx = _cur_win.screenX ? _cur_win.screenX : _cur_win.screenLeft;
        _cur_win._old_screeny = _cur_win.screenY ? _cur_win.screenY : _cur_win.screenTop;

        var interval = setInterval(this._syshandler_onmove_forward, 500);
        this._move_detect_timer = interval;
    };
    _pHTMLSysEvent._stopDetectWindowMove = function ()
    {
        if (this._move_detect_timer)
        {
            clearInterval(this._move_detect_timer);
            this._move_detect_timer = null;
        }
    };

	_pHTMLSysEvent.clearAll = function ()
	{
	    this._stopDetectWindowMove();

		this._win_win = null;
		this._win_doc = null;
		this._cur_win = null;
		this._cur_doc = null;

		this._cur_over_elem = null;
		
		this._syshandler_onmousedown_forward = null;
		this._syshandler_onmouseup_forward = null;
		this._syshandler_lock_onmouseup_forward = null;
		this._syshandler_onmousemove_forward = null;
		this._syshandler_lock_onmousemove_forward = null;
		this._syshandler_ontouchstart_forward = null;
		this._syshandler_ontouchend_forward = null;
		this._syshandler_ontouchmove_forward = null;
		this._syshandler_ontouchcancel_forward = null;
		this._syshandler_ondblclick_forward = null;
		this._syshandler_onmouseover_forward = null;
		this._syshandler_onmouseout_forward = null;
		this._syshandler_onkeydown_forward = null;
		this._syshandler_onkeypress_forward = null;
		this._syshandler_onkeyup_forward = null;
		this._syshandler_onmousewheel_forward = null;
		this._syshandler_oncontextmenu_forward = null;
		this._syshandler_dragstart_forward = null;
		this._syshandler_onselectstart_forward = null;
		this._syshandler_onactivate_forward = null;
		this._syshandler_ondeactivate_forward = null;
		this._syshandler_onbeforeclose_forward = null;
		this._syshandler_onclose_forward = null;
		this._syshandler_onresize_forward = null;
		this._syshandler_onorientationchange_forward = null;
		this._syshandler_onmove_forward = null;
		this._syshandler_onload_forward = null;
	};

	
	//==============================================================================
	nexacro.__getRealWindowHandle = function (_cur_win)
	{
	    var _cur_nexacro = _cur_win.nexacro;
		var p = _cur_win;
		while (true)
		{
            // nexacro root으로 제한.
			if (p.parent && p != p.parent && p.parent.nexacro && p.parent.nexacro == _cur_nexacro)
				p = p.parent;
			else
				break;
		}
		return p;
	};

	if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 6)
	{
	    nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc)
        {
            document.execCommand('BackgroundImageCache', false, true);

		    var _win_win = nexacro.__getRealWindowHandle(_cur_win);
		    var _win_doc = _win_win ? _win_win.document : document;

            nexacro._createWindowGC_Funcs(_cur_win);
            _cur_win.__createGC();

		    // init forward functions
		    nexacro._createSysEvent_ForwardFuncs(_cur_win);
		    var _sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
		    // init handlers
		    _sysEvent._initDocEventHandler();
	    };
	}
	else
	{
	    nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc)
	    {
	        var _win_win = nexacro.__getRealWindowHandle(_cur_win);
	        var _win_doc = _win_win ? _win_win.document : document;

	        nexacro._createWindowGC_Funcs(_cur_win);
	        _cur_win.__createGC();

	        // by ODH : IE10에서 Popup Window에 setInterval 시 closure로 생성한 callback function 진입 시 스크립트 오류 발생하기 때문에 
	        //          별도의 TimerManager를 둔다.
	        nexacro._initHTMLSysTimerManager(_cur_win);

	        // init forward functions
	        nexacro._createSysEvent_ForwardFuncs(_cur_win);
	        var _sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
	        // init handlers
	        _sysEvent._initDocEventHandler();
	    };
	}

	nexacro._finalizeHTMLSysEvent = function (_cur_win)
	{
	    _cur_win.__createGC = null;
	    _cur_win.__clearGC = null;
	    _cur_win.__destroyGC = null;

	    _cur_win.nexacro_HTMLSysEvent = null;
	};

    //called popup.html
	nexacro._preparePopupFrame = function (_cur_win, _cur_doc)
	{
	    nexacro._initHTMLSysEvent(_cur_win, _cur_doc);
	    nexacro._prepareManagerFrame();	    
	  //  nexacro._initializeGlobalObjects(_cur_win);
	};

	nexacro._createPopupFrame = function (_cur_win, urlparams)
	{
		var name = urlparams["framename"];

		nexacro._initEnvironment();
		
		var parent_win = nexacro._findWindow(_cur_win.opener || parent);
		var _win = new nexacro._Window(name, parent_win);
		_win.setLinkedWindow(_cur_win);

		// nexacro._copyLocalStorage(parent_win);
		var env = nexacro.getEnvironment();
	    env._load();  // 이때 xadl 값은 설정되어 있어야 한다. 
		
	    if (parent_win)
		{
	    	parent_win.addChild(_win);
		}
	   
	    	//screen 정보 설정 
		//getLocalStorage("screenid", 2);	 

	    var popupframe = nexacro._getLocalStorage("popupframeoption", 2);

		nexacro._popupframeoption = {};
		nexacro._popupframeoption[name]= JSON.parse(popupframe);
			//	trace("nexacro._popupframeoption[name] :" + popupframe);
		if (parent_win)
		{
	    	var popupframeoption = nexacro._popupframeoption[name];
	    	popupframeoption._args = parent_win._popuparrarg;
			popupframeoption._parentframe = parent_win._popupparentframe;
			popupframeoption._opener = parent_win._popupframeopener;
			//	trace("popupframeoption:" + popupframeoption);
			parent_win._popupparentframe = null;
			parent_win._popuparrarg = null;
			parent_win._popupframeopener = null;
	    }

		//trace(JSON.stringify(nexacro._popupframeoption[name]));
	nexacro._removeLocalStorage("popupframeoption", 2);

	var childframe = new nexacro.ChildFrame(name);
		childframe._showModeless(name, _win);

	    /*	nexacro._childframe = childframe;
	    	nexacro._framaewin = _win;
	    	nexacro._framaename = name;
	nexacro._cur_win = _cur_win;*/

	};

    //==============================================================================
    if (nexacro._Browser == "IE")
    {
	    nexacro._syshandler_onmousedown = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
		    var elem = nexacro.__findParentElement(node);
		    if (win && elem)
		    {
		        _sysEvent._cur_win.__clearGC();
			    // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
		        if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON)
			    {
			        //주소창에서 화면을 선택했을떄 activate 가 나오지 않는다.
		            if (win._is_active_window === false)
		                win._on_sys_activate();

		            if (_sysEvent._cur_win.document.hasFocus)
			        {
		                if (false === _sysEvent._cur_win.document.hasFocus())
		                    _sysEvent._cur_win.focus();
			        }
		        
			        var ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

				    //IE에서 form에 lbuttondown시 조합이 완료됨.
		    	    //Window7만.
				    //Windows XP에서도 동일현상 발생.
			        if (nexacro._SystemLang != "ja")// && nexacro._OSVersion >= 6.0)
			        {
			        	if (win._last_focused_elem != elem && win._last_focused_elem.isInputElement() && win._last_focused_elem.parent)
					    {					    
			        		win._last_focused_elem._on_sys_mousedown("lbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
					    }
				    }
                
			        // 브라우저에 의해 클릭된 Element가 Focus를 가져가기때문에 Default동작을 막아야 함.
			        // TODO check 임시방편 현재 preventDefault 처리하면 Input만 문제가 됨
			        if (!(elem.isInputElement() && elem.enable))
				        nexacro._stopSysEvent(evt);

				   
				    return ret;
			    }
		        else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON || evt.button === 0) // 0 을 rbutton 으로 인식함
		        {
				    var ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

				    //IE에서 form에 rbuttondown시 조합이 완료됨.
				    //IE6도 마찬가지임.
				    if (win._last_focused_elem != elem && win._last_focused_elem.isInputElement() && win._last_focused_elem.parent)
				    {
				    	win._last_focused_elem._on_sys_mousedown("rbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
				    }

			        if (!(elem.isInputElement() && elem.enable))
			            nexacro._stopSysEvent(evt);

			        
			        return ret;
			    }
			    else // middlebutton은 4로 인식함
		        {		          
				    var ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

				    //IE에서 form에 mbuttondown시 조합이 완료됨.
				    //Window7만.
			        if (nexacro._SystemLang != "ja" && nexacro._OSVersion >= 6.0)
				    {
			            if (win._last_focused_elem != elem && win._last_focused_elem.isInputElement() && win._last_focused_elem.parent)
					    {
			            	win._last_focused_elem._on_sys_mousedown("mbutton", evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
					    }
				    }


			        if (!(elem.isInputElement() && elem.enable))
			            nexacro._stopSysEvent(evt);

			       
			        return ret;
                }
		    }
		    return false;
	    };
	    nexacro._syshandler_onmouseup = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._cur_win);
		    var elem = nexacro.__findParentElement(node);
		    if (win)
		    {
		        // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
                // clear gc 루틴 삭제
		        if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON)
			    {
                    var doc = _sysEvent._cur_doc;
                    var _win = _sysEvent._cur_win;
                 
                    return win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);			       
			    }
		        else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON)
		        {
		           return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);			        			        
			    }
			    else
		        {
		            return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);			        
                }
		    }
		    return false;
	    };

	    nexacro._syshandler_lock_onmouseup = nexacro._emptyFn;
	    nexacro._syshandler_onmousemove = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._cur_win);
	        var elem = nexacro.__findParentElement(node);
	        if (!win)
	        {
	            return false;
	        }

//             var entered = application._entered;
// 		    if (!entered || entered != elem)
// 		    {
// 			    return false;
// 		    }
		
		    var w_x = nexacro._getWindowHandlePosX(win.handle);
		    var w_y = nexacro._getWindowHandlePosY(win.handle);
		    var w_width = nexacro._getMainWindowWidth(win);
		    var w_height = nexacro._getMainWindowHeight(win);

		    //  브라우저는 move이벤트가 좌표 변경이 없어도 node 위에 마우스 커서가 존재하면 계속 발생됨.
		    if ( win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY )
		    {
			    return false;
		    }
		    else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height))
		    {
		    	if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBarControl)
		            return false;
		    }
		    else 
		    {
			    win._cur_screen_pos.x = evt.screenX;
			    win._cur_screen_pos.y = evt.screenY;
		    }

		    var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"))); //button info
		    _sysEvent._cur_win.__clearGC();
		    if (elem)
		    {  
			    // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
		        win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);		      
			    return true;
		    }
		    else if ( win._cur_ldown_elem )
		    {
			    win._on_sys_mousemove(null, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
		    }
		    return false;
	    };
	    nexacro._syshandler_lock_onmousemove = nexacro._emptyFn;

	    nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	        var elem = nexacro.__findParentElement(node);
	        if (win && elem)
	        {
	            _sysEvent._cur_win.__clearGC();
	            // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임

	            // TODO check event의 button이 lbutton(0)으로 세팅되어 들어오는 것이 확인됨. IE8,FF,Chrome
	            var ret = win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({ button: 4, which: 2 }), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY); // pss - which : 2 add for ie11
	          
	            return ret;
	        }
	        return false;
	    };
    }
    else if (nexacro._Browser != "IE")
    {
	    nexacro._syshandler_onmousedown = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	   
		    var elem = nexacro.__findParentElement(node);
		    if (win && elem)
		    {
		        if (win._is_active_window == false)
		            win._on_sys_activate();

		        // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임	
		        if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON)
			    {
			        var ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
				    // lock MouseMove
				    _sysEvent.lockMouseMove(node);
				
                    // 브라우저에 의해 클릭된 Element가 Focus를 가져가기때문에 Default동작을 막아야 함.
			        // TODO check 임시방편 현재 preventDefault 처리하면 Input만 문제가 됨

			        // Google Chrome에서 Disable된 input클릭시 focus가 옮겨가는 문제 수정 2013.08.28 neoarc
				    if (!(elem.isInputElement() && elem.enable))
				        nexacro._stopSysEvent(evt);
				    
			        return ret;
			    }
		        else if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON)
			    {
			        var ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
			        if (!(elem.isInputElement() && elem.enable))
			            nexacro._stopSysEvent(evt);

			        return ret;
			    }
			    else
			    {
                    var ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
                    if (!(elem.isInputElement() && elem.enable))
			            nexacro._stopSysEvent(evt);

                    return ret;
                }
		    }
		    return false;
	    };
	    nexacro._syshandler_onmouseup = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
		    var elem = nexacro.__findParentElement(node);
		    if (win && elem)
		    {
		        // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
		        if (evt.button == nexacro_HTMLSysEvent.MOUSE_RBUTTON)
			    {
			        return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
			    }
			    else
			    {
			        return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
                }
		    }
		    return false;
	    };
	    nexacro._syshandler_lock_onmouseup = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
		    var elem = nexacro.__findParentElement(node);
		
		    // unlock MouseMove
		    _sysEvent.unlockMouseMove(node);
		    var ret = false;
		    if (win)
		    {
		        if (evt.button == nexacro_HTMLSysEvent.MOUSE_LBUTTON)
			    {
			        ret = win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
			    }
		    }
		    return ret;
	    };
	    nexacro._syshandler_onmousemove = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	        var elem = nexacro.__findParentElement(node);
	        if (!win)
	        {
	            return false;
	        }

//             var entered = application._entered;
// 		    if (!entered || entered != elem)
// 		    {
// 			    return false;
// 		    }

		    //  브라우저는 move이벤트가 좌표 변경이 없어도 node 위에 마우스 커서가 존재하면 계속 발생됨.

		    if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY)
		    {
			    return false;
		    }
		    else 
		    {
			    win._cur_screen_pos.x = evt.screenX;
			    win._cur_screen_pos.y = evt.screenY;
		    }
		    var button = (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"));

		    if (elem)
		    {
			    // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임		   
		        win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
			    return true;
		    }
		    return false;
	    };
	    nexacro._syshandler_lock_onmousemove = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
		    var elem = nexacro.__findParentElement(node);
		    if (!win)
		    {
			    return false;
		    }

		    //  브라우저는 move이벤트가 좌표 변경이 없어도 node 위에 마우스 커서가 존재하면 계속 발생됨.

		    var w_x = nexacro._getWindowHandlePosX(win.handle);
		    var w_y = nexacro._getWindowHandlePosY(win.handle);
		    var w_width = nexacro._getMainWindowWidth(win);
		    var w_height = nexacro._getMainWindowHeight(win);

		    if ( win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY )
		    {
			    return false;
		    }
		    else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height))
		    {
		    	if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBarControl)
		        return false;
		    }
		   
			win._cur_screen_pos.x = evt.screenX;
			win._cur_screen_pos.y = evt.screenY;
		    
		    if (elem)
		    {
		 	    // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
		        win._on_sys_mousemove(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
			    return true;
		    }
		    else
		    {
		        win._on_sys_mousemove(null, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
		    }
		    return false;
	    };

	    nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	        var elem = nexacro.__findParentElement(node);
	        if (win && elem)
	        {
	            // e.clientX, e.clientY는 win ClientArea left,top 0을 기준으로 측정된 값임
	            return win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({ button: 1, which: 2 }), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
	        }
	        return false;
	    };
    }

	nexacro._syshandler_ontouchstart = function (_sysEvent, node, evt)
	{
		if (evt.stopped === true) 
		{
			return;
		}

		// init or orientationchange 시점에 이벤트 중지

		var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (!win || win._isFrozen)
		{
		    return;
		}

		if (elem)
		{
		    //evt.preventDefault();

		    var curTime = (evt.timeStamp || Date().now());

		    var touches = evt.touches, changedTouches = evt.changedTouches;
		    var touch_len = touches.length, change_len = changedTouches.length;
		    var type = evt.type || "touchstart";
		    var is_first = (touch_len == change_len);

		    var touch, touch_node, touch_elem, touch_info;
		    var touchid, changed, windowX, windowY, screenX, screenY;

		    var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

		    for (var i = 0; i < change_len; i++)
		    {
		        touch = changedTouches[i];
		        changed_ids[touch.identifier] = true;
		    }

		    for (var i = 0; i < touch_len; i++)
		    {
		        touch = touches[i];
		        touch_node = touch.target;
		        if (touch_node && touch_node != node)
		        {
		            touch_elem = nexacro.__findParentElement(touch_node);
		        }
		        else
		        {
		            touch_elem = elem;
		        }

		        touchid = touch.identifier;
		        changed = changed_ids[touchid];
		        windowX = touch.pageX || touch.clientX;
		        windowY = touch.pageY || touch.clientY;
		        screenX = touch.screenX || windowX;
		        screenY = touch.screenY || windowY;

		        touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, changed, windowX, windowY, screenX, screenY);
		        touch_infos.push(touch_info);
		        if (changed)
		        {
		            changed_touch_infos.push(touch_info);
		        }
		    }

		    ret = win._on_gesture_sys_touchstart(elem, touch_infos, changed_touch_infos, curTime);

		    return;
		}

	    // 일부 Android 기본브라우저에서 Default action으로 제스쳐 수행시 touchend,cancel 모두 발생하지 않는 경우가 있음

        // 옵티머스뷰1 기본브라우저 버그
	    // 2손 제스쳐시 제스쳐시작시 touchstart가 한번 더 나옴. (모두다 cancel 처리하면 안됨)
	    // 1손 제스쳐는 touchstart가 나오지 않음.

        // 아래는 정상적인 브라우저의 경우 아예 해당이 되지 않는다.
		if (evt.touches && evt.changedTouches &&
            evt.touches.length == 1 && evt.changedTouches.length == 1 &&
            evt.touches.length == evt.changedTouches.length)
		{
            // this is first touchstart
		    var manager = win._getTouchManager();
		    var curTouches = manager._currentTouches;
		    var curTime = (evt.timeStamp || new Date().getTime());
		    var len = curTouches ? curTouches.length : 0;
		    if (len > 0)
		    {
		        // 유실된 touch를 모두 cancel 처리한다.
		        if (len == 2)
		        {
                    // 2손 제스쳐시 나오는 touchstart를 무시
		            if (!manager._ignore_touchstart)
		                manager._ignore_touchstart = true;
		            else
		            {
		                for (var i = len - 1; i >= 0; i--)
		                    win._on_sys_touchcancel(elem, curTouches[i].touchid.slice(1), 0, 0, 0, 0, (evt.timeStamp || new Date().getTime()), (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime, (i === 0));

                        //if (옵티머스뷰1...)
		                manager._ignore_touchstart = false;
		            }
		        }
		        else if (len == 1)
		        {
		            for (var i = len - 1; i >= 0; i--)
		                win._on_sys_touchcancel(elem, curTouches[i].touchid.slice(1), 0, 0, 0, 0, (evt.timeStamp || new Date().getTime()), (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime, (i === 0));
		        }                    
		    }
		}

		if (elem)
		{
            // 장비에따라 여러 손가락이 동시에 들어오는 경우도 있음. 
			var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
			var ret = false;

            // TODO CHECK 비어있는 index를 채우는 경우가 있는지 확인해봐야함.
			var first_touchid = evt.touches ? evt.touches[0].identifier : null;
			for (var i = 0; i < touchlen; i++)
			{
			    var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
			    var clientX = touch.pageX || touch.clientX;
			    var clientY = touch.pageY || touch.clientY;
			    var screenX = touch.screenX || clientX;
			    var screenY = touch.screenY || clientY;
			    var curTime = (evt.timeStamp || new Date().getTime());
			    var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
			    var touchid = touch.identifier;
			    ret |= win._on_sys_touchstart(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1), first_touchid);
			}

			if (ret)
			{
			    nexacro._stopSysEvent(evt);
			    return true;
			}
		}

		return false;
	};
	nexacro._syshandler_ontouchend = function (_sysEvent, node, evt)
	{
		// init or orientationchange 시점에 이벤트 중지

	    var win = nexacro._findWindow(_sysEvent._win_win);
	    var elem = nexacro.__findParentElement(node);
	    if (!win || win._isFrozen)
	    {
	        return;
	    }

	    if (elem)
	    {
	        //evt.preventDefault();
	        var curTime = (evt.timeStamp || Date().now());

	        var touches = evt.touches, changedTouches = evt.changedTouches;
		    var touch_len = touches.length, change_len = changedTouches.length;

	        var touch, touch_node, touch_elem, touch_info;
	        var touchid, windowX, windowY, screenX, screenY;
	        var type = evt.type || touchend;

		    var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

		    for (var i = 0; i < change_len; i++)
		    {
		        touch = changedTouches[i];
		        touch_elem = nexacro.__getElementFromPoint(win.handle, touch.pageX, touch.pageY);
		        if (touch_elem)
		            elem = touch_elem;

		        touchid = touch.identifier;
		        windowX = touch.pageX || touch.clientX;
		        windowY = touch.pageY || touch.clientY;
		        screenX = touch.screenX || windowX;
		        screenY = touch.screenY || windowY;

		        touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, true, windowX, windowY, screenX, screenY);
		        changed_touch_infos.push(touch_info);
		    }

		    for (var i = 0; i < touch_len; i++)
		    {
		        touch = touches[i];
		        touch_elem = nexacro.__getElementFromPoint(win.handle, touch.pageX, touch.pageY);
		        if (touch_elem)
		            elem = touch_elem;
		        touchid = touch.identifier;
		        windowX = touch.pageX || touch.clientX;
		        windowY = touch.pageY || touch.clientY;
		        screenX = touch.screenX || windowX;
		        screenY = touch.screenY || windowY;

		        touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, false, windowX, windowY, screenX, screenY);
		        touch_infos.push(touch_info);
		    }

		    ret = win._on_gesture_sys_touchend(elem, touch_infos, changed_touch_infos, curTime);
		    return;
	    }

	    // 장비에따라 여러 손가락이 동시에 들어오는 경우도 있음. 
		var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
		var ret = false;
		for (var i = 0; i < touchlen; i++)
		{
		    var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
		    var clientX = touch.pageX || touch.clientX;
		    var clientY = touch.pageY || touch.clientY;
		    var screenX = touch.screenX || clientX;
		    var screenY = touch.screenY || clientY;
		    var curTime = (evt.timeStamp || new Date().getTime());
		    var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
		    var touchid = touch.identifier;
            var pointX = clientX;
            var pointY = clientY;
            elem = nexacro.__getElementFromPoint(win.handle, touch.pageX, touch.pageY);
            // Touch는 touchstart된 node에 touchmove, touchend를 fire하기때문에
		    // 실제 손 밑에 있는 node는 HitTest를 통해 알아내야 한다.
		    /*if (window.pageXOffset > 0)
		    {
		        pointX -= window.pageXOffset;
            }
            if (window.pageYOffset > 0)
		    {
		        pointY -= window.pageYOffset;
            }

            var hover_elem = nexacro.__getElementFromPoint(win.handle, pointX, pointY);
		    if (hover_elem)
		        elem = hover_elem;
*/
		    ret |= win._on_sys_touchend(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
		}

		if (ret)
		{
		    nexacro._stopSysEvent(evt);		      
		    return true;
		}

        // 터치를 preventDefault 할 경우 모바일 자체 Zoom이 되지 않는다고함. 참고
	};
	nexacro._syshandler_ontouchmove = function (_sysEvent, node, evt)
	{
		// init or orientationchange 시점에 이벤트 중지

	    var win = nexacro._findWindow(_sysEvent._win_win);
	    var elem = nexacro.__findParentElement(node);
		if ( !win && win._isFrozen )
		{
			return;
		}

		if ( elem)
		{
		    evt.preventDefault();
		    var curTime = (evt.timeStamp || Date().now());

		    // Touch는 touchstart된 node에 touchmove, touchend를 fire하기때문에
		    // 실제 손 밑에 있는 node는 HitTest를 통해 알아내야 한다.
		    var pointX, pointY;
		    var pageXOffset = (window.pageXOffset > 0 ? window.pageXOffset : 0);
		    var pageYOffset = (window.pageYOffset > 0 ? window.pageYOffset : 0);

		    var touches = evt.touches, changedTouches = evt.changedTouches;
		    var touch_len = touches.length, change_len = changedTouches.length;

		    var touch, touch_node, touch_elem, touch_info;
		    var touchid, changed, windowX, windowY, screenX, screenY;
		    var type = evt.type || "touchmove";

		    var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

		    for (var i = 0; i < change_len; i++)
		    {
		        touch = changedTouches[i];
		        changed_ids[touch.identifier] = true;
		    }

		    for (var i = 0; i < touch_len; i++)
		    {
		        touch = touches[i];		        
		        /*
                touch_node = touch.target;
		        if (touch_node && touch_node != node)
		        {
		            touch_elem = nexacro.__findParentElement(touch_node);
		        }
		        else
		        {
		            touch_elem = elem;
		        }
                */
		        touch_elem = nexacro.__getElementFromPoint(win.handle, touch.pageX, touch.pageY);
		        if (touch_elem)
		            elem = touch_elem;
		        touchid = touch.identifier;
		        changed = changed_ids[touchid];
		        windowX = touch.pageX || touch.clientX;
		        windowY = touch.pageY || touch.clientY;
		        screenX = touch.screenX || windowX;
		        screenY = touch.screenY || windowY;

		        touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, changed, windowX, windowY, screenX, screenY);
		        touch_infos.push(touch_info);
		        if (changed)
		        {
		            changed_touch_infos.push(touch_info);
		        }
		    }

		    ret = win._on_gesture_sys_touchmove(elem, touch_infos, changed_touch_infos, curTime);
		    return;
		}

	    // 장비에따라 여러 손가락이 동시에 들어오는 경우도 있음. 
		var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
		var ret = false;
		for (var i = 0; i < touchlen; i++)
		{
		    var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
		    var clientX = touch.pageX || touch.clientX;
		    var clientY = touch.pageY || touch.clientY;
		    var screenX = touch.screenX || clientX;
		    var screenY = touch.screenY || clientY;
		    var curTime = (evt.timeStamp || new Date().getTime());
		    var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
		    var touchid = touch.identifier;
		    var pointX = clientX;
		    var pointY = clientY;

		    // Touch는 touchstart된 node에 touchmove, touchend를 fire하기때문에
		    // 실제 손 밑에 있는 node는 HitTest를 통해 알아내야 한다.
            if (window.pageXOffset > 0)
		    {
		        pointX -= window.pageXOffset;
            }
            if (window.pageYOffset > 0)
		    {
		        pointY -= window.pageYOffset;
            }

            var hover_elem = nexacro.__getElementFromPoint(win.handle, pointX, pointY);
		    if (hover_elem)
		        elem = hover_elem;

		    ret |= win._on_sys_touchmove(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
		}

		if (ret)
		{
		    nexacro._stopSysEvent(evt);		
		    return true;
		}

	    // 아래 케이스에 대해 다른 해결방법을 찾아야 할듯

        /*
	    // 갤럭시탭 기본브라우저 preventDefault 하지 않으면 touchmove가 한번만 나옴.
		if (nexacro._OS == "Android" && nexacro._Browser == "Safari")
		{
            // Device 정보를 정확히 알 수는 없다. ..
		    nexacro._stopSysEvent(evt);
		        
		    _sysEvent._cur_win.__clearGC();
		    return true;
		}
        */
	};
	nexacro._syshandler_ontouchcancel = function (_sysEvent, node, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    var elem = nexacro.__findParentElement(node);
	    if (!win || win._isFrozen)
	    {
	        return;
	    }

	    if (elem)
	    {
	        evt.preventDefault();
	        var curTime = (evt.timeStamp || new Date().getTime());

	        var touches = evt.touches, changedTouches = evt.changedTouches;
	        var touch_len = touches.length, change_len = changedTouches.length;

	        var touch, touch_node, touch_elem, touch_info;
	        var touchid, windowX, windowY, screenX, screenY;
	        var type = evt.type || "touchcancel";
	        var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

	        for (var i = 0; i < change_len; i++)
	        {
	            touch = changedTouches[i];
	            touch_node = touch.target;
	            if (touch_node && touch_node != node)
	            {
	                touch_elem = nexacro.__findParentElement(touch_node);
	            }
	            else
	            {
	                touch_elem = elem;
	            }

	            touchid = touch.identifier;
	            windowX = touch.pageX || touch.clientX;
	            windowY = touch.pageY || touch.clientY;
	            screenX = touch.screenX || windowX;
	            screenY = touch.screenY || windowY;

	            touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, true, windowX, windowY, screenX, screenY);
	            changed_touch_infos.push(touch_info);
	        }

	        for (var i = 0; i < touch_len; i++)
	        {
	            touch = touches[i];
	            touch_node = touch.target;
	            if (touch_node && touch_node != node)
	            {
	                touch_elem = nexacro.__findParentElement(touch_node);
	            }
	            else
	            {
	                touch_elem = elem;
	            }

	            touchid = touch.identifier;
	            windowX = touch.pageX || touch.clientX;
	            windowY = touch.pageY || touch.clientY;
	            screenX = touch.screenX || windowX;
	            screenY = touch.screenY || windowY;

	            touch_info = new nexacro.Touch(touchid, type, curTime, touch_elem, false, windowX, windowY, screenX, screenY);
	            touch_infos.push(touch_info);
	        }

	        ret = win._on_gesture_sys_touchcancel(elem, touch_infos, changed_touch_infos, curTime);
	        return;
	    }

	    // 장비에따라 여러 손가락이 동시에 들어오는 경우도 있음. 
	    var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
	    var ret = false;
	    for (var i = 0; i < touchlen; i++)
	    {
	        var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
	        var clientX = touch.pageX || touch.clientX;
	        var clientY = touch.pageY || touch.clientY;
	        var screenX = touch.screenX || clientX;
	        var screenY = touch.screenY || clientY;
	        var curTime = (evt.timeStamp || new Date().getTime());
	        var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
	        var touchid = touch.identifier;
            var pointX = clientX;
            var pointY = clientY;

	        // Touch는 touchstart된 node에 touchmove, touchend를 fire하기때문에
	        // 실제 손 밑에 있는 node는 HitTest를 통해 알아내야 한다.
		    if (window.pageXOffset > 0)
		    {
		        pointX -= window.pageXOffset;
            }
            if (window.pageYOffset > 0)
		    {
		        pointY -= window.pageYOffset;
            }

            var hover_elem = nexacro.__getElementFromPoint(win.handle, pointX, pointY);
	        if (hover_elem)
	            elem = hover_elem;

	        ret |= win._on_sys_touchcancel(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
	    }
	};


	nexacro._syshandler_ondblclick = function(_sysEvent, node, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElement(node);
		if (win && elem)
		{
		    _sysEvent._cur_win.__clearGC();
		    var ret = win._on_sys_dblclick(elem, nexacro._getSysEventBtnString({ button: 1, which: 1 }), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
		       
		    return ret;
		}
		return false;
	};

	nexacro._syshandler_onmouseover = function (_sysEvent, node, fromnode, evt) //mouseenter
	{
	  /*  if (!application)
	        return false;
			*/
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    var elem = nexacro.__findParentElement(node);
	    var from_elem = nexacro.__findParentElement(fromnode);
	    var end_elem;

	    if (win && elem && elem != from_elem )
	    {
	        var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"))); //button info
	        var ret;

	        // check mouseenter
	        if (from_elem)
	            end_elem = win._findCommonParentElement(elem, from_elem);
            else
	            end_elem = win._findRootElement();

	        // check popup
	        if (!end_elem)
	            end_elem = win._findPopupElement(elem);
	        if (!end_elem)
	            end_elem = win._findRootElement();

	        if (end_elem)
	        {
	            var fire_elem = [];

	            // get mouseenter
	            for (; elem && elem != end_elem; elem = elem.parent_elem)
	            {	
	            	if (elem.linkedcontrol)
	            	{	            		
	            		fire_elem.push(elem);
	            	}
	            }
	            // fire mouseenter
	            for (var i = fire_elem.length-1; i >= 0; i--)
	            {	            
	                ret = win._on_sys_mouseenter(fire_elem[i], from_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
	            }
            }
	        return ret;
	    }
	    return false;
	};

	nexacro._syshandler_onmouseout = function (_sysEvent, node, tonode, evt) //mouseleave
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    var elem = nexacro.__findParentElement(node);
	    var to_elem = nexacro.__findParentElement(tonode);
	    var end_elem;

	    if (win && elem && elem != to_elem)
	    {
	        var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"))); //button info
	        var ret;

	        // check mouseleave
	        if (to_elem)
	            end_elem = win._findCommonParentElement(elem, to_elem);
	        else
	            end_elem = win._findRootElement();

	        // check popup
	        if (!end_elem)
	            end_elem = win._findPopupElement(elem);
	        if (!end_elem)
	            end_elem = win._findRootElement();

	    	// fire mouseleave

	        if (end_elem) 
	        {
	            for (; elem && elem != end_elem; elem = elem.parent_elem)//when popup is closed
	            {
	            	if (elem.linkedcontrol)
	            	{
	            		ret = win._on_sys_mouseleave(elem, to_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
	            	}
	            }
	        }
			return ret;
		}
		return false;
	};

	if (nexacro._Browser != "IE" || (nexacro._Browser == "IE" && nexacro._OSVersion >= 6.0))// NT6.0 : Vista
	{
	    nexacro._syshandler_onkeydown = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	        var elem = nexacro.__findParentElementForKeyEvent(node, win);
	        if (win && elem)
	        {
	            _sysEvent._cur_win.__clearGC();
	            win._on_sys_keydown(elem, nexacro._getSysEventKeyCode(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);
	            if (elem._event_stop)
	            {
	                // form에서 tab키가 처리되면 preventDefault
	                nexacro._stopSysEvent(evt);
	                elem._event_stop = false;
	                return true;
	            }

	            return true; // keypress, input, propertychange 이벤트 발생을 위해
	        }
	        return false;
	    };
	}
	else
	{
	    nexacro._syshandler_onkeydown = function (_sysEvent, node, evt)
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
	        var elem = nexacro.__findParentElementForKeyEvent(node, win);
	        if (win && elem)
	        {
	            _sysEvent._cur_win.__clearGC();
	            var keycode = nexacro._getSysEventKeyCode(evt);
	            win._on_sys_keydown(elem, keycode, evt.altKey, evt.ctrlKey, evt.shiftKey);
	            if (elem._event_stop)
	            {
	                // form에서 tab키가 처리되면 preventDefault
	            	nexacro._stopSysEvent(evt);
	                elem._event_stop = false;
	            	return true;
	            }

	            return true; // keypress, input, propertychange 이벤트 발생을 위해
	        }
	        return false;
	    };
	}
	nexacro._syshandler_onkeypress = function (_sysEvent, node, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElementForKeyEvent(node, win);
		if (win && elem)
		{
		    _sysEvent._cur_win.__clearGC();
		    var ret = win._on_sys_keypress(elem, evt.keyCode, evt.charCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
		    if (elem._event_stop)
		    {
		        // form에서 tab키가 처리되면 preventDefault
		        nexacro._stopSysEvent(evt);
		        elem._event_stop = false;
		        return true;
		    }

		    return ret;
		}
		return false;
	};
	nexacro._syshandler_onkeyup = function (_sysEvent, node, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
		var elem = nexacro.__findParentElementForKeyEvent(node, win);
		if (win && elem)
		{		    
		    return win._on_sys_keyup(elem, nexacro._getSysEventKeyCode(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);		        
		}
		return false;
	};
	
	//==============================================================================
	nexacro._syshandler_onactivate = function (_sysEvent, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    if (win && win._on_sys_activate)
	    {
	        _sysEvent._cur_win.__clearGC();
		    var ret = win._on_sys_activate();
		        
		    return ret;
		}
		return false;
	};

	nexacro._syshandler_ondeactivate = function (_sysEvent, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);

	    if (win)
	    {
	        var doc = win._dest_doc;
	        if (doc)
	        {
	            var active_node = win._dest_doc.activeElement;

	            if (active_node)
	            {
	                var active_elem = active_node._linked_element;
	                if (active_elem && active_elem instanceof nexacro._WebBrowserPluginElement)
	                {
	                    return false;
	                }
	            }
	        }

	        if (win._on_sys_deactivate)
	        {
	            _sysEvent._cur_win.__clearGC();
	            var ret = win._on_sys_deactivate();
	              
	            return ret;
	        }
	    }
	    return false;
	};

    nexacro._syshandler_onbeforeclose = function (_sysEvent, evt)
    {
        var win = nexacro._findWindow(_sysEvent._cur_win);
        var confirm_message;
        if (win && win._on_sys_beforeclose)
        {
            confirm_message = win._on_sys_beforeclose();
        }

        if (confirm_message !== undefined && confirm_message !== "" && confirm_message !== null)
        {
            if (evt)
                evt.returnValue = confirm_message;
            return confirm_message;
        }
    };

	nexacro._syshandler_onclose = function (_sysEvent, evt)
	{
	    _sysEvent._stopDetectWindowMove();

	    var win = nexacro._findWindow(_sysEvent._cur_win);
		if (win)
		{
		    var _cur_win = _sysEvent._cur_win;
		    _sysEvent._stopDocEventHandler();
		    _sysEvent.clearAll();

		    var ret = false;
		    if (win._on_sys_close)
		    {
		        if (win._is_main && _application)
		            _application.on_fire_onexit();

		        ret = win._on_sys_close();
		    }
		    _cur_win.__destroyGC();

		    nexacro._finalizeHTMLSysTimerManager(_cur_win);
	        nexacro._finalizeHTMLSysEvent(_cur_win);
	        nexacro._finalizeGlobalObjects(_cur_win);

	        
			return ret;
		}
		return false;
	};

	nexacro._syshandler_onresize = function (_sysEvent, evt) //window resize
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    if (win)
	    {
	        var w = nexacro._getWindowHandleClientWidth(win.handle);
	        var h = nexacro._getWindowHandleClientHeight(win.handle);

	        if (w != win.clientWidth || h != win.clientHeight)
	        {
	            // Android인 경우 키보드가 나오면서 Resize가 되면, Frame등 layout이 변하면서
	            // 사용자가 입력하기위해 터치한 곳과 다른 화면을 보게된다.

	            // 스크롤 보정등으로 해결이 안될듯 하여 키보드가 나올것 같은 상황에서의 resize를 무시한다.
	            // (세로로 화면 축소가 되는 상황만)

	            if (nexacro._OS == "Android" && win._is_active_window)
	            {
	                var is_input_focused = false;
	                if (win._last_focused_elem &&
                        (win._last_focused_elem.isInputElement() || win._last_focused_elem instanceof nexacro.TextAreaElement))
	                    is_input_focused = true;

	                if (is_input_focused && (w == win.clientWidth && h < win.clientHeight))
	                    return false;
	            }

	            _sysEvent._cur_win.__clearGC();
	            var ret = win._on_sys_resize(w, h);                

	            if (nexacro._OS == "iOS" && parseFloat(nexacro._OSVersion) >= 8)
	            {
	                // iOS8 에서 화면 회전 직후 resize하면, body가 이상하게 스크롤되는 버그가 있음
	                // 화면이 핀치줌으로 확대되지 않은 상태일 경우 보정처리
	                if (window.innerWidth == nexacro._getWindowHandleClientWidth(win.handle) &&
                        window.innerHeight == nexacro._getWindowHandleClientHeight(win.handle))
	                {
	                    // 확대되지 않았다.
	                    document.body.scrollLeft = 0;
	                }
	            }

	            return ret;
	        }
	    }

	    return false;
    };
	
	nexacro._syshandler_onmove = function (_sysEvent, evt) //window move
	{
	    var win = nexacro._findWindow(_sysEvent._win_win);
	    if (win)
	    {
	        var x = nexacro._getWindowHandlePosX(win.handle);
	        var y = nexacro._getWindowHandlePosY(win.handle);

	        if (x != win.left || y != win.top)
	        {	               
	            return win._on_sys_move(x, y);
	        }
	    }
	    return false;
	};

	nexacro._syshandler_onload = function (_sysEvent, evt)
	{
	    var win = nexacro._findWindow(_sysEvent._cur_win);
	    if (win)
	    {
	        var _cur_win = _sysEvent._cur_win;

	        var ret = false;
	        if (win._on_sys_load)
	            ret = win._on_sys_load(_cur_win);
	        _cur_win.__destroyGC();
	        return ret;
	    }
	    return false;
	};
	

    if (!nexacro._isTouchInteraction)
    {
        //application.usecontextmenu 처리위해
	    nexacro._syshandler_oncontextmenu = function (_sysEvent, node, evt)     
	    {
	        var win = nexacro._findWindow(_sysEvent._win_win);
		    var elem = nexacro.__findParentElement(node);
		    if (win && elem)
		    {		        
			    var ret = win._on_sys_contextmenu(elem);
			    if (!ret || (win.frame._is_popup_frame && node.tagName != "INPUT" && node.tagName != "IMG"))
			    {
				    ret = nexacro._stopSysEvent(evt);
			    }
			    else
			    {
				    ret = true;
			    }
			  
			    return ret;
		    }
		    return true;
	    };
    }
    else
    {
        nexacro._syshandler_oncontextmenu = nexacro._emptyFn;
    }

    nexacro._syshandler_onorientationchange = function (_sysEvent, evt)
    {
        var win = nexacro._findWindow(_sysEvent._win_win);
        if (win && win.frame)
        {
            win.frame._on_orientationchange(nexacro._getMobileOrientation());
        }
    };

	nexacro._syshandler_onselectstart = function (_sysEvent, node, evt)
	{
		if (node && 
			((node.tagName == "INPUT" && (node.type == "text" || node.type == "password")) ||
			    node.tagName == "TEXTAREA")) 
		{
			return true;
		}
		return nexacro._stopSysEvent(evt);
	};
	nexacro._syshandler_dragstart = function (_sysEvent, node, evt)
	{
		return nexacro._stopSysEvent(evt);
	};


	//==============================================================================
	// Window Handle API's	
	if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
	{
	    nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\" xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>\n"
							    + "<head>\n"
                                + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
							    + "<style>\n"
							    + "v\\:shape{behavior:url(#default#VML);}\n"
							    + "v\\:fill{behavior:url(#default#VML);}\n"
							    + "v\\:path{behavior:url(#default#VML);}\n"
							    + "v\\:line{behavior:url(#default#VML);}\n"
							    + "v\\:textpath{behavior:url(#default#VML);}\n"
							    + "o\\:opacity2{behavior:url(#default#VML);}\n"
							    + "</style>\n"
							    + "</head>\n"
							    + "<body style='margin:0;border:none;background:transparent;'>\n"
							    + "<script type='text/javascript'>\n"
                                + "var nexacro;"
                                + "if (window.dialogArguments) nexacro = window.dialogArguments.nexacro;\n"
							    + "if (!nexacro) nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro && window.opener) nexacro = window.opener.nexacro;"
							    + "nexacro_HTMLSysEvent={};\n"
							    + "nexacro._initHTMLSysEvent(window, document);"
                                + "nexacro._preparePopupManagerFrame(window);"
                                + 'function _inputDOM_nodeClick(_input){ _input.click();}'
							    + "</script>\n"
							    + "</body>\n"
							    + "</html>";
	}
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 9)
	{
	    nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							    + "<head>\n"
							    + "</head>\n"
							    + "<body style='margin:0;border:none;'>\n"
							    + "<script type='text/javascript'>\n"
							    + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
							    + "nexacro_HTMLSysEvent={};\n"
							    + "nexacro._initHTMLSysEvent(window, document);"
                                + "nexacro._preparePopupManagerFrame(window);"
                                + 'function _inputDOM_nodeClick(_input){ _input.click();}'
							    + "</script>\n"
							    + "</body>\n"
							    + "</html>";
	}
    else if(nexacro._isTouchInteraction)
	{
        nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							    + "<head>\n"
							    + "<style>\n"
							    + "div {\n"
							    + "-moz-user-select:none;\n"
							    + "-webkit-user-select:none;\n"
							    + "-webkit-touch-callout:none;\n"
							    + "-webkit-appearance:none;\n"
							    + "-webkit-tap-highlight-color:rgba(0,0,0,0);\n"
                                + "outline: none;\n"
							    + "}\n"
							    + "</style>\n"
							    + "</head>\n"
							    + "<body style='margin:0;border:none;'>\n"
							    + "<script type='text/javascript'>\n"                             
							    + "nexacro = parent.nexacro;"                            
							    + "window.nexacro_HTMLSysEvent={};\n"
							    + "nexacro._initHTMLSysEvent(window, document);"
							    + "</script>\n"
							    + "</body>\n"
							    + "</html>";
	}
	else
	{
        nexacro._doc_init_html = "<html lang=\"" + nexacro._BrowserLang.substr(0, 2) + "\">\n"
							    + "<head>\n"
							    + "<style>\n"
							    + "div {\n"
                                + "outline: none;\n"
							    + "}\n"
							    + "</style>\n"
							    + "</head>\n"
							    + "<body style='margin:0;border:none;'>\n"
							    + "<script type='text/javascript'>\n"                             
                                + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
							    + "window.nexacro_HTMLSysEvent={};\n"
							    + "nexacro._initHTMLSysEvent(window, document);"
                                + "nexacro._preparePopupManagerFrame(window);"
							    + "</script>\n"
							    + "</body>\n"
							    + "</html>";
    }

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
	{
        nexacro._doc_head_style = "v\\:shape{behavior:url(#default#VML);}\n"
							    + "v\\:fill{behavior:url(#default#VML);}\n"
							    + "v\\:path{behavior:url(#default#VML);}\n"
							    + "v\\:line{behavior:url(#default#VML);}\n"
							    + "v\\:textpath{behavior:url(#default#VML);}\n"
							    + "o\\:opacity2{behavior:url(#default#VML);}\n";
    }
    else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9)
    {
        nexacro._doc_head_style = "";
    }
	else if (nexacro._Browser == "IE" && nexacro._BrowserVersion >= 10)
	{
	    nexacro._doc_head_style = "input::-ms-clear { display: none; }\n"
                                + "input::-ms-reveal { display: none; }\n";
	}
	else if(nexacro._isTouchInteraction)
	{
	    nexacro._doc_head_style = "div {\n"
							    + "-moz-user-select:none;\n"
							    + "-webkit-user-select:none;\n"
							    + "-webkit-touch-callout:none;\n"
							    + "-webkit-appearance:none;\n"
							    + "-webkit-tap-highlight-color:rgba(0,0,0,0);\n"
                                + "outline: none;\n"
							    + "}\n";
	}
	else
	{
	    nexacro._doc_head_style = "div {\n"
                                + "outline: none;\n"
							    + "}\n"
                                + "Textarea::-webkit-scrollbar { display: none; }";
	}
	
	nexacro._createWindowHandle = function(parent_win, target_win, name, left, top, width, height, resizable, layered, taskbar, is_main)
	{
	    
	        var _win_handle = null;
	        if (is_main == true)
	        {
	            _win_handle = nexacro._getMainWindowHandle();
	            nexacro._mainwindow_handle = _win_handle;
	        }
	        else
	        {
	            var parent_handle = null;
	            if (parent_win) parent_handle = parent_win.dest_handle;
	            _win_handle = nexacro.__createWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, taskbar);

	            // IE6에서 POPUP창이 차단되어 있으면 handle이 null나옴 (Popup 창 관련 사용자 에러발생해줘야 함.)
	            if (!_win_handle) return;
	        }

	        // Calculate zoom ratio for window
	        nexacro.__setViewportScale();

	        _win_handle.document.body.style.overflow = "visible";

	        // 2013.07.12 Runin : RP_32904
	        // 실행환경마다 알맞은 스타일값을 가지도록 하기 위함.
	        var head = _win_handle.document.head;
	        if (head && head.children)
	        {
	            var child = head.children;
	            for (var i = 0; i < child.length; i++)
	            {
	                if (child[i].nodeName == "STYLE")
	                {
	                    child[i].innerHTML = nexacro._doc_head_style;
	                    break;
	                }
	            }
	        }

	        // [RP_33521] by ODH :  IE 8이하의 경우, main window에서 Open Window의 DOM을 create 하면 속도가 많이 느림.
	        //                      때문에 Open Window의 Event를 fire하여 Open Window가 DOM Create 하도록 함.
	        _win_handle._linked_window = target_win;
	        target_win.attachHandle(_win_handle);
	        if (!is_main)
	        {
	            // [RP_33521] by ODH : IE10에서는 open window에 setTimeout 하면 event handler 함수에 안들어온다.
	            //_win_handle.setTimeout(function () { _win_handle.nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload'); }, 10);
	            setTimeout(function () { nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload'); }, 10);
	        }
	    
	    
	};
    
	nexacro._setLinkedWindow = function (handle, target_win)
	{
	    handle._linked_window = target_win;
	};

	nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main, parentframe, frameopener, arr_arg)
	{
	    var _win_handle = null;
	    var parent_handle = null;
	    if (parent_win) parent_handle = parent_win.dest_handle;
	    return nexacro.__createOpenWindowHandle(parent_handle, name, formurl, left, top, width, height, resizable, layered, taskbar, parent_win, parentframe, frameopener, arr_arg);
	};

	

	nexacro._setLocalStorageforOpen = function (id, parentwin, parentframe, frameopener, arrarg)
	{
		//cssurl
		if (nexacro._cssurls)
			nexacro._setLocalStorage("cssurls", nexacro._cssurls, 2);

		if (nexacro._popupframeoption[id])
		{
			var value = JSON.stringify(nexacro._popupframeoption[id]);
			nexacro._setLocalStorage("popupframeoption", value, 2);
			
			if (parentwin)
			{
				parentwin._popupparentframe = parentframe;
				parentwin._popupframeopener = frameopener;
				parentwin._popuparrarg = arrarg;
			}
			else
			{
				window._popupparentframe = parentframe;
				window._popupframeopener = frameopener;
				window._popuparrarg = arrarg;
			}
		}
		//this._popupframeoption[id] = {
		//	"_openstyles": openstyles,
		//	"_formurl": formurl,
		//	"_parentwindow": parent_window,
		//	"_opener": frameopener,
		//	"_args": arr_arg,
		//	"_parentframe": parentframe,
		//	"_left": left,
		//	"_top": top,
		//	"_width": width,
		//	"_height": height
		//};
	};

	nexacro.__createOpenWindowHandle = function (_handleParent, name, formurl, left, top, width, height, resizable, /*[nouse]*/layered, /*[nouse]*/taskbar, parentwin, parentframe, frameopener, arr_arg)
	{
	    if (left == null)
	        left = Math.floor((screen.availWidth - width) / 2);

	    if (top == null)
	        top = Math.floor((screen.availHeight - height) / 2);

	    var dochandle = _handleParent ? _handleParent.ownerDocument : null;
	    var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
	    var _win_handle;

	    var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
                + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
                + "resizable=" + (resizable ? "yes" : "no");

		//var popupurl = "./popup.html";
	    var popupurl = "./popup.html";

	    if (formurl)
	    {
	        popupurl += "?formname=" + encodeURIComponent(formurl);
	        popupurl += "&framename=" + name;
	    }

	    nexacro._setLocalStorageforOpen(name, parentwin, parentframe, frameopener, arr_arg);

	    var url = nexacro._transfullurl(nexacro._project_absolutepath, popupurl);	    
	    _win_handle = _parent_win.open(url, name, opt);

	    if (!_win_handle)
	        return null;

	    return _win_handle;
	};


	nexacro.__createWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, /*[nouse]*/layered, /*[nouse]*/taskbar)
	{
		if (left == null)
			left = Math.floor((screen.availWidth - width) / 2);
		
		if (top == null)
			top = Math.floor((screen.availHeight - height) / 2);

		var dochandle = _handleParent ? _handleParent.ownerDocument : null;
		var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
		var _win_handle;
		if (false && _parent_win.showModelessDialog)
		{
		    // TODO showModeless
		    // window_handle에 접근하려하면 Access Denied가 발생함.
            // -> 동일 domain으로 오픈해야 한다.
		    var opt = "dialogHeight:" + height + "px" + "; dialogLeft:" + left + "px" + "; dialogTop:" + top + "px" + "; dialogWidth:" + width + "px"
                    + "; center:no" + (resizable ? "; resizable:yes" : "")
                    + "; status:no";
		    _win_handle = _parent_win.showModelessDialog(document.URL + "empty.html", { nexacro: _parent_win.nexacro, parent: _parent_win }, opt);
		}
		else
		{
		    var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
                    + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
                    + "resizable=" + (resizable ? "yes" : "no");
		    _win_handle = _parent_win.open("", name, opt);
		}

	    // IE6에서 POPUP창이 차단되어 있으면 handle이 null나옴 (Popup 창 관련 사용자 에러발생해줘야 함.)
		if (!_win_handle)
		    return null;

	    // Initialized nexacro Object
		_win_handle.nexacro = _parent_win.nexacro;
		_win_handle.system = _parent_win.system;
		_win_handle._application = _parent_win._application;

		_win_handle._linked_window = target_win;

	    // clear all document -- set as about:blank && remain domain as nexacro._open_window_url
		_win_handle.document.open();

        // _win_handle에 설정한 GlobalVariable(nexacro,system, ..)이 IE8에서는 제대로 설정되지 않음. 2013.05.31 neoarc
	    // document같은 다른 곳에 담아 넘겨야 할 듯.

		_win_handle.document.write(nexacro._doc_init_html);
	    _win_handle.document.close();

		return _win_handle;
	};
	// if opened window loaded ==> excute DocInit_Html5.js ==> call target_window.on_init_sysevent_handlers()
   
	nexacro._createModalWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, lockmode)
    {

    };

	nexacro._createModalAsyncWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, lockmode)
	{
	    var parent_handle = null;
	    if (parent_win)
	    	parent_handle = parent_win.dest_handle;
	    var _win_handle = nexacro.__createModalAsyncWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, lockmode);

	    // IE6에서 POPUP창이 차단되어 있으면 handle이 null나옴 (Popup 창 관련 사용자 에러발생해줘야 함.)
	    if (!_win_handle) return;

	    _win_handle.document.body.style.overflow = "visible";
	    _win_handle._linked_window = target_win;

	    // [RP_33521] by ODH :  IE 8이하의 경우, main window에서 Open Window의 DOM을 create 하면 속도가 많이 느림.
	    //                      때문에 Open Window의 Event를 fire하여 Open Window가 DOM Create 하도록 함.
	    target_win.attachHandle(_win_handle);
	    setTimeout(function () { nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload'); }, 10);
	};

	nexacro.__createModalAsyncWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, layered, lockmode)
    {
        if (left == null)
            left = Math.floor((screen.availWidth - width) / 2);
        if (top == null)
            top = Math.floor((screen.availHeight - height) / 2);

        var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
			    + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
			    + "resizable=" + (resizable ? "yes" : "no");

        var dochandle = _handleParent ? _handleParent.ownerDocument : null;
        var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
        var _win_handle = _parent_win.open("", name, opt);

	    // IE6에서 POPUP창이 차단되어 있으면 handle이 null나옴 (Popup 창 관련 사용자 에러발생해줘야 함.)
        if (!_win_handle) return null;

        // Initialized nexacro Object
      
        if (_parent_win)
        {
            _win_handle.nexacro = _parent_win.nexacro;
            _win_handle.system = _parent_win.system;
            _win_handle._application = _parent_win._application;
        }
        
        _win_handle._linked_window = target_win;

        // clear all document -- set as about:blank && remain domain as nexacro._open_window_url
        _win_handle.document.open();
        _win_handle.document.write(nexacro._doc_init_html);
	    _win_handle.document.close();
        
        return _win_handle;

	};

	nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame)
	{
	    if (frame._window_type != 3)
	        return;

	    // modal async window를 감시하고 완전히 닫힌 후에 callback을 실행한다.
	    var main_handle = nexacro._getMainWindowHandle();

	    // clearinterval 해줘야 하기때문에 frame object를 key로 사용
        var timer_handle = main_handle.setInterval(function ()
	    {
	        if (_win_handle && _win_handle.closed)
	        {
	            frame._runCallback();

                // Safari,Opera는 clearInterval시 수행중이던 함수도 중단되는것 같다.
	            nexacro._removeModalAsyncCallbackHandler(frame);
            }
        }, 100);

		  if (!nexacro._closedmodalasync_list)
				nexacro._closedmodalasync_list =[];

            nexacro._closedmodalasync_list.push([frame, timer_handle]);
        
	};

	nexacro._removeModalAsyncCallbackHandler = function (frame)
	{
		if(!nexacro._closedmodalasync_list)
				return;

	    var list = nexacro._closedmodalasync_list;
	    var list_length = list.length;
	    for (var i = 0; i < list_length; i++)
	    {
	        var list_item = list[i];
	        if (list_item[0] == frame)
	        {
	            var main_handle = nexacro._getMainWindowHandle();
	            main_handle.clearInterval(list_item[1]);

	            for (var j = i; j < list_length - 1; j++)
	            {
	                list[j] = list[j + 1];
	            }
	            list.pop();
	            break;
	        }
	    }
	};

	nexacro._isWindowHandlePrepared = function(_win_handle)
	{
		return (_win_handle.document.body !== null);
	};
	
	nexacro._closeWindowHandle = function(_win_handle)
	{
	    if (_win_handle)
	    {
	        //nexacro._destroyManagerFrame() 이동 - popup과 따로 존재하므로 window별 매번 삭제
            if (nexacro._getMainWindowHandle() != _win_handle)
            {
                _win_handle.open('', '_self');
                _win_handle.close();
	        }
        }
	};

	nexacro._refreshWindow = nexacro._emptyFn;

	//------------------------------------------------------------------------------
	// window handle api
	nexacro._getMainWindowHandle = function()
	{
	    if (nexacro._mainwindow_handle)
	        return nexacro._mainwindow_handle;
	    else
	    {
	        if (window._popup === true)
	            return window.opener | window.parent;
	        return window;
	    }
	};	

	nexacro._getWindowHandle = function(_win_handle)
	{
	    var link_window = _win_handle._linked_window;
	    if (link_window && link_window._is_main)
	    {
	        return _win_handle;
        }
        return window;
	};

	nexacro._getWindowDocumentHandle = function(_win_handle)
	{
		return _win_handle.document;
	};

	nexacro._getWindowDestinationHandle = function(_win_handle)
	{
		return _win_handle.document.body;
	};
	
    if (nexacro._Browser == "Gecko") 
    {
	    nexacro._getWindowHandlePosX = function(_win_handle)
	    {
		    return _win_handle.mozInnerScreenX;
	    };
	    nexacro._getWindowHandlePosY = function(_win_handle)
	    {
		    return _win_handle.mozInnerScreenY;
	    };
    }
    else if(nexacro._Browser == "IE")
    {
	    nexacro._getWindowHandlePosX = function(_win_handle)
	    {
		    return _win_handle.screenLeft;
	    };
	    nexacro._getWindowHandlePosY = function(_win_handle)
	    {
		    return _win_handle.screenTop;
	    };
    }
    else 
    {
        nexacro._getWindowHandlePosX = function(_win_handle)
	    {
            return nexacro._gap_client_width;
	    };
        nexacro._getWindowHandlePosY = function(_win_handle)
        {
            return nexacro._gap_client_height;
        };
    }

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
    {
	    nexacro._getWindowHandleOuterWidth = function(_win_handle)
	    {
		    return _win_handle.document.documentElement.offsetWidth;
	    };
	    nexacro._getWindowHandleOuterHeight = function(_win_handle)
	    {
		    return _win_handle.document.documentElement.offsetHeight;
	    };
    }
    else if (nexacro._OS == "iOS" && parseFloat(nexacro._OSVersion) >= 8)
    {
        // iOS8 이상에서 window.outerWidth,Height 값이 0 으로 나옴. (iOS7은 정상)
        nexacro._getWindowHandleOuterWidth = function (_win_handle)
        {
            return _win_handle.document.documentElement.offsetWidth;
        };
        nexacro._getWindowHandleOuterHeight = function (_win_handle)
        {
            return _win_handle.document.documentElement.offsetHeight;
        };
    }
    else
    {
	    nexacro._getWindowHandleOuterWidth = function(_win_handle)
	    {
		    return _win_handle.outerWidth;
	    };
	    nexacro._getWindowHandleOuterHeight = function(_win_handle)
	    {
		    return _win_handle.outerHeight;
	    };
    }

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 8)
    {
        // TODO check
        // IE8은 offsetWidth는 약간의 오차가 있어 clientWidth가 정확하지만
        // window 생성 직후에는 clientWidth값이 0으로 설정되어있어 문제가 생긴다. how?
	    nexacro._getWindowHandleClientWidth = function(_win_handle)
	    {	    
            return _win_handle.document.documentElement.clientWidth;
	    };
	    nexacro._getWindowHandleClientHeight = function(_win_handle)
	    {
            return _win_handle.document.documentElement.clientHeight;
	    };
    }
    else if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 8)
    {
        nexacro._getWindowHandleClientWidth = function (_win_handle)
        {
            return _win_handle.document.documentElement.offsetWidth;
        };
        nexacro._getWindowHandleClientHeight = function (_win_handle)
        {
            return _win_handle.document.documentElement.offsetHeight;
        };
    }
    else if (nexacro._Browser == "IE")
    {
        nexacro._getWindowHandleClientWidth = function (_win_handle)
        {
            return _win_handle.innerWidth;
        };
        nexacro._getWindowHandleClientHeight = function (_win_handle)
        {
            return _win_handle.innerHeight;
        };
    }
    else
    {
	    nexacro._getWindowHandleClientWidth = function(_win_handle)
	    {
	        var _tester = nexacro._device_exception_tester;
	        if (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize))
	        {
	            return _win_handle.document.body.clientWidth;
	        }
	        else
                return _win_handle.innerWidth;
	    };
	    nexacro._getWindowHandleClientHeight = function(_win_handle)
	    {
	        var _tester = nexacro._device_exception_tester;
	        if (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize))
	        {
                // _win_handle.innerXXX -> 현재 화면에 표시할수 있는 pixel
	            return _win_handle.document.body.clientHeight;
	        }
	        else
                return _win_handle.innerHeight;
	    };
    }

	nexacro._setWindowHandleArea = function(_win_handle, x, y, w, h)
	{
		_win_handle.moveTo(x, y);
		_win_handle.resizeTo(w, h);
	};
	nexacro._setWindowHandlePos = function(_win_handle, x, y)
	{
		_win_handle.moveTo(x, y);
	};
	nexacro._setWindowHandleSize = function(_win_handle, w, h)
	{
		_win_handle.resizeTo(w, h);
	};

	nexacro._setWindowHandleZIndex = function (_win_handle, zindex)
	{
	    if (_win_handle.style)
	        _win_handle.style.zIndex = zindex;
	};
	
	nexacro._findWindow = function(_win_handle)
	{
		return _win_handle._linked_window;
	};
	nexacro._findDocumentWindow = function(_doc)
	{
		var _win_handle = (_doc.defaultView || _doc.parentWindow);
		return _win_handle._linked_window;
	};
	
	nexacro._flashWindow = function (_win_handle, type, count, interval)
	{
	};

	nexacro._setMouseHovertime = function (mousehovertime)
	{
	};

    nexacro._setWindowHandleText = function(_win_handle, titletext)
	{
        var doc = _win_handle.document;
        
        if (doc)
        {    
            return doc.title = titletext;
        }
    };

    nexacro._setWindowHandleStatusText = function (_win_handle, statustext)
    {
        if (window)
        {
            return window.status = statustext;
        }
    };

	//nexacro._setWindowHandleIcon =nexacro._emptyFn;
	nexacro._setWindowHandleIconObject = nexacro._emptyFn;

    if (!nexacro._isTouchInteraction)
    {
        nexacro._getMainWindowWidth = function (_win)
        {
            return _win.clientWidth;
        };
        nexacro._getMainWindowHeight = function (_win)
        {
            return _win.clientHeight;
        };
    }
    else
    {
        nexacro._getMainWindowWidth = function (_win)
        {
            var client_width = nexacro._getWindowHandleClientWidth(_win.handle);
            if (client_width !== 0)
                return client_width;

            var doc = _win._doc;
            if (doc)
            {
                var doc_elem = doc.documentElement;
                var width = 0;
                if (nexacro._OS == "iOS")
                {
                    if (doc_elem.clientWidth)
		            {
				        width = doc_elem.clientWidth;
                    }
                    else if (_win.innerWidth)
		            {
				        width = doc.body.clientWidth;	
                    }
                    else if (doc.body.clientWidth > 0)
		            {
				        width = _win.innerWidth;
		            }
                }
                else
                {
                    var w1 = _win.innerWidth ? _win.innerWidth : 0;
                    var w2;
                    var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;
			
                    if (doc_elem && doc_elem.clientWidth)
                    {
				        w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
			        }
			
                    if (w1 < w2)
                    {
                        if (w2 < w3)
                        {
					        width = doc.body.clientWidth;
				        }
                        else
                        {
					        width = doc_elem.clientWidth;
				        }
                    }
                    else
                    {
                        if (w1 < w3)
                        {
					        width = doc.body.clientWidth;
                        }
                        else
                        {
					        width = _win.innerWidth;
				        }
			        }
                }
            
                // 2014.05.16 neoarc; Viewport 조작 코드를 제거함. MLM에 의해 자동제어되므로 조작금지

                    return width;
            }
            return _win.clientWidth;
        };

        nexacro._getMainWindowHeight = function (_win)
        {
            var client_height = nexacro._getWindowHandleClientHeight(_win.handle);
            if (client_height !== 0)
                return client_height;

            var doc = _win._doc;
            if (doc)
            {
                var doc_elem = doc.documentElement;
                var height = 0;
                if (nexacro._OS == "iOS")
                {
                    if (doc_elem.clientHeight)
		            {
				        height = doc_elem.clientHeight;
                    }
                    else if (_win.innerHeight)
		            {
				        height = doc.body.clientHeight;	
                    }
                    else if (doc.body.clientHeight > 0)
		            {
				        height = _win.innerHeight;
		            }
                }
                else
                {
                    var w1 = _win.innerWidth ? _win.innerWidth : 0;
                    var w2;
                    var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;
			
                    if (doc_elem && doc_elem.clientWidth)
                    {
				        w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
			        }
			
                    if (w1 < w2)
                    {
                        if (w2 < w3)
                        {
					        height = doc.body.clientHeight;
				        }
                        else
                        {
					        height = doc_elem.clientHeight;
				        }
                    }
                    else
                    {
                        if (w1 < w3)
                        {
					        height = doc.body.clientHeight;
                        }
                        else
                        {
					        height = _win.innerHeight;
				        }
			        }
                }
                return height;
            }
            return _win.clientHeight;
        };
    }

   
    nexacro._hasCookieVariables = function ()
    {
    	return nexacro._getCookieVariables() ? true: false;
    };

	// type = 1: user, 2: engine, 3: envvar 4: envcookie
    nexacro._getLocalStorageKey = function (type, global)
    {
    	var localstoragekey = "";
    	var projectpath = nexacro._project_absolutepath ? nexacro._project_absolutepath : nexacro._getProjectBaseURL();
    	if (global)
    	{
    		localstoragekey = window.location.href;
    	}
    	else
    	{
    		var env = nexacro.getEnvironment();    		
    		localstoragekey = env.key + projectpath;
    	}

    	switch (type)
    	{
    		case 1: return localstoragekey + "user";
    		case 2: return projectpath + "engine";
    		case 3: return localstoragekey + "envvar";
    		case 4: return localstoragekey + "envcookie";
    	}
    };


    if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 6)
    {
        nexacro._setLocalStorage = nexacro._emptyFn;
        nexacro._getLocalStorage = nexacro._emptyFn;
        nexacro._removeLocalStorage = nexacro._emptyFn;
        nexacro._hasLocalStorage = nexacro._emptyFn;
    }
    else if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 7)
    {
        //localstoragekey 는 key + projectpath 로 함 
        // adl 이 달라도 projectpath가 같다면 localstroagekey는 공유한다.

        // type = 1: user, 2: engine, 3: envvar 4: envcookie
        nexacro._setLocalStorage = function (key, varValue, type, global)
        {
            var localstoragekey = nexacro._getLocalStorageKey(type, global);

            var iframenode = nexacro._managerFrameNode;
            if (iframenode)
            {
                var value;
                var vartype = (typeof varValue);
                if (vartype == "object")
                {
                    if (varValue instanceof nexacro.Date)
                        vartype = "nexacrodate";
                    else if (varValue instanceof Date)
                        vartype = "date";
                    else if (varValue instanceof nexacro.Decimal)
                        vartype = "decimal";
                }
                value = vartype + ":" + varValue;

                iframenode.setAttribute(key, value);
                iframenode.save(localstoragekey);
                return true;
            }
            return false;
        };

        nexacro._getLocalStorageAll = function (type)
        {
            var localstoragekey = nexacro._getLocalStorageKey(type, false);

            var iframenode = nexacro._managerFrameNode;
            if (iframenode)
            {
                iframenode.load(localstoragekey);
                var attribute = iframenode.getAttribute(key);
            }
        };


        nexacro._getLocalStorage = function (key, type, global)
        {
            var localstoragekey = nexacro._getLocalStorageKey(type, global);

            var iframenode = nexacro._managerFrameNode;
            if (iframenode)
            {
                iframenode.load(localstoragekey);
                var attribute = iframenode.getAttribute(key);
                if (attribute)
                {
                    var index = attribute.indexOf(":");
                    var vartype = attribute.substring(0, index);
                    var value = attribute.substring(index + 1);

                    if (vartype && value)
                    {
                        if (vartype == "number")
                        {
                            return Number(value);
                        }
                        else if (vartype == "boolean")
                        {
                            return (value == "true") ? true : false;
                        }
                        else if (vartype == "nexacrodate")
                        {
                            var year = value.substring(0, 4);
                            var month = value.substring(4, 6);
                            var date = value.substring(6, 8);
                            var hour = value.substring(8, 10);
                            var minute = value.substring(10, 12);
                            var second = value.substring(12, 14);
                            var millisecond = value.substring(14, 16);
                            return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
                        }
                        else if (vartype == "date")
                        {
                            return new Date(value);
                        }
                        else if (vartype == "decimal")
                        {
                            return new nexacro.Decimal(value);
                        }
                        else if (vartype == "undefined")
                        {
                            return value ? "undefined" : undefined;
                        }
                        return value;
                    }
                }
            }
        };

        nexacro._hasLocalStorage = function (key, type, global)
        {
            var localstoragekey = nexacro._getLocalStorageKey(type, global);

            var iframenode = nexacro._managerFrameNode;
            if (iframenode)
            {
                iframenode.load(localstoragekey);
                var attribute = iframenode.getAttribute(key);
                if (attribute)
                {
                    return true;
                }
            }
            return false;
        };

        nexacro._removeLocalStorage = function (key, type, global)
        {
            var localstoragekey = nexacro._getLocalStorageKey(type, global);

            var iframenode = nexacro._managerFrameNode;
            if (iframenode)
            {
                iframenode.load(localstoragekey);
                var attribute = iframenode.getAttribute(key);
                if (attribute)
                {
                    iframenode.removeAttribute(key);
                }

                iframenode.save(localstoragekey);
                return true;
            }
            return false;
        };
    }
    else  //localStorage
    {
        // type = 1: user, 2: engine, 3: envvar 4: envcookie
        nexacro._setLocalStorage = function (key, varValue, type, global)
        {
            var localstorage = window.localStorage;
            if (localstorage)
            {
                var localstoragekey = nexacro._getLocalStorageKey(type, global);

                if (localstoragekey)
                {
                    var localstoragedata = localstorage.getItem(localstoragekey);
                    var jsondata = {};
                    if (localstoragedata)
                    {
                        jsondata = JSON.parse(localstoragedata);
                    }

                    var findkey = jsondata[key];
                    if (findkey)
                    {
                        var vartype = (typeof varValue);
                        if (vartype == "object")
                        {
                            if (varValue instanceof nexacro.Date)
                                vartype = "nexacrodate";
                            else if (varValue instanceof Date)
                                vartype = "date";
                        }
                        findkey.type = vartype;
                        findkey.value = varValue + "";
                    }
                    else
                    {
                        var vartype = (typeof varValue);
                        if (vartype == "object")
                        {
                            if (varValue instanceof nexacro.Date)
                                vartype = "nexacrodate";
                            else if (varValue instanceof Date)
                                vartype = "date";
                            else if (varValue instanceof nexacro.Decimal)
                                vartype = "decimal";
                        }

                        jsondata[key] = { "type": vartype, "value": varValue + "" };
                    }

                    localstorage.setItem(localstoragekey, JSON.stringify(jsondata));
                    return true;
                }
            }
            return false;
        };

        nexacro._getLocalStorageAll = function (type)
        {
            var localstorage = window.localStorage;
            if (localstorage)
            {
                var localstoragekey = nexacro._getLocalStorageKey(type, false);

                if (localstoragekey)
                {
                    var localstoragedata = localstorage.getItem(localstoragekey);
                    var jsondata = {};
                    if (localstoragedata)
                    {
                        return JSON.parse(localstoragedata);
                    }
                }
            }
        };

        nexacro._getLocalStorage = function (key, type, global)
        {
            var localstorage = window.localStorage;
            if (localstorage)
            {
                var localstoragekey = nexacro._getLocalStorageKey(type, global);

                if (localstoragekey)
                {
                    var localstoragedata = localstorage.getItem(localstoragekey);
                    var jsondata = {};
                    if (localstoragedata)
                    {
                        jsondata = JSON.parse(localstoragedata);
                    }

                    var findkey = jsondata[key];
                    if (findkey)
                    {
                        var vartype = findkey.type;
                        var value = findkey.value;
                        if (value && vartype)
                        {
                            if (vartype == "number")
                            {
                                return Number(value);
                            }
                            else if (vartype == "boolean")
                            {
                                return (value == "true") ? true : false;
                            }
                            else if (vartype == "nexacrodate")
                            {
                                var year = value.substring(0, 4);
                                var month = value.substring(4, 6);
                                var date = value.substring(6, 8);
                                var hour = value.substring(8, 10);
                                var minute = value.substring(10, 12);
                                var second = value.substring(12, 14);
                                var millisecond = value.substring(14, 16);
                                return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
                            }
                            else if (vartype == "date")
                            {
                                return new Date(value);
                            }
                            else if (vartype == "decimal")
                            {
                                return new nexacro.Decimal(value);
                            }
                            else if (vartype == "undefined")
                            {
                                return value ? "undefined" : undefined;
                            }
                            return value;
                        }
                    }
                }
            }
        };

        nexacro._hasLocalStorage = function (key, type, global)
        {
            var localstorage = window.localStorage;
            if (localstorage)
            {
                var localstoragekey = nexacro._getLocalStorageKey(type, global);

                if (localstoragekey)
                {
                    var localstoragedata = localstorage.getItem(localstoragekey);
                    var jsondata = {};
                    if (localstoragedata)
                    {
                        jsondata = JSON.parse(localstoragedata);
                    }

                    var findkey = jsondata[key];
                    if (findkey)
                    {
                        return true;
                    }
                }
            }
            return false;
        };

        nexacro._removeLocalStorage = function (key, type, global)
        {
            var localstorage = window.localStorage;
            if (localstorage)
            {
                var localstoragekey = nexacro._getLocalStorageKey(type, global);

                if (localstoragekey)
                {
                    var localstoragedata = localstorage.getItem(localstoragekey);

                    var jsondata = {};
                    if (localstoragedata)
                    {
                        jsondata = JSON.parse(localstoragedata);
                    }

                    var findkey = jsondata[key];
                    if (findkey)
                    {
                        delete jsondata[key];
                    }
                    localstorage.setItem(localstoragekey, JSON.stringify(jsondata));
                }
            }
        };

        nexacro._copyLocalStorage = function (parentwin)
        {
            var storage = window.localStorage;
            var winkey = window.location.href;

            while (parentwin.parent != null)
            {
                parentwin = parentwin.parent;
            }

            var storagedata = storage.getItem(parentwin._handle.location.href);

            if (storagedata)
            {
                storage.setItem(winkey, storagedata);
            }
        };
    }

	nexacro._getGlobalValueData = function (key, url)
	{
	    if (nexacro._globalvalue)
	    {
	    	return nexacro._globalvalue;
	    }

	    if (window.name && key && url)
	    {
	        var globalvars = "";
	        var items = window.name.split(',');
	        if (items.length)
	        {
	            var fields = items[0].split(':');
	            if (fields[0] == key && unescape(fields[1]) == url)
	            {
	                globalvars = items.splice(1, items.length - 1).join(',');
	            }
	        }
	        nexacro._globalvalue = globalvars;
	        return globalvars;
	    }
	};

	nexacro._getSystemFont = function ()
	{
	    return new nexacro._FontObject("9pt Helvetica");
	};

	//////////////////////////////////////////////////////////////////////////
	// Popup Window
	nexacro._createPopupWindowHandle = function (parent_win, target_win, name, left, top, width, height) 
	{
		var _doc = parent_win._dest_doc;
		var dest_handle = parent_win.dest_handle;
	     
        var parent_width = parent_win.clientWidth;
        var parent_height = parent_win.clientHeight;
	    
	    var handle = null;
        if (left == null)
        {
            left = Math.floor((parent_width - width) / 2);
		}
	    if (top == null)
	    {
		    top = Math.floor((parent_height - height) / 2);
	    }

	    handle = _doc.createElement("div");
	    handle.id = 'popupwindow_' + name;

	    var layer_info;
	    if (target_win.comp && target_win.comp instanceof nexacro._WaitControl)
	    {
	        // WaitComponent는 무조건 body에 append
	        layer_info = {};
	        layer_info.popup_zindex = nexacro._zindex_waitcursor;
	    }
	    else if (target_win.comp)
	    {
	        // Component가 속한 Layer에 생성해야 함.
	        layer_info = target_win._getComponentLayerInfo(target_win.comp);
	    }

	    if (layer_info)
	    {
	        if (layer_info.is_modal)
	        {
	            // modal; overlay에 append
	            var frame = layer_info.frame;
	            var overlay_elem = frame._modal_overlay_elem;
	            dest_handle = overlay_elem.handle;
	            dest_handle.appendChild(handle);
	        }
	        else
	        {
	            // main; first modal overlay 앞에 insert
	            if (layer_info.ref_first_modal_frame)
	            {
	                var frame = layer_info.ref_first_modal_frame;
	                _ref_handle = frame._modal_overlay_elem.handle;
	                dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
	                dest_handle.insertBefore(handle, _ref_handle);
	            }
	            else
	            {
	            	dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
	            	dest_handle.appendChild(handle);
	            }
	        }
	    }
	    else
	    {
	        // main
	    	dest_handle = nexacro._getPopupWindowDestinationHandle(handle);
	    	dest_handle.appendChild(handle);
	    }
        
	    handle.dest_handle = dest_handle;
	    handle._linked_window = target_win;
	    
	    var handle_style = handle.style;
	    handle_style.position = "absolute";
		handle_style.overflow = "hidden";
		handle_style.margin = "0px";
		handle_style.border = "0px";
		
		handle_style.left = (left | 0) + "px";
		handle_style.top = (top | 0) + "px";
		handle_style.width = (width | 0) + "px";
		handle_style.height = (height | 0) + "px";

		handle_style.zIndex = layer_info ? layer_info.popup_zindex : nexacro._zindex_popup;
		
		target_win.attachHandle(handle);
	};
    nexacro._closePopupWindowHandle = function (handle)
	{
	    if (handle)
	    {
	        var dest_handle = handle.dest_handle;
            if (dest_handle)
			{
				nexacro.__removeDOMNode(dest_handle, handle);
			}
			handle._linked_window = null;
	    }
	};
	
    nexacro._getPopupWindowDocumentHandle = function (handle)
	{
    	var _doc = (handle.ownerDocument || handle.document);
		return _doc;
	};

    nexacro._getPopupWindowDestinationHandle = function (handle)
	{
    	var _doc = (handle.ownerDocument || handle.document);
		return _doc.body;
	};
	
    if (nexacro._Browser == "IE") 
    {
    	nexacro.__getRootWindowHandleOfPopupWindow = function (handle)
	    {
    		var _doc = (handle.ownerDocument || handle.document);
		    return _doc.parentWindow;
	    };
    }
    else if (nexacro._Browser == "Gecko") 
    {
    	nexacro.__getRootWindowHandleOfPopupWindow = function (handle)
	    {
    		var _doc = (handle.ownerDocument || handle.document);
		    return _doc.defaultView;
	    };
    }
    else
    {
    	nexacro.__getRootWindowHandleOfPopupWindow = function (handle)
	    {
    		var _doc = (handle.ownerDocument || handle.document);
		    return _doc.defaultView;
	    };
    }
	
    nexacro._getPopupWindowHandlePosX = function (handle)
	{
    	var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
    	return nexacro._getWindowHandlePosX(_win_handle) + handle.offsetLeft;
	};
    nexacro._getPopupWindowHandlePosY = function (handle)
	{
    	var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
    	return nexacro._getWindowHandlePosY(_win_handle) + handle.offsetTop;
	};
	
    nexacro._getPopupWindowHandleOuterWidth = function (handle)
	{
    	return handle.offsetWidth;
	};
    nexacro._getPopupWindowHandleOuterHeight = function (handle)
	{
    	return handle.offsetHeight;
	};
	
    nexacro._getPopupWindowHandleClientWidth = function (handle)
	{
    	return handle.clientWidth;
	};
    nexacro._getPopupWindowHandleClientHeight = function (handle)
	{
        return handle.clientHeight;
	};
	
	nexacro._setPopupWindowHandleArea = function(handle, x, y, w, h)
	{
	    if (handle)
	    {
	        var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
	        x -= nexacro._getWindowHandlePosX(_win_handle);
            y -= nexacro._getWindowHandlePosY(_win_handle);
            
	        var handle_style = handle.style;
		    handle_style.left = (x | 0) + "px";
		    handle_style.top = (y | 0) + "px";
		    handle_style.width = (w | 0) + "px";
		    handle_style.height = (h | 0) + "px";
	    }
	};
	nexacro._setPopupWindowHandlePos = function(handle, x, y)
	{
	    if (handle)
	    {
	        var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(handle);
	        x -= nexacro._getWindowHandlePosX(_win_handle);
            y -= nexacro._getWindowHandlePosY(_win_handle);
            
		    var handle_style = handle.style;
		    handle_style.left = (x | 0) + "px";
		    handle_style.top = (y | 0) + "px";
		}
	};
	
	nexacro._setPopupWindowHandleSize = function(handle, w, h)
	{
	    if (handle)
	    {
		    var handle_style = handle.style;
		    handle_style.width = (w | 0) + "px";
		    handle_style.height = (h | 0) + "px";
		}
	};

	nexacro._blockScript = function ()
	{

	};

	nexacro._unblockScript = function ()
	{

	};
	
	nexacro._setPopupWindowHandleVisible = function (handle, visible_flag)
	{
	    if (handle)
	    {
	        var handle_style = handle.style;
	        if (handle_style)
	        {
	            handle_style.visibility = (visible_flag === true) ? "" : "hidden";
	        }
		}
	};
	
	nexacro._showQuickviewMenu = function (comp, sx, sy) { };
	nexacro._setSystemMenuResizable = function (handle, resizable) { };
	nexacro._procSysCommand = function (handle, command) { };
	nexacro._setWindowHandleLock = function (handle, is_lock, _except_handle, is_modal_async)
	{
	    nexacro.__setWindowHandleLock(handle, is_lock, _except_handle, is_modal_async);
	};

	nexacro.__setWindowHandleLock = function (handle, is_lock, _except_handle, is_modal_async)
	{
	    // HTML5는 ModalAsync로만 사용된다.
	    var __handle = handle;
	    if (__handle == null)
	    {
	        __handle = window; // TODO check
	    }

	    var _window = __handle._linked_window;
	    while (_window)
	    {
	        if (_window.parent)
	            _window = _window.parent;
	        else
	            break;
	    }

	    if (_window == null)
	    {
            // assert
	        return;
	    }

	    var _except_window = _except_handle ? _except_handle._linked_window : null;
	    nexacro.__setWindowHandleEnableByRef(_window, !is_lock, _except_window, true, true);
	};

	nexacro.__setWindowHandleEnableByRef = function(_window, is_enable, _except_window, is_recursive, /*[nouse]*/is_modal_async)
	{
	    // HTML5는 ModalAsync로만 사용된다.
	    if (_window != _except_window)
	    {
	        if (is_enable)
	        {
	            _window._disable_ref--;
	            if (_window._disable_ref === 0)
	                _window._coverUnlock(_except_window);
	        }
	        else
	        {
	            if (_window._disable_ref === 0)
	                _window._coverLock(_except_window);
	            _window._disable_ref++;
	        }
	    }

	    if (is_recursive)
	    {
	        for (var i = 0; i < _window._child_list.length; i++)
	        {
	            var child = _window._child_list[i];
                if (child.frame)
	                nexacro.__setWindowHandleEnableByRef(child, is_enable, _except_window, true, true);
	        }
	    }
	};

	nexacro._requestAnimationFrame = function (_window, callback)
	{
	    if (!_window)
	        return;
	    var win_handle = _window.handle;
	    if (!win_handle)
	        return;
	    var requestAnimationFrame = win_handle.requestAnimationFrame || win_handle.mozRequestAnimationFrame || win_handle.webkitRequestAnimationFrame || win_handle.msRequestAnimationFrame;
	    if (!requestAnimationFrame)
	        return;
	    var requestid = requestAnimationFrame.call(win_handle, callback);
	    return requestid;
	};

	nexacro._cancelAnimationFrame = function (_window, requestid)
	{
	    if (!_window)
	        return;
	    var win_handle = _window.handle;
	    if (!win_handle)
	        return;
	    var cancelAnimationFrame = win_handle.cancelAnimationFrame || win_handle.mozCancelAnimationFrame || win_handle.webkitCancelAnimationFrame;
	    if (cancelAnimationFrame)
	        cancelAnimationFrame.call(win_handle, requestid);
	};

    // 지정된 값으로 설정하지 않고 nexacro proprerty를 기준으로 자동으로 설정하도록 새로 만듬
	nexacro.__setViewportScale = function ()
	{
	    // 모바일 환경 기기별 예외처리를 위해서 직접 테스트를 수행함
	    // 1. 최초 viewport 설정시
        // 2. 최초 orientationchange 시
	    var _tester = nexacro._device_exception_tester;
	    if (_tester.screen_checked === false)
	    {
	        var orientation_str = nexacro._isPortrait() ? "portrait" : "landscape";
	        _tester.init_screen_width = nexacro._getScreenWidth();
	        _tester.is_init_screen_portrait = nexacro._isPortrait();
	        _tester[orientation_str + "_screen_width"] = nexacro._getScreenWidth();
	        _tester.screen_checked = true;
	    }

	    var use_autozoom = (nexacro._zoom_factor === 0 ? false : true);
	    var ratio = (use_autozoom ? nexacro._zoom_factor / 100 : 1.0);
	    var minimum_scale = nexacro._minimum_scale;
	    var maximum_scale = nexacro._maximum_scale;
	    var is_scalable = (minimum_scale < maximum_scale ? 1 : 0);
	    if (minimum_scale == undefined && maximum_scale == undefined)
	        is_scalable = (use_autozoom ? false : true);

	    if (nexacro._isDesktop())
	    {
	        // desktop 환경은 autozoom 불가, pinch zoom 불가
	        use_autozoom = false;
	        ratio = 1.0;
	        is_scalable = false;
	    }

	    if (is_scalable)
	    {
	        //nexacro._allow_default_pinchzoom = true;
	    }
	    else
	    {
	        if (minimum_scale == undefined)
	            minimum_scale = 1;
	        if (maximum_scale == undefined)
	            maximum_scale = 1;
	    }


	    // search meta viewport
	    var elems = document.getElementsByName("viewport");
	    var viewport;
	    if (elems && elems[0])
	        viewport = elems[0];

	    var contents = [];
	    if (!viewport)
	    {
	        var head = document.getElementsByTagName("head")[0];
	        viewport = document.createElement("meta");
	        viewport.name = "viewport";
	        head.appendChild(viewport);

	        viewport.content = "initial-scale=1.0, user-scalable=" + is_scalable;
	        contents = viewport.content.split(",");
	    }
	    else
	    {
	        contents = viewport.content.split(",");
	    }

	    // utility function
	    function __remove_attribute(attr_name)
	    {
	        for (var i = 0; i < contents.length; i++)
	        {
	            var name = nexacro.trim(contents[i].split("=")[0]);
	            if (name == attr_name)
	            {
	                contents.splice(i, 1);
	                break;
	            }
	        }
	    }
	    function __set_attribute(attr_name, attr_value)
	    {
	        var content = attr_name + "=" + attr_value;
	        var is_found = false;
	        for (var i = 0; i < contents.length; i++)
	        {
	            var name = nexacro.trim(contents[i].split("=")[0]);
	            if (name == attr_name)
	            {
	                is_found = true;
	                contents[i] = content;
	                break;
	            }
	        }
	        if (!is_found)
	            contents.push(content);
	    }

	    // Zoom이 필요 없는 경우, user-scalable등의 값도 기본값으로 세팅한다.
	    // Android 기본 브라우저 문제 때문에 index.html의 초기값에서는 일부 값들이 빠진 상태임.
	    if (ratio == 1.0)
	    {
	        if (use_autozoom === false)
	        {
	            if (is_scalable)
	            {
	                // TODO check min,max만 지정시 dpi 무시하고 최대 해상도로 표시되는지 확인이 필요
	                contents = [
                        "user-scalable=0",
                        "initial-scale=" + ratio / window.devicePixelRatio + "",
                         "target-density=device-dpi"
	                ]; //최선으로 코딩함. 다양한 케이스에대해 수정이 필요할수도있음.

	                if (minimum_scale != undefined)
	                {
	                    // minimum-scale만 지정시 초기에 이상하게 확대되어 축소가 불가능해지는 장비가 있음
	                    __set_attribute("initial-scale", minimum_scale);
	                    __set_attribute("minimum-scale", minimum_scale);
	                }
	                if (maximum_scale != undefined)
	                    __set_attribute("maximum-scale", maximum_scale);
	            }
	            else
	            {
	                // MLM Screen을 쓰지 않아 기본 크기에 해당함.
	                // scale을 지정하면 확대되거나 축소되기때문에 user-scalable만 지정하고 나머지는 제거
	                contents = [
                        "user-scalable=0",
                        "target-densitydpi=device-dpi"
	                ];

	                // iOS 버그 user-scalable=0, target-densitydpi=device-dpi 만 명시했을때
	                // orientationchange가 일어나면 화면이 이상해짐
	                if (nexacro._OS == "iOS")
	                {
	                    __set_attribute("initial-scale", "1");
	                }
	            }
	        }
	        else
	        {
	            // autozoom 사용
	            contents = [
                    "intial-scale=1.0",
                    "user-scalable=" + is_scalable,
                    "width=device-width",
                    "minimum-scale=" + minimum_scale,
                    "maximum-scale=" + maximum_scale,
                    "target-densitydpi=device-dpi"
	            ];
	        }

	        viewport.setAttribute('content', contents.toString());
	        return;
	    }

	    __set_attribute("user-scalable", is_scalable);

	    __set_attribute("initial-scale", ratio);

	    // iOS6 Safari 환경에서 초기에 있던 min,max의 값이 min,max attribute를 제거해도 영향을 주는 것 같다.
	    // 따라서 initial-scale과 같은 값으로 설정함.
        __set_attribute("minimum-scale", ratio * minimum_scale);
	    __set_attribute("maximum-scale", ratio * maximum_scale);

	    // 정확한 contents width 값을 모르면 iOS에서 Contents가 조그맣게 나오고
	    // 나머지 부분은 검은 공백으로 남는 현상이 있음. (iOS6)
	    var screen_width = nexacro._getScreenWidth();
	    if (nexacro._OS == "Android")
	    {
	        var cur_orientation = nexacro._getMobileOrientation();
	        if (cur_orientation == 2 || cur_orientation == 3)
	        {
	            // landscape 상태인데, screen w/h 값이 swap되지 않는 장비인 경우
	            // screen height를 기준으로 viewport를 설정
	            is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
	            if (is_swap_screen === false)
	                screen_width = nexacro._getScreenHeight();
	        }

	        // 일부 안드로이드 기기에서 dpi값이 없을 경우 비정상적인 크기로 확대되는 문제가 발견됨
	        __set_attribute("target-densitydpi", "device-dpi");
	    }

	    __set_attribute("width", screen_width / ratio);

	    // 최초 Window생성과 동시에 Viewport를 세팅하는 경우에 해당함.
	    if (window._linked_window == undefined)
	    {
	        var win_handle = window;
	        var win = win_handle._linked_window;
	        var old_window_width = nexacro._getWindowHandleClientWidth(win_handle);

	        _tester._viewport_resize_observer = setInterval(function ()
	        {
	            cur_window_width = nexacro._getWindowHandleClientWidth(win_handle);
	            if (old_window_width != cur_window_width)
	            {
	                clearInterval(_tester._viewport_resize_observer);
	                _tester._viewport_resize_observer = null;
	                    
	                if (!win)
	                    win = win_handle._linked_window;
	                if (win)
	                {
	                    win.frame._setSize(
                            nexacro._getWindowHandleClientWidth(win_handle),
                            nexacro._getWindowHandleClientHeight(win_handle),
                            0);
	                }
	            }
	        }, 100);

	        // PinchZoom을 사용하지 않음에도 불구하고 body client size를 window size로 사용해야
	        // 최초 화면 로드시 Autozoom이 정상 작동하는 브라우저가 확인됨에 따라
            // 최초 실행시에 이를 예외테이블에서 검색함.
	        var use_windowsize_as_bodysize = nexacro._searchDeviceExceptionValue("use_windowsize_as_bodysize");
	        if (use_windowsize_as_bodysize)
	            _tester.use_windowsize_as_bodysize = true;
	    }

	    // 안드로이드에서도 아래 방법으로 해결이 되는것 같아 범용으로 적용함.
	    if (minimum_scale < maximum_scale)
	    {
	        var ranged_scale_viewport_delay = 500;
	        if (nexacro._OS == "iOS")
	            ranged_scale_viewport_delay = 100;

	        // iOS에서 min~max가 범위를 갖는 경우, 초기 로딩시 (혹은 refresh시)
	        // 화면이 확대된 상태로 로딩되는 현상이 발생함.
	        // 확대 불가능한 size로 먼저 세팅한 후, 다시 viewport를 세팅하면 현상을 피할수 있어보임.

	        // -> iPhone6 iOS8에서 확인
            // 이 외에 발생하는 장비는 현재 확인이 되지 않음.
	        setTimeout(function ()
	        {
	            __set_attribute("maximum-scale", ratio);
	            viewport.setAttribute('content', contents.toString());
	        }, 1);

	        setTimeout(function ()
	        {
	            __set_attribute("maximum-scale", maximum_scale * ratio);
	            viewport.setAttribute('content', contents.toString());
	        }, ranged_scale_viewport_delay);
	    }
	    else
	    {
	        viewport.setAttribute('content', contents.toString());
	    }
	};

    //////////////////////////////////////////////////////////////////////////
    // log
	nexacro._deleteTraceLogFile = nexacro._emptyFn;
	    nexacro._writeTraceLog = function (msglevel, message, bsystemlog, loglevel)
	{
	    var data;
	    data = (bsystemlog === true) ? "S" : "U";

	        if (msglevel === 0)
	        data += "F";
	        else if (msglevel == 1)
	        data += "E";
	        else if (msglevel == 2)
	        data += "W";
	        else if (msglevel == 3)
	        data += "I";
	    else
	        data += "D";

	    var curdate = new Date();
	    data = data + " " + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds() + ":" + curdate.getMilliseconds() + " ";
	    data += message;

        // IE8에서 console을 만나면 에러발생 (window.console = OK)
	    if (window.console)
	        window.console.log(data);
	};


	nexacro._applicationExit = function(is_close_window)
	{
	    window.system = null;
	    window._application = null;

	    if (is_close_window === true)
	    {
	        // 사용자가 exit 호출시 창을 닫음
	        window.open('', '_self');
	        window.close();
	    }

	    //iOS를 위한 exit()
	    if (nexacro.Device)
	    {
	        nexacro.Device.exit();
	    }

	};

    //////////////////////////////////////////////////////////////////////////
    // http
	nexacro._setUseHttpKeepAlive = nexacro._emptyFn;
	nexacro._setHttpTimeout = nexacro._emptyFn;	
	nexacro._setHttpRetry = nexacro._emptyFn;
	

    // HTML5에만 필요해서 이쪽에만 만듬.
    nexacro.__getWindowHandleEnable = function (win_handle)
    {
        if (!win_handle)
            return false;

        var _window = win_handle._linked_window;
        if (!_window)
            return false;

        if (_window._disable_ref > 0)
	        return false;

	    return true;
    };

    nexacro._setWindowHandleFocus = function (win_handle)
    {
        if (!win_handle)
            return;

        if (win_handle.setActive)
            win_handle.setActive();
        else if (win_handle.focus)
            win_handle.focus();
    };

    nexacro.__getElementFromPoint = function (_win_handle, x, y)
    {
        var doc = _win_handle.document;
        var elem_handle = doc.elementFromPoint(x, y);
        if (elem_handle)
            return nexacro.__findParentElement(elem_handle);

        return null;
    };

    nexacro._addExtensionModule = nexacro._emptyFn;
    nexacro._loadExtensionModules = nexacro._emptyFn;     
    nexacro._deleteCacheDB = nexacro._emptyFn; //only runtime;

    ////////////////////////////////////////////////////////////////////////////////////////

    // 모바일 장비별 이상동작에 대한 예외 테이블

    // 기본값과 동일한 기기 리스트 (테이블에서 제외됨)
    // SHV-E250S / 갤럭시 노트2 / 4.1.2
    // SHV-E250S / 갤럭시 노트2 / 4.1.2 / Chrome
    // LG-F100S / 옵티머스 뷰 / 4.0.4
    // LG-F180S / 옵티머스 G / 4.1.2
    // LG-F320S / 옵티머스 G2 / 4.2.2 / Chrome
    // SHW-M440S / 갤럭시 S3 / 4.3 / Chrome
    // IM-A840S / 베가 S5 / 4.1.2
    // SonyEricssonLT15i / 아크 엑스페리아 / 4.0.4 / stock
    // Nexus 7 / 넥서스7 / 4.3 / Chrome

    nexacro._device_exception_tester = {
        init_screen_width: undefined,
        is_init_screen_portrait: undefined,
        // check flag
        screen_checked: false,
        screen_swap_checked: false,
        delayed_swap_screen_checked: false,
        // info
        swap_screen: undefined,
        delayed_swap_screen: undefined,
        swap_screen_timer: null,
        use_windowsize_as_bodysize: false
    };
    nexacro._device_exception_table = [
        {
            // 기본값
            orientationchange_reset_viewport: (nexacro._OS == "Android") ? true : false, // orientationchange시 viewport를 리셋하면 안되는 경우 false로 지정
            swap_screen: (nexacro._OS == "Android") ? true : false, // orientationchange시 screen.width,height값이 서로 swap되면 true로 지정
            delayed_reset_viewport: false,
            delayed_swap_screen: false, // <-발생 빈도가 제법 높다.
            is_portrait_device: // android phone이면 기본적으로 세로로 길쭉한 장비라고 가정함. 그외는 undefined
                (nexacro._OS == "Android") ? 
                    (((nexacro._Browser == "Runtime" && nexacro.__isPhone && nexacro.__isPhone()) || (nexacro._Browser != "Runtime" && nexacro._isMobile())) ?
                        (true) : (undefined)
                    )
                    : (undefined),
            reset_viewport_delay: 0,
            use_windowsize_as_bodysize: false
        },
        {
            // 갤럭시탭 10.1 / 4.0.4
            model: "SHW-M380S",
            browser: "stock",
            is_portrait_device: false
            //swap_orientation: true, // ?
        },
        {
            // 갤럭시탭 10.1 / 4.0.4
            model: "SHW-M380S",
            browser: "Chrome",
            is_portrait_device: false
            //swap_orientation: true,
        },
        {
            // LG 옵티머스 G2 기본브라우저
            model: "LG-F320S",
            browser: "stock",
	        swap_screen: false
        },
        {
            // LG 옵티머스 G2 Chrome
            model: "LG-F320S",
            browser: "Chrome",
            delayed_swap_screen: true
        },
        {
            // LG 옵티머스 G2 (Uplus) 기본브라우저가 Chrome
            model : "LG-F320L",
            browser : "Chrome",
            delayed_swap_screen: true
        },
        {
            // LG 옵티머스 G2 (KT) 
            model : "LG-F320K",
            browser : "Chrome",
            delayed_swap_screen: true
        },
        {
            // 갤럭시 S3
            model: "SHW-M440S",
            browser: "stock",
            os_version: "4.3", // 4.1.2에서는 screen width/height가 swap됨
            swap_screen: false
        },
        {
            // 갤럭시 노트2
            model: "SHV-E250S",
            browser: "stock",
            os_version: "4.4.2",
            swap_screen: false,
            use_windowsize_as_bodysize: true
        },
        {
            // 옵티머스 G3
            model: "LG-F400K",
            browser: "Chrome", // 기본 브라우저도 Chrome으로 잡히고 있다.
            delayed_swap_screen: true
        },
        {
            // 갤럭시 S4 LTE 기본브라우저
            model: "SAMSUNG SHV-E300S", // 기본 브라우저는 앞에 SAMSUNG 이 붙어있음
            browser: "Chrome", // 기본 브라우저가 Chrome으로 잡힘.
            reset_viewport_delay: 0 // 기본 브라우저는 delay처리하면 오류 발생
        },
        {
            // 갤럭시 S4 LTE
            model: "SHV-E300S", // 기본 브라우저는 앞에 SAMSUNG 이 붙어있음
            browser: "Chrome",
            reset_viewport_delay: 300,
            is_portrait_device: true
        },
        {
            // 갤럭시 S4 LTE (KT)
            model: "SHV-E300K",
            browser: "Chrome",
            reset_viewport_delay: 300,
            is_portrait_device: true
        },
        {
            // 갤럭시 S4 LTE (LG)
            model: "SHV-E300L",
            browser: "Chrome",
            reset_viewport_delay: 300,
            is_portrait_device: true
        },
        {
            // 갤럭시 S4 LTE-A 기본브라우저
            model: "SAMSUNG SHV-E330S", // 기본 브라우저는 앞에 SAMSUNG 이 붙어있음
            browser: "Chrome", // 기본 브라우저가 Chrome으로 잡힘.
            reset_viewport_delay: 0 // 기본 브라우저는 delay처리하면 오류 발생
        },
        {
            // 갤럭시 S4 LTE-A
            model: "SHV-E330S", // 기본 브라우저는 앞에 SAMSUNG 이 붙어있음
            browser: "Chrome",
            reset_viewport_delay: 300,
            is_portrait_device: true
        },
        {
            // 옵티머스G pro
            model: "LG-F240L",
            browser: "Chrome", // 기본 브라우저가 Chrome으로 잡힘.
            delayed_swap_screen: true
        },
        {
            // LG 베가아이언2
            model: "IM-A910K",
            browser: "Chrome", // 기본 브라우저가 Chrome으로 잡힘.
            delayed_swap_screen: true
        },
        { }
    ];

    nexacro._searchDeviceExceptionTable = function ()
    {
        // Android에만 해당
        // Chrome이 아닌경우 기본브라우저로 판단

        if (nexacro._OS != "Android")
            return null;

        var browser = nexacro._Browser == "Chrome" ? nexacro._Browser : "stock";

        var table = nexacro._device_exception_table;
        var len = table.length;
    for (var i = 0; i < len; i++)
        {
            if (table[i].model === undefined)
                continue;

            if (browser != table[i].browser)
                continue;

            if (table[i]["os_version"])
            {
                if (table[i].os_version != nexacro._OSVersion)
                    continue;
            }

            var userAgent = nexacro._getUserAgent();
            if (userAgent.indexOf(table[i].model) >= 0)
                return table[i];
        }

        return null;
    };

    nexacro._searchDeviceExceptionValue = function (exception_type)
    {
        var exception = nexacro._searchDeviceExceptionTable();
        if (exception && exception[exception_type] !== undefined)
        {
            return exception[exception_type];
        }

        // 모델명이 예외 테이블에 없거나, 모델은 있는데 해당 속성에 대한 정의가 없는 경우 기본값으로 리턴
        exception = nexacro._device_exception_table[0];
        return exception[exception_type];
    };

    ////////////////////////////////////////////////////////////////////////////////////////


    // ios alert bug
    if (nexacro._OS == "iOS" && nexacro._SupportTouch)
    {
        nexacro._fireClickFn = function (pThis, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, clientXY)
        {
        	// Click event should be called in the touch event or mouse event.
        	// because, mobile keypad is show only when the person touches the input box directly.
        	pThis.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);

            setTimeout(function ()
            {
                pThis.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], pThis, pThis);
            }, 1);
        };
    }
    else
    {
        nexacro._fireClickFn = function (pThis, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, clientXY)
        {
        	pThis.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);

            pThis.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], pThis, pThis);
        };
    }

	nexacro.__setWindowHandleBaseScrollOffset = nexacro._emptyFn;
	nexacro.__getWindowHandleBaseScrollPositionX = nexacro._emptyFn;
	nexacro.__getWindowHandleBaseScrollPositionY = nexacro._emptyFn;

    // Runtime Tray 관련
    nexacro._createTrayHandle = nexacro._emptyFn;
    nexacro._removeTrayHandle = nexacro._emptyFn;
    nexacro._setTrayIconHandle = nexacro._emptyFn;
    nexacro._setTrayTooltipHandle = nexacro._emptyFn;
    nexacro._showTrayBalloonTipHandle = nexacro._emptyFn;
    nexacro._createTrayPopupMenuHandle = nexacro._emptyFn;
    nexacro._destroyTrayPopupMenuHandle = nexacro._emptyFn;
    nexacro._setTrayPopupMenuItemHandle = nexacro._emptyFn;
    nexacro._displayTrayPopupMenuHandle = nexacro._emptyFn;
    nexacro._syshandler_ontray_forward = nexacro._emptyFn;


	/*
		if (nexacro._Browser == "IE")	       
        else if (nexacro._Browser == "Chrome")
        else if (nexacro._Browser == "Gecko")
        else if (nexacro._Browser == "Opera")
        else if (nexacro._Browser == "MobileSafari")
        else if (nexacro._Browser == "Safari")
        else if (nexacro._Browser == "WebKit")
	*/

	nexacro._getCSSFileName = function (cssfile)
	{
		var browser = nexacro._Browser;
		
		if (browser == "Gecko")
		{
			cssfile += "_firefox";
		}
		else if (browser == "Chrome")
		{
			cssfile += "_chrome";
		}
		else
		{			
			if (nexacro._BrowserType == "WebKit")
			{
				cssfile += "_safari";
			}
			else
			{
				cssfile += "_" + browser.toLowerCase();  //opera, ie
				if (browser == "IE" )
				{
					if (nexacro._BrowserVersion <= 8)
						cssfile += "8";
					else if (nexacro._BrowserType == "Edge")
						cssfile += "11";
					else
						cssfile += nexacro._BrowserVersion;
					/*
					if (nexacro._BrowserVersion == 9)
						cssfile += nexacro._BrowserVersion;
					if (nexacro._BrowserVersion == 9)
						cssfile += nexacro._BrowserVersion;
					else if (nexacro._BrowserVersion <= 8)
						cssfile += "8";*/


				}
			}
		}
	    return cssfile + ".css";
	};

	nexacro._getSelectedScreen = function () { };
	nexacro._getWindowRectforOpenAlign = function (halign, valign, parentleft, parenttop, left, top, width, height)
	{
		return null;
	};

	nexacro._isRunBaseWindow = nexacro._emptyFn;
	nexacro._setRunBaseWindow = nexacro._emptyFn;


} // end of (!nexacro._init_platform_HTML5)


if (_process)
{
	delete _process;

	delete _pHTMLSysEvent;
}
