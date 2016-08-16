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

if (!nexacro.FlashPlayer)
{
    nexacro.FlashPlayer = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._params = new nexacro.Collection();
    };

    var _pFlashPlayer = nexacro._createPrototype(nexacro.Component, nexacro.FlashPlayer);
    nexacro.FlashPlayer.prototype = _pFlashPlayer;
    _pFlashPlayer._type_name = "FlashPlayer";

    _pFlashPlayer.codebase = "";
    _pFlashPlayer.mimetype = "";
    _pFlashPlayer.movie = "";

    _pFlashPlayer.adjustalpha = "";
    _pFlashPlayer.framenum = "";
    _pFlashPlayer.loop = false;
    _pFlashPlayer.playing = false;
    _pFlashPlayer.quality = "high";
    _pFlashPlayer.scalemode = "showall";

    //==== internal properties =========//
    _pFlashPlayer._obj_id = "";
    _pFlashPlayer._obj_elem = null;
    _pFlashPlayer._params = null;
    _pFlashPlayer._is_simple_control = true;

    _pFlashPlayer.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {         
            var obj_elem = this._obj_elem = new nexacro.PluginElement(control_elem);
            obj_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
            
            var movie = this.movie;
            if (movie)
            {
                this.on_apply_movie();
                obj_elem.setElementPluginSrc(movie);
            }               

            this.on_apply_codebase();

            var params = this._params;
            for (var i = 0, param_cnt = params.length; i < param_cnt; i++)
            {
                obj_elem.setElementParam(params.get_id(i), params.get_item(i));
            }
            
            if (this.codebase == "")
            {
                this.codebase = "http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0";
                obj_elem.setElementCodebase(this.codebase);
            }
            
            var mimetype = this.mimetype;
            if (mimetype == "")
            {
                this.mimetype = mimetype = "application/x-shockwave-flash";
                obj_elem.setElementMIMEType(mimetype);
                obj_elem.setElementPluginMIMEType(mimetype);
            }
            obj_elem.setElementPluginPage("http://www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash");
            obj_elem.setElementParam("WMode", "Transparent");
            obj_elem.setElementParam("menu", "true");
            obj_elem.setElementClassId("{d27cdb6e-ae6d-11cf-96b8-444553540000}");
            this.on_apply_scalemode();
            this.on_apply_quality();
            this.on_apply_loop();
        }
    };

    _pFlashPlayer.on_create_contents_command = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            return obj_elem.createCommand();
        }
        return "";
    };

    _pFlashPlayer.on_attach_contents_handle = function (win)
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.attachHandle(win);
        }        
    };

    _pFlashPlayer.on_created_contents = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.component = this;
            obj_elem.create(this._getWindow());
        }
    };

    _pFlashPlayer.on_destroy_contents = function ()
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.destroy();
            this._obj_elem = null;
        }
    };

     
    _pFlashPlayer.on_update_position = function (resize_flag, move_flag)
    {
        nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);

        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.on_update_position();
        }        
    };    

    _pFlashPlayer.on_change_containerRect = function (width, height)
    {
        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.setElementSize(width, height);
        }
    };

    // ==================================================================================================================
    // Properties
    // ==================================================================================================================    

    _pFlashPlayer.set_visible = function (v)
    {
        if (v === undefined || v === null) return;
        v = nexacro._toBoolean(v);

        nexacro.Component.prototype.set_visible.call(this, v);

        var obj_elem = this._obj_elem;
        if (obj_elem)
        {
            obj_elem.setElementVisible(v);
        }
    };

    _pFlashPlayer.set_mimetype = function (v)
    {
        this.mimetype = v;
        this.on_apply_mimetype();
    };

    _pFlashPlayer.on_apply_mimetype = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var type = this.mimetype;
            if (type)
            {
                elem.setElementMIMEType(type);
            }
        }
    };

    _pFlashPlayer.set_codebase = function (v)
    {
        this.codebase = v;
        this.on_apply_codebase();
    };
    _pFlashPlayer.on_apply_codebase = function ()
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

    _pFlashPlayer.set_movie = function (v)
    {
        var url = v;
        if (url.substring(0, 4).toLowerCase() == "url(")
        {
            url = url.substring(5, url.length - 2);
        }        
        var url = nexacro._getServiceLocation(url, this._getRefFormBaseUrl());

        this.movie = url;
        this.on_apply_movie();  
    };
    _pFlashPlayer.on_apply_movie = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            var movie = this.movie;
            if (movie)
            {
                elem.setElementMovie(movie);
            }
        }
    };

    _pFlashPlayer.set_scalemode = function (v)
    {
        this.scalemode = v;
        this.on_apply_scalemode();
    };

    _pFlashPlayer.on_apply_scalemode = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem.setElementParam("scale", this.scalemode);
        }
    };


    _pFlashPlayer.set_loop = function (v)
    {
        this.loop = v;
        this.on_apply_loop();
    };
    _pFlashPlayer.on_apply_loop = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem.setElementParam("loop", this.loop);
        }
    };


    _pFlashPlayer.set_playing = function (v)
    {
        this.playing = v;
        this.on_apply_playing();
    };
    _pFlashPlayer.on_apply_playing = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem.setElementParam("play", this.playing);
        }
    };

    _pFlashPlayer.set_quality = function (v)
    {
        this.quality = v;
        this.on_apply_quality();
    };
    _pFlashPlayer.on_apply_quality = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem.setElementParam("quality", this.quality);
        }
    };

    // ==================================================================================================================
    // Method -- TO DO
    // ==================================================================================================================
    _pFlashPlayer.play = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem._play();
        }
    };
    _pFlashPlayer.stop = function ()
    {
        var elem = this._obj_elem;
        if (elem)
        {
            elem._stopPlay();
        }
    };
   
    _pFlashPlayer.back = function ()
    {
        
    };

    _pFlashPlayer.forward = function ()
    {
        
    };

    _pFlashPlayer.pan = function ()
    {
        
    };

    _pFlashPlayer.rewind = function ()
    {
        
    };

    _pFlashPlayer.saveTolmage = function ()
    {
        
    };

    _pFlashPlayer.saveTolmageObject = function ()
    {
        
    };
    _pFlashPlayer.setzoomrect = function ()
    {
        
    };
    
    _pFlashPlayer.zoom = function ()
    {
        
    };

    delete _pFlashPlayer;
}


