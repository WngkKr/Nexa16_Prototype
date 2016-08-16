/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_DATE
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline Date 관련 공통 함수 모음
*  @Desction 
* 			1) Date 관련 공통 함수 모음
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15      송원창             최초 생성
*******************************************************************************
*/

var LIB_DATE = nexacro.Form.prototype;

/**
 * @class 날짜에 대한 형식 체크
 * @param sDate  - 일자(yyyy-MM-dd 등)
 * @return boolean
 */
LIB_DATE.gfn_isDate = function (sDate)
{
	var stringWrapper = new String(sDate);
 	stringWrapper = stringWrapper.replace("/","").replace("/","");
 	stringWrapper = stringWrapper.replace("-","").replace("-","");
 	stringWrapper = stringWrapper.replace(".","").replace(".","");
	
	if( stringWrapper.toString().length !== 8 ) return false;
	
	var iMonth  = Math.floor(stringWrapper.slice(4,6), 10);
	var iDate   = Math.floor(stringWrapper.slice(6,8), 10);
		
	if( iMonth < 1 || iMonth > 12 ) return false;	
	if( iDate < 1 || iDate > this.gfn_getLastDateNum(stringWrapper) ) return false;	
	
	return true;
};

/**
 * @class 6자리 년월 날짜에 대한 형식 체크
 * @param sDate  - 일자(yyyyMM)
 * @return boolean
 */    
LIB_DATE.gfn_isDate6 = function (sDate)
{
	if (this.gfn_length(sDate) != 6) 
	{
		return false;
	}
	else if (!this.gfn_isDate(sDate + "01")) 
	{
		return false;
	}
	return true;
};

/**
 * @class 8자리 년월 날짜에 대한 형식 체크
 * @param sDate  - 일자(yyyyMMdd)
 * @return boolean
 */    
LIB_DATE.gfn_isDate8 = function (sDate)
{
	if (this.gfn_length(sDate) != 8) 
	{
		return false;
	}
	else if (!this.gfn_isDate(sDate)) 
	{
		return false;
	}
	return true;
};

/**
 * @class      	날짜 여부를 확인한다.(년월일)
 * @param 		{string}  strYMD 입력스트링(YYYYMMDD)
 * @param 		{boolean} bMsgLock 메세지 출력 (False 일경우 Error 메세지 출력)
 * @return 		{boolean} 여부 true(적합), false(부적합)
 */
LIB_DATE.gfn_isValidYMD = function(strYMD, bMsgLock)
{
    if( this.gfn_isNull(bMsgLock) ) bMsgLock = true;
    
	var strDate = this.gfn_replace(strYMD, "-", "");
	if( strDate.length > 8)
	{
		if( bMsgLock == false ) application.alert("입력된 날짜 정보를 확인하세요");
		return false;
	}
	
	// 9999 년도로 입력할경우 해당년도도 맞는경우이고 이는 년도는 대상이 아니라는것을 의미 
	// 그래서 년도의 제한을 현재 가능한 날짜로 강제로 설정해서 그값을 처리한다. 
	strDate = "2015"+strDate.substring(4);
	
	// 날짜를 첵크하기위해서 +1 한후 -1 해서 같으면 날짜가 맞고 틀리면 틀린거다..
	var newdate = this.gfn_addDate(this.gfn_addDate(strDate, 1), -1);	
	if( strDate == newdate )
	{
	    return true;
	}
	else
	{
		if( bMsgLock == false ) application.alert("입력된 날짜 정보를 확인하세요");
	    return false;
	}
};

/**
 * @class      	시간 여부를 확인한다
 * @param 		{string}  strInputTime HH OR HHMM
 * @return 		{boolean} 여부 true(적합), false(부적합)
 */
LIB_DATE.gfn_isValidTime = function(strInputTime)
{
	var strTime;
	var strMin;

	if(!this.gfn_isNull(strInputTime))
	{
		if(strInputTime.length == 2)
		{
			strTime = strInputTime;

			if(strTime < 0 || strTime > 23) return false;
			else return true;
		}
		else if(strInputTime.length > 2)
		{
			strTime = strInputTime.substr(0,2);
			strMin = strInputTime.substr(2,2);
			if((strTime < 0 || strTime > 23) || (strMin < 0 || strMin > 59)) return false;
			else return true;
		}
	}
	else
	{
		return false;
	}
	return true;
};

/**
 * @class      	입력받은 일자가 현재일자 이전인지 체크한다.
 * @param 		{string}  strDate YYYYMMDD
 * @return 		{boolean} 여부 true(적합), false(부적합)
 */
LIB_DATE.gfn_isValidBeforeToday = function(strDate)
{
	if(!this.gfn_isValidYMD(strDate)) return false;

	var strToday = this.gfn_getToday();

	if(strDate > strToday) return false;
	else return true;
};

/**
 * @class      	입력된 날자에 OffSet 으로 지정된 만큼의 일을 더한다.<br>
 *				Date Type을 String으로 변환
 * @param 		{string} date ('yyyyMMdd' 형태로 표현된 날짜)
 * @param		{Integer} nOffSet (날짜로부터 증가 감소값. 지정하지 않으면 Default Value = 1 로 적용됩니다)
 * @return 		{string} Date에 nOffset이 더해진 결과를 'yyyyMMdd'로 표현된 날짜.
 */
LIB_DATE.gfn_addDate = function (sDate, nOffSet)
{
	sDate = sDate.toString();
	var tempDate = this.gfn_getStrToDate(sDate);
	
	var tempAddDate = tempDate.addDate(nOffSet);
	tempDate = new Date(tempAddDate);
	return this.gfn_getDateFormatString(tempDate, "%Y%m%d");
};


/**
 * @class 입력된 날자에 OffSet 으로 지정된 만큼의 달을 더한다.
 * @param {string} sDate  - 일자(yyyyMMdd) 
 * @param {Integer} nOffSet  - 날짜로부터 증가 감소값. 지정하지 않으면 Default Value = 1 로 적용
 * @return {string} Date에 nOffset이 더해진 결과를 'yyyyMMdd'로 표현된 날자.
 */ 
