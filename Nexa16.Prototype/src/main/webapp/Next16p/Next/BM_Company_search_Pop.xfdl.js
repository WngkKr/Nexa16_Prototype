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
                obj.set_name("BM_Company_search_Pop");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,500,444);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("btnSearch","absolute","65.8%","15","50","21",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("조회");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnConfirm","absolute","76.8%","15","50","21",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("확인");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnCancel","absolute","87.8%","15","50","21",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("취소");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","1.6%","43","9.32%","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("협력사");
                obj.set_textAlign("center");
            });
            this.addChild(obj.name, obj);

            obj = new Edit("edtCompany","absolute","12.4%","43","35.6%","21",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdCompany","absolute","8","76","485","359",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_text("Grid00");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"225\"/><Column size=\"254\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"협력사코드\"/><Cell col=\"1\" text=\"협력사명\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.btnSearch.set_leftbase("");
            this.btnSearch.set_topbase("");
            this.btnSearch.set_bottombase("");
            this.btnSearch.set_rightbase("");
            this.btnSearch.set_widthbase("");
            this.btnSearch.set_heightbase("");
            this.btnConfirm.set_leftbase("");
            this.btnConfirm.set_topbase("");
            this.btnConfirm.set_bottombase("");
            this.btnConfirm.set_rightbase("");
            this.btnConfirm.set_widthbase("");
            this.btnConfirm.set_heightbase("");
            this.btnCancel.set_leftbase("");
            this.btnCancel.set_topbase("");
            this.btnCancel.set_bottombase("");
            this.btnCancel.set_rightbase("");
            this.btnCancel.set_widthbase("");
            this.btnCancel.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",500,444,this,function(p){});
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

        this.loadIncludeScript("BM_Company_search_Pop.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
