/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath
*  @FileName LIB_DATASET
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline Dataset 관련 공통 함수 모음  
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

var LIB_DATASET = nexacro.Form.prototype;

/**
 * @class      	dataSet의 Row가 변경되었는지 판단하는 함수
 * @param 		{object} objDs 처리할 dataset 
 * @param 		{number} nRow 확인row
 * @return 		{boolean} 여부(true = 변경 된 데이터가 존재, false = 변경 된 데이터가 없음)
 */
LIB_DATASET.gfn_isUpdatedDsRow = function (objDs, nRow)
{
	if (objDs.updatecontrol == true) 
	{
		if (objDs.getRowType(nRow) == Dataset.ROWTYPE_INSERT || objDs.getRowType(nRow) == Dataset.ROWTYPE_UPDATE) 
		{
			return true;
		}
		return false;
	}
	else 
	{
		for (var i = 0; objDs.getColCount(); i++) 
		{
			if (this.gfn_isUpdateDsColumn(objDs, nRow, i) == true) 
			{
				return true;
			}
		}
	}
	return false;
};

/**
 * @class      	dataSet의 Row 에서 해당 칼럼이 변경되었는지 판단하는 함수
 * @param 		{object} objDs 처리할 dataset 
 * @param 		{number} nRow 확인row
 * @param 		{string} Column 확인 column
 * @return 		{boolean} 여부(true = 변경 된 데이터가 존재, false = 변경 된 데이터가 없음)
 */
LIB_DATASET.gfn_isUpdateDsColumn = function (objDs, nRow, Column)
{
	if (objDs.getRowType(nRow) == Dataset.ROWTYPE_INSERT) 
	{
		if (this.gfn_isNull(objDs.getColumn(nRow, Column))) 
		{
			return false;
		}
	}
	else 
	{
		if (objDs.getColumn(nRow, Column) == objDs.getOrgColumn(nRow, Column)) 
		{
			return false;
		}
	}
	return true;
};

/**
 * @class      	DataSet명으로 찾아서 존재하지 않음 생성 리턴
 * @param 		{string} strDsNm 데이터셋 명
 * @return 		{object} 생성된 DataSet 
 */
LIB_DATASET.gfn_getDataset = function(strDsNm) 
{      
     var oDs = this.objects[strDsNm];
     
     //미존재시 생성여부에 따라 추가함.
     if(this.gfn_isNull(oDs))
     {
		oDs = new Dataset;
		oDs.name = strDsNm;
		this.addChild(strDsNm, oDs);
     }
     return oDs;
};

/**
 * @class      	DataSet명으로 존재여부만 리턴
 * @param 		{string} strDsNm 데이터셋 명
 * @return 		{boolean} 존재여부
 */
LIB_DATASET.gfn_isDataset = function(strDsNm) 
{ 
	var oDs = this.objects[strDsNm];
     
     //미존재시 생성여부에 따라 추가함.
     if(this.gfn_isNull(oDs))
     {
		return false;
     }
     return true;
};

/**
 * @class      	컬럼정보 미존재시에만 컬럼정보 추가
 * @param 		{object} objDs 대상 데이터셋 오브젝트
 * @param 		{array}  arrColName col id array
 * @return 		N/A
 */
LIB_DATASET.gfn_addColumnIfNan = function(objDs, arrColName)
{
    for (var i = 0 ; i < arrColName.length; i++) 
	{
		try
		{
			if(objDs.getColumnInfo(arrColName[i]) == null)
			{
				objDs.addColumn(arrColName[i], "string");
			}
		}
		catch(e)
		{
		}
	}
};


/**
 * @class      	시스템 공통 메세지를 로딩해서 GDST_MESSAGE에 담는다.
 * @return 		N/A
 */
LIB_DATASET.gfn_loadMsgData = function()
{
	//메세지 데이터를 서버에서 로드에서 가져온다. 서비스를 만들어야 함................
	//메세지 데이터를 서버에서 로드에서 가져온다. 서비스를 만들어야 함................
	//메세지 데이터를 서버에서 로드에서 가져온다. 서비스를 만들어야 함................
	//메세지 데이터를 서버에서 로드에서 가져온다. 서비스를 만들어야 함................
	//메세지 데이터를 서버에서 로드에서 가져온다. 서비스를 만들어야 함................
	application.GDS_MESSAGE;
};