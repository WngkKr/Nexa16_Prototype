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

if (!nexacro.StepControl)
{
    //step
    nexacro.StepChangeEventInfo = function (obj, id, preindex, postindex)
    {
        this.id = this.eventid = id || "onstepchanged";
        this.fromobject = obj._form || obj;
        this.fromreferenceobject = obj;

        this.preindex = preindex;
        this.postindex = postindex;
    };


    var _pEventStepChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepChangeEventInfo);
    nexacro.StepChangeEventInfo.prototype = _pEventStepChangeEventInfo;
    _pEventStepChangeEventInfo._type_name = "StepChangeEventInfo";
    delete _pEventStepChangeEventInfo;

    //step
    nexacro.StepMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
        nexacro.ClickEventInfo.call(this, obj, id || "onstepmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

        this.index = index < 0 ? -1 : index;
    };
    var _pEventStepMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepMouseEventInfo);
    nexacro.StepMouseEventInfo.prototype = _pEventStepMouseEventInfo;
    _pEventStepMouseEventInfo._type_name = "StepMouseEventInfo";
    delete _pEventStepMouseEventInfo;

    //step
    nexacro.StepDragEventInfo = function (obj, id, index, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
        nexacro.DragEventInfo.call(this, obj, id || "onstepdrag", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
        this.index = index ? -1 : index;
    };

    var _pEventStepDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.StepDragEventInfo);
    nexacro.StepDragEventInfo.prototype = _pEventStepDragEventInfo;
    _pEventStepDragEventInfo._type_name = "StepDragEventInfo";
    delete _pEventStepDragEventInfo;

    //==============================================================================
    // nexacro.StepControl
    //==============================================================================
    nexacro.StepControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        /* internal variable */
        this._items = [];
        this._icon_info =
            {
                width: 0,
                height: 0,
                isloaded: false
            };
        this._form = parent;
        this._refform = parent;
    };

    var _pStepControl = nexacro._createPrototype(nexacro.Component, nexacro.StepControl);
    nexacro.StepControl.prototype = _pStepControl;
    _pStepControl._type_name = "StepControl";

    _pStepControl.stepcount = 0;
    _pStepControl.stepindex = 0;
    _pStepControl.text = "";
    _pStepControl.canstepchange = null;
    _pStepControl.onstepchanged = null;

    _pStepControl.verticalAlign = "bottom";
    _pStepControl.textAlign = "center";
    _pStepControl.stepitemsize = undefined;
    _pStepControl.stepitemgap = 5;
    _pStepControl._default_stepitemsize = 15;

    //        this._oldstepindex = null;
    _pStepControl._prestepindex = null;
    _pStepControl._poststepindex = null;
    _pStepControl._prestepcount = null;
    _pStepControl._poststepcount = null;

    _pStepControl._itemid = "stepitem";

    _pStepControl._is_nc_control = true;
    _pStepControl._is_subcontrol = true;
    _pStepControl._accessibility_role = "step";
    /* event list */
    _pStepControl._event_list =
        {
            "onclick": 1, "ondblclick": 1,
            "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
            "onkillfocus": 1, "onsetfocus": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1, "ondragend": 1,
            "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1,
            "canstepchange": 1, "onstepchanged": 1
        };

    // ====================================================================
    // nexacro.StepControl : Create & Destroy & Update 
    // ====================================================================
    _pStepControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var items = this._items;
            var stepButton;
            var stepcount = this.stepcount;
            for (var i = 0; i < stepcount; i++)
            {
                stepButton = new nexacro.StepImageButtonControl(this._itemid + i, "absolute", 0, 0, 0, 0, null, null, this);
                stepButton._setEventHandler("onclick", this.__onStepButtonClick, this);
                stepButton.createComponent();
                items[i] = stepButton;
            }

            var info = this._icon_info;
            var img = stepButton ? stepButton._getCSSStyleValue("icon", undefined, "selected") : "";
            var size;

            if (img)
            {
                size = nexacro._getImageSize(img.url, this._loadImage, this);
                if (size)
                {
                    info.width = size.width;
                    info.height = size.height;
                    info.isloaded = true;
                }
            }         

            if (this.text)
            {
                var text_elem = new nexacro.TextBoxElement(control_elem);
                this._text_elem = text_elem;
                text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
            }
           
        }
    };

    _pStepControl.on_create_contents_command = function (win)
    {
        var str = "";
        var text_elem = this._text_elem;
        if (text_elem)
        {
            str += text_elem.createCommand(win);
        }

        //button
        //str += this._getStepButtonCommand();
        //Todo..
        return str;
    };

    _pStepControl.on_created_contents = function (win)
    {
        if (this.text || this.expr) // 2013-07-30 pss [SEQ65729] move for zindex problem at runtime reload
        {

            this.on_apply_text();
            var text_elem = this._text_elem; // 2013-07-30 pss [SEQ65729] move for zindex problem at runtime reload
            if (text_elem)
            {
                text_elem.create(win);
            }
        }
        //this.on_apply_text(); // 2013-07-30 pss [bugfix] move for zindex problem at runtime reload
        this.on_apply_expr();
        this.on_apply_stepcount();
        this._setEventHandler("onsize", this.__onSize);
    };

    _pStepControl.on_destroy_contents = function ()
    {
        var text_elem = this._text_elem;

        this._deleteStepButton();
        if (text_elem)
        {
            text_elem.destroy();
        }

        this._text_elem = null;
    };

    _pStepControl.on_change_containerRect = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var form = this._form;
            if (form)
            {
                this.on_apply_stepcount();
            }
        }
    };

    _pStepControl._on_getAccessibilityAdditionalLabel = function ()
    {
        return this.stepindex + " " + this.stepcount;
    };

    //_pStep._on_getAccessibilityAdditionalRole = function ()
    //{
    //	return " Step";
    //};
    // ====================================================================
    // nexacro.Step : Properties
    // ====================================================================


    /* Apply Stlye */
    _pStepControl.on_apply_cursor = function (v)
    {
        nexacro.Component.prototype.on_apply_cursor.call(this, v);
        var items = this._items;
        var item_len = items.length;

        for (var i = 0; i < item_len; i++)
        {
            items[i].on_apply_cursor(v);
        }
    };
    
    _pStepControl.set_stepitemsize= function (v)
    {
        v = parseInt(v) | 0;
        if (this.stepitemsize != v)
        {
            this.stepitemsize = v;
            this.on_apply_stepitemsize();
        }
            
    };

    _pStepControl.on_apply_stepitemsize = function (v)
    {
        this.on_apply_stepcount();
    };

    _pStepControl.set_stepitemgap = function (v)
    {
        v = parseInt(v) | 0;
        if (this.stepitemgap != v)
        {
            this.stepitemgap = v;
            this.on_apply_stepitemgap();
        }

    };

    _pStepControl.on_apply_stepitemgap = function (v)
    {
        this.on_apply_stepcount();
    };

    _pStepControl.set_stepcount = function (v)
    {
        if (v != this.stepcount)
        {
            if ((+v) != (+v))
            {
                v = 0;
            }
            else
            {
                v = parseInt(v) | 0;
            }
            this._prestepindex = this.stepindex;
            this._prestepcount = this.stepcount;

            this._poststepcount = v;

            if (this._prestepcount != this._poststepcount)
            {
                this.stepcount = this._poststepcount;

                if (this.stepindex >= this.stepcount)
                    this.stepindex = this.stepcount - 1;

                var form = this._form;
                if (form)
                {
                    form._apply_stepcount();
                }
                this.on_apply_stepcount();

            }
        }
    };

    _pStepControl.set_stepindex = function (v)
    {
        if ((+v) != (+v))
        {
            v = 0;
        }
        else
        {
            v = parseInt(v) | 0;
        }

        if (v != this.stepindex)
        {
            var check_count = this.stepcount <= v || v < 0;
            if (!check_count)
            {
                this._prestepindex = this.stepindex;
                this._poststepindex = v;

                var ret = this.on_fire_canstepchange(this);

                if (ret !== false)
                {
                    ret = this._form.on_fire_canstepchange(this);
                    if (ret !== false)
                    {
                        this.stepindex = this._poststepindex;
                        this.on_apply_stepindex();

                        this.on_fire_onstepchanged(this);
                        this._form.on_fire_onstepchanged(this);
                        return true;
                    }
                }
            }
        }
        return false;
    };

    _pStepControl.on_apply_stepcount = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._drawStepButton();
            this.parent.on_apply_stepalign();
        }
    };

    _pStepControl.on_apply_stepindex = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var form = this._form;
            var oldstep_idx = this._prestepindex;
            var step_idx = this.stepindex;
            var layoutmanager = nexacro._getLayoutManager();

            if (oldstep_idx != step_idx)
            {
                this._changeStepIndex(oldstep_idx, step_idx);
                if (layoutmanager)
                {
                    layoutmanager.setStepIndex(form, step_idx);
                }
            }
        }
    };

    _pStepControl.on_apply_expr = function ()
    {
        this.on_apply_text();
    };

    _pStepControl.on_apply_text = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var text_elem = this._text_elem;
            if (!text_elem)
            {
                text_elem = new nexacro.TextBoxElement(control_elem);
                text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
                this._text_elem = text_elem;

                if (this._is_created)
                {
                    /*
                    var halign = this.textAlign == "" ? "center" : currentstyle.align._halign;
			        var valign = this.verticalAlign == "" ? "middle" : currentstyle.align._valign;
                    text_elem.setElementColor(currentstyle.color);
                    text_elem.setElementFont(currentstyle.font);
                    text_elem.setElementAlignXY(halign, valign);
                    */
                    text_elem.create();
                }
            }

            var expr = this.expr;

            if (expr && expr.length > 0)
            {
                // 1. expr - Uppercase and lowercase lgnore
                // 2. Ignore blank 
                // 3. work without "epxr:" 

                // Separated by ":" -> expr string exists and other case are separated
                expr = expr.trim().split(":");
                var len = expr.length;
                var parser = new nexacro.ExprParser();
                var conv_expr, exprfn;
                var str;

                if (len == 1)    // When there is not "|"
                {
                    str = expr[0];
                }
                else   // When there is "|"
                {
                    if (expr[0].trim().toUpperCase() != "EXPR")   // expr string exists this.expr = "param1?"true":"false";
                    {
                        str = expr.join(":");
                    }
                    else // expr string not exist -->  first Array delete and add up
                    {
                        str = expr.slice(1).join(":");
                    }
                }

                conv_expr = parser.makeExpr(this, str);
                exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);

                if (exprfn)
                {
                    try
                    {
                        var val = nexacro._toString(exprfn.call(null, this));
                        if (val != this._displaytext)
                        {
                            this._displaytext = val;
                        }
                    }
                    catch (e)   // error ignore
                    {
                        return;
                    }
                }
            } else
            {
                this._displaytext = this.text;
            }

            text_elem.setElementText(this._displaytext);
        }
    };


    // ====================================================================
    // nexacro.Step : Event Handler
    // ====================================================================
    _pStepControl.on_fire_canstepchange = function (obj)
    {
        if (this.canstepchange && this.canstepchange._has_handlers)
        {
            var evt = new nexacro.StepChangeEventInfo(obj, "canstepchange", obj._prestepindex, obj._poststepindex);
            return this.canstepchange._fireCheckEvent(this, evt);
        }
    };

    _pStepControl.on_fire_onstepchanged = function (obj)
    {
        if (this.onstepchanged && this.onstepchanged._has_handlers)
        {
            var evt = new nexacro.StepChangeEventInfo(obj, "onstepchanged", obj._prestepindex, obj._poststepindex);
            return this.onstepchanged._fireEvent(this, evt);
        }
    };


    // ====================================================================
    // nexacro.Step : Methods
    // ====================================================================
    _pStepControl.getStepCount = function ()
    {
        return this.stepcount;
    };

    _pStepControl.stepIt = function (forward, rotate)
    {
        var stepindex = this.stepindex;
        var max_step = this.stepcount;
        if (forward == undefined)
            forward = true; //default
        else
            forward = nexacro._toBoolean(forward);

        rotate = nexacro._toBoolean(rotate);
        if (forward)
        {
            stepindex++;
            if (stepindex >= max_step)
            {
                stepindex = max_step - 1;
                if (rotate)
                {
                    stepindex = 0;
                }
            }
        }
        else
        {
            stepindex--;
            if (stepindex < 0)
            {
                stepindex = 0;
                if (rotate)
                {
                    stepindex = max_step - 1;
                }
            }
        }
        
        return this.set_stepindex(stepindex);
    };


    // ====================================================================
    // nexacro.Step : Logical Part
    // ====================================================================
    _pStepControl._deleteStepButton = function ()
    {
        var items = this._items;
        var item_len = items.length;

        for (var i = 0; i < item_len; i++)
        {
            items[i].destroy();
        }
        this._items = [];
    };

    _pStepControl._drawStepButton = function ()
    {
        var stepcount = this.stepcount;
        var stepindex = this.stepindex;
        var items = this._items;
        var items_len = items.length;
        var removed_item;
        
        var layout = this.parent;
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();
        var layout_width = layout._getClientWidth();
        var layout_height = layout._getClientHeight();
        var valign = this.verticalAlign;
        var halign = this.textAlign;
        var stepbutton = null;
        if (stepcount > 0)
        {
            var stepitemsize = this._getStepItemsize();
            var stepitemgap = this._getStepItemGap();

            var btn_l = 0;
            var btn_t = 0;
            var size = 0;

            var btn_w = stepitemsize;
            var btn_h = stepitemsize;

            for (var i = 0; i < stepcount; i++)
            {
                stepbutton = items[i];
                if (!stepbutton)
                {
                    stepbutton = new nexacro.StepImageButtonControl("stepitem" + i, "absolute", btn_l, btn_t, btn_w, btn_h, null, null, this);
                    stepbutton._setEventHandler("onclick", this.__onStepButtonClick, this);
                    stepbutton.createComponent();
                   
                    items[i] = stepbutton;
                }
                else
                {
                    stepbutton.move(btn_l, btn_t, btn_w, btn_h);
                }
                
                if (!stepbutton._is_created)
                    stepbutton.on_created();

                stepbutton.on_apply_icon();
                stepbutton.on_apply_iconPosition();

                if (i == stepindex)
                {
                    stepbutton._changeUserStatus("selected", true);
                }                
                btn_l = btn_l + btn_w + stepitemgap;
            }

            if (items_len > stepcount)
            {
                while (items.length != stepcount)
                {
                    removed_item = items.pop();
                    removed_item.destroy();
                }
            }
            var img = stepbutton ? stepbutton._getCSSStyleValue("icon", undefined, "selected") : "";
            var info = this._icon_info;

            if (!info.isloaded && img)
            {
                size = nexacro._getImageSize(img.url, this._loadImage, this);//, this._getRefFormBaseUrl());
                if (size)
                {
                    info.width = size.width;
                    info.height = size.height;
                    info.isloaded = true;
                    //move
                    //this.parent.on_apply_stepalign();
                }
            }
        }
    };

    /*
    _pStep._getStepButtonCommand = function ()
    {
        var stepcount = this.stepcount;
        var stepindex = this.stepindex;
        var item = this._items;
        var pseudo = this._pseudo;
        var layout = this.parent;
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();
        var layout_width = layout._getClientWidth();
        var layout_height = layout._getClientHeight();
        var valign = this.verticalAlign;
        var halign = this.textAlign;

        if (stepcount > 0)
        {
            var btn_size = this._getButtonSize();
            var btn_area = this._getButtonAreaSize(stepcount, btn_size);
            var btn_padding = this.buttonpadding || this._default_btn_padding;

            var btn_l = btn_padding.left;
            var btn_t = ((client_height - btn_size) / 2) + btn_padding.top;
            var btn_w = btn_size;
            var btn_h = btn_size;
            var str = "";
            for (var i = 0; i < stepcount; i++)
            {
                var stepButton = new nexacro.StepImageButtonControl("" + i, "absolute", btn_l, btn_t, btn_w, btn_h, null, null, this);
                stepButton._setEventHandler("onclick", this.__onStepButtonClick, this);
                stepButton.createComponent();
                stepButton.on_created();
                stepButton.on_apply_borderRadius(this.buttonborderRadius);
                if (i == stepindex)
                {
                    stepButton.on_apply_icon(btn_image);
                }
                item[i] = stepButton;
                str += stepButton.createCommand();
                btn_l = btn_l + btn_w + 5;
            }
            // this.on_apply_buttonborderRadius(this.buttonborderRadius);
            return str;
        }
        return "";
    };
    */

    _pStepControl._changeStepIndex = function (pre_step_idx, post_step_idx)
    {
        var pre_button = this._items[pre_step_idx];
        var post_button = this._items[post_step_idx];

        if (pre_button)
        {
            pre_button._changeUserStatus("selected", false);
        }
        if (post_button)
        {
            post_button._changeUserStatus("selected", true);
        }
        else
        {
            /* 이미지가 없을때의 처리 */
            /* 임의의 원을 그린다. */
        }
        var form = this.parent;
        var control_elem = form.getElement();
        control_elem.setElementStepIndex(post_step_idx);
        form._onRecalcScrollSize();
        var container = form.getElement().getContainerElement(post_step_idx);
        var linkedcontrol = container._findScrollbarControl(container, true);
        if (linkedcontrol)
        {
            if (linkedcontrol._vscroll_pos != container._scroll_top)
                linkedcontrol._scrollTo(null, container._scroll_top);
        }
    };

    _pStepControl._loadImage = function (url, width, height)
    {
        var info = this._icon_info;
        info.width = width;
        info.height = height;
        info.isloaded = true;
        this._drawStepButton();
    };

    _pStepControl.__onStepButtonClick = function (obj, e)
    {
        var itemid = nexacro._toString(obj.id);
        var itemindex = itemid.slice(this._itemid.length);
        this.set_stepindex(itemindex);
    };

    _pStepControl.__onSize = function (obj, e)
    {
        this.on_apply_stepcount();
    };

    // ====================================================================
    // nexacro.StepCtrl : Logical Part
    // ====================================================================


    _pStepControl._getStepItemsize = function ()
    {
        var info = this._icon_info;
        var stepitemsize = this.stepitemsize;

        if (nexacro._isNull(stepitemsize))
            stepitemsize = this._default_stepitemsize;

        stepitemsize = stepitemsize ? parseInt(stepitemsize) : 0;

        if (info.isloaded)
        {
            if (info.width > stepitemsize || info.height > stepitemsize)
            {
                var max = Math.max(info.width, info.height);
                stepitemsize = max;
            }
        }

        return stepitemsize;
    };

    _pStepControl._getStepItemGap = function ()
    {
        return this.stepitemgap;
    };

    _pStepControl._getItemAreaSize = function (stepcount, stepitemsize, stepitemgap)
    {
    	var padding = this._getCurrentStylePadding();
    	var border = this._getCurrentStyleBorder();
    	var btnArea_width = stepitemsize * stepcount + stepitemgap * (stepcount - 1);
    	var btnArea_height = stepitemsize;

        if (padding)
        {
            btnArea_width += padding.left + padding.right;
            btnArea_height += padding.top + padding.bottom;
        }

        if (border)
        {
            btnArea_width += border.left._width + border.right._width;
            btnArea_height += border.top._width + border.bottom._width;
        }

        return { width: btnArea_width, height: btnArea_height };
    };


    delete _pStepControl;
}

