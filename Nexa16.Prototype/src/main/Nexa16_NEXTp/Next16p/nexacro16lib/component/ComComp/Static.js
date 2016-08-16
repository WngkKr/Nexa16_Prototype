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

if (!nexacro._IconText)
{
	//==============================================================================
	// nexacro._IconText
	//==============================================================================
	nexacro._IconText = function (id, position, left, top, width, height, right, bottom, parent)
	{
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pIconText = nexacro._createPrototype(nexacro.Component, nexacro._IconText);
	nexacro._IconText.prototype = _pIconText;
	_pIconText._type_name = "IconText";

	//default properties //
	_pIconText.text = "";
	_pIconText.expr = null;
	_pIconText.icon = "";
	//_pIconText.padding = "";
	//_pIconText.textAlign = "";
	//_pIconText.verticalAlign = "";
	//
	_pIconText.textPadding = "";
	_pIconText.iconPosition = "";
	_pIconText.textwidth = 0;
	_pIconText.wordWrap = null;	
	_pIconText.tabstop = false;

	//------------- internal variable --------------//   	
	_pIconText._textpadding = null;

	_pIconText._cell_elem = null;
	_pIconText._displaytext = "";
	
	_pIconText._is_focus_accept = false;
	// ControlElement has Only one Element
	_pIconText._is_simple_control = true;
	_pIconText._is_eventinfo_control = false;

	_pIconText._accessibility_role = "Icon";

	// ====================================================================
	// nexacro._IconText : Create & Update
	// ====================================================================
	_pIconText.on_create_contents = function ()
	{
		var control_elem = this.getElement();
		if (control_elem)
		{
			var cellElem = new nexacro.IconTextElement(control_elem, "icontext");
			this._cell_elem = cellElem;

			//process padding to position
			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

			// apply non-inherited style-props
			// css Generation code & generate Icon._padding_info/Icon._align_info to css (.Icon .nexacontentsbox { text-align/vertical-align })

			if (this.textAlign)
				cellElem.setElementTextAlign(this.textAlign);
			if (this.verticalAlign)
				cellElem.setElementVerticalAlign(this.verticalAlign);


			var wordwrap_info = this._getCSSStyleValue("wordWrap");
			if (wordwrap_info)
				cellElem.setElementCSSMapInfo(wordwrap_info);

			if (this.wordWrap)
				cellElem.setElementWordWrap(this.wordWrap);


			var textPadding = this._textpadding || this._getCSSStyleValue("textPadding");
			if (textPadding)
				cellElem.setElementTextPadding(textPadding);

			if (this.textwidth)
				cellElem.setElementTextWidth(this.textwidth);

			if (this._textdecoration)
				cellElem.setElementTextDecoration(this._textdecoration);

			if (this._displaytext)
			{	
				cellElem.setElementText(this._displaytext);
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon)
			{
				cellElem.setElementIcon(icon);
			}
			var icon_pos = this.iconPosition || this._getCSSStyleValue("iconPosition");
			cellElem.setElementIconPos(icon_pos);
		}
	};

	_pIconText.on_created_contents = function (_window)
	{
		if (this.expr)
			this._on_apply_expr(this.expr);

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.create(_window);
		}

	};

	_pIconText.on_destroy_contents = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.destroy();
			this._cell_elem = null;
		}
		if (this._textpadding)
			this._textpadding = null;
		if (this._icon)
			this._icon = null;
	};

	_pIconText.on_create_contents_command = function ()
	{
		if (this.expr)
			this._on_apply_expr(this.expr);

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			return cellElem.createCommand();
		}
		return "";
	};

	_pIconText.on_attach_contents_handle = function (win)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.attachHandle(win);
		}
	};

	// ====================================================================
	// nexacro._IconText : Property
	// ====================================================================
	_pIconText.set_icon = function (val)
	{
		this.icon = val;
		if (val)
		{
			if (this._icon == null || this._icon.value != val)
			{
				var icon = nexacro.UrlObject(val, this);
				this._icon = icon;
				this.on_apply_icon(icon);
			}
		}
		else
		{
			if (this._icon)
			{
				this._icon = null;
				this.on_apply_icon(null);
			}
		}
	};

	_pIconText.set_iconPosition = function (val)
	{
		if (this.iconPosition != val)
		{
			this.iconPosition = val;
			this.on_apply_iconPosition(val);
		}
	};


	_pIconText.set_textPadding = function (val)
	{
		this.textPadding = val;
		if (val)
		{
			if (this._textpadding == null || this._textpadding.value != val)
			{
				var textPadding = nexacro.PaddingObject(val);
				this._textpadding = textPadding;
				this.on_apply_textPadding(textPadding);
			}
		}
		else
		{
			if (this._textpadding)
			{
				this._textpadding = null;
				this.on_apply_textPadding(null);
			}
		}
	};

	_pIconText.set_textwidth = function (val)
	{
		this.textwidth = val;
		this.on_apply_textwidth(val);
	};

	//===============================================================
	// nexacro._IconText : Override
	//===============================================================	
	_pIconText._isFocusAcceptable = function ()
	{
		return nexacro._enableaccessibility;
	};

	_pIconText.on_get_accessibility_label = function ()
	{
		return this.text;
	};


	_pIconText.on_apply_text = function (text)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementText(text);
		}
	};

	_pIconText.on_apply_icon = function (icon)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementIcon(icon || this._getCSSStyleValue("icon", this._status, this._userstatus));
		}
	};


	_pIconText.on_apply_iconPosition = function (iconpos)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementIconPos(iconpos || this._getCSSStyleValue("iconPosition", this._status, this._userstatus));
		}
	};

	_pIconText.on_apply_textPadding = function (textPadding)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextPadding(textPadding || this._getCSSStyleValue("textPadding", this._status, this._userstatus));
		}
	};

	_pIconText.on_apply_textAlign = function (halign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextAlign(halign);
		}
	};

	_pIconText.on_apply_verticalAlign = function (valign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementVerticalAlign(valign);
		}
	};

	_pIconText.on_apply_textwidth = function (textwidth)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextWidth(textwidth);
		}
	};

	_pIconText.on_apply_wordWrap = function (wordwrap)
	{
		if (!this._isEnableRedraw()) return;

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementWordWrap(wordwrap);
		}
	};

	_pIconText.on_apply_textDecoration = function (textDecoration)
	{
		if (!this._isEnableRedraw()) return;
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextDecoration(textDecoration);
		}
	};

	_pIconText.on_apply_status = function (status, userstatus)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			if (!this.textPadding)
				cellElem.setElementTextPadding(this._getCSSStyleValue("textPadding", status, userstatus));
			if (!this.icon)
				cellElem.setElementIcon(this._getCSSStyleValue("icon", status, userstatus));
			if (!this.iconPosition)
				cellElem.setElementIconPos(this._getCSSStyleValue("iconPosition", status, userstatus));

			var wordwrap_info = this._getCSSStyleValue("wordWrap", status, userstatus);
			if (wordwrap_info)
				cellElem.setElementCSSMapInfo(wordwrap_info);
		}
	};

	_pIconText._getCurrentIcon = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
			return cellElem.icon;
		return null;
	};

	_pIconText.on_change_containerPos = function (left, top)
	{
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pIconText.on_change_containerRect = function (width, height)
	{
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	//===============================================================
	// nexacro._IconText : Util Function
	//===============================================================
	_pIconText._getAutoWidth = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_w = 0;

			var border = this._getCurrentStyleBorder();
			if (border)
			{
				total_w += border._getBorderWidth();
			}

			var padding = this._getCurrentStylePadding();
			if (padding)
			{
				total_w += padding.left + padding.right;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_w += text_size[0];
			}
			return total_w;
		}
	};

	_pIconText._getAutoHeight = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border)
			{
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding)
			{
				total_h += padding.top + padding.bottom;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_h += text_size[1];
			}
			return total_h;
		}
	};

	delete _pIconText;

}