LIB_DATE.gfn_addMonth = function (sDate, nOffSet)
{
// 	sDate = sDate.toString();
// 	var tempDate = this.gfn_getStrToDate(sDate);
// 
// 	var tempAddMonth = tempDate.addMonth(nOffSet);
// 	tempDate = new Date(tempAddMonth);
// 	return this.gfn_getDateFormatString(tempDate, "%Y%m%d");
	
	sDate = sDate.toString();
	if( this.gfn_isNull(sDate) || this.gfn_isNull(nOffSet) )	return "";
	
    var nYear 	= parseInt(sDate.substr(0, 4));
    var nMonth 	= parseInt(sDate.substr(4, 2)) + nOffSet;
    var nDate 	= parseInt(sDate.substr(6, 2));
	var nLastDate, sRet;
	
	if(nDate.toString().length == 1)
	{
		nDate = "0" + nDate;
	}
	
	sRet 		= this.gfn_dateTime(nYear, nMonth, 1);	
    nLastDate 	= this.gfn_getLastDateNum(sRet);
    sRet 		= sRet.substr(0, 6);
    
    if( nDate > nLastDate )
    {
		sRet += nLastDate.toString();
	}
	else
	{
		sRet += nDate.toString();
	}

	return sRet;
};


/**
 * @class      	현재 날짜를 가져온다.
 * @param 		N/A
 * @return 		{string} 문자열 배열 (날짜 문자열 "20080526" ) YYYYMMDD
 */
LIB_DATE.gfn_getToday = function ()
{
	// appLockTimeSt 으로 설정된 날짜를 가져옴
	var strDate;
	var strDay;
	
	//변경사항...............(서버에서 시간을 가져와야함)
	strDate = this.gfn_trim(application.GDST_BIZ_HEADER_OUT.getColumn(0, "appLockTimeSt"));
		
	if ( strDate.length != 14 ) {
		
		//pc client 시간
		return this.gfn_getTodayTimePc().substr(0,8);
	}
	else {
		strDay = strDate.substr(0,8);
	}
	return strDay;
};

/**
 * @class      	현재 날짜 시간을 가져온다.
 * @param 		N/A
 * @return 		{string} 문자열 배열 (날짜 문자열 "20080526183023")
 */
LIB_DATE.gfn_getDateTime = function ()
{
	//변경사항...............(서버에서 시간을 가져와야함)
	var strSysDate = this.gfn_trim(application.GDST_BIZ_HEADER_OUT.getColumn(0, "appLockTimeSt"));
	var strDate = this.gfn_isNull(strSysDate) ? this.gfn_getTodayTimePc() :  strSysDate.substr(0,14);
	return strDate;
};

/**
 * @class      	해당 PC의 오늘 날짜+시간를 가져온다.
 * @param 		N/A
 * @return 		{string} 오늘날짜+시간
 */
LIB_DATE.gfn_getTodayTimePc = function ()
{
	var strToday = "";
	var objDate = new Date();
	var sToday = objDate.getFullYear().toString();
	sToday += this.gfn_right("0" + (objDate.getMonth() + 1), 2);
	sToday += this.gfn_right("0" + objDate.getDate(), 2);
	sToday += this.gfn_right("0" + objDate.getHours(), 2);
	sToday += this.gfn_right("0" + objDate.getMinutes(), 2);
	sToday += this.gfn_right("0" + objDate.getSeconds(), 2);
	// strToday += objDate.getMilliseconds();
	objDate = null;
	return sToday;
};

/**
 * @class      	현재 날짜 시간을 가져온다.
 * @param 		N/A
 * @return 		{string} 문자열 배열 (날짜 문자열 "051010")
 */
LIB_DATE.gfn_getTime = function ()
{
	var strTime = this.gfn_getDateTime().substr(8, 6);
	return strTime;
};

/**
 * @class 해당년도 구하기
 * @param sDate  - 일자(yyyyMMdd) 
 * @return string yyyy형태의 년도 ( 예 : "2012" )
 */    
LIB_DATE.gfn_getYear = function (sDate)
{
    if( arguments.length == 0 )
    {
		sDate = this.gfn_getToday();
    }
    
	return sDate.substr(0, 4);
};

/**
 * @class 해당년월 구하기
 * @param sDate  - 일자(yyyyMMdd) 
 * @return string yyyyMM형태의 년월 ( 예 : "201211" )
 */  
LIB_DATE.gfn_getYearMonth = function (sDate)
{
	if (this.gfn_isNull(sDate)) 
	{
		sDate = this.gfn_getToday();
	}

	return sDate.substr(0, 6);
};

/**
 * @class 해당월 구하기
 * @param sDate  - 일자(yyyyMMdd) 
 * @return string MM형태의 년월 ( 예 : "11" )
 */   
LIB_DATE.gfn_getMonth = function (sDate)
{
	if (this.gfn_isNull(sDate)) 
	{
		sDate = this.gfn_getToday();
	}

	return sDate.substr(4, 2);
};

/**
 * @class 해당월의 시작 날짜를 yyyyMMdd형태로 구하기
 * @param sDate  - 일자(yyyyMMdd) 
 * @return string yyyyMMdd형태의 시작 날짜 ( 예 : "20121101" )
 */  
LIB_DATE.gfn_getFirstDate = function (sDate)
{
	if (this.gfn_isNull(sDate)) 
	{
		sDate = this.gfn_getToday();
	}

	return sDate.substr(0, 6) + "01";
};

/**
 * @class      	해당월의 마지막 날짜를 yyyyMMdd형태로 구하기
 * @param sDate  - 일자(yyyyMMdd) 
 * @return string yyyyMMdd형태의 마지막 날짜 ( 예 : "20121130" )
 */  
LIB_DATE.gfn_getLastDate = function (sDate)
{
	if (this.gfn_isNull(sDate)) 
	{
		sDate = this.gfn_getToday();
	}

	var nLastDate = this.gfn_getLastDateNum(sDate);

	return sDate.substr(0, 6) + nLastDate.toString();
};

/**
 * @class      	기준년월(일)의 마지막 일자 반환
 * @param 		{string} strDate 기준년월(일)
 * @return 		{string} 해당월 마지막일
 */
