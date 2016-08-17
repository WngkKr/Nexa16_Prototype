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
if (!nexacro.Spin)
{
    //=====================================================
    // nexacro.SpinEventInfo 
    //=====================================================
    nexacro.SpinEventInfo = function (obj, id, beforeText, beforeValue, afterText, afterValue, isUp)
    {
        this.id = this.eventid = id || "onspin";
        this.fromobject = this.fromreferenceobject = obj;

        this.pretext = beforeText;
        this.prevalue = beforeValue;
        this.posttext = afterText;
        this.postvalue = afterValue;
        this.up = isUp;
    };

    var _pSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SpinEventInfo);
    nexacro.SpinEventInfo.prototype = _pSpinEventInfo;
    _pSpinEventInfo._type_name = "SpinEventInfo";

    delete _pSpinEventInfo;
    _pSpinEventInfo = null;

    //==============================================================================
    // nexacro.Spin 
    //==============================================================================
    nexacro.Spin = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pSpin = nexacro._createPrototype(nexacro.Component, nexacro.Spin);
    nexacro.Spin.prototype = _pSpin;
    _pSpin._type_name = "Spin";

    /* control */
    _pSpin.spinedit = null;
    _pSpin.spinupbutton = null;
    _pSpin.spindownbutton = null;

    /* default properties */
    _pSpin.buttonposition = "right";
    _pSpin.buttonsize = undefined;
    _pSpin.circulation = false;
    _pSpin.displaycomma = false;
    _pSpin.displaynulltext = "";
    _pSpin.increment = 1;
    _pSpin.locale = "";
    _pSpin.max = 10000;
    _pSpin.min = 0;
    _pSpin.readonly = false;
    _pSpin.text = "";
    _pSpin.type = "normal";
    _pSpin.usecontextmenu = true;
    _pSpin.value = undefined;

    /* internal variable */
    _pSpin._buttonsize = -1;
    _pSpin._default_value = undefined;
    _pSpin._default_text = "";
    _pSpin._default_mask = "9.9";
    _pSpin._default_commamask = "9,999.9";
    _pSpin._want_arrow = false;

    /* status */
    _pSpin._use_readonly_status = true;
    _pSpin._is_locale_control = true;

    _pSpin._event_list = {
        "oneditclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "onmove": 1, "onsize": 1,
        "canchange": 1, "onchanged": 1, "oninput": 1,
        "onspin": 1,
        "oncontextmenu": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* accessibility */
    _pSpin._accessibility_role = "spin";

    //===============================================================
    // nexacro.Spin : Create & Destroy & Update
    //===============================================================
    _pSpin.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var spinedit = this.spinedit = new nexacro.MaskEdit("spinedit", "absolute", 0, 0, 0, 0, null, null, this);
            var spinupbutton = this.spinupbutton = new nexacro._SpinButtonControl("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
            var spindownbutton = this.spindownbutton = new nexacro._SpinButtonControl("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);

            spinedit._setControl();
            spinedit.set_limitbymask("none");

            spinedit.createComponent(true);
            spinupbutton.createComponent(true);
            spindownbutton.createComponent(true);
        }
    };

    _pSpin.on_created_contents = function ()
    {
        this._setEventHandlerToCalendarEdit();
        this._setEventHandlerToSpinButtons();

        this.on_apply_displaynulltext();
        this.on_apply_displaycomma();
        this.on_apply_type();
        this.on_apply_readonly();
        this.on_apply_value();

        this.spinupbutton.on_created();
        this.spindownbutton.on_created();
        this.spinedit.on_created();

        this._recalcLayout();
        this._updateButton();

        this._setAccessibilityInfoValueMax(this.max);
        this._setAccessibilityInfoValueMin(this.min);
        this._setAccessibilityInfoValueCur(this.value);
        this._setAccessibilityActiveDescendant(this.spinedit);
    };

    _pSpin.on_create_contents_command = function ()
    {
        this._setEventHandlerToCalendarEdit();
        this._setEventHandlerToSpinButtons();

        this.on_apply_displaynulltext();
        this.on_apply_displaycomma();
        this.on_apply_type();
        this.on_apply_readonly();
        this.on_apply_value();

        var str = "";

        if (this.spinedit)
        {
            str += this.spinedit.createCommand();
        }
        if (this.spinupbutton)
        {
            str += this.spinupbutton.createCommand();
        }
        if (this.spindownbutton)
        {
            str += this.spindownbutton.createCommand();
        }

        return str;
    };

    _pSpin.on_attach_contents_handle = function (win)
    {
        if (this.spinedit)
        {
            this.spinedit.attachHandle(win);
        }
        if (this.spinupbutton)
        {
            this.spinupbutton.attachHandle(win);
        }
        if (this.spindownbutton)
        {
            this.spindownbutton.attachHandle(win);
        }

        this._recalcLayout();
        this._updateButton();

        this._setAccessibilityInfoValueMax(this.max);
        this._setAccessibilityInfoValueMin(this.min);
        this._setAccessibilityInfoValueCur(this.value);
        this._setAccessibilityActiveDescendant(this.spinedit);
    };

    _pSpin.on_destroy_contents = function ()
    {
        if (this.spinedit)
        {
            this.spinedit.destroy();
            this.spinedit = null;
        }

        if (this.spinupbutton)
        {
            this.spinupbutton.destroy();
            this.spinupbutton = null;
        }

        if (this.spindownbutton)
        {
            this.spindownbutton.destroy();
            this.spindownbutton = null;
        }
    };

    _pSpin.on_change_containerPos = function (left, top)
    {

    };

    _pSpin.on_change_containerRect = function (width, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro.Spin : Override
    //===============================================================
    _pSpin.on_apply_custom_setfocus = function (evt_name)
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit._on_focus(true, evt_name);
        }
    };

    _pSpin.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pSpin.on_apply_prop_enable = function (v)
    {
        if (this.spinedit)
        {
            this.spinedit._setEnable(v);
        }
        if (this.spinupbutton)
        {
            this.spinupbutton._setEnable(v);
        }
        if (this.spindownbutton)
        {
            this.spindownbutton._setEnable(v);
        }
    };

    _pSpin.on_init_bindSource = function (columnid, propid, ds)
    {
        if (propid == "value")
        {
            this._setValue(undefined);
        }
    };

    _pSpin.on_change_bindSource = function (propid, ds, row, col, index)
    {
        if (propid == "value")
        {
            var max = this.max;
            var min = this.min;
            var ds_val = ds.getColumn(row, col);
            var v = parseFloat(ds_val);

            if (isNaN(v))
            {
                v = ds_val;
            }
            else if (v < min || v > max)
            {
                v = (v < min) ? min : max;
                if (!this.applyto_bindSource("value", v))
                {
                    return;
                }
            }

            this._setValue(v);
        }
    };

    _pSpin.on_apply_accessibility = function (accessibility)
    {
        nexacro.Component.prototype.on_apply_accessibility.call(this, accessibility);
        if (this.spinedit)
            this.spinedit.on_apply_accessibility(accessibility);
    };

    _pSpin.on_get_style_accessibility_label = function ()
    {
        var label = "";
        //label = this.text ? this.text : this.value;
        return label;
    };

    _pSpin._on_getAccessibilityAdditionalLabel = function ()
    {
        var label = "";
        if (this.spinedit && this.spinedit._edit_base_api)
        {
            label = this.spinedit._edit_base_api._on_getAccessibilityAdditionalLabel();
        }
        return label + " " + this.min + " " + this.max;
    };

    _pSpin._getAccessibilityReadLabel = function (bwholeread)
    {
        var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
        if (bwholeread && this.spinedit._input_element && this._status != "focus")
        {
            if (!this.spinedit._input_element._wantAccessibilityAdditionalLabel
                || !this.spinedit._input_element._wantAccessibilityAdditionalLabel())
            {
                _readlabel = this.text + " " + _readlabel;
            }
        }
        return _readlabel;
    };

    _pSpin._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var want_arrow = this._want_arrow;
        this._want_arrow = false;
        return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: want_arrow };
    };

    //===============================================================
    // nexacro.Spin : Properties
    //===============================================================
    _pSpin.set_text = function (v)
    {

    };

    _pSpin.set_value = function (v)
    {
        if (!nexacro._isNull(v))
        {
            var max = this.max;
            var min = this.min;

            v = parseFloat(v, 10);
            if (isNaN(v))
            {
                return;
            }
            else if (v < min || v > max)
            {
                v = (v < min) ? min : max;
            }
        }

        if (v !== this.value)
        {
            if (!this.applyto_bindSource("value", v))
            {
                return;
            }

            this._setValue(v);
        }
    };

    _pSpin.on_apply_value = function ()
    {
        var value = this.value;
        var text = this.text;

        if (nexacro._isNull(value) ||
            (value.date || value.time || value.blob || value.datetime))
        {
            value = undefined;
        }

        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit.set_value(value);

            this.text = spinedit.text;
            this._setAccessibilityInfoValueCur(value);
        }

        this._default_value = this.value;
        this._default_text = this.text;
    };

    _pSpin.set_displaynulltext = function (v)
    {
        var isNull = nexacro._isNull(v);
        if (isNull)
        {
            v = "";
        }
        else
        {
            v = nexacro._toString(v);
            v = v.replace(/&quot;/g, "\"");
        }

        if (v != this.displaynulltext)
        {
            this.displaynulltext = v;
            this.on_apply_displaynulltext();
        }
    };

    _pSpin.on_apply_displaynulltext = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit.set_displaynulltext(this.displaynulltext);
        }
    };

    _pSpin.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pSpin.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);

        var spinedit = this.spinedit;
        if (spinedit)
        {
            v = (this.type == "noneditable") ? true : v;
            spinedit.set_readonly(v);
        }
    };

    _pSpin.set_type = function (v)
    {
        if (v != this.type)
        {
            this.type = v;
            this.on_apply_type();
            this.on_apply_readonly();
            this._recalcLayout();
        }
    };

    _pSpin.on_apply_type = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            switch (this.type)
            {
                case "spinonly":
                    spinedit.set_visible(false);
                    break;
                case "noneditable":
                    spinedit.set_visible(true);
                    break;
                case "normal":
                default:
                    spinedit.set_visible(true);
                    break;
            }
        }
    };

    _pSpin.set_locale = function (v)
    {
        if (v != this.locale)
        {
            this.locale = v;
            this._locale = v;
            this.on_apply_locale(v);
        }
    };

    _pSpin.on_apply_locale = function (v)
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit._setLocale(v);
        }
    };

    _pSpin.set_usecontextmenu = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.usecontextmenu)
        {
            this.usecontextmenu = v;
            this.on_apply_usecontextmenu();
        }
    };

    _pSpin.on_apply_usecontextmenu = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit.set_usecontextmenu(this.usecontextmenu);
        }
    };

    _pSpin.set_buttonposition = function (v)
    {
        v = nexacro._toString(v);
        if (v != this.buttonposition)
        {
            this.buttonposition = v;
            this.on_apply_buttonposition();
        }
    };

    _pSpin.on_apply_buttonposition = function ()
    {
        this._recalcLayout();
    };

    _pSpin.set_buttonsize = function (v)
    {
        if (v != this.buttonsize)
        {
            this.buttonsize = v;
            this._buttonsize = nexacro._isNull(v) ? -1 : (parseInt(v) | 0);
            this.on_apply_buttonsize();
        }
    };

    _pSpin.on_apply_buttonsize = function ()
    {
        this._recalcLayout();
    };

    _pSpin.set_circulation = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.circulation)
        {
            this.circulation = v;

            this.on_apply_circulation();
            this._updateButton();
        }
    };

    _pSpin.on_apply_circulation = function ()
    {
        this._updateButton();
    };

    _pSpin.set_displaycomma = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.displaycomma)
        {
            this.displaycomma = v;

            this.on_apply_displaycomma();
            this.on_apply_value();
        }
    };

    _pSpin.on_apply_displaycomma = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            if (!this.displaycomma)
            {
                spinedit.set_mask(this._default_mask);
            }
            else
            {
                spinedit.set_mask(this._default_commamask);
            }
        }
    };

    _pSpin.set_increment = function (v)
    {
        v = parseFloat(v, 10);
        if (isNaN(v))
        {
            return;
        }

        if (v != this.increment)
        {
            this.increment = v;

            this.on_apply_increment();
        }
    };

    _pSpin.on_apply_increment = function ()
    {

    };

    _pSpin.set_max = function (v)
    {
        v = parseFloat(v, 10);
        if (isNaN(v))
        {
            return;
        }

        if (!v != this.max)
        {
            this.max = v;

            this._setAccessibilityInfoValueMax(v);
            this.on_apply_max();
            this.on_apply_value();
            this._updateButton();
        }
    };

    _pSpin.on_apply_max = function ()
    {
        if (this.value > this.max)
        {
            this.value = this.max;
        }

        if (this.max < this.min)
        {
            this.min = this.max;
        }
    };

    _pSpin.set_min = function (v)
    {
        v = parseFloat(v, 10);
        if (isNaN(v))
        {
            return;
        }

        if (v != this.min)
        {
            this.min = v;

            this._setAccessibilityInfoValueMin(v);
            this.on_apply_min();
            this.on_apply_value();
            this._updateButton();
        }
    };

    _pSpin.on_apply_min = function ()
    {
        if (this.value < this.min)
        {
            this.value = this.min;
        }

        if (this.max < this.min)
        {
            this.max = this.min;
        }
    };

    //===============================================================
    // nexacro.Spin : Methods
    //===============================================================
    _pSpin.setRange = function (min, max)
    {
        this.set_min(min);
        this.set_max(max);

        if (this.min > this.max)
        {
            var swap = this.min;
            this.min = this.max;
            this.max = swap;
        }
    };

    _pSpin.getCaretPos = function ()
    {
        if (this.readonly)
        {
            return -1;
        }

        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit.getCaretPos();
        }
        
        return -1;
    };

    _pSpin.setCaretPos = function (v)
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit.setCaretPos(v);
        }
        
        return false;
    };

    _pSpin.getSelect = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit.getSelect();
        }
        
        return [0, 0];
    };

    _pSpin.setSelect = function (start, end)
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit.setSelect(start, end);
        }

        return false;
    };

    _pSpin.getSelectedText = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit.getSelectedText();
        }

        return "";
    };

    _pSpin.updateToDataset = function ()
    {
        return this.applyto_bindSource("value", this.value);
    };

    //===============================================================
    // nexacro.Spin : Event Handlers
    //===============================================================
    _pSpin._on_value_change = function (pretext, prevalue, posttext, postvalue)
    {
        if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue))
        {
            return false;
        }

        if (!this.applyto_bindSource("value", postvalue))
        {
            return false;
        }

        this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

        this._default_value = postvalue;
        this._default_text = posttext;

        return true;
    };

    _pSpin._on_spin_up = function ()
    {
        if (this.readonly)
        {
            return false;
        }

        var maskobj = this._getMaskObj();

        var increment = this.increment;
        var max = this.max;
        var min = this.min;

        var pre_value = parseFloat(this.value, 10);
        var pre_text = this.text;

        if (nexacro._isNull(pre_value) || isNaN(pre_value))
        {
            pre_value = 0;
        }

        var cur_value = this._calcValue(pre_value, increment, true);

        if (this.circulation)
        {
            if (increment >= 0)
            {
                cur_value = (cur_value > max) ? min : cur_value;
            }
            else
            {
                cur_value = (cur_value < min) ? max : cur_value;
            }
        }
        else
        {
            cur_value = (cur_value > max) ? max : (cur_value < min) ? min : cur_value;
        }

        var cur_text = maskobj.applyMask(cur_value);

        if (!this.on_fire_onspin(this, pre_text, pre_value, cur_text, cur_value, true))
        {
            cur_value = pre_value;
        }

        this.value = cur_value;

        this.on_apply_value();

        this._updateButton();
    };

    _pSpin._on_spin_down = function ()
    {
        if (this.readonly)
        {
            return false;
        }

        var maskobj = this._getMaskObj();

        var increment = this.increment;
        var max = this.max;
        var min = this.min;

        var pre_value = parseFloat(this.value, 10);
        var pre_text = this.text;

        if (nexacro._isNull(pre_value) || isNaN(pre_value))
        {
            pre_value = 0;
        }

        var cur_value = this._calcValue(pre_value, increment, false);

        if (this.circulation)
        {
            if (increment >= 0)
            {
                cur_value = (cur_value < min) ? max : cur_value;
            }
            else
            {
                cur_value = (cur_value > max) ? min : cur_value;
            }
        }
        else
        {
            cur_value = (cur_value < min) ? min : (cur_value > max) ? max : cur_value;
        }

        var cur_text = maskobj.applyMask(cur_value);

        if (!this.on_fire_onspin(this, pre_text, pre_value, cur_text, cur_value, false))
        {
            cur_value = pre_value;
        }

        this.value = cur_value;

        this.on_apply_value();

        this._updateButton();
    };

    _pSpin.on_notify_edit_oneditclick = function (obj, e)
    {
        this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject);
    };

    _pSpin.on_notify_edit_onkeydown = function (obj, e)
    {
        switch (e.keycode)
        {
            case nexacro.Event.KEY_UP:
                if (!nexacro._enableaccessibility || e.ctrlkey)
                {
                    this._on_spin_up();
                }   
                break;
            case nexacro.Event.KEY_DOWN:
                if (!nexacro._enableaccessibility || e.ctrlkey)
                {
                    this._on_spin_down();
                }   
                break;
            case nexacro.Event.KEY_ENTER:
                var maskobj = this._getMaskObj();

                var max = this.max;
                var min = this.min;

                var pre_value = this._default_value;
                var pre_text = this._default_text;

                var cur_value = this.value;
                var cur_text = this.text;

                if (cur_value > max)
                {
                    cur_value = max;
                }
                else if (cur_value < min)
                {
                    cur_value = min;
                }

                if (pre_value != cur_value)
                {
                    cur_text = maskobj.applyMask(cur_value);
                    if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value))
                    {
                        cur_value = pre_value;
                    }

                    this._setValue(cur_value);
                }
                break;
        }
    };

    _pSpin.on_notify_edit_oninput = function (obj, e)
    {
        if (this.readonly || !this._isEnable())
        {
            return false;
        }

        var spinedit = this.spinedit;
        if (spinedit)
        {
            this.value = parseFloat(spinedit.value, 10);
            this.text = spinedit.text;
        }

        this.on_fire_oninput();
    };

    _pSpin.on_notify_upbutton_onclick = function (obj, e)
    {
        this._on_spin_up();
    };

    _pSpin.on_notify_downbutton_onclick = function (obj, e)
    {
        this._on_spin_down();
    };

    _pSpin.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        this._changeStatus("focused", true);

        if (!(refer_new_focus instanceof nexacro.MaskEdit))
        {
            var spinedit = this.spinedit;
            if (spinedit)
            {
                spinedit._on_focus(true, evt_name);
            }
        }
    };

    _pSpin.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        var maskobj = this._getMaskObj();

        var max = this.max;
        var min = this.min;

        var pre_value = this._default_value;
        var pre_text = this._default_text;

        var cur_value = this.value;
        var cur_text = this.text;

        if (pre_value != cur_value)
        {
            if (cur_value > max)
            {
                cur_value = max;
            }
            else if (cur_value < min)
            {
                cur_value = min;
            }

            cur_text = maskobj.applyMask(cur_value);
            if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value))
            {
                cur_value = pre_value;
            }

            this._setValue(cur_value);
        }
    };

    _pSpin.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        this._want_arrow = true;
    };

    _pSpin.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.oneditclick && this.oneditclick._has_handlers)
        {
            var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
            return this.oneditclick._fireEvent(this, evt);
        }

        return false;
    };

    _pSpin.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
            return this.canchange._fireCheckEvent(this, evt);
        }
        return true;
    };

    _pSpin.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
            return this.onchanged._fireEvent(this, evt);
        }
        return true;
    };

    _pSpin.on_fire_oninput = function ()
    {
        if (this.oninput && this.oninput._has_handlers)
        {
            var evt = new nexacro.InputEventInfo(this, "oninput");
            return this.oninput._fireEvent(this, evt);
        }

        return true;
    };

    _pSpin.on_fire_onspin = function (obj, pretext, prevalue, posttext, postvalue, isUp)
    {
        if (this.onspin && this.onspin._has_handlers)
        {
            var evt = new nexacro.SpinEventInfo(obj, "onspin", pretext, prevalue, posttext, postvalue, isUp);
            return this.onspin._fireCheckEvent(this, evt);
        }
        return true;
    };

    //===============================================================
    // nexacro.Spin : Logical Part
    //===============================================================
    _pSpin._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem && this._is_created_contents)
        {
            var spinedit = this.spinedit;
            var spinupbutton = this.spinupbutton;
            var spindownbutton = this.spindownbutton;
            var btnposition = this.buttonposition;

            var client_left = this._getClientLeft();
            var client_top = this._getClientTop();
            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();

            var l, t, w, h;

            var buttonsize_w;
            var buttonsize_h = client_height / 2;
            if (this._buttonsize < 0)
            {
                buttonsize_w = client_height;
            }
            else
            {
                buttonsize_w = buttonsize;
            }

            switch(this.type)
            {
                case "spinonly":
                    l = client_left;
                    t = client_top;
                    w = client_width;
                    h = buttonsize_h;

                    spinupbutton.move(l, t, w, h, null, null);

                    t = h;

                    spindownbutton.move(l, t, w, h, null, null);
                    break;
                case "normal":
                case "noneditable":
                default:
                    switch(btnposition)
                    {
                        case "left":
                            l = buttonsize_w;
                            t = client_top;
                            w = client_width - buttonsize_w;
                            h = client_height;

                            spinedit.move(l, t, w, h, null, null);

                            l = client_left;
                            w = buttonsize_w;
                            h = buttonsize_h;

                            spinupbutton.move(l, t, w, h, null, null);

                            t = h;

                            spindownbutton.move(l, t, w, h, null, null);
                            break;
                        case "right":
                        default:
                            l = client_left;
                            t = client_top;
                            w = client_width - buttonsize_w;
                            h = client_height;

                            spinedit.move(l, t, w, h, null, null);

                            l = client_width - buttonsize_w;
                            w = buttonsize_w;
                            h = buttonsize_h;

                            spinupbutton.move(l, t, w, h, null, null);

                            t = h;

                            spindownbutton.move(l, t, w, h, null, null);
                            break;
                    }
                    break;
            }
        }
    };

    _pSpin._updateButton = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var spinedit = this.spinedit;
            var spinupbutton = this.spinupbutton;
            var spindownbutton = this.spindownbutton;
            
            var v = this.value;
            var max = this.max;
            var min = this.min;

            if (!this._isEnable())
            {
                spinedit._setEnable(false);
                spinupbutton._setEnable(false);
                spindownbutton._setEnable(false);
            }
            else
            {
                spinedit._setEnable(true);

                if (!this.circulation)
                {
                    if (nexacro._isNull(v))
                    {
                        spindownbutton._setEnable(false);
                        spinupbutton._setEnable(true);
                    }
                    else
                    {
                        if (this.increment >= 0)
                        {
                            if (max > v)
                            {
                                spinupbutton._setEnable(true);
                            }
                            else
                            {
                                spinupbutton._setEnable(false);
                            }

                            if (min < v)
                            {
                                spindownbutton._setEnable(true);
                            }
                            else
                            {
                                spindownbutton._setEnable(false);
                            }
                        }
                        else
                        {
                            if (max > v)
                            {
                                spindownbutton._setEnable(true);
                            }
                            else
                            {
                                spindownbutton._setEnable(false);
                            }

                            if (min < v)
                            {
                                spinupbutton._setEnable(true);
                            }
                            else
                            {
                                spinupbutton._setEnable(false);
                            }
                        }
                    }
                }
                else
                {
                    spinupbutton._setEnable(true);
                    spindownbutton._setEnable(true);
                }
            }
        }
    };

    //===============================================================
    // nexacro.Spin : Util Function
    //===============================================================
    _pSpin._setValue = function (v)
    {
        this.value = v;

        this.on_apply_value();
        this._updateButton();
    };

    _pSpin._setLocale = function (v)
    {
        if (!this.locale && v != this._locale)
        {
            this._locale = v;
            this.on_apply_locale(v);
            this.on_apply_value();
        }
    };

    _pSpin._setEnableView = function (v)
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit._setEnableView(v);
        }
    };

    _pSpin._setEventHandlerToCalendarEdit = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            spinedit._setEventHandler("oneditclick", this.on_notify_edit_oneditclick, this);
            spinedit._setEventHandler("onkeydown", this.on_notify_edit_onkeydown, this);
            spinedit._setEventHandler("oninput", this.on_notify_edit_oninput, this);
        }
    };

    _pSpin._setEventHandlerToSpinButtons = function ()
    {
        var spinupbutton = this.spinupbutton;
        if (spinupbutton)
        {
            spinupbutton._setEventHandler("onclick", this.on_notify_upbutton_onclick, this);
        }

        var spindownbutton = this.spindownbutton;
        if (spindownbutton)
        {
            spindownbutton._setEventHandler("onclick", this.on_notify_downbutton_onclick, this);
        }
    };

    _pSpin._getMaskObj = function ()
    {
        var spinedit = this.spinedit;
        if (spinedit)
        {
            return spinedit._getMaskObj();
        }

        return null;
    };

    _pSpin._calcValue = function (val, inc, bAdd)
    {
        var addConst = 1;
        var strVal = val.toString();
        var strInc = inc.toString();
        var bPointVal = strVal.indexOf(".");
        var bPointInc = strInc.indexOf(".");

        if (bPointVal > -1 || bPointInc > -1)
        {
            var decVal = bPointVal > -1 ? strVal.substring(bPointVal + 1, strVal.length) : "";
            var decInc = bPointInc > -1 ? strInc.substring(bPointInc + 1, strInc.length) : "";
            var maxLength = decVal.length >= decInc.length ? decVal.length : decInc.length;
            addConst = Math.pow(10, maxLength);

            val = Math.round(val * addConst);
            inc = Math.round(inc * addConst);
        }

        if (bAdd)
        {
            return (val + inc) / addConst;
        }
        else
        {
            return (val - inc) / addConst;
        }
    };

    delete _pSpin;
    _pSpin = null;

    //===============================================================
    // nexacro._SpinButtonControl : Button
    //===============================================================
    nexacro._SpinButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pSpinButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._SpinButtonControl);
    nexacro._SpinButtonControl.prototype = _pSpinButtonControl;
    _pSpinButtonControl._type_name = "ButtonControl";
    _pSpinButtonControl._is_subcontrol = true;

    //===============================================================
    // nexacro._SpinButtonControl : Events
    //===============================================================
    _pSpinButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var spin = this.parent;
        if (spin)
        {
            var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
            if (bMobile)
            {
                nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            }
            else
            {
                spin.on_apply_custom_setfocus(evt_name);
            }
        }
    };

    delete _pSpinButtonControl;
    _pSpinButtonControl = null;
}