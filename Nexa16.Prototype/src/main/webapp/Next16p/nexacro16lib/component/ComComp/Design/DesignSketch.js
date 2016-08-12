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
if (nexacro.Sketch)
{
    var _pSketch = nexacro.Sketch.prototype;

    _pSketch.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var cellElem = new nexacro.TextBoxElement(control_elem, "icontext");
            this._cell_elem = cellElem;
            cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

            cellElem.setElementTextAlign("center");
            cellElem.setElementVerticalAlign("middle");
            cellElem.setElementText(this.name);
        }
    };

    _pSketch.on_created_contents = function (win)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.create(win);
        }
    };

    _pSketch.on_destroy_contents = function ()
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.destroy();
            this._cell_elem = null;
        }
    };


    _pSketch.on_change_containerRect = function (width, height)
    {
        if (this._is_created_contents)
        {
            var cellElem = this._cell_elem;
            cellElem.setElementSize(width, height);
        }
    };

    _pSketch.on_apply_text = function (text)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.setElementText(this.text);
        }
    };

    _pSketch.createCssDesignContents = function ()
    {
        this.set_text("Sketch");
    };

    delete _pSketch;
    // ==============================================================================
    // nexacro.SketchLoadEventInfo  
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.SketchErrorEventInfo  
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.Sketch 
    // ==============================================================================
    

    // ==============================================================================
    // nexacro.Sketch : Create & Destroy & Update
    // ==============================================================================
    

    // ==============================================================================
    // nexacro.Sketch : Properties
    // ==============================================================================
   

    //========================================================================
    // style update
    //========================================================================
    

    // ==============================================================================
    // nexacro.Sketch : Methods
    // ============================================================================== 
    

    // ==============================================================================
    // nexacro.Sketch : Event Handler
    // ==============================================================================
    
    
    // ==============================================================================
    // nexacro.Sketch : Logical Part
    // ==============================================================================
    

    // ==============================================================================
    // nexacro.SketchEditCtrl
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.SketchEditCtrl : Style Part
    // ==============================================================================
    

    // ==============================================================================
    // nexacro.SketchEditCtrl : Event Handler
    // ==============================================================================
   

    // ==============================================================================
    // nexacro.ImageSketchBackground
   

    // ==============================================================================
    // nexacro.ImageSketchBackground : Override
    // ==============================================================================
   
}