//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================

//==============================================================================

if (nexacro._Browser == "Runtime")
{
    nexacro._createXPushHandle = nexacro.__createXPushHandle;
    nexacro._setXPushHandleOnEvent = nexacro.__setXPushHandleOnEvent;
    nexacro._setXPushHandleOnFunction = nexacro.__setXPushHandleOnFunction;
    nexacro._destroyXPushHandle = nexacro.__destroyXPushHandle;
    nexacro._setXPushControlRetry = nexacro.__setXPushControlRetry;
    nexacro._setXPushHandleDebug = nexacro.__setXPushHandleDebug;
    nexacro._setXPushHandleKeepAliveTime = nexacro.__setXPushHandleKeepAliveTime;
    nexacro._setXPushHandleLayoutURL = nexacro.__setXPushHandleLayoutURL;
    nexacro._setXPushHandleRetry = nexacro.__setXPushHandleRetry;
    nexacro._setXPushHandleAsync = nexacro.__setXPushHandleAsync;
    nexacro._fireXPushHandleErrorEvent = nexacro.__fireXPushHandleErrorEvent;
    nexacro._commandXPushHandle = nexacro.__commandXPushHandle;
    nexacro._connectXPushHandle = nexacro.__connectXPushHandle;
    nexacro._disconnectXPushHandle = nexacro.__disconnectXPushHandle;
    nexacro._resumeXPushHandle = nexacro.__resumeXPushHandle;
    nexacro._suspendXPushHandle = nexacro.__suspendXPushHandle;
    nexacro._sendResponseXPushHandle = nexacro.__sendResponseXPushHandle;
    nexacro._requestMessageXPushHandle = nexacro.__requestMessageXPushHandle;
}
else
{
    nexacro._createXPushHandle = nexacro._emptyFn;
    nexacro._setXPushHandleOnEvent = nexacro._emptyFn;
    nexacro._setXPushHandleOnFunction = nexacro._emptyFn;
    nexacro._destroyXPushHandle = nexacro._emptyFn;
    nexacro._setXPushControlRetry = nexacro._emptyFn;
    nexacro._setXPushHandleDebug = nexacro._emptyFn;
    nexacro._setXPushHandleKeepAliveTime = nexacro._emptyFn;
    nexacro._setXPushHandleLayoutURL = nexacro._emptyFn;
    nexacro._setXPushHandleRetry = nexacro._emptyFn;
    nexacro._setXPushHandleAsync = nexacro._emptyFn;
    nexacro._fireXPushHandleErrorEvent = nexacro._emptyFn;
    nexacro._commandXPushHandle = nexacro._emptyFn;
    nexacro._connectXPushHandle = nexacro._emptyFn;
    nexacro._disconnectXPushHandle = nexacro._emptyFn;
    nexacro._resumeXPushHandle = nexacro._emptyFn;
    nexacro._suspendXPushHandle = nexacro._emptyFn;
    nexacro._sendResponseXPushHandle = nexacro._emptyFn;
    nexacro._requestMessageXPushHandle = nexacro._emptyFn;
}

//==============================================================================

//==============================================================================
//nexacro.Event.XPushEventInfo
//XPush에 요청된 작업이 성공했을 때 발생되는 이벤트에서 사용되는 EventInfo Object
//==============================================================================
if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.Event.XPushEventInfo)
{
    nexacro.Event.XPushEventInfo = function (eventid, reason, action, serverip, serverport, command, pushmessageobject)
    {
        this.eventid = eventid;												// 이벤트ID
        this.reason = reason;
        this.action = action
        this.serverip = serverip;
        this.serverport = serverport;
        this.command = command;
        this.message = pushmessageobject;
        this.statuscode = "";
        this.errormsg = "";
        if (pushmessageobject.returnvalue != undefined && pushmessageobject.returnvalue[0] != undefined)
            this.returnvalue = pushmessageobject.returnvalue[0].count;
        if (this.command == undefined)
        {
            this.command = null;
        }
    };

    var _pXPushEventInfo = nexacro.Event.XPushEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
    _pXPushEventInfo._type = "nexacroXPushEventInfo";
    _pXPushEventInfo._type_name = "XPushEventInfo";

    delete _pXPushEventInfo;
}

//==============================================================================
//nexacro.Event.XPushErrorEventInfo
//XPush에 요청된 작업이 실패했을 때 발생되는 이벤트에서 사용되는 EventInfo Object
//==============================================================================
if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.Event.XPushErrorEventInfo)
{
    nexacro.Event.XPushErrorEventInfo = function (strEventId, action, intErrorCode, strErrorMsg, strServerip, strServerport, strCommand)
    {
        this.errortype = "ObjectError";
        this.action = action;
        this.eventid = strEventId;												// 이벤트ID
        //this.errorcode = intErrorCode;
        this.statuscode = intErrorCode;
        this.errormsg = strErrorMsg;
        this.serverip = strServerip;
        this.serverport = strServerport;
        this.command = strCommand;
        if (this.command == undefined)
        {
            this.command = null;
        }
    };
    var _pXPushErrorEventInfo = nexacro.Event.XPushErrorEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
    _pXPushErrorEventInfo._type = "nexacroXPushErrorEventInfo";
    _pXPushErrorEventInfo._type_name = "XPushErrorEventInfo";

    delete _pXPushErrorEventInfo;
}

