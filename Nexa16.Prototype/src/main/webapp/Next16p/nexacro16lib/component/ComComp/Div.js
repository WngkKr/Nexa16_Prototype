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

if (!nexacro.Div)
{
    //==============================================================================
    // nexacro.Div
    //==============================================================================
    nexacro.Div = function (id, position, left, top, width, height, right, bottom, parent)
    {
    	nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
        
        this.form = new nexacro._InnerForm("form", "absolute", 0, 0, width, height, null, null, this);
    };

    var _pDiv = nexacro._createPrototype(nexacro.Component, nexacro.Div);
    nexacro.Div.prototype = _pDiv;
    _pDiv._type_name = "Div";

    _pDiv._event_list = {
        "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
        "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onmove": 1, "onsize": 1,
        //added event
        "onvscroll": 1, "onhscroll": 1, "onmouseup": 1, "onmousedown": 1,
        // Touch,TouchGesture
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1        
    };


    _pDiv.async = true;
    _pDiv.url = "";
    _pDiv.text = "";
    _pDiv.textAlign = "center";
    _pDiv.verticalAlign = "middle";
    _pDiv.form = null;
    _pDiv._apply_client_padding = false;

    _pDiv._is_container = true;
    _pDiv._cell_elem = null;

    //Accessibility
    _pDiv._accessibility_role = "Div";
   
    // ====================================================================
    // nexacro.Div : Create & Update
    // ====================================================================

    _pDiv.on_create_contents = function ()
    {
    };

    _pDiv.on_created_contents = function (_window)
    {
        var form = this.form;

        if (!this.url)
            form.createComponent();
        else
        {
            if (this.url && form._is_loaded && !form._is_created)
            {
                form.createComponent();
            }
        }
        this.on_apply_text();

        this._updateFormPosition();

    };

    _pDiv.on_create_contents_command = function ()
    {
        var str = "";

        return str;
    };

    _pDiv.on_attach_contents_handle = function (win)
    {
        var form = this.form;

        if (!this.url)
            form.createComponent();
        else
        {
            if (this.url && form._is_loaded && !form._is_created)
            {
                form.createComponent();
            }
        }

        this.on_apply_text();

        this._updateFormPosition();

    };

    _pDiv.on_destroy_contents = function ()
    {
        if (this._cell_elem)
        {
            this._cell_elem.destroy();
            this._cell_elem = null;
        }

        if (this.form)
        {
            this.form._destroy();
            this.form = null;
        }

        this._user_property_list = null;
    };

    _pDiv.on_apply_prop_enable = function (v)
    {
        if (this.form)
        {
            this.form._setEnable(v);
        }
    };

    _pDiv.on_change_containerRect = function (width, height)
    {
        if (this._cell_elem)
        {
            this._cell_elem.setElementSize(width, height);
        }

        this._updateFormPosition();
    };

    _pDiv.on_get_css_assumedtypename = function ()
    {
        return this._type_name;
    };

    // ====================================================================
    // nexacro.Div : Property
    // ====================================================================

    _pDiv.on_apply_url = function (reload)
    {
        var form = this.form;
        if (!form)
            return;
            
        if (this.url && this.url.length > 0)
        {
        	nexacro._getLayoutManager().clearLayout(form);

            var asyncmode = this.async;

            if (form._is_loaded && reload != true)
            {
                var confirm_message = form._on_beforeclose();
                if (form._checkAndConfirmClose(confirm_message) == false)
                {
                    return;
                }
                    
                form._on_close();
            }

            // When set_url() before addChild() should handle null error in variable '_url'.
            // And loadForam() is process on_created_contents().Associated div1-1
            var _parent = this.parent;
            if (_parent != null)
            {
                while (!_parent._url)
                {
                    _parent = _parent.parent;
                }             
                form.loadForm(this.url, asyncmode, true, _parent._url);
            }

            this._delete_text();
        }
        else
        {
            if (form._is_loaded)
            {
                var confirm_message = form._on_beforeclose();
                if (form._checkAndConfirmClose(confirm_message) == false)
                {
                    return;
                }
                form._on_close();
            }
           
            this.on_apply_emptyurl();
        }

        if (form.onactivate && form.onactivate._has_handlers)
        {
            var evt = new nexacro.ActivateEventInfo(form, "onactivate", true);
            form.onactivate._fireEvent(form, evt);
            evt = null;
        }
    };

    _pDiv.on_apply_emptyurl = function ()
    {
        this.form._destroy();
        this.form = null;

        var pos = this._getFormPosition();
        this.form = new nexacro._InnerForm("form", "absolute", pos.left, pos.top, pos.width, pos.height, null, null, this);
        this.form.createComponent();
        
        if (this._cell_elem)
        {
            this._cell_elem.destroy();
            this._cell_elem = null;
        }
            
        this.on_apply_text();
    };

    _pDiv.getFocus = function ()
    {
        return this.parent ? this.parent.getFocus() : null;
    };

    _pDiv.getParentContext = function ()
    {
        return this.parent;
    };

    _pDiv.reload = function ()
    {
        this.on_apply_url(true);
    };

    _pDiv.addChild = function (id, obj)
    {
        var form = this.form;
        var ret = form.addChild(id, obj);

        return ret;
    };

    _pDiv.insertChild = function (idx, id, obj)
    {
        var form = this.form;
        var ret = form.insertChild(idx, id, obj);

        return ret;
    };

    _pDiv.removeChild = function (id)
    {

        var form = this.form;
        var ret = form.removeChild(id);
        
        return ret;
    };

    _pDiv.on_apply_text = function (v)
    {
        var form = this.form;
        if (form && ((form._child_list && form._child_list.length > 0) || this.url))
            return;
            
        var control_elem = this.getElement();

        if (!v)
            v = this._display_text;

        if (control_elem)
        {
            var cell_elem = this._cell_elem;           
            if (!cell_elem && v)
            {
                var win = this._getWindow();
                cell_elem = this._cell_elem = new nexacro.TextBoxElement(control_elem);
                cell_elem.create(win);
            }

            if (cell_elem)
            {
                cell_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
                cell_elem.setElementVerticalAlign(this.verticalAlign);
                cell_elem.setElementTextAlign(this.textAlign);
                cell_elem.setElementText(v);
            }
        }
    };

    _pDiv.set_async = function (v)
    {
        this.async = nexacro._toBoolean(v);
    };

    _pDiv.set_url = function (v, basync)
    {
        if (v != this.url)
        {
            this.url = v;
            //if (this._is_created)
                this.on_apply_url();
        }
    };

    _pDiv.addLayout = function (name, obj)
    {
        var form = this.form;
        if (form)
            form.addLayout(name, obj);
    };

    _pDiv.getSetter = function (name, fnname)
    {
        if (!this._user_property_list)
            this._user_property_list = [];
        this._user_property_list[name] = 1;
        if (!fnname)
            fnname = "set_" + name;
        var fn = this[fnname];
        if (fn)
        {
            return new nexacro.SetterBinder(this, name, fn);
        }
        return new nexacro.PropBinder(this, name);
    };

    _pDiv.set_scrollbarsize = function (v)
    {
        return this.form.set_scrollbarsize(v);
    };

    _pDiv.set_scrollbartype = function (v)
    {
        return this.form.set_scrollbartype(v);
    };

    _pDiv.set_scrolltype = function (v)
    {
        return this.form.set_scrolltype(v);
    };


    _pDiv.set_padding = nexacro._emptyFn;
    //===============================================================
    // nexacro.Div : Override
    //===============================================================

    _pDiv._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp)
    {
        return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
    };
     
    _pDiv._on_bubble_close = function (event_bubbles, fire_comp, refer_comp)
    {
        return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
    };

    _pDiv._on_activate = function ()
    {
        nexacro.Component.prototype._on_activate.call(this);

        if (this.form)
            this.form._on_activate();

        return true;
    };

    _pDiv._on_deactivate = function ()
    {
        nexacro.Component.prototype._on_deactivate.call(this);

        if (this.form)
            this.form._on_deactivate();

        return true;
    };

    _pDiv.getOwnerFrame = function ()
    {
        return this._getOwnerFrame();
    };

    //===============================================================
    // nexacro.Div : Logical part
    //===============================================================

    _pDiv._delete_text = function ()
    {
        if (this._cell_elem)
        {
            this._cell_elem.destroy();
            this._cell_elem = null;
        }
        
    };

    _pDiv._clearUserFunctions = nexacro._emptyFn;
    _pDiv._loadedForm = nexacro._emptyFn;

    _pDiv._loadInclude = function (mainurl, url)
    {
        var asyncmode = this.async;
        if (!this._is_created)
        {
            // Div가 포함된 form을 로드할때 로드할 include는 async로 로드하고
            // 한꺼번에 callback 처리

            // 동적으로 만들어진 Div인 경우, 내부 include를 일부러 async로 처리하면 안되고
            // Div 본체와 동일하게 처리해야함.
            if (!this.parent || !this.parent._is_created)
                asyncmode = true;
        }

    	//application._loadInclude.call(this, mainurl, url, asyncmode);        
        this._loadIncludeJS.call(this, mainurl, url, asyncmode);
    };

    _pDiv._loadIncludeJS = function (mainurl, url, asyncmode)
    {
    	var suburl = nexacro._getServiceLocation(url);
    	var includeurl = [];
    	includeurl.push(suburl);
    	includeurl.push(".js");
    	suburl = includeurl.join("");

    	var len = this._executescriptlist.length;
    	for (var i = 0; i < len; i++)
    	{
    		if (this._executescriptlist[i].url == mainurl)
    		{
    			this._executescriptlist.splice(i, 0, { url: suburl, fn: nexacro._emptyFn });
    			break;
    		}

    	}

    	var service = nexacro._getServiceObject(url);
    	this._load_manager.loadIncludeModule(suburl, null, asyncmode, service);
    };

    _pDiv._closeForm = function ()
    {
        if (this.form)
        {
            this.form._destroy();
            this.form = null;
        }
    };

    _pDiv._getFormPosition = function ()
    {
        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;
        
        width = this._getClientWidth();
        height = this._getClientHeight();
        
        if (!this._is_initcssselector)
            this._initCSSSelector();

        var border = this._getCurrentStyleBorder();
        var border_l = border_t = border_r = border_b = 0;
        
        if (border)
        {
            border_l = border.left._width;
            border_t = border.top._width;
            border_r = border.right._width;
            border_b = border.bottom._width;
        }
        
        left = 0;
        top = 0;
        //width -= border_l + border_r;
       // height -= border_t + border_b;

        return {left:left,top:top,width:width,height:height};
    };

    _pDiv._updateFormPosition = function ()
    {
        var form = this.form;

        if (!form)
            return;

        var pos = this._getFormPosition();

        form._setPos(pos.left, pos.top);
        form._setSize(pos.width, pos.height);
    };

    _pDiv._getSortedDecendants = function (p, include_not_tabstop, bAccessibility)
    {
        return [this.form];
    };

    _pDiv._getTabOrderNext = function (current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite)
    {
        return this.form._getTabOrderNext(current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite);
    };

    _pDiv._getTabOrderFirst = function (bAccessibility, bEditable, edittype, bComposite)
    {
        return this.form._getTabOrderFirst(bAccessibility, bEditable, edittype, bComposite);
    };

    _pDiv._getTabOrderLast = function (bAccessibility, bEditable, edittype, bComposite)
    {
        return this.form._getTabOrderLast(bAccessibility, bEditable, edittype, bComposite);
    };

    _pDiv._getHeadingOrderNext = function (current, direction)
    {
        return this.form._getHeadingOrderNext(current, direction);
    };

    _pDiv._getHeadingOrderFirst = function ()
    {
        return this.form._getHeadingOrderFirst();
    };

    _pDiv._getHeadingOrderLast = function ()
    {
        return this.form._getHeadingOrderLast();
    };

    _pDiv._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, bAccessibility, bhotkey)
    {
        return this.form._searchNextTabFocus(current, bSearchFromFirst, opt_force_cycle, bAccessibility, bhotkey);
    };

    _pDiv._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, bAccessibility, bhotkey)
    {
        return this.form._searchPrevTabFocus(current, bSearchFromLast, opt_force_cycle, bAccessibility, bhotkey);
    };
    _pDiv._searchNextHeadingFocus = function (current, bSearchFromFirst, opt_force_cycle)
    {
        return this.form._searchNextHeadingFocus(current, bSearchFromFirst, opt_force_cycle);
    };

    _pDiv._searchPrevHeadingFocus = function (current, bSearchFromLast, opt_force_cycle)
    {
        return this.form._searchPrevHeadingFocus(current, bSearchFromLast, opt_force_cycle);
    };

    _pDiv._setLastFocus = function (comp)
    {
        if (this.form[comp.id])
        {
            nexacro.Component.prototype._setLastFocus.call(this, this.form);
            this.form._last_focused = comp;
        }
        else
            nexacro.Component.prototype._setLastFocus.call(this,comp);
    };

    _pDiv._getLastFocused = function ()
    {
        return this.form._getLastFocused();
    };

    //===============================================================
    // nexacro.Div : Util Function
    //===============================================================
    _pDiv._getAutoWidth = function ()
    {
    	var form = this.form;
    	if (!form)
    		return 0;

    	var i = 0;
        var ret = 0;
        var comp = null;

        var min_l = null;
        var min_r = null;

        var right_comp_max = 0;
        var comp_width = 0;
        var form = this.form;
 
        for (i in form._child_list)
        {
            comp = form._child_list[i];
            if (comp)
            {
                if ((comp.left && comp.right) || (!comp.left && !comp.right))
                {
                    return form.maxwidth;
                }
                var strLeft = new String(comp.left);
                var strRight = new String(comp.right);

                if ((strLeft && strLeft.indexOf("%") > -1) || (strRight && strRight.indexOf("%") > -1))
                {
                    return form.maxwidth;
                }

                if (i == 0)
                {
                    if (comp.left)
                    {
                        min_l = comp.left;
                    }
                    else if (comp.right)
                    {
                        comp_width = comp._adjust_width;
                        min_r = comp.right;
                    }

                    right_comp_max = comp._adjust_left + comp._adjust_width;
                }
                else
                {
                    if (comp.left)
                    {
                        min_l = (min_l === null) ? comp.left : Math.min(min_l, comp.left);
                    }
                    else if (comp.right)
                    {
                        min_r = (min_r === null) ? comp.right : Math.min(min_r, comp.right);
                    }

                    right_comp_max = Math.max(right_comp_max, (comp._adjust_left + comp._adjust_width));

                    if (min_l == 0)
                    {
                        comp_width = Math.max(comp_width, comp._adjust_width);
                    }
                }
            }
        }

        if (min_l == null)
        {
            ret = parseInt(comp_width) + parseInt(min_r);
        }
        else if (min_r == null)
        {
            ret = right_comp_max;
        }
        else
        {
            ret = min_l + min_r + right_comp_max;
        }

        return ret;
    };

    _pDiv._getAutoHeight = function ()
    {
    	var form = this.form;
    	if (!form)
    		return 0;

        var i = 0;
        var ret = 0;
        var comp = null;

        var min_t = null;
        var min_b = null;

        var bottom_comp_max = 0;
        var comp_height = 0;


        for (i in form._child_list)
        {
            comp = form._child_list[i];
            if (comp)
            {
                if ((comp.top && comp.bottom) || (!comp.top && !comp.bottom))
                {
                    return form.maxheight;
                }
                var strTop = new String(comp.top);
                var strBottom = new String(comp.bottom);

                if ((strTop && strTop.indexOf("%") > -1) || (strBottom && strBottom.indexOf("%") > -1))
                {
                    return form.maxheight;
                }

                if (i == 0)
                {
                    if (comp.top)
                    {
                        min_t = comp.top;
                    }
                    else if (comp.bottom)
                    {
                        comp_height = comp._adjust_height;
                        min_b = comp.bottom;
                    }

                    bottom_comp_max = comp._adjust_top + comp._adjust_height;
                }
                else
                {
                    if (comp.top)
                    {
                        min_t = (min_t === null) ? comp.top : Math.min(min_t, comp.top);
                    }
                    else if (comp.bottom)
                    {
                        min_b = (min_b === null) ? comp.bottom : Math.min(min_b, comp.bottom);
                    }

                    bottom_comp_max = Math.max(bottom_comp_max, (comp._adjust_top + comp._adjust_height));

                    if (min_t == 0)
                    {
                        comp_height = Math.max(comp_height, comp._adjust_height);
                    }
                }
            }
        }

        if (min_t == null)
        {
            ret = parseInt(comp_height) + parseInt(min_b);
        }
        else if (min_b == null)
        {
            ret = bottom_comp_max;
        }
        else
        {
            ret = min_t + min_b + bottom_comp_max;
        }

        return ret;
    };

    delete _pDiv;


    if (!nexacro._InnerForm)
    {
        nexacro._InnerForm = function (id, position, left, top, width, height, right, bottom, parent)
        {
            nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent);
        };

        var _pInnerForm = nexacro._createPrototype(nexacro.Form, nexacro._InnerForm);
        nexacro._InnerForm.prototype = _pInnerForm;
        _pInnerForm._type_name = "Form";
        _pInnerForm._is_subcontrol = false;
        
        _pInnerForm.on_created_contents = function (win)
        {
            nexacro.FormBase.prototype.on_created_contents.call(this,win);
            this._changeUserStatus("contents", true);
        };

        _pInnerForm.set_url = function (v)
        {
            this.parent.set_url(v);
        };

        _pInnerForm.loadForm = function (formurl, async, reload, baseurl)
        {
            if (this._load_manager)
            {
                var url = nexacro._getFDLLocation(formurl, baseurl);

                var parent = this.parent;
                while (parent && !parent._is_frame)
                {
                    if (parent._is_form)
                    {
                        var _p_url = parent._url;
                        if (url == _p_url)
                        {
                            trace("[ERROR] can not use same url with parent form");
                            return;
                            //throw nexacro.MakeURIError(this, "native_load_parent", formurl);
                        }
                    }
                    parent = parent.parent;
                }

                this._url = url;

                this._base_url = nexacro._getBaseUrl(url);

                if (this._load_manager)
                    this._load_manager.clearAllLoad();

                this._clearUserFunctions();

                this._is_loading = true;
                if (this.parent._is_frame && this.parent.form == this)
                {
                    // ChildFrame > Form  
                    var application = nexacro.getApplication();
                    if (application)
                        application._registerLoadforms(this);
                }

                var service = nexacro._getServiceObject(formurl);
                var ret = this._load_manager.loadMainModule(url, undefined, async, reload, service);
            }
        };

        _pInnerForm.addChild = function (id, obj)
        {
            var ret = -1;

            if (id && id.length <= 0)
            {
                return -1;
            }
            if (!obj)
            {
                throw nexacro.MakeReferenceError(this, "reference_not_define", id);
            }

            if (this[id])
            {
                throw nexacro.MakeNativeError(this, "native_exist_id", id);
            }

            if (!obj.parent && !obj._is_created)
                obj._unique_id = this._unique_id ? (this._unique_id + "." + id) : id;

            obj.parent = this;
            obj._refform = this;

            this[id] = obj;
            this.all.add_item(id, obj);


            if (this.visible && !this._real_visible) obj._real_visible = false;
            else obj._real_visible = this.visible;

            if (obj._is_component)
            {
                ret = this.components.add_item(id, obj);
                this._child_list.push(obj);
                if (obj._is_alive && obj._is_created)
                    this._control_element.appendChildElement(obj.getElement());

            }
            else if (obj instanceof nexacro.BindItem)
            {
                ret = this.binds.add_item(id, obj);
            }
            else
            {
                ret = this.objects.add_item(id, obj);
            }

            if (obj._is_component)
                this.parent._delete_text();

            return ret;
        };


        _pInnerForm.removeChild = function (id)
        {
            var ret = nexacro.Form.prototype.removeChild.call(this, id);

            this.parent.on_apply_text();

            return ret;
        };
        
        _pInnerForm.reload = function ()
        {
            this.parent.reload();
        };

        _pInnerForm.getOwnerFrame = function ()
        {
            var frame = null;
            if (this.parent && !(this.parent instanceof nexacro.Frame))
            {
                frame = this.parent.getOwnerFrame();
            }
            else
            {
                frame = this.parent;
            }
            return frame;
        };

        _pInnerForm.on_update_position = function (resize_flag, move_flag)
        {

            /*  need to check...
            var child_list = this._child_list;
            var len = child_list ? child_list.length : 0;
            for (var i = 0; i < len; i++)
            {
                var comp = child_list[i];
                if (comp._isPopupVisible && comp._isPopupVisible())
                {
                    if (comp._closePopup)
                        comp._closePopup();
                }
                comp = null;
            }
            */

            nexacro.Form.prototype.on_update_position.call(this, resize_flag, move_flag);

            if (!this._cross_base)
            {
                if (this._based_list && this._based_list.length > 0)
                {
                    this._update_based_position();
                }
            }
        };

        _pInnerForm.getParentContext = function ()
        {
            return this.parent.getParentContext();
        };

        _pInnerForm.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
        {
            this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
        };

        _pInnerForm.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
        {
            this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
        };

        _pInnerForm.on_vscroll = function (obj, e)
        {
            nexacro.Form.prototype.on_vscroll.call(this, obj, e);
            this.parent.on_vscroll(obj, e);
            return true;
        };

        _pInnerForm.on_hscroll = function (obj, e)
        {
            nexacro.Form.prototype.on_hscroll.call(this, obj, e);
            this.parent.on_hscroll(obj, e);

            return true;
        };

        _pInnerForm.on_fire_onhscroll = function (eventid, pos, strType, evtkind)
        {
            nexacro.Component.prototype.on_fire_onhscroll.call(this, eventid, pos, strType, evtkind);
            nexacro.Component.prototype.on_fire_onhscroll.call(this.parent, eventid, pos, strType, evtkind);
        };

        _pInnerForm.on_fire_onvscroll = function (eventid, pos, strType, evtkind)
        {
            nexacro.Component.prototype.on_fire_onvscroll.call(this, eventid, pos, strType, evtkind);
            nexacro.Component.prototype.on_fire_onvscroll.call(this.parent, eventid, pos, strType, evtkind);
        };

        _pInnerForm.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
        {
            if (value)
                return changestatus;

            return applyuserstatus;
        };

        /*
        _pInnerForm.on_fire_user_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
        {
            var ret = nexacro.Component.prototype.on_fire_user_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            if (this.vscrollbar && this.vscrollbar.enable && this.vscrollbar.visible)
            {
                var vscrollbar = this.vscrollbar;
                var old_vpos = vscrollbar._pos;
                this._setVScrollDefaultAction(vscrollbar, wheelDeltaY);
                var new_vpos = vscrollbar._pos;
                if (old_vpos == new_vpos) return ret;
            }
            else
                return ret;

            if (nexacro._OS == "Mac OS")
            {
                if (this.hscrollbar && this.hscrollbar.enable)
                {
                    var hscrollbar = this.hscrollbar;
                    var old_hpos = hscrollbar._pos;
                    this._setHScrollDefaultAction(hscrollbar, wheelDeltaX);
                    var new_hpos = hscrollbar._pos;
                    if (old_hpos == new_hpos) return ret;
                }
                else
                    return ret;
            }

            if (!ret)
                ret = nexacro.Component.prototype.on_fire_user_onmousewheel.call(this.parent, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return ret;
        };
        */
        delete _pInnerForm;
    }

}
