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


if (nexacro.Component)
{
    var _pComponent = nexacro.Component.prototype;

    //==============================================================================
    // system event handlers Part
    //==============================================================================

    // TargetComp의 Left,Top,Right,Bottom에 해당하는 Rect를 사용자가 볼 수 있도록 최대한 스크롤하는 API.
    // right,bottom은 이격값이 아닌 절대좌표임. 2013.02.06 neoarc
    _pComponent._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction)
    {
        // target_comp의 left,top,right,bottom에 해당하는 영역을
        // 최대한 볼 수 있도록 상위 모든 컴포넌트를 자동으로 스크롤한다.
        if (this._is_frame)
            return;

        // target_comp가 기준 target_comp를 보이게 만들어야 함
        if (!this._is_popup_control && this.parent && this.parent != this)
        {
            this.parent._resetScrollPos(this, left, top, right, bottom, focus_direction);
        }
    };

    _pComponent._getSameParent = function (paths)
    {
        if (!paths) return;

        var p = this.parent;
        var idx = 0;
        var self_parent_paths = [];
        while (p)
        {
            idx = nexacro._indexOf(paths, p);
            self_parent_paths.push(p);
            if (idx > -1 || p._is_window || (p._is_frame && (p._window_type == 1 || p._window_type == 4)))
            {
                return [self_parent_paths, idx];
            }
            p = p.parent;
        }
    };

    //only Form Component has _last_focused
    _pComponent._setLastFocus = function (comp)
    {
        if (comp && !comp._is_popup_control)
        {
            if (this == comp)
            {
                this._last_focused = null;
                return;
            }

            var p = this;
            while (p && (p._is_form || p instanceof nexacro.Div || p instanceof nexacro.Tab || p instanceof nexacro.Tabpage))
            {
                p._last_focused = comp;
                comp = p;
                p = p.parent;
            }
        }
    };

    _pComponent._getTabOrderFirst = function ()
    {
        return null;
    };

    // set _focus_list
    // ex : Child(0) > Form(1) > Comp(2) > CompCtrl(3) > cur(x)
    _pComponent._setCurFocusPathsByCurPos = function (cur, root_window)
    {
        var _win = root_window ? root_window : this._getRootWindow();
        var parent_path = [];
        var p = cur.parent;

        _win.clearCurrentFocusPaths();

        // focus 관리를 Frame Window 단위로 변경함 2013.12.04 neoarc
        if (_win.frame == cur)
            return;

        while (p)
        {
            parent_path.push(p);
            if (p == _win.frame || (p._is_frame && (p._window_type == 1 || p._window_type == 4)))
                break;
            p = p.parent;
        }
        for (var i = parent_path.length ; i > 0; i--)
        {
            _win.addCurrentFocusPaths(parent_path[i - 1]);
        }
    };

    _pComponent._getRecalcCanvasXY = function (elem, canvasX, canvasY)
    {
        canvasX += this._adjust_left - this._scroll_left || 0;
        canvasY += this._adjust_top - this._scroll_top || 0;

        var window = this._getWindow();        
        var comp = window.findComponent(elem);

        if (comp != this)  // 안에 들어가있는 다른 컨트롤에서 발생된 이벤트일 경우
        {
        	var padding = this._getCurrentStylePadding();
            if (padding)
            {
                canvasX += padding.left;
                canvasY += padding.top;
            }
        }
        return [canvasX, canvasY];
    };

    _pComponent._getClientXY = function (canvasX, canvasY)
    {
        var border_left = 0, border_top = 0, padding_left = 0, padding_top = 0;
        var border = this._getCurrentStyleBorder();
        if (border)
        {
        	border_top = border._getBorderTopWidth();
        	border_left = border._getBorderLeftWidth();
        }

        var clientX = canvasX - border_left;
        var clientY = canvasY - border_top;        

        return [clientX, clientY];
    };

    _pComponent._isParentdefaultprevented = function (comp, event_name)
    {
        var p_comp = comp.parent;
        while (p_comp)
        {
            if (!p_comp._getFromComponent)
                return false;
            var root_comp = p_comp._getFromComponent(p_comp);            
            var listener = root_comp["on" + event_name];
            if (!listener || (listener && !listener.defaultprevented))
            {
                p_comp = p_comp.parent;
                if (root_comp instanceof nexacro.MainFrame)
                    return false;
            }
            else
                return true;
        }

        return false;
    };

    //==============================================================================
    // nexacro.Component = nexacro component's Event Handlers
    //==============================================================================
    _pComponent._setfocusing_comp = null;
    _pComponent._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        if (!this._is_alive || !this.visible || !this._isEnable()) return;
        
        //focus 처리시에 setFocus 및 lbuttondown 처리가 발생하면 진행 중인 focus처리 cancel필요.
        var _win = this._getRootWindow();

        if (self_flag)
        {
            var cur_focus_paths = _win.getCurrentFocusPaths();

            // NC control인 경우 해당 컴포넌트까지만 setfocus되도록함. 
            var pThis = this;

            while (pThis && pThis._is_nc_control)
            {
                pThis = pThis.parent;
            }

            if (!pThis)
                return;
            
            var focuspath_index = -1;
            if (cur_focus_paths)
            {
                focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);                
            }

            if (focuspath_index > -1)
            {
                // 내부 컨텐츠가 변경되어 내부로 포커스 들어가야 하는 경우 예외처리
                if (focuspath_index == cur_focus_paths.length - 1)
                {
                    if (this._getTabOrderFirst() == null)
                        return;
                }
                else
                {
                    if(!(this instanceof nexacro.PopupDiv)) return;
                }
                
            }

            if (pThis._isFocusAcceptable() == false) 
                return;

            var new_refer_focus = this;
            var new_focus = this._getRootComponent(pThis);
            var focus_Info = null;
            if (cur_focus_paths && cur_focus_paths.length)
            { // 공통 부모로부터 새로 포커싱된 컴포넌트까지 path 추출 (중요:공통 부모 포함)
                focus_Info = pThis._getSameParent(cur_focus_paths);
            }

            if (focus_Info)
            {
                var start_kill_focus_idx = focus_Info[1];
                var old_refer_focus = cur_focus_paths[cur_focus_paths.length - 1];
                var old_focus = this._getRootComponent(old_refer_focus);
                var kill_focus_arrs = cur_focus_paths.slice(start_kill_focus_idx + 1); // current중, 공통 부모 이하는 killfocus path
                kill_focus_arrs = kill_focus_arrs.reverse();
                var focus_arrs = focus_Info[0];
                if (focus_arrs && (focus_arrs.length > 0))
                {
                    // 새로 포커스 될 컴포넌트의 부모중에 focus acceptable이 아닌 컴포넌트가 있으면
                    // 포커싱 동작을 아예 하지 않아야 함. (Scrollbar, Static등) 2013.05.27 neoarc
                    var focus_path;
                    for (var i = 0, n = focus_arrs.length ; i < n ; i++)
                    {
                        focus_path = focus_arrs[i];
                        if (focus_path && focus_path._isFocusAcceptable() == false)
                            return;
                    }
                }

                var _lose_focus;
                
                if (focus_arrs && (focus_arrs.length > 1))
                {
                    var focus_path, prev_focus_path;
                    for (var i = 0, n = focus_arrs.length ; i < n ; i++)
                    {
                        focus_path = focus_arrs[i];
                        if (focus_path && (focus_path.components || focus_path._is_container || focus_path._is_containerset))
                        {
                            focus_path._last_focused = (prev_focus_path ? prev_focus_path : pThis);
                            //focus_path._setLastFocus(prev_focus_path ? prev_focus_path : pThis);
                        }
                        prev_focus_path = focus_path;
                    }
                }
                else
                {
                    if (pThis.parent && (pThis.parent.components || pThis.parent._is_container || pThis.parent._is_containerset))
                    {
                        //pThis.parent._last_focused = pThis;
                        pThis.parent._setLastFocus(pThis);
                        
                    }
                }

                if (kill_focus_arrs && kill_focus_arrs.length > 0)
                {
                    for (var i = 0, n = kill_focus_arrs.length ; i < n ; i++)
                    {
                        _lose_focus = kill_focus_arrs[i];
                        if (_lose_focus && _lose_focus._is_alive && !_lose_focus._is_killfocusing)
                        {
                            // onkillfocus 처리중 사용자가 focus를 강제로 변경하는 경우
                            // 기존 로직을 무시하고 사용자가 처리한 focus를 유지하도록 함 2013.12.27
                            _lose_focus._is_killfocusing = true;
                            
                            var focus_path_cur = _win.getCurrentFocusPaths().slice(0);
                            _win._removeFromCurrentFocusPath(_lose_focus, false, new_focus, new_refer_focus);
                            if (_lose_focus.enableevent)
                            {
                                if (new_focus._is_popup_control)
                                {
                                    _lose_focus._changeStatus("mouseover", false);
                                }
                                _win._setfocusing_comp = new_focus;

                                var focus_path_before = _win.getCurrentFocusPaths().slice(0); // clone array
                                _lose_focus.on_fire_onkillfocus(new_focus, new_refer_focus);                                

                                var focus_path_after = _win.getCurrentFocusPaths();
                                var is_focus_changed = (focus_path_before.length != focus_path_after.length);                                
                                if (!is_focus_changed)
                                {
                                    for (var j = 0; j < focus_path_before.length; j++)
                                    {
                                        if (focus_path_before[j] != focus_path_after[j] ||
                                            (focus_path_cur.length == focus_path_before.length && focus_path_cur[j] == focus_path_before[j]) ||
                                            (focus_path_cur.length != focus_path_before.length && focus_path_cur[j] != focus_path_before[j]))
                                        {
                                            is_focus_changed = true;
                                            break;
                                        }
                                    }
                                }
                                if (is_focus_changed)
                                {
                                    _lose_focus._is_killfocusing = false;
                                    return;
                                }
                            }
                            _lose_focus._is_killfocusing = false;
                        }
                    }
                }

                if (focus_arrs && (focus_arrs.length > 1))
                {
                    var focus_start = focus_arrs[focus_arrs.length - 2]; //  -1 -> -2
                    // 공통부모가 포함되어 있으므로 그 아래부터 setfocus처리
                    pThis._setCurFocusPathsByCurPos(focus_start, _win);
                    focus_start._on_focus(false, evt_name, old_focus, old_refer_focus, new_focus, new_refer_focus);
                }
                else
                { // 공통부모 바로 아래 컴포넌트가 포커스를 받는 경우
                    pThis._setCurFocusPathsByCurPos(pThis, _win);
                    pThis._on_focus(false, evt_name, old_focus, old_refer_focus, new_focus, new_refer_focus);
                }
            }
            else
            {
                pThis._setCurFocusPathsByCurPos(pThis, _win);
                pThis._on_focus(false, evt_name, lose_focus, refer_lose_focus);
            }
        }
        else
        {
            var c = this._getLastFocused();
            if (!c || (c && (!c.visible || !c.enable)))
            {
                c = this._getTabOrderFirst();
            }
            
            if (c && c.visible && !this._block_inner_focus)
            {
                if (_win._is_active_window !== false)
                {
                    // pushed 인상태에서 focus가 들어온 경우 처리 추가 
                    this._changeStatus("focused", true);
                    /*
                    if (this._pseudo == "pushed")
                    {
                        //this._stat_change("focus", "pushed");
                        this._changeUserStatus("pushed", true);
                    }
                    else
                    {
                        this._changeStatus("focused", true);
                        //this._stat_change("focus", "focused");
                    }*/
                }
               //if (this.enableevent)
                {
                	
                	// onsetfocus 처리중 사용자가 focus를 변경했을 때 처리 추가.
                	var focus_paths = _win.getCurrentFocusPaths();
                	var focus_path_before = null;

                	if (focus_paths)
                	{
                		focus_path_before = focus_paths.slice(0);
                	}

                	this.on_fire_onsetfocus(lose_focus, refer_lose_focus);

                	if (focus_paths)
                	{
                		var focus_path_after = _win.getCurrentFocusPaths();
                		var is_focus_changed = (focus_path_before.length != focus_path_after.length);
                		if (!is_focus_changed)
                		{
                			for (var j = 0; j < focus_path_before.length; j++)
                			{
                				if (focus_path_before[j] != focus_path_after[j])
                				{
                					is_focus_changed = true;
                					break;
                				}
                			}
                		}
                		if (is_focus_changed)
                			return;
                	}
                }
                this._setLastFocus(c);

                _win.addCurrentFocusPaths(this);
                c._on_focus(false, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            }
            else
            {
                var is_refer_new_focus_mychild;
                if (refer_new_focus && this != refer_new_focus)
                {
                    var p = refer_new_focus;
                    while (p && !(p._is_window))
                    {
                        if (p == this)
                        {
                            is_refer_new_focus_mychild = true;
                            break;
                        }
                        p = p.parent;
                    }
                }

                if (evt_name == "lbuttondown" && is_refer_new_focus_mychild == true)
                {
                    // refer_new_focus가 this의 child일때만 mouseover로 처리해야함.
                    //this._stat_change("focus", "mouseover");
                    this._changeStatus("mouseover", true);
                }
                else
                {
                    if (_win._is_active_window !== false)
                    {
                        // pushed 인상태에서 focus가 들어온 경우 처리 추가 
                        this._changeStatus("focused", true);
                        /*
                        if (this._pseudo == "pushed")
                        {
                            this._changeUserStatus("pushed", true);
                            //this._stat_change("focus", "pushed");
                        }
                        else
                        {
                            this._changeStatus("focused", true);
                            //this._stat_change("focus", "focused");
                        }*/
                    }
                }
                //if (this.enableevent)
                {
                	
                	// onsetfocus 처리중 사용자가 focus를 변경했을 때 처리 추가.
                	var focus_paths = _win.getCurrentFocusPaths();
                	var focus_path_before = null;

                	if(focus_paths)
                	{
                		focus_path_before = focus_paths.slice(0);
                	}

                	this.on_fire_onsetfocus(lose_focus, refer_lose_focus);

                	if (focus_paths)
                	{
                		var focus_path_after = _win.getCurrentFocusPaths();
                		var is_focus_changed = (focus_path_before.length != focus_path_after.length);
                		if (!is_focus_changed)
                		{
                			for (var j = 0; j < focus_path_before.length; j++)
                			{
                				if (focus_path_before[j] != focus_path_after[j])
                				{
                					is_focus_changed = true;
                					break;
                				}
                			}
                		}
                		if (is_focus_changed)
                			return;
                	}
                }

                this._setLastFocus(this);
                _win.addCurrentFocusPaths(this);
                this.on_focus_basic_action(self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

                //controlComponent에 focus를 주기 위해 this와 목적지까지의 경로중 this 바로 아래단계를 다시 호출.
                if (is_refer_new_focus_mychild)
                {
                    // refer_new_focus는 반드시 this의 child이어야 한다.
                    var fireComp = null;
                    p = refer_new_focus;
                    while (p && this != p)
                    {
                        if (p instanceof nexacro.Form)
                        {
                            break;
                        }
                        fireComp = p;
                        p = p.parent;
                    }
                    if (fireComp && !fireComp._is_application)
                        fireComp._on_focus(false, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
                }
            }
        }
    };

    _pComponent.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
    	if (nexacro._enableaccessibility)
    	{
    		this._setAccessibilityStatFocus(evt_name);
    	}
    	this.on_apply_custom_setfocus(evt_name);
    };

	// for focus
    _pComponent._on_killfocus = function (new_focus, new_refer_focus)
    {
    	if (!this._is_alive) return;

    	this.on_killfocus_basic_action(new_focus, new_refer_focus);
    };

    _pComponent.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
    	return;
    };

    _pComponent._on_activate = function ()
    {
        if (!this._is_alive) return;

        // Pseudo change
        if (!this._isSelected())
        {
            this._changeStatus("focused", true);
        }
    };

    _pComponent._on_deactivate = function ()
    {
        if (!this._is_alive) return;

        // status change
        if (!this._isSelected())
        {
            this._changeStatus("focused", false);
        }
    };

    _pComponent._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        if (!this._is_alive) return;

        if (this.visible && this._isEnable() && this.enableevent)
        {
            var clientXY = this._getClientXY(canvasX, canvasY);

            nexacro._fireClickFn(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, clientXY);

            //this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);

            //this.on_click_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
        }
    };

    _pComponent.on_click_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        return;
    };

    _pComponent._on_dblclick = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        if (!this._is_alive) return;
        
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented)))
        {
            if (this.visible && this._isEnable() && this.enableevent)
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                this.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
            }
        }
    };


    //bubble는 window까지만 하면 된다.(application까지 줄 필요가 없다)
    //----------------------------------------------------------------------------------------------------------------------------------
    // lbuttondown
    _pComponent._focus_refer_comp = null;

    _pComponent._getFromComponent = function (from_comp)
    {
        var comp = from_comp;
        if (from_comp._is_subcontrol)
            comp = this._getRootComponent(from_comp);
        return comp;
    };

    _pComponent._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        nexacro._skipDragEventAfterMsgBox = false;

        var ret = this._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onlbuttondown || (pThis.onlbuttondown && !pThis.onlbuttondown.defaultprevented)))
        {
        	this.on_lbuttondown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, this._focus_refer_comp);
            ret = this._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    // enabletouchevent=false 일 때 lbutton pseudo와 Track 처리를 위한 이벤트(focus 처리 없음, event fire 없음)
    _pComponent._on_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        nexacro._skipDragEventAfterMsgBox = false;

        var ret;
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onlbuttondown || (pThis.onlbuttondown && !pThis.onlbuttondown.defaultprevented)))
        {
            ret = this._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        var win = this._getWindow();

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var first_comp;

            if (!refer_comp)
            {
                first_comp = this;
                refer_comp = this._focus_refer_comp = this;
                if (!this._is_focus_accept)
                {
                    this._focus_refer_comp = this._getFocusAcceptableComponent(this);
                }
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._focus_refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                if (event_bubbles === false) event_bubbles = undefined;

                var bubble = this.on_touch_lbuttondown_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                if (bubble) return;
                else if (bubble === false) event_bubbles = bubble;
            }

            if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
                    return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    _pComponent._on_bubble_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        var win = this._getWindow();

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var first_comp;

            if (!refer_comp)
            {
                first_comp = this;
                refer_comp = this._focus_refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }*/
                if (!this._is_focus_accept)
                {
                    this._focus_refer_comp = this._getFocusAcceptableComponent(this);
                }
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }

                if (event_bubbles === false) event_bubbles = undefined;

                if (bubble_scope)
                {
                    var bubble = this.on_lbuttondown_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                    if (bubble) return;
                    else if (bubble === false) event_bubbles = bubble;
                }
            }

            if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
                    return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.onlbuttondown || (this.onlbuttondown && !this.onlbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // basic action
    _pComponent.on_touch_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var win = this._getWindow();
        // touch down일 때 status를 변경하면 slide/fling 반응이 느림

        if (this._is_track)
        {
            nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
            return false;
        }

        if (this._is_repeat)
        {
            nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, canvasX, canvasY);
            return true; //repeat comp 인 경우 bubble하지 않는다.
        }
    };

    _pComponent.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var win = this._getWindow();
        if (refer_comp === this)
        {
            if (this._use_pushed_status)
            {
                this._changeUserStatus("pushed", true);
            }
        }

        if (this._is_track)
        {
            nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
            return false;
        }

        if (this._is_repeat)
        {
            nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, canvasX, canvasY);
            return true; //repeat comp 인 경우 bubble하지 않는다.
        }
    };

    // defaultAction
    _pComponent.on_lbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var win = this._getWindow();
        if (this.visible && this._isEnable() && refer_comp)
        {
            refer_comp._on_focus(true, "lbuttondown");
        }
        else
        {
            var comp = win._findComponentForEvent(elem, 0, 0);
            if (comp && comp[0])
            {
                comp[0]._on_focus(true, "lbuttondown");
            }
        }
    };
    // lbuttondown end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // rbuttondown
    _pComponent._on_rbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = this._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onrbuttondown || (pThis.onrbuttondown && !pThis.onrbuttondown.defaultprevented)))
        {
        	this.on_rbuttondown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
        	ret = this._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_rbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {

        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onrbuttondown || (this.onrbuttondown && !this.onrbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onrbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.onrbuttondown || (this.onrbuttondown && !this.onrbuttondown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_rbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

	// defaultAction
    // 
    _pComponent.on_rbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, parent)
    {    	
    };
    // rbuttondown end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // lbuttonup
    _pComponent._lbuttonup_first_comp = null;
    _pComponent._lbuttonup_event_bubbles = undefined;

    _pComponent._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem)
    {
        var ret = this._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented)))
        {
        	this.on_lbuttonup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
        	ret = this._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false); // system event bubble
        }
        return ret;
    };

    // enabletouchevent=false 일 때 lbutton pseudo 처리를 위한 이벤트(focus 처리 없음, event fire 없음)
    _pComponent._on_touch_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem)
    {
        var ret;
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented)))
        {
            ret = this._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_touch_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            this._lbuttonup_event_bubbles = undefined;
            if (!refer_comp)
            {
                this._lbuttonup_first_comp = this;
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            this.on_lbuttonup_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

            if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
                }
            }
        }
        else
        {
            this._lbuttonup_event_bubbles = event_bubbles;
            
            if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
            }
        }
    };

    _pComponent._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            this._lbuttonup_event_bubbles = undefined;
            if (!refer_comp)
            {
                this._lbuttonup_first_comp = this;
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (bubble_scope)
            {
            	this.on_lbuttonup_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            }

            if (this.visible && this._isEnable())
            {                                
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
                }
            }
        }
        else
        {
            this._lbuttonup_event_bubbles = event_bubbles;
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
            }
            if ((!this.onlbuttonup || (this.onlbuttonup && !this.onlbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
            }
        }
    };
    // basicAction
    _pComponent.on_lbuttonup_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        if (this._use_pushed_status)
        {
            if (this._isPushed())
            {
                if (nexacro._isTouchInteraction)
                {
                    this._changeUserStatus("pushed", false);
                }
                else
                {
                    this._changeUserStatus("pushed", false);
                    this._changeStatus("mouseover", true);
                }
            }
        }
    };

    // defaultAction
    _pComponent.on_lbuttonup_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // TODO:
    };

    // lbuttonup end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // rbuttonup
    _pComponent._on_rbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem)
    {
        var ret = this._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onrbuttonup || (pThis.onrbuttonup && !pThis.onrbuttonup.defaultprevented)))
        {
        	this.on_rbuttonup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
        	ret = this._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_rbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }

            if ((!this.onrbuttonup || (this.onrbuttonup && !this.onrbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
            }
            if ((!this.onrbuttonup || (this.onrbuttonup && !this.onrbuttonup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_rbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_rbuttonup_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // rbuttonup end
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    // mouseup
    _pComponent._on_mouseup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem)
    {
    	var ret = this._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, true); // user event bubble

    	if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onmouseup || (pThis.onmouseup && !pThis.onmouseup.defaultprevented)))
        {
        	this.on_mouseup_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_mouseup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }*/
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, from_elem);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onmouseup || (this.onmouseup && !this.onmouseup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, from_elem, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, from_elem, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp, from_elem);
                }
            }
            if ((!this.onmouseup || (this.onmouseup && !this.onmouseup.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];
                       
                return this.parent._on_bubble_mouseup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, from_elem, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_mouseup_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // mouseup end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // mousedown
    _pComponent._on_mousedown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
    	var ret = this._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble

    	if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onmousedown || (pThis.onmousedown && !pThis.onmousedown.defaultprevented)))
        {
        	this.on_mousedown_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_mousedown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }*/
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onmousedown || (this.onmousedown && !this.onmousedown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.onmousedown || (this.onmousedown && !this.onmousedown.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_mousedown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_mousedown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // mousedown end
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    // mousemove
    _pComponent._on_mousemove = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
    	if (nexacro._current_popups.length > 0)
        {
            // 팝업이 캡쳐대상 일때, 캡쳐대상 영역 밖이면 무시
            // 원치 않을 경우 컴포넌트에서 재정의
            var win = this._getWindow();
            var elem_comp = win.findComponent(elem, 0, 0);
            if (elem_comp && elem_comp[0])
            {
            	var cur_popup = nexacro._current_popups[0];
                if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0]))
                    return;
            }
        }

        var ret = this._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble

        if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onmousemove || (pThis.onmousemove && !pThis.onmousemove.defaultprevented)))
        {
        	this.on_mousemove_default_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble   
        }
        return ret;
    };

    _pComponent._on_bubble_mousemove = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                if (bubble_scope)
                {
                	this.on_mousemove_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                }

                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }

            if ((!this.onmousemove || (this.onmousemove && !this.onmousemove.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (bubble_scope)
                {
                	this.on_mousemove_basic_action(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                }

                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmousemove(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }

            }

            if ((!this.onmousemove || (this.onmousemove && !this.onmousemove.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_mousemove(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };
    // basicAction
    _pComponent.on_mousemove_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        if (this._isPushed())
        {
    	    this._changeUserStatus("pushed", true);
        }
        else
        {
            // mobile에서는 mouseover pseudo 변경 안함
            if (!nexacro._isTouchInteraction)
            {

                this._changeStatus("mouseover", true);
            }
        }
    };

    // defaultAction
    _pComponent.on_mousemove_default_action = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // TODO:
    };
    //  mousemove end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // mouseenter
    _pComponent._mouseenter_event_bubbles = undefined;
    _pComponent._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
    	if (nexacro._current_popups.length > 0)
        {
            // 팝업이 캡쳐대상 일때, 캡쳐대상 영역 밖이면 무시
            // 원치 않을 경우 컴포넌트에서 재정의
            var win = this._getWindow();
            var elem_comp = win.findComponent(elem, 0, 0);
            if (elem_comp && elem_comp[0])
            {
            	var cur_popup = nexacro._current_popups[0];
                if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0]))
                    return;
            }
        }

        var ret = this._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble

        if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onmouseenter || (pThis.onmouseenter && !pThis.onmouseenter.defaultprevented)))
        {
        	this.on_mouseenter_default_action(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var first_comp;
            var is_subcontrol_bubble = this._is_subcontrol ? true : false;

            if (!refer_comp)
            {
                first_comp = this;
                refer_comp = this;
                    /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                if (is_subcontrol_bubble)
                {
                    if (from_comp && this._contains(from_comp)) return true;
                    if (first_comp == this)
                    {
                        var clientXY = this._getClientXY(canvasX, canvasY);
                        if (bubble_scope)
                        {
                            event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                        }
                        else
                        {
                            event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                        }
                        if (event_bubbles === false) event_bubbles = undefined;
                    }
                }
                else
                {
                    from_comp = this._getRootComponent(from_comp);
                    if (from_comp && this._contains(from_comp)) return true;

                    var clientXY = this._getClientXY(canvasX, canvasY);

                    if (bubble_scope)
                    {
                        event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                    else
                    {
                        event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                }
            }
            if ((!this.onmouseenter || (this.onmouseenter && !this.onmouseenter.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (is_subcontrol_bubble)
                {
                    return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmouseenter(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }

            if ((!this.onmouseenter || (this.onmouseenter && !this.onmouseenter.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_mouseenter(elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, false, screenX, screenY, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_mouseenter_default_action = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // mouseenter end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // mouseleave
    _pComponent._on_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
    	if (nexacro._current_popups.length > 0)
        {
            // 팝업이 캡쳐대상 일때, 캡쳐대상 영역 밖이면 무시
            // 원치 않을 경우 컴포넌트에서 재정의
            var win = this._getWindow();
            var elem_comp = win.findComponent(elem, 0, 0);
            if (elem_comp && elem_comp[0])
            {
            	var cur_popup = nexacro._current_popups[0];
                if (cur_popup._track_capture && !cur_popup._contains(elem_comp[0]))
                    return;
            }
        }

        var ret = this._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble

        if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onmouseleave || (pThis.onmouseleave && !pThis.onmouseleave.defaultprevented)))
        {
        	this.on_mouseleave_default_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var first_comp;
            var is_subcontrol_bubble = this._is_subcontrol ? true : false;

            if (!refer_comp)
            {
                first_comp = this;
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                if (is_subcontrol_bubble)
                {
                    if (to_comp && this._contains(to_comp)) return true;
                    if (first_comp == this)
                    {
                    	this.on_mouseleave_basic_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

                        var clientXY = this._getClientXY(canvasX, canvasY);
                        if (bubble_scope)
                        {
                            event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                        }
                        else
                        {
                            event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                        }
                        if (event_bubbles === false) event_bubbles = undefined;
                    }
                }
                else
                {
                    to_comp = this._getRootComponent(to_comp);
                    if (to_comp && this._contains(to_comp)) return true;

                    if (first_comp == this)
                    {
                    	this.on_mouseleave_basic_action(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                    }

                    var clientXY = this._getClientXY(canvasX, canvasY);
                    if (bubble_scope)
                    {
                        event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                    else
                    {
                        event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                }
            }
            if ((!this.onmouseleave || (this.onmouseleave && !this.onmouseleave.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (is_subcontrol_bubble)
                {
                    return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onmouseleave(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.onmouseleave || (this.onmouseleave && !this.onmouseleave.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_mouseleave(elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    _pComponent._isSelected = function ()
    {   
        return this._use_selected_status && this._userstatusmap && this._userstatusmap.selected;
    };

    _pComponent._isPushed = function ()
    {
        return this._use_pushed_status && this._userstatusmap && this._userstatusmap.pushed;
    };

    // basicAction
    _pComponent.on_mouseleave_basic_action = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    	if (this._is_subcontrol)
        {
            if (this._isPushed())
            {
                this._changeUserStatus("pushed", false);
            }
            else  
            {
                var tmp_comp = this;
                var alive = true;
                if (!this._isSelected())
                {
                    while (tmp_comp)
                    {
                        if (tmp_comp._is_alive == false)
                        {
                            alive = false;
                            break;
                        }
                        tmp_comp = tmp_comp.parent;
                    }
                }

                if (alive)
                {
                    this._changeStatus("mouseover", false);
                }
            }
        }
        else
        {
            if (this._isPushed())
        	{
                this._changeUserStatus("pushed", false);
            }
           /* else if (this._isSelected())
            {
                this._changeUserStatus("selected", true);
            }*/
            else
            {
                this._changeStatus("mouseover", false);
            }
        }
    };

    // defaultAction
    _pComponent.on_mouseleave_default_action = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // TODO:
    };
    // mouseleave end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // mousewheel
    _pComponent._on_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll)
    {
        return this._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll); // user event bubble
    };

    _pComponent._on_bubble_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

                var pThis = this._getFromComponent(this);
                
                if (event_bubbles !== true)
                {
                    if (pThis && (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented)))
                    {
                        var ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

                        if (ret) return;

                        if (this._setVScrollDefaultAction(wheelDeltaY))
                            return;

                        if (this._setHScrollDefaultAction(wheelDeltaX))
                            return;
                    }
                    if (event_bubbles === false) event_bubbles = undefined;

                    if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation))
                    {
                        if (this.parent && !this.parent._is_application)
                        {
                            // 버블링 여부는 컴포넌트에서 결정한다.
                            var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                            canvasX = canvas[0];
                            canvasY = canvas[1];

                            if (this._is_subcontrol)
                            {
                                return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bScroll);
                            }
                            else
                            {
                                return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bScroll);
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                event_bubbles = this.on_fire_user_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp);

                var pThis = this._getFromComponent(this);

                if (event_bubbles !== true)
                {
                    if (pThis && (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.defaultprevented)))
                    {
                        var ret = this.on_fire_sys_onmousewheel(wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[0], fire_comp, refer_comp);

                        if (ret) return;

                        //if (this._isWheelScrollable(wheelDelta) && this.vscrollbar && this.vscrollbar.enable)

                        if(this._setVScrollDefaultAction(wheelDeltaY))
                            return;

                        if (nexacro._OS == "Mac OS")
                        {
                            if(this._setHScrollDefaultAction(wheelDeltaX))
                                return;
                        }
                   }

                    if (!pThis.onmousewheel || (pThis.onmousewheel && !pThis.onmousewheel.stoppropagation))
                    {
                        if (this.parent && !this.parent._is_application)
                        {
                            // 버블링 여부는 컴포넌트에서 결정한다.
                            var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                            canvasX = canvas[0];
                            canvasY = canvas[1];

                            return this.parent._on_bubble_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bScroll);
                        }
                    }
                }
        }
        }
    };

    // for on_mousewheel
    _pComponent._setVScrollDefaultAction = function (wheelDelta)
    {
        var control_elem = this.getElement();

        if (!control_elem )
            return false;

        if (!this._is_scrollable)
            return false;

        if (this.scrolltype == "none" || this.scrolltype == "horizontal")
            return false;

        var old_value = this._vscroll_pos;
        var value = old_value - wheelDelta;

        var vscroll_limit = control_elem.vscroll_limit;
        if (value > vscroll_limit)
            value = vscroll_limit;

        this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");
                
        var new_value = this._vscroll_pos;

        if (old_value != new_value)
            return true;
            
        return false;
    };

    _pComponent._setHScrollDefaultAction = function (wheelDelta)
    {
        var control_elem = this.getElement();

        if (!control_elem)
            return false;

        if (!this._is_scrollable)
            return false;

        if (this.scrolltype == "none" || this.scrolltype == "vertical")
            return false;

        var old_value = this._hscroll_pos;
        var value = old_value - wheelDelta;

        var hscroll_limit = control_elem.hscroll_limit;
        if (value > hscroll_limit)
            value = hscroll_limit;

        this._scrollTo(value, this._vscroll_pos, true, true, undefined, "mousewheel_h");
        var new_value = this._hscroll_pos;

        if (old_value != new_value)
            return true;

        return false;
    };

    // defaultAction
    _pComponent.on_mousewheel_default_action = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // mousewheel default action에 대한 정의가 없음. scroll 이동이 action
    };
    // mousewheel end
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    // event flow 수정

    _pComponent._init_drag_info = function ()
    {
        nexacro._cur_drag_info = null;
    };
    // drag
    _pComponent._on_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        if (nexacro._skipDragEventAfterMsgBox)
        {
            this._init_drag_info();
            return false;
        }
            
        var ret = this._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (pThis.ondrag && pThis.ondrag.defaultprevented))
        {
            this._init_drag_info();
        }

        return ret;
    };

    _pComponent._on_bubble_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var is_subcontrol_bubble;

            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            var pThis = this._getFromComponent(this);

            if (this._is_subcontrol)
            {
                is_subcontrol_bubble = true;
            }
            else
            {
                is_subcontrol_bubble = false;
                var clientXY = this._getClientXY(canvasX, canvasY);

                event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp);
                if (!event_bubbles || event_bubbles[0] !== true)
                {
                    if (!this.ondrag || (pThis && (pThis.ondrag && !pThis.ondrag.defaultprevented)))
                    {
                        this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp);
                    }
                }
            }

            if ((!event_bubbles || event_bubbles[0] !== true))
            {
                if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && this.parent && !this.parent._is_application)
                {
                    var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                    canvasX = canvas[0];
                    canvasY = canvas[1];

                    if (is_subcontrol_bubble)
                    {
                        return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, this, refer_comp);
                    }
                    else
                    {
                        return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp);
                    }
                }
            }
            return event_bubbles;
        }
        else
        {
            if ((!event_bubbles || event_bubbles[0] !== true) && this.parent && !this.parent._is_application)
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this);
                if (!event_bubbles || event_bubbles[0] !== true)
                {
                    var pThis = this._getFromComponent(this);
                    if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.defaultprevented)))
                    {
                        this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this);
                    }

                    if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && this.parent && !this.parent._is_application)
                    {
                        var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                        canvasX = canvas[0];
                        canvasY = canvas[1];

                        return this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp);
                    }
                }
            }
            return event_bubbles;
        }
    };

    // defaultAction
    _pComponent.on_drag_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // drag end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // drop
    _pComponent._on_drop = function (elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = this._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata,
                                     button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.ondrop || (pThis.ondrop && !pThis.ondrop.defaultprevented)))
        {
        	this.on_drop_default_action(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata,
                                         button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_drop = function (elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var is_subcontrol_bubble;

            if (!refer_comp)
            {
                refer_comp = this;
                    /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_ondrop(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_ondrop(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }            
            //}

            if ((!this.ondrop || (this.ondrop && !this.ondrop.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_ondrop(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_ondrop(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.ondrop || (this.ondrop && !this.ondrop.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_drop(elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_drop_default_action = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // drop end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // dragmove
    _pComponent._on_dragmove = function (elem, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = this._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata,
                                         button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.ondragmove || (pThis.ondragmove && !pThis.ondragmove.defaultprevented)))
        {
        	this.on_dragmove_default_action(elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata,
                                             button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        else if (pThis && (pThis.ondragmove && pThis.ondragmove.defaultprevented))
        {
            this._init_drag_info();
        }
        return ret;
    };

    _pComponent._on_bubble_dragmove = function (elem, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var is_subcontrol_bubble;

            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this._is_subcontrol)
            {
                is_subcontrol_bubble = true;
            }
            else
            {
                is_subcontrol_bubble = false;
                if (this.visible && this._isEnable())
                {
                    var clientXY = this._getClientXY(canvasX, canvasY);
                    if (bubble_scope)
                    {
                        event_bubbles = this.on_fire_user_ondragmove(src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                    else
                    {
                        event_bubbles = this.on_fire_sys_ondragmove(src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                }
            }

            if ((!this.ondragmove || (this.ondragmove && !this.ondragmove.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (is_subcontrol_bubble)
                {
                    return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_ondragmove(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_ondragmove(src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
            }
            if ((!this.ondragmove || (this.ondragmove && !this.ondragmove.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_dragmove(elem, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // defaultAction
    _pComponent.on_dragmove_default_action = function (elem, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
    };
    // dragmove end
    //----------------------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------------------------------------------------
    // dragenter

    _pComponent._on_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = this._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
                                         button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (!pThis.ondragenter || (pThis.ondragenter && !pThis.ondragenter.defaultprevented))
        {
        	this.on_dragenter_default_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
                                             button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        else if (pThis && (pThis.ondragenter && pThis.ondragenter.defaultprevented))
        {
            this._init_drag_info();
        }
        return ret;
    };

    _pComponent._on_bubble_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var is_subcontrol_bubble;

            if (!refer_comp)
            {
                this._dragenter_first_comp = this;
                refer_comp = this;
                    /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this._is_subcontrol)
            {
                is_subcontrol_bubble = true;
                if (from_comp && this._contains(from_comp)) return;
                if (from_comp == this)
                {
                	this.on_dragenter_basic_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                }
            }
            else
            {
                is_subcontrol_bubble = false;
                from_comp = this._getRootComponent(from_comp);
                if (from_comp && this._contains(from_comp)) return;

                if (this.visible && this._isEnable())
                {
                	this.on_dragenter_basic_action(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

                    // TODO check 확인필요 drag with enableevent
                    var clientXY = this._getClientXY(canvasX, canvasY);
                    if (bubble_scope)
                    {
                        event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata,
                                button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                    else
                    {
                        event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata,
                                button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                }
            }
            if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (is_subcontrol_bubble)
                {
                    return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                // TODO check 확인필요 drag with enableevent
                var clientXY = this._getClientXY(canvasX, canvasY);

                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata,
                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata,
                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }

                //this._stat_change("", "mouseover");
                this._changeStatus("mouseover", true);
            }
            if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // basicAction
    _pComponent.on_dragenter_basic_action = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        if (this._isPushed())
        {
            this._changeUserStatus("pushed", true);
        }
        else
        {
            this._changeStatus("mouseover", true);
        }
    };

    // defaultAction
    _pComponent.on_dragenter_default_action = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // TODO 
    };
    // dragenter end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // event flow 수정
    // dragleave

    _pComponent._on_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = this._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.ondragleave || (pThis.ondragleave && !pThis.ondragleave.defaultprevented)))
        {
        	this.on_dragleave_default_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
            ret = this._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            var is_subcontrol_bubble;

            if (!refer_comp)
            {
                refer_comp = this;
            /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this._is_subcontrol)
            {
                is_subcontrol_bubble = true;
                if (to_comp && this._contains(to_comp)) return;
                if (fire_comp == this)
                {
                	this.on_dragleave_basic_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);
                }
            }
            else
            {
                is_subcontrol_bubble = false;
                to_comp = this._getRootComponent(to_comp);
                if (to_comp && this._contains(to_comp)) return;

                if (this.visible && this._isEnable())
                {
                	this.on_dragleave_basic_action(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

                    var clientXY = this._getClientXY(canvasX, canvasY);
                    if (bubble_scope)
                    {
                        event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                    else
                    {
                        event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
                    }
                }
            }

            if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (is_subcontrol_bubble)
                {
                    return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata,
                                    button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata,
                                    button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
                }
                if (!to_comp || !this._contains(to_comp))
                {
                    //this._stat_change("", "normal");
                    this._changeStatus("mouseover", false);
                }
            }
            if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
								button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    // basicAction
    _pComponent.on_dragleave_basic_action = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        if (this._isPushed())
        {
            this._changeUserStatus("pushed", false);
        }
        else
        {
            this._changeStatus("mouseover", false);
        }
    };

    // inner status 
    // enable, disable 
    // visible, invisible

    // focus 
    // mouseover
    // readonly 
    // select

    //disable 
    //

    // defaultAction
    _pComponent.on_dragleave_default_action = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // TODO 
    };

    // dragleave end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------
    // event flow 수정
    // onkeydown

    _pComponent._on_keydown = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp)
    {
    	var ret = this._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, true); // user event bubble

    	if (!this._is_alive) return ret;

        var pThis = this._getFromComponent(this);

        if (pThis && (!pThis.onkeydown || (pThis.onkeydown && !pThis.onkeydown.defaultprevented)))
        {
            this.on_keydown_default_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
            ret = this._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_keydown = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable())
            {
            	if (bubble_scope)
            	{
            		this.on_keydown_basic_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
            	}

                if (bubble_scope && !this._is_hotkey)
                {
                    event_bubbles = this.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
                    this._is_hotkey = false;
                }
                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onkeydown || (this.onkeydown && !this.onkeydown.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                }
            }
            if ((!this.onkeydown || (this.onkeydown && !this.onkeydown.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_keydown(elem, keycode, alt_key, ctrl_key, shift_key, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };
    
    _pComponent.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
    };
	// defaultAction
    _pComponent.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
    };

    // onkeydown end
    //----------------------------------------------------------------------------------------------------------------------------------

    //----------------------------------------------------------------------------------------------------------------------------------

    // onkeyup
    _pComponent._on_keyup = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp)
    {
        if (keycode == nexacro.Event.KEY_TAB)
        {
        	if (!this._getDlgCode().want_tab)
                return;
        }

        var ret = this._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, true); // user event bubble
        var pThis = this._getFromComponent(this);
        if (pThis && (!pThis.onkeyup || (pThis.onkeyup && !pThis.onkeyup.defaultprevented)))
        {
        	this.on_keyup_default_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
            ret = this._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, false); // system event bubble
        }
        return ret;
    };

    _pComponent._on_bubble_keyup = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp, bubble_scope)
    {
        if (!this._is_alive) return;
        
        if (event_bubbles === undefined) //this is fire_comp or subcontrol
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                {
                    refer_comp = this._getReferenceComponent(refer_comp);
                }
                */
            }

            if (this.visible && this._isEnable()) 
            {
            	if (bubble_scope)
            	{
            		this.on_keyup_basic_action(keycode, alt_key, ctrl_key, shift_key, refer_comp);
            	}
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onkeyup(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onkeyup(keycode, alt_key, ctrl_key, shift_key, this, refer_comp);
                }

                if (event_bubbles === false) event_bubbles = undefined;
            }
            if ((!this.onkeyup || (this.onkeyup && !this.onkeyup.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, null, refer_comp, bubble_scope);
                }
                else
                {
                    return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, false, this, refer_comp, bubble_scope);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                if (bubble_scope)
                {
                    event_bubbles = this.on_fire_user_onkeyup(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                }
                else
                {
                    event_bubbles = this.on_fire_sys_onkeyup(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                }
            }
            if ((!this.onkeyup || (this.onkeyup && !this.onkeyup.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_keyup(elem, keycode, alt_key, ctrl_key, shift_key, false, fire_comp, refer_comp, bubble_scope);
            }
        }
    };

    _pComponent.on_keyup_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
    };
	// defaultAction
    _pComponent.on_keyup_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
    };

	// onkeyup end
	//----------------------------------------------------------------------------------------------------------------------------------
    _pComponent.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key, shift_key)
    {
    	return;
    };

    _pComponent._on_keypress = function (elem, keycode, charcode, alt_key, ctrl_key, shift_key)
    {
    	if (!this._is_alive) return;

    	return this.on_keypress_basic_action(keycode, charcode, alt_key, ctrl_key, shift_key);
    };

	// bubble 없음. no cancelable, no prevent
    _pComponent.on_beforekeyinput_basic_action = function (value, status, begin, end)
    {
    	return;
    };

    _pComponent._on_beforekeyinput = function (elem, value, status, begin, end)
    {
    	if (!this._is_alive) return false;

    	return this.on_beforekeyinput_basic_action(value, status, begin, end);
    };

	// bubble 없음. no cancelable, no prevent
    _pComponent.on_keyinput_basic_action = function ()
    {
    	return;
    };

    _pComponent.on_keyinput_default_action = function ()
    {
    	return;
    };

    _pComponent._on_keyinput = function (elem)
    {
        if (!this._is_alive) return;

        this.on_keyinput_basic_action();
        if (this.visible && this._isEnable() && this.enableevent)
        {
            this.on_fire_oninput();
            this.on_keyinput_default_action();
        }
    };

    _pComponent._on_contextmenu = function (elem, event_bubbles, from_comp, from_refer_comp)
    {
    	var ret = true;
        if (!this._is_alive) return ret;
        
        if (this._isEnable()) 
        {
            var root_comp = this._getFromComponent(this);
            var listener = nexacro._Browser == "Safari" ? root_comp.onrbuttondown : root_comp.onrbuttonup; // [REQ_35042] 2014-05-28 safari : rbuttondown - contextmenu - rbuttonup, other browser : rbuttondown - rbuttonup - contextmenu
            if (listener && listener.defaultprevented) 
            {
                ret = false;
            }
            else
            {
            	ret = this._on_bubble_contextmenu(event_bubbles, from_comp, from_refer_comp, true);
        	    listener = root_comp.oncontextmenu;
        	    if (!listener || (listener && !listener.defaultprevented))
        	    {
        		    ret = this._on_bubble_contextmenu(event_bubbles, from_comp, from_refer_comp, false);
        	    }
        	    else
        	    {
        		    ret = false;
        	    }
            }
        }
        return ret;
    };

    _pComponent._on_bubble_contextmenu = function (event_bubbles, from_comp, from_refer_comp, bubble_scope)
    {
    	var ret = true;

    	if (!this._is_alive) return;

    	if (event_bubbles === undefined)
    	{
    		if (!from_refer_comp)
    		{
    		    from_refer_comp = this;
                /*
    			if (!from_refer_comp._is_reference_control)
    			{
    				from_refer_comp = this._getReferenceComponent(from_refer_comp);
    			}
                */
    		}
    		
    		if (bubble_scope) // <- 최초 대상을 의미함.
    		{
    		    this._on_contextmenu_basic_action(from_refer_comp);
    		}	
    		else
    		{
    			ret = this._on_contextmenu_default_action(from_refer_comp);
    		}

    		if (this.visible && this._isEnable()) 
    		{
    			var fire_event_func = bubble_scope ? this.on_fire_user_oncontextmenu : this.on_fire_sys_oncontextmenu;
    			event_bubbles = fire_event_func.call(this, this, from_refer_comp);
    		}
    		if ((!this.oncontextmenu || (this.oncontextmenu && !this.oncontextmenu.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
    		{
    			
    			if (this._is_subcontrol)
    			{
    				
    				return this.parent._on_bubble_contextmenu(event_bubbles, null, from_refer_comp, bubble_scope);
    			}
    			else
    			{
    				return this.parent._on_bubble_contextmenu(false, null, from_refer_comp, bubble_scope);
    			}
    		}
    	}
    	else
    	{
    		if (this.visible && this._isEnable()) 
    		{
    			var fire_event_func = bubble_scope ? this.on_fire_user_oncontextmenu : this.on_fire_sys_oncontextmenu;
    			event_bubbles = fire_event_func.call(this, this, from_refer_comp);
    		}
    		if ((!this.oncontextmenu || (this.oncontextmenu && !this.oncontextmenu.stoppropagation)) && (event_bubbles !== true) && this.parent && !this.parent._is_application)
    		{
    			
    			return this.parent._on_bubble_contextmenu(false, from_comp, from_refer_comp, bubble_scope);
    		}
    	}
    	return ret;
    };

    _pComponent._on_contextmenu_basic_action = function (refer_comp)
    {
    	return;
    };

    _pComponent._on_contextmenu_default_action = function (refer_comp)
    {
        var comp = this;
		var environment = nexacro.getEnvironment();
		var env_usecontextmenu = environment ? environment.usecontextmenu : "all";
		var bForm = (comp instanceof nexacro.Form);
		var bEdit = (comp instanceof nexacro.Edit || comp instanceof nexacro.MaskEdit || comp instanceof nexacro.TextArea);

		if (env_usecontextmenu == "all")
        {
		    if (bEdit) return comp.usecontextmenu;

            return true;
        }
		else if (env_usecontextmenu == "form")
        {
            if (bForm) return true;

            return false;
        }
		else if (env_usecontextmenu == "edit")
        {
		    if (bEdit) return comp.usecontextmenu;

            return false;
        }
        else
        {
            return false;
        }
    };

    _pComponent._on_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp)
    {        
        // user bubble
        this._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.ontouchstart;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
    };

    _pComponent._on_bubble_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
                this.on_touchstart_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
            else
                this.on_touchstart_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);

            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {                
                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchstart : this.on_fire_sys_ontouchstart;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

                if (event_bubbles === false) event_bubbles = undefined;
            }

            var listener = this.ontouchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                // parent시 버블링시 Canvas좌표가 변경됨. 
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    // TODO check Drag동작은 BasicAction인가??
                    var select_mode = "select";

                    if (this.selectscrollmode)
                    {
                        if (this.selectscrollmode == "default")
                            select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
                        else
                            select_mode = this.selectscrollmode;
                    }
                    
                    if (touchinfos.length == 1 && select_mode == "select")
                    {
                        var win = touch_manager._start_win;
                        var elem = touch_manager._start_elem;

                        nexacro._setDragInfo(win, elem, win._curWindowX, win._curWindowY, null, null);
                    }
                    return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {
                touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchstart : this.on_fire_sys_ontouchstart;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, fire_comp, refer_comp);
            }

            var listener = this.ontouchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
                return this.parent._on_bubble_touchstart(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_touchstart_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        var firsttouchinput = touch_manager.getFirstTouchInputInfo(changedtouchinfos);        
        if (firsttouchinput)
        {
            // lbuttondown status

            // pushed pseudo
            //if (this._use_pushed_status)
            if (this._use_pushed_status)
            {
                this._changeUserStatus("pushed", true);
            }

            // close popups
            if (nexacro._current_popups.length > 0)
            {
            	nexacro._checkClosePopupComponent(this, true);
            }

            var win = this._getWindow();
            if (this._is_track)
            {
                nexacro._setTrackInfo(win, this, win._curWindowX, win._curWindowY);
                return false;
            }

            if (this._is_repeat)
            {
                nexacro._setRepeatInfo(this, win, refer_comp, win._curWindowX, win._curWindowY, changedtouchinfos[0].canvasx, changedtouchinfos[0].canvasy);
                return true; //repeat comp 인 경우 bubble하지 않는다.
            }
        }
    };

    _pComponent.on_touchstart_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) { };

    _pComponent._on_touchmove = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.ontouchmove;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
    };

    _pComponent._on_bubble_touchmove = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
                this.on_touchmove_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
            else
                this.on_touchmove_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);

            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {
                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchmove : this.on_fire_sys_ontouchmove;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

                if (event_bubbles === false) event_bubbles = undefined;
            }

            var listener = this.ontouchmove;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {
                touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchmove : this.on_fire_sys_ontouchmove;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);
            }

            var listener = this.ontouchmove;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
                return this.parent._on_bubble_touchmove(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_touchmove_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) { };
    _pComponent.on_touchmove_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) { };

    _pComponent._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        if (root_comp)
        {
            var listener = root_comp.ontouchend;
            if (!listener || (listener && !listener.defaultprevented))
                this._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, false);
            if (listener && listener.defaultprevented)
            {
                // TouchEnd PreventDefault 처리시 Tap을 막는다.
                return true;
            }
        }
    };

    _pComponent._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
                this.on_touchend_basic_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);
            else
                this.on_touchend_default_action(touch_manager, touchinfos, changedtouchinfos, refer_comp);

            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {
                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchend : this.on_fire_sys_ontouchend;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);

                if (event_bubbles === false) event_bubbles = undefined;
            }

            var listener = this.ontouchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable() && ((is_userbubble && this.enableevent) || !is_userbubble))
            {
                touch_manager.updateTouchInputInfosClientXY(touchinfos, this);

                var fire_event_func = is_userbubble ? this.on_fire_user_ontouchend : this.on_fire_sys_ontouchend;
                event_bubbles = fire_event_func.call(this, touchinfos, changedtouchinfos, this, refer_comp);
            }

            var listener = this.ontouchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                touch_manager.updateTouchInputInfosCanvasXY(touchinfos, (this._adjust_left - this._scroll_left || 0), (this._adjust_top - this._scroll_top || 0));
                return this.parent._on_bubble_touchend(touch_manager, touchinfos, changedtouchinfos, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        var firsttouchinput = touch_manager.getFirstTouchInputInfo(changedtouchinfos);
        if (firsttouchinput)
        {
            // status
            if (this._use_pushed_status)
            {
                if (nexacro._isTouchInteraction)
                {
                    this._changeUserStatus("pushed", false);
                }
                else
                {
                    this._changeUserStatus("pushed", false);
                    this._changeStatus("mouseover", false);
                }
            }
        }


    };

    _pComponent.on_touchend_default_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp) { };

    _pComponent._on_tap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {        
        // user bubble
        this._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

        // TODO Tap은 사용자 노출 이벤트가 아님. EventListener가 있을 수 없음.
        
        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.ontap;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
    };

    // tap은 버블, click은 버블X
    _pComponent._on_bubble_tap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            var is_first = false;
            if (!refer_comp)
            {
                refer_comp = this._focus_refer_comp = this;
                if (!this._is_focus_accept)
                {
                    this._focus_refer_comp = this._getFocusAcceptableComponent(this);
                }
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._focus_refer_comp = this._getReferenceComponent(refer_comp);
                    */
                is_first = true; 
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            {
                // BasicAction이 버블되서 또 호출될수 있는 문제가 발견됐음
                if (is_first)
                    this.on_tap_basic_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
            }
            else
                this.on_tap_default_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                // 임시. 현재 LButtonDown->Up시 Logical Click이 발생하지 않고 있음 
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    // ClickEvent 연동은 SysHandler에서... (EnableTouchEvent 일때만)
                    var fire_event_func = is_userbubble ? this.on_fire_user_ontap : this.on_fire_sys_ontap;
                    event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.ontap;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {

                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
        	if (this.visible && this._isEnable() && nexacro._enabletouchevent && this.enableevent)
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                var fire_event_func = is_userbubble ? this.on_fire_user_ontap : this.on_fire_sys_ontap;
                event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
            }

            var listener = this.ontap;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_tap(elem, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // set focus 
        var win = this._getWindow();
        if (this.visible && this._isEnable() && refer_comp)
        {
            refer_comp._on_focus(true, "tap");
        }
        else
        {
            var comp = win._findComponentForEvent(elem, 0, 0);
            if (comp && comp[0])
            {
                comp[0]._on_focus(true, "tap");
            }
        }

        // click처리 (default에서 basic으로 이동됨)
        this._on_click(elem, "touch", false, false, false, canvasX, canvasY, screenX, screenY);
    };

    _pComponent.on_tap_default_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) { };

    _pComponent._on_dbltap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.ondbltap;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);

    };

    // dbltap은 버블. dblclick은 버블X
    _pComponent._on_bubble_dbltap = function (elem, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
                this.on_dbltap_basic_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);
            else
                this.on_dbltap_default_action(elem, canvasX, canvasY, screenX, screenY, refer_comp);

            if (this.visible && this._isEnable())
            {
                var clientXY = this._getClientXY(canvasX, canvasY);

                // 임시. 현재 LButtonDown->Up시 Logical Click이 발생하지 않고 있음 
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    // DblClick Event연동은 SysHandler에서
                    var fire_event_func = is_userbubble ? this.on_fire_user_ondbltap : this.on_fire_sys_ondbltap;
                    event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.ondbltap;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable() && nexacro._enabletouchevent && this.enableevent)
            {
                var clientXY = this._getClientXY(canvasX, canvasY);
                var fire_event_func = is_userbubble ? this.on_fire_user_ondbltap : this.on_fire_sys_ondbltap;
                event_bubbles = fire_event_func.call(this, elem, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
            }

            var listener = this.ondbltap;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

                canvasX = canvas[0];
                canvasY = canvas[1];

                return this.parent._on_bubble_dbltap(elem, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_dbltap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) { };
    _pComponent.on_dbltap_default_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp) { };

    _pComponent._on_pinchstart = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom)
    {
        // user bubble
        this._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onpinchstart;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "pinchstart"))
                return true;
            this._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_pinchstart = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_pinchstart_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
            else
            	this.on_pinchstart_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);

            if (this.visible && this._isEnable())
            {
                if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinchstart : this.on_fire_sys_onpinchstart;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onpinchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinchstart : this.on_fire_sys_onpinchstart;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, fire_comp, refer_comp);
                }
            }

            var listener = this.onpinchstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_pinchstart(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
            }
        }
    };

    _pComponent.on_pinchstart_basic_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };
    _pComponent.on_pinchstart_default_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };

    _pComponent._on_pinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom)
    {
        // user bubble
        this._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onpinch;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "pinch"))
                return true;
            this._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_pinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_pinch_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
            else
            	this.on_pinch_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);

            if (this.visible && this._isEnable())
            {
            	if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    // Zoom 연동은 SysHandler에서 처리
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinch : this.on_fire_sys_onpinch;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, firstrange, currange, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onpinch;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable()) 
            {
                if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinch : this.on_fire_sys_onpinch;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, firstrange, currange, fire_comp, refer_comp);
                }
            }

            var listener = this.onpinch;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_pinch(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
            }
        }
    };

    _pComponent.on_pinch_basic_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };
    _pComponent.on_pinch_default_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };

    _pComponent._on_pinchend = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom)
    {
        // user bubble
        this._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onpinchend;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, false);
    };

    _pComponent._on_bubble_pinchend = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, fire_comp, refer_comp, bZoom, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_pinchend_basic_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);
            else
            	this.on_pinchend_default_action(elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp);

            if (this.visible && this._isEnable())
            {
            	if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinchend : this.on_fire_sys_onpinchend;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onpinchend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, event_bubbles, null, refer_comp, bZoom, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, this, refer_comp, bZoom, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (nexacro._enabletouchevent && (!is_userbubble || (is_userbubble && this.enableevent)))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onpinchend : this.on_fire_sys_onpinchend;
                    event_bubbles = fire_event_func.call(this, elem, touchinfos, accvalue, deltavalue, fire_comp, refer_comp);
                }
            }

            var listener = this.onpinchend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_pinchend(elem, touchinfos, accvalue, deltavalue, firstrange, currange, false, fire_comp, refer_comp, bZoom, is_userbubble);
            }
        }
    };

    _pComponent.on_pinchend_basic_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };
    _pComponent.on_pinchend_default_action = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, bZoom, refer_comp) { };

    _pComponent._on_flingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onflingstart;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "flingstart"))
                return true;
            this._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_flingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_flingstart_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
            else
            	this.on_flingstart_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

            if (this.visible && this._isEnable())
            {
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onflingstart : this.on_fire_sys_onflingstart;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onflingstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onflingstart : this.on_fire_sys_onflingstart;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
                }
            }

            var listener = this.onflingstart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                return this.parent._on_bubble_flingstart(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_flingstart_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) { };
    _pComponent.on_flingstart_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) { };

    _pComponent._on_fling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onfling;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "fling"))
                return true;
            this._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_fling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        var pThis = this._getFromComponent(this);
        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_fling_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
            else
            	this.on_fling_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

            if (this.visible && this._isEnable())
            {
                // Fling은 버블된 경우에도 preventDefault를 호출하면 DefaultAction 취소가능 (bubblelike?)
                if ((!is_userbubble && (!pThis.onfling || (pThis.onfling && !pThis.onfling.defaultprevented)))
                    || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    // Scroll처리는 SysHandler에서..
                    var fire_event_func = is_userbubble ? this.on_fire_user_onfling : this.on_fire_sys_onfling;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onfling;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if ((!is_userbubble && (!pThis.onfling || (pThis.onfling && !pThis.onfling.defaultprevented)))
                    || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onfling : this.on_fire_sys_onfling;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
                }
            }

            var listener = this.onfling;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                return this.parent._on_bubble_fling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_fling_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) { };
    _pComponent.on_fling_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) { };

    _pComponent._on_flingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onflingend;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, false);
                
        if (this instanceof nexacro.Form)
        {
            if (nexacro._OS == "iOS")
            {
                var _win = this._getWindow();
                var cur_focus_paths = _win.getCurrentFocusPaths();
                var focused_comp = cur_focus_paths[cur_focus_paths.length - 1];
                var input_elem = focused_comp._input_element;

                if (input_elem)
                {
                    nexacro._deleteRefreshNode();
                    nexacro._refreshCaret();
                }
            }
        }
        this._is_bubble_fling_v = false;
        this._is_bubble_fling_h = false;
    };

    _pComponent._on_bubble_flingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_flingend_basic_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);
            else
            	this.on_flingend_default_action(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp);

            if (this.visible && this._isEnable())
            {
            	if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onflingend : this.on_fire_sys_onflingend;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onflingend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onflingend : this.on_fire_sys_onflingend;
                    event_bubbles = fire_event_func.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, fire_comp, refer_comp);
                }
            }

            var listener = this.onflingend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application && !this._is_track)
            {
                return this.parent._on_bubble_flingend(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_flingend_basic_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp)
    {
        var pThis = this;
        while ((!pThis._is_frame && !pThis._getScrollable()) || !pThis._isEnable())
            pThis = pThis.parent;

        if (!pThis._is_frame)
        {
                var vscrollbartype = pThis._getVScrollBarType();
                var hscrollbartype = pThis._getHScrollBarType();

                if (pThis.vscrollbar && pThis.vscrollbar.visible && vscrollbartype == "autoindicator")
                    pThis.vscrollbar.set_visible(false);

                if (pThis.hscrollbar && pThis.hscrollbar.visible && hscrollbartype == "autoindicator")
                    pThis.hscrollbar.set_visible(false);
            
        }
    };
    _pComponent.on_flingend_default_action = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, refer_comp) { };

    _pComponent._on_longpress = function (elem, touchinfos, event_bubbles, fire_comp, refer_comp)
    {
        // user bubble
        this._on_bubble_longpress(elem, touchinfos, event_bubbles, fire_comp, refer_comp, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onlongpress;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_longpress(elem, touchinfos, event_bubbles, fire_comp, refer_comp, false);
    };

    _pComponent._on_bubble_longpress = function (elem, touchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_longpress_basic_action(elem, touchinfos, refer_comp);
            else
            	this.on_longpress_default_action(elem, touchinfos, refer_comp);

            if (this.visible && this._isEnable() && (!is_userbubble || (is_userbubble && this.enableevent)))
            {
                // Basic Action: 텍스트 단어 선택
                // Default Action: contextmenu 팝업
                // -> 둘다 불가능 재검토 필요

                var fire_event_func = is_userbubble ? this.on_fire_user_onlongpress : this.on_fire_sys_onlongpress;
                event_bubbles = fire_event_func.call(this, elem, touchinfos, this, refer_comp);

                if (event_bubbles === false) event_bubbles = undefined;
            }

            var listener = this.onlongpress;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_longpress(elem, touchinfos, event_bubbles, null, refer_comp, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_longpress(elem, touchinfos, false, this, refer_comp, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable() && (!is_userbubble || (is_userbubble && this.enableevent)))
            {
                var fire_event_func = is_userbubble ? this.on_fire_user_onlongpress : this.on_fire_sys_onlongpress;
                event_bubbles = fire_event_func.call(this, elem, touchinfos, fire_comp, refer_comp);
            }

            var listener = this.onlongpress;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_longpress(elem, touchinfos, false, fire_comp, refer_comp, is_userbubble);
            }
        }
    };

    _pComponent.on_longpress_basic_action = function (elem, touchinfos, refer_comp) { };
    _pComponent.on_longpress_default_action = function (elem, touchinfos, refer_comp) { };

    _pComponent._on_slidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll)
    {
        // user bubble
        this._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onslidestart;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "slidestart"))
                return true;
            
            this._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_slidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_slidestart_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
            else
            	this.on_slidestart_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

            if (this.visible && this._isEnable())
            {
            	if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslidestart : this.on_fire_sys_onslidestart;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onslidestart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslidestart : this.on_fire_sys_onslidestart;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
                }
            }

            var listener = this.onslidestart;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_slidestart(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
            }
        }
    };

    _pComponent.on_slidestart_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) { };
    _pComponent.on_slidestart_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) { };

    _pComponent._on_slide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll)
    {
        // user bubble
        this._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onslide;
        if (!listener || (listener && !listener.defaultprevented))
        {
            if (this._isParentdefaultprevented(root_comp, "slide"))
                return true;            
            this._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
        }
        if (listener && listener.defaultprevented)
            return true;
    };

    _pComponent._on_bubble_slide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble)
    {
        if (!this._is_alive) return;

        var pThis = this._getFromComponent(this);
        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_slide_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
            else
            	this.on_slide_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

            if (this.visible && this._isEnable())
            {
                // Slide는 버블된 경우에도 preventDefault를 호출하면 DefaultAction 취소가능 (bubblelike?)
                if ((!is_userbubble && (!pThis.onslide || (pThis.onslide && !pThis.onslide.defaultprevented)))
                    || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    // Slide Scroll은 SysHandler에서 처리함
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslide : this.on_fire_sys_onslide;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onslide;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent)
            {
                if (this.parent._is_application)
                {
                    if (!is_userbubble && touch_manager._scroll_comp == null && !nexacro._cur_track_info)
                    {
                        if (nexacro._allow_default_pinchzoom && xdeltavalue != 0 && Math.abs(xdeltavalue) > Math.abs(ydeltavalue))
                        {
                            touch_manager._scroll_end = true;
                            touch_manager._scroll_direction = (xdeltavalue > 0) ? -10 : 10;
                        }
                        else if (ydeltavalue != 0)
                        {
                            // 세로스크롤이 끝에 도달했다!
                            touch_manager._scroll_end = true;
                            touch_manager._scroll_direction = (ydeltavalue > 0) ? -1 : 1;
                        }
                    }
                    return;
                }

                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if ((!is_userbubble && (!pThis.onslide || (pThis.onslide && !pThis.onslide.defaultprevented)))
                    || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslide : this.on_fire_sys_onslide;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
                }
            }

            var listener = this.onslide;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent)
            {
                if (this.parent._is_application)
                {
                    if (!is_userbubble && touch_manager._scroll_comp == null && !nexacro._cur_track_info)
                    {
                        if (nexacro._allow_default_pinchzoom && xdeltavalue != 0 && Math.abs(xdeltavalue) > Math.abs(ydeltavalue))
                        {
                            touch_manager._scroll_end = true;
                            touch_manager._scroll_direction = (xdeltavalue > 0) ? -10 : 10;
                        }
                        else if (ydeltavalue != 0)
                        {
                            // 세로스크롤이 끝에 도달했다!
                            touch_manager._scroll_end = true;
                            touch_manager._scroll_direction = (ydeltavalue > 0) ? -1 : 1;
                        }
                    }
                    return;
                }

                return this.parent._on_bubble_slide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
            }
        }
    };

    _pComponent.on_slide_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) { };
    _pComponent.on_slide_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) { };

    _pComponent._on_slideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll)
    {
        // user bubble
        this._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, true);

        // system bubble
        var root_comp = this._getFromComponent(this);
        var listener = root_comp.onslideend;
        if (!listener || (listener && !listener.defaultprevented))
            this._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, false);
    };

    _pComponent._on_bubble_slideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, fire_comp, refer_comp, bScroll, is_userbubble)
    {
        if (!this._is_alive) return;

        if (event_bubbles === undefined)
        {
            if (!refer_comp)
            {
                refer_comp = this;
                /*
                if (!refer_comp._is_reference_control)
                    refer_comp = this._getReferenceComponent(refer_comp);
                    */
            }

            if (is_userbubble) // <- 최초 대상을 의미함.
            	this.on_slideend_basic_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);
            else
            	this.on_slideend_default_action(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp);

            if (this.visible && this._isEnable())
            {
            	if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslideend : this.on_fire_sys_onslideend;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, this, refer_comp);

                    if (event_bubbles === false) event_bubbles = undefined;
                }
            }

            var listener = this.onslideend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                if (this._is_subcontrol)
                {
                    return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, event_bubbles, null, refer_comp, bScroll, is_userbubble);
                }
                else
                {
                    return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, this, refer_comp, bScroll, is_userbubble);
                }
            }
        }
        else
        {
            if (this.visible && this._isEnable())
            {
                if (!is_userbubble || (is_userbubble && nexacro._enabletouchevent && this.enableevent))
                {
                    var fire_event_func = is_userbubble ? this.on_fire_user_onslideend : this.on_fire_sys_onslideend;
                    event_bubbles = fire_event_func.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, fire_comp, refer_comp);
                }
            }

            var listener = this.onslideend;
            if ((!listener || (listener && !listener.stoppropagation)) &&
                (event_bubbles !== true) && this.parent && !this.parent._is_application)
            {
                return this.parent._on_bubble_slideend(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, false, fire_comp, refer_comp, bScroll, is_userbubble);
            }
        }
    };

    _pComponent.on_slideend_basic_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp)
    {
            var pThis = this;
            while ((!pThis._is_frame && !pThis._getScrollable()) || !pThis._isEnable())
                pThis = pThis.parent;

            if (!pThis._is_frame)
            {
                var is_fling = false;
                var touchsession = touch_manager._touch_session;

                if (touchsession && touchsession._cur_detector)
                    is_fling = touchsession._cur_detector._checkFlingOption();

                if (!is_fling)
                {
                    var vscrollbartype = pThis._getVScrollBarType();
                    var hscrollbartype = pThis._getHScrollBarType();

                    if (pThis.vscrollbar && pThis.vscrollbar.visible && vscrollbartype == "autoindicator")
                        pThis.vscrollbar.set_visible(false);

                    if (pThis.hscrollbar && pThis.hscrollbar.visible && hscrollbartype == "autoindicator")
                        pThis.hscrollbar.set_visible(false);
                }
            }

    };
    _pComponent.on_slideend_default_action = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, bScroll, refer_comp) { };

    // zoom 버블 없음. 기존 형태 유지
    _pComponent._on_zoom = function (zoomfactor, fire_comp, refer_comp)
    {
        if (!this._is_alive) return;

        if (this.visible && this._isEnable())
        {
            this._setZoom(zoomfactor);
        }
    };


    //----------------------------------------------------------------------------------------------------------------------------------
    // onorientationchange

    // 발생 대상이 특정 컴포넌트나 좌표가 아니고 system이므로 발생대상과 bubbling이 의미가 없다.
    _pComponent._on_orientationchange = function (orientation)
    {
        if (!this._is_alive) return;
        if (this.visible && this._isEnable())
        {
            if (this.enableevent)
            {
                this.on_fire_onorientationchange(orientation);
            }
        }
    };

    // onorientationchange end
    //----------------------------------------------------------------------------------------------------------------------------------

    // for trackking
    _pComponent._on_starttrack = nexacro._emptyFn;
    _pComponent._on_movetrack = nexacro._emptyFn;
    _pComponent._on_endtrack = nexacro._emptyFn;

    // for repeating
    _pComponent._on_startrepeat = nexacro._emptyFn;
    _pComponent._on_repeat = nexacro._emptyFn;
    _pComponent._on_endrepeat = nexacro._emptyFn;

    // event fire Functions - for Listeners1
    _pComponent.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onclick && this.onclick._has_handlers)
        {
            var evt = new nexacro.ClickEventInfo(this, "onclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            var ret = this.onclick._fireEvent(this, evt);
            evt.destroy();
            evt = null;

            return ret;
        }
        return false;
    };

    _pComponent.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        nexacro._fireBeforeDblclick(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

        if (this.ondblclick && this.ondblclick._has_handlers)
        {
            var evt = new nexacro.ClickEventInfo(this, "ondblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.ondblclick._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_onkillfocus = function (newobj, newreferobj)
    {
        if (this.onkillfocus && this.onkillfocus._has_handlers)
        {
            var evt = new nexacro.KillFocusEventInfo(this, "onkillfocus", newobj, newreferobj);
            return this.onkillfocus._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_onsetfocus = function (oldobj, oldreferobj)
    {
        if (this.onsetfocus && this.onsetfocus._has_handlers)
        {
            var evt = new nexacro.SetFocusEventInfo(this, "onsetfocus", oldobj, oldreferobj);
            return this.onsetfocus._fireEvent(this, evt);
        }
        return false;
    };

    // Event flow 수정 작업 
    //-----------------------------------------------------------------------------------------------------------------------------------
    // onkeydown 
    // normal fire
    _pComponent.on_fire_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeydown && this.onkeydown._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeydown._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeydown && this.onkeydown._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeydown._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire
    _pComponent.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeydown && this.onkeydown._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeydown._fireUserEvent(this, evt);
        }
        return false;
    };
    // onkeydown end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onkeyup
    // normal
    _pComponent.on_fire_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeyup && this.onkeyup._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeyup._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeyup && this.onkeyup._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeyup._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire
    _pComponent.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeyup && this.onkeyup._has_handlers)
        {
            var evt = new nexacro.KeyEventInfo(this, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeyup._fireUserEvent(this, evt);
        }
        return false;
    };
    // onkeyup end
    //-----------------------------------------------------------------------------------------------------------------------------------
	//-----------------------------------------------------------------------------------------------------------------------------------
	// oninput
	// normal
    _pComponent.on_fire_oninput = function ()
    {
    	return true;
    };
	// oninput end
	//-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onlbuttondown 
    // normal
    _pComponent.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire
    _pComponent.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };
    // onlbuttondown end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onlbuttonup
    // normal 
    _pComponent.on_fire_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttonup._fireEvent(this, evt);
        }
        return false;
    };

    // normal 
    _pComponent.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttonup._fireSysEvent(this, evt);
        }
        return false;
    };

    // normal 
    _pComponent.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };
    // onlbuttonup end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onrbuttondown 
    // normal
    _pComponent.on_fire_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttondown && this.onrbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttondown._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttondown && this.onrbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttondown._fireSysEvent(this, evt);
        }
        return false;
    };
    // user event fire
    _pComponent.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttondown && this.onrbuttondown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttondown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };
    // onrbuttondown end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onrbuttonup
    // normal
    _pComponent.on_fire_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttonup && this.onrbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttonup._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onrbuttonup && this.onrbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttonup._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire
    _pComponent.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onrbuttonup && this.onrbuttonup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };
    // onrbuttonup end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmouseup
    // normal 
    _pComponent.on_fire_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseup._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire  
    _pComponent.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseup._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmouseup end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmousedown 
    // normal
    _pComponent.on_fire_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousedown._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousedown._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousedown", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousedown._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmousedown end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmouseenter 
    //normal
    _pComponent.on_fire_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseenter && this.onmouseenter._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseenter._fireEvent(this, evt);
        }
        return false;
    };

    //sys event fire
    _pComponent.on_fire_sys_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseenter && this.onmouseenter._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseenter._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseenter && this.onmouseenter._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseenter", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseenter._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmouseenter end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmouseleave
    // normal
    _pComponent.on_fire_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseleave && this.onmouseleave._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseleave._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseleave && this.onmouseleave._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseleave._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseleave && this.onmouseleave._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmouseleave", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseleave._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmouseleave end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmousemove
    // normal
    _pComponent.on_fire_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousemove && this.onmousemove._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousemove._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousemove && this.onmousemove._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousemove._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousemove && this.onmousemove._has_handlers)
        {
            var evt = new nexacro.MouseEventInfo(this, "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousemove._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmousemove end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onmousewheel 
    // normal 
    _pComponent.on_fire_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousewheel && this.onmousewheel._has_handlers)
        {
            var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
            return this.onmousewheel._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire 
    _pComponent.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousewheel && this.onmousewheel._has_handlers)
        {
            var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
            return this.onmousewheel._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire  
    _pComponent.on_fire_user_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousewheel && this.onmousewheel._has_handlers)
        {
            var evt = new nexacro.MouseWheelEventInfo(this, "onmousewheel", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, wheelDeltaY, from_comp, from_refer_comp);
            return this.onmousewheel._fireUserEvent(this, evt);
        }
        return false;
    };
    // onmousewheel end
    //-----------------------------------------------------------------------------------------------------------------------------------


    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondrag 
    // normal 
    _pComponent.on_fire_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp)
    {
        if (this.ondrag && this.ondrag._has_handlers)
        {
            var dragData = this._getDragData();
            var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return [this.ondrag._fireEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
        }
        return [false];
    };

    // sys event fire 
    _pComponent.on_fire_sys_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp)
    {
        if (this.ondrag && this.ondrag._has_handlers)
        {
            var dragData = this._getDragData();
            var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return [this.ondrag._fireSysEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
        }
        return [false];
    };

    // user event fire  
    _pComponent.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp)
    {
        if (this.ondrag && this.ondrag._has_handlers)
        {
            var dragData = this._getDragData();
            var evt = new nexacro.DragEventInfo(this, "ondrag", dragData, null, this, self_refer_comp, from_comp, refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
        }
        return [false];
    };
    // ondrag end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondrop 
    // normal 
    _pComponent.on_fire_ondrop = function (src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondrop && this.ondrop._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondrop._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire 
    _pComponent.on_fire_sys_ondrop = function (src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondrop && this.ondrop._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondrop._fireSysEvent(this, evt);
        }
        return false;
    };

    //user event fire  
    _pComponent.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondrop && this.ondrop._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondrop", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondrop._fireUserEvent(this, evt);
        }
        return false;
    };
    // ondrop end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondragenter
    // normal 
    _pComponent.on_fire_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragenter && this.ondragenter._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragenter._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire 
    _pComponent.on_fire_sys_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragenter && this.ondragenter._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragenter._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire  
    _pComponent.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragenter && this.ondragenter._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragenter", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragenter._fireUserEvent(this, evt);
        }
        return false;
    };
    // ondragenter end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondragleave
    // normal
    _pComponent.on_fire_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragleave && this.ondragleave._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragleave._fireEvent(this, evt);
        }
        return false;
    };
    // sys event fire
    _pComponent.on_fire_sys_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragleave && this.ondragleave._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragleave._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragleave && this.ondragleave._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragleave", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragleave._fireUserEvent(this, evt);
        }
        return false;
    };
    // ondragleave end
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondragmove 
    // normal
    _pComponent.on_fire_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragmove && this.ondragmove._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragmove._fireEvent(this, evt);
        }
        return false;
    };

    // sys event fire
    _pComponent.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragmove && this.ondragmove._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragmove._fireSysEvent(this, evt);
        }
        return false;
    };

    // user event fire 
    _pComponent.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragmove && this.ondragmove._has_handlers)
        {
            var evt = new nexacro.DragEventInfo(this, "ondragmove", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            return this.ondragmove._fireUserEvent(this, evt);
        }
        return false;
    };
    // ondragmove end
    //-----------------------------------------------------------------------------------------------------------------------------------


    _pComponent.on_fire_onmove = function (left, top)
    {
        if (this.onmove && this.onmove._has_handlers)
        {
            var evt = new nexacro.MoveEventInfo(this, "onmove", left, top);
            return this.onmove._fireEvent(this, evt);
        }
        return false;
    };
    _pComponent.on_fire_onsize = function (width, height)
    {
        if (this.onsize && this.onsize._has_handlers)
        {
            var evt = new nexacro.SizeEventInfo(this, "onsize", width, height);
            return this.onsize._fireEvent(this, evt);
        }
        return false;
    };

	//-----------------------------------------------------------------------------------------------------------------------------------
	// oncontextmenu
    _pComponent.on_fire_oncontextmenu = function (from_comp, from_refer_comp)
    {
    	if (this.oncontextmenu && this.oncontextmenu._has_handlers)
    	{
    		var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
    		return this.ontouchstart._fireEvent(this, evt);
    	}
    	return false;
    };

    _pComponent.on_fire_user_oncontextmenu = function (from_comp, from_refer_comp)
    {
    	if (this.oncontextmenu && this.oncontextmenu._has_handlers)
    	{
    		var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
    		return this.oncontextmenu._fireUserEvent(this, evt);
    	}
    	return false;
    };
    _pComponent.on_fire_sys_oncontextmenu = function (from_comp, from_refer_comp)
    {
    	if (this.oncontextmenu && this.oncontextmenu._has_handlers)
    	{
    		var evt = new nexacro.ContextMenuEventInfo(this, "oncontextmenu", from_comp, from_refer_comp);
    		return this.oncontextmenu._fireSysEvent(this, evt);
    	}
    	return true;
    };

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ontouchstart
    _pComponent.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchstart && this.ontouchstart._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchstart._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {        
        if (this.ontouchstart && this.ontouchstart._has_handlers)
        {            
            var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchstart._fireUserEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchstart && this.ontouchstart._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchstart._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ontouchmove
    _pComponent.on_fire_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchmove && this.ontouchmove._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchmove._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchmove && this.ontouchmove._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchmove._fireUserEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_sys_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchmove && this.ontouchmove._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchmove._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ontouchend
    _pComponent.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchend && this.ontouchend._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchend._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchend && this.ontouchend._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchend._fireUserEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (this.ontouchend && this.ontouchend._has_handlers)
        {
            var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
            return this.ontouchend._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ontap
    _pComponent.on_fire_ontap = function () // 내부전용
    {
        return false;
    };

    // UserEvent 노출 없음
    _pComponent.on_fire_user_ontap = _pComponent.on_fire_ontap;

    _pComponent.on_fire_sys_ontap = function (elem, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        // click처리는 BasicAction으로 변경됨
        return true;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // ondbltap
    _pComponent.on_fire_ondbltap = function () // 내부전용
    {
        if (this.ondbltap && this.ondbltap._has_handlers)
        {
            var evt = new nexacro.TapEventInfo(this, "ondbltap");
            return this.ondbltap._fireEvent(this, evt);
        }
        return false;
    };

    // UserEvent 노출 없음
    _pComponent.on_fire_user_ondbltap = _pComponent.on_fire_ondbltap;

    _pComponent.on_fire_sys_ondbltap = function (elem, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        this._on_dblclick(elem, "touch", false, false, false, canvasX, canvasY, screenX, screenY);
        return true;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onpinchstart
    _pComponent.on_fire_onpinchstart = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onpinchstart = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onpinchstart = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        if (this.onpinchstart && this.onpinchstart._has_handlers)
        {
            var evt = new nexacro.PinchEventInfo(this, "onpinchstart", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
            return this.onpinchstart._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onpinch
    _pComponent.on_fire_onpinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onpinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onpinch = function (elem, touchinfos, accvalue, deltavalue, firstrange, currange, from_comp, from_refer_comp)
    {
        if (this instanceof nexacro.Form)
        {
            if (this._is_popup_control)
                return true;            

            if (this.parent && this.parent instanceof nexacro.ChildFrame)
            {
                // autofit 처리시에는 zoommin,zoommax 값의 처리기준을 
                // autofit 처리된 zoom값을 100으로 판단해야 함.

                // autofit zoom = 150 이면
                // min=100, max=200 일때 실제 적용 비율은 150 to 300.
                var zoom_amount = Math.abs(deltavalue) / (currange - firstrange);
                var zoom_dir = deltavalue > 0 ? 1 : -1;
                var zoom_delta = (1.0 + (zoom_dir * zoom_amount));
                //trace("zoom_delta", zoom_dir,zoom_amount);
                var zoom_factor = this._getZoom() || 100;
                //if (zoom_factor > 100000)                 zoom_factor = 100;
                var before_zoom = zoom_factor;

                zoom_factor = zoom_factor * zoom_delta;
                //trace("d =", deltavalue, "f = ", firstrange, "zd = ", zoom_delta, "bf = ",before_zoom,"zf =", zoom_factor);

                if (!nexacro._allow_default_pinchzoom)
                {
                    // 웹브라우저 PinchZoom을 쓰지 않는 경우에 한하여
                    // ScreenInfo에 Zoom min/max를 명시한 경우 Zoom 수치를 제한함.
                    // 음수값을 넣을 경우 무제한
                	var current_screen = nexacro._getCurrentScreenID();
                    if (current_screen)
                    {
                        var autofitted_zoom_factor = 100;
                        if (this._autofittedZoomFactor !== undefined)
                            autofitted_zoom_factor = this._autofittedZoomFactor;

                        //var min = current_screen._zoommin * 100 * autofitted_zoom_factor / 100;
                        //var max = current_screen._zoommax * 100 * autofitted_zoom_factor / 100;

                        var min = nexacro._minimum_scale * 100 * autofitted_zoom_factor / 100;
                        var max = nexacro._maximum_scale * 100 * autofitted_zoom_factor / 100;

                        // 같은값 또는 뒤집힌 값인 경우 처리하지 않음.
                        if (min !== undefined && max !== undefined && min >= max)
                            return true;

                        if (min != undefined && min >= 0 && zoom_factor < min)
                            zoom_factor = min;

                        if (max != undefined && max >= 0 && zoom_factor > max)
                            zoom_factor = max;
                    }
                }
                //trace(deltavalue, firstrange, currange, zoom_delta, before_zoom, zoom_factor);
                // MainForm을 Zoom처리하고 끝
                this._on_zoom(zoom_factor, this, from_refer_comp);
                return true;
            }
        }
        
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onpinchend
    _pComponent.on_fire_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        if (this.onpinchend && this.onpinchend._has_handlers)
        {
            var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
            return this.onpinchend._fireEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_user_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        if (this.onpinchend && this.onpinchend._has_handlers)
        {
            var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
            return this.onpinchend._fireUserEvent(this, evt);
        }
        return false;
    };

    _pComponent.on_fire_sys_onpinchend = function (elem, touchinfos, accvalue, deltavalue, from_comp, from_refer_comp)
    {
        if (this.onpinchend && this.onpinchend._has_handlers)
        {
            var evt = new nexacro.PinchEventInfo(this, "onpinchend", touchinfos, accvalue, deltavalue, from_comp, from_refer_comp);
            return this.onpinchend._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onflingstart
    _pComponent.on_fire_onflingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
       return false;
    };

    _pComponent.on_fire_user_onflingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onflingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        // Slide Scroll의 연장선이기때문에 따로 대상을 검색할 필요가 없다. 버블중단
        if (fling_handler)
        return true;

        // for new TouchGestureManager
        return this.on_fire_sys_onfling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onfling
    _pComponent.on_fire_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        if (fling_handler)
        {
        if (fling_handler._scroll_comp == this)
        {
            // 스크롤 처리 .. -> FlingHandler._on_fling_timer
            fling_handler._proc_scroll = true;
            return true;
        }
            return false;
        }

        // for new TouchGestureManager
        // 없으면 this가 스크롤 가능한 대상인지 검사
        var can_hscroll = false;
        var can_vscroll = false;

        var can_scrollable = this._getScrollable();
        can_hscroll = (can_scrollable && (this.dragscrolltype != "none" && this.dragscrolltype != "vert") && xdeltavalue != 0);
        can_vscroll = (can_scrollable && (this.dragscrolltype != "none" && this.dragscrolltype != "horz") && ydeltavalue != 0);

        // ScrollMode 확정 (0:none, 1:vert, 2:horz, 3:both)
        var scroll_mode = 0;
        if (this.dragscrolltype == "all" && (can_hscroll || can_vscroll))
            scroll_mode = 3;
        else if (can_hscroll && can_vscroll)
        {
            if (Math.abs(ydeltavalue) < Math.abs(xdeltavalue))
                scroll_mode = 2;
            else
                scroll_mode = 1;
        }
        else if (can_hscroll)
            scroll_mode = 2;
        else if (can_vscroll)
            scroll_mode = 1;

        if (this.selectscrollmode != undefined)
        {
            var select_mode;

            if (this.selectscrollmode == "default")
                select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
            else
                select_mode = this.selectscrollmode;

            if (select_mode == "select")
                scroll_mode = 0;
        }

        if (scroll_mode > 0)
        {
            if (scroll_mode == 1 || scroll_mode != 3)
                xdeltavalue = 0;
            else if (scroll_mode == 2 || scroll_mode != 3)
                ydeltavalue = 0;

            if (xdeltavalue != 0 || ydeltavalue != 0)
            {
                this.scrollBy(-xdeltavalue, -ydeltavalue, touchlen);
            }

            if (xdeltavalue != 0 && ydeltavalue != 0)
            {
                if (this._is_bubble_fling_v && this._is_bubble_fling_h)
                    return false;
            }
            else if (xdeltavalue != 0)
            {
                if (this._is_bubble_fling_h)
                    return false;
            }
            else if (ydeltavalue != 0)
            {
                if (this._is_bubble_fling_v)
                    return false;
            }
            return true;
        }

        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onflingend
    _pComponent.on_fire_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onflingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        // 하는 일 없음
        if (fling_handler)
        return false;

        // for new TouchGestureManager
        return this.on_fire_sys_onfling(elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onlongpress
    _pComponent.on_fire_onlongpress = function (elem, touchinfos, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onlongpress = function (elem, touchinfos, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onlongpress = function (elem, touchinfos, from_comp, from_refer_comp)
    {
        if (this.onlongpress && this.onlongpress._has_handlers)
        {
            var evt = new nexacro.LongPressEventInfo(this, "onlongpress", touchinfos, from_comp, from_refer_comp);
            return this.onlongpress._fireSysEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onslidestart
    _pComponent.on_fire_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        /*if (this.onslidestart && this.onslidestart._has_handlers)
        {
            var evt = new nexacro.SlideEventInfo(this, "onslidestart", touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
            return this.onslidestart._fireSysEvent(this, evt);
        }*/
        return this.on_fire_sys_onslide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, true);
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onslide
    _pComponent.on_fire_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, start)
    {
        if (nexacro._cur_track_info)
        {
            if (nexacro._cur_track_info.target._no_slide_scroll == true)
                return true;
        }

        //if (!this.hscrollbar && !this.vscrollbar)
        //    return false;

        // 현재 TouchManager가 Slide Scroll중인 컴포넌트가 있는가?
        var scroll_comp = touch_manager._scroll_comp;
        var scroll_mode = touch_manager._scroll_mode;

        if (scroll_comp)
        {
            if (scroll_comp != this)
                return false;
        }
        else
        {
            // 없으면 this가 스크롤 가능한 대상인지 검사
            var can_hscroll = false;
            var can_vscroll = false;

            var can_scrollable = this._getScrollable();
            can_hscroll = (can_scrollable && (this.dragscrolltype != "none" && this.dragscrolltype != "vert") && xdeltavalue != 0);
            can_vscroll = (can_scrollable && (this.dragscrolltype != "none" && this.dragscrolltype != "horz") && ydeltavalue != 0);

            // Check Horz
            /*if (xdeltavalue != 0 && this.hscrollbar && this.hscrollbar.enable &&
                (this.dragscrolltype != "none" && this.dragscrolltype != "vert"))
            {
                        can_hscroll = true;
                }

            // Check Vert
            if (ydeltavalue != 0 && this.scrolltype != "none" && this.scrolltype != "horizontal" &&
                (this.dragscrolltype != "none" && this.dragscrolltype != "horz"))
            {
                        can_vscroll = true;
                }
            }*/

            // ScrollMode 확정 (0:none, 1:vert, 2:horz, 3:both)
            if (this.dragscrolltype == "all" && (can_hscroll || can_vscroll))
            {
                scroll_mode = 3;
            }
            else if (can_hscroll && can_vscroll)
            {
                if (Math.abs(ydeltavalue) < Math.abs(xdeltavalue))
                {
                    scroll_mode = 2;
                }
                else
                {
                    scroll_mode = 1;
                }
            }
            else if (can_hscroll)
                scroll_mode = 2;
            else if (can_vscroll)
                scroll_mode = 1;
            else
                scroll_mode = -1;

            if (this.selectscrollmode != undefined)
            {
                var select_mode;

                if (this.selectscrollmode == "default")
                    select_mode = (nexacro._isTouchInteraction) ? "scroll" : "select";
                else
                    select_mode = this.selectscrollmode;

                if (select_mode == "select")
                    scroll_mode = 0;
            }

            if (scroll_mode > 0)
            {
                scroll_comp = this;
                touch_manager._scroll_end = false;
                touch_manager._scroll_comp = this;
                touch_manager._scroll_mode = scroll_mode;
            }
            else
                return false;
        }

        // check Scale
        if (this._getZoom)
        {
            var zoom_factor = this._getZoom();
            if (zoom_factor != 100)
            {
                xdeltavalue /= (zoom_factor / 100.0);
                ydeltavalue /= (zoom_factor / 100.0);
            }
        }


        var hscroll_pos = this._hscroll_pos;
        var vscroll_pos = this._vscroll_pos;

        // TODO X,Y 동시에 스크롤 가능한 인터페이스 필요 - 현재 대각선 스크롤시 계단모양으로 스크롤됨
        /*
        if (scroll_mode == 1 || scroll_mode != 3)
            xdeltavalue = 0;
        else if (scroll_mode == 2 || scroll_mode != 3)
            ydeltavalue = 0;

        if (xdeltavalue != 0 || ydeltavalue != 0)
        {
            this.scrollBy(-xdeltavalue, -ydeltavalue);
        }
        */
        if ((scroll_mode == 3 || scroll_mode == 2) && xdeltavalue != 0)
        {
            hscroll_pos -= xdeltavalue;
        }

        if ((scroll_mode == 3 || scroll_mode == 1) && ydeltavalue != 0)
        {
            vscroll_pos -= ydeltavalue;
        }

        var old_vpos = this._vscroll_pos;
        var old_hpos = this._hscroll_pos;

        //nexacro._nexacroconsole(this._hscroll_pos + ":" + this._vscroll_pos + ", " + hscroll_pos + ":" + vscroll_pos + ", " + xdeltavalue + ":" + ydeltavalue, 400, 800);
        this._scrollTo(hscroll_pos, vscroll_pos, true, false, undefined, "slide");
        var new_vpos = this._vscroll_pos;
        var new_hpos = this._hscroll_pos;
        
        if (start)
        {
            this._is_bubble_fling_v = false;
            this._is_bubble_fling_h = false;

            if (xdeltavalue != 0 && ydeltavalue != 0)
            {
                if (old_vpos == new_vpos && old_hpos == new_hpos)
                {
                    this._is_bubble_fling_v = true;
                    this._is_bubble_fling_h = true;
                }
                else if (old_hpos == new_hpos)
                {
                    this._is_bubble_fling_h = true;
                }
                else if (old_vpos == new_vpos)
                {
                    this._is_bubble_fling_v = true;
                }
            }
            else if (xdeltavalue != 0)
            {
                if (old_hpos == new_hpos)
                {
                    this._is_bubble_fling_h = true;
                }
            }
            else if (ydeltavalue != 0)
            {
                if (old_vpos == new_vpos)
                {
                    this._is_bubble_fling_v = true;
                }
            }
        }

        return true;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onslideend
    _pComponent.on_fire_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        return this.on_fire_sys_onslide(elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp, false);
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onzoom
    _pComponent.on_fire_onzoom = function (zoomfactor, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_user_onzoom = function (zoomfactor, from_comp, from_refer_comp)
    {
        return false;
    };

    _pComponent.on_fire_sys_onzoom = function (zoomfactor, from_comp, from_refer_comp)
    {
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------------------------------------------------
    // onorientationchange
    _pComponent.on_fire_onorientationchange = function (orientation)
    {
        if (this.onorientationchange && this.onorientationchange._has_handlers)
        {
            var evt = new nexacro.OrientationChangeEventInfo(this, "onorientationchange", orientation);
            return this.onorientationchange._fireEvent(this, evt);
        }
        return false;
    };
    //-----------------------------------------------------------------------------------------------------------------------------------

       delete _pComponent;
}

