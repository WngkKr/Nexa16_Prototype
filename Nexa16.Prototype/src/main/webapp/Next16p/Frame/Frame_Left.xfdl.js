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
                obj.set_name("Frame_Left");
                obj.set_titletext("Frame_Left");
                obj.set_background("aliceblue");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,200,843);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMenu", this);
            obj._setContents("<ColumnInfo><Column id=\"MENU_CD\" type=\"STRING\" size=\"256\"/><Column id=\"UP_MENU_CD\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NM\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_LVL\" type=\"INT\" size=\"256\"/><Column id=\"PGM_ID\" type=\"STRING\" size=\"256\"/><Column id=\"PGM_PATH\" type=\"STRING\" size=\"256\"/><Column id=\"SYS_ID\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_CD\">a0000001</Col><Col id=\"UP_MENU_CD\">0</Col><Col id=\"MENU_NM\">영업관리</Col><Col id=\"MENU_LVL\">1</Col><Col id=\"PGM_ID\"/></Row><Row><Col id=\"MENU_CD\">a0000004</Col><Col id=\"UP_MENU_CD\">a0000001</Col><Col id=\"MENU_NM\">영업관리</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">Next::BM_Sales_Program.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000005</Col><Col id=\"UP_MENU_CD\">0</Col><Col id=\"MENU_NM\">영업지원</Col><Col id=\"MENU_LVL\">1</Col></Row><Row><Col id=\"MENU_CD\">a0000006</Col><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_NM\">지원일정관리</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">Base::BMSalesProgram.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000007</Col><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_NM\">인력요청</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">Base::TEST01.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000008</Col><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_NM\">지원인력요청승인</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">Base::TEST02.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_CD\">a0000009</Col><Col id=\"MENU_NM\">SI인력요청승인</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_CD\">a0000010</Col><Col id=\"MENU_NM\">교육인력요청승인</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_CD\">a0000011</Col><Col id=\"MENU_NM\">기술지원현황</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_CD\">a0000012</Col><Col id=\"MENU_NM\">라이센스발급현황</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_NM\">라이센스요청현황</Col><Col id=\"UP_MENU_CD\">a0000005</Col><Col id=\"MENU_CD\">a0000013</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000014</Col><Col id=\"UP_MENU_CD\">0</Col><Col id=\"MENU_NM\">인력관리</Col><Col id=\"MENU_LVL\">1</Col></Row><Row><Col id=\"MENU_CD\">a0000015</Col><Col id=\"UP_MENU_CD\">a0000014</Col><Col id=\"MENU_NM\">인력정보등록</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000016</Col><Col id=\"UP_MENU_CD\">a0000014</Col><Col id=\"MENU_NM\">인력투입관리</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000017</Col><Col id=\"UP_MENU_CD\">a0000014</Col><Col id=\"MENU_NM\">인력투입현황</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000018</Col><Col id=\"UP_MENU_CD\">0</Col><Col id=\"MENU_NM\">경영관리</Col><Col id=\"MENU_LVL\">1</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000018</Col><Col id=\"MENU_CD\">a0000019</Col><Col id=\"MENU_NM\">직원검색</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000018</Col><Col id=\"MENU_CD\">a0000020</Col><Col id=\"MENU_NM\">협력사직원검색</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"MENU_CD\">a0000021</Col><Col id=\"UP_MENU_CD\">0</Col><Col id=\"MENU_NM\">프로젝트관리</Col><Col id=\"MENU_LVL\">1</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000021</Col><Col id=\"MENU_CD\">a0000022</Col><Col id=\"MENU_NM\">프로젝트관리</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000021</Col><Col id=\"MENU_CD\">a0000023</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"MENU_NM\">프로젝트진행현황</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000021</Col><Col id=\"MENU_CD\">a0000024</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"MENU_NM\">프로젝트일정</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row><Row><Col id=\"UP_MENU_CD\">a0000021</Col><Col id=\"MENU_CD\">a0000025</Col><Col id=\"MENU_LVL\">2</Col><Col id=\"PGM_ID\">Acce</Col><Col id=\"MENU_NM\">프로젝트현황</Col><Col id=\"PGM_PATH\">BM_PROJECT::BM_Project.xfdl</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","absolute","5","120","91","46",null,null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Menu");
            });
            this.addChild(obj.name, obj);

            obj = new Button("Button01","absolute",null,"120","91","46","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("My Menu");
            });
            this.addChild(obj.name, obj);

            obj = new Grid("grdMenu","absolute","5","171",null,null,"5","5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
                obj.set_binddataset("dsMenu");
                obj.set_treeinitstatus("expand,all");
                obj.set_treeusecheckbox("false");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"188\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell text=\"bind:MENU_NM\" treelevel=\"bind:MENU_LVL\" displaytype=\"tree\" textAlign=\"left\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","5","5",null,"105","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
            });
            this.addChild(obj.name, obj);
            
            // Positionbase Setting
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
            this.grdMenu.set_leftbase("");
            this.grdMenu.set_topbase("");
            this.grdMenu.set_bottombase("");
            this.grdMenu.set_rightbase("");
            this.grdMenu.set_widthbase("");
            this.grdMenu.set_heightbase("");
            this.TextArea00.set_leftbase("");
            this.TextArea00.set_topbase("");
            this.TextArea00.set_bottombase("");
            this.TextArea00.set_rightbase("");
            this.TextArea00.set_widthbase("");
            this.TextArea00.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",200,843,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Frame_Left.xfdl", function() {
        /******************************************************************************************
        전역변수선언
        ******************************************************************************************/
        var objApp = nexacro.getApplication(); //application
        /******************************************************************************************
        Form Onload
        ******************************************************************************************/
        this.Form_onload = function(obj,e)
        {
        	this.TextArea00.set_value("가로 : " + this.width + " 세로 : " + this.height);
        	this.grdMenu.set_treeinitstatus( "expand,all");
        };
        /******************************************************************************************
        menu Grid Click Event
        ******************************************************************************************/
        this.grdMenu_oncellclick = function(obj,e)
        {
        	var nRow = e.row;
        	trace("nRow : " +nRow);
        	var sID = this.dsMenu.getColumn(nRow,2);
        	var sURL = this.dsMenu.getColumn(nRow,5);
        	var sPgmId = this.dsMenu.getColumn(nRow,4);
        	trace("sID : " +sID + " sURL : " +sURL + " sPgmId : " +sPgmId);
        	if( sPgmId == null || sPgmId == "" || sPgmId == undefined )
        	{
        		return;
        	}
        	else
        	{
        		objApp.gfn_openForm(sID, sURL);
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.grdMenu.addEventHandler("oncellclick",this.grdMenu_oncellclick,this);
        };

        this.loadIncludeScript("Frame_Left.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
