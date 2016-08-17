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

if (!nexacro._MenuItemControl)
{
    // ===============================================================================
    // nexacro._MenuItemControl
    // ===============================================================================

    nexacro._MenuItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Static.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pMenuItemControl = nexacro._createPrototype(nexacro.Static, nexacro._MenuItemControl);
    nexacro._MenuItemControl.prototype = _pMenuItemControl;

    _pMenuItemControl._type_name = "MenuItemControl";
    _pMenuItemControl._is_subcontrol = true;
    _pMenuItemControl._use_selected_status = true;
    _pMenuItemControl.index = 0;
    _pMenuItemControl.datarow = 0;
    _pMenuItemControl._canExpand = true;
    _pMenuItemControl.id = "";
    _pMenuItemControl.enable = true;
    _pMenuItemControl.level = "";
    _pMenuItemControl.userdata = null;
    _pMenuItemControl._accessibility_role = "menuitem";


    /* apply style */
    _pMenuItemControl.on_apply_accessibility = function (accessibility)
    {
        var control_elem = this._control_element;
        if (control_elem && accessibility)
        {
            control_elem.setAccessibility(accessibility);

            this._updateAccessibilityLabel(this);
        }
    };

    // ===============================================================================
    // nexacro._MenuItemControl : Override
    // ===============================================================================

    _pMenuItemControl.on_apply_mouseover = function (isovered)
    {        
       // if (this._selected)
       //     return;
        if (isovered)
        {
            this._changeStatus("mouseover", true); 
        }
        else
        {
            this._changeStatus("mouseover", false);
        }
    };

    _pMenuItemControl.on_apply_selected = function (bflag)
    {
        this._changeUserStatus("selected", bflag);
    };

    _pMenuItemControl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var parent = this.parent;
        var popupmenu = parent._popupmenu;
        if (popupmenu)
        {
            if (popupmenu._is_popup())
            {
                if (parent.beforeindex != this.index)
                {
                    parent.beforeindex = this.index;
                }
                popupmenu.cancelPopup();

                parent._menuitemindex = this.index;
                parent._popupitemindex = -1;
            }
        }

        var rootComp = this._getRootComponent(this);
        if (this._canExpand && this._isEnable())
        {
            //parent._closeflag = true;
            parent._showPopup(this);

            if (rootComp instanceof nexacro.Menu)
                rootComp._popupitemindex = this.index;
        }
        else
        {
            var popuptype = rootComp.popuptype;

            if (this.enable == false || popuptype == "none")
            {
                return;
            }

            if (rootComp.onmenuclick && rootComp.onmenuclick._has_handlers)
            {
                rootComp.on_fire_onitemclick(rootComp, "onmenuclick", this.id, this.userdata, this.index, this.parent.level);
                rootComp._popupitemindex = -1;
            }
            rootComp._closePopup();
        }
        return nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, refer_comp);
    };

    _pMenuItemControl._getWindowPosition = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            var elem_pos = nexacro._getElementXYInWindow(control_elem.handle);
            var windowLeft = elem_pos[0];
            var windowTop = elem_pos[1];
            return { x: windowLeft, y: windowTop };
        }
        return { x: 0, y: 0 };
    };

    // ===============================================================================
    // nexacro._MenuItemControl : Event Handlers
    // ===============================================================================    

    _pMenuItemControl._on_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
                                button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        var ret = nexacro.Component.prototype._on_dragleave.call(this, elem, to_comp, src_comp, src_refer_comp, dragdata, userdata,
                                button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);

        var rootCom = this._getRootComponent(this);
        if (rootCom.ondragleave)
        {
            rootCom._last_mouseleave_iteminfo.index = this.index;
            rootCom._last_mouseleave_iteminfo.bindindex = this._bindindex;
            rootCom._last_mouseleave_iteminfo.level = this.parent.level;
        }

        return ret;
    };

    _pMenuItemControl._updateAccessibilityLabel = function (item)
    {
        var rootComp = this._getRootComponent(this);
        var dataLen = rootComp._innerdataset.getRowCount();
        item._setAccessibilityInfoIndex(item.datarow + 1);
        item._setAccessibilityInfoCount(dataLen);
        item._setAccessibilityFlagHasPopup(item._canExpand ? true : false);
    };


    _pMenuItemControl.on_getIDCSSSelector = function ()
    {
        return "menuitem";
    };

    _pMenuItemControl._getTextSize = function (text)
    {
        var font = this._getCurrentStyleInheritValue("font");
        return nexacro._getTextSize(text, font, undefined, undefined, this.wordWrap, this._getCurrentStyleInheritValue("wordSpacing"), this._getCurrentStyleInheritValue("letterSpacing"));
    };

    delete _pMenuItemControl;
}

