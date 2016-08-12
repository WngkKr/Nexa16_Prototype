/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_RCHART
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline 공통 함수 File Link, 공통변수 선언
*  @Desction 
* 			1) 공통 함수 File Link, 공통변수 선언 
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15	   송원창			   최초 생성
*******************************************************************************
*/

var LIB_RCHART = nexacro.Form.prototype;

LIB_RCHART.rMateChartH5License = "6b777a1fb2d46e4eabbe52cb56ff7c0c52196eeec44b92786b8117a1e6b50c7c:3300650b6348443a4f4220504c2056333a3132442e32302d2045504256423a36432d35432d4545334e302d2d33322e4630452d31453a564c41204c302033452f4c363a30742f203643313a303232303a31453620302a333a324839";
LIB_RCHART.htmlUrl = "http://localhost:8080/rMateChartH5/nexacroChartH5Sample.html";
LIB_RCHART.scriptRootUrl = "http://localhost:8080/rMateChartH5";


// 여러 차트가 생성되었을 경우 itemClickJsFunction등의 함수가 불려질때 이 변수에 해당함수를 부른 차트 객체가 저장됩니다.
/*
this.rMateChartCurrentChartObj = "";

this.rMateChartChartIDArr = new Array();
this.rMateChartScriptURLArr = new Array();
this.rMateChartChartVarsArr = new Array();
this.rMateChartLastInvokeID = new Array();
 */


/*
 * rMateChartH5 Kit for nexacro
 *     version : 3.0
 *     last modified : 2015.04.15
 */

// 차트 생성
LIB_RCHART.rMateChartCreate = function(chartObj, sURL, hURL, cVars)
{
	if (!this.rMateChartChartIDArr)
		this.rMateChartChartIDArr = new Array();
	if (!this.rMateChartScriptURLArr)
		this.rMateChartScriptURLArr = new Array();
	if (!this.rMateChartChartVarsArr)
		this.rMateChartChartVarsArr = new Array();
	if (!this.rMateChartLastInvokeID)
		this.rMateChartLastInvokeID = new Array();
	this.rMateChartChartIDArr.push(chartObj.name);
	this.rMateChartScriptURLArr.push(sURL);
	this.rMateChartChartVarsArr[this.rMateChartChartVarsArr.length] = cVars;
	this.rMateChartLastInvokeID.push("");

chartObj.addEventHandler("onloadcompleted", this.rMateChart_DocumentComplete);
chartObj.addEventHandler("onusernotify", this.rMateChart_UserNotify);
	chartObj.set_url(hURL);
};

// 차트 삭제
LIB_RCHART.rMateChartClear = function(chartObj)
{
	if (chartObj == null)
		return;

	chartObj.removeEventHandler("onloadcompleted", this.rMateChart_DocumentComplete);
	chartObj.removeEventHandler("onusernotify", this.rMateChart_UserNotify);
	chartObj.destroy();
	chartObj = null;
};

// 레이아웃 설정
LIB_RCHART.rMateChartSetLayout = function(chartObj, x)
{
	if (chartObj._ifrm_elem._plugin_object) { // Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartSetLayout", x);
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetLayout(x);
};

// 레이아웃 url 설정
LIB_RCHART.rMateChartSetLayoutURL = function(chartObj, u)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartSetLayoutURL", u);
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetLayoutURL(u);
};

// 슬라이드 차트 레이아웃 설정
LIB_RCHART.rMateChartSetSlideLayoutSet = function(chartObj, x)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		if (typeof(x) == "string")
			doc.callMethod("rMateChartSetSlideLayoutSet", x);
		else {		// for array
			var xstr = "[";
			for (var i = 0; i < x.length; i++) {
				if (typeof(x[i]) == "object") {
					xstr += "{";
					var pstr = "";
					for (var propName in x[i]) {
						if (pstr != "")
							pstr += ",";
						pstr += propName + ":";
						if (typeof(x[i][propName]) == "string")
							pstr += this.rMateChartEncodeParamStr(x[i][propName]);
						else
							pstr += x[i][propName];
					}
					xstr += pstr + "}";
				} else
					xstr += this.rMateChartEncodeParamStr(x[i].toString());
				if (i < x.length - 1)
					xstr += ",";
			}
			xstr += "]";
			doc.callMethod("rMateChartSetSlideLayoutSet", xstr);
		}
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetSlideLayoutSet(x);
};

