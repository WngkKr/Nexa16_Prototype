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
                obj.set_name("CM_Company_AddressBookPop");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,910,280);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","5","130","19",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("담당자정보");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnClose","absolute",null,"4","68","20","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnConfirm","absolute",null,"4","68","20","77",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("반영");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","25",null,"36","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","700","8","120","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSearch","absolute",null,"8","68","20","5",null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("조회");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","8","69","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("회 사 명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","63","8","213","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnSearchF00","absolute","277","9","16","18",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("");
                obj.set_background("URL(\"theme://images\\ico_zoom.png\")");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","317","8","69","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("담당자명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","375","8","213","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid0","absolute","5","66",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"35\"/><Column size=\"48\"/><Column size=\"150\"/><Column size=\"120\"/><Column size=\"48\"/><Column size=\"100\"/><Column size=\"48\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"120\"/><Column size=\"200\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"선택\"/><Cell col=\"1\" text=\"현황\"/><Cell col=\"2\" text=\"회사명\"/><Cell col=\"3\" text=\"부서\"/><Cell col=\"4\" text=\"역할\"/><Cell col=\"5\" text=\"담당자명\"/><Cell col=\"6\" text=\"직급\"/><Cell col=\"7\" text=\"유선번호\"/><Cell col=\"8\" text=\"휴대폰\"/><Cell col=\"9\" text=\"이메일\"/><Cell col=\"10\" text=\"비고\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\"/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/><Cell col=\"10\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);
            
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
            this.btnConfirm.set_leftbase("");
            this.btnConfirm.set_topbase("");
            this.btnConfirm.set_bottombase("");
            this.btnConfirm.set_rightbase("");
            this.btnConfirm.set_widthbase("");
            this.btnConfirm.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.Edit00.set_leftbase("");
            this.Div00.form.Edit00.set_topbase("");
            this.Div00.form.Edit00.set_bottombase("");
            this.Div00.form.Edit00.set_rightbase("");
            this.Div00.form.Edit00.set_widthbase("");
            this.Div00.form.Edit00.set_heightbase("");
            this.Div00.form.btnSearch.set_leftbase("");
            this.Div00.form.btnSearch.set_topbase("");
            this.Div00.form.btnSearch.set_bottombase("");
            this.Div00.form.btnSearch.set_rightbase("");
            this.Div00.form.btnSearch.set_widthbase("");
            this.Div00.form.btnSearch.set_heightbase("");
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.Edit01.set_leftbase("");
            this.Div00.form.Edit01.set_topbase("");
            this.Div00.form.Edit01.set_bottombase("");
            this.Div00.form.Edit01.set_rightbase("");
            this.Div00.form.Edit01.set_widthbase("");
            this.Div00.form.Edit01.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.Edit02.set_leftbase("");
            this.Div00.form.Edit02.set_topbase("");
            this.Div00.form.Edit02.set_bottombase("");
            this.Div00.form.Edit02.set_rightbase("");
            this.Div00.form.Edit02.set_widthbase("");
            this.Div00.form.Edit02.set_heightbase("");
            this.Grid0.set_leftbase("");
            this.Grid0.set_topbase("");
            this.Grid0.set_bottombase("");
            this.Grid0.set_rightbase("");
            this.Grid0.set_widthbase("");
            this.Grid0.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",910,280,this,function(p){});
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

        this.loadIncludeScript("CM_Company_AddressBookPop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
