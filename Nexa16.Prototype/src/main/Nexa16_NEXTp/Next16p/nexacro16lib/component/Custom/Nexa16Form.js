/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_FORM 
*  @Creator 송원창
*  @CreateDate 2016.04.15 
*  @LastModifier  
*  @LastModifyDate  
*  @Version 1.0
*  @Outline Form 관련 공통 함수 모음 
*  @Desction 
* 			1) Form 관련 공통 함수 모음 
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15      송원창             최초 생성 
*******************************************************************************
*/

var LIB_FORM = nexacro.Form.prototype;

/******************************************************************************
	실행환경 관련 함수
******************************************************************************/


/**
 * @class      	퀵뷰로 실행되어있는지 여부확인
 * @param       N/A
 * @return      {boolean} 퀵뷰여부
 */
LIB_FORM.gfn_isQuickView = function()
{
	if(application.G_QUICK_VIEW == 'true')
	{
		return true;
	}
	else
	{	
		return false;
	}
};

/**
 * @class      	팝업여부를 리턴
 * @param       {object}  폼
 * @return      {boolean} 팝업여부
 */
LIB_FORM.gfn_isPopup = function(objForm)
{
	if(this.gfn_isNull(objForm.opener))
	{
		return false;
	} 
	else {
		return true;
	}
};

/**
 * @class      	화면 공통 초기화
 * @param 		{object} obj 폼
 * @param 		{bSubComp} 콘테이너 내 Componet 포함 여부 
 * @return 		N/A
 */
LIB_FORM.gfn_initForm = function(obj, bSubComp)
{
	
	
	obj._userPropertyPrefix = this.gfn_getUniqueId();	//유일한 ID 를 반환
	
	// Div의 gfn_setUrl() 을 통한 함수의 처리시에 파라미터및 콜백함수를 호출하는 시점및 콜백처리를 해준다. 
    this._gfn_callbackDivSetURL(obj);
    
    // 기본값으로 콘테이너 내 Componet도 처리
	if(this.gfn_isNull(bSubComp)) bSubComp = true;
	
	
	// 팝업화면일때는 바깥 테두리의 스타일을 만들어준다.
    if( !this.gfn_isNull(obj.opener) )
    {
		var objTitlebar = this.parent.titlebar;
		if(this.gfn_isNull(objTitlebar) == false)
		{
			objTitlebar.style.set_background("#293451");	//변경
		}
		                    
        // 팝업 깜빡임 처리
		var fn = function() {
					var own = this.getOwnerFrame(); 
					var width = own.width;
					//trace("OnceCallbackTimer name= " + own.name + ", width= " + width  + ", left= " + own.left); 					
					if(width < 10) {
						own.move(own.left, own.top, width, own.height);
					}
		}		
		nexacro.OnceCallbackTimer.callonce(this, fn, 40);
		
		var popupwinid = this.gfn_getChildFrameVariable("_CURRENT_POPUP_WINDOWID_");
                        
        // popupwinid 의 값이 undefined 일 경우 아래 부터 에러
        if( this.gfn_isNull(popupwinid) ){
			popupwinid = "";
        }
        
        var callbackid = popupwinid.split("::")[0];
        
        // modeless 팝업호출시 콜백처리가 처리가 안되기 때문에 별도의 로직으로 처리한다. 
        if( popupwinid.indexOf("MSG::") == -1 )
        {
			// 팝업 닫을때 변경사항 체크
            obj.addEventHandler("onbeforeclose", this.gfn_closePopupCheck, this);
            
            // 파라미터값을 설정한다. 
            // 넥사크로 팝업호출시 파라미터가 제대로 안넘어 오는 경우 발생 이를 우회하기 위한방법
            var params = this.gfn_getVariable(popupwinid+"_POPUP_PARAMS_");
            
            try
            {
                for(key in params)
                {
                    this.parent[key] = params[key];
                }                    
            }
            catch(e)
            {
                for(key in params)
                {
                    obj[key] = params[key];
                }                    
            }
            
            // 리턴값 Clear
            this.gfn_setVariable(popupwinid+"_POPUP_RETURN_VALUE_", "");
            
            var popupcallback = this.gfn_getVariable(popupwinid+"_POPUP_CALLBACK_");
            if( !this.gfn_isNull(popupcallback) )
            {
				var closeeventcnt = 0;
                obj.addEventHandler("onclose", 
                    function(form, event)
                    {
                        if( closeeventcnt == 0 )
                        {
                            ++closeeventcnt;
                            
                            // gfn_closePopup()함수에서 설정한 파라미터의 인자갯수만큼을 처리해준다. 
                            var evalstring = "callbackid";
                            var params = this.gfn_getVariable(popupwinid+"_POPUP_RETURN_VALUE_");
                            var argc   = this.gfn_getVariable(popupwinid+"_POPUP_RETURN_VALUE_ARGC");
                            
                            // 리턴값이 단일 Object일경우 
                            if( argc == 1 )
                            {
                                evalstring+=",params";
                                eval("obj.opener."+popupcallback+"("+evalstring+")");                            
                            }
                            // 리턴값이 여러개의 Object일경우 
                            else
                            {
                                for(var i=0;i<params.length;i++)
                                {
                                    evalstring += ",params["+i+"]";
                                }             
                                
                                eval("obj.opener."+popupcallback+"("+evalstring+")");                            
                            }                            
                        }
                        else
                        {
                            ++closeeventcnt;
                        }
                    }, 
                    this
                );
            }
            
            
        }
    }
    
    // 콤포넌트 초기화
	this.gfn_initComponents(obj);
};

/*
 * @class       Form에 속한 모든 컴포넌트를 함수의 인자로 넘겨주고 함수 호출처리
 *
 * @param obj         - 컨테이너(Form, Div)
 * @param FunctionObj - 호출할 함수
 * @param paramObj    - 함수에 넘겨줄 파라메터
 * @param bObjects    - Object 포함 여부
 * @param bSubComp    - 콘테이너 내 Componet 포함 여부
 * @return retVal 함수의 리턴 값
 */  
