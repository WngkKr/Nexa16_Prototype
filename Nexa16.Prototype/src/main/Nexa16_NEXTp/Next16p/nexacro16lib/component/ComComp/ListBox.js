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
// nexacro.ListBox && nexacro.ListBox_Style
//==============================================================================
if (!nexacro.ListBox)
{
   
    // ==============================================================================
    // nexacro.ListBox
    // ==============================================================================
    nexacro.ListBox = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._selectinfo = { index: -1, text: "", value: undefined, obj: null };
        this._scroll_vpos_queue = [];
        this._select_multi = { "items": [], "map": {}, "keys": [], "length": 0, "lastselected": null };
        this._selectinfo_list = [];
        this._listitems = [];
    };

    var _pListBox = nexacro._createPrototype(nexacro.Component, nexacro.ListBox);
    nexacro.ListBox.prototype = _pListBox;

    _pListBox._type_name = "ListBox";

    _pListBox.scrollbars = "autoboth";    
    _pListBox.codecolumn = "";
    _pListBox.datacolumn = "";
    _pListBox.multiselect = false;
    _pListBox.innerdataset = null;
    _pListBox.readonly = false;
    _pListBox.index = -1;
    _pListBox.text = "";
    _pListBox.value = undefined;
    _pListBox.dragscrolltype = "all";
    _pListBox.selectscrollmode = "default";
    _pListBox.itemheight = null;

    //internal variables
    _pListBox._is_scrollable = true;
    _pListBox._temp_elem = null;
    _pListBox._innerdataset = null;
    _pListBox._codecolumn = null;
    _pListBox._datacolumn = null;
    _pListBox._total_page_rowcnt = 0;
    _pListBox._total_page_cnt = 0;
    _pListBox._contents_maxwidth = null;
    _pListBox._contents_maxheight = null;
    _pListBox._page_rowcount = 0;
    _pListBox._page_rowcount_min = 0;
    _pListBox._shiftKey = false;
    _pListBox._ctrlKey = false;
    _pListBox._altKey = false;

    _pListBox._overeditemindex = -1;
    _pListBox._lbtnDownIdx = -1;
    _pListBox._cur_end = -1;
    
    _pListBox._want_tab = true;
    _pListBox._want_arrow = false;
    _pListBox._shift_select_base_index = null;
    _pListBox._is_first_focus = false;
    _pListBox._keep_scrolling = false;
    _pListBox._itemheight = null;

    _pListBox._use_readonly_status = true;  

    //accessibility
    _pListBox._accessibility_index = -1;
    _pListBox._accessibility_role = "listbox";

    _pListBox.accessibilityaction = "listbox";
    _pListBox.accessibilitydesclevel = "all";
    _pListBox.accessibilitydescription = "";
    _pListBox.accessibilityenable = true;
    _pListBox.accessibilitylabel = "";
    _pListBox.accessibilityrole = "";

    _pListBox.itemaccessibilityrole = "listboxitem";
    _pListBox.itemaccessibilityenable = true;
    _pListBox.itemaccessibilitylabel = "";
    _pListBox.itemaccessibilitydescription = "";
    _pListBox.itemaccessibilityaction = "";
    _pListBox.itemaccessibilitydesclevel = "all";


    _pListBox._event_list = {
        "onclick": 1, "ondblclick": 1, "onkeypress": 1, "onkeydown": 1, "onkeyup": 1, "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1, "onlbuttondown": 1, "onlbuttonup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onitemclick": 1, "onitemdblclick": 1, "canitemchange": 1, "onitemchanged": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,        
        "onitemmouseenter": 1,"onvscroll": 1, "onhscroll": 1, "onmousedown": 1, "onmouseup": 1, "onmousewheel": 1
    };


    _pListBox.on_apply_custom_class = function ()
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].on_apply_prop_class();
            }
            items = null;
        }
    };

    /*
    _pListBox.on_apply_custom_pseudo = function (pseudo)
    {
        //Todo..
    };
    */
	   
  
    //===============================================================
    // nexacro.ListBox : ListBox's Create & Update
    //---------------------------------------------------------------
    _pListBox.on_create_contents = function ()
    {
        var control = this.getElement();
        //control.setElementSize(this._client_width, this._client_height);

        this._temp_elem = new nexacro.Element(control);
        this._temp_elem.setElementSize(1, 1);
        this._temp_elem.setElementVisible(false);

		//get cssvalue before itemcontrol created
        this._hiddenitem = this._create_item("item_" + 0, "absolute", 0, 0, 0, 0, null, null, this);
        this._hiddenitem._initCSSSelector();        
    };

    _pListBox.on_created_contents = function (win)
    {   
        this._temp_elem.create(win);

        if (this.getElement())
        {
        	if (!this._innerdataset && this.innerdataset)
        	{
        		this._setInnerDatasetStr(this.innerdataset);        		
        	}

			this.on_apply_innerdataset();
        }

        this._on_apply_value();

        var rowobjs = this._listitems, rowobj;
        for (var i = 0, n = rowobjs.length ; i < n ; i++)
        {
            rowobj = rowobjs[i];
            if (rowobj)
            {
              	rowobj.on_created(win);
                rowobj._real_visible = false;
            }
        }
		     
        if (nexacro._enableaccessibility)
            this._want_arrow = true;

        this._onRecalcScrollSize();

		this._selectinfo.obj = null;
        this._selectinfo.index = this.index;
        this._selectinfo.text = this.text;
        this._selectinfo.value = this.value;

        this._setEventHandler("onkeydown", this.on_notify_listbox_onkeydown, this);
    };

    _pListBox.on_destroy_contents = function ()
    {
        var hiddenitem = this._hiddenitem;
        if (hiddenitem)
        {
            hiddenitem.destroy();
        }
        var temp_elem = this._temp_elem;
        if (temp_elem)
        {
            temp_elem.destroy();
        }

        this._clear_contents();

        if (this._innerdataset)
        {
            this._innerdataset._removeEventHandler("onload", this._callback_onload, this);
            this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

            this._innerdataset = null;
            this.innerdataset = null;
        }

        this._removeEventHandler("onkeydown", this.on_notify_listbox_onkeydown, this);

        this._selectinfo = null;
        this._select_multi = null;
        this._listitems.length = 0;
        this._selectinfo_list.length = 0;
        this._scroll_vpos_queue = null;
        this._currentdisplayfont = null;
    };

    _pListBox.on_change_containerRect = function (width, height)
    {
    	if (this._is_created_contents)
    	    this._recreate_data(true);

    	this._onResetScrollBar();
    };


    _pListBox.on_create_contents_command = function ()
    {
        if (this.getElement())
        {
        	if (!this._innerdataset && this.innerdataset)
        		this._setInnerDatasetStr(this.innerdataset);

			this.on_apply_innerdataset();
        }

        var items = this._get_contents_rows();
        var rowcount = items.length;

        var str = "";
        for (var i = 0; i < rowcount; i++)
        {
            str += items[i].createCommand();
        }
		

        return str;
    };

    _pListBox.on_attach_contents_handle = function(win)
    {
        var items = this._get_contents_rows();
        var rowcount = items.length;
		       
        for (var i = 0; i < rowcount; i++)
        {
            items[i].attachHandle(win);
        }
                
        this._onRecalcScrollSize();
        this._on_apply_value();

		this._selectinfo.obj = null;
        this._selectinfo.index = this.index;
        this._selectinfo.text = this.text;
        this._selectinfo.value = this.value;

        this._setEventHandler("onkeydown", this.on_notify_listbox_onkeydown, this);
    };

    //===============================================================
    // ListBox Override
    //---------------------------------------------------------------
    _pListBox._callback_onload = function (obj, e)
    {
        
        switch (e.reason)
        {
        	case 0:
        		this._setContentsMaxSize();
                this._recreate_data();                

                if (this.index > -1)
                {
                    if (this._changeIndex(this.index))
                    {
                        this.on_apply_index();
                    }
                }
                else if (this.value !== "")
                {
                    var row = this._innerdataset.findRow(this.codecolumn, this.value);
                    if (this._changeIndex(row))
                    {
                        this.on_apply_index();
                    }
                }
                break;
            default:
                break;
        }
    };

    _pListBox._callback_onvaluechanged = function (obj, e)
    {
    	this._setContentsMaxSize();
        this._recreate_data();
        
    };

    _pListBox._callback_onrowsetchanged = function (obj, e)
    {
    	if (e.reason != 41)  //nexacro.Dataset.REASON_ENABLEEVENT  : enableevent 시 fire rowsetchanged -> valuechanged 
    	{
    		this._setContentsMaxSize();
    		this._recreate_data();
    		
    	}
    };

    _pListBox.on_init_bindSource = function (columnid, propid, ds)
    {
    	if (this._is_created)
			this._recreate_data();
        
        if (propid == "value")
        {
            this.set_value(undefined);
            return true;
        }
        return false;
    };

    _pListBox.on_change_bindSource = function (propid, pSendDataset, rowIdx, colIdx, colArrayIdx)
    {
        var rtn;
        if (this._is_created)
        	this._recreate_data();

        if (propid == "value")
        {
            rtn = pSendDataset.getColumn(rowIdx, colIdx);
            this.set_value(rtn);
            return true;
        }
        return false;
    };

    _pListBox.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pListBox.on_apply_prop_enable = function (v)
    {
        nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

        var enable = v;
        if (v == undefined) enable = this.enable;

        var items = this._get_contents_rows();
        if (items && items.length > 0)
        {
            var size = items.length;
            for (var i = 0; i < size; i++)
            {
                items[i]._setEnable(enable);
            }
			items = null;
        }
    };

    //ListBox는 접근성 상태에서 TabKey, setFocus(), Hotkey시 자신에게 Focus를 가집니다. 이후 Tab키 입력시 기존에 선택된 항목이 있는 경우 해당 항목으로 이동하며, 
    //선택된 항목이 없는 경우 첫번째 항목으로 이동하며 선택되지는 않습니다. 선택은 space나 방향키로 동작합니다. Shift+Tab시 반대로 동작합니다. 
    //방향키로 입력시에는 기존에 선택된 항목을 무시하고 아래방향키는 첫번째 항목으로 위방향키는 마지막 항목으로 이동하며 동시에 선택 처리됩니다.
    //MouseClick 시에는 해당 Item으로 이동하고 선택처리됩니다.
    //관련 메서드 overrinding - _getDlgCode , _setFocus, _on_focus , on_fire_user_onkeydown
    _pListBox._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
		var want_tab, _want_arrow;
        if (keycode && (keycode == nexacro.Event.KEY_TAB))
			want_tab = this._getPreCalculateWantTab(keycode, shiftKey);
        else
			_want_arrow = this._getPreCalculateWantArrow(keycode);
        if (this._is_first_focus)
            this._is_first_focus = false;
        this._want_arrow = nexacro._enableaccessibility;
        this._want_tab = true;

        if (ctrlKey)
        {
        	if (keycode == nexacro.Event.KEY_LEFT)
        	{
        		var hscrollbar = this.hscrollbar;
        		if (hscrollbar)
        		{
        			_want_arrow = hscrollbar.pos > hscrollbar.min ? true : false;
        		}
        		else
        		{
        			_want_arrow = false;
        		}
        	}
        	else if (keycode == nexacro.Event.KEY_UP)
        	{
        		var vscrollbar = this.vscrollbar;
        		if (vscrollbar)
        		{
        			_want_arrow = vscrollbar.pos > vscrollbar.min ? true : false;
        		}
        		else
        		{
        			_want_arrow = false;
        		}
        	}
        	else if (keycode == nexacro.Event.KEY_RIGHT)
        	{
        		var hscrollbar = this.hscrollbar;
        		if (hscrollbar)
        		{
        			_want_arrow = hscrollbar.pos < hscrollbar.max ? true : false;
        		}
        		else
        		{
        			_want_arrow = false;
        		}
        	}
        	else if (keycode == nexacro.Event.KEY_DOWN)
        	{
        		var vscrollbar = this.vscrollbar;
        		if (vscrollbar)
        		{
        			_want_arrow = vscrollbar.pos < vscrollbar.max ? true : false;
        		}
        		else
        		{
        			_want_arrow = false;
        		}
        	}
        }
		
        return { want_tab: want_tab, want_return: false, want_escape: false, want_chars: false, want_arrows: _want_arrow };
    };

    _pListBox._setFocus = function (bResetScroll, dir, bInner)
    {
        this._focus_direction = dir;
        var retn = this.setFocus(bResetScroll, bInner);
        this._focus_direction = -1;
        return retn;
    };

    _pListBox._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var retn = false;
        var focusdir = this._focus_direction;
        if (evt_name == "tabkey") focusdir = 0;
        else if (evt_name == "shifttabkey") focusdir = 1;
        else if (evt_name == "downkey") focusdir = 2;
        else if (evt_name == "upkey") focusdir = 3;

        if (self_flag === false)
        {
            this._focus_direction = -1;
        }

        if (focusdir >= 0)
        {
            retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            if (self_flag == false)
            {
                this._accessibility_index = -1;
                if (this._last_focused)
                    this._do_defocus(this._last_focused, false);
                if (focusdir < 2)
                {
                    var items = this._get_contents_rows();
					if (items.length > 0)
                    {
                        var comp;
                        if (this.index > -1)
                        {
                            this._accessibility_index = this.index;
                        }
                        else
                        {
                            if (focusdir === 0)
                                this._accessibility_index = 0;
                            else
                                this._accessibility_index = items.length - 1;
                        }
                        this._is_first_focus = true;
                        comp = items[this._accessibility_index];
                        comp._on_focus(true);
                        this._shift_select_base_index = this._accessibility_index;
						comp = null;
                    }
					items = null;
                }
                else if (focusdir == 2)
                {
                    if (!this._isAccessibilityEnable())
                    {
						var comp;
                        var items = this._get_contents_rows();
                        this._is_first_focus = true;
                        if (this.index > -1)
                        {
                            comp = items[this._accessibility_index = this.index];

                            comp._on_focus(true);
                            comp.set_selected(true);
                            this._shift_select_base_index = this.index;
                        }
						else if (items.length > 0)
                        {
                            if (this.multiselect)
                            {
                                this._do_select(this._getNextAccessibilityOrderIndex(1));
                            }
                            else if (this._changeIndex(this._getNextAccessibilityOrderIndex(1)))
                            {
                                this.on_apply_index();
                            }
                        }                        
						items = null;
						comp = null;
                    }
                }
                else if (focusdir == 3)
                {
                    this._is_first_focus = true;
                    var items = this._get_contents_rows();
					var comp;
                    if (this.index == -1)
                    {
						if (items.length > 0)
                        {
                            if (this.multiselect)
                            {
								if (this.index > -1)
									this._accessibility_index = this.index;
                                else
                                {
                                    this._accessibility_index = items.length;
                                }
                                var idx = this._getNextAccessibilityOrderIndex(-1);
                                this._do_select(idx);
                            }
                            else
                            {
								if (this.index > -1)
									this._accessibility_index = this.index;
                                else
                                {
                                    this._accessibility_index = items.length;
                                }
                                var idx = this._getNextAccessibilityOrderIndex(-1);
                                comp = items[idx];

                                if (this._changeIndex(idx))
                                {
                                    this.on_apply_index();
                                }
                            }
                        }
                    }
                    else
                    {
                        comp = items[this._accessibility_index = this.index];
                        comp._on_focus(true);
                        if (nexacro._enableaccessibility && this.multiselect)
                        {
                            this._do_select(this._accessibility_index);
                        }
                        else
                        {
                            comp.set_selected(true);
                        }
                    }
					items = null;
					comp = null;
                }
            }
        }
        else
        {
            retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            if (this._last_focused)
                this._do_defocus(this._last_focused, false);
			else if (this._select_multi.lastselected === undefined && this._accessibility_index > -1)
            {
                var items = this._get_contents_rows();
                items[this._accessibility_index]._changeStatus("focused", false);
            }
        }        

        return retn;
    };

    _pListBox.on_get_accessibility_label = function ()
    {
        var label = "";
        if (!this._is_first_focus)
            label = this.text ? this.text : this.value;
        return label ? label : "";
    };

    //===============================================================
    // ListBox Properties
    //---------------------------------------------------------------
    _pListBox.setInnerDataset = function (obj)
    {
        if (!obj)
        {
            this._innerdataset = null;
            this.innerdataset = "";
            this.on_apply_innerdataset();
        }
        else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset"))
        {
            this._innerdataset = obj;
            this.innerdataset = obj.id;
            this._keep_scrolling = (this.innerdataset != obj.id) ? false : true;
            this.on_apply_innerdataset();
        }
    };

    _pListBox._setInnerDatasetStr = function (str)
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

    _pListBox._setItemAccessibility = function (item)
    {
        var role = this.itemaccessibilityrole;
        if (role)
            item.set_accessibilityrole(role);

        var enable = this.itemaccessibilityenable;
        if (enable !== undefined)
            item.set_accessibilityenable(enable);

        var label = this.itemaccessibilitylabel;
        if (label !== undefined)
            item.set_accessibilitylabel(label);

        var description = this.itemaccessibilitydescription;
        if (description)
            item.set_accessibilitydescription(description);

        var action = this.itemaccessibilityaction;
        if (action)
            item.set_accessibilityaction(action);

        var desclevel = this.itemaccessibilitydesclevel;
        if (desclevel)
            item.set_accessibilitydesclevel(desclevel);
    };

    _pListBox.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pListBox.set_innerdataset = function (str)
    {		
    	if (this.innerdataset != str)
    	{
			this.innerdataset = str;
			if (typeof str == "object")
			{
				this._innerdataset = str;
				this.innerdataset = str.id;
			}
		}

    	if (this._is_created)
    	{
			if (typeof str != "string")
			{
				this.setInnerDataset(str);
			}
			else
			{
				this._setInnerDatasetStr(str);
				this.on_apply_innerdataset();
    		}
		}       
    };

    _pListBox.on_apply_innerdataset = function ()
    {
        var dataset = this._innerdataset;
        if (dataset)
        {
            if (this.datacolumn || this.codecolumn)
            {
                if (!this.datacolumn)
                {
                    this._datacolumn = this.codecolumn;
                }
                if (!this.codecolumn)
                {
                    this._codecolumn = this.datacolumn;
                }

                dataset._setEventHandler("onload", this._callback_onload, this);
                dataset._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
                dataset._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

                this._setContentsMaxSize();
                this._recreate_data(this._keep_scrolling);                
            }
        }
    };

    _pListBox.set_visible = function (v)
    {
        var vscroll = this.vscrollbar;
        var need_refreshDom = nexacro._Browser == "Chrome" && v && this.visible != v && vscroll;

		nexacro.Component.prototype.set_visible.call(this, v);

        if (need_refreshDom)
        {
            var vscrollPos = vscroll.pos;
            vscroll.set_pos(vscrollPos - 1);
            vscroll.set_pos(vscrollPos);
        }
    };

    _pListBox.set_codecolumn = function (v)
    {
        if (v && v != this.codecolumn)
        {
            this.codecolumn = v;
            this.on_apply_innerdataset();
        }
    };

    _pListBox.set_datacolumn = function (v)
    {
        if (v && v != this.datacolumn)
        {
            this.datacolumn = v;
            this.on_apply_innerdataset();
        }
    };

    _pListBox.set_multiselect = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.multiselect)
        {
            this.multiselect = v;
            this.on_apply_multiselect();
        }
    };

    _pListBox.on_apply_multiselect = function ()
    {
        var pre_idx = -1;
        this._select_clear();
        this._shiftKey = false;
        this._ctrlKey = false;
        this.setSelect(this.index, true);
        /*
        if (!this.multiselect)
        {
            pre_idx = this.index;
            this._do_select(pre_idx);
        }*/
    };

    _pListBox.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
            this._setAccessibilityFlagReadOnly(v);
        }
    };

    _pListBox.on_apply_readonly = function ()
    {
        var v = this.readonly;
        this._changeStatus("readonly", v);
        var items = this._get_contents_rows();
        for (var i = 0,rowcount = items.length; i < rowcount; i++)
        {
            items[i].set_readonly(v);
        }
    };

    _pListBox.set_text = function (v)
	{

    };

    _pListBox.set_index = function (v, bIgnoreCompareIdx)
    {
        var dataset = this._innerdataset;
        v = parseInt(v, 10) | 0;

        if (this._is_created)
        {
            if (!dataset || v < 0 || v > dataset.getRowCount() - 1)
            {
                v = -1;
            }
        }
        if (this._changeIndex(v, bIgnoreCompareIdx, true))
        {
            this.on_apply_index();
        }
        else
        {
            this._on_last_selectfocuschanged(this.index, true);
        }
    };

    _pListBox.on_apply_index = function ()
    {
        //if (!this.multiselect)
        //{
            var index = this.index;
            var items = this._get_contents_rows();
            var length = items.length;
            if (items && index == -1)
            {
                for (i = 0; i < length; i++)
                {
                    var item = items[i];
                    item.set_selected(false);

                    if (nexacro._enableaccessibility)
                    {
                        item._setAccessibilityInfoIndex(i + 1);
                        item._setAccessibilityInfoCount(length);
                    }
                }
                items = null;
            }

            var control_elem = this.getElement();
            if (control_elem && index > -1)
            {
                this._do_select(index);
            }
        //}
    };

    _pListBox.set_value = function (v)
    {
        if (v !== this.value)
        {
            this.value = v;
        }
        var dataset = this._innerdataset;
        if (dataset)
        {
            var row = -1;
            if (this.value !== undefined)
                row = dataset.findRow(this.codecolumn, this.value);
            if (this.index != row)
            {
                this._is_value_setting = true;
                this.set_index(row);
                this._is_value_setting = false;
            }
        }
    };

    _pListBox._on_apply_value = function()
	{
		var dataset = this._innerdataset;
        if(dataset)
		{
            var row = -1;
            if (this.value !== undefined)
                row = dataset.findRow(this.codecolumn, this.value);
            if(this.index != row)
           	{
				this._is_value_setting = true;
				this.set_index(row);
                this._is_value_setting = false;
            }
         }
    };


    _pListBox.set_dragscrolltype = function (v)
    {
        nexacro.Form.prototype.set_dragscrolltype.call(this, v);
    };

    _pListBox.set_resizebutton = function ()
    {

    };

    _pListBox.set_selectscrollmode = function (v)
    {
        this.selectscrollmode = nexacro._toString(v);
    };

    _pListBox.set_itemheight = function (v)
    {
    	this.itemheight = v;
    	this._itemheight = (parseInt(this.itemheight) | 0);
		if (this._is_created)
			this.on_apply_itemheight();
    };

    _pListBox.on_apply_itemheight = function ()
    {
         this._setContentsMaxSize();
         this._recreate_data(true);
    };

    _pListBox.set_itemaccessibilityrole = function (val)
    {
        if (val)
        {
            this.itemaccessibilityrole = val;
            this.on_apply_itemaccessibilityrole(val);
        }
        else
        {
            this.itemaccessibilityrole = "";
            this.on_apply_itemaccessibilityrole(" ");
        }
    };

    _pListBox.on_apply_itemaccessibilityrole = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilityrole(val ? val : this.itemaccessibilityrole);
            }
        }
    };

    _pListBox.set_itemaccessibilitylabel = function (val)
    {
        if (val)
        {
            this.itemaccessibilitylabel = val;
            this.on_apply_itemaccessibilitylabel(val);
        }
        else
        {
            this.itemaccessibilitylabel = "";
            this.on_apply_itemaccessibilitylabel(" ");
        }
    };

    _pListBox.on_apply_itemaccessibilitylabel = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilitylabel(val ? val : this.itemaccessibilitylabel);
            }
        }
    };

    _pListBox.set_itemaccessibilityenable = function (val)
    {
        if (val)
        {
            this.itemaccessibilityenable = val;
            this.on_apply_itemaccessibilityenable(val);
        }
        else
        {
            this.itemaccessibilityenable = true;
            this.on_apply_itemaccessibilityenable(true);
        }
    };

    _pListBox.on_apply_itemaccessibilityenable = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilityenable(val ? val : this.itemaccessibilityenable);
            }
        }
    };

    _pListBox.set_itemaccessibilitydescription = function (val)
    {
        if (val)
        {
            this.itemaccessibilitydescription = val;
            this.on_apply_itemaccessibilitydescription(val);
        }
        else
        {
            this.itemaccessibilitydescription = "";
            this.on_apply_itemaccessibilitydescription(" ");
        }
    };

    _pListBox.on_apply_itemaccessibilitydescription = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilitydescription(val ? val : this.itemaccessibilitydescription);
            }
        }
    };

    _pListBox.set_itemaccessibilityaction = function (val)
    {
        if (val)
        {
            this.itemaccessibilityaction = val;
            this.on_apply_itemaccessibilityaction(val);
        }
        else
        {
            this.itemaccessibilityaction = "";
            this.on_apply_itemaccessibilityaction(" ");
        }
    };

    _pListBox.on_apply_itemaccessibilityaction = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilityaction(val ? val : this.itemaccessibilityaction);
            }
        }
    };

    _pListBox.set_itemaccessibilitydesclevel = function (val)
    {
        if (val)
        {
            this.itemaccessibilitydesclevel = val;
            this.on_apply_itemaccessibilitydesclevel(val);
        }
        else
        {
            this.itemaccessibilitydesclevel = "";
            this.on_apply_itemaccessibilitydesclevel(" ");
        }
    };

    _pListBox.on_apply_itemaccessibilitydesclevel = function (val)
    {
        var items = this._get_contents_rows();
        if (items)
        {
            var rowcount = items.length;
            for (var i = 0; i < rowcount; i++)
            {
                items[i].set_accessibilitydesclevel(val ? val : this.itemaccessibilitydesclevel);
            }
        }
    };

    //===============================================================
    // Methods  ( notify , override ....)
    //---------------------------------------------------------------
    _pListBox.getCount = function ()
    {
        return (this._innerdataset) ? this._innerdataset.getRowCount() : 0;
    };

    _pListBox.getSelectedCount = function ()
    {
        return this._get_selectcount();
    };

    _pListBox.getSelect = function (v)
    {
        if (v < 0 || v >= this.getCount())
        {
            return false;
        }
        var selectedItems = this._select_multi.items;
        var selectedCount = this._select_multi.length;

        for (var i = 0; i < selectedCount; i++)
        {
            if (selectedItems[i] == v)
            {
                return true;
            }
        }
        return false;
    };

    _pListBox.getSelectedItems = function ()
    {
        if (this._select_multi && this._select_multi.length > 0)
        {
            var arrSelect = this._select_multi.items;
            arrSelect.sort();
            return arrSelect;
        }
        else
            return [];
    };

    _pListBox.clearSelect = function ()
    {
        if (this._select_multi && this._select_multi.length > 0)
        {
            this._selectinfo.index = -1;

            if (this._changeIndex(-1))
            {
                this.on_apply_index();
            }
            this._select_clear();
            if (this._ctrlKey === true)
            {
                this._recreate_data();                
            }
            return true;
        }
        else
            return false;
    };

    _pListBox.redraw = function ()
    {
        this._recreate_data();
    };

    _pListBox.setSelect = function (index, select)
    {
        select = nexacro._toBoolean(select);
        index = parseInt(index) | 0;
        var item = this._get_rowobj_byrow(index);

        if (index >= 0)
        {
            if (select == true)
            {
                if (!this.multiselect)
                {
                    this._deselect_all(true);

                    if (this._changeIndex(index, true))
                    {
                        this.on_apply_index();
                    }
                }
                else
                {
                    item.set_selected(select);
                    this._select_add(index);
                    this._changeIndex(index);
                }
            }
            else
            {
                item.set_selected(false);
				this._select_remove(index);
                if (this._select_multi && this._select_multi.length == 0)
                {
                    this._changeIndex(-1);
                }
            }
        }
        else
        {
            if (this._changeIndex(-1))
            {
                this.on_apply_index();
            }

            this._select_clear();
        }
    };

    _pListBox.updateToDataset = function ()
    {
        return this.applyto_bindSource("value", this.value);
    };

    _pListBox.isAboveSelected = function ()
    {

    };

    //===============================================================
    // Event Handlers  ( notify , override ....)
    //---------------------------------------------------------------

    _pListBox.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var accIdx = this._accessibility_index;
        var count = this._get_contents_rows().length;
        if (keycode == nexacro.Event.KEY_TAB)
        {
            var selecteditem = this._selectinfo;
            if (selecteditem && selecteditem.index > -1)
            {
                if (shift_key)
                {
                    if (accIdx < 0)
                    {
                        this._want_tab = false;
                    }
                    else
                    {
                        var last_focused = this._last_focused;
                        if (last_focused)
                        {
                            this._do_defocus(last_focused, true);
                            last_focused._changeUserStatus("selected", true);
                        }
                        this._accessibility_index = -1;
                    }
                }
                else
                {
                    if (accIdx > -1)
                    {
                        this._want_tab = false;
                    }
                    else
                    {
                        var items = this._get_contents_rows();
                        var comp = items[this.index];
                        if (comp)
                            comp._on_focus(true);
                        this._accessibility_index = this.index;
                    }
                }
            }
            else
            {
                if ((shift_key && accIdx < 0) || (!shift_key && accIdx >= count - 1))
                {
                    this._want_tab = false;
                }
                else
                {
                    if (shift_key)
                        accIdx--;
                    else
                        accIdx++;
                    var items = this._get_contents_rows();
                    var comp = items[accIdx];
                    if (comp)
                        comp._on_focus(true);

                    this._accessibility_index = accIdx;
                }
            }
            this._getWindow()._keydown_element._event_stop = true;
        }
        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };

    _pListBox.on_notify_listbox_onkeydown = function (obj, e)
    {
        if (this.readonly) return false;

        var sel_info = this._selectinfo;
        var nextidx, curidx = this._overeditemindex;
        var ds = this._innerdataset;

        var pre_index = +this.index;
        var pre_text = this.text;
        var pre_value = this.value;
        var post_index, post_text, post_value;
        var items = this._get_contents_rows();

        var shiftKey = this._shiftKey = e.shiftkey;
        this._ctrlKey = e.ctrlkey;
        this._altKey = e.altkey;
        var keycode = e.keycode;

        if (keycode == nexacro.Event.KEY_UP)
        {
            if (e.ctrlkey)
            {
                this._do_scroll("up");
                return true;
            }

            if (this.multiselect)
            {
                if (nexacro._enableaccessibility)
                {
                    nextidx = this._getNextAccessibilityOrderIndex(-1);

                    if (this._accessibility_index < 0)
                    {
                        var _window = this._getWindow();
                        _window._removeFromCurrentFocusPath(this, true);
                        if (this._isAccessibilityEnable())
                        {
                            this._on_focus(true);
                        }
                        this._accessibility_index = -1;
                        return;
                    }
                    else
                    {
						//if (this._select_multi.lastselected === undefined && this._accessibility_index < this._get_rowcount())
						items[this._accessibility_index]._changeStatus("focused", false);
                        this._select_withkeyupevent(e);
                    }
                    nextidx = this._accessibility_index;
                }
                else
                {
                    this._select_withkeyupevent(e);
                    nextidx = this._get_selection_last();
                }

                if (nextidx != null)
                {
                    if (nextidx > -1)
                    {
                        if (this._last_focused)
                            this._do_defocus(this._last_focused);
                        this._changeIndex(nextidx);
                    }
                }
            }
            else
            {
                if (nexacro._enableaccessibility)
                {
                    if (this.index == 0)
                    {
                        var _window = this._getWindow();
                        _window._removeFromCurrentFocusPath(this, true);
                        if (this._isAccessibilityEnable())
                        {
                            this._on_focus(true);
                        }
                        this._accessibility_index = -1;
                        return;
                    }
                    else
                    {
                        //if (this._accessibility_index != this.index)
                        //{
                            var prev_item = items[this._accessibility_index];
                            if (prev_item)
                                prev_item._changeStatus("focused", false);
                        //}
                        this._accessibility_index = this._getNextAccessibilityOrderIndex(-1);
                        nextidx = this._accessibility_index;
                    }
                }
				else
                {
                    nextidx = +this.index - 1;
                }

                if (nextidx > -1)
                {
                    if (this._changeIndex(nextidx))
                    {
                        if (this._last_focused)
                            this._do_defocus(this._last_focused);
                        this.on_apply_index();
                    }
                }
            }
        }
        else if (keycode == nexacro.Event.KEY_DOWN)
        {
            if (e.ctrlkey)
            {
                this._do_scroll("down");
                return true;
            }

            if (this.multiselect)
            {
                if (nexacro._enableaccessibility)
                {
                    if (this.index > -1 && this._accessibility_index == -1)
                    {
                        nextidx = this._accessibility_index = this.index;
                        this._do_select(this._accessibility_index);
                    }
                    else
                    {
                        nextidx = this._getNextAccessibilityOrderIndex(1);
                        if (this._accessibility_index < ds.getRowCount())
                        {
							//if (this._select_multi.lastselected === undefined && this._accessibility_index > -1)
							    items[this._accessibility_index]._changeStatus("focused", false);
                            this._select_withkeydownevent(e);
                        }
                    }
                }
                else
                {
                    this._select_withkeydownevent(e);
                    nextidx = this._get_selection_last();
                }

                if (nextidx != null)
                {
                    if (nextidx < ds.getRowCount())
                    {
                        this._changeIndex(nextidx);
                    }
                }
            }
			else
            {
                if (nexacro._enableaccessibility)
                {
                    if (this.index > -1 && this._accessibility_index == -1)
                    {
                        items[this.index]._on_focus(true);
                        this._accessibility_index = this.index;
                    }
                    else
                    {
                        //if (this._accessibility_index != this.index)
                        //{
                            var prev_item = items[this._accessibility_index];
                            if (prev_item)
                                prev_item._changeStatus("focused", false);
                        //}
                        this._accessibility_index = this._getNextAccessibilityOrderIndex(1);
                    }
                    nextidx = this._accessibility_index;
                }
                else
                {
                    nextidx = +this.index + 1;
                }

                if (nextidx < ds.getRowCount())
                {
                    if (this._changeIndex(nextidx))
                    {
                        this.on_apply_index();
                    }
                }
        }
		}

        if (!shiftKey)
        {
            this._shift_select_base_index = obj.index;
        }

        if ((this.multiselect === true) && (this._ctrlKey === true) && (keycode === nexacro.Event.KEY_SPACE))
        {
			var cur_item = this._get_rowobj_byrow(this._select_multi.lastselected);
            var is_same = false;
            this._sellist = this._select_multi.items;
            var len = this._sellist.length;
            var del_idx, iv;

            for (var i = 0; i < len; i++)
            {
                iv = this._sellist[i];

				if (this._select_multi.lastselected == iv)
                {
                    is_same = true;
                    cur_item = this._get_rowobj_byrow(iv);
                    del_idx = iv;
                }
            }

            if (is_same !== true)
            {
                if (cur_item) cur_item.set_selected(true);
				this._select_add(this._select_multi.lastselected);
            }
            else
            {
                this._do_deselect(del_idx, true);
            }
        }
        else if (keycode == nexacro.Event.KEY_SPACE)
        {
            if (nexacro._enableaccessibility && this._accessibility_index > -1)
            {
                var items = this._get_contents_rows();
                if (items[this._accessibility_index]._status == "focused")
                    items[this._accessibility_index]._changeStatus("focused", false);

                if (this._changeIndex(this._accessibility_index))
                {
                    this.on_apply_index();
                }
            }
        }

       // this.on_apply_style_itemborder(this.currentstyle.itemborder);
    };

    _pListBox.on_notify_item_onlbuttondown = function (obj, e)
    {
        if (this.readonly) return false;
        if (nexacro._enableaccessibility)
        {
            if (this._accessibility_index > -1)
            {
                var items = this._get_contents_rows();
                if (items[this._accessibility_index]._status == "focused")
                    items[this._accessibility_index]._changeStatus("focused", false);
            }
        }
        obj._keep_selecting = true;
        var index = obj.index;
        if (this._changeIndex(index))
        {
            this.on_apply_index();
        }
        var shiftkey = this._shiftKey = e.shiftkey;
        this._ctrlKey = e.ctrlkey;
        this._altKey = e.altkey;
        this._selectinfo.obj = obj;
        this._selectinfo.index = obj.index;
        this._selectinfo.text = obj.text;
        this._selectinfo.value = obj.value;

        if (nexacro._isTouchInteraction)
            this._selectinfo_list[this._selectinfo_list.length] = this._selectinfo;

        if (!shiftkey)
        {
            this._shift_select_base_index = obj.index;
        }

        this._lbtnDownIdx = obj.index;
    };

    _pListBox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (!this._is_alive) return;

		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
    };

    _pListBox.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp)
    {
        if (from_refer_comp &&
            (from_refer_comp instanceof nexacro.ScrollBarControl ||
            (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarControl))) return;
        
        var up_obj = this._getWindow().findComponent(touchinfos[0].target);
        var sel_info_list = this._selectinfo_list;

        var ret = nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);

        while (sel_info_list.length)
        {
			var down_item = sel_info_list[0].obj;
            if (down_item)
            {
                down_item._keep_selecting = false;

                var items = this._get_contents_rows();
                var change_item;
                
                if (this._contains(up_obj))
                {
                    var evt = touchinfos[0];

				    var canvasX = evt.canvasx;
				    var canvasY = evt.canvasy;

				    var elem = this.getElement();
				    if (elem)
                    {
				    	var border = this._getCurrentStyleBorder();
				    	var c_l_border = border ? border._getBorderLeftWidth() : 0;
				    	var c_t_border = border ? border._getBorderTopWidth() : 0;
				        canvasX = canvasX - ((elem.scroll_left ? elem.scroll_left : 0) - c_l_border);    
				        canvasY = canvasY - ((elem.scroll_top ? elem.scroll_top : 0) - c_t_border);   

				        if (canvasX < 0) canvasX = c_l_border;
				        if (canvasY < 0) canvasY = c_t_border;
                    }

				    var clientXY = this._getClientXY(canvasX, canvasY);

				    //this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, evt._current_state, this._altKey, this._ctrlKey, this._shiftKey, evt.screenX, evt.screenY, evt.canvasX, evt.canvasY, evt.clientX, evt.clientY);
				    this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, evt._current_state, this._altKey, this._ctrlKey, this._shiftKey, evt.screenx, evt.screeny, canvasX, canvasY, clientXY[0], clientXY[1]);

                        change_item = down_item;

                    var change_index = change_item.index;

                    if (this.multiselect)
                    {
                        if (this._shiftKey === true || this._ctrlKey === true)
                        {
                            this._select_withmouseevent(change_index);
                        }
                        else
                        {
                            this._do_select(change_index, false);
                        }
                    }
                    else
                    {
                        if (this._changeIndex(change_index))
                        {
                            this.on_apply_index();
                        }
                        else
                        {
                            if (!down_item.selected)
                            {
                                down_item._changeUserStatus("selected", false);
                            }
                        }
                    }
                }
                else
                {
                    if (!down_item.selected)
                    {
                        down_item._changeUserStatus("selected", false);
                    }
                }
            }

            sel_info_list.shift();
        }

        return ret;
    };

    _pListBox.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem)
    {
        if (from_refer_comp &&
            (from_refer_comp instanceof nexacro.ScrollBarControl ||
            (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarControl))) return;

        var up_obj = this._getWindow().findComponent(from_elem);
        var sel_info = this._selectinfo;

        var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);

        var down_item = sel_info.obj;
        if (down_item)
        {
            down_item._keep_selecting = false;

            var items = this._get_contents_rows();
            var change_item;

            if (this._contains(from_elem))
            {
                this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

                if (nexacro._enableaccessibility)
                {
                    if (this._accessibility_index > -1)
                    {
                        var sel_item = this._get_rowobj_byrow(this._accessibility_index);
                        if (sel_info.index != this._accessibility_index && sel_item && sel_item._selected == true)
                        {
                            this._deselect_all(true);
                            sel_item._changeUserStatus("selected", false);
                        }
                    }
                }

                change_item = down_item;

                var change_index = change_item.index;

                if (this.multiselect)
                {
                    if (this._shiftKey == true || this._ctrlKey == true)
                    {
                        this._select_withmouseevent(change_index);
                    }
                    else
                    {
                        this._do_select(change_index, false);
                    }
                }
                else
                {
                    if (this._changeIndex(change_index))
                    {
                        this.on_apply_index();
                    }
                    else
                    {
                        if (!down_item.selected)
                        {
                            down_item._changeUserStatus("selected", false);
                        }
                    }

                    if (down_item != up_obj)
                    {
                        down_item._changeStatus("mouseover", false);
                    }
                }
            }
            else
            {
                if (!down_item.selected)
                {
                    down_item._changeUserStatus("selected", false);
                }               
            }
        }

        return ret;
    };

    _pListBox.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		if (this.selectscrollmode == "select" && this.multiselect)
        {
			if (this._innerdataset)
            {
                var idx = -1;
                if (touchinfos[0].target && touchinfos[0].target.parent)
                    idx = touchinfos[0].target.parent.index;

                if (this._lbtnDownIdx > -1 && idx > -1)
                {
                    this._deselect_all(true);

                    var startRow = this._lbtnDownIdx;
                    var endRow = idx;
                    var finalRow = idx;

                    if (!nexacro._isNumber(startRow))
                    {
                        startRow = 0;
                    }
                    if (!nexacro._isNumber(endRow))
                    {
                        endRow = this._get_rowcount();
                    }

                    if (startRow > endRow)
                    {
                        var tmp = endRow;
                        endRow = startRow;
                        startRow = tmp;
                        finalRow = tmp;
                    }

                    var rows = [];
                    for (i = startRow; i <= endRow; i++)
                    {
                        rows.push(i);
                    }
                    this._doMultiSelect(rows, true);
                    this._changeIndex(finalRow);
                }
            }

            return true;
        }

        return ret;
    };

    _pListBox.on_notify_item_onmouseenter = function (obj, e)
    {
        this._overeditemindex = obj.index;
        return false;
    };

    _pListBox.on_notify_item_onmouseleave = function (obj, e)
    {
        var items = this._get_contents_rows();
        obj = this._getItemByRealIdx(items, this._overeditemindex).obj;

        if (obj)
        {
            if (!obj.selected)
            {
                this._overeditemindex = -1;
            }
        }
    };

    _pListBox.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
		if (this.readonly)
			return false;
        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            var ret = this.onitemclick._fireEvent(this, evt);
            evt = null;
            return nexacro._toBoolean(ret);
        }

        return false;
    };

    _pListBox.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        if (this.canitemchange && this.canitemchange._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
            var ret = this.canitemchange._fireCheckEvent(this, evt);
            evt = null;
            return nexacro._toBoolean(ret);
        }

        return true;
    };

    _pListBox._onItemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        this.applyto_bindSource("value", obj.value);
        this.on_fire_onitemchanged(this, preindex, pretext, prevalue, postindex, posttext, postvalue);
        return true;
    };

    _pListBox.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue)
    {
        if (!this._selectinfo)  // skip if it is destroyed
            return false;

        this._selectinfo.obj = null;
        this._selectinfo.index = obj.index;
        this._selectinfo.text = obj.text;
        this._selectinfo.value = obj.value;

        var sel_info = this._selectinfo;
        sel_info.index = postindex;
        sel_info.text = posttext;
        sel_info.value = postvalue;

        if (this.onitemchanged && this.onitemchanged._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
            var ret = this.onitemchanged._fireEvent(this, evt);
            return nexacro._toBoolean(ret);
        }

        return false;
    };

    _pListBox.on_notify_item_ondblclick = function (obj, e)
    {
		if (this.readonly || !this.enableevent)
			return false;

		return this.on_fire_onitemdblclick(this, this.index, this.text, this.value, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty);
    };

    _pListBox.on_fire_onitemdblclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
		if (this.readonly)
			return false;
        if (this.onitemdblclick && this.onitemdblclick._has_handlers)
        {
            var evt = new nexacro.ItemClickEventInfo(obj, "onitemdblclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
            var ret = this.onitemdblclick._fireEvent(this, evt);
            return nexacro._toBoolean(ret);
        }

        return false;
    };

    _pListBox._adjustScrollRows_callback = function (no_ani)
    {
        var pos = this.vscrollbar ? this.vscrollbar._pos : 0;

        if (no_ani)
        {
            this._scroll_vpos_queue = [];
        }
        else
        {
            this._scroll_vpos_queue.pop();

            if (this._scroll_vpos_queue.length > 0)
            {
                this._aniframe_rowscroll.start();
            }
        }

		var visible_start = this._get_first_visible_row();
        var visible_end = this._get_last_visible_row(true);

        this._draw_contents(visible_start, visible_end);
        this._control_element.setElementVScrollPos(pos);
        this._clearHiddenPage();
    };

    _pListBox._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind)
    {
        if (evttype == "trackstart" || evttype == "tracklastover" || evttype == "trackfirstover")
            return true;

        if (nexacro._Browser == "Runtime" || (navigator.userAgent.indexOf("Android 4.1") > -1 || navigator.userAgent.indexOf("Android 4.2") > -1 || navigator.userAgent.indexOf("Android 4.3") > -1))
        {
            this._adjustScrollRows_callback(true);
        }
        else
        {
            if (evtkind == "fling" || evtkind == "slide" || evttype == "track")
            {
                if (!this._aniframe_rowscroll)
                {
                    var pThis = this;
                    this._scroll_vpos_queue = [];

                    this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () { pThis._adjustScrollRows_callback(); });
                }

                var cnt = this._scroll_vpos_queue.push(postvpos);

                if (cnt == 1)
                    this._aniframe_rowscroll.start();
            }
            else
            {
                this._adjustScrollRows_callback(true);
            }
        }

        return true;
    };

    _pListBox.on_hscroll = function (obj, e)
    {
        if (this.onhscroll && this.onhscroll._has_handlers)
        {
            e.fromobject = this;
            this.onhscroll._fireEvent(this, e);
        }

        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementHScrollPos(e.pos);
			control_elem = null;
        }

        return true;
    };

    _pListBox._setVScrollDefaultAction = function (wheelDeltaY)
    {
        if (this.scrolltype == "none" || this.scrolltype == "horizontal")
        {
            return false;
        }   

        var control_elem = this.getElement();
        if (control_elem)
        {
            var itemheight = this._get_rowheight();

            var old_value = this._vscroll_pos;
            var value = old_value + itemheight;
            if (wheelDeltaY > 0)
            {
                value = old_value - itemheight
            }

            if (value > control_elem.vscroll_limit)
            {
                value = control_elem.vscroll_limit;
            }

            this._scrollTo(this._hscroll_pos, value, true, true, undefined, "mousewheel_v");

            if (old_value != this._vscroll_pos)
            {
                return true;
            }   
        }
        return false;
    };
   
    //===============================================================
    // Logical Part  ( Internal Function Part )
    //---------------------------------------------------------------
    // create item
    _pListBox._create_item = function (id, position, left, top, width, height, right, bottom, parent)
    {
        return new nexacro._ListBoxItemControl(id, position, left, top, width, height, right, bottom, parent);
    };

    // create listbox row
    _pListBox._create_row = function (nRow, left, top, right, bottom)
    {
        var ds = this._innerdataset;
        var dataCol = this.datacolumn ? this.datacolumn : this._datacolumn;
        var codeCol = this.codecolumn ? this.codecolumn : this._codecolumn;
        var txt = ds.getColumn(nRow, dataCol);
        var val = ds.getColumn(nRow, codeCol);

        var item = this._create_item("item_" + nRow, "absolute", left, top, right - left, bottom - top, null, null, this);
        item.set_value(val);
        item.set_text(txt);
        item.set_index(nRow);
        item.set_selected(false);
        if (this.readonly)
            item.set_readonly(true);
        if (nexacro._enableaccessibility)
        {
            this._setItemAccessibility(item);
        }
            

        item._setEventHandler("onlbuttondown", this.on_notify_item_onlbuttondown, this);
        item._setEventHandler("ontouchstart", this.on_notify_item_onlbuttondown, this);
        item._setEventHandler("ondblclick", this.on_notify_item_ondblclick, this);
        item._setEventHandler("onmouseenter", this.on_notify_item_onmouseenter, this);
        item._setEventHandler("onmouseleave", this.on_notify_item_onmouseleave, this);
        item.createComponent();

		if (!this._is_created)
		{
			this._listitems[this._listitems.length] = item;
		}

        if (this.multiselect === true)
        {
            var selItems = this._select_multi.items;
            var len = this._select_multi.length;

            for (var i = 0; i < len; i++)
            {
                if (nRow == selItems[i])
                {
                    item.set_selected(true);
                    break;
                }
            }
        }
        else
        {
            if (this.index == nRow)
            {
                item.set_selected(true);
				this._set_last_selectfocused(nRow);
            }
        }

        return item;
    };

    
    _pListBox._get_rowcount = function ()
    {
        var ds = this._innerdataset;
        if (ds && (this.datacolumn || this.codecolumn))
        {
            return ds.getRowCount();
        }
        else
        {
            return 0;
        }
    };

    _pListBox._getMaxTextSize = function (font)
    {
        var ds = this._innerdataset;
        var col = this.datacolumn || this.codecolumn;
		if (!ds || !col)
			return 0;

		var ds_cnt = ds.getRowCount();
		if (ds_cnt <= 0) return 0;

        var itemWidth;        
        var maxWidth = 0;
        for (i = 0; i < ds_cnt; i++)
        {
            itemWidth = nexacro._getTextSize(ds.getColumn(i, col), font)[0];
            if (maxWidth < itemWidth) maxWidth = itemWidth;
        }

        //maxWidth = Math.max(this._contents_maxwidth, maxWidth);
        return maxWidth;
    };

    _pListBox._get_rowheight = function ()
    {
        var itemheight = this._itemheight;
        var item = this._hiddenitem;
        if (!itemheight && item) //need to check!
        {            
            var status = item._status;
            var userstatus = item._userstatus;
            var font = item.font || item._getCurrentStyleInheritValue("font", status, userstatus);
            var itempadding = item._getCSSStyleValue("padding", status, userstatus);
            var itemborder = item._getCSSStyleValue("border", status, userstatus);
            itemheight = nexacro._getTextSize("<", font)[1];
            itemheight += itempadding ? itempadding.top + itempadding.bottom : 0;
            itemheight += itemborder ? itemborder._getBorderHeight() : 0;
            this._itemheight = itemheight;
        }
        return itemheight ? itemheight | 0 : 0;
    };

    _pListBox._get_select_mode = function ()
    {
        if (this.multiselect)
        {
            return "multi";
        }
        else
        {
            return "single";
        }
    };

 
    _pListBox._getItemByRealIdx = function (arr, target)
    {
        if (nexacro._isArray(arr))
        {
            for (var i = 0; i < arr.length; i++)
            {
                if (arr[i].index == target)
                {
                    return {
                        "obj": arr[i],
                        "index": i
                    };
                }
            }
        }

        return {
            "obj": null,
            "index": null
        };
    };

    _pListBox._clearHiddenPage = function ()
    {
		var visible_start = this._get_first_visible_row();
        var visible_end = this._get_last_visible_row(true);

        var spage = this._get_page_from_rowidx(visible_start);
        var epage = this._get_page_from_rowidx(visible_end);
        var remain_cnt = 100;
        var rowcount = this._get_rowcount();

        if (this._buffer_pages)
        {
            var buffer_pages = this._buffer_pages;
            var rowobjs, rowobj;
            var delrowcnt = 0;

            for (var i = 0, n = buffer_pages.length ; i < n ; i++)
            {
                if (i >= spage && i <= epage)
                    continue;

                if ((rowcount - delrowcnt) <= remain_cnt)
                    break;

                rowobjs = buffer_pages[i];
                if (rowobjs)
                {
                	for (var j = 0, jlen = rowobjs.length ; j < jlen ; j++)
                	{
                		rowobj = rowobjs[j];
                		if (rowobj)
                			rowobj.destroy();
                		delrowcnt++;
                	}
                	buffer_pages[i] = null;
                }
            }
        }
    };

    _pListBox._draw_contents = function (start, end, dir)
    {
		if (!this._buffer_pages)
			this._buffer_pages = [];
		var buffer_page;
        var rowobj;
        var start_row, pos;

        if (!this._has_range(start, end))
        {
            var start_page = this._get_page_from_rowidx(start);
            var end_page = this._get_page_from_rowidx(end);
            var page;

            start_row = (start_page - 1) * this._page_rowcount;
            var total_cnt = this._get_rowcount();
            var rowheight = this._get_rowheight();
            var control_elem = this.getElement();
            var row_width = 0;
            var page_rowcount = this._page_rowcount;

			row_width = Math.max(this._contents_maxwidth, control_elem.client_width);
            for (page = start_page; page <= end_page; page++)
            {
                if (!this._buffer_pages[page])
                {
                    buffer_page = this._buffer_pages[page] = [];

                    for (var j = 0 ; j < page_rowcount ; j++)
                    {
                        pos = (pos === undefined) ? (start_row * rowheight) : pos;
                        rowobj = this._create_row(start_row, 0, pos, row_width, pos + rowheight);
                        buffer_page.push(rowobj);
                        pos = rowobj._adjust_top + rowobj._adjust_height;
                        start_row++;
						if (total_cnt <= start_row)
							break;
                    }
                }
                else
                {
                    buffer_page = this._buffer_pages[page];
                    var buf = buffer_page[buffer_page.length - 1];
                    pos = buf._adjust_top + buf._adjust_height;
                    start_row += buffer_page.length;
                }
            }
        }

        this._previous_start = this._cur_start;
        this._previous_end = this._cur_end;
        this._cur_start = start;
        this._cur_end = end;
    };

    _pListBox._resetDisplayInfo = function ()
    {
        var control_elem = this.getElement();
		if (!control_elem)
			return;

        this._page_rowcount = Math.ceil((control_elem.client_height) / this._get_rowheight());
        this._page_rowcount_min = Math.floor((control_elem.client_height) / this._get_rowheight());

        var rowcount = this._get_rowcount();
        if (rowcount === 0)
        {
            this._total_page_cnt = 0;
            this._total_page_rowcnt = 0;
        }
        else
        {
            this._total_page_cnt = Math.ceil(rowcount / this._page_rowcount);
            this._total_page_rowcnt = (this._page_rowcount * this._total_page_cnt);
        }
    };

    _pListBox._recreate_data = function (keep_scroll)
    {
        var control_elem = this.getElement();
		if (!control_elem)
			return;

        this._clear_contents();

        this._resetDisplayInfo();

        var rowcount = this._get_rowcount();
		if (rowcount == 0)
			return;

        var startrow, endrow;

        if (keep_scroll)
        {
			startrow = this._get_first_visible_row();
            endrow = this._get_last_visible_row(true);
        }
        else
        {
            startrow = 0;
            if (rowcount <= this._total_page_rowcnt)
                endrow = rowcount - 1;
            else
                endrow = this._total_page_rowcnt - 1;

            if (this._page_rowcount < endrow)
                endrow = this._page_rowcount;
        }

        this._draw_contents(startrow, endrow);

        if (this._is_created_contents)
        {
            this._onRecalcScrollSize();
        }        	
    };

    _pListBox._setContentsMaxSize = function()
    {
		this._setContentsMaxWidth();
		this._contents_maxheight = this._get_rowcount() * this._get_rowheight();
        this._scroll_default_value = this._get_rowheight();
    };

    _pListBox._setContentsMaxWidth = function ()
    {
        var ad_width = 0;
    	if (this._hiddenitem)
    	{
    		if (!this._currentdisplayfont)
    			this._currentdisplayfont = this._hiddenitem._getCurrentStyleInheritValue("font", this._status, this._userstatus);
    		var itempadding = this._hiddenitem._getCSSStyleValue("padding", this._status, this._userstatus);
    		var itemborder = this._hiddenitem._getCSSStyleValue("border", this._status, this._userstatus);
    		ad_width += itempadding ? itempadding.left + itempadding.right : 0;
    		ad_width += itemborder ? itemborder._getBorderWidth() : 0;
    	}
    	
        var dataset = this._innerdataset;
		if (dataset)
		{  
			var datacolumn = this.datacolumn;
            var row = dataset.findMaxLengthRow(datacolumn);
            var size = this._getMaxTextSize(this._currentdisplayfont);
            this._contents_maxwidth = size + ad_width;            
        }
    };

    _pListBox._onRecalcScrollSize = function (is_contents_resize)
    {
    	var control_elem = this.getElement();
    	
    	if (control_elem && control_elem.handle)
    	{
    		var contents_maxwidth = this._contents_maxwidth;
    		var contents_maxheight = this._contents_maxheight;

    		if (!nexacro._isNull(contents_maxwidth) && !nexacro._isNull(contents_maxheight))
    		{
    		    contents_maxwidth = Math.max(contents_maxwidth, control_elem.client_width);
    		    contents_maxheight = Math.max(contents_maxheight, control_elem.client_height);
    		}
    		else
    		{
    		    contents_maxwidth = 0;
    		    contents_maxheight = 0;
    		}
    		
    		if ((control_elem.container_maxwidth != contents_maxwidth || control_elem.container_maxheight != contents_maxheight))
    		    control_elem.setElementScrollMaxSize(contents_maxwidth, contents_maxheight);

    		this._onResetScrollBar();
    	}
    };

    _pListBox._clear_contents = function ()
    {    	
    	if (this._buffer_pages)
    	{
    		var buffer_pages = this._buffer_pages;
    		var rowobjs, rowobj;
    		for (var i = 0, n = buffer_pages.length ; i < n ; i++)
    		{
    			rowobjs = buffer_pages[i];
    			if (rowobjs)
    			{
    				for (var j = 0, jlen = rowobjs.length ; j < jlen ; j++)
    				{
    					rowobj = rowobjs[j];
    					if (rowobj)
    						rowobj.destroy();
    				}
    				buffer_pages[i] = null;
    			}
    		}
    	}
    	this._buffer_pages = null;
    };

    _pListBox._get_first_visible_row = function ()
    {
        var scrollTop = (this.vscrollbar) ? this.vscrollbar.pos : 0;
        return Math.floor(scrollTop / this._get_rowheight());
    };

    _pListBox._get_last_visible_row = function (bPrecision)
    {
        var lastrow;
        if (bPrecision)
            lastrow = this._get_first_visible_row() + this._page_rowcount;
        else
            lastrow = this._get_first_visible_row() + this._page_rowcount_min;

        var rowcnt = this._get_rowcount();

        if (lastrow >= rowcnt)
            lastrow = rowcnt - 1;

        return lastrow;
    };

    _pListBox._get_page_from_rowidx = function (rowidx)
    {
        return Math.floor(rowidx / this._page_rowcount) + 1;
    };

    _pListBox._has_range = function (start, end)
    {
		if (!this._buffer_pages)
			return false;
        var page = this._get_page_from_rowidx(start),
			end_page = this._get_page_from_rowidx(end);

        for (; page <= end_page; page++)
        {
            if (!this._has_page(page))
            {
                return false;
            }
        }

        return true;
    };

    _pListBox._has_page = function (page)
    {
        return !!this._buffer_pages[page];
    };

    _pListBox._get_contents_rows = function ()
    {
        var buffer_pages = this._buffer_pages,
			ret_arr = [];
        if (buffer_pages)
        {
            var rowobjs, rowobj;
            for (var i = 0, n = buffer_pages.length ; i < n ; i++)
            {
                rowobjs = buffer_pages[i];
                if (rowobjs)
                {
                    ret_arr = ret_arr.concat(rowobjs);
                }
            }
        }

        return ret_arr;
    };

    _pListBox._get_rowobj_byrow = function (nRow)
    {
        var buffer_pages = this._buffer_pages;
        if (buffer_pages)
        {
            var rowobjs, rowobj;
            for (var i = 0, n = buffer_pages.length ; i < n ; i++)
            {
                rowobjs = buffer_pages[i];
                if (rowobjs)
                {
                    for (var j = 0, jlen = rowobjs.length ; j < jlen ; j++)
                    {
                        rowobj = rowobjs[j];
                        if (rowobj && rowobj.index == nRow)
                        {
                            return rowobj;
                        }
                    }
                }
            }
        }
    };

    _pListBox._select_withmouseevent = function (idx, e, keepExisting)
    {
        switch (this._get_select_mode())
        {
            case 'multi':
                if (this._shiftKey)
                {
                    if (!this._ctrlKey)
                    {
                        this._deselect_all(true);
                    }
                    this._select_range(this._shift_select_base_index, idx, this._shiftKey);
                }
                else if (this._ctrlKey)
                {
                    var item = this._get_rowobj_byrow(idx);

                    if (item)
                    {
                        item.set_selected(!item.selected);
                    }

                    if (item.selected === false)
                    {
                        var i, len;
                        var sel = this._select_multi;
                        len = sel ? sel.length : 0;

                        for (i = 0; i < len; i++)
                        {
                            if (idx === sel.items[i])
                                this._select_remove(idx);
                        }
                    }
                    else
                    {
                        this._select_add(idx);
                    }
					this._set_last_selectfocused(idx);
                }
                else if (this._is_selected(idx) && !this._shiftKey && !this._ctrlKey && this._get_selectcount() > 1)
                {
                    this._do_select(idx, keepExisting, false);
                }
                else
                {
                    this._do_select(idx, false);
                }
                break;
            case 'single':
                this._do_select(idx, false);
                break;
        }
    };

    _pListBox._select_withkeyupevent = function (e)
    {
		var lastidx = this._select_multi.lastselected == null ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;

        if (lastidx > 0)
        {
            var idx = lastidx - 1;
            if (e.shiftkey && lastidx)
            {
                if (this._is_selected(lastidx) && this._is_selected(idx))
                {
                    this._do_deselect(lastidx, true);
                    this._set_last_selectfocused(idx);

                    if (this._isAccessibilityEnable())
                    {
                        var item = this._get_contents_rows();
                        item[idx]._setFocus(true);
                    }
                }
                else if (!this._is_selected(lastidx))
                {
                    this._do_select(lastidx, true);
                    this._do_select(idx, true);
                }
                else
                {
                    this._do_select(idx, true);
                }
            }
            else
            {
                this._shift_select_base_index = null;
                this._deselect_all(true);
                this._do_select(idx);
            }
        }
    };

    _pListBox._select_withkeydownevent = function (e)
    {
		var lastidx = this._select_multi.lastselected == null ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;
        var total_cnt = this._get_rowcount();

        if (lastidx + 1 < total_cnt)
        {
            //if (this._last_focused)
            //    this._do_defocus(this._last_focused);
            var idx = lastidx + 1;
            if (e.shiftkey && lastidx >= 0)
            {
                if (this._shift_select_base_index == lastidx)
                {
                    this._deselect_all(true);
                    this._do_select(this._shift_select_base_index, true);
                }
                if (this._is_selected(lastidx) && this._is_selected(idx))
                {
                    this._do_deselect(lastidx, true);
                    this._set_last_selectfocused(idx);
                }
                else if (!this._is_selected(lastidx))
                {
                    this._do_select(lastidx, true);
                    this._do_select(idx, true);
                }
                else
                {
                    this._do_select(idx, true);
                }
            }
            else
            {
                this._shift_select_base_index = null;
                this._deselect_all(true);
                this._do_select(idx);
            }
        }
    };

    _pListBox._getPreCalculateWantTab = function (keycode, shift_key)
    {
        if (this._selectinfo && this._selectinfo.index > -1)
        {
            var sel_index = this._selectinfo.index;
            if (sel_index != -1 && this.index == sel_index)
                return false;
        }
        else
        {
            var index = this._accessibility_index;
            if (shift_key)
            {
                if (index < 0)
                    return false;
            }
            else
            {
                var totalcnt = this._get_contents_rows().length;
                if (index + 1 > totalcnt)
                    return false;
            }
        }

        return this._want_tab;
    };

    _pListBox._getPreCalculateWantArrow = function (keycode)
    {
        if (keycode == nexacro.Event.KEY_UP)
        {
            var index = this._accessibility_index;
            if (index == 0 && !this._isAccessibilityEnable())
            {
                return false;
            }
            else if (this._accessibility_index == -1)
            {
                var nex_idx = this._getNextAccessibilityOrderIndex(-1);

                if (nex_idx > -1)
                    return true;
                else
                    return false;
            }
        }
        else if (keycode == nexacro.Event.KEY_DOWN)
        {
			if (this.index)
            {
                var totalcnt = this._get_contents_rows().length;
                if (this.index > -1 && this._accessibility_index == -1)
                    return true;
                else if (index >= totalcnt - 1 || this._getNextAccessibilityOrderIndex(1) >= totalcnt || this._getNextAccessibilityOrderIndex(1) < 0)
                {
                    return false;
                }
            }
			else
                return true;
        }

        return this._want_arrow;
    };

    _pListBox._getNextAccessibilityOrderIndex = function (direction)
    {
        var cur_idx = this._accessibility_index;
        var ar = this._get_contents_rows();
        if (direction > 0)
        {
            for (var i = cur_idx + direction; i < ar.length; i++)
            {
                if (ar[i]._isAccessibilityEnable())
                    return i;
            }
            cur_idx = -1;
        }
        else if (direction < 0)
        {
            for (var i = cur_idx + direction; i >= 0; i--)
            {
                if (ar[i]._isAccessibilityEnable())
                    return i;
            }
            cur_idx = this._accessibility_index = -1;
        }

        return cur_idx;
    };

    _pListBox._do_scroll = function (dir)
    {
        var visible_start = this._get_first_visible_row();
		var rowheight = this._get_rowheight();

		var vscrollbar = this.vscrollbar;
        var vscroll_pos = this._vscroll_pos;
        if (vscrollbar)
        {
			var idx = visible_start;

			if (dir == "down")
			{
				idx += 1;
			}
            else
            {
			    if (vscroll_pos <= idx * rowheight)
					idx -= 1;
            }

			this._scrollTo(null, idx * rowheight);
        }
    };

    _pListBox._select_add = function (selectIdx)
    {
        if (selectIdx < 0 || selectIdx > this._innerdataset.getRowCount() - 1)
        {
            return;
        }
        var k = selectIdx + "";
        var info = this._select_multi;
        var old = info.map[k];

        if (typeof old != 'undefined')
        {
            return this._select_replace(k, selectIdx);
        }
        info.map[k] = selectIdx;
        info.length++;
        info.items.push(selectIdx);
        info.keys.push(k);

        this._changeIndex(selectIdx, undefined, undefined, "_select_add");
    };

    _pListBox._select_replace = function (k, selectIdx)
    {
        var idx = this._select_indexOfkey(k);
        var info = this._select_multi;
        info.items[idx] = selectIdx;
        info.map[k] = selectIdx;
    };

    _pListBox._select_indexOfkey = function (k)
    {
        k += "";
        return nexacro._indexOf(this._select_multi.keys, k);
    };

    _pListBox._get_selectcount = function ()
    {
        return this._select_multi.length;
    };

    _pListBox._select_remove = function (selectIdx)
    {
        var idx = this._select_indexOfkey(selectIdx);
        var info = this._select_multi;
        if (idx < info.length && idx >= 0)
        {
            info.length--;
            info.items.splice(idx, 1);
            var k = info.keys[idx];
            if (typeof k != 'undefined')
            {
                info.map[k] = undefined;
            }
            info.keys.splice(idx, 1);
            if (!this.multiselect && info.length == 0)
            {
                this.index = -1;
                this.text = "";
                this.value = undefined;
            }

            return selectIdx;
        }

        return false;
    };

    _pListBox._select_indexOf = function (selectIdx)
    {
        if (!this.multiselect)
            return this._selectinfo ? this._selectinfo.index == selectIdx : -1;
        else
            return nexacro._indexOf(this._select_multi.items, selectIdx);
    };

    _pListBox._get_selection_last = function ()
    {
        var info = this._select_multi;
        return info.items[info.length - 1];
    };

    _pListBox._get_select_range = function (start, end)
    {
        var info = this._select_multi;
        var items = info.items,
			range = [],
			i;

        if (items.length < 1)
        {
            return range;
        }

        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? info.length - 1 : end, info.length - 1);

        if (start <= end)
        {
            for (i = start; i <= end; i++)
            {
                range[range.length] = items[i];
            }
        }
        else
        {
            for (i = start; i >= end; i--)
            {
                range[range.length] = items[i];
            }
        }

        return range;
    };

    _pListBox._select_clear = function ()
    {
        var items = this._get_contents_rows();
        var length = items.length;
        if (items)
        {
            for (var i = 0; i < length; i++)
            {
                items[i].set_selected(false);
            }
        }
        this._select_multi = { "items": [], "map": {}, "keys": [], "length": 0, "lastselected": null };
    };

    _pListBox._is_selected = function (idx)
    {
        return this._select_indexOf(idx) !== -1;
    };

    _pListBox._select_range = function (startRow, endRow, keepExisting, dir)
    {
        if (!keepExisting)
        {
            this._deselect_all(true);
        }

        var selectedCount = 0,
			i,
			tmp,
			dontdeselect,
			rows = [],
        FinalRow = endRow;

        if (!nexacro._isNumber(startRow))
        {
            startRow = 0;
        }
        if (!nexacro._isNumber(endRow))
        {
            endRow = this._get_rowcount();
        }

        if (startRow > endRow)
        {
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
            FinalRow = tmp;
        }

        for (i = startRow; i <= endRow; i++)
        {
            if (this._is_selected(i))
            {
                selectedCount++;
            }
        }

        if (!dir)
        {
            dontdeselect = -1;
        }
        else
        {
            dontdeselect = (dir == 'up') ? startRow : endRow;
        }

        for (i = startRow; i <= endRow; i++)
        {
            if (selectedCount == (endRow - startRow + 1))
            {
                if (i != dontdeselect)
                {
                    this._do_deselect(i, true);
                }
            }
            else
            {
                rows.push(i);
            }
        }
        this._doMultiSelect(rows, true);
        this._changeIndex(FinalRow);
    };

    _pListBox._deselect_all = function (isNotFireEvent)
    {
        var i = 0,
			len = this._get_rowcount();

        for (; i < len; i++)
        {
            this._do_deselect(i, isNotFireEvent);
        }
    };

    _pListBox._do_select = function (rows, keepExisting, isNotFireEvent)
    {
        if (this.readonly) return false;
        var idx;

        if (typeof rows === "number")
        {
            rows = [rows];
        }

        if (this._get_select_mode() == "single" && rows)
        {
            idx = rows.length ? rows[0] : rows;
            this._doSingleSelect(idx, isNotFireEvent);
        }
        else
        {
            this._doMultiSelect(rows, keepExisting, isNotFireEvent);
        }
    };

    _pListBox._do_deselect = function (rows, isNotFireEvent)
    {
        if (nexacro._isNumber(rows))
        {
            rows = [rows];
        }
        else if (!nexacro._isArray(rows))
        {
            rows = [rows];
        }

        var len = rows.length;
        var idx, i = 0, attempted = 0;
        var params = [0];
        var info = this._select_multi;

        for (; i < len; i++)
        {
            idx = rows[i];
            if (this._is_selected(idx))
            {
                ++attempted;
                this._on_select_change(idx, false, "deselect", params, isNotFireEvent);
            }
        }

        return params[0] === attempted;
    };

    _pListBox._select_commit = function (jobgbn, row, params)
    {
        var info = this._select_multi;

        switch (jobgbn)
        {
            case "deselect":
                ++(params[0]);
                this._select_remove(row);
                break;
            case "singleselect":
                var last_select_row = info.lastselected;
                this._select_add(row);
                if (last_select_row != row && this._get_selectcount() > 0 && this._do_deselect(last_select_row) === false)
                {
                    return false;
                }
                params[0] = true;
                break;
            case "multiselect":
                this._select_add(row);
                params[0] = true;
                break;
        }
    };

    _pListBox._doSingleSelect = function (idx, isNotFireEvent)
    {
        var params = [false];
        this._on_select_change(idx, true, "singleselect", params, isNotFireEvent);

        if (params[0])
        {
            if (!isNotFireEvent)
            {
                this._set_last_selectfocused(idx);
            }
        }
    };

    _pListBox._doMultiSelect = function (rows, keepExisting, isNotFireEvent)
    {
        var sel_row = rows[0];
        var single_sel = this._selectinfo.index;

        var len = rows.length;

        if (!keepExisting && this._get_selectcount() > 0)
        {
            if (this._do_deselect(this._get_select_range(), isNotFireEvent) === false)
            {
                return;
            }
        }

        var params = [false];
        var i = 0, idx;
        var info = this._select_multi;

        for (; i < len; i++)
        {
            idx = rows[i];
            if (keepExisting && this._is_selected(idx))
            {
                continue;
            }
            this._on_select_change(idx, true, "multiselect", params, isNotFireEvent);
        }
        this._set_last_selectfocused(sel_row, isNotFireEvent);
    };

    _pListBox._set_last_selectfocused = function (idx, isNotFireEvent)
    {
		var rowBeforeLast = this._select_multi.lastselected;
		this._select_multi.lastselected = idx;

        if (idx !== rowBeforeLast)
        {
            this._on_last_selectfocuschanged(idx, isNotFireEvent);
        }
    };

    _pListBox._on_select_change = function (idx, isSelected, jobgbn, params, isNotFireEvent)
    {
        if (this._select_commit(jobgbn, idx, params) !== false)
        {
        	var rowobj = this._get_rowobj_byrow(idx);
        	if (rowobj)
        	{
        		if (isSelected)
        			rowobj.set_selected(true);        		
        		else
        			rowobj.set_selected(false); 
        	}
        }
    };

    _pListBox._on_last_selectfocuschanged = function (newFocused, isNotFireEvent)
    {
        if (newFocused > -1)
        {
            var control_elem = this.getElement();
            var visible_start = this._get_first_visible_row();
            var visible_end = this._get_last_visible_row(true);

            if (this.vscrollbar)
            {
                if (newFocused <= visible_start)
                {
                    this.vscrollbar.set_pos(newFocused * this._get_rowheight());
                }
                else if (newFocused >= visible_end)
                {
                    if (control_elem)
                    {
                        var pos = (newFocused + 1) * this._get_rowheight() - control_elem.client_height;
                        this.vscrollbar.set_pos(pos);
                    }
                }
            }
            else
            {
                var item = this._get_contents_rows();
                if (item[newFocused])
                {
                    var item_control_elem = item[newFocused].getElement();
                    if (item_control_elem)
                    {
                        item_control_elem.setElementFocus();
                    }
                }
            }
        }
    };

    _pListBox._do_defocus = function (target, bParent)
    {
        var _window = this._getWindow();
        _window._removeFromCurrentFocusPath(target, true);
        if (bParent)
            _window._removeFromCurrentFocusPath(this, true);
    };

    _pListBox._changeIndex = function (v, bIgnoreCompareIdx, change_by_script)
    {
        if (bIgnoreCompareIdx || v != this.index)
        {
            var dataset = this._innerdataset;
            var postindex = parseInt(v, 10) | 0;

            var preidx = this.index;
            var pretext = this.text;
            var prevalue = this.value;

            var column = (this.codecolumn || this.datacolumn);
            if (dataset && column)
            {
                var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
                var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

                var posttext = datavalue == undefined ? "" : datavalue;
                var postvalue = codevalue;

                if (change_by_script != true)
                {
                    if (this.on_fire_canitemchange(this, preidx, pretext, prevalue, postindex, posttext, postvalue) != false)
                    {
                        this._accessibility_index = this.index = postindex;
                        this.text = posttext;
                        if (!this._is_value_setting)
                        {
                            this.value = postvalue;
                        }
                        this.applyto_bindSource("value", codevalue);
                        this.on_fire_onitemchanged(this, preidx, pretext, prevalue, postindex, posttext, postvalue);
                        return true;
                    }
                }
                else
                {
                    this._accessibility_index = this.index = postindex;
                    this.text = posttext;
                    if (!this._is_value_setting)
                    {
                        this.value = postvalue;
                    }
                    this.applyto_bindSource("value", codevalue);
                    return true;
                }
            }
        }

        return false;
    };

    // ==============================================================================
    // nexacro.ListItemCtrl  ( ListBox SubCtrol )
    // ==============================================================================   
    nexacro._ListBoxItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Static.call(this, id, position, left, top, width, height, right, bottom, parent);        
    };

    var __pListBoxItemControl = nexacro._createPrototype(nexacro.Static, nexacro._ListBoxItemControl);
    nexacro._ListBoxItemControl.prototype = __pListBoxItemControl;

    __pListBoxItemControl._type_name = "ListBoxItemControl";

    __pListBoxItemControl._use_selected_status = true;
    __pListBoxItemControl._use_readonly_status = true;

    __pListBoxItemControl._is_subcontrol = true;
    //__pListBoxItemControl._is_reference_control = false;
    __pListBoxItemControl._accessibility_role = "listboxitem";

    __pListBoxItemControl.index = "";
    __pListBoxItemControl.value = undefined;
    __pListBoxItemControl.selected = false;
    __pListBoxItemControl._keep_selecting = false;
    __pListBoxItemControl.wordWrap = "none";
    __pListBoxItemControl._event_list = {
		"onclick": 1, "ondblclick": 1,
		"onflingstart": 1, "onfling": 1, "onflingend": 1,
		"onlbuttondown": 1, "onlbuttonup": 1, "onlongpress": 1,
		"onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1,
		"onmousedown": 1, "onmouseup": 1,
		"ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,
		"onrbuttondown": 1, "onrbuttonup": 1
		};
  
    __pListBoxItemControl.destroy = function ()
    {
        this._removeEventHandler("onlbuttondown", this.parent.on_notify_item_onlbuttondown, this.parent);
        this._removeEventHandler("ontouchstart", this.parent.on_notify_item_onlbuttondown, this.parent);
        this._removeEventHandler("ondblclick", this.parent.on_notify_item_ondblclick, this.parent);
        this._removeEventHandler("onmouseenter", this.parent.on_notify_item_onmouseenter, this.parent);
        this._removeEventHandler("onmouseleave", this.parent.on_notify_item_onmouseleave, this.parent);
        nexacro.Component.prototype.destroy.call(this);
    };

    __pListBoxItemControl.on_apply_custom_pseudo = function (pseudo)
    {
    
    };
      //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Override
    //---------------------------------------------------------------
    __pListBoxItemControl.on_apply_custom_setfocus = function (evt_name)
	{
        if (!this.parent._is_subcontrol && this.parent._status == "focused")
        {
            nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
        }
    };

    __pListBoxItemControl.isFocusAcceptable = function ()
    {
        return nexacro._enableaccessibility;
    };

    __pListBoxItemControl._getAccessibilityLabel = function (accessibility)
    {
        var flag = this.parent._is_first_focus;
        var label = "";
        if (flag && this._isAccessibilityEnable())
        {
            var parent = this.parent;
            var p_accessibility = parent.accessibility;
            label = parent._getAccessibilityParentValue(p_accessibility);
        }
        label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
        return label;
    };

    __pListBoxItemControl._getAccessibilityRole = function ()
    {
        var role = "";
        if (this._isAccessibilityEnable())
        {
            var parent = this.parent;
            if (parent._is_first_focus)
            {
               return parent._getAccessibilityRole();                
            }
            else
            {
                role = nexacro.Component.prototype._getAccessibilityRole.call(this);
            }
        }
        return role;
    };

    __pListBoxItemControl._setAccessibilityStatFocus = function (evt_name)
    {
        var list = this.parent;

        if (!list._is_subcontrol) // && list._status == "focused")
        {
            if (list.multiselect && list._shift_select_base_index && list._shift_select_base_index != this.index)
            {
                var item = list._get_contents_rows()[list._shift_select_base_index];
                if (item && item._status == "selected")
                {
                    var label = item._getAccessibilityLabel(item.on_find_CurrentStyle_accessibility(this._pseudo));
                    label += " " + this._getAccessibilityLabel(this.on_find_CurrentStyle_accessibility(this._pseudo));
                    this._setAccessibilityLabel(label);
                }
            }
            return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
        }
    };

    __pListBoxItemControl.on_get_accessibility_label = function ()
    {
        return this.text ? this.text : "";
    };

    __pListBoxItemControl.on_getIDCSSSelector = function ()
    {
        return "listboxitem";
    };

    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Properties
    //---------------------------------------------------------------
    __pListBoxItemControl.set_index = function (v)
    {
        if (v !== this.index)
        {
            this.index = parseInt(v, 10);
        }
    };

    __pListBoxItemControl.set_value = function (v)
    {
        if (v !== this.value)
        {
            this.value = v;
        }
    };

    __pListBoxItemControl.set_selected = function (v)
    {
		if (v != this.selected)
		{
		    this.selected = v;
		    this.on_apply_selected();
		}
    };

    __pListBoxItemControl.on_apply_selected = function ()
    {
        if (this.selected)
        {
            this._changeUserStatus("selected", true);

        }
        else
        {
            if (nexacro._enableaccessibility)
            {
                if (this._status == "focused")
                {
                    this._changeStatus("focused", false);
                }
                else
                    this._changeUserStatus("selected", false);
            }
            else
            {
                this._changeUserStatus("selected", false);
            }
        }
    };

    __pListBoxItemControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    __pListBoxItemControl.on_apply_readonly = function ()
    {
        this._changeStatus("readonly",  this.readonly);
    };

    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Event Handlers
    //---------------------------------------------------------------
    __pListBoxItemControl.on_apply_mouseover = function (isovered)
    {
        if (isovered)
        {
            this._changeStatus("mouseover", true);
        }
        else
        {
            if (this.selected)
            {
                this._changeUserStatus("selected", true);
            }
            else
            {
                this._changeUserStatus("selected", false);
            }
        }
    };

    //---------------------------------------------------------------
    // nexacro.ListItemCtrl : Logical part
    //---------------------------------------------------------------
    delete __pListBoxItemControl;
};
