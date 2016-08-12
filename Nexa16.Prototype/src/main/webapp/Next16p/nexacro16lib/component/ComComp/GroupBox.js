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
// nexacro.GroupBox
//==============================================================================
if (!nexacro.GroupBox)
{
    // ==============================================================================
    // GroupBox_Style
    // ==============================================================================
    
    //==================================================================================
    // nexacro.GroupBox
    //==================================================================================
    nexacro.GroupBox = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };
                
    var _pGroupBox = nexacro._createPrototype(nexacro.Component, nexacro.GroupBox);
    nexacro.GroupBox.prototype = _pGroupBox;
    _pGroupBox._type_name = "GroupBox";

    _pGroupBox.titlealign = "topleft";

    _pGroupBox._icon_width = 0;
    _pGroupBox._icon_height = 0;
    _pGroupBox._title_gap = 10; // default
    _pGroupBox._title_adjust_width = 8; 

    _pGroupBox.tabstop = false;
    _pGroupBox._is_focus_accept = false;
    _pGroupBox._accessibility_role = "groupbox";
    
         /* event list */
    _pGroupBox._event_list = {
            "onlbuttondown": 1, "onlbuttonup": 1, 
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1, "onsize": 1,
            "onmousedown": 1, "onmouseup": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1            
        };


    //=================================================================
    // nexacro.GroupBox : Style Part
    //=================================================================    
    _pGroupBox.on_apply_titlealign = function ()
    {
        this._updateSubControl();
    };


    _pGroupBox.on_apply_font = function (font)
    {
        nexacro.Component.prototype.on_apply_font.call(this, font);
        this._updateSubControl();
    };
   
    //==================================================================================
    // nexacro.GroupBox : Create & Destory & Update
    //==================================================================================
    _pGroupBox.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
    {
            this._createControl(true);
        }
    };

    _pGroupBox.on_created_contents = function ()
    {
        var titlectrl = this._titlectrl;
        var boxctrl = this._boxctrl;

        if (boxctrl)
            boxctrl.on_created();
        if (titlectrl)
            titlectrl.on_created();
        
        this._is_created = true;
        this._updateSubControl();
    };

    _pGroupBox.on_create_contents_command = function ()
    {
        var str = "";

        var titlectrl = this._titlectrl;
        var boxctrl = this._boxctrl;

        if (boxctrl)
            str += boxctrl.createCommand();
        if (titlectrl)
            str += titlectrl.createCommand();

        
        return str;
    };

    _pGroupBox.on_attach_contents_handle = function (win)
    {        
        var titlectrl = this._titlectrl;
        var boxctrl = this._boxctrl;

        if (boxctrl)
            boxctrl.attachHandle(win);
        if (titlectrl)
            titlectrl.attachHandle(win);

        this._is_created = true;
        this._updateSubControl();
    };

    _pGroupBox.on_destroy_contents = function ()
    {
        var titlectrl = this._titlectrl;
        var boxctrl = this._boxctrl;

        if (titlectrl)
            titlectrl.destroy();
        if (boxctrl)
            boxctrl.destroy();
    };

    _pGroupBox.on_change_containerRect = function (width, height)
    {
        if (this._is_created)
            this._updateSubControl();
    };

    _pGroupBox._createControl = function (bCreateOnly)
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var titlectrl = this._titlectrl;
            var boxctrl = this._boxctrl;

            if (!titlectrl)
            {
                titlectrl = this._titlectrl = new nexacro._IconText("groupboxtitle", "absolute", 0, 0, 0, 0, 0, 0, this);
                titlectrl._setControl();
                titlectrl.set_iconPosition("left");
                titlectrl.set_verticalAlign("middle");

				titlectrl.createComponent(bCreateOnly);
                var iconUrl = titlectrl.icon || titlectrl._getCSSStyleValue("icon");
                if (iconUrl)
                {
                    if (iconUrl instanceof Object)
                        iconUrl = iconUrl.value;

                    size = nexacro._getImageSize(iconUrl, this._loaded_iconImage, this);
                    if (size)
                    {
                        this._icon_width = size.width;
                        this._icon_height = size.height;

                        titlectrl.set_icon(iconUrl);
                    }
                }
                var icon_pos = titlectrl.iconPosition || titlectrl._getCSSStyleValue("iconPosition");
                titlectrl.set_iconPosition(icon_pos);

                titlectrl.set_text(this._displaytext);
            }

            if (!boxctrl)
            {
                boxctrl = this._boxctrl = new nexacro.Static("groupboxcontents", "absolute", 0, 0, 0, 0, 0, 0, this);
                boxctrl._setControl();
                boxctrl.createComponent(bCreateOnly);
            }
        }
    };
    //============================================================
    // nexacro.GroupBox : Properties
    //============================================================    
    _pGroupBox.set_titlealign = function (v)
    {
        var val = v.toString();
        if (val != this.titlealign)
        {
            this.titlealign = val;
            this.on_apply_titlealign(val);
        }
    };

    //hidden property
    _pGroupBox.set_titlegap = function (v)
    {
        var val = +v;
        if (val != this.titlegap)
        {
        	this.titlegap = val;
        	this._title_gap = val;
            this.on_apply_gap(val);
        }
    };

    _pGroupBox.on_apply_gap = function (v)
    {
        this._updateSubControl();
    };  

    _pGroupBox.on_apply_text = function (text)
    {
        var titlectrl = this._titlectrl;
        if (titlectrl)
        {
            titlectrl.set_text(text);
            this._updateSubControl();
        }
    };

    //===============================================================
    // nexacro.Static : Override
    //===============================================================
    _pGroupBox.on_get_prop_tabstop = function ()
    {
        if (nexacro._enableaccessibility)
        {
            var accessibility = this.accessibility;
            if (accessibility && accessibility.enable && accessibility.role == "link")
                return true;
        }
        return false;
    };

    _pGroupBox._isFocusAcceptable = function ()
    {
        return nexacro._enableaccessibility;
    };
    
    _pGroupBox.on_apply_prop_enable = function (v)
    {
        var titlectrl = this._titlectrl;
        if (titlectrl)
            titlectrl.set_enable(v);

        var boxctrl = this._boxctrl;
        if (boxctrl)
            boxctrl.set_enable(v);
    };

    //=================================================================
    // nexacro.GroupBox : Logical Part
    //=================================================================    
    _pGroupBox._loaded_iconImage = function (imgurl, w, h)
    {
        this._icon_width = w;
        this._icon_height = h;

        var titlectrl = this._titlectrl;
        titlectrl.set_icon(imgurl);

        if (this._is_created)
            this._updateSubControl();
    };

    _pGroupBox._getMakeClientRect = function (comp)
    {
        return { left: comp._getClientLeft(), top: comp._getClientTop(), right: comp._getClientLeft() + comp._getClientWidth(), bottom: comp._getClientTop() + comp._getClientHeight(), width: comp._getClientWidth(), height: comp._getClientHeight() };
    };

    _pGroupBox._GetTextSize = function (text)
    {
        if (!this._titlectrl)
        {
            return 0;
        }
        var font = this._titlectrl._getCurrentStyleInheritValue("font");
        return nexacro._getTextSize(text, font);
    };

    _pGroupBox._setTitleBorderNone = function (pos)
    {
        var titlectrl = this._titlectrl;
        if (!titlectrl)
            return;

        titlectrl._setBorderNone(pos);
    };

    _pGroupBox._updateSubControl = function ()
    {
    	if (!this._is_created)
    		return;

    	var control_elem = this.getElement();
    	if (!control_elem)
    		return;

    	var clientHeight = clientWidth = 0;
    	var border, padding;
    	var titlectrl_border, boxctrl_border;
    	var titlectrl_textpadding;
    	var titlectrl_padding;

    	var bl = bt = bb = br = bw = bh = 0;
    	var pl = pt = pb = pr = pw = ph = 0;
    	var titlectrl_bl = titlectrl_bt = titlectrl_bb = titlectrl_br = 0;
    	var titlectrl_tpw = titlectrl_tph = 0;
    	var titlectrl_pw = titlectrl_ph = 0;

    	var boxctrl_bl = boxctrl_bt = boxctrl_bb = boxctrl_br = 0;

    	var titlectrl, boxctrl;
    	var textsize;
    	var iconwidth = iconheight = 0;
    	var font;

    	var titlectrl_left = titlectrl_top = titlectrl_width = titlectrl_height = 0;
    	var boxctrl_left = boxctrl_top = boxctrl_width = boxctrl_height = 0;

    	var titlealign = this.titlealign;
    	var gap = this._title_gap;
    	var adjust_width = this._title_adjust_width;

    	border = this._getCurrentStyleBorder();
    	padding = this._getCurrentStylePadding();

        
    	if (border)
    	{
    		bl = border.left._width;
    		bt = border.top._width;
    		bb = border.bottom._width;
    		br = border.right._width;

    		bw = bl + br;
    		bh = bt + bb;
    	}

        /*
    	if (padding)
    	{
    		pl = padding.left;
    		pt = padding.top;
    		pb = padding.bottom;
    		pr = padding.right;

    		pw = pl + pr;
    		ph = pt + pb;
    	}
        */

    	clientWidth = this._getClientWidth();
    	clientHeight = this._getClientHeight();

    	if (!this.titlectrl || !this.boxctrl)
    		this._createControl(false);

    	titlectrl = this._titlectrl;
    	boxctrl = this._boxctrl;

    	titlectrl_border = titlectrl._getCSSStyleValue("border", this._status);
    	boxctrl_border = boxctrl._getCSSStyleValue("border", this._status);
    	titlectrl_textpadding = titlectrl._getCSSStyleValue("textPadding", this._status);
    	titlectrl_padding = titlectrl._getCSSStyleValue("padding", this._status);

    	if (titlectrl_border)
    	{
    		titlectrl_bl = titlectrl_border.left._width;
    		titlectrl_bt = titlectrl_border.top._width;
    		titlectrl_bb = titlectrl_border.bottom._width;
    		titlectrl_br = titlectrl_border.right._width;
    	}
    	if (boxctrl_border)
    	{
    		boxctrl_bl = boxctrl_border.left._width;
    		boxctrl_bt = boxctrl_border.top._width;
    		boxctrl_bb = boxctrl_border.bottom._width;
    		boxctrl_br = boxctrl_border.right._width;
    	}
    	if (titlectrl_textpadding)
    	{
    	    titlectrl_tpw = titlectrl_textpadding.left + titlectrl_textpadding.right;
    	    titlectrl_tph = titlectrl_textpadding.top + titlectrl_textpadding.bottom;
    	}

    	if (titlectrl_padding)
    	{
    		titlectrl_pw = titlectrl_padding.left + titlectrl_padding.right;
    		titlectrl_ph = titlectrl_padding.top + titlectrl_padding.bottom;
    	}

    	textsize = this._GetTextSize(this._displaytext);    //Array [width,height]
    	iconwidth = this._icon_width;
    	iconheight = this._icon_height;

    	titlectrl_width = Math.round(textsize[0]) + iconwidth + titlectrl_pw + titlectrl_tpw + titlectrl_bl + titlectrl_br + adjust_width;
        //titlectrl_height = Math.round(textsize[1]) > iconheight ? Math.round(textsize[1]) : iconheight + titlectrl_ph + titlectrl_bt + titlectrl_bb;
    	titlectrl_height = Math.round(textsize[1]) + iconheight + titlectrl_ph + titlectrl_tph + titlectrl_bt + titlectrl_bb;

    	if (titlealign.indexOf("top") == 0)
    	{
    		boxctrl_left = pl;
    		boxctrl_top = titlectrl_height/2 + pt;
    		boxctrl_width = clientWidth - pw;
    		boxctrl_height = clientHeight - titlectrl_height/2 - ph;

    		titlectrl_top = pt;// + titlectrl_height / 2;
    		if (titlealign == "topcenter")
    		{
    			titlectrl_left = parseInt((clientWidth) / 2) - parseInt(titlectrl_width / 2);
    		}
    		else if (titlealign == "topright")
    		{
    			titlectrl_left = parseInt(clientWidth - titlectrl_width - pr) - gap;
    		}
    		else // topleft
    		{
    		    titlectrl_left = pl + gap;
    		}
    		//this._setTitleBorderNone("bottom");
    	}
    	else if (titlealign.indexOf("right") == 0)
    	{
    	    var half_title_width = titlectrl_width / 2;
    		boxctrl_left = pl;
    		boxctrl_top = pt;    		
    		boxctrl_width = clientWidth - pw - half_title_width + titlectrl_bl;
    		boxctrl_height = clientHeight - ph;

    		titlectrl_left = boxctrl_width - titlectrl_bl - half_title_width;
    		if (titlealign == "righttop")
    		{
    		    titlectrl_top = pt + gap;
    		}
    		else if (titlealign == "rightcenter")
    		{
    			titlectrl_top = parseInt(clientHeight / 2) - parseInt(titlectrl_height / 2);
    		}
    		else
    		{
    		    titlectrl_top = parseInt(clientHeight - titlectrl_height - pb) - gap;
    		}

    		//this._setTitleBorderNone("left");
    	}
    	else if (titlealign.indexOf("bottom") == 0)
    	{
    	    var half_title_height = titlectrl_height / 2;
    		boxctrl_left = pl;
    		boxctrl_top = pt;
    		boxctrl_width = clientWidth - pw;            
    		boxctrl_height = clientHeight - half_title_height - ph + titlectrl_bt;

    		titlectrl_top = boxctrl_top + boxctrl_height - titlectrl_bt - half_title_height;
    		if (titlealign == "bottomright")
    		{
    		    titlectrl_left = parseInt(clientWidth - titlectrl_width - pr) - gap;
    		}
    		else if (titlealign == "bottomcenter")
    		{
    			titlectrl_left = parseInt(clientWidth / 2) - parseInt(titlectrl_width / 2);
    		}
    		else
    		{
    		    titlectrl_left = pl + gap;
    		}

    		//this._setTitleBorderNone("top");
    	}
    	else if (titlealign.indexOf("left") == 0)
    	{
    	    var half_title_width = titlectrl_width / 2;
    	    boxctrl_left = pl + half_title_width - titlectrl_br;
    		boxctrl_top = pt;
    		boxctrl_width = clientWidth - pw - half_title_width + titlectrl_br;
    		boxctrl_height = clientHeight - ph;

    		titlectrl_left = pl;
    		if (titlealign == "leftbottom")
    		{
    		    titlectrl_top = parseInt(clientHeight - titlectrl_height - pb) - gap;
    		}
    		else if (titlealign == "leftcenter")
    		{
    			titlectrl_top = parseInt(clientHeight / 2) - parseInt(titlectrl_height / 2);
    		}
    		else if (titlealign == "lefttop")
    		{
    		    titlectrl_top = pt + gap;
    		}

    		//this._setTitleBorderNone("right");
    	}
    	titlectrl.move(titlectrl_left, titlectrl_top, titlectrl_width, titlectrl_height);
    	boxctrl.move(boxctrl_left, boxctrl_top, boxctrl_width, boxctrl_height);
    };

    delete _pGroupBox;
}