LIB_DATE.gfn_getLastDateNum = function (sDate)
{
	var nMonth,nLastDate;

	if (this.gfn_isNull(sDate)) 
	{
		return -1;
	}

	nMonth = parseInt(sDate.substr(4, 2), 10);
	if (nMonth == 1 || nMonth == 3 || nMonth == 5 || nMonth == 7 || nMonth == 8 || nMonth == 10 || nMonth == 12) 
	{
		nLastDate = 31;
	}
	else if (nMonth == 2) 
	{
		if (this.gfn_isLeapYear(sDate) == true) 
		{
			nLastDate = 29;
		}
		else 
		{
			nLastDate = 28;
		}
	}
	else 
	{
		nLastDate = 30;
	}

	return nLastDate;
};

/**
 * @class      	입력 받은 날자 문자열에서 - 를 제거한다.
 * @param 		{string} strDate - strDate(2015-02-03)
 * @return 		{string} 문자열 배열( 날자 문자열 "20080526" ) 잘못된 날자일 경우 "" 리턴
 */
LIB_DATE.gfn_getDateVal = function (strDate)
{
	if( !this.gfn_isValidYMD(strDate) )
	{
		return "" ;
	} 
	return this.gfn_getValRemoveFormat(strDate,"-","") ;
};

/**
 * @class      	입력일수 2개의 날짜 간의 Day count
 * @param 		{string} sFdate From년월일
 * @param 		{string} sTdate To년월일
 * @return 		{string} 총일수
 */
LIB_DATE.gfn_getDayGap = function (sFdate, sTdate)
{
	sFdate = new String(sFdate);
	sFdate = sFdate.split(" ").join("").split("-").join("").split("/").join("");
	sTdate = new String(sTdate);
	sTdate = sTdate.split(" ").join("").split("-").join("").split("/").join("");

	sFdate = sFdate.substr(0, 8);
	sTdate = sTdate.substr(0, 8);

	if (sFdate.length != 8 || sTdate.length != 8
		 || nexacro.isNumeric(sFdate) == false || nexacro.isNumeric(sTdate) == false
		 || this.gfn_getDay(sFdate) == -1 || this.gfn_getDay(sTdate) == -1) 
	{
		return 0;
	}

	var nDiffDate = this.gfn_getStrToDate(sTdate) - this.gfn_getStrToDate(sFdate);
	var nDay = 1000 * 60 * 60 * 24;

	nDiffDate = parseInt(nDiffDate / nDay);
	
	trace( nDiffDate );
	
	if( nDiffDate < 0 ) 
	{
		nDiffDate = nDiffDate - 1;
	}
	else 
	{
		nDiffDate = nDiffDate + 1;
	}

	return nDiffDate;
};

/**
 * @class      	입력받은 from년월일로부터 to년월일까지 월수 반환
 * @param 		{string} strFromYMD From년월일
 * @param 		{string} strToYMD To년월일
 * @return 		{string} 총월수
 */
LIB_DATE.gfn_getMonthGap = function(strFromYMD, strToYMD)
{
	if(!this.gfn_isValidYMD(strFromYMD)) return 0;
	if(!this.gfn_isValidYMD(strToYMD)) return 0;

	var nYear = 0; 			//계산된 년도
	var nMonth = 0; 		//계산된 개월수
	var nDiffMonth = 0; 	//반환할 개월수

	if( parseInt(strFromYMD) <= parseInt(strToYMD) )
	{
	    strFromYMD = strFromYMD+"";
	    strToYMD   = strToYMD+"";
		nYear  = parseInt(strToYMD.substring(0,4)) - parseInt(strFromYMD.substring(0,4));
		nMonth = parseInt(strToYMD.substring(4,6)) - parseInt(strFromYMD.substring(4,6));
		return (12 * nYear) + nMonth;
	}
	else
	{
		return 0;
	}
};

/**
 * @class      	입력된 날짜로부터 요일을 구함
 * @param 		{string} sDate 8자리 형식으로된 날짜. yyyyMMdd의 형식으로 입력됩니다.
 * @return 		{integer} 요일에 따른 숫자. 0 = 일요일 ~ 6 = 토요일 로 대응됩니다.<br>
 *              		  오류가 발생할 경우 -1이 Return됩니다.
 */
LIB_DATE.gfn_getDay = function (sDate)
{
	var objDate = this.gfn_getStrToDate(sDate);
	return objDate.getDay();
},

/**
 * @class      	입력된 날자로부터 요일명을 구함
 * @param 		{string} sDate 8자리 형식으로된 날짜. yyyyMMdd의 형식으로 입력됩니다.
 * @return 		{string} 요일명
 */
LIB_DATE.gfn_getDayName = function (sDate)
{
	if(sDate.length != 8){
		alert("일자의 형식을 확인하여 주십시오.");
		return -1;
	}
	var objDayName = new Array("일", "월", "화", "수", "목", "금", "토");
	var objDate = this.gfn_getDay(sDate);

	return objDayName[objDate] + "요일";
};

/**
 * @class      	해당 시간 형식을 초형식으로 변환한다. (HHMMSS)
 * @param 		{string} sValue 시간 형식
 * @return 		{string} 초형식으로
 */
LIB_DATE.gfn_getTimeToSec = function (sValue)
{
	var sReturnValue = "";
	if(this.gfn_isValidTime(sValue))
	{
		sReturnValue =  nexacro.toNumber((sValue).substr(0,2))*3600 + nexacro.toNumber((sValue).substr(2,2))*60
						+ nexacro.toNumber((sValue).substr(4,2)) ;
	}
	else
	{
		sReturnValue = "";
	}

	return sReturnValue;
};

/**
 * @class      	윤년여부 확인
 * @param 		{string} sDate yyyyMMdd형태의 날짜 ( 예 : "20121122" )
 * @return 		{boolean} 	- sDate가 윤년인 경우 = true  <br>
 *							- sDate가 윤년이 아닌 경우 = false  <br>
 *  		 				- sDate가 입력되지 않은 경우 = false
 */
LIB_DATE.gfn_isLeapYear = function (sDate)
{
	var ret;
	var nY;

	if (this.gfn_isNull(sDate)) 
	{
		return false;
	}

	nY = parseInt(sDate.substring(0, 4), 10);

	if ((nY % 4) == 0) 
	{
		if ((nY % 100) != 0 || (nY % 400) == 0) 
		{
			ret = true;
		}
		else 
		{
			ret = false;
		}
	}
	else 
	{
		ret = false;
	}

	return ret;
};

