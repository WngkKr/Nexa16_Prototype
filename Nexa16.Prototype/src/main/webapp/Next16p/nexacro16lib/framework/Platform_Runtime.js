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
if (nexacro._Browser == "Runtime")
{
    if (!nexacro._init_platform_runtime)
    {
        nexacro._init_platform_runtime = true;
        nexacro._isTouchInteraction = (nexacro._getOS() == "Android");
        nexacro._SupportTouch = nexacro.__getSupportTouch();
        nexacro._SupportAnimationFrame = true;
        nexacro._resize_popup_inbound = false;
	
	    //------------------------------------------------------------------------------
	    // define SysEvent Handlers
	    nexacro._syshandler_onlbuttondown_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {   
		    return _window._on_sys_lbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
	    nexacro._syshandler_onlbuttonup_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_lbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };		
	    nexacro._syshandler_onrbuttondown_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_rbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
	    nexacro._syshandler_onrbuttonup_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_rbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
        nexacro._syshandler_onmousedown_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_mousedown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
        };
        nexacro._syshandler_onmouseup_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_mouseup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
        };

	    nexacro._syshandler_onmousemove_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_mousemove(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
	    nexacro._syshandler_onmouseenter_forward = function(_window, elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_mouseenter(elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
	    nexacro._syshandler_onmouseleave_forward = function(_window, elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_mouseleave(elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
	    nexacro._syshandler_onmousewheel_forward = function(_window, elem, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
	        return _window._on_sys_mousewheel(elem, 0, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };

	    nexacro._syshandler_ontouchstart_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch, changed)
	    {
	         var touches = arguments[2], changedTouches = arguments[3], time = arguments[4];
	         return nexacro._syshandler_ongesture_touchstart_forward(_window, elem, touches, changedTouches, time);
	    };
	    nexacro._syshandler_ontouchmove_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch)
	    {
              var touches = arguments[2], changedTouches = arguments[3], time = arguments[4];
              return nexacro._syshandler_ongesture_touchmove_forward(_window, elem, touches, changedTouches, time);
	    };
	    nexacro._syshandler_ontouchend_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch)
	    {
               var touches = arguments[2], changedTouches = arguments[3], time = arguments[4];
	            return nexacro._syshandler_ongesture_touchend_forward(_window, elem, touches, changedTouches, time);	    
	    };

	    nexacro._syshandler_ongesture_touchstart_forward = function (_window, elem, touches, changedTouches, time)
	    {
	        var curTime = (time || Date().now());

	        var touch_len = touches.length, change_len = changedTouches.length;
	        var is_first = (touch_len == change_len);

	        var touch, touch_info, changed;
	        var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

	        for (var i = 0; i < change_len; i++)
	        {
	            touch = changedTouches[i];
	            changed_ids[touch.id] = true;
	        }

	        for (var i = 0; i < touch_len; i++)
	        {
	            touch = touches[i];
	            changed = changed_ids[touch.id];

	            touch_info = new nexacro.Touch(touch.id, "touchstart", touch.timeStamp, touch.target, changed, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
	            touch_infos.push(touch_info);
	            if (changed)
	            {
	                changed_touch_infos.push(touch_info);
	            }
	        }

	        return _window._on_gesture_sys_touchstart(elem, touch_infos, changed_touch_infos, curTime);
	    };
	    nexacro._syshandler_ongesture_touchmove_forward = function (_window, elem, touches, changedTouches, time)
	    {
	        var curTime = (time || Date().now());

	        var touch_len = touches.length, change_len = changedTouches.length;
	        
	        var touch, touch_info, changed;
	        var changed_ids = {}, touch_infos = [], changed_touch_infos = [];

	        for (var i = 0; i < change_len; i++)
	        {
	            touch = changedTouches[i];
	            changed_ids[touch.id] = true;
	        }

	        for (var i = 0; i < touch_len; i++)
	        {
	            touch = touches[i];
	            changed = changed_ids[touch.id];

	            touch_info = new nexacro.Touch(touch.id, "touchmove", touch.timeStamp, touch.target, changed, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
	            touch_infos.push(touch_info);
	        }

	        return _window._on_gesture_sys_touchmove(elem, touch_infos, changed_touch_infos, curTime);
	    };
	    nexacro._syshandler_ongesture_touchend_forward = function (_window, elem, touches, changedTouches, time)
	    {
	        var curTime = (time || Date().now());

	        var touch_len = touches.length, change_len = changedTouches.length;

	        var touch, touch_info;
	        var touch_infos = [], changed_touch_infos = [];

	        for (var i = 0; i < change_len; i++)
	        {
	            touch = changedTouches[i];
	            touch_info = new nexacro.Touch(touch.id, "touchend", touch.timeStamp, touch.target, true, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
	            changed_touch_infos.push(touch_info);
	        }

	        for (var i = 0; i < touch_len; i++)
	        {
	            touch = touches[i];
	            touch_info = new nexacro.Touch(touch.id, "touchend", touch.timeStamp, touch.target, false, touch.clientX, touch.clientY, touch.screenX, touch.screenY);
	            touch_infos.push(touch_info);
	        }

	        return _window._on_gesture_sys_touchend(elem, touch_infos, changed_touch_infos, curTime);
	    };

	    nexacro._syshandler_onmousehover_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
	    	if (elem && elem.handle)
				nexacro.__showElementHandleTooltip(elem.handle, windowX, windowY);
	    };
	

	    nexacro._syshandler_ondblclick_forward = function(_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY)
	    {
		    return _window._on_sys_dblclick(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
	    };
    	
	    nexacro._syshandler_onkeydown_forward = function(_window, elem, keycode, altKey, ctrlKey, shiftKey)
	    {
		    return _window._on_sys_keydown(elem, keycode, altKey, ctrlKey, shiftKey);
	    };
	    nexacro._syshandler_onkeypress_forward = function(_window, elem, keycode, altKey, ctrlKey, shiftKey)
	    {
		    return _window._on_sys_keypress(elem, keycode, altKey, ctrlKey, shiftKey);
	    };
	    nexacro._syshandler_onkeyup_forward = function(_window, elem, keycode, altKey, ctrlKey, shiftKey)
	    {
		    return _window._on_sys_keyup(elem, keycode, altKey, ctrlKey, shiftKey);
	    };
	
	    nexacro._syshandler_oncontextmenu_forward = function(_window, elem)
	    {
	    	return _window._on_sys_contextmenu(elem);
	    };
	    nexacro._syshandler_onresize_forward = function(_window, width, height, wparam)
	    {	        
	        return _window._on_sys_resize(width, height, wparam);	        
	    };
	    nexacro._syshandler_onmove_forward = function(_window, left, top)
	    {
	        return _window._on_sys_move(left, top);
	    };
	    nexacro._syshandler_ongetminmaxinfo_forward = function(_window)
	    {
	        return _window._on_sys_getminmaxinfo();
	    };	
	    nexacro._syshandler_onactivate_forward = function(_window)
	    {
            // Popup Window는 Activate처리 제외함. 
		    return _window._on_sys_activate();
	    };
	    nexacro._syshandler_ondeactivate_forward = function(_window)
	    {
	        // Popup Window는 Activate처리 제외함. 
	        return _window._on_sys_deactivate();
	    };
	    nexacro._syshandler_onclose_forward = function(_window)
	    {
		    return _window._on_sys_close();
	    };
	    nexacro._syshandler_onbeforeclose_forward = function(_window)
	    {
	        // TODO check; Confirm처리를 C에서 할지?
	        var confirm_message = _window._on_sys_beforeclose();
	        if (confirm_message !== undefined && confirm_message !== "")
	        {
	            return nexacro._confirm(_window.frame, confirm_message);
	        }

	        return true;
	    };
	
	    // runtime simulator
	    nexacro._syshandler_onreload_forward = function(_window, elem)
	    {
	        return _window._on_sys_reload(elem);
	    };

	    nexacro._syshandler_onviewsource_forward = function(_window, elem)
	    {
	        if (elem)
	        {
	            var comp = _window.findComponent(elem);
	            if (comp)
	            {
	                var formurl, ref_form = comp;
                    
	                while (ref_form._type_name != "Form" && !ref_form.url)
	                {
	                    ref_form = ref_form.parent;
	                }
                      
	                if (ref_form)
	                {
	                    var owner = ref_form.parent;
	                    if (comp.url) // Div, Tabpage
	                    {
	                        formurl = comp.url;
	                    }
	                    else if (owner._is_frame) // childframe
	                    {
	                        formurl = owner.formurl;
	                    }
	                    else
	                    {
	                        if (ref_form._url)
	                        {
	                            formurl = ref_form._url.replace("xfdl.js", "xfdl");
	                            formurl = "./" + formurl.substr(nexacro._project_url.length);
	                        }
	                    }
	                    nexacro.__simulatorViewSource(formurl);
	                }
	            }
	        }
	    };

	    nexacro._syshandler_onsyscommand_forward = function(_window, elem, command)
	    {
	        var ret = _window._on_sys_syscommand(command);
	        if (_window.handle) nexacro.__refreshDirtyWindow(_window.handle);
	        return ret;
	    };
    
	    nexacro._syshandler_onncmousedown_forward = function(_window, elem, command)
	    {
	    	return nexacro._checkClosePopupComponent();
	    };

	    nexacro._syshandler_onload_forward = function (_window)
	    {
	        return _window._on_sys_load(_window);
	    };

	    nexacro._syshandler_onduplicateexcution_forward = function (_window, _globalvalue)
	    {	  
	        return _application.on_fire_onduplicateexcution(_globalvalue);
	    };

	    nexacro._initWindowEventHandler = function(_window, handle)
	    {
	        var win_handle = (handle ? handle : _window.handle);
	        if (win_handle)
	        {
	            nexacro._observeSysEvent(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
	            nexacro._observeSysEvent(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
	            nexacro._observeSysEvent(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
	            nexacro._observeSysEvent(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
	            nexacro._observeSysEvent(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
	            nexacro._observeSysEvent(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

	            nexacro._observeSysEvent(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
	            nexacro._observeSysEvent(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
	            nexacro._observeSysEvent(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
	            nexacro._observeSysEvent(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
                nexacro._observeSysEvent(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

                if (nexacro._SupportTouch)
                {
                    nexacro._observeSysEvent(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
                    nexacro._observeSysEvent(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
                    nexacro._observeSysEvent(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
                }

	            nexacro._observeSysEvent(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

	            nexacro._observeSysEvent(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
	            nexacro._observeSysEvent(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
	            nexacro._observeSysEvent(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

	            nexacro._observeSysEvent(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
	            nexacro._observeSysEvent(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
	            nexacro._observeSysEvent(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
	            nexacro._observeSysEvent(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

	            nexacro._observeSysEvent(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
	            nexacro._observeSysEvent(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
	            nexacro._observeSysEvent(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
	            nexacro._observeSysEvent(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

                nexacro._observeSysEvent(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

	            // runtime simulator
	            nexacro._observeSysEvent(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
	            nexacro._observeSysEvent(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

	            nexacro._observeSysEvent(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

	            nexacro._observeSysEvent(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

	            nexacro._observeSysEvent(win_handle, "duplicateexcution", "onduplicateexcution", nexacro._syshandler_onduplicateexcution_forward);

	            nexacro.__refreshDirtyWindow(win_handle);
                	            
	        }
        };

	    nexacro._stopWindowEventHandler = function(_window)
        {
	        var win_handle = _window.handle;
	        if (win_handle)
	        {
	            nexacro._stopSysObserving(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
	            nexacro._stopSysObserving(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
	            nexacro._stopSysObserving(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
	            nexacro._stopSysObserving(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
	            nexacro._stopSysObserving(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
	            nexacro._stopSysObserving(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

	            nexacro._stopSysObserving(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
	            nexacro._stopSysObserving(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
	            nexacro._stopSysObserving(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
	            nexacro._stopSysObserving(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
                nexacro._stopSysObserving(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

                if (nexacro._SupportTouch)
                {
                    nexacro._stopSysObserving(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
                    nexacro._stopSysObserving(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
                    nexacro._stopSysObserving(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
                }

	            nexacro._stopSysObserving(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

	            nexacro._stopSysObserving(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
	            nexacro._stopSysObserving(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
	            nexacro._stopSysObserving(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

	            nexacro._stopSysObserving(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
	            nexacro._stopSysObserving(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
	            nexacro._stopSysObserving(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
	            nexacro._stopSysObserving(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

	            nexacro._stopSysObserving(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
	            nexacro._stopSysObserving(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
	            nexacro._stopSysObserving(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
	            nexacro._stopSysObserving(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

                nexacro._stopSysObserving(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

	            // runtime simulator
	            nexacro._stopSysObserving(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
	            nexacro._stopSysObserving(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

	            nexacro._stopSysObserving(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

	            nexacro._stopSysObserving(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

	            nexacro._stopSysObserving(win_handle, "duplicateexcution", "onduplicateexcution", nexacro._syshandler_onduplicateexcution_forward);
	        }
        };
			
	    //==============================================================================
	    // Window Handle API's
	
	    // Runtime Only : HTML은 DocInit_HTML5에서.
	    nexacro.__bindEventWindowLoadHandler = function (_window)
	    {
	        return function (v1, v2)
	        {
	            if (_window == null) _window = v1;
	            if (_window)
	            {
	                if (!_window.handle)
	                {
	                    var handle = v2;
	                    _window.attachHandle(handle);
	                }
	                nexacro._initWindowEventHandler(_window);
	                if (nexacro.__mainwindow_handle)
	                {
	                    // is popup
	                    nexacro._syshandler_onload_forward(_window);
	                }

	                var width = nexacro._getWindowHandleOuterWidth(handle);
	                var height = nexacro._getWindowHandleOuterHeight(handle);
	                if (_window.width != width || _window.height != height)
	                {
	                    // create, callback 사이에 발생한 wm_size 메시지
	                    // openstatus를 maximize로 설정한 경우 여기에 해당함.
	                    _window._on_default_sys_resize(width, height);
	                }
	            }
	        };
	    };

	    nexacro.__bindEventPopupWindowLoadHandler = function (_window)
	    {
	        return function (v1, v2)
	        {
	            if (_window == null) _window = v1;
	            if (_window)
	            {
	                if (!_window.handle)
	                {
	                    var handle = v2;
	                    _window.attachHandle(handle);
	                }
	                nexacro._initWindowEventHandler(_window);
	               // trace("__bindEventPopupWindowLoadHandler");
	                var childframe = new nexacro.ChildFrame(_window.id);
	                childframe._showModeless(_window.id, _window);
	            }
	        };
	    };

        // showmodal callback
	    nexacro.__bindEventModalWindowLoadHandler = function (_window, handle)
	    {
	        return function (v1, v2)
	        {
	            // window 생성전이라 handle이 없다.
	            if (_window == null) _window = v1;
	            if (handle == null) handle = v2;

	            if (_window)
	            {
	                _window.attachHandle(handle);

	                nexacro._initWindowEventHandler(_window);
	                nexacro._syshandler_onload_forward(_window);

	                _window._onPrepareModalWindowHandle(); // call frame.on_created()
	            }
	        };
	    };

        // showmodalasync callback
	    nexacro.__bindEventModalAsyncWindowLoadHandler = function (_window)
	    {
	        return function ()
	        {
	            if (_window)
	            {
	                nexacro._initWindowEventHandler(_window);
	                nexacro._syshandler_onload_forward(_window);
	            }
	        };
	    };

        nexacro.__mainwindow_handle = null;
        nexacro._createWindowHandle = function(parent_win, _window, name, left, top, width, height, resizable, layered, taskbar, is_main)
	    {        
	        var parent_handle = null;
	        if (parent_win) parent_handle = parent_win.handle;
	        
		    if (left == null)
			    left = Math.floor((nexacro.System.availWidth - width) / 2);
		    if (top == null)
			    top = Math.floor((nexacro.System.availHeight - height) / 2);
		
		    var callback = nexacro.__bindEventWindowLoadHandler(_window);
		    var handle;
            //hykim
            //handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
		    if(!nexacro.__isDesignMode||!nexacro.__isDesignMode())
                handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
            else
	            handle = nexacro.__createDesignWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);

		    _window.attachHandle(handle);
		    callback = null;
		
            // 2015.04.22 neoarc 
		    nexacro._setViewportScale(_window);

		    if (is_main && handle)
		    {
		        nexacro.__mainwindow_handle = handle;
		    }
	    };
	    // if opened window loaded ==> excute DocInit_Html5.js ==> call target_window.on_init_sysevent_handlers()
	
        nexacro._createModalWindowHandle = function(parent_win, _window, name, left, top, width, height, resizable, layered, lockmode)
        {
            var parent_handle = null;
	        if (parent_win) parent_handle = parent_win.handle;
	        
		    if (left == null)
			    left = Math.floor((nexacro.System.availWidth - width) / 2);
		    if (top == null)
			    top = Math.floor((nexacro.System.availHeight - height) / 2);
		
            // lock windows
		    var popup_root_win_list = new Array; // 모든 modeless의 rootWindow list
		    var root_win = _window; // MainFrame의 RootWindow (mainframe._window)
		    while (root_win.parent)
		        root_win = root_win.parent;
		
		    if (lockmode == 1) // lock=all
		    {
		    	var len = nexacro._popupframes.length;
		        for (var i = 0; i < len; i++)
		        {
		        	var popup_frame = nexacro._popupframes[i];
		            var popup_win = popup_frame._window;
		            if (popup_win == this)
		                continue;
		            var popup_root = popup_win;
		            while (popup_root.parent)
		                popup_root = popup_root.parent;
		            if (popup_root == root_win)
		                continue;
                    //array의 indexOf는 nexacro._indexOf로 바꿔준다. array의 indexOf는 성능저하가 있으므로 for loop로 대체한다. 
		            if (nexacro._indexOf(popup_root_win_list, popup_root) < 0)
		                popup_root_win_list.push(popup_root);
		        }
		    }

            // modal시 C++내에서 Runbase를 자동으로 parent로 처리한다.
		    nexacro.__setWindowHandleLock(null, true, null, false);
		    if (popup_root_win_list.length > 0)
		    {
		        for (var i = 0; i < popup_root_win_list.length; i++)
		            nexacro.__setWindowHandleLock(popup_root_win_list[i].handle, true, null, false);
		    }

		    var callback = nexacro.__bindEventModalWindowLoadHandler(_window, null);
            // parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode
		    var handle = nexacro.__createModalWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);
		    callback = null;

            // unlock windows
		    if (popup_root_win_list.length > 0)
		    {
		        for (var i = 0; i < popup_root_win_list.length; i++)
		            nexacro.__setWindowHandleLock(popup_root_win_list[i].handle, false, handle, false);
		    }
		    nexacro.__setWindowHandleLock(handle, false, handle, false);
		    delete popup_root_win_list;

		    return _window.returnValue;
        };

        nexacro._createModalAsyncWindowHandle = function(parent_win, _window, name, left, top, width, height, resizable, layered, lockmode)
        {
            var parent_handle = null;
            if (parent_win) parent_handle = parent_win.handle;

            if (left == null)
                left = Math.floor((nexacro.System.availWidth - width) / 2);
            if (top == null)
                top = Math.floor((nexacro.System.availHeight - height) / 2);

            var callback = nexacro.__bindEventModalAsyncWindowLoadHandler(_window);
            var handle = nexacro.__createModalAsyncWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);
            _window.attachHandle(handle);
            callback = null;

            return handle;
        };

        nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame)
        {
            if (frame._window_type != 3)
                return;

            // modal async window를 감시하고 완전히 닫힌 후에 callback을 실행한다.
            var main_handle = nexacro._getMainWindowHandle();

            // cleartimer 해줘야 하기때문에 frame object를 key로 사용
            var timer_handle = nexacro._setSystemTimer(main_handle, function ()
            {
                // close여부를 알수있는 API를 만들어야 될런지..
                var is_prepared = nexacro.__isWindowHandlePrepared(_win_handle);
                if (_win_handle && is_prepared === false)
                {
                    // runtime은 timer가 script level이 아니라 계속 중복호출된다. 먼저 중단시킴.
                    nexacro._removeModalAsyncCallbackHandler(frame);

                    frame._runCallback();
                }
            }, 100);

            if (!nexacro._closedmodalasync_list)
				nexacro._closedmodalasync_list =[];

            nexacro._closedmodalasync_list.push([frame, timer_handle]);
        };

        nexacro._removeModalAsyncCallbackHandler = function (frame)
        {
        	if (!nexacro._closedmodalasync_list)
				return;

            var list = nexacro._closedmodalasync_list;
            var list_length = list.length;
            for (var i = 0; i < list_length; i++)
            {
                var list_item = list[i];
                if (list_item[0] == frame)
                {
                    var main_handle = nexacro._getMainWindowHandle();
                    nexacro._clearSystemTimer(main_handle, list_item[1]);

                    for (var j = i; j < list_length - 1; j++)
                    {
                        list[j] = list[j + 1];
                    }
                    list.pop();
                    break;
                }
            }
        };

        nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main, parentframe, frameopener, arr_arg)
        {
        	var popupframeoption = nexacro._popupframeoption[name];
        	if (popupframeoption)
        	{
        		popupframeoption._opener = frameopener;
        		popupframeoption._parentwindow = parent_win;       		
        		popupframeoption._parentframe = parentframe;
        		popupframeoption._args = arr_arg;        		
        	}

            var parent_handle = null;
            if (parent_win) parent_handle = parent_win.handle;

            if (left == null)
                left = Math.floor((nexacro.System.availWidth - width) / 2);
            if (top == null)
                top = Math.floor((nexacro.System.availHeight - height) / 2);

            var _window = new nexacro._Window(name, parent_win, false);
            if (parent_win)
                parent_win.addChild(_window);
       
            var callback = nexacro.__bindEventPopupWindowLoadHandler(_window);
            var handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, false, callback);
            _window.attachHandle(handle);
            callback = null;
                                    
            return handle;
        };

        nexacro._refreshWindow = function(handle)
        {
            nexacro.__refreshDirtyWindow(handle);
        };

        nexacro._isWindowHandlePrepared = function(handle)
        {
            return nexacro.__isWindowHandlePrepared(handle);
        };
	    nexacro._closeWindowHandle = function(handle)
	    {
	        if (nexacro.__mainwindow_handle == handle)
	            nexacro.__mainwindow_handle = null;
		    nexacro.__closeWindowHandle(handle);
	    };
    
	    nexacro._setLinkedWindow = function (handle, target_win)
	    {
	    };
	    //------------------------------------------------------------------------------
	    nexacro._getMainWindowHandle = function()
	    {
		    return nexacro.__mainwindow_handle;
	    };

	    nexacro._getWindowHandle = function(handle)
	    {
            return handle;
	    };

	    nexacro._getWindowDocumentHandle = function(handle)
	    {
		    return handle;
	    };
	    nexacro._getWindowDestinationHandle = function(handle)
	    {
		    return handle;
	    };
	
	    nexacro._getWindowHandlePosX = function(handle)
	    {
		    return nexacro.__getWindowHandlePosX(handle);
	    };
	    nexacro._getWindowHandlePosY = function(handle)
	    {
		    return nexacro.__getWindowHandlePosY(handle);
	    };

	    nexacro._getWindowHandleOuterWidth = function(handle)
	    {
		    return nexacro.__getWindowHandleOuterWidth(handle);
	    };
	    nexacro._getWindowHandleOuterHeight = function(handle)
	    {
		    return nexacro.__getWindowHandleOuterHeight(handle);
	    };

	    nexacro._getWindowHandleClientWidth = function(handle)
	    {
		    return nexacro.__getWindowHandleClientWidth(handle);
	    };
	    nexacro._getWindowHandleClientHeight = function(handle)
	    {
		    return nexacro.__getWindowHandleClientHeight(handle);
	    };

	    nexacro._setWindowHandleArea = function(handle, x, y, w, h)
	    {
		    nexacro.__setWindowHandleArea(handle, x, y, w, h);
	    };
	    nexacro._setWindowHandlePos = function(handle, x, y)
	    {
		    nexacro.__setWindowHandlePos(handle, x, y);
	    };
	    nexacro._setWindowHandleSize = function(handle, w, h)
	    {
		    nexacro.__setWindowHandleSize(handle, w, h);
	    };
	    nexacro._setWindowHandleZIndex = function(_win_handle, zindex)
	    {
	        // ...
	    };	
	    nexacro._findWindow = function(_win_handle)
	    {
		    return nexacro.__getWindowFromWindowHandle(_win_handle);
	    };
	
	    nexacro._flashWindow = function(hWnd, strType, nCount,nInterval)
	    {
	        return nexacro.__flashWindow(hWnd, strType, nCount, nInterval);
	    };

	    nexacro._setWindowHandleText = function(_win_handle, titletext)
	    {
            return nexacro.__setWindowHandleText(_win_handle, titletext);
	    };

	    nexacro._setWindowHandleStatusText = nexacro._emptyFn;

	    //nexacro._setWindowHandleIcon = function (_win_handle, icon_url)
	    //{
	    //    return nexacro.__setWindowHandleIcon(_win_handle, icon_url);
	    //};

		nexacro._setWindowHandleIconObject = function (_win_handle, icon)
		{
			return nexacro.__setWindowHandleIconObject(_win_handle, icon);
		};

	    nexacro._getMainWindowWidth = function(_win)
	    {
	        var win_width = _win.clientWidth;
	        if (_win._zoom_factor)
	        {
	            win_width = win_width * _win._zoom_factor / 100.0;
	        }
	        return win_width;
	    };

	    nexacro._getMainWindowHeight = function(_win)
	    {
	        var win_height = _win.clientHeight;
	        if (_win._zoom_factor)
	        {
	            win_height = win_height * _win._zoom_factor / 100.0;
	        }
	        return win_height;
	    };

	    //////////////////////////////////////////////////////////////////////////
	    // Popup Window
	    nexacro._createPopupWindowHandle = function(parent_win, target_win, name, left, top, width, height) 
	    {
	        var parent_handle = parent_win.handle;
	    
	        if (left == null)
			    left = Math.floor((nexacro.System.availWidth - width) / 2);
		    if (top == null)
			    top = Math.floor((nexacro.System.availHeight - height) / 2);
			
		    var callback = nexacro.__bindEventWindowLoadHandler(target_win);
		    var handle = nexacro.__createPopupWindowHandle(parent_handle, target_win, name, left, top, width, height, callback);
		    target_win.attachHandle(handle);
		    callback = null;
	    };
	    nexacro._closePopupWindowHandle = function(handle)
	    {
	        nexacro.__closeWindowHandle(handle);
	    };
	
	    nexacro._getPopupWindowDocumentHandle = function(handle)
	    {
		    return handle;
	    };
	    nexacro._getPopupWindowDestinationHandle = function(handle)
	    {
		    return handle;
	    };
	
        nexacro._getPopupWindowHandlePosX = function(handle)
	    {
	        return nexacro._getWindowHandlePosX(handle);
	    };
	    nexacro._getPopupWindowHandlePosY = function(handle)
	    {
	        return nexacro._getWindowHandlePosY(handle);
	    };
	
	    nexacro._getPopupWindowHandleOuterWidth = function(handle)
	    {
		    return nexacro._getWindowHandleOuterWidth(handle);
	    };
	    nexacro._getPopupWindowHandleOuterHeight = function(handle)
	    {
		    return nexacro._getWindowHandleOuterHeight(handle);
	    };
	
	    nexacro._getPopupWindowHandleClientWidth = function(handle)
	    {
            return nexacro._getWindowHandleClientWidth(handle);
	    };
	    nexacro._getPopupWindowHandleClientHeight = function(handle)
	    {
            return nexacro._getWindowHandleClientHeight(handle);
	    };
	
	    nexacro._setPopupWindowHandleArea = function(handle, x, y, w, h)
	    {
	        nexacro._setWindowHandleArea(handle, x, y, w, h);
	    };
	    nexacro._setPopupWindowHandlePos = function(handle, x, y)
	    {
	        nexacro._setWindowHandlePos(handle, x, y);
	    };
	
	    nexacro._setPopupWindowHandleSize = function(handle, w, h)
	    {
	        nexacro._setWindowHandleSize(handle, w, h);
	    };
	
	    nexacro._setPopupWindowHandleVisible = function(handle, visible_flag)
	    {
	        nexacro.__setWindowHandleVisible(handle, visible_flag);
	        nexacro.__refreshDirtyWindow(handle);
	    };

        nexacro._createVirtualWindowHandle = function (_handle)
        {
            return nexacro.__createVirtualWindowHandle(_handle);
        }

        nexacro._closeVirtualWindowHandle = function (_handle)
        {
            nexacro.__closeVirtualWindowHandle(_handle);
        };

	    nexacro._blockScript = function (handle, _virtual_handle)
	    {
	        nexacro.__blockScript(handle, _virtual_handle);
	    };

	    nexacro._unblockScript = function (handle, _virtual_handle)
	    {
	        nexacro.__unblockScript(handle, _virtual_handle);
	    };
	
	    //////////////////////////////////////////////////////////////////////////
	    nexacro._hasCookieVariables = function ()
	    {
	    	return nexacro._getCookieVariables() ? true : false;
	    };

	    nexacro._removeLocalStorage = function ()
	    {

	    };
    	// type = 1: user, 2: engine, 3: envvar 4: envcookie
	    nexacro._setLocalStorage = function (key, varValue, type, global)
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

	    	if (type > 1)
	    	{
	    		if (!nexacro._enginevar)
	    			nexacro._enginevar = {};

	    		if (!nexacro._enginevar[type])
	    			nexacro._enginevar[type] = {};

	    		nexacro._enginevar[type][key] = { "type": vartype, "value": varValue };
	    		return;
	    	}
	    	else
	    	{
	    		var value = vartype + ":" + varValue;
	    		//return nexacro.__setPrivateProfile(key, value, global);
	    	}
	    };

	    nexacro._getLocalStorageAll = function (type)
	    {
	    	if (type > 1)
	    	{
	    		if (!nexacro._enginevar)
	    			return;

	    		return nexacro._enginevar[type] ? nexacro._enginevar[type]: undefined;
	    	}
	    };


    	// type = 1: user, 2: engine, 3: envvar 4: envcookie
	    nexacro._getLocalStorage = function (key, type, global)
	    {
	    	if (type > 1)
	    	{
	    		if (!nexacro._enginevar)
	    			return;

	    		var enginevar = nexacro._enginevar[type];
	    		if (enginevar)
	    		{
	    			var enginevalue = enginevar[key];
	    			if (enginevalue)
	    			{
	    				return enginevalue.value;
	    			}
	    		}
	    		return undefined;
	    	}

	    	var retvalue = nexacro.__getPrivateProfile(key, global);
	    	if (retvalue)
	    	{
	    		var index = retvalue.indexOf(":");
	    		var vartype = retvalue.substring(0, index);
	    		var value = retvalue.substring(index + 1);

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
	    			return value;
	    		}
	    	}
	    };

	    nexacro._hasLocalStorage = function (key, type, global)
	    {
	    	if (type > 1)
	    	{
	    		if (!nexacro._enginevar)
	    			return;

	    		var enginevar = nexacro._enginevar[type];
	    		if (enginevar)
	    		{
	    			var enginevalue = enginevar[key];
	    			if (enginevalue)
	    			{
	    				return enginevalue.type ? true : false;  //변수가 있고 type이 undefined 일 경우 type이 있다
	    			}
	    		}
	    	}
	    	return false;
	    };

	    nexacro._getGlobalValueData = function(key, url)
	    {
	        return nexacro._globalvalue;
	    };
	
	    nexacro._getSystemFont = function ()
	    {
	        return new nexacro._FontObject("9pt Helvetica");
	    };

	    //////////////////////////////////////////////////////////////////////////
	    nexacro._showQuickviewMenu = function(comp, sx, sy)
	    {
	        var control_element = comp.getElement();
	        if (control_element && control_element.handle)
	        {
	            var window = comp._getWindow();
	            var _win_handle = (window ? window.handle : nexacro._getMainWindowHandle());
	            var elem_handle = control_element.handle;
	            return nexacro.__showQuickviewMenu(_win_handle, elem_handle, sx, sy);
	        }
	    };

	    nexacro._setSystemMenuResizable = function(handle, resizable)
	    {
	        nexacro.__setSystemMenuResizable(handle, resizable);
	    };

	    nexacro._procSysCommand = function(handle, command)
	    {
	        nexacro.__procSysCommand(handle, command);
	    };

        //Application Property
	    nexacro._setMouseHovertime = function(mousehovertime) 
        {
	        nexacro.__setMouseHovertime(mousehovertime);
	    };

	    nexacro._setWindowHandleLock = function(handle, is_lock, _except_handle, is_modal_async)
	    {
	        nexacro.__setWindowHandleLock(handle, is_lock, _except_handle, is_modal_async);
	    };

        nexacro._requestAnimationFrame = function (_window, callback)
	    {
	        if (!_window)
	            return;
	        var win_handle = _window.handle;
	        if (!win_handle)
	            return;

	        var requestid = nexacro.__requestAnimationFrame(win_handle, callback);
	        return requestid;
	    };

	    nexacro._cancelAnimationFrame = function (_window, requestid)
	    {
	        if (!_window)
	            return;
	        var win_handle = _window.handle;
	        if (!win_handle)
	            return;

	        nexacro.__cancelAnimationFrame(win_handle, requestid);
	    };

        nexacro._deleteTraceLogFile = function()
        {
            nexacro.__deleteTraceLogFile();
        };

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
            var cnt = 16 - data.length;
            for (var i = 0; i < cnt; i++) // match string length 16 byte
                data += " ";

            data += message;

            var traceduration = nexacro._traceduration || -1;
            var tracemode = nexacro._tracemode || "none";

            nexacro.__writeTraceLog(data, loglevel, tracemode, traceduration, msglevel);
        };

        nexacro._loadImageURL = function(path, target, handler)
        {
            return nexacro.__loadImageURL(path, target, handler);
        };

        nexacro._loadImageBase64 = function(source, target, handler)
        {
            return nexacro.__loadImageBase64(source, target, handler);
        };

        nexacro._setUseHttpKeepAlive = function (v)
        {   
        	nexacro.__setUseHttpKeepAlive(v);
        };

        nexacro._setHttpTimeout = function (v)
        {   
            nexacro.__setHttpTimeout(v);
        };

        nexacro._setHttpRetry = function (v)
        {           
            nexacro.__setHttpRetry(v);
        };

        nexacro._applicationExit = nexacro._emptyFn;

        nexacro._checkWindowActive = function (_window)
        {
            var is_active;
            var win_handle = _window.handle;
            if (win_handle)
            {
                is_active = nexacro.__checkWindowHandleActive(win_handle);
                _window._is_active_window = is_active;
            }

            return is_active;
        };

        nexacro._setWindowHandleFocus = function (win_handle)
        {        
            nexacro.__setWindowHandleFocus(win_handle);
        };

        /*
        nexacro._addExtensionModule = function (super_fn, modulepath)
        {
	        if ((typeof super_fn) == "function")
	        {
	            function F() { };
	            F.prototype = super_fn.prototype;
	            var ptype = new F();
	            return nexacro.__addExtensionModule(ptype, modulepath);
	        }                                    
        };
        */

        nexacro._addExtensionModule = function (modulepath)
        {
            return nexacro.__addExtensionModule(modulepath);
        };


        nexacro._clearExtensionModule = function (modulepath)
        {
            nexacro.__clearExtensionModule(modulepath);
        };   

        nexacro._deleteCacheDB = function ()
        {
            nexacro.__deleteCacheDB();
        };
        
        nexacro._searchDeviceExceptionValue = function (exception_type)
        {
            if (exception_type == "swap_screen")
                return true;
            return undefined;
        };

        nexacro._fireClickFn = function (pThis, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, clientXY)
        {
            pThis.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], pThis, pThis);

            pThis.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
        };

        // 2015.04.22 neoarc
        nexacro._setViewportScale = function (_window)
        {
            if (!_window)
                return;

            var handle = _window.handle;

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

            // Runtime Viewport
            //  handle, user-scalable, initial-scale, minimum-scale, maximum-scale, target-densitydpi
            nexacro.__setWindowHandleViewportScale(
                handle, 
                is_scalable, 
                ratio, 
                (minimum_scale !== undefined) ? (ratio * minimum_scale) : ratio,
                (maximum_scale !== undefined) ? (ratio * maximum_scale) : ratio,
                null);

            _window._zoom_factor = nexacro._zoom_factor;            
            if (nexacro._zoom_factor !== 0 && isNaN(nexacro._zoom_factor) == false)
            {
                _window._zoom_factor = nexacro._zoom_factor;
                nexacro.__setWindowHandleZoom(handle, nexacro._zoom_factor);
            }
        };

        nexacro._createTrayHandle = function (icon, tooltip)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__createTrayHandle(main_handle, icon, tooltip);
        };

        nexacro._removeTrayHandle = function (tray_handle)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__removeTrayHandle(main_handle, tray_handle);
        };

        nexacro._setTrayIconHandle = function (tray_handle, icon)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__setTrayIconHandle(main_handle, tray_handle, icon);
        };

        nexacro._setTrayTooltipHandle = function (tray_handle, tooltip)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__setTrayTooltipHandle(main_handle, tray_handle, tooltip);
        };

        nexacro._showTrayBalloonTipHandle = function (tray_handle, titleicon, title, text, timeout, nosound)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__showTrayBalloonTipHandle(main_handle, tray_handle, titleicon, title, text, timeout, nosound);
        };

        nexacro._createTrayPopupMenuHandle = function (tray_handle)
        {            
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__createTrayPopupMenuHandle(main_handle, tray_handle);
        };

        nexacro._destroyTrayPopupMenuHandle = function (tray_handle, menu_handle)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__destroyTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
        };

        nexacro._setTrayPopupMenuItemHandle = function (tray_handle, menu_handle, flags, id, caption, icon)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__setTrayPopupMenuItemHandle(main_handle, tray_handle, menu_handle, flags, id, caption, icon);
        };

        nexacro._displayTrayPopupMenuHandle = function (tray_handle, menu_handle)
        {
            var main_handle = nexacro._getMainWindowHandle();
            return nexacro.__displayTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
        }; 

        nexacro._syshandler_ontray_forward = function (_window, type, id, button, alt_key, ctrl_key, shift_key, screenX, screenY)
        {
            // ondblclick, onlbuttonup, onrbuttonup 
            if (type == "lbuttonup")
            {             
                var application = nexacro.getApplication();
                if (application)
                {
                    var tray = application.trays[id];
                    return tray.on_fire_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY);
                }
            }
            else if (type == "rbuttonup")
            {
                var application = nexacro.getApplication();
                if (application)
                {
                    var tray = application.trays[id];
                    return tray.on_fire_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY);
                }
            }
            else if (type == "dblclick")
            {
                var application = nexacro.getApplication();
                if (application)
                {
                    var tray = application.trays[id];
                    return tray.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY);
                }
            }
            else if (type == "menuclick")
            {
                if (nexacro._current_tray_popup)
                {                    
                    var traypopup = nexacro._current_tray_popup;
                    return traypopup.on_fire_onmenuclick(id);
                }
            }
            else
            {
                return;
            }
        };

        nexacro._getCSSFileName = function (cssfile)
        {
            return cssfile + "_runtime" + nexacro._getCSSFileType();
        };
        nexacro._getCSSFileType = function ()
        {
            return ".css";
        //  return ".css.bin";
        };
        nexacro._getCSSTypeCode = function (cssreq)
        {
                                        // cssreq   : 0 =theme.css, 1 =app.css
            return cssreq ? 11 : 10;    // typecode : 1x:runtime css
        //  return cssreq ?  1 :  0;    //            0x:runtime bin
        };
        nexacro._getSelectedScreen = function ()
        {
			//call runtime native api
        };

        nexacro._getWindowRectforOpenAlign = function (halign, valign, parentleft, parenttop, left, top, width, height)
        {
        	if (nexacro._Browser == "Runtime" && nexacro._isDesktop())
        	{   
        		var monitor_idx = nexacro._getMonitorIndex(parentleft + width / 2, parenttop + height / 2);
        		// 해당 모니터의 left,top을 구해야함
        		var screen_rect = nexacro._getScreenRect(monitor_idx);

        		var p_l = screen_rect.left;
        		var p_t = screen_rect.top;
        		var p_w = nexacro._getScreenWidth(monitor_idx);
        		var p_h = nexacro._getScreenHeight(monitor_idx);
        		
        		

        		switch (halign)
        		{
        			case "left":
        				left = p_l;
        				break;
        			case "center":
        				left = p_l + Math.round((p_w - width) / 2);
        				break;
        			case "right":
        				left = p_l + p_w - width;
        				break;
        		}
        		switch (valign)
        		{
        			case "top":
        				top = p_t;
        				break;
        			case "middle":
        				top = p_t + Math.round((p_h - height) / 2);
        				break;
        			case "bottom":
        				top = p_t + p_h - height;
        				break;
        		}

        		return { left: left, top: top };
        	}
        	return null;
    };

	nexacro._isRunBaseWindow = function (_window)
    {
        // script가 시작된 곳을 저장해둠. xp9 runbase 역할
    	if (_application._runbase_window)
            return false;
    	_application._runbase_window = _window;
        return true;
    };

	nexacro._setRunBaseWindow = function (_window)
	{
		// script가 시작된 곳을 저장해둠. xp9 runbase 역할
		_application._runbase_window = _window;
	};

    } // end of (!nexacro._init_platform_runtime)
}