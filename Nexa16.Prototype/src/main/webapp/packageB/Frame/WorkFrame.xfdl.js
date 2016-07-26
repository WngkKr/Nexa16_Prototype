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
                this._setFormPosition(0,0,1050,818);
            }
            this.style.set_background("white");

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static02", "absolute", "0", "0", "20", "818", null, null, this);
            obj.set_taborder("0");
            obj.set_visible("false");
            obj.style.set_background("#74cfdcff");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "1063", "-1", "33", "22", null, null, this);
            obj.set_taborder("2");
            obj.set_text("h16");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "0", "939", "33", "22", null, null, this);
            obj.set_taborder("3");
            obj.set_text("w20");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Div("div_WorkTitle", "absolute", "20", "16", null, "36", "0", null, this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Div("div_Work", "absolute", "20", "52", null, null, "10", "0", this);
            obj.set_taborder("5");
            obj.style.set_background("transparent");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "98.48%", "0", null, "818", "0%", null, this);
            obj.set_taborder("6");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "2%", "1008", null, "20", "1.43%", null, this);
            obj.set_taborder("7");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Div("div_title", "absolute", "20", "16", null, "36", "11", null, this);
            obj.set_taborder("8");
            obj.set_url("Frame::WorkTitle.xfdl");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1050, 818, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("WorkFrame");
            		p.style.set_background("white");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl", "Frame::WorkTitle.xfdl");
        };
        
        // User Script
        this.addIncludeScript("WorkFrame.xfdl", "Lib::Comm.xjs");
        this.registerScript("WorkFrame.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : WorkFrame.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : WorkFrame
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

        
        /***********************************************************************************
        * Form Event
        ***********************************************************************************/
        /**
         * form onload 함수
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_onload = function(obj,e)
        {
        	//넘어온 아규먼트 셋팅
        	Iject.Mdi.setOwnFrameArgu(this);
        	// form로딩시 화면에 표시할 page URL 설정
        	this.div_Work.set_url(Iject.$["w_pageurl"]);
        	this.div_Work.resetScroll();
        	 this.fn_onsize();
        }

        /**
         * workFrame_onactivate event
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.workFrame_onactivate = function(obj,e)
        {
         	var winKey = Iject.$["workFrame"].getActiveFrame().name; 	
           	    Iject.$["workFrame"].frames[winKey].setFocus();
        	var gRow = application.gds_openMenu.findRow('WIN_ID', winKey);
        	var menuId = application.gds_openMenu.getColumn(gRow, "MENU_ID");
        	var lRow = Iject.$["leftFrame"].form.ds_menu.findRow("MENU_ID", menuId);	
            var sTitle = application.gds_openMenu.getColumn(gRow, "TITLE");  
            this.div_title.Static50.set_text(sTitle);
            
        	Iject.$["leftFrame"].form.ds_menu.set_enableevent(false);
        	Iject.$["leftFrame"].form.ds_menu.set_rowposition(lRow);
        	Iject.$["leftFrame"].form.ds_menu.set_enableevent(true);
        	Iject.$["gds_openmenu"].set_rowposition(gRow);
            this.div_Work.resetScroll();
        }

        /**
         * workFrame_onclose event
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.workFrame_onclose = function(obj,e)
        {
           var winId = Iject.$["workFrame"].getActiveFrame().name; 
            Iject.$["workFrame"].frames[winId].destroy();
        }

        /**
         * work resize function
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_onsize = function()
        {
            //width size resize
            if(this.width > 1066)
            {
                 this.div_Work.set_right(10);
            }  
            else
            {
               this.div_Work.set_width(1067);
            }
            
            //height size resize
            if(this.height > 774)
            {
                this.div_Work.set_bottom(0);
            }  
            else
            {
                this.div_Work.set_height(774);
            }
            
            this.resetScroll();
            this.div_Work.resetScroll();
        }

        /**
         * work resize event
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.WorkFrame_onsize = function(obj,e)
        {
        	this.fn_onsize();
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.fn_onload, this);
            this.addEventHandler("onactivate", this.workFrame_onactivate, this);
            this.addEventHandler("onclose", this.workFrame_onclose, this);
            this.addEventHandler("onsize", this.WorkFrame_onsize, this);

        };

        this.loadIncludeScript("WorkFrame.xfdl");
        this.loadPreloadList();
       
    };
}
)();
