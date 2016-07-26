(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("LeftFrame");
                this.set_classname("LeftFrame");
                this._setFormPosition(0,0,230,958);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Tree_MyMenu", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"txt\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"txt\">My Menu01</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu02</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu03</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu04</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu05</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu06</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu07</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu08</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu09</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu10</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu11</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu12</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">My Menu13</Col><Col id=\"lev\"/></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Tree_RecentMenu", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"txt\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"txt\">Recent Menu01</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu02</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu03</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu04</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu05</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu06</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu07</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu08</Col><Col id=\"lev\"/></Row><Row><Col id=\"txt\">Recent Menu09</Col><Col id=\"lev\"/></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_menu", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"MENU_NAME\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_SEQ\" type=\"int\" size=\"4\" prop=\"\"/><Column id=\"MENU_OPTP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"PAGE_URL\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_TOP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_ID\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_GRP\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"CREATE_DT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_LEVEL\" type=\"int\" size=\"4\" prop=\"\"/><Column id=\"PAGE_ID\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"PAGE_NAME\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_ARGS\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_STAT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"CREATE_USER\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"UPDATE_DT\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"UPDATE_USER\" type=\"string\" size=\"32\" prop=\"\"/><Column id=\"MENU_DESC\" type=\"string\" size=\"32\" prop=\"\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_left", "absolute", "0", "0", "230", null, null, "0", this);
            obj.set_taborder("2");
            obj.set_text("Div00");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Grid("grd_tree", "absolute", "-1", "248", "231", null, null, "0", this.div_left);
            obj.set_cssclass("grd_LF_Tree");
            obj.set_taborder("0");
            obj.set_binddataset("ds_menu");
            obj.set_scrollbars("autovert");
            obj.set_treeuseline("false");
            obj.set_treeusecheckbox("false");
            obj.set_autofittype("col");
            obj.set_treeinitstatus("expand,null");
            obj.style.set_background("transparent");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"230\"/></Columns><Rows><Row size=\"37\"/></Rows><Band id=\"body\"><Cell displaytype=\"tree\" edittype=\"tree\" style=\"padding:EXPR(lev=='1'?&quot;0 0 0 -5&quot;:&quot;&quot;);background:EXPR(lev=='1'?&quot;URL('img::grd_LF_TreeBg2.png') stretch 15,15&quot;:&quot;&quot;);background2:EXPR(lev=='1'?&quot;URL('img::grd_LF_TreeBg2.png') stretch 15,15&quot;:&quot;&quot;);color:EXPR(lev=='1'?&quot;#8192aaff&quot;:&quot;&quot;);color2:EXPR(lev=='1'?&quot;#8192aaff&quot;:&quot;&quot;);font:EXPR(lev=='1'?&quot;9 Gulim&quot;:&quot;&quot;);selectbackground:EXPR(lev=='1'?&quot;URL('img::grd_LF_TreeBg_O.png') stretch 15,15&quot;:&quot;&quot;);selectfont:EXPR(lev=='1'?&quot;9 Gulim&quot;:&quot;&quot;);\" text=\"bind:MENU_NAME\" treestartlevel=\"1\" treelevel=\"bind:MENU_LEVEL\"/></Band></Format></Formats>");
            this.div_left.addChild(obj.name, obj);
            obj = new Static("st_nexa", "absolute", "0", "0", "230", "173", null, null, this.div_left);
            obj.set_taborder("1");
            obj.set_cssclass("sta_LF_Logo");
            this.div_left.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "0", "173", "115", "36", null, null, this.div_left);
            obj.set_taborder("2");
            obj.set_cssclass("btn_LF_Menu_S");
            obj.set_text("Menu");
            this.div_left.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "115", "173", "115", "36", null, null, this.div_left);
            obj.set_taborder("3");
            obj.set_cssclass("btn_LF_Menu");
            obj.set_text("My Menu");
            this.div_left.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "0", "209", "230", "40", null, null, this.div_left);
            obj.set_taborder("4");
            obj.set_cssclass("sta_LF_SearchBg");
            this.div_left.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "6", "216", "218", "26", null, null, this.div_left);
            obj.set_taborder("5");
            obj.set_cssclass("edt_LF_Search");
            this.div_left.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "195", "216", "29", "25", null, null, this.div_left);
            obj.set_taborder("6");
            obj.set_cssclass("btn_LF_Search");
            this.div_left.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "21", null, "230", "51", null, "-130", this);
            obj.set_taborder("3");
            obj.set_cssclass("btn_LF_RecentMenuOpen");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "399", "173", "230", "746", null, null, this);
            obj.set_taborder("10");
            obj.set_text("Div01");
            obj.set_visible("false");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid02", "absolute", "0", "75", "230", "671", null, null, this.Div01);
            obj.set_cssclass("grd_LF_TreeMy");
            obj.set_taborder("5");
            obj.set_binddataset("Tree_MyMenu");
            obj.set_scrollbars("none");
            obj.set_treeuseline("false");
            obj.set_treeusecheckbox("false");
            obj.set_visible("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"230\"/></Columns><Rows><Row size=\"37\"/></Rows><Band id=\"body\"><Cell displaytype=\"tree\" edittype=\"tree\" style=\"background:EXPR(lev=='0'?&quot;URL('img::grd_LF_TreeBg.png') stretch 20,20&quot;:&quot;&quot;);background2:EXPR(lev=='0'?&quot;URL('img::grd_LF_TreeBg.png') stretch 20,20&quot;:&quot;&quot;);selectbackground:EXPR(lev=='0'?&quot;URL('img::grd_LF_TreeBg_O.png') stretch 20,20&quot;:&quot;&quot;);selectfont:EXPR(lev=='0'?&quot;bold 9 Gulim&quot;:&quot;&quot;);controlfont:EXPR(lev=='0'?&quot;bold 9 Gulim&quot;:&quot;&quot;);\" text=\"bind:txt\" treelevel=\"bind:lev\"/></Band></Format></Formats>");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "0", "36", "230", "40", null, null, this.Div01);
            obj.set_taborder("4");
            obj.set_cssclass("sta_LF_SearchBg");
            obj.set_visible("false");
            this.Div01.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "0", "0", "115", "36", null, null, this.Div01);
            obj.set_taborder("0");
            obj.set_cssclass("btn_LF_Menu");
            obj.set_visible("false");
            obj.set_text("Menu");
            this.Div01.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "115", "0", "115", "36", null, null, this.Div01);
            obj.set_taborder("1");
            obj.set_cssclass("btn_LF_Menu_S");
            obj.set_visible("false");
            obj.set_text("My Menu");
            this.Div01.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "6", "43", "218", "26", null, null, this.Div01);
            obj.set_taborder("3");
            obj.set_cssclass("edt_LF_Search");
            obj.set_visible("false");
            this.Div01.addChild(obj.name, obj);
            obj = new Button("Button03", "absolute", "195", "43", "29", "25", null, null, this.Div01);
            obj.set_taborder("2");
            obj.set_cssclass("btn_LF_Search");
            obj.set_visible("false");
            this.Div01.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00", "absolute", "771", "564", "230", "394", null, null, this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            this.addChild(obj.name, obj);
            obj = new Grid("Grid02", "absolute", "0", "50", "230", null, null, "0", this.PopupDiv00);
            obj.set_cssclass("grd_LF_TreeRecentMenu");
            obj.set_taborder("1");
            obj.set_binddataset("Tree_RecentMenu");
            obj.set_scrollbars("none");
            obj.set_treeuseline("false");
            obj.set_treeusecheckbox("false");
            obj.set_visible("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"230\"/></Columns><Rows><Row size=\"37\"/></Rows><Band id=\"body\"><Cell displaytype=\"tree\" edittype=\"tree\" style=\"controlfont: ;\" text=\"bind:txt\" treelevel=\"bind:lev\"/></Band></Format></Formats>");
            this.PopupDiv00.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "0", "0", "230", "51", null, null, this.PopupDiv00);
            obj.set_taborder("0");
            obj.set_cssclass("btn_LF_RecentMenuClose");
            obj.set_visible("false");
            this.PopupDiv00.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "244", "165", "156", "55", null, null, this);
            obj.set_taborder("14");
            obj.set_text("* MyMenu활성화 시\r\n-----------------------> \r\n");
            obj.style.set_color("red");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "240", "915", "517", "55", null, null, this);
            obj.set_taborder("15");
            obj.set_text("* RecentMenu활성화 시\r\n------------------------------------------------------------------------------------> \r\n");
            obj.style.set_color("red");
            obj.set_visible("false");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 230, 0, this.div_left,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("2");
            		p.set_text("Div00");
            		p.set_scrollbars("none");

            	}
            );
            this.div_left.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 230, 746, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("10");
            		p.set_text("Div01");
            		p.set_visible("false");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 230, 394, this.PopupDiv00,
            	//-- Layout function
            	function(p) {
            		p.set_text("PopupDiv00");
            		p.set_visible("false");

            	}
            );
            this.PopupDiv00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 230, 958, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("LeftFrame");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("LeftFrame.xfdl", "Lib::Comm.xjs");
        this.registerScript("LeftFrame.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : LeftFrame.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : 좌측 트리메뉴
        *------------------------------------------------------------------
        * MODIFY DATE   PROGRAMMER			DESCRIPTION
        *------------------------------------------------------------------
        * 
        *------------------------------------------------------------------
        ***********************************************************************************/

        /***********************************************************************************
        * Common Library
        ***********************************************************************************/
        //include "Lib::Comm.xjs";

        
        /***********************************************************************************
        * Global/Local Variable
        ***********************************************************************************/

        
        /***********************************************************************************
        * Form Event
        ***********************************************************************************/
        /**
         * form onload 함수
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_onload = function(obj,e)
        {
          // LeftFrame 로딩여부 체크
          //임시
            this.ds_menu.assign(application.gds_menu);
        }

        
        /**
         * left menu click 시  발생되는 event
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_treeClick = function(obj,e)
        {
            /*
            *@param {object} this Form
            *@param {object} 생성할 dataset명
            */
            var oObj = {
                  ds    : this.ds_menu,   // 메뉴 dataset 
                  nRow  : e.row,          // 선택된 
                  oArgs : []              //넘길 argument
            };
            
            Iject.Mdi.call(this,oObj);

        }

        
        /**
         * home key 실행시 발생되는 event
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_main = function(obj,e)
        {
        	Iject.$["mdiFrame"].form.fn_ArrangeWin("closeAll");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.fn_onload, this);
            this.div_left.grd_tree.addEventHandler("oncellclick", this.fn_treeClick, this);
            this.div_left.st_nexa.addEventHandler("onclick", this.fn_main, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);

        };

        this.loadIncludeScript("LeftFrame.xfdl");

       
    };
}
)();
