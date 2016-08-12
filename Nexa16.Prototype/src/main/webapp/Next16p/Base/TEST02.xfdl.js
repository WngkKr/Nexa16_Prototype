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
                this.set_name("TEST02");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1078,810);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
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

            obj = new ListBox("ListBox00","absolute","22","183","477","131",null,null,this);
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
