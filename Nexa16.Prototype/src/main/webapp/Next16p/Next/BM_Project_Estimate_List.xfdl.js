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
                obj.set_name("BM_Project_Estimate_List");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1050,660);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Grid("Grid00","absolute","5","30","720",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"99\"/><Column size=\"99\"/><Column size=\"99\"/><Column size=\"99\"/><Column size=\"99\"/><Column size=\"99\"/><Column size=\"99\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"견적번호\"/><Cell col=\"1\" text=\"견적일자\"/><Cell col=\"2\" text=\"견적금액\"/><Cell col=\"3\" text=\"유효기간\"/><Cell col=\"4\" text=\"납품기한\"/><Cell col=\"5\" text=\"지불조건\"/><Cell col=\"6\" text=\"최종견적서\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","730","30",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"230\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"첨부파일\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute",null,"5","133","20","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("첨부파일업로드");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
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
            this.Button00.set_leftbase("");
            this.Button00.set_topbase("");
            this.Button00.set_bottombase("");
            this.Button00.set_rightbase("");
            this.Button00.set_widthbase("");
            this.Button00.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1050,660,this,function(p){});
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

        this.loadIncludeScript("BM_Project_Estimate_List.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
