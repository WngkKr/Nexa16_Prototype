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

            obj = new Edit("edtClientName","absolute","71","5","321","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtProjectCode","absolute","71","33","121","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtProjectName","absolute","193","33",null,"27","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtContract_Name","absolute","71","61",null,"27","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("cmbBizStatus","absolute","71","89","100","27",null,null,this);
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

            obj = new Combo("cmbProcStatus","absolute","239","89","60","27",null,null,this);
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

            obj = new Combo("cmbBizStaff","absolute","367","89","60","27",null,null,this);
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

            obj = new Calendar("calEstDelevery","absolute","71","117","110","27",null,null,this);
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

            obj = new Calendar("calEstTax","absolute","274","117","110","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("chkCloseYN","absolute","391","117","74","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("완료처리");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("chkReportYN","absolute","471","120","74","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("보고대상");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("taCloseRemark","absolute","71","146",null,"55","5",null,this);
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

            obj = new Grid("grd_detail","absolute","5","236",null,"93","5",null,this);
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

            obj = new Edit("medt_Sales_Amt","absolute","89","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("MaskEdit0","absolute","89","367","98","27",null,null,this);
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

            obj = new Edit("medt_Purchase_Amt","absolute","273","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("MaskEdit1","absolute","273","367","98","27",null,null,this);
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

            obj = new Edit("medt_Net_Sales_Amt","absolute","457","339","98","27",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("MaskEdit2","absolute","457","367","98","27",null,null,this);
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

            obj = new Grid("T_grd_his","absolute","5","5","120",null,null,"5",this.Tab00.Tabpage1.form);
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

            obj = new Combo("cmbIssueGubun","absolute","171","5","110","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Calendar("T_calDeliveryDate","absolute","171","33","110","27",null,null,this.Tab00.Tabpage1.form);
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

            obj = new CheckBox("T_chk_report","absolute","330","5","72","27",null,null,this.Tab00.Tabpage1.form);
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

            obj = new Combo("Combo0","absolute","449","8","89","20",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("Combo01");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new CheckBox("chb_sch","absolute","286","33","256","27",null,null,this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("일정반영");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new TextArea("T_txtRemarks","absolute","130","66",null,null,"5","5",this.Tab00.Tabpage1.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("담당자");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("grdBizMemo","absolute","5","30",null,null,"5","5",this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"60\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"60\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell colspan=\"3\" text=\"회사\"/><Cell col=\"3\" colspan=\"3\" text=\"주소\"/><Cell col=\"6\" rowspan=\"2\" text=\"비고\"/><Cell row=\"1\" text=\"부서\"/><Cell row=\"1\" col=\"1\" text=\"담당자\"/><Cell row=\"1\" col=\"2\" text=\"직급\"/><Cell row=\"1\" col=\"3\" text=\"핸드폰\"/><Cell row=\"1\" col=\"4\" text=\"이메일\"/><Cell row=\"1\" col=\"5\" text=\"유선\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("Save_Excel","absolute","49","5","43","20",null,null,this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("엑셀↓");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btnreset","absolute","93","5","43","20",null,null,this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Reset");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btnExcel","absolute","5","5","43","20",null,null,this.Tab00.Tabpage2.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("엑셀↑");
            });
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btn_Save","absolute","419","5","63","24",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnClose","absolute","491","5","63","24",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnChannelIns","absolute","502","208","23","19",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnChannelDel","absolute","528","208","23","19",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAddBottom","absolute","502","403","23","19",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("+");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDeleteBottom","absolute","528","403","23","19",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("-");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnStaffReqApp","absolute","443","403","58","21",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
                obj.set_text("인력요청");
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
            this.edtClientName.set_leftbase("");
            this.edtClientName.set_topbase("");
            this.edtClientName.set_bottombase("");
            this.edtClientName.set_rightbase("");
            this.edtClientName.set_widthbase("");
            this.edtClientName.set_heightbase("");
            this.edtProjectCode.set_leftbase("");
            this.edtProjectCode.set_topbase("");
            this.edtProjectCode.set_bottombase("");
            this.edtProjectCode.set_rightbase("");
            this.edtProjectCode.set_widthbase("");
            this.edtProjectCode.set_heightbase("");
            this.edtProjectName.set_leftbase("");
            this.edtProjectName.set_topbase("");
            this.edtProjectName.set_bottombase("");
            this.edtProjectName.set_rightbase("");
            this.edtProjectName.set_widthbase("");
            this.edtProjectName.set_heightbase("");
            this.edtContract_Name.set_leftbase("");
            this.edtContract_Name.set_topbase("");
            this.edtContract_Name.set_bottombase("");
            this.edtContract_Name.set_rightbase("");
            this.edtContract_Name.set_widthbase("");
            this.edtContract_Name.set_heightbase("");
            this.cmbBizStatus.set_leftbase("");
            this.cmbBizStatus.set_topbase("");
            this.cmbBizStatus.set_bottombase("");
            this.cmbBizStatus.set_rightbase("");
            this.cmbBizStatus.set_widthbase("");
            this.cmbBizStatus.set_heightbase("");
            this.Static06.set_leftbase("");
            this.Static06.set_topbase("");
            this.Static06.set_bottombase("");
            this.Static06.set_rightbase("");
            this.Static06.set_widthbase("");
            this.Static06.set_heightbase("");
            this.cmbProcStatus.set_leftbase("");
            this.cmbProcStatus.set_topbase("");
            this.cmbProcStatus.set_bottombase("");
            this.cmbProcStatus.set_rightbase("");
            this.cmbProcStatus.set_widthbase("");
            this.cmbProcStatus.set_heightbase("");
            this.Static07.set_leftbase("");
            this.Static07.set_topbase("");
            this.Static07.set_bottombase("");
            this.Static07.set_rightbase("");
            this.Static07.set_widthbase("");
            this.Static07.set_heightbase("");
            this.cmbBizStaff.set_leftbase("");
            this.cmbBizStaff.set_topbase("");
            this.cmbBizStaff.set_bottombase("");
            this.cmbBizStaff.set_rightbase("");
            this.cmbBizStaff.set_widthbase("");
            this.cmbBizStaff.set_heightbase("");
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
            this.calEstDelevery.set_leftbase("");
            this.calEstDelevery.set_topbase("");
            this.calEstDelevery.set_bottombase("");
            this.calEstDelevery.set_rightbase("");
            this.calEstDelevery.set_widthbase("");
            this.calEstDelevery.set_heightbase("");
            this.Static09.set_leftbase("");
            this.Static09.set_topbase("");
            this.Static09.set_bottombase("");
            this.Static09.set_rightbase("");
            this.Static09.set_widthbase("");
            this.Static09.set_heightbase("");
            this.calEstTax.set_leftbase("");
            this.calEstTax.set_topbase("");
            this.calEstTax.set_bottombase("");
            this.calEstTax.set_rightbase("");
            this.calEstTax.set_widthbase("");
            this.calEstTax.set_heightbase("");
            this.chkCloseYN.set_leftbase("");
            this.chkCloseYN.set_topbase("");
            this.chkCloseYN.set_bottombase("");
            this.chkCloseYN.set_rightbase("");
            this.chkCloseYN.set_widthbase("");
            this.chkCloseYN.set_heightbase("");
            this.chkReportYN.set_leftbase("");
            this.chkReportYN.set_topbase("");
            this.chkReportYN.set_bottombase("");
            this.chkReportYN.set_rightbase("");
            this.chkReportYN.set_widthbase("");
            this.chkReportYN.set_heightbase("");
            this.taCloseRemark.set_leftbase("");
            this.taCloseRemark.set_topbase("");
            this.taCloseRemark.set_bottombase("");
            this.taCloseRemark.set_rightbase("");
            this.taCloseRemark.set_widthbase("");
            this.taCloseRemark.set_heightbase("");
            this.Static10.set_leftbase("");
            this.Static10.set_topbase("");
            this.Static10.set_bottombase("");
            this.Static10.set_rightbase("");
            this.Static10.set_widthbase("");
            this.Static10.set_heightbase("");
            this.grd_detail.set_leftbase("");
            this.grd_detail.set_topbase("");
            this.grd_detail.set_bottombase("");
            this.grd_detail.set_rightbase("");
            this.grd_detail.set_widthbase("");
            this.grd_detail.set_heightbase("");
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
            this.medt_Sales_Amt.set_leftbase("");
            this.medt_Sales_Amt.set_topbase("");
            this.medt_Sales_Amt.set_bottombase("");
            this.medt_Sales_Amt.set_rightbase("");
            this.medt_Sales_Amt.set_widthbase("");
            this.medt_Sales_Amt.set_heightbase("");
            this.MaskEdit0.set_leftbase("");
            this.MaskEdit0.set_topbase("");
            this.MaskEdit0.set_bottombase("");
            this.MaskEdit0.set_rightbase("");
            this.MaskEdit0.set_widthbase("");
            this.MaskEdit0.set_heightbase("");
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
            this.medt_Purchase_Amt.set_leftbase("");
            this.medt_Purchase_Amt.set_topbase("");
            this.medt_Purchase_Amt.set_bottombase("");
            this.medt_Purchase_Amt.set_rightbase("");
            this.medt_Purchase_Amt.set_widthbase("");
            this.medt_Purchase_Amt.set_heightbase("");
            this.MaskEdit1.set_leftbase("");
            this.MaskEdit1.set_topbase("");
            this.MaskEdit1.set_bottombase("");
            this.MaskEdit1.set_rightbase("");
            this.MaskEdit1.set_widthbase("");
            this.MaskEdit1.set_heightbase("");
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
            this.medt_Net_Sales_Amt.set_leftbase("");
            this.medt_Net_Sales_Amt.set_topbase("");
            this.medt_Net_Sales_Amt.set_bottombase("");
            this.medt_Net_Sales_Amt.set_rightbase("");
            this.medt_Net_Sales_Amt.set_widthbase("");
            this.medt_Net_Sales_Amt.set_heightbase("");
            this.MaskEdit2.set_leftbase("");
            this.MaskEdit2.set_topbase("");
            this.MaskEdit2.set_bottombase("");
            this.MaskEdit2.set_rightbase("");
            this.MaskEdit2.set_widthbase("");
            this.MaskEdit2.set_heightbase("");
            this.Tab00.set_leftbase("");
            this.Tab00.set_topbase("");
            this.Tab00.set_bottombase("");
            this.Tab00.set_rightbase("");
            this.Tab00.set_widthbase("");
            this.Tab00.set_heightbase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_leftbase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_topbase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_bottombase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_rightbase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_widthbase("");
            this.Tab00.Tabpage1.form.T_grd_his.set_heightbase("");
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
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_leftbase("");
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_topbase("");
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_bottombase("");
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_rightbase("");
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_widthbase("");
            this.Tab00.Tabpage1.form.cmbIssueGubun.set_heightbase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_leftbase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_topbase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_bottombase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_rightbase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_widthbase("");
            this.Tab00.Tabpage1.form.T_calDeliveryDate.set_heightbase("");
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
            this.Tab00.Tabpage1.form.T_chk_report.set_leftbase("");
            this.Tab00.Tabpage1.form.T_chk_report.set_topbase("");
            this.Tab00.Tabpage1.form.T_chk_report.set_bottombase("");
            this.Tab00.Tabpage1.form.T_chk_report.set_rightbase("");
            this.Tab00.Tabpage1.form.T_chk_report.set_widthbase("");
            this.Tab00.Tabpage1.form.T_chk_report.set_heightbase("");
            this.Tab00.Tabpage1.form.Static04.set_leftbase("");
            this.Tab00.Tabpage1.form.Static04.set_topbase("");
            this.Tab00.Tabpage1.form.Static04.set_bottombase("");
            this.Tab00.Tabpage1.form.Static04.set_rightbase("");
            this.Tab00.Tabpage1.form.Static04.set_widthbase("");
            this.Tab00.Tabpage1.form.Static04.set_heightbase("");
            this.Tab00.Tabpage1.form.chb_sch.set_leftbase("");
            this.Tab00.Tabpage1.form.chb_sch.set_topbase("");
            this.Tab00.Tabpage1.form.chb_sch.set_bottombase("");
            this.Tab00.Tabpage1.form.chb_sch.set_rightbase("");
            this.Tab00.Tabpage1.form.chb_sch.set_widthbase("");
            this.Tab00.Tabpage1.form.chb_sch.set_heightbase("");
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
            this.btnClose.set_leftbase("");
            this.btnClose.set_topbase("");
            this.btnClose.set_bottombase("");
            this.btnClose.set_rightbase("");
            this.btnClose.set_widthbase("");
            this.btnClose.set_heightbase("");

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