LIB_FORM.gfn_initComponents = function(obj)
{
	for(var i=0;i<obj.components.length;i++) 
	{
        var objTarget = obj.components[i];
		var strType   = objTarget.toString().toUpperCase();
		var strName   = objTarget.name;	
		
		// TAB 페이지 처리 
        if( strType == "[OBJECT TAB]" )
        {
            for(var m=0;m<objTarget.tabpages.length;m++)
            {
                this.gfn_initComponents(objTarget.tabpages[m]);		//재귀호출
            }
        }

		// DIV 처리 
        if( strType == "[OBJECT DIV]" )
        {
            this.gfn_initComponents(objTarget);						//재귀호출
        }		
		
		// 그리드 공통 처리 
		if( strType == "[OBJECT GRID]" )
		{		
			objTarget.set_nodatatext("조회된 결과가 없습니다.");
		
		    // 사용자정의 컬럼설정 원복을 위한 원본그리드 포맷
		    objTarget.orgformatstring = objTarget.formats;
		
            // 그리드의 바인드 dataset이 존재하면 해당 binddataset에 대한 바인딩그리드가 뭐다라고 설정한다.
            // 트랜잭션 콜백에서 자동으로 소트처리된것을 clear 처리해주기위해서..
		    try
		    {
                var binddataset = objTarget.getBindDataset();
                if( !this.gfn_isNull(binddataset) )
                {
                    binddataset.bindgrid = objTarget;
                }
            }
            catch(e)
            {
            }
            				
            // 그리드 상태표시( 첫번째 컬럼에 체크박스 생성 )
            if( objTarget.u_usestatus == "true" || objTarget.u_usestatus == "Y" )            				
            {
                objTarget.insertContentsCol("body", 0);
                //objTarget.setCellProperty("body", 0, "displaytype", "image");
                //objTarget.setCellProperty("body", 0, "text", "expr:(dataset.getRowType(currow)==2)?\'theme://images/sta_n.png\':(dataset.getRowType(currow)==4)?\'theme://images/sta_u.png\':(dataset.getRowType(currow)==8)?\'theme://images/sta_d.png\':\'default\'");
                objTarget.setCellProperty("head", 0, "displaytype", "checkbox");
                objTarget.setCellProperty("head", 0, "edittype", "checkbox");
                objTarget.setCellProperty("body", 0, "displaytype", "checkbox");
                objTarget.setCellProperty("body", 0, "edittype", "checkbox");
                objTarget.setCellProperty("body", 0, "text", "bind:chk");
                
                objTarget.setRealColSize(0, 25);
                objTarget.orgformatstring = objTarget.getCurFormatString(false);	//체크 박스 생성시 foramts 변경
            }
            
            // 그리드 공통팝업메뉴 사용여부 설정 
            var grid_u_menu = objTarget.u_menu+"";
            
            if( !this.gfn_isNull(grid_u_menu) )
            {
                // 사용여부 none 이 아니면 공통팝업메뉴를 사용하도록 addEventHandler 처리한다. 
				if( grid_u_menu.indexOf("none") == -1 )
				{
					objTarget.addEventHandler("onrbuttondown", 
						function(obj, e)
						{
							this.gfn_popupGridCommonMenu(obj, e);
						},
						this
					);
				}
                
                // 그리드 해더클릭 소트기능 이벤트 추가 
                if( grid_u_menu.toLowerCase().indexOf("!sort") == -1 )
                {
                    objTarget.addEventHandler("onheadclick", this._gfn_commGrid_onheadclick, this);
                }
            }
            // 없으면 기본적인 처리가 가능하도록 처리한다. 
            else
            {
                objTarget.addEventHandler("onrbuttondown", 
                    function(obj, e)
                    {
                        this.gfn_popupGridCommonMenu(obj, e);
                    },
                    this
                );
                
                // 그리드 해더클릭 소트기능 이벤트 추가 
                objTarget.addEventHandler("onheadclick", this._gfn_commGrid_onheadclick, this);
            }
            		
            // 사용자정의 컬럼 설정정보가 존재하면 사용자 설정정보로 로딩한다. 	
            //this.gfn_setGridFormat(objTarget);
		}
		
		// 캘린더 날짜 기본값 설정 
        if( strType == "[OBJECT CALENDAR]" )
        {
            if( this.gfn_isNull(objTarget.value) )
            {
                objTarget.set_value(this.gfn_getToday());
            }
        }        
	}
};

/******************************************************************************
	팝업 관련 함수
******************************************************************************/

/**
 * @class      	ChildFrame에 설정된 key의 값을 가져오기
 * @param 		{String} key
 * @return      {object} obj 값
 */
LIB_FORM.gfn_getChildFrameVariable = function(key)
{
	var parentobj = this;
	while(true)
	{
		var currenttype = parentobj.valueOf();
		if( currenttype == "[object ChildFrame]" )
		{
			break;
		}		
		if( currenttype == "application" ) break;
		
		parentobj = parentobj.parent;
	}
    
    return parentobj[key];
};

/**
 * @class      	ModalSync 팝업에서 Return한 값 가져오기
 * @param       N/A
 * @return      {object} obj - boolean, String, number, Object(Array, Dataset)
 */
LIB_FORM.gfn_getVariableForm = function()
{
    try
    {
        var parentobj = this;
        while(true)
        {
            var currenttype = parentobj.valueOf();
            if( currenttype == "[object Form]" )
            {
                if( !this.gfn_isNull(parentobj.opener) )
                {
                    parentobj = parentobj.opener;
                    // 팝업화면시 처리 
                    continue;
                }
                else
                {
                    return parentobj;
                }
            }
            
            // 퀵뷰어시의 최상의 FORM 2015.06.15 퀵뷰어처리추가
            if( currenttype == "[object ChildFrame]" )
            {
                return parentobj;
            }
            
            if( currenttype == "application" ) break;
            
            parentobj = parentobj.parent;
        }
        return null;
    }
    catch(e)
    {
        return application;
    }
};

/**
 * @class  최상위폼에 대해서 변수를 임의로 넣고 뺄수있는 함수이다. 
 *         이는 오픈된 화면에서 서로 공유할수있는 값으로 메뉴로 오픈된 최상위폼의 하위 및 팝업화면에서 Share를 할수있다.
 *
 * @param  {String}  변수의 키값
 * @param  {Object}  변수의 설정값
 * @return {N/A}
 */
LIB_FORM.gfn_setVariable = function(key, value)
{
    try
    {
        var topform = this.gfn_getVariableForm();
        
        if( this.gfn_isNull(topform._FORM_VARS_) )
        {
            topform._FORM_VARS_ = {};
        }
        
        topform._FORM_VARS_[key] = value;
    }
    catch(e)
    {
    }
};

/**
 * @class  오픈된 화면에서 서로 공유가능한 최상위메뉴(메뉴오픈된화면) 및 그 하위 Div 및 팝업화면이 Share하는 변수값을 가져온다.
 *
 * @param  {String}  변수의 키값
 * @return {Object}  해당변수의 설정값
 */
LIB_FORM.gfn_getVariable = function(key)
{
    try
    {
        var topform = this.gfn_getVariableForm();
        
        if( this.gfn_isNull(topform._FORM_VARS_) )
            return "";
        else    
            return topform._FORM_VARS_[key];
    }
    catch(e)
    {
    }
};

/**
 * @class  DIV 의 setUrl로 오픈된 화면에서 부모창에서 넘겨준 인자값을 가져온다.
 *
 * @param  {String}   파라미터 키값
 * @return {Object}   넘겨준 파라미터값
 */
LIB_FORM.gfn_getParam = function(key)
{
    var rtnval = this.parent[key];

    if( this.gfn_isNull(rtnval) ) 
    {
        return this[key];
    }
    else
        return rtnval;
};

/******************************************************************************
	팝업 관련 함수
******************************************************************************/

/**
 * @class      	팝업창 호출 (모달/모달리스 포함)
 * @param       {string} sPopupId - 팝업ID
 * @param       {string} sUrl - 팝업으로 띄울 폼 URL
 * @param       {object} oArg 팝업arg
 * @param       {string} sOption 팝업옵션
 *                       top,left,width,height,title ,titletext,status,modeless,layered,opacity
 *                      ,autosize,resizable,duprun,basecomp
 * @param       {string} sPopupCallback 모달 팝업 callback 함수
 * @return      {object} N/A or 팝업 리턴값
 */
