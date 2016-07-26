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
                this.set_name("Pattern_02");
                this.set_classname("Work");
                this.set_titletext("MultiDetail");
                this._setFormPosition(0,0,800,400);
            }
            this.getSetter("inheritanceid").set("");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"searchCondition\" type=\"STRING\" size=\"100\"/><Column id=\"searchKeyword\" type=\"STRING\" size=\"100\"/></ColumnInfo><Rows><Row><Col id=\"searchKeyword\"/><Col id=\"searchCondition\"/></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_list", this);
            obj.set_firefirstcount("1000");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"regId\" type=\"STRING\" size=\"256\"/><Column id=\"postId\" type=\"STRING\" size=\"256\"/><Column id=\"contents\" type=\"STRING\" size=\"256\"/><Column id=\"communityId\" type=\"STRING\" size=\"256\"/><Column id=\"regDate\" type=\"DATE\" size=\"256\"/><Column id=\"hitCount\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Grid("grd_list", "absolute", "0", "89", null, null, "0", "0", this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_list");
            obj.set_cellsizingtype("col");
            obj.set_nodatatext("데이타를 찾을 수 없습니다.");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"164\"/><Column size=\"250\"/><Column size=\"250\"/><Column size=\"69\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell style=\"background:#348ddf18;color:#1f5ca7ff;color2:#1f5ca7ff;\" text=\"PostID\"/><Cell col=\"1\" style=\"background:#348ddf18;color:#1f5ca7ff;color2:#1f5ca7ff;backgroundimage: ;\" text=\"Title\"/><Cell col=\"2\" style=\"background:#348ddf18;color:#1f5ca7ff;color2:#1f5ca7ff;\" text=\"Contents\"/><Cell col=\"3\" style=\"background:#348ddf18;color:#1f5ca7ff;color2:#1f5ca7ff;\" text=\"Count\"/></Band><Band id=\"body\"><Cell celltype=\"body\" edittype=\"none\" style=\"cursor: ;\" text=\"bind:postId\"/><Cell col=\"1\" celltype=\"none\" edittype=\"normal\" style=\"align:left;font:underline 10 arial;cursor:hand;\" text=\"bind:title\" maskchar=\" \" suppress=\"0\"/><Cell col=\"2\" celltype=\"none\" edittype=\"normal\" text=\"bind:contents\"/><Cell col=\"3\" edittype=\"normal\" text=\"bind:hitCount\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Div("div_search", "absolute", "0", "0", null, "41", "0", null, this);
            obj.set_taborder("16");
            obj.set_scrollbars("none");
            obj.set_cssclass("div_WF_searchBg");
            this.addChild(obj.name, obj);
            obj = new Static("st_searchCondition", "absolute", "20", "0", "64", "41", null, null, this.div_search);
            obj.set_taborder("24");
            obj.set_text("검색조건");
            obj.set_cssclass("sta_WF_schTitle");
            obj.getSetter("domainId").set("nexa.s_condition");
            this.div_search.addChild(obj.name, obj);
            obj = new Combo("cmb_searchCondition", "absolute", "86", "10", "140", "20", null, null, this.div_search);
            this.div_search.addChild(obj.name, obj);
            var cmb_searchCondition_innerdataset = new Dataset("cmb_searchCondition_innerdataset", this.div_search.cmb_searchCondition);
            cmb_searchCondition_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">TITLE</Col><Col id=\"datacolumn\">제목</Col></Row><Row><Col id=\"codecolumn\">CONTENTS</Col><Col id=\"datacolumn\">내용</Col></Row></Rows>");
            obj.set_innerdataset(cmb_searchCondition_innerdataset);
            obj.set_taborder("28");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.getSetter("domainId").set("nexa.name;nexa.code");
            obj = new Edit("edt_searchKeyword", "absolute", "227", "10", "261", "20", null, null, this.div_search);
            obj.set_taborder("29");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button05", "absolute", null, "3", "58", "25", "4", null, this.div_search);
            obj.set_taborder("30");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_search.addChild(obj.name, obj);

            obj = new Div("div_grid_top", "absolute", "0", "63", null, "23", "0", null, this);
            obj.set_taborder("17");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Static("sta_title", "absolute", "33", "0", "120", null, null, "0", this.div_grid_top);
            obj.set_taborder("25");
            obj.set_text("Records Found");
            obj.set_cssclass("sta_WF_GridFound2");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Static("sta_total_cnt", "absolute", "8", "0", "20", null, null, "0", this.div_grid_top);
            obj.set_taborder("26");
            obj.set_text("0");
            obj.set_cssclass("sta_WF_GridFound");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Button("btn_add", "absolute", null, "0", "50", "23", "160", null, this.div_grid_top);
            obj.set_taborder("27");
            obj.set_text("행추가");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.add");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Button("btn_delete", "absolute", null, "0", "50", "23", "107", null, this.div_grid_top);
            obj.set_taborder("28");
            obj.set_text("행삭제");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.delete");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Button("btn_save", "absolute", null, "0", "50", "23", "1", null, this.div_grid_top);
            obj.set_taborder("29");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.save");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Button("btn_reset", "absolute", null, "0", "50", "23", "54", null, this.div_grid_top);
            obj.set_taborder("30");
            obj.set_text("취소");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.reset");
            this.div_grid_top.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 41, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("16");
            		p.set_scrollbars("none");
            		p.set_cssclass("div_WF_searchBg");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 23, this.div_grid_top,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("17");
            		p.set_scrollbars("none");

            	}
            );
            this.div_grid_top.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 800, 400, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Work");
            		p.getSetter("inheritanceid").set("");
            		p.set_titletext("MultiDetail");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item0","div_search.cmb_searchCondition","value","ds_search","searchCondition");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","div_search.edt_searchKeyword","value","ds_search","searchKeyword");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Pattern_02.xfdl", "Lib::Comm.xjs");
        this.registerScript("Pattern_02.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : Pattern_02
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : MultiDetail
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
        this.form_onload = function(obj,e)
        {
        	//기본 공통  함수 초기화
        	Iject.formOnload(obj);
            this.fn_search();
        } 
         

         /**
         * 조회 버튼 클릭시 발생되는 event
         * @param {string} sController :  요청서비스명
         * @param {array}  inds :  inputdatasets
         * @param {array}  outds : outDatasets
         * @param {array} argument 명
         * @param {boolen} bAsync :   비동기여부 (true : async  false: sync)
         * @param {number} nDatatype :  (0: XML타입, 1: 이진 타입, 2: SSV 타입)	    *
         * @param {boolen} bCompress :  통신시 PostData를 압축할지 여부를 지정합니다.(default: false)
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_search = function(obj,e)
        {
        	  // 조회조건(Condition)
        	this.ds_search.setColumn(0, "searchCondition", this.div_search.cmb_searchCondition.value);
        	this.ds_search.setColumn(0, "searchKeyword", this.div_search.edt_searchKeyword.value);
           
           var oDatas =  {
        			  svcid : "search",
        			  sController : "sampleSelectVO.do",			 
        			  inds :["ds_search=ds_search"],
        			  outds :[
        				 "ds_list=output1"
        			     ],			     
        			  args  : [				
        			  ],
        			  bAsync : true,    // 비동기여부 (true : async  false: sync)
        			  nDataType : 2,   // (0: XML타입, 1: 이진 타입, 2: SSV 타입)
        			  bCompress :false,	 //			  
        			}; 
        	
            //공통 transaction 함수 호츨   //function callback 
        	Iject.transaction(this,oDatas,function(){   
        		/*  
        		*   callback argument
        		*   @param : {string}    this.svcid       서비스 ID
        		*   @param : {object}    this.fobj        : 현재 form object
        		*   @param : {number}    this.errorcode  : 서비스 에러 코드
        		*   @param : {string}    this.errormsg   : 서비스 에러 메세지
        		*/    
        		if(this.errorcode < 0)
        		{
        		   Iject.alert(this.errorMsg,"알림");			
        		   return;
        		}		
        	      
        	       var pThis = this.fobj;   //form object
        	       	   pThis.fn_search_post();  //조회후 처리 
        	    
        	});
        }

        /**
         * 행추가
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_add = function(obj,e)
        {
        	var nRow = this.ds_list.addRow();
        }

         /**
         * 행삭제
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_delete = function(obj,e)
        {
        	var nRow = this.ds_list.rowposition;
        	this.ds_list.deleteRow(nRow);
        }

        
        /**
        * 취소(리셋)
        * @return 
        * @example
        *
        * @memberOf this
        */
        this.fn_reset = function(obj,e)
        {
        	this.ds_list.reset();
        }

         /**
         * 저장 버튼 클릭시 발생되는 event
         * @param {string} sController :  요청서비스명
         * @param {array}  inds :  inputdatasets
         * @param {array}  outds : outDatasets
         * @param {array} argument 명
         * @param {boolen} bAsync :   비동기여부 (true : async  false: sync)
         * @param {number} nDatatype :  (0: XML타입, 1: 이진 타입, 2: SSV 타입)	    *
         * @param {boolen} bCompress :  통신시 PostData를 압축할지 여부를 지정합니다.(default: false)
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_save = function(obj,e)
        {
        	 var oDatas =  {
        			  svcid : "save",
        			  sController : "sampleModifyVO.do",			 
        			  inds :["input1=ds_list:U"],
        			  outds :[
        			     ],			     
        			  args  : [				
        			  ],
        			  bAsync : true,    // 비동기여부 (true : async  false: sync)
        			  nDataType : 2,   // (0: XML타입, 1: 이진 타입, 2: SSV 타입)
        			  bCompress :false,	 //			  
        			}; 
        	
            //공통 transaction 함수 호츨   //function callback 
        	Iject.transaction(this,oDatas,function(){   
        		/*  
        		*   callback argument
        		*   @param : {string}    this.svcid       서비스 ID
        		*   @param : {object}    this.obj        : 현재 form object
        		*   @param : {number}    this.errorcode  : 서비스 에러 코드
        		*   @param : {string}    this.errormsg   : 서비스 에러 메세지
        		*/    
        		if(this.errorcode < 0)
        		{
        		   Iject.alert(this.errorMsg,"알림");			
        		   return;
        		}
        	       var pThis = this.obj;   //form object	
        	           pThis.fn_search();
        	    
        	});
        }

        
        /**
         * 조회 후처리
         * @return 
         * @example
         *
         * @memberOf this
        */
        this.fn_search_post = function()
        {
        	//페이징 없는 경우
        	var nTotalCnt = this.ds_list.rowcount;
            var nCnt = this.ds_list.rowcount;
        	this.div_grid_top.sta_total_cnt.set_text(nTotalCnt);
        }

        
        //검색  Enter키
        this.div_search_btn_search_onclick = function(obj,e)
        {
        	if ( e.keycode == 13 )
        	{
        		this.fn_search();
        	}
        }

        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.div_search.edt_searchKeyword.addEventHandler("onkeyup", this.div_search_btn_search_onclick, this);
            this.div_search.Button05.addEventHandler("onclick", this.fn_search, this);
            this.div_grid_top.btn_add.addEventHandler("onclick", this.fn_add, this);
            this.div_grid_top.btn_delete.addEventHandler("onclick", this.fn_delete, this);
            this.div_grid_top.btn_save.addEventHandler("onclick", this.fn_save, this);
            this.div_grid_top.btn_reset.addEventHandler("onclick", this.fn_reset, this);

        };

        this.loadIncludeScript("Pattern_02.xfdl");

       
    };
}
)();
