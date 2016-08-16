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
// nexacro.Static && nexacro.Static_Style
//==============================================================================
if (nexacro.Static)
{
    var _pStatic = nexacro.Static.prototype;
    _pStatic.createCssDesignContents = function ()
    {
        this.set_text("Static");
    };

    delete _pStatic;
   
}