/**
 * @class 양력 nYear에 해당하는 년도의 법정 공휴일(양력) List 모두 구하기
 * @param nYear  - 년도
 * @return Array 공휴일 List Array ==> 각 Array[i]="yyyyMMdd공휴일명" 으로 return
 */  
LIB_DATE.gfn_getHolidays = function (nYear)
{
	var nYear;
	var aHoliday = new Array();

	if (this.gfn_isNull(nYear)) 
	{
		return aHoliday;
	}

	// ///// 음력 체크
	// 구정
	aHoliday[0] = this.gfn_lunar2Solar("0" + (nYear - 1) + "1230") + "설날";
	aHoliday[1] = this.gfn_addDate(aHoliday[0], 1) + "설날";
	aHoliday[2] = this.gfn_addDate(aHoliday[1], 1) + "설날";
	// 석가탄신일
	aHoliday[3] = this.gfn_lunar2Solar("0" + nYear + "0408") + "석가탄신일";
	// 추석
	aHoliday[4] = this.gfn_lunar2Solar("0" + nYear + "0814") + "추석";
	aHoliday[5] = this.gfn_addDate(aHoliday[4], 1) + "추석";
	aHoliday[6] = this.gfn_addDate(aHoliday[5], 1) + "추석";

	// ///// 양력 체크
	aHoliday[7] = nYear + "0101" + "신정";
	aHoliday[8] = nYear + "0301" + "삼일절";
	aHoliday[9] = nYear + "0505" + "어린이날";
	aHoliday[10] = nYear + "0606" + "현충일";
	aHoliday[11] = nYear + "0815" + "광복절";
	aHoliday[12] = nYear + "1225" + "성탄절";

	return aHoliday.sort();
};

/**
 * @class      	초형식을 시간형식으로 변환한다 (HHMMSS)
 * @param 		{string} sValue 초형식
 * @return 		{string} 시간 형식
 */
LIB_DATE.gfn_getSecToTime = function (sValue)
{
	var sReturnValue = ""	;
	var iHH = "";
	var iMM = "";
	var iSS = "";
	var sHH = "";
	var sMM = "";
	var sSS = "";

	if (this.gfn_length(sValue) < 0 || sValue < 0)
	{
		sReturnValue = 0;
	}
	else
	{
		iHH = parseInt(nexacro.toNumber(sValue)/3600);
		iMM = parseInt((nexacro.toNumber(sValue) - iHH*3600)/60);
		iSS = parseInt((nexacro.toNumber(sValue) - iHH*3600)%60);

		if (iHH<10)
		{
			sHH = "0" + iHH;
		}
		else sHH = iHH;

		if (iMM<10)
		{
			sMM = "0" + iMM;
		}
		else sMM = iMM;

		if (iSS<10)
		{
			sSS = "0" + iSS;
		}
		else sSS = iSS;

		sReturnValue = String(sHH) + String(sMM) + String(sSS);
	}
	return sReturnValue;
};

/**
 * @class      	총사용시간
 * @param 		{string} strLoginDate 로그인시간 (YYYYMMDDHHMMSS)
 * @param 		{string} strLogoutDate 로그아웃시간 (YYYYMMDDHHMMSS)
 * @return 		{string} 실행시간
 */
LIB_DATE.gfn_getEpTime = function(strLoginDate, strLogoutDate)
{
    var SecMilli = 1000;
    var MinMilli = 1000 * 60;
    var HrMilli = MinMilli * 60;
    var DyMilli = HrMilli * 24;

    var objLoginDate = new Date(strLoginDate.substr(0,4),strLoginDate.substr(4,2),strLoginDate.substr(6,2),
                                strLoginDate.substr(8,2),strLoginDate.substr(10,2),strLoginDate.substr(12,2));
    var objLogoutDate = new Date(strLogoutDate.substr(0,4),strLogoutDate.substr(4,2),strLogoutDate.substr(6,2),
                                 strLogoutDate.substr(8,2),strLogoutDate.substr(10,2),strLogoutDate.substr(12,2));
    var nDiffDate = objLogoutDate - objLoginDate;

    var nDays = parseInt(nDiffDate/DyMilli);
    var nHours = parseInt((nDiffDate/HrMilli)%24);
    var nMin = parseInt((nDiffDate/MinMilli)%60);
    var nSec = parseInt((nDiffDate/SecMilli)%60);

    var strReVal = "";
    
    if (nDays != 0) strReVal += nDays + "일 ";
    if (nHours != 0) strReVal += nHours + "시간 ";
    if (nMin != 0) strReVal += nMin + "분 ";
    if (nSec != 0) strReVal += nSec + "초";
    
    return(strReVal);
};

/**
 * @class      	date를 포멧에 맞는 String으로 반환
 * @param 		{date} objDate 날짜
 * @param 		{string} strFormat 포멧 (예: "%Y%m%d")
 * @return 		{string} 포멧에 맞는 String date
 */
LIB_DATE.gfn_getDateFormatString = function(objDate, strFormat)
{
    if( arguments.length == 1 )
    {
        strFormat = objDate;
        objDate   = new Date();
    }

	if(this.gfn_isNull(strFormat)) 
	{
		return "";
	}
	
	var fY = String(objDate.getFullYear());
	var fY2 = fY.substr(fY.length-2, 2);

	strFormat = strFormat.toString();
	strFormat = strFormat.split("%Y").join(String(objDate.getFullYear()));
	strFormat = strFormat.split("%y").join(fY2);
	strFormat = strFormat.split("%M").join(String(objDate.getMonth() + 1).padLeft(2, "0"));
	strFormat = strFormat.split("%m").join(String(objDate.getMonth() + 1).padLeft(2, "0"));
	strFormat = strFormat.split("%D").join(String(objDate.getDate()).padLeft(2, "0"));
	strFormat = strFormat.split("%d").join(String(objDate.getDate()).padLeft(2, "0"));
	strFormat = strFormat.split("%H").join(String(objDate.getHours()).padLeft(2, "0"));
	strFormat = strFormat.split("%h").join(String(objDate.getHours()).padLeft(2, "0"));
	strFormat = strFormat.split("%I").join(String(objDate.getMinutes()).padLeft(2, "0"));
	strFormat = strFormat.split("%i").join(String(objDate.getMinutes()).padLeft(2, "0"));
	strFormat = strFormat.split("%S").join(String(objDate.getSeconds()).padLeft(2, "0"));
	strFormat = strFormat.split("%s").join(String(objDate.getSeconds()).padLeft(2, "0"));
	strFormat = strFormat.split("%T").join(String(objDate.getMilliseconds()).padLeft(3, "0"));
	strFormat = strFormat.split("%t").join(String(objDate.getMilliseconds()).padLeft(3, "0"));
	return strFormat;
};

