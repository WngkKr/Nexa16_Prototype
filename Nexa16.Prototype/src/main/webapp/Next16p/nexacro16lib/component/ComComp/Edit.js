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
if (!nexacro.Edit)
{
    //==============================================================================
    // nexacro.Edit 
    //==============================================================================
    nexacro.Edit = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._onlydisplay = onlydisplay;

        if (onlydisplay)
        {
            this._apply_client_padding = true;
            this.readonly = true;
        }
    };

    var _pEdit = nexacro._createPrototype(nexacro.Component, nexacro.Edit);
    nexacro.Edit.prototype = _pEdit;
    _pEdit._type_name = "Edit";

    /* default properties */
    _pEdit.value = undefined;
    _pEdit.displaynulltext = "";
    _pEdit.readonly = false;
    _pEdit.password = false;
    _pEdit.autoselect = false;
    _pEdit.autoskip = false;
    _pEdit.maxlength = 0;
    _pEdit.inputmode = "normal";
    _pEdit.inputfilter = "none";
    _pEdit.inputtype = "normal";
    _pEdit.imemode = "none";
    _pEdit.useime = "global";
    _pEdit.text = "";
    _pEdit.usecontextmenu = true;

    /* internal variable */
    _pEdit._input_element = null;

    _pEdit._inputfilter_obj = null;
    _pEdit._inputtype_obj = null;
    _pEdit._undostack = null;

    _pEdit._default_value = undefined;
    _pEdit._default_text = "";
    _pEdit._keypad_type = "text";
    _pEdit._imedisable = false;

    _pEdit._processing_updateToDataset = false;
    _pEdit._result_updateToDataset = true;

    _pEdit._onlydisplay = false;
    _pEdit._apply_client_padding = false;

    /* status */
    _pEdit._is_simple_control = true;
    _pEdit._use_readonly_status = true;

    /* event list */
    _pEdit._event_list = {
        "oneditclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "onmove": 1, "onsize": 1,
        "canchange": 1, "onchanged": 1, "oninput": 1,
        "oncontextmenu": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* accessibility */
    _pEdit._accessibility_role = "edit";

    //===============================================================
    // nexacro.Edit : Create & Destroy & Update
    //===============================================================
    _pEdit.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var input_elem;
            if (!this._onlydisplay)
            {
                input_elem = this._input_element = new nexacro.InputElement(control, "input");
                input_elem.setElementAutoSkip(this.autoskip);
                input_elem.setElementAutoSelect(this.autoselect);
                input_elem.setElementUseIme(this.useime);
                input_elem.setElementImeMode(this.imemode);
                input_elem.setElementReadonly(this.readonly);
                input_elem.setElementDisplayNullText(this.displaynulltext);
                input_elem.setElementMaxLength(this.maxlength);
                input_elem.setElementInputType(this.password ? "password" : this._keypad_type);
            }
            else
            {
                input_elem = this._input_element = new nexacro.TextBoxElement(control, "input");
            }

            input_elem.setElementPosition(this._getClientLeft(), this._getClientTop());
            input_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
            input_elem.setElementTextDecoration(this._textdecoration);

            this._undostack = new nexacro._EditUndoStack(this);
        }
    };

    _pEdit.on_created_contents = function (win)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            this.on_apply_value();

            input_elem.create(win);

            if (nexacro._isNull(this.value))
            {
                this._changeUserStatus("nulltext", true);
            }
        }
    };

    _pEdit.on_create_contents_command = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            this.on_apply_value();

            return input_elem.createCommand();
        }

        return "";
    };

    _pEdit.on_attach_contents_handle = function (win)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.attachHandle(win);

            if (nexacro._isNull(this.value))
            {
                this._changeUserStatus("nulltext", true);
            }
        }
    };

    _pEdit.on_destroy_contents = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.destroy();
            this._input_element = null;
        }

        var undostack = this._undostack;
        if (undostack)
        {
            undostack.destroy();
            this._undostack = null;
        }

        var inputfilterobj = this._inputfilter_obj;
        if (inputfilterobj)
        {
            this._inputfilter_obj = null;
        }

        var inputtypeobj = this._inputtype_obj;
        if (inputtypeobj)
        {
            this._inputtype_obj = null;
        }
    };

    _pEdit.on_change_containerPos = function (left, top)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementPosition(left, top);
        }
    };

    _pEdit.on_change_containerRect = function (width, height)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementSize(width, height);
        }
    };

    //===============================================================
    // nexacro.Edit : Override
    //===============================================================
    _pEdit.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pEdit.on_apply_prop_enable = function (v)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            var color = this._getCSSStyleValue("color");

            input_elem.setElementEnable(v, color);
        }
    };

    _pEdit.on_init_bindSource = function (columnid, propid, ds)
    {
        if (propid == "value")
        {
            if (this._undostack)
            {
                this._undostack.clear();
            }

            this._setValue(undefined);
        }
    };

    _pEdit.on_change_bindSource = function (propid, ds, row, col, index)
    {
        if (propid == "value")
        {
            var input_elem = this._input_element;
            if (input_elem)
            {
                if (!this._onlydisplay)
                    input_elem.setCompositionComplete();
            }

            var v = ds.getColumn(row, col);
            if (v == this.value)
            {
                return;
            }

            if (this._undostack)
            {
                this._undostack.clear();
            }

            this._setValue(v);
        }
    };

    _pEdit.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
    {
        if (value)
        {
            return changestatus;
        }
        else
        {
            return applyuserstatus;
        }
    };

    _pEdit._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: false };
    };

    _pEdit._getDragData = function ()
    {
        return this.getSelectedText();
    };

    _pEdit.on_get_style_accessibility_label = function ()
    {
        var label = "";
        //label = this.text ? this.text : this.value;
        return label;
    };

    _pEdit._on_getAccessibilityAdditionalLabel = function ()
    {
        var input_elem = this._input_element;
        if (input_elem && input_elem._wantAccessibilityAdditionalLabel)
        {
            if (input_elem._wantAccessibilityAdditionalLabel())
            {
                if (this.text !== undefined && this.value !== undefined)
                    return this.text;
            }
        }
        return "";
    };

    //===============================================================
    // nexacro.Edit : Properties
    //===============================================================
    _pEdit.set_text = function (v)
    {

    };

    _pEdit.set_value = function (v)
    {
        v = v ? nexacro._toString(v) : v;
        if (v)
        {
            v = v.replace(/&quot;/g, "\"");
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

    _pEdit.on_apply_value = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            var text = this.text;
            var value = (this.value ? this.text : this.value);

            if (this._is_created && nexacro._isNull(this.value))
            {
                this._changeUserStatus("nulltext", true);
            }
            else
            {
                this._changeUserStatus("nulltext", false);
            }

            if (!this._onlydisplay)
            {
                if (this._undostack)
                {
                    var pos = input_elem.getElementCaretPos();
                    this._undostack.push(value, (pos && pos != -1) ? pos.begin : 0, pos ? pos.end : 0);
                }

                input_elem.setElementValue(value);
                text = input_elem.getElementText();
            }
            else
            {
                input_elem.setElementText(value);
            }

            if (this.text != text)
            {
                this.text = text;
            }

            this._default_value = this.value;
            this._default_text = this.text;
        }
    };

    _pEdit.set_displaynulltext = function (v)
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

    _pEdit.on_apply_displaynulltext = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementDisplayNullText(this.displaynulltext);
        }
    };

    _pEdit.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pEdit.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementReadonly(v);
        }
    };

    _pEdit.set_autoselect = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.autoselect)
        {
            this.autoselect = v;
            this.on_apply_autoselect();
        }
    };

    _pEdit.on_apply_autoselect = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementAutoSelect(this.autoselect);
        }
    };

    _pEdit.set_autoskip = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.autoskip)
        {
            this.autoskip = v;
            this.on_apply_autoskip();
        }
    };

    _pEdit.on_apply_autoskip = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementAutoSkip(this.autoskip);
        }
    };

    _pEdit.set_inputmode = function (v)
    {
        v = nexacro._toString(v);
        if (v && v != this.inputmode)
        {
            this.inputmode = v;
        }
    };

    // ["none", "dot,", "comma", "sign", "symbol", "alpha", "digit"]
    _pEdit.set_inputfilter = function (v)
    {
        v = nexacro._toString(v);
        if (!v) v = "none";

        if (v != this.inputfilter)
        {
            this.inputfilter = v;
            this._inputfilter_obj = null;

            this.on_apply_inputfilter();
        }
    };

    _pEdit.on_apply_inputfilter = function ()
    {
        var filter = this.inputfilter;
        if (filter)
        {
            this._inputfilter_obj = new nexacro._EditInputFilter(filter);
        }
    };

    // ["normal", "english", "number", "full", "half", "dot", "comma", "sign", "symbol", "digit", "alpha", "space"]
    _pEdit.set_inputtype = function (v)
    {
        v = nexacro._toString(v);
        if (!v) v = "normal";

        if (v != this.inputtype)
        {
            this.inputtype = v;
            this._inputtype_obj = null;

            this.on_apply_inputtype();
        }
    };

    _pEdit.on_apply_inputtype = function ()
    {
        var inputtype = this.inputtype;
        if (inputtype)
        {
            this._inputtype_obj = new nexacro._EditInputType(inputtype);

            this._imedisable = this._inputtype_obj.imedisable;
            this._keypad_type = this._inputtype_obj.keypadtype;

            var input_elem = this._input_element;
            if (input_elem)
            {
                if (!this._onlydisplay)
                    input_elem.setElementInputType(this.password ? "password" : this._keypad_type);
            }
        }
    };

    _pEdit.set_maxlength = function (v)
    {
        v = nexacro._toInt(v);
        if (v < 0)
        {
            v = 0;
        }

        if (v != this.maxlength)
        {
            this.maxlength = v;
            this.on_apply_maxlength();
        }
    };

    _pEdit.on_apply_maxlength = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementMaxLength(this.maxlength);
        }
    };

    _pEdit.set_password = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.password)
        {
            this.password = v;
            this.on_apply_password();
        }
    };

    _pEdit.on_apply_password = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementInputType(this.password ? "password" : this._keypad_type);
        }
    };

    _pEdit.set_useime = function (v)
    {
        this.useime = nexacro._toString(v);
        this.on_apply_useime();
    };

    _pEdit.on_apply_useime = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementUseIme(this.useime);
        }
    };

    _pEdit.set_imemode = function (v)
    {
        this.imemode = nexacro._toString(v);
        this.on_apply_imemode();
    };

    _pEdit.on_apply_imemode = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementImeMode(this.imemode);
        }
    };

    _pEdit.set_usecontextmenu = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.usecontextmenu)
        {
            this.usecontextmenu = v;
        }
    };

    _pEdit.set_cursor = function (val)
    {
        this.cursor = val;
        if (val)
        {
            if (this._cursor == null || this._cursor.value != val)
            {
                if (this.enable && val == "auto")
                {
                    val = "text";
                }
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

    _pEdit.on_apply_textAlign = function (halign)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementTextAlign(halign);
        }
    };

    _pEdit.on_apply_padding = function (padding)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementPadding(padding);
        }
    };

    _pEdit.on_apply_textDecoration = function (textDecoration)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementTextDecoration(textDecoration);
        }
    };

    //===============================================================
    // nexacro.Edit : Methods
    //===============================================================
    _pEdit.getLength = function ()
    {
        return (this.value ? this.value.length : 0);
    };

    _pEdit.getCaretPos = function ()
    {
        if (this.readonly)
        {
            return -1;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            var pos = input_elem.getElementCaretPos();
            if (pos && pos != -1)
            {
                return pos.begin;
            }
        }

        return -1;
    };

    _pEdit.setCaretPos = function (v)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                if (arguments.length == 0)
                {
                    v = 0;
                }
                else
                {
                    v = nexacro._toInt(v);
                    if (v == -1)
                    {
                        if (v)
                        {
                            v = this.text.length;
                        }
                        else
                        {
                            v = 0;
                        }
                    }
                }

                input_elem.setElementSetSelect(v, v);
            }

            return true;
        }

        return false;
    };

    _pEdit.getSelect = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                return input_elem.getElementSelectionRange();
        }
        return [0, 0];
    };

    _pEdit.setSelect = function (start, end)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                var txt = this.text ? this.text : "";
                var txt_len = txt.length;

                if (nexacro._isNull(start) || start === "")
                {
                    start = 0;
                }
                if (nexacro._isNull(end) || end === "")
                {
                    end = -1;
                }

                if (!nexacro._isNumber(start))
                {
                    start = nexacro._toInt(start);
                }
                if (!nexacro._isNumber(end))
                {
                    end = nexacro._toInt(end);
                }

                if (start == -1)
                {
                    start = txt_len;
                }
                if (end == -1)
                {
                    end = txt_len;
                }

                if (start > end)
                {
                    var tmp = start;
                    start = end;
                    end = tmp;
                }

                input_elem.setElementSetSelect(start, end);
            }

            return true;
        }

        return false;
    };

    _pEdit.getSelectedText = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                var sel = input_elem.getElementSelectionRange();
                var start = sel[0], end = sel[1];
                var text = this.text;

                if (text && (start != end))
                {
                    return text.substring(start, end);
                }
            }
        }

        return "";
    };

    _pEdit.setSelectedText = function (v)
    {
        v = nexacro._toString(v);
        if (v == null) v = "";

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                var sel = input_elem.getElementSelectionRange();
                var start = sel[0], end = sel[1];
                if (start == end)
                    return "";

                var src = this.text.substring(start, end);

                v = v.replace(/&quot;/g, "\"");

                var newlen = text.length - (end - start) + v.length;
                if (this.maxlength > 0 && newlen > this.maxlength)
                {
                    v = v.substring(0, this.maxlength - v.length);
                }
                text = text.substring(0, start) + v + text.substring(end);

                this.set_value(text);
                input_elem.setElementSetSelect(start, start + v.length);

                return src;
            }
        }

        return "";
    };

    _pEdit.updateToDataset = function ()
    {
        this._result_updateToDataset = this.applyto_bindSource("value", this.value);
        this._processing_updateToDataset = true;

        return this._result_updateToDataset;
    };

    //===============================================================
    // nexacro.Edit : Events
    //===============================================================
    _pEdit._on_deactivate = function ()
    {
        if (!this._is_alive) return;

        if (!this._isSelected())
        {
            this._changeStatus("focused", false);
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (input_elem.isComposing())
            {
                if (!this._onlydisplay)
                    input_elem.setCompositionComplete();
            }
        }
    };

    _pEdit._on_value_change = function (pretext, prevalue, posttext, postvalue)
    {
        if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue))
        {
            return false;
        }

        if (this._processing_updateToDataset)
        {
            this._processing_updateToDataset = false;
            if (!this._result_updateToDataset)
            {
                return false;
            }
        }
        else if (!this.applyto_bindSource("value", postvalue))
        {
            return false;
        }

        this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

        this._default_value = postvalue;
        this._default_text = posttext;

        return true;
    };

    _pEdit.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        if (this.readonly || !this._isEnable())
        {
            return;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (keycode == nexacro.KeyCode_ImeInput && this._imedisable) // 229
            {
                input_elem.stopSysEvent();
                return;
            }
            else if (!alt_key && !shift_key && ctrl_key && keycode == 90) // 'z'
            {
                if (input_elem.isComposing())
                {
                    input_elem.setCompositionComplete();
                }

                if (this._undostack)
                {
                    this._undostack.undo();
                    input_elem.stopSysEvent();
                    return;
                }
            }
            else if (!alt_key && !shift_key && ctrl_key && keycode == 89) // 'y'
            {
                if (this._undostack)
                {
                    this._undostack.redo();
                    input_elem.stopSysEvent();
                    return;
                }
            }

            if (this._undostack)
            {
                var pos = input_elem.getElementCaretPos();
                if (pos && pos != -1)
                {
                    this._undostack.update(pos.begin, pos.end);
                }
            }
        }
    };

    _pEdit.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        if (this.readonly || !this._isEnable())
        {
            return;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            // 일본어의 경우, keydown에서 keycode 알 수 없음
            if (keycode == nexacro.Event.KEY_RETURN) // 13
            {
                if (input_elem.isComposing())
                {
                    input_elem.setCompositionComplete();
                }

                var pre_value = this._default_value;
                var pre_text = this._default_text;

                var cur_value = input_elem.value;
                var cur_text = cur_value ? cur_value : "";

                if (pre_value != cur_value)
                {
                    if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value))
                    {
                        this.value = pre_value;
                        this.text = pre_text;

                        input_elem.setElementValue(pre_text);
                    }
                }
            }
        }
    };

    _pEdit.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key, shift_key)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (keycode == nexacro.Event.KEY_TAB)
            {
                if (!this._getDlgCode().want_tab)
                {
                    input_elem.stopSysEvent();
                    return;
                }
            }

            if (keycode !== 0 && charcode === 0)
            {
                return true;
            }
            else
            {
                // case :etc.. case by case
                if (keycode == nexacro.Event.KEY_ENTER || keycode == nexacro.Event.KEY_ESC)
                {
                    return true;
                }
            }

            // IE < 9 에서는 charCode 안나옴
            charcode = charcode || keycode;
            if (!ctrl_key && !alt_key && charcode)
            {
                var inputChar = String.fromCharCode(charcode);
                if (inputChar.length > 0 && this._is_filterchar(inputChar))
                {
                    input_elem.stopSysEvent();
                    return false;
                }
            }
            return true;
        }
    };

    _pEdit.on_beforekeyinput_basic_action = function (value, status, begin, end)
    {
        if (this.readonly || !this._isEnable())
        {
            return false;
        }

        var input_elem = this._input_element;
        if (input_elem && value)
        {
            var input_text = value.substring(begin, end);
            if (input_text)
            {
                var update_value = input_text;
                if (status == nexacro._CompositionState.NONE || status == nexacro._CompositionState.END)
                {
                    if (this._inputtype_obj)
                    {
                        update_value = this._inputtype_obj.apply(update_value);
                    }
                    if (this._inputfilter_obj)
                    {
                        update_value = this._inputfilter_obj.apply(update_value);
                    }
                    if (this.inputmode == "upper")
                    {
                        update_value = update_value.toUpperCase();
                    }
                    else if (this.inputmode == "lower")
                    {
                        update_value = update_value.toLowerCase();
                    }
                }

                if (update_value != input_text)
                {
                    input_elem.replaceElementText(update_value, begin, end);
                }
            }
        }
    };

    _pEdit.on_keyinput_basic_action = function ()
    {
        if (this.readonly || !this._isEnable())
        {
            return false;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            var input_value = input_elem.value;
            var input_text = input_value ? input_value : "";

            this.value = input_value;
            this.text = input_text;

            var undostack = this._undostack;
            if (!input_elem.isComposing() && undostack)
            {
                var pos = input_elem.getElementCaretPos();
                this._undostack.push(input_value, (pos && pos != -1) ? pos.begin : 0, (pos && pos != -1) ? pos.end : 0);
            }
        }
    };

    _pEdit.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            this._default_value = this.value;
            this._default_text = this.text;

            this._changeUserStatus("nulltext", false);

            if (!this._onlydisplay)
            {
                input_elem.setElementFocus();

                var text = input_elem.getElementText();
                if (text != this.text)
                {
                    this._default_text = this.text = text;
                }
            }
        }
    };

    _pEdit.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                if (input_elem.isComposing())
                {
                    var cur_text = this.text;
                    var filter_text = "";
                    if (this._inputtype_obj)
                    {
                        filter_text = this._inputtype_obj.apply(cur_text);
                    }
                    if (this._inputfilter_obj)
                    {
                        filter_text = this._inputfilter_obj.apply(cur_text);
                    }

                    if (cur_text != filter_text)
                    {
                        input_elem.setCompositionCancel();
                    }
                    else
                    {
                        input_elem.setCompositionComplete();
                    }
                }

                var pre_value = this._default_value;
                var pre_text = this._default_text;

                var cur_value = input_elem.value;
                var cur_text = cur_value ? cur_value : "";

                if (pre_value != cur_value)
                {
                    if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value))
                    {
                        this.value = pre_value;
                        this.text = pre_text;

                        input_elem.setElementValue(pre_value);
                    }
                }

                if (nexacro._isNull(this.value))
                {
                    this._changeUserStatus("nulltext", true);
                }

                input_elem.setElementBlur();
            }
        }
    };

    _pEdit.on_click_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementFocus(button);
        }
    };

    _pEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.oneditclick && this.oneditclick._has_handlers)
        {
            var caretpos = this.getCaretPos();
            var clientXY = this._getClientXY(canvasX, canvasY);

            var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
            return this.oneditclick._fireEvent(this, evt);
        }

        return true;
    };

    _pEdit.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(obj, "canchange", pretext, prevalue, posttext, postvalue);
            return this.canchange._fireCheckEvent(this, evt);
        }

        return true;
    };

    _pEdit.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
            return this.onchanged._fireEvent(this, evt);
        }
    };

    _pEdit.on_fire_oninput = function ()
    {
        if (this.oninput && this.oninput._has_handlers)
        {
            var evt = new nexacro.InputEventInfo(this, "oninput");
            return this.oninput._fireEvent(this, evt);
        }

        return true;
    };

    //===============================================================
    // nexacro.Edit : Logical Part
    //===============================================================
    _pEdit._setValue = function (v)
    {
        var text = "";
        if (!nexacro._isNull(v))
        {
            text = nexacro._toString(v);
        }

        this.text = text;
        this.value = v;

        this.on_apply_value();
    };

    _pEdit._setReadonlyView = function (v)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementReadonly(v);
        }
    };

    _pEdit._setFocusToNextComponent = function ()
    {
        var root_comp = this._getRootComponent(this);
        var next_comp = this._getForm().getNextComponent(root_comp, true);
        if (next_comp)
        {
            next_comp.setFocus();
        }
    };

    _pEdit._on_undo = function (item)
    {
        if (this.readonly || !this._isEnable())
        {
            return;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (item)
            {
                input_elem.updateElementText(item.value, item.end);
                input_elem.setElementSetSelect(item.start, item.end);
                return true;
            }
        }
    };

    _pEdit._on_redo = function (item)
    {
        if (this.readonly || !this._isEnable())
        {
            return;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (item)
            {
                input_elem.updateElementText(item.value, item.end);
                input_elem.setElementSetSelect(item.start, item.end);
                return true;
            }
        }
    };

    _pEdit._on_autoskip = function ()
    {
        ;
    };

    _pEdit._is_filterchar = function (ch)
    {
        if (ch != "")
        {
            if (this._inputfilter_obj && this._inputfilter_obj.test(ch))
                return true;

            if (this._inputtype_obj && !this._inputtype_obj.test(ch))
                return true;
        }

        return false;
    };

    _pEdit = null;
}

