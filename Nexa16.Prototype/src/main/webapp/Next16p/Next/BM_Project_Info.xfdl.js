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
                obj.set_name("BM_Project_Info");
                obj.set_titletext("프로젝트 진행");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1056,660);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsBizType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">001</Col><Col id=\"NAME\">장기</Col></Row><Row><Col id=\"CODE\">002</Col><Col id=\"NAME\">집중</Col></Row><Row><Col id=\"CODE\">003</Col><Col id=\"NAME\">장기/집중</Col></Row><Row><Col id=\"CODE\">004</Col><Col id=\"NAME\">일반</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsProjectType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">1</Col><Col id=\"NAME\">제품</Col></Row><Row><Col id=\"CODE\">2</Col><Col id=\"NAME\">SI</Col></Row><Row><Col id=\"CODE\">3</Col><Col id=\"NAME\">제품+SI</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPassReqStatus", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">0</Col><Col id=\"NAME\">이관요청</Col></Row><Row><Col id=\"CODE\">1</Col><Col id=\"NAME\">이관승인</Col></Row><Row><Col id=\"CODE\">9</Col><Col id=\"NAME\">요청반려</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new CheckBox("CheckBox00","absolute","10","10","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트 종결");
                obj.set_value("true");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute",null,"10","110","22","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Presale로 등록");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","10","37","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고객사");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","125","37","250","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","377","37","40","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("검색");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","10","64","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프로젝트코드");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","125","64","90","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","220","64","233","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","455","64","80","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("중복확인");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","540","64",null,"22","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj.set_text("프로젝트 중복을 꼭!! 확인하세요.");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","10","91","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프로젝트구분");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","10","118","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업담당자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","10","145","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("이관요청상태");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","125","91","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
                obj.set_innerdataset("@dsProjectType");
                obj.set_codecolumn("CODE");
                obj.set_datacolumn("NAME");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","275","91","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프로젝트코드");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","390","91","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","540","91","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업상태");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","655","91","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","805","91","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업구분");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","920","91",null,"22","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
                obj.set_innerdataset("@dsBizType");
                obj.set_codecolumn("CODE");
                obj.set_datacolumn("NAME");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo04","absolute","125","118","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo05","absolute","125","145","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
                obj.set_innerdataset("@dsPassReqStatus");
                obj.set_codecolumn("CODE");
                obj.set_datacolumn("NAME");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","540","118","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프리세일즈담당자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo06","absolute","655","118","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","805","118","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("컨설팅담당자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo07","absolute","920","118",null,"22","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","275","118","260","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_text("매출담당자는 계약탭에서 계약건별로 선택");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","275","145","178","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button03","absolute","455","145","80","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("이관요청");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","540","145","110","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("OPEN일자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","655","145","145","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
            });
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","absolute","10","177",null,"300","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("담당자");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Grid00");
                obj.set_autofittype("col");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"130\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"100\"/><Column size=\"150\"/><Column size=\"80\"/><Column size=\"202\"/><Column size=\"40\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"회사\"/><Cell col=\"1\" text=\"부서\"/><Cell col=\"2\" text=\"담당자\"/><Cell col=\"3\" text=\"직급\"/><Cell col=\"4\" text=\"역할\"/><Cell col=\"5\" text=\"핸드폰\"/><Cell col=\"6\" text=\"이메일\"/><Cell col=\"7\" text=\"유선\"/><Cell col=\"8\" text=\"비고\"/><Cell col=\"9\" text=\"현황\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("솔루션");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_autofittype("col");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\" band=\"left\"/><Column size=\"200\"/><Column size=\"400\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"구분\"/><Cell col=\"1\" text=\"사용 솔루션\"/><Cell col=\"2\" text=\"비고\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Static("Static13","absolute","10","487","110",null,null,"10",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("주요공유사항");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Tab("Tab01","absolute","125","487",null,null,"10","10",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab01);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("진계약");
            });
            this.Tab01.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","5","5",null,null,"5","5",this.Tab01.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Tab01.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab01);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("가계약");
            });
            this.Tab01.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","5","5",null,null,"5","5",this.Tab01.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Tab01.Tabpage2.addChild(obj.name, obj);

            obj = new Button("Button04","absolute",null,"175","22","22","34",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button05","absolute",null,"175","22","22","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.CheckBox00.set_leftbase("");
            this.CheckBox00.set_topbase("");
            this.CheckBox00.set_bottombase("");
            this.CheckBox00.set_rightbase("");
            this.CheckBox00.set_widthbase("");
            this.CheckBox00.set_heightbase("");
            this.Button00.set_leftbase("");
            this.Button00.set_topbase("");
            this.Button00.set_bottombase("");
            this.Button00.set_rightbase("");
            this.Button00.set_widthbase("");
            this.Button00.set_heightbase("");
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.Edit00.set_leftbase("");
            this.Edit00.set_topbase("");
            this.Edit00.set_bottombase("");
            this.Edit00.set_rightbase("");
            this.Edit00.set_widthbase("");
            this.Edit00.set_heightbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_topbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
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
            this.Button02.set_leftbase("");
            this.Button02.set_topbase("");
            this.Button02.set_bottombase("");
            this.Button02.set_rightbase("");
            this.Button02.set_widthbase("");
            this.Button02.set_heightbase("");
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
            this.Combo04.set_leftbase("");
            this.Combo04.set_topbase("");
            this.Combo04.set_bottombase("");
            this.Combo04.set_rightbase("");
            this.Combo04.set_widthbase("");
            this.Combo04.set_heightbase("");
            this.Combo05.set_leftbase("");
            this.Combo05.set_topbase("");
            this.Combo05.set_bottombase("");
            this.Combo05.set_rightbase("");
            this.Combo05.set_widthbase("");
            this.Combo05.set_heightbase("");
            this.Static09.set_leftbase("");
            this.Static09.set_topbase("");
            this.Static09.set_bottombase("");
            this.Static09.set_rightbase("");
            this.Static09.set_widthbase("");
            this.Static09.set_heightbase("");
            this.Combo06.set_leftbase("");
            this.Combo06.set_topbase("");
            this.Combo06.set_bottombase("");
            this.Combo06.set_rightbase("");
            this.Combo06.set_widthbase("");
            this.Combo06.set_heightbase("");
            this.Static10.set_leftbase("");
            this.Static10.set_topbase("");
            this.Static10.set_bottombase("");
            this.Static10.set_rightbase("");
            this.Static10.set_widthbase("");
            this.Static10.set_heightbase("");
            this.Combo07.set_leftbase("");
            this.Combo07.set_topbase("");
            this.Combo07.set_bottombase("");
            this.Combo07.set_rightbase("");
            this.Combo07.set_widthbase("");
            this.Combo07.set_heightbase("");
            this.Edit03.set_leftbase("");
            this.Edit03.set_topbase("");
            this.Edit03.set_bottombase("");
            this.Edit03.set_rightbase("");
            this.Edit03.set_widthbase("");
            this.Edit03.set_heightbase("");
            this.Button03.set_leftbase("");
            this.Button03.set_topbase("");
            this.Button03.set_bottombase("");
            this.Button03.set_rightbase("");
            this.Button03.set_widthbase("");
            this.Button03.set_heightbase("");
            this.Static12.set_leftbase("");
            this.Static12.set_topbase("");
            this.Static12.set_bottombase("");
            this.Static12.set_rightbase("");
            this.Static12.set_widthbase("");
            this.Static12.set_heightbase("");
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
            this.Static13.set_leftbase("");
            this.Static13.set_topbase("");
            this.Static13.set_bottombase("");
            this.Static13.set_rightbase("");
            this.Static13.set_widthbase("");
            this.Static13.set_heightbase("");
            this.Tab01.set_leftbase("");
            this.Tab01.set_topbase("");
            this.Tab01.set_bottombase("");
            this.Tab01.set_rightbase("");
            this.Tab01.set_widthbase("");
            this.Tab01.set_heightbase("");
            this.Tab01.Tabpage1.form.TextArea00.set_leftbase("");
            this.Tab01.Tabpage1.form.TextArea00.set_topbase("");
            this.Tab01.Tabpage1.form.TextArea00.set_bottombase("");
            this.Tab01.Tabpage1.form.TextArea00.set_rightbase("");
            this.Tab01.Tabpage1.form.TextArea00.set_widthbase("");
            this.Tab01.Tabpage1.form.TextArea00.set_heightbase("");
            this.Tab01.Tabpage2.form.TextArea00.set_leftbase("");
            this.Tab01.Tabpage2.form.TextArea00.set_topbase("");
            this.Tab01.Tabpage2.form.TextArea00.set_bottombase("");
            this.Tab01.Tabpage2.form.TextArea00.set_rightbase("");
            this.Tab01.Tabpage2.form.TextArea00.set_widthbase("");
            this.Tab01.Tabpage2.form.TextArea00.set_heightbase("");
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
            obj = new Layout("default","",1056,660,this,function(p){});
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

        this.loadIncludeScript("BM_Project_Info.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
