/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_UTIL
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate  
*  @Version 1.0
*  @Outline Util 관련 공통 함수 모음
*  @Desction 
* 			1) Util 관련 공통 함수 모음
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2015.04.15      송원창             최초 생성 
*******************************************************************************
*/

var LIB_UTIL = nexacro.Form.prototype;

/**
 * @class      	전역변수의 값을 구한다.(개발자는 전역변수에 직접 접근제한)
 * @param 		{string} sVarName 전역변수명
 * @return 		{string} 전역변수의 값
 */
LIB_UTIL.gfn_getGlobalVar = function(sVarName)
{
    if(this.gfn_isNull(sVarName)) return null;
	return application[sVarName];
};

/**
 * @class      	입력마스크컴포넌트에 format 설정
 * @param 		{string} sMaskCode 마스크 구분값
 * @param 		{object} objMask 대상컴포넌트
 * @return 		N/A
 */
LIB_UTIL.gfn_setMask = function(sMaskCode, objMask) 
{
    switch (sMaskCode) 
    {
        case "PERNO":
            objMask.set_mask("######-#######");
            break;
        case "BUSNO":
            objMask.set_mask("###-##-#####");
            break;
        case "TEL":
            this.alert("미사용 기능입니다.");
            //objMask.set_mask("###-####-####");
            break;
        case "YYYYMM":
            objMask.set_mask("####-##");
            break;
        case "YYYMMDD":
            objMask.set_mask("####-##-##");
            break;
        case "YYYYMMDDHH":
            objMask.set_mask("####-##-## ##");
            break;
        case "YYYYMMDDHHMM":
            objMask.set_mask("####-##-## ##:##");
            break;
        case "YYYYMMDDHHMMSS":
            objMask.set_mask("####-##-## ##:##:##");
            break;
        default : break;
    }
};

/**
 * @class      	random seq를 리턴한다.
 * @param 		N/A
 * @return 		{string} random seq
 */
LIB_UTIL.gfn_getRandomSeq = function()
{
    var objDate = new Date();
	var nTime = objDate.getTime();
	return nTime + (Math.random()*10000000).toString().split(".")[0];
};

/**
 * @class      	parseInt 실행시 isNan일 경우 0리턴
 * @param 		{string} sArg 숫자데이타
 * @return 		{number} 숫자형으로 변환된 데이타
 */
LIB_UTIL.gfn_parseInt = function(sArg)
{
    return (isNaN(parseInt(sArg)) ? 0 : parseInt(sArg));
};


/**
 * @class      	parseFloat 실행시 isNan일 경우 0리턴
 * @param 		{string} sArg 숫자데이타
 * @return 		{number} 숫자형으로 변환된 데이타
 */
LIB_UTIL.gfn_parseFloat = function(sArg)
{
    return (isNaN(parseFloat(sArg)) ? 0 : parseFloat(sArg));
};

/******************************************************************************
	                        String 관련 함수
******************************************************************************/
/**
 * @class      	NULL 여부 체크
 * @param 		{string} val 원본 문자열
 * @param 		{boolean} 여부(입력값이 null, size 0, undefined => true/ 입력값이 not null => false)
 * @return 		N/A
 */
LIB_UTIL.gfn_isNull = function(value)
{
	var sValue = new String(value);
	if (sValue == "undefined" || sValue == null || sValue == "null" || sValue.trim().length <= 0 )
		return true;

	return false;
};

/**
 * @class      	NULL 여부 체크
 * @param 		{string} val 원본 문자열
 * @param 		{boolean} 여부(입력값이 null, size 0, undefined => true/ 입력값이 not null => false)
 * @return 		N/A
 */
LIB_UTIL.gfn_isEmpty = function(val)
{
	return this.gfn_isNull(val);
};


 /**
 * @class 입력값이 존재하는지를 판단하여
          존재하는 경우 입력값을 그대로 반환, 그렇지 않으면 두 번째 파라미터를 반환하는 함수
 * @param Val - 입력값
 * @param newVal - Null일 경우 대체할 값
 * @return Null을 대치한 값
 */  
