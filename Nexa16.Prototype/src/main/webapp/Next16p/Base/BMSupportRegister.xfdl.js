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
                obj.set_name("BMSupportRegister");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,800,768);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Calendar("calCopyTargetDate","absolute","110","5","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnCopySchedule","absolute","215","5","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("일정복사추가");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProject","absolute","5","5","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트상세");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnClose","absolute",null,"5","80","20","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSave","absolute",null,"5","80","20","90",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnDelete","absolute",null,"5","80","20","175",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("삭제");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnAttachFile","absolute",null,"5","80","20","260",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("첨부파일[#]");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","30",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","5","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","126","6","409","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","126","37","409","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","126","68","356","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnClientSearch","absolute","485","69","50","25",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("선택");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","5","36","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("프로젝트");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","5","67","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","126","102","140","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div03","absolute","5","98","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("처리일시");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div04","absolute","5","129","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("지원구분");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","339","103","150","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","absolute","267","102","45","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_mask("");
                obj.set_maskchar("HH:SS");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","321","96","22","31",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit01","absolute","490","103","45","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_mask("");
                obj.set_maskchar("HH:SS");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div05","absolute","274","129","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("지원담당자");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo00","absolute","395","129","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("chkUserDept","absolute","540","133","150","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("8");
                obj.set_text("소속부서보기");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("cboComfirm","absolute","126","129","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("Combo01");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("Combo01","absolute","395","160","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Combo00");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div06","absolute","274","160","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("승인처리자");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Combo("cboComfirm00","absolute","126","160","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("9");
                obj.set_text("Combo01");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div07","absolute","5","160","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("승인구분");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div08","absolute","5","191","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("총작업시간");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div09","absolute","126","191","284","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","0","1","69","27",null,null,this.Div00.form.Div09.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div00.form.Div09.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","72","0","61","27",null,null,this.Div00.form.Div09.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("총근무일");
            });
            this.Div00.form.Div09.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","128","1","30","27",null,null,this.Div00.form.Div09.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div00.form.Div09.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","160","0","99","27",null,null,this.Div00.form.Div09.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("일평균근무시간");
            });
            this.Div00.form.Div09.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","251","1","30","27",null,null,this.Div00.form.Div09.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div00.form.Div09.addChild(obj.name, obj);

            obj = new Radio("Radio00","absolute","415","184","179","84",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("10");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var Div00_form_Radio00_innerdataset = new nexacro.NormalDataset("Div00_form_Radio00_innerdataset", obj);
                Div00_form_Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">총근무일*일평균근무시간</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">종료일시-시작일시</Col></Row></Rows>");
                obj.set_innerdataset(Div00_form_Radio00_innerdataset);
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnCalHour","absolute","600","191","80","25",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("11");
                obj.set_text("시간재계산");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div10","absolute","5","222","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("실참석인원");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","126","223","70","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("12");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div11","absolute","5","277","120","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("TITLE");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","126","278",null,"29","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("13");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnProjectInfo","absolute",null,"250","86","25","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("프로젝트정보");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div12","absolute","5","308","385","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("요청내용");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div13","absolute",null,"308","386","30","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("처리내용");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","5","339","385","250",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","absolute","397","339","385","250",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("15");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnDetailInsert","absolute",null,"310","86","25","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("14");
                obj.set_text("상세내역등록");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Radio("Radio01","absolute","6","591","391","37",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("16");
                obj.set_direction("vertical");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                var Div00_form_Radio01_innerdataset = new nexacro.NormalDataset("Div00_form_Radio01_innerdataset", obj);
                Div00_form_Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">매우만족</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">만족</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">불만</Col></Row><Row><Col id=\"codecolumn\">04</Col><Col id=\"datacolumn\">매우불만</Col></Row></Rows>");
                obj.set_innerdataset(Div00_form_Radio01_innerdataset);
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea02","absolute","5","630",null,"40","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("17");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div14","absolute","5","673","120",null,null,"5",this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("주요공유사항");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new TextArea("TextArea03","absolute","126","673",null,null,"5","5",this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("18");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute",null,"6","243","117","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("19");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"240\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"첨부파일(더블클릭하세요)\"/></Band><Band id=\"body\"><Cell/></Band></Format></Formats>");
            });
            this.Div00.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.calCopyTargetDate.set_leftbase("");
            this.calCopyTargetDate.set_topbase("");
            this.calCopyTargetDate.set_bottombase("");
            this.calCopyTargetDate.set_rightbase("");
            this.calCopyTargetDate.set_widthbase("");
            this.calCopyTargetDate.set_heightbase("");
            this.btnCopySchedule.set_leftbase("");
            this.btnCopySchedule.set_topbase("");
            this.btnCopySchedule.set_bottombase("");
            this.btnCopySchedule.set_rightbase("");
            this.btnCopySchedule.set_widthbase("");
            this.btnCopySchedule.set_heightbase("");
            this.btnProject.set_leftbase("");
            this.btnProject.set_topbase("");
            this.btnProject.set_bottombase("");
            this.btnProject.set_rightbase("");
            this.btnProject.set_widthbase("");
            this.btnProject.set_heightbase("");
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
            this.btnDelete.set_leftbase("");
            this.btnDelete.set_topbase("");
            this.btnDelete.set_bottombase("");
            this.btnDelete.set_rightbase("");
            this.btnDelete.set_widthbase("");
            this.btnDelete.set_heightbase("");
            this.btnAttachFile.set_leftbase("");
            this.btnAttachFile.set_topbase("");
            this.btnAttachFile.set_bottombase("");
            this.btnAttachFile.set_rightbase("");
            this.btnAttachFile.set_widthbase("");
            this.btnAttachFile.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.Div00.set_leftbase("");
            this.Div00.form.Div00.set_topbase("");
            this.Div00.form.Div00.set_bottombase("");
            this.Div00.form.Div00.set_rightbase("");
            this.Div00.form.Div00.set_widthbase("");
            this.Div00.form.Div00.set_heightbase("");
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
            this.Div00.form.Div01.set_leftbase("");
            this.Div00.form.Div01.set_topbase("");
            this.Div00.form.Div01.set_bottombase("");
            this.Div00.form.Div01.set_rightbase("");
            this.Div00.form.Div01.set_widthbase("");
            this.Div00.form.Div01.set_heightbase("");
            this.Div00.form.Div02.set_leftbase("");
            this.Div00.form.Div02.set_topbase("");
            this.Div00.form.Div02.set_bottombase("");
            this.Div00.form.Div02.set_rightbase("");
            this.Div00.form.Div02.set_widthbase("");
            this.Div00.form.Div02.set_heightbase("");
            this.Div00.form.Calendar00.set_leftbase("");
            this.Div00.form.Calendar00.set_topbase("");
            this.Div00.form.Calendar00.set_bottombase("");
            this.Div00.form.Calendar00.set_rightbase("");
            this.Div00.form.Calendar00.set_widthbase("");
            this.Div00.form.Calendar00.set_heightbase("");
            this.Div00.form.Div03.set_leftbase("");
            this.Div00.form.Div03.set_topbase("");
            this.Div00.form.Div03.set_bottombase("");
            this.Div00.form.Div03.set_rightbase("");
            this.Div00.form.Div03.set_widthbase("");
            this.Div00.form.Div03.set_heightbase("");
            this.Div00.form.Div04.set_leftbase("");
            this.Div00.form.Div04.set_topbase("");
            this.Div00.form.Div04.set_bottombase("");
            this.Div00.form.Div04.set_rightbase("");
            this.Div00.form.Div04.set_widthbase("");
            this.Div00.form.Div04.set_heightbase("");
            this.Div00.form.Calendar01.set_leftbase("");
            this.Div00.form.Calendar01.set_topbase("");
            this.Div00.form.Calendar01.set_bottombase("");
            this.Div00.form.Calendar01.set_rightbase("");
            this.Div00.form.Calendar01.set_widthbase("");
            this.Div00.form.Calendar01.set_heightbase("");
            this.Div00.form.MaskEdit00.set_leftbase("");
            this.Div00.form.MaskEdit00.set_topbase("");
            this.Div00.form.MaskEdit00.set_bottombase("");
            this.Div00.form.MaskEdit00.set_rightbase("");
            this.Div00.form.MaskEdit00.set_widthbase("");
            this.Div00.form.MaskEdit00.set_heightbase("");
            this.Div00.form.MaskEdit01.set_leftbase("");
            this.Div00.form.MaskEdit01.set_topbase("");
            this.Div00.form.MaskEdit01.set_bottombase("");
            this.Div00.form.MaskEdit01.set_rightbase("");
            this.Div00.form.MaskEdit01.set_widthbase("");
            this.Div00.form.MaskEdit01.set_heightbase("");
            this.Div00.form.Div05.set_leftbase("");
            this.Div00.form.Div05.set_topbase("");
            this.Div00.form.Div05.set_bottombase("");
            this.Div00.form.Div05.set_rightbase("");
            this.Div00.form.Div05.set_widthbase("");
            this.Div00.form.Div05.set_heightbase("");
            this.Div00.form.Combo00.set_leftbase("");
            this.Div00.form.Combo00.set_topbase("");
            this.Div00.form.Combo00.set_bottombase("");
            this.Div00.form.Combo00.set_rightbase("");
            this.Div00.form.Combo00.set_widthbase("");
            this.Div00.form.Combo00.set_heightbase("");
            this.Div00.form.chkUserDept.set_leftbase("");
            this.Div00.form.chkUserDept.set_topbase("");
            this.Div00.form.chkUserDept.set_bottombase("");
            this.Div00.form.chkUserDept.set_rightbase("");
            this.Div00.form.chkUserDept.set_widthbase("");
            this.Div00.form.chkUserDept.set_heightbase("");
            this.Div00.form.cboComfirm.set_leftbase("");
            this.Div00.form.cboComfirm.set_topbase("");
            this.Div00.form.cboComfirm.set_bottombase("");
            this.Div00.form.cboComfirm.set_rightbase("");
            this.Div00.form.cboComfirm.set_widthbase("");
            this.Div00.form.cboComfirm.set_heightbase("");
            this.Div00.form.Combo01.set_leftbase("");
            this.Div00.form.Combo01.set_topbase("");
            this.Div00.form.Combo01.set_bottombase("");
            this.Div00.form.Combo01.set_rightbase("");
            this.Div00.form.Combo01.set_widthbase("");
            this.Div00.form.Combo01.set_heightbase("");
            this.Div00.form.Div06.set_leftbase("");
            this.Div00.form.Div06.set_topbase("");
            this.Div00.form.Div06.set_bottombase("");
            this.Div00.form.Div06.set_rightbase("");
            this.Div00.form.Div06.set_widthbase("");
            this.Div00.form.Div06.set_heightbase("");
            this.Div00.form.cboComfirm00.set_leftbase("");
            this.Div00.form.cboComfirm00.set_topbase("");
            this.Div00.form.cboComfirm00.set_bottombase("");
            this.Div00.form.cboComfirm00.set_rightbase("");
            this.Div00.form.cboComfirm00.set_widthbase("");
            this.Div00.form.cboComfirm00.set_heightbase("");
            this.Div00.form.Div07.set_leftbase("");
            this.Div00.form.Div07.set_topbase("");
            this.Div00.form.Div07.set_bottombase("");
            this.Div00.form.Div07.set_rightbase("");
            this.Div00.form.Div07.set_widthbase("");
            this.Div00.form.Div07.set_heightbase("");
            this.Div00.form.Div08.set_leftbase("");
            this.Div00.form.Div08.set_topbase("");
            this.Div00.form.Div08.set_bottombase("");
            this.Div00.form.Div08.set_rightbase("");
            this.Div00.form.Div08.set_widthbase("");
            this.Div00.form.Div08.set_heightbase("");
            this.Div00.form.Div09.set_leftbase("");
            this.Div00.form.Div09.set_topbase("");
            this.Div00.form.Div09.set_bottombase("");
            this.Div00.form.Div09.set_rightbase("");
            this.Div00.form.Div09.set_widthbase("");
            this.Div00.form.Div09.set_heightbase("");
            this.Div00.form.Div09.form.Edit00.set_leftbase("");
            this.Div00.form.Div09.form.Edit00.set_topbase("");
            this.Div00.form.Div09.form.Edit00.set_bottombase("");
            this.Div00.form.Div09.form.Edit00.set_rightbase("");
            this.Div00.form.Div09.form.Edit00.set_widthbase("");
            this.Div00.form.Div09.form.Edit00.set_heightbase("");
            this.Div00.form.Div09.form.Static00.set_leftbase("");
            this.Div00.form.Div09.form.Static00.set_topbase("");
            this.Div00.form.Div09.form.Static00.set_bottombase("");
            this.Div00.form.Div09.form.Static00.set_rightbase("");
            this.Div00.form.Div09.form.Static00.set_widthbase("");
            this.Div00.form.Div09.form.Static00.set_heightbase("");
            this.Div00.form.Div09.form.Edit01.set_leftbase("");
            this.Div00.form.Div09.form.Edit01.set_topbase("");
            this.Div00.form.Div09.form.Edit01.set_bottombase("");
            this.Div00.form.Div09.form.Edit01.set_rightbase("");
            this.Div00.form.Div09.form.Edit01.set_widthbase("");
            this.Div00.form.Div09.form.Edit01.set_heightbase("");
            this.Div00.form.Div09.form.Static01.set_leftbase("");
            this.Div00.form.Div09.form.Static01.set_topbase("");
            this.Div00.form.Div09.form.Static01.set_bottombase("");
            this.Div00.form.Div09.form.Static01.set_rightbase("");
            this.Div00.form.Div09.form.Static01.set_widthbase("");
            this.Div00.form.Div09.form.Static01.set_heightbase("");
            this.Div00.form.Div09.form.Edit02.set_leftbase("");
            this.Div00.form.Div09.form.Edit02.set_topbase("");
            this.Div00.form.Div09.form.Edit02.set_bottombase("");
            this.Div00.form.Div09.form.Edit02.set_rightbase("");
            this.Div00.form.Div09.form.Edit02.set_widthbase("");
            this.Div00.form.Div09.form.Edit02.set_heightbase("");
            this.Div00.form.btnCalHour.set_leftbase("");
            this.Div00.form.btnCalHour.set_topbase("");
            this.Div00.form.btnCalHour.set_bottombase("");
            this.Div00.form.btnCalHour.set_rightbase("");
            this.Div00.form.btnCalHour.set_widthbase("");
            this.Div00.form.btnCalHour.set_heightbase("");
            this.Div00.form.Div10.set_leftbase("");
            this.Div00.form.Div10.set_topbase("");
            this.Div00.form.Div10.set_bottombase("");
            this.Div00.form.Div10.set_rightbase("");
            this.Div00.form.Div10.set_widthbase("");
            this.Div00.form.Div10.set_heightbase("");
            this.Div00.form.Edit03.set_leftbase("");
            this.Div00.form.Edit03.set_topbase("");
            this.Div00.form.Edit03.set_bottombase("");
            this.Div00.form.Edit03.set_rightbase("");
            this.Div00.form.Edit03.set_widthbase("");
            this.Div00.form.Edit03.set_heightbase("");
            this.Div00.form.Div11.set_leftbase("");
            this.Div00.form.Div11.set_topbase("");
            this.Div00.form.Div11.set_bottombase("");
            this.Div00.form.Div11.set_rightbase("");
            this.Div00.form.Div11.set_widthbase("");
            this.Div00.form.Div11.set_heightbase("");
            this.Div00.form.Edit04.set_leftbase("");
            this.Div00.form.Edit04.set_topbase("");
            this.Div00.form.Edit04.set_bottombase("");
            this.Div00.form.Edit04.set_rightbase("");
            this.Div00.form.Edit04.set_widthbase("");
            this.Div00.form.Edit04.set_heightbase("");
            this.Div00.form.btnProjectInfo.set_leftbase("");
            this.Div00.form.btnProjectInfo.set_topbase("");
            this.Div00.form.btnProjectInfo.set_bottombase("");
            this.Div00.form.btnProjectInfo.set_rightbase("");
            this.Div00.form.btnProjectInfo.set_widthbase("");
            this.Div00.form.btnProjectInfo.set_heightbase("");
            this.Div00.form.Div12.set_leftbase("");
            this.Div00.form.Div12.set_topbase("");
            this.Div00.form.Div12.set_bottombase("");
            this.Div00.form.Div12.set_rightbase("");
            this.Div00.form.Div12.set_widthbase("");
            this.Div00.form.Div12.set_heightbase("");
            this.Div00.form.Div13.set_leftbase("");
            this.Div00.form.Div13.set_topbase("");
            this.Div00.form.Div13.set_bottombase("");
            this.Div00.form.Div13.set_rightbase("");
            this.Div00.form.Div13.set_widthbase("");
            this.Div00.form.Div13.set_heightbase("");
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
            this.Div00.form.btnDetailInsert.set_leftbase("");
            this.Div00.form.btnDetailInsert.set_topbase("");
            this.Div00.form.btnDetailInsert.set_bottombase("");
            this.Div00.form.btnDetailInsert.set_rightbase("");
            this.Div00.form.btnDetailInsert.set_widthbase("");
            this.Div00.form.btnDetailInsert.set_heightbase("");
            this.Div00.form.TextArea02.set_leftbase("");
            this.Div00.form.TextArea02.set_topbase("");
            this.Div00.form.TextArea02.set_bottombase("");
            this.Div00.form.TextArea02.set_rightbase("");
            this.Div00.form.TextArea02.set_widthbase("");
            this.Div00.form.TextArea02.set_heightbase("");
            this.Div00.form.Div14.set_leftbase("");
            this.Div00.form.Div14.set_topbase("");
            this.Div00.form.Div14.set_bottombase("");
            this.Div00.form.Div14.set_rightbase("");
            this.Div00.form.Div14.set_widthbase("");
            this.Div00.form.Div14.set_heightbase("");
            this.Div00.form.TextArea03.set_leftbase("");
            this.Div00.form.TextArea03.set_topbase("");
            this.Div00.form.TextArea03.set_bottombase("");
            this.Div00.form.TextArea03.set_rightbase("");
            this.Div00.form.TextArea03.set_widthbase("");
            this.Div00.form.TextArea03.set_heightbase("");
            this.Div00.form.Grid00.set_leftbase("");
            this.Div00.form.Grid00.set_topbase("");
            this.Div00.form.Grid00.set_bottombase("");
            this.Div00.form.Grid00.set_rightbase("");
            this.Div00.form.Grid00.set_widthbase("");
            this.Div00.form.Grid00.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,768,this,function(p){});
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

        this.loadIncludeScript("BMSupportRegister.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
