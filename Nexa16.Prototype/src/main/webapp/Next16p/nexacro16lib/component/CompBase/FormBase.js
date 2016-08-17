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

if (!nexacro.Form)
{
    //===============================================================
    // nexacro.LayoutChangeEventInfo
    //===============================================================
    nexacro.LayoutChangeEventInfo = function (obj, id, curlayout_name, newlayout_name, cur_width, new_width, cur_height, new_height)
    {
        this.id = this.eventid = id || "onlayoutchanged";
        this.fromobject = this.fromreferenceobject = obj;

        this.bubbles = true;

        this.oldlayout = curlayout_name;
        this.newlayout = newlayout_name;
        this.oldlayoutwidth = cur_width;
        this.newlayoutwidth = new_width;
        this.oldlayoutheight = cur_height;
        this.newlayoutheight = new_height;
    };

    var _pLayoutChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.LayoutChangeEventInfo);
    nexacro.LayoutChangeEventInfo.prototype = _pLayoutChangeEventInfo;
    
    _pLayoutChangeEventInfo._type_name = "LayoutChangeEventInfo";

    delete _pLayoutChangeEventInfo;


    //===============================================================
    // nexacro.DeviceButtonEventInfo
    //===============================================================
    nexacro.DeviceButtonEventInfo = function (obj, e)
    {
        this.eventid = "ondevicebutton";
        this.fromobject = obj;
        this.fromreferenceobject = obj;
        this.button = e.button;
    };
    var _pDeviceButtonEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DeviceButtonEventInfo);
    nexacro.DeviceButtonEventInfo.prototype = _pDeviceButtonEventInfo;

    _pDeviceButtonEventInfo._type_name = "DeviceButtonEventInfo";

    delete _pDeviceButtonEventInfo;

    //==============================================================================
    // nexacro.BindItem
    //==============================================================================
    nexacro.BindItem = function (name, compid, propid, dsid, columnid)
    {
        nexacro.Object.call(this);
        this.name = name || "";
        this.compid = compid || "";
        this.propid = propid || "";
        this.datasetid = dsid || "";
        this.columnid = columnid || "";

        /* internal variable */
        this._en_type = 1; // readonly
        this._dataset = null;
        this._comp = null;
    };

    var _pBindItem = nexacro.BindItem.prototype = nexacro._createPrototype(nexacro.Object, nexacro.BindItem);
    _pBindItem._type_name = "BindItem";

    //==============================================================================
    // nexacro.BindItem : Properties
    //==============================================================================
    _pBindItem.set_name = function (v)
    {
        if (v && this.name != v)
        {
            this.name = v;
        }
    };

    _pBindItem.set_compid = function (v)
    {
        if (v && this.compid != v)
        {
            this.compid = v;
        }
    };

    _pBindItem.set_propid = function (v)
    {
        if (v && this.propid != v)
        {
            this.propid = v;
        }
    };

    _pBindItem.set_datasetid = function (v)
    {
        if (v && this.datasetid != v)
        {
            this.datasetid = v;
        }
    };

    _pBindItem.set_columnid = function (v)
    {
        if (v && this.columnid != v)
        {
            this.columnid = v;
        }
    };

    //==============================================================================
    // nexacro.BindItem  : Methods
    //==============================================================================
    _pBindItem.init = function (name, compid, propid, datasetid, columnid)
    {
        this.set_name(name);
        this.set_compid(compid);
        this.set_propid(propid);
        this.set_datasetid(datasetid);
        this.set_columnid(columnid);
    };

    _pBindItem.destroy = function ()
    {
        this._dataset = null;
        this._comp = null;

        nexacro.Object.prototype.destroy.call(this);
    };

    _pBindItem.bind = function ()
    {
        if (this.parent && !this.parent._is_loading)
        {
            if (this.compid == "" || this.propid == "" || this.datasetid == "" || this.columnid == "") return;
            this.parent._bind_manager._setBinditem(this, false);
            this.parent._bind_manager._notify(this);
        }
    };

    //===============================================================
    // nexacro.ScrollBarControl : Logical Part
    //===============================================================
    _pBindItem._checkType = function (propid)
    {
        if (typeof propid == "string" && propid == this.propid)
        {
            this._en_type = 2;
        }
    };
    delete _pBindItem;

    //==============================================================================
    // nexacro.BindManager
    //==============================================================================
    nexacro.BindManager = function (form)
    {
        nexacro.Object.call(this);
        this.datasets = {};
        this.exception = "";

        /* internal variable */
        this._form = form;
    };

    var _pBindManager = nexacro.BindManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro.BindManager);

    _pBindManager._type_name = "BindManager";


    _pBindManager.destroy = function ()
    {
        this.datasets = null;
        this._form = null;

        nexacro.Object.prototype.destroy.call(this);
    };

    //===============================================================
    // nexacro.BindManager : Event Handlers
    //===============================================================
    /*_pBindManager.exception;*/
    _pBindManager.on_changevalue = function (obj, e)
    {
        var prop_id = e.propid;
        var bind_item = this._FindBindItem(obj, prop_id);
        var val = e.val;
        if (bind_item && bind_item._en_type == 2)
        { //CYBIND_TYPE_SIMPLE
            // found
            this.exception = obj;

            var ds = bind_item._dataset;
            var row_idx = ds.rowposition;
            var col = ds._getDataColIndex(bind_item.columnid);
            if (col !== undefined)
            {
                var ret = ds.setColumn(row_idx, col, val);
                if (ret == true)
                {
                    var real_value = ds.getColumn(row_idx, col);
                    if (real_value != val)
                    {
                        val = real_value;
                    }
                    this.exception = null;
                    return true;
                }
                else
                {
                    this.exception = null;
                    return false;
                }
            }
        }
        this.exception = null;
        return true;
    };

    //Dataset Event
    //////////////////////////////////////////////////////////////////////
    _pBindManager.on_valuechanged = function (obj, e)
    {

        var ds = obj;
        var row = e.row;
        var col = e.col;
        var col_id = e.columnid;
        var val = e.newvalue;
        if (ds.rowposition == row || row < 0)
        {
            if (col < 0) return this._notifyAll(ds.name, null, -1, true, null);
            else return this._notifyAll(ds.name, col_id, col, false, val);
        }
        return true;
    };


    //===============================================================
    // nexacro.BindManager : Logical Part
    //===============================================================
    _pBindManager._delayBinds = function ()
    {
        var len = this._form.binds.length;
        for (var sx = 0; sx < len; sx++)
        {
            var bind_item = this._form.binds[sx];
            if (bind_item._dataset)
                continue;

            this._setBinditem(bind_item, false);
            this._notify(bind_item);
        }
    };

    _pBindManager._setBinditem = function (bind_item, close_flag)
    {
        if (!bind_item) return;

        var binds = this._form.binds;
        var ds_id = bind_item.datasetid;

        var ds = bind_item._dataset;
        var comp = bind_item._comp;
        if (!bind_item._dataset)
            ds = this._form._getDatasetObject(bind_item.datasetid);
        if (!bind_item._comp)
        {
            if (this._form._findChildObject)
                comp = this._form._findChildObject(bind_item.compid);
        }

        if (!ds || !comp) return;

        if (!close_flag)
        {
            bind_item._dataset = ds;
            bind_item._comp = comp;
            bind_item._checkType(comp.on_getBindableProperties());

            if (this.datasets[ds_id])
            {
                this.datasets[ds_id].push(bind_item);
            }
            else
            {
                this.datasets[ds_id] = [];
                this.datasets[ds_id].push(bind_item);
                ds.setEventHandler("onvaluechanged", this.on_valuechanged, this);
            }

            // assign event
            if (!comp._bind_event)
            {
                comp._bind_event = new nexacro.EventListener("onbinditem");
                comp._bind_event._setHandler(this, this.on_changevalue);
            }
        }
        else
        {
            if (this.datasets[ds_id])
            {
                var cidx = nexacro._indexOf(this.datasets[ds_id], bind_item);
                if (cidx > -1)
                {
                    this.datasets[ds_id].splice(cidx, 1);
                    if (this.datasets[ds_id].length == 0)
                    {
                        ds.removeEventHandler("onvaluechanged", this.on_valuechanged, this);
                        delete this.datasets[ds_id];
                    }
                }
            }
            if (comp._bind_event)
            {
                comp._bind_event._removeHandler(this, this.on_changevalue);
                delete comp._bind_event;
            }
        }

    };

    _pBindManager._FindBindItem = function (comp, propid)
    {
        for (var sx = 0; sx < this._form.binds.length; sx++)
        {
            var bind_item = this._form.binds[sx];
            if (bind_item._comp == comp && bind_item.propid == propid && bind_item.datasetid && bind_item.columnid)
            {
                return bind_item;
            }
        }
        return null;
    };

    _pBindManager._dettachSBindItem = function (comp)
    {
        if (!comp._bind_event) return;

        comp._bind_event._removeHandler(this);
        var binds = this._form.binds;
        var cnt = binds.length;
        for (var i = 0; i < cnt; i++)
        {
            if (binds[i]._comp == comp)
            {
                var datasetid = binds[i].datasetid;
                if (this.datasets[datasetid])
                {
                    var cidx = nexacro._indexOf(this.datasets[datasetid], binds[i]);
                    if (cidx > -1)
                    {
                        this.datasets[datasetid][cidx].destroy();
                        this.datasets[datasetid].splice(cidx, 1);
                    }
                    binds[i]._comp = null;
                }
            }
        }
    };


    _pBindManager._notify = function (bindItem)
    {
        var ds = bindItem._dataset;
        var comp = bindItem._comp;

        if (ds && comp)
        {
            var row_idx = ds.rowposition;

            if (bindItem._en_type == 2)
            { // CYBIND_TYPE_SIMPLE
                if (comp.enable)
                {
                    if (row_idx < 0)
                    {
                        comp._setEnable(false);
                    }
                    else
                    {
                        comp._setEnable(true);
                    }
                }
                var col = ds._getDataColIndex(bindItem.columnid);
                if (col >= 0 && comp.on_change_bindSource)
                {
                    comp.on_change_bindSource(bindItem.propid, bindItem._dataset, row_idx, col, -1);
                }
            }
            else
            { // read only type
                if (bindItem.columnid && bindItem.columnid != "")
                {
                    var col = ds._getDataColIndex(bindItem.columnid);
                    var val = ds.getColumn(row_idx, col);
                    if (bindItem.propid)
                    {
                        if (comp["set_" + bindItem.propid])
                            comp["set_" + bindItem.propid](val);
                    }
                }
            }
        }
    };

    _pBindManager._notifyAll = function (ds_id, col_id, col, all_flag, val)
    {
        var arr_bind = this.datasets[ds_id];
        var bind_item = null;
        var row_idx = -1;

        if (!arr_bind)
            return true;

        for (var sx = 0; sx < arr_bind.length; sx++)
        {
            bind_item = arr_bind[sx];
            if (!bind_item._dataset)
            {
                continue;
            }

            if (bind_item.columnid == "")
            {
                continue;
            }

            var ds = bind_item._dataset;
            row_idx = ds.rowposition;
            var comp = bind_item._comp;

            if (comp)
            {
                if (bind_item._en_type == 2)
                { //CYBIND_TYPE_SIMPLE
                    if (all_flag)
                    {
                        if (comp.enable)
                        {
                            if (row_idx < 0)
                            {
                                comp._setEnable(false);
                            }
                            else
                            {
                                comp._setEnable(true);
                            }
                        }
                        else
                        {
                            if (row_idx >= 0)
                            {
                                comp._setEnable(true);
                            }
                        }
                        col = ds._getDataColIndex(bind_item.columnid);

                        if (col >= 0)
                        {
                            if (comp.on_change_bindSource)
                                comp.on_change_bindSource(bind_item.propid, bind_item._dataset, row_idx, col, -1);
                        }
                        else
                        {
                            if (comp.on_init_bindSource)    // 바인딩된 dataset이 변경되어 바인딩이 끊어지는 경우 갱신이 필요함. 
                                comp.on_init_bindSource(bind_item.columnid, bind_item.propid, bind_item._dataset);
                        }
                    }
                    else
                    {
                        if (col >= 0)
                        {
                            if (bind_item.columnid == col_id && comp.on_change_bindSource)
                                comp.on_change_bindSource(bind_item.propid, bind_item._dataset, row_idx, col, -1);
                        }
                        else
                        {
                            if (bind_item.columnid == col_id && comp.on_init_bindSource)    // 바인딩된 dataset이 변경되어 바인딩이 끊어지는 경우 갱신이 필요함. 
                                comp.on_init_bindSource(bind_item.columnid, bind_item.propid, bind_item._dataset);
                        }
                    }
                }
                else
                { // read only type
                    var val0;
                    if (all_flag)
                    {
                        col = ds._getDataColIndex(bind_item.columnid);
                        val0 = ds.getColumn(row_idx, col);
                    }
                    else
                    {
                        if (col_id == bind_item.columnid)
                        {
                            val0 = val;
                        }
                        else
                        {
                            continue;
                        }
                    }
                    if (bind_item.propid)
                    {
                        if (comp["set_" + bind_item.propid])
                            comp["set_" + bind_item.propid](val0);
                    }
                }
            }
        }
        return true;
    };

    delete _pBindManager;

    //==============================================================================
    // nexacro.FormBase 
    //==============================================================================
    nexacro.FormBase = function (id, position, left, top, width, height, right, bottom, parent)
    {
    	nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

        // form's Collections
        // all is special Collection - direct access not allowed
        this.all = new nexacro.Collection();
        this.components = new nexacro.Collection();
        this.objects = new nexacro.Collection();
        this.binds = new nexacro.Collection();
        this._bind_manager = new nexacro.BindManager(this);
        this._layout_list = new nexacro.Collection();
        //this._css_selectors = { _has_items: false, _has_attr_items: false };
        //this._cssfinder_cache = {};
        this._child_list = [];
        this._load_manager = new nexacro._LoadManager(this);
        this._timerManager = new nexacro._TimerManager(this);
        this._executescriptlist = [];
        this._includescriptlist = [];
        this._hotkey_list = []; // Hotkey 사용하는 Component와 Hotkey정보 리스트
        this._load_callbacklist = []; //통신 sync call시 application fire_onload 후에 호출해줘야 되는 subform list
        this._refform = this;
    };

    var _pFormBase = nexacro.FormBase.prototype = nexacro._createPrototype(nexacro.Component, nexacro.FormBase);

    // overide nexacro.Object
    _pFormBase._type_name = "FormBase";

    _pFormBase.scrollbars = "autoboth";
    _pFormBase.dragscrolltype = "all";
    _pFormBase.stepalign = "center bottom";
    _pFormBase.stepitemsize = undefined;

    /* internal variable */
    // new css containers
