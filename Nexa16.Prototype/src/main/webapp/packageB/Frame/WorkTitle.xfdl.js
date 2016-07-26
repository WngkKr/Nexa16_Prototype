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
                this.set_name("WorkTitle");
                this.set_classname("WorkTitle");
                this._setFormPosition(0,0,1164,36);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static50", "absolute", "4", "7", "380", "21", null, null, this);
            obj.set_taborder("0");
            obj.set_cssclass("sta_WF_Title");
            obj.set_text("dsfdsafasfsadfdsaf");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1164, 36, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("WorkTitle");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("WorkTitle.xfdl", "Lib::Comm.xjs");
        this.registerScript("WorkTitle.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : WorkTitle.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : WorkTitle
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
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("WorkTitle.xfdl");

       
    };
}
)();
