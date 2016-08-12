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
// nexacro.GroupBox
//==============================================================================
if (nexacro.GroupBox)
{
    
    var _pGroupBox = nexacro.GroupBox.prototype;
    //============================================================
    // nexacro.GroupBox : Logical Part
    //============================================================
    _pGroupBox.createCssDesignContents = function ()
	{
	    this.set_text("GroupBox");
	};

	delete _pGroupBox;
}