//    _pFormBase._apply_client_padding = false;

    // status
    _pFormBase._is_form = true;
    _pFormBase._is_loaded = false;
    _pFormBase._is_completed = false;
    _pFormBase._is_async = false;
    _pFormBase._is_scrollable = true;
    _pFormBase._url = "";           // Form Full Url
    _pFormBase._base_url = "";      // Form Base Url

    _pFormBase._last_focused = null;
    _pFormBase._hittest_type = "";

    // LayoutManager
    _pFormBase._default_layout = null;
    _pFormBase._current_layout_name = "default";
    _pFormBase._cur_real_layout = "default";
    _pFormBase._obj_mousemove = null;

    //===============================================================
    // nexacro.FormBase : Create & Destroy & Update
    //===============================================================
    _pFormBase.on_create = nexacro._emptyFn;
    _pFormBase.createComponent = function (bCreateOnly)
    {
        if (this._is_loading)
            return;

        var parent_elem = null;
        if (!this._is_window)
        {
            parent_elem = this.parent._control_element;
            if (!parent_elem)
            {
                return false;
            }
        }
      // trace("FormBase.createComponent:" + this.id + " parent.name:" + this.parent._unique_id);

        this._on_apply_setpropinitfn();

        var control_elem = this._control_element;
        if (!control_elem)
        {
        	//trace("FormBase.createComponent:1 " + this.id + " parent.name:" + this.parent._unique_id);
            control_elem = this.on_create_control_element(parent_elem);
            if (this._is_nc_control)
            {
                control_elem._is_nc_element = true;
            }

            // 이 시점에
            // elem.client_width = 0 이기때문에
            // comp._client_width = 0 이다.
            // this 아래에 또 layout을 갖는 컴포넌트가 있을 경우 제대로 된 layout을 찾을 수 없다.
            // -> initControl 이후에 LayoutManager 초기화 수행
            //this._initLayoutManager();

            //init child components                       
            this._initControl(control_elem);
            this._initContents(control_elem);

            this._initLayoutManager();

            if (this.tooltiptext)
                this.on_apply_prop_tooltip();

            if (nexacro._enableaccessibility)
                this.on_apply_accessibility();

            if (this.positionstep != null)
                this.on_apply_positionstep(this.positionstep);

            if (this._hittest_type)
            	this.on_apply_hittesttype(this._hittest_type);

            if (!bCreateOnly && (this._is_window || parent_elem.handle))
            {
                var _window = this._getWindow();
                this.on_created(_window);
            }
        }
        else
        {
        	//trace("FormBase.createComponent:2 " + this.id + " parent.name:" + this.parent._unique_id);
            //init child components     
            if (parent_elem && parent_elem.handle)
            {
                parent_elem.appendChildElement(control_elem);
                control_elem.parent = this;               

                this._initControl(control_elem);
                this._initLayoutManager();
                this._initContents(control_elem);                

                if (this._hittest_type)
                	this.on_apply_hittesttype(this._hittest_type);


                if (this.tooltiptext)
                    this.on_apply_prop_tooltip();

                if (!bCreateOnly)
                {
                    var window = this._getWindow();
                    this.on_created(window);
                }
            }
            else
            {
            	
            	this._initControl(control_elem);
            	this._initLayoutManager();
            	this._initContents(control_elem);
            	if (this._hittest_type)
            		this.on_apply_hittesttype(this._hittest_type);

            	if (this.tooltiptext)
                    this.on_apply_prop_tooltip();
            }
        }
        return true;
    };

    _pFormBase.on_create_contents = function ()
    {
        var comps = this.components;
        var len = comps.length;

        for (var i = 0; i < len; i++)
        {
        	var comp = comps[i];
        	comp.createComponent(true);

        	if (this._locale && comp._is_locale_control)
        	{
        	    comp._setLocale(this._locale);
        	}

        	/*if (comp._setpropinitfn)
        	{
        		comp._setpropinitfn.call(comp, comp);
        		comp._setpropinitfn = null;
        		delete comp._setpropinitfn;
        	}*/
        }
    };

    // this Function create Object's Inner Elements
    // -- All Componets overide this function
    _pFormBase.on_created_contents = function (win)
    {
        var len = this.objects.length;
        var i = 0;
        for (i = 0; i < len; i++)
        {
            this.objects[i].on_created();
        }
        
        if (this._cssclass_exprfn)
        {
        	var cssclass = nexacro._toString(this._cssclass_exprfn.call(null, this));
        }

        nexacro._createdContents(this);

        if (this.stepselector)
        {
            this.stepselector.on_created(win);
        }

        // reset Scroll
        if (this._is_scrollable)
        {
            this.resetScroll();
            var control_elem = this._control_element;
            if (control_elem && this.stepselector)
                    control_elem.setElementHScrollPos(control_elem.client_width * control_elem._step_index);
            }
         
        nexacro._refreshWindow(this._getWindow().handle);
    };

    _pFormBase.on_destroy_contents = function ()
    {
        if (this._timerManager)
        {
            this._timerManager.destroy();
            this._timerManager = null;
        }

        if (this._load_manager)
        {
            var load_manager = this._load_manager;
            var tr_list = load_manager.transactionList;
            if (tr_list)
            {
                for (var i = tr_list.length - 1; i >= 0; i--)
                {
                    var tr_item = tr_list[i];
                    if (tr_item._usewaitcursor)
                        tr_item._hideWaitCursor(this);

                    tr_item = null;
                }

                tr_list = null;
            }
            this._load_manager.destroy();
            this._load_manager = null;
        }

        var binds = this.binds;
        var len = binds.length;
        for (var i = 0; i < len; i++)
        {
            var bindname = binds.get_id(i);
            this._bind_manager._setBinditem(binds.get_item(bindname), true);
            this[bindname] = null;
        }

        var components = this.components;
        len = components.length;

        for (var i = len-1; i >= 0; i--)
        {
            var compname = components.get_id(i);
            if (this[compname])
            {
                if (this[compname]._destroy)
                {
                    this[compname]._destroy();
                    this[compname] = null;
                }
            }
        }

        var objects = this.objects;
        len = objects.length;
        for (var i = len-1; i >= 0; i--)
        {
            var objname = objects.get_id(i);
            if (this[objname])
            {
                if (this[objname].destroy)
                    this[objname].destroy();

                objects.delete_item(objname);
                delete this[objname];
                this[objname] = null;

            }
        }

        var layouts = this._layout_list;
        len = layouts.length;
        for (var i = len - 1; i >= 0; i--)
        {
            var layout = layouts.get_id(i);
            if (layout)
            {
                if (layouts[layout].destroy)
                    layouts[layout].destroy();
                layouts.delete_item(layout);
            }
        }

        if (this._bind_manager)
        {
            this._bind_manager.destroy();
            this._bind_manager = null;
        }

        this.all.clear();
        this.all = null;
        this.components.clear();
        this.components = null;
        this.objects.clear();
        this.objects = null;
        this.binds.clear();
        this.binds = null;
        this._layout_list.clear();
        this._layout_list = null;
        this._child_list = null;
        this._executescriptlist = null;
        this._includescriptlist = null;
        this._hotkey_list = null;
        this._load_callbacklist = null;
        if (this._default_layout)
        {
            if (this._default_layout.destroy)
            {
                this._default_layout.destroy();
            }
            this._default_layout = null;
        }

        this._obj_mousemove = null;
    };

    _pFormBase._clearUserFunctions = function ()
    {
        var objPrototype = null;
        if (this._type_name == "Div") objPrototype = nexacro.Div.prototype;
        else if (this._type_name == "Tab") objPrototype = nexacro.Tab.prototype;
        else if (this._type_name == "Tabpage") objPrototype = nexacro.Tabpage.prototype;
        else if (this._type_name == "PopupDiv") objPrototype = nexacro.PopupDiv.prototype;
        else if (this instanceof nexacro.Tab) objPrototype = nexacro.Tab.prototype;
        else if (this instanceof nexacro.Tabpage) objPrototype = nexacro.Tabpage.prototype;
        else if (this instanceof nexacro.PopupDiv) objPrototype = nexacro.PopupDiv.prototype;
        else if (this instanceof nexacro.Div) objPrototype = nexacro.Div.prototype;
        else if (this instanceof nexacro.Form) objPrototype = nexacro.Form.prototype;
        else if (this instanceof nexacro.Frame) objPrototype = nexacro.Frame.prototype;

        for (var func in this)
        {
            if (typeof this[func] === "function" && objPrototype && !objPrototype[func])
            {
                this[func] = null;
            }
        }
    };
    // url change 시  - form의 element는 파괴하지 않는다.

    _pFormBase._clear = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._clearEventListeners();

            if (this._timerManager && this._timerManager.timerList.length > 0)
                this._timerManager.clearAll();

            //control_elem._removeFromContainer(); //[REQ_34257] 2014-05-28 go() when preload
            control_elem.clearContents();

            if (this.stepselector)
            {
                this._destroyStepControl();
                delete this.stepselector;
            }

            var binds = this.binds;
            var len = binds.length;
            for (var i = 0; i < len; i++)
            {
                var bindname = binds.get_id(i);
                this._bind_manager._setBinditem(binds.get_item(bindname), true);
                delete this[bindname];
            }


            var components = this.components;
            var objects = this.objects;

            this.all = new nexacro.Collection();
            this.components = new nexacro.Collection();
            this.objects = new nexacro.Collection();

            len = components.length;
            for (var i = 0; i < len; i++)
            {
                var compname = components.get_id(i);
                if (this[compname])
                {
                    if (this[compname]._destroy)
                        this[compname]._destroy();
                }
            }
            components.clear();

            len = objects.length;
            for (var i = 0; i < len; i++)
            {
                var objname = objects.get_id(i);
                if (this[objname])
                {
                    if (this[objname].destroy)
                        this[objname].destroy();
                    delete this[objname];
                }
            }
            objects.clear();
            this.all.clear();
            this.components.clear();
            this.objects.clear();
            this.binds.clear();

            if (this._is_scrollable)
            {
                this.resetScroll();
            }
        }
        this._is_loaded = false;
        this._is_created = false;
    };

    //===============================================================
    // nexacro.FormBase : Load
    //===============================================================

    // Application의 함수를 연결해서 쓰는 경우, 함수를 2depth 진입하면
    // this가 window로 바뀌는 문제가 있어서 사용시 주의가 필요함 (참고: Application.loadIncludeScript)
    _pFormBase.on_initEvent = nexacro._emptyFn;
  //  _pFormBase._loadInclude = _pApplication._loadInclude;
    _pFormBase._init = nexacro._emptyFn;
    _pFormBase.loadIncludeScript = nexacro._emptyFn;
    _pFormBase.loadPreloadList = nexacro._emptyFn;
   // _pFormBase._addCss = _pApplication._addCss;
   // _pFormBase._make_find_csslist = _pApplication._make_find_csslist;
    //_pFormBase._excuteScript = _pApplication._excuteScript;
   // _pFormBase.registerScript = _pApplication.registerScript;
    //_pFormBase.addIncludeScript = _pApplication.addIncludeScript;
   // _pFormBase.loadIncludeScript = _pApplication.loadIncludeScript;
    _pFormBase._onHttpSystemError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri)
    {
        this.on_create = nexacro._emptyFn;
        
        if (this.parent._onHttpSystemError)
            this.parent._onHttpSystemError(obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri);
    };

    _pFormBase._onHttpTransactionError = function (obj, bfireevent, errorobj, errortype, url, returncode, requesturi, locationuri)
    {
        var ret = false;
        var commerrorobj = nexacro.MakeCommunicationError(this, errortype, url, returncode, requesturi, locationuri);
        if (bfireevent)
        {
            ret = this.on_fire_onerror(obj, commerrorobj.name, commerrorobj.message, errorobj, returncode, requesturi, locationuri);
        }

        return ret;
    };

    _pFormBase.create = function ()
    {
    	var parent = this.parent;
    	var id = this.id;
		//showmodal 에서 unique_id가 중복되는 문제 발생
    	this._unique_id = parent._unique_id ? (parent._unique_id + "." + id) : (id ? id : "");
        this.on_create();
    };

    _pFormBase.initEvent = function ()
    {
        this.on_initEvent();
    };

    //context에 global, local load가 완료된 후에 호출되는 함수
    //compile된 fdl안에 구현 되어 있어야 함
    //component를 만들기 시작하는 함수
    _pFormBase._on_init = function ()
    {
        //create sub object && addchild
        if (this._is_created)
        {
            this._clear();
        }

        // Div 생성과 동시에 form이 로딩되는 경우 created=false이다.
        // 따라서 created여부와 상관없이 event를 clear해야 한다. 
        if (this._is_loading) // TODO check 항상 true일 듯 한데..
        {
            this._clearEventListeners();
            // 동적으로 생성된 event도 지우고 있음. 
            // 사용자 설정 event 안나오는 문제 때문에 추가한 코드 
            // 일단 이벤트가 url로 콜한 form과 div 두개다 이벤트가 나오는 문제 때문에 주석처리함
        }

        //div의 style 적용작업
        this._init();
        this.create();

        this._is_loading = false;

        //for autosize
        if (this.parent && this.parent.form == this)
        {
            this.parent._loadedForm();
        }

        this._excuteScript(this);
        this.initEvent();

        this._is_loaded = true;
    };

    _pFormBase._addPreloadList = function (type, url, id, args)
    {
        if (!url) return;

        var fullurl;
        var service = nexacro._getServiceObject(url);
        if (type == "data")
        {
        	fullurl = nexacro._getServiceLocation(url);
            this._load_manager.addPreloadItem(type, fullurl, id, args, service);
        }
        else
        {
            fullurl = nexacro._getFDLLocation(url);
            this._load_manager.addPreloadItem(type, fullurl, this, null, service);
        }
    };

    _pFormBase._loadInclude = function (mainurl, url, asyncmode)
    {
    	var suburl = nexacro._getServiceLocation(url);
    	var includeurl = [];
    	includeurl.push(suburl);
    	includeurl.push(".js");
    	suburl = includeurl.join("");

    	var len = this._executescriptlist.length;
    	for (var i = 0; i < len; i++)
    	{
    		if (this._executescriptlist[i].url == mainurl)
    		{
    			this._executescriptlist.splice(i, 0, { url: suburl, fn: nexacro._emptyFn });
    			break;
    		}

    	}

    	var service = nexacro._getServiceObject(url);
    	this._load_manager.loadIncludeModule(suburl, null, asyncmode, service);
    };

	_pFormBase._excuteScript = function (context)
    {
    	if (context)
    	{
    		var executescript = context._executescriptlist.shift();
    		while (executescript)
    		{
    			executescript.fn.call(context);
    			executescript = context._executescriptlist.shift();
    		}
    	}
    };


    _pFormBase.registerScript = function (filename, fn)
    {
    	var scriptlist = this._executescriptlist;
    	var len = scriptlist.length;

    	var register_flag = true;
    	for (var i = 0; i < len; i++)
    	{
    		if (scriptlist[i].url == filename)
    		{
    			scriptlist[i].fn = fn;
    			register_flag = false;
    			break;
    		}
    	}

    	if (register_flag)
    		this._executescriptlist.push({ "url": filename, "fn": fn });
    };


    _pFormBase.addIncludeScript = function (mainurl, url)
    {
    	if (url)
    	{
    		this._includescriptlist.push({ target: mainurl, url: url });
    	}
    };

    _pFormBase.loadIncludeScript = function (mainurl)
    {
    	var includescript;
    	var len = this._includescriptlist.length;
    	for (var i = 0; i < len; i++)
    	{
    		includescript = this._includescriptlist[i];
    		if (includescript.target == mainurl)
    		{
    			// IE9에서 open시 FormBase에 링크된 loadIncludeScript 가 호출될 때,
    			// 함수 내에서 또 this의 함수(_loadInclude)를 호출하면 this가 window로 바뀌는 문제가 있다.
    			// call을 통해 호출하면 문제가 발생하지 않음... why?? 2014.02.14 neoarc

    			this._loadInclude.call(this, mainurl, includescript.url, true);
    			//this._loadInclude(mainurl, includescript.url, true);
    		}
    	}
    };
	//===============================================================
    // nexacro.FormBase : Override
    //===============================================================


    _pFormBase._findForm = function (comp)
    {
        return this;
    };

    _pFormBase._getReferenceContext = function ()
    {
        return this;
    };

	// GetDlgCode 컴포넌트가 어떤 키를 처리하길 원하는지의 여부 .. 
    _pFormBase._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
    	// Ex)
    	// want_tab:true    : Tab키를 눌러도 포커스 이동을 하지 않음 (Grid,TextArea)
    	// want_return:true : Enter키를 눌러도 DefaultButton 처리를 하지 않음 (Menu,PopupMenu,Grid,TextArea)
    	// want_escape:true : ............... EscapeButton 처리를 하지 않음
    	// want_chars       : 미사용
    	// want_arrows      : 미사용
    	var last_focused_comp = this._getLastFocused();
    	if (last_focused_comp && last_focused_comp != this)
    	{
    		return last_focused_comp._getDlgCode(keycode, altKey, ctrlKey, shiftKey);
    	}
    	return { want_tab: false, want_return: false, want_escape: false, want_chars: false, want_arrows: false };
    };


    _pFormBase.setSize = function (width, height)
    {
        if (this._adjust_width != width || this._adjust_height != height)
        {
            this._adjustPosition(this.left, this.top, null, null, width, height, this.parent._getClientWidth(), this.parent._getClientHeight());
            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.setElementSize(width, height);
                //this._updateClientSize(control_elem);
            }
        }
    };

    _pFormBase._waitCursor = function (wait_flag, context)
    {
        var ownerframe = this.getOwnerFrame();
        if (ownerframe)
        {
            ownerframe._waitCursor(wait_flag, context);
        }
    };

    //===============================================================
    // nexacro.FormBase : Methods
    //===============================================================
    _pFormBase._destroy = function ()
    {
        // Framework 내부에서 destroy할 때는 _destroy 사용
        if (!this._is_alive)
            return;

        return this.destroyComponent();
    };

    _pFormBase.destroy = function ()
    {
        // 사용자가 직접 호출한 경우라고 가정한다.
        if (!this._is_alive)
            return;

        var confirm_message = this._on_beforeclose();
        if (this._checkAndConfirmClose(confirm_message) == false)
            return false;

        if (this._window)
            this._window._ignore_close_confirm = true;

        this._on_close();

        return this.destroyComponent();
    };

    _pFormBase.loadCss = function (url, base_url, async)
    {        
        //경로 설정하는 api 필요
        if (!base_url)
        	base_url = this._base_url;

        var cssurl = nexacro._getServiceLocation(url, base_url);
        var cssmapurl = cssurl;
        var pos = cssurl.lastIndexOf('/');
        cssurl = cssurl.substring(0, pos + 1) + nexacro._getCSSFileName(cssurl.substring(pos + 1, cssurl.length - 4));
        var service = nexacro._getServiceObject(url);
        this._load_manager.loadCssModule(cssurl, null, async, service, true, 1); //css

        pos = cssmapurl.lastIndexOf('.');
        cssmapurl = cssmapurl.substring(0, pos + 1) + "map.js";
        this._load_manager.loadCssModule(cssmapurl, null, async, service);  //map
    };

    _pFormBase.move = function (left, top, width, height, right, bottom, noneUpdate)
    {
        var control_elem = this.getElement();

        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var bsize = false, bmove = false;
        var update = false;

        var parent = this.parent;
        if (parent)
            this._adjustPosition(left, top, right, bottom, width, height, parent._getClientWidth(), parent._getClientHeight());
        else
            this._adjustPosition(left, top, right, bottom, width, height, null, null);

        if (this._adjust_width != old_width || this._adjust_height != old_height)
        {
            bsize = true;
            if (old_width == 0 || old_height == 0)
                update = true;
        }
        if (this._adjust_left != old_left || this._adjust_top != old_top)
        {
            bmove = true;
        }
        this.on_update_position(bsize, bmove);

        if (this._layout_list && this._layout_list.length > 0)
        {
            this._checkValidLayout();
        }
    };

    _pFormBase.resize = function (w, h) 
	{
	    if (w < 0 || h < 0)
	        return;

	    if (w == this._adjust_width && h == this._adjust_height)
	    { 	                   
	        return;
	    }
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;

		var bsize = false;
        if(old_width != this._adjust_left+w || old_height != this._adjust_top+h)
		{
            this.width = w;
            this.height = h;
			bsize = true;
        }

        this._update_position(bsize, false);

        if (this._layout_list && this._layout_list.length > 0)
        {
            this._checkValidLayout();
        }
    };

    _pFormBase.confirm = function (strText, strCaption, strType)
    {
        var win = this._getWindow();
        if (!win)
            return;

        nexacro._skipDragEventAfterMsgBox = true;
        
        return nexacro._confirm(win.frame, strText, strCaption, strType);
    };

    _pFormBase.alert = function (strText, strCaption, strType)
    {
        var win = this._getWindow();
        if (!win)
            return;

        nexacro._skipDragEventAfterMsgBox = true;

        nexacro._alert(win.frame, strText, strCaption, strType);
    };

    _pFormBase.getOwnerFrame = function ()
    {
        var frame = null;
        if (this.parent && !(this.parent instanceof nexacro.Frame))
        {
            frame = this.parent.getOwnerFrame();
        }
        else
        {
            frame = this.parent;
        }
        return frame;
    };

    _pFormBase.lookup = function (name)
    {
        for (var f = this; (f != null) ; f = f.parent)
        {
            if (name in f)
                return f[name];
        }
    };

    _pFormBase.lookupSetter = function (name, fnname)
    {
        if (!fnname)
            fnname = "set_" + name;
        for (var f = this; (f != null) ; f = f.parent)
        {
            var fn = f[fnname];
            if (fn)
            {
                return new nexacro.SetterBinder(f, name, fn);
            }
            if (name in f)
            {
                return new nexacro.PropBinder(f, name);
            }
        }
        return null;
    };

    _pFormBase.lookupFunc = function (name)
    {
        for (var f = this; (f != null) ; f = f.parent)
        {
            var fn = f[name];
            if (fn)
            {
                return new nexacro.FuncBinder(f, fn);
            }
        }
        return null;
    };

    _pFormBase.getLayoutInfo = function (name, key)
    {
        var layout = this._layout_list[name];
        if (layout)
        {
            return layout[key];
        }
        return;
    };

    //===============================================================
    // nexacro.FormBase : Event Handlers
    //===============================================================
    _pFormBase._on_activate = function ()
    {
        if (this.visible && this._isEnable() && this.enableevent)
        {
            this.on_fire_onactivate();
        }
    };

    _pFormBase._on_deactivate = function ()
    {
        if (this.visible && this._isEnable() && this.enableevent)
        {
            this.on_fire_ondeactivate();
        }
    };

    _pFormBase.on_fire_onactivate = function ()
    {
        if (this.onactivate && this.onactivate._has_handlers)
        {
            var evt = new nexacro.ActivateEventInfo(this, "onactivate", true, this, this);
            this.onactivate._fireEvent(this, evt);
        }
    };

    _pFormBase.on_fire_ondeactivate = function ()
    {
        if (this.ondeactivate && this.ondeactivate._has_handlers)
        {
            var evt = new nexacro.ActivateEventInfo(this, "ondeactivate", false, this, this);
            this.ondeactivate._fireEvent(this, evt);
        }
    };

    _pFormBase._on_beforeclose = function (root_closing_comp)
    {
        if (!this._is_alive || (this._is_form && !this._is_loaded))
            return;

        if (!root_closing_comp)
            root_closing_comp = this;
        var msg = "";

        // 모든 하위 form계열 beforeclose 호출
        var components = this.components;
        var len = components.length;
        for (var i = 0; i < len; i++)
        {
            var comp = components[i];
            if (!(comp instanceof nexacro.FormBase))
                continue;

            var comp_msg = comp._on_beforeclose(root_closing_comp);
            msg = this._appendBeforeCloseMsg(msg, comp_msg);
            }

        // self
        var self_msg = this._on_bubble_beforeclose(root_closing_comp);
        msg = this._appendBeforeCloseMsg(msg, self_msg);

        return msg;
    };

    _pFormBase._on_bubble_beforeclose = function (root_closing_comp, event_bubbles, fire_comp, refer_comp)
    {
        var first_call = false;
        if (event_bubbles === undefined) // firecomp
        {
            first_call = true;
            fire_comp = this;
            if (!refer_comp)
                refer_comp = this;
        }

        var msg = "";
        if (this.visible && this._isEnable())
        {
            if (this.enableevent)
            {
                if (first_call)
                    event_bubbles = false;

                msg = this.on_fire_onbeforeclose(this, fire_comp, refer_comp, root_closing_comp);
            }
        }

        // TODO check Form계열 close Event 버블링여부는 논의중.
        var bubbled_msg = "";
        if ((!this.onbeforeclose || (this.onbeforeclose && !this.onbeforeclose.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application)
        {
            bubbled_msg = this.parent._on_bubble_beforeclose(root_closing_comp, event_bubbles, fire_comp, refer_comp);
        }

        return this._appendBeforeCloseMsg(msg, bubbled_msg);
    };

    _pFormBase._on_close = function ()
    {
        if (!this._is_alive || (this._is_form && !this._is_loaded))
            return true;

        var components = this.components;
        var len = components.length;
        for (var i = 0; i < len; i++)
        {
            var comp = components[i];
            if (!(comp instanceof nexacro.FormBase))
                continue;

            comp._on_close();
        }

        this._on_bubble_close();
    };

    _pFormBase._on_bubble_close = function (event_bubbles, fire_comp, refer_comp)
    {
        var first_call = false;
        if (event_bubbles === undefined) // firecomp
        {
            first_call = true;
            fire_comp = this;
            if (!refer_comp)
                refer_comp = this;
        }

        if (this.visible && this._isEnable())
        {
            if (this.enableevent)
            {
                if (first_call)
                    event_bubbles = false;

                this.on_fire_onclose(this, fire_comp, refer_comp);
            }
        }

        // TODO check Form계열 close Event 버블링여부는 논의중.
        var parent = this.parent;
        if (parent) // parent._is_frame
        {
            if ((!this.onclose || (this.onclose && !this.onclose.stoppropagation)) && event_bubbles !== true && !parent._is_application)
            {
                return parent._on_bubble_close(event_bubbles, fire_comp, refer_comp);
            }
        }
    };

    _pFormBase.on_fire_onbeforeclose = function (obj, from_comp, refer_comp, root_closing_comp)
    {
        if (this.onbeforeclose && this.onbeforeclose._has_handlers)
        {
            var evt = new nexacro.CloseEventInfo(obj, "onbeforeclose", from_comp, refer_comp, root_closing_comp);
            return this.onbeforeclose._fireEvent(this, evt);
        }
    };

    _pFormBase.on_fire_onclose = function (obj, from_comp, refer_comp)
    {
        if (this.onclose && this.onclose._has_handlers)
        {
            var evt = new nexacro.CloseEventInfo(obj, "onclose", from_comp, refer_comp);
            return this.onclose._fireEvent(this, evt);
        }
        return true;
    };

    _pFormBase.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri)
    {
        if (this.onerror && this.onerror._has_handlers)
        {
            var evt = new nexacro.ErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
            return this.onerror._fireEvent(this, evt);
        }
        return false;
    };

    //===============================================================
    // nexacro.FormBase : Logical Part
    //===============================================================

    _pFormBase.loadForm = function (formurl, async, reload, baseurl)
    {
        if (this._load_manager)
        {
            var url = nexacro._getFDLLocation(formurl, baseurl);
        	
            this._url = url;
            this._base_url = nexacro._getBaseUrl(url);

            if (this._load_manager)
                this._load_manager.clearAllLoad();

            this._clearUserFunctions();

            this._is_loading = true;
            if (this.parent._is_frame && this.parent.form == this)
            {
            	// ChildFrame > Form  
            	var application = nexacro.getApplication();
            	if (application)
					application._registerLoadforms(this);
            }
            
            var service = nexacro._getServiceObject(formurl);
            //trace("FormBase.loadForm :" + url);
            var ret = this._load_manager.loadMainModule(url, undefined, async, reload, service);
        }
    };

    //CHECK
    _pFormBase.getParentContext = function ()
    {

    };

    _pFormBase._getFormBaseUrl = function ()
    {
        return this._base_url;
    };
    /*
    _pFormBase._clearCssInfo = function (exceptcssselector)
    {
        this._css_finder = null;
        this._ref_css_finder = null;
        this._cssfinder_cache = {};
        this._find_csslist = null;
        if (!exceptcssselector)
        {
            this._css_selectors = null;
            this._css_selectors = { _has_items: false, _has_attr_items: false };
        }
        
    };
    */
	//return real object - parent.child syntex 
	// "this" 일 경우 자신을 return.. form 의 bind 지원
    _pFormBase._findChildObject = function (queryid)
    {
        var npos = queryid.indexOf(".");
        if (npos > 0)
        {            
            var querythis = queryid.substring(0, npos).trim();            
            querythis = this[querythis];
            
            if (querythis)
            {
                if (querythis._findChildObject)
                {
                    return querythis._findChildObject(queryid.substring(npos + 1, queryid.length).trim());
                }

                if (querythis.form && querythis.form._findChildObject)
                {
                    var subid = queryid.substring(npos + 1, queryid.length).trim(); // form.xxxx.yyy
                    subid = subid.substring(subid.indexOf(".") + 1, subid.length).trim(); // xxxx.yyy
                    return querythis.form._findChildObject(subid);
                }
            }
        }
        else
        {
        	if (queryid == "this")
        		return this;
            return this[queryid];
        }
    };

    //parent  application 
    _pFormBase._getDatasetObject = function (queryid)
    {
    	var _ds = this[queryid];
    	if (_ds == null && this.parent && !this.parent._is_application)
    	{
    		_ds = this.parent._getDatasetObject(queryid);
    	}

    	if (_ds == null)
    	{
    		var application = nexacro.getApplication();
    		if (application)
    			_ds = application[queryid];
    	}

    	return _ds;
    };
    // Override for component __applyers

    // Tab키로 포커스 이동시 다음 대상이 자기자신이면, 자기 자신에서 멈춰야 하는지 여부 체크
    _pFormBase._checkContainerTabFocus = function ()
    {
        // true: 자기자신에서 focus를 멈춤
        if (this._is_form && nexacro._enableaccessibility && this._isAccessibilityEnable() == true)
            return true;
        
        // false: First TabOrder Child까지 Focus 진입
        return false;
    };

    _pFormBase._checkContainerHeadingFocus = function ()
    {
        // true: 자기자신에서 focus를 멈춤
        if (this._is_form && nexacro._enableaccessibility && this._isAccessibilityEnable() == true && this._isAccessibilityRoleHeading())
            return true;

        // false: First TabOrder Child까지 Focus 진입
        return false;
    };


    _pFormBase._getTabOrderLast = function (bAccessibility, bEditable, edittype, bComposite)
        {
        var ar = this._getSortedDecendants(this, true, bAccessibility);
        var child;
        for (var i = ar.length - 1; i >= 0; i--)
        {
            child = ar[i];
            if (bEditable)
            {
                if (child._isEditableComponent(edittype))
                    return child;
                else if (bComposite && child._is_form)
                {
                    var comp = child._getTabOrderLast(bAccessibility, bEditable, edittype, bComposite);
                    if (comp)
                        return comp;
                }                    
            }
            else if (bAccessibility)
            {
                if (child._isAccessibilityEnable())
                    return child;
                else if (child._is_form)
                    return child._getTabOrderLast(true);
            }
            else if (child.on_get_prop_tabstop())
                return child;
        }
        return null;
    };

    _pFormBase._getHeadingOrderLast = function ()
    {
        var ar = this._getSortedDecendants(this, true, true);
        var child;
        for (var i = ar.length - 1; i >= 0; i--)
        {
            child = ar[i];

            if (child._isAccessibilityRoleHeading())
            {
            	return child;
            }
            else if (child._is_form)
            {
            	var comp = child._getHeadingOrderLast();
            	if (comp)
            	{
            		return comp;
            	}
            }
        }
        return null;
    };


    _pFormBase._getTabOrderFirst = function (bAccessibility, bEditable, edittype, bComposite)
    {
        var ar = this._getSortedDecendants(this, true, bAccessibility);
        var child;
        for (var i = 0; i < ar.length; i++)
        {
            child = ar[i];
            if (bEditable)
            {
                if (child._isEditableComponent(edittype))
                    return child;
                else if (bComposite && child._is_form)
                {
                    var comp = child._getTabOrderFirst(bAccessibility, bEditable, edittype, bComposite);
                    if (comp)
                        return comp;
                }
            }
            else if (bAccessibility)
            {
                if (child._isAccessibilityEnable())
                    return child;
                else if (child._is_form)
                    return child._getTabOrderFirst(true);
            }
            else if (child.on_get_prop_tabstop())
                return child;
        }
        return null;
    };

    _pFormBase._getHeadingOrderFirst = function ()
    {
        var ar = this._getSortedDecendants(this, true, true);
        var child;
        for (var i = 0; i < ar.length; i++)
        {
        	child = ar[i];

        	if (child._isAccessibilityRoleHeading())
        	{
        		return child;
        	}
        	else if (child._is_form)
        	{
        		var comp = child._getHeadingOrderFirst();
        		if (comp)
        		{
        			return comp;
        		}
        	}
        }
        return null;
    };

    _pFormBase._getTabOrderNext = function (current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite)
    {
        if (current && current._hasContainer() && !bhotkey)
        {
            var current_first_child = null;
            if (direction > 0)
                current_first_child = current._getTabOrderFirst(bAccessibility, bEditable, edittype);
            else
                current_first_child = current._getTabOrderLast(bAccessibility, bEditable, edittype);

            if (current._last_focused == null && current_first_child != null)
                return current_first_child;
        }

        var ar = this._getSortedDecendants(this, true, bAccessibility);
        var cur_idx = nexacro._indexOf(ar, current._getRootComponent(current));
        if (cur_idx < 0)
            return null;

        var child;
        if (direction > 0)
        {
            for (var i = cur_idx + direction; i < ar.length; i++)
            {
                child = ar[i];
                if (bEditable)
                {
                    if (child._isEditableComponent(edittype))
                        return child;
                    else if (bComposite && child._hasContainer())
                    {
                        var comp = child._getTabOrderFirst(bAccessibility, bEditable, edittype, bComposite);
                        if (comp)
                            return comp;
                    }
                }
                else if (bAccessibility)
                {
                    if (child._isAccessibilityEnable())
                        return child;
                    else if (child._is_form && child._child_list.length)
                        return child;
                    else if (child._isItemAccessibilityEnable())
                        return child;
                }
                else if (child.on_get_prop_tabstop())
                    return child;
            }
        }
        else if (direction < 0)
        {
            for (var i = cur_idx + direction; i >= 0; i--)
            {
                child = ar[i];
                if (bEditable)
                {
                    if (child._isEditableComponent(edittype))
                        return child;
                    else if (bComposite && child._hasContainer())
                    {
                            var comp = child._getTabOrderLast(bAccessibility, bEditable, edittype, bComposite);
                        if (comp)
                            return comp;
                    }
                }
                else if (bAccessibility)
                {
                    if (child._isAccessibilityEnable())
                        return child;
                    else if (child._is_form && child._child_list.length)
                        return child;
                    else if (child._isItemAccessibilityEnable())
                        return child;
                }
                else if (child.on_get_prop_tabstop())
                    return child;
            }
        }
        if (bEditable)
        {
            if (direction > 0)
            {
                for (var i = 0 ; i < cur_idx - direction; i++)
                {
                    child = ar[i];
                    if (bEditable)
                    {
                        if (child._isEditableComponent(edittype))
                            return child;
                        else if (bComposite && child._hasContainer())
                        {
                            var comp = child._getTabOrderFirst(bAccessibility, bEditable, edittype, bComposite);
                            if (comp)
                                return comp;
                        }
                    }
                }
            }
            else if (direction < 0)
            {
                for (var i = ar.length -1 ; i > cur_idx; i--)
                {
                    child = ar[i];
                    if (bEditable)
                    {
                        if (child._isEditableComponent(edittype))
                            return child;
                        else if (bComposite && child._hasContainer())
                        {
                            var comp = child._getTabOrderLast(bAccessibility, bEditable, edittype, bComposite);
                            if (comp)
                                return comp;
                        }
                            
                    }
                }
            }
        }
        return null;
    };

    _pFormBase._getHeadingOrderNext = function (current, direction)
    {
        if (current && current._hasContainer()) // && direction > 0)
        {
            if (current._last_focused)
            {
                var comp = current._getHeadingOrderNext(current._last_focused, direction);
                if (comp)
                    return comp;
                else
                    current._last_focused = null;
            }
            else if (current._last_focused == null)
            {
                if (direction == 1)
                {
                    var comp = current._getHeadingOrderFirst(true);
                }
                else
                    var comp = current._getHeadingOrderLast(true);
                if (comp)
                    return comp;
            }
        }

        var ar = this._getSortedDecendants(this, true, true, null);
        var cur_idx = nexacro._indexOf(ar, current._getRootComponent(current));
        if (cur_idx < 0)
            return null;

        var child;
        if (direction > 0)
        {
            for (var i = cur_idx + direction; i < ar.length; i++)
            {
                child = ar[i];

                if (child._isAccessibilityRoleHeading())
                    return child;
                else if (child && child._hasContainer())
                {
                    var current_first_child = child._getHeadingOrderFirst(true);
                    if (current_first_child)
                        return current_first_child;
                }
            }
        }
        else if (direction < 0)
        {
            for (var i = cur_idx + direction; i >= 0; i--)
            {
                child = ar[i];
                if (child._isAccessibilityRoleHeading())
                    return child;
                else if (child && child._hasContainer())
                {
                    var current_first_child = child._getHeadingOrderLast(true);
                    if (current_first_child)
                        return current_first_child;
                }
            }
        }
        return null;
    };
    
    _pFormBase._getSortedDecendants = function (p, include_not_tabstop, bAccessibility)//, arEdit)
    {
        // tabstop=false인 컴포넌트에서 Tab 이동시 필요하다. 
        if (include_not_tabstop === undefined)
            include_not_tabstop = false;

        var ar = [];
        var comps = p.components;
        if (comps)
        {
        var comp_len = comps.length;
        for (var i = 0; i < comp_len; i++)
        {
            var comp = comps[i];
                if (!comp || !comp._is_created || !comp.visible || (comp._isEnable && !comp._isEnable() || !comp.enable) || comp._popup)
                continue;
            /*
            if (bAccessibility)
            {
                if (!comp._isAccessibilityEnable())
                        continue;
                }              
            */
            if (!bAccessibility && !include_not_tabstop && !comp.on_get_prop_tabstop())
                continue;

            var tabidx = comp._taborder;
            if (tabidx < 0)
                tabidx = 0; //continue;
            var j = ar.length;
            while (j > 0 && ar[j - 1]._taborder > tabidx)
            {
                ar[j] = ar[j - 1];
                j--;
            }
            ar[j] = comp;
        }
        }
        return ar;
    };
    
    _pFormBase.addLayout = function (name, obj)
    {
        if (!obj) return;

        if (name == "default")
        {
            this._default_layout = obj;
        }
        //else if (application._screeninfo == null || (obj.screenid == ""))
        //{
        //    this._layout_list.add_item(name, obj);
        //}    	
        else 
        {
        	var curscreenid = nexacro._getCurrentScreenID();
        	if (curscreenid)
        	{
        		// 미지정시 모든 스크린에서 사용 가능
        		if (!obj.screenid || obj.screenid == "")
        		{
        			this._layout_list.add_item(name, obj);
        			return;
        		}

        		var screenid_list = obj.screenid.split(',');
        		var cnt = screenid_list.length;
        		for (var i = 0; i < cnt; i++)
        		{
        			if (curscreenid == screenid_list[i])
        			{
        				this._layout_list.add_item(name, obj);
        				break;
        			}
        		}
        	}
        }
    };


    _pFormBase._setPos = function (left, top)
    {
        if (this._adjust_left != left || this._adjust_top != top)
        {
            this._adjust_left = this.left = left;
            this._adjust_top = this.top = top;

            if (this.parent)
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
            else
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);

            this.on_update_position(false, true);
        }
    };

    _pFormBase._setSize = function (width, height)
    {
        if (this._adjust_width != width || this._adjust_height != height)
        {
            this._adjust_width = this.width = width;
            this._adjust_height = this.height = height;

            if (this.parent)
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
            else
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);

            this.on_update_position(true, false);
        }
    };

    _pFormBase._initLayoutManager = function ()
    {
        var layout_name = "default";
        var layout_list_len = this._layout_list.length;
        if (layout_list_len > 0)
        {
            var old_layout_name = this._current_layout_name;
            this._current_layout_name = "";
            this._cur_real_layout = "";

            var xy = { cx: this._adjust_width, cy: this._adjust_height };
            var idx = nexacro._getLayoutManager().checkValid(this, xy);

            layout_list_len = this._layout_list.length;
            if (this._layout_list[layout_list_len - 1].name != "default")
            {
                this._layout_list.add_item("default", this._default_layout);
                layout_list_len = this._layout_list.length;
            }

            if (idx >= 0)
            {
                var ret;
                var old_layout = this._layout_list[old_layout_name];
                var new_layout = this._layout_list[idx];
                var oldwidth = 0, oldheight = 0;
                oldwidth = old_layout ? old_layout.width : 0;
                oldheight = old_layout ? old_layout.height : 0;

                if (old_layout_name != new_layout.name)
                    ret = this.on_fire_canlayoutchange(this, "canlayoutchange", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);

                if (ret === true || ret === undefined)
                {
                	nexacro._getLayoutManager().loadLayout(this, null, new_layout);

                    if (old_layout_name != new_layout.name)
                        this.on_fire_onlayoutchanged(this, "onlayoutchanged", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);

                    this._current_layout_name = new_layout.name;
                    this._cur_real_layout = new_layout.name;
                }
                else
                {
                    if (old_layout_name)
                    {
                        layout_name = old_layout_name;
                    }

                    this._current_layout_name = layout_name;
                    this._cur_real_layout = layout_name;
                }
            }
        }
        else if (layout_list_len <= 0 && this._default_layout)
        {
        	nexacro._getLayoutManager().loadLayout(this, null, this._default_layout, this._default_layout);

            this._current_layout_name = layout_name;
            this._cur_real_layout = layout_name;
        }
    };

    _pFormBase._checkValidLayout = function ()
    {
    	var pManager = nexacro._getLayoutManager();
        if (pManager)
        {
            var old_layout_name = this._current_layout_name;
            var new_layout = null;
            var xy = { cx: this._adjust_width, cy: this._adjust_height };
            var new_idx = pManager.checkValid(this, xy);

            if (new_idx > -1)
            {
                new_layout = this._layout_list[new_idx];
            }
            else
            {
                return pManager.getCurrentLayout(this);
            }

            if (new_layout && old_layout_name != new_layout.name)
            {
                var len = this.all.length;
                for (var i = 0; i < len; i++)
                {
                    if (this.all[i]._is_form && this.all[i]._layout_list.length > 0)
                    {
                        this.all[i]._checkValidLayout(xy);
                    }
                }

                var old_layout = this._layout_list[old_layout_name];
                var oldwidth = 0, oldheight = 0;
                oldwidth = old_layout ? old_layout.width : 0;
                oldheight = old_layout ? old_layout.height : 0;
                var ret = this.on_fire_canlayoutchange(this, "canlayoutchange", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);
                if (ret === true || ret === undefined)
                {
                    if (new_layout.name != "default")
                    {
                        pManager.changeLayout(this, this._default_layout);
                    }

                    pManager.changeLayout(this, new_layout);

                    this.on_fire_onlayoutchanged(this, "onlayoutchanged", old_layout_name, new_layout.name, oldwidth, new_layout.width, oldheight, new_layout.height);
                }

                if (this._is_scrollable)
                {
                    this.resetScroll();
                }

                return new_layout;
            }
        }
    };

    _pFormBase._on_prepare_stepcontents = function (old_stepcount, old_stepindex, new_stepcount, new_stepindex)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (this._is_created && (old_stepcount > 0 || new_stepcount > 0))
            {
                var comps = this.components;
                var comp_len = comps.length;
                for (var i = 0; i < comp_len; i++)
                {
                    var comp_elem = comps[i].getElement();
                    control_elem.removeChildElement(comp_elem);
                }
            }

            control_elem.setElementStepCount(new_stepcount);
            control_elem.setElementStepIndex(new_stepindex);
            if (new_stepindex > -1 && control_elem._step_count > new_stepindex)
            {
                control_elem.setElementHScrollPos(control_elem.client_width * new_stepindex);
            }
        }

        //if (this.stepselector)
        //    this._destroyStepControl();
    };

    _pFormBase._on_refresh_stepcontents = function (old_stepcount, old_stepindex, new_stepcount, new_stepindex)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (this._is_created && (old_stepcount > 0 || new_stepcount > 0))
            {
                var comps = this.components;
                var comp_len = comps.length;
                for (var i = 0; i < comp_len; i++)
                {
                    var comp_elem = comps[i].getElement();
                    control_elem.appendChildElement(comp_elem);
                }
            }
        }

        if (new_stepcount > 0)
        {
            if (!this.stepselector)
            {
                this._createStepControl(new_stepcount, new_stepindex);
                if (this._is_created) 
                {
                    this.stepselector.on_created();
                }
            }
           
        }
    };

    _pFormBase._createStepControl = function (stepcnt, stepidx)
    {
      //  trace("_pFormBase._createStepControl, stepcnt="+stepcnt+", stepidx="+stepidx);

        if (!this.stepselector)
        {
            var step_ctrl = new nexacro.StepControl("stepselector", "absolute", 0, 0, 0, 0, null, null, this);
            step_ctrl.createComponent(true);
            step_ctrl.set_stepcount(stepcnt);
            step_ctrl.set_stepindex(stepidx);
            if (!nexacro._isNull(this.stepitemsize))
                step_ctrl.set_stepitemsize(this.stepitemsize);

            this.stepselector = step_ctrl;

            this._updateStepControlSize();
            this._setEventHandler("onstepchanged", this._on_stepchanged, this);
        }
    };

    _pFormBase._destroyStepControl = function ()
    {
        var step_ctrl = this.stepselector;
        if (step_ctrl)
        {
            step_ctrl.destroy();
            this.stepselector = null;
        }
    };

    _pFormBase._updateStepControlSize = function ()
    {
        var step_ctrl = this.stepselector;
        if (step_ctrl)
        {
            this.on_apply_stepalign();
        }
    };

    _pFormBase._on_stepchanged = function (obj, e)
    {
        // stepindex가 바뀌는 모든 상황
        var stepselector = this.stepselector;
        var control_elem = this.getElement();
        if (stepselector && control_elem)
        {
            // Touch Slide로 바뀐 경우 이미 애니메이션 종료 시점임.
            var zoomFactor = this._getZoom() / 100;
            var client_width = control_elem.client_width / zoomFactor;

            var is_invalid_pos = (control_elem.scroll_left != (client_width * stepselector.stepindex));
            if (!is_invalid_pos)
                return;

            this._createStepChangeAnimation(stepselector.stepindex, 400);
        }
    };

    _pFormBase.on_fire_sys_onflingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp)
    {
        var last_focus_comp = this._getLastFocused();
        if (last_focus_comp && (last_focus_comp != from_comp) && last_focus_comp._input_element)
        {
            var last_focus_elem = last_focus_comp.getElement();
            last_focus_elem.setElementFocus();
        }

        return nexacro.Component.prototype.on_fire_sys_onflingstart.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);
    };

    _pFormBase.on_fire_sys_onslidestart = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        var last_focus_comp = this._getLastFocused();
        if (last_focus_comp && (last_focus_comp != from_comp) && last_focus_comp._input_element)
        {
            var last_focus_elem = last_focus_comp.getElement();
            last_focus_elem.setElementFocus();
        }

        if (this.stepselector && this._stepchange_info)
        {
            // 스크롤 중에 또 잡아 끌면 취소
            this._on_cancel_stepchange_animation();
        }
        return nexacro.Component.prototype.on_fire_sys_onslidestart.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
    };

    _pFormBase.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp)
    {
        // 내가 slide로 인한 스크롤 대상이고
        if (touch_manager && touch_manager._scroll_comp == this)
        {
            var control_elem = this.getElement();
            var stepselector = this.stepselector;
            if (!control_elem || !stepselector)
                return;
          
            // 현재 Step index와 정확히 일치하는 화면을 보고 있는 것이 아니라면
            //var zoomFactor = this._getZoom() / 100;
            var client_width = control_elem.client_width;

            var is_invalid_pos = (control_elem.scroll_left != (client_width * stepselector.stepindex));
            if (!is_invalid_pos)
                return;

            var duration = 400;

            // 어디까지 스크롤 할것인가?

            // 1. 단순히 생각하면 그냥 가까운쪽
            //For now, stepchange logic is coded here. (referenced by nexacro14)           
            var target_pos = control_elem.scroll_left - (client_width / 2);
            var session = touch_manager._touch_session;
            if (session)
            {
                var data = session._cur_data;
                if (data)
                    target_pos -= data.distanceX;               
            }
            var target_index = nexacro.round(target_pos / (client_width) + 0.5);
            if (target_index == stepselector.stepindex)
            {
                //stepchange cancel animation
                this._createStepChangeAnimation(target_index, 600); //just reuse the function 
            }
            /*
            // 2. fling인 경우 좀 멀어도 가산점을 줌.  
            var flinginfo = touch_manager._is_fling;
            if (flinginfo)
            {
                var flingfactor = 3;
                var flingdistance = flinginfo.xstartvalue | 0; // fling 처리시 이동가능한 거리

                // TODO check 한번에 여러 Step 넘어갈 수 있게 할까?
                if (flingdistance < -(client_width / flingfactor))
                    flingdistance = -(client_width / flingfactor);
                if (flingdistance > (client_width / flingfactor))
                    flingdistance = (client_width / flingfactor);

                target_pos -= flingdistance;
            }
            */
           

            var ret = stepselector.set_stepindex(target_index);

            if (!ret)
            {
                control_elem.setElementHScrollPos(client_width * stepselector.stepindex);
            }
          
            // 아직 fling 되기 전임. Fling이 발생하지 않도록 처리함.
            touch_manager._touch_session._fling_blocked = true;
        }
        else
        {
            // 기본 호출
            return nexacro.Component.prototype.on_fire_sys_onslideend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
        }

        // slideend는 return 값이 의미가 없음
        return false;
    };

    _pFormBase._createStepChangeAnimation = function (target_index, duration)
    {
        if (this._stepchange_info)
        {
            this._on_cancel_stepchange_animation();
        }

        var control_elem = this.getElement();
        if (control_elem)
        {
            var info = {};
            info.is_alive = true;
            info.target_index = target_index;
            info.starttime = new Date().getTime();
            info.duration = duration;
            var zoomFactor = this._getZoom() / 100;
            var hscroll_step = control_elem.hscroll_limit / (control_elem._step_count-1); 
            info.startpos = control_elem.scroll_left;
            info.endpos = hscroll_step * target_index;

            if (this.stepshowtype == "action")
            {
                var stepselector = this.stepselector;
                if (stepselector)
                {
                    stepselector.set_visible(true);
                }
            }

            var pThis = this;
            info.timer = new nexacro.AnimationFrame(this, function () { pThis._on_stepchange_animation(); });
            info.timer.start();

            this._stepchange_info = info;
        }
    };

    _pFormBase._on_stepchange_animation = function ()
    {
        var control_elem = this.getElement();
        if (!control_elem)
            return;

        var info = this._stepchange_info;
        if (info && info.is_alive)
        {
            var t = new Date().getTime() -info.starttime; // 0 ~ duration
            var d = info.duration;
            var q = t / d - 1;
            var c = Math.min((q*q*q+1), 1); // Curve3Out Interpolation
            var curpos = info.startpos + ((info.endpos - info.startpos) * c);
                       
            control_elem.setElementHScrollPos(curpos);
            if (t >= info.duration)
            {
                this._on_end_stepchange_animation();
            }
            else
            {
                info.timer.start();
            }
        }
    };

    _pFormBase._on_end_stepchange_animation = function ()
    {
        var info = this._stepchange_info;
        if (!info)
            return;

        info.is_alive = false;
        if (info.timer)
            info.timer.stop();

        var control_elem = this.getElement();
        var stepselector = this.stepselector;
        if (control_elem && stepselector)
        {
            var new_index = info.target_index;
            delete info;

            //control_elem.setElementStepIndex(new_index);
            var hscroll_step = control_elem.hscroll_limit / (control_elem._step_count - 1);
            control_elem.setElementHScrollPos(hscroll_step * new_index);

            var comps = this.components;
            var comp_len = comps.length;
            for (var i = 0; i < comp_len; i++)
            {
                comps[i].on_apply_positionstep(comps[i].positionstep);
            }

            this.on_apply_stepshowtype(this.stepshowtype);
            this._stepchange_info = null;
        }
    };

    _pFormBase._on_cancel_stepchange_animation = function ()
    {
        // 수행도중 다른 Animation 요청이 있으면....
        var info = this._stepchange_info;
        if (!info)
            return;

        info.is_alive = false;
        if (info.timer)
            info.timer.stop();
        delete info;
        this._stepchange_info = null;
    };

    // Tab키로 포커스 이동시 대상 탐색을 위한 api
    _pFormBase._searchNextTabFocus = function (current, bSearchFromFirst, opt_force_cycle, bAccessibility, bhotkey)
    {
        var opt_cycle = (opt_force_cycle == undefined) ? (nexacro._tabkeycirculation == 0) : opt_force_cycle;
        var opt_container_focus = nexacro._enableaccessibility;

        // my child중 누군가를 기준으로 탐색
        var temp, ret, next;
        var my_tapstop_childs = this._getSortedDecendants(this, undefined, bAccessibility);
        var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

        var parent = this.parent;
        while ((parent && !parent._is_form && !parent._is_frame))
        {
            parent = parent.parent;
        }

        if (my_tabstop_child_cnt > 0 && current && !bSearchFromFirst)
        {
            next = this._getTabOrderNext(current, 1, bAccessibility, undefined, undefined, bhotkey);
            if (opt_cycle && !next && this._isPopupVisible())
                next = this._getTabOrderFirst(bAccessibility);
            if (!next)
            {
                // 한바퀴 다 돈 경우

                var parent_tabstop_childs = parent._getSortedDecendants(parent, undefined, bAccessibility);
                var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
                if (!opt_cycle && (parent._is_frame || this._is_window))
                {
                    // "마지막 컴포넌트 입니다."
                    ret = [null, this, 1];
                }
                else if (parent._hasContainer() && parent_tabstop_child_cnt > 0)
                {
                    ret = parent._searchNextTabFocus(this, false, undefined, bAccessibility, bhotkey);
                }
                else
                {
                    // Parent가 form이 아닌 경우? 이건 무슨 경우 인지..
                    next = this._getTabOrderFirst(bAccessibility);
                }
            }
        }
        else
        {
            // this 자체가 focus되어있는 경우
            next = this._getTabOrderFirst(bAccessibility);
            if (!next)
            {
                // 텅빈 div인 경우
                if (!nexacro._isNull(parent))
                {
                    ret = parent._searchNextTabFocus(this, undefined, undefined, bAccessibility, bhotkey);
                }
                else
                {
                    ret = null;
                }
            }
        }

        if (next && !ret)
        {
            var next_tabstop_childs = (next._hasContainer() ? next._getSortedDecendants(next, undefined, bAccessibility) : null);
            var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;
            if (next._is_form && bAccessibility && next._checkContainerTabFocus() == true)
            {
                ret = [next];
            }
            else if (next._hasContainer() && next_tabstop_child_cnt > 0)
            {
                ret = next._searchNextTabFocus(null, true, undefined, bAccessibility, bhotkey);
            }
            else
            {
                ret = [next];
            }
        }

        return ret;
    };

    _pFormBase._searchNextHeadingFocus = function (current, bSearchFromFirst, opt_force_cycle)
    {
        var opt_cycle = (opt_force_cycle == undefined) ? (nexacro._tabkeycirculation == 0) : opt_force_cycle;
        var opt_container_focus = nexacro._enableaccessibility;

        // my child중 누군가를 기준으로 탐색
        var temp, ret, next;
        var my_tapstop_childs = this._getSortedDecendants(this, undefined, true);
        var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

        var parent = this.parent;
        while ((parent && !parent._is_form && !parent._is_frame))
        {
            parent = parent.parent;
        }

        if (my_tabstop_child_cnt > 0 && current && !bSearchFromFirst)
        {
            next = this._getHeadingOrderNext(current, 1);
            if (opt_cycle && !next && this._isPopupVisible())
                next = this._getHeadingOrderFirst();
            if (!next)
            {
                // 한바퀴 다 돈 경우
                var parent_tabstop_childs = parent._getSortedDecendants(parent, undefined, true);
                var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
                if (!opt_cycle && (parent._is_frame || this._is_window))
                {
                    // "마지막 컴포넌트 입니다."
                    ret = [null, this, 1];
                }
                else if (parent._hasContainer() && parent_tabstop_child_cnt > 0)
                {
                    ret = parent._searchNextHeadingFocus(this);
                }
                else
                {
                    // Parent가 form이 아닌 경우? 이건 무슨 경우 인지..
                    next = this._getHeadingOrderFirst();
                }
            }
        }
        else
        {
            // this 자체가 focus되어있는 경우
            next = this._getHeadingOrderFirst();
            if (!next)
            {
                ret = parent._searchNextHeadingFocus(this);
            }
        }

        if (next && !ret)
        {
            var next_tabstop_childs = (next._hasContainer() ? next._getSortedDecendants(next, undefined, true) : null);
            var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;
            if (next._is_form && next._checkContainerHeadingFocus() == true)
            {
                ret = [next];
            }
            else if (next._hasContainer() && next_tabstop_child_cnt > 0)
            {
                ret = next._searchNextHeadingFocus(null, true);
            }
            else
            {
                ret = [next];
            }
        }

        return ret;
    };


    _pFormBase._searchPrevTabFocus = function (current, bSearchFromLast, opt_force_cycle, bAccessibility, bhotkey)
    {
    	var opt_cycle = (opt_force_cycle == undefined) ? (nexacro._tabkeycirculation == 0) : opt_force_cycle;
        var opt_container_focus = nexacro._enableaccessibility;

        var temp, ret, next;
        var my_tapstop_childs = this._getSortedDecendants(this, undefined, bAccessibility);
        var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

        var parent = this.parent;
        while ((parent && !parent._is_form && !parent._is_frame))
        {
            parent = parent.parent;
        }

        if (my_tabstop_child_cnt && current && !bSearchFromLast)
        {
            next = this._getTabOrderNext(current, -1, bAccessibility, undefined, undefined, bhotkey);

            // PopupDiv 내부 순환
            if (opt_cycle && !next && this._isPopupVisible())
                next = this._getTabOrderLast(bAccessibility);
            if (!next)
            {
                // 한바퀴 다 돈 경우
                var parent_tabstop_childs = parent._getSortedDecendants(parent, undefined, bAccessibility);
                var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
                var parent_comps = parent.components;
                if (opt_cycle == false && (parent._is_frame || this._is_window))
                    ret = [null, this, -1];
                //else if (!bAccessibility && this._type_name == "Tabpage")
                //    ret = [this.parent];
                else if (bAccessibility && this._checkContainerTabFocus() == true && parent._is_form)
                    ret = [this];
                else if (parent._hasContainer() && parent_tabstop_child_cnt > 0)
                    ret = parent._searchPrevTabFocus(this, undefined, undefined, bAccessibility, bhotkey);
                else
                    next = this._getTabOrderLast(bAccessibility);
            }
        }
        else
        {
            // Div인데 Child가 없거나, 
            // Div의 Next Comp에서 이동하는 경우..
            if (!bSearchFromLast)
            {
                if (this instanceof nexacro.PopupDiv)
                    next = this._getTabOrderLast(bAccessibility);
                else
                {
                    ret = parent._searchPrevTabFocus(this, undefined, undefined, bAccessibility, bhotkey);
                }
            }

            if (!ret)
            {
                next = this._getTabOrderLast(bAccessibility);
                if (!next && ret !== null)
                {
                    if (bAccessibility && opt_container_focus && this._checkContainerTabFocus() == true)
                        ret = [this];
                    else
                    {
                        ret = parent._searchPrevTabFocus(this, undefined, undefined, bAccessibility, bhotkey);
                    } 
                }
            }
        }

        if (next && !ret)
        {
            var next_tabstop_childs = (next._hasContainer() ? next._getSortedDecendants(next, undefined, bAccessibility) : null);
            var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;

            if (next._hasContainer() && next_tabstop_child_cnt > 0)
                ret = next._searchPrevTabFocus(null, true, undefined, bAccessibility, bhotkey);
            else
                ret = [next];
        }

        return ret;
    };


    _pFormBase._searchPrevHeadingFocus = function (current, bSearchFromLast, opt_force_cycle)
    {
    	var opt_cycle = (opt_force_cycle == undefined) ? (nexacro._tabkeycirculation == 0) : opt_force_cycle;
        var opt_container_focus = nexacro._enableaccessibility;

        var temp, ret, next;
        var my_tapstop_childs = this._getSortedDecendants(this, undefined, true);
        var my_tabstop_child_cnt = my_tapstop_childs ? my_tapstop_childs.length : 0;

        var parent = this.parent;
        while ((parent && !parent._is_form && !parent._is_frame))
        {
            parent = parent.parent;
        }

        if (my_tabstop_child_cnt && current && !bSearchFromLast)
        {
            next = this._getHeadingOrderNext(current, -1);

            // PopupDiv 내부 순환
            if (opt_cycle && !next && this._isPopupVisible())
                next = this._getHeadingOrderLast();
            if (!next)
            {
                // 한바퀴 다 돈 경우

                var parent_tabstop_childs = parent._getSortedDecendants(parent, undefined, true);
                var parent_tabstop_child_cnt = parent_tabstop_childs ? parent_tabstop_childs.length : 0;
                var parent_comps = parent.components;
                if (opt_cycle == false && (parent._is_frame || this._is_window))
                    ret = [null, this, -1];
                else if (opt_container_focus && this._type_name == "Tabpage")
                    ret = [this.parent];
                else if (opt_container_focus && this._checkContainerHeadingFocus() == true)
                    ret = [this];
                else if (parent._is_form && parent_tabstop_child_cnt > 0)
                    ret = parent._searchPrevHeadingFocus(this);
                else
                    next = this._getHeadingOrderLast();
            }
        }
        else
        {
            // Div인데 Child가 없거나, 
            // Div의 Next Comp에서 이동하는 경우..
            if (!bSearchFromLast)
            {
                ret = parent._searchPrevTabFocus(this);
            }

            if (!ret)
            {
                next = this._getTabOrderLast();
                if (!next && ret !== null)
                {
                    ret = parent._searchPrevHeadingFocus(this);
                }
            }
        }

        if (next && !ret)
        {
            var next_tabstop_childs = (next._hasContainer() ? next._getSortedDecendants(next, undefined, true) : null);
            var next_tabstop_child_cnt = next_tabstop_childs ? next_tabstop_childs.length : 0;
            if (next._hasContainer() && next_tabstop_child_cnt > 0)
                ret = next._searchPrevHeadingFocus(null, true);
            else
                ret = [next];
        }

        return ret;
    };

    _pFormBase._processArrowKey = function (bdown, newfocus_comp)
    {
        if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
        {
            var win = this._getWindow();
            win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
        }
        var dir = 2;
        if (!bdown)
            dir = 3;
        newfocus_comp[0]._setFocus(true, dir, false);
    	//TODO

        if (_application.accessibilityfirstovertext && newfocus_comp[0] == this._getTabOrderFirst())
        {
            var comp = newfocus_comp[0];
            var _label = comp._getAccessibilityReadLabel() + " " + _application.accessibilityfirstovertext;
            comp.getElement().notifyAccessibility(_label, "focus");
        }
        else if (_application.accessibilitylastovertext && newfocus_comp[0] == this._getTabOrderLast())
        {
            var comp = newfocus_comp[0];
            var _label = comp._getAccessibilityReadLabel() + " " + _application.accessibilitylastovertext;
            comp.getElement().notifyAccessibility(_label, "focus");
        }
    };

    _pFormBase._processHotkey = function (keycode, altKey, ctrlKey, shiftKey, obj)
    {
        // for tab
        var parent = null;
        if (obj)    parent = obj.parent;
        
        // Hotkey를 설정한 컴포넌트를 등록순으로 탐색
        var hotkey_list = this._hotkey_list;
        for (var i = 0; i < hotkey_list.length; i++)
        {
            var hotkey_info = hotkey_list[i];
            if (hotkey_info[1] == keycode &&
                hotkey_info[2] == altKey &&
                hotkey_info[3] == ctrlKey &&
                hotkey_info[4] == shiftKey)
            {
                var comp = hotkey_info[0];
                // for tab(현재 보이는 tabpage의 component hotkey가 동작되어야함)
                if (parent && parent instanceof nexacro.Tabpage && obj != comp && comp.parent instanceof nexacro.Tabpage)
                    continue;

                if (!comp.enable) return true;

                comp._on_hotkey(keycode, altKey, ctrlKey, shiftKey);
                return true;
            }
        }

        // Modal인 경우만 return 하도록.. Modeless는 허용.
        if (this._is_frame && this._is_window && (this._window_type == 1 || this._window_type == 4))
            return;

        var owner_frame = this.getOwnerFrame();
        if (owner_frame)
        {
            return owner_frame._processHotkey(keycode, altKey, ctrlKey, shiftKey);
        }
    };

    _pFormBase._appendBeforeCloseMsg = function (current_message, new_message)
    {
        if (typeof (new_message) == "boolean")
            new_message = nexacro._toString(new_message);
        
        if (new_message === undefined || new_message == "" || new_message === null)
            return current_message;

        if (current_message === undefined || current_message === null)
            current_message = "";
        else if (current_message != "")
            current_message += "\n";

        return (current_message + new_message);
    };

    _pFormBase._checkAndConfirmClose = function (confirm_message)
    {
        if (confirm_message === undefined || confirm_message == "" || confirm_message === null)
            return true;

        if (this._window && this._window._ignore_close_confirm)
            return true;

        return nexacro._confirm(this, confirm_message);
    };
    
    delete _pFormBase;

   
    //==============================================================================
    // nexacro.Form
    //==============================================================================
    nexacro.Form = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.FormBase.call(this, id, position, left, top, width, height, right, bottom, parent);     
    };

    var _pForm = nexacro._createPrototype(nexacro.FormBase, nexacro.Form);
    nexacro.Form.prototype = _pForm;

    // overide nexacro.Object
    _pForm._type_name = "Form";

    // property
    
    _pForm.layout = ""; // layout
    _pForm.opener = null; // read only
    _pForm.resizebutton = null; // read only
    _pForm.statustext = "";
    _pForm.titletext = "";    
  //  _pForm.cachelevel = "";
    //_pForm.version = "";    
    _pForm.stepshowtype = "always"; //always,action
    _pForm.locale = "";

    /* event list */
    _pForm._event_list = {
        "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
        "onkeypress": 1, "onkeydown": 1, "onkeyup": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1, "onmousedown": 1, "onmouseup": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onmove": 1, "onsize": 1,
        //"ongesture": 1,
        "ontouch": 1,
        //added event
        "onvscroll": 1, "onhscroll": 1, "onactivate": 1, "onbeforeclose": 1,
        "onclose": 1, "ondeactivate": 1, "onsyscommand": 1, "ontimer": 1, "oninit": 1, "onload": 1,
        "canlayoutchange": 1, "canstepchange": 1, "onlayoutchanged": 1, "onstepchanged": 1,
        "ondevicebuttonup": 1,
        // Touch,TouchGesture
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,
        "onorientationchange": 1,
        "onerror":1
    };

    /* internal variable */
    _pForm._url = "";
    _pForm._locale = "";
    _pForm._init_width = 0;
    _pForm._init_height = 0;
    _pForm._defaultbutton = null;
    _pForm._escapebutton = null;
    _pForm._accessibility_role = "form";//Accessibility      
    _pForm._zoomFactor = undefined;
    _pForm._autofittedZoomFactor = undefined;

    //==============================================================================
    // nexacro.Form : Style Part
    //==============================================================================    
    _pForm.on_apply_custom_css = function (pseudo)
    {
        var components = this.components;
        if (components)
        {
            for (var i = 0; i < components.length; i++)
            {
                var comp = components[i];
                comp.on_apply_prop_class(comp[i], pseudo);
            }
        }
    };    

    _pForm.set_stepalign = function (stepalign)
    {
        this.stepalign = stepalign;
        this.on_apply_stepalign(stepalign);
    };

    _pForm.on_apply_stepalign = function (stepalign)
    {
        var control_elem = this.getElement();
        var step_ctrl = this.stepselector;
        if (control_elem && step_ctrl)
        {
            var form_left = 0;
            var form_top = 0;
            //var form_width = control_elem.container_maxwidth;
            //var form_height = control_elem.container_maxheight;
            var form_width = this._getClientWidth();
            var form_height = this._getClientHeight();

            var item_size = step_ctrl._getStepItemsize();
            var item_gap = step_ctrl._getStepItemGap();
            var item_area = step_ctrl._getItemAreaSize(step_ctrl.stepcount, item_size, item_gap);
            if (!stepalign)
                stepalign = this.stepalign;
            var parts = stepalign.split(/\s+/);
            halign = parts[0];
            valign = parts[1];
            var left, top;
            var border = this._getCurrentStyleBorder();
            var border_l = border_t = border_r = border_b = 0;
            if (border)
            {
                border_l = border.left._width;
                border_t = border.top._width;
                border_r = border.right._width;
                border_b = border.bottom._width;
            }

            switch (halign)
            {
                case "left":
                    left = border_l;
                    break;
                case "center":
                    left = (form_width - item_area.width - border_l - border_r) / 2;
                    break;
                case "right":
                    left = form_width - item_area.width - border_r;
                    break;
            }

            switch (valign)
            {
                case "top":
                    top = 0;
                    break;
                case "middle":
                    top = (form_height - item_area.height - border_t - border_b) / 2;
                    break;
                case "bottom":
                    top = form_height - item_area.height - border_b;
                    break;
            }

            step_ctrl.move(left, top, item_area.width, item_area.height, null, null);
        }
    };

    _pForm.set_stepitemsize = function (v)
    {
        v = parseInt(v) | 0;
        if (this.stepitemsize != v)
        {
            this.stepitemsize = v;
            var step_ctrl = this.stepselector;
            if (step_ctrl)
            {
                step_ctrl.set_stepitemsize(v);
            }
        }
    };

    _pForm.set_stepshowtype = function (stepshowtype)
    {
        if (stepshowtype != "always" && stepshowtype != "action")
            return;

        this.stepshowtype = stepshowtype;
        this.on_apply_stepshowtype(stepshowtype);
    };

    _pForm.on_apply_stepshowtype = function (stepshowtype)
    {
        var stepselector = this.stepselector;
        if (stepselector && stepshowtype)
        {
            var type = stepshowtype;
            switch (type)
            {
                case "action":
                    stepselector.set_visible(false);
                    break;
                case "always":
                default:
                    stepselector.set_visible(true);
                    break;
            }
        }
    };

    _pForm.on_get_accessibility_label = function ()
    {
        return this.titletext ? this.titletext : "";
    };

    // tabstop 대상이 되는 컴포넌트 Sort시 호출된다.
    // form계열은 true여도 자기자신이 tabstop이 아닐수도 있다. (child중에 있는경우)
    _pForm.on_get_prop_tabstop = function ()
    {
        /*
        // 인터페이스 이름과 용도가 이상함. 2013.12.09 neoarc
        if (!this.tabstop)
            return false;
        else
        {
                // 나 자신이 tabstop 대상은 아니지만, 내부로 진입 가능한 상황
                // 내부에 Div가 계속 있는 경우 재귀호출된다.

                // 나 자신을 Sorting 대상에 포함시켜야 내부로 진입할수 있다.
                // 나 자신이 걸러지는 로직은 searchNext/PrevTabFocus API 내부에서 처리.
                    return true;
            //var my_tabstop_childs = this._getSortedDecendants(this);
            //if (my_tabstop_childs && my_tabstop_childs.length > 0)
            //    return true;
        }
        */  //2014.11.12 포커스 구조변경으로 주석처리 예외상황에 대비해 남겨둠- Snare 

        return this.tabstop;
    };


    //===============================================================
    // nexacro.Form : Create & Destroy & Update
    //===============================================================
    _pForm.on_created = function (_window)
    {
        var ret = nexacro.FormBase.prototype.on_created.call(this, _window);

        // Arrange 순환참조
        var comps = this.components;
        for (var i = 0, n = comps.length; i < n; i++)
        {
            var comp = comps[i];
            var control_elem = comp.getElement();
            if (control_elem)
            {
                if (!comp._cross_base)
                {
                    if (comp._based_list && comp._based_list.length > 0)
                    {
                        comp._update_based_position();
                    }
                }
            }
        }
        // form autofit 처리
        // Desktop은 autofit 대상 제외 (항상)
        // autofit 삭제 

        return ret;
    };

    _pForm.on_update_position = function (resize_flag, move_flag)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPosition(this._adjust_left, this._adjust_top);

            if (resize_flag)
            {
                // form의 크기가 바뀌는 시점에 right,bottom 또는 % 좌표를 사용하는 child가 있을경우
                // 정렬 전에 scrollbar가 생길지 여부를 확정할 수가 없다.
                // (nexacro platform의 element는 max offset 값만 관리하기 때문에)
                
                // scrollbar가 생길지의 여부만 판단하기 위해 100% 기준 100% 이하인 값을 빼고
                // 최대 container size를 계산한다.

                // 무조건 리셋할것이 아니고 미리 계산할 방법이 필요하다..
                //control_elem.container_maxwidth = 0;
                //control_elem.container_maxheight = 0;
                var val = this._calcScrollMaxSize();
                control_elem.container_maxwidth = val.w;
                control_elem.container_maxheight = val.h;
            }

            // elem.setElementSize
            //    elem._updateClientSize 를 수행
            //    -> elem._inner_width와 elem.container_maxwidth 등을 통해
            //       스크롤바가 보일지 여부, client size 조절
            //       스크롤바 크기 결정
            //       스크롤 정보 설정
            control_elem.setElementSize(this._adjust_width, this._adjust_height); // <-스크롤 갱신			

            // _updateClientSize
            //    client 크기 갱신 (element기준으로)
            //    child 컴포넌트 move처리 (adjustPosition 수행됨)
            //    _onRecalcScrollSize 호출
            //    -> 내 client 크기
          //  this._updateClientSize(control_elem);

            if (move_flag)
            {
                this.on_fire_onmove(this._adjust_left, this._adjust_top);
            }
            if (resize_flag)
            {
                this.on_fire_onsize(this._adjust_width, this._adjust_height);
            }
        }
    };

    _pForm.on_change_containerRect = function (width, height)
    {
        var _move_scroll = false;
        var comps = this.components;
        if (nexacro._OS == "Android" && this.vscrollbar && this.vscrollbar.visible)
        {
            _move_scroll = true;
            var comp_bottom;
            var comp_scroll_pos;
            var last_comp = this._getLastFocused();
            var form_bottom = this.getOffsetBottom();
        }

        for (var i = 0, n = comps.length; i < n; i++)
        {
            var comp = comps[i];
            var comp_control_elem = comp.getElement();
            if (comp_control_elem)
            {
                if (_move_scroll && comp instanceof nexacro.Edit)
                {
                    comp_bottom = comp.getOffsetBottom();
                    comp_scroll_pos = comp_bottom - form_bottom;
                    if (this.vscrollbar.pos < comp_scroll_pos && form_bottom < comp_bottom && last_comp == comp)
                    {
                        this.vscrollbar.set_pos(comp_scroll_pos);
                    }
                }

                comp.move(comp.left, comp.top, comp.width, comp.height, comp.right, comp.bottom);
                
                
                
            }
        }

        if (this.stepselector)
        {
            this._updateStepControlSize();
        }

        this.resetScroll();
    };

    //===============================================================
    // nexacro.Form : Load
    //===============================================================
    //ie6 에서 cache되어 있는 화면을 가져올때 sync 처럼 동작하는 현상이 있어
    //application의 onload event 후에 form의 onload event를 발생시키기 위해 
    //application에 onload event 후에 호출할 form callbacklist를 달아놓는다.

    _pForm._on_load = function (obj, url)
    {
        if (!this._load_callbacklist) return;

        var parent_foraddcallback = this.parent;
        if (this.parent && this.parent.form == this)
        {
            parent_foraddcallback = _application;  //childframe의 경우만 application에 추가하고 나머지는 parent form에 추가
        }

        if (parent_foraddcallback && parent_foraddcallback._addLoadCallbacklist)
        {
            var pthis = this;
            var ret = parent_foraddcallback._addLoadCallbacklist({ target: pthis, callback: pthis._on_loadcallback, url: this.url });
            if (!ret)
            {
                this._on_loadcallback(obj, url);
            }
        }

    };

    _pForm._addLoadCallbacklist = function (item)
    {
        if (!this._is_loaded && this._url && this._url.length > 0)  //parent가 contents인 경우에 처리 
        {
            if (!this.parent._load_callbacklist)
                this.parent._load_callbacklist = [];
            this._load_callbacklist.push(item);
            return true;
        }
        return false;
    };


    _pForm._on_loadcallback = function (obj, url)
    {
        var callbacklist = this._load_callbacklist;

        var n = callbacklist.length;
        if (n > 0)
        {
            for (var i = 0; i < n; i++)
            {
                var item = callbacklist[i];
                var target = item.target;
                var _url = item.url;
                if (target._is_alive != false)
                    item.callback.call(target, target, _url);
            }
            callbacklist.splice(0, n);
        }

        if (this.binds)
        {
            for (var i = 0; i < this.binds.length; i++)
            {
                this.binds[i].bind();
            }
        }

    	//this.on_fire_oninit(this);
        //if (this._setpropinitfn)
        //{
        //	this._setpropinitfn.call(this, this);
        //	this._setpropinitfn = null;
        //	delete this._setpropinitfn;
        //}        
        this.createComponent(true);

        this.on_fire_oninit(this);

        var _window;
        if (!this._is_created)
        {
            _window = this._getWindow();
            this.on_created(_window);
        }

        var ret = this.on_fire_onload(obj, url);
        // focus와 상관없이 load되는 경우 activate가 되야 함. 
        if (!(this instanceof nexacro.Tabpage))
        {
            this._on_activate();
        }

        // for setfocus
        var parent = this.parent;
        if (parent)
        {
            if (parent._is_frame && parent.form == this)
            {
                // ChildFrame > Form
                parent._createdForm();
                _application._notifyLoadforms(this);
            }
            else
            {  
                if (!_window)
                    _window = this._getRootWindow();

                if (_window && _window.frame && _window.frame._activate == true)
                {
                    var cur_focus_paths = _window.getCurrentFocusPaths();
                    if (cur_focus_paths && nexacro._indexOf(cur_focus_paths, this) > -1)
                    {
                        if (this instanceof nexacro.Tabpage)
                        {
                        this._on_activate();
                        }

                        // TODO API로?
                        if (nexacro._enableaccessibility && nexacro._accessibilitywholereadtype > 1)
                        {
                            // Focus를 Div로 유지
                            this._setFocus();
                            this._playAccessibilityWholeReadLabel("wholeread");
                        }
                        else
                        {
                            // Focus를 Div의 First TabOrder까지 진입
                            this._on_focus(true);
                        }
                    }
                    else if (nexacro._enableaccessibility && nexacro._accessibilitywholereadtype > 1 && this instanceof nexacro.Div)
                    {
                        this._playAccessibilityWholeReadLabel("wholeread");
                    }
                }
            }
        }
        return ret;
    };

    //==============================================================================
    // nexacro.Form : Properties
    //==============================================================================
    _pForm.set_opener = nexacro._emptyFn;

    //_pForm.set_inheritanceid = function (v)
    //{
    //    //To Do
    //};

    _pForm.set_layout = function (v)
    {
        //To Do
    };

    _pForm.set_statustext = function (v)
    {
        if (this.parent && this.parent._is_frame)
        {
            if (this.statustext != v)
            {
                this.statustext = v;
                this.parent._applyStatusText();
            }
        }
    };

    _pForm.set_titletext = function (v)
    {

        //this._setAccessibilityLabel(v);

        if (this.parent && this.parent._is_frame)
        {
            if (this.titletext != v)
            {
                this.titletext = v;
                this.parent._applyTitleText();
            }
        }
    };

    //_pForm.set_classname = function (v)
    //{
    //    return; //cssclass와는 무관하므로 막아야 하나 툴에서 넣어주고 있어 일단 임시로 리턴만 넣겠음.;

    //    if (this.classname != v)
    //    {
    //        this.classname = v;
    //    }
    //};

    //_pForm.set_cachelevel = function (v)
    //{
    //    //To Do
    //};

    //_pForm.set_version = function (v)
    //{
    //    //To Do
    //    ;
    //};

    /*
    none : 동작안함
    vert : 수직방향으로만 동작
    horz : 수평방향으로만 동작
    both : 수직,수평방향으로만 동작
    all  : 수직,수평,대각선 방향 모두 동작 (default)
    */
    _pForm.set_dragscrolltype = function (v)
    {
        var enums = ["none", "vert", "horz", "both", "all"];
        if (this.dragscrolltype != v)
        {
            if (nexacro._indexOf(enums, v) >= 0)
            {
                this.dragscrolltype = v;
            }
            else
            {
                // TODO Error 잘못된 값
            }
        }
    };


    _pForm.on_apply_prop_enable = function (v)
    {
        var comps = this.components;

        for (var i = 0, n = comps.length; i < n; i++)
        {
            var comp = comps[i];            
            comp._setEnable(v);            
        }
    };

    _pForm.set_locale = function (v)
    {
        if (v != this.locale)
        {
            this.locale = v;
            this._locale = v;
            this.on_apply_locale(v);
        }
    };

    _pForm.on_apply_locale = function (v)
    {
        var comp;
        var comps = this.components;
        var len = comps.length;
        for (var i = 0; i < len; i++)
        {
            comp = comps[i];
            if (comp._is_locale_control)
            {
                comp._setLocale(v);
            }
        }
    };

    //===============================================================
    // nexacro.Form : Event Handlers
    //===============================================================

    _pForm.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) // 2013-09-04 pss - eventflow 
    {
        var ret = nexacro.Component.prototype.on_fire_sys_onrbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

        if (nexacro._quickview_mode && ret !== true && this.parent instanceof nexacro.ChildFrame)
        {
			//Edit류는 contextmenu를 띄워야 하기 땜에 quickview메뉴를 띄우지 않도록 수정.
			if(from_refer_comp && !from_refer_comp._input_element)
				return nexacro._showQuickviewMenu(this, screenX, screenY);
        }
        return ret;
    };

    _pForm.on_fire_oninit = function (obj)
    {
        if (this.oninit && this.oninit._has_handlers)
        {
            var evt = new nexacro.Event(obj, "oninit");
            return this.oninit._fireEvent(this, evt);
        }
        return true;
    };

    _pForm.on_fire_canstepchange = function (obj)
    {
        if (this.canstepchange && this.canstepchange._has_handlers)
        {
            var evt = new nexacro.StepChangeEventInfo(obj, "canstepchange", obj._prestepindex, obj._poststepindex);
            return this.canstepchange._fireCheckEvent(this, evt);
        }
    };

    _pForm.on_fire_onstepchanged = function (obj)
    {
        if (this.onstepchanged && this.onstepchanged._has_handlers)
        {
            var evt = new nexacro.StepChangeEventInfo(obj, "onstepchanged", obj._prestepindex, obj._poststepindex);
            return this.onstepchanged._fireEvent(this, evt);
        }
    };

    _pForm.on_fire_canlayoutchange = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight)
    {
        if (this.canlayoutchange && this.canlayoutchange._has_handlers)
        {
            var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
            return this.canlayoutchange._fireCheckEvent(this, evt);
        }
        return true;
    };

    _pForm.on_fire_onlayoutchanged = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight)
    {
        if (this.onlayoutchanged && this.onlayoutchanged._has_handlers)
        {
            var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
            return this.onlayoutchanged._fireEvent(this, evt);
        }
        return true;
    };

    _pForm.on_fire_onbeforelayoutchange = function (obj, eventid, curlayout, newlayout)
    {
        if (this.onbeforelayoutchange && this.onbeforelayoutchange._has_handlers)
        {
            var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayout, newlayout);
            return this.onbeforelayoutchange._fireEvent(this, evt);
        }
        return true;
    };

    _pForm.on_fire_onload = function (obj, url)
    {
        if (this.onload && this.onload._has_handlers)
        {
            this._bFireLoadEvent = true;
            var evt = new nexacro.LoadEventInfo(obj, "onload", url);
            var ret = this.onload._fireEvent(this, evt);
            this._bFireLoadEvent = false;
            evt.destroy();
            evt = null;
            return ret;
        }
        return true;
    };

    _pForm.on_fire_ondevicebuttonup = function (obj, e)
    {
        if (this.ondevicebuttonup && this.ondevicebuttonup._has_handlers)
        {
            var evt = new nexacro.DeviceButtonEventInfo(obj, e);
            return this.ondevicebuttonup._fireEvent(this, evt);
        }
        return true;
    };

    _pForm._on_devicebuttonup = function (e)
    {
        var ret = this.on_fire_ondevicebuttonup(this, e);
        if (!ret && this.parent && this.parent instanceof nexacro.Form)
            return this.parent._on_devicebuttonup(e);
        return ret;
    };

    _pForm.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        if (!this._is_alive)
            return;

        var focusedComp = refer_comp; // 이미 focus가 옮겨갔을 수 있기때문에 refer_comp


        // TODO check Tab,Enter,Esc는 keydown보다 먼저 처리되어야 하는것이 아닌지? (PretranslateMsg)
        if (!focusedComp)
            focusedComp = this.getFocus();
        if (!focusedComp)
            focusedComp = this;
        if (focusedComp)
        {
            // Pass SubControl
            focusedComp = focusedComp._getRootComponent(focusedComp);
        }

        var dlgc = focusedComp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);

        if (keycode == nexacro.Event.KEY_TAB)
        {
            if (dlgc.want_tab == false) // tab을 직접 처리하는 컴포넌트는 제외
            {
                var newfocus_comp;
                if (!shift_key)
                    newfocus_comp = this._searchNextTabFocus(this._last_focused, undefined, undefined, false);
                else
                    newfocus_comp = this._searchPrevTabFocus(this._last_focused, undefined, undefined, false);

                if (newfocus_comp && newfocus_comp[0])
                {
                    if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
                    {
                        var win = this._getWindow();
                        win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
                    }

                    // newfocus_comp가 최종 포커스 받을 대상이 된다.
                    // newfocus_comp가 Container Type인 경우, 내부 컴포넌트가 모두 포커스를 받을 수 없는
                    // 상황이다. 이 경우 더이상 내부로 진입시키면 안된다. -> block_inner_focus = true                   
                    newfocus_comp[0]._setFocus(true, (!shift_key ? 0 : 1), true);
                }
                else if (newfocus_comp && newfocus_comp[2] == -1)
                {
                    var comp = this._last_focused;
                    if (comp) //크롬에서 읽어주지 않아 3번째 파라미터 "notify"를 줌.
                    {
                        comp.getElement().notifyAccessibility(_application.accessibilityfirstovertext);
                    }
                }
                else if (newfocus_comp && newfocus_comp[2] == 1)
                {
                    var comp = this._last_focused;
                    if (comp)
                    {
                        comp.getElement().notifyAccessibility(_application.accessibilitylastovertext);
                    }

                }

                // focus 관리를 Frame Window 단위로 변경함 
                var root_window = this._getRootWindow();
                root_window._keydown_element._event_stop = true;

                return true; // bubble되어 또 호출되면 안됨. 
            }
        }
        else if (keycode == nexacro.Event.KEY_RETURN)
        {
            // Button에 Focus된 경우 Focus된 Button이 클릭되어야 함. 이 동작은 dlgcode로 처리 want_return=true
            if (dlgc.want_return == false)
            {
                if (this instanceof nexacro.Form)
                {
                    // TODO check 팝업 컴포넌트인경우 팝업되어있으면 Defaultbutton보다 우선으로 EnterKey를 받아야함.
                    //            Calendar,Combo,Menu,Grid
                    var is_popup = focusedComp._isPopupVisible(); // 팝업이고 팝업되어있는상태이면
                    if (!is_popup && this._defaultbutton && this._defaultbutton.enableevent && this._defaultbutton._isEnable())
                    {
                        // visible=false는 click제외 대상이 아님 
                        this._defaultbutton.click();
                    }
                }
            }
        }
        else if (keycode == nexacro.Event.KEY_ESC)
        {
            // Transcantion 취소 
            // -> 통신 취소가 되었을때는 EscapeButton을 처리하지 않아야 한다.

            // 현재 Window에 포함된 모든 Form,Div의 Transaction을 중단한다.
            if (nexacro._stopTransaction(this, 1) <= 0 && dlgc.want_escape == false)
            {
                if (this instanceof nexacro.Form)
                {
                    if (this._escapebutton && this._escapebutton.enableevent && this._escapebutton._isEnable())
                        this._escapebutton.click();
                }
            }
        }
        else if (nexacro._enableaccessibility && keycode == nexacro.Event.KEY_DOWN)// && !alt_key && !ctrl_key && !shift_key) // || keycode == nexacro.Event.KEY_UP)
        {
            //****  if (keycode == nexacro.Event.KEY_TAB) 윗부분과 동기화되어야됨
            if (dlgc.want_arrows == false) // tab을 직접 처리하는 컴포넌트는 제외
            {
                var newfocus_comp = this._searchNextTabFocus(this._last_focused, undefined, undefined, true);
                if (newfocus_comp && newfocus_comp[0])
                {
                    if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
                    {
                        var win = this._getWindow();
                        win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
                    }

                    newfocus_comp[0]._setFocus(true, 2, true);
                }
                // focus 관리를 Frame Window 단위로 변경함 
                var root_window = this._getRootWindow();
                root_window._keydown_element._event_stop = true;
                return true; // bubble되어 또 호출되면 안됨. 
            }
        }
        else if (nexacro._enableaccessibility && keycode == nexacro.Event.KEY_UP)// && !alt_key && !ctrl_key && !shift_key)
        {
            if (dlgc.want_arrows == false) // arrow를 직접 처리하는 컴포넌트는 제외
            {
                var newfocus_comp = this._searchPrevTabFocus(this._last_focused, undefined, undefined, true);
                if (newfocus_comp && newfocus_comp[0])
                {
                    if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
                    {
                        var win = this._getWindow();
                        win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
                    }

                    newfocus_comp[0]._setFocus(true, 3, true);
                }
                var root_window = this._getRootWindow();
                root_window._keydown_element._event_stop = true;
                return true; // bubble되어 또 호출되면 안됨. 
            }
        }

        var ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, this, refer_comp);

        // 후처리 해야 하는 항목 임. 상단의 enter, esc, hotkey의 처리는 논의후 처리 예정 
        if (!this.onkeydown || (this.onkeydown && !this.onkeydown.defaultprevented))
        {
            if (keycode == nexacro.Event.KEY_LEFT || keycode == nexacro.Event.KEY_RIGHT)
            {
                if (this.hscrollbar && this.hscrollbar.visible && ctrl_key == true)
                {
                    if (dlgc.want_arrows == false) // arrowkey를 직접 처리하는 컴포넌트는 제외
                    {
                        var line = this.hscrollbar.line;
                        if (line <= 0)
                            line = this.hscrollbar._linedown;
                        if (keycode == nexacro.Event.KEY_LEFT)
                            line *= -1;
                        this.hscrollbar.set_pos(this.hscrollbar.pos + line);
                        return true;
                    }
                }
            }
            else if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN)
            {
                if (this.vscrollbar && this.vscrollbar.visible && ctrl_key == true)
                {
                    if (dlgc.want_arrows == false) // arrowkey를 직접 처리하는 컴포넌트는 제외
                    {
                        var line = this.vscrollbar.line;
                        if (line <= 0)
                            line = this.vscrollbar._linedown;
                        if (keycode == nexacro.Event.KEY_UP)
                            line *= -1;

                        this.vscrollbar.set_pos(this.vscrollbar.pos + line);
                        return true;
                    }
                }
            }
        }

        return ret;
    };

    _pForm._on_activate = function ()
    {
        if (!this.parent)
            return;

        var owner_frame = this.getOwnerFrame();
        if (!owner_frame || !owner_frame._activate)
            return;

        nexacro.FormBase.prototype._on_activate.call(this);
    };

    _pForm._on_deactivate = function ()
    {
        if (!this.parent)
            return;

        var owner_frame = this.getOwnerFrame();
        if (!owner_frame || owner_frame._activate)
            return;

        nexacro.FormBase.prototype._on_deactivate.call(this);
    };

    _pForm.on_vscroll = function (obj, e)
    {
        if (this.onvscroll && this.onvscroll._has_handlers)
        {
            e.fromobject = this;
            this.onvscroll._fireEvent(this, e);
        }
        
            var control_elem = this._control_element;
            if (control_elem)
            {
                control_elem.setElementVScrollPos(e.pos);
            }
        
        return true;
    };

    _pForm.on_hscroll = function (obj, e)
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
        }

        return true;
    };
    //===============================================================
    // nexacro.Form : Methods
    //===============================================================

    _pForm.addChild = function (id, obj)
    {
        var ret = -1;

        if (id && id.length <= 0)
        {
            return -1; 
        }
        if (!obj)
        {
            throw nexacro.MakeReferenceError(this, "reference_not_define", id);
        }

        if (this[id])
        {
            throw nexacro.MakeNativeError(this, "native_exist_id", id);
        }

        if (!obj.parent && !obj._is_created)
        	obj._unique_id = this._unique_id ? (this._unique_id + "." + id) : id;

        var is_component = false;
        if (obj._is_component)
        	is_component = true;

        if (is_component)
			var oldwindow = obj._getWindow();

        obj.parent = this;        
        obj._refform = this;

        if (is_component)
			var newwindow = obj._getWindow();

        this[id] = obj;
        this.all.add_item(id, obj);		           

        if (this.visible && !this._real_visible) obj._real_visible = false;
        else obj._real_visible = this.visible;

        if (is_component)
        {
            ret = this.components.add_item(id, obj);
            this._child_list.push(obj);
            
            if (oldwindow != newwindow)
            {	
            	// todo             		            	
            	// destroy element handle element 
                // 
            }
            else if (obj._is_alive && obj._is_created)
            {
            	this._control_element.appendChildElement(obj.getElement());
            }
            
        }
        else if (obj instanceof nexacro.BindItem)
        {
            ret = this.binds.add_item(id, obj);
        }
        else
        {
            ret = this.objects.add_item(id, obj);
        }
        return ret;
    };

    _pForm.resetScroll = function ()
    {
        this._onRecalcScrollSize();
        this._onResetScrollBar();
    };

    _pForm.close = function (arg)
    {
        // MainForm 만 허용
        if (!this.parent || !this.parent._is_frame)
            return;

        this.setWaitCursor(false, null);

        var childframe = this.parent;

        var confirm_message = childframe._on_beforeclose();
        if (childframe._checkAndConfirmClose(confirm_message) == false)
            return false;

        // OpenWindow인 경우 이미 확인을 마친 상태
        if (childframe._window)
            childframe._window._ignore_close_confirm = true;

        childframe._on_close();

        if (typeof (arg) == "object")
            arg = null;

        if (this.parent) this.parent._closeForm(arg);
    };

    _pForm.getFirstComponent = function (no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var first = this._getTabOrderFirst(false, false);
        if (no_composite_flag)
        {// allow composite component
            if (first._hasContainer())
                return first._getTabOrderFirst(false, false);
        }
        return first;
    };

    _pForm.getLastComponent = function (no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var last = this._getTabOrderLast(false, false);
        if (no_composite_flag)
        {// allow composite component
            if (last._hasContainer())
                return last._getTabOrderLast(false, false);
        }
        return last;
    };

    _pForm.getNextComponent = function (comp, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;
        
        var pThis = comp.parent;
        var next = pThis._getTabOrderNext(comp, 1, false, false);
        if (next == undefined) next = pThis.getFirstComponent(no_composite_flag, false, false);
        if (no_composite_flag) // allow composite component
        {
            pThis = next;
            if (next._hasContainer())
            {
                var next_c = next._getTabOrderNext(comp, 1, false, false);
                if (next_c)
                    return next_c;
                next_c = next._getTabOrderFirst(false, false);
                if (next_c)
                    return next_c;
            }
        }
        return next;
    };

    _pForm.getPrevComponent = function (comp, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var pThis = comp.parent;
        var prev = pThis._getTabOrderNext(comp, -1, false, false);
        if (no_composite_flag) // allow composite component
        {
            pThis = prev;
            if (prev._hasContainer())
            {
                var prev_c = prev._getTabOrderNext(comp, -1, false, false);
                if (prev_c)
                    return prev_c;
                prev_c = prev._getTabOrderLast(false, false);
                if (prev_c)
                    return prev_c;
            }
        }
        return prev;
    };

    //Accessibility 관련 메서드
    _pForm.getFirstAccessibilityComponent = function (no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var first = this._getTabOrderFirst(true, false);
        if (!first._isAccessibilityEnable()) first = this.getNextAccessibilityComponent(first, no_composite_flag);
        if (no_composite_flag)
        {// allow composite component
            if (first._hasContainer())
                return first._getTabOrderFirst(true, false);
        }
        return first;
    };

    _pForm.getLastAccessibilityComponent = function (no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var last = this._getTabOrderLast(true, false);
        if (!last._isAccessibilityEnable()) last = this.getPrevAccessibilityComponent(last, no_composite_flag);
        if (no_composite_flag)
        {// allow composite component
            if (last._hasContainer())
                return last._getTabOrderLast(true,false);
        }
        return last;
    };

    _pForm.getNextAccessibilityComponent = function (comp, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;
        if (comp)
        {
            var pThis = comp.parent;
            var next = pThis._getTabOrderNext(comp, 1, true, false);
            if (next == undefined && !nexacro._enableaccessibility) next = pThis.getFirstComponent(no_composite_flag);
            if (no_composite_flag) // allow composite component
            {
                pThis = next;
                if (next._hasContainer())
                {
                    var next_c = next._getTabOrderNext(comp, 1, true, false);
                    if (next_c)
                        return next_c;
                    next_c = next._getTabOrderFirst(true, false);
                    if (next_c)
                        return next_c;
                }
            }
            return next;
        }
        return undefined;
    };

    _pForm.getPrevAccessibilityComponent = function (comp, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        if (comp)
        {
            var pThis = comp.parent;
            var prev = pThis._getTabOrderNext(comp, -1, true, false);
            if (prev == undefined && !nexacro._enableaccessibility) prev = pThis.getLastComponent(no_composite_flag);
            if (no_composite_flag) // allow composite component
            {
                pThis = prev;
                if (prev._hasContainer())
                {
                    var prev_c = prev._getTabOrderNext(comp, -1, true, false);
                    if (prev_c)
                        return prev_c;
                    prev_c = prev._getTabOrderLast(true, false);
                    if (prev_c)
                        return prev_c;
                }
            }
            return prev;
        }
        return undefined;
    };
    
    _pForm.getNextEditableComponent = function (comp, edittype, no_composite_flag)
    {
        if (no_composite_flag !== true)  no_composite_flag = false;
        if (comp)
        {
            var pThis = comp.parent;
            var next = pThis._getTabOrderNext(comp, 1, false, true, edittype, undefined, no_composite_flag);
            if (next == undefined) next = pThis._getTabOrderNext(comp, 1, false, true, "All", undefined, no_composite_flag);
            if (next == undefined) next = pThis.getFirstEditableComponent(edittype, no_composite_flag);

            return next;
        }
        return undefined;
    };

    _pForm.getPrevEditableComponent = function (comp, edittype, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        if (comp)
        {
            var pThis = comp.parent;
            var prev = pThis._getTabOrderNext(comp, -1, false, true, edittype, undefined, no_composite_flag);
            if (prev == undefined) prev = pThis._getTabOrderNext(comp, -1, false, true, "All", undefined, no_composite_flag);
            if (prev == undefined) prev = pThis.getLastEditableComponent(edittype, no_composite_flag);

            return prev;
        }
        return undefined;
    };

    _pForm.getFirstEditableComponent = function (edittype, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var first = this._getTabOrderFirst(false, true, edittype, no_composite_flag);
        if (!first) first = this._getTabOrderFirst(false, true, "All", no_composite_flag);
        return first;
    };

    _pForm.getLastEditableComponent = function (edittype, no_composite_flag)
    {
        if (no_composite_flag !== true) no_composite_flag = false;

        var last = this._getTabOrderLast(false, true, edittype, no_composite_flag);
        if (!last) last = this._getTabOrderLast(false, true, "All", no_composite_flag);
        return last;
    };

    _pForm._getNextHeadingComponent = function (current)
    {
        var arcomp = this._searchNextHeadingFocus(current);
        if (arcomp)
            return arcomp[0];
    };

    _pForm._getPrevHeadingComponent = function (current)
    {
        var arcomp = this._searchPrevHeadingFocus(current);
        if (arcomp)
            return arcomp[0];
    };

    _pForm.getFocus = function ()
    {
        // TODO check 컴포넌트에서 사용하는곳이 있을지
        //return this._last_focused;

        // TODO Form내 focus를 얻는것이 아니고 Platform전체에서 Focus를 가진 컴포넌트를 리턴해야함.

        var last_focus = this._find_lastFocused();
        if (last_focus == null)
            return this;
        return last_focus;
    };

    _pForm._getZoom = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            return (this._zoomFactor !== undefined) ? this._zoomFactor : control_elem.zoom;
        }

        return 100;
    };

    _pForm._setZoom = function (v)
    {
        var prevZoomFactor = this._getZoom();
        if (typeof v == "string" && v.charAt(v.length - 1) == "%")
            v = v.slice(0, v.length - 1);

        // autofit 처리시 정확히 fit하기 위해 실수값 허용으로 변경
        v = parseFloat(v) | 0;
        if (v <= 0 || v == prevZoomFactor)
            return prevZoomFactor;

        var control_elem = this._control_element;
        if (control_elem)
        {
            // 미리 child 정렬을 위해 값을 보관
            this._zoomFactor = v;
            
            // zoom을 수행하기 전에 zoom될 크기에 맞게 내부 컴포넌트를 재정렬한다.
            control_elem.container_maxwidth = 0;
            control_elem.container_maxheight = 0;
            control_elem.setElementScrollMaxSize(0, 0);
                        
            //this._adjust_width = 0;
            //this._adjust_height = 0;

            this._client_width = 0;
            this._client_height = 0;
         //   this._updateClientSize(control_elem);

            // zoom 및 scroll 정보 갱신
            control_elem.setElementZoom(v);
            nexacro._applyZoomEdge(control_elem, v);

            var popups = nexacro._current_popups;
            var len = popups.length;
            for (var i = 0; i < len; i++)
            {
                if (this._contains(popups[i]))
                    popups[i].parent._applyZoomPopup();
            }
        }

        this.on_fire_onzoom(v, this, this);

        return prevZoomFactor;
    };

    _pForm.go = function (v)
    {
        if (this._url != v)
        {
            if (this._url != "")
            {
                var confirm_message = this._on_beforeclose();
                if (this._checkAndConfirmClose(confirm_message) == false)
                    return;
                this._on_close();
            }

            this._url = v;
            this._base_url = nexacro._getBaseUrl(v);
            this._apply_formurl();
        }
    };

    _pForm.hasPopupFrame = function ()
    {
        var popupframes = nexacro._popupframes;
        var frame;
        for (var i = 0; i < popupframes.length ; i++)
        {
            frame = popupframes[i];
            if (frame && this === frame.opener)
            {
                return true;
            }
        }

        var win = this._getWindow();
        var modalframes = win._modal_frame_stack;
        var modal_info;

        if (modalframes)
        {
            for (var i = 0; i < modalframes.length ; i++)
            {
                modal_info = modalframes[i];
                frame = modal_info[0];
                if (frame && this === frame.opener)
                {
                    return true;
                }
            }
        }

        return false;
    };

    _pForm.insertChild = function (idx, id, obj)
    {
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

        if (!obj.parent && !obj._is_created)
        	obj._unique_id = this._unique_id ? (this._unique_id + "." + id) : id;

        obj.parent = this;
        obj._refform = this;
		
        this[id] = obj;
        this.all.add_item(id, obj);
        if (obj._is_component)
        {
            ret = this.components.insert_item(idx, id, obj);
            this._child_list.push(obj);
        }
        else if (obj instanceof nexacro.BindItem)
        {
            ret = this.binds.insert_item(idx, id, obj);
        }
        else
        {
            ret = this.objects.insert_item(idx, id, obj);
        }

        // addChild는 스크롤을 자동으로 갱신하지 않음.
        // 사용자가 resetScroll을 호출했을때 갱신해야 함.
        // -> RecalcScroll 금지

        return ret;
    };

    _pForm.isValidObject = function (target)
    {
        if (typeof target == "string")
        {
            if (this[target]) return true;
        }
        else if (target instanceof Object)
        {
            var len = this.all.length;
            for (var i = 0; i < len; i++)
                if (this.all[i] == target) return true;
        }
        else
        {
            if (nexacro._indexOf(this.all, target) > -1) return true;
        }
        return false;
    };

    _pForm.killTimer = function (nTimerID)
    {
        this._timerManager.deleteTimer(nTimerID);
    };

    _pForm.setTimer = function (nTimerID, nElapse)
    {
        var timer = new nexacro._EventTimer(this, nTimerID, nElapse);
        timer.start();
    };

    _pForm.loadStyle = function (url, bclear)
    {
        if ((typeof (url) != "string") || url.length == 0)
        {
            return;
        }
        bclear = bclear == false ? false : true;
        var exceptcssselector = true;
        
        if (bclear)
        {
            exceptcssselector = false;
        }

        this._clearCssInfo(exceptcssselector);
            
        var base_url = this._base_url;
        var cssurl = [];
        cssurl.push(nexacro._getServiceLocation(url, base_url));
        cssurl.push(".js");
           
        var service = nexacro._getServiceObject(url);
        this._load_manager.reloadCssModule(cssurl.join(""), null, false, service);
        
        this._apply_formstyle(this);
    };

    _pForm.reload = function ()
    {
        var _win = this._getRootWindow();
        _win._removeFromCurrentFocusPath(this._last_focused, true);

        //이전 component의 focus를 가지면 안됨.
        var _win = this._getWindow();
        _win.clearCurrentFocusPaths();

        this._last_focused = null;

        // TODO check; Reload할때도 beforeclose,close 이벤트가 나가야 하나? 

        this._url = this.parent._formurl;
        this._base_url = nexacro._getBaseUrl(this._url);
        this._apply_formurl();
    };

    _pForm.removeChild = function (id)
    {
        if (!id || id.length <= 0)
        {
            return null;
        }
        if (!this[id])
        {
            return null;
        }
        var obj = this[id];

        if (obj._is_component)
        {
            var is_focused = false;
            var _window = this._getWindow();
            if (_window)
                is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
                        
            // TODO check DefaultButton remove시 null 처리. 9.2확인 필요
            if (this._defaultbutton == obj)
                this._defaultbutton = null;
            if (this._escapebutton == obj)
                this._escapebutton = null;

            if (this._is_alive && obj._control_element)
            {
                obj._control_element._removeFromContainer();
            }

            if (this._bind_manager)
            this._bind_manager._dettachSBindItem(obj);

            this.components.delete_item(id);
            var cidx = nexacro._indexOf(this._child_list, obj);
            if (cidx > -1)
            {                
                this._child_list.splice(cidx, 1);
            }

            if (is_focused && this._is_alive)
            {
                if (obj instanceof nexacro.Form)
                {
                    // deactivate 처리
                    obj._on_deactivate();
                }

                // Focus된 컴포넌트가 사라지는 Case처리 
                _window._removeFromCurrentFocusPath(obj, true);
                _window._last_focused_elem = this._control_element;

                // Visible/Enable AutoFocus
                this._on_focus(true);
            }
        }
        else if (obj instanceof nexacro.BindItem)
        {
            this._bind_manager._setBinditem(obj, true);
            this.binds.delete_item(id);
        }
        else
        {
            this.objects.delete_item(id);
        }

        //obj._window = null;
        obj.parent = null;
        delete this[id];
        this.all.delete_item(id);
 
        return obj;
    };

    _pForm.setWaitCursor = function (wait_flag, forcely_flag)
    {
        var wait = wait_flag;
        var forcely = forcely_flag;
        if (wait == undefined) wait = true;
        if (forcely == undefined) forcely = false;

        if (!forcely && !nexacro._usewaitcursor) return;

        var window = this._getWindow();
        window._cancelEvent();
        this._waitCursor(wait, null); // not communication -> Context=null
    };

    _pForm.sleep = function (nMilliseconds)
    {
        var then = new Date().getTime();
        var now = then;

        while ((now - then) < nMilliseconds)
        {
            now = new Date().getTime();
        }
    };

    _pForm.transaction = function (id, url, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress)
    {
    	var realurl = nexacro._getServiceLocation(url, this._base_url);
    	var service = nexacro._getServiceObject(url, true);
        var window = this._getWindow();
        window._cancelEvent();
        this._load_manager.loadDataModule(realurl, id, inDatasetsParam, outDatasetsParam, argsParam, callbackFn, isAsync, datatype, isCompress, service);
    };

    _pForm.cancelTransaction = function (id)
    {
        if (!this._load_manager)
            return -1;
        var datalist = this._load_manager.dataList;
        if (!datalist)
            return -1;
        var canceledCnt = 0;

        if (id != undefined)
        {
            var datalistid = (typeof id == "string") ? id.split(",") : id;
            if (datalistid.length > 0)
            {
                var datalistfilter = [];
                for (var k = 0; k < datalist.length; k++)
                {
                    datalistfilter[k] = datalist[k].url;
                }

                var datalistfiltered = [];
                for (var j = 0; datalistfilter.length > j; j++)
                {
                    var datalistfound = false;
                    for (var i = 0; datalistid.length > i; i++)
                        if (datalistid[i] == datalistfilter[j])
                        {
                            datalistfound = true;
                            break;
                        }
                    if (!datalistfound)
                    {
                        datalistfiltered.push(datalistfilter[j]);
                    }
                }

                for (var j = datalistfiltered.length - 1; j >= 0; j--)
                {
                    for (var i = datalist.length - 1; i >= 0; i--)
                    {
                        if (datalist[i].url == datalistfiltered[j])
                        {
                            datalist = nexacro._removedatalist(datalist, i);
                        }
                    }
                }
            }
        }
       
        this._stopTransaction(true);
    };

    _pForm.updateWindow = function ()
    {
        // To Do
    };

    _pForm.getStepCount = function ()
    {
        var step_ctrl = this.stepselector;
        if (step_ctrl)
        {
            return step_ctrl.stepcount;
        }

        return 0;
    };

    _pForm.setStepIndex = function (index)
    {
        var step_ctrl = this.stepselector;
        if (step_ctrl)
        {
            return step_ctrl.set_stepindex(index);
        }

        return false;
    };

    _pForm.getStepIndex = function (index)
    {
    	var step_ctrl = this.stepselector;
    	if (step_ctrl)
    	{
    		return step_ctrl.stepindex;
    	}

    	return -1;
    };

    _pForm.applyChange = function ()
    {
        // TODO getFocus로 가져와야 하는게 아닌지? 
        var comp = this._last_focused;
        if (!comp)
            return;
        comp.applyto_bindSource("value", comp.value);

        // BindManager.exception 처리되었기때문에 따로 Notify 한다.
        var binds = this.binds;
        var len = binds.length;
        for (var i = 0; i < len; i++)
        {
            var bind_item = binds[i];
            if (bind_item._comp == comp && bind_item.propid == "value")
            {
                this._bind_manager._notify(bind_item);
                return;
            }
        }
    };

    //===============================================================
    // nexacro.Form : Logical Part
    //===============================================================
    _pForm._setFormPosition = function (left, top, width, height)
    {        
        this._init_width = width;
        this._init_height = height;
    };

    // 새로 만듬 2013.02.06 neoarc. right,bottom은 이격값이 아닌 절대좌표임.
    _pForm._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction)
    {
        if (this._is_frame || !this._control_element)
            return;

        // 1. right,bottom을 보이게 하는 것이 최우선
        // 2. right,bottom이 보일경우 left,top을 보이도록한다.
        //    -> 이때 right,bottom이 가려져선 안된다.
        var hscroll = this.hscrollbar;
        var vscroll = this.vscrollbar;

        var client_width, client_height;
        client_width = this._control_element.client_width;
        client_height = this._control_element.client_height;

        var hpos = 0;
        var vpos = 0;

        if (hscroll && hscroll.visible)
        {
            hpos = hscroll.pos;
            
            if (left - hpos < client_width && right - hpos > client_width)
            {
                // Left는 보이고 Right는 Form 밖인 경우
                if (focus_direction == 1 && right - left > client_width)
                hscroll.set_pos(right - client_width);
                else
                    hscroll.set_pos(left);
            }
            else if (hpos > left)
            {
                // Left가 Form의 왼쪽을 넘어간 경우
                // Right가 가려지지 않을 정도만 스크롤한다.

                //tabkey 로 들어오는 경우 left 기준
                //shifttabkey로 들어오는 경우 right 기준
                if (focus_direction == 1 && right - left > client_width)                    
                    hscroll.set_pos(right - client_width);
                else
                    hscroll.set_pos(left);
            }
            else if (left - hpos > client_width)
            {
                // Left가 Form의 오른쪽을 넘어간 경우
                if (focus_direction == 1 && right - left > client_width)
                hscroll.set_pos(right - client_width);
                else
                    hscroll.set_pos(left);                    
            }
            hpos = hscroll.pos;
        }

        if (vscroll && vscroll.visible)
        {
            vpos = vscroll.pos;
            if (top - vpos < client_height && bottom - vpos > client_height)
            {
                // Top은 보이고 Bottom이 Form 밖인 경우
                if (focus_direction == 1 && bottom - top > client_height)
                vscroll.set_pos(bottom - client_height);
                else
                    vscroll.set_pos(top);
            }
            else if (vpos > top)
            {
                // Top이 Form의 위를 넘어간 경우
                // Bottom이 가려지지 않을 정도만 스크롤한다.
                if (focus_direction == 1 && bottom - top > client_height)
                    vscroll.set_pos(bottom - client_height);
                else
                    vscroll.set_pos(top);
            }
            else if (top - vpos > client_height)
            {
                // Top이 Form의 아래를 넘어간 경우
                if (focus_direction == 1 && bottom - top > client_height)
                vscroll.set_pos(bottom - client_height);
                else
                    vscroll.set_pos(top);
            }
            vpos = vscroll.pos;
        }

        // 나 기준에서 보일만큼 땡겼지만 내 부모에 의해 안보일수 있음.
        // 내 기준 좌표로 변환해서 상위로 올림.
        left = this._adjust_left + left - hpos;
        top = this._adjust_top + top - vpos;
        right = this._adjust_left + right - hpos;
        bottom = this._adjust_top + bottom - vpos;

        if (!this._is_popup_control && this.parent && this.parent != this)
        {
            this.parent._resetScrollPos(this, left, top, right, bottom, focus_direction);
        }
    };



    _pForm._setDragMove = function (v, is_windowframe)
    {
        this._is_track = v;
        if (v && is_windowframe)
            this._hittest_type = "caption";
        else
            this._hittest_type = "none";

		this.on_apply_hittesttype(this._hittest_type);        
    };

    _pForm._on_starttrack = function ()
    {
        if (!this._is_alive) return;
        var ownerframe = this.getOwnerFrame();
        if (ownerframe)
            ownerframe._on_titlebar_starttrack();
    };

    _pForm._on_endtrack = function (x, y, dragdata)
    {
        if (!this._is_alive) return;
        var ownerframe = this.getOwnerFrame();
        if (ownerframe)
            ownerframe._on_titlebar_endtrack(x, y, dragdata);
    };

    _pForm._on_movetrack = function (x, y, dragdata, windowX, windowY)
    {
        if (!this._is_alive) return;
        var ownerframe = this.getOwnerFrame();
        if (ownerframe)
            ownerframe._on_titlebar_movetrack(x, y, dragdata, windowX, windowY);
    };

    _pForm._setSize = function (width, height)
    {
        var control_elem = this.getElement();
        var w = this._adjust_width;
        var h = this._adjust_height;
        var left = this._adjust_left;
        var top = this._adjust_top;

        if (w != width || h != height)
        {
            this.width = this._adjust_width = width;
            this.height = this._adjust_height = height;

            if (this.parent)
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._getClientWidth(), this.parent._getClientHeight());
            else
                this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);

            // max scroll은 child comp에 의해 결정되어야 함
            /*
            if (control_elem)
                control_elem.setElementScrollMaxSize(width, height);
            */

            //this.on_update_position(true, false);

            // form 자신의 layout change 발생
            if (this._layout_list && this._layout_list.length > 0)
            {
                var layout = this._checkValidLayout();
                if (layout)
                {
                    control_elem = layout._form.getElement();
                    if (control_elem)
                    {
                        control_elem.setElementSize(width, height);
                      //  this._updateClientSize(control_elem);
                    }
                }
            }

            // client 크기 갱신
            // child component 이동 (div layout change 발생)
            this.on_update_position(true, false);
        }
    };
        
    // is_cancel    - true:  canceltransaction에서 호출 될때 
    //               - false: esc에 의한 호출
    _pForm._stopTransaction = function (is_cancel)
    {
        if (!this._load_manager)
            return -1;
        var datalist = this._load_manager.dataList;
        if (!datalist)
            return -1;

        var trlist = this._load_manager.transactionList;
        var idx = 0;
        var pre_len = datalist.length;
        var canceledCnt = 0;
        var tritem;
        while (idx < datalist.length)
        {
            var dataitem = datalist[idx];
            if (!dataitem)
            {
                idx++;
                continue;
            }

            var dataitem_handle = dataitem.handle;
            if (!dataitem_handle)
            {
                idx++;
                continue;
            }

            if (dataitem._is_cancel || dataitem._is_process)
            {
                idx++;
                pre_len = datalist.length;
                continue;
            }

            if (!is_cancel)
            {
                dataitem_handle._user_aborted = false;
                tritem = trlist[idx];
                if (tritem)
                {
                    var ret = tritem.on_error(-1, "comm_stop_transaction_byesc", nexacro._communicationStatusTable["stop"], "");
                    if (ret)
                    {
                        dataitem._is_process = true;
                        dataitem_handle._user_aborted = undefined;
                        idx++;
                        continue;
                    }
                }
            }

            dataitem_handle._user_aborted = true;
            dataitem._is_cancel = true;


            if (nexacro._Browser == "Runtime")
            {
                nexacro._cancelLoad(dataitem_handle);
            }
            else
            {
                // 일반 브라우저에서 정상적으로 cancelLoad가 되면 두번째 on_error에서 아무런 동작안함.
                // 강제로 on_error을 호출 이유? transaction주소 잘못준경우 waitcursor가 계속 떠있음.
                // 일부 브라우저의 특정상황에서 cancelLoad에서 처리 못하는 경우있음
                // (abort()호출하면 callback함수 수행이 안됨)
                tritem = trlist[idx];
                nexacro._cancelLoad(dataitem_handle);
                if (tritem)
                    tritem.on_error(0, "comm_cancel_byuser");
                dataitem_handle = null;
                dataitem = null;
            }

            canceledCnt++;

            if (pre_len == datalist.length)
                idx++;
            else
            {
                idx = 0;
                pre_len = datalist.length;
            }
        }


        return canceledCnt;
    };

    _pForm._onRecalcScrollSize = function (fromComp)
    {
        var control_elem = this._control_element;
        if (this._is_scrollable && control_elem)
        {
            var w = 0, h = 0;
            var container_width = control_elem.getContainerElement(control_elem._step_index).width;;
            var container_height = control_elem.getContainerElement(control_elem._step_index).height;;

            var container_maxwidth = control_elem.container_maxwidth;
            var container_maxheight = control_elem.container_maxheight;
            var zoom_factor = this._getZoom() / 100;

            container_width = container_width / zoom_factor;
            container_height = container_height / zoom_factor;

            container_maxwidth = container_maxwidth / zoom_factor;
            container_maxheight = container_maxheight / zoom_factor;

            if (!fromComp)
            {
                var comps = this.components;

                if (this.stepselector)
                {
                    var cur_stepindex = this.stepselector.stepindex;
                    for (var i = 0, n = comps.length; i < n; i++)
                    {
                        var comp = comps[i];
                        if (comp && comp.visible && comp.positionstep == cur_stepindex)
                        {
                            //var offsetright = comp.getOffsetRight();
                            var offsetbottom = comp.getOffsetBottom();

                            //w = Math.max(w, offsetright);
                            h = Math.max(h, offsetbottom);
                        }
                    }
                    w = this.width * this.stepselector._poststepcount;
                }
                else
                {
                    for (var i = 0, n = comps.length; i < n; i++)
                    {
                        var comp = comps[i];
                        if (comp && comp.visible)
                        {
                            var offsetright = comp.getOffsetRight();
                            var offsetbottom = comp.getOffsetBottom();

                            w = Math.max(w, offsetright);
                            h = Math.max(h, offsetbottom);
                        }
                    }
                }

                if (container_width || container_height)
                {
                    if (container_width <= -1)
                        w = -1;
                   
                    if (container_height <= -1)
                        h = -1;
                }

                w = Math.max(w, container_width);
                h = Math.max(h, container_height);
                
                control_elem.setElementScrollMaxSize(w, h);
                
            }
            else if (fromComp.visible)
            {
                var offsetRight = fromComp.getOffsetRight();
                var offsetBottom = fromComp.getOffsetBottom();

                if (container_maxwidth < offsetRight || container_maxheight < offsetBottom)
                {
                    w = Math.max(container_maxwidth, offsetRight);
                    h = Math.max(container_maxheight, offsetBottom);
                    control_elem.setElementScrollMaxSize(w, h);
                }
            }
        }
    };

    // right,bottom 또는 % 좌표를 갖는 child를 제외하고 확실한 좌표값을 갖는
    _pForm._calcScrollMaxSize = function ()
    {
        var control_elem = this._control_element;
        if (this._is_scrollable && control_elem)
        {
            var _w = 0, _h = 0;
            var comps = this.components;
            for (var i = 0, n = comps.length; i < n; i++)
            {
                var comp = comps[i];
                if (comp && comp.visible)
                {
                    var offsets = comp._getFixedOffsetValue();
                    _w = Math.max(_w, offsets.right);
                    _h = Math.max(_h, offsets.bottom);
                }
            }

            return { w: _w, h: _h };
        }
        return { w: -1, h: -1 };
    };

    _pForm._dragEnd = function (info)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var stepselector = this.stepselector;
            if (stepselector)
            {
                var step_count = control_elem._step_count;
                var step_index = control_elem._step_index;
                var direction = info.direction;
                if (step_count > 0)
                {
                    var new_index = -1;
                    if (direction == "L")
                    {
                        new_index = step_index + 1;
                    }
                    else if (direction == "R")
                    {
                        new_index = step_index - 1;
                    }
                    if (new_index < 0 || new_index >= step_count)
                    {
                        return;
                    }
                    stepselector.set_stepindex(new_index);
                }
            }
        }
    };

    _pForm._getDefaultButton = function ()
    {
        var comps = this.components;
        if (comps)
        {
            var comp;
            for (var i = 0; i < comps.length; i++)
            {
                comp = comps[i];
                if (comp._is_form)
                {
                    var btn = comp._getDefaultButton();
                    if (btn) return btn;
                }
                else if (nexacro._toBoolean(comp.defaultbutton))
                {
                    return comp;
                }
            }
        }
        return null;
    };

    _pForm._getEscapeButton = function ()
    {
        var comps = this.components;
        if (comps)
        {
            var comp;
            for (var i = 0; i < comps.length; i++)
            {
                comp = comps[i];
                if (comp._is_form)
                {
                    var btn = comp._getEscapeButton();
                    if (btn) return btn;
                }
                else if (nexacro._toBoolean(comp.escapebutton))
                {
                    return comp;
                }
            }
        }
        return null;
    };    

    // __applyers
    _pForm._apply_formurl = function ()
    {
        this._clear();
        if (this._url)
        {
            this.loadForm(this._url, true, true);
            this.set_visible(true);
        }
    };

    _pForm._apply_formstyle = function (obj)
    {
        for (var i = 0; i < obj.components.length; i++)
        {
            var comp = obj.components[i];
            if (comp)
            {
                if (comp._is_form)
                {
                    comp._apply_status("");
                    this._apply_formstyle(comp);
                }
                else
                {
                    comp._apply_status("");
                }
            }
        }
        this._apply_status("");
    };


    _pForm._apply_stepcount = function ()
    {
     //   trace("_pForm._apply_stepcount");

        var stepselector = this.stepselector;

        if (stepselector)
        {
            this._on_prepare_stepcontents(stepselector._prestepcount, stepselector._prestepindex, stepselector.stepcount, stepselector.stepindex);
            this._on_refresh_stepcontents(stepselector._prestepcount, stepselector._prestepindex, stepselector.stepcount, stepselector.stepindex);
        }
    };

    _pForm._getAccessibilityWholeReadLabel = function ()
    {
        var readlabel = "";
        var ar = this._getSortedDecendants(this, true, true);
        for (var i = 0; i < ar.length; i++)
        {
            comp = ar[i];
            if (comp._isAccessibilityEnable())
            {
                var label = comp._getAccessibilityReadLabel(true);
                if (label)
                {
                    label.trim();
                    if (label && label.length > 0)
                        readlabel += label + " ";
                }
            }
        }
        return readlabel;
    };

    _pForm._playAccessibilityWholeReadLabel = function (type)
    {
        var control = this.getElement();
        if (control)
        {
        var label = this._getAccessibilityWholeReadLabel();
        control.notifyAccessibility(label, type);
        }

    };

    delete _pForm;
}