LIB_UTIL.gfn_nvl = function(Val, newVal)
{
	return this.gfn_isNull(Val) ? newVal : Val;
};

/**
 * @class 입력값을 String으로 변경
 * @param Val - 문자열
 * @return String 문자열
 */   
LIB_UTIL.gfn_toString = function (Val)
{
	if (this.gfn_isNull(Val)) 
	{
		return new String();
	}
	return new String(Val);
};

/**
 * @class 문자열을 대소문자 구별없이 치환
 * @param sOrg - 원래문자열
 * @param sRepFrom - 치환할 문자열
 * @param sRepTo - 치환될 문자열
 * @return String 문자열
 */    
LIB_UTIL.gfn_replaceAll = function (sOrg, sRepFrom, sRepTo)
{
	var pos,nStart = 0,sRet = "";

	if (this.gfn_isNull(sOrg)) 
	{
		return "";
	}
	if (this.gfn_isNull(sRepFrom)) 
	{
		return sOrg;
	}

	while (1) 
	{
		pos = this.gfn_posCase(sOrg, sRepFrom, nStart);
		if (pos < 0) 
		{
			sRet += sOrg.substr(nStart);
			break;
		}
		else 
		{
			sRet += sOrg.substr(nStart, pos - nStart);
			sRet += sRepTo;
			nStart = pos + sRepFrom.length;
		}
	}
	return sRet;
};

/**
 * @class      	입력된 실수를 문자열 표현법으로 표현하는 함수
 * @param 		{number} nNumber 문자열로 출력할 실수
 * @param 		{number} nDetail 출력시 소숫점 이하의 자릿수(Default : 0)
 * @return 		{string} 문자열로 바뀐 실, 출력되는 실수는 정수부분에 3자리마다 ',' 가 삽입됩니다.
 */
LIB_UTIL.gfn_getNumFormat = function(nNumber, nDetail)
{
	var strVal = nNumber;
	var rtnStr;
	var arrStr;

	if (this.gfn_isNull(nDetail) == false) 
	{
		strVal = nexacro.round(nexacro.toNumber(strVal), nexacro.toNumber(nDetail));
	}
	return this.gfn_setComma(strVal);
};

/**
 * @class      	세자리 마다 , 를 찍어서 반환해 준다
 * @param 		{number|string} sValue 원본 문자
 * @return 		{string} 세자리마다 , 를 찍은 포맷화된 스트링값
 */
LIB_UTIL.gfn_setComma = function(sValue)
{
    var str = sValue + "";
    var tmp = '';
    var sGubun = (str.substr(0,1) == "-" || str.substr(0,1) == "+") ? str.substr(0,1) : "";
    if (sGubun != '') {
		str = str.substr(1);
    }
    
    if(str.indexOf('.') > -1)
    {
        tmp = str.substring(str.indexOf('.'), str.length);
        str = str.substring(0, str.indexOf('.'));
    }
    
    var nam = str.length % 3;
    var value = "";
    for ( var i = 0; i < str.length; i++)
    {
        var ch = str.charAt(i);
        for ( var k = 0; k < str.length / 3; k++)
        {
            if (i == nam + 3 * k && i != 0)
                value = value + ',';
        }
        value = value + ch;
    }
    if(tmp != '') value = value + tmp;
    if(sGubun != '') value = sGubun + value;
    return value;
};

/**
 * @class 특정 문자열을 기준으로 전체 문자열을 나누어서 하나의 배열(Array)로 만들어 반납하는 함수
 * @param strString - 원본 문자열
 * @param strChar - 나눌 기준이 되는 문자
 * @return Array 1 차원 배열
 */  
LIB_UTIL.gfn_split = function()
{
	var rtnArr = new Array();
	var arrArgument = this.gfn_split.arguments;

	if (arrArgument.length < 1)
	{
	}
	else if (arrArgument.length < 2)
	{
		if (!this.gfn_isNull(arrArgument[0]))
		{
			rtnArr[0] = arrArgument[0];
		}
	}
	else if (arrArgument.length == 2)
	{
		if (!this.gfn_isNull(arrArgument[0]))
		{
			rtnArr = arrArgument[0].toString().split(arrArgument[1]);
		}
	}
	
	return rtnArr;
};