LIB_FORM.gfn_openPopup = function (sPopupId, sUrl, oArg, sOption, sPopupCallback, isMsgBox)
{
	if(this.gfn_isNull(sPopupId) == true) sPopupId = sUrl.replace(".xfdl","").split("::")[1];
	if(this.gfn_isNull(oArg) == true)     oArg = {};
	
	
	//----------------------------------------------------------------
	// 팝업 Default 설정 값
	//----------------------------------------------------------------
	var popupType = "modal";
		
	var nLeft   = -1;
	var nTop    = -1;
	var nWidth  = 0;
	var nHeight = 0;
	
	var bBorder     = true;
	var bShowTitle  = true;
	var bShowStatus = false;	
	var bAutoSize   = true;
	var bResizable  = false;
	var bDplcRun    = true;
	
	var bLayered = true;
	var nOpacity = 100;	
	
	var sTitleText  = "";
	var oBaseComp   = null;	
	var sPopupEvent = "";
	
	var aVal = String(sOption).split(",");	
	for (var i=0; i<aVal.length; i++) 
	{	
		var aVal2 = aVal[i].trim().split("=");
		switch (aVal2[0]) 
		{
			case "top":				
				nTop = parseInt(aVal2[1]);
				break;
			case "left":
				nLeft = parseInt(aVal2[1]);
				break;
			case "width":
				nWidth = parseInt(aVal2[1]);
				break;
			case "height":
				nHeight = parseInt(aVal2[1]);
				break;
			case "border":
			    if( aVal2[1] == "false" ) bBorder = false;
				else                      bBorder = true;
				break;	
			case "title":
			    if( aVal2[1] == "false" ) bShowTitle = false;
				else                      bShowTitle = true;
				break;					
			case "titletext":
				sTitleText = aVal2[1];
				break;							
			case "status":
			    if( aVal2[1] == "true" ) bShowStatus = true;
				else                     bShowStatus = false;
				break;		
			case "popupType":
				popupType = aVal2[1];
				break;
			case "layered":
				bLayered = aVal2[1];
				break;
			case "opacity":
				nOpacity = aVal2[1];
				break;
			case "autosize":
				bAutoSize = aVal2[1];
				break;
			case "resizable":
			    if( aVal2[1] == "true" ) bResizable = true;
				else                     bResizable = false;
				break;				
			case "duprun":				  // 중복실행		
			    if( aVal2[1] == "false" ) bDplcRun = false;
				else                      bDplcRun = true;
				break;
			case "basecomp":			// 위치호출 컴프		
				oBaseComp = aVal2[1];
				break;
			case "popupEvent":			// 팝업 이벤트 호출
				sPopupEvent = aVal2[1];
				break;
		}			
	}	

	popupType = popupType.toLowerCase();
	
	//showmodelss에서 titlebar height 적용을 위한 처리.
	//기존소스에 이미 아래와 같은 처리가 되어 있어서 openstyle 값만 변경함.
	//     if(bShowTitle == "true") nHeight += 22;	
  if (popupType == "modeless" && bAutoSize == "false") {
      sOption = sOption.replace("height=" + nHeight, "height=" + (nHeight + 22)); //+ titlebar.height 22  
  }			
	
	
	// 중복방지시 fn_onload 를 호출처리 하도록 수정
	//----------------------------------------------------------------	
	//중복여부에 따른 처리 
	//----------------------------------------------------------------
	if( bDplcRun )
	{
		// 중복허용
		sPopupId = sPopupId + "::" + this.gfn_toString(this.gfn_getRandomSeq());		
	}
	else
	{	
	    // 기존의 팝업의 목록을 찾아서 처리한다. (modeless 에서만 처리된다)
        for(var i=0;i<application.popupframes.length;i++)
        {	
            var popupform = application.popupframes[i].form;        
            //주의: popupform.name 은 팝업을 띄운 win_id 개념이 아님, 해당 화면내 선언된 name 이다.
            if(popupform.name == sPopupId )
            {
                this.gfn_setVariable(sPopupId+"_POPUP_CALLBACK_",     sPopupCallback);
                this.gfn_setVariable(sPopupId+"_POPUP_RETURN_VALUE_", ""            );
                this.gfn_setVariable(sPopupId+"_POPUP_PARAMS_",       oArg          );		
            
                //minimize 되어있다면 nomal 로 처리
                application.popupframes[i].set_openstatus("normal");		
                // 이미 떠있는 폼에 포커싱처리
                popupform.setFocus();

                //modeless 창 이미 오픈되어있을 경우 화면창 reload 하지 않고 파라미터만 넘어가게 수정한다.
                if(this.gfn_isNull(sPopupEvent)==false)
                {
					if(typeof popupform[sPopupEvent] == "function")
					{
						eval("popupform."+ sPopupEvent + "(oArg)"); 
					}
                }
                else
                {
                    //sPopupEvent 가 정의되지 않으면 default onload 실행                    
                    popupform.reload();   //reload를 하지 않으면 화면이 변경이 되지 않는다. 
					// 데이터셋의 onload 이벤트가 존재하면 해당 이벤트를 실행해준다. 
					if( !this.gfn_isNull(popupform.getEventHandler("onload", 0)) )
					{
						try
						{ 
							popupform.getEventHandler("onload", 0).call(this, popupform); 
						}
						catch(e){}
					}                                                    
				}
                
				//떠있는 폼에 대한 포커싱 처리가 되지 않아 로직을 탈수있게 주석처리 한다.
				return false;
            }
        }
    }

	//----------------------------------------------------------------
	//모달리스일때 중복여부에 따른 처리 
	//----------------------------------------------------------------
	if (popupType == "modeless") 
	{			
		var objChildFrame = application.popupframes[sPopupId];
		if(bDplcRun == false && this.gfn_isNull(objChildFrame) == false)
		{
			objChildFrame.setFocus();
			return objChildFrame;
		}
	}

	//----------------------------------------------------------------
	// 팝업의 콜백후처리를 하기위한 설정처리 모든 팝업이 콜백함수를 사용할수있도록 처리 
	//----------------------------------------------------------------
	oArg["_CURRENT_POPUP_WINDOWID_"] = sPopupId;
	oArg["_CURRENT_POPUP_TYPE_"]     = popupType;
    this.gfn_setVariable(sPopupId+"_POPUP_CALLBACK_",     sPopupCallback);
    this.gfn_setVariable(sPopupId+"_POPUP_RETURN_VALUE_", ""            );
    this.gfn_setVariable(sPopupId+"_POPUP_PARAMS_",       oArg          );		

	//----------------------------------------------------------------
	//위치지정 - object 확인하여 objct 기준으로 호출
	//----------------------------------------------------------------
	if(this.isValidObject(oBaseComp)) 
	{ 
		oBaseComp = eval("this."+oBaseComp);
		nLeft = system.clientToScreenX(oBaseComp, 0) - nexacro.toNumber(system.clientToScreenX(application.mainframe, 0));
		nTop = system.clientToScreenY(oBaseComp,parseInt(oBaseComp.height))  - nexacro.toNumber(system.clientToScreenY(application.mainframe, 0));		
	}	
		
	var sOpenalign = "";
	if (nLeft == -1 && nTop == -1) 
	{		
		sOpenalign = "center middle";
        nLeft      =  (application.mainframe.width / 2) - Math.round(nWidth / 2);
	    nTop       = (application.mainframe.height / 2) - Math.round(nHeight / 2) ;		
	}	
	if (nWidth > 0 || nHeight > 0) 
	{
		bAutoSize = false;
	}
	if(bShowTitle == "true") nHeight += 22;	
	
	var objParentFrame = this.getOwnerFrame();
	
    // 팝업이 화면 - 영역이면 0으로 설정한다. 	
	if( nLeft < 0 ) nLeft = 0;
	if( nTop < 0 )  nTop = 0;

    // 팝업이 화면크기 재조정(0으로 설정시 닫기 버튼 없음)
	if( nWidth == 0 )  nWidth  = 415;
	if( nHeight == 0 ) nHeight = 188;


	trace("● popupType=" + popupType);
		
	// Modeless 팝업
    if (popupType == "modeless") 
    {
        //modeless 창 application.open 사용사 파라미터 추가(oArg) 
		this.gfn_openModeless(sPopupId,sUrl,nWidth,nHeight,sOption,oArg);
    }
    // Modal, showModalWindow, ModalSync 팝업
    else
    {
		//showmodalwindow가 중앙에 위치하지 않는 문제. 임시 추가
		if(isMsgBox) {
			var mf = application.mainframe;
			var nX = system.clientToScreenX(mf, 0);
			var nY = system.clientToScreenY(mf, 0);
			
			var formWidth = 417;
			var formHeight = 188; 
			
			nLeft = Math.round(mf.width / 2) - Math.round(formWidth / 2);
			nTop =  Math.round(mf.height / 2) - Math.round(formHeight / 2) ;		
					
			nLeft = nX + nLeft;
			nTop  = nY + nTop - 48;
		}
	
		//깜빡임 현상을 최소화하기 위해서 ownerFrame 기준으로 width와 height를 처리함.
		var objParentFrameName;
		try
		{
			objParentFrameName = objParentFrame.form.name;
		}
		catch(e) {
			objParentFrameName = "";
		}

		newChild = new nexacro.ChildFrame();
				
		// 위치 깜빡임 처리로 width, height 를 1로 설정 --> gfn_initForm에서 사이즈 원복
		newChild.init(sPopupId,"absolute", nLeft, nTop, 1, 1, null, null, sUrl);
		
		//newChild.set_showtitlebar(bShowTitle);
		newChild.set_showtitlebar(false);
		newChild.set_autosize(bAutoSize);
		newChild.set_resizable(bResizable);
		newChild.set_titletext(sTitleText);
		newChild.set_showstatusbar(bShowStatus);
		
		//ICIS 임베딩화면에서 showmodalwindow가 중앙에 위치하지 않는 문제. 임시 추가
		if(!isMsgBox) {
			newChild.set_openalign(sOpenalign);
		}		
		
		//newChild.set_layered(bLayered);
		newChild.style.set_overlaycolor("#00000250");
		newChild.style.set_opacity(nOpacity);
		newChild.set_dragmovetype("all");
				
		// border 설정
		if( bBorder )
		{
			newChild.style.set_border("2 solid #293451");	//변경
			newChild.style.set_bordertype("normal 0 0");
			newChild.style.set_background("white");
		}
		
		// Modal 팝업
		if (popupType == "modal") 
		{			
			// Modal(html5기본, cllback으로만 리턴 받을 수 있음)	
			newChild.showModal(sPopupId, objParentFrame, oArg, this, ""); 
		}
	}
};

