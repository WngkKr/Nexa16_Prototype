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
if (!nexacro.TextArea)
{
    //==============================================================================
    // nexacro.TextArea
    //==============================================================================
    nexacro.TextArea = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent, true);
        this._onlydisplay = onlydisplay;

        if (onlydisplay)
        {
            this._apply_client_padding = true;
            this.readonly = true;
        }
    };

    var _pTextArea = nexacro._createPrototype(nexacro.Component, nexacro.TextArea);
    nexacro.TextArea.prototype = _pTextArea;
    nexacro.TextArea._TAB_CHAR = '\u0009'; // '\t'
    _pTextArea._type_name = "TextArea";

    /* default properties */
    _pTextArea.acceptstab = false;
    _pTextArea.autoselect = false;
    _pTextArea.autoskip = false;
    _pTextArea.displaynulltext = "";
    _pTextArea.dragscrolltype = "both";
    _pTextArea.imemode = "none";
    _pTextArea.inputfilter = "none";
    _pTextArea.inputmode = "normal";
    _pTextArea.inputtype = "normal";
    _pTextArea.maxlength = 0;
    _pTextArea.readonly = false;
    _pTextArea.usecontextmenu = true;
    _pTextArea.useime = "global";
    _pTextArea.text = "";
    _pTextArea.value = undefined;

    /* internal variable */
    _pTextArea._input_element = null;

    _pTextArea._inputfilter_obj = null;
    _pTextArea._inputtype_obj = null;
    _pTextArea._undostack = null;

    _pTextArea._default_value = undefined;
    _pTextArea._default_text = "";
    _pTextArea._keypad_type = "text";
    _pTextArea._imedisable = false;
    _pTextArea._want_tab = true;

    _pTextArea._processing_updateScroll = false;
    _pTextArea._processing_updateToDataset = false;
    _pTextArea._result_updateToDataset = true;
    _pTextArea._apply_filter = true;

    _pTextArea._onlydisplay = false;
    _pTextArea._apply_client_padding = false;

    /* status */
    _pTextArea._is_scrollable = true;
    _pTextArea._use_translate_scroll = false;
    _pTextArea._use_container_move = false;
    _pTextArea._use_readonly_status = true;

    /* event list */
    _pTextArea._event_list = {
        "oneditclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "onmove": 1, "onsize": 1,
        "canchange": 1, "onchanged": 1, "oninput": 1,
        "onmousewheel": 1, "oncontextmenu": 1,
        "onvscroll": 1, "onhscroll": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* accessibility */
    _pTextArea._accessibility_role = "textbox";

    //===============================================================
    // nexacro.TextArea : Create & Destroy & Update
    //===============================================================
    _pTextArea.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var input_elem;
            if (!this._onlydisplay)
            {
                input_elem = this._input_element = new nexacro.TextAreaElement(control, "textarea");
                input_elem.setElementAutoSkip(this.autoskip);
                input_elem.setElementAutoSelect(this.autoselect);
                input_elem.setElementUseIme(this.useime);
                input_elem.setElementImeMode(this.imemode);
                input_elem.setElementReadonly(this.readonly);
                input_elem.setElementDisplayNullText(this.displaynulltext);
                input_elem.setElementMaxLength(this.maxlength);
                input_elem.setElementInputType(this._keypad_type);
            }
            else
            {
                input_elem = this._input_element = new nexacro.TextBoxElement(control, "textarea");
            }

            input_elem.setElementPosition(this._getClientLeft(), this._getClientTop());
            input_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
            input_elem.setElementTextDecoration(this._textdecoration);

            var wordwrap_info = this._getCSSStyleValue("wordWrap");
            input_elem.setElementWordWrap(wordwrap_info || this.wordWrap || "none");

            this._undostack = new nexacro._EditUndoStack(this);
        }
    };

    _pTextArea.on_created_contents = function (win)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && this.wordWrap != "none")
            {
                this._hscrollbartype = "none";
            }

            this.on_apply_padding(this._padding);
            this.on_apply_value();

            input_elem.create(win);

            if (nexacro._isNull(this.value))
            {
                this._changeUserStatus("nulltext", true);
            }

            this._onResetScrollBar();
            this._onRecalcScrollSize();
        }
    };

    _pTextArea.on_create_contents_command = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && this.wordWrap != "none")
            {
                this._hscrollbartype = "none";
            }

            this.on_apply_padding(this._padding);
            this.on_apply_value();

            return input_elem.createCommand();
        }

        return "";
    };

    _pTextArea.on_attach_contents_handle = function (win)
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

        this._onRecalcScrollSize();
        this._onResetScrollBar();
    };

    _pTextArea.on_destroy_contents = function ()
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

    _pTextArea.on_change_containerPos = function (left, top)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementPosition(left, top);
        }
    };

    _pTextArea.on_change_containerRect = function (width, height)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementSize(width, height);

            this._onRecalcScrollSize();
            this._onResetScrollBar();
        }
    };

    //===============================================================
    // nexacro.TextArea : Override
    //===============================================================
    _pTextArea.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pTextArea.on_apply_prop_enable = function (v)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            var color = this._getCSSStyleValue("color");

            input_elem.setElementEnable(v, color);
        }
    };

    _pTextArea.on_init_bindSource = function (columnid, propid, ds)
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

    _pTextArea.on_change_bindSource = function (propid, ds, row, col, index)
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

    _pTextArea.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
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

    _pTextArea._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var want_arrow = true;
        if (nexacro._enableaccessibility)
        {
            if (!this._onlydisplay)
            {
                if (keycode == nexacro.Event.KEY_UP)
                {
                    var elem = this._input_element;
                    if (!elem || (elem && elem.isFirstCaretLine()))
                    {
                        want_arrow = false;
                    }
                }
                else if (keycode == nexacro.Event.KEY_DOWN)
                {
                    var elem = this._input_element;
                    if (!elem || (elem && elem.isLastCaretLine()))
                    {
                        want_arrow = false;
                    }
                }
            }
        }

        //return { want_tab: this.acceptstab, want_return: false, want_escape: false, want_chars: false, want_arrows: want_arrow };
        return { want_tab: this._want_tab, want_return: false, want_escape: false, want_chars: false, want_arrows: want_arrow };
    };

    _pTextArea._getDragData = function ()
    {
        return this.getSelectedText();
    };

    _pTextArea.on_get_style_accessibility_label = function ()
    {
        var label = "";
        //label = this.text ? this.text : this.value;
        return label;
    };

    _pTextArea._on_getAccessibilityAdditionalLabel = function ()
    {
        var input_elem = this._input_element;
        if (input_elem && this._isAccessibilityEnable() && input_elem._wantAccessibilityAdditionalLabel)
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
    // nexacro.TextArea : Properties
    //===============================================================
    _pTextArea.set_text = function (v)
    {

    };

    _pTextArea.set_value = function (v)
    {
        v = v ? nexacro._toString(v) : v;
        if (v && v !== undefined && v != "")
        {
            v = v.replace(/&quot;/g, "\"");

            if (v.indexOf("\r\n") != -1 || v.indexOf("\n\r") != -1)
            {
                v = v.replace(/\r\n|\n\r/g, "\n");
            }

            if (v.indexOf("\r") != -1)
            {
                v = v.replace(/\r/g, "");
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

    _pTextArea.on_apply_value = function ()
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

            if (this._is_created)
            {
                this._onRecalcScrollSize();
                this._onResetScrollBar();
            }
        }
    };

    _pTextArea.set_displaynulltext = function (v)
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

    _pTextArea.on_apply_displaynulltext = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementDisplayNullText(this.displaynulltext);
        }
    };

    _pTextArea.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pTextArea.on_apply_readonly = function (val)
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

    _pTextArea.set_autoselect = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.autoselect)
        {
            this.autoselect = v;
            this.on_apply_autoselect();
        }
    };

    _pTextArea.on_apply_autoselect = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementAutoSelect(this.autoselect);
        }
    };

    _pTextArea.set_autoskip = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.autoskip)
        {
            this.autoskip = v;
            this.on_apply_autoskip();
        }
    };

    _pTextArea.on_apply_autoskip = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementAutoSkip(this.autoskip);
        }
    };

    _pTextArea.set_inputmode = function (v)
    {
        v = nexacro._toString(v);
        if (v && v != this.inputmode)
        {
            this.inputmode = v;
        }
    };

    // ["none", "dot,", "comma", "sign", "symbol", "alpha", "digit"]
    _pTextArea.set_inputfilter = function (v)
    {
        v = nexacro._toString(v);
        if (!v) v = "none";

        if (v && v != this.inputfilter)
        {
            this.inputfilter = v;
            this._inputfilter_obj = null;

            this.on_apply_inputfilter();
        }
    };

    _pTextArea.on_apply_inputfilter = function ()
    {
        var filter = this.inputfilter;
        if (filter)
        {
            this._inputfilter_obj = new nexacro._EditInputFilter(filter);
        }
    };

    _pTextArea.set_inputtype = function (v)
    {
        v = nexacro._toString(v);
        if (!v) v = "normal";

        if (v && v != this.inputtype)
        {
            this.inputtype = v;
            this._inputtype_obj = null;

            this.on_apply_inputtype();
        }
    };

    _pTextArea.on_apply_inputtype = function ()
    {
        var inputtype = this.inputtype;
        if (inputtype)
        {
            this._inputtype_obj = new nexacro._EditInputType(inputtype);

            this._imedisable = this._inputtype_obj.imedisable;
            this._keypad_type = this._inputtype_obj.keypadtype;
        }
    };

    _pTextArea.set_maxlength = function (v)
    {
        v = nexacro._toInt(v);
        if (v < 0)
        {
            v = 0;
        }

        if (v && v != this.maxlength)
        {
            this.maxlength = v;
            this.on_apply_maxlength();
        }
    };

    _pTextArea.on_apply_maxlength = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementMaxLength(this.maxlength);
        }
    };

    _pTextArea.set_useime = function (v)
    {
        this.useime = nexacro._toString(v);
        this.on_apply_useime();
    };

    _pTextArea.on_apply_useime = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementUseIme(this.useime);
        }
    };

    _pTextArea.set_imemode = function (v)
    {
        this.imemode = nexacro._toString(v);
        this.on_apply_imemode();
    };

    _pTextArea.on_apply_imemode = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementImeMode(this.imemode);
        }
    };

    _pTextArea.on_apply_wordWrap = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementWordWrap(this.wordWrap);
        }

        if (this._hscrollbartype && this._hscrollbartype.indexOf("auto") > -1 && this.wordWrap != "none")
        {
            this._hscrollbartype = "none";
        }

        if (this._is_created)
        {
            this._onRecalcScrollSize();
        }
    };

    _pTextArea.set_scrollbartype = function (v)
    {
        v = nexacro._toString(v);
        if (v == "" || nexacro._isNull(v))
            return v;

        v = v.trim();
        var arr = v.toLowerCase().split(" ");
        var hscrollbartype = this._hscrollbartype;
        var vscrollbartype = this._vscrollbartype;

        var new_vscrollbartype = "";
        var new_hscrollbartype = "";

        for (var i = 0; i < arr.length; i++)
        {
            switch (arr[i])
            {
                case "none": case "auto": case "fixed": case "autoindicator": case "indicator":
                    if (i == 0)
                        new_hscrollbartype = arr[i];
                    else if (i == 1)
                        new_vscrollbartype = arr[i];
                    break;

                default:
                    break;
            }
        }

        if (new_hscrollbartype)
            this.scrollbartype = new_hscrollbartype;
        if (new_vscrollbartype)
            this.scrollbartype += " " + new_vscrollbartype;

        this._hscrollbartype = new_hscrollbartype;
        this._vscrollbartype = new_vscrollbartype ? new_vscrollbartype : new_hscrollbartype;

        if (this._is_created)
        {
            var wordWrap = this._getCSSStyleValue("wordWrap") || this.wordWrap;
            var bWordWrap = (wordWrap != "none");

            if (bWordWrap)
            {
                this._hscrollbartype = "none";
            }
        }

        this.on_apply_scrollbartype();

        return v;
    };

    _pTextArea.set_acceptstab = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.acceptstab)
        {
            this.acceptstab = v;
        }
    };

    _pTextArea.set_dragscrolltype = function (v)
    {
        nexacro.Form.prototype.set_dragscrolltype.call(this, v);
    };

    _pTextArea.set_usecontextmenu = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.usecontextmenu)
        {
            this.usecontextmenu = v;
        }
    };

    _pTextArea.set_cursor = function (val)
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

    _pTextArea.on_apply_textAlign = function (halign)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementTextAlign(halign);
        }
    };

    _pTextArea.on_apply_padding = function (padding)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementPadding(padding);

            this._onRecalcScrollSize();
        }
    };

    _pTextArea.on_apply_lineHeight = function (lineHeight)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementLineHeight(lineHeight);

            var input_elem = this._input_element;
            if (input_elem)
            {
                if (!this._onlydisplay)
                    input_elem.updateElementText(this.value);
            }

            this._onRecalcScrollSize();
        }
    };

    _pTextArea.on_apply_textDecoration = function (textDecoration)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementTextDecoration(textDecoration);
        }
    };

    //===============================================================
    // nexacro.TextArea : Methods
    //===============================================================
    _pTextArea.getLength = function (v)
    {
        return (this.value ? this.value.length : 0);
    };

    _pTextArea.getCaretPos = function ()
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

    _pTextArea.setCaretPos = function (v)
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

    _pTextArea.getSelect = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                return input_elem.getElementSelectionRange();
        }
        return [0, 0];
    };

    _pTextArea.setSelect = function (start, end)
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

    _pTextArea.getSelectedText = function ()
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

    _pTextArea.setSelectedText = function (v)
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

                if (v != "")
                {
                    v = v.replace(/&quot;/g, "\"");

                    if (/\r\n|\n\r/.test(v))
                        v = v.replace(/\r\n|\n\r/g, "\n");

                    if (/\r/.test(v))
                        v = v.replace(/\r/g, "");
                }

                input_elem.replaceElementText(v, start, end, true);

                return src;
            }
        }

        return "";
    };

    _pTextArea.insertText = function (insert_text, position)
    {
        insert_text = nexacro._toString(insert_text);
        if (insert_text == null || insert_text == "") return;

        var text = this.text;
        if (nexacro._isNull(position) || position === "")
        {
            position = text.length;
        }
        else
        {
            position = nexacro._toInt(position);
        }

        if (position < 0 || position > text.length)
        {
            position = text.length;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (insert_text != "")
            {
                insert_text = insert_text.replace(/&quot;/g, "\"");

                if (/\r\n|\n\r/.test(insert_text))
                    insert_text = insert_text.replace(/\r\n|\n\r/g, "\n");

                if (/\r/.test(insert_text))
                    insert_text = insert_text.replace(/\r/g, "");
            }

            var text = text.substring(0, position) + insert_text + text.substring(position);

            if (!this._onlydisplay)
            {
                this._apply_filter = false;
                input_elem.updateElementText(text);
                this._apply_filter = true;
            }
            else
            {
                // todo?
            }
        }
    };

    _pTextArea.deleteText = function (start, count)
    {
        if (nexacro._isNull(start)) start = 0;
        else start = nexacro._toInt(start);
        
        if (nexacro._isNull(count)) count = -1;
        else count = nexacro._toInt(count);

        var len = this.text.length;
        if (count == -1)
            count = len - start;

        if (count < 0 || start < 0 || start >= len)
            return;

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
            {
                this._apply_filter = false;
                input_elem.replaceElementText("", start, start + count);
                this._apply_filter = true;
            }
            else
            {
                // todo?
            }
        }
    };

    _pTextArea.find = function (text, start)
    {
        start = nexacro._toInt(start) | 0;
        text = nexacro._toString(text);

        if (start == -1)
        {
            var input_elem = this._input_element;
            if (input_elem)
            {
                if (!this._onlydisplay)
                {
                    var pos = input_elem.getElementCaretPos();
                    if (pos && pos != -1)
                    {
                        start = pos.begin;
                    }
                }
            }
        }
        if (start < 0)
            return -1;

        return text ? this.text.indexOf(text, start) : -1;
    };

    _pTextArea.replace = function (oldText, newText)
    {
        if (newText == null)
            newText = "";

        oldText = nexacro._toString(oldText);
        newText = nexacro._toString(newText);

        var cur_text = this.text;

        var input_elem = this._input_element;
        if (input_elem && oldText)
        {
            var split_buf = cur_text.split(oldText);
            if (split_buf.length > 1)
            {
                var last_text = split_buf.pop();
                cur_text = split_buf.join(newText) + newText;

                var newpos = cur_text.length;
                cur_text += last_text;

                if (!this._onlydisplay)
                    input_elem.updateElementText(cur_text, newpos);
                else
                    ;   // todo?
            }
        }

        return this.text;
    };

    _pTextArea.updateToDataset = function ()
    {
        this._result_updateToDataset = this.applyto_bindSource("value", this.value);
        this._processing_updateToDataset = true;

        return this._result_updateToDataset;
    };

    //===============================================================
    // nexacro.TextArea : Event Handlers
    //===============================================================
    _pTextArea._on_deactivate = function ()
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

    _pTextArea._on_value_change = function (pretext, prevalue, posttext, postvalue)
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

    _pTextArea.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
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
            else if (keycode == nexacro.Event.KEY_TAB)
            {
                if (!alt_key && !shift_key && ((this.acceptstab && !ctrl_key) || (!this.acceptstab && ctrl_key)))
                {
                    var pos = input_elem.getElementCaretPos();
                    var text = input_elem.getElementText();

                    text = text.substring(0, pos.begin) + nexacro.TextArea._TAB_CHAR + text.substring(pos.end);
                    var newpos = pos.begin + nexacro.TextArea._TAB_CHAR.length;
                    nexacro._OnceCallbackTimer.callonce(this, function () { input_elem.updateElementText(text, newpos); }, 0);
                    input_elem.stopSysEvent();
                }
                else
                {
                    this._want_tab = false;
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

    _pTextArea.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        if (this.readonly || !this._isEnable())
            return;

        var input_elem = this._input_element;
        if (input_elem)
        {
            // 일본어의 경우, keydown에서 keycode 알 수 없음
            if (keycode == nexacro.Event.KEY_RETURN) // 13
            {
                if (input_elem.isComposing())
                    input_elem.setCompositionComplete();
            }
            if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN)
            {
                this._onRecalcScrollSize();
            }
        }
    };

    _pTextArea.on_keypress_basic_action = function (keycode, charcode, alt_key, ctrl_key, shift_key)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
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

            // IE < 9, Opera 에서는 charCode 안나옴
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

    _pTextArea.on_keyup_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        this._onRecalcScrollSize();
    };

    _pTextArea.on_beforekeyinput_basic_action = function (value, status, begin, end)
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
                if (this._apply_filter && (status == nexacro._CompositionState.NONE || status == nexacro._CompositionState.END))
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

    _pTextArea.on_keyinput_basic_action = function ()
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
                this._undostack.push(input_value, (pos && pos != -1) ? pos.begin : 0, pos ? pos.end : 0);
            }

            nexacro._OnceCallbackTimer.callonce(this, function ()
            {
                this._onRecalcScrollSize();
                this._onResetScrollBar();
            });
        }
    };

    _pTextArea.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            this._want_tab = true;
            this._default_value = this.value;
            this._default_text = this.text;

            this._changeUserStatus("nulltext", false);

            var win = this._getWindow();
            if (win)
            {
                var ldown_comp = win._cur_ldown_elem ? win._cur_ldown_elem.linkedcontrol : null;
                if (!(ldown_comp && ldown_comp instanceof nexacro.ScrollBarControl))
                {
                    if (!this._onlydisplay)
                        input_elem.setElementFocus();
                }
            }

            if (!this._onlydisplay)
            {
                var text = input_elem.getElementText();
                if (text != this.text)
                {
                    this._default_text = this.text = text;
                }
            }
        }
    };

    _pTextArea.on_killfocus_basic_action = function (new_focus, new_refer_focus)
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
            }

            var pre_value = this._default_value;
            var pre_text = this._default_text;
            var cur_value;

            if (!this._onlydisplay)
                cur_value = input_elem.value;
            else
                cur_value = input_elem.text;

            var cur_text = cur_value ? cur_value : "";

            if (pre_value != cur_value)
            {
                if (!this._on_value_change(pre_text, pre_value, cur_text, cur_value))
                {
                    this.value = pre_value;
                    this.text = pre_text;

                    if (!this._onlydisplay)
                        input_elem.setElementValue(pre_value);
                    else
                        input_elem.setElementText(pre_value);
                }
            }

            if (nexacro._isNull(this.value))
            {
                this._changeUserStatus("nulltext", true);
            }

            if (!this._onlydisplay)
                input_elem.setElementBlur();
        }
    };

    _pTextArea.on_click_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.setElementFocus(button);
        }
    };

    _pTextArea.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.oneditclick && this.oneditclick._has_handlers)
        {
            var caretpos = this.getCaretPos();
            var clientXY = this._getClientXY(canvasX, canvasY);

            var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, this);
            return this.oneditclick._fireEvent(this, evt);
        }
        return true;
    };

    _pTextArea.on_fire_canchange = function (obj, bText, bValue, aText, aValue)
    {
        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(obj, "canchange", bText, bValue, aText, aValue);
            return this.canchange._fireCheckEvent(this, evt);
        }

        return true;
    };

    _pTextArea.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
            return this.onchanged._fireEvent(this, evt);
        }
    };

    _pTextArea.on_fire_oninput = function ()
    {
        if (this.oninput && this.oninput._has_handlers)
        {
            var evt = new nexacro.InputEventInfo(this, "oninput");
            return this.oninput._fireEvent(this, evt);
        }

        return true;
    };

    //===============================================================
    // nexacro.TextArea : Logical Part
    //===============================================================
    _pTextArea._setValue = function (v)
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

    _pTextArea._setFocusToNextComponent = function ()
    {
        var root_comp = this._getRootComponent(this);
        var next_comp = this._getForm().getNextComponent(root_comp, true);
        if (next_comp)
        {
            next_comp.setFocus();
        }
    };

    _pTextArea._on_undo = function (item)
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

    _pTextArea._on_redo = function (item)
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

    _pTextArea._is_filterchar = function (ch)
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

    _pTextArea._getLineCount = function ()
    {
        var line = 0;
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                line = input_elem.getElementTextLineCount(true);
        }
        return line;
    };

    _pTextArea._onRecalcScrollSize = function ()
    {
        if (this._onlydisplay)
            return;

        var control_elem = this.getElement();
        var input_elem = this._input_element;
        if (control_elem && input_elem)
        {
            var max_width;
            var max_height;

            if (this._processing_updateScroll)
            {
                max_width = input_elem.getElementScrollWidth();
                max_height = input_elem.getElementScrollHeight();

                if (control_elem.container_maxwidth != max_width || control_elem.container_maxheight != max_height)
                {
                    control_elem.setElementScrollMaxSize(max_width, max_height);
                }

                return;
            }

            this._processing_updateScroll = true;

            max_width = input_elem.getElementScrollWidth();
            max_height = input_elem.getElementScrollHeight();

            control_elem.setElementScrollMaxSize(max_width, max_height);

            if (this.vscrollbar)
            {
                var pos = input_elem.getElementVScrollPos();
                if (this.vscrollbar._pos != pos)
                    this.vscrollbar.set_pos(pos);
            }

            if (this.hscrollbar)
            {
                var pos = input_elem.getElementHScrollPos();
                if (this.hscrollbar._pos != pos)
                    this.hscrollbar.set_pos(pos);
            }
        }

        this._processing_updateScroll = false;
    };

    _pTextArea._setHscrollPos = function (v)
    {
        this._hscroll_pos = nexacro._toInt(v);

        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementHScrollPos(v);
        }
    };

    _pTextArea._setVscrollPos = function (v)
    {
        this._vscroll_pos = nexacro._toInt(v);

        var input_elem = this._input_element;
        if (input_elem)
        {
            input_elem.setElementVScrollPos(v);
        }
    };

    _pTextArea._setVScrollDefaultAction = function (wheelDelta)
    {
        var control_elem = this.getElement();

        if (!control_elem)
            return;

        if (this.scrolltype == "none" || this.scrolltype == "horizontal")
            return false;

        var lineheight = 20;
        if (wheelDelta >= 0)
        {
            var wheelline = 3;
        }
        else
        {
            var wheelline = -3;
        }

        wheelDelta = lineheight * wheelline;

        var old_value = this._vscroll_pos;
        var value = old_value - wheelDelta;
        var vscroll_limit = control_elem.vscroll_limit;
        if (value > vscroll_limit)
            value = vscroll_limit;

        this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");

        if (old_value != this._vscroll_pos)
            return true;

        return false;
    };

    _pTextArea._isWheelScrollable = function (delta)
    {
        if (this._onlydisplay)
            return true;

        var input_elem = this._input_element;
        if (!input_elem) return false;

        var scroll_top = input_elem.getElementVScrollPos();
        var scroll_height = input_elem.getElementScrollHeight();
        var client_height = this._getClientHeight();

        if ((scroll_top + client_height >= scroll_height && delta < 0) || (scroll_top == 0 && delta > 0))
        {
            return false;
        }
        return true;
    };

    _pTextArea = null;
}