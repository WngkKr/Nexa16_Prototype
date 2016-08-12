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
// nexacro.TabIndexChangeEventInfo
//==============================================================================    
nexacro.TabIndexChangeEventInfo = function (obj, id, postindex, preindex)
{
    this.id = this.eventid = id || "ontabindexchange";
    this.fromobject = this.fromreferenceobject = obj;

    this.postindex = postindex;
    this.preindex = preindex;
};
var _pTabIndexChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangeEventInfo);
nexacro.TabIndexChangeEventInfo.prototype = _pTabIndexChangeEventInfo;
_pTabIndexChangeEventInfo._type_name = "TabIndexChangeEventInfo";

delete _pTabIndexChangeEventInfo;

//====================================================================
// nexacro.TabMouseEventInfo
//====================================================================
nexacro.TabMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
{
    nexacro.MouseEventInfo.call(this, obj, id || "onextrabuttonclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

    this.index = index;
};
var _pTabMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseEventInfo);
nexacro.TabMouseEventInfo.prototype = _pTabMouseEventInfo;
_pTabMouseEventInfo._type_name = "TabMouseEventInfo";

delete _pTabMouseEventInfo;

if (!nexacro.Tab)
{
    nexacro.Tab = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._tabbuttonitems = [];                  //nexacro.TabButtonItem
        this.tabpages = new nexacro.Collection();   //nexacro.Tabpage
    };
    var _pTab = nexacro._createPrototype(nexacro.Component, nexacro.Tab);
    nexacro.Tab.prototype = _pTab;

    _pTab._type_name = "Tab";  
    _pTab.spinupbutton = null;                  //nexacro.spin
    _pTab.spindownbutton = null;                //nexacro.spin

    /* default properties */
    _pTab.multiline = false;
    _pTab.tabindex = -1;
    _pTab.focusacceptable = false;
    _pTab.usecontrolkey = true;
    _pTab.rotatetext = false;
    _pTab.tabjustify = false;
    _pTab.selectchangetype = "down";
    _pTab.tabposition = "top";
    _pTab.extrabutton = null;
    _pTab.preload = false;

    /* accessibility */
    _pTab._accessibility_role = "Tab";

    _pTab._default_spinbutton_size = { width: 14, height: 14 };
    _pTab._extrabutton_size;    // {width,height}

    _pTab._spinupbutton_size = null;
    _pTab._spindownbutton_size = null;
    _pTab._is_containerset = true;

    _pTab._event_list =
      {
          "onclick": 1, "ondblclick": 1, "onkeypress": 1, "onkeydown": 1, "onkeyup": 1, "onkillfocus": 1, "onsetfocus": 1,
          "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1, "onlbuttondown": 1, "onlbuttonup": 1,
          "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1, "onrbuttondown": 1, "onrbuttonup": 1,
          //added event
          "onchanged": 1, "onspin": 1, "canchange": 1, "oneditclick": 1, "onextrabuttonclick": 1, "onmouseup": 1, "onmousedown": 1,
          // Touch,TouchGesture
          "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
      };

    /* internal variable */

    // ====================================================================
    // nexacro.Tab : Create & Update
    // ====================================================================
    _pTab.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            control_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
           
            this._createSpinButton(true);
            this._createTabpages(true);
            this._createTabButtons(true);
        }
    };

    _pTab.on_created_contents = function (_window)
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;

        if (this.spindownbutton)
        {
            this.spindownbutton.on_created(_window);
        }

        if (this.spinupbutton)
        {
            this.spinupbutton.on_created(_window);
        }

        for (var i = 0; i < tabpages_length; i++)
        {
            tabpages[i].on_created(_window);
        }

        for (var i = 0; i < tabbuttonitems_length; i++)
        {
            tabbuttonitems[i].on_created(_window);
        }
        this._is_created = true;
        this.on_apply_tabindex(this._init_tabindex);
        this._rearrangeContents();
    };

    _pTab.on_destroy_contents = function ()
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;

        this.tabpages;

        if (this.spindownbutton)
        {
            this.spindownbutton.destroy();
            this.spindownbutton = null;
        }

        if (this.spinupbutton)
        {
            this.spinupbutton.destroy();
            this.spinupbutton = null;
        }

        for (var i = tabbuttonitems_length - 1; i >= 0 ; i--)
        {
            tabbuttonitems[i].destroy();
            tabbuttonitems.splice(i, 1);
        }

        for (var i = tabpages_length - 1; i >= 0 ; i--)
        {
            tabpages[i].destroy();
        }

        this.tabpages.clear();

        this.tabpages = null;
        this._tabbuttonitems = null;
    };

    _pTab.on_create_contents_command = function ()
    {
        var str = "";

        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;

        if (this.spindownbutton)
        {
            str += this.spindownbutton.createCommand();
        }

        if (this.spinupbutton)
        {
            str += this.spinupbutton.createCommand();
        }
        
        for (var i = 0; i < tabpages_length; i++)
        {
            str += tabpages[i].createCommand();
        }
        
        for (var i = 0; i < tabbuttonitems_length; i++)
        {
            str += tabbuttonitems[i].createCommand();
        }

        return str;
    };

    _pTab.on_attach_contents_handle = function (win)
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;

        if (this.spindownbutton)
        {
            this.spindownbutton.attachHandle(win);
        }

        if (this.spinupbutton)
        {
            this.spinupbutton.attachHandle(win);
        }

        for (var i = 0; i < tabpages_length; i++)
        {
            tabpages[i].attachHandle(win);
        }

        for (var i = 0; i < tabbuttonitems_length; i++)
        {
            tabbuttonitems[i].attachHandle(win);
        }

        this._is_created = true;
        this.on_apply_tabindex(this._init_tabindex);
        this._rearrangeContents();

        this._init_tabindex = -1;
    };


    _pTab._createSpinButton = function (bCreateOnly)
    {
        if (!this.spindownbutton)
        {
            this.spindownbutton = new nexacro.Button("spindownbutton", this.position, 0, 0, 0, 0, null, null, this);
            this.spindownbutton._setControl("spindownbuttonTab");
            this.spindownbutton.createComponent(bCreateOnly);
            this.spindownbutton.set_visible(false);
            this.spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);
        }

        if (!this.spinupbutton)
        {
            this.spinupbutton = new nexacro.Button("spinupbutton", this.position, 0, 0, 0, 0, null, null, this);
            this.spinupbutton._setControl("spinupbuttonTab");
            this.spinupbutton.createComponent(bCreateOnly);
            this.spinupbutton.set_visible(false);
            this.spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
        }
    };

    _pTab._createTabpages = function (bCreateOnly)
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabpage, tabbutton;
        var tabindex = this.tabindex;

        for (var i = 0; i < tabpages_length; i++)
        {
            tabpage = tabpages[i];

            
            
            tabpage._refobj = this;

            tabpage._preload = this.preload;

            if (tabindex != i)
                tabpage.set_visible(false);

            if (!tabpage._is_created)
                tabpage.createComponent(bCreateOnly);
        }
    };

    _pTab._createTabButtons = function (bCreateOnly)
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        if (tabpages_length <= 0)
            return;

        for (var i = 0; i < tabpages_length; i++)
        {
            tabbutton = this._createTabbutton(i, tabpages[i], bCreateOnly);
            this._tabbuttonitems.push(tabbutton);
        }
    };

    _pTab._createTabbutton = function (idx, tabpage, bCreateOnly)
    {
        if (!tabpage)
        {
            return null;
        }

        var tabpage_id = tabpage.id;
        var tabpage_text = tabpage.text;
        var tabindex = idx;
        
        var btn = new nexacro._TabButtonItemControl(tabpage_id + "_tabbutton", this.position, 0, 0, 1, 1, null, null, this);
        btn.set_text(tabpage_text);
        btn.createComponent(bCreateOnly);
        btn._tabindex = tabindex;
        tabpage._tabbuttonitem = btn;

        return btn;
    };

    // ====================================================================
    // nexacro.Tab : Property
    // ====================================================================
    _pTab.set_multiline = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.multiline != v)
        {
            this.multiline = v;
            this.on_apply_multiline(v);
        }
        
    };

    _pTab.on_apply_multiline = function (v)
    {
        if (this._is_created)
            this._rearrangeContents();
    };

    _pTab.set_tabindex = function (v)
    {
        var post_idx = parseInt(v) | 0;
        var pre_idx = this.tabindex;
        
        if (post_idx != pre_idx)
        {
            this._oldtabindex = pre_idx;

            if (!this._is_created)
            {
                this._init_tabindex = post_idx;
            }
            else
            {
                this.on_apply_tabindex(post_idx);
                this._rearrangeContents();
            }
        }
    };

    _pTab.on_apply_tabindex = function (v)
    {
        var is_apply_focus = false;

        var form = this._getForm();
        if (form._getTabOrderFirst() instanceof nexacro.Tab && this.parent._last_focused && this.parent._last_focused.name == this.name)
        {
            is_apply_focus = true;
        }

        var bcanchange = this._changeTabIndex(v, is_apply_focus);
        if (bcanchange)
        {
            if (this.enableevent && this._is_created && this._oldtabindex > -1)
            {
                this.on_fire_onchanged(this, v, this._oldtabindex);
            }

            this._rearrangeContents(-1);
        }
        
    };

    _pTab.set_focusacceptable = function (v)
    {
        var v = nexacro._toBoolean(v);
        if (this.focusacceptable != v)
        {
            this.focusacceptable = v;
        }
    };
    
    _pTab.set_usecontrolkey = function (v)
    {
        this.usecontrolkey = nexacro._toBoolean(v);
    };

    _pTab.set_rotatetext = function (v)
    {
        this.rotatetext = v;
        //TODO
    };

    _pTab.on_apply_rotatetext = function (v)
    {
        //TODO
    };

    _pTab.set_tabjustify = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.tabjustify != v)
        {
            this.tabjustify = v;
            this.on_apply_tabjustify(v);
        }
            
    };
    _pTab.on_apply_tabjustify = function (v)
    {
        if (this._is_created)
        {
            this._rearrangeContents();
        }
    };

    _pTab.set_selectchangetype = function (v)
    {
        switch (v)
        {
            case "down": case "up":
                this.selectchangetype = v;
                break;
            default:
                break;
        }    
    };

    _pTab.set_tabposition = function (v)
    {
        var pre_value = nexacro._toString(this.tabposition);
        var post_value = nexacro._toString(v);
        switch (post_value)
        {
            case "left": case "top": case "right": case "bottom":
                if (pre_value != post_value)
                {
                    this.tabposition = post_value;
                    this.on_apply_tabposition(post_value);
                }
                break;
            default:
                return;
        }
        
    };
    _pTab.on_apply_tabposition = function (v)
    {
        if (this._is_created)
            this._rearrangeContents();
    };

    _pTab.set_showextrabutton = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.showextrabutton != v)
        {
            this.showextrabutton = v;
            this.on_apply_showextrabutton(v);
        }
    };
    _pTab.on_apply_showextrabutton = function (v)
    {
        if (this._is_created)
            this._rearrangeContents();
    };

    _pTab.set_preload = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.preload != v)
        {
            this.preload = v;
            this.on_apply_preload(v);
        }
    };

    _pTab.on_apply_preload = function (v)
    {

    };

    //method
    _pTab.getParentContext = function ()
    {
        return this.parent;
    };

    _pTab.insertTabpage = function (strId, nIndex, strUrl, strText)
    {
        var idx = parseInt(nIndex) | 0;

        var tabpages = this.tabpages;
        var tabpages_len = tabpages.length;
        var tabbuttonitems = this._tabbuttonitems;

        var tabpage;
        var oldtabindex;

        for (var i = 0; i < tabpages_len; i++)
        {
            tabpage = this.tabpages[i];
            if (strId == tabpage.text)
            {
                return -1;
            }
        }

        tabpage = new nexacro.Tabpage(strId, this);
        if (!tabpage)
        {
            return -1;
        }

        tabpage._refobj = this;

        if (strText)
            tabpage.set_text(strText);
        else
            tabpage.set_text(strId);

        tabpage._preload = this.preload;
        tabpage.createComponent(false);

        if (idx >= tabpages_len)
            idx = -1;

        oldtabindex = this.tabindex;

        if (this[strId])
        {
            if (this[strId].name == tabpage.name)
            {
                tabpage.destroy();
                tabpage = null;

                return -1;
            }
        }

        var oldtabpage = tabpages[oldtabindex];
        if (oldtabpage) oldtabpage.set_visible(false);

        if (idx == -1)
        {
            this.tabindex = idx = this.tabpages.length;
            this._addChild(strId, tabpage);
        }
        else
        {
            for (i = tabpages_len; i > idx; i--)
            {
                tabbuttonitems[i] = tabbuttonitems[i - 1];
                tabbuttonitems[i]._tabindex += 1;
            }

            this._addChild(strId, tabpage, true, idx);

            this.tabindex = idx;
        }

        tabbuttonitems[idx] = this._createTabbutton(idx, tabpage, false);

        if (strUrl && !this.preload)
            tabpage.set_url(strUrl);

        tabpage.set_visible(true);

        this._rearrangeContents();

        return idx;
    };

    _pTab.removeTabpage = function (nIndex)
    {
        var idx = parseInt(nIndex) | 0;
        var tabpages = this.tabpages;

        var tabpages_len = tabpages.length;
        if (tabpages_len == 0)
        {
            return -1;
        }

        if (tabpages_len > 0)
        {
            var tabpage = tabpages[idx];

            if (!tabpage)
            {
                return -1;
            }

            var confirm_message = tabpage.form._on_beforeclose();
            if (tabpage.form._checkAndConfirmClose(confirm_message) == false)
                return -1;

            if (tabpage == this._last_focused)
                this._last_focused = null;

            tabpage.form._on_close();

            this[tabpage.id] = null;
            delete this[tabpage.id];
            tabpages.delete_item(tabpage.id);

            tabpage.destroy();
            tabpage = null;

            var tabbuttonitems = this._tabbuttonitems;
            var tabbuttonitem = tabbuttonitems[idx];
            if (tabbuttonitem != undefined)
            {
                if (tabbuttonitem == this._tabbutton_obj)
                    this._tabbutton_obj = null;
                if (tabbuttonitem == this._last_focused)
                    this._last_focused = null;

                tabbuttonitem.destroy();
                tabbuttonitem = null;
            }

            tabbuttonitems.splice(idx, 1);

            var tabbuttonitems_len = tabbuttonitems.length;
            for (var i = 0; i < tabbuttonitems_len; i++)
            {
                tabbuttonitems[i]._tabindex = i;
            }
        }

        if (idx != 0 && this.tabindex == idx && this.tabindex == tabbuttonitems_len)
        {
            this.tabindex = idx - 1;
        }
        else if (this.tabindex > idx || tabbuttonitems_len == 0)
        {
            this.tabindex -= 1;
        }

        var newtabpage = tabpages[this.tabindex];
        if (newtabpage)
        {
            newtabpage.set_visible(true);
            if (!this.preload)
                newtabpage._on_apply_url();
        }
        
        if (tabbuttonitems_len > 0)
            this._rearrangeContents();
        
        return 0;
    };

    _pTab.moveTabpage = function (nFromIndex, nToIndex)
    {
        var tabpages = this.tabpages;
        var tabpages_len = tabpages.length;
        if (nToIndex < 0 || tabpages_len <= nToIndex || tabpages_len <= nFromIndex || nFromIndex < 0)
        {
            return -1;
        }

        if (nFromIndex == nToIndex)
        {
            return -1;
        }

        var tabindex = this.tabindex;
        var tabpage = tabpages[tabindex];

        var cur_tabpage_id = tabpage.id;

        var totabpage = tabpages[nToIndex];
        var fromtabpage = tabpages[nFromIndex];

        var tabbuttonitems = this._tabbuttonitems;
        var tobutton = tabbuttonitems[nToIndex];
        var frombutton = tabbuttonitems[nFromIndex];

        tabpages.delete_item(nFromIndex);
        tabpages.insert_item(nToIndex, fromtabpage.id, fromtabpage);

        if (nFromIndex < nToIndex)
        {
            for (var i = nFromIndex + 1; i < tabpages_len; i++)
            {
                tabbuttonitems[i - 1] = tabbuttonitems[i];
                tabbuttonitems[i - 1]._tabindex = i - 1;

                if (i == nToIndex)
                {
                    tabbuttonitems[i] = frombutton;
                    tabbuttonitems[i]._tabindex = i;
                    break;
                }
            }
           
        }
        else
        {
            for (var i = nFromIndex; i > nToIndex; i--)
            {
                tabbuttonitems[i] = tabbuttonitems[i - 1];
                tabbuttonitems[i]._tabindex = i;
            }

            // toindex
            tabbuttonitems[nToIndex] = frombutton;
            tabbuttonitems[nToIndex]._tabindex = nToIndex;
        }

        for (var i = 0; i < tabpages_len; i++)
        {
            if (cur_tabpage_id == tabpages[i].id)
            {
                this.tabindex = i;
            }
        }

        this._rearrangeContents();

        return 0;
    };

    _pTab.getTabpageCount = function ()
    {
        return this.tabpages.length;
    };

    _pTab.getIndex = function (nXPos, nYPos)
    {
        var tabindex = this._getTabIndex(parseInt(nXPos, 10), parseInt(nYPos, 10));
        return tabindex;
    };

    _pTab._getTabIndex = function (nX, nY)
    {
        var tabindex = -1;
        var tabpages_len = this.tabpages.length;
        if (tabpages_len <= 0)
            return tabindex;

        if (nX < 0 || nY < 0)
            return tabindex;

        var tab_width = this._getClientWidth();
        var tab_height = this._getClientHeight();

        var l = 0, t = 0, r = 0, b = 0;
        var tabbuttonitems,tabbuttonitem;

        tabbuttonitems = this._tabbuttonitems;
        for (var i = 0; i < tabpages_len; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            if (tabbuttonitem.visible)
            {
                l = tabbuttonitem._position.left;
                t = tabbuttonitem._position.top;
                b = t + tabbuttonitem._position.height;
                r = l + tabbuttonitem._position.width;

                if (nX >= l && nX <= r && nY >= t && nY <= b)
                {
                    tabindex = i;
                    break;
                }
            }
        }

        return tabindex;
    };

    _pTab._isSpinButtonVisible = function ()
    {
        if (this.spindownbutton.visible || this.spinupbutton.visible)
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    _pTab._getSpinUpButtonSize = function ()
    {
        if (!this._spinupbutton_size)
        {
            var width = 0;
            var height = 0;

            var border = this.spinupbutton._getCSSStyleValue("border");
            var padding = this.spinupbutton._getCSSStyleValue("padding");

            if (border)
            {
                width = border.left._width + border.right._width;
                height = border.top._width + border.bottom._width;
            }

            if (padding)
            {
                width += padding.left + padding.right;
                height += padding.top + padding.bottom;
            }

            var icon = this.spinupbutton._getCSSStyleValue("icon");
            if (icon instanceof Object)
                icon = icon.value;

            if (!icon)
            {
                var size = this._default_spinbutton_size;

                this._spinupbutton_size = { width: 0, height: 0 };
                this._spinupbutton_size.width += size.width + width;
                this._spinupbutton_size.height += size.height + height;
            }
            else
            {
                var iconsize = nexacro._getImageSize(icon, this._onload_spinup_iconimage, this);
                if (iconsize)
                {
                    this._spinupbutton_size = {width:0,height:0};
                    this._spinupbutton_size.width += iconsize.width + width;
                    this._spinupbutton_size.height += iconsize.height + height;
                }
                else
                    return null;
            }
        }
        
        return this._spinupbutton_size;
    };

    _pTab._getSpinDownButtonSize = function ()
    {
        if (!this._spindownbutton_size)
        {
            var width = 0;
            var height = 0;

            var border = this.spindownbutton._getCSSStyleValue("border");
            var padding = this.spindownbutton._getCSSStyleValue("padding");

            if (border)
            {
                width = border.left._width + border.right._width;
                height = border.top._width + border.bottom._width;
            }

            if (padding)
            {
                width += padding.left + padding.right;
                height += padding.top + padding.bottom;
            }

            var icon = this.spindownbutton._getCSSStyleValue("icon");
            if (icon instanceof Object)
                icon = icon.value;

            if (!icon)
            {
                var size = this._default_spinbutton_size;

                this._spindownbutton_size = { width: 0, height: 0 };
                this._spindownbutton_size.width += size.width + width;
                this._spindownbutton_size.height += size.height + height;
            }
            else
            {
                var iconsize = nexacro._getImageSize(icon, this._onload_spinup_iconimage, this);
                if (iconsize)
                {
                    this._spindownbutton_size = { width: 0, height: 0 };
                    this._spindownbutton_size.width += iconsize.width + width;
                    this._spindownbutton_size.height += iconsize.height + height;
                }
                else
                    return null;
            }
        }

        return this._spindownbutton_size;
    };

    _pTab._getTabpageBorder = function ()
    {
        var border;
        var len = this.tabpages.length;
        var tabpage;
        if (len > 0)
        {
            tabpage = this.tabpages[0];
            border = tabpage._getCSSStyleValue("border");
        }

        return border;
    };
   

    _pTab.addChild = function (id, obj)
    {
        this._addChild(id, obj, false);
    };

    _pTab._addChild = function (id, obj, bInsert, nIndex)
    {        
        var ret = -1;
        
        if (id && id.length <= 0)
        {
            return -1;
        }
        if (!obj)
        {
            return -1;
        }

        if (this[id])
        {
            return -1;
        }
        if (!(obj instanceof nexacro.Tabpage))
        {
            return -1;
        }
       
        obj._refform = this._refform;
        
        this[id] = obj;
        if (bInsert && nIndex >= 0)
            this.tabpages.insert_item(nIndex, id, obj);
        else
            this.tabpages.add_item(id, obj);
       
        if (this.preload || (this._init_tabindex >= 0 && this.tabpages[this._init_tabindex] == obj))
        {
            obj._on_apply_url();
        }
    };

    _pTab._getFirstTabbuttonIndex = function ()
    {
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_len = tabbuttonitems.length;
        var tabbuttonitem;
        var v = -1;

        for (var i = 0; i < tabbuttonitems_len; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            if (tabbuttonitem.visible)
            {
                v = i;
                break;
            }
        }

        return v;
    };

    _pTab._adjustSpinPosition = function (v)
    {
        var tabbuttonitems_len = this._tabbuttonitems.length;
        var begin_idx = parseInt(v);
        var first_indext =  this._getFirstTabbuttonIndex();
        if (first_indext >= 0)
            begin_idx += first_indext;
       
        if (begin_idx < 0)
            begin_idx = 0;
        
        if (begin_idx >= tabbuttonitems_len)
            begin_idx = tabbuttonitems_len - 1;

        this._rearrangeContents(begin_idx);
    };

    _pTab._changeTabIndex = function (index, is_apply_focus)
    {
        if (!this._is_created || this.tabindex == index ||
            ((+index) != (+index)) || index < 0 || (this.tabpages && index >= this.tabpages.length))
        {
            return;
        }

        var oldindex = this.tabindex;
        if (oldindex > -1 && this.enableevent)
        {
            var ret = this.on_fire_canchange(this, index, oldindex);
            if (ret == false)
            {
                this._tabbuttonitems[index]._changeUserStatus("selected", false);
                //this._tabbuttonitems[oldindex]._setFocus(false);

                return false;
            }
        }

        var oldtabpage = oldindex > -1 ? this.tabpages[oldindex] : undefined;
        var newtabpage = this.tabpages[index];

        var oldtabtn = oldindex > -1 ? this._tabbuttonitems[oldindex] : undefined;
        var newtabbtn = this._tabbuttonitems[index];

        if (oldtabpage)
        {
            if (oldtabpage.enable)
                oldtabtn._changeStatus("enabled", true);
            else
                oldtabtn._changeStatus("disabled", true);

            oldtabpage.set_visible(false);

            oldtabtn._setAccessibilityStatSelected(false);
        }

        this._oldtabindex = oldindex;
        this.tabindex = index;

        if (newtabpage)
        {
            if (!newtabpage.visible)
            {
                newtabpage.set_visible(true);
                //newtabpage._on_focus(true);
            }

            if (!this.preload)
                newtabpage._on_apply_url(false);

            if (!newtabbtn.visible)
                newtabbtn.set_visible(true);

            newtabbtn._setAccessibilityStatSelected(true);

            if (is_apply_focus)
                newtabbtn._on_focus(true);
            if (newtabpage.enable)
            {
                newtabpage._changeStatus("enabled", true);
            }
            else
            {
                newtabpage._changeStatus("disabled", true);
            }
        }
        else
        {
            if (oldtabpage)
            {
                if (oldtabtn.enable)
                {
                    oldtabtn._changeStatus("focused", true);
                }
                else
                {
                    oldtabtn._changeStatus("disabled", true);
                }
                oldtabpage.set_visible(true);
            }
        }

        return true;
    };

    _pTab._rearrangeContents = function (beginTabindex)
    {
        // arrange tabbuttons
        var tabposition = this.tabposition;
        var bmultiline = this.multiline;
        var btabjustify = this.tabjustify;
        var brotatetext = this.rotatetext & false;  //TODO brotatetext = false;

        var bshowextrabutton = this.showextrabutton;
        var extrabutton_size = this._extrabutton_size;
        var tabindex = this.tabindex;

        var bshowspin = false;
        var spinupbutton = this.spinupbutton;
        var spindownbutton = this.spindownbutton;
        var spinupbutton_size;
        var spindownbutton_size;
        var spindownbutton_enable = false;
        var spinupbutton_enable = false;

        var tabpage_position = { left: 0, top: 0, width: 0, height: 0 };

        var tabbuttonitems_by_line = [];
        var cur_line_width = 0;
        var cur_line_height = 0;
        var cur_line_index = 0;
        var index_in_line = 0;
        var line_count = 0;

        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_len = tabbuttonitems.length;
        var tabbuttonitem;
        var tabbuttonitem_sizeinfo, tabbuttonitem_pos;

        var tab_width = this._getClientWidth();
        var tab_height = this._getClientHeight();
        var tab_border = this.border || this._getCSSStyleValue("border");
        var tab_border_l = tab_border_t = tab_border_r = tab_border_b = 0;
        if (tab_border)
        {
            tab_border_l = tab_border.left._width;
            tab_border_t = tab_border.top._width;
            tab_border_r = tab_border.right._width;
            tab_border_b = tab_border.bottom._width;
        }

        var tabpages = this.tabpages;
        var tabpages_len = tabpages.length;
        var tabpage;

        var tabpage_border = this._getTabpageBorder();
        var tabpage_border_l = tabpage_border_t = tabpage_border_r = tabpage_border_b = 0;

        if (tabpage_border)
        {
            tabpage_border_l = tabpage_border.left._width;
            tabpage_border_t = tabpage_border.top._width;
            tabpage_border_r = tabpage_border.right._width;
            tabpage_border_b = tabpage_border.bottom._width;
        }

        var tab_max_width = tab_width;// - (tab_border_l + tab_border_r);
        var tab_max_height = tab_height;// - (tab_border_t + tab_border_b);

        if (tab_max_width <= 0 || tab_max_height <= 0)
            return;

        tabpage_position.width = tab_width;
        tabpage_position.height = tab_height;

        /* TODO rotatetext
        if (brotatetext && (tabposition == "left" || tabposition == "right"))
            tab_max_width = tab_height;
        */

        var tabbuttonitem_max_size,tabbuttonitem_max_width, tabbuttonitem_max_height;

        tabbuttonitem_max_size = this._getTabbuttonItemsMaxSize();
        
        tabbuttonitem_max_width = tabbuttonitem_max_size[0];
        tabbuttonitem_max_height = tabbuttonitem_max_size[1];

        if (bshowextrabutton)
        {
            if (extrabutton_size)
                tabbuttonitem_max_width += extrabutton_size.width;
            else
                tabbuttonitem_max_width += tabbuttonitem_max_height;
        }
            
        /*START: set tabbuttonitems position , bshowspin*/
        var begin_index = 0;
        var end_index = 0;

        var bovered = false;
        var blastitem = false;
        var bovered_cur_line = false;

        for (var i = 0; i < tabbuttonitems_len; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            tabbuttonitem_sizeinfo = tabbuttonitem._sizeinfo;
            tabbuttonitem_pos = tabbuttonitem._position;
            tabbuttonitem_width = tabbuttonitem_sizeinfo.width;
            tabbuttonitem_height = tabbuttonitem_sizeinfo.height;

            if (bshowextrabutton)
            {
                if (extrabutton_size)
                    tabbuttonitem_width += extrabutton_size.width;
                else
                    tabbuttonitem_width += tabbuttonitem_max_height;
            }

            if (tabposition == "top" || tabposition == "bottom")
            {
                tabbuttonitem_pos.width = tabbuttonitem_width;
                tabbuttonitem_pos.height = tabbuttonitem_max_height;
            }
            else
            {
                tabbuttonitem_pos.width = tabbuttonitem_max_width;
                tabbuttonitem_pos.height = tabbuttonitem_height;
            }                

            cur_line_width += tabbuttonitem_width;
            cur_line_height += tabbuttonitem_height;

            blastitem = ((i + 1) == tabbuttonitems_len);

            if (tabposition == "top" || tabposition == "bottom")
                bovered_cur_line = cur_line_width > tab_max_width;
            else
                bovered_cur_line = cur_line_height > tab_max_height;

            /* TODO rotatetext
            if (brotatetext && (tabposition == "left" || tabposition == "right"))
                bovered_cur_line = cur_line_width > tab_max_width;
            */
                
            if (bovered_cur_line || blastitem)
            {
                if (!bmultiline && bovered_cur_line && !bshowspin)
                {
                    bshowspin = true;

                    spinupbutton_size = this._getSpinUpButtonSize();
                    spindownbutton_size = this._getSpinDownButtonSize();

                    if (!spinupbutton_size || !spindownbutton_size)
                        return;

                    if (tabposition == "top" || tabposition == "bottom")
                    {
                        tab_max_width -= (spinupbutton_size.width + spindownbutton_size.width);
                        if (spinupbutton_size.height > tabbuttonitem_max_height || spindownbutton_size.height > tabbuttonitem_max_height)
                            tabbuttonitem_max_height = (spinupbutton_size.height > spindownbutton_size.height) ? spinupbutton_size.height : spindownbutton_size.height;
                    }
                    else
                    {
                        tab_max_height -= (spinupbutton_size.height + spindownbutton_size.height);
                        if (spinupbutton_size.width > tabbuttonitem_max_width || spindownbutton_size.height > tabbuttonitem_max_width)
                            tabbuttonitem_max_width = (spinupbutton_size.width > spindownbutton_size.width) ? spinupbutton_size.width : spindownbutton_size.width;
                    }


                    i = 0;
                    cur_line_index = 0;
                    cur_line_width = 0;
                    cur_line_height = 0;

                    continue;
                }

                if (bovered_cur_line)
                {
                    end_index = i;
                    cur_line_width -= tabbuttonitem_width;
                    cur_line_height -= tabbuttonitem_height;

                    bovered = true;
                }
                else     // blastitem == true                        
                {
                    end_index = i + 1;
                }
                    
                if (bshowspin) btabjustify = false;

                if (btabjustify || (bmultiline && bovered))
                {
                    var extra_width = tab_max_width - cur_line_width;
                    var extra_height = tab_max_height - cur_line_height;

                    var remainning = 0;
                    if (tabposition == "top" || tabposition == "bottom")
                        remainning = extra_width;
                    else
                        remainning = extra_height;

                    var ratio = 1;

                    for (var j = begin_index; j < end_index; j++)
                    {
                        tabbuttonitem = tabbuttonitems[j];
                        if (bmultiline)
                        {
                            tabbuttonitem._line_index = cur_line_index;
                            tabbuttonitem._index_in_line = j - begin_index;
                        }
                        else
                        {
                            tabbuttonitem._line_index = 0;
                            tabbuttonitem._index_in_line = j;
                        }

                        tabbuttonitem_pos = tabbuttonitem._position;
                        if (tabposition == "top" || tabposition == "bottom")
                        {
                            ratio = tabbuttonitem_pos.width / cur_line_width;
                            if ((j + 1) == end_index)
                                tabbuttonitem_pos.width += remainning;
                            else
                                tabbuttonitem_pos.width += Math.ceil(extra_width * ratio);

                            remainning -= Math.ceil(extra_width * ratio);
                        }
                        else
                        {
                            ratio = tabbuttonitem_pos.height / cur_line_height;
                            if ((j + 1) == end_index)
                                tabbuttonitem_pos.height += remainning;
                            else
                                tabbuttonitem_pos.height += Math.ceil(extra_height * ratio);

                            remainning -= Math.ceil(extra_height * ratio);
                        }
                    }
                }

                if (end_index == tabbuttonitems_len || begin_index == end_index)
                    break;

                cur_line_width = 0;
                cur_line_height = 0;

                begin_index = i;
                cur_line_index++;
                i--;

                continue;
            }
        }

        line_count = cur_line_index + 1;
        cur_line_index = 0;        
        /*END*/

        /*START: set beginTabindex*/

        /******
            beginTabindex     : which is the index of tab to show at first
            beginTabindex < 0 :  which is shown in front of the index of tab in current state
            beginTabindex == undefined or null: the current index of tab is placed the last
        ******/

        if (beginTabindex < 0)
            beginTabindex = this._getFirstTabbuttonIndex();

        if (beginTabindex == undefined || beginTabindex == null)
        {
            var temp_width = 0;
            var temp_height = 0;
            for (var i = tabindex; i >= 0; i--)
            {
                tabbuttonitem = tabbuttonitems[i];
                tabbuttonitem_pos = tabbuttonitem._position;
                temp_width += tabbuttonitem_pos.width;
                temp_height += tabbuttonitem_pos.height;

                if (tabposition == "top" || tabposition == "bottom")
                {
                    if (temp_width <= tab_max_width)
                        beginTabindex = i;
                    else
                        break;
                }
                else
                {
                    if (temp_height <= tab_max_height)
                        beginTabindex = i;
                    else
                        break;
                }
                
            }
        }
        /*END*/

        /*START:  arrange tabbuttonitems*/
        var left = 0;
        var top = 0;
        var pre_tabbuttonitem;
        var pre_line_index = 0;
        var start_line_index = 0;

        if (tabindex > 0)
        {
            tabbuttonitem = tabbuttonitems[tabindex];
            start_line_index = tabbuttonitem._line_index;
        }
                
        for (var i = 0; i < tabbuttonitems_len; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            tabbuttonitem_pos = tabbuttonitem._position;
            cur_line_index = tabbuttonitem._line_index;

            if (bmultiline)
            {
                cur_line_index = (cur_line_index - start_line_index);
                if (cur_line_index < 0)
                    cur_line_index += line_count;
            }
            else
                cur_line_index = 0;

            if (tabposition == "top" || tabposition == "bottom")
            {
                if (pre_line_index != cur_line_index)
                    left = 0;
               
                if (tabposition == "top")
                {
                    
                    if (bmultiline)
                        top = tabbuttonitem_max_height * (line_count - cur_line_index - 1);
                    else
                        top = 0;

                    top += tabpage_border_t;

                    /*
                    if (cur_line_index == 0)
                    {
                        if (tabbuttonitem._tabindex == tabindex)
                            tabbuttonitem._setBorderNone("bottom");
                        else
                            tabbuttonitem._setBorderNone("");
                    }
                      */  
                }
                else //bottom
                {
                    if (bmultiline)
                        top = tab_max_height - tabbuttonitem_max_height * (line_count - cur_line_index);
                    else
                        top = tab_max_height - tabbuttonitem_max_height;

                    top -= tabpage_border_b;

                    /*
                    if (cur_line_index == 0)
                    {
                        if (tabbuttonitem._tabindex == tabindex)
                            tabbuttonitem._setBorderNone("top");
                        else
                            tabbuttonitem._setBorderNone("");
                    }
                      */  
                }
                    
                tabbuttonitem_pos.left = left;
                tabbuttonitem_pos.top = top;

                if (spindownbutton_enable || (!bmultiline && (tabbuttonitem_pos.left + tabbuttonitem_pos.width) > tab_max_width))
                {
                    tabbuttonitem.set_visible(false);
                    spindownbutton_enable = true;
                }
                else
                    tabbuttonitem.set_visible(true);

                if (tabbuttonitem.visible)
                {
                    pre_tabbuttonitem = tabbuttonitems[i - 1];
                    if (pre_tabbuttonitem && !pre_tabbuttonitem.visible)
                        spinupbutton_enable = true;
                    
                    if (!bmultiline && tabbuttonitem._tabindex < beginTabindex)
                        tabbuttonitem.set_visible(false);
                    else
                        left = tabbuttonitem_pos.left + tabbuttonitem_pos.width;
                }
                //TODO rotatetext
                // if (brotatetext && (tabposition == "left" || tabposition == "right"))
                //     need to convert position 
            }
            else        //left,right
            {
                if (pre_line_index != cur_line_index)
                    top = 0;
  
                if (tabposition == "left")
                {
                    if (bmultiline)
                        left = tabbuttonitem_max_width * (line_count - (cur_line_index + 1));
                    else
                        left = 0;

                    left += tabpage_border_l;

                    /*
                    if (cur_line_index == 0)
                    {
                        if (tabbuttonitem._tabindex == tabindex)
                            tabbuttonitem._setBorderNone("right");
                        else
                            tabbuttonitem._setBorderNone("");
                    }
                    */
                }
                else //right
                {
                    if (bmultiline)
                        left = tab_max_width - tabbuttonitem_max_width * (line_count - cur_line_index);
                    else
                        left = tab_max_width - tabbuttonitem_max_width;

                    left -= tabpage_border_r;

                    /*
                    if (cur_line_index == 0)
                    {
                        if (tabbuttonitem._tabindex == tabindex)
                            tabbuttonitem._setBorderNone("left");
                        else
                            tabbuttonitem._setBorderNone("");
                    }*/
                }

                tabbuttonitem_pos.left = left;
                tabbuttonitem_pos.top = top;

                if (spindownbutton_enable || (!bmultiline && (tabbuttonitem_pos.top + tabbuttonitem_pos.height) > tab_max_height))
                {
                    tabbuttonitem.set_visible(false);
                    spindownbutton_enable = true;
                }
                else
                    tabbuttonitem.set_visible(true);
                
                if (tabbuttonitem.visible)
                {
                    pre_tabbuttonitem = tabbuttonitems[i - 1];
                    if (pre_tabbuttonitem && !pre_tabbuttonitem.visible)
                        spinupbutton_enable = true;
                    if (!bmultiline && tabbuttonitem._tabindex < beginTabindex)
                       tabbuttonitem.set_visible(false);
                    else
                       top = tabbuttonitem_pos.top + tabbuttonitem_pos.height;
                }

            }   
                   
            pre_line_index = cur_line_index;
            
            if (bmultiline)
                tabbuttonitem.set_visible(true);

            if (tabbuttonitem.visible)
            {
                if (tabindex == i)
                {
                    tabbuttonitem._changeUserStatus("selected", true);
                }
                else
                {
                    tabbuttonitem._changeUserStatus("selected", false);
                }

                tabbuttonitem.move(tabbuttonitem_pos.left, tabbuttonitem_pos.top, tabbuttonitem_pos.width, tabbuttonitem_pos.height);
                tabbuttonitem._showExtraButton(bshowextrabutton, extrabutton_size);
            }

        }
        /*END*/

        /*START:  set tabpage position*/

        var adjust_count = line_count;
        if (!bmultiline || line_count <= 1)
        {
            adjust_count = 1;
        }

        if (tabposition == "top" || tabposition == "bottom")
        {
            tabpage_position.height -= tabbuttonitem_max_height * adjust_count;
            if (tabposition == "top")
                tabpage_position.top += tabbuttonitem_max_height * adjust_count;
        }
        else
        {
            tabpage_position.width -= tabbuttonitem_max_width * adjust_count;
            if (tabposition == "left")
                tabpage_position.left += tabbuttonitem_max_width * adjust_count;
        }

        for (var i = 0; i < tabpages_len; i++)
        {
            tabpage = tabpages[i];
            
            if (tabpage.visible && i == tabindex)
                tabpage.move(tabpage_position.left, tabpage_position.top, tabpage_position.width, tabpage_position.height);
        }
        /*END*/
        /*START:  set spinbutton position*/
        var spinupbutton = this.spinupbutton;
        var spindownbutton = this.spindownbutton;
        if (!bshowspin)
        {
            spinupbutton.set_visible(false);
            spindownbutton.set_visible(false);
        }
        else
        {
            var spindownbutton_pos = { left: 0, top: 0, width: 0, height: 0 };
            var spinupbutton_pos = { left: 0, top: 0, width: 0, height: 0 };

            spindownbutton_pos.width = spindownbutton_size.width;
            spindownbutton_pos.height = spindownbutton_size.height;

            spinupbutton_pos.width = spinupbutton_size.width;
            spinupbutton_pos.height = spinupbutton_size.height;

            if (tabposition == "top" || tabposition == "bottom")
            {
                spinupbutton_pos.left = tab_max_width;
                spindownbutton_pos.left = spinupbutton_pos.left + spinupbutton_pos.width;

                if (tabposition == "top")
                {
                    spinupbutton_pos.top = tabpage_position.top - spinupbutton_size.height;
                    spindownbutton_pos.top = tabpage_position.top - spindownbutton_size.height;
                }
                else
                {
                    spinupbutton_pos.top = tabpage_position.height;
                    spindownbutton_pos.top = tabpage_position.height;
                }
            }
            else
            {
                spinupbutton_pos.top = tab_max_height;
                spindownbutton_pos.top = spinupbutton_pos.top + spinupbutton_pos.height;

                if (tabposition == "left")
                {
                    spinupbutton_pos.left = tabpage_position.left - spinupbutton_size.width;
                    spindownbutton_pos.left = tabpage_position.left - spindownbutton_size.width;
                }
                else
                {
                    spinupbutton_pos.left = tabpage_position.width;
                    spindownbutton_pos.left = tabpage_position.width;
                }
            }

            spinupbutton.move(spinupbutton_pos.left, spinupbutton_pos.top, spinupbutton_pos.width, spinupbutton_pos.height);
            spindownbutton.move(spindownbutton_pos.left, spindownbutton_pos.top, spindownbutton_pos.width, spindownbutton_pos.height);
            if (!spinupbutton.visible)
                spinupbutton.set_visible(true);
            if (!spindownbutton.visible)
                spindownbutton.set_visible(true);
            
            spinupbutton.set_enable(spinupbutton_enable);
            spindownbutton.set_enable(spindownbutton_enable);

            if (!spinupbutton_enable)
            {
                spinupbutton._changeStatus("mouseover",false);
            }
            if (!spindownbutton_enable)
            {
                spindownbutton._changeStatus("mouseover", false);
            }
        }
        /*END*/
    };

    _pTab._getTabbuttonItemsMaxSize = function ()
    {
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;
        var tabbuttonitem,size;
        var max_width = 0;
        var max_height = 0;
        var bshowextrabutton = this.showextrabutton;
        var width = 0, height = 0;

        this._setTabButtonItemsSizeInfo();

        for (var i = 0; i < tabbuttonitems_length; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            size = tabbuttonitem._sizeinfo;
            if (size)
            {
                width = size.width;
                height = size.height;

                //if (bshowextrabutton)
                //    width += tabbuttonitem._extrabutton_size;
            }
            
            if (height > max_height)
                max_height = height;
            if (width > max_width)
            {
                max_width = width;
            }
        }

        return [max_width, max_height];
    };

    _pTab._setTabButtonItemsSizeInfo = function ()
    {
        var tabbuttonitems = this._tabbuttonitems;
        var tabbuttonitems_length = tabbuttonitems.length;
        var tabbuttonitem;

        for (var i = 0; i < tabbuttonitems_length; i++)
        {
            tabbuttonitem = tabbuttonitems[i];
            tabbuttonitem._setSizeInfo();
        }
    };

    _pTab._onload_extra_iconimage = function (imgurl, width, height)
    {
        this._extrabutton_size = { width: width, height: height };
        this._rearrangeContents();
    };

    _pTab._onload_spinup_iconimage = function (url, width, height)
    {
        this._rearrangeContents();
    };

    _pTab._onload_spindown_iconimage = function (url, width, height)
    {
        this._rearrangeContents();
    };

    _pTab.getOwnerFrame = function ()
    {
        return this._getOwnerFrame();
    };

    _pTab._keydown_filter = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp)
    {
        var tabpagecnt = this.tabpages.length;
        if (tabpagecnt <= 0)
            return false;

        var tabindex = this.tabindex;
        var oldtabindex = this.tabindex;

        var resettabindex = -1;

        switch (keycode)
        {
            case 9: // nexacro.Event.KEY_TAB:
                if (ctrl_key == true && this.usecontrolkey)
                {
                    //html : X, Runtime : O
                    //{
                        if (shift_key != true) //순방향;
                        {
                            if (tabindex < tabpagecnt - 1)
                            {
                                resettabindex = tabindex + 1;
                            }
                            else // last tabindex
                            {
                                resettabindex = 0;
                            }
                        }
                        else
                        {
                            if (tabindex > 0)
                            {
                                resettabindex = tabindex - 1;
                            }
                            else // first tabindex
                            {
                                resettabindex = tabpagecnt - 1;
                            }
                        }

                        if (this._focusobj instanceof nexacro._TabButtonItemControl)
                        {
                            this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
                        }
                        else if (this._focusobj instanceof nexacro.Tabpage)
                        {
                            this._setTabFocusObj(this.tabpages[resettabindex]);
                        }
                        break;
                    //}
                }
                else
                {
                    //focusacceptable=false이면 tabpage,tabpage내 component 순서로 이동;shift는 역순;
                    if (this._focusobj instanceof nexacro.Tab)
                    {
                        if (shift_key == false)
                        {
                            if (this.focusacceptable)
                            {
                                this._setTabFocusObj(this._tabbuttonitems[tabindex]);
                            }
                            else
                            {
                                var tabpage = this.tabpages[tabindex];
                                var page_first_comp = tabpage.form._getTabOrderFirst();
                                if (page_first_comp)
                                {
                                    if (tabpage.form._last_focused)
                                    {
                                        var win = this._getWindow();
                                        win._removeFromCurrentFocusPath(tabpage.form._last_focused);
                                    }
                                    page_first_comp._setFocus(false, 0);
                                }
                                this._setTabFocusObj(obj);
                            }
                        }
                        else
                        {
                            var newfocus_comp = this.parent._searchPrevTabFocus(this);
                            if (newfocus_comp)
                            {
                                if (newfocus_comp[0] == null)
                                {
                                    // MainForm 내에서 처음 또는 끝에 도달한 경우임.
                                    if (newfocus_comp[2] == 1)
                                    {
                                        // "마지막 컴포넌트 입니다."
                                    	// TODO Accessibility API로 연결
                                    	var application = nexacro.getApplication();
                                    	if (application)
                                    	{
                                    		var text = application.accessibilitylastovertext;
                                    		nexacro.__notifyAccessibility(this._control_element, text);
                                    	}
                                    }
                                    else if (newfocus_comp[2] == -1)
                                    {
                                        // "첫번째 컴포넌트 입니다."
                                    	// TODO Accessibility API로 연결
                                    	var application = nexacro.getApplication();
                                    	if (application)
                                    	{
                                    		var text = application.accessibilityfirstovertext;
                                    		nexacro.__notifyAccessibility(this._control_element, text);
                                    	}
                                    }
                                }
                                else
                                {
                                    if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
                                    {
                                        var win = this._getWindow();
                                        win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
                                    }

                                    // newfocus_comp가 최종 포커스 받을 대상이 된다.
                                    // newfocus_comp가 Container Type인 경우, 내부 컴포넌트가 모두 포커스를 받을 수 없는
                                    // 상황이다. 이 경우 더이상 내부로 진입시키면 안된다. -> block_inner_focus = true
                                    newfocus_comp[0]._setFocus(true, 1, true);
                                }
                            } // newfocus_comp
                        } // shift_key == true
                    }
                    else if (this._focusobj instanceof nexacro._TabButtonItemControl)
                    {
                        if (shift_key == false)
                        {
                            var tabpage = this.tabpages[tabindex];
                            if (tabpage.form._last_focused)
                            {
                                tabpage.form._last_focused = null;
                            }
                            var newfocus_comp = tabpage.form._searchNextTabFocus(null, undefined, undefined, false);

                            if (newfocus_comp && newfocus_comp[0])
                            {
                                newfocus_comp[0]._setFocus(true, 0, true);
                            }
                            this._setTabFocusObj(tabpage);
                        } // shift_key == false
                        else
                        {
                            //tab button에서 shift + tab 동작시 form에게 focus처리를 맡김.
                            return false;
                        }
                    }
                    else if (this._focusobj instanceof nexacro.Tabpage)
                    {
                        var tabpage = this._focusobj;
                        var page_last_comp = tabpage.form._getLastFocused();
                        var page_first_comp = tabpage.form._getTabOrderFirst();
                        var dlgc = undefined;

                        if (page_last_comp)
                        {
                            dlgc = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
                        }

                        if (!dlgc || (dlgc.want_tab == false))
                        {
                            if (shift_key == false)
                            {
                                if (!page_last_comp && page_first_comp)
                                {
                                    page_first_comp._setFocus(false, 0);
                                }
                                else
                                {
                                    var page_next_comp = tabpage.form._searchNextTabFocus(page_last_comp);
                                    if (page_next_comp && page_next_comp[0])
                                    {
                                        page_next_comp[0]._setFocus(false, 0);
                                    }
                                }
                            }
                            else
                            {
                                if (page_last_comp == null) // tabpage focus
                                {
                                    if (this.focusacceptable())
                                    {
                                        this._setTabFocusObj(this._tabbuttonitems[tabindex]);
                                    }
                                    else
                                    {
                                        this._setTabFocusObj(this);
                                    }
                                    tabpage._setFocus(false, 1);
                                }
                                else if (page_last_comp == page_first_comp) //tabpage first component focus
                                {
                                    if (this.focusacceptable)
                                    {
                                        this._setTabFocusObj(this._tabbuttonitems[tabindex]);
                                        this._tabbuttonitems[tabindex]._setFocus(false, 1);
                                    }
                                    else
                                    {
                                        this._setTabFocusObj(this);                                        
                                    }
                                }
                                else
                                {
                                    var page_prev_comp = tabpage.form._searchPrevTabFocus(page_last_comp);
                                    if (page_prev_comp && page_prev_comp[0])
                                    {
                                        page_prev_comp[0]._setFocus(false, 1);
                                    }
                                }
                            } //shift_key == true
                        } // check dlgcode
                    } //focusobj == TabPage 
                    return true;
                }
                break;
            case 8: // CY_VK_BACK:
                if (ctrl_key == true && this.usecontrolkey)
                {
                    this.on_fire_onextrabuttonclick(this, tabindex, "", false, false, false, -1, -1, -1, -1, -1, -1, this, this);

                    return true;
                }
                break;
            case 38: //nexacro.Event.KEY_UP;
                {
                    if (nexacro._enableaccessibility)
                    {
                        //if button -> go tab
                        var focusobj = this._focusobj;
                        var newcomp;
                        if (focusobj instanceof nexacro._TabButtonItemControl)
                        {
                            if (this._isAccessibilityEnable())
                                newcomp = this;

                            if (newcomp)
                            {
                                newcomp._setFocus(true, 3, true);
                                this._setTabFocusObj(newcomp);
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else if (focusobj instanceof nexacro.Tabpage)
                        {
                            var page_last_comp = focusobj._getLastFocused();

                            if (page_last_comp)
                            {
                                var dlg = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
                                if (dlg.want_arrows == false)
                                {
                                    //var first_comp = focusobj.getFirstAccessibilityComponent();                                
                                    newcomp = focusobj.form._searchPrevTabFocus(focusobj._last_focused, undefined, undefined, true)[0];

                                    if (newcomp)
                                    {
                                        if (newcomp == focusobj)
                                        {
                                            var win = newcomp._getWindow();
                                            win._removeFromCurrentFocusPath(newcomp);
                                            newcomp._setFocus(true, 3, true);
                                            this._setTabFocusObj(newcomp);
                                        }
                                        else
                                        {
                                            newcomp._setFocus(true, 3, true);
                                        }
                                    } // newcomp
                                    else
                                    {
                                        return false;
                                    }
                                } // check dlg
                            } // (focusobj._last_focused)
                            else
                            {
                                if (focusobj.parent.focusacceptable)
                                    newcomp = focusobj.parent._tabbuttonitems[focusobj.parent.tabindex];
                                else
                                {
                                    newcomp = focusobj.parent;
                                }

                                if (newcomp)
                                {
                                    newcomp._setFocus(true, 3, true);
                                    this._setTabFocusObj(newcomp);
                                }
                                else
                                {
                                    return false;
                                }
                            }
                        } //(focusobj instanceof nexacro.Tabpage)
                        return true;
                    }
                }
                break;
            case 40: //nexacro.Event.KEY_DOWN:
                {
                    //if button -> go tabpage
                    if (nexacro._enableaccessibility)
                    {
                        var focusobj = this._focusobj;
                        var newcomp;
                        var newcompobj = null;
                        if (focusobj instanceof nexacro.Tab)
                        {
                            if (this.focusacceptable)
                            {
                                newcomp = this._tabbuttonitems[this.tabindex];
                            }
                            else
                            {
                                newcomp = this.tabpages[this.tabindex];
                                if (newcomp._last_focused)
                                {
                                    newcomp._last_focused = null;
                                }
                                if (!newcomp._isAccessibilityEnable())
                                {
                                    newcompobj = newcomp.form._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
                                }
                            }
                        }
                        else if (focusobj instanceof nexacro._TabButtonItemControl)
                        {
                            newcomp = this.tabpages[this.tabindex];
                            if (newcomp._last_focused)
                            {
                                newcomp._last_focused = null;
                            }
                            if (!newcomp._isAccessibilityEnable())
                            {
                                newcompobj = newcomp.form._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
                            }
                        }
                        else if (focusobj instanceof nexacro.Tabpage)
                        {
                            var page_last_comp = focusobj._getLastFocused();
                            var dlgc = undefined;
                            if (page_last_comp)
                            {
                                dlgc = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
                            }

                            if (!dlgc || dlgc.want_arrows == false)
                            {
                                newcompobj = focusobj.form._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
                            }

                        }

                        if (newcompobj && newcompobj[0])
                        {
                            newcomp = newcompobj[0];
                            newcomp._setFocus(true, 2, true);
                        }
                        else
                        {
                            if (newcomp)
                            {
                                newcomp._setFocus(true, 2, true);
                                this._setTabFocusObj(newcomp);
                            }
                        }
                        return true;
                    }
                }
                break;
            case 39: // nexacro.Event.KEY_RIGHT:
                if (this.focusacceptable && ctrl_key == false)
                {
                    var focusobj = this._focusobj;
                    if (focusobj instanceof nexacro._TabButtonItemControl)
                    {
                        if (tabindex < tabpagecnt - 1)
                        {
                            resettabindex = tabindex + 1;
                        }
                        else // last tabindex
                        {
                            resettabindex = 0;
                        }
                        this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
                    }
                }
                break;
            case 37: // nexacro.Event.KEY_LEFT:
                if (this.focusacceptable && ctrl_key == false)
                {
                    var focusobj = this._focusobj;
                    if (focusobj instanceof nexacro._TabButtonItemControl)
                    {
                        if (tabindex > 0)
                        {
                            resettabindex = tabindex - 1;
                        }
                        else // first tabindex
                        {
                            resettabindex = tabpagecnt - 1;
                        }
                        this._setTabFocusObj(this._tabbuttonitems[resettabindex]);
                    }
                }
                break;
            default:
                break;
        }

        if (resettabindex > -1)
        {
            if (this._changeTabIndex(resettabindex, true) == true)
            {
                if (this.enableevent)
                {
                    this.on_fire_onchanged(this, resettabindex, oldtabindex);
                }

                this._rearrangeContents();
            }
        }
    };
    _pTab._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var focusobj = this._focusobj;        
        if (focusobj && !(focusobj instanceof nexacro.Tab))
        {
            return focusobj._getDlgCode(keycode, altKey, ctrlKey, shiftKey);
        }
        else
        {
            return { want_tab: shiftKey ? false : true, want_return: false, want_escape: false, want_chars: false, want_arrows: keycode == nexacro.Event.KEY_UP ? false : true };
        }
    };

    _pTab._setTabFocusObj = function (focusobj)
    {
        this._focusobj = focusobj;
    };

    _pTab._getTabFocusObj = function ()
    {
        return this._focusobj;
    };

    _pTab._getSortedDecendants = function (p, include_not_tabstop, bAccessibility)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return [tabpage.form];
            
        return null;
    };

    _pTab._getTabOrderNext = function (current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getTabOrderNext(current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite);

        return null;

        return this.form._getTabOrderNext(current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite);
    };

    _pTab._getTabOrderFirst = function (bAccessibility, bEditable, edittype, bComposite)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getTabOrderFirst(bAccessibility, bEditable, edittype, bComposite);

        return null;
    };

    _pTab._getTabOrderLast = function (bAccessibility, bEditable, edittype, bComposite)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getTabOrderLast(bAccessibility, bEditable, edittype, bComposite);

        return null;
    };



    _pTab._getHeadingOrderNext = function (current, direction)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getHeadingOrderNext(current, direction);

        return null;
    };

    _pTab._getHeadingOrderFirst = function ()
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getHeadingOrderFirst();

        return null;
    };

    _pTab._getHeadingOrderLast = function ()
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getHeadingOrderLast();

        return null;
    };

    _pTab._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, bAccessibility, bhotkey)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._searchNextTabFocus(current, bSearchFromFirst, opt_force_cycle, bAccessibility, bhotkey);

        return null;
    };

    _pTab._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, bAccessibility, bhotkey)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._searchPrevTabFocus(current, bSearchFromLast, opt_force_cycle, bAccessibility, bhotkey);

        return null;
    };
    _pTab._searchNextHeadingFocus = function (current, bSearchFromFirst, opt_force_cycle)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._searchNextHeadingFocus(current, bSearchFromFirst, opt_force_cycle);

        return null;
    };

    _pTab._searchPrevHeadingFocus = function (current, bSearchFromLast, opt_force_cycle)
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._searchPrevHeadingFocus(current, bSearchFromLast, opt_force_cycle);

        return null;
    };

    _pTab._getLastFocused = function ()
    {
        var tabpage = this.tabpages[this.tabindex];
        if (tabpage)
            return tabpage.form._getLastFocused();
    };
    //===============================================================
    // nexacro.Tab : Override
    //===============================================================

    _pTab._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp)
    {
        return this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
    };

    _pTab._on_bubble_close = function (event_bubbles, fire_comp, refer_comp)
    {
        return this.parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
    };

    _pTab._on_activate = function ()
    {
        nexacro.Component.prototype._on_activate.call(this);

        var tabpage = this.tabpages[this.tabindex];
        if (tabpage && tabpage.form)
            tabpage.form._on_activate();

        return true;
    };

    _pTab._on_deactivate = function ()
    {
        nexacro.Component.prototype._on_deactivate.call(this);

        var tabpage = this.tabpages[this.tabindex];
        if (tabpage && tabpage.form)
            tabpage.form._on_deactivate();
       
        return true;
    };

    _pTab.getOwnerFrame = function ()
    {
        return this._getOwnerFrame();
    };

    _pTab.on_apply_prop_enable = function (v)
    {
        var tabpages = this.tabpages;
        var tabpages_length = tabpages.length;
        var tabpage;
        var spinupbutton = this.spinupbutton;
        var spindownbutton = this.spindownbutton;

        for (var i = 0; i < tabpages_length; i++)
        {
            tabpage = tabpages[i];
            tabpage.set_enable(v);
        }

        if (spinupbutton)
            spinupbutton.set_enable(v);
        if (spindownbutton)
            spindownbutton.set_enable(v);

    };
    //===============================================================
    // nexacro.Tab : Event
    //===============================================================
    _pTab.on_change_containerRect = function (width, height)
    {
        if (this._is_created)
            this._rearrangeContents();
    };


    _pTab.on_fire_user_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            if (from_comp instanceof nexacro.Tabpage)
            {
                rootComp = from_comp;
            }
            var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousedown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_sys_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmousedown && this.onmousedown._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            if (from_comp instanceof nexacro.Tabpage)
            {
                rootComp = from_comp;
            }
            var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmousedown._fireSysEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            if (from_comp instanceof nexacro.Tabpage)
            {
                rootComp = from_comp;
            }
            var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            if (from_comp instanceof nexacro.Tabpage)
            {
                rootComp = from_comp;
            }
            var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onmouseup._fireSysEvent(this, evt);
        }
        return false;
    };

    _pTab._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

        if (!this._focusobj)
        {
            if (this.focusacceptable)
            {
                this._setTabFocusObj(this._tabbuttonitems[this.tabindex]);
                this._tabbuttonitems[this.tabindex]._setFocus();
            }
            else
            {
                this._setTabFocusObj(this.tabpages[this.tabindex]);
            }
        }
    };

    _pTab._on_killfocus = function (new_focus, new_ref_focus)
    {
        if (new_focus === this)
            return;

        if (new_focus == null && new_ref_focus == null)
            return;

        this._focusobj = null;
    };

    _pTab.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        var ret = false;
        if (this.onkeydown && this.onkeydown._has_handlers)
        {
            var tabpage = this.tabpages[this.tabindex];
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, tabpage, tabpage);
            ret = this.onkeydown._fireUserEvent(this, evt);
        }

        if (!this.onkeydown || (this.onkeydown && !this.onkeydown.defaultprevented))
        {
            if (key_code == nexacro.Event.KEY_TAB)
            {
                if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp))
                {
                    this._getWindow()._keydown_element._event_stop = true;
                    return true;
                }
            }
            else if (nexacro._enableaccessibility)
            {
                if (key_code == nexacro.Event.KEY_DOWN || key_code == nexacro.Event.KEY_UP)
                {
                    if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp))
                    {
                        return true;
                    }
                }
            }
        }
        return ret;
    };

    _pTab.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {

        if (this.onkeydown && this.onkeydown._has_handlers)
        {
            var tabpage = this.tabpages[this.tabindex];
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, tabpage, tabpage);
            return this.onkeydown._fireSysEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeyup && this.onkeyup._has_handlers)
        {
            var tabpage = this.tabpages[this.tabindex];

            var evt = new nexacro.KeyEventInfo(tabpage, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeyup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.onkeyup && this.onkeyup._has_handlers)
        {
            var tabpage = this.tabpages[this.tabindex];

            var evt = new nexacro.KeyEventInfo(tabpage, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
            return this.onkeyup._fireSysEvent(this, evt);
        }
        return false;
    };

    _pTab._on_btn_lbuttondown = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        this._tabbutton_obj = obj;
        var ret = nexacro.Component.prototype._on_lbuttondown.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
        this._setTabFocusObj(obj);
        return ret;
    };
    _pTab.on_lbuttondown_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var ret = nexacro.Component.prototype.on_lbuttondown_default_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        if (!this.visible || this._isEnable() == false)
            return ret;

        var tabbutton_obj = this._tabbutton_obj;
        if (tabbutton_obj && tabbutton_obj.name == "extrabutton")
        {
            if (this._tabbuttonitems[tabbutton_obj._tabindex])
                this._tabbuttonitems[tabbutton_obj._tabindex]._setFocus();
        }

        if (tabbutton_obj && this.selectchangetype == "down")
        {
            var idx = tabbutton_obj._tabindex;

            oldindex = this.tabindex;
            var bcanchange = this._changeTabIndex(idx, true);
            if (bcanchange)
            {
                if (this.enableevent && oldindex != this.tabindex)
                {
                    this.on_fire_onchanged(tabbutton_obj, idx, oldindex);
                }
            }

            this._rearrangeContents(-1);
        }

        return ret;
    };

    _pTab.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {

       if (from_refer_comp.name == "extrabutton")
       {
           var tabbutton = from_refer_comp.parent;
           var idx = tabbutton._tabindex;
           if (idx >= 0)
               this.on_fire_onextrabuttonclick(tabbutton, idx, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
       }

        if (this.onlbuttondown && this.onlbuttondown._has_handlers)
        {
            var evt = new nexacro.TabMouseEventInfo(this, "onlbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttondown._fireUserEvent(this, evt);
        }
        return false;
        //return ret;
    };

    _pTab._on_btn_lbuttonup = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        this._tabbutton_obj = obj;
        return nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
    };

    _pTab.on_lbuttonup_default_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        var ret = nexacro.Component.prototype.on_lbuttonup_default_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        if (!this.visible || this._isEnable() == false)
            return ret;

        if (this._tabbutton_obj && this.selectchangetype == "up")
            this._onclick_basic_action(this._tabbutton_obj);

    };

    _pTab.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onlbuttonup && this.onlbuttonup._has_handlers)
        {
            var evt = new nexacro.TabMouseEventInfo(this, "onlbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onlbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab._onclick_basic_action = function (obj, is_tap, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp)
    {
        var idx = obj._tabindex;

        oldindex = this.tabindex;

        var bcanchange = this._changeTabIndex(idx, true);
        if (bcanchange)
        {
            if (this.enableevent && oldindex != this.tabindex)
            {
                this.on_fire_onchanged(obj, idx, oldindex);
            }

            this._rearrangeContents(-1);
        }
    };

    
    _pTab.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (this.onrbuttonup && this.onrbuttonup._has_handlers)
        {
            var evt = new nexacro.TabMouseEventInfo(this, "onrbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttonup._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onrbuttondown && this.onrbuttondown._has_handlers)
        {
            var evt = new nexacro.TabMouseEventInfo(this, "onrbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
            return this.onrbuttondown._fireUserEvent(this, evt);
        }
        return false;
    };

    _pTab.on_fire_onextrabuttonclick = function (obj, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onextrabuttonclick && this.onextrabuttonclick._has_handlers)
        {
            var evt = new nexacro.TabMouseEventInfo(this, "onextrabuttonclick", index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, this);
            return this.onextrabuttonclick._fireEvent(this, evt);
        }
        return true;
    };

    _pTab.on_notify_spinup_onclick = function (obj, e)
    {
        this._adjustSpinPosition(-1);
    };

    _pTab.on_notify_spindown_onclick = function (obj, e)
    {
        this._adjustSpinPosition(1);
    };

    _pTab.on_fire_canchange = function (obj, postindex, preindex)
    {
        this._is_canchange = true;

        if (this.canchange && this.canchange._has_handlers)
        {
            var evt = new nexacro.TabIndexChangeEventInfo(obj, "canchange", postindex, preindex);

            this._is_canchange = this.canchange._fireCheckEvent(this, evt);
            return this._is_canchange;
        }

        return true;
    };

    _pTab.on_fire_onchanged = function (obj, postindex, preindex)
    {
        if (this.onchanged && this.onchanged._has_handlers)
        {
            var evt = new nexacro.TabIndexChangeEventInfo(this, "onchanged", postindex, preindex);
            return this.onchanged._fireEvent(this, evt);
        }

        return true;
    };

    delete _pTab;
}

if (!nexacro.Tabpage)
{
    nexacro.Tabpage = function (id, parent)
    {
        nexacro.Div.call(this, id, "absolute", 0, 0, 0, 0, null, null, parent);
    };
    var _pTabpage = nexacro._createPrototype(nexacro.Div, nexacro.Tabpage);
    nexacro.Tabpage.prototype = _pTabpage;

    _pTabpage._type_name = "TabpageControl";
    _pTabpage._is_subcontrol = true;
    _pTabpage._accessibility_role = "tabpage";

    _pTabpage._preload = false;

    _pTabpage._tabbuttonitem = null;

    _pTabpage.bringToFront = nexacro._emptyFn;
    _pTabpage.bringToPrev = nexacro._emptyFn;
    _pTabpage.moveToNext = nexacro._emptyFn;
    _pTabpage.moveToPrev = nexacro._emptyFn;
    _pTabpage.sendToBack = nexacro._emptyFn;
    _pTabpage.sendToNext = nexacro._emptyFn;
    // ====================================================================
    // nexacro.Tabpage : Create & Update
    // ====================================================================
   
    // ====================================================================
    // nexacro.Tabpage : Property
    // ====================================================================
    _pTabpage.on_apply_text = function (text)
    {
        nexacro.Div.prototype.on_apply_text.call(this, text);

        var tab = this.parent;
        if (tab)
        {
            var btn;
            var btn_len = tab._tabbuttonitems.length;
            for (var i = 0; i < btn_len; i++)
            {
                btn = tab._tabbuttonitems[i];
                if (btn.id == (this.id + "_tabbutton"))
                {
                    btn.set_text(this.text);
                }
            }

            if (tab._is_created)
            {
                tab._rearrangeContents();
            }
        }
    };
    // ====================================================================
    // nexacro.Tabpage : Method
    // ====================================================================
    _pTabpage.set_url = function (v)
    {
        if (v != this.url)
        {
            this.url = v;
            if (this.parent._is_created == true)
            {
                this.url = v;
                this.on_apply_url();
            }
        }
    };

    _pTabpage._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var _want_tab = true;
        var _want_arrow = this._want_arrow;
        if (keycode == nexacro.Event.KEY_TAB)
        {
            if (shiftKey)
            {
                var page_last_comp = this._getLastFocused();
                var page_first_comp = this._getTabOrderFirst();

                if (page_last_comp == null) // tabpage focus
                {
                    if (!this.parent.focusacceptable)
                    {
                        _want_tab = false;
                    }
                }
                else if (page_last_comp == page_first_comp) //tabpage first component focus
                {
                    if (!this.parent.focusacceptable)
                    {
                        _want_tab = false;
                    }
                }
            }
            else
            {
                if (!this._getLastFocused() && !this._getTabOrderFirst())
                {
                    if (!(ctrlKey && this.parent.usecontrolkey))
                        _want_tab = false;
                }
                    
            }
        }
        return { want_tab: _want_tab, want_return: false, want_escape: false, want_chars: false, want_arrows: _want_arrow };
    };

    _pTabpage._on_apply_url = function ()
    {
        if (!this.form._is_loaded && this.url && this.url.length > 0)
        {
            this.on_apply_url(false);
        }
    };

    _pTabpage._setTabFocusObj = function (focusobj)
    {
        this.parent._focusobj = focusobj;
    };

    _pTabpage._getTabFocusObj = function ()
    {
        return this.parent._getTabFocusObj();
    };
    //===============================================================
    // nexacro.Tabpage : Override
    //===============================================================
    _pTabpage.getParentContext = function ()
    {
        return this.parent.getParentContext();
    };

    _pTabpage.on_getIDCSSSelector = function ()
    {
        return "tabpage";
    };

    _pTabpage.on_apply_prop_enable = function (v)
    {
        if (this.form)
        {
            this.form._setEnable(v);
        }

        var tabbuttonitem = this._tabbuttonitem;
        if (tabbuttonitem)
            tabbuttonitem.set_enable(v);

    };

    // ====================================================================
    // nexacro.Tabpage : Event
    // ====================================================================

    _pTabpage._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
        this._setTabFocusObj(this);
    };

    _pTabpage._on_killfocus = function (new_focus, new_ref_focus)
    {
        if (new_focus === this)
            return;

        if (new_focus == null && new_ref_focus == null)
            return;

        this.form._last_focused = null;
    };

    _pTabpage.on_destroy_contents = function ()
    {
        nexacro.Div.prototype.on_destroy_contents.call(this);

        this._tabbuttonitem = null;
    };
    
    delete _pTabpage;
}