/**
 * @class      	date type의 날짜를 String으로 반환
 * @param 		{date} objDate date
 * @return 		{string} String 형식의 date
 */
LIB_DATE.gfn_getDateToStr = function(objDate)
{
	if (typeof (objDate) == "string") 
	{
		return objDate;
	}
	return this.gfn_getDateFormatString(objDate, "%Y%m%d%H%I%S");
};

/**
 * @class      	String type의 날짜를 date로 반환
 * @param 		{string} sDate date
 * @return 		{date} date 형식의 date
 */
LIB_DATE.gfn_getStrToDate = function (sDate)
{
	if (typeof (sDate) == "date") 
	{
		return sDate;
	}
	var d = new Date();
	sDate = String(sDate).padRight(14, "0");
	d.setFullYear(parseInt(this.gfn_left(sDate, 4), 10), parseInt(sDate.substr(4, 2), 10) - 1, parseInt(sDate.substr(6, 2), 10));
	d.setHours(parseInt(sDate.substr(8, 2), 10), parseInt(sDate.substr(10, 2), 10), parseInt(sDate.substr(12, 2), 10));
	return d;
};

/**
 * @class      	년도 테이터셋 세팅
 * @param 		{object} objDs 기본데이타셋
 * @param 		{string|array} sYearColId 년도컬럼, 또는 array로 받은 컬럼array
 * @param 		{string} nStartYear 시작년도 (기본은 1987)
 * @param 		{string} nEndYear 종료년도 (기본은 현재년도 + 20)
 * @param 		{boolean} bDesc 년도의 Desc 정렬여부 기본은 최근연도가 상위
 * @return 		N/A
 */
LIB_DATE.gfn_setRangeYear = function(objDs, sYearColId, nStartYear, nEndYear, bDesc)
{
	if (sYearColId instanceof Array) {
		if (sYearColId.length == 0) return;
		nStartYear = this.gfn_isNull(nStartYear) ? 1987 : nStartYear;   
		nEndYear   = this.gfn_isNull(nEndYear)   ? (parseInt(this.gfn_trim(this.gfn_getDate()).substr(0,4)) + 20) : nEndYear; 
		
		objDs.set_enableevent(false);
		objDs.clearData();
		
		for (var i = nStartYear ; i <= parseInt(nEndYear) ; i++) 
		{
			objDs.insertRow(0);
			for (var j = 0 ; j < sYearColId.length ; j++) {
				objDs.setColumn(objDs.rowposition, sYearColId[j]  , i);
			}
		}
		objDs.set_enableevent(true);
		if (bDesc == true) objDs.set_keystring("S:-" + sYearColId[j]) // set 
	}
	else {
		sYearColId = this.gfn_isNull(sYearColId) ? "year" : sYearColId;
		nStartYear = this.gfn_isNull(nStartYear) ? 1987 : nStartYear;   
		nEndYear   = this.gfn_isNull(nEndYear)   ? (parseInt(this.gfn_trim(this.gfn_getDate()).substr(0,4)) + 20) : nEndYear;  
		
		objDs.set_enableevent(false);
		objDs.clearData();
		
		var nRow = -1;
		for (var i = nStartYear ; i <= parseInt(nEndYear) ; i++) 
		{
			nRow = objDs.insertRow(0); //insert row index 반환

			objDs.setColumn(nRow, sYearColId, i);
		}
		objDs.set_enableevent(true);
		
		//SORT
		if (bDesc == true) objDs.set_keystring("S:-" + sYearColId) // set 
	}
};

/**
 * @class 양력을 음력으로 변환해주는 함수 (처리가능 기간  1841 - 2043년)
 * @param sDate  - 일자(yyyyMMdd)
 * @return string 음력날자 Flag(1 Byte) + (yyyyMMdd형태의 음력일자)
                  ( Flag : 평달 = "0", 윤달 = "1" ) 
 */  
