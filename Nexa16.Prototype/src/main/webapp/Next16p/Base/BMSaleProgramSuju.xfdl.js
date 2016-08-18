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
                this._setFormPosition(0,0,1056,610);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","5","5","512","46",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","9","45","24",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","55","7","187","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","310","7","196","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","260","9","45","24",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","222","12","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","486","11","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","58","512","289",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_binddataset("dsList");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"120\"/><Column size=\"120\"/><Column size=\"48\"/><Column size=\"80\"/><Column size=\"30\"/><Column size=\"80\"/><Column size=\"21\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"고객사\" textAlign=\"right\"/><Cell col=\"1\" text=\"계약명\"/><Cell col=\"2\" text=\"제품\"/><Cell col=\"3\" text=\"예상매출\"/><Cell col=\"4\" text=\"PIPE\"/><Cell col=\"5\" text=\"계약예정일\"/><Cell col=\"6\" text=\"G\"/></Band><Band id=\"body\"><Cell text=\"bind:Column0\"/><Cell col=\"1\" text=\"bind:Column1\"/><Cell col=\"2\" text=\"bind:Column2\"/><Cell col=\"3\" text=\"bind:Column3\" displaytype=\"number\" edittype=\"masknumber\" mask=\"999,999,999,999\"/><Cell col=\"4\" text=\"bind:Column4\" displaytype=\"checkbox\" edittype=\"checkbox\"/><Cell col=\"5\" text=\"bind:Column5\" displaytype=\"date\" edittype=\"date\"/><Cell col=\"6\" text=\"bind:Column6\"/></Band><Band id=\"summary\"><Cell colspan=\"3\" text=\"합계\"/><Cell col=\"3\" expr=\"bind:Column3\" displaytype=\"number\" edittype=\"masknumber\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","absolute","5","357","512",null,null,"5",this);
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

            obj = new CheckBox("CheckBox01","absolute","99","67","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("일정반영");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox02","absolute","291","67","117","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("공개");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","97","92",null,"118","5",null,this.Tab00.Tabpage1.form);
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

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsPerson");
                obj.set_text("");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"128\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" text=\"회사\"/><Cell col=\"2\" text=\"부서\"/><Cell col=\"3\" text=\"담당자\"/><Cell col=\"4\" text=\"직급\"/><Cell col=\"5\" text=\"역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"핸드폰\"/><Cell row=\"1\" text=\"현황\"/><Cell row=\"1\" col=\"1\" text=\"유선\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"이메일\"/><Cell row=\"1\" col=\"5\" text=\"비고\"/></Band><Band id=\"body\"><Cell colspan=\"2\" text=\"bind:회사\"/><Cell col=\"2\" text=\"bind:부서\"/><Cell col=\"3\" text=\"bind:담당자\"/><Cell col=\"4\" text=\"bind:직급\"/><Cell col=\"5\" text=\"bind:역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"bind:핸드폰\"/><Cell row=\"1\" text=\"bind:현황\"/><Cell row=\"1\" col=\"1\" text=\"bind:부서\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"bind:이메일\"/><Cell row=\"1\" col=\"5\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","524","5",null,null,"5","30",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("Div02");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계약 구분");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","86","5","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","31","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 고  객  사");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","57","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계  약  처");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","83","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계약예정일");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","5","109","80","50",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 비       고");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","177","5","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 제품 구분");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","258","5","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","349","5","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 영업상태");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","430","5","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","86","31","131","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","218","31","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 프로젝트");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","299","31","66","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","366","31","154","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","86","57","131","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","218","57","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계  약  명");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","299","57","221","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","86","83","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","177","83","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("총예상매출액");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","absolute","258","83","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","349","83","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 담당영업");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","430","83","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","349","109","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 인센티브");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Combo("Combo04","absolute","430","109","90","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","349","135","80","25",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" PIPE 라인");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","430","137","90","20",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","86","109","262","50",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","0","164",null,"133","0",null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div02.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 매출 상세내역");
            });
            this.Div02.form.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","0","20",null,null,"0","0",this.Div02.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"200\"/><Column size=\"200\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매출액\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매출액\"/></Band></Format></Formats>");
            });
            this.Div02.form.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute",null,"0","21","19","0",null,this.Div02.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div02.form.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"0","21","19","22",null,this.Div02.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div02.form.Div00.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","101","0","239","20",null,null,this.Div02.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("[제품+상품계약일 경우 체크]");
                obj.set_font("0 \"                  \"");
                obj.set_color("red");
            });
            this.Div02.form.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","0","300",null,"133","0",null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Button("Button00","absolute",null,"0","21","19","22",null,this.Div02.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div02.form.Div01.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"0","21","19","0",null,this.Div02.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div02.form.Div01.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","0","20",null,null,"0","0",this.Div02.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("Dataset00");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"역할\"/><Cell col=\"1\" text=\"등급\"/><Cell col=\"2\" text=\"예상단가\"/><Cell col=\"3\" text=\"MM\"/><Cell col=\"4\" text=\"금액\"/><Cell col=\"5\" text=\"근무지역\"/><Cell col=\"6\" text=\"비고\"/></Band><Band id=\"body\"><Cell text=\"bind:역할\"/><Cell col=\"1\" text=\"bind:등급\"/><Cell col=\"2\" text=\"bind:예상단가\"/><Cell col=\"3\" text=\"bind:MM\"/><Cell col=\"4\" text=\"bind:금액\"/><Cell col=\"5\" text=\"bind:근무지역\"/><Cell col=\"6\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Div02.form.Div01.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div02.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 용역매출 상세내역");
            });
            this.Div02.form.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","123","0","231","19",null,null,this.Div02.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("Combo05");
            });
            this.Div02.form.Div01.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","0","436",null,null,"0","5",this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Button("Button00","absolute",null,"0","21","19","0",null,this.Div02.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div02.form.Div02.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"0","21","19","22",null,this.Div02.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div02.form.Div02.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div02.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 매입 상세내역");
            });
            this.Div02.form.Div02.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","0","20",null,null,"0","0",this.Div02.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList5");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"102\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매입액\"/><Cell col=\"2\" text=\"매입처\"/><Cell col=\"3\" text=\"판매수수료율\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매입액\"/><Cell col=\"2\" text=\"bind:매입처\"/><Cell col=\"3\" text=\"bind:판매수수료율\"/></Band></Format></Formats>");
            });
            this.Div02.form.Div02.addChild(obj.name, obj);

            obj = new Button("btnChgGrdFormat","absolute","11","63","66","16",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("중요체크");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnStaffReqApp","absolute",null,null,"78","20","5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("인력요청");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSujuFix","absolute",null,null,"78","20","88","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("계약확정");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSoojuCancel","absolute",null,null,"78","20","171","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("수주취소");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnCostSheet","absolute",null,null,"78","20","254","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("매출원가표");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("cmbGrade","absolute",null,null,"78","20","337","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSave_Excel","absolute","524",null,"51","20",null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("엑셀");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
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
            this.Div00.form.Edit00.set_leftbase("");
            this.Div00.form.Edit00.set_topbase("");
            this.Div00.form.Edit00.set_bottombase("");
            this.Div00.form.Edit00.set_rightbase("");
            this.Div00.form.Edit00.set_widthbase("");
            this.Div00.form.Edit00.set_heightbase("");
            this.Div00.form.Edit01.set_leftbase("");
            this.Div00.form.Edit01.set_topbase("");
            this.Div00.form.Edit01.set_bottombase("");
            this.Div00.form.Edit01.set_rightbase("");
            this.Div00.form.Edit01.set_widthbase("");
            this.Div00.form.Edit01.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Tab00.set_leftbase("");
            this.Tab00.set_topbase("");
            this.Tab00.set_bottombase("");
            this.Tab00.set_rightbase("");
            this.Tab00.set_widthbase("");
            this.Tab00.set_heightbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_leftbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_topbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_bottombase("");
            this.Tab00.Tabpage1.form.TextArea00.set_rightbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_widthbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_heightbase("");
            this.Tab00.Tabpage2.form.Grid00.set_leftbase("");
            this.Tab00.Tabpage2.form.Grid00.set_topbase("");
            this.Tab00.Tabpage2.form.Grid00.set_bottombase("");
            this.Tab00.Tabpage2.form.Grid00.set_rightbase("");
            this.Tab00.Tabpage2.form.Grid00.set_widthbase("");
            this.Tab00.Tabpage2.form.Grid00.set_heightbase("");
            this.Div02.set_leftbase("");
            this.Div02.set_topbase("");
            this.Div02.set_bottombase("");
            this.Div02.set_rightbase("");
            this.Div02.set_widthbase("");
            this.Div02.set_heightbase("");
            this.Div02.form.Static00.set_leftbase("");
            this.Div02.form.Static00.set_topbase("");
            this.Div02.form.Static00.set_bottombase("");
            this.Div02.form.Static00.set_rightbase("");
            this.Div02.form.Static00.set_widthbase("");
            this.Div02.form.Static00.set_heightbase("");
            this.Div02.form.Combo00.set_leftbase("");
            this.Div02.form.Combo00.set_topbase("");
            this.Div02.form.Combo00.set_bottombase("");
            this.Div02.form.Combo00.set_rightbase("");
            this.Div02.form.Combo00.set_widthbase("");
            this.Div02.form.Combo00.set_heightbase("");
            this.Div02.form.Static01.set_leftbase("");
            this.Div02.form.Static01.set_topbase("");
            this.Div02.form.Static01.set_bottombase("");
            this.Div02.form.Static01.set_rightbase("");
            this.Div02.form.Static01.set_widthbase("");
            this.Div02.form.Static01.set_heightbase("");
            this.Div02.form.Static02.set_leftbase("");
            this.Div02.form.Static02.set_topbase("");
            this.Div02.form.Static02.set_bottombase("");
            this.Div02.form.Static02.set_rightbase("");
            this.Div02.form.Static02.set_widthbase("");
            this.Div02.form.Static02.set_heightbase("");
            this.Div02.form.Static03.set_leftbase("");
            this.Div02.form.Static03.set_topbase("");
            this.Div02.form.Static03.set_bottombase("");
            this.Div02.form.Static03.set_rightbase("");
            this.Div02.form.Static03.set_widthbase("");
            this.Div02.form.Static03.set_heightbase("");
            this.Div02.form.Static04.set_leftbase("");
            this.Div02.form.Static04.set_topbase("");
            this.Div02.form.Static04.set_bottombase("");
            this.Div02.form.Static04.set_rightbase("");
            this.Div02.form.Static04.set_widthbase("");
            this.Div02.form.Static04.set_heightbase("");
            this.Div02.form.Static05.set_leftbase("");
            this.Div02.form.Static05.set_topbase("");
            this.Div02.form.Static05.set_bottombase("");
            this.Div02.form.Static05.set_rightbase("");
            this.Div02.form.Static05.set_widthbase("");
            this.Div02.form.Static05.set_heightbase("");
            this.Div02.form.Combo01.set_leftbase("");
            this.Div02.form.Combo01.set_topbase("");
            this.Div02.form.Combo01.set_bottombase("");
            this.Div02.form.Combo01.set_rightbase("");
            this.Div02.form.Combo01.set_widthbase("");
            this.Div02.form.Combo01.set_heightbase("");
            this.Div02.form.Static06.set_leftbase("");
            this.Div02.form.Static06.set_topbase("");
            this.Div02.form.Static06.set_bottombase("");
            this.Div02.form.Static06.set_rightbase("");
            this.Div02.form.Static06.set_widthbase("");
            this.Div02.form.Static06.set_heightbase("");
            this.Div02.form.Combo02.set_leftbase("");
            this.Div02.form.Combo02.set_topbase("");
            this.Div02.form.Combo02.set_bottombase("");
            this.Div02.form.Combo02.set_rightbase("");
            this.Div02.form.Combo02.set_widthbase("");
            this.Div02.form.Combo02.set_heightbase("");
            this.Div02.form.Edit00.set_leftbase("");
            this.Div02.form.Edit00.set_topbase("");
            this.Div02.form.Edit00.set_bottombase("");
            this.Div02.form.Edit00.set_rightbase("");
            this.Div02.form.Edit00.set_widthbase("");
            this.Div02.form.Edit00.set_heightbase("");
            this.Div02.form.Static07.set_leftbase("");
            this.Div02.form.Static07.set_topbase("");
            this.Div02.form.Static07.set_bottombase("");
            this.Div02.form.Static07.set_rightbase("");
            this.Div02.form.Static07.set_widthbase("");
            this.Div02.form.Static07.set_heightbase("");
            this.Div02.form.Edit01.set_leftbase("");
            this.Div02.form.Edit01.set_topbase("");
            this.Div02.form.Edit01.set_bottombase("");
            this.Div02.form.Edit01.set_rightbase("");
            this.Div02.form.Edit01.set_widthbase("");
            this.Div02.form.Edit01.set_heightbase("");
            this.Div02.form.Edit02.set_leftbase("");
            this.Div02.form.Edit02.set_topbase("");
            this.Div02.form.Edit02.set_bottombase("");
            this.Div02.form.Edit02.set_rightbase("");
            this.Div02.form.Edit02.set_widthbase("");
            this.Div02.form.Edit02.set_heightbase("");
            this.Div02.form.Edit03.set_leftbase("");
            this.Div02.form.Edit03.set_topbase("");
            this.Div02.form.Edit03.set_bottombase("");
            this.Div02.form.Edit03.set_rightbase("");
            this.Div02.form.Edit03.set_widthbase("");
            this.Div02.form.Edit03.set_heightbase("");
            this.Div02.form.Static08.set_leftbase("");
            this.Div02.form.Static08.set_topbase("");
            this.Div02.form.Static08.set_bottombase("");
            this.Div02.form.Static08.set_rightbase("");
            this.Div02.form.Static08.set_widthbase("");
            this.Div02.form.Static08.set_heightbase("");
            this.Div02.form.Edit04.set_leftbase("");
            this.Div02.form.Edit04.set_topbase("");
            this.Div02.form.Edit04.set_bottombase("");
            this.Div02.form.Edit04.set_rightbase("");
            this.Div02.form.Edit04.set_widthbase("");
            this.Div02.form.Edit04.set_heightbase("");
            this.Div02.form.Calendar00.set_leftbase("");
            this.Div02.form.Calendar00.set_topbase("");
            this.Div02.form.Calendar00.set_bottombase("");
            this.Div02.form.Calendar00.set_rightbase("");
            this.Div02.form.Calendar00.set_widthbase("");
            this.Div02.form.Calendar00.set_heightbase("");
            this.Div02.form.Static09.set_leftbase("");
            this.Div02.form.Static09.set_topbase("");
            this.Div02.form.Static09.set_bottombase("");
            this.Div02.form.Static09.set_rightbase("");
            this.Div02.form.Static09.set_widthbase("");
            this.Div02.form.Static09.set_heightbase("");
            this.Div02.form.MaskEdit00.set_leftbase("");
            this.Div02.form.MaskEdit00.set_topbase("");
            this.Div02.form.MaskEdit00.set_bottombase("");
            this.Div02.form.MaskEdit00.set_rightbase("");
            this.Div02.form.MaskEdit00.set_widthbase("");
            this.Div02.form.MaskEdit00.set_heightbase("");
            this.Div02.form.Static10.set_leftbase("");
            this.Div02.form.Static10.set_topbase("");
            this.Div02.form.Static10.set_bottombase("");
            this.Div02.form.Static10.set_rightbase("");
            this.Div02.form.Static10.set_widthbase("");
            this.Div02.form.Static10.set_heightbase("");
            this.Div02.form.Combo03.set_leftbase("");
            this.Div02.form.Combo03.set_topbase("");
            this.Div02.form.Combo03.set_bottombase("");
            this.Div02.form.Combo03.set_rightbase("");
            this.Div02.form.Combo03.set_widthbase("");
            this.Div02.form.Combo03.set_heightbase("");
            this.Div02.form.Static11.set_leftbase("");
            this.Div02.form.Static11.set_topbase("");
            this.Div02.form.Static11.set_bottombase("");
            this.Div02.form.Static11.set_rightbase("");
            this.Div02.form.Static11.set_widthbase("");
            this.Div02.form.Static11.set_heightbase("");
            this.Div02.form.Combo04.set_leftbase("");
            this.Div02.form.Combo04.set_topbase("");
            this.Div02.form.Combo04.set_bottombase("");
            this.Div02.form.Combo04.set_rightbase("");
            this.Div02.form.Combo04.set_widthbase("");
            this.Div02.form.Combo04.set_heightbase("");
            this.Div02.form.Static12.set_leftbase("");
            this.Div02.form.Static12.set_topbase("");
            this.Div02.form.Static12.set_bottombase("");
            this.Div02.form.Static12.set_rightbase("");
            this.Div02.form.Static12.set_widthbase("");
            this.Div02.form.Static12.set_heightbase("");
            this.Div02.form.TextArea00.set_leftbase("");
            this.Div02.form.TextArea00.set_topbase("");
            this.Div02.form.TextArea00.set_bottombase("");
            this.Div02.form.TextArea00.set_rightbase("");
            this.Div02.form.TextArea00.set_widthbase("");
            this.Div02.form.TextArea00.set_heightbase("");
            this.Div02.form.Div00.set_leftbase("");
            this.Div02.form.Div00.set_topbase("");
            this.Div02.form.Div00.set_bottombase("");
            this.Div02.form.Div00.set_rightbase("");
            this.Div02.form.Div00.set_widthbase("");
            this.Div02.form.Div00.set_heightbase("");
            this.Div02.form.Div00.form.Static00.set_leftbase("");
            this.Div02.form.Div00.form.Static00.set_topbase("");
            this.Div02.form.Div00.form.Static00.set_bottombase("");
            this.Div02.form.Div00.form.Static00.set_rightbase("");
            this.Div02.form.Div00.form.Static00.set_widthbase("");
            this.Div02.form.Div00.form.Static00.set_heightbase("");
            this.Div02.form.Div00.form.Grid00.set_leftbase("");
            this.Div02.form.Div00.form.Grid00.set_topbase("");
            this.Div02.form.Div00.form.Grid00.set_bottombase("");
            this.Div02.form.Div00.form.Grid00.set_rightbase("");
            this.Div02.form.Div00.form.Grid00.set_widthbase("");
            this.Div02.form.Div00.form.Grid00.set_heightbase("");
            this.Div02.form.Div00.form.Button00.set_leftbase("");
            this.Div02.form.Div00.form.Button00.set_topbase("");
            this.Div02.form.Div00.form.Button00.set_bottombase("");
            this.Div02.form.Div00.form.Button00.set_rightbase("");
            this.Div02.form.Div00.form.Button00.set_widthbase("");
            this.Div02.form.Div00.form.Button00.set_heightbase("");
            this.Div02.form.Div00.form.Button01.set_leftbase("");
            this.Div02.form.Div00.form.Button01.set_topbase("");
            this.Div02.form.Div00.form.Button01.set_bottombase("");
            this.Div02.form.Div00.form.Button01.set_rightbase("");
            this.Div02.form.Div00.form.Button01.set_widthbase("");
            this.Div02.form.Div00.form.Button01.set_heightbase("");
            this.Div02.form.Div01.set_leftbase("");
            this.Div02.form.Div01.set_topbase("");
            this.Div02.form.Div01.set_bottombase("");
            this.Div02.form.Div01.set_rightbase("");
            this.Div02.form.Div01.set_widthbase("");
            this.Div02.form.Div01.set_heightbase("");
            this.Div02.form.Div01.form.Button00.set_leftbase("");
            this.Div02.form.Div01.form.Button00.set_topbase("");
            this.Div02.form.Div01.form.Button00.set_bottombase("");
            this.Div02.form.Div01.form.Button00.set_rightbase("");
            this.Div02.form.Div01.form.Button00.set_widthbase("");
            this.Div02.form.Div01.form.Button00.set_heightbase("");
            this.Div02.form.Div01.form.Button01.set_leftbase("");
            this.Div02.form.Div01.form.Button01.set_topbase("");
            this.Div02.form.Div01.form.Button01.set_bottombase("");
            this.Div02.form.Div01.form.Button01.set_rightbase("");
            this.Div02.form.Div01.form.Button01.set_widthbase("");
            this.Div02.form.Div01.form.Button01.set_heightbase("");
            this.Div02.form.Div01.form.Grid00.set_leftbase("");
            this.Div02.form.Div01.form.Grid00.set_topbase("");
            this.Div02.form.Div01.form.Grid00.set_bottombase("");
            this.Div02.form.Div01.form.Grid00.set_rightbase("");
            this.Div02.form.Div01.form.Grid00.set_widthbase("");
            this.Div02.form.Div01.form.Grid00.set_heightbase("");
            this.Div02.form.Div01.form.Static00.set_leftbase("");
            this.Div02.form.Div01.form.Static00.set_topbase("");
            this.Div02.form.Div01.form.Static00.set_bottombase("");
            this.Div02.form.Div01.form.Static00.set_rightbase("");
            this.Div02.form.Div01.form.Static00.set_widthbase("");
            this.Div02.form.Div01.form.Static00.set_heightbase("");
            this.Div02.form.Div01.form.Combo00.set_leftbase("");
            this.Div02.form.Div01.form.Combo00.set_topbase("");
            this.Div02.form.Div01.form.Combo00.set_bottombase("");
            this.Div02.form.Div01.form.Combo00.set_rightbase("");
            this.Div02.form.Div01.form.Combo00.set_widthbase("");
            this.Div02.form.Div01.form.Combo00.set_heightbase("");
            this.Div02.form.Div02.set_leftbase("");
            this.Div02.form.Div02.set_topbase("");
            this.Div02.form.Div02.set_bottombase("");
            this.Div02.form.Div02.set_rightbase("");
            this.Div02.form.Div02.set_widthbase("");
            this.Div02.form.Div02.set_heightbase("");
            this.Div02.form.Div02.form.Button00.set_leftbase("");
            this.Div02.form.Div02.form.Button00.set_topbase("");
            this.Div02.form.Div02.form.Button00.set_bottombase("");
            this.Div02.form.Div02.form.Button00.set_rightbase("");
            this.Div02.form.Div02.form.Button00.set_widthbase("");
            this.Div02.form.Div02.form.Button00.set_heightbase("");
            this.Div02.form.Div02.form.Button01.set_leftbase("");
            this.Div02.form.Div02.form.Button01.set_topbase("");
            this.Div02.form.Div02.form.Button01.set_bottombase("");
            this.Div02.form.Div02.form.Button01.set_rightbase("");
            this.Div02.form.Div02.form.Button01.set_widthbase("");
            this.Div02.form.Div02.form.Button01.set_heightbase("");
            this.Div02.form.Div02.form.Static00.set_leftbase("");
            this.Div02.form.Div02.form.Static00.set_topbase("");
            this.Div02.form.Div02.form.Static00.set_bottombase("");
            this.Div02.form.Div02.form.Static00.set_rightbase("");
            this.Div02.form.Div02.form.Static00.set_widthbase("");
            this.Div02.form.Div02.form.Static00.set_heightbase("");
            this.Div02.form.Div02.form.Grid00.set_leftbase("");
            this.Div02.form.Div02.form.Grid00.set_topbase("");
            this.Div02.form.Div02.form.Grid00.set_bottombase("");
            this.Div02.form.Div02.form.Grid00.set_rightbase("");
            this.Div02.form.Div02.form.Grid00.set_widthbase("");
            this.Div02.form.Div02.form.Grid00.set_heightbase("");
            this.btnStaffReqApp.set_leftbase("");
            this.btnStaffReqApp.set_topbase("");
            this.btnStaffReqApp.set_bottombase("");
            this.btnStaffReqApp.set_rightbase("");
            this.btnStaffReqApp.set_widthbase("");
            this.btnStaffReqApp.set_heightbase("");
            this.btnSujuFix.set_leftbase("");
            this.btnSujuFix.set_topbase("");
            this.btnSujuFix.set_bottombase("");
            this.btnSujuFix.set_rightbase("");
            this.btnSujuFix.set_widthbase("");
            this.btnSujuFix.set_heightbase("");
            this.btnSoojuCancel.set_leftbase("");
            this.btnSoojuCancel.set_topbase("");
            this.btnSoojuCancel.set_bottombase("");
            this.btnSoojuCancel.set_rightbase("");
            this.btnSoojuCancel.set_widthbase("");
            this.btnSoojuCancel.set_heightbase("");
            this.btnCostSheet.set_leftbase("");
            this.btnCostSheet.set_topbase("");
            this.btnCostSheet.set_bottombase("");
            this.btnCostSheet.set_rightbase("");
            this.btnCostSheet.set_widthbase("");
            this.btnCostSheet.set_heightbase("");
            this.cmbGrade.set_leftbase("");
            this.cmbGrade.set_topbase("");
            this.cmbGrade.set_bottombase("");
            this.cmbGrade.set_rightbase("");
            this.cmbGrade.set_widthbase("");
            this.cmbGrade.set_heightbase("");
            this.btnSave_Excel.set_leftbase("");
            this.btnSave_Excel.set_topbase("");
            this.btnSave_Excel.set_bottombase("");
            this.btnSave_Excel.set_rightbase("");
            this.btnSave_Excel.set_widthbase("");
            this.btnSave_Excel.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1056,610,this,function(p){});
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
            this.Div00.form.Edit01.addEventHandler("onchanged",this.Div00_Edit01_onchanged,this);
            this.Div02.form.Static01.addEventHandler("onclick",this.Div02_Static01_onclick,this);
            this.Div02.form.Static02.addEventHandler("onclick",this.Div02_Static02_onclick,this);
            this.Div02.form.Static07.addEventHandler("onclick",this.Div02_Static01_onclick,this);
            this.Div02.form.Static08.addEventHandler("onclick",this.Div02_Static01_onclick,this);
        };

        this.loadIncludeScript("BMSaleProgramSuju.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
