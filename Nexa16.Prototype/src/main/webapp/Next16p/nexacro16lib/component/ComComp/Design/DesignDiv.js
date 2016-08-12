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

if (nexacro.Div)
{
    var _pDiv = nexacro.Div.prototype;

    _pDiv.createCssDesignContents = function ()
    {
        this.set_text("Div");
    };
     
    _pDiv.resetScroll = function ()
    {
        var form = this.form;

        if (form)
            form.resetScroll();
    };

    _pDiv.set_width = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }

        if (propVal !== "auto")
        {
            if (propVal !== null && propVal !== undefined)
            {
                if (strVal.charAt(strVal.length - 1) == '%')
                {
                    propVal = parseFloat(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                    propVal += "%";
                }
                else
                {
                    propVal = parseInt(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                }
            }
        }

        if (this.width != propVal)
        {
            var old_width = this.width;
            var root_form = this._getRootForm();
            var design_form = this._getDesignForm();
            var step_width = 0;
            var owner_positionstep = 0;

            if (design_form && this.parent == root_form)
            {
                owner_positionstep = design_form.get_owner_step_index(this);
                if (owner_positionstep > 0)
                {
                    step_width = design_form._inner_form._adjust_width;
                }
            }

            this.width = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._width = null;
            }
            else if (propVal == "auto")
            {
                if (!this.minwidth)
                {
                    this.set_minwidth(10);
                }
                if (!this.maxwidth)
                {
                    this.set_maxwidth(old_width);
                }
            }

            if (!nexacro._isNull(this.left) && !nexacro._isNull(this.right))
            {
                this.right = null;
                this._right = null;
            }
            this._update_position(true, false);
        }
    };

    delete _pDiv;
}

if (nexacro._InnerForm)
{
    var _pInnerForm = nexacro._InnerForm.prototype;
    _pInnerForm.loadForm = nexacro.FormBase.prototype.loadForm;

    delete _pInnerForm;
}
