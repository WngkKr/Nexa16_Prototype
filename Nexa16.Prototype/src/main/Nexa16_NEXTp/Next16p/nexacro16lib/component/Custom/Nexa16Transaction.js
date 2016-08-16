/** 
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath  
*  @FileName LIB_TRAN 
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate  
*  @Version 1.0
*  @Outline transaction 관련 공통 함수 모음
*  @Desction 
* 			1) transaction 관련 공통 함수 모음
* 
*  
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15      송원창             최초 생성
*******************************************************************************
*/

var LIB_TRAN = nexacro.Form.prototype;

/**
 * Biz Service Transation Call
 * @param   :  	1. strSvcId 		: Transaction을 구분하기 위한 ID 값입니다.
 * @param	:   2. strSvcUrl 		: Transaction을 요청할 주소 값입니다.
 * @param	:   3. inData			: 입력값으로 보낼 Dataset 의 ID, a=b의 형태로 실제이름과 입력이름을 매칭.
 * @param	:   4. outData			: 처리결과를 받을 Dataset 의 ID, a=b의 형태로 실제이름과 입력이름을 매칭.
 * @param	:   5. strArg			: 입력값으로 보낼 arguments, strFromDate="20120607"
 * @param	:   6. callBackFnc		: transaction의 결과를 돌려줄 Function의 이름. 
 * @param	:	7. svcType			: Transaction 유형 R:조회,C:등록,U:수정,D:삭제,S:저장, N:성공 실패시 메세지 처리 안함(무시)
 * @param	:   8. isAsync			: 비동기 여부를 지정.	-> Default : true(ASync) 
 * @param	:	9. bWait			: WaitCursor true/false
 * @return  : 	DataSet
 *
 * 기      능	: 	Dataset의 값을 갱신하기위한 서비스를 호출하고, transaction이
 *                  완료되면 CallBack Function을 수행하는 Method
 * 변경사항 :
 * inData, outData를 값을 a=b 형태로 받는것에서 a b c=f 형태 모두를 받는 것으로 수정
 */




LIB_TRAN.gfn_transaction = function (strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, svcType, isAsync, bWait)
{
	var svcPrefix = "";//application.gfn_getServicePrefix();

	var strServiceUrl = svcPrefix + strSvcUrl;
	var arguments = "";
	if (this.gfn_isNull(strArg))
	{
		arguments = "";
	}
	else
	{
		arguments = strArg;
	}

	// Async
	if ((isAsync != true) && (isAsync != false)) isAsync = true;

	// pyk 20160126 추가 callBackFnc 문자열로 안주고 함수 자체로 줘도 되도록
	if(callBackFnc && typeof callBackFnc == 'function'){
		var fnTrCallback = callBackFnc;
		var strCallbackFuncName = Eco.getUniqueId('transactioncallback_');
		var oForm = this;
		this[strCallbackFuncName] = function(strSvcID, nErrorCode, strErrorMag){
			oForm[strCallbackFuncName] = null;// 참조 없애고
			fnTrCallback.call(oForm, strSvcID, nErrorCode, strErrorMag);
		};
		callBackFnc = strCallbackFuncName;
	}


	// Service ID  And callBackFnc Merge
	var strMergeSvcID = strSvcId + "|" + callBackFnc + "|" + svcType;

	// WaitCursor
	if (this.gfn_isNull(bWait)){
		this.setWaitCursor();  // 기본값으로 동작 - userwaitcursor속성에 따라 wait상태로 설정함
	}else{
		if (bWait) { // 무조건 사용
			this.setWaitCursor(true, true);
		} else {  // 무조건 미사용
			this.setWaitCursor(false, false);
		}
	}

	this.transaction( strMergeSvcID
		, strServiceUrl
		, inData                      	// inDataSet
		, outData                     	// outDataSet
		, arguments
		, "gfn_transactionCallback"		// strCallbackFunc
		, isAsync                     	// bAsync
		, 2                      		// nDataType : 0(XML 타입), 2(SSV 타입) --> HTML5에서는 1(Binary 타입)은 지원안함
		, false);                    	// bCompress
};

/**
 * Transaction Callback
 * @param 	:   strSvcID 		: 서비스아이디
 * @param 	:	nErrorCode  	: 에러코드
 * @param 	:	strErrorMsg 	: 에러메세지
 */