/**
 * @class 입력값 형태에 따라서 길이 또는 범위를 구하는 함수
 * @param Val - 문자열
 * @return Integer Type에 따라 구해진 길이
 */ 
LIB_UTIL.gfn_length = function (Val)
{
	return this.gfn_toString(Val).length;
};

 /**
 * @class 문자 전체 길이를 계산
          - 문자, 숫자, 특수문자 : 1 로 Count
          - 그외 한글/한자 : 2 로 count 되어 합산 
 * @param sVal - 문자열
 * @return Integer Type에 따라 구해진 길이
 */  
LIB_UTIL.gfn_lengthByte = function (sVal)
{
	var lengthByte = 0;

	if (this.gfn_isNull(sVal)) 
	{
		return -1;
	}

	for (var i = 0; i < sVal.length; i++) 
	{
		if (sVal.charCodeAt(i) > 127) 
		{
			lengthByte += 2;
		}
		else 
		{
			lengthByte += 1;
		}
	}

	return lengthByte;
};

/**
 * @class 문자열의 오른쪽부분을 지정한 길이만큼 Return
 * @param Val - 오른 부분을 얻어올 원본 문자열
 * @param nSize - 얻어올 크기. [Default Value = 0]
 * @return String 문자열
 */ 
LIB_UTIL.gfn_right = function (Val, nSize)
{
	var nStart = this.gfn_toString(Val).length;
	var nEnd = Number(nStart) - Number(nSize);
	var rtnVal = Val.substring(nStart, nEnd);

	return rtnVal;
};

 /**
 * @class 문자열의 왼쪽부분을 지정한 길이만큼 Return
 * @param Val - 왼쪽 부분을 얻어올 원본 문자열
 * @param nSize - 얻어올 크기. [Default Value = 0]
 * @return String 문자열
 */  
LIB_UTIL.gfn_left = function (Val, nSize)
{
	return this.gfn_toString(Val).substr(0, nSize);
};

/**
 * @class 문자열의 위치를 대소문자 구별없이 찾는다
 * @param sOrg   - 원래 문자열
 * @param sFind  - 찾고자 하는 문자열
 * @param nStart - 검색 시작위치 (옵션 : Default=0)
 * @return Integer 찾고자 하는 문자열의 시작위치
 */  
LIB_UTIL.gfn_posCase = function (sOrg, sFind, nStart)
{
	if (this.gfn_isNull(sOrg) || this.gfn_isNull(sFind)) 
	{
		return -1;
	}
	if (this.gfn_isNull(nStart)) 
	{
		nStart = 0;
	}

	return sOrg.toLowerCase().indexOf(sFind.toLowerCase(), nStart);
};

/**
 * @class 문자열의 위치를 대소문자 구별하여 거꾸로 찾는다
 * @param sOrg   - 원래 문자열
 * @param sFind  - 찾고자 하는 문자열( 예 : "bb" )
 * @param nStart - 검색 시작위치 (옵션 : Default=문자열의 끝 )
 * @return Integer 찾고자 하는 문자열의 시작위치
 */   
LIB_UTIL.gfn_posReverse = function (sOrg, sFind, nStart)
{
	var pos;

	if (this.gfn_isNull(sOrg) || this.gfn_isNull(sFind)) 
	{
		return -1;
	}
	if (this.gfn_isNull(nStart)) 
	{
		nStart = sOrg.length - 1;
	}

	for (pos = nStart; pos >= 0; pos--) 
	{
		if (sOrg.substr(pos, sFind.length) == sFind) 
		{
			break;
		}
	}

	return pos;
};

/**
 * @class 자리수 만큼 왼쪽에 문자열 추가
 * @param sOrg - 원래 문자열
 * @param sPad - Pad할 문자열
 * @param nCnt - 자리수
 * @return String Pad된 문자열
 */ 
