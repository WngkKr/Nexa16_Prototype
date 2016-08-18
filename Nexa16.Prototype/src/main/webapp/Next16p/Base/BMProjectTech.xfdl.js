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
                obj.set_name("BMProjectTech");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","5","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("지원내용");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdApproval","absolute","5","40",null,"352","370",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"40\"/><Column size=\"130\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"40\"/><Column size=\"80\"/><Column size=\"40\"/></Columns><Rows><Row size=\"36\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"NO\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"1\" text=\"승인&#13;&#10;상태\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"2\" text=\"매출계약명\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"3\" text=\"작업&#13;&#10;시작일자\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"4\" text=\"작업&#13;&#10;완료일자\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"5\" text=\"총작업&#13;&#10;시간\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"6\" text=\"기술&#13;&#10;담당자\" font-size=\"9\" font-weight=\"normal\"/><Cell col=\"7\" text=\"원가&#13;&#10;반영\" font-size=\"9\" font-weight=\"normal\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band><Band id=\"summary\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","397","163","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("첨부파일(더블클릭하세요)");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdFile","absolute","5","432",null,null,"370","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"450\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"첨부파일\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSave","absolute","485","5","45","29",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","540","5","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("작업요청내용");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","540","40",null,"280","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","540","328","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("작업완료내용");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","absolute","540","363",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("wbFileDown","absolute","159","403","150","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.grdApproval.set_leftbase("");
            this.grdApproval.set_topbase("");
            this.grdApproval.set_bottombase("");
            this.grdApproval.set_rightbase("");
            this.grdApproval.set_widthbase("");
            this.grdApproval.set_heightbase("");
            this.Static01.set_topbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
            this.grdFile.set_topbase("");
            this.grdFile.set_leftbase("");
            this.grdFile.set_bottombase("");
            this.grdFile.set_rightbase("");
            this.grdFile.set_widthbase("");
            this.grdFile.set_heightbase("");
            this.btnSave.set_leftbase("");
            this.btnSave.set_topbase("");
            this.btnSave.set_bottombase("");
            this.btnSave.set_rightbase("");
            this.btnSave.set_widthbase("");
            this.btnSave.set_heightbase("");
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");
            this.Static03.set_leftbase("");
            this.Static03.set_topbase("");
            this.Static03.set_bottombase("");
            this.Static03.set_rightbase("");
            this.Static03.set_widthbase("");
            this.Static03.set_heightbase("");
            this.TextArea01.set_leftbase("");
            this.TextArea01.set_topbase("");
            this.TextArea01.set_bottombase("");
            this.TextArea01.set_rightbase("");
            this.TextArea01.set_widthbase("");
            this.TextArea01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",900,648,this,function(p){});
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

        this.loadIncludeScript("BMProjectTech.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
