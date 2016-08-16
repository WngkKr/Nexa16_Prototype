//==============================================================================
//  © 2014 TOBESOFT CO., LTD. All rights reserved. 
//  www.tobesoft.com/copyright.txt
//==============================================================================

if (!nexacro.DesignForm)
{
    //==============================================================================	
    // nexacro.DesignForm_Style 	
    //==============================================================================	
    nexacro.isDesignMode = true;

    //==============================================================================	
    // overriding	
    //==============================================================================	
    nexacro._getImageLocation = function (str, baseurl)
    {    	
		var url = str;
    	return nexacro._getImageServiceLocation(url, baseurl);
    };

    nexacro._getImageServiceLocation = function (url, baseurl, typedefinition_url)
    {    	
        if (url.indexOf("::") < 0)
        {
            if (!typedefinition_url)
                typedefinition_url = nexacro._typedefinition_url;

            if (!baseurl)
                baseurl = nexacro._project_url;

            return nexacro._transurl(baseurl, typedefinition_url, url);            
        }
        else
        {
            // Prefix 경로는 Design Time에서 xadl 기준으로..
            return nexacro.__getServiceLocation(url);
        }
    };

  //  if (!_global_context._application)
	//	_global_context._application = nexacro.Application;
    ///nexacro._loadADL = function (project_path)
    //{
    //	var application = _global_context._application = nexacro.Application;
    //	application.init();
    //	var env = nexacro.getEnvironment();
    //	env._load(project_path);  // 이때 xadl 값은 설정되어 있어야 한다. 

    //	trace("nexacro._loadADL")

    //	trace("nexacro._loadADL2")
    //	//var application = nexacro.getApplication();
    //	//if (application)
    //	application._load(env.key, env._request_mainurl);
    //	//application._load(env, project_path);
    //	trace("nexacro._loadADL3:" + env._request_mainurl);
    //	//application 의 locale 
    //};

    if (nexacro.FormBase)
    {
        var _pFormBase = nexacro.FormBase.prototype;
        _pFormBase.loadForm = function (formurl, async, reload, baseurl)
        {
            if (this._load_manager)
            {
                var url = nexacro._getFDLLocation(formurl, baseurl);
                
                var parent = this.parent;
                while (parent && !parent._is_frame)
                {
                    if (parent._is_form)
                    {
                        var _p_url = parent._url;
                        if (url == _p_url)
                        {
                            trace("[ERROR] can not use same url with parent form");
                            return;
                            //throw nexacro.MakeURIError(this, "native_load_parent", formurl);
                        }
                    }
                    parent = parent.parent;
                }
                
                this._url = url;
                this._base_url = nexacro._getBaseUrl(url);

                if (this._load_manager)
                    this._load_manager.clearAllLoad();

                this._clearUserFunctions();

                this._is_loading = true;
                if (this.parent._is_frame && this.parent.form == this)
                {
                    // ChildFrame > Form   
                    _application._registerLoadforms(this);
                }
            
                var service = nexacro._getServiceObject(formurl);
                service.cachelevel = "none"; //lym 16.06.15 : designform에선 form을 load할 시 cache를 사용하지 않음
                async = false; //lym 16.06.15 : designform에선 form을 sync로만 동작
                var ret = this._load_manager.loadMainModule(url, undefined, async, reload, service);
            }
        }    
        _pFormBase.registerScript = nexacro._emptyFn;
        delete _pFormBase;
    };

    if (nexacro.Form)
    {
        var _pForm = nexacro.Form.prototype;
        _pForm.set_titletext = function (v)
        {

            this._setAccessibilityLabel(v);

            //if (this.parent && this.parent._is_frame)
            {
                if (this.titletext != v)
                {
                    this.titletext = v;
                    //this.parent._applyTitleText();
                }
            }
        };            
        delete _pForm;
    }


    if (nexacro.InputElement)
    {
        var _pInputElement = nexacro.InputElement.prototype;

        _pInputElement.setElementFocus = function ()
        {
        };
        delete _pInputElement;
    };

    if (nexacro._LoadManager)
    {
        var __pLoadManager = nexacro._LoadManager.prototype;
        if (__pLoadManager)
        {
            __pLoadManager.on_load_main = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri)
            {
                if (url == this.main_url)
                {
                    this.status = 2;
                    this._main_handle = null;
                    this._is_mainloaded = false;
                    if (errstatus == 0 && module && typeof (module) == "function")
                    {
                        module.call(this.context);

                        // div url load success
                        var obj = this.context;
                        if (obj instanceof nexacro._InnerForm)
                        {
                            var win = obj._getWindow();
                            var frame = obj.getOwnerFrame();
                            if (frame.form instanceof nexacro.DesignForm)
                            {
                                var designform = frame.form;                            
                                var extra_info = designform._getScopeName(obj);

                                nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_div_urlload, designform.id, extra_info);
                            }
                         }
                    }
                    else
                    {
                        // adl 
                        if (this.context == _application)
                        {
                            nexacro._onHttpSystemError(this.context, true, this.context, "0x80010006", url, returncode, requesturi, locationuri);
                            return;
                        }
                        else
                        {
                    	    if (this.context)
                    		    this.context._onHttpSystemError(this.context, true, this.context, fireerrorcode, url, returncode, requesturi, locationuri);

                        	nexacro._onHttpSystemError(this.context, true, this.context, fireerrorcode, url, returncode, requesturi, locationuri);
    
                            // div url load fail
                            var obj = this.context;
                            if (obj instanceof nexacro._InnerForm)
                            {
                                var win = obj._getWindow();
                                var frame = obj.getOwnerFrame();
                                if (frame.form instanceof nexacro.DesignForm)
                                {
                                    var designform = frame.form;
                                
                                    var parent = obj.parent;
                                    var extra_info = designform._getScopeName(parent);

                                    nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_div_httperror, designform.id, extra_info);
                                }
                            }
                        }
                    }
                    this._is_mainloaded = true;
                    this._check_fire_oninit();
                }
            }
        }
        delete __pLoadManager;
    };
    
    nexacro.__refreshDirtyWindow = function (_win_handle)
    {
    	var win_handle = _win_handle;
    	if (!win_handle)
    	{
    		win_handle = nexacro._getMainWindowHandle();
    	}
    	nexacro.__refreshDirtyRectWithCallBack(win_handle, nexacro._drawWindowCallBack);
    };

    nexacro._drawWindowCallBack = function (win_handle)
    {
    	if (win_handle)
    	{
    		nexacro.__finishDrawDesignWindow(win_handle);
    	}
    };

	//designmode 에서도 pluginmode = true 로 동작함 
	//
    nexacro._appliedTitleBarHeight = function (frame, h)
    {
    	return h;
    };

    nexacro._appliedStatusBarHeight = function (frame, h)
    {    
    	return h;
    };

    nexacro._setImageItemCache = function (url, width, height)
    {    	
    	var imageurl = nexacro._getImageLocation(url);
    	var imgcache = nexacro._getImageCacheMaps();
    	if (imageurl && imgcache)
    		imgcache[imageurl] = { "width": width, "height": height };
    };

    nexacro._clearImageItemCache = function (url)
    {
    	var imageurl = nexacro._getImageLocation(url);
    	var imgcache = nexacro._getImageCacheMaps();
    	if (imageurl && imgcache && imgcache[imageurl])
    	{
    		imgcache[imageurl] = null;
    		delete imgcache[imageurl];
    	}
    };

    nexacro._clearImageCache = function ()
    {
    	nexacro._ImgInfoCacheList = {};
    };

	//var mapdata = 'nexacro._setCSSMaps ({MainFrame: {self:{enabled :{border1 : nexacro.BorderObject("3px solid #666666"),color : nexacro.ColorObject("#444444")},deactivate :{border : nexacro.BorderObject("2px solid #235798")}}}})';
    //eval(mapdata);
    nexacro._CSSMapStringtoJson = function(mapdata)
    {
    	eval(mapdata);
    }

    //nexacro._updateCSSMapItem("MainFrame1, self1, enable", "border", 'nexacro.BorderObject("4px solid #666666")');
    nexacro._updateCSSMapItem = function (parent, prop, value)
    {
    	var valueobject = eval(value);
    	var cssmap = nexacro._dimension_maps;

    	var parents = parent.split(",");
    	var parentlen = parents.length;
    	var item = parents[0];

    	//add 
    	if (!cssmap[item])
    	{
    		for (var i = 0; i < parentlen; i++)
    		{
    			var item = parents[i];
    			var childitem = parents[i + 1];
    			if (childitem)
    			{
    				cssmap[item] = {};
    				cssmap[item][childitem] = {};
    				cssmap = cssmap[item];
    			}
    			else
    			{
    				cssmap[item][prop] = valueobject;
    			}
    		}
    	}
    	else  //update
    	{
    		for (var i = 0; i < parentlen; i++)
    		{
    			var item = parents[i];
    			var childitem = parents[i + 1];
    			if (cssmap[item])
    			{
    				if (cssmap[item][childitem])
    					cssmap = cssmap[item];
    				else
    				{
    					if (childitem)
    					{
    						cssmap[item][childitem] = {};
    						cssmap = cssmap[item];
    					}
    					else
    					{
    						cssmap[item][prop] = valueobject;
    					}
    				}
    			}
    			else
    			{
    				cssmap[item][prop] = valueobject;
    			}
    		}
    	}
    };

	//prop 이 없으면 parentnode 를 delete 
	//prop이 있으면  leaf node의 prop만 delete 
    nexacro._deleteCSSMapItem = function (parent, prop)
    {
    	var cssmap = nexacro._dimension_maps;

    	var parents = parent.split(",");
    	var parentlen = parents.length;
    	var item = parents[0];
    	item = item.trim();
    	//add 
    	if (!cssmap[item])
    		return;

    	for (var i = 0; i < parentlen; i++)
    	{
    		var item = parents[i];
    		item = item.trim();
    		if (cssmap[item])
    		{
				if (i == parentlen-1)
				{
					if (prop)
					{
						cssmap[item][prop] = null;
						delete cssmap[item][prop];
					}
					else 
					{
						cssmap[item] = null;
						delete cssmap[item];
					}
				}

    			cssmap = cssmap[item];    			
    		}
    	}    	
    };


    // notify types
    nexacro._design_notify_layoutchange = 1;
    nexacro._design_notify_div_urlload = 2;
    nexacro._design_notify_div_httperror = 3;
    nexacro._design_notify_refresh_properties = 4;

    // styles
    nexacro._design_sublayout_overlaycolor = nexacro.BackgroundObject("rgba(0,0,0,0.4)", this);

    // theme caching
    nexacro._design_css_cache = new nexacro.Collection();
    nexacro._design_themeid_map = new nexacro.Collection();

    //=====================================================================================
    // Design Utility API
    //=====================================================================================

    //--------------------------------------------
    // for Design Multi Theme
    //--------------------------------------------

    // 이미 로딩된 css_context를 얻음. 
    nexacro._getDesignCssContext = function (url)
    {
        // TODO url을 상대경로로 할지 절대경로로 할지, 둘다 보관해야 할지
        if (!_application._css_context_cache)
            return null;

        var ar = _application._css_context_cache;
        var css_context = ar.get_item(url);

        return css_context;
    };

    // 새로 로딩된 css_context를 cache함.
    nexacro._addDesignCssContext = function (context)
    {
        if (!_application._css_context_cache)
            _application._css_context_cache = new nexacro.Collection();

        // 이미 있으면?

        var ar = _application._css_context_cache;
        ar.add_item(context._url, context);
    };

    // 로딩됐던 css_context를 cache에서 삭제함.
    nexacro._removeDesignCssContext = function (url)
    {
        var a = _application;
        if (!_application._css_context_cache)
            return;

        _application._css_context_cache.delete_item(url);
    };

    // 특정 css 파일이 갱신된 경우 호출됨.
    // context cache에서 제거하고 다시 로드
    nexacro._updateDesignCssContext = function (cssurl)
    {
        nexacro._removeDesignCssContext(cssurl);

        // TODO check LoadManager의 캐쉬는 사용하지 않음.
        _application._load_manager.localList = [];
        _application._load_manager.localCnt = 0;

        var css_context = new nexacro.DesignCssContext(cssurl);

        if (cssurl.indexOf(".xtheme") > 0)
            nexacro._loadTheme2(cssurl, css_context);
        else
        {
            // lym
            //nexacro._loadCss2(cssurl, css_context);
        }

        nexacro._addDesignCssContext(css_context);
        return css_context;
    };

    // cs 파일을 로딩한다. _application loadManager를 사용.
    /* // lym 
    nexacro._loadCss2 = function (url, context)
    {
        var cssurl = _application._getServiceLocation(url) + ".js";
        var service = _application._getServiceObject(url);
        var _load_manager = _application._load_manager;

        //this._load_manager.loadCssModule(cssurl.join(""), null, null, service);

        // 일단 LoadManager는 캐쉬 하지 않도록함.
        //var load_item = _load_manager.getLocalItem(url);
        var load_item;
        if (!load_item)
        {
            load_item = new nexacro.LoadItem(cssurl, "css", context);
            load_item._context = context;

            _load_manager.localList.push(load_item);
            _load_manager.localCnt++;

            var cur_cachelevel = service.cachelevel;
            service.cachelevel = "none";
            load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, nexacro._on_load_cssmodule2, false, service, false);
            service.cachelevel = cur_cachelevel;
        }
    };
	*/

    // 로드된 css파일을 context에 반영 (DesignCssContext 일것임)
    nexacro._on_load_cssmodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri)
    {
        var _load_manager = this;
        var load_Item = _load_manager.getLocalItem(url);
        if (load_Item)
        {
            var _handle = load_Item._handle;
            load_Item._handle = null;
            if (errstatus == 0 && module && typeof (module) == "function")
            {
                if (load_Item.type != "include")
                {
                    var context = load_Item._context;
                    if (!context)
                        context = _load_manager.context;
                    module.call(context);
                }
            }
            else
            {
                load_Item.errcode = errstatus;
                nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
            }

            return;
        }
    };

    // 테마 파일을 로딩한다.
    nexacro._loadTheme2 = function (themeid, context)
    {    	
        // reset _application CSS
        context._css_selectors = { _is_selector: true, _has_items: false, _has_attr_items: false };

        // loadTheme
        var curthemeid = themeid;
        var themename;
        var idx = curthemeid.indexOf(".xtheme");
        if (idx < 0)
            themename = curthemeid;
        else if (idx > 0)
            themename = curthemeid.substring(0, idx);

        var cssurl, base_url;
        if (themename)
        {
            // _application._clearLocalThemeCache();

            // TODO _theme_uri 를 참조하는 부분은 DesignCssContext에서 읽을수 있도록 해야함.
            var idx = themename.indexOf("::");
            if (idx > 0)
            {                
                themename = themename.substring(idx + 2);				
            	//context._theme_uri = "./_theme_/" + themename;
                nexacro._theme_uri = "./_theme_/" + themename;
            }
            else
            {
            	//context._theme_uri = "./_theme_/" + themename;
            	nexacro._theme_uri = "./_theme_/" + themename;
            }

            // TODO
            cssurl = nexacro._theme_uri + "/theme.css";
            cssurl = nexacro._getServiceLocation(cssurl, base_url);
            cssurl += ".js";

            /*
            // load callback에서 원본 url을 넘겨주기 위해 
            nexacro._design_themeid_map.add_item(cssurl, curthemeid);
            */

            var service = nexacro._getServiceObject(cssurl);
            //_application._load_manager.loadCssModule(cssurl, null, null, service);
            //var _load_manager = _application._load_manager;
            var _load_manager = _application._load_manager;
            var load_item;

            //load_item = _load_manager.getLocalItem(cssurl);

            // 일단 LoadManager는 캐쉬 하지 않도록함.
            // lym
            /* 
            if (!load_item)
            {
                context.themeid = themeid;

                load_item = new nexacro.LoadItem(cssurl, "css");
                load_item._context = context;
                _load_manager.localList.push(load_item);
                _load_manager.localCnt++;

                var cur_cachelevel = service.cachelevel;
                service.cachelevel = "none";
                load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, nexacro._on_load_thememodule2, false, service, false);
                service.cachelevel = cur_cachelevel;
            }
			*/
        }
    };

    // 로딩된 테마를 Context에 반영한다. (DesignCssContext)
    nexacro._on_load_thememodule2 = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri)
    {
        var _load_manager = this;
        var load_Item = _load_manager.getLocalItem(url);
        if (load_Item)
        {
            var _handle = load_Item._handle;
            load_Item._handle = null;
            if (errstatus == 0 && module && typeof (module) == "function")
            {
                if (load_Item.type != "include")
                {
                    var context = load_Item._context;
                    if (!context)
                        context = _load_manager.context;
                    module.call(context);
                }
            }
            else
            {
                load_Item.errcode = errstatus;
                nexacro._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
            }

            return;
        }
    };

    //--------------------------------------------
    // Get/Set Property Utility
    //--------------------------------------------
    nexacro._setInitValueID = function (obj, value)
    {
        if (obj)
        {
            obj.set_initvalueid(value);
            
            var fn = obj._type_name + value;

            if (nexacro_init[fn])
            {
                nexacro_init[fn].call(obj, obj);
            }
        }
    };

    nexacro._setProperty = function (obj, propid, propval, pseudo)
    {
        //trace(obj + "[" + propid + "] : " + propval);
        if (!obj)
            return;

        var propids = propid.split(".");
        if (propids.length == 1 && propid === "style")
        {
            // TODO check InlineStyle을 일부만 넣어도 리셋이 안된다. Framework내부 버그로 보이는데...

            // reset inline style
            // lym
            //obj.style._empty();
            //obj.style._is_empty = false;

            // 빈문자열로 style 초기화가 안된다..
            if (propval == null || propval.length == 0)
            {
                // lym
                //obj.currentstyle._empty();
                obj._control_pseudo = "";
                obj._contents_pseudo = "";
                obj.on_apply_pseudo(obj._pseudo);
            }
        }
        else if (propids.length > 1 && propids[0] === "style")
        {
            // style.backgruond.color
            // --> set_background_color
            var _style;
            if (!pseudo)
            {
                // lym
                //_style = obj.style;
            }
            else
            {
                // lym
                //_style = obj._styles[pseudo];
                //if (!_style) 
                //{
                //    _style = obj._styles[pseudo] = obj.on_create_custom_style();
                //}
            }

            if (_style)
            {
                // style object의 특정 속성만 설정할 경우 style object의 나머지 속성은 null값을 갖는다 (no inherit)
                // EX) font가 없는 상태에서 font.size=10 만 설정할 경우 font=10이 됨.

                // -> currentstyle에서 값을 가져와 완성된 값으로 만듬.                    
                // style.aaa.bbb
                if (propids.length > 2)
                {
                    // style.aaa가 존재하는지 확인
                    var is_avail = true;
                    var curobj = _style;
                    for (var i = 0; i < propids.length - 1; i++)
                    {
                        curobj = curobj[propids[i + 1]];
                        if (!curobj)
                        {
                            is_avail = false;
                            break;
                        }
                    }

                    if (!is_avail || !curobj)
                    {
                        // 없음. 생성.
                        var parent_propids = propids.slice(0); // clone
                        parent_propids.length = parent_propids.length - 1;
                        parent_propids[0] = "currentstyle";
                        var parent_attr = parent_propids.join(".");

                        // currentstyle을 통해 최종 상속된 값을 얻어옴.
                        var current_pseudo = obj._pseudo;
                        if (pseudo)
                            obj.setCurrentPseudo(pseudo);
                        var current_value = eval("obj." + parent_attr);
                        if (pseudo && current_pseudo)
                            obj.setCurrentPseudo(current_pseudo);

                        // 얻어온 값을 setProperty 호출
                        // comp.currentstyle.aaa --> obj.style.aaa ???
                        parent_propids[0] = "style";
                        //this.setProperty(compid, parent_propids.join("."), current_value ? current_value._value : propval, pseudo);
                        nexacro._setProperty(obj, parent_propids.join("."), current_value ? current_value._value : propval, pseudo);
                    }
                }

                propids[0] = "set";
                var setter = propids.join("_");

                if (_style[setter])
                    _style[setter](propval);

                _style._is_empty = false;
                _style._updateValue();

                //this._on_update_property(obj, propid);

                return null;
            }
        } // end of style.xxx
        
        // design 용으로 property를 따로 관리하는 케이스가 있다.
        if (obj["design_set_" + propid])
        {
            obj["design_set_" + propid](propval);
        }
        else if (obj["set_" + propid])
        {
            if (propval === null && !(propid == "left" || propid == "right" || propid == "width" || propid == "height" || propid == "bottom" || propid == "top" || propid == "scrollbarsize"))
            {
                obj["set_" + propid]("");
            }
            else
                obj["set_" + propid](propval);
        }
        else
        {
            // user property의 경우 setter가 없을 수 있다..
            obj.getSetter(propid).set(propval);
        }
        
        return true;

        //this._on_update_property(obj, propid);
        //return obj[propid];
    };

    // Computed Style Test
    
    nexacro._getStyleProperty = function(obj, propid)
    {
        if (!obj)
            return "";

        /* note
        * obj : 대상 오브젝트
        * propid : css property
        *          ex> -nexa-icon, background, -nexa-padding 등
        *           child property는 요청하지 않음
        */

        var str;

        if (propid == "-nexa-text-align" || propid == "-nexa-vertical-align")
        {            
            var control_elem = obj.getElement();
            if (control_elem && control_elem.handle)
            {
                var child_elem = nexacro.__findElement(control_elem.handle, "nexacontentsbox");
                if (child_elem)
                {                    
                    str = child_elem._getComputedStyleValue(propid);
                    return str;
                }
            }            
        }

        var control_elem = obj.getElement();
        if (control_elem)
            str = control_elem._getComputedStyleValue(propid);

        return str;
    }

    nexacro._getProperty = function (obj, propid, pseudo)
    {
        if (!obj)
            return "";

        var propids = propid.split(".");
        var property_length = propids.length;

        if (property_length == 1 && propid == "style")
        {
            // TODO : 구현 필요
            return "";
            // Style 값 전체(pseudo포함)에 대한 toString
            // this.style
            // this._styles["mouseover"] ...
            return nexacro._getInlineStyleValue(obj);
        }
        else if (property_length > 1 && propids[0] == "style")
        {
            // TODO : 구현 필요
            return "";
            // style.xxx
            var curobj = null;
            if (!pseudo)
                curobj = obj.style;
            else if (obj._styles[pseudo])
                curobj = obj._styles[pseudo]; // 없으면?

            var fn = obj["on_find_CurrentStyle_" + propids[1]];
            if (fn)
                curobj = fn.call(obj, pseudo);

            if (curobj == null)
                return "";
            else
            {
                for (var i = 2; i < property_length; i++)
                {
                    curobj = curobj[propids[i]];
                    if (curobj == null)
                        return "";
                }
            }
            return curobj._value ? curobj._value : curobj;
        }

        var curobj = null;

        /*
        if (propid == "background")
        {
            // TODO : 구현 필요
            return "";
            var control_elem = obj.getElement();
            if (control_elem)
            	curobj = control_elem._getComputedStyle("background");
            return curobj;
        }
        if (propid == "textAlign")
        {
            // TODO : 구현 필요
            return "";
            var control_elem = obj.getElement();
            if (control_elem)
            {
                var child_elem = control_elem._findElement("nexacontentsbox"); // nexacontentsbox = classname
                if (child_elem)
                	curobj = child_elem._getComputedStyle("text-align");
                return curobj;
            }
        }
        */
        // design 용으로 property를 따로 관리하는 케이스가 있다.
        if (obj["design_get_" + propid])
        {
            return obj["design_get_" + propid]();
        }

        return obj[propid];
    };

    nexacro._getInlineStyleValue = function (comp)
    {
        if (!comp)
            return "";

        // inline style 값 전체 리턴
        var str = "";

        // normal style
        var _style = comp.style;
        if (_style)
        {
            var _pStyle = nexacro.Style.prototype;
            for (prop in _style)
            {
                if (prop[0] == "_")
                    continue;
                if (typeof (_style[prop]) == "function")
                    continue;
                if (_style[prop] == null)
                    continue;
                if (_pStyle[prop] == _style[prop]) // rtlimagemirroring 때문에 임시
                    continue;
                str += prop + ": " + _style[prop]._value + "; ";
            }
        }

        // Pseudo style value
        var pseudo_styles = comp._styles;
        if (pseudo_styles)
        {
            for (pseudo_style in pseudo_styles)
            {
                if (pseudo_style[0] == "_")
                    continue;
                if (pseudo_style == "normal") // tabpage 버그 임시
                    continue;
                _style = pseudo_styles[pseudo_style];
                str += ":" + pseudo_style + " { ";
                for (prop in _style)
                {
                    if (prop[0] == "_")
                        continue;
                    if (typeof (_style[prop]) == "function")
                        continue;
                    if (_style[prop] == null)
                        continue;
                    str += prop + ": " + _style[prop]._value + "; ";
                }
                str += " }; ";
            }
        }

        return str;
    };

    nexacro._getInlineStyleProperty = function (obj, propid, pseudo)
    {
        if (!obj)
            return "";

        // style.xxx
        var curobj = null;
        if (!pseudo)
        {
            curobj = obj.style;
        }
        else if (obj._styles[pseudo])
        {
            curobj = obj._styles[pseudo];

            // 없으면?
        }

        // propid = style.align.halign
        var propids = propid.split(".");
        var property_length = propids.length;

        for (var i = 1; i < property_length; i++)
        {
            curobj = curobj[propids[i]];
            if (curobj == null)
                return "";
        }

        return curobj._value ? curobj._value : curobj;
    };

    nexacro._getCurrentStyleValue = function (obj, propid, pseudo)
    {
        if (!obj)
            return "";

        var propids = propid.split(".");
        var property_length = propids.length;
        if (property_length == 1 && propid == "style")
        {
            if (!pseudo)
                pseudo = "normal";

            var cur_pseudo = obj._pseudo;
            obj.setCurrentPseudo(pseudo);

            var curobj = obj.currentstyle;

            obj.setCurrentPseudo(cur_pseudo);

            if (curobj)
                return curobj._value ? curobj._value : curobj;
        }
        else if (property_length > 1 && propids[0] == "style")
        {
            // style.xxx
            var curobj = null;
            if (!pseudo)
                curobj = obj.style;
            else if (obj._styles[pseudo])
                curobj = obj._styles[pseudo]; // 없으면?

            var fn = obj["on_find_CurrentStyle_" + propids[1]];
            if (fn)
                curobj = fn.call(obj, pseudo);

            if (curobj == null)
                return "";
            else
            {
                for (var i = 2; i < property_length; i++)
                {
                    curobj = curobj[propids[i]];
                    if (curobj == null)
                        return "";
                }
            }

            return curobj._value ? curobj._value : curobj;
        }

        return "";
    };

    //========================================================================
    // DesignForm_Style
    //========================================================================
    /*
    nexacro.DesignForm_Style = function (target)
    {
        nexacro.Form_Style.call(this, target);
    };

    var _pDesignFormStyle = nexacro._createPrototype(nexacro.Style, nexacro.DesignForm_Style);
    nexacro.DesignForm_Style.prototype = _pDesignFormStyle;

    eval(nexacro._createAlignAttributeEvalStr("_pDesignFormStyle", "stepalign"));
    eval(nexacro._createValueAttributeEvalStr("_pDesignFormStyle", "stepshowtype"));

    // custom Part
    _pDesignFormStyle.__custom_emptyObject = function ()
    {
        this.stepalign = null;
        this.stepshowtype = null;
    };
    _pDesignFormStyle.__get_custom_style_value = function ()
    {
        var val = "";
        if (this.stepalign && !this.stepalign._is_empty) val += "stepalign:" + this.stepalign._value + "; ";
        if (this.stepshowtype && !this.stepshowtype._is_empty) val += "stepshowtype:" + this.stepshowtype._value + "; ";
        return val;
    };

    //---------------------------------------------------------------
    nexacro.DesignForm_CurrentStyle = function ()
    {
        nexacro.CurrentStyle.call(this);
        this.stepalign = null;
        this.stepshowtype = null;
    };

    var _pDesignFormCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.DesignForm_CurrentStyle);
    nexacro.DesignForm_CurrentStyle.prototype = _pDesignFormCurrentStyle;

    _pDesignFormCurrentStyle.__custom_emptyObject = _pDesignFormStyle.__custom_emptyObject;
    _pDesignFormCurrentStyle.__get_custom_style_value = _pDesignFormStyle.__get_custom_style_value;

    delete _pDesignFormStyle;
    delete _pDesignFormCurrentStyle;
	*/

    //==============================================================================
    // nexacro.DesignForm
    //==============================================================================

    nexacro.DesignForm = function (id, position, left, top, width, height, right, bottom, parent)
    {
        this._inner_form = null;
        this._root_left = 20;
        this._root_top = 20;
        this._scroll_horz = 0;
        this._scroll_vert = 0;
        //this._inner_form_width = 0;
        //this._inner_form_height = 0;
        this.inner_width = 0;
        this.inner_height = 0;


        this._dot_size_x = 0;
        this._dot_size_y = 0;

        this._sublayoutmode_stack = [];
        this._active_editing_form = null;

        // 임시
        this._outer_background_value = "#262626";
        this._inner_background_value = "#ffffff";

        nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent, true);

        // scrollbar 처리
        this.set_scrollbartype("none");
        this._onResetScrollBar = nexacro._emptyFn;

        this.set_border("0px none");

        // eclipse 버젼에서 재정의하여 사용
        this.init();

        this._is_preview_mode = false;
    };

    var _pDesignForm = nexacro._createPrototype(nexacro.Form, nexacro.DesignForm);
    nexacro.DesignForm.prototype = _pDesignForm;

    // overide nexacro.Object
    _pDesignForm._type_name = "Form";

    //eval(nexacro._createAlignAttributeEvalStr("_pDesignForm", "stepalign"));
    //eval(nexacro._createValueAttributeEvalStr("_pDesignForm", "stepshowtype"));

    _pDesignForm.init = function ()
    {
        // clearStyles 삭제 
        //this._clearStyles();
    };

    _pDesignForm.get_root_obj = function ()
    {
        var _stack = this._sublayoutmode_stack;
        if (_stack && _stack.length > 0)
        {
            return _stack[_stack.length - 1].comp;
        }
        return this._inner_form;
    };

    _pDesignForm.get_step_count = function (rootobj)
    {
        if (!rootobj)
        {
            rootobj = this.get_root_obj();
        }

        var stepcount = 0;

        // form일 경우에만..
        if (rootobj instanceof nexacro.Form)
        {
            // fixed component를 위한 layout 정보 추출
        	var mlm = nexacro._getLayoutManager();
            var layout = mlm.getCurrentLayout(rootobj);
            if (layout)
            {
                stepcount = layout.stepcount ? layout.stepcount : 0;
            }
        }
        return stepcount;
    };

    _pDesignForm.get_step_width = function (bScale)
    {
        var stepwidth = 0;
        var rootobj = this.get_root_obj();

        if (rootobj)
        {
            stepwidth = rootobj._adjust_width;
            if (bScale)
            {
                var scale = this._getZoom() / 100;
                stepwidth *= scale;
                stepwidth = parseInt(stepwidth);
            }
        }

        return stepwidth;
    };

    _pDesignForm.get_owner_step_index = function (obj)
    {
        var positionstep = 0;
        var rootobj = this.get_root_obj();

        while (rootobj && obj && rootobj != obj.parent)
        {
            obj = obj.parent;
        }

        if (obj)
        {
            positionstep = obj.positionstep ? obj.positionstep : 0;
        }
        return positionstep;
    };


    //===============================================================
    // nexacro.DesignForm : DesignWindow draw support
    //===============================================================
    _pDesignForm.drawWindow = function ()
    {
        var win = this._getWindow();
        if (win && win.handle)
        {
            nexacro.__refreshDirtyRectWithCallBack(win.handle, this.drawWindowCallBack);
        }
    };

    _pDesignForm.drawWindowCallBack = function (pwin)
    {
        if (pwin)
        {
            nexacro.__finishDrawDesignWindow(pwin);
        }
    };

    //===============================================================
    // nexacro.DesignForm : DesignWindow support 2
    //===============================================================
    _pDesignForm.getScale = function ()
    {
        var scale = this._getZoom() / 100;

        return scale;
    };

    _pDesignForm._get_real_dot_size = function (measure, size, v)
    {
        if (measure == 0)
        {
            return size;
        }

        // percent에 대한 계산을 해야한다.
        var form = this._inner_form;
        var formsize = eval("form._adjust_" + v);

        size = parseInt(formsize * size / 100);

        return size;
    };

    //===============================================================
    // nexacro.DesignForm : Style Part
    //===============================================================

    _pDesignForm.on_create_custom_style = function ()
    {
        return new nexacro.DesignForm_Style(this);
    };

    _pDesignForm.on_create_custom_currentStyle = function ()
    {
        return new nexacro.DesignForm_CurrentStyle();
    };


    //===============================================================
    // nexacro.DesignForm : Create & Destroy & Update
    //===============================================================
    _pDesignForm.on_create_contents = function ()
    {
        nexacro.Form.prototype.on_create_contents.call(this);
    };

    _pDesignForm.on_destroy_contents = function ()
    {
        // _application에서 제거는 직접하지 않고 상위에서 제거
        //if (_application.accessport)
        //    _application.accessport.removeFormAccessPort(this._url);

        this.accessport = null;
        nexacro.Form.prototype.on_destroy_contents.call(this);
    };

    _pDesignForm.destroy = function ()
    {
        if (this._inner_form)
        {
            this._inner_form.destroy();
            this._inner_form = null;
        }

        var design_frame = this.parent;
        if (design_frame._window)
        {
            design_frame._window.destroy();
        }

        design_frame.destroy();

        nexacro.Form.prototype.destroy.call(this);
    };

    //===============================================================
    // nexacro.DesignForm : Override
    //===============================================================
    _pDesignForm._init = function ()
    {
        if (_application.accessport)
        {
            this._setEventHandler("oninit", this.on_notify_init, this);
        }

        //nexacro.__setDesignMode(nexacro.isDesignMode);  //hykim 추후 적용 고려
    };

    _pDesignForm._get_css_typename = function ()
    {
        return "Form";
    };

    //===============================================================
    // nexacro.DesignForm : Properties
    //===============================================================


    //===============================================================
    // nexacro.DesignForm : Methods
    //===============================================================	
    _pDesignForm.reloadForm = function ()
    {
        // 모든 Sublayout 모드 종료

        // 모든 Step Container 제거
        var active_form = this._active_editing_form;
        if (active_form)
        {
            var elem = active_form._control_element;
            if (elem)
            {
                if (elem._step_containers)
                {
                    var list = elem._step_containers;
                    var list_len = list.length;
                    for (var i = 0; i < list_len; i++)
                    {
                        var step_container_elem = list[i];
                        step_container_elem.destroy();
                    }
                }
            }
        }

        // destroy
        var inner_form = this._inner_form;
        if (inner_form)
        {
            inner_form.destroy();
        }

        this._inner_form = null;
        this._createInnerForm();

        this.setOverflowClip(this._overflowclip);

        // TODO check url loading을 다시?
    };


    // framework내부 메소드와 이름이 중복되어 이름변경 (+byrect)
    // classname : comp classname
    // parentid : parent fullname
    // left, top, width, height  
    // compid : 생성될 id
    // props = propert1, property2
    // values = value1, value2


    //컴포넌트랑 같은 룰로 
    //control로만 사용되는 경우 ex) FileUploadItemControl   componentclassname , controlclassname, issubcontrol (true/false)  
    //FileUploadItemControl, FileUploadItemControl, false : for component (없음)
    //undefined, FileUploadItemControl, true : for control -->FileUploadItemControl

    //component와 동일한 classid 로 control를 만드는 경우 ex) Button  componentclassname , controlclassname, issubcontrol (true/false)  
    //Button, undefined, false : for component  -->Button
    //Button, undefined, true : for control  --> ButtonControl

    _pDesignForm.createComponentCSSPreview = function (classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create)
    {
    	//trace("classname:" + classname + " controlclassname:" + controlclassname + " issubcontrol:" + issubcontrol)
        try 
        {
           // trace("createComponentByRect :" + classname + " " + parentid, left, top, width, height);
            var parent;
            if (parentid)
                parent = this._getChild(parentid);

            if (!parent)
                parent = this._inner_form;

            var compclassname = classname
            if (!classname && controlclassname)
                compclassname = controlclassname;

            if (!compid || compid.length == 0)
                compid = this._getNextChildID(parent, compclassname);

            //
            // CSS Preview Mode인 경우 CSS TypeName에 따라 다른 이름이 들어오기도 하므로
            // 변환해줄수 있는 인터페이스가 필요함. 또는 툴에서 바꿔서 들어와야함.
            //
            var classnameobj;
            if (compclassname == "nexacro.Tabpage") {
                classnameobj = eval("nexacro.Div");
            }
            else if (compclassname == "nexacro.DatePickerControl") {
                classnameobj = eval("nexacro.Calendar");
            }
            else if (compclassname == "nexacro.Step") {
                classnameobj = eval("nexacro.StepControl");
            }
            else {
                classnameobj = eval(compclassname);
                // 	trace("createComponentByRect classname:" + classname);
            }

            if (classnameobj) {
                var obj = new classnameobj(compid, null, left, top, width, height, null, null, parent);

                if (issubcontrol == true && classname)
                    obj._setControl();

                parent.addChild(compid, obj);

                if (compclassname == "nexacro.DatePickerControl") {
                    obj.set_type("monthonly");
                }

                if (props && values) {
                    var properties = props.split(".");
                    var setvalues = values.split(".");
                    var cnt = properties.length;
                    for (var i = 0; i < cnt; i++) {
                        if (obj["set_" + properties[i]])
                            obj["set_" + properties[i]](setvalues[i]);
                    }
                }

                obj.show();

                if (new_create && obj._createChild) {
                    obj._createChild();
                }

                // Preview Mode인 경우 Css Design Contents 생성 및 보여주기
                if (this._is_preview_mode) {
                    obj.createCssDesignContents();

                    // show는 툴에서 컴포넌트 위치 설정등이 완료된 후에 처리한다.
                    //if (obj.showCssDesignContents)
                    //    obj.showCssDesignContents();
                }
                else if (new_create) {
                    if (obj._initDesignDefaultProperty) {
                        obj._initDesignDefaultProperty();
                    }
                }

                if (parent.resetScroll)
                    parent.resetScroll();

                return obj.name;
            }

            return "";
        }
        catch (e) 
        {
            if (e.obj)
            {
            	nexacro._onSystemError(e.obj, e.name, e.message);               
            }
            else 
            {
                var msg = nexacro._getExceptionMessage(e);
               
                var environment = nexacro.getEnvironment();
                if (environment)
                {
                	nexacro._onSystemError(environment, e.name, msg);
                }
            }
        }
    };


    // framework내부 메소드와 이름이 중복되어 이름변경 (+byrect)
    // classname : comp classname
    // parentid : parent fullname
    // left, top, width, height  
	// compid : 생성될 id
    _pDesignForm.createComponentByRect = function (classname, parentid, left, top, width, height, compid, new_create)
    {
        try
        {
            //trace("createComponentByRect :" + classname + " " + parentid, left, top, width, height);
            var parent;
            if (parentid)
                parent = this._getChild(parentid);

            if (!parent)
                parent = this._inner_form;

            if (!compid || compid.length == 0)
                compid = this._getNextChildID(parent, classname);

            //
            // CSS Preview Mode인 경우 CSS TypeName에 따라 다른 이름이 들어오기도 하므로
            // 변환해줄수 있는 인터페이스가 필요함. 또는 툴에서 바꿔서 들어와야함.
            //
            var classnameobj;
            if (classname == "nexacro.Tabpage")
            {
                classnameobj = eval("nexacro.Div");
            }
            else if (classname == "nexacro.DatePickerControl")
            {
                classnameobj = eval("nexacro.Calendar");
            }
            else if (classname == "nexacro.Step")
            {
                classnameobj = eval("nexacro.StepControl");
            }
            else
            {
                classnameobj = eval(classname);
                // 	trace("createComponentByRect classname:" + classname);
            }

            if (classnameobj)
            {
                var parentform = parent;
                if (parent instanceof nexacro.Div)
                {
                    parentform = parent.form;
                }

                var obj = new classnameobj(compid, null, left, top, width, height, null, null, parentform);

                parent.addChild(compid, obj);

                if (classname == "nexacro.DatePickerControl")
                {
                    obj.set_type("monthonly");
                }

				//obj.set_cssclass() 

                obj.show();

                if (new_create && obj._createChild)
                {
                    obj._createChild();
                }

                // Preview Mode인 경우 Css Design Contents 생성 및 보여주기
                if (this._is_preview_mode)
                {
                    obj.createCssDesignContents();

                    // show는 툴에서 컴포넌트 위치 설정등이 완료된 후에 처리한다.
                    //if (obj.showCssDesignContents)
                    //    obj.showCssDesignContents();
                }
                else if (new_create)
                {
                    if (obj._initDesignDefaultProperty)
                    {
                        obj._initDesignDefaultProperty();
                    }
                }

                if (parent.resetScroll)
                    parent.resetScroll();

                return obj.name;
            }

            return "";
        }
        catch(e)
        {
            if (e.obj)
            {
            	nexacro._onSystemError(e.obj, e.name, e.message);
            }
            else
            {
            	var msg = nexacro._getExceptionMessage(e);

            	var environment = nexacro.getEnvironment();
            	if (environment)
            	{
            		nexacro._onSystemError(environment, e.name, msg);
            	}
            }
        }
    };

    // TODO : 확인 필요.. 임시 구현 (160425 박현진)
    _pDesignForm.createFrame = function (classname, parentid, frameid)
    {
        var parent = null;
        if (parentid)
        {
            parent = this._getObject(parentid);
        }

        if (!parent)
        {
            parent = this;
        }

        if (!frameid || frameid.length == 0)
        {
            frameid = this._getNextChildID(parent, classname);
        }

        var classnameobj = eval(classname);
        if (classnameobj)
        {
            var obj = null;

            // frame의 type에 따라 생성이 다르다.
            // 어떻게 구별하지?
            // TODO :
            if (classname == "nexacro.ChildFrame")
            {
                // childframe는 formurl 이 들어간다.
                obj = new classnameobj(frameid, null, null, null, null, null, null, null, "", parent);
            }
            else
            {
                // 그 외 frame들
                obj = new classnameobj(frameid, null, null, null, null, null, null, null, parent);
            }

            parent.addChild(frameid, obj);
            
            return frameid;
        }
    };

    _pDesignForm.createTabpage = function (classname, parentid, compid)
    {
        var parent;
        if (parentid)
            parent = this._getChild(parentid);

        if (!parent)
            return;

        if (!compid || compid.length == 0)
            compid = this._getNextChildID(parent, classname);

        if (parent instanceof nexacro.Tab)
        {
            parent.insertTabpage(compid, parent.getTabpageCount(), "", compid);
            return compid;
        }

        return;
    };

    _pDesignForm.createInvisibleObject = function (classname, objid)
    {
        if (!objid || objid.length == 0)
            objid = this._getNextChildID(this._inner_form, classname);

        var classnameobj = eval(classname);
        if (classnameobj)
        {
            var obj = new classnameobj(objid, this._inner_form);
            this._inner_form.addChild(objid, obj);

            return obj.name;
        }
    };

    _pDesignForm.getChildList = function (parentid)
    {
        var parent = this._getChild(parentid);
        if (!parent)
            return "";

        var chils_list = [];
        var childs = this._getChilds(parent);
        var child_len = childs ? childs.length : 0;
        for (var i = 0; i < child_len ; i++)
        {
            var child = childs[i];
            if (!child)
                continue;

            chils_list.push(child.name);
        }
        return chils_list.join(",");
    };

    // objid : comp fullname    
    _pDesignForm.deleteObject = function (objid)
    {
      //  trace("_pDesignForm.deleteObject(\"" + objid + "\")");
        var obj = this._getChild(objid);
        if (!obj)
        {
            trace("> Not found objid: " + objid);
            return;
        }
        var parent = obj.parent;
        if (obj && parent)
        {
            if (this._is_preview_mode)
            {
                // 함께 생성된 Dataset등이 있는 경우 파괴한다.
                obj.destroyCssDesignContents();
            }

            if (obj.positionstep == -1)
            {
                var div_elem = obj._control_element;
                nexacro.__setElementHandleFixedStepNode(div_elem.handle, false);
            }

            parent.removeChild(obj.id);

            if (obj._is_component)
            {
                if (obj.destroy)
                    obj._destroy();
            }
            else
            {
                if (obj.destroy)
                    obj.destroy();

                delete obj;
            }

            if (parent.resetScroll)
                parent.resetScroll();
        }
    };

    // compid : comp fullname
    // propid : property id 
    // propval: propert value 
    // pseudo : pseudo 값    
    _pDesignForm.setProperty = function (compid, propid, propval, pseudo)
    {
    	//trace("_pDesignForm.setProperty(\"" + compid + "\")" + " propid:" + propid);
        var obj = this._getObject(compid);
        if (obj)
        {
            if (propid == "id")
                propid = "name";

            var ret = nexacro._setProperty(obj, propid, propval, pseudo);
            if (ret === true)
            {
                this._on_update_property(obj, propid);

                return obj[propid];
            }
            else if (ret === null)
            {
                this._on_update_property(obj, propid);
                return;
            }
        }
        return "";
    };


    // 140523 박현진 Layout의 Style 적용
    _pDesignForm.appendInlineStyleValue = function (base_value, append_value)
    {
    	//trace("_pDesignForm.appendInlineStyleValue(\"" + base_value + "\")" + " append_value:" + append_value);
        var style_value = null;
        if (append_value == null)
        {
            // append 값이 없을 경우
            style_value = base_value;
        }
        else if (base_value == null)
        {
            // base 값이 없을 경우
            style_value = append_value;
        }
        else
        {
            // 둘다 있을 경우
            style_value = this._appendInlineStyleValue(base_value, append_value);
        }
        return style_value;
    };

    _pDesignForm.setLayoutStyle = function (compid, base_value, layout_value, sublayout_value)
    {
        var style_value = this.appendInlineStyleValue(base_value, layout_value);
        style_value = this.appendInlineStyleValue(style_value, sublayout_value);
        trace(">>> " + compid + " : " + base_value + " + " + layout_value + " + " + sublayout_value + "\n>>> " + style_value);
        this.setProperty(compid, "style", style_value);
    };

    // compid : comp fullname
    // propid : property id 
    // pseudo : pseudo 값
    _pDesignForm.getProperty = function (compid, propid, pseudo)
    {
    //	trace("_pDesignForm.getProperty(\"" + compid + "\")" + " propid:" + propid);

        var obj = this._getObject(compid);
        if (obj)
        {
            return nexacro._getProperty(obj, propid, pseudo);
        }
        return "";
    };
    _pDesignForm.getStyleProperty = function (compid, propid, childelement) {
    //	trace("_pDesignForm.getStyleProperty(\"" + compid + "\")" + " propid:" + propid);

    	var obj = this._getObject(compid);
        if (obj) 
        {
            return nexacro._getStyleProperty(obj, propid);
        }
        return "";
    };


    _pDesignForm.getInlineStyleProperty = function (compid, propid, pseudo)
    {
    //	trace("_pDesignForm.getInlineStyleProperty(\"" + compid + "\")" + " propid:" + propid);

    	var obj = this._getChild(compid);
        if (!obj)
            return "";

        return nexacro._getInlineStyleProperty(obj, propid, pseudo);
    };

    // 최종 상속된 style값 얻기
    _pDesignForm.getCurrentStyleValue = function (compid, propid, pseudo)
    {
   // 	trace("_pDesignForm.getCurrentStyleValue(\"" + compid + "\")" + " propid:" + propid);
    	var obj = this._getObject(compid);
        if (obj)
        {
            return nexacro._getCurrentStyleValue(obj, propid, pseudo);
        }

        return "";
    };

    // 140429 박현진 : Rect 으로 이동하는 함수 분리..
    // compid : comp fullname
    // left, top, width, height
    _pDesignForm.moveComponentByRect = function (compid, left, top, width, height, resize)
    {
    //	trace("_pDesignForm.moveComponentByRect(\"" + compid + "\")" + " left:" + left);
        var obj = this._getChild(compid);
        return this._moveComponentByRect(obj, left, top, width, height, resize);
    };

    _pDesignForm._moveComponentByRect = function (obj, left, top, width, height, resize)
    {
        if (obj)
        {
            var root_form = obj._getRootForm();
            var owner_positionstep = this.get_owner_step_index(obj);
            var step_width = 0;
            if (owner_positionstep > 0 && obj.parent == root_form)
            {
                step_width = this._inner_form._adjust_width;
            }

            // 임의 rect에 맞게 이동 후 anchor와 unit 복구
            var _left = obj.left;
            var _top = obj.top;
            var _width = obj.width;
            var _height = obj.height;
            var _right = obj.right;
            var _bottom = obj.bottom;

            var parent = obj.parent;
            var val;

            var parent_client_innerwidth = parent._getClientInnerWidth();
            var parent_client_innerheight = parent._getClientInnerHeight();

            var sublayoutmode_info = this._findSubLayoutMode(obj);
            var offset_pos;
            if (sublayoutmode_info)
            {
                offset_pos = sublayoutmode_info.offset_pos;
            }

            obj._rePositioning(left, top, width, height, null, null);

            obj._adjustPosition(obj.left, obj.top, obj.right, obj.bottom, obj.width, obj.height, parent_client_innerwidth, parent_client_innerheight);

            if (obj.parent && obj.parent.resetScroll)
            {
                obj.parent.resetScroll();
            }

            var parent_client_width = parent._getClientWidth();
            var parent_client_height = parent._getClientHeight();

            function _restorePositionValueUnit(pos)
            {
                var _w_or_h;
                if (pos == "left" || pos == "width" || pos == "right")
                    _w_or_h = "width";
                else
                    _w_or_h = "height";

                var adjust_pos;
                var _left_ref = left;// - owner_positionstep * step_width;

                _parent = "parent_client_" + _w_or_h;

                if (pos == "left")
                {
                    adjust_pos = _left_ref;
                    if (obj._leftbase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._leftbase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_width";
                            if (obj._leftbase_position_type == "right")
                                adjust_pos -= base_comp._adjust_left + base_comp._adjust_width;
                            else
                                adjust_pos -= base_comp._adjust_left;
                        }
                    }
                }
                else if (pos == "top")
                {
                    adjust_pos = top;
                    if (obj._topbase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._topbase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_height";
                            if (obj._topbase_position_type == "bottom")
                                adjust_pos -= base_comp._adjust_top + base_comp._adjust_height;
                            else
                                adjust_pos -= base_comp._adjust_top;
                        }
                    }
                }
                else if (pos == "right")
                {
                    adjust_pos = parent_client_width - (_left_ref + width);
                    if (obj._rightbase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._rightbase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_width";
                            if (obj._rightbase_position_type == "left")
                                adjust_pos -= (parent ? parent_client_width : 0) - base_comp._adjust_left;
                            else
                                adjust_pos -= (parent ? parent_client_width : 0) - base_comp._adjust_left - base_comp._adjust_width;
                        }
                    }
                }
                else if (pos == "bottom")
                {
                    adjust_pos = parent_client_height - (top + height);
                    if (obj._bottombase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._bottombase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_height";
                            if (obj._bottombase_position_type == "top")
                                adjust_pos -= (parent ? parent_client_height : 0) - base_comp._adjust_top;
                            else
                                adjust_pos -= (parent ? parent_client_height : 0) - base_comp._adjust_top - base_comp._adjust_height;
                        }
                    }
                }
                else if (pos == "width")
                {
                    adjust_pos = width;
                    if (obj._widthbase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._widthbase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_width";
                        }
                    }
                }
                else if (pos == "height")
                {
                    adjust_pos = height;
                    if (obj._heightbase_component_id)
                    {
                        base_comp = obj._getFormChildById(obj._heightbase_component_id);
                        if (base_comp)
                        {
                            _parent = "base_comp._adjust_height";
                        }
                    }
                }
                else
                {
                    adjust_pos = eval("obj._adjust_" + pos);
                    if (offset_pos)
                    {
                        if (pos == "left")
                            adjust_pos -= offset_pos[0];
                        else
                            adjust_pos -= offset_pos[1];
                    }
                }


                eval("if (undefined === _" + pos + " || null === _" + pos + ")\n"
                    + "{\n"
                    + "   obj.set_" + pos + "(null);\n"
                    + "}\n"
                    + "else\n"
                    + "{\n"
                    + "   val = _" + pos + ";\n"
                    + "   if (typeof(val) == 'string' && val.indexOf('%') >= 0)\n"
                    + "   {\n"
                    + "      var rate = val.substr(0, val.indexOf(\"%\"))\n"
                    + "      var valTopx = parseInt(" + _parent + " * rate / 100);\n"
                    + "      if (valTopx == adjust_pos)\n"
                    + "      {\n"
                    + "         val = rate;\n"
                    + "      }\n"
                    + "      else\n"
                    + "      {\n"
                    + "         val = ((adjust_pos * 100) / " + _parent + ");\n"
                    + "         val = nexacro.round(val, 2);\n"
                    + "      }\n"
                    + "      obj.set_" + pos + "(val + '%');\n"
                    + "   }\n"
                    + "   else\n"
                    + "   {\n"
                    + "      obj.set_" + pos + "(" + adjust_pos + ");\n"
                    + "   }\n"
                    + "}"
                    );
            }



            // null 이었던 값 복구
            // % 이었던 값의 단위 %로 역산 적용
            if (resize)
            {
                function _restorePositionValue(pos1, pos2, pos3)
                {
                    var pos_old1 = eval("_" + pos1);
                    var pos_old2 = eval("_" + pos2);
                    var pos_old3 = eval("_" + pos3);

                    if (pos_old1 !== null)
                    {
                        _restorePositionValueUnit(pos1);

                        if (pos_old2 !== null || pos_old3 !== null)
                        {
                            _restorePositionValueUnit(pos2);
                            _restorePositionValueUnit(pos3);
                        }
                    }
                    else
                    {
                        if (pos_old2 !== null && pos_old3 !== null)
                        {
                            _restorePositionValueUnit(pos1);
                            _restorePositionValueUnit(pos2);
                            _restorePositionValueUnit(pos3);
                        }
                        else if (pos_old2 !== null || pos_old3 !== null)
                        {
                            _restorePositionValueUnit(pos2);
                            _restorePositionValueUnit(pos3);
                        }
                    }
                }

                _restorePositionValue("left", "width", "right");
                _restorePositionValue("top", "height", "bottom");
            }
            else
            {
                
                // move 실제 size는 변경되지 않음
                _restorePositionValueUnit("width");

                if (_left !== null || _right != null)
                {
                    _restorePositionValueUnit("left");
                    _restorePositionValueUnit("right");
                }

                _restorePositionValueUnit("height");

                if (_top !== null || _bottom != null)
                {
                    _restorePositionValueUnit("top");
                    _restorePositionValueUnit("bottom");
                }
                
            }

        }
    };

    _pDesignForm.swapPositionUnit = function (compid, pos, unit)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            if (unit == "auto")
            {
                eval("obj.set_" + pos + "(\"auto\");");
                this.drawWindow();
            }
            else
            {
                this._swapPositionUnit(obj, pos, unit);
            }
        }
    };

    // compid : comp fullname
    // left, top, width, height, right, bottom
    _pDesignForm.moveComponent = function (compid, left, top, width, height, right, bottom)
    {
        var obj = this._getChild(compid);        
        if (obj)
        {
            // lym, tabpage는 제외
            if (obj instanceof nexacro.Tabpage)
            {
                return;
            }

            // 2015.07.31 박현진
            // xml 기준의 정보를 갖고 초기화 할때 호출되는 함수이다.
            // xml에 저장된 정보는 모두 base 기준으로 재계산 된 값이므로 그냥 적용하면 됨

            obj._init_position(left, top, width, height, right, bottom);
                        
            if (obj.parent && obj.parent.resetScroll)
            {
                obj.parent.resetScroll();
            }
        }
    };

    // compid : comp fullname
    // width, height : width, height 값 
    _pDesignForm.resizeComponent = function (compid, width, height)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            return obj.resize(width, height);
        }
    };

    // x, y : screen좌표 
    // rootcomp : hittest를 하고자 하는 부모 component
    _pDesignForm.hitTestByPoint = function (x, y, rootcompid, recursive)
    {
    //	trace("_pDesignForm.hitTestByPoint(\"" + rootcompid + "\")" + " x:" + x);

        var rootobj = this._getObject(rootcompid);
        if (rootobj)
        {
            // fixed component를 위한 layout 정보 추출
            var stepcount = this.get_step_count(rootobj);
            var stepwidth = this.get_step_width(true);

            var comps = this._getChildList(rootobj);
            var comp_len = comps ? comps.length : 0;

            for (var i = comp_len - 1; i >= 0 ; i--)
            {
                var comp = comps[i];
                if (!comp)
                    continue;

                var _x = x;
                var _y = y;
                var hit = this._hitTestByPoint(comp, _x, _y);
                if (hit == false)
                {
                    // fixed component인지 확인
                    var positionstep = comp.positionstep ? comp.positionstep : 0;
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _x -= stepwidth;
                            hit = this._hitTestByPoint(comp, _x, _y);
                            if (hit)
                                break;
                        }
                    }
                }

                if (hit)
                {

                    // 하위 탐색 옵션 적용
                    if (!recursive)
                    {
                        return this._getScopeName(comp);
                    }

                    // url link된 항목은 child 검사하지 않음
                    var url = comp.url;
                    if (url || !recursive)
                    {
                        return this._getScopeName(comp);
                    }

                    var childs = this._getChildList(comp);
                    var child_len = childs ? childs.length : 0;
                    if (child_len > 0)
                    {
                        var hitchild = this.hitTestByPoint(_x, _y, this._getChildName(comp), true);
                        if (hitchild === "")
                        {
                            hitchild = this._getScopeName(comp);
                        }

                        return hitchild;
                    }
                    else
                    {
                        return this._getScopeName(comp);
                    }
                }
            }
        }

        return this._getScopeName(rootobj);
    };

    // left, top, width, height : client 기준 좌표
    // rootcomp : hittest를 하고자 하는 부모 component
    _pDesignForm.hitTestByRect = function (left, top, width, height, rootcompid, type)
    {
        var hitcomplist = "";
        var rootobj = this._getObject(rootcompid);
        if (rootobj)
        {
            // fixed component를 위한 layout 정보 추출
            var stepcount = this.get_step_count(rootobj);
            var stepwidth = this.get_step_width(true);

            var comps = this._getChildList(rootobj);
            var comp_len = comps.length;
            for (var i = comp_len - 1; i >= 0 ; i--)
            {
                var comp = comps[i];
                if (!comp)
                    continue;

                var _left = left;
                var _top = top;
                var _width = width;
                var _height = height;

                // fixed component인지 확인
                var positionstep = comp.positionstep ? comp.positionstep : 0;

                var hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
                if (hit == false)
                {
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _left -= stepwidth;
                            hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
                            if (hit)
                                break;
                        }
                    }
                }

                if (hit)
                {
                    if (hitcomplist.length > 0)
                    {
                        hitcomplist += ",";
                    }
                    hitcomplist += this._getScopeName(comp);
                }

                // url link된 항목은 child 검사하지 않음
                var url = comp.url;
                if (url)
                {
                    continue;
                }

                var childs = this._getChildList(comp);
                var child_len = childs ? childs.length : 0;
                if (child_len > 0)
                {
                    var childlist = this.hitTestByRect(left, top, width, height, this._getChildName(comp), type);
                    if (childlist && childlist.length > 0)
                    {
                        if (hitcomplist.length > 0)
                        {
                            hitcomplist += ",";
                        }
                        hitcomplist += childlist;
                    }
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        _left = left;
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _left -= stepwidth;
                            childlist = this.hitTestByRect(_left, top, width, height, this._getChildName(comp), type);
                            if (childlist && childlist.length > 0)
                            {
                                if (hitcomplist.length > 0)
                                {
                                    hitcomplist += ",";
                                }
                                hitcomplist += childlist;
                            }
                        }
                    }
                }
            }
        }

        return hitcomplist;
    };

    // 140617 박현진 : tracker hittest 용   
    _pDesignForm.hitTestTracker = function (x, y, rootcompid, compid)
    {
        var obj = this._getObject(compid);
        var rootobj = this._getObject(rootcompid);

        return this._hitTestTracker(x, y, rootobj, obj);
    };

    _pDesignForm._hitTestTracker = function (x, y, rootcomp, comp)
    {
        if (comp)
        {
            // tracker 영역까지 
            var hit = false;
            var rect = this._getClientRect(comp);
            if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 &&
                rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7)
            {
                hit = true;
            }

            if (!hit)
            {
                // fixed component인지 확인 해야한다.
                if (!rootcomp)
                    return;

                // form일 경우에만..
                if (!(rootcomp instanceof nexacro.Form))
                    return;

                // fixed component를 위한 layout 정보 추출
                var mlm = nexacro._getLayoutManager();
                var layout = mlm.getCurrentLayout(rootcomp);
                if (!layout)
                    return;

                var stepcount = layout.stepcount ? layout.stepcount : 0;
                if (stepcount < 2)
                    return;

                var stepwidth = rootcomp._adjust_width;
                var scale = this._getZoom() / 100;
                stepwidth *= scale;
                stepwidth = parseInt(stepwidth);

                var check_obj = comp;
                while (check_obj && check_obj.parent && rootcomp != check_obj.parent)
                {
                    check_obj = check_obj.parent;
                }


                if (!check_obj)
                    return;

                var positionstep = check_obj.positionstep ? check_obj.positionstep : 0;
                if (positionstep >= 0)
                    return;

                if (positionstep < 0)
                {
                    // 모든 step 영역에 대하여 hittest
                    for (var j = 1 ; j < stepcount ; j++)
                    {
                        rect[0] += stepwidth;
                        if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 &&
                            rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7)
                        {
                            hit = true;
                            break;
                        }
                    }
                }

            }

            if (hit)
            {
                return rect;
            }
        }

        return -1;
    };

    // x, y : screen좌표 
    // rootcomp : hittest를 하고자 하는 부모 component
    _pDesignForm.hitTestforFormbase = function (x, y, rootcompid)
    {
        var comp_list = "";
        var rootobj = this._getObject(rootcompid);
        if (rootobj)
        {
            // fixed component를 위한 layout 정보 추출
            var stepcount = this.get_step_count(rootobj);
            var stepwidth = this.get_step_width(true);

            var comps = this._getChildList(rootobj);
            var comp_len = comps ? comps.length : 0;

            for (var i = comp_len - 1; i >= 0 ; i--)
            {
                var comp = comps[i];
                if (!comp)
                    continue;

                var _x = x;
                var _y = y;
                var hit = this._hitTestByPoint(comp, _x, _y);
                if (hit == false)
                {
                    // fixed component인지 확인
                    var positionstep = comp.positionstep ? comp.positionstep : 0;
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _x -= stepwidth;
                            hit = this._hitTestByPoint(comp, _x, _y);
                            if (hit)
                                break;
                        }
                    }
                }

                if (hit)
                {
                    if (comp instanceof nexacro.Div)
                    {
                        comp_list += this._getScopeName(comp);
                        comp_list += ",";

                    }
                    // url link된 항목은 child 검사하지 않음
                    var url = comp.url;
                    if (url)
                    {
                        continue;
                    }

                    var childs = this._getChildList(comp);
                    var child_len = childs ? childs.length : 0;
                    if (child_len > 0)
                    {
                        comp_list += this.hitTestforFormbase(_x, _y, this._getChildName(comp));
                    }
                }
            }
        }

        return comp_list;
    };



    // x, y : screen좌표 
    // rootcomp : hittest를 하고자 하는 부모 component
    _pDesignForm.hitTestParentByPoint = function (x, y, rootcompid)
    {
        var rootobj = this._getObject(rootcompid);
        if (rootobj)
        {
            // fixed component를 위한 layout 정보 추출
            var stepcount = this.get_step_count(rootobj);
            var stepwidth = this.get_step_width(true);

            var comps = this._getChildList(rootobj);
            var comp_len = comps ? comps.length : 0;

            for (var i = comp_len - 1; i >= 0 ; i--)
            {
                var comp = comps[i];
                if (!comp)
                    continue;

                // tab, form계열이 아니면 패스
                if (!(comp instanceof nexacro.Div || comp instanceof nexacro.Tab))
                    continue;

                var _x = x;
                var _y = y;
                var hit = this._hitTestByPoint(comp, _x, _y);
                if (hit == false)
                {
                    // fixed component인지 확인
                    var positionstep = comp.positionstep ? comp.positionstep : 0;
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _x -= stepwidth;
                            hit = this._hitTestByPoint(comp, _x, _y);
                            if (hit)
                                break;
                        }
                    }
                }

                if (hit)
                {
                    // url link된 항목은 child 검사하지 않음
                    var url = comp.url;
                    if (url)
                    {
                        continue;
                    }

                    var childs = this._getChildList(comp);
                    var child_len = childs ? childs.length : 0;
                    if (child_len > 0)
                    {
                        return this.hitTestParentByPoint(_x, _y, this._getChildName(comp));
                    }
                    else
                    {
                        // tab은 tabpage외에 자식을 갖지 않는다.
                        if (comp instanceof nexacro.Tab)
                            continue;

                        return this._getScopeName(comp);
                    }
                }
            }
        }

        return rootcompid;
    };

    // left, top, width, height : client 기준 좌표
    // rootcomp : hittest를 하고자 하는 부모 component
    _pDesignForm.hitTestParentByRect = function (left, top, width, height, rootcompid)
    {
        var hitcomplist = "";
        var rootobj = this._getObject(rootcompid);
        if (rootobj)
        {
            // fixed component를 위한 layout 정보 추출
            var stepcount = this.get_step_count(rootobj);
            var stepwidth = this.get_step_width(true);

            var comps = this._getChildList(rootobj);
            var comp_len = comps.length;
            for (var i = comp_len - 1; i >= 0 ; i--)
            {
                var comp = comps[i];
                if (!comp)
                    continue;

                // tab, form계열이 아니면 패스
                if (!(comp instanceof nexacro.Div || comp instanceof nexacro.Tab))
                    continue;

                var _left = left;
                var _top = top;
                var _width = width;
                var _height = height;

                // fixed component인지 확인
                var positionstep = comp.positionstep ? comp.positionstep : 0;

                var hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, 2);
                if (hit == false)
                {
                    if (positionstep < 0)
                    {
                        // 모든 step 영역에 대하여 hittest
                        for (var j = 1 ; j < stepcount ; j++)
                        {
                            _left -= stepwidth;
                            hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, 2);
                            if (hit)
                                break;
                        }
                    }
                }

                if (hit)
                {
                    // url link된 항목은 부모가 될 수 없음
                    var url = comp.url;
                    if (url)
                    {
                        continue;
                    }

                    var childs = this._getChildList(comp);
                    var child_len = childs ? childs.length : 0;
                    if (child_len > 0)
                    {
                        return this.hitTestParentByRect(left, top, width, height, this._getChildName(comp));
                    }
                    else
                    {
                        // tab은 tabpage외에 자식을 갖지 않는다.
                        if (comp instanceof nexacro.Tab)
                            continue;

                        return this._getScopeName(comp);
                    }
                }
            }
        }

        return rootcompid;
    };

    // horz :true/false
    // size : scroll pos의 변경 size 
    _pDesignForm.setScroll = function (is_horz, size)
    {
        if (is_horz)
        {
            this._scroll_left = size;
        }
        else
        {
            this._scroll_top = size;
        }

        // Offset inner_form
        this._recalcDesignLayout();
    };


    // compid :this를 제외한 fullname
    // isroot : true/false
    _pDesignForm.getComponentRect = function (compid, isroot)
    {
        var obj = this._getObject(compid);        
        return this._getComponentRect(obj, isroot);
    };

    _pDesignForm._getComponentRect = function (obj, isroot)
    {
        // isRoot = true일 경우 Form 기준의 rect 반환        
        var root_obj = this.get_root_obj();
        if (obj == root_obj)
        {
            return [0, 0, obj._adjust_width, obj._adjust_height];
        }
        else if (isroot)
        {
            //var rectbyroot = [obj._adjust_left, obj._adjust_top, obj._adjust_width, obj._adjust_height];
            var _adjust_left = obj._adjust_left;
            var _adjust_top = obj._adjust_top;
            var _adjust_width = obj._adjust_width;
            var _adjust_height = obj._adjust_height;

            var sublayoutmode_info = this._findSubLayoutMode(obj);
            if (sublayoutmode_info)
            {
                _adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
                _adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
            }

            var parent = obj.parent;
            while (parent && parent != root_obj)
            {
                _adjust_left += parent._adjust_left;
                _adjust_top += parent._adjust_top;

                // border
                var border = this._getBorderWidth(parent);
                _adjust_left += border[0];
                _adjust_top += border[1];

                // form계열이면
                if (parent instanceof nexacro.Div)
                {
                    sublayoutmode_info = this._findSubLayoutMode(parent);
                    if (sublayoutmode_info)
                    {
                        _adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
                        _adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
                    }
                }

                parent = parent.parent;
            }
            return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
        }
        else
        {
            return [obj._adjust_left, obj._adjust_top, obj._adjust_width, obj._adjust_height];
        }
    };

    _pDesignForm.getClientRect = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            return this._getClientRect(obj);
        }
    };

    _pDesignForm.setDotSize = function (measure, size)
    {
        var x = this._get_real_dot_size(measure, size, "width");
        var y = this._get_real_dot_size(measure, size, "height");

        var control_element = this._active_editing_form._control_element;
        if (control_element && control_element.handle)
            nexacro.__setElementHandleDotSize(control_element.handle, x, y);

        // check step container
        if (control_element && control_element._step_containers && control_element._step_containers.length > 0)
        {
            var step_container_elems = control_element._step_containers;
            for (var i = 0; i < step_container_elems.length; i++)
            {
                var elem = step_container_elems[i];
                if (elem && elem.handle)
                    nexacro.__setElementHandleDotSize(elem.handle, x, y);
            }
        }
        this._dot_size_x = x;
        this._dot_size_y = y;

        this.drawWindow();
    };

    _pDesignForm.setDotStyle = function (dot_style)
    {
        var control_element = this._active_editing_form._control_element;
        if (control_element && control_element.handle)
            nexacro.__setElementHandleDotStyle(control_element.handle, dot_style);

        // check step container
        if (control_element && control_element._step_containers && control_element._step_containers.length > 0)
        {
            var step_container_elems = control_element._step_containers;
            for (var i = 0; i < step_container_elems.length; i++)
            {
                var elem = step_container_elems[i];
                if (elem && elem.handle)
                    nexacro.__setElementHandleDotStyle(elem.handle, dot_style);
            }
        }

        this._dot_style = dot_style;

        this.drawWindow();
    };

    _pDesignForm.setDotVisible = function (visible)
    {
        var control_element = this._active_editing_form._control_element;
        if (control_element && control_element.handle)
            nexacro.__setElementHandleDotVisible(control_element.handle, visible);

        // check step container
        if (control_element && control_element._step_containers && control_element._step_containers.length > 0)
        {
            var step_container_elems = control_element._step_containers;
            for (var i = 0; i < step_container_elems.length; i++)
            {
                var elem = step_container_elems[i];
                if (elem && elem.handle)
                    nexacro.__setElementHandleDotVisible(elem.handle, visible);
            }
        }
        this._dot_visible = visible;

        this.drawWindow();
    };

    _pDesignForm.setPreviewMode = function (is_previewmode)
    {
        this._is_preview_mode = is_previewmode;
    };

    _pDesignForm.showPreviewContents = function (compid)
    {
  //  	trace("DesignForm.showPreviewContents:" + compid);
        var obj = this._getObject(compid);
        if (obj)
            obj.showCssDesignContents();
    };
    _pDesignForm.showCssDesignContents = function (compid, objpath, status, statusvalue, userstatus, userstatusvalue)
    {

        var obj = this._getObject(compid);
        if (obj)
            obj.showCssDesignContents(objpath, status, statusvalue, userstatus, userstatusvalue);
    };
    _pDesignForm.updatePreviewPosition = function (compid)
    {
    //	trace("DesignForm.updatePreviewPosition:" + compid);
        var obj = this._getObject(compid);
        if (obj)
            obj.updatePreviewPosition();
    };

    _pDesignForm.getFormBitmap = function ()
    {
        var control_element = this._control_element;
        if (control_element && control_element.handle)
            return nexacro.__getWindowBitmap(control_element.handle);
    };

    _pDesignForm.setBitmapSize = function (width, height)
    {
        // TODO check 뭐하는 API인지? 2014.04.24 neoarc

        var cf = this.parent;
        if (!cf)
            return;
        var win = cf._window;
        if (!win || !win.handle)
            return;
        cf.move(0, 0, width, height);
        this._recalcDesignLayout();

    }

    _pDesignForm.setFormSize = function (width, height)
    {
        // 내부 실제 form의 크기 조절
        if (width)
        {
            //this._inner_form_width = width;
            this.inner_width = width;
        }

        if (height)
        {
            //this._inner_form_height = height;
            this.inner_height = height;
        }

        var form = this._inner_form;
        if (form)
        {
            //form.resize(this._inner_form_width, this._inner_form_height);
            form.resize(this.inner_width, this.inner_height);
            //trace(">> Form Size : " + form.width + ", " + form.height);
        }

        // layout size 조절
        this.setLayoutProperty("this", "default", "width", this.inner_width);
        this.setLayoutProperty("this", "default", "height", this.inner_height);
    };

    _pDesignForm.DrawOffset = function (offsetx, offsety)
    {
        var control_element = this._control_element;
        if (control_element && control_element.handle)
            nexacro.__setElementHandleOffset(control_element.handle, offsetx, offsety);
    };

    _pDesignForm.setDesignWindowBackground = function (color, innerform)
    {
        this._outer_background_value = color;
       
        this.set_background(this._outer_background_value);

        if (innerform)
        {
            this._inner_form.set_background(this._outer_background_value);
        }
    };

    _pDesignForm.setRoot = function (left, top)
    {
        this._root_left = left;
        this._root_top = top;

        this._recalcDesignLayout();
    };

    _pDesignForm.setDesignZoom = function (scale)
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementZoom(scale);

            // scale에 따른 root 재조정
            this._recalcDesignLayout(true, false);
        }

        var _stack = this._sublayoutmode_stack;
        if (_stack.length > 0)
        {
            for (var i = 0; i < _stack.length; i++)
            {
                // offset pos 재계산..
                var pt_offset = [0, 0];
                var owner_elem = _stack[i].owner_elem;
                var temp = owner_elem;
                while (temp && temp != this)
                {
                    pt_offset[0] += temp.left;
                    pt_offset[1] += temp.top;
                    temp = temp.owner_elem;
                };
                _stack[i].offset_pos = pt_offset;

                var overlay_elem = _stack[i].overlay_elem;
                var overlay_container_elem = overlay_elem.getContainerElement();
                nexacro.__setElementHandleScale(overlay_container_elem.handle, scale);
            }

            this._recalcDesignLayout(false, true);
        }
    };

    _pDesignForm.getDesignZoom = function ()
    {
        return this._getZoom();
    };


    _pDesignForm.getBorderWidth = function (compid)
    {
        return this._getBorderWidth(this._getObject(compid));
    };

    _pDesignForm._getBorderWidth = function (obj)
    {
        if (nexacro._isNull(obj))
            return [0, 0, 0, 0];

        if (obj._getBorderWidth)
            return obj._getBorderWidth();

        return [0, 0, 0, 0];
    };

    _pDesignForm.getOverlapComponent = function (compid)
    {
        var pivot = this._getObject(compid);
        if (!pivot)
            return "";

        var parent = pivot.parent;
        if (!parent)
            return "";

        var complist = "";

        var _adjust_left = pivot._adjust_left;
        var _adjust_top = pivot._adjust_top;
        var _adjust_rigth = pivot._adjust_left + pivot._adjust_width;
        var _adjust_bottom = pivot._adjust_top + pivot._adjust_height;

        // 약간의 여유를 둔다
        _adjust_left -= 2;
        _adjust_top -= 2;
        _adjust_rigth += 2;
        _adjust_bottom += 2;

        var comps = this._getChildList(parent);
        var comp_len = comps ? comps.length : 0;

        // 내 zorder 하위 항목에 대해서만 처리
        var find_this = false;
        for (var i = comp_len - 1; i >= 0 ; i--)
        {
            var comp = comps[i];
            if (!comp)
                continue;

            if (comp == pivot)
            {
                find_this = true;
                continue;
            }

            if (!find_this)
                continue;

            if (_adjust_left <= comp._adjust_left &&
                _adjust_top <= comp._adjust_top &&
                _adjust_rigth >= (comp._adjust_left + comp._adjust_width) &&
                _adjust_bottom >= (comp._adjust_top + comp._adjust_height))
            {
                complist += this._getScopeName(comp);
                complist += ",";
            }
        }

        return complist;
    };

    _pDesignForm.setName = function (compid, propval)
    {
        var obj = this._getChild(compid);
        if (obj)
        {
            obj.set_id(propval);
            this._changeChildID(obj.name, propval, obj);
            obj.name = propval;
            return propval;
        }
    };

    _pDesignForm.setOverflowClip = function (overflowclip)
    {
        if (!this._inner_form)
            return;

        var control_element = this._inner_form._control_element;
        if (control_element && control_element.handle)
            nexacro.__setElementHandleOverflowClip(control_element.handle, overflowclip);

        this._overflowclip = overflowclip;
    };

    _pDesignForm._is_sub_layout_editting = function ()
    {
        var _stack = this._sublayoutmode_stack;

        return (_stack.length > 0);
    };

    _pDesignForm.showSubLayout = function (compid, bShow, positionstep)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        if (bShow)
        {
            this._setSubLayoutPosition(obj);
        }

        return this._showSubLayout(obj, bShow, positionstep);
    };

    _pDesignForm._setSubLayoutPosition = function (obj)
    {
        // min, max 제한 해제
        if (obj.set_minwidth) obj.set_minwidth(null);
        if (obj.set_maxwidth) obj.set_maxwidth(null);
        if (obj.set_minheight) obj.set_maxheight(null);
        if (obj.set_maxheight) obj.set_maxheight(null);

        // 현재 위치를 left, top, width, height를 px 단위로 사용하는 position property으로 변환
        // TODO :                 
        if (obj.left === null || obj.left === undefined)
        {
            obj.left = obj._adjust_left;
        }
        if (obj.top === null || obj.top === undefined)
        {
            obj.top = obj._adjust_top;
        }
        if (obj.width === null || obj.width === undefined)
        {
            obj.width = obj._adjust_width;
        }
        if (obj.height === null || obj.height === undefined)
        {
            obj.height = obj._adjust_height;
        }
        obj.right = null;
        obj.bottom = null;
    };

    _pDesignForm._showSubLayout = function (obj, bShow, positionstep)
    {
        if (!(obj instanceof nexacro.Div))
        {
            return false;
        }

        if (bShow)
        {
            // check already shown
            if (this._findSubLayoutMode(obj))
                return false;

            var owner_positionstep = this.get_owner_step_index(obj);
            var step_width = 0;
            if (owner_positionstep == -1)
            {
                step_width = this._inner_form._adjust_width;
            }
            // Show
            var overlay_elem = new nexacro.SubLayoutOverlayElement(this._control_element);
            overlay_elem.setLinkedControl(this); // ?

            overlay_elem.create(nexacro._design_sublayout_overlaycolor);

            var overlay_container_elem = overlay_elem.getContainerElement();

            nexacro.__setElementHandleScale(overlay_container_elem.handle, this._getZoom());

            var pt_offset = [0, 0];
            var div_elem = obj._control_element;
            var owner_elem = div_elem.owner_elem;
            var temp = owner_elem;

            while (temp && temp != this._control_element)
            {
                pt_offset[0] += temp.left;
                pt_offset[1] += temp.top;

                var linkedcontrol = temp.linkedcontrol;
                var border = this._getBorderWidth(linkedcontrol);
                pt_offset[0] += border[0];
                pt_offset[1] += border[1];

                temp = temp.owner_elem;
            };

            var parent_comp = obj.parent;
            var next_comp = null;
            if (parent_comp.all)
            {
                var next_comp_idx = parent_comp.all.indexOf(obj.id) + 1;
                next_comp = parent_comp.all[next_comp_idx];
            }            

            // 2015.03.13 neoarc

            // positionstep = -1로 표시되는 div를 sublayout edit 할때, 어떤 step을 더블클릭했는지 여부
            // 그 자리에 그대로 편집화면을 구성하기 위함.

            // 2015.03.13 neoarc
            // innerform과 overlay와의 offset 차이로
            // positionstep=-1인 div를 sublayout edit 하려고 하면,
            // 복제 node의 이미지가 오른쪽 아래로 약간씩 offset되어 그려진다.
            // 현재 해결책이 마땅치 않아 sublayout edit시 복제 node는 그리지 않기로함.
            nexacro.__setElementHandleFixedStepNode(div_elem.handle, false);

            var sublayoutmode_info = {
                comp: obj,
                elem: div_elem,
                owner_elem: owner_elem,
                next_comp: next_comp,
                overlay_elem: overlay_elem,
                elem_pos: [div_elem.left, div_elem.top],
                offset_pos: [pt_offset[0] + this._scroll_left, pt_offset[1] + this._scroll_top], // show하는 순간 designform이 스크롤이 되어있으면 그만큼 offset 되어있음.
                positionstep: positionstep
            };

            obj._sublayoutmode_info = sublayoutmode_info;
            div_elem._removeFromContainer();
            div_elem._appendToContainer(overlay_container_elem);


            if (this._dot_visible && obj.form)
            {
                this._showDotGrid(obj.form, true);
            }

            var design_form = this;
            obj._design_form = this;
            
            // for scroll, .. etc         

            // showSubLayout
            obj._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight)
            {
                // 1. Step 펼쳐보기에 대한 Offset 기능 추가
                var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);

                nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);
                var bRtl = this._isRtl(this.parent);

                if (this._width != null || (this._right != null && this._left != null))
                    this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;

                if (this._height != null || this._bottom != null)
                    this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;

                var design_form = this._design_form;
                var scale = design_form._getZoom();
                var sublayoutmode_info = this._sublayoutmode_info;
                if (this._left != null || this._right != null)
                {
                    this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;
                    var offset_left = (sublayoutmode_info.offset_pos[0] - design_form._scroll_left) + step_logical_offset;

                    if (owner_positionstep == -1)
                        parentWidth = step_width;
                    var init_positionstep = sublayoutmode_info.positionstep * parentWidth;

                    this._adjust_left_ltr = this._adjust_left = (this._adjust_left + offset_left + init_positionstep);

                    // TODO 
                    if (bRtl)
                        this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
                }

                if (this.top != null || this._bottom != null)
                {
                    this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

                    var offset_top = (sublayoutmode_info.offset_pos[1] - design_form._scroll_top);
                    this._adjust_top = (this._adjust_top + offset_top);
                }

                if (this.left && this.width && this.right)
                {
                    this._right = 0;
                    this.right = null;
                }

                if (this.top && this.height && this.bottom)
                {
                    this._bottom = 0;
                    this.bottom = null;
                }

            };

            obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
            obj.on_update_position(false, true);
            
            // change layer
            if (this._active_editing_form)
                this._showDotGrid(this._active_editing_form, false);

            this._sublayoutmode_stack.push(sublayoutmode_info);
            this._active_editing_form = obj.form;

            nexacro.__setElementHandleOverflowClip(div_elem.handle, true);            
            if (obj.form && obj.form._control_element)
            {
                var inner_element = obj.form._control_element;
                if (inner_element)
                {
                    // Div의 scrollbar가 overflowclip이 풀리면서 나오는 문제가 있으므로 스크롤바를 제거함.          
                    if (obj.form.vscrollbar)
                    {
                        obj.form.vscrollbar.set_visible(false);
                    }
                    if (obj.form.hscrollbar)
                    {
                        obj.form.hscrollbar.set_visible(false);
                    }
                    obj.form._onResetScrollBar = nexacro._emptyFn;
                    nexacro.__setElementHandleOverflowClip(inner_element.handle, true);            
                }
            }
        }
        else
        {
            // Hide
            var _stack = this._sublayoutmode_stack;
            var sublayoutmode_info;
            for (var i = 0; i < _stack.length; i++)
            {
                if (_stack[i].comp == obj)
                {
                    sublayoutmode_info = _stack[i];
                    break;
                }
            }

            // TODO multi depth Sublayout Editing mode
            // TODO 찾아낸 인덱스와 그 이하 모두 종료해야함.
            if (sublayoutmode_info)
            {
                var overlay_elem = sublayoutmode_info.overlay_elem;
                var owner_elem = sublayoutmode_info.owner_elem;
                var elem_pos = sublayoutmode_info.elem_pos;
                var div_elem = sublayoutmode_info.elem;
                var obj = sublayoutmode_info.comp;
                var next_comp = sublayoutmode_info.next_comp;
                div_elem._removeFromContainer();
                if (!next_comp)
                {
                    div_elem._appendToContainer(owner_elem);
                }
                else
                {
                    var next_comp_elem = next_comp._control_element;
                    nexacro.__insertElementHandle(owner_elem.handle, div_elem.handle, next_comp_elem.handle);
                    div_elem.owner_elem = owner_elem;
                }

                if (obj.form && obj.form._control_element)
                {
                    var inner_element = obj.form._control_element;
                    if (inner_element)
                    {
                        nexacro.__setElementHandleOverflowClip(inner_element.handle, false);            
                    }
                }

                nexacro.__setElementHandlePosition(div_elem.handle, elem_pos[0], elem_pos[1]);
                nexacro.__setElementHandleOverflowClip(div_elem.handle, false);

                if (obj.form)
                    this._showDotGrid(obj.form, false);

                overlay_elem._removeFromContainer();
                overlay_elem.destroy();

                _stack.length = _stack.length - 1;

                // change layer
                if (_stack.length > 0)
                {
                    this._active_editing_form = _stack[_stack.length - 1].comp;
                }
                else
                {
                    this._active_editing_form = this._inner_form;
                }

                if (this._active_editing_form)
                    this._showDotGrid(this._active_editing_form, this._dot_visible);

                this._on_update_positionstep(obj);

                // form
                obj._adjustPosition = nexacro.Component.prototype._adjustPosition;

                obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
                obj.on_update_position(false, true);

                // scrollbar      
                if (obj.form) 
                {
                    if (obj.form.vscrollbar)
                    {
                        obj.form.vscrollbar.set_visible(true);
                    }
                    if (obj.form.hscrollbar)
                    {
                        obj.form.hscrollbar.set_visible(true);
                    }
                    obj.form._onResetScrollBar = nexacro.Component.prototype._onResetScrollBar;

                    obj.form.resetScroll();
                }

                // 재생성 및 재정렬
                //var scrollbars = obj.scrollbars;
                //obj.set_scrollbars("none");
                //obj.set_scrollbars(scrollbars);
            }
        }

        return true;
    };

    _pDesignForm.moveComponentToFront = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            obj.bringToFront();
        }
    };

    _pDesignForm.moveComponentToPrev = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            obj.bringToPrev();
        }
    };

    _pDesignForm.moveComponentToNext = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            obj.sendToNext();
        }
    };

    _pDesignForm.moveComponentToBack = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            obj.sendToBack();
        }
    };

    _pDesignForm.getPseudo = function (compid)
    {
        var obj = this._getChild(compid);
        if (obj)
        {
            return obj._status;
        }
    };

    _pDesignForm.setPseudo = function (compid, pseudo)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            //trace("_pDesignForm.setPseudo(" + obj.name + ", " + pseudo + ")");

            // disabled인 경우 status가 먼저 바뀌어있어야 함.
            //obj._stat_change(pseudo == "disabled" ? "disable" : "enable", pseudo);     
            obj._changeStatus(pseudo, true);

            //obj.setCurrentPseudo(pseudo);                        
            if (obj._status == pseudo)
                return true;
        }

        return false;
    };

    _pDesignForm.addLayout = function (compid, layoutname, width, height, screenid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return false;
        }

        if (obj._default_layout == null && layoutname != "default")
        {
            // default layout이 먼저 생성되어야 한다.
            trace("not found default layout in " + obj.name);
            return false;
        }

        // TODO chcek addLayout시 _application의 screen이 있으면 Layout이 필터링됨
        var layout = new Layout(layoutname, screenid, width, height, obj, function (p) { });
        obj.addLayout(layout.name, layout);

        return true;
    };

    _pDesignForm.removeLayout = function (compid, layoutname)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return false;
        }

        // Restore current layout
        if (obj._current_layout_name == layoutname)
        {
            // TODO : default Layout으로 change
            // 어떻게?
            obj._current_layout_name = "";
        }

        if (layoutname == "default")
        {
            // default는 remove 제외 2014.05.29 neoarc
            //obj._default_layout = null;
            return false;
        }
        else
        {
            obj._layout_list.delete_item(layoutname);
        }

        return true;
    };

    _pDesignForm.removeAllLayout = function (compid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return false;
        }

        obj._current_layout_name = "";

        // default는 remove 제외 2014.05.29 neoarc
        //obj._default_layout = null;

        obj._layout_list.clear();

        return true;
    };

    _pDesignForm.setLayoutProperty = function (compid, layoutname, propid, propval)
    {
        // trace("_pDesignForm.setLayoutProperty(" + compid + ", " + layoutname + ", " + propid + ", " + propval + ")");
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return;
        }

        var layout = this._getLayout(obj, layoutname);
        if (!layout)
        {
            // 에러?
            return;
        }

        // default layout 이름 변경 허용?
        if (propid == "name" && layoutname == "default")
            return;

        // value type은 meta info를 통해 정확히 넣어야 함.
        if (layout["set_" + propid])
            layout["set_" + propid](propval);

        if (propid == "stepcount")
        {
            // TODO 현재 편집중인 최상 layer인 경우에만.. (div 모드이면 div)
            this._refreshStepContainer(obj, layout.stepcount);
        }

        if (propid == "name" && layoutname != "default")
        {
            var idx = obj._layout_list.indexOf(layoutname);
            obj._layout_list.update_id(idx, propval);
        }

        //trace("setLayoutProperty - " + propid + " : " + layout[propid])
        return layout[propid];
    };

    _pDesignForm.getLayoutProperty = function (compid, layoutname, propid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return;
        }

        // TODO
        var layout = this._getLayout(obj, layoutname);
        if (!layout)
        {
            // 에러?
            return;
        }

        return layout[propid];
    };

    // Tool에서 강제로 Layout 변환시 호출
    _pDesignForm.changeLayout = function (compid, layoutname)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return false;
        }

        // changeLayout 인터페이스를 거치지 않고 Property만 세티아고 있기 때문에 현재 어떤 Layout 인지 알수가 없다.
        // 1. Current Layout 정보를 DesignForm이 알수 있게 작업을 하거나
        // 2. LayoutProperty 세팅시 현재 Layout 일것으로 가정하거나
        obj._current_layout_name = layoutname;

        // TODO : 에러처리
        var layout = this._getLayout(layoutname);
        if (!layout)
        {
            // 에러?
            return false;
        }

        var layout_manager = nexacro._getLayoutManager();
        layout_manager.changeLayout(obj, layout);

        return true;
    };

    _pDesignForm.getCurrentLayout = function (compid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        return this._getCurrentLayout(obj);
    };

    _pDesignForm._getCurrentLayout = function (obj)
    {
        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return;
        }
        return obj._current_layout_name;
    };

    _pDesignForm.setAutoLayoutChange = function (compid, is_auto)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        return this._setAutoLayoutChange(obj, is_auto);
    };



    _pDesignForm._setAutoLayoutChange = function (obj, is_auto)
    {
        if (!(obj instanceof nexacro.Form))
        {
            // 에러?
            return;
        }

        // TODO flag처리?
        obj._auto_layoutchange = is_auto;

        if (is_auto)
        {
            obj._checkValidLayout = nexacro.FormBase.prototype._checkValidLayout;
        }
        else
        {
            obj._checkValidLayout = function ()
            {
                return obj._current_layout_name;
            };
        }
    };

    // 140617 박현진 : 현재 size에 맞는 layout으로 change
    _pDesignForm.refreshLayout = function (compid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        var pManager = nexacro._getLayoutManager();
        if (pManager)
        {
            var xy = { cx: obj._adjust_width, cy: obj._adjust_height };
            var new_idx = pManager.checkValid(obj, xy);

            if (new_idx > -1)
            {
                new_layout = obj._layout_list[new_idx];
                if (new_layout)
                {
                    var len = obj.all.length;
                    for (var i = 0; i < len; i++)
                    {
                        if (obj.all[i]._is_form && obj.all[i]._layout_list.length > 0)
                        {
                            obj.all[i]._checkValidLayout(xy);
                        }
                    }
                    pManager.loadLayout(obj, obj._default_layout, new_layout);

                    var win = this._getWindow();
                    var frame = this.getOwnerFrame();
                    var designform = frame.form;
                    var extra_info = this._getScopeName(obj) + ":" + new_layout.name;

                    nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_layoutchange, designform.id, extra_info);

                    if (obj._is_scrollable)
                    {
                        obj.resetScroll();
                    }
                }
            }
        }
    };

    _pDesignForm.recalcLayout = function (compid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (obj.resetScroll)
            obj.resetScroll();

    };

    _pDesignForm.refreshLinkedUrl = function (compid)
    {        
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (obj.on_apply_url)
        {
            obj.on_apply_url();
        }
    };


    _pDesignForm.getControlElementHandle = function (compid)
    {
        var obj = this._getObject(compid);
        if (obj && obj._control_element && obj._control_element.handle)
        {
            return obj._control_element.handle;
        }
        return null;
    };

    // 140529 박현진 : contents load
    _pDesignForm.setContents = function (compid, contents)
    {
        //trace("_pDesignForm.setContents(" + compid + ", " + contents + ")");
        var obj = this._getObject(compid);
        if (!obj || !obj._setContents)
            return;

        // TODO : 기존 값을 날려버리고 설정되어야 한다.        
        obj._setContents(contents);
    };

    _pDesignForm.setFormats = function (compid, contents)
    {
        var obj = this._getObject(compid);
        if (!obj || !obj.set_formats)
            return;

        obj.set_formats(contents);
    };

    // 140602 박현진 : innerdataset load
    _pDesignForm.setInnerDataset = function (compid, value, extern)
    {
        var obj = this._getObject(compid);
        if (!obj || !obj.set_innerdataset)
            return;

        // 현재 innerdataset을 사용중이라면 해당 object를 삭제해야한다.
        if (obj.innerdataset == "innerdataset")
        {
            var innerdataset = obj._innerdataset;
            delete innerdataset

            obj._innerdataset = null;
            obj.innerdataset = "";
        }

        if (extern)
        {
            obj.set_innerdataset(value);
        }
        else
        {
            //var innerdatasetid = obj.id + "_innerdataset";
            var innerdatasetid = "innerdataset";
            var innerdataset = new nexacro.NormalDataset(innerdatasetid, obj);
            innerdataset._setContents(value);

            if (obj.set_innerdataset)
                obj.set_innerdataset(innerdataset);
            else
            {
                trace("obj(" + obj + ":" + obj.name + ") have no method set_innerdataset!!!");
            }
        }
    };

    _pDesignForm.setInitValueID = function (compid, value)
    {
        var obj = this._getObject(compid);
        if (obj)
        {
            nexacro._setInitValueID(obj, value);
        }
    };

    _pDesignForm.callDesignMethod = function (compid, methodname)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return false;

        return eval("obj." + methodname + "();");
    };

    // TODO check Command형태로 바뀌어야함 하드코딩 메소드는 제거하는게 맞을듯? 2014.06.19 neoarc
    _pDesignForm.setActiveTabpage = function (compid, index)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (obj instanceof nexacro.Tab)
        {
            trace("set_tabindex : " + index);
            obj.set_tabindex(index);
        }
    };

    _pDesignForm.insertTabpage = function (compid, index, tabpageid)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (obj instanceof nexacro.Tab)
        {
            obj.insertTabpage(tabpageid, index, "", tabpageid);
        }
    };

    _pDesignForm.deleteTabpage = function (compid, index)
    {
        var obj = this._getObject(compid);
        if (!obj)
            return;

        if (obj instanceof nexacro.Tab)
        {
            obj.deleteTabpage(index);
        }
    };

    _pDesignForm.setCssList = function (csslist)
    {
        // 16.03.04 박현진 : 현재 사용 못함..
        return;

        // csslist = ["xxx.xtheme", "aaa.css", "bbb.css"]
        //trace("_pDesignForm.setCssList( " + csslist + " )");

        // DesignForm이하 모든 컴포넌트의 style을 초기화
        this._clearStyles();

        // csslist의 css를 모두 로드

        // ver2; Cache
        this._css_context_list = [];
        this._find_csslist = []; // context._css_selectors의 array

        // TODO check LoadManager의 캐쉬는 사용하지 않음.
        _application._load_manager.localList = [];
        _application._load_manager.localCnt = 0;

        for (var i = 0; i < csslist.length; i++)
        {
            var cssurl = csslist[i];
            var css_context = nexacro._getDesignCssContext(cssurl);
            if (!css_context)
            {
                trace("> Not Cached: " + cssurl);
                css_context = new nexacro.DesignCssContext(cssurl);
                if (cssurl.indexOf(".xtheme") > 0)
                    nexacro._loadTheme2(cssurl, css_context);
                else
                    nexacro._loadCss2(cssurl, css_context);

                nexacro._addDesignCssContext(css_context);
            }
            else
            {
                trace("> Cached: " + cssurl);
            }

            // insert first (find csslist는 parent로 탐색하며 push 함)
            this._css_context_list.push(css_context);
            this._find_csslist.unshift(css_context._css_selectors);
        }

        // Step Container에 적용되도록
        var obj = this._getObject("this");
        if (obj)
        {
            if (obj._control_element && obj._control_element._step_containers && obj._control_element._step_containers.length > 0)
            {
                this._updateStepContainerStyle(obj._control_element, 0xffffffff);
            }
        }

        var cur_theme_uri = nexacro._theme_uri;
        this.setActive();

        this._refreshStyles();
        this._notifyChangedStyles();
    };

    _pDesignForm.setActive = function ()
    {
        if (!this._css_context_list || this._css_context_list.length <= 0)
            return;

        var _item = this._css_context_list[0];
        if (_item instanceof nexacro.DesignCssContext)
        {
            if (_item._theme_uri !== undefined)
            {
            	// _application._theme_uri = _item._theme_uri;
            	nexacro._theme_uri = _item._theme_uri;
            }
        }
    };

    _pDesignForm.setThemeUri = function (themename)
    {
        // TODO : themeuri가 변경되고 처리해야 할 일
        // 이전에 적용된 image 들 교체

        // lym. 16.6.10, runtime http 통신을 태우기 위한 문자열 추가
        if (typeof themename == "string")
        {
            if (themename[0] == "\\" || themename[2] == "\\" ||
                themename[0] == "/" || themename[2] == "/")
                    themename = "file://" + themename;
        } 

        // 이후에 참조할 image 경로 교체
        nexacro._theme_uri = themename;

        this.drawWindow();
    };

    _pDesignForm._clearStyles = function (comp)
    {
        if (comp === undefined)
            comp = this;
        else if (comp === null)
            return;

        //trace("ClearStyle: " + comp.name);

        if (comp instanceof nexacro.DesignForm)
        {
            //comp._find_csslist = null;
            //comp._css_finder = null;
            //comp._cssfinder_cache = {};

            this._clearStyles(comp._inner_form);
        }
        else if (comp instanceof nexacro.FormBase)
        {
            //comp._find_csslist = null;
            //comp._css_finder = null;
            //comp._cssfinder_cache = {};

            var len = comp.components.length;
            for (var i = 0; i < len; i++)
            {
                this._clearStyles(comp.components[i]);
            }
        }

        //?
        // comp.currentstyle = comp.on_create_custom_currentStyle();

        //comp._css_finder = null;
        //comp._ref_css_finder = null;

        var subcontrols = this._getSubControlList(comp);
        var len = subcontrols.length;
        for (var i = 0; i < len; i++)
        {
            var control = subcontrols[i];
            this._clearStyles(control);
        }
    };

    _pDesignForm._refreshStyles = function (comp)
    {
        if (comp === undefined)
            comp = this;
        else if (comp === null)
            return;

        // 강제 업데이트
        comp._control_pseudo = -1;//undefined;
        comp._updateControl(comp._control_element, comp._pseudo);

        // lym
        //comp._updateContents(comp._control_element, comp._pseudo);
        //comp.on_apply_pseudo("");
        //comp.on_apply_pseudo("mouseover");
        //comp.on_apply_pseudo("normal");


        //trace("_pDesignForm._refreshStyles(" + comp + " / " + comp.name + ")");

        // 재귀호출
        if (comp instanceof nexacro.DesignForm)
        {
            this._refreshStyles(comp._inner_form);
        }
        else if (comp instanceof nexacro.FormBase)
        {
            var len = comp.components.length;
            for (var i = 0; i < len; i++)
            {
                this._refreshStyles(comp.components[i]);
            }
        }

        var subcontrols = this._getSubControlList(comp);
        var len = subcontrols.length;
        for (var i = 0; i < len; i++)
        {
            var control = subcontrols[i];
            this._refreshStyles(control);
        }
    };

    _pDesignForm._notifyChangedStyles = function ()
    {
        // 화면 갱신
        this.drawWindow();

        // style property 정보 갱신        
        var win = this._getWindow();
        if (win && win.handle)
        {
            nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_refresh_properties, this.name, null);
        }
    };

    //---------------------------------------------------------------
    // Methods internal
    //---------------------------------------------------------------



    // 속성 적용 후, 디자인을 위한 특수처리
    _pDesignForm._on_update_property = function (obj, propid)
    {
        if (!obj || !propid)
            return;

        switch (propid)
        {
            case "name":
                obj.id = obj.name;
                if (obj != this._inner_form)
                {
                    var parent = obj.parent;
                    var comps = this._getChilds(parent);
                    var comp_len = comps.length;
                    for (var i = 0; i < comp_len; i++)
                    {
                        var comp = comps[i];
                        if (comp.name == obj.name)
                        {
                            trace(" >> " + comps.get_id(i) + " -> " + comp.name);
                            parent[comps.get_id(i)] = null;
                            parent[obj.name] = obj;

                            comps.update_id(i, obj.name);
                            break;
                        }
                    }
                }
                break;
            case "positionstep":
                this._on_update_positionstep(obj);
                break;

            case "left":
            case "top":
            case "width":
            case "height":
            case "right":
            case "bottom":
                {
                    if (obj.parent && obj.parent.resetScroll)
                        obj.parent.resetScroll();
                }
                break;
        }

        // style이면 .... step container 업데이트
        if (obj._control_element && obj._control_element._step_containers && obj._control_element._step_containers.length > 0)
        {
            switch (propid)
            {
                case "border":
                case "borderRadius":
                    this._updateStepContainerStyle(obj._control_element, 0x01);
                    break;
                case "background":
                    this._updateStepContainerStyle(obj._control_element, 0x02);
                    break;
                case "color":
                    this._updateStepContainerStyle(obj._control_element, 0x04);
                    break;
                case "opacity":
                    this._updateStepContainerStyle(obj._control_element, 0x08);
                    break;
            }
        }
    };

    _pDesignForm._on_update_positionstep = function (obj)
    {
        //trace(this._getScopeName(obj) + "._on_update_positionstep");
        var parent = obj.parent;
        if (parent)
        {
            var parent_elem = parent._control_element;
            if (parent_elem && parent_elem._step_containers && parent_elem._step_containers.length > 0)
            {
                var elem = obj._control_element;
                var elem_handle = elem ? elem.handle : null;
                
                if (obj.positionstep == -1)
                {
                    nexacro.__setElementHandleFixedStepNode(elem_handle, true);
                    nexacro.__setElementHandleStepCount(elem_handle, parent_elem._step_containers.length + 1);
                    nexacro.__setElementHandleStepWidth(elem_handle, parent._adjust_width);
                }
                else
                {
                    nexacro.__setElementHandleFixedStepNode(elem_handle, false);
                }
            }
            else
            {
                var elem = obj._control_element;
                var elem_handle = elem ? elem.handle : null;

                nexacro.__setElementHandleFixedStepNode(elem_handle, false);
            }

            obj._adjustPosition(obj.left, obj.top, obj.right, obj.bottom, obj.width, obj.height, parent._adjust_width, parent._adjust_height);
            obj.on_update_position(false, true);
        }
    };

    _pDesignForm._hitTestByPoint = function (obj, x, y)
    {
        if (obj)
        {
            var control_elem = obj._control_element;
            if (control_elem)
            {
                var elem = control_elem;
                while (elem)
                {
                    if (elem._design_visible === false)
                        return false;
                    elem = elem.parent_elem;
                }
            }

            var rect = this._getClientRect(obj);
            if (rect[0] <= x && x <= rect[0] + rect[2] &&
                rect[1] <= y && y <= rect[1] + rect[3])
                return true;
        }

        return false;
    };

    // type 0 : select all
    // type 1 : select part
    // type 2 : child check (obj안에 rect가 포함되는가)
    _pDesignForm._hitTestByRect = function (obj, left, top, right, bottom, type)
    {
        if (obj)
        {
            var control_elem = obj._control_element;
            if (control_elem)
            {
                var elem = control_elem;
                while (elem)
                {
                    if (elem._design_visible === false)
                        return false;
                    elem = elem.parent_elem;
                }
            }

            var rect = this._getClientRect(obj);
            var _left = rect[0];
            var _right = rect[0] + rect[2];
            var _top = rect[1];
            var _bottom = rect[1] + rect[3];
            if (type == 0)
            {
                if (left <= _left && _right <= right &&
                    top <= _top && _bottom <= bottom)
                    return true;
            }
            else if (type == 1)
            {
                if (left > _right)
                    return false;

                if (top > _bottom)
                    return false;

                if (right < _left)
                    return false;

                if (bottom < _top)
                    return false;

                return true;
            }
            else if (type == 2)
            {
                if (left >= _left && _right >= right &&
                     top >= _top && _bottom >= bottom)
                    return true;
            }

        }

        return false;
    };

    _pDesignForm._getClientRect = function (obj)
    {
        //var rectbyroot = [obj._adjust_left, obj._adjust_top, obj._adjust_width, obj._adjust_height];
        var _adjust_left = obj._adjust_left;
        var _adjust_top = obj._adjust_top;
        var _adjust_width = obj._adjust_width;
        var _adjust_height = obj._adjust_height;

        var sublayoutmode_info = this._findSubLayoutMode(obj);
        if (sublayoutmode_info)
        {
            _adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
            _adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
        }

        var parent = obj.parent;
        while (parent && parent != this)
        {
            _adjust_left += parent._adjust_left;
            _adjust_top += parent._adjust_top;

            // border
            var border = this._getBorderWidth(parent);
            _adjust_left += border[0];
            _adjust_top += border[1];

            if (parent instanceof nexacro.Div)
            {
                sublayoutmode_info = this._findSubLayoutMode(parent);
                if (sublayoutmode_info)
                {
                    _adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
                    _adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
                }
            }

            parent = parent.parent;
        }

        // zoom 적용.
        var scale = this._getZoom() / 100;

        _adjust_left *= scale;
        _adjust_top *= scale;
        _adjust_width *= scale;
        _adjust_height *= scale;

        _adjust_left = parseInt(_adjust_left);
        _adjust_top = parseInt(_adjust_top);
        _adjust_width = parseInt(_adjust_width);
        _adjust_height = parseInt(_adjust_height);

        return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
    };

    _pDesignForm._recalcDesignLayout = function (recalc_innerform, recalc_sublayout)
    {
        var form = this._inner_form;
        if (recalc_innerform !== false && form)
        {
            // design요소에 의한 offset은 _adjustPosition에서 처리하고 여기에서는 업데이트만 처리
            form.move(0, 0, form.width, form.height);
            form.on_update_position(false, true);
        }

        var _stack = this._sublayoutmode_stack;
        if (recalc_sublayout !== false && _stack.length > 0)
        {
            for (var i = 0; i < _stack.length; i++)
            {
                var comp = _stack[i].comp;
                comp.move(comp.left, comp.top, comp.width, comp.height, comp.right, comp.bottom);
                comp.on_update_position(false, true);
            }
        }

        // sublayout edit 상태에서 form 이동시 overlayelement 위치 갱신 안되는 현상 수정
        if (this._active_editing_form && this._is_sub_layout_editting())
        {
            var active_sublayout = this._active_editing_form;
            var positionstep = active_sublayout._sublayoutmode_info.positionstep;

            this._showSubLayout(active_sublayout, false);
            this._showSubLayout(active_sublayout, true, positionstep);
            active_sublayout = null;
        }
        // TODO option처리
        this._recalcStepContainer(form);
    };

    _pDesignForm._getNextChildID = function (parent, classname)
    {
        if (!parent || !classname)
        {
            trace("parent or classname is missing");
            return "error";
        }

        var names = classname.split('.');
        if (names[0] == "nexacro")
        {
            names.splice(0, 1);
        }

        var prefix = names.join("_");

        var nextnum = 0;
        var nextid;
        while (true)
        {
            nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
            if (!parent[nextid])
                break;
            nextnum++;
        }

        return nextid;
    };

    _pDesignForm._changeChildID = function (oldid, newid, obj)
    {
        var idx = this.all.indexOf(oldid);
        if (idx < 0) return;
        this.all.update_id(idx, newid);

        idx = this.components.indexOf(oldid);
        if (idx >= 0)
        {
            this.components.update_id(idx, newid);
        }

        idx = this.objects.indexOf(oldid);
        if (idx >= 0) return;
        {
            this.objects.update_id(idx, newid);
        }

        idx = this.binds.indexOf(oldid);
        if (idx >= 0) return;
        {
            this.binds.update_id(idx, newid);
        }

        delete this[oldid];
        this[newid] = obj;

    };

    // 140618 박현진 : child list 얻어오는 함수
    _pDesignForm._getChilds = function (obj)
    {
        if (!obj)
            return null;

        if (obj instanceof nexacro.Tab)
        {
            return obj.tabpages;
        }
        else if (obj instanceof nexacro.Form)
        {
            return obj.components;
        }
        else if (obj.form)
        {
            return obj.form.components;
        }

        return null;
    };

    _pDesignForm._getChild = function (childname)
    {
        if (childname == "" || childname == undefined || childname == "this")
            return this._inner_form;

        return eval("this._inner_form." + childname);
    };

    _pDesignForm._getChildList = function (obj)
    {
        if (obj instanceof nexacro.Tab)
        {
            return obj.tabpages;
        }
        else if (obj instanceof nexacro.Form)
        {
            return obj._child_list;
        }
        else if (obj.form)
        {
            return obj.form._child_list;
        }

        return null;
    }

    _pDesignForm._getObject = function (name)
    {
   // 	trace("DesignForm._getObject :" + name);
    
        if (!name || name == "this")
        {
            return this._inner_form;
        }

        if (name.substring(0, 4) == "this.")
        {
    //    	alert("DesignForm._getObject:"+name);
        	name = name.substring(5);
        	
        }
        
        var obj = eval("this._inner_form." + name);
        // 엉뚱한 대상을 넘겨주면 안됨.
        /*
        if (!obj)
        {
            //trace("not found object : this._inner_form." + name);
            obj = this._inner_form;
        }
        */

        return obj;
    };

    _pDesignForm._getInlineStyleValue = function (comp)
    {
        // inline style 값 전체 리턴
        var str = "";

        // normal style
        var _style = comp.style;
        if (_style)
        {
            var _pStyle = nexacro.Style.prototype;
            for (prop in _style)
            {
                if (prop[0] == "_")
                    continue;
                if (typeof (_style[prop]) == "function")
                    continue;
                if (_style[prop] == null)
                    continue;
                if (_pStyle[prop] == _style[prop]) // rtlimagemirroring 때문에 임시
                    continue;
                str += prop + ": " + _style[prop]._value + "; ";
            }
        }

        // Pseudo style value
        var pseudo_styles = comp._styles;
        if (pseudo_styles)
        {
            for (pseudo_style in pseudo_styles)
            {
                if (pseudo_style[0] == "_")
                    continue;
                if (pseudo_style == "normal") // tabpage 버그 임시
                    continue;
                _style = pseudo_styles[pseudo_style];
                str += ":" + pseudo_style + " { ";
                for (prop in _style)
                {
                    if (prop[0] == "_")
                        continue;
                    if (typeof (_style[prop]) == "function")
                        continue;
                    if (_style[prop] == null)
                        continue;
                    str += prop + ": " + _style[prop]._value + "; ";
                }
                str += " }; ";
            }
        }

        return str;
    };

    //this 를 제외한 Div00.button00 형태 
    _pDesignForm._getScopeName = function (comp)
    {
        if (comp instanceof nexacro.DesignForm)
        {
            return;
        }

        if (comp == this._inner_form)
        {
            return "this";
        }

        var parent = comp.parent;
        var fullname = [];

        fullname.push(comp.id);
        while (parent && parent != this && parent != this._inner_form)
        {
            if (parent instanceof nexacro._InnerForm)
            {
                // innerform은 생략한다.
            }
            else
            {
                fullname.push(parent.id);
            }
            
            parent = parent.parent;
        }

        fullname.reverse();
        return fullname.join(".");
    };

    //this 를 제외한 Div00.form.button00 형태 
    _pDesignForm._getChildName = function (comp)
    {
        if (comp instanceof nexacro.DesignForm)
        {
            return;
        }

        if (comp == this._inner_form)
        {
            return "this";
        }

        var parent = comp.parent;
        var fullname = [];

        fullname.push(comp.id);
        while (parent && parent != this && parent != this._inner_form)
        {
            if (parent instanceof nexacro._InnerForm)
            {
                fullname.push("form");
            }
            else
            {
                fullname.push(parent.id);
            }

            parent = parent.parent;
        }

        fullname.reverse();
        return fullname.join(".");
    };

    // comp가 urlload 된 form의 자손인지 확인후 최상위의 urlload component 리턴
    _pDesignForm._findURlLoadedAncestor = function (comp)
    {
        if (!comp)
            return null;

        var found_comp = null;
        while (comp)
        {
            if (comp == this._inner_form)
                break;

            // TODO check Url load인지 확실하게 알 방법이 없어보이는데.
            if (comp instanceof nexacro.Div && comp._url)
                found_comp = comp;
            comp = comp.parent;
        }

        return found_comp;
    };

    // String으로 Style Property를 Append Merge한다.
    _pDesignForm._appendInlineStyleValue = function (base_value, append_value)
    {
        // Base   = "a:olda; b:oldb; :focused{b:b; } "
        // Append = "a:newa; c:c; :focused{b:bb; d:d } :mouseover{e:e; } "
        // Result = "a:newa; b:oldb; c:c; :focused{ b:bb; d:d; } :mouseover{ e:e; } "
        base_value = nexacro._decodeXml(base_value);
        append_value = nexacro._decodeXml(append_value);

        var base_styles = this._parseInlineStyleValue(base_value);
        var append_styles = this._parseInlineStyleValue(append_value);

        // 1) 같이 존재하는 pseudo
        for (var pseudo in base_styles)
        {
            if (!append_styles[pseudo])
                continue;

            // a=a, b=b 형태의 array
            var base_tokens = base_styles[pseudo].split(";");
            var append_tokens = append_styles[pseudo].split(";");

            // {a:a, b:b} 형태의 json으로 변환과 동시에 append
            var base_style = this._parseStyleToken(base_tokens);
            var append_style = this._parseStyleToken(append_tokens, base_style);

            // json to string
            var append_str = "";
            for (var prop in append_style)
                append_str += prop + ":" + append_style[prop] + "; ";

            base_styles[pseudo] = append_str;
        }

        // 2) append에만 있는 pseudo
        for (var pseudo in append_styles)
        {
            if (base_styles[pseudo])
                continue;

            base_styles[pseudo] = append_styles[pseudo];
        }

        // to string
        var ret = "";
        for (var pseudo in base_styles)
        {
            if (pseudo == "normal")
            {
                ret += base_styles[pseudo];
            }
            else
            {
                ret += ":" + pseudo + "{ " + base_styles[pseudo] + "} ";
            }
        }

        return ret;
    };

    // [ a:a, b:b, c:c ]
    // array to json
    _pDesignForm._parseStyleToken = function (v, source_obj)
    {
        var ret = source_obj ? source_obj : {};
        for (var i = 0; i < v.length; i++)
        {
            var name_and_value = v[i].split(":");
            var name = name_and_value[0].trim();

            // check dummy
            if (name == "" && name_and_value.length == 1)
                continue;

            var value = name_and_value[1].trim();
            ret[name] = value;
        }

        return ret;
    };

    _pDesignForm._parseInlineStyleValue = function (v)
    {
        var v = nexacro._decodeXml(v);
        var blocks = v.split("}");
        var s = blocks[0].trim();

        var _styles = {};
        blocks.pop();

        var i, len = blocks.length;
        var definition_block, pseudo, normal_style;

        definition_block = s.split("{");
        normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

        if (normal_style.length == 0)
            normal_style = definition_block[0].substring(0, definition_block[0].length).trim();

        _styles["normal"] = normal_style;
        if (len > 0)
        {
            for (i = 0; i < len; i++)
            {
                definition_block = blocks[i].split("{");
                pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
                _styles[pseudo] = definition_block[1];
            }
        }
        return _styles;
    };

    // left top width height right bottom 사용가능
    // px <-> % 유닛 스왑
    _pDesignForm._swapPositionUnit = function (obj, pos, unit)
    {
        // 150805 박현진 : unit이 auto일 경우 이쪽을 타지 않아야 한다.
        // _pDesignForm.swapPositionUnit() 에서 처리되어야 함.
        if (unit == "auto")
            return;

        if (pos != "left" && pos != "top" && pos != "width" && pos != "height" && pos != "right" && pos != "bottom")
            return;

        // 값이 없는 경우 swap할 필요가 없음
        if (obj[pos] === null)
            return;

        var parent = obj.parent;
        if (!parent)
            return;

        var parent_size;

        var root_form = obj._getRootForm();
        var owner_positionstep = this.get_owner_step_index(obj);
        var step_width = 0;
        if (owner_positionstep > 0 && obj.parent == root_form)
        {
            step_width = this._inner_form._adjust_width;
        }

        if (pos == "left" || pos == "width" || pos == "right")
            parent_size = parent._control_element.client_width;
        else
            parent_size = parent._control_element.client_height;


        var adjust_pos;
        var _left = obj._adjust_left - owner_positionstep * step_width;

        var base_comp;
        if (pos == "left")
        {
            if (obj._leftbase_component_id)
            {
                base_comp = obj._getFormChildById(obj._leftbase_component_id);
                if (base_comp)
                {
                    if (obj._leftbase_position_type == "right")
                        _left -= base_comp._adjust_left + base_comp._adjust_width;
                    else
                        _left -= base_comp._adjust_left;
                    parent_size = base_comp._adjust_width;
                }
            }
            adjust_pos = _left;
        }
        else if (pos == "top")
        {
            adjust_pos = obj._adjust_top;
            if (obj._topbase_component_id)
            {
                base_comp = obj._getFormChildById(obj._topbase_component_id);
                if (base_comp)
                {
                    if (obj._topbase_position_type == "bottom")
                        adjust_pos -= base_comp._adjust_top + base_comp._adjust_height;
                    else
                        adjust_pos -= base_comp._adjust_top;
                    parent_size = base_comp._adjust_height;
                }
            }
        }
        else if (pos == "right")
        {
            adjust_pos = parent_size - (obj._adjust_width + _left);
            if (obj._rightbase_component_id)
            {
                base_comp = obj._getFormChildById(obj._rightbase_component_id);
                if (base_comp)
                {
                    if (obj._rightbase_position_type == "left")
                        adjust_pos -= parent_size - base_comp._adjust_left;
                    else
                        adjust_pos -= parent_size - base_comp._adjust_left - base_comp._adjust_width;
                    parent_size = base_comp._adjust_width;
                }
            }
        }
        else if (pos == "bottom")
        {
            adjust_pos = parent_size - (obj._adjust_height + obj._adjust_top);
            if (obj._bottombase_component_id)
            {
                base_comp = obj._getFormChildById(obj._bottombase_component_id);
                if (base_comp)
                {
                    if (obj._bottombase_position_type == "top")
                        adjust_pos -= parent_size - base_comp._adjust_top;
                    else
                        adjust_pos -= parent_size - base_comp._adjust_top - base_comp._adjust_height;
                    parent_size = base_comp._adjust_height;
                }
            }
        }
        else if (pos == "width")
        {
            adjust_pos = obj._adjust_width;
            if (obj._widthbase_component_id)
            {
                base_comp = obj._getFormChildById(obj._widthbase_component_id);
                if (base_comp)
                {
                    parent_size = base_comp._adjust_width;
                }
            }
        }
        else if (pos == "height")
        {
            adjust_pos = obj._adjust_height;
            if (obj._heightbase_component_id)
            {
                base_comp = obj._getFormChildById(obj._heightbase_component_id);
                if (base_comp)
                {
                    parent_size = base_comp._adjust_height;
                }
            }
        }
        else
        {
            adjust_pos = eval("obj._adjust_" + pos);
        }

        // 150805 박현진 : 현재 property 설정값을 무시하고 unit에 따라서 값 변경
        if (unit == "px")
        {
            // ??? --> px
            var new_prop_val = adjust_pos;

            if (pos == "right")
            {
                //adjust_pos = parent_size - (obj._adjust_width + _left);
                trace("_pDesignForm._swapPositionUnit, id=" + obj.id + ", parent_size=" + parent_size + ", obj._adjust_width=" + obj._adjust_width + ", _left=" + _left + ", new_prop_val=" + new_prop_val);
            }

            eval("obj.set_" + pos + "(" + new_prop_val + ");");

        }

        else
        {
            // ??? --> %
            var new_prop_val = nexacro.round((adjust_pos * 100) / parent_size, 2);

            if (pos == "right")
            {
                //adjust_pos = parent_size - (obj._adjust_width + _left);
                trace("_pDesignForm._swapPositionUnit, id=" + obj.id + ", parent_size=" + parent_size + ", obj._adjust_width=" + obj._adjust_width + ", _left=" + _left + ", new_prop_val=" + new_prop_val);
            }

            eval("obj.set_" + pos + "(" + new_prop_val + " + '%');");


        }
    };

    _pDesignForm._findSubLayoutMode = function (obj)
    {
        if (obj instanceof nexacro.Div)
        {
            for (var i = 0; i < this._sublayoutmode_stack.length; i++)
            {
                if (obj == this._sublayoutmode_stack[i].comp)
                {
                    return this._sublayoutmode_stack[i];
                }
            }
        }
    };

    _pDesignForm._getLayout = function (obj, layoutname)
    {
        if (!obj)
            return;

        if (!layoutname || layoutname == "" || layoutname == "default")
            return obj._default_layout;
        else
            return obj._layout_list[layoutname];
    };

    // stepcount에 맞게 container element 생성/파괴
    _pDesignForm._refreshStepContainer = function (obj, stepcount)
    {
        if (!obj)
            return;

        var win = this._getWindow();
        if (!win || !win.handle) return;

        if (this._active_editing_form != obj)
            return;

        var control_elem = obj._control_element;
        if (!control_elem)
            return;

        if (!control_elem._step_containers)
            control_elem._step_containers = [];

        var list = control_elem._step_containers;
        var list_len = list.length;
        if (list_len + 1 < stepcount)
        {
            // 생성
            var parent_elem = control_elem.parent_elem;
            var width = obj._adjust_width;
            var height = obj._adjust_height;
            for (var i = list_len; i < stepcount - 1; i++)
            {
                var elem = new nexacro.ScrollableControlElement(parent_elem);
                elem.setLinkedControl(this);

                elem.setElementTypeCSSSelector(this.on_get_css_assumedtypename());
                elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
                elem.setElementSize(width, height);

                elem.create(win);
                list.push(elem);

                parent_elem.sendToBackElement(elem);

                nexacro.__setElementHandleDotSize(elem.handle, this._dot_size_x, this._dot_size_y);
                nexacro.__setElementHandleDotStyle(elem.handle, this._dot_style);
                nexacro.__setElementHandleDotVisible(elem.handle, this._dot_visible);

                // TODO step관련 element api 호출
                // nexacro.__setElementHandleStepLine(...)
            }
        }
        else if (list_len > stepcount - 1)
        {
            // 삭제
            for (var i = list_len - 1; i >= stepcount - 1 && i >= 0; i--)
            {
                var elem = list[i];
                elem.destroy();
                list[i] = null;
                delete elem;
            }
            list.length = Math.max(0, stepcount - 1);
        }

        // 컴포넌트 세팅값도 갱신
        var comps = obj.components
        var comps_len = comps ? comps.length : 0;
        for (var i = 0; i < comps_len; i++)
        {
            this._on_update_property(comps[i], "positionstep");
        }

        // Z-order 갱신
        {
            var parent_elem = control_elem.parent_elem;
            for (var i = 0; i < stepcount - 1; i++)
            {
                var elem = list[i];
                parent_elem.sendToBackElement(elem);
            }
        }
        this._updateStepContainerStyle(control_elem, 0xffffffff);
    };

    _pDesignForm._recalcStepContainer = function (obj)
    {
        if (!obj)
            return;

        var control_elem = obj._control_element;

        var list = control_elem?control_elem._step_containers:null;
        if (!list || list.length < 1)
            return;

        var parent_elem = control_elem.parent_elem;
        var width = obj._adjust_width;
        var height = obj._adjust_height;
        for (var i = 0; i < list.length; i++)
        {
            var elem = list[i];

            elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
            elem.setElementSize(width, height);
            parent_elem.sendToBackElement(elem);
        }

        // fixed component에 대한 세팅
        var comps = this._getChilds(obj);
        var comps_len = comps ? comps.length : 0;
        for (var i = 0; i < comps_len; i++)
        {
            var comp = comps[i];
            if (comp.positionstep == -1)
            {
                var elem = comp._control_element;
                var elem_handle = elem ? elem.handle : null;
                if (elem_handle)
                {
                    //nexacro.__setElementHandleFixedStepNode(elem_handle, true);
                    //nexacro.__setElementHandleStepCount(elem_handle, list.length + 1);
                    nexacro.__setElementHandleStepWidth(elem_handle, width);
                }
            }
        }
    };

    _pDesignForm._showDotGrid = function (obj, is_show)
    {
        if (!obj)
            return;

        var control_elem = obj._control_element;
        if (!control_elem)
            return;

        if (is_show)
        {
            nexacro.__setElementHandleDotSize(control_elem.handle, this._dot_size_x, this._dot_size_y);
            nexacro.__setElementHandleDotStyle(control_elem.handle, this._dot_style);
            nexacro.__setElementHandleDotVisible(control_elem.handle, this._dot_visible);

            var step_container_elems = control_elem._step_containers;
            if (step_container_elems && step_container_elems.length > 0)
            {
                for (var i = 0; i < step_container_elems.length; i++)
                {
                    control_elem = step_container_elems[i];
                    nexacro.__setElementHandleDotSize(control_elem.handle, this._dot_size_x, this._dot_size_y);
                    nexacro.__setElementHandleDotStyle(control_elem.handle, this._dot_style);
                    nexacro.__setElementHandleDotVisible(control_elem.handle, this._dot_visible);
                }
            }
        }
        else
        {
            nexacro.__setElementHandleDotVisible(control_elem.handle, false);

            var step_container_elems = control_elem._step_containers;
            if (step_container_elems && step_container_elems.length > 0)
            {
                for (var i = 0; i < step_container_elems.length; i++)
                {
                    control_elem = step_container_elems[i];
                    nexacro.__setElementHandleDotVisible(control_elem.handle, false);
                }
            }
        }
    };

    _pDesignForm._updateStepContainerStyle = function (control_elem, option)
    {
        if (!control_elem)
            return;

        var obj = control_elem.linkedcontrol;
        var list = control_elem ? control_elem._step_containers:null;
        if (!list)
            return;

        for (var i = 0; i < list.length; i++)
        {
            var elem = list[i];
            if (option & 0x01) // border, borderradius
            {
                if (obj._border)
                {
                    elem.setElementBorder(obj._border);
                }
                else
                {
                    elem.setElementBorder(null);
                }
                if (obj._borderradius)
                {
                    elem.setElementBorderRadius(obj._borderradius);
                }
                else
                {
                    elem.setElementBorderRadius(null);
                }
            }
            if (option & 0x02) // background
            {
                if (obj._background)
                {
                    elem.setElementBackground(obj._background);
                }
                else
                {
                    elem.setElementBackground(null);
                }
            }
            if (option & 0x04) // color
            {
                if (obj._color)
                {
                    elem.setElementColor(obj._color);
                }
                else
                {
                    elem.setElementColor(null);
                }
            }
            if (option & 0x08) // opacity
            {
                if(obj._opacity)
                {
                    elem.setElementOpacity(obj._opacity);
                }
                else
                {
                    elem.setElementOpacity(null);
                }
            }
            if (option & 0x10) // align
            {
            }
            if (option & 0x20) // font
            {
                if (obj._font)
                {
                    elem.setElementFont(obj._font);
                }
                else
                {
                    elem.setElementFont(null);
                }
            }
        }
    };

    _pDesignForm._getCompStepLogicalOffset = function (comp)
    {
        var parent = comp.parent;
        var step_logical_offset = 0;
        if (!nexacro._isNull(parent._design_form))
        {
            // 반드시 Layout 정보가 있어야 함.
        	var mlm = nexacro._getLayoutManager();

            // 2015.06.11 neoarc; 현재 툴에서는 Layout을 변경하지 않고 각 Property를 직접 변경하고 있음.
            // Framework의 Layout 인터페이스 사용 불가
            //var layout = mlm.getCurrentLayout(parent);
            var layout = this._getLayout(parent, parent._current_layout_name);

            if (layout && layout.stepcount > 1)
            {
                // TODO 현재 펼쳐보기 상태인지 체크 필요
                // ...

                var positionstep = comp.positionstep;
                if (positionstep === undefined)
                    positionstep = 0;

                if (positionstep !== undefined)
                {
                    if (positionstep < 0 || positionstep > layout.stepcount - 1)
                        positionstep = 0;

                    step_logical_offset = parent._adjust_width * positionstep;

                    //trace("[" + comp.name + "]'s step_logical_offset: " + step_logical_offset + " (parent_w: " + parent._adjust_width + " x " + positionstep + ")");
                }
            }
        }

        return step_logical_offset;
    };

    _pDesignForm._getSubControlList = function (comp)
    {
        var list = [];

        // sub control; 임시코드; control 목록을 알수가 없음 ..
        for (var p in comp)
        {
            if (typeof (comp[p]) == "object" && comp[p] instanceof nexacro.Component)
            {
                var control = comp[p];
                if (comp == control)
                    continue;
                if (control.parent != comp)
                    continue;
                if (control._is_subcontrol)
                    list.push(control);
            }
        }

        return list;
    };

    _pDesignForm._loadCss = function (url, refresh_designform, add_to_cssurls)
    {
        /*
        var form = this._inner_form;

        var cssurl = nexacro._getServiceLocation(url) + ".js";
        var service = _application._getServiceObject(url);

        var _load_manager = form._load_manager;
        if (add_to_cssurls !== false)
        {
            if (!form._cssurls)
                form._cssurls = [];
            form._cssurls.push(url);
        }

        //this._load_manager.loadCssModule(cssurl.join(""), null, null, service);
        var load_item = _load_manager.getLocalItem(url);
        if (!load_item)
        {
            load_item = new nexacro.LoadItem(cssurl, "css", _load_manager.context);
            load_item._refresh_designform = refresh_designform;
            _load_manager.localList.push(load_item);
            //_load_manager.localCnt++;

            var cur_cachelevel = service.cachelevel;
            service.cachelevel = "none";
            load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, this._on_load_cssmodule, false, service, false);
            service.cachelevel = cur_cachelevel;
        }
        */
    };

    _pDesignForm._on_load_cssmodule = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri)
    {
        /*
        var _load_manager = this;
        var load_Item = _load_manager.getLocalItem(url);
        if (load_Item)
        {
            var _handle = load_Item._handle;
            load_Item._handle = null;
            if (errstatus == 0 && module && typeof (module) == "function")
            {
                if (load_Item.type != "include")
                {
                    // AddCSS
                    module.call(_load_manager.context);

                    if (load_Item._refresh_designform)
                    {
                        // Apply to DesignForm
                        var ctx = _load_manager.context;
                        ctx.parent.refreshTheme(false);
                    }
                }
                }
            else
            {
                load_Item.errcode = errstatus;
                _application._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
            }

            return;
        }
        */
    };

    //===============================================================
    // nexacro.DesignForm : Event Handlers
    //===============================================================
    _pDesignForm.on_notify_init = function (obj, e)
    {
        if (!_application.accessport)
            return;

        var accessport = _application.accessport.getFormAccessPort(this._url);
        if (accessport)
        {
            this.accessport = accessport;
            accessport._setTarget(this);
        }

        this._createInnerForm();
    };

    //===============================================================
    // nexacro.DesignForm : Logical Part
    //===============================================================
    _pDesignForm._createInnerForm = function ()
    {
        try
        {

            var form = new nexacro.Form("_inner_form", "absolute",
                this._root_left, this._root_top,
                //this._inner_form_width, this._inner_form_height,
                this.inner_width, this.inner_height,
                null, null, this);

            this.addChild(form.name, form);
            form.show();
            this._inner_form = form;
            this._active_editing_form = form;

            form.on_create_control_element = function (parent_elem)
            {
                if (!parent_elem) return null;

                var control_elem;
                if (this._is_scrollable)
                    control_elem = this.on_create_scrollable_control_element(parent_elem);
                else
                    control_elem = this.on_create_normal_control_element(parent_elem);

                return control_elem;
            };

            // scrollbars 값은 유지하면서 그리지는 않아야 함.
            // 최초 설정 후 함수 제거
            var scrollbartype = form.scrollbartype;
            form.set_scrollbartype("none");            

            form._onResetScrollBar = nexacro._emptyFn;

            form.set_scrollbartype(scrollbartype);

            // step 관련 form 함수 변형

            form._design_form = this;

            // scroll,offset처리
            form._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight)
            {
                nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);
                var bRtl = this._isRtl(this.parent);

                if (this._width != null || (this._right != null && this._left != null))
                    this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;

                if (this._height != null || this._bottom != null)
                    this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;

                var design_form = this._design_form;
                var scale = design_form._getZoom();
                if (this._left != null || this._right != null)
                {
                    this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;

                    var temp = this._adjust_left_ltr;
                    temp = design_form._root_left / (scale / 100) - design_form._scroll_left;
                    this._adjust_left_ltr = this._adjust_left = temp;

                    // TODO 
                    if (bRtl)
                        this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
                }

                if (this.top != null || this._bottom != null)
                {
                    this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

                    var temp = this._adjust_top;
                    temp = design_form._root_top / (scale / 100) - design_form._scroll_top;
                    this._adjust_top = temp;
                }

                if (this.left && this.width && this.right)
                {
                    this._right = 0;
                    this.right = null;
                }

                if (this.top && this.height && this.bottom)
                {
                    this._bottom = 0;
                    this.bottom = null;
                }

                design_form._recalcStepContainer(this);
            };
        }
        catch (e)
        {
        	if (e.obj)
        	{
        		nexacro._onSystemError(e.obj, e.name, e.message);
        	}
        	else
        	{
        		var msg = nexacro._getExceptionMessage(e);

        		var environment = nexacro.getEnvironment();
        		if (environment)
        		{
        			nexacro._onSystemError(environment, e.name, msg);
        		}
        	}
        }
    };

    _pDesignForm._adjustPosition_assignPart = function (left, top, right, bottom, width, height, parentWidth, parentHeight)
    {
        var val = null;
        var bChangeUnit = false;
        // frame은 override 함

        var _left = left;
        var _right = right;

        var bRtl = this._isRtl(this.parent);
        if (bRtl)
        {
            var swap = _left;
            _left = _right;
            _right = swap;
        }

        for (var i = 0; i < 6; i++)
        {
            switch (i)
            {
                case 0:
                    val = _left;
                    baseId = this._leftbase_component_id;
                    // position base : (스펙문서) %값을 지정하면 base의 width/height를 기준으로 % 처리
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.left = left;
                        this._left = val;
                    }
                    break;
                case 1:
                    val = top;
                    baseId = this._topbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.top = top;
                        this._top = val;
                    }
                    break;
                case 2:
                    val = _right;
                    baseId = this._rightbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.right = right;
                        this._right = val;
                    }
                    break;
                case 3:
                    val = bottom;
                    baseId = this._bottombase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (isNumber(val) || val == null)
                    {
                        this.bottom = bottom
                        this._bottom = val;
                    }
                    break;
                case 4:
                    val = width;

                    //if ((this.left == null || this.right == null) && (this.width == null || this.width == "auto" || width == null || width == "auto"))
                    //{
                    //    if (isNumber(val) && val != this._adjust_width)
                    //    {
                    //        bChangeUnit = true;
                    //    }
                    //    else
                    //    {
                    //        //val = this._getAutoWidth();
                    //    }
                    //}
                    //else
                    //{
                    //    baseId = this._widthbase_component_id;
                    //    if (baseId && val != null)
                    //    {
                    //        baseComp = this._getFormChildById(baseId);
                    //        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                    //        else val = this._convToPixel(val, baseComp._adjust_height);
                    //    }
                    //    else if (val != null)
                    //    {
                    //        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                    //        else val = this._convToPixel(val, parentHeight);
                    //    }
                    //}

                    baseId = this._widthbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (this.width == "auto")
                    {
                        if (bChangeUnit)
                        {
                            this.width = val;
                            bChangeUnit = false;
                        }
                        this._width = val;
                    }
                    else if (isNumber(val) || val == null)
                    {
                        this.width = width;
                        this._width = val;
                    }
                    break;
                case 5:
                    val = height;
                    //if ((this.top == null || this.bottom == null) && (this.height == null || this.height == "auto" || height == null || height == "auto"))
                    //{
                    //    if (isNumber(val) && val != this._adjust_height)
                    //    {
                    //        bChangeUnit = true;
                    //    }
                    //    else
                    //    {
                    //        val = this._getAutoHeight();
                    //    }
                    //}
                    //else
                    //{
                    //    baseId = this._heightbase_component_id;
                    //    if (baseId && val != null)
                    //    {
                    //        baseComp = this._getFormChildById(baseId);
                    //        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                    //        else val = this._convToPixel(val, baseComp._adjust_height);
                    //    }
                    //    else if (val != null)
                    //    {
                    //        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                    //        else val = this._convToPixel(val, parentHeight);
                    //    }
                    //}
                    baseId = this._heightbase_component_id;
                    if (baseId && val != null)
                    {
                        baseComp = this._getFormChildById(baseId);
                        if (i % 2 == 0) val = this._convToPixel(val, baseComp._adjust_width);
                        else val = this._convToPixel(val, baseComp._adjust_height);
                    }
                    else if (val != null)
                    {
                        if (i % 2 == 0) val = this._convToPixel(val, parentWidth);
                        else val = this._convToPixel(val, parentHeight);
                    }
                    if (this.height == "auto")
                    {
                        if (bChangeUnit)
                        {
                            this.height = val;
                            bChangeUnit = false;
                        }
                        this._height = val;
                    }
                    else if (isNumber(val) || val == null)
                    {
                        this.height = height;
                        this._height = val;
                    }
                    break;
            }
        }
    };

    _pDesignForm._on_designform_onsize = function ()
    {
        var _stack = this._sublayoutmode_stack;
        if (_stack.length > 0)
        {
            var _win = this._getWindow();
            if (!_win || !_win.handle)
                return;

            for (var i = 0; i < _stack.length; i++)
            {
                // resize overlay
                var overlay_elem = _stack[i].overlay_elem;
                var parent_elem = overlay_elem.parent_elem;

                //var width = parent_elem.width;
                //var height = parent_elem.height;
                var width = nexacro.__getWindowHandleClientWidth(_win.handle);
                var height = nexacro.__getWindowHandleClientHeight(_win.handle);

                nexacro.__setElementHandleSize(overlay_elem._handle, width, height);
            }
        }
    };

    //method call script engine
    delete _pDesignForm;



    //==============================================================================
    // nexacro.ApplicationAccessPort
    //==============================================================================
    nexacro.ApplicationAccessPort = function (target)
    {
        this.target = target;
        this._formaccessport = [];
        this._block_css_notify = false;
        this._refresh_css = false;
    };

    var _pApplicationAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.ApplicationAccessPort);
    nexacro.ApplicationAccessPort.prototype = _pApplicationAccessPort;
    _pApplicationAccessPort.setInspectorHandle = function (handle)
    {

    };

    _pApplicationAccessPort.getObjectList = function (type)
    {

    };

    _pApplicationAccessPort.getObjectCount = function (type)
    {

    };

    _pApplicationAccessPort.getObjectByID = function (type, objid)
    {

    };

    _pApplicationAccessPort.getObjectByIndex = function (type, index)
    {
    };

    _pApplicationAccessPort.getVariant = function (varid)
    {
    };

    _pApplicationAccessPort.notifySelect = function (command, obj)
    {

    };

    _pApplicationAccessPort.getComponentRect = function (compid, isroot)
    {
    };

    _pApplicationAccessPort.getCurrentStyleValue = function (compid, propid, pseudo)
    {
    };

    _pApplicationAccessPort.InitializeApplicationProperties = function ()
    {
        //property
        //_pApplication.mainframe = null;
        //_pApplication.key = "";
        //_pApplication.xadl = "";
        _pApplication.componentpath = "";
        _pApplication.commthreadcount = 0;
        _pApplication.commthreadwaittime = 0;
        _pApplication.cachedir = "";
        _pApplication.errorfile = "";
        _pApplication.onlyone = false;
        _pApplication.version = "";
        _pApplication.engineversion = "2.0";
        _pApplication.enginesetupkey = "";
        _pApplication.licenseurl = "";
        _pApplication.mousehovertime = 500;
        _pApplication.mousewheeltype = 0;
        _pApplication.imepastemode = 0;
        _pApplication.locale = 0;
        _pApplication.errorlevel = 0;
        _pApplication.cookiecachetype = "cache";
        _pApplication.loadingimage = "";

        //accessibility Property
       // _pApplication.enableaccessibility = false;
        _pApplication.accessibilityfirstovertext = ""; //
        _pApplication.accessibilitylastovertext = "";
        _pApplication.accessibilityreplayhotkey = "";
        _pApplication.accessibilitybackwardkey = "";
        _pApplication.accessibilityforwardkey = "";
        _pApplication.accessibilitywholereadhotkey = "";
        _pApplication.accessibilityhistorycount = 5;
        _pApplication.accessibilitytype = "standard"; //standard/sensereader/jaws
        _pApplication.accessibilitydescreadtype = "label"; //multienum - label/action/description
        _pApplication.accessibilitywholereadtype = "none"; // none/load/change/loadchange
     //   _pApplication.hithemeid = "";
        _pApplication.accessibilityheadingnexthotkey = "";
        _pApplication.accessibilityheadingprevhotkey = "";
        _pApplication.accessibilitycomponentnexthotkey = "";
        _pApplication.accessibilitycomponentprevhotkey = "";

    };

    _pApplicationAccessPort.setDotSize = function (measure, size)
    {
        var form_aps = this._formaccessport;
        var len = form_aps.length;
        for (var i = 0; i < len; i++)
        {
            var form_ap = form_aps[i].accessport;
            form_ap.setDotSize(measure, size);
        }
    };

    _pApplicationAccessPort.setDotStyle = function (style)
    {
        var form_aps = this._formaccessport;
        var len = form_aps.length;
        for (var i = 0; i < len; i++)
        {
            var form_ap = form_aps[i].accessport;
            form_ap.setDotStyle(style);
        }
    };

    _pApplicationAccessPort.setDotVisible = function (visible)
    {
        var form_aps = this._formaccessport;
        var len = form_aps.length;
        for (var i = 0; i < len; i++)
        {
            var form_ap = form_aps[i].accessport;
            form_ap.setDotVisible(visible);
        }
    };

    _pApplicationAccessPort.createFormAccessPort = function (url)
    {
    	var realurl = nexacro._getFDLLocation(url);
    //	trace("ApplicationAccessPort.createFormAccessPort:" + realurl);
        if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl")
            realurl = realurl + ".js";

        var len = this._formaccessport.length;
        for (var i = 0; i < len; i++)
        {
            if (this._formaccessport[i].url == realurl)
                return this._formaccessport[i].accessport;
        }

        this._formaccessport.push({ url: realurl, accessport: new nexacro.FormAccessPort() });
    };

    _pApplicationAccessPort.removeFormAccessPort = function (url)
    {
    	var realurl = nexacro._getFDLLocation(url);
        if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl")
        {
            realurl = realurl + ".js";
        }

        var form_aps = this._formaccessport;
        var form_aps_len = form_aps ? form_aps.length : 0;
        for (var i = 0; i < form_aps_len; i++)
        {
            var form_ap = form_aps[i];
            if (form_ap.url == realurl)
            {
                form_ap.accessport.destroy(); // ?
                form_ap.accessport = null;

                delete form_ap;
                form_aps[i] = null;

                form_aps.splice(i, 1);
                break;
            }
        }
    };

    _pApplicationAccessPort.getFormAccessPort = function (url)
    {
    	var realurl = nexacro._getFDLLocation(url);
        if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl")
        {
            realurl = realurl + ".js";
        }

        var len = this._formaccessport.length;
        for (var i = 0; i < len; i++)
        {
            if (this._formaccessport[i].url == realurl)
            {
                return this._formaccessport[i].accessport;
            }
        }

        return null;
    };

    _pApplicationAccessPort.createDesignFrame = function (url, _handle, width, height)
    {
        try
        {
            var obj = new ChildFrame("childdesignframe", "absolute", null, null, width, height, null, null, "", this.target.mainframe);

            obj.set_formurl(url);
            obj.set_autosize("false");
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");

            obj.set_border("0px none");
            //obj.set_border("none"); // lym runtime_css에 none으로 설정

            // showDesign에서 createComponent, on_created가 호출됨
            obj.showDesign(url, this.target.mainframe, null, null, _handle);
        }
        catch (e)
        {
        	if (e.obj)
        	{
        		nexacro._onSystemError(e.obj, e.name, e.message);
        	}
        	else
        	{
        		var msg = nexacro._getExceptionMessage(e);

        		var environment = nexacro.getEnvironment();
        		if (environment)
        		{
        			nexacro._onSystemError(environment, e.name, msg);
        		}
        	}
        }
    };

    _pApplicationAccessPort.clearGlobalVariables = function ()
    {
        // step 1. clear dataset
        var datasets = _application._datasets;
        var length = datasets ? datasets.length : 0;
        for (var i = length - 1 ; i >= 0 ; i--)
        {
            var dataset = datasets[i];
            if (dataset && dataset.name)
            {
                this.deleteObject(dataset.name);
                dataset = null;
            }
        }

        // TODO : 그 외 항목들에 대한 처리..
    };

    // 140603 박현진 : Global Dataset Handling
    _pApplicationAccessPort.addConstColumn = function (datasetid, columnid, type, size, value)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds._addConstColumn(columnid, nexacro._decodeXml(value), type);

            // size?
        }
    };

    _pApplicationAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value)
    {
        // TODO 현재 지원하지 않음.
    };

    _pApplicationAccessPort.deleteConstColumn = function (datasetid, col)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            var constVar = ds.getConstColumn(col);
            if (constVar)
            {
                ds._constVars.delete_item(id);
            }
        }
    };

    _pApplicationAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval)
    {
        // TODO
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            var constVar = ds.getConstColumn(col);
            if (constVar)
            {
                /*
                if (propid == "id")
                {
                    if (ds.getConstColumn(propval))
                    {
                        // 에러?
                        return false;
                    }

                    var idx = constVar._idxMap[constVar.id];
                    constVar.update_id(idx, propval);
                }
                else if (propid == "type")
                {
                    // 가능? 원래 value를 모르는데..
                }
                else if (propid == "value")
                {
                    // TODO
                }
                */
            }
        }
    };

    _pApplicationAccessPort.getConstColumnProperty = function (datasetid, col, propid)
    {
        // TODO
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            var constVar = ds.getConstColumn(col);
            if (constVar)
            {
                // constColumn의 값 외의 속성을 알수가 있나??? 내부적으로 id, value만 저장된다.
                if (constVar[propid])
                    return constVar[propid];
            }
        }
    };

    _pApplicationAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds._addColumn(columnid, type, size, prop, sumtext);
        }
    };

    _pApplicationAccessPort.insertColumn = function (datasetid, idx, id, strtype, size, prop, text)
    {
        // TODO 현재 지원하지 않음.
        var ds = this._getObject(datasetid);
        if (!ds || !(ds instanceof nexacro.Dataset))
            return;

        if ((id in ds.colinfos) || (id in ds._constVars)) return -1;

        var type;
        if (strtype == undefined)
        {
            type = 1;
            strtype = "STRING";
        }
        else
        {
            type = nexacro.DataUtils._typeint[strtype.toLowerCase()];
        }

        if (type == null)
        {
            type = 1;
        }
        if ((+size) != (+size))
        {
            size = 256;
        }

        // colinfos = Collection
        var len = ds.colinfos.length;
        for (var i = idx; i < len; i++)
        {
            var colinfo = ds.colinfos[i];
            colinfo._index++;
        }

        var newcolinfo = new nexacro.DSColumnInfo(id, strtype, type, size, prop, text, idx);
        ds.colcount++;
        return ds.colinfos.insert_item(idx, id, newcolinfo);

    };

    _pApplicationAccessPort.deleteColumn = function (datasetid, col)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds.deleteColumn(col);
        }
    };

    _pApplicationAccessPort.setColumnProperty = function (datasetid, col, propid, propval)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            // deleteColumn 메소드는 컬럼 index와 컴럼 id 모두 사용 가능.
            var colinfo = ds.getColumnInfo(col);
            if (colinfo)
            {
                if (propid == "id")
                {
                    if (ds.getColumnInfo(propval))
                    {
                        // 에러체크는 어떻게?
                        return false;
                    }

                    //colinfo[propid] = propval;                    

                    var idx = ds.colinfos._idxMap[colinfo.id];
                    ds.colinfos.update_id(idx, propval);
                }
                else if (propid == "type")
                {
                    // type에 따른 api attach
                    colinfo[propid] = propval;

                    nexacro.DSColumnInfo.call(colinfo, colinfo.id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, colinfo._index);
                }
                else
                {
                    colinfo[propid] = propval;
                }
            }
        }
    };

    _pApplicationAccessPort.getColumnProperty = function (datasetid, col, propid)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            // deleteColumn 메소드는 컬럼 index와 컴럼 id 모두 사용 가능.
            var colinfo = ds.getColumnInfo(col);
            if (colinfo)
            {
                if (colinfo[propid])
                    return colinfo[propid];
            }
        }
    };

    _pApplicationAccessPort.addRow = function (datasetid)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds.addRow();
        }
    };

    _pApplicationAccessPort.insertRow = function (datasetid, index)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds.insertRow(index);
        }
    };

    _pApplicationAccessPort.deleteRow = function (datasetid, row)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            ds.deleteRow(row);
        }
    };

    _pApplicationAccessPort.setColumn = function (datasetid, row, col, value)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            return ds.setColumn(row, col, value);
        }

        return false;
    };

    _pApplicationAccessPort.getColumn = function (datasetid, row, col)
    {
        var ds = this._getObject(datasetid);
        if (ds && ds instanceof nexacro.Dataset)
        {
            return ds.getColumn(row, col);
        }

        return false;
    };

    // 14/07/02 박현진 : Frameset 인터페이스 추가
    _pApplicationAccessPort.createFrame = function (classname, parentid, frameid)
    {
        var parent;
        if (parentid)
        {
            parent = this._getObject(parentid);
        }

        if (!parent)
        {
            parent = _application;
        }

        if (!frameid || frameid.length == 0)
        {
            frameid = this._getNextChildID(parent, classname);
        }

        var classnameobj = eval(classname);
        if (classnameobj)
        {
            var obj = null;

            // frame의 type에 따라 생성이 다르다.
            // 어떻게 구별하지?
            // TODO :
            if (classname == "MainFrame")
            {
                // 이미 mainframe이 있는 경우?
                if (_application.mainframe)
                {
					var mainframe = _application.mainframe;					
					mainframe._on_close();
					mainframe._destroy();					
					delete _application[frameid];
					_application.all.delete_item(frameid);
					_application.mainframe = null;
                }

                obj = _application.createMainFrame(frameid, null, null, null, null, null, null, null, parent);

				//obj.createBodyFrame();
                obj.createComponent();
                obj.on_created();	

                // mainframe은  addChild를 하지않음.
                return frameid;
            }
            else if (classname == "ChildFrame")
            {
                // childframe는 formurl 이 들어간다.
                obj = new classnameobj(frameid, null, null, null, null, null, null, null, "", parent);
            }
            else
            {
                // 그 외 frame들
                obj = new classnameobj(frameid, null, null, null, null, null, null, null, parent);
            }

            parent.addChild(frameid, obj);
            
            return frameid;
        }
    };

    _pApplicationAccessPort.deleteFrame = function (frameid)
    {
        var frame = this._getObject(frameid);
        var parent = frame.parent;
        if (frame && parent)
        {
            if (!parent.removeChild)
            {
                trace("* no method: 'removeChild' / " + parent);
                return;
            }
            parent.removeChild(frame.name);
            return frame.destroyComponent();
        }
    };

    _pApplicationAccessPort.moveFrame = function (frameid, left, top, width, height, right, bottom)
    {
        var frame = this._getObject(frameid);
        if (frame)
        {
            return frame.move(left, top, width, height, right, bottom);
        }
    }

    _pApplicationAccessPort.createInvisibleObject = function (classname, objid)
    {
        // Dataset
        // Variable
        // Object
        // Image

        if (!objid || objid.length == 0)
        {
            objid = this._getNextChildID(this, classname);
        }

        var classnameobj = eval(classname);
        if (classnameobj)
        {
            var obj = new classnameobj(objid, _application);
            if (obj instanceof nexacro.Dataset)
            {
                obj._setContents("");
                _application._addDataset(obj.name, obj);
            }
                /*
                else if (...)
                {
                    _application._addImage(...);
                }
                */
            else
            {
                _application._addObject(obj.name, obj);
            }

            return obj.name;
        }
    };

    // 150613 박현진 : contents load
    _pApplicationAccessPort.setContents = function (compid, contents)
    {
        //trace("_pDesignForm.setContents(" + compid + ", " + contents + ")");
        var obj = this._getObject(compid);
        if (!obj || !obj._setContents)
            return;

        // TODO : 기존 값을 날려버리고 설정되어야 한다.        
        obj._setContents(contents);
    };

    _pApplicationAccessPort.deleteObject = function (objid)
    {
        // datasets = array
        // all = collection
        // images = collection
        if (_application._datasets[objid])
        {
            var idx = _application._datasets.indexOf(objid);
            _application._datasets.splice(idx, 1);

            delete _application[objid];
            _application.all.delete_item(objid);
        }
        else
        {
            delete _application[objid];
            _application.all.delete_item(objid);
        }
    };

    _pApplicationAccessPort.getProperty = function (objid, propid, pseudo)
    {
        var obj = this._getObject(objid);
        if (obj)
        {
            return nexacro._getProperty(obj, propid, pseudo);
        }
        else
        {
            trace("_pApplicationAccessPort.getProperty( " + objid + ", " + propid + ", " + pseudo + " )");
            trace("> obj is null!");
        }
    };
    _pApplicationAccessPort.getStyleProperty = function (objid, propid) 
    {
        var obj = this._getObject(objid);
        if (obj) 
        {
            return nexacro._getStyleProperty(obj, propid);
        }
        else 
        {
            trace("_pApplicationAccessPort.getStyleProperty( " + objid + ", " + propid + ", " + childelement + " )");
            trace("> obj is null!");
        }
    };
    _pApplicationAccessPort.setProperty = function (objid, propid, propval, pseudo)
    {
        var obj = this._getObject(objid);
        if (obj)
        {
            if (propid == "id")
                propid = "name";

            // frame의 id 변경. _application.frame의 set name 
            if (propid == "name")
            {
                var parent_obj = obj.parent;
                var old_id = obj.name;
                var new_id = propval;

                if (parent_obj === null) return;

                // all
                var idx = parent_obj.all.indexOf(old_id);
                if (idx < 0) return;
                parent_obj.all.update_id(idx, new_id);

                if (parent_obj._frames)
                {
                    // _frames
                    idx = parent_obj._frames.indexOf(old_id);
                    if (idx < 0) return;
                    parent_obj._frames.update_id(idx, new_id);
                }

                // [id]
                delete parent_obj[old_id];
                parent_obj[new_id] = obj;

                obj.set_id(new_id);
                obj.name = new_id;

                return obj[propid];
            }

            var ret = nexacro._setProperty(obj, propid, propval, pseudo);
            if (ret === true)
            {
                return obj[propid];
            }
            else if (ret === null)
            {
                return;
            }
        }
    };

    _pApplicationAccessPort.setInitValueID = function (objid, value)
    {
        var obj = this._getObject(objid);
        if (obj)
        {
            nexacro._setInitValueID(obj, value);
        }
    };

    _pApplicationAccessPort._getObject = function (objid)
    {
        if (!objid || objid == "this" || objid == "_application")
        {
            return _application;
        }

        // 140702 박현진 : frame 찾기
        var obj = eval("_application." + objid);
        if (obj)
            return obj;

        return _application.all.get_item(objid);
    };

    _pApplicationAccessPort._getNextChildID = function (parent, classname)
    {
        if (!parent || !classname)
        {
            trace("parent or classname is missing");
            return "error";
        }

        var nextnum = 0;
        var nextid;
        while (true)
        {
            nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
            if (!parent[nextid])
                break;
            nextnum++;
        }

        return nextid;
    };

    _pApplicationAccessPort.setCssList = function (csslist)
    {
        // csslist = ["xxx.xtheme", "aaa.css", "bbb.css"]
        trace("_pApplicationAccessPort.setCssList( " + csslist + " )");

        // DesignForm이하 모든 컴포넌트의 style을 초기화
        this._clearStyles();

        // csslist의 css를 모두 로드

        // ver2; Cache
        _application._css_context_list = [];
        _application._find_csslist = []; // context._css_selectors의 array

        // TODO check LoadManager의 캐쉬는 사용하지 않음.
        _application._load_manager.localList = [];
        _application._load_manager.localCnt = 0;

        for (var i = 0; i < csslist.length; i++)
        {
            var cssurl = csslist[i];
            var css_context = nexacro._getDesignCssContext(cssurl);
            if (!css_context)
            {
                trace("> Not Cached: " + cssurl);
                css_context = new nexacro.DesignCssContext(cssurl);
                if (cssurl.indexOf(".xtheme") > 0)
                    nexacro._loadTheme2(cssurl, css_context);
                else
                    nexacro._loadCss2(cssurl, css_context);

                nexacro._addDesignCssContext(css_context);
            }
            else
            {
                trace("> Cached: " + cssurl);
            }

            // insert first (find csslist는 parent로 탐색하며 push 함)
            _application._css_context_list.push(css_context);
            _application._find_csslist.unshift(css_context._css_selectors);
        }

        this._refreshStyles();

        nexacro.__notifyToNexacroStudio(nexacro._design_notify_refresh_properties, null);
    };

    _pApplicationAccessPort._clearStyles = function (comp)
    {
        if (comp === undefined)
            comp = _application.mainframe;
        else if (comp === null)
            return;

        //trace("ClearStyle: " + comp.name);

        if (comp instanceof nexacro.MainFrame)
        {
            _application._find_csslist = null;
            _application._cssfinder_cache = {};

            //comp._find_csslist = null;
            //comp._css_finder = null;
            //comp._cssfinder_cache = {};

            this._clearStyles(comp.frame);
        }
        else if (comp instanceof nexacro.FrameSet)
        {
            //comp._find_csslist = null;
            //comp._css_finder = null;
            //comp._cssfinder_cache = {};

            var len = comp.frames.length;
            for (var i = 0; i < len; i++)
            {
                this._clearStyles(comp.frames[i]);
            }
        }

        //?
        //comp.currentstyle = comp.on_create_custom_currentStyle();

        //comp._css_finder = null;
        //comp._ref_css_finder = null;

        // TODO : Frame 미리보기 지원시 subcontrol 영역도 css refresh
        /*
        var subcontrols = nexacro.DesignForm.prototype._getSubControlList.call(comp, comp);
        var len = subcontrols.length;
        for (var i = 0; i < len; i++)
        {
            var control = subcontrols[i];
            this._clearStyles(control);
        }
        */
    };

    _pApplicationAccessPort._refreshStyles = function (comp)
    {
        if (comp === undefined)
            comp = _application.mainframe;
        else if (comp === null)
            return;

        // 강제 업데이트
        comp._control_pseudo = -1;//undefined;
        comp._updateControl(comp._control_element, comp._pseudo);

        // lym
        //comp._updateContents(comp._control_element, comp._pseudo);

        //comp.on_apply_pseudo("");
        //comp.on_apply_pseudo("mouseover");
        //comp.on_apply_pseudo("normal");

        //trace("_pDesignForm._refreshStyles(" + comp + " / " + comp.name + ")");

        // 재귀호출
        if (comp instanceof nexacro.MainFrame)
        {
            this._refreshStyles(comp.frame);
        }
        else if (comp instanceof nexacro.FrameSet)
        {
            var len = comp.frames.length;
            for (var i = 0; i < len; i++)
            {
                this._refreshStyles(comp.frames[i]);
            }
        }

        // TODO : Frame 미리보기 지원시 subcontrol 영역도 css refresh
        /*
        var subcontrols = nexacro.DesignForm.prototype._getSubControlList.call(comp, comp);
        var len = subcontrols.length;
        for (var i = 0; i < len; i++)
        {
            var control = subcontrols[i];
            this._refreshStyles(control);
        }
        */
    };

    // 삭제예정
    _pApplicationAccessPort._loadTheme = nexacro._emptyFn;
    _pApplicationAccessPort._loadCss = nexacro._emptyFn;
    _pApplicationAccessPort._on_load_thememodule = nexacro._emptyFn;
    _pApplicationAccessPort._on_load_cssmodule = nexacro._emptyFn;




    // 특정 css / theme 파일이 갱신된 경우 호출됨.
    // context cache에서 제거하고 다시 로드
    _pApplicationAccessPort.updateCSS = function (url)
    {
        // 신규코드 2015-04-16
        var updated_context = nexacro._updateDesignCssContext(url);
    };


    _pApplicationAccessPort.addService = function (prefixid, type, url, cachelevel, codepage, language, version, communication)
    {
    	nexacro._addService(prefixid, type, url, cachelevel, codepage, language, version, communication)

    	//var service = new nexacro.ServiceItem(prefixid, type, url, cachelevel, codepage, language, version, communication);
        //_application.services.add(prefixid, service);
    	var env = nexacro.getEnvironment();
    	trace("add Service " + prefixid + " : " + env.services[prefixid]);
    };

    _pApplicationAccessPort.deleteService = function (prefixid)
    {
    	nexacro._removeService(prefixid);

        //var service = _application.services[prefixid];
        //if (service)
        //{
        //    trace("delete Service " + prefixid + " : " + _application.services[prefixid]);
        //    _application.services.delete_item(prefixid);
        //    delete service;
        //}
    };

    _pApplicationAccessPort.changeService = function (prefixid, propid, propval)
    {
    	var env = nexacro.getEnvironment();

    	var service = env.services[prefixid];
        if (service)
        {
           // trace("change Service " + prefixid + "[" + propid + "] : " + service[propid] + " to " + propval);

            if (propid == "prefixid")
            {
            	var idx = env.services.indexOf(prefixid);
                if (idx < 0) return;
                env.services.update_id(idx, propval);

                service.prefixid = propval;
            }
            else
            {
                service[propid] = propval;
            }
        }
    };

    delete _pApplicationAccessPort;


    //==============================================================================
    // nexacro.FormAccessPort
    //==============================================================================
    nexacro.FormAccessPort = function (target)
    {
        this.target = target;
        this.notify_handle = null;
    };

    var _pFormAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.FormAccessPort);
    nexacro.FormAccessPort.prototype = _pFormAccessPort;

    /////////////////////////////////////////////////////////////////////////////////////////
    _pFormAccessPort.destroy = function ()
    {
        if (this.target)
        {
            this.target.destroy();
            this.target = null;
        }
    };

    _pFormAccessPort.reloadForm = function ()
    {
        return this.target.reloadForm();
    };

    _pFormAccessPort.setInspectorHandle = function (handle)
    {
        this.notify_handle = handle;
    };

    _pFormAccessPort.getObjectList = function (type)
    {
        var form = this.target;
        var len = form.all.length;
        var objlist = [];
        for (var i = 0; i < len; i++)
        {
            var obj = form.all[i];
            if (obj && obj._type_name == type)
                objlist.push(comp);
        }
        return objlist;
    };


    _pFormAccessPort.getObjectCount = function (type)
    {
        var form = this.target;
        var len = form.all.length;
        var cnt = 0;
        for (var i = 0; i < len; i++)
        {
            var obj = form.all[i];
            if (obj && obj._type_name == type)
                cnt++;
        }
        return cnt;
    };

    _pFormAccessPort.getObjectByID = function (type, objid)
    {
    //	trace("FormAccessPort.getObjectByID:" + objid)
        var evalstr = objid;
        var obj = evalstr.replace("this._inner_form", "this._inner_form.target");

        // TODO? 뭐지이건

        if (obj && obj._type_name == type)
            return obj;
    };

    _pFormAccessPort.getObjectByIndex = function (type, index)
    {
        // TODO
    };

    _pFormAccessPort.getVariant = function (varid)
    {
        var evalstr = varid;
        evalstr.replace("this._inner_form", "this._inner_form.target");
        return eval(evalstr);
    };

    _pFormAccessPort.notifySelect = function (command, obj)
    {

    };

    _pFormAccessPort._setTarget = function (target)
    {
        this.target = target;
    };

    _pFormAccessPort.getObject = function ()
    {
        return this.target;
    };

    _pFormAccessPort.createComponent = function (classname, parentid, left, top, width, height, compid, new_create)
    {
        return this.target.createComponentByRect(classname, parentid, left, top, width, height, compid, new_create);
    };
    _pFormAccessPort.createComponentCSSPreview = function (classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create)
    {
        return this.target.createComponentCSSPreview(classname, controlclassname, issubcontrol, parentid, left, top, width, height, compid, props, values, new_create);
    };
    _pFormAccessPort.createFrame = function (classname, parentid, frameid)
    {
        return this.target.createFrame(classname, parentid, frameid);
    };
    
    // 14/06/03 Tab 박현진 : Create 인터페이스 추가
    _pFormAccessPort.createTabpage = function (classname, parentid, compid)
    {
        return this.target.createTabpage(classname, parentid, compid);
    };

    // 14/05/28 박현진 : 인터페이스 추가
    _pFormAccessPort.createInvisibleObject = function (classname, objid)
    {
        return this.target.createInvisibleObject(classname, objid);
    };

    _pFormAccessPort.getChildList = function (parentid)
    {
        return this.target.getChildList(parentid);
    };

    _pFormAccessPort.deleteObject = function (compid)
    {
        return this.target.deleteObject(compid);
    };

    _pFormAccessPort.setProperty = function (compid, propid, propval, pseudo)
    {
        // tool에서 처리
        // 이쪽으로 빠져나오는 케이스가 있나?
        //         var obj = this.target._getObject(compid);
        //         var sublayoutmode_info = this.target._findSubLayoutMode(obj);
        // 
        //         if (sublayoutmode_info && (propid == "url" || propid == "positionstep"))
        //             return;

        return this.target.setProperty(compid, propid, propval, pseudo);
    };

    // 140523 박현진
    // Layout의 Style 적용
    _pFormAccessPort.appendInlineStyleValue = function (base_value, append_value)
    {
        return this.target.appendInlineStyleValue(base_value, append_value);
    };

    _pFormAccessPort.setLayoutStyle = function (compid, base_value, layout_value, sublayout_value)
    {
        return this.target.setLayoutStyle(compid, base_value, layout_value, sublayout_value);
    };

    _pFormAccessPort.getProperty = function (compid, propid, pseudo)
    {
        return this.target.getProperty(compid, propid, pseudo);
    };
    _pFormAccessPort.getStyleProperty = function (compid, propid)
    {
        return this.target.getStyleProperty(compid, propid);
    };
    _pFormAccessPort.getInlineStyleProperty = function (compid, propid, pseudo)
    {
        return this.target.getInlineStyleProperty(compid, propid, pseudo);
    };

    _pFormAccessPort.getCurrentStyleValue = function (compid, propid, pseudo)
    {
        return this.target.getCurrentStyleValue(compid, propid, pseudo);
    };

    _pFormAccessPort.moveComponentByRect = function (compid, left, top, width, height, resize)
    {
        this.target.moveComponentByRect(compid, left, top, width, height, resize);
    };

    _pFormAccessPort.moveComponent = function (compid, left, top, width, height, right, bottom)
    {
        this.target.moveComponent(compid, left, top, width, height, right, bottom);
    };

    _pFormAccessPort.resizeComponent = function (compid, width, height)
    {
        this.target.resizeComponent(compid, width, height);
    };

    _pFormAccessPort.swapPositionUnit = function (compid, propid, unit)
    {
        this.target.swapPositionUnit(compid, propid, unit);
    };

    _pFormAccessPort.hitTestByPoint = function (x, y, rootcompid, recursive)
    {
        return this.target.hitTestByPoint(x, y, rootcompid, recursive);
    };

    _pFormAccessPort.hitTestByRect = function (left, top, width, height, rootcompid, type)
    {
        return this.target.hitTestByRect(left, top, width, height, rootcompid, type);
    };

    // 140617 박현진 : tracker hittest 용
    _pFormAccessPort.hitTestTracker = function (x, y, rootcompid, compid)
    {
        return this.target.hitTestTracker(x, y, rootcompid, compid);
    };

    _pFormAccessPort.hitTestforFormbase = function (x, y, rootcompid)
    {
        return this.target.hitTestforFormbase(x, y, rootcompid);
    };

    _pFormAccessPort.hitTestParentByPoint = function (x, y, rootcompid)
    {
        return this.target.hitTestParentByPoint(x, y, rootcompid);
    };

    _pFormAccessPort.hitTestParentByRect = function (left, top, width, height, rootcompid)
    {
        return this.target.hitTestParentByRect(left, top, width, height, rootcompid);
    };

    _pFormAccessPort.setScroll = function (horz, size)
    {
        return this.target.setScroll(horz, size);
    };

    _pFormAccessPort.getComponentRect = function (compid, isroot)
    {
        return this.target.getComponentRect(compid, isroot);
    };

    _pFormAccessPort.getClientRect = function (compid)
    {
        return this.target.getClientRect(compid);
    };

    _pFormAccessPort.drawWindow = function ()
    {
        return this.target.drawWindow();
    };

    _pFormAccessPort.setDotSize = function (measure, size)
    {
        this.target.setDotSize(measure, size);
    };

    _pFormAccessPort.setDotStyle = function (style)
    {
        this.target.setDotStyle(style);
    };

    _pFormAccessPort.setDotVisible = function (visible)
    {
        this.target.setDotVisible(visible);
    };

    _pFormAccessPort.setPreviewMode = function (is_previewmode)
    {
        this.target.setPreviewMode(is_previewmode);
    };

    _pFormAccessPort.showPreviewContents = function (compid)
    {
        this.target.showPreviewContents(compid);
    };

    _pFormAccessPort.updatePreviewPosition = function (compid)
    {
        this.target.updatePreviewPosition(compid);
    };
    _pFormAccessPort.showCssDesignContents = function (compid, objpath, status, statusvalue, userstatus, userstatusvalue)
    {
        this.target.showCssDesignContents(compid, objpath, status, statusvalue, userstatus, userstatusvalue);
    };
    _pFormAccessPort.getFormBitmap = function ()
    {
        return this.target.getFormBitmap();
    };

    _pFormAccessPort.setBitmapSize = function (width, height)
    {
        return this.target.setBitmapSize(width, height);
    };

    _pFormAccessPort.setFormSize = function (width, height)
    {
        return this.target.setFormSize(width, height);
    };

    _pFormAccessPort.DrawOffset = function (offsetx, offsety)
    {
        return this.target.DrawOffset(offsetx, offsety);
    };

    _pFormAccessPort.setDesignWindowBackground = function (color, innerform)
    {
        return this.target.setDesignWindowBackground(color, innerform);
    };

    _pFormAccessPort.setRoot = function (left, top)
    {
        return this.target.setRoot(left, top);
    };

    _pFormAccessPort.setDesignZoom = function (scale)
    {
        return this.target.setDesignZoom(scale);
    };

    _pFormAccessPort.getDesignZoom = function (scale)
    {
        return this.target.getDesignZoom(scale);
    };

    _pFormAccessPort.getBorderWidth = function (compid)
    {
        return this.target.getBorderWidth(compid);
    };

    _pFormAccessPort.getOverlapComponent = function (compid)
    {
        return this.target.getOverlapComponent(compid);
    };

    _pFormAccessPort.setName = function (compid, propval)
    {
        return this.target.setName(compid, propval);
    };

    //hykim
    _pFormAccessPort.attachDesignWindow = function (handle)
    {
        var win = this.target._getWindow();
        if (win && win.handle)
        {
            nexacro.__attachDesignWindowHandle(win.handle, handle);
        }
    };

    _pFormAccessPort.detachDesignWindow = function ()
    {
        var win = this.target._getWindow();
        if (win && win.handle)
            nexacro.__detachDesignWindowHandle(win.handle);
    };

    _pFormAccessPort.setOverflowClip = function (overflowclip)
    {
        this.target.setOverflowClip(overflowclip);
    };

    _pFormAccessPort.showSubLayout = function (compid, bShow, positionstep)
    {
        this.target.showSubLayout(compid, bShow, positionstep);
    };

    _pFormAccessPort.moveComponentToFront = function (compid)
    {
        this.target.moveComponentToFront(compid);
    };

    _pFormAccessPort.moveComponentToPrev = function (compid)
    {
        this.target.moveComponentToPrev(compid);
    };

    _pFormAccessPort.moveComponentToNext = function (compid)
    {
        this.target.moveComponentToNext(compid);
    };

    _pFormAccessPort.moveComponentToBack = function (compid)
    {
        this.target.moveComponentToBack(compid);
    };

    _pFormAccessPort.setPseudo = function (compid, pseudo)
    {
        return this.target.setPseudo(compid, pseudo);
    };

    _pFormAccessPort.getPseudo = function (compid)
    {
        // get current??
        return this.target.getPseudo(compid);
    };

    _pFormAccessPort.addLayout = function (compid, layoutname, width, height, screenid)
    {
        return this.target.addLayout(compid, layoutname, width, height, screenid);
    };

    _pFormAccessPort.removeLayout = function (compid, layoutname)
    {
        return this.target.removeLayout(compid, layoutname);
    };

    _pFormAccessPort.removeAllLayout = function (compid)
    {
        return this.target.removeAllLayout(compid);
    };

    _pFormAccessPort.setLayoutProperty = function (compid, layoutname, propid, propval)
    {
        return this.target.setLayoutProperty(compid, layoutname, propid, propval);
    };

    _pFormAccessPort.getLayoutProperty = function (compid, layoutname, propid)
    {
        return this.target.getLayoutProperty(compid, layoutname, propid);
    };

    _pFormAccessPort.changeLayout = function (compid, layoutname)
    {
        return this.target.changeLayout(compid, layoutname);
    };

    _pFormAccessPort.getCurrentLayout = function (compid)
    {
        return this.target.getCurrentLayout(compid);
    };

    _pFormAccessPort.setAutoLayoutChange = function (compid, is_auto)
    {
        return this.target.setAutoLayoutChange(compid, is_auto);
    };

    // 140617 박현진 : 현재 size에 맞는 layout으로 change
    _pFormAccessPort.refreshLayout = function (compid)
    {
        this.target.refreshLayout(compid);
    };

    _pFormAccessPort.recalcLayout = function (compid)
    {
        this.target.recalcLayout(compid);
    };

    _pFormAccessPort.refreshLinkedUrl = function (compid)
    {
        this.target.refreshLinkedUrl(compid);
    };

    _pFormAccessPort.getControlElementHandle = function (compid)
    {
        return this.target.getControlElementHandle(compid);
    };

    // 140529 박현진 : contents load
    _pFormAccessPort.setContents = function (compid, contents)
    {
        this.target.setContents(compid, contents);
    };

    _pFormAccessPort.setFormats = function (compid, contents)
    {
        this.target.setFormats(compid, contents);
    };

    // 140602 박현진 : innerdataset load
    _pFormAccessPort.setInnerDataset = function (compid, value, extern)
    {
        this.target.setInnerDataset(compid, value, extern);
    };

    _pFormAccessPort.setInitValueID = function (compid, value)
    {
        this.target.setInitValueID(compid, value);
    };

    _pFormAccessPort.callDesignMethod = function (compid, methodname)
    {
        return this.target.callDesignMethod(compid, methodname);
    };

    // 140618 박현진 : Tab 예외처리
    _pFormAccessPort.setActiveTabpage = function (compid, index)
    {
        this.target.setActiveTabpage(compid, index);
    };

    _pFormAccessPort.insertTabpage = function (compid, index, tabpageid)
    {
        this.target.insertTabpage(compid, index, tabpageid);
    };

    _pFormAccessPort.deleteTabpage = function (compid, index)
    {
        this.target.deleteTabpage(compid, index);
    };

    // 140603 박현진 : Form Dataset Handling
    _pFormAccessPort.addConstColumn = function (datasetid, columnid, type, size, value)
    {
        nexacro.ApplicationAccessPort.prototype.addConstColumn.call(this.target, datasetid, columnid, type, size, value);
    };

    _pFormAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value)
    {
        nexacro.ApplicationAccessPort.prototype.insertConstColumn.call(this.target, datasetid, index, columnid, type, size, value);
    };

    _pFormAccessPort.deleteConstColumn = function (datasetid, col)
    {
        nexacro.ApplicationAccessPort.prototype.deleteConstColumn.call(this.target, datasetid, col);
    };

    _pFormAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval)
    {
        nexacro.ApplicationAccessPort.prototype.setConstColumnProperty.call(this.target, datasetid, col, propid, propval);
    };

    _pFormAccessPort.getConstColumnProperty = function (datasetid, col, propid)
    {
        nexacro.ApplicationAccessPort.prototype.getConstColumnProperty.call(this.target, datasetid, col, propid);
    };

    _pFormAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext)
    {
        nexacro.ApplicationAccessPort.prototype.addColumn.call(this.target, datasetid, columnid, type, size, prop, sumtext);
    };

    _pFormAccessPort.insertColumn = function (datasetid, index, columnid, type, size, prop, sumtext)
    {
        nexacro.ApplicationAccessPort.prototype.insertColumn.call(this.target, datasetid, index, columnid, type, size, prop, sumtext);
    };

    _pFormAccessPort.deleteColumn = function (datasetid, col)
    {
        nexacro.ApplicationAccessPort.prototype.deleteColumn.call(this.target, datasetid, col);
    };

    _pFormAccessPort.setColumnProperty = function (datasetid, col, propid, propval)
    {
        nexacro.ApplicationAccessPort.prototype.setColumnProperty.call(this.target, datasetid, col, propid, propval);
    };

    _pFormAccessPort.getColumnProperty = function (datasetid, col, propid)
    {
        nexacro.ApplicationAccessPort.prototype.getColumnProperty.call(this.target, datasetid, col, propid);
    };

    _pFormAccessPort.addRow = function (datasetid)
    {
        nexacro.ApplicationAccessPort.prototype.addRow.call(this.target, datasetid);
    };

    _pFormAccessPort.insertRow = function (datasetid, index)
    {
        nexacro.ApplicationAccessPort.prototype.insertRow.call(this.target, datasetid, index);
    };

    _pFormAccessPort.deleteRow = function (datasetid, row)
    {
        nexacro.ApplicationAccessPort.prototype.deleteRow.call(this.target, datasetid, row);
    };

    _pFormAccessPort.setColumn = function (datasetid, row, col, value)
    {
        return nexacro.ApplicationAccessPort.prototype.setColumn.call(this.target, datasetid, row, col, value);
    };

    _pFormAccessPort.getColumn = function (datasetid, row, col)
    {
        nexacro.ApplicationAccessPort.prototype.getColumn.call(this.target, datasetid, row, col);
    };

    // designform의 csslist를 새롭게 세팅한다.
    _pFormAccessPort.setCssList = function (csslist)
    {
        return this.target.setCssList(csslist);
    };

    _pFormAccessPort.setActive = function ()
    {
        this.target.setActive();
    };

    // css editor에 theme 경로 설정
    _pFormAccessPort.setThemeUri = function (themename)
    {
        this.target.setThemeUri(themename);
    };

    delete _pFormAccessPort;


    //==============================================================================
    // DesignCssContext = 멀티테마를 위한 css context
    //==============================================================================
    if (!nexacro.DesignCssContext)
    {
        nexacro.DesignCssContext = function (url)
        {
            this._url = url;
            this._css_selectors = { _has_items: false, _has_attr_items: false };
        };

        var _pDesignCssContext = nexacro._createPrototype(nexacro.Object, nexacro.DesignCssContext);
        nexacro.DesignCssContext.prototype = _pDesignCssContext;

        _pDesignCssContext._addCss = nexacro.Application._addCss;

        delete _pDesignCssContext;
    }

    //==============================================================================
    // nexacro = global 
    //==============================================================================
    nexacro.createApplicationAccessPort = function ()
    {
        if (!_application.accessport)
            _application.accessport = new nexacro.ApplicationAccessPort(_application);
    };

    nexacro.destroyApplicationAccessPort = function ()
    {
        var app_ap = _application.accessport;
        if (app_ap)
        {
            var form_aps = app_ap._formaccessport;
            var form_aps_len = form_aps ? form_aps.length : 0;
            for (var i = form_aps_len - 1; i >= 0; i--)
            {
                var form_ap = form_aps[i].accessport;
                if (!form_ap)
                    continue;

                form_ap.destroy();
                delete form_ap;
            }

            form_aps = [];

            delete _application.accessport;
            _application.accessport = null;
        }
    };

    nexacro.closeApplication = function ()
    {
        if (_application)
        {
            var mainframe = _application.mainframe;
            if (mainframe)
                mainframe._destroy();

            //_application.exit();
            nexacro._applicationExit(true);
            delete _application;
            _application = null; // ?
        }
    };

    nexacro.getApplicationAccessPort = function ()
    {
        return _application.accessport;
    };

    // Childframe modify
    //--------------------------------------------------------
    // -> DesignFrameBase.js 로 이동

    // Form modify
    //------------------------------------------------

    // _checkValidLayout을 직접 변형해도 괜찮을것 같음.


    nexacro.Form.prototype.on_fire_onlayoutchanged = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight)
    {
        //trace(obj.name + ".on_fire_onlayoutchanged : " + curlayoutname + "->" + newlayoutname);
        if (this.onlayoutchanged && this.onlayoutchanged._has_handlers)
        {
            var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, curlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
            return this.onlayoutchanged._fireEvent(this, evt);
        }

        if (curlayoutname == null)
            return true;

        // notify to design window
        var win = this._getWindow();
        var frame = this.getOwnerFrame();
        var designform = frame.form;
        if (designform instanceof nexacro.DesignForm)
        {
            //var rootform = designform._inner_form;
            //var app_ap = _application.getApplicationAccessPort();
            //var form_ap = app_ap.getFormAccessPort(designform._url);

            // 140526 박현진 : 어떤 레이아웃으로 바뀌었는지 알아야 함        
            var extra_info = designform._getScopeName(obj) + ":" + newlayoutname;
            nexacro.__notifyToDesignWindow(win.handle, nexacro._design_notify_layoutchange, designform.id, extra_info);
        }

        return true;
    };

    // _application modify
    //----------------------------------------------------
    /*
    nexacro.Application.prototype._onHttpSystemError = function (obj, bfireevent, errorobj, errorcode, url, returncode, requesturi, locationuri)
    {
        var args = Array.prototype.slice.call(arguments, 3);
        var errormsg = this._getMsg.apply(this, args);

        if (bfireevent)
        {
            this.on_fire_onerror(obj, errorcode, errormsg, errorobj, returncode, requesturi, locationuri);
        }

        this._onFireSystemError(obj, false, errorcode, 1, errormsg, true);

        if (obj instanceof nexacro.Div)
        {
            // div http error -> notify
            var win = obj._getWindow();
            var frame = obj.getOwnerFrame();
            var designform = frame.form;
            var extra_info = designform._getScopeName(obj);

            nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_div_httperror, designform.id, extra_info);
                    }
    };
	*/

    /*
    nexacro.CommunicationItem.prototype.on_error = function (errstatus, fireerrorcode, returncode, locationuri)
    {
        delete nexacro._CommunicationManager[this.path];

        var callbackList = this.callbackList;
        var n = callbackList.length;
        if (n > 0)
        {
            for (var i = 0; i < n; i++)
            {
                var item = callbackList[i];
                var target = item.target;
                if (target._is_alive != false)
                {
                    // 2015.03.10 neoarc; 잘못된 url 호출시 예전에 로드된 fdl의 on_create가 물려있음.
                    item.target.context.on_create = nexacro._emptyFn;

                    item.callback.call(target, this.path, errstatus, null, fireerrorcode, returncode, this.path, locationuri);
                }
            }
            callbackList.splice(0, n);
        }
        this._handle = null;
    };
	*/
    // Component modify
    //----------------------------------------------------

    // TODO check 이럴 필요가 있을지??
    this.Form = nexacro.DesignForm;

    // CompBase
    //-------------------------------------------------------------
    // -> DesignCompBase.js로 이동

    // Element Handle API modify
    //-------------------------------------------------------------
    if (nexacro._Browser == "Runtime")
    {
        if (nexacro.Element)
        {
            var _pElement = nexacro.Element.prototype;
            _pElement.setElementVisible = function (visible)
            {
                if (this.visible != visible)
                {
                    this.visible = visible;
                    var design_visible = visible;
                    var _handle = this.handle;
                    if (_handle)
                    {
                        design_visible = true;

                        ///*
                        if (this.linkedcontrol)
                        {
                            // 임시코드 하드코딩
                            if (this.linkedcontrol instanceof nexacro.Tabpage || this.linkedcontrol._is_subcontrol)
                                design_visible = visible;
                        }
                        else
                        {
                            design_visible = visible;
                        }
                        //*/

                        nexacro.__setElementHandleVisible(_handle, design_visible);
                    }

                    this._design_visible = design_visible;
                }
            };
        }

        //_pPluginElement.setElementPluginVisible
        //_pGridCellTextContainerElement.setElementTextVisible
        //..

        // SubLayout Editing Mode Element
        //----------------------------------------------------------------
        nexacro.SubLayoutOverlayElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            var client_element = new nexacro._ContainerElement(this);
            this._client_element = client_element;
        };

        var _pSubLayoutOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.SubLayoutOverlayElement);
        nexacro.SubLayoutOverlayElement.prototype = _pSubLayoutOverlayElement;
        _pSubLayoutOverlayElement._type_name = "SubLayoutOverlayElement";

        _pSubLayoutOverlayElement.create = function (background)
        {
            var parent_elem = this.parent_elem;
            if (this.parent_elem && !this.handle)
            {
                var _win = this.linkedcontrol._getWindow();
                this._win_handle = _win.handle;

                this.left = 0;
                this.top = 0;
                this.width = parent_elem.width;
                this.height = parent_elem.height;

                var _handle = this.handle = this._dest_handle = nexacro.__createControlElementHandle(this, this._win_handle, this.left, this.top, this.width, this.height);
                _handle._linked_element = this;

                var handle_style = _handle.style;
                this.setElementBackground(background);

                this.owner_elem = parent_elem;
                nexacro.__appendElementHandle(parent_elem.handle, _handle);

                this._refreshControl(_handle);

                var client_elem = this._client_element;
                client_elem.left = this.left;
                client_elem.top = this.top;
                client_elem.width = this.width;
                client_elem.height = this.height;

                if (this.handle && !this._client_element.handle)
                    this._client_element.create(_win);
            }
        };

        _pSubLayoutOverlayElement.destroy = function ()
        {
            if (this.handle)
            {
                nexacro.__destroyElementHandle(this.parent_elem.handle, this.handle);
                this.handle = null;

                this._client_element.destroy();
            }
        };

        _pSubLayoutOverlayElement.getContainerElement = function ()
        {
            return this._client_element;
        };

        _pSubLayoutOverlayElement.getRootWindowHandle = function ()
        {
            return this._win_handle;
        };
        delete _pSubLayoutOverlayElement;
    }
}

