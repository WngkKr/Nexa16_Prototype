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

if (nexacro.Radio)
{
    //==============================================================================
    // nexacro.Radio_Style
    //==============================================================================
   

    //==============================================================================
    // nexacro.Radio
    //==============================================================================
   

    //==============================================================================
    // nexacro.Radio : Style Part
    //==============================================================================
   

    //==============================================================================
    // nexacro.Radio : Create & Destroy & Update
    //==============================================================================
    

    //==============================================================================
    // nexacro.Radio : Override
    //==============================================================================
    

    //==============================================================================
    // nexacro.Radio : Properties
    //==============================================================================
    

    //==============================================================================
    // nexacro.Radio : Methods
    //==============================================================================
   


    //==============================================================================
    // nexacro.Radio : Event Handlers
    //==============================================================================    
    

    //==============================================================================
    // nexacro.Radio : Logical Part
    //==============================================================================
    var _pRadio = nexacro.Radio.prototype;

    _pRadio.createCssDesignContents = function ()
    {
        this.set_codecolumn("codecolumn");
        this.set_datacolumn("datacolumn");
        var Radio_innerdataset = new nexacro.NormalDataset("Radio_innerdataset", this.parent);
        Radio_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">Radio1</Col></Row><Row><Col id=\"codecolumn\"/><Col id=\"datacolumn\">Radio2</Col></Row></Rows>");
        this.set_innerdataset(Radio_innerdataset);
    };

    _pRadio.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
         this.set_index(1);
    };

    delete _pRadio;

    var _pRadioItemControl = nexacro._RadioItemControl.prototype;
    delete _pRadioItemControl;

    //===============================================================
    // nexacro.RadioCtrl : Radio
    // description : use Event Notifiers, style control - controlType
    //===============================================================
   
    //==============================================================================
    // nexacro.RadioItem_Style
    //==============================================================================
    

   

    //===============================================================
    // nexacro.RadioItemCtrl : Static
    // description : use Event Notifiers, style control - controlType
    //===============================================================
    

    //===============================================================
    // nexacro.RadioItemCtrl : Style part
    //===============================================================
   

    //===============================================================
    // nexacro.RadioItemCtrl : Create & Destroy & Update
    //===============================================================
    

    //===============================================================
    // nexacro.RadioItemCtrl : Properties
    //==============================================================
    

    //===============================================================
    // nexacro.RadioItemCtrl : Override
    //==============================================================
    

    //===============================================================
    // nexacro.RadioItemCtrl : Logical Part
    //==============================================================
   

    //===============================================================
    // nexacro.ImageRadioCtrl : ImageViewer
    // description : use Event Notifiers, style control - controlType
    //===============================================================
   

    //===============================================================
    // nexacro.ImageRadioCtrl : Style Part
    //===============================================================
    

    //===============================================================
    // nexacro.ImageRadioCtrl : Event Handlers
    //===============================================================
   
};