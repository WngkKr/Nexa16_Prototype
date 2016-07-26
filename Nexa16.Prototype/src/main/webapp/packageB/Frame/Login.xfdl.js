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
                this.set_name("Login");
                this.set_classname("Login");
                this.set_titletext("Login");
                this.set_scrollbars("none");
                this._setFormPosition(0,0,450,290);
            }
            this.style.set_background("transparent");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsLogin", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"USER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PASSWORD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"USER_ID\">test</Col><Col id=\"PASSWORD\">test123</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("dsService", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"SVC_ID\" type=\"STRING\" size=\"100\"/><Column id=\"QUERY_LIST\" type=\"STRING\" size=\"256\"/><Column id=\"SERVICE\" type=\"STRING\" size=\"100\"/><Column id=\"IN_DATASET_LIST\" type=\"STRING\" size=\"256\"/><Column id=\"OUT_DATASET_LIST\" type=\"STRING\" size=\"256\"/><Column id=\"CONTROLLER\" type=\"STRING\" size=\"512\"/><Column id=\"CALLBACK\" type=\"STRING\" size=\"100\"/><Column id=\"SYNC_YN\" type=\"STRING\" size=\"1\"/></ColumnInfo><Rows><Row><Col id=\"SVC_ID\">login</Col><Col id=\"IN_DATASET_LIST\">inDataset=dsLogin</Col><Col id=\"OUT_DATASET_LIST\">gdsUser=gdsUser</Col><Col id=\"CONTROLLER\">xpQueryLogin.do</Col><Col id=\"CALLBACK\">fn_callBack</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_user", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"GROUP_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_login", "absolute", "0", "0", "450", "291", null, null, this);
            obj.set_taborder("0");
            obj.style.set_background("transparent URL('img::Login_bg.png')");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "88.24%", "7", null, "30", "1.76%", null, this.div_login);
            obj.set_taborder("15");
            obj.style.set_background("transparent");
            obj.style.set_border("0 none #999999ff");
            this.div_login.addChild(obj.name, obj);
            obj = new Edit("txt_userId", "absolute", "103", "136", "193", "35", null, null, this.div_login);
            obj.set_taborder("16");
            obj.set_displaynulltext("User ID");
            obj.set_value("admin");
            this.div_login.addChild(obj.name, obj);
            obj = new Edit("txt_userPwd", "absolute", "103", "170", "193", "35", null, null, this.div_login);
            obj.set_taborder("17");
            obj.set_displaynulltext("Password");
            obj.set_value("123");
            obj.set_password("true");
            this.div_login.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox00", "absolute", "23.11%", "211", null, "20", "43.56%", null, this.div_login);
            obj.set_taborder("18");
            obj.set_text("아이디저장");
            obj.set_cssclass("chk_Login_Id");
            this.div_login.addChild(obj.name, obj);
            obj = new Button("btn_login", "absolute", null, "136", "60", "69", "90", null, this.div_login);
            obj.set_taborder("19");
            obj.set_cssclass("btn_Login_Login");
            this.div_login.addChild(obj.name, obj);
            obj = new Button("btn_close", "absolute", null, "15", "17", "17", "15", null, this.div_login);
            obj.set_taborder("20");
            obj.set_visible("false");
            obj.set_cssclass("btn_Login_Close");
            this.div_login.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 553, 321, this.div_login,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.style.set_background("transparent URL('img::Login_bg.png')");
            		p.set_scrollbars("none");

            	}
            );
            this.div_login.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 450, 290, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Login");
            		p.style.set_background("transparent");
            		p.set_titletext("Login");
            		p.set_scrollbars("none");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Login.xfdl", "Lib::Comm.xjs");
        this.registerScript("Login.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : Login.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : 로그인 화면
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
        this.form_onload = function (obj,e)
        {
        	if(nexacro.Browser == "Runtime") this.div_login.btn_close.set_visible(true);

        	Iject.formOnload(obj);
        	this.form_onsize();
        }

         
        /***********************************************************************************
        * User Function
        ***********************************************************************************/

        /**
        * form onsize
        * @return 
        * @example
        * @memberOf public
        */ 
        this.form_onsize = function()
        {
          	if(nexacro.Browser == "Runtime") return;

          	var nLeft = (application.mainframe.width / 2) - Math.round((this.div_login.getOffsetWidth()) / 2);
          	var nTop = (application.mainframe.height / 2) - Math.round((this.div_login.getOffsetHeight()) / 2);

        	if(nLeft <= 0)
        	{
        		this.div_login.setOffsetLeft(0);
        	}
        	else
        	{
            	this.div_login.setOffsetLeft(nLeft);
        		this.div_login.setOffsetTop(nTop);
        	}
        }

        
        /***********************************************************************************
        * Component Event
        ***********************************************************************************/
        this.btn_login_onclick = function(obj,e)
        {
            this.fn_login();
        }

        
        //login function
        this.fn_login = function()
        {
              application.gds_userInfo.setColumn(0,"USER_ID",this.div_login.txt_userId.value);
         	 application.gds_userInfo.setColumn(0,"USER_NM","관리자");
        	
        	
        	if(nexacro.Browser == "Runtime")
        	{
        		var oArgs = "close";
            	Iject.popClose(this,oArgs);

        	}
        	else
        	{
        	    Iject.setSeprateFrame();
        	}
        }

        
        /**
        * 프레임 open
        * @return 
        * @example
        * @memberOf public
        */ 

        this.fn_menuOpen = function()
        {
            gv_vFrameSet.set_separatesize("0,*,42");
            gv_workFrame.frames["MainForm"].setFocus();
        }

        
        this.Login_onsize = function(obj,e)
        {
             this.form_onsize(e.cx, e.cy);
        }

        this.fn_close = function(obj,e)
        {
        	application.exit();
        }

        this.div_login_btn_login_onkeyup = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.fn_login();
        	}
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.addEventHandler("onsize", this.Login_onsize, this);
            this.div_login.Button00.addEventHandler("onclick", this.fn_close, this);
            this.div_login.btn_login.addEventHandler("onclick", this.btn_login_onclick, this);
            this.div_login.btn_login.addEventHandler("onkeyup", this.div_login_btn_login_onkeyup, this);
            this.div_login.btn_close.addEventHandler("onclick", this.fn_close, this);

        };

        this.loadIncludeScript("Login.xfdl");

       
    };
}
)();
