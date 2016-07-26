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
                this.set_name("Pattern_01");
                this.set_classname("Work");
                this.set_titletext("SingleDetail");
                this._setFormPosition(0,0,800,369);
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
            obj._setContents("<ColumnInfo><ConstColumn id=\"PageIndex\" type=\"INT\" size=\"30\" value=\"1\"/><ConstColumn id=\"PageSize\" type=\"INT\" size=\"30\" value=\"5\"/><ConstColumn id=\"PageUnit\" type=\"INT\" size=\"30\" value=\"5\"/><Column id=\"searchCondition\" type=\"STRING\" size=\"100\"/><Column id=\"searchKeyword\" type=\"STRING\" size=\"100\"/></ColumnInfo><Rows><Row><Col id=\"searchKeyword\">홍길동</Col><Col id=\"searchCondition\"/></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_user", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"userId\" type=\"STRING\" size=\"256\"/><Column id=\"password\" type=\"STRING\" size=\"256\"/><Column id=\"userName\" type=\"STRING\" size=\"256\"/><Column id=\"enName\" type=\"STRING\" size=\"256\"/><Column id=\"email\" type=\"STRING\" size=\"256\"/><Column id=\"phone\" type=\"DATE\" size=\"256\"/><Column id=\"cellPhone\" type=\"STRING\" size=\"256\"/><Column id=\"zipCode\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_search", "absolute", "0", "0", null, "41", "0", null, this);
            obj.set_taborder("16");
            obj.set_scrollbars("none");
            obj.set_cssclass("div_WF_searchBg");
            this.addChild(obj.name, obj);
            obj = new Static("st_searchCondition", "absolute", "20", "0", "64", "41", null, null, this.div_search);
            obj.set_taborder("24");
            obj.set_text("사용자");
            obj.set_cssclass("sta_WF_schTitle");
            obj.getSetter("domainId").set("nexa.s_condition");
            this.div_search.addChild(obj.name, obj);
            obj = new Edit("edt_searchKeyword", "absolute", "9.52%", "10", null, "20", "57.89%", null, this.div_search);
            obj.set_taborder("29");
            obj.set_value("홍길동");
            this.div_search.addChild(obj.name, obj);
            obj = new Button("Button05", "absolute", null, "3", "58", "25", "4", null, this.div_search);
            obj.set_taborder("30");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_search.addChild(obj.name, obj);

            obj = new Div("div_grid_top", "absolute", "0", "31", null, "23", "0", null, this);
            obj.set_taborder("17");
            obj.set_scrollbars("none");
            this.addChild(obj.name, obj);
            obj = new Button("btn_add", "absolute", null, "0", "50", "23", "160", null, this.div_grid_top);
            obj.set_taborder("27");
            obj.set_text("추가");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.add");
            this.div_grid_top.addChild(obj.name, obj);
            obj = new Button("btn_delete", "absolute", null, "0", "50", "23", "107", null, this.div_grid_top);
            obj.set_taborder("28");
            obj.set_text("삭제");
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
            obj.set_text("리셋");
            obj.set_cssclass("btn_WF_CRUD");
            obj.getSetter("domainId").set("nexa.reset");
            this.div_grid_top.addChild(obj.name, obj);

            obj = new Div("divInput", "absolute", "0", "63", null, null, "0", "0", this);
            obj.set_taborder("18");
            obj.style.set_border("1 solid #808080ff");
            this.addChild(obj.name, obj);
            obj = new Static("stc_id", "absolute", "27", "14", "164", "30", null, null, this.divInput);
            obj.set_taborder("25");
            obj.set_text("ID");
            obj.style.set_background("lavender URL('img::ico_bullet.gif') left middle");
            obj.style.set_padding("1px 1px 1px 10");
            obj.style.set_font("9 Dotum");
            obj.getSetter("class").set("sub_title");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "52.58%", "59", null, "30", "27.02%", null, this.divInput);
            obj.set_taborder("26");
            obj.set_text("EngName");
            obj.style.set_background("lavender");
            obj.style.set_padding("0 0 0 10");
            obj.style.set_font("9 Dotum");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("Static07", "absolute", "3.18%", "145", null, "30", "76.29%", null, this.divInput);
            obj.set_taborder("32");
            obj.set_text("Phone");
            obj.style.set_background("lavender");
            obj.style.set_padding("0 0 0 10");
            obj.style.set_font("9 Dotum");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_id", "absolute", "201", "15", null, "34", "50%", null, this.divInput);
            obj.set_taborder("33");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edtEngName", "absolute", "74.51%", "56", null, "34", "0.78%", null, this.divInput);
            obj.set_taborder("41");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("stc_name", "absolute", "3.18%", "58", null, "30", "76.29%", null, this.divInput);
            obj.set_taborder("42");
            obj.set_text("FullName");
            obj.style.set_background("lavender URL('img::ico_bullet.gif') left middle");
            obj.style.set_padding("1px 1px 1px 10");
            obj.style.set_font("9 Dotum");
            obj.getSetter("class").set("sub_title");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_fullName", "absolute", "25.3%", "59", null, "34", "50.07%", null, this.divInput);
            obj.set_taborder("43");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("stc_password", "absolute", "51.5%", "16", "164", "30", null, null, this.divInput);
            obj.set_taborder("44");
            obj.set_text("PASSWORD");
            obj.style.set_background("lavender URL('img::ico_bullet.gif') left middle");
            obj.style.set_padding("1px 1px 1px 10");
            obj.style.set_font("9 Dotum");
            obj.getSetter("class").set("sub_title");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_password", "absolute", "74.56%", "15", null, "34", "6", null, this.divInput);
            obj.set_taborder("45");
            obj.set_password("true");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_phone", "absolute", "25.3%", "141", null, "34", "50.07%", null, this.divInput);
            obj.set_taborder("46");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "52.45%", "145", null, "30", "27.02%", null, this.divInput);
            obj.set_taborder("47");
            obj.set_text("CellPhone");
            obj.style.set_background("lavender");
            obj.style.set_padding("0 0 0 10");
            obj.style.set_font("9 Dotum");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_cellPhone", "absolute", "74.57%", "141", null, "34", "0.79%", null, this.divInput);
            obj.set_taborder("48");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "3.18%", "104", null, "30", "76.29%", null, this.divInput);
            obj.set_taborder("49");
            obj.set_text("Email");
            obj.style.set_background("lavender");
            obj.style.set_padding("0 0 0 10");
            obj.style.set_font("9 Dotum");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_email", "absolute", "25.3%", "100", null, "34", "0.79%", null, this.divInput);
            obj.set_taborder("50");
            this.divInput.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "3.18%", "184", null, "30", "76.29%", null, this.divInput);
            obj.set_taborder("51");
            obj.set_text("ZipCode");
            obj.style.set_background("lavender");
            obj.style.set_padding("0 0 0 10");
            obj.style.set_font("9 Dotum");
            this.divInput.addChild(obj.name, obj);
            obj = new Edit("edt_zipCode", "absolute", "25.3%", "180", null, "34", "50.07%", null, this.divInput);
            obj.set_taborder("52");
            this.divInput.addChild(obj.name, obj);

            obj = new Static("stc_detail", "absolute", "2.13%", "36", null, "20", "77%", null, this);
            obj.set_taborder("21");
            obj.set_text("상세정보");
            obj.set_cssclass("sta_WF_title");
            this.addChild(obj.name, obj);


            
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
            obj = new Layout("default", "", 0, 0, this.divInput,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("18");
            		p.style.set_border("1 solid #808080ff");

            	}
            );
            this.divInput.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 800, 369, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Work");
            		p.getSetter("inheritanceid").set("");
            		p.set_titletext("SingleDetail");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information
            obj = new BindItem("item18","div_search.edt_searchKeyword","value","ds_search","searchKeyword");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item0","divInput.edt_id","value","ds_user","userId");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item3","divInput.edtEngName","value","ds_user","enName");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item1","divInput.edt_fullName","value","ds_user","userName");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item2","divInput.edt_password","value","ds_user","password");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item4","divInput.edt_phone","value","ds_user","phone");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item5","divInput.edt_cellPhone","value","ds_user","cellPhone");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item6","divInput.edt_email","value","ds_user","email");
            this.addChild(obj.name, obj);
            obj.bind();
            obj = new BindItem("item7","divInput.edt_zipCode","value","ds_user","zipCode");
            this.addChild(obj.name, obj);
            obj.bind();

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Pattern_01.xfdl", "Lib::Comm.xjs");
        this.registerScript("Pattern_01.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : Pattern_01
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : SingleDetail
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
            //this.fn_search();
           
        } 

        
        /**
         * 조회처리
         * @return 
         * @example
         *
         * @memberOf Iject
         */
        this.fn_search = function(obj,e)
        {
          
           var searchCondition =  "NAME";
            var searchKeyword = this.div_search.edt_searchKeyword.value;       
            

        	this.ds_search.setColumn(0, "searchCondition", "NAME");
        	this.ds_search.setColumn(0, "searchKeyword", searchKeyword);
           
           var oDatas =  {
        			  svcid : "search",
        			  sController : "userSelectVO.do",			 
        			  inds :["ds_search=ds_search"],
        			  outds :[
        				 "ds_user=output1"
        			     ],			     
        			  args  : [				
        			  ],
        			  bAsync : true,    // 비동기여부 (true : async  false: sync)
        			  nDataType : 0,   // (0: XML타입, 1: 이진 타입, 2: SSV 타입)
        			  bCompress :false,	 //			  
        			}; 
        	 trace(" this.ds_search : " + this.ds_search.saveXML());
            //공통 transaction 함수 호츨   //function callback 
        	Iject.transaction(this,oDatas,function(){   
        		
        		//alert(" this.errorcode : " + this.errorcode);
        		
        		/*  
        		*   callback argument
        		*   @param : {string}    this.svcid      : 서비스 ID
        		*   @param : {object}    this.fobj       : 현재 form object
        		*   @param : {number}    this.errorcode  : 서비스 에러 코드
        		*   @param : {string}    this.errormsg   : 서비스 에러 메세지
        		*/   
        		if(this.errorcode < 0)
        		{
        		   Iject.alert(this.errorMsg);			
        		   return;
        		} 
        	      
        	       var pThis = this.fobj;   //form object	      
        	       trace(" ds_user : " + pThis.ds_user.saveXML());
        	});
        }

        

        //추가
        this.fn_add = function(obj,e)
        {
        	var nRow = this.ds_user.addRow();
        	this.div_search.edt_searchKeyword.set_value("");
        }

        //삭제
        this.fn_delete = function(obj,e)
        {
        	var nRow = this.ds_user.rowposition;
        	this.ds_user.deleteRow(nRow);
        	var rtnValue = Iject.confirm("삭제 하시겠습니까?");
        	
        	if(rtnValue)
        	{
        	
        		this.fn_save("delete");
        	}
        	else
        	{
        		this.fn_search();
        	}
        }

        //리셋
        this.fn_reset = function(obj,e)
        {
        	this.ds_user.reset();
        }

        
        //저장
        this.fn_save = function(strid)
        {
             
        	var oDatas =  {
        			  svcid : strid,
        			  sController : "userModifyVO.do",			 
        			  inds :["input1=ds_user:U"],
        			  outds :[
        				 "ds_user=output1"
        			     ],			     
        			  args  : [				
        			  ],
        			  bAsync : true,    // 비동기여부 (true : async  false: sync)
        			  nDataType : 0,   // (0: XML타입, 1: 이진 타입, 2: SSV 타입)
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
        	       
        	      switch(this.svcid)
        	      {
        	         case "save" : 
        				Iject.alert("저장완료");
        				break;
        				
        	         case "dlete" : 
        	            Iject.alert("삭제완료");
        				break; 
        	      }
        	      
        	      pThis.div_search.edt_searchKeyword.set_value(pThis.edt_fullName.value);
        		  pThis.fn_search();
        	});
        }

        
        /**********************************************************************
        * User Function
        ***********************************************************************/

        //저장버튼 클릭시 
        this.div_grid_top_btn_save_onclick = function(obj,e)
        {
        	this.fn_save("save");
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
            this.div_grid_top.btn_save.addEventHandler("onclick", this.div_grid_top_btn_save_onclick, this);
            this.div_grid_top.btn_reset.addEventHandler("onclick", this.fn_reset, this);
            this.divInput.edt_id.addEventHandler("oneditclick", this.divInput_edt_id_oneditclick, this);

        };

        this.loadIncludeScript("Pattern_01.xfdl");

       
    };
}
)();
