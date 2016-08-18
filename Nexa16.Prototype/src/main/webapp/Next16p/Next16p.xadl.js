(function()
{
    return function()  {
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
                mainframe.set_showtitlebar("true");
                mainframe.set_showstatusbar("false");
                mainframe.set_titletext("LeftTopFrame");
                mainframe.set_showtitleicon("true");
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
            var frame0 = new HFrameSet("HFrameSet","absolute",null,null,null,null,null,null,this);
            frame0._setPropInitFunc(function (frame0)
            {
                frame0.set_separatesize("200,*");
                frame0.set_showtitlebar("false");
                frame0.set_showtitleicon("false");
                frame0.set_showcascadetitletext("false");
            });
            this.addChild(frame0.name, frame0);
            this.frame=frame0;

            var frame1 = new ChildFrame("LeftFrame","absolute",null,null,null,null,null,null,"Frame::Frame_Left.xfdl",frame0);
            frame1._setPropInitFunc(function (frame1)
            {
                frame1.set_showtitlebar("false");
                frame1.set_showstatusbar("false");
                frame1.set_showcascadetitletext("false");
                frame1.set_showtitleicon("false");
            });
            frame0.addChild(frame1.name, frame1);
            frame1.set_formurl("Frame::Frame_Left.xfdl");


            var frame2 = new VFrameSet("VFrameSet","absolute",null,null,null,null,null,null,frame0);
            frame2._setPropInitFunc(function (frame2)
            {
                frame2.set_separatesize("35,*");
                frame2.set_showcascadetitletext("false");
                frame2.set_showtitleicon("false");
                frame2.set_showtitlebar("false");
            });
            frame0.addChild(frame2.name, frame2);

            var frame3 = new ChildFrame("TopFrame","absolute",null,null,null,null,null,null,"Frame::Frame_Top.xfdl",frame2);
            frame3._setPropInitFunc(function (frame3)
            {
                frame3.set_showtitlebar("false");
                frame3.set_showstatusbar("false");
                frame3.set_showcascadetitletext("false");
                frame3.set_showtitleicon("false");
            });
            frame2.addChild(frame3.name, frame3);
            frame3.set_formurl("Frame::Frame_Top.xfdl");


            var frame4 = new VFrameSet("VFrameSet1","absolute",null,null,null,null,null,null,frame2);
            frame4._setPropInitFunc(function (frame4)
            {
                frame4.set_separatesize("33,*");
                frame4.set_showtitleicon("false");
                frame4.set_showtitlebar("false");
                frame4.set_showcascadetitletext("false");
            });
            frame2.addChild(frame4.name, frame4);

            var frame5 = new ChildFrame("TabFrame","absolute",null,null,null,null,null,null,"Frame::Frame_Tab.xfdl",frame4);
            frame5._setPropInitFunc(function (frame5)
            {
                frame5.set_showcascadetitletext("false");
                frame5.set_showtitleicon("false");
                frame5.set_showtitlebar("false");
            });
            frame4.addChild(frame5.name, frame5);
            frame5.set_formurl("Frame::Frame_Tab.xfdl");


            var frame6 = new FrameSet("WorkFrameSet","absolute",null,null,null,null,null,null,frame4);
            frame6._setPropInitFunc(function (frame6)
            {
                frame6.set_showcascadetitletext("false");
                frame6.set_showtitleicon("false");
                frame6.set_showtitlebar("false");
            });
            frame4.addChild(frame6.name, frame6);
        };
        
        this.on_initEvent = function()
        {

        };
        
        // script Compiler
        this.registerScript("Next16p.xadl", function() {
        /******************************************************************************************
        전역변수선언
        ******************************************************************************************/
        var objApp = nexacro.getApplication(); //application
        /******************************************************************************************
        application on load
        ******************************************************************************************/
        this.Application_onload = function(obj,e)
        {
        	trace("application on load");
        };
        /******************************************************************************************
        gfn_openForm
        ******************************************************************************************/
        this.gfn_openForm = function (sID,sURL)
        {
        	var objFrame = objApp.mainframe.HFrameSet.VFrameSet.VFrameSet1.WorkFrameSet;	//workFrameSet
        	var objTop 	= objApp.mainframe.HFrameSet.VFrameSet.VFrameSet1.TabFrame;         //Top(Tab영역)

        	var arrObj = objFrame.all;
        	for(var i=0; i<arrObj.length; i++)
        	{
        		if(arrObj[i].name == sID){
        			arrObj[i].setFocus();
        			this.gfn_tabSelect(sID);
        			return;
        		}
        	}

        	var objChildFrame = new ChildFrame(sID, "absolute", 0, 0, 1078, 810);
        	objChildFrame.set_formurl(sURL);

        	objFrame.addChild(sID, objChildFrame);
        	objChildFrame.set_showcascadetitletext(false);
        	objChildFrame.set_showstatusbar(false);
        	objChildFrame.set_showtitlebar(false);
        	objChildFrame.set_showtitleicon(false);

        	objChildFrame.show();

        	/*tab page 생성*/
        	objTop.form.TabMenu.insertTabpage(sID, 0, "", sID);
        };
        /****************************************************************
        	active tab change
        *****************************************************************/
        this.gfn_tabSelect = function(sID)
        {
        	var objTop 	= objApp.mainframe.HFrameSet.VFrameSet.VFrameSet1.TabFrame;         //Top(Tab영역)
        	var arrTab 	= objTop.form.TabMenu.tabpages;

        	for( var i=0; i<arrTab.length;i++)
        	{
        		if(arrTab[i].name == sID)
        		{
        			objTop.form.TabMenu.set_tabindex(i);
        			return;
        		}
        	}
        };
        });

        this.checkLicense("");
        
        this.loadPreloadList();

        this.loadIncludeScript("Next16p.xadl");
    };
}
)();
