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
                obj.set_name("BM_Sales_Program_Presales");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1056,610);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/><Column id=\"Column6\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">투비소프트</Col><Col id=\"Column1\">워크샵</Col><Col id=\"Column2\">nexa16</Col><Col id=\"Column3\">10000</Col><Col id=\"Column4\">1</Col><Col id=\"Column5\">20160816</Col></Row><Row><Col id=\"Column0\">Shinto-Village</Col><Col id=\"Column1\">Shinto-Village G.BE U</Col><Col id=\"Column2\">nexa16</Col><Col id=\"Column3\">10000</Col><Col id=\"Column4\">0</Col><Col id=\"Column5\">20160816</Col></Row><Row><Col id=\"Column0\">Shinto-Village</Col><Col id=\"Column1\">Shinto-Village G.BE U</Col><Col id=\"Column2\">nexa16</Col><Col id=\"Column3\">10000</Col><Col id=\"Column4\">1</Col><Col id=\"Column5\">20160816</Col></Row><Row><Col id=\"Column0\">Shinto-Village</Col><Col id=\"Column1\">Shinto-Village G.BE U</Col><Col id=\"Column2\">nexa16</Col><Col id=\"Column3\">10000</Col><Col id=\"Column4\">0</Col><Col id=\"Column5\">20160816</Col></Row><Row><Col id=\"Column0\">현대오토에버</Col><Col id=\"Column1\">러시아 페트로스탈 mes구축</Col><Col id=\"Column2\">nexa16</Col><Col id=\"Column3\">10000</Col><Col id=\"Column4\">1</Col><Col id=\"Column5\">20160816</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPerson", this);
            obj._setContents("<ColumnInfo><Column id=\"회사\" type=\"STRING\" size=\"256\"/><Column id=\"현황\" type=\"STRING\" size=\"256\"/><Column id=\"부서\" type=\"STRING\" size=\"256\"/><Column id=\"담당자\" type=\"STRING\" size=\"256\"/><Column id=\"직급\" type=\"STRING\" size=\"256\"/><Column id=\"이메일\" type=\"STRING\" size=\"256\"/><Column id=\"역할\" type=\"STRING\" size=\"256\"/><Column id=\"비고\" type=\"STRING\" size=\"256\"/><Column id=\"핸드폰\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"회사\">투비소프트</Col><Col id=\"현황\">1</Col><Col id=\"부서\">컨설팅</Col><Col id=\"담당자\">방수정</Col><Col id=\"직급\">선임</Col><Col id=\"이메일\">abc@tobe</Col><Col id=\"역할\">개발</Col><Col id=\"비고\">1</Col><Col id=\"핸드폰\">01027620810</Col></Row><Row><Col id=\"회사\">크린토피아</Col><Col id=\"현황\">2</Col><Col id=\"부서\">전산</Col><Col id=\"담당자\">고정민</Col><Col id=\"직급\">선임</Col><Col id=\"이메일\">ggg</Col><Col id=\"역할\">개발</Col><Col id=\"비고\">2</Col><Col id=\"핸드폰\">01012345468</Col></Row><Row><Col id=\"회사\">큰날개</Col><Col id=\"현황\">3</Col><Col id=\"부서\">SOC</Col><Col id=\"담당자\">백설기</Col><Col id=\"직급\">사원</Col><Col id=\"이메일\">aaa@sweethome.com</Col><Col id=\"역할\">귀여움</Col><Col id=\"비고\">3</Col><Col id=\"핸드폰\">01027620810</Col></Row><Row><Col id=\"회사\">철도공사</Col><Col id=\"현황\">4</Col><Col id=\"부서\">SM</Col><Col id=\"담당자\">fsdf</Col><Col id=\"직급\">팀장</Col><Col id=\"이메일\">bigtel</Col><Col id=\"역할\">개발</Col><Col id=\"비고\">4</Col><Col id=\"핸드폰\">01033574444</Col></Row><Row><Col id=\"회사\">삼성SDS</Col><Col id=\"현황\">5</Col><Col id=\"부서\">SI</Col><Col id=\"담당자\">asb</Col><Col id=\"직급\">사원</Col><Col id=\"이메일\">sds@sds.com</Col><Col id=\"역할\">개발</Col><Col id=\"비고\">5</Col><Col id=\"핸드폰\">01060267777</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList3", this);
            obj._setContents("<ColumnInfo><Column id=\"항목\" type=\"STRING\" size=\"256\"/><Column id=\"예상매출액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList4", this);
            obj._setContents("<ColumnInfo><Column id=\"역할\" type=\"STRING\" size=\"256\"/><Column id=\"등급\" type=\"STRING\" size=\"256\"/><Column id=\"예상단가\" type=\"STRING\" size=\"256\"/><Column id=\"MM\" type=\"STRING\" size=\"256\"/><Column id=\"금액\" type=\"STRING\" size=\"256\"/><Column id=\"근무지역\" type=\"STRING\" size=\"256\"/><Column id=\"비고\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList5", this);
            obj._setContents("<ColumnInfo><Column id=\"항목\" type=\"STRING\" size=\"256\"/><Column id=\"예상매입액\" type=\"STRING\" size=\"256\"/><Column id=\"매입처\" type=\"STRING\" size=\"256\"/><Column id=\"판매수수료율\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","absolute","5","5","417","46",null,null,this);
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

            obj = new Edit("edtClientNameF","absolute","55","7","150","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edtContractNameF","absolute","259","7","150","29",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","209","9","45","24",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSearchF","absolute","186","12","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSearchF1","absolute","390","11","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("grdProjectList","absolute","5","58","512","289",null,null,this);
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

            obj = new Grid("T_grd_his","absolute","2","5","87","210",null,null,this.Tab00.Tabpage1.form);
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

            obj = new Combo("cmbIssueGubun","absolute","128","10","150","20",null,null,this.Tab00.Tabpage1.form);
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

            obj = new Calendar("T_calDeliveryDate","absolute","128","37","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("T_chk_report","absolute","287","9","150","20",null,null,this.Tab00.Tabpage1.form);
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

            obj = new Combo("Combo0","absolute","329","36","91","22",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Combo01");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("chb_sch","absolute","99","67","150","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("일정반영");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("chb_visible_pis","absolute","291","67","117","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("공개");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new TextArea("T_txtRemarks","absolute","97","92",null,"118","5",null,this.Tab00.Tabpage1.form);
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

            obj = new Grid("grdBizMemo","absolute","5","5",null,null,"5","5",this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsPerson");
                obj.set_text("");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"128\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" text=\"회사\"/><Cell col=\"2\" text=\"부서\"/><Cell col=\"3\" text=\"담당자\"/><Cell col=\"4\" text=\"직급\"/><Cell col=\"5\" text=\"역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"핸드폰\"/><Cell row=\"1\" text=\"현황\"/><Cell row=\"1\" col=\"1\" text=\"유선\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"이메일\"/><Cell row=\"1\" col=\"5\" text=\"비고\"/></Band><Band id=\"body\"><Cell colspan=\"2\" text=\"bind:회사\"/><Cell col=\"2\" text=\"bind:부서\"/><Cell col=\"3\" text=\"bind:담당자\"/><Cell col=\"4\" text=\"bind:직급\"/><Cell col=\"5\" text=\"bind:역할\"/><Cell col=\"6\" rowspan=\"2\" text=\"bind:핸드폰\"/><Cell row=\"1\" text=\"bind:현황\"/><Cell row=\"1\" col=\"1\" text=\"bind:부서\"/><Cell row=\"1\" col=\"2\" colspan=\"3\" text=\"bind:이메일\"/><Cell row=\"1\" col=\"5\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","524","5",null,null,"5","30",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("Div02");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계약 구분");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbContractType","absolute","86","5","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","31","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 고  객  사");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","57","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계  약  처");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","83","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계약예정일");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","5","109","80","50",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 비       고");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","177","5","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 제품 구분");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbContractProd","absolute","258","5","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","349","5","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 영업상태");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbBizStatus","absolute","430","5","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtClientName","absolute","86","31","131","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","218","31","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 프로젝트");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtProjectCode","absolute","299","31","66","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtProjectName","absolute","366","31","154","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtContractMainName","absolute","86","57","131","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","218","57","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 계  약  명");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("edtContract_Name","absolute","299","57","221","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Calendar("calEstDelevery","absolute","86","83","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","177","83","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("총예상매출액");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new MaskEdit("medt_Sales_Amt","absolute","258","83","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","349","83","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 담당영업");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbBizStaff","absolute","430","83","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","349","109","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" 인센티브");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbSalesStaff","absolute","430","109","90","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Combo00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","349","135","80","25",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text(" PIPE 라인");
                obj.set_border("1px solid darkgray , 1px solid darkgray , 1px solid darkgray , 1px solid darkgray");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new CheckBox("chkPipe","absolute","430","137","90","20",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new TextArea("taCloseRemark","absolute","86","109","262","50",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","0","164",null,"133","0",null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div01.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 매출 상세내역");
            });
            this.Div01.form.Div00.addChild(obj.name, obj);

            obj = new Grid("grd_detail","absolute","0","20",null,null,"0","0",this.Div01.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"200\"/><Column size=\"200\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매출액\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매출액\"/></Band></Format></Formats>");
            });
            this.Div01.form.Div00.addChild(obj.name, obj);

            obj = new Button("btnChannelDel","absolute",null,"0","21","19","0",null,this.Div01.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.form.Div00.addChild(obj.name, obj);

            obj = new Button("btnChannelIns","absolute",null,"0","21","19","22",null,this.Div01.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.form.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkProduct","absolute","101","0","239","20",null,null,this.Div01.form.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj.set_text("[제품+상품계약일 경우 체크]");
                obj.set_font("0 \"                  \"");
                obj.set_color("red");
            });
            this.Div01.form.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","0","300",null,"133","0",null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("btnChannelInsS","absolute",null,"0","21","19","22",null,this.Div01.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.form.Div01.addChild(obj.name, obj);

            obj = new Button("btnChannelDelS","absolute",null,"0","21","19","0",null,this.Div01.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.form.Div01.addChild(obj.name, obj);

            obj = new Grid("grd_detailS","absolute","0","20",null,null,"0","0",this.Div01.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("Dataset00");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"역할\"/><Cell col=\"1\" text=\"등급\"/><Cell col=\"2\" text=\"예상단가\"/><Cell col=\"3\" text=\"MM\"/><Cell col=\"4\" text=\"금액\"/><Cell col=\"5\" text=\"근무지역\"/><Cell col=\"6\" text=\"비고\"/></Band><Band id=\"body\"><Cell text=\"bind:역할\"/><Cell col=\"1\" text=\"bind:등급\"/><Cell col=\"2\" text=\"bind:예상단가\"/><Cell col=\"3\" text=\"bind:MM\"/><Cell col=\"4\" text=\"bind:금액\"/><Cell col=\"5\" text=\"bind:근무지역\"/><Cell col=\"6\" text=\"bind:비고\"/></Band></Format></Formats>");
            });
            this.Div01.form.Div01.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div01.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 용역매출 상세내역");
            });
            this.Div01.form.Div01.addChild(obj.name, obj);

            obj = new Combo("cmbProduct","absolute","123","0","231","19",null,null,this.Div01.form.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("Combo05");
            });
            this.Div01.form.Div01.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","0","436",null,null,"0","5",this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Div00");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("btnChannelDelP","absolute",null,"0","21","19","0",null,this.Div01.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("-");
            });
            this.Div01.form.Div02.addChild(obj.name, obj);

            obj = new Button("btnChannelInsP","absolute",null,"0","21","19","22",null,this.Div01.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("+");
            });
            this.Div01.form.Div02.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","120","15",null,null,this.Div01.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("* 매입 상세내역");
            });
            this.Div01.form.Div02.addChild(obj.name, obj);

            obj = new Grid("grd_detailP","absolute","0","20",null,null,"0","0",this.Div01.form.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_binddataset("dsList5");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"102\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"항목\"/><Cell col=\"1\" text=\"예상매입액\"/><Cell col=\"2\" text=\"매입처\"/><Cell col=\"3\" text=\"판매수수료율\"/></Band><Band id=\"body\"><Cell text=\"bind:항목\"/><Cell col=\"1\" text=\"bind:예상매입액\"/><Cell col=\"2\" text=\"bind:매입처\"/><Cell col=\"3\" text=\"bind:판매수수료율\"/></Band></Format></Formats>");
            });
            this.Div01.form.Div02.addChild(obj.name, obj);

            obj = new Button("btnSearch","absolute","197","34","16","18",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("btnSearch1","absolute","197","61","16","18",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Button("btnChgGrdFormat00","absolute","11","63","66","16",null,null,this);
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
                obj.set_text("수주취소");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnCostSheet","absolute",null,null,"78","20","171","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("매출원가표");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("cmbGrade","absolute",null,null,"78","20","254","5",this);
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

            obj = new CheckBox("chkAdd","absolute","428","12","90","29",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("추가용역");
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
            this.Div00.form.edtClientNameF.set_leftbase("");
            this.Div00.form.edtClientNameF.set_topbase("");
            this.Div00.form.edtClientNameF.set_bottombase("");
            this.Div00.form.edtClientNameF.set_rightbase("");
            this.Div00.form.edtClientNameF.set_widthbase("");
            this.Div00.form.edtClientNameF.set_heightbase("");
            this.Div00.form.edtContractNameF.set_leftbase("");
            this.Div00.form.edtContractNameF.set_topbase("");
            this.Div00.form.edtContractNameF.set_bottombase("");
            this.Div00.form.edtContractNameF.set_rightbase("");
            this.Div00.form.edtContractNameF.set_widthbase("");
            this.Div00.form.edtContractNameF.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.grdProjectList.set_leftbase("");
            this.grdProjectList.set_topbase("");
            this.grdProjectList.set_bottombase("");
            this.grdProjectList.set_rightbase("");
            this.grdProjectList.set_widthbase("");
            this.grdProjectList.set_heightbase("");
            this.Tab00.set_leftbase("");
            this.Tab00.set_topbase("");
            this.Tab00.set_bottombase("");
            this.Tab00.set_rightbase("");
            this.Tab00.set_widthbase("");
            this.Tab00.set_heightbase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_leftbase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_topbase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_bottombase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_rightbase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_widthbase("");
            this.Tab00.Tabpage1.form.T_txtRemarks.set_heightbase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_leftbase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_topbase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_bottombase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_rightbase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_widthbase("");
            this.Tab00.Tabpage2.form.grdBizMemo.set_heightbase("");
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
            this.Div01.form.cmbContractType.set_leftbase("");
            this.Div01.form.cmbContractType.set_topbase("");
            this.Div01.form.cmbContractType.set_bottombase("");
            this.Div01.form.cmbContractType.set_rightbase("");
            this.Div01.form.cmbContractType.set_widthbase("");
            this.Div01.form.cmbContractType.set_heightbase("");
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
            this.Div01.form.cmbContractProd.set_leftbase("");
            this.Div01.form.cmbContractProd.set_topbase("");
            this.Div01.form.cmbContractProd.set_bottombase("");
            this.Div01.form.cmbContractProd.set_rightbase("");
            this.Div01.form.cmbContractProd.set_widthbase("");
            this.Div01.form.cmbContractProd.set_heightbase("");
            this.Div01.form.Static06.set_leftbase("");
            this.Div01.form.Static06.set_topbase("");
            this.Div01.form.Static06.set_bottombase("");
            this.Div01.form.Static06.set_rightbase("");
            this.Div01.form.Static06.set_widthbase("");
            this.Div01.form.Static06.set_heightbase("");
            this.Div01.form.cmbBizStatus.set_leftbase("");
            this.Div01.form.cmbBizStatus.set_topbase("");
            this.Div01.form.cmbBizStatus.set_bottombase("");
            this.Div01.form.cmbBizStatus.set_rightbase("");
            this.Div01.form.cmbBizStatus.set_widthbase("");
            this.Div01.form.cmbBizStatus.set_heightbase("");
            this.Div01.form.edtClientName.set_leftbase("");
            this.Div01.form.edtClientName.set_topbase("");
            this.Div01.form.edtClientName.set_bottombase("");
            this.Div01.form.edtClientName.set_rightbase("");
            this.Div01.form.edtClientName.set_widthbase("");
            this.Div01.form.edtClientName.set_heightbase("");
            this.Div01.form.Static07.set_leftbase("");
            this.Div01.form.Static07.set_topbase("");
            this.Div01.form.Static07.set_bottombase("");
            this.Div01.form.Static07.set_rightbase("");
            this.Div01.form.Static07.set_widthbase("");
            this.Div01.form.Static07.set_heightbase("");
            this.Div01.form.edtProjectCode.set_leftbase("");
            this.Div01.form.edtProjectCode.set_topbase("");
            this.Div01.form.edtProjectCode.set_bottombase("");
            this.Div01.form.edtProjectCode.set_rightbase("");
            this.Div01.form.edtProjectCode.set_widthbase("");
            this.Div01.form.edtProjectCode.set_heightbase("");
            this.Div01.form.edtProjectName.set_leftbase("");
            this.Div01.form.edtProjectName.set_topbase("");
            this.Div01.form.edtProjectName.set_bottombase("");
            this.Div01.form.edtProjectName.set_rightbase("");
            this.Div01.form.edtProjectName.set_widthbase("");
            this.Div01.form.edtProjectName.set_heightbase("");
            this.Div01.form.edtContractMainName.set_leftbase("");
            this.Div01.form.edtContractMainName.set_topbase("");
            this.Div01.form.edtContractMainName.set_bottombase("");
            this.Div01.form.edtContractMainName.set_rightbase("");
            this.Div01.form.edtContractMainName.set_widthbase("");
            this.Div01.form.edtContractMainName.set_heightbase("");
            this.Div01.form.Static08.set_leftbase("");
            this.Div01.form.Static08.set_topbase("");
            this.Div01.form.Static08.set_bottombase("");
            this.Div01.form.Static08.set_rightbase("");
            this.Div01.form.Static08.set_widthbase("");
            this.Div01.form.Static08.set_heightbase("");
            this.Div01.form.edtContract_Name.set_leftbase("");
            this.Div01.form.edtContract_Name.set_topbase("");
            this.Div01.form.edtContract_Name.set_bottombase("");
            this.Div01.form.edtContract_Name.set_rightbase("");
            this.Div01.form.edtContract_Name.set_widthbase("");
            this.Div01.form.edtContract_Name.set_heightbase("");
            this.Div01.form.calEstDelevery.set_leftbase("");
            this.Div01.form.calEstDelevery.set_topbase("");
            this.Div01.form.calEstDelevery.set_bottombase("");
            this.Div01.form.calEstDelevery.set_rightbase("");
            this.Div01.form.calEstDelevery.set_widthbase("");
            this.Div01.form.calEstDelevery.set_heightbase("");
            this.Div01.form.Static09.set_leftbase("");
            this.Div01.form.Static09.set_topbase("");
            this.Div01.form.Static09.set_bottombase("");
            this.Div01.form.Static09.set_rightbase("");
            this.Div01.form.Static09.set_widthbase("");
            this.Div01.form.Static09.set_heightbase("");
            this.Div01.form.medt_Sales_Amt.set_leftbase("");
            this.Div01.form.medt_Sales_Amt.set_topbase("");
            this.Div01.form.medt_Sales_Amt.set_bottombase("");
            this.Div01.form.medt_Sales_Amt.set_rightbase("");
            this.Div01.form.medt_Sales_Amt.set_widthbase("");
            this.Div01.form.medt_Sales_Amt.set_heightbase("");
            this.Div01.form.Static10.set_leftbase("");
            this.Div01.form.Static10.set_topbase("");
            this.Div01.form.Static10.set_bottombase("");
            this.Div01.form.Static10.set_rightbase("");
            this.Div01.form.Static10.set_widthbase("");
            this.Div01.form.Static10.set_heightbase("");
            this.Div01.form.cmbBizStaff.set_leftbase("");
            this.Div01.form.cmbBizStaff.set_topbase("");
            this.Div01.form.cmbBizStaff.set_bottombase("");
            this.Div01.form.cmbBizStaff.set_rightbase("");
            this.Div01.form.cmbBizStaff.set_widthbase("");
            this.Div01.form.cmbBizStaff.set_heightbase("");
            this.Div01.form.Static11.set_leftbase("");
            this.Div01.form.Static11.set_topbase("");
            this.Div01.form.Static11.set_bottombase("");
            this.Div01.form.Static11.set_rightbase("");
            this.Div01.form.Static11.set_widthbase("");
            this.Div01.form.Static11.set_heightbase("");
            this.Div01.form.cmbSalesStaff.set_leftbase("");
            this.Div01.form.cmbSalesStaff.set_topbase("");
            this.Div01.form.cmbSalesStaff.set_bottombase("");
            this.Div01.form.cmbSalesStaff.set_rightbase("");
            this.Div01.form.cmbSalesStaff.set_widthbase("");
            this.Div01.form.cmbSalesStaff.set_heightbase("");
            this.Div01.form.Static12.set_leftbase("");
            this.Div01.form.Static12.set_topbase("");
            this.Div01.form.Static12.set_bottombase("");
            this.Div01.form.Static12.set_rightbase("");
            this.Div01.form.Static12.set_widthbase("");
            this.Div01.form.Static12.set_heightbase("");
            this.Div01.form.taCloseRemark.set_leftbase("");
            this.Div01.form.taCloseRemark.set_topbase("");
            this.Div01.form.taCloseRemark.set_bottombase("");
            this.Div01.form.taCloseRemark.set_rightbase("");
            this.Div01.form.taCloseRemark.set_widthbase("");
            this.Div01.form.taCloseRemark.set_heightbase("");
            this.Div01.form.Div00.set_leftbase("");
            this.Div01.form.Div00.set_topbase("");
            this.Div01.form.Div00.set_bottombase("");
            this.Div01.form.Div00.set_rightbase("");
            this.Div01.form.Div00.set_widthbase("");
            this.Div01.form.Div00.set_heightbase("");
            this.Div01.form.Div00.form.Static00.set_leftbase("");
            this.Div01.form.Div00.form.Static00.set_topbase("");
            this.Div01.form.Div00.form.Static00.set_bottombase("");
            this.Div01.form.Div00.form.Static00.set_rightbase("");
            this.Div01.form.Div00.form.Static00.set_widthbase("");
            this.Div01.form.Div00.form.Static00.set_heightbase("");
            this.Div01.form.Div00.form.grd_detail.set_leftbase("");
            this.Div01.form.Div00.form.grd_detail.set_topbase("");
            this.Div01.form.Div00.form.grd_detail.set_bottombase("");
            this.Div01.form.Div00.form.grd_detail.set_rightbase("");
            this.Div01.form.Div00.form.grd_detail.set_widthbase("");
            this.Div01.form.Div00.form.grd_detail.set_heightbase("");
            this.Div01.form.Div00.form.btnChannelDel.set_leftbase("");
            this.Div01.form.Div00.form.btnChannelDel.set_topbase("");
            this.Div01.form.Div00.form.btnChannelDel.set_bottombase("");
            this.Div01.form.Div00.form.btnChannelDel.set_rightbase("");
            this.Div01.form.Div00.form.btnChannelDel.set_widthbase("");
            this.Div01.form.Div00.form.btnChannelDel.set_heightbase("");
            this.Div01.form.Div00.form.btnChannelIns.set_leftbase("");
            this.Div01.form.Div00.form.btnChannelIns.set_topbase("");
            this.Div01.form.Div00.form.btnChannelIns.set_bottombase("");
            this.Div01.form.Div00.form.btnChannelIns.set_rightbase("");
            this.Div01.form.Div00.form.btnChannelIns.set_widthbase("");
            this.Div01.form.Div00.form.btnChannelIns.set_heightbase("");
            this.Div01.form.Div01.set_leftbase("");
            this.Div01.form.Div01.set_topbase("");
            this.Div01.form.Div01.set_bottombase("");
            this.Div01.form.Div01.set_rightbase("");
            this.Div01.form.Div01.set_widthbase("");
            this.Div01.form.Div01.set_heightbase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_leftbase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_topbase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_bottombase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_rightbase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_widthbase("");
            this.Div01.form.Div01.form.btnChannelInsS.set_heightbase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_leftbase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_topbase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_bottombase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_rightbase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_widthbase("");
            this.Div01.form.Div01.form.btnChannelDelS.set_heightbase("");
            this.Div01.form.Div01.form.grd_detailS.set_leftbase("");
            this.Div01.form.Div01.form.grd_detailS.set_topbase("");
            this.Div01.form.Div01.form.grd_detailS.set_bottombase("");
            this.Div01.form.Div01.form.grd_detailS.set_rightbase("");
            this.Div01.form.Div01.form.grd_detailS.set_widthbase("");
            this.Div01.form.Div01.form.grd_detailS.set_heightbase("");
            this.Div01.form.Div01.form.Static00.set_leftbase("");
            this.Div01.form.Div01.form.Static00.set_topbase("");
            this.Div01.form.Div01.form.Static00.set_bottombase("");
            this.Div01.form.Div01.form.Static00.set_rightbase("");
            this.Div01.form.Div01.form.Static00.set_widthbase("");
            this.Div01.form.Div01.form.Static00.set_heightbase("");
            this.Div01.form.Div01.form.cmbProduct.set_leftbase("");
            this.Div01.form.Div01.form.cmbProduct.set_topbase("");
            this.Div01.form.Div01.form.cmbProduct.set_bottombase("");
            this.Div01.form.Div01.form.cmbProduct.set_rightbase("");
            this.Div01.form.Div01.form.cmbProduct.set_widthbase("");
            this.Div01.form.Div01.form.cmbProduct.set_heightbase("");
            this.Div01.form.Div02.set_leftbase("");
            this.Div01.form.Div02.set_topbase("");
            this.Div01.form.Div02.set_bottombase("");
            this.Div01.form.Div02.set_rightbase("");
            this.Div01.form.Div02.set_widthbase("");
            this.Div01.form.Div02.set_heightbase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_leftbase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_topbase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_bottombase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_rightbase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_widthbase("");
            this.Div01.form.Div02.form.btnChannelDelP.set_heightbase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_leftbase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_topbase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_bottombase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_rightbase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_widthbase("");
            this.Div01.form.Div02.form.btnChannelInsP.set_heightbase("");
            this.Div01.form.Div02.form.Static00.set_leftbase("");
            this.Div01.form.Div02.form.Static00.set_topbase("");
            this.Div01.form.Div02.form.Static00.set_bottombase("");
            this.Div01.form.Div02.form.Static00.set_rightbase("");
            this.Div01.form.Div02.form.Static00.set_widthbase("");
            this.Div01.form.Div02.form.Static00.set_heightbase("");
            this.Div01.form.Div02.form.grd_detailP.set_leftbase("");
            this.Div01.form.Div02.form.grd_detailP.set_topbase("");
            this.Div01.form.Div02.form.grd_detailP.set_bottombase("");
            this.Div01.form.Div02.form.grd_detailP.set_rightbase("");
            this.Div01.form.Div02.form.grd_detailP.set_widthbase("");
            this.Div01.form.Div02.form.grd_detailP.set_heightbase("");
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
            this.Div00.form.edtContractNameF.addEventHandler("onchanged",this.Div00_Edit01_onchanged,this);
            this.Div01.form.Static01.addEventHandler("onclick",this.Div02_Static01_onclick,this);
            this.Div01.form.Static02.addEventHandler("onclick",this.Div02_Static02_onclick,this);
            this.Div01.form.Static07.addEventHandler("onclick",this.Div02_Static01_onclick,this);
            this.Div01.form.Static08.addEventHandler("onclick",this.Div02_Static01_onclick,this);
        };

        this.loadIncludeScript("BM_Sales_Program_Presales.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
