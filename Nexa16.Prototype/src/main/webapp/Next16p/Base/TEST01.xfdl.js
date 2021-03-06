﻿(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this._setPropInitFunc(function (obj)
            {
                obj.set_name("TEST01");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Calendar("Calendar00","absolute","5","5",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_type("monthonly");
                obj.set_usecontextmenu("true");
                obj.set_showmonthspin("false");
                obj.set_showyearspin("false");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Calendar00.set_leftbase("");
            this.Calendar00.set_topbase("");
            this.Calendar00.set_bottombase("");
            this.Calendar00.set_rightbase("");
            this.Calendar00.set_widthbase("");
            this.Calendar00.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1078,810,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("TEST01.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
