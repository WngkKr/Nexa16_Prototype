(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("WorkFrame");
                this.set_classname("WorkFrame");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1280,1000);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "230", "0", "1050", "30", null, null, this);
            obj.set_taborder("1");
            obj.set_cssclass("sta_TF_TopBg2");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "230", "0", "1050", "30", null, null, this);
            obj.set_taborder("0");
            obj.set_url("Frame::TopFrame.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "0", "0", "230", null, null, "42", this);
            obj.set_taborder("2");
            obj.set_text("Div01");
            obj.set_url("Frame::LeftFrame.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("Div02", "absolute", "0", null, null, "42", "0", "0", this);
            obj.set_taborder("3");
            obj.set_text("Div02");
            obj.set_url("Frame::MDIFrame.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("Div03", "absolute", "230", "30", "1050", null, null, "42", this);
            obj.set_taborder("4");
            obj.set_text("Div03");
            obj.set_url("Frame::WorkFrame.xfdl");
            obj.set_cssclass("div_WF_WFBg");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1280, 1000, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("WorkFrame");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl", "Frame::TopFrame.xfdl");
            this._addPreloadList("fdl", "Frame::LeftFrame.xfdl");
            this._addPreloadList("fdl", "Frame::MDIFrame.xfdl");
            this._addPreloadList("fdl", "Frame::WorkFrame.xfdl");
        };
        
        // User Script
        this.addIncludeScript("Frame.xfdl", "Lib::Comm.xjs");
        this.registerScript("Frame.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : Frame
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : frame tgemplate
        *------------------------------------------------------------------
        * MODIFY DATE   PROGRAMMER			DESCRIPTION
        *------------------------------------------------------------------
        * 
        *------------------------------------------------------------------
        ***********************************************************************************/

        /***********************************************************************************
        * Common Library
        ***********************************************************************************/
        //include "Lib::Comm.xjs";

        
        /***********************************************************************************
        * Global/Local Variable
        ***********************************************************************************/
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("Frame.xfdl");
        this.loadPreloadList();
       
    };
}
)();
