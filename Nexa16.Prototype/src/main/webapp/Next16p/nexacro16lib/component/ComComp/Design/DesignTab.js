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
// nexacro.Tab
//============================================================================== 
if (nexacro.Tab)
{
    var _pTab = nexacro.Tab.prototype;    

    _pTab._design_tabindex = 0;

    _pTab.createCssDesignContents = function ()
    {
        this.showextrabutton = true;
        this._createChild();
    };

    //==============================================================================
    // nexacro.Tab : Create & Destroy & Update
    //============================================================================== 
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
    //==============================================================================
    // nexacro.Tab : Events
    //============================================================================== 

    //==============================================================================
    // nexacro.Tab : Logical Parts
    //============================================================================== 
    _pTab._createChild = function ()
    {
        this.addTabpage();
        this.addTabpage();

        this.set_tabindex(0);
    };
     
    _pTab.design_set_tabindex = function (v)
    {
        var post_idx = parseInt(v) | 0;
        this._design_tabindex = post_idx;
    };

    _pTab.design_get_tabindex = function ()
    {
        return this._design_tabindex;
    };

    //==============================================================================
    // nexacro.Tab : Design Method
    //============================================================================== 
    _pTab._getNextTabpageID = function ()
    {
        var prefix = "Tabpage";

        var nextnum = 1;
        var nextid;
        while (true)
        {
            nextid = prefix + nextnum;
            if (!this[nextid])
                break;

            nextnum++;
        }

        return nextid;
    };

    _pTab.addTabpage = function ()
    {
        var length = this.tabpages.length;
        var tabpage_id = this._getNextTabpageID();

        return this.insertTabpage(tabpage_id, length, "", tabpage_id);
    };

    _pTab.deleteTabpage = function (nIndex)
    {         
        if (nIndex == null || nIndex == undefined)
            nIndex = this.tabindex;

        var tabpages = this.tabpages;

        var tabpages_len = tabpages.length;
        if (tabpages_len < 2)
        {
            // 최소 1개의 tabpage는 남겨두어야 한다.
            return false;
        }

        this.removeTabpage(nIndex);

        return true;
    };

    _pTab.previousTabpage = function ()
    {
        var cur_index = this.tabindex;
        if (cur_index > 0)
        {
            this.set_tabindex(cur_index - 1);
            return true;
        }

        return false;
    };

    _pTab.nextTabpage = function ()
    {
        var cur_index = this.tabindex;
        var length = this.tabpages.length;
        if (cur_index < length - 1)
        {
            this.set_tabindex(cur_index + 1);
            return true;
        }
        
        return false;
    };

    delete _pTab;
}