/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_GRID
*  @Creator 송원창
*  @CreateDate 2016.04.15 
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline Grid 관련 공통 함수 모음 
*  @Desction 
* 			1) Grid 관련 공통 함수 모음  
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15      송원창             최초 생성
*******************************************************************************
*/

var LIB_GRID = nexacro.Form.prototype;

LIB_FORMAT.G_GRID_APPEND_START_ROW = "dbRetvSeq";      // 페이징처리 시작번호 
LIB_FORMAT.G_GRID_APPEND_PAGESIZE  = "dbRetvCascnt";   // 페이징처리 사이즈


/**
 * @class      	서비스호출후 결과가 없을때 그리드에 "결과가 없습니다"라는 표시
 * @param 		{component} objGrid Format을 제거할 Grid
 * @param 		{boolean}	메시지 여부
 * @return 		{boolean}	데이타존재여부
 */   
LIB_FORMAT.gfn_setGridNoDataText = function(objGrid, bMsg) 
{
	if(this.gfn_isNull(bMsg)) bMsg = true;
	var objBindDs = objGrid.getBindDataset();
	
	if (objBindDs.getRowCount == 0 )
	{
		objGrid.set_nodatatext("No Data");
		if(bMsg == false) 
		{
			this.gfn_showMsgBox("검색된 결과가 없습니다."); // 검색된 결과가 없습니다.
		}
		return false;
	}

	objGrid.set_nodatatext("");
	return true;
};

/**
 * @class      	그리드의 Sort를 처리한다.
 * @param 		{object} Grid 그리드
 * @param 		{evnet}  e 클릭이벤트
 * @return 		N/A
 */
LIB_FORMAT.gfn_setGridSort = function(obj, e)
{
	// 컬럼의 정렬방식을 'head'의 text에 "↑,↓"여부로 판단.
	// 이미지로 대체 가능.

	var strType = obj.getCellProperty("head", e.cell, "displaytype");
	if (strType == "checkbox") 
	{
		return;
	}

	var bindDs = obj.getBindDataset();
	if (bindDs.rowcount == 0) 
	{
		return false;
	}

	var BodyColId = (obj.getCellProperty("body", e.col, "text")).toString().split(":");
	//bindDs.set_enableevent(false);
	for (var i = 0; i < obj.getCellCount("head"); i++) 
	{
		if (obj.getCellText(-1, i) == "undefined") 
		{
			continue;
		}

		var strHeadText = obj.getCellText(-1, i);

		if (i == e.cell) 
		{
			if (strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_ASC_MARK) 
			{
				obj.setCellProperty("head", i, "text", strHeadText.substr(0, strHeadText.length - 2) + this.GC_CONST_DESC_MARK);
				bindDs.set_keystring(("S:-" + BodyColId[1]));
			}
			else if (strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_DESC_MARK) 
			{
				obj.setCellProperty("head", i, "text", strHeadText.substr(0, strHeadText.length - 2));
				bindDs.set_keystring("");
			}
			else 
			{
				obj.setCellProperty("head", i, "text", strHeadText + this.GC_CONST_ASC_MARK);
				bindDs.set_keystring(("S:+" + BodyColId[1]));
			}
		}
		else 
		{
			// 정렬표시 삭제
			if (strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_ASC_MARK || strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_DESC_MARK) 
			{
				obj.setCellProperty("head", i, "text", strHeadText.substr(0, strHeadText.length - 2));
			}
		}
	}
};

/**
 * @class      	Sort Mark 제거
 * @param 		{object} Grid 그리드
 * @return 		N/A
 */
LIB_FORMAT.gfn_clearGridSortMark = function (objGrid)
{
	var nCellCnt = objGrid.getCellCount('head');
	var objDataset = objGrid.getBindDataset();
	
	// Dataset Sort Clear
	objDataset.set_keystring("");
	
	for (var i = 0; i < objGrid.getCellCount("head"); i++) 
	{
		if (objGrid.getCellText(-1, i) == "undefined") 
		{
			continue;
		}

		var strHeadText = objGrid.getCellText(-1, i);

		// 정렬표시 삭제
		if (strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_ASC_MARK || strHeadText.substr(strHeadText.length - 2) == this.GC_CONST_DESC_MARK) 
		{
			objGrid.setCellProperty("head", i, "text", strHeadText.substr(0, strHeadText.length - 2));
		}
	}
};

/**
 * @class      	Grid Head중 check box가 있을 경우, check box 클릭 이벤트 발생시 전체 row에 대한 check/uncheck 설정 함수
 * @param 		{object} Grid 그리드
 * @param 		{evnet}  e 클릭이벤트
 * @return 		N/A
 */
LIB_FORMAT.gfn_setGridCheckAll = function (obj, e)
{
	if (obj.readonly == true) 
	{
		return;
	}

	var strVal;
	var strChkCol;
	var dsObj;

	dsObj = this.gfn_getDataset(obj.binddataset);
	strChkCol = this.gfn_nvl(obj.getCellProperty("body", e.col, "text"), "");
	strChkCol = strChkCol.split("bind:").join("");

	var strType = obj.getCellProperty("head", e.cell, "displaytype");
	if (strType != "checkbox") 
	{
		return;
	}

	// Head셋팅
	strVal = obj.getCellProperty("head", e.cell, "text");
	if (this.gfn_isNull(strVal)) 
	{
		strVal = "0";
	}

	if (strVal == "0") 
	{
		obj.setCellProperty("head", e.cell, "text", '1');
		strVal = "1";
	}
	else 
	{
		obj.setCellProperty("head", e.cell, "text", '0');
		strVal = "0";
	}

	// Body셋팅
	dsObj.set_enableevent(false);
	for (var i = 0; i < dsObj.rowcount; i++) 
	{
		dsObj.setColumn(i, strChkCol, strVal);
	}
	dsObj.set_enableevent(true);
};

