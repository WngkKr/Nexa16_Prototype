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
                this.set_name("test001");
                this.set_classname("test001");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1024,768);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsList", this);
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">1</Col><Col id=\"Column1\">2</Col><Col id=\"Column2\">3</Col><Col id=\"Column3\">4</Col><Col id=\"Column4\">5</Col></Row><Row><Col id=\"Column4\">6</Col><Col id=\"Column0\">3</Col><Col id=\"Column1\">3</Col><Col id=\"Column2\">2</Col><Col id=\"Column3\">2</Col></Row><Row><Col id=\"Column3\">3</Col><Col id=\"Column2\">4</Col><Col id=\"Column1\">5</Col><Col id=\"Column0\">6</Col><Col id=\"Column4\">2</Col></Row><Row><Col id=\"Column0\">7</Col><Col id=\"Column2\">8</Col><Col id=\"Column1\">8</Col><Col id=\"Column3\">2</Col><Col id=\"Column4\">2</Col></Row><Row><Col id=\"Column1\">8</Col><Col id=\"Column3\">2</Col><Col id=\"Column4\">2</Col><Col id=\"Column2\">2</Col><Col id=\"Column0\">2</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Button("Button00", "absolute", "3.13%", "49", null, "40", "78.81%", null, this);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "10.84%", "173", null, "71", "68.16%", null, this);
            obj.set_taborder("1");
            obj.set_text("Button01");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "5.47%", "104", null, "42", "79.69%", null, this);
            obj.set_taborder("2");
            obj.set_text("Button02");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "41.8%", "100", null, "67", "40.43%", null, this);
            obj.set_taborder("3");
            obj.set_text("Button03");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "42.77%", "199", null, "67", "39.45%", null, this);
            obj.set_taborder("4");
            obj.set_text("Button03");
            this.addChild(obj.name, obj);

            obj = new Div("Div00", "absolute", "19.34%", "294", null, "72", "5.57%", null, this);
            obj.set_taborder("5");
            obj.set_text("Div00");
            obj.style.set_background("#888888ff");
            obj.style.set_color("#46463dff");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "3.22%", "305", null, "51", "83.59%", null, this);
            obj.set_taborder("6");
            obj.set_text("Button05");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 72, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.set_text("Div00");
            		p.style.set_background("#888888ff");
            		p.style.set_color("#46463dff");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1024, 768, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("test001");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("test001.xfdl", function() {
        this.FIRST_GAP = 1;
        this.BTN_GAP = 0;
        this.MARGIN_WIDTH = 38;
        this.TAB_WIDTH = 90;
        this.TAB_HEIGHT = 36;
        this.TAB_EXTRA_RIGHT_GAP = 18;
        this.EXTRA_WIDTH = 7;
        this.EXTRA_TOP = 15;
        this.EXTRA_HEIGHT = 7;
        this.EXTRA_BTN_PREFIX = "EXTRA_";
        this.TAB_BTN_PREFIX = "TAB_";
        this.Button00_onclick = function(obj,e)
        {

        	            
        	    this.fn_getObj();        
        	
        	
        }

        

        this.fn_getObj = function(oArgs)
        {
             var oData ={
                 sId  : "login2",             //callback id
                 sUrl : "frame::Login.xfdl",   //url
                 bshowtitlebar : true,     //title bar
                 bAutoSize  : true,       //autosize
                 bResize    : false,       //resize
                 bShowtatusbar : false,     //statusbar
                 sOpenalign    : "center middle",  //align
                oArgs :  {arg1:'1111111111111111111',
                         arg2:'2222222222222222222222222'         
                       }    
             };
           
             
             
              //팝업 테스트
              Iject.showModal(this,oData,function(){
              
                      /* 
                      * popup calllback
                      *@param {object}this.fobj
                      *@param {string} this.svcid 
                      *@param {string} this.variant
                      */
                     
                     var pThis= this.fobj;             
                     trace(" pThis.name : " + pThis.name);
                     trace(" pThis.svcid : " + this.svcid);
                     trace(" pThis.variant : " + this.variant);
                     
                     var sPerson = JSON.stringify(this.variant);
                     trace(" sPerson2222222 : " + sPerson);
                    var oPerson = JSON.parse(sPerson);

              
              });
            //var oArg2;
        //     
        //     oArg2 = oArgs;
        //     trace(" oArgs : " +oArgs.length);
        //     trace(" oArg2 : " +oArg2.length);
        //     if (!Eco.isEmpty(oArgs) && typeof oArgs =="object" )
        // 	{
        // 			for ( var key in oArgs )
        // 			{
        // 			   
        // 				if ( oArgs.hasOwnProperty(key) )
        // 				{
        // 
        // 
        // 				trace(" oArgs[key] : " + oArgs[key] );
        // 				}
        // 			}
        // 	}

        
        }
        this.Button01_onclick = function(obj,e)
        {
        	var oData = {
        	Name: "SooYoung"
        	, Age: "29"
        }

        var sPerson = JSON.stringify(oData);
        var oPerson = JSON.parse(sPerson);

        alert(sPerson);
        /* Output: "{"Name":"SooYoung","Age":"29"}" */
        alert(oPerson.Name);
        }

        
        this.jsonTest = function()
        {
           var oJson =  {'name':'James', 'address':"Seoul, Korea" ,oarg:{
                 a1 : "aaaaa"
           
           }};
           
              trace(oJson.oarg['a1']);
        }

        this.Button02_onclick = function(obj,e)
        {
        	this.jsonTest();
        }

        this.Button03_onclick = function(obj,e)
        {
        	this.alert("aaa","알림");
        }

        this.Button04_onclick = function(obj,e)
        {
        		this.confirm("aaa","확인");
        }

        this.Button05_onclick = function(obj,e)
        {
              var tabObj = new Button();
        	    tabObj.init("aaaa", "absolute", 0, 0,0,this.TAB_HEIGHT,null,null);
        	    this.Div00.addChild(tabObj.name, tabObj);
        	    	
        	    tabObj.set_text("Aaaaaa");
        	  //  tabObj.set_cssclass("");
        	//tabObj.style.set_align("left");
        	//tabObj.set_cssclass("btn_MDI_02");	
        //    tabObj.style.set_cursor("hand"); // set  
        	//tabObj.style.set_padding_left("5");
        	//tabObj.set_text("Aaaaaa");
        	tabObj.set_tooltiptext(tabName);
        //	tabObj.style.set_font("bold 9 Dotum");
        //tabObj.style.set_font_type("bold");
        	//tabObj.setEventHandler("onclick", this.btn_Tab_OnClick, this);
        	tabObj.set_visible(true);	
        	tabObj.show();
           trace(" tabObj.style.font : " + tabObj.style.font);
           trace(" cssclass : " + tabObj.cssclass);
        	var nCompWidth = this.fn_getWidth(tabObj,"Aaaaaa")+25;	
        	tabObj.set_width(nCompWidth+this.TAB_EXTRA_RIGHT_GAP);
        tabObj.set_cssclass("btn_MDI_02");
        }

        
        /**
         * width size조정 
         * @public
         * @param {object} 버튼
         * @param {name}   버튼명
         * @return 
         * @example
         * @memberOf 
         */
        this.fn_getWidth = function (obj,name)
        {
            var tabID = obj.name;
        	//var curRow = this.ds_Tab.findRow("TAB_ID", tabID);
        	//var TabObj = this.fn_findObj(this.ds_Tab.getColumn(curRow, "TAB_ID"));
            var objFont =  Iject.Util.getObjFont(obj,10);
        	var objSize = nexacro._getTextSize2(name, objFont);

        	return objSize[0];

        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick", this.Button00_onclick, this);
            this.Button01.addEventHandler("onclick", this.Button01_onclick, this);
            this.Button02.addEventHandler("onclick", this.Button02_onclick, this);
            this.Button03.addEventHandler("onclick", this.Button03_onclick, this);
            this.Button04.addEventHandler("onclick", this.Button04_onclick, this);
            this.Button05.addEventHandler("onclick", this.Button05_onclick, this);

        };

        this.loadIncludeScript("test001.xfdl");

       
    };
}
)();