LIB_UTIL.gfn_lPad = function (sOrg, sPad, nCnt)
{
	var i,sRet = "";
	var nLength;

	if (this.gfn_isNull(sOrg)) 
	{
		return "";
	}
	if (this.gfn_isNull(sPad)) 
	{
		sPad = " ";
	}
	if (this.gfn_isNull(nCnt)) 
	{
		nCnt = 1;
	}

	for (i = 0; i < nCnt; i++) 
	{
		sRet += sPad;
	}
	sRet += sOrg;
	
	nLength = this.gfn_length(sOrg) > nCnt ? this.gfn_length(sOrg) : nCnt;

	return this.gfn_right(sRet,nLength);
};

 /**
 * @class 자리수 만큼 오른쪽에 문자열 추가
 * @param sOrg - 원래 문자열
 * @param sPad - Pad할 문자열
 * @param nCnt - 자리수
 * @return String Pad된 문자열
 */ 
LIB_UTIL.gfn_rPad = function (sOrg, sPad, nCnt)
{
	var i,sRet = "";
	var nLength;
	
	if (this.gfn_isNull(sOrg)) 
	{
		return "";
	}
	if (this.gfn_isNull(sPad)) 
	{
		sPad = " ";
	}
	if (this.gfn_isNull(nCnt)) 
	{
		nCnt = 1;
	}

	sRet += sOrg;
	for (i = 0; i < nCnt; i++) 
	{
		sRet += sPad;
	}

	nLength = this.gfn_length(sOrg) > nCnt ? this.gfn_length(sOrg) : nCnt;
	
	return this.gfn_left(sRet,nLength);
};

/**
 * @class 대소문자 구별하여 왼쪽, 오른쪽 문자열 삭제
 * @param sOrg - 원래 문자열
 * @param sTrim - Trim할 문자열(옵션 : Default=" ") 
 * @return String Trim된 문자열
 */  
LIB_UTIL.gfn_trim = function (sOrg, sTrim)
{
	var rtnVal = "";
	if (this.gfn_isNull(sTrim)) 
	{
		sTrim = " ";
	}
	rtnVal = this.gfn_rTrim(sOrg, sTrim);
	rtnVal = this.gfn_lTrim(rtnVal, sTrim);

	return rtnVal;
};

/**
 * @class 대소문자 구별하여 왼쪽에서 문자열 삭제
 * @param sOrg - 원래 문자열
 * @param sTrim - Trim할 문자열(옵션 : Default=" ")
 * @return String Trim된 문자열
 */   
LIB_UTIL.gfn_lTrim = function (sOrg, sTrim)
{
	var chk,pos;

	sOrg = this.gfn_toString(sOrg);

	if (this.gfn_isNull(sOrg))
	{
		return "";
	}
	
	if (this.gfn_isNull(sTrim))
	{
		sTrim = " ";
	}

	for (pos = 0; pos < sOrg.length; pos += sTrim.length)
	{
		if (sOrg.substr(pos, sTrim.length) != sTrim)
		{
			break;
		}
	}

	return sOrg.substr(pos);
};

/**
 * @class 대소문자 구별하여 오른쪽에서 문자열 삭제
 * @param sOrg - 원래 문자열
 * @param sTrim - Trim할 문자열(옵션 : Default=" ")
 * @return String Trim된 문자열
 */     
LIB_UTIL.gfn_rTrim = function (sOrg, sTrim)
{
	var pos,nStart;

	sOrg = this.gfn_toString(sOrg);

	if (this.gfn_isNull(sOrg))
	{
		return "";
	}
	
	if (this.gfn_isNull(sTrim))
	{
		sTrim = " ";
	}

	for (pos = sOrg.length - sTrim.length; pos >= 0; pos -= sTrim.length)
	{
		if (sOrg.substr(pos, sTrim.length) != sTrim)
		{
			break;
		}
	}

	return sOrg.substr(0, pos + sTrim.length);
};

