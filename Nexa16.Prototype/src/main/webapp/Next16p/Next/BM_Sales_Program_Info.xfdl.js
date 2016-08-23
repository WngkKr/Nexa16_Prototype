(function()
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
                obj.set_name("BM_Sales_Program_Info");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Grid("grdList","absolute","5","5",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"70\"/><Column size=\"139\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"고객사\"/><Cell col=\"1\" rowspan=\"2\" text=\"프로젝트\"/><Cell col=\"2\" rowspan=\"2\" text=\"영업대표\"/><Cell col=\"3\" rowspan=\"2\" text=\"계약일자\"/><Cell col=\"4\" colspan=\"3\" text=\"매출\" background-color=\"mediumvioletred\"/><Cell col=\"7\" colspan=\"3\" text=\"매입\" background-color=\"cornflowerblue\"/><Cell col=\"10\" rowspan=\"2\" text=\"예상율\"/><Cell col=\"11\" colspan=\"3\" text=\"투입예정\"/><Cell row=\"1\" col=\"4\" text=\"매출계약처\" background-color=\"mediumvioletred\"/><Cell row=\"1\" col=\"5\" text=\"매출내역\" background-color=\"mediumvioletred\"/><Cell row=\"1\" col=\"6\" text=\"예상금액\" background-color=\"mediumvioletred\"/><Cell row=\"1\" col=\"7\" text=\"매입계약처\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"8\" text=\"매입내역\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"9\" text=\"예상금액\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"11\" text=\"인원\"/><Cell row=\"1\" col=\"12\" text=\"기간\"/><Cell row=\"1\" col=\"13\" text=\"월\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/><Cell col=\"10\"/><Cell col=\"11\"/><Cell col=\"12\"/><Cell col=\"13\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","5",null,"35","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","34","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("기간");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("CalFrom","absolute","35","5","84","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
                obj.set_type("spin");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","120","5","34","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("CalTo","absolute","131","5","84","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
                obj.set_type("spin");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","224","5","45","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edt_project","absolute","266","5","128","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chb_sales_all","absolute","406","5","153","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("영업대표전체대상");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chb_EstRate","absolute","540","5","113","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("예상율반영");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkAll","absolute","635","5","60","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("전체");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkPreSales","absolute","686","5","80","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("PreSales");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkSooju","absolute","763","5","60","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("수주");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkContract","absolute","818","5","52","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("계약");
            });
            this.Div00.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.grdList.set_topbase("Div00.bottom");
            this.grdList.set_leftbase("");
            this.grdList.set_bottombase("");
            this.grdList.set_rightbase("");
            this.grdList.set_widthbase("");
            this.grdList.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.CalFrom.set_leftbase("");
            this.Div00.form.CalFrom.set_topbase("");
            this.Div00.form.CalFrom.set_bottombase("");
            this.Div00.form.CalFrom.set_rightbase("");
            this.Div00.form.CalFrom.set_widthbase("");
            this.Div00.form.CalFrom.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.CalTo.set_leftbase("");
            this.Div00.form.CalTo.set_topbase("");
            this.Div00.form.CalTo.set_bottombase("");
            this.Div00.form.CalTo.set_rightbase("");
            this.Div00.form.CalTo.set_widthbase("");
            this.Div00.form.CalTo.set_heightbase("");
            this.Div00.form.Static02.set_leftbase("");
            this.Div00.form.Static02.set_topbase("");
            this.Div00.form.Static02.set_bottombase("");
            this.Div00.form.Static02.set_rightbase("");
            this.Div00.form.Static02.set_widthbase("");
            this.Div00.form.Static02.set_heightbase("");
            this.Div00.form.edt_project.set_leftbase("");
            this.Div00.form.edt_project.set_topbase("");
            this.Div00.form.edt_project.set_bottombase("");
            this.Div00.form.edt_project.set_rightbase("");
            this.Div00.form.edt_project.set_widthbase("");
            this.Div00.form.edt_project.set_heightbase("");
            this.Div00.form.chb_sales_all.set_leftbase("");
            this.Div00.form.chb_sales_all.set_topbase("");
            this.Div00.form.chb_sales_all.set_bottombase("");
            this.Div00.form.chb_sales_all.set_rightbase("");
            this.Div00.form.chb_sales_all.set_widthbase("");
            this.Div00.form.chb_sales_all.set_heightbase("");
            this.Div00.form.chb_EstRate.set_leftbase("");
            this.Div00.form.chb_EstRate.set_topbase("");
            this.Div00.form.chb_EstRate.set_bottombase("");
            this.Div00.form.chb_EstRate.set_rightbase("");
            this.Div00.form.chb_EstRate.set_widthbase("");
            this.Div00.form.chb_EstRate.set_heightbase("");
            this.Div00.form.chkAll.set_leftbase("");
            this.Div00.form.chkAll.set_topbase("");
            this.Div00.form.chkAll.set_bottombase("");
            this.Div00.form.chkAll.set_rightbase("");
            this.Div00.form.chkAll.set_widthbase("");
            this.Div00.form.chkAll.set_heightbase("");
            this.Div00.form.chkPreSales.set_leftbase("");
            this.Div00.form.chkPreSales.set_topbase("");
            this.Div00.form.chkPreSales.set_bottombase("");
            this.Div00.form.chkPreSales.set_rightbase("");
            this.Div00.form.chkPreSales.set_widthbase("");
            this.Div00.form.chkPreSales.set_heightbase("");
            this.Div00.form.chkSooju.set_leftbase("");
            this.Div00.form.chkSooju.set_topbase("");
            this.Div00.form.chkSooju.set_bottombase("");
            this.Div00.form.chkSooju.set_rightbase("");
            this.Div00.form.chkSooju.set_widthbase("");
            this.Div00.form.chkSooju.set_heightbase("");
            this.Div00.form.chkContract.set_leftbase("");
            this.Div00.form.chkContract.set_topbase("");
            this.Div00.form.chkContract.set_bottombase("");
            this.Div00.form.chkContract.set_rightbase("");
            this.Div00.form.chkContract.set_widthbase("");
            this.Div00.form.chkContract.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",900,648,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("BM_Sales_Program_Info.xfdl", function() {
        /************************************************************************
         * 전역변수선언
         ************************************************************************/
        	var objDateYYYY = new Date();
        	var sYear = objDateYYYY.getFullYear().toString();
        	var objDateMM = new Date();
        	var sMonth = objDateMM.getMonth().toString();

        /************************************************************************
         * BM_Sales_Program_Info FORM ONLOAD
         ************************************************************************/
        this.Form_onload = function(obj,e)
        {
        	/*디폴트 날짜 세팅*/
        	this.Div00.form.CalFrom.set_value(sYear+sMonth);
        	this.Div00.form.CalTo.set_value(sYear+sMonth);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
        };

        this.loadIncludeScript("BM_Sales_Program_Info.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
