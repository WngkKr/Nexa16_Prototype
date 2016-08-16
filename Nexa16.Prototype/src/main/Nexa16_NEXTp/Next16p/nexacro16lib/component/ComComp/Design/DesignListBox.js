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
// nexacro.ListBox && nexacro.ListBox_Style
//==============================================================================
if (nexacro.ListBox)
{
    // ==============================================================================
    // nexacro.ListBoxClickEventInfo
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.ListBox_Style
    // ==============================================================================
    

    // ==============================================================================
    // ListBox CurrentStyle
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.ListBox
    // ==============================================================================
  

    //===============================================================
    // ListBox Style Part
    //---------------------------------------------------------------

    

    //===============================================================
    // nexacro.ListBox : ListBox's Create & Update
    //---------------------------------------------------------------
   

    //===============================================================
    // ListBox Override
    //---------------------------------------------------------------
    


    

    //===============================================================
    // ListBox Properties
    //---------------------------------------------------------------
   

    //===============================================================
    // Event Handlers  ( notify , override ....)
    //---------------------------------------------------------------

    

    //===============================================================
    // Logical Part  ( Internal Function Part )
    //---------------------------------------------------------------
    var _pListBox = nexacro.ListBox.prototype;

    _pListBox.createCssDesignContents = function ()
    {
        this.set_codecolumn("codecolumn");
        this.set_datacolumn("datacolumn");
        var ListBox_innerdataset = new nexacro.NormalDataset("ListBox_innerdataset", this.parent);
        ListBox_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">ListItem01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">ListItem02</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">ListItem03</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">ListItem04</Col></Row><Row><Col id=\"codecolumn\">5</Col><Col id=\"datacolumn\">ListItem05</Col></Row><Row><Col id=\"codecolumn\">6</Col><Col id=\"datacolumn\">ListItem06</Col></Row></Rows>");
        this.set_innerdataset(ListBox_innerdataset);
    };
    
    _pListBox.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
        this.set_index(1);
    };


    delete _pListBox;
   


    // ==============================================================================
    // nexacro.ListItemCtrl  ( ListBox SubCtrol )
    // ==============================================================================   
    var _pListBoxItemControl = nexacro._ListBoxItemControl.prototype;
    // ==============================================================================
    // nexacro.ListBoxClickEventInfo
    // ==============================================================================
    _pListBoxItemControl.createCssDesignContents = function ()
    {
        this.set_text("ListBoxItemControl");
    };

    _pListBoxItemControl.destroy = function ()
    {
        nexacro.Component.prototype.destroy.call(this);
    };

    //destroy
    delete _pListBoxItemControl;
    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Override
   

    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Properties
    //---------------------------------------------------------------
    


    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Event Handlers
    //---------------------------------------------------------------
   

    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Logical part
    //---------------------------------------------------------------


    //---------------------------------------------------------------
    // nexacro.ListBoxCtrl
    //---------------------------------------------------------------
    
}