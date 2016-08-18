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
                obj.set_name("TEST02");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Dataset00", this);
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">z</Col><Col id=\"Column1\">zzzz</Col><Col id=\"Column2\">qww</Col><Col id=\"Column3\">fsdfds</Col></Row><Row><Col id=\"Column0\">sdf</Col><Col id=\"Column1\">erere</Col><Col id=\"Column2\">dfsdq</Col><Col id=\"Column3\">rrrr</Col></Row><Row><Col id=\"Column0\">fsdfsdf</Col><Col id=\"Column1\">qweqwe</Col><Col id=\"Column2\">gsdsfd</Col><Col id=\"Column3\">sss</Col></Row><Row><Col id=\"Column0\">sdfhhhj</Col><Col id=\"Column1\">fsdfsdf</Col><Col id=\"Column2\">yyyy</Col><Col id=\"Column3\">zzz</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Menu("Menu00","absolute","19","15","374","82",null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin00","absolute","15","107","424","65",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new ListBox("ListBox00","absolute","15","183","477","131",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","406","20","168","65",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("CheckBox00");
            });
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00","absolute","475","115","104","57",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","511","120","345","194",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("5");
                obj.set_binddataset("Dataset00");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"Column0\"/><Cell col=\"1\" text=\"Column1\"/><Cell col=\"2\" text=\"Column2\"/><Cell col=\"3\" text=\"Column3\"/></Band><Band id=\"body\"><Cell text=\"bind:Column0\" background-color=\"aqua\"/><Cell col=\"1\" text=\"bind:Column1\"/><Cell col=\"2\" text=\"bind:Column2\"/><Cell col=\"3\" text=\"bind:Column3\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","334","407","120","50",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Button00");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button02","absolute","-1","0","0","0",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Button00");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button04","absolute","-1","0","0","0",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Button00");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","-1","0","0","0",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("6");
                obj.set_text("Button00");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","566","312","388","175",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("7");
                obj.set_text("Grid01");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"60\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting


            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1078,810,this,function(p){});
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

        this.loadIncludeScript("TEST02.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
