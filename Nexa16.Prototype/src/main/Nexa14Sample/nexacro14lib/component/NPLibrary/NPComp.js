/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath
*  @FileName LIB_COMP
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline user Component 관련 공통 함수 모음  
*  @Desction 
* 			1) Dataset 관련 공통 함수 모음
*  
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15      송원창             최초 생성 
*******************************************************************************
*/

var LIB_COMP = nexacro.Form.prototype;

/**
 * @class    Edit Object에 checkcombo 가 가능하게 설정하는 공통함수 
 *
 * @param 	 {Edit}     checkcombo 대상 Edit Object
 * @param 	 {Dataset}  checkcombo 대상 Dataset
 * @param 	 {Object}   checkcombo 대상 컬럼정보 {code명, data명} 의 Array
 * @param 	 {Integer}  checkcombo 대상 창의 너비 기본(200px)
 * @return   N/A
 */
LIB_COMP.gfn_setCheckComboEdit = function(oEdit, oDataset, oColumInfo)
{
	var dataCnt = oDataset.rowcount;
	var popdivHeight = 0;
	var iWidth = oEdit.getOffsetWidth();
	
	if(dataCnt < 10)	// 10개까지만
	{
		var popdivHeight = dataCnt * 24;
	}
	else
	{
		var popdivHeight = 10 * 24;
	}
	
	oEdit.set_readonly(true);
	oEdit.checkcombo_dataset   = oDataset;
	oEdit.checkcombo_columinfo = oColumInfo;
	oEdit.checkcombo_dataset.set_rowposition(-1);
	
	// Create popupDiv
	var objPopupDivName = oEdit.id+"_PopupDiv";
	var objPopupDiv = new PopupDiv();
	objPopupDiv.init(objPopupDivName, "absolute", 0, 0, 196, 46, null, null);
	this.addChild(objPopupDivName, objPopupDiv);
	objPopupDiv.style.set_background("blue");	//변경
	objPopupDiv.show(); 
	
	// 해당 Edit의 combopopup Grid를 동적생성한다. 
	var columsize  = "";
	var body       = "";
	var cellindex  = 0;
	var totalwidth = 0;

	var formats = "";
	formats += '<Formats>\n';
	formats += '<Format id="default">\n';
	formats += '	<Columns>\n';
	formats += '		<Column size="25" band="left" />\n';
	formats += '		<Column size="120" />\n';
	formats += '	</Columns>\n';
	formats += '	<Rows><Row size="24" /></Rows>\n';
	formats += '	<Band id="body">\n';
	formats += '	<Cell displaytype="checkbox" edittype="checkbox" text="bind:chk"/>\n';
	formats += '	<Cell col="1" style="align:left&#32;middle;padding:0&#32;0&#32;0&#32;5;" text="bind:' + oColumInfo[0] + '"/>\n';
	formats += '	</Band>\n';
	formats += '</Format>\n';
	formats += '</Formats>';

	var gridname        = oEdit.id + "_checkcombogrid";
	var checkcombogrid = new Grid();

	// 기본크기값이 지정이 안되있음 200 으로 설정 
	if( this.gfn_isNull(iWidth) )
	{
		iWidth = 200;
	}

	// Object의 하단에 처리할경우 
	if( oEdit.parent.getOffsetHeight() > (oEdit.getOffsetBottom()+1+iWidth) )
	{
		checkcombogrid.init(gridname, "absolute", 0, 0, null, null, 0, 0);
	}
	// Object의 상단에 처리할경우 
	else
	{
		checkcombogrid.init(gridname, "absolute", oEdit.getOffsetLeft(), oEdit.getOffsetTop()-iWidth-1, totalwidth, iWidth, null, null);
	}

	// 강제로 콤보처럼 하기위해서 버튼을 만들어준다.
	var combobtnname = oEdit.id+"_ComboBtn";
	var combobtn     = new Button();
	combobtn.init(combobtnname, "absolute", parseInt(oEdit.getOffsetLeft())+parseInt(oEdit.getOffsetWidth())-25, oEdit.getOffsetTop(), 25, parseInt(oEdit.getOffsetHeight()));
	this.addChild(combobtnname, combobtn); 
	//combobtn.set_style("background:transparent URL('theme://images/btn_DropDown_O.png') no-repeat 3,3;");
	combobtn.set_cssclass("btn_WF_Treecombo");
	combobtn.show();
	
	

	// 콤보번튼클릭시 전체 보이도록 처리
	combobtn.addEventHandler("onclick", 
		function()
		{
			eval("this."+oEdit.id+"_PopupDiv").trackPopupByComponent(oEdit, 0, parseInt(oEdit.getOffsetHeight()), parseInt(oEdit.getOffsetWidth()), popdivHeight+2);
		}, 
		this
	);    

	// 콤보처럼 보이기위한 Grid 
	objPopupDiv.addChild(gridname, checkcombogrid); 
	//checkcombogrid.set_visible(false);
	checkcombogrid.set_autofittype("col");
	checkcombogrid.set_formats(formats);
	checkcombogrid.set_binddataset(oDataset);
	checkcombogrid.return_object = oEdit;
	checkcombogrid.show(); 

	oEdit.checkcombo_grid  = checkcombogrid;
	checkcombogrid.pEdit = oEdit;
	
	this.gfn_checkComboValue(oEdit, oEdit.checkcombo_dataset, oColumInfo);	// 선택된 데이터

	// 그리드 클릭처리
	oEdit.checkcombo_grid.addEventHandler("oncellclick", this.gfn_checkcombo_oncelldblclick, this);
};

