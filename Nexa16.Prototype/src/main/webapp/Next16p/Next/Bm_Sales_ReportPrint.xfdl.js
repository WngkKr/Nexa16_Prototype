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

            obj = new Calendar("Calendar00","absolute","5","5","75","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_dateformat("yyyy");
                obj.set_editformat("yyyy");
                obj.set_type("spin");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","82","5","71","20",null,null,this.Div00.form);
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

            obj = new Calendar("Calendar01","absolute","195","4","100","20",null,null,this.Div00.form);
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

            obj = new Calendar("Calendar02","absolute","307","4","100","20",null,null,this.Div00.form);
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

            obj = new Combo("Combo01","absolute","439","4","129","20",null,null,this.Div00.form);
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

            obj = new Combo("Combo02","absolute","636","4",null,"20","254",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo01");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","738","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("조회");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","800","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("인쇄");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","862","4","60","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("닫기");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button03","absolute","923","4","60","20",null,null,this.Div00.form);
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

            obj = new Edit("Edit01","absolute","105","40","230","20",null,null,this);
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

            obj = new Edit("Edit03","absolute","435","40","230","20",null,null,this);
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

            obj = new Edit("Edit05","absolute","763","40","230","20",null,null,this);
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

            obj = new Edit("Edit14","absolute","127","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit15","absolute","127","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit16","absolute","127","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit17","absolute","127","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit18","absolute","127","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit19","absolute","127","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit20","absolute","249","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit21","absolute","249","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit22","absolute","249","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit23","absolute","249","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit24","absolute","249","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit25","absolute","249","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit26","absolute","371","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit27","absolute","371","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit28","absolute","371","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit29","absolute","371","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit30","absolute","371","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit31","absolute","371","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit32","absolute","493","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit33","absolute","493","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit34","absolute","493","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit35","absolute","493","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit36","absolute","493","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit37","absolute","493","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit38","absolute","615","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit39","absolute","615","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit40","absolute","615","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit41","absolute","615","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit42","absolute","615","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit43","absolute","615","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit44","absolute","737","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit45","absolute","737","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit46","absolute","737","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit47","absolute","737","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit48","absolute","737","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit49","absolute","737","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit50","absolute","859","20","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit51","absolute","859","40","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit52","absolute","859","60","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit53","absolute","859","80","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit54","absolute","859","100","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit55","absolute","859","120","123","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","227",null,"115","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"80\"/><Column size=\"250\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"400\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"고객명\"/><Cell col=\"2\" text=\"프로젝트명\"/><Cell col=\"3\" text=\"제품\"/><Cell col=\"4\" text=\"예상금액\"/><Cell col=\"5\" text=\"영업 현황 및 진행상황\"/><Cell col=\"6\" text=\"채널\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid02","absolute","5","494",null,null,"5","5",this);
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

            obj = new Grid("Grid01","absolute","5","362",null,"115","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"80\"/><Column size=\"250\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"400\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"고객명\"/><Cell col=\"2\" text=\"프로젝트명\"/><Cell col=\"3\" text=\"제품\"/><Cell col=\"4\" text=\"예상금액\"/><Cell col=\"5\" text=\"영업 현황 및 진행상황\"/><Cell col=\"6\" text=\"채널\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","964","211","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"211","14","14","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","964","347","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button03","absolute",null,"347","14","14","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button04","absolute","964","479","14","14",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button05","absolute",null,"479","14","14","5",null,this);
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
            this.Div00.form.Calendar00.set_leftbase("");
            this.Div00.form.Calendar00.set_topbase("");
            this.Div00.form.Calendar00.set_bottombase("");
            this.Div00.form.Calendar00.set_rightbase("");
            this.Div00.form.Calendar00.set_widthbase("");
            this.Div00.form.Calendar00.set_heightbase("");
            this.Div00.form.Combo00.set_leftbase("");
            this.Div00.form.Combo00.set_topbase("");
            this.Div00.form.Combo00.set_bottombase("");
            this.Div00.form.Combo00.set_rightbase("");
            this.Div00.form.Combo00.set_widthbase("");
            this.Div00.form.Combo00.set_heightbase("");
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.Calendar01.set_leftbase("");
            this.Div00.form.Calendar01.set_topbase("");
            this.Div00.form.Calendar01.set_bottombase("");
            this.Div00.form.Calendar01.set_rightbase("");
            this.Div00.form.Calendar01.set_widthbase("");
            this.Div00.form.Calendar01.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.Calendar02.set_leftbase("");
            this.Div00.form.Calendar02.set_topbase("");
            this.Div00.form.Calendar02.set_bottombase("");
            this.Div00.form.Calendar02.set_rightbase("");
            this.Div00.form.Calendar02.set_widthbase("");
            this.Div00.form.Calendar02.set_heightbase("");
            this.Div00.form.Static02.set_leftbase("");
            this.Div00.form.Static02.set_topbase("");
            this.Div00.form.Static02.set_bottombase("");
            this.Div00.form.Static02.set_rightbase("");
            this.Div00.form.Static02.set_widthbase("");
            this.Div00.form.Static02.set_heightbase("");
            this.Div00.form.Combo01.set_leftbase("");
            this.Div00.form.Combo01.set_topbase("");
            this.Div00.form.Combo01.set_bottombase("");
            this.Div00.form.Combo01.set_rightbase("");
            this.Div00.form.Combo01.set_widthbase("");
            this.Div00.form.Combo01.set_heightbase("");
            this.Div00.form.Static03.set_leftbase("");
            this.Div00.form.Static03.set_topbase("");
            this.Div00.form.Static03.set_bottombase("");
            this.Div00.form.Static03.set_rightbase("");
            this.Div00.form.Static03.set_widthbase("");
            this.Div00.form.Static03.set_heightbase("");
            this.Div00.form.Combo02.set_leftbase("");
            this.Div00.form.Combo02.set_topbase("");
            this.Div00.form.Combo02.set_bottombase("");
            this.Div00.form.Combo02.set_rightbase("");
            this.Div00.form.Combo02.set_widthbase("");
            this.Div00.form.Combo02.set_heightbase("");
            this.Div00.form.Button00.set_leftbase("");
            this.Div00.form.Button00.set_topbase("");
            this.Div00.form.Button00.set_bottombase("");
            this.Div00.form.Button00.set_rightbase("");
            this.Div00.form.Button00.set_widthbase("");
            this.Div00.form.Button00.set_heightbase("");
            this.Div00.form.Button01.set_leftbase("");
            this.Div00.form.Button01.set_topbase("");
            this.Div00.form.Button01.set_bottombase("");
            this.Div00.form.Button01.set_rightbase("");
            this.Div00.form.Button01.set_widthbase("");
            this.Div00.form.Button01.set_heightbase("");
            this.Div00.form.Button02.set_leftbase("");
            this.Div00.form.Button02.set_topbase("");
            this.Div00.form.Button02.set_bottombase("");
            this.Div00.form.Button02.set_rightbase("");
            this.Div00.form.Button02.set_widthbase("");
            this.Div00.form.Button02.set_heightbase("");
            this.Div00.form.Button03.set_leftbase("");
            this.Div00.form.Button03.set_topbase("");
            this.Div00.form.Button03.set_bottombase("");
            this.Div00.form.Button03.set_rightbase("");
            this.Div00.form.Button03.set_widthbase("");
            this.Div00.form.Button03.set_heightbase("");
            this.Edit00.set_leftbase("");
            this.Edit00.set_topbase("");
            this.Edit00.set_bottombase("");
            this.Edit00.set_rightbase("");
            this.Edit00.set_widthbase("");
            this.Edit00.set_heightbase("");
            this.Edit01.set_leftbase("");
            this.Edit01.set_topbase("");
            this.Edit01.set_bottombase("");
            this.Edit01.set_rightbase("");
            this.Edit01.set_widthbase("");
            this.Edit01.set_heightbase("");
            this.Edit02.set_leftbase("");
            this.Edit02.set_topbase("");
            this.Edit02.set_bottombase("");
            this.Edit02.set_rightbase("");
            this.Edit02.set_widthbase("");
            this.Edit02.set_heightbase("");
            this.Edit03.set_leftbase("");
            this.Edit03.set_topbase("");
            this.Edit03.set_bottombase("");
            this.Edit03.set_rightbase("");
            this.Edit03.set_widthbase("");
            this.Edit03.set_heightbase("");
            this.Edit04.set_leftbase("");
            this.Edit04.set_topbase("");
            this.Edit04.set_bottombase("");
            this.Edit04.set_rightbase("");
            this.Edit04.set_widthbase("");
            this.Edit04.set_heightbase("");
            this.Edit05.set_leftbase("");
            this.Edit05.set_topbase("");
            this.Edit05.set_bottombase("");
            this.Edit05.set_rightbase("");
            this.Edit05.set_widthbase("");
            this.Edit05.set_heightbase("");
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
            this.Div01.form.Edit14.set_leftbase("");
            this.Div01.form.Edit14.set_topbase("");
            this.Div01.form.Edit14.set_bottombase("");
            this.Div01.form.Edit14.set_rightbase("");
            this.Div01.form.Edit14.set_widthbase("");
            this.Div01.form.Edit14.set_heightbase("");
            this.Div01.form.Edit15.set_leftbase("");
            this.Div01.form.Edit15.set_topbase("");
            this.Div01.form.Edit15.set_bottombase("");
            this.Div01.form.Edit15.set_rightbase("");
            this.Div01.form.Edit15.set_widthbase("");
            this.Div01.form.Edit15.set_heightbase("");
            this.Div01.form.Edit16.set_leftbase("");
            this.Div01.form.Edit16.set_topbase("");
            this.Div01.form.Edit16.set_bottombase("");
            this.Div01.form.Edit16.set_rightbase("");
            this.Div01.form.Edit16.set_widthbase("");
            this.Div01.form.Edit16.set_heightbase("");
            this.Div01.form.Edit17.set_leftbase("");
            this.Div01.form.Edit17.set_topbase("");
            this.Div01.form.Edit17.set_bottombase("");
            this.Div01.form.Edit17.set_rightbase("");
            this.Div01.form.Edit17.set_widthbase("");
            this.Div01.form.Edit17.set_heightbase("");
            this.Div01.form.Edit18.set_leftbase("");
            this.Div01.form.Edit18.set_topbase("");
            this.Div01.form.Edit18.set_bottombase("");
            this.Div01.form.Edit18.set_rightbase("");
            this.Div01.form.Edit18.set_widthbase("");
            this.Div01.form.Edit18.set_heightbase("");
            this.Div01.form.Edit19.set_leftbase("");
            this.Div01.form.Edit19.set_topbase("");
            this.Div01.form.Edit19.set_bottombase("");
            this.Div01.form.Edit19.set_rightbase("");
            this.Div01.form.Edit19.set_widthbase("");
            this.Div01.form.Edit19.set_heightbase("");
            this.Div01.form.Edit20.set_leftbase("");
            this.Div01.form.Edit20.set_topbase("");
            this.Div01.form.Edit20.set_bottombase("");
            this.Div01.form.Edit20.set_rightbase("");
            this.Div01.form.Edit20.set_widthbase("");
            this.Div01.form.Edit20.set_heightbase("");
            this.Div01.form.Edit21.set_leftbase("");
            this.Div01.form.Edit21.set_topbase("");
            this.Div01.form.Edit21.set_bottombase("");
            this.Div01.form.Edit21.set_rightbase("");
            this.Div01.form.Edit21.set_widthbase("");
            this.Div01.form.Edit21.set_heightbase("");
            this.Div01.form.Edit22.set_leftbase("");
            this.Div01.form.Edit22.set_topbase("");
            this.Div01.form.Edit22.set_bottombase("");
            this.Div01.form.Edit22.set_rightbase("");
            this.Div01.form.Edit22.set_widthbase("");
            this.Div01.form.Edit22.set_heightbase("");
            this.Div01.form.Edit23.set_leftbase("");
            this.Div01.form.Edit23.set_topbase("");
            this.Div01.form.Edit23.set_bottombase("");
            this.Div01.form.Edit23.set_rightbase("");
            this.Div01.form.Edit23.set_widthbase("");
            this.Div01.form.Edit23.set_heightbase("");
            this.Div01.form.Edit24.set_leftbase("");
            this.Div01.form.Edit24.set_topbase("");
            this.Div01.form.Edit24.set_bottombase("");
            this.Div01.form.Edit24.set_rightbase("");
            this.Div01.form.Edit24.set_widthbase("");
            this.Div01.form.Edit24.set_heightbase("");
            this.Div01.form.Edit25.set_leftbase("");
            this.Div01.form.Edit25.set_topbase("");
            this.Div01.form.Edit25.set_bottombase("");
            this.Div01.form.Edit25.set_rightbase("");
            this.Div01.form.Edit25.set_widthbase("");
            this.Div01.form.Edit25.set_heightbase("");
            this.Div01.form.Edit26.set_leftbase("");
            this.Div01.form.Edit26.set_topbase("");
            this.Div01.form.Edit26.set_bottombase("");
            this.Div01.form.Edit26.set_rightbase("");
            this.Div01.form.Edit26.set_widthbase("");
            this.Div01.form.Edit26.set_heightbase("");
            this.Div01.form.Edit27.set_leftbase("");
            this.Div01.form.Edit27.set_topbase("");
            this.Div01.form.Edit27.set_bottombase("");
            this.Div01.form.Edit27.set_rightbase("");
            this.Div01.form.Edit27.set_widthbase("");
            this.Div01.form.Edit27.set_heightbase("");
            this.Div01.form.Edit28.set_leftbase("");
            this.Div01.form.Edit28.set_topbase("");
            this.Div01.form.Edit28.set_bottombase("");
            this.Div01.form.Edit28.set_rightbase("");
            this.Div01.form.Edit28.set_widthbase("");
            this.Div01.form.Edit28.set_heightbase("");
            this.Div01.form.Edit29.set_leftbase("");
            this.Div01.form.Edit29.set_topbase("");
            this.Div01.form.Edit29.set_bottombase("");
            this.Div01.form.Edit29.set_rightbase("");
            this.Div01.form.Edit29.set_widthbase("");
            this.Div01.form.Edit29.set_heightbase("");
            this.Div01.form.Edit30.set_leftbase("");
            this.Div01.form.Edit30.set_topbase("");
            this.Div01.form.Edit30.set_bottombase("");
            this.Div01.form.Edit30.set_rightbase("");
            this.Div01.form.Edit30.set_widthbase("");
            this.Div01.form.Edit30.set_heightbase("");
            this.Div01.form.Edit31.set_leftbase("");
            this.Div01.form.Edit31.set_topbase("");
            this.Div01.form.Edit31.set_bottombase("");
            this.Div01.form.Edit31.set_rightbase("");
            this.Div01.form.Edit31.set_widthbase("");
            this.Div01.form.Edit31.set_heightbase("");
            this.Div01.form.Edit32.set_leftbase("");
            this.Div01.form.Edit32.set_topbase("");
            this.Div01.form.Edit32.set_bottombase("");
            this.Div01.form.Edit32.set_rightbase("");
            this.Div01.form.Edit32.set_widthbase("");
            this.Div01.form.Edit32.set_heightbase("");
            this.Div01.form.Edit33.set_leftbase("");
            this.Div01.form.Edit33.set_topbase("");
            this.Div01.form.Edit33.set_bottombase("");
            this.Div01.form.Edit33.set_rightbase("");
            this.Div01.form.Edit33.set_widthbase("");
            this.Div01.form.Edit33.set_heightbase("");
            this.Div01.form.Edit34.set_leftbase("");
            this.Div01.form.Edit34.set_topbase("");
            this.Div01.form.Edit34.set_bottombase("");
            this.Div01.form.Edit34.set_rightbase("");
            this.Div01.form.Edit34.set_widthbase("");
            this.Div01.form.Edit34.set_heightbase("");
            this.Div01.form.Edit35.set_leftbase("");
            this.Div01.form.Edit35.set_topbase("");
            this.Div01.form.Edit35.set_bottombase("");
            this.Div01.form.Edit35.set_rightbase("");
            this.Div01.form.Edit35.set_widthbase("");
            this.Div01.form.Edit35.set_heightbase("");
            this.Div01.form.Edit36.set_leftbase("");
            this.Div01.form.Edit36.set_topbase("");
            this.Div01.form.Edit36.set_bottombase("");
            this.Div01.form.Edit36.set_rightbase("");
            this.Div01.form.Edit36.set_widthbase("");
            this.Div01.form.Edit36.set_heightbase("");
            this.Div01.form.Edit37.set_leftbase("");
            this.Div01.form.Edit37.set_topbase("");
            this.Div01.form.Edit37.set_bottombase("");
            this.Div01.form.Edit37.set_rightbase("");
            this.Div01.form.Edit37.set_widthbase("");
            this.Div01.form.Edit37.set_heightbase("");
            this.Div01.form.Edit38.set_leftbase("");
            this.Div01.form.Edit38.set_topbase("");
            this.Div01.form.Edit38.set_bottombase("");
            this.Div01.form.Edit38.set_rightbase("");
            this.Div01.form.Edit38.set_widthbase("");
            this.Div01.form.Edit38.set_heightbase("");
            this.Div01.form.Edit39.set_leftbase("");
            this.Div01.form.Edit39.set_topbase("");
            this.Div01.form.Edit39.set_bottombase("");
            this.Div01.form.Edit39.set_rightbase("");
            this.Div01.form.Edit39.set_widthbase("");
            this.Div01.form.Edit39.set_heightbase("");
            this.Div01.form.Edit40.set_leftbase("");
            this.Div01.form.Edit40.set_topbase("");
            this.Div01.form.Edit40.set_bottombase("");
            this.Div01.form.Edit40.set_rightbase("");
            this.Div01.form.Edit40.set_widthbase("");
            this.Div01.form.Edit40.set_heightbase("");
            this.Div01.form.Edit41.set_leftbase("");
            this.Div01.form.Edit41.set_topbase("");
            this.Div01.form.Edit41.set_bottombase("");
            this.Div01.form.Edit41.set_rightbase("");
            this.Div01.form.Edit41.set_widthbase("");
            this.Div01.form.Edit41.set_heightbase("");
            this.Div01.form.Edit42.set_leftbase("");
            this.Div01.form.Edit42.set_topbase("");
            this.Div01.form.Edit42.set_bottombase("");
            this.Div01.form.Edit42.set_rightbase("");
            this.Div01.form.Edit42.set_widthbase("");
            this.Div01.form.Edit42.set_heightbase("");
            this.Div01.form.Edit43.set_leftbase("");
            this.Div01.form.Edit43.set_topbase("");
            this.Div01.form.Edit43.set_bottombase("");
            this.Div01.form.Edit43.set_rightbase("");
            this.Div01.form.Edit43.set_widthbase("");
            this.Div01.form.Edit43.set_heightbase("");
            this.Div01.form.Edit44.set_leftbase("");
            this.Div01.form.Edit44.set_topbase("");
            this.Div01.form.Edit44.set_bottombase("");
            this.Div01.form.Edit44.set_rightbase("");
            this.Div01.form.Edit44.set_widthbase("");
            this.Div01.form.Edit44.set_heightbase("");
            this.Div01.form.Edit45.set_leftbase("");
            this.Div01.form.Edit45.set_topbase("");
            this.Div01.form.Edit45.set_bottombase("");
            this.Div01.form.Edit45.set_rightbase("");
            this.Div01.form.Edit45.set_widthbase("");
            this.Div01.form.Edit45.set_heightbase("");
            this.Div01.form.Edit46.set_leftbase("");
            this.Div01.form.Edit46.set_topbase("");
            this.Div01.form.Edit46.set_bottombase("");
            this.Div01.form.Edit46.set_rightbase("");
            this.Div01.form.Edit46.set_widthbase("");
            this.Div01.form.Edit46.set_heightbase("");
            this.Div01.form.Edit47.set_leftbase("");
            this.Div01.form.Edit47.set_topbase("");
            this.Div01.form.Edit47.set_bottombase("");
            this.Div01.form.Edit47.set_rightbase("");
            this.Div01.form.Edit47.set_widthbase("");
            this.Div01.form.Edit47.set_heightbase("");
            this.Div01.form.Edit48.set_leftbase("");
            this.Div01.form.Edit48.set_topbase("");
            this.Div01.form.Edit48.set_bottombase("");
            this.Div01.form.Edit48.set_rightbase("");
            this.Div01.form.Edit48.set_widthbase("");
            this.Div01.form.Edit48.set_heightbase("");
            this.Div01.form.Edit49.set_leftbase("");
            this.Div01.form.Edit49.set_topbase("");
            this.Div01.form.Edit49.set_bottombase("");
            this.Div01.form.Edit49.set_rightbase("");
            this.Div01.form.Edit49.set_widthbase("");
            this.Div01.form.Edit49.set_heightbase("");
            this.Div01.form.Edit50.set_leftbase("");
            this.Div01.form.Edit50.set_topbase("");
            this.Div01.form.Edit50.set_bottombase("");
            this.Div01.form.Edit50.set_rightbase("");
            this.Div01.form.Edit50.set_widthbase("");
            this.Div01.form.Edit50.set_heightbase("");
            this.Div01.form.Edit51.set_leftbase("");
            this.Div01.form.Edit51.set_topbase("");
            this.Div01.form.Edit51.set_bottombase("");
            this.Div01.form.Edit51.set_rightbase("");
            this.Div01.form.Edit51.set_widthbase("");
            this.Div01.form.Edit51.set_heightbase("");
            this.Div01.form.Edit52.set_leftbase("");
            this.Div01.form.Edit52.set_topbase("");
            this.Div01.form.Edit52.set_bottombase("");
            this.Div01.form.Edit52.set_rightbase("");
            this.Div01.form.Edit52.set_widthbase("");
            this.Div01.form.Edit52.set_heightbase("");
            this.Div01.form.Edit53.set_leftbase("");
            this.Div01.form.Edit53.set_topbase("");
            this.Div01.form.Edit53.set_bottombase("");
            this.Div01.form.Edit53.set_rightbase("");
            this.Div01.form.Edit53.set_widthbase("");
            this.Div01.form.Edit53.set_heightbase("");
            this.Div01.form.Edit54.set_leftbase("");
            this.Div01.form.Edit54.set_topbase("");
            this.Div01.form.Edit54.set_bottombase("");
            this.Div01.form.Edit54.set_rightbase("");
            this.Div01.form.Edit54.set_widthbase("");
            this.Div01.form.Edit54.set_heightbase("");
            this.Div01.form.Edit55.set_leftbase("");
            this.Div01.form.Edit55.set_topbase("");
            this.Div01.form.Edit55.set_bottombase("");
            this.Div01.form.Edit55.set_rightbase("");
            this.Div01.form.Edit55.set_widthbase("");
            this.Div01.form.Edit55.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Grid02.set_leftbase("");
            this.Grid02.set_topbase("");
            this.Grid02.set_bottombase("");
            this.Grid02.set_rightbase("");
            this.Grid02.set_widthbase("");
            this.Grid02.set_heightbase("");
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
            this.Grid01.set_leftbase("");
            this.Grid01.set_topbase("");
            this.Grid01.set_bottombase("");
            this.Grid01.set_rightbase("");
            this.Grid01.set_widthbase("");
            this.Grid01.set_heightbase("");
            this.Button00.set_leftbase("");
            this.Button00.set_topbase("");
            this.Button00.set_bottombase("");
            this.Button00.set_rightbase("");
            this.Button00.set_widthbase("");
            this.Button00.set_heightbase("");
            this.Button01.set_leftbase("");
            this.Button01.set_topbase("");
            this.Button01.set_bottombase("");
            this.Button01.set_rightbase("");
            this.Button01.set_widthbase("");
            this.Button01.set_heightbase("");
            this.Button02.set_leftbase("");
            this.Button02.set_topbase("");
            this.Button02.set_bottombase("");
            this.Button02.set_rightbase("");
            this.Button02.set_widthbase("");
            this.Button02.set_heightbase("");
            this.Button03.set_leftbase("");
            this.Button03.set_topbase("");
            this.Button03.set_bottombase("");
            this.Button03.set_rightbase("");
            this.Button03.set_widthbase("");
            this.Button03.set_heightbase("");
            this.Button04.set_leftbase("");
            this.Button04.set_topbase("");
            this.Button04.set_bottombase("");
            this.Button04.set_rightbase("");
            this.Button04.set_widthbase("");
            this.Button04.set_heightbase("");
            this.Button05.set_leftbase("");
            this.Button05.set_topbase("");
            this.Button05.set_bottombase("");
            this.Button05.set_rightbase("");
            this.Button05.set_widthbase("");
            this.Button05.set_heightbase("");

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

        this.loadIncludeScript("Bm_Sales_ReportPrint.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