// 데이타 설정
LIB_RCHART.rMateChartSetData = function(chartObj, d)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		if (typeof(d) == "string")
			doc.callMethod("rMateChartSetData", d);
		else {		// for array
			var xstr = "[";
			for (var i = 0; i < d.length; i++) {
				if (typeof(d[i]) == "object") {
					xstr += "{";
					var pstr = "";
					for (var propName in d[i]) {
						if (pstr != "")
							pstr += ",";
						pstr += propName + ":";
						if (typeof(d[i][propName]) == "string")
							pstr += this.rMateChartEncodeParamStr(d[i][propName]);
						else
							pstr += d[i][propName];
					}
					xstr += pstr + "}";
				} else
					xstr += this.rMateChartEncodeParamStr(d[i].toString());
				if (i < d.length - 1)
					xstr += ",";
			}
			xstr += "]";
			doc.callMethod("rMateChartSetData", xstr);
		}
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetData(d);
};

// 데이타 url 설정
LIB_RCHART.rMateChartSetDataURL = function(chartObj, u)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartSetDataURL", u);
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetDataURL(u);
};

// 슬라이드 차트 데이타 설정
LIB_RCHART.rMateChartSetSlideDataSet = function(chartObj, d)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		if (typeof(d) == "string")
			doc.callMethod("rMateChartSetSlideDataSet", d);
		else {
			var xstr = this.rMateChartEncodeJavaScriptObj(d);
			doc.callMethod("rMateChartSetSlideDataSet", xstr);
		}
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSetSlideDataSet(d);
};

// 차트 이미지 가져오기 - HTML5모드에서만 정상 작동
LIB_RCHART.rMateChartGetSnapshot = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartGetSnapshot");
//		chartObj._ifrm_elem._plugin_object.callMethod("rMateChartGetSnapshot()");
		var objHtmlElementCollection = chartObj.document.getElementById("invokeData"); 
		return objHtmlElementCollection.value; 
	}
	else	// HTML5
		return chartObj._ifrm_elem._window.rMateChartGetSnapshot();
};

// 이미지 저장 - HTML5모드에서만 정상 작동
LIB_RCHART.rMateChartSaveAsImage = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartSaveAsImage");
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartSaveAsImage();
};

// legend 범례 전체 선택
LIB_RCHART.rMateChartLegendAllCheck = function(chartObj, b)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartLegendAllCheck", b);
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartLegendAllCheck(b);
};

// 프리로더 표시
LIB_RCHART.rMateChartShowAdditionalPreloader = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartShowAdditionalPreloader");
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartShowAdditionalPreloader();
};

// 프리로더 지움
LIB_RCHART.rMateChartRemoveAdditionalPreloader = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartRemoveAdditionalPreloader");
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartRemoveAdditionalPreloader();
};

// 데이터 에디터 표시
LIB_RCHART.rMateChartShowDataEditor = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartShowDataEditor");
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartShowDataEditor();
};

// 데이터 에디터 지움
LIB_RCHART.rMateChartRemoveDataEditor = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartRemoveDataEditor");
	} else	// HTML5
		chartObj._ifrm_elem._window.rMateChartRemoveDataEditor();
};

//차트 데이터 가져오기
LIB_RCHART.rMateChartGetChartData = function(chartObj)
{
	if (chartObj._ifrm_elem._plugin_object) {	// Runtime
		var doc = chartObj.getProperty("Document").getProperty("parentWindow");
		return doc.callMethod("rMateChartGetChartData");
	} else	// HTML5
		return chartObj._ifrm_elem._window.rMateChartGetChartData();	
};

//////////////////////// for embeded ie ///////////////////////////////////////////////////////

LIB_RCHART.rMateChartEncodeParamStr = function(str)
{
	if (str == null)
		return "null";
	
	var ret = "'";
	var rgExp1 = /'/g;
	var rgExp2 = /\n/g;
	ret += str.replace(rgExp1, "\\'").replace(rgExp2, "");
	ret += "'";
//trace("rMateChartEncodeParamStr:"+ret);
	return ret;
};