/**
 * @class      	팝업창 호출 (모달/모달리스 포함)
 * @param       {string} sPopupId - 팝업ID
 * @param       {string} sUrl - 팝업으로 띄울 폼 URL
 * @param       {object} nFormWidth - 팝업창 넓이
 * @param       {object} nFormHeight - 팝업창 높이
 * @param       {string} sOption 팝업옵션
 *                       top,left,width,height,title ,titletext,status,modeless,layered,opacity
 *                      ,autosize,resizable,duprun,basecomp
 * @param       {object} oArg 팝업arg
 * @return      N/A
 */
LIB_FORM.gfn_openModeless = function(sPopupId, sUrl, nFormWidth, nFormHeight, sOptions, oArgs)
{
	if(nexacro.Browser == "Runtime")	
	{
		var nCursorX = system.getCursorX(); 
		var nCursorY = system.getCursorY();
		var nMoniterIndex = system.getMonitorIndex(nCursorX, nCursorY);

		objScreenSize = system.getScreenRect(nMoniterIndex);
	}
	else
	{
		objScreenSize = system.getScreenRect(1);
	}
	var nLeft     = objScreenSize.left;
	var nTop      = objScreenSize.top;
	var nRight    = objScreenSize.right;
	var nBottom   = objScreenSize.bottom;
	var nWidth    = nRight  - nLeft;
	var nHeight   = nBottom - nTop;
	
    var nLoginLeft   = nLeft + (nWidth/2)  - (nFormWidth/2);
    var nLoginTop    = nTop  + (nHeight/2) - (nFormHeight/2);
    //trace(" nLeft : " + nLoginLeft + " nTop : " + nLoginTop + " nWidth : " + nWidth + " nHeight : " + nHeight);
    
    var sOpenStyle= "showtitlebar=true ";
    // showontaskbar 기본값 설정 : true -> 바탕화면에 icon 등록, modeless가 뒤로 숨도록 처리
    if( sOpenStyle.indexOf("showontaskbar") == -1 )
    {
		sOpenStyle = sOpenStyle + "showontaskbar=false ";
    }
    if(this.gfn_isNull(sOptions)==false)
    {
		sOpenStyle+=nexacro.replaceAll(sOptions, ",", " ");
    }
    
    if(nexacro.Browser != "Runtime")		//브라우저일때
	{
		nLoginLeft = screenLeft;
	}
    
	application.open(sPopupId, sUrl, application.mainframe, oArgs, sOpenStyle.trim(), nLoginLeft, nLoginTop, nFormWidth, nFormHeight-20, this);
};


/******************************************************************************
	메시지 관련 함수
******************************************************************************/
/**
 * @class      	메시지 코드에 따른 메세지창 처리
 *
 * @param       {string}       strMsgId 메시지테이블에 존재하는 메시지 ID
 * @param       {string}       sPopupCallback 모달 팝업 callback 함수
 * @param       {string|array} strOrArrStatus 발생상황 문장에 필요한 인자로 사용되는문자열의 배열이나 콤마로구분된 문자열리스트
 * @param       {string|array} strOrArrCause 발생원인 문장에 필요한 인자로 사용되는문자열의 배열이나 콤마로구분된 문자열리스트
 * @param       {string|array} strOrArrSolution 해결방안문장에 필요한 인자로 사용되는 문자열의 배열이나 콤마로구분된 문자열리스트
 * @param       {string|array} strOrArrTitle 타이틀문장에 필요한 인자로 사용되는 문자열의 배열이나 콤마로구분된 문자열리스트 
 * @param       {string}       strServiceId    - 추가정보 ServiceId
 * @param       {string}       strGlobalNo     - 추가정보 GlobalNo
 * @param       {string}       strOpenType     - 추가정보 팝업창 형태(D:Dialog, O:Open)  
 * @param       {boolean}      bAutoCloseFlag  - 자동클로즈 처리여부 (true:자동클로즈, false:수동클로즈)
 * @return      {*} 팝업에서 호출되는 return 
 * @example     this.gfn_showMsg("");
 */