/**
 * @class    Edit Object에 checkcombo 가 가능하게 설정하는 공통함수 
 *
 * @param 	 {Edit}     checkcombo 대상 Edit Object
 * @param 	 {Dataset}  checkcombo 대상 Dataset
 * @param 	 {Object}   checkcombo 대상 컬럼정보 {code명, data명} 의 Array
 * @param 	 {Integer}  checkcombo 대상 창의 너비 기본(200px)
 * @return   N/A
 */
LIB_COMP.gfn_checkcombo_oncelldblclick = function(obj, e)
{
	if(e.cell == 0)
	{
		var pEdit = obj.pEdit;
		pEdit.checkcombo_dataset;
		pEdit.checkcombo_columinfo;
		
		this.gfn_checkComboValue(pEdit, pEdit.checkcombo_dataset, pEdit.checkcombo_columinfo);
	}
};


/**
 * @class    Edit Object에 check 된 데이터 설정하는 공통함수 
 *
 * @param 	 {Edit}     checkcombo 대상 Edit Object
 * @param 	 {Dataset}  checkcombo 대상 Dataset
 * @param 	 {Object}   checkcombo 대상 컬럼정보 {code명, data명} 의 Array
 * @return   N/A
 */
LIB_COMP.gfn_checkComboValue = function(objEdit, objDs, colinfo)
{
	if(objDs.rowcount == 0)
		return;

	var pEditCode = "";
	var pEditData = "";
	
	objDs.set_enableevent(false);
	objDs.filter("chk == '1'");
	
	for(var i = 0; i < objDs.rowcount; i++)
	{
		pEditCode += objDs.getColumn(i, colinfo[0]) +",";
		pEditData += objDs.getColumn(i, colinfo[1]) +", ";
	}
	
	objDs.filter("");
	objDs.set_enableevent(true);

	objEdit.set_value(pEditData.substring(0, pEditData.length-2));
	objEdit.code = pEditCode.substring(0, pEditCode.length-1);
};



/**
 * @class    Edit Object에 treecombo 가 가능하게 설정하는 공통함수 
 *
 * @param 	 {Edit}     checkcombo 대상 Edit Object
 * @param 	 {Dataset}  checkcombo 대상 Dataset
 * @param 	 {Object}   checkcombo 대상 컬럼정보 {code명, data명} 의 Array
 * @param 	 {Integer}  checkcombo 대상 창의 너비 기본(200px)
 * @return   N/A
 */
