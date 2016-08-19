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
                obj.set_name("BM_Sales_ReportPrint");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1000,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","6","6",null,"30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("SpinYear","absolute","5","5","75","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_dateformat("yyyy");
                obj.set_editformat("yyyy");
                obj.set_type("spin");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo1","absolute","82","5","71","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","161","4","120","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("기간");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("calStartDate","absolute","195","4","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","297","4","20","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("calEndDate","absolute","307","4","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","423","4","25","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("팀");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("cmbDept","absolute","439","4","129","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo01");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","581","4","65","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업대표");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("cmbName","absolute","636","4",null,"20","254",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo01");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSelect","absolute","738","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("조회");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnPrint","absolute","800","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("인쇄");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Btn_close","absolute","862","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("닫기");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button0","absolute","923","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("엑셀");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","5","40","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_value("영업주간");
                obj.set_background("aqua");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtSalesWeek","absolute","105","40","230","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","335","40","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_value("보고일");
                obj.set_background("aqua");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtReportDate","absolute","435","40","230","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","663","40","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_value("작성자");
                obj.set_background("aqua");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtReporter","absolute","763","40","230","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","5","65",null,"145","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Div01");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","5","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","127","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("6월 목표");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","249","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("6월 실적");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","371","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("6월 달성률");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","493","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("누적 목표");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","615","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("연간 목표");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit06","absolute","737","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("현재 실적");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit07","absolute","859","0","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("현재 달성률");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit08","absolute","5","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("제품");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit09","absolute","5","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("인건비(SI)");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit10","absolute","5","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("상품");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit11","absolute","5","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("유지보수");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit12","absolute","5","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("기타");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit13","absolute","5","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_background("bisque");
                obj.set_textAlign("center");
                obj.set_value("합계");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPMGoal","absolute","127","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSMGoal","absolute","127","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCMGoal","absolute","127","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMMGoal","absolute","127","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEMGoal","absolute","127","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTMGoal","absolute","127","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPMSales","absolute","249","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSMSales","absolute","249","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCMSales","absolute","249","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMMSales","absolute","249","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEMSales","absolute","249","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTMSales","absolute","249","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPMRate","absolute","371","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSMRate","absolute","371","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCMRate","absolute","371","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMMRate","absolute","371","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEMRate","absolute","371","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTMRate","absolute","371","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPAGoal","absolute","493","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSAGoal","absolute","493","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCAGoal","absolute","493","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMAGoal","absolute","493","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEAGoal","absolute","493","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTAGoal","absolute","493","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPYGoal","absolute","615","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSYGoal","absolute","615","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCYGoal","absolute","615","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMYGoal","absolute","615","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEYGoal","absolute","615","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTYGoal","absolute","615","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPYSales","absolute","737","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSYSales","absolute","737","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCYSales","absolute","737","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMYSales","absolute","737","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEYSales","absolute","737","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTYSales","absolute","737","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtPYRate","absolute","859","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtSYRate","absolute","859","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtCYRate","absolute","859","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtMYRate","absolute","859","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtEYRate","absolute","859","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtTYRate","absolute","859","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Grid("grdPreWeekList","absolute","5","227",null,"115","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"80\"/><Column size=\"250\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"400\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"고객명\"/><Cell col=\"2\" text=\"프로젝트명\"/><Cell col=\"3\" text=\"제품\"/><Cell col=\"4\" text=\"예상금액\"/><Cell col=\"5\" text=\"영업 현황 및 진행상황\"/><Cell col=\"6\" text=\"채널\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdOtherList","absolute","5","494",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"100\"/><Column size=\"250\"/><Column size=\"80\"/><Column size=\"400\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"고객명\"/><Cell col=\"2\" text=\"프로젝트명\"/><Cell col=\"3\" text=\"제품\"/><Cell col=\"4\" text=\"영업 현황 및 진행 상황\"/><Cell col=\"5\" text=\"구분\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","208","156","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("1. 전주 영업현황");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","343","156","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("2. 금주 영업계획");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","477","156","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("3. 건의사항 및 요청사항");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdCurWeekList","absolute","5","362",null,"115","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"80\"/><Column size=\"250\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"400\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"고객명\"/><Cell col=\"2\" text=\"프로젝트명\"/><Cell col=\"3\" text=\"제품\"/><Cell col=\"4\" text=\"예상금액\"/><Cell col=\"5\" text=\"영업 현황 및 진행상황\"/><Cell col=\"6\" text=\"채널\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAdd1","absolute","964","211","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDelete1","absolute",null,"211","14","14","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAdd2","absolute","964","347","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDelete2","absolute",null,"347","14","14","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAdd3","absolute","964","479","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDelete3","absolute",null,"479","14","14","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.SpinYear.set_leftbase("");
            this.Div00.form.SpinYear.set_topbase("");
            this.Div00.form.SpinYear.set_bottombase("");
            this.Div00.form.SpinYear.set_rightbase("");
            this.Div00.form.SpinYear.set_widthbase("");
            this.Div00.form.SpinYear.set_heightbase("");
            this.Div00.form.Combo1.set_leftbase("");
            this.Div00.form.Combo1.set_topbase("");
            this.Div00.form.Combo1.set_bottombase("");
            this.Div00.form.Combo1.set_rightbase("");
            this.Div00.form.Combo1.set_widthbase("");
            this.Div00.form.Combo1.set_heightbase("");
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.calStartDate.set_leftbase("");
            this.Div00.form.calStartDate.set_topbase("");
            this.Div00.form.calStartDate.set_bottombase("");
            this.Div00.form.calStartDate.set_rightbase("");
            this.Div00.form.calStartDate.set_widthbase("");
            this.Div00.form.calStartDate.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.calEndDate.set_leftbase("");
            this.Div00.form.calEndDate.set_topbase("");
            this.Div00.form.calEndDate.set_bottombase("");
            this.Div00.form.calEndDate.set_rightbase("");
            this.Div00.form.calEndDate.set_widthbase("");
            this.Div00.form.calEndDate.set_heightbase("");
            this.Div00.form.Static02.set_leftbase("");
            this.Div00.form.Static02.set_topbase("");
            this.Div00.form.Static02.set_bottombase("");
            this.Div00.form.Static02.set_rightbase("");
            this.Div00.form.Static02.set_widthbase("");
            this.Div00.form.Static02.set_heightbase("");
            this.Div00.form.cmbDept.set_leftbase("");
            this.Div00.form.cmbDept.set_topbase("");
            this.Div00.form.cmbDept.set_bottombase("");
            this.Div00.form.cmbDept.set_rightbase("");
            this.Div00.form.cmbDept.set_widthbase("");
            this.Div00.form.cmbDept.set_heightbase("");
            this.Div00.form.Static03.set_leftbase("");
            this.Div00.form.Static03.set_topbase("");
            this.Div00.form.Static03.set_bottombase("");
            this.Div00.form.Static03.set_rightbase("");
            this.Div00.form.Static03.set_widthbase("");
            this.Div00.form.Static03.set_heightbase("");
            this.Div00.form.cmbName.set_leftbase("");
            this.Div00.form.cmbName.set_topbase("");
            this.Div00.form.cmbName.set_bottombase("");
            this.Div00.form.cmbName.set_rightbase("");
            this.Div00.form.cmbName.set_widthbase("");
            this.Div00.form.cmbName.set_heightbase("");
            this.Div00.form.btnSelect.set_leftbase("");
            this.Div00.form.btnSelect.set_topbase("");
            this.Div00.form.btnSelect.set_bottombase("");
            this.Div00.form.btnSelect.set_rightbase("");
            this.Div00.form.btnSelect.set_widthbase("");
            this.Div00.form.btnSelect.set_heightbase("");
            this.Div00.form.btnPrint.set_leftbase("");
            this.Div00.form.btnPrint.set_topbase("");
            this.Div00.form.btnPrint.set_bottombase("");
            this.Div00.form.btnPrint.set_rightbase("");
            this.Div00.form.btnPrint.set_widthbase("");
            this.Div00.form.btnPrint.set_heightbase("");
            this.Div00.form.Btn_close.set_leftbase("");
            this.Div00.form.Btn_close.set_topbase("");
            this.Div00.form.Btn_close.set_bottombase("");
            this.Div00.form.Btn_close.set_rightbase("");
            this.Div00.form.Btn_close.set_widthbase("");
            this.Div00.form.Btn_close.set_heightbase("");
            this.Div00.form.Button0.set_leftbase("");
            this.Div00.form.Button0.set_topbase("");
            this.Div00.form.Button0.set_bottombase("");
            this.Div00.form.Button0.set_rightbase("");
            this.Div00.form.Button0.set_widthbase("");
            this.Div00.form.Button0.set_heightbase("");
            this.Edit00.set_leftbase("");
            this.Edit00.set_topbase("");
            this.Edit00.set_bottombase("");
            this.Edit00.set_rightbase("");
            this.Edit00.set_widthbase("");
            this.Edit00.set_heightbase("");
            this.edtSalesWeek.set_leftbase("");
            this.edtSalesWeek.set_topbase("");
            this.edtSalesWeek.set_bottombase("");
            this.edtSalesWeek.set_rightbase("");
            this.edtSalesWeek.set_widthbase("");
            this.edtSalesWeek.set_heightbase("");
            this.Edit02.set_leftbase("");
            this.Edit02.set_topbase("");
            this.Edit02.set_bottombase("");
            this.Edit02.set_rightbase("");
            this.Edit02.set_widthbase("");
            this.Edit02.set_heightbase("");
            this.edtReportDate.set_leftbase("");
            this.edtReportDate.set_topbase("");
            this.edtReportDate.set_bottombase("");
            this.edtReportDate.set_rightbase("");
            this.edtReportDate.set_widthbase("");
            this.edtReportDate.set_heightbase("");
            this.Edit04.set_leftbase("");
            this.Edit04.set_topbase("");
            this.Edit04.set_bottombase("");
            this.Edit04.set_rightbase("");
            this.Edit04.set_widthbase("");
            this.Edit04.set_heightbase("");
            this.edtReporter.set_leftbase("");
            this.edtReporter.set_topbase("");
            this.edtReporter.set_bottombase("");
            this.edtReporter.set_rightbase("");
            this.edtReporter.set_widthbase("");
            this.edtReporter.set_heightbase("");
            this.Div01.set_leftbase("");
            this.Div01.set_topbase("");
            this.Div01.set_bottombase("");
            this.Div01.set_rightbase("");
            this.Div01.set_widthbase("");
            this.Div01.set_heightbase("");
            this.Div01.form.Edit00.set_leftbase("");
            this.Div01.form.Edit00.set_topbase("");
            this.Div01.form.Edit00.set_bottombase("");
            this.Div01.form.Edit00.set_rightbase("");
            this.Div01.form.Edit00.set_widthbase("");
            this.Div01.form.Edit00.set_heightbase("");
            this.Div01.form.Edit01.set_leftbase("");
            this.Div01.form.Edit01.set_topbase("");
            this.Div01.form.Edit01.set_bottombase("");
            this.Div01.form.Edit01.set_rightbase("");
            this.Div01.form.Edit01.set_widthbase("");
            this.Div01.form.Edit01.set_heightbase("");
            this.Div01.form.Edit02.set_leftbase("");
            this.Div01.form.Edit02.set_topbase("");
            this.Div01.form.Edit02.set_bottombase("");
            this.Div01.form.Edit02.set_rightbase("");
            this.Div01.form.Edit02.set_widthbase("");
            this.Div01.form.Edit02.set_heightbase("");
            this.Div01.form.Edit03.set_leftbase("");
            this.Div01.form.Edit03.set_topbase("");
            this.Div01.form.Edit03.set_bottombase("");
            this.Div01.form.Edit03.set_rightbase("");
            this.Div01.form.Edit03.set_widthbase("");
            this.Div01.form.Edit03.set_heightbase("");
            this.Div01.form.Edit04.set_leftbase("");
            this.Div01.form.Edit04.set_topbase("");
            this.Div01.form.Edit04.set_bottombase("");
            this.Div01.form.Edit04.set_rightbase("");
            this.Div01.form.Edit04.set_widthbase("");
            this.Div01.form.Edit04.set_heightbase("");
            this.Div01.form.Edit05.set_leftbase("");
            this.Div01.form.Edit05.set_topbase("");
            this.Div01.form.Edit05.set_bottombase("");
            this.Div01.form.Edit05.set_rightbase("");
            this.Div01.form.Edit05.set_widthbase("");
            this.Div01.form.Edit05.set_heightbase("");
            this.Div01.form.Edit06.set_leftbase("");
            this.Div01.form.Edit06.set_topbase("");
            this.Div01.form.Edit06.set_bottombase("");
            this.Div01.form.Edit06.set_rightbase("");
            this.Div01.form.Edit06.set_widthbase("");
            this.Div01.form.Edit06.set_heightbase("");
            this.Div01.form.Edit07.set_leftbase("");
            this.Div01.form.Edit07.set_topbase("");
            this.Div01.form.Edit07.set_bottombase("");
            this.Div01.form.Edit07.set_rightbase("");
            this.Div01.form.Edit07.set_widthbase("");
            this.Div01.form.Edit07.set_heightbase("");
            this.Div01.form.Edit08.set_leftbase("");
            this.Div01.form.Edit08.set_topbase("");
            this.Div01.form.Edit08.set_bottombase("");
            this.Div01.form.Edit08.set_rightbase("");
            this.Div01.form.Edit08.set_widthbase("");
            this.Div01.form.Edit08.set_heightbase("");
            this.Div01.form.Edit09.set_leftbase("");
            this.Div01.form.Edit09.set_topbase("");
            this.Div01.form.Edit09.set_bottombase("");
            this.Div01.form.Edit09.set_rightbase("");
            this.Div01.form.Edit09.set_widthbase("");
            this.Div01.form.Edit09.set_heightbase("");
            this.Div01.form.Edit10.set_leftbase("");
            this.Div01.form.Edit10.set_topbase("");
            this.Div01.form.Edit10.set_bottombase("");
            this.Div01.form.Edit10.set_rightbase("");
            this.Div01.form.Edit10.set_widthbase("");
            this.Div01.form.Edit10.set_heightbase("");
            this.Div01.form.Edit11.set_leftbase("");
            this.Div01.form.Edit11.set_topbase("");
            this.Div01.form.Edit11.set_bottombase("");
            this.Div01.form.Edit11.set_rightbase("");
            this.Div01.form.Edit11.set_widthbase("");
            this.Div01.form.Edit11.set_heightbase("");
            this.Div01.form.Edit12.set_leftbase("");
            this.Div01.form.Edit12.set_topbase("");
            this.Div01.form.Edit12.set_bottombase("");
            this.Div01.form.Edit12.set_rightbase("");
            this.Div01.form.Edit12.set_widthbase("");
            this.Div01.form.Edit12.set_heightbase("");
            this.Div01.form.Edit13.set_leftbase("");
            this.Div01.form.Edit13.set_topbase("");
            this.Div01.form.Edit13.set_bottombase("");
            this.Div01.form.Edit13.set_rightbase("");
            this.Div01.form.Edit13.set_widthbase("");
            this.Div01.form.Edit13.set_heightbase("");
            this.Div01.form.edtPMGoal.set_leftbase("");
            this.Div01.form.edtPMGoal.set_topbase("");
            this.Div01.form.edtPMGoal.set_bottombase("");
            this.Div01.form.edtPMGoal.set_rightbase("");
            this.Div01.form.edtPMGoal.set_widthbase("");
            this.Div01.form.edtPMGoal.set_heightbase("");
            this.Div01.form.edtSMGoal.set_leftbase("");
            this.Div01.form.edtSMGoal.set_topbase("");
            this.Div01.form.edtSMGoal.set_bottombase("");
            this.Div01.form.edtSMGoal.set_rightbase("");
            this.Div01.form.edtSMGoal.set_widthbase("");
            this.Div01.form.edtSMGoal.set_heightbase("");
            this.Div01.form.edtCMGoal.set_leftbase("");
            this.Div01.form.edtCMGoal.set_topbase("");
            this.Div01.form.edtCMGoal.set_bottombase("");
            this.Div01.form.edtCMGoal.set_rightbase("");
            this.Div01.form.edtCMGoal.set_widthbase("");
            this.Div01.form.edtCMGoal.set_heightbase("");
            this.Div01.form.edtMMGoal.set_leftbase("");
            this.Div01.form.edtMMGoal.set_topbase("");
            this.Div01.form.edtMMGoal.set_bottombase("");
            this.Div01.form.edtMMGoal.set_rightbase("");
            this.Div01.form.edtMMGoal.set_widthbase("");
            this.Div01.form.edtMMGoal.set_heightbase("");
            this.Div01.form.edtEMGoal.set_leftbase("");
            this.Div01.form.edtEMGoal.set_topbase("");
            this.Div01.form.edtEMGoal.set_bottombase("");
            this.Div01.form.edtEMGoal.set_rightbase("");
            this.Div01.form.edtEMGoal.set_widthbase("");
            this.Div01.form.edtEMGoal.set_heightbase("");
            this.Div01.form.edtTMGoal.set_leftbase("");
            this.Div01.form.edtTMGoal.set_topbase("");
            this.Div01.form.edtTMGoal.set_bottombase("");
            this.Div01.form.edtTMGoal.set_rightbase("");
            this.Div01.form.edtTMGoal.set_widthbase("");
            this.Div01.form.edtTMGoal.set_heightbase("");
            this.Div01.form.edtPMSales.set_leftbase("");
            this.Div01.form.edtPMSales.set_topbase("");
            this.Div01.form.edtPMSales.set_bottombase("");
            this.Div01.form.edtPMSales.set_rightbase("");
            this.Div01.form.edtPMSales.set_widthbase("");
            this.Div01.form.edtPMSales.set_heightbase("");
            this.Div01.form.edtSMSales.set_leftbase("");
            this.Div01.form.edtSMSales.set_topbase("");
            this.Div01.form.edtSMSales.set_bottombase("");
            this.Div01.form.edtSMSales.set_rightbase("");
            this.Div01.form.edtSMSales.set_widthbase("");
            this.Div01.form.edtSMSales.set_heightbase("");
            this.Div01.form.edtCMSales.set_leftbase("");
            this.Div01.form.edtCMSales.set_topbase("");
            this.Div01.form.edtCMSales.set_bottombase("");
            this.Div01.form.edtCMSales.set_rightbase("");
            this.Div01.form.edtCMSales.set_widthbase("");
            this.Div01.form.edtCMSales.set_heightbase("");
            this.Div01.form.edtMMSales.set_leftbase("");
            this.Div01.form.edtMMSales.set_topbase("");
            this.Div01.form.edtMMSales.set_bottombase("");
            this.Div01.form.edtMMSales.set_rightbase("");
            this.Div01.form.edtMMSales.set_widthbase("");
            this.Div01.form.edtMMSales.set_heightbase("");
            this.Div01.form.edtEMSales.set_leftbase("");
            this.Div01.form.edtEMSales.set_topbase("");
            this.Div01.form.edtEMSales.set_bottombase("");
            this.Div01.form.edtEMSales.set_rightbase("");
            this.Div01.form.edtEMSales.set_widthbase("");
            this.Div01.form.edtEMSales.set_heightbase("");
            this.Div01.form.edtTMSales.set_leftbase("");
            this.Div01.form.edtTMSales.set_topbase("");
            this.Div01.form.edtTMSales.set_bottombase("");
            this.Div01.form.edtTMSales.set_rightbase("");
            this.Div01.form.edtTMSales.set_widthbase("");
            this.Div01.form.edtTMSales.set_heightbase("");
            this.Div01.form.edtPMRate.set_leftbase("");
            this.Div01.form.edtPMRate.set_topbase("");
            this.Div01.form.edtPMRate.set_bottombase("");
            this.Div01.form.edtPMRate.set_rightbase("");
            this.Div01.form.edtPMRate.set_widthbase("");
            this.Div01.form.edtPMRate.set_heightbase("");
            this.Div01.form.edtSMRate.set_leftbase("");
            this.Div01.form.edtSMRate.set_topbase("");
            this.Div01.form.edtSMRate.set_bottombase("");
            this.Div01.form.edtSMRate.set_rightbase("");
            this.Div01.form.edtSMRate.set_widthbase("");
            this.Div01.form.edtSMRate.set_heightbase("");
            this.Div01.form.edtCMRate.set_leftbase("");
            this.Div01.form.edtCMRate.set_topbase("");
            this.Div01.form.edtCMRate.set_bottombase("");
            this.Div01.form.edtCMRate.set_rightbase("");
            this.Div01.form.edtCMRate.set_widthbase("");
            this.Div01.form.edtCMRate.set_heightbase("");
            this.Div01.form.edtMMRate.set_leftbase("");
            this.Div01.form.edtMMRate.set_topbase("");
            this.Div01.form.edtMMRate.set_bottombase("");
            this.Div01.form.edtMMRate.set_rightbase("");
            this.Div01.form.edtMMRate.set_widthbase("");
            this.Div01.form.edtMMRate.set_heightbase("");
            this.Div01.form.edtEMRate.set_leftbase("");
            this.Div01.form.edtEMRate.set_topbase("");
            this.Div01.form.edtEMRate.set_bottombase("");
            this.Div01.form.edtEMRate.set_rightbase("");
            this.Div01.form.edtEMRate.set_widthbase("");
            this.Div01.form.edtEMRate.set_heightbase("");
            this.Div01.form.edtTMRate.set_leftbase("");
            this.Div01.form.edtTMRate.set_topbase("");
            this.Div01.form.edtTMRate.set_bottombase("");
            this.Div01.form.edtTMRate.set_rightbase("");
            this.Div01.form.edtTMRate.set_widthbase("");
            this.Div01.form.edtTMRate.set_heightbase("");
            this.Div01.form.edtPAGoal.set_leftbase("");
            this.Div01.form.edtPAGoal.set_topbase("");
            this.Div01.form.edtPAGoal.set_bottombase("");
            this.Div01.form.edtPAGoal.set_rightbase("");
            this.Div01.form.edtPAGoal.set_widthbase("");
            this.Div01.form.edtPAGoal.set_heightbase("");
            this.Div01.form.edtSAGoal.set_leftbase("");
            this.Div01.form.edtSAGoal.set_topbase("");
            this.Div01.form.edtSAGoal.set_bottombase("");
            this.Div01.form.edtSAGoal.set_rightbase("");
            this.Div01.form.edtSAGoal.set_widthbase("");
            this.Div01.form.edtSAGoal.set_heightbase("");
            this.Div01.form.edtCAGoal.set_leftbase("");
            this.Div01.form.edtCAGoal.set_topbase("");
            this.Div01.form.edtCAGoal.set_bottombase("");
            this.Div01.form.edtCAGoal.set_rightbase("");
            this.Div01.form.edtCAGoal.set_widthbase("");
            this.Div01.form.edtCAGoal.set_heightbase("");
            this.Div01.form.edtMAGoal.set_leftbase("");
            this.Div01.form.edtMAGoal.set_topbase("");
            this.Div01.form.edtMAGoal.set_bottombase("");
            this.Div01.form.edtMAGoal.set_rightbase("");
            this.Div01.form.edtMAGoal.set_widthbase("");
            this.Div01.form.edtMAGoal.set_heightbase("");
            this.Div01.form.edtEAGoal.set_leftbase("");
            this.Div01.form.edtEAGoal.set_topbase("");
            this.Div01.form.edtEAGoal.set_bottombase("");
            this.Div01.form.edtEAGoal.set_rightbase("");
            this.Div01.form.edtEAGoal.set_widthbase("");
            this.Div01.form.edtEAGoal.set_heightbase("");
            this.Div01.form.edtTAGoal.set_leftbase("");
            this.Div01.form.edtTAGoal.set_topbase("");
            this.Div01.form.edtTAGoal.set_bottombase("");
            this.Div01.form.edtTAGoal.set_rightbase("");
            this.Div01.form.edtTAGoal.set_widthbase("");
            this.Div01.form.edtTAGoal.set_heightbase("");
            this.Div01.form.edtPYGoal.set_leftbase("");
            this.Div01.form.edtPYGoal.set_topbase("");
            this.Div01.form.edtPYGoal.set_bottombase("");
            this.Div01.form.edtPYGoal.set_rightbase("");
            this.Div01.form.edtPYGoal.set_widthbase("");
            this.Div01.form.edtPYGoal.set_heightbase("");
            this.Div01.form.edtSYGoal.set_leftbase("");
            this.Div01.form.edtSYGoal.set_topbase("");
            this.Div01.form.edtSYGoal.set_bottombase("");
            this.Div01.form.edtSYGoal.set_rightbase("");
            this.Div01.form.edtSYGoal.set_widthbase("");
            this.Div01.form.edtSYGoal.set_heightbase("");
            this.Div01.form.edtCYGoal.set_leftbase("");
            this.Div01.form.edtCYGoal.set_topbase("");
            this.Div01.form.edtCYGoal.set_bottombase("");
            this.Div01.form.edtCYGoal.set_rightbase("");
            this.Div01.form.edtCYGoal.set_widthbase("");
            this.Div01.form.edtCYGoal.set_heightbase("");
            this.Div01.form.edtMYGoal.set_leftbase("");
            this.Div01.form.edtMYGoal.set_topbase("");
            this.Div01.form.edtMYGoal.set_bottombase("");
            this.Div01.form.edtMYGoal.set_rightbase("");
            this.Div01.form.edtMYGoal.set_widthbase("");
            this.Div01.form.edtMYGoal.set_heightbase("");
            this.Div01.form.edtEYGoal.set_leftbase("");
            this.Div01.form.edtEYGoal.set_topbase("");
            this.Div01.form.edtEYGoal.set_bottombase("");
            this.Div01.form.edtEYGoal.set_rightbase("");
            this.Div01.form.edtEYGoal.set_widthbase("");
            this.Div01.form.edtEYGoal.set_heightbase("");
            this.Div01.form.edtTYGoal.set_leftbase("");
            this.Div01.form.edtTYGoal.set_topbase("");
            this.Div01.form.edtTYGoal.set_bottombase("");
            this.Div01.form.edtTYGoal.set_rightbase("");
            this.Div01.form.edtTYGoal.set_widthbase("");
            this.Div01.form.edtTYGoal.set_heightbase("");
            this.Div01.form.edtPYSales.set_leftbase("");
            this.Div01.form.edtPYSales.set_topbase("");
            this.Div01.form.edtPYSales.set_bottombase("");
            this.Div01.form.edtPYSales.set_rightbase("");
            this.Div01.form.edtPYSales.set_widthbase("");
            this.Div01.form.edtPYSales.set_heightbase("");
            this.Div01.form.edtSYSales.set_leftbase("");
            this.Div01.form.edtSYSales.set_topbase("");
            this.Div01.form.edtSYSales.set_bottombase("");
            this.Div01.form.edtSYSales.set_rightbase("");
            this.Div01.form.edtSYSales.set_widthbase("");
            this.Div01.form.edtSYSales.set_heightbase("");
            this.Div01.form.edtCYSales.set_leftbase("");
            this.Div01.form.edtCYSales.set_topbase("");
            this.Div01.form.edtCYSales.set_bottombase("");
            this.Div01.form.edtCYSales.set_rightbase("");
            this.Div01.form.edtCYSales.set_widthbase("");
            this.Div01.form.edtCYSales.set_heightbase("");
            this.Div01.form.edtMYSales.set_leftbase("");
            this.Div01.form.edtMYSales.set_topbase("");
            this.Div01.form.edtMYSales.set_bottombase("");
            this.Div01.form.edtMYSales.set_rightbase("");
            this.Div01.form.edtMYSales.set_widthbase("");
            this.Div01.form.edtMYSales.set_heightbase("");
            this.Div01.form.edtEYSales.set_leftbase("");
            this.Div01.form.edtEYSales.set_topbase("");
            this.Div01.form.edtEYSales.set_bottombase("");
            this.Div01.form.edtEYSales.set_rightbase("");
            this.Div01.form.edtEYSales.set_widthbase("");
            this.Div01.form.edtEYSales.set_heightbase("");
            this.Div01.form.edtTYSales.set_leftbase("");
            this.Div01.form.edtTYSales.set_topbase("");
            this.Div01.form.edtTYSales.set_bottombase("");
            this.Div01.form.edtTYSales.set_rightbase("");
            this.Div01.form.edtTYSales.set_widthbase("");
            this.Div01.form.edtTYSales.set_heightbase("");
            this.Div01.form.edtPYRate.set_leftbase("");
            this.Div01.form.edtPYRate.set_topbase("");
            this.Div01.form.edtPYRate.set_bottombase("");
            this.Div01.form.edtPYRate.set_rightbase("");
            this.Div01.form.edtPYRate.set_widthbase("");
            this.Div01.form.edtPYRate.set_heightbase("");
            this.Div01.form.edtSYRate.set_leftbase("");
            this.Div01.form.edtSYRate.set_topbase("");
            this.Div01.form.edtSYRate.set_bottombase("");
            this.Div01.form.edtSYRate.set_rightbase("");
            this.Div01.form.edtSYRate.set_widthbase("");
            this.Div01.form.edtSYRate.set_heightbase("");
            this.Div01.form.edtCYRate.set_leftbase("");
            this.Div01.form.edtCYRate.set_topbase("");
            this.Div01.form.edtCYRate.set_bottombase("");
            this.Div01.form.edtCYRate.set_rightbase("");
            this.Div01.form.edtCYRate.set_widthbase("");
            this.Div01.form.edtCYRate.set_heightbase("");
            this.Div01.form.edtMYRate.set_leftbase("");
            this.Div01.form.edtMYRate.set_topbase("");
            this.Div01.form.edtMYRate.set_bottombase("");
            this.Div01.form.edtMYRate.set_rightbase("");
            this.Div01.form.edtMYRate.set_widthbase("");
            this.Div01.form.edtMYRate.set_heightbase("");
            this.Div01.form.edtEYRate.set_leftbase("");
            this.Div01.form.edtEYRate.set_topbase("");
            this.Div01.form.edtEYRate.set_bottombase("");
            this.Div01.form.edtEYRate.set_rightbase("");
            this.Div01.form.edtEYRate.set_widthbase("");
            this.Div01.form.edtEYRate.set_heightbase("");
            this.Div01.form.edtTYRate.set_leftbase("");
            this.Div01.form.edtTYRate.set_topbase("");
            this.Div01.form.edtTYRate.set_bottombase("");
            this.Div01.form.edtTYRate.set_rightbase("");
            this.Div01.form.edtTYRate.set_widthbase("");
            this.Div01.form.edtTYRate.set_heightbase("");
            this.grdPreWeekList.set_leftbase("");
            this.grdPreWeekList.set_topbase("");
            this.grdPreWeekList.set_bottombase("");
            this.grdPreWeekList.set_rightbase("");
            this.grdPreWeekList.set_widthbase("");
            this.grdPreWeekList.set_heightbase("");
            this.grdOtherList.set_leftbase("");
            this.grdOtherList.set_topbase("");
            this.grdOtherList.set_bottombase("");
            this.grdOtherList.set_rightbase("");
            this.grdOtherList.set_widthbase("");
            this.grdOtherList.set_heightbase("");
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_topbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.grdCurWeekList.set_leftbase("");
            this.grdCurWeekList.set_topbase("");
            this.grdCurWeekList.set_bottombase("");
            this.grdCurWeekList.set_rightbase("");
            this.grdCurWeekList.set_widthbase("");
            this.grdCurWeekList.set_heightbase("");
            this.btnAdd1.set_leftbase("");
            this.btnAdd1.set_topbase("");
            this.btnAdd1.set_bottombase("");
            this.btnAdd1.set_rightbase("");
            this.btnAdd1.set_widthbase("");
            this.btnAdd1.set_heightbase("");
            this.btnDelete1.set_leftbase("");
            this.btnDelete1.set_topbase("");
            this.btnDelete1.set_bottombase("");
            this.btnDelete1.set_rightbase("");
            this.btnDelete1.set_widthbase("");
            this.btnDelete1.set_heightbase("");
            this.btnAdd2.set_leftbase("");
            this.btnAdd2.set_topbase("");
            this.btnAdd2.set_bottombase("");
            this.btnAdd2.set_rightbase("");
            this.btnAdd2.set_widthbase("");
            this.btnAdd2.set_heightbase("");
            this.btnDelete2.set_leftbase("");
            this.btnDelete2.set_topbase("");
            this.btnDelete2.set_bottombase("");
            this.btnDelete2.set_rightbase("");
            this.btnDelete2.set_widthbase("");
            this.btnDelete2.set_heightbase("");
            this.btnAdd3.set_leftbase("");
            this.btnAdd3.set_topbase("");
            this.btnAdd3.set_bottombase("");
            this.btnAdd3.set_rightbase("");
            this.btnAdd3.set_widthbase("");
            this.btnAdd3.set_heightbase("");
            this.btnDelete3.set_leftbase("");
            this.btnDelete3.set_topbase("");
            this.btnDelete3.set_bottombase("");
            this.btnDelete3.set_rightbase("");
            this.btnDelete3.set_widthbase("");
            this.btnDelete3.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1000,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("BM_Sales_ReportPrint.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
