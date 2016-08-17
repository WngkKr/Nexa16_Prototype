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

if (!nexacro.Calendar)
{
    //==============================================================================
    // nexacro.CalendarCloseUpEventInfo
    //============================================================================== 
    nexacro.CalendarCloseUpEventInfo = function (obj, id, pretext, posttext, prevalue, postvalue, isselect)
    {
        this.id = this.eventid = id || "oncloseup";
        this.fromobject = this.fromreferenceobject = obj;

        this.pretext = pretext;
        this.posttext = posttext;
        this.prevalue = prevalue;
        this.postvalue = postvalue;
    };
    var _pCalendarCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarCloseUpEventInfo);
    nexacro.CalendarCloseUpEventInfo.prototype = _pCalendarCloseUpEventInfo;
    _pCalendarCloseUpEventInfo._type_name = "CalendarCloseUpEventInfo";

    delete _pCalendarCloseUpEventInfo;
    _pCalendarCloseUpEventInfo = null;

    //==============================================================================
    // nexacro.CalendarDayClickEventInfo
    //============================================================================== 
    nexacro.CalendarDayClickEventInfo = function (obj, id, date)
    {
        this.id = this.eventid = id || "ondayclick";
        this.fromobject = this.fromreferenceobject = obj;

        this.date = date;
    };
    var _pCalendarDayClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarDayClickEventInfo);
    nexacro.CalendarDayClickEventInfo.prototype = _pCalendarDayClickEventInfo;
    _pCalendarDayClickEventInfo._type_name = "CalendarDayClickEventInfo";

    delete _pCalendarDayClickEventInfo;
    _pCalendarDayClickEventInfo = null;

    //==============================================================================
    // nexacro.CalendarSpinEventInfo
    //==============================================================================
    nexacro.CalendarSpinEventInfo = function (obj, id, beforeText, afterText, beforeValue, afterValue, isUp, fromobject, fromreferenceobject)
    {
        nexacro.Event.call(this, obj, id || "oncalendarspin");
        this.id = this.eventid = id || "oncalendarspin";

        this.fromobject = fromobject || obj;
        this.fromreferenceobject = fromreferenceobject || obj;

        this.pretext = beforeText;
        this.posttext = afterText;
        this.prevalue = beforeValue;
        this.postvalue = afterValue;
        this.up = isUp;
    };
    var _pCalendarSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CalendarSpinEventInfo);
    nexacro.CalendarSpinEventInfo.prototype = _pCalendarSpinEventInfo;
    _pCalendarSpinEventInfo._type_name = "CalendarSpinEventInfo";

    delete _pCalendarSpinEventInfo;
    _pCalendarSpinEventInfo = null;

    //==============================================================================
    // nexacro.Calendar 
    //==============================================================================
    nexacro.Calendar = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._masktypeobj = new nexacro._EditMaskTypeDate;
        this._onlydisplay = onlydisplay;
    };

    var _pCalendar = nexacro._createPrototype(nexacro.Component, nexacro.Calendar);
    nexacro.Calendar.prototype = _pCalendar;
    _pCalendar._type_name = "Calendar";

    /* control */
    _pCalendar.calendaredit = null;
    _pCalendar.dropbutton = null;
    _pCalendar.datepicker = null;
    _pCalendar._popupcontrol = null;
    _pCalendar.spindownbutton = null;
    _pCalendar.spinupbutton = null;

    /* default properties */
    _pCalendar.value = undefined;
    _pCalendar.displaynulltext = "";
    _pCalendar.readonly = false;
    _pCalendar.autoselect = false;
    _pCalendar.autoskip = false;
    _pCalendar.type = "normal";
    _pCalendar.popuptype = "normal";
    _pCalendar.text = "";
    _pCalendar.usecontextmenu = true;
    _pCalendar.locale = "";

    _pCalendar.innerdataset = null;
    _pCalendar.backgroundcolumn = "";
    _pCalendar.bordercolumn = "";
    _pCalendar.datecolumn = "";
    _pCalendar.textcolorcolumn = "";

    _pCalendar.buttonsize = undefined;
    _pCalendar.headheight = undefined;
    _pCalendar.daysize = undefined;
    _pCalendar.popupsize = "200 220";

    _pCalendar.dateformat = "yyyy-MM-dd ddd";
    _pCalendar.editformat = "yyyy-MM-dd";
    _pCalendar.headformat = "yyyy.MM";
    _pCalendar.weekformat = "S M T W T F S";

    _pCalendar.usetrailingday = false;
    _pCalendar.showmonthspin = false;
    _pCalendar.showyearspin = false;

    /* internal variable */
    _pCalendar._masktypeobj = null;
    _pCalendar._innerdataset = null;

    _pCalendar._locale = "";
    _pCalendar._type = "normal";
    _pCalendar._buttonsize = -1;
    _pCalendar._systemformat = "yyyy-MM-dd";
    _pCalendar._weekformat = "S M T W T F S";
    _pCalendar._default_value = undefined;
    _pCalendar._default_text = "";
    _pCalendar._default_type = "";

    _pCalendar._onlydisplay = false;

    /* status */
    _pCalendar._is_locale_control = true;
    _pCalendar._use_readonly_status = true;
    
    /* event list */
    _pCalendar._event_list = {
        "oneditclick": 1, "ondayclick": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "onmove": 1, "onsize": 1,
        "canchange": 1, "onchanged": 1, "oninput": 1,
        "oncontextmenu": 1,
        "ondropdown": 1, "oncloseup": 1,
        "onspin": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* accessibility */
    _pCalendar._accessibility_role = "calendar";

    nexacro.Calendar.EndDayNormal = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    nexacro.Calendar.EndDayLeap = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    //===============================================================
    // nexacro.pCalendar : Create & Update
    //===============================================================
    _pCalendar.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var type = this._type;

            switch (type)
            {
                case "normal":
                    this._createCalendaredit();
                    this._createDropbutton();
                    break;
                case "spin":
                    this._createCalendaredit();
                    this._createSpinbutton();
                    break;
                case "monthonly":
                    this._createDatePicker();
                    break;
                case "system":
                    this._createCalendaredit();
            }
        }
    };

    _pCalendar.on_created_contents = function (win)
    {
        this.on_apply_innerdataset();
        this.on_apply_editformat();
        this.on_apply_dateformat();
        this.on_apply_locale(this._getLocale());

        if (this.expr)
        {
            this.on_apply_expr();
        }
        else
        {
            this.on_apply_value();
        }

        this._recalcLayout();

        switch (this._type)
        {
            case "spin":
                this._setEventHandlerToCalendarEdit();
                this._setEventHandlerToSpinButton();

                this.calendaredit.on_created(win);
                this.spinupbutton.on_created(win);
                this.spindownbutton.on_created(win);
                break;
            case "monthonly":
                this._setEventHandlerToDatePicker();

                this.datepicker.on_created(win);
                if (nexacro._enableaccessibility)
                {
                    this._want_arrows = true;
                }
                break;
            case "system":
                if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4)
                {
                    var control_elem = this.getElement();
                    if (control_elem)
                    {
                        control_elem.setElementAccessibilityHidden(false);
                    }
                }

                this._setEventHandlerToCalendarEdit();

                this.calendaredit._on_apply_inputtype();
                this.calendaredit.on_created(win);
                this._setAccessibilityActiveDescendant(this.calendaredit);
                break;
            case "normal":
            default:
                this._setEventHandlerToCalendarEdit();
                this._setEventHandlerToDropButton();

                this.calendaredit.on_created(win);
                this.dropbutton.on_created(win);
                this._setAccessibilityActiveDescendant(this.calendaredit);
                break;
        }

        this._default_value = this.value;
        this._default_text = this.text;
    };

    _pCalendar.on_create_contents_command = function ()
    {
        this.on_apply_innerdataset();
        this.on_apply_editformat();
        this.on_apply_dateformat();
        this.on_apply_locale(this._getLocale());

        if (this.expr)
        {
            this.on_apply_expr();
        }
        else
        {
            this.on_apply_value();
        }

        this._recalcLayout();

        switch (this._type)
        {
            case "normal":
                this._setEventHandlerToCalendarEdit();
                this._setEventHandlerToDropButton();
                break;
            case "spin":
                this._setEventHandlerToCalendarEdit();
                this._setEventHandlerToSpinButton();
                break;
            case "monthonly":
                this._setEventHandlerToDatePicker();
                break;
            case "system":
                this._setEventHandlerToCalendarEdit();
        }

        var str = "";
        if (this.calendaredit)
        {
            this.calendaredit._on_apply_inputtype();

            str += this.calendaredit.createCommand();
        }
        if (this.dropbutton)
        {
            str += this.dropbutton.createCommand();
        }
        if (this.spindownbutton)
        {
            str += this.spindownbutton.createCommand();
        }
        if (this.spinupbutton)
        {
            str += this.spinupbutton.createCommand();
        }
        if (this.datepicker)
        {
            str += this.datepicker.createCommand();
        }

        return str;
    };

    _pCalendar.on_attach_contents_handle = function (win)
    {
        if (this.calendaredit)
        {
            this.calendaredit.attachHandle(win);
        }
        if (this.dropbutton)
        {
            this.dropbutton.attachHandle(win);
        }
        if (this.spindownbutton)
        {
            this.spindownbutton.attachHandle(win);
        }
        if (this.spinupbutton)
        {
            this.spinupbutton.attachHandle(win);
        }
        if (this.datepicker)
        {
            this.datepicker.attachHandle(win);
        }

        this._default_value = this.value;
        this._default_text = this.text;
    };

    _pCalendar.on_destroy_contents = function ()
    {
        this._destroyControl();

        if (this._innerdataset)
        {
            this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_rowsetchanged, this);
            this._innerdataset = null;
        }
    };

    _pCalendar.on_change_containerPos = function (left, top)
    {

    };

    _pCalendar.on_change_containerRect = function (width, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro.Calendar : Override
    //===============================================================
    _pCalendar.on_apply_custom_setfocus = function (evt_name)
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit._on_focus(true, evt_name);
        }
    };

    _pCalendar.on_apply_prop_enable = function (v)
    {
        if (this.calendaredit)
        {
            this.calendaredit._setEnable(v);
        }
        if (this.dropbutton)
        {
            this.dropbutton._setEnable(v);
        }
        if (this.spinupbutton)
        {
            this.spinupbutton._setEnable(v);
        }
        if (this.spindownbutton)
        {
            this.spindownbutton._setEnable(v);
        }
        if (this.datepicker)
        {
            this.datepicker._setEnable(v);
        }
    };

    _pCalendar.on_init_bindSource = function (columnid, propid, ds)
    {
        if (propid == "value")
        {
            this._setValue(undefined);
        }
    };

    _pCalendar.on_change_bindSource = function (propid, ds, row, col, index)
    {
        if (propid == "value")
        {
            var v = ds.getColumn(row, col);
            if (v != this.value)
            {
                this._setValue(v);
            }
        }
    };

    _pCalendar.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pCalendar._getDragData = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.getSelectedText();
        }
    };

    _pCalendar._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var _want_arrows = this._want_arrows;
        this._is_first_focus = false;
        return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: _want_arrows };
    };

    //TODO : Accessibility
    _pCalendar.on_get_style_accessibility_label = function ()
    {
        if (this.type == "monthonly")
        {
            return this.text ? this.text : this._getCurrentDate();
        }

        return "";
    };

    _pCalendar._on_getAccessibilityAdditionalLabel = function ()
    {
        //var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
        //if (accessibility)
        //{
        //    var edit = this.calendaredit;
        //    if (edit)
        //    {
        //        return edit._edit_base_api._on_getAccessibilityAdditionalLabel();
        //    }
        //}
        return "";
    };

    _pCalendar._getAccessibilityReadLabel = function (bwholeread)
    {
        //var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
        //if (bwholeread && this.calendaredit._input_element && this._status != "focus")
        //{
        //    if (!this.calendaredit._input_element._wantAccessibilityAdditionalLabel
        //        || !this.calendaredit._input_element._wantAccessibilityAdditionalLabel())
        //    {
        //        _readlabel = this.text + " " + _readlabel;
        //    }
        //}
        //return _readlabel;
    };

    _pCalendar._setAccessibilityStatFocus = function (evt_name)
    {
        //var calendaredit = this.calendaredit;
        //if (calendaredit && calendaredit._input_element)
        //{
        //    var role = this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo));
        //    if (this._getDescLevel() == "none")
        //    {
        //        role = "none";
        //    }
        //    calendaredit._input_element.setElementAccessibilityRole(role);
        //}
        //return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
    };

    _pCalendar._getAccessibilityRole = function (accessibility)
    {
        //var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
        //if (nexacro._accessibilitytype == 4 && this._getPopupType() == "system")
        //{
        //    role = "none";
        //}
        //return role;
    };

    //===============================================================
    // nexacro.Calendar : Properties
    //===============================================================
    _pCalendar.set_text = function (v)
    {

    };

    _pCalendar.on_apply_text = function (v)
    {
        var expr = this.expr;
        if (expr)
        {
            if (expr.substring(0, 4) == "Date")
            {
                v = new nexacro.Date(v).toString();
            }

            this.set_value(v);
        }
    };

    _pCalendar.set_value = function (v)
    {
        if (v && ((typeof v) == "object") && !(v instanceof nexacro.Date))
        {
            return;
        }

        v = v ? nexacro._toString(v) : v;
        if (v !== this.value)
        {
            if (this.applyto_bindSource("value", v))
            {
                this._setValue(v);
            }
        }
    };

    _pCalendar.on_apply_value = function ()
    {
        var value = this.value;
        value = nexacro._isNull(value) ? value : value.trim();
        var text = this.text;

        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            this.text = maskobj.applyMask(value);

            var calendaredit = this.calendaredit;
            if (calendaredit)
            {
                calendaredit._setValue(value);
            }

            var datepicker = this.datepicker;
            if (datepicker)
            {
                datepicker._setValue(maskobj.getDatePickerValue());
            }
        }
    };

    _pCalendar.set_displaynulltext = function (v)
    {
        var isNull = nexacro._isNull(v);
        if (isNull)
        {
            v = "";
        }
        else
        {
            v = nexacro._toString(v).replace(/&quot;/g, "\"");
        }

        if (v != this.displaynulltext)
        {
            this.displaynulltext = v;
            this.on_apply_displaynulltext();
        }
    };

    _pCalendar.on_apply_displaynulltext = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit.set_displaynulltext(this.displaynulltext);
        }
    };

    _pCalendar.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pCalendar.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);

        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit.set_readonly(v);
        }

        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker.set_readonly(v);
        }
    };

    _pCalendar.set_autoselect = function (v)
    {
        if (v != this.autoselect)
        {
            this.autoselect = v;
            this.on_apply_autoselect();
        }
    };

    _pCalendar.on_apply_autoselect = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit.set_autoselect(this.autoselect);
        }
    };

    _pCalendar.set_autoskip = function (v)
    {
        if (v != this.autoskip)
        {
            this.autoskip = v;
            this.on_apply_autoskip();
        }
    };

    _pCalendar.on_apply_autoskip = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit.set_autoskip(this.autoskip);
        }
    };

    _pCalendar.set_type = function (v)
    {
        if (v != this.type)
        {
            if (v == "normal" || v == "spin" || v == "monthonly")
            {
                this._default_type = this.type;
                this.type = v;
            }
            else
            {
                return;
            }

            this.on_apply_type();
        }
    };

    _pCalendar.on_apply_type = function ()
    {
        var is_change = true;
        var client_width = this._getClientWidth();
        var normal_height = Math.round(client_width / 5);
        if (this._default_type != "monthonly" || this.type == "monthonly")
        {
            is_change = false;
        }

        if (this._masktypeobj.getInputMode() == "date")
        {
            this._type = "system";
        }
        else
        {
            this._type = this.type;
        }

        var control_elem = this.getElement();
        if (control_elem)
        {
            this._destroyControl();

            switch (this._type)
            {
                case "normal":
                    this._createNormaltypeControl();

                    if (is_change)
                        this.resize(client_width, normal_height);
                    else
                        this._recalcLayout();
                    break;
                case "spin":
                    this._createSpintypeControl();

                    if (is_change)
                        this.resize(client_width, normal_height);
                    else
                        this._recalcLayout();
                    break;
                case "monthonly":
                    this._createMonthlytypeControl();

                    var popupsize = this._getPopupSizeArr();
                    this.resize(popupsize.width, popupsize.height);
                    break;
                case "system":
                    //if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4)
                    //{
                    //    control_elem.setElementAccessibilityHidden(false);
                    //}
                    this._createSystemtypeControl();
            }

            //if (nexacro._enableaccessibility && this.calendaredit && this.calendaredit._input_element)
            //{
            //    var input_elem = this.calendaredit._input_element;
            //    input_elem._setElementInputRole();
            //    input_elem._setElementInputLabel();
            //}
        }
    };

    _pCalendar.set_popuptype = function (v)
    {
        if (v != this.popuptype)
        {
            this.popuptype = v;
            this.on_apply_popuptype();
        }
    };

    _pCalendar.on_apply_popuptype = function ()
    {
        var popuptype = this.popuptype;

        var type = this._type;
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            var mode = "number";
            if (popuptype == "system" && type != "monthonly")
            {
                // android & iOS
                var bMobile = ((nexacro._isMobile && nexacro._isMobile()) || (nexacro._isHybrid && nexacro._isHybrid()) || (!nexacro._isDesktop() && nexacro._OS == "Android" && nexacro._Browser == "Runtime"));
                if (bMobile)
                {
                    mode = "date";
                }
            }

            maskobj.setInputMode(mode);

            this.on_apply_type();
        }
    };

    _pCalendar.set_locale = function (v)
    {
        if (v != this.locale)
        {
            this.locale = v;
            this._locale = v;
            this.on_apply_locale(v);
        }
    };

    _pCalendar.on_apply_locale = function (v)
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            maskobj.setLocale(v);
        }

        this.on_apply_weekformat();
        this.on_apply_value();
    };

    _pCalendar.set_usecontextmenu = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.usecontextmenu)
        {
            this.usecontextmenu = v;
            this.on_apply_usecontextmenu();
        }
    };

    _pCalendar.on_apply_usecontextmenu = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit.set_usecontextmenu(this.usecontextmenu);
        }
    };

    _pCalendar.set_innerdataset = function (v)
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

    _pCalendar.on_apply_innerdataset = function ()
    {
        var datepicker = this.datepicker;
        var innerdataset = this._innerdataset;
        if (innerdataset)
        {
            innerdataset._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            innerdataset._setEventHandler("onrowsetchanged", this._callback_rowsetchanged, this);

            if (datepicker)
            {
                datepicker._refreshDay();
            }
        }
    };

    _pCalendar.set_backgroundcolumn = function (v)
    {
        if (v != this.backgroundcolumn)
        {
            this.backgroundcolumn = v;
            this.on_apply_backgroundcolumn();
        }
    };

    _pCalendar.on_apply_backgroundcolumn = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._refreshDay();
        }
    };

    _pCalendar.set_bordercolumn = function (v)
    {
        if (v != this.bordercolumn)
        {
            this.bordercolumn = v;
            this.on_apply_bordercolumn();
        }
    };

    _pCalendar.on_apply_bordercolumn = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._refreshDay();
        }
    };

    _pCalendar.set_datecolumn = function (v)
    {
        if (v != this.datecolumn)
        {
            this.datecolumn = v;
            this.on_apply_datecolumn();
        }
    };

    _pCalendar.on_apply_datecolumn = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._refreshDay();
        }
    };

    _pCalendar.set_textcolorcolumn = function (v)
    {
        if (v != this.textcolorcolumn)
        {
            this.textcolorcolumn = v;
            this.on_apply_textcolorcolumn();
        }
    };

    _pCalendar.on_apply_textcolorcolumn = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._refreshDay();
        }
    };

    _pCalendar.set_buttonsize = function (v)
    {
        if (v != this.buttonsize)
        {
            this.buttonsize = v;
            this._buttonsize = nexacro._isNull(v) ? -1 : (parseInt(v) | 0);
            this.on_apply_buttonsize();
        }
    };

    _pCalendar.on_apply_buttonsize = function ()
    {
        this._recalcLayout();
    };

    _pCalendar.set_headheight = function (v)
    {
        v = parseInt(v);
        if (v != this.headheight)
        {
            this.headheight = v;
            this.on_apply_headheight();
        }
    };

    _pCalendar.on_apply_headheight = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_headheight();
        }
    };

    _pCalendar.set_daysize = function (v)
    {
        if (v != this.daysize)
        {
            this.daysize = v;
            this.on_apply_daysize();
        }
    };

    _pCalendar.on_apply_daysize = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker.set_daysize(this.daysize);
        }
    };

    _pCalendar.set_popupsize = function (v)
    {
        if (v != this.popupsize)
        {
            this.popupsize = v;
            this.on_apply_popupsize();
        }
    };

    _pCalendar.on_apply_popupsize = function ()
    {

    };

    _pCalendar.set_dateformat = function (v)
    {
        if (v != this.dateformat)
        {
            this.dateformat = v;
            this.on_apply_dateformat();
            this.on_apply_value();
        }
    };

    _pCalendar.on_apply_dateformat = function ()
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            var dateformat = (this._type == "system") ? this._systemformat : this.dateformat;
            maskobj.setDateMask(dateformat);
        }
    };

    _pCalendar.set_editformat = function (v)
    {
        if (v != this.editformat)
        {
            this.editformat = v;
            this.on_apply_editformat();
            this._setValue(this.value);
        }
    };

    _pCalendar.on_apply_editformat = function ()
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            var editformat = (this._type == "system") ? this._systemformat : this.editformat;
            maskobj.setEditMask(editformat);
        }
    };

    _pCalendar.set_headformat = function (v)
    {
        if (v != this.headformat)
        {
            this.headformat = v;
            this.on_apply_headformat();
        }
    };

    _pCalendar.on_apply_headformat = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_headformat();
        }
    };

    _pCalendar.set_weekformat = function (v)
    {
        if (v != this.weekformat)
        {
            this.weekformat = v;
            this._weekformat = null;
            this.on_apply_weekformat();
        }
    };

    _pCalendar.on_apply_weekformat = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_weekformat();
        }
    };

    _pCalendar.set_usetrailingday = function (v)
    {
        if (v != this.usetrailingday)
        {
            this.usetrailingday = v;
            this.on_apply_usetrailingday();
        }
    };

    _pCalendar.on_apply_usetrailingday = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_usetrailingday();
        }
    };

    _pCalendar.set_showmonthspin = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.showmonthspin)
        {
            this.showmonthspin = v;
            this.on_apply_showmonthspin();
        }
    };

    _pCalendar.on_apply_showmonthspin = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_showmonthspin();
        }
    };

    _pCalendar.set_showyearspin = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.showyearspin)
        {
            this.showyearspin = v;
            this.on_apply_showyearspin();
        }
    };

    _pCalendar.on_apply_showyearspin = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._on_apply_showyearspin();
        }
    };

    _pCalendar.on_apply_accessibility = function (accessibility)
    {
        nexacro.Component.prototype.on_apply_accessibility.call(this, accessibility);
        if (this.calendaredit)
        {
            this.calendaredit.on_apply_accessibility(accessibility);
        }
    };

    _pCalendar.set_visible = function (v)
    {
        nexacro.Component.prototype.set_visible.call(this, v);

        if (!this.visible && this._isPopupVisible())
        {
            this._closePopup();
        }
    };

    //===============================================================
    // nexacro.Calendar : Methods
    //===============================================================
    _pCalendar.dropdown = function ()
    {
        if (!this.enable || this.readonly || !this.visible)
        {
            return false;
        }

        this._setFocus(false);

        this._showPopup();
        this._setDefaultCaret();

        if (nexacro._enableaccessibility)
        {
            this._want_arrows = true;
        }
    };

    _pCalendar.isDropdown = function ()
    {
        return this._isPopupVisible();
    };

    _pCalendar.getCaretPos = function ()
    {
        if (this.readonly)
        {
            return -1;
        }

        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.getCaretPos();
        }

        return -1;
    };

    _pCalendar.setCaretPos = function (v)
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.setCaretPos(v);
        }
    };

    _pCalendar.getSelect = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.getSelect();
        }

        return [0, 0];
    };

    _pCalendar.setSelect = function (begin, end)
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.setSelect(begin, end);
        }
        return false;
    };

    _pCalendar.getSelectedText = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            return calendaredit.getSelectedText();
        }

        return "";
    };

    _pCalendar.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pCalendar.setInnerDataset = function (obj)
    {
        if (!obj)
        {
            this._innerdataset = null;
            this.innerdataset = "";
            this.on_apply_innerdataset();
        }
        else if (obj instanceof nexacro.Dataset)
        {
            this._innerdataset = obj;
            this.innerdataset = obj.id;
            this.on_apply_innerdataset();
        }
    };

    _pCalendar.getYear = function ()
    {
        var ret = 1970;
        if (this.value)
        {
            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                return maskobj._dateObj.getFullYear();
            }
        }
        return ret;
    };

    _pCalendar.getMonth = function ()
    {
        var ret = 1;
        if (this.value)
        {
            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                return maskobj._dateObj.getMonth() + 1;
            }
        }
        return ret;
    };

    _pCalendar.getDay = function ()
    {
        var ret = 1;
        if (this.value)
        {
            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                return maskobj._dateObj.getDate();
            }
        }
        return ret;
    };

    _pCalendar.getDayOfWeek = function ()
    {
        var ret = 4;
        if (this.value)
        {
            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                return maskobj._dateObj.getDay();
            }
        }
        return ret;
    };

    _pCalendar.updateToDataset = function ()
    {
        return this.applyto_bindSource("value", this.value);
    };

    //===============================================================
    // nexacro.Calendar : Events
    //===============================================================
    _pCalendar._on_value_change = function (prevalue, postvalue)
    {
        var ret = true;
        var pretext = this._getEventInfoText(prevalue);
        var posttext = this._getEventInfoText(postvalue);

        if (!this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue) ||
            !this.applyto_bindSource("value", postvalue))
        {
            ret = false;
        }

        if (!ret)
        {
            this._setValue(prevalue);

            if (this.autoskip && this._isPopupVisible())
            {
                this._closePopup();
            }
            return false;
        }
        
        this._setValue(postvalue);

        this.on_fire_onchanged(this, pretext, prevalue, posttext, postvalue);

        if (this._isPopupVisible())
        {
            this._closePopup();
        }

        this._default_value = postvalue;
        this._default_text = posttext;

        return true;
    };

    _pCalendar._on_keydown_value_change = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            var pre_value = this.value;
            var cur_value = calendaredit.value;

            if (pre_value != cur_value)
            {
                this._on_value_change(pre_value, cur_value);
            }
        }
    };

    _pCalendar._callback_onvaluechanged = function (obj, e)
    {
        this.on_apply_backgroundcolumn();
        this.on_apply_bordercolumn();
        this.on_apply_datecolumn();
        this.on_apply_textcolorcolumn();
    };

    _pCalendar._callback_rowsetchanged = function (obj, e)
    {
        this.on_apply_backgroundcolumn();
        this.on_apply_bordercolumn();
        this.on_apply_datecolumn();
        this.on_apply_textcolorcolumn();
    };

    _pCalendar.on_notify_edit_oneditclick = function (obj, e)
    {
        if (this._type == "system")
        {
            var control_elem = this.getElement();
            if (control_elem)
            {
                nexacro._openSystemCalendar(this, this.value);
            }
            return true;
        }

        this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject);
    };

    _pCalendar.on_notify_edit_onlbuttondown = function (obj, e)
    {
        if (this.readonly)
        {
            return false;
        }

        if (this._isPopupVisible())
        {
            this._closePopup();
        }
    };

    _pCalendar.on_notify_edit_onlbuttonup = function (obj, e)
    {
        //
    };

    _pCalendar.on_notify_edit_onkeydown = function (obj, e)
    {
        var keycode = e.keycode;
        var calendaredit = this.calendaredit;
        var datepicker = this.datepicker;

        switch (this.type)
        {
            case "normal":
                if (keycode == nexacro.Event.KEY_ESC)
                {
                    if (this._isPopupVisible())
                    {
                        this._closePopup();
                    }
                    this._setDefaultCaret();
                }
                else if (keycode == nexacro.Event.KEY_ENTER)
                {
                    if (this._isPopupVisible())
                    {
                        datepicker.on_fire_ondayclick(datepicker._value);
                    }
                    else
                    {
                        this._on_keydown_value_change();
                    }
                    this._setDefaultCaret();
                }
                else if (e.altkey && keycode == nexacro.Event.KEY_DOWN)
                {
                    if (!this._isPopupVisible())
                    {
                        this._showPopup();
                        this._setDefaultCaret();
                    }
                }
                else
                {
                    if (this._isPopupVisible())
                    {
                        if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN)
                        {
                            datepicker.on_notify_body_onkeydown(obj, e);
                        }
                    }
                }
                break;
            case "spin":
                if (keycode == nexacro.Event.KEY_ENTER)
                {
                    this._on_keydown_value_change();
                    this._setDefaultCaret();
                }
                else if (keycode == nexacro.Event.KEY_UP)
                {
                    if (!nexacro._enableaccessibility || e.ctrlKey)
                    {
                        this.on_notify_spin_onspinup(obj, e);
                    }
                }
                else if (keycode == nexacro.Event.KEY_DOWN)
                {
                    if (!nexacro._enableaccessibility || e.ctrlKey)
                    {
                        this.on_notify_spin_onspindown(obj, e);
                    }
                }

                break;
            case "monthonly":
                if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN)
                {
                    //datepicker.on_keydown_default_action(keycode, e.altkey, e.ctrlkey, e.shiftkey, refer_comp);
                    //datepicker._refreshSpindate();
                    //datepicker.on_fire_ondayclick(datepicker);
                }
                break;
            default:
                break;
        }

        if (keycode >= nexacro.Event.KEY_LEFT && keycode <= nexacro.Event.KEY_DOWN)
        {
            if (this._isPopupVisible())
            {
                calendaredit._input_element.stopSysEvent();
            }
            else
            {
                if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN)
                {
                    calendaredit._input_element.stopSysEvent();
                }
            }
        }

        return false;
    };

    _pCalendar.on_notify_edit_oninput = function (obj, e)
    {
        var maskobj = this._masktypeobj;
        var datepicker = this.datepicker;
        if (datepicker && this._isPopupVisible())
        {
            datepicker._setValue(maskobj.getDatePickerValue());
        }

        this.on_fire_oninput();
    };

    _pCalendar.on_notify_drop_onlbuttondown = function (obj, e)
    {
        if (this.readonly || !this.enable)
        {
            return false;
        }

        if (this._isPopupVisible())
        {
            this._closePopup();

            if (!this.autoselect)
            {
                this._setDefaultCaret();
            }
        }
        else
        {
            this._showPopup();
            this._setDefaultCaret();
        }

        return false;
    };

    _pCalendar.on_notify_drop_mobile_onclick = function (obj, e)
    {
        if (this.readonly || !this.enable)
        {
            return false;
        }

        if (this._isPopupVisible())
        {
            this._closePopup();
        }
        else
        {
            this._showPopup();
        }

        return false;
    };

    _pCalendar.on_notify_spin_onspinup = function (obj, e)
    {
        if (this.readonly)
        {
            return false;
        }

        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            var cur_text = "";

            var pre_text = this._default_text;
            var pre_value = this._default_value;

            var post_text = "";
            var post_value;

            var pos = this.getCaretPos();

            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                if (!maskobj.date)
                {
                    var currDate = this._getCurrentDate();
                    var year = nexacro._toString(currDate.year).padLeft(4, "0");
                    var month = nexacro._toString(currDate.month).padLeft(2, "0");
                    var day = nexacro._toString(currDate.day).padLeft(2, "0");
                    var type = maskobj.getEditFormatType();
                    switch (type)
                    {
                        case 0:
                            cur_val = year + month + day;
                            break;
                        case 1:
                            cur_val = "000000000";
                            break;
                        case 2:
                            cur_val = year + month + day + "000000000";
                    }

                    cur_text = maskobj.applyMask(cur_val);
                    this._setSpinValue(cur_val, cur_text, pos);
                }
                else
                {
                    cur_text = maskobj.applyMaskSpin(pos, 1);
                    cur_val = maskobj.removeMask();
                    cur_val = maskobj.changeNormalizeValue(cur_val);

                    pre_text = this._getEventInfoText(pre_value);
                    post_text = this._getEventInfoText(cur_val);

                    if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true))
                    {
                        cur_text = this._default_text;
                        cur_val = this._default_value;
                    }

                    maskobj.applyMask(cur_val);
                    this._setSpinValue(cur_val, cur_text, pos);
                }
            }
        }
    };

    _pCalendar.on_notify_spin_onspindown = function (obj, e)
    {
        if (this.readonly)
        {
            return false;
        }

        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            var cur_text = "";

            var pre_text = this._default_text;
            var pre_value = this._default_value;

            var post_text = "";
            var post_value;

            var pos = this.getCaretPos();

            var maskobj = this._masktypeobj;
            if (maskobj)
            {
                if (!maskobj.date)
                {
                    var currDate = this._getCurrentDate();
                    var year = nexacro._toString(currDate.year).padLeft(4, "0");
                    var month = nexacro._toString(currDate.month).padLeft(2, "0");
                    var day = nexacro._toString(currDate.day).padLeft(2, "0");
                    var type = maskobj.getEditFormatType();
                    switch (type)
                    {
                        case 0:
                            cur_val = year + month + day;
                            break;
                        case 1:
                            cur_val = "000000000";
                            break;
                        case 2:
                            cur_val = year + month + day + "000000000";
                    }

                    cur_text = maskobj.applyMask(cur_val);
                    this._setSpinValue(cur_val, cur_text, pos);
                }
                else
                {
                    cur_text = maskobj.applyMaskSpin(pos, -1);
                    cur_val = maskobj.removeMask();

                    pre_text = this._getEventInfoText(pre_value);
                    post_text = this._getEventInfoText(cur_val);

                    if (!this.on_fire_onspin(this, pre_text, pre_value, post_text, cur_val, true))
                    {
                        cur_text = this._default_text;
                        cur_val = this._default_value;
                    }

                    maskobj.applyMask(cur_val);
                    this._setSpinValue(cur_val, cur_text, pos);
                }
            }
        }
    };

    _pCalendar.on_notify_datepicker_ondayclick = function (obj, e)
    {
        var maskobj = this._masktypeobj;

        var from_comp = e.fromobject;
        var cur_date = from_comp._year + from_comp._month + from_comp.text.padLeft(2, "0");

        var h = maskobj._date[3] ? maskobj._date[3] : "";
        var m = maskobj._date[4] ? maskobj._date[4] : "";
        var s = maskobj._date[5] ? maskobj._date[5] : "";
        var ss = maskobj._date[6] ? maskobj._date[6] : "";

        var pre_value = this.value;
        var cur_value = maskobj.changeNormalizeValue(cur_date + h + m + s + ss);

        this.on_fire_ondayclick(cur_date);

        if (pre_value != cur_value)
        {
            this._on_value_change(pre_value, cur_value);
        }

        if (this.autoskip)
        {
            this._setFocusToNextComponent();
        }
        else
        {
            this._setDefaultCaret();
        }
    };

    _pCalendar.on_notify_datepicker_oncloseup = function (obj, e)
    {
        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
        }

        this._changeStatus("mouseover", false);
        this.calendaredit._changeStatus("mouseover", false);
        this.dropbutton._changeStatus("mouseover", false);

        this.on_fire_oncloseup(this, this._default_text, this._default_value, this.text, this.value);
    };

    _pCalendar.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        this._changeStatus("focused", true);

        if (!(refer_new_focus instanceof nexacro._CalendarEditControl))
        {
            var calendaredit = this.calendaredit;
            if (calendaredit)
            {
                calendaredit._on_focus(true, evt_name);

                if (!this.autoselect)
                {
                    this._setDefaultCaret();
                }
            }
        }
    };

    _pCalendar.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        var calendaredit = this.calendaredit;
        var datepicker = this.datepicker;

        if (this.type != "monthonly")
        {
            var pre_value = this.value;
            var cur_value = calendaredit.value;

            if (pre_value != cur_value)
            {
                this._on_value_change(pre_value, cur_value);
            }
        }
        else
        {
            if (datepicker)
            {
                datepicker._refreshSpindate();
            }

            this.on_apply_value();
        }
    };

    _pCalendar.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        nexacro.Component.prototype.on_fire_user_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

        return (this._popupcontrol && this._popupcontrol._is_popup()) ? true : false;
    };

    _pCalendar.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

        this._update_popupcontrol_position();

        return ret;
    };

    _pCalendar.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

        this._update_popupcontrol_position();

        return ret;
    };

    _pCalendar.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.visible && this._isEnable() && this.enableevent)
        {
            if (this.oneditclick && this.oneditclick._has_handlers)
            {
                var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
                return this.oneditclick._fireEvent(this, evt);
            }
        }

        return true;
    };

    _pCalendar.on_fire_ondayclick = function (postdate)
    {
        if (this.ondayclick && this.ondayclick._has_handlers)
        {
            var evt = new nexacro.CalendarDayClickEventInfo(this, "ondayclick", postdate);
            return this.ondayclick._fireEvent(this, evt);
        }

        return true;
    };

    _pCalendar.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
            return this.canchange._fireCheckEvent(this, evt);
        }

        return true;
    };

    _pCalendar.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.ChangedEventInfo(this, "onchanged", pretext, prevalue, posttext, postvalue);
            return this.onchanged._fireEvent(this, evt);
        }
    };

    _pCalendar.on_fire_oncloseup = function (obj, pretext, prevalue, posttext, postvalue)
    {
        if (this.oncloseup && this.oncloseup._has_handlers)
        {
            var evt = new nexacro.CalendarCloseUpEventInfo(this, "oncloseup", pretext, posttext, prevalue, postvalue);
            return this.oncloseup._fireEvent(this, evt);
        }

        return false;
    };

    _pCalendar.on_fire_ondropdown = function (obj)
    {
        if (this.ondropdown && this.ondropdown._has_handlers)
        {
            var evt = new nexacro.Event(this, "ondropdown");
            evt.fromreferenceobject = this.dropbutton;
            return this.ondropdown._fireCheckEvent(this, evt);
        }

        return true;
    };

    _pCalendar.on_fire_oninput = function ()
    {
        if (this.oninput && this.oninput._has_handlers)
        {
            var evt = new nexacro.InputEventInfo(this, "oninput");
            return this.oninput._fireEvent(this, evt);
        }

        return true;
    };

    _pCalendar.on_fire_onspin = function (obj, pretext, prevalue, posttext, postvalue, isUp)
    {
        if (this.onspin && this.onspin._has_handlers)
        {
            var evt = new nexacro.CalendarSpinEventInfo(this, "onspin", pretext, posttext, prevalue, postvalue, isUp);
            return this.onspin._fireCheckEvent(this, evt);
        }

        return true;
    };

    //===============================================================
    // nexacro.Calendar : Logical Part
    //===============================================================
    _pCalendar._createCalendaredit = function ()
    {
        var calendaredit = this.calendaredit;
        if (!calendaredit)
        {
            calendaredit = this.calendaredit = new nexacro._CalendarEditControl("calendaredit", "absolute", 0, 0, 0, 0, null, null, this, this._onlydisplay);
            calendaredit.set_displaynulltext(this.displaynulltext);
            calendaredit.set_readonly(this.readonly);
            calendaredit.set_autoselect(this.autoselect);
            calendaredit.set_autoskip(this.autoskip);

            calendaredit.createComponent(true);
        }
    };

    _pCalendar._createDropbutton = function ()
    {
        var dropbutton = this.dropbutton;
        if (!dropbutton)
        {
            dropbutton = this.dropbutton = new nexacro._CalendarDropButtonControl("dropbutton", "absolute", 0, 0, 0, 0, null, null, this);
            dropbutton.createComponent(true);
        }
    };

    _pCalendar._createSpinbutton = function ()
    {
        var spinupbutton = this.spinupbutton;
        if (!spinupbutton)
        {
            spinupbutton = this.spinupbutton = new nexacro._CalendarSpinButtonControl("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
            spinupbutton.createComponent(true);
        }
        var spindownbutton = this.spindownbutton;
        if (!spindownbutton)
        {
            spindownbutton = this.spindownbutton = new nexacro._CalendarSpinButtonControl("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);
            spindownbutton.createComponent(true);
        }
    };

    _pCalendar._createDatePicker = function ()
    {
        var datepicker = this.datepicker;
        if (!datepicker)
        {
            datepicker = this.datepicker = new nexacro.DatePickerControl("datepicker", "absolute", 0, 0, 0, 0, null, null, this);
            if (this.type == "monthonly")
            {
                datepicker._is_focus_accept = true;
            }
            else
            {
                datepicker._setPopupContains(true);
                datepicker._is_focus_accept = false;
            }

            datepicker.createComponent(true);
        }
    };

    _pCalendar._createPopupControl = function ()
    {
        var popupcontrol = this._popupcontrol;
        if (!popupcontrol)
        {
            popupcontrol = this._popupcontrol = new nexacro._CalendarPopupControl("calendarpopup", "absolute", 0, 0, 0, 0, null, null, this);
            popupcontrol.createComponent(true);
        }
    };

    _pCalendar._createNormaltypeControl = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._createCalendaredit();
            this._createDropbutton();
            this._createPopupControl();
            this._createDatePicker();
            this._setEventHandlerToCalendarEdit();
            this._setEventHandlerToDropButton();
            this._setEventHandlerToDatePicker();
            this._applyAllProps();

            if (this._is_created)
            {
                var calendaredit = this.calendaredit;
                var dropbutton = this.dropbutton;

                if (calendaredit)
                {
                    calendaredit.on_created();
                }

                if (dropbutton)
                {
                    dropbutton.on_created();
                }
            }
        }
    };

    _pCalendar._createSpintypeControl = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._createCalendaredit();
            this._createSpinbutton();
            this._setEventHandlerToCalendarEdit();
            this._setEventHandlerToSpinButton();
            this._applyAllProps();

            if (this._is_created)
            {
                var calendaredit = this.calendaredit;
                var spinupbutton = this.spinupbutton;
                var spindownbutton = this.spindownbutton;

                if (calendaredit)
                {
                    calendaredit.on_created();
                }
                if (spinupbutton)
                {
                    spinupbutton.on_created();
                }
                if (spindownbutton)
                {
                    spindownbutton.on_created();
                }
            }
        }
    };

    _pCalendar._createMonthlytypeControl = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._createDatePicker();
            this._setEventHandlerToDatePicker();
            this._applyDatePickerProps();

            if (this._is_created)
            {
                var datepicker = this.datepicker;
                if (datepicker)
                {
                    datepicker.on_created();
                }
            }
        }
    };

    _pCalendar._createSystemtypeControl = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._createCalendaredit();
            this._setEventHandlerToCalendarEdit();
            this._applyAllProps();

            if (this._is_created)
            {
                var calendaredit = this.calendaredit;

                if (calendaredit)
                {
                    calendaredit._on_apply_inputtype();

                    calendaredit.on_created();
                }
            }
        }
    };

    _pCalendar._createPopupDatePickerControl = function ()
    {
        this._createPopupControl();
        this._createDatePicker();

        var datepicker = this.datepicker;
        var popupcontrol = this._popupcontrol;
        if (!popupcontrol._is_created)
        {
            popupcontrol._attach(datepicker);
            popupcontrol.on_created();
        }
        if (!datepicker._is_created)
        {
            this._setEventHandlerToDatePicker();
            this._applyDatePickerProps();
            datepicker.on_created();
        }
    };

    _pCalendar._destroyControl = function ()
    {
        if (this.calendaredit)
        {
            this.calendaredit.destroy();
            this.calendaredit = null;
        }
        if (this.dropbutton)
        {
            this.dropbutton.destroy();
            this.dropbutton = null;
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
        if (this.datepicker)
        {
            this.datepicker.destroy();
            this.datepicker = null;
        }
        if (this._popupcontrol)
        {
            this._popupcontrol.destroy();
            this._popupcontrol = null;
        }
    };

    _pCalendar._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem && this._is_created_contents)
        {
            var calendaredit = this.calendaredit;
            var dropbutton = this.dropbutton;
            var spinupbutton = this.spinupbutton;
            var spindownbutton = this.spindownbutton;
            var datepicker = this.datepicker;

            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();
            var client_left = 0;

            var buttonsize = this._buttonsize;
            var buttonsize_h = client_height;
            var buttonsize_w;
            if (buttonsize < 0)
            {
                buttonsize_w = client_height;
            }
            else
            {
                buttonsize_w = buttonsize;
            }

            switch (this._type)
            {
                case "normal":
                    var button_l = client_width - buttonsize_w;
                    var button_t = 0;
                    var button_w = buttonsize_w;
                    var button_h = buttonsize_h;

                    var edit_l = 0;
                    var edit_t = 0;
                    var edit_w = button_l;
                    var edit_h = client_height;

                    dropbutton.move(button_l, button_t, button_w, button_h, null, null);
                    calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);

                    calendaredit.set_visible(true);
                    dropbutton.set_visible(true);
                    break;
                case "spin":
                    var upbutton_l = client_width - buttonsize_w;
                    var upbutton_t = 0;
                    var upbutton_w = buttonsize_w;
                    var upbutton_h = buttonsize_h / 2;

                    var downbutton_l = client_width - buttonsize_w;
                    var downbutton_t = buttonsize_h / 2;
                    var downbutton_w = buttonsize_w;
                    var downbutton_h = buttonsize_h / 2;

                    var edit_l = 0;
                    var edit_t = 0;
                    var edit_w = upbutton_l;
                    var edit_h = client_height;

                    spinupbutton.move(upbutton_l, upbutton_t, upbutton_w, upbutton_h, null, null);
                    spindownbutton.move(downbutton_l, downbutton_t, downbutton_w, downbutton_h, null, null);
                    calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);

                    calendaredit.set_visible(true);
                    spinupbutton.set_visible(true);
                    spindownbutton.set_visible(true);
                    break;
                case "monthonly":
                    this._applyDatePickerProps();
                    datepicker.move(0, 0, client_width, client_height, null, null);
                    datepicker.set_visible(true);
                    break;
                case "system":
                    var edit_l = 0;
                    var edit_t = 0;
                    var edit_w = client_width;
                    var edit_h = client_height;

                    this.calendaredit.move(client_left, edit_t, edit_w, edit_h, null, null);
                    this.calendaredit.set_visible(true);
                    break;
            }
        }
    };

    _pCalendar._showPopup = function ()
    {
        if (this.type != "normal")
        {
            return;
        }

        var _window = this._getWindow();
        var control_elem = this.getElement();
        if (control_elem)
        {
            var ret = this.on_fire_ondropdown(this);

            if (this.popuptype == "none" || this._type == "system")
            {
                return;
            }

            if (ret)
            {
                this._createPopupDatePickerControl();

                var popupsize = this._getPopupSizeArr();

                var pos = this._getElementPosition();
                var scale = this._getCumulativeZoomFactor() / 100.0;

                var cal_winpos_left = pos.x;
                var cal_winpos_top = pos.y;
                var cal_height = this.getOffsetHeight() * scale;

                var popup_left = 0;
                var popup_top = cal_height;
                var popup_width = popupsize.width * scale;
                var popup_height = popupsize.height * scale;

                var popup_winpos_right = cal_winpos_left + popup_width;
                var popup_winpos_bottom = cal_winpos_top + cal_height + popup_height;

                var win_width = _window.clientWidth;
                var win_height = _window.clientHeight;
                var width_gap = popup_winpos_right - win_width;

                if (popup_winpos_right > win_width && cal_winpos_left > width_gap)
                {
                    popup_left = popup_left - width_gap;
                }

                if (cal_winpos_left < 0)
                {
                    popup_left = -cal_winpos_left;
                }

                if (cal_winpos_top > popup_height && popup_winpos_bottom > win_height)
                {
                    popup_top = -popup_height;
                }

                // 팝업도 동일 비율로 확대/축소
                var popupcontrol = this._popupcontrol;
                var popup_elem = popupcontrol.getElement();
                if (popup_elem.setElementZoom)
                {
                    popup_elem.setElementZoom(scale * 100);
                }

                if (this.popuptype == "center")
                {
                    var frame = _window.frame;
                    var frame_pos = nexacro._getElementPositionInFrame(frame.getElement());
                    var l = ((frame.width / 2) - (popup_width / 2));
                    var t = ((frame.height / 2) - (popup_height / 2));

                    t = t < 0 ? 0 : t;

                    popupcontrol._popup((l + frame_pos.x), (t + frame_pos.y), popup_width, popup_height);
                }
                else
                {
                    //popup_left = this._convertLeftForRtlLayout(popup_left, popup_width);

                    popupcontrol._popupBy(this, popup_left, popup_top, popup_width, popup_height);
                }

                if (_window && this._track_capture)
                {
                    _window._setCaptureLock(this, true, false);
                }
            }
        }
    };

    _pCalendar._applyZoomPopup = function ()
    {
        if (this._isPopupVisible())
        {
            this._showPopup();
        }
    };

    _pCalendar._closePopup = function ()
    {
        if (this._type == "system")
        {
            nexacro._closeSystemCalendar();
            return;
        }

        var popupcontrol = this._popupcontrol;
        if (popupcontrol)
        {
            popupcontrol._closePopup();
        }

        if (nexacro._enableaccessibility && this.type != "monthonly")
        {
            this._want_arrows = false;
        }
    };

    //===============================================================
    // nexacro.Calendar : Util Function
    //===============================================================
    _pCalendar._setValue = function (v)
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            v = maskobj.changeNormalizeValue(v);

            this.value = v;

            this.on_apply_value();
        }
    };

    _pCalendar._setSpinValue = function (value, text, pos)
    {
        this._default_value = value;
        this.text = this._default_text = text;

        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit._setSpinValue(text, pos);
        }
    };

    _pCalendar._setLocale = function (v)
    {
        if (!this.locale && v != this._locale)
        {
            this._locale = v;
            this.on_apply_locale(v);
            this.on_apply_value();
        }
    };

    _pCalendar._setInnerDatasetStr = function (str)
    {
        if (!str)
        {
            this._innerdataset = null;
            this.innerdataset = "";
        }
        else
        {
            str = str.replace("@", "");
            this._innerdataset = this._findDataset(str);
            this.innerdataset = str;
        }
    };

    _pCalendar._setDefaultCaret = function ()
    {
        var edit = this.calendaredit;
        if (edit)
        {
            if (this._type != "system")
            {
                this.setCaretPos(0);
            }
        }
    };

    _pCalendar._setFocusToNextComponent = function ()
    {
        var root_comp = this._getRootComponent(this);
        var next_comp = this._getForm().getNextComponent(root_comp, true);
        if (next_comp)
        {
            next_comp.setFocus();
        }
    };

    _pCalendar._setEventHandlerToCalendarEdit = function ()
    {
        var calendaredit = this.calendaredit;
        if (calendaredit)
        {
            calendaredit._setEventHandler("onkeydown", this.on_notify_edit_onkeydown, this);
            calendaredit._setEventHandler("onlbuttondown", this.on_notify_edit_onlbuttondown, this);
            calendaredit._setEventHandler("onlbuttonup", this.on_notify_edit_onlbuttonup, this);
            calendaredit._setEventHandler("oneditclick", this.on_notify_edit_oneditclick, this);
            calendaredit._setEventHandler("oninput", this.on_notify_edit_oninput, this);
        }
    };

    _pCalendar._setEventHandlerToDropButton = function ()
    {
        var dropbutton = this.dropbutton;
        var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);

        if (bMobile)
        {
            dropbutton._setEventHandler("onclick", this.on_notify_drop_mobile_onclick, this);
        }
        else
        {
            dropbutton._setEventHandler("onlbuttondown", this.on_notify_drop_onlbuttondown, this);
        }
    };

    _pCalendar._setEventHandlerToSpinButton = function ()
    {
        var spinupbutton = this.spinupbutton;
        var spindownbutton = this.spindownbutton;
        var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);

        //if (bMobile)
        //{
        //spinupbutton._setEventHandler("onlbuttondown", this.on_notify_mobile_onlbuttondown, this);
        //spinupbutton._setEventHandler("onclick", this.on_notify_spin_mobile_onspinup, this);

        //spindownbutton._setEventHandler("onlbuttondown", this.on_notify_mobile_onlbuttondown, this);
        //spindownbutton._setEventHandler("onclick", this.on_notify_spin_mobile_onspindown, this);
        //}
        //else
        //{
        spinupbutton._setEventHandler("onclick", this.on_notify_spin_onspinup, this);
        spindownbutton._setEventHandler("onclick", this.on_notify_spin_onspindown, this);
        //}
    };

    _pCalendar._setEventHandlerToDatePicker = function ()
    {
        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._setEventHandler("ondayclick", this.on_notify_datepicker_ondayclick, this);
            datepicker._setEventHandler("oncloseup", this.on_notify_datepicker_oncloseup, this);
        }
    };

    _pCalendar._getDateMaskObj = function ()
    {
        return this._masktypeobj;
    };

    _pCalendar._getFormatType = function ()
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            return maskobj.getEditFormatType();
        }

        return;
    };

    _pCalendar._getCurrentDate = function ()
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            return maskobj.getCurrentDate();
        }

        return;
    };

    _pCalendar._getEndDay = function (y, m)
    {
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            return maskobj.getEndDay(y, m);
        }

        return;
    };

    _pCalendar._getPopupSizeArr = function ()
    {
        var popupsize = this.popupsize;
        var arr = popupsize.split(/\s+/);

        var width = arr[0] ? arr[0] : 0;
        var height = arr[1] ? arr[1] : width;

        width = parseInt(width, 10);
        height = parseInt(height, 10);

        return { width: width, height: height };
    };

    _pCalendar._getElementPosition = function ()
    {
        return nexacro._getElementPositionInFrame(this.getElement());
    };

    _pCalendar._getEventInfoText = function (v)
    {
        var ret = "";
        var maskobj = this._masktypeobj;
        if (maskobj)
        {
            var cur_status = maskobj.getEditStatus();

            maskobj.setEditStatus(false);
            ret = maskobj.applyMask(v);
            maskobj.setEditStatus(cur_status);
        }

        return ret;
    };

    _pCalendar._isPopupVisible = function ()
    {
        var ret = false;
        if (this.type != "monthonly")
        {
            if (this._popupcontrol)
            {
                ret = this._popupcontrol.visible;
            }
        }
        return ret;
    };

    _pCalendar._applyAllProps = function ()
    {
        this.on_apply_editformat();
        this.on_apply_dateformat();
        this.on_apply_value();

        this.on_apply_innerdataset();
        this.on_apply_locale();
        this.on_apply_readonly();
    };

    _pCalendar._applyDatePickerProps = function ()
    {
        var maskobj = this._masktypeobj;

        var datepicker = this.datepicker;
        if (datepicker)
        {
            datepicker._setEnable(this.enable);
            datepicker.set_readonly(this.readonly);

            datepicker._setValue(maskobj.getDatePickerValue());

            //datepicker._refreshSpindate();
            //datepicker._refreshDay();
        }
    };

    //---------------------   old----------------------------------------------------------------

    _pCalendar._update_popupcontrol_position = function ()
    {
        var popupcontrol = this._popupcontrol;
        if (popupcontrol)
        {
            var popup_control_elem = popupcontrol._control_element;

            var pos = nexacro._getElementPositionInFrame(this._control_element);
            var cal_winpos_left = pos.x;
            var cal_winpos_top = pos.y;

            // TODO Element의 bottom 좌표를 바로 얻는 API로 바꾸는게 바람직 (현재 없음)
            var scale = this._getCumulativeZoomFactor() / 100.0;
            var left = cal_winpos_left;
            var top = cal_winpos_top + (this._adjust_height * scale);

            popup_control_elem.setElementPosition(left, top);
        }
    };

    delete _pCalendar;
    _pCalendar = null;

    //===============================================================
    // nexacro.CalendarDropButtonControl : Button
    //===============================================================
    nexacro._CalendarDropButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pCalendarDropButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._CalendarDropButtonControl);
    nexacro._CalendarDropButtonControl.prototype = _pCalendarDropButtonControl;
    _pCalendarDropButtonControl._type_name = "ButtonControl";
    _pCalendarDropButtonControl._is_subcontrol = true;

    //===============================================================
    // nexacro._CalendarDropButtonControl : Events
    //===============================================================
    _pCalendarDropButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var calendar = this.parent;
        if (calendar)
        {
            var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
            if (bMobile)
            {
                nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            }
            else
            {
                calendar.on_apply_custom_setfocus(evt_name);
            }
        }
    };

    delete _pCalendarDropButtonControl;

    //===============================================================
    // nexacro.CalendarSpinButtonControl : Button
    //===============================================================
    nexacro._CalendarSpinButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pCalendarSpinButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._CalendarSpinButtonControl);
    nexacro._CalendarSpinButtonControl.prototype = _pCalendarSpinButtonControl;
    _pCalendarSpinButtonControl._type_name = "ButtonControl";
    _pCalendarSpinButtonControl._is_subcontrol = true;

    //===============================================================
    // nexacro._CalendarSpinButtonControl : Events
    //===============================================================
    _pCalendarSpinButtonControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var calendar = this.parent;
        if (calendar)
        {
            var bMobile = (nexacro._isTouchInteraction && nexacro._SupportTouch);
            if (bMobile)
            {
                nexacro.Component.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            }
            else
            {
                calendar.on_apply_custom_setfocus(evt_name);
            }
        }
    };

    delete _pCalendarSpinButtonControl;

    //===============================================================
    // nexacro.CalendarEditControl : Edit
    //===============================================================
    nexacro._CalendarEditControl = function (id, position, left, top, width, height, right, bottom, parent, onlydisplay)
    {
        nexacro.MaskEdit.call(this, id, position, left, top, width, height, right, bottom, parent, onlydisplay);
    };

    var _pCalendarEditControl = nexacro._createPrototype(nexacro.MaskEdit, nexacro._CalendarEditControl);
    nexacro._CalendarEditControl.prototype = _pCalendarEditControl;
    _pCalendarEditControl._type_name = "MaskEditControl";
    _pCalendarEditControl._is_subcontrol = true;

    //===============================================================
    // nexacro._CalendarEditControl : Create & Update
    //===============================================================
    _pCalendarEditControl.on_created_contents = function (win)
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
            else
            {
                this._changeUserStatus("nulltext", false);
            }
        }
    };

    _pCalendarEditControl.on_create_contents_command = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            this.on_apply_value();

            return input_elem.createCommand();
        }

        return "";
    };

    //===============================================================
    // nexacro._CalendarEditControl : Properties
    //===============================================================

    //===============================================================
    // nexacro._CalendarEditControl : Events
    //===============================================================
    _pCalendarEditControl.on_keydown_default_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp)
    {
        if (this.readonly || !this._isEnable())
            return;

        var input_elem = this._input_element;
        if (input_elem)
        {
            if (keycode == nexacro.KeyCode_ImeInput)
            {
                input_elem.stopSysEvent();
            }

            if (keycode == nexacro.Event.KEY_BACKSPACE)
            {
                var pos = input_elem.getElementCaretPos();
                if (pos.end > 0 && pos.begin == pos.end)
                {
                    var maskobj = this._getMaskObj();
                    var input_value = input_elem.value;
                    if (maskobj && input_value)
                    {
                        var idx = pos.end - 1, ch;
                        while ((ch = input_value.charAt(idx)))
                        {
                            if (maskobj.isDeletableChar(ch, idx) || idx == 0)
                                break;
                            idx--;
                        }

                        maskobj._is_filled = false;

                        if (idx != (pos.end - 1))
                        {
                            input_elem.setElementSetSelect(idx + 1, idx + 1);
                        }
                    }
                }
            }
            else if (keycode == nexacro.Event.KEY_DEL)
            {
                var input_value = input_elem.value;
                var len = input_value.length;

                var pos = input_elem.getElementCaretPos();
                if (pos.end < len && pos.begin == pos.end && input_value)
                {
                    var maskobj = this._getMaskObj();
                    if (maskobj)
                    {
                        var idx = pos.end, ch;
                        while ((ch = input_value.charAt(idx)))
                        {
                            if (maskobj.isDeletableChar(ch, idx) || idx == len)
                                break;
                            idx++;
                        }

                        maskobj._is_filled = false;

                        if (idx != pos.end)
                        {
                            input_elem.setElementSetSelect(idx, idx);
                        }
                    }
                }
            }
        }
    };

    _pCalendarEditControl.on_beforekeyinput_basic_action = function (value, status, begin, end)
    {
        if (this.readonly || !this._isEnable())
        {
            return false;
        }

        var input_elem = this._input_element;
        if (input_elem)
        {
            var input_pos = 0;
            var input_text = value ? value : "";

            var maskobj = this._getMaskObj();
            if (maskobj)
            {
                if (!this._processed_keypress)
                {
                    begin = end - 1;
                    var input_char = value.substring(begin, 1);
                    if (input_char.length > 0)
                    {
                        var maskobj = this._getMaskObj();
                        var input_pos = maskobj.findNearEditablePos(begin, 1);
                        if (input_pos < 0 || maskobj.isFilterChar(input_char, input_pos))
                        {
                            input_elem.stopSysEvent();
                            this._on_autoskip();
                            return;
                        }

                        maskobj.keyPressed(input_char, input_pos);
                    }
                }

                if (maskobj.getCurrentText() != input_text)
                {
                    var inputtype = input_elem.inputtype;
                    if (inputtype == "date")
                    {
                        value = maskobj.removeMask(input_text.split(''));
                        maskobj.applyMask(value);
                    }
                    else
                    {
                        var result = maskobj.arrangeMask(input_text, begin, end);
                        if (result == null)
                        {
                            input_elem.replaceElementText("", begin, end);
                            input_elem.stopSysEvent();
                            return;
                        }

                        if (result.text != input_text)
                        {
                            input_pos = maskobj.findNearEditablePos(result.pos, 1);
                            input_elem.updateElementText(result.text, input_pos);
                        }
                    }
                }
            }
        }
    };

    _pCalendarEditControl.on_keyinput_basic_action = function ()
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

            var pos = input_elem.getElementCaretPos();
            var maskobj = this._getMaskObj();
            if (maskobj)
            {
                input_value = maskobj.removeMask(input_text.split(''));
                input_value = maskobj.changeNormalizeValue(input_value);
                maskobj.applyMask(input_value);
            }

            if (!input_value && !this._default_value)
            {
                this.value = this._default_value;
            }
            else
            {
                this.value = input_value;
            }
            this.text = input_text;

            var undostack = this._undostack;
            if (undostack)
            {
                this._undostack.push(input_text, pos ? pos.begin : 0, pos ? pos.end : 0);
            }
        }
    };

    //===============================================================
    // nexacro._CalendarEditControl : Logical Part
    //===============================================================
    _pCalendarEditControl.on_apply_value = function ()
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            var value = this.value;
            var text = this.text;

            var maskobj = this._getMaskObj();
            if (maskobj)
            {
                text = this.text = maskobj.applyMask(value);
            }

            if (!this._onlydisplay)
            {
                if (this._undostack)
                {
                    var pos = input_elem.getElementCaretPos();
                    this._undostack.push(text, (pos && pos != -1) ? pos.begin : 0, pos ? pos.end : 0);
                }

                if (!value && value !== "")
                {
                    input_elem.setElementDefaultValue(text);
                    input_elem.setElementValue(value);
                }
                else
                {
                    input_elem.setElementValue(text);
                }

                text = input_elem.getElementText();
            }
            else
            {
                if (!value && value !== "")
                {
                    input_elem.setElementText(text);
                }
                else
                {
                    input_elem.setElementText(text);
                }
            }
            if (this.text != text)
            {
                this.text = text;
            }

            this._default_value = this.value;
            this._default_text = this.text;
        }
    };

    //===============================================================
    // nexacro._CalendarEditControl : Util Function
    //===============================================================
    _pCalendarEditControl._setSpinValue = function (v, pos)
    {
        var input_elem = this._input_element;
        if (input_elem)
        {
            if (!this._onlydisplay)
                input_elem.updateElementText(v, pos);
        }
    };

    _pCalendarEditControl._getMaskObj = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar._masktypeobj;
        }
        return null;
    };

    _pCalendarEditControl._getEmptyText = function ()
    {
        var maskobj = this._getMaskObj();
        if (maskobj)
        {
            return maskobj.getEmptyText();
        }

        return "";
    };

    //===============================================================
    // nexacro.CalendarPopupControl : Popup
    //===============================================================
    nexacro._CalendarPopupControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.PopupControl.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pCalendarPopupControl = nexacro._createPrototype(nexacro.PopupControl, nexacro._CalendarPopupControl);
    nexacro._CalendarPopupControl.prototype = _pCalendarPopupControl;
    _pCalendarPopupControl._type_name = "popupCalendar";

    /* internal variable */
    _pCalendarPopupControl._is_subcontrol = true;
    //_pCalendarPopupControl._track_capture = false;

    //===============================================================
    // nexacro._CalendarPopupControl : Util Function
    //===============================================================
    _pCalendarPopupControl._getMainFrame = function ()
    {
        var pThis = this;
        while (pThis && pThis instanceof nexacro.MainFrame)
        {
            pThis = pThis.parent;
        }

        return pThis;
    };

    delete _pCalendarPopupControl;
}