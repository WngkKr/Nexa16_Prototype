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

//==============================================================================
// nexacro.PopupDiv
//==============================================================================
if (nexacro.PopupDiv)
{
    nexacro.PopupDiv = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Div.call(this, id, position, left, top, width, height, right, bottom, parent);
    };
    var _pPopupDiv = nexacro._createPrototype(nexacro.Div, nexacro.PopupDiv);
    nexacro.PopupDiv.prototype = _pPopupDiv;
    _pPopupDiv._type_name = "PopupDiv";

    // ====================================================================
    // nexacro.PopupDiv : Create & Update & Destory
    // ==================================================================== 
    _pPopupDiv.on_created_contents = function ()
    {
        nexacro.Div.prototype.on_created_contents.call(this);
        this.visible = false; // PopupComponent의 visible은 default가 false
    };
   
    _pPopupDiv.createCssDesignContents = function ()
    {
        this.set_text("PopupDiv");
    };

    delete _pPopupDiv;
}