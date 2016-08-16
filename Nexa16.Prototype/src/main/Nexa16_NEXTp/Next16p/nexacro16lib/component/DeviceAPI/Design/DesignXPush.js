if (nexacro.XPush)
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

        this._event_list = {
            "onsuccess": 1, "onerror": 1, "onkeepalive": 1
        };

        this.onsuccess = null;
        this.onerror = null;

        //var params = '""';
        //var jsonstr = '{"id":' + this._id + ', "div":"XPush", "method":"constructor", "params":' + params + '}';  
    };
};