/**
 * @class		유일한 ID 를 반환
 *
 * @param       {string=} prefix id 앞에 붙일 문자열
 * @return 		{string} id
 * @example
 *
 * trace(this.gfn_getUniqueId()); 
 * // output : 3e52d1f6-f0d2-4970-a590-ba7656b07859 (달라지는 값)
 * 
 * trace(this.gfn_getUniqueId("Button_")); 
 * // output : Button_4e601da1-63f4-4cfa-849b-01b8a7f14d40 (달라지는 값)
 */
LIB_UTIL.gfn_getUniqueId = function(prefix)
{
	this._ALPHA_CHAR_CODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102];
	
	if ( this.gfn_isNull(prefix) ) prefix = "";
	
	var pThis = this,
		charcode = pThis._ALPHA_CHAR_CODES,
		math = Math;
	var seq = 0;
	var seq0;
	var tmpArray = new Array(36);
	var idx = -1;
	
	while (seq < 8) 
	{
		tmpArray[++idx] = charcode[math.random() * 16 | 0];
		seq++;
	}
	seq = 0;
	while (seq < 3) 
	{
		tmpArray[++idx] = 45;//45 => "-", 95=> "_"
		seq0 = 0;
		while (seq0 < 4) 
		{
			tmpArray[++idx] = charcode[math.random() * 16  | 0];
			seq0++;
		}
		seq++;
	}
	tmpArray[++idx] = 45; //45 => "-", 95=> "_"
	// 끝에서 12자리을 random으로 처리하면 속도가 좀더 개선됨(10만건 생성 약 0.8초 ==> chrome)
	/*
	seq = 0;
	while (seq < 12) 
	{
		tmpArray[++idx] = charcode[math.random() * 16 | 0];
		seq++;
	}
	return prefix + String.fromCharCode.apply(null, tmpArray);
	*/
	// 원래 로직은 끝에서 12자리을 현재 time 구한 8자리 와 random 4자리를 조합한 처리임.(10만건 생성 약 1.3초 ==> chrome)
	/**/
	var tmpStr = (new Date()).getTime();
	tmpStr = ("0000000" + tmpStr.toString(16)).substr(-8);
	seq = 0;
	while (seq < 8) 
	{
		tmpArray[++idx] = tmpStr.charCodeAt(seq);
		seq++;
	}
	seq = 0;
	while (seq < 4) 
	{
		tmpArray[++idx] = charcode[math.random() * 16 | 0];
		seq++;
	}
	return prefix + String.fromCharCode.apply(null, tmpArray);	
};

/**
 * 주어진 nexacro Component, object 에서 사용자 정의 속성값을 얻어온다.<br>
 * ※ gfn_setUserProperty 메소드에 의해 지정된 사용자 정의 속성값을 얻어온다.
 * @public
 * @param {*} target nexacro Component, object
 * @param {string} name 사용자 정의 속성 명
 * @return {*} 주어진 target에 name으로 지정된 사용자 정의 속성값
 * @example
 *
 * // Button00 (text : Button00)
 * this.gfn_setUserProperty(Button00, "text", "user property");
 * trace(Button00.text + " : " + this.gfn_getUserProperty(Button00, "text"));
 *
 * // output : 
 * Button00 : user property
 *
 * @memberOf this
 */
LIB_UTIL.gfn_getUserProperty = function(obj, name)		// 틀고정될 dataset 값
{
	var propName = this._userPropertyPrefix;
	propName += "_" + name;
	
	return obj[propName];
};

/**
 * 주어진 nexacro Component, object 에 사용자 속성을 추가한다.<br>
 * 대상이 원래 가지고 있는 이름을 지정해도 상관없이 동작한다.<br>
 * ※ 사용자 정의 속성을 대상에 바로 사용하면 내부 속성을<br> 
 * 덮어쓸 수 있으므로 본 메소드를 통해서 사용하도록 한다.		 
 * @public
 * @param {*} target nexacro Component, object
 * @param {string} name 사용자 정의 속성 명
 * @param {*=} value 속성 값
 * @example
 *
 * // Button00 (text : Button00)
 * this.gfn_setUserProperty(Button00, "text", "user property");
 * this.gfn_setUserProperty(Button00, "myProp", [0,1,2]);
 * 
 * @memberOf this
 */