LIB_DATE.gfn_solar2Lunar = function (sDate)
{
	var sMd = "31,0,31,30,31,30,31,31,30,31,30,31";
	var aMd = new Array();

	var aBaseInfo = new Array();
	var aDt = new Array();
	var td;
	var td1;
	var td2;
	var mm,m1,m2;
	var nLy,nLm,nLd;
	var sLyoon;
	if (this.gfn_isNull(sDate)) 
	{
		return "";
	}

	var sY = parseInt(sDate.substr(0, 4), 10);
	var sM = parseInt(sDate.substr(4, 2), 10);
	var sD = parseInt(sDate.substr(6, 2), 10);
	if (sY < 1841 || sY > 2043) 
	{
		return "";
	}

	aBaseInfo = this._solarBase();
	aMd = sMd.split(",");
	if (this.gfn_isLeapYear(sDate) == true) 
	{
		aMd[1] = 29;
	}
	else 
	{
		aMd[1] = 28;
	}

	td1 = 672069; //672069 = 1840 * 365 + 1840/4 - 1840/100 + 1840/400 + 23  //1840년까지 날수

	// 1841년부터 작년까지의 날수
	td2 = (sY - 1) * 365 + parseInt((sY - 1) / 4) - parseInt((sY - 1) / 100) + parseInt((sY - 1) / 400);

	// 전월까지의 날수를 더함
	for (var i = 0; i <= sM - 2; i++) 
	{
		td2 = td2 + parseInt(aMd[i]);
	}

	// 현재일까지의 날수를 더함
	td2 = td2 + sD;

	// 양력현재일과 음력 1840년까지의 날수의 차이
	td = td2 - td1 + 1;

	// 1841년부터 음력날수를 계산
	for (var i = 0; i <= sY - 1841; i++) 
	{
		aDt[i] = 0;
		for( j = 0 ; j <= 11 ; j++ )
		{
			switch( parseInt(aBaseInfo[i*12 + j]) )
			{
				case 1 : mm = 29;
						break;
				case 2 : mm = 30;
						break;				
				case 3 : mm = 58;	// 29 + 29
						break;				
				case 4 : mm = 59;	// 29 + 30
						break;				
				case 5 : mm = 59;	// 30 + 29
						break;				
				case 6 : mm = 60;	// 30 + 30
						break;				
			}
			aDt[i] = aDt[i] + mm;
		}
	}

	// 1840년 이후의 년도를 계산 - 현재까지의 일수에서 위에서 계산된 1841년부터의 매년 음력일수를 빼가면수 년도를 계산
	nLy = 0;
	do {
		td = td - aDt[nLy];
		nLy = nLy + 1;
	} while (td > aDt[nLy]);

	nLm = 0;
	sLyoon = "0"; //현재월이 윤달임을 표시할 변수 - 기본값 평달
	do {
		if (parseInt(aBaseInfo[nLy * 12 + nLm]) <= 2) 
		{
			mm = parseInt(aBaseInfo[nLy * 12 + nLm]) + 28;
			if (td > mm) 
			{
				td = td - mm;
				nLm = nLm + 1;
			}
			else 
			{
				break;
			}
		}
		else 
		{
			switch (parseInt(aBaseInfo[nLy * 12 + nLm])) 
			{
				case 3:
					m1 = 29;
					m2 = 29;
					break;
				case 4:
					m1 = 29;
					m2 = 30;
					break;
				case 5:
					m1 = 30;
					m2 = 29;
					break;
				case 6:
					m1 = 30;
					m2 = 30;
					break;
			}

			if (td > m1) 
			{
				td = td - m1;
				if (td > m2) 
				{
					td = td - m2;
					nLm = nLm + 1;
				}
				else 
				{
					sLyoon = "1";
				}
			}
			else 
			{
				break;
			}
		}
	} while (1);

	nLy = nLy + 1841;
	nLm = nLm + 1;
	nLd = td;

	return sLyoon + nLy + this.gfn_right("0" + nLm, 2) + this.gfn_right("0" + nLd, 2);
};

 /**
 * @class 음력을 양력으로 변환해주는 함수 (처리가능 기간  1841 - 2043년)
 * @param sDate  - 일자(yyyyMMdd)
 * @return string yyyyMMdd형태의 양력일자
 */  
LIB_DATE.gfn_lunar2Solar = function (sDate)
{
	var sMd = "31,0,31,30,31,30,31,31,30,31,30,31";
	var aMd = new Array();	
	var aBaseInfo = new Array();	
	
	var nLy, nLm, nLd, sLflag;		// 전해온 음력 인자값을 저장할 년, 월, 일, 윤달여부 임시변수
	var nSy, nSm, nSd;				// 계산된 양력 년, 월, 일을 저장할 변수
	var y1, m1, i, j, y2, y3;	// 임시변수	
	var leap;

	if( this.gfn_isNull(sDate) )			return "";
	if( sDate.length != 9 )		return "";
	
	sLflag = sDate.substr(0,1);
	nLy = parseInt(sDate.substr(1,4), 10);
	nLm = parseInt(sDate.substr(5,2), 10);
	nLd = parseInt(sDate.substr(7,2), 10);
	if( nLy < 1841 || nLy > 2043 )			return "";
	if( sLflag != "0" && sLflag != "1" )	return "";
		
	aBaseInfo = this._solarBase();
	aMd = sMd.split(",");
	if( this.gfn_isLeapYear(sDate.substr(1,8)) == true )					
		aMd[1] = 29;
	else
		aMd[1] = 28;	
		
	y1 = nLy - 1841;
	m1 = nLm - 1;
	leap = 0;
	if( parseInt(aBaseInfo[y1*12 + m1]) > 2 )
		leap = this.gfn_isLeapYear(nLy+"0101");
	
	if( leap == 1 )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : mm = 29;
					break;
			case 4 : mm = 30;
					break;			
			case 5 : mm = 29;
					break;			
			case 6 : mm = 30;
					break;
		}
	}
	else
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 1 : mm = 29;
					break;			
			case 2 : mm = 30;
					break;			
			case 3 : mm = 29;
					break;			
			case 4 : mm = 29;
					break;			
			case 5 : mm = 30;
					break;			
			case 6 : mm = 30;
					break;			
		}
	}

	td = 0;
	for( i = 0 ; i <= y1 - 1 ; i++ )
	{
		for( j = 0 ; j <= 11 ; j++ )
		{
			switch( parseInt(aBaseInfo[i*12 + j]) )
			{
				case 1 : td = td + 29;
						break;
				case 2 : td = td + 30;
						break;				
				case 3 : td = td + 58;
						break;				
				case 4 : td = td + 59;
						break;				
				case 5 : td = td + 59;
						break;				
				case 6 : td = td + 60;
						break;				
			}
		}
	}

	for( j = 0 ; j <= m1 - 1 ; j++ )
	{
		switch( parseInt(aBaseInfo[y1*12 + j]) )
		{
			case 1 : td = td + 29;
					break;			
			case 2 : td = td + 30;
					break;						
			case 3 : td = td + 58;
					break;						
			case 4 : td = td + 59;
					break;						
			case 5 : td = td + 59;
					break;						
			case 6 : td = td + 60;
					break;						
		}
	}

	if( leap == 1 )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : mm = 29;
					break;						
			case 4 : mm = 29;
					break;						
			case 5 : mm = 30;
					break;						
			case 6 : mm = 30;
					break;						
		}
	}
	
	td = td + nLd + 22;
	
	if( sLflag == "1" )
	{
		switch( parseInt(aBaseInfo[y1*12 + m1]) )
		{
			case 3 : td = td + 29;
					break;						
			case 4 : td = td + 30;
					break;						
			case 5 : td = td + 29;
					break;						
			case 6 : td = td + 30;
					break;						
		}
	}
	
	y1 = 1840;
	do
	{
		y1 = y1 + 1;
		leap = this.gfn_isLeapYear(y1+"0101");

		if( leap == 1 )
			y2 = 366;
		else
			y2 = 365;

		if( td <= y2 )
			break;
			
		td = td - y2;
	}
	while(1);

	nSy = y1;
	aMd[1] = y2 - 337;
	m1 = 0;
	do
	{
		m1 = m1 + 1;
		if( td <= parseInt(aMd[m1-1]) )
			break;
		td = td - parseInt(aMd[m1-1]);
	}
	while(1);
	
	nSm = m1;
	nSd = td;
	y3 = nSy;
	td = y3 * 365 + parseInt(y3/4) - parseInt(y3/100) + parseInt(y3/400);
	for( i = 0 ; i <= nSm - 1 ; i++ )
		td = td + parseInt(aMd[i]);

	td = td + nSd;

	return y3 + this.gfn_right("0" + nSm, 2)+this.gfn_right("0" + nSd, 2);
};

 /**
 * @class 각 월별 음력 기준 정보를 처리하는 함수(처리가능 기간  1841 - 2043년) 단, 내부에서 사용하는 함수임
 * @return String 음력 기준정보
 */ 