LIB_RCHART.rMateChartEncodeJavaScriptObj = function(obj)
{
	switch(typeof(obj)) {
		case "number" :
			return obj.toString();
		case "boolean" :
			return obj.toString();
		case "string" :
			return this.rMateChartEncodeParamStr(obj);
		case "null" :
			return "null";
		case "undefined" :
			return "undefined";
		case "object" :
			var xstr = "";
			if (obj.length) {	// for array
				xstr = "[";
				for (var i = 0; i < obj.length; i++) {
					if (i > 0)
						xstr += ",";
					xstr += this.rMateChartEncodeJavaScriptObj(obj[i]);
				}
				xstr += "]";
			} else {
				xstr += "{";
				var pstr = "";
				for (var propName in obj) {
					if (pstr != "")
						pstr += ",";
					pstr += propName + ":";
					pstr += this.rMateChartEncodeJavaScriptObj(obj[propName]);
				}
				xstr += pstr + "}";
			}
			return xstr;
		default :
			trace("rMateChartEncodeXML unknown type:"+typeof(obj));
			return "undefined";
	}
	return "undefined";
};

LIB_RCHART.rMateChartFindChartIDArr = function(id)
{
	if (id == null)
		return -1;

	for (var i = 0; i < this.rMateChartChartIDArr.length; i++) {
		if (id == this.rMateChartChartIDArr[i])
			return i;
	}
	return -1;
};

LIB_RCHART.rMateChart_DocumentComplete = function(obj, e)
{
//trace("rMateChart_DocumentComplete");
	var p;
	if (obj["rMateChartCreate"]) {
		p = obj;
	} else {
		p = obj;
		if (p["parent"] && p["parent"]["rMateChartCreate"])
			p = p.parent;
		else {
			if (p["parent"]["parent"] && p["parent"]["parent"]["rMateChartCreate"])
				p = p.parent.parent;
			else {
				if (p["parent"]["parent"]["parent"] && p["parent"]["parent"]["parent"]["rMateChartCreate"])
					p = p.parent.parent.parent;
			}
		}
	}
	
	if (!p) {
		trace("rMateChart_UserNotify Can't find parent Form:"+obj.name);
		return;
	}

	var chrarIdx = p.rMateChartFindChartIDArr.call(p, obj.name);
	if (chrarIdx < 0) {
		trace("rMateChart_DocumentComplete Can't find chart id:"+obj.name);
		return;
	}
	if (obj._ifrm_elem._plugin_object) {	// Runtime
		var doc = obj.getProperty("Document").getProperty("parentWindow");
		doc.callMethod("rMateChartSetLicense", p.rMateChartH5License);
		doc.callMethod("rMateChartCreate", obj.name, p.rMateChartScriptURLArr[chrarIdx], p.rMateChartChartVarsArr[chrarIdx], "100%", "100%", "#FFFFFF");
	} else {		// HTML5
		//alert(p.rMateChartH5License)
		obj._ifrm_elem._window.rMateChartSetLicense(p.rMateChartH5License);
		obj._ifrm_elem._window.rMateChartCreate(obj.name, p.rMateChartScriptURLArr[chrarIdx], p.rMateChartChartVarsArr[chrarIdx], '100%', '100%', '#FFFFFF');
	}
};