LIB_FORM.gfn_showMsgBox = function(strMsgId, sPopupCallback, strOrArrStatus, strOrArrCause, strOrArrSolution, strOrArrTitle, strServiceId, strGlobalNo, strOpenType, bAutoCloseFlag)
{
	// 자동클로징여부 첵크
	// 인자값이 너무 많아서.. 순서대로 이걸 다 맞출려면 개발자는 모든 파라미터의 순서를 알아야하고 순서대로 빈값을 너야하는 불편함이 발생. 
	// 그냥 인자값의 타입이 boolean 이면 자동클로징여부로 판단해서 처리하게 한다.
	var closeflag = false;
	for(var name in arguments)
	{
	    var argtype = this.gfn_getVarType(arguments[name]);	    
	    if( argtype == "BOOLEAN" )
	    {
	        closeflag = arguments[name];
	        
	        // 입력 boolean 값은 기존값에 썩이지 않게 처리한다. 
	        arguments[name] = "";	        
	        break;
	    }
	}

	if(this.gfn_isNull(strOrArrStatus))   strOrArrStatus   = "";
	if(this.gfn_isNull(strOrArrCause))    strOrArrCause    = "";
	if(this.gfn_isNull(strOrArrSolution)) strOrArrSolution = "";
	if(this.gfn_isNull(strOrArrTitle))    strOrArrTitle    = "";
		
	var strType;
	var strShowType;
	var strMsgSubject;
	var strMsgStatus;
	var strTitle;
	var strStatus;
	var strFormInfo;
	var strCause;
	var strSolution;
	

    //---------------------------------------------
    //1. 메세지 타입/메세지 구하기 
    //---------------------------------------------
    strShowType = "OK";
    
	// 공통서비스에러메시지ID[UCMNE9999]인 경우
	if (strMsgId == this.GC_SVC_ERR_MSG_ID)
	{
		strType     = "E";
		strShowType = "OK";
	}
	// GW 서비스를 통하여 메시지 처리 경우
	else if(strMsgId == this.GC_GTWY_SVC_MSG_ID)
	{
		strType     = "I";
		strShowType = "OK";
	}
	// 기타 메세지
	else
	{
        //gds에서 메세지 찾기 후 없으면 서비스로 메세지 가져오기
        var nRow = this.gfn_getMsgData(strMsgId, "", true);

		// msg 없을때
        if (nRow < 0)
        {
			var arrMsgInfo = new Array();
			
            arrMsgInfo[0] = "E";    //E:에러, I:정보, Q:확인;                                		//strType
            arrMsgInfo[1] = "메세지";                                                      		//strTitle
            arrMsgInfo[2] = "[" + strMsgId + "]에 해당되는 메세지를 검색하지 못했습니다.";    	//strStatus
            arrMsgInfo[3] = "시스템 관리자에게 문의하시기 바랍니다.";                      	//strCause
            arrMsgInfo[4] = strShowType;                      										//strShowType
            arrMsgInfo[5] = sPopupCallback;                      									//sPopupCallback
            arrMsgInfo[6] = strMsgId;                      											//strMsgId
            
            this._gfn_openMsgPop(arrMsgInfo);
            return;
        }
		// msg 있을대
		else 
		{
			strType		  = application.GDS_MESSAGE.getColumn(nRow, "MSG_TYPE_CD");
			strMsgSubject = application.GDS_MESSAGE.getColumn(nRow, "MSG_TITLE");
			strMsgStatus  = application.GDS_MESSAGE.getColumn(nRow, "MSG_NAME");
			strShowType	  = application.GDS_MESSAGE.getColumn(nRow, "NOTE_MATT");
			strShowType	  = this.gfn_nvl(strShowType,"OK");
		}
	}	
	
	//팝업호출
	var arrMsgInfo = new Array();
	
	arrMsgInfo[0]  = strType;
	arrMsgInfo[1]  = this.gfn_getFormatString(strMsgSubject, strOrArrTitle);
	arrMsgInfo[2]  = this.gfn_getFormatString(strMsgStatus, strOrArrStatus);
	arrMsgInfo[3]  = strOrArrCause;
	arrMsgInfo[4]  = strShowType;
	arrMsgInfo[5]  = sPopupCallback;	
	arrMsgInfo[6]  = strMsgId;
	arrMsgInfo[7]  = strMsgSubject;
	arrMsgInfo[8]  = strMsgStatus;
	arrMsgInfo[9]  = strOrArrSolution;            
	arrMsgInfo[10] = strServiceId;	//strServiceId- 추가정보svcid
	arrMsgInfo[11] = strGlobalNo;	//strGlobalNo - 추가정보
	arrMsgInfo[12] = strOpenType;	//strOpenType - 추가정보 팝업창 형태(D:Dialog, O:Open)
	arrMsgInfo[13] = closeflag;
	
	
	return this._gfn_openMsgPop(arrMsgInfo);
};

/**
 * @class      	메세지 Format 에 따라 실 메세지를 생성한다.
 * @param       {string} strFormat {}가 포함된 메세지
 * @param       {string|array} strOrArrArg 발생상황 문장에 필요한 인자로 사용되는 문자열의 배열이나 콤마로 구분된 문자열리스트
 * @return      {string} 세부메세지 적용된 메세지 결과
 */
LIB_FORM.gfn_getFormatString = function(strFormat, strOrArrArg) 
{
  //2015.09.11 치환대상은 있지만 대체 문자열은 없을때 처리용.
	if(this.gfn_isNull(strOrArrArg)) {
	  strFormat = nexacro.replaceAll(strFormat, "${}", "");
	  return strFormat;
	}   
	
	var arrArg;
	
	if ( typeof(strOrArrArg) == "string")
	{
		arrArg = strOrArrArg.split(",");
	}
	else
	{
		arrArg = strOrArrArg;
	}
	var	strRtn = "";
	var arrFormat = strFormat.split("${}");
	
	// 치환 대상이 없을 경우(N-STEP에는 없음)
	if(arrFormat.length == 1) 
	{
		strRtn = strFormat + "-" + strOrArrArg;
		return strRtn;
	}
	
	// 치환 대상이 있을 경우
	for (var i = 0; i < arrFormat.length; i++)
	{
		if (arrArg.length > i)
			//strRtn += this.gfn_trim(arrFormat[i]) + this.gfn_trim(arrArg[i]);
			strRtn += arrFormat[i] + arrArg[i];
		else
			//strRtn += this.gfn_trim(arrFormat[i]);
			strRtn += arrFormat[i];
	}
	return strRtn;
};

/**
 * @class      	실제 메세지 창 호출 - 개발자 미사용 함수
 * @param       {array} arrMsgInfo 메세지 정보
 * @return      {*} 팝업에서 호출되는 return 
 */
