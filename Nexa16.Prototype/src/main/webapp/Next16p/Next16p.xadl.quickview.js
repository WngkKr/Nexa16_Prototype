(function()
{
    return function()
    {
        // Theme, Component URI Setting
        this._theme_uri = "./_theme_/";
        this._appvar_uri = "appvariables.xml";
              
        this.on_loadAppVariables = function()
        {		
            var obj = null;
            
            // global dataset

            
            // global variable

            
            obj = null;
        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("Next16p");
            this.set_screenid("desktop_D");

            if (this._is_attach_childframe)
            	return;
            
            // frame
            var mainframe = this.createMainFrame("mainframe","absolute","0","0","1280","880",null,null,this);
            mainframe._setPropInitFunc(function (mainframe)
            {
                mainframe.set_showtitlebar("false");
                mainframe.set_showstatusbar("false");
                mainframe.set_titletext("LeftTopFrame");
                mainframe.set_showtitleicon("false");
                mainframe.set_showcascadetitletext("false");
            });
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;

            // tray

        };
        
        this.loadPreloadList = function()
        {

        };
        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("QuickViewFrame", "absolute", null, null, null, null, null, null, "", this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_showtitlebar("false");
                obj.set_showstatusbar("false");
            });

            this.addChild(obj.name, obj);

            obj.set_formurl(nexacro._quickview_formurl);

            this.frame = obj;
            
            obj = null;
        };
        
        this.on_initEvent = function()
        {
        };
        
        this.loadPreloadList();

    };
}
)();
