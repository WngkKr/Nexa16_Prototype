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

            obj = new Edit("edtCompany","absolute","106","60","389","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("calContractDate","absolute","106","90","100","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtChargeEmpNm","absolute","106","120","161","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtClient","absolute","106","30","264","27",null,null,this);
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

            obj = new Radio("radPayType","absolute","316","91","179","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var radPayType_innerdataset = new nexacro.NormalDataset("radPayType_innerdataset", obj);
                radPayType_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">일시지급</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">분할지급</Col></Row></Rows>");
                obj.set_innerdataset(radPayType_innerdataset);
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

            obj = new Edit("edtChargeEmpPhone","absolute","373","120","121","27",null,null,this);
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

            obj = new Edit("metContractPrice","absolute","617","60","455","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtBillPlanDate","absolute","617","90","455","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("txtRemark1","absolute","617","120","455","27",null,null,this);
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

            obj = new Edit("edtBizStaffNm","absolute","960","30","112","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtContractName","absolute","496","30","360","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("radSheetType","absolute","748","5","220","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var radSheetType_innerdataset = new nexacro.NormalDataset("radSheetType_innerdataset", obj);
                radSheetType_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">사전원가표</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">사후원가표</Col></Row></Rows>");
                obj.set_innerdataset(radSheetType_innerdataset);
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnPrint","absolute","972","5","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("원가표");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProductSAdd","absolute","652","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProductSDel","absolute","676","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdProductSale","absolute","5","177","691","230",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"250\"/><Column size=\"100\"/><Column size=\"48\"/><Column size=\"60\"/><Column size=\"48\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"구분\"/><Cell col=\"1\" colspan=\"6\" text=\"제품 및 상품 매출\"/><Cell row=\"1\" col=\"1\" text=\"제품명\"/><Cell row=\"1\" col=\"2\" text=\"소비자단가\"/><Cell row=\"1\" col=\"3\" text=\"단위\"/><Cell row=\"1\" col=\"4\" text=\"수량\"/><Cell row=\"1\" col=\"5\" text=\"D/C율\"/><Cell row=\"1\" col=\"6\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band><Band id=\"summary\"><Cell colspan=\"6\" text=\"제 품 매 출 총 계\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdProductPurc","absolute","704","177","368","230",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"150\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell colspan=\"3\" text=\"제품 및 상품 매입\"/><Cell row=\"1\" text=\"항목\"/><Cell row=\"1\" col=\"1\" text=\"업체명\"/><Cell row=\"1\" col=\"2\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/></Band><Band id=\"summary\"><Cell colspan=\"2\" text=\"제 품 매 입 총 계\"/><Cell col=\"2\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProductPAdd","absolute","1028","152","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProductPDel","absolute","1052","152","20","20",null,null,this);
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

            obj = new Edit("metExpectedProfitP","absolute","106","412","230","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdSISale","absolute","5","439","489","199",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"50\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"구분\"/><Cell col=\"1\" colspan=\"4\" text=\"용역 매출\"/><Cell row=\"1\" col=\"1\" text=\"등급\"/><Cell row=\"1\" col=\"2\" text=\"단가\"/><Cell row=\"1\" col=\"3\" text=\"MM\"/><Cell row=\"1\" col=\"4\" text=\"금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/></Band><Band id=\"summary\"><Cell colspan=\"4\" text=\"용 역 매 출 총 계\"/><Cell col=\"4\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSISAdd","absolute","450","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSISDel","absolute","474","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSISMoveU","absolute","386","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▲");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSISMoveD","absolute","410","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▼");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSIPMoveU","absolute","963","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▲");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSIPMoveD","absolute","987","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("▼");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSIPAdd","absolute","1027","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSIPDel","absolute","1051","416","20","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdSIPurc","absolute","496","439","576","199",null,null,this);
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
                obj.set_text("무상 유지보수 기간");
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

            obj = new Edit("metExpectedProfitS","absolute","130","643","198","27",null,null,this);
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

            obj = new Edit("metContractMemmonth","absolute","5","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("metExpectedMemmonth","absolute","130","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("metMistakeMemmonth","absolute","255","707","124","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtManintenanceTxt","absolute","130","771","177","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("radMaintenance","absolute","130","739","177","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                obj.set_direction("vertical");
                var radMaintenance_innerdataset = new nexacro.NormalDataset("radMaintenance_innerdataset", obj);
                radMaintenance_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">1년</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">2년</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">3년</Col></Row></Rows>");
                obj.set_innerdataset(radMaintenance_innerdataset);
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
                obj.set_text("특이사항");
                obj.set_border("1px solid #808080 , 1px solid #808080 , 1px solid #808080 , 1px solid #808080");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("txtRemark3","absolute","461","739","611","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("txtRemark2","absolute","461","675","611","59",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("metTobeStaffCost","absolute","461","643","198","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("metActualProfit","absolute","789","643","283","27",null,null,this);
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

            obj = new Button("btnSearch","absolute","373","34","16","18",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
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
            this.edtCompany.set_leftbase("");
            this.edtCompany.set_topbase("");
            this.edtCompany.set_bottombase("");
            this.edtCompany.set_rightbase("");
            this.edtCompany.set_widthbase("");
            this.edtCompany.set_heightbase("");
            this.calContractDate.set_leftbase("");
            this.calContractDate.set_topbase("");
            this.calContractDate.set_bottombase("");
            this.calContractDate.set_rightbase("");
            this.calContractDate.set_widthbase("");
            this.calContractDate.set_heightbase("");
            this.edtChargeEmpNm.set_leftbase("");
            this.edtChargeEmpNm.set_topbase("");
            this.edtChargeEmpNm.set_bottombase("");
            this.edtChargeEmpNm.set_rightbase("");
            this.edtChargeEmpNm.set_widthbase("");
            this.edtChargeEmpNm.set_heightbase("");
            this.edtClient.set_leftbase("");
            this.edtClient.set_topbase("");
            this.edtClient.set_bottombase("");
            this.edtClient.set_rightbase("");
            this.edtClient.set_widthbase("");
            this.edtClient.set_heightbase("");
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
            this.radPayType.set_leftbase("");
            this.radPayType.set_topbase("");
            this.radPayType.set_bottombase("");
            this.radPayType.set_rightbase("");
            this.radPayType.set_widthbase("");
            this.radPayType.set_heightbase("");
            this.Static06.set_leftbase("");
            this.Static06.set_topbase("");
            this.Static06.set_bottombase("");
            this.Static06.set_rightbase("");
            this.Static06.set_widthbase("");
            this.Static06.set_heightbase("");
            this.edtChargeEmpPhone.set_leftbase("");
            this.edtChargeEmpPhone.set_topbase("");
            this.edtChargeEmpPhone.set_bottombase("");
            this.edtChargeEmpPhone.set_rightbase("");
            this.edtChargeEmpPhone.set_widthbase("");
            this.edtChargeEmpPhone.set_heightbase("");
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
            this.metContractPrice.set_leftbase("");
            this.metContractPrice.set_topbase("");
            this.metContractPrice.set_bottombase("");
            this.metContractPrice.set_rightbase("");
            this.metContractPrice.set_widthbase("");
            this.metContractPrice.set_heightbase("");
            this.edtBillPlanDate.set_leftbase("");
            this.edtBillPlanDate.set_topbase("");
            this.edtBillPlanDate.set_bottombase("");
            this.edtBillPlanDate.set_rightbase("");
            this.edtBillPlanDate.set_widthbase("");
            this.edtBillPlanDate.set_heightbase("");
            this.txtRemark1.set_leftbase("");
            this.txtRemark1.set_topbase("");
            this.txtRemark1.set_bottombase("");
            this.txtRemark1.set_rightbase("");
            this.txtRemark1.set_widthbase("");
            this.txtRemark1.set_heightbase("");
            this.Static10.set_leftbase("");
            this.Static10.set_topbase("");
            this.Static10.set_bottombase("");
            this.Static10.set_rightbase("");
            this.Static10.set_widthbase("");
            this.Static10.set_heightbase("");
            this.edtBizStaffNm.set_leftbase("");
            this.edtBizStaffNm.set_topbase("");
            this.edtBizStaffNm.set_bottombase("");
            this.edtBizStaffNm.set_rightbase("");
            this.edtBizStaffNm.set_widthbase("");
            this.edtBizStaffNm.set_heightbase("");
            this.edtContractName.set_leftbase("");
            this.edtContractName.set_topbase("");
            this.edtContractName.set_bottombase("");
            this.edtContractName.set_rightbase("");
            this.edtContractName.set_widthbase("");
            this.edtContractName.set_heightbase("");
            this.radSheetType.set_leftbase("");
            this.radSheetType.set_topbase("");
            this.radSheetType.set_bottombase("");
            this.radSheetType.set_rightbase("");
            this.radSheetType.set_widthbase("");
            this.radSheetType.set_heightbase("");
            this.btnPrint.set_leftbase("");
            this.btnPrint.set_topbase("");
            this.btnPrint.set_bottombase("");
            this.btnPrint.set_rightbase("");
            this.btnPrint.set_widthbase("");
            this.btnPrint.set_heightbase("");
            this.btnProductSAdd.set_leftbase("");
            this.btnProductSAdd.set_topbase("");
            this.btnProductSAdd.set_bottombase("");
            this.btnProductSAdd.set_rightbase("");
            this.btnProductSAdd.set_widthbase("");
            this.btnProductSAdd.set_heightbase("");
            this.btnProductSDel.set_leftbase("");
            this.btnProductSDel.set_topbase("");
            this.btnProductSDel.set_bottombase("");
            this.btnProductSDel.set_rightbase("");
            this.btnProductSDel.set_widthbase("");
            this.btnProductSDel.set_heightbase("");
            this.grdProductSale.set_leftbase("");
            this.grdProductSale.set_topbase("");
            this.grdProductSale.set_bottombase("");
            this.grdProductSale.set_rightbase("");
            this.grdProductSale.set_widthbase("");
            this.grdProductSale.set_heightbase("");
            this.grdProductPurc.set_leftbase("");
            this.grdProductPurc.set_topbase("");
            this.grdProductPurc.set_bottombase("");
            this.grdProductPurc.set_rightbase("");
            this.grdProductPurc.set_widthbase("");
            this.grdProductPurc.set_heightbase("");
            this.btnProductPAdd.set_leftbase("");
            this.btnProductPAdd.set_topbase("");
            this.btnProductPAdd.set_bottombase("");
            this.btnProductPAdd.set_rightbase("");
            this.btnProductPAdd.set_widthbase("");
            this.btnProductPAdd.set_heightbase("");
            this.btnProductPDel.set_leftbase("");
            this.btnProductPDel.set_topbase("");
            this.btnProductPDel.set_bottombase("");
            this.btnProductPDel.set_rightbase("");
            this.btnProductPDel.set_widthbase("");
            this.btnProductPDel.set_heightbase("");
            this.Static11.set_leftbase("");
            this.Static11.set_topbase("");
            this.Static11.set_bottombase("");
            this.Static11.set_rightbase("");
            this.Static11.set_widthbase("");
            this.Static11.set_heightbase("");
            this.metExpectedProfitP.set_leftbase("");
            this.metExpectedProfitP.set_topbase("");
            this.metExpectedProfitP.set_bottombase("");
            this.metExpectedProfitP.set_rightbase("");
            this.metExpectedProfitP.set_widthbase("");
            this.metExpectedProfitP.set_heightbase("");
            this.grdSISale.set_leftbase("");
            this.grdSISale.set_topbase("");
            this.grdSISale.set_bottombase("");
            this.grdSISale.set_rightbase("");
            this.grdSISale.set_widthbase("");
            this.grdSISale.set_heightbase("");
            this.btnSISAdd.set_leftbase("");
            this.btnSISAdd.set_topbase("");
            this.btnSISAdd.set_bottombase("");
            this.btnSISAdd.set_rightbase("");
            this.btnSISAdd.set_widthbase("");
            this.btnSISAdd.set_heightbase("");
            this.btnSISDel.set_leftbase("");
            this.btnSISDel.set_topbase("");
            this.btnSISDel.set_bottombase("");
            this.btnSISDel.set_rightbase("");
            this.btnSISDel.set_widthbase("");
            this.btnSISDel.set_heightbase("");
            this.btnSISMoveU.set_leftbase("");
            this.btnSISMoveU.set_topbase("");
            this.btnSISMoveU.set_bottombase("");
            this.btnSISMoveU.set_rightbase("");
            this.btnSISMoveU.set_widthbase("");
            this.btnSISMoveU.set_heightbase("");
            this.btnSISMoveD.set_leftbase("");
            this.btnSISMoveD.set_topbase("");
            this.btnSISMoveD.set_bottombase("");
            this.btnSISMoveD.set_rightbase("");
            this.btnSISMoveD.set_widthbase("");
            this.btnSISMoveD.set_heightbase("");
            this.btnSIPMoveU.set_leftbase("");
            this.btnSIPMoveU.set_topbase("");
            this.btnSIPMoveU.set_bottombase("");
            this.btnSIPMoveU.set_rightbase("");
            this.btnSIPMoveU.set_widthbase("");
            this.btnSIPMoveU.set_heightbase("");
            this.btnSIPMoveD.set_leftbase("");
            this.btnSIPMoveD.set_topbase("");
            this.btnSIPMoveD.set_bottombase("");
            this.btnSIPMoveD.set_rightbase("");
            this.btnSIPMoveD.set_widthbase("");
            this.btnSIPMoveD.set_heightbase("");
            this.btnSIPAdd.set_leftbase("");
            this.btnSIPAdd.set_topbase("");
            this.btnSIPAdd.set_bottombase("");
            this.btnSIPAdd.set_rightbase("");
            this.btnSIPAdd.set_widthbase("");
            this.btnSIPAdd.set_heightbase("");
            this.btnSIPDel.set_leftbase("");
            this.btnSIPDel.set_topbase("");
            this.btnSIPDel.set_bottombase("");
            this.btnSIPDel.set_rightbase("");
            this.btnSIPDel.set_widthbase("");
            this.btnSIPDel.set_heightbase("");
            this.grdSIPurc.set_leftbase("");
            this.grdSIPurc.set_topbase("");
            this.grdSIPurc.set_bottombase("");
            this.grdSIPurc.set_rightbase("");
            this.grdSIPurc.set_widthbase("");
            this.grdSIPurc.set_heightbase("");
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
            this.metExpectedProfitS.set_leftbase("");
            this.metExpectedProfitS.set_topbase("");
            this.metExpectedProfitS.set_bottombase("");
            this.metExpectedProfitS.set_rightbase("");
            this.metExpectedProfitS.set_widthbase("");
            this.metExpectedProfitS.set_heightbase("");
            this.Static14.set_leftbase("");
            this.Static14.set_topbase("");
            this.Static14.set_bottombase("");
            this.Static14.set_rightbase("");
            this.Static14.set_widthbase("");
            this.Static14.set_heightbase("");
            this.metContractMemmonth.set_leftbase("");
            this.metContractMemmonth.set_topbase("");
            this.metContractMemmonth.set_bottombase("");
            this.metContractMemmonth.set_rightbase("");
            this.metContractMemmonth.set_widthbase("");
            this.metContractMemmonth.set_heightbase("");
            this.metExpectedMemmonth.set_leftbase("");
            this.metExpectedMemmonth.set_topbase("");
            this.metExpectedMemmonth.set_bottombase("");
            this.metExpectedMemmonth.set_rightbase("");
            this.metExpectedMemmonth.set_widthbase("");
            this.metExpectedMemmonth.set_heightbase("");
            this.metMistakeMemmonth.set_leftbase("");
            this.metMistakeMemmonth.set_topbase("");
            this.metMistakeMemmonth.set_bottombase("");
            this.metMistakeMemmonth.set_rightbase("");
            this.metMistakeMemmonth.set_widthbase("");
            this.metMistakeMemmonth.set_heightbase("");
            this.edtManintenanceTxt.set_leftbase("");
            this.edtManintenanceTxt.set_topbase("");
            this.edtManintenanceTxt.set_bottombase("");
            this.edtManintenanceTxt.set_rightbase("");
            this.edtManintenanceTxt.set_widthbase("");
            this.edtManintenanceTxt.set_heightbase("");
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
            this.txtRemark3.set_leftbase("");
            this.txtRemark3.set_topbase("");
            this.txtRemark3.set_bottombase("");
            this.txtRemark3.set_rightbase("");
            this.txtRemark3.set_widthbase("");
            this.txtRemark3.set_heightbase("");
            this.txtRemark2.set_leftbase("");
            this.txtRemark2.set_topbase("");
            this.txtRemark2.set_bottombase("");
            this.txtRemark2.set_rightbase("");
            this.txtRemark2.set_widthbase("");
            this.txtRemark2.set_heightbase("");
            this.metTobeStaffCost.set_leftbase("");
            this.metTobeStaffCost.set_topbase("");
            this.metTobeStaffCost.set_bottombase("");
            this.metTobeStaffCost.set_rightbase("");
            this.metTobeStaffCost.set_widthbase("");
            this.metTobeStaffCost.set_heightbase("");
            this.metActualProfit.set_leftbase("");
            this.metActualProfit.set_topbase("");
            this.metActualProfit.set_bottombase("");
            this.metActualProfit.set_rightbase("");
            this.metActualProfit.set_widthbase("");
            this.metActualProfit.set_heightbase("");
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
