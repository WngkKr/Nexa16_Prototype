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
                this.set_name("Pattern_07p");
                this.set_classname("Test035_pop");
                this.set_cssclass("from_POP");
                this.set_titletext("팝업대상/파라미터 반환 샘플 팝업");
                this._setFormPosition(0,0,800,400);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_1", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">1</Col><Col id=\"Column1\">aaa</Col></Row><Row><Col id=\"Column0\">2</Col><Col id=\"Column1\">bbb</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("ds_2", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">111</Col><Col id=\"Column1\">222</Col><Col id=\"Column2\">333</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "22", "118", "148", "29", null, null, this);
            obj.set_taborder("0");
            obj.set_text("문자열 반환");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "17", "152", "183", "29", null, null, this);
            obj.set_taborder("1");
            obj.set_text("Array 반환(문자열)");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "261", "142", "492", "29", null, null, this);
            obj.set_taborder("2");
            obj.set_text("Array 반환(문자열 && 데이타셋)");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00", "absolute", "261", "214", "241", "82", null, null, this);
            obj.set_taborder("3");
            obj.set_binddataset("ds_1");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"Column0\"/><Cell col=\"1\" text=\"Column1\"/></Band><Band id=\"body\"><Cell edittype=\"normal\" text=\"bind:Column0\"/><Cell col=\"1\" edittype=\"normal\" text=\"bind:Column1\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "512", "214", "241", "82", null, null, this);
            obj.set_taborder("4");
            obj.set_binddataset("ds_2");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row band=\"body\" size=\"24\"/></Rows><Band id=\"head\"><Cell col=\"0\" disptype=\"normal\" text=\"Column0\"/><Cell col=\"1\" disptype=\"normal\" text=\"Column1\"/><Cell col=\"2\" disptype=\"normal\" text=\"Column2\"/></Band><Band id=\"body\"><Cell col=\"0\" disptype=\"normal\" text=\"bind:Column0\"/><Cell col=\"1\" disptype=\"normal\" text=\"bind:Column1\"/><Cell col=\"2\" disptype=\"normal\" text=\"bind:Column2\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "427", "300", "77", "24", null, null, this);
            obj.set_taborder("5");
            obj.set_text("행 삭제");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "261", "177", "492", "29", null, null, this);
            obj.set_taborder("7");
            obj.set_text("Json 반환(문자열 && 데이타셋)");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "264", "96", "485", "38", null, null, this);
            obj.set_taborder("8");
            obj.set_text("데이타셋");
            this.addChild(obj.name, obj);

            obj = new Div("div_search", "absolute", "0", "0", null, "41", "0", null, this);
            obj.set_taborder("9");
            obj.set_scrollbars("none");
            obj.set_cssclass("div_WF_searchBg");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "11", "10", "341", "23", null, null, this);
            obj.set_taborder("10");
            obj.set_text("호출한 부모장으로 파라미터 전달 샘플2");
            obj.style.set_color("red");
            obj.style.set_font("bold 12 arial");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 41, this.div_search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("9");
            		p.set_scrollbars("none");
            		p.set_cssclass("div_WF_searchBg");

            	}
            );
            this.div_search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 800, 400, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Test035_pop");
            		p.set_cssclass("from_POP");
            		p.set_titletext("팝업대상/파라미터 반환 샘플 팝업");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Pattern_07p.xfdl", "Lib::Comm.xjs");
        this.registerScript("Pattern_07p.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : HGR Industrial Surplus
        * BUSINESS    : system
        * FILE NAME   : 
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : 
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
        this.ParserStr = "^&^";

        
        /***********************************************************************************
        * Form Event
        ***********************************************************************************/
        this.form_onload = function (obj,e)
        {
            Iject.formOnload(obj);
          
             //넘어온 아규먼트 받는 방법 1 
            trace(" poup argument1 : "  + Iject.getPopArgu(this,"arg1"));  
            trace(" poup argument2 : "  + Iject.getPopArgu(this,"arg2"));   
            
              //넘어온 아규먼트 받는 방법2 
           var oArgs =  JSON.stringify(Iject.getPopArgu(this,['arg1','arg2']));
           var arg1 =   JSON.parse(oArgs).arg1;
            var arg2 =  JSON.parse(oArgs).arg2;
            trace(" arg1 : "  + arg1 + " <> arg2 : " + arg2);
            
        }

        // 값 반환
        this.Button00_onclick = function(obj,e)
        {
           
        	Iject.popClose(this,"testValue====>>>>>");
        	//this.gfn_popupClose("testValue");
        }

        // Array 반환(값 반환)
        this.Button01_onclick = function(obj,e)
        {
        	//var rtnArr = [1,2,3];	// 안됨
        	
        	var arr = ["testvalue1", "testvalue2", "testvalue3"];
        	//var rtnArr = arr.join(this.ParserStr); 
        	
        	Iject.popClose(this,arr);
        	//this.close(rtnArr);
        }

        // Array 반환(n개의 데이타셋 반환)
        this.Button02_onclick = function(obj,e)
        {
        	var obj = ["testvalue", this.ds_1.saveXML("ds_1", "a"), this.ds_2.saveXML()];
        	//var arr = ["testvalue", this.ds_1, this.ds_2];
        	//var rtnArr = arr.join(this.ParserStr);
        	
        	Iject.popClose(this,obj);
        	//this.close(rtnArr);
        }

        // Object Json 반환(n개의 데이타셋 반환)
        this.Button04_onclick = function(obj,e)
        {
        	//var objJson = {"key1":"testvalue", "key2":encodeURI(this.ds_1.saveXML("ds_1", "a")), "key3":encodeURI(this.ds_2.saveXML())};
        	
        	var objJson = new Object();
        	objJson.key1 = "testvalue";
        	objJson.key2 = encodeURI(this.ds_1.saveXML("ds_1", "a"));
        	objJson.key3 = encodeURI(this.ds_2.saveXML());
            
        	//var rtnObj = this.gf_JSONToString(objJson);
        	Iject.popClose(this,objJson);
        	
        	//this.close(rtnObj);
        }

        this.Button03_onclick = function(obj,e)
        {
        	this.ds_1.deleteRow(this.ds_1.rowposition);
        }

        
        /******************************************************************************
         * Function name: gf_JSONToString
         * Description	: JSON Object를 JSON String으로 변환하여 리턴한다.
         * Parameter 	: JSON Object
         * Return		: JSON String
         ******************************************************************************/
        this.gf_JSONToString = function(object)
        {
            var isArray = (object.join && object.pop && object.push
                            && object.reverse && object.shift && object.slice && object.splice);
            var results = [];
         
            for (var i in object) {
                var value = object[i];
                 
        		results.push((isArray ? "" : "\"" + i.toString() + "\" : ") 
        						+ (typeof value == "string" ? "\"" + value + "\"" : value));
            }
             
            return (isArray ? "[" : "{") + results.join(", ") + (isArray ? "]" : "}");
        }

        /******************************************************************************
         * Function name: gf_StringToJSON
         * Description	: JSON String을 JSON Object으로 변환하여 리턴한다.
         * Parameter 	: JSON String
         * Return		: JSON Object
         ******************************************************************************/
        this.gf_StringToJSON = function(strJson)
        {
            return eval("(" + strJson + ")");
        }
        // 
        // this.fn_popupClose = function(val)
        // {
        // 
        //     trace("val ==>"+val);
        //     trace("type ==>"+typeof(val));
        //     var rtnVal;
        //     
        //     
        //     if(typeof(val) == "object")
        //     {
        //     
        //         var sStringVal = val.toString();
        //                 
        //         switch(sStringVal)
        //         {
        //             case "[object Object]" :
        //                 trace("object type");
        //             break;
        //             
        //             case "[object Dataset]" :
        //                 rtnVal = val.saveXML();
        //             break;
        //             
        //             default :
        //                 
        //                 rtnVal = val.join(this.ParserStr);
        //             break;
        //         
        //         }
        //     }
        //     else
        //     {
        //         rtnVal = val;
        //     }
        //     
        //     trace("rtnVal ==>"+rtnVal);
        //    // this.close(rtnVal);
        // 
        // }

        // this.fn_getArrayToDatasetParse = function(val)
        // {
        //     var sStringVal;
        //     
        //    for(var i=0; i<val.length; i++)
        //    {
        //        sStringVal = val[i].toString();
        //        
        //    }
        // }
        this.Button05_onclick = function(obj,e)
        {
        	
        	Iject.popClose(this,this.ds_1.saveXML());
        	
        }

        
        this.btn_close_onclick = function(obj,e)
        {
        	
        	var arr = ["testvalue", this.ds_1.saveXML("ds_1", "a"), this.ds_2.saveXML()];
        	Iject.popClose(this,arr);
        	
        }

        this.Button06_onclick = function(obj,e)
        {
        	this.close("aa");
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);

        };

        this.loadIncludeScript("Pattern_07p.xfdl");

       
    };
}
)();
