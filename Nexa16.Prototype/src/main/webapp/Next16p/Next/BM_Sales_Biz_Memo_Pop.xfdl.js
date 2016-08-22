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
                obj.set_name("BM_Sales_Biz_Memo_Pop");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,600,400);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","5","7","590","43",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("edtClient","absolute","49","9","278","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSearch","absolute","329","9","22","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_save","absolute","471","5","53","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("저장");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btn_close","absolute",null,"5","53","30","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("닫기");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","5","60","75","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("구분");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","5","105","75","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("일자");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div03","absolute","5","235","75",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("메모");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("cmbIssueGubun","absolute","85","60","150","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Combo00");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("T_calDeliveryDate","absolute","84","107","150","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div04","absolute","240","60","75","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("고객사");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div05","absolute","240","105","75","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("프로젝트명");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtClientName","absolute","320","60","275","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtProjectName","absolute","320","105","275","40",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div06","absolute","5","150","75","80",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("보고");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("T_chk_report","absolute","84","166","150","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("보고");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","84","194","120","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("중요도");
            });
            this.addChild(obj.name, obj);

            obj = new Combo("Combo0","absolute","128","193","112","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Combo01");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("chb_sch","absolute","323","160","150","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("일정반영");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("chb_visible_pis","absolute","323","191","150","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("공개");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("T_txtRemarks","absolute","85","235",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.btnSearch.set_leftbase("");
            this.Div00.form.btnSearch.set_topbase("");
            this.Div00.form.btnSearch.set_bottombase("");
            this.Div00.form.btnSearch.set_rightbase("");
            this.Div00.form.btnSearch.set_widthbase("");
            this.Div00.form.btnSearch.set_heightbase("");
            this.Div00.form.btn_save.set_leftbase("");
            this.Div00.form.btn_save.set_topbase("");
            this.Div00.form.btn_save.set_bottombase("");
            this.Div00.form.btn_save.set_rightbase("");
            this.Div00.form.btn_save.set_widthbase("");
            this.Div00.form.btn_save.set_heightbase("");
            this.Div00.form.btn_close.set_leftbase("");
            this.Div00.form.btn_close.set_topbase("");
            this.Div00.form.btn_close.set_bottombase("");
            this.Div00.form.btn_close.set_rightbase("");
            this.Div00.form.btn_close.set_widthbase("");
            this.Div00.form.btn_close.set_heightbase("");
            this.Div01.set_leftbase("");
            this.Div01.set_topbase("");
            this.Div01.set_bottombase("");
            this.Div01.set_rightbase("");
            this.Div01.set_widthbase("");
            this.Div01.set_heightbase("");
            this.Div02.set_leftbase("");
            this.Div02.set_topbase("");
            this.Div02.set_bottombase("");
            this.Div02.set_rightbase("");
            this.Div02.set_widthbase("");
            this.Div02.set_heightbase("");
            this.Div03.set_leftbase("");
            this.Div03.set_topbase("");
            this.Div03.set_bottombase("");
            this.Div03.set_rightbase("");
            this.Div03.set_widthbase("");
            this.Div03.set_heightbase("");
            this.cmbIssueGubun.set_leftbase("");
            this.cmbIssueGubun.set_topbase("");
            this.cmbIssueGubun.set_bottombase("");
            this.cmbIssueGubun.set_rightbase("");
            this.cmbIssueGubun.set_widthbase("");
            this.cmbIssueGubun.set_heightbase("");
            this.T_calDeliveryDate.set_leftbase("");
            this.T_calDeliveryDate.set_topbase("");
            this.T_calDeliveryDate.set_bottombase("");
            this.T_calDeliveryDate.set_rightbase("");
            this.T_calDeliveryDate.set_widthbase("");
            this.T_calDeliveryDate.set_heightbase("");
            this.Div04.set_leftbase("");
            this.Div04.set_topbase("");
            this.Div04.set_bottombase("");
            this.Div04.set_rightbase("");
            this.Div04.set_widthbase("");
            this.Div04.set_heightbase("");
            this.Div05.set_leftbase("");
            this.Div05.set_topbase("");
            this.Div05.set_bottombase("");
            this.Div05.set_rightbase("");
            this.Div05.set_widthbase("");
            this.Div05.set_heightbase("");
            this.edtClientName.set_leftbase("");
            this.edtClientName.set_topbase("");
            this.edtClientName.set_bottombase("");
            this.edtClientName.set_rightbase("");
            this.edtClientName.set_widthbase("");
            this.edtClientName.set_heightbase("");
            this.edtProjectName.set_leftbase("");
            this.edtProjectName.set_topbase("");
            this.edtProjectName.set_bottombase("");
            this.edtProjectName.set_rightbase("");
            this.edtProjectName.set_widthbase("");
            this.edtProjectName.set_heightbase("");
            this.Div06.set_leftbase("");
            this.Div06.set_topbase("");
            this.Div06.set_bottombase("");
            this.Div06.set_rightbase("");
            this.Div06.set_widthbase("");
            this.Div06.set_heightbase("");
            this.T_chk_report.set_leftbase("");
            this.T_chk_report.set_topbase("");
            this.T_chk_report.set_bottombase("");
            this.T_chk_report.set_rightbase("");
            this.T_chk_report.set_widthbase("");
            this.T_chk_report.set_heightbase("");
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.T_txtRemarks.set_leftbase("");
            this.T_txtRemarks.set_topbase("");
            this.T_txtRemarks.set_bottombase("");
            this.T_txtRemarks.set_rightbase("");
            this.T_txtRemarks.set_widthbase("");
            this.T_txtRemarks.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",600,400,this,function(p){});
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

        this.loadIncludeScript("BM_Sales_Biz_Memo_Pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