//==============================================================================
//nexacro.Event.XPushKeepAliveEventInfo
//XPush
//==============================================================================
if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.Event.XPushKeepAliveEventInfo)
{
    nexacro.Event.XPushKeepAliveEventInfo = function (eventid, type)
    {
        this.eventid = eventid;												// 이벤트ID
        this.type = type;
    };

    var _pXPushKeepAliveEventInfo = nexacro.Event.XPushKeepAliveEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
    _pXPushKeepAliveEventInfo._type = "nexacroXPushKeepAliveEventInfo";
    _pXPushKeepAliveEventInfo._type_name = "XPushKeepAliveEventInfo";

    //_pXPushErrorEventInfo = null;
    delete _pXPushErrorEventInfo;
}

//==============================================================================
//nexacro.Event.XPushRequestMessageCountEventInfo
//XPush
//==============================================================================
if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.Event.XPushRequestMessageCountEventInfo)
{
    nexacro.Event.XPushRequestMessageCountEventInfo = function (eventid, userid, sendtype, sendid, receivetype, receiveid)
    {
        this.eventid = eventid;												// 이벤트ID
        this.userid = userid;
        this.sendtype = sendtype;
        this.sendid = sendid;
        this.receivetype = receivetype;
        this.receiveid = receiveid;
    };

    var _pXPushRequestMessageCountEventInfo = nexacro.Event.XPushRequestMessageCountEventInfo.prototype = nexacro._createPrototype(nexacro.Event);
    _pXPushRequestMessageCountEventInfo._type = "nexacroXPushRequestMessageCountEventInfo";
    _pXPushRequestMessageCountEventInfo._type_name = "XPushRequestMessageCountEventInfo";

    //_pXPushErrorEventInfo = null;
    delete _pXPushErrorEventInfo;
}

//==============================================================================
//nexacro.XPush
//==============================================================================
if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.CommandControl)
{
    nexacro.CommandControl = function (name, obj)
    {
        this._id = nexacro.Device.makeID();
        nexacro.Device._userCreatedObj[this._id] = this;
        this.actiontype;
        this.callback;
        this.check = "0";
        this.messagekey;
        this.messagetype;
        this.objdataset;
        this.objform;
        this.row = -1;
        this.type = "update";
        this.useactiveformcallback = false;
    };

    var _pCommandControl = nexacro.CommandControl.prototype = nexacro._createPrototype(nexacro.EventSinkObject);
    _pCommandControl._type = "nexacroCommandControl";
    _pCommandControl._type_name = "CommandControl";

    _pCommandControl.destroy = function ()
    {
        var params = '""';
        var jsonstr;
        return true;
    };

    _pCommandControl.on_created = function () { };

    _pCommandControl.equal = function (other)
    {
        if (this.callback != other.callback)
            return false;
        if (this.check != other.check)
            return false;
        if (this.messagekey != other.messagekey)
            return false;
        if (this.messagetype != other.messagetype)
            return false;

        // objdataset, objform은 객체라 조건이 ===, !== 이런식임. 
        if (this.objdataset !== other.objdataset)
            return false;
        if (this.objform !== other.objform)
            return false;

        if (this.row != other.row)
            return false;
        if (this.type != other.type)
            return false;
        if (this.useactiveformcallback != other.useactiveformcallback)
            return false;

        return true;
    };

    _pCommandControl.remove = function (idx)
    {
        return (idx < 0 || idx > this.length) ? this : this.slice(0, idx).concat(this.slice(idx + 1, this.length));
    };

    //_pCommandControl = null;
    delete _pCommandControl;
}

