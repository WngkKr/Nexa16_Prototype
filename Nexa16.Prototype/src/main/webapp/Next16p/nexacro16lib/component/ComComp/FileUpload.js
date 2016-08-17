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
// nexacro.FileUpload && nexacro.FileUpload_Style
//==============================================================================
if (!nexacro.FileUpload)
{
    //==========================================================================
    // nexacro.FileUploadItemEventInfo
    //==========================================================================
    nexacro.FileUploadItemEventInfo = function (obj, id, idx)
    {
        this.id = this.eventid = id || "onfileuploaditem";
        this.fromobject = this.fromreferenceobject = obj;

        this.index = idx;
    };
    var _pEventFileUploadItemEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemEventInfo);
    nexacro.FileUploadItemEventInfo.prototype = _pEventFileUploadItemEventInfo;
    _pEventFileUploadItemEventInfo._type_name = "FileUploadItemEventInfo";

    delete _pEventFileUploadItemEventInfo;

    //==========================================================================
    // nexacro.FileUploadMouseEventInfo
    //==========================================================================
    nexacro.FileUploadMouseEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        this.id = this.eventid = id || "onmouse";

        this.fromobject = from_comp;
        this.fromreferenceobject = from_refer_comp;
        this.altkey = altKey || false;
        this.ctrlkey = ctrlKey || false;
        this.shiftkey = shiftKey || false;
        this.button = strButton || "";
        this.index = index;
        this.screenx = screenX || -1;
        this.screeny = screenY || -1;
        this.canvasx = canvasX || -1;
        this.canvasy = canvasY || -1;
        this.clientx = clientX || -1;
        this.clienty = clientY || -1;
    };
    var _pFileUploadMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadMouseEventInfo);
    nexacro.FileUploadMouseEventInfo.prototype = _pFileUploadMouseEventInfo;
    _pFileUploadMouseEventInfo._type_name = "FileUploadMouseEventInfo";

    delete _pFileUploadMouseEventInfo;

    //========================================================================
    // nexacro.FileUploadEventInfo
    //========================================================================
    nexacro.FileUploadEventInfo = function (obj, id, dsArray, code, msg, url)
    {
        //        this.id = this.eventid = id || "onload";
        this.id = this.eventid = id || "onsuccess";
        this.fromobject = this.fromreferenceobject = obj;

        this.datasets = dsArray;
        this.errorcode = code;
        this.errormsg = msg;
        this.url = url;
    };
    var _pFileUploadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadEventInfo);
    nexacro.FileUploadEventInfo.prototype = _pFileUploadEventInfo;
    _pFileUploadEventInfo._type_name = "FileUploadEventInfo";

    delete _pFileUploadEventInfo;

    //========================================================================
    // nexacro.FileUploadItemChangeEventInfo
    //========================================================================
    nexacro.FileUploadItemChangeEventInfo = function (obj, id, index, oldvalue, newvalue)
    {
        this.id = this.eventid = id || "onitemchanged";
        this.fromobject = this.fromreferenceobject = obj;

        this.index = obj.index;
        this.oldvalue = obj.oldvalue;
        this.newvalue = obj.value;
    };
    var _pFileUploadItemChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemChangeEventInfo);
    nexacro.FileUploadItemChangeEventInfo.prototype = _pFileUploadItemChangeEventInfo;
    _pFileUploadItemChangeEventInfo._type_name = "FileUploadItemChangeEventInfo";

    delete _pFileUploadItemChangeEventInfo;

    //========================================================================
    // nexacro.FileUploadErrorEventInfo
    //========================================================================
    nexacro.FileUploadErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index)
    {
        nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
        this.index = index;
    };
    var _pFileUploadErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileUploadErrorEventInfo);
    nexacro.FileUploadErrorEventInfo.prototype = _pFileUploadErrorEventInfo;
    _pFileUploadErrorEventInfo._type_name = "FileUploadErrorEventInfo";

    delete _pFileUploadErrorEventInfo;

    //==============================================================================
    // nexacro.FileUpload
    //==============================================================================
    nexacro.FileUpload = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this.filelist = [];       
        this.filepathedits = new nexacro.Collection();
        this.filefindbuttons = new nexacro.Collection();

        this._items = [];
    };

    var _pFileUpload = nexacro._createPrototype(nexacro.Component, nexacro.FileUpload);
    nexacro.FileUpload.prototype = _pFileUpload;

    _pFileUpload._type_name = "FileUpload";

    /* User Property */
    _pFileUpload.scrollbars = "autoboth";
    _pFileUpload.filecolumn = "";
    _pFileUpload.innerdataset = null;
    _pFileUpload.text = "";
    _pFileUpload.index = -1;
    _pFileUpload.async = false;
    _pFileUpload.retry = 3;
    _pFileUpload.timeout = 30;
    _pFileUpload.itemheight = undefined;
    _pFileUpload.itemcount = 1;
    _pFileUpload.buttonsize = undefined;
    _pFileUpload.buttontext = "find";
    //_pFileUpload.dragscrolltype = "";
    _pFileUpload.scrollbarbarminsize = 1;
    _pFileUpload.scrollbarbaroutsize = 1;
    _pFileUpload.scrollbardecbuttonsize = -1;
    _pFileUpload.scrollbarsize = 17;
    _pFileUpload.selectscrollmode = "default";

    _pFileUpload.uploadurl = "";
    _pFileUpload.multiselect = false;
    _pFileUpload.rtldirection = "";
    _pFileUpload.rtlimagemirroring = "";

    //Accessibility
    _pFileUpload.accessibilityaction = "";
    _pFileUpload.accessibilityrole = "fileupload";
    _pFileUpload.accessibilitydesclevel = "all";
    _pFileUpload.accessibilitydescription = "";
    _pFileUpload.accessibilityenable = true;
    _pFileUpload.accessibilitylabel = "";

    _pFileUpload.buttonaccessibilityaction = "";
    _pFileUpload.buttonaccessibilityrole = "";
    _pFileUpload.buttonaccessibilitydesclevel = "all";
    _pFileUpload.buttonaccessibilitydescription = "";
    _pFileUpload.buttonaccessibilityenable = true;
    _pFileUpload.buttonaccessibilitylabel = "";

    _pFileUpload.editaccessibilityaction = "";
    _pFileUpload.editaccessibilityrole = "";
    _pFileUpload.editaccessibilitydesclevel = "all";
    _pFileUpload.editaccessibilitydescription = "";
    _pFileUpload.editaccessibilityenable = true;
    _pFileUpload.editaccessibilitylabel = "";

    /* Inner Property */
    _pFileUpload._is_scrollable = true;

    _pFileUpload._innerdataset = null;
    _pFileUpload._hidden_frame_handle = null;
    _pFileUpload._last_id = -1;
    _pFileUpload._editFlag = null;
    _pFileUpload._buttonFlag = true;
    _pFileUpload._set_focus_dir = -1;

    _pFileUpload._want_tab = true; // tab key
    _pFileUpload._want_arrow = false; // arrow key for accessibility
    
    _pFileUpload._onPopupWin = false;
    _pFileUpload._multiselect = false;
    _pFileUpload._first_focus = false; // first focus flag for accessibility

    _pFileUpload._event_list =
    {
        "ondblclick": 1,
        "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondrop": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmousedown": 1, "onmouseup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1, "onmove": 1, "onsize": 1,
        "onsuccess": 1, "onerror": 1,
        "onappenditem": 1, "ondeleteitem": 1, "onitemclick": 1, "onfindclick": 1, "onitemchanged": 1,
        // Touch,TouchGesture
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1      
    };

    _pFileUpload._defaultButtontext = "find";
    _pFileUpload._defaultItemheight = 18;

    /* apply */

    _pFileUpload.on_apply_buttonsize = function (buttonsize)
    {
        this.on_change_containerRect();
    };

    _pFileUpload.on_apply_buttontext = function (buttontext)
    {
        if (buttontext == null)
        {
            buttontext = this._defaultButtontext;
        }

        var items = this._items;
        var item_len = items.length;
        if (items == null)
        {
            return;
        }
        for (var i = 0; i < item_len; i++)
        {
            items[i].on_apply_buttontext(buttontext);
        }
    };

    _pFileUpload.on_apply_itemheight = function (itemheight)
    {
        this.on_change_containerRect();
        this.resetScroll();
    };

    _pFileUpload.on_apply_editaccessibility = function (editaccessibility)
    {
        var iLen = this._items.length;
        var item = null;
        var control_elem = null;

        if (editaccessibility)
        {
            for (var i = 0 ; i < iLen; i++)
            {
                item = this._getItem(i);
                if (item.fileitemedit)
                {
                    item.fileitemedit.on_apply_accessibility(editaccessibility);
                }
            }
        }
    };

    _pFileUpload.on_apply_buttonaccessibility = function (buttonaccessibility)
    {
        var iLen = this._items.length;
        var item = null;

        if (buttonaccessibility)
        {
            for (var i = 0 ; i < iLen; i++)
            {
                item = this._getItem(i);
                if (item.fileitembutton)
                {                    
                    item.fileitembutton.on_apply_accessibility(buttonaccessibility);                 
                }
            }
        }
    };    

    //==============================================================================
    // nexacro.FileUpload : Create & Update & destroy
    //==============================================================================
    _pFileUpload.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var items = this._items;
            var itemcount = this.itemcount;
            for (var i = 0; i < itemcount; i++)
            {
                var item = this._createFileItem(i, 0, 0, 0, 0, true);
                this.filepathedits.add_item(item.id, item.fileitemedit); 
                this.filefindbuttons.add_item(item.id, item.fileitembutton);
                items[i] = item;
            }
        }
    };

    _pFileUpload.on_created_contents = function ()
    {
        var rand_id = new Date().valueOf().toString();    //iframe id 
        nexacro._create_hidden_frame(this._unique_id, rand_id, this.on_load, this);
        rand_id = null;

        var items = this._items;
        var itemcount = this.itemcount;
        for (var i = 0; i < itemcount; i++)
        {
            items[i].on_created();
            items[i]._setEventHandler("onfindclick", this.on_notify_onfindclick, this);
            items[i]._setEventHandler("onitemclick", this.on_notify_onitemclick, this);            

            if (nexacro._enableaccessibility)
            {
                items[i]._setAccessibilityInfoIndex(i + 1);
                items[i]._setAccessibilityInfoCount(itemcount);
            }
            /*
            if (this.itemheight == undefined)
            {
                this.itemheight = this._getAutosizeItemHeight(items[i]);
            }
            */
        }

        this.on_apply_index();
        //this.on_apply_innerdataset();
        this.on_apply_filecolumn();
        this.on_apply_prop_enable(this._isEnable());
        if (nexacro._enableaccessibility)
        {
            this.on_apply_editaccessibility(this.editaccessibility);
            this.on_apply_buttonaccessibility(this.buttonaccessibility);
        }
        /*
        if (this.buttonsize == undefined)
        {
            this.buttonsize = this._getAutosizeButtonSize();
        }
        */
        this.on_apply_buttontext(this.buttontext);
        this.resetScroll();
        this.on_change_containerRect();
    };

    _pFileUpload.on_create_contents_command = function ()
    {
        var str = "";
        var items = this._items;
        var itemcount = this.itemcount;
        for (var i = 0; i < itemcount; i++)
        {
            str += items[i].createCommand();
        }

        return str;
    };

    _pFileUpload.on_attach_contents_handle = function (win)
    {
        var rand_id = new Date().valueOf().toString();    //iframe id 
        nexacro._create_hidden_frame(this._unique_id, rand_id, this.on_load, this);
        rand_id = null;

        var items = this._items;
        var itemcount = this.itemcount;
        for (var i = 0; i < itemcount; i++)
        {
            items[i].attachHandle(win);
            items[i]._setEventHandler("onfindclick", this.on_notify_onfindclick, this);
            items[i]._setEventHandler("onitemclick", this.on_notify_onitemclick, this);

            if (nexacro._enableaccessibility)
            {
                items[i]._setAccessibilityInfoIndex(i + 1);
                items[i]._setAccessibilityInfoCount(itemcount);
            }
            /*
            if (this.itemheight == undefined)
            {
                this.itemheight = this._getAutosizeItemHeight(items[i]);
            }
            */
        }

        this.on_apply_index();
        //this.on_apply_innerdataset();
        this.on_apply_filecolumn();
        this.on_apply_prop_enable(this._isEnable());
        if (nexacro._enableaccessibility)
        {
            this.on_apply_editaccessibility(this.editaccessibility);
            this.on_apply_buttonaccessibility(this.buttonaccessibility);
        }

        this.on_apply_buttontext(this.buttontext);
        this.resetScroll();
        if (this.buttonsize == undefined)
        {
          //  this.buttonsize = this._getAutosizeButtonSize();
        }
        this.on_change_containerRect();
    };

    _pFileUpload.on_destroy_contents = function ()
    {
        var name = this.name;
        var items = this._items;
        var item_len = items.length;
        for (var i = 0; i < item_len; i++)
        {
            items[i].destroy();
        }
        this.filelist = null;
        this._items = null;

        this.filepathedits.clear();
        this.filepathedits = null;
        this.filefindbuttons.clear();
        this.filefindbuttons = null;
        if (this._hidden_frame_handle)
            nexacro._destroy_hidden_frame(this._unique_id, this, this._hidden_frame_handle);
    };

    _pFileUpload.on_change_containerRect = function (width, height)
    {
        var items = this._items;
        var item_len = items.length;

        if (item_len <= 0)
        {
            return;
        }

        var client_width = this._getClientWidth();
        var client_left = this._getClientLeft();
        var client_top = this._getClientTop();
        var item_left, item_top;
      
        var itemheight = this.itemheight == undefined ? this._getAutosizeItemHeight(items[0]) : parseInt(this.itemheight, 10);
        var buttonsize = this.buttonsize == undefined ? this._getAutosizeButtonSize(itemheight) : parseInt(this.buttonsize, 10);
        var textsize = this._getTextSize(items[0].buttontext);
        textwidth = +textsize[0];
        buttonsize = this._buttonsize = buttonsize + textwidth;

        var pl = pr = pt = pb = 0;
        var padding = this._getCSSStyleValue("padding", this._status);
        if (padding)
        {
            pl = padding.left;
            pt = padding.top;
            pb = padding.bottom;
            pr = padding.right;
        }
        
        var item_bl = item_br = item_bt = item_bb = 0;
        var item_border;
        if (item_len > 0)
        {
            item_border = items[0]._getCSSStyleValue("border", this._status);
            if (item_border)
            {
                item_bl = item_border.left._width;
                item_bt = item_border.top._width;
                item_bb = item_border.bottom._width;
                item_br = item_border.right._width;
            }
        }

        var item_width = client_width - (pl + pr) - (item_bl + item_br);
        item_left = client_left - pl + item_bl;
        
        for (var i = 0; i < item_len; i++)
        {
            item_top = itemheight * i;

            items[i].move(item_left, item_top, item_width, itemheight, null, null);
            items[i].on_apply_itemheight(itemheight);
            items[i].on_apply_buttonsize();
        }
        this._onRecalcScrollSize(null, itemheight);
    };

    //==============================================================================
    // nexacro.FileUpload : Logical Part
    //==============================================================================
    _pFileUpload.resetScroll = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._onRecalcScrollSize();
            this._onResetScrollBar();           
        }
    };

    _pFileUpload._getTextSize = function (text)
    {
        var font = this._getCurrentStyleInheritValue("font");
        return nexacro._getTextSize(text, font);
    };

    _pFileUpload._onRecalcScrollSize = function (fromcomponent, itemheight)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var vscroll = this.vscrollbar;
            var hscroll = this.hscrollbar;

            var height =  this.itemheight;
            if (height == undefined)
                height = itemheight ? itemheight : this._getAutosizeItemHeight(this._items[0]);
            
            var scrollHeight = this.itemcount * height;
            var scrollWidth = this._getClientWidth();
            if (scrollHeight > this._getClientHeight())
            {
                if (vscroll)
                {
                    if (!vscroll.visible)
                        scrollWidth -= vscroll._getClientWidth();
                }
                else
                {
                    scrollWidth -= this._getVScrollBarSize();
                }
            }
            control_elem.setElementScrollMaxSize(scrollWidth, scrollHeight);
        }
    };

    _pFileUpload._getEventInfoComponent = function (refer_comp)
    {
        while (!refer_comp._is_eventinfo_control)
        {
            refer_comp = refer_comp.parent;
        }
        return refer_comp;
    };

    //==============================================================================
    // nexacro.FileUpload : Properties
    //==============================================================================
    _pFileUpload.set_multiselect = function (v)
    {
        if (v != this.multiselect)
        {
            this.multiselect = v;
            v = nexacro._toBoolean(v);
            if (v != this._multiselect)
            {
                this._multiselect = v;
                this.on_apply_multiselect(v);
            }
        }
    };

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 10)
    {
        _pFileUpload.on_apply_multiselect = nexacro._emptyFn;
    }
    else
    {
        _pFileUpload.on_apply_multiselect = function ()
        {
            var control_elem = this.getElement();
            if (control_elem)
            {
                var items = this._items;
                var item_len = items.length;
                var multi_select = this._multiselect;
                var comp_name = this._unique_id;

                for (var i = 0 ; i < item_len; i++)
                {
                    nexacro._setMultipleFile(comp_name, items[i].name, multi_select, items[i]);
                }
            }
        };
    }
    
    _pFileUpload.set_uploadurl = function (v)
    {
        if (v != this.uploadurl)
        {
            this.uploadurl = v;
        }
    };

    _pFileUpload.set_itemcount = function (v)
    {
        var val = parseInt(v) | 0;

        if (val != this.itemcount)
        {
            this._old_itemcount = this.itemcount;
            this.itemcount = val;
            this.on_apply_itemcount();
        }
    };

    _pFileUpload.on_apply_itemcount = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var old_itemcnt = this._old_itemcount;
            var itemcnt = this.itemcount;
            var items = this._items;
            var item_len = items.length;
            var client_left = this._getClientLeft();
            var client_top = this._getClientTop();
            var client_width = this._getClientWidth();
            var itemheight = this.itemheight;
            var buttonsize = this.buttonsize;
            var buttontext = this.buttontext;

            while (item_len && old_itemcnt > itemcnt)
            {
                old_itemcnt--;
                items.pop().destroy();
            }

            for (var i = item_len; i < itemcnt; i++)
            {
                var item_left = client_left;
                var item_top = client_top + (itemheight * i);
                var item_width = client_width;

                var item = this._createFileItem(i, item_left, item_top, item_width, itemheight, false);
                this.filepathedits.add_item(item.id, item.fileitemedit); 
                this.filefindbuttons.add_item(item.id, item.fileitembutton);
                this._items[i] = item;
            }
            this.on_change_containerRect();
            this.on_apply_buttontext(buttontext);
            this.resetScroll();
        }
    };

    _pFileUpload.set_itemheight = function (v)
    {
        var val = v == undefined ? v : parseInt(v) | 0;
        if (val != this.itemheight)
        {
            this.itemheight = val;
            this.on_apply_itemheight(val);
        }
    };

    _pFileUpload.set_buttonsize = function (v)
    {    
        var val = v == undefined ? v : parseInt(v) | 0;
        if (val != this.buttonsize)
        {
            this.buttonsize = val;
            this.on_apply_buttonsize(val);
        }
    };
    _pFileUpload.set_buttontext = function (v)
    {
        var val = v;

        if (val != this.buttontext)
        {
            this.buttontext = val;
            this.on_apply_buttontext(val);
        }
    };

    _pFileUpload.set_timeout = function (v)
    {
        if (v != this.timeout)
        {
            this.timeout = v;
        }
    };

    _pFileUpload.set_retry = function (v)
    {
        if (v != this.retry)
        {
            this.retry = v;
        }
    };

    _pFileUpload.set_async = function (v)
    {
        if (v != this.async)
        {
            this.async = v;
        }
    };

    _pFileUpload.set_index = function (v)
    {
        if (v != this.index)
        {
            this.index = v;
            this.on_apply_index(v);
            this._setAccessibilityStatSelected(v);
        }
    };

    _pFileUpload.on_apply_index = function (index)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var item = this._items[index];
            if (item)
            {                
                //nexacro.Component.prototype._resetScrollPos.call(this, this,
                //this._adjust_left,
                //this._adjust_top + item._adjust_height * item.index,
                //this._adjust_left + this._adjust_width,
                //this._adjust_top + (item._adjust_height * (item.index + 1)));

                if (this._editFlag)
                    item.fileitemedit.setFocus(false);

                if (this._buttonFlag)
                    item.fileitembutton.setFocus(false);

                //var last_comp = item._getLastFocused();
                this.value = item.value;                
            }
        }
    };

    _pFileUpload.set_text = function (v)
    {
        /* Readonly */
    };

    _pFileUpload._setText = function (v)
    {
        if (v != this.text)
        {
            this.text = v;
        }
        return this.text;
    };

    _pFileUpload.on_apply_text = function (text)
    {
    };

    _pFileUpload.set_value = function (v)
    {
        /* ReadOnly */
    };

    _pFileUpload._setValue = function (v)
    {
        if (v != this.value)
        {
            this.value = v;
        }
    };

    _pFileUpload.on_apply_value = function (value)
    {
    };
    /*
    _pFileUpload.setInnerDataset = function (obj)
    {
        if (!obj)
        {
            this._innerdataset = null;
            this.innerdataset = "";
            this.on_apply_innerdataset();
        }
        else if (obj instanceof nexacro.Dataset)
        {
            this._innerdataset = obj;
            this.innerdataset = obj.id;
            this.on_apply_innerdataset();
        }
    };
    
    _pFileUpload._setInnerDatasetStr = function (str)
    {
        if (!str)
        {
            this._innerdataset = null;
            this.innerdataset = "";
        }
        else
        {
            str = str.replace("@", "");
            this._innerdataset = this._findDataset(str);
            this.innerdataset = str;
        }
    };
    
    _pFileUpload.getInnerDataset = function ()
    {
        return this._innerdataset;
    };
    
    _pFileUpload.set_innerdataset = function (str)
    {
        if (typeof str != "string")
        {
            this.setInnerDataset(str);
            return;
        }
        if (str != this.innerdataset)
        {
            if (!str)
            {
                this._innerdataset = null;
                this.innerdataset = "";
            }
            else
            {
                str = str.replace("@", "");
                this._innerdataset = this._findDataset(str);
                this.innerdataset = str;
            }
            this.on_apply_innerdataset();
        }
        else if (this.innerdataset && !this._innerdataset)
        {
            this._setInnerDatasetStr(this.innerdataset);
            this.on_apply_innerdataset();
        }
        return this.innerdataset;
    };
    
    _pFileUpload.on_apply_innerdataset = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this.on_apply_filecolumn();
        }
    };
    */
    _pFileUpload.set_filecolumn = function (v)
    {
        if (v != this.filecolumn)
        {
            this.filecolumn = v;
            this.on_apply_filecolumn(v);
        }
    };

    _pFileUpload.on_apply_filecolumn = function (filecolumn)
    {
        var control_elem = this.getElement();
        if (control_elem && this._innerdataset)
        {
            var items = this._items;
            var _filecolumn;
            for (var i = 0; i < items.length; i++)
            {
                _filecolumn = this._innerdataset.getColumn(i, filecolumn);
                if (_filecolumn)
                {
                    items[i].set_value(_filecolumn);
                    _filecolumn = 0;
                }
            }
        }
    };

    //==============================================================================
    // nexacro.FileUpload : method
    //==============================================================================
    _pFileUpload.upload = function (v)
    {
        var ret = false;
        var uploadurl;

        if (v == undefined)
        {
            if (this.uploadurl) 
            {
            	uploadurl = nexacro._getServiceLocation(this.uploadurl);
            }
        }
        else
        {
        	uploadurl = nexacro._getServiceLocation(v);
        }

        if (uploadurl)
        {
            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len ; i++)
            {
                if (items[i].value)
                {
                    ret = true;
                    nexacro._submit(this._unique_id, uploadurl, this._hidden_frame_handle, null, items[i].value);
                    break;
                }
            }
        }
        return ret;
    };

    _pFileUpload.appendItem = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var itemcount = this.itemcount;
            var client_left = this._getClientLeft();
            var client_top = this._getClientTop();
            var client_width = this._getClientWidth();
            var itemheight = this.itemheight;
            var buttontext = this.buttontext;
            var padding = this._getCSSStyleValue("padding",this._status);

            var pl = pr = pt = pb = 0;
            if (padding)
            {
                pl = padding.left;
                pt = padding.top;
                pb = padding.bottom;
                pr = padding.right;
            }

            var item_left = client_left + pl;
            var item_top = client_top + (itemheight * itemcount) + pt;
            var item_width = client_width - pr;

            var id = itemcount;
            var item = this._createFileItem(id, item_left, item_top, item_width, itemheight, false);
            this.filepathedits.add_item(item.id, item.fileitemedit); 
            this.filefindbuttons.add_item(item.id, item.fileitembutton);

            this._items[id] = item;
            this.itemcount++;
            if (nexacro._enableaccessibility)
            {
                item._setAccessibilityInfoIndex(id);
                item._setAccessibilityInfoCount(id + 1);
            }

            this.on_change_containerRect();
            this.on_apply_buttontext(buttontext);
            this.resetScroll();

            this.on_fire_onappenditem(this, id);
        }
    };

    _pFileUpload.deleteItem = function (idx)
    {
        var cur_index = this.index;
        var control_elem = this.getElement();
        if (control_elem)
        {
            idx = parseInt(idx, 10);
            var items = this._items;

            if (this.itemcount <= idx)
            {
                return;
            }

            var iCount = this.itemcount;
            var iCnt = iCount - 1;
            for (var i = idx + 1; i < iCount; i++)
            {
                if (cur_index == i)
                {
                    this.index--;
                }
                items[i].index--;

                if (nexacro._enableaccessibility)
                {
                    items[i]._setAccessibilityInfoIndex(i);
                    items[i]._setAccessibilityInfoCount(iCnt);
                }
            }

            items[idx].destroy();
            items.splice(idx, 1);
            if (cur_index == idx)
            {
                this.index = -1;
                this.value = undefined;
            }

            this.itemcount--;

            this.on_change_containerRect();
            this.resetScroll();
            this.on_fire_ondeleteitem(this, idx);
        }
    };

    _pFileUpload.getItemCount = function (isValue)
    {
        var elem = this.getElement();
        if (elem)
        {
            isValue = nexacro._toBoolean(isValue);

            var cnt = 0;
            var idx = 0;
            var itemval_check;
            var items = this._items;
            var item_len = items.length;

            while (idx < item_len)
            {
                if (isValue == true)
                {
                    if (items[idx].value)
                    {
                        cnt++;
                    }
                }
                else
                {
                    return item_len;
                }
                ++idx;
            }
            return cnt;
        }
    };

    _pFileUpload.getItemIndex = function (obj)
    {
        var elem = this.getElement();
        if (elem)
        {
            if (typeof obj == "object")
            {
                var idx = 0;
                var items = this._items;
                while (idx < items.length)
                {
                    if (obj == items[idx].fileitembutton)
                    {
                        return idx;
                    }
                    if (obj == items[idx].fileitemedit)
                    {
                        return idx;
                    }
                    ++idx;
                }
                return -1;
            }
        }
    };

    _pFileUpload._getItem = function (index)
    {
        if (index >= 0 && this._items.length > 0)
        {
            return this._items[index];
        }

        return null;
    };

    _pFileUpload.hasValue = function (nIndex)
    {
        var elem = this.getElement();
        if (elem)
        {
            var idx = 0;
            var items = this._items;
            if (nIndex == -1)
            {
                while (idx < items.length)
                {
                    if (items[idx].value)
                    {
                        ++cnt;
                    }
                    ++idx;
                }
                if (cnt == items.length)
                {
                    return true;
                }
                return false;
            }

            if (nIndex < items.length && items[nIndex].value)
            {
                return true;
            }
            return false;
        }
    };

    _pFileUpload.getValue = function (idx)
    {
        var elem = this.getElement();
        if (elem)
        {
            var items = this._items;
            if (items && idx >= 0 && idx < items.length)
            {
                return items[idx].value;
            }
            return "";
        }
    };

    //==============================================================================
    // nexacro.FileUpload : Override
    //==============================================================================
    _pFileUpload.on_notify_onfindclick = function (obj, e)
    {
        var bHandled = false;
        var index = nexacro._indexOf(this._items, obj);

        if (this.visible && this._isEnable() && this.enableevent)
        {
            bHandled = this.on_fire_onfindclick(obj, index);

            if (bHandled)
            {
                try
                {
                    nexacro._findclick(this._unique_id, obj.name, obj, this._hidden_frame_handle);
                }
                catch (e)
                {
                    var errorobj = nexacro.MakeError("ObjectError", this, "comp_incorrect_file");
                    this.on_fire_onerror(this, errorobj.name, errorobj.message, obj, null, null, null, index);
                }

            }
        }
        return bHandled;
    };

    _pFileUpload.on_notify_onitemclick = function (obj, e)
    {
        if (this.visible && this._isEnable() && this.enableevent)
        {
            this.on_fire_onitemclick(obj, obj.index);
        }
    };

    _pFileUpload._on_getAccessibilityAdditionalLabel = function ()
    {
        if (this._first_focus == false)
        {
            var count = 0;
            var items = this._items;
            if (items)
                count = items.length;
            return (+this.index) + 1 + " " + count;
        }
        return "";
    };

    _pFileUpload._isAccessibilityEnable = function ()
    {
        return true;
    };

    _pFileUpload.on_get_accessibility_label = function ()
    {
        var label = "";
        //label = this.text ? this.text : this.value;
        return label;
    };

    //==============================================================================
    // nexacro.FileUpload : Event Handler
    //==============================================================================
    _pFileUpload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index)
    {
        if (this.onerror && this.onerror._has_handlers)
        {
            var evt = new nexacro.FileUploadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index);
            return this.onerror._fireEvent(this, evt);
        }
        return true;
    };

    _pFileUpload.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, evtinfo_control.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireEvent(this, evt);
        }
        return false;
    };

    _pFileUpload.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, evtinfo_control.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pFileUpload.on_fire_onfindclick = function (obj, index)
    {
        var bCheck = true;

        if (this.onfindclick && this.onfindclick._has_handlers)
        {
            var evt = new nexacro.FileUploadItemEventInfo(this, "onfindclick", index);
            bCheck = this.onfindclick._fireCheckEvent(this, evt);
        }

        return bCheck;
    };

    _pFileUpload.on_fire_onitemclick = function (obj, index)
    {
        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            var evt = new nexacro.FileUploadItemEventInfo(this, "onitemclick", index);
            this.onitemclick._fireEvent(this, evt);
        }
    };

    _pFileUpload.on_fire_onappenditem = function (obj, index)
    {
        if (this.onappenditem && this.onappenditem._has_handlers)
        {
            var evt = new nexacro.FileUploadItemEventInfo(obj, "onappenditem", index);
            this.onappenditem._fireEvent(this, evt);
        }
    };

    _pFileUpload.on_fire_ondeleteitem = function (obj, index)
    {
        if (this.ondeleteitem && this.ondeleteitem._has_handlers)
        {
            var evt = new nexacro.FileUploadItemEventInfo(obj, "ondeleteitem", index);
            this.ondeleteitem._fireEvent(this, evt);
        }
    };

    _pFileUpload.on_fire_onitemchanged = function (obj, index, oldvalue, newvalue)
    {
        if (this.onitemchanged && this.onitemchanged._has_handlers)
        {
            var evt = new nexacro.FileUploadItemChangeEventInfo(obj, "onitemchanged", index, oldvalue, newvalue);
            return this.onitemchanged._fireEvent(this, evt);
        }
    };

    _pFileUpload.on_fire_onsuccess = function (ds, code, msg, url, variables)
    {
    	var application = nexacro.getApplication();
    	if (application)
	        application._endCommProgress();

        if (this.onsuccess && this.onsuccess._has_handlers)
        {
            if (variables && variables.length > 0)
            {
                var evt = new nexacro.FileUploadEventInfo(this, "onsuccess", ds, code, msg, url);
                return this.onsuccess._fireEvent(this, evt);
            }
            else
            {
                var evt = new nexacro.FileUploadEventInfo(this, "onsuccess", ds, undefined, undefined, url);
                return this.onsuccess._fireEvent(this, evt);
            }
        }
    };

    _pFileUpload._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var want_tab = this._want_tab;
        this._want_tab = true;
        return { want_tab: want_tab, want_return: true, want_escape: false, want_chars: false, want_arrows: this._want_arrow };
    };

    _pFileUpload.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var items = this._items;
        var tab_flag = false;
        var idx = this.index;
        var E = nexacro.Event;

        if (keycode == E.KEY_TAB) // KEY_TAB
        {
            if ((shift_key && idx == 0) || (!shift_key && idx == items.length - 1)) // out a range
            {
                this._want_tab = false;
                this.set_index(-1);
            }
            else  // Within a range
            {
                if (shift_key)
                {
                    idx--;
                }
                else
                {
                    idx++;
                }
                this.set_index(idx);
            }
            this._getWindow()._keydown_element._event_stop = true;
        } // use tabkey
        else
        {

            if (nexacro._enableaccessibility)
            {
                var focus_up = keycode == E.KEY_UP && ctrl_key;
                var focus_down = keycode == E.KEY_DOWN && ctrl_key;

                if (items[idx])
                    this._find_item_status(items[idx]);

                // focus move only accessibility enable true
                var accessibility = nexacro._toBoolean(this.accessibility);
                var editaccessibility = nexacro._toBoolean(this.editaccessibility);
                var buttonaccessibility = nexacro._toBoolean(this.buttonaccessibility);

//                 var accessibilityenable = this.accessibilityenable;
//                 var editaccessibilityenable = items[idx].accessibilityenable;
//                 var buttonaccessibilityenable = items[idx].accessibilityenable;

                if (focus_up || focus_down)
                {
                    var _window = this._getWindow();
                    if ((focus_up && idx < 0) || (focus_down && this._buttonFlag && idx == items.length - 1))
                    {
                        this._want_arrow = false;
                    }
                    else  // Within a range
                    {
                        //while ((editaccessibility && editaccessibility.enable) || (buttonaccessibility && buttonaccessibility.enable))
                        while (editaccessibility  || buttonaccessibility )
                        {
                            if (focus_up)
                            {
                                //if (!this._editFlag && editaccessibility && editaccessibility.enable)
                                if (!this._editFlag && editaccessibility)
                                {
                                    this.index = -1;
                                    this._editFlag = true;
                                    this._buttonFlag = false;
                                }
                                else
                                {
                                    idx--;
                                    //if (buttonaccessibility && buttonaccessibility.enable)
                                    if (buttonaccessibility)
                                    {
                                        //if (idx < 0 && accessibility && accessibility.enable) // move to Filupload
                                        if (idx < 0 && accessibility) // move to Filupload
                                        {
                                            this._editFlag = false;
                                            this._buttonFlag = false;
                                            _window._removeFromCurrentFocusPath(this, false);
                                            this._setFocus(false);
                                        }
                                        else // move to buttonItem
                                        {
                                            this.index = -1;
                                            this._editFlag = false;
                                            this._buttonFlag = true;
                                        }
                                    }
                                    else
                                    {
                                        if (idx > 0)
                                        {
                                            this._buttonFlag = false;
                                            continue;
                                        }
                                        else
                                        {
                                            this._want_arrow = false;
                                            //if (accessibility && accessibility.enable)
                                            if (accessibility)
                                            {
                                                this._editFlag = false;
                                                this._buttonFlag = false;
                                                _window._removeFromCurrentFocusPath(this, false);
                                                this._setFocus(false);
                                            }
                                        }
                                    }
                                }
                            }
                            else if (focus_down)
                            {
                                //if (!this._editFlag && editaccessibility && editaccessibility.enable)
                                if (!this._editFlag && editaccessibility)
                                {
                                    idx++;
                                    this._editFlag = true;
                                    this._buttonFlag = false;
                                }
                                else
                                {
                                    //if (buttonaccessibility && buttonaccessibility.enable)
                                    if (buttonaccessibility)
                                    {
                                        this.index = -1;
                                        this._editFlag = false;
                                        this._buttonFlag = true;
                                    }
                                    else
                                    {
                                        if (idx < items.length - 1)
                                        {
                                            this._editFlag = false;
                                            continue;
                                        }
                                        else
                                        {
                                            this._want_arrow = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            this.set_index(idx);
                            this._want_arrow = true;
                            this._getWindow()._keydown_element._event_stop = true;
                            break;
                        }
                    }
                }
                else
                {
                    this._want_arrow = false;
                }
            } // enableaccessibility
        } // no use tabkey        
        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };

    _pFileUpload._find_item_status = function (item)
    {
        this._editFlag = (item.fileitemedit._status == "focused");
        this._buttonFlag = (item.fileitembutton._status == "focused");
    };

    _pFileUpload._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
        var items = this._items;
        var itemLen = items.length;
        var focus_dir = null;
        var idx = this.index;
        if (itemLen)
        {
            this._want_tab = true;
            focus_dir = evt_name == "shifttabkey";
            if (evt_name == "shifttabkey" || evt_name == "tabkey")
            {
                this._editFlag = false;
                this._buttonFlag = true;
                if (focus_dir)
                {
                    idx = this.index < 0 ? itemLen - 1 : this.index;
                }
                else
                {
                    idx = this.index < 0 ? 0 : this.index;
                    this._first_focus = true;
                }
                this.index = -1;
            }
            else
            {
                focus_dir = evt_name == "upkey";
                if (nexacro._enableaccessibility)
                {
                    this._editFlag = false;
                    this._buttonFlag = false;
                    this._want_arrow = true;

                    var accessibility = nexacro._toBoolean(this.accessibility);
                    var editaccessibility = nexacro._toBoolean(this.editaccessibility);
                    var buttonaccessibility = nexacro._toBoolean(this.buttonaccessibility);

                    if (focus_dir)
                    {
                        this.index = -1;
                        idx = itemLen - 1;
                        //if (buttonaccessibility && buttonaccessibility.enable)
                        if (buttonaccessibility)
                        {
                            this._buttonFlag = true;
                        }
                        //else if (editaccessibility && editaccessibility.enable)
                        else if (editaccessibility)
                        {
                            this._editFlag = true;
                        }
                    }
                    else
                    {
                        idx = -1;
                        //if (accessibility && accessibility.enable == false)
                        if (accessibility == false)
                        {
                            idx = 0;
                            this.index = -1;
                            //if (editaccessibility && editaccessibility.enable)
                            if (editaccessibility)
                            {
                                this._editFlag = true;
                            }
                            //else if (buttonaccessibility && buttonaccessibility.enable)
                            else if (buttonaccessibility)
                            {
                                this._buttonFlag = true;
                            }
                            this._first_focus = (this._editFlag || this._buttonFlag) ? true : false;
                        }
                    }
                } // enableaccessibility                
            }
            this.set_index(idx);
            if (nexacro._enableaccessibility)
            {
                this._first_focus = false;
            }
        }
    };

    _pFileUpload.on_apply_custom_setfocus = function (evt_name)
    {
        var enableaccessibility = nexacro._enableaccessibility;
        var selffocus = ((evt_name == "lbutton") ? false : enableaccessibility);
        var items = this._items;
        if (items.length < -1 || enableaccessibility)
        {
            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.setElementFocus(selffocus);
            }
        }
        else
        {
            var item = items[this.index];
            if (item)
            {
                item.fileitembutton._control_element.setElementFocus(selffocus);
            }
        }
    };

    _pFileUpload._setParamter = nexacro._emptyFn;
    _pFileUpload._getDataset = nexacro._emptyFn;

    //==============================================================================
    // nexacro.FileUpload : inner method
    //==============================================================================
    _pFileUpload.on_load = function (status, data, url, errcode, httpcode, errmsg)
    {
        var i, id, val, remoteId, ds;
        var code = 0, msg = "";
        var dsArray = new nexacro.Collection();

        try
        {
            var xmldoc = nexacro._getXMLDocument(this._unique_id, data, url);
            if (xmldoc)
            {   
                url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
                if (url == "about:blank")
                    return;

                var result = nexacro._getCommDataFromDom(xmldoc, this);
                var variables = result[0];
                var datasets = result[1];
                var len = variables.length;

                if (len > 0)
                {
                    for (i = 0; i < len; i++)
                    {
                        id = variables[i]["id"];
                        if (id && id.length)
                        {
                            val = variables[i]["val"];
                            if (id == "ErrorCode")
                            {
                                code = parseInt(val, 10);
                                if (!isFinite(code))
                                {
                                    code = -1;
                                }
                            }
                            else if (id == "ErrorMsg")
                            {
                                msg = val;
                            }
                        }
                    }
                    
                    this.on_fire_onsuccess(datasets, code, msg, url, variables);
                }
                else
                {
                    var errormsg = "failed to get";
                    this.on_fire_onerror(this, "ObjectError", errormsg, this, 9901, null, null, -1);
                }
            }
        }
        catch (e)
        {
            var errormsg = "failed to get";
            this.on_fire_onerror(this, "ObjectError", errormsg, this, 9901, null, null, -1);
        }

    };

    _pFileUpload._createFileItem = function (id, left, top, width, height, bCreatOnly)
    {
        var unique = this.itemcount < 1 ? this._last_id = 0 : ++this._last_id;
        var name = "upfile" + unique;
        var item = new nexacro._FileUploadItemControl(name, "absolute", left, top, width, height, null, null, this);

        item.index = id;
        item.set_name(name);

        item.createComponent(bCreatOnly);

        item._setEventHandler("onfindclick", this.on_notify_onfindclick, this);
        item._setEventHandler("onitemclick", this.on_notify_onitemclick, this);        
        
        return item;
    };

    _pFileUpload.on_apply_prop_enable = function (v)
    {
        nexacro.Component.prototype.on_apply_prop_enable.call(this, v); 

        var items = this._items;
        var item_len = items.length;

        for (var i = 0; i < item_len; i++)
        {
            items[i]._setEnable(v); 
            items[i].fileitemedit._setEnable(v);
            items[i].fileitembutton._setEnable(v);
        }
    };

    _pFileUpload._isPopupFrame = function ()
    {
        return this._onPopupWin;
    };

    _pFileUpload._upadteFileList = function ()
    {
        var file_list = this.filelist = [];

        var items = this._items;

        var item_len = items.length;

        var v_file, files, file;
        for (var i = 0; i < item_len; i++)
        {
            var item = items[i];
            files = item._files;
            if (files)
            {
                var files_len = files.length;
                for (var j = 0; j < files_len; j++)
                {
                    var list_len = file_list.length;
                    v_file = new nexacro.VirtualFile("uploadfile" + list_len);
                    file = files[j];
                    v_file._setRefFile(file);
                    file_list[list_len] = v_file;
                }
            }
        }
    };

    _pFileUpload._getAutosizeItemHeight = function (item)
    {
        var currentstatus = this._status;
        var fileitemedit = item.fileitemedit;
        var fileitembutton = item.fileitembutton;
        var fileitemedit_height = 0, fileitembutton_height = 0;
        if (fileitemedit)
        {
            var font = fileitemedit._getCurrentStyleInheritValue("font", currentstatus);
            //var border = fileitemedit._getCSSStyleValue("border", currentstatus);
            var padding = fileitemedit._getCSSStyleValue("padding", currentstatus);
            fileitemedit_height = parseInt(nexacro._getTextSize(">", font, currentstatus)[1]);
            if (padding)
                fileitemedit_height = fileitemedit_height + padding.top + padding.bottom;
        }

        if (fileitembutton)
        {
            var font = fileitembutton._getCurrentStyleInheritValue("font", currentstatus);
            //var border = fileitemedit._getCSSStyleValue("border", currentstatus);
            var padding = fileitembutton._getCSSStyleValue("padding", currentstatus);
            fileitembutton_height = parseInt(nexacro._getTextSize(">", font, currentstatus)[1]);
            if (padding)
                fileitembutton_height = fileitembutton_height + padding.top + padding.bottom;
            this._fileitembutton_height = fileitembutton_height;
        }
        return fileitemedit_height > fileitembutton_height ? fileitemedit_height : fileitembutton_height;
    };

    _pFileUpload._getAutosizeButtonSize = function (itemheight)
    {
        var h = this._fileitembutton_height;
        if (h)
            return h * 3;
        else
            return itemheight ? itemheight * 3 : this.itemheight * 3;
    };


    delete _pFileUpload;

   
    //==============================================================================
    // nexacro._FileItemControl
    //==============================================================================
    nexacro._FileUploadItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);        
    };

    var _pFileUploadItemControl = nexacro._createPrototype(nexacro.Component, nexacro._FileUploadItemControl);
    nexacro._FileUploadItemControl.prototype = _pFileUploadItemControl;
    _pFileUploadItemControl._type_name = "FileUploadItemControl";
    _pFileUploadItemControl._is_subcontrol = true;
    _pFileUploadItemControl._is_simple_control = true;

    _pFileUploadItemControl.fileitemedit = null;
    _pFileUploadItemControl.fileitembutton = null;
    _pFileUploadItemControl.selected = false;

    _pFileUploadItemControl.itemheight = 18;
    _pFileUploadItemControl.buttontext = "find";
    _pFileUploadItemControl.buttonsize = undefined;
    _pFileUploadItemControl.name = "";
    _pFileUploadItemControl.oldvalue = "";
    _pFileUploadItemControl.value = "";
    _pFileUploadItemControl.index = 0;
    _pFileUploadItemControl._accessibility_role = "none";

    _pFileUploadItemControl._event_list =
    {
        "onfindclick": 1, "onitemclick": 1
    };

    //==============================================================================
    // nexacro._FileUploadItemControl : Style Part
    //==============================================================================
    _pFileUploadItemControl.on_apply_itemheight = function ()
    {
        this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
    };

    _pFileUploadItemControl.on_apply_buttonsize = function ()
    {
        this.on_change_containerRect(this._getClientWidth(), this._getClientHeight());
    };

    _pFileUploadItemControl.on_apply_buttontext = function (buttontext)
    {
        if (this.fileitembutton)
        {
            this.fileitembutton.set_text(buttontext);
        }
    };

    //==============================================================================
    // nexacro._FileUploadItemControl : Create & Update & destroy
    //==============================================================================
    _pFileUploadItemControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this.fileitemedit = new nexacro._FileUploadItemEditControl("fileuploaditemedit", "absolute", 0, 0, 0, 0, null, null, this);
            this.fileitembutton = new nexacro._FileUploadItemButtonControl("fileuploaditembutton", "absolute", 0, 0, 0, 0, null, null, this);

            this.fileitemedit.set_readonly("true");
            this.fileitembutton.set_text("find");

            this.fileitemedit.createComponent(true);
            this.fileitembutton.createComponent(true);
        }
    };

    _pFileUploadItemControl.on_created_contents = function ()
    {
        var parent = this.parent;
        nexacro._append_hidden_item(parent._unique_id, this.name, this.on_fileinput_onchange, this, parent._hidden_frame_handle, parent._multiselect);

        this.fileitemedit.on_created();
        this.fileitembutton.on_created();

        this.fileitemedit._setEventHandler("oneditclick", this.on_notify_fileitem_oneditclick, this);
        this.fileitembutton._setEventHandler("onclick", this.on_notify_fileitem_onfindclick, this);
        this.fileitemedit._setEventHandler("onlbuttondown", this.on_notify_fileitem_oneditlbuttondown, this);
        this.fileitembutton._setEventHandler("onlbuttondown", this.on_notify_fileitem_onfindlbuttondown, this);

        this._setAccessibilityActiveDescendant(this.fileitembutton);

    };

    _pFileUploadItemControl.on_create_contents_command = function ()
    {
        var str = "";
        if (this.fileitemedit)
            str += this.fileitemedit.createCommand();
        if (this.fileitembutton)
            str += this.fileitembutton.createCommand();

        return str;
    };

    _pFileUploadItemControl.on_attach_contents_handle = function (win)
    {
        if (this.fileitemedit)
            this.fileitemedit.attachHandle(win);
        if (this.fileitembutton)
            this.fileitembutton.attachHandle(win);

        var parent = this.parent;
        nexacro._append_hidden_item(parent._unique_id, this.name, this.on_fileinput_onchange, this, parent._hidden_frame_handle, parent._multiselect);

        this.fileitemedit._setEventHandler("oneditclick", this.on_notify_fileitem_oneditclick, this);
        this.fileitembutton._setEventHandler("onclick", this.on_notify_fileitem_onfindclick, this);
        this.fileitemedit._setEventHandler("onlbuttondown", this.on_notify_fileitem_oneditlbuttondown, this);
        this.fileitembutton._setEventHandler("onlbuttondown", this.on_notify_fileitem_onfindlbuttondown, this);
        this._setAccessibilityActiveDescendant(this.fileitembutton);
    };


    _pFileUploadItemControl.on_destroy_contents = function ()
    {
        if (this.fileitemedit)
        {
            this.parent.filepathedits.delete_item(this.id); 

            this.fileitemedit.destroy();
            this.fileitemedit = null;
        }
        if (this.fileitembutton)
        {
            this.parent.filefindbuttons.delete_item(this.id); 

            this.fileitembutton.destroy();
            this.fileitembutton = null;
        }

        if (this._files)
        {
            this._files = null;
        }

 
        var parent = this.parent;
        if (parent && parent._hidden_frame_handle)
            nexacro._remove_hidden_item(parent._unique_id, this.name, parent._hidden_frame_handle);
        if (this._input_node)
            this._input_node = null;
    };

    _pFileUploadItemControl.on_change_containerRect = function (width, height)
    {
        var button_width = this.buttonsize;
        var _height = this.itemheight;
        var parent = this.parent;
        if (parent)
        {
            
            var itemheight = parent.itemheight;
            _height = itemheight ? itemheight : parent._getAutosizeItemHeight(this);
            var buttonsize = parent._buttonsize;
            button_width = buttonsize ? buttonsize : parent._getAutosizeButtonSize(itemheight);
        }

        var edit_l = this._getClientLeft();
        var edit_t = this._getClientTop();
        var edit_w = this._getClientWidth() - button_width;
        var edit_h = _height;

        var button_l = edit_l + edit_w;
        var button_t = edit_t;
        var button_w = button_width;
        var button_h = edit_h;

        if (this.fileitemedit)
        {
            this.fileitemedit.move(edit_l, edit_t, edit_w, edit_h, null, null);
        }
        if (this.fileitembutton)
        {
            this.fileitembutton.move(button_l, button_t, button_w, button_h, null, null);
        }
    };

    _pFileUploadItemControl.on_getIDCSSSelector = function ()
    {
        return "fileuploaditem";
    };

    //==============================================================================
    // nexacro._FileUploadItemControl : Properties
    //==============================================================================

    _pFileUploadItemControl.set_value = function (v)
    {
        if (v != this.value)
        {
            this.oldvalue = this.value;
            this.value = v;
            this.on_apply_value(v);
            this.parent.set_index(this.index);
            this.parent._setText(v);
            this.parent._setValue(v);
            return true;
        }
        return false;
    };

    _pFileUploadItemControl.on_apply_value = function (v)
    {
        if (this.fileitemedit)
        {
            this.fileitemedit.set_value(v);
        }
    };

    _pFileUploadItemControl.set_name = function (v)
    {
        if (v != this.name)
        {
            this.name = v;
        }
    };



    //==============================================================================
    // nexacro._FileUploadItemControl : Override
    //==============================================================================
    _pFileUploadItemControl.on_notify_fileitem_oneditclick = function (obj, e)
    {
        this.parent.set_index(this.index);

        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            this.onitemclick._fireEvent(this, e);
        }
        return false;
    };

    _pFileUploadItemControl.on_notify_fileitem_onfindclick = function (obj, e)
    {
        this.parent.set_index(this.index);

        if (this.onfindclick && this.onfindclick._has_handlers)
        {
            this.onfindclick._fireEvent(this, e);
        }
        return false;
    };

    _pFileUploadItemControl.on_notify_fileitem_oneditlbuttondown = function (obj, e)
    {
        this._accessibility_find_focus_flag(true, false);
        this.parent.set_index(this.index);
    };

    _pFileUploadItemControl.on_notify_fileitem_onfindlbuttondown = function (obj, e)
    {
        this._accessibility_find_focus_flag(false, true);
        this.parent.set_index(this.index);
    };

    _pFileUploadItemControl._accessibility_find_focus_flag = function (editflag, buttonflag)
    {
        if (nexacro._enableaccessibility)
        {
            this.parent._editFlag = editflag;
            this.parent._buttonFlag = buttonflag;
        }
    };

    //==============================================================================
    // nexacro._FileUploadItemControl : Inner Event Handler
    //==============================================================================
    _pFileUploadItemControl.on_fileinput_onchange = function (value)
    {
        if (this.set_value(value))
        {
            this.parent.on_fire_onitemchanged(this, this.index, this.oldvalue, this.value);
        }
    };

    _pFileUploadItemControl._isPopupFrame = function ()
    {
        return this.parent._onPopupWin;
    };

    _pFileUploadItemControl._changeFiles = function (files)
    {
        this._files = files;
        this.parent._upadteFileList();
    };

    delete _pFileUploadItemControl;

    //==============================================================================
    // nexacro._FileItemEditCtrl
    //==============================================================================
    nexacro._FileUploadItemEditControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Edit.call(this, id, position, left, top, width, height, right, bottom, parent);                  
    };

    var _pFileUploadItemEditControl = nexacro._createPrototype(nexacro.Edit, nexacro._FileUploadItemEditControl);
    nexacro._FileUploadItemEditControl.prototype = _pFileUploadItemEditControl;
    _pFileUploadItemEditControl._type_name = "EditControl";
    _pFileUploadItemEditControl._is_subcontrol = true;
    _pFileUploadItemEditControl._is_eventinfo_control = false;


    //==============================================================================
    // nexacro._FileUploadItemEditControl :  Override
    //==============================================================================    
    _pFileUploadItemEditControl._getAccessibilityLabel = function (accessibility)
    {
        var label = "";
        if (this.parent.parent._first_focus)
        {
            var comp = this.parent.parent;
            label = comp._control_element._makeAccessibilityLabelbyReadtype();
        }
        label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
        return label;
    };

    delete _pFileUploadItemEditControl;

    //==============================================================================
    // nexacro._FileItemButtonCtrl
    //==============================================================================
    nexacro._FileUploadItemButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);                
        //this._accessibility_role = "none";
    };

    var _pFileUploadItemButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._FileUploadItemButtonControl);
    nexacro._FileUploadItemButtonControl.prototype = _pFileUploadItemButtonControl;
    _pFileUploadItemButtonControl._type_name = "ButtonControl";
    _pFileUploadItemButtonControl._is_subcontrol = true;
    _pFileUploadItemButtonControl._is_eventinfo_control = false;

    //==============================================================================
    // nexacro._FileItemButtonCtrl : Override
    //==============================================================================
    _pFileUploadItemButtonControl._getAccessibilityLabel = function (accessibility)
    {
        var label = "";
        if (this.parent.parent._first_focus)
        {
            var comp = this.parent.parent;
            label = comp._control_element._makeAccessibilityLabelbyReadtype();            
        }
        label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
        return label;
    };

    //==============================================================================
    // nexacro._FileItemButtonCtrl : Event Handler
    //==============================================================================
    
    _pFileUploadItemButtonControl.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
        if (this.getElement() == this._cur_ldown_elem)
        {
            if (key_code == 13 || key_code == 32) // 13 'enter' , 32 'space'
            {
                this.click();
            }
        }
        this._cur_ldown_elem = null;
        return ret;
    };
    
    delete _pFileUploadItemButtonControl;
}