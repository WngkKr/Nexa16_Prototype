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
                this.set_name("BMSalesProgramNetDetail");
                this.set_titletext("New Form");
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

            obj = new Grid("Grid00","absolute","405","30",null,"120","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList3");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"300\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"계약내역\"/><Cell col=\"1\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:계약내역\"/><Cell col=\"1\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","405","180",null,"120","5",null,this);
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

            obj = new Grid("Grid02","absolute","405","330",null,"120","5",null,this);
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

            obj = new Grid("Grid03","absolute","405","480",null,"115","5",null,this);
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

            obj = new Grid("Grid04","absolute","5","480",null,"115","405",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList2");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"성명\"/><Cell col=\"2\" text=\"투입일자\"/><Cell col=\"3\" text=\"종료일자\"/><Cell col=\"4\" text=\"MM\"/><Cell col=\"5\" text=\"금액\"/></Band><Band id=\"body\"><Cell text=\"bind:NO\"/><Cell col=\"1\" text=\"bind:성명\"/><Cell col=\"2\" text=\"bind:투입일자\"/><Cell col=\"3\" text=\"bind:종료일자\"/><Cell col=\"4\" text=\"bind:MM\"/><Cell col=\"5\" text=\"bind:금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid05","absolute","5","30",null,"420","405",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_binddataset("dsList1");
                obj.set_nodatatext("데이터가 없습니다.");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"150\"/><Column size=\"150\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"고객사\"/><Cell col=\"1\" text=\"계약명\"/><Cell col=\"2\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell text=\"bind:고객사\"/><Cell col=\"1\" text=\"bind:계약명\"/><Cell col=\"2\" text=\"bind:계약금액\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","628","5",null,"20","77",null,this);
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
            this.Grid01.set_leftbase("");
            this.Grid01.set_topbase("");
            this.Grid01.set_bottombase("");
            this.Grid01.set_rightbase("");
            this.Grid01.set_widthbase("");
            this.Grid01.set_heightbase("");
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.Grid02.set_leftbase("");
            this.Grid02.set_topbase("");
            this.Grid02.set_bottombase("");
            this.Grid02.set_rightbase("");
            this.Grid02.set_widthbase("");
            this.Grid02.set_heightbase("");
            this.Static03.set_leftbase("");
            this.Static03.set_topbase("");
            this.Static03.set_bottombase("");
            this.Static03.set_rightbase("");
            this.Static03.set_widthbase("");
            this.Static03.set_heightbase("");
            this.Grid03.set_leftbase("");
            this.Grid03.set_topbase("");
            this.Grid03.set_bottombase("");
            this.Grid03.set_rightbase("");
            this.Grid03.set_widthbase("");
            this.Grid03.set_heightbase("");
            this.Static04.set_leftbase("");
            this.Static04.set_topbase("");
            this.Static04.set_bottombase("");
            this.Static04.set_rightbase("");
            this.Static04.set_widthbase("");
            this.Static04.set_heightbase("");
            this.Grid04.set_leftbase("");
            this.Grid04.set_topbase("");
            this.Grid04.set_bottombase("");
            this.Grid04.set_rightbase("");
            this.Grid04.set_widthbase("");
            this.Grid04.set_heightbase("");
            this.Grid05.set_leftbase("");
            this.Grid05.set_topbase("");
            this.Grid05.set_bottombase("");
            this.Grid05.set_rightbase("");
            this.Grid05.set_widthbase("");
            this.Grid05.set_heightbase("");
            this.Button00.set_leftbase("");
            this.Button00.set_topbase("");
            this.Button00.set_bottombase("");
            this.Button00.set_rightbase("");
            this.Button00.set_widthbase("");
            this.Button00.set_heightbase("");
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

        this.loadIncludeScript("BMSalesProgramNetDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
