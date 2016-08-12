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
                this.set_name("TEST03");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,900,648);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Grid("Grid00","absolute","5","5",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"70\"/><Column size=\"139\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"84\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/><Column size=\"48\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"고객사\"/><Cell col=\"1\" rowspan=\"2\" text=\"프로젝트\"/><Cell col=\"2\" rowspan=\"2\" text=\"영업대표\"/><Cell col=\"3\" rowspan=\"2\" text=\"계약일자\"/><Cell col=\"4\" colspan=\"3\" text=\"매출\" background-color=\"aqua\"/><Cell col=\"7\" colspan=\"3\" text=\"매입\" background-color=\"cornflowerblue\"/><Cell col=\"10\" rowspan=\"2\" text=\"예상율\"/><Cell col=\"11\" colspan=\"3\" text=\"투입예정\"/><Cell row=\"1\" col=\"4\" text=\"매출계약처\" background-color=\"cadetblue\"/><Cell row=\"1\" col=\"5\" text=\"매출내역\" background-color=\"aqua\"/><Cell row=\"1\" col=\"6\" text=\"예상금액\" background-color=\"aqua\"/><Cell row=\"1\" col=\"7\" text=\"매입계약처\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"8\" text=\"매입내역\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"9\" text=\"예상금액\" background-color=\"cornflowerblue\"/><Cell row=\"1\" col=\"11\" text=\"인원\"/><Cell row=\"1\" col=\"12\" text=\"기간\"/><Cell row=\"1\" col=\"13\" text=\"월\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/><Cell col=\"8\"/><Cell col=\"9\"/><Cell col=\"10\"/><Cell col=\"11\"/><Cell col=\"12\"/><Cell col=\"13\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","5","5",null,"75","5",null,this);
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

            obj = new Static("Static02","absolute","237","5","45","30",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("고객사");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","279","8","237","22",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00","absolute","5","42","153","26",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("영업대표전체대상");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01","absolute","147","42","113","26",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("예상율반영");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Radio("Radio00","absolute","253","42","413","26",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_codecolumn("codecolumn");
                obj.set_datacolumn("datacolumn");
                obj.set_direction("vertical");
                obj.set_verticalAlign("middle");
                obj.set_textAlign("left");
                obj.set_wordSpacing("300px");
                var Div00_form_Radio00_innerdataset = new nexacro.NormalDataset("Div00_form_Radio00_innerdataset", obj);
                Div00_form_Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">all</Col><Col id=\"datacolumn\">전체</Col></Row><Row><Col id=\"codecolumn\">01</Col><Col id=\"datacolumn\">PreSales</Col></Row><Row><Col id=\"codecolumn\">02</Col><Col id=\"datacolumn\">수주</Col></Row><Row><Col id=\"codecolumn\">03</Col><Col id=\"datacolumn\">계약</Col></Row></Rows>");
                obj.set_innerdataset(Div00_form_Radio00_innerdataset);
            });
            this.Div00.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Grid00.set_topbase("Div00.bottom");
            this.Grid00.set_leftbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.Edit00.set_leftbase("");
            this.Div00.form.Edit00.set_topbase("");
            this.Div00.form.Edit00.set_bottombase("");
            this.Div00.form.Edit00.set_rightbase("");
            this.Div00.form.Edit00.set_widthbase("");
            this.Div00.form.Edit00.set_heightbase("");
            this.Div00.form.CheckBox00.set_leftbase("");
            this.Div00.form.CheckBox00.set_topbase("");
            this.Div00.form.CheckBox00.set_bottombase("");
            this.Div00.form.CheckBox00.set_rightbase("");
            this.Div00.form.CheckBox00.set_widthbase("");
            this.Div00.form.CheckBox00.set_heightbase("");

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
            this.addEventHandler("onload",this.Form_onload,this);
        };

        this.loadIncludeScript("TEST03.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
