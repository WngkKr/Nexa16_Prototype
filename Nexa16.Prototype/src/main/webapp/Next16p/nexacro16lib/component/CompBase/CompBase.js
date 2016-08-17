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

if (!nexacro.Component)
{
    "use strict";

    var _process = true;

    //==============================================================================
    // Position , Position2 : 
    //==============================================================================
    nexacro.__position9xObj = function (target)
    {
        if (target) this._target = target;

        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;

        this._value = "absolute 0 0 0 0";
    };

    __pPosition9xObj = nexacro._createPrototype(nexacro.Object, nexacro.__position9xObj);
    nexacro.__position9xObj.prototype = __pPosition9xObj;

    __pPosition9xObj.style = "absolute";
    __pPosition9xObj.x = 0;
    __pPosition9xObj.y = 0;

    __pPosition9xObj._bsize = false;
    __pPosition9xObj._bmove = false;

    // override for value
    __pPosition9xObj.toString = function ()
    {
        return this._value;
    };

    // clear Object
    __pPosition9xObj._emptyObject = function ()
    {
        this._value = "absolute 0 0 0 0";
        this.style = "absolute";
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    };

    __pPosition9xObj._updateValue = function ()
    {
        this.width = this.right - this.left;
        this.height = this.bottom - this.top;

        this.x = this.left;
        this.y = this.top;

        this._value = "absolute " + this.left + ' ' + this.top + ' ' + this.right + ' ' + this.bottom;
    };

    // setters
    __pPosition9xObj._update = function ()
    {
        this.width = this.right - this.left;
        this.height = this.bottom - this.top;

        this.x = this.left;
        this.y = this.top;

        var str = "absolute " + this.left + ' ' + this.top + ' ' + this.right + ' ' + this.bottom;

        if (str != this._value)
        {
            this._value = str;
            if (this._target != null)
            {
                var pcontrol_element = this._target.parent.getElement();
                var pclient_width = pcontrol_element ? pcontrol_element._client_width : 0;
                var pclient_height = pcontrol_element ? pcontrol_element._client_height : 0;
                this._target._adjustPosition(this.left, this.top, null, null, this.width, this.height, pclient_width, pclient_height);
                this._target.on_update_position(this._bsize, this._bmove);
                this._bsize = false;
                this._bmove = false;
            }
        }
    };

    __pPosition9xObj._set = function (v)
    {
        var val = (v == null) ? "" : v.toString().trim();
        if (val != this._value)
        {
            if (val == "")
            {
                this._emptyObject();
            }
            else
            {
                var valarr = val.split(/\s+/);
                switch (valarr.length)
                {
                    case 4:
                        this.left = parseInt(valarr[0]) | 0;
                        this.top = parseInt(valarr[1]) | 0;
                        this.right = parseInt(valarr[2]) | 0;
                        this.bottom = parseInt(valarr[3]) | 0;
                        break;
                    case 5:
                        this.left = parseInt(valarr[1]) | 0;
                        this.top = parseInt(valarr[2]) | 0;
                        this.right = parseInt(valarr[3]) | 0;
                        this.bottom = parseInt(valarr[4]) | 0;
                        break;
                    default:
                        this._emptyObject();
                        break;
                }
                this._update();
            }
        }
    };

    __pPosition9xObj.set_style = function (v)
    {
        if (v != this.style)
        {
            if (v == "absolute")
            {
                this.style = "absolute";
            }
        }
    };

    __pPosition9xObj.set_left = function (v)
    {
        var val = parseInt(v) | 0;

        if (val > this.right)
        {
            this.right = val;
        }

        if (val != this.left)
        {
            this.left = val;
            this._bmove = true;
            this._bsize = true;
            this._update();
        }
    };

    __pPosition9xObj.set_top = function (v)
    {
        var val = parseInt(v) | 0;

        if (val > this.bottom)
        {
            this.bottom = val;
        }

        if (val != this.top)
        {
            this.top = val;
            this._bmove = true;
            this._bsize = true;
            this._update();
        }
    };

    __pPosition9xObj.set_right = function (v)
    {
        var val = parseInt(v) | 0;

        if (this.left > val)
        {
            this.left = val;
        }
        if (val != this.right)
        {
            this.right = val;
            this._bsize = true;
            this._update();
        }
    };

    __pPosition9xObj.set_bottom = function (v)
    {
        var val = parseInt(v) | 0;

        if (this.top > val)
        {
            this.top = val;
        }

        if (val != this.bottom)
        {
            this.bottom = val;
            this._bsize = true;
            this._update();
        }
    };
    __pPosition9xObj.set_x = function (v)
    {
        var val = parseInt(v) | 0;
        if (val != this.left)
        {
            this.left = val;
            this.right = this.left + this.width;
            this._bsize = true;
            this._bmove = true;
            this._update();
        }
    };

    __pPosition9xObj.set_y = function (v)
    {
        var val = parseInt(v) | 0;
        if (val != this.top)
        {
            this.top = val;
            this.bottom = this.top + this.height;
            this._bsize = true;
            this._bmove = true;
            this._update();
        }
    };

    __pPosition9xObj.set_width = function (v)
    {
        if (v < 0) v = 0;
        var val = this.left + (parseInt(v) | 0);
        if (val != this.right)
        {
            this.right = val;
            this._bsize = true;
            this._update();
        }
    };
    __pPosition9xObj.set_height = function (v)
    {
        if (v < 0) v = 0;
        var val = this.top + (parseInt(v) | 0);
        if (val != this.bottom)
        {
            this.bottom = val;
            this._bsize = true;
            this._update();
        }
    };

    delete __pPosition9xObj;



    nexacro.__position29xObj = function (target)
    {
        if (target) this._target = target;

        this._value = "absolute l:0 w:0 t:0 h:0";
    };

    __pPosition29xObj = nexacro._createPrototype(nexacro.Object, nexacro.__position29xObj);
    nexacro.__position29xObj.prototype = __pPosition29xObj;

    __pPosition29xObj.style = "absolute";
    __pPosition29xObj.left = null;
    __pPosition29xObj.right = null;
    __pPosition29xObj.top = null;
    __pPosition29xObj.bottom = null;
    __pPosition29xObj.width = null;
    __pPosition29xObj.height = null;

    __pPosition29xObj._bsize = false;
    __pPosition29xObj._bmove = false;

    // override for value
    __pPosition29xObj.toString = function ()
    {
        return this._value;
    };

    __pPosition29xObj._emptyObject = function ()
    {
        this._value = "absolute l:0 t:0 w:0 h:0";
        this.style = "absolute";
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.width = null;
        this.height = null;
    };

    __pPosition29xObj._updateValue = function ()
    {
        var l = this.left, r = this.right, t = this.top, b = this.bottom, w = this.width, h = this.height;
        var valarr = [];
        var idx = 0;

        if (l != undefined) valarr[idx++] = "l:" + l;
        if (r != undefined) valarr[idx++] = "r:" + r;
        if (w != undefined) valarr[idx++] = "w:" + w;
        if (t != undefined) valarr[idx++] = "t:" + t;
        if (b != undefined) valarr[idx++] = "b:" + b;
        if (h != undefined) valarr[idx++] = "h:" + h;

        this._value = "absolute " + valarr[0] + ' ' + valarr[1] + ' ' + valarr[2] + ' ' + valarr[3];
    };

    __pPosition29xObj.set_left = function (v)
    {
        if (this.left != v)
        {
            this.left = v;
            this._target.set_left(v);
        }
    };

    __pPosition29xObj.set_top = function (v)
    {
        if (this.top != v)
        {
            this.top = v;
            this._target.set_top(v);
        }
    };

    __pPosition29xObj.set_right = function (v)
    {
        if (this.right != v)
        {
            this.right = v;
            this._target.set_right(v);
        }
    };

    __pPosition29xObj.set_bottom = function (v)
    {
        if (this.bottom != v)
        {
            this.bottom = v;
            this._target.set_bottom(v);
        }
    };

    __pPosition29xObj.set_width = function (v)
    {
        if (this.width != v)
        {
            this.width = v;
            this._target.set_width(v);
        }
    };

    __pPosition29xObj.set_height = function (v)
    {
        if (this.height != v)
        {
            this.height = v;
            this._target.set_height(v);
        }
    };

    delete __pPosition29xObj;
    //------------------------------------------------------------------------------
    // migrator used end


    //==============================================================================
    // nexacro.Component : nexacro Component's basic flags & Utility Functions
    //==============================================================================

    nexacro.Component = function (id, position, left, top, width, height, right, bottom, parent)
    {
        this.id = this.name = id || null;

        if (parent)
        {
            this.parent = parent;
            this._refform = this._findForm(parent); // for control
            this._unique_id = parent._unique_id ? (parent._unique_id + "." + this.id) : (this.id ? this.id : "");
        }
        else
        {
            this.parent = parent;
            //this._refform = null;
            this._unique_id = (this.id ? this.id : "");
        }

        this.position = position ? position : "absolute";

        var parent_width = parent ? this.parent._adjust_width : null;
        var parent_height = parent ? this.parent._adjust_height : null;

        // position base
        this._based_list = []; //자신을 base로 가지고 있는 component들의 list
        this._cross_ref = false; // 순환참조 여부
        this._cross_base = false; // 순환지정 여부

        this._adjustPosition(left, top, right, bottom, width, height, parent_width, parent_height);
        this._makeStatusMap();

    };

    var _pComponent = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.Component);
    nexacro.Component.prototype = _pComponent;
    // overide nexacro.Object
    _pComponent._type_name = "Component";
    _pComponent._statusmap = null;
    _pComponent._userstatusmap = null;
    //==== defaule values =========
    // property
    _pComponent.expr = "";
    _pComponent.cssclass = "";
    _pComponent.visible = true;
    _pComponent.enable = true;
    _pComponent.taborder = "";
    _pComponent.tabstop = true;
    _pComponent.hotkey = "";
    _pComponent.transparenthittest = false;
    _pComponent.enableredraw = true;
    _pComponent.enableevent = true;
    _pComponent.tooltiptype = "default";
    _pComponent.tooltiptext = "";
    
    _pComponent.scrollbartype = undefined;
    _pComponent.scrolltype = "both";
    _pComponent.scrollbarsize = undefined;
    _pComponent.scrollindicatorsize = undefined;

    _pComponent.hscrollbar = null;
    _pComponent.vscrollbar = null;

    _pComponent._default_scrollbarsize = 17;
    _pComponent._default_scrollindicatorsize = 6;

    if (nexacro._isTouchInteraction && nexacro._SupportTouch)
    {
        _pComponent._default_scrollbartype = "autoindicator";
    }
    else
    {
        _pComponent._default_scrollbartype = "auto";
    }
    
    _pComponent.hotkey = null;
    _pComponent.rtldirection = null;	//2014.03.31 rtl layout start;
    _pComponent.positionstep = 0;
    _pComponent._displaytext = "";

    _pComponent.accessibilityrole = "";
    _pComponent.accessibilityenable = true;
    _pComponent.accessibilitylabel = "";
    _pComponent.accessibilitydescription = "";
    _pComponent.accessibilityaction = "";
    _pComponent.accessibilitydesclevel = "all";

    // container size - control size + padding size
    /*	_pComponent._client_left = 0;
        _pComponent._client_top = 0;
        _pComponent._client_width = 0;
        _pComponent._client_height = 0;
        */
    _pComponent._adjust_left = -1;
    _pComponent._adjust_top = -1;
    _pComponent._adjust_width = -1;
    _pComponent._adjust_height = -1;

    _pComponent._client_left_ltr = 0;
    _pComponent._adjust_left_ltr = -1;

    // status
    _pComponent._is_loading = false;
    _pComponent._is_created = false;
    _pComponent._is_alive = true;
    //_pComponent._status = "enabled";
    _pComponent._selected = false;    
    
    _pComponent._is_created_contents = false;
    _pComponent._has_dirty_pos = false;
    _pComponent._has_dirty_rect = false;

	// status
    _pComponent._use_pushed_status = false;
    _pComponent._use_selected_status = false;
    _pComponent._use_readonly_status = false;

    _pComponent._apply_client_padding = true;
	    
    _pComponent._is_component = true;
    _pComponent._is_subcontrol = false;
    _pComponent._is_form = false;
    _pComponent._is_frame = false;
    _pComponent._is_window = false;
    _pComponent._is_nc_control = false;
    _pComponent._is_simple_control = false;
    _pComponent._is_scrollable = false;
    _pComponent._is_popup_control = false;
    _pComponent._is_band_control = false;
    _pComponent._is_band_vert_paging = false;
    _pComponent._is_area_scroll = false;
    _pComponent._is_focus_accept = true;
    _pComponent._is_eventinfo_control = true;
    _pComponent._is_locale_control = false;

    _pComponent._is_container = false;      // this has a container. ex) Div, PopupDiv, Tabpage...
    _pComponent._is_containerset = false;   // this has containers. ex) Tab

    // for css status
    _pComponent._is_initcssselector = false;
    _pComponent._oldstatus = "";
    _pComponent._status = "";
    _pComponent._olduserstatus = "";
    _pComponent._userstatus = "";

    // etc
    _pComponent._control_element = null;
    _pComponent._bind_event = null;
    _pComponent._taborder = -1;

    _pComponent._real_enable = null;
    _pComponent._real_visible = false;
    _pComponent._last_focused = null;
    _pComponent._hotkey = null;
    _pComponent._track_capture = true;
    _pComponent._focus_direction = -1;
    _pComponent._rtldirection = undefined;
    _pComponent._re_focus = false;


    // for style
    _pComponent.color = "";
    _pComponent.font = "";
    _pComponent.lineHeight = "";
    _pComponent.wordSpacing = "";
    _pComponent.letterSpacing = "";
    _pComponent.textDecoration = "";
    _pComponent.wordWrap = "";

    _pComponent.borderRadius = "";
    _pComponent.border = "";
    _pComponent.background = "";
    _pComponent.edge = "";

    _pComponent.cursor = "";
    _pComponent.opacity = "";
    _pComponent.boxShadow = "";

    _pComponent.margin = "";
    _pComponent.padding = "";
    _pComponent.textAlign = "";
    _pComponent.verticalAlign = "";

    _pComponent._color = null;
    _pComponent._font = null;
    _pComponent._lineheight = null;
    _pComponent._wordspacing = null;
    _pComponent._letterspacing = null;
    _pComponent._textdecoration = null;   
    _pComponent._borderradius = null;
    _pComponent._border = null;
    _pComponent._background = null;
    _pComponent._edge = null;
    _pComponent._cursor = null;
    _pComponent._opacity = null;
    _pComponent._boxshadow = null; 
    _pComponent._padding = null;
    
	// for scrollbar
    _pComponent._vscrollbartype = undefined;
    _pComponent._hscrollbartype = undefined;
    _pComponent._hscroll_pos = 0;
    _pComponent._vscroll_pos = 0;
    _pComponent._hscrollbar_id = "hscrollbar";
    _pComponent._vscrollbar_id = "vscrollbar";
    _pComponent._hscrollindicator_id = "hscrollindicator";
    _pComponent._vscrollindicator_id = "vscrollindicator";

    _pComponent._scroll_top = 0;
    _pComponent._scroll_left = 0;
    _pComponent._scroll_height = 0;
    _pComponent._scroll_default_value = 30;

    _pComponent._use_translate_move = false;
    _pComponent._use_container_move = true;
    // for event
    _pComponent._event_list = {
        "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
        "oninput": 1, "onkeydown": 1, "onkeyup": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmousedown": 1, "onmouseup": 1, 
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onmove": 1, "onsize": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1        
    };



    //==== end of initial =========//

    _pComponent.initProperties = function () { };
    _pComponent.initEvents = function () { };
    _pComponent._resizePopupInbound = nexacro._emptyFn;

    //===============================================================
    // nexacro.Component Style Part
    //===============================================================
    // default styles

    //nexacro.Component._default_font = nexacro.FontObject("9pt Dotum");
    //nexacro.Component._wait_cursor = nexacro.CursorObject("wait");

    //---------------------------------------------------------------
    // Component's basic Pseudo Control Part
    //---------------------------------------------------------------

    // 사용자 입력 정보의 pixel화 
    _pComponent._width = null;
    _pComponent._height = null;
    _pComponent._left = null;
    _pComponent._top = null;
    _pComponent._right = null;
    _pComponent._bottom = null;

    // get의 목적으로의 property 값의 유지
    _pComponent.left = null;
    _pComponent.top = null;
    _pComponent.right = null;
    _pComponent.bottom = null;
    _pComponent.width = null;
    _pComponent.height = null;

    // position base
    _pComponent.leftbase = null;
    _pComponent.topbase = null;
    _pComponent.rightbase = null;
    _pComponent.bottombase = null;
    _pComponent.widthbase = null;
    _pComponent.heightbase = null;

    _pComponent.minwidth = null;
    _pComponent.maxwidth = null;
    _pComponent.minheight = null;
    _pComponent.maxheight = null;

    _pComponent._leftbase_component_id = null;
    _pComponent._topbase_component_id = null;
    _pComponent._rightbase_component_id = null;
    _pComponent._bottombase_component_id = null;

    _pComponent._widthbase_component_id = null;
    _pComponent._heightbase_component_id = null;

    _pComponent._leftbase_position_type = null;
    _pComponent._topbase_position_type = null;
    _pComponent._rightbase_position_type = null;
    _pComponent._bottombase_position_type = null;

    _pComponent._minwidth = null;
    _pComponent._maxwidth = null;
    _pComponent._minheight = null;
    _pComponent._maxheight = null;

    _pComponent._getAutoWidth = function () { };
    _pComponent._getAutoHeight = function () { };


    // only migrator convert
    _pComponent.__setPosition9x = function (val)
    {
        if (val.indexOf(":") >= 0)
        {
            // position2 type
            var valarr = val.split(/\s+/);
            var i = 0;
            var v = "", prestr = "";
            var idx = 0;

            var pos = { left: null, top: null, right: null, bottom: null, width: null, height: null };

            var old_left = this._adjust_left;
            var old_top = this._adjust_top;
            var old_width = this._adjust_width;
            var old_height = this._adjust_height;
            var bsize = false, bmove = false;

            this.position = "absolute";

            if (valarr.length == 5)
            {
                this.position = valarr[0];
                i = 1;
            }

            for (i ; i < valarr.length ; i++)
            {
                v = valarr[i].toString();

                idx = v.indexOf(":");
                prestr = v.substring(0, idx);
                v = v.substring(idx + 1);

                switch (prestr)
                {
                    case "l":
                        pos.left = v;
                        break;
                    case "t":
                        pos.top = v;
                        break;
                    case "r":
                        pos.right = v;
                        break;
                    case "b":
                        pos.bottom = v;
                        break;
                    case "w":
                        pos.width = v;
                        break;
                    case "h":
                        pos.height = v;
                        break;
                }
            }
            //pos._value = val;
            var pcontrol_element = this.parent.getElement();
            var pclient_width = pcontrol_element ? pcontrol_element._getClientWidth() : 0;
            var pclient_height = pcontrol_element ? pcontrol_element._getClientHeight() : 0;
            this._adjustPosition(pos.left, pos.top, pos.right, pos.bottom, pos.width, pos.height, pclient_width, pclient_height);
        }
        else
        {
            // position type
            var valarr = val.split(/\s+/);

            var pos = { left: 0, top: 0, right: 0, bottom: 0 };
            var old_left = this._adjust_left;
            var old_top = this._adjust_top;
            var old_width = this._adjust_width;
            var old_height = this._adjust_height;
            var bsize = false, bmove = false;

            switch (valarr.length)
            {
                case 4:
                    this.position = "absolute";
                    pos.left = (parseInt(valarr[0]) | 0);
                    pos.top = (parseInt(valarr[1]) | 0);
                    pos.right = (parseInt(valarr[2]) | 0);
                    pos.bottom = (parseInt(valarr[3]) | 0);
                    break;
                case 5:
                    this.position = (parseInt(valarr[0]) || "absolute");
                    pos.left = (parseInt(valarr[1]) | 0);
                    pos.top = (parseInt(valarr[2]) | 0);
                    pos.right = (parseInt(valarr[3]) | 0);
                    pos.bottom = (parseInt(valarr[4]) | 0);
                    break;
                default:
                    this.position = "absolute";
                    pos.left = 0;
                    pos.top = 0;
                    pos.right = 0;
                    pos.bottom = 0;
                    break;
            }
            var w = pos.right - pos.left;
            var h = pos.bottom - pos.top;

            var pcontrol_element = this.parent.getElement();
            var pclient_width = pcontrol_element ? pcontrol_element._getClientWidth() : 0;
            var pclient_height = pcontrol_element ? pcontrol_element._getClientHeight() : 0;
            this._adjustPosition(pos.left, pos.top, null, null, w, h, pclient_width, pclient_height);
        }

        if (this._adjust_width != old_width || this._adjust_height != old_height)
        {
            bsize = true;
        }
        if (this._adjust_left != old_left || this._adjust_top != old_top)
        {
            bmove = true;
        }

        this.on_update_position(bsize, bmove);
    };

    _pComponent.__getPosition9x = function (target)
    {
        var obj = new nexacro.__position9xObj(target);

        obj.left = this._adjust_left;
        obj.top = this._adjust_top;
        obj.right = this._adjust_left + this._adjust_width;
        obj.bottom = this._adjust_top + this._adjust_height;
        obj._updateValue();

        return obj;
    };

    _pComponent.__getPosition29x = function (target)
    {
        var obj = new nexacro.__position29xObj(target);

        obj.left = this.left;
        obj.top = this.top;
        obj.right = this.right;
        obj.bottom = this.bottom;
        obj.width = this.width;
        obj.height = this.height;
        obj._updateValue();

        return obj;
    };

    _pComponent.set_position = function (v)
    {
        if (this.position != v)
        {
            this.position = v;
        }
    };

    // frame은 override 함
    _pComponent._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight)
    {
        var val = null;
        var baseId = null;
        var baseComp = null;
        var baseWidth = null;
        var baseHeight = null;

        var form = this._getForm();

        var _left = left;
        var _right = right;

        var bRtl = this._isRtl(this.parent);
        if (bRtl)
        {
            var swap = _left;
            _left = _right;
            _right = swap;
        }

        // position base
        var this_name;
        var this_left, this_right, this_top, this_bottom;
        var base_left, base_right, base_top, base_bottom, base_width, base_height;
        var bLeftWidth, bRightWidth, bTopHeight, bBottomHeight;
        var _position_base_left, _position_base_right, _position_base_top, _position_base_bottom;
        var leftBaseComp, rightBaseComp, topBaseComp, bottomBaseComp;
        var leftWidth, rightWidth, topHeight, bottomHeight;

        this_left = this_right = this_top = this_bottom = 0;
        base_left = base_right = base_top = base_bottom = base_width = base_height = 0;
        leftBaseComp = rightBaseComp = topBaseComp = bottomBaseComp = null;
        _position_base_left = _position_base_right = _position_base_top = _position_base_bottom = null;
        leftWidth = rightWidth = topHeight = bottomHeight = 0;

        // zoom된 경우 실제 client 값은 유지하고
        // child를 정렬할때만 zoom을 반영한다. (right, % 좌표 등을 정상적으로 반영하기 위해)
        if (form && form.parent && form.parent._is_frame)
        {
            var zoom_factor = form._getZoom();
            if (zoom_factor != 100)
            {
                parentWidth = (parentWidth * 100) / zoom_factor;
                parentHeight = (parentHeight * 100) / zoom_factor;
            }
        }

        for (var i = 0; i < 6; i++)
        {
            switch (i)
            {
                case 0:
                    val = _left;
                    baseId = this._leftbase_component_id;
                    // position base : (스펙문서) %값을 지정하면 base의 width/height를 기준으로 % 처리
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.left = left;
                        this._left = val;
                    }
                    break;
                case 1:
                    val = top;
                    baseId = this._topbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.top = top;
                        this._top = val;
                    }

                    break;
                case 2:
                    val = _right;
                    baseId = this._rightbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.right = right;
                        this._right = val;
                    }
                    break;
                case 3:
                    val = bottom;
                    baseId = this._bottombase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.bottom = bottom;
                        this._bottom = val;
                    }
                    break;
                case 4:
                    val = width;
                    baseId = this._widthbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != "auto" && val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                   /* else if ((this.left == null || this.right == null) && (width == null || width == "auto"))
                    {
                        val = this._getAutoWidth();
                    }*/  //현재 auto 미지원이어서 막음
                    if (isNumber(val) || val == null)
                    {
                        this.width = width;
                        this._width = val;
                    }
                    break;
                case 5:
                    val = height;
                    baseId = this._heightbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != "auto" && val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    /*else if ((this.top == null || this.bottom == null) && (height == null || height == "auto"))
                    {
                        val = this._getAutoHeight();
                    }*///현재 auto 미지원이어서 막음
                    if (isNumber(val) || val == null)
                    {
                        this.height = height;
                        this._height = val;
                    }
                    break;
            }
        }

        // 중앙정렬 (단순)
        if (this._left === null && this._right === null && this._width)
        {
            if (this._leftbase_component_id)
            {
                leftBaseComp = this._getFormChildById(this._leftbase_component_id);
                if (this._leftbase_position_type == "left")
                {
                    base_left = leftBaseComp._adjust_left;
                }
                else
                {
                    base_left = leftBaseComp._adjust_left + leftBaseComp._adjust_width;
                }
            }
            else
            {
                base_left = form._adjust_left;
            }

            if (this._rightbase_component_id)
            {
                rightBaseComp = this._getFormChildById(this._rightbase_component_id);
                if (this._rightbase_position_type == "left")
                {
                    base_right = rightBaseComp._adjust_left;
                }
                else
                {
                    base_right = rightBaseComp._adjust_left + rightBaseComp._adjust_width;
                }
            }
            else
            {
                base_right = form._adjust_left + form._adjust_width;
            }

            base_width = base_right - base_left;
            _position_base_left = _position_base_right = base_left + (base_width - this._width) / 2; // 부모크기를 기준으로 중앙정렬
        }
        if (this._top === null && this._bottom === null && this._height)
        {
            if (this._topbase_component_id)
            {
                topBaseComp = this._getFormChildById(this._topbase_component_id);
                if (this._topbase_position_type == "top")
                {
                    base_top = topBaseComp._adjust_top;
                }
                else
                {
                    base_top = topBaseComp._adjust_top + topBaseComp._adjust_height;
                }
            }
            else
            {
                base_top = form._adjust_top;
            }

            if (this._bottombase_component_id)
            {
                bottomBaseComp = this._getFormChildById(this._bottombase_component_id);
                if (this._bottombase_position_type == "top")
                {
                    base_bottom = bottomBaseComp._adjust_top;
                }
                else
                {
                    base_bottom = bottomBaseComp._adjust_top + bottomBaseComp._adjust_height;
                }
            }
            else
            {
                base_bottom = form._adjust_top + form._adjust_height;
            }

            base_height = base_bottom - base_top;
            _position_base_top = _position_base_bottom = base_top + (base_height - this._height) / 2; // 부모크기를 기준으로 중앙정렬
        }

        //////////////////////////////////////////////////////////
        // left width 구하기
        // right width 구하기
        // 자신의 위치 구하기
		if (this._leftbase_component_id && this._left !== null)
        {
            leftBaseComp = this._getFormChildById(this._leftbase_component_id);
            this_name = this.name;
            this_left = this._left;
            while (leftBaseComp && leftBaseComp._rightbase_component_id == this_name)
            {
                this_left = Math.max(this_left, leftBaseComp._right ? leftBaseComp._right : 0);
                leftWidth += this_left + leftBaseComp._adjust_width;

                if (leftBaseComp._leftbase_component_id)
                {
                    this_name = leftBaseComp.name;
                    this_left = leftBaseComp._left;
                    leftBaseComp = leftBaseComp._getFormChildById(leftBaseComp._leftbase_component_id);
                }
                else if (leftBaseComp._left === null)
                {
                    bLeftWidth = true;
                    break;
                }
                else
                    break;
            }

            if (!bLeftWidth)
            {
                baseComp = this._getFormChildById(this._leftbase_component_id);
                this_left = this._left;
                if (this._leftbase_position_type == "right")
                {
                    if (baseComp._rightbase_component_id == this.name && baseComp._rightbase_position_type == "left")
                    {
                        this_left = Math.max(this_left, baseComp._right ? baseComp._right : 0);
                    }
                    _position_base_left = baseComp._adjust_left + baseComp._adjust_width + this_left;
                }   
                else
                {
                    _position_base_left = baseComp._adjust_left + this._left;
                }   
            }
        }

		if (this._rightbase_component_id && this._right !== null)
        {
            rightBaseComp = this._getFormChildById(this._rightbase_component_id);
            this_name = this.name;
            this_right = this._right;

            while (rightBaseComp && rightBaseComp._leftbase_component_id == this_name)
            {
                this_right = Math.max(this_right, rightBaseComp._left ? rightBaseComp._left : 0);
                rightWidth += this_right + rightBaseComp._adjust_width;

                if (rightBaseComp._rightbase_component_id)
                {
                    this_name = rightBaseComp.name;
                    this_right = rightBaseComp._right;
                    rightBaseComp = rightBaseComp._getFormChildById(rightBaseComp._rightbase_component_id);
                }
                else if (rightBaseComp._right === null)
                {
                    bRightWidth = true;
                    break;
                }
                else
                    break;
            }
            if (!bRightWidth)
            {
                baseComp = this._getFormChildById(this._rightbase_component_id);
                this_right = this._right;
                if (this._rightbase_position_type == "left")
                {
                    if (baseComp._leftbase_component_id == this.name && baseComp._leftbase_position_type == "right")
                    {
                        this_right = Math.max(this_right, baseComp._left ? baseComp._left : 0);
                    }
                    _position_base_right = baseComp._adjust_left - this_right;
                }   
                else
                {
                    _position_base_right = baseComp._adjust_left + baseComp._adjust_width - this_right;
                }   
            }
        }

		if (this._topbase_component_id && this._top !== null)
        {
            topBaseComp = this._getFormChildById(this._topbase_component_id);
            this_name = this.name;
            this_top = this._top;

            while (topBaseComp && topBaseComp._bottombase_component_id == this_name)
            {
                this_top = Math.max(this_top, topBaseComp._bottom ? topBaseComp._bottom : 0);
                topHeight += this_top + topBaseComp._adjust_height;

                if (topBaseComp._topbase_component_id)
                {
                    this_name = topBaseComp.name;
                    this_top = topBaseComp._top;
                    topBaseComp = topBaseComp._getFormChildById(topBaseComp._topbase_component_id);
                }
                else if (topBaseComp.top === null)
                {
                    bTopHeight = true;
                    break;
                }
                else
                    break;
            }
            if (!bTopHeight)
            {
                baseComp = this._getFormChildById(this._topbase_component_id);
                this_top = this._top;
                if (this._topbase_position_type == "bottom")
                {
                    if (baseComp._bottombase_component_id == this.name && baseComp._bottombase_position_type == "top")
                    {
                        this_top = Math.max(this_top, baseComp._bottom ? baseComp._bottom : 0);
                    }
                    _position_base_top = baseComp._adjust_top + baseComp._adjust_height + this_top;
                }   
                else
                {
                    _position_base_top = baseComp._adjust_top + this_top;
                }   
            }
        }

		if (this._bottombase_component_id && this._bottom !== null)
        {
            bottomBaseComp = this._getFormChildById(this._bottombase_component_id);
            this_name = this.name;
            this_bottom = this._bottom;

            while (bottomBaseComp && bottomBaseComp._topbase_component_id == this_name)
            {
                this_bottom = Math.max(this_bottom, bottomBaseComp._top ? bottomBaseComp._top : 0);
                bottomHeight += this_bottom + bottomBaseComp._adjust_height;

                if (bottomBaseComp._bottombase_component_id)
                {
                    this_name = bottomBaseComp.name;
                    this_bottom = bottomBaseComp._bottom;
                    bottomBaseComp = bottomBaseComp._getFormChildById(bottomBaseComp._bottombase_component_id);
                }
                else if (bottomBaseComp._bottom === null)
                {
                    bBottomHeight = true;
                    break;
                }
                else
                    break;
            }
            if (!bBottomHeight)
            {
                baseComp = this._getFormChildById(this._bottombase_component_id);
                this_bottom = this._bottom;
                if (this._bottombase_position_type == "top")
                {
                    if (baseComp._topbase_component_id == this.name && baseComp._topbase_position_type == "bottom")
                    {
                        this_bottom = Math.max(this_bottom, baseComp._top ? baseComp._top : 0);
                    }
                    _position_base_bottom = baseComp._adjust_top - this_bottom;
                }   
                else
                {
                    _position_base_bottom = baseComp._adjust_top + baseComp._adjust_height - this_bottom;
                }   
            }
        }

        if (bLeftWidth || bRightWidth)
        {
            if (this._width === null)
                this._width = this._adjust_width;
            _position_base_left = ((parentWidth - (leftWidth + this._width + rightWidth)) / 2) + leftWidth;
            _position_base_right = _position_base_left + this._width;
        }

        if (bTopHeight || bBottomHeight)
        {
            if (this._height === null)
                this._height = this._adjust_height;
            _position_base_top = ((parentHeight - (topHeight + this._height + bottomHeight)) / 2) + topHeight;
            _position_base_bottom = this._top + this._height;
        }

        if (this._width != null || (this._right != null && this._left != null))
        {
            this._adjust_width = this._width != null ? this._width : _position_base_right ? _position_base_right - (_position_base_left ? _position_base_left : this._left) :
                parentWidth - (_position_base_left ? _position_base_left : this._left) - this._right;

            if (this._minwidth)
            {
                if (this._adjust_width < this._minwidth) this._adjust_width = this._minwidth;
            }
            if (this._maxwidth)
            {
                if (this._adjust_width > this._maxwidth) this._adjust_width = this._maxwidth;
            }
        }

        if (this._height != null || (this._bottom != null && this._top != null))
        {
            this._adjust_height = this._height != null ? this._height : _position_base_bottom ? _position_base_bottom - (_position_base_top ? _position_base_top : this._top) :
                parentHeight - (_position_base_top ? _position_base_top : this._top) - this._bottom;

            if (this._minheight)
            {
                if (this._adjust_height < this._minheight) this._adjust_height = this._minheight;
            }
            if (this._maxheight)
            {
                if (this._adjust_height > this._maxheight) this._adjust_height = this._maxheight;
            }
        }

        if (this._left != null || this._right != null || _position_base_left != null || _position_base_right != null)
        {
            this._adjust_left_ltr = this._adjust_left = _position_base_left ? _position_base_left :
                this._left != null ? this._left : _position_base_right ? _position_base_right - this._adjust_width : parentWidth - this._right - this._adjust_width;

            if (bRtl)
            {
                this._adjust_left_ltr = _position_base_right ? _position_base_right :
                    (this._right != null ? this._right : parentWidth - (_position_base_left ? _position_base_left : this._left) - this._adjust_width);
            }
        }

        if (this.top != null || this._bottom != null || _position_base_top != null || _position_base_bottom != null)
        {
            this._adjust_top = _position_base_top ? _position_base_top :
                this._top != null ? this._top : _position_base_bottom ? _position_base_bottom - this._adjust_height : parentHeight - this._bottom - this._adjust_height;
        }

        if (this.left && this.width && this.right)
        {
            this._right = 0;
            this.right = null;
        }

        if (this.top && this.height && this.bottom)
        {
            this._bottom = 0;
            this.bottom = null;
        }
    };

    // convert to pixel
    _pComponent._convToPixel = function (val, parentsize)
    {
        if (typeof (val) == "string" && val.indexOf("%") >= 0)
        {
            //return parseInt(parentsize * (parseFloat(val) / 100));
            return parseInt((parentsize * parseFloat(val)) / 100);
        }

        return (parseInt(val) | 0);
    };

    _pComponent._setAllZeroPixel = function ()
    {
        var bmove = false,
            bsize = false;

        if (this._adjust_left != 0 || this._adjust_top != 0)
        {
            this.left = 0;
            this.top = 0;
            bmove = true;
        }
        if (this._adjust_width != 0 || this._adjust_height != 0)
        {
            this.width = 0;
            this.height = 0;
            bsize = true;
        }

        this._update_position(bsize, bmove);
    };

    _pComponent.set_left = function (propVal)
    {    
        if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal)))
            return;

        if (this.left != propVal)
        {
            this.left = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._left = null;
                if (!this._width)
                {
                    this.set_width(this._adjust_width);
                }
            }

            // right, width exist width delete
            if (!nexacro._isNull(this.left) && !nexacro._isNull(this.right) && !nexacro._isNull(this.width))
            {
                this.width = null;
                this._width = null;
            }

            this._update_position(false, true);
        }
    };

    _pComponent.set_top = function (propVal)
    {    
        if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal)))
            return;

        if (this.top != propVal)
        {
            this.top = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._top = null;
                if (!this._height)
                {
                    this.set_height(this._adjust_height);
                }
            }

            // bottom, height exist height delete
            if (!nexacro._isNull(this.top) && !nexacro._isNull(this.bottom) && !nexacro._isNull(this.height))
            {
                this.height = null;
                this._height = null;
            }

            this._update_position(false, true);
        }
    };

    _pComponent.set_right = function (propVal)
    {
        if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal)))
            return;

        if (this.right != propVal)
        {
            this.right = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._right = null;
                if (!this._width)
                {
                    this.set_width(this._adjust_width);
                }
            }

            if (!nexacro._isNull(this.right) && !nexacro._isNull(this.left) && !nexacro._isNull(this.width))
            {
                this.width = null;
                this._width = null;
            }

            this._update_position(true, true);
        }
    };

    _pComponent.set_bottom = function (propVal)
    {
        if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal)))
            return;

        if (this.bottom != propVal)
        {
            this.bottom = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._bottom = null;
                if (!this._height)
                {
                    this.set_height(this._adjust_height);
                }
            }

            if (!nexacro._isNull(this.bottom) && !nexacro._isNull(this.top) && !nexacro._isNull(this.height))
            {
                this.height = null;
                this._height = null;
            }
            this._update_position(true, true);
        }
    };

    _pComponent.set_width = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }

        if (propVal !== "auto")
        {
            if (propVal !== null && propVal !== undefined)
            {
                if (strVal.charAt(strVal.length - 1) == '%')
                {
                    propVal = parseFloat(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                    propVal += "%";
                }
                else
                {
                    propVal = parseInt(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                }
            }
        }

        if (this.width != propVal)
        {
            this.width = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._width = null;

                var form = this._getForm();
                var leftbaseComp, rightbaseComp;
                var this_left, this_right;
                this_left = this._adjust_left;
                this_right = this._adjust_left + this._adjust_width;
                if (this._leftbase_component_id)
                {
                    leftbaseComp = this._getFormChildById(this._leftbase_component_id);
                    if (this._leftbase_position_type == "left")
                    {
                        this_left = this_left - leftbaseComp._adjust_left;
                    }
                    else
                    {
                        this_left = this_left - (leftbaseComp._adjust_left + leftbaseComp._adjust_width);
                    }
                }

                if (this._rightbase_component_id)
                {
                    rightbaseComp = this._getFormChildById(this._rightbase_component_id);
                    if (this._rightbase_position_type == "left")
                    {
                        this_right = this_right - rightbaseComp._adjust_left;
                    }
                    else
                    {
                        this_right = this_right - (rightbaseComp._adjust_left + rightbaseComp._adjust_width);
                    }
                }
                else
                {
                    this_right = form._adjust_width - this_right;
                }

                if (!this._left && !this._right)
                {
                    this.set_left(this_left);
                    this.set_right(this_right);
                }
                else if (this._left && !this._right)
                {
                    this.set_right(this_right);
                }
                else if (!this._left && this._right)
                {
                    this.set_left(this_left);
                }
            }

            if (!nexacro._isNull(this.width) && !nexacro._isNull(this.left) && !nexacro._isNull(this.right))
            {
                this.right = null;
                this._right = null;
            }
            this._update_position(true, false);
        }
    };

    _pComponent.set_height = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }

        if (propVal !== "auto")
        {
            if (propVal !== null && propVal !== undefined)
            {
                if (strVal.charAt(strVal.length - 1) == '%')
                {
                    propVal = parseFloat(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                    propVal += "%";
                }
                else
                {
                    propVal = parseInt(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                }
            }
        }

        if (this.height != propVal)
        {
            this.height = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._width = null;

                var form = this._getForm();
                var topbaseComp, bottombaseComp;
                var this_top, this_bottom;
                this_top = this._adjust_top;
                this_bottom = this._adjust_top + this._adjust_height;
                if (this._topbase_component_id)
                {
                    topbaseComp = this._getFormChildById(this._topbase_component_id);
                    if (this._topbase_position_type == "top")
                    {
                        this_top = this_top - topbaseComp._adjust_top;
                    }
                    else
                    {
                        this_top = this_top - (topbaseComp._adjust_top + topbaseComp._adjust_height);
                    }
                }

                if (this._bottombase_component_id)
                {
                    bottombaseComp = this._getFormChildById(this._bottombase_component_id);
                    if (this._bottombase_position_type == "top")
                    {
                        this_bottom = this_bottom - bottombaseComp._adjust_top;
                    }
                    else
                    {
                        this_bottom = this_bottom - (bottombaseComp._adjust_top + bottombaseComp._adjust_height);
                    }
                }
                else
                {
                    this_bottom = form._adjust_height - this_bottom;
                }

                if (!this._top && !this._bottom)
                {
                    this.set_top(this_top);
                    this.set_bottom(this_bottom);
                }
                else if (this._top && !this._bottom)
                {
                    this.set_bottom(this_bottom);
                }
                else if (!this._top && this._bottom)
                {
                    this.set_top(this_top);
                }
            }

            if (!nexacro._isNull(this.height) && !nexacro._isNull(this.top) && !nexacro._isNull(this.bottom))
            {
                this.bottom = null;
                this._bottom = null;
            }

            this._update_position(true, false);
        }
    };

    _pComponent.set_minwidth = function (propVal)
    {
        this.minwidth = propVal;
        var val = this.minwidth;
        if (this._widthbase_component_id)
        {
            var baseComp = this._getFormChildById(this._widthbase_component_id);
            if (baseComp)
            {
                val = this._convToPixel(val, baseComp._width);
            }
        }
        else
        {
            val = this._convToPixel(val, this.parent._getClientWidth());
        }
        if (isNumber(val) || val == null)
        {
            this._minwidth = val;
        }
        if (this._minwidth != null && this._maxwidth && this._minwidth > this._maxwidth)
        {
            this.set_maxwidth(propVal);
        }
        this._update_position(true, false);
    };

    _pComponent.set_maxwidth = function (propVal)
    {
        this.maxwidth = propVal;
        var val = this.maxwidth;
        if (this._widthbase_component_id)
        {
            var baseComp = this._getFormChildById(this._widthbase_component_id);
            if (baseComp)
            {
                val = this._convToPixel(val, baseComp._width);
            }
        }
        else
        {
            val = this._convToPixel(val, this.parent._getClientWidth());
        }
        if (isNumber(val) || val == null)
        {
            this._maxwidth = val;
        }
        if (this._minwidth != null && this._maxwidth && this._maxwidth < this._minwidth)
        {
            this.set_minwidth(propVal);
        }
        this._update_position(true, false);
    };

    _pComponent.set_minheight = function (propVal)
    {
        this.minheight = propVal;
        var val = this.minheight;
        if (this._heightbase_component_id)
        {
            var baseComp = this._getFormChildById(this._heightbase_component_id);
            if (baseComp)
            {
                val = this._convToPixel(val, baseComp._height);
            }
        }
        else
        {
            val = this._convToPixel(val, this.parent._getClientHeight());
        }
        if (isNumber(val) || val == null)
        {
            this._minheight = val;
        }
        if (this._minheight != null && this._maxheight && this._minheight > this._maxheight)
        {
            this.set_maxheight(propVal);
        }
        this._update_position(true, false);
    };

    _pComponent.set_maxheight = function (propVal)
    {
        this.maxheight = propVal;
        var val = this.maxheight;
        if (this._heightbase_component_id)
        {
            var baseComp = this._getFormChildById(this._heightbase_component_id);
            if (baseComp)
            {
                val = this._convToPixel(val, baseComp._height);
            }
        }
        else
        {
            val = this._convToPixel(val, this.parent._getClientHeight());
        }
        if (isNumber(val) || val == null)
        {
            this._maxheight = val;
        }
        if (this._minheight != null && this._maxheight && this._maxheight < this._minheight)
        {
            this.set_minheight(propVal);
        }
        this._update_position(true, false);
    };

    // position base
    _pComponent.set_leftbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.leftbase != basePosition)
        {
            this.leftbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "left" || position == "right"))
                    {
                        return; // 스펙문서 (지정가능한 Base 기준은 width/height 대상으로만 지정가능) 적용
                    }
                }
                else
                {
                    // basePosition = "Div00" 대응
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._leftbase_component_id)
                {
                    baseComp = linkedId = this._leftbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)  //comp가 없다면 동일 child가 아니다. 스펙문서 (지정가능한 Base Component는 자신기준의 Scope로 지정함: 동일 ChildList내의 Sibling 대상중 div00을 대상으로 찾음)
            {
                if (baseComp != null)
                {
                    this._removeCheckBasedList(comp);
                    this._leftbase_component_id = null;
                    this._leftbase_position_type = null;
                }
                else
                {
                    // _based_list에 중복등록을 막기위함.
                    this._addBasedList(comp);

                    // position base 정보를 nexacro.Component에 저장함	               
                    this._leftbase_component_id = linkedId; // "div00.left"의 div00을 지정
                    if (position)
                    {
                        this._leftbase_position_type = position; // "div00.left"의 left를 지정           
                    }
                    else
                    {
                        this._leftbase_position_type = "right"; // base 속성 지정 시 sibling 대상만(left, right 생략 시) 지정 시 반대방향 position 으로 처리
                    }
                    this._update_position(false, true);
                }
            }
        }
    };

    _pComponent.set_topbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.topbase != basePosition)
        {
            this.topbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "top" || position == "bottom"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._topbase_component_id)
                {
                    baseComp = linkedId = this._topbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                if (baseComp != null)
                {
                    this._removeCheckBasedList(comp);
                    this._topbase_component_id = null;
                    this._topbase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._topbase_component_id = linkedId;
                    if (position)
                    {
                        this._topbase_position_type = position;
                    }
                    else
                    {
                        this._topbase_position_type = "bottom";
                    }
                    this._update_position(false, true);
                }
            }
        }
    };

    _pComponent.set_rightbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.rightbase != basePosition)
        {
            this.rightbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "left" || position == "right"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._rightbase_component_id)
                {
                    baseComp = linkedId = this._rightbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                if (baseComp != null)
                {
                    this._removeCheckBasedList(comp);
                    this._rightbase_component_id = null;
                    this._rightbase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._rightbase_component_id = linkedId;
                    if (position)
                    {
                        this._rightbase_position_type = position;
                    }
                    else
                    {
                        this._rightbase_position_type = "left";
                    }
                    this._update_position(false, true);
                }
            }
        }
    };

    _pComponent.set_bottombase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.bottombase != basePosition)
        {
            this.bottombase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "top" || position == "bottom"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._bottombase_component_id)
                {
                    baseComp = linkedId = this._bottombase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                if (baseComp != null)
                {
                    this._removeCheckBasedList(comp);
                    this._bottombase_component_id = null;
                    this._bottombase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._bottombase_component_id = linkedId;
                    if (position)
                    {
                        this._bottombase_position_type = position;
                    }
                    else
                    {
                        this._bottombase_position_type = "top";
                    }
                    this._update_position(false, true);
                }
            }
        }
    };

    _pComponent.set_widthbase = function (basePosition)
    {
        var baseComp = null;
        this.widthbase = basePosition;

        if (((basePosition == null || basePosition == "") || (typeof (this.width) != "string" || this.width.indexOf("%") == 0)) && this._widthbase_component_id)
        {
            baseComp = this._getFormChildById(this._widthbase_component_id);
            if (baseComp)
            {
                this._removeCheckBasedList(baseComp);
            }
            this._widthbase_component_id = null;
        }

        baseComp = this._getFormChildById(basePosition);
        if (baseComp)
        {
            this._addBasedList(baseComp);
            this._widthbase_component_id = basePosition;
            this._update_position(false, true);
        }
    };

    _pComponent.set_heightbase = function (basePosition)
    {
        var baseComp = null;
        this.heightbase = basePosition;

        if (((basePosition == null || basePosition == "") || (typeof (this.height) != "string" || this.height.indexOf("%") == 0)) && this._heightbase_component_id)
        {
            baseComp = this._getFormChildById(this._heightbase_component_id);
            if (baseComp)
            {
                this._removeCheckBasedList(baseComp);
            }
            this._heightbase_component_id = null;
        }

        baseComp = this._getFormChildById(basePosition);
        if (baseComp)
        {
            this._addBasedList(baseComp);

            this._heightbase_component_id = basePosition;
            this._update_position(false, true);
        }
    };

    _pComponent._addBasedList = function (targetComp)
    {
        var len = targetComp._based_list.length;
        if (len > 0)
        {
            var bPush = true;
            for (i in targetComp._based_list)
            {
                if (targetComp._based_list[i] == this.id)
                {
                    bPush = false;
                    break;
                }
            }

            if (bPush)
            {
                targetComp._based_list.push(this.id);
            }
        }
        else
        {
            targetComp._based_list.push(this.id);
        }
    };

    _pComponent._removeBasedList = function ()
    {
        if (this.parent)
        {
            var baseComp = null;
        	var index;
            if (this._leftbase_component_id && (baseComp = this._getFormChildById(this._leftbase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);                
            }
            if (this._topbase_component_id && (baseComp = this._getFormChildById(this._topbase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);
            }
            if (this._rightbase_component_id && (baseComp = this._getFormChildById(this._rightbase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);
            }
            if (this._bottombase_component_id && (baseComp = this._getFormChildById(this._bottombase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);
            }
            if (this._widthbase_component_id && (baseComp = this._getFormChildById(this._widthbase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);
            }
            if (this._heightbase_component_id && (baseComp = this._getFormChildById(this._heightbase_component_id)))
            {
            	index = baseComp._based_list.indexOf(this.id);
            	baseComp._based_list.splice(index, 1);
            }
        }
    };

    _pComponent._removeCheckBasedList = function (baseComp)
    {
        var cnt = 0;
        var comp = null;

        var len = baseComp._based_list.length;
        for (var i = 0; i < len; i++)
        {
        	var baseid = baseComp._based_list[i];
        	if (baseid == this.id && cnt < 2)
            {
                if (this._leftbase_component_id == baseComp.id)
                {
                    cnt++;
                }
                if (this._topbase_component_id == baseComp.id)
                {
                    cnt++;
                }
                if (this._rightbase_component_id == baseComp.id)
                {
                    cnt++;
                }
                if (this._bottombase_component_id == baseComp.id)
                {
                    cnt++;
                }
                if (this._widthbase_component_id == baseComp.id)
                {
                    cnt++;
                }
                if (this._heightbase_component_id == baseComp.id)
                {
                    cnt++;
                }
            }
        }

        if (cnt == 1)
        {
        	var index = baseComp._based_list.indexOf(this.id);
        	baseComp._based_list.splice(index, 1);           
        }

    };

    //---------------------------------------------------------------
    // get componet's position to pixel
    _pComponent.getPixelLeft = function ()
    {
        return this._left;
    };
    _pComponent.getPixelTop = function ()
    {
        return this._top;
    };
    _pComponent.getPixelRight = function ()
    {
        return this._right;
    };
    _pComponent.getPixelBottom = function ()
    {
        return this._bottom;
    };
    _pComponent.getPixelWidth = function ()
    {
        return this._width;
    };
    _pComponent.getPixelHeight = function ()
    {
        return this._height;
    };

    // get componet's offset position to pixel from parent's left/top
    _pComponent.getOffsetLeft = function ()
    {
        return this._adjust_left;
    };
    _pComponent.getOffsetTop = function ()
    {
        return this._adjust_top;
    };
    _pComponent.getOffsetRight = function ()
    {
        return this._adjust_left + this._adjust_width;
    };
    _pComponent.getOffsetBottom = function ()
    {
        return this._adjust_top + this._adjust_height;
    };
    _pComponent.getOffsetWidth = function ()
    {
        return this._adjust_width;
    };
    _pComponent.getOffsetHeight = function ()
    {
        return this._adjust_height;
    };

    _pComponent.setOffsetLeft = function (v)
    {
        return this.set_left(v);
    };
    _pComponent.setOffsetTop = function (v)
    {
        this.set_top(v);
    };
    _pComponent.setOffsetRight = function (v)
    {
        this.set_width((v | 0) - this._adjust_left);
    };
    _pComponent.setOffsetBottom = function (v)
    {
        this.set_height((v | 0) - this._adjust_top);
    };
    _pComponent.setOffsetWidth = function (v)
    {
        this.set_width(v);
    };
    _pComponent.setOffsetHeight = function (v)
    {
        this.set_height(v);
    };

    _pComponent.getDisplayText = function ()
    {
    	return this.on_getDisplayText();
    };

    _pComponent._on_getDisplayText = function ()
    {
    	return this._displaytext;
    };

	//initvalue :  -> changed from nexacro14 styleproperty to nexacro16 normalproperty  
    _pComponent.set_initvalueid = function (initvalueid)
    {
    	if (!this._is_created)
    	{
    		this.initvalueid = initvalueid;    		
    		var fn =  this._type_name + initvalueid;
    		if (nexacro_init[fn])
    			nexacro_init[fn].call(this, this);
    	}
    };

    //Accessibility method..
    //gets
    _pComponent._getAccessibilityRole = function ()
    {
        var role = this.accessibilityrole ? this.accessibilityrole : this._accessibility_role;
        if (!role) role = "none";
        return role;
    };

    _pComponent._getAccessibilityLabel = function ()
    {
        var label = "";
        return (label = this._getLinkedLabel(this.accessibilitylabel)) ? label : this.on_get_accessibility_label();
    };

    _pComponent._on_getAccessibilityAdditionalLabel = function ()
    {
        //Example : index or count
        //need to override
        return "";
    };

    _pComponent._on_getAccessibilityAdditionalRole = function ()
    {
        if (this._getAccessibilityRole() == "heading")
            return " heading";
        return "";
    };

    _pComponent._getAccessibilityDescLevel = function ()
    {
        var desclevel = this.accessibilitydesclevel;
        if (desclevel == "none" || desclevel == "child")
            return desclevel;
        var comp = this.parent;
        if (comp && comp._getDescLevel)
            return comp._getDescLevel();
        else
            return desclevel;
    };

    _pComponent._getAccessibilityDescription = function ()
    {
        var description = "";
        return (description = this._getLinkedDescription(this.accessibilitydescription)) ? description : this.on_get_accessibility_description();
    };

    _pComponent._getAccessibilityAction = function ()
    {
        var action = this._getLinkedAction(this.accessibilityaction);
		return action ? action : (action = this.on_get_accessibility_action()) ? action : "";
    };

    _pComponent._getAccessibilityReadLabel = function ()
    { //use form
        var control = this.getElement();
        if (control && control.accessibility_readlabel)
            return control.accessibility_readlabel;
        return "";
    };

    //on_gets
    _pComponent.on_get_accessibility_label = function ()
    {
        var label = this.text ? this.text : this.value;
        return label ? label : "";
    };

    _pComponent.on_get_accessibility_description = function ()
    {
        return this.tooltiptext;
    };

    _pComponent.on_get_accessibility_action = function ()
    {
        return "";
    };

    //_gets
    _pComponent._getLinkedLabel = function (label)
    {
        if (label)
        {
            if (label.match("@"))
            {
                var linkedId = label.substr(label.search("@") + 1, label.length);
                var linkedComp = this._getFormChildById(linkedId);
                if (linkedComp)
                {
                    return linkedComp._getAccessibilityLabel();
                }
                else
                    return;
            }
        }
        return label;
    };

    _pComponent._getLinkedDescription = function (description)
    {
        if (description)
        {
            if (description.match("@"))
            {
                var linkedId = description.substr(description.search("@") + 1, description.length);
                var linkedComp = this._getFormChildById(linkedId);
                if (linkedComp)
                {
                    return linkedComp._getAccessibilityDescription();
                }
                else
                    return;
            }
        }
        return description;
    };

    _pComponent._getDescLevel = function ()
    {
        	//if (this != application)
		if (!this._is_application)
        {
            var desclevel = this.accessibilitydesclevel;
            var comp = this.parent;
            if (desclevel == "none" || desclevel == "self")
                return "none";
            else if (comp && comp._getDescLevel)
                return comp._getDescLevel();
        }
        return "all";
    };

    _pComponent._getLinkedAction = function (action)
    {
        if (action)
        {
            if (action.match("@"))
            {
                var linkedId = action.substr(action.search("@") + 1, action.length);
                var linkedComp = this._getFormChildById(linkedId);
                if (linkedComp)
                {
                    return linkedComp._getAccessibilityAction();
                }
                else
                    return;
            }
        }
        return action;
    };

    _pComponent._getFormChildById = function (id)
    {
        return this.parent[id];
    };

    _pComponent._getAccessibilityParentValue = function (accessibility)
    {
        var label = "";
        var type = nexacro._accessibilitydescreadtype;
        if ((type & 0x01) == 0x01)
        {
            var _label = this._getAccessibilityLabel(accessibility);
            if (_label)
                label = _label;
        }
        if ((type & 0x02) == 0x02 && this.accessibility_action)
        {
            var _action = " " + this._getAccessibilityAction(accessibility);
            if (_action)
                label += _action;
        }
        if ((type & 0x04) == 0x04 && this.accessibility_description)
        {
            var _description = " " + this._getAccessibilityDescription(accessibility);
            if (_description)
                label += _description;
        }
        return label;
    };


    _pComponent._setAccessibilityRole = nexacro._emptyFn;
    _pComponent._setAccessibilityLabel = nexacro._emptyFn;
    _pComponent._setAccessibilityEnable = nexacro._emptyFn;
    _pComponent._setAccessibilityDescription = nexacro._emptyFn;
    _pComponent._setAccessibilityAction = nexacro._emptyFn;
    _pComponent._setAccessibilityDescLevel = nexacro._emptyFn;
    _pComponent._setAccessibilityStatDisabled = nexacro._emptyFn;
    _pComponent._setAccessibilityStatHidden = nexacro._emptyFn;
    _pComponent._setAccessibilityStatChecked = nexacro._emptyFn;
    _pComponent._setAccessibilityStatPressed = nexacro._emptyFn;
    _pComponent._setAccessibilityStatSelected = nexacro._emptyFn;
    _pComponent._setAccessibilityStatExpanded = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagHasPopup = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagFocusable = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagReadOnly = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagPassword = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagMultiSelectable = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagSelectable = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagDefaultButton = nexacro._emptyFn;
    _pComponent._setAccessibilityFlagMultiLine = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoCount = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoIndex = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoValueMax = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoValueMin = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoValueCur = nexacro._emptyFn;
    _pComponent._setAccessibilityInfoLevel = nexacro._emptyFn;
    _pComponent._setAccessibilityHotKey = nexacro._emptyFn;
    _pComponent._setAccessibilityActiveDescendant = nexacro._emptyFn;
    _pComponent._notifyAccessibility = nexacro._emptyFn;
    _pComponent._setAccessibilityStatFlag = nexacro._emptyFn;
    _pComponent._isAccessibilityEnable = nexacro._echoFn;
    _pComponent._isItemAccessibilityEnable = nexacro._echoFn;
    _pComponent._setAccessibilityValue = nexacro._emptyFn;
    _pComponent._setAccessibilityStatFocus = nexacro._emptyFn;
    _pComponent._getNextAccessibilityOrderIndex = nexacro._emptyFn;


    //---------------------------------------------------------------
    _pComponent.on_get_css_typename = function ()
    {
        return this._type_name;
    };
    _pComponent.on_get_css_assumedtypename = function ()
    {
        return this._type_name;
    };

    // util 
    _pComponent._contains = function (oDescendant)
    {
        while (oDescendant)
        {
            if (oDescendant == this) return true;
            oDescendant = oDescendant.parent;
        }
        return false;
    };

    _pComponent._getRootComponent = function (component)
    {
        var comp = component;
        while (comp && (comp._is_subcontrol || !comp._is_component || comp instanceof nexacro._InnerForm))
        {
            if (comp == comp.parent)
                return null;
            comp = comp.parent;
        }
        return comp;
    };

    //do not use - Snare
    _pComponent._getPopupRootComponent = function (component)
    {
        var comp = component;
        while (comp && (comp._is_subcontrol || !comp._is_component) && !comp._popupcontrol)
        {
            if (comp == comp.parent)
                return null;
            comp = comp.parent;
        }
        return comp;
    };

    _pComponent._getElementRootControl = function (element)
    {
        var control_elem = element;

        while (control_elem && !control_elem.linkedcontrol)
        {
            control_elem = control_elem.parent;
        }

        var comp = control_elem.linkedcontrol;

        while (comp && !comp._is_subcontrol)
        {
            if (comp == comp.parent) break;
            comp = comp.parent;
        }
        return comp;
    };

    _pComponent._getRootWindowComponent = function (component)
    {
        var comp = component ? component : this;
        while (comp)
        {
            if (comp._is_window)
                return comp;
            if (comp._isPopupVisible())
                return comp;
            if (comp == comp.parent) // wt?
                break;
            comp = comp.parent;
        }
        return null;
    };

    _pComponent._isPopupVisible = function ()
    {
        return false;
    };

    _pComponent._closePopup = function ()
    {
        var popup = this._popupcontrol;
        if (popup)
        {
            popup._closePopup();
        }
    };

    _pComponent._getEventInfoComponent = function ()
    {       
        return this;
    };

    _pComponent._getFocusAcceptableComponent = function (component)
    {
        var comp = component;
        while (comp && comp._is_subcontrol && !comp._is_focus_accept)
        {
            if (comp == comp.parent)
            {
                return null;
            }
            comp = comp.parent;
        }
        return comp;
    };

    // for timer
    _pComponent._getReferenceContext = function ()
    {
        return this._refform;
    };

    // GetDlgCode 컴포넌트가 어떤 키를 처리하길 원하는지의 여부 .. 
    _pComponent._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // Ex)
        // want_tab:true    : Tab키를 눌러도 포커스 이동을 하지 않음 (Grid,TextArea)
        // want_return:true : Enter키를 눌러도 DefaultButton 처리를 하지 않음 (Menu,PopupMenu,Grid,TextArea)
        // want_escape:true : ............... EscapeButton 처리를 하지 않음
        // want_chars       : 미사용
        // want_arrows      : 미사용
        // want_touchmove   : touchmove를 직접 제어함 (body 스크롤이 되지 않음)
        //                    scroll이 없는 컴포넌트임에도 body스크롤을 방지하고 싶을때 true.

        return {
            want_tab: false,
            want_return: false,
            want_escape: false,
            want_chars: false,
            want_arrows: false,
            want_touchstart: false,
            want_touchmove: false
        };
    };

    _pComponent.set_scrollbartype = function (v)
    {
        v = nexacro._toString(v);
        if (v == "" || nexacro._isNull(v))
            return v;

        v = v.trim();
        var arr = v.toLowerCase().split(" ");
        var hscrollbartype = this._hscrollbartype;
        var vscrollbartype = this._vscrollbartype;

        var new_vscrollbartype;
        var new_hscrollbartype;

        for (var i = 0; i < arr.length; i++)
        {
            switch (arr[i])
            {
                case "none": case "auto": case "fixed": case "autoindicator": case "indicator": case "default":
                    if (i == 0)
                        new_hscrollbartype = arr[i];
                    else if (i == 1)
                        new_vscrollbartype = arr[i];
                    break;

                default:
                    break;
            }
        }

        this.scrollbartype = v;

        if (!new_hscrollbartype && !new_vscrollbartype)
        {
            this._hscrollbartype = undefined;
            this._vscrollbartype = undefined;
        }
        else
        {
            if (!new_hscrollbartype || new_hscrollbartype == "default")
                this._hscrollbartype = new_hscrollbartype = undefined;
            else
                this._hscrollbartype = new_hscrollbartype;

            if (!new_vscrollbartype)
                this._vscrollbartype = new_hscrollbartype;
            else if (new_vscrollbartype == "default")
                this._vscrollbartype = undefined;
            else
                this._vscrollbartype = new_vscrollbartype;
        }

        this.on_apply_scrollbartype();

        return v;
    };
    
    _pComponent.on_apply_scrollbartype = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var hscrollbarsize = this._getHScrollBarSize();
            var vscrollbarsize = this._getVScrollBarSize();
            
            var hscrollbartype = this._getHScrollBarType();
            var vscrollbartype = this._getVScrollBarType();

            control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
            this._onResetScrollBar();
        }

        /*
        if (this._vscrollbartype == "autohide")
        {
            if (this.vscrollbar)
                this.vscrollbar.set_visible(false);
        }

        if (this._hscrollbartype == "autohide")
        {
            if (this.hscrollbar)
                this.hscrollbar.set_visible(false);
        }
          */  
    };

    _pComponent.set_scrolltype = function (v)
    {
 
        v = nexacro._toString(v);

        if (!nexacro._isNull(v))
            v = v.toLowerCase();

        switch (v)
        {
            case "none": case "both": case "horizontal": case "vertical":
                this.scrolltype = v;

                this.on_apply_scrolltype();
                break;
            default:
                break;
        }
           
        return v;
    };

    _pComponent.on_apply_scrolltype = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var hscrollbarsize = this._getHScrollBarSize();
            var vscrollbarsize = this._getVScrollBarSize();

            var hscrollbartype = this._getHScrollBarType();
            var vscrollbartype = this._getVScrollBarType();

            control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
            this._onResetScrollBar();
        }
    };

    _pComponent.on_vscroll = function (obj, e)
    {
        if (this.onvscroll && this.onvscroll._has_handlers)
        {
            e.fromobject = this;
            this.onvscroll._fireEvent(this, e);
        }
        return true;
    };
    _pComponent.on_hscroll = function (obj, e)
    {
        if (this.onhscroll && this.onhscroll._has_handlers)
        {
            e.fromobject = this;
            this.onhscroll._fireEvent(this, e);
        }
        return true;
    };

    // This function should override by Scrollable Component
    _pComponent._onRecalcScrollSize = nexacro._emptyFn;

    _pComponent.set_scrollbarbarminsize = function (scrollbarbarminsize)
	{
		if (!this._is_scrollable)
			return;
		scrollbarbarminsize = nexacro._toInt(scrollbarbarminsize);
		if (this.scrollbarbarminsize != scrollbarbarminsize)
		{
			this.scrollbarbarminsize = scrollbarbarminsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar)
				scrollbar.set_barminsize(scrollbarbarminsize);

			scrollbar = this.hscrollbar;
			if (scrollbar)
				scrollbar.set_barminsize(scrollbarbarminsize);
		}
	};

	_pComponent.set_scrollbardecbuttonsize = function (scrollbardecbuttonsize)
	{
		if (!this._is_scrollable)
			return;
		scrollbardecbuttonsize = nexacro._toInt(scrollbardecbuttonsize);
		if (this.scrollbardecbuttonsize != scrollbardecbuttonsize)
		{
			this.scrollbardecbuttonsize = scrollbardecbuttonsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar)
				scrollbar.set_decbuttonsize(scrollbardecbuttonsize);

			scrollbar = this.hscrollbar;
			if (scrollbar)
				scrollbar.set_decbuttonsize(scrollbardecbuttonsize);
		}
	};

	_pComponent.set_scrollbarbaroutsize = function (scrollbarbaroutsize)
	{
		if (!this._is_scrollable)
			return;

		scrollbarbaroutsize = nexacro._toInt(scrollbarbaroutsize);
		if (this.scrollbarbaroutsize != scrollbarbaroutsize)
		{
			this.scrollbarbaroutsize = scrollbarbaroutsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar)
				scrollbar.set_baroutsize(scrollbarbaroutsize);

			scrollbar = this.hscrollbar;
			if (scrollbar)
				scrollbar.set_baroutsize(scrollbarbaroutsize);
		}
	};

	_pComponent.set_scrollbarincbuttonsize = function (scrollbarincbuttonsize)
	{
		if (!this._is_scrollable)
			return;
		scrollbarincbuttonsize = nexacro._toInt(scrollbarincbuttonsize);
		if (this.scrollbarincbuttonsize != scrollbarincbuttonsize)
		{
			this.scrollbarincbuttonsize = scrollbarincbuttonsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar)
				scrollbar.set_incbuttonsize(scrollbarincbuttonsize);
			scrollbar = this.hscrollbar;
			if (scrollbar)
				scrollbar.set_incbuttonsize(scrollbarincbuttonsize);
		}
	};

	_pComponent.set_scrollbarsize = function (scrollbarsize)
	{
		if (!this._is_scrollable)
		    return;

		scrollbarsize = scrollbarsize ? nexacro._toInt(scrollbarsize) : scrollbarsize;
		
		this.scrollbarsize = scrollbarsize;
		this.on_apply_scrollbarsize();
		
	};

	_pComponent.set_scrollindicatorsize = function (scrollbarsize)
	{
	    if (!this._is_scrollable)
	        return;
	    scrollbarsize = nexacro._toInt(scrollbarsize);

	    this.scrollindicatorsize = scrollbarsize;
	    this.on_apply_scrollbarsize();

	};

	_pComponent.on_apply_scrollbarsize = function ()
	{
	    var control_elem = this.getElement();
	    if (control_elem)
	    {
	        var hscrollbarsize = this._getHScrollBarSize();
	        var vscrollbarsize = this._getVScrollBarSize();

	        var hscrollbartype = this._getHScrollBarType();
	        var vscrollbartype = this._getVScrollBarType();

	        control_elem.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, this.scrolltype);
	    }

	    this._onResetScrollBar();
	};

	_pComponent.set_scrollbartrackbarsize = function (scrollbartrackbarsize)
	{
		if (!this._is_scrollable)
			return;
		scrollbartrackbarsize = nexacro._toInt(scrollbartrackbarsize);
		if (this.scrollbartrackbarsize != scrollbartrackbarsize)
		{
			this.scrollbartrackbarsize = scrollbartrackbarsize;
			var scrollbar = this.vscrollbar;
			if (scrollbar)
				scrollbar.set_trackbarsize(scrollbartrackbarsize);
			scrollbar = this.hscrollbar;
			if (scrollbar)
				scrollbar.set_trackbarsize(scrollbartrackbarsize);
		}
	};

    _pComponent._onResetScrollBar = function ()
    {
		if (!this._is_scrollable)
			return;

        var control_elem = this._control_element;
        if (control_elem)
        {
            var new_hbar = false;
            var new_vbar = false;
            
            var hscrollbar_size = this._getHScrollBarSize();
            var vscrollbar_size = this._getVScrollBarSize();

            var bcreatevscroll = false;
            var bcreatehscroll = false;
            
            var hscrollbartype = this._getHScrollBarType();
            var vscrollbartype = this._getVScrollBarType();

            var scrolltype = this.scrolltype;

            if (hscrollbartype != "none")
                bcreatehscroll = true;
            
            if (vscrollbartype != "none")
                bcreatevscroll = true;
            
            if (this._is_form && this.getStepCount() > 0)
                bcreatehscroll = false;
                
            var client_left = control_elem.client_left;
            var client_top = control_elem.client_top;
            var client_width = control_elem.client_width;
            var client_height = control_elem.client_height;            
            var zclient_width = control_elem._zclient_width;
            var zclient_height = control_elem._zclient_height;

            var paddingleft = paddingtop = paddingright = paddingbottom = 0;
            var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;

            var vscroll_enable = false;
            var hscroll_enable = false;

            if (control_elem._apply_client_padding && padding)
            {
                paddingleft = padding.left;
                paddingtop = padding.top;
                paddingright = padding.right;
                paddingbottom = padding.bottom;
            }           

            var hscroll_left = client_left - paddingleft;
            var hscroll_top = client_height + paddingtop + paddingbottom;
            var hscroll_width = client_width + paddingleft + paddingright;

            var vscroll_left = client_width + paddingleft + paddingright;
            var vscroll_top = client_top - paddingtop;
            var vscroll_height = client_height + paddingtop + paddingbottom;
            
            if (bcreatehscroll)
            {
                 this._createHScrollBar(hscrollbar_size);
                    
                if (hscrollbar_size > 0)
                {
                    if (control_elem.hscroll_limit <= 0 && hscrollbartype != "fixed")
                        hscrollbar_size = 0;

                    if (hscrollbartype == "autoindicator")
                    {
                        hscroll_top -= hscrollbar_size;
                        this.hscrollbar.set_visible(false);
                    }
                    else
                        this.hscrollbar.set_visible(true);
                        
                }
                
               
            }
            else
            {
                if (this.hscrollbar)
                {
                    this.hscrollbar.destroy();
                    this.hscrollbar = null;
                }
            }

            if (bcreatevscroll)
            {
                this._createVScrollBar(vscrollbar_size);

                if (vscrollbar_size > 0)
                {
                    if (control_elem.vscroll_limit <= 0 && vscrollbartype != "fixed")
                    {
                        vscrollbar_size = 0;
                    }

                    if (vscrollbartype == "autoindicator")
                    {
                        vscroll_left -= vscrollbar_size;
                        this.vscrollbar.set_visible(false);
                    }
                    else
                        this.vscrollbar.set_visible(true);

                    //hscroll_width -= vscrollbar_size;
                }
            }
            else 
            {
                if (this.vscrollbar)
                {
                    this.vscrollbar.destroy();
                    this.vscrollbar = null;
                }
            }

            // ScrollBar Visible시 생성
            if (this.hscrollbar)
            {
                if (this._isEnable() && hscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "vertical") && control_elem.hscroll_limit > 0)
                    hscroll_enable = true;

                this.hscrollbar._setScrollInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, hscroll_enable, control_elem.scroll_left);

                if (!this.hscrollbar._is_created)
                    this.hscrollbar.on_created(this._getWindow());

            }

            if (this.vscrollbar)
            {
                if (this._isEnable() && vscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "horizontal") && control_elem.vscroll_limit > 0)
                    vscroll_enable = true;

                this.vscrollbar._setScrollInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, vscroll_enable, control_elem.scroll_top);
                if (!this.vscrollbar._is_created)
                    this.vscrollbar.on_created(this._getWindow());

            }
        }
    };

    _pComponent.scrollTo = function (x,y)
                {
        this._scrollTo(x, y);
    };

    _pComponent.scrollBy = function (x, y)
    {
        x = parseInt(x) + this._hscroll_pos;
        y = parseInt(y) + this._vscroll_pos;

        this._scrollTo(x, y);
    };

    _pComponent._getHscrollPos = function ()
    {
        return this._hscroll_pos;
    };

    _pComponent._getVscrollPos = function ()
    {
        return this._vscroll_pos;
    };

    _pComponent._setHscrollPos = function (v)
    {
        this._hscroll_pos = nexacro._toInt(v);
    };

    _pComponent._setVscrollPos = function (v)
    {
        this._vscroll_pos = nexacro._toInt(v);
    };

    _pComponent._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind)
    { 
        return true;
    };

    _pComponent._scrollTo = function (hpos, vpos, bapplyscrollbar, bautohidetimer, evttype, evtkind)
    {
        if (nexacro._isNull(bapplyscrollbar))
            bapplyscrollbar = true;
        if (nexacro._isNull(bautohidetimer))
            bautohidetimer = false;

        var control_elem = this.getElement();

        if (!control_elem)
            return false;

        var scrolltype = this.scrolltype;
        var evttype_h, evttype_v;

        if (scrolltype == "none")
            return;

        var hscrollbartype = this._getHScrollBarType();
        var vscrollbartype = this._getVScrollBarType();

        var hscroll_limit = control_elem.hscroll_limit;
        var vscroll_limit = control_elem.vscroll_limit;

        if (scrolltype == "vertical")
            hscroll_limit = 0;
        if (scrolltype == "horizontal")
            vscroll_limit = 0;

        var current_hpos = this._hscroll_pos;
        var current_vpos = this._vscroll_pos;
        var bchange_hscroll_pos = false;
        var bchange_vscroll_pos = false;

        if (nexacro._isNull(hpos))
            hpos = current_hpos;
        if (nexacro._isNull(vpos))
            vpos = current_vpos;

        var bscroll = this._on_beforescroll(current_hpos, current_vpos, hpos, vpos, evttype, evtkind);

        hpos = parseInt(hpos) | 0;
        vpos = parseInt(vpos) | 0;

        hpos = hpos < 0 ? 0 : hpos;
        vpos = vpos < 0 ? 0 : vpos;

        hpos = hpos > hscroll_limit ? hscroll_limit : hpos;
        vpos = vpos > vscroll_limit ? vscroll_limit : vpos;

        if (hpos != current_hpos && vpos != current_vpos)
        {
            bchange_hscroll_pos = true;
            bchange_vscroll_pos = true;

            if (bscroll)
            {
                control_elem.setElementScrollPos(hpos, vpos);
            }

            this._hscroll_pos = hpos;
            this._vscroll_pos = vpos;
        }
        else if (hpos != current_hpos)
        {
            bchange_hscroll_pos = true;
            if (bscroll)
            {
                control_elem.setElementHScrollPos(hpos);
            }
            this._hscroll_pos = hpos;
        }
        else if (vpos != current_vpos)
        {
            bchange_vscroll_pos = true;
            if (bscroll)
            {
                control_elem.setElementVScrollPos(vpos);
            }
            this._vscroll_pos = vpos;
        }

        if (evtkind != "mousewheel_v" && !evttype)
            evttype_h = this._getScrollEventType(current_hpos, hpos, 0, hscroll_limit, "h");
        if (bchange_hscroll_pos || evttype_h)
        {
            if (evttype_h && evtkind == "mousewheel_h")
                evttype_h = "wheel" + evttype_h;

            this.on_fire_onhscroll("onhscroll", hpos, evttype_h ? evttype_h : evttype, evtkind);
        }

        if (evtkind != "mousewheel_h" && !evttype)
            evttype_v = this._getScrollEventType(current_vpos, vpos, 0, vscroll_limit, "v");

        if (bchange_vscroll_pos || evttype_v)
        {
            if (evttype_v && evtkind == "mousewheel_v")
                evttype_v = "wheel" + evttype_v;

            this.on_fire_onvscroll("onvscroll", vpos, evttype_v ? evttype_v : evttype, evtkind);
        }

        if (bapplyscrollbar)
        {
            var hscrollbar = this.hscrollbar;
            if (hscrollbar && hscrollbar.enable && bchange_hscroll_pos)
            {
                if (hscrollbartype == "autoindicator")
                {
                    hscrollbar.set_visible(true);

                    if (bautohidetimer)
                    {
                        nexacro._OnceCallbackTimer.callonce(this, function ()
                        {
                            this.hscrollbar.set_visible(false);
                        }, 500);
                    }
                }

                hscrollbar._setPos(hpos, undefined, false);

            }

            var vscrollbar = this.vscrollbar;
            if (vscrollbar && vscrollbar.enable && bchange_vscroll_pos)
            {
                if (vscrollbartype == "autoindicator")
                {
                    vscrollbar.set_visible(true);

                    if (bautohidetimer)
                    {
                        nexacro._OnceCallbackTimer.callonce(this, function ()
                        {
                            this.vscrollbar.set_visible(false);
                        }, 500);
                    }
                }

                vscrollbar._setPos(vpos, undefined, false);
            }
        }

        return true;
    };


    _pComponent._getScrollEventType = function (oldpos, newpos, min, max, dir)
    {
        var type;

        if (min == max)
            return type;

        if (oldpos > newpos && newpos > min)
        {
            if (dir == "h")
                type = "left";
            else
                type = "up";
        }
        else if (oldpos < newpos && newpos < max)
        {
            if (dir == "h")
                type = "right";
            else
                type = "down";
        }
        else if (newpos == min)
        {
            if (oldpos == newpos || newpos < min)
            {
                type = "firstover";
            }
            else
            {
                type = "first";
            }
        }
        else if (newpos == max)
        {
            if (oldpos == newpos || newpos > max)
            {
                type = "lastover";
            }
            else
            {
                type = "last";
            }
        }

        return type;
    };

    _pComponent.on_notify_hscroll_onscroll = function (obj, e)
    {
        this._scrollTo(e.pos, this._vscroll_pos, false, false, e.type, e._evtkind);
    };

    _pComponent.on_notify_vscroll_onscroll = function (obj, e)
    {
        this._scrollTo(this._hscroll_pos, e.pos, false, false, e.type, e._evtkind);
    };

    _pComponent.on_fire_onhscroll = function (eventid , pos, strType, evtkind)
    {
        if (this.onhscroll && this.onhscroll._has_handlers)
        {
            pos = (pos + 0.5) | 0;
            var evt = new nexacro.ScrollEventInfo(this, eventid, pos, strType, this, this.parent);

            evt._evtkind = evtkind;
            var ret = this.onhscroll._fireEvent(this, evt);
            return ret;
            }
        return true;
	};

    _pComponent.on_fire_onvscroll = function (eventid, pos, strType, evtkind)
    {
        if (this.onvscroll && this.onvscroll._has_handlers)
        {
            pos = (pos + 0.5) | 0;
            var evt = new nexacro.ScrollEventInfo(this, eventid, pos, strType, this, this.parent);

            evt._evtkind = evtkind;
            var ret = this.onvscroll._fireEvent(this, evt);
            return ret;
        }
        return true;
    };

	_pComponent._cancelEvent = function (target_comp)	{ };

    _pComponent._createVScrollBar = function (scroll_size)
    {
        var vscrollbartype = this._getVScrollBarType();
        var vscrollbar;

        if (vscrollbartype == "autoindicator" || vscrollbartype == "indicator")
        {
            if (this.vscrollbar && (this.vscrollbar.id != this._vscrollindicator_id))
            {
                this.vscrollbar.destroy();
                this.vscrollbar = null;
            }
            
            if (!this.vscrollbar)
                this.vscrollbar = new nexacro.ScrollIndicatorControl(this._vscrollindicator_id, "absolute", 0, 0, scroll_size, this._getClientWidth(), null, null, this);

        }
        else
        {
            if (this.vscrollbar && (this.vscrollbar.id != this._vscrollbar_id))
            {
                this.vscrollbar.destroy();
                this.vscrollbar = null;
            }
        
            if (!this.vscrollbar)
                this.vscrollbar = new nexacro.ScrollBarControl(this._vscrollbar_id, "absolute", 0, 0, scroll_size, this._getClientWidth(), null, null, this);
        }

        vscrollbar = this.vscrollbar;

        if (this.scrollbarbaroutsize)
            vscrollbar.set_baroutsize(this.scrollbarbaroutsize);
        if (this.scrollbarincbuttonsize)
            vscrollbar.set_incbuttonsize(this.scrollbarincbuttonsize);
        if (this.scrollbardecbuttonsize)
            vscrollbar.set_decbuttonsize(this.scrollbardecbuttonsize);
        if (this.scrollbarbarminsize)
            vscrollbar.set_barminsize(this.scrollbarbarminsize);
        if (this.scrollbartrackbarsize)
            vscrollbar.set_trackbarsize(this.scrollbartrackbarsize);

		if (!vscrollbar._is_created_contents)
		{
		    vscrollbar.set_direction("vertical");
		    vscrollbar._setEventHandler("onscroll", this.on_notify_vscroll_onscroll, this);
		    vscrollbar.createComponent(true);
		}

		vscrollbar.move(0, 0, scroll_size, this._getClientWidth(), null, null);
    };

    _pComponent._createHScrollBar = function (scroll_size)
    {
        var hscrollbar;
        var hscrollbartype = this._getHScrollBarType();

        if (hscrollbartype == "autoindicator" || hscrollbartype == "indicator")
        {

            if (this.hscrollbar && (this.hscrollbar.id != this._hscrollindicator_id))
            {
                this.hscrollbar.destroy();
                this.hscrollbar = null;
            }
            
            if (!this.hscrollbar)
                this.hscrollbar = new nexacro.ScrollIndicatorControl(this._hscrollindicator_id, "absolute", 0, 0, this._getClientHeight(), scroll_size, null, null, this);
        }
        else
        {

            if (this.hscrollbar && (this.hscrollbar.id != this._hscrollbar_id))
            {
                this.hscrollbar.destroy();
                this.hscrollbar = null;
            }
   
            if (!this.hscrollbar)
                this.hscrollbar = new nexacro.ScrollBarControl(this._hscrollbar_id, "absolute", 0, 0, this._getClientHeight(), scroll_size, null, null, this);
        }

        hscrollbar = this.hscrollbar;

        if (this.scrollbarbaroutsize)
            hscrollbar.set_baroutsize(this.scrollbarbaroutsize);
        if (this.scrollbarincbuttonsize)
            hscrollbar.set_incbuttonsize(this.scrollbarincbuttonsize);
        if (this.scrollbardecbuttonsize)
            hscrollbar.set_decbuttonsize(this.scrollbardecbuttonsize);
        if (this.scrollbarbarminsize)
            hscrollbar.set_barminsize(this.scrollbarbarminsize);
        if (this.scrollbartrackbarsize)
            hscrollbar.set_trackbarsize(this.scrollbartrackbarsize);

        if (!hscrollbar._is_created_contents)
        {
            hscrollbar.set_direction("horizontal");
            hscrollbar._setEventHandler("onscroll", this.on_notify_hscroll_onscroll, this);
            hscrollbar.createComponent(true);
        }

		hscrollbar.move(0, 0, this._getClientHeight(), scroll_size, null, null);
    };

    _pComponent._isWheelScrollable = function (delta)
    {
        var control_elem = this._control_element;
        if (!control_elem) return false;

        var st = control_elem.scroll_top;
        var sh = control_elem.container_maxheight;
        var ch = this._getClientHeight();

        if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0))
        {
            return false;
        }
        return true;
    };

    //status : enable, disabled, focused, mouseover,
    _pComponent._changeStatus = function (status, value)
    {
        this._on_changeStatus(status, value);
    };

    _pComponent.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus)
    {
        return applystatus;
    };

    //disabled > mouseover > focused > deactivate > readonly > enable
    _pComponent._on_changeStatus = function (status, value)
    {
        this._oldstatus = this._status;
        var applystatus = "enabled";

        this._statusmap[status] = value;
        var statusmap = this._statusmap;
        if (statusmap.disabled)
            applystatus = "disabled";
        else if (statusmap.mouseover)
            applystatus = "mouseover";
        else if (statusmap.focused)
            applystatus = "focused";
        else if (statusmap.deactivate)
        	applystatus = "deactivate";
        else if (statusmap.readonly && this._use_readonly_status)
        	applystatus = "readonly";

        //this._status = applystatus;
        this._status = this.on_changeStatus(status, value, applystatus, this._status, this._userstatus);

        //폼에서 마우스 다운후 드래그해서 버튼위로 올라갔을때
        if (this._status == "mouseover" && nexacro._cur_track_info)
            return;

        if (this._oldstatus != this._status)
            this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);

        //this._setAccessibilityStatFlag(this._status, this._userstatus);
    };


    //userstatus :  pushed > selectedreadonly >  selected > readonly,  
    _pComponent._changeUserStatus = function (changestatus, value)
    {
        return this._on_changeUserStatus(changestatus, value);
    };

    _pComponent.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
    {
        return applyuserstatus;
    };


    _pComponent._on_changeUserStatus = function (status, value)
    {
        this._olduserstatus = this._userstatus;
        var applystatus = "";

        this._userstatusmap[status] = value;
        var statusmap = this._userstatusmap;

        if (this._use_pushed_status && statusmap.pushed)
            applystatus = "pushed";
        else if (this._use_selected_status && statusmap.selected)
            applystatus = "selected";
        
        this._userstatus = this.on_changeUserStatus(status, value, applystatus, this._status, this._userstatus);
        if (this._olduserstatus != this._userstatus)
            this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);

        this._setAccessibilityStatFlag(this._status, this._userstatus);
    };

    _pComponent.on_apply_status = function (status, userstatus) { };
    _pComponent._on_apply_status = function (oldstatus, status, olduserstatus, userstatus)
    {
        if ((oldstatus != status) || (olduserstatus != userstatus))
            this.on_apply_status(status, userstatus);

        if (oldstatus != status)
        {
            var control_elem = this._control_element;
            if (control_elem)
                control_elem.setElementStatus(status);
        }

        if (olduserstatus != userstatus)
        {
            var control_elem = this._control_element;
            if (control_elem)
                control_elem.setElementUserStatus(userstatus);
        }
    };

    _pComponent._apply_status = function (oldstatus, status, olduserstatus, userstatus)
    {
        var form = this.parent;
        // parent에서 enable 설정 시, _real_enable check 안함
        var enable = (nexacro._is_enable_setting) ? this.enable : this.enable && this._real_enable;

        while (form != null)    // parent가 enable이 변경 -> this의 real_enable이 설정되기 전
        {
            if (!form._is_frame || (form._is_frame && !form._is_popup_frame))
            {
                if (form._is_subcontrol == false)
                {
                    if (form._real_enable == false || form.enable == false)
                    {
                        enable = false;
                        break;
                    }
                }
                form = form.parent;
            }
            else
            {
                break;
            }
        }
        if (this._setEnable(enable))
            return;

        this._apply_status_toelement(oldstatus, status, olduserstatus, userstatus);
    };

    _pComponent._apply_status_toelement = function (oldstatus, status, olduserstatus, userstatus)
    {
        var control_elem = this._control_element;
        if (this.visible && control_elem)
        {
            //disabled disabled_selected selected
            var multistatus = "";
            if (status != "enabled" && status && userstatus)
                multistatus = status + "_" + userstatus;

            var border = null;
            var padding = null;
            var edge = null;

            // multistatus >  status > userstatus > enabled ==>	change to //multistatus > disabled(status) > userstatus > status > enable
            var cssselector;
            if (multistatus)
            {
                cssselector = this._cssselector[multistatus];
                if (cssselector)
                {
                    border = cssselector.border;
                    padding = cssselector.padding;
                    edge = cssselector.edge;
                }
            }

            var disabled_status = false;
            if (status === "disabled")
            {
            	disabled_status = true;
            	cssselector = this._cssselector[status];
            	if (cssselector && (!border || !padding || !edge))
            	{
            		if (!border) border = cssselector.border;
            		if (!padding) padding = cssselector.padding;
            		if (!edge) edge = cssselector.edge;
            	}
            }

            if (userstatus)
            {
            	cssselector = this._cssselector[userstatus];
            	if (cssselector && (!border || !padding || !edge))
            	{
            		if (!border) border = cssselector.border;
            		if (!padding) padding = cssselector.padding;
            		if (!edge) edge = cssselector.edge;
            	}
            }

            if (!disabled_status && status != "enabled")
            {
                cssselector = this._cssselector[status];
                if (cssselector && (!border || !padding || !edge))
                {
                    if (!border) border = cssselector.border;
                    if (!padding) padding = cssselector.padding;
                    if (!edge) edge = cssselector.edge;
                }
            }
			
            var enableselector = this._cssselector["enabled"];
            if (!border) border = enableselector.border;
            if (!padding) padding = enableselector.padding;
            if (!edge) edge = enableselector.edge;

            control_elem.setElementCSSMapInfo(border, padding, edge);
            this._on_apply_status(oldstatus, status, olduserstatus, userstatus);
        }
    };

    //---------------------------------------------------------------
    // Style finder
    //---------------------------------------------------------------
    
    //basic id > cssclass > type
    //component : not supported id selector
    //cssclass > typename 
    //control : not supported cssclass selector 
    //

    //Static 
    //Static.UsrClass
    //StaticControl
    //StaticControl.UsrClass

    _pComponent._makeCSSMapInfo = function ()
    {
    	var findcssmap = [];
    	var typeselector = this.on_get_css_assumedtypename();

    	var mapfortypename = nexacro._dimension_maps[typeselector];
    	var mapfortypename_class;

    	if (mapfortypename)
    	{
    		var mapfortypename_self = mapfortypename.self;
    		if (mapfortypename_self)
    			findcssmap.push(mapfortypename_self);

    		mapfortypename_class = mapfortypename["class"];
    	}


    	var cssselectors = this._getClassCSSSelector();
    	if (mapfortypename_class && cssselectors)
    	{
    		var len = cssselectors.length;
    		var mapforclass;
    		for (var i = 0; i < len; i++)
    		{
    			var cssselector = cssselectors[i];
    			if (cssselector)
    			{
    				mapforclass = mapfortypename_class[cssselector.trim()];
    				if (mapforclass)
    				{
    					var mapforclass_self = mapforclass.self;
    					if (mapforclass_self)
    					{
    						findcssmap.push(mapforclass_self);
    					}
    				}
    			}
    		}
    	}

    	// id selector 
    	if (this._is_subcontrol && this.parent && this.parent._is_component)
    	{

    		var idselector = this._getIDCSSSelector();
    		if (idselector)
    		{
    			var searchmapdata;
    			var mapforid = nexacro._dimension_maps[idselector];
    			if (mapforid)
    			{
    				searchmapdata = [];
    				searchmapdata.push(mapforid);
    			}

    			if (mapforid)
    				this.parent._makeRefCSSMapInfo(findcssmap, searchmapdata, cssselectors);
    			/*  not support root idselector */
    		}
    	}

    	var pseudo, pitem;
    	var len = findcssmap.length;

    	this._cssselector = { enabled: {} };

    	var selector = this._cssselector;
    	for (var i = len - 1; i >= 0; i--)
    	{
    		var findselector = findcssmap[i];
    		for (var status in findselector)
    		{
    			if (!findselector.hasOwnProperty(status)) continue;
    			var item = findselector[status];
    			for (attr in item)
    			{
    				if (selector[status] && selector[status][attr]) continue;

    				if (!item.hasOwnProperty(attr)) continue;
    				pitem = item[attr];

    				if (!selector[status]) selector[status] = {};
    				selector[status][attr] = pitem;
    			}
    		}
    	}
    };

	/*  
    //.Grid .band .row .cell, .Grid .band .row .oddcell 
    //.Grid .band .row .cell.UserClass, .Grid .band .row .oddcell.UserClass
    //.Grid .band .row .cell .controledit - display   
    //.Grid .band .row .cell.UserClass .controledit, .Grid .band .row .oddcell.UserClass .controledit  - for display        
    //Grid .band .cell.UserClass .controledit
    //ListBox .listboxitem
    //ListBox .listboxitem.UserClass
    //ListBox.UserClass .listboxitem
    //ListBox.UserClass .listboxitem.UserClass

    // Grid .band .cell 
    // Grid .BandControl .cell -> 지원 안함 
    // TypeName id  id 
    // TypeName.Class id id 
    // TypeName id.Class id
    // TypeName.Class id.Class id 
    //sub_cssselectors : child의 cssclass
    */
    _pComponent._makeRefCSSMapInfo = function (cssmap, searchmapdata, sub_cssselectors)
    {
    	var typeselector = this.on_get_css_assumedtypename();
    	var idselector = this._getIDCSSSelector();
    	var cssselectors = this._getClassCSSSelector();

    	var mapforid_parent = searchmapdata.shift();
    	var findmaplist = [];
    	while (mapforid_parent)
    	{
    		var _mapforid_class = mapforid_parent["class"];
    		if (_mapforid_class && sub_cssselectors)
    		{
    			var len = sub_cssselectors.length;
    			for (var i = 0; i < len; i++)
    			{
    				var cssselector = sub_cssselectors[i];
    				if (cssselector)
    				{
    					mapforclass = _mapforid_class[cssselector.trim()];
    					if (mapforclass && mapforclass.parent)
    					{
    						var mapforclass_parent_id = mapforclass.parent[idselector];
    						if (mapforclass_parent_id)
    						{
    							findmaplist.push(mapforclass_parent_id);
    						}
    					}
    				}
    			}
    		}

    		var _mapforid_parent = mapforid_parent.parent;
    		if (_mapforid_parent)
    		{
    			var mapforid;
    			if (idselector)
    			{
    				mapforid = _mapforid_parent[idselector];
    				if (mapforid)
    				{
    					findmaplist.push(mapforid);
    					var mapforid_class = mapforid["class"];
    					if (mapforid_class && cssselectors)
    					{
    						var len = cssselectors.length;
    						for (var i = 0; i < len; i++)
    						{
    							var cssselector = cssselectors[i];
    							if (cssselector)
    							{
    								var mapforclass = mapforid_class[cssselector.trim()];
    								if (mapforclass)
    								{
    									findmaplist.push(mapforclass);
    								}
    							}
    						}
    					}
    				}

    			}

    			var mapfortypename = _mapforid_parent[typeselector];
    			var mapforclasses;
    			if (mapfortypename)
    			{
    				var mapfortypename_self = mapfortypename.self;
    				if (mapfortypename_self)
    				{
    					cssmap.push(mapfortypename_self);
    				}

    				mapforclasses = mapfortypename["class"];
    				if (mapforclasses && cssselectors)
    				{
    					var len = cssselectors.length;
    					for (var i = 0; i < len; i++)
    					{
    						var cssselector = cssselectors[i];
    						if (cssselector)
    						{
    							var mapforclass = mapforclasses[cssselector.trim()];
    							if (mapforclass && mapforclass.self)
    							{
    								cssmap.push(mapforclass.self);
    							}
    						}
    					}
    				}
    			}

    		}
    		mapforid_parent = searchmapdata.shift();
    	}

    	if (findmaplist.length > 0 && this.parent && this.parent._is_component)
    	{
    		this.parent._makeRefCSSMapInfo(cssmap, findmaplist, cssselectors);
    	}
    };
	
    /*
	_pComponent.on_apply_accessibility = function (accessibility)
	{
	    var control_elem = this._control_element;
	    if (control_elem && accessibility)
	    {
	        control_elem.setAccessibility(accessibility);

		}
	};
    */
    _pComponent.on_apply_rtlimagemirroring = function (rtlimagemirroring)
    {
        var control_elem = this._control_element;
        var img_elem = this._img_elem;

        if (this._isRtl())
        {
            if (control_elem && rtlimagemirroring)
            {
                control_elem.setElementImageMirror(rtlimagemirroring);

                //image style property 각 컴포넌트로 내려도 상관없음.
                if (img_elem)
                {
                    img_elem.setElementImageMirror(rtlimagemirroring);
                }
            }
        }
    };
    //---------------------------------------------------------------
    // custom Style applyers
    _pComponent.on_apply_padding = function (padding) { };
    _pComponent.on_apply_color = function (color) { };

    _pComponent.on_apply_glow = function (glow) { };
    _pComponent.on_apply_blur = function (blur) { };
    _pComponent.on_apply_custom_class = function () { };
    //---------------------------------------------------------------

    // custom property applyers
    _pComponent.on_apply_text = function () { };
    _pComponent.on_apply_expr = function () { };
	_pComponent.on_apply_prop_cssclass = function () { };

    _pComponent.on_apply_prop_enable = function (v)
    {
        if (this._is_scrollable == true)
        {
            if (this.vscrollbar)
                this.vscrollbar._setEnable(v);
            if (this.hscrollbar)
                this.hscrollbar._setEnable(v);
        }
    };

    _pComponent.on_apply_prop_class = function ()
    {
        // clear all style values, style finders
        if (this.vscrollbar)
            this.vscrollbar.on_apply_prop_class();
        if (this.hscrollbar)
            this.hscrollbar.on_apply_prop_class();

        this._onResetScrollBar();
        this._apply_status();
        this.on_apply_custom_class();
    };

    _pComponent.on_apply_prop_taborder = function ()
    {
        if (this.tabstop)
            this._setAccessibilityFlagFocusable(this._taborder >= 0 ? true : false);
    };

    _pComponent.on_apply_custom_setfocus = function (evt_name)
    {
        // 가장 말단 element에 focus 호출.
        var control_elem = this._control_element;
        if (control_elem)
        {
            var selffocus = ((evt_name == "lbutton") ? false : nexacro._enableaccessibility);
            control_elem.setElementFocus(selffocus);
        }
    };

    _pComponent.on_apply_prop_tooltip = function ()
    {
        var control_elem = this._control_element;
        if (control_elem && !this._is_subcontrol)
        {
            control_elem.setElementToolTip(this.tooltiptext, this.tooltiptype);
        }
    };

    _pComponent.on_apply_prop_rtldirection = function ()
    {
        //TODO : set direction attribute at Element's style.
        // calculate component layout.
        var control_elem = this._control_element;
        var rtldirection = this.rtldirection;

        if (control_elem)
        {
            control_elem.setElementDirection(rtldirection);
        }

        this._update_position(true, true);
    };

    //===============================================================
    // nexacro.Component : Component's Create & Update
    //===============================================================
    // this Function create Object's Inner Elements
    // -- All Componets overide this function

    _pComponent.on_create_contents = function () { };
    _pComponent.on_created_contents = function (_window) { };
    _pComponent.on_destroy_contents = function () { };

    _pComponent.on_created = function (_window)
    {
        if (!this._is_loading)
        {
            // showModal시 createComponent는 실패한채 created가 먼저 처리되는 문제가 있어
            // createComponent와 동일 조건으로 created를 방지함. 이 두 함수 모두 modal callback에서 다시 호출됨.
            var parent_elem = null;
            if (!this._is_window)
            {
                parent_elem = this.parent ? this.parent._control_element : null;
                if (!parent_elem)
                {
                    return false;
                }
            }

            //if (this._setpropinitfn)
            //	this._setpropinitfn(this);

            _window = _window || this._getWindow();
            var enable = this._isEnable();

            //처음 생성시에 enable = false인 경우에만 disable 이되도록 수정
            //set_enable _is_created 된후에만 real_enable 값 설정

            if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable))
            {
                this._real_enable = enable;
                this._changeStatus("disabled", !enable);
                this.on_apply_prop_enable(enable);
            }
            else
            {
                this._real_enable = enable;
            }

            //apply status to element
            if (this._status || this._userstatus)
                this._apply_status_toelement("", this._status, "", this._userstatus);

            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.create(_window);
                if (!control_elem.handle)
                    return;
            }

            if (!this._is_subcontrol)
                this._registerHotkey();

            if (this._is_created != true)
                this.on_created_contents(_window);

            this._is_created = true;
        }
    };

    // for innerHTML/innerInfo;
    _pComponent._is_create_commandstr = false;
    _pComponent.createCommand = function ()
    {
        var str = "";
        if (!this._is_loading)
        {
        	//if (this._setpropinitfn)
        	//	this._setpropinitfn.call(this);

            // showModal시 createComponent는 실패한채 created가 먼저 처리되는 문제가 있어
            // createComponent와 동일 조건으로 created를 방지함. 이 두 함수 모두 modal callback에서 다시 호출됨.

            //처음 생성시에 enable = false인 경우에만 disable 이되도록 수정
            //set_enable _is_created 된후에만 real_enable 값 설정
            var enable = this._isEnable();

            if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable))
            {
                this._real_enable = enable;
                this._changeStatus("disabled", !enable);
                this.on_apply_prop_enable(enable);
            }
            else
            {
                this._real_enable = enable;
            }

            if (this._status || this._userstatus)
                this._apply_status_toelement("", this._status, "", this._userstatus);


            var control_elem = this._control_element;
            if (control_elem)
            {
                var str = control_elem.createCommandStart();
                if (str)
                {
                    str += this.on_create_contents_command();
                    str += control_elem.createCommandEnd();
                }
            }

           
            if (!this._is_subcontrol)
                this._registerHotkey();

            this._is_create_commandstr = true;
        }
        return str;
    };

    _pComponent.attachHandle = function (win)
    {
        if (!this._is_created && this._is_create_commandstr)
        {
            var control_elem = this._control_element;
            if (control_elem)
                control_elem.attachHandle(win);
            this.on_attach_contents_handle(win);

            this._is_created = true;
        }
    };

    _pComponent.on_create_contents_command = function ()
    {
        return "";
    };


    _pComponent.on_attach_contents_handle = function (_doc)
    {
    };


    _pComponent._setPropInitFunc = function (fn)
    {
    	this._setpropinitfn = fn;
    };

    _pComponent.on_change_containerPos = function (left, top) { };
    _pComponent.on_change_containerRect = function (width, height)
    {
        this._onResetScrollBar();
    };

    _pComponent.on_create_normal_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.ControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_scrollable_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.ScrollableControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_frame_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.FrameControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_tablecell_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.CellControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_popup_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.ControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_popupscrollable_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.ScrollableControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_band_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.BandControlElement(parent_elem, this._is_band_vert_paging);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    _pComponent.on_create_area_scroll_control_element = function (parent_elem)
    {
        var control_elem = new nexacro.ScrollableAreaControlElement(parent_elem);
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };

    _pComponent.on_create_control_element = function (parent_elem)
    {
        // create
        var control_elem = null;

        if (this._is_tablecell)
        {
            control_elem = this.on_create_tablecell_control_element(parent_elem);
        }
        else if (this._is_frame)
        {
            control_elem = this.on_create_frame_control_element(parent_elem);
        }
        else if (this._is_scrollable)
        {
            control_elem = this.on_create_scrollable_control_element(parent_elem);
        }
        else if (this._is_band_control)
        {
            control_elem = this.on_create_band_control_element(parent_elem);
        }
        else if (this._is_area_scroll)
        {
            this._is_scrollable = true;
            control_elem = this.on_create_area_scroll_control_element(parent_elem);
        }
        else if (this._is_popup_control)
        {
            control_elem = this.on_create_popup_control_element(parent_elem);
        }
        else
        {
            control_elem = this.on_create_normal_control_element(parent_elem);
        }

        return control_elem;
    };


    //---------------------------------------------------------------
    _pComponent.createComponent = function (bCreateOnly)
    {
        var parent_elem = null;
        if (!this._is_window)
        {
            parent_elem = this.parent ? this.parent._control_element : null;
            if (!parent_elem)
            {
                return false;
            }
        }
       // trace("omponent.createComponent:" + this.id + " parent.name:" + this.parent._unique_id);
        this._on_apply_setpropinitfn();
        // create
        var control_elem = this._control_element;
        if (!control_elem)
        {
            control_elem = this.on_create_control_element(parent_elem);
            if (this._is_nc_control)
            {
                control_elem._is_nc_element = true;
            }

            this._initControl(control_elem);
            this._initContents(control_elem);

            // init contents
            // stock properties update <-- this is not style

            if (this._taborder >= 0)
                this.on_apply_prop_taborder();
            if (this.tooltiptext)
                this.on_apply_prop_tooltip();

            if (nexacro._enableaccessibility)
                this.on_apply_accessibility();

            this.on_apply_positionstep(this.positionstep);

            if (this._hittest_type)
            {
            	control_elem.setElementHittestType(this._hittest_type);
            }

            if (!bCreateOnly && parent_elem && parent_elem.handle)
            {
                var window = this._getWindow();
                this.on_created(window);
            }
        }

        return true;
    };

    _pComponent.destroyComponent = function ()
    {
        if (!this._is_alive)
            return;

        this._is_alive = false;
        if (!this._is_subcontrol)
            this._unregisterHotkey();

        if (nexacro._enableaccessibility)
        {
			var application = nexacro.getApplication();
            if (application && application._accessibilityHistoryList)
            {
                application._remove_accessibility_history(this);
            }
        }

        if (this._setpropinitfn)
        {
        	this._setpropinitfn = null;
        	delete this._setpropinitfn;
        }

        this._clearEventListeners();
        this._removeBasedList();
       

        if (this.parent && this.parent.removeChild)
        {
            this.parent.removeChild(this.id);
        }
        else
        {
            var win = this._getWindow();
            if (win)
                win._removeFromCurrentFocusPath(this);
        }
        if (this._control_element)
        {
            this._control_element.destroy();
            this._control_element = null;
        }

        if (this.vscrollbar)
        {
            this.vscrollbar.destroy();
            this.vscrollbar = null;
        }
        if (this.hscrollbar)
        {
            this.hscrollbar.destroy();
            this.hscrollbar = null;
        }

        this.on_destroy_contents();

        this._is_created = false;

        if (this._refform)
            this._refform = null;
        if (this.parent)
            this.parent = null;
        if (this._refobj)
            this._refobj = null;

        if (this.hotkey)
            this.hotkey = null;
        if (this.rtldirection)
            this.rtldirection = null;

        if (this._event_list)
            this._event_list = null;
        if (this._last_focused)
            this._last_focused = null;
        if (this._cssselector)
        	this._cssselector = null;
        if (this._based_list)
        	this._based_list = null;

        this._clearStyleObject();

        return true;
    };

    _pComponent._clearStyleObject = function ()
    {
    	if (this._color)
    		this._color = null;
    	if (this._font)
    		this._font = null;
    	if (this._lineheight)
    		this._lineheight = null;
    	if (this._wordspacing)
    		this._wordspacing = null;
    	if (this._letterspacing)
    		this._letterspacing = null;
    	if (this._textdecoration)
    		this._textdecoration = null;
    	if (this._borderradius)
    		this._borderradius = null;
    	if (this._border)
    		this._border = null;
    	if (this._background)
    		this._background = null;
    	if (this._edge)
    		this._edge = null;
    	if (this._cursor)
    		this._cursor = null;
    	if (this._opacity)
    		this._opacity = null;
    	if (this._boxshadow)
    		this._boxshadow = null;
    	if (this._padding)
    		this._padding = null;
    };

    _pComponent._on_apply_setpropinitfn = function ()
    {
    	if (this._setpropinitfn)
    	{
    		this._setpropinitfn.call(this, this);
    		this._setpropinitfn = null;
    		delete this._setpropinitfn;
    	}
    };

    //element classname 
    _pComponent.on_apply_cssselector = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
		{
			// typename
            control_elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());

			//id
			if (this._is_subcontrol)
			{
				// .Tab .spinbutton and Spin .spinbutton distinction
				//  Tab을 포함한 Form Component에 한해 바로 하위의 subcontrol 만 id 변경해서 처리 
				// .Tab .spinbuttonTab
				// .Tab .tabbuttonitemTab .extrabutton
				// .Tab .tabpageTab 
				// .Tab.CLSA .spinbuttonTabCLSA 
				//  tab multiclass : .Tab .spinbuttonTabCLSA .spinbuttonTabCLSB
				// .Div .vscrollbarDiv .incbutton
                // .VScrollBarControl .incbutton
				var idselector = this.on_getIDCSSSelector();
				if (this.parent && !this.parent._is_subcontrol && this.parent._is_containerset)
				{
					var parentidselector = idselector = idselector + this.parent.on_get_css_assumedtypename();
					var parentcssclass = this.parent._getClassCSSSelector();
					if (parentcssclass)
					{
						var len = parentcssclass.length;						
						idselector = "";
						for (var i = 0; i < len; i++)
						{
							idselector += parentidselector + parentcssclass[i] + " ";
						}
					}
					else
					{
						idselector = parentidselector;
					}
				}

				control_elem.setElementIDCSSSelector(idselector);
			}
            else
			{
			    control_elem.setElementIDCSSSelector(this._getIDCSSSelector());
			}

            //cssclass
			var cssclass = this._getClassCSSSelector();
			if (cssclass)
			    control_elem.setElementClassCSSSelector(cssclass.join(" "));
			else
			    control_elem.setElementClassCSSSelector("");
        }

    };


	//_pComponent.on_apply_typename = function () { };
	//_pComponent._on_apply_typename = function ()
	//{
	//	var control_elem = this._control_element;
	//	if (control_elem)
	//	{
	//		control_elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());
	//		this._makeCSSMapInfo();
	//		var enabledselector = this._cssselector.enabled;
	//		if (enabledselector)
	//		{
	//			control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);
	//		}

	//		if (this._is_scrollable)
	//		{
	//			if (this.vscrollbar)
	//				this.vscrollbar.on_apply_prop_class();
	//			if (this.hscrollbar)
	//				this.hscrollbar.on_apply_prop_class();

	//			this._onResetScrollBar();
	//		}
	//		this.on_apply_typename();
	//	}
	//};

    _pComponent.on_getIDCSSSelector = function ()
    {
        return this.name;
    };

    //class selector 
    
    _pComponent._getClassCSSSelector = function ()
    {
    	var cssclassselector = this.cssclass || this._cssclass_expr;
    	//var expr = this._cssclass_exprfn;
    	//if (this._is_created && expr)
    	//{	
    	//	try
    	//	{
    	//		cssclassselector = nexacro._toString(expr.call(null, this));
    	//	}
    	//	catch (e)
    	//	{
    	//	}
    	//	this._cssclass_exprfn = null;
    	//	this._cssclass_expr = cssclassselector;
        //}
        //is_popup
    	if (this._isPopupContains())
    	{
    	    cssclassselector = this._getPopupContainerCSSSelector();
    	}

    	if (cssclassselector)
            return cssclassselector.trim().split(",");  //multi class 
        return "";
    };

    //id selector 
    _pComponent._getIDCSSSelector = function ()
    {
        if (this._is_subcontrol)
            return this.on_getIDCSSSelector();

        return "";
    };

	_pComponent._on_apply_prop_cssclass = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
        	var cssclassselector;
        	var expr = this._cssclass_exprfn;
        	if (expr)
        	{
        		try
        		{
        			cssclassselector = nexacro._toString(expr.call(null, this));
        		}
        		catch (e)
        		{
        		}
        		this._cssclass_exprfn = null;
        		this._cssclass_expr = cssclassselector;
        	}

        	cssclassselector = this._getClassCSSSelector();
			if (cssclassselector)
				control_elem.setElementClassCSSSelector(cssclassselector.join(" "));
            else
			    control_elem.setElementClassCSSSelector("");

			this._makeCSSMapInfo();
			var enabledselector = this._cssselector.enabled;
			if (enabledselector)
			{
				control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);
			}

			if (this._is_scrollable)
			{
				if (this.vscrollbar)
					this.vscrollbar.on_apply_prop_class();
				if (this.hscrollbar)
					this.hscrollbar.on_apply_prop_class();

				this._onResetScrollBar();
			}
        }

		this.on_apply_prop_cssclass();
    };

    _pComponent.on_apply_prop_id = function ()
    {
        if (this._is_subcontrol)
        {
            var idselector = this.on_getIDCSSSelector();
            var control_elem = this._control_element;
            if (control_elem)
                control_elem.setElementIDCSSSelector(idselector);
        }
    };

    _pComponent._makeStatusMap = function ()
    {
    	this._statusmap = { disabled: false, mouseover: false, focused: false, deactivate: false };
    	if (this._use_readonly_status)
    		this._statusmap.readonly = false;

        this._userstatusmap = {};
        if (this._use_pushed_status)
            this._userstatusmap.pushed = false;

        if (this._use_selected_status)
            this._userstatusmap.selected = false;
    };

    _pComponent._initCSSSelector = function ()
    {
        this.on_apply_cssselector();
		this._makeCSSMapInfo();

		this._is_initcssselector = true;
    };

    _pComponent._initControl = function (control_elem)
    {
    	var visible = this.visible;
    	if (!this.visible)
    		control_elem.setElementVisible(false);
    	else
    		control_elem.setElementVisible(true);

    	// update Maps
		if (!this._is_initcssselector)
    		this._initCSSSelector();

    	var enabledselector = this._cssselector.enabled;
    	if (enabledselector)
    		control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);

    	if (this.parent)
    	{
    		this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth() || this.parent._init_width, this.parent._getClientHeight() || this.parent._init_height);
    	}
    	else
    	{
    		this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
    	}

    	control_elem.setElementPosition(this._adjust_left, this._adjust_top);
    	control_elem.setElementSize(this._adjust_width, this._adjust_height);

    	this._initNormalStyleProprty(control_elem);

    };


	//color
	//font
	//line-height
	//word-spacing
	//letter-spacing
    _pComponent._getCurrentStyleInheritValue = function (prop, status, userstatus)
    {
    	if (this[prop])
    	{
    		switch(prop)
    		{
    			case "font":
    				return this._getSettedFontObject();
    			case "color":
    				return this._getSettedColorObject();
    			case "lineHeight":
    				return this._getSettedLineHeightObject();
    			case "wordSpacing":
    				return this._getSettedWordSpacingObject();
    			case "letterSpacing":
    				return this._getSettedLetterSpacingObject();
    			default:
    				return this["_" + prop];
    		}
    	}

        if (prop == "font")
        {
            var value = this._getCSSStyleValue(prop, status, userstatus);
            if (!value)
            {
                if (this.parent && this.parent._is_component)
                {
                    value = this.parent._getCurrentStyleInheritValue(prop, status, userstatus);
                }
                else
                {
                    value = nexacro._getSystemFont();
                }
            }
        }

    	return value;
    };

    _pComponent._getCSSStyleValue = function (prop, status, userstatus)
    {
    	if (status === undefined) status = this._status;
    	if (userstatus === undefined) userstatus = this._userstatus;

        var multistatus = "";
        if (status != "enabled" && status && userstatus) multistatus = status + "_" + userstatus;

        var cssselector;
        if (multistatus && this._cssselector[multistatus])
        {
        	cssselector = this._cssselector[multistatus];
        	if (cssselector && cssselector[prop])
        	{
        		return cssselector[prop];
        	}
        }

        var disabled_status = false;
        if (status === "disabled" && this._cssselector[status])
        {
        	disabled_status = true;
        	value = this._cssselector[status][prop];
        	if (value) return value;
        }

        if (userstatus && this._cssselector[userstatus])
        {
        	value = this._cssselector[userstatus][prop];
        	if (value) return value;
        }

        if (!disabled_status && this._cssselector[status])
        {
            value = this._cssselector[status][prop];
            if (value) return value;
        }

        return this._cssselector["enabled"][prop];
    };

    _pComponent._getCSSSelector = function ()
    {
        return this._cssselector;
    };

    _pComponent._initNormalStyleProprty = function (control_elem)
    {
        //// apply to control Element
        //form inherit 
        //color
        //font
        //line-height
        //word-spacing
        //letter-spacing

        //textDecoration -- no inherit : apply to child Element : controlElement
        // white-space, word-break, word-wrap : 묶음처리 -- inherit : but apply to child Element
        //borderRadius
        //border
        //background        
        //margin
        //padding -- no inherit 
        //cursor
        //opacity
        //boxShadow

        //// no inherit : apply to child Element

        // common styles - this inheteted --> apply to ControlElement : inherit to Child
        //
        if (this._color)
            control_elem.setElementColor(this._color);
        if (this._font)
            control_elem.setElementFont(this._font);
    	//if (this.wordWrap) // this css set
    	//    control_elem.setElementWordWrap(this.wordWrap);
        if (this._lineheight)
            control_elem.setElementLineHeight(this._lineheight);
        if (this._wordspacing)
            control_elem.setElementWordSpacing(this._wordspacing);
        if (this._letterspacing)
        	control_elem.setElementLetterSpacing(this._letterspacing);

        // no inherit : apply to Child Element
        //if (this.textDecoration)
        //	control_elem.setElementTextDecoration(this.textDecoration);

        if (this._borderradius)
            control_elem.setElementBorderRadius(this._borderradius);
        if (this._border)
            control_elem.setElementBorder(this._border);

        if (this._background)
            control_elem.setElementBackground(this._background);

        //if (this.margin)
        //	control_elem.setElementMargin(this.margin);
        // no inherit : but ControlElement has falgs && apply to child Element
        if (this._padding)
            control_elem.setElementPadding(this._padding);

        if (this._cursor)
            control_elem.setElementCursor(this._cursor);
        if (this._opacity)
            control_elem.setElementOpacity(this._opacity);
        if (this._boxshadow)
            control_elem.setElementBoxShadow(this._boxshadow);

        if (this._edge)
            control_elem.setElementEdge(this._edge);

        if (this.tooltiptext)
            control_elem.setElementToolTip(this.tooltiptext);

        //if (this.positionstep > -1)
        //    control_elem.setElementPositionStep(this.positionstep);

    };

    _pComponent.set_hittesttype = function (hittesttype)
    {
    	if (this._hittest_type != hittesttype)
    	{
    		this._hittest_type = hittesttype;
    		this.on_apply_hittesttype(hittesttype);
    	}
    };

    _pComponent.on_apply_hittesttype = function (hittesttype)
    {    	
    	var control_elem = this._control_element;
    	if (control_elem)
    		control_elem.setElementHittestType(hittesttype);
    };

    _pComponent._isEnableRedraw = function ()
    {
        var comp = this._getFromComponent(this);
        return comp.enableredraw;
    };



    _pComponent.set_accessibilityrole = function (accessibilityrole)
    {
        if (this.accessibilityrole != accessibilityrole)
        {
            this.accessibilityrole = accessibilityrole;
            this.on_apply_prop_accessibilityrole();
        }
    };

    _pComponent.set_accessibilityenable = function (accessibilityenable)
    {
        var accenable = nexacro._toBoolean(accessibilityenable);
        if (this.accessibilityenable != accenable)
        {
            this.accessibilityenable = accenable;
            this.on_apply_prop_accessibilityenable();
        }
    };

    _pComponent.set_accessibilitylabel = function (accessibilitylabel)
    {
        if (this.accessibilitylabel != accessibilitylabel)
        {
            this.accessibilitylabel = accessibilitylabel;
            this.on_apply_prop_accessibilitylabel();
        }
    };

    _pComponent.set_accessibilitydescription = function (accessibilitydescription)
    {
        if (this.accessibilitydescription != accessibilitydescription)
        {
            this.accessibilitydescription = accessibilitydescription;
            this.on_apply_prop_accessibilitydescription();
        }
    };

    //role
    //label
    //enable
    //description
    //action
    //desclevel
    _pComponent.on_apply_accessibility = function ()
    {
        this.on_apply_prop_accessibilityrole();
        this.on_apply_prop_accessibilityenable();
        this.on_apply_prop_accessibilitylabel();
        this.on_apply_prop_accessibilitydescription();
        this.on_apply_prop_accessibilityaction();
        this.on_apply_prop_accessibilitydesclevel();

    };

    _pComponent.set_accessibilityaction = function (accessibilityaction)
    {
        if (this.accessibilityaction != accessibilityaction)
        {
            this.accessibilityaction = accessibilityaction;
            this.on_apply_prop_accessibilityaction();
        }
    };

    _pComponent.set_accessibilitydesclevel = function (accessibilitydesclevel)
    {
        if (this.accessibilitydesclevel != accessibilitydesclevel)
        {
            this.accessibilitydesclevel = accessibilitydesclevel;
            this.on_apply_prop_accessibilitydesclevel();
        }
    };

    _pComponent.on_apply_prop_accessibilityrole = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityRole(this._getAccessibilityRole());
    };

    _pComponent.on_apply_prop_accessibilityenable = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityEnable(this.accessibilityenable);
    };

    _pComponent.on_apply_prop_accessibilitylabel = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityLabel(this._getAccessibilityLabel());
    };

    _pComponent.on_apply_prop_accessibilitydescription = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityDescription(this._getAccessibilityDescription());
    };

    _pComponent.on_apply_prop_accessibilityaction = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityAction(this._getAccessibilityAction());
    };

    _pComponent.on_apply_prop_accessibilitydesclevel = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
            this._setAccessibilityDescLevel(this._getAccessibilityDescLevel());
    };

    _pComponent._initContents = function (control_elem, pseudo)
    {
        // apply to Inner Elements
        // create contents

        this.on_create_contents();
        this._is_created_contents = true;
        this._is_loading = false;
    };

    _pComponent._updateControl = function (control_elem)
    {
        //trace("_updateControl"); //for check
        // TODO : _control_pseudo real pseudo string
        //visible = false 인경우 currentstyle 값이 update가 안되는 현상이 있음
        if (!this._isEnableRedraw()) return;
        //if (nexacro._cur_track_info && pseudo == "mouseover") return;

        if (control_elem)
        {
            //this._updateClientSize(control_elem);
        }
    };



    _pComponent._getClientWidth = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            return control_elem.getClientWidth();
        }
        return 0;
    };

    _pComponent._getClientHeight = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            return control_elem.getClientHeight();
        }
        return 0;
    };

    _pComponent._getClientLeft = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
        	return control_elem.getClientLeft();
        }
        return 0;
    };

    _pComponent._getClientTop = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
        	return control_elem.getClientTop();
        }
        return 0;
    };

    _pComponent._getScrollWidth = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            if (this._is_scrollable)
                return this._getClientWidth();

            return control_elem.getElementScrollWidth();
        }
        return 0;
    };

    _pComponent._getScrollHeight = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            if (this._is_scrollable)
                return this._getClientHeight();

            return control_elem.getElementScrollHeight();
        }
        return 0;
    };

    _pComponent._getScrollLeft = function ()
    {
        if (!this._is_scrollable)
            return 0;

        var control_elem = this._control_element;
        if (control_elem)
        {
            return control_elem.getElementScrollLeft();
        }
        return 0;
    };

    _pComponent._getScrollTop = function ()
    {
        if (!this._is_scrollable)
            return 0;

        var control_elem = this._control_element;
        if (control_elem)
        {
            return control_elem.getElementScrollTop();
        }
        return 0;
    };

    _pComponent._getCurrentStylePadding = function ()
    {
    	var control_elem = this._control_element;
    	if (control_elem)
    	{
    		return control_elem.padding ? control_elem.padding : control_elem._padding_info;
    	}
    	return undefined;
    };

    _pComponent._getCurrentStyleBorder = function ()
    {
    	var control_elem = this._control_element;
    	if (control_elem)
    	{
    		return control_elem.border ? control_elem.border : control_elem._border_info;
    	}
    	return undefined;
    };

    _pComponent._getCurrentStyleEdge = function ()
    {
    	var control_elem = this._control_element;
    	if (control_elem)
    	{
    		return control_elem.edge ? control_elem.edge : control_elem._edge_info;
    	}
    	return undefined;
    };

    _pComponent._getSettedColorObject = function ()
    {
    	return this._color;
    };

    _pComponent._getSettedFontObject = function ()
    {
    	return this._font;
    };

    _pComponent._getSettedLineHeightObject = function ()
    {
    	return this._lineheight;
    };

    _pComponent._getSettedWordSpacingObject = function ()
    {
    	return this._wordspacing;
    };

    _pComponent._getSettedLetterSpacingObject = function ()
    {
    	return this._letterspacing;
    };

    _pComponent._getSettedTextDecorationObject = function ()
    {
    	return this._textdecoration;
    };

    _pComponent._getSettedBorderRadiustObject = function ()
    {
    	return this._borderradius;
    };

    _pComponent._getSettedBorderObject = function ()
    {
    	return this._border;
    };

    _pComponent._getSettedBackgroundObject = function ()
    {
    	return this._background;
    };

    _pComponent._getSettedEdgeObject = function ()
    {
    	return this._edge;
    };

    _pComponent._getSettedCursorObject = function ()
    {
    	return this._cursor;
    };

    _pComponent._getSettedOpacityObject = function ()
    {
    	return this._opacity;
    };

    _pComponent._getSettedBoxShadowObject = function ()
    {
    	return this._boxshadow;
    };

    _pComponent._applyZoomPopup = nexacro._emptyFn;

    //---------------------------------------------------------------
    // Component's position properties
    _pComponent.on_update_position = function (resize_flag, move_flag)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPosition(this._adjust_left, this._adjust_top);
            control_elem.setElementSize(this._adjust_width, this._adjust_height);
            //this._updateClientSize(control_elem);
            if (move_flag)
            {
                this.on_fire_onmove(this._adjust_left, this._adjust_top);
            }
            if (resize_flag)
            {
                this.on_fire_onsize(this._adjust_width, this._adjust_height);
            }
            if (!this._cross_base)
            {
                if (this._based_list && this._based_list.length > 0)
                {
                    this._update_based_position();
                }
            }
        }
    };

    _pComponent._update_based_position = function ()
    {
        var bsize, bmove;
        var listLength = this._based_list.length;
        var listIndex;
        for (listIndex = 0; listIndex < listLength; listIndex++)
        {
            var comp = this._getFormChildById(this._based_list[listIndex]);
            //상호참조 지정 가능
            // - 값이 같으면 해당 값 사용
            // - 값이 다르면 큰값 사용
            // - 미지정값/숫자가 아닌값은 가장작은값 처리
            if (comp)
            {
                var old_left = comp._adjust_left;
                var old_top = comp._adjust_top;
                var old_width = comp._adjust_width;
                var old_height = comp._adjust_height;

                if (comp.parent)
                {
                    var pcontrol_element = comp.parent.getElement();
                    var pclient_width = pcontrol_element ? pcontrol_element.client_width : 0;
                    var pclient_height = pcontrol_element ? pcontrol_element.client_height : 0;
                    comp._adjustPosition(comp.left, comp.top, comp.right, comp.bottom, comp.width, comp.height, pclient_width, pclient_height);
                }
                else
                    comp._adjustPosition(comp.left, comp.top, comp.right, comp.bottom, comp.width, comp.height, 0, 0);

                if (comp._adjust_width != old_width || comp._adjust_height != old_height)
                {
                    bsize = true;

                    if (old_width == 0 || old_height == 0)
                        update = true;
                }
                if (comp._adjust_left != old_left || comp._adjust_top != old_top)
                {
                    bmove = true;
                }

                //- 순환지정으로 재계산시
                //자신으로 재계산이 돌아오면
                //순환계산을 정지

                this._cross_base = true;
                comp.on_update_position(bsize, bmove);
                this._cross_base = false;
            }
        }
    };

    _pComponent._applysetPosition = function (left, top, width, height)
    {
        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;

        this._adjustPosition(left, top, null, null, width, height, this.parent._getClientWidth(), this.parent._getClientHeight());

        var control_elem = this._control_element;

        if (control_elem)
        {
            control_elem.setElementPosition(this._adjust_left, this._adjust_top);
            control_elem.setElementSize(this._adjust_width, this._adjust_height);

            if (old_left != this._adjust_left || old_top != this._adjust_top)
            {
                this.on_fire_onmove(this._adjust_left, this._adjust_top);
            }
            if (old_width != this._adjust_width || old_height != this._adjust_height)
            {
                this.on_fire_onsize(this._adjust_width, this._adjust_height);
            }
        }
    };

    _pComponent.set_positionstep = function (v)
    {
        if (v === "" || v === null || v === undefined)
        {
            v = 0;
        }
        else
        {
            v = parseInt(v) | 0;
        }

        if (this.positionstep !== v)
        {
            this._beforepositionstep = this.positionstep;
            this.positionstep = v;
            this.on_apply_positionstep(v);
        }
    };

    _pComponent.on_apply_positionstep = function (index)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (index == null)
            {
                index = 0;
            }
            control_elem.setElementPositionStep(index);
        }
    };


    //---------------------------------------------------------------
    _pComponent.set_cssclass = function (cssname)
    {
        if (this.cssclass != cssname)
        {
            this.cssclass = cssname;			
            var cssclass = new nexacro.BindableValue();
            cssclass._set(cssname);
            this._cssclass = cssclass;
            if (cssclass._bindtype == 2)
            	this._cssclass_exprfn = this._makeExprFn(cssclass._value);

			this._on_apply_prop_cssclass();
        }
    };

    

    //---------------------------------------------------------------
    // text & expr
    _pComponent.set_name = function (v)
    {
        var based_comp = null;
        var old_name = this.name;
        var new_val = null;

        for (var i in this._based_list)
        {
            based_comp = this._getFormChildById(this._based_list[i]);

            if (based_comp)
            {
                if (based_comp.leftbase && based_comp.leftbase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.leftbase.replace(old_name, v);
                    based_comp._leftbase_component_id = v;
                    based_comp.leftbase = new_val;
                }
                if (based_comp.topbase && based_comp.topbase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.topbase.replace(old_name, v);
                    based_comp._topbase_component_id = v;
                    based_comp.topbase = new_val;
                }
                if (based_comp.rightbase && based_comp.rightbase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.rightbase.replace(old_name, v);
                    based_comp._rightbase_component_id = v;
                    based_comp.rightbase = new_val;
                }
                if (based_comp.bottombase && based_comp.bottombase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.bottombase.replace(old_name, v);
                    based_comp._bottombase_component_id = v;
                    based_comp.bottombase = new_val;
                }
                if (based_comp.widthbase && based_comp.widthbase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.widthbase.replace(old_name, v);
                    based_comp._widthbase_component_id = v;
                    based_comp.widthbase = new_val;
                }
                if (based_comp.heightbase && based_comp.heightbase.indexOf(old_name) > -1)
                {
                    new_val = based_comp.heightbase.replace(old_name, v);
                    based_comp._heightbase_component_id = v;
                    based_comp.heightbase = new_val;
                }
            }
        }
        this.name = v;
    };

    // text properties
    _pComponent.set_text = function (v)
    {
        var val = nexacro._toString(v);
        if (val)
        {
            if (this.text == null || this.text != val)
            {
                this.text = val;
                this._on_apply_text(val);
            }
        }
        else
        {
            if (this.text)
            {
                this.text = "";
                this._on_apply_text("");
            }
        }
    };

    // expr properties
    _pComponent.set_expr = function (v)
    {
        var val = nexacro._toString(v);
        if (val != this.expr)
        {
            this.expr = val;
            this._on_apply_expr(val);
        }
    };

    _pComponent._on_apply_text = function (text)
    {
        var exprfn = this._expr_fn;
        if (exprfn)
        {
            try
            {
                text = nexacro._toString(exprfn.call(null, this));
            }
            catch (e)
            {
            }
        }
        this._displaytext = text;
        this.on_apply_text(text);
    };

    _pComponent._makeExprFn = function (expr)
    {
        expr = expr.trim().split(":");
        var len = expr.length;
        var parser = new nexacro.ExprParser();
        var conv_expr, exprfn;
        var str;

        if (len == 1)
        {
            str = expr[0];
        }
        else
        {
            if (expr[0].trim().toUpperCase() != "EXPR")
            {
                str = expr.join(":");
            }
            else
            {
                str = expr.slice(1).join(":");
            }
        }

        conv_expr = parser.makeExpr(this, str);
        exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);
        return exprfn;
    };

    _pComponent._on_apply_expr = function (expr)
    {
        if (expr)
        {
            this._expr_fn = null;
            this._expr_fn = this._makeExprFn(expr);
            this._on_apply_text(this.text);
        }
        else
        {
            this._expr_fn = null;
            this._on_apply_text(this.text);
        }
    };

    //---------------------------------------------------------------
    _pComponent.set_visible = function (v)
    {
        if (v === undefined || v === null) return;

        var control_elem = this._control_element;
        v = nexacro._toBoolean(v);
        if (this.visible != v)
        {
            // Visible/Enable AutoFocus
            var _window = this._getWindow();
            var newfocus_comp;
            if (!v && this._is_created && this.parent)
            {
                if (_window && _window._indexOfCurrentFocusPaths(this) > -1)
                {
                    // Focus가 넘어갈 대상을 미리 탐색 (visible flag가 바뀌면 결과가 다름)
                    var _form = this._getForm();
                    var cur_tabstop = this.tabstop;
                    this.tabstop = false;
                    newfocus_comp = _form._searchNextTabFocus();
                    this.tabstop = cur_tabstop;
                }
            }

            this.visible = v;
            if (control_elem)
            {
                control_elem.setElementVisible(v);
                this._setAccessibilityStatHidden(v);


                if (this.visible)
                {
                    // 동적으로 컴포넌트 생성시, show,hide시 Scroll이 자동으로 갱신되면 안됨. 
                    // 필요한 경우 사용자가 resetScroll 호출.

                    // display=none인 경우 DOM값을 세팅해도 세팅되지 않는 문제때문에 
                    // 나타나는 순간에 값을 갱신해줘야 함. (하위 모두 적용이 안됐으므로 재귀호출)

                    // Visible/Enable AutoFocus
                    var parent = this.parent;
                    if (!this._is_subcontrol && this._is_created && parent && parent._is_created)
                    {
                        // Parent가 최종 포커스인 상태에서 Hidden이던 Child가 다시 나타나면 포커스
                        if (_window && _window._focus_list && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1)
                        {
                            this._on_focus(true);
                        }
                    }
                    this._apply_status();
                }
                else
                {
                    // Focus된 컴포넌트가 사라지는 Case처리 
                    var parent = this.parent;

                    // Visible/Enable AutoFocus
                    if (!this._is_subcontrol && parent)
                    {
                        if (_window && _window._indexOfCurrentFocusPaths(this) > -1)
                        {
                            // 임시스펙 FocusComp가 사라지면 Tab키 누른것처럼 다음 컴포넌트가 포커스 
                            _window._removeFromCurrentFocusPath(this, false);
                            if (newfocus_comp && newfocus_comp[0])
                                newfocus_comp[0]._on_focus(true);
                        }
                    }
                }
            }
        }
    };

    nexacro._is_enable_setting = false; //set_enable, _setEnable 진입 구분
    _pComponent._getParentEnable = function (v)
    {
    	return this.parent._real_enable;
    };

    _pComponent.set_enable = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.enable != v)
        {
            // Visible/Enable AutoFocus
            var _window = this._getWindow();
            var newfocus_comp;
            if (!this._is_subcontrol && !v && this._is_created && this.parent)
            {
                if (_window && _window._indexOfCurrentFocusPaths(this) > -1)
                {
                    // Focus가 넘어갈 대상을 미리 탐색 (enable flag가 바뀌면 결과가 다름)
                    var _form = this._getForm();
                    var cur_tabstop = this.tabstop;
                    this.tabstop = false;
                    newfocus_comp = _form._searchNextTabFocus();
                    this.tabstop = cur_tabstop;
                }
            }

            var control_elem = this._control_element;
            this.enable = v;

            if (this._is_created)
            {
            	var enable_flag = (this._getParentEnable() && v);
                if (this._real_enable != enable_flag)
                {
                    nexacro._is_enable_setting = true;
                    this._setEnable(enable_flag); //_setEnable 내부에서 동작함				   
                    nexacro._is_enable_setting = false;
                    // Visible/Enable AutoFocus
                    var parent = this.parent;
                    if (!this._is_subcontrol && this._is_created && parent && parent._is_created)
                    {
                        if (enable_flag)
                        {
                            if (_window && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1
                                && !parent._last_focused)
                            {
                                this._on_focus(true);
                            }
                        }
                        else
                        {
                            if (_window && _window._indexOfCurrentFocusPaths(this) > -1)
                            {
                                // 임시스펙 FocusComp가 사라지면 Tab키 누른것처럼 다음 컴포넌트가 포커스
                                _window._removeFromCurrentFocusPath(this, false);
                                if (newfocus_comp && newfocus_comp[0])
                                    newfocus_comp[0]._on_focus(true);
                            }
                        }
                    }
                }
            }
        }
    };
    _pComponent._is_enable_changing = false; // 변경 후 apply_pseudo에서 다시 타지 않게 함
    _pComponent._setEnable = function (v)
    {
        if (this._is_enable_changing)
            return false;

        var enable_flag = (v && this.enable);
        if (this._real_enable != enable_flag)
        {
            var control_elem = this._control_element;
            this._real_enable = enable_flag;

            this._is_enable_changing = true;
            this._changeStatus("disabled", !enable_flag);
            this._is_enable_changing = false;

            this.on_apply_prop_enable(this._real_enable);

            return true;
        }
        return false;
    };

    //---------------------------------------------------------------
    // taborder & tabstop & focus
    _pComponent.set_taborder = function (v)
    {
        // 2013.03.21 주경진
        // taborder에 음수 허용 안함.
        if (v >= 0 && v != this.taborder)
        {
            this.taborder = v;
            this._taborder = ((+v) != (+v)) ? -1 : parseInt(v);
            this.on_apply_prop_taborder();
        }
        return v;
    };

    _pComponent.set_tabstop = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.tabstop)
        {
            if (!v)
            {
                this.tabstop = v;
                this.on_apply_prop_taborder();
            }
        }
        else
        {
            if (v)
            {
                this.tabstop = v;
                this.on_apply_prop_taborder();
            }
        }
        return v;
    };

    _pComponent.on_get_prop_tabstop = function ()
    {
        return this.tabstop;
    };

    _pComponent._isFocusAcceptable = function ()
    {
        return this._is_focus_accept;
    };

    _pComponent.set_tooltiptext = function (v)
    {
        if (nexacro._isNull(v))
            v = "";
        if (v != this.tooltiptext)
        {
            this.tooltiptext = v;
            this.on_apply_prop_tooltip();
        }
        return v;
    };

    _pComponent.set_tooltiptype = function (v)
    {
        if (v != this.tooltiptype)
        {
            this.tooltiptype = v;
            this.on_apply_prop_tooltip();
        }
        return v;
    };

    _pComponent.set_enableevent = function (v)
    {
        this.enableevent = nexacro._toBoolean(v);
        return v;
    };

    _pComponent.set_enableredraw = function (v)
    {
        this.enableredraw = nexacro._toBoolean(v);
        return v;
    };

    _pComponent.set_transparenthittest = function (v)
    {
        // TODO
    };

    _pComponent._on_last_lbuttonup = nexacro._emptyFn;
    _pComponent._on_last_keyup = nexacro._emptyFn;

    _pComponent.set_hotkey = function (v)
    {
        var cur_hotkey = this._hotkey;
        if (cur_hotkey)
        {
            this._unregisterHotkey();
        }

        var hotkey = new nexacro._HotKey(v);
        if (hotkey._isEmpty())
        {
            this.hotkey = null;
            this._hotkey = null;
            delete hotkey;
        }
        else
        {
            this.hotkey = hotkey._toString();
            this._hotkey = hotkey;

            if (this._is_created)
                this._registerHotkey();
        }
    };

    _pComponent.set_rtldirection = function (v)
    {
        var cur_val = this.rtldirection;

        if (cur_val != v)
        {
            this.rtldirection = v;

            this.on_apply_prop_rtldirection(v);
        }
        return v;
    };

    _pComponent._registerHotkey = function ()
    {
        var hotkey = this._hotkey;
        if (!hotkey || hotkey._is_registered)
            return;

        this._setAccessibilityHotKey(this.hotkey);

        var _form = this._getMainForm();
        if (this._is_frame || this == _form)
        {
            // form 또는 frame의 hotkey는 ownerFrame에 등록
            var owner_frame = this.getOwnerFrame();
            if (owner_frame)
            {
                nexacro._registerHotkeyComp(owner_frame, this, hotkey);
            }
        }
        else
        {
            if (_form)
            {
                nexacro._registerHotkeyComp(_form, this, hotkey);
            }
        }
    };

    _pComponent._unregisterHotkey = function ()
    {
        var hotkey = this._hotkey;
        if (!hotkey || !hotkey._is_registered)
            return;
        var _form = this._getMainForm();
        if (this._is_frame || this == _form)
        {
            // form 또는 frame의 hotkey는 ownerFrame에 등록
            var owner_frame = this.getOwnerFrame();
            if (owner_frame)
            {
                nexacro._unregisterHotkeyComp(owner_frame, this, hotkey);
            }
        }
        else
        {
            if (_form)
            {
                nexacro._unregisterHotkeyComp(_form, this, hotkey);
            }
            else
            {
                // frame이 파괴되는 도중 (form과 끊어진 상황)
                delete this._hotkey;
                this._hotkey = null;
            }
        }
    };

    _pComponent._processHotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // Hotkey처리 및 버블링
        var _form = this._getMainForm();
        if (!this._is_frame && this != _form)
        {
            if (_form)
            {
                // Main Form부터 시작
                return _form._processHotkey(keycode, altKey, ctrlKey, shiftKey, this);
            }
        }
    };

    _pComponent._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // Hotkey가 눌렸을때 처리. 각 컴포넌트의 DefaultAction 수행 
        // -> Button,CheckBox는 click처리 나머지는 focus처리
        this.setFocus();
    };

    //---------------------------------------------------------------
    _pComponent.set_color = function (val)
    {
    	this.color = val;

        if (val)
        {
            if (this._color == null || this._color.value != val)
            {
            	var color = nexacro.ColorObject(val);            
                this._color = color;
                this.on_apply_color(color);
            }
        }
        else
        {
            if (this._color)
            {            	
                this._color = null;
                this.on_apply_color(null);
            }
        }
    };
    _pComponent.on_apply_color = function (color)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementColor(color);
    };

    _pComponent.set_font = function (val)
    {
    	this.font = val;
        if (val)
        {
            if (this._font == null || this._font.value != val)
            {
                var font = nexacro.FontObject(val);
                this._font = font;
                this.on_apply_font(font);
            }
        }
        else
        {
            if (this._font)
            {
                this._font = null;
                this.on_apply_font(null);
            }
        }
    };

    _pComponent.on_apply_font = function (font)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementFont(font);
    };

    _pComponent.set_textDecoration = function (val)
    {
    	this.textDecoration = val;
        if (val)
        {
            if (this._textdecoration == null || this._textdecoration.value != val)
            {
                var textDecoration = nexacro.TextDecorationObject(val);
                this._textdecoration = textDecoration;
                this.on_apply_textDecoration(textDecoration);
            }
        }
        else
        {
            if (this._textdecoration)
            {
                this._textdecoration = null;
                this.on_apply_textDecoration(null);
            }
        }
    };

    _pComponent.on_apply_textDecoration = function (textDecoration)
    {
    };

    _pComponent.set_lineHeight = function (val)
    {
        this.lineHeight = nexacro._toString(val);
        if (val)
        {
            if (this._lineheight == null || this._lineheight.value != val)
            {
                var lineHeight = nexacro.CSSValueObject(val);
                this._lineheight = lineHeight;
                this.on_apply_lineHeight(lineHeight);
            }
        }
        else
        {
            if (this._lineheight)
            {
                this._lineheight = null;
                this.on_apply_lineHeight(null);
            }
        }
    };
    _pComponent.on_apply_lineHeight = function (lineHeight)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementLineHeight(lineHeight);
    };

    _pComponent.set_wordSpacing = function (val)
    {
        val = nexacro._toString(val);
    	this.wordSpacing = val;
        if (val)
        {
            if (this._wordspacing == null || this._wordspacing.value != val)
            {
                var wordSpacing = nexacro.CSSValueObject(val);
                this._wordspacing = wordSpacing;
                this.on_apply_wordSpacing(wordSpacing);
            }
        }
        else
        {
            if (this._wordspacing)
            {
                this._wordspacing = null;
                this.on_apply_wordSpacing(null);
            }
        }
    };
    _pComponent.on_apply_wordSpacing = function (wordSpacing)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementWordSpacing(wordSpacing);
    };

    _pComponent.set_letterSpacing = function (val)
    {
        val = nexacro._toString(val);
    	this.letterSpacing = val;
        if (val)
        {
        	if (this._letterspacing == null || this._letterspacing.value != val)
            {
                var letterSpacing = nexacro.CSSValueObject(val);
                this._letterspacing = letterSpacing;
                this.on_apply_letterSpacing(letterSpacing);
            }
        }
        else
        {
            if (this._letterspacing)
            {
                this._letterspacing = null;
                this.on_apply_letterSpacing(null);
            }
        }
    };
    _pComponent.on_apply_letterSpacing = function (letterSpacing)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementLetterSpacing(letterSpacing);
    };

    _pComponent.set_wordWrap = function (val)
    {
        if (val)
        {
            if (this.wordWrap == null || this.wordWrap != val)
            {
            	var wordWrap = val;
                this.wordWrap = wordWrap;
                this.on_apply_wordWrap(wordWrap);
            }
        }
        else
        {
        	if (this.wordWrap)
            {
                this.wordWrap = null;
                this.on_apply_wordWrap(null);
            }
        }
    };

    _pComponent.on_apply_wordWrap = function (wordWrap)
    {
        //if (!this._isEnableRedraw()) return;
        //var control_elem = this._control_element;
        //if (control_elem)
        //    control_elem.setElementWordWrap(wordwrap);
    };

    //border
    _pComponent.set_borderRadius = function (val)
    {
    	this.borderRadius = val;
        if (val)
        {
            if (this._borderradius == null || this._borderradius.value != val)
            {
                var borderRadius = nexacro.BorderRadiusObject(val);
                this._borderradius = borderRadius;
                this.on_apply_borderRadius(borderRadius);
            }
        }
        else
        {
            if (this._borderradius)
            {
                this._borderradius = null;
                this.on_apply_borderRadius(null);
            }
        }
    };
    _pComponent.on_apply_borderRadius = function (borderRadius)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementBorderRadius(borderRadius);
        }
    };

    _pComponent.set_border = function (val)
    {
    	this.border = val;
        if (val)
        {
            if (this._border == null || !this._border._single || this._border.value != val)
            {
                var border = nexacro.BorderObject(val);
                this._border = border;
                this.on_apply_border(border);
            }
        }
        else
        {
            if (this._border)
            {
                this._border = null;
                this.on_apply_border(null);
            }
        }
    };
    _pComponent.on_apply_border = function (border)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementBorder(border);
            // update for client pos & size
            //this._updateClientSize(control_elem);
        }
    };

    _pComponent._setBorderNone = function (pos)
    {
        var control_elem = this.getElement();
        if (!control_elem)
            return;

        control_elem.setElementBorderLeftNone(false);
        control_elem.setElementBorderTopNone(false);
        control_elem.setElementBorderBottomNone(false);
        control_elem.setElementBorderRightNone(false);

        if (pos == "" || nexacro._isNull(pos))
            return;

        if (pos == "left")
        {
            control_elem.setElementBorderLeftNone(true);
        }
        else if (pos == "top")
        {
            control_elem.setElementBorderTopNone(true);
        }
        else if (pos == "bottom")
        {
            control_elem.setElementBorderBottomNone(true);
        }
        else 
        {
            control_elem.setElementBorderRightNone(true);
        }
    };

    //val : background
    _pComponent.set_background = function (val)
    {
    	this.background = val;
        if (val)
        {
            if (this._background == null || this._background.value != val)
            {
                var backgroud = nexacro.BackgroundObject(val, this);
                this._background = backgroud;
                this.on_apply_background(backgroud);
            }
        }
        else
        {
            if (this._background)
            {
                this._background = null;
                this.on_apply_background(null);
            }
        }
    };
    _pComponent.on_apply_background = function (background)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementBackground(background);
    };

    //val : nexaEdge
    _pComponent.set_edge = function (val)
    {
    	this.edge = val;
        if (val)
        {
            if (this._edge == null || this._edge.value != val)
            {
                var edge = nexacro.EdgeImageObject(val, this);
                this._edge = edge;
                this.on_apply_edge(edge);
            }
        }
        else
        {
            if (this._edge)
            {
                this._edge = null;
                this.on_apply_edge(null);
            }
        }
    };
    _pComponent.on_apply_edge = function (edge)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementEdge(edge);
    };


    //---------------------------------------------------------------
	// margin, padding, align
	// not supported
    _pComponent.set_margin = function (val)
    {
        if (val)
        {
            if (this.margin == null || this.margin.value != val)
            {
                var margin = nexacro._getCachedMarginObject(val);
                this.margin = margin;
                this.on_apply_Margin(margin);
            }
        }
        else
        {
            if (this.margin)
            {
                this.margin = null;
                this.on_apply_margin(null);
            }
        }
    };
    _pComponent.on_apply_margin = function (margin)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
        {
            this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
            control_elem.setElementVisible(this.visible);
            control_elem.setElementPosition(this._adjust_left, this._adjust_top);
            control_elem.setElementSize(this._adjust_width, this._adjust_height);
        }
    };

    _pComponent.set_padding = function (val)
    {
    	this.padding = val;
        if (val)
        {
            if (this._padding == null || this._padding.value != val)
            {
                var padding = nexacro.PaddingObject(val);
                this._padding = this.padding = padding;
                this._on_apply_padding(padding);
            }
        }
        else
        {
            if (this._padding)
            {
                this._padding = null;
                this._on_apply_padding(null);
            }
        }
    };

    _pComponent._on_apply_padding = function (padding)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPadding(padding);
            // update for client pos & size
            //this._updateClientSize(control_elem);
            this.on_apply_padding(padding);
        }
    };

   /* _pComponent.set_align = function (val)
    {
        if (val)
        {
            var align = nexacro.AlignObject(val);
            this.set_textAlign(align.halign);
            this.set_verticalAlign(align.valign);
        }
        else
        {
            this.set_textAlign(null);
            this.set_verticalAlign(null);
        }
    };
	*/
    _pComponent.set_textAlign = function (val)
    {
        if (val)
        {
            if (this.textAlign == null || this.textAlign != val)
            {
                this.textAlign = val;
                this.on_apply_textAlign(val);
            }
        }
        else
        {
            if (this.textAlign)
            {
                this.textAlign = null;
                this.on_apply_textAlign(null);
            }
        }
    };
    _pComponent.on_apply_textAlign = function (halign) { };

    _pComponent.set_verticalAlign = function (val)
    {
        if (val)
        {
            if (this.verticalAlign == null || this.verticalAlign != val)
            {
                this.verticalAlign = val;
                this.on_apply_verticalAlign(val);
            }
        }
        else
        {
            if (this.verticalAlign)
            {
                this.verticalAlign = null;
                this.on_apply_verticalAlign(null);
            }
        }
    };

    _pComponent.on_apply_verticalAlign = function (valign) { };

    // cursor, opacity, shadow
    _pComponent.set_cursor = function (val)
    {
    	this.cursor = val;
        if (val)
        {
            if (this._cursor == null || this._cursor.value != val)
            {
                var cursor = nexacro.CursorObject(val);
                this._cursor = cursor;
                this.on_apply_cursor(cursor);
            }
        }
        else
        {
            if (this._cursor)
            {
                this._cursor = null;
                this.on_apply_cursor(null);
            }
        }
    };
    _pComponent.on_apply_cursor = function (cursor)
    {
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementCursor(cursor);
    };

    _pComponent._updateCursor = function (cursor)
    {
    	if (nexacro._cur_track_info || nexacro._cur_extra_track_info)
    		return;

    	var cursorobj = this._cursor;
    	if (cursor)
    		cursorobj = nexacro.CursorObject(cursor);
    	
    	this.on_apply_cursor(cursorobj);
    };

    _pComponent.set_opacity = function (val)
    {
    	this.opacity = val;
        if (0 === val || val)
        {
            if (this._opacity == null || this._opacity.value != val)
            {
                var opacity = nexacro.OpacityObject(val);
                this._opacity = opacity;
                this.on_apply_opacity(opacity);
            }
        }
        else
        {
            if (this._opacity)
            {
                this._opacity = null;
                this.on_apply_opacity(null);
            }
        }
    };
    _pComponent.on_apply_opacity = function (opacity)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementOpacity(opacity);
    };

    _pComponent.set_boxShadow = function (val)
    {
    	this.boxShadow = val;
        if (val)
        {
            if (this._boxshadow == null || this._boxshadow.value != val)
            {
                var shadow = nexacro.ShadowObject(val);
                this._boxshadow = shadow;
                this.on_apply_boxShadow(shadow);
            }
        }
        else
        {
            if (this._boxshadow)
            {
                this._boxshadow = null;
                this.on_apply_boxShadow(null);
            }
        }
    };
    _pComponent.on_apply_boxShadow = function (shadow)
    {
        if (!this._isEnableRedraw()) return;
        var control_elem = this._control_element;
        if (control_elem)
            control_elem.setElementBoxShadow(shadow);
    };


    //===============================================================
    // nexacro.Component = Component's stock Methods
    //===============================================================
    _pComponent._saveScrollPos = function () { };		// bringTo 
    _pComponent._applyScrollPos = function () { };

    _pComponent.bringToFront = function ()
    {
        if (this.parent)
        {
            var parent = this.parent;
            var parent_child_list = parent._child_list;
            var child_list = this._child_list;
            var len = parent_child_list.length;
            var last_Idx = len - 1;

            var cur_Index = nexacro._indexOf(parent_child_list, this);

            if (cur_Index >= 0 && cur_Index < last_Idx)
            {
                parent_child_list.splice(cur_Index, 1);
                parent_child_list.splice(last_Idx, 0, this);

                var parent_elem = parent.getElement();
                var cur_elem = this._control_element;

                if (child_list != null || child_list != undefined)
                {
                    for (var i = 0; i < child_list.length; i++)
                    {
                        var comp = child_list[i];
                        comp._saveScrollPos();
                    }
                }

                parent_elem.bringToFrontElement(cur_elem);

                if (child_list != null || child_list != undefined)
                {
                    for (var i = 0; i < child_list.length; i++)
                    {
                        var comp = child_list[i];
                        comp._applyScrollPos();
                    }
                }
            }
        }
    };

    _pComponent.bringToPrev = function ()
    {
        if (this.parent)
        {
            var parent = this.parent;
            var parent_child_list = parent._child_list;
            var child_list = this._child_list;
            var len = parent_child_list.length;
            var last_Idx = len - 1;

            var cur_Index = nexacro._indexOf(parent_child_list, this);

            if (cur_Index >= 0 && cur_Index < last_Idx)
            {
                if (child_list != null || child_list != undefined)
                {
                    for (var i = 0; i < child_list.length; i++)
                    {
                        var comp = child_list[i];
                        comp._saveScrollPos();
                    }
                }

                this.moveToPrev(parent_child_list[cur_Index + 1]);

                if (child_list != null || child_list != undefined)
                {
                    for (var i = 0; i < child_list.length; i++)
                    {
                        var comp = child_list[i];
                        comp._applyScrollPos();
                    }
                }
            }
        }
    };

    _pComponent.moveToNext = function (objOrId)
    {
        if (this.parent)
        {
            var parent = this.parent;
            var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

            if (target == null)
                return;

            var child_list = parent._child_list;
            var cur_idx = nexacro._indexOf(child_list, this);
            var target_idx = nexacro._indexOf(child_list, target);

            if (cur_idx < 0 || target_idx < 0) return;

            if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx - 1)
            {
                child_list.splice(cur_idx, 1);
                var idx = nexacro._indexOf(child_list, target);

                child_list.splice(idx, 0, this);

                var parent_elem = parent.getElement();
                parent_elem.moveToNextElement(this._control_element, target.getElement());
            }
        }
    };
    _pComponent.moveToPrev = function (objOrId)
    {
        if (this.parent)
        {
            var parent = this.parent;
            var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

            if (target == null)
                return;

            var child_list = parent._child_list;
            var cur_idx = nexacro._indexOf(child_list, this);
            var target_idx = nexacro._indexOf(child_list, target);

            if (cur_idx < 0 || target_idx < 0)
                return;

            if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx + 1)
            {
                child_list.splice(cur_idx, 1);

                var index = nexacro._indexOf(child_list, target);
                child_list.splice(index + 1, 0, this);

                var parent_elem = parent.getElement();
                parent_elem.moveToPrevElement(this._control_element, target.getElement());
            }
        }
    };

    _pComponent.sendToBack = function ()
    {
        if (this.parent)
        {
            var parent = this.parent;
            var child_list = parent._child_list;

            var cur_idx = nexacro._indexOf(child_list, this);
            if (cur_idx > 0)
            {
                child_list.splice(cur_idx, 1);
                child_list.splice(0, 0, this);

                var parent_elem = parent.getElement();
                parent_elem.sendToBackElement(this._control_element);
            }
        }
    };
    _pComponent.sendToNext = function ()
    {
        if (this.parent)
        {
            var p = this.parent;
            var child_list = p._child_list;
            var cur_idx = nexacro._indexOf(child_list, this);
            if (cur_idx > 0)
            {
                this.moveToNext(child_list[cur_idx - 1]);
            }
        }
    };

    _pComponent._setControl = function (typename)
    {
        this._is_subcontrol = true;
        if (typename)
            this._type_name = typename;
        else
            this._type_name = this.on_get_css_assumedtypename() + "Control";
    };

    _pComponent._setPopupContains = function (is_popupcontains)
    {
        this._is_popupcontains = is_popupcontains;
    };

    _pComponent._isPopupContains = function ()
    {
        return this._is_popupcontains ? this._is_popupcontains : false;
    };

    _pComponent._getPopupControl= function ()
    {
        return this._popupcontrol;
    };

    _pComponent._getPopupContainerCSSSelector = function ()
    {
        var popupcontrol = this.parent._getPopupControl();
        if (popupcontrol)
        {
            var comp_type_name = popupcontrol.on_get_popupControlTypeName();
            return "popup" + comp_type_name + this.cssclass + this.id;
        }       
    };

    _pComponent.on_get_popupControlTypeName = function ()
    {
        return this.parent._type_name;
    };

    _pComponent._setControlTypeName = function (typename)
    {
        this._type_name = typename;
    };

    _pComponent._setEventInfoControl = function (bevtinfo)
    {
        this._is_eventinfo_control = bevtinfo;
    };


    _pComponent.create = function ()
    {
        this.initProperties();
        this.initEvents();
    };

    _pComponent._destroy = function ()
    {
        return this.destroy();
    };

    _pComponent.destroy = function ()
    {
        if (!this._is_alive)
            return;

        return this.destroyComponent();
    };

    _pComponent.init = function (id, position, left, top, width, height, right, bottom)
    {
        if (id)
        {
            this.id = this.name = id;
        }
		
        this.position = position ? position : "absolute";

        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var bsize = false, bmove = false;

        if (arguments.length >= 6)
        {
            this._adjustPosition(left, top, right, bottom, width, height, this.parent ? this.parent._getClientWidth() : 0, this.parent ? this.parent._getClientHeight() : 0);

            if (this._adjust_width != old_width || this._adjust_height != old_height)
            {
                bsize = true;
            }
            if (this._adjust_left != old_left || this._adjust_top != old_top)
            {
                bmove = true;
            }
            this.on_update_position(bsize, bmove);
        }
    };

    _pComponent._getPosRight = function ()
    {
        return this._adjust_left + this._adjust_width;
    };

    _pComponent._getPosBottom = function ()
    {
        return this._adjust_top + this._adjust_height;
    };

    _pComponent.move = function (left, top, width, height, right, bottom)
    {
        // Frame은 재정의함.
        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var bsize = false, bmove = false;
        var update = false;

    	// arg : (left, top) ==> 기존 width, height, right, bottom 적용
    	// arg : (left, top, width, height) ==> ==> 기존 right, bottom 적용
    	// arg : (left, top, width, height, right, bottom)  ==> 입력값으로 적용         
        var arglen = arguments.length;
        if (arglen < 6)
        	bottom = this.bottom;
        if (arglen < 5)
        	right = this.right;
        if (arglen < 4)
        	height = this.height;
        if (arglen < 3)
        	width = this.width;

    	//validation 
    	//left, width, right중 2개 이상 실제값이 있어야 함 
    	//top, height, bottom 중 2개 이상 실제값이 있어야 함 
    	/*   성능 이슈로 막음     
	    var checkx = false;
        if (left !== null && left !== undefined)
        {
        	if ((width !== null && width !== undefined) || (right !== null && right !== undefined))
        		checkx = true;        	
        }
        else if ((width !== null && width !== undefined) && (right !== null && right !== undefined))
        {
        	checkx = true;
		}
    	
        var checky = false;
        if (top !== null && top !== undefined)
        {
        	if ((height !== null && height !== undefined) || (bottom !== null && bottom !== undefined))        	
        		checky = true;
        }
        else if ((height !== null && height !== undefined) && (bottom !== null && bottom !== undefined))
        {
        	checky = true;
        }
		

        if (!(checkx && checky))
        {
        	trace("move invalide argument ");
        	return;
        }
*/
        this._adjustPosition(left, top, right, bottom, width, height, this.parent._getClientWidth(), this.parent._getClientHeight());
        if (this._adjust_width != old_width || this._adjust_height != old_height)
        {
            bsize = true;
            if (old_width == 0 || old_height == 0)
                update = true;
        }
        if (this._adjust_left != old_left || this._adjust_top != old_top)
        {
            bmove = true;
        }

        this.on_update_position(bsize, bmove);
    };

    _pComponent.move_default = null;

    _pComponent._setFocus = function (bResetScroll, calledby, block_inner_focus)
    {
        // calledby : setFocus를 호출한 주체(동작)
        // - 0: tabkey forward
        // - 1: tabkey backward (shift+tab)
        // - undefined: etc

        /*
	    if (calledby == 0)
	    {
	        this._focus_reason = "tabkey";
	    }
        else if (calledby == 1)
        {
            this._focus_reason = "shifttabkey";
        }
        */
        if (calledby > -1 || calledby < 4)
            this._focus_direction = calledby;
        else
            this._focus_direction = -1;
        if (block_inner_focus == true)
        {
            this._block_inner_focus = true;
            this.setFocus(bResetScroll);
            this._block_inner_focus = false;
        }
        else
        {
            return this.setFocus(bResetScroll);
        }
    };

    _pComponent.setFocus = function (bResetScroll, bInnerFocus)
    {
        var win = this._getRootWindow();
        if (!this.getElement())
            return;

        // Modal 아래에 가려진 컴포넌트인 경우 setFocus 차단.
        var is_active_layer = win._isActiveLayerComponent(this);
        if (!is_active_layer)
            return;

        // 미리 체크할 항목: visiblestate / enablestate / focusacceptable
        if (!this._isVisible() || !this._isEnable() || !this.enableevent || !this._isFocusAcceptable())
            return;

        // 메뉴얼상 Form계열은 false가 default라고 하나..실제 9.2동작은 그렇지 않다. 무조건 true임. 
        if (bResetScroll === undefined)
            bResetScroll = true;

        // bContainerFocus
        // true: Container 자신까지만 포커스를 갖도록
        // false: Container 내부 Taborder / LastFocus에 의해 최종 포커스 탐색
        // undefined: Application.enableaccessibility 값에 따름.
        var bContainerFocus;
        if (bInnerFocus === undefined)
            bContainerFocus = nexacro._enableaccessibility;
        else
            bContainerFocus = !bInnerFocus;

        var block_inner, from_child = false;
        if (bContainerFocus)
        {
            // 내가 Container이면 하위 탐색을 하지 않도록함.
            if (this instanceof nexacro.Form)
            {
                if (this._block_inner_focus)
                    block_inner = true;
                this._block_inner_focus = true;

                // 명시적으로 호출한 경우 LastFocus제거. 상위로 올라갈수 있도록함.
                if (this._last_focused)
                {
                    if (win._indexOfCurrentFocusPaths(this._last_focused) >= 0)
                    {
                        from_child = true;
                        win._removeFromCurrentFocusPath(this._last_focused);
                    }
                    else
                    {
                        this._last_focused = null;
                    }
                }
            }
        }

        var focus_direction = this._focus_direction;
        // 브라우저에 의해 조절되기 전에 미리 resetScroll처리
        if (bResetScroll)
        {
            // 9.2버젼 대비 스펙 변경사항	
            // --> 최종적으로 focus될 말단 컴포넌트가 resetScroll 대상이다.


            var c = this, c_temp, target_comp = this;
            if (!this._block_inner_focus)
            {
                while (c)
                {
                    c_temp = c._getLastFocused();
                    if (!c_temp)
                        c_temp = c._getTabOrderFirst();
                    if (c_temp)
                        target_comp = c_temp;
                    c = c_temp;
                }

                target_comp._resetScrollPos(target_comp,
                                             target_comp._adjust_left,
                                             target_comp._adjust_top,
                                             target_comp._adjust_left + target_comp._adjust_width,
                                             target_comp._adjust_top + target_comp._adjust_height, focus_direction);
            }
            else
            {
                nexacro.Component.prototype._resetScrollPos.call(this, this,
                                 this._adjust_left,
                                 this._adjust_top,
                                 this._adjust_left + this._adjust_width,
                                 this._adjust_top + this._adjust_height, focus_direction);
            }
        }

        var last_focused = this._find_lastFocused();
        var evt_name = "focus";
        //if (focus_direction >= 0)
        //    evt_name = "tabkey";
        // tabkey 사용시 focus 방향을 evt_name으로 구분
        //focus direction
        //0 - tab
        //1 - shift_tab
        //2 - down_key
        //3 - up_key

        if (focus_direction == 0)
        {
            evt_name = "tabkey";
        }
        else if (focus_direction == 1)
        {
            evt_name = "shifttabkey";
        }
        else if (focus_direction == 2)
        {
            evt_name = "downkey";
        }
        else if (focus_direction == 3)
        {
            evt_name = "upkey";
        }
        //evt_name = this._focus_direction;
        this._focus_direction = -1;

        this._on_focus(true, evt_name);
        if (from_child)
        {
            this.on_apply_custom_setfocus();
        }

        if (this._block_inner_focus && !block_inner)
            this._block_inner_focus = false;

        return last_focused;
    };

    _pComponent.redraw = function () { };
    _pComponent.resize = function (w, h)
    {
        // 리사이즈에 음수 허용 안함.
        if (w < 0 || h < 0)
            return;

        if (w == this._adjust_width && h == this._adjust_height)        
            return;
        

        var old_width = this._adjust_width;
        var old_height = this._adjust_height;

        var bsize = false;
        if (old_width != this._adjust_left + w || old_height != this._adjust_top + h)
        {
            this.width = w;
            this.height = h;
            bsize = true;
        }

        this._update_position(bsize, false);
    };

    /*_pComponent._get = function ()
	{
	    return this._adjust_left;
	};

    _pComponent._get = function ()
	{
	    return this._adjust_left;
    };
    */
    _pComponent._update_position = function (bsize, bmove)
    {
        // Frame은 재정의함.
        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var update = false;

        if (this.parent)
        {
            var client_width = this.parent._getClientWidth();
            var client_height = this.parent._getClientHeight();

            this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, client_width, client_height);
        }
        else
            this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);

        if (this._adjust_width != old_width || this._adjust_height != old_height)
        {
            bsize = true;

            if (old_width == 0 || old_height == 0)
                update = true;
        }
        if (this._adjust_left != old_left || this._adjust_top != old_top)
        {
            bmove = true;
        }
        this.on_update_position(bsize, bmove);

        if (update)
        {
            this._apply_status();
        }
    };

    // wait comp 닫힌 후 내부적으로 포커스 처리등 필요시 사용
    _pComponent._on_afterHideWaitComp = function (status)
    {
    	if(this._status != status)
            this._changeStatus(this._status, true);
    };

   


    // Bind 
    //--------------------------------------------------------------------------------------
    _pComponent.applyto_bindSource = function (propid, Val)
    {
        if (!this._bind_event)
            return true;

        var evt =
		{
		    propid: propid,
		    val: Val
		};
        var ret = this._bind_event._fireEvent(this, evt);
        return ret;
    };

    //bind property
    _pComponent.on_getBindableProperties = function ()
    {
    };

    //--------------------------------------------------------------------------------------


    // show
    //--------------------------------------------------------------------------------------
    _pComponent.show = function ()
    {
        var parent = this.parent;
        if (parent)
        {
            var control_element = this._control_element;
            if (!control_element)
            {
                if (this.createComponent(true))
                    this.on_created();
            }
            else
            {
                // TODO ControlElement.recreate 같은 인터페이스가 만들어져야 할듯.
                // 또는 element.handle이 이미 존재할 경우 Append하여 재사용하도록 모든 Element에 작업되어야함.
            }
        }
    };
    //--------------------------------------------------------------------------------------

    //===============================================================
    // nexacro.Component : Component's Basic Utilities
    //===============================================================

    _pComponent._isVisible = function ()
    {
        var form = this;
        while (form != null)
        {
            if (form.visible == false)
                return false;

            form = form.parent;
        }
        return true;
    };

    _pComponent._isEnable = function ()
    {
        var form = this;
        while (form != null)
        {
            if (form._is_frame && form._is_popup_frame)
                break;

            if (form._real_enable == false || form.enable == false)
                return false;

            form = form.parent;
        }
        return true;
    };

    _pComponent._isAccessibilityRoleHeading = function ()
    {
        if (this._getAccessibilityRole() == "heading")
            return true;
        else
            return false;
    };


    _pComponent._isEditableComponent = function (edittype)
    {
        if (this.readonly !== undefined)
        {
            if (edittype && edittype.match(this._type_name))
            {
                if (this._type_name == "Edit")
                {
                    var obj = edittype.split(",");
                    for (var i = 0; i < obj.length; i++)
                    {
                        if (obj[i].trim() == this._type_name)
                            return true;
                    }
                }
                else
                    return true;
            }
            else if (edittype == "All" || edittype == "")
            {
                return true;
            }
            else
                return false;
        }
        return false;
    };

    _pComponent._getForm = function ()
    {
        return this._refform;
    };

    _pComponent._getRootForm = function ()
    {
        var form = this._refform;
        while ((form && form._is_form == false) ||
            (form && form._is_form && (form instanceof nexacro._InnerForm)))
        {
            form = form.parent;
        }

        return form;
    };

    _pComponent._getMainForm = function ()
    {
        var comp = this;
        while (comp)
        {
            if (comp._is_frame)
            {
                return comp.form;
            }
            if (!comp._is_form && comp._refform)
                comp = comp._refform;
            else if (comp.parent)
                comp = comp.parent;
            else
            {
                if (comp._is_form)
                    return comp;
                return null; // this is removed component!
            }
        }

        return null;
    };

    _pComponent._findDataset = function (id)
    {
        if (id && id.length > 0)
        {
            var ds = this[id];

            if (ds && (ds._type_name == "Dataset"))
            {
                return ds;
            }

            if (this._refform)
            {
                ds = this._refform.lookup(id);
                if (ds && (ds._type_name == "Dataset"))
                {
                    return ds;
                }
            }
        }

        return undefined;
    };
    _pComponent._findForm = function (comp)
    {
        var form = comp;
        while (form && form._is_form == false)
        {
            form = form.parent;
        }
        return form;
    };

    _pComponent._getOwnerFrame = function ()
    {
        var form = this;
        while (form && !form._is_frame)
        {
            form = form.parent;
        }
        return form;
    };

    _pComponent._getWindow = function ()
    {
        var parent = this.parent;
        if (parent)
        {
            return parent._getWindow();
        }

        var form = this._refform;
        if (form && form != this)
        {
            return form._getWindow();
        }

        return nexacro._findWindow(nexacro._getMainWindowHandle());
    };

    _pComponent._getRootWindow = function ()
    {
        var _window = this._getWindow();
        while (_window)
        {
            if (_window.frame)
                return _window;

            _window = _window.parent;
        }

        return this._getWindow();
    };

    _pComponent._getWindowHandle = function ()
    {
        var _window = this._getWindow();
        if (_window)
            return _window.handle;
        return null;
    };

    _pComponent._getLastFocused = function ()
    {
        return this._last_focused;
    };
    _pComponent._find_lastFocused = function ()
    {
        var form = this._getMainForm();
        if (!form)
            return null;

        var last_focus = form._last_focused;
        while (last_focus && last_focus._hasContainer())
        {
            var child_last_focus = last_focus._getLastFocused();
            if (!child_last_focus)
                break;
            last_focus = child_last_focus;
        }

        return last_focus;
    };

    _pComponent._hasContainer = function ()
    {
        if (this._is_form || this._is_container || this._is_containerset)
        {
            return true;
        }

        return false;
    };

    _pComponent._getDragData = function ()
    {
        if (this.text)
            return this.text;
        return null;
    };

    _pComponent.getElement = function ()
    {
        return this._control_element;
    };

    _pComponent._getScrollBarSize = function ()
    {
        var scrollbarsize = this.scrollbarsize;

        if (!nexacro._isNull(scrollbarsize))
            return scrollbarsize;

        var env = nexacro.getEnvironment();
        scrollbarsize = env.scrollbarsize;

        if (!nexacro._isNull(scrollbarsize))
            return scrollbarsize;

        return this._default_scrollbarsize;
    };

    _pComponent._getScrollIndicatorSize = function ()
    {
        var scrollindicatorsize = this.scrollindicatorsize;

        if (!nexacro._isNull(scrollindicatorsize))
            return scrollindicatorsize;

        var env = nexacro.getEnvironment();
        scrollindicatorsize = env.scrollindicatorsize;

        if (!nexacro._isNull(scrollindicatorsize))
            return scrollindicatorsize;

        return this._default_scrollindicatorsize;
    };

    _pComponent._getHScrollBarSize = function ()
    {
        var scrollbartype = this._getHScrollBarType();
        if (scrollbartype == "autoindicator" || scrollbartype == "indicator")
            return this._getScrollIndicatorSize();
        else
            return this._getScrollBarSize();
    };

    _pComponent._getVScrollBarSize = function ()
    {
        var scrollbartype = this._getVScrollBarType();
        if (scrollbartype == "autoindicator" || scrollbartype == "indicator")
            return this._getScrollIndicatorSize();
        else
            return this._getScrollBarSize();
    };

    _pComponent._getHScrollBarType = function ()
    {
        var hscrollbartype = this._hscrollbartype;
        if (hscrollbartype != "" && !nexacro._isNull(hscrollbartype))
            return hscrollbartype;


        function _splitScrollBarType(str)
        {
            var ret = new Array(2);
            var h, v;

            if (scrollbartype)
            {
                var arr = nexacro._toString(scrollbartype).toLowerCase().split(" ");

                for (var i = 0; i < arr.length; i++)
                {
                    switch (arr[i])
                    {
                        case "none": case "auto": case "fixed": case "autoindicator": case "indicator": case "default":
                            if (i == 0)
                                h = arr[i];
                            else if (i == 1)
                                v = arr[i];
                            break;

                        default:
                            break;
                    }
                }

                if (!v)
                    v = h;

                ret[0] = h;
                ret[1] = v;
            }

            return ret;
        };

        var scrollbartype = this.scrollbartype;
        var env = nexacro.getEnvironment();
        
        var types = _splitScrollBarType(scrollbartype);

        hscrollbartype = types[0];

        if (!hscrollbartype || hscrollbartype == "default")
        {
            if (env)
                scrollbartype = env.scrollbartype;

            if (scrollbartype == "" || nexacro._isNull(scrollbartype))
                scrollbartype = this._default_scrollbartype;
           
            types = _splitScrollBarType(scrollbartype);

            hscrollbartype = types[0];
        }
        
        return hscrollbartype;
    };

    _pComponent._getVScrollBarType = function ()
    {
        var vscrollbartype = this._vscrollbartype;
        if (vscrollbartype != "" && !nexacro._isNull(vscrollbartype))
            return vscrollbartype;

        function _splitScrollBarType(str)
        {
            var ret = new Array(2);
            var h, v;

            if (scrollbartype)
            {
                var arr = nexacro._toString(scrollbartype).toLowerCase().split(" ");

                for (var i = 0; i < arr.length; i++)
                {
                    switch (arr[i])
                    {
                        case "none": case "auto": case "fixed": case "autoindicator": case "indicator": case "default":
                            if (i == 0)
                                h = arr[i];
                            else if (i == 1)
                                v = arr[i];
                            break;

                        default:
                            break;
                    }
                }

                if (!v)
                    v = h;

                ret[0] = h;
                ret[1] = v;
            }

            return ret;
        };

        var scrollbartype = this.scrollbartype;
        var env = nexacro.getEnvironment();

        var types = _splitScrollBarType(scrollbartype);

        vscrollbartype = types[1];

        if (!vscrollbartype || vscrollbartype == "default")
        {
            if (env)
                scrollbartype = env.scrollbartype;

            if (scrollbartype == "" || nexacro._isNull(scrollbartype))
                scrollbartype = this._default_scrollbartype;

            types = _splitScrollBarType(scrollbartype);

            vscrollbartype = types[1];
        }

        return vscrollbartype;
    };

    _pComponent._getScrollable = function ()
    {
        if (!this._is_scrollable || !this._isEnable()) return false;
        if (this.scrolltype != "none")
        {
            return true;
        }

        return false;
    };

    _pComponent._getSortedDecendants = nexacro._emptyFn;
    _pComponent._getTabOrderNext = nexacro._emptyFn;
    _pComponent._getTabOrderFirst = nexacro._emptyFn;
    _pComponent._getTabOrderLast = nexacro._emptyFn;
    _pComponent._searchNextTabFocus = nexacro._emptyFn;
    _pComponent._searchPrevTabFocus = nexacro._emptyFn;

    _pComponent._getHeadingOrderNext = nexacro._emptyFn;
    _pComponent._getHeadingOrderFirst = nexacro._emptyFn;
    _pComponent._getHeadingOrderLast = nexacro._emptyFn;
    _pComponent._searchNextHeadingFocus = nexacro._emptyFn;
    _pComponent._searchPrevHeadingFocus = nexacro._emptyFn;


    //==============================================================================
    // nexacro.Component = nexacro Component's stock Methods
    //==============================================================================

    _pComponent._getRefFormBaseUrl = function ()
    {
        if (this._refform)
            return this._refform._getFormBaseUrl();
    };


    _pComponent._getScreenPosition = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
        	var border = this._getCurrentStyleBorder();
            var elem_pos = nexacro._getElementScreenPosition(control_elem);

            var screenLeft = elem_pos.x;
            var screenTop = elem_pos.y;
            return { x: screenLeft, y: screenTop };
        }
        return { x: 0, y: 0 };
    };

    _pComponent._getWindowPosition = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            var border = this._getCurrentStyleBorder();
            var elem_pos = nexacro._getElementXYInWindow(control_elem.handle);
            var windowLeft = elem_pos[0] - (border ? border._getBorderLeftWidth() : 0);
            var windowTop = elem_pos[1] - (border ? border._getBorderTopWidth() : 0);
            return { x: windowLeft, y: windowTop };
        }
        return { x: 0, y: 0 };
    };

    // 2014.04.09 by zoo
    // RTL Layout
    // Position will determine it's parents rtldirection property value.
    _pComponent._getRtlDirection = function (comp)
    {
        if (!comp) comp = this;

        var rtldirection = comp.rtldirection;

        while (comp && (!rtldirection || rtldirection == "inherit"))
        {
            comp = comp.parent;
            if (comp)
            {
                rtldirection = comp.rtldirection;

                //if (rtldirection == "rtl")
                //{
                //	trace("parent : " + comp.name + " // rtldirection : " + rtldirection);
                //}
            }
        }
        return rtldirection;
    };

    _pComponent._isRtl = function (comp)
    {
        return false;
        //return (this._getRtlDirection(comp) == "rtl");
    };

    _pComponent.set_locale = nexacro._emptyFn;
    _pComponent.on_apply_locale = nexacro._emptyFn;

    _pComponent._setLocale = function (v)
    {
        if (!this.locale && v != this._locale)
        {
            this._locale = v;
            this.on_apply_locale(v);
        }
    };

    _pComponent._getLocale = function ()
    {
        if (!this._is_locale_control) return;

        var locale = nexacro._locale ? nexacro._locale: nexacro._getLocale();
        var pThis = this;

        while (pThis)
        {
            if (pThis._locale)
            {
                locale = pThis._locale;
                break;
            }
            pThis = pThis.parent;
        }

        return locale;
    };

    // 누적된 zoomfactor 얻기
    _pComponent._getCumulativeZoomFactor = function ()
    {
        var comp = this;
        var zoomfactor = 100;
        while (comp && !(comp instanceof nexacro.Frame))
        {
            if (comp._getZoom)
            {
                var value = comp._getZoom();
                if (value != 100)
                    zoomfactor *= (value / 100.0);
            }
            comp = comp.parent;
        }

        return zoomfactor;
    };

    // Parent의 Scroll 크기 결정에 영향을 주는 고정된 right,bottom offset값을 리턴한다.
    _pComponent._getFixedOffsetValue = function ()
    {
        var r = 0, b = 0;

        if (this.right != null)
        {
            // right일때 음수값인지 체크
            // %이면 100%보다 큰 값인지 체크

            r = 0;
        }
        else if (this.width != null)
        {
            var val = this.width;
            if (typeof (val) == "string" && val.indexOf("%") >= 0)
            {
                // 100%이면 right와 같다.
                // 100% 보다 크면 무조건 스크롤바가 생긴다.
                if (parseFloat(val) <= 100)
                    r = 0;
                else
                    r = this.getOffsetRight();
            }
            else
                r = this.getOffsetRight();
        }

        if (this.bottom != null)
        {
            b = 0;
        }
        else if (this.height != null)
        {
            var val = this.height;
            if (typeof (val) == "string" && val.indexOf("%") >= 0)
            {
                if (parseFloat(val) <= 100)
                    b = 0;
                else
                    b = this.getOffsetBottom();
            }
            else
                b = this.getOffsetBottom();
        }

        return { right: r, bottom: b };
    };

    // Parent의 Inherit Style Prop Value를 강제로 설정
    _pComponent._setInheritStyleValues = function (parent_comp)
    {
        if (this._is_created && this._control_element)
        {
            if (parent_comp)
            {
                this._control_element.setElementFont(parent_comp._getCurrentStyleInheritValue("font"));
                this._control_element.setElementColor(parent_comp._getCurrentStyleInheritValue("color"));
                this._control_element.setElementLineHeight(parent_comp._getCurrentStyleInheritValue("lineHeight"));
                this._control_element.setElementWordSpacing(parent_comp._getCurrentStyleInheritValue("wordSpacing"));
                this._control_element.setElementLetterSpacing(parent_comp._getCurrentStyleInheritValue("letterSpacing"));
            }
        }
    };




    nexacro.PopupControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pPopupControl = nexacro.PopupControl.prototype = nexacro._createPrototype(nexacro.Component, nexacro.PopupControl);
    _pPopupControl._type_name = "PopupControl";

    _pPopupControl.visible = false;

    //------------------ internal variable ---------------------//
    _pPopupControl._is_window = true;
    _pPopupControl._attached_comp = null;
    _pPopupControl._is_subcontrol = true;
    _pPopupControl._call_comp = null;
    _pPopupControl._is_popup_control = true;
    _pPopupControl._is_selfclose = true;
    _pPopupControl._default_zindex = nexacro._zindex_popup;
    _pPopupControl._track_capture = true;
    _pPopupControl._is_simple_control = true;
    //===============================================================
    // nexacro.PopupControl : PopupComponent's Create & Update
    //===============================================================

    _pPopupControl.on_create_control_element = function (parent_elem)
    {
        var control_elem = this.on_create_popup_control_element(parent_elem);
        if (control_elem && this._default_zindex > 0)
        {
            control_elem.setElementZIndex(this._default_zindex);
        }
        return control_elem;
    };

    _pPopupControl.on_created = function (_window)
    {
        if (!this._is_created)
        {
            nexacro.Component.prototype.on_created.call(this, _window);
        }

        // 팝업이 화면에 보이지 않아도 body의 스크롤 영역을 차지하게 되기때문에 작게 만들어 구석으로 배치
        var control_elem = this._control_element;
        if (!this.visible && control_elem)
        {
            control_elem.setElementPosition(0, 0);
            control_elem.setElementSize(1, 1);
        }
    };

    _pPopupControl.on_created_contents = function (win)
    {
    	// 팝업이 화면에 보이지 않아도 body의 스크롤 영역을 차지하게 되기때문에 작게 만들어 구석으로 배치
    	var control_elem = this._control_element;
    	if (!this.visible && control_elem)
    	{
    		control_elem.setElementPosition(0, 0);
    		control_elem.setElementSize(1, 1);

    		this._setInheritStyleValues(this);
    	}
    };
  
    _pPopupControl.destroyComponent = function ()
    {
        this._is_alive = false;

        if (this.visible)
        {
        	nexacro._removePopupComponent(this);
            this.visible = false;
        }

        if (nexacro._enableaccessibility)
        {
			var application = nexacro.getApplication();
            if (application && application._accessibilityHistoryList && !this._is_subcontrol)
            {
                application._remove_accessibility_history(this);
            }
        }

        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
            _window._releaseCaptureLock(this._attached_comp);
            this._track_capture = false;
        }

        if (this.parent && this.parent.removeChild)
        {
            this.parent.removeChild(this.id);
        }

        if (this._control_element)
        {
            this._control_element.destroy();
            this._control_element = null;
        }
        this._clearEventListeners();
        this.on_destroy_contents();

        this._is_created = false;

        return true;
    };

    _pPopupControl.on_change_containerRect = function (container_width, container_height)
    {
        var comp = this._attached_comp;
        if (comp)
        {
            comp.move(0, 0, container_width, container_height);
        }
    };

    _pPopupControl._contains = function (oDescendant)
    {
        while (oDescendant)
        {
            if (oDescendant == this._attached_comp) return true;
            oDescendant = oDescendant.parent;
        }
        return false;
    };

    _pPopupControl.set_visible = function (v)
    {
        if (this.visible != v)
        {
            if (v === undefined || v === null) return;

            this.visible = v;
            var control_elem = this._control_element;
            if (control_elem)
            {
                v = nexacro._toBoolean(v);
                control_elem.setElementVisible(v);

                if (this.visible)
                {
                    if (!this._is_subcontrol)
                    {
                        if (this.parent._last_focused)
                            this._call_comp = this.parent._last_focused;
                        else
                            this._call_comp = this.parent;
                    }
                }
                else
                {
                    /*
	                if (this instanceof nexacro._WaitControl)
	                {
	                    //RP 35739, Chrome,Safari에서 waitcursor 사라진 후에 커서가 reset안되는 문제
	                    var pseudo = this._getResultPseudo(this._status, this._pseudo);
	                    this._updateControl(control_elem, pseudo);
	                }
                    */
                    // Visible=false로 변경시 팝업 컴포넌트가 전체화면의 스크롤 영역을 차지하지 않도록
                    // 이동 및 최소화 처리
                    control_elem.setElementPosition(0, 0);
                    control_elem.setElementSize(1, 1);
                }

                if (nexacro._enableaccessibility && this._attached_comp)
                {
                    this._attached_comp._setAccessibilityStatExpanded(v);
                    this._attached_comp._setAccessibilityStatHidden(v);
                }

                if (this._is_selfclose)
                {
                    if (!v)
                    {
                        var _attached_comp = this._attached_comp;
                        if (_attached_comp && _attached_comp.on_fire_oncloseup)
                        {
                            _attached_comp.on_fire_oncloseup(_attached_comp);
                        }

                        nexacro._removePopupComponent(this);
                        var _window = this._getWindow();
                        _window._removeFromCurrentFocusPath(this, false);
                        if (!this._is_subcontrol)
                            this._call_comp._on_focus(true);
                    }
                    else
                    {
                        nexacro._appendPopupComponent(this);
                        
                        var next_zindex = nexacro._zindex_popup + nexacro._current_popups.length - 1;
                        control_elem.setElementZIndex(next_zindex);
                    }
                }
            }
        }
    };


    _pPopupControl._attach = function (comp)
    {
        this._attached_comp = comp;
        if (!comp._isPopupContains())
            comp._setPopupContains(true);
        var contrl_element = this._control_element;
        if (comp && comp != this && comp._control_element && contrl_element)
        {
            var sub_control_element = comp._control_element;
            if (sub_control_element)
            {
                var sub_parent = sub_control_element.parent_elem;
                if (comp._is_created && sub_parent != contrl_element)
                    sub_control_element._removeFromContainer();

                sub_control_element.parent_elem = contrl_element;
            }

            if (comp._is_created)
            {
                sub_control_element._appendToContainer(contrl_element);
            }
        }
    };
    _pPopupControl._detach = function (comp)
    {
        if (this._attached_comp == comp && comp != this)
        {
            this._attached_comp = null;
            comp._setPopupContains(false);
            var contrl_element = this._control_element;
            var sub_control_element = comp._control_element;
            if (sub_control_element && contrl_element)
            {
                if (comp._is_created)
                {
                    sub_control_element._removeFromContainer();
                }
                sub_control_element.parent_elem = null;
            }
        }
    };

    _pPopupControl._is_popup = function (comp)
    {
        return this.visible;
    };


    _pPopupControl._popup = function (left, top, width, height)
    {
        if (!this._attached_comp)
            return;

        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._setCaptureLock(this._attached_comp, true, false);
        }

        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPosition(left, top);
            control_elem.setElementSize(width, height);
            // this._updateClientSize(control_elem);
        }

        this.set_visible(true);
    };

    _pPopupControl._popupBy = function (from_comp, left, top, width, height)
    {
        if (!this._attached_comp || !from_comp)
            return;

        //var elem_pos = from_comp._getWindowPosition();

        // pinchzoom관련 문제로 getWindowPosition을 ElementPositionInFrame으로 대체
        var p = nexacro._getElementPositionInFrame(from_comp.getElement());        
        //var p = this._getElementPosition();

        var win_left = p.x + left;
        var win_top = p.y + top;

        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._setCaptureLock(this._attached_comp, true, false);
        }

        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPosition(win_left, win_top);
            control_elem.setElementSize(width, height);
        }

        this.set_visible(true);
    };

    _pPopupControl._closePopup = function ()
    {
        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this._attached_comp);
        }
        this.set_visible(false);
    };


    _pPopupControl._findOwnerElementHandle = function ()
    {
        // 팝업이 소속된 Layer에 따라 element의 owner handle이 달라진다.
        var ret = {};
        ret.owner_handle = null;
        ret.is_append = true;
        ret.ref_handle = null;

        var win = this._getWindow();
        if (win)
        {
            var layer_info;
            if (this instanceof nexacro._WaitControl)
            {
                layer_info = {};
                layer_info.popup_zindex = nexacro._zindex_waitcursor;
            }
            else
            {
                layer_info = win._getComponentLayerInfo(this);
            }

            if (layer_info.is_modal)
            {
                // modal의 popup: overlay에 append
                var frame = layer_info.frame;
                var overlay_elem = frame._modal_overlay_elem;
                ret.owner_handle = overlay_elem.handle;
                ret.is_append = true;
            }
            else
            {
                if (layer_info.ref_first_modal_frame)
                {
                    // main의 popup + modal이 존재하는 상황
                    var frame = layer_info.ref_first_modal_frame;
                    ret.owner_handle = win.dest_handle;
                    ret.is_append = false;
                    ret.ref_handle = frame._modal_overlay_elem.handle;
                }
                else
                {
                    // main의 popup + modal이 존재하지 않는 상황
                    ret.owner_handle = win.dest_handle;
                    if (win.dest_handle._linked_element)
                        ret.ref_handle = win.dest_handle._linked_element.dest_handle;
                    ret._is_append = true;
                }
            }
        }

        return ret;
    };


    nexacro._WaitControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.PopupControl.call(this, id, position, left, top, width, height, right, bottom, parent);
        this.visible = false;

        //------------------ internal variable ---------------------//
        this._context_list = [];
        this._is_subcontrol = false; // 직접 keydown 처리
        this._is_simple_control = true; // 직접 keydown 처리

        this._img_elem = null;
        this._image_width = 0;
        this._image_height = 0;
    };

    var __pWaitControl = nexacro._WaitControl.prototype = nexacro._createPrototype(nexacro.PopupControl, nexacro._WaitControl);
    __pWaitControl._type_name = "WaitControl";

    __pWaitControl._is_popup_control = true;
    __pWaitControl._is_selfclose = false;
    __pWaitControl._default_zindex = nexacro._zindex_waitcursor;

    //===============================================================
    // nexacro._WaitControl : PopupComponent's Create & Update
    //===============================================================
    __pWaitControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._img_elem = new nexacro.ImageElement(control_elem);
        }
    };

    __pWaitControl.on_created_contents = function (_window)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var img_elem = this._img_elem;
            if (img_elem)
            {
                img_elem.setElementVisible(true);
                img_elem.create(_window);
            }
        }

        //TODO 
        if (nexacro._enableaccessibility)
            this.on_apply_accessibility();
    };

    __pWaitControl.on_change_containerRect = function (container_width, container_height)
    {
        var img_elem = this._img_elem;
        if (img_elem)
        {
            var left = Math.round((container_width - this._image_width) / 2);
            var top = Math.round((container_height - this._image_height) / 2);

            img_elem.setElementPosition(left, top);
            img_elem.setElementSize(this._image_width, this._image_height);
        }
    };

    __pWaitControl._getAccessibilityLabel = function (accessibility)
    {
        return "Wait Cursor";
    };


    __pWaitControl._on_loadimage = function (imgurl, w, h)
    {
        if (!this._is_alive)
            return;

        var img_elem = this._img_elem;
        if (img_elem && w > 0 && h > 0)
        {
            this._image_width = w;
            this._image_height = h;

            var bw = this._adjust_width;
            var bh = this._adjust_height;
            var left = Math.round((bw - w) / 2);
            var top = Math.round((bh - h) / 2);

            img_elem.setElementPosition(left, top);
            img_elem.setElementSize(w, h);

            img_elem.setElementImage(nexacro.UrlObject(imgurl));
        }
    };

    __pWaitControl.setImage = function (imageurl)
    {
        var img_elem = this._img_elem;
        if (img_elem)
        {
            var imagesize = nexacro._getImageSize(imageurl, this._on_loadimage, this);
            if (imagesize)
            {
                this._image_width = imagesize.width;
                this._image_height = imagesize.height;

                var bw = this._adjust_width;
                var bh = this._adjust_height;

                var left = Math.round((bw - imagesize.width) / 2);
                var top = Math.round((bh - imagesize.height) / 2);

                img_elem.setElementPosition(left, top);
                img_elem.setElementSize(imagesize.width, imagesize.height);
                img_elem.setElementImage(nexacro.UrlObject(imageurl));
            }
        }
    };



    __pWaitControl.show = function ()
    {
        if (!this._is_created || !this.parent)
            return;

        var _window = this._getWindow();
        if (_window)
        {
            var width, height;

            if (_window.frame)
            {
                var frame = _window.frame;
                width = frame.getOffsetWidth();
                height = frame.getOffsetHeight();
            }
            else
            {
                width = _window.getClientWidth();
                height = _window.getClientHeight();
            }

            _window._setCaptureLock(this, true, true);

            // Window에 fit 하므로 0,0에 배치
            this._adjustPosition(0, 0, null, null, width, height, width, height);
            this.on_update_position(true, true);

            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.setElementPosition(0, 0);
                control_elem.setElementSize(width, height);
            }

            this.set_visible(true);

        }
    };
    __pWaitControl.hide = function ()
    {
        var _window = this._getWindow();
        if (_window)
        {
            _window._releaseCaptureLock(this);

            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.setElementSize(1, 1);
            }
        }

        if (this._is_created && this._is_alive)
        {
            var form = this.parent;

            while (form)
            {
                if (form._is_form)
                    break;

                form = form._last_focused;
            }

			this.set_visible(false);

            if (form)
            {
                var last_focus = form._last_focused;
                if (last_focus)
                {
                    var cursor;
                    if (form._obj_mousemove && (form._obj_mousemove != last_focus))
                    {
                        last_focus._on_afterHideWaitComp("enabled");

                        if (form._obj_mousemove instanceof nexacro._WaitControl)
                            cursor = nexacro.CursorObject("arrow");
                        else
                            cursor = form._obj_mousemove._cursor;
                    }
                    else
                    {
                        last_focus._on_afterHideWaitComp(last_focus._pseudo);
                        cursor = last_focus._cursor ? last_focus._cursor : null;
                    }
                }
            }

            

        }
    };

    __pWaitControl._addContext = function (context)
    {
        if (context)
            this._context_list.push(context);
    };

    __pWaitControl._removeContext = function (context)
    {
        if (!context)
            return;
        var idx = nexacro._indexOf(this._context_list, context);
        if (idx >= 0)
        {
            this._context_list[idx] = null;
            delete this._context_list[idx];
            this._context_list.shift();
        }
    };

    __pWaitControl.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        return true;
    };

    __pWaitControl._on_keydown = function (elem, keycode, altKey, ctrlKey, shiftKey)
    {
        if (keycode == nexacro.Event.KEY_TAB)
        {
            elem._event_stop = true;
        }
        else if (keycode == nexacro.Event.KEY_ESC)
        {
            // Stop All Communication
            var context_list = this._context_list;
            var len = context_list.length;
            for (var i = 0; i < len; i++)
            {
                var context = context_list[i];
                if (context._is_form || context._is_application)
                {
                    context._stopTransaction();
                }
            }
        }

        return true;
    };


    nexacro.CanvasComponent = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this.id = this.name = id || null;

        //property
        this.enableevent = false;

        //--------------- internal variable ---------------------//
        this._apply_client_padding = false;
        this._canvas = null;
        this._drawn = false;

        this._control_element = null;
        this._inner_elem = null;

    };
    var _pCanvasComponent = nexacro._createPrototype(nexacro.Component, nexacro.CanvasComponent);
    nexacro.CanvasComponent.prototype = _pCanvasComponent;
    // overide nexacro.Object
    _pCanvasComponent._type_name = "CanvasComp";

    _pCanvasComponent.on_create_contents = function ()
    {
        var control = this.getElement();
        var tcanvas = new nexacro.CanvasElement(control);
        if (tcanvas)
        {
            tcanvas.setElementPosition(0, 0);
            tcanvas.setElementSize(this._getClientWidth(), this._getClientHeight());
        }
        this._canvas = tcanvas;
    };

    // -- All Componets overide this function
    _pCanvasComponent.on_created_contents = function (_window)
    {
        var pCanvas = this._canvas;
        if (pCanvas)
        {
            pCanvas.create(_window);
        }
        this.ondraw(pCanvas);
    };

    _pCanvasComponent._initInner = function ()
    {
        this._apply_status();

    };


    _pCanvasComponent.on_destroy_contents = function ()
    {
        if (this._canvas)
        {
            this._canvas.destroy();
            this._canvas = null;
        }
    };


    _pCanvasComponent.on_change_containerRect = function (width, height)
    {
        if (this._canvas)
        {
            this._canvas._moveCanvas(0, 0, width, height);
            this._drawn = false;
            this.ondraw(this._canvas);
        }
    };

    // onDraw
    _pCanvasComponent.ondraw = function (canvas) { };
    _pCanvasComponent.redraw = function ()
    {
        this.ondraw(this._canvas);
    };

    //==============================================================================
    // ButtonCtrl : Button used as Control ==> use Event Notifiers, style control - controlType
    // RepeatPushedButtonCtrl : ButtonCtrl : has repeat push operation
    // TrackButtonCtrl : ButtonCtrl : has mouse track opetation
    //==============================================================================

}

if (_process)
{
    delete _process;
    delete _pComponent;
    delete _pPopupControl;
    delete __pWaitControl;
    delete _pCanvasComponent;
}
