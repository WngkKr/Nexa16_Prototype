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
                obj.set_name("TEST04");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1024,768);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("Button00","absolute","7","13","483","199",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("Button00");
            });
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","19","231","472","76",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("CheckBox00");
            });
            this.addChild(obj.name, obj);

            obj = new Spin("Spin00","absolute","549","55","212","341",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","853","159","120","50",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("Button01");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting


            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1024,768,this,function(p){});
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

        this.loadIncludeScript("TEST04.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