LIB_DATE._solarBase = function ()
{
	var kk;

	// 1841
	kk = "1,2,4,1,1,2,1,2,1,2,2,1,";
	kk += "2,2,1,2,1,1,2,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,4,1,2,1,2,1,";
	kk += "2,2,1,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,5,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,3,2,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	// 1851
	kk += "2,2,1,2,1,1,2,1,2,1,5,2,";
	kk += "2,1,2,2,1,1,2,1,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,5,2,1,2,1,2,";
	kk += "1,1,2,1,2,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,5,2,1,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,6,1,1,2,1,1,2,1,2,2,";
	// 1861
	kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
	kk += "2,1,2,1,2,2,1,2,2,3,1,2,";
	kk += "1,2,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,4,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,1,2,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,3,2,1,1,2,1,2,2,1,";
	kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,5,2,1,";
	// 1871
	kk += "2,2,1,2,2,1,2,1,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,4,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,5,1,2,1,2,2,1,2,";
	kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,4,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
	// 1881
	kk += "1,2,1,2,1,2,5,2,2,1,2,1,";
	kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,3,2,1,2,2,1,2,2,";
	kk += "2,1,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,5,2,1,1,2,1,2,1,2,";
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,5,2,1,2,2,1,2,1,2,1,2,";
	// 1891
	kk += "1,2,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,5,2,2,1,2,2,2,";
	kk += "1,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,5,1,2,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,5,2,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,5,2,2,1,2,";
	// 1901
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,3,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,4,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	// 1911
	kk += "2,1,2,1,1,5,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,5,1,2,1,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,3,2,1,2,2,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,5,2,2,1,2,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	// 1921
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,2,2,3,2,1,1,2,1,2,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,1,2,";
	kk += "2,1,2,1,2,2,1,2,1,2,1,1,";
	kk += "2,1,2,5,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,5,1,2,1,1,2,2,1,2,2,2,";
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,1,1,5,1,2,1,2,2,1,";
	// 1931
	kk += "2,2,2,1,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,6,1,2,1,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,4,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,2,1,4,1,2,2,1,2,";
	kk += "2,2,1,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	// 1941
	kk += "2,2,1,2,2,4,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,1,2,4,1,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
	kk += "2,5,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,3,2,1,2,1,2,";
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	// 1951
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,4,2,1,2,1,2,1,2,";
	kk += "1,2,1,1,2,2,1,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
	kk += "2,1,4,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,5,2,1,2,2,";
	kk += "1,2,2,1,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,5,2,1,2,1,2,1,";
	// 1961
	kk += "2,1,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,2,3,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,5,2,1,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,2,1,2,";
	kk += "1,2,2,1,2,1,5,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,2,1,2,1,2,2,1,2,";
	// 1971
	kk += "1,2,1,1,5,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,1,2,2,2,1,";
	kk += "2,2,1,5,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,5,2,1,1,2,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,1,";
	kk += "2,2,1,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,1,6,1,2,2,1,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	// 1981
	kk += "1,2,1,1,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,3,2,1,1,2,2,1,2,2,";
	kk += "2,1,2,1,1,2,1,1,2,1,2,2,";
	kk += "2,1,2,2,1,1,2,1,1,5,2,2,";
	kk += "1,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,2,2,1,2,1,2,1,1,";
	kk += "2,1,2,2,1,5,2,2,1,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,1,2,1,2,2,1,2,2,";
	kk += "1,2,1,1,5,1,2,1,2,2,2,2,";
	// 1991
	kk += "1,2,1,1,2,1,1,2,1,2,2,2,";
	kk += "1,2,2,1,1,2,1,1,2,1,2,2,";
	kk += "1,2,5,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,2,1,2,1,2,1,1,2,1,2,";
	kk += "1,2,2,1,2,2,1,5,2,1,1,2,";
	kk += "1,2,1,2,2,1,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,1,2,3,2,2,1,2,2,2,1,";
	kk += "2,1,1,2,1,1,2,1,2,2,2,1,";
	kk += "2,2,1,1,2,1,1,2,1,2,2,1,";
	// 2001
	kk += "2,2,2,3,2,1,1,2,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,1,2,1,2,1,";
	kk += "2,2,1,2,2,1,2,1,1,2,1,2,";
	kk += "1,5,2,2,1,2,1,2,2,1,1,2,";
	kk += "1,2,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,1,2,1,2,1,5,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,2,1,2,";
	kk += "2,1,1,2,1,1,2,1,2,2,1,2,";
	kk += "2,2,1,1,5,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	// 2011
	kk += "2,1,2,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,6,2,1,2,1,1,2,1,2,1,";
	kk += "2,1,2,2,1,2,1,2,1,2,1,2,";
	kk += "1,2,1,2,1,2,1,2,5,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,2,1,2,2,";
	kk += "1,1,2,1,1,2,1,2,2,1,2,2,";
	kk += "2,1,1,2,3,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,2,1,2,2,";
	kk += "2,1,2,1,2,1,1,2,1,2,1,2,";
	kk += "2,1,2,5,2,1,1,2,1,2,1,2,";
	// 2021
	kk += "1,2,2,1,2,1,2,1,2,1,2,1,";
	kk += "2,1,2,1,2,2,1,2,1,2,1,2,";
	kk += "1,5,2,1,2,1,2,2,1,2,1,2,";
	kk += "1,2,1,1,2,1,2,2,1,2,2,1,";
	kk += "2,1,2,1,1,5,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,2,1,2,2,2,";
	kk += "1,2,1,2,1,1,2,1,1,2,2,2,";
	kk += "1,2,2,1,5,1,2,1,1,2,2,1,";
	kk += "2,2,1,2,2,1,1,2,1,1,2,2,";
	kk += "1,2,1,2,2,1,2,1,2,1,2,1,";
	// 2031
	kk += "2,1,5,2,1,2,2,1,2,1,2,1,";
	kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,2,1,1,2,1,5,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,2,1,2,2,2,1,";
	kk += "2,1,2,1,1,2,1,1,2,2,1,2,";
	kk += "2,2,1,2,1,4,1,1,2,1,2,2,";
	kk += "2,2,1,2,1,1,2,1,1,2,1,2,";
	kk += "2,2,1,2,1,2,1,2,1,1,2,1,";
	kk += "2,2,1,2,5,2,1,2,1,2,1,1,";
	kk += "2,1,2,2,1,2,2,1,2,1,2,1,";
	// 2041
	kk += "2,1,1,2,1,2,2,1,2,2,1,2,";
	kk += "1,5,1,2,1,2,1,2,2,2,1,2,";
	kk += "1,2,1,1,2,1,1,2,2,1,2,2";

	var arr = new Array();
	arr = kk.split(",");

	return arr;
};

