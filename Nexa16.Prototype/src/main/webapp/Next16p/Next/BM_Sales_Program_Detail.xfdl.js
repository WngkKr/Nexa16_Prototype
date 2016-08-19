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
                obj.set_name("BM_Sales_Program_Detail");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,560,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","5","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 고객사");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","33","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 프로젝트");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","61","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 계약명");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","89","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 영업상태");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","5","117","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 납품일자");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","5","145","65","55",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 비고");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","71","5","321","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","71","33","121","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","193","33",null,"27","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","71","61",null,"27","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","71","89","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","173","89","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 진척도");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","239","89","60","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","301","89","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 영업");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","367","89","60","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","429","89","65","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text(" 진척도");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","495","89","60","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","71","117","110","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","183","117","90","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계산서 발행일");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","274","117","110","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","391","117","74","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("완료처리");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","471","120","74","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("보고대상");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","71","146",null,"55","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","5","210","83","24",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("* 상세내역");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","236",null,"93","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매출액\"/><Cell col=\"2\" text=\"매출계약처\"/><Cell col=\"3\" text=\"예상율(%)\"/><Cell col=\"4\" text=\"예상매입액\"/><Cell col=\"5\" text=\"매입계약처\"/><Cell col=\"6\" text=\"비고\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","5","339","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("예상매출액");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","5","367","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("투입예정인원");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","89","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","89","367","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static13","absolute","189","339","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("예상매입총액");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static14","absolute","189","367","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("투입기간");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit06","absolute","273","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit07","absolute","273","367","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static15","absolute","373","339","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("순매출");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static16","absolute","373","367","83","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("투입월");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit08","absolute","457","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit09","absolute","457","367","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","absolute","5","404",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("진행사항");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5","120",null,null,"5",this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"일자\"/></Band><Band id=\"body\"><Cell/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","130","5","40","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("구분");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","130","33","40","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("일자");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","171","5","110","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","171","33","110","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","285","5","40","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("보고");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","326","5",null,"27","5",null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","330","5","72","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("보고");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","397","5","88","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("* 중요도");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","449","8","89","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("Combo01");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","286","33","256","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("일정반영");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","130","66",null,null,"5","5",this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage2");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","419","5","63","24",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","491","5","63","24",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
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
            this.Static03.set_leftbase("");
            this.Static03.set_topbase("");
            this.Static03.set_bottombase("");
            this.Static03.set_rightbase("");
            this.Static03.set_widthbase("");
            this.Static03.set_heightbase("");
            this.Static04.set_leftbase("");
            this.Static04.set_topbase("");
            this.Static04.set_bottombase("");
            this.Static04.set_rightbase("");
            this.Static04.set_widthbase("");
            this.Static04.set_heightbase("");
            this.Static05.set_leftbase("");
            this.Static05.set_topbase("");
            this.Static05.set_bottombase("");
            this.Static05.set_rightbase("");
            this.Static05.set_widthbase("");
            this.Static05.set_heightbase("");
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
            this.Combo00.set_leftbase("");
            this.Combo00.set_topbase("");
            this.Combo00.set_bottombase("");
            this.Combo00.set_rightbase("");
            this.Combo00.set_widthbase("");
            this.Combo00.set_heightbase("");
            this.Static06.set_leftbase("");
            this.Static06.set_topbase("");
            this.Static06.set_bottombase("");
            this.Static06.set_rightbase("");
            this.Static06.set_widthbase("");
            this.Static06.set_heightbase("");
            this.Combo01.set_leftbase("");
            this.Combo01.set_topbase("");
            this.Combo01.set_bottombase("");
            this.Combo01.set_rightbase("");
            this.Combo01.set_widthbase("");
            this.Combo01.set_heightbase("");
            this.Static07.set_leftbase("");
            this.Static07.set_topbase("");
            this.Static07.set_bottombase("");
            this.Static07.set_rightbase("");
            this.Static07.set_widthbase("");
            this.Static07.set_heightbase("");
            this.Combo02.set_leftbase("");
            this.Combo02.set_topbase("");
            this.Combo02.set_bottombase("");
            this.Combo02.set_rightbase("");
            this.Combo02.set_widthbase("");
            this.Combo02.set_heightbase("");
            this.Static08.set_leftbase("");
            this.Static08.set_topbase("");
            this.Static08.set_bottombase("");
            this.Static08.set_rightbase("");
            this.Static08.set_widthbase("");
            this.Static08.set_heightbase("");
            this.Combo03.set_leftbase("");
            this.Combo03.set_topbase("");
            this.Combo03.set_bottombase("");
            this.Combo03.set_rightbase("");
            this.Combo03.set_widthbase("");
            this.Combo03.set_heightbase("");
            this.Calendar00.set_leftbase("");
            this.Calendar00.set_topbase("");
            this.Calendar00.set_bottombase("");
            this.Calendar00.set_rightbase("");
            this.Calendar00.set_widthbase("");
            this.Calendar00.set_heightbase("");
            this.Static09.set_leftbase("");
            this.Static09.set_topbase("");
            this.Static09.set_bottombase("");
            this.Static09.set_rightbase("");
            this.Static09.set_widthbase("");
            this.Static09.set_heightbase("");
            this.Calendar01.set_leftbase("");
            this.Calendar01.set_topbase("");
            this.Calendar01.set_bottombase("");
            this.Calendar01.set_rightbase("");
            this.Calendar01.set_widthbase("");
            this.Calendar01.set_heightbase("");
            this.CheckBox00.set_leftbase("");
            this.CheckBox00.set_topbase("");
            this.CheckBox00.set_bottombase("");
            this.CheckBox00.set_rightbase("");
            this.CheckBox00.set_widthbase("");
            this.CheckBox00.set_heightbase("");
            this.CheckBox01.set_leftbase("");
            this.CheckBox01.set_topbase("");
            this.CheckBox01.set_bottombase("");
            this.CheckBox01.set_rightbase("");
            this.CheckBox01.set_widthbase("");
            this.CheckBox01.set_heightbase("");
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");
            this.Static10.set_leftbase("");
            this.Static10.set_topbase("");
            this.Static10.set_bottombase("");
            this.Static10.set_rightbase("");
            this.Static10.set_widthbase("");
            this.Static10.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Static11.set_leftbase("");
            this.Static11.set_topbase("");
            this.Static11.set_bottombase("");
            this.Static11.set_rightbase("");
            this.Static11.set_widthbase("");
            this.Static11.set_heightbase("");
            this.Static12.set_leftbase("");
            this.Static12.set_topbase("");
            this.Static12.set_bottombase("");
            this.Static12.set_rightbase("");
            this.Static12.set_widthbase("");
            this.Static12.set_heightbase("");
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
            this.Static13.set_leftbase("");
            this.Static13.set_topbase("");
            this.Static13.set_bottombase("");
            this.Static13.set_rightbase("");
            this.Static13.set_widthbase("");
            this.Static13.set_heightbase("");
            this.Static14.set_leftbase("");
            this.Static14.set_topbase("");
            this.Static14.set_bottombase("");
            this.Static14.set_rightbase("");
            this.Static14.set_widthbase("");
            this.Static14.set_heightbase("");
            this.Edit06.set_leftbase("");
            this.Edit06.set_topbase("");
            this.Edit06.set_bottombase("");
            this.Edit06.set_rightbase("");
            this.Edit06.set_widthbase("");
            this.Edit06.set_heightbase("");
            this.Edit07.set_leftbase("");
            this.Edit07.set_topbase("");
            this.Edit07.set_bottombase("");
            this.Edit07.set_rightbase("");
            this.Edit07.set_widthbase("");
            this.Edit07.set_heightbase("");
            this.Static15.set_leftbase("");
            this.Static15.set_topbase("");
            this.Static15.set_bottombase("");
            this.Static15.set_rightbase("");
            this.Static15.set_widthbase("");
            this.Static15.set_heightbase("");
            this.Static16.set_leftbase("");
            this.Static16.set_topbase("");
            this.Static16.set_bottombase("");
            this.Static16.set_rightbase("");
            this.Static16.set_widthbase("");
            this.Static16.set_heightbase("");
            this.Edit08.set_leftbase("");
            this.Edit08.set_topbase("");
            this.Edit08.set_bottombase("");
            this.Edit08.set_rightbase("");
            this.Edit08.set_widthbase("");
            this.Edit08.set_heightbase("");
            this.Edit09.set_leftbase("");
            this.Edit09.set_topbase("");
            this.Edit09.set_bottombase("");
            this.Edit09.set_rightbase("");
            this.Edit09.set_widthbase("");
            this.Edit09.set_heightbase("");
            this.Tab00.set_leftbase("");
            this.Tab00.set_topbase("");
            this.Tab00.set_bottombase("");
            this.Tab00.set_rightbase("");
            this.Tab00.set_widthbase("");
            this.Tab00.set_heightbase("");
            this.Tab00.Tabpage1.form.Grid00.set_leftbase("");
            this.Tab00.Tabpage1.form.Grid00.set_topbase("");
            this.Tab00.Tabpage1.form.Grid00.set_bottombase("");
            this.Tab00.Tabpage1.form.Grid00.set_rightbase("");
            this.Tab00.Tabpage1.form.Grid00.set_widthbase("");
            this.Tab00.Tabpage1.form.Grid00.set_heightbase("");
            this.Tab00.Tabpage1.form.Static00.set_leftbase("");
            this.Tab00.Tabpage1.form.Static00.set_topbase("");
            this.Tab00.Tabpage1.form.Static00.set_bottombase("");
            this.Tab00.Tabpage1.form.Static00.set_rightbase("");
            this.Tab00.Tabpage1.form.Static00.set_widthbase("");
            this.Tab00.Tabpage1.form.Static00.set_heightbase("");
            this.Tab00.Tabpage1.form.Static01.set_leftbase("");
            this.Tab00.Tabpage1.form.Static01.set_topbase("");
            this.Tab00.Tabpage1.form.Static01.set_bottombase("");
            this.Tab00.Tabpage1.form.Static01.set_rightbase("");
            this.Tab00.Tabpage1.form.Static01.set_widthbase("");
            this.Tab00.Tabpage1.form.Static01.set_heightbase("");
            this.Tab00.Tabpage1.form.Combo00.set_leftbase("");
            this.Tab00.Tabpage1.form.Combo00.set_topbase("");
            this.Tab00.Tabpage1.form.Combo00.set_bottombase("");
            this.Tab00.Tabpage1.form.Combo00.set_rightbase("");
            this.Tab00.Tabpage1.form.Combo00.set_widthbase("");
            this.Tab00.Tabpage1.form.Combo00.set_heightbase("");
            this.Tab00.Tabpage1.form.Calendar00.set_leftbase("");
            this.Tab00.Tabpage1.form.Calendar00.set_topbase("");
            this.Tab00.Tabpage1.form.Calendar00.set_bottombase("");
            this.Tab00.Tabpage1.form.Calendar00.set_rightbase("");
            this.Tab00.Tabpage1.form.Calendar00.set_widthbase("");
            this.Tab00.Tabpage1.form.Calendar00.set_heightbase("");
            this.Tab00.Tabpage1.form.Static02.set_leftbase("");
            this.Tab00.Tabpage1.form.Static02.set_topbase("");
            this.Tab00.Tabpage1.form.Static02.set_bottombase("");
            this.Tab00.Tabpage1.form.Static02.set_rightbase("");
            this.Tab00.Tabpage1.form.Static02.set_widthbase("");
            this.Tab00.Tabpage1.form.Static02.set_heightbase("");
            this.Tab00.Tabpage1.form.Static03.set_leftbase("");
            this.Tab00.Tabpage1.form.Static03.set_topbase("");
            this.Tab00.Tabpage1.form.Static03.set_bottombase("");
            this.Tab00.Tabpage1.form.Static03.set_rightbase("");
            this.Tab00.Tabpage1.form.Static03.set_widthbase("");
            this.Tab00.Tabpage1.form.Static03.set_heightbase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_leftbase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_topbase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_bottombase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_rightbase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_widthbase("");
            this.Tab00.Tabpage1.form.CheckBox00.set_heightbase("");
            this.Tab00.Tabpage1.form.Static04.set_leftbase("");
            this.Tab00.Tabpage1.form.Static04.set_topbase("");
            this.Tab00.Tabpage1.form.Static04.set_bottombase("");
            this.Tab00.Tabpage1.form.Static04.set_rightbase("");
            this.Tab00.Tabpage1.form.Static04.set_widthbase("");
            this.Tab00.Tabpage1.form.Static04.set_heightbase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_leftbase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_topbase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_bottombase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_rightbase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_widthbase("");
            this.Tab00.Tabpage1.form.CheckBox01.set_heightbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_leftbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_topbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_bottombase("");
            this.Tab00.Tabpage1.form.TextArea00.set_rightbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_widthbase("");
            this.Tab00.Tabpage1.form.TextArea00.set_heightbase("");
            this.Button01.set_leftbase("");
            this.Button01.set_topbase("");
            this.Button01.set_bottombase("");
            this.Button01.set_rightbase("");
            this.Button01.set_widthbase("");
            this.Button01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",560,600,this,function(p){});
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
            this.Static09.addEventHandler("onclick",this.Static09_onclick,this);
        };

        this.loadIncludeScript("BM_Sales_Program_Detail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
