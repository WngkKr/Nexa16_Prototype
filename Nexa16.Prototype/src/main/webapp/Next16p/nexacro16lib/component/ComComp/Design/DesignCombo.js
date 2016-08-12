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
if (nexacro.Combo)
{
    var _pCombo = nexacro.Combo.prototype;

    //==============================================================================
    // nexacro.ComboCloseUpEventInfo
    //==============================================================================


    //==============================================================================
    // nexacro.Combo
    //==============================================================================


    //===============================================================
    // nexacro.Combo : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.Combo : Override 
    //===============================================================


    //===============================================================
    // nexacro.Combo : Properties
    //===============================================================


    //===============================================================
    // nexacro.Combo : Methods
    //===============================================================


    //===============================================================
    // nexacro.Combo : Events
    //===============================================================


    //===============================================================
    // nexacro.Combo : Logical part
    //===============================================================
    _pCombo.createCssDesignContents = function ()
    {
        this.set_codecolumn("codecolumn");
        this.set_datacolumn("datacolumn");
        var Combo_innerdataset = new nexacro.NormalDataset("Combo_innerdataset", this);
        Combo_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">Combo Item 0</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">Combo Item 1</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">Combo Item 2</Col></Row></Rows>");
        this.set_innerdataset(Combo_innerdataset);

        this.set_index(1);
    };

    _pCombo.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
        this._showPopup(this.getInnerDataset(), this.index);
    };

    _pCombo.updatePreviewPosition = function ()
    {
        var form = this.parent;

        var popupsize = this._getPopuplistSize(this.getInnerDataset());
        var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
        var offset_top = (form._adjust_height / 2) - ((this._adjust_height + popupsize.height) / 2);
        
        this.move(offset_left, offset_top);
    };

    delete _pCombo;
};

if (nexacro._ComboPopupControl)
{
    var _pComboPopupControl = nexacro._ComboPopupControl.prototype;

    _pComboPopupControl._getElementPosition = function ()
    {
        var combo = this.parent;
        if (combo)
        {
            if (this._isPreviewMode())
            {
                return { x: combo._adjust_left, y: combo._adjust_top };
            }
            else
            {
                return nexacro._getElementPositionInFrame(combo.getElement());
            }
        }

        return {};
    };

    delete _pComboPopupControl;
};