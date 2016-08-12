(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            if (Form == this.constructor)
            {
                this.set_name("TEST01");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Tab("Tab00","absolute","120","57","719","421",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_tabindex("0");
            });
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage1");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage2");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage3",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage3");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage4",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage4");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage5",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage5");
            });
            this.Tab00.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage6",this.Tab00);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_text("Tabpage6");
            });
            this.Tab00.addChild(obj.name, obj);
            
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

        this.loadIncludeScript("TEST01.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