LIB_FORM._gfn_openMsgPop = function(arrMsgInfo)
{
    var nCnt           = arrMsgInfo.length;
	var strType        = (nCnt > 0 ? this.gfn_trim(arrMsgInfo[0]) : "");
	var strTitle       = (nCnt > 1 ? this.gfn_trim(arrMsgInfo[1]) : "");
	var strStatus      = (nCnt > 2 ? this.gfn_trim(arrMsgInfo[2]) : "");
	var strCause       = (nCnt > 3 ? this.gfn_trim(arrMsgInfo[3]) : "");
	var strShowType    = (nCnt > 4 ? this.gfn_trim(arrMsgInfo[4]) : "");
	var sPopupCallback = (nCnt > 5 ? this.gfn_trim(arrMsgInfo[5]) : "");
	var strMsgId       = (nCnt > 6 ? this.gfn_trim(arrMsgInfo[6]) : "");
	var strMsgSubject  = (nCnt > 7 ? this.gfn_trim(arrMsgInfo[7]) : "");
	var strMsgStatus   = (nCnt > 8 ? this.gfn_trim(arrMsgInfo[8]) : "");
    var strSolution    = (nCnt > 9 ? this.gfn_trim(arrMsgInfo[9]) : "");
	var strServiceId   = (nCnt > 10 ? this.gfn_trim(arrMsgInfo[10]) : "");
	var strGlobalNo    = (nCnt > 11 ? this.gfn_trim(arrMsgInfo[11]) : "");
	var strOpenType    = (nCnt > 12 ? this.gfn_trim(arrMsgInfo[12]):  "");
	var bCloseFlag     = arrMsgInfo[13];

	var strFormInfo;
	
    //---------------------------------------------
    //2. 메세지팝업스타일
    //---------------------------------------------
	var openStyle = "TitleBar=false CloseFlag=false AutoSize=false";
	var strIcon   = "alert_information";
	var FormObj;

	var objForm = this.getOwnerFrame().form;

    //---------------------------------------------
    //3. 메세지 타이틀
    //---------------------------------------------
	if (this.gfn_isNull(strTitle)) strTitle = this.titletext;

    //----------------------------------------------------------------------------------
    //4. 메세지 icon 설정 strType: S-system error, E-error, Q-question, I-information
    //----------------------------------------------------------------------------------
	switch((strType).toUpperCase())
	{
		case "I":
			strIcon   	= "alert_information";
			strFormInfo = objForm.titletext + ":" + objForm.name;
			break;
		case "E":
			strIcon   	= "alert_error";
			strFormInfo = objForm.titletext + ":" + objForm.name;
			break;
			
	    case "Q":
	        strIcon   = "alert_question";
	        break;
	}
    //---------------------------------------------
    //5. 문자열에 따른 높이 지정
    //---------------------------------------------
	//var nHeight = this._gfn_getShowMsgBoxHeight(strStatus, strCause, strSolution);	
	//if (strType == "E") nHeight	+= 14 + 10;	//에러폼과 서비스 표시용 > 수치는 n-step용으로 변경예정

	// 줄바꿈 문자 \n를 줄바꿈으로 치환
	while(strStatus.indexOf("\\n") > -1)
	{
		strStatus = strStatus.replace("\\n", String.fromCharCode(10));
	}
	
    //---------------------------------------------
    //6. arg 셋팅
    //---------------------------------------------
	var oArg = {fa_strTitle			:strTitle
			  , fa_strStatus		:strStatus
			  , fa_strCause			:strCause
			  , fa_strSolution		:strSolution
			  , fa_strIconImageId	:strIcon
			  , fa_strButtonType	:strShowType
			  , fa_strType			:strType
			  , fa_strFormInfo		:strFormInfo
			  , fa_strSvcInfo		:strServiceId
			  , fa_strGlobalNo		:strGlobalNo
			  , FC_FORM_TYPE		:"ESCCLOSE"	  // Esc 닫기 용도로 사용
			  , fa_bCloseFlag       : bCloseFlag  // 자동Close여부 2015.06.23 기능추가 
				};	
    
    // 팝업 설정
    var sOption = "title=true";
 	// sOption = "height="+nHeight; //key:value	
    // sOption += "height="+nHeight+",modeless:true";	//모달리스
    
	var sMergeMsg = strStatus;
	if(this.gfn_isNull(strCause) == false) sMergeMsg = sMergeMsg + "\n" + strCause;	

	//var sOption = "popupType=modalsync"; //key:value
	// (modalsync -> modalwindow) 변경처리 함
	var sOption = "popupType=modal"; //key:value


	var isMsgBox = "";
	
	//showmodalwindow가 중앙에 위치하지 않는 문제. 임시대응용.
	var gEmbedFlag = application.G_EMBEDFLAG;
	if( !this.gfn_isEmpty(gEmbedFlag) && (gEmbedFlag.indexOf("ICIS") > -1) ) {	 
		isMsgBox = true;
	}		

	// 메시지 팝업
	if (strType == "Q") 
	{
		this.gfn_openPopup(strMsgId, "CCP::UCCP_MSG.xfdl", oArg, sOption, sPopupCallback, isMsgBox);
        return this.gfn_getVariable("MSG_POPUP_RETURN_VALUE_");
	}
	this.gfn_openPopup(strMsgId, "CCP::UCCP_MSG.xfdl", oArg, sOption, sPopupCallback, isMsgBox);
};

/**
 * @class      	메시지 코드에 해당 하는 메시지 정보를 구한다.
 * @param       {string} strMsgId 메시지테이블에 존재하는 메시지 ID
 * @param       {string} strColumnName 메시지테이블 칼럼명
 * @param       {boolean} bRow GDS ROW 반환여부
 * @return      {string|number} bRow 여부에 따라 메세지 또는 ROW
 */
LIB_FORM.gfn_getMsgData = function(strMsgId, strColumnName, bRow) 
{
	if(this.gfn_isNull(strColumnName)) strColumnName = "MSG_NAME";
	
	// 메세지데이터가 없으면 최초 로딩을 한다. (FRAME에 선전환용 공통 메시지 존재하여 10건 이내로 조정)
	if( application.GDS_MESSAGE.getCountNF() < 10 && application.G_SYS_GUBUN != "C")
	{
	    this.gfn_loadMsgData();
	}
	
	var nRow = application.GDS_MESSAGE.findRow("MSG_ID", strMsgId);
	if( nRow < 0 ) 
	{
        // TOBE:: 추후 서버에서 건바이건으로 서버에서 데이터를 읽어온다. 	    
        {
            // 추후 서비스개발완료시 작업예정 
        }
	
		nRow = application.GDS_MESSAGE.findRow("MSG_ID", strMsgId);		
		if(nRow < 0) 
		{
            if(bRow == true)   
                return -1;
            else                
                return null;
		}
	}

    if (bRow == true)   return nRow;
    else                return application.GDS_MESSAGE.getColumn(nRow, strColumnName);
};


/**
 * @class      	Dataset 여부 체크. 기존에 this.gfn_isDataset이 존재해서 다른이름을 사용함.
 * @param       {object} ds Dataset
 * @return      {boolean} 
 */
LIB_FORM.gfn_isDataset2 = function(ds) 
{
	if( (!this.gfn_isNull(ds)) && (ds["toString"]) && (ds.toString() == "[object Dataset]") ) {
		return true;
	} else {
		return false;
	}
}

/**
 * @class      	ModalSync 팝업 닫고 Global Valiable(GV_POPRTN, GDSL_M_POPUP)에 값 설정 
 * @param       {object} obj - boolean, String, number, Object(Array, Dataset)
 * @return      N/A
 */
