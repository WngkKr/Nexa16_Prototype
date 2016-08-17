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
                this._setFormPosition(0,0,800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("Button00","absolute",null,"5","50","30","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("닫기");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"5","50","30","60",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button02","absolute",null,"5","50","30","115",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("삭제");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button03","absolute",null,"5","50","30","170",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("추가");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","40",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"280\"/><Column size=\"280\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"NO\"/><Cell col=\"1\" text=\"제품\"/><Cell col=\"2\" text=\"버전정보\"/><Cell row=\"1\" col=\"1\" colspan=\"2\" text=\"제목\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell row=\"1\"/><Cell row=\"1\" col=\"1\"/><Cell row=\"1\" col=\"2\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Button00.set_leftbase("");
            this.Button00.set_topbase("");
            this.Button00.set_bottombase("");
            this.Button00.set_rightbase("");
            this.Button00.set_widthbase("");
            this.Button00.set_heightbase("");
            this.Button01.set_leftbase("");
            this.Button01.set_topbase("");
            this.Button01.set_bottombase("");
            this.Button01.set_rightbase("");
            this.Button01.set_widthbase("");
            this.Button01.set_heightbase("");
            this.Button02.set_leftbase("");
            this.Button02.set_topbase("");
            this.Button02.set_bottombase("");
            this.Button02.set_rightbase("");
            this.Button02.set_widthbase("");
            this.Button02.set_heightbase("");
            this.Button03.set_leftbase("");
            this.Button03.set_topbase("");
            this.Button03.set_bottombase("");
            this.Button03.set_rightbase("");
            this.Button03.set_widthbase("");
            this.Button03.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");

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

        this.loadIncludeScript("BMSupportRegister.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
