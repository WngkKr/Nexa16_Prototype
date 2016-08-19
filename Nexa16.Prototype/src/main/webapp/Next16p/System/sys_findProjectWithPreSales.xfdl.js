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
                obj.set_name("sys_findProjectWithPreSales");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,944,472);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","absolute","5","5","462","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","4","112","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("회사명");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","45","4","293","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","351","4","53","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("등록");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","406","4","53","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("닫기");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","40","462",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"60\"/><Column size=\"60\"/><Column size=\"300\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"구분\"/><Cell col=\"1\" text=\"코드\"/><Cell col=\"2\" text=\"회사명\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","472","8","125","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("* 프로젝트");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","472","40",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Div01");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btn_divClose","absolute","883","6","56","28",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("<<");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
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
            this.Div00.form.Edit00.set_leftbase("");
            this.Div00.form.Edit00.set_topbase("");
            this.Div00.form.Edit00.set_bottombase("");
            this.Div00.form.Edit00.set_rightbase("");
            this.Div00.form.Edit00.set_widthbase("");
            this.Div00.form.Edit00.set_heightbase("");
            this.Div00.form.Button00.set_leftbase("");
            this.Div00.form.Button00.set_topbase("");
            this.Div00.form.Button00.set_bottombase("");
            this.Div00.form.Button00.set_rightbase("");
            this.Div00.form.Button00.set_widthbase("");
            this.Div00.form.Button00.set_heightbase("");
            this.Div00.form.Button01.set_leftbase("");
            this.Div00.form.Button01.set_topbase("");
            this.Div00.form.Button01.set_bottombase("");
            this.Div00.form.Button01.set_rightbase("");
            this.Div00.form.Button01.set_widthbase("");
            this.Div00.form.Button01.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.Div01.set_leftbase("");
            this.Div01.set_topbase("");
            this.Div01.set_bottombase("");
            this.Div01.set_rightbase("");
            this.Div01.set_widthbase("");
            this.Div01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",944,472,this,function(p){});
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

        this.loadIncludeScript("sys_findProjectWithPreSales.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