LIB_COMP.gfn_setTreeComboEdit = function(oEdit, oDataset, oColumInfo)
{
	var dataCnt = oDataset.rowcount;
	var popdivHeight = 0;
	var iWidth = oEdit.getOffsetWidth();
	
	if(dataCnt < 10)	// 10개까지만
	{
		var popdivHeight = dataCnt * 24;
	}
	else
	{
		var popdivHeight = 10 * 24;
	}
	
	oEdit.set_readonly(true);
	oEdit.treecombo_dataset   = oDataset;
	oEdit.treecombo_columinfo = oColumInfo;
	oEdit.treecombo_dataset.set_rowposition(-1);
	
	// Create popupDiv
	var objPopupDivName = oEdit.id+"_PopupDiv";
	var objPopupDiv = new PopupDiv();
	objPopupDiv.init(objPopupDivName, "absolute", 0, 0, 196, 46, null, null);
	this.addChild(objPopupDivName, objPopupDiv);
	objPopupDiv.style.set_background("blue");	//변경
	objPopupDiv.show(); 
	
	// 해당 Edit의 combopopup Grid를 동적생성한다. 
	var columsize  = "";
	var body       = "";
	var cellindex  = 0;
	var totalwidth = 0;

	var formats = "";
	formats += '<Formats>\n';
	formats += '<Format id="default">\n';
	formats += '	<Columns>\n';
	formats += '		<Column size="120" />\n';
	formats += '	</Columns>\n';
	formats += '	<Rows><Row size="24" /></Rows>\n';
	formats += '	<Band id="body">\n';
	formats += '	<Cell displaytype="tree" edittype="tree" style="align:left&#32;middle;padding:0&#32;0&#32;0&#32;5;" text="bind:data" treelevel="bind:lev"/>\n';
	formats += '	</Band>\n';
	formats += '</Format>\n';
	formats += '</Formats>';

	var gridname        = oEdit.id + "_treecombogrid";
	var treecombogrid = new Grid();

	// 기본크기값이 지정이 안되있음 200 으로 설정 
	if( this.gfn_isNull(iWidth) )
	{
		iWidth = 200;
	}

	// Object의 하단에 처리할경우 
	if( oEdit.parent.getOffsetHeight() > (oEdit.getOffsetBottom()+1+iWidth) )
	{
		treecombogrid.init(gridname, "absolute", 0, 0, null, null, 0, 0);
	}
	// Object의 상단에 처리할경우 
	else
	{
		treecombogrid.init(gridname, "absolute", oEdit.getOffsetLeft(), oEdit.getOffsetTop()-iWidth-1, totalwidth, iWidth, null, null);
	}

	// 강제로 콤보처럼 하기위해서 버튼을 만들어준다.
	var combobtnname = oEdit.id+"_ComboBtn";
	var combobtn     = new Button();
	combobtn.init(combobtnname, "absolute", parseInt(oEdit.getOffsetLeft())+parseInt(oEdit.getOffsetWidth())-25, oEdit.getOffsetTop(), 25, parseInt(oEdit.getOffsetHeight()));
	this.addChild(combobtnname, combobtn); 
	//combobtn.set_style("background:transparent URL('theme://images/btn_DropDown_O.png') no-repeat 3,3;");
	combobtn.set_cssclass("btn_WF_Treecombo");
	combobtn.show();
	
	

	// 콤보번튼클릭시 전체 보이도록 처리
	combobtn.addEventHandler("onclick", 
		function()
		{
			eval("this."+oEdit.id+"_PopupDiv").trackPopupByComponent(oEdit, 0, parseInt(oEdit.getOffsetHeight()), parseInt(oEdit.getOffsetWidth()), popdivHeight+2);
		}, 
		this
	);    

	// 콤보처럼 보이기위한 Grid 
	objPopupDiv.addChild(gridname, treecombogrid); 
	//treecombogrid.set_visible(false);
	treecombogrid.set_autofittype("col");
	treecombogrid.set_treeusecheckbox(false);
	treecombogrid.set_treeinitstatus("expand,null");
	treecombogrid.set_formats(formats);
	treecombogrid.set_binddataset(oDataset);
	treecombogrid.return_object = oEdit;
	treecombogrid.show(); 

	oEdit.treecombo_grid  = treecombogrid;
	treecombogrid.pEdit = oEdit;
	treecombogrid.pPopupDiv = objPopupDiv;
	//this.
	
	this.gfn_treeComboValue(oEdit, oEdit.treecombo_dataset, oColumInfo, -1);	// 선택된 데이터

	// 그리드 클릭처리
	oEdit.treecombo_grid.addEventHandler("oncellclick", this.gfn_treecombo_oncelldblclick, this);
};

/**
 * @class    Edit Object에 treecombo 가 가능하게 설정하는 공통함수 
 *
 * @param 	 {Edit}     treecombo 대상 Edit Object
 * @param 	 {Dataset}  treecombo 대상 Dataset
 * @param 	 {Object}   treecombo 대상 컬럼정보 {code명, data명} 의 Array
 * @param 	 {Integer}  treecombo 대상 창의 너비 기본(200px)
 * @return   N/A
 */
LIB_COMP.gfn_treecombo_oncelldblclick = function(obj, e)
{
	var pEdit = obj.pEdit;
	pEdit.treecombo_dataset;
	pEdit.treecombo_columinfo;
	
	this.gfn_treeComboValue(pEdit, pEdit.treecombo_dataset, pEdit.treecombo_columinfo, e.row);
	
	obj.pPopupDiv.closePopup();
};


/**
 * @class    Edit Object에 tree 된 데이터 설정하는 공통함수 
 *
 * @param 	 {Edit}     treecombo 대상 Edit Object
 * @param 	 {Dataset}  treecombo 대상 Dataset
 * @param 	 {Object}   treecombo 대상 컬럼정보 {code명, data명} 의 Array
 * @return   N/A
 */
LIB_COMP.gfn_treeComboValue = function(objEdit, objDs, colinfo, row)
{
	if(objDs.rowcount == 0)
		return;

	var pEditCode = "";
	var pEditData = "";
	
	pEditCode = objDs.getColumn(row, colinfo[0]);
	pEditData = objDs.getColumn(row, colinfo[1]);
	
	objEdit.set_value(pEditData);
	objEdit.code = pEditCode;
};