LIB_TRAN.gfn_transactionCallback = function (strSvcId, nErrorCode, strErrorMsg)
{
	var self = this;// 콜백 때문에
	var strArrSvcID 	= strSvcId.split("|");
	var serviceID		= strArrSvcID[0];
	var callbackFunc	= strArrSvcID[1];
	var strSvcType		= strArrSvcID[2];
		// WaitCursor
	this.setWaitCursor(false, true);

	var strDefaultErrMsg = "";
	// Server Error
	if (nErrorCode != 0) // 0인경우 성공
	{
		// coolmind : 공통오류코드 예외처리 추가
		if (nErrorCode == -1)
		{
			strDefaultErrMsg = "사용자 인증에 실패하였습니다. 로그인을 다시 시도해 주세요.";
		} else if (nErrorCode == -2)
		{
			strDefaultErrMsg = "권한이 없습니다.";
		} else if (nErrorCode == -3)
		{
			strDefaultErrMsg = "세션이 만료되었습니다.";
			alert(strDefaultErrMsg);
			this.gfn_Arrange("closeAll");  //coolmind : 열려있는 화면 모두 닫기
			application.gfn_showFrame("login");  // coolmind : 로그인화면이 보이도록한 공통함수 호출
			return; // TR을 호출한 화면의 callbackfunction을 call하지 않음

		} else if (nErrorCode == -5)
		{
				strDefaultErrMsg = "파일 업로드 룰 위반 (파일 업로드에 실패)";
		} else if (nErrorCode == -6)
		{
			strDefaultErrMsg = "파일 업로드 룰 위반 (허용된 확장자의 파일이 아닌 경우)";
		} else if (nErrorCode == -7)
		{
				strDefaultErrMsg = "파일 업로드 룰 위반 (허용된 파일 크기를 초과)";
		}
		else
		{
			// 각각의 Type에 맞는 실패 메시지 처리...
			switch(strSvcType)
			{
				case "R" :  // 조회
					strDefaultErrMsg = "조회 실패했습니다.";
					break;

				case "C" :  // 등록
					strDefaultErrMsg = "등록 실패했습니다.";
					break;

				case "U" :  // 수정
					strDefaultErrMsg = "수정 실패했습니다.";
					break;

				case "D" :  // 삭제
					strDefaultErrMsg = "삭제 실패했습니다.";
					break;

				case "S" :  // 저장
					strDefaultErrMsg = "저장 실패했습니다.";
					break;

				default :
					strDefaultErrMsg = "작업 실패했습니다.";
					break;
			}
		}

		if (strErrorMsg != "")
			strDefaultErrMsg = strErrorMsg;
			// pyk 수정
		if (strSvcType != "N")
		{
			// "서비스 실패["+nErrorCode+"]"
			this.gfn_showMsgBox(this, strDefaultErrMsg, "알림.", "error", function(){
				if(callbackFunc)self[callbackFunc](serviceID, nErrorCode, strErrorMsg);
			});
		}
		else
		{
			if(callbackFunc)self[callbackFunc](serviceID, nErrorCode, strErrorMsg);
		}

	}
	else
	{
		var strMsg	= "";
		// 각각의 Type에 맞는 성공 메시지 처리...
		switch(strSvcType)
		{
		case "R" :  // 조회
			strMsg	= "조회가";
			break;
		case "C" :  // 등록
			strMsg	= "등록이";
			break;

		case "U" :  // 수정
			strMsg	= "저장이";//수정이
			break;

		case "D" :  // 삭제
			strMsg	= "삭제가";
			break;

		case "S" :  // 저장
			strMsg	= "저장이";
			break;

		default :
			strMsg	= "작업이";
			break;
		}

		//var strText	= utlf_getMsg(["I003", strMsg]);
		var strText	= strMsg+" 완료되었습니다.";
		// pyk 수정함
		//if (!(strSvcType == "R" ||strSvcType == "N") )
		if (strSvcType == "C" || strSvcType == "U" || strSvcType == "D" || strSvcType == "S")
		{
			//if (strErrorMsg != "")
			//	strText = strErrorMsg;
			// pyk 수정// 서비스 성공 대신 알림으로
			this.gfn_showMsgBox(this, strText, "알림", "confirm", function(){
				if(callbackFunc)self[callbackFunc](serviceID, nErrorCode, strErrorMsg);
			});
		}
		else
		{
			if(callbackFunc)self[callbackFunc](serviceID, nErrorCode, strErrorMsg);
		}
	}

	//if (this.gfn_isNull(callbackFunc)) return;

	//eval("this."+callbackFunc + "('" + serviceID + "', nErrorCode, strErrorMsg);");
};