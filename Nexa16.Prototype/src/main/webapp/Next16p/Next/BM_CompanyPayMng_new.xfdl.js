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
                obj.set_name("BM_CompanyPayMng_new");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1050,660);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","5","5","515","150",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("업체명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","0","25","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","0","50","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","0","75","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객서명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","0","100","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("매출계약명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","0","125","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약서번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","332","0","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("업체코드");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","298","50","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약일자");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","247","125","100","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이전계약서번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","101","0","225","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","101","25","388","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","101","75","388","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","101","100","388","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","101","125","137","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","348","125","141","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","101","50","90","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","193","50","25","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","204","50","90","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar02","absolute","399","50","90","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit06","absolute","433","0","56","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","492","25","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","492","101","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","492","125","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","527","5","515","150",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("업체명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","0","25","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","0","50","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","0","75","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객서명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","0","100","100","45",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("매출계약명");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","242","0","136","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("지급총액(부가세 포함)");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","164","25","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","353","25","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","101","0","135","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","379","0","134","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","101","25","59","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","265","25","83","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","454","25","59","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Radio("Radio00","absolute","101","50","169","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var Div01_form_Radio00_innerdataset = new nexacro.NormalDataset("Div01_form_Radio00_innerdataset", obj);
                Div01_form_Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">계약서</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">발주서</Col></Row></Rows>");
                obj.set_innerdataset(Div01_form_Radio00_innerdataset);
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","265","50","60","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("파일등록");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","326","50","80","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("매입계약서");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","408","50","100","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("조기종료확인서");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","101","75","59","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","185","75","150","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("투입인력 생성여부");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","342","75","150","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("비고반영");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","101","100",null,"45","0",null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Tab("Tab00","absolute","5","185",null,null,"5","276",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("투입인력");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/><Column size=\"82\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"성명\"/><Cell col=\"1\" text=\"회사\"/><Cell col=\"2\" text=\"등급\"/><Cell col=\"3\" text=\"투입일\"/><Cell col=\"4\" text=\"종료일\"/><Cell col=\"5\" text=\"매출단가\"/><Cell col=\"6\" text=\"월단가\"/><Cell col=\"7\" text=\"합계금액\"/><Cell col=\"8\" text=\"투입구분\"/><Cell col=\"9\" text=\"기준\"/><Cell col=\"10\" text=\"MM\"/><Cell col=\"11\" text=\"계약상태\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/><Cell col=\"10\"/><Cell col=\"11\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("요청내역");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"140\"/><Column size=\"140\"/><Column size=\"140\"/><Column size=\"140\"/><Column size=\"140\"/><Column size=\"140\"/><Column size=\"140\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"프로젝트명\"/><Cell col=\"1\" text=\"투입구분\"/><Cell col=\"2\" text=\"등급\"/><Cell col=\"3\" text=\"시작일자\"/><Cell col=\"4\" text=\"종료일자\"/><Cell col=\"5\" text=\"요청인원\"/><Cell col=\"6\" text=\"투입단가\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","395","255","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("* 용역계약내역");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","528","395","255","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("* 지급내역");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","420","515",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"40\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"30\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"48\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"등급\"/><Cell col=\"1\" text=\"게시일자\"/><Cell col=\"2\" text=\"종료일자\"/><Cell col=\"3\" text=\"인원\"/><Cell col=\"4\" text=\"계약단가\"/><Cell col=\"5\" text=\"계약금액\"/><Cell col=\"6\" text=\"MM\"/><Cell col=\"7\" text=\"비고\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","530","420","515",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"85\"/><Column size=\"20\"/><Column size=\"85\"/><Column size=\"85\"/><Column size=\"85\"/><Column size=\"80\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"3\" text=\"역무기간\"/><Cell col=\"3\" text=\"지급예정일\"/><Cell col=\"4\" text=\"공급가액\"/><Cell col=\"5\" text=\"부가세금액\"/><Cell col=\"6\" text=\"지급\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\" text=\"~\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","407","160","113","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("복사&추가");
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
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.Static02.set_leftbase("");
            this.Div00.form.Static02.set_topbase("");
            this.Div00.form.Static02.set_bottombase("");
            this.Div00.form.Static02.set_rightbase("");
            this.Div00.form.Static02.set_widthbase("");
            this.Div00.form.Static02.set_heightbase("");
            this.Div00.form.Static03.set_leftbase("");
            this.Div00.form.Static03.set_topbase("");
            this.Div00.form.Static03.set_bottombase("");
            this.Div00.form.Static03.set_rightbase("");
            this.Div00.form.Static03.set_widthbase("");
            this.Div00.form.Static03.set_heightbase("");
            this.Div00.form.Static04.set_leftbase("");
            this.Div00.form.Static04.set_topbase("");
            this.Div00.form.Static04.set_bottombase("");
            this.Div00.form.Static04.set_rightbase("");
            this.Div00.form.Static04.set_widthbase("");
            this.Div00.form.Static04.set_heightbase("");
            this.Div00.form.Static05.set_leftbase("");
            this.Div00.form.Static05.set_topbase("");
            this.Div00.form.Static05.set_bottombase("");
            this.Div00.form.Static05.set_rightbase("");
            this.Div00.form.Static05.set_widthbase("");
            this.Div00.form.Static05.set_heightbase("");
            this.Div00.form.Static06.set_leftbase("");
            this.Div00.form.Static06.set_topbase("");
            this.Div00.form.Static06.set_bottombase("");
            this.Div00.form.Static06.set_rightbase("");
            this.Div00.form.Static06.set_widthbase("");
            this.Div00.form.Static06.set_heightbase("");
            this.Div00.form.Static07.set_leftbase("");
            this.Div00.form.Static07.set_topbase("");
            this.Div00.form.Static07.set_bottombase("");
            this.Div00.form.Static07.set_rightbase("");
            this.Div00.form.Static07.set_widthbase("");
            this.Div00.form.Static07.set_heightbase("");
            this.Div00.form.Static08.set_leftbase("");
            this.Div00.form.Static08.set_topbase("");
            this.Div00.form.Static08.set_bottombase("");
            this.Div00.form.Static08.set_rightbase("");
            this.Div00.form.Static08.set_widthbase("");
            this.Div00.form.Static08.set_heightbase("");
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
            this.Div00.form.Edit02.set_leftbase("");
            this.Div00.form.Edit02.set_topbase("");
            this.Div00.form.Edit02.set_bottombase("");
            this.Div00.form.Edit02.set_rightbase("");
            this.Div00.form.Edit02.set_widthbase("");
            this.Div00.form.Edit02.set_heightbase("");
            this.Div00.form.Edit03.set_leftbase("");
            this.Div00.form.Edit03.set_topbase("");
            this.Div00.form.Edit03.set_bottombase("");
            this.Div00.form.Edit03.set_rightbase("");
            this.Div00.form.Edit03.set_widthbase("");
            this.Div00.form.Edit03.set_heightbase("");
            this.Div00.form.Edit04.set_leftbase("");
            this.Div00.form.Edit04.set_topbase("");
            this.Div00.form.Edit04.set_bottombase("");
            this.Div00.form.Edit04.set_rightbase("");
            this.Div00.form.Edit04.set_widthbase("");
            this.Div00.form.Edit04.set_heightbase("");
            this.Div00.form.Edit05.set_leftbase("");
            this.Div00.form.Edit05.set_topbase("");
            this.Div00.form.Edit05.set_bottombase("");
            this.Div00.form.Edit05.set_rightbase("");
            this.Div00.form.Edit05.set_widthbase("");
            this.Div00.form.Edit05.set_heightbase("");
            this.Div00.form.Calendar00.set_leftbase("");
            this.Div00.form.Calendar00.set_topbase("");
            this.Div00.form.Calendar00.set_bottombase("");
            this.Div00.form.Calendar00.set_rightbase("");
            this.Div00.form.Calendar00.set_widthbase("");
            this.Div00.form.Calendar00.set_heightbase("");
            this.Div00.form.Static09.set_leftbase("");
            this.Div00.form.Static09.set_topbase("");
            this.Div00.form.Static09.set_bottombase("");
            this.Div00.form.Static09.set_rightbase("");
            this.Div00.form.Static09.set_widthbase("");
            this.Div00.form.Static09.set_heightbase("");
            this.Div00.form.Calendar01.set_leftbase("");
            this.Div00.form.Calendar01.set_topbase("");
            this.Div00.form.Calendar01.set_bottombase("");
            this.Div00.form.Calendar01.set_rightbase("");
            this.Div00.form.Calendar01.set_widthbase("");
            this.Div00.form.Calendar01.set_heightbase("");
            this.Div00.form.Calendar02.set_leftbase("");
            this.Div00.form.Calendar02.set_topbase("");
            this.Div00.form.Calendar02.set_bottombase("");
            this.Div00.form.Calendar02.set_rightbase("");
            this.Div00.form.Calendar02.set_widthbase("");
            this.Div00.form.Calendar02.set_heightbase("");
            this.Div00.form.Edit06.set_leftbase("");
            this.Div00.form.Edit06.set_topbase("");
            this.Div00.form.Edit06.set_bottombase("");
            this.Div00.form.Edit06.set_rightbase("");
            this.Div00.form.Edit06.set_widthbase("");
            this.Div00.form.Edit06.set_heightbase("");
            this.Div01.set_leftbase("");
            this.Div01.set_topbase("");
            this.Div01.set_bottombase("");
            this.Div01.set_rightbase("");
            this.Div01.set_widthbase("");
            this.Div01.set_heightbase("");
            this.Div01.form.Static00.set_leftbase("");
            this.Div01.form.Static00.set_topbase("");
            this.Div01.form.Static00.set_bottombase("");
            this.Div01.form.Static00.set_rightbase("");
            this.Div01.form.Static00.set_widthbase("");
            this.Div01.form.Static00.set_heightbase("");
            this.Div01.form.Static01.set_leftbase("");
            this.Div01.form.Static01.set_topbase("");
            this.Div01.form.Static01.set_bottombase("");
            this.Div01.form.Static01.set_rightbase("");
            this.Div01.form.Static01.set_widthbase("");
            this.Div01.form.Static01.set_heightbase("");
            this.Div01.form.Static02.set_leftbase("");
            this.Div01.form.Static02.set_topbase("");
            this.Div01.form.Static02.set_bottombase("");
            this.Div01.form.Static02.set_rightbase("");
            this.Div01.form.Static02.set_widthbase("");
            this.Div01.form.Static02.set_heightbase("");
            this.Div01.form.Static03.set_leftbase("");
            this.Div01.form.Static03.set_topbase("");
            this.Div01.form.Static03.set_bottombase("");
            this.Div01.form.Static03.set_rightbase("");
            this.Div01.form.Static03.set_widthbase("");
            this.Div01.form.Static03.set_heightbase("");
            this.Div01.form.Static04.set_leftbase("");
            this.Div01.form.Static04.set_topbase("");
            this.Div01.form.Static04.set_bottombase("");
            this.Div01.form.Static04.set_rightbase("");
            this.Div01.form.Static04.set_widthbase("");
            this.Div01.form.Static04.set_heightbase("");
            this.Div01.form.Static05.set_leftbase("");
            this.Div01.form.Static05.set_topbase("");
            this.Div01.form.Static05.set_bottombase("");
            this.Div01.form.Static05.set_rightbase("");
            this.Div01.form.Static05.set_widthbase("");
            this.Div01.form.Static05.set_heightbase("");
            this.Div01.form.Static06.set_leftbase("");
            this.Div01.form.Static06.set_topbase("");
            this.Div01.form.Static06.set_bottombase("");
            this.Div01.form.Static06.set_rightbase("");
            this.Div01.form.Static06.set_widthbase("");
            this.Div01.form.Static06.set_heightbase("");
            this.Div01.form.Static07.set_leftbase("");
            this.Div01.form.Static07.set_topbase("");
            this.Div01.form.Static07.set_bottombase("");
            this.Div01.form.Static07.set_rightbase("");
            this.Div01.form.Static07.set_widthbase("");
            this.Div01.form.Static07.set_heightbase("");
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
            this.Div01.form.Radio00.set_leftbase("");
            this.Div01.form.Radio00.set_topbase("");
            this.Div01.form.Radio00.set_bottombase("");
            this.Div01.form.Radio00.set_rightbase("");
            this.Div01.form.Radio00.set_widthbase("");
            this.Div01.form.Radio00.set_heightbase("");
            this.Div01.form.Button00.set_leftbase("");
            this.Div01.form.Button00.set_topbase("");
            this.Div01.form.Button00.set_bottombase("");
            this.Div01.form.Button00.set_rightbase("");
            this.Div01.form.Button00.set_widthbase("");
            this.Div01.form.Button00.set_heightbase("");
            this.Div01.form.Button01.set_leftbase("");
            this.Div01.form.Button01.set_topbase("");
            this.Div01.form.Button01.set_bottombase("");
            this.Div01.form.Button01.set_rightbase("");
            this.Div01.form.Button01.set_widthbase("");
            this.Div01.form.Button01.set_heightbase("");
            this.Div01.form.Button02.set_leftbase("");
            this.Div01.form.Button02.set_topbase("");
            this.Div01.form.Button02.set_bottombase("");
            this.Div01.form.Button02.set_rightbase("");
            this.Div01.form.Button02.set_widthbase("");
            this.Div01.form.Button02.set_heightbase("");
            this.Div01.form.TextArea00.set_leftbase("");
            this.Div01.form.TextArea00.set_topbase("");
            this.Div01.form.TextArea00.set_bottombase("");
            this.Div01.form.TextArea00.set_rightbase("");
            this.Div01.form.TextArea00.set_widthbase("");
            this.Div01.form.TextArea00.set_heightbase("");
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
            this.Tab00.Tabpage2.form.Grid00.set_leftbase("");
            this.Tab00.Tabpage2.form.Grid00.set_topbase("");
            this.Tab00.Tabpage2.form.Grid00.set_bottombase("");
            this.Tab00.Tabpage2.form.Grid00.set_rightbase("");
            this.Tab00.Tabpage2.form.Grid00.set_widthbase("");
            this.Tab00.Tabpage2.form.Grid00.set_heightbase("");
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
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
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

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1050,660,this,function(p){});
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

        this.loadIncludeScript("BM_CompanyPayMng_new.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
