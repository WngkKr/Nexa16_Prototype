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
if (nexacro.MaskEdit)
{
    var _pMaskEdit = nexacro.MaskEdit.prototype;

    //==============================================================================
    // nexacro.MaskEdit 
    //==============================================================================


    //===============================================================
    // nexacro.MaskEdit : Create & Destroy & Update
    //===============================================================


    //===============================================================
    // nexacro.MaskEdit : Override
    //===============================================================


    //===============================================================
    // nexacro.MaskEdit : Properties
    //===============================================================


    //===============================================================
    // nexacro.MaskEdit : Methods
    //===============================================================


    //===============================================================
    // nexacro.MaskEdit : Events
    //===============================================================


    //===============================================================
    // nexacro.MaskEdit : Logical Part
    //===============================================================
    _pMaskEdit.createCssDesignContents = function ()
    {
        this.set_type("string");
        this.set_mask("@@@@@@@@");
        this.set_value("MaskEdit");
    };

    delete _pMaskEdit;
};

