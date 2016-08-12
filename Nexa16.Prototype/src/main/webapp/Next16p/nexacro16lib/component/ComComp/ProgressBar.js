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

//======================================================================================
// nexacro.ProgressBar && nexacro.ProgressBar_Style
//======================================================================================
if (!nexacro.ProgressBar)
{
    //==================================================================================
    // nexacro.ProgressBar_Style
    //==================================================================================
   
    //==================================================================================
    // nexacro.ProgressBar
    //==================================================================================
    nexacro.ProgressBar = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
        this._progressbaritems = new Array();
    };

    var _pProgressBar = nexacro._createPrototype(nexacro.Component, nexacro.ProgressBar);
    nexacro.ProgressBar.prototype = _pProgressBar;

    _pProgressBar._type_name = "ProgressBar";

    //default properties //
    _pProgressBar.smooth = false;
    _pProgressBar.direction = "forward";

    _pProgressBar.pos = 0;  // default value 0 <- spac why set "0"
    _pProgressBar.step = 1;
    _pProgressBar.max = 100;
    _pProgressBar.min = 0;
    _pProgressBar.blocksize = undefined;
    _pProgressBar.blockgap = 2;
    _pProgressBar.progressstartcap = null;
    _pProgressBar.progressendcap = null;
    _pProgressBar._progressbartext = null;

    // internal variable //   
    _pProgressBar._accessibility_role = "progressbar";
    //_pProgressBar._is_simple_control = true;
    _pProgressBar._endcap_width = 0;
    _pProgressBar._startcap_width = 0;
    _pProgressBar._item_width = 0;

    _pProgressBar._endcap_iconwidth = undefined;
    _pProgressBar._startcap_iconwidth = undefined;

    _pProgressBar._endcap_edgewidth = undefined;
    _pProgressBar._startcap_edgewidth = undefined;

    _pProgressBar._item_iconwidth = undefined;
    _pProgressBar._item_edgewidth = undefined;

    _pProgressBar._item_icon_url = "";
    _pProgressBar._item_edge_url = "";

    _pProgressBar._pos = 0;  // default value 0 <- spac why set "0"
    _pProgressBar._step = 1;
    _pProgressBar._max = 100;
    _pProgressBar._min = 0;
    _pProgressBar._blocksize = undefined;
    _pProgressBar._blockgap = 2;

    _pProgressBar._default_blocksize = 15;

    //==================================================================================
    // nexacro.ProgressBar : Style Part
    //==================================================================================

    /* apply style */   
    _pProgressBar.on_apply_text = function (v)
    {     
        var control_elem = this.getElement();
               
        if (control_elem)
        {
            if (!v)
                v = this.text;

            if (v)
            {
                var progressbartext = this._progressbartext;

                if (!progressbartext)
                {
                    var client_width = this._getClientWidth();
                    var client_height = this._getClientHeight();

                    progressbartext = this._progressbartext = new nexacro.Static("progressbartext", "absolute", 0, 0, client_width, client_height, null, null, this);
                    progressbartext._setControl();
                    progressbartext.set_text(v);
                    progressbartext.createComponent();      
                }
                else
                {
                    var client_width = this._getClientWidth();
                    var client_height = this._getClientHeight();

                    progressbartext.set_text(v);
                    progressbartext.move(0, 0, client_width, client_height, null, null);

                    if (!progressbartext._is_created)
                        progressbartext.on_created();
                    
                }

            }
            else
            {
                if (this._progressbartext)
                {
                    this._progressbartext.destroy();
                    this._progressbartext = null;
                }
            }
        }
    };

    _pProgressBar.on_apply_prop_enable = function (v)
    {
        if (this.progressstartcap)
            this.progressstartcap._setEnable(v);

        if (this.progressendcap)
            this.progressendcap._setEnable(v);

    	var items = this._progressbaritems;
    	var itemcnt = items.length;    	
    	for (var i = 0; i < itemcnt; i++)
    	{
    		items[i]._setEnable(v);
    	}
    };

    //==================================================================================
    // nexacro.ProgressBar : Create & Destroy & Update
    //==================================================================================
    _pProgressBar.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._createProgressBarItems(true);
        }
    };

    _pProgressBar.on_created_contents = function (_window)
    {
        if (nexacro._enableaccessibility && this._isAccessibilityEnable())
        {
            this._setAccessibilityInfoValueMin(this.min);
            this._setAccessibilityInfoValueMax(this.max);
            this._setAccessibilityInfoValueCur(this.pos);
        }

        this._createdProgressBarItems(_window);
        
    };

    _pProgressBar.on_create_contents_command = function (_window)
    {
    	var str = "";
    	if (this.progressstartcap)
       	    str += this.progressstartcap.createCommand();

        var itemlist = this._progressbaritems;
        for (var i = 0; i < itemlist.length; i++)
            str += itemlist[i].createCommand();

        if (this.progressendcap)
            str += this.progressendcap.createCommand();

        if (this._progressbartext)
            str += this._progressbartext.createCommand();

        return str;
    };

    _pProgressBar.on_attach_contents_handle = function (win)
    {
        if (this.progressstartcap)
            this.progressstartcap.attachHandle(win);

        var itemlist = this._progressbaritems;
        for (var i = 0; i < itemlist.length; i++)
            itemlist[i].attachHandle(win);

        if (this.progressendcap)
            this.progressendcap.attachHandle(win);

        if (this._progressbartext)
            this._progressbartext.attachHandle(win);
        if (nexacro._enableaccessibility && this._isAccessibilityEnable())
        {
            this._setAccessibilityInfoValueMin(this.min);
            this._setAccessibilityInfoValueMax(this.max);
        	this._setAccessibilityInfoValueCur(this.pos);
        }
    };

    _pProgressBar.on_destroy_contents = function ()
    {
        if (this.progressstartcap)
        {
            this.progressstartcap.destroy();
            this.progressstartcap = null;
        }
        
        if (this.progressendcap)
        {
            this.progressendcap.destroy();
            this.progressendcap = null;
        }
        
        if (this._progressbartext)
        {
            this._progressbartext.destroy();
            this._progressbartext = null;
        }
        this._clearProgressBarItems(true);
    };
    

    _pProgressBar._on_loadimage_start_icon = function (imgurl, width, height)
    {
        this._startcap_iconwidth = width;
        this.progressstartcap.set_icon(imgurl);
        this._update();
    };
    _pProgressBar._on_loadimage_start_edge = function (imgurl, width, height)
    {
        this._startcap_edgewidth = width;
        this._update();
    };
    _pProgressBar._on_loadimage_end_icon = function (imgurl, width, height)
    {
        this._endcap_iconwidth = width;
        this.progressendcap.set_icon(imgurl);
        this._update();
    };

    _pProgressBar._on_loadimage_end_edge = function (imgurl, width, height)
    {
        this._endcap_edgewidth = width;
        this._update();
    };

    _pProgressBar._on_loadimage_item_icon = function (imgurl, width, height)
    {
        this._item_iconwidth = width;
        this._update();
    };

    _pProgressBar._on_loadimage_item_edge = function (imgurl, width, height)
    {
        this._item_edgewidth = width;
        this._update();
    };


    _pProgressBar._createdProgressBarItems = function (_window)
    {
        if (this.progressstartcap)
        {
            this.progressstartcap.on_created(_window);
        }

    	var itemlist = this._progressbaritems;
    	var itemcnt = itemlist.length;
    	for (var i = 0; i < itemcnt; i++)
            itemlist[i].on_created(_window) ;

    	if (this.progressendcap)
    	{
    	    this.progressendcap.on_created(_window);
    	}

    	if (this._progressbartext)
    	{
    	    this._progressbartext.on_created(_window);
    	}
    	
    };

    _pProgressBar._createProgressStartCap = function (iscreateonly)
    {
        var progressstartcap = this.progressstartcap;
        if (!progressstartcap)
        {
            progressstartcap = new nexacro._Icon("progressstartcap", "absolute", 0, 0, 0, this._getClientHeight(), null, null, this);
            progressstartcap._setControl();
            progressstartcap.createComponent();
            this.progressstartcap = progressstartcap;
        }

        var border = progressstartcap._getCurrentStyleBorder();
        var padding = progressstartcap._getCurrentStylePadding();		

		this._startcap_width = border ? (border.left._width + border.right._width) : 0;
		this._startcap_width += padding ? (padding.left + padding.right) : 0;

		var startcap_icon = progressstartcap._icon || progressstartcap._getCSSStyleValue("icon");
		var startcap_edge = progressstartcap._edge || progressstartcap._getCSSStyleValue("edge");

		if (startcap_icon && this._startcap_iconwidth === undefined)
		{
		    if (startcap_icon instanceof Object)
		        startcap_icon = startcap_icon.value;
		    
		    var imagesize = nexacro._getImageSize(startcap_icon, this._on_loadimage_start_icon, this);
		    if (imagesize)
		    {
		        this._startcap_iconwidth = imagesize.width;
		        progressstartcap.set_icon(startcap_icon);
		    }
		}
		
		if (startcap_edge && startcap_edge.url && this._startcap_edgewidth === undefined)
        {
		    var imagesize = nexacro._getImageSize(startcap_edge.url, this._on_loadimage_start_edge, this);
		    if (imagesize)
		    {
		        this._startcap_edgewidth = imagesize.width;
		    }
		}
    };

    _pProgressBar._createProgressEndCap = function (iscreateonly)
    {
        var progressendcap = this.progressendcap;
        if (!progressendcap)
        {
            progressendcap = new nexacro._Icon("progressendcap", "absolute", 0, 0, 0, this._getClientHeight(), null, null, this);
            progressendcap._setControl();
            progressendcap.createComponent();
            this.progressendcap = progressendcap;
        }

        var border = progressendcap._getCurrentStyleBorder();
        var padding = progressendcap._getCurrentStylePadding();

        this._endcap_width = border ? (border.left._width + border.right._width) : 0;
        this._endcap_width += padding ? (padding.left + padding.right) : 0;

        var endcap_icon = progressendcap._icon || progressendcap._getCSSStyleValue("icon");
        var endcap_edge = progressendcap._edge || progressendcap._getCSSStyleValue("edge");
            
        if (endcap_icon && this._endcap_iconwidth === undefined)
        {
            if (endcap_icon instanceof Object)
                endcap_icon = endcap_icon.value;

            var imagesize = nexacro._getImageSize(endcap_icon, this._on_loadimage_end_icon, this);
            if (imagesize)
            {
                this._endcap_iconwidth = imagesize.width;
                progressendcap.set_icon(endcap_icon);
            }
        }

        if (endcap_edge && endcap_edge.url && this._endcap_edgewidth === undefined)
        {
            var imagesize = nexacro._getImageSize(endcap_edge.url, this._on_loadimage_end_edge, this);
            if (imagesize)
            {
                this._endcap_edgewidth = imagesize.width;
            }
        }
    };

    _pProgressBar._createProgressBarItemTemp = function (iscreateonly)
    {
    	var progressbaritem = new nexacro._ProgressBarItemControl("progressbaritem", "absolute", 0, 0, 0, this._getClientHeight(), null, null, this);
    	progressbaritem._initCSSSelector();
    	
    	var item_icon = progressbaritem._icon || progressbaritem._getCSSStyleValue("icon");
    	var item_edge = progressbaritem._edge || progressbaritem._getCSSStyleValue("edge");

    	var border = progressbaritem._getCurrentStyleBorder();
    	var padding = progressbaritem._getCurrentStylePadding();

    	this._item_width = border ? (border.left._width + border.right._width) : 0;
    	this._item_width += padding ? (padding.left + padding.right) : 0;

    	if (item_icon && this._item_iconwidth === undefined)
    	{
    	    if (item_icon instanceof Object)
    	        item_icon = item_icon.value;

    	    this._item_icon_url = item_icon;
    	    var imagesize = nexacro._getImageSize(item_icon, this._on_loadimage_item_icon, this);
    	    if (imagesize)
    	    {
    	        this._item_iconwidth = imagesize.width;
    	    }
    	}

    	if (item_edge && item_edge.url && this._item_edgewidth === undefined)
		{
    	    this._item_edge_url = item_edge.url;
    	    var imagesize = nexacro._getImageSize(item_edge.url, this._on_loadimage_item_edge, this);
    		if (imagesize)
    		{
    			this._item_edgewidth = imagesize.width;    			
    		}
		}

		progressbaritem.destroy();
		progressbaritem = null;
    };
	
   
    _pProgressBar._createProgressBarItems = function (iscreateonly)
    {
        if (this.pos <= 0)
        {
            if (this.progressendcap)
            {
                this.progressstartcap.destroy();
                this.progressstartcap = null;
            }
            if (this.progressendcap)
            {
                this.progressendcap.destroy();
                this.progressendcap = null;
            }
            this._clearProgressBarItems(true);
            
            this.on_apply_text();
            return;
        }
        else
        {
            this._createProgressStartCap(iscreateonly);
            this._createProgressEndCap(iscreateonly);
            this._createProgressBarItemTemp();
        }
    	
        this._setSizeInfo();
        var barinfo = this._getBarInfo();

    	var barcount = barinfo[0];
    	var barcurpos = barinfo[1];
    	var barwidth = barinfo[2];

    	var control_elem = this.getElement();    	
    	var client_width = this._getClientWidth();
    	var client_height = this._getClientHeight();
    	var l, t = this._getClientTop(); w = 0;    	

    	var blockgap = this._blockgap;
    	var smooth = this.smooth;
    	var direction = this.direction;

    	var win = this._getWindow();

    	var baritem;
    	var itemlist = this._progressbaritems;
    	
    	this._clearProgressBarItems(false, barinfo);


    	if (direction == "backward")
    	{
    		if (this._endcap_width)
    		    this.progressendcap.move(client_width - this._endcap_width, 0, this._endcap_width, client_height);
    	}
    	else
    	{
    	    if (this._startcap_width)
    	        this.progressstartcap.move(0, 0, this._startcap_width, client_height);
    	}

    	if (smooth)
    	{
    		if (direction == "backward")
    		{
    			w = barwidth | 0;
    			l = client_width - this._endcap_width - barwidth;
    			if (this._startcap_width)
    			    this.progressstartcap.move(l - this._startcap_width, t, this._startcap_width, client_height);
    		}
    		else
    		{
    		    l = this._startcap_width;   // left top position is 0 for forward direction
    			w = barwidth | 0;
    			if (this._endcap_width)
    			    this.progressendcap.move(l + w, t, this._endcap_width, client_height);
    		}

    		baritem = itemlist[0];
    		if (!baritem)
    		{
    		    baritem = new nexacro._ProgressBarItemControl("progressbaritem", "absolute", l, t, w, client_height, null, null, this);    			
    			baritem.createComponent(iscreateonly);

    			itemlist[0] = baritem;
    		}
    		else
    			baritem.move(l, t, w, client_height);
    	}
    	else
    	{  // block 처리일 때
    		if (direction == "backward")
    		{
    			var blocksize = barwidth + blockgap;
    			l = client_width - this._endcap_width;
    			for (var i = 0; i < barcurpos; i++)
    			{
    				baritem = itemlist[i];

    				l = client_width - this._endcap_width - (i * blocksize) - barwidth;
    				w = barwidth;

    				if (i == (barcurpos - 1) && (l - barwidth) <= 0)
    				{
    				    w = client_width - this._startcap_width - this._endcap_width - (i * blocksize);
    				    l = this._startcap_width;
    				}

    				if (!baritem)
    				{
    					baritem = new nexacro._ProgressBarItemControl("progressbaritem_" + i, "absolute", l, t, w, client_height, null, null, this);
    					baritem.createComponent(iscreateonly);

    					itemlist[i] = baritem;
    				}
    				else
    					baritem.move(l, t, w, client_height);
    			}

    			if (this._startcap_width)
    			{
    			    this.progressstartcap.move(l - this._startcap_width, t, this._startcap_width, client_height);
    			}
    		}
    		else
    		{
    			var blocksize = barwidth + blockgap;
    			l = this._startcap_width;

    			var progressitem_totalwidth = client_width - this._startcap_width - this._endcap_width;
    			for (var i = 0; i < barcurpos; i++)
    			{
    				baritem = itemlist[i];
    				w = barwidth;
    				l = (i * blocksize) + this._startcap_width;

    				if (i == (barcurpos - 1) && (l + barwidth) >= (progressitem_totalwidth))
    				{
    				    w = client_width - this._endcap_width - l;
    				}

    				if (!baritem)
    				{
    					baritem = new nexacro._ProgressBarItemControl("progressbaritem_" + i, "absolute", l, t, w, client_height, null, null, this);
    					baritem.createComponent(iscreateonly);

    					itemlist[i] = baritem;
    				}
    				else
    					baritem.move(l, t, w, client_height);
    			}

    			if (this._endcap_width)
    			{
    			    this.progressendcap.move(l + w, t, this._endcap_width, client_height);
    			}
    		}
    	}

    	this.on_apply_text(this.text);

    	if (itemlist.length > 0 && this._progressbartext)
    	{
    	    var progressbartext_elem = this._progressbartext.getElement();
    	    control_elem.moveToPrevElement(progressbartext_elem, itemlist[itemlist.length - 1].getElement());
    	}

    };

	
    _pProgressBar._clearProgressBarItems = function (allclear, info)
    {
    	var olditemcnt = this._progressbaritems.length;
    	if (olditemcnt <= 0) return;
    	var deletecnt = olditemcnt;

    	if (!allclear)
    	{
    		var newitemcnt = info[1];
    		if (olditemcnt > newitemcnt) 
    			deletecnt = olditemcnt - newitemcnt;
    	}
    	
    	for (var i = 0; i < deletecnt; i++)
    	{
    		var item = this._progressbaritems.pop();
    		if (item)
    		{
    			item.destroy();
    			item = null;
    		}
    	}
		
    };

    _pProgressBar.on_change_containerRect = function (width, height)
    {
        this._update();
    };

    _pProgressBar._update = function ()
    {
        if (!this._is_created)
            return;

        this._createProgressBarItems(false);
     };

    //============================================================
    // nexacro.ProgressBar : override
    //============================================================   
    _pProgressBar._on_getAccessibilityAdditionalLabel = function ()
    {
        var additional = "";
        if (this._isAccessibilityEnable())
        {
            additional = (this.expr && this.expr.length > 0) ? this._displaytext + " " + this.min + " " + this.max : this.pos + " " + this.min + " " + this.max;
        }
        return additional;
    };

    _pProgressBar._on_getAccessibilityAdditionalRole = function ()
    {
        if (this._getAccessibilityRole() == "progressbar")
            return " ProgressBar";
        return "";
    };
    //============================================================
    // nexacro.ProgressBar : Properties
    //============================================================
 

    _pProgressBar.set_blockgap = function (v)
    {
        if (this.blockgap != v)
        {
        	this.blockgap = v;
            var blockgap = parseInt(v) | 0;
            this._blockgap = (blockgap < 0) ? 0 : blockgap;
            this._update();
        }
    };

    _pProgressBar.set_blocksize = function (v)
    {        
        if (this.blocksize != v)
        {
        	this.blocksize = v;
            var blocksize = parseInt(v) | 0;
            this._blocksize = (blocksize < 1) ? 1 : blocksize;
            this._update();
        }
    };

    _pProgressBar.set_min = function (v)
    {        
        if (this.min != v)
        {
            var min = parseInt(v) | 0;
            min = (min < 0) ? 0 : min;

            this.min = min;

            if (min > this.max)
            {
                this.max = min;
            }
            if (min > this.pos)
            {
                this.pos = min;
            }

            if (nexacro._enableaccessibility && this._isAccessibilityEnable())
            {
                this._setAccessibilityInfoValueMin(min);
            }
            this._update();
        }
    };

    _pProgressBar.set_max = function (v)
    {   
        if (this.max != v)
        {
            var max = parseInt(v) | 0;
            max = (max < 0) ? 0 : max;

            this.max = v;

            if (max < this.min)
            {
                this.min = max;
            }
            if (max < this.pos)
            {
                this.pos = max;
            }

            if (nexacro._enableaccessibility && this._isAccessibilityEnable())
            {
                this._setAccessibilityInfoValueMax(max);
            }
            this._update();
        }
    };

    _pProgressBar.set_pos = function (v)
    {
        if (this.pos != v)
        {
        	var pos = parseInt(v) | 0;
            pos = (pos < 0) ? 0 : pos;

            this.pos = pos;

            if (pos > this.max)
            {
                this.pos = pos = this.max;
            }
            else if (pos < this.min)
            {
                this.pos = pos = this.min;
            }

            if (nexacro._enableaccessibility && this._isAccessibilityEnable())
            {
                this._setAccessibilityInfoValueCur(pos);
            }
        }
        this._update();
    };

    _pProgressBar.set_step = function (v)
    {       
        if (this.step != v)
        {
        	this.step = v;
        	this._step = parseInt(v) | 0;            
            this._update();
        }
    };

    _pProgressBar.set_smooth = function (v)
    {
        v = nexacro._toBoolean(v);
        if (this.smooth != v)
        {
            this.smooth = v;
            this._update();
        }
    };

    _pProgressBar.set_direction = function (v)
    {
        v = nexacro._toString(v);
        if (this.direction != v)
        {
            this.direction = v;
            this._update();
        }
    };

  
    //============================================================
    // nexacro.GroupBox : Methods
    //============================================================

    _pProgressBar.stepIt = function ()
    {
        this.set_pos(this.pos + this._step);
    };

    //============================================================
    // nexacro.ProgressBar : Logical Part
    //============================================================
    _pProgressBar._setSizeInfo = function ()
    {
        if (this._startcap_iconwidth && this._startcap_edgewidth)
            this._startcap_width += this._startcap_iconwidth > this._startcap_edgewidth ? this._startcap_iconwidth : this._startcap_edgewidth;

        if (this._endcap_iconwidth && this._endcap_edgewidth)
            this._endcap_width += this._endcap_iconwidth > this._endcap_edgewidth ? this._endcap_iconwidth : this._endcap_edgewidth;

        if (this._item_iconwidth && this._item_edgewidth)
            this._item_width += this._item_iconwidth > this._item_edgewidth ? this._item_iconwidth : this._item_edgewidth ;
    };

    _pProgressBar._getBarInfo = function ()
    {
        var rtn = null;
        var barcount = 0;
        var barcurpos = 0;
        var barwidth = 0;

        var client_height = this._getClientHeight();
        var client_width = this._getClientWidth() - this._startcap_width - this._endcap_width;

        var pos = parseInt(this.pos) | 0;
        var max = parseInt(this.max) | 0;
        var min = parseInt(this.min) | 0;
        if (pos < min) pos = min;
        if (pos > max) pos = max;

        var per = pos / max;

        var smooth = this.smooth;
        var direction = this.direction;
        
        var blocksize = this.blocksize ? this._blocksize : (this._item_width ? this._item_width : this._default_blocksize);

        var blockgap = this._blockgap;

        if (smooth)
        {
            barcount = 1;
            barwidth = parseInt(client_width * per) | 0;
            barcurpos = 0;
        }
        else
        {
            barwidth = blocksize;
            barcount = Math.ceil(client_width / (barwidth + blockgap));
            barcurpos = Math.floor(barcount * per);
        }

        rtn = [barcount, barcurpos, barwidth];
        try
        {
            return rtn;
        }
        finally
        {
            rtn = null;
        }
    };
    //--------------------------------------------------------
   
    delete _pProgressBar;

    nexacro._ProgressBarItemControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro._Icon.call(this, id, position, left, top, width, height, right, bottom, parent);       
    };

    var _pProgressBarItemControl = nexacro._createPrototype(nexacro._Icon, nexacro._ProgressBarItemControl);
    nexacro._ProgressBarItemControl.prototype = _pProgressBarItemControl;

    
    _pProgressBarItemControl._type_name = "IconControl";
    _pProgressBarItemControl._is_subcontrol = true;    
    _pProgressBarItemControl._is_focus_accept = false;

    _pProgressBarItemControl.on_getIDCSSSelector = function ()
    {
        return "progressbaritem";
    };

    ////_pProgressBarItemControl.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus)
    ////{
    ////    return changestatus;
    ////};

    //_pProgressBarItemControl.on_apply_edge = function (edge)
    //{
    //	if (!this._isEnableRedraw()) return;
    //	var control_elem = this._control_element;
    //	if (control_elem)
    //		control_elem.setElementEdge(edge);

	//	//notify to parent 
    //};

    delete _pProgressBarItemControl;


}

