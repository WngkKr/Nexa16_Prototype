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
                obj.set_name("BM_Project_Tech");
                obj.set_titletext("프리/컨설팅");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1056,660);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsBizType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">001</Col><Col id=\"NAME\">장기</Col></Row><Row><Col id=\"CODE\">002</Col><Col id=\"NAME\">집중</Col></Row><Row><Col id=\"CODE\">003</Col><Col id=\"NAME\">장기/집중</Col></Row><Row><Col id=\"CODE\">004</Col><Col id=\"NAME\">일반</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsProjectType", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">1</Col><Col id=\"NAME\">제품</Col></Row><Row><Col id=\"CODE\">2</Col><Col id=\"NAME\">SI</Col></Row><Row><Col id=\"CODE\">3</Col><Col id=\"NAME\">제품+SI</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsPassReqStatus", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"CODE\">0</Col><Col id=\"NAME\">이관요청</Col></Row><Row><Col id=\"CODE\">1</Col><Col id=\"NAME\">이관승인</Col></Row><Row><Col id=\"CODE\">9</Col><Col id=\"NAME\">요청반려</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("Static00","absolute","10","10","120","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("■ 지원내용");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","absolute","10","37","610","470",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_autofittype("col");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"40\"/><Column size=\"215\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"70\"/><Column size=\"40\"/></Columns><Rows><Row size=\"36\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"승인&#13;&#10;상태\"/><Cell col=\"2\" text=\"매출계약명\"/><Cell col=\"3\" text=\"작업&#13;&#10;시작일자\"/><Cell col=\"4\" text=\"작업&#13;&#10;완료일자\"/><Cell col=\"5\" text=\"총작업&#13;&#10;시간\"/><Cell col=\"6\" text=\"기술&#13;&#10;담당자\"/><Cell col=\"7\" text=\"원가&#13;&#10;반영\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/><Cell col=\"3\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","630","37",null,"300","10",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","630","10","120","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("■ 작업 요청 내용");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea02","absolute","630","374",null,null,"10","10",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","630","347","120","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("■ 작업 완료 내용");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","610","895","120","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("■ 작업 완료 내용");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","10","517","180","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("■ 첨부파일(더블클릭하세요)");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","absolute","10","544","610",null,null,"10",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_autofittype("col");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"404\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"첨부파일\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button00","absolute","520","10","100","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("엑셀다운로드");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute","478","10","40","22",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("4");
                obj.set_text("저장");
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
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");
            this.Static01.set_leftbase("");
            this.Static01.set_topbase("");
            this.Static01.set_bottombase("");
            this.Static01.set_rightbase("");
            this.Static01.set_widthbase("");
            this.Static01.set_heightbase("");
            this.TextArea02.set_leftbase("");
            this.TextArea02.set_topbase("");
            this.TextArea02.set_bottombase("");
            this.TextArea02.set_rightbase("");
            this.TextArea02.set_widthbase("");
            this.TextArea02.set_heightbase("");
            this.Static03.set_leftbase("");
            this.Static03.set_topbase("");
            this.Static03.set_bottombase("");
            this.Static03.set_rightbase("");
            this.Static03.set_widthbase("");
            this.Static03.set_heightbase("");
            this.Static02.set_leftbase("");
            this.Static02.set_topbase("");
            this.Static02.set_bottombase("");
            this.Static02.set_rightbase("");
            this.Static02.set_widthbase("");
            this.Static02.set_heightbase("");
            this.Static04.set_leftbase("");
            this.Static04.set_topbase("");
            this.Static04.set_bottombase("");
            this.Static04.set_rightbase("");
            this.Static04.set_widthbase("");
            this.Static04.set_heightbase("");
            this.Grid01.set_leftbase("");
            this.Grid01.set_topbase("");
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
            this.Button01.set_leftbase("");
            this.Button01.set_topbase("");
            this.Button01.set_bottombase("");
            this.Button01.set_rightbase("");
            this.Button01.set_widthbase("");
            this.Button01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1056,660,this,function(p){});
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

        this.loadIncludeScript("BM_Project_Tech.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