/**
 * @class      	그리드 헤더클릭 공통이벤트(전체체크, 소트 용 이벤트를 설정한다.)
 * @param 		{object} Grid 그리드
 * @param 		{evnet}  e 클릭이벤트
 * @return 		N/A
 */
LIB_FORMAT._gfn_commGrid_onheadclick = function (obj, e)
{
	if(e.row == -2) return;
	
	//전체 체크
	if(obj.getCellProperty("head", e.cell, "edittype") == "checkbox")
	{
		var cellCnt = obj.getFormatColCount();
		var index = obj.appendHeadRowIndex;
		
		if(e.subrow == index)
		{
			if(cellCnt > e.col)
			{
				val = obj.getCellProperty("head", e.cell, "text");
				obj.setCellProperty( "head", e.cell, "text", (val == "0" ? "1" : "0"));
			}
		}
		else
		{
			this.gfn_setGridCheckAll(obj,e);
		}
		
	}
	//소트
	else 
	{
		if(this.gfn_isNull(obj.u_useSort) || (!this.gfn_isNull(obj.u_useSort) && obj.u_useSort != "N"))
		{
			this.gfn_setGridSort(obj,e);
		}
	}
};

/**
 * @class Grid 컬럼제거 check Event Handler
 * @param {Grid} obj Event가 발생한 Grid Component
 * @param {GridClickEventInfo} e GridClickEventInfo
 */
LIB_FORMAT.headCheckDeleteColumnCheck = function(obj, e)
{
	var cellCnt = obj.getFormatColCount();
	var index = this.gfn_getUserProperty(obj, "appendHeadRowIndex");
	
	if(e.subrow == index)
	{
		if(cellCnt > e.col)
		{
			val = obj.getCellProperty("head", e.cell, "text");
			obj.setCellProperty( "head", e.cell, "text", (val == "0" ? "1" : "0"));
		}
	}
};

/**
 * @class      	그리드 우클릭 공통이벤트
 * @param 		{object} Grid 그리드
 * @param 		{evnet}  e 키이벤트
 * @return 		N/A
 */
LIB_FORMAT._gfn_commGrid_onrbuttondown = function (obj, e)
{
	var strBindDS = obj.binddataset;
	var objBindDS = this.gfn_getDataset(obj.binddataset);
	var strRButtonEvent;

	// RButton 클릭시 행, Cell 이동처리
	if(e.row > -1)
	{
		objBindDS.set_rowposition(e.row);
		obj.setCellPos(e.cell);
		obj.setFocus();
	}
};

/**
 * @class  body cell index로 binding 된 컬럼명을 얻어온다.
 * @param {Grid} grid 대상 Grid Component
 * @param {number} index body cell index
 * @return 		N/A
 */