//==============================================================================
// nexacro.Menu && nexacro.Menu_Style
//==============================================================================
if (!nexacro.Menu)
{
    //==============================================================================
    // nexacro.MenuClickEventInfo
    //==============================================================================
    nexacro.MenuClickEventInfo = function (obj, id, itemid, itemuserdata, index, level)
    {
        this.eventid = id || "onmenuclick";
        this.id = itemid;
        this.fromobject = obj;
        this.fromreferenceobject = obj; // fromreferenceobject 처리 필요.
        this.index = index;
        this.level = level;

        this.userdata = itemuserdata;
    };
    var _pMenuClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuClickEventInfo);
    nexacro.MenuClickEventInfo.prototype = _pMenuClickEventInfo;
    _pMenuClickEventInfo._type_name = "MenuClickEventInfo";

    delete _pMenuClickEventInfo;

    //============================================================================== 
    // nexacro.MenuDragEventInfo
    //==============================================================================
    nexacro.MenuDragEventInfo = function (obj, id, itemid, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp,
                                        button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, level, index, bindindex)
    {
        this.id = itemid;
        this.eventid = id || "onmenudrag";

        if (!from_refer_comp) from_refer_comp = from_comp;

        this.cancelable = true;
        this.bubbles = true;

        this.dragdata = dragdata;
        this.userdata = userdata;
        this.sourceobject = src_comp;
        this.sourcereferenceobject = src_refer_comp;
        this.fromobject = from_comp;
        this.fromreferenceobject = from_refer_comp;
        this.altkey = alt_key || false;
        this.ctrlkey = ctrl_key || false;
        this.button = button || "";
        this.shiftkey = shift_key || false;
        this.screenx = screenX || -1;
        this.screeny = screenY || -1;
        this.canvasx = canvasX || -1;
        this.canvasy = canvasY || -1;
        this.clientx = clientX || -1;
        this.clienty = clientY || -1;

        this.level = level;
        this.index = index;
        this.bindindex = bindindex;
    };
    var _pEventMenuDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuDragEventInfo);
    nexacro.MenuDragEventInfo.prototype = _pEventMenuDragEventInfo;
    _pEventMenuDragEventInfo._type_name = "MenuDragEventInfo";

    delete _pEventMenuDragEventInfo;

    //============================================================================== 
    // nexacro.MenuClickEventInfo
    //==============================================================================
    nexacro.MenuMouseEventInfo = function (obj, id, itemid, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, level, index, bindindex)
    {
        this.id = itemid;
        this.eventid = id || "onmenumouse";
        this.cancelable = true;
        this.bubbles = true;

        this.fromobject = from_comp;
        this.fromreferenceobject = from_refer_comp;
        this.altkey = altKey || false;
        this.ctrlkey = ctrlKey || false;
        this.button = strButton || "";
        this.shiftkey = shiftKey || false;
        this.screenx = screenX || -1;
        this.screeny = screenY || -1;
        this.canvasx = canvasX || -1;
        this.canvasy = canvasY || -1;
        this.clientx = clientX || -1;
        this.clienty = clientY || -1;

        this.level = level;
        this.index = index;
        this.bindindex = bindindex;
    };

    var _pEventMenuMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuMouseEventInfo);
    nexacro.MenuMouseEventInfo.prototype = _pEventMenuMouseEventInfo;
    _pEventMenuMouseEventInfo._type_name = "MenuMouseEventInfo";

    delete _pEventMenuMouseEventInfo;

    //==============================================================================
    // nexacro.Menu_Style
    //==============================================================================
    
    //==============================================================================
    // nexacro.Menu
    //==============================================================================
    nexacro.Menu = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._items = [];
        this._hot_key_list = [];
        this._items_width = []; //spin
    };
        
    var _pMenu = nexacro._createPrototype(nexacro.Component, nexacro.Menu);
    nexacro.Menu.prototype = _pMenu;

    _pMenu._type_name = "Menu";

    _pMenu.autohotkey = false;
    _pMenu.captioncolumn = "";
    _pMenu.checkboxcolumn = "";
    _pMenu.enablecolumn = "";
    _pMenu.hotkeycolumn = "";
    _pMenu.iconcolumn = "";
    _pMenu.idcolumn = "";
    _pMenu.levelcolumn = "";
    _pMenu.userdatacolumn = "";
    _pMenu.beforeindex = -1;
    _pMenu.level = 0;
    _pMenu.innerdataset = "";

    //_pMenu.checkimage = null;
    //_pMenu.expandimage = null;
    _pMenu.popuptype = "normal";
    _pMenu.popupitemheight = "";
    _pMenu.buttonsize = undefined;
    _pMenu.buttonalign = "auto";

        // ------------------- internal variable -------------------- // 
    _pMenu._is_menu_click = false;
    _pMenu._innerdataset = "";
    _pMenu._popupmenu = null;
    
    //_pMenu._hasMultiPopup = true; // not use
    _pMenu._want_tab = nexacro._enableaccessibility;
    _pMenu._want_arrow = true;

    /* accessibility variable */
    _pMenu.accessibilityrole = "menubar";
    _pMenu.accessibilityenable = true;
    _pMenu.accessibilitylabel = "";
    _pMenu.accessibilitydescription = "";
    _pMenu.accessibilityaction = "";
    _pMenu.accessibilitydesclevel = "all";

    //sub accessibility 
    _pMenu.menuitemaccessibilityrole = "menu";
    _pMenu.menuitemaccessibilityenable = true;
    _pMenu.menuitemaccessibilitylabel= "";
    _pMenu.menuitemaccessibilitydescription = "";
    _pMenu.menuitemaccessibilityaction = "";
    _pMenu.menuitemaccessibilitydesclevel = "all";
    _pMenu._focus_obj = null;

        /* keyaction variable */
    _pMenu._menuitemindex = -1;
    _pMenu._menuitemonmouseenter = null;
    _pMenu._popupitemLR = -1;
    _pMenu._popupitemindex = -1;
    _pMenu._popupitempreviousindex = 0;
    _pMenu._previtemindex = 0;
    _pMenu._clickitemindex = 0;
    _pMenu._hotkeytextgap = 20; // use popupmenu
    _pMenu._icontextpadding = 5; // use popupmenu

    //menu spin
    _pMenu._items_total_width = 0;
    _pMenu._start_spin_index = 0;
    _pMenu._end_spin_index = 0;
    _pMenu._is_spin_visible = false;


    _pMenu._last_mouseleave_iteminfo = { bindindex: -1, index: -1, level: -1 };

    _pMenu._event_list =
        {
            "onclick": 1, "ondblclick": 1, "onkeypress": 1, "onkeydown": 1, "onkeyup": 1, "onkillfocus": 1, "onsetfocus": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1, "onlbuttondown": 1, "onlbuttonup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1, "onrbuttondown": 1, "onrbuttonup": 1, "onmenuclick": 1,
            "onmousedown": 1, "onmouseup": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
        };
    //==============================================================================
    // nexacro.Menu : Style Part
    //==============================================================================
    
    //-----------------------------------------------------------------------------------------
    // apply style
    /*
    _pMenu.on_apply_checkboximage = function (checkboximage)
    {
        if (!checkboximage)
        {
            checkboximage = this.checkboximage;
        }
        if (checkboximage)
        {
            this._load_image(checkboximage, 0); // 0 is check_img flg
        }

        if (this._popupmenu)
        {
            this._popupmenu.set_checkboximage(checkboximage);
        }
    };

    _pMenu.on_apply_expandimage = function (expandimage)
    {
        if (!expandimage)
        {
            expandimage = this.expandimage;
        }
        if (expandimage)
        {
            this._load_image(expandimage, 1);  // 1 is exp_img flg
        }

        if (this._popupmenu)
        {
            this._popupmenu.set_expandimage(expandimage);
        }
    };
*/
    _pMenu.on_apply_autohotkey = function (autohotkey)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_autohotkey(autohotkey);
        }
        if (autohotkey == true)
        {
            var ds = this._innerdataset;
            if (ds)
            {
                var len = ds.getRowCount();
                for (var i = 0; i < len; i++)
                {
                    id = ds.getColumn(i, this.idcolumn);
                    hotkey = ds.getColumn(i, this.hotkeycolumn);
                    level = ds.getColumn(i, this.levelcolumn);
                    if (hotkey && this.autohotkey && (i == len -1 || level >= ds.getColumn(i +1, this.levelcolumn)))
                    {
                        this._set_hotkey(id, hotkey);
                    }
                }
            }
        }
        else //if (autohotkey == false)
        {
            var hotkey_list = this._hot_key_list;
            if (hotkey_list && hotkey_list.length > -1)
            {
                for (var i = hotkey_list.length - 1; i > -1; i--)
                {
                    var item = hotkey_list[i];
                    this._unregisterItemHotkey(item.key);
                    item = null;
                }
            }
        }
    };

    _pMenu.set_popupitemheight = function (v)
    {
        v = (parseInt(v) | 0);
        if (this.popupitemheight != v)
        {
            this.popupitemheight = v;
            this.on_apply_popupitemheight(v);
        }
    };
    
    _pMenu.on_apply_popupitemheight = function (popupitemheight)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {            
            popupmenu.set_itemheight(popupitemheight ? popupitemheight : this.popupitemheight);
        }
    };
       
    _pMenu.set_popuptype = function (popuptype)
    {
        this.popuptype = popuptype;
        this.on_apply_popuptype(popuptype);
    };

    _pMenu.on_apply_popuptype = function (popuptype)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_popuptype(popuptype);
        }
    };
 

    _pMenu.set_buttonsize = function (v)
    {
        var val = v == undefined ? v : parseInt(v) | 0;
        this.buttonsize = val;
        this.on_apply_buttonsize(val);
    };

    _pMenu.on_apply_buttonsize = function (val)
    {
        this.on_change_containerRect();
    };

    _pMenu.on_apply_itemaccessibility = function (itemaccessibility)
    {
        var items = this._items;
        if (items)
        {
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                items[i].on_apply_accessibility(itemaccessibility);
            }
        }
    };


    //Accessibility
    _pMenu.set_menuitemaccessibilityrole = function (v)
    {
        //Todo..
    };

    _pMenu.set_menuitemaccessibilityenable = function (v)
    {
        //Todo..
    };

    _pMenu.set_menuitemaccessibilitylabel = function (v)
    {
        //Todo..
    };

    _pMenu.set_menuitemaccessibilitydescription = function (v)
    {
        //Todo..
    };

    _pMenu.set_menuitemaccessibilityaction = function (v)
    {
        //Todo..
    };

    _pMenu.set_menuitemaccessibilitydesclevel = function (v)
    {
        //Todo..
    };


    //===============================================================
    // nexacro.Menu : Menu's Create & Update & destroy
    //===============================================================
    _pMenu.on_create_contents = function ()
    {
        this._createMenu(true);
        /*
        if (this.checkboximage)
        {
            this._load_image(this.checkboximage, 0); // 0 is check_img flg
        }

        if (this.expandimage)
        {
            this._load_image(this.expandimage, 1); // 1 is exp_img flg
        }
        */
    };

    _pMenu.on_created_contents = function ()
    {
        var control = this.getElement();
        if (control)
        {
            var items = this._items;
            if (items)
            {
                var len = this._items.length;
                var item = null;


                for (var i = 0 ; i < len; i++)
                {
                    items[i].on_created();
                }
            }

            if (nexacro._enableaccessibility)
            {
                this._want_arrow = true;
                this._setAccessibilityInfoLevel(this.level);
            }

            if (this._innerdataset && this.enablecolumn)
            {
                this.on_apply_enablecolumn();
            }
            var hotkey_list = this._hot_key_list;
            if (hotkey_list)
            {
                for (var  i=0, len = hotkey_list.length; i<len; i++)
                {
                    this._registerItemHotkey(hotkey_list[i].key);
                }                
            }
            if (this._isSpinVisible())
            {
                this._showSpinButton(true);
                this._rearrangeMenuItems();
            }
            else
            {
                this._showSpinButton(false);
            }
        }
    };


    _pMenu.on_create_contents_command = function ()
    {
        var str = "";

        var items = this._items;
        if (items)
        {
            var len = this._items.length;

            for (var i = 0 ; i < len; i++)
            {
                str += items[i].createCommand();
            }
        }

        return str;
    };

    _pMenu.on_attach_contents_handle = function (win)
    {
        var items = this._items;
        if (items)
        {
            var len = this._items.length;

            for (var i = 0 ; i < len; i++)
            {
                items[i].attachHandle(win);
            }
        }
        if (this._innerdataset && this.enablecolumn)
        {
            this.on_apply_enablecolumn();
        }
        var hotkey_list = this._hot_key_list;
        if (hotkey_list)
        {
            for (var i = 0, len = hotkey_list.length; i < len; i++)
            {
                this._registerItemHotkey(hotkey_list[i].key);
            }
        }
        if (this._isSpinVisible())
        {
            this._showSpinButton(true);
            this._rearrangeMenuItems();
        }
        else
        {
            this._showSpinButton(false);
        }
    };

    _pMenu.on_destroy_contents = function ()
    {
        if (this._popupmenu)
        {
            this._popupmenu.destroy();
            this._popupmenu = null;
        }

        var items = this._items;
        if (items)
        {
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                items[i].destroy();
                items[i] = null;
            }

            this._items = null;
        }
        var hotkey_list = this._hot_key_list;
        if (hotkey_list)
        {
            for(var i = hotkey_list.length - 1; i > -1; i--)
            {
                var item = hotkey_list[i];
                this._unregisterItemHotkey(item.key);
                item = null;
            }
        }
        var items_width = this._items_width;
        if (items_width)
        {
            items_width.length = 0;
        }
        items_width = null;
        hotkey_list = null;
        items = null;
    };

    _pMenu.on_change_containerRect = function (width, height)
    {
        var items = this._items;
        var len = items.length;
        var padding = this._getCSSStyleValue("padding", this._status);

        if (padding)
        {
            height = height - padding.top - padding.bottom;
        }
        var spin_visible = this._isSpinVisible()
        if (spin_visible)
        {
            this._showSpinButton(true);
            this._rearrangeMenuItems();
        }
        else
        {
            var move_flag = this._end_spin_index | 0;
            this._end_spin_index = 0;
            this._showSpinButton(false);
            var items_width = this._items_width;
            var left = 0;
            for (var i = 0; i < len; i++)
            {
                var item = items[i];
                var item_width = items_width[i];
                if (move_flag)
                {
                    item.move(left, 0, item_width, height);
                    left += item_width;
                }
                else
                    item.resize(item_width, height);

            }
        }
    };

    //===============================================================
    // nexacro.Menu : Property
    //===============================================================

    _pMenu.set_autohotkey = function (v)
    {
        var val = nexacro._toBoolean(v);
        if (val != this.autohotkey)
        {
            this.autohotkey = val;
            this.on_apply_autohotkey(val);
        }
    };

    _pMenu.set_captioncolumn = function (v)
    {
        var val = v;
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_captioncolumn(val);
        }

        if (val != this.captioncolumn)
        {
            this.captioncolumn = val;
            this.on_apply_captioncolumn();
        }
    };
    /*
    _pMenu.set_checkboximage = function (v)
    {
        var val = nexacro._toString(v);
        var checkboximage = this.checkboximage;

        if (val != checkboximage)
        {
            this.checkboximage = val;
            this.on_apply_checkboximage();
        }
    };
    _pMenu.set_expandimage = function (v)
    {
        var val = nexacro._toString(v);
        var expandimage = this.expandimage;

        if (val != expandimage)
        {
            this.expandimage = val;
            this.on_apply_expandimage();
        }
    };
    */
    _pMenu.on_apply_captioncolumn = function ()
    {
        var val = this.captioncolumn;

        if (this._innerdataset)
        {
            this._createMenu(false);

            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                var text = this._innerdataset.getColumn(items[i].datarow, this.captioncolumn);
                if (text)
                {
                    items[i].set_text(text);
                }
                else
                {
                    items[i].set_text("");
                }
            }
        }
    };

    _pMenu.set_checkboxcolumn = function (v)
    {
        var val = v;
        if (this._popupmenu)
        {
            this._popupmenu.set_checkboxcolumn(val);
        }

        if (val != this.checkboxcolumn)
        {
            this.checkboxcolumn = val;
            this._createMenu(false);
        }
    };

    _pMenu.set_enablecolumn = function (v)
    {
        if (v != this.enablecolumn)
        {
            this.enablecolumn = v;
            this.on_apply_enablecolumn();
        }
    };

    _pMenu.on_apply_enablecolumn = function ()
    {
        var val = this.enablecolumn;

        if (this._innerdataset)
        {
            this._createMenu(false);

            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                var enabletext = this._innerdataset.getColumn(items[i].datarow, this.enablecolumn);
                if (enabletext)
                {
                    items[i].set_enable(enabletext);
                }
                else
                {
                    items[i].set_enable(true);
                }
            }
        }
        if (this._popupmenu)
        {
            this._popupmenu.set_enablecolumn(this.enablecolumn);
        }
    };

    _pMenu.set_hotkeycolumn = function (v)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_hotkeycolumn(v);
        }

        if (v != this.hotkeycolumn)
        {
            this.hotkeycolumn = v;
            this._createMenu(false);
        }
    };

    _pMenu.set_iconcolumn = function (v)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_iconcolumn(v);
        }

        if (v != this.iconcolumn)
        {
            this.iconcolumn = v;
            this._createMenu(false);
        }
    };

    _pMenu.set_idcolumn = function (v)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_idcolumn(v);
        }

        if (v != this.idcolumn)
        {
            this.idcolumn = v;
            this.on_apply_idcolumn();
        }
    };

    _pMenu.on_apply_idcolumn = function ()
    {
        var val = this.idcolumn;

        if (this._innerdataset)
        {
            this._createMenu(false);

            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                var id = this._innerdataset.getColumn(items[i].datarow, this.idcolumn);
                items[i].id = id ? id : "";
            }
        }
    };

    _pMenu.set_levelcolumn = function (v)
    {
        var val = v;
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_levelcolumn(val);
        }

        if (val != this.levelcolumn)
        {
            this.levelcolumn = val;
            this.on_apply_levelcolumn();
        }
    };

    _pMenu.on_apply_levelcolumn = function ()
    {
        var val = this.levelcolumn;

        if (this._innerdataset)
        {
            this._createMenu(false);

            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                var level = this._innerdataset.getColumn(items[i].datarow, this.levelcolumn);
                items[i].level = level ? level : -1;
            }
        }
    };

    _pMenu.set_userdatacolumn = function (v)
    {
        var val = v;
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            popupmenu.set_userdatacolumn(val);
        }

        if (val != this.userdatacolumn)
        {
            this.userdatacolumn = val;
            this.on_apply_userdatacolumn();
        }
    };

    _pMenu.on_apply_userdatacolumn = function ()
    {
        var val = this.userdatacolumn;

        if (this._innerdataset)
        {
            this._createMenu(false);

            var items = this._items;
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                var userdata = this._innerdataset.getColumn(items[i].datarow, this.userdatacolumn);
                if (userdata)
                {
                    items[i].userdata = userdata;
                }
            }
        }
    };

    _pMenu.setInnerDataset = function (obj)
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

    _pMenu._setInnerDatasetStr = function (str)
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

    _pMenu.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pMenu.set_innerdataset = function (str)
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

    _pMenu.on_apply_innerdataset = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {
            var callback = this._callbackFromDataset;
            ds._setEventHandler("onrowposchanged", callback, this);
            ds._setEventHandler("oncolumnchanged", callback, this);
            ds._setEventHandler("onrowsetchanged", callback, this);
        }
        var control = this.getElement();
        if (control && this.innerdataset)
        {
            this._createMenu(true);
            this.beforeindex = -1;
            this.beforevalue = "";
            this.beforeText = "";
        }
    };

    _pMenu.set_icontextpadding = function (v)
    {
        this._icontextpadding = v;
        this.on_apply_icontextpadding();
    };

    _pMenu.on_apply_icontextpadding = function ()
    {
        if (this._popupmenu)
        {
            this._popupmenu.set_icontextpadding(this._icontextpadding);
        }
    };

    _pMenu.set_hotkeytextgap = function (v)
    {
        this._hotkeytextgap = v;
        this.on_apply_hotkeytextgap();
    };

    _pMenu.on_apply_hotkeytextgap = function ()
    {
        if (this._popupmenu)
        {
            this._popupmenu.set_hotkeytextgap(this._hotkeytextgap);
        }
    };

    _pMenu.on_apply_wordSpacing = function (wordSpacing)
    {
        nexacro.Component.prototype.on_apply_wordSpacing.call(this, wordSpacing);
        this._createMenu();
    };

    _pMenu.on_apply_letterSpacing = function (letterSpacing)
    {
        nexacro.Component.prototype.on_apply_letterSpacing.call(this, letterSpacing);
        this._createMenu();
    };

    //===============================================================
    // nexacro.Menu : Event Handler
    //===============================================================
    _pMenu.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttondown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onlbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttonup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onlbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttondown && this.onrbuttondown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttondown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onrbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttonup && this.onrbuttonup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttonup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onrbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseup", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmousedown", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmousedown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseenter && this.onmouseenter._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseenter", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmouseenter._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseleave && this.onmouseleave._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmouseleave", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);
            return this.onmouseleave._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousemove && this.onmousemove._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuMouseEventInfo(this, "onmousemove", evtinfo_control.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, evtinfo_control, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.onmousemove._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp)
    {
        if (this.ondrag && this.ondrag._has_handlers)
        {
            var dragData = this._getDragData();
            var evtinfo_control = this._getEventInfoComponent(self_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondrag", evtinfo_control.id, dragData, null, this, self_refer_comp, from_comp, refer_comp,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
        }
        return [false];
    };

    _pMenu._getEventInfoComponent = function (refer_comp)
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

    _pMenu.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata,
									button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondrop && this.ondrop._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondrop", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondrop._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragenter && this.ondragenter._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragenter", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondragenter._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragleave && this.ondragleave._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragleave", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
                                button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);

            return this.ondragleave._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata,
										button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.ondragmove && this.ondragmove._has_handlers)
        {
            var evtinfo_control = this._getEventInfoComponent(from_refer_comp);
            var evt = new nexacro.MenuDragEventInfo(this, "ondragmove", evtinfo_control.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, evtinfo_control,
											button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, evtinfo_control.level, evtinfo_control.index, evtinfo_control._bindindex);
            return this.ondragmove._fireUserEvent(this, evt);
        }
        return false;
    };

    _pMenu.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        if (nexacro._enableaccessibility)
        {
            var pThis = this._popupmenu_find(this);
            var item = this._item_find(pThis);
            var popupvisible = this._is_popupmenu_visible(this);
            var menuitem = this._items;

            var item_len = item.length - 1;
            var menuitem_len = menuitem.length - 1;

            var E = nexacro.Event;

            var rootComp = this._getRootComponent(this);
        
            switch (keycode)
            {
                case E.KEY_TAB:

                    menuitem[this._previtemindex].on_apply_mouseover(false);
                    if (!popupvisible)
                    {
                        if (!shift_key && this._menuitemindex == menuitem_len || shift_key && this._menuitemindex < 0)
                        {
                            this._want_tab = false;
                            this._previtemindex = 0;
                            this._menuitemindex = -1;
                        }
                        else
                        {
                            if (shift_key)
                                this._menuitemindex--;
                            else
                                this._menuitemindex++;

                            if (menuitem[this._menuitemindex])
                            {
                                if (nexacro._enableaccessibility)
                                {
                                    this._focus_obj = menuitem[this._menuitemindex];
                                }
                                this._previtemindex = this._menuitemindex;
                                this._menuitemonmouseenter = menuitem[this._menuitemindex];
                                this._item_focus(menuitem[this._menuitemindex], true);
                            }
                            else
                            {
                                if (nexacro._enableaccessibility)
                                {
                                    this._focus_obj = this;
                                }
                                this._want_tab = false;
                                this._previtemindex = 0;
                                this._menuitemindex = -1;
                            }
                        }

                        this._getWindow()._keydown_element._event_stop = true;
                        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                    }
                    else
                    {
                        /* prev select release */
                        if (this._popupitemindex > -1 && this._popupitemindex <= item_len)
                        {
                            this._item_killfocus(item[this._popupitemindex]);
                            item[this._popupitemindex].on_apply_mouseover(false);
                        }

                        if (shift_key)
                            this._popupitemindex--;
                        else
                            this._popupitemindex++;

                        if (this._popupitemindex > item_len)
                        {
                            if (popupvisible)
                            {
                                if (pThis.parent instanceof nexacro.PopupMenu)
                                {
                                    this._previtemindex = pThis.parent._previousitem + 1;
                                    var item = pThis.parent._items;

                                    pThis._closePopup();

                                    if (item.length - 1 < this._popupitemindex)
                                    {
                                        this._popupitemindex = item_len;
                                    }
                                    this._menuitemonmouseenter = item[this._popupitemindex];
                                    this._item_focus(item[this._popupitemindex], true);
                                }
                                else
                                {
                                    this._popupitemindex = -1;
                                    this._menuitemindex++;
                                    pThis._closePopup();
                                    if (menuitem[this._menuitemindex])
                                    {
                                        if (nexacro._enableaccessibility)
                                        {
                                            this._focus_obj = menuitem[this._menuitemindex];
                                        }
                                        this._previtemindex = this._menuitemindex;
                                        this._item_focus(menuitem[this._menuitemindex], true);
                                    }
                                    else
                                    {
                                        this._want_tab = false;
                                        this._previtemindex = 0;
                                        this._menuitemindex = -1;
                                        this.parent._last_focused = this; // for search next focus
                                    }
                                    /* pThis.parent is not PopupMenu */
                                }
                            }
                            else
                            {
                                this._popupitemindex = -1;
                                this._menuitemindex++;
                                pThis._closePopup();
                                if (nexacro._enableaccessibility)
                                {
                                    this._focus_obj = menuitem[this._menuitemindex];
                                }
                                this._previtemindex = this._menuitemindex;
                                this._item_focus(menuitem[this._menuitemindex], true);
                            }
                        }
                        else
                        {
                            if (this._popupitemindex < 0)
                            {
                                if (pThis.parent instanceof nexacro.Menu)
                                {
                                    pThis._closePopup();
                                    this._previtemindex = this._menuitemindex;
                                    this._item_focus(menuitem[this._menuitemindex], true);
                                }
                                else
                                {
                                    this._popupitemindex = pThis.parent._previtemindex - 1;
                                    var item = pThis.parent._items;

                                    pThis._closePopup();

                                    this._item_focus(item[this._popupitemindex], true);
                                }
                            }
                            else
                            {
                                this._item_focus(item[this._popupitemindex], true);
                            }
                        }
                        this._getWindow()._keydown_element._event_stop = true;
                        break;
                    }

                default:
                    break;
            }
        }

        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };


    _pMenu.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var pThis = this._popupmenu_find(this);
        var item = this._item_find(pThis);
        var popupvisible = this._is_popupmenu_visible(this);
        var menuitem = this._items;

        if (menuitem[this._menuitemindex])
            var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);

        if (item[this._popupitemindex])
            var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);

        var item_len = item.length - 1;
        var menuitem_len = menuitem.length - 1;
        var E = nexacro.Event;
        if (nexacro._enableaccessibility)      // Accessibility
        {
            switch (keycode)
            {
                case E.KEY_UP:

                    if (this._focus_obj instanceof nexacro.Menu)
                    {
                        this._menuitemindex = -1;
                        var prev_comp = this.parent.getPrevAccessibilityComponent(pThis);
                        prev_comp._setFocus(false);
                    }
                    else if (this._focus_obj instanceof nexacro._PopupMenuItemControl)
                    {
                        item = this._item_find(pThis);

                        this._item_killfocus(item[this._popupitemindex]);

                        this._popupitemindex--;
                        if (this._popupitemindex < 0)
                        {
                            this._popupitemindex = item_len;
                        }
                        this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
                        this._item_focus(item[this._popupitemindex], true);
                    }
                    else if (this._focus_obj instanceof nexacro._MenuItemControl)
                    {
                        if (popupvisible)
                        {
                            this._showPopup(this._focus_obj);
                            item = this._item_find(pThis);

                            this._item_killfocus(item[this._popupitemindex]);

                            this._popupitemindex--;
                            if (this._popupitemindex < 0)
                            {
                                this._popupitemindex = item_len;
                            }
                            this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
                            this._item_focus(item[this._popupitemindex], true);
                        }
                        else
                        {
                            this._focus_obj = pThis;
                            this._item_focus(this._focus_obj);
                        }
                        /* focusobj in menuitem end */
                    }
                    /* KEY_UP end */
                    break;

                case E.KEY_DOWN:
                    
                    if (this._focus_obj instanceof nexacro.Menu)
                    {
                        this._menuitemindex = 0;
                        this._focus_obj = menuitem[this._menuitemindex];
                        this._item_focus(this._focus_obj, true);
                    }
                    else if (this._focus_obj instanceof nexacro._PopupMenuItemControl)
                    {
                        item = this._item_find(pThis);

                        this._item_killfocus(item[this._popupitemindex]);

                        this._popupitemindex++;
                        if (this._popupitemindex > item_len)
                        {
                            this._popupitemindex = 0;
                        }
                        this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
                        this._item_focus(item[this._popupitemindex], true);
                    }
                    else if (this._focus_obj instanceof nexacro._MenuItemControl)
                    {
                        if (menuexpand == false)
                        {
                            var obj = this._focus_obj;
                            this._showPopup(obj);
                            item = this._item_find(pThis);
                            this._previtemindex = this._menuitemindex;
                            popupvisible = true;
                        }
                        
                        if (popupvisible)
                        {
                            this._item_killfocus(item[this._popupitemindex]);

                            this._popupitemindex++;
                            if (this._popupitemindex > item_len)
                            {
                                this._popupitemindex = 0;
                            }
                            this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
                            if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 8)
                            {
                                nexacro._OnceCallbackTimer.callonce(this, function ()
                                {
                                    this._item_focus(this._focus_obj, true);
                                });
                            }
                            else
                            {
                                this._item_focus(this._focus_obj, true);
                            }                            
                            // popupvisible == true
                        }                        
                        /* focusobj in menuitem end */
                    }
                    /* KEY_DOWN end */
                    break;

                case E.KEY_LEFT:

                    if (popupvisible)
                    {
                        this._previtemindex = this._menuitemindex;
                    }
                    else
                    {
                        this._menuitemindex--;
                        this._previtemindex = this._menuitemindex;
                    }

                    if (this._menuitemindex < 0)
                        this._menuitemindex = menuitem_len;
                    
                    if (popupvisible)
                    {
                        if (pThis.parent instanceof nexacro.PopupMenu)
                        {
                            this._item_killfocus(item[this._popupitemindex]);
                            this._popupitemindex = pThis.parent._previtemindex;
                            var item = pThis.parent._items;

                            pThis._closePopup();

                            this._focus_obj = item[this._popupitemindex];
                            this._menuitemonmouseenter = this._focus_obj;
                            this._item_focus(this._focus_obj, true);
                        }
                        else
                        {
                            this._previtemindex--;

                            if (this._previtemindex < 0)
                                this._previtemindex = menuitem_len;

                            this._menuitemindex = this._previtemindex;

                            var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
                            this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);

                            this._popupitemindex = 0;

                            if (menuexpand)
                            {
                                this._focus_obj = menuitem[this._menuitemindex];
                                this._menuitemonmouseenter = this._focus_obj;
                                this._item_focus(this._focus_obj, true);
                            }
                            else
                            {
                                var rThis = this._popupmenu_find(this);
                                var rItem = this._item_find(rThis);

                                this._item_killfocus(this);

                                this._focus_obj = rItem[this._popupitemindex];
                                this._menuitemonmouseenter = this._focus_obj;
                                if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 8)
                                {
                                    nexacro._OnceCallbackTimer.callonce(this, function ()
                                    {
                                        this._item_focus(this._focus_obj, true);
                                    });
                                }
                                else
                                {
                                    this._item_focus(this._focus_obj, true);
                                }
                            }
                        }
                    }
                    else
                    {
                        pThis._previtemindex = this._menuitemindex;
                        this._focus_obj = menuitem[this._menuitemindex];
                        this._menuitemonmouseenter = this._focus_obj;
                        this._item_focus(this._focus_obj, true);
                    }
                    break;

                case E.KEY_RIGHT:
                    
                    if (popupvisible)
                    {
                        this._popupitemLR++;
                    }
                    else
                    {
                        this._menuitemindex++;
                        this._previtemindex = this._menuitemindex;
                    }

                    if (this._menuitemindex > menuitem_len)
                        this._menuitemindex = 0;
                            
                    if (!menuexpand && popupvisible == true)
                    {                        
                        if (this._popupitemindex == -1)
                        {
                            this._popupitemindex = 0;                            
                        }

                        var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);
                        if (popupexpand)
                        {
                            this._popupitemLR = 0;
                            this._menuitemindex++;

                            if (this._menuitemindex > menuitem_len)
                                this._menuitemindex = 0;                            
                            
                            this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);                            

                            var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
                            if (menuexpand)
                            {
                                this._focus_obj = menuitem[this._menuitemindex];                                
                                this._item_focus(this._focus_obj, true);
                            }
                            else
                            {
                                var rThis = this._popupmenu_find(this);
                                var rItem = this._item_find(rThis);                                
                                                                
                                this._item_killfocus(this);

                                this._popupitemindex = 0;
                                this._focus_obj = rItem[this._popupitemindex];
                                if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 8)
                                {
                                    nexacro._OnceCallbackTimer.callonce(this, function ()
                                    {
                                        this._item_focus(this._focus_obj, true);
                                    });
                                }
                                else
                                {
                                    this._item_focus(this._focus_obj, true);
                                }
                            }
                        }
                        else
                        {
                          pThis.on_notify_menuitem_onmouseenter(item[this._popupitemindex]);
                           var rItem = this._item_find(pThis);

                            this._item_killfocus(this);

                            this._popupitemindex = 0;
                            this._focus_obj = rItem[this._popupitemindex];
                            this._menuitemonmouseenter = this._focus_obj;
                            this._item_focus(this._focus_obj, true);
                        }
                    }
                    else
                    {
                        this._focus_obj = menuitem[this._menuitemindex];
                        this._menuitemonmouseenter = menuitem[this._menuitemindex];
                        this._item_focus(this._focus_obj, true);
                    }
                    break;

                case E.KEY_ENTER:
                    if (this._menuitemonmouseenter)
                    {
                        if (pThis instanceof nexacro.Menu)
                        {
                            pThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
                        }
                        else
                        {
                            var rThis = this._menuitemonmouseenter.parent;
                            rThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
                        }
                    }

                    break;

                case E.KEY_ESC:
                    if (popupvisible)
                    {
                        this._popupitemindex = -1;
                        pThis._closePopup();                        
                        var item = pThis.parent._items[pThis.parent._previtemindex];
                        this._item_killfocus(item);
                        this._focus_obj = item;
                        this._item_focus(item, true);
                    }
                    break;

                default:
                    break;
            }
        }
        else
        {
            /*********************** none Accessibility ***********************/
            switch (keycode)
            {
                case E.KEY_UP:
                    if (popupvisible)
                    {
                        var popupmenu = this._popupmenu;
                        if (popupmenu)
                            popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                    }
                    else
                    {
                         if (menuexpand)
                        {
                             var item = this._items[this._menuitemindex];
                            if (item)
                                this._showPopup(item);
                        }
                        var popupmenu = this._popupmenu;
                        if (popupmenu)
                            popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                    }

                    break;

                case E.KEY_DOWN:
                    if (popupvisible)
                    {
                         var popupmenu = this._popupmenu;
                        if (popupmenu)
                            popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                    }
                    else if (this._menuitemindex > -1)
                    {
                        if (menuexpand)
                        {
                            var item = this._items[this._menuitemindex];
                            if (item)
                                this._showPopup(item);                           
                        }
                        var popupmenu = this._popupmenu;
                        if (popupmenu)
                            popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);                      

                    }
                    else
                        this._select_menuitem(0);
                    break;

                case E.KEY_LEFT:
                    
                    if (popupvisible == true)
                    {
                        if (this._popupmenu)
                        {
                            this._popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                        }
                    }
                    else
                    {   // before sub menu open
                        var previouse_item_index = this._menuitemindex;                       
                        this._select_menuitem(this._getItemIndex(-1), previouse_item_index, popupvisible);
                        
                    }
                    break;

                case E.KEY_RIGHT:
                    if (popupvisible == true)
                    {
                        if (this._popupmenu)
                        {
                            this._popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                        }                    
                    }
                    else
                    {   // before sub menu open
                        var previouse_item_index = this._menuitemindex; 
                        this._select_menuitem(this._getItemIndex(1), previouse_item_index, popupvisible);
                        
                    }
                    break;

                case E.KEY_ENTER:
                    if (popupvisible)
                    {
                        if (this._popupmenu)
                        {
                            this._popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                        }
                    }
                    else
                    {
                        if (menuexpand)
                        {
                            var item = this._items[this._menuitemindex];
                            if (item)
                                this._showPopup(item);
                            var popupmenu = this._popupmenu;
                            if (popupmenu)
                                  popupmenu.on_fire_sys_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
                        }
                        else
                        {
                            this.on_notify_menuitem_onclick(this._items[this._menuitemindex]);
                        }
                        
                    }
                    break;

                case E.KEY_ESC:
                    if (popupvisible)
                    {
                        pThis._closePopup();
                        this._items[this._menuitemindex].on_apply_selected(true);
                    }
                    break;

                default:
                    break;
            }
        }
        return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };
    
    _pMenu._getItemIndex = function (inc)
    {
        //0 just index
        //1 increaed index
        //2 decreased index
        if (inc === undefined)
            inc = 0;
        var menuitemindex = this._menuitemindex + inc;
        var menuitem_len = this._items ? this._items.length - 1 : 0;
        if (menuitemindex > menuitem_len)
            menuitemindex = 0;
        else if (menuitemindex < 0)
            menuitemindex = menuitem_len;
        var item = this._items[menuitemindex];
        if (item && item.enable == false && inc < 5 && inc > -5)
            return this._getItemIndex(inc + inc);
            
        return menuitemindex;
    };

    _pMenu._do_defocus = function (target, bParent)
    {
        var _window = this._getWindow();
        _window._removeFromCurrentFocusPath(target, true);
        target._changeStatus("focused", false);
        if (bParent)
            _window._removeFromCurrentFocusPath(this, false);
    };

    _pMenu._setFocus = function (bResetScroll, dir, bInner)
    {
        var retn = this.setFocus(bResetScroll);
        var menuitem = this._items;
        var menuitem_len = menuitem.length - 1;

        if (menuitem_len > 0)
        {
            if (dir >= 2)
            {
                this._focus_obj = this;
                this._menuitemindex = -1;
            }
            else
            {
                if (dir == 0)
                {
                    this._menuitemindex = 0;
                }
                else if (dir == 1)
                {
                    this._menuitemindex = menuitem_len;
                }
                this._focus_obj = menuitem[this._menuitemindex];
                this._menuitemonmouseenter = this._focus_obj;
                this._item_focus(this._focus_obj, true);
            }
        }
        else
        {
            if (nexacro._enableaccessibility)
            {
                this._focus_obj = this;
            }
            this._previtemindex = 0;
            this._menuitemindex = -1;
            this._do_defocus(this._last_focused, true);
            this._on_focus(true);
        }
        return retn;
    };

    //===============================================================
    // nexacro.Menu : Override
    //===============================================================
    _pMenu.on_notify_menuitem_onmouseleave = function (obj, e)
    {
        this._last_mouseleave_iteminfo.index = obj.index;
        this._last_mouseleave_iteminfo.bindindex = obj._bindindex;
        this._last_mouseleave_iteminfo.level = obj.parent.level;
    };

    _pMenu._select_menuitem = function (nextitemindex, previtemindex, popupvisible)
    {
        var next_item = this._items[nextitemindex > -1 ? nextitemindex : this._menuitemindex];
        var prev_item = this._items[previtemindex];
        this._closePopup();
        //open new popup
            //select
        if (prev_item && nextitemindex != previtemindex)
        {
            //prev_item._changeUserStatus("selected", false);
            prev_item.on_apply_selected(false);
            this._do_defocus(prev_item, false);
            //prev_item._changeStatus("focused", false);
        }
       this._previtemindex = this._menuitemindex = nextitemindex;
        if (popupvisible)   
        {
            this._showPopup(next_item);
            next_item._on_focus(false);
            var popupmenu = this._popupmenu;
            popupmenu._select_menuitem(0);
        }
        next_item.on_apply_selected(true);
    };

    _pMenu.on_notify_menuitem_onmouseenter = function (obj, e)
    {
        var popupmenu = this._popupmenu;
        this._menuitemonmouseenter = obj;
        if (popupmenu)
        {
            if (popupmenu._is_popup())
            {
                if (this.beforeindex != obj.index)
                {                  
                    this.beforeindex = obj.index;
                    popupmenu.cancelPopup();
                    this._showPopup(obj);                    
                    this._previtemindex = this._menuitemindex = obj.index;
                }               
            }
        }
        //var item = this._items;
        //this._menuitemindex = obj.index;
        //item[obj.index].on_apply_mouseover(true);
        return true;
    };

    _pMenu.on_notify_menuitem_onclick = function (obj, e)
    {
        var popuptype = this.popuptype;//this.style.popuptype.value;
        if (obj.enable == false || popuptype == "none")
        {
            return;
        }

        if (nexacro._enableaccessibility)
        {
            this._want_tab = true;
        }
        if (!this._is_alive) return;

        if (this.visible && this._isEnable() && this.enableevent && obj && obj._isEnable())
        {
            var rootComp = this._getRootComponent(obj);

            if (!obj._canExpand)
                this.on_fire_onitemclick(rootComp, "onmenuclick", obj.id, obj.userdata, obj.index, obj.parent.level);
            /*
            var item = this._items[this._menuitemindex];
            if (item)
                this._item_focus(item, false);
            */

            this._item_focus(obj, false);
            obj.on_apply_selected(true);
        }
        if (this._previtemindex != obj.index)
        {
            var item = this._items[this._previtemindex];
            if (item)
                item.on_apply_selected(false);
        }
        this._previtemindex = obj.index;

    };

    _pMenu.on_notify_menuitem_onlbuttondown = function (obj, e)
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            if (popupmenu._is_popup())
            {
                if (this.beforeindex != obj.index)
                {
                    this.beforeindex = obj.index;
                }
                popupmenu.cancelPopup();
                this._menuitemindex = obj.index;
                this._popupitemindex = -1;
            }
        }
        else
        {
            this._menuitemonmouseenter = obj;
            this._menuitemindex = obj.index;
        }

        if (obj._canExpand && obj._isEnable())
        {
            this._showPopup(obj);
            this._is_menu_click = true;
            this._menuitemindex = obj.index;
        }
        this._item_focus(obj, true);
    };

    _pMenu.on_fire_onitemclick = function (obj, id, itemid, itemuserdata, index, level)
    {
        if (this.onmenuclick && this.onmenuclick._has_handlers)
        {
            var evt = new nexacro.MenuClickEventInfo(obj, id, itemid, itemuserdata, index, level);
            this.onmenuclick._fireEvent(this, evt);
        }
    };

    //===============================================================
    // nexacro.Menu : Methods Part
    //===============================================================
    _pMenu.cancelPopup = function ()
    {
        var popupmenu = this._popupmenu;
        if (popupmenu)
        {
            if (popupmenu.isPopup())
            {
                popupmenu.cancelPopup();
            }
            if (this._is_menu_click)
            {
                this._is_menu_click = false;
            }
        }
        return true;
    };

    _pMenu.isPopup = function ()
    {
        return this._isPopupVisible();
    };
    _pMenu.trackPopup = function (index, x, y, bcapture)
    {
        index = parseInt(index);
        this._track_capture = bcapture == undefined ? true : nexacro._toBoolean(bcapture);
        var items = this._items;
        if (items)
        {
            this._showPopup(items[index], x, y, bcapture);
            this._menuitemindex = items[index].index;
            return true;
        }
        return false;
    };

    // ===============================================================================
    // nexacro.Menu : Logical Part
    // ===============================================================================

    _pMenu._createMenu = function (init)
    {
        var control = this.getElement();
        if (control)
        {
            this._deleteMenu();
            var ds = this._innerdataset;

            if (ds && this.captioncolumn && this.captioncolumn && this.idcolumn)
            {
                var left = 0;
                var index = 0;
                var len = ds.getRowCount();
                var text, enable, hotkey, id, level, userdata, size, padding, width, height, border;
                var item;
                //var checkboximage = this.checkboximage;
                var itempadding = null;
                var items_width = this._items_width;
                var items_total_width = this._items_total_width;
                for (var i = 0; i < len; i++)
                {
                    hotkey = ds.getColumn(i, this.hotkeycolumn);
                    id = ds.getColumn(i, this.idcolumn);
                    level = ds.getColumn(i, this.levelcolumn);

                    if (hotkey && this.autohotkey && (i == len - 1 || level >= ds.getColumn(i + 1, this.levelcolumn)))
                    {
                        this._set_hotkey(id, hotkey);
                    }

                    if (level == 0)
                    {
                        text = ds.getColumn(i, this.captioncolumn);
                        enable = ds.getColumn(i, this.enablecolumn);
                        userdata = ds.getColumn(i, this.userdatacolumn);

                        var item = new nexacro._MenuItemControl("item" + i, "absolute", 0, 0, 0, 0, null, null, this);

                        item.userdata = userdata;
                        item._bindindex = i;
                        item.index = index++;
                        item.datarow = i;
                        item.id = id ? id : "";
                        item.level = level;

                        if (text)
                        {
                            item.set_text(text);
                        }
                        /*
                        if (checkboximage)
                        {
                            item.set_icon(checkboximage);
                            item.set_iconPosition("left");

                            width += this._chkImage_width | 0;
                        }
                        */
                        item._setEventHandler("onlbuttondown", this.on_notify_menuitem_onlbuttondown, this);
                        item._setEventHandler("onclick", this.on_notify_menuitem_onclick, this);

                        if (!(nexacro._isTouchInteraction && nexacro._SupportTouch))
                        {
                            item._setEventHandler("onmouseenter", this.on_notify_menuitem_onmouseenter, this);
                            item._setEventHandler("onmouseleave", this.on_notify_menuitem_onmouseleave, this);
                        }

                        if (i == ds.getRowCount() - 1)
                        {
                            item._canExpand = false;
                        }
                        else
                        {
                            level = ds.getColumn(i + 1, this.levelcolumn);
                            if (level <= this.level)
                            {
                                item._canExpand = false;
                            }
                        }

                        item.set_enable(enable == false || enable == "false" ? false : true);
                        item.createComponent();

                        //menuitem padding
                        border = item._getCSSStyleValue("border", this._status);
                        size = item._getTextSize(text);
                        width = Math.ceil(size[0]) + (border ? border.left._width + border.right._width : 0);
                        if (!itempadding)
                            itempadding = item._getCSSStyleValue("padding", item._status);
                        width += (itempadding ? itempadding.left + itempadding.right : 0);
                        height = this._adjust_height - (border ? border.top._width + border.bottom._width : 0);

                        item.move(left,0,width,height);
                        items_width.push(width);
                        items_total_width += width;
                        this._items.push(item);
                        item = null;
                        left += width;
                    }
                }
                if (items_total_width)
                    this._items_total_width = items_total_width;
            }
        }
       
    };

    _pMenu._deleteMenu = function ()
    {
        var list = this._hot_key_list;
        var len = list.length;
        var _form = this._getMainForm();

        for (var i = 0 ; i < len ; i++)
        {
            nexacro._unregisterHotkeyComp(_form, this, list[i].key);
        }

        this._hot_key_list = [];
        this._items_width = [];
        this._items_total_width = 0;

        var items = this._items;
        if (items)
        {
            var len = items.length;
            for (var i = 0; i < len; i++)
            {
                items[i].destroy();
                items[i] = null;
            }

            this._items = [];
        }
    };

    _pMenu._loaded_expImage = function (imgurl, w, h)
    {
        this._expImage_width = w;
        this._expImage_height = h;
    };

    _pMenu._loaded_chkImage = function (imgurl, w, h)
    {
        this._chkImage_width = w;
        this._chkImage_height = h;
    };

    _pMenu._load_image = function (strImageUrl, flag)  // flag : 0 -> checkimg , 1 -> expimg
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
                if (flag) //expimg
                {
                    size = nexacro._getImageSize(val, this._loaded_expImage, this);
                    if (size)
                    {
                        this._expImage_width = size.width;
                        this._expImage_height = size.height;
                    }
                }
                else //checkimg
                {
                    size = nexacro._getImageSize(val, this._loaded_chkImage, this);
                    if (size)
                    {
                        this._chkImage_width = size.width;
                        this._chkImage_height = size.height;
                    }
                }
            }
        }
    };

    _pMenu._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var want_tab = this._want_tab;
        var want_arrow = this._want_arrow;
        this._want_tab = want_tab;
        this._want_arrow = nexacro._enableaccessibility;
        return { want_tab: want_tab, want_return: true, want_escape: false, want_chars: false, want_arrows: want_arrow };
    };

    _pMenu._showPopup = function (obj, x, y, bcapture)
    {
        var popuptype = this.popuptype;
        if (popuptype == "none") return;
        if (this._innerdataset && this.levelcolumn && this.captioncolumn && this.idcolumn && obj._canExpand === true)
        {
            var popupmenu = this._popupmenu;
            //if (bcapture == undefined)  bcaptreu

            if (popupmenu == null)
            {
                popupmenu = this._popupmenu = new nexacro.PopupMenu("popupmenu", "absolute", 0, 0, 0, 0, null, null, this);
                popupmenu._setControl();
                this._setPopupContains(true);

                var color = this.color;
                if (color)
                    popupmenu.set_color(color);
                var font = this.font;
                if (font)
                    popupmenu.set_font(font);

                popupmenu.level = 1;
                popupmenu.index = obj.index;
                popupmenu.datarow = obj.datarow + 1;

                popupmenu.setInnerDataset(this._innerdataset);

                popupmenu.set_iconcolumn(this.iconcolumn);
                popupmenu.set_captioncolumn(this.captioncolumn);
                popupmenu.set_checkboxcolumn(this.checkboxcolumn);
                popupmenu.set_hotkeycolumn(this.hotkeycolumn);
                popupmenu.set_idcolumn(this.idcolumn);
                popupmenu.set_levelcolumn(this.levelcolumn);
                popupmenu.set_userdatacolumn(this.userdatacolumn);
                popupmenu.set_enablecolumn(this.enablecolumn);
                //popupmenu.set_checkboximage(this.checkboximage);
                //popupmenu.set_expandimage(this.expandimage);
                popupmenu.createComponent();
                popupmenu._setEventHandler("oncloseup", this.on_notify_onclosepopup, this);
            }
            else
            {
                popupmenu.datarow = obj.datarow + 1;
            }
            popupmenu.popuptype = this.popuptype;
            popupmenu._track_capture = bcapture;
            if (this._icontextpadding)
                popupmenu.set_icontextpadding(this._icontextpadding);
            if (this._hotkeytextgap)
                popupmenu.set_hotkeytextgap(this._hotkeytextgap);
            if (this.popupitemheight)
                popupmenu.set_itemheight(this.popupitemheight);
            popupmenu._trackPopup(obj, "vertical", x, y);
            //change status and userstatus 
            //obj._changeUserStatus("selected", true);
/*
            var items = this._items;
            var sel_menu = obj.index;
            items[sel_menu]._changeStatus("focused", true);
            items[sel_menu]._changeUserStatus("selected", true);
*/

            // menu capture
            if (popupmenu._is_popup())
            {
                var _window = this._getWindow();
                if (_window)
                {
                    if (this._track_capture)
                    {
                        _window._setCaptureLock(this, true, false);
                    }
                    else
                    {
                        _window._releaseCaptureLock();
                    }
                }
            }
        }
    };

    _pMenu._isSpinVisible = function ()
    {
        if (this._items_total_width > this._adjust_width)
            return true;
        return false;
    };

    _pMenu._showSpinButton = function (spin_visible)
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
            var spindownbutton_width = 0;
            var spinupbutton_width = 0;

            if (!buttonsize)
            {
                var spinbutton_width = this._getSpinbuttonWidth(spindownbutton, spinupbutton);
                spindownbutton_width = spinbutton_width[0];
                spinupbutton_width = spinbutton_width[1];
            }
            else
            {
                spindownbutton_width = buttonsize;
                spinupbutton_width = buttonsize;
            }
            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();
            spindownbutton.set_visible(true);
            spindownbutton.move(0, 0, spindownbutton_width, client_height);
            spinupbutton.set_visible(true);
            spinupbutton.move(client_width - spinupbutton_width, 0, spinupbutton_width, client_height);
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

    _pMenu._getSpinbuttonWidth = function (spindownbutton, spinupbutton)
    {
        var up_width = 0;
        var down_width = 0;

        var spindownicon = spindownbutton._getCSSStyleValue("icon", "enabled");
        if (spindownicon)
        {
            var img_size = nexacro._getImageSize(spindownicon.url, null, this);
            if (img_size)
            {
                down_width = img_size.width;
                var padding = spindownbutton._getCSSStyleValue("padding", this._status);
                var border = spindownbutton._getCSSStyleValue("border", this._status);
                if (padding)
                    down_width += padding.left + padding.right;
                if (border)
                {
                    if (border._single)
                    {
                        down_width += border.top._width + border.top._width;
                    }
                    else
                    {
                        down_width = border.left._width + border.right._width;
                    }
                }

                this._spindown_width = down_width;
            }
        }
        var spinupicon = spinupbutton._getCSSStyleValue("icon", "enabled");
        if (spinupicon)
        {
            var img_size = nexacro._getImageSize(spinupicon.url, null, this);
            if (img_size)
            {
                up_width = img_size.width;
                var padding = spinupbutton._getCSSStyleValue("padding", this._status);
                var border = spinupbutton._getCSSStyleValue("border", this._status);
                if (padding)
                    up_width += padding.left + padding.right;
                if (border)
                {
                    if (border._single)
                    {
                        up_width += border.top._width + border.top._width;
                    }
                    else
                    {
                        up_width = border.top._width + border.bottom._width;
                    }
                }
                this._spinup_width = up_width;
            }
        }
        return [down_width, up_width];
    };

    _pMenu._spinup = function ()
    {
        var threshold = this._items.length;
        if (this._end_spin_index < threshold)
        {
            if (this._start_spin_index == 0)
               this.spindownbutton._changeStatus("disabled", false);
            this._start_spin_index++;
        }
        this._rearrangeMenuItems();
        if (this._end_spin_index == threshold)
        {
             this.spinupbutton._changeStatus("disabled", true);
        }
    };

    _pMenu._spindown = function ()
    {
        var start_index = this._start_spin_index;
        if (start_index > 0)
        {
            if (this._items.length  == this._end_spin_index)
                this.spinupbutton._changeStatus("disabled", false);
            start_index--;
            if (start_index == 0)
            {
                this.spindownbutton._changeStatus("disabled", true);
            }
        }
        this._start_spin_index = start_index;
        this._rearrangeMenuItems();
       
    };

    _pMenu._createSpinButton = function ()
    {
        var spindownbutton = new nexacro.Button("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);
        spindownbutton._setControl("ButtonControl");
        spindownbutton.createComponent();
        spindownbutton.set_visible(true);
        spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);
        spindownbutton.on_created();
        spindownbutton._changeStatus("disabled", true);
        this.spindownbutton = spindownbutton;

        var spinupbutton = new nexacro.Button("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
        spinupbutton._setControl("ButtonControl");
        spinupbutton.createComponent();
        spinupbutton.set_visible(true);
        spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
        spinupbutton.on_created();
        this.spinupbutton = spinupbutton;
    };

    _pMenu.on_notify_spinup_onclick = function ()
    {
        this._closePopup();
        this._spinup();
    };

    _pMenu.on_notify_spindown_onclick = function ()
    {
        this._closePopup();
        this._spindown();
    };

    _pMenu._rearrangeMenuItems = function ()
    {
        var start_spin_index = this._start_spin_index;
        var items_width = this._items_width;
        var items_total_width = this._items_total_width;
        var client_width = this._getClientWidth();
        var items = this._items;        
        var left = this.buttonsize || this._spindown_width;
        var spinup_width = this.buttonsize || this._spinup_width;
        var sum_itemwidth = left + spinup_width;
        var height = parseInt(this.height);
        var len = items_width.length;
        var end_spin_index = this._end_spin_index;
        for (var i = 0, end = start_spin_index; i < end; i++)
        {
            items[i].move(0, 0, 0, 0);
        }
        for (var i = start_spin_index; i < len; i++)
        {
            var item = items[i];
            var item_width = items_width[i];
            sum_itemwidth += item_width;
            if (i == start_spin_index || sum_itemwidth < client_width)
                item.move(left, 0, item_width, height);
            else
            {                
                break;
            }
            end_spin_index = i +1;
            left += item_width;
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

    _pMenu._getPopupControl = function ()
    {
        var rootcomp = this._getRootComponent(this);
        return rootcomp._popupmenu;
    };

    _pMenu.on_get_popupControlTypeName = function ()
    {
        var rootcomp = this._getRootComponent(this);
        return rootcomp._type_name;
    };

    _pMenu._isPopupVisible = function ()
    {
        var popupmenu = this._popupmenu;
        return popupmenu ? popupmenu._is_popup() : false;
    };

    _pMenu._callbackFromDataset = function (obj, e)
    {
        this._createMenu();
    };

    _pMenu._closePopup = function ()
    {
        var popup = this._popupmenu;

        if (this._is_menu_click)
        {
            this._is_menu_click = false;
        }

        if (popup)
        {
            popup.cancelPopup();

            var _window = this._getWindow();
            if (_window && this._track_capture)
            {
                _window._releaseCaptureLock(this);
            }
        }
        this._popupitemindex = -1;
    };

    _pMenu.on_fire_onkillfocus = function (obj, fromObj)
    {
        this._closePopup();
        var cur_index = this._menuitemindex;
        if (cur_index > -1)
        {
            var item = this._items[cur_index];
            item.on_apply_selected(false);
        }
        var lastfocuseditem = this._last_focused;
        if (lastfocuseditem && lastfocuseditem != obj)
            this._do_defocus(lastfocuseditem, true);
            //lastfocuseditem._changeStatus("focused", false);
        nexacro.Component.prototype.on_fire_onkillfocus.call(this, obj, fromObj);
    };

    _pMenu.on_notify_onclosepopup = function (obj, e)
    {
        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._releaseCaptureLock(this);
        }
        var items = this._items;
        var prev_sel_menu = this._previtemindex;
        var item = items[prev_sel_menu];
        //this._changeStatus("mouseover", false);
        item.on_apply_selected(false);
    };

    _pMenu._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var list = this._hot_key_list;
        var len = list.length;
        var key = null;
        var modifykey = null;
        var hotkey = this._hotkey;
        if (hotkey)
        {
            if (hotkey._keycode == keycode &&
               (((hotkey._modifierkey & 0x02) == 0x02) == altKey)  &&
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

    _pMenu._unregisterItemHotkey = function (hotkey)
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

    _pMenu._registerItemHotkey = function (hotkey)
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

    _pMenu._set_hotkey = function (id, v)
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
        this._hot_key_list.push(list);
    };

    _pMenu._item_focus = function (obj, bflag)
    {
        var lastfocuedobj = this._last_focused;
        if (lastfocuedobj && lastfocuedobj != obj)
            this._do_defocus(lastfocuedobj, false);
            //lastfocuedobj._changeStatus("focused", false);
        if (lastfocuedobj != obj)
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
            else
            {
                obj._on_focus(false);
            }
            /* need to check , I don't know why this is here.
            if (obj.on_apply_mouseover)
            {                
                obj.on_apply_mouseover(bflag);
            }
            */
            this._last_focused = obj;
        }
    };

    _pMenu._item_killfocus = function (obj)
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
            /* need to check , I don't know why this is here.
            if (obj.on_apply_mouseover)
            {
                obj.on_apply_mouseover(false);
            }
            */
       }
    };

    _pMenu._item_find = function (obj)
    {
        if (obj._popupmenu == null || obj._popupmenu.visible == false)
        {
            return obj._items;
        }
        return obj._popupmenu._items;
    };

    _pMenu._is_popupmenu_visible = function (obj)
    {
        if (obj._popupmenu == null || obj._popupmenu.visible == false)
        {
            return false;
        }
        return true;
    };

    _pMenu._popupmenu_find = function (obj)
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

    _pMenu._popupmenuitem_extend = function (obj)
    {
        return obj._canExpand;
    };
    
    delete _pMenu;

}