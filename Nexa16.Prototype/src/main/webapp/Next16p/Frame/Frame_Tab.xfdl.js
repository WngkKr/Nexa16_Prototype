(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            if (Form == this.constructor)
            {
                this.set_name("Frame_Tab");
                this.set_titletext("New Form");
                this.set_background("whitesmoke");
                this._setFormPosition(0,0,1078,33);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Tab("TabMenu","absolute","0",null,null,"23","0","0",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_tabindex("0");
                obj.set_showextrabutton("true");
                obj.set_text("");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.TabMenu);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage1");
            });
            this.TabMenu.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.TabMenu);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage2");
            });
            this.TabMenu.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","562","1","503","28",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Static00");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.TabMenu.set_leftbase("");
            this.TabMenu.set_topbase("");
            this.TabMenu.set_bottombase("");
            this.TabMenu.set_rightbase("");
            this.TabMenu.set_widthbase("");
            this.TabMenu.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1078,33,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Frame_Tab.xfdl", function() {
        /******************************************************************************************
        전역변수선언
        ******************************************************************************************/
        var objApp = nexacro.getApplication(); //application
        var objFrame = objApp.mainframe.HFrameSet.VFrameSet.VFrameSet1.WorkFrameSet;	//workFrameSet
        /****************************************************************************
        Form Onload
        ****************************************************************************/
        this.Form_onload = function(obj,e)
        {
        	this.TabMenu.removeTabpage(1);
        	this.TabMenu.removeTabpage(0);
        	this.Static00.set_text("가로 : " + this.width + " 세로 : " + this.height);
        };
        /******************************************************************************************
        tab change event
        ******************************************************************************************/
        this.TabMenu_onchanged = function(obj,e)
        {
        	trace("tab on change");
        	var mainComp = objFrame.all;
        	var tIdx = e.postindex;
        	var winId = obj.tabpages[tIdx].name;
        	for( var i=0;i<mainComp.length;i++)
        	{
        		if(mainComp[i].name == winId)
        		{
        		//	mainComp[i].bringToFront(); //안됨
        			mainComp[i].setFocus();
        			return;
        		}
        	}
        };
        /******************************************************************************************
        tab 'X' button event
        ******************************************************************************************/
        this.TabMenu_onextrabuttonclick = function(obj,e)
        {
        	var tIdx = e.index;
        	var winId = obj.tabpages[tIdx].name;
        	var bSucc = obj.removeTabpage(tIdx);

        	if (bSucc == 0)
        	{
        		objFrame[winId].form.close();
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.TabMenu.addEventHandler("onchanged",this.TabMenu_onchanged,this);
            this.TabMenu.addEventHandler("onextrabuttonclick",this.TabMenu_onextrabuttonclick,this);
        };

        this.loadIncludeScript("Frame_Tab.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