LIB_FORMAT.gfn_getBindColName = function(grid, index)
{
	var text = "";
	var columnid = "";
	var subCell = grid.getCellProperty("body", index, "subcell");
	if ( subCell > 0 ) {
		text = grid.getSubCellProperty("body", index, 0, "text");
	} else {
		text = grid.getCellProperty("body", index, "text");
	}

	if ( !this.gfn_isEmpty(text) )
	{
		if ( text.search(/^BIND\(/) > -1 )
		{
			columnid = text.replace(/^BIND\(/, "");
			columnid = columnid.substr(0, columnid.length-1);
		}
		else if ( text.search(/^bind:/) > -1 )
		{
			columnid = text.replace(/^bind:/, "");
		}
	}
	return columnid;
};

/**
 * @class  	  그리드의 레코드건수표시를 설정한다. 
 *
 * @param    {Grid}   레코드건수를 표시할 대상 Grid Object
 * @param    {Static} 레코드건수를 표시할 대상 Static Object
 * @return 		N/A
 */
LIB_FORMAT.gfn_setGridCount = function(src, target)
{
    var dataset = src.getBindDataset();
    src.gridcount_object = target;
    dataset.bindgrid = src;
    
    if( this.gfn_isNull(target) ) return;
    
    // 최초 ROW 건수 표시 
    target.set_text("총 "+this.gfn_getFormatNumber(dataset.getRowCount())+" 건");
    
    // 데이터셋의 변경시 자동으로 건수처리
    dataset.addEventHandler
    (
        "onload",
        function(obj)
        {
            obj.bindgrid.gridcount_object.set_text("총 "+this.gfn_getFormatNumber(obj.getRowCount())+" 건");
        },
        this
    );
};

/**
 * @class      	그리드 공통팝업메뉴 POPUPDIV를 뛰운다. (개발자 사용금지)
 *
 * @param 		{GridObject}  Gird대상 Object
 * @return 		N/A
 */
LIB_FORMAT.gfn_popupGridCommonMenu = function(obj, e)
{
	var enablelist   = new Array();
	var defaultmenulist = ["copy", "paste", "sort", "find", "filter", "fix"];    
	var noneusemenulist = ["export", "import", "usergrid", "usercure"];    
	var menulist        = 
	{
		"copy"     : "IMG::img_grid_Rclick01.png, 복사",
		"paste"    : "IMG::img_grid_Rclick02.png, 붙여넣기",
		"sort"     : "IMG::img_grid_Rclick03.png, 정렬",
		"find"     : "IMG::img_grid_Rclick04.png, 찾기",
		"filter"   : "IMG::img_grid_Rclick05.png, 필터",
		"fix"      : "IMG::img_grid_Rclick06.png, 틀고정 초기화",
		"export"   : "IMG::img_grid_Rclick07.png, 엑셀 내려받기",
		"import"   : "IMG::img_grid_Rclick08.png, 엑셀 올리기",
		"usergrid" : "IMG::img_grid_Rclick09.png, 컬럼숨기기",
		"usercure" : "IMG::img_grid_Rclick10.png, 컬럼초기화"
	};

	var gridmenu = (obj.u_menu+"").toLowerCase();   
	 
	// 정의하지 않아도 기본적으로 처리해주는것들 처리 
	for(var i=0;i<defaultmenulist.length;i++)
	{
		// 사용하지 않겠다가 아니면 사용목록에 추가
		if( gridmenu.indexOf("!"+defaultmenulist[i]) == -1 )
		{
			enablelist.push(defaultmenulist[i]);
		}
	}

	// 반드시 정의해줘야하는것들은 있어야 처리해준다. 
	for(var i=0;i<noneusemenulist.length;i++)
	{
		// 사용하지 않겠다가 아니면 사용목록에 추가
		if( gridmenu.indexOf(noneusemenulist[i]) != -1 )
		{
			enablelist.push(noneusemenulist[i]);
		}
	}

	var popupdiv = this.lookup("GRID_COMM_POPUPDIV");
	if( this.gfn_isNull(popupdiv) )
	{
		popupdiv = new PopupDiv("GRID_COMM_POPUPDIV", "absolute");
		this.addChild("GRID_COMM_POPUPDIV", popupdiv);                 
		popupdiv.set_width(144);
		popupdiv.set_scrollbars("none");
		popupdiv.style.set_bordertype("normal 0 0"); 
		popupdiv.style.set_background("white");          
		popupdiv.show(); 
		
		// 팝업메뉴의 Grid를 동적생성한다. 
		var popup_gridmenu = new Grid("popup_grid", "absolute");
		popupdiv.addChild("popup_grid", popup_gridmenu);  
		popup_gridmenu.set_left(0);
		popup_gridmenu.set_top(0);
		popup_gridmenu.set_width(144);
		popup_gridmenu.set_height(220);
		popup_gridmenu.set_scrollbars("none");
		popup_gridmenu.show();
		
		// Object 매핑처리 
		popup_gridmenu.target_grid = obj;
		popup_gridmenu.popupdiv    = popupdiv;
		
		popup_gridmenu.addEventHandler("oncellclick", this.gfn_processPopupMenu, this);        

		// 데이터셋의 동적생성 및 목록을 만든다. 
		var popup_dataset = new Dataset();
		popupdiv.addChild("popup_dataset", popup_dataset);  
		popup_dataset.set_name("popup_dataset");        
		popup_dataset.addColumn("id",   "string");
		popup_dataset.addColumn("icon", "string");
		popup_dataset.addColumn("txt",  "string");
		popup_dataset.addColumn("show", "string");        
		
		for(name in menulist)
		{
			var nrow = popup_dataset.addRow();
			popup_dataset.setColumn(nrow, "id",   name    );
			popup_dataset.setColumn(nrow, "icon", menulist[name].split(",")[0].trim());
			popup_dataset.setColumn(nrow, "txt",  menulist[name].split(",")[1].trim());
			popup_dataset.setColumn(nrow, "show", "Y"     );        
		}
		
		var format = "";
		format += '<Formats>';
		format += '<Format id="default">';
		format += '  <Columns>';
		format += '    <Column size="30" />';
		format += '    <Column size="118" />';
		format += '  </Columns>'; 
		format += '  <Rows>';
		format += '    <Row size="22" />';
		format += '  </Rows>';
		format += '  <Band id="body">';
		format += '    <Cell displaytype="image" style="align:center&#32;middle;padding:0&#32;0&#32;0&#32;0;background:#ddddddff;background2:#ddddddff;selectbackground:#ddddddff;" text="bind:icon"/>';
		format += '    <Cell col="1" style="align:left;padding:0&#32;0&#32;0&#32;7;" text="bind:txt"/>';
		format += '  </Band>';
		format += '</Format>';
		format += '</Formats>';
		
		popup_gridmenu.set_formats(format);
		popup_gridmenu.set_binddataset(popup_dataset);    
		popup_gridmenu.set_cssclass("grd_WF_Popup");    
	}
	else
	{
		var popup_dataset = popupdiv.lookup("popup_dataset");
		popup_dataset.clearData();
		
		for(name in menulist)
		{
			var nrow = popup_dataset.addRow();
			popup_dataset.setColumn(nrow, "id",   name    );
			popup_dataset.setColumn(nrow, "icon", menulist[name].split(",")[0].trim());
			popup_dataset.setColumn(nrow, "txt",  menulist[name].split(",")[1].trim());
			popup_dataset.setColumn(nrow, "show", "Y"     );
		}
	}


	// 그리드의 크기를 재설정
	var popup_gridmenu = popupdiv.lookup("popup_grid");
	popup_gridmenu.set_height(enablelist.length*22);

	// Object 매핑처리 
	popup_gridmenu.target_grid = obj;
	popup_gridmenu.popupdiv    = popupdiv;

	// 처리 항목 필터링 처리 
	var popup_dataset = popupdiv.lookup("popup_dataset");
	for(var i=0;i<popup_dataset.getRowCount();i++)
	{
		popup_dataset.setColumn(i, "show", "N");    
	}


	// 그리드의 필터에 대한 설정상태를 표현해준다.
	var filterrow = popup_dataset.findRow("id", "filter");
	if( filterrow != -1 )
	{
		if( !this.gfn_isNull(obj.getBindDataset().filterstr) )
			popup_dataset.setColumn(filterrow, "txt", "필터 (적용중)");
		else
			popup_dataset.setColumn(filterrow, "txt", "필터");
	}

	// 그리드의 정렬에 대한 설정상태를 표현해준다.
	var sortrow = popup_dataset.findRow("id", "sort");
	if( sortrow != -1 )
	{
		if( !this.gfn_isNull(obj.getBindDataset().keystring) )
			popup_dataset.setColumn(sortrow, "txt", "정렬 (적용중)");
		else
			popup_dataset.setColumn(sortrow, "txt", "정렬");
	}

	// 그리드의 틀고정에 대한 설정상태를 표현해준다.
	var fixrow = popup_dataset.findRow("id", "fix");
	if( fixrow != -1 )
	{
		var fixflag = false;
		for(var i=0;i<obj.getCellCount("Body");i++)
		{
			if( obj.getFormatColProperty(i, "band") != "body" )
			{
				fixflag = true;
			}
		}
		
		if( fixflag == true )
			popup_dataset.setColumn(fixrow, "txt", "틀고정 초기화");
		else
			popup_dataset.setColumn(fixrow, "txt", "틀고정");
	}

	// 그리드의 정렬에 대한 설정상태를 표현해준다. 
	var usergridrow = popup_dataset.findRow("id", "usergrid");   
	if( usergridrow != -1 )
	{
		if( !this.gfn_isNull(obj.usergrid) )
		{
			obj.usergrid = false;
			popup_dataset.setColumn(usergridrow, "txt", "컬럼숨기기 실행");
		}
		else
		{
			obj.usergrid = "";
			popup_dataset.setColumn(usergridrow, "txt", "컬럼숨기기");
		}
	}

	// 그리드의 현재 마우스 Over된 상태의 셀INDEX를 설정한다.     
	obj.currentmouseovercellindex = e.cell;
	obj.currentmouseovercol       = e.col;    

	// 사용하는것만 필터링한다. 
	for(var i=0;i<enablelist.length;i++)
	{
		popup_dataset.setColumn( popup_dataset.findRow("id", enablelist[i]), "show", "Y");
	}
			
	popup_dataset.filter("show=='Y'");
	popup_dataset.set_rowposition(-1);

	popupdiv.set_width(144);
	popupdiv.set_height(enablelist.length*22 + 3);   

	// 팝업 type을 구해서 위치값 지정
	var popUpType = this.gfn_getChildFrameVariable("_CURRENT_POPUP_TYPE_");
		
	// modeless
	if(popUpType == "modeless" || popUpType == "modalwindow")
	{
		var ownForm = this.getOwnerFrame();	
		var nX = e.screenX - system.clientToScreenX(ownForm, 0);
		var nY = e.screenY - system.clientToScreenY(ownForm, 0);
	}
	// modal, modalSync	
	else {
		var nX = e.screenX - system.clientToScreenX(application.mainframe, 0);
		var nY = e.screenY - system.clientToScreenY(application.mainframe, 0);
	}

	// 로컬일 경우
	if( (application.xadl+"").indexOf("file://") != -1 )
	{
		popupdiv.trackPopup(nX, parseInt(nY)+84);
	}
	else
	{
		popupdiv.trackPopup(nX, nY);
	}
};

/**
 * @class      	그리드 공통팝업메뉴를 처리한다. (개발자 사용금지)
 *
 * @param 		{GridObject}  Gird대상 Object
 * @param 		{Event}       GridClickEvent
 * @return 		N/A
 */
LIB_FORMAT.G_GRID_CLIPBOARD_DATA = "";   // 클립보드를 사용하지 않고 전역변수를 사용한다. 보안상 이유로 
LIB_FORMAT.gfn_processPopupMenu = function(obj, e)
{
    var popupdataset  = obj.getBindDataset();
    var action        = popupdataset.getColumn(e.row, "id");
    var cell          = e.cell;
    var targetgrid    = obj.target_grid;
    var targetdataset = obj.target_grid.getBindDataset()
    var targetrow     = targetdataset.rowposition;
    var targetcell    = obj.target_grid.getCellPos();
     
    if( action == "copy" )
    {
        this.G_GRID_CLIPBOARD_DATA = targetgrid.getCellValue(targetrow, targetcell);    
    }
    else if( action == "paste" )
    {
        var edittype = targetgrid.getCellProperty("body", targetcell, "edittype");
        var bindinfo = targetgrid.getCellProperty("body", targetcell, "text");
        if( edittype != "none" )
        {
            if( this.gfn_isNull(this.G_GRID_CLIPBOARD_DATA) ) this.G_GRID_CLIPBOARD_DATA = "";
            
            // 데이터셋의 컬럼이 아니면 처리불가능
            if( bindinfo.toLowerCase().substring(0, 5) == "bind:" )
            {
                var bindcolum = bindinfo.substring(5);
                targetdataset.setColumn(targetrow, bindcolum, this.G_GRID_CLIPBOARD_DATA);
            }
        }
    }
    else if( action == "sort" )
    {
		var params  = {P_TARGET_GRID: targetgrid};
		//var sOption = "titletext=정렬,popupType=modeless,duprun=false";
		var sOption = "titletext=정렬,duprun=false";
		
		obj.popupdiv.closePopup();
		
		this.gfn_openPopup("GRID_SORT", "CCP::UCCP_GRID_SORT.xfdl", params, sOption);
	}
	else if( action == "find" )
	{
		var params  = {P_TARGET_GRID: targetgrid};
		//var sOption = "titletext=찾기,popupType=modeless";
		var sOption = "titletext=찾기";
		
		obj.popupdiv.closePopup();
		
		this.gfn_openPopup("GRID_FIND", "CCP::UCCP_GRID_FIND.xfdl", params, sOption);
	}
	else if( action == "filter" )
	{
		var params  = {P_TARGET_GRID: targetgrid};
		//var sOption = "titletext=필터,popupType=modeless";
		var sOption = "titletext=필터";
		
		obj.popupdiv.closePopup();
		
		this.gfn_openPopup("GRID_FIND", "CCP::UCCP_GRID_FILTER.xfdl", params, sOption);
	}
	else if( action == "fix" )
	{
		var fixflag = false;
		for(var i=0;i<targetgrid.getCellCount("Body");i++)
		{
			if( targetgrid.getFormatColProperty(i, "band") != "body" )
			{
				fixflag = true;
			}
		}

        // 틀고정 초기화(해제)
		if( fixflag == true )
		{
			for(var i=0;i<targetgrid.getCellCount("Body");i++)
			{
				targetgrid.setFormatColProperty(i, "band", "");
			}
		}
		// 현재셀을 기준으로 틀고정처리 
		else
		{
			var cellindex = targetgrid.currentmouseovercellindex;	//선택된 index
			this.gfn_excuFiexdColumn(targetgrid);
		}
	}
	else if( action == "import" )
	{
		this.gfn_excelUpload(targetgrid);
	}
	else if( action == "export" )
	{
		this.gfn_excelDownload(targetgrid);
	}
	else if( action == "usergrid" )
	{
		//if(targetgrid.usergrid)
		if( !this.gfn_isNull(targetgrid.usergrid) )
		{
			targetgrid.usergrid = "";
            popupdataset.setColumn(e.row, "txt", "컬럼숨기기");
			this.gfn_hideHeadAppendCustomGrid(targetgrid);  // 컬럼 제거 지우기
		}
		else
		{
			targetgrid.usergrid = false;
			this.gfn_showHeadAppendCustomGrid(targetgrid);
			
		}
	}
	else if( action == "usercure" )
	{
		this.gfn_excuColumnCure(targetgrid);
	}
    
    // 공통팝업 DIV 를 클로즈한다. 
    obj.popupdiv.closePopup();
};

/**
 * @class      	컬럼 초기화, 매뉴 초기화 (개발자 사용금지)
 * @param 		{GridObject}  Gird대상 Object
 * @return 		N/A
 */
LIB_FORMAT.gfn_excuColumnCure = function(grid)
{
	grid.usergrid = "";
	
	// 정보 초기화
	delete grid.appendHeadRowIndex;
	grid.set_formats(grid.orgformatstring);
	
};

/**
 * @class      	컬럼 숨기기 실행 (개발자 사용금지)
 * @param 		{GridObject}  Gird대상 Object
 * @param 		{Event}       GridClickEvent
 * @return 		N/A
 */
LIB_FORMAT.gfn_showHeadAppendCustomGrid = function(grid)
{
	// 컬럼 숨기기 사용안함
	//if (Eco.isEmpty(grid._useExtCustomCulumnGrid) || grid._useExtCustomCulumnGrid != 'Y') return;

	var index = grid.appendHeadRowIndex;
	if ( this.gfn_isNull(index) )
	{
		index = grid.appendContentsRow("head");

		// 추가된 head row index를 담아두어 제거시 사용
		grid.appendHeadRowIndex = index;

		this.gfn_arrangeAppendCustomGrid(grid);
	}
};

LIB_FORMAT.gfn_arrangeAppendCustomGrid = function(grid)
{
	var cellCnt = grid.getCellCount("head");
	var index = grid.appendHeadRowIndex;
	
	for(var i = 0; i < cellCnt; i ++)
	{
		if(grid.getCellProperty("head", i, "row") == index)
		{
			grid.setCellProperty( "head", i, "displaytype", "checkbox");
			grid.setCellProperty( "head", i, "edittype", "checkbox");
			grid.setCellProperty( "head", i, "text", "0");
		}
	}
};

/**
 * @class      	컬럼 제거 (개발자 사용금지)
 * @param 		{GridObject}  Gird대상 Object
 * @param 		{Event}       GridClickEvent
 * @return 		N/A
 */
LIB_FORMAT.gfn_hideHeadAppendCustomGrid = function(grid)
{
	// 컬럼 제거 사용안함
	//if (Eco.isEmpty(grid._useExtCustomCulumnGrid) || grid._useExtCustomCulumnGrid != 'Y') return;

	var index = grid.appendHeadRowIndex;
	if ( !this.gfn_isNull(index) )
	{
		var headCnt = grid.getCellCount("head");
		var colCnt = grid.getFormatColCount();
		var Hrow, Hcol, val;

		for(var i = headCnt-1; 0 <= i; i--)
		{
			Hrow 	= grid.getCellProperty("head", i, "row");
			val 	= grid.getCellProperty("head", i, "text");
			Hcol 	= grid.getCellProperty("head", i, "col");
			
		//trace(" Hrow "+ Hrow + " Hcol " + Hcol + " i " + i + " val " + val);
			if(Hrow == index)
			{
				if( val == "1")
				{
					trace(" Hrow "+ Hrow + " Hcol " + Hcol + " i " + i + " val " + val);
					
					grid.deleteContentsCol(Hcol);
				}
			}
		}
	
		grid.deleteContentsRow("head", index);

		// 정보 초기화
		delete grid.appendHeadRowIndex;
	}
};

/**
 * @class      	그리드 틀고정 (개발자 사용금지)
 * @param 		{GridObject}  Gird대상 Object
 * @param 		{Event}       GridClickEvent
 * @return 		N/A
 */
LIB_FORMAT.gfn_excuFiexdColumn = function(grid)
{
	var cellCnt = grid.getCellCount("Head");
	var pos = grid.currentmouseovercellindex;
	
	var ds = this.gfn_getUserProperty(this, "FiexdDataset");		// 틀고정될 dataset 값

	// Dataset, PopupMenu 는 Form에 유일하게 하나만 있으면 됨.
	if ( this.gfn_isNull(ds) )
	{
		// add popupmenu dataset
		ds = new Dataset();
		this.addChild("FiexdDataset", ds);

		ds.addColumn("row", "STRING");
		ds.addColumn("col", "STRING");
		ds.addColumn("colspan", "STRING");

		this.gfn_setUserProperty(this, "FiexdDataset", ds);
	}

	var nRow;	
	var colspan;
	var Hrow;
	
	ds.clearData();
	grid.set_enableevent(false);
	ds.set_enableevent(false);
	for(var i = 0; i < cellCnt; i++)
	{
		nRow 	= ds.addRow();
		Hrow 	= grid.getCellProperty("head", i, "row");
		
		col		= grid.getCellProperty("head", i, "col");
		colspan = grid.getCellProperty("head", i, "colspan");
		
		ds.setColumn(nRow, "col", col);
		ds.setColumn(nRow, "colspan", colspan);
	}
	
	colspan = 0;
	col = 0;
	var totCol = 0;
		
	for(var j = 0; j < ds.rowcount; j++)
	{		
		col = parseInt(ds.getColumn(j, "col"));
		colspan = parseInt(ds.getColumn(j, "colspan"));
		
		totCol = totCol + parseInt(colspan);
//		trace("pos: " + pos + "  colspan: " + colspan + "  col:" + col + "  totCol:" + totCol);
		
		if(pos <= col)
   		{
   			break;
   		}
	}
	
 	if(pos == parseInt(col))
 	{
 		totCol = totCol;
	}
	else if(pos < parseInt(col))
	{
		totCol = parseInt(col);
	}
	
 	for(var k = 0; k < totCol; k++)
 	{
 		grid.setFormatColProperty(k, "band", "left");
 	}
	
	grid.set_enableevent(true);
	ds.set_enableevent(true);
};

/**
 * @class      	엑셀다운로드 처리
 * @param 		{...}  엑셀다운로드할 Grid의 목록
 * @return 		N/A
 *
 *              예)
 *              this.gfn_excelDownload(this.grd_list);  // 그리드 한건만 처리할경우
 *              this.gfn_excelDownload(this.grd_searchCondition, this.grd_list); // 그리드 검색조건 + 그리드의 처리
 */
LIB_FORMAT.gfn_excelDownload = function(obj)
{
    var sFileName = "";	//아직 정해지지 않았음
    var sSheet = "";	//아직 정해지지 않았음
       
    
    var svcPrefix = "http://localhost:8080/";//application.gfn_getServicePrefix();
	//var sSvcUrl = svcPrefix+"XExportImport"; // 서버에서 xeni를 어떻게 설치했냐에 따라 경로가 달라짐
	var sSvcUrl = svcPrefix+"XExportImport.do"; // 서버에서 xeni를 어떻게 설치했냐에 따라 경로가 달라짐
	
	

  	var dToday = new Date();
	var oGrid;
	var sSheetName;

	if (!this.gfn_isNull(sFileName))
		sFileName = dToday.getTime() + "_" + sFileName;
	else
		sFileName = dToday.getTime();

	if (this.gfn_isNull(sSheet)) sSheet = "Sheet1";

//	application.set_usewaitcursor(true,true);

	var form = this;

	var exportObj = this.gfn_getUserProperty(form, "ExportExcelObject_Grid");	// ExcelExportObject - From에 하나만 생성
	if (this.gfn_isNull(exportObj))
	{
		exportObj = new ExcelExportObject(this.gfn_getUniqueId("xle_"), form);
//		exportObj.set_name();

		form.addChild(exportObj.name, exportObj);

		exportObj.addEventHandler("onerror", this._gfn_exportExcel_onerror, this);
		exportObj.addEventHandler("onsuccess", this._gfn_exportExcel_onsuccess, this);
		exportObj.addEventHandler("onprogress", this._gfn_exportExcel_onprogress, this);

		exportObj.set_exporttype(nexacro.ExportTypes.EXCEL2007);
		exportObj.set_exportuitype("exportprogress");
		exportObj.set_exporteventtype("itemrecord");
		exportObj.set_exportmessageprocess("%d [%d / %d]")

		this.gfn_setUserProperty(form, "ExportExcelObject_Grid", exportObj);
	}

	exportObj.clear();
	exportObj.set_exporturl(sSvcUrl);
	exportObj.set_exportfilename(sFileName);

//	form.setWaitCursor(true,true);

// Grid의 경우, Grid의 selecttype이 area,multiarea,treecell인 경우에는 enumExportHead 를 지정하더라도 head,summ이 출력되지 않는 문제때문에 순간 selecttype을 row로 바꿈
	var vGridSelectTypeBackup = new Array();

	var strType = obj.toString().toUpperCase();

	//if (strType == "[OBJECT GRID]") - 그리드를 array 건짜리로 넘길때는 Type이 [object Grid]로 나오고 있어 이렇게 코딩하면 안됨
	if(this.isArray(obj))
	{
	    for (var i=0; i<obj.length; i++)
	    {
	        sSheetName = sSheet[i];
	        oGrid = obj[i];
	        strType = oGrid.toString().toUpperCase();
	        if (strType == "[OBJECT GRID]")
	        {
				vGridSelectTypeBackup[i] = oGrid.selecttype;
				oGrid.set_selecttype('row');
				exportObj.addExportItem(nexacro.ExportItemTypes.GRID, oGrid,  sSheetName + "!A1", "allband");
			}
			else
			{
				vGridSelectTypeBackup[i] = "";
				trace("소스수정하세용~~~^^ gfn_excelDownload 함수호출 >>>>>>>>>> "+oGrid.name+"은 그리드가 아닙니다. ["+strType+"]입니다. 그리드만 지원합니다.");
			}
		}
	}
	else
	{
	    oGrid = obj;
		strType = oGrid.toString().toUpperCase();
		if (strType == "[OBJECT GRID]")
		{
			vGridSelectTypeBackup[0] = oGrid.selecttype;
			oGrid.set_selecttype('row');
			sSheetName = sSheet;			
			
			////////////////////////////////////////////////////////////////////////////////////////////
			// 컬럼의 해더색상을 넣어주기위해서 일부러 동적으로 만들어서 해더색상을 처리한다. 
			////////////////////////////////////////////////////////////////////////////////////////////
			
			// 해더의 갯수와 Row의 갯수를 개산한다.
			var rowcount   = oGrid.getBindDataset().getRowCount(); 
			var headercount= 1;
			
			// 해더의 총ROW수를 구한다.
			for(var i=0; i < oGrid.getCellCount("Head"); i++)
			{
				var headerrow = oGrid.getCellProperty("Head", i, "row");
				if( headercount < headerrow )
				{
					headercount = headerrow;
				}
			}			
			
			// 컬럼의 해더색상을 넣어주기위해서 일부러 동적으로 만들어서 해더색상을 처리한다. 
			var exportgrid = new Grid("excel_export_grid", "absolute");
			exportgrid.set_visible(false);
			this.addChild("excel_export_grid", exportgrid);                          
			exportgrid.set_formats(oGrid.getCurFormatString(false));
			exportgrid.set_formatid(oGrid.formatid);
			exportgrid.set_binddataset(oGrid.getBindDataset());    
			exportgrid.set_cssclass(oGrid.cssclass);    
			exportgrid.show();
			//exportgridlist.push(exportgrid);
			for(var k=0; k < exportgrid.getCellCount("Head"); k++)
			{
				exportgrid.setCellProperty("Head", k, "background", "#dddbff");
			}
			////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////
			
			exportObj.addExportItem(nexacro.ExportItemTypes.GRID, exportgrid,  sSheetName + "!A1", "allband");
		}
		else
		{
			vGridSelectTypeBackup[0] = "";
			trace("소스수정하세용~~~^^ gfn_excelDownload 함수호출 >>>>>>>>>> "+oGrid.name+"은 그리드가 아닙니다. ["+strType+"]입니다. 그리드만 지원합니다.");
		}
	}


	if (exportObj.count() > 0)
		var result = exportObj.exportData();

	if(this.isArray(obj))
	{
	    for (var i=0; i<obj.length; i++)
	    {
			if (vGridSelectTypeBackup[i] != "")
				obj[i].set_selecttype(vGridSelectTypeBackup[i]);
	    }
	}
	else
	{
		if (vGridSelectTypeBackup[0] != "")
			obj.set_selecttype(vGridSelectTypeBackup[0]);
	}
};

/*----------------------------------------------------------------------------------------------------
 *  Excel Export 성공 및 실패 여부 이벤트
 ----------------------------------------------------------------------------------------------------*/
LIB_FORMAT._gfn_exportExcel_onerror = function(obj, e)
{
//	this.setWaitCursor(false,true);

	//this.LibUtils_AlertWarning(this, "엑셀로 내보내기 실패\n ["+e.errorcode+"] "+ e.errormsg);
	trace("엑셀로 내보내기 실패\n ["+e.errorcode+"] "+ e.errormsg);

};

LIB_FORMAT._gfn_exportExcel_onsuccess = function(obj, e)
{
//	this.setWaitCursor(false,true);
	trace("엑셀로 내보내기 완료");
	this.removeChild("excel_export_grid");	//head에서 색상을 넣기 위해 동적으로 만든 그리드 remove
};

LIB_FORMAT._gfn_exportExcel_onprogress = function(obj, e)
{
};


/**
 * @class      	엑셀업로드 처리
 * @param 		{Grid Object}  objGrid - 엑셀업로드 처리할 대상 Grid
 * @return 		N/A
 *
 *              예)
 *              this.gfn_excelUpload(this.grd_list);  
 */
LIB_FORMAT.gfn_excelUpload = function(objGrid)
{
	var svcPrefix = "http://localhost:8080/";//application.gfn_getServicePrefix();
	//var sSvcUrl = svcPrefix+"XExportImport"; // 서버에서 xeni를 어떻게 설치했냐에 따라 경로가 달라짐
	var sSvcUrl = svcPrefix+"XExportImport.do"; // 서버에서 xeni를 어떻게 설치했냐에 따라 경로가 달라짐
	

	var importObj = this.gfn_getUserProperty(this, "ImportExcelObject_Grid");	// ExcelExportObject - From에 하나만 생성
	
	if (this.gfn_isNull(importObj))
	{
		importObj = new nexacro.ExcelImportObject(this.gfn_getUniqueId("xle_"), this);
		this.addChild(importObj.name, importObj);
		
		importObj.set_importtype(nexacro.ImportTypes.EXCEL2007);
		importObj.addEventHandler("onsuccess", this._gfn_excelImportObject_onsuccess, this);
		importObj.addEventHandler("onerror", this._gfn_excelImportObject_onerror, this);	
	}
	importObj.set_importurl(sSvcUrl);
	
	
	var binddataset = objGrid.getBindDataset();
	
	importObj.IMPORTDATASET = binddataset;	// grid에 bind된 dataset
	importObj.DATASETCOLINFO = [];			// dataset column 정보
	
	var info;
	for(var i = 0; i < binddataset.colcount; i++)
	{
		info = {
					id:binddataset.colinfos[i].id,
					name:binddataset.colinfos[i].name,
					prop:binddataset.colinfos[i].prop,
					size:binddataset.colinfos[i].size,
					sumtext:binddataset.colinfos[i].sumtext,
					type:binddataset.colinfos[i].type
				}
		importObj.DATASETCOLINFO.push(info);
	}
	
	importObj.importData("","Sheet1!A1", objGrid.binddataset);
};

/*----------------------------------------------------------------------------------------------------
 *  Excel Import 성공 및 실패 여부 이벤트
 ----------------------------------------------------------------------------------------------------*/
LIB_FORMAT._gfn_excelImportObject_onsuccess = function(obj, e)
{
	///////////////////////////////////////////////////////////////////////
	//	기존의 컬럼을 반영한다. 화면상에서 컬럼이 임의로 바뀌었다면
	//  반영이 안될수 있으므로 컬럼의 상태를 확인해야 한다.
	//  화면상의 컬럼이 바뀌어 있다면 gfn_excelUpload, onsuccess를 각 화면상에
	//  오버라이드 하여 화면에 맞게 사용해야 한다.
	///////////////////////////////////////////////////////////////////////
	obj.IMPORTDATASET.deleteRow(0);		//첫번째 컬럼명이될 row 삭제
	
	for(var i = 0; i < obj.DATASETCOLINFO.length; i++)	// dataset 컬럼명 변경
	{
		obj.IMPORTDATASET.updateColID(i, obj.DATASETCOLINFO[i].id);
	}
	///////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////
	
	trace("엑셀 파일 업로드 완료 ["+ e.eventid+"] "+ e.url);
};

LIB_FORMAT._gfn_excelImportObject_onerror = function(obj,  e)
{

	trace(this+ " 엑셀에서가져오기 실패\n ["+e.errorcode+"] "+ e.errormsg);
};


/**
 * @class Dataset의 컬럼정보를 Grid에 그대로 반영함
 * @param objGrid:Grid
 * @param objDs:Dataset
 * @return None
 */
LIB_FORMAT.LibGrid_applyDatasetToGrid = function (objDs, objGrid)
{
	objGrid.set_enableevent(false);   // Grid에서 이벤트 발생하지 않도록 함 - 그리드를 재구성하는동안
	objGrid.set_enableredraw(false);  // Grid를 다시 그리지 않도록 함 - 그리드를 재구성하는동안

	objGrid.set_binddataset("");

	// 그리드의 기존의 fromat을 모두 지움
	objGrid.set_formats("<Formats></Formats>");

	objGrid.createFormat();

	objGrid.appendContentsRow("head");  // head가 1row인경우
	objGrid.appendContentsRow("body");  // body가 1row인경우

	objGrid.deleteContentsCol(0); // appendContentsRow()를 하면 무조건 Col이 하나 생기기 때문에 삭제하고 시작함

	var colinfo, nColCount = objDs.getColCount();
	// band setting by cell properties
	for (var c = 0; c < nColCount; c++)
	{
		objGrid.appendContentsCol();
		colinfo = objDs.getColumnInfo(c);

		// Col Size Setting
		objGrid.setFormatColProperty(c, "size", 100);

		objGrid.setCellProperty("head", c, "text", colinfo.name);
		objGrid.setCellProperty("body", c, "text", "bind:" + colinfo.name);
	}

    objGrid.set_binddataset(objDs);

	objGrid.set_enableevent(true);   // Grid에서 이벤트 발생하도록함
	objGrid.set_enableredraw(true);  // Grid를 다시 그리도록 함

}


LIB_FORMAT.isArray =  Array.isArray ? function(value) { return Array.isArray(value); } : function(value)
{
		return ( value ) === '[object Array]';
};