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
if (!nexacro.DatePickerControl)
{
    //==============================================================================
    // nexacro.DatePickerControl
    //==============================================================================
    nexacro.DatePickerControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pDatePickerControl = nexacro._createPrototype(nexacro.Component, nexacro.DatePickerControl);
    nexacro.DatePickerControl.prototype = _pDatePickerControl;
    _pDatePickerControl._type_name = "DatePickerControl";
    _pDatePickerControl._is_subcontrol = true;

    /* control */
    _pDatePickerControl.head = null;
    _pDatePickerControl.body = null;

    /* default properties */
    _pDatePickerControl.daysize = "21 21";

    /* internal variable */
    _pDatePickerControl._selected_year = "";
    _pDatePickerControl._selected_month = "";
    _pDatePickerControl._selected_day = "";

    /* status */
    _pDatePickerControl._use_readonly_status = true;
    _pDatePickerControl._is_locale_control = true;

    /* event list */
    _pDatePickerControl._event_list = {
        "onclick": 1, "ondayclick": 1, "onspin": 1, "oncloseup": 1
    };

    /* accessibility */
    _pDatePickerControl._accessibility_role = "datepicker";
    _pDatePickerControl._has_accessibility_value = false; //datepicker open시 두번 읽는 문제

    //===============================================================
    // nexacro.DatePickerControl : Create & Update
    //===============================================================
    _pDatePickerControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var head = this.head = new nexacro._DatePickerHeadControl("head", "absolute", 0, 0, 0, 0, null, null, this);
            var body = this.body = new nexacro._DatePickerBodyControl("body", "absolute", 0, 0, 0, 0, null, null, this);

            head.createComponent(true);
            body.createComponent(true);
        }
    };

    _pDatePickerControl.on_created_contents = function (win)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var head = this.head;
            var body = this.body;

            head._setEventHandler("onclick", this.on_notify_head_onheadclick, this);
            head._setEventHandler("onspin", this.on_notify_head_onheadspin, this);
            body._setEventHandler("ondayclick", this.on_notify_body_ondayclick, this);
            body._setEventHandler("onkeydown", this.on_notify_body_onkeydown, this);

            head.on_created(win);
            body.on_created(win);

            this._recalcLayout();
        }
    };

    _pDatePickerControl.on_create_contents_command = function ()
    {
        var head = this.head;
        var body = this.body;

        var str = "";
        if (head)
        {
            str += head.createCommand();
        }
        if (body)
        {
            str += body.createCommand();
        }

        return str;
    };

    _pDatePickerControl.on_attach_contents_handle = function (win)
    {
        var head = this.head;
        var body = this.body;

        head._setEventHandler("onclick", this.on_notify_head_onheadclick, this);
        head._setEventHandler("onspin", this.on_notify_head_onheadspin, this);
        body._setEventHandler("ondayclick", this.on_notify_body_ondayclick, this);
        body._setEventHandler("onkeydown", this.on_notify_body_onkeydown, this);

        body.attachHandle(win);
        head.attachHandle(win);

        this._recalcLayout();

    };

    _pDatePickerControl.on_destroy_contents = function ()
    {
        if (this.head)
        {
            this.head.destroy();
            this.head = null;
        }
        if (this.body)
        {
            this.body.destroy();
            this.body = null;
        }
    };

    _pDatePickerControl.on_change_containerRect = function (width, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro.DatePickerControl : Override
    //===============================================================
    _pDatePickerControl.on_apply_prop_enable = function (v)
    {
        var head = this.head;
        var body = this.body;

        if (head)
        {
            head._setEnable(v);
        }
        if (body)
        {
            body._setEnable(v);
        }
    };

    //===============================================================
    // nexacro.DatePickerControl : Properties
    //===============================================================
    _pDatePickerControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pDatePickerControl.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);

        var head = this.head;
        if (head)
        {
            head.set_readonly(v);
        }

        var body = this.body;
        if (body)
        {
            body.set_readonly(v);
        }
    };

    _pDatePickerControl.set_daysize = function (v)
    {
        if (v != this.daysize)
        {
            this.daysize = v;
            this.on_apply_daysize(v);
        }
    };

    _pDatePickerControl.on_apply_daysize = function ()
    {
        var body = this.body;
        if (body)
        {
            body._recalcLayout();
        }
    };

    //===============================================================
    // nexacro.DatePickerControl : Events
    //===============================================================
    _pDatePickerControl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var control_name = refer_comp.name;
        if (control_name == "head" || control_name == "prevbutton" || control_name == "nextbutton" ||
            control_name == "body" || control_name == "weekband" || control_name.indexOf("weekitem") > -1 || control_name.indexOf("dayitem") > -1)
        {
            this._refreshSpindate();
        }
    };

    _pDatePickerControl.on_touchend_basic_action = function (touch_manager, touchinfos, changedtouchinfos, refer_comp)
    {
        var control_name = refer_comp.name;
        if (control_name == "head" || control_name == "prevbutton" || control_name == "nextbutton" ||
            control_name == "body" || control_name == "weekband" || control_name.indexOf("weekitem") > -1 || control_name.indexOf("dayitem") > -1)
        {
            this._refreshSpindate();
        }
    };

    _pDatePickerControl.on_notify_body_onkeydown = function (obj, e)
    {
        var head = this.head;
        var body = this.body;

        var keycode = e.keycode;
        var ctrlkey = e.ctrlkey;

        var year = parseInt(body._year, 10) | 0;
        var month = parseInt(body._month, 10) | 0;
        var day = parseInt(body._day, 10) | 0;
        var endday = this._getEndDay(year, month);

        var inc_month = false;
        var inc_day = false;
        var dec_month = false;
        var dec_day = false;

        switch (keycode)
        {
            case 37: // left arrow
                if (ctrlkey)
                {
                    dec_month = true;
                }
                else
                {
                    dec_day = true;
                }

                if (dec_day)
                {
                    day -= 1;
                    if (day <= 0)
                    {
                        dec_month = true;
                    }
                }

                if (dec_month)
                {
                    month -= 1;
                    if (month <= 0)
                    {
                        if (year <= 0)
                        {
                            year = 9999;
                        }
                        else
                        {
                            year -= 1;
                        }

                        month = 12;
                    }

                    if (!ctrlkey)
                    {
                        day += this._getEndDay(year, month);
                    }
                }
                break;
            case 38: // up arrow
                if (ctrlkey)
                {
                    year -= 1;
                }
                else
                {
                    day -= 7;
                    if (day <= 0)
                    {
                        if (month <= 1)
                        {
                            month = 12;

                            if (year <= 0)
                            {
                                year = 9999;
                            }
                            else
                            {
                                year -= 1;
                            }
                        }
                        else
                        {
                            month -= 1;
                        }

                        day += this._getEndDay(year, month);
                    }
                }
                break;
            case 39: // right arrow
                if (ctrlkey)
                {
                    inc_month = true;
                }
                else
                {
                    inc_day = true;
                }

                if (inc_day)
                {
                    day += 1;
                    if (day > endday)
                    {
                        inc_month = true;
                    }
                }

                if (inc_month)
                {
                    month += 1;
                    if (month > 12)
                    {
                        if (year >= 9999)
                        {
                            year = 0;
                        }
                        else
                        {
                            year += 1;
                        }

                        month = 1;
                    }

                    if (inc_day)
                    {
                        day -= endday;
                    }
                }
                break;
            case 40: // down arrow
                if (ctrlkey)
                {
                    year += 1;
                }
                else
                {
                    day += 7;
                    if (day > endday)
                    {
                        if (month >= 12)
                        {
                            month = 1;

                            if (year >= 9999)
                            {
                                year = 0;
                            }
                            else
                            {
                                year += 1;
                            }
                        }
                        else
                        {
                            month += 1;
                        }

                        day -= endday;
                    }
                }
                break;
        }

        year = nexacro._toString(year).padLeft(4, "0");
        month = nexacro._toString(month).padLeft(2, "0");
        day = nexacro._toString(day).padLeft(2, "0");

        this._setValue(year + month + day);
        if (!(obj instanceof nexacro._CalendarEditControl))
        {
            this.on_fire_ondayclick(obj);
        }
    };

    _pDatePickerControl.on_notify_head_onheadclick = function (obj, e)
    {
        if (!this.enable || this.readonly)
        {
            return false;
        }

        var head = this.head;
        var body = this.body;
        var bChange = false;

        if (head._year != body._year)
        {
            body._setYear(head._year);
            bChange = true;
        }
        if (head._month != body._month)
        {
            body._setMonth(head._month);
            bChange = true;
        }

        if (bChange)
        {
            body._refreshDay();
        }
    };

    _pDatePickerControl.on_notify_head_onheadspin = function (obj, e)
    {
        if (!this.enable || this.readonly == true)
        {
            return false;
        }

        var head = this.head;
        var body = this.body;
        var bChange = false;

        if (head._year != body._year)
        {
            body._setYear(head._year);
            bChange = true;
        }
        if (head._month != body._month)
        {
            body._setMonth(head._month);
            bChange = true;
        }

        if (bChange)
        {
            body._refreshDay();
        }
    };

    _pDatePickerControl.on_notify_body_ondayclick = function (obj, e)
    {
        this.on_fire_ondayclick(obj, e);
    };

    _pDatePickerControl.on_fire_oncloseup = function (obj)
    {
        if (this.oncloseup && this.oncloseup._has_handlers)
        {
            return this.oncloseup._fireEvent(this);
        }
        return false;
    };

    _pDatePickerControl.on_fire_ondayclick = function (obj, e)
    {
        if (this.ondayclick && this.ondayclick._has_handlers)
        {
            if (!e)
            {
                var item = this.body._getDayItem(this._selected_day);
                e = new nexacro.CalendarDayClickEventInfo(item, "ondayclick", this._value);
            }
            return this.ondayclick._fireEvent(this, e);
        }
        return false;
    };

    //===============================================================
    // nexacro.DatePickerControl : Logical Part
    //===============================================================

    //===============================================================
    // nexacro.DatePickerControl : Util Function
    //===============================================================
    _pDatePickerControl._setValue = function (v)
    {
        if (v != this._value)
        {
            this._value = v;
        }
        this._on_apply_value();
    };

    _pDatePickerControl._on_apply_value = function ()
    {
        var v = this._value;

        var year = v.substr(0, 4);
        var month = v.substr(4, 2);
        var day = v.substr(6, 2);

        this._selected_year = year;
        this._selected_month = month;
        this._selected_day = day;

        var head = this.head;
        if (head)
        {
            head._setYear(year);
            head._setMonth(month);
            head._recalcLayout();
        }

        var body = this.body;
        if (body)
        {
            body._setDate(year, month, day);
        }
    };

    _pDatePickerControl._on_apply_headheight = function ()
    {
        this._recalcLayout();
    };

    _pDatePickerControl._on_apply_headformat = function ()
    {
        var head = this.head;
        if (head)
        {
            head._on_apply_year();
            head._on_apply_month();
            head._recalcLayout();
        }
    };

    _pDatePickerControl._on_apply_weekformat = function ()
    {
        var body = this.body;
        if (body)
        {
            body._on_apply_weekformat();
        }
    };

    _pDatePickerControl._on_apply_usetrailingday = function ()
    {
        this._refreshDay();
    };

    _pDatePickerControl._on_apply_showmonthspin = function ()
    {
        this._refreshSpindate();
    };

    _pDatePickerControl._on_apply_showyearspin = function ()
    {
        this._refreshSpindate();
    };

    _pDatePickerControl._getInnerDataset = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.getInnerDataset();
        }

        return null;
    };

    _pDatePickerControl._getBackgroundcolumn = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.backgroundcolumn;
        }

        return null;
    };

    _pDatePickerControl._getBordercolumn = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.bordercolumn;
        }

        return null;
    };

    _pDatePickerControl._getDatecolumn = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.datecolumn;
        }

        return null;
    };

    _pDatePickerControl._getTextcolorcolumn = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.textcolorcolumn;
        }

        return null;
    };

    _pDatePickerControl._getHeadheight = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.headheight;
        }

        return null;
    };

    _pDatePickerControl._getDaysize = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.daysize;
        }

        return "";
    };

    _pDatePickerControl._getHeadformat = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.headformat;
        }

        return null;
    };

    _pDatePickerControl._getWeekformat = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            // inline weekformat > locale format > default wekkformat : 
            return calendar._weekformat ? null : calendar.weekformat;
        }

        return null;
    };

    _pDatePickerControl._getUsetrailingday = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.usetrailingday;
        }

        return false;
    };

    _pDatePickerControl._getShowmonthspin = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.showmonthspin;
        }

        return false;
    };

    _pDatePickerControl._getShowyearspin = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar.showyearspin;
        }

        return false;
    };

    _pDatePickerControl._getCurrentDate = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar._getCurrentDate();
        }

        return "";
    };

    _pDatePickerControl._getEndDay = function (year, month)
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar._getEndDay(year, month);
        }

        return "";
    };

    //===============================================================
    // nexacro.DatePickerControl : Logical Part
    //===============================================================
    _pDatePickerControl._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var headheight = this._getHeadheight();

            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();

            if (!headheight) headheight = client_height / 8;

            var body_l = 0;
            var body_t = 0 + headheight;
            var body_w = client_width;
            var body_h = client_height - headheight;

            var head_l = 0;
            var head_t = 0;
            var head_w = client_width;
            var head_h = headheight;

            this.body.move(body_l, body_t, body_w, body_h, null, null);
            this.head.move(head_l, head_t, head_w, head_h, null, null);
        }
    };

    _pDatePickerControl._refreshSpindate = function ()
    {
        var head = this.head;
        if (head)
        {
            head._refreshSpindate();
        }
    };

    _pDatePickerControl._refreshDay = function ()
    {
        var body = this.body;
        if (body)
        {
            body._refreshDay();
        }
    };

    delete _pDatePickerControl;

    //===============================================================
    // nexacro._DatePickerHeadControl
    //===============================================================
    nexacro._DatePickerHeadControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pDatePickerHeadControl = nexacro._createPrototype(nexacro.Component, nexacro._DatePickerHeadControl);
    nexacro._DatePickerHeadControl.prototype = _pDatePickerHeadControl;
    _pDatePickerHeadControl._type_name = "DatePickerHeadControl";
    _pDatePickerHeadControl._is_subcontrol = true;

    /* control */
    _pDatePickerHeadControl.prevbutton = null;
    _pDatePickerHeadControl.nextbutton = null;
    _pDatePickerHeadControl.yearstatic = null;
    _pDatePickerHeadControl.monthstatic = null;
    _pDatePickerHeadControl.yearspin = null;
    _pDatePickerHeadControl.monthspin = null;

    /* internal variable */
    _pDatePickerHeadControl._year = "";
    _pDatePickerHeadControl._month = "";

    /* status */
    _pDatePickerHeadControl._use_readonly_status = true;

    /* event list */
    _pDatePickerHeadControl._event_list = {
        "onclick": 1, "onspin": 1
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Create & Update
    //===============================================================
    _pDatePickerHeadControl.on_create_contents = function ()
    {
        var prevbutton = this.prevbutton = new nexacro.Button("prevbutton", "absolute", 0, 0, 0, 0, null, null, this);
        var nextbutton = this.nextbutton = new nexacro.Button("nextbutton", "absolute", 0, 0, 0, 0, null, null, this);
        var yearstatic = this.yearstatic = new nexacro.Static("yearstatic", "absolute", 0, 0, 0, 0, null, null, this);
        var monthstatic = this.monthstatic = new nexacro.Static("monthstatic", "absolute", 0, 0, 0, 0, null, null, this);
        var yearspin = this.yearspin = new nexacro.Spin("yearspin", "absolute", 0, 0, 0, 0, null, null, this);
        var monthspin = this.monthspin = new nexacro.Spin("monthspin", "absolute", 0, 0, 0, 0, null, null, this);

        prevbutton._setControl();
        nextbutton._setControl();
        yearstatic._setControl();
        monthstatic._setControl();
        yearspin._setControl();
        monthspin._setControl();

        prevbutton.createComponent(true);
        nextbutton.createComponent(true);
        yearstatic.createComponent(true);
        monthstatic.createComponent(true);
        yearspin.createComponent(true);
        monthspin.createComponent(true);

        yearspin.set_visible(false);
        yearspin.set_min("0");
        yearspin.set_max("9999");
        yearspin.set_circulation(true);
        yearspin.set_displaycomma(false);

        monthspin.set_visible(false);
        monthspin.set_min("1");
        monthspin.set_max("12");
        monthspin.set_circulation(true);
        monthspin.set_displaycomma(false);
    };

    _pDatePickerHeadControl.on_created_contents = function (win)
    {
        this.on_apply_prop_enable(this.enable);

        var prevbutton = this.prevbutton;
        var nextbutton = this.nextbutton;
        var yearstatic = this.yearstatic;
        var monthstatic = this.monthstatic;
        var yearspin = this.yearspin;
        var monthspin = this.monthspin;

        if (nexacro._isTouchInteraction && nexacro._SupportTouch)
        {
            yearstatic._setEventHandler("onclick", this.on_notify_mobile_head_onclick, this);
            monthstatic._setEventHandler("onclick", this.on_notify_mobile_head_onclick, this);
        }
        yearstatic._setEventHandler("onlbuttondown", this.on_notify_head_onlbuttondown, this);
        monthstatic._setEventHandler("onlbuttondown", this.on_notify_head_onlbuttondown, this);
        prevbutton._setEventHandler("onclick", this.on_notify_head_onprevclick, this);
        nextbutton._setEventHandler("onclick", this.on_notify_head_onnextclick, this);
        yearspin._setEventHandler("onspin", this.on_notify_head_onspin, this);
        monthspin._setEventHandler("onspin", this.on_notify_head_onspin, this);
        yearspin._setEventHandler("onkeydown", this.on_notify_head_onkeydown, this);
        monthspin._setEventHandler("onkeydown", this.on_notify_head_onkeydown, this);

        prevbutton.on_created(win);
        nextbutton.on_created(win);
        yearstatic.on_created(win);
        monthstatic.on_created(win);
        yearspin.on_created(win);
        monthspin.on_created(win);

        yearspin.set_value(this._year);
        monthspin.set_value(this._month);

        if (this.parent._is_popupcontains)
        {
            yearspin._setEnableView(false);
            monthspin._setEnableView(false);
        }
        this._refreshSpindate();
    };

    _pDatePickerHeadControl.on_create_contents_command = function ()
    {
        this._refreshSpindate();

        var str = "";
        if (this.prevbutton)
        {
            str += this.prevbutton.createCommand();
        }
        if (this.nextbutton)
        {
            str += this.nextbutton.createCommand();
        }
        if (this.yearstatic)
        {
            str += this.yearstatic.createCommand();
        }
        if (this.monthstatic)
        {
            str += this.monthstatic.createCommand();
        }
        if (this.yearspin)
        {
            str += this.yearspin.createCommand();
        }
        if (this.monthspin)
        {
            str += this.monthspin.createCommand();
        }

        return str;
    };
    
    _pDatePickerHeadControl.on_attach_contents_handle = function (win)
    {
        var prevbutton = this.prevbutton;
        var nextbutton = this.nextbutton;
        var yearstatic = this.yearstatic;
        var monthstatic = this.monthstatic;
        var yearspin = this.yearspin;
        var monthspin = this.monthspin;

        if (nexacro._isTouchInteraction && nexacro._SupportTouch)
        {
            yearstatic._setEventHandler("onclick", this.on_notify_mobile_head_onclick, this);
            monthstatic._setEventHandler("onclick", this.on_notify_mobile_head_onclick, this);
        }
        yearstatic._setEventHandler("onlbuttondown", this.on_notify_head_onlbuttondown, this);
        monthstatic._setEventHandler("onlbuttondown", this.on_notify_head_onlbuttondown, this);
        prevbutton._setEventHandler("onclick", this.on_notify_head_onprevclick, this);
        nextbutton._setEventHandler("onclick", this.on_notify_head_onnextclick, this);
        yearspin._setEventHandler("onspin", this.on_notify_head_onspin, this);
        monthspin._setEventHandler("onspin", this.on_notify_head_onspin, this);
        yearspin._setEventHandler("onkeydown", this.on_notify_head_onkeydown, this);
        monthspin._setEventHandler("onkeydown", this.on_notify_head_onkeydown, this);

        prevbutton.attachHandle(win);
        nextbutton.attachHandle(win);
        yearstatic.attachHandle(win);
        monthstatic.attachHandle(win);
        yearspin.attachHandle(win);
        monthspin.attachHandle(win);

        yearspin.set_value(this._year);
        monthspin.set_value(this._month);

        if (this.parent._is_popupcontains)
        {
            yearspin._setEnableView(false);
            monthspin._setEnableView(false);
        }
    };

    _pDatePickerHeadControl.on_destroy_contents = function ()
    {
        if (this.prevbutton)
        {
            this.prevbutton.destroy();
            this.prevbutton = null;
        }
        if (this.nextbutton)
        {
            this.nextbutton.destroy();
            this.nextbutton = null;
        }
        if (this.yearstatic)
        {
            this.yearstatic.destroy();
            this.yearstatic = null;
        }
        if (this.monthstatic)
        {
            this.monthstatic.destroy();
            this.monthstatic = null;
        }
        if (this.yearspin)
        {
            this.yearspin.destroy();
            this.yearspin = null;
        }
        if (this.monthspin)
        {
            this.monthspin.destroy();
            this.monthspin = null;
        }
    };

    _pDatePickerHeadControl.on_change_containerRect = function (widht, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Override
    //===============================================================
    _pDatePickerHeadControl.on_apply_prop_enable = function (v)
    {
        if (this.prevbutton)
        {
            this.prevbutton._setEnable(v);
        }
        if (this.nextbutton)
        {
            this.nextbutton._setEnable(v);
        }
        if (this.yearstatic)
        {
            this.yearstatic._setEnable(v);
        }
        if (this.monthstatic)
        {
            this.monthstatic._setEnable(v);
        }
        if (this.yearspin)
        {
            this.yearspin._setEnable(v);
        }
        if (this.monthspin)
        {
            this.monthspin._setEnable(v);
        }
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Properties
    //===============================================================
    _pDatePickerHeadControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pDatePickerHeadControl.on_apply_readonly = function ()
    {
        var v = this.readonly;
        if (v)
        {
            this._changeStatus("readonly", true);
        }
        else
        {
            this._changeStatus("readonly", false);
        }

        var control_elem = this.getElement();
        if (control_elem)
        {
            var yearspin = this.yearspin;
            if (yearspin)
            {
                yearspin.set_readonly(v);
            }
            var monthspin = this.monthspin;
            if (monthspin)
            {
                monthspin.set_readonly(v);
            }
        }
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Events
    //===============================================================
    _pDatePickerHeadControl.on_notify_mobile_head_onclick = function (obj, e)
    {
        var yearstatic = this.yearstatic;
        var monthstatic = this.monthstatic;
        var yearspin = this.yearspin;
        var monthspin = this.monthspin;

        var control_name = obj.name;
        if (control_name == "yearstatic")
        {
            yearstatic.set_visible(false);
            yearspin.set_visible(true);
        }
        else if (control_name == "monthstatic")
        {
            monthstatic.set_visible(false);
            monthspin.set_visible(true);
        }
    };

    _pDatePickerHeadControl.on_notify_head_onlbuttondown = function (obj, e)
    {
        var yearstatic = this.yearstatic;
        var monthstatic = this.monthstatic;
        var yearspin = this.yearspin;
        var monthspin = this.monthspin;

        var comp_name = obj.name;
        if (comp_name == "yearstatic")
        {
            yearstatic.set_visible(false);
            yearspin.set_visible(true);
        }
        else if (comp_name == "monthstatic")
        {
            monthstatic.set_visible(false);
            monthspin.set_visible(true);
        }
    };

    _pDatePickerHeadControl.on_notify_head_onprevclick = function (obj, e)
    {
        if (!this.enable || this.readonly)
        {
            return false;
        }

        var month = parseInt(this._month, 10);
        var year = parseInt(this._year, 10);

        if (month == 1)
        {
            month = 12;
            if (year <= 1)
            {
                year = 10000;
            }

            this._setYear(nexacro._toString(year - 1).padLeft(4, "0"));
        }
        else
        {
            month--;
        }

        this._refreshSpindate();
        this._setMonth(nexacro._toString(month).padLeft(2, "0"));

        this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, obj);
    };

    _pDatePickerHeadControl.on_notify_head_onnextclick = function (obj, e)
    {
        if (!this.enable || this.readonly)
        {
            return false;
        }

        var month = parseInt(this._month, 10);
        var year = parseInt(this._year, 10);

        if (month == 12)
        {
            month = 1;
            if (year == 9999)
            {
                year = 0;
            }
            else
            {
                year += 1;
            }
        }
        else
        {
            month++;
        }

        this._refreshSpindate();
        this._setYear(nexacro._toString(year).padLeft(4, "0"));
        this._setMonth(nexacro._toString(month).padLeft(2, "0"));

        this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, obj);
    };

    _pDatePickerHeadControl.on_notify_head_onspin = function (obj, e)
    {
        var v = nexacro._toString(e.postvalue);
        var control_name = obj.name;
        if (control_name == "yearspin")
        {
            this._setYear(v);
        }
        else if (control_name == "monthspin")
        {
            this._setMonth(v);
        }

        this.on_fire_onspin(obj, e);
    };

    _pDatePickerHeadControl.on_notify_head_onkeydown = function (obj, e)
    {
        if (e.keycode == nexacro.Event.KEY_ENTER)
        {
            var control_name = obj.name;
            if (control_name == "yearspin")
            {
                this._setYear(nexacro._toString(obj.text).padLeft(4, "0"));
            }
            else if (control_name == "monthspin")
            {
                this._setMonth(nexacro._toString(obj.text).padLeft(2, "0"));
            }
            this.on_fire_onspin(obj, e);
        }
    };

    _pDatePickerHeadControl.on_fire_onspin = function (obj, preText, preValue, postText, postValue, isUp)
    {
        if (this.onspin && this.onspin._has_handlers)
        {
            var evt = new nexacro.SpinEventInfo(obj, "onspin", preText, preValue, postText, postValue, isUp);
            return this.onspin._fireEvent(this, evt);
        }
        return true;
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Logical Part
    //===============================================================
    _pDatePickerHeadControl._refreshSpindate = function ()
    {
        var yearstatic = this.yearstatic;
        var monthstatic = this.monthstatic;
        var yearspin = this.yearspin;
        var monthspin = this.monthspin;
        if (yearstatic || monthstatic)
        {
            var bShowyear = this._getShowyearspin();
            var bShowmonth = this._getShowmonthspin();
            if (bShowyear)
            {
                if (bShowmonth)
                {
                    yearstatic.set_visible(false);
                    monthstatic.set_visible(false);
                    yearspin.set_visible(true);
                    monthspin.set_visible(true);
                }
                else
                {
                    yearstatic.set_visible(false);
                    monthstatic.set_visible(true);
                    yearspin.set_visible(true);
                    monthspin.set_visible(false);
                }
            }
            else
            {
                if (bShowmonth)
                {
                    yearstatic.set_visible(true);
                    monthstatic.set_visible(false);
                    yearspin.set_visible(false);
                    monthspin.set_visible(true);
                }
                else
                {
                    yearstatic.set_visible(true);
                    monthstatic.set_visible(true);
                    yearspin.set_visible(false);
                    monthspin.set_visible(false);
                }
            }
        }
    };

    _pDatePickerHeadControl._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var year_static = this.yearstatic;
            var month_static = this.monthstatic;
            var year_spin = this.yearspin;
            var month_spin = this.monthspin;

            var clientWidth = this._getClientWidth();
            var clientHeight = this._getClientHeight();

            var prevBtn_l = 0;
            var prevBtn_t = 0;
            var prevBtn_w = clientHeight;
            var prevBtn_h = clientHeight;

            var nextBtn_l = clientWidth - clientHeight;
            var nextBtn_t = 0;
            var nextBtn_w = clientHeight;
            var nextBtn_h = clientHeight;

            var headformat = this._getHeadformat();
            var month = nexacro._toString(this._month);
            month = month.padLeft(2, "0");

            var font = this._getCurrentStyleInheritValue("font");

            // yearstatic
            if (year_static)
            {
                font = year_static._getCurrentStyleInheritValue("font");
            }
            var textSize = nexacro._getTextSize(this._year + ".", font);
            var yearWidth = textSize[0];

            // monthstatic
            if (month_static)
            {
                font = month_static._getCurrentStyleInheritValue("font");
            }
            textSize = nexacro._getTextSize(this._month + ".", font);
            var monthWidth = textSize[0];

            var offset_x = ((clientWidth / 2) - ((yearWidth + monthWidth) / 2));

            var yearstatic_t = 0;
            var monthstatic_t = 0;
            var monthstatic_h = clientHeight;
            var yearstatic_h = clientHeight;

            if (headformat == "MM.yyyy")
            {
                var monthstatic_l = offset_x;
                var monthstatic_w = monthWidth;
                var yearstatic_l = monthstatic_l + monthstatic_w;
                var yearstatic_w = yearWidth;
            }
            else
            {
                var yearstatic_l = offset_x;
                var yearstatic_w = yearWidth;
                var monthstatic_l = yearstatic_l + yearstatic_w;
                var monthstatic_w = monthWidth;
            }

            // yearspin
            if (year_spin && year_spin.spinedit)
            {
                font = year_spin.spinedit._getCurrentStyleInheritValue("font");
            }
            textSize = nexacro._getTextSize(this._year + ".", font);
            yearWidth = textSize[0];
            var yearHeight = textSize[1];

            // monthspin
            if (month_spin && month_spin.spinedit)
            {
                font = month_spin.spinedit._getCurrentStyleInheritValue("font");
            }
            textSize = nexacro._getTextSize(this._month + ".", font);
            monthWidth = textSize[0];
            var monthHeight = textSize[1];

            var yearspin_t = Math.ceil((clientHeight - yearHeight) / 2);
            var yearspin_w = yearWidth + yearHeight;
            var yearspin_h = yearHeight;
            var monthspin_t = Math.ceil((clientHeight - monthHeight) / 2);
            var monthspin_w = monthWidth + monthHeight;
            var monthspin_h = monthHeight;

            offset_x = ((clientWidth / 2) - ((yearspin_w + monthspin_w) / 2));

            if (headformat == "MM.yyyy")
            {
                var monthspin_l = offset_x;
                var yearspin_l = monthspin_l + monthspin_w;
            }
            else
            {
                var yearspin_l = offset_x;
                var monthspin_l = yearspin_l + yearspin_w;
            }

            if (this.prevbutton) this.prevbutton.move(prevBtn_l, prevBtn_t, prevBtn_w, prevBtn_h, null, null);
            if (this.nextbutton) this.nextbutton.move(nextBtn_l, nextBtn_t, nextBtn_w, nextBtn_h, null, null);

            if (this.yearstatic) this.yearstatic.move(yearstatic_l, yearstatic_t, yearstatic_w, yearstatic_h, null, null);
            if (this.monthstatic) this.monthstatic.move(monthstatic_l, monthstatic_t, monthstatic_w, monthstatic_h, null, null);

            if (this.yearspin) this.yearspin.move(yearspin_l, yearspin_t, yearspin_w, yearspin_h, null, null);
            if (this.monthspin) this.monthspin.move(monthspin_l, monthspin_t, monthspin_w, monthspin_h, null, null);
        }
    };

    //===============================================================
    // nexacro._DatePickerHeadControl : Util Function
    //===============================================================
    _pDatePickerHeadControl._setYear = function (v)
    {
        if (v != this._year)
        {
            this._year = v;
            this._on_apply_year();
        }
    };

    _pDatePickerHeadControl._on_apply_year = function ()
    {
        var year = this._year;
        if (!year)
        {
            var date = new Date();
            year = date.getFullYear();
            date = null;
        }
        else
        {
            year = year.padLeft(4, "0");
        }

        var headformat = this._getHeadformat();
        var yearstatic = this.yearstatic;
        var yearspin = this.yearspin;
        if (yearstatic && yearspin)
        {
            yearstatic.set_text(year + ((headformat == "MM.yyyy") ? "" : "."));
            yearspin.set_value(year);
        }
    };

    _pDatePickerHeadControl._setMonth = function (v)
    {
        if (v != this._month)
        {
            this._month = v;
            this._on_apply_month();
        }
    };

    _pDatePickerHeadControl._on_apply_month = function ()
    {
        var month = this._month;
        if (!month)
        {
            var date = new Date();
            month = date.getMonth() + 1;
            date = null;
        }
        else
        {
            month = month.padLeft(2, "0");
        }

        var headformat = this._getHeadformat();
        var monthstatic = this.monthstatic;
        var monthspin = this.monthspin;

        if (monthstatic && monthspin)
        {
            monthstatic.set_text(month + ((headformat == "MM.yyyy") ? "." : ""));
            monthspin.set_value(month);
        }
    };

    _pDatePickerHeadControl._getHeadheight = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getHeadheight();
        }

        return null;
    };

    _pDatePickerHeadControl._getHeadformat = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getHeadformat();
        }

        return null;
    };

    _pDatePickerHeadControl._getShowyearspin = function ()
    {
        var calendar = this.parent;
        if (calendar)
        {
            return calendar._getShowyearspin();
        }

        return null;
    };

    _pDatePickerHeadControl._getShowmonthspin = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getShowmonthspin();
        }

        return null;
    };

    //==============================================================================
    // nexacro._DatePickerBodyControl 
    //==============================================================================
    nexacro._DatePickerBodyControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._weekitems = [];
        this._dayitems = [];
        this._changedDays = [];
    };

    var _pDatePickerBodyControl = nexacro._createPrototype(nexacro.Component, nexacro._DatePickerBodyControl);
    nexacro._DatePickerBodyControl.prototype = _pDatePickerBodyControl;
    _pDatePickerBodyControl._type_name = "DatePickerBodyControl";
    _pDatePickerBodyControl._is_subcontrol = true;

    /* control */
    _pDatePickerBodyControl.weekband = null;

    /* internal variable */
    _pDatePickerBodyControl._year = "";
    _pDatePickerBodyControl._month = "";
    _pDatePickerBodyControl._day = "";
    _pDatePickerBodyControl._preday = "";
    _pDatePickerBodyControl._maxWeek = 7;
    _pDatePickerBodyControl._maxDay = 42;

    /* status */
    _pDatePickerBodyControl._use_readonly_status = true;
    _pDatePickerBodyControl._is_locale_control = true;

    /* event list */
    _pDatePickerBodyControl._event_list = {
        "onclick": 1, "ondayclick": 1, "onkeydown": 1
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Create & Update
    //===============================================================
    _pDatePickerBodyControl.on_create_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var weekband = this.weekband = new nexacro.Static("weekband", "absolute", 0, 0, 0, 0, null, null, this);
            weekband._setControl();
            weekband.createComponent(true);

            var i = 0;
            var weekformat = this._getWeekformat();
            var weeks = this._weekitems;
            var days = this._dayitems;
            var maxWeek = this._maxWeek;
            var maxDay = this._maxDay;
            var weekstatic, daystatic;
            for (i = 0; i < maxWeek; i++)
            {
                weekstatic = weeks[i] = new nexacro._DatePickerWeekItemControl("weekitem" + i, "absolute", 0, 0, 0, 0, null, null, this);
                weekstatic.set_text(weekformat[i]);
                weekstatic._setDaysOfWeek(i % 7);

                weekstatic.createComponent(true);
            }

            for (i = 0; i < maxDay; i++)
            {
                daystatic = days[i] = new nexacro._DatePickerDayItemControl("dayitem" + i, "absolute", 0, 0, 0, 0, null, null, this);
                daystatic._setDaysOfWeek(i % 7);

                daystatic.createComponent(true);
            }
        }
    };

    _pDatePickerBodyControl.on_created_contents = function (win)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var i = 0;
            var weeks = this._weekitems;
            var days = this._dayitems;
            var maxWeek = this._maxWeek;
            var maxDay = this._maxDay;

            this.weekband.on_created(win);

            for (i = 0; i < maxWeek; i++)
            {
                weeks[i].on_created(win);
            }
            for (i = 0; i < maxDay; i++)
            {
                days[i]._setEventHandler("onclick", this.on_notify_dayitem_ondayclick, this);
                days[i].on_created(win);
            }
        }
    };

    _pDatePickerBodyControl.on_create_contents_command = function ()
    {
        var weekband = this.weekband;

        var i = 0;
        var weeks = this._weekitems;
        var days = this._dayitems;
        var maxWeek = this._maxWeek;
        var maxDay = this._maxDay;
        var str = "";

        str += weekband.createCommand();

        for (i = 0; i < maxWeek; i++)
        {
            str += weeks[i].createCommand();
        }

        for (i = 0; i < maxDay; i++)
        {
            str += days[i].createCommand();
        }

        return str;
    };

    _pDatePickerBodyControl.on_attach_contents_handle = function (win)
    {
        var weekband = this.weekband;

        var i = 0;
        var weeks = this._weekitems;
        var days = this._dayitems;
        var maxWeek = this._maxWeek;
        var maxDay = this._maxDay;

        weekband.attachHandle(win);

        for (i = 0; i < maxWeek; i++)
        {
            weeks[i].attachHandle(win);
        }
        for (i = 0; i < maxDay; i++)
        {
            days[i]._setEventHandler("onclick", this.on_notify_dayitem_ondayclick, this);
            days[i].attachHandle(win);
        }
    };

    _pDatePickerBodyControl.on_destroy_contents = function ()
    {
        if (this.weekband)
        {
            this.weekband.destroy();
            this.weekband = null;
        }

        var i = 0;
        var weeks = this._weekitems;
        var days = this._dayitems;
        var maxWeek = this._maxWeek;
        var maxDay = this._maxDay;

        for (i = 0 ; i < maxWeek; i++)
        {
            weeks[i].destroy();
        }
        this._weekitems = null;

        for (i = 0 ; i < maxDay; i++)
        {
            days[i].destroy();
        }
        this._dayitems = null;

        this._changedDays = null;
    };

    _pDatePickerBodyControl.on_change_containerRect = function (width, height)
    {
        this._recalcLayout();
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Override
    //===============================================================
    _pDatePickerBodyControl.on_apply_prop_enable = function (enable)
    {
        var i = 0;
        var weeks = this._weekitems;
        var days = this._dayitems;
        var maxWeek = this._maxWeek;
        var maxDay = this._maxDay;

        if (this.weekband)
        {
            this.weekband._setEnable(enable);
        }

        for (i = 0 ; i < maxWeek; i++)
        {
            weeks[i]._setEnable(enable);
        }

        for (i = 0 ; i < maxDay; i++)
        {
            days[i]._setEnable(enable);
        }
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Properties
    //===============================================================
    _pDatePickerBodyControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pDatePickerBodyControl.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);

        var i = 0;
        var weeks = this._weekitems;
        var days = this._dayitems;
        var maxWeek = this._maxWeek;
        var maxDay = this._maxDay;

        for (i = 0 ; i < maxWeek; i++)
        {
            weeks[i].set_readonly(v);
        }

        for (i = 0 ; i < maxDay; i++)
        {
            days[i].set_readonly(v);
        }
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Events
    //===============================================================
    _pDatePickerBodyControl.on_notify_dayitem_ondayclick = function (obj, e)
    {
        this.on_fire_ondayclick(obj, e);
    };

    _pDatePickerBodyControl.on_fire_ondayclick = function (obj, e)
    {
        if (this.ondayclick && this.ondayclick._has_handlers)
        {
            return this.ondayclick._fireEvent(this, e);
        }
        return false;
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Logical Part
    //===============================================================
    _pDatePickerBodyControl._recalcLayout = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var i = 0;
            var weeks = this._weekitems;
            var days = this._dayitems;
            var maxWeek = this._maxWeek;
            var maxDay = this._maxDay;

            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();
            var client_left = this._getClientLeft();
            var client_top = this._getClientTop();

            var daysize = this._getDaysize();
            if (!daysize)
            {
                daysize = [(client_width / 7), (client_height / 7)];
            }
            var dayWidth = parseFloat(daysize[0]);
            var dayHeight = daysize[1] ? parseFloat(daysize[1]) : dayWidth;

            var drawWidth_daysize = dayWidth * 7;
            var drawHeight_daysize = dayHeight * 7;

            var blankWidth = 0;
            var blankHeight = 0;
            var result = 0;
            if (drawWidth_daysize < client_width)
            {
                result = client_width - drawWidth_daysize;
                blankWidth = result / 14;
            }
            if (drawHeight_daysize < client_height)
            {
                result = client_height - drawHeight_daysize;
                blankHeight = result / 8;
            }

            var week_l = client_left + blankWidth;
            var week_t = client_top + (blankHeight / 2);
            var week_w = dayWidth;
            var week_h = dayHeight;

            this.weekband.move(client_left, week_t, client_width, week_h, null, null);

            for (var i = 0; i < maxWeek; i++)
            {
                weeks[i].move(week_l, week_t, week_w, week_h, null, null);
                week_l = week_l + week_w + (blankWidth * 2);
            }

            var day_l = client_left + blankWidth;
            var day_t = week_t + dayHeight + blankHeight;
            var day_w = dayWidth;
            var day_h = dayHeight;
            for (var i = 0; i < maxDay; i++)
            {
                days[i].move(day_l, day_t, day_w, day_h, null, null);
                day_l = day_l + day_w + (blankWidth * 2);
                if (((i + 1) % 7) == 0)
                {
                    day_l = client_left + blankWidth;
                    day_t = day_t + day_h + blankHeight;
                }
            }
        }
    };

    _pDatePickerBodyControl._refreshDay = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var dayInfo = {};
            var trailingdayinfo = {};

            var currentDate = this._getCurrentDate();

            var year = this._year ? parseInt(this._year, 10) : currentDate.year;
            var month = this._month ? parseInt(this._month, 10) : currentDate.month;
            var day = this._day ? parseInt(this._day, 10) : currentDate.day;

            var bLeapyear = this._getLeapYear(year);
            var tempDate = new Date(year, month - 1, 1);

            if (year < 100) tempDate.setFullYear(year);

            var N = nexacro.Calendar.EndDayNormal;
            var L = nexacro.Calendar.EndDayLeap;

            var firstDay = tempDate.getDay();
            var endDay = bLeapyear ? L[month - 1] : N[month - 1];

            var usetrailingday = this._getUsetrailingday();
            if (usetrailingday)
            {
                // args check
                trailingdayinfo = this._getUseTrailingDayInfo(year, month, tempDate, endDay);
            }

            var i = 0;
            var days = this._dayitems;
            var maxDay = this._maxDay;
            var dayCount = 1;
            var daysofweek = -1;

            for (i = 0; i < maxDay; i++)
            {
                if (firstDay <= i && endDay >= dayCount)
                {
                    dayInfo = this._getDayInfo(dayCount, false, true, year, month);

                    this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);

                    daysofweek = i % 7;
                    if (daysofweek == 0)
                    {
                        days[i]._changeUserStatus("sunday", true);
                    }
                    else if (daysofweek == 6)
                    {
                        days[i]._changeUserStatus("saturday", true);
                    }
                    else
                    {
                        if (this._isToday(dayInfo.day))
                            days[i]._changeUserStatus("today", true);
                        else
                            days[i]._changeUserStatus("day", true);
                    }

                    dayCount++;
                }
                else
                {
                    if (usetrailingday)
                    {
                        if (trailingdayinfo.idx >= 0)
                        {
                            dayInfo = this._getDayInfo(trailingdayinfo.pre_endDay - trailingdayinfo.idx, true, true, trailingdayinfo.year_front, trailingdayinfo.month_front);
                            trailingdayinfo.idx--;
                        }
                        else
                        {
                            dayInfo = this._getDayInfo(trailingdayinfo.next_beginDay, true, true, trailingdayinfo.year_back, trailingdayinfo.month_back);
                            trailingdayinfo.next_beginDay++;
                            trailingdayinfo.endWeek++;
                        }

                        this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);

                        days[i]._changeUserStatus("trailingday", true);
                    }
                    else
                    {
                        dayInfo = this._getDayInfo("", false, false, "", "");
                        this._setDayItemInfo(days[i], dayInfo.text, dayInfo.visible, dayInfo.year, dayInfo.month, dayInfo.trailingday);
                    }
                }
            }
        }

        this._initChangedDays();

        var dataset = this._getInnerDataset();
        if (dataset)
        {
            this._setDatasetStyle(dataset);
        }

        if (this._isSelectedDay(this._day))
        {
            this._on_apply_day(true);
        }
        else
        {
            this._on_apply_day(false);
        }

        this._setCalendarAccessibility();
    };

    _pDatePickerBodyControl._on_apply_day = function (flag)
    {
        var days = this._dayitems;

        var maxDay = this._maxDay;
        var preDay = this._preday;
        var currDay = this._day;
        var predayObj = this._getDayItem(preDay);
        var dayObj = this._getDayItem(currDay);

        this._preday = currDay;

        if (predayObj)
        {
            predayObj._changeUserStatus("selected", false);
            if (predayObj._daysofweek == 6)
            {
                predayObj._changeUserStatus("saturday", true);
            }
            else if (predayObj._daysofweek == 0)
            {
                predayObj._changeUserStatus("sunday", true);
            }
            else
            {
                predayObj._changeUserStatus("day", true);
            }
        }

        if (dayObj)
        {
            if (flag)
            {
                dayObj._changeUserStatus("selected", true);
            }
            else
            {
                dayObj._changeUserStatus("day", true);
            }
        }

        var currtDate = new Date();
        var today = currtDate.getDate();

        if (this._isToday(today))
        {
            today = nexacro._toString(today).padLeft(2, "0");
            var todatObj = this._getDayItem(today);
            if (todatObj)
            {
                todatObj._changeUserStatus("today", true);
            }
        }
    };

    _pDatePickerBodyControl._initChangedDays = function ()
    {
        var len = this._changedDays.length;
        for (var i = (len - 1) ; i >= 0  ; i--)
        {
            this._changedDays[i].set_background(null);
            this._changedDays[i].set_color(null);
            this._changedDays[i].set_border(null);

            this._changedDays.pop();
        }
    };

    //===============================================================
    // nexacro._DatePickerBodyControl : Util Function
    //===============================================================
    _pDatePickerBodyControl._setYear = function (v)
    {
        if (v != this._year)
        {
            this._year = v.padLeft(4, "0");
        }
    };

    _pDatePickerBodyControl._setMonth = function (v)
    {
        if (v != this._month)
        {
            this._month = v.padLeft(2, "0");
        }
    };

    _pDatePickerBodyControl._setDay = function (v)
    {
        if (v != this._day)
        {
            this._preday = this._day;
            this._day = v.padLeft(2, "0");

        }
    };

    _pDatePickerBodyControl._setDate = function (year, month, day)
    {
        this._preday = this._day;

        this._year = year.padLeft(4, "0");
        this._month = month.padLeft(2, "0");
        this._day = day.padLeft(2, "0");

        this._refreshDay();
    };

    _pDatePickerBodyControl._setDayItemInfo = function (day, text, visible, year, month, trailingday)
    {
        day.set_text(text);
        day.set_wordWrap("none");
        day.set_visible(visible);

        day._year = year;
        day._month = month;
        day._trailingday = trailingday;
    };

    _pDatePickerBodyControl._on_apply_weekformat = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var weekformat = this._getWeekformat();
            var weeks = this._weekitems;
            var weeks_len = weeks.length;

            for (var i = 0; i < weeks_len; i++)
            {
                weeks[i].set_text(weekformat[i]);
            }
        }
    };

    _pDatePickerBodyControl._isToday = function (v)
    {
        var year = parseInt(this._year, 10);
        var month = parseInt(this._month, 10);
        var day = parseInt(v, 10);
        var currDate = this._getCurrentDate();

        if (!year)
        {
            year = currDate.year;
        }
        if (!month)
        {
            month = currDate.month;
        }

        if (year == currDate.year && month == currDate.month && day == currDate.day)
        {
            return true;
        }
        return false;
    };

    _pDatePickerBodyControl._isSelectedDay = function (v)
    {
        v = parseInt(v, 10);
        var year = parseInt(this._year, 10);
        var month = parseInt(this._month, 10);
        if (year == this.parent._selected_year && month == this.parent._selected_month && v == this.parent._selected_day)
        {
            return true;
        }
        return false;
    };

    _pDatePickerBodyControl._setDatasetStyle = function (ds)
    {
        var days = this._dayitems;
        var maxDay = this._maxDay;
        var cols = this._getInnerDatasetColumns();

        var rowCount = ds.getRowCount();
        for (var i = 0; i < rowCount; i++)
        {
            var date = ds.getColumn(i, cols.datecolumn);
            var background, border, color;
            var week_idx = 0;
            var date_idx = 0;
            var date_year = 0;
            var date_month = 0;
            var date_day = 0;
            var datasetDateObj = {};

            if (date)
            {
                if (typeof date == "string")
                {
                    date_year = parseInt(date.substr(0, 4), 10);
                    date_month = parseInt(date.substr(4, 2), 10);
                    date_day = parseInt(date.substr(6, 2), 10);
                    datasetDateObj = new nexacro.Date(date_year, date_month - 1, 1);
                    week_idx = datasetDateObj.getDay();

                    datasetDateObj = null;
                }
                else if (typeof date == "object")
                {
                    date_year = date.getFullYear();
                    date_month = date.getMonth() + 1;
                    date_day = date.getDate();
                    week_idx = date.getDay();
                }
                date_idx = week_idx + date_day + 1;
            }

            for (var j = 0; j < maxDay; j++)
            {
                var year_val = days[j]._year;
                var month_val = days[j]._month;
                var day_val = days[j].text.padLeft(2, "0");

                var currDate = year_val + month_val + day_val;
                var changeday_len = this._changedDays.length;
                if (currDate == date)
                {
                    background = ds.getColumn(i, cols.backgroundcolumn);
                    border = ds.getColumn(i, cols.bordercolumn);
                    color = ds.getColumn(i, cols.textcolorcolumn);

                    if (background)
                    {
                        days[j].set_background(background);
                    }
                    if (border)
                    {
                        days[j].set_border(border);
                    }
                    if (color)
                    {
                        days[j].set_color(color);
                    }
                    this._changedDays[changeday_len] = days[j];
                }
            }
        }
    };

    _pDatePickerBodyControl._getLeapYear = function (year)
    {
        if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    _pDatePickerBodyControl._getCurrentDate = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getCurrentDate();
        }

        return;
    };

    _pDatePickerBodyControl._getWeekformat = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            var format = datepicker._getWeekformat();
            if (format)
            {
                return format.split(/\s+/);
            }
            else if (format === "")
            {
                return ["", "", "", "", "", "", ""];
            }
            else
            {
                var locale = this._getLocale();
                var locale_info = nexacro.Locale.getLocaleInfo(locale);
                return locale_info.weekday_names_short;
            }
        }

        return null;
    };

    _pDatePickerBodyControl._getDaysize = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            var size = datepicker._getDaysize();
            if (size)
            {
                return size.split(/\s+/);
            }
        }

        return null;
    };

    _pDatePickerBodyControl._getDayInfo = function (text, trailingday, visible, year, month)
    {
        year = nexacro._toString(year);
        year = year ? year.padLeft(4, "0") : "";

        month = nexacro._toString(month);
        month = month ? month.padLeft(2, "0") : "";

        day = nexacro._toString(text);
        day = day ? day.padLeft(2, "0") : "";

        return {
            text: text, trailingday: trailingday, visible: visible,
            year: year, month: month, day: day
        };
    };

    _pDatePickerBodyControl._getDayItem = function (day)
    {
        if (day == -1)
        {
            return null;
        }

        var days = this._dayitems;
        var maxDay = this._maxDay;
        for (var i = 0; i < maxDay; i++)
        {
            if (day == days[i].text.padLeft(2, "0"))
            {
                return days[i];
            }
        }

        return null;
    };

    _pDatePickerBodyControl._getUsetrailingday = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getUsetrailingday();
        }

        return null;
    };

    _pDatePickerBodyControl._getUseTrailingDayInfo = function (year, month, dateObj, endDay)
    {
        var year_front = year;
        var year_back = year;
        var month_front = month;
        var month_back = month;

        if (month == 1)
        {
            year_front -= 1;
            month_front = 12;

            month_back += 1;
        }
        else
        {
            month_front -= 1;
            if (month == 12)
            {
                year_back += 1;
                month_back = 1;
            }
            else
            {
                month_back += 1;
            }
        }

        var idx = dateObj.getDay() - 1;

        dateObj.setDate(endDay);
        var endWeek = dateObj.getDay();

        var N = nexacro.Calendar.EndDayNormal;
        var L = nexacro.Calendar.EndDayLeap;

        var is_pre_leapyear = this._getLeapYear(year_front);
        var pre_endDay = is_pre_leapyear ? L[month_front - 1] : N[month_front - 1];
        var next_beginDay = 1;

        return {
            year_front: year_front, year_back: year_back,
            month_front: month_front, month_back: month_back,
            endWeek: endWeek, idx: idx, pre_endDay: pre_endDay, next_beginDay: next_beginDay
        };
    };

    _pDatePickerBodyControl._getInnerDataset = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            return datepicker._getInnerDataset();
        }
        return null;
    };

    _pDatePickerBodyControl._getInnerDatasetColumns = function ()
    {
        var datepicker = this.parent;
        if (datepicker)
        {
            var background = datepicker._getBackgroundcolumn();
            var border = datepicker._getBordercolumn();
            var date = datepicker._getDatecolumn();
            var textcolor = datepicker._getTextcolorcolumn();

            return { backgroundcolumn: background, bordercolumn: border, datecolumn: date, textcolorcolumn: textcolor };
        }

        return null;
    };

    _pDatePickerBodyControl._setCalendarAccessibility = function ()
    {
        if (nexacro._enableaccessibility)
        {
            var calendar = this._calendar;
            var cal_value = this._year + this._month + this._day;
            var accessibility_value = calendar._makeCalendarText(cal_value);
            this.parent._setAccessibilityLabel(accessibility_value);
            nexacro._notifyAccessibilityValue(this._control_element, accessibility_value, "daychange");
        }
    };

    delete _pDatePickerBodyControl;

    //===============================================================
    // nexacro._DatePickerDayItemControl : Button
    //===============================================================
    nexacro._DatePickerDayItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._flag_dataset = -1;
        this._dataset_background = "";
        this._refObj = parent.parent;
    };

    var _pDatePickerDayItemControl = nexacro._createPrototype(nexacro.Button, nexacro._DatePickerDayItemControl);
    nexacro._DatePickerDayItemControl.prototype = _pDatePickerDayItemControl;
    _pDatePickerDayItemControl._type_name = "DatePickerDayItemControl";
    _pDatePickerDayItemControl._is_subcontrol = true;

    _pDatePickerDayItemControl._trailingday = false;

    _pDatePickerDayItemControl._year = "";
    _pDatePickerDayItemControl._month = "";

    _pDatePickerDayItemControl._daysofweek = -1;

    _pDatePickerDayItemControl._use_readonly_status = true;

    //===============================================================
    // nexacro._DatePickerDayItemControl : Properties
    //===============================================================
    _pDatePickerDayItemControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pDatePickerDayItemControl.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);
    };

    //===============================================================
    // nexacro._DatePickerDayItemControl : Logical Part
    //===============================================================
    _pDatePickerDayItemControl._setDaysOfWeek = function (daysofweek)
    {
        if (this._daysofweek != daysofweek)
        {
            this._daysofweek = daysofweek;
            this._on_apply_daysofweek(daysofweek);
        }
    };

    _pDatePickerDayItemControl._on_apply_daysofweek = function (v)
    {
        var text = v;
        var status = this._status;

        if (text && text.length > 0)
        {
            if (this.trailingday)
            {
                this._changeUserStatus("trailingday", true);
            }
            else if (this.parent._isSelectedDay(text))
            {
                this._changeUserStatus("selected", true);
            }
            else if (this.parent._isToday(text))
            {
                this._changeUserStatus("today", true);
            }
            else if (this._daysofweek == 6)
            {
                this._changeUserStatus("saturday", true);
            }
            else if (this._daysofweek == 0)
            {
                this._changeUserStatus("sunday", true);
            }
        }
    };

    _pDatePickerDayItemControl.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
    {
        if (value)
            return changestatus;
        else
            return applyuserstatus;
    };

    _pDatePickerDayItemControl.on_getIDCSSSelector = function ()
    {
        return "dayitem";
    };

    delete _pDatePickerDayItemControl;

    //===============================================================
    // nexacro._DatePickerWeekItemControl : Static
    //===============================================================
    nexacro._DatePickerWeekItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Static.call(this, id, position, left, top, width, height, right, bottom, parent);
        this._refObj = parent.parent;
    };

    var _pDatePickerWeekItemControl = nexacro._createPrototype(nexacro.Static, nexacro._DatePickerWeekItemControl);
    nexacro._DatePickerWeekItemControl.prototype = _pDatePickerWeekItemControl;
    _pDatePickerWeekItemControl._type_name = "DatePickerWeekItemControl";
    _pDatePickerWeekItemControl._is_subcontrol = true;
    _pDatePickerWeekItemControl._daysofweek = -1;

    _pDatePickerWeekItemControl._use_readonly_status = true;

    //===============================================================
    // nexacro._DatePickerWeekItemControl : Properties
    //===============================================================
    _pDatePickerWeekItemControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pDatePickerWeekItemControl.on_apply_readonly = function ()
    {
        var v = this.readonly;

        this._changeStatus("readonly", v);
    };

    //===============================================================
    // nexacro._DatePickerWeekItemControl : Logical Part
    //===============================================================
    _pDatePickerWeekItemControl._setDaysOfWeek = function (daysofweek)
    {
        if (this._daysofweek != daysofweek)
        {
            this._daysofweek = daysofweek;
            this._on_apply_daysofweek(daysofweek);
        }
    };

    _pDatePickerWeekItemControl._on_apply_daysofweek = function (v)
    {
        if (v == 0)
        {
            this._changeUserStatus("sunday", true);
        }
        else if (v == 6)
        {
            this._changeUserStatus("saturday", true);
        }
    };

    _pDatePickerWeekItemControl.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
    {
        return changestatus;
    };

    _pDatePickerWeekItemControl.on_getIDCSSSelector = function ()
    {
        return "weekitem";
    };

    delete _pDatePickerWeekItemControl;
}
