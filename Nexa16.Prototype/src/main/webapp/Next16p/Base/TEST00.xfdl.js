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
                this.set_name("BM_SaleProgram");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsTech1", this);
            obj._setContents("<ColumnInfo><Column id=\"구분\" type=\"STRING\" size=\"256\"/><Column id=\"요청일자\" type=\"STRING\" size=\"256\"/><Column id=\"고객사\" type=\"STRING\" size=\"256\"/><Column id=\"프로젝트명\" type=\"STRING\" size=\"256\"/><Column id=\"승인\" type=\"STRING\" size=\"256\"/><Column id=\"요청일\" type=\"STRING\" size=\"256\"/><Column id=\"시작일\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsTech2", this);
            obj._setContents("<ColumnInfo><Column id=\"고객\" type=\"STRING\" size=\"256\"/><Column id=\"접수일자\" type=\"STRING\" size=\"256\"/><Column id=\"프로젝트\" type=\"STRING\" size=\"256\"/><Column id=\"제목\" type=\"STRING\" size=\"256\"/><Column id=\"상태\" type=\"STRING\" size=\"256\"/><Column id=\"담당자\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSaleDtl", this);
            obj._setContents("<ColumnInfo><Column id=\"영업대표\" type=\"STRING\" size=\"256\"/><Column id=\"년월\" type=\"STRING\" size=\"256\"/><Column id=\"고객사\" type=\"STRING\" size=\"256\"/><Column id=\"프로젝트명\" type=\"STRING\" size=\"256\"/><Column id=\"계약명\" type=\"STRING\" size=\"256\"/><Column id=\"계약일자\" type=\"STRING\" size=\"256\"/><Column id=\"계산발행\" type=\"STRING\" size=\"256\"/><Column id=\"수금일자\" type=\"STRING\" size=\"256\"/><Column id=\"오픈일자\" type=\"STRING\" size=\"256\"/><Column id=\"계약금액\" type=\"STRING\" size=\"256\"/><Column id=\"판매수수료\" type=\"STRING\" size=\"256\"/><Column id=\"수수료외비용\" type=\"STRING\" size=\"256\"/><Column id=\"매입용역\" type=\"STRING\" size=\"256\"/><Column id=\"투비직원\" type=\"STRING\" size=\"256\"/><Column id=\"기술지원\" type=\"STRING\" size=\"256\"/><Column id=\"합계\" type=\"STRING\" size=\"256\"/><Column id=\"순매출\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Tab("Tab00","absolute","5","5",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_tabindex("0");
                obj.set_text("Tab00");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("영업현황");
                obj.set_url("Base::TEST03.xfdl");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("PreSales");
                obj.set_url("Base::BMSalesProgramPresales.xfdl");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage3",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("수주");
                obj.set_url("Base::BMSaleProgramSuju.xfdl");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage4",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("계약");
                obj.set_url("Base::BMSalesProgramContract.xfdl");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage5",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("기술지원");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","34","30",null,null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("기간");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","35","9","100","20",null,null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","136","4","34","30",null,null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("~");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","147","9","100","20",null,null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","42","120","30",null,null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("인력요청내역");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,"310","5",null,this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_binddataset("dsTech1");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"구분\"/><Cell col=\"1\" text=\"요청일자\"/><Cell col=\"2\" text=\"고객사\"/><Cell col=\"3\" text=\"프로젝트명\"/><Cell col=\"4\" text=\"승인\"/><Cell col=\"5\" text=\"요청일\"/><Cell col=\"6\" text=\"시작일\"/></Band><Band id=\"body\"><Cell text=\"bind:구분\"/><Cell col=\"1\" text=\"bind:요청일자\"/><Cell col=\"2\" text=\"bind:고객사\"/><Cell col=\"3\" text=\"bind:프로젝트명\"/><Cell col=\"4\" text=\"bind:승인\"/><Cell col=\"5\" text=\"bind:요청일\"/><Cell col=\"6\" text=\"bind:시작일\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","386","120",null,null,"5",this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("인력요청내역");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","5","349",null,null,"5","5",this.Tab00.Tabpage5.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_binddataset("dsTech2");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"고객\"/><Cell col=\"1\" text=\"접수일자\"/><Cell col=\"2\" text=\"프로젝트\"/><Cell col=\"3\" text=\"제목\"/><Cell col=\"4\" text=\"상태\"/><Cell col=\"5\" text=\"담당자\"/></Band><Band id=\"body\"><Cell text=\"bind:고객\"/><Cell col=\"1\" text=\"bind:접수일자\"/><Cell col=\"2\" text=\"bind:프로젝트\"/><Cell col=\"3\" text=\"bind:제목\"/><Cell col=\"4\" text=\"bind:상태\"/><Cell col=\"5\" text=\"bind:담당자\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage6",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("순매출상세");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Calendar("CalTo","absolute","131","8","84","22",null,null,this.Tab00.Tabpage6.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
            });
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","120","4","34","30",null,null,this.Tab00.Tabpage6.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("~");
            });
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Calendar("CalFrom","absolute","35","8","84","22",null,null,this.Tab00.Tabpage6.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
            });
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","34","30",null,null,this.Tab00.Tabpage6.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("기간");
            });
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage6.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_binddataset("dsSaleDtl");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"영업대표\"/><Cell col=\"1\" rowspan=\"2\" text=\"년월\"/><Cell col=\"2\" rowspan=\"2\" text=\"고객사\"/><Cell col=\"3\" rowspan=\"2\" text=\"프로젝트명\"/><Cell col=\"4\" rowspan=\"2\" text=\"계약명\"/><Cell col=\"5\" rowspan=\"2\" text=\"계약일자\"/><Cell col=\"6\" rowspan=\"2\" text=\"계산발행\"/><Cell col=\"7\" rowspan=\"2\" text=\"수금일자\"/><Cell col=\"8\" rowspan=\"2\" text=\"오픈일자\"/><Cell col=\"9\" rowspan=\"2\" text=\"계약금액\"/><Cell col=\"10\" colspan=\"6\" text=\"원가\"/><Cell col=\"16\" rowspan=\"2\" text=\"순매출\"/><Cell row=\"1\" col=\"10\" text=\"판매수수료\"/><Cell row=\"1\" col=\"11\" text=\"수수료외비용\"/><Cell row=\"1\" col=\"12\" text=\"매입용역\"/><Cell row=\"1\" col=\"13\" text=\"투비직원\"/><Cell row=\"1\" col=\"14\" text=\"기술지원\"/><Cell row=\"1\" col=\"15\" text=\"합계\"/></Band><Band id=\"body\"><Cell text=\"bind:영업대표\"/><Cell col=\"1\" text=\"bind:년월\"/><Cell col=\"2\" text=\"bind:고객사\"/><Cell col=\"3\" text=\"bind:프로젝트명\"/><Cell col=\"4\" text=\"bind:계약명\"/><Cell col=\"5\" text=\"bind:계약일자\"/><Cell col=\"6\" text=\"bind:계산발행\"/><Cell col=\"7\" text=\"bind:수금일자\"/><Cell col=\"8\" text=\"bind:오픈일자\"/><Cell col=\"9\" text=\"bind:계약금액\"/><Cell col=\"10\" text=\"bind:판매수수료\"/><Cell col=\"11\" text=\"bind:수수료외비용\"/><Cell col=\"12\" text=\"bind:매입용역\"/><Cell col=\"13\" text=\"bind:투비직원\"/><Cell col=\"14\" text=\"bind:기술지원\"/><Cell col=\"15\" text=\"bind:합계\"/><Cell col=\"16\" text=\"bind:순매출\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage7",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("프리/컨설팅");
                obj.set_url("Base::BMProjectTech.xfdl");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Button("btnClose","absolute",null,"5","50","30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnPrint","absolute",null,"5","50","30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("프린트");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnExcel","absolute",null,"5","50","30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("엑셀");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSearch","absolute",null,"5","50","30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("엑셀");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSiteMg","absolute","5","18","100","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("사이트관리");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnImpSale","absolute","-39","18","100","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("금월중요영업건");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnImpSale00","absolute","208","18","80","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("주간보고");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","290","17","94","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","388","-3","120","60",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("영업대표");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","443","16","150","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("Combo01");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Tab00.set_leftbase("");
            this.Tab00.set_topbase("btnClose.bottom");
            this.Tab00.set_bottombase("");
            this.Tab00.set_rightbase("");
            this.Tab00.set_widthbase("");
            this.Tab00.set_heightbase("");
            this.Tab00.Tabpage5.form.Calendar00.set_leftbase("");
            this.Tab00.Tabpage5.form.Calendar00.set_topbase("");
            this.Tab00.Tabpage5.form.Calendar00.set_bottombase("");
            this.Tab00.Tabpage5.form.Calendar00.set_rightbase("");
            this.Tab00.Tabpage5.form.Calendar00.set_widthbase("");
            this.Tab00.Tabpage5.form.Calendar00.set_heightbase("");
            this.Tab00.Tabpage5.form.Static02.set_leftbase("");
            this.Tab00.Tabpage5.form.Static02.set_topbase("");
            this.Tab00.Tabpage5.form.Static02.set_bottombase("");
            this.Tab00.Tabpage5.form.Static02.set_rightbase("");
            this.Tab00.Tabpage5.form.Static02.set_widthbase("");
            this.Tab00.Tabpage5.form.Static02.set_heightbase("");
            this.Tab00.Tabpage5.form.Grid00.set_topbase("Static02.bottom");
            this.Tab00.Tabpage5.form.Grid00.set_leftbase("");
            this.Tab00.Tabpage5.form.Grid00.set_bottombase("");
            this.Tab00.Tabpage5.form.Grid00.set_rightbase("");
            this.Tab00.Tabpage5.form.Grid00.set_widthbase("");
            this.Tab00.Tabpage5.form.Grid00.set_heightbase("");
            this.Tab00.Tabpage5.form.Static03.set_bottombase("Grid01.top");
            this.Tab00.Tabpage5.form.Static03.set_leftbase("");
            this.Tab00.Tabpage5.form.Static03.set_topbase("");
            this.Tab00.Tabpage5.form.Static03.set_rightbase("");
            this.Tab00.Tabpage5.form.Static03.set_widthbase("");
            this.Tab00.Tabpage5.form.Static03.set_heightbase("");
            this.Tab00.Tabpage5.form.Grid01.set_topbase("Static02.bottom");
            this.Tab00.Tabpage5.form.Grid01.set_leftbase("");
            this.Tab00.Tabpage5.form.Grid01.set_bottombase("");
            this.Tab00.Tabpage5.form.Grid01.set_rightbase("");
            this.Tab00.Tabpage5.form.Grid01.set_widthbase("");
            this.Tab00.Tabpage5.form.Grid01.set_heightbase("");
            this.Tab00.Tabpage6.form.Grid00.set_topbase("CalFrom.bottom");
            this.Tab00.Tabpage6.form.Grid00.set_leftbase("");
            this.Tab00.Tabpage6.form.Grid00.set_bottombase("");
            this.Tab00.Tabpage6.form.Grid00.set_rightbase("");
            this.Tab00.Tabpage6.form.Grid00.set_widthbase("");
            this.Tab00.Tabpage6.form.Grid00.set_heightbase("");
            this.btnClose.set_leftbase("");
            this.btnClose.set_topbase("");
            this.btnClose.set_bottombase("");
            this.btnClose.set_rightbase("");
            this.btnClose.set_widthbase("");
            this.btnClose.set_heightbase("");
            this.btnPrint.set_rightbase("btnClose.left");
            this.btnPrint.set_leftbase("");
            this.btnPrint.set_topbase("");
            this.btnPrint.set_bottombase("");
            this.btnPrint.set_widthbase("");
            this.btnPrint.set_heightbase("");
            this.btnExcel.set_rightbase("btnPrint.left");
            this.btnExcel.set_leftbase("");
            this.btnExcel.set_topbase("");
            this.btnExcel.set_bottombase("");
            this.btnExcel.set_widthbase("");
            this.btnExcel.set_heightbase("");
            this.btnSearch.set_rightbase("btnExcel.left");
            this.btnSearch.set_leftbase("");
            this.btnSearch.set_topbase("");
            this.btnSearch.set_bottombase("");
            this.btnSearch.set_widthbase("");
            this.btnSearch.set_heightbase("");
            this.btnSiteMg.set_leftbase("");
            this.btnSiteMg.set_topbase("");
            this.btnSiteMg.set_bottombase("");
            this.btnSiteMg.set_rightbase("");
            this.btnSiteMg.set_widthbase("");
            this.btnSiteMg.set_heightbase("");
            this.btnImpSale.set_leftbase("");
            this.btnImpSale.set_topbase("");
            this.btnImpSale.set_bottombase("");
            this.btnImpSale.set_rightbase("");
            this.btnImpSale.set_widthbase("");
            this.btnImpSale.set_heightbase("");
            this.btnImpSale00.set_leftbase("");
            this.btnImpSale00.set_topbase("");
            this.btnImpSale00.set_bottombase("");
            this.btnImpSale00.set_rightbase("");
            this.btnImpSale00.set_widthbase("");
            this.btnImpSale00.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1078,810,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl","Base::TEST03.xfdl");
            this._addPreloadList("fdl","Base::BMSalesProgramPresales.xfdl");
            this._addPreloadList("fdl","Base::BMSaleProgramSuju.xfdl");
            this._addPreloadList("fdl","Base::BMSalesProgramContract.xfdl");
            this._addPreloadList("fdl","Base::BMProjectTech.xfdl");
        };
        
        // User Script
        this.registerScript("TEST00.xfdl", function() {

        this.Tab00_onchanged = function(obj,e)
        {

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("TEST00.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
