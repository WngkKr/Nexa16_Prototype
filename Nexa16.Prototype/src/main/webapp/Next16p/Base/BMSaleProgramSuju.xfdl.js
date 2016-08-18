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
                obj.set_name("BMSaleProgramSuju");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","2","5","440","46",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","4","9","96","24",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","48","7","118","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","314","12","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","217","7","118","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","173","9","96","24",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","146","12","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","2","58","444","328",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_binddataset("dsList");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"21\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"고객사\"/><Cell col=\"1\" text=\"계약명\"/><Cell col=\"2\" text=\"제품\"/><Cell col=\"3\" text=\"예상매출\"/><Cell col=\"4\" text=\"PIPE\"/><Cell col=\"5\" text=\"계약예정일\"/><Cell col=\"6\" text=\"G\"/></Band><Band id=\"body\"><Cell text=\"bind:Column0\"/><Cell col=\"1\" text=\"bind:Column1\"/><Cell col=\"2\" text=\"bind:Column2\"/><Cell col=\"3\" text=\"bind:Column3\" displaytype=\"number\" edittype=\"masknumber\" mask=\"999,999,999,999\"/><Cell col=\"4\" text=\"bind:Column4\" displaytype=\"checkbox\" edittype=\"checkbox\"/><Cell col=\"5\" text=\"bind:Column5\" displaytype=\"date\" edittype=\"date\"/><Cell col=\"6\" text=\"bind:Column6\"/></Band><Band id=\"summary\"><Cell colspan=\"3\" text=\"합계\"/><Cell col=\"3\" expr=\"bind:Column3\" displaytype=\"number\" edittype=\"masknumber\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","absolute","3","397","442","241",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("진행사항");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","2","5","87","210",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"일자\"/></Band><Band id=\"body\"><Cell/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","91","15","120","14",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("구분");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","128","10","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","91","39","120","14",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("일자");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","128","37","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","287","9","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("보고");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","288","39","120","18",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("중요도");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","329","36","91","22",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Combo01");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","99","65","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("일정반영");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox02","absolute","291","65","117","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("공개");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","97","92","335","118",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("담당자");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","3","6","432","207",null,null,this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsPerson");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"128\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" text=\"회사\"/><Cell col=\"2\" text=\"부서\"/><Cell col=\"3\" text=\"담당자\"/><Cell col=\"4\" text=\"직급\"/><Cell col=\"5\" text=\"역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"핸드폰\"/><Cell row=\"1\" text=\"현황\"/><Cell row=\"1\" col=\"1\" text=\"유선\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"이메일\"/><Cell row=\"1\" col=\"5\" text=\"비고\"/></Band><Band id=\"body\"><Cell colspan=\"2\" text=\"bind:회사\"/><Cell col=\"2\" text=\"bind:부서\"/><Cell col=\"3\" text=\"bind:담당자\"/><Cell col=\"4\" text=\"bind:직급\"/><Cell col=\"5\" text=\"bind:역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"bind:핸드폰\"/><Cell row=\"1\" text=\"bind:현황\"/><Cell row=\"1\" col=\"1\" text=\"bind:부서\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"bind:이메일\"/><Cell row=\"1\" col=\"5\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","450","1",null,null,"5","9",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Div01");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","1","5","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약구분");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","1","29","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","1","58","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약처");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","1","86","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약예정일");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","1","120","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("비고");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","73","4","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","73","28","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","73","56","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","73","85","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","73","114","217","56",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","158","5","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약구분");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","214","4","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","297","5","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("영업상태");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","351","4","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","174","30","16","18",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","174","58","16","18",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","158","85","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("예상매출액");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","213","86","77","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","297","86","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("담당영업");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","351","85","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","198","29","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","198","54","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약명");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","252","30","49","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","302","30","127","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","252","55","177","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","297","116","120","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("인센티브");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo04","absolute","351","115","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","301","148","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("PIPE라인");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","7","198","120","28",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj.set_text("매출상세내역");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","101","203","328","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("[제품+상품계약일 경우 체크]");
                obj.set_font("0 \"                  \"");
                obj.set_color("red");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","7","227","422","91",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"200\"/><Column size=\"200\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매출액\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매출액\"/></Band></Format></Formats>");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","7","358","420","91",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("Dataset00");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"역할\"/><Cell col=\"1\" text=\"등급\"/><Cell col=\"2\" text=\"예상단가\"/><Cell col=\"3\" text=\"MM\"/><Cell col=\"4\" text=\"금액\"/><Cell col=\"5\" text=\"근무지역\"/><Cell col=\"6\" text=\"비고\"/></Band><Band id=\"body\"><Cell text=\"bind:역할\"/><Cell col=\"1\" text=\"bind:등급\"/><Cell col=\"2\" text=\"bind:예상단가\"/><Cell col=\"3\" text=\"bind:MM\"/><Cell col=\"4\" text=\"bind:금액\"/><Cell col=\"5\" text=\"bind:근무지역\"/><Cell col=\"6\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static13","absolute","7","329","120","28",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj.set_text("용역매출 상세내역");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo05","absolute","123","336","231","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("Combo05");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Grid("Grid02","absolute","7","491","420","91",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList5");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"102\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매입액\"/><Cell col=\"2\" text=\"매입처\"/><Cell col=\"3\" text=\"판매수수료율\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매입액\"/><Cell col=\"2\" text=\"bind:매입처\"/><Cell col=\"3\" text=\"bind:판매수수료율\"/></Band></Format></Formats>");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static14","absolute","7","462","120","28",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj.set_text("용역매출 상세내역");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","382","205","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button03","absolute","406","205","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button04","absolute","382","338","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button05","absolute","406","338","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button06","absolute","382","470","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button07","absolute","406","470","21","19",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button08","absolute","13","596","47","22",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
                obj.set_text("엑셀");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo06","absolute","157","594","76","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("17");
                obj.set_text("Combo06");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button09","absolute","370","592","56","22",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("18");
                obj.set_text("인력요청");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button10","absolute","311","592","56","22",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("18");
                obj.set_text("수주확정");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button11","absolute","238","592","70","22",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("18");
                obj.set_text("매출원가표");
            });
            this.Div01.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Div01.form.Static00.set_leftbase("");
            this.Div01.form.Static00.set_topbase("");
            this.Div01.form.Static00.set_bottombase("");
            this.Div01.form.Static00.set_rightbase("");
            this.Div01.form.Static00.set_widthbase("");
            this.Div01.form.Static00.set_heightbase("");
            this.Div01.form.Combo00.set_leftbase("");
            this.Div01.form.Combo00.set_topbase("");
            this.Div01.form.Combo00.set_bottombase("");
            this.Div01.form.Combo00.set_rightbase("");
            this.Div01.form.Combo00.set_widthbase("");
            this.Div01.form.Combo00.set_heightbase("");
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
            this.Div01.form.Calendar00.set_leftbase("");
            this.Div01.form.Calendar00.set_topbase("");
            this.Div01.form.Calendar00.set_bottombase("");
            this.Div01.form.Calendar00.set_rightbase("");
            this.Div01.form.Calendar00.set_widthbase("");
            this.Div01.form.Calendar00.set_heightbase("");
            this.Div01.form.Combo01.set_leftbase("");
            this.Div01.form.Combo01.set_topbase("");
            this.Div01.form.Combo01.set_bottombase("");
            this.Div01.form.Combo01.set_rightbase("");
            this.Div01.form.Combo01.set_widthbase("");
            this.Div01.form.Combo01.set_heightbase("");
            this.Div01.form.Combo02.set_leftbase("");
            this.Div01.form.Combo02.set_topbase("");
            this.Div01.form.Combo02.set_bottombase("");
            this.Div01.form.Combo02.set_rightbase("");
            this.Div01.form.Combo02.set_widthbase("");
            this.Div01.form.Combo02.set_heightbase("");
            this.Div01.form.CheckBox00.set_leftbase("");
            this.Div01.form.CheckBox00.set_topbase("");
            this.Div01.form.CheckBox00.set_bottombase("");
            this.Div01.form.CheckBox00.set_rightbase("");
            this.Div01.form.CheckBox00.set_widthbase("");
            this.Div01.form.CheckBox00.set_heightbase("");

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

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("BMSaleProgramSuju.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
