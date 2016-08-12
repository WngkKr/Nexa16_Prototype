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
if (nexacro.StepControl)
{
    var _pStepControl = nexacro.StepControl.prototype;

    _pStepControl.stepitemsize = 9;

    _pStepControl.createCssDesignContents = function ()
    {
        this.set_stepcount(3);
        this._update();
    };

    _pStepControl._loadImage = function (url, width, height)
    {
        var info = this._icon_info;
        info.width = width;
        info.height = height;
        info.isloaded = true;
        this._update();
    };

    _pStepControl._update = function ()
    {
        this._drawStepButton();
        this.on_apply_stepalign("center middle");
    };

    _pStepControl.on_apply_stepalign = function (stepalign)
    {
        var form = this.parent;
        var control_elem = form.getElement();
        if (control_elem)
        {
            var form_left = 0;
            var form_top = 0;
            //var form_width = control_elem.container_maxwidth;
            //var form_height = control_elem.container_maxheight;
            var form_width = form._getClientWidth();
            var form_height = form._getClientHeight();

            var item_size = this._getStepItemsize();
            var item_gap = this._getStepItemGap();
            var item_area = this._getItemAreaSize(this.stepcount, item_size, item_gap);

            var parts = stepalign.split(/\s+/);
            halign = parts[0];
            valign = parts[1];
            var left, top;
            var border = form._getCurrentStyleBorder();
            var border_l = border_t = border_r = border_b = 0;
            if (border)
            {
                border_l = border.left._width;
                border_t = border.top._width;
                border_r = border.right._width;
                border_b = border.bottom._width;
            }

            switch (halign)
            {
                case "left":
                    left = border_l;
                    break;
                case "center":
                    left = (form_width - item_area.width - border_l - border_r) / 2;
                    break;
                case "right":
                    left = form_width - item_area.width - border_r;
                    break;
            }

            switch (valign)
            {
                case "top":
                    top = 0;
                    break;
                case "middle":
                    top = (form_height - item_area.height - border_t - border_b) / 2;
                    break;
                case "bottom":
                    top = form_height - item_area.height - border_b;
                    break;
            }

            this.move(left, top, item_area.width, item_area.height, null, null);
        }
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

                this.on_apply_stepcount();

            }
        }
    };

    delete _pStepControl;
}