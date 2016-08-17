//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.tobesoft.com/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================
if (!nexacro._PopupMenuItemControl)
{
    // =================================================================================
    // nexacro._PopupMenuItemControl
    // =================================================================================

    nexacro._PopupMenuItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro._MenuItemControl.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pPopupMenuItemControl = nexacro._createPrototype(nexacro._MenuItemControl, nexacro._PopupMenuItemControl);
    nexacro._PopupMenuItemControl.prototype = _pPopupMenuItemControl;

    _pPopupMenuItemControl._type_name = "PopupMenuItemControl";
    _pPopupMenuItemControl._is_subcontrol = true;

    _pPopupMenuItemControl.expimgelem = null;
    //_pPopupMenuItemControl.itemheight = 20;

    _pPopupMenuItemControl.chkwidth = 0;
    _pPopupMenuItemControl.textwidth = 0;
    _pPopupMenuItemControl.hotkeywidth = 0;
    _pPopupMenuItemControl.expwidth = 0;
    _pPopupMenuItemControl.expheight = 0;
    _pPopupMenuItemControl.index = 0;
    _pPopupMenuItemControl.datarow = 0;
    _pPopupMenuItemControl._canExpand = true;

    _pPopupMenuItemControl.value = false;
    //_pPopupMenuItemControl.expandimage = "";
    //_pPopupMenuItemControl.checkimage = "";
    _pPopupMenuItemControl.id = "";
    _pPopupMenuItemControl.enable = true;

    _pPopupMenuItemControl.icon = "";
    _pPopupMenuItemControl.userdata = null;
    _pPopupMenuItemControl.buttonalign = "";

    _pPopupMenuItemControl._icon_elem = null;
    _pPopupMenuItemControl._text_elem = null;
    _pPopupMenuItemControl._hotkeytext_elem = null;
    _pPopupMenuItemControl._hotkey_string = "";
    _pPopupMenuItemControl._accessibility_role = "menuitem";
    //_pPopupMenuItemControl._is_reference_control = false;
    // ===============================================================================
    // nexacro.PopupMenuItem : Style Part
    // ===============================================================================
    _pPopupMenuItemControl.on_apply_accessibility = function (accessibility)
    {
        var control_elem = this._control_element;
        if (control_elem && accessibility)
        {
            control_elem.setAccessibility(accessibility);

            this._updateAccessibilityLabel(this);
        }
    };

    _pPopupMenuItemControl._getWindowPosition = function ()
    {
        return nexacro.Component.prototype._getWindowPosition.call(this);
    };

    // -- All Componets overide this function    
    // ===============================================================================
    // nexacro.PopupMenuItem : Create & Destroy & Update
    // ===============================================================================
    _pPopupMenuItemControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();

        if (control_elem)
        {
            //text
            this._textcontrol = new nexacro.Static(this.id + "text", "absolute", 0, 0, 0, 0, null, null, this);
            this._textcontrol._setControl("popupmenuitemtext");
            this._textcontrol._setEventInfoControl(false);

            //hotkey
            this._hotkeytextcontrol = new nexacro.Static(this.id + "hotkeytext", "absolute", 0, 0, 0, 0, null, null, this);
            this._hotkeytextcontrol._setControl("popupmenuhotkeytext");
            this._hotkeytextcontrol._setEventInfoControl(false);
            if (this._hotkey_string)
            {
                this._hotkeytextcontrol.set_text(this._hotkey_string);
            }
            
            //expand image
            this._textcontrol.createComponent();
            this._hotkeytextcontrol.createComponent();
        }
    };

    _pPopupMenuItemControl.on_created_contents = function (_window)
    {
        var iconcontrol = this._iconcontrol;
        var hotkeytextcontrol = this._hotkeytextcontrol;
        var textcontrol = this._textcontrol;
        var expiconcontrol = this._expiconcontrol;

        if (iconcontrol)
        {
            iconcontrol.on_created(_window);
        }
        if (textcontrol)
        {
            if (this.text)
                this._on_apply_text(this.text);
            textcontrol.on_created(_window);
        }
        if (hotkeytextcontrol)
        {
            this.on_apply_hotkeytext();
            hotkeytextcontrol.on_created(_window);
        }
        if (expiconcontrol)
        {
            expiconcontrol.on_created(_window);
        }
        var hotkey_list = this._hot_key_list;
        if (hotkey_list)
        {
            for (var i = 0, len = hotkey_list.length; i < len; i++)
            {
                this._registerItemHotkey(hotkey_list[i].key);
            }
        }
    };

    _pPopupMenuItemControl.on_create_contents_command = function ()
    {
        var str = "";
        var iconcontrol = this._iconcontrol;
        var hotkeytextcontrol = this._hotkeytextcontrol;
        var textcontrol = this._textcontrol;
        var expiconcontrol = this._expiconcontrol;

        if (iconcontrol)
        {
            str += iconcontrol.createCommand();
        }

        if (hotkeytextcontrol)
        {
            str += hotkeytextcontrol.createCommand();
        }

        if (textcontrol)
        {
            str += textcontrol.createCommand();
        }

        if (expiconcontrol)
        {
            str += expiconcontrol.createCommand();
        }

        return str;
    };

    _pPopupMenuItemControl.on_attach_contents_handle = function (win)
    {
        var iconcontrol = this._iconcontrol;
        var hotkeytextcontrol = this._hotkeytextcontrol;
        var textcontrol = this._textcontrol;
        var expiconcontrol = this._expiconcontrol;

        if (iconcontrol)
        {
            iconcontrol.attachHandle(win);
        }

        if (hotkeytextcontrol)
        {
            hotkeytextcontrol.attachHandle(win);
        }

        if (textcontrol)
        {
            textcontrol.attachHandle(win);
        }

        if (expiconcontrol)
        {
            expiconcontrol.attachHandle(win);
        }
    };

    _pPopupMenuItemControl.on_destroy_contents = function ()
    {
        if (this._iconcontrol)
        {
            this._iconcontrol.destroy();
            this._iconcontrol = null;
        }

        if (this._hotkeytextcontrol)
        {
            this._hotkeytextcontrol.destroy();
            this._hotkeytext_elem = null;
        }

        if (this._textcontrol)
        {
            this._textcontrol.destroy();
            this._textcontrol = null;
        }

        if (this._expiconcontrol)
        {
            this._expiconcontrol.destroy();
            this._expiconcontrol = null;
        }
    };


    _pPopupMenuItemControl.on_change_containerPos = function (left, top)
    {
        //this._updateControlPosition();
    };

    _pPopupMenuItemControl.on_change_containerRect = function (width, height)
    {
        this._updateControlPosition();
    };

    _pPopupMenuItemControl.on_getIDCSSSelector = function ()
    {
        return "popupmenuitem";
    };

    // ===============================================================================
    // nexacro.PopupMenuItem : Property
    // ===============================================================================

    _pPopupMenuItemControl._setValue = function (v)
    {
        if (this.value != v)
        {
            this.value = v;
            this.on_apply_value();
        }
    };

    _pPopupMenuItemControl.on_apply_value = function ()
    {
        if (this.value)
        {
            var iconcontrol = this._iconcontrol;
            if (!iconcontrol)
            {
                iconcontrol = new nexacro._Icon("popupmenuitemcheckbox", "absolute", 0, 0, 0, 0, null, null, this);
                iconcontrol._setControl("popupmenuitemcheckbox");
                iconcontrol.createComponent();                
                this._iconcontrol = iconcontrol;
                if (this._is_created_contents)
                    iconcontrol.on_created();
            }

        }
        /*
        var checkimage = this.parent.checkboximage;
        if (checkimage)
            this._setCheckimage(checkimage);
        */
    };

    _pPopupMenuItemControl._setIcon = function (v)
    {
        /*       
        if (v)
        {
            if (!this.icon || (this.icon && this.icon.value != v))
                this.icon = nexacro.UrlObject(v);
            else
                return;

        }
        else
        {
            this.icon = null;
        }*/
        // var val = nexacro._getURIValue(v);
        //val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
        this._icon = v;
        this.on_apply_icon();
    };

    _pPopupMenuItemControl.on_apply_icon = function ()
    {
        var iconcontrol = this._iconcontrol;
        if (!iconcontrol)
        {
            iconcontrol = new nexacro._Icon("popupmenuitemicon", "absolute", 0, 0, 0, 0, null, null, this);
            iconcontrol._setControl("popupmenuitemicon");
            iconcontrol.createComponent();
            this._iconcontrol = iconcontrol;
        }
        if (this._icon)
            iconcontrol.set_icon(this._icon);
    };
    
    _pPopupMenuItemControl._setExpandimage = function (v)
    {
        this.on_apply_expandimage();
        /*
        if (v)
        {
            if (this.expandimage != v)
            {
                this.expandimage = v;
                this.on_apply_expandimage();
            }
        }
        else
        {
            this.expandimage = "";
            this.on_apply_expandimage();
        }
            */
    };

    _pPopupMenuItemControl.on_apply_expandimage = function ()
    {
        if (this._canExpand)
        {
            var expiconcontrol = this._expiconcontrol;
            if (!expiconcontrol)
            {
                expiconcontrol = new nexacro._IconText("popupmenuitemexpandimage", "absolute", 0, 0, 0, 0, null, null, this);
                expiconcontrol._setControl("popupmenuitemexpandimage");
                //expiconcontrol._setReferenceControl(false);
                expiconcontrol.createComponent();
                this._expiconcontrol = expiconcontrol;
            }
            var icon = expiconcontrol._getCSSStyleValue("icon");
            if (!icon)
                expiconcontrol.set_text(">");
        }
    };
    /*
    _pPopupMenuItemControl._setCheckimage = function (v)
    {
        if (this.checkimage != v)
        {
            this.checkimage = v;
            this.on_apply_checkimage();
        }
    };
   

    _pPopupMenuItemControl.on_apply_checkimage = function ()
    {
        var iconcontrol = this._iconcontrol;
        if (!iconcontrol)
        {
            iconcontrol = new nexacro._Icon("popupmenuitemcheckbox", "absolute", 0, 0, 0, 0, null, null, this);
            iconcontrol._setControl("popupmenuitemcheckbox");
            //iconcontrol._setReferenceControl(false);
            if (this._is_created)
                iconcontrol.createComponent();
            this._iconcontrol = iconcontrol;
        }
        iconcontrol.set_icon(this.checkimage);
    };
 */
    _pPopupMenuItemControl._setText = function (v)
    {
        if (v != this.text)
        {
            this.text = v;
            this._on_apply_text(v);
        }
    };

    _pPopupMenuItemControl.on_apply_text = function (v)
    {
        if (this._textcontrol)
        {
            this._textcontrol.set_text(v);
        }
    };

    _pPopupMenuItemControl._setHotkey = function (v)
    {
        if (v != this._hotkey_string)
        {
            this._hotkey_string = v;
            this.on_apply_hotkeytext();
        }
    };

    _pPopupMenuItemControl.on_apply_hotkeytext = function ()
    {
        var hotkey = this._hotkeytextcontrol;
        if (hotkey)
        {
            hotkey.set_text(this._hotkey_string);
        }
    };

    _pPopupMenuItemControl._setUserdata = function (v)
    {
        if (v != this.userdata)
        {
            this.userdata = v;
        }
    };

    _pPopupMenuItemControl.on_apply_mouseover = function (isovered)
    {
        if (this.selected) return;

        if (isovered)
        {
            this._changeStatus("mouseover", true);
        }
        else
        {
            this._changeStatus("mouseover", false);
        }
    };

    // ===============================================================================
    // nexacro.PopupMenuItem : Method
    // ===============================================================================

    _pPopupMenuItemControl._isChecked = function ()
    {
        var v = this.value;
        if (!!v || v.toString().toLowerCase() == "true")
            return true;

        return false;
    };

    _pPopupMenuItemControl._load_image = function (val)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            if (val)
            {
                //val = nexacro._getURIValue(val);
                //val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
                //var url = nexacro.UrlObject(val);
                // load image
                var expiconcontrol = this._expiconcontrol;
                if (!expiconcontrol)
                {
                    expiconcontrol = new nexacro._IconText("popupmenuitemexpandimage", "absolute", 0, 0, 0, 0, null, null, this);
                    expiconcontrol._setControl("popupmenuitemexpandimage");
                    expiconcontrol.createComponent();
                    this._expiconcontrol = expiconcontrol;
                }
                else
                {
                    expiconcontrol.set_text("");
                }
                expiconcontrol.set_icon(val);
            }
        }
    };

    _pPopupMenuItemControl._getItemControlPosition = function ()
    {
        return this.parent._itempos;
    };

    _pPopupMenuItemControl._updateControlPosition = function ()//(icon_pos,icon_width, textpos_x, textwidth, hottextpos_x, hotkeywidth, itemheight, gap) //  txtwidth, hotkeywidth, itemheight, hotkey_gap, icontextpadding, padding_l, )
    {
        if (!this._is_created_contents) return;
        var textcontrol = this._textcontrol;
        if (textcontrol)
        {
            var positionobj = this._getItemControlPosition();
            var icon_x = positionobj.icon_x;
            var icon_width = positionobj.iconimgwidth;
            var icon_height = positionobj.iconheight;
            var text_x = positionobj.text_x;
            var textwidth = positionobj.textwidth;
            var textheight = positionobj.textheight;
            var hotkey_x = positionobj.hotkey_x;
            var hotkeywidth = positionobj.hotkeywidth;
            var hotkeyheight = positionobj.hotkeyheight;
            var gap = positionobj.gap;
            var client_height = this._getClientHeight();
            var chkwidth = positionobj.chkimgwidth;
            var expwidth = positionobj.expimgwidth;
            var expiconcontrol = this._expiconcontrol;
            var hotkeytextcontrol = this._hotkeytextcontrol;
            var iconcontrol = this._iconcontrol;

            if (iconcontrol)
            {
                iconcontrol.move(icon_x, 0, icon_width, icon_height);
            }

            if (this._canExpand && expiconcontrol)
            {
                var expimg_x = hotkeywidth && this.level > 0 ? hotkey_x + hotkeywidth + gap : hotkey_x;
                var exptop = expheight ? ((client_height - expheight) / 2) : 0;
                var expwidth = expwidth ? expwidth : 10;
                var expheight = expheight ? expheight : this.height;
                expiconcontrol.move(expimg_x, exptop, expwidth, expheight);
                if (hotkeytextcontrol)
                    hotkeytextcontrol.set_visible(false);
            }
            else if (hotkeytextcontrol)
            {
                if (hotkeytextcontrol.text == "")
                    hotkeytextcontrol.set_visible(false);
                else
                {
                    hotkeytextcontrol.set_visible(true);
                    hotkeytextcontrol.move(hotkey_x, 0, hotkeywidth, hotkeyheight);
                }
            }
            textcontrol.move(text_x , 0, textwidth, textheight);

        }
    };

    _pPopupMenuItemControl._getWidth = function ()
    {
        var width = this.chkwidth;
        if (this.textwidth > 0)
        {
            width += (this.textwidth + this.gap);
        }

        if (this.hotkeywidth > 0 && this.expwidth > 0)
        {
            var maxWidth = Math.max(this.hotkeywidth, this.expwidth);
            width += (maxWidth + this.gap);
        }
        else
        {
            if (this.hotkeywidth > 0)
            {
                width += (this.hotkeywidth + this.gap);
            }

            width += this.expwidth;
        }
        return width;
    };

    _pPopupMenuItemControl._updateAccessibilityLabel = function (item)
    {
        var rootComp = this._getRootComponent(this);
        var dataLen = rootComp._innerdataset.getRowCount();
        item._setAccessibilityInfoIndex(item.datarow + 1);
        item._setAccessibilityInfoCount(dataLen);
        item._setAccessibilityFlagHasPopup(item._canExpand ? true : false);
    };

    delete _pPopupMenuItemControl;
}

