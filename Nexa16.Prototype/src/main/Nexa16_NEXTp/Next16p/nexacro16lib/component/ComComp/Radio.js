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

if (!nexacro.RadioClickEventInfo)
{
    //==============================================================================
    // nexacro.RadioClickEventInfo
    //==============================================================================
    nexacro.RadioClickEventInfo = function (obj, id, index, itemText, itemValue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY)
    {
        nexacro.ClickEventInfo.call(this, obj, id || "onradioclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

        this.index = index;
        this.itemtext = itemText;
        this.itemvalue = itemValue;
    };
    var _pRadioClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.RadioClickEventInfo);
    nexacro.RadioClickEventInfo.prototype = _pRadioClickEventInfo;    
    _pRadioClickEventInfo._type_name = "RadioClickEventInfo";
    
    delete _pRadioClickEventInfo;
}

if (!nexacro.Radio)
{
    //==============================================================================
    // nexacro.Radio
    //==============================================================================
    nexacro.Radio = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        this._items = [];
    };
    var _pRadio = nexacro._createPrototype(nexacro.Component, nexacro.Radio);
    nexacro.Radio.prototype = _pRadio;
    _pRadio._type_name = "Radio";

    _pRadio.pre_index = -1;
    _pRadio.pre_text;
    _pRadio.pre_value;
    _pRadio.datacolumn = "";
    _pRadio.value = undefined;
    _pRadio.index = -1;
    _pRadio.index_init = -1;
    _pRadio.codecolumn = "";
    _pRadio.readonly = false;
    _pRadio.innerdataset = null;
    _pRadio.columncount = 0;
    _pRadio.rowcount = 0;
    _pRadio.direction = "horizontal";

    _pRadio._use_readonly_status = true;

    _pRadio.accessibility = null;
    _pRadio.itemaccessibility = null;

    /* event list */
    _pRadio._event_list =
    {
        "onclick": 1, "ondblclick": 1,
        "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "ondrag": 1, "ondrop": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondragend": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1,
        "onitemclick": 1, "onitemchanged": 1, "canitemchange": 1, "onmousedown": 1, "onmouseup": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    /* internal variable */
    _pRadio._do_apply_val = true;
    _pRadio._accessibility_role = "radio";
    _pRadio._want_tab = true;
    _pRadio._want_arrow = false;
    _pRadio._is_first_focus = false;
    _pRadio._accessibility_index = -1;

    //==============================================================================
    // nexacro.Radio : Create & Destroy & Update
    //==============================================================================
    _pRadio.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (!this.innerdataset)
            {
                var text_elem = new nexacro.TextBoxElement(control_elem);
                this._text_elem = text_elem;
                text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());

            	// hidden property - textAlign, verticalAlign
                if (this.textAlign)
                    text_elem.setElementTextAlign(this.textAlign);
                if (this.verticalAlign)
                    text_elem.setElementVerticalAlign(this.verticalAlign);
                if (this.id)
                    text_elem.setElementText(this.id);
            }
         }  
    };

    _pRadio.on_created_contents = function (win)
    {
    	if (this.getElement())
    	{
    		if (!this._innerdataset && this.innerdataset)
    		{
    			this._setInnerDatasetStr(this.innerdataset);
    		}

    		this.on_apply_innerdataset();
    	}
        
        var text_elem = this._text_elem;
        if (text_elem)
        {
        	text_elem.create(win);
        }
    	// this._redraw_radioitem();
        if (this.index_init > -1 && this.index < 0 && this.value === undefined) this.index = this.index_init;
        this.on_apply_index(this.pre_index, this.index, false);
        this.on_apply_value();
        this.on_apply_text();
        this._setEventHandler("onkeydown", this.on_notify_radio_onkeydown, this);
    };

    _pRadio.on_destroy_contents = function ()
    {
        var items = this._items;
        var item_len = items.length;
      
        var text_elem = this._text_elem;
        if (text_elem)
        {
            text_elem.destroy();
            this._text_elem = null;
        }

        for (var i = 0; i < item_len; i++)
        {
            items[i].destroy();
            items[i] = null;
        }
        this._items = null;

        if (this._innerdataset)
        {
            this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);
            this._innerdataset = null;
        }

    };

    _pRadio.on_create_contents_command = function ()
    {
    	if (this.getElement())
    	{
    		if (!this._innerdataset && this.innerdataset)
    		{
    			this._setInnerDatasetStr(this.innerdataset);
    		}

    		this.on_apply_innerdataset();
    	}

    	var str = "";
    	var text_elem = this._text_elem;
    	if (text_elem)
    	{
    	    str += text_elem.createCommand();
    	}

        var items = this._items;
        var item_len = items.length;
        for (var i = 0; i < item_len; i++)
        {
            str += items[i].createCommand();
        }
        return str;
    };

    _pRadio.on_attach_contents_handle = function (win)
    {
        var text_elem = this._text_elem;
        if (text_elem)
        {
            text_elem.attachHandle(win);
        }

        var items = this._items;
        var item_len = items.length;
        for (var i = 0; i < item_len; i++)
        {
        	items[i].attachHandle(win);
        }
        
        if (this.index_init > -1 && this.index < 0 && this.value === undefined) this.index = this.index_init;
        this.on_apply_index(this.pre_index, this.index, false);
        this.on_apply_value();
        this._setEventHandler("onkeydown", this.on_notify_radio_onkeydown, this);
    };

    _pRadio.on_change_containerRect = function (_client_width, _client_height)
    {
        this._update_radioitem();
    };

    //==============================================================================
    // nexacro.Radio : Override
    //==============================================================================
    _pRadio.on_getBindableProperties = function ()
    {
        return "value";
    };

    _pRadio.on_apply_prop_enable = function (v)
    {
        var radioitems = this._items;
        if (radioitems)
        {
            var item_len = radioitems.length;
            for (var i = 0; i < item_len; i++)
            {
                radioitems[i]._setEnable(v);
            }
        }
    };

    _pRadio.on_init_bindSource = function (columnid, propid, ds)
    {
        if (propid == "value")
        {
            this.value = undefined;

            var preRadio = this._getItem(this.index);
            var curRadio = this._getItem(-1);

            this.index = -1;

            if (preRadio)
            {
                preRadio.set_value(false);
            }

            if (curRadio)
            {
                curRadio.set_value(true);
                this.text = curRadio.text;
            }
            
            return true;
        }
    };
        
    _pRadio.on_change_bindSource = function (propid, pSendDataset, rowIdx, colIdx, colArrayIdx)
    {
        if (propid == "value")
        {         
            var val = pSendDataset.getColumn(rowIdx, colIdx);
            this.value = val;
            var dataset = this._innerdataset;

            if (!dataset) return true;
            
            var code = this.codecolumn;            
            var row = dataset.findRow(code, val);

            var preRadio = this._getItem(this.index);
            var curRadio = this._getItem(row);

            this.index = row;
                       
            if (preRadio)
            {
                preRadio.set_value(false);
            }

            if (curRadio)
            {
                curRadio.set_value(true);
                this.text = curRadio.text;
            }
            return true;
        }
        return false;
    };

    _pRadio.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        var items = this._items;
        var accIdx = this._accessibility_index;
        var index = this.index;
        var count = items.length;

        if (keycode == nexacro.Event.KEY_TAB) // KEY_TAB
        {
            if (index > -1)
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
                        this._do_defocus(last_focused, true);
                        if (last_focused && last_focused._selected)
                        {
                            last_focused._changeUserStatus("selected", true);
                        }
                        this._on_focus(true);
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
                        var comp = items[index];
                        if (comp)
                            comp._on_focus(true);
                        this._accessibility_index = index;
                    }
                }
            }
            else
            {
                if ((shift_key && accIdx < 0) || (!shift_key && accIdx >= count - 1)) // out of range
                {
                    this._want_tab = false;
                }
                else
                {
                    if (shift_key)
                        accIdx--;
                    else
                        accIdx++;

                    var comp = items[accIdx];
                    if (comp)
                    {
                        comp._on_focus(true);
                    }
                    else
                    {
                        this._do_defocus(this._last_focused, true);
                        this._on_focus(true);
                    }
                    this._accessibility_index = accIdx;
                }
            }
            this._getWindow()._keydown_element._event_stop = true;
        }
        else if (keycode == nexacro.Event.KEY_SPACE) // KEY_SPACE
        {
            if (!this.readonly)
            {
                if (this._accessibility_index > -1)
                {
                    items[this._accessibility_index]._changeUserStatus("focus", true);
                    this.set_index(this._accessibility_index);
                }
            }
        }
        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };

    _pRadio._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        if (keycode && (keycode == nexacro.Event.KEY_TAB))
            var want_tab = this._getPreCalculateWantTab(keycode, shiftKey);
        else
            var _want_arrow = this._getPreCalculateWantArrow(keycode);
        if (this._is_first_focus)
            this._is_first_focus = false;
        this._want_arrow = nexacro._enableaccessibility;
        this._want_tab = true;
        return { want_tab: want_tab, want_return: false, want_escape: false, want_chars: false, want_arrows: _want_arrow };
    };

    _pRadio._setFocus = function (bResetScroll, dir)
    {
        this._focus_direction = dir;
        var retn = this.setFocus(bResetScroll);
        this._focus_direction = -1;
        return retn;
    };

    _pRadio._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        var retn = false;
        var focusdir = this._focus_direction;
        if (evt_name == "tabkey") focusdir = 0;
        else if (evt_name == "shifttabkey") focusdir = 1;
        else if (evt_name == "downkey") focusdir = 2;
        else if (evt_name == "upkey") focusdir = 3;

        if (self_flag == false)
        {
            this._focus_direction = -1;
        }

        if (focusdir >= 0)
        {
            retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
            if (self_flag == false)
            {
                this._accessibility_index = -1;
                var items = this._items;
                if (focusdir < 2)
                {
                    var items = this._items;
                    if (items.length > 0)
                    {
                        var comp;
                        this._is_first_focus = true;
                        if (this.index > -1)
                        {
                            this._accessibility_index = this.index;
                            comp = items[this._accessibility_index];
                            comp._on_focus(true);
                            comp._changeUserStatus("selected", true);
                        }
                        else
                        {
                            if (focusdir == 0)
                                this._accessibility_index = 0;
                            else
                                this._accessibility_index = items.length - 1;
                            comp = items[this._accessibility_index];
                            comp._on_focus(true);
                        }
                    }
                }
                else if (nexacro._enableaccessibility)
                {
                    if (!this.readonly)
                    {
                        if (focusdir == 2)
                        {
                            if (!this._isAccessibilityEnable())
                            {
                                var items = this._items;
                                this._is_first_focus = true;
                                if (this.index > -1)
                                {
                                    comp = items[this._accessibility_index = this.index];
                                    this.set_index(this._accessibility_index);
                                    comp._on_focus(true);
                                }
                                else if (items.length > 0)// && focusdir == 0)
                                {
                                    var idx = this._getNextAccessibilityOrderIndex(1);
                                    if (idx > -1)
                                    {
                                        this.set_index(idx);
                                        this._accessibility_index = idx;
                                        var comp = items[idx];
                                        comp._on_focus(true);
                                    }
                                }
                                comp._changeUserStatus("selected", true);
                            }
                        }
                        else if (focusdir == 3) //up
                        {
                            if (!this._isAccessibilityEnable())
                            {
                                var items = this._items;
                                this._is_first_focus = true;
                                if (this.index > -1)
                                {
                                    comp = items[this._accessibility_index = this.index];
                                    this.set_index(this._accessibility_index);
                                    comp._on_focus(true);
                                }
                                else if (items.length > 0)// && focusdir == 0)
                                {
                                    var idx = this._getNextAccessibilityOrderIndex(1);
                                    if (idx > -1)
                                    {
                                        this.set_index(idx);
                                        this._accessibility_index = idx;
                                        var comp = items[idx];
                                        comp._on_focus(true);
                                    }
                                }
                                comp._changeUserStatus("selected", true);
                            }
                        }
                    }
                }
            }
        }
        else
        {
            retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
        }
        return retn;
    };

    _pRadio._on_getAccessibilityAdditionalLabel = function ()
    {
        if (this._isAccessibilityEnable() && !this._is_first_focus)
        {
            var count = 0;
            var items = this._items;
            if (items)
                count = items.length;
            return (+this.index + 1) + " " + count; //2014-06-23 pss [REQ_35826] - index + 1
        }
        return "";
    };

    _pRadio._on_getAccessibilityAdditionalRole = function ()
    {
        var _role = "";
        if (!this._is_first_focus && this._getAccessibilityRole(this.accessibility == "radio"))       
        {
            _role = " radio";
        }
        return _role;
    };

    _pRadio.on_get_style_accessibility_label = function ()
    {
        var label = "";
        if (!this._is_first_focus)
            label = this.text ? this.text : this.value;
        return label;
    };

    //==============================================================================
    // nexacro.Radio : Properties
    //==============================================================================
    _pRadio.set_text = nexacro._emptyFn;

    _pRadio.on_apply_text = function ()
    {
        var control_elem = this._control_element;
        var text_elem = this._text_elem;
        if (control_elem)
        {            
            if (!this.innerdataset)
            {
                if (this._text_elem)
                {
                    text_elem.setElementText(this.id);
                }
            }
            else
            {
                if (this._text_elem)
                {
                    text_elem.setElementText("");
                }
            }
            this._redraw_radioitem();
        }
    };

    _pRadio.set_value = function (v)
    {
        if (v != this.value)
        {
            if (v == undefined || v == null)
            {
                v = "";
            }
            else
            {
                v = v.toString();
            }            
        }

        if (this._is_created)
        {
        var pre_idx = this.index;
        var pre_val = this.value;

        this._setValue(v, false);

        var cur_idx = this.index;
        var cur_val = v;

        if (this.applyto_bindSource("value", v) == false)
        {
            var preRadio = this._getItem(cur_idx);
            var curRadio = this._getItem(pre_idx);

            if (preRadio)
            {
                preRadio.set_value(false);
            }

            if (curRadio)
            {
                curRadio.set_value(true);
            }

            this.index = pre_idx;
            this.value = pre_val;                                            
        }        
        }
    };

    _pRadio.on_apply_value = function (bIndex)
    {
        var dataset = this._innerdataset;
        if (!dataset) return;
        var code = this.codecolumn;
        var data = this.datacolumn;
       
        if (!code && !data) return;

        if (this.value)
        {
            var row = dataset.findRow(code, this.value);
            if (bIndex != true)
            {
                if (this.index != row)
                {
                    this._setIndex(row, true);
                }
            }
        }

        if (bIndex != true)
        {
            if (this.value == undefined || this.value === "")
            {                
                this._setIndex(-1, true);
            }
        }
    };

    _pRadio.set_index = function (v)
    {
        this._setIndex(v, false);
    };

    _pRadio.on_apply_index = function (preidx, curidx, bValue)
    {
        var dataset = this._innerdataset;
        if (!dataset) return;

        var code = this.codecolumn;
        var data = this.datacolumn;
        if (!code && !data) return;

        var val, preRadioItem, postRadioItem;

        if (curidx >= 0)
        {            
            val = dataset.getColumn(curidx, code);                             
                        
            if (this.value != val)
            {
                if (this.applyto_bindSource("value", val) === false)
                {            
                    postRadioItem = this._getItem(curidx);
                    if (postRadioItem)
                    {
                        postRadioItem.set_value(false);
                    }

                    preRadioItem = this._getItem(this.index);           
                    if (preRadioItem)
                    {
                        preRadioItem.set_value(true);
                        this.text = preRadioItem.text;
                    }

                    this._do_apply_val = false;
                    return;
                }

                this._setValue(val, true);
            }
        }

        if (bValue != true)
        {
            if (this.index == undefined)
            {
                this._setValue(undefined, true);
            }
        }

        if (curidx < 0)
        {
            var radio;
            for (var i = 0; i < this._items.length; i++)
            {
                radio = this._getItem(i);
                if (radio)
                radio.set_value(false);
            }
            
            val = undefined;

            if (this.applyto_bindSource("value", val) === false)
            {
                preRadioItem = this._getItem(this.index);
                if (preRadioItem)
                {
                    preRadioItem.set_value(true);
                    this.text = preRadioItem.text;
                }

                this._do_apply_val = false;
                return;
            }

            this._setValue(val, true);
        }
        
        var preRadio = this._getItem(preidx);
        if (preRadio)
        {
            preRadio.set_value(false);
        }

        var curRadio = this._getItem(curidx);
        if (curRadio)
        {
            curRadio.set_value(true);
            this.text = curRadio.text;
        }
        else
        {
            this.text = "";
        }                
    };

    _pRadio.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pRadio.on_apply_readonly = function ()
    {
        var v = this.readonly;
        if (v)
        {
        	this._changeStatus("readonly", true);
        }
        else
        {
        	this._changeStatus("readonly", false);
        }

        var radioitem = null;
        var items = this._items;
        var item_len = items.length;
        for (var i = 0; i < item_len; i++)
        {
            radioitem = this._getItem(i);
            radioitem.set_readonly(v);
        }
    };

    _pRadio.set_datacolumn = function (v)
    {
        this.datacolumn = v;
    	if (this._is_created)
        this.on_apply_datacolumn();
    };

    _pRadio.on_apply_datacolumn = function ()
    {
        var data = this.datacolumn == "" ? this.codecolumn : this.datacolumn; //default codecolumn
        var data_val;

        var innerdataset = this._innerdataset;
        if (!innerdataset) return;

        var items = this._items;
        var item_len = items.length;

        for (var i = 0; i < item_len; i++)
        {
            data_val = innerdataset.getColumn(i, data);
            if (data_val)
            {
                items[i].set_text(data_val);
                if (i == this.index)
                {
                    this.text = data_val;
                }
            }
            else
            {
                items[i].set_text("");
                this.text = "";
            }
        }
    };

    _pRadio.set_codecolumn = function (v)
    {
        this.codecolumn = v;
		if (this._is_created)
        this.on_apply_codecolumn();
    };

    _pRadio.on_apply_codecolumn = function ()
    {
        var code = this.codecolumn;
        var code_val;

        var innerdataset = this._innerdataset;
        if (!innerdataset) return;

        var items = this._items;
        var item_len = items.length;

            for (var i = 0; i < item_len; i++)
            {
                code_val = innerdataset.getColumn(i, code);
                if (code_val)
                {
                    items[i].set_code(code_val);
                }
            }

            this.on_apply_value(false);
            this.set_index(this.index);

            if (this.datacolumn == "" && this._control_element)
            {
                this.on_apply_datacolumn();
            }
    };

    _pRadio.setInnerDataset = function (obj)
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

    _pRadio._setInnerDatasetStr = function (str)
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

    _pRadio.getInnerDataset = function ()
    {
        return this._innerdataset;
    };

    _pRadio.set_innerdataset = function (str)
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
        //if (typeof str != "string")
        //{
        //    this.setInnerDataset(str);
        //    return;
        //}
        //if (str != this.innerdataset)
        //{
        //    if (!str)
        //    {
        //        this._innerdataset = null;
        //        this.innerdataset = "";
        //    }
        //    else
        //    {
        //        str = str.replace("@", "");
        //        this._innerdataset = this._findDataset(str);
        //        this.innerdataset = str;
        //    }
        //    this.on_apply_innerdataset();
        //}
        //else if (this.innerdataset && !this._innerdataset)
        //{
        //    this._setInnerDatasetStr(this.innerdataset);
        //    this.on_apply_innerdataset();
        //}
        //return this.innerdataset;

    };

    _pRadio.on_apply_innerdataset = function ()
    {
        var ds = this._innerdataset;
        if (ds)
        {            
            ds._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
            ds._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);                     
        }
        else
        {
            var text_elem = this._text_elem;
            if (!text_elem && this._control_element)
            {
                text_elem = new nexacro.TextBoxElement(this._control_element);
                this._text_elem = text_elem;

                text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());

                if (this.textAlign)
                    text_elem.setElementTextAlign(this.textAlign);
                if (this.verticalAlign)
                    text_elem.setElementVerticalAlign(this.verticalAlign);

                text_elem.create(this._getWindow());
            }
        }
        this.on_apply_text();
    };

    _pRadio.set_columncount = function (v)
    {
        if (v != this.columncount)
        {
            this.columncount = v;
            this.on_apply_columncount();
        }
    };

    _pRadio.on_apply_columncount = function ()
    {
        this._update_radioitem();
    };


    _pRadio.set_rowcount = function (v)
    {
        if (v != this.rowcount)
        {
            this.rowcount = v;
            this.on_apply_rowcount();
        }
    };

    _pRadio.on_apply_rowcount = function ()
    {
        this._update_radioitem();
    };

    _pRadio.set_direction = function (v)
    {
        if (v != this.direction)
        {
            if (v.toString() == "")
            {
                v = "horizontal";
            }

            this.direction = v;
            this.on_apply_direction();
        }
    };

    _pRadio.on_apply_direction = function ()
    {
        this._update_radioitem();
    };

    _pRadio.set_accessibility = function (val)
    {
        if (this.accessibility != val)
        {
            this.accessibility = val;
            this.on_apply_accessibility(val);
        }
    };

    _pRadio.on_apply_accessibility = function (accessibility)
    {
        if (accessibility)
        {
            var control_elem = this.getElement();
            if (control_elem)
            {
                control_elem.setAccessibility(accessibility);
            }
        }
    };

    _pRadio.set_itemaccessibility = function (val)
    {
        if (this.itemaccessibility != val)
        {
            this.itemaccessibility = val;
            this.on_apply_itemaccessibility(val);
        }
    };

    _pRadio.on_apply_itemaccessibility = function (itemaccessibility)
    {
        var radioitems = this._items;

        if (radioitems)
        {
            var item_len = radioitems.length;
            for (var i = 0; i < item_len; i++)
            {
                if (itemaccessibility)
                {
                    radioitems[i].set_accessibility(itemaccessibility._value);
                }
            }
        }
    };


	//TODO
	//_pRadio.set_itemaccessibilityrole = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilityrole = val;
    //		this.on_apply_itemaccessibilityrole(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilityrole = "";
    //		this.on_apply_itemaccessibilityrole(" ");
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilityrole = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilityrole(val ? val : this.itemaccessibilityrole);
    //		}
    //	}
    //};

	//_pRadio.set_itemaccessibilitylabel = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilitylabel = val;
    //		this.on_apply_itemaccessibilitylabel(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilitylabel = "";
    //		this.on_apply_itemaccessibilitylabel(" ");
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilitylabel = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilitylabel(val ? val : this.itemaccessibilitylabel);
    //		}
    //	}
    //};

	//_pRadio.set_itemaccessibilityenable = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilityenable = val;
    //		this.on_apply_itemaccessibilityenable(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilityenable = true;
    //		this.on_apply_itemaccessibilityenable(true);
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilityenable = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilityenable(val ? val : this.itemaccessibilityenable);
    //		}
    //	}
    //};

	//_pRadio.set_itemaccessibilitydescription = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilitydescription = val;
    //		this.on_apply_itemaccessibilitydescription(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilitydescription = "";
    //		this.on_apply_itemaccessibilitydescription(" ");
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilitydescription = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilitydescription(val ? val : this.itemaccessibilitydescription);
    //		}
    //	}
    //};

	//_pRadio.set_itemaccessibilityaction = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilityaction = val;
    //		this.on_apply_itemaccessibilityaction(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilityaction = "";
    //		this.on_apply_itemaccessibilityaction(" ");
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilityaction = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilityaction(val ? val : this.itemaccessibilityaction);
    //		}
    //	}
    //};

	//_pRadio.set_itemaccessibilitydesclevel = function (val)
    //{
    //	if (val)
    //	{
    //		this.itemaccessibilitydesclevel = val;
    //		this.on_apply_itemaccessibilitydesclevel(val);
    //	}
    //	else
    //	{
    //		this.itemaccessibilitydesclevel = "";
    //		this.on_apply_itemaccessibilitydesclevel(" ");
    //	}
    //};

	//_pRadio.on_apply_itemaccessibilitydesclevel = function (val)
    //{
    //	var items = this._get_contents_rows();
    //	if (items)
    //	{
    //		var rowcount = items.length;
    //		for (var i = 0; i < rowcount; i++)
    //		{
    //			items[i].set_accessibilitydesclevel(val ? val : this.itemaccessibilitydesclevel);
    //		}
    //	}
    //};

    //==============================================================================
    // nexacro.Radio : Methods
    //==============================================================================
    _pRadio.getCount = function ()
    {
        var item_len = this._items.length;
        return item_len;
    };

    //==============================================================================
    // nexacro.Radio : Event Handlers
    //==============================================================================    
    _pRadio.on_notify_radio_onkeydown = function (obj, e)
    {
        var ds = this._innerdataset;
        if (!ds || this.readonly)
        {
            return false;
        }
        var row_cnt = ds.getRowCount();
        var last_idx = row_cnt - 1;
        if (row_cnt < 1)
        {
            return false;
        }

        var items = this._items;
        var item_len = items.length;

        for (var i = 0; i < item_len; i++)
        {
            if (items[i].value == true)
            {
                this.pre_index = items[i].index;
                this.pre_value = items[i].code;
                this.pre_text = items[i].text;
            }
        }

        var E = nexacro.Event;
        var op = undefined;
        if (!nexacro._enableaccessibility)
        {
        	op = (e.keycode == E.KEY_UP) || (e.keycode == E.KEY_LEFT) ? -1 : (e.keycode == E.KEY_DOWN) || (e.keycode == E.KEY_RIGHT) ? 1 : undefined;
        }
        else
        {
        	op = (e.keycode == E.KEY_LEFT) ? -1 : (e.keycode == E.KEY_RIGHT) ? 1 : undefined;
        }

        if (op !== undefined)
        {
            var ret = this.on_fire_canitemchange(obj, e);
            if (ret !== false)
            {
                if (nexacro._enableaccessibility)
                {
                    //if (this._accessibility_index > -1)
                    //    obj.idx = this._accessibility_index += op;
                    if (this._accessibility_index == -1 && this.index > -1)
                    {
                        obj.idx = this.index;
                    }
                    else if (this.index == 0 && E.KEY_UP == e.keycode)
                    {
                        var _window = this._getWindow();
                        _window._removeFromCurrentFocusPath(this, true);
                        if (this._isAccessibilityEnable())
                            this._on_focus(true);
                        this._accessibility_index = -1;
                        return;
                    }
                    else
                    {
                        obj.idx = this._accessibility_index + op;
                    }
                }
                else
                {
                    obj.idx = this.index + op;
                }
              
                if (obj.idx >= row_cnt)
                {
                    //last
                    obj.idx = 0;
                    //this._want_tab = false;
                    //var _form = this._getForm();
                    //_form._on_keydown(_form, e.keycode, e.altKey, e.ctrlKey, e.shiftKey);
                    //return false;
                }
                else if (obj.idx < 0)
                {
                    //first
                    obj.idx = last_idx;
                    //this._want_tab = false;
                    //var _form = this._getForm();
                    //_form._on_keydown(_form, e.keycode, e.altKey, e.ctrlKey, e.shiftKey);
                    //return false;
                }
                this._accessibility_index = obj.idx;
                var radioitem = this._getItem(obj.idx);
                if (row_cnt != obj.idx && row_cnt >= obj.idx && 0 <= obj.idx)
                {
                    this.set_index(obj.idx);
                    if (obj.idx != this.pre_index)
                    {
                        this.on_fire_onitemchanged(radioitem, e);
                    }
                }
            
                if (nexacro._enableaccessibility)
                {
                    radioitem._on_focus(true);
                    radioitem._changeUserStatus("selected", true);
                }            
            }
        }
        return false;
    };

    _pRadio.on_notify_item_onclick = function (obj, e)
    {
        if (!this.enable || this.readonly == true)
        {
            return false;
        }
        var items = this._items;
        var item_len = items.length;
        var pre_select_idx = -1;

        for (var i = 0; i < item_len; i++)
        {
            if (items[i].value == true)
            {
                this.pre_index = items[i].index;
                this.pre_value = items[i].code;
                this.pre_text = items[i].text;
                pre_select_idx = i;
            }
        }
        var ret = false;
        if (this.index != obj.index)
            ret = this.on_fire_canitemchange(obj, e);

        if (ret !== false)
        {
            if (pre_select_idx >= 0)
            {
                items[this.pre_index].set_value(false);
            }
            
            this.on_fire_onitemclick(obj, e);

            obj.set_value(true);
            this.set_index(obj.index);

            if (this.index != this.pre_index || pre_select_idx < 0) //REQ 32781
            {
                this.on_fire_onitemchanged(obj, e);
            }
            
            if (nexacro._enableaccessibility)
            {
                this._accessibility_index = obj.index;
                obj._on_focus(true);
            }
        }
    };

    _pRadio.on_fire_canitemchange = function (obj, e)
    {
        if (this.canitemchange && this.canitemchange._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", this.pre_index, this.pre_text, this.pre_value, obj.index, obj.text, obj.code);
            return this.canitemchange._fireCheckEvent(this, evt);
        }
        return;
    };

    _pRadio.on_fire_onitemchanged = function (obj, e)
    {
        if (this.onitemchanged && this.onitemchanged._has_handlers)
        {
            var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", this.pre_index, this.pre_text, this.pre_value, obj.index, obj.text, obj.code);
            return this.onitemchanged._fireEvent(this, evt);
        }
        return false;
    };

    _pRadio.on_fire_onitemclick = function (obj, e)
    {
        if (this.onitemclick && this.onitemclick._has_handlers)
        {
            var evt = new nexacro.ItemClickEventInfo(this, "onitemclick", obj.index, obj.text, obj.code);
            return this.onitemclick._fireEvent(this, evt);
        }
        return false;
    };

    _pRadio._callback_onvaluechanged = function (obj, e)
    {
        this._redraw_radioitem();
    };

    _pRadio._callback_onload = function (obj, e)
    {
      
    };

    _pRadio._callback_onrowsetchanged = function (obj, e)
    {
        this._redraw_radioitem();
    };    

    //==============================================================================
    // nexacro.Radio : Logical Part
    //==============================================================================

    _pRadio._setIndex = function (v, bValue)
    {        
        v = parseInt(v) | 0;
        
        if (this.index_init < 0 && this.index < 0 && this._items.length == 0)
            this.index_init = v;

        if ((v > 0) && (v >= this._items.length))
        {
            v = -1;                        
        }
        this._do_apply_val = true;
        this.on_apply_index(this.index, v, bValue);
        if (this._do_apply_val)
        {
            this.index = v;
        }
    };

    _pRadio._getItem = function (index)
    {
        var items = this._items;
        var item_len = items.length;
        if (index >= 0 && items.length > 0)
        {
            return items[index];
        }
        return null;
    };

    _pRadio._redraw_radioitem = function ()
    {
        var control = this.getElement();
        var innerdataset = this._innerdataset;
        var radioitem = null;
        var text = "";
        var code = "";
        if (control)
        {
            this._delete_radioitem();
            if (innerdataset)
            {
                var rows = innerdataset.getRowCount();
                var datacolumn = this.datacolumn;
                var codecolumn = this.codecolumn;

                if (rows > 0)
                {
                    for (var i = 0; i < rows; i++)
                    {
                        text = innerdataset.getColumn(i, datacolumn == "" ? codecolumn : datacolumn);
                        code = innerdataset.getColumn(i, codecolumn);
                        radioitem = new nexacro._RadioItemControl("radioitem" + i, "absolute", 0, 0, 0, 0, null, null, this);
                        radioitem.set_text(text);
                        radioitem.set_code(code);
                        radioitem.set_index(i);
                        radioitem.set_readonly(this.readonly);
                        radioitem.set_textAlign("left");

                        radioitem.createComponent();
                        radioitem.on_created();
                        radioitem._setEventHandler("onclick", this.on_notify_item_onclick, this);

                        //accessibility
                        if (nexacro._enableaccessibility)
                        {
                            radioitem._setAccessibilityInfoIndex(i);
                            radioitem._setAccessibilityInfoCount(rows);
                        }
                        this._items[i] = radioitem;
                    }
                    this._update_radioitem();
                }
            }

            this.on_apply_index(this.pre_index, this.index, false);
        }
    };

    _pRadio._delete_radioitem = function ()
    {
        var items = this._items;
        var item_len = items.length;
        for (var i = 0; i < item_len; i++)
        {
            items[i].destroy();
            items[i] = null;
        }

        while (item_len > 0)
        {
            items.pop();
            item_len--;
        }
    };

    _pRadio._update_radioitem = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var innerdataset = this._innerdataset;
            var items = this._items;
            var item_len = items.length;
            if (innerdataset == null || item_len == 0)
            {
                return;
            }

            var columncount = parseInt(this.columncount) | 0;
            var rowcount = parseInt(this.rowcount) | 0;
            var datarowcnt = innerdataset.getRowCount();
            var datacolcnt = innerdataset.getColCount();
            var colcnt = 1;
            var rowcnt = datarowcnt;
            var prioritymatrix = "row";
            var direction = this.direction.toString();
            var width = 0;
            var height = 0;            
            var clientwidth = this._getClientWidth();
            var clientheight = this._getClientHeight();
            var max_col = 1;
            if (columncount == -1 && rowcount == -1)
            {
                rowcnt = 1;
                colcnt = 0;
                var sum_width = 0;
                if (item_len > 0)
                {
                    var item = items[0];
                    //textpadding, padding, border
                    var font = item._getCurrentStyleInheritValue("font");
                    var itemtextpadding = item._getCSSStyleValue("textPadding");
                    var itemborder = item._getCSSStyleValue("border");
                    var itempadding = item._getCSSStyleValue("padding");
                    var icon = item._getCSSStyleValue("icon");
                    if (icon)
                        var imagesize = nexacro._getImageSize(icon._sysurl, this._on_imageload, this);
                }

                for (var i = 0; i < item_len; i++)
                {                    
                    var size = items[i]._getItemRealSize(font, imagesize, itemtextpadding, itempadding, itemborder);
                    sum_width += size.width;

                    if (clientwidth < sum_width)
                    {
                        rowcnt++;
                        sum_width = size.width;
                        colcnt = 1;
                    }
                    else
                    {
                        colcnt++;
                        max_col = max_col > colcnt ? max_col : colcnt;
                    }
                }
                                
                colcnt = max_col;
                
                var dataidx = 0;
                var pre_w = 0, pre_h = 0;
                var size;
                var height;                
                for (var i = 0; i < rowcnt; i++)
                {
                    pre_w = 0;
                    for (var j = 0; j < colcnt; j++)
                    {
                        if (datarowcnt <= dataidx)
                        {
                            break;
                        }
                        var radioitem = items[dataidx];                                               
                        size = radioitem._getItemRealSize(font, imagesize, itemtextpadding, itempadding, itemborder);
                        height = clientheight / rowcnt;

                        radioitem.move(pre_w, pre_h, size.width, height);

                        pre_w += size.width;                        
                        if (pre_w > clientwidth)
                            break;
                        dataidx++;
                    }

                    pre_h += height;
                }               

            }
            else
            {
                if (direction.toLowerCase() == "horizontal")
                {
                    if (columncount > 0)
                    {
                        colcnt = columncount;
                    }
                    else if ((columncount < 0 && rowcount < 0) ||
                                (columncount < 0 && rowcount == 0) ||
                                (columncount == 0 && rowcount == 0) ||
                                (columncount == 0 && rowcount == datarowcnt))
                    {
                        colcnt = 1;
                    }
                    else if (columncount < 0 && (columncount < rowcount) && (rowcount > 1))
                    {
                        colcnt = Math.round(rowcnt / rowcount);
                    }
                    else if (rowcount > 0)
                    {
                        colcnt = rowcnt / rowcount;
                        if ((colcnt * rowcount) < rowcnt)
                        {
                            colcnt++;
                            rowcnt = (((colcnt * rowcount) - rowcnt) >= colcnt) ? rowcount - 1 : rowcount;
                        }
                    }
                    else
                    {
                        colcnt = rowcnt;
                    }

                    if (colcnt > rowcnt)
                    {
                        colcnt = rowcnt;
                    }

                    prioritymatrix = "col";
                    rowcnt = parseInt(datarowcnt / colcnt) | 0;

                    if ((datarowcnt > colcnt) && (datarowcnt % colcnt) > 0)
                    {
                        rowcnt++;
                    }
                }
                else
                {
                    if (rowcount > 0)
                    {
                        rowcnt = rowcount;
                    }
                    else if (columncount > 0)
                    {
                        rowcnt = parseInt(datarowcnt / columncount);
                        if ((columncount * rowcnt) < datarowcnt)
                        {
                            rowcnt++;
                            colcnt = (((columncount * rowcnt) - datarowcnt) >= rowcnt) ? columncount - 1 : columncount;
                        }
                    }
                    else
                    {
                        rowcnt = 1;
                    }

                    if (rowcnt > 0)
                    {
                        prioritymatrix = "row";
                        colcnt = parseInt(datarowcnt / rowcnt) | 0;
                    }
                    else
                    {
                        colcnt = columncount;
                        prioritymatrix = "col";
                    }
                    

                    if (colcnt <= 0)
                    {
                            colcnt = 1;
                    }
                    if (prioritymatrix == "row" && (datarowcnt > rowcnt) && (datarowcnt % rowcnt) > 0)
                    {
                        colcnt++;
                    }
                }
            
                width = this._getClientWidth() / colcnt;
                height = this._getClientHeight() / rowcnt;
                var dataidx = 0;
                var radioitem;

                if (prioritymatrix == "col")
                {
                    for (var i = 0; i < rowcnt; i++)
                    {
                        for (var j = 0; j < colcnt; j++)
                        {
                            if (datarowcnt <= dataidx)
                            {
                                break;
                            }
                            radioitem = this._items[dataidx];                        
                            radioitem.move((width * j), (height * i), width, height);
                            dataidx++;
                        }
                    }
                }
                else if (prioritymatrix == "" || prioritymatrix == "row")
                {
                    var pre_w = 0, pre_h;
                    for (var i = 0; i < colcnt; i++)
                    {
                        pre_h = 0;
                        for (var j = 0; j < rowcnt; j++)
                        {
                            if (datarowcnt <= dataidx)
                            {
                                break;
                            }
                            radioitem = this._items[dataidx];                                              
                            radioitem.move((width * i), (height * j), width, height);
                            
                            dataidx++;
                        }
                    }
                }
            }
        }
    };

    _pRadio._on_imageload = function (url, w, h)
    {
        this._imagesize = { width: w, height: h };
        this._update_radioitem();
    };

    _pRadio._searchStyleValue = nexacro._emptyFn;
    _pRadio._exeExprStyle = nexacro._emptyFn;

    _pRadio._setValue = function (v, bIndex)
    {        
        if (this.value == v)
        {
            return null;
        }

        var val = null;
        if (v == undefined || v == null)
        {
            val = "";
        }
        else
        {
            val = v.toString();
        }

        this.value = val;
        this.on_apply_value(bIndex);        
    };
    
    _pRadio._do_defocus = function (target, bParent)
    {        
        var _window = this._getWindow();
        _window._removeFromCurrentFocusPath(target, true);
        if (bParent)
        {
            _window._removeFromCurrentFocusPath(this, false);
        }
    };

    _pRadio._getPreCalculateWantTab = function (keycode, shift_key)
    {
        var ds = this._innerdataset;
        if (ds)
        {
            if (this.index > -1)
            {
                var idx = this.index;
                if (idx == this._accessibility_index)
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
                    var totalcnt = ds.getRowCount();
                    if (index + 1 > totalcnt)
                        return false;
                }
            }
        }       
        return this._want_tab;
    };

    _pRadio._getPreCalculateWantArrow = function (keycode)
    {
        var ds = this._innerdataset;
        if (ds)
        {
            if (keycode == nexacro.Event.KEY_UP)
            {
                return false;
                //var index = this._accessibility_index;
                //if (index == 0 && !this._isAccessibilityEnable())
                //{
                //    return false;
                //}
                //else if (this._accessibility_index == -1)
                //{
                //    var nex_idx = this._getNextAccessibilityOrderIndex(-1) > -1;
                //    //if (this.index == -1 && nex_idx)
                //    //    return true;
                //    if (nex_idx)
                //        return true;
                //    else
                //        return false;
                //}
            }
            else if (keycode == nexacro.Event.KEY_DOWN)
            {
                return false;
                //var index = this.index;
                //var totalcnt = ds.getRowCount();
                //if (this.index > -1 && this._accessibility_index == -1)
                //    return true;
                //else if (index >= totalcnt - 1 || this._getNextAccessibilityOrderIndex(1) >= totalcnt || this._getNextAccessibilityOrderIndex(1) < 0)
                //{
                //    return false;
                //}
            }
        }
        else
            return false;
        return this._want_arrow;
    };

    _pRadio._getNextAccessibilityOrderIndex = function (direction)
    {
        var cur_idx = this._accessibility_index;
        var ar = this._items;
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
    delete _pRadio;
}

