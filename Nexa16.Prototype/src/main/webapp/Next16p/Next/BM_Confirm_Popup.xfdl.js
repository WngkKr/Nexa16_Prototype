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
                obj.set_name("BM_Confirm_Popup");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,360,272);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static00","absolute","0","0",null,"52","0",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("※라이센스 승인 요청 사유를 입력해 주세요.");
                obj.set_font("bold 13pt Arial");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","5","48",null,"97","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("제품 내역을 수정할 경우\r\n[부사장님의 승인]이 필요합니다. \r\n▶계속하시려면 내용을 입력하시고 확인 버튼을 눌러주세요.");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("ta_Confirm","absolute","5",null,null,"114","5","30",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","absolute",null,null,"50","20","5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("취소");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btn_Confirm","absolute",null,null,"55","20","61","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("승인요청");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Static00.set_leftbase("");
            this.Static00.set_topbase("");
            this.Static00.set_bottombase("");
            this.Static00.set_rightbase("");
            this.Static00.set_widthbase("");
            this.Static00.set_heightbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_topbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
            this.ta_Confirm.set_leftbase("");
            this.ta_Confirm.set_topbase("");
            this.ta_Confirm.set_bottombase("");
            this.ta_Confirm.set_rightbase("");
            this.ta_Confirm.set_widthbase("");
            this.ta_Confirm.set_heightbase("");
            this.btn_Cancel.set_leftbase("");
            this.btn_Cancel.set_topbase("");
            this.btn_Cancel.set_bottombase("");
            this.btn_Cancel.set_rightbase("");
            this.btn_Cancel.set_widthbase("");
            this.btn_Cancel.set_heightbase("");
            this.btn_Confirm.set_leftbase("");
            this.btn_Confirm.set_topbase("");
            this.btn_Confirm.set_bottombase("");
            this.btn_Confirm.set_rightbase("");
            this.btn_Confirm.set_widthbase("");
            this.btn_Confirm.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",360,272,this,function(p){});
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

        this.loadIncludeScript("BM_Confirm_Popup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
