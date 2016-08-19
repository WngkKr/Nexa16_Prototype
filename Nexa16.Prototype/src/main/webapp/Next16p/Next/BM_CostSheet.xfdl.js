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
                obj.set_name("BM_CostSheet");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","30","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고 객 사");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","60","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계 약 처");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","90","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계 약 일 자");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","120","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고객사 담당자");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","106","60","389","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","106","90","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","106","120","161","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","106","30","264","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","395","30","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계 약 명");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","211","90","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("결 제 조 건");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","absolute","316","91","179","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var Radio00_innerdataset = new nexacro.NormalDataset("Radio00_innerdataset", obj);
                Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">일시지급</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">분할지급</Col></Row></Rows>");
                obj.set_innerdataset(Radio00_innerdataset);
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","272","120","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("연 락 처");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","373","120","121","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","496","60","120","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계약금액(VAT별도)");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","496","90","120","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("수금(예정)일");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","496","120","120","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("비 고");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","617","60","455","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","617","90","455","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit06","absolute","617","120","455","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","859","30","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영 업 대 표");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit07","absolute","960","30","112","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit08","absolute","496","30","360","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("Radio01","absolute","748","5","220","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var Radio01_innerdataset = new nexacro.NormalDataset("Radio01_innerdataset", obj);
                Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">사전원가표</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">사후원가표</Col></Row></Rows>");
                obj.set_innerdataset(Radio01_innerdataset);
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","972","5","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("원가표");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","652","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","676","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","177","691","230",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"250\"/><Column size=\"100\"/><Column size=\"48\"/><Column size=\"60\"/><Column size=\"48\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"구분\"/><Cell col=\"1\" colspan=\"6\" text=\"제품 및 상품 매출\"/><Cell row=\"1\" col=\"1\" text=\"제품명\"/><Cell row=\"1\" col=\"2\" text=\"소비자단가\"/><Cell row=\"1\" col=\"3\" text=\"단위\"/><Cell row=\"1\" col=\"4\" text=\"수량\"/><Cell row=\"1\" col=\"5\" text=\"D/C율\"/><Cell row=\"1\" col=\"6\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band><Band id=\"summary\"><Cell colspan=\"6\" text=\"제 품 매 출 총 계\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","704","177","368","230",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"150\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell colspan=\"3\" text=\"제품 및 상품 매입\"/><Cell row=\"1\" text=\"항목\"/><Cell row=\"1\" col=\"1\" text=\"업체명\"/><Cell row=\"1\" col=\"2\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/></Band><Band id=\"summary\"><Cell colspan=\"2\" text=\"제 품 매 입 총 계\"/><Cell col=\"2\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button03","absolute","1028","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button04","absolute","1052","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","5","412","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("제품 예상 이익");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit09","absolute","106","412","230","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid02","absolute","5","439","489","199",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"50\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"구분\"/><Cell col=\"1\" colspan=\"4\" text=\"용역 매출\"/><Cell row=\"1\" col=\"1\" text=\"등급\"/><Cell row=\"1\" col=\"2\" text=\"단가\"/><Cell row=\"1\" col=\"3\" text=\"MM\"/><Cell row=\"1\" col=\"4\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/></Band><Band id=\"summary\"><Cell colspan=\"4\" text=\"용 역 매 출 총 계\"/><Cell col=\"4\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button05","absolute","450","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button06","absolute","474","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button07","absolute","386","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▲");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button08","absolute","410","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▼");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button09","absolute","963","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▲");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button10","absolute","987","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▼");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button11","absolute","1027","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button12","absolute","1051","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid03","absolute","496","439","576","199",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"50\"/><Column size=\"150\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"50\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell colspan=\"6\" text=\"용역 매입\"/><Cell row=\"1\" text=\"등급\"/><Cell row=\"1\" col=\"1\" text=\"업체명\"/><Cell row=\"1\" col=\"2\" text=\"투입인력\"/><Cell row=\"1\" col=\"3\" text=\"단가\"/><Cell row=\"1\" col=\"4\" text=\"MM\"/><Cell row=\"1\" col=\"5\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/></Band><Band id=\"summary\"><Cell colspan=\"5\" text=\"용 역 매 출 총 계\"/><Cell col=\"5\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","5","643","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("용역 예상 이익");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static13","absolute","5","675","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계약 투입 MM");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static15","absolute","5","739","124","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고 객 사");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static16","absolute","130","675","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("실 투입 MM");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static17","absolute","255","675","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("오차");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit10","absolute","130","643","198","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static14","absolute","336","643","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("투비소프트 직원비용");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit11","absolute","5","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit12","absolute","130","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit13","absolute","255","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit14","absolute","130","771","177","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("Radio02","absolute","130","739","177","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                obj.set_direction("vertical");
                var Radio02_innerdataset = new nexacro.NormalDataset("Radio02_innerdataset", obj);
                Radio02_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">1년</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">2년</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">3년</Col></Row></Rows>");
                obj.set_innerdataset(Radio02_innerdataset);
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static18","absolute","384","675","76","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("사   유");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static19","absolute","315","739","145","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("사   유");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","461","739","611","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","absolute","461","675","611","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit15","absolute","461","643","198","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit16","absolute","789","643","283","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static20","absolute","664","643","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("예상 실이익");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
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
            this.Edit01.set_leftbase("");
            this.Edit01.set_topbase("");
            this.Edit01.set_bottombase("");
            this.Edit01.set_rightbase("");
            this.Edit01.set_widthbase("");
            this.Edit01.set_heightbase("");
            this.Calendar00.set_leftbase("");
            this.Calendar00.set_topbase("");
            this.Calendar00.set_bottombase("");
            this.Calendar00.set_rightbase("");
            this.Calendar00.set_widthbase("");
            this.Calendar00.set_heightbase("");
            this.Edit02.set_leftbase("");
            this.Edit02.set_topbase("");
            this.Edit02.set_bottombase("");
            this.Edit02.set_rightbase("");
            this.Edit02.set_widthbase("");
            this.Edit02.set_heightbase("");
            this.Edit00.set_leftbase("");
            this.Edit00.set_topbase("");
            this.Edit00.set_bottombase("");
            this.Edit00.set_rightbase("");
            this.Edit00.set_widthbase("");
            this.Edit00.set_heightbase("");
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
            this.Radio00.set_leftbase("");
            this.Radio00.set_topbase("");
            this.Radio00.set_bottombase("");
            this.Radio00.set_rightbase("");
            this.Radio00.set_widthbase("");
            this.Radio00.set_heightbase("");
            this.Static06.set_leftbase("");
            this.Static06.set_topbase("");
            this.Static06.set_bottombase("");
            this.Static06.set_rightbase("");
            this.Static06.set_widthbase("");
            this.Static06.set_heightbase("");
            this.Edit03.set_leftbase("");
            this.Edit03.set_topbase("");
            this.Edit03.set_bottombase("");
            this.Edit03.set_rightbase("");
            this.Edit03.set_widthbase("");
            this.Edit03.set_heightbase("");
            this.Static07.set_leftbase("");
            this.Static07.set_topbase("");
            this.Static07.set_bottombase("");
            this.Static07.set_rightbase("");
            this.Static07.set_widthbase("");
            this.Static07.set_heightbase("");
            this.Static08.set_leftbase("");
            this.Static08.set_topbase("");
            this.Static08.set_bottombase("");
            this.Static08.set_rightbase("");
            this.Static08.set_widthbase("");
            this.Static08.set_heightbase("");
            this.Static09.set_leftbase("");
            this.Static09.set_topbase("");
            this.Static09.set_bottombase("");
            this.Static09.set_rightbase("");
            this.Static09.set_widthbase("");
            this.Static09.set_heightbase("");
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
            this.Edit06.set_leftbase("");
            this.Edit06.set_topbase("");
            this.Edit06.set_bottombase("");
            this.Edit06.set_rightbase("");
            this.Edit06.set_widthbase("");
            this.Edit06.set_heightbase("");
            this.Static10.set_leftbase("");
            this.Static10.set_topbase("");
            this.Static10.set_bottombase("");
            this.Static10.set_rightbase("");
            this.Static10.set_widthbase("");
            this.Static10.set_heightbase("");
            this.Edit07.set_leftbase("");
            this.Edit07.set_topbase("");
            this.Edit07.set_bottombase("");
            this.Edit07.set_rightbase("");
            this.Edit07.set_widthbase("");
            this.Edit07.set_heightbase("");
            this.Edit08.set_leftbase("");
            this.Edit08.set_topbase("");
            this.Edit08.set_bottombase("");
            this.Edit08.set_rightbase("");
            this.Edit08.set_widthbase("");
            this.Edit08.set_heightbase("");
            this.Radio01.set_leftbase("");
            this.Radio01.set_topbase("");
            this.Radio01.set_bottombase("");
            this.Radio01.set_rightbase("");
            this.Radio01.set_widthbase("");
            this.Radio01.set_heightbase("");
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
            this.Static11.set_leftbase("");
            this.Static11.set_topbase("");
            this.Static11.set_bottombase("");
            this.Static11.set_rightbase("");
            this.Static11.set_widthbase("");
            this.Static11.set_heightbase("");
            this.Edit09.set_leftbase("");
            this.Edit09.set_topbase("");
            this.Edit09.set_bottombase("");
            this.Edit09.set_rightbase("");
            this.Edit09.set_widthbase("");
            this.Edit09.set_heightbase("");
            this.Grid02.set_leftbase("");
            this.Grid02.set_topbase("");
            this.Grid02.set_bottombase("");
            this.Grid02.set_rightbase("");
            this.Grid02.set_widthbase("");
            this.Grid02.set_heightbase("");
            this.Button05.set_leftbase("");
            this.Button05.set_topbase("");
            this.Button05.set_bottombase("");
            this.Button05.set_rightbase("");
            this.Button05.set_widthbase("");
            this.Button05.set_heightbase("");
            this.Button06.set_leftbase("");
            this.Button06.set_topbase("");
            this.Button06.set_bottombase("");
            this.Button06.set_rightbase("");
            this.Button06.set_widthbase("");
            this.Button06.set_heightbase("");
            this.Button07.set_leftbase("");
            this.Button07.set_topbase("");
            this.Button07.set_bottombase("");
            this.Button07.set_rightbase("");
            this.Button07.set_widthbase("");
            this.Button07.set_heightbase("");
            this.Button08.set_leftbase("");
            this.Button08.set_topbase("");
            this.Button08.set_bottombase("");
            this.Button08.set_rightbase("");
            this.Button08.set_widthbase("");
            this.Button08.set_heightbase("");
            this.Button09.set_leftbase("");
            this.Button09.set_topbase("");
            this.Button09.set_bottombase("");
            this.Button09.set_rightbase("");
            this.Button09.set_widthbase("");
            this.Button09.set_heightbase("");
            this.Button10.set_leftbase("");
            this.Button10.set_topbase("");
            this.Button10.set_bottombase("");
            this.Button10.set_rightbase("");
            this.Button10.set_widthbase("");
            this.Button10.set_heightbase("");
            this.Button11.set_leftbase("");
            this.Button11.set_topbase("");
            this.Button11.set_bottombase("");
            this.Button11.set_rightbase("");
            this.Button11.set_widthbase("");
            this.Button11.set_heightbase("");
            this.Button12.set_leftbase("");
            this.Button12.set_topbase("");
            this.Button12.set_bottombase("");
            this.Button12.set_rightbase("");
            this.Button12.set_widthbase("");
            this.Button12.set_heightbase("");
            this.Grid03.set_leftbase("");
            this.Grid03.set_topbase("");
            this.Grid03.set_bottombase("");
            this.Grid03.set_rightbase("");
            this.Grid03.set_widthbase("");
            this.Grid03.set_heightbase("");
            this.Static12.set_leftbase("");
            this.Static12.set_topbase("");
            this.Static12.set_bottombase("");
            this.Static12.set_rightbase("");
            this.Static12.set_widthbase("");
            this.Static12.set_heightbase("");
            this.Static13.set_leftbase("");
            this.Static13.set_topbase("");
            this.Static13.set_bottombase("");
            this.Static13.set_rightbase("");
            this.Static13.set_widthbase("");
            this.Static13.set_heightbase("");
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
            this.Static17.set_leftbase("");
            this.Static17.set_topbase("");
            this.Static17.set_bottombase("");
            this.Static17.set_rightbase("");
            this.Static17.set_widthbase("");
            this.Static17.set_heightbase("");
            this.Edit10.set_leftbase("");
            this.Edit10.set_topbase("");
            this.Edit10.set_bottombase("");
            this.Edit10.set_rightbase("");
            this.Edit10.set_widthbase("");
            this.Edit10.set_heightbase("");
            this.Static14.set_leftbase("");
            this.Static14.set_topbase("");
            this.Static14.set_bottombase("");
            this.Static14.set_rightbase("");
            this.Static14.set_widthbase("");
            this.Static14.set_heightbase("");
            this.Edit11.set_leftbase("");
            this.Edit11.set_topbase("");
            this.Edit11.set_bottombase("");
            this.Edit11.set_rightbase("");
            this.Edit11.set_widthbase("");
            this.Edit11.set_heightbase("");
            this.Edit12.set_leftbase("");
            this.Edit12.set_topbase("");
            this.Edit12.set_bottombase("");
            this.Edit12.set_rightbase("");
            this.Edit12.set_widthbase("");
            this.Edit12.set_heightbase("");
            this.Edit13.set_leftbase("");
            this.Edit13.set_topbase("");
            this.Edit13.set_bottombase("");
            this.Edit13.set_rightbase("");
            this.Edit13.set_widthbase("");
            this.Edit13.set_heightbase("");
            this.Edit14.set_leftbase("");
            this.Edit14.set_topbase("");
            this.Edit14.set_bottombase("");
            this.Edit14.set_rightbase("");
            this.Edit14.set_widthbase("");
            this.Edit14.set_heightbase("");
            this.Static18.set_leftbase("");
            this.Static18.set_topbase("");
            this.Static18.set_bottombase("");
            this.Static18.set_rightbase("");
            this.Static18.set_widthbase("");
            this.Static18.set_heightbase("");
            this.Static19.set_leftbase("");
            this.Static19.set_topbase("");
            this.Static19.set_bottombase("");
            this.Static19.set_rightbase("");
            this.Static19.set_widthbase("");
            this.Static19.set_heightbase("");
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");
            this.TextArea01.set_leftbase("");
            this.TextArea01.set_topbase("");
            this.TextArea01.set_bottombase("");
            this.TextArea01.set_rightbase("");
            this.TextArea01.set_widthbase("");
            this.TextArea01.set_heightbase("");
            this.Edit15.set_leftbase("");
            this.Edit15.set_topbase("");
            this.Edit15.set_bottombase("");
            this.Edit15.set_rightbase("");
            this.Edit15.set_widthbase("");
            this.Edit15.set_heightbase("");
            this.Edit16.set_leftbase("");
            this.Edit16.set_topbase("");
            this.Edit16.set_bottombase("");
            this.Edit16.set_rightbase("");
            this.Edit16.set_widthbase("");
            this.Edit16.set_heightbase("");
            this.Static20.set_leftbase("");
            this.Static20.set_topbase("");
            this.Static20.set_bottombase("");
            this.Static20.set_rightbase("");
            this.Static20.set_widthbase("");
            this.Static20.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1078,810,this,function(p){});
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

        this.loadIncludeScript("BM_CostSheet.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
