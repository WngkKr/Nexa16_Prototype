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
                obj.set_name("BM_Sales_Program_NetDetail");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList1", this);
            obj._setContents("<ColumnInfo><Column id=\"고객사\" type=\"STRING\" size=\"256\"/><Column id=\"계약명\" type=\"STRING\" size=\"256\"/><Column id=\"계약금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList2", this);
            obj._setContents("<ColumnInfo><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"성명\" type=\"STRING\" size=\"256\"/><Column id=\"투입일자\" type=\"STRING\" size=\"256\"/><Column id=\"종료일자\" type=\"STRING\" size=\"256\"/><Column id=\"MM\" type=\"STRING\" size=\"256\"/><Column id=\"금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList3", this);
            obj._setContents("<ColumnInfo><Column id=\"계약내역\" type=\"STRING\" size=\"256\"/><Column id=\"계약금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList4", this);
            obj._setContents("<ColumnInfo><Column id=\"제품명\" type=\"STRING\" size=\"256\"/><Column id=\"계약단가\" type=\"STRING\" size=\"256\"/><Column id=\"계약수량\" type=\"STRING\" size=\"256\"/><Column id=\"계약금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList5", this);
            obj._setContents("<ColumnInfo><Column id=\"업체명\" type=\"STRING\" size=\"256\"/><Column id=\"시작일\" type=\"STRING\" size=\"256\"/><Column id=\"종료일\" type=\"STRING\" size=\"256\"/><Column id=\"계약일\" type=\"STRING\" size=\"256\"/><Column id=\"계약금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsList6", this);
            obj._setContents("<ColumnInfo><Column id=\"NO\" type=\"STRING\" size=\"256\"/><Column id=\"기술담당자\" type=\"STRING\" size=\"256\"/><Column id=\"시작일자\" type=\"STRING\" size=\"256\"/><Column id=\"완료일자\" type=\"STRING\" size=\"256\"/><Column id=\"작업시간\" type=\"STRING\" size=\"256\"/><Column id=\"금액\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","absolute","405","5","242","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("매출계약");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","405","155","242","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("영업매입계약");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdSale","absolute","405","30",null,"120","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList3");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"300\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"계약내역\"/><Cell col=\"1\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:계약내역\"/><Cell col=\"1\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdPurchase","absolute","405","180",null,"120","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList4");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"97\"/><Column size=\"97\"/><Column size=\"97\"/><Column size=\"97\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"제품명\"/><Cell col=\"1\" text=\"계약단가\"/><Cell col=\"2\" text=\"계약수량\"/><Cell col=\"3\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:제품명\"/><Cell col=\"1\" text=\"bind:계약단가\"/><Cell col=\"2\" text=\"bind:계약수량\"/><Cell col=\"3\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","405","305","242","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("용역매입계약");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdSI","absolute","405","330",null,"120","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList5");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"75\"/><Column size=\"75\"/><Column size=\"75\"/><Column size=\"75\"/><Column size=\"75\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"업체명\"/><Cell col=\"1\" text=\"시작일\"/><Cell col=\"2\" text=\"종료일\"/><Cell col=\"3\" text=\"계약일\"/><Cell col=\"4\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:업체명\"/><Cell col=\"1\" text=\"bind:시작일\"/><Cell col=\"2\" text=\"bind:종료일\"/><Cell col=\"3\" text=\"bind:계약일\"/><Cell col=\"4\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","405","455","242","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("기술지원비용");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdTech","absolute","405","480",null,"115","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList6");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"기술담당자\"/><Cell col=\"2\" text=\"시작일자\"/><Cell col=\"3\" text=\"완료일자\"/><Cell col=\"4\" text=\"작업시간\"/><Cell col=\"5\" text=\"금액\"/></Band><Band id=\"body\"><Cell text=\"bind:NO\"/><Cell col=\"1\" text=\"bind:기술담당자\"/><Cell col=\"2\" text=\"bind:시작일자\"/><Cell col=\"3\" text=\"bind:완료일자\"/><Cell col=\"4\" text=\"bind:작업시간\"/><Cell col=\"5\" text=\"bind:금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","5","455","242","20",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("투비직원");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdTobe","absolute","5","480",null,"115","405",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList2");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"성명\"/><Cell col=\"2\" text=\"투입일자\"/><Cell col=\"3\" text=\"종료일자\"/><Cell col=\"4\" text=\"MM\"/><Cell col=\"5\" text=\"금액\"/></Band><Band id=\"body\"><Cell text=\"bind:NO\"/><Cell col=\"1\" text=\"bind:성명\"/><Cell col=\"2\" text=\"bind:투입일자\"/><Cell col=\"3\" text=\"bind:종료일자\"/><Cell col=\"4\" text=\"bind:MM\"/><Cell col=\"5\" text=\"bind:금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdNet","absolute","5","30",null,"420","405",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList1");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"150\"/><Column size=\"150\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"고객사\"/><Cell col=\"1\" text=\"계약명\"/><Cell col=\"2\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:고객사\"/><Cell col=\"1\" text=\"bind:계약명\"/><Cell col=\"2\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("btnProject","absolute","628","5",null,"20","77",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_text("프로젝트화면");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","728","5",null,"20","32",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("순매출");
                obj.set_color("red");
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
            this.grdPurchase.set_leftbase("");
            this.grdPurchase.set_topbase("");
            this.grdPurchase.set_bottombase("");
            this.grdPurchase.set_rightbase("");
            this.grdPurchase.set_widthbase("");
            this.grdPurchase.set_heightbase("");
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.grdSI.set_leftbase("");
            this.grdSI.set_topbase("");
            this.grdSI.set_bottombase("");
            this.grdSI.set_rightbase("");
            this.grdSI.set_widthbase("");
            this.grdSI.set_heightbase("");
            this.Static03.set_leftbase("");
            this.Static03.set_topbase("");
            this.Static03.set_bottombase("");
            this.Static03.set_rightbase("");
            this.Static03.set_widthbase("");
            this.Static03.set_heightbase("");
            this.grdTech.set_leftbase("");
            this.grdTech.set_topbase("");
            this.grdTech.set_bottombase("");
            this.grdTech.set_rightbase("");
            this.grdTech.set_widthbase("");
            this.grdTech.set_heightbase("");
            this.Static04.set_leftbase("");
            this.Static04.set_topbase("");
            this.Static04.set_bottombase("");
            this.Static04.set_rightbase("");
            this.Static04.set_widthbase("");
            this.Static04.set_heightbase("");
            this.grdTobe.set_leftbase("");
            this.grdTobe.set_topbase("");
            this.grdTobe.set_bottombase("");
            this.grdTobe.set_rightbase("");
            this.grdTobe.set_widthbase("");
            this.grdTobe.set_heightbase("");
            this.grdNet.set_leftbase("");
            this.grdNet.set_topbase("");
            this.grdNet.set_bottombase("");
            this.grdNet.set_rightbase("");
            this.grdNet.set_widthbase("");
            this.grdNet.set_heightbase("");
            this.btnProject.set_leftbase("");
            this.btnProject.set_topbase("");
            this.btnProject.set_bottombase("");
            this.btnProject.set_rightbase("");
            this.btnProject.set_widthbase("");
            this.btnProject.set_heightbase("");
            this.Static05.set_leftbase("");
            this.Static05.set_topbase("");
            this.Static05.set_bottombase("");
            this.Static05.set_rightbase("");
            this.Static05.set_widthbase("");
            this.Static05.set_heightbase("");

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

        this.loadIncludeScript("BM_Sales_Program_NetDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
