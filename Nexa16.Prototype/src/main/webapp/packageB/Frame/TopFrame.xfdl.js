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
                this.set_name("TopFrame");
                this.set_classname("TopFrame");
                this._setFormPosition(0,0,1050,30);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "0", "0", null, "30", "0", null, this);
            obj.set_taborder("0");
            obj.set_cssclass("sta_TF_TopBg");
            this.addChild(obj.name, obj);

            obj = new Button("btn_leftMenuOpen", "absolute", "0", "0", "34", "29", null, null, this);
            obj.set_taborder("1");
            obj.set_cssclass("btn_TF_LeftMenuOpen");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", null, "0", "67", "29", "45", null, this);
            obj.set_taborder("3");
            obj.set_cssclass("btn_TF_Logout");
            obj.set_text("Log-out");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", null, "0", "45", "29", "0", null, this);
            obj.set_taborder("4");
            obj.set_text("Help");
            obj.set_cssclass("btn_TF_Admin");
            this.addChild(obj.name, obj);

            obj = new Static("stNm", "absolute", null, "0", "157", "29", "112", null, this);
            obj.set_taborder("5");
            obj.set_cssclass("sta_TF_Admin");
            obj.set_usedecorate("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "44", "53", "406", "22", null, null, this);
            obj.set_taborder("6");
            obj.set_text("<---- Left Menu Open Button (class : btn_TF_LeftMenuOpen)");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1050, 30, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("TopFrame");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("TopFrame.xfdl", "Lib::Comm.xjs");
        this.registerScript("TopFrame.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : TopFrame.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : TopFrame
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
        }

        
        //left 펼침 접힘 실행
        this.btn_leftMenuOpen_onclick = function(obj,e)
        {
           Iject.Mdi.leftMenuAction(this,obj);
           
        }

        //logout
        this.fn_logout = function(obj,e)
        {
        	Iject.logout();
        }

        this.fn_set = function()
        {

           this.stNm.set_text(Iject.$["usernm"] + " <b v='false'>님 환영합니다.</b>");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.fn_onload, this);
            this.btn_leftMenuOpen.addEventHandler("onclick", this.btn_leftMenuOpen_onclick, this);
            this.Button02.addEventHandler("onclick", this.fn_logout, this);

        };

        this.loadIncludeScript("TopFrame.xfdl");

       
    };
}
)();