if ((!nexacro.Device || nexacro._OS == "Android") && !nexacro.XPush)
{
    nexacro.XPush = function (name, obj)
    {
        this.name = name || "";
        this.enableevent = true;

        //		this.channeltype; //only single
        this.commandlist = new Array;
        this.controlretry = "5";
        this.debug = false;
        this.iplist = new Array;
        this.keepalivetime = "30";
        this.keeptimeout = "60";
        this.layouturl = "";
        this.retry = 1;
        this.sessionid = "";
        this.timeout = "30";
        this.userid = "";
        this._parent_elem = obj;
        this.errorcode;
        this.errormsg;
        this.async = true; //runtime만 = false 가능
        this.connectSuccess = false; //connect 됐는지 여부 
        this.registerDeviceSuccess = false; //regist 됐는지 여부 
        this.action;

        this._event_list = {
            "onsuccess": 1, "onerror": 1, "onkeepalive": 1
        };

        this.onsuccess = null;
        this.onerror = null;

        var params = '""';
        //var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"constructor", "params":' + params + '}';

        if (this._parent_elem)
        {
            var _win = this._parent_elem._getWindow();
            if (_win)
            {
                this.handle = nexacro._createXPushHandle(this, _win.handle);
                if (this.handle)
                {
                    // onevent
                    nexacro._setXPushHandleOnEvent(this.handle, this._onxpush, this._onsuccess, this._onerror, this._onkeepalive);

                    // onfunction
                    nexacro._setXPushHandleOnFunction(this.handle, this._getrandomipinfo, this._seterror);
                }
            }
        }
    };

    var _pXPush = nexacro.XPush.prototype = nexacro._createPrototype(nexacro._EventSinkObject);
    _pXPush._type = "nexacroXPush";
    _pXPush._type_name = "XPush";
    _pXPush.handle = null;
    _pXPush._currentipinfo = null;
    // _pXPush._parent_elem = null;

    _pXPush._findForm = function (comp)
    {
        var form = comp;
        while (form && form._is_form == false)
        {
            form = form.parent;
        }
        return form;
    };

    _pXPush.on_created = function ()
    {
    };

    _pXPush.destroy = function ()
    {
        var params = '""';
        var jsonstr;

        if (this.handle)
        {
            nexacro._destroyXPushHandle(this.handle);
        }
    
        return true;
    };


    //===============================================================
    // nexacro.XPush : Properties
    //===============================================================        
    _pXPush.set_name = function (name)
    {
        this.name = name;
    };

    _pXPush.set_channeltype = function (v)
    {
        if (typeof (v) == "undefined" || v == null || v == "")
        {
            this.channeltype = "single";
        }
        else
        {
            this.channeltype = v;
        }
        return true;
    };

    //readonly property
    _pXPush.set_commandlist = function ()
    {
    };

    _pXPush.set_connectip = function (v) { };
    _pXPush.set_connectport = function (v) { };

    _pXPush.set_controlretry = function (v)
    {
        if (typeof (v) == "undefined" || v == null)
        {
            this.controlretry = 5;
        }
        else
        {
            if (nexacro._isNumber(v))
            {
                if (v >= 0)
                    this.controlretry = v;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }
        this.on_apply_controlretry();
        return true;
    };

    _pXPush.on_apply_controlretry = function ()
    {
        if (this.handle)
        {
            nexacro._setXPushControlRetry(this.handle, this.controlretry);
        }
    };

    _pXPush.set_debug = function (v)
    {
        if (v === undefined || v === null) return;
        v = nexacro._toBoolean(v);

        this.debug = v;

        this.on_apply_debug();
        return true;
    };

    _pXPush.on_apply_debug = function ()
    {
        if (this.handle)
        {
            nexacro._setXPushHandleDebug(this.handle, this.debug);
        }
    };

    _pXPush.set_iplist = function (v)
    {
        var len = this.iplist.length;
        if (len > 0)
        {
            this.iplist.splice(0, len);
        }

        if (typeof (v) == "undefined" || v == null || v == "")
        {
            // this.iplist = "";            
        }
        else
        {
            if (v.indexOf(",") >= 0)
            {
                var ipinfolist = v.split(",");
                if (ipinfolist.length > 0)
                {
                    for (var i = 0; i < ipinfolist.length; i++)
                    {
                        var temp = ipinfolist[i].split(":");
                        var ipinfo = new Object;

                        ipinfo.ip = temp[0];
                        ipinfo.port = temp[1].valueOf();
                        ipinfo.retry = false;
                        this.iplist.push(ipinfo);
                    }
                }
            }
            else
            {
                var temp = v.split(":");
                var ipinfo = new Object;

                ipinfo.ip = temp[0];
                if (temp[1])
                {
                    ipinfo.port = temp[1].valueOf();
                }                
                ipinfo.retry = false;
                this.iplist.push(ipinfo);
            }
        }
        return true;
    };

    _pXPush.set_keepalivetime = function (v)
    {
        v = nexacro._toInt(v);
        if (typeof (v) == "undefined" || v == null)
        {
            this.keepalivetime = 30;
        }
        else
        {
            if (v >= 0)
                this.keepalivetime = v;
            else
                this.keepalivetime = 30;
        }
        this.on_apply_keepalivetime();
        return true;
    };

    _pXPush.on_apply_keepalivetime = function ()
    {
        if (this.handle)
        {
            nexacro._setXPushHandleKeepAliveTime(this.handle, this.keepalivetime);
        }
    };

    _pXPush.set_keeptimeout = function (v)
    {
        v = nexacro._toInt(v);
        if (typeof (v) == "undefined" || v == null)
        {
            this.keeptimeout = 60;
        }
        else
        {
            if (v > 0)
                this.keeptimeout = v;
            else
                this.keeptimeout = 60;
        }
        return true;
    };

    _pXPush.set_layouturl = function (v)
    {
        if (typeof (v) == "undefined" || v == null)
        {
            this.layouturl = "";
        }
        else
        {
            this.layouturl = v;
        }
        this.on_apply_layouturl();
        return true;
    };

    _pXPush.on_apply_layouturl = function ()
    {
        if (this.handle && this.layouturl != "")
        {
            var layouturl = this.layouturl;
            if (nexacro._OS != "Android")
            {
                var url = this.layouturl;
                                
                if (url.substring(0, 4).toLowerCase() == "url(")
                {
                    url = url.substring(5, url.length - 2);
                }
                                
                var form = this._findForm(this._parent_elem);
                if (form)
                {
                    if (url.indexOf("%") < 0)
                    	layouturl = nexacro._getServiceLocation(url, form._getRefFormBaseUrl());
                }
            }
            nexacro._setXPushHandleLayoutURL(this.handle, layouturl);
        }
    };

    _pXPush.set_retry = function (v)
    {
        v = nexacro._toInt(v);
        if (typeof (v) == "undefined" || v == null)
        {
            this.retry = 1;
        }
        else
        {
            if (v >= 0)
                this.retry = v;
            else
                this.retry = 1;
        }
        this.on_apply_retry();
        return true;
    };

    _pXPush.on_apply_retry = function ()
    {
        if (this.handle)
        {
            nexacro._setXPushHandleRetry(this.handle, this.retry);
        }
    };

    _pXPush.set_sessionid = function (v)
    {
        if (typeof (v) == "undefined" || v == null || v == "")
        {
            this.sessionid = "";
        }
        else
        {
            this.sessionid = v;
        }
        return true;
    };

    _pXPush.set_timeout = function (v)
    {
        v = nexacro._toInt(v);
        if (typeof (v) == "undefined" || v == null)
        {
            this.timeout = 30;
        }
        else
        {
            if (v > 0)
                this.timeout = v;
            else
                this.timeout = 30;
        }
        return true;
    };

    _pXPush.set_userid = function (v)
    {
        if (typeof (v) == "undefined" || v == null || v == "")
        {
            this.userid = "";
        }
        else
        {
            this.userid = v;
        }
        return true;
    };

    _pXPush.set_async = function (v)
    {
        //Andoird/iOS/HTML5 버전은 무조건 async=true로동작
        if (v === undefined || v === null) return;
        v = nexacro._toBoolean(v);

        this.async = v;

        this.on_apply_async();
        return true;
    };

    _pXPush.on_apply_async = function ()
    {
        if (this.handle)
        {
            nexacro._setXPushHandleAsync(this.handle, this.async);
        }
    };

    /*
	_pXPush.set_connectip = function(v){
		if (typeof(v) == "undefined" || v == null || v == ""){
			this.connectip = "";
		}else {
			this.connectip = v;
		}
		return true;
	}

	_pXPush.set_connectport = function(v){
		if (typeof(v) == "undefined" || v == null || v == ""){
			this.connectport = "-1";
		}else {
			this.connectport = v;
		}
		return true;
	}
	 */

    //===============================================================
    // nexacro.XPush : Methods Mapping
    //===============================================================
    _pXPush.subscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "ADDF";
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.unsubscribe = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "DELF";
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.registerDevice = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "RGST";
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.unregisterDevice = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "UNRG";
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.registerTopic = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "ADUI"
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.unregisterTopic = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "UNUI";
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    _pXPush.requestMessageCount = function (strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        strCommand = "MSGC"
        this.command(strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack);
    };

    //===============================================================
    // nexacro.XPush : Methods
    //===============================================================
    _pXPush.command = function (strCommand, strMessageType, strMessageKey, objForm, objDataset, strType, strCallBack, nRow, strCheck, bUseActiveFormCallBack)
    {
        // 임시         
        var cc = new nexacro.CommandControl();

        this.action = strCommand;
        cc.actiontype = strCommand;
        cc.type = strType;
        cc.callback = strCallBack;
        cc.messagekey = strMessageKey;
        cc.messagetype = strMessageType;
        cc.objdataset = objDataset;
        cc.objform = objForm;

        //console.info("strCommand : " + strCommand +  " strMessageType : " + strMessageType +  " strMessageKey : " + strMessageKey + " objForm : " + objForm + " objDataset : " + objDataset + " strType : " + strType + " strCallBack : " + strCallBack + " nRow : " + nRow + " strCheck : " + strCheck + " bUseActiveFormCallBack : " + bUseActiveFormCallBack );

        if (nRow != undefined)
        {
            if ((+nRow) != (+nRow))
            {
                return false;
            }
            else
                cc.row = nRow;
        } else
            cc.row = -1;

        if (strCheck != undefined)
            cc.check = strCheck;
        else
            cc.check = "0";

        if (bUseActiveFormCallBack != undefined)
        {
            if (typeof (bUseActiveFormCallBack) != "boolean")
            {
                if ((bUseActiveFormCallBack.toLowerCase() != "false") && (bUseActiveFormCallBack.toLowerCase() != "true"))
                {
                    cc.useactiveformcallback = false;
                }
                else
                {
                    cc.useactiveformcallback = nexacro._toBoolean(bUseActiveFormCallBack);
                }
            }
            else
            {
                cc.useactiveformcallback = bUseActiveFormCallBack;
            }
        }
        else
            cc.useactiveformcallback = false;

        this.strCommand = strCommand;
        this.strMessageType = strMessageType;
        this.strMessageKey = strMessageKey;
        this.objDataset = objDataset;
        this.strCallBack = strCallBack;

        /* 
        if (this.strCommand === undefined || this.strCommand === null || this.strCommand == "")
        {
            return false;
        }
        else
        {
            this.strCommand = this.strCommand.toString();
        }

        if (this.strMessageType === undefined || this.strMessageType === null || this.strMessageType == "")
        {
            return false;
        }
        else
        {
            this.strMessageType = this.strMessageType.toString();
        }

        if (this.strMessageKey === undefined || this.strMessageKey === null || this.strMessageKey == "")
        {
            return false;
        }
        else
        {
            this.strMessageKey = this.strMessageKey.toString();
        }
        */
                
        if (this.strCommand === undefined || this.strCommand === null || this.strCommand == "")
        {
            nexacro._fireXPushHandleErrorEvent(this.handle, -701);
        }
        else
        {
            this.strCommand = this.strCommand.toString();

            if (strCommand == "ADDF" || strCommand == "DELF")
            {
                if (objForm === undefined || objForm === null ||
                    this.strMessageType === undefined || this.strMessageType === null || this.strMessageType == "" ||
                    this.strMessageKey === undefined || this.strMessageKey === null || this.strMessageKey == "" ||
                    this.objDataset === undefined || this.objDataset === null ||
                    strType === undefined || strType === null || strType == "" ||
                    this.strCallBack === undefined || this.strCallBack === null || this.strCallBack == "")
                {
                    nexacro._fireXPushHandleErrorEvent(this.handle, -701);
                }
                else
                {
                    this.strMessageType = this.strMessageType.toString();
                    this.strMessageKey = this.strMessageKey.toString();

                    if ((strType.toLowerCase() != "append") && (strType.toLowerCase() != "update") && (strType.toLowerCase() != "insert") &&
                            (strType.toLowerCase() != "replace") && (strType != "allUpdate"))
                    {
                        nexacro._fireXPushHandleErrorEvent(this.handle, -701);
                    }
                    else
                    {
                        this.strCallBack = this.strCallBack.toString();
                        if (objForm[this.strCallBack] === undefined)
                        {
                            nexacro._fireXPushHandleErrorEvent(this.handle, -701);
                        }
                        else
                        {
                            if (strCommand == "ADDF")
                            {
                                var i;
                                for (i = 0; i < this.commandlist.length; i++)
                                {
                                    var item = this.commandlist[i];
                                    if (item.equal(cc))
                                    {                                        
                                        break;
                                    }
                                }
                                if (i == this.commandlist.length)
                                {                                    
                                    this.commandlist.push(cc);
                                }
                            }
                            nexacro._commandXPushHandle(this.handle, strCommand, strMessageType, strMessageKey, strType.toLowerCase());                            
                        }
                    }
                }
            }
            else if (strCommand == "ADUI")
            {
                this.commandlist.push(cc);
                nexacro.__commandXPushHandle(this.handle, strCommand, strMessageType, strMessageKey);
            }
            else if (strCommand == "UNUI")
            {
                if (this.connectSuccess == false)
            {
                    this._onerror(-1003, "UNUI");
                    return;
                }
                this.commandlist.push(cc);
                nexacro._commandXPushHandle(this.handle, strCommand, strMessageType, strMessageKey);

            }
            else if (strCommand == "MSGC")
            {                
                this.commandlist.push(cc);
                nexacro._commandXPushHandle(this.handle, strCommand, strMessageType, strMessageKey);
            }
            else if (strCommand == "RGST" || strCommand == "UNRG")
            {
                if (this.connectSuccess == false) //connect 성공 하지 않았는데 regi, unregi할경우 
                {
                    this._onerror(-1001, "UNRG");
                    return;
                }
                else if ((strCommand == "UNRG") && this.registerDeviceSuccess == false) //regi 성공 하지 않았는데 unregi할경우 
                {
                    this._onerror(-1001, "UNRG");
                    return;
                }
                this.commandlist.push(cc);
                nexacro._commandXPushHandle(this.handle, strCommand);
            }
            else
            {
                nexacro._fireXPushHandleErrorEvent(this.handle, -701);
            }
        }
    };
    
    //_pXPush.connect = function (bResetCommand, strUserID, strSessionID)
    //_pXPush.connect = function (bResetCommand, userid, sessionid)
    _pXPush.connect = function (userid, sessionid)
    {
        //		this.commandlist.length = 0;
        //		var bResetCommand,strUserID,strSessionID;
        //		var retry_Cnt;
        var bSuccessed;
        if (this.handle)
        {
            if (userid == null)
            {
                userid = this.userid;
            }

            if (sessionid == null)
            {
                sessionid = this.sessionid;
            }

            this._resetIPList();
            nexacro._connectXPushHandle(this.handle, userid, sessionid, this.retry, this.timeout, this.controlretry, this.keeptimeout);
        }
    };

    _pXPush.disconnect = function ()
    {
        if (this.handle)
        {
            this.connectSuccess = false;
            nexacro._disconnectXPushHandle(this.handle);
        }
    };

    _pXPush.resume = function ()
    {
        if (this.handle)
        {
            nexacro._resumeXPushHandle(this.handle);
        }
    };

    _pXPush.suspend = function ()
    {
        if (this.handle)
        {
            nexacro._suspendXPushHandle(this.handle)
        }
    };

    _pXPush.getCurrentIP = function ()
    {
        if (this._currentipinfo)
        {
            return this._currentipinfo.ip;
        }
        return null;
    };

    _pXPush.getCurrentPort = function ()
    {
        if (this._currentipinfo)
        {
            return this._currentipinfo.port;
        }
        return null;
    };

    _pXPush.sendResponse = function (msgid)
    {
        if (this.handle)
        {
            nexacro._sendResponseXPushHandle(this.handle, msgid);
        }
    };

    _pXPush.requestMessage = function ()
    {
        if (this.handle)
        {
            if (arguments.length < 2)
                return;

            var messagetype = arguments[0];
            var messagekeys = new Array();
            for (var i = 1; i < arguments.length; i++)
            {
                messagekeys.push(arguments[i]);
            }
            if (messagekeys.length > 0)
            {
                nexacro._requestMessageXPushHandle(this.handle, messagetype, messagekeys);
            }
        }
    };

    //===============================================================
    // nexacro.XPush : Logical Part
    //===============================================================

    _pXPush._resetIPList = function ()
    {
        var length = this.iplist.length;
        for (var i = 0; i < length; i++)
        {
            if (this.iplist[i].retry)
                this.iplist[i].retry = false;
        }
    };

    _pXPush._getrandomipinfo = function ()
    {
        var length = this.iplist.length;
        if (length > 0)
        {
            for (var i = 0; i < length; i++)
            {
                if (this.iplist[i].retry == false)
                {
                    break;
                }
            }
            if (i == length)
            {
                return null;
            }

            var randidx;
            do
            {
                randidx = Math.floor((Math.random() * ((length - 1) - 0 + 1))) + 0;
            } while (this.iplist[randidx].retry);

            this.iplist[randidx].retry = true;
            this._currentipinfo = this.iplist[randidx];
            return this._currentipinfo;
        }
        return null;
    };

    //===============================================================
    // nexacro.XPush : Event Handlers
    //===============================================================
        
    _pXPush._onxpush = function (recv)
    {       
        var paramRow;
        var paramChangeColumns = new Array();
        var paramAllColumns = new Array();
        var paramChangeRows = new Array();
        var paramobjChangeList = new Array();
        var paramChangeRowsTemp = new Array();
                
        for (var j = 0; j < this.commandlist.length; j++)
        {            
            var cc = this.commandlist[j];            
            if (!cc.objdataset) continue;

            if (cc.messagetype == recv.type)
            {
                var cr = -1;
                var data_key = false;
                var datasetColIndexList = new Array();
                var datalistlen = recv.datalist.length;                                

                for (var dlidx = 0; dlidx < datalistlen; dlidx++)
                {
                    var data = recv.datalist[dlidx];
                    var layoutKey = data.id;
                    var messageKey = data.item;                    
                    var idx = cc.objdataset.colinfos.indexOf(data.id);
                    datasetColIndexList.push(idx);

                    if (data.key) data_key = data.key;

                    if (cr == -1 && cc.type == "update")
                        cr = cc.objdataset.findRow(layoutKey, messageKey);                    
                }
                                
                var bfind = false;
                var callfunc = false;
                var callfunc1 = false;
                for (var dlidx = 0; dlidx < datalistlen; dlidx++)
                {                    
                    var data = recv.datalist[dlidx];
                    var layoutKey = data.id;
                    var messageKey = data.item;
                    var checkfield = data.checkfield;
                    var colIdx = datasetColIndexList[dlidx];
                                    
                    // this.commandlist에 row갯수만큼 들어있다. recv에는 row 하나가 들어있음.
                    // 여기서 튕겨내지 않으면 동일한 recv값을 this.commandlist.length만큼 callback발생
                    if (dlidx == 0 && messageKey != cc.messagekey) break;
                                        
                    // append
                    if (cc.type == "append")
                    {
                        if (cr == -1)
                        {
                            if (cc.messagekey == data.item)
                            {
                                cr = cc.objdataset.addRow();
                                cc.objdataset.setColumn(cr, colIdx, data.item);
                                paramAllColumns.push(data.id);
                                paramChangeColumns.push(data.id);
                                //paramRow = cr;
                            }
                        }
                        else
                        {
                            callfunc = true;
                            cc.objdataset.setColumn(cr, colIdx, data.item);
                            paramAllColumns.push(data.id);
                            paramChangeColumns.push(data.id);
                            paramRow = cr;
                            
                            //trace("cc.type=append", cr, callfunc, paramAllColumns, paramChangeColumns);
                        }
                        callfunc1 = true;

                    }
                    else if (cc.type == "insert")
                    {
                        //var cr = cc.objdataset.insertRow(cc.row);
                        //if (!row.hasOwnProperty(colId)) continue;                        
                        if (cr == -1)
                        {
                            if (cc.messagekey == data.item)
                            {
                                cr = cc.objdataset.insertRow(cc.row);
                                cc.objdataset.setColumn(cr, colIdx, data.item);
                                paramAllColumns.push(data.id);
                                paramChangeColumns.push(data.id);
                                //paramRow = cr;
                            }
                        }
                        else
                        {
                            callfunc = true;
                            cc.objdataset.setColumn(cr, colIdx, data.item);
                            paramAllColumns.push(data.id);
                            paramChangeColumns.push(data.id);
                            paramRow = cr;
                            //trace("cc.type=insert", cr, callfunc, paramAllColumns, paramChangeColumns);
                        }
                        callfunc1 = true;
                    }
                    else if (cc.type == "replace")
                    {
                        if (cc.row < cc.objdataset.getRowCount())
                        {
                            var value = cc.objdataset.getColumn(cc.row, colIdx);
                            if (value != data.item)
                            {
                                cc.objdataset.setColumn(cc.row, colIdx, data.item);
                                paramChangeColumns.push(data.id);
                                paramRow = cc.row;
                                callfunc = true;                                
                            }
                            callfunc1 = true;
                            paramAllColumns.push(data.id);
                        }
                    }
                    else if (cc.type == "update")
                    {
                        if (!data_key)
                        {                            
                            this._onerror(-703);
                            break;
                        }
                                                
                        paramAllColumns.push(data.id);
                        var value = cc.objdataset.getColumn(cr, colIdx);
                        if (value != data.item)
                        {
                            callfunc1 = true;
                            callfunc = true;

                            if ((cc.check == "0") || (checkfield && checkfield == cc.check))
                            {
                                //cr = 1; colld = 1;
                                var ret = cc.objdataset.setColumn(cr, colIdx, data.item);
                                paramChangeColumns.push(data.id);
                            }
                        }
                        paramRow = cr;                        
                      
                    }
                    else if (cc.type == "allUpdate")
                    {                        
                        if (!data_key)
                        {                            
                            this._onerror(-703);
                            break;
                        }                        
                        
                        if (paramChangeRowsTemp.length == 0)
                        {
                            for (var cr = 0; cr < cc.objdataset.getRowCount() ; cr++)
                            {
                                if (messageKey == cc.objdataset.getColumn(cr, layoutKey))
                                {
                                    paramChangeRows.push(cr);
                                    paramChangeRowsTemp.push(cr);
                                    continue;
                                }
                            }
                        }
                        else
                        {
                        
                            while (paramChangeRowsTemp.length)
                            {
                                cr = paramChangeRowsTemp.splice(0, 1);
                                var value = cc.objdataset.getColumn(cr, colIdx);
                                //trace(":: " + cr + "," + colIdx + "," + value + "," + data.item +"," +data.id);
                                if (value != data.item)
                                {
                                    //if ((cc.check == "0") || ((checkFieldname == colId) && (value == cc.check)))
                                    if ((cc.check == "0") || (checkfield && checkfield == cc.check))
                                    {
                                        cc.objdataset.setColumn(cr, colIdx, data.item);
                                        //paramobjChangeList.push(cr);
                                        //var change_val = { row: "", changecol: "" };
                                        //change_val.row = cr;
                                        //change_val.changecol = data.id;
                                        var change_val = cr + "," + data.id;
                                        
                                        paramobjChangeList.push(change_val);
                                    }                                    
                                }
                            }
                            callfunc = true;                            
                        }
                        callfunc1 = true;
                    }
                }
                                
                //trace("==> recv.action=" + recv.action + ", recv.msgid=" + recv.msgid + ", callfunc="+callfunc+", callfunc1="+callfunc1);                

                if (recv.action == "RELI" && recv.msgid != undefined && recv.msgid != null)
                {
                    callfunc = true;
                }
                else if (callfunc == false) continue;

                if (!callfunc1) continue;
                                
                //trace("cc.useactiveformcallback : " + cc.useactiveformcallback + " cc.objform : " + cc.objform + " application.getActiveForm : " + application.getActiveForm());
                if ((!cc.useactiveformcallback) || (cc.useactiveformcallback && (cc.objform === _application.getActiveForm())))
                {                    
                    //"DATA"  
                    if (cc.type != "allUpdate")
                    {
                        //9.2
                        //cc.objform.$call(cc.callback,paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA");
                        //13
                        var callbackFn = cc.objform[cc.callback];
                        if (callbackFn instanceof Function)
                        {                            
                            //callbackFn.call(cc.objform, paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA");
                            callbackFn.call(cc.objform, paramRow, paramChangeColumns.join(), paramAllColumns.join(), "DATA", recv.action, recv.msgid);
                            paramChangeRows.splice(0, paramChangeRows.length);
                            paramAllColumns.splice(0, paramAllColumns.length);
                        }
                    }
                    else if (cc.type == "allUpdate")
                    {
                        var callbackFn = cc.objform[cc.callback];
                        if (callbackFn instanceof Function)
                        {                            
                            callbackFn.call(cc.objform, paramChangeRows.join(), null, paramobjChangeList, "DATA", recv.action, recv.msgid);
                            paramChangeRows.splice(0, paramChangeRows.length);
                            paramobjChangeList.splice(0, paramobjChangeList.length);
                        }
                    }
                    // TODO : Type이 "RECOVERY" 메시지일 경우
                    //cc.objform.$call(cc.callback, "-1", "", "", "RECOVERY");
                }
            }
        }
    };

    _pXPush._onsuccess = function (reason, action, classtype, messagetype, messagekey, returnvalue)
    {
        // PushMessageObject
        var pushmessageobject = new Object();
        pushmessageobject.messagetype = "";
        pushmessageobject.messagekey = "";
        pushmessageobject.messageid = "";
        pushmessageobject.returnvalue = "";

        if (action == 0)
            this.connectSuccess = true;

        if (classtype == "RECT")
        {
            pushmessageobject.messagetype = "";
            pushmessageobject.messagekey = "";
            pushmessageobject.messageid = messagetype;
        }
        else if (classtype == "RGST" || classtype == "UNRG")
        {  
            if (nexacro._OS == "Android")
            {
                if (calsstype == "RGST")
                    this.registerDeviceSuccess = true;

                pushmessageobject.messagetype = "";
                pushmessageobject.messagekey = "";
                pushmessageobject.messageid = "";
            }
        }
        else if (classtype == "MSGC")
        {
            pushmessageobject.messageid = "";
            pushmessageobject.messagetype = messagetype;
            pushmessageobject.messagekey = messagekey;
            pushmessageobject.returnvalue = returnvalue;
        }
        else if (action == 0 || action == 1)
        {
        }
        else
        {
            pushmessageobject.messageid = "";
            pushmessageobject.messagetype = messagetype;
            pushmessageobject.messagekey = messagekey;
        }

        // commandlist         
        var command;
        var listlength = this.commandlist.length;
        var index;
                
        for (index = 0; index < listlength; index++)
        {
            command = this.commandlist[index].valueOf();
                        
            if (command.messagetype == messagetype)            
            {
                if (command.messagekey == messagekey && command.actiontype == classtype)
                {
                    break;
                }
            }
        }
        if (index == listlength) command = null;

        if (command && (classtype == "DELF" || classtype == "ADUI" || classtype == "DELF" || classtype == "UNUI" || classtype == "MSGC" || classtype == "RGST " || classtype == "UNRG"))
        {            
            command.actiontype = classtype;
            var e = new nexacro.Event.XPushEventInfo("onsuccess", reason, action, this.getCurrentIP(), this.getCurrentPort(), command, pushmessageobject);
            this._fire_onsuccess(this, e);
            this.commandlist.splice(index, 1);                        
        }
        else
        {
            var e = new nexacro.Event.XPushEventInfo("onsuccess", reason, action, this.getCurrentIP(), this.getCurrentPort(), command, pushmessageobject);
            this._fire_onsuccess(this, e);
            
            if (action == 1)
            {
                this._currentipinfo = null;
                this.commandlist = null;
                this.commandlist = new Array;
            }
        }
    };

    _pXPush._fire_onsuccess = function (objXPush, eXPushEventInfo)
    {
        if (this.onsuccess && this.onsuccess._has_handlers)
        {
            return this.onsuccess._fireEvent(this, eXPushEventInfo);
        }
        return true;
    };
    
    //_pXPush._onerror = function (errorcode, errormsg, classtype, messagetype, messagekey)
    _pXPush._onerror = function (errorcode, action, classtype, messagetype, messagekey)
    {
        if (action == undefined)
        {
            action = -1;
        }

        // PushMessageObject
        var pushmessageobject = new Object();
        pushmessageobject.messagetype = "";
        pushmessageobject.messagekey = "";
        pushmessageobject.messageid = "";
        pushmessageobject.returnvalue = "";
        
        if (classtype == "RECT")
        {
            pushmessageobject.messageid = messagetype;
            pushmessageobject.messagekey = "";
            pushmessageobject.messagetype = "";
        }
        else
        {
            pushmessageobject.messagetype = messagetype;
            pushmessageobject.messagekey = messagekey;
            pushmessageobject.messageid = "";
        }

        // commandlist         
        var command;
        var listlength = this.commandlist.length;
        for (var i = 0; i < listlength; i++)
        {
            command = this.commandlist[i];
            if (command.messagetype == messagetype)
            {
                if (command.messagekey == messagekey)
                {
                    break;
                }
            }
            command = null;
        }
        var errormsg = this._geterrormsg(errorcode);

        action = this._getaction(action);

        this.errorcode = errorcode;
        this.errormsg = errormsg;

        var e = new nexacro.Event.XPushErrorEventInfo("onerror", action, errorcode, errormsg, this.getCurrentIP(), this.getCurrentPort(), command, action, pushmessageobject);
        this._fire_onerror(this, e);
    };

    _pXPush._fire_onerror = function (objXPush, eXPushErrorEventInfo)
    {
        if (this.onerror && this.onerror._has_handlers)
        {
            return this.onerror._fireEvent(this, eXPushErrorEventInfo);
        }
        return true;
    };

    _pXPush._onkeepalive = function (type)
    {
        var e = new nexacro.Event.XPushKeepAliveEventInfo("onkeepalive", type);
        this._fire_onkeepalive(this, e);
    };

    _pXPush._fire_onkeepalive = function (objXPush, eXPushKeepAliveEventInfo)
    {
        if (this.onkeepalive && this.onkeepalive._has_handlers)
        {
            return this.onkeepalive._fireEvent(this, eXPushKeepAliveEventInfo);
        }
    };

    _pXPush._seterror = function (errorcode, errormsg)
    {
        this.errorcode = errorcode;
        this.errormsg = errormsg;
    };

    _pXPush._onrequestmessagecount = function (userid, sendtype, sendid, receivetype, receiveid)
    {
        var e = new nexacro.Event.XPushRequestMessageCountEventInfo(userid, sendtype, sendid, receivetype, receiveid);
        this._fire_onrequestmessagecount(this, e);
    };

    _pXPush._fire_onrequestmessagecount = function (objXPush, eXPushRequestMessageCountEventInfo)
    {
        if (this.onrequestmessagecount && this.requestmessagecount._has_handlers)
        {
            return this.onrequestmessagecount._fireEvent(this, eXPushRequestMessageCountEventInfo);
        }
    };

    //===============================================================
    // nexacro.XPush : Logical Part
    //===============================================================

    _pXPush._getaction = function (action) {
        var pushaction;

        switch (action) {
            case "ERROR": //-1
                pushaction = -1;
                break;
            case "AUTH": //0
                pushaction = nexacro.XPushAction.AUTH;
                break;
            case "BYEC": //1
                pushaction = nexacro.XPushAction.BYEC;
                break;
            case "ADDF": //2
                pushaction = nexacro.XPushAction.ADDF;
                break;
            case "DELF": //3
                pushaction = nexacro.XPushAction.DELF;
                break;
            case "REQD": //4
                pushaction = nexacro.XPushAction.REQD;
                break;
            case "RECT": //5
                pushaction = nexacro.XPushAction.RECT;
                break;
            case "RGST": //6
                pushaction = nexacro.XPushAction.RGST;
                break;
            case "UNRG": //7
                pushaction = nexacro.XPushAction.UNRG;
                break;
            case "ADUI": //8
                pushaction = nexacro.XPushAction.ADUI;
                break;
            case "UNUI": //9
                pushaction = nexacro.XPushAction.UNUI;
                break;
            case "MSGC": //10
                pushaction = nexacro.XPushAction.MSGC;
                break;
        }

        return pushaction;
    };

    _pXPush._geterrormsg = function (errorcode)
    {
        var codename;
        if (errorcode == -100)
        {
            codename = "object_push_send_byec";
        }
        else if (errorcode == -101)
        {
            codename = "object_push_socket_timeout";
        }
        else if (errorcode == -200)
        {
            codename = "object_push_fail_command_auth";
        }
        else if (errorcode == -201)
        {
            codename = "object_push_fail_all_command_auth";
        }
        else if (errorcode == -202)
        {
            codename = "object_push_fail_data_auth";
        }
        else if (errorcode == -300)
        {
            codename = "object_push_fail_connect";
        }
        else if (errorcode == -301)
        {
            codename = "object_push_fail_send_receive";
        }
        else if (errorcode == -302)
        {
            codename = "object_push_connected_already";
        }
        else if (errorcode == -401)
        {
            codename = "object_push_fail_disconnect";
        }
        else if (errorcode == -501)
        {
            codename = "object_push_fail_suspend";
        }
        else if (errorcode == -601)
        {
            codename = "object_push_fail_resume";
        }
        else if (errorcode == -701)
        {
            codename = "object_push_fail_command";
        }
        else if (errorcode == -702)
        {
            codename = "object_push_notfound_layouturl";
        }
        else if (errorcode == -703)
        {
            codename = "object_push_invalid_layouturl";
        }
        else if (errorcode == -801)
        {
            codename = "object_push_fail_protocol_version";
        }
        else if (errorcode == -901)
        {
            codename = "object_push_fail_rect";
        }
        else if (errorcode == -902)
        {
            codename = "object_push_fail_reqd";
        }
        else if (errorcode == -1001)
        {
            codename = "object_push_fail_rgst_unrg";
        }
        else if (errorcode == -1002)
        {
            codename = "object_push_fail_adui";
        }
        else if (errorcode == -1003) {
            codename = "object_push_fail_unui";
        }
        else if (errorcode == -1004) {
            codename = "object_push_fail_msgc";
        }
        return nexacro._getErrorMessge(codename);
    };
    delete _pXPush;

};
