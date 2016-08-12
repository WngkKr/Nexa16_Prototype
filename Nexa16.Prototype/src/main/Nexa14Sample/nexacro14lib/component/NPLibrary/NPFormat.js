/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_FORMAT
*  @Creator UI-SA
*  @CreateDate 2015.04.30
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline format 관련 공통 함수 모음
*  @Desction
* 			1) format 관련 공통 함수 모음
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2015.04.30       UI-SA             최초 생성
*******************************************************************************
*/

var LIB_FORMAT = nexacro.Form.prototype;

/**
 * @class      	날짜 시간 Format (입력 문자열 이 8자리 또는 14자리만 성공으로 간주, 8자리 라면 000000을 문자열 뒤에 붙임)
 * @param 		{string} strDate 날짜
 * @param 		{boolean} bReturnFlag 오류시 오류발생 날짜 반환여부
 * @return 		{string} format 적용 날짜
 */
LIB_FORMAT.gfn_getFormatDateTime = function(strDate, bReturnFlag)
{
	var strInDate;

	strInDate = this.gfn_replace( strDate , "-", "" );
	strInDate = this.gfn_replace( strDate , " ", "" );
	strInDate = this.gfn_replace( strDate , ":", "" );

    if( !(this.gfn_length(strInDate) == 8 || this.gfn_length(strInDate) == 14) )
	{
		if( bReturnFlag ) return strDate;
		else return "";
	}
	
	if( this.gfn_length(strInDate) == 8 ) strInDate = strInDate + "000000";
	
	
	var strYMD = String(strInDate).substr(0,8);
	
	
	if ( !this.gfn_isValidYMD(strYMD, true) )
	{
		if( bReturnFlag ) return strDate;
		else return "";
	}
	
	if( this.gfn_parseInt(String(strInDate).substr(8, 2)) > 24  ||
	    this.gfn_parseInt(String(strInDate).substr(10, 2)) > 60 || 
	    this.gfn_parseInt(String(strInDate).substr(12, 2)) > 60 )
	{
		if( bReturnFlag ) return strDate;
		else return "";
	}
	
	var strReturnDate;
	var strReturnTime;
	
	strReturnDate = ( String(strInDate).substr(0, 4)+ "-" + String(strInDate).substr(4, 2) + "-" + String(strInDate).substr(6, 2) );
	strReturnTime = ( String(strInDate).substr(8, 2)+ "-" + String(strInDate).substr(10, 2) + "-" + String(strInDate).substr(12, 2) );
	 
	return (  strReturnDate + " " + strReturnTime );
};


/**
 * @class      	문자형 숫자에 콤마를 제거한다.
 * @param 		{string} strVal 숫자
 * @return 		{string} , 제거된 숫자
 */
LIB_FORMAT.gfn_getNumber = function(strVal)
{	
	return this.gfn_replace(strVal, ",", "");
};