if (!nexacro._RadioItemControl)
{
    //===============================================================
    // nexacro._RadioItemControl : Static
    // description : use Event Notifiers, style control - controlType
    //===============================================================
    nexacro._RadioItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {        
        nexacro._IconText.call(this, id, position, left, top, width, height, right, bottom, parent);
    };
        
    var _pRadioItemControl = nexacro._createPrototype(nexacro._IconText, nexacro._RadioItemControl);
    nexacro._RadioItemControl.prototype = _pRadioItemControl;

    _pRadioItemControl._type_name = "RadioItemControl";
    _pRadioItemControl._is_subcontrol = true;
    _pRadioItemControl.value = false;
    _pRadioItemControl.index = -1;
    _pRadioItemControl.readonly = false;
    _pRadioItemControl.code = "";

    /* internal variable */
    _pRadioItemControl._use_selected_status = true;
    _pRadioItemControl._use_readonly_status = true;
    _pRadioItemControl._accessibility_role = "radioitem";

    _pRadioItemControl.on_apply_accessibility = function (accessibility)
    {
        if (accessibility)
        {
            var control_elem = this.getElement();
            control_elem.setAccessibility(accessibility);
        }
    };
    //===============================================================
    // nexacro._RadioItemControl : Properties
    //==============================================================
    _pRadioItemControl.set_value = function (v)
    {
        if (v != this.value)
        {
            this.value = v;
            this.on_apply_value();
        }
    };

    _pRadioItemControl.on_apply_value = function ()
    {
        var select = this._isSelected();

        if (select == true)
        {
            this._changeUserStatus("selected", true);
        }
        else
        {
            this._changeUserStatus("selected", false);
        }
        this._setAccessibilityStatChecked(select);            
    };

    _pRadioItemControl.set_index = function (v)
    {
        this.index = v;
    };

    _pRadioItemControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v != this.readonly)
        {
            this.readonly = v;
            this.on_apply_readonly();
        }
    };

    _pRadioItemControl.on_apply_readonly = function ()
    {
        var v = this.readonly;
        if (v)
        {
        	this._changeStatus("readonly", true);
        }
        else
        {
        	this._changeStatus("readonly", false);
        }
    };

    _pRadioItemControl.set_code = function (v)
    {
        this.code = v;
    };

    //===============================================================
    // nexacro._RadioItemControl : Override
    //==============================================================
    _pRadioItemControl._on_getAccessibilityAdditionalLabel = function ()
    {
        if (this._isAccessibilityEnable() && !this.parent._is_first_focus)
        {            
            if (this.index > -1)            
            {
                return (+this.index + 1) + " " + this.parent._items.length;
            }
        }
        return "";
    };


    _pRadioItemControl.on_getIDCSSSelector = function ()
    {
        return "radioitem";
    };

    _pRadioItemControl._getFormChildById = function (id)
    {
        return this.parent._getFormChildById(id);
    };

    _pRadioItemControl._getAccessibilityLabel = function (accessibility)
    {
        var label = "";
        if (this.parent._is_first_focus)
        {
            var parent = this.parent;
            var p_accessibility = parent.accessibility;
            label = parent._getAccessibilityParentValue(p_accessibility);
        }
        label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
        return label;
    };

    //===============================================================
    // nexacro._RadioItemControl : Logical Part
    //==============================================================
    _pRadioItemControl._isSelected = function ()
    {
        return this.value;
    };

    _pRadioItemControl._getItemRealSize = function (font, imagesize, textpadding, padding, border)
    {        
        var width = 0, height = 0;
        //padding, textpadding, border
        //letterspace, wordspace, font
        //Todo..
        //the witdh depends on iconposition.
        //tl - textpading.left
        //pl - padding.left
        //bl - border.left
        var tl = 0, tt = 0, tr = 0, tb = 0;
        var pl = 0, pt = 0, pr = 0, pb = 0;
        var bl = 0, bt = 0, br = 0, bb = 0;
        if (textpadding)
        {
            if (textpadding.left)
                tl = textpadding.left;
            if (textpadding.right)
                tr = textpadding.right;
            if (textpadding.top)
                tt = textpadding.top;
            if (textpadding.bottom)
                tb = textpadding.bottom;
        }
        if (padding)
        {
            if (padding.left)
                pl = padding.left;
            if (padding.top)
                pt = padding.top;
            if (padding.right)
                pr = padding.right;
            if (padding.bottom)
                pb = padding.bottom;
        }
        if (border)
        {
            if (border._single)
            {
                var border_width = border.top.width ? border.top.width : 0;
                bl = bt = br = bb = border_width;
            }
            else
            {
                bl = border.left._width ? border.left._width : 0;
                br = border.right._width ? border.right._width : 0;
                bt = border.top._width ? border.top._width : 0;
                bb = border.bottom._width ? border.bottom._width : 0;
            }
        }

        var textsize = nexacro._getTextSize(this.text, font);
        width = textsize[0] + (imagesize ? imagesize.width : 0) + tl + tr + pl + pr + bl + br;
        height = textsize[1] + (imagesize ? imagesize.height : 0) + pt + pb + bt + bb;
        return { width: Math.ceil(width), height: Math.ceil(height)};
    };

    delete _pRadioItemControl;
}