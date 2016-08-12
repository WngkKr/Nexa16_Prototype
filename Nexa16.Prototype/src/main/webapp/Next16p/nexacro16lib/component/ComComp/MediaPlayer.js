﻿//==============================================================================
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

if (!nexacro.MediaPlayer)
{
    //========================================================================
    // nexacro.MediaPlayStatusChangedInfo
    //========================================================================
    nexacro.MediaPlayStateChangedEventInfo = function (obj, id, oldvalue, newvalue)
    {
        this.id = this.eventid = id || "onplaystatuschanged";
        this.fromobject = this.fromreferenceobject = obj;

        this.oldvalue = oldvalue;
        this.newvalue = newvalue;
    };
    var _pPlayStatusChangedInfo = nexacro._createPrototype(nexacro.Event, nexacro.MediaPlayStateChangedEventInfo);
    nexacro.MediaPlayStateChangedEventInfo.prototype = _pPlayStatusChangedInfo;
    _pPlayStatusChangedInfo._type_name = "MediaPlayStatusChangedInfo";

    delete _pPlayStatusChangedInfo;

    //========================================================================
    // nexacro.MediaCurrentTimeChangedInfo
    //========================================================================
    nexacro.MediaCurrentTimeChangedEventInfo = function (obj, id, index, oldvalue, newvalue)
    {
        this.id = this.eventid = id || "oncurrenttimechanged";
        this.fromobject = this.fromreferenceobject = obj;

        this.oldvalue = oldvalue;
        this.newvalue = newvalue;
    };
    var _pCurrentTimeChangedInfo = nexacro._createPrototype(nexacro.Event, nexacro.MediaCurrentTimeChangedEventInfo);
    nexacro.MediaCurrentTimeChangedEventInfo.prototype = _pCurrentTimeChangedInfo;
    _pCurrentTimeChangedInfo._type_name = "MediaCurrentTimeChangedInfo";

    delete _pCurrentTimeChangedInfo;


    //========================================================================
    // nexacro.MediaPlayStatusChangedInfo
    //========================================================================
    nexacro.MediaErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode)
    {
        this.id = this.eventid = id || "onerror";
        this.fromobject = this.fromreferenceobject = obj;

        this.errortype = errortype;
        this.errormsg = errormsg;
        this.errorobj = errorobj;
        this.statuscode = statuscode;
    };
    var _pMediaErrorInfo = nexacro._createPrototype(nexacro.Event, nexacro.MediaErrorEventInfo);
    nexacro.MediaErrorEventInfo.prototype = _pMediaErrorInfo;
    _pMediaErrorInfo._type_name = "MediaErrorInfo";

    delete _pMediaErrorInfo;


    nexacro.MediaPlayer = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
        this._params = new nexacro.Collection();
        this._obj_elem = null;
        this._params = null;
    };

    var _pMedia = nexacro.MediaPlayer.prototype = nexacro._createPrototype(nexacro.Component, nexacro.MediaPlayer);

    _pMedia._type_name = "MediaPlayer";

    _pMedia.codebase = "";
    _pMedia.mimetype = "";
    _pMedia.url = "";

    _pMedia.adjustalpha = "";
    _pMedia.aspectratio = "";
    _pMedia.currenttime = 0;
    _pMedia.duration = 0;
    _pMedia.mute = false;
    _pMedia.rewindmode = false;
    _pMedia.screenmode = "none";
    _pMedia.size = "";
    _pMedia.startmode = true;
    _pMedia._startmode = true;
    _pMedia.status = "stop";
    _pMedia.volume = 100;
    _pMedia._is_simple_control = true;



    //==== internal properties =========//
    _pMedia._obj_id = "";


    _pMedia._event_list =
    {
        "onclick": 1, "ondblclick": 1,
        "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondrop": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1, "onmove": 1, "onsize": 1,
        "onsuccess": 1, "onerror": 1,
        "onappenditem": 1, "ondeleteitem": 1, "onitemclick": 1, "onfindclick": 1, "onitemchanged": 1,
        // Touch,TouchGesture
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,       
        "oncurrenttimechanged": 1, "onplaystatuschanged": 1
    };

    _pMedia.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var obj_elem = this._obj_elem = new nexacro._MediaPlayerPluginElement(control_elem);
            obj_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
        }
    };

    _pMedia.on_create_contents_command = function ()
    {
        this.on_apply_url();
        this.on_apply_mute();
        this.on_apply_volume();
        this.on_apply_currenttime();
        this.on_apply_rewindmode();
        this.on_apply_startmode();
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            
            var control = this.screenmode;
            if (!control)
            {
                control = "none";
            }
            obj_elem._setMediaControl("uiMode", control);

            obj_elem.setElementClassId("{6bf52a52-394a-11d3-b153-00c04f79faa6}");
            obj_elem.setElementMIMEType("video/x-ms-wmv");
            obj_elem.setElementParam("wmode", "transparent");
            obj_elem.setElementPluginMIMEType("application/x-mplayer2");
            obj_elem.setElementPluginPage("http://www.microsoft.com/Windows/MediaPlayer/");           
            obj_elem.setElementVisible(this.visible);
            return obj_elem.createCommand();
        }
        return "";
    };

    _pMedia.on_attach_contents_handle = function (win)
    {
        if (this._obj_elem)
            this._obj_elem.attachHandle(win);
    };

    _pMedia.on_created_contents = function ()
    {
        this.on_apply_url();
        this.on_apply_mute();
        this.on_apply_volume();
        this.on_apply_currenttime();
        this.on_apply_rewindmode();
        this.on_apply_startmode();

        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            var params = this._params;
            var param_cnt = params.length;
            for (var i = 0; i < param_cnt; i++)
            {
                obj_elem.setElementParam(params.get_id(i), params.get_item(i));
            }

            var control = this.screenmode;
            if (!control)
            {
                control = "none";
            }
            obj_elem._setMediaControl("uiMode", control);

            obj_elem.setElementClassId("{6bf52a52-394a-11d3-b153-00c04f79faa6}");
            obj_elem.setElementMIMEType("video/x-ms-wmv");
            obj_elem.setElementParam("wmode", "transparent");
            obj_elem.setElementPluginMIMEType("application/x-mplayer2");
            obj_elem.setElementPluginPage("http://www.microsoft.com/Windows/MediaPlayer/");
            obj_elem.create();
            obj_elem.setElementVisible(this.visible);      
        }
    };

    _pMedia.on_destroy_contents = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.destroy();
            this._obj_elem = null;
        }
    };

    _pMedia.on_update_position = function (resize_flag, move_flag)
    {
        nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.on_update_position();
        }
    };


    _pMedia.on_change_containerRect = function (width, height)
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.setElementSize(width, height);
        }
    };

    //===============================================================
    // nexacro.MediaPlayer : Properties
    //===============================================================

    _pMedia.set_visible = function (v)
    {
        if (v === undefined || v === null) 
            return;

        v = nexacro._toBoolean(v);
        nexacro.Component.prototype.set_visible.call(this, v);

        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            if (obj_elem.setElementVisible != null)
                obj_elem.setElementVisible(v);
        }
    };

    _pMedia.set_codebase = function (v)
    {
        this.codebase = v;
        this.on_apply_codebase();
    };
    _pMedia.on_apply_codebase = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var codebase = this.codebase;
            if (codebase)
            {
                elem.setElementCodebase(codebase);
            }
        }
    };

    _pMedia.set_url = function (v)
    {
        this.url = v;
        this.on_apply_url();
    };
    _pMedia.on_apply_url = function () 
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var url = this.url;
            if (url)
            {
                elem._setMediaUrl("URL", url);
                this._need_change_event = false;
            }
        }
    };

    _pMedia.set_adjustalpha = function(v)
    {
        this.adjustalpha = v;
        this.on_apply_adjustalpha();
    };
    _pMedia.on_apply_adjustalpha = function()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var adjustalpha = this.adjustalpha;
            if (adjustalpha)
            {
                elem.setElementParam("adjustalpha", adjustalpha);
            }
        }
    };

    //_pMedia.set_aspectratio = function (v)
    //{
    //    this.aspectratio = v;
    //    this.on_apply_aspectratio();
    //};
    //_pMedia.on_apply_aspectratio = function()
    //{
    //    var elem = this._obj_elem;
    //    if (elem)
    //    {
    //        var aspectratio = this.aspectratio;
    //        if (aspectratio)
    //        {
    //            elem.setElementParam("aspectratio", aspectratio);
    //        }
    //    }
    //};


    _pMedia.set_currenttime = function(v)
    {
        this.currenttime = v;
        this.on_apply_currenttime();
    };
    _pMedia.on_apply_currenttime = function()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var currenttime = this.currenttime;
            if (currenttime > -1)
            {
                elem._setMediaCurrentTime("currentPosition", currenttime);
            }
        }
    };

    _pMedia.set_duration = function(v)
    {
        // readonly
    };

    _pMedia.set_mute = function(v)
    {
        if (this.mute != v)
        {
            this.mute = v;
            this.on_apply_mute();
        }
    };
    _pMedia.on_apply_mute = function()
    {
        this._togglemute();
    };


    _pMedia.set_rewindmode = function(v)
    {
        this.rewindmode = v;
        this.on_apply_rewindmode();
    };
    _pMedia.on_apply_rewindmode = function()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var rewindmode = this.rewindmode;
            if (rewindmode)
            {
                elem._setMediaLoop("AutoRewind", rewindmode);
            }
        }
    };

    _pMedia.set_screenmode = function(v)
    {
        this.screenmode = v;
        this.on_apply_screenmode();
    };
    _pMedia.on_apply_screenmode = function()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var control = this.screenmode;
            if (!control)
            {
                control = "none";
            }
            elem._setMediaControl("uiMode", control);
        }
    };


    _pMedia.set_size = function(v)
    {
        //readonly
    };

    _pMedia.set_startmode = function(v)
    {
        this.startmode = v;
        this._startmode = nexacro._toBoolean(v);
        this.on_apply_startmode();
    };

    _pMedia.on_apply_startmode = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var startmode = this.startmode;
            elem._setMediaAutoPlay("AutoStart", startmode);
        }
    };

    _pMedia.set_status = function(v)
    {
        // readyonly
    };
    
    _pMedia.set_volume = function(v)
    {
        v = +v;
        if (isNaN(v))
            return;

        if (v < 0)
        {
            v = 0;
        }
        else if (v > 100)
        {
            v = 100;
        }

        if (this.volume != v)
        {
            this.volume = v;
            this.on_apply_volume();
        }
    };

    _pMedia.on_apply_volume = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var volume = this.volume;
            if (volume != null)
            {
                elem._setMediaVolume("Volume", volume);
            }
        }
    };

    _pMedia.on_apply_prop_enable = function ()
    {
        var elem = this._obj_elem;
        if (elem) {
            var enable = this.enable;
            if (enable != null) {
                elem._setMediaEnable("Enabled", enable);
            }
        }
    };

    // ==================================================================================================================
    // Method -- TO DO
    // ==================================================================================================================

    _pMedia.play = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem._play();
            this._need_change_event = false;
        }
    };

    _pMedia.pause = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem._pause();
        }
    };

    _pMedia.rewind = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem._rewind();
        }
    };

    _pMedia.stop = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem._stop();
            this._need_change_event = true;
        }
    };

    _pMedia._togglemute = function () {
        var obj_elem = this._obj_elem;
        if (obj_elem) {
            obj_elem._togglemute();
        }
    };

    _pMedia.togglemute = function ()
    {
        this.mute = !this.mute;
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem._togglemute();
        }
    };

    // ==================================================================================================================
    // Event
    // ==================================================================================================================

    _pMedia.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode)
    {
        if (this.onerror && this.onerror._has_handlers)
        {
            var evt = new nexacro.MediaErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode);
            return this.onerror._fireEvent(this, evt);
        }
    };

    _pMedia.on_fire_oncurrenttimechanged = function (obj, old_pos, new_pos)
    {
        if (this.oncurrenttimechanged && this.oncurrenttimechanged._has_handlers)
        {
            var evt = new nexacro.MediaCurrentTimeChangedEventInfo(obj, "oncurrenttimechanged", old_pos, new_pos);
            return this.oncurrenttimechanged._fireEvent(this, evt);
        }
    };

    _pMedia.on_fire_onplaystatuschanged = function (obj, old_status, new_status)
    {
        if (this.onplaystatuschanged && this.onplaystatuschanged._has_handlers)
        {
            var evt = new nexacro.MediaPlayStateChangedEventInfo(obj, "onplaystatuschanged", old_status, new_status);
            return this.onplaystatuschanged._fireEvent(this, evt);
        }
    };

    _pMedia._on_currenttimechanged = function (new_pos)
    {
        var old_pos = this.currenttime;
        if (old_pos != new_pos)
        {
            this.on_fire_oncurrenttimechanged(this, old_pos, new_pos);
        }
        this.currenttime = new_pos;
    };

    _pMedia._on_statuschanged = function (new_status)
    {
        var old_status = this.status;
        if (old_status != new_status)
        {
            if (this._need_change_event)
            {
                if (new_status == "pause")
                {
                    new_status = "stop";
                }
            }
            this.status = new_status;
            this.on_fire_onplaystatuschanged(this, old_status, new_status);
        }
    };

    _pMedia._on_error = function (errortype, errormsg, statuscode)
    {
        this.on_fire_onerror(this, errortype, errormsg, this, statuscode);
    };

    delete _pMedia;

}