LIB_UTIL.gfn_setUserProperty = function(obj, name, value)
{
	var propName = this._userPropertyPrefix;
	propName += "_" + name;
	
	obj[propName] = value;
};

/**
 * 주어진 nexacro Component, object 에서 지정된 사용자 정의 속성을 제거한다.<br>
 * ※ gfn_setUserProperty 메소드에 의해 지정된 사용자 정의 속성을 대상으로 한다.
 * @public
 * @param {*} target nexacro Component, object
 * @param {string} name 제거할 사용자 정의 속성 명
 * @example
 *
 * // Button00 (text : Button00)
 * this.gfn_setUserProperty(Button00, "text", "user property");
 * trace(Button00.text + " : " + this.gfn_getUserProperty(Button00, "text"));
 * 
 * this.gfn_deleteUserProperty(Button00, "text");
 * trace(Button00.text + " : " + this.gfn_getUserProperty(Button00, "text"));		 
 *
 * // output : 
 * Button00 : user property
 * Button00 : undefined
 *
 * @memberOf this
 */
LIB_UTIL.gfn_deleteUserProperty = function(target, name)
{
	var propName = target._userPropertyPrefix;
	propName += "_" + name;
 
	delete target[propName];
};

/**
 * @class    화면에 사용되는 변수에 대한 타입을 확인한다.
 * @param    {Object}  확인하고자 하는 변수
 * @return   {String}  저장된 값
 */
LIB_UTIL.gfn_getVarType = function(value)
{
    if( this.gfn_isNull(value) ) return "NULL";

    if( this.gfn_isNull(value.length) )
    {
        var keycount = 0;
        for(name in value)
        {
            ++keycount;
        }
        
        if( keycount == 0 )
        {
            var strvalue = value+"";
            if( strvalue == "true" || strvalue == "false" )
            {
                return "BOOLEAN";
            }
            else
            {            
                return "NULL";
            }
        }
        else
            return "JSON";
    }
    else 
    {
        var stringlength = value.length;          
        var keylength = 0;
        for(name in value)
        {
            ++keylength;
        }
        
        // String의 key의 갯수는 문자열의길이보다 항상 길다. 
        if( keylength > stringlength )         
            return "STRING";
        else
            return "ARRAY";
    }
};

/**
 * 입력된 값 또는 수식을 검사해 적당한 값을 반환.<br>
 * decoce(비교값, CASE1, 결과값1 [, CASE2, 결과값2, ... ], 디폴트 값);<br>
 * 표현식의 값이 기준값1이면 값1을 출력하고, 기준값2이면 값2를 출력한다.<br>
 * 그리고 기준값이 없으면 디폴트 값을 출력한다.<br>
 * @param {*} * 1. 비교값
 * @param {*} * 2. CASE
 * @param {*} * 3. 결과값 (2,3 반복)
 * @param {*=} * (2,3 반복)
 * @param {*=} * 4.디폴트값
 * @return {*} decode에 의해서 선택된 값.
 * @example
 * trace(this.gfn_decode("1", "1", "One", "2", "Two", "Default")); // output : One;
 * 
 * trace(this.gfn_decode(100, 1, "일", 10, "십", 100, "백"));	// output : 백
 *
 * @memberOf this
 */
LIB_UTIL.gfn_decode = function()
{
	var i;
	var count = arguments.length;
	for( i = 1 ; i < count ; i+=2 )
	{
		if( arguments[0] === arguments[i] )
		{
			return arguments[i+1];
		}
	}
	
	return arguments[i-2];
};


