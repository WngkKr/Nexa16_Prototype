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
                this.set_name("BMProjectTech");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","5","5","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("지원내용");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","5","40","440","352",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","397","163","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("첨부파일(더블클릭하세요)");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","5","432","440",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","400","5","45","29",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("저장");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","455","5","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("작업요청내용");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","455","40",null,"280","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","455","328","120","30",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("작업완료내용");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea01","absolute","455","363",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Static01.set_topbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
            this.Grid01.set_topbase("");
            this.Grid01.set_leftbase("");
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
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");
            this.TextArea01.set_leftbase("");
            this.TextArea01.set_topbase("");
            this.TextArea01.set_bottombase("");
            this.TextArea01.set_rightbase("");
            this.TextArea01.set_widthbase("");
            this.TextArea01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",900,648,this,function(p){});
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

        this.loadIncludeScript("BMProjectTech.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
