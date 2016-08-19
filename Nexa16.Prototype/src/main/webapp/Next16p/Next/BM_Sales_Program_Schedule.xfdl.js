﻿(function()
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
                obj.set_name("BM_Sales_Program_Schedule");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,544,555);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","5","140","23",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("영업일정");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnClose","absolute",null,"5","49","22","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSave","absolute",null,"5","49","22","59",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDel","absolute",null,"5","49","22","113",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("삭제");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAdd","absolute",null,"5","49","22","167",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("신규");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","32",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업 담당자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","32","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업 일자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","5","59","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고 객 사");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","5","86","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프로젝트명");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","5","113","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("타 이 틀");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","5","140","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("고객사 담당자");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","5","167","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("중 요 도");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","5","194","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업 구분");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static08","absolute","5","221","110","130",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업예정내용");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static09","absolute","5","356","110","130",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업예정내용");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static10","absolute","5","491","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("영업 구분");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","120","5","160","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","120","32","100","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","222","32","58","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("날짜변경");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static11","absolute","290","32","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("시  간");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","405","32","120","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","120","59","405","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","120","86","405","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","120","113","405","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","120","140","160","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static12","absolute","290","140","110","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("전화번호");
                obj.set_border("1px solid #e5e5e5");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","405","140","120","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo02","absolute","120","167","160","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo03","absolute","120","194","160","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","120","221","405","130",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","absolute","120","356","405","130",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","120","491","405","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
            });
            this.Div00.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.btnClose.set_leftbase("");
            this.btnClose.set_topbase("");
            this.btnClose.set_bottombase("");
            this.btnClose.set_rightbase("");
            this.btnClose.set_widthbase("");
            this.btnClose.set_heightbase("");
            this.btnSave.set_leftbase("");
            this.btnSave.set_topbase("");
            this.btnSave.set_bottombase("");
            this.btnSave.set_rightbase("");
            this.btnSave.set_widthbase("");
            this.btnSave.set_heightbase("");
            this.btnDel.set_leftbase("");
            this.btnDel.set_topbase("");
            this.btnDel.set_bottombase("");
            this.btnDel.set_rightbase("");
            this.btnDel.set_widthbase("");
            this.btnDel.set_heightbase("");
            this.btnAdd.set_leftbase("");
            this.btnAdd.set_topbase("");
            this.btnAdd.set_bottombase("");
            this.btnAdd.set_rightbase("");
            this.btnAdd.set_widthbase("");
            this.btnAdd.set_heightbase("");
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
            this.Div00.form.Static09.set_leftbase("");
            this.Div00.form.Static09.set_topbase("");
            this.Div00.form.Static09.set_bottombase("");
            this.Div00.form.Static09.set_rightbase("");
            this.Div00.form.Static09.set_widthbase("");
            this.Div00.form.Static09.set_heightbase("");
            this.Div00.form.Static10.set_leftbase("");
            this.Div00.form.Static10.set_topbase("");
            this.Div00.form.Static10.set_bottombase("");
            this.Div00.form.Static10.set_rightbase("");
            this.Div00.form.Static10.set_widthbase("");
            this.Div00.form.Static10.set_heightbase("");
            this.Div00.form.Combo00.set_leftbase("");
            this.Div00.form.Combo00.set_topbase("");
            this.Div00.form.Combo00.set_bottombase("");
            this.Div00.form.Combo00.set_rightbase("");
            this.Div00.form.Combo00.set_widthbase("");
            this.Div00.form.Combo00.set_heightbase("");
            this.Div00.form.Calendar00.set_leftbase("");
            this.Div00.form.Calendar00.set_topbase("");
            this.Div00.form.Calendar00.set_bottombase("");
            this.Div00.form.Calendar00.set_rightbase("");
            this.Div00.form.Calendar00.set_widthbase("");
            this.Div00.form.Calendar00.set_heightbase("");
            this.Div00.form.Button00.set_leftbase("");
            this.Div00.form.Button00.set_topbase("");
            this.Div00.form.Button00.set_bottombase("");
            this.Div00.form.Button00.set_rightbase("");
            this.Div00.form.Button00.set_widthbase("");
            this.Div00.form.Button00.set_heightbase("");
            this.Div00.form.Static11.set_leftbase("");
            this.Div00.form.Static11.set_topbase("");
            this.Div00.form.Static11.set_bottombase("");
            this.Div00.form.Static11.set_rightbase("");
            this.Div00.form.Static11.set_widthbase("");
            this.Div00.form.Static11.set_heightbase("");
            this.Div00.form.Combo01.set_leftbase("");
            this.Div00.form.Combo01.set_topbase("");
            this.Div00.form.Combo01.set_bottombase("");
            this.Div00.form.Combo01.set_rightbase("");
            this.Div00.form.Combo01.set_widthbase("");
            this.Div00.form.Combo01.set_heightbase("");
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
            this.Div00.form.Static12.set_leftbase("");
            this.Div00.form.Static12.set_topbase("");
            this.Div00.form.Static12.set_bottombase("");
            this.Div00.form.Static12.set_rightbase("");
            this.Div00.form.Static12.set_widthbase("");
            this.Div00.form.Static12.set_heightbase("");
            this.Div00.form.Edit04.set_leftbase("");
            this.Div00.form.Edit04.set_topbase("");
            this.Div00.form.Edit04.set_bottombase("");
            this.Div00.form.Edit04.set_rightbase("");
            this.Div00.form.Edit04.set_widthbase("");
            this.Div00.form.Edit04.set_heightbase("");
            this.Div00.form.Combo02.set_leftbase("");
            this.Div00.form.Combo02.set_topbase("");
            this.Div00.form.Combo02.set_bottombase("");
            this.Div00.form.Combo02.set_rightbase("");
            this.Div00.form.Combo02.set_widthbase("");
            this.Div00.form.Combo02.set_heightbase("");
            this.Div00.form.Combo03.set_leftbase("");
            this.Div00.form.Combo03.set_topbase("");
            this.Div00.form.Combo03.set_bottombase("");
            this.Div00.form.Combo03.set_rightbase("");
            this.Div00.form.Combo03.set_widthbase("");
            this.Div00.form.Combo03.set_heightbase("");
            this.Div00.form.TextArea00.set_leftbase("");
            this.Div00.form.TextArea00.set_topbase("");
            this.Div00.form.TextArea00.set_bottombase("");
            this.Div00.form.TextArea00.set_rightbase("");
            this.Div00.form.TextArea00.set_widthbase("");
            this.Div00.form.TextArea00.set_heightbase("");
            this.Div00.form.TextArea01.set_leftbase("");
            this.Div00.form.TextArea01.set_topbase("");
            this.Div00.form.TextArea01.set_bottombase("");
            this.Div00.form.TextArea01.set_rightbase("");
            this.Div00.form.TextArea01.set_widthbase("");
            this.Div00.form.TextArea01.set_heightbase("");
            this.Div00.form.Edit05.set_leftbase("");
            this.Div00.form.Edit05.set_topbase("");
            this.Div00.form.Edit05.set_bottombase("");
            this.Div00.form.Edit05.set_rightbase("");
            this.Div00.form.Edit05.set_widthbase("");
            this.Div00.form.Edit05.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",544,555,this,function(p){});
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

        this.loadIncludeScript("BM_Sales_Program_Schedule.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