/**
 * 컴포넌트에 지정된 text 의 너비,높이를 반환.<br><br>
 * 2번째 인자에 문자열 값을 지정하면 컴포넌트의 text 속성에 지정된 문자열을 대체하여<br>
 * 계산된 결과를 반환한다. (text 속성값이 변경되지는 않는다.)
 * @param {Comp|Font} nexacro Component 또는 Font 개체
 * @param {string=} text text 속성을 대체할 text (default : text 속성)
 * @param {boolean=} multiline 여부.
 * @param {number=} content_width word wrap이 일어나는 문자열의 경우 길이를 제한하는 정수 값입니다.
 * @param {boolean=} fitText 컴포넌트에 적용된 크기가 아닌 텍스트 자체의 크기만 반환할지 여부 (default:false, HTML 전용)
 * @return {array} [너비, 높이]
 * @example
 *
 * // btn_sample1.style.font ==> Dotum,9
 * trace(this.gfn_getTextSize(btn_sample1)); // output : [69,12]
 *
 * // btn_sample2.style.font ==> Dotum,9,bold
 * trace(this.gfn_getTextSize(btn_sample2)); // output : [80,12]
 *
 * // btn_sample3.style.font ==> Verdana,10
 * trace(this.gfn_getTextSize(btn_sample3)); // output : [83,16]
 *
 * @memberOf this
 */
LIB_UTIL.gfn_getTextSize = function(XComp, text, multiline, content_width, fitText)
{
	var font;
	if ( XComp instanceof nexacro.Style_font )
	{
		font = XComp;
		multiline = this.gfn_isNull(multiline) ? false : multiline;
		if ( multiline && content_width == null )
		{
			content_width = 50;
		}
	}
	else
	{
		font = XComp.currentstyle.font;
		
		if ( this.gfn_isNull(font) )
		{
			font = nexacro.Component._default_font;
		}				
		
		text = this.gfn_isNull(text) ? XComp.text : text;
		if ( this.gfn_isNull(multiline) )
		{
			if ( XComp["wordwrap"] != null )
			{
				multiline = XComp["wordwrap"] != "none"? true: false;
			}
		}
		if ( multiline && content_width == null )
		{
			content_width = XComp.getOffsetWidth();
		}
	}
	
	var size = [0, 0];
	if ( this.gfn_isNull(text) ) return size;  

	if ( nexacro.Browser != "Runtime" )
	{
		var _handle = this._textSizeDiv;
		if ( !_handle )
		{
			var _doc = nexacro._managerFrameDoc;
			_handle = _doc.createElement("div");
			_doc.body.appendChild(_handle);
			this._textSizeDiv = _handle; 
		}
		var _style = _handle.style;
		
		_style.position = "absolute";
		_style.visibility = "hidden";	
		
		if ( multiline )
		{			
			_style.width = content_width + "px";
			_style.height = "auto";
			_style.whiteSpace = "pre-wrap";
			_style.wordBreak = "break-all";
			_style.wordWrap = "break-word";						
		}
		else
		{
			_style.width = "auto";
			_style.height = "auto";
			_style.whiteSpace = "pre";					
			_style.wordWrap = "normal";
		}
		
		_style.font = font._sysvalue;
		
		// 컴포넌트에 적용된 크기가 아닌 텍스트 자체의 크기만 구할 경우 
		if ( fitText == true)
		{
			_style.lineHeight = "100%";
		}
		
		if ( nexacro.Browser == "IE" && nexacro.BrowserVersion < 9 )
		{
			_handle.innerText = text;
			var rect = _handle.getBoundingClientRect();
			size = [rect.right - rect.left, rect.bottom - rect.top];
		}
		else
		{
			_handle.innerHTML = text;
			var rect = _handle.getBoundingClientRect();
			size = [rect.width, rect.height];
		}
		
		//_doc.body.appendChild(_handle);
		//size = [_handle.clientWidth, _handle.clientHeight];
		//delete handle
		//_doc.body.removeChild(_handle);
	}
	else
	{
		size = nexacro._getTextSize2(text, font, multiline, content_width);
	}
	
	size[0] = Math.ceil(size[0]);
	size[1] = Math.ceil(size[1]);
	
	return size;
};