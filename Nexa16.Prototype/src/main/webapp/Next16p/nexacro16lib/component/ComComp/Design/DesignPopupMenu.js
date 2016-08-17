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

//==============================================================================
//nexacro.PopupMenu
//==============================================================================
if (nexacro.PopupMenu)
{
    var _pPopupMenu = nexacro.PopupMenu.prototype;  
    _pPopupMenu.createCssDesignContents = function ()
    {
        var obj = new Dataset("PopupMenu_innerdataset", this.parent);
        //obj._setContents("<ColumnInfo><Column id=\"idcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"levelcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"enablecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"captioncolumn\" type=\"STRING\" size=\"256\"/><Column id=\"checkboxcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"hotkeycolumn\" type=\"STRING\" size=\"256\"/><Column id=\"userdatacolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"idcolumn\">New</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">true</Col><Col id=\"captioncolumn\">New</Col></Row><Row><Col id=\"idcolumn\">Open</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"captioncolumn\">Open</Col></Row><Row><Col id=\"enablecolumn\">true</Col><Col id=\"idcolumn\">Save</Col><Col id=\"levelcolumn\">0</Col><Col id=\"captioncolumn\">Save</Col></Row><Row><Col id=\"idcolumn\">SaveAs</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"captioncolumn\">SaveAs</Col></Row><Row><Col id=\"idcolumn\">Exit</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">true</Col><Col id=\"captioncolumn\">Exit</Col></Row></Rows>");
        obj._setContents("<ColumnInfo><Column id=\"idcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"captioncolumn\" type=\"STRING\" size=\"256\"/><Column id=\"levelcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"iconcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"enablecolumn\" type=\"STRING\" size=\"256\"/><Column id=\"checkboxcolumn\" type=\"STRING\" size=\"256\"/><Column id=\"hotkeycolumn\" type=\"STRING\" size=\"256\"/><Column id=\"userdatcolumn\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"idcolumn\">1</Col><Col id=\"captioncolumn\">File</Col><Col id=\"levelcolumn\">0</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">F</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">2</Col><Col id=\"captioncolumn\">New</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+N</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')(</Col></Row><Row><Col id=\"idcolumn\">3</Col><Col id=\"captioncolumn\">Open</Col><Col id=\"levelcolumn\">1</Col><Col id=\"hotkeycolumn\">CTRL+O</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">4</Col><Col id=\"captioncolumn\">Project</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+P</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">5</Col><Col id=\"captioncolumn\">File..</Col><Col id=\"levelcolumn\">2</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+F</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">6</Col><Col id=\"captioncolumn\">Save</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+S</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">7</Col><Col id=\"captioncolumn\">Exit</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">false</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+E</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">8</Col><Col id=\"captioncolumn\">Edit</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">false</Col><Col id=\"hotkeycolumn\">E</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">9</Col><Col id=\"captioncolumn\">Cut</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+X</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">10</Col><Col id=\"captioncolumn\">Copy</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">true</Col><Col id=\"hotkeycolumn\">CTRL+C</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">copy</Col></Row><Row><Col id=\"idcolumn\">11</Col><Col id=\"captioncolumn\">Undo</Col><Col id=\"levelcolumn\">1</Col><Col id=\"checkboxcolumn\">false</Col><Col id=\"hotkeycolumn\">CTRL+U</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">undo</Col></Row><Row><Col id=\"idcolumn\">12</Col><Col id=\"captioncolumn\">View</Col><Col id=\"levelcolumn\">0</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">13</Col><Col id=\"captioncolumn\">1-1</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\">URL('theme://images/img_Step_NS.png')</Col></Row><Row><Col id=\"idcolumn\">14</Col><Col id=\"captioncolumn\">1-2</Col><Col id=\"levelcolumn\">1</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">15</Col><Col id=\"captioncolumn\">1-2-1</Col><Col id=\"levelcolumn\">2</Col><Col id=\"enablecolumn\">true</Col><Col id=\"iconcolumn\"></Col></Row><Row><Col id=\"idcolumn\">16</Col><Col id=\"captioncolumn\">1-2-2</Col><Col id=\"levelcolumn\">2</Col><Col id=\"iconcolumn\"></Col><Col id=\"enablecolumn\">true</Col></Row><Row><Col id=\"idcolumn\">17</Col><Col id=\"captioncolumn\">1-2-2-1</Col><Col id=\"levelcolumn\">3</Col><Col id=\"iconcolumn\">titlebar_icon</Col><Col id=\"enablecolumn\">true</Col></Row></Rows>");
        
        this.set_idcolumn("idcolumn");
        this.set_captioncolumn("captioncolumn");
        this.set_levelcolumn("levelcolumn");
        this.set_iconcolumn("iconcolumn");
        this.set_enablecolumn("enablecolumn");
        this.set_checkboxcolumn("checkboxcolumn");
        this.set_hotkeycolumn("hotkeycolumn");
        this.set_userdatacolumn("userdatacolumn");
        this.parent.addChild(obj.name, obj);
        this.set_innerdataset("PopupMenu_innerdataset");
       
    };

    _pPopupMenu.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	//nexacro.Component.prototype.showCssDesignContents.call(this, objpath, status, statusvalue, userstatus, userstatusvalue);
        
        var form = this.parent;
        var offset_left = (form._adjust_width / 4) - (this._adjust_width / 2);
        var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
        if (this.isPopup())
        {
         //  this._closePopup();
           this.trackPopup(offset_left, offset_top);
        }
        else
        {
            this.trackPopup(offset_left, offset_top);
        }
        var obj = this._items[0];
        if (obj)
        {
            obj._changeUserStatus("selected", true);
            this._showPopup(obj);
        }        
    };

    _pPopupMenu.updatePreviewPosition = function ()
    {
        var form = this.parent;
        var offset_left = (form._adjust_width / 4) - (this._adjust_width / 2);
        var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);
        this.move(offset_left, offset_top);
    };
    
    _pPopupMenu.destroyCssDesignContents = function ()
    {
        if (this.isPopup())
        {
            this._closePopup();
        }
        var popupmenu = this._popupmenu;
        if (popupmenu)
            popupmenu.destroy();
        var obj = this.parent.removeChild("PopupMenu_innerdataset");
        obj.destroy();
    };
    // ===============================================================================
    // nexacro.PopupMenu : Create & Destroy & Update
    // ===============================================================================
    
    _pPopupMenu.on_create_contents = function ()
    {
        //nexacro.Component.prototype.on_create_contents.call(this);
    };
     
    _pPopupMenu.on_created_contents = function (_window)
    {
        //nexacro.Component.prototype.on_created_contents.call(this);
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
        }
        if (!this._isPreviewMode())
            this.set_visible(true);
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
                    if (level == this.level)
                    {
                        var text = ds.getColumn(rowlength, this.captioncolumn);
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
                        /* 확인 필요함.
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
                        */
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
                        //popupmenuitem.userdata = userdata;
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
                        this._items.push(popupmenuitem);

                        //this._lineItems.push(popupmenuitem);
                    }
                    else if (level < this.level)
                    {
                        break;
                    }

                }
            }
        }
        this._reCalcSize();
    };
    
    _pPopupMenu.on_created = function (_window)
    {
        if (!this._is_created)
        {
            nexacro.Component.prototype.on_created.call(this, _window);
        }        
    };    

    _pPopupMenu.createComponent = function (bCreateOnly)
    {
        //this._is_window = this._isPreviewMode();
        return nexacro.Component.prototype.createComponent.call(this, bCreateOnly);        
    };

    // ===============================================================================
    // nexacro.PopupMenu : Properties
    // ===============================================================================
    
    _pPopupMenu.set_visible = function (v)
    {
        nexacro.Component.prototype.set_visible.apply(this, arguments);
    };
    
    _pPopupMenu.on_apply_innerdataset = function ()
    {        
        this._createPopupMenu();
        this.beforeindex = -1;
        this.beforevalue = "";
        this.beforeText = "";
    };
    
    _pPopupMenu._reCalcSize = function ()
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
            //var textwidth = parseInt(caption_size[0]);
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
                item_h = itemheight + itemborder_t + itemborder_b;
            }

            var gap = icontextpadding = this._hotkeytextgap;


            if (!this._is_subcontrol || this.level == 0)
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

            if (this._isPreviewMode())
                this.resize(width + border_left + border_right, height + border_top + border_bottom);
            var _item_top = 0;

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

            var items = this._items;
            for (var i = 0, len = items.length; i < len; i++)
            {
                var item = items[i];
                item.move(0, _item_top, width, item_h);
                _item_top += item_h;
            }
        }
    };

    // ===============================================================================
    // nexacro.PopupMenu : Logical Parts
    // =============================================================================== 
    /*
    _pPopupMenu._getTextSize = function (text)
    {
        var font = this._getCurrentStyleInheritValue("font");
        return nexacro._getTextSize(text, font);
    };    
    */
    delete _pPopupMenu;

    // ===============================================================================
    // nexacro._PopupMenuItemControl
    // =============================================================================== 
    var _pPopupMenuItemControl = nexacro._PopupMenuItemControl.prototype;
   
    delete _pPopupMenuItemControl;
}