//==============================================================================
// nexacro.PopupMenu_Style 
//==============================================================================

//==============================================================================
//nexacro.PopupMenu
//==============================================================================
if (!nexacro.PopupMenu)
{
    // ===============================================================================
    // nexacro.MenuCloseUpEventInfo
    // ===============================================================================
    nexacro.MenuCloseUpEventInfo = function (obj, id, isselect)
    {
        this.id = this.eventid = id || "oncloseup";
        this.fromobject = obj; // fromobject 분리 필요
        this.fromreferenceobject = obj;
        this.isselect = isselect;
    };
    var _pMenuCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuCloseUpEventInfo);
    nexacro.MenuCloseUpEventInfo.prototype = _pMenuCloseUpEventInfo;
    _pMenuCloseUpEventInfo._type_name = "MenuCloseUpEventInfo";

    delete _pMenuCloseUpEventInfo;

    //==============================================================================
    // nexacro.MenuClickEventInfo
    //==============================================================================
    nexacro.MenuClickEventInfo = function (obj, id, itemid, itemuserdata, index, level)
    {
        this.eventid = id || "onmenuclick";
        this.id = itemid;
        this.fromobject = this.fromreferenceobject = obj;
        this.index = index;
        this.level = level;

        this.userdata = itemuserdata;
    };

    var _pMenuClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuClickEventInfo);
    nexacro.MenuClickEventInfo.prototype = _pMenuClickEventInfo;
    _pMenuClickEventInfo._type_name = "MenuClickEventInfo";

    delete _pMenuClickEventInfo;

    nexacro.PopupMenu = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.PopupControl.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._hot_key_list = [];
        this._items = [];
        this._attached_comp = this;
        this._lineItems = [];
    };

    var _pPopupMenu = nexacro._createPrototype(nexacro.PopupControl, nexacro.PopupMenu);
    nexacro.PopupMenu.prototype = _pPopupMenu;

    // overide nexacro.Object
    _pPopupMenu._type_name = "PopupMenu";

    _pPopupMenu.datarow = 0;
    _pPopupMenu.level = 0;
    _pPopupMenu.beforeindex = -1;
    _pPopupMenu.buttonsize = undefined;
    _pPopupMenu._items_total_height = 0;
    _pPopupMenu._start_spin_index = 0;
    _pPopupMenu._end_spin_index = 0;
    _pPopupMenu._is_spin_visible = false;
    _pPopupMenu._itemheight = 0;

    /* accessibility variable */
    _pPopupMenu._accessibility_role = "menu";
    _pPopupMenu._want_arrow = true;

    _pPopupMenu._popupmenu = null;
    _pPopupMenu._is_subcontrol = false;

    _pPopupMenu._previtemindex = 0;
    _pPopupMenu._popupitemindex = -1;
    _pPopupMenu._popupitempreviousindex = -1;
    _pPopupMenu._closeflag = true;
    _pPopupMenu._is_trackpopup = false;
    _pPopupMenu._want_tab = true;
    _pPopupMenu._hotkeytextgap = 20; // this gap is a gap between text and hotkeytext.
    _pPopupMenu._icontextpadding = 5; // this padding is a gap between icon(checkimage) and text .

    _pPopupMenu._selected_itemindex = -1;  // for MenuCloseEventInfo.isselect (which mouse click or enter key)

    _pPopupMenu.innerdataset = "";
    _pPopupMenu._innerdataset = "";

    _pPopupMenu.itemheight = undefined;
    _pPopupMenu.autohotkey = false;
    _pPopupMenu.captioncolumn = "";
    _pPopupMenu.checkboxcolumn = "";
    _pPopupMenu.enablecolumn = "";
    _pPopupMenu.hotkeycolumn = "";
    _pPopupMenu.iconcolumn = "";
    _pPopupMenu.idcolumn = "";
    _pPopupMenu.levelcolumn = "";
    _pPopupMenu.userdatacolumn = "";
    _pPopupMenu._last_mouseleave_iteminfo = { bindindex: -1, index: -1, level: -1 };

    _pPopupMenu._iconImage_width = 0;
    _pPopupMenu._iconImage_height = 0;
    _pPopupMenu._is_updatedimages = false;

    _pPopupMenu._event_list =
        {
            "onclick": 1, "ondblclick": 1, "onkeypress": 1, "onkeydown": 1, "onkeyup": 1, "onkillfocus": 1, "onsetfocus": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1, "onlbuttondown": 1, "onlbuttonup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmenuclick": 1,
            "onpopup": 1, "onmousedown": 1, "onmouseup": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,           
            // popupmenu's events
            "oncloseup": 1
        };

    // ===============================================================================
    // nexacro.PopupMenu : Style Part
    // ===============================================================================

    // ===============================================================================
    // nexacro.PopupMenu : Create & Destroy & Update
    // ===============================================================================

    _pPopupMenu.on_create_contents = function ()
    {
        return;
        /*
        //var control_elem = this.getElement();
        
        //if (!this._is_subcontrol)
        {
            //var currentstatus = this._status;
            
            var checkboximage = this.checkboximage;
            if (checkboximage)
            {
                this._load_image(checkboximage, "chk"); // 0 is check_img flg
            }
            //else if (this._icon)
            //    this._load_image(this._icon, "icon");
            
            var expandimage = this.expandimage;
            if (expandimage)
            {
                this._load_image(expandimage, "exp"); // 1 is exp_img flg
            }
        }            
        */
    };

    _pPopupMenu.on_created_contents = function (win)
    {
        nexacro.PopupControl.prototype.on_created_contents.call(this, win);

        var control_elem = this.getElement();
        if (control_elem)
        {
            //  When set_url() before addChild() should handle error.Associated1-1 
            if (!this._innerdataset && this.innerdataset)
            {
                this._innerdataset = this._findDataset(this.innerdataset);
                this.on_apply_innerdataset();
            }
            this._createPopupMenu();
            
            var items = this._lineItems;
            if (items)
            {
                var len = items.length;
                for (var i = 0 ; i < len ; i++)
                {
                    items[i].on_created();
                }
            }            

            if (nexacro._enableaccessibility)
            {
                this._setAccessibilityInfoLevel(this.level);
            }
        }
    };


    _pPopupMenu.on_create_contents_command = function ()
    {
        return "";
    };

    _pPopupMenu.on_attach_contents_handle = _pPopupMenu.on_created;
    //     _pPopupMenu.on_attach_contents_handle = function (win)
    //     {
    //         
    //     };

    _pPopupMenu.on_destroy_contents = function ()
    {
        var items = this._items;
        var len = items.length;
        for (var i = 0; i < len; i++)
        {
            items[i].destroyComponent();
            items[i] = null;
        }
        this._items = [];

        if (this._popupmenu)
        {
            this._popupmenu.destroy();
            this._popupmenu = null;
        }

        if (this._itempos)
        {
            this._itempos = null;
        }
        var hotkey_list = this._hot_key_list;
        if (hotkey_list)
        {
            for (var i = hotkey_list.length - 1; i > -1; i--)
            {
                var item = hotkey_list[i];
                this._unregisterItemHotkey(item.key);
                item = null;
            }
        }

        var spinupbutton = this.spinupbutton;
        var spindownbutton = this.spindownbutton;
        if (spinupbutton)
        {
            spinupbutton.destroy();
            spinupbutton = null;
        }
        if (spindownbutton)
        {
            spindownbutton.destroy();
            spindownbutton = null;
        }

        hotkey_list = null;
        
    };

    // ===============================================================================
    // nexacro.PopupMenuItem : Property
    // ===============================================================================    

    _pPopupMenu.set_autohotkey = function (v)
    {
        var val = nexacro._toBoolean(v);
        if (val != this.autohotkey)
        {
            this.autohotkey = val;
            this.on_apply_autohotkey(val);
        }
    };

    _pPopupMenu.on_apply_autohotkey = function(val)
    {
        if (val == true)
        {
            //register hotkey

        }
        else
        {
            //unregister hotkey
            var hotkey_list = this._hot_key_list;
            if (hotkey_list)
            {
                for (var i = hotkey_list.length - 1; i > -1; i--)
                {
                    var item = hotkey_list[i];
                    this._unregisterItemHotkey(item.key);
                    item = null;
                }
            }
            hotkey_list = null;
        }
    };

    _pPopupMenu.set_visible = function (v)
    {
        if (this._is_trackpopup)
        {
            nexacro.PopupControl.prototype.set_visible.apply(this, arguments);
        }
    };

    _pPopupMenu.set_itemheight = function(v)
    {
        var val = parseInt(v);
        var itemheight = this.itemheight;

        if (val != itemheight)
        {
            this.itemheight = val;
            this.on_apply_itemheight();
        }
    };

    _pPopupMenu.on_apply_itemheight = function ()
    {
        this._reCalcSize();
    };

    _pPopupMenu.set_popuptype = function (v)
    {
        var val = nexacro._toString(v);
        var popuptype = this.popuptype;

        if (val != popuptype)
        {
            this.popuptype = val;
            this.on_apply_popuptype();
        }
    };

    _pPopupMenu._getPopupType = function ()
    {
        var rootComp = this._getRootComponent(this);
        var popuptype = rootComp.popuptype;        
        return popuptype ? popuptype : "normal";
    };


    _pPopupMenu.on_apply_popuptype = function ()
    {

    };
    /*
    _pPopupMenu.set_checkboximage = function (v)
    {
        var val = nexacro._toString(v);
        var checkboximage = this.checkboximage;

        if (val != checkboximage)
        {
            this.checkboximage = val;
            this.on_apply_checkboximage(val);
        }
    };
     */

    _pPopupMenu.on_apply_checkboximage = function (v)
    {
        if (v)
        {
            this._load_image(v, "chk");
            if (this._is_created_contents)
                this._is_updatedimages = false;
        }
    };
    /*
    _pPopupMenu.set_expandimage = function (v)
    {
        var val = nexacro._toString(v);
        var expandimage = this.expandimage;

        if (val != expandimage)
        {
            this.expandimage = val;
            this.on_apply_expandimage(v);
        }
    };
    */

    _pPopupMenu.on_apply_expandimage = function (v)
    {
        if (v)
        {
            this._load_image(v, "exp");
            if (this._is_created_contents)
                this._is_updatedimages = false;
        }
    };

    _pPopupMenu.set_captioncolumn = function (v)
    {
        if (v != this.captioncolumn)
        {
            this.captioncolumn = v;
            var popupmenu = this._popupmenu;
            if (popupmenu)
            {
                popupmenu.set_captioncolumn(v);
            }

            this.on_apply_captioncolumn();
        }
    };

    _pPopupMenu.on_apply_captioncolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i].set_text(ds.getColumn(items[i].datarow, this.captioncolumn) || "");
                }
            }
        }
    };

    _pPopupMenu.set_checkboxcolumn = function (v)
    {
        if (v != this.checkboxcolumn)
        {
            this.checkboxcolumn = v;
            var popupmenu = this._popupmenu;
            if (popupmenu)
            {
                popupmenu.set_checkboxcolumn(v);
            }

            this.on_apply_checkboxcolumn();
        }
    };

    _pPopupMenu.on_apply_checkboxcolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i]._setValue(ds.getColumn(items[i].datarow, this.checkboxcolumn) || false);
                }
            }
        }
    };

    _pPopupMenu.set_enablecolumn = function (v)
    {
        if (v != this.enablecolumn)
        {
            this.enablecolumn = v;
            var popupmenu = this._popupmenu;
            if (popupmenu)
            {
                popupmenu.set_enablecolumn(v);
            }

            this.on_apply_enablecolumn();
        }
    };

    _pPopupMenu.on_apply_enablecolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i].set_enable(ds.getColumn(items[i].datarow, this.enablecolumn) || true);
                }
            }
        }
    };

    _pPopupMenu.set_hotkeycolumn = function (v)
    {
        if (v != this.hotkeycolumn)
        {
            this.hotkeycolumn = v;
            var popupmenu = this._popupmenu;
            if (popupmenu)
            {
                popupmenu.set_hotkeycolumn(v);
            }

            this.on_apply_hotkeycolumn();
        }
    };

    _pPopupMenu.on_apply_hotkeycolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i]._setHotkey(ds.getColumn(items[i].datarow, this.hotkeycolumn) || "");
                }
            }
        }
    };

    _pPopupMenu.set_iconcolumn = function (v)
    {
        if (v != this.iconcolumn)
        {
            this.iconcolumn = v;
            if (this._popupmenu)
            {
                this._popupmenu.set_iconcolumn(v);
            }
            this.on_apply_iconcolumn();
        }
    };

    _pPopupMenu.on_apply_iconcolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();
            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i]._setIcon(ds.getColumn(items[i].datarow, this.iconcolumn) || "");
                }
            }
        }
    };

    _pPopupMenu.set_idcolumn = function (v)
    {
        if (v != this.idcolumn)
        {
            this.idcolumn = v;
            if (this._popupmenu)
            {
                this._popupmenu.set_idcolumn(v);
            }
            this.on_apply_idcolumn();
        }
    };

    _pPopupMenu.on_apply_idcolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();
            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i].id = ds.getColumn(items[i].datarow, this.idcolumn) || "";
                }
            }
        }
    };

    _pPopupMenu.set_levelcolumn = function (v)
    {
        if (v != this.levelcolumn)
        {
            this.levelcolumn = v;
            this.on_apply_levelcolumn();
        }
    };

    _pPopupMenu.on_apply_levelcolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i].level = ds.getColumn(items[i].datarow, this.levelcolumn) || -1;
                }
            }
        }
    };

    _pPopupMenu.set_userdatacolumn = function (v)
    {
        if (v != this.userdatacolumn)
        {
            this.userdatacolumn = v;
            var popupmenu = this._popupmenu;
            if (popupmenu)
            {
                popupmenu.set_userdatacolumn(v);
            }

            this.on_apply_userdatacolumn();
        }
    };

    _pPopupMenu.on_apply_userdatacolumn = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            this._createPopupMenu();

            var items = this._items;
            if (items)
            {
                var len = items.length;
                for (var i = 0; i < len; i++)
                {
                    items[i].userdata = ds.getColumn(items[i].datarow, this.userdatacolumn) || null;
                }
            }
        }
    };

    _pPopupMenu.setInnerDataset = function (obj)
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

    _pPopupMenu._setInnerDatasetStr = function (str)
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

    _pPopupMenu.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pPopupMenu.set_innerdataset = function (str)
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
    };

    _pPopupMenu.on_apply_innerdataset = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            var callback = this._callbackFromDataset;
            ds._setEventHandler("onrowposchanged", callback, this);
            ds._setEventHandler("oncolumnchanged", callback, this);
            ds._setEventHandler("onrowsetchanged", callback, this);
        }
        this._createPopupMenu();
        this.beforeindex = -1;
        this.beforevalue = "";
        this.beforeText = "";
    };

    _pPopupMenu.on_getIDCSSSelector = function ()
    {
        return "";
    };

    _pPopupMenu._getEventInfoComponent = function (refer_comp)
    {
        /*
        while (!refer_comp._is_subcontrol || !(refer_comp instanceof nexacro._MenuItemControl) || !(refer_comp instanceof nexacro._PopupMenuItemControl))
        {
            refer_comp = refer_comp.parent;
        }*/
        while (!refer_comp._is_eventinfo_control)
        {
            refer_comp = refer_comp.parent;
        }
        return refer_comp;
    };

    // ===============================================================================
    // nexacro.PopupMenu : Event Handler
    // ===============================================================================    
    _pPopupMenu.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttondown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onlbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(button, "onlbuttonup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onlbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmousedown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmousedown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseup", from_refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseenter && this.onmouseenter._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseenter", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmouseenter._fireUserEvent(this, evt);
        }
    };

    _pPopupMenu.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseleave && this.onmouseleave._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var iteminfo = this._last_mouseleave_iteminfo;
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseleave", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, iteminfo.level, iteminfo.index, iteminfo.bindindex);
            return this.onmouseleave._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousemove && this.onmousemove._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmousemove", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmousemove._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp)
    {
        if (this.ondrag && this.ondrag._has_handlers)
        {
            var dragData = this._getDragData();
            var evtinfo_control = this._getEventInfoComponent(self_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondrag", refer_comp.id, dragData, null, this, self_refer_comp, from_comp, refer_comp,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
        }
        return [false];
    };

    _pPopupMenu.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata,
                                    button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondrop && this.ondrop._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondrop", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondrop._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata,
                                        button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragenter && this.ondragenter._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragenter", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondragenter._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata,
                                        button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragleave && this.ondragleave._has_handlers)
        {
            var iteminfo = this._last_mouseleave_iteminfo;
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragleave", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
                                button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, iteminfo.level, iteminfo.index, iteminfo.bindindex);

            return this.ondragleave._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata,
                                        button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragmove && this.ondragmove._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragmove", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
                                            button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.parent.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondragmove._fireUserEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var pThis = this._popupmenu_find(this);
        var item = this._item_find(pThis);
        var popupvisible = this._is_popupmenu_visible(this);

        var item_len = item.length - 1;
        var pitemindex, nitemindex = this._popupitemindex;
        var popuptype = this._getPopupType();

        var rootComp = this._getRootComponent(this);
        var E = nexacro.Event;

        switch (keycode)
        {
            case E.KEY_TAB:

                if (!popupvisible)
                {
                    if (!shift_key && this._popupitemindex == item_len || shift_key && this._popupitemindex < 0)
                    {
                        this._want_tab = false;
                        this._closePopup();
                    }
                    else
                    {
                        pThis._item_killfocus(item[pThis._popupitemindex]);
                        if (shift_key == false)
                            this._popupitemindex++;
                        else
                            this._popupitemindex--;

                        if (item[this._popupitemindex])
                        {
                            rootComp._menuitemonmouseenter = item[this._popupitemindex];
                            this._item_focus(item[this._popupitemindex], true);
                        }
                        else
                        {
                            this._do_defocus(this._last_focused, true);
                            this._on_focus(true);
                        }
                    }
                    this.parent._getWindow()._keydown_element._event_stop = true;
                    break;
                }
                else
                {
                    if (!shift_key && pThis._popupitemindex == item_len || shift_key && pThis._popupitemindex == 0)
                    {
                        pThis._item_killfocus(item[pThis._popupitemindex]);
                        pThis._closePopup();
                        var pThis = this._popupmenu_find(this);
                        var item = this._item_find(pThis);
                        pThis._item_focus(item[pThis._previtemindex], true);
                        pThis._popupitemindex = pThis._previtemindex;
                    }
                    else
                    {
                        pThis._item_killfocus(item[pThis._popupitemindex]);
                        if (shift_key)
                            pThis._popupitemindex--;
                        else
                            pThis._popupitemindex++;

                        rootComp._menuitemonmouseenter = item[pThis._popupitemindex];
                        pThis._item_focus(item[pThis._popupitemindex], true);
                    }

                    this.parent._getWindow()._keydown_element._event_stop = true;
                    break;
                }
            default:
                break;
        }

        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

    };

    _pPopupMenu.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var pThis = this._popupmenu_find(this);
        var item = this._item_find(pThis);
        var popupvisible = this._is_popupmenu_visible(this);
        var item_len = item.length - 1;
        var pitemindex, nitemindex = this._popupitemindex;
        var popuptype = this._getPopupType();

        var rootComp = this._getRootComponent(this);
        var E = nexacro.Event;

        if (nexacro._enableaccessibility)  // Accessibility
        { //need to check
            switch (keycode)
            {
                case E.KEY_UP:
                    this._popupitemindex = rootComp._popupitemindex;
                    this._item_killfocus(item[this._popupitemindex]);
                    this._popupitemindex--;

                    if (this._popupitemindex < 0)
                        this._popupitemindex = item_len;

                    rootComp._menuitemonmouseenter = item[this._popupitemindex];
                    pThis._previousitem = this._popupitemindex;
                    pThis._item_focus(item[this._popupitemindex], true);
                    break;

                case E.KEY_DOWN:
                    this._popupitemindex = rootComp._popupitemindex;
                    this._item_killfocus(item[this._popupitemindex]);
                    this._popupitemindex++;

                    if (this._popupitemindex > item_len)
                        this._popupitemindex = 0;

                    rootComp._menuitemonmouseenter = item[this._popupitemindex];
                    pThis._previtemindex = this._popupitemindex;
                    pThis._item_focus(item[this._popupitemindex], true);
                    break;

                case E.KEY_LEFT:
                    if ((pThis.parent instanceof nexacro.PopupMenu) == false)
                    {
                        break;
                    }
                    else
                    {
                        pThis._closePopup();
                        this._popupitemindex = pThis.parent._previtemindex;
                        var item = this._item_find(pThis.parent);

                        rootComp._menuitemonmouseenter = item[this._popupitemindex];
                        item[this._popupitemindex].parent._item_focus(item[this._popupitemindex], true);
                        item[this._popupitemindex].parent._popupitemindex = this._popupitemindex;
                    }
                    break;

                case E.KEY_RIGHT:
                    if (popuptype == "none" || this._popupitemindex == -1)
                    {
                        break;
                    }

                    this._popupitemindex = rootComp._popupitemindex;
                    var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);

                    if (popupexpand == false)
                    {
                        pThis.on_notify_menuitem_onmouseenter(item[this._popupitemindex]);

                        this._item_killfocus(item[this._popupitemindex]);

                        pThis._previtemindex = this._popupitemindex;
                        this._popupitemindex = 0;

                        var rThis = this._popupmenu_find(this);
                        var item = this._item_find(pThis);

                        rootComp._menuitemonmouseenter = item[this._popupitemindex];
                        rThis._item_focus(item[this._popupitemindex], true);
                        rThis._popupitemindex = this._popupitemindex;
                    }
                    break;

                case E.KEY_ENTER:
                    if (popuptype == "none")
                    {
                        break;
                    }

                    var rThis = rootComp._menuitemonmouseenter.parent;

                    if (pThis instanceof nexacro.Menu)
                    {
                        pThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);
                    }
                    else
                    {
                        var popupexpand = this._popupmenuitem_extend(rootComp._menuitemonmouseenter);
                        if (!popupexpand)
                        {
                            this._item_killfocus(rootComp._menuitemonmouseenter);
                        }
                        rThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);
                    }
                    break;

                default:
                    break;
            }
        }
        else
        {       // none Accessibility
            switch (keycode)
            {
                case E.KEY_UP:
                    if (pThis._popupitemindex > -1)
                    {
                        if (popupvisible)
                        {
                            var popupmenu = this._popupmenu;
                            if (popupmenu)
                                popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                        }
                        else
                        {
                            var prev_popupitemindex = this._popupitemindex;
                            var popupitemindex = this._getItemIndex(-1);
                            this._select_menuitem(popupitemindex, prev_popupitemindex);
                        }
                    }
                    else
                    {
                        this._select_menuitem(0);
                    }
                    break;
                case E.KEY_DOWN:
                    if (popupvisible)
                    {
                        var popupmenu = this._popupmenu;
                        if (popupmenu)
                            popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                    }
                    else
                    {
                        var prev_popupitemindex = this._popupitemindex;
                        var popupitemindex = this._getItemIndex(1);
                        this._select_menuitem(popupitemindex, prev_popupitemindex);
                        //this._popupitemindex = popupitemindex;
                    }
                    break;
                case E.KEY_LEFT:
                    if (popuptype == "none")// || this._popupitemindex == -1)
                    {
                        break;
                    }

                    if (pThis._popupitemindex > -1)
                    {
                        if (popupvisible)
                        {
                            var popupmenu = this._popupmenu;
                            if (popupmenu)
                            {
                                popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                            }
                        }
                        else
                        {
                            var parent = this.parent;
                            if (parent instanceof nexacro.PopupMenu)
                            {
                                parent._select_menuitem(parent._getItemIndex());//, parent._getItemIndex(), true);//, 0, true);
                                this._closePopup();
                            }
                            else
                                rootComp._select_menuitem(rootComp._getItemIndex(-1), rootComp._getItemIndex(), true);//, 0, true);
                        }
                    }
                    else
                    {
                        rootComp._select_menuitem(rootComp._getItemIndex(-1), rootComp._getItemIndex(), true);
                    }

                    break;

                case E.KEY_RIGHT:
                    if (popuptype == "none")// || this._popupitemindex == -1)
                    {
                        break;
                    }

                    if (pThis._popupitemindex > -1)
                    {
                        var popupexpand = pThis._popupmenuitem_extend(item[pThis._popupitemindex]);
                        if (popupexpand)
                        {
                            pThis._showPopup(item[pThis._popupitemindex]);
                            var popupmenu = this._popupmenu;
                            if (popupmenu)
                            {
                                pThis.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                            }
                            else
                            {
                                rootComp._select_menuitem(rootComp._getItemIndex(1), 0, true);
                            }
                        }
                        else
                        {
                            if (popupvisible)
                            {
                                var popupmenu = this._popupmenu;
                                if (popupmenu)
                                {
                                    popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                                }
                            }
                            else if (rootComp instanceof nexacro.PopupMenu && !rootComp._is_subcontrol) //need to check
                            {
                                var popupmenu = rootComp._popupmenu;
                                popupmenu._closeAllPopup();
                                var rootitems = rootComp._items;
                                var next_index = rootComp._getItemIndex(1);
                                rootComp._select_menuitem(next_index, rootComp._getItemIndex(), true);
                                rootComp._showPopup(rootitems[next_index]);
                                var popupmenu = rootComp._popupmenu;
                                if (popupmenu)
                                {
                                    popupmenu._select_menuitem(0);
                                }
                            }
                            else
                            {
                                rootComp._select_menuitem(rootComp._getItemIndex(1), rootComp._getItemIndex(), true);//, 0, true);
                            }

                        }
                    }
                    else
                    {
                        pThis._select_menuitem(0);
                    }
                    break;

                case E.KEY_ENTER:
                    if (popuptype == "none")
                    {
                        break;
                    }
                    if (pThis._popupitemindex > -1)
                    {
                        var popupexpand = pThis._popupmenuitem_extend(item[pThis._popupitemindex]);
                        if (popupexpand)
                        {
                            pThis._showPopup(item[pThis._popupitemindex]);
                            var popupmenu = this._popupmenu;
                            if (popupmenu)
                            {
                                popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                            }
                        }
                        else
                        {
                            var item = pThis._items[pThis._popupitemindex];
                            pThis.on_notify_menuitem_onlbuttondown(item);
                            rootComp._select_menuitem(rootComp._getItemIndex());
                            rootComp._closePopup(true);
                        }
                    }
                    else
                    {
                        //Todo..
                        pThis._select_menuitem(0);
                        //pThis._select_menuitem(0);
                    }
                    break;

                default:
                    break;
            }
        }

        return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };

    _pPopupMenu._select_menuitem = function (nextitemindex, previtemindex, popupvisible)
    {
        var items = this._items;
        var prev_item = items[previtemindex];
        this._popupitemindex = nextitemindex;
        var next_item = items[nextitemindex];
        if (next_item)
        {
            next_item._changeUserStatus("selected", true);
            this._menuitemonmouseenter = next_item;
        }
        if (prev_item && nextitemindex != previtemindex)
            prev_item._changeUserStatus("selected", false);
    };

    _pPopupMenu._getItemIndex = function (inc)
    {
        //0 just index
        //1 increaed index
        //2 decreased index
        if (inc === undefined)
            inc = 0;
        var popupitemindex = this._popupitemindex + inc;
        var popupitem_len = this._items ? this._items.length - 1 : 0;
        if (popupitemindex > popupitem_len)
            popupitemindex = 0;
        else if (popupitemindex < 0)
            popupitemindex = popupitem_len;
        return popupitemindex;
    };

    _pPopupMenu._do_defocus = function (target, bParent)
    {
        var _window = this._getWindow();
        _window._removeFromCurrentFocusPath(target, true);
        if (bParent)
            _window._removeFromCurrentFocusPath(this, false);
    };


    _pPopupMenu.on_notify_menuitem_onclick = function (obj, e)
    {
        var popuptype = this._getPopupType();//this.style.popuptype.value;
        this._previtemindex = obj.index;

        if (obj.enable == false || !popuptype || popuptype == "none")
            return;

        if (obj._canExpand === false)
        {
            if (this.parent && this.parent.enable == true)
            {
                if (this.parent instanceof nexacro.Menu)
                {
                    if (this.parent.onmenuclick && this.parent.onmenuclick._has_handlers)
                    {
                        this.parent.on_notify_menuitem_onclick(obj, e);
                    }
                }
                else if (!(this.parent instanceof nexacro.PopupMenu))
                {
                    if (this.onmenuclick && this.onmenuclick._has_handlers)
                    {
                        var rootComp = this._getRootComponent(obj);
                        this.on_fire_onitemclick(rootComp, "onmenuclick", obj.id, obj.userdata, obj.index, obj.parent.level);
                        //this._popupitemindex = -1;
                    }
                }
                else
                {
                    this.parent.on_notify_menuitem_onclick(obj, e);
                }
                this._closeAllPopup();
            }
        }
    };

    _pPopupMenu.on_notify_onmouseenter = function (obj, e)
    {
        var pobj = this._getRootComponent(obj);
        var previousitem = pobj._menuitemonmouseenter;
        if (previousitem)
        {
            var previousparent = previousitem.parent;
            if (previousparent && previousparent.level < this.level)
                previousitem._changeUserStatus("selected", true);
        }
    };


    _pPopupMenu.on_notify_menuitem_onmouseenter = function (obj, e)
    {
        var popupmenu = this._popupmenu;
        var pobj = this._getRootComponent(obj);
        var previousitem = pobj._menuitemonmouseenter;
        pobj._popupitemindex = obj.index;
        pobj._menuitemonmouseenter = obj;
        if (popupmenu && popupmenu._is_popup())
        {
            if (this.beforeindex != obj.index)
            {
                popupmenu.cancelPopup();
                //this._closeflag = true;
                this._showPopup(obj);
            }
        }
        else
        {
            var popuptype = this._getPopupType(); //this.style.popuptype.value;
            if (popuptype && popuptype != "none")
            {
                //this._closeflag = true;                
                this._showPopup(obj);
            }
        }

        //set userstatus selected
        if (previousitem)
        {
            //꼭 여기서 처리해야되는지 검토 필요..
            previousitem._changeUserStatus("selected", false);
            var curparent = obj.parent;
            var preparent = previousitem.parent;
            if (this.beforeindex > -1)
            {
                var before_item = this._items[this.beforeindex];
                if (before_item)
                    before_item._changeUserStatus("selected", false);
            }
            if (curparent && curparent != preparent)
            {
                if (preparent && curparent.level > preparent.level)
                    previousitem._changeUserStatus("selected", true);
            }
        }

        this.beforeindex = this._popupitemindex = obj.index;

        if (!nexacro._enableaccessibility)
        {
            var item = this._items;
            var pitem = this.parent._items;

            item[obj.index].on_apply_mouseover(true);

            if (this._popupitempreviousindex == -1 || this._popupitemindex == -1)
            {
                this._popupitempreviousindex = 0;
                this._popupitemindex = 0;
            }

            if (item.length <= this._popupitemindex)
            {
                this._popupitemindex = item.length - 1;
                this._popupitempreviousindex = this._popupitemindex;
            }
            /*
            if (item[this._popupitemindex])
                item[this._popupitemindex].on_apply_mouseover(true);
           */
            if (item[this._previtemindex])
                item[this._previtemindex].on_apply_mouseover(false);

            /*
            if (pitem && pitem[this.parent._previtemindex])
            {
               // pitem[this.parent._previtemindex]._changeUserStatus("selected", true);
                //pitem[this.parent._previtemindex].on_apply_mouseover(true);
            }
            */
            if (popupmenu && popupmenu._is_popup() == true)
            {
                this._popupitemindex = -1;
            }
            else
            {
                this._popupitemindex = obj.index;
            }

            this._previtemindex = obj.index;
        }

    };

    _pPopupMenu.on_notify_menuitem_onmouseleave = function (obj, e)
    {
        var rootCom = this._getRootComponent(this);
        rootCom._last_mouseleave_iteminfo.index = obj.index;
        rootCom._last_mouseleave_iteminfo.bindindex = obj._bindindex;
        rootCom._last_mouseleave_iteminfo.level = obj.parent.level;
    };

    _pPopupMenu.on_notify_menuitem_onlbuttondown = function (obj, e)
    {
        var popupmenu = this._popupmenu;
        this._menuitemonmouseenter = obj;
        this._previtemindex = obj.index;
        if (popupmenu)
        {
            if (popupmenu._is_popup())
            {
                if (this.beforeindex != obj.index)
                {
                    this.beforeindex = obj.index;
                }
                popupmenu.cancelPopup();
                //this._menuitemindex = obj.index;
                //this._popupitemindex = -1;
            }
        }

        if (obj._canExpand)
        {
            //this._closeflag = true;
            this._showPopup(obj);

            if (this._getRootComponent(obj) instanceof nexacro.Menu)
            {
                this._getRootComponent(obj)._popupitemindex = obj.index;
            }
        }
    };

    _pPopupMenu.on_fire_onitemclick = function (obj, id, itemid, itemuserdata, index, level)
    {
        var rootComp = this._getRootComponent(obj);
        if (rootComp.onmenuclick && rootComp.onmenuclick._has_handlers)
        {
            //this._selected_itemindex = index;
            var evt = new nexacro.MenuClickEventInfo(obj, id, itemid, itemuserdata, index, level);
            rootComp.onmenuclick._fireEvent(rootComp, evt);
        }
    };


    // ===============================================================================
    // nexacro.PopupMenu : Method
    // ===============================================================================
    _pPopupMenu.cancelPopup = function ()
    {
        this._closePopup(true);
        /*
        if (nexacro._enableaccessibility == false)
        {
            var rootComp = this._getRootComponent(this);
            if (rootComp instanceof nexacro.Menu)
            {
                var items = rootComp._items;
                for (var i = 0; i < items.length; i++)
                {
                    items[i].on_apply_mouseover(false);
                }
            }
        }
        */
    };

    _pPopupMenu.isPopup = function ()
    {
        return this._is_popup();
    };

    _pPopupMenu.trackPopup = function (x, y, align, bcapture)
    {
        this._selected_itemindex = -1;
        this._track_capture = bcapture == undefined ? true : nexacro._toBoolean(bcapture);
        if (!this._is_updatedimages)
        {
            var items = this._items;
            var ds = this._innerdataset;
            if (items && ds)
            {
                var len = items.length;
                var level = +ds.getColumn(this.datarow + 1, this.levelcolumn);
                for (var i = 0; i < len; i++)
                {
                    var item = items[i];
                    //if (ds.getColumn(item.datarow, this.checkboxcolumn))
                    //    item._setCheckimage(this.checkboximage);
                    if (level > this.level)
                    {
                        //var expandimage = this.expandimage;
                        item._setExpandimage();
                    }
                }
            }
            this._is_updatedimages = true;
        }
        this._reCalcSize();
        this.on_created(); // TO DO : need - Only items must be created
        this._adjustPopupPosition(+x, +y, align);
        //this._closeflag = true;
        this.setFocus();
        /*
                var pThis = this._popupmenu_find(this);
                var item = this._item_find(pThis);
                pThis._item_focus(item[0],true);
                this._popupitemindex = 0;
                */
    };


    _pPopupMenu.trackPopupByComponent = function (obj, x, y, align, bcapture)
    {
        this._selected_itemindex = -1;
        this._track_capture = bcapture == undefined ? true : nexacro._toBoolean(bcapture);
        this._reCalcSize();
        this.on_created(); // TO DO : need - Only items must be created

        x = +x + obj._adjust_left;
        y = +y + obj._adjust_top;
        this._adjustPopupPosition(x, y, align, this._getForm()._getWindowPosition());
        //this._closeflag = true;
        this.setFocus();
    };

    _pPopupMenu.on_change_containerRect = function (width, height)
    {
        this._reCalcSize();
    };

    // ===============================================================================
    // nexacro.PopupMenu : Logical Part
    // ===============================================================================

    _pPopupMenu._isSpinVisible = function ()
    {
        //if (this._items_total_height > this._adjust_height)
        //    return true;
        return this._is_spin_visible;
    };

    _pPopupMenu._showSpinButton = function (spin_visible)
    {
        this._is_spin_visible = spin_visible;
        if (spin_visible)
        {
            if (!this.spinupbutton || !this.spindownbutton)
            {
                this._createSpinButton();
            }
            var spinupbutton = this.spinupbutton;
            var spindownbutton = this.spindownbutton;
            var buttonsize = this.buttonsize;
            var spindownbutton_height = 0;
            var spinupbutton_height = 0;

            if (!buttonsize)
            {
                var spinbutton_height = this._getSpinbuttonHeight(spindownbutton, spinupbutton);
                spindownbutton_height = spinbutton_height[0];
                spinupbutton_height = spinbutton_height[1];
            }
            else
            {
                spindownbutton_height = buttonsize;
                spinupbutton_height = buttonsize;
            }
            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();
            spinupbutton.set_visible(true);
            spinupbutton.move(0, 0, client_width, spinupbutton_height);
            spindownbutton.set_visible(true);
            spindownbutton.move(0, client_height - spindownbutton_height, client_width, spindownbutton_height);
        }
        else
        {
            var spinupbutton = this.spinupbutton;
            if (spinupbutton)
            {
                spinupbutton.set_visible(false);
                spinupbutton.move(0, 0, 0, 0);
            }

            var spindownbutton = this.spindownbutton;
            if (spindownbutton)
            {
                spindownbutton.set_visible(false);
                spindownbutton.move(0, 0, 0, 0);
            }
        }
    };

    _pPopupMenu._getSpinbuttonHeight = function (spindownbutton, spinupbutton)
    {
        var up_height = 0;
        var down_height = 0;

        var spindownicon = spindownbutton._getCSSStyleValue("icon", "enabled");
        if (spindownicon)
        {
            var img_size = nexacro._getImageSize(spindownicon.url, null, this);
            if (img_size)
            {
                down_height = img_size.height;
                var padding = spinupbutton._getCSSStyleValue("padding", this._status);
                var border = spinupbutton._getCSSStyleValue("border", this._status);
                if (padding)
                    down_height += padding.top + padding.bottom;
                if (border)
                {
                    if (border._single)
                    {
                        down_height += border.top._width + border.top._width;
                    }
                    else
                    {
                        down_height = border.top._width + border.bottom._width;
                    }
                }
            }
        }
        var spinupicon = spinupbutton._getCSSStyleValue("icon", "enabled");
        if (spinupicon)
        {
            var img_size = nexacro._getImageSize(spinupicon.url, null, this);
            if (img_size)
            {
                up_height = img_size.height;
                var padding = spinupbutton._getCSSStyleValue("padding", this._status);
                var border = spinupbutton._getCSSStyleValue("border", this._status);
                if (padding)
                    up_height += padding.top + padding.bottom;
                if (border)
                {
                    if (border._single)
                    {
                        up_height += border.top._width + border.top._width;
                    }
                    else
                    {
                        up_height = border.top._width + border.bottom._width;
                    }
                }
            }
        }
        return [down_height, up_height];
    };

    _pPopupMenu._spinup = function ()
    {
        var start_index = this._start_spin_index;
        if (start_index > 0)
        {
            if (this._items.length == this._end_spin_index)
                this.spindownbutton._changeStatus("disabled", false);
            start_index--;
            if (start_index == 0)
                this.spinupbutton._changeStatus("disabled", true);
        }
        this._start_spin_index = start_index;
        this._rearrangePopupMenuItems();

    };

    _pPopupMenu._spindown = function ()
    {
        var threshold = this._items.length;
        if (this._end_spin_index < threshold)
        {
            if (this._start_spin_index == 0)
                this.spinupbutton._changeStatus("disabled", false);
            this._start_spin_index++;
        }
        this._rearrangePopupMenuItems();
        if (this._end_spin_index == threshold)
        {
            this.spindownbutton._changeStatus("disabled", true);
        }
    };

    _pPopupMenu._createSpinButton = function ()
    {
        var spindownbutton = new nexacro.Button("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);
        spindownbutton._setControl("ButtonControl");
        spindownbutton._is_focus_accept = false;
        spindownbutton.createComponent();
        spindownbutton.set_visible(true);
        spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);
        spindownbutton.on_created();
        this.spindownbutton = spindownbutton;

        var spinupbutton = new nexacro.Button("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
        spinupbutton._setControl("ButtonControl");
        spinupbutton._is_focus_accept = false;
        spinupbutton.createComponent();
        spinupbutton.set_visible(true);
        spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
        spinupbutton.on_created();
        spinupbutton._changeStatus("disabled", true);
        this.spinupbutton = spinupbutton;

        var spinupicon = spinupbutton._getCSSStyleValue("icon", "enabled");
        if (spinupicon)
        {
            var img_size = nexacro._getImageSize(spinupicon.url, this._rearrangePopupMenuItems, this);
            if (img_size)
            {
                this._buttonsize = img_size.height;
                this._rearrangePopupMenuItems();
            }
        }

        var spindownicon = spindownbutton._getCSSStyleValue("icon", "enabled");
        if (spinupicon)
        {
            var img_size = nexacro._getImageSize(spinupicon.url, this._rearrangePopupMenuItems, this);
            if (img_size)
            {
                this._buttonsize = img_size.height;
                this._rearrangePopupMenuItems();
            }
        }
        this.spinupbutton = spinupbutton;
    };

    _pPopupMenu.on_notify_spinup_onclick = function ()
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
            popupmenu._closePopup();
        this._spinup();
    };

    _pPopupMenu.on_notify_spindown_onclick = function ()
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
            popupmenu._closePopup();
        this._spindown();
    };

    _pPopupMenu._rearrangePopupMenuItems = function ()
    {
        var start_spin_index = this._start_spin_index;
        var itemheight = this._itemheight;
        var items_total_height = this._items_total_height;
        var client_width = this._getClientWidth();
        var client_height = this._getClientHeight();
        var items = this._items;
        var spinheight = this.buttonsize || this._buttonsize;
        var top = spinheight;
        var width = "";
        var len = items.length;
        var end_spin_index = this._end_spin_index;
        var sum_itemheight = top + spinheight;

        //showspinbutton
        this._showSpinButton(this._isSpinVisible());
        //rearrange items
        for (var i = 0, end = start_spin_index; i < end; i++)
        {
            items[i].move(0, 0, 0, 0);
        }
        for (var i = start_spin_index; i <= len; i++)
        {
            var item = items[i];
            end_spin_index = i;
            sum_itemheight += itemheight;
            if (i == start_spin_index || sum_itemheight < client_height)
            {
                item.move(0, top, client_width, itemheight);
            }
            else
            {                
                break;
            }
            end_spin_index = i;
            top += itemheight;
        }
        if (end_spin_index > 0 && end_spin_index < len)
        {
            for (var i = end_spin_index; i < len; i++)
            {
                items[i].move(0, 0, 0, 0);
            }
        }
        this._end_spin_index = end_spin_index;
    };


    _pPopupMenu._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var want_arrow = this._want_arrow;
        var want_tab = this._want_tab;
        this._want_tab = true;
        return {
            want_tab: want_tab, want_return: true, want_escape: false, want_chars: false, want_arrows: want_arrow
        };
    };

    _pPopupMenu._loaded_expImage = function (imgurl, w, h)
    {
        this._expImage_width = w;
        this._expImage_height = h;
    };

    _pPopupMenu._loaded_chkImage = function (imgurl, w, h)
    {
        this._chkImage_width = w;
        this._chkImage_height = h;
    };

    _pPopupMenu._loaded_iconImage = function (imgurl, w, h)
    {
        this._iconImage_width = w;
        this._iconImage_height = h;
    };

    _pPopupMenu._load_image = function (strImageUrl, strflag)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            var val = strImageUrl;
            if (val)
            {
                val = nexacro._getURIValue(val);
                val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

                var size;
                if (strflag == "exp") //expimg
                {
                    size = nexacro._getImageSize(val, this._loaded_expImage, this);
                    if (size)
                    {
                        this._expImage_width = size.width;
                        this._expImage_height = size.height;
                    }
                }
                else if (strflag == "chk")//checkimg
                {
                    size = nexacro._getImageSize(val, this._loaded_chkImage, this);
                    if (size)
                    {
                        this._chkImage_width = size.width;
                        this._chkImage_height = size.height;
                    }
                }
                else if (strflag == "icon")//icon
                {
                    size = nexacro._getImageSize(val, this._loaded_iconImage, this);
                    if (size)
                    {
                        this._iconImage_width = size.width;
                        this._iconImage_height = size.height;
                    }
                }
                return val;
            }
        }
    };

    _pPopupMenu._getMaxTextSize = function (column)
    {
        var ds = this._innerdataset;
        var text_maxsize = [0, 0];
        if (ds)
        {
            var text_size = [0, 0];
            var items = this._items;
            if (items)
            {
                var len = items.length;
                if (len)
                {
                    var font = items[0]._getCurrentStyleInheritValue("font", this._status);
                    for (var i = 0; i < len; i++)
                    {
                        var text = ds.getColumn(items[i].datarow, column);
                        if (text === undefined) break;

                        var text_size = nexacro._getTextSize(text, font);
                        if (text_size[0] > text_maxsize[0]) //width
                            text_maxsize[0] = text_size[0];
                        if (text_size[1] > text_maxsize[1]) //height
                            text_maxsize[1] = text_size[1];
                    }
                }
            }
        }
        return text_maxsize;
    };

    _pPopupMenu._createPopupMenu = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._deletePopupMenu(true);
            var ds = this._innerdataset;
            if (ds && this.levelcolumn && this.captioncolumn && this.idcolumn)
            {
                var top = 0;
                var height = 0;
                var currentstatus = this._status;
                var itemheight = this.itemheight;
                if (itemheight)
                {
                    height = itemheight;
                }

                var index = 0, len = ds.getRowCount();
                var datarow = this.datarow;

                for (var rowlength = datarow; rowlength < len; rowlength++)
                {
                    var level = thislevel = ds.getColumn(rowlength, this.levelcolumn);
                    //var itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo); //미사용

                    if (level == this.level)
                    {
                        var text = ds.getColumn(rowlength, this.captioncolumn);
                        if (text == "-")
                        {
                            //separator
                            var lineItem = new nexacro.Static("separator", "absolute", 0, top, 0, 1, null, null, this);
                            lineItem._setControl();
                            lineItem.set_background("black");
                            lineItem.createComponent();
                            lineItem._bLine = true;
                            top += 1;
                            this._lineItems.push(lineItem);
                            continue;
                        }

                        var popupmenuitem = new nexacro._PopupMenuItemControl("popupmenuitem", "absolute", 0, top, 0, height, null, null, this);
                        popupmenuitem.createComponent();

                        top += height;

                        popupmenuitem._bindindex = rowlength;
                        popupmenuitem.index = index++;
                        popupmenuitem.datarow = rowlength;
                        popupmenuitem.level = level;

                        var enable = ds.getColumn(rowlength, this.enablecolumn);
                        popupmenuitem._setEnable(enable === false || enable === "false" ? false : true);

                        if (text)
                        {
                            popupmenuitem.set_text(text);
                        }

                        if (this._is_subcontrol)
                        {

                            var checkimg = ds.getColumn(rowlength, this.checkboxcolumn);
                            if (checkimg)
                            {
                                popupmenuitem._setValue(nexacro._toBoolean(checkimg));
                            }
                            else
                            {
                                var icon = ds.getColumn(rowlength, this.iconcolumn);
                                if (icon) // && this._iconcontrol)
                                    popupmenuitem._setIcon(icon);
                            }
                        }

                        var id = ds.getColumn(rowlength, this.idcolumn);
                        if (id)
                        {
                            popupmenuitem.id = id;
                        }

                        var hotkey = ds.getColumn(rowlength, this.hotkeycolumn);
                        if (hotkey)
                        {
                            popupmenuitem._setHotkey(hotkey);
                        }

                        var userdata = ds.getColumn(rowlength, this.userdatacolumn);
                        popupmenuitem.userdata = userdata;
                        if (userdata)
                        {
                            popupmenuitem._setUserdata(userdata);
                        }


                        if (rowlength == ds.getRowCount() - 1)
                        {
                            popupmenuitem._canExpand = false;
                        }
                        else
                        {
                            level = +ds.getColumn(rowlength + 1, this.levelcolumn);
                            if (level <= this.level)
                            {
                                popupmenuitem._canExpand = false;
                            }
                            else
                            {
                                //var expandimage = this.expandimage;
                                popupmenuitem._setExpandimage();
                            }
                        }

                        popupmenuitem._setEventHandler("onlbuttonup", this.on_notify_menuitem_onclick, this);
                        popupmenuitem._setEventHandler("onlbuttondown", this.on_notify_menuitem_onlbuttondown, this);

                        if (!(nexacro._isTouchInteraction && nexacro._SupportTouch))
                        {
                            popupmenuitem._setEventHandler("onmouseenter", this.on_notify_menuitem_onmouseenter, this);
                            this._setEventHandler("onmouseenter", this.on_notify_onmouseenter, this);
                            var rootCom = this._getRootComponent(this);
                            if (rootCom.onmouseleave)
                            {
                                popupmenuitem._setEventHandler("onmouseleave", this.on_notify_menuitem_onmouseleave, this);
                            }
                        }


                        this._items.push(popupmenuitem);
                        this._lineItems.push(popupmenuitem);

                        popupmenuitem._real_visible = false;
                    }
                    else if (level < this.level)
                    {
                        break;
                    }
                    
                    var rootComp = this._getRootComponent(this);
                    if (hotkey && rootComp.autohotkey && rootComp instanceof nexacro.PopupMenu)
                    {
                        if (rowlength == len - 1 || thislevel >= ds.getColumn(rowlength + 1, this.levelcolumn))
                            this._set_hotkey(id, hotkey);
                    }
                }
                this._is_updatedimages = true;
            }
        }
    };

    _pPopupMenu._deletePopupMenu = function (delete_popupmenu)
    {
        if (!this._is_subcontrol)
        {
            var list = this._hot_key_list;
            var len = list.length;
            var _form = this._getMainForm();
            for (var i = 0; i < len; i++)
            {
                nexacro._unregisterHotkeyComp(_form, this, list[i].key);
            }

            this._hot_key_list = [];
        }

        var items = this._items;
        if (items)
        {
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                items[i].destroyComponent();
                items[i] = null;
            }

            this._items = [];
        }
        var lineitems = this._lineItems;
        if (lineitems)
        {
            var len = lineitems.length;
            for (var i = 0; i < len; i++)
            {
                lineitems[i].destroyComponent();
                lineitems[i] = null;
            }
            this._lineItems = [];
        }

        if (this.spindownbutton)
        {
            this.spindownbutton.destroyComponent();
            this.spindownbutton = null;
        }
        if (this.spinupbutton)
        {
            this.spinupbutton.destroyComponent();
            this.spinupbutton = null;
        }
        this._start_spin_index = 0;
        this._end_spin_index = 0;
        this._is_spin_visible = false;

        if (this._popupmenu && !delete_popupmenu)
        {
            this._popupmenu.destroyComponent();
            this._popupmenu = null;
        }
        
       
    };


    _pPopupMenu._showPopup = function (obj)
    {
        var popuptype = this._getPopupType();
        if (popuptype == "none") return;
        if (this._innerdataset && this.levelcolumn && this.captioncolumn && this.idcolumn && obj._canExpand === true && this.visible)
        {
            var popupmenu = this._popupmenu;
            if (!popupmenu)
            {
                popupmenu = this._popupmenu = new nexacro.PopupMenu("popupmenu", "absolute", 0, 0, 0, 0, null, null, this);
                popupmenu._setControl();

                var color = this.color;               
                if (color)
                    popupmenu.set_color(color);
                var font = this.font;
                if (font)
                    popupmenu.set_font(font);

                popupmenu.level = this.level + 1;
                popupmenu.datarow = obj.datarow + 1;
                this._setPopupContains(true);
                //popupmenu._closeflag = this._closeflag;

                popupmenu._track_capture = false;
                popupmenu.parentPopupMenu = this;
                popupmenu._is_loading = true;
                popupmenu.setInnerDataset(this._innerdataset);

                popupmenu.set_captioncolumn(this.captioncolumn);
                popupmenu.set_checkboxcolumn(this.checkboxcolumn);
                popupmenu.set_hotkeycolumn(this.hotkeycolumn);
                popupmenu.set_idcolumn(this.idcolumn);
                popupmenu.set_levelcolumn(this.levelcolumn);
                popupmenu.set_userdatacolumn(this.userdatacolumn);
                popupmenu.set_enablecolumn(this.enablecolumn);
                popupmenu.set_iconcolumn(this.iconcolumn);
                popupmenu._is_loading = true;
                popupmenu.set_popuptype(this._getPopupType());
                popupmenu.createComponent();                
            }
            else
            {
                popupmenu.datarow = obj.datarow + 1;                
            }
            //if (this.checkboximage)
            //    popupmenu.set_checkboximage(this.checkboximage);
            //if (this.expandimage)
            //    popupmenu.set_expandimage(this.expandimage);
            if (this.itemheight)
                popupmenu.set_itemheight(this.itemheight);
            popupmenu._trackPopup(obj, "horizontal");
        }
    };

    _pPopupMenu._unregisterItemHotkey = function (hotkey)
    {
        if (!hotkey || !hotkey._is_registered)
            return;
        var _form = this._getMainForm();
        if (this._is_frame || this == _form)
        {
            // form 또는 frame의 hotkey는 ownerFrame에 등록
            var owner_frame = this.getOwnerFrame();
            if (owner_frame)
            {
                nexacro._unregisterHotkeyComp(owner_frame, this, hotkey);
                this._hot_key_list.pop();
            }
        }
        else
        {
            if (_form)
            {
                nexacro._unregisterHotkeyComp(_form, this, hotkey);
                this._hot_key_list.pop();
            }
        }
    };

    _pPopupMenu._registerItemHotkey = function (hotkey)
    {
        if (!hotkey || hotkey._is_registered)
            return;

        this._setAccessibilityHotKey(this.hotkey);

        var _form = this._getMainForm();
        if (this._is_frame || this == _form)
        {
            // form 또는 frame의 hotkey는 ownerFrame에 등록
            var owner_frame = this.getOwnerFrame();
            if (owner_frame)
            {
                nexacro._registerHotkeyComp(owner_frame, this, hotkey);
            }
        }
        else
        {
            if (_form)
            {
                nexacro._registerHotkeyComp(_form, this, hotkey);
            }
        }
    };

    _pPopupMenu._set_hotkey = function (id, v)
    {
        var hotkey = new nexacro._HotKey(v);
        if (hotkey._isEmpty())
        {
            delete hotkey;
        }
        else
        {
            if (this._is_created)
                this._registerItemHotkey(hotkey);
        }

        var list = {
            id: id, key: hotkey
        };
        if (!this._hot_key_list)
            this._hot_key_list = [];
        this._hot_key_list.push(list);
    };

    _pPopupMenu._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var list = this._hot_key_list;
        var len = list.length;
        var key = null;
        var modifykey = null;
        var hotkey = this._hotkey;
        if (hotkey)
        {
            if (hotkey._keycode == keycode &&
               (((hotkey._modifierkey & 0x02) == 0x02) == altKey) &&
                (((hotkey._modifierkey & 0x01) == 0x01) == ctrlKey) &&
                (((hotkey._modifierkey & 0x04) == 0x04) == shiftKey))
                {
                    this.setFocus();
                    return;
                }
        }

        for (var i = 0; i < len; i++)
        {
            key = list[i].key;
            if (key._keycode == keycode)
            {
                modifykey = key._modifierkey;
                if (altKey == ((modifykey & 0x02) == 0x02) && ctrlKey == ((modifykey & 0x01) == 0x01) && shiftKey == ((modifykey & 0x04) == 0x04))
                {
                    this.setFocus();
                    this.on_fire_onitemclick(this, "onmenuclick", list[i].id, "", list[i].index, list.level);
                    break;
                }
            }
        }
    };

    _pPopupMenu._adjustPopupPosition = function (x, y, align, win_position)
    {
        var alignPosition = this._getAlignPosition(x, y, align);
        var popup_left = alignPosition[0] < 0 ? 0 : alignPosition[0];
        var popup_top = alignPosition[1] < 0 ? 0 : alignPosition[1];
        var popup_width = this._width;
        var popup_height = this._height;

        var popup_winpos_right = popup_left + popup_width;
        var popup_winpos_bottom = popup_top + popup_height;

        var _window = this._getWindow();
        var win_width = _window.clientWidth;
        var win_height = _window.clientHeight;
        var width_gap = popup_winpos_right - win_width;
        if (popup_winpos_right > win_width && popup_left > width_gap)
        {
            popup_left = popup_left - width_gap;
        }

        if (popup_top > popup_height && popup_winpos_bottom > win_height)
        {
            popup_top = win_height - popup_height;
        }
        if (win_position)
        {
            popup_left = popup_left + win_position.x;
            popup_top = popup_top + win_position.y;
        }

        this._is_trackpopup = true;
        this._popup(popup_left, popup_top, popup_width, popup_height);
    };


    _pPopupMenu._setItemControlPosition = function (icon_x, iconimgwidth, iconheight, text_x, textwidth, textheight, hotkey_x, hotkeywidth, hotkeyheight, gap, chkimgwidth, expimgwidth)
    {
        var itempos = this._itempos;
        if (!itempos)
            itempos = {};
        itempos.icon_x = icon_x;
        itempos.iconimgwidth = iconimgwidth;
        itempos.iconheight = iconheight;
        itempos.text_x = text_x;
        itempos.textheight = textheight;
       // itempos.text_y = text_y;
        itempos.textwidth = textwidth;
        itempos.hotkey_x = hotkey_x;
        //itempos.hotkey_y = hotkey_y;
        itempos.hotkeywidth = hotkeywidth;
        itempos.hotkeyheight = hotkeyheight;
        itempos.expimgwidth = expimgwidth;
        itempos.chkimgwidth = chkimgwidth;
        itempos.gap = gap;
        this._itempos = itempos;
    };

    _pPopupMenu._callbackFromDataset = function (obj, e)
    {
        this._createPopupMenu();
    };

    _pPopupMenu._getMainFrame = function ()
    {
        var pThis = this;
        while (pThis && !pThis._is_main)
        {
            pThis = pThis.parent;
        }
        return pThis;
    };

    _pPopupMenu._trackPopup = function (obj, direction, x, y)
    {
        this._createPopupMenu();
        this._reCalcSize();
        this.on_created(); // TO DO : need - Only items must be created

        var _left, _top, _width, _height;
        var parent = this.parent;
        var mainframe = this._getMainFrame();

        var s = nexacro._getElementPositionInFrame(mainframe.getElement());
        var padding = this._getCSSStyleValue("padding", this._status);
        var padding_l = 0, padding_r = 0, padding_b = 0, padding_t = 0;
        if (padding)
        {
            padding_l = padding.left;
            padding_r = padding.right;
            padding_b = padding.bottom;
            padding_t = padding.top;
        }

        var scale = this._getCumulativeZoomFactor() / 100.0;

        var p_width, p_height, p;

        var popup_width = this._width;
        var popup_height = this._height;
        var bodyWidth = s.x + mainframe._adjust_width;
        var bodyHeight = s.y + mainframe._adjust_height;

        _width = popup_width + padding_l + padding_r;
        _height = popup_height + padding_b + padding_t;

        if (direction == "horizontal") // popupmenu
        {
            p = nexacro._getElementPositionInFrame(parent.getElement());

            p_width = parent._getClientWidth();
            p_height = parent._getClientHeight();
            _left = p_width - 2; //When popupmenu is popuped, it is going to popup on the previous popupmenu. 
            _top = 0;
            if (!y)
            {
                // height size adjust
                var tmp = p.y + obj._adjust_top + popup_height;
                if (tmp > bodyHeight)
                {
                    _top = bodyHeight - tmp;
                }
            }
            else
            {
                _top = y;
            }

            if (!x)
            {
                // width size adjust
                var px = p.x;
                var px_width = px + p_width;
                if (px_width + popup_width > bodyWidth)
                {
                    if (px - popup_width > 0)
                        _left = -popup_width;
                }
            }
            else
            {
                _left = x;
            }

        }
        else // "vertical" menu
        {
            p = nexacro._getElementPositionInFrame(obj.getElement());

            p_width = 0;

            p_height = obj._adjust_height;
            _left = 0;
            _top = p_height;
            
            if (!y)
            {
                // height size adjust
                var tmp = p.y + p_height + popup_height;
                if (tmp > bodyHeight)
                {
                    if (s.y < (p.y - popup_height))
                    {
                        _top = -popup_height;
                    }
                    else
                    {
                        //spin visible
                        _height = bodyHeight - p.y - parent._adjust_height;
                        this._showSpinButton(true);
                    }
                }
                else if(this._is_spin_visible)
                {
                    this._showSpinButton(false);
                }
            }
            else
            {
                _top = y;
            }

            if (!x)
            {
                // width size adjust
                var px = p.x;
                if (px + popup_width > bodyWidth)
                {
                    _left = bodyWidth - px - popup_width;
                }
            }
            else
            {
                _left = x;
            }
        }

        // 팝업도 동일 비율로 확대/축소
        var elem = this.getElement();
        if (elem.setElementZoom)
            elem.setElementZoom(scale * 100);

        var popuptype = this._getPopupType();
        if (popuptype == "center")
        {
            var left = (mainframe._adjust_width / 2) - (_width / 2);
            var top = (mainframe._adjust_height / 2) - (_height / 2);
            this._adjustPopupPosition(left, top);
        }
        else
        {
            this._is_trackpopup = true;
            this._popupBy(obj, _left, _top -1, _width, _height);
        }
    };

    _pPopupMenu._getMenuObj = function ()
    {
        var p = this.parent;
        while (!(p instanceof nexacro.Menu))
        {
            p = p.parent;
        }

        return p;
    };

    _pPopupMenu._getControlInfo = function ()
    {
        var items = this._items;
        var text_control_size = {};
        var hotkey_control_size = {};
        var max_text_width = 0;
        var max_hotkey_width = 0;
        var text_height = 0;
        var hotkey_height = 0;
        var text_font, hotkey_font;
        var max_item_height = 0;
        var item_border;
        var item_padding;
        
        var has_expand = false;
        var text_size;
        var hotkey_size;

        var text_border;
        var hotkey_border;

        var text_padding;
        var hotkey_padding;
        var icon_width;
        var expandimg_width;

        for (var i = 0, len = items.length; i < len; i++)
        {
            var item = items[i];
            var text_control = item._textcontrol;
            var hotkey_control = item._hotkeytextcontrol;
            var expiconcontrol = item._expiconcontrol;
            var currentstatus = item._status;

            var icon_control = this._iconcontrol;
            if (icon_width == undefined && icon_control)
            {
                icon_width = icon_control._getCSSStyleValue("icon", currentstatus);
            }

            if (text_control)
            {
                var text = text_control.text;
                if (text)
                {
                    if (!text_font)
                        text_font = text_control._getCurrentStyleInheritValue("font", currentstatus);
                    text_control_size = nexacro._getTextSize(text, text_font);
                    if (text_control_size[0] > max_text_width)
                        max_text_width = text_control_size[0];
                }
                if (!text_border)
                    text_border = text_control._getCSSStyleValue("border", currentstatus);
                if (!text_padding)
                    text_padding = text_control._getCSSStyleValue("padding", currentstatus);
            }
            if (hotkey_control)
            {
                var hotkey = hotkey_control.text;
                if (hotkey)
                {
                    if (!hotkey_font)
                        hotkey_font = hotkey_control._getCurrentStyleInheritValue("font", this._status);
                    hotkey_control_size = nexacro._getTextSize(hotkey, hotkey_font);

                    if (hotkey_control_size[0] > max_hotkey_width)
                        max_hotkey_width = hotkey_control_size[0];
                 
                }
                if (!hotkey_border)
                    hotkey_border = hotkey_control._getCSSStyleValue("border", currentstatus);
                if (!hotkey_padding)
                    hotkey_padding = hotkey_control._getCSSStyleValue("padding", currentstatus);
            }
            if (!has_expand && item._canExpand)
                has_expand = true;
            if (expiconcontrol)
            {
                var icon = expiconcontrol._getCSSStyleValue("icon", currentstatus);
                if (icon)
                {
                    var size = nexacro._getImageSize(icon.value, this._loaded_expImage, this);
                    if (size)
                        expandimg_width = size.width;
                }
            }

            if (!item_padding)
                item_padding = item._getCSSStyleValue("padding");
            
            if (!item_border)
                item_border = item._getCSSStyleValue("border");
        }

        if (!max_item_height)
        {
            text_height = text_control_size[1];
            if (text_border)
            {
                if (text_border._single)
                {
                    text_height = text_height + text_border.top._width + text_border.top._width;
                    max_text_width = max_text_width + text_border.top._width + text_border.top._width;
                }
                else
                {
                    text_height = text_height + text_border.top._width + text_border.bottom._width;
                    max_text_width = max_text_width + text_border.top._width + text_border.bottom._width;
                }
            }/*
            if (text_padding)
            {
                text_height = text_height + text_padding.top + text_padding.bottom;
            }
        */
            if (text_control_size && hotkey_control_size.length >1)
            {
                hotkey_height = hotkey_control_size[1];
                if (hotkey_border)
                {
                    if (hotkey_border._single)
                    {
                        hotkey_height = hotkey_height + hotkey_border.top._width + hotkey_border.top._width;
                        max_hotkey_width = max_hotkey_width + hotkey_border.top._width + hotkey_border.top._width;
                    }
                    else
                    {                        
                        hotkey_height = hotkey_height + hotkey_border.top._width + hotkey_border.bottom._width;
                        max_hotkey_width = max_hotkey_width + hotkey_border.top._width + hotkey_border.bottom._width;
                    }
                }/*
                if (hotkey_padding)
                {
                    hotkey_height = hotkey_height + hotkey_padding.top + hotkey_padding.bottom;
                }*/
                max_item_height = text_height > hotkey_height ? text_height : hotkey_height;
            }
            else
            {
                max_item_height = text_height;
            }
        }

        //calcultate with padding left and padding right
        if (text_padding)
            max_text_width = max_text_width + text_padding.left + text_padding.right;
        if (hotkey_padding)
            max_hotkey_width = max_hotkey_width + hotkey_padding.left + hotkey_padding.right;

        return [max_text_width, max_hotkey_width, text_height, hotkey_height, has_expand, item_border, item_padding, icon_width ? icon_width : max_item_height, max_item_height, expandimg_width];
    };

    _pPopupMenu._reCalcSize = function (w,h)
    {
        var ds = this._innerdataset;
        if (ds && this.captioncolumn)
        {
            var items = this._items;
            if (!items || items.length == 0) return;

            var len = items.length;
            var currentstatus = this._status;
            var caption_size = this._getMaxTextSize(this.captioncolumn);
            var expandtext_width = parseInt(nexacro._getTextSize(">", items[0]._getCurrentStyleInheritValue("font", this._status))[0]);
            var controls_info = this._getControlInfo();
            var textcontrol_width = controls_info[0];
            var hotkeycontrol_width = controls_info[1];
            var maxtextheight = controls_info[2];
            var maxhotkeyheight = controls_info[3];
            var has_expand = controls_info[4];
            var itemborder = controls_info[5];
            var itempadding = controls_info[6];
            var iconimgwidth = controls_info[7];
            var itemheight = controls_info[8];
            var expimgwidth = controls_info[9];
            var rootComp = this._getRootComponent(this);
            var expimgheight = 0, chkimgwidth = 0;
            var border = this._getCSSStyleValue("border", currentstatus);

            var itempadding_l = 0, itempadding_r = 0, itempadding_t = 0, itempadding_b = 0;
            if (itempadding)
            {
                itempadding_l = itempadding.left;
                itempadding_r = itempadding.right;
                itempadding_t = itempadding.top;
                itempadding_b = itempadding.bottom;
            }

            //itemborder
            var itemborder_l = 0, itemborder_r = 0, itemborder_t = 0, itemborder_b = 0;

            if (itemborder)
            {
                if (itemborder._single)
                {
                    itemborder_l = itemborder_r = itemborder_t = itemborder_b = itemborder.top._width;
                }
                else
                {
                    if (itemborder.left)
                        itemborder_l = itemborder.left._width;
                    if (itemborder.right)
                        itemborder_r = itemborder.right._width;
                    if (itemborder.top)
                        itemborder_t = itemborder.top._width;
                    if (itemborder.bottom)
                        itemborder_b = itemborder.bottom._width;
                }
            }

            var border_left = 0, border_top = 0, border_right = 0, border_bottom = 0;

            if (border)
            {
                border_left = border.left._width;
                border_top = border.top._width;
                border_right = border.right._width;
                border_bottom = border.bottom._width;
            }


            var item_h = this.itemheight;// ? this.itemheight : 20;
            if (item_h == undefined)
            {
                //item_h = maxtextheight //itemborder_t + itemborder_b;// + itempadding_t + itempadding_b;
                item_h = this._itemheight = itemheight + itemborder_t + itemborder_b;
            }

            var gap = icontextpadding = this._hotkeytextgap;


            if (!this._is_subcontrol)
            {
                hotkeycontrol_width = 0;
                iconimgwidth = 0;
                chkimgwidth = 0;
                icontextpadding = 0;
            }
            else if (!this.checkboxcolumn && !this.iconcolumn)
            {
                iconimgwidth = 0;
                chkimgwidth = 0;
                icontextpadding = 0;
            }

            var width = itempadding_l + border_left + border_right + icontextpadding + (chkimgwidth ? chkimgwidth : iconimgwidth) + (textcontrol_width ? textcontrol_width : 0) + (hotkeycontrol_width ? hotkeycontrol_width + gap : 0) + (has_expand ? expimgwidth ? expimgwidth + gap : gap + expandtext_width : 0) + itempadding_r;
            var height = item_h * len;
            var items_total_height = this._items_total_height = height + border_top + border_bottom;
            
            var buttonsize = this.buttonsize | 0;
            var spin_visible = this._isSpinVisible();
            if (spin_visible)
                this._rearrangePopupMenuItems();
            else
            {
                this.resize(width + border_left + border_right, items_total_height);
            }
            var _item_top = buttonsize;

            //recalc position popupmenu
            var icon_x = itempadding_l;
            var icon_end_x = icon_x;
            if (this._is_subcontrol)
            {
                icon_end_x = chkimgwidth == 0 ? iconimgwidth + icon_x : chkimgwidth + icon_x;
            }
            var text_x = icon_x > itempadding_l ? icon_end_x + icontextpadding : icon_end_x;
            var hotkey_x = text_x + textcontrol_width + gap;

            this._setItemControlPosition(icon_x, iconimgwidth, itemheight, text_x, textcontrol_width, maxtextheight, hotkey_x, hotkeycontrol_width, maxhotkeyheight, gap, chkimgwidth, expimgwidth ? expimgwidth : expandtext_width);

            for (var i = 0; i < this._lineItems.length; i++)
            {
                var item = this._lineItems[i];
                if (item._bLine)
                {
                    item.move(itempadding_t, _item_top, width, 1);
                    _item_top += 1;
                }
                else
                {

                    //item._icontextpadding = this._icontextpadding;
                    if (spin_visible == false)
                        item.move(0, _item_top, width, item_h);
                    //item._updateControlPosition(icon_pos, iconimgwidth, textpos_x, textwidth, hotkeypos_x, hotkeywidth, item_h, gap);

                    if (nexacro._enableaccessibility)
                    {
                        item._updateAccessibilityLabel(item);
                    }
                    _item_top += item_h;
                }
            }
        }
    };

    _pPopupMenu._getAlignPosition = function (x, y, align)
    {
        if (align)
        {
            var width = this._width;
            var height = this._height;
            var popup_align = align.split(/\s+/);
            var align_len = popup_align.length;
            var horizon = parseInt(x, 10) | 0;
            var vertical = parseInt(y, 10) | 0;
            switch (align_len)
            {
                case 0:
                    break;
                case 1:
                    if (popup_align[0] == "left")
                    {
                        x = horizon - width;
                    }
                    else if (popup_align[0] == "center")
                    {
                        x = horizon - (width / 2);
                    }
                    else if (popup_align[0] == "top")
                    {
                        y = vertical - height;
                    }
                    else if (popup_align[0] == "middle")
                    {
                        y = vertical - (height / 2);
                    }
                    break;
                case 2:
                    if (popup_align[0] == "left" || popup_align[0] == "center" || popup_align[0] == "right")
                    {
                        if (popup_align[0] == "left")
                        {
                            x = horizon - width;
                        }
                        else if (popup_align[0] == "center")
                        {
                            x = horizon - (width / 2);
                        }
                    }
                    else if (popup_align[0] == "top" || popup_align[0] == "middle" || popup_align[0] == "bottom")
                    {
                        if (popup_align[0] == "top")
                        {
                            y = vertical - height;
                        }
                        else if (popup_align[0] == "middle")
                        {
                            y = vertical - (height / 2);
                        }
                    }

                    if (popup_align[1] == "left" || popup_align[1] == "center" || popup_align[1] == "right")
                    {
                        if (popup_align[1] == "left")
                        {
                            x = horizon - width;
                        }
                        else if (popup_align[1] == "center")
                        {
                            x = horizon - (width / 2);
                        }
                    }
                    else if (popup_align[1] == "top" || popup_align[1] == "middle" || popup_align[1] == "bottom")
                    {
                        if (popup_align[1] == "top")
                        {
                            y = vertical - height;
                        }
                        else if (popup_align[1] == "middle")
                        {
                            y = vertical - (height / 2);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return [x, y];
    };

    _pPopupMenu.set_icontextpadding = function (v)
    {
        this._icontextpadding = +v;
        this.on_apply_icontextpadding();
    };

    _pPopupMenu.on_apply_icontextpadding = function ()
    {
        //Do nothing
    };

    _pPopupMenu.set_hotkeytextgap = function (v)
    {
        this._hotkeytextgap = +v;
        this.on_apply_hotkeytextgap();
    };

    _pPopupMenu.on_apply_hotkeytextgap = function ()
    {
        //Do nothing
    };


    _pPopupMenu._closePopup = function (bcloseall)
    {
        var popupmenu = this._popupmenu;
        var is_popup_visible = this._is_popupmenu_visible(this);
        var close_flag = bcloseall | !is_popup_visible;
        if (popupmenu && close_flag)
        {
            popupmenu._closePopup(close_flag);
            is_popup_visible = false;
        }

        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
        }

        var items = this._item_find(this);
        if (nexacro._enableaccessibility)
        {
            this._item_killfocus(items[this._popupitemindex]);
            this._popupitemindex = -1;
        }
        else
        {
            var itemLen = items.length;
            for (var i = 0; i < itemLen; i++)
                items[i].on_apply_mouseover(false);
            if (this._popupitemindex > -1)
            {
                var item = items[this._popupitemindex];
                if (item)
                    item._changeUserStatus("selected", false); //need to check
            }
            if (this.beforeindex > -1)
            {
                var item = items[this.beforeindex];
                if (item)
                    item._changeUserStatus("selected", false); //need to check
            }
            this._popupitemindex = -1;
        }
        if (!is_popup_visible)
            this.set_visible(false);
        this._is_trackpopup = false;
        //this._closeflag = false;
    };
    
    _pPopupMenu._isPopupContains = function ()
    {
        var rootcomp = this._getRootComponent(this);
        /*
        var pthis = this;
        while (pthis != rootcomp)
        {
            if (pthis._is_popupcontains == true)
                return true;
            pthis = pthis.parent;
        }*/
        return rootcomp._is_popupcontains ? true : false;
    };

    _pPopupMenu._getPopupControl = function ()
    {
        var rootcomp = this._getRootComponent(this);
        return rootcomp._popupmenu;
    };
    
    _pPopupMenu.on_get_popupControlTypeName = function ()
    {
        var rootcomp = this._getRootComponent(this);
        return rootcomp._type_name;
    };

    _pPopupMenu.closePopup = _pPopupMenu._closePopup;

    _pPopupMenu._closeAllPopup = function ()
    {
        this._closePopup(true);

        var parent = this.parent;
        if (parent)
        {
            if (parent instanceof nexacro.Menu)
            {
                if (parent._is_menu_click)
                {
                    parent._is_menu_click = false;
                }
            }
        }
    };

    _pPopupMenu.on_fire_oncloseup = function (obj)
    {
        if (this.oncloseup && this.oncloseup._has_handlers)
        {
            var evt = new nexacro.MenuCloseUpEventInfo(obj, "oncloseup", (this._selected_itemindex >= 0));
            evt.eventid = "oncloseup";
            return this.oncloseup._fireEvent(this, evt);
        }
        return false;
    };

    _pPopupMenu._item_focus = function (obj, bflag)
    {
        if (obj)
        {
            if (nexacro._enableaccessibility)
            {
                if (obj instanceof nexacro._PopupMenuItemControl)
                {
                    obj._on_focus(false);
                }
                else
                {
                    obj._on_focus(true);
                }
            }

            if (obj.on_apply_mouseover)
            {
                obj.on_apply_mouseover(bflag);
            }
        }
    };

    _pPopupMenu._item_killfocus = function (obj)
    {
        if (obj)
        {
            if (nexacro._enableaccessibility)
            {
                var _window = this._getWindow();
                if (_window)
                {
                    _window._removeFromCurrentFocusPath(obj, true);
                }
            }

            if (obj.on_apply_mouseover)
            {
                obj.on_apply_mouseover(false);
            }
        }
    };

    _pPopupMenu._is_popupmenu_visible = function (obj)
    {
        if (obj._popupmenu == null || obj._popupmenu.visible == false)
        {
            return false;
        }
        return true;
    };

    _pPopupMenu._item_find = function (obj)
    {
        if (obj._popupmenu == null || obj._popupmenu.visible == false)
        {
            return obj._items;
        }
        return obj._popupmenu._items;
    };

    _pPopupMenu._popupmenu_find = function (obj)
    {
        var pThis = obj;

        while (pThis)
        {
            if (pThis._popupmenu === null || pThis._popupmenu.visible == false)
            {
                break;
            }
            var pThis = pThis._popupmenu;
        }
        return pThis;
    };

    _pPopupMenu._popupmenuitem_extend = function (obj)
    {
        return obj._canExpand;
    };

    delete _pPopupMenu;

}