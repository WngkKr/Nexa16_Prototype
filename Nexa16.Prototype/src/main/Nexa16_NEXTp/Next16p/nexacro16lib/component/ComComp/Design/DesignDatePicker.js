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
if (nexacro.DatePickerControl)
{
    //==============================================================================
    // nexacro.DatePickerControl
    //==============================================================================
    var _pDatePickerControl = nexacro.DatePickerControl.prototype;


    //===============================================================
    // nexacro.DatePickerControl : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.DatePickerControl : Override
    //===============================================================


    //===============================================================
    // nexacro.DatePickerControl : Properties
    //===============================================================


    //===============================================================
    // nexacro.DatePickerControl : Methods
    //===============================================================


    //===============================================================
    // nexacro.DatePickerControl : Events
    //===============================================================


    //===============================================================
    // nexacro.DatePickerControl : Logical part
    //===============================================================
    _pDatePickerControl.createCssDesignContents = function ()
    {
        ;
    };



    delete _pDatePickerControl;

    //==============================================================================
    // nexacro.DatePickerHeadControl
    //==============================================================================
    var _pDatePickerHeadControl = nexacro._DatePickerHeadControl.prototype;


    //===============================================================
    // nexacro.DatePickerHeadControl : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.DatePickerHeadControl : Override
    //===============================================================


    //===============================================================
    // nexacro.DatePickerHeadControl : Properties
    //===============================================================


    //===============================================================
    // nexacro.DatePickerHeadControl : Methods
    //===============================================================


    //===============================================================
    // nexacro.DatePickerHeadControl : Events
    //===============================================================


    //===============================================================
    // nexacro.DatePickerHeadControl : Logical part
    //===============================================================
    _pDatePickerHeadControl.createCssDesignContents = function ()
    {
        this._setYear("1982");
        this._setMonth("03");
    };

    _pDatePickerHeadControl.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
        this._recalcLayout();
    };

    _pDatePickerHeadControl._getHeadformat = function ()
    {
        return "yyyy.MM";
    };

    _pDatePickerHeadControl._getShowyearspin = function ()
    {
        return true;
    };

    _pDatePickerHeadControl._getShowmonthspin = function ()
    {
        return true;
    };

    delete _pDatePickerHeadControl;

    //==============================================================================
    // nexacro.DatePickerBodyControl
    //==============================================================================
    var _pDatePickerBodyControl = nexacro._DatePickerBodyControl.prototype;


    //===============================================================
    // nexacro.DatePickerBodyControl : Create & Destroy & Update
    //===============================================================
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
                if (weeks[i]._cell_elem)
                {
                    weeks[i]._cell_elem.setElementTextAlign("center");
                    weeks[i]._cell_elem.setElementVerticalAlign("middle");
                }

                weeks[i].on_created(win);
            }
            for (i = 0; i < maxDay; i++)
            {
                if (days[i]._cell_elem)
                {
                    days[i]._cell_elem.setElementTextAlign("center");
                    days[i]._cell_elem.setElementVerticalAlign("middle");
                }

                days[i]._setEventHandler("onclick", this.on_notify_dayitem_ondayclick, this);
                days[i].on_created(win);
            }
        }
    };

    _pDatePickerBodyControl.on_change_containerRect = function (width, height)
    {
        if (this._is_created_contents)
        {
            this._recalcLayout();
        }
    };

    //===============================================================
    // nexacro.DatePickerBodyControl : Override
    //===============================================================


    //===============================================================
    // nexacro.DatePickerBodyControl : Properties
    //===============================================================


    //===============================================================
    // nexacro.DatePickerBodyControl : Methods
    //===============================================================


    //===============================================================
    // nexacro.DatePickerBodyControl : Events
    //===============================================================


    //===============================================================
    // nexacro.DatePickerBodyControl : Logical part
    //===============================================================
    _pDatePickerBodyControl.createCssDesignContents = function ()
    {
        this._setDate("1982", "03", "15");
    };

    _pDatePickerBodyControl.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
        this._recalcLayout();
        this._refreshDay();
    };

    _pDatePickerBodyControl._getCurrentDate = function ()
    {
        var year, month, day;
        var currDate = new Date();

        year = currDate.getFullYear();
        month = currDate.getMonth() + 1;
        day = currDate.getDate();

        return { year: year, month: month, day: day };
    };

    _pDatePickerBodyControl._getWeekformat = function ()
    {
        return "S M T W T F S".split(/\s+/);
    };

    _pDatePickerBodyControl._getUsetrailingday = function ()
    {
        return false;
    };

    _pDatePickerBodyControl._getInnerDataset = function ()
    {
        return null;
    };

    delete _pDatePickerBodyControl;

    //==============================================================================
    // nexacro.DatePickerDayItemControl
    //==============================================================================
    var _pDatePickerDayItemControl = nexacro._DatePickerDayItemControl.prototype;

    //===============================================================
    // nexacro.DatePickerDayItemControl : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.DatePickerDayItemControl : Override
    //===============================================================


    //===============================================================
    // nexacro.DatePickerDayItemControl : Properties
    //===============================================================


    //===============================================================
    // nexacro.DatePickerDayItemControl : Methods
    //===============================================================


    //===============================================================
    // nexacro.DatePickerDayItemControl : Events
    //===============================================================


    //===============================================================
    // nexacro.DatePickerDayItemControl : Logical part
    //===============================================================
    _pDatePickerDayItemControl.createCssDesignContents = function ()
    {
        this.set_text("15");
    };

    delete _pDatePickerDayItemControl;

    //==============================================================================
    // nexacro.DatePickerWeekItemControl
    //==============================================================================
    var _pDatePickerWeekItemControl = nexacro._DatePickerWeekItemControl.prototype;


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Override
    //===============================================================


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Properties
    //===============================================================


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Methods
    //===============================================================


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Events
    //===============================================================


    //===============================================================
    // nexacro.DatePickerWeekItemControl : Logical part
    //===============================================================
    _pDatePickerWeekItemControl.createCssDesignContents = function ()
    {
        this.set_text("S");
    };

    delete _pDatePickerWeekItemControl;
};