LIB_RCHART.rMateChart_UserNotify = function(obj, e)
{
//trace("rMateChart_UserNotify:"+obj.name+":"+e.userdata);
	// 불려진 차트를 저장
	var p;
	if (obj["rMateChartCreate"]) {
		p = obj;
	} else {
		p = obj;
		if (p["parent"] && p["parent"]["rMateChartCreate"])
			p = p.parent;
		else {
			if (p["parent"]["parent"] && p["parent"]["parent"]["rMateChartCreate"])
				p = p.parent.parent;
			else {
				if (p["parent"]["parent"]["parent"] && p["parent"]["parent"]["parent"]["rMateChartCreate"])
					p = p.parent.parent.parent;
			}
		}
	}
	
	if (!p) {
		trace("rMateChart_UserNotify Can't find parent Form:"+obj.name);
		return;
	}

	p.rMateChartCurrentChartObj = obj;

	// invoked로 시작되는 경우에만 처리.
	var req = e.userdata;
	if (req.indexOf("invoked") != 0)
		return;

	//중복 발생하는 경우가 있어 invoke ID 비교
	var chrarIdx = p.rMateChartFindChartIDArr.call(p, obj.name);
	if (chrarIdx < 0) {
		trace("rMateChart_UserNotify Can't find chart id:"+obj.name);
		return;
	}
	if (req == p.rMateChartLastInvokeID[chrarIdx])
		return;
	p.rMateChartLastInvokeID[chrarIdx] = req;

	if (obj._ifrm_elem._plugin_object) {	// Runtime
		var objDocument = obj.getProperty("Document").getProperty("parentWindow");
		var objHtmlElementCollection = objDocument.getProperty("invokeData"); 
		req = objHtmlElementCollection; 
	} else {
		var objDocument = obj.document;
		var objHtmlElementCollection = objDocument.getElementById("invokeData"); 
		req = objHtmlElementCollection.value; 
	}
//trace(req);

	var ret;
	var hr;

	if (req == null)
		return;
	if (req.indexOf("<") != 0)
		return;

	var xmlDoc, xmlParser;
	var invoke, invokeName;
	var args, argArr;
	if (objDocument) {	// Runtime
		xmlParser = new DomParser;
		xmlParser.onParseError = p.rMateChartParseErrorHandler;
		xmlDoc = xmlParser.parseFromString(req, "text/xml");

		invoke = xmlDoc.getElementsByTagName("invoke");
		if (invoke.length > 0) {
			invokeName = invoke[0].getAttribute("name");
		}
		
		args = xmlDoc.getElementsByTagName("arguments");
		if (args.length > 0 && args[0].childNodes && args[0].childNodes.length > 0) {
			argArr = [];
			for (i = 0; i < args[0].childNodes.length; i++) {
				if (args[0].childNodes[i]) {
					var arg = p.rMateChartParseArgNode.call(p, args[0].childNodes[i]);
					argArr[i] = arg;
				}
			}
		}
	} else {	// HTML5
		if (eval("window.DOMParser")) {
			xmlParser = eval("new DOMParser()");
			xmlDoc = xmlParser.parseFromString(req, "text/xml");
		} else { // Internet Explorer
			xmlDoc = eval("new ActiveXObject('Microsoft.XMLDOM')");
			eval("xmlDoc.async = false;");
			xmlDoc.loadXML(req);
			if (xmlDoc.parseError.errorCode != 0) {
				trace("rMateChart_UserNotify Parse Error: " + xmlDoc.parseError.reason + " (line: " + xmlDoc.parseError.line + ", linepos: " + xmlDoc.parseError.linepos + ")");
				xmlDoc = null;
				return;
			}
		}

		invoke = xmlDoc.getElementsByTagName("invoke");
		if (invoke.length > 0) {
			invokeName = invoke[0].getAttribute("name");
		}

		args = xmlDoc.getElementsByTagName("arguments");
		if (args.length > 0 && args[0].childNodes && args[0].childNodes.length > 0) {
			argArr = [];
			for (i = 0; i < args[0].childNodes.length; i++) {
				if (args[0].childNodes[i]) {
					var arg = p.rMateChartParseArgNode.call(p, args[0].childNodes[i]);
					argArr[i] = arg;
				}
			}
		}
	}
	
	if (typeof(p[invokeName]) == "function") {
		var func = p[invokeName];
		if (argArr && argArr.length > 0) {
			ret = func.apply(p, argArr);
		} else
			ret = func.apply(p);
		hr = 0;
	} else
		trace("rMateChart_UserNotify error : invalid invoke name "+invokeName);

	xmlParser = null;
	xmlDoc = null;
	
	return hr;
};

LIB_RCHART.rMateChartEncodeXML = function(value)
{
	var xstr;
	switch(typeof(value)) {
		case "number" :
			return "<number>" + value + "</number>";
		case "string" :
			return "<string><"+"![CDATA[" + value + "]]" + "></string>";
		case "null" :
			return "<null/>";
		case "undefined" :
			return "<undefined/>";
		case "boolean" :
			if (value)
				return "<true/>";
			else
				return "<false/>";
		case "object" :
			if (value.length) {	// for array
				xstr = "<array>";
				for (var iii = 0; iii < value.length; iii++) {
					xstr += "<property id=\"" + iii + "\">";
					xstr += this.rMateChartEncodeXML(value[iii]);
					xstr += "</property>";
				}
				xstr += "</array>";
			} else {
				xstr = "<object>";
				for(var propName in value) {
					xstr += "<property id=\"" + propName + "\">";
					xstr += this.rMateChartEncodeXML(value[propName]);
					xstr += "</property>";
				}
				xstr += "</object>";
			}
			return xstr;
		default :
			trace("rMateChartEncodeXML unknown type:"+typeof(value));
			return "<undefined/>";
	}
	return "<undefined/>";
};