LIB_FORM.gfn_closePopup = function(rtnval) 
{
    var strPopupID = "";
    
    try
    {
        var strPopupID = application.getActiveForm().getOwnerFrame().name;
    }
    catch(e)
    {
        var parentobj = this;
        while(true)
        {
            var parenttype = parentobj.valueOf()+"";
            if( parenttype.indexOf("ChildFrame") != -1 )
            {
                strPopupID = parentobj.name;
                break;
            }
            parentobj = parentobj.parent;
        }
    }

    // 리턴값이 여러개가 아닌 단일 Object 일경우는 그값을 그대로 설정
    if( arguments.length == 1 )
    {		
		if( this.gfn_isDataset2(rtnval) ) {
			var rtnDataset = new Dataset();
			rtnDataset.assign(rtnval);
			rtnval = rtnDataset;
		}		
		
        this.gfn_setVariable(strPopupID+"_POPUP_RETURN_VALUE_",     rtnval);
        this.gfn_setVariable(strPopupID+"_POPUP_RETURN_VALUE_ARGC", 1);
    }
    // 리턴값이 여러개일경우는 여러개를 그대로 []로 넘긴다. 
    else
    {
        this.gfn_setVariable(strPopupID+"_POPUP_RETURN_VALUE_",     arguments);
        this.gfn_setVariable(strPopupID+"_POPUP_RETURN_VALUE_ARGC", arguments.length);
    }
        
	this.close();
}

/**
 * @class   gfn_setUrl() 을 통한 Div Link시 DIV의 화면에서 gfn_initForm() 처리시에 div.set_url 로 처리하면서 파라미터 및 콜백함수에 대한 호출처리를 
 *          설정하기위한 공통내부적인 처리함수이다.(개발자사용금지)
 *
 * @param   {Object} 화면초기화 FORM Object
 * @return  N/A
 * @author
 */
