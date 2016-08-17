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
if (!nexacro.Combo)
{
    //==============================================================================
    // nexacro.ComboCloseUpEventInfo
    //==============================================================================
    nexacro.ComboCloseUpEventInfo = function (obj, id, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect)
    {
        this.id = this.eventid = id || "oncloseup";
        this.fromobject = this.fromreferenceobject = obj;

        this.preindex = beforeIndex;
        this.postindex = afterIndex;
        this.pretext = beforeText;
        this.posttext = afterText;
        this.prevalue = beforeValue;
        this.postvalue = afterValue;

        this.isselect = isSelect;
    };

    var _pComboCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ComboCloseUpEventInfo);
    nexacro.ComboCloseUpEventInfo.prototype = _pComboCloseUpEventInfo;
    _pComboCloseUpEventInfo._type_name = "ComboCloseUpEventInfo";

    delete _pComboCloseUpEventInfo;

    //==============================================================================
    // nexacro.Combo
    //==============================================================================
    nexacro.Combo = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
        this._onlydisplay = onlydisplay;
    };

    var _pCombo = nexacro._createPrototype(nexacro.Component, nexacro.Combo);
    nexacro.Combo.prototype = _pCombo;
    _pCombo._type_name = "Combo";

    /* control */
    _pCombo.comboedit = null;
    _pCombo.dropbutton = null;
    _pCombo.combolist = null;
    _pCombo._popupcontrol = null;

    /* default properties */
    _pCombo.value = undefined;
    _pCombo.index = -1;
    _pCombo.text = "";

    _pCombo.codecolumn = "";
    _pCombo.datacolumn = "";
    _pCombo.innerdataset = "";

    _pCombo.autoselect = false;
    _pCombo.autoskip = false;
    _pCombo.displaynulltext = "";
    _pCombo.imemode = "none";
    _pCombo.readonly = false;
    _pCombo.usecontextmenu = true;

    _pCombo.displayrowcount = -1;
    _pCombo.buttonsize = undefined;
    _pCombo.itemheight = 20;
    _pCombo.type = "dropdown";
    _pCombo.popuptype = "normal";

    /* internal variable */
    _pCombo._isSelect = false;
    _pCombo._isFiredOnInput = false;
    _pCombo._innerdataset = "";
    _pCombo._buttonsize = -1;
    _pCombo._default_value = undefined;
    _pCombo._default_text = "";
    _pCombo._default_index = -1;
    _pCombo._is_fling = false;

    /* status */
    _pCombo._use_readonly_status = true;

    /* event list */
    _pCombo._event_list = {
        "oneditclick": 1, "onitemclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmousemove": 1, "onmouseleave": 1,
        "onmove": 1, "onsize": 1,
        "canitemchange": 1, "onitemchanged": 1, "oninput": 1,
        "onmousewheel": 1, "oncontextmenu": 1, 
        "ondropdown": 1, "oncloseup": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* accessibility */
    _pCombo._accessibility_role = "combobox";

    //===============================================================
    // nexacro.Combo : Create & Update
    //===============================================================
    _pCombo.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            this.comboedit = new nexacro._ComboEditControl("comboedit", "absolute", 0, 0, 0, 0, null, null, this, this._onlydisplay);
            this.dropbutton = new nexacro._ComboButtonControl("dropbutton", "absolute", 0, 0, 0, 0, null, null, this);

            this.comboedit.createComponent();
            this.dropbutton.createComponent();
        }
    };

    _pCombo.on_created_contents = function (win)
    {
        this.on_apply_autoskip();
        this.on_apply_displaynulltext();
        this.on_apply_imemode();
        this.on_apply_type();
        this.on_apply_autoselect();

        this.redraw();
        this._recalcLayout();

        this._setEventHandlerToCalendarEdit();
        this._setEventHandlerToDropButton();

        this.comboedit.on_created(win);
        this.dropbutton.on_created(win);

        if (this.type == "dropdown")
        {
            this.comboedit._setReadonlyView(true);
        }

        if (nexacro._enableaccessibility)
        {
            this._want_arrows = false;
            this._setAccessibilityActiveDescendant(this.comboedit);
            this._setAccessibilityStatAutoComplete("list");

            this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
        }

        this._default_value = this.value;
        this._default_text = this.text;
        this._default_index = this.index;
    };

    _pCombo.on_create_contents_command = function ()
    {
        this.on_apply_autoskip();
        this.on_apply_displaynulltext();
        this.on_apply_imemode();
        this.on_apply_type();
        this.on_apply_autoselect();

        if (this.value !== undefined)
        {
            this.on_apply_value();
        }
        else if (this.index > -1)
        {
            this.on_apply_index();
        }
        else if (this.text !== "")
        {
            this.on_apply_text();
        }

        this.redraw();
        this._recalcLayout();

        this._setEventHandlerToCalendarEdit();
        this._setEventHandlerToDropButton();

        var str = "";

        if (this.comboedit)
        {
            str += this.comboedit.createCommand();
        }

        if (this.dropbutton)
        {
            str += this.dropbutton.createCommand();
        }

        return str;
    };

    _pCombo.on_attach_contents_handle = function (win)
    {
        if (nexacro._enableaccessibility)
        {
            this._want_arrows = false;
            this._setAccessibilityActiveDescendant(this.comboedit);
            this._setAccessibilityStatAutoComplete("list");

            this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
        }

        if (this.comboedit)
        {
            this.comboedit.attachHandle(win);
            if (this.type == "dropdown")
            {
                this.comboedit._setReadonlyView(true);
            }
        }

        if (this.dropbutton)
        {
            this.dropbutton.attachHandle(win);
        }

        this._default_value = this.value;
        this._default_text = this.text;
        this._default_index = this.index;
    };

    _pCombo.on_destroy_contents = function ()
    {
        if (this.comboedit)
        {
            this.comboedit.destroy();
            this.comboedit = null;
        }

        if (this.dropbutton)
        {
            this.dropbutton.destroy();
            this.dropbutton = null;
        }

        if (this.combolist)
        {
            this.combolist.destroy();
            this.combolist = null;
        }

        if (this._popupcontrol)
        {
            this._popupcontrol.destroy();
            this._popupcontrol = null;
        }
    };

    _pCombo.on_change_containerPos = function (left, top)
    {
        this._recalcLayout();
    };

    _pCombo.on_change_containerRect = function (width, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro.Combo : Override 
    //===============================================================
    _pCombo.on_apply_custom_setfocus = function (evt_name)
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit._changeStatus("focused", true);
            comboedit.on_focus_basic_action();
        }
    };

    _pCombo.on_apply_custom_class = function ()
    {
        if (this.comboedit)
        {
            this.comboedit.on_apply_prop_class();
        }
        if (this.dropbutton)
        {
            this.dropbutton.on_apply_prop_class();
        }
        if (this.combolist)
        {
            this.combolist.on_apply_prop_class();
        }
    };

    _pCombo.on_apply_prop_enable = function (v)
    {
        if (this.comboedit)
        {
            this.comboedit._setEnable(v);
        }
        if (this.dropbutton)
        {
            this.dropbutton._setEnable(v);
        }
        if (this.combolist)
        {
            this.combolist._setEnable(v);
        }
    };

    _pCombo.on_init_bindSource = function (columnid, propid, ds)
    {
        if (this.type == "filter")
        {
            this._createFilteredDataset();
        }

        this.value = undefined;
        this.index = -1;
        this.text = "";

        this.redraw();
    };

    _pCombo.on_change_bindSource = function (propid, ds, row, col, Idx)
    {
        if (propid == "value")
        {
            if (this.type == "filter")
            {
                this._createFilteredDataset();
            }

            var val = ds.getColumn(row, col);
            if (this.value == val)
            {
                return;
            }

            var idx = this._getIndexFromValue(ds, val);

            this.value = value;
            if (idx == -1 && !this._innerdataset)
            {
                this.index = rowIdx;
                this.text = value;
            }
            else
            {
                this.index = idx;
                this.text = this._getItemText(this.index);
            }

            this.redraw();
        }
    };

    _pCombo.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pCombo._getDragData = function ()
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            return comboedit.getSelectedText();
        }
    };

    _pCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        if ((keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) && (ctrlKey || altKey))
        {
            return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: true };
        }

        return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: this._want_arrows };
    };

    _pCombo.on_get_accessibility_label = function ()
    {
        return "";
    };

    _pCombo._getAccessibilityReadLabel = function (bwholeread)
    {
        var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
        if (bwholeread && this.comboedit._input_element && this._status != "focus")
        {
            if (!this.comboedit._input_element._wantAccessibilityAdditionalLabel || !this.comboedit._input_element._wantAccessibilityAdditionalLabel())
            {
                _readlabel = this.text + " " + _readlabel;
            }
        }

        return _readlabel;
    };

    //===============================================================
    // nexacro.Combo : Properties
    //===============================================================
    _pCombo.set_text = function (v)
    {
        if (this.text != v)
        {
            this.text = undefined ? "" : v;
            this.on_apply_text();
        }
    };

    _pCombo.on_apply_text = function ()
    {
        var ds = this._selectDataset();
        if (!ds || (!this.datacolumn && !this.codecolumn))
        {
            if (this.value)
            {
                this._setEditValue(this.text);
            }
            else
            {
                if (this.displaynulltext || this.text == "")
                {
                    this._setEditValue(undefined);
                }
                else
                {
                    this._setEditValue(this.text);
                }
            }
        }
        else if (ds)
        {
            var val = this.value;
            var txt = this.text;

            var idx = this._getIndexFromText(ds, this.text);
            if (idx > -1)
            {
                this._setValue(this._getItemValue(idx));
                this._setIndex(idx);
            }
            else
            {
                this._setValue(undefined);
                this._setText("");
            }

            this.redraw();
        }
    };

    _pCombo.set_value = function (v)
    {
        if (this.value !== v)
        {
            if (this.applyto_bindSource("value", v))
            {
                this.value = v;
                this.on_apply_value();
                this.redraw();
            }
        }
    };

    _pCombo.on_apply_value = function ()
    {
        var idx = -1;
        var txt = "";
        var ds = this._selectDataset();
        if (ds)
        {
            idx = this._getIndexFromValue(ds, this.value);
            if (idx > -1)
            {
                txt = this._getItemText(idx);
            }

            this._setIndex(idx);
            this._setText(txt);
        }
    };

    _pCombo.set_index = function (v)
    {
        if (this.index != v)
        {
            this.index = parseInt(v, 10) | 0;
            this.on_apply_index();
            this.redraw();
        }
    };

    _pCombo.on_apply_index = function ()
    {
        var idx = this.index;
        var val;
        var txt;

        var ds = this._innerdataset;
        if (ds)
        {
            if (idx !== null && idx >= 0 && idx < ds.getRowCount())
            {
                val = this._getItemValue(idx);
                txt = this._getItemText(idx);
            }
            else
            {
                idx = -1;
                val = undefined;
                txt = "";
            }

            if (this.applyto_bindSource("value", val))
            {
                this._setValue(val);
                this._setText(txt);
                if (this.index != idx)
                {
                    this._setIndex(-1);
                }
            }
            else
            {
                this._setIndex(this._preindex);
                this._setValue(this._prevalue);
                this._setText(this._pretext);
            }
        }
    };

    _pCombo.set_displaynulltext = function (v)
    {
        if (this.displaynulltext != v)
        {
            this.displaynulltext = v;
            this.on_apply_displaynulltext();
        }
    };

    _pCombo.on_apply_displaynulltext = function ()
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit.set_displaynulltext(this.displaynulltext);
        }
    };

    _pCombo.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.readonly != v)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pCombo.on_apply_readonly = function ()
    {
        var v = this.readonly;
       
        this._changeStatus("readonly", v);

        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit.set_readonly(v);
            if (this.type == "dropdown")
            {
                comboedit._setReadonlyView(true);
            }
            else
            {
                comboedit._setReadonlyView(false);
            }
        }
    };

    _pCombo.set_autoselect = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.autoselect != v)
        {
            this.autoselect = v;
            this.on_apply_autoselect();
        }
    };

    _pCombo.on_apply_autoselect = function ()
    {
        if (this.comboedit)
        {
            if (this.type == "search")
            {
                this.comboedit.set_autoselect(this.autoselect);
            }
            else
            {
                this.comboedit.set_autoselect(false);
            }
        }
    };

    _pCombo.set_autoskip = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.autoskip != v)
        {
            this.autoskip = v;
            this.on_apply_autoskip();
        }
    };

    _pCombo.on_apply_autoskip = function ()
    {
        if (this.comboedit)
        {
            this.comboedit.set_autoskip(this.autoskip);
        }
    };

    _pCombo.set_imemode = function (v)
    {
        v = nexacro._toString(v);
        if (this.imemode != v)
        {
            this.imemode = v;
            this.on_apply_imemode();
        }
    };

    _pCombo.on_apply_imemode = function ()
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit.set_imemode(this.imemode);
        }
    };

    _pCombo.set_type = function (v)
    {
        if (this.type != v)
        {
            this.type = v;
            this.on_apply_type();
        }
    };

    _pCombo.on_apply_type = function ()
    {
        if (this._filtereddataset)
        {
            this._filtereddataset.filter("");
        }

        this.on_apply_readonly();
        this.on_apply_autoselect();
    };

    _pCombo.set_popuptype = function (v)
    {
        if (this.popuptype != v)
        {
            this.popuptype = v;
            this.on_apply_popuptype();
        }
    };

    _pCombo.on_apply_popuptype = function ()
    {
        // TODO
    };

    _pCombo.set_usecontextmenu = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.usecontextmenu != v)
        {
            this.usecontextmenu = v;
            this.on_apply_usecontextmenu();
        }
    };

    _pCombo.on_apply_usecontextmenu = function ()
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit.set_usecontextmenu(this.usecontextmenu);
        }
    };

    _pCombo.set_innerdataset = function (v)
    {
        if (typeof v != "string")
        {
            this.setInnerDataset(v);
            return;
        }

        if (this.innerdataset != v)
        {
            if (!v)
            {
                this._innerdataset = null;
                this.innerdataset = "";
            }
            else
            {
                v = v.replace("@", "");
                this._innerdataset = this._findDataset(v);
                this.innerdataset = v;
            }
            this.on_apply_innerdataset();
        }
        else if (this.innerdataset && !this._innerdataset)
        {
            this._setInnerDatasetStr(this.innerdataset);
            this.on_apply_innerdataset();
        }
    };

    _pCombo.on_apply_innerdataset = function ()
    {
        var ds = this._innerdataset;

        if (this.combolist)
        {
            this.combolist.setInnerDataset(ds);
        }

        if (ds)
        {
            ds._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            ds._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

            if (this.type == "filter")
            {
                this._createFilteredDataset();
            }
        }
    };

    _pCombo.set_codecolumn = function (v)
    {
        if (this.codecolumn != v)
        {
            this.codecolumn = v;
            this.on_apply_codecolumn();
        }
    };

    _pCombo.on_apply_codecolumn = function ()
    {
        if (this.combolist)
        {
            this.combolist.set_codecolumn(this.codecolumn);
        }

        if (this.type == "filter")
        {
            this._createFilteredDataset();
        }

        this._recheckIndex();
    };

    _pCombo.set_datacolumn = function (v)
    {
        if (this.datacolumn != v)
        {
            this.datacolumn = v;
            this.on_apply_datacolumn();
        }
    };

    _pCombo.on_apply_datacolumn = function ()
    {
        var combolist = this.combolist;
        if (combolist)
        {
            combolist.set_datacolumn(this.datacolumn);
            combolist._recreate_data(true);
        }

        if (this.type == "filter")
        {
            this._createFilteredDataset();
        }

        this._recheckIndex();
    };

    _pCombo.set_buttonsize = function (v)
    {
        if (this.buttonsize != v)
        {
            this.buttonsize = v;
            this._buttonsize = nexacro._isNull(v) ? -1 : (parseInt(v) | 0);
            this.on_apply_buttonsize();
        }
    };

    _pCombo.on_apply_buttonsize = function ()
    {
        this._recalcLayout();
    };

    _pCombo.set_displayrowcount = function (v)
    {
        if (this.displayrowcount != v)
        {
            this.displayrowcount = v;
        }
    };

    _pCombo.set_itemheight = function (v)
    {
        v = (parseInt(v) | 0);
        if (this.itemheight != v)
        {
            this.itemheight = v;
            this.on_apply_itemheight();
        }
    };

    _pCombo.on_apply_itemheight = function ()
    {
        if (this.combolist)
        {
            this.combolist.set_itemheight(this.itemheight);
        }
    };

    _pCombo.set_visible = function (v)
    {
        nexacro.Component.prototype.set_visible.call(this, v);

        if (!this.visible && this._isPopupVisible())
        {
            this._closePopup();
        }
    };

    _pCombo.set_scrollbarbarminsize = function (scrollbarbarminsize)
    {
        scrollbarbarminsize = nexacro._toInt(scrollbarbarminsize);
        if (this.scrollbarbarminsize != scrollbarbarminsize)
        {
            this.scrollbarbarminsize = scrollbarbarminsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbarbarminsize(scrollbarbarminsize);
            }
        }
    };

    _pCombo.set_scrollbardecbuttonsize = function (scrollbardecbuttonsize)
    {
        scrollbardecbuttonsize = nexacro._toInt(scrollbardecbuttonsize);
        if (this.scrollbardecbuttonsize != scrollbardecbuttonsize)
        {
            this.scrollbardecbuttonsize = scrollbardecbuttonsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbardecbuttonsize(scrollbardecbuttonsize);
            }
        }
    };

    _pCombo.set_scrollbarbaroutsize = function (scrollbarbaroutsize)
    {
        scrollbarbaroutsize = nexacro._toInt(scrollbarbaroutsize);
        if (this.scrollbarbaroutsize != scrollbarbaroutsize)
        {
            this.scrollbarbaroutsize = scrollbarbaroutsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbarbaroutsize(scrollbarbaroutsize);
            }
        }
    };

    _pCombo.set_scrollbarincbuttonsize = function (scrollbarincbuttonsize)
    {
        scrollbarincbuttonsize = nexacro._toInt(scrollbarincbuttonsize);
        if (this.scrollbarincbuttonsize != scrollbarincbuttonsize)
        {
            this.scrollbarincbuttonsize = scrollbarincbuttonsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbarincbuttonsize(scrollbarincbuttonsize);
            }
        }
    };

    _pCombo.set_scrollbarsize = function (scrollbarsize)
    {
        scrollbarsize = nexacro._toInt(scrollbarsize);
        if (this.scrollbarsize != scrollbarsize)
        {
            this.scrollbarsize = scrollbarsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbarsize(scrollbarsize);
            }
        }
    };

    _pCombo.set_scrollbartrackbarsize = function (scrollbartrackbarsize)
    {
        scrollbartrackbarsize = nexacro._toInt(scrollbartrackbarsize);
        if (this.scrollbartrackbarsize != scrollbartrackbarsize)
        {
            this.scrollbartrackbarsize = scrollbartrackbarsize;

            var combolist = this.combolist;
            if (combolist)
            {
                combolist.set_scrollbartrackbarsize(scrollbartrackbarsize);
            }
        }
    };

    //===============================================================
    // nexacro.Combo : Methods
    //===============================================================
    _pCombo.dropdown = function ()
    {
        if (!this.enable || this.readonly || !this.visible)
        {
            return false;
        }

        if (!this.isDropdown())
        {
            var ds = this._selectDataset(true);

            if (this.type == "filter" && ds.rowcount == 0)
            {
                ds = this._innerdataset;
            }
        }

        this.setFocus(false);

        this._showPopup(ds, this.index);
    };

    _pCombo.isDropdown = function ()
    {
        return this._isPopupVisible();
    };

    _pCombo.getCaretPos = function ()
    {
        if (this.readonly)
        {
            return -1;
        }

        var comboedit = this.comboedit;
        if (comboedit)
        {
            return comboedit.getCaretPos();
        }

        return -1;
    };

    _pCombo.getSelect = function ()
    {
        if (this.getElement() && this.comboedit)
        {
            return this.comboedit.getSelect();
        }

        return [this.getCaretPos(), this.getCaretPos()];
    };

    _pCombo.setSelect = function (start, end)
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            return this.comboedit.setSelect(start, end);
        }

        return false;
    };

    _pCombo.getSelectedText = function ()
    {
        if (this.getElement() && this.comboedit)
        {
            return this.comboedit.getSelectedText();
        }

        return "";
    };

    _pCombo.setSelectedText = function (v)
    {
        if (this.getElement() && this.comboedit)
        {
            return this.comboedit.setSelectedText(v);
        }
    };

    _pCombo.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pCombo.setInnerDataset = function (obj)
    {
        if (!obj)
        {
            this._innerdataset = null;
            this.innerdataset = "";
            this.on_apply_innerdataset();
        }
        else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset"))
        {
            this._innerdataset = obj;
            this.innerdataset = obj.id;
            this.on_apply_innerdataset();
            this._recheckIndex();
        }
    };

    _pCombo.getCount = function ()
    {
        if (this.getElement())
        {
            if (this.combolist)
            {
                return this.combolist.getCount();
            }
            else if (this._innerdataset)
            {
                return this._innerdataset.getRowCount();
            }
        }

        return 0;
    };

    _pCombo.redraw = function ()
    {
        if (this.text)
        {
            this._setEditValue(this.text);
        }
        else
        {
            this._setEditValue(undefined);
        }
    };

    _pCombo.updateToDataset = function ()
    {
        return this.applyto_bindSource("value", this.value);
    };

    //===============================================================
    // nexacro.Combo : Events
    //===============================================================
    _pCombo._on_activate = function ()
    {
        nexacro.Component.prototype._on_activate.call(this);

        var comboedit = this.comboedit;
        if (comboedit)
        {
            nexacro.Edit.prototype._on_activate.call(comboedit);
        }
    };

    _pCombo._on_dropdown = function ()
    {
        if (this.readonly)
        {
            return;
        }

        var ds = this._selectDataset(true);
        var idx = this.index;

        if (this._isPopupVisible())
        {
            this._closePopup();
            this._setEditValue(this._getItemText(idx));
        }
        else
        {
            var comboedit = this.comboedit;
            if (comboedit)
            {
                comboedit.setSelect(0, 0);
            }

            if (this.type == "filter")
            {
                this._clearFilteredDataset();
            }

            this._showPopup(ds, idx);
        }
    };

    _pCombo._on_value_change = function (preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        if (!this.on_fire_canitemchange(this, preindex, pretext, prevalue, postindex, posttext, postvalue))
        {
            return false;
        }

        if (!this.applyto_bindSource("value", postvalue))
        {
            return false;
        }

        this.value = postvalue;
        this.text = posttext;
        this.index = postindex;

        this.on_fire_onitemchanged(this, preindex, pretext, prevalue, postindex, posttext, postvalue);

        return true;
    };

    _pCombo._callback_onvaluechanged = function (obj, e)
    {
        if (this.type == "filter")
        {
            this._createFilteredDataset();
        }

        this._recheckValue();
    };

    _pCombo._callback_onrowsetchanged = function (obj, e)
    {
        if (e.reason == nexacro.NormalDataset.REASON_FILTER)
        {
            if (this.type == "filter")
            {
                this._createFilteredDataset();
            }
        }
        else if (e.reason == nexacro.NormalDataset.REASON_ASSIGN)
        {
            this.set_index(-1);
        }

        this._recheckValue();
    };

    _pCombo.on_notify_edit_onlbuttondown = function (obj, e)
    {
        if (this.readonly || (nexacro._isTouchInteraction && nexacro._SupportTouch))
        {
            return;
        }

        var ds = this._selectDataset(true);
        var idx = this.index;

        if (this._isPopupVisible())
        {
            this._closePopup();
            this._setEditValue(this._getItemText(idx));
        }
        else
        {
            if (this.type == "dropdown")
            {
                this._showPopup(ds, idx);
            }
        }
    };

    _pCombo.on_notify_drop_onlbuttondown = function (obj, e)
    {
        this._on_dropdown();
    };

    _pCombo.on_notify_drop_mobile_onclick = function (obj, e)
    {
        this._on_dropdown();
    };

    _pCombo.on_notify_edit_onkeydown = function (obj, e)
    {
        var combolist = this.combolist;
        var comboedit = this.comboedit;
        var popupcontrol = this._popupcontrol;

        if (this.readonly)
        {
            return false;
        }

        var ds = this._selectDataset();
        var datacol = this.datacolumn;
        var codecol = this.codecolumn;

        if (!ds || (!datacol && !codecol))
        {
            return;
        }

        var keycode = e.keycode;

        var pre_value = this._default_value;
        var pre_text = this._default_text;
        var pre_index = this._default_index;

        var cur_value = this.value;
        var cur_text = this.text;
        var cur_index = this.index;

        var nextidx;
        var rawidx;
        var curobj = null;
        var text = "";
        var rowcnt = ds.getRowCount();

        if (this._isPopupVisible())
        {
            curobj = combolist._get_rowobj_status("mouseover", "status") || combolist._get_rowobj_status("selected", "userstatus");
            if (curobj)
            {
                cur_index = curobj.index;
            }
        }

        if (keycode == nexacro.Event.KEY_ESC)
        {
            if (this._isPopupVisible())
            {
                text = this._getItemText(this.index);

                this._closePopup();
                this._setEditValue(text);
            }
        }
        else if (keycode == nexacro.Event.KEY_UP)
        {
            nextidx = cur_index - 1;

            if (!nexacro._enableaccessibility)
            {
                if (this._isPopupVisible())
                {
                    if (e.ctrlkey)
                    {
                        ;
                    }
                    else
                    {
                        if (nextidx < 0)
                        {
                            nextidx = 0;
                        }

                        text = ds.getColumn(nextidx, datacol || codecol);

                        this._setEditValue(text);
                        combolist._refreshScroll(nextidx, 1);
                        combolist._change_status_item_from_key(cur_index, nextidx);
                    }
                }
                else
                {
                    if (nextidx < 0)
                    {
                        nextidx = 0;
                    }

                    if (this.type == "filter")
                    {
                        rawidx = this._getRawIndex(ds, nextidx);
                        rawidx = (rawidx == -1) ? nextidx : rawidx;
                        this._clearFilteredDataset();

                        nextidx = rawidx;
                    }

                    if (this.index != nextidx)
                    {
                        cur_value = this._getItemValue(nextidx);
                        cur_text = this._getItemText(nextidx);
                        cur_index = nextidx;
                        
                        if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value))
                        {
                            cur_value = pre_value;
                            cur_text = pre_text;
                            cur_index = pre_index;
                        }
                        
                        this.redraw();
                    }
                }
            }
        }
        else if (keycode == nexacro.Event.KEY_DOWN)
        {
            nextidx = cur_index + 1;

            if (this._isPopupVisible())
            {
                if (e.ctrlkey)
                {
                    ;
                }
                else
                {
                    if (nextidx < rowcnt)
                    {
                        text = ds.getColumn(nextidx, datacol || codecol);
                        text = text == undefined ? "" : text;

                        this._setEditValue(text);
                        combolist._refreshScroll(nextidx, 0);
                        combolist._change_status_item_from_key(cur_index, nextidx);
                    }
                }
            }
            else
            {
                if (e.altkey)
                {
                    this._showPopup(ds, cur_index);
                }
                else
                {
                    if (nextidx >= rowcnt)
                    {
                        nextidx = rowcnt - 1;
                    }

                    if (this.type == "filter")
                    {
                        rawidx = this._getRawIndex(ds, nextidx);
                        rawidx = (rawidx == -1) ? nextidx : rawidx;
                        this._clearFilteredDataset();

                        nextidx = rawidx;
                    }

                    if (this.index != nextidx)
                    {
                        cur_value = this._getItemValue(nextidx);
                        cur_text = this._getItemText(nextidx);
                        cur_index = nextidx;
                        
                        if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value))
                        {
                            cur_value = pre_value;
                            cur_text = pre_text;
                            cur_index = pre_index;
                        }
                        
                        this.redraw();
                    }
                }
            }
        }
        else if (keycode == nexacro.Event.KEY_ENTER)
        {
            if (cur_index >= 0)
            {
                if (this.type == "filter")
                {
                    rawidx = this._getRawIndex(ds, cur_index);
                    rawidx = (rawidx == -1) ? cur_index : rawidx;
                    ds.set_filterstr("");
                }
                else
                {
                    rawidx = cur_index;
                }
            }

            if (this.index != rawidx)
            {
                this._isSelect = true;

                cur_value = this._getItemValue(rawidx);
                cur_text = this._getItemText(rawidx);
                cur_index = rawidx;

                if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value))
                {
                    this._setEditValue(this.text);
                    this._isSelect = false;
                    cur_value = pre_value;
                    cur_text = pre_text;
                    cur_index = pre_index;
                }
            }

            this.redraw();

            if (this._isPopupVisible())
            {
                this._closePopup();

                if (this.autoskip)
                {
                    this._setFocusToNextComponent();
                }
            }
        }

        this._default_value = cur_value;
        this._default_text = cur_text;
        this._default_index = cur_index;
    };

    _pCombo.on_notify_edit_oninput = function (obj, e)
    {
        if (this.readonly || !this._isEnable())
        {
            return false;
        }

        this._isFiredOnInput = true;
        this.on_fire_oninput();

        var combolist = this.combolist;
        var comboedit = this.comboedit;
        var edit_val = comboedit.text;
        var type = this.type;

        var ds = this._selectDataset();
        if (ds)
        {
            var col = this.datacolumn || this.codecolumn;

            if (type != "dropdown")
            {
                if (!combolist)
                {
                    this._createPopupListBoxControl(ds);
                }
            }

            switch (type)
            {
                case "search":
                    var index = ds.findRowAs(col, edit_val);
                    if (index >= 0)
                    {
                        this._showPopup(ds, index);
                    }
                    else
                    {
                        if (this._isPopupVisible())
                        {
                            this._closePopup();
                        }
                    }
                    break;
                case "filter":
                    ds.set_filterstr("");
                    ds.set_filterstr(col + ".match('" + edit_val + "')");

                    if (ds.getRowCount() > 0)
                    {
                        this._showPopup(ds, 0);
                    }
                    else
                    {
                        if (this._isPopupVisible())
                        {
                            this._closePopup();
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    };

    _pCombo.on_notify_edit_oneditclick = function (obj, e)
    {
        this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, obj, obj);
    };

    _pCombo.on_notify_edit_mobile_oneditclick = function (obj, e)
    {
        this._on_dropdown();
        this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, obj, obj);
    };

    _pCombo.on_notify_list_onitemclick = function (obj, e)
    {
        if (!this.combolist || !this.comboedit)
        {
            return false;
        }

        var pre_value = this._default_value;
        var pre_text = this._default_text;
        var pre_index = this._default_index;

        var cur_index = e.index;
        var cur_text = e.itemtext;
        var cur_value = e.itemvalue;

        this.on_fire_onitemclick(obj, cur_index, cur_text, cur_value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty);

        if (this.type == "filter")
        {
            var ds = this._selectDataset();
            cur_index = this._getRawIndex(ds, e.index);
            if (cur_index != this.index)
            {
                cur_text = this._getItemText(cur_index);
                cur_value = this._getItemValue(cur_index);
            }
        }

        if (cur_index != this.index)
        {
            if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value))
            {
                this.value = cur_value = pre_value;
                this.text = cur_text = pre_text;
                this.index = cur_index = pre_index;
            }

            this.redraw();

            if (this._isPopupVisible())
            {
                this._closePopup();

                if (this.autoskip)
                {
                    this._setFocusToNextComponent();
                }
                else
                {
                    this._setDefaultCaret();
                }
            }

            this._default_value = cur_value;
            this._default_text = cur_text;
            this._default_index = cur_index;
        }
        else
        {
            if (this._isPopupVisible())
            {
                this._closePopup();
            }
        }
    };

    _pCombo.on_notify_list_oncloseup = function (obj, e)
    {
        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
        }

        if (!this._isFiredOnInput)
        {
            if (this.displaynulltext != "" && nexacro._isNull(this.value))
            {
                this._setEditValue(undefined);
            }
            else
            {
                this._setEditValue(this.text);
            }
        }

        this._isFiredOnInput = false;
        this._changeStatus("mouseover", false);
        this.comboedit._changeStatus("mouseover", false);
        this.dropbutton._changeStatus("mouseover", false);

        this.on_fire_oncloseup(this, this._default_index, this._default_text, this._default_value, this.index, this.text, this.value, this._isSelect);
    };

    _pCombo.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        this._changeStatus("focused", true);

        this.on_apply_custom_setfocus(evt_name);
    };

    _pCombo.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit._changeStatus("focused", false);
        }

        if (this._isPopupVisible())
        {
            this._closePopup();
        }

        this.redraw();
    };

    _pCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp)
    {
        if (this.readonly)
        {
            return false;
        }

        var popupcontrol = this._popupcontrol;
        if (!popupcontrol || !popupcontrol._is_popup())
        {
            var ds = this._selectDataset();
            var curidx = this.index;
            var nextidx = 0;

            if (wheelDeltaY > 0)
            {
                if (curidx > 0)
                {
                    nextidx = curidx - 1;
                }
                else
                {
                    nextidx = 0;
                }
            }
            else
            {
                nextidx = curidx + 1;
            }

            if (this.index != nextidx && nextidx < ds.getRowCount())
            {
                var pre_index = this.index;
                var pre_text = this.text;
                var pre_value = this.value;

                var cur_index = nextidx;
                var cur_text = this._getItemText(nextidx);
                var cur_value = this._getItemValue(nextidx);

                var ret = this.on_fire_canitemchange(this, pre_index, pre_text, pre_value, cur_index, cur_text, cur_value);
                if (ret)
                {
                    this.set_index(nextidx);

                    this.on_fire_onitemchanged(this, pre_index, pre_text, pre_value, cur_index, cur_text, cur_value);
                }
            }
        }

        return true;
    };

    _pCombo.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

        this._update_popupwindow_position();

        return (this._popupcontrol && this._popupcontrol._is_popup()) ? true : false;
    };

    _pCombo.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

        this._update_popupwindow_position();

        return ret;
    };

    _pCombo.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        // TODO
        //if (nexacro._isTouchInteraction && nexacro._SupportTouch && !nexacro._enabletouchevent)
        //{
        //    var evt = new nexacro.EventInfo(this, "oneditclick");
        //    this.on_notify_edit_onlbuttondown(this, evt);
        //}

        if (this.oneditclick && this.oneditclick._has_handlers)
        {
            var evt = new nexacro.EditClickEventInfo(obj, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
            return this.oneditclick._fireEvent(this, evt);
        }

        return true;
    };

    _pCombo.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            this.onitemclick._fireEvent(this, evt);
        }

        return false;
    };

    _pCombo.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        if (this.canitemchange && this.canitemchange._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
            var ret = this.canitemchange._fireCheckEvent(this, evt);
            return nexacro._toBoolean(ret);
        }

        return true;
    };

    _pCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        if (this.onitemchanged && this.onitemchanged._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
            this.onitemchanged._fireEvent(this, evt);
        }
    };

    _pCombo.on_fire_oncloseup = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue, isSelect)
    {
        var ret;
        if (this.oncloseup && this.oncloseup._has_handlers)
        {
            var evt = new nexacro.ComboCloseUpEventInfo(this, "oncloseup", preindex, pretext, prevalue, postindex, posttext, postvalue, isSelect);
            ret = this.oncloseup._fireEvent(this, evt);
            ret = nexacro._toBoolean(ret);
        }

        return ret;
    };

    _pCombo.on_fire_ondropdown = function (obj)
    {
        if (this.ondropdown && this.ondropdown._has_handlers)
        {
            var evt = new nexacro.EventInfo(this, "ondropdown");
            return this.ondropdown._fireCheckEvent(this, evt);
        }

        return true;
    };

    _pCombo.on_fire_oninput = function ()
    {
        if (this.oninput && this.oninput._has_handlers)
        {
            var evt = new nexacro.InputEventInfo(this, "oninput");
            return this.oninput._fireEvent(this, evt);
        }

        return true;
    };

    // TODO------------------------------

    _pCombo.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        //if (from_refer_comp &&
        //    (from_refer_comp instanceof nexacro.ScrollBarCtrl ||
        //    (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) return;

        if (this.isDropdown())
        {
            var sel_info_list = this.combolist._selectinfo_list;

            if (this._scroll_proc)
            {
                if (sel_info_list.length)
                {
                    var last = sel_info_list.length - 1;
                    var info = sel_info_list[last];

                    if (info.index != this.index)
                    {
                        info.obj._keep_selecting = false;
                        info.obj._stat_change("notselect", "normal");
                        sel_info_list.splice(last, 1);
                    }
                }
                return;
            }

            while (sel_info_list.length)
            {
                var down_item = sel_info_list[0].obj;
                if (down_item)
                {
                    down_item._keep_selecting = false;


                    if (!down_item.selected)
                    {
                        down_item._stat_change("notselect", "normal");
                    }

                }
                sel_info_list.shift();
            }
        }
        return;
    };

    _pCombo.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp)
    {
        var ret = false;
        if (this._isPopupVisible())
        {
            var combolist = this.combolist;
            var items = combolist._get_contents_rows();
            var obj = null;

            if (items)
            {
                if (direction)
                {
                    combolist._overeditemindex++;
                }
                else
                {
                    combolist._overeditemindex--;
                }

                // 첫번째 아이템에서 역방향으로 슬라이드하면 이전 컴포넌트로 이동.
                // 마지막 아이템에서 순방향으로 슬라이드하면 다음 컴포넌트로 이동.                
                if (combolist._overeditemindex < 0 || combolist._overeditemindex > items.length - 1)
                {
                    if (this._isPopupVisible())
                    {
                        this._closePopup();
                    }
                    combolist._overeditemindex = 0;
                }
                else
                {
                    obj = combolist._getItemByRealIdx(items, combolist._overeditemindex).obj;
                }
            }

            if (obj)
            {
                ret = true;
                obj._setAccessibilityNotifyEvent();
            }
        }
        return ret;
    };

    //===============================================================
    // nexacro.Combo : Logical part
    //===============================================================
    _pCombo._createListBoxControl = function (ds)
    {
        if (!this._isUsableDataset(ds))
        {
            return;
        }

        var datacol = this.datacolumn;
        var codecol = this.codecolumn;
        var combolist = this.combolist;

        if (!combolist)
        {
            combolist = this.combolist = new nexacro._ComboListControl("combolist", "absolute", 0, 0, 1, 1, null, null, this);

            combolist.set_scrolltype("vertical");
            combolist.set_scrollbartype("none auto");
            combolist.set_codecolumn(codecol);
            combolist.set_datacolumn(datacol);
            combolist.setInnerDataset(ds);
            combolist.set_index(this.index);
            combolist.set_itemheight(this.itemheight);

            combolist.set_scrollbarbarminsize(this.scrollbarbarminsize);
            combolist.set_scrollbardecbuttonsize(this.scrollbardecbuttonsize);
            combolist.set_scrollbarbaroutsize(this.scrollbarbaroutsize);
            combolist.set_scrollbarincbuttonsize(this.scrollbarincbuttonsize);
            combolist.set_scrollbarsize(this.scrollbarsize);
            combolist.set_scrollbartrackbarsize(this.scrollbartrackbarsize);

            combolist._setPopupContains(true);

            combolist.createComponent(true);
        }
    };

    _pCombo._createdListBoxControl = function (ds)
    {
        var combolist = this.combolist;
        if (combolist && !combolist._is_created)
        {
            this.on_apply_innerdataset();

            combolist._setEventHandler("oncloseup", this.on_notify_list_oncloseup, this);
            combolist._setEventHandler("onitemclick", this.on_notify_list_onitemclick, this);

            combolist.on_created();
            //combolist.getElement().setElementToolTip("", combolist.getElement().tooltiptype);

            var win = this._getWindow();
            var control_elem = this.getElement();
            var list_elem = combolist.getElement();

            var size = this._getPopuplistSize(ds);
            var width = size.width;
            var height = size.height;
            if (height.height > 700)
            {
                var offs = { width: 0, height: 0 };
                var win_width = win.getWidth();
                var win_height = win.getHeight();

                var pos = nexacro._getElementPositionInFrame(control_elem);
                var scale = this._getCumulativeZoomFactor() / 100.0;

                offs.width = win_width - pos.x + (this._getClientWidth() * scale);
                width = Math.min(width, offs.width / scale);

                offs.height = win_height - pos.y + (this._getClientHeight() * scale);
                height = Math.min(height, offs.height / scale);
            }

            if (list_elem)
            {
                list_elem.setElementSize(width, height);
            }
        }
    };

    _pCombo._createPopupControl = function ()
    {
        var popupcontrol = this._popupcontrol;
        if (!popupcontrol)
        {
            popupcontrol = this._popupcontrol = new nexacro._ComboPopupControl("combopopup", "absolute", 0, 0, 0, 0, null, null, this);
            popupcontrol.createComponent(true);
        }
    };

    _pCombo._createdPopupControl = function (attach_comp)
    {
        var popupcontrol = this._popupcontrol;
        if (popupcontrol && !popupcontrol._is_created)
        {
            popupcontrol._attach(attach_comp);
            popupcontrol.on_created();
        }
    };

    _pCombo._createPopupListBoxControl = function (ds)
    {
        if (!this._isUsableDataset(ds))
        {
            return;
        }

        this._createPopupControl();
        this._createListBoxControl(ds);

        this._createdPopupControl(this.combolist);
        this._createdListBoxControl(ds);
    };

    _pCombo._createFilteredDataset = function ()
    {
        var ids = this._innerdataset;
        var fds = this._filtereddataset;
        var codecol = this.codecolumn;
        var datacol = this.datacolumn;
        var combolist = this.combolist;

        if (ids && (!(codecol in ids.colinfos) || !(datacol in ids.colinfos)))
        {
            return;
        }
            
        if (!this._isUsableDataset(ids))
        {
            return;
        }

        var row_count = ids.getRowCount();

        if (!fds)
        {
            fds = this._filtereddataset = new nexacro.Dataset("filter_" + this.id);
            fds.addColumn(codecol, "string");
            fds.addColumn(datacol, "string");

            for (var i = 0; i < row_count; i++)
            {
                fds.insertRow(i);
                fds.setColumn(i, codecol, ids.getColumn(i, codecol));
                fds.setColumn(i, datacol, ids.getColumn(i, datacol));
            }
        }
        else
        {
            if (combolist)
            {
                fds.set_enableevent(false);

                fds.clear();
                fds.addColumn(codecol, "string");
                fds.addColumn(datacol, "string");

                for (var i = 0; i < row_count; i++)
                {
                    fds.insertRow(i);
                    fds.setColumn(i, codecol, ids.getColumn(i, codecol));
                    fds.setColumn(i, datacol, ids.getColumn(i, datacol));
                }

                fds.set_enableevent(true);
                combolist.redraw();
            }
            else
            {
                fds.clear();
                fds.addColumn(codecol, "string");
                fds.addColumn(datacol, "string");

                for (var i = 0; i < row_count; i++)
                {
                    fds.insertRow(i);
                    fds.setColumn(i, codecol, ids.getColumn(i, codecol));
                    fds.setColumn(i, datacol, ids.getColumn(i, datacol));
                }
            }
        }
    };

    _pCombo._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var comboedit = this.comboedit;
            var dropbutton = this.dropbutton;

            var client_left = this._getClientLeft();
            var client_top = this._getClientTop();
            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();

            var buttonsize = this._buttonsize;
            if (buttonsize < 0)
            {
                buttonsize = client_height;
            }
            else if (buttonsize > client_width)
            {
                buttonsize = client_width;
            }

            if (dropbutton)
            {
                var btn_left = client_width - buttonsize;
                var btn_top = client_top;

                dropbutton.move(btn_left, btn_top, buttonsize, client_height, null, null);
            }

            if (comboedit)
            {
                var edit_width = client_width - buttonsize - 1;

                comboedit.move(client_left, client_top, edit_width, client_height, null, null);
            }
        }
    };

    _pCombo._recheckIndex = function ()
    {
        var val;
        var txt;
        var idx = this.index;
        var ds = this._innerdataset;

        if (ds && idx > -1 && idx < ds.getRowCount())
        {
            val = this._getItemValue(idx);
            txt = this._getItemText(idx);
        }
        else
        {
            val = undefined;
            txt = "";

            this._setIndex(-1);
        }

        this._setValue(val);
        this._setText(txt);

        this.redraw();
    };

    _pCombo._recheckValue = function ()
    {
        var idx;
        var txt;
        var val = this.value;
        var ds = this._innerdataset;

        if (ds && val !== undefined)
        {
            var row_count = ds.getRowCount();
            for (var i = 0; i < row_count; i++)
            {
                if (val == this._getItemValue(i))
                {
                    idx = i;
                    txt = this._getItemText(i);
                    break;
                }
            }

        }
        else
        {
            idx = -1;
            txt = "";

            this._setValue(undefined);
        }

        this._setText(txt);
        this._setIndex(idx);

        this.redraw();
    };

    _pCombo._recheckText = function ()
    {
        var val;
        var idx;
        var txt = this.text;
        var ds = this._innerdataset;

        if (ds && txt)
        {
            var row_count = ds.getRowCount();
            for (var i = 0; i < row_count; i++)
            {
                if (txt == this._getItemText(i))
                {
                    idx = i;
                    val = this._getItemValue(i);
                    break;
                }
            }
        }
        else
        {
            idx = -1;
            val = undefined;

            this._setText("");
        }

        this._setValue(val);
        this._setIndex(idx);

        this.redraw();
    };

    _pCombo._selectDataset = function (bInit)
    {
        if (this.type == "filter")
        {
            if (!this._filtereddataset)
            {
                this._createFilteredDataset();
            }
            else
            {
                if (bInit)
                {
                    this._clearFilteredDataset();
                }
            }

            return this._filtereddataset;
        }
        else
        {
            return this._innerdataset;
        }
    };

    _pCombo._showPopup = function (ds, index)
    {
        if (this._isPopupVisible())
        {
            this._closePopup();
        }   

        var ret = this.on_fire_ondropdown(this);
        if (ret)
        {
            var popuptype = this._getPopupType();
            // TODO : ondropdown에서 index변경경우 필요.
            if ((this.ondropdown && this.dropdown.preventable && this.ondropdown.defaultprevented) || !this._isUsableDataset(ds) || popuptype == "none")
            {
                return;
            }

            if (nexacro._enableaccessibility)
            {
                this._want_arrows = true;
            }

            this._createPopupListBoxControl(ds);

            var combolist = this.combolist;
            var popupcontrol = this._popupcontrol;

            if (combolist && popupcontrol)
            {
                var size = this._getPopuplistSize(ds);
                var width = size.width;
                var height = size.height;

                if (popuptype == "center")
                {
                    popupcontrol._popupCenterAuto(width, height);
                }
                else
                {
                    popupcontrol._popupAuto(width, height);
                }

                combolist.set_index(index);
                combolist.setInnerDataset(ds);
                combolist._refreshScroll(index, 1);
                //combolist._reset_item(-1, index);

                //if (index == -1 && combolist.vscrollbar)
                //{
                //combolist.getElement().setElementVScrollPos(0);
                //}

                var _window = this._getWindow();
                if (_window)
                {
                    _window._setCaptureLock(this, true, false);
                }

                if (nexacro._enableaccessibility)
                {
                    if (nexacro._accessibilitytype == 4)
                    {
                        combolist.setFocus();
                    }
                    else if (nexacro._accessibilitytype == 5)
                    {
                        combolist._setAccessibilityNotifyEvent();
                    }
                }
            }
        }
    };

    _pCombo._applyZoomPopup = function ()
    {
        if (this._popupcontrol && this._popupcontrol._is_popup())
        {
            if (this.enable === false || this.readonly === true || this.visible === false) return;

            var ds = this._selectDataset();
            if (ds)
            {
                if (ds.getRowCount() <= 0)
                {
                    ds = this._innerdataset;
                }

                this._showPopup(ds, this.index);
            }
        }
    };

    _pCombo._closePopup = function ()
    {
        var _window = this._getWindow();
        if (_window)
        {
            _window._releaseCaptureLock(this);
        }

        var popupcontrol = this._popupcontrol;
        if (popupcontrol)
        {
            popupcontrol._closePopup();
        }
    };

    _pCombo._setFocusToNextComponent = function ()
    {
        var root_comp = this._getRootComponent(this);
        var next_comp = this._getForm().getNextComponent(root_comp, true);
        if (next_comp)
        {
            next_comp.setFocus();
        }
    };

    _pCombo._update_popupwindow_position = function ()
    {
        var popupcontrol = this._popupcontrol;
        if (popupcontrol)
        {
            var win = this._getWindow();
            var popupcontrol_elem = popupcontrol.getElement();

            var ds = this._selectDataset();
            ds = (ds && ds.rowcount == 0) ? this._innerdataset : ds;

            var size = this._getPopuplistSize(ds);
            var height = size.height;
            var width = size.width;
            var pos = nexacro._getElementPositionInFrame(this.getElement());
            var scale = this._getCumulativeZoomFactor() / 100.0;

            var offs = { width: 0, height: 0 };
            var win_width = win.getWidth();
            var win_height = win.getHeight();

            offs.width = win_width - pos.x + (this.getOffsetWidth() * scale);
            width = parseInt(Math.min(width, offs.width / scale));

            offs.height = win_height - pos.y + (this.getOffsetHeight() * scale);
            height = parseInt(Math.min(height, offs.height / scale));

            var scalepos = popupcontrol._getScalePosition(width, height);
            var l = pos.x + scalepos.left, t = pos.y + scalepos.top;

            if (this._getPopupType() == "center")
            {
                var rootframe = this._getOwnerFrame();
                if (!rootframe) return;

                var rootwindow = rootframe._getWindow();
                rootframe = rootwindow ? rootwindow.frame : null;
                if (!rootframe) return;

                l = ((rootframe.width / 2) - (popupcontrol_elem.width / 2));
                t = ((rootframe.height / 2) - (popupcontrol_elem.height / 2));

                t = t < 0 ? 0 : t;
                popupcontrol_elem.setElementPosition(l / scale, t);
            }
            else
            {
                popupcontrol_elem.setElementPosition(l, t);
            }
        }
    };

    //===============================================================
    // nexacro.Combo : Util Function
    //===============================================================
    _pCombo._setValue = function (v)
    {
        this.value = v;
    };

    _pCombo._setEditValue = function (v)
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            comboedit._setValue(v);
        }
    };

    _pCombo._setIndex = function (v)
    {
        this.index = v;
    };

    _pCombo._setText = function (v)
    {
        this.text = v;
    };

    _pCombo._setEventHandlerToCalendarEdit = function ()
    {
        var comboedit = this.comboedit;
        if (comboedit)
        {
            var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
            if (bMobile)
            {
                comboedit._setEventHandler("oneditclick", this.on_notify_edit_mobile_oneditclick, this);
            }
            else
            {
            comboedit._setEventHandler("onlbuttondown", this.on_notify_edit_onlbuttondown, this);
            comboedit._setEventHandler("oneditclick", this.on_notify_edit_oneditclick, this);
            }

            comboedit._setEventHandler("onkeydown", this.on_notify_edit_onkeydown, this);
            comboedit._setEventHandler("oninput", this.on_notify_edit_oninput, this);
            //comboedit._setEventHandler("onlbuttonup", this.on_notify_edit_onlbuttonup, this);
            //comboedit._setEventHandler("ontouchstart", this.on_notify_edit_ontouchstart, this);
        }
    };

    _pCombo._setEventHandlerToDropButton = function ()
    {
        var dropbutton = this.dropbutton;
        if (dropbutton)
        {
            if (nexacro._isTouchInteraction && nexacro._SupportTouch)
            {
                dropbutton._setEventHandler("onclick", this.on_notify_drop_mobile_onclick, this);
            }
            else
            {
                dropbutton._setEventHandler("onlbuttondown", this.on_notify_drop_onlbuttondown, this);
            }
        }
    };

    _pCombo._setEventHandlerToListBox = function ()
    {
        var combolist = this.combolist;
        if (combolist)
        {
            combolist._setEventHandler("onitemclick", this.on_notify_list_onitemclick, this);
            combolist._setEventHandler("canitemchange", this.on_notify_list_canitemchange, this);
            combolist._setEventHandler("onitemchanged", this.on_notify_list_onitemchanged, this);
        }
    };

    _pCombo._setInnerDatasetStr = function (str)
    {
        if (str)
        {
            str = str.replace("@", "");
            this._innerdataset = this._findDataset(str);
            this.innerdataset = str;
        }
        else
        {
            this._innerdataset = null;
            this.innerdataset = "";
        }
    };

    _pCombo._setDefaultCaret = function ()
    {
        var edit = this.comboedit;
        if (edit)
        {
            if (this.type == "dropdown")
            {
                edit.setCaretPos(0);
            }
        }
    };

    _pCombo._getItemValue = function (index)
    {
        var ds = this._innerdataset;
        var column = this.codecolumn || this.datacolumn;

        if (ds && column)
        {
            var rtn = ds.getColumn(index, column);
            if (rtn == undefined && this.type == "filter")
            {
                rtn = this._innerdataset.getColumn(index, column);
            }

            return rtn;
        }

        return null;
    };

    _pCombo._getItemText = function (index)
    {
        var ds = this._innerdataset;
        var column = this.datacolumn || this.codecolumn;

        if (ds && column)
        {
            var rtn = ds.getColumn(index, column);
            if (rtn == undefined && this.type == "filter")
            {
                rtn = this._innerdataset.getColumn(index, column);
            }

            return rtn;
        }

        return null;
    };

    _pCombo._getIndexFromValue = function (ds, value)
    {
        if (value instanceof nexacro.Decimal)
        {
            value = value.toString();
        }

        var row_count = ds.getRowCount();
        for (var i = 0; i < row_count; i++)
        {
            var v = this._getItemValue(i);
            if (v instanceof nexacro.Decimal)
            {
                v = v.toString();
            }

            if (value == v)
            {
                return i;
            }
        }

        return -1;
    };

    _pCombo._getIndexFromText = function (ds, text)
    {
        var row_count = ds.getRowCount();
        for (var i = 0; i < row_count; i++)
        {
            if (this._getItemText(i) == this.text)
            {
                return i;
            }
        }

        return -1;
    };

    _pCombo._getRawToListindex = function (idx)
    {
        if (this.type == "filter")
        {
            var fds = this._getFilteredDataset();
            var fdsArr = fds._viewRecords;
            var row_count = fdsArr.length;

            for (var i = 0; i < row_count; i++)
            {
                if (fdsArr[i]._rawidx == idx)
                {
                    return i;
                }
            }
        }
        return idx;
    };

    _pCombo._getRawIndex = function (fds, idx)
    {
        var ids = this._innerdataset;

        if (idx == -1 || (fds._viewRecords.length <= idx))
        {
            return -1;
        }

        var rawidx = fds._viewRecords[idx]._rawidx;
        var idsArr = ids._rawRecords;
        var row_count = idsArr.length;

        for (var i = 0; i < row_count; i++)
        {
            if (idsArr[i]._rawidx == rawidx)
            {
                return rawidx;
            }
        }

        return -1;
    };

    _pCombo._getMaxTextSize = function (font)
    {
        var combolist = this.combolist;
        if (combolist)
        {
            return combolist._getMaxTextSize(font);
        }

        return 0;
    };

    _pCombo._getPopupType = function ()
    {
        return this.popuptype ? this.popuptype : "normal";
    };

    _pCombo._getPopuplistSize = function (ds)
    {
        var totalw = 0;
        var totalh = 0;
        var combolist = this.combolist;
        if (combolist)
        {
            var ds_cnt = ds.getRowCount();
            var size = combolist._getContentsSize();

            totalw = Math.max(this._adjust_width, size[0]);

            if (this.displayrowcount < 0)
            {
                totalh = this.itemheight * ds_cnt;
            }
            else
            {
                totalh = this.itemheight * this.displayrowcount;
            }
        }

        return { width: totalw, height: totalh };
    };

    _pCombo._isUsableDataset = function (ds)
    {
        if (!ds)
        {
            return false;
        }
        else
        {
            if (ds.getRowCount <= 0)
            {
                return false;
            }
            if (!this.datacolumn && !this.codecolumn)
            {
                return false;
            }
        }

        return true;
    };

    _pCombo._isPopupVisible = function ()
    {
        var popupcontrol = this._popupcontrol;
        if (popupcontrol)
        {
            return popupcontrol._is_popup();
        }

        return false;
    };

    _pCombo._clearFilteredDataset = function ()
    {
        if (this._filtereddataset)
        {
            this._filtereddataset.set_filterstr("");
        }
    };

    _pCombo._setAccessibilityInfoByHover = function (control)
    {
        if (this._isPopupVisible())
        {
            var combolist = this.combolist;
            return combolist._setAccessibilityInfoByHover(control);
        }
        else
        {
            return this._setAccessibilityNotifyEvent();
        }
    };

    _pCombo._clearAccessibilityInfoByHover = function ()
    {
        var combolist = this.combolist;
        if (combolist)
        {
            combolist._clearAccessibilityInfoByHover();
        }
    };

    delete _pCombo;

    //==============================================================================
    // nexacro._ComboEditControl
    //==============================================================================
    nexacro._ComboEditControl = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.Edit.call(this, id, position, left, top, width, height, right, bottom, parent, onlydisplay);
    };

    var _pComboEditControl = nexacro._createPrototype(nexacro.Edit, nexacro._ComboEditControl);
    nexacro._ComboEditControl.prototype = _pComboEditControl;
    _pComboEditControl._type_name = "EditControl";

    /* default properties */
    /* internal variable */
    _pComboEditControl._is_subcontrol = true;

    /* status */
    /* event list */
    /* accessibility */
    _pComboEditControl._accessibility_role = "combobox";

    //===============================================================
    // nexacro._ComboEditControl : Create & Update
    //===============================================================

    //===============================================================
    // nexacro._ComboEditControl : Override
    //===============================================================
    _pComboEditControl.on_get_style_accessibility_label = function ()
    {
        return "";
    };

    _pComboEditControl._getFromComponent = function (comp)
    {
        var parent = comp.parent;
        if (parent && parent._isPopupVisible())
        {
            return parent;
        }
        else
        {
            return nexacro.Component.prototype._getFromComponent.call(this, comp);
        }
    };

    //===============================================================
    // nexacro._ComboEditControl : Properties
    //===============================================================
    _pComboEditControl.set_value = function (v)
    {
        nexacro.Edit.prototype.set_value.call(this, v);

        this._setAccessibilityValue(this.text, false);
    };

    //===============================================================
    // nexacro._ComboEditControl : Events
    //===============================================================

    delete _pComboEditControl;

    //==============================================================================
    // nexacro._ComboButtonControl
    //==============================================================================
    nexacro._ComboButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pComboButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._ComboButtonControl);
    nexacro._ComboButtonControl.prototype = _pComboButtonControl;
    _pComboButtonControl._type_name = "ButtonControl";

    /* internal variable */
    _pComboButtonControl._is_subcontrol = true;
    _pComboButtonControl._is_focus_accept = false;

    //===============================================================
    // nexacro._ComboButtonControl : Override
    //===============================================================

    //===============================================================
    // nexacro._ComboEditControl : Events
    //===============================================================
    _pComboButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        // not used
        var combo = this.parent;
        if (combo)
        {
            var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
            if (bMobile)
            {
                nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            }
            else
            {
                combo.on_apply_custom_setfocus(evt_name);
            }
        }

        if (nexacro._enableaccessibility)
        {
            this._setAccessibilityStatFocus(evt_name);
        }
    };

    delete _pComboButtonControl;

    //==============================================================================
    // nexacro._ComboListControl
    //==============================================================================
    nexacro._ComboListControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.ListBox.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._overedItem = null;
    };

    var _pComboListControl = nexacro._createPrototype(nexacro.ListBox, nexacro._ComboListControl);
    nexacro._ComboListControl.prototype = _pComboListControl;
    _pComboListControl._type_name = "ListBoxControl";

    /* default properties */
    /* internal variable */
    _pComboListControl._is_subcontrol = true;
    _pComboListControl._overeditemindex = -1;

    /* status */
    /* event list */
    _pComboListControl._event_list = {
        "onitemclick": 1, "onitemdblclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "onmove": 1, "onsize": 1,
        "canitemchange": 1, "onitemchanged": 1,
        "oncloseup": 1,     
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,
        "onvscroll": 1, "onhscroll": 1
    };

    /* accessibility */
    //===============================================================
    // nexacro._ComboListControl : Create & Update
    //===============================================================

    //===============================================================
    // nexacro._ComboListControl : Override
    //===============================================================

    //===============================================================
    // nexacro._ComboListControl : Properties
    //===============================================================

    //===============================================================
    // nexacro._ComboListControl : Methods
    //===============================================================

    //===============================================================
    // nexacro._ComboListControl : Events
    //===============================================================
    _pComboListControl.on_vscroll = function (obj, e)
    {
        nexacro.ListBox.prototype.on_vscroll.call(this, obj, e);
    };

    _pComboListControl.on_hscroll = function (obj, e)
    {
        nexacro.ListBox.prototype.on_hscroll.call(this, obj, e);
    };

    _pComboListControl.on_notify_item_onlbuttondown = function (obj, e)
    {
        this._do_select(obj.index);
    };

    _pComboListControl.on_notify_item_onlbuttonup = function (obj, e)
    {
        var up_item = this._upitem;
        if (up_item)
        {

            if (nexacro._isTouchInteraction && nexacro._SupportTouch)
            {
                var win = this._getWindow();
                var touch_manager = win ? win._gesture_manager : null;
                if (touch_manager)
                {
                    if (touch_manager._is_ondrag)
                    {
                        return;
                    }
                }

                if (obj != up_item)
                {
                    this._do_select(up_item.index);
                    return;
                }
            }

            if (up_item && this._contains(up_item))
            {
                obj = up_item;
            }
            else
            {
                var rowobj = this._get_rowobj_status("selected", "userstatus");
                if (rowobj)
                {
                    this._do_deselect(rowobj.index);
                }
                return;
            }

            this.on_fire_onitemclick(obj, obj.index, obj.text, obj.value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty);
        }
    };

    _pComboListControl.on_notify_item_ontouchstart = function (obj, e)
    {
        this._do_select(obj.index);
    };

    _pComboListControl.on_notify_item_ontouchend = function (obj, e)
    {
        var info = (e.changedtouchinputinfos && e.changedtouchinputinfos[0]) ? e.changedtouchinputinfos[0] : null;
        if (info)
        {
            e.button = "lbutton";
            e.altkey = false;
            e.ctrlkey = false;
            e.shiftkey = false;
            e.screenx = info.screenx;
            e.screeny = info.screeny;
            e.canvasx = info.canvasx;
            e.canvasy = info.canvasy;
            e.clientx = info.clientx;
            e.clienty = info.clienty;
        }

        this.on_notify_item_onlbuttonup(obj, e);
    };

    _pComboListControl.on_notify_listbox_onkeydown = function (obj, e)
    {

    };

    _pComboListControl.on_notify_item_onmouseenter = function (obj, e)
    {

    };

    _pComboListControl.on_notify_item_onmouseleave = function (obj, e)
    {

    };

    _pComboListControl.on_notify_item_onmousemove = function (obj, e)
    {
        if (this._overeditemindex > -1)
        {
            var rowobj = this._get_rowobj_byrow(this._overeditemindex);
            if (rowobj)
            {
                rowobj._changeStatus("mouseover", false);
            }
        }
    };

    _pComboListControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var combo = this.parent;
        if (combo)
        {
            combo.on_apply_custom_setfocus(evt_name);
        }
    };

    _pComboListControl.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };

    _pComboListControl.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
    };
    
    _pComboListControl.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
    };

    _pComboListControl.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
    };

    _pComboListControl.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
    };

    _pComboListControl.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
    };

    _pComboListControl.on_fire_sys_ontouchcancel = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {

    };

    _pComboListControl.on_fire_oncloseup = function (obj)
    {
        var rowobj = this._get_rowobj_status("mouseover", "status");
        if (rowobj)
        {
            rowobj._changeStatus("mouseover", false);
        }

        if (this.oncloseup && this.oncloseup._has_handlers)
        {
            return this.oncloseup._fireEvent(this);
        }

        return false;
    };

    //===============================================================
    // nexacro._ComboListControl : Logical part
    //===============================================================
    _pComboListControl._create_item = function (id, position, left, top, width, height, right, bottom, parent)
    {
        return new nexacro._ComboListItemControl(id, position, left, top, width, height, right, bottom, parent);
    };

    _pComboListControl._create_row = function (nRow, left, top, right, bottom)
    {
        var ds = this._innerdataset;
        var dataCol = this.datacolumn ? this.datacolumn : this._datacolumn;
        var codeCol = this.codecolumn ? this.codecolumn : this._codecolumn;
        var txt = ds.getColumn(nRow, dataCol);
        var val = ds.getColumn(nRow, codeCol);

        var item = this._create_item("item_" + nRow, "absolute", left, top, right - left, bottom - top, null, null, this);
        item.set_value(val);
        item.set_text(txt);
        item.set_index(nRow);
        item.set_selected(false);
        item.set_readonly(this.readonly);

        if (nexacro._enableaccessibility)
        {
            this._setItemAccessibility(item);
        }

        item._setEventHandler("onlbuttondown", this.on_notify_item_onlbuttondown, this);
        item._setEventHandler("onlbuttonup", this.on_notify_item_onlbuttonup, this);
        item._setEventHandler("ontouchstart", this.on_notify_item_ontouchstart, this);
        item._setEventHandler("ontouchend", this.on_notify_item_ontouchend, this);
        item._setEventHandler("onmouseenter", this.on_notify_item_onmouseenter, this);
        item._setEventHandler("onmouseleave", this.on_notify_item_onmouseleave, this);
        item._setEventHandler("onmousemove", this.on_notify_item_onmousemove, this);

        item.createComponent();

        if (!this._is_created)
        {
            this._listitems[this._listitems.length] = item;
        }

        if (this.index == nRow)
        {
            item.set_selected(true);
        }

        return item;
    };

    _pComboListControl._reset_item = function (currowidx, rowidx)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var preidx = this.index;

            var currVScrollTopPos = control_elem.scroll_top == undefined ? 0 : control_elem.scroll_top;
            var vpos, nextTopPos, nextBottom;
            var itemHeight = this._get_rowheight();
            var rowcount = this._get_rowcount();
            var visible_end = this._get_last_visible_row(true) - 1;

            if (rowidx >= rowcount)
            {
                return;
            }   

            nextTopPos = (rowidx < 0 ? 0 : rowidx) * itemHeight;
            nextBottom = nextTopPos + itemHeight;

            if ((preidx != rowidx) && (nextBottom >= this._getClientHeight() + currVScrollTopPos) && (this.parent._downkey == true))
            {
                vpos = currVScrollTopPos + itemHeight;
            }
            else if (nextTopPos < currVScrollTopPos)
            {
                vpos = nextTopPos;
            }

            if (vpos >= 0)
            {
                this.vscrollbar.set_pos(vpos);
            }

            var currowobj = this._get_rowobj_byrow(currowidx);
            var rowobj = this._get_rowobj_byrow(rowidx);

            if (currowobj)
            {
                currowobj._changeStatus("mouseover", false);
            }
            if (rowobj)
            {
                rowobj._changeStatus("mouseover", true);
            }
        }
    };

    _pComboListControl._refreshScroll = function (rowidx, direction)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var preidx = this.index;

            var currVScrollTopPos = control_elem.scroll_top == undefined ? 0 : control_elem.scroll_top;
            var vpos, nextTopPos, nextBottom;
            var itemHeight = this._get_rowheight();
            var rowcount = this._get_rowcount();
            var visible_end = this._get_last_visible_row(true) - 1;

            if (rowidx >= rowcount)
            {
                return;
            }

            nextTopPos = (rowidx < 0 ? 0 : rowidx) * itemHeight;
            nextBottom = nextTopPos + itemHeight;

            if ((preidx != rowidx) && (nextBottom >= this._getClientHeight() + currVScrollTopPos) && direction === 0)
            {
                vpos = currVScrollTopPos + itemHeight;
            }
            else if (nextTopPos < currVScrollTopPos)
            {
                vpos = nextTopPos;
            }

            if (this.vscrollbar && vpos >= 0)
            {
                this.vscrollbar.set_pos(vpos);
            }
        }
    };

    _pComboListControl._change_status_item_from_key = function (curidx, nextidx)
    {
        var currowobj = this._get_rowobj_byrow(curidx);
        var rowobj = this._get_rowobj_byrow(nextidx);

        if (currowobj)
        {
            currowobj._changeStatus("mouseover", false);
        }
        if (rowobj)
        {
            rowobj._changeStatus("mouseover", true);
            this._overeditemindex = rowobj.index;
        }
    };

    _pComboListControl._setAccessibilityNotifyEvent = function (direction)
    {
        if (this._is_accessibility_changeIdx)
        {
            this._is_accessibility_changeIdx = false;
            return this.parent._setAccessibilityNotifyEvent(direction);
        }
        else
        {
            return nexacro.ListBox.prototype._setAccessibilityNotifyEvent.call(this, direction);
        }
    };

    //===============================================================
    // nexacro._ComboListControl : Util Function
    //===============================================================
    _pComboListControl._getContentsSize = function ()
    {
        return [this._contents_maxwidth, this._contents_maxheight];
    };

    _pComboListControl._changeIndex = function (v)
    {
        if (this.index != v)
        {
            var dataset = this._innerdataset;
            var postindex = parseInt(v, 10) | 0;

            if (dataset && (this.codecolumn || this.datacolumn))
            {
                var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
                var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

                var posttext = datavalue == undefined ? "" : datavalue;
                var postvalue = codevalue;

                this._accessibility_index = this.index = postindex;
                this.text = posttext;
                this.value = postvalue;

                this._selectinfo.obj = null;
                this._selectinfo.index = postindex;
                this._selectinfo.text = posttext;
                this._selectinfo.value = postvalue;

                return true;
            }
        }

        return false;
    };

    _pComboListControl._get_rowobj_status = function (status, flag)
    {
        var buffer_pages = this._buffer_pages;
        if (buffer_pages)
        {
            var rowobjs, rowobj;
            for (var i = 0, n = buffer_pages.length ; i < n ; i++)
            {
                rowobjs = buffer_pages[i];
                if (rowobjs)
                {
                    for (var j = 0, jlen = rowobjs.length ; j < jlen ; j++)
                    {
                        rowobj = rowobjs[j];
                        if (rowobj &&
                            ((flag == "status" && rowobj._status == status) || (flag == "userstatus" && rowobj._userstatus == status)))
                        {
                            return rowobj;
                        }
                    }
                }
            }
        }

        return null;
    };

    _pComboListControl._get_all_rowobj_status = function (status, flag)
    {
        var ret = [];
        var buffer_pages = this._buffer_pages;
        if (buffer_pages)
        {
            var rowobjs, rowobj;
            for (var i = 0, n = buffer_pages.length ; i < n ; i++)
            {
                rowobjs = buffer_pages[i];
                if (rowobjs)
                {
                    for (var j = 0, jlen = rowobjs.length ; j < jlen ; j++)
                    {
                        rowobj = rowobjs[j];
                        if (rowobj &&
                            ((flag == "status" && rowobj._status == status) || (flag == "userstatus" && rowobj._userstatus == status)))
                        {
                            ret.push(rowobj);
                        }
                    }
                }
            }
        }

        return ret;
    };

    delete _pComboListControl;

    //==============================================================================
    // nexacro._ComboListItemControl
    //==============================================================================
    nexacro._ComboListItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro._ListBoxItemControl.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pComboListItemControl = nexacro._createPrototype(nexacro._ListBoxItemControl, nexacro._ComboListItemControl);
    nexacro._ComboListItemControl.prototype = _pComboListItemControl;

    /* default properties */
    /* internal variable */
    /* status */
    /* event list */
    /* accessibility */
    //===============================================================
    // nexacro._ComboListItemControl : Create & Update
    //===============================================================

    //===============================================================
    // nexacro._ComboListItemControl : Override
    //===============================================================

    //===============================================================
    // nexacro._ComboListItemControl : Properties
    //===============================================================

    //===============================================================
    // nexacro._ComboListItemControl : Methods
    //===============================================================

    //===============================================================
    // nexacro._ComboListItemControl : Events
    //===============================================================
    _pComboListItemControl.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        var list = this.parent;
        if (list)
        {
            var window = this._getWindow();
            var comp = window.findComponent(from_elem);

            list._upitem = comp;
        }
        return nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);
    };

    _pComboListItemControl.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        var list = this.parent;
        if (list)
        {
            var window = this._getWindow();
            var comp = window.findComponent(touchinfos[0].target);
            if (comp instanceof nexacro._ComboListItemControl)
            {
                list._upitem = comp;
            }
        }
        return nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
    };

    //===============================================================
    // nexacro._ComboListItemControl : Logical part
    //===============================================================

    //===============================================================
    // nexacro._ComboListItemControl : Util Function
    //===============================================================

    delete _pComboListItemControl;

    //==============================================================================
    // nexacro._ComboPopupControl
    //==============================================================================
    nexacro._ComboPopupControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.PopupControl.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pComboPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._ComboPopupControl);
    nexacro._ComboPopupControl.prototype = _pComboPopupControl;
    _pComboPopupControl._type_name = "popupCombo";

    /* internal variable */
    _pComboPopupControl._is_subcontrol = true;
    //_pComboPopupControl._track_capture = false;

    //===============================================================
    // nexacro._ComboPopupControl : Override
    //===============================================================
    _pComboPopupControl._closePopup = function ()
    {
        if (nexacro._enableaccessibility)
        {
            this.parent._want_arrows = false;
        }

        nexacro.PopupControl.prototype._closePopup.call(this);
    };

    //===============================================================
    // nexacro._ComboPopupControl : Properties
    //===============================================================

    //===============================================================
    // nexacro._ComboPopupControl : Logical part
    //===============================================================
    _pComboPopupControl._popupAuto = function (totalw, totalh)
    {
        var jsonval = this._getScalePosition(totalw, totalh);
        var scale = jsonval.scale;
        var left = jsonval.left;
        var top = jsonval.top;
        var width = jsonval.width;
        var height = jsonval.height;

        this._setZoom(scale);
        this._popupBy(this.parent, left, top, width, (height / scale));
    };

    _pComboPopupControl._popupCenterAuto = function (totalw, totalh)
    {
        var jsonval = this._getScalePosition(totalw, totalh);
        var scale = jsonval.scale;
        var left = jsonval.left;
        var top = jsonval.top;
        var width = jsonval.width;
        var height = jsonval.height;

        this._setZoom(scale);

        var rootframe = this._getOwnerFrame();
        if (!rootframe)
        {
            return;
        }

        rootframe = rootframe._getWindow() ? rootframe._getWindow().frame : null;
        if (!rootframe)
        {
            return;
        }

        var pos = nexacro._getElementPositionInFrame(rootframe.getElement());
        var l = ((rootframe.width / 2) - (width / 2));
        var t = ((rootframe.height / 2) - (height / 2));

        t = t < 0 ? 0 : t;

        this._popupBy(rootframe, (l / scale), t, width, (height / scale));
    };

    //===============================================================
    // nexacro._ComboPopupControl : Util Function
    //===============================================================
    _pComboPopupControl._getMainFrame = function ()
    {
        var pThis = this;
        while (pThis && pThis instanceof nexacro.MainFrame)
        {
            pThis = pThis.parent;
        }

        return pThis;
    };

    _pComboPopupControl._getScalePosition = function (totalw, totalh)
    {
        var parent = this.parent;
        var combolist = this._attached_comp;
        if (!combolist)
        {
            return;
        }

        var rootframe = this._getOwnerFrame();
        if (!rootframe)
        {
            return;
        }

        rootframe = rootframe._getWindow() ? rootframe._getWindow().frame : null;
        if (!rootframe)
        {
            return;
        }

        var scale = this._getCumulativeZoomFactor() / 100.0;
        var combo_ctrl_elem_pos = this._getElementPosition();
        var mainframe_ctrl_elem_pos = nexacro._getElementPositionInFrame(rootframe.getElement());
        var mainframe_ctrl_elem_screen_pos = nexacro._getElementScreenPosition(rootframe.getElement());

        var combolist_width = totalw;
        var combolist_height = totalh * scale;
        var combo_width = parent._adjust_width;
        var combo_height = parent._adjust_height * scale;
        var _left, _top, _width, _height;
        var body_width, body_height;
        var pre_height = totalh;
        var vscroll_width, text_width, max_width;

        body_width = mainframe_ctrl_elem_pos.x + rootframe._adjust_width;
        body_height = mainframe_ctrl_elem_pos.y + rootframe._adjust_height;

        var screen_avail_height = nexacro._getScreenAvailHeight();

        _left = 0;
        _top = combo_height;
        _width = combolist_width;
        _height = combolist_height;

        var below_space_height = 0;
        if (screen_avail_height > body_height && mainframe_ctrl_elem_screen_pos.y + body_height > screen_avail_height) // browser under screen
        {
            below_space_height = screen_avail_height - mainframe_ctrl_elem_screen_pos.y - (combo_ctrl_elem_pos.y + combo_height);
        }
        else
        {
            below_space_height = body_height - (combo_ctrl_elem_pos.y + combo_height);
        }
        var upper_space_height = combo_ctrl_elem_pos.y;

        var list_pt = list_pb = list_bt = list_bb = 0;
        var list_item_h = parent.itemheight * scale;

        var list_p = combolist._getCSSStyleValue("padding", combolist._status, combolist._userstatus);
        if (list_p)
        {
            list_pt = list_p.top * scale;
            list_pb = list_p.bottom * scale;
        }
        var list_b = combolist._getCSSStyleValue("border", combolist._status, combolist._userstatus);
        if (list_b)
        {
            list_bt = list_b._getBorderTopWidth() * scale;
            list_bb = list_b._getBorderTopWidth() * scale;
        }

        var list_pd_bd = list_pt + list_pb + list_bt + list_bb;
        var displayrowcount = parent.displayrowcount;
        var rowcnt = 0;
        var need_minimum_height = 0;
        var ds = parent._selectDataset();
        if (ds)
        {
            rowcnt = ds.getRowCount();
        }

        if (displayrowcount == -1)
        {
            need_minimum_height = (rowcnt < 3 ? rowcnt : 3) * list_item_h + list_pd_bd; // spec - (listitem * 3) size is minimum height in case : displayrowcount == -1
            combolist_height = (rowcnt * list_item_h + list_pd_bd) * scale; // combolist total height

            if (below_space_height > need_minimum_height) // enough below space 
            {
                if (below_space_height > combolist_height)
                {
                    _height = combolist_height;
                }
                else
                {
                    _height = below_space_height;
                }
            }
            else // not enough below space
            {
                if (upper_space_height > need_minimum_height)// enough upper space
                {
                    if (upper_space_height > combolist_height)
                    {
                        _top = -combolist_height;
                        _height = combolist_height;
                    }
                    else
                    {
                        _top = -upper_space_height;
                        _height = upper_space_height;
                    }
                }
                else
                {
                    if (below_space_height > upper_space_height)
                    {
                        _height = below_space_height;
                    }
                    else
                    {
                        _top = -upper_space_height;
                        _height = upper_space_height;
                    }
                }
            }
        }
        else
        {
            rowcnt = rowcnt > displayrowcount ? displayrowcount : rowcnt;
            need_minimum_height = rowcnt * list_item_h + list_pd_bd;
            combolist_height = (rowcnt * list_item_h + list_pd_bd) * scale; // combolist total height

            if (below_space_height > need_minimum_height) // enough below space 
            {
                _height = need_minimum_height;
            }
            else // not enough below space
            {
                if (upper_space_height > need_minimum_height)// enough upper space
                {
                    _top = -need_minimum_height;
                    _height = need_minimum_height;
                }
                else // not enough below space and upper space
                {
                    if (below_space_height > upper_space_height)
                    {
                        _height = below_space_height;
                    }
                    else
                    {
                        _top = -upper_space_height;
                        _height = upper_space_height;
                    }
                }
            }
        }
        var font = this._getCurrentStyleInheritValue("font");
        text_width = this.parent._getMaxTextSize(font);

        if (combolist.vscrollbar)
        {
            vscroll_width = combolist.vscrollbar.width;
            max_width = text_width + vscroll_width;

            if ((combo_width < max_width) && (_height < pre_height))
            {
                _width += vscroll_width;
            }
        }

        if (combo_ctrl_elem_pos.x < mainframe_ctrl_elem_pos.x)
        {
            var gap = mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x;
            _left += gap;
        }
        else if (combo_ctrl_elem_pos.x + combolist_width > mainframe_ctrl_elem_pos.x + body_width)
        {
            var gap = (combo_ctrl_elem_pos.x + combolist_width) - (mainframe_ctrl_elem_pos.x + body_width);
            _left -= gap;

            if (combolist.vscrollbar)
            {
                _left -= vscroll_width;
            }

            if (_left < (mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x))
            {
                _left = mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x;
            }
        }

        return { left: _left, top: _top, width: _width, height: _height, scale: scale };
    };

    _pComboPopupControl._getElementPosition = function ()
    {
        var combo = this.parent;
        if (combo)
        {
            return nexacro._getElementPositionInFrame(combo.getElement());
        }
        
        return {};
    };

    _pComboPopupControl._setZoom = function (scale)
    {
        var elem = this.getElement();
        if (elem.setElementZoom)
        {
            elem.setElementZoom(scale * 100);
        }
        else if (nexacro.ScrollableControlElement.prototype.setElementZoom)
        {
            nexacro.ScrollableControlElement.prototype.setElementZoom.call(elem, scale * 100);
        }
    };

    delete _pComboPopupControl;
}