/**
 * @class 입력일자의 주차정보를 리턴한다.
 * @param     {String} 입력일자 YYYYMMDD 
 * @return    {Array} 주차정보
 */ 
LIB_DATE.gfn_getWeekList = function(strYYYYMM, bIsWorkDayOnly)
{
	var strYMD;
	if( strYYYYMM.length < 6)
	{
		strYYYYMM = this.gfn_today();
	}
	strYMD  = strYYYYMM.substring(0,6)+"01";

	var	nWeekCount = 0;
	var strCheckYMD;

	if( this.gfn_getDay(strYMD)< 6) //1일이 토요일이전이면
	{
		nWeekCount++; //주Count 증가시킴
		//다음주 월요일을 시작으로 함
		strCheckYMD = this.gfn_addDate(strYMD, (6 - this.gfn_getDay(strYMD)+ 2));
	}
	else //1일이 토요일이면
	{
		strCheckYMD = this.gfn_addDate(strYMD, 2);
	}

	while(true)
	{
		if( strCheckYMD.substring(0,6) != strYYYYMM.substring(0, 6)) break;

		nWeekCount++;
		strCheckYMD = this.gfn_addDate(strCheckYMD, 7);
	}

	var	astrWeek = new Array(nWeekCount);;
	for (var i =0; i < nWeekCount; i++)
	{
		astrWeek[i] = (i + 1) + "주";
	}
	return astrWeek;
};

/**
 * @class     입력일자의 월별 주차정보를 리턴한다.
 * @param     {String} 년월 YYYYMM 
 * @param     {String} 입력일자 YYYYMMDD
 */ 
LIB_DATE.gfn_getMonthWeek = function(strYYYYMM, strYYYYMMDD)
{
	var strYMD;
	if( strYYYYMM.length < 6)
	{
		strYYYYMM = this.gfn_today();
	}
	strYMD  = strYYYYMM.substring(0,6)+"01";

	var	nWeekCount = 0;
	var strCheckYMD;

	if( LIB_DATE.gfn_getDay(strYMD)< 6) //1일이 토요일이전이면
	{
		nWeekCount++; //주Count 증가시킴
		//다음주 월요일을 시작으로 함
		strCheckYMD = this.gfn_addDate(strYMD, (6 - this.gfn_getDay(strYMD)+ 2));
	}
	else //1일이 토요일이면
	{
		strCheckYMD = this.gfn_addDate(strYMD, 2);
	}

	while(true)
	{
		if( strCheckYMD >= strYYYYMMDD) break;

		nWeekCount++;
		strCheckYMD = this.gfn_addDate(strCheckYMD, 7);
	}


	return nWeekCount;
};

/**
 * @class 입력시간을 초단위로 리턴한다. 
 * @param     {String}  입력시간 HHMMSS
 * @return    {Integer} 시간의 초단위 변환
 */ 
LIB_DATE.gfn_timeToSec = function(sValue)
{
	var sReturnValue = ""	;
	if( this.gfn_isValidTime(sValue) )
	{
		sReturnValue = parseInt(sValue.substring(0,2))*3600+parseInt(sValue.substring(2,4))*60+parseInt(sValue.substring(4,6));
	}
	else
	{
		sReturnValue = "";
	}

	return sReturnValue;
};

/**
 * @class 입력시간 초단위를 HHMMSS로 변환해서 그값을 리턴한다. 
 * @param     {String}  입력시간 HHMMSS
 * @return    {Integer} 시간의 초단위 변환
 */ 
LIB_DATE.gfn_secToTime = function(sValue)
{
    var sReturnValue = "";
    var iHH = "";
    var iMM = "";
    var iSS = "";
    var sHH = "";
    var sMM = "";
    var sSS = "";

    if( this.gfn_isNull(sValue) )
    {
        sReturnValue = 0;
    }
    else
    {
        iHH = parseInt(parseInt(sValue)/3600);
        iMM = parseInt((parseInt(sValue) - iHH*3600)/60);
        iSS = parseInt((parseInt(sValue) - iHH*3600)%60);

        if (iHH<10)
        {
            sHH = "0" + iHH;
        }
        else sHH = iHH;

        if (iMM<10)
        {
            sMM = "0" + iMM;
        }
        else sMM = iMM;

        if (iSS<10)
        {
            sSS = "0" + iSS;
        }
        else sSS = iSS;

        sReturnValue = new String(sHH) + new String(sMM) + new String(sSS);
    }
    return sReturnValue;
};
