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
if (!nexacro.CheckBox)
{
    //==============================================================================
    // nexacro.CheckBoxChangedEventInfo
    //==============================================================================
    nexacro.CheckBoxChangedEventInfo = function (obj, id, prevalue, postvalue)
    {
        this.id = this.eventid = id || "onchanged";
        this.prevalue = prevalue;
        this.postvalue = postvalue;
        this.fromobject = this.fromreferenceobject = obj;
    };

    var _pCheckBoxChangedEventInfo = nexacro._createPrototype(nexacro.ChangedEventInfo, nexacro.CheckBoxChangedEventInfo);
    nexacro.CheckBoxChangedEventInfo.prototype = _pCheckBoxChangedEventInfo;
    _pCheckBoxChangedEventInfo._type_name = "CheckBoxChangedEventInfo";

    delete _pCheckBoxChangedEventInfo;

    //==============================================================================
    // nexacro.CheckBox
    //==============================================================================
    nexacro.CheckBox = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro._IconText.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    _pCheckBox = nexacro._createPrototype(nexacro._IconText, nexacro.CheckBox);
    nexacro.CheckBox.prototype = _pCheckBox;
    _pCheckBox._type_name = "CheckBox";

    /* default properties */
    _pCheckBox.tabstop = true;
    _pCheckBox.value = false;
    _pCheckBox.readonly = false;
    _pCheckBox.falsevalue = null;
    _pCheckBox.truevalue = null;

    /* internal variable */
    _pCheckBox._is_focus_accept = true;

    /* status */
    _pCheckBox._use_selected_status = true;
    _pCheckBox._use_readonly_status = true;

    /* event list */
    _pCheckBox._event_list = {
        "canchange": 1, "onchanged": 1, "onclick": 1,
        "ondrag": 1, "ondragenter": 1, "ondragmove": 1, "ondragleave": 1, "ondrop": 1,
        "onkeydown": 1, "onkeyup": 1, "onkillfocus": 1, "onsetfocus": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmousemove": 1, "onmouseleave": 1,
        "onmove": 1, "onsize": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1        
    };

    /* accessibility */
    _pCheckBox._accessibility_role = "checkbox";

    //===============================================================
    // nexacro.CheckBox : Create & Update
    //===============================================================
    _pCheckBox.on_created_contents = function (win)
    {
    	nexacro._IconText.prototype.on_created_contents.call(this, win);

        this._setAccessibilityStatChecked(this.isChecked());
    };

    _pCheckBox.on_attach_contents_handle = function (win)
    {
    	nexacro._IconText.prototype.on_attach_contents_handle.call(this, win);

        this._setAccessibilityStatChecked(this.isChecked());
    };

    _pCheckBox.on_destroy_contents = function ()
    {
    	nexacro._IconText.prototype.on_destroy_contents.call(this);

        this.falsevalue = null;
        this.truevalue = null;
    };

    //===============================================================
    // nexacro.CheckBox : Override
    //===============================================================
    _pCheckBox.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pCheckBox._isFocusAcceptable = function ()
    {
        return this._is_focus_accept;
    };

    _pCheckBox.on_init_bindSource = function (columnid, propid, ds)
    {
        if (propid == "value")
        {
            this._setValue(this._changeValue(undefined));
            this.on_apply_value();
        }
    };

    _pCheckBox.on_change_bindSource = function (propid, ds, row, col, index)
    {
        if (propid == "value")
        {
            this._setValue(this._changeValue(ds.getColumn(row, col)));
            this.on_apply_value();
        }
    };

    _pCheckBox.on_get_style_accessibility_label = function ()
    {
        return this.text ? this.text : "";
    };

    //===============================================================
    // nexacro.CheckBox : Properties
    //===============================================================
    _pCheckBox.set_value = function (v)
    {
        v = this._changeValue(v);
        if (this.value != v)
        {
            if (this.applyto_bindSource("value", v))
            {
                this._setValue(v);
                this.on_apply_value();
            }
        }
    };

    _pCheckBox.on_apply_value = function ()
    {
        if (this.isChecked())
        {
            this._changeUserStatus("selected", true);
        }
        else
        {
            this._changeUserStatus("selected", false);
        }
    };

    _pCheckBox.set_truevalue = function (v)
    {
        if (this.truevalue != v)
        {
            if (this.isChecked())
            {
                if (this.applyto_bindSource("value", v))
                {
                    this._setValue(v);
                }
            }
            this.truevalue = v;
        }
    };

    _pCheckBox.set_falsevalue = function (v)
    {
        if (this.falsevalue != v)
        {
            if (!this.isChecked())
            {
                if (this.applyto_bindSource("value", v))
                {
                    this._setValue(v);
                }
            }
            this.falsevalue = v;
        }
    };

    _pCheckBox.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pCheckBox.on_apply_readonly = function ()
    {
        this._changeStatus("readonly", this.readonly);
    };

    //===============================================================
    // nexacro.CheckBox : Methods
    //===============================================================
    _pCheckBox.isChecked = function ()
    {
        return this._isChecked(this.value);
    };

    //===============================================================
    // nexacro.CheckBox : Events
    //===============================================================
    _pCheckBox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (!this.enable)
        {
            return false;
        }

        if (!this.readonly)
        {
            var ret;
            var pre_v = this.value;
            var v = this._shiftValue();

            ret = this.on_fire_canchange(this, this.value, v);
            if (ret || ret === undefined)
            {
                if (this.applyto_bindSource("value", v))
                {
                    this._setValue(v);
                }
                
                if (pre_v !== this.value)
                {
                    this.on_fire_onchanged(this, pre_v, this.value);
                }

                this.on_apply_value();
            }
        }

        return nexacro.Component.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
    };


    _pCheckBox.on_fire_onchanged = function (obj, prevalue, postvalue)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.CheckBoxChangedEventInfo(this, "onchanged", prevalue, postvalue);
            return this.onchanged._fireEvent(this, evt);
        }
        return false;
    };

    _pCheckBox.on_fire_canchange = function (obj, prevalue, postvalue)
    {
        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.CheckBoxChangedEventInfo(this, "canchange", prevalue, postvalue);
            return this.canchange._fireEvent(this, evt);
        }
        return true;
    };

    _pCheckBox.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);

        if (key_code == nexacro.Event.KEY_SPACE)
        {
            this.on_fire_onclick("", alt_key, ctrl_key, shift_key, -1, -1, -1, -1, -1, -1, this.parent, this);
        }
        return ret;
    };

    //===============================================================
    // nexacro.CheckBox : Logical part
    //===============================================================

    //===============================================================
    // nexacro.CheckBox : Util Function
    //===============================================================
    _pCheckBox._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
    	this.on_fire_onclick("", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, this.parent, this);
    };

    _pCheckBox._setValue = function (v)
    {
        this.value = v;
        this._setAccessibilityStatChecked(this.isChecked());
    };

    _pCheckBox._isChecked = function (value)
    {
        if (this.truevalue != null)
        {
            if (this.falsevalue != null) // both
            {
                if (value == this.falsevalue || value === undefined)
                {
                    return false;
                }

                if (value == this.truevalue || nexacro._toBoolean(value))
                {
                    return true;
                }

                if (this.value == this.truevalue) // keep value;
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else // truevalue only
            {
                if (value == this.truevalue || nexacro._toBoolean(value))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
        else // not use truevalue
        {
            if (this.falsevalue != null) // falsevalue only
            {
                if (value == this.falsevalue)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else // no both
            {
                return nexacro._toBoolean(value);
            }
        }
    };

    _pCheckBox._changeValue = function (v)
    {
        var use_truevalue = !nexacro._isNull(this.truevalue);
        var use_falsevalue = !nexacro._isNull(this.falsevalue);

        if (nexacro._isNull(v))
        {
            if (use_falsevalue)
            {
                return this.falsevalue;
            }
            else
            {
                return false;
            }
        }

        if (use_truevalue)
        {
            if (v === this.truevalue)
            {
                // priority one
                return v;
            }

            if (use_falsevalue)
            {
                // truevalue, falsevalue both
                if (v === this.falsevalue)
                {
                    return v;
                }
                else
                {
                    return this.value;
                }
            }
            else
            {
                // truevalue only
                if (parseInt(v) === 0)
                {
                    return 0;
                }
                else if (!nexacro._toBoolean(v))
                {
                    return false;
                }
                else
                {
                    return this.value;
                }
            }
        }
        else
        {
            if (use_falsevalue)
            {
                // falsevalue only
                if (v === this.falsevalue)
                {
                    return v;
                }
                else if (parseInt(v) === 1)
                {
                    return 1;
                }
                else if (nexacro._toBoolean(v))
                {
                    return true;
                }
                else
                {
                    return this.value;
                }
            }
            else
            {
                // not use truevalue, falsevalue
                if (parseInt(v) === 0)
                {
                    return 0;
                }
                else if (parseInt(v) === 1)
                {
                    return 1;
                }
                else
                {
                    return nexacro._toBoolean(v);
                }
            }
        }
    };

    _pCheckBox._shiftValue = function ()
    {
        if (this._isChecked(this.value))
        {
            // make falsevalue
            if (nexacro._isNull(this.falsevalue))
            {
                return false;
            }
            else
            {
                return this.falsevalue;
            }
        }
        else
        {
            // make truevalue
            if (nexacro._isNull(this.truevalue))
            {
                return true;
            }
            else
            {
                return this.truevalue;
            }
        }
    };

    delete _pCheckBox;
}