if (!nexacro._TabButtonItemControl)
{
    nexacro._TabButtonItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._sizeinfo = {width:0, height:0};                                        // width,height
        this._position = { left: 0, top: 0, width: 0, height: 0 };  // left,top,width,height
    };
    var _pTabButtonItemControl = nexacro._createPrototype(nexacro.Component, nexacro._TabButtonItemControl);
    nexacro._TabButtonItemControl.prototype = _pTabButtonItemControl;

    _pTabButtonItemControl._type_name = "TabButtonItemControl";
    _pTabButtonItemControl._is_subcontrol = true;    
    _pTabButtonItemControl._use_selected_status = true;
    _pTabButtonItemControl._extrabutton = null;            //nexacro._Icon
    _pTabButtonItemControl._tabindex = -1;                     // tab index
    _pTabButtonItemControl._line_index = 0;
    //_pTabButtonItemControl._multiline_index = 0;
    // ====================================================================
    // nexacro.TabButtonItem : Create & Update
    // ====================================================================
    _pTabButtonItemControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var cellElem = new nexacro.TextBoxElement(control_elem, "text");
            this._cell_elem = cellElem;

            cellElem.setElementSize(this._getClientWidth(), this._getClientHeight());

            var textAlign = this.textAlign;
            if (textAlign)
                cellElem.setElementTextAlign(textAlign);
            var verticalAlign = this.verticalAlign;
            if (verticalAlign)
                cellElem.setElementTextAlign(verticalAlign);

            var wordwrap_info = this._getCSSStyleValue("wordWrap");
            if (wordwrap_info)
                cellElem.setElementCSSMapInfo(wordwrap_info);

            if (this.wordWrap)
                cellElem.setElementWordWrap(this.wordWrap);

            if (this._textdecoration)
            	cellElem.setElementTextDecoration(this._textdecoration);

            if (this._displaytext)
            {
                if (this.usedecorate)
                    cellElem.setElementDecorateText(this._displaytext);
                else
                    cellElem.setElementText(this._displaytext);
            }
        }
    };

    _pTabButtonItemControl.on_created_contents = function (win)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.create(win);
        }

        if (this._extrabutton)
            this._extrabutton.on_created(win);
    };

    _pTabButtonItemControl.on_create_contents_command = function (win)
    {
        var str = "";
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            str += cellElem.createCommand();
        }

        if (this._extrabutton)
            str += this._extrabutton.createCommand();

        return str;
    };

    _pTabButtonItemControl.on_attach_contents_handle = function (win)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.attachHandle(win);
        }

        if (this._extrabutton)
            this._extrabutton.attachHandle(win);
    };

    _pTabButtonItemControl.on_destroy_contents = function ()
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.destroy();
            this._cell_elem = null;
        }

        if (this._extrabutton)
        {
            this._extrabutton.destroy();
            this._extrabutton = null;
        }
    };

    _pTabButtonItemControl.on_apply_text = function (text)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.setElementText(text);
        }
    };

    _pTabButtonItemControl._onload_extra_iconimage = function (imgurl, width, height)
    {
        this.parent._onload_extra_iconimage(imgurl, width, height);

        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.setElementSize(this._getClientWidth() - width, this._getClientHeight());
        }
    };

    _pTabButtonItemControl._showExtraButton = function (v, buttonsize)
    {
        v = nexacro._toBoolean(v);
        
        if (v)
        {
            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();

            var width = client_height;
            var height = client_height;
            if (buttonsize)
            {
                width = buttonsize.width;
                height = buttonsize.height;
            }

            var extrabutton_l = client_width - width;
            var extrabutton_t = (client_height - height)/2;
            var extrabutton_w = width;
            var extrabutton_h = height;

            //var rotatetext = this._rotatetext;
            /*
            if (rotatetext)
            {
                extrabutton_l = 0;
                extrabutton_t = width;
            }
            */

//            this._extrabutton_size.width = height;  
//            this._extrabutton_size.height = height;

            if (!this._extrabutton)
            {
                this._extrabutton = new nexacro._TabExtraButtonControl("extrabutton", this.position, extrabutton_l, extrabutton_t, extrabutton_w, extrabutton_h, null, null, this);
                this._extrabutton.createComponent();
                //extrabutton._setEventHandler("onclick", this.on_notify_extrabutton, this);
            }
            else
            {
                if (!this._extrabutton.is_created)
                    this._extrabutton.on_created(this._getWindow());

                this._extrabutton.move(extrabutton_l, extrabutton_t, extrabutton_w, extrabutton_h);
            }
            
            if (!buttonsize)
            {
                var icon = this._extrabutton._getCSSStyleValue("icon");
                if (icon instanceof Object)
                    icon = icon.value;

                var imagesize = nexacro._getImageSize(icon, this._onload_extra_iconimage, this);
                if (imagesize)
                {
                    this._onload_extra_iconimage(icon, imagesize.width, imagesize.height);
                }
            }
            else
            {
                var cellElem = this._cell_elem;
                if (cellElem)
                {
                    cellElem.setElementSize(client_width - buttonsize.width, client_height);
                }
            }
        }
        else
        {
            if (this._extrabutton)
            {
                this._extrabutton.destroy();
                this._extrabutton = null;
            }
        }
    };
    _pTabButtonItemControl._setSizeInfo = function()
    {
        var width = 0;
        var height = 0;

        var status = "enabled";
        var padding = this._getCSSStyleValue("padding", status);
        var border = this._getCSSStyleValue("border", status);
        var font = this._getCurrentStyleInheritValue("font", status);

        var strText = this.text;
        var padding_l = 0, padding_r = 0, padding_t = 0, padding_b = 0;

        if (padding)
        {
            padding_l = padding.left || 0;
            padding_r = padding.right || 0;
            padding_t = padding.top || 0;
            padding_b = padding.bottom || 0;
        }

        var border_w = 0;
        if (border)
        {
            border_w = border._getBorderLeftWidth() || 0;
        }

        if (font)
        {
            var multi = false;
            if (strText)
            {
                var ret = strText.search("\n");
            }
            multi = (ret == -1) ? false : true;

            var size = nexacro._getTextSize(strText, font, multi);

            width = (Math.ceil(size[0]) | 0) + padding_l + padding_r + border_w * 2;
            height = (Math.ceil(size[1]) | 0) + padding_t + padding_b + border_w * 2;
        }

        this._sizeinfo.width = width;
        this._sizeinfo.height = height;

    };

    // ====================================================================
    // nexacro.TabButtonItem : Event
    // ====================================================================
    _pTabButtonItemControl.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus)
    {
        return applystatus;
    };
    _pTabButtonItemControl.on_changeUserStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus)
    {
        return applystatus;
    };
    _pTabButtonItemControl.on_apply_status = function (status, userstatus)
    {
        //if (this._is_created && this.visible)
        //    this.parent._rearrangeContents();
    }; 
    _pTabButtonItemControl.on_change_containerRect = function (width, height)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
            cellElem.setElementSize(this._getClientWidth(), this._getClientHeight());
    };

    _pTabButtonItemControl.on_apply_prop_enable = function (v)
    {
        var extrabutton = this._extrabutton;
        if (extrabutton)
            extrabutton.set_enable(v);
        
    };

    _pTabButtonItemControl._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        var _want_arrow = true;
        if (keycode == nexacro.Event.KEY_UP)
        {
            var _tab = this.parent;
            if (!_tab._isAccessibilityEnable())
                _want_arrow = false;
        }

        return { want_tab: shiftKey ? false : true, want_return: false, want_escape: false, want_chars: false, want_arrows: _want_arrow };
    };
    // ====================================================================
    // nexacro.TabButtonItem : Event Overriding
    // ====================================================================
    _pTabButtonItemControl._on_sys_lbuttondown = function (node, e)
    {
        var ret = this._on_lbuttondown(node, e);
        return ret;
    };

    _pTabButtonItemControl._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        if (!this._is_alive) return;

        this._on_focus(true);

        var ret = this.parent._on_btn_lbuttondown(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);

        return ret;
    };

    _pTabButtonItemControl._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp)
    {
        if (!this._is_alive) return;

        return this.parent._on_btn_lbuttonup(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);
    };

    _pTabButtonItemControl._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
        this._setTabFocusObj(this);
    };

    _pTabButtonItemControl._setTabFocusObj = function (focusobj)
    {
        if (!this._is_alive) return;

        this.parent._setTabFocusObj(focusobj);
    };

    _pTabButtonItemControl._getTabFocusObj = function ()
    {
        if (!this._is_alive) return;

        return this.parent._getTabFocusObj();
    };

    _pTabButtonItemControl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        if (!this._is_alive) return;

        var ret = nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, refer_comp); //이거 호출하지 않아도 되는지 확인 필요;smilekkr;
        this.parent._onclick_basic_action(this, true, canvasX, canvasY, screenX, screenY, refer_comp);

        return ret;
    };

    _pTabButtonItemControl.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp)
    {
        if (this.parent._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp))
        {
            return true;
        }

        if (this.parent.onkeydown && this.parent.onkeydown._has_handlers)
        {
            var page = this.parent.tabpages[this.tabindex];
            var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, page, page);

            this._on_focus(true);

            return this.parent.onkeydown._fireSysEvent(this, evt);
        }

        return true;
    };

    _pTabButtonItemControl.on_getIDCSSSelector = function ()
    {
        return "tabbuttonitem";
    };

    delete _pTabButtonItemControl;
}

if (!nexacro._TabExtraButtonControl)
{
    nexacro._TabExtraButtonControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
    };
    var _pTabExtraButtonControl = nexacro._createPrototype(nexacro.Button, nexacro._TabExtraButtonControl);
    nexacro._TabExtraButtonControl.prototype = _pTabExtraButtonControl;

    _pTabExtraButtonControl._type_name = "TabExtraButtonControl";
    _pTabExtraButtonControl._is_subcontrol = true;

    // ====================================================================
    // nexacro.TabButtonItem : Create & Update
    // ====================================================================

    // ====================================================================
    // nexacro.TabButtonItem : Property
    // ====================================================================

    // ====================================================================
    // nexacro.TabButtonItem : Event Overriding
    // ====================================================================
    _pTabExtraButtonControl.on_getIDCSSSelector = function ()
    {
        return "extrabutton";
    };

    delete _pTabExtraButton;
}