// JavaScript source code
if (!nexacro._Icon)
{
	//==============================================================================
	// nexacro._Icon
	//==============================================================================
	nexacro._Icon = function (id, position, left, top, width, height, right, bottom, parent)
	{
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pIcon = nexacro._createPrototype(nexacro.Component, nexacro._Icon);
	nexacro._Icon.prototype = _pIcon;
	_pIcon._type_name = "Icon";

	//default properties //
	_pIcon.icon = "";
	_pIcon.padding = "";
	_pIcon.textAlign = "";
	_pIcon.verticalAlign = "";
	_pIcon.tabstop = false;

	//------------- internal variable --------------//   
	_pIcon._icon = null;
	_pIcon._cell_elem = null;
	_pIcon._is_focus_accept = false;
	// ControlElement has Only one Element
	_pIcon._is_simple_control = true;
	_pIcon._is_eventinfo_control = false;

	_pIcon._accessibility_role = "Icon";

	// ====================================================================
	// nexacro._Icon : Create & Update
	// ====================================================================
	_pIcon.on_create_contents = function ()
	{
		var control_elem = this.getElement();
		if (control_elem)
		{
			var cellElem = new nexacro.IconElement(control_elem, "icon");
			this._cell_elem = cellElem;

			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

			// apply non-inherited style-props
			// css Generation code & generate Icon._padding_info/Icon._align_info to css (.Icon .nexaText { padding/text-align/vertical-align })

			if (this.textAlign)
				cellElem.setElementTextAlign(this.textAlign);
			if (this.verticalAlign)
				cellElem.setElementVerticalAlign(this.verticalAlign);

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon)
			{
				cellElem.setElementIcon(icon);
			}
		}
	};

	_pIcon.on_created_contents = function (_window)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.create(_window);
		}
	};

	_pIcon.on_destroy_contents = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.destroy();
			this._cell_elem = null;
		}
		if (this._icon)
			this._icon = null;
	};

	_pIcon.on_create_contents_command = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			return cellElem.createCommand();
		}
		return "";
	};

	_pIcon.on_attach_contents_handle = function (win)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.attachHandle(win);
		}
	};

	// ====================================================================
	// nexacro._Icon : Property
	// ====================================================================
	_pIcon.set_icon = function (val)
	{
		this.icon = val;
		if (val)
		{
			if (this._icon == null || this._icon.value != val)
			{
				var icon = nexacro.UrlObject(val, this);
				this._icon = icon;
				this.on_apply_icon(icon);
			}
		}
		else
		{
			if (this._icon)
			{
				this._icon = null;
				this.on_apply_icon(null);
			}
		}
	};

	//===============================================================
	// nexacro._Icon : Override
	//===============================================================
	_pIcon._isFocusAcceptable = function ()
	{
		return nexacro._enableaccessibility;
	};

	_pIcon.on_apply_icon = function (icon)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementIcon(icon || this._getCSSStyleValue("icon", this._status, this._userstatus));
		}
	};

	_pIcon.on_apply_textAlign = function (halign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextAlign(halign);
		}
	};

	_pIcon.on_apply_verticalAlign = function (valign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementVerticalAlign(valign);
		}
	};


	_pIcon.on_apply_status = function (status, userstatus)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			if (!this.icon)
				cellElem.setElementIcon(this._getCSSStyleValue("icon", status, userstatus));
		}
	};


	_pIcon.on_change_containerPos = function (left, top)
	{
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pIcon.on_change_containerRect = function (width, height)
	{
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	_pIcon._getCurrentIcon = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
			return cellElem.icon;
		return null;
	};

	//===============================================================
	// nexacro._Icon : Util Function
	//===============================================================

	_pIcon._getAutoWidth = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_w = 0;

			var border = this._getCSSStyleValue("border");
			if (border)
			{
				total_w += border._getBorderWidth();
			}

			var padding = this._getCSSStyleValue("padding");
			if (padding)
			{
				total_w += padding.left + padding.right;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_w += text_size[0];
			}
			return total_w;
		}
	};

	_pIcon._getAutoHeight = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_h = 0;

			var border = this._getCSSStyleValue("border");
			if (border)
			{
				total_h += border._getBorderHeight();
			}

			var padding = this._getCSSStyleValue("padding");
			if (padding)
			{
				total_h += padding.top + padding.bottom;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_h += text_size[1];
			}
			return total_h;
		}
	};

	delete _pIcon;
}