LIB_RCHART.getNodeText = function(node)
{
	if (node.childNodes.length > 0)
		node = node.childNodes[0];
	if (node.nodeValue)		// Runtime
		return node.nodeValue;
	else if (node.text)		// ie < 9
		return node.text;
	else if (node.textContent)	// ie 9
		return node.textContent;
	return null;
},

LIB_RCHART.rMateChartParseArgNode = function(node)
{
	var nM = node.nodeName;
//trace("rMateChartParseArgNode nM:"+nM);
	switch(nM) {
		case "number" :
			return Number(this.getNodeText(node));
		case "string" :
			return unescape(this.getNodeText(node));
		case "undefined" :
			return undefined;
		case "null" :
			return null;
		case "true" :
			return true;
		case "false" :
			return false;
		case "bool" :
			if (this.getNodeText(node) == "true")
				return true;
			else
				return false;
		case "object" :
			var obj = {};
			if (node.childNodes && node.childNodes.length > 0) {
				for (var ii = 0; ii < node.childNodes.length; ii++)
					if (node.childNodes[ii].nodeName == "property")
						obj[node.childNodes[ii].attributes.getNamedItem("id").value] = this.rMateChartParseArgNode(node.childNodes[ii].childNodes[0]);
			}
			return obj;
		case "array" :
			var arr = [];
			if (node.childNodes && node.childNodes.length > 0) {
				for (var iii = 0; iii < node.childNodes.length; iii++)
					if (node.childNodes[iii].nodeName == "property")
						arr[iii] = this.rMateChartParseArgNode(node.childNodes[iii].childNodes[0]);
			}
			return arr;
		default :
			trace("rMateChartParseArgNode unknown type:"+nM);
	}
	return null;
};

LIB_RCHART.rMateChartParseErrorHandler = function(parser, parseException)
{
    trace("rMateChartParseErrorHandler Parse Error: " + parseException.message + " (line: " + parseException.line + ", column: " + parseException.column + ")");
};

/*********************************************************************************************
** function name        : rMateChartDataSetToXml()
** function description : rMateChart용 data XML 형태로 리턴
** argument             : 데이타셋
** return Type          : String
** return description   : rMateChart용 data XML
*********************************************************************************************/
LIB_RCHART.rMateChartDataSetToXml = function(obj)
{
	var dataStr = "<items>\n";
	for (var i = 0; i < obj.rowcount; i++) {
		dataStr += "<item>\n";
		for (var j = 0; j < obj.getColCount(); j++) {
			if (obj.getColumn(i,j) != null) {
				dataStr += " <"+obj.getColID(j)+">"+this.rMateChartXmlEncoder(obj.getColumn(i,j).toString())+"</"+obj.getColID(j)+">\n";
			}
		}
		dataStr += "</item>\n";
	}
	dataStr += "</items>";
	return dataStr;
};

/*********************************************************************************************
** function name        : gf_ParseXmlData()
** function description : rMateChart용 data XML 형태로 리턴
** argument             : 데이타셋, 데이터컬럼
** return Type          : String
** return description   : rMateChart용 data XML
*********************************************************************************************/
LIB_RCHART.rMateChartDataSetToXmlWithColumn = function(objDs, arrVal)
{
	if (arrVal == null)
		return this.rMateChartDataSetToXml(objDs);

	var arrStr = arrVal.split(",");
	var rtnVal = "<items>";
	for (var i = 0; i < objDs.rowcount; i++) {
		rtnVal += "<item>";
		for (var j = 0; j < arrStr.length; j++) {
			rtnVal += "<" + arrStr[j] + ">" + this.rMateChartXmlEncoder(objDs.getColumn(i, arrStr[j]).toString()) + "</" + arrStr[j] + ">";
		}
		rtnVal += "</item>\n";
	}
	rtnVal += "</items>";
	return rtnVal;
};

LIB_RCHART.rMateChartXmlEncoder = function(str)
{
	var ret = "";
	if (str != null && str.length > 0)
		ret = str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
	return ret;
};