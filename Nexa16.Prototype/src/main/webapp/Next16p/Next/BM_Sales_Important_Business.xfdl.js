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
                obj.set_name("BM_Sales_Important_Business");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Grid("grdProjectList","absolute","5","34",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"100\"/><Column size=\"200\"/><Column size=\"100\"/><Column size=\"80\"/><Column size=\"100\"/><Column size=\"200\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"중요등록일\"/><Cell col=\"2\" text=\"중요내용\"/><Cell col=\"3\" text=\"등록일자\"/><Cell col=\"4\" text=\"영업대표\"/><Cell col=\"5\" text=\"고객사\"/><Cell col=\"6\" text=\"계약명\"/><Cell col=\"7\" text=\"예상매출\"/><Cell col=\"8\" text=\"예상비용\"/><Cell col=\"9\" text=\"순매출\"/><Cell col=\"10\" text=\"영업상태\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/><Cell col=\"10\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","34","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("기간");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("calStartDate","absolute","35","9","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","136","4","34","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("~");
            });
            this.addChild(obj.name, obj);

            obj = new Calendar("calEndDate","absolute","147","9","100","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnSearch","absolute","619","7","85","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("조회");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnExcel","absolute","707","7",null,"20","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("엑셀");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.grdProjectList.set_leftbase("");
            this.grdProjectList.set_topbase("");
            this.grdProjectList.set_bottombase("");
            this.grdProjectList.set_rightbase("");
            this.grdProjectList.set_widthbase("");
            this.grdProjectList.set_heightbase("");
            this.calStartDate.set_leftbase("");
            this.calStartDate.set_topbase("");
            this.calStartDate.set_bottombase("");
            this.calStartDate.set_rightbase("");
            this.calStartDate.set_widthbase("");
            this.calStartDate.set_heightbase("");
            this.btnSearch.set_leftbase("");
            this.btnSearch.set_topbase("");
            this.btnSearch.set_bottombase("");
            this.btnSearch.set_rightbase("");
            this.btnSearch.set_widthbase("");
            this.btnSearch.set_heightbase("");
            this.btnExcel.set_leftbase("");
            this.btnExcel.set_topbase("");
            this.btnExcel.set_bottombase("");
            this.btnExcel.set_rightbase("");
            this.btnExcel.set_widthbase("");
            this.btnExcel.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
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

        this.loadIncludeScript("BM_Sales_Important_Business.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