if (!nexacro.Static)
{
    //==============================================================================
    // nexacro.Static
    //==============================================================================
	nexacro.Static = function (id, position, left, top, width, height, right, bottom, parent)
	{
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pStatic = nexacro._createPrototype(nexacro.Component, nexacro.Static);
	nexacro.Static.prototype = _pStatic;
	_pStatic._type_name = "Static";

	//default properties //
	_pStatic.text = "";
	_pStatic.expr = null;	
	_pStatic.padding = "";
	_pStatic.textAlign = "";
	_pStatic.verticalAlign = "";
	_pStatic.wordWrap = "";
	_pStatic.usedecorate = false;
	_pStatic.tabstop = false;

	//------------- internal variable --------------//   

	_pStatic._cell_elem = null;
	_pStatic._displaytext = "";
	_pStatic._textdecoration = null;

	_pStatic._decorate_link_url = "";
	_pStatic._is_focus_accept = false;
	// ControlElement has Only one Element
	_pStatic._is_simple_control = true;
	_pStatic._apply_client_padding = true;

	_pStatic._accessibility_role = "static";

	_pStatic._event_list = {
		"onclick": 1, 
		"onflingstart": 1, "onfling": 1, "onflingend": 1,
		"onlbuttondown": 1, "onlbuttonup": 1, "onlongpress": 1,		
		"onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmove": 1,		
		"onmousedown": 1, "onmouseup": 1,				
		"onsize": 1,
		"ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,
		"onrbuttondown": 1, "onrbuttonup": 1		
	};

	// ====================================================================
	// nexacro.Static : Create & Update
	// ====================================================================
	_pStatic.on_create_contents = function ()
	{
		var control_elem = this.getElement();
		if (control_elem)
		{
			var cellElem = new nexacro.TextBoxElement(control_elem, "text");
			this._cell_elem = cellElem;

			cellElem.setElementPosition(this._getClientLeft(), this._getClientTop());
			cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

			// apply non-inherited style-props
			// css Generation code & generate Static align wordWrap to css (.Static .nexacontentsbox { text-align/vertical-align })

			if (this.textAlign)
				cellElem.setElementTextAlign(this.textAlign);
			if (this.verticalAlign)
				cellElem.setElementVerticalAlign(this.verticalAlign);


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

	_pStatic.on_created_contents = function (_window)
	{
		if (this.expr)
			this._on_apply_expr(this.expr);

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.create(_window);
		}

	};

	_pStatic.on_destroy_contents = function ()
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.destroy();
			this._cell_elem = null;
		}
	};

	_pStatic.on_create_contents_command = function ()
	{
		if (this.expr)
			this._on_apply_expr(this.expr);

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			return cellElem.createCommand();
		}
		return "";
	};

	_pStatic.on_attach_contents_handle = function (win)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.attachHandle(win);
		}
	};

	// ====================================================================
	// nexacro.Static : Property
	// ====================================================================
	// old
	_pStatic.set_usedecorate = function (val)
	{
		val = nexacro._toBoolean(val);
		if (this.usedecorate != val)
		{
			this.usedecorate = val;
			this.on_apply_usedecorate(val);
		}
	};

	


	//===============================================================
	// nexacro.Static : Override
	//===============================================================
	_pStatic.on_get_prop_tabstop = function ()
	{
		if (nexacro._enableaccessibility)
		{
			if (this.accessibilityenable && this.accessibilityrole == "link")
				return true;
		}
		return false;
	};

	_pStatic._isFocusAcceptable = function ()
	{
		return nexacro._enableaccessibility;
	};

	_pStatic.on_get_accessibility_label = function ()
	{		
		if (this.usedecorate)
			return nexacro._getDisplayTextfromDecorateText(this._displaytext);
		return this._displaytext;
	};

	_pStatic.on_apply_usedecorate = function (usedecorate)
	{
		if (this._displaytext)
			this.on_apply_text(this._displaytext);
	};

	_pStatic.on_apply_text = function (text)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			if (this.usedecorate)
				cellElem.setElementDecorateText(text);
			else
				cellElem.setElementText(text);
		}
	};

	_pStatic.on_apply_textAlign = function (halign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextAlign(halign);
		}
	};

	_pStatic.on_apply_verticalAlign = function (valign)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementVerticalAlign(valign);
		}
	};

	_pStatic.on_apply_wordWrap = function (wordwrap)
	{
		if (!this._isEnableRedraw()) return;

		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementWordWrap(wordwrap);
		}
	};

	_pStatic.on_apply_textDecoration = function (textDecoration)
	{
		if (!this._isEnableRedraw()) return;
		var cellElem = this._cell_elem;
		if (cellElem)
		{
			cellElem.setElementTextDecoration(textDecoration);
		}
	};

	_pStatic.on_apply_status = function (status, userstatus)
	{
		var cellElem = this._cell_elem;
		if (cellElem)
		{			
			var wordwrap_info = this._getCSSStyleValue("wordWrap", status, userstatus);
			if (wordwrap_info)
				cellElem.setElementCSSMapInfo(wordwrap_info);
		}
	};

	_pStatic.on_getDisplayText = function ()
	{
		if (this.usedecorate)
			return nexacro._getDisplayTextfromDecorateText(this._displaytext);
		return this._displaytext;
	};

	_pStatic.on_change_containerPos = function (left, top)
	{		
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementPosition(left, top);
		}
	};

	_pStatic.on_change_containerRect = function (width, height)
	{
		if (this._is_created_contents)
		{
			var cellElem = this._cell_elem;
			cellElem.setElementSize(width, height);
		}
	};

	//===============================================================
	// nexacro.Static : Util Function
	//===============================================================
	_pStatic._getUrl = function ()
	{
		var text_elem = this._text_elem;
		if (text_elem && this.usedecorate)
		{
			var v = text_elem.decoration;
			// 링크 처리                
			if (v != this._decorate_text)
			{
				this._decorate_text = v;
				var len = v ? v.length : 0;
				var val = "";
				for (var i = 0; i < len; i++)
				{
					var c = v.charAt(i);
					if (c == '<' && v.charAt(i + 1) == 'l')
					{
						var quote_idx = 0;
						for (var j = i + 4; j < len; j++)
						{
							var ch = v.charAt(j);
							if (ch == '\'')
							{
								if (quote_idx != 0 && quote_idx != j) break;

								quote_idx = j;
								continue;
							}

							if (quote_idx != 0)
								val += ch;
						}

						break;
					}
				}

				this._decorate_link_url = val;
			}

			return this._decorate_link_url;
		}

		return "";
	};

	_pStatic._getAutoWidth = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_w = 0;

			var border = this._getCurrentStyleBorder();
			if (border)
			{
				total_w += border._getBorderWidth();
			}

			var padding = this._getCurrentStylePadding();
			if (padding)
			{
				total_w += padding.left + padding.right;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_w += text_size[0];
			}
			return total_w;
		}
	};

	_pStatic._getAutoHeight = function ()
	{
	    var elem = this.getElement();
		if (elem)
		{
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border)
			{
				total_h += border._getBorderHeight();
			}

			var padding = this._getCurrentStylePadding();
			if (padding)
			{
				total_h += padding.top + padding.bottom;
			}

			if (this.text)
			{
				var font = this._getCurrentStyleInheritValue("font");
				var text_size = nexacro._getTextSize(this.text, font);

				total_h += text_size[1];
			}
			return total_h;
		}
	};

	delete _pStatic;

}

//===============================================================
// TitleBarIconTextControl 
//===============================================================
if (!nexacro._TitleBarIconTextControl)
{
    nexacro._TitleBarIconTextControl = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro._IconText.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pTitleBarIconTextControl = nexacro._createPrototype(nexacro._IconText, nexacro._TitleBarIconTextControl);
    nexacro._TitleBarIconTextControl.prototype = _pTitleBarIconTextControl;

    _pTitleBarIconTextControl._type_name = "TitleBarIconTextControl";
    _pTitleBarIconTextControl._is_subcontrol = true;

    delete _pTitleBarIconTextControl;
}