LIB_FORM._gfn_callbackDivSetURL = function(obj)
{
    var divform;  
// trace("obj.name--->" + obj.name);
// trace("obj.url--->" + obj.url);

    try
    {
        var comp = obj.parent.components;

//trace("comp.length--->" + comp.length);
        
        for(var i=0;i<comp.length;i++)
        {
            if( comp[i].valueOf() == "[object Div]" )
            {
                 //----------------------------------------------
                 if(comp[i].components.length == 0) continue;
                 //----------------------------------------------
// trace("  comp[i].name--->" + comp[i].name);
// trace("  comp[i].components length--->" + comp[i].components.length );
// trace("  comp[i].components[0]--->" + comp[i].components[0].name);
// trace("  comp[i].components[0].parent--->" + comp[i].components[0].parent.name);

                //현재 div 에 포함되어있는 컴포넌트 0번째의 parent
                if( comp[i].components[0].parent == obj )
                {
//trace("  comp[i].components[0].parent == obj--->" + comp[i].components[0].name);
                    divform = comp[i];
                    break;
                }
            }
        }
    }
    catch(e)
    {
        var comp = obj.components;
        for(var i=0;i<comp.length;i++)
        {
            if( comp[i].valueOf() == "[object Div]" )
            {
                if( comp[i].components[0].parent == obj )
                {
                    divform = comp[i];
                    break;
                }
            }
        }
    }


    // gfn_setUrl 로 호출된경우에 콜백처리 및 변수를 설정해준다. 
    if( !this.gfn_isNull(divform) )
    {
	    //----------------------------------------------
        //null check 삽입
        if(this.gfn_isNull(divform.text)==true) 
        {
			//trace("요기");
			return;
        }
        if(divform.text=="div_main(해당 페이지가 존재하지 않습니다)") 
        {
			//trace("요기-->" + divform.text);
			return;
        }
	    //----------------------------------------------
        
        try
        {
            var seturlobj = JSON.parse(divform.text);
            var callback  = seturlobj.callback;
            var argument  = seturlobj.argument;
            var target    = seturlobj.target;                    
            divform.set_text("");
            
            // 기본적으로 로컬의 함수를 호출한다. 
            if( this.gfn_isNull(target) ) target = "local";
            
            // Div.setUrl 화면에다 변수를 설정한다. 
            if( !this.gfn_isNull(argument) )
            {
                if( this.gfn_getVarType(argument) == "STRING" )
                {
                    argument = this.gfn_getNexacroArguments(argument);            
                    for(varname in argument)
                    {
                        obj[varname] = argument[varname];
                    }                
                }
                else
                {
                    for(varname in argument)
                    {
                        obj[varname] = argument[varname];
                    }                
                }            
            }
            
            // 콜백함수를 호출처리한다. 
            if( !this.gfn_isNull(callback) )
            {        
                // 혹시라도 parent창의 함수를 호출  이부분에서 DIV 가 그 상위에 또다른 DIV가 있을수있고 그럼 아래의 로직에서 좀더
                // form 을 찾는 수고가 발생을 할수있다. 
                if( target == "local" )
                {
                    var parentcallback = callback.split("=")[0];
                    eval("divform.parent."+parentcallback+"();");
                }
                // DIV창의 함수를 호출
                else
                {
                    var divcallback = callback.split("=")[0];            
                    eval("obj."+divcallback+"();");
                }                
            }        
        }
        catch(e)
        {
            // gfn_setUrl 로 호출이 안된건 JSON.parse에서 삑사리남..        
        }
    }
    else
    {
		//trace("divform null 이넹");
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 메뉴 관련 메소드
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @class      	메뉴 open.
 * @param       {string} menuId 메뉴 pk code
 * @param       {string} menuNm 메뉴명
 * @param       {string} engNm 영문 메뉴명
 * @param       {string} pageUrl 메뉴 url page
 * @param       {string} upCd 상위 code
 * @param       {string} lev  선택된 menu level
 * @return      {} N/A
 */
LIB_FORM.gfn_menuOpen = function(menuId, menuNm, engNm, pageUrl, upCd, lev)
{
	if (this.gfn_isNull(pageUrl))
	{
		//alert("메뉴정보가 없습니다. \n다시 확인 바랍니다.!");
		this.gfn_showMsgBox("err", "메뉴정보가 없습니다. \n다시 확인 바랍니다.!");
		return;
	}
	
	var workFrame = application.av_WorkFrameSet;
		
	if (application.GDS_OPENMENU.findRow("MENU_CD", menuId) > -1)
	{
		workFrame.frames[menuId].form.setFocus();
		this.gfn_activeNavi(menuId);	// tab menu 변경
		return false;
	}
	
	var limiteMenuCnt = 10;
	if (application.GDS_OPENMENU.rowcount > limiteMenuCnt)
	{
		this.gfn_showMsgBox("err", "최대 ["+(limiteMenuCnt)+"]개 이상 메뉴를 열수 없습니다. \n다시 확인 바랍니다.!");
		return;
	}
	
	var objNewWin = new ChildFrame;
	var strTitle = "";
	
	objNewWin.init(menuId, "absolute", 0, 0, workFrame.getOffsetWidth() - 0, workFrame.getOffsetHeight() - 0);

	objNewWin.arguments = [];
 
	objNewWin.set_openstatus("maximize");
	
	workFrame.addChild(menuId, objNewWin);
	
	objNewWin.set_formurl("FRM::FRM_WORK.xfdl");
	objNewWin.set_dragmovetype("all");
	objNewWin.set_showtitlebar(false);
	objNewWin.set_resizable(true);
	objNewWin.set_openstatus("maximize");
	objNewWin.arguments["winKey"]   =  menuId;
	objNewWin.arguments["menuId"]   =  menuId;
	objNewWin.arguments["menuNm"]   =  menuNm;
	objNewWin.arguments["engNm"]    =  engNm;
	objNewWin.arguments["pageUrl"]  =  pageUrl;
	objNewWin.arguments["upCd"]  	=  upCd;
	objNewWin.arguments["lev"]  	=  lev;

	objNewWin.show();
};


/**
 * @class      	선택한 메뉴 활성화.
 * @param       {string} winId 메뉴 code
 * @return      {} N/A
 */
LIB_FORM.gfn_activeWin = function(menuId)
{
	var workFrame = application.mainframe.VFrameSet.BottomVFrameSet.WorkFrameSet.frames;

	if(workFrame[menuId])
	{
		workFrame[menuId].form.setFocus();
	}
};


/**
 * @class      	열린 메뉴 데이터 저장.
 * @param       {string} winId 메뉴 code
 * @param       {string} menuId 메뉴 code
 * @return      {} N/A
 */
LIB_FORM.gfn_openAddMenu = function (winId, menuId) 
{
	var nRow = application.GDS_MENU.findRow("MENU_CD", winId);
	var curRow = application.GDS_OPENMENU.addRow();
	
	application.GDS_OPENMENU.setColumn( curRow, "MENU_CD", application.GDS_MENU.getColumn(nRow, "MENU_CD") );
	application.GDS_OPENMENU.setColumn( curRow, "MENU_NM", application.GDS_MENU.getColumn(nRow, "MENU_NM") );
	application.GDS_OPENMENU.setColumn( curRow, "ENG_MENU_NM", application.GDS_MENU.getColumn(nRow, "ENG_MENU_NM") );
	application.GDS_OPENMENU.setColumn( curRow, "PGM_ID", application.GDS_MENU.getColumn(nRow, "PGM_ID") );
	application.GDS_OPENMENU.setColumn( curRow, "UP_CD", application.GDS_MENU.getColumn(nRow, "UP_CD") );
};


/**
 * @class      	탭 매뉴 페이지 생성.
 * @param       {string} winId 탭 메뉴 page id
 * @param       {string} naviNm 탭 메뉴 명
 * @return      {} N/A
 */
LIB_FORM.gfn_setNaviAdd = function (winId, naviNm)
{
	var tabNavi = application.mainframe.VFrameSet.BottomVFrameSet.BottomFrame.form.tab_navi;
	
	var tPageIdx = application.GDS_OPENMENU.rowcount;
	tabNavi.insertTabpage(winId, tPageIdx, "", naviNm);
};


/**
 * @class      	변경된 메뉴 탭 네비 index 변경.
 * @param       {string} winId 메뉴 code
 * @return      {} N/A
 */
LIB_FORM.gfn_activeNavi  = function (menuId)
{
	var tabNavi = application.mainframe.VFrameSet.BottomVFrameSet.BottomFrame.form.tab_navi;
	  
	for (var i=0; i < tabNavi.tabpages.length; i++)
	{
		if (tabNavi.tabpages[i].name == menuId)
		{
			tabNavi.set_tabindex(i);
		}
	}
};


/**
 * @class      	선택된 메뉴 Navi 설정
 * @param       {string} menu code
 * @param       {number} level
 * @return      {} N/A
 */
LIB_FORM.gfn_setNaviCombo = function(menuCd, lev)
{
	if(this.ds_loc1.rowcount == 0)
	{
		this.ds_loc1.clearData();
		this.ds_loc2.clearData();
		this.ds_loc3.clearData();
		
		application.GDS_MENU.set_enableevent(false);
		application.GDS_MENU.filter( "CD_LEV == '1'");
		this.ds_loc1.copyData(application.GDS_MENU, true);
		
		application.GDS_MENU.filter( "CD_LEV == '2'");
		this.ds_loc2.copyData(application.GDS_MENU, true);
		
		application.GDS_MENU.filter( "CD_LEV == '3'");
		this.ds_loc3.copyData(application.GDS_MENU, true);
		
		application.GDS_MENU.filter("");
		application.GDS_MENU.set_enableevent(true);
	}
	
	var evalDs;// = eval("this.ds_loc"+lev);
	var evalCmb;// = eval("this.div_localArea.cmb_lev"+lev);
	
	var nRow;// = evalDs.findRow("MENU_CD", menuCd);
	var UP_CD;// = evalDs.getColumn(nRow, "UP_CD");
	var MENU_CD;// = evalDs.getColumn(nRow, "MENU_CD");
	
	MENU_CD = menuCd;
	
	for(var i = lev; 0 < i; i--)
	{
		evalDs = eval("this.ds_loc"+i);
		evalCmb = eval("this.div_localArea.cmb_lev"+i);
		
		nRow = evalDs.findRow("MENU_CD", MENU_CD);
		UP_CD = evalDs.getColumn(nRow, "UP_CD");
		MENU_CD = evalDs.getColumn(nRow, "MENU_CD");
		evalCmb.set_value(MENU_CD);
		
		evalDs.filter("UP_CD == '"+ UP_CD +"'");
		
		MENU_CD = UP_CD;
		evalCmb.MENU_CODE 	= evalCmb.value;
		evalCmb.UP_CD		= UP_CD;
		evalCmb.set_visible(true);
	}
};


/**
 * @class      	현재 화면 Navi 그대로 유지.(최대 lev 는 3(변경될 수 있음))
 * @param       {object} Navi dataset
 * @param       {string} menu code
 * @param       {number} level
 * @return      {} N/A
 */
LIB_FORM.gfn_workMenuOpen = function(objDs, menuCd, lev)
{
	var nRow 		= objDs.findRow( "MENU_CD", menuCd );
	var MENU_CD 	= objDs.getColumn( nRow, "MENU_CD" );
	var MENU_NM 	= objDs.getColumn( nRow, "MENU_NM" );
	var ENG_MENU_NM = objDs.getColumn( nRow, "ENG_MENU_NM" );
	var PGM_ID 		= objDs.getColumn( nRow, "PGM_ID" );
	var UP_CD 		= objDs.getColumn( nRow, "UP_CD" );
	
	this.gfn_previousNevi(3);	// 현재 화면 Navi 그대로 유지(현재 lev = 3)
	
	this.gfn_menuOpen(MENU_CD, MENU_NM, ENG_MENU_NM, PGM_ID, UP_CD, lev);
};


/**
 * @class      	현재 화면 Navi 그대로 유지.(최대 lev 는 3(변경될 수 있음))
 * @param       {string} lev 최대 lev 까지
 * @return      {} N/A
 */
LIB_FORM.gfn_previousNevi = function(lev)
{
	var evalDs;
	var evalCmb;
	
	for(var i = lev; 0 < i; i--)
	{
		evalDs = eval("this.ds_loc"+i);
		evalCmb = eval("this.div_localArea.cmb_lev"+i);
		
		evalDs.filter("UP_CD == '"+ evalCmb.UP_CD +"'");
		evalCmb.set_value(evalCmb.MENU_CODE);
		
		if(!this.gfn_isNull(evalCmb.MENU_CODE))
		{
			evalCmb.set_visible(true);
		}
		
		//trace(evalCmb.MENU_CODE + "   " + evalCmb.UP_CD);
	}
};

/**
 * @class      	현재 화면 닫기
 * @return      {} N/A
 */
LIB_FORM.gfn_close = function(obj, e)
{
	this.close();
};