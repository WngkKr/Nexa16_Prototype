(function()
{
    return function()
    {
        // Theme, Component URI Setting
        this._theme_uri = "./_theme_/";
        this._globalvar_uri = "globalvars.xml";
        this.loadTypedefition = function()
        {
            // this._addService(prefixid, type, url, cachelevel, codepage, language, version, communication);
            this._addService("default_typedef.xml", "IjectJS", "file", "./nexacro14lib/component/IjectJS", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "nexacro14lib.component", "file", "./nexacro14lib/component", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "nexacro14lib.framework", "file", "./nexacro14lib/framework/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "nexacro14lib.resources", "file", "./nexacro14lib/resources/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "svcurl", "JSP", "http://localhost:8080/nexacro-egov/", "none", null, "", "0", "0");
            this._addService("default_typedef.xml", "Css", "file", "./Css/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "img", "file", "./img/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Frame", "form", "./Frame/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Lib", "js", "./Lib/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Install", "file", "./Install/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Template", "form", "./Template/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Sample", "form", "./Sample/", "dynamic", null, "", "0", "0");
            this._addService("default_typedef.xml", "Test", "form", "./Test/", "session", null, "", "0", "0");
            this._addService("default_typedef.xml", "Pattern", "form", "./Pattern/", "dynamic", null, "", "0", "0");

            this._component_uri = (this._arg_compurl ? this._arg_compurl : "./nexacro14lib/component/");
            // load components
            var registerclass = [
            		{"id":"Div", "classname":"nexacro.Div", "type":"JavaScript"},
            		{"id":"Button", "classname":"nexacro.Button", "type":"JavaScript"},
            		{"id":"PopupDiv", "classname":"nexacro.PopupDiv", "type":"JavaScript"},
            		{"id":"Combo", "classname":"nexacro.Combo", "type":"JavaScript"},
            		{"id":"CheckBox", "classname":"nexacro.CheckBox", "type":"JavaScript"},
            		{"id":"ListBox", "classname":"nexacro.ListBox", "type":"JavaScript"},
            		{"id":"Edit", "classname":"nexacro.Edit", "type":"JavaScript"},
            		{"id":"MaskEdit", "classname":"nexacro.MaskEdit", "type":"JavaScript"},
            		{"id":"TextArea", "classname":"nexacro.TextArea", "type":"JavaScript"},
            		{"id":"Menu", "classname":"nexacro.Menu", "type":"JavaScript"},
            		{"id":"Tab", "classname":"nexacro.Tab", "type":"JavaScript"},
            		{"id":"ImageViewer", "classname":"nexacro.ImageViewer", "type":"JavaScript"},
            		{"id":"Radio", "classname":"nexacro.Radio", "type":"JavaScript"},
            		{"id":"Calendar", "classname":"nexacro.Calendar", "type":"JavaScript"},
            		{"id":"Static", "classname":"nexacro.Static", "type":"JavaScript"},
            		{"id":"Grid", "classname":"nexacro.Grid", "type":"JavaScript"},
            		{"id":"Spin", "classname":"nexacro.Spin", "type":"JavaScript"},
            		{"id":"PopupMenu", "classname":"nexacro.PopupMenu", "type":"JavaScript"},
            		{"id":"GroupBox", "classname":"nexacro.GroupBox", "type":"JavaScript"},
            		{"id":"ProgressBar", "classname":"nexacro.ProgressBar", "type":"JavaScript"},
            		{"id":"Plugin", "classname":"nexacro.Plugin", "type":"JavaScript"},
            		{"id":"Dataset", "classname":"nexacro.NormalDataset", "type":"JavaScript"},
            		{"id":"FileUpload", "classname":"nexacro.FileUpload", "type":"JavaScript"},
            		{"id":"ExtFileUpload", "classname":"nexacro.ExtFileUpload", "type":"JavaScript"},
            		{"id":"ExtFileDownload", "classname":"nexacro.ExtFileDownload", "type":"JavaScript"}
            ];
            this._addClasses(registerclass);
        };
        
        this.on_loadGlobalVariables = function()
        {
            // global variable
            this._addVariable("gv_host", "http://localhost/", false);
            this._addVariable("gv_userAuth", "admin", false);
            this._addVariable("gv_openOnlyOne", "true", false);
            this._addVariable("gv_loadCnt", "0", false);

            // global image

            // global dataset
            var obj = null;
            obj = new Dataset("gds_menu", this);
            obj._setContents("<ColumnInfo><Column id=\"MENU_NAME\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_SEQ\" type=\"int\" size=\"4\" prop=\"\"/><Column id=\"MENU_OPTP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"PAGE_URL\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_TOP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_ID\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_GRP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"CREATE_DT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_LEVEL\" type=\"int\" size=\"4\" prop=\"\"/><Column id=\"PAGE_ID\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"PAGE_NAME\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_ARGS\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_STAT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"CREATE_USER\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"UPDATE_DT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"UPDATE_USER\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_DESC\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_AUTH\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_NAME\">화면유형</Col><Col id=\"MENU_SEQ\">0</Col><Col id=\"MENU_ID\">1000</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120831000000000</Col><Col id=\"UPDATE_USER\">admin</Col></Row><Row><Col id=\"MENU_NAME\">Single Detail</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_01.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1001</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_01.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col><Col id=\"MENU_AUTH\">R</Col></Row><Row><Col id=\"MENU_NAME\">Multi Detail</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_02.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1002</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_02.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col><Col id=\"MENU_AUTH\">R</Col></Row><Row><Col id=\"MENU_NAME\">Excel Export&amp;Import</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_03.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1003</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_03.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col></Row><Row><Col id=\"MENU_NAME\">File Up&amp;Down(Eco)</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_04.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1004</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_04.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col></Row><Row><Col id=\"MENU_NAME\">CRUD샘플</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_05.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1005</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_05.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col></Row><Row><Col id=\"MENU_NAME\">PAGING샘플</Col><Col id=\"MENU_SEQ\">1</Col><Col id=\"MENU_OPTP\">MAIN</Col><Col id=\"PAGE_URL\">Pattern::Pattern_06.xfdl</Col><Col id=\"MENU_TOP\">1000</Col><Col id=\"MENU_ID\">1006</Col><Col id=\"MENU_GRP\">1000</Col><Col id=\"CREATE_DT\">20120831000000000</Col><Col id=\"MENU_LEVEL\">1</Col><Col id=\"PAGE_ID\">Pattern_06.xfdl</Col><Col id=\"PAGE_NAME\">사용자 그룹관리</Col><Col id=\"MENU_ARGS\">admin</Col><Col id=\"MENU_STAT\">VIEW</Col><Col id=\"CREATE_USER\">admin</Col><Col id=\"UPDATE_DT\">20120905000000000</Col><Col id=\"UPDATE_USER\">admin</Col><Col id=\"MENU_DESC\">II</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_openMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"WIN_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"TITLE\" type=\"STRING\" size=\"256\"/><Column id=\"Desc_Url\" type=\"STRING\" size=\"256\"/><Column id=\"Desc_Url_ko\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_message", this);
            obj._setContents("<ColumnInfo><Column id=\"MSG_CD\" type=\"string\" size=\"32\"/><Column id=\"MSG_TYPE\" type=\"string\" size=\"32\"/><Column id=\"MSG_NM\" type=\"string\" size=\"32\"/><Column id=\"MSG_NOTE\" type=\"string\" size=\"32\"/></ColumnInfo><Rows><Row><Col id=\"MSG_CD\">fail.common.msg</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">error ocurred!</Col></Row><Row><Col id=\"MSG_CD\">fail.common.sql</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">sql error ocurred! error code: {0}, error msg: {1}</Col></Row><Row><Col id=\"MSG_CD\">info.nodata.msg</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">no data found.</Col></Row><Row><Col id=\"MSG_CD\">image.errorBg</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">error_en</Col></Row><Row><Col id=\"MSG_CD\">errors.required</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} is required.</Col></Row><Row><Col id=\"MSG_CD\">accounting.hgr_store_credit.amount.error</Col><Col id=\"MSG_TYPE\">AC</Col><Col id=\"MSG_NM\">HGR Store Credit does not have to remove.</Col></Row><Row><Col id=\"MSG_CD\">success.insert</Col><Col id=\"MSG_TYPE\">PU</Col><Col id=\"MSG_NM\">Transaction has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">success.update</Col><Col id=\"MSG_TYPE\">PU</Col><Col id=\"MSG_NM\">Transaction has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">success.delete</Col><Col id=\"MSG_TYPE\">PU</Col><Col id=\"MSG_NM\">Transaction has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">success.select</Col><Col id=\"MSG_TYPE\">PU</Col><Col id=\"MSG_NM\">Transaction has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">transaction.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Transaction has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">comm.select.message</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please select {0}</Col></Row><Row><Col id=\"MSG_CD\">comm.list.select.message</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please select from the list.</Col></Row><Row><Col id=\"MSG_CD\">success.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">comm.select.not.found</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">There is no data.</Col></Row><Row><Col id=\"MSG_CD\">comm.input.message</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please enter {0}</Col></Row><Row><Col id=\"MSG_CD\">comm.validation.message</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} is invalid.</Col></Row><Row><Col id=\"MSG_CD\">comm.print.barcode</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Want to print bar codes?</Col></Row><Row><Col id=\"MSG_CD\">main.title</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">:: HGR Industrial Surplus - We Buy  Everything! ::</Col></Row><Row><Col id=\"MSG_CD\">main.negotiation</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Looks back on 30 minutes after</Col></Row><Row><Col id=\"MSG_CD\">error.incorrect</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} is incorrect</Col></Row><Row><Col id=\"MSG_CD\">comm.button.message</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please click the {0} button.</Col></Row><Row><Col id=\"MSG_CD\">comm.data.check_status</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">The status of data has changed.</Col></Row><Row><Col id=\"MSG_CD\">comm.success.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} has been completed successfully.</Col></Row><Row><Col id=\"MSG_CD\">comm.register</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please save {0} information.</Col></Row><Row><Col id=\"MSG_CD\">comm.already.registered</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">{0} already exists.</Col></Row><Row><Col id=\"MSG_CD\">comm.register.fail</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Failed to register. Please try again.</Col></Row><Row><Col id=\"MSG_CD\">common.date.input</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Please enter date.</Col></Row><Row><Col id=\"MSG_CD\">success.inspection.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Inspection has been completed</Col></Row><Row><Col id=\"MSG_CD\">success.bid.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Bid has been completed</Col></Row><Row><Col id=\"MSG_CD\">success.createoffer.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Create Offer has been completed</Col></Row><Row><Col id=\"MSG_CD\">success.po.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">PO has been completed</Col></Row><Row><Col id=\"MSG_CD\">success.revised.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Revised Offer has been completed</Col></Row><Row><Col id=\"MSG_CD\">success.exception.complete</Col><Col id=\"MSG_TYPE\">CO</Col><Col id=\"MSG_NM\">Exception has been completed</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;

            obj = new Dataset("gds_userInfo", this);
            obj._setContents("<ColumnInfo><Column id=\"USER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"USER_ID\"/><Col id=\"USER_NM\"/></Row></Rows>");
            this._addDataset(obj.name, obj);
            obj = null;


            

        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("packageB");
            this.set_version("");
            this.set_tracemode("");
            this.set_themeid("default.xtheme");
            this.set_filesecurelevel("0");
            this.set_networksecurelevel("0");

            if (this._is_attach_childframe)
            	return;

            // frame
            var mainframe = this.createMainFrame("mainframe", "absolute", "0", "0", "1302", "875", null, null, this);
            mainframe.set_resizable("true");
            mainframe.set_showtitlebar("true");
            mainframe.set_showstatusbar("false");
            mainframe.set_titletext("Design Package BType");
            mainframe.style.set_icon("URL('img::nexacro.ico')");
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;

            // tray
            var tray = null;

        };
        

        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("childframe", "absolute", null, null, null, null, null, null, "", this);
            this.addChild(obj.name, obj);
            this.frame = obj;
            obj.set_formurl(application._quickview_formurl);
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");
            obj = null;
        };
        
        this.on_initEvent = function()
        {

        };
        
        // screeninfo
        this.loadScreenInfo = function()
        {

        }
        
        // script Compiler
        this.registerScript("packageB.xadl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : 
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : 
        *------------------------------------------------------------------
        * MODIFY DATE   PROGRAMMER			DESCRIPTION
        *------------------------------------------------------------------
        * 
        *------------------------------------------------------------------
        ***********************************************************************************/

        /**
         * Application 최초 로딩시 발생하는 이벤트 
         * @return
         * @example
         * @memberOf Global
         */
        this.application_onload = function(obj,e)
        {
           //초기 application onload setting
            Iject.appOnload(obj);            
        }

        

        

        
        
        });


        this.loadTypedefition();
        this.loadScreenInfo();
        this.loadTheme("default.xtheme");

this.loadCss("Css::MainFrame.css");
this.loadCss("Css::LeftFrame.css");
this.loadCss("Css::MDIFrame.css");
this.loadCss("Css::TopFrame.css");
this.loadCss("Css::WorkFrame.css");
this.loadCss("Css::Login.css");

    };
}
)();
