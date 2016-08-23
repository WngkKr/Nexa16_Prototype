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
                obj.set_name("BM_Sales_Program_Contract");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"고객사\" type=\"STRING\" size=\"256\"/><Column id=\"프로젝트명\" type=\"STRING\" size=\"256\"/><Column id=\"계약명\" type=\"STRING\" size=\"256\"/><Column id=\"계약일자\" type=\"STRING\" size=\"256\"/><Column id=\"계약상태\" type=\"STRING\" size=\"256\"/><Column id=\"인센티브해당자\" type=\"STRING\" size=\"256\"/><Column id=\"계산발행\" type=\"STRING\" size=\"256\"/><Column id=\"수금일자\" type=\"STRING\" size=\"256\"/><Column id=\"납품일자\" type=\"STRING\" size=\"256\"/><Column id=\"오픈일자\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grdProjectList","absolute","10","88",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"139\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"고객사\"/><Cell col=\"1\" text=\"프로젝트명\"/><Cell col=\"2\" text=\"계약명\"/><Cell col=\"3\" text=\"계약일자\"/><Cell col=\"4\" text=\"계약상태\"/><Cell col=\"5\" text=\"인센티브해당자\"/><Cell col=\"6\" text=\"계산발행\"/><Cell col=\"7\" text=\"수금일자\"/><Cell col=\"8\" text=\"납품일자\"/><Cell col=\"9\" text=\"오픈일자\"/></Band><Band id=\"body\"><Cell text=\"bind:고객사\"/><Cell col=\"1\" text=\"bind:프로젝트명\"/><Cell col=\"2\" text=\"bind:계약명\"/><Cell col=\"3\" text=\"bind:계약일자\"/><Cell col=\"4\" text=\"bind:계약상태\"/><Cell col=\"5\" text=\"bind:인센티브해당자\"/><Cell col=\"6\" text=\"bind:계산발행\"/><Cell col=\"7\" text=\"bind:수금일자\"/><Cell col=\"8\" text=\"bind:납품일자\"/><Cell col=\"9\" text=\"bind:오픈일자\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","7","6",null,"42","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","5","5","34","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("기간");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("CalFrom","absolute","35","8","84","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","120","4","34","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("CalTo","absolute","131","8","84","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_dateformat("yyyy-MM");
                obj.set_editformat("yyyy-MM");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("cbk_step3","absolute","232","8","468","20",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계약이 완료된 예상계약건만 표시(STEP 3)");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Button("btnConfirmCancel","absolute",null,"53","100","27","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("계약확정취소");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.grdProjectList.set_leftbase("");
            this.grdProjectList.set_topbase("Button00.bottom");
            this.grdProjectList.set_bottombase("");
            this.grdProjectList.set_rightbase("");
            this.grdProjectList.set_widthbase("");
            this.grdProjectList.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.btnConfirmCancel.set_leftbase("");
            this.btnConfirmCancel.set_topbase("");
            this.btnConfirmCancel.set_bottombase("");
            this.btnConfirmCancel.set_rightbase("");
            this.btnConfirmCancel.set_widthbase("");
            this.btnConfirmCancel.set_heightbase("");

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
        this.registerScript("BM_Sales_Program_Contract.xfdl", function() {
        /************************************************************************
         * 전역변수선언
         ************************************************************************/


        /************************************************************************
         *  BM_SALES_PROGRAM_CONTRACT FORM ONLOAD
         ************************************************************************/
        this.Form_onload = function(obj,e)
        {
        	var objDateYYYY = new Date();
        	var nYear = objDateYYYY.getFullYear();
        	var objDateMM = new Date();
        	var nMonth = objDateMM.getMonth();

        	var objDate = new Date();
        	var strDate = objDate.toDateString("YYYYMMDD");

        	trace(nYear);
        	trace(nMonth);
        	trace(strDate);
        	this.Div00.form.CalFrom.set_value(nYear+nMonth);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
        };

        this.loadIncludeScript("BM_Sales_Program_Contract.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
