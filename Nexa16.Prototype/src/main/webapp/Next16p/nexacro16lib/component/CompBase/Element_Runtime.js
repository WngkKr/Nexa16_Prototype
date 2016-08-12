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

if (nexacro._Browser == "Runtime")
{
    "use strict";
    var _process = true;

    if (!nexacro.Element)
    {
        nexacro.__setLastFocusedElement = function (elem)
        {
            // Save a last focused element to nexacro.Window
            if (elem)
            {
                var win = elem.linkedcontrol ? elem.linkedcontrol._getWindow() :
                    (elem.parent_elem ? elem.parent_elem.linkedcontrol._getWindow() : null);
                if (win)
                {
                    var root_win = win;
                    while (true)
                    {
                        if (root_win instanceof nexacro._PopupWindow)
                        {
                            if (root_win == root_win.parent)
                                break;
                            root_win = root_win.parent;
                        }
                        else
                            break;
                    }
                    if (!root_win)
                        root_win = win;
                    root_win._last_focused_elem = elem;
                }
            }
        };

        //======================================================================
        // START Element
        //======================================================================
        //======================================================================
        // Nexacro16 Element
        // nexacro.Element - this is Simple Element has No Border && No background && No Container
        //======================================================================
        // This Element has No Event Handlers -- Container only
        // This Element has no border
        nexacro.Element = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "elem");
        };

        var _pElement = nexacro._createPrototype(nexacro.Object, nexacro.Element);
        nexacro.Element.prototype = _pElement;

        // overide nexacro.Object

        _pElement._type_name = "Element";

        //==== defaule values =========//
        _pElement.parent = null;
        _pElement.parent_elem = null;

        _pElement.id = "";
        _pElement.status = "";
        _pElement.userstatus = "";
        _pElement.left = 0;
        _pElement.top = 0;
        _pElement.width = 0;
        _pElement.height = 0;
        _pElement.visible = true;
        _pElement.mirror = false;
        _pElement.direction = "inherit";

        //==== for common style =========//        
        _pElement.color = null;
        _pElement.font = null;
        _pElement.textDecoration = null;
        _pElement.lineHeight = null;
        _pElement.wordSpacing = null;
        _pElement.letterSpacing = null;
      

        //==== internal handles =========//
        _pElement.handle = null;		// HTML DOM Element Handle
        _pElement.owner_elem = null;

        //==== default flags =========//
        _pElement._is_nc_element = false;
        _pElement._is_input_element = false;

        //==== css selector =========//
        _pElement.typeselector = "";
        _pElement.classselector = "";        

        //==== end of initial =========//

        _pElement.clearContents = nexacro._emptyFn;

        _pElement.create = function (win)
        {
            // parent is always control element
            var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();

                var handle = nexacro.__createElementHandle(this, win_handle, 0, 0, 0, 0);

                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                this._refreshCommonStyleProps(handle);

           /*     if (this.padding)
                    nexacro.__setElementHandlePaddingObject(handle, this.padding);
                if (this.textDecoration)
                    nexacro.__setElementHandleTextDecorationObject(handle, this.textDecoration);
                    */
                // append TO Parent Element
                this.handle = handle;
                nexacro.__appendElementHandle(this._is_nc_element ? owner_elem.handle : owner_elem.dest_handle, handle);
            }
        };

        _pElement._refreshCommonStyleProps = function (handle)
        {
            if (!this.visible)
                nexacro.__setElementHandleVisible(handle, false);
            if (this.left || this.top)
                nexacro.__setElementHandlePosition(handle, this.left, this.top);
            if (this.width || this.height)
                nexacro.__setElementHandleSize(handle, this.width, this.height);
            if (this.color)
                nexacro.__setElementHandleColorObject(handle, this.color);
            if (this.font)
                nexacro.__setElementHandleFontObject(handle, this.font);
            if (this.lineHeight)
                nexacro.__setElementHandleLineHeightObject(handle, this.lineHeight);
            if (this.wordSpacing)
                nexacro.__setElementHandleWordSpacingObject(handle, this.wordSpacing);
            if (this.letterSpacing)
                nexacro.__setElementHandleLetterSpacingObject(handle, this.letterSpacing);
            if (this.textDecoration)
                nexacro.__setElementHandleTextDecorationObject(handle, this.textDecoration);

            if (this.wordWrap)
                nexacro.__setElementHandleWordwrapObject(handle, this.wordWrap);
            if (this.direction)
                nexacro.__setElementHandleRtlDirection(handle, this.direction);
        };

        _pElement.destroy = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var owner_handle = null;   // unlink 인 경우 owner_elem이 null이다.
                var dest_handle = (this.owner_elem ? this.owner_elem.dest_handle : null);

                if (dest_handle)
                    nexacro.__destroyElementHandle(dest_handle, handle);

                this.owner_elem = null;
                this.handle = null;
            }
            this.parent = null;
            this.parent_elem = null;
        };

        _pElement.isInputElement = function ()
        {
        	return this._is_input_element;
        };

        _pElement.stopSysEvent = function ()
        {
        	this._event_stop = true;
        };

        _pElement._destroyElementHandle = function ()
        {
            var handle = this.handle;
            var owner_elem = this.owner_elem;
            if (handle)
            {
                var owner_handle = null;   // unlink 인 경우 owner_elem이 null이다.
                if (owner_elem && owner_elem.handle)
                {
                    owner_handle = owner_elem.handle;
                    nexacro.__destroyElementHandle(owner_handle, handle);
            }
            }
            this.owner_elem = null;
            this.handle = null;
        };

        _pElement._appendToContainer = function (owner_elem)
        {
            var handle = this.handle;
            if (handle && owner_elem.handle && this.owner_elem == null)
            {
                this.owner_elem = owner_elem;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };

        _pElement._removeFromContainer = function ()
        {
            var owner_elem = this.owner_elem;
            if (owner_elem)
            {
                this.owner_elem = null;
                var handle = this.handle;
                if (handle && owner_elem.handle)
                {
                    nexacro.__unlinkElementHandle(owner_elem.dest_handle, handle);
                }
            }
        };

        _pElement.getContainerElement = function ()
        {
            return this;
        };

        _pElement._getRootWindowHandle = function ()
        {
            if (this.owner_elem)
            {
                return this.owner_elem._getRootWindowHandle();
            }
			
            return null;
        };

        _pElement._getWindowHandle = function ()
        {
            return this._getRootWindowHandle();
        };

        _pElement._getElementDirection = function ()
        {
            var elem = this.parent_elem;
            var direction = this.direction;
            while (elem)
            {
                if (elem.direction && elem.direction != "inherit")
                {
                    direction = elem.direction;
                    break;
                }
                elem = elem.parent_elem;
            }
            return direction;
        };

        //////////////////////////////////////////////////////////////////////////
        _pElement.setElementPosition = function (left, top)
        {
            if (this.left != left || this.top != top)
            {
                this.left = left;
                this.top = top;
                var handle = this.handle;
                if (handle)
                {
                    if (left || top)
                        nexacro.__setElementHandlePosition(handle, left, top);
                    else
                        nexacro.__clearElementHandlePosition(handle);
                }
            }
        };

        _pElement.setElementSize = function (width, height)
        {
            if (this.width != width || this.height != height)
            {
                this.width = width;
                this.height = height;
                if (width < 0) width = 0;
                if (height < 0) height = 0;

                var handle = this.handle;
                if (handle)
                {
                    if (width && height)
                        nexacro.__setElementHandleSize(handle, width, height);
                    else
                        nexacro.__clearElementHandleSize(handle);
                }
            }
        };

        _pElement.setElementVisible = function (visible)
        {
            if (this.visible != visible)
            {
                this.visible = visible;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleVisible(handle, visible);
                }
            }
        };

        _pElement.setElementDirection = function (direction)
        {
            if (this.direction != direction)
            {
                this.direction = direction;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleRtlDirection(handle, direction);
                }
            }
        };

        /*
        _pElement.setElementImageMirror = function (rtlimagemirroring)
        {
        	var v = nexacro._toBoolean(rtlimagemirroring._value);

        	if (this.mirror != v)
        	{
        		this.mirror = v;

        		var background = this.background;
        		var image = this.image;

        		if (background && background.image)
        		{
        			// background mirroring은 border, padding까지 바꿔줘야 함.
        			var handle = this.handle;
        			if (handle)
        			{
        				nexacro.__setElementHandleMirror(handle, this.mirror);
        			}

        			if (this._client_element)
        			{
        				handle = this._client_element.handle;
        				if (handle)
        				{
        					nexacro.__setElementHandleMirror(handle, this.mirror);
        				}
        			}
        		}
        	}
        };
        */


        //_pElement.setElementTypeCSSSelector = function (typename)
        //{
        //    if (this.typeselector != typename)
        //    {
        //        this.typeselector = typename;

        //        var handle = this.handle;
        //        if (handle)
        //        {
        //            nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
        //        }
        //    }
        //};

        //_pElement.setElementClassCSSSelector = function (classname)
        //{
        //    if (this.classselector != classname)
        //    {
        //        this.classselector = classname;

        //        var handle = this.handle;
        //        if (handle)
        //        {
        //            nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
        //        }
        //    }
        //};
        _pElement.setElementTypeCSSSelector = function (typename)
        {
            if (this.typeselector != typename)
            {
                this.typeselector = typename;
                var handle = this.handle;
                if (handle)
                {
                    var classname = this._getElementClassName();
                    if (this._classname != classname)
                    {
                        this._classname = classname;
                        nexacro.__setElementHandleCSSClassName(handle, classname);
                    }
                }
            }
        };

        _pElement.setElementClassCSSSelector = function (classname)
        {
            if (this.classselector != classname)
            {
                this.classselector = classname;
                if (classname)
                {
                    var _classname = this._getElementClassName();
                    if (this._classname != _classname)
                    {
                        this._classname = _classname;
                        var handle = this.handle;
                        if (handle)
                        {
                            nexacro.__setElementHandleCSSClassName(handle, _classname);
                        }
                    }
                }
            }
        };

        // Ex> Button btn1 btn1_cssclass
        _pElement._getElementClassName = function ()
        {
            var classname = this.typeselector;

            if (this.idselector)
                classname += " " + this.idselector;

            if (this.classselector)
                classname += " " + this.classselector;
            
            return classname;
        };

        _pElement.setElementStatus = function (status)
        {
            if (this.status != status)
            {
                this.status = status;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleStatus(handle, status);
                }
            }
        };

        _pElement.setElementUserStatus = function (userstatus)
        {
            if (this.userstatus != userstatus)
            {
                this.userstatus = userstatus;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleUserStatus(handle, userstatus);
                }
            }
        };

        // font like -- inhereted to Child / from Parent
        _pElement.setElementColor = function (color)
        {
            this.color = color;
            if (this.handle)
            {
                nexacro.__setElementHandleColorObject(this.handle, color);
            }
        };

        _pElement.setElementFont = function (font)
        {
            this.font = font;
            if (this.handle)
            {
                nexacro.__setElementHandleFontObject(this.handle, font);
            }
        };

        _pElement.setElementTextDecoration = function (decoration)
        {
            this.textDecoration = decoration;
            if (this.handle)
            {
                nexacro.__setElementHandleTextDecorationObject(this.handle, decoration);
            }
        };

        _pElement.setElementLineHeight = function (lineheight)
        {
            this.lineHeight = lineheight;
            if (this.handle)
            {
                nexacro.__setElementHandleLineHeightObject(this.handle, lineheight);
            }
        };

        _pElement.setElementWordSpacing = function (wordspacing)
        {
            this.wordSpacing = wordspacing;
            if (this.handle)
            {
                nexacro.__setElementHandleWordSpacingObject(this.handle, wordspacing);
            }
        };
        _pElement.setElementLetterSpacing = function (letterspacing)
        {
            this.letterSpacing = letterspacing;
            if (this.handle)
            {
                nexacro.__setElementHandleLetterSpacingObject(this.handle, letterspacing);
            }
        };

        _pElement._getWindow = function ()
        {
            return this.linkedcontrol._getWindow();
        };

        _pElement._getComputedStyle = function (prop)
        {
            /*
            if (this.handle)
            {
                var propval1 = nexacro.__getElementHandleStyleValue(this.handle, prop1);
                var propval2 = nexacro.__getElementHandleStyleValue(this.handle, prop1);

                return { prop1: propval1, prop2: propval2 };
            }
            */
        };

        _pElement._getComputedStyleValue = function (prop)
        {
            if (this.handle && prop)
            {
                return nexacro.__getElementHandleStyleValue(this.handle, prop);
            }
        };

        _pElement._getComputedStyleBackground = nexacro._emptyFn;
        // coordinate info
        _pElement._getPositionInWindow = function ()
        {
            return nexacro._getElementXYInWindow(this.handle);
        };
        //==============================================================================
        // nexacro.TextBoxElement : nexacro Element's basic flags & Utility Functions
        // TextBoxElement's DOM size control is always fitToParent
        // move text by padding & align
        //==============================================================================
        nexacro.TextBoxElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "text");
        };

        var _pTextBoxElement = nexacro._createPrototype(nexacro.Element, nexacro.TextBoxElement);
        nexacro.TextBoxElement.prototype = _pTextBoxElement;

        _pTextBoxElement._type_name = "TextBoxElement";

        //==== defaule values =========//
        // basic element attrubutes
        _pTextBoxElement.text = "";
        _pTextBoxElement._use_decoration = false;

        _pTextBoxElement.padding = null;
        _pTextBoxElement.textAlign = null;
        _pTextBoxElement.verticalAlign = null;

        _pTextBoxElement.wordWrap = null;
        _pTextBoxElement._wordwrap_info = null;

        _pTextBoxElement.typeselector = "nexacontentsbox";

        //==== default flags =========//
        _pTextBoxElement._use_newline = true;

        //==== end of initial =========//


        _pTextBoxElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();
                var handle = nexacro.__createTextElementHandle(this, win_handle, 0, 0, 0, 0);

                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
                
                this._refreshCommonStyleProps(handle);

                if (this.textAlign)
                    nexacro.__setElementHandleTextAlign(handle, this.textAlign);
                if (this.verticalAlign)
                    nexacro.__setElementHandleVerticalAlign(handle, this.verticalAlign);
                
                if (this.text)
                {
                    if (this._use_decoration)
                        nexacro.__setElementHandleDecorateText(handle, this.text);
                    else
                    	nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                }

                // append TO Parent Element
                this.handle = handle;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };

        _pTextBoxElement.setElementTextAlign = function (textalign)
        {
            this.textAlign = textalign;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleTextAlign(handle, textalign);
            }
        };

        _pTextBoxElement.setElementVerticalAlign = function (verticalalign)
        {
            this.verticalAlign = verticalalign;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleVerticalAlign(handle, verticalalign);
            }
        };

        
        _pTextBoxElement.setElementPadding = function (padding)
        {
            /*
		    this.padding = padding;		    
		    var handle = this.handle;
		    if (handle)
		    {
			    nexacro.__setElementHandlePaddingObject(handle, this.padding);
		    }
            */
	    };
        

        _pTextBoxElement.setElementText = function (text)
        {
            if (this.text != text || this._use_decoration == true)
            {
                if (text == null)
                    this.text = "";
                else
                    this.text = text;

                this._use_decoration = false;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                }
            }
        };

        _pTextBoxElement.setElementDecorateText = function (text)
        {
            if (this.text != text || this._use_decoration == false)
            {
                if (text == null)
                    this.text = "";
                else
                    this.text = text;

                this._use_decoration = true;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleDecorateText(handle, text);
                }
            }
        };

        _pTextBoxElement.setElementWordWrap = function (wordwrap)
        {
        	if (this.wordWrap != wordwrap)
            {
        		var oldwordwrap = this.wordWrap || this._wordwrap_info;
        		this.wordWrap = wordwrap;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleWordwrapObject(handle, wordwrap);
                    if (this.text && this._use_decoration == false && oldwordwrap != wordwrap)
                    {
                    	nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                    }
                }
            }
        };


        _pTextBoxElement.setElementCSSMapInfo = function (wordwrap)
        {
            if (this._wordwrap_info != wordwrap)
            {
            	var oldwordwrap = this.wordWrap || this._wordwrap_info;
                this._wordwrap_info = wordwrap;
                var handle = this.handle;
                if (handle)
                {
                	if (!this.wordWrap && this.text && this._use_decoration == false && oldwordwrap != wordwrap)
                    {
                		nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                    }
                }
            }
        };

        
        _pTextBoxElement._getComputedStyle = function (prop)
        {
            if (this.handle && prop)
            {
                var computedstyle = nexacro.__getElementHandleStyleValue(this.handle, prop);
                return computedstyle;
            }
        };

        // _pTextBoxElement.setElementTextOverFlow = nexacro._emptyFn;

        //======================================================================
        // nexacro.IconElement - this Element
        // this Image : No Stretch && Align from Size Box
        //======================================================================
        nexacro.IconElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "icon");
        };
        var _pIconElement = nexacro._createPrototype(nexacro.Element, nexacro.IconElement);
        nexacro.IconElement.prototype = _pIconElement;

        _pIconElement._type_name = "IconElement";

        _pIconElement.typeselector = "nexacontentsbox";

        //==== defaule values =========//
        _pIconElement.padding = null;
        _pIconElement.textAlign = null;
        _pIconElement.verticalAlign = null;
        _pIconElement.icon = "";

        //==== default flags =========//
        //==== end of initial =========//


        _pIconElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();
                var handle = nexacro.__createIconTextElementHandle(this, win_handle, 0, 0, 0, 0);

                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                this._refreshCommonStyleProps(handle);
               
                if (this.textAlign)
                    nexacro.__setElementHandleTextAlign(handle, this.textAlign);
                if (this.verticalAlign)
                    nexacro.__setElementHandleVerticalAlign(handle, this.verticalAlign);

                if (this.icon)
                    nexacro.__setElementHandleIconObject(handle, this.icon);

                // append TO Parent Element
                this.handle = handle;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };

        /////////////////////////////////
        _pIconElement.setElementTextAlign = function (textalign)
        {
            if (this.textAlign != textalign)
            {
                this.textAlign = textalign;

                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleTextAlign(handle, textalign || "center");
            }
        };

        _pIconElement.setElementVerticalAlign = function (verticalalign)
        {
            if (this.verticalAlign != verticalalign)
            {
                this.verticalAlign = verticalalign;

                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleVerticalAlign(handle, verticalalign || "middle");
            }
        };

        _pIconElement.setElementIcon = function (icon)
        {
            if (this.icon != icon)
            {
                this.icon = icon;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleIconObject(handle, icon);
                }
            }
        };

        /*
        _pIconElement._getComputedStyle = function ()
        {
        	var handle = this.handle;

        	return { textAlign: "center", verticalAlign: "middle" };
        };
        */

        //end of nexacro.IconElement

        //==============================================================================
        // nexacro.IconText : nexacro Element's basic flags & Utility Functions
        // IconTextElement's Node size control is always fitToParent
        // move text by padding & align
        //type = 1 text only
        //type = 2 IconUrl only
        //type = 3 IconUrl + text
        //==============================================================================
        nexacro.IconTextElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "contents");
        };

        var _pIconTextElement = nexacro._createPrototype(nexacro.Element, nexacro.IconTextElement);
        nexacro.IconTextElement.prototype = _pIconTextElement;

        _pIconTextElement._type_name = "IconTextElement";
        _pIconTextElement.typeselector = "nexacontentsbox";

        //==== defaule values =========//
        // basic element attrubutes
        _pIconTextElement.text = "";
        _pIconTextElement.icon = null;
        _pIconTextElement.iconPos = "left";
        _pIconTextElement.padding = null;
        _pIconTextElement.textAlign = null;
        _pIconTextElement.verticalAlign = null;
        _pIconTextElement.textwidth = 0;
        _pIconTextElement.wordWrap = null;
        _pIconTextElement._wordwrap_info = null;
        // internal use

        //==== default flags =========//
        _pIconTextElement._use_decoration = false;
        _pIconTextElement._use_newline = true;
        //==== end of initial =========//

        _pIconTextElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();
                var handle = nexacro.__createIconTextElementHandle(this, win_handle, 0, 0, 0, 0);

                /////////////////////////////////                
                nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                this._refreshCommonStyleProps(handle);

                if (this.textPadding)
                    nexacro.__setElementHandleTextPaddingObject(handle, this.textPadding);
                if (this.textAlign)
                    nexacro.__setElementHandleTextAlign(handle, this.textAlign);
                if (this.verticalAlign)
                    nexacro.__setElementHandleVerticalAlign(handle, this.verticalAlign);
                if (this.textwidth)
                    nexacro.__setElementHandleTextWidth(handle, this.textwidth);
                if (this.text)
                {
                    if (this._use_decoration)
                        nexacro.__setElementHandleDecorateText(handle, this.text);
                    else
                    	nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                }
                if (this.icon)
                {
                    nexacro.__setElementHandleIconObject(handle, this.icon);
                }
                if (this.iconPos)
                    nexacro.__setElementHandleIconPos(handle, this.iconPos);

                // append TO Parent Element
                this.handle = handle;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };
        /*
             _pIconTextElement.setElementPadding = function (padding)
             {
                 this.padding = padding;
                 var handle = this.handle;
                 if (handle)
                 {
                     nexacro.__setElementHandlePaddingObject(handle, this.padding);
                 }
             };
             */

        _pIconTextElement.setElementTextAlign = function (textalign)
        {
            if (this.textAlign != textalign)
            {
                this.textAlign = textalign;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleTextAlign(handle, textalign);
                }
            }
        };

        _pIconTextElement.setElementVerticalAlign = function (verticalalign)
        {
            if (this.verticalAlign != verticalalign)
            {
                this.verticalAlign = verticalalign;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleVerticalAlign(handle, verticalalign);
                }
            }
        };

        _pIconTextElement.setElementTextPadding = function (textpadding)
        {
            this.textPadding = textpadding;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleTextPaddingObject(handle, textpadding);
            }
        };

        _pIconTextElement.setElementTextWidth = function (textwidth)
        {
            this.textwidth = textwidth;
            var handle = this.handle;
            if (handle)
            {
                if (textwidth)
                {
                    nexacro.__setElementHandleTextWidth(handle, textwidth);
                }
            }
        };

        _pIconTextElement.setElementText = function (text)
        {
            if (this.text !== text || this._use_decoration == true)
            {
                this.text = text;
                this._use_decoration = false;

                var handle = this.handle;
                if (handle)
                {
                	nexacro.__setElementHandleText(handle, text, this._use_newline, this.wordWrap || this._wordwrap_info);
                }
            }
        };

        _pIconTextElement.setElementDecorateText = function (text)
        {
            if (this.text != text || this._use_decoration == false)
            {
                this.text = text;
                this._use_decoration = true;

                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleDecorateText(handle, text);
                }
            }
        };

        _pIconTextElement.setElementIcon = function (icon)
        {            
            if (this.icon != icon)
            {
                this.icon = icon;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleIconObject(handle, icon);
                }
            }
        };

        _pIconTextElement.setElementIconPos = function (iconpos)
        {
            var oldpos = this.iconPos;
            this.iconPos = iconpos;

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleIconPos(handle, iconpos);
            }
        };

        _pIconTextElement.setElementWordWrap = function (wordwrap)
        {
        	if (this.wordWrap != wordwrap)
            {
        		var oldwordwrap = this.wordWrap || this._wordwrap_info;
        		this.wordWrap = wordwrap;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleWordwrapObject(handle, wordwrap);
                    if (this.text && this._use_decoration == false && oldwordwrap != wordwrap)
                    {
                    	nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                    }
                }
            }
        };


        _pIconTextElement.setElementCSSMapInfo = function (wordwrap)
        {
            if (this._wordwrap_info != wordwrap)
            {
            	var oldwordwrap = this.wordWrap || this._wordwrap_info;
                this._wordwrap_info = wordwrap;
                var handle = this.handle;
                if (handle)
                {
                	if (!this.wordWrap && this.text && this._use_decoration == false && oldwordwrap != wordwrap)
                    {
                		nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                    }
                }
            }
        };

        /*
        _pIconTextElement._getComputedStyle = function ()
        {
        	var handle = this.handle;

        	return { textAlign: "center", verticalAlign: "middle" };
        };
        */

        //end of nexacro.IconTextElement

        //======================================================================
        // nexacro.ImageElement - this Element
        //======================================================================
        nexacro.ImageElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "image");
        };
        var _pImageElement = nexacro._createPrototype(nexacro.Element, nexacro.ImageElement);
        nexacro.ImageElement.prototype = _pImageElement;
        // overide nexacro.Control

        _pImageElement._type_name = "ImageElement";
        _pImageElement.typeselector = "nexaimagebox";

        //==== defaule values =========//
        _pImageElement.image = null;
        //==== internal handles =========//
        //==== default flags =========//
        //_pImageElement._is_nc_element = false;
        //==== end of initial =========//

        _pImageElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();

                var handle = nexacro.__createImageElementHandle(this, win_handle, this.left, this.top, this.width, this.height, true);

                if (!this.visible)
                    nexacro.__setElementHandleVisible(handle, false);

                if (this.image)
                {
                    nexacro.__setElementHandleImageUrlObject(handle, this.image);
                }

                // append TO Parent Element
                this.handle = handle;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };

        /*
        _pImageElement.setElementAlign = function (align)
	    {
		    this.align = align;
		    var handle = this.handle;
		    if (handle)
		    {
		        nexacro.__setElementHandleAlignObject(handle, align);
		    }
	    };
       */

        _pImageElement.setElementImage = function (image)
        {
            if (this.image != image)
            {
                this.image = image;

                var handle = this.handle;

                // load image
                if (handle && image)
                {
                    nexacro.__setElementHandleImageUrlObject(handle, image);
                }		            // 이미지 unload를 위해 null url에 대한 처리를 추가
                else
                {
                    nexacro.__setElementHandleImageUrlObject(handle, null);
                }
            }
        };
        // end of ImageElement

        //======================================================================
        // nexacro.InputElement - this Element
        //======================================================================
        nexacro.InputElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "input");

            this._composer = new nexacro._CompositionState();
        };

        var _pInputElement = nexacro._createPrototype(nexacro.Element, nexacro.InputElement);
        nexacro.InputElement.prototype = _pInputElement;

        _pInputElement._type_name = "InputElement";
        _pInputElement.classname = "nexainput";

        _pInputElement.textAlign = null;
        _pInputElement.padding = null;
        _pInputElement.caretcolor = null;
        _pInputElement.selectcolor = null;
        _pInputElement.selectbackground = null;
        _pInputElement.compositecolor = null;
        _pInputElement.displaynulltextcolor = null;

        _pInputElement.enable = true;
        _pInputElement.useime = "global";
        _pInputElement.imemode = "auto";
        _pInputElement.readonly = false;
        _pInputElement.maxlength = 0;
        _pInputElement.autoskip = false;
        _pInputElement.autoselect = false;
        _pInputElement.value = null;
        _pInputElement.defaultvalue = "";
        _pInputElement.displaynulltext = "";
        _pInputElement.tabindentsize = 4;
        _pInputElement.inputtype = "text"; // ['text', 'password', 'number']
        _pInputElement.usemultiline = false;

        _pInputElement._is_focused = false;
        _pInputElement._is_sys_focused = false;

        _pInputElement._is_input_element = true;

        _pInputElement._zerolength_value = undefined;
        _pInputElement._input_text = "";

        _pInputElement._checkmax_editing_only = true;
        _pInputElement._last_selection_range = null; // for blur

        _pInputElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();

                var handle = this.handle = nexacro.__createInputElementHandle(this, win_handle, this.left, this.top, this.width, this.height, false);

                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, this.classname);               

                if (!this.visible)
                {
                    nexacro.__setElementHandleVisible(handle, false);
                }
                if (!this.enable)
                {
                    nexacro.__setElementHandleEnable(handle, false);
                }
                if (this.readonly)
                {
                    nexacro.__setElementHandleReadOnly(handle, true);
                }
                //if (this.font)
                //{
                //    nexacro.__setElementHandleFontObject(handle, this.font);
                //}
                //if (this.color)
                //{
                //    nexacro.__setElementHandleColorObject(owner_elem.handle, this.color);
                //}
                //if (this.cursor)
                //{
                //    nexacro.__setElementHandleCursorObject(handle, this.cursor);
                //}
                if (this.padding)
                {
                    nexacro.__setElementHandlePaddingObject(handle, this.padding);
                }
                if (this.caretcolor)
                {
                    nexacro.__setInputElementHandleCaretColor(handle, this.caretcolor);
                }
                if (this.selectcolor)
                {
                    nexacro.__setInputElementHandleSelectColor(handle, this.selectcolor);
                }
                if (this.selectbackground)
                {
                    nexacro.__setInputElementHandleSelectBackgroundColor(handle, this.selectbackground);
                }
                if (this.compositecolor)
                {
                    nexacro.__setInputElementHandleCompositeColor(handle, this.compositecolor);
                }
                if (this.textDecoration)
                {
                    nexacro.__setElementHandleTextDecorationObject(handle, this.textDecoration);
                }
                if (this.inputtype == "password")
                {
                    nexacro.__setInputElementHandleUsePassword(handle, true);
                }

                if (this.useime)
                {
                    nexacro.__setInputElementHandleUseIme(handle, this.useime);
                }
                if (this.imemode)
                {
                    nexacro.__setInputElementHandleImeMode(handle, this.imemode);
                }

                if (this.maxlength)
                {
                    nexacro.__setInputElementHandleMaxLength(handle, this.maxlength);
                }

                if (this.value)
                {
                    nexacro.__setElementHandleValue(handle, this.value);
                }
                else if (this.displaynulltext)
                {
                    if (this.displaynulltextcolor)
                    {
                        nexacro.__setElementHandleColorObject(owner_elem.handle, this.displaynulltextcolor);                        
                    }
                    nexacro.__setElementHandleValue(handle, this.displaynulltext, true);
                }
                else if (this.defaultvalue)
                {
                    this.setElementValue(this.value);
                }                                
                nexacro.__appendElementHandle(owner_elem.handle, handle);

                this._bindSysEvent();                
            }
        };

        _pInputElement.destroy = function ()
        {
            this._unbindSysEvent();
            return nexacro.Element.prototype.destroy.call(this);
        };

        _pInputElement.setElementTextAlign = function (textalign)
        {
            this.textAlign = textalign;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleTextAlign(handle, textalign);
            }
        };

        _pInputElement.setElementPadding = function (padding)
        {
            this.padding = padding;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandlePaddingObject(handle, padding);
            }
        };

        _pInputElement.setElementDisplayNullTextColor = function (color)
        {
            this.displaynulltextcolor = color;

            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                if (!this._is_focused && this.value == null && color)
                {
                    nexacro.__setElementHandleColorObject(owner_elem.handle, color);
                }
            }
        };

        _pInputElement.setElementCaretColor = function (color)
        {
            this.caretcolor = color;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setInputElementHandleCaretColor(handle, color);
            }

        };

        _pInputElement.setElementSelectColor = function (color)
        {
            this.selectcolor = color;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setInputElementHandleSelectColor(handle, color);
            }
        };

        _pInputElement.setElementSelectBackgroundColor = function (color)
        {
            this.selectbackground = color;
            var handle = this.handle;

            if (handle)
            {
                nexacro.__setInputElementHandleSelectBackgroundColor(handle, color);
            }
        };

        _pInputElement.setElementCompositeColor = function (color)
        {
            this.compositecolor = color;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setInputElementHandleCompositeColor(handle, color);
            }
        };

        _pInputElement.setElementTabindentSize = function (indent)
        {
            this.tabindentsize = indent;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleTabIndentSize(handle, indent);
            }
        };

        //_pInputElement.setElementFont = function (font)
        //{
        //    this.font = font;
        //    var handle = this.handle;
        //    if (handle)
        //    {
        //        nexacro.__setElementHandleFontObject(handle, font);
        //    }
        //};

        //_pInputElement.setElementColor = function (color)
        //{
        //    this.color = color;
        //    var owner_elem = this.parent_elem.getContainerElement(this.position_step);
        //    if (owner_elem && owner_elem.handle && !this.handle)
        //    {
        //        if (this._is_focused || (this.displaynulltext != "" && this.displaynulltextcolor && this.value != null))
        //            nexacro.__setElementHandleColorObject(owner_elem.handle, color);
        //    }
        //};

        //_pInputElement.setElementCursor = function (cursor)
        //{
        //    this.cursor = cursor;
        //    var handle = this.handle;
        //    var owner_elem = this.parent_elem.getContainerElement(this.position_step);
        //    if (owner_elem && owner_elem.handle)
        //    {
        //        nexacro.__setElementHandleCursorObject(owner_elem.handle, cursor);
        //        nexacro.__setElementHandleCursorObject(handle, cursor);
        //    }
        //};

        _pInputElement.setElementEnable = function (enable)
        {
            if (this.enable != enable)
            {
                this.enable = enable;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleEnable(handle, enable);
                }
            }
        };

        _pInputElement.setElementReadonly = function (readonly)
        {
            if (this.readonly != readonly)
            {
                this.readonly = readonly;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleReadOnly(handle, readonly);
                }
            }
        };

        _pInputElement.setElementAutoSkip = function (v)
        {
            if (this.autoskip != v)
            {
                this.autoskip = v;
            }
        };

        _pInputElement.setElementAutoSelect = function (v)
        {
            if (this.autoselect != v)
            {
                this.autoselect = v;
            }
        };

        _pInputElement.setElementMaxLength = function (length)
        {
            if (this.maxlength != length)
            {
                this.maxlength = length;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setInputElementHandleMaxLength(handle, (length > 0) ? length : 0);

                    var text = this.getElementText();
                    if (this._is_focused || !this._checkmax_editing_only)
                    {
                        if (this.maxlength > 0 && text.length > this.maxlength)
                        {
                            text = text.substring(0, this.maxlength);
                            this._updateInputValue(text);
                        }
                    }
                }
            }
        };

        _pInputElement.setElementUseIme = function (useime)
        {
            if (this.useime != useime)
            {
                this.useime = useime;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setInputElementHandleUseIme(handle, useime);
                }
            }
        };

        _pInputElement.setElementImeMode = function (imemode)
        {
            if (this.imemode != imemode)
            {
                this.imemode = imemode;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setInputElementHandleImeMode(handle, imemode);
                }
            }
        };

        _pInputElement.setElementDisplayNullText = function (text)
        {
            if (this.displaynulltext != text)
            {
                this.displaynulltext = text;

                var handle = this.handle;
                var owner_elem = this.parent_elem.getContainerElement(this.position_step);
                if (handle && owner_elem && owner_elem.handle)
                {
                    if (this.displaynulltext != "" && nexacro._isNull(this.value) && !this._is_focused)
                    {
                        if (this.displaynulltextcolor)
                        {
                            nexacro.__setElementHandleColorObject(owner_elem.handle, this.displaynulltextcolor);
                        }
                        nexacro.__setElementHandleValue(handle, this.displaynulltext, true);
                    }
                }
            }
        };

        _pInputElement.setElementDefaultValue = function (value)
        {
            if (value != this.defaultvalue)
            {
                this.defaultvalue = value;
            }
        };

        _pInputElement.setElementValue = function (value)
        {
            var text = (!value ? this.defaultvalue : (value + ""));

            if ((this.value == value) && (this._getInputValue() == text))
                return;

            this.value = value;
            this._input_text = value;
            var color = this.color;

            var handle = this.handle;
            if (handle)
            {
                if (this.value || this.value === "")
                {
                    if (this._is_focused || !this._checkmax_editing_only)
                    {
                        if (this.maxlength > 0 && text.length > this.maxlength)
                        {
                            text = text.substring(0, this.maxlength);
                        }
                    }

                    this._updateInputValue(text);

                }
                else if (!this._is_focused && this.displaynulltext != "")
                {
                    nexacro.__setElementHandleValue(handle, this.displaynulltext, true);
                    if (this.displaynulltextcolor)
                    {
                        color = this.displaynulltextcolor;
                    }
                }
                else
                {
                    this._updateInputValue(text);
                }

                if (this.displaynulltextcolor)
                {
                    var owner_elem = this.parent_elem.getContainerElement(this.position_step);
                    if (owner_elem && owner_elem.handle)
                    {
                        nexacro.__setElementHandleColorObject(owner_elem.handle, color);
                    }
                }
            }
        };

        _pInputElement.replaceElementText = function (value, begin, end, bselect)
        {
            var input_value = this._getInputValue();
            if (begin < 0) return;

            if (end < 0) end = input_value.length;
            if (begin > end) end = begin;

            value = (value ? value : "");
            var caretpos = begin + value.length;

            var text = input_value.substring(0, begin) + value + input_value.substring(end);
            if (bselect)
            {
                this._updateInputValue(text, !this._processing_oninput, begin, caretpos);
            }
            else
            {
                this._updateInputValue(text, !this._processing_oninput, caretpos);
            }
        };

        _pInputElement.updateElementText = function (value, caretpos)
        {
            value = (value ? value : "");
            this._updateInputValue(value, !this._processing_oninput, caretpos);
        };

        _pInputElement._updateElementValue = function (value)
        {
            if (this.value == value)
                return;

            if (!value) value = this._zerolength_value;
            this.value = value;
        };

        _pInputElement._updateInputValue = function (value, fireevent, selectionStart, selectionEnd)
        {
            var handle = this.handle;
            if (handle)
            {
                this._input_text = value;
                nexacro.__setElementHandleValue(handle, value);

                if (selectionStart != null && selectionStart > -1)
                {
                    if (selectionEnd == -1) selectionEnd = value.length;
                    if (selectionEnd == null || selectionEnd < selectionStart)
                        selectionEnd = selectionStart;

                    nexacro.__setInputElementHandleSetSelect(handle, selectionStart, selectionStart, false);
                }
                if (fireevent)
                {
                    this._on_sys_keyinput_forward();
                }
            }
        };

        // ['text', 'password', 'number', 'tel']
        _pInputElement.setElementInputType = function (type)
        {
            if (type == "number" || type == "tel")
            {
                type = "number"; // android runtime internal : phone type 설정할 것
            }
            else if (type == "date")
            {
                type = "date";
            }
            else if (type != "password")
            {
                type = "text";
            }

            if (this.inputtype != type)
            {
                this.inputtype = type;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setInputElementHandleInputType(handle, this.inputtype);

                    if (type == "password")
                    {
                        nexacro.__setInputElementHandleSetIme(handle, "none", "none");
                    }
                    else
                    {
                        nexacro.__setInputElementHandleSetIme(handle, this.useime, this.imemode);
                    }
                    nexacro.__setInputElementHandleUsePassword(handle, type == "password");
                }
            }
        };

        _pInputElement.setElementFocus = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused)
                {
                    this._is_focused = true;

                    if (this._checkmax_editing_only && this.maxlength > 0)
                    {
                        var text = (!this.value ? this.defaultvalue : (this.value + ""));
                        if (text.length > this.maxlength)
                        {
                            text = text.substring(0, this.maxlength);
                            this._updateInputValue(text);
                        }
                    }
                }

                if (!this.value)
                {
                    var value = this._getInputValue();
                    if (value != this.defaultvalue)
                    {
                        if (this.displaynulltextcolor)
                        {
                            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
                            if (owner_elem && owner_elem.handle)
                            {
                                nexacro.__setElementHandleColorObject(owner_elem.handle, this.color);
                            }
                        }
                        nexacro.__setElementHandleValue(handle, this.defaultvalue);
                    }
                }

                if (!this._is_sys_focused)
                {
                    nexacro.__setElementHandleFocus(handle);
                }

                this._setElementLastSelectionRange();
                nexacro.__setLastFocusedElement(this);
            }
        };

        _pInputElement.setElementBlur = function ()
        {
            var handle = this.handle;
            if (handle && this._is_focused)
            {
                if (this._is_focused)
                {
                    // selection range is clear after blur, and selection style will represent.(it is bug)
                    this._setElementLastSelectionRange(this.getElementSelectionRange());

                    this._is_focused = false;

                    if (this._is_sys_focused)
                    {
                        nexacro.__setInputElementHandleBlur(handle);
                    }
                }

                nexacro.__setInputElementHandleSetSelect(handle, 0, 0, false);

                if (this._checkmax_editing_only && this.maxlength > 0)
                {
                    var text = (!this.value ? this.defaultvalue : (this.value + ""));
                    var value = this._getInputValue();
                    if (text != value)
                    {
                        this._updateInputValue(text);
                    }
                }

                if (this.value == null && this.displaynulltext != "")
                {
                    if (this.displaynulltextcolor)
                    {
                        var owner_elem = this.parent_elem.getContainerElement(this.position_step);
                        if (owner_elem && owner_elem.handle)
                        {
                            nexacro.__setElementHandleColorObject(owner_elem.handle, this.displaynulltextcolor);
                        }
                    }
                    nexacro.__setElementHandleValue(handle, this.displaynulltext, true);
                }
            }
        };

        _pInputElement.setElementSetSelect = function (start, end)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused)
                {
                    // selection range is set, node will has focus;
                    this._setElementLastSelectionRange([start, end]);
                    return;
                }

                nexacro.__setInputElementHandleSetSelect(handle, start, end, false);
                //nexacro.__setInputElementHandleSetSelect(_handle, start, end, this.autoselect);
                //this.autoselect = false;//autoselect일때만 이 함수 호출전에 true설정하고 무조건 여기서 해제...그래야 mouse select가 됨;
            }
        };

        _pInputElement._setElementLastSelectionRange = function (range)
        {
            if (range)
            {
                this._last_selection_range = range;
            }
            else
            {
                this._last_selection_range = null;
            }
        };

        _pInputElement.getElementCaretPos = function ()
        {
            var handle = this.handle;
            if (handle && this._is_focused)
            {                
                var pos = nexacro.__getInputElementHandleCaretPos(handle);
                if (pos)
                {
                    return { begin: pos[0], end: pos[1] };
                }
            }
            return -1;
        };

        _pInputElement.getElementSelectionRange = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this._last_selection_range)
                {
                    return this._last_selection_range;
                }

                return nexacro.__getInputElementHandleSelectionRange(handle);
            }
            return [0, 0];
        };

        _pInputElement.getElementText = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                return this._getInputValue();
            }
            return this._input_text;
        };

        _pInputElement._getInputValue = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (this._is_focused || !this.displaynulltext)
                {
                    return nexacro.__getElementHandleValue(handle);
                }
                else
                {
                    return this._input_text;
                }
            }
            return "";
        };

        _pInputElement.getElementValue = function ()
        {
            return this.value;
        };

        _pInputElement.getCompositionStatus = function ()
        {
            return (this._composer ? this._composer.status : nexacro._CompositionState.NONE);
        };

        _pInputElement.isComposing = function ()
        {
            return (this._composer ? this._composer.isComposing() : false);
        };

        _pInputElement.setCompositionComplete = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var pos = this.getElementCaretPos();
                var value = this._getInputValue();

                var is_composing = this._composer.isComposing();
                if (is_composing)
                {
                    this._composer.setStatus(nexacro._CompositionState.END, pos.end);
                    this._updateInputValue(value, !this._processing_oninput);
                }

                pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
            }
        };

        _pInputElement.setCompositionCancel = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var pos = this.getElementCaretPos();
                var value = this._getInputValue();

                var is_composing = this._composer.isComposing();
                if (is_composing)
                {
                    var offset = this._composer.getOffset();
                    this._composer.setStatus(nexacro._CompositionState.END, offset.begin);
                    this._updateInputValue(value.substring(0, offset.begin), !this._processing_oninput);
                }

                pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.NONE, pos.end);
            }
        };

        _pInputElement.clearComposition = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var is_composing = this._composer.isComposing();
                if (is_composing)
                {
                    this.setCompositionCancel();
                }
                else
                {
                    nexacro.__clearInputElementHandleCompositeChar(handle);
                }
            }
        };

        _pInputElement.setInputProcess = function (v)
        {
            this._processing_oninput = v;
        };

        _pInputElement.getInputProcess = function ()
        {
            return this._processing_oninput;
        };

        _pInputElement.setElementAccessibilityRole = function (role)
        {
        };

        _pInputElement._setElementInputRole = nexacro._emptyFn;

        //reader기가 browser 에서 value를 자동으로 읽어주는 경우를 제어
        _pInputElement._wantAccessibilityAdditionalLabel = function ()
        {
            return true;
        };

        _pInputElement._checkMaxLength = function (value, caretpos)
        {
            var maxlength = this.maxlength;
            if (maxlength <= 0 && caretpos <= 0)
            {
                return;
            }

            var vlength = value.length;
            var _is_composing = this._composer.isComposing();
            if (maxlength < vlength) // over length
            {
                var _has_candidate_window;
                if (_is_composing)
                {
                    _has_candidate_window = this._composer.isHasCandiateWindow(value.charAt(caretpos - 1));
                }

                var bcheck;
                var status = this._composer.status;
                // nexacro._CompositionState.NONE - for keypress, paste -
                // nexacro._CompositionState.COMPOSING & has not candidate window - for korean 
                // nexacro._CompositionState.END - for all CJK 
                if (!_is_composing || !_has_candidate_window)
                {
                    return { "ismax": true, "pos": (caretpos - (vlength - maxlength)) };
                }
                else //(_is_composing && _has_candidate_window) // japanese/chinese composing
                {
                    // confirmed value length == maxlength
                    var offset = this._composer.getOffset();
                    if (maxlength == (vlength - (offset.end - offset.begin)))
                    {
                        return { "ismax": true, "pos": (caretpos - (vlength - maxlength)) };
                    }
                }
            }
            else
            {
                return { "ismax": (!_is_composing && maxlength == vlength), "pos": caretpos };
            }

            return;
        };

        _pInputElement._go_next_focus = function ()
        {
            var handle = this.handle;
            var comp = this.parent_elem.linkedcontrol;
            if (handle && comp)
            {
                var form = comp._getForm();
                var newfocus_comp = form._searchNextTabFocus(form._last_focused, undefined, undefined, false);

                if (newfocus_comp && newfocus_comp[0])
                {
                    if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused)
                    {
                        var win = form._getWindow();
                        win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
                    }

                    newfocus_comp[0]._setFocus(true, 0, true);
                }
            }
        };

        _pInputElement._bindSysEvent = function ()
        {
            var input = this.handle;

            nexacro._observeInputEvent(input, "keydown", "onkeydown", this._on_sys_keydown_forward);
            nexacro._observeInputEvent(input, "keyup", "onkeyup", this._on_sys_keyup_forward);
            nexacro._observeInputEvent(input, "keypress", "onkeypress", this._on_sys_keypress_forward);

            nexacro._observeInputEvent(input, "input", "oninput", this._on_sys_keyinput_forward);
            nexacro._observeInputEvent(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
            nexacro._observeInputEvent(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
            nexacro._observeInputEvent(input, "compositionend", "oncompositionend", this._on_sys_compositionend);

            nexacro._observeInputEvent(input, "cut", "oncut", this._on_sys_cut);
            nexacro._observeInputEvent(input, "paste", "onpaste", this._on_sys_paste);
            nexacro._observeInputEvent(input, "contextmenu", "oncontextmenu", this._on_sys_contextmenu);

            nexacro._observeInputEvent(input, "lbuttondown", "onlbuttondown", this._on_sys_lbuttondown_forward);
            nexacro._observeInputEvent(input, "lbuttonup", "onlbuttonup", this._on_sys_lbuttonup_forward);
            nexacro._observeInputEvent(input, "rbuttondown", "onrbuttondown", this._on_sys_rbuttondown_forward);
            nexacro._observeInputEvent(input, "rbuttonup", "onrbuttonup", this._on_sys_rbuttonup_forward);
            nexacro._observeInputEvent(input, "mousemove", "onmousemove", this._on_sys_mousemove_forward);

            if (nexacro._SupportTouch)
            {
                nexacro._observeInputEvent(input, "touchstart", "ontouchstart", this._on_sys_lbuttondown_forward);
                nexacro._observeInputEvent(input, "touchend", "ontouchend", this._on_sys_lbuttonup_forward);
                nexacro._observeInputEvent(input, "touchmove", "ontouchmove", this._on_sys_mousemove_forward);
            }

            nexacro._observeInputEvent(input, "focus", "onfocus", this._on_sys_focus);
            nexacro._observeInputEvent(input, "blur", "onblur", this._on_sys_blur);
        };

        _pInputElement._unbindSysEvent = function ()
        {
            var input = this.handle;
            if (input)
            {
                nexacro._stopInputObserving(input, "keydown", "onkeydown", this._on_sys_keydown_forward);
                nexacro._stopInputObserving(input, "keyup", "onkeyup", this._on_sys_keyup_forward);
                nexacro._stopInputObserving(input, "keypress", "onkeypress", this._on_sys_keypress_forward);

                nexacro._stopInputObserving(input, "input", "oninput", this._on_sys_keyinput_forward);
                nexacro._stopInputObserving(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
                nexacro._stopInputObserving(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
                nexacro._stopInputObserving(input, "compositionend", "oncompositionend", this._on_sys_compositionend);

                nexacro._stopInputObserving(input, "cut", "oncut", this._on_sys_cut);
                nexacro._stopInputObserving(input, "paste", "onpaste", this._on_sys_paste);
                nexacro._stopInputObserving(input, "contextmenu", "oncontextmenu", this._on_sys_contextmenu);

                nexacro._stopInputObserving(input, "lbuttondown", "onlbuttondown", this._on_sys_lbuttondown_forward);
                nexacro._stopInputObserving(input, "lbuttonup", "onlbuttonup", this._on_sys_lbuttonup_forward);
                nexacro._stopInputObserving(input, "rbuttondown", "onrbuttondown", this._on_sys_rbuttondown_forward);
                nexacro._stopInputObserving(input, "rbuttonup", "onrbuttonup", this._on_sys_rbuttonup_forward);
                nexacro._stopInputObserving(input, "mousemove", "onmousemove", this._on_sys_mousemove_forward);

                if (nexacro._SupportTouch)
                {
                    nexacro._stopInputObserving(input, "touchstart", "ontouchstart", this._on_sys_lbuttondown_forward);
                    nexacro._stopInputObserving(input, "touchend", "ontouchend", this._on_sys_lbuttonup_forward);
                    nexacro._stopInputObserving(input, "touchmove", "ontouchmove", this._on_sys_mousemove_forward);
                }

                nexacro._stopInputObserving(input, "focus", "onfocus", this._on_sys_focus);
                nexacro._stopInputObserving(input, "blur", "onblur", this._on_sys_blur);
            }
        };

        _pInputElement._on_sys_keydown_forward = function (keycode, altkey, ctrlkey, shiftkey)
        {
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                ret = nexacro._syshandler_onkeydown_forward(_win, this, keycode, altkey, ctrlkey, shiftkey);                
                if (this._event_stop)
                {
                    this._event_stop = false;
                    this.clearComposition();
                    return false;
                }                               
                
            }
            var ret = this._on_sys_keydown(keycode, altkey, ctrlkey, shiftkey);
            if (ret === false || this._event_stop)
            {
                this._event_stop = false;
                return false;
            }

            return true;
        };

        _pInputElement._on_sys_keydown = function (keycode, altkey, ctrlkey, shiftkey)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this.readonly)
                {
                    var pos = this.getElementCaretPos();
                    this._composer.setDelayStatus(undefined);

                    if (keycode != nexacro.KeyCode_ImeInput) // 229
                    {
                        this._composer.setStatus(nexacro._CompositionState.NONE, pos.begin);
                    }
                }
            }
        };

        _pInputElement._on_sys_keyup_forward = function (keycode, altkey, ctrlkey, shiftkey)
        {
            var ret = this._on_sys_keyup(keycode, altkey, ctrlkey, shiftkey);
            if (ret === false || this._event_stop)
            {
                this._event_stop = false;
                return false;
            }

            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                ret = nexacro._syshandler_onkeyup_forward(_win, this, keycode, altkey, ctrlkey, shiftkey);

                if (this._event_stop)
                {
                    this._event_stop = false;
                    return false;
                }
            }

            return true;
        };

        _pInputElement._on_sys_keyup = function (keycode, altkey, ctrlkey, shiftkey)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this.readonly)
                {
                    var pos = this.getElementCaretPos();
                    var is_composing = this._composer.isComposing();
                    if (is_composing)
                    {
                        // 일본어의 경우, keydown에서 keycode 알 수 없음 (IME Mode에서는 항상 229)
                        if (keycode == nexacro.Event.KEY_RETURN
                            || keycode == nexacro.Event.KEY_ESC
                            || (ctrlkey && keycode == 77) // ctrl+m 
                            || (ctrlkey && keycode == 90)) // ctrl+z
                        {
                            this._composer.setStatus(nexacro._CompositionState.END, pos.end);

                            var value = this._getInputValue();
                            this._updateInputValue(value, true);
                        }
                    }
                }
            }
        };

        _pInputElement._on_sys_keypress_forward = function (keycode, charcode, altkey, ctrlkey, shiftkey)
        {
            var ret = this._on_sys_keypress(keycode, charcode, altkey, ctrlkey, shiftkey);

            if (ret === false || this._event_stop)
            {
                this._event_stop = false;
                return false;
            }

            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                ret = nexacro._syshandler_onkeypress_forward(_win, this, keycode, charcode, altkey, ctrlkey, shiftkey);

                if (this._event_stop)
                {
                    this._event_stop = false;
                    return false;
                }
            }

            return ret;
        };

        _pInputElement._on_sys_keypress = function (keycode, charcode, altkey, ctrlkey, shiftkey)
        {
            var handle = this.handle;
            if (handle)
            {
                if (this.maxlength > 0)
                {
                    var value = this._getInputValue();
                    if (value.length > this.maxlength)
                    {
                        this._event_stop = false;
                        return false;
                    }
                }
            }
        };

        _pInputElement._on_sys_keyinput_forward = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var ret;
                if (!this._processing_oninput)
                {
                    var value = this._getInputValue();

                    // detemine changed status & value 
                    var is_changed_status = false;
                    var prev_status = this._composer._prev_status;
                    var cur_status = this._composer.status;

                    //if (prev_status == cur_status && this.value == value)
                       // return;

                    this._processing_oninput = true;
                    ret = this._on_sys_keyinput();
                    this._processing_oninput = false;

                    this._paste_caret_pos = null;
                }

                return ret;
            }
        };

        _pInputElement._on_sys_keyinput = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var composing_status = this._composer.status;
                var beginOffset, endOffset;

                var value = this._getInputValue();

                // inputfilter / inputtype
                var pos = this.getElementCaretPos();
                var paste_pos = this._paste_caret_pos;

                if (composing_status == nexacro._CompositionState.NONE)
                {
                    beginOffset = paste_pos ? paste_pos.begin : this._composer.startOffset;
                    endOffset = paste_pos ? paste_pos.end : pos.end;
                }
                else
                {
                    var offsetCompose = this._composer.getOffset();
                    beginOffset = offsetCompose.begin;
                    endOffset = offsetCompose.end;
                }

                var comp = this.parent_elem.linkedcontrol;
                if (comp._on_beforekeyinput)
                {
                    var ret = comp._on_beforekeyinput(this, value, composing_status, beginOffset, endOffset);
                    if (this._event_stop)
                    {
                        this._event_stop = false;
                        return false;
                    }

                    value = this._getInputValue();
                    pos = this.getElementCaretPos();
                }

                // check maxlength
                var ismax = false;
                if (this.maxlength > 0)
                {
                    var beginpos = paste_pos ? paste_pos.begin : pos.begin;
                    var caretpos = paste_pos ? paste_pos.end : pos.end;
                    var check = this._checkMaxLength(value, caretpos);
                    if (check)
                    {
                        ismax = check.ismax;
                        var newpos = check.pos;

                        if (ismax && caretpos != newpos)
                        {
                            value = value.substring(0, newpos) + value.substring(caretpos);
                            this._updateInputValue(value);
                            this.setElementSetSelect(newpos, newpos);

                            value = this._getInputValue();
                            pos = this.getElementCaretPos();
                        }
                    }
                }
                
                if (this._composer.isComposing())
                {
                    this._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
                }

                // fire oninput event
                var old_value = this.value;
                this._updateElementValue(value);

                // detemine changed status & value 
                var prev_status = this._composer._prev_status;
                var cur_status = this._composer.status;

                if (prev_status == cur_status && this.value == old_value)
                {
                    if (ismax && this.autoskip)
                    {
                        if (this.value && value.length > this.value.length)
                        {
                            ismax = false;
                        }

                        if (ismax)
                        {
                            this._go_next_focus();
                        }
                    }

                    if (comp._on_autoskip)
                    {
                        comp._on_autoskip();
                    }

                    return;
                }
                    
                this._composer._prev_status = cur_status;

                if (comp._on_keyinput)
                {
                    comp._on_keyinput(this);
                }

                if (this._event_stop)
                {
                    this._event_stop = false;
                    return false;
                }

                // autoskip
                if (ismax && this.autoskip)
                {
                    if (this.value && value.length > this.value.length)
                    {
                        ismax = false;
                    }

                    if (ismax)
                    {
                        this._go_next_focus();
                    }
                }
            }
        };

        _pInputElement._on_sys_cut = function ()
        {
        };

        _pInputElement._on_sys_paste = function ()
        {   
            var handle = this.handle;
            if (handle)
            {
                var value = this._getInputValue();

                var pos = this.getElementCaretPos();
                var begin = pos.begin;
                var end = pos.end;

                var newvalue, newpos = begin;                
                var data = nexacro.__getClipboard("CF_UNICODETEXT");
                if (data)
                {   
                    newvalue = value.substring(0, begin) + data + value.substring(end);
                    pos.end = begin + data.length;
                }
                this._paste_caret_pos = pos;
            }
        };

        _pInputElement._on_sys_contextmenu = function ()
        {
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                return nexacro._syshandler_oncontextmenu_forward(_win, this);
            }
        };

        _pInputElement._on_sys_compositionstart = function (data)
        {
            var handle = this.handle;
            if (handle)
            {
                var pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.START, pos.begin);
            }
        };

        _pInputElement._on_sys_compositionupdate = function (data)
        {
            var handle = this.handle;
            if (handle)
            {
                var pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.COMPOSING, pos.end);
            }
        };

        _pInputElement._on_sys_compositionend = function (data)
        {
            var handle = this.handle;
            if (handle)
            {
                var pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.END, pos.end);
            }
        };

        _pInputElement._on_sys_lbuttondown_forward = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY)
        {     
            /*
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                nexacro._syshandler_onlbuttondown_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);
            }
            */
            return false;
        };

        _pInputElement._on_sys_lbuttonup_forward = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY)
        {
            /*
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                nexacro._syshandler_onlbuttonup_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);
            }
            */
            return false;
        };

        _pInputElement._on_sys_rbuttondown_forward = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY)
        {
            /*
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                nexacro._syshandler_onrbuttondown_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);
            }
            */
            return false;
        };

        _pInputElement._on_sys_rbuttonup_forward = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY)
        {
            
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                nexacro._syshandler_onrbuttonup_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);

                return true;
            }
            
            return false;
        };

        _pInputElement._on_sys_mousemove_forward = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY)
        {
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var _win = comp._getWindow();
                return nexacro._syshandler_onmousemove_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);
            }
        };

        _pInputElement._on_sys_focus = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                this._is_sys_focused = true;

                if (this.autoselect)
                {
                    nexacro.__setInputElementHandleSetSelect(handle, 0, -1, this.autoselect);
                }
                else if (this._last_selection_range)
                {
                    var sel = this._last_selection_range;
                    nexacro.__setInputElementHandleSetSelect(handle, sel[0], sel[1], false);
                }

                if (this.value == null) this._zerolength_value = undefined;
                else this._zerolength_value = "";

                // Change 여부 체크
                //this._default_value = this.value;

                var pos = this.getElementCaretPos();
                this._composer.setStatus(nexacro._CompositionState.NONE, pos.begin);

                // TODO : set keypad type (android runtime)
            }
        };

        _pInputElement._on_sys_blur = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                this._is_sys_focused = false;
            }
        };

        _pInputElement = null;

        //======================================================================
        // nexacro.TextAreaElement - this Element
        //======================================================================
        nexacro.TextAreaElement = function (parent_elem, id)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.id = id;
            this.name = this.parent_elem.name + ":" + (id || "input");

            this._composer = new nexacro._CompositionState();
        };

        var _pTextAreaElement = new nexacro._createPrototype(nexacro.InputElement, nexacro.TextAreaElement);
        nexacro.TextAreaElement.prototype = _pTextAreaElement;

        _pTextAreaElement._type_name = "TextAreaElement";
        _pTextAreaElement.classname = "nexatextarea";

        _pTextAreaElement.usemultiline = true;
        //_pTextAreaElement.wordWrap = "none";

        _pTextAreaElement.create = function (win)
        {
            // parent is always control element
            // this is always NO nc_element
            var owner_elem = this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();

                var handle = this.handle = nexacro.__createInputElementHandle(this, win_handle, this.left, this.top, this.width, this.height, this.usemultiline);

                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, this.classname);

                if (!this.visible)
                {
                    nexacro.__setElementHandleVisible(handle, false);
                }

                if (!this.enable)
                {
                    nexacro.__setElementHandleEnable(handle, false);
                }

                if (this.readonly)
                {
                    nexacro.__setElementHandleReadOnly(handle, true);
                }

                if (this.font)
                {
                    nexacro.__setElementHandleFontObject(handle, this.font);
                }
                if (this.color)
                {
                    nexacro.__setElementHandleColorObject(owner_elem.handle, this.color);
                }

                if (this.cursor)
                {
                    nexacro.__setElementHandleCursorObject(handle, this.cursor);
                }

                if (this.caretcolor)
                {
                    nexacro.__setInputElementHandleCaretColor(handle, this.caretcolor);
                }
                if (this.selectcolor)
                {
                    nexacro.__setInputElementHandleSelectColor(handle, this.selectcolor);
                }
                if (this.selectbackground)
                {
                    nexacro.__setInputElementHandleSelectBackgroundColor(handle, this.selectbackground);
                }
                if (this.compositecolor)
                {
                    nexacro.__setInputElementHandleCompositeColor(handle, this.compositecolor);
                }

                if (this.padding)
                {
                    nexacro.__setElementHandlePaddingObject(handle, this.padding);
                }

                if (this.textDecoration)
                {
                    nexacro.__setElementHandleTextDecorationObject(handle, this.textDecoration);
                }

                if (this.wordWrap != "none")
                {
                    nexacro.__setElementHandleWordwrapObject(handle, this.wordWrap);
                }

                if (this.tabindentsize > 4)
                {
                    nexacro.__setElementHandleTabIndentSize(handle, this.tabindentsize);
                }

                if (this.imemode)
                {
                    nexacro.__setInputElementHandleImeMode(handle, this.imemode);
                }
                if (this.maxlength)
                {                    
                    nexacro.__setInputElementHandleMaxLength(handle, this.maxlength);
                }

                if (this.value)
                {
                    nexacro.__setElementHandleValue(handle, this.value);
                }
                else if (this.displaynulltext)
                {
                    if (this.displaynulltextcolor)
                    {
                        nexacro.__setElementHandleColorObject(handle, this.displaynulltextcolor);
                    }
                    nexacro.__setElementHandleValue(handle, this.displaynulltext, true);
                }

                nexacro.__setElementHandleVerticalAlign(handle, "top"); // runtime 기본값

                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
                this._bindSysEvent();
            }
        };

        _pTextAreaElement.setElementWordWrap = function (wordwrap)
        {
            if (this.wordWrap != wordwrap)
            {
                var oldwordwrap = this.wordWrap || this._wordwrap_info;
                this.wordWrap = wordwrap;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleWordwrapObject(handle, wordwrap);
                    if (this.text && this._use_decoration == false && oldwordwrap != wordwrap)
                    {
                        nexacro.__setElementHandleText(handle, this.text, this._use_newline, this.wordWrap || this._wordwrap_info);
                    }
                }
            }
        };

        _pTextAreaElement.setElementValue = function (value)
        {
            if (value)
            {
                value = value.replace(/\r\n/g, "\n");
            }

            nexacro.InputElement.prototype.setElementValue.call(this, value);
        };

        _pTextAreaElement.updateElementText = function (value, caretpos)
        {
            if (value)
            {
                value = value.replace(/\r\n/g, "\n");
            }

            nexacro.InputElement.prototype.updateElementText.call(this, value, caretpos);
        };

        _pTextAreaElement._updateElementValue = function (value)
        {
            if (value)
            {
                value = value.replace(/\r\n/g, "\n");
            }

            nexacro.InputElement.prototype._updateElementValue.call(this, value);
        };

        _pTextAreaElement._getInputValue = function ()
        {
            return nexacro.InputElement.prototype._getInputValue.call(this);
        };

        _pTextAreaElement.setElementInputType = function (type)
        {
            ;
        };

        _pTextAreaElement.getElementCaretLine = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__getInputElementHandleCaretLine(handle);
            }
            return 0;
        };

        _pTextAreaElement.getElementTextLineCount = function (withwrap)
        {
            var handle = this.handle;
            if (handle)
            {
                var text = this._getInputValue();

                if (withwrap)
                {
                    var select = nexacro.__getInputElementHandleSelectionRange(handle);
                    nexacro.__setInputElementHandleCaretPos(handle, text.length);

                    var line = nexacro.__getInputElementHandleCaretLine(handle);

                    nexacro.__setInputElementHandleSetSelect(handle, select[0], select[1], false);
                    return line;
                }
                else
                {
                    var textarr = text.split("\n");
                    return textarr.length;
                }
            }
            return 0;
        };

        _pTextAreaElement.isFirstCaretLine = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var line = nexacro.__getInputElementHandleCaretLine(handle);
                if (lines <= 1) return true;
            }
            return false;
        };

        _pTextAreaElement.isLastCaretLine = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var caret_line = nexacro.__getInputElementHandleCaretLine(handle);
                var total_line = this.getElementTextLineCount();
                if (total_line == caret_line) return true;
            }
            return false;
        };

        _pTextAreaElement.setElementScrollPos = function (hpos, vpos)
        {
            if (hpos < 0) hpos = 0;
            if (vpos < 0) vpos = 0;

            this.setElementHScrollPos(hpos);
            this.setElementVScrollPos(vpos);
        };

        _pTextAreaElement.getElementHScrollPos = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return 0;

                return nexacro.__getInputElementHandleScrollLeft(handle);
            }
            return 0;
        };

        _pTextAreaElement.setElementHScrollPos = function (v)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return;

                nexacro.__setInputElementHandleScrollLeft(handle, v);
            }
        };

        _pTextAreaElement.getElementVScrollPos = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return 0;

                return nexacro.__getInputElementHandleScrollTop(handle);
            }
            return 0;
        };

        _pTextAreaElement.setElementVScrollPos = function (v)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return;

                nexacro.__setInputElementHandleScrollTop(handle, v);
            }
        };

        _pTextAreaElement.getElementScrollWidth = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return this.width;

                return nexacro.__getInputElementHandleScrollWidth(handle);
            }
            return 0;
        };

        _pTextAreaElement.getElementScrollHeight = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                if (!this._is_focused && this.value == null && this.displaynulltext)
                    return this.height;

                return nexacro.__getInputElementHandleScrollHeight(handle);
            }
            return 0;
        };

        _pTextAreaElement._bindSysEvent = function ()
        {
            var input = this.handle;
            if (input)
            {
                nexacro.InputElement.prototype._bindSysEvent.call(this);
                nexacro._observeInputEvent(input, "scroll", "onscroll", this._on_sys_scroll);
            }
        };

        _pTextAreaElement._unbindSysEvent = function ()
        {
            var input = this.handle;
            if (input)
            {
                nexacro.InputElement.prototype._unbindSysEvent.call(this);
                nexacro._stopInputObserving(input, "scroll", "onscroll", this._on_sys_scroll);
            }
        };

        _pTextAreaElement._on_sys_scroll = function (posTop, posLeft)
        {
            var container = this.parent_elem.getContainerElement(this.position_step);
            if (container)
            {
                var elem_scroll_top = container.parent.scroll_top;
                var elem_scroll_left = container.parent.scroll_left;

                var hscroll_pos = elem_scroll_top;
                var vscroll_pos = elem_scroll_left;

                var scrolltype = this.parent._scrolltype;
                var linkedcontrol = this.parent.linkedcontrol;

                var bscroll = false;
                if (elem_scroll_left != posLeft)
                {
                    if (scrolltype != "none" && scrolltype != "vertical" && !linkedcontrol._is_tracking)
                    {
                        hscroll_pos = posLeft;
                        bscroll = true;
                    }
                }

                if (elem_scroll_top != posTop)
                {
                    if (scrolltype != "none" && scrolltype != "horizontal" && !linkedcontrol._is_tracking)
                    {
                        vscroll_pos = posTop;
                        bscroll = true;
                    }
                }

                if (bscroll)
                    linkedcontrol._scrollTo(hscroll_pos, vscroll_pos, true, false);

            }
        };

        _pTextAreaElement = null;

        //======================================================================
        // nexacro.ControlElement - this ControlElement has container or element
        //======================================================================	
        // this ControlElement has No Event Handlers -- Container only
        // this ControlElement has Border
        nexacro.ControlElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
        };

        var _pControlElement = nexacro._createPrototype(nexacro.Element, nexacro.ControlElement);
        nexacro.ControlElement.prototype = _pControlElement;
        // overide nexacro.Object
        _pControlElement._type_name = "ControlElement";

        //==== defaule values =========//
        _pControlElement.enable = true;
        _pControlElement.tabindex = -1;
        _pControlElement.zindex = -1;

        _pControlElement.color = null;
        _pControlElement.font = null;
        _pControlElement.textDecoration = null;

        _pControlElement.borderRadius = null;
        _pControlElement.border = null;
        _pControlElement.background = null;
        _pControlElement.edgeImage = null;

        //_pControlElement.margin = null;
        _pControlElement.padding = null;

        _pControlElement.cursor = null;
        _pControlElement.opacity = null;
        _pControlElement.boxShadow = null;

        _pControlElement.position_step = undefined;
        _pControlElement.linkedcontrol = null;

        _pControlElement.inner_width = 0;
        _pControlElement.inner_height = 0;
        _pControlElement.client_left = 0;
        _pControlElement.client_top = 0;
        _pControlElement.client_width = 0;
        _pControlElement.client_height = 0;

        //==== internal handles =========//
        _pControlElement._classname = "";

        _pControlElement._is_popup = false;
        _pControlElement._is_control = false;
        _pControlElement.zoom = 100;
        _pControlElement._edge_elem = null;
        _pControlElement._apply_client_padding = true;

        //--------------------------------
        _pControlElement._border_info = null;
        _pControlElement._padding_info = null;
        _pControlElement._edge_info = null;

        //==== accessibility values =====//
        _pControlElement.accessibilityrole = "";
        _pControlElement.accessibilityenable = false;
        _pControlElement.accessibilitylabel = "";
        _pControlElement.accessibilitydesclevel = "";
        _pControlElement.accessibilitydescription = "";
        _pControlElement.accessibilityaction = "";
        _pControlElement.accessibility_value = undefined;
        _pControlElement.accessibility_stat_disabled = undefined;
        _pControlElement.accessibility_stat_hidden = undefined;
        _pControlElement.accessibility_stat_checked = undefined; // undefined : this element does not support being checked.
        _pControlElement.accessibility_stat_pressed = undefined;
        _pControlElement.accessibility_stat_selected = undefined;
        _pControlElement.accessibility_stat_expanded = undefined; // undefined : neither expandable nor collapsible.
        _pControlElement.accessibility_stat_autocomplete = undefined;
        _pControlElement.accessibility_flag_haspopup = undefined;
        _pControlElement.accessibility_flag_focusable = undefined;
        _pControlElement.accessibility_flag_readonly = undefined;
        _pControlElement.accessibility_flag_password = undefined;
        _pControlElement.accessibility_flag_multiselectable = undefined;
        _pControlElement.accessibility_flag_selectable = undefined;
        _pControlElement.accessibility_flag_defaultbutton = undefined;
        _pControlElement.accessibility_prop_itemcount = undefined;
        _pControlElement.accessibility_prop_itemindex = undefined;
        _pControlElement.accessibility_prop_valuemax = undefined;
        _pControlElement.accessibility_prop_valuemin = undefined;

        // this is pure virtual
        _pControlElement.create = nexacro._emptyFn;
        _pControlElement.destroy = nexacro._emptyFn;
        _pControlElement.clearContents = nexacro._emptyFn;

        _pControlElement.setElementStepCount = nexacro._emptyFn;
        _pControlElement.setElementStepIndex = nexacro._emptyFn;

        _pControlElement.borderLeftNone = false;
        _pControlElement.borderTopNone = false;
        _pControlElement.borderRightNone = false;
        _pControlElement.borderBottomNone = false;

        // lym: designform 용
        _pControlElement._step_container_elements = null;

        _pControlElement.create = function (win)
        {
            // if parent is control element
            if (!this._is_popup)
            {
                var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
                if (owner_elem && owner_elem.handle && !this.handle)
                {
                    this.owner_elem = owner_elem;
                    var win_handle = win.handle || owner_elem._getRootWindowHandle();
                    var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    nexacro.__setElementHandleId(handle, this.name);

                    nexacro.__setElementHandleIsControl(handle, this._is_control);
                    /////////////////////////////////
                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;
                    
                    var classname = this._classname ? this._classname : this._getElementClassName();
                    nexacro.__setElementHandleCSSClassName(handle, classname);

                    // render
                    this._refreshControl(handle);

                    if (this._hittest_type)
                        nexacro.__setElementHittestValue(handle, this._hittest_type);

                    if (this.direction)
                        nexacro.__setElementHandleRtlDirection(handle, this.direction);

                    if (this.mirror)
                        nexacro.__setElementHandleMirror(handle, this.mirror);

                    nexacro.__appendElementHandle((this._is_nc_element) ? owner_elem.handle : owner_elem.dest_handle, handle);

                    if (!this._is_simple_control)
                    {
                        var inner_node = nexacro.__createContainerElementHandle(this, win_handle, this.client_left, this.client_top, this.client_width, this.client_height);
                        this.dest_handle = inner_node;
                        nexacro.__setElementHandleCSSClassName(inner_node, "nexasimplecontainer");
                        nexacro.__appendElementHandle(handle, inner_node);
                    }
                }
            }
            else   //for is_popup
            {
                if (!this.handle)
                {
                    var linkedcontrol = this.linkedcontrol;

                    // if parent is Window	                
                    var win_handle = win.handle;
                    var owner_elem = win;

                    var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    nexacro.__setElementHandleId(handle, this.name);

                    nexacro.__setElementHandleIsControl(handle, this._is_control);
                    nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;

                    this._refreshControl(handle);
                    if (this._hittest_type)
                        nexacro.__setElementHittestValue(handle, this._hittest_type);

                    if (this.direction)
                        nexacro.__setElementHandleRtlDirection(handle, this.direction);

                    if (this.mirror)
                        nexacro.__setElementHandleMirror(handle, this.mirror);

                    if (linkedcontrol._findOwnerElementHandle)
                    {
                        var owner_elem_info = linkedcontrol._findOwnerElementHandle();
                        if (owner_elem_info.is_append)
                        {
                            nexacro.__appendElementHandle(owner_elem_info.owner_handle, handle);
                        }
                        else
                        {
                            // TODO Runtime버젼 미구현!!!!
                            nexacro.__insertElementHandle(owner_elem_info.owner_handle, handle, owner_elem_info.ref_handle);
                        }

                        this.owner_elem = owner_elem_info.owner_handle._linked_element;
                    }
                    else
                    {
                        nexacro.__appendElementHandle(win_handle, handle);
                        this.owner_elem = owner_elem;
                    }
                }
            }
        };

        _pControlElement.createCommandStart = function ()
        {
            return "";
        };
        //_pControlElement.createCommandEnd = function ()
        //{
        //};

        //_pControlElement.attachHandle = function (win)
        //{
        //};

        _pControlElement._on_destroy = nexacro._emptyFn;
        _pControlElement.destroy = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var owner_handle = null;   // unlink 인 경우 owner_elem이 null이다.	           
                if (this.owner_elem)
                    owner_handle = this.owner_elem.dest_handle;

                if (!this.owner_elem || owner_handle)
                    nexacro.__destroyElementHandle(owner_handle, handle);

                if (!this._is_simple_control)
                {
                	nexacro.__destroyElementHandle(handle, this.dest_handle);
                    this.dest_handle = null;
                }

                this.owner_elem = null;

                if (this._client_elem)
                {
                    this._client_elem.destroy();
                    this._client_elem = null;
                }

                this._on_destroy();

            }

            this.handle = null;
            this.parent = null;
            this.parent_elem = null;
            this.linkedcontrol = null;
        };

        _pControlElement._on_clearContents = nexacro._emptyFn;
        _pControlElement.clearContents = function ()
        {
            if (this.handle && this._client_elem)
            {
                // destroy handle of client element : keep parent relation
                this._client_elem.clearContents();
                this._on_clearContents();
            }
        };


        // control common functions
        _pControlElement.setLinkedControl = function (control)
        {
            if (!this.linkedcontrol && control)
            {
                this.parent = control;
                this.linkedcontrol = control;
                this.id = control.id;
                this._apply_client_padding = control._apply_client_padding;
                this._is_simple_control = control._is_simple_control;
                this._is_popup = control._is_popup_control;

                this.name = control._unique_id;
                this._is_control = control._is_subcontrol;   //for css class search
            }
        };

        _pControlElement.setElementPositionStep = function (position_step)
        {
            if (this.position_step != position_step || position_step == -1)
            {
                this.position_step = position_step;

                var handle = this.handle;
                if (handle && this.parent_elem)
                {
                    var oldowner_elem = this.owner_elem;
                    var owner_elem = this.parent_elem.getContainerElement(position_step);
                    if (oldowner_elem && oldowner_elem.dest_handle && owner_elem && owner_elem.dest_handle)
                    {
                        nexacro.__unlinkElementHandle(oldowner_elem.dest_handle, handle);
                        nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
                        this.owner_elem = owner_elem;
                    }
                }
            }
        };

        //////////////////////////////////////////////////////////////////////////
    	// supported for same window
        // 
        _pControlElement.appendChildElement = function (elem)
        {
            if (this.handle)
            {
                if (elem.parent_elem != this)
                {
					elem.parent_elem = this;
/*
                    if (elem.handle)
                    {
						elem.parent_elem = this;

                        var old_win_handle = elem._getRootWindowHandle();
                        var new_win_handle = this.getContainerElement(this.position_step)._getRootWindowHandle();
                        if (old_win_handle != new_win_handle)   // 
                        {
                            elem.parent_elem = this;
                            // for recreate Child Element Handle
                            elem._destroyElementHandle();
                        }
                        else
                        {
                            elem.parent_elem = this;
                        }
                    }
                    else
                    {
                        elem.parent_elem = this;
                    }
*/
                }

                // if child element is not created ==> create child handle
                if (!elem.handle)
                {
                    elem.create(this._getWindow());
                }
                else
                {
                    //elem._appendToContainer(this._client_elem);
                    elem._appendToContainer(this.getContainerElement(elem.position_step));
                }
            }
        };

        _pControlElement.removeChildElement = function (elem)
        {
            // this child element is client element
            if (elem.parent_elem == this)
            {
                elem._removeFromContainer();
            }
        };

        _pControlElement._getComputedStyle = function (prop)
        {
        	if (this.handle && prop)
        	{
                var computedstyle = nexacro.__getElementHandleStyleValue(this.handle, prop);
        		return computedstyle;
			}	
        };

        _pControlElement._getComputedStyleBackground = function ()
        {
            if (this.handle)
                return nexacro.__getElementHandleStyleValue(this.handle, "background");
        };

        _pControlElement._sendToBackElement = function (elem)
        {
            if (elem && elem.owner_elem.dest_handle == this.dest_handle && elem.handle)
            {
                nexacro.__setElementHandleSendToBack(elem.handle);
            }
        };

        _pControlElement._bringToFrontElement = function (elem)
        {
            if (elem && elem.owner_elem.dest_handle == this.dest_handle && elem.handle)
            {
                nexacro.__setElementHandleBringToFront(elem.handle);
            }
        };

        _pControlElement._moveToNextElement = function (elem, base_elem)
        {
            if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle)
            {
                nexacro.__setElementHandleMoveToNext(elem.handle, base_elem.handle);
            }            
        };

        _pControlElement._moveToPrevElement = function (elem, base_elem)
        {
            if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle)
            {
                nexacro.__setElementHandleMoveToPrev(elem.handle, base_elem.handle);
            }
        };

        _pControlElement.sendToBackElement = function (elem)
        {
            var client_elem = this.getContainerElement(elem.position_step);
            client_elem._sendToBackElement(elem);
        };

        _pControlElement.bringToFrontElement = function (elem)
        {
            var client_elem = this.getContainerElement(elem.position_step);
            client_elem._bringToFrontElement(elem);
        };

        _pControlElement.moveToNextElement = function (elem, base_elem)
        {
            var client_elem = this.getContainerElement(elem.position_step);
            client_elem._moveToNextElement(elem, base_elem);
        };

        _pControlElement.moveToPrevElement = function (elem, base_elem)
        {
            var client_elem = this.getContainerElement(elem.position_step);
            client_elem._moveToPrevElement(elem, base_elem);
        };

        _pControlElement.saveToImageFile = function (filename, filetype, compressoption)
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__saveToImageFile(handle, filename, filetype, compressoption);
            }
        };

        _pControlElement.saveToImageObject = function ()
        {
            var handle = this.handle;
            if (handle && this.parent_elem)
            {
                return nexacro.__saveToImageObject(handle);
            }
        };

        _pControlElement._setElementHScrollPos = function (hpos)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleHScrollPos(handle, hpos);
            }
        };

        _pControlElement._setElementVScrollPos = function (vpos)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleVScrollPos(handle, vpos);
            }
        };

        _pControlElement._setElementScrollPos = function (hpos, vpos)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleOffset(_handle, hpos, vpos);
            }
        };

        //_pControlElement.setElementHScrollPos = function (hpos)
        //{
        //    this.getContainerElement(this.position_step)._setElementHScrollPos(hpos);
        //};
        //_pControlElement.setElementVScrollPos = function (vpos)
        //{
        //    this.getContainerElement(this.position_step)._setElementVScrollPos(vpos);
        //};
        //_pControlElement.setElementScrollPos = function (hpos, vpos)
        //{
        //    this.getContainerElement(this.position_step)._setElementScrollPos(hpos, vpos);
        //};

        _pControlElement.setElementHScrollPos = function (hpos)
        {
            if (hpos < 0) hpos = 0;
            if (hpos > this.hscroll_limit)
            {
                hpos = this.hscroll_limit;
            }

            if (this.scroll_left != hpos)
            {
                this.scroll_left = hpos;
                if (this._client_elem._use_translate_scroll)
                {
                    //this.getContainerElement(this.position_step)._setElementHScrollPos(hpos);
                    this._client_elem._setElementHScrollPos(hpos);
                }

                if (this.linkedcontrol)
                {
                    this.linkedcontrol._setHscrollPos(hpos);
                }
            }
        };

        _pControlElement.setElementVScrollPos = function (vpos)
        {
            if (vpos < 0) vpos = 0;
            if (vpos > this.vscroll_limit)
            {
                vpos = this.vscroll_limit;
            }
            if (this.scroll_top != vpos)
            {
                this.scroll_top = vpos;
                if (this._client_elem._use_translate_scroll)
                {
                    this.getContainerElement(this._step_index)._setElementVScrollPos(vpos);
                }

                if (this.linkedcontrol)
                {
                    this.linkedcontrol._setVscrollPos(vpos);
                }
            }
        };

        _pControlElement.setElementScrollPos = function (hpos, vpos)
        {
            if (hpos < 0) hpos = 0;
            if (vpos < 0) vpos = 0;
            if (hpos > this.hscroll_limit)
            {
                hpos = this.hscroll_limit;
            }
            if (vpos > this.vscroll_limit)
            {
                vpos = this.vscroll_limit;
            }

            if (this.scroll_left != hpos || this.scroll_top != vpos)
            {
                this.scroll_left = hpos;
                this.scroll_top = vpos;
                if (this._client_elem._use_translate_scroll)
                {
                    this.getContainerElement(this._step_index)._setElementScrollPos(hpos, vpos);
                }

                /*
                if (this._hscroll_control)
                {
                    this._hscroll_control._setScrollPos(this.scroll_left);
                }
                if (this._vscroll_control)
                {
                    this._vscroll_control._setScrollPos(this.scroll_top);
                }
                */
            }
        };

        //////////////////////////////////////////////////////////////////////////
        //_pControlElement.setElementTypeCSSSelector = function (typename)
        //{
        //    if (this.typeselector != typename)
        //    {
        //        this.typeselector = typename;
        //        var handle = this.handle;
        //        if (handle)
        //        {
        //            var classname = this._getElementClassName();
        //            if (this._classname != clsssname)
        //            {
        //                this._classname = classname;
        //                nexacro.__setElementHandleCSSClassName(handle, classname);
        //            }
        //        }
        //    }
        //};

        //_pControlElement.setElementClassCSSSelector = function (classname)
        //{
        //    if (this.classselector != classname)
        //    {
        //        this.classselector = classname;
        //        if (classname)
        //        {
        //            var handle = this.handle;
        //            if (handle)
        //            {
        //                var classname = this._getElementClassName();
        //                if (this._classname != clsssname)
        //                {
        //                    this._classname = classname;
        //                    nexacro.__setElementHandleCSSClassName(handle, classname);
        //                }
        //            }
        //        }
        //    }
        //};

        _pControlElement.setElementIDCSSSelector = function (id)
        {
            if (this.idselector != id)
            {
                this.idselector = id;

                var handle = this.handle;
                if (handle)
                {
                    classname = this._getElementClassName();
                    if (this._classname != classname)
                    {
                        this._classname = classname;
                        nexacro.__setElementHandleCSSClassName(handle, classname);
                    }
                }
            }
        };

        _pControlElement.setElementCSSMapInfo = function (border, padding, edge)
        {
            var change_border = false, change_padding = false, change_edge = false;
            if (this._border_info != border)
            {
                this._border_info = border;
                change_border = (this.border == null);
            }

            if (this._padding_info != padding)
            {
                this._padding_info = padding;
                change_padding = (this.padding == null);
            }

            var handle = this.handle;
            var change_inner = (change_border && this._updateInnerSize());
            if (handle)
            {
                if (change_inner || change_padding)
                {
                    this._updateClientRect();
                }
            }
        };

        //_pControlElement.setElementEnable = function (enable)
        //{
        //    if (this.enable != enable)
        //    {
        //        this.enable = enable;
        //        var handle = this.handle;
        //        if (handle)
        //        {
        //            nexacro.__setElementHandleEnable(handle, enable);
        //        }
        //    }
        //};

        //_pControlElement.setElementTabIndex = function (tabindex)
        //{
        //    if (this.tabindex != tabindex)
        //    {
        //        this.tabindex = tabindex;
        //        var handle = this.handle;
        //        if (handle)
        //        {
        //            nexacro.__setElementHandleTabIndex(handle, tabindex);
        //        }
        //    }
        //};

        _pControlElement.setElementZIndex = function (zindex)
        {
            if (this.zindex != zindex)
            {
                this.zindex = zindex;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleZindex(handle, zindex);
                }
            }
        };

        _pControlElement.setElementToolTip = function (tooltiptext, tooltiptype)
        {
            if (tooltiptext === undefined) tooltiptext = "";
            if (this.tooltiptext != tooltiptext || this.tooltiptype != tooltiptype)
            {
                this.tooltiptext = tooltiptext;
                this.tooltiptype = tooltiptype;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleToolTip(handle, tooltiptext, tooltiptype);
                }
            }
        };

        _pControlElement.setElementFocus = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleFocus(handle);
                nexacro.__setLastFocusedElement(this);
            }
        };

        // override functions
        _pControlElement.setElementSize = function (width, height)
        {
            this.width = width;
            this.height = height;

            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleSize(handle, width, height);
            }
        };

        _pControlElement.setElementBorderRadius = function (borderradius)
        {
            this.borderRadius = borderradius;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderRadiusObject(handle, borderradius);
            }
        };

        _pControlElement.setElementBorder = function (border)
        {
            // update Border
            this.border = border;

            // Check New Architecture
            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderObject(handle, border);
            }
        };

        //borderleft = true/false
        _pControlElement.setElementBorderLeftNone = function (borderleft)
        {
            // update Border
            this.borderLeftNone = borderleft;
            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderLeftNone(handle, borderleft);
            }
        };

        //bordertop = true/false
        _pControlElement.setElementBorderTopNone = function (bordertop)
        {
            // update Border
            this.borderTopNone = bordertop;
            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderTopNone(handle, bordertop);
            }
        };

        //borderright = true/false
        _pControlElement.setElementBorderRightNone = function (borderright)
        {
            // update Border
            this.borderRightNone = borderright;
            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderRightNone(handle, borderright);
            }
        };

        //borderbottom = true/false
        _pControlElement.setElementBorderBottomNone = function (borderbottom)
        {
            // update Border
            this.borderBottomNone = borderbottom;
            if (this._updateInnerSize())
            {
                this._updateClientRect();
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleBorderBottomNone(handle, borderbottom);
            }
        };

        _pControlElement.setElementBorderNone = function (borderleft, bordertop, borderright, borderbottom)
        {
            this.borderLeftNone = borderleft;
            if (this.handle)
            	nexacro.__setElementHandleBorderLeftNone(this.handle, borderleft);

            this.borderTopNone = bordertop;
            if (this.handle)
            	nexacro.__setElementHandleBorderTopNone(this.handle, bordertop);

            this.borderRightNone = borderright;
            if (this.handle)
            	nexacro.__setElementHandleBorderRightNone(this.handle, borderright);

            this.borderBottomNone = borderbottom;
            if (this.handle)
            	nexacro.__setElementHandleBorderBottomNone(this.handle, borderbottom);

            if (this._updateInnerSize())
            {
                this._updateClientRect();

                if (this._edge_elem)
                {
                    this._edge_elem.setElementSize(this.inner_width, this.inner_height);
                }
            }
        };

        _pControlElement.setElementBackground = function (background)
        {
            // update Background Color
            this.background = background;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleBackgroundObject(handle, background);
        };

        _pControlElement.setElementEdge = function (edge)
        {
            this.edge = edge;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleEdgeImageObject(handle, edge);
        };



        // override functions
        _pControlElement.setElementPadding = function (padding)
        {
            this.padding = padding;

            if (this._apply_client_padding)
            {
                this._updateClientRect();

              /*  var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandlePaddingObject(handle, padding);
			 */
            }
        };

        _pControlElement._updateClientRect = function ()
        {
            var ret = this._on_updateClientRect();            
            if (ret & 1)
                this._on_change_clientPos(this.client_left, this.client_top);
            if (ret & 2)
                this._on_change_clientSize(this.client_width, this.client_height);
        };

        _pControlElement.setElementCursor = function (cursor)
        {
            this.cursor = cursor;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleCursorObject(handle, cursor);
        };

        // override functions
        _pControlElement.setElementOpacity = function (opacity)
        {
            this.opacity = opacity;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleOpacityObject(handle, opacity);
        };


        _pControlElement.setElementBoxShadow = function (boxshadow)
        {
            this.boxShadow = boxshadow;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleShadowObject(handle, boxshadow);
        };

        _pControlElement.setElementZoom = function (zoomfactor)
        {
            var handle = this.handle;
            if (handle)
            {
                if (zoomfactor < 0) zoomfactor = 0;
                this.zoom = zoomfactor;
                nexacro.__setElementHandleScale(handle, zoomfactor);
            }
        };

        _pControlElement.setElementDisplay = function (display)
        {
            if (this.display != display)
            {
                this.display = display;
                var handle = this.handle;
                if (handle )
                {
                	if (display == "none")
                		nexacro.__setElementHandleVisible(handle, false);
                	else
                		nexacro.__setElementHandleVisible(handle, true);
                }
            }
        };



        //simplecontrol : true/false 
        _pControlElement.setElementSimpleControl = function (simplecontrol)
        {
            if (this._is_simple_control != simplecontrol)
            {
                var handle = this.handle;
                if (handle)
                {
                    if (!this._is_simple_control)
                    {
                        nexacro.__destroyElementHandle(handle, this.dest_handle);
                        this.dest_handle = handle;
                    }
                    else  //simple
                    {
                        var owner_elem = this.owner_elem;
                        var win_handle = owner_elem._getRootWindowHandle();

                        var inner_node = nexacro.__createContainerElementHandle(this, win_handle, this.client_left, this.client_top, this.client_width, this.client_height);
                        this.dest_handle = inner_node;
                        nexacro.__setElementHandleCSSClassName(inner_node, "nexasimplecontainer");
                        nexacro.__appendElementHandle(handle, inner_node);
                    }
                }
                this._is_simple_control = simplecontrol;
            }
        };

        _pControlElement.setElementHittestType = function (httype)
        {
            if (this._hittest_type != httype)
            {
                this._hittest_type = httype;
                if (this.handle)
                {
                    nexacro.__setElementHittestValue(this.handle, httype);
                }
            }
        };

        _pControlElement.getClientLeft = function ()
        {
        	if (this._apply_client_padding && !this._is_simple_control)
        	{
        		return 0;
        	}
        	return this.client_left;
        };

        _pControlElement.getClientTop = function ()
        {
        	if (this._apply_client_padding && !this._is_simple_control)
        	{
        		return 0;
        	}
        	return this.client_top;
        };

        _pControlElement.getClientWidth = function ()
	{
	    return this.client_width;
	};

	_pControlElement.getClientHeight = function ()
	{
	    return this.client_height;
	};
        // role - component role
        _pControlElement.setElementAccessibilityRole = function (role)
        {
            var accrole = nexacro._roleList[role];
            if (this.accessibilityrole != accrole)
            {
                this.accessibilityrole = accrole;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityRole(handle, accrole);
            }
        };

        _pControlElement.setElementAccessibilityLabel = function (label)
        {
            if (this.accessibilitylabel != label)
            {
                this.accessibilitylabel = label;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityLabel(handle, label);
            }
        };

        _pControlElement.setElementAccessibilityEnable = function (enable)
        {
            if (this.accessibilityenable != enable)
            {
                this.accessibilityenable = enable;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityEnable(handle, enable);
            }
        };

        _pControlElement.setElementAccessibilityDescription = function (desc)
        {
            if (this.accessibilitydescription != desc)
            {
                this.accessibilitydescription = desc;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityDescription(handle, desc);
            }
        };



        _pControlElement.setElementAccessibilityDescLevel = function (desclevel)
        {
            if (this.accessibilitydesclevel != desclevel)
            {
                this.accessibilitydesclevel = desclevel;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityDescLevel(handle, desclevel);
            }
        };

        _pControlElement.setElementAccessibilityAction = function (action)
        {
            if (this.accessibilityaction != action)
            {
                this.accessibilityaction = action;
                //Todo
            }

        };

        _pControlElement.setElementAccessibilityValue = function (value)
        {
        };

        _pControlElement.setElementAccessibilityStatDisabled = function (disabled)
        {
            if (this.accessibility_stat_disabled != disabled)
            {
                this.accessibility_stat_disabled = disabled;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatDisabled(handle, disabled);
            }
        };

        _pControlElement.setElementAccessibilityStatHidden = function (hidden)
        {
            if (this.accessibility_stat_hidden != hidden)
            {
                this.accessibility_stat_hidden = hidden;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatHidden(handle, hidden);
            }
        };

        _pControlElement.setElementAccessibilityStatChecked = function (checked)
        {
            if (this.accessibility_stat_checked != checked)
            {
                this.accessibility_stat_checked = checked;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatChecked(handle, checked);
            }
        };

        _pControlElement.setElementAccessibilityStatPressed = function (pressed)
        {
            if (this.accessibility_stat_pressed != pressed)
            {
                this.accessibility_stat_pressed = pressed;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatPressed(handle, pressed);
            }
        };

        _pControlElement.setElementAccessibilityStatSelected = function (selected)
        {
            if (this.accessibility_stat_selected != selected)
            {
                this.accessibility_stat_selected = selected;
                var handle = this.handle;
                if (handle)
                {
                    nexacro.__setElementHandleAccessibilityStatSelected(handle, selected);
                }
            }
        };

        _pControlElement.setElementAccessibilityStatExpanded = function (expanded)
        {
            if (this.accessibility_stat_expanded != expanded)
            {
                this.accessibility_stat_expanded = expanded;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatExpanded(handle, expanded);
            }
        };

        _pControlElement.setElementAccessibilityStatAutoComplete = function (autocomplete)
        {
            // autocomplete for html
            //if (this.accessibility_stat_autocomplete != autocomplete)
            //{
            //    this.accessibility_stat_autocomplete = autocomplete;
            //    var handle = this.handle;
            //    if (handle)
            //        nexacro.__setElementHandleAccessibilityStatAutoComplete(handle, autocomplete);
            //}
        };

        _pControlElement.setElementAccessibilityFlagHasPopup = function (haspopup)
        {
            if (this.accessibility_flag_haspopup != haspopup)
            {
                this.accessibility_flag_haspopup = haspopup;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatHasPopup(handle, haspopup);
            }
        };

        _pControlElement.setElementAccessibilityFlagFocusable = function (focusable)
        {
            if (this.accessibility_flag_focusable != focusable)
            {
                this.accessibility_flag_focusable = focusable;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagFocusable(handle, focusable);
            }
        };

        _pControlElement.setElementAccessibilityFlagReadOnly = function (readonly)
        {
            if (this.accessibility_flag_readonly != readonly)
            {
                this.accessibility_flag_readonly = readonly;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagReadOnly(handle, readonly);
            }
        };

        _pControlElement.setElementAccessibilityFlagPassword = function (password)
        {
            if (this.accessibility_flag_password != password)
            {
                this.accessibility_flag_password = password;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagPassword(handle, password);
            }
        };

        _pControlElement.setElementAccessibilityFlagMultiSelectable = function (multiselectable)
        {
            if (this.accessibility_flag_multiselectable != multiselectable)
            {
                this.accessibility_flag_multiselectable = multiselectable;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagMultiSelectable(handle, multiselectable);
            }
        };

        _pControlElement.setElementAccessibilityFlagSelectable = function (selectable)
        {
            if (this.accessibility_flag_selectable != selectable)
            {
                this.accessibility_flag_selectable = selectable;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagSelectable(handle, selectable);
            }
        };

        _pControlElement.setElementAccessibilityFlagDefaultButton = function (defaultbutton)
        {
            if (this.accessibility_flag_defaultbutton != defaultbutton)
            {
                this.accessibility_flag_defaultbutton = defaultbutton;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityStatDefaultButton(handle, defaultbutton);
            }
        };

        _pControlElement.setElementAccessibilityFlagMultiLine = function (multiline)
        {
            if (this.accessibility_flag_multiline != multiline)
            {
                this.accessibility_flag_multiline = multiline;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityFlagMultiLine(handle, multiline);
            }
        };

        _pControlElement.setElementAccessibilityInfoCount = function (count)
        {
            if (this.accessibility_prop_infocount != count)
            {
                this.accessibility_prop_infocount = count;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoCount(handle, count);
            }
        };

        _pControlElement.setElementAccessibilityInfoIndex = function (index)
        {
            if (this.accessibility_prop_infoindex != index)
            {
                this.accessibility_prop_infoindex = index;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoIndex(handle, index);
            }
        };

        _pControlElement.setElementAccessibilityInfoValueMax = function (valuemax)
        {
            if (this.accessibility_prop_infovaluemax != valuemax)
            {
                this.accessibility_prop_infovaluemax = valuemax;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoValueMax(handle, valuemax);
            }
        };

        _pControlElement.setElementAccessibilityInfoValueMin = function (valuemin)
        {
            if (this.accessibility_prop_infovaluemin != valuemin)
            {
                this.accessibility_prop_infovaluemin = valuemin;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoValueMin(handle, valuemin);
            }
        };

        _pControlElement.setElementAccessibilityInfoValueCur = function (valuecur)
        {
            if (this.accessibility_prop_infovaluecur != valuecur)
            {
                this.accessibility_prop_infovaluecur = valuecur;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoValueCur(handle, valuecur);
            }
        };

        _pControlElement.setElementAccessibilityInfoLevel = function (level)
        {
            if (this.accessibility_prop_infolevel != level)
            {
                this.accessibility_prop_infolevel = level;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityInfoLevel(handle, level);
            }
        };

        _pControlElement.setElementAccessibilityHotKey = function (hotkey)
        {
            if (this.accessibility_prop_hotkey != hotkey)
            {
                this.accessibility_prop_hotkey = hotkey;
                var handle = this.handle;
                if (handle)
                    nexacro.__setElementHandleAccessibilityHotKey(handle, hotkey);
            }
        };

        _pControlElement.setElementAccessibilityActiveDescendant = function (activedescendant_elem)
        {
            this.accessibility_prop_activedescendant = activedescendant_elem.linkedcontrol._unique_id;
            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleAccessibilityActiveDescendant(handle, activedescendant_elem.linkedcontrol._unique_id);
        };

        _pControlElement.setElementAccessibilityStatFocus = function (label)
        {
            var notifyvalue;
            if (label)
                notifyvalue = label;
            else
            {
                var readlabel = this._makeAccessibilityLabelbyReadtype(this);
                this.accessibilityreadlabel = readlabel;
                notifyvalue = readlabel;
            }

            var handle = this.handle;
            if (handle)
            {
                nexacro.__notifyAccessibility(handle, notifyvalue, "focus");
            }
        };

        _pControlElement.notifyAccessibility = function (label, notifyevent)
        {
            var handle = this.handle;
            if (handle)
            {
                var readlabel = this._makeAccessibilityLabelbyReadtype(this);
                this.accessibilityreadlabel = readlabel;
                nexacro.__notifyAccessibility(handle, label ? label : this.accessibilityreadlabel, notifyevent ? notifyevent : "notify");
            }
        };

        _pControlElement._refreshControl = function (handle)
        {
            // cursor, tooltip		    
            //if (!this.enable)
            //{
            //    nexacro.__setElementHandleEnable(handle, false);
            //}
            if (this.tabindex >= -1)
            {
                nexacro.__setElementHandleTabIndex(handle, this.tabindex);
            }
            if (this.tooltiptext)
            {
                nexacro.__setElementHandleToolTip(handle, this.tooltiptext, this.tooltiptype);
            }
            if (this.zindex >= 0)
            {
                nexacro.__setElementHandleZindex(handle, this.zindex);
            }

            this._refreshCommonStyleProps(handle);

            if (this.borderRadius)
                nexacro.__setElementHandleBorderRadiusObject(handle, this.borderRadius);
            
            if (this.border)
                nexacro.__setElementHandleBorderObject(handle, this.border);

            if (this.borderLeftNone)
                nexacro.__setElementHandleBorderLeftNone(handle, this.borderLeftNone);

            if (this.borderTopNone)
                nexacro.__setElementHandleBorderTopNone(handle, this.borderTopNone);

            if (this.borderRightNone)
                nexacro.__setElementHandleBorderRightNone(handle, this.borderRightNone);

            if (this.borderBottomNone)
                nexacro.__setElementHandleBorderBottomNone(handle, this.borderBottomNone);

            if (this.background)
                nexacro.__setElementHandleBackgroundObject(handle, this.background);

            if (this.padding)
                nexacro.__setElementHandlePaddingObject(handle, this.padding);

            if (this.cursor)
                nexacro.__setElementHandleCursorObject(handle, this.cursor);

            if (this.opacity)
                nexacro.__setElementHandleOpacityObject(handle, this.opacity);

            if (this.boxShadow)
                nexacro.__setElementHandleShadowObject(handle, this.boxShadow);

            if (this.edge)
                nexacro.__setElementHandleEdgeImageObject(handle, this.edge);

            if (this.status)
                nexacro.__setElementHandleStatus(handle, this.status);

            if (this.userstatus)
                nexacro.__setElementHandleUserStatus(handle, this.userstatus);

            this._refreshAccessibilityInfo(handle);

        };

        _pControlElement._refreshAccessibilityInfo = function (handle)
        {
            if (nexacro._enableaccessibility)
            {
                if (this.accessibilityrole)
                {
                    nexacro.__setElementHandleAccessibilityRole(handle, this.accessibilityrole);
                }

                if (this.accessibilityenable)
                {
                    if (this.accessibilityenable)
                        nexacro.__setElementHandleAccessibilityEnable(handle, this.accessibilityenable);
                    if (this.accessibilitydesclevel)
                        nexacro.__setElementHandleAccessibilityDescLevel(handle, this.accessibilitydesclevel);
                    if (this.accessibilitydescription)
                        nexacro.__setElementHandleAccessibilityDescription(handle, this.accessibilitydescription);
                    var readlabel = this._makeAccessibilityLabelbyReadtype(this);
                    if (readlabel != this.accessibilityreadlabel)
                    {
                        this.accessibilityreadlabel = readlabel;
                        nexacro.__setElementHandleAccessibilityLabel(handle, this.accessibilityreadlabel);
                    }
                }
                else
                {
                    nexacro.__setElementHandleAccessibilityEnable(handle, this.accessibilityenable);
                }

                if (this.accessibility_stat_disabled)
                    nexacro.__setElementHandleAccessibilityStatDisabled(handle, this.accessibility_stat_disabled);
                if (this.accessibility_stat_hidden)
                    nexacro.__setElementHandleAccessibilityStatHidden(handle, this.accessibility_stat_hidden);
                if (this.accessibility_stat_checked)
                    nexacro.__setElementHandleAccessibilityStatChecked(handle, this.accessibility_stat_checked);

                if (this.accessibility_stat_pressed)
                    nexacro.__setElementHandleAccessibilityStatPressed(handle, this.accessibility_stat_pressed);
                if (this.accessibility_stat_selected)
                    nexacro.__setElementHandleAccessibilityStatSelected(handle, this.accessibility_stat_selected);
                if (this.accessibility_stat_expanded)
                    nexacro.__setElementHandleAccessibilityStatExpanded(handle, this.accessibility_stat_expanded);
                //if (this.accessibility_stat_autocomplete)
                //    nexacro.__setElementHandleAccessibilityStatAutoComplete(handle, this.accessibility_stat_autocomplete);

                if (this.accessibility_flag_haspopup)
                    nexacro.__setElementHandleAccessibilityStatHasPopup(handle, this.accessibility_flag_haspopup);
                if (this.accessibility_flag_focusable)
                    nexacro.__setElementHandleAccessibilityFlagFocusable(handle, this.accessibility_flag_focusable);
                if (this.accessibility_flag_readonly)
                    nexacro.__setElementHandleAccessibilityFlagReadOnly(handle, this.accessibility_flag_readonly);

                if (this.accessibility_flag_password)
                    nexacro.__setElementHandleAccessibilityFlagPassword(handle, this.accessibility_flag_password);
                if (this.accessibility_flag_multiselectable)
                    nexacro.__setElementHandleAccessibilityFlagMultiSelectable(handle, this.accessibility_flag_multiselectable);
                if (this.accessibility_flag_selectable)
                    nexacro.__setElementHandleAccessibilityFlagSelectable(handle, this.accessibility_flag_selectable);
                if (this.accessibility_flag_defaultbutton)
                    nexacro.__setElementHandleAccessibilityStatDefaultButton(handle, this.accessibility_flag_defaultbutton);

                if (this.accessibility_flag_multiline)
                    nexacro.__setElementHandleAccessibilityFlagMultiLine(handle, this.accessibility_flag_multiline);

                if (this.accessibility_prop_hotkey)
                    nexacro.__setElementHandleAccessibilityHotKey(handle, this.accessibility_prop_hotkey);

                if (this.accessibility_prop_itemcount)
                    nexacro.__setElementHandleAccessibilityInfoCount(handle, this.accessibility_prop_itemcount);
                if (this.accessibility_prop_itemindex)
                    nexacro.__setElementHandleAccessibilityInfoIndex(handle, this.accessibility_prop_itemindex);

                if (this.accessibility_prop_valuemax)
                    nexacro.__setElementHandleAccessibilityInfoValueMax(handle, this.accessibility_prop_valuemax);
                if (this.accessibility_prop_valuemin)
                    nexacro.__setElementHandleAccessibilityInfoValueMin(handle, this.accessibility_prop_valuemin);
            }
        };

        _pControlElement.getElementScrollWidth = function ()
        {
            return this.inner_width;
        };
        _pControlElement.getElementScrollHeight = function ()
        {
            return this.inner_height;
        };


        //======================================================================
        // _pControlElement's Platform Methods
        //======================================================================
        _pControlElement._updateInnerSize = function ()
        {
            var inner_width = this.width;
            var inner_height = this.height;

            var border = this.border ? this.border : this._border_info;
            if (border)
            {
                // adjust width/height
                var borderleft = border.left ? border.left._width : 0;
                var borderright = border.right ? border.right._width : 0;
                var bordertop = border.top ? border.top._width : 0;
                var borderbottom = border.bottom ? border.bottom._width : 0;

                if (this.borderLeftNone) borderleft = 0;
                if (this.borderRightNone) borderright = 0;
                if (this.borderTopNone) bordertop = 0;
                if (this.borderBottomNone) borderbottom = 0;

                inner_width -= (borderleft + borderright);
                inner_height -= (bordertop + borderbottom);

                if (inner_width < 0) inner_width = 0;
                if (inner_height < 0) inner_height = 0;
            }

            if (this.inner_width != inner_width || this.inner_height != inner_height)
            {
                this.inner_width = inner_width; 
                this.inner_height = inner_height;
                return true;
            }
            return false;
        };

        _pControlElement._on_updateClientRect = function ()
        {
            var ret = 0;

            if (this._apply_client_padding)
            {
                var client_left = 0;
                var client_top = 0;
                var client_width = this.inner_width;
                var client_height = this.inner_height;

                var padding = (this.padding || this._padding_info);
                if (padding)
                {
                    client_left = padding.left;
                    client_top = padding.top;
                    client_width -= padding.left + padding.right;
                    client_height -= padding.top + padding.bottom;
                }

                if (this.client_left != client_left || this.client_top != client_top)
                {
                    this.client_left = client_left;
                    this.client_top = client_top;
                    ret = 1;
                }
                if (this.client_width != client_width || this.client_height != client_height)
                {
                    this.client_width = client_width;
                    this.client_height = client_height;
                    ret += 2;
                }
            }
            else
            {
                if (this.client_width != this.inner_width || this.client_height != this.inner_height)
                {
                    this.client_width = this.inner_width;
                    this.client_height = this.inner_height;
                    ret += 2;
                }
            }
            return ret;
        };

        _pControlElement._on_change_clientPos = function (left, top)
        {
        	var notify = false;

        	var client_elem = this._client_elem;
        	if (client_elem)
        	{
        		client_elem.setElementPosition(left, top);
        	}
            else if (this._apply_client_padding)
            {
            	if (this.handle && this.handle != this.dest_handle)
            	{
            		var dest_handle = this.dest_handle;
            		nexacro.__setElementHandlePosition(dest_handle, left, top);
            	}
            	else
            		notify = true;
            }

            var control = this.linkedcontrol;
            if (control && notify)
            {
                control.on_change_containerPos(left, top);
            }
        };

        _pControlElement._on_change_clientSize = function (width, height)
        {
        	var client_elem = this._client_elem;
        	if (client_elem)
        	{
        		client_elem.setElementSize(width, height);
        	}
        	else if (this._apply_client_padding || !this._is_simple_control)
            {
                if (this.handle && this.handle != this.dest_handle)
                {
                    var dest_handle = this.dest_handle;
                    nexacro.__setElementHandleSize(dest_handle, width, height);
                }
            }

            var control = this.linkedcontrol;
            if (control)
            {
                control.on_change_containerRect(width, height);
            }
        };

        //_pControlElement.setAccessibility = function (accessibility)
        //{
        //    var role = accessibility._role;
        //    var enable = accessibility.enable;
        //    var desclevel = accessibility._desclevel ? accessibility._desclevel : accessibility.desclevel;
        //    var label = (accessibility._label ? accessibility._label : accessibility.label);
        //    var description = accessibility._description ? accessibility._description : accessibility.description;
        //    var action = accessibility._action ? accessibility._action : accessibility.action;

        //    var handle = this.handle;
        //    if (handle)
        //    {
        //        if (role != this.accessibilityrole && role != "none")
        //        {
        //            this.accessibilityrole = role;
        //            nexacro.__setElementHandleAccessibilityRole(handle, role);
        //        }

        //        if (desclevel != this.accessibilitydesclevel)
        //        {
        //            this.accessibilitydesclevel = desclevel;
        //            var nLevel = { "none": 0, "self": 1, "child": 2, "all": 3 };
        //            nexacro.__setElementHandleAccessibilityDescLevel(handle, nLevel[desclevel]);
        //        }

        //        if (enable == true && (desclevel != "none" && desclevel != "child"))
        //        {
        //            if (label != this.accessibilitylabel)
        //            {
        //                this.accessibilitylabel = label;
        //            }
        //            if (description != this.accessibilitydescription)
        //            {
        //                this.accessibilitydescription = description;
        //                nexacro.__setElementHandleAccessibilityDescription(handle, description);
        //            }
        //            if (action != this.accessibilityaction)
        //            {
        //                this.accessibilityaction = action;
        //            }
        //            var readlabel = this._makeAccessibilityLabelbyReadtype();
        //            if (readlabel != this.accessibilityreadlabel)
        //            {
        //                this.accessibilityreadlabel = readlabel;
        //                nexacro.__setElementHandleAccessibilityLabel(handle, readlabel);
        //            }
        //        }
        //        else
        //        {
        //            this.accessibilitylabel = label;
        //            this.accessibilitydescription = description;
        //            nexacro.__setElementHandleAccessibilityEnable(handle, enable);
        //        }
        //        this.accessibilityenable = enable;
        //    }
        //    else
        //    {
        //        this.accessibilityrole = role;
        //        this.accessibilitydesclevel = desclevel;
        //        this.accessibilitylabel = label;
        //        this.accessibilityaction = action;
        //        this.accessibilitydescription = description;
        //        this.accessibilityenable = enable;
        //    }
        //};



        _pControlElement._makeAccessibilityLabelbyReadtype = function ()
        {
            var label = "";
            if (this.accessibilitydesclevel != "none" && this.accessibilitydesclevel != "child")
            {
                if ((nexacro._accessibilitydescreadtype & 0x01) == 0x01)
                {
                    label = nexacro._AccessibilityUtil.getAccessibilityLabel(this);
                }
                if ((nexacro._accessibilitydescreadtype & 0x02) == 0x02 && this.accessibilityaction)
                    label += " " + nexacro._AccessibilityUtil.getAccessibilityAction(this);
                if ((nexacro._accessibilitydescreadtype & 0x04) == 0x04 && this.accessibilitydescription)
                    label += " " + nexacro._AccessibilityUtil.getAccessibilityDescription(this);
                if (nexacro._AccessibilityUtil.getAccessibilityAdditionalLabel)
                    label += " " + nexacro._AccessibilityUtil.getAccessibilityAdditionalLabel(this);
            }
            return label;
        };

        //////////////////////////////////////////////////////////////////////////



        //======================================================================
        // nexacro.FrameControlElement - this Element is Frame ControlElement --> this is simple control element
        //======================================================================
        // this FrameControlElement has ScrollControlElement
        nexacro.FrameControlElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            this._border_elems = new nexacro.Collection();
        };

        var _pFrameControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.FrameControlElement);
        nexacro.FrameControlElement.prototype = _pFrameControlElement;
        // overide nexacro.Object
        _pFrameControlElement._type_name = "FrameControlElement";

        //==== defaule values =========//
        _pFrameControlElement._title_control = null;
        _pFrameControlElement._status_control = null;
        _pFrameControlElement._title_height = 0;
        _pFrameControlElement._status_height = 0;
        _pFrameControlElement._title_top = 0;
        _pFrameControlElement._title_width = 0;
        _pFrameControlElement._status_top = 0;
        _pFrameControlElement._status_width = 0;

        _pFrameControlElement._resizable = false;

        //==== internal handles =========//
        _pFrameControlElement.win_handle = null;  // Window Handle
        //==== default flags =========//
        //==== end of initial =========//

        _pFrameControlElement.create = function (win)
        {
            if (!this.handle)
            {
                if (this.parent_elem == null)
                {
                    // if parent is Window	                
                    var win_handle = this.win_handle = win.handle;
                    this.owner_elem = win;
                    this._is_window_element = true;
                    this.left = 0;
                    this.top = 0;
                    this.width = win.clientWidth;
                    this.height = win.clientHeight;

                    var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    nexacro.__setElementHandleId(handle, this.name);

                    nexacro.__setElementHandleIsControl(handle, this._is_control);
                    nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;
                    nexacro.__appendElementHandle(this.owner_elem.handle, handle);

                    if (!this._is_simple_control)
                    {
                        var inner_node = nexacro.__createContainerElementHandle(this, win_handle, this.client_left, this.client_top, this.client_width, this.client_height);
                        this.dest_handle = inner_node;
                        nexacro.__setElementHandleCSSClassName(inner_node, "nexasimplecontainer");
                        nexacro.__appendElementHandle(handle, inner_node);
                    }

                    // render
                    this._refreshControl(handle);

                    if (this._hittest_type)
                        nexacro.__setElementHittestValue(handle, this._hittest_type);

                    if (this.direction)
                        nexacro.__setElementHandleRtlDirection(handle, this.direction);

                    if (this.mirror)
                        nexacro.__setElementHandleMirror(handle, this.mirror);

                    //container element create
                    // no need set props for child --> only create it
                    // props are already setted to child_elem
                }
                else
                {
                    // parent is always control element
                    var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement();
                    if (owner_elem && owner_elem.handle && !this.handle)
                    {
                        this.owner_elem = owner_elem;
                        var win_handle = win.handle || owner_elem._getRootWindowHandle();
                        var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);

                        nexacro.__setElementHandleId(handle, this.name);
                        nexacro.__setElementHandleIsControl(handle, this._is_control);
                        nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
                        // append TO Parent Element
                        this.handle = this.dest_handle = handle;
                        nexacro.__appendElementHandle(owner_elem.dest_handle, handle);

                        if (!this._is_simple_control)
                        {
                            var inner_node = nexacro.__createContainerElementHandle(this, win_handle, this.client_left, this.client_top, this.client_width, this.client_height);
                            this.dest_handle = inner_node;
                            nexacro.__setElementHandleCSSClassName(inner_node, "nexasimplecontainer");
                            nexacro.__appendElementHandle(handle, inner_node);
                        }

                        // render
                        this._refreshControl(handle);

                        if (this._hittest_type)
                            nexacro.__setElementHittestValue(handle, this._hittest_type);

                        if (this.direction)
                            nexacro.__setElementHandleRtlDirection(handle, this.direction);

                        if (this.mirror)
                            nexacro.__setElementHandleMirror(handle, this.mirror);


                        //container element create
                        // no need set props for child --> only create it
                        // props are already setted to child_elem
                    }
                }

                if (this._resizable)
                {
                    this._createBorderElements();
                    this._updateBorderElementsPosition();
                }
            }
            else
            {
                // frameset에서 빼낸 경우 element는 그대로 존재함.
            }
        };

        _pFrameControlElement._on_destroy = function ()
        {
            this.win_handle = null;
            this._destroyBorderElements();
            this._title_control = null;
            this._status_control = null;
        };

        //_pFrameControlElement.getContainerElement = function ()
        //{
        //    return this;
        //};

        _pFrameControlElement._getRootWindowHandle = function ()
        {
            if (this._is_window_element)
                return this.win_handle;
            else if (this.owner_elem)
                return this.owner_elem._getRootWindowHandle();
            else if (this.parent && this.parent._getRootWindowHandle)
                return this.parent._getRootWindowHandle();
            return null;
        };

        _pFrameControlElement._updateClientRect = function ()
        {
            var ret = this._on_updateClientRect();
            if (ret & 1)
                this._on_change_clientPos(this.client_left, this.client_top);
            if (ret & 2)
                this._on_change_clientSize(this.client_width, this.client_height);

            if (ret)
                this._updateBorderElementsPosition();
        };

        _pFrameControlElement._on_updateClientRect = function ()
        {
            var client_left = 0;
            var client_top = 0;
            var client_width = this.inner_width;
            var client_height = this.inner_height;

            if (this._apply_client_padding)
            {
                var padding = (this.padding || this._padding_info);
                if (padding)
                {
                    client_left = padding.left;
                    client_top = padding.top;
                    client_width -= padding.left + padding.right;
                    client_height -= padding.top + padding.bottom;
                }
            }

            var title_control = this._title_control;
            if (title_control)
            {
                if (!this._is_verticalmin && (this.client_left != client_left || this._title_top != client_top || this._title_width != client_width))
                {
                    this._title_top = client_top;
                    this._title_width = client_width;
                    title_control.move(client_left, client_top, client_width, this._title_height);
                }
                else if (this._is_verticalmin && (this.client_top != client_top || this._title_top != client_top || this._title_height != client_height))
                {
                    this._title_top = client_top;
                    this._title_width = client_width;
                    title_control.move(client_left, client_top, client_width, client_height);
                }
                client_top += this._title_height;
                client_height -= this._title_height;
                if (client_height < 0) client_height = 0;
            }
            else
            {
                this._title_top = client_top;
            }


            // recalc client_top/client_height

            var status_control = this._status_control;
            if (status_control)
            {
                if (this._status_height > 0)
                {
                    client_height -= this._status_height;
                    if (client_height < 0) client_height = 0;
                }
                var status_top = client_top + client_height;
                if (this.client_left != client_left || this._status_top != status_top || this._status_width != client_width)
                {
                    this._status_top = status_top;
                    this._status_width = client_width;
                    status_control.move(client_left, status_top, client_width, this._status_height);
                }
            }
            else
            {
                this._status_top = client_top + client_height;
            }

            var ret = 0;
            if (this.client_left != client_left || this.client_top != client_top)
            {
                this.client_left = client_left;
                this.client_top = client_top;
                ret = 1;
            }
            if (this.client_width != client_width || this.client_height != client_height)
            {
                this.client_width = client_width;
                this.client_height = client_height;
                ret += 2;
            }

            return ret;

        };

        //////////////////////////////////////////////////////////////////////////
        // frame control not apply padding to client_element

        //////////////////////////////////////////////////////////////////////////
        _pFrameControlElement.appendChildElement = function (child_elem)
        {
            // FrameControlElement > ContainerElement > Form Element
            // Frame의 ClientElement에 대한 내용 적용. 
            if (this.handle)
            {
                if (!this._client_elem)
                {
                    // it's impossible
                    return;
                }

                if (child_elem.parent_elem == this._client_elem)
                {
                    child_elem._is_nc_element = true;
                }
                else
                {
                    if (child_elem.handle)
                    {
                        if (child_elem._doc != this._doc)
                        {
                            child_elem.parent_elem = this._client_elem;
                            // for recreate Child Element Handle
                            child_elem._destroyDOMHandle();
                        }
                        else
                        {
                            child_elem.parent_elem = this._client_elem;
                        }
                    }
                    else
                    {
                        child_elem.parent_elem = this._client_elem;
                    }
                }

                // child element(form) : set as nc element
                child_elem._is_nc_element = true;

                // control for client element
                child_elem.setElementPosition(0, 0);
                child_elem.setElementSize(this.client_width, this.client_height);
                if (this.font)
                {
                    child_elem.setElementFont(this.font);
                }
                if (this.color)
                {
                    child_elem.setElementColor(this.color);
                }
                //if (this.align)
                //{
                //    child_elem.setElementAlign(this.align);
                //}
                //else if (this.halign || this.valign)
                //{
                //    child_elem.setElementAlignXY(this.halign, this.valign);
                //}

                // if child element is not created ==> create child handle
                if (!child_elem.handle)
                {
                    child_elem.create(this._getWindow());
                }
                else
                {
                    child_elem._appendToContainer(this._client_elem);
                }
            }
        };
        _pFrameControlElement.removeChildElement = function (child_elem)
        {
            // Frame의 ClientElement에 대한 내용 적용. 

            // this child element is client element
            if (child_elem.parent_elem == this)
            {
                child_elem._removeFromContainer();
            }
        };

        _pFrameControlElement.sendToBackElement = function (elem)
        {
            if (elem && elem.owner_elem &&
              elem.owner_elem.owner_elem == this.owner_elem && elem.handle)
            {
                nexacro.__setElementHandleSendToBack(elem.handle);
                if (elem._border_elems)
                {
                    for (var i = 0; i < elem._border_elems.length; i++)
                        nexacro.__setElementHandleSendToBack(elem._border_elems[i].handle);
                }
            }
        };
        _pFrameControlElement.bringToFrontElement = function (cur_elem)
        {
            // client_element가 생김에 따라 ..
            // this                 = frameset control_elem
            // cur_elem             = childframe's control_elem
            // cur_elem.owner_elem = frameset's client_elem
            if (cur_elem && cur_elem.owner_elem &&
                cur_elem.owner_elem.owner_elem == this.owner_elem && cur_elem.handle)
            {
                nexacro.__setElementHandleBringToFront(cur_elem.handle);
                if (cur_elem._border_elems)
                {
                    for (var i = 0; i < cur_elem._border_elems.length; i++)
                        nexacro.__setElementHandleBringToFront(cur_elem._border_elems[i].handle);
                }
            }
        };

        _pFrameControlElement.moveToNextElement = function (elem, base_elem)
        {
            var client_element = this.getContainerElement(elem.position_step);
            client_element.moveToNextElement(elem, base_elem);
        };

        _pFrameControlElement.moveToPrevElement = function (elem, base_elem)
        {
            var client_element = this.getContainerElement(elem.position_step);
            client_element.moveToPrevElement(elem, base_elem);
        };

        //======================================================================
        _pFrameControlElement.setTitleBarControl = function (title_control, title_height)
        {
            this._title_control = title_control;
            if (title_control)
            {
                // child element(form) : set as nc element				    
                this._title_height = parseInt(title_height) | 0;
                this._title_width = 0;
            }
            else
            {
                this._title_height = 0;
                this._title_width = 0;
            }

            this._updateClientRect();

        };
        _pFrameControlElement.setStatusBarControl = function (status_control, status_height)
        {
            this._status_control = status_control;
            if (status_control)
            {
                // child element(form) : set as nc element				    
                this._status_height = parseInt(status_height) | 0;
                this._status_width = 0;
            }
            else
            {
                this._status_height = 0;
                this._status_width = 0;
            }

            this._updateClientRect();
        };

        _pFrameControlElement._createBorderElements = function ()
        {
            var parent_elem = this.parent_elem;
            if (this._border_elems.length > 0)
            {
                // TODO check element.create가 두번 타는 case가 있음. (frame 동적생성시)
                return;
            }

            // 총 8개 resize영역에 해당하는 element 생성
            var name_table = Array("lt", "t", "rt", "l", "r", "lb", "b", "rb");
            for (var i = 0; i < 8; i++)
            {
                var border_elem = new nexacro._FrameResizeBorderElement(parent_elem);
                this._border_elems.add_item(name_table[i], border_elem);
            }

            for (var i = 0; i < 8; i++)
            {
                var border_elem = this._border_elems[i];
                border_elem.linkedcontrol = this.linkedcontrol; // trackevent를 direct로 날림
                border_elem.create(this._getWindow());
            }

            this._setResizable(this._resizable);
        };

        _pFrameControlElement._destroyBorderElements = function ()
        {
            var cnt = this._border_elems.length;
            for (var i = 0; i < cnt; i++)
            {
                this._border_elems[i].destroy();
                this._border_elems[i] = null;
            }

            this._border_elems.clear();
            this._border_elems = null;
        };

        // border element 때문에 재정의함
        _pFrameControlElement.setElementPosition = function (x, y)
        {
            nexacro.ControlElement.prototype.setElementPosition.call(this, x, y);
            this._updateBorderElementsPosition();
        };


        _pFrameControlElement._updateBorderElementsPosition = function ()
        {
            if (this._border_elems.length == 0)
                return;

            var border = this.border || this._border_info;
            if (!border)
                return;

            var lw, tw, rw, bw;
            if (border._linecnt == 1)
            {
                lw = tw = rw = bw = border._getBorderWidth();
            }
            else
            {
                // TODO check
                lw = border.left._width;
                tw = border.top._width;
                rw = border.right._width;
                bw = border.bottom._width;
            }

            var inner_width = this.inner_width;
            var inner_height = this.inner_height;

            // 최소 5픽셀을 resize영역으로 잡을수 있도록 함. border가 얇은 경우 border 안쪽까지 보장
            if (lw < 5)
            {
                var lx = 5 - lw;
                lw += lx;
                inner_width -= lx;
            }
            if (tw < 5)
            {
                var tx = 5 - tw;
                tw += tx;
                inner_height -= tx;
            }
            if (rw < 5)
            {
                var rx = 5 - rw;
                rw += rx;
                inner_width -= rx;
            }
            if (bw < 5)
            {
                var bx = 5 - bw;
                bw += bx;
                inner_height -= bx;
            }

            var left = this.left;
            var top = this.top;
            var right = left + this.width;
            var bottom = top + this.height;

            // set BorderElementPos
            var x = left;
            var y = top;
            for (var i = 0 ; i < 8; i++)
            {
                this._border_elems[i].setElementPosition(x, y);
                switch (i)
                {
                    case 0: x += lw; break;
                    case 1: x += inner_width; break;
                    case 2: x = left; y += tw; break;
                    case 3: x += (lw + inner_width); break;
                    case 4: x = left; y += inner_height; break;
                    case 5: x += lw; break;
                    case 6: x += inner_width; break;
                    case 7: break;
                }
            }

            // set BorderElementSize
            for (var i = 0 ; i < 8; i++)
            {
                if (i == 0 || i == 3 || i == 5) x = lw;
                if (i == 1 || i == 6) x = inner_width;
                if (i == 2 || i == 4 || i == 7) x = rw;
                if (i < 3) y = tw;
                else if (i < 5) y = inner_height;
                else y = bw;

                this._border_elems[i].setElementSize(x, y);
            }
        };

        _pFrameControlElement._setResizable = function (resizable)
        {
            this._resizable = resizable;
            if (this.handle)
            {
                if (this._border_elems.length == 0)
                {
                    if (resizable)
                    {
                        this._createBorderElements();
                        this._updateBorderElementsPosition();
                    }
                    else
                        return;
                }

                var is_apply;
                if (nexacro.System.navigatorname == "nexacro")
                {
                    // Runtime
                    is_apply = (this._is_window_element && resizable);
                }
                else
                {
                    // Embeded Plugin
                    is_apply = (this._is_window_element && resizable);
                    if (this._getWindowHandle() == nexacro._getMainWindowHandle())
                        is_apply = false;
                }

                var cursor_table = Array("nw", "n", "ne", "w", "e", "sw", "s", "se");
                var hittest_table = Array("topleft", "top", "topright", "left", "right", "bottomleft", "bottom", "bottomright");
                for (var i = 0; i < 8; i++)
                {
                    var border_elem = this._border_elems[i];
                    border_elem._is_track = resizable;

                    var cursor;
                    if (resizable)
                        cursor = nexacro.CursorObject(cursor_table[i] + "-resize");
                    else
                        cursor = nexacro.CursorObject("arrow"); // TODO check default로 되돌릴 방법??

                    if (is_apply)
                        border_elem.setElementHittestType("resizingborder_" + hittest_table[i]);
                    else
                        border_elem.setElementHittestType("fixedborder");

                    border_elem.setElementCursor(cursor);

                    // Runtime에서 Quicksort로 인해 동일 zIndex인 node의 순서가 보장되지 않는다.
                    // border에 높은 zIndex를 줄 필요가 있음.
                    /*
                    if (this.zindex == -1)
                        border_elem.setElementZIndex(1);
                    else
                        border_elem.setElementZIndex(this.zindex + 1);
                    */
                }
            }

        	// TODO statusbar grip image
            var statuscontrol = this._status_control;
            if (statuscontrol)
            	statuscontrol.set_resizable(resizable);
        };

    	//frame don't supported padding
        _pFrameControlElement.setElementCSSMapInfo = function (border, padding, edge)
        {
        	nexacro.ControlElement.prototype.setElementCSSMapInfo.call(this, border, null, edge);
        };

        //======================================================================
        // nexacro._FrameResizeBorderElement
        //======================================================================
        nexacro._FrameResizeBorderElement = function (parent_elem)
        {
            this.parent = parent_elem;  // frame client elem
            this.parent_elem = parent_elem;
        };

        var __pFrameResizeBorderElement = nexacro._createPrototype(nexacro.ControlElement, nexacro._FrameResizeBorderElement);
        nexacro._FrameResizeBorderElement.prototype = __pFrameResizeBorderElement;

        __pFrameResizeBorderElement._type_name = "FrameResizeBorderElement";

        //==== internal handles =========//
        __pFrameResizeBorderElement.win_handle = null;  // Window Handle

        __pFrameResizeBorderElement.create = function (win)
        {
            var owner_elem;
            var win_handle;
            if (this.parent_elem == null)
            {
                owner_elem = win;
                win_handle = this.win_handle = win.handle;
                this.left = 0;
                this.top = 0;
                //this.width = win.clientWidth;
                //this.height = win.clientHeight;
            }
            else
            {
                owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement();
                win_handle = win.handle || owner_elem._getRootWindowHandle();
            }

            // if parent is control element
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);

                // append TO Parent Element
                this.handle = this.dest_handle = handle;
                nexacro.__appendElementHandle(this._is_nc_element ? owner_elem.handle : owner_elem.dest_handle, handle);

                if (this._hittest_type)
                    nexacro.__setElementHittestValue(handle, this._hittest_type);

                // render
                this._refreshControl(handle);

            }
        };

        __pFrameResizeBorderElement.setElementSize = function (width, height)
        {
            if (this.width != width || this.height != height)
            {
                this.width = width;
                this.height = height;
                if (width < 0) width = 0;
                if (height < 0) height = 0;

                var handle = this.handle;
                if (handle)
                {
                    if (width && height)
                        nexacro.__setElementHandleSize(handle, width, height);
                    else
                        nexacro.__clearElementHandleSize(handle);
                }
            }
        };

        __pFrameResizeBorderElement._on_destroy = function ()
        {
            this.win_handle = null;
        };


        __pFrameResizeBorderElement._getRootWindowHandle = function ()
        {
            if (this._is_window_element)
                return this.win_handle;
            else if (this.owner_elem)
                return this.owner_elem._getRootWindowHandle();
            return null;
        };

        __pFrameResizeBorderElement._on_starttrack = function ()
        {
            this.linkedcontrol._on_border_starttrack(this.cursor);
        };
        __pFrameResizeBorderElement._on_endtrack = function (x, y, dragdata)
        {
            this.linkedcontrol._on_border_endtrack(x, y, dragdata);
        };
        __pFrameResizeBorderElement._on_movetrack = function (x, y, dragdata)
        {
            this.linkedcontrol._on_border_movetrack(x, y, dragdata);
        };



        //======================================================================
        // nexacro.ModalOverlayElement - simple overlay
        //======================================================================
        nexacro.ModalOverlayElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
        };

        var _pModalOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ModalOverlayElement);
        nexacro.ModalOverlayElement.prototype = _pModalOverlayElement;
        _pModalOverlayElement._type_name = "ModalOverlayElement";

        _pModalOverlayElement.create = function (win)
        {
            if (this.parent_elem && !this.handle)
            {
                var _win = this.linkedcontrol._getWindow();
                this.win_handle = _win.handle;

                this.left = 0;
                this.top = 0;
                this.width = _win.clientWidth;
                this.height = _win.clientHeight;

                var handle = this.handle = this.dest_handle = nexacro.__createControlElementHandle(this, this.win_handle, this.left, this.top, this.width, this.height);
                handle._linked_element = this;

                var handle_style = handle.style;
                if (this.zindex >= 0)
					nexacro.__setElementHandleZindex(handle, this.zindex);

                var _win = this.linkedcontrol._getWindow();
                var waitcomp_elem = _win.frame._getWaitComponentElement();
                var ref_dest_handle = null;
                if (waitcomp_elem)
                    ref_dest_handle = waitcomp_elem.handle;
                var owner_elem = _win;

                if (ref_dest_handle)
                {
                    nexacro.__insertElementHandle(owner_elem.dest_handle, handle, ref_dest_handle);
                }
                else
                {
                    nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
                }

                this._refreshControl(handle);
            }
        };

        _pModalOverlayElement.destroy = function ()
        {
            if (!this.handle)
                return;

            var _win = this.linkedcontrol._getWindow();
            var owner_elem = _win;

            nexacro.__destroyElementHandle(owner_elem.handle, this.handle);
            this.handle = null;
        };


        _pModalOverlayElement._getRootWindowHandle = function ()
        {
            return this.win_handle;
        };



        //======================================================================
        // nexacro.ScrollableControlElement - this Element is scrollable ControlElement
        //======================================================================
        // this ScrollableControlElement has ScrollControlElement
        nexacro.ScrollableControlElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            // set container Element
            var client_element = new nexacro._ContainerElement(this);
            this._client_elem = client_element;
        };
        var _pScrollableControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ScrollableControlElement);
        nexacro.ScrollableControlElement.prototype = _pScrollableControlElement;
        // overide nexacro.Object
        _pScrollableControlElement._type_name = "ScrollableControlElement";

        //==== defaule values =========//
        _pScrollableControlElement.zoom = 100;
        _pScrollableControlElement.scroll_left = 0;
        _pScrollableControlElement.scroll_top = 0;
        _pScrollableControlElement.container_maxwidth = 0;
        _pScrollableControlElement.container_maxheight = 0;

        _pScrollableControlElement.hscroll_limit = 0;
        _pScrollableControlElement.vscroll_limit = 0;

        _pScrollableControlElement._hscroll_size = 0;
        _pScrollableControlElement._vscroll_size = 0;
        _pScrollableControlElement._hscrollbartype = "";
        _pScrollableControlElement._vscrollbartype = "";
        _pScrollableControlElement._scrolltype = "";

        _pScrollableControlElement._scrollview_width_top = 0;
        _pScrollableControlElement._step_count = 0;
        _pScrollableControlElement._step_index = -1;

        // for designform 
        _pScrollableControlElement._init_left = 0;
        _pScrollableControlElement._init_top = 0;
        _pScrollableControlElement._init_width = 0;
        _pScrollableControlElement._init_height = 0;

        //==== internal handles =========//
        _pScrollableControlElement._hscroll_control = null;
        _pScrollableControlElement._vscroll_control = null;
        
        _pScrollableControlElement._step_containers = null;
        //==== default flags =========//
        
        //==== end of initial =========//

        _pScrollableControlElement.create = function (win)
        {
            // parent is always control element
            if (!this._is_popup)
            {

                var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
                if (owner_elem && owner_elem.handle)
                {
                    if (!this.handle)
                    {
                        this.owner_elem = owner_elem;
                        var win_handle = win.handle || owner_elem._getRootWindowHandle();
                        var handle = nexacro.__createScrollableControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                        this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
                        nexacro.__setElementHandleId(handle, this.linkedcontrol._unique_id);

                        nexacro.__setElementHandleIsControl(handle, this._is_control);

                        nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());
                        // append TO Parent Element
                        this.handle = this.dest_handle = handle;
                        nexacro.__appendElementHandle(owner_elem.dest_handle, handle);

                        //for designform
                        if (this._init_width > 0 || this._init_height > 0)
                            nexacro.__setElementHandleInitPosSize(handle, this._init_left, this._init_top, this._init_width, this._init_height);


                        if (this._hittest_type)
                        {
                            nexacro.__setElementHittestValue(handle, this._hittest_type);
                        }
                        // render
                        this._refreshControl(handle);
                    }
                }
            }
            else
            {
                if (!this.handle)
                {
                    var linkedcontrol = this.linkedcontrol;

                    // if parent is Window	                
                    var win_handle = win.handle;
                    var owner_elem = win;

                    var handle = nexacro.__createScrollableControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    nexacro.__setElementHandleId(handle, linkedcontrol._unique_id);
                    nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;

                    this._refreshControl(handle);
                    if (this._hittest_type)
                        nexacro.__setElementHittestValue(handle, this._hittest_type);

                    if (this.direction)
                        nexacro.__setElementHandleRtlDirection(handle, this.direction);

                    if (this.mirror)
                        nexacro.__setElementHandleMirror(handle, this.mirror);

                    if (linkedcontrol._findOwnerElementHandle)
                    {
                        var owner_elem_info = linkedcontrol._findOwnerElementHandle();
                        if (owner_elem_info.is_append)
                        {
                            nexacro.__appendElementHandle(owner_elem_info.owner_handle, handle);
                        }
                        else
                        {
                            // TODO Runtime버젼 미구현!!!!
                            nexacro.__insertElementHandle(owner_elem_info.owner_handle, handle, owner_elem_info.ref_handle);
                        }

                        this.owner_elem = owner_elem_info.owner_handle._linked_element;
                    }
                    else
                    {
                        nexacro.__appendElementHandle(win_handle, handle);
                        this.owner_elem = owner_elem;
                    }
                }
            }

            //container element create
            // no need set props for child --> only create it
            // props are already setted to child_elem
            if (this.handle && !this._client_elem.handle)
            {
                this._client_elem.create(win);
            }

            if (this.handle)
            {
                var step_count = this._step_count;
                if (step_count > 0)
                {
                    this._step_containers = [];
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client = new nexacro._ContainerElement(this._client_elem);
                        step_client.setElementPosition(i * this.client_width, 0);
                        step_client.setElementSize(this.client_width, this.client_height);
                        step_client.create(this._getWindow());
                        this._step_containers.push(step_client);
                    }
                }
            }
        };

        _pScrollableControlElement._on_destroy = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var step_containers = this._step_containers;
                if (step_containers)
                {
                    var step_count = step_containers.length;
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client = step_containers[i];
                        step_client.destroy();
                    }
                    this._step_containers = null;
                }

                // sctollbar control destroyed by component
                this._hscroll_control = null;
                this._vscroll_control = null;
            }

        };

        _pScrollableControlElement._on_clearContents = function ()
        {
            if (this.handle)
            {
                var step_containers = this._step_containers;
                if (step_containers)
                {
                    var step_count = step_containers.length;
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client = step_containers[i];
                        step_client.destroy();
                    }
                    this._step_containers = null;
                }
            }
        };

        _pScrollableControlElement.setLinkedControl = function (control)
        {
            if (!this.linkedcontrol && control)
            {
                nexacro.ControlElement.prototype.setLinkedControl.call(this, control);
                this._use_translate_scroll = (control._use_translate_scroll === false) ? control._use_translate_scroll : nexacro._use_translate_scroll;
                var hscrollbarsize = control._getHScrollBarSize();
                var vscrollbarsize = control._getVScrollBarSize();

                var hscrollbartype = control._getHScrollBarType();
                var vscrollbartype = control._getVScrollBarType();

                var scrolltype = control.scrolltype;

                this.setElementScrollbarSize(hscrollbarsize, vscrollbarsize, hscrollbartype, vscrollbartype, scrolltype);
            }
        };

        _pScrollableControlElement.getContainerElement = function (position_step)
        {
            var step_count = this._step_count;
            var step_index = this._step_index;
            var step_containers = this._step_containers;
            if (step_count > 0 && step_containers && step_count > position_step)
            {
                if (position_step < 0 || position_step == null)
                    position_step = (step_index > -1 ? step_index : 0);

                return step_containers[position_step];
            }
            else
            {
                return this._client_elem;
            }
        };

        _pScrollableControlElement.setElementStepCount = function (count)
        {
            if (this._step_count != count)
            {
                var step_count = this._step_count;
                var step_containers = this._step_containers;
                if (step_containers && this._step_count)
                {
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client = step_containers[i];
                        step_client.destroy();
                    }
                    this._step_containers = null;
                }

                this._step_count = count;

                if (this.handle && count > 0)
                {
                    this._step_containers = [];
                    for (var i = 0; i < count; i++)
                    {
                        var step_client = new nexacro._ContainerElement(this._client_elem);
                        step_client.setElementPosition(i * this.client_width, 0);
                        step_client.setElementSize(this.client_width, this.client_height);
                        step_client.create(this._getWindow());
                        this._step_containers.push(step_client);
                    }
                }

                this._updateClientRect();
            }
        };

        _pScrollableControlElement.setElementStepIndex = function (index)
        {
            if (this._step_index != index)
            {
                if (this._step_count > 0)
                {
                    if (index > -1 && this._step_count > index)
                    {
                        this._step_index = index;
                    }
                }
                else
                {
                    this._step_index = index;
                }
            }
        };


        _pScrollableControlElement.setElementZoom = function (zoomfactor)
        {
            var handle = this.handle;
            if (handle)
            {
                if (zoomfactor < 0) zoomfactor = 0;
                this.zoom = zoomfactor;
                var client = this.getContainerElement(this._step_index);
                nexacro.__setElementHandleScale(client.handle, this.zoom);
                this._updateClientRect();
            }
        };

        //////////////////////////////////////////////////////////////////////////
        _pScrollableControlElement._updateClientRect = function ()
        {
            var ret = this._on_updateClientRect();
            if (ret & 1)
                this._on_change_clientPos(this.client_left, this.client_top); 
            if (ret & 2)
                this._on_change_clientSize(this.client_width, this.client_height);  

            //this._on_updateScrollBar(ret & 4, ret & 8);
        };

        _pScrollableControlElement._on_change_clientPos = function (left, top)
        {
            if (this._apply_client_padding)
            {
                if (this._client_elem)
                {
                    this._client_elem.setElementPosition(left, top);
                    var step_count = this._step_count;
                    var step_index = this._step_index;
                    var step_containers = this._step_containers;
                    if (step_count > 0 && step_containers)
                    {
                        var zclient_width = this._zclient_width;
                        for (var i = 0; i < step_count; i++)
                        {
                            var step_client_elem = step_containers[i];
                            step_client_elem.setElementPosition(zclient_width * i, 0);
                        }

                        step_index = this._step_index;
                        var step_scroll_left = zclient_width * step_index;
                        if (this.scroll_left != step_scroll_left)
                        {
                            this.scroll_left = step_scroll_left;
                            this._client_elem._setElementHScrollPos(step_scroll_left);
                        }
                    }
                }
                else if (this.handle && this.handle != this.dest_handle)
                {
                    var dest_handle = this.dest_handle;
                    nexacro.__setElementHandlePosition(dest_handle, left, top);
                }
            }
            else if (this._client_elem)
            {
                this._client_elem.setElementPosition(left, top);
                var step_count = this._step_count;
                var step_index = this._step_index;
                var step_containers = this._step_containers;
                if (step_count > 0 && step_containers)
                {
                    var zclient_width = this._zclient_width;
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client_elem = step_containers[i];
                        step_client_elem.setElementPosition(zclient_width * i, 0);
                    }

                    step_index = this._step_index;
                    var step_scroll_left = zclient_width * step_index;
                    if (this.scroll_left != step_scroll_left)
                    {
                        this.scroll_left = step_scroll_left;
                    }
                }
            }

            var control = this.linkedcontrol;
            if (control)
            {
                control.on_change_containerPos(left, top);
            }
        };

        _pScrollableControlElement._on_change_clientSize = function (width, height)
        {
            if (this._apply_client_padding)
            {
                if (this._client_elem)
                {
                    this._client_elem.setElementSize(width, height);

                    var step_count = this._step_count;
                    var step_index = this._step_index;
                    var step_containers = this._step_containers;
                    if (step_count > 0 && step_containers)
                    {
                        var zclient_width = this._zclient_width;
                        for (var i = 0; i < step_count; i++)
                        {
                            var step_client_elem = step_containers[i];
                            step_client_elem.setElementSize(zclient_width, height);
                        }
                    }
                }
                else if (this.handle && this.handle != this.dest_handle)
                {
                    var dest_handle = this.dest_handle;
                    nexacro.__setElementHandleSize(dest_handle, width, height);
                }
            }
            else if (this._client_elem)
            {
                this._client_elem.setElementSize(width, height);

                var step_count = this._step_count;
                var step_index = this._step_index;
                var step_containers = this._step_containers;
                if (step_count > 0 && step_containers)
                {
                    var zclient_width = this._zclient_width;
                    for (var i = 0; i < step_count; i++)
                    {
                        var step_client_elem = step_containers[i];
                        step_client_elem.setElementSize(zclient_width, height);
                    }
                }
            }

            var control = this.linkedcontrol;
            if (control)
            {
                control.on_change_containerRect(width, height);
            }
        };

        _pScrollableControlElement._on_updateClientRect = function ()
        {
            var client_left = 0;
            var client_top = 0;
            var client_width = this.inner_width;
            var client_height = this.inner_height;

            if (this._apply_client_padding)
            {
                var padding = this.padding ? this.padding : this._padding_info;
                if (padding)
                {
                    client_left = padding.left;
                    client_top = padding.top;
                    client_width -= padding.left + padding.right;
                    client_height -= padding.top + padding.bottom;
                }
            }

            // recalc scroll_left/scroll_top
            var client_elem = this._client_elem;
            if (!client_elem || client_width == 0 || client_height == 0)
                return 0;

            var zoomfactor = this.zoom / 100;
            var zclient_width = this._zclient_width = client_width / zoomfactor;
            var zclient_height = this._zclient_height = client_height / zoomfactor;

            var container_maxwidth = this.container_maxwidth;
            var container_maxheight = this.container_maxheight;

            var scroll_left = this.scroll_left;
            var scroll_top = this.scroll_top;

            if (zoomfactor != 1)
            {
                var factor = 4;
                zclient_width = nexacro.floor(zclient_width, factor);
                zclient_height = nexacro.floor(zclient_height, factor);
                container_maxwidth = nexacro.floor(container_maxwidth, factor);
                container_maxheight = nexacro.floor(container_maxheight, factor);
            }

            var step_count = this._step_count;
            var step_index = this._step_index;
            var step_containers = this._step_containers;
            if (step_count > 0 && step_containers)
            {
                container_maxwidth = step_count * zclient_width;
            }

            var reset_vlimit = false;
            var reset_hlimit = false;

            var hscroll_visible = false;
            var vscroll_visible = false;

            var hscroll_limit = 0;
            var vscroll_limit = 0;

            var hscrollbartype = this._hscrollbartype;
            var vscrollbartype = this._vscrollbartype;

            if (step_count > 0 && step_containers)
            {
                hscrollbartype = "none";
            }

            if (container_maxwidth > zclient_width)
            {
                if (hscrollbartype != "none" && hscrollbartype != "autoindicator")
                {
                    client_height -= this._hscroll_size;
                    zclient_height = client_height / zoomfactor;
                }

                hscroll_limit = container_maxwidth - zclient_width;
            }
            else
            {
                if (hscrollbartype == "fixed")
                {
                    client_height -= this._hscroll_size;
                    zclient_height = client_height / zoomfactor;
                }

                hscroll_limit = 0;
            }
            
            if (container_maxheight > zclient_height)
            {
                vscroll_limit = container_maxheight - zclient_height;
                if (vscrollbartype != "none" && vscrollbartype != "autoindicator")
                {
                    client_width -= this._vscroll_size;
                    zclient_width = client_width / zoomfactor;
                }

                if (container_maxwidth > zclient_width)
                {
                    hscroll_limit = container_maxwidth - zclient_width;
                }
            }
            else
            {
                if (vscrollbartype == "fixed")
                {
                    client_width -= this._vscroll_size;
                    zclient_width = client_width / zoomfactor;

                    if (container_maxwidth > zclient_width)
                    {
                        hscroll_limit = container_maxwidth - zclient_width;
                    }
                }
                vscroll_limit = 0;
            }
            if (step_count > 0 && step_containers)
            {
                container_maxwidth = step_count * zclient_width;

                if (container_maxwidth > zclient_width)
                {
                    hscroll_limit = container_maxwidth - zclient_width;
                }
            }

            if (this.hscroll_limit != hscroll_limit)
            {
                reset_hlimit = true;
                this.hscroll_limit = hscroll_limit;

                if (scroll_left > hscroll_limit)
                {
                    this.setElementHScrollPos(hscroll_limit);
                }
            }

            if (this.vscroll_limit != vscroll_limit)
            {
                reset_vlimit = true;
                this.vscroll_limit = vscroll_limit;

                if (scroll_top > vscroll_limit)
                {
                    this.setElementVScrollPos(vscroll_limit);
                }
            }

            this._zclient_width = zclient_width;
            this._zclient_height = zclient_height;

            var ret = 0;
            if (this.client_left != client_left || this.client_top != client_top)
            {
                this.client_left = client_left;
                this.client_top = client_top;
                ret = 1;
            }
            else if (step_count > 0)
                ret = 1;

            //여러 case에 대해 테스트 필요!
            if (this.client_width != client_width || this.client_height != client_height)
            {
                this.client_width = client_width;
                this.client_height = client_height;
                ret += 2;
            }
            else if (this.client_width != zclient_width || this.client_height != zclient_height)
            {
                ret += 2;
            }

            return ret;
        };

        //////////////////////////////////////////////////////////////////////////
        // for scrollbar

        //_pScrollableControlElement.setElementHScrollPos = function (hpos)
        //{
        //    if (hpos < 0) hpos = 0;
        //    if (hpos > this.hscroll_limit)
        //    {
        //       hpos = this.hscroll_limit;
        //    }

        //    if (this.scroll_left != hpos)
        //    {
        //        this.scroll_left = hpos;
        //        if (this._client_elem)
        //        {
        //            this._client_elem.setElementHScrollPos(hpos);
        //        }
        //        if (this._hscroll_control)
        //        {
        //            this._hscroll_control._setScrollPos(this.scroll_left);
        //        }
        //    }
        //};
        //_pScrollableControlElement.setElementVScrollPos = function (vpos)
        //{
        //    if (vpos < 0) vpos = 0;
        //    if (vpos > this.vscroll_limit)
        //    {
        //	    vpos = this.vscroll_limit;
        //    }
        //    if (this.scroll_top != vpos)
        //    {
        //        this.scroll_top = vpos;
        //        if (this._client_elem)
        //        {
        //            this._client_elem.setElementVScrollPos(vpos);
        //        }
        //        if (this._vscroll_control)
        //        {
        //            this._vscroll_control._setScrollPos(this.scroll_top);
        //        }
        //    }
        //};
        //_pScrollableControlElement.setElementScrollPos = function (hpos, vpos)
        //{
        //    if (hpos < 0) hpos = 0;
        //    if (vpos < 0) vpos = 0;
        //    if (hpos > this.hscroll_limit)
        //    {
        //       hpos = this.hscroll_limit;
        //    }
        //    if (vpos > this.vscroll_limit)
        //    {
        //	    vpos = this.vscroll_limit;
        //    }

        //    if (this.scroll_left != hpos || this.scroll_top != vpos)
        //    {
        //        this.scroll_left = hpos;
        //        this.scroll_top = vpos;
        //        if (this._client_elem)
        //        {
        //            this._client_elem.setElementScrollPos(hpos, vpos);
        //        }
        //        if (this._hscroll_control)
        //        {
        //            this._hscroll_control._setScrollPos(this.scroll_left);
        //        }
        //        if (this._vscroll_control)
        //        {
        //            this._vscroll_control._setScrollPos(this.scroll_top);
        //        }
        //    }
        //};

        _pScrollableControlElement.setElementScrollMaxSize = function (width, height)
        {
            if (this.container_maxwidth != width || this.container_maxheight != height)
            {
                this.container_maxwidth = width;
                this.container_maxheight = height;

                if (this._step_count)
                {
                	var client_elem = this.getContainerElement(this._step_index);
                	if (client_elem)
                		client_elem.setElementScrollMaxSize(width, height);
                }
                if (this._client_elem)
                {
                	this._client_elem.setElementScrollMaxSize(width, height);

                }

                this._updateClientRect();

                return true;
            }
            return false;
        };

        _pScrollableControlElement.setElementScrollbarSize = function (hscroll_size, vscroll_size, hscrollbartype, vscrollbartype, scrolltype)
        {
            var ret = false;

            if (this._vscroll_size != vscroll_size || this._hscroll_size != hscroll_size)
            {
                this._vscroll_size = vscroll_size | 0;
                this._hscroll_size = hscroll_size | 0;

                ret = true;
            }

            if (this._hscrollbartype != hscrollbartype || this._vscrollbartype != vscrollbartype)
            {
                this._hscrollbartype = hscrollbartype;
                this._vscrollbartype = vscrollbartype;

                ret = true;
            }

            if (this._scrolltype != scrolltype)
            {
                this._scrolltype = scrolltype;

                ret = true;
            }

            if (ret)
                this._updateClientRect();

            return ret;
        };

        //for designform 
        _pScrollableControlElement.setElementInitPosSize = function (init_left, init_top, init_width, init_height)
        {
            this._init_left = init_left;
            this._init_top = init_top;
            this._init_width = init_width;
            this._init_height = init_height;

            var handle = this.handle;
            if (handle)
                nexacro.__setElementHandleInitPosSize(handle, left, top, init_width, init_height);
        };



        //======================================================================
        // nexacro._ContainerElement
        //======================================================================
        // this ContainerElement has No Event Handlers -- Container only

        nexacro._ContainerElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
        };
        var __pContainerElement = nexacro._createPrototype(nexacro.Element, nexacro._ContainerElement);
        nexacro._ContainerElement.prototype = __pContainerElement;
        // overide nexacro.Object
        __pContainerElement._type_name = "ContainerElement";

        //==== defaule values =========//
        __pContainerElement._scroll_left = 0;
        __pContainerElement._scroll_top = 0;
        __pContainerElement._use_translate_scroll = nexacro._use_translate_scroll;

        __pContainerElement.create = function (win)
        {
            // this is always nc_element
            // this is always nc_element
            var owner_elem = this.parent_elem;
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                this._use_translate_scroll = owner_elem._use_translate_scroll;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();
                var handle = nexacro.__createScrollableContainerElementHandle(this, win_handle, this.left, this.top, this.width, this.height);

                this.name = owner_elem.name + ":container";
                nexacro.__setElementHandleId(handle, this.name);
                nexacro.__setElementHandleCSSClassName(handle, "nexacontainer");

                // set scroll pos
                if (this._scroll_left != 0 || this._scroll_top != 0)
                {
                    nexacro.__setElementHandleOffset(handle, this._scroll_left, this._scroll_top);
                }

                // append TO Parent Element
                this.handle = this.dest_handle = handle;
                nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
            }
        };

        __pContainerElement.destroy = function ()
        {
            this._destroyElementHandle();
            this.dest_handle = null;

            this.parent = null;
            this.parent_elem = null;
        };

        __pContainerElement.clearContents = function ()
        {
            var handle = this.handle;
            var owner_elem = this.owner_elem;
            if (handle)
            {
                handle._linked_element = null;
                if (owner_elem && owner_elem.handle)
                {
                    nexacro.__destroyElementHandle(owner_elem.handle, handle);
                }
                this.owner_elem = null;
                this.handle = null;
            }
        };

        // scroll control methods - this simple client no scroll
        __pContainerElement._setElementVScrollPos = function (vpos)
        {
            if (this._use_translate_scroll)
            {
                if (this._scroll_top != vpos || this.parent._reset_scrollpos)
                {
                    this._scroll_top = vpos;
                    var handle = this.handle;
                    if (handle)
                    {
                        nexacro.__setElementHandleVScrollPos(handle, vpos);
                    }
                }
            }
        };

        __pContainerElement._setElementHScrollPos = function (hpos)
        {
            if (this._use_translate_scroll)
            {
                if (this._scroll_left != hpos || this.parent._reset_scrollpos)
                {
                    this._scroll_left = hpos;
                    var handle = this.handle;
                    if (handle)
                    {
                        nexacro.__setElementHandleHScrollPos(handle, hpos);
                    }
                }
            }
        };

        __pContainerElement._setElementScrollPos = function (hpos, vpos)
        {
            if (this._use_translate_scroll)
            {
                if (this._scroll_left != hpos || this._scroll_top != vpos || this.parent._reset_scrollpos)
                {
                    this._scroll_left = hpos;
                    this._scroll_top = vpos;
                    var handle = this.handle;
                    if (handle)
                    {
                        nexacro.__setElementHandleOffset(handle, hpos, vpos);
                    }
                }
            }
        };


        __pContainerElement.setElementZoom = function (zoomfactor)
        {
            if (this.handle)
            {
                this.zoom = zoomfactor;
                nexacro.__setElementHandleScale(this.handle, zoomfactor);
            }
        };

        __pContainerElement._findScrollbarControl = function (elem, is_vert)
        {
            while (elem)
            {
                if (is_vert && elem._vscroll_control && elem._vscroll_control._isVisible())
                {
                    return elem._vscroll_control;
                }
                else if (elem._hscroll_control && elem._hscroll_control._isVisible())
                {
                    return elem._hscroll_control;
                }
                elem = elem.parent;
            }
        };

        __pContainerElement._sendToBackElement = function (elem)
        {
            if (elem && elem.owner_elem.dest_handle == this.dest_handle && elem.handle)
            {
                nexacro.__setElementHandleSendToBack(elem.handle);
            }
        };

        __pContainerElement._bringToFrontElement = function (elem)
        {
            if (elem && elem.owner_elem.dest_handle == this.dest_handle && elem.handle)
            {
                nexacro.__setElementHandleBringToFront(elem.handle);
            }
        };

        __pContainerElement._moveToNextElement = function (elem, base_elem)
        {
            if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle)
            {
                nexacro.__setElementHandleMoveToNext(elem.handle, base_elem.handle);
            }            
        };

        __pContainerElement._moveToPrevElement = function (elem, base_elem)
        {
            if (elem && base_elem && elem.owner_elem == this && base_elem.owner_elem == this && elem.handle && base_elem.handle)
            {
                nexacro.__setElementHandleMoveToPrev(elem.handle, base_elem.handle);
            }
        };

        __pContainerElement.setElementScrollMaxSize = function (width, height)
        {
            this._scroll_maxwidth = width;
            this._scroll_maxheight = height;
        };

        // end of ContainerElement

        //==============================================================================
        // nexacro.PluginElement : <DIV><Object>...</Object></DIV>
        // Object tag Plugin Element for ActiveX/Plugin
        //==============================================================================	
        nexacro.PluginElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            this._params = new nexacro.Collection();
            this._events = new nexacro.Collection();
        };

        var _pPluginElement = nexacro._createPrototype(nexacro.Element, nexacro.PluginElement);
        nexacro.PluginElement.prototype = _pPluginElement;
        _pPluginElement._type_name = "PluginElement";

        _pPluginElement._plugin_object = null;

        //==== defaule values =========//
        _pPluginElement.license = "";
        _pPluginElement.lpkpath = "";
        _pPluginElement.classid = "";
        _pPluginElement.codebase = "";
        _pPluginElement.code = "";
        _pPluginElement.archive = "";
        _pPluginElement.mimetype = "";

        _pPluginElement.pluginsrc = "";
        _pPluginElement.plugintype = "";
        _pPluginElement.pluginpage = "";

        _pPluginElement.windowed = false;
        _pPluginElement.popupstyle = false;
        _pPluginElement.adjustalpha = false;
        _pPluginElement.usepersistdata = false;

        _pPluginElement.enable = true;
        _pPluginElement.font = null;
        _pPluginElement.color = null;
        _pPluginElement.cursor = null;
        _pPluginElement.align = null;
        _pPluginElement.padding = null;
        _pPluginElement.color = null;
        _pPluginElement.component = null;

        //==== internal handles =========//
        _pPluginElement._params = null;  // for Param tag    
        _pPluginElement._events = null;
        _pPluginElement._pluginname = "";        //for only android mobile
        //==== default flags =========//
        //==== end of initial =========//

        _pPluginElement.create = function (win)
        {
            if (!this.handle)
            {
                var win_handle = null;
                var owner_elem = null;
                var _linked_comp = null;
                if (this.parent_elem)
                {
                    owner_elem = this.parent_elem.getContainerElement(this.position_step);
                    if (owner_elem && owner_elem.handle)
                    {
                        this.owner_elem = owner_elem;
                        win_handle = win.handle || owner_elem._getRootWindowHandle();
                    }
                    _linked_comp = this.parent_elem.linkedcontrol;
                }

                var handle = nexacro.__createPluginElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                // for activeX
                if (this.classid)
                {
                    nexacro.__setPluginElementHandleClassId(handle, this.classid);
                }
                if (this.adjustalpha)
                {
                    nexacro.__setPluginElementHandleAdjustAlpha(handle, this.adjustalpha);
                }

                //for only android mobile
                if (this._pluginname)
                {
                    nexacro.__setPluginElementHandlePluginName(handle, this._pluginname);
                }

                //for Plugin
                if (this.mimetype)
                {
                    nexacro.__setPluginElementHandleMIMEType(handle, this.mimetype);
                }
                if (this.pluginsrc)
                {
                    nexacro.__setPluginElementHandlePluginSrc(handle, this.pluginsrc);
                }
                if (this.pluginpage)
                {
                    nexacro.__setPluginElementHandlePluginPage(handle, this.pluginpage);
                }
                if (this.code)
                {
                    nexacro.__setPluginElementHandleCode(handle, this.code);
                }

                // both
                if (this.codebase)
                {
                    nexacro.__setPluginElementHandleCodebase(handle, this.codebase);
                }

                var params = this._params;
                var param_cnt = (params ? params.length : 0);
                for (var i = 0 ; i < param_cnt; i++)
                {
                    nexacro.__setPluginElementHandleAttribute(handle, params.get_id(i), params.get_item(i));
                }

                if (this.mimetype && this.classid == "")
                {
                    var events = this._events;
                    var event_cnt = events.length;
                    for (var i = 0; i < event_cnt; i++)
                    {
                        this.addEventHandler(events.get_id(i), events.get_item(i));
                    }
                }

                if (this.license || this.lpkpath)
                {
                    //nexacro._setPluginElementHandleLicense(handle, this.license, this.lpkpath);    
                }

                if (!this.visible || (_linked_comp && _linked_comp.visible == false))
                {
                    nexacro.__setElementHandleVisible(handle, false);
                    if (this.visible) this.visible = false;
                }

                if (!this.enable || (_linked_comp && _linked_comp.enable == false))
                {
                    nexacro.__setElementHandleEnable(handle, false);
                    if (this.enable) this.enable = false;
                }

                if (this.windowed)
                {
                    nexacro.__setPluginElementHandleWindowed(handle, this.windowed);
                    if (this.popupstyle) // windowed가 true인 경우만 해당
                    {
                        nexacro.__setPluginElementHandlePopupstyle(handle, this.popupstyle);
                    }
                }

                if (this.font)
                {
                    nexacro.__setElementHandleFontObject(handle, this.font);
                }
                if (this.color)
                {
                    nexacro.__setElementHandleColorObject(handle, this.color);
                }
                /*
	            if (this.align)
	            {
	                var align = this.align;
	                nexacro.__setElementHandleAlign(handle, align.halign, align.valign);
	            }
                */


                // append TO Parent Element
                this.handle = handle;
                if (owner_elem && owner_elem.handle)
                    nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
                nexacro.__createdPluginElementHandle(handle);

                this._plugin_object = new nexacro._PluginObject;
                if (this._plugin_object)
                    this._plugin_object.handle = nexacro.__getPluginElementHandleObject(this.handle);
            }
        };

        _pPluginElement.destroy = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var owner_handle = null;   // unlink 인 경우 owner_elem이 null이다.
                if (this.owner_elem && this.owner_elem.handle)
                {
                    owner_handle = this.owner_elem.handle;
                    nexacro.__destroyElementHandle(owner_handle, this.handle);
                }

                this.owner_elem = null;
                this.handle = null;
            }
            this.parent = null;
            this.parent_elem = null;

            var params = this._params;
            if (params)
            {
                params.destroy();
                this._params = null;
            }

            var events = this._events;
            if (events)
            {
                events.destroy();
                this._events = null;
            }

            var plugin_object = this._plugin_object;
            if (plugin_object)
            {
                plugin_object.destroy();
                this._plugin_object = null;
            }

        };

        _pPluginElement.initEvent = function ()
        {
            if (this.handle)
            {
                nexacro._observeWrapperEvent(this.handle, null, "on_plugin_event", this._on_plugin_event, -1, null);
            }
        };

        _pPluginElement._on_plugin_event = function ()
        {
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                var length = arguments.length;
                if (length > 0)
                {
                    var evt_id = arguments[0];
                    if (comp[evt_id])
                    {
                        var listener = comp[evt_id];
                        if (listener)
                        {
                            var j;
                            var params = new Array(length);
                            params[0] = this;

                            for (var i = 1, j = 1; i < length; i++, j++)
                            {
                                params[j] = arguments[i];
                            }
                            listener._fireEvent.apply(listener, params);
                        }
                    }
                }
            }
        };

        //=======================================================================================

        _pPluginElement.on_update_position = function ()
        {
            // control element 변경 후 component에서 호출 
            // Plugin element는 직접 사이즈를 변경하지 않고, node의 parent 크기를 받아 처리한다. 
            if (this.handle)
            {
                nexacro.__updatePluginElementHandlePosition(this.handle);
            }
        };

        _pPluginElement.setElementFocus = function ()
        {
            if (this.handle)
            {
                nexacro.__setElementHandleFocus(this.handle);
                nexacro.__setLastFocusedElement(this);
            }
        };

        _pPluginElement.setElementPluginPosition = function (left, top)
        {
            if (this.handle)
            {
                this.setElementPosition(left, top);
            }
        };

        //=======================================================================================
        _pPluginElement.setElementLicense = function (license)
        {
            if (this.license != license)
            {
                this.license = license;
            }
        };

        _pPluginElement.setElementLicenseFile = function (lpkpath)
        {
            if (!this.handle && this.lpkpath != lpkpath)
            {
                this.lpkpath = lpkpath;
            }
        };

        _pPluginElement.setElementMIMEType = function (_type)
        {
            if (this.mimetype != _type)
            {
                this.mimetype = _type;
            }
        };

        _pPluginElement.setElementClassId = function (classid)
        {
            if (this.classid != classid)
            {
                this.classid = classid;
            }
        };

        _pPluginElement.setElementCodebase = function (codebase)
        {
            if (this.codebase != codebase)
            {
                this.codebase = codebase;

                if (this.handle)
                {
                    nexacro.__setPluginElementHandleCodebase(this.handle, this.codebase);
                }
            }
        };

        _pPluginElement.setElementCode = function (code)
        {
            if (this.code != code)
            {
                this.code = code;
            }
        };

        _pPluginElement.setElementArchive = function (archive)
        {
            if (this.archive != archive)
            {
                this.archive = archive;
            }
        };

        _pPluginElement.setElementAdjustAlpha = function (adjustalpha)
        {
            if (this.adjustalpha != adjustalpha)
            {
                this.adjustalpha = adjustalpha;
            }
        };

        _pPluginElement.setElementUsePersistData = function (usepersistdata)
        {
            if (this.usepersistdata != usepersistdata)
            {
                this.usepersistdata = usepersistdata;
            }
        };

        _pPluginElement.getElementParam = function (name)
        {
            if (this._plugin_object)
            {
                return this._plugin_object.getProperty(name);
            }
            else
            {
                var params = this._params;
                return params.get_item(name);
            }
        };
        _pPluginElement.setElementParam = function (name, value)
        {
            if (this._plugin_object)
            {
                if (name && value)
                {
                    this._plugin_object.setProperty(name, value);
                }
            }
            else
            {
                var params = this._params;
                if (params.get_item(name))
                    params.set_item(name, value);
                else
                    params.add_item(name, value);
            }
        };

        _pPluginElement.setElementPluginSrc = function (src)
        {
            if (this.pluginsrc != src)
            {
                this.pluginsrc = src;
            }
        };

        _pPluginElement.setElementPluginPage = function (pluginpage)
        {
            if (this.pluginpage != pluginpage)
            {
                this.pluginpage = pluginpage;
            }
        };

        _pPluginElement.setElementWindowed = function (windowed)
        {
            if (this.windowed != windowed)
            {
                this.windowed = windowed;
                if (this.handle)
                {
                    // wrong usage : Before create element handle, this function should called.
                }
            }
        };

        _pPluginElement.setElementEnable = function (enable)
        {
            if (this.enable != enable)
            {
                this.enable = enable;
                if (this.handle)
                {
                    nexacro.__setElementHandleEnable(this.handle, enable);
                }
            }
        };

        _pPluginElement.setElementVisible = function (visible)
        {
            if (this.handle)
            {
                nexacro.__setElementHandleVisible(this.handle, visible);
            }
        };

        _pPluginElement.setElementPopupStyle = function (popupstyle)
        {
            if (this.popupstyle != popupstyle)
            {
                this.popupstyle = popupstyle;
            }
        };

        //for only android mobile.
        _pPluginElement._setElementPluginName = function (pluginname)
        {
            if (this._pluginname != pluginname)
            {
                this._pluginname = pluginname;
            }
        };

        _pPluginElement.callMethod = function ()
        {
            if (arguments.length < 1)
                return;

            if (this._plugin_object)
            {
                var name = arguments[0];
                switch (arguments.length)
                {
                    case 2:
                        return this._plugin_object.callMethod(name, arguments[1]);
                        break;
                    case 3:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2]);
                        break;
                    case 4:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3]);
                        break;
                    case 5:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;
                    case 6:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;
                    case 7:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                        break;
                    case 8:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                        break;
                    case 9:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                        break;
                    case 10:
                        return this._plugin_object.callMethod(name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                        break;
                    default:
                        return this._plugin_object.callMethod(name);
                }
            }
        };

        _pPluginElement._getPluginObject = function ()
        {
            if (this._plugin_object)
            {
                return this._plugin_object;
            }
            return null;
        };

        _pPluginElement.install = function ()
        {
            if (this.handle && this.codebase)
            {
                nexacro.__callPluginElementHandleInstall(this.handle);
            }
        };

        _pPluginElement.isInstalled = function ()
        {
            if (this.handle)
            {
                return nexacro.__getPluginElementHandleIsInstalled(this.handle);
            }
            return false;
        };

        _pPluginElement.isLoaded = function ()
        {
            if (this.handle)
            {
                return nexacro.__isPluginElementHandleLoaded(this.handle);
            }
            return false;
        };

        _pPluginElement.addEventHandler = function (name, callback)
        {
            if (this.handle && this.classid == "" && this.mimetype)
            {
                var nameFromToStringRegex = /^function\s?([^\s(]*)/;
                var paramsFromToStringRegex = /\(\)|\(.+\)/;
                var params = callback.toString().match(paramsFromToStringRegex)[0];
                var eventValue = name + params;
                var callfunc;

                var parentFrame, parentFrame2;
                parentFrame = this.component.parent;
                if (parentFrame)
                {
                    callfunc = "." + this.component.id + '["' + name + '"]; \n';
                    callfunc += 'if (eventFn) eventFn._firePluginEvent' + params + ';';
                    do
                    {
                        if (parentFrame instanceof nexacro.MainFrame)
                        {
                            callfunc = 'var eventFn = nexacro.getApplication().mainframe' + callfunc;
                            break;
                        }
                        if (parentFrame instanceof nexacro.ChildFrame)
                        {
                            parentFrame2 = parentFrame.parent;
                            if (parentFrame2)
                            {
                                if (parentFrame2 instanceof nexacro.FrameSet ||
                                    parentFrame2 instanceof nexacro.VFrameSet ||
                                    parentFrame2 instanceof nexacro.HFrameSet ||
                                    parentFrame2 instanceof nexacro.ChildFrame)
                                {
                                    if (parentFrame2._frames && parentFrame2._frames.length)
                                    {
                                        var frmidx;
                                        var frmlen = parentFrame2._frames.length;
                                        for (frmidx = 0; frmidx < frmlen; frmidx++)
                                        {
                                            if (parentFrame2._frames[frmidx] == parentFrame)
                                            {
                                                callfunc = '._frames[' + frmidx + ']' + callfunc;
                                                break;
                                            }
                                        }
                                    }
                                }
                                else if (parentFrame2 instanceof nexacro.MainFrame)
                                {
                                    callfunc = '.frame' + callfunc;
                                }
                                else if (parentFrame2 instanceof nexacro.Form)
                                {
                                    callfunc = '.' + parentFrame.id + callfunc;
                                }
                            }
                        }
                        else if (parentFrame instanceof nexacro.FrameSet ||
                                 parentFrame instanceof nexacro.VFrameSet ||
                                 parentFrame instanceof nexacro.HFrameSet)
                        {
                            parentFrame2 = parentFrame.parent;
                            if (parentFrame2)
                            {
                                if (parentFrame2._frames && parentFrame2._frames.length)
                                {
                                    var frmidx;
                                    var frmlen = parentFrame2._frames.length;
                                    for (frmidx = 0; frmidx < frmlen; frmidx++)
                                    {
                                        if (parentFrame2._frames[frmidx] == parentFrame)
                                        {
                                            callfunc = '._frames[' + frmidx + ']' + callfunc;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        else if (parentFrame instanceof nexacro.Div)
                        {
                            callfunc = '.' + parentFrame.id + callfunc;
                        }
                        else if (parentFrame instanceof nexacro.Form)
                        {
                            callfunc = '.form' + callfunc;
                        }
                        parentFrame = parentFrame.parent;
                    } while (parentFrame);
                }
                callfunc = 'callback = function' + params + '\n{\n' + callfunc + "\n}";
                nexacro.__appendGlobalScript(name, eval(callfunc));
            }
            else
            {
                this._events.add_item(name, callback);
            }
        };

        _pPluginElement.removeEventHandler = function (name, callback)
        {
            if (this.handle && this.classid == "" && this.mimetype)
            {
                nexacro.__removeGlobalScript(name);
            }
            else
            {
                this._events.delete_item(name);
            }
        };

        _pPluginElement.updateWindow = function ()
        {
            if (this.windowed == true)
            {
                nexacro.__updatePluginElementHandleWindow(this.handle);
            }
        };

        _pPluginElement.setElementMovie = function (movie)
        {
            this.setElementParam("movie", movie);
        };

        _pPluginElement._play = function ()
        {
        };

        _pPluginElement._stopPlay = function ()
        {
        };
        _pPluginElement.getProperty = _pPluginElement.getElementParam;
        _pPluginElement.setProperty = _pPluginElement.setElementParam;
        _pPluginElement.setElementPluginMIMEType = nexacro._emptyFn;
        _pPluginElement._setElementFocus = _pPluginElement.setElementFocus;
        // end of PluginElement


        //==============================================================================
        // nexacro.WindowedPluginElement : <DIV><iframe>...</iframe></DIV>
        // iframe
        //==============================================================================	
        //nexacro.WindowedPluginElement = function (parent_elem)
        //{
        //    this.parent = parent_elem;
        //    this.parent_elem = parent_elem;
        //    this.parent_elem.windowed = true;

        //    this._params = new nexacro.Collection();
        //    this._events = new nexacro.Collection();
        //};

        //var _pWindowedPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro.WindowedPluginElement);
        //nexacro.WindowedPluginElement.prototype = _pWindowedPluginElement;
        //_pWindowedPluginElement._type_name = "WindowedPluginElement";

        //_pWindowedPluginElement.windowed = true; 
        //_pWindowedPluginElement.classid = ""; 
        //_pWindowedPluginElement.src = "";

        //_pWindowedPluginElement.initEvent = function ()
        //{
        //    if (this.handle)
        //    {
        //        nexacro._observeWrapperEvent(this.handle, null, "on_plugin_event", this.on_plugin_event, -1, null);
        //    }
        //};

        //_pWindowedPluginElement.on_plugin_event = function (evt_id, args)
        //{
        //    var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
        //    if (comp)
        //    {
        //        if (comp[evt_id])
        //        {
        //            var listener = comp[evt_id];
        //            listener._fireEvent(this, args);
        //        }
        //    }
        //};


        //delete _pWindowedPluginElement; 

        //==============================================================================
        // nexacro._PluginObject : 
        //==============================================================================
        nexacro._PluginObject = function ()
        {
        };

        var __pPluginObject = nexacro._createPrototype(nexacro.Object, nexacro._PluginObject);
        nexacro._PluginObject.prototype = __pPluginObject;
        __pPluginObject._type_name = "PluginObject";
        __pPluginObject.handle = null;

        __pPluginObject.getProperty = function (name)
        {
            if (this.handle)
            {
                if (name)
                {
                    var value = nexacro.__getPluginObjectHandleAttribute(this.handle, name);
                    if (value != null && typeof (value) == "object")
                    {
                        var pobject = new nexacro._PluginObject;
                        pobject.handle = value;
                        return pobject;
                    }
                    return value;
                }
            }
        };

        __pPluginObject.setProperty = function (name, value)
        {
            if (this.handle)
            {
                if (name && value)
                {
                    nexacro.__setPluginObjectHandleAttribute(this.handle, name, value);
                }
            }
        };

        __pPluginObject.callMethod = function ()
        {
            if (arguments.length < 1)
                return;

            if (this.handle)
            {
                var name = arguments[0];
                var value;

                switch (arguments.length)
                {
                    case 2:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1]);
                        break;
                    case 3:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2]);
                        break;
                    case 4:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3]);
                        break;
                    case 5:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;
                    case 6:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;
                    case 7:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                        break;
                    case 8:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                        break;
                    case 9:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                        break;
                    case 10:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                        break;
                    default:
                        value = nexacro.__callPluginObjectHandleMethod(this.handle, name);
                }
                if (value != null && typeof (value) == "object")
                {
                    var pobject = new nexacro._PluginObject;
                    pobject.handle = value;

                    return pobject;
                }
                return value;
            }
        };


        __pPluginObject.callScriptMethod = function ()
        {
            if (arguments.length < 1)
                return;

            if (this.handle)
            {
                var name = arguments[0];
                var value;

                switch (arguments.length)
                {
                    case 2:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1]);
                        break;
                    case 3:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2]);
                        break;
                    case 4:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3]);
                        break;
                    case 5:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4]);
                        break;
                    case 6:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;
                    case 7:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                        break;
                    case 8:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
                        break;
                    case 9:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
                        break;
                    case 10:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
                        break;
                    default:
                        value = nexacro.__callPluginObjectHandleScriptMethod(this.handle, name);
                }
                if (value != null && typeof (value) == "object")
                {
                    var pobject = new nexacro._PluginObject;
                    pobject.handle = value;

                    return pobject;
                }
                return value;
            }
        };


        __pPluginObject.destroy = function ()
        {
            if (this.handle)
            {
                nexacro.__destroyPluginObjectHandle(this.handle);
                this.handle = null;
            }
        };



        //==============================================================================
        // nexacro.WebBrowserPluginElement : 
        //==============================================================================
        nexacro._WebBrowserPluginElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.parent_elem.windowed = true;

            this._params = new nexacro.Collection();
            this._events = new nexacro.Collection();
        };

        var __pWebBrowserPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro._WebBrowserPluginElement);
        nexacro._WebBrowserPluginElement.prototype = __pWebBrowserPluginElement;

        __pWebBrowserPluginElement._type_name = "WebBrowserPluginElement";

        __pWebBrowserPluginElement.windowed = true;
        __pWebBrowserPluginElement.classid = "{8856F961-340A-11D0-A96B-00C04FD705A2}";
        __pWebBrowserPluginElement.src = "";
        __pWebBrowserPluginElement._pluginname = "WebBrowser"; //android에서 사용. 

        //===============================================================
        // nexacro.WindowedWebBrowserElement : Create & Destroy & Update
        //===============================================================
        __pWebBrowserPluginElement.initEvent = function ()
        {
            if (this.handle)
            {
                nexacro._observeWrapperEvent(this.handle, null, "_on_plugin_event", this._on_plugin_event);
            }
        };

        __pWebBrowserPluginElement._on_plugin_event = function (evt_id, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg8, arg9)
        {  
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);
            if (comp)
            {
                if (evt_id == "DocumentComplete")
                {
                    var locationURL = this.getElementParam("LocationURL");
                    if (locationURL == arg1)
                    {
                        evt_id = "onloadcompleted";
                        if (comp.on_load_handler)
                        {
                            var _win = comp._getWindow();
                            var cur_focus_paths = _win.getCurrentFocusPaths();
                            var pThis = comp;

                            while (pThis && pThis._is_nc_control)
                            {
                                pThis = pThis.parent;
                            }

                            if (!pThis)
                                return;

                            var focuspath_index = -1;
                            if (cur_focus_paths)
                            {
                                focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
                            }
                            var len = cur_focus_paths.length;

                            if (focuspath_index < 0)
                            {
                                cur_focus_paths[len - 1].on_apply_custom_setfocus();
                            }
                            nexacro.__restorePluginElementHandleWindowFocus(this.handle);
                            return comp.on_load_handler(arg1);
                        }
                    }
                }
                else if (evt_id == "TitleChange")
                {
                    comp.on_fire_onusernotify(comp, arg0);
                }

                if (comp[evt_id])
                {
                    var listener = comp[evt_id];
                    if (listener)
                    {
                        return listener._fireEvent(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg8, arg9);
                    }
                }

            }
        };

        __pWebBrowserPluginElement._getDoc = function ()
        {
            return null;
        };

        __pWebBrowserPluginElement._setUrl = function (url)
        {
            if (this._plugin_object)
            {
                this._setSharedVariablesToCookie(url);
                this._plugin_object.callMethod("Navigate", url);
            }
        };

        __pWebBrowserPluginElement._setGo = function ()
        {
            if (this._plugin_object)
            {
                this._plugin_object.callMethod("Refresh");
            }
        };

        __pWebBrowserPluginElement._setBack = function ()
        {
            if (this._plugin_object)
            {
                this._plugin_object.callMethod("GoBack");
            }
        };


        __pWebBrowserPluginElement._setForward = function ()
        {
            if (this._plugin_object)
            {
                this._plugin_object.callMethod("GoForward");
            }
        };

        __pWebBrowserPluginElement.callMethod = function ()
        {
            if (arguments.length < 1)
                return;

            if (this._plugin_object)
            {
                return nexacro._pluginCallMethod(this, arguments);
            }
        };

        __pWebBrowserPluginElement._setSharedVariablesToCookie = function (url)
        {
            var cookies = "";
        	var enginecookievars = nexacro._getCookieVariables();
        	if (enginecookievars)
        	{
        		var cookievar = [];
        		for (var prop in enginecookievars)
        		{
        		    cookies += (prop + '=' + enginecookievars[prop].value + ';'); // "a=A;b=B;...;"
        		}
        	}

        	if (cookies)
                nexacro._setSharedVariablesToCookie(url, cookies);
        };

        nexacro._MediaPlayerPluginElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.parent_elem.windowed = true;

            this._params = new nexacro.Collection();
            this._events = new nexacro.Collection();
        };

        var __pMediaPlayerPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro._MediaPlayerPluginElement);
        nexacro._MediaPlayerPluginElement.prototype = __pMediaPlayerPluginElement;
        __pMediaPlayerPluginElement._type_name = "MediaPlayerPluginElement";
        __pMediaPlayerPluginElement.classid = "{6bf52a52-394a-11d3-b153-00c04f79faa6}";

        //===============================================================
        // nexacro.MediaPlayerPluginElement : Properties
        //===============================================================
        __pMediaPlayerPluginElement.set_volume = function (v)
        {
        };

        //===============================================================
        // nexacro.MediaPlayerPluginElement : Methods
        //===============================================================
        __pMediaPlayerPluginElement._play = function ()
        {
            var object = this._getPluginObject();
            if (object)
            {
                var controls = object.getProperty("controls");
                if (controls)
                {
                    controls.callMethod("play");
                    controls.destroy();
                }
            }
        };

        __pMediaPlayerPluginElement._pause = function ()
        {
            var object = this._getPluginObject();
            if (object)
            {
                var controls = object.getProperty("controls");
                if (controls)
                {
                    controls.callMethod("pause");
                    controls.destroy();
                }
            }
        };

        __pMediaPlayerPluginElement._rewind = function ()
        {
            var object = this._getPluginObject();
            if (object)
            {
                var controls = object.getProperty("controls");
                if (controls)
                {
                    controls.callMethod("fastReverse");
                    controls.destroy();
                }
            }

        };

        __pMediaPlayerPluginElement._stop = function ()
        {
            var object = this._getPluginObject();
            if (object)
            {
                var controls = object.getProperty("controls");
                if (controls)
                {
                    controls.callMethod("stop");
                    controls.destroy();
                }
            }
        };

        __pMediaPlayerPluginElement._togglemute = function ()
        {
            var object = this._getPluginObject();
            if (object)
            {
                var settings = object._getPluginObject("settings");
                if (settings)
                {
                    var mute = settings.getProperty("mute");
                    if (mute == true)
                        settings.setProperty("mute", false);
                    else
                        settings.setProperty("mute", true);
                    settings.destroy();
                }
            }
        };

        __pMediaPlayerPluginElement._setMediaEnable = __pMediaPlayerPluginElement._setMediaControl = __pMediaPlayerPluginElement._setMediaUrl = __pMediaPlayerPluginElement._setMediaCurrentTime = __pMediaPlayerPluginElement._setMediaLoop = __pMediaPlayerPluginElement._setMediaAutoPlay = __pMediaPlayerPluginElement._setMediaVolume = nexacro.PluginElement.prototype.setElementParam;



        //for only android mobile.
        //start				
        nexacro._GoogleMapPluginElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this.parent_elem.windowed = true;

            this._params = new nexacro.Collection();
            this._events = new nexacro.Collection();
        };

        //Google Map
        var __pGoogleMapPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro._GoogleMapPluginElement);
        nexacro._GoogleMapPluginElement.prototype = __pGoogleMapPluginElement;
        __pGoogleMapPluginElement._type_name = "GoogleMapElement";
        __pGoogleMapPluginElement._pluginname = "GoogleMap"; //android에서 사용. 

        //===============================================================
        // nexacro.GoogleMapPluginElement : Create & Destroy & Update
        //===============================================================
        __pGoogleMapPluginElement.destroy = function ()
        {
            nexacro.PluginElement.prototype.destroy.call(this);
        };

        //===============================================================
        // nexacro.GoogleMapPluginElement : Properties
        //===============================================================


        //===============================================================
        // nexacro.GoogleMapPluginElement : Methods
        //===============================================================
        __pGoogleMapPluginElement._setLoad = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("load", params);
            }
        };

        __pGoogleMapPluginElement._setDestroy = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("destroy", params);
            }
        };

        __pGoogleMapPluginElement._getAddress = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("getAddress", params);
            }
        };

        __pGoogleMapPluginElement._getCoordinates = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("getCoordinates", params);
            }
        };

        __pGoogleMapPluginElement._setRemove = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("removeItem", params);
            }
        };

        __pGoogleMapPluginElement._setMarker = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("Marker", params);
            }
        };

        __pGoogleMapPluginElement._setPolyline = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("Polyline", params);
            }
        };

        __pGoogleMapPluginElement._setPolygon = function (params)
        {
            if (this._plugin_object)
            {
                this.callMethod("Polygon", params);
            }
        };

        //===============================================================
        // nexacro.GoogleMapPluginElement : Logical Part
        //===============================================================
        __pGoogleMapPluginElement.initEvent = function ()
        {
            if (this.handle)
            {
                nexacro._observeWrapperEvent(this.handle, null, "_on_plugin_event", this._on_plugin_event, -1, null);
            }
        };

        __pGoogleMapPluginElement._on_plugin_event = function (evt_id, args)
        {
            var comp = (this.parent_elem ? this.parent_elem.linkedcontrol : null);

            if (comp)
            {
                var objArgs = eval("(" + args + ")");
                if (evt_id == "GoogleMap")
                {
                    if (objArgs.eventid == "onload")
                    {
                        if (comp.on_load_handler)
                        {
                            return comp.on_load_handler(objArgs.eventid, objArgs.centerlocation, objArgs.coordinates, objArgs.viewmode, objArgs.zoomlevel, objArgs.addresses);
                        }
                    }
                    else if (objArgs.eventid == "onerror")
                    {
                        if (comp.on_error_handler)
                        {
                            return comp.on_error_handler(objArgs.eventid, objArgs.errormsg, objArgs.errorcode);
                        }
                    }
                    else if (objArgs.eventid == "onrecvsuccess")
                    {
                        if (comp.on_recvsuccess_handler)
                        {
                            return comp.on_recvsuccess_handler(objArgs.eventid, objArgs.centerlocation, objArgs.coordinates, objArgs.viewmode, objArgs.zoomlevel, objArgs.addresses);
                        }
                    }
                    else if (objArgs.eventid == "onclick")
                    {
                        if (comp.on_click_handler)
                        {
                            return comp.on_click_handler(objArgs.eventid, objArgs.location);
                        }
                    }
                    else if (objArgs.eventid == "ondrag")
                    {
                        if (comp.on_drag_handler)
                        {
                            return comp.on_drag_handler(objArgs.eventid, objArgs.location);
                        }
                    }
                    else if (objArgs.eventid == "oncenterchanged")
                    {
                        if (comp.on_centerchanged_handler)
                        {
                            return comp.on_centerchanged_handler(objArgs.eventid, objArgs.centerlocation, objArgs.coordinates, objArgs.viewmode, objArgs.zoomlevel, objArgs.addresses);
                        }
                    }
                    else if (objArgs.eventid == "onmapdragstart")
                    {
                        if (comp.on_mapdragstart_handler)
                        {
                            return comp.on_mapdragstart_handler(objArgs.eventid, objArgs.location);
                        }
                    }
                    else if (objArgs.eventid == "onmapdrag")
                    {
                        if (comp.on_mapdrag_handler)
                        {
                            return comp.on_mapdrag_handler(objArgs.eventid, objArgs.location);
                        }
                    }
                    else if (objArgs.eventid == "onmapdragend")
                    {
                        if (comp.on_mapdragend_handler)
                        {
                            return comp.on_mapdragend_handler(objArgs.eventid, objArgs.location);
                        }
                    }
                }
            }
        };
        //end

        nexacro.CanvasElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
        };

        var _pCanvasElement = nexacro._createPrototype(nexacro.Element, nexacro.CanvasElement);
        nexacro.CanvasElement.prototype = _pCanvasElement;

        // overide nexacro.Object
        _pCanvasElement._type_name = "CanvasElement";

        //==== defaule values =========//
        _pCanvasElement.lineOffset = 0.5;

        _pCanvasElement.scale = 10;
        _pCanvasElement.half_scale = 5;
        _pCanvasElement.scalex = 0;
        _pCanvasElement.scaley = 0;

        //xp14 attribute
        _pCanvasElement.fillStyle = null;
        _pCanvasElement.strokeColor = "#000000";
        _pCanvasElement.lineCap = 'butt';
        _pCanvasElement.lineJoin = 'miter';
        _pCanvasElement.lineWidth = 1;
        _pCanvasElement.miterLimit = 10;
        _pCanvasElement.shadowColor = null;
        _pCanvasElement.shadowOffsetX = 0;
        _pCanvasElement.shadowOffsetY = 0;
        _pCanvasElement.shadowBlur = 0;
        _pCanvasElement.font = null;
        _pCanvasElement.textAlign = "left";
        _pCanvasElement.textBaseline = "top";
        _pCanvasElement.globalAlpha = 1;
        _pCanvasElement.globalCompositeOperation = 1;

        //------------- internal variable -------------//
        _pCanvasElement._fillStyle_rgb = "#000000";
        _pCanvasElement.strokeStyle_rgb = "#000000";
        _pCanvasElement.shadowColor_rgb = "#000000";

        _pCanvasElement.create = function (win)
        {
            // parent is always control element
            var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle)
            {
                var handle = this.handle;
                if (!handle)
                {
                    this.owner_elem = owner_elem;
                    var win_handle = win.handle || owner_elem._getRootWindowHandle();
                    handle = nexacro.__createCanvasElementHandle(this, win_handle, this.left, this.top, this.width, this.height);

                    if (!this.font)//초기값 폰트 설정
                    {
                        this.font = new nexacro.FontObject("8px Arial");
                        nexacro.__setCanvasElementHandleFontObject(handle, this.font);
                    }

                    // update Element's properties to DOM
                    if (!this.visible)
                    {
                        nexacro.__setElementHandleVisible(handle, false);
                    }

                    // append TO Parent Element
                    this.handle = handle;
                    nexacro.__appendElementHandle(owner_elem.dest_handle, handle);
                }
            }
        };

        _pCanvasElement.destroy = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                var owner_handle = null;   // unlink 인 경우 owner_elem이 null이다.
                if (this.owner_elem && this.owner_elem.handle)
                {
                    owner_handle = this.owner_elem.handle;
                    nexacro.__destroyElementHandle(owner_handle, handle);
                }

                this.owner_elem = null;
                this.handle = null;
            }
            this.parent = null;
            this.parent_elem = null;
        };

        //##### Basic set properties #####
        _pCanvasElement.createPattern = function ()
        {
            // implement
            return null;
        };

        _pCanvasElement.createLinearGradient = function (aX0, aY0, aX1, aY1)
        {
            var handle = this.handle;
            if (handle)
            {
                var gradient = new nexacro._CanvasGradient('linear');
                gradient.x0 = aX0;
                gradient.y0 = aY0;
                gradient.x1 = aX1;
                gradient.y1 = aY1;
                return gradient;
            }
            return null;
        };

        _pCanvasElement.createRadialGradient = function (aX0, aY0, aR0, aX1, aY1, aR1)
        {
            var handle = this.handle;
            if (handle)
            {
                var gradient = new nexacro._CanvasGradient('radial');
                gradient.x0 = x0;
                gradient.y0 = y0;
                gradient.r0 = r0;
                gradient.x1 = x1;
                gradient.y1 = y1;
                gradient.r1 = r1;
                return gradient;
            }
            return null;
        };

        _pCanvasElement.setElementFillStyle = function (fillstyle)
        {
            var handle = this.handle;
            if (handle && fillstyle)
            {
                this.fillStyle = fillstyle;
                if (fillstyle instanceof nexacro._ColorObject)
                    nexacro.__setCanvasElementHandleFillColor(handle, nexacro._getWebColorFromXreColor(fillstyle.value));
                else
                    nexacro.__setCanvasFillGradation(handle, fillstyle);
            }
        };

        _pCanvasElement.setElementFont = function (font)
        {
            if (!font) return;
            this.font = font;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setCanvasElementHandleFontObject(handle, font);
            }
        };

        _pCanvasElement.setElementGlobalAlpha = function (alpha)
        {
            // min, max 처리
            this.globalAlpha = alpha;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setCanvasElementHandleGlobalAlpha(handle, alpha);
            }
        };

        _pCanvasElement.setElementGlobalCompositeOperation = function (operation)
        {
            this.globalCompositeOperation = operation;
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setCanvasElementHandleGlobalCompositoperation(handle, operation);
            }
        };

        _pCanvasElement.setElementLineCap = function (captype)
        {
            var handle = this.handle;
            if (handle)
            {
                this.lineCap = captype;
                nexacro.__setCanvasElementHandleLineCap(handle, captype);
            }
        };

        _pCanvasElement.setElementLineJoin = function (jointype)
        {
            var handle = this.handle;
            if (handle)
            {
                this.lineJoin = jointype;
                nexacro.__setCanvasElementHandleLineJoin(handle, jointype);
            }
        };

        _pCanvasElement.setElementLineWidth = function (size)
        {
            var handle = this.handle;
            if (handle && isFinite(size))
            {
                this.lineWidth = size;
                this.lineOffset = Math.round(size / 2);
                nexacro.__setCanvasElementHandleLineWidth(handle, size);
            }
        };

        _pCanvasElement.setElementMiterLimit = function (size)
        {
            var handle = this.handle;
            if (handle)
            {
                this.miterLimit = size;
                nexacro.__setCanvasElementHandleMiterLimit(handle, size);
            }
        };

        _pCanvasElement.setElementShadowBlur = function (fact)
        {
            var handle = this.handle;
            if (handle)
            {
                this.shadowBlur = fact;
                nexacro.__setCanvasElementHandleShadowBlur(handle, fact);
            }
        };

        _pCanvasElement.setElementShadowColor = function (color)
        {
            var handle = this.handle;
            if (handle)
            {
                this.shadowColor = color;
                nexacro.__setCanvasElementHandleShadowColor(handle, nexacro._getWebColorFromXreColor(color.value));
            }
        };

        _pCanvasElement.setElementShadowOffsetX = function (sx)
        {
            var handle = this.handle;
            if (handle)
            {
                this.shadowOffsetX = sx;
                nexacro.__setCanvasElementHandleShadowOffsetx(handle, sx);
            }
        };

        _pCanvasElement.setElementShadowOffsetY = function (sy)
        {
            var handle = this.handle;
            if (handle)
            {
                this.shadowOffsetY = sy;
                nexacro.__setCanvasElementHandleShadowOffsety(handle, sy);
            }
        };

        _pCanvasElement.setElementStrokeStyle = function (color)
        {
            var handle = this.handle;
            if (handle && color)
            {
                this.strokeStyle = color;
                nexacro.__setCanvasElementHandleStrokeColor(handle, color);
            }
        };

        _pCanvasElement.setElementTextAlign = function (textalign)
        {
            var handle = this.handle;
            if (handle)
            {
                this.textAlign = textalign;
                nexacro.__setCanvasElementHandleTextAlign(handle, textalign);
            }
        };

        _pCanvasElement.setElementTextBaseline = function (basealign)
        {
            var handle = this.handle;
            if (handle)
            {
                this.textBaseline = basealign;
                nexacro.__setCanvasElementHandleTextBaseline(handle, basealign);
            }
        };


        //##### Basic method #####
        _pCanvasElement.arc = function (x, y, r, start_rad, end_rad, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                counterclockwise = (counterclockwise) ? false : counterclockwise;
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r, start_rad, end_rad, counterclockwise);
            }
        };

        _pCanvasElement.arcTo = function (x, y, x2, y2, r)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleArcToPath(handle, x, y, x2, y2, r);
            }
        };

        _pCanvasElement.beginPath = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.bezierCurveTo = function (p1x, p1y, p2x, p2y, x, y)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleBezierCurveToPath(handle, p1x, p1y, p2x, p2y, x, y);
            }
        };

        _pCanvasElement.clearRect = function (x, y, dx, dy)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__clearCanvasElementHandleRect(handle, x, y, dx, dy);
            }
        };

        _pCanvasElement.clip = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__clipCanvasElementHandle(handle);
            }
        };

        _pCanvasElement.closePath = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleClosePath(handle);
            }
        };

        _pCanvasElement.createImageData = function (iWidth, iHeight)
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__createCanvasElementHandleImageData(handle, iWidth, iHeight);
            }
        };

        _pCanvasElement.drawImage = function (_image_handle, x, y, imgwidth, imgheight)
        {
            var handle = this.handle;
            if (handle)
            {
                var absoluteUrl = _image_handle.src;
                if (absoluteUrl && absoluteUrl.substring(0, 4).toLowerCase() == "url(")
                {
                    absoluteUrl = absoluteUrl.substring(5, absoluteUrl.length - 2);
                }
                if (absoluteUrl && !nexacro._isAbsolutePath(absoluteUrl))
                {
                    var base_url = this.parent_elem._getElementBaseUrl();
                    absoluteUrl = nexacro._getImageLocation(absoluteUrl);
                }
                nexacro.__drawCanvasElementHandleImage(handle, absoluteUrl, x, y, imgwidth, imgheight);
            }
        };

        _pCanvasElement.fill = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__fillCanvasElementHandlePath(handle);
            }
        };

        _pCanvasElement.fillRect = function (x, y, dx, dy)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__fillCanvasElementHandleRect(handle, x, y, dx, dy);
            }
        };

        _pCanvasElement.fillText = function (text, x, y, maxwidth)
        {
            var handle = this.handle;
            if (handle)
            {
                var font = this.font;
                if (font)
                    nexacro.__setCanvasElementHandleFontObject(handle, font);

                var color = this.fillStyle;
                if (color)
                    nexacro.__setCanvasElementHandleFillColor(handle, nexacro._getWebColorFromXreColor(color.value));

                nexacro.__fillCanvasElementHandleText(handle, text, x, y, maxwidth);
            }
        };

        _pCanvasElement.getImageData = function (sx, sy, width, height)
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__getCanvasElementHandleImageData(handle, sx, sy, width, height);
            }
        };

        _pCanvasElement.isPointInPath = function (x, y)
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__isPointInCanvasElementHandlePath(handle, x, y);
            }
        };

        _pCanvasElement.lineTo = function (x, y)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleLineToPath(handle, x, y);
            }
        };

        _pCanvasElement.moveTo = function (x, y)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x, y);
            }
        };

        _pCanvasElement.putImageData = function (_image_handle, sx, sy, ix, iy, iwidth, iheight)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__putCanvasElementHandleImageData(handle, _image_handle, sx, sy, ix, iy, iwidth, iheight);
            }
        };

        _pCanvasElement.quadraticCurveTo = function (cp1x, cp1y, cp2x, cp2y)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleQuadraticCurveToPath(handle, cp1x, cp1y, cp2x, cp2y);
            }
        };

        _pCanvasElement.rect = function (x, y, dx, dy)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleRectPath(handle, x, y, dx, dy);
            }
        };

        _pCanvasElement.rotate = function (angle)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__rotateCanvasElementHandle(handle, angle);
            }
        };

        _pCanvasElement.rotate2 = function (radian)
        {
            var handle = this.handle;
            if (handle)
            {
                var angle = radian * Math.PI / 180;
                nexacro.__rotateCanvasElementHandle(handle, angle);
            }
        };

        _pCanvasElement.scale = function (dx, dy)
        {
            var handle = this.handle;
            this.scalex = dx;
            this.scaley = dy;
            if (handle)
            {
                nexacro.__scaleCanvasElementHandle(handle, dx, dy);
            }
        };

        _pCanvasElement.setTransform = function (a, b, c, d, e, f)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__setCanvasElementHandleTransform(handle, a, b, c, d, e, f);
            }
        };

        _pCanvasElement.stroke = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__strokeCanvasElementHandlePath(handle);
            }
        };

        _pCanvasElement.strokeRect = function (x, y, dx, dy)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__strokeCanvasElementHandleRect(handle, x, y, dx, dy);
            }
        };

        _pCanvasElement.strokeText = function (text, tx, ty, maxwidth)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__strokeCanvasElementHandleText(handle, text, tx, ty, maxwidth);
            }
        };

        _pCanvasElement.transform = function (a, b, c, d, e, f)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__transformCanvasElementHandle(handle, a, b, c, d, e, f);
            }
        };

        _pCanvasElement.translate = function (x, y)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__translateCanvasElementHandle(handle, x, y);
            }
        };


        //##### Composite #####
        // CanvasBase.arc();
        _pCanvasElement.arc2 = function (x, y, r, start_deg, end_deg, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                var start_rad = start_deg * Math.PI / 180;
                var end_rad = end_deg * Math.PI / 180;
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r, start_rad, end_rad, counterclockwise);
            }
        };

        _pCanvasElement.circle = function (x, y, r)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r, 0, 2 * Math.PI, true);
            }
        };

        _pCanvasElement.drawStrokeArc = function (x, y, r, start_deg, end_deg, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                this.arc(x, y, r, start_deg, end_deg, counterclockwise);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStrokeArc2 = function (x, y, r, start_deg, end_deg, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                this.arc2(x, y, r, start_deg, end_deg, counterclockwise);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStrokeCircle = function (x, y, r)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r, 0, 2 * Math.PI, true);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        /*
        _pCanvasElement.drawStrokeHalfRect = function (x, y, w, h)
        {
            var handle = this.handle;
	        if (handle)
            {
	            this.halfRect(x, y, w, h);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };
        */

        _pCanvasElement.drawStrokeLine = function (x1, y1, x2, y2)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x1, y1);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x2, y2);
                this.drawStroke();
            }
        };

        _pCanvasElement.drawStrokeVLine = function (x, y1, y2)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x, y1);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x, y2);
                this.drawStroke();
            }
        };

        _pCanvasElement.drawStrokeHLine = function (y, x1, x2)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x1, y);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x2, y);
                this.drawStroke();
            }
        };

        _pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                var gap = this.lineOffset;
                start_deg = start_deg * (Math.PI / 180);
                end_deg = end_deg * (Math.PI / 180);
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r - gap, start_deg, end_deg, counterclockwise);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStrokeInsetCircle = function (x, y, r)
        {
            var handle = this.handle;
            if (handle)
            {
                var gap = this.lineOffset;
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r - gap, 0, 2 * Math.PI, true);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStrokeInsetRect = function (x, y, w, h)
        {
            var handle = this.handle;
            if (handle)
            {
                this.insetRect(x, y, w, h);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStrokeRect = function (x, y, w, h)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleRectPath(handle, x, y, w, h);
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawFillRect = function (x, y, dx, dy)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleRectPath(handle, x, y, dx, dy);
                nexacro.__fillCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawFillText = function (text, x, y, maxwidth)
        {
            var handle = this.handle;
            if (handle)
            {
                var font = this.font;
                if (font)
                    nexacro.__setCanvasElementHandleFontObject(handle, font);

                var color = this.fillStyle;
                if (color)
                    nexacro.__setCanvasElementHandleFillColor(handle, nexacro._getWebColorFromXreColor(color.value));

                nexacro.__setCanvasElementHandleTextBaseline(handle, this.textBaseline);
                nexacro.__fillCanvasElementHandleText(handle, text, x, y, maxwidth);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.endDraw = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleBeginPath(handle);
                nexacro.__plotCanvasElementHandleClosePath(handle);
            }
        };

        _pCanvasElement.drawFill = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__fillCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawStroke = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__strokeCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawFillArc = function (x, y, r, start_rad, end_rad, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                this.arc(x, y, r, start_rad, end_rad, counterclockwise);
                nexacro.__plotCanvasElementHandleClosePath(handle);
                nexacro.__fillCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawFillArc2 = function (x, y, r, start_deg, end_deg, counterclockwise)
        {
            var handle = this.handle;
            if (handle)
            {
                this.arc2(x, y, r, start_deg, end_deg, counterclockwise);
                nexacro.__plotCanvasElementHandleClosePath(handle);
                nexacro.__fillCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        _pCanvasElement.drawFillCircle = function (x, y, r)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleArcPath(handle, x, y, r, 0, 2 * Math.PI, true);
                nexacro.__fillCanvasElementHandlePath(handle);
                nexacro.__plotCanvasElementHandleBeginPath(handle);
            }
        };

        // this is only for stroke
        /*
        _pCanvasElement.halfRect = function (x, y, w, h)
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x, y);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x, y + h);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x + w, y + h);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x + w, y);
            }
        };
        */

        _pCanvasElement.hline = function (y, x1, x2)
        {
            this.moveTo(x1, y);
            this.lineTo(x2, y);
        };

        _pCanvasElement.vline = function (x, y1, y2)
        {
            this.moveTo(x, y1);
            this.lineTo(x, y2);
        };

        // this is only for stroke
        _pCanvasElement.insetRect = function (x, y, w, h)
        {
            var handle = this.handle;
            if (handle)
            {
                if (w == 0 || h == 0) return;
                var gap = this.lineOffset;
                var wgap = (w > 0) ? gap : -gap;
                var hgap = (h > 0) ? gap : -gap;
                nexacro.__plotCanvasElementHandleMoveToPath(handle, x + wgap, y + hgap);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x + wgap, y + h - hgap);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x + w - wgap, y + h - hgap);
                nexacro.__plotCanvasElementHandleLineToPath(handle, x + w - wgap, y + hgap);
                nexacro.__plotCanvasElementHandleClosePath(handle);
            }
        };

        _pCanvasElement.measureText = function (text, font)
        {
            var handle = this.handle;
            if (handle)
            {
                if (!font)
                {
                    font = new nexacro.FontObject();
                }
                var obj = nexacro._getTextSize(text, font);
                return { width: obj[0], height: obj[1] };
            }
        };

        _pCanvasElement.save = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                nexacro.__saveCanvasElementHandle(handle);
            }
        };
        _pCanvasElement.restore = function ()
        {
            var handle = this.handle;
            if (handle)
            {
                return nexacro.__restoreCanvasElementHandle(handle);
            }
        };
        /*
        _pCanvasElement.drawBorder = function (x, y, width, height, border, bordertype)
        {
            if (border && !border._is_empty)
	        {
                if (border._linecnt == 1)
                {
			        if (border.width && border.color != "" && border.color != "transparent") 
			        {
			            var color = new nexacro.Style_color(border.color);
			            this.setElementStrokeStyle(color);
				        this.setElementLineWidth(border.width);
				        this.drawStrokeInsetRect(x, y, width, height);
			        }
		        }
		        else if (border._linecnt == 2) 
		        {
			        if (border.top._isValid()) 
			        {
				        this._setLineStyle(border.top);
				        var offset = border.top._width / 2;
				        this.moveTo(x, y + offset);
				        this.lineTo(x + width, y + offset);
				        this.moveTo(x, y + height - offset);
				        this.lineTo(x + width, y + height - offset);
				        this.stroke();
			        }
			        if (border.right._isValid()) 
			        {
				        this._setLineStyle(border.right);
				        var offset = border.right._width / 2;
				        this.moveTo(x + width - offset, y);
				        this.lineTo(x + width - offset, y + height);
				        this.moveTo(x + offset, y);
				        this.lineTo(x + offset, y + height);
				        this.stroke();
			        }
		        }
		        else if (border._linecnt == 3) 
		        {
			        if (border.top._isValid()) 
			        {
				        this._setLineStyle(border.top);
				        var offset = border.top._width / 2;
				        this.moveTo(x, y + offset);
				        this.lineTo(x + width, y + offset);
				        this.stroke();
			        }
			        if (border.right._isValid()) 
			        {
				        this._setLineStyle(border.right);
				        var offset = border.right._width / 2;
				        this.moveTo(x + width - offset, y);
				        this.lineTo(x + width - offset, y + height);
				        this.moveTo(x + offset, y);
				        this.lineTo(x + offset, y + height);
				        this.stroke();
			        }
			        if (border.bottom._isValid()) 
			        {
				        this._setLineStyle(border.bottom);
				        var offset = border.bottom._width / 2;
				        this.moveTo(x, y + width - offset);
				        this.lineTo(x + width, y + width - offset);
				        this.stroke();
			        }
		        }
		        else 
		        {
			        if (border.top._isValid()) 
			        {
				        this._setLineStyle(border.top);
				        var offset = border.top._width / 2;
				        this.moveTo(x, y + offset);
				        this.lineTo(x + width, y + offset);
				        this.stroke();
			        }
			        if (border.right._isValid()) 
			        {
				        this._setLineStyle(border.right);
				        var offset = border.right._width / 2;
				        this.moveTo(x + width - offset, y);
				        this.lineTo(x + width - offset, y + height);
				        this.stroke();
			        }
			        if (border.bottom._isValid()) 
			        {
				        this._setLineStyle(border.bottom);
				        var offset = border.bottom._width / 2;
				        this.moveTo(x, y + width - offset);
				        this.lineTo(x + width, y + width - offset);
				        this.stroke();
			        }
			        if (border.left._isValid()) 
			        {
				        this._setLineStyle(border.left);
				        var offset = border.left._width / 2;
				        this.moveTo(x + offset, y);
				        this.lineTo(x + offset, y + height);
				        this.stroke();
			        }
		        }
	        }
        };
        */

        _pCanvasElement.toDataURL = function ()
        {
            //Todo..            
        };

        //arc2 와 동일 
        //_pCanvasElement.drawArc = function (x, y, r, start_deg, end_deg, bClockwise, bNormal)
        //{
        //    //Todo..            
        //};

        //##### internal function #####
        _pCanvasElement._setLineStyle = function (line)
        {
            if (line && line._isValid())
            {
                this.setElementStrokeStyle(line.color);
                this.setElementLineWidth(line.width);
            }
        };

        _pCanvasElement._setPenStyle = function (pen)
        {
            if (pen && pen._isValid())
            {
                this.setElementStrokeStyle(pen.color);
                this.setElementLineWidth(pen.width);
            }
        };

        _pCanvasElement._moveCanvas = function (left, top, width, height)
        {
            this.left = left || 0;
            this.top = top || 0;
            this.width = width || 0;
            this.height = height || 0;

            var handle = this.handle;
            if (handle)
            {
                nexacro.__setElementHandleSize(handle, width, height);
                nexacro.__setElementHandlePosition(handle, left, top);
            }
        };

        _pCanvasElement._getElementScreenXY =  nexacro._emptyFn;

        nexacro._CanvasGradient = function (type)
        {
            this.type = type;
            this.x0 = 0;
            this.y0 = 0;
            this.r0 = 0;
            this.x1 = 0;
            this.y1 = 0;
            this.r1 = 0;
            this.colors = [];
        };

        var __pCanvasGradient = nexacro._CanvasGradient.prototype;

        __pCanvasGradient.addColorStop = function (aOffset, aColor)
        {
            var color = nexacro._getWebColorFromXreColor(aColor);
            this.colors.push({ offset: aOffset, color: color });
        };

        //======================================================================
        // nexacro.GridScrollableControlElement - this Element is scrollable ControlElement
        //======================================================================
        // this GridScrollableControlElement has ScrollControlElement
        nexacro.GridScrollableControlElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            // set container Element
            this._target_vscroll_elements = null; //control_elements
            this._target_hscroll_elements = null; //control_elements
            var client_element = new nexacro._ContainerElement(this);
            this._client_elem = client_element;
        };
        var _pGridScrollableControlElement = nexacro._createPrototype(nexacro.ScrollableControlElement, nexacro.GridScrollableControlElement);
        nexacro.GridScrollableControlElement.prototype = _pGridScrollableControlElement;
        // overide nexacro.Object
        _pGridScrollableControlElement._type_name = "GridScrollableControlElement";

        //==== defaule values =========//
        //_pGridScrollableControlElement.scroll_left = 0;
        //_pGridScrollableControlElement.scroll_top = 0;
        //_pGridScrollableControlElement.container_maxwidth = 0;
        //_pGridScrollableControlElement.container_maxheight = 0;
        //_pGridScrollableControlElement._hscroll_visible = false;
        //_pGridScrollableControlElement._vscroll_visible = false;
        //_pGridScrollableControlElement._hscroll_height = 0;
        //_pGridScrollableControlElement._vscroll_width = 0;
        //_pGridScrollableControlElement._hscroll_left = 0;
        //_pGridScrollableControlElement._hscroll_top = 0;
        //_pGridScrollableControlElement._hscroll_width = 0;
        //_pGridScrollableControlElement._vscroll_left = 0;
        //_pGridScrollableControlElement._vscroll_top = 0;
        //_pGridScrollableControlElement._vscroll_height = 0;
        //_pGridScrollableControlElement.hscroll_limit = 0;
        //_pGridScrollableControlElement.vscroll_limit = 0;
        //_pGridScrollableControlElement._scroll_showtype = -1; // 0 : auto, 1 : fix, 2 : overlap
        //_pGridScrollableControlElement._scrollview_width_top = 0;
        ////==== internal handles =========//
        //_pGridScrollableControlElement._hscroll_control = null;
        //_pGridScrollableControlElement._vscroll_control = null;
        //_pGridScrollableControlElement._resizebutton_element = null;
        ////==== default flags =========//
        //_pGridScrollableControlElement._scroll_overlap = false;
        //==== end of initial =========//

        //CHECK change baseElement : nexacro.ControlElement ->nexacro.ScrollableControlElement 
        //CHECK nexacro.__createControlElementHandle -> nexacro.__createScrollableControlElementHandle
        /*
        _pGridScrollableControlElement.create = function (win)
        {
            // parent is always control element
            var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle)
            {
                if (!this.handle)
                {
                    this.owner_elem = owner_elem;
                    var win_handle = win.handle || owner_elem._getRootWindowHandle();
                    var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
                    nexacro.__setElementHandleId(handle, this.linkedcontrol._unique_id);

                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;
                    nexacro.__appendElementHandle(owner_elem.dest_handle, handle);

                    // set border & background
                    if (this.border || this.bordertype)
                    {
                        this._setControlBorder(handle, this.border, this.bordertype);
                    }
                    if (this.background)
                    {
                        this._setControlBackground(handle, this.background, this.gradation);
                    }
                    if (this.opacity)
                    {
                        nexacro.__setElementHandleOpacity(handle, this.opacity)
                    }
                    if (this._hittest_type)
                    {
                        nexacro.__setElementHittestValue(handle, this._hittest_type);
                    }
                    // render
                    this._refreshControl(handle);
                }

                //container element create
                // no need set props for child --> only create it
                // props are already setted to child_elem
                if (this.handle && !this._client_elem.handle)
                {
                    this._client_elem.create(win);
                }
            }
        };
        */
        _pGridScrollableControlElement._on_destroy = function ()
        {
            // scrollablecontainer_element destroyed by control_element
            this._target_vscroll_elements = null;
            this._target_hscroll_elements = null;
            // sctollbar control destroyed by component
            this._hscroll_control = null;
            this._vscroll_control = null;

        };

        //_pGridScrollableControlElement.clearContents = function ()
        //{
        //    if (this.handle)
        //    {
        //        // destroy handle of client element : keep parent relation
        //        this._client_elem.clearContents();
        //    }
        //};

        _pGridScrollableControlElement.getContainerElement = function ()
        {
            return this._client_elem;
        };

        // vscroll_element : 1 
        _pGridScrollableControlElement.setVertScrollElements = function (elems)
        {
            this._target_vscroll_elements = elems;
        };

        // hscroll_element : n
        _pGridScrollableControlElement.setHorzScrollElements = function (elems)
        {
            this._target_hscroll_elements = elems;
        };

        _pGridScrollableControlElement._setContainerVScrollPos = function (pos)
        {
            var vert_elems = this._target_vscroll_elements;
            if (vert_elems)
            {
                //if (nexacro._isArray(vert_elems)) pivot
                //{
                //    var elem;
                //    for (var i = 0, n = vert_elems.length; i < n ; i++)
                //    {
                //        elem = vert_elems[i];
                //        elem.setElementVScrollPos(pos);
                //    }
                //}
                //else
                {
                    vert_elems.setElementVScrollPos(pos);
                }
            }
        };

        _pGridScrollableControlElement._setContainerHScrollPos = function (pos)
        {
            var horz_elems = this._target_hscroll_elements;
            if (horz_elems)
            {
                if (nexacro._isArray(horz_elems))
                {
                    var elem;
                    for (var i = 0, n = horz_elems.length; i < n ; i++)
                    {
                        elem = horz_elems[i];
                        elem.setElementHScrollPos(pos);
                    }
                }
                else
                {
                    horz_elems.setElementHScrollPos(pos);
                }
            }
        };

        _pGridScrollableControlElement._setContainerMaxHeight = function (height)
        {
            var vert_elems = this._target_vscroll_elements;
            if (vert_elems)
            {
                this.container_maxheight = height;
                if (nexacro._isArray(vert_elems))
                {
                    var elem;
                    for (var i = 0, n = vert_elems.length; i < n ; i++)
                    {
                        elem = vert_elems[i];
                        elem._setContainerMaxHeight(height);
                    }
                }
                else
                {
                    vert_elems._setContainerMaxHeight(height);
                }
            }
        };

        _pGridScrollableControlElement._setContainerMaxWidth = function (width)
        {
            var horz_elems = this._target_hscroll_elements;
            if (horz_elems)
            {
                this.container_maxwidth = width;
                if (nexacro._isArray(horz_elems))
                {
                    var elem;
                    for (var i = 0, n = horz_elems.length; i < n ; i++)
                    {
                        elem = horz_elems[i];
                        elem._setContainerMaxWidth(width);
                    }
                }
                else
                {
                    horz_elems._setContainerMaxWidth(width);
                }
            }
        };

        _pGridScrollableControlElement._on_updateClientRect = function ()
        {
            var client_left = 0;
            var client_top = 0;
            var client_width = this.inner_width;
            var client_height = this.inner_height;

            if (this._apply_client_padding)
            {
                var padding = this.padding ? this.padding : this._padding_info;
                if (padding)
                {
                    client_left = padding.left;
                    client_top = padding.top;
                    client_width -= padding.left + padding.right;
                    client_height -= padding.top + padding.bottom;
                }
            }

            // recalc scroll_left/scroll_top
            var client_elem = this._client_elem;
            if (!client_elem || client_width == 0 || client_height == 0)
                return 0;

            var v_elements = this._target_vscroll_elements, v_element = v_elements, h_elements = this._target_hscroll_elements, h_element = h_elements;
            if (nexacro._isArray(v_elements)) v_element = v_elements[0];
            if (nexacro._isArray(h_elements)) h_element = h_elements[0];

            // .inner_width : scrollsize가 포함 안된 clientsize.
            // .client_width : scrollsize가 포함 됨.

            var zoomfactor = this.zoom / 100;
            var zclient_width = this._zclient_width = client_width / zoomfactor;
            var zclient_height = this._zclient_height = client_height / zoomfactor;
            var zclient_width_body = ((h_element) ? h_element._calculateClientWidth(client_width) : client_width) / zoomfactor;
            var zclient_height_body = ((v_element) ? v_element._calculateClientHeight(client_height - this.client_height) : client_height) / zoomfactor;
            var container_maxwidth = (h_element) ? h_element._getContainerMaxWidth() : 0;
            var container_maxheight = (v_element) ? v_element._getContainerMaxHeight() : 0;

            var scroll_left = this.scroll_left;
            var scroll_top = this.scroll_top;
            var factor = 4;

            if (zoomfactor != 1)
            {
                zclient_width = nexacro.floor(zclient_width, factor);
                zclient_height = nexacro.floor(zclient_height, factor);
                zclient_width_body = nexacro.floor(zclient_width_body, factor);
                zclient_height_body = nexacro.floor(zclient_height_body, factor);
                container_maxwidth = nexacro.floor(container_maxwidth, factor);
                container_maxheight = nexacro.floor(container_maxheight, factor);
            }

            var step_count = this._step_count;
            var step_index = this._step_index;
            var step_containers = this._step_containers;
            if (step_count > 0 && step_containers)
            {
                container_maxwidth = step_count * zclient_width_body;
            }

            var reset_vlimit = false;
            var reset_hlimit = false;

            var hscroll_visible = false;
            var vscroll_visible = false;

            var hscroll_limit = 0;
            var vscroll_limit = 0;

            var hscrollbartype = this._hscrollbartype;
            var vscrollbartype = this._vscrollbartype;

            if (step_count > 0 && step_containers)
            {
                hscrollbartype = "none";
            }

            if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body)
            {
                hscroll_limit = container_maxwidth - zclient_width_body;

                if (hscrollbartype != "none" && hscrollbartype != "autoindicator")
                {
                    client_height -= this._hscroll_size;
                    zclient_height = nexacro.floor(client_height / zoomfactor, factor);
                    zclient_height_body -= nexacro.floor(this._hscroll_size / zoomfactor, factor);
                }
            }
            else
            {
                if (hscrollbartype == "fixed")
                {
                    client_height -= this._hscroll_size;
                    zclient_height = nexacro.floor(client_height / zoomfactor, factor);
                    zclient_height_body -= nexacro.floor(this._hscroll_size / zoomfactor, factor);
                }

                hscroll_limit = 0;
            }

            if (zclient_height_body >= 0 && container_maxheight > zclient_height_body)
            {
                vscroll_limit = container_maxheight - zclient_height_body;

                if (vscrollbartype != "none" && vscrollbartype != "autoindicator")
                {
                    client_width -= this._vscroll_size;
                    zclient_width = nexacro.floor(client_width / zoomfactor, factor);
                    zclient_width_body -= nexacro.floor(this._vscroll_size / zoomfactor, factor);
                }

                if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body)
                {
                    hscroll_limit = container_maxwidth - zclient_width_body;
                }
            }
            else
            {
                if (vscrollbartype == "fixed")
                {
                    client_width -= this._vscroll_size;
                    zclient_width = nexacro.floor(client_width / zoomfactor, factor);
                    zclient_width_body -= nexacro.floor(this._vscroll_size / zoomfactor, factor);

                    if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body)
                    {
                        hscroll_limit = container_maxwidth - zclient_width_body;
                    }
                }

                vscroll_limit = 0;
            }

            if (step_count > 0 && step_containers)
            {
                container_maxwidth = step_count * zclient_width_body;

                if (zclient_width_body >= 0 && container_maxwidth > zclient_width_body)
                {
                    hscroll_limit = container_maxwidth - zclient_width_body;
                }
            }

            if (this.hscroll_limit != hscroll_limit)
            {
                reset_hlimit = true;
                this.hscroll_limit = hscroll_limit;

                if (scroll_left > hscroll_limit)
                {
                    this.setElementHScrollPos(hscroll_limit);
                }
            }

            if (this.vscroll_limit != vscroll_limit)
            {
                reset_vlimit = true;
                this.vscroll_limit = vscroll_limit;

                if (scroll_top > vscroll_limit)
                {
                    this.setElementVScrollPos(vscroll_limit);
                }
            }

            this._zclient_width = zclient_width;
            this._zclient_height = zclient_height;

            var ret = 0;
            if (this.client_left != client_left || this.client_top != client_top)
            {
                this.client_left = client_left;
                this.client_top = client_top;
                ret = 1;
            }
            else if (step_count > 0)
                ret = 1;

            //여러 case에 대해 테스트 필요!
            if (this.client_width != client_width || this.client_height != client_height)
            {
                this.client_width = client_width;
                this.client_height = client_height;
                ret += 2;
            }
            else if (this.client_width != zclient_width || this.client_height != zclient_height)
            {
                ret += 2;
            }

            return ret;
        };
        //////////////////////////////////////////////////////////////////////////
        // scrollable control not apply padding to client_element
        //////////////////////////////////////////////////////////////////////////
        //_pGridScrollableControlElement.appendChildElement = function (child_elem)
        //{
        //    // this child element is client element
        //    if (this.handle)
        //    {
        //        if (child_elem.parent_elem != this)
        //        {
        //            if (child_elem.handle)
        //            {
        //                var old_win_handle = child_elem._getRootWindowHandle();
        //                var new_win_handle = this._client_elem._getRootWindowHandle();
        //                if (old_win_handle != new_win_handle)
        //                {
        //                    child_elem.parent_elem = this;
        //                    // for recreate Child Element Handle
        //                    child_elem._destroyElementHandle();
        //                }
        //                else
        //                {
        //                    child_elem.parent_elem = this;
        //                }
        //            }
        //            else
        //            {
        //                child_elem.parent_elem = this;
        //            }
        //        }

        //        // if child element is not created ==> create child handle
        //        if (!child_elem.handle)
        //        {
        //            child_elem.create(this._getWindow());
        //        }
        //        else
        //        {
        //            child_elem._appendToContainer(this._client_elem);
        //        }
        //    }
        //};
        //_pGridScrollableControlElement.removeChildElement = function (child_elem)
        //{
        //    // this child element is client element
        //    if (child_elem.parent_elem == this)
        //    {
        //        child_elem._removeFromContainer();
        //    }
        //};

        //_pGridScrollableControlElement.sendToBackElement = function (cur_elem)
        //{
        //    this._client_elem.sendToBackElement(cur_elem);
        //};
        //_pGridScrollableControlElement.bringToFrontElement = function (cur_elem)
        //{
        //    this._client_elem.bringToFrontElement(cur_elem);
        //};
        //_pGridScrollableControlElement.moveToNextElement = function (cur_elem, target_elem)
        //{
        //    this._client_elem.moveToNextElement(cur_elem, target_elem);
        //};
        //_pGridScrollableControlElement.moveToPrevElement = function (cur_elem, target_elem)
        //{
        //    this._client_elem.moveToPrevElement(cur_elem, target_elem);
        //};


        //////////////////////////////////////////////////////////////////////////
        // for scrollbar
        _pGridScrollableControlElement.setElementHScrollPos = function (hpos)
        {
            var h_element = this._target_hscroll_elements;

            if (h_element)
            {
                if (nexacro._isArray(h_element))
                {
                    h_element = h_element[0];
                }
                if (hpos < 0) hpos = 0;
                if (hpos > this.hscroll_limit)
                {
                    hpos = this.hscroll_limit;
                }
                var scrollLeft = h_element.scroll_left;
                if (scrollLeft != hpos || this._reset_scrollpos)
                {
                    this.scroll_left = hpos;
                    this.linkedcontrol._scroll_left = hpos;
                    this._setContainerHScrollPos(hpos);
                }
            }
        };

        _pGridScrollableControlElement.setElementVScrollPos = function (vpos)
        {
            var v_element = this._target_vscroll_elements;

            if (v_element)
            {
                if (nexacro._isArray(v_element))
                {
                    v_element = v_element[0];
                }
                if (vpos < 0) vpos = 0;
                if (vpos > this.vscroll_limit)
                {
                    vpos = this.vscroll_limit;
                }
                var scrollTop = v_element._getScrollTop();
                if (scrollTop != vpos || this._reset_scrollpos)
                {
                    this.scroll_top = vpos;
                    this.linkedcontrol._scroll_top = vpos;
                    this._setContainerVScrollPos(vpos);
                    }
                }
        };

        _pGridScrollableControlElement.setElementScrollPos = function (hpos, vpos)
        {
            var v_element = this._target_vscroll_elements;
            var h_element = this._target_hscroll_elements;

            if (h_element)
            {
                if (nexacro._isArray(h_element))
                {
                    h_element = h_element[0];
                }
                if (hpos < 0) hpos = 0;
                if (hpos > this.hscroll_limit)
                {
                    hpos = this.hscroll_limit;
                }

                var scrollLeft = h_element.scroll_left;
                if (scrollLeft != hpos)
                {
                    this.scroll_left = hpos;
                    this.linkedcontrol._scroll_left = hpos;
                    this._setContainerHScrollPos(hpos);
                }
            }
            if (v_element)
            {
                if (nexacro._isArray(v_element))
                {
                    v_element = v_element[0];
                }
                if (vpos < 0) vpos = 0;
                if (vpos > this.vscroll_limit)
                {
                    vpos = this.vscroll_limit;
                }

                var scrollTop = v_element._getScrollTop();
                if (scrollTop != vpos)
                {
                    this.scroll_top = vpos;
                    this.linkedcontrol._scroll_top = vpos;
                    this._setContainerVScrollPos(vpos);
                }
            }
        };

        _pGridScrollableControlElement._setInnerElementScrollMaxTops = nexacro._emptyFn; // HTML only        

        _pGridScrollableControlElement.setElementScrollMaxSize = function (width, height)
        {
            if (this._client_elem)
            {
                this._client_elem.setElementScrollMaxSize(width, height);
            }

            var v_element = this._target_vscroll_elements;
            if (nexacro._isArray(v_element))
            {
                v_element = v_element[0];
            }
            var h_element = this._target_hscroll_elements;
            if (nexacro._isArray(h_element))
            {
                h_element = h_element[0];
            }

            this._setContainerMaxHeight(height);
            this._setContainerMaxWidth(width);

            if (v_element)
                this._updateClientRect();
        };

        //======================================================================
        // nexacro.GridBandControlElement
        //======================================================================
        nexacro.GridBandControlElement = function (parent_elem, type)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this._type = type;
            this._client_elem = new nexacro._GridBandContainerElement(this);
            this._client_elem_fix = null;
            this._fix_height = 0;
            this.container_maxwidth = 0;
            this.container_maxheight = 0;
            this._cur_border = null;
        };

        var _pGridBandControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridBandControlElement);
        nexacro.GridBandControlElement.prototype = _pGridBandControlElement;

        _pGridBandControlElement._type_name = "GridBandControlElement";

        _pGridBandControlElement.scroll_left = 0;
        _pGridBandControlElement.scroll_top = 0;

        _pGridBandControlElement.create = function (win)
        {
            var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.position_step);
            if (owner_elem && owner_elem.handle && !this.handle)
            {
                this.owner_elem = owner_elem;
                var win_handle = win.handle || owner_elem._getRootWindowHandle();
                var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                nexacro.__setElementHandleId(handle, this.name);

                nexacro.__setElementHandleIsControl(handle, this._is_control);
                /////////////////////////////////
                // append TO Parent Element
                this.handle = this.dest_handle = handle;

                var classname = this._classname ? this._classname : this._getElementClassName();
                nexacro.__setElementHandleCSSClassName(handle, classname);

                // render
                this._refreshControl(handle);

                if (this._hittest_type)
                    nexacro.__setElementHittestValue(handle, this._hittest_type);

                if (this.direction)
                    nexacro.__setElementHandleRtlDirection(handle, this.direction);

                if (this.mirror)
                    nexacro.__setElementHandleMirror(handle, this.mirror);

                nexacro.__appendElementHandle((this._is_nc_element) ? owner_elem.handle : owner_elem.dest_handle, handle);

                if (!this._client_elem.handle)
                    this._client_elem.create(win);

                if (this._client_elem_fix && !this._client_elem_fix.handle)
                    this._client_elem_fix.create(win);
            }
        };

        _pGridBandControlElement.destroy = function ()
        {
            if (this._client_elem_fix)
            {
                this._client_elem_fix.destroy();
                this._client_elem_fix = null;
            }
            return nexacro.ControlElement.prototype.destroy.call(this);
        };

        _pGridBandControlElement._setFixArea = function (height)
        {
            this._fix_height = height;

            if (!this._client_elem_fix && height)
            {
                this._client_elem_fix = new nexacro._GridBandContainerElement(this);
            }
            else if (this._client_elem_fix)
            {
                this._client_elem_fix.destroy();
                this._client_elem_fix = null;
            }

            if (this.handle && this._client_elem_fix && !this._client_elem_fix.handle)
            {
                var _win = this.linkedcontrol._getWindow();
                this._client_elem_fix.create(_win);
            }

            this._updateClientSize();
        };

        _pGridBandControlElement.getContainerElement = function (is_fixed)
        {
            if (is_fixed)
                return this._client_elem_fix;

            return this._client_elem;
        };

        _pGridBandControlElement._setContainerMaxHeight = function (height)
        {
            if (this._type == "body")
            {
                if (this.container_maxheight != height)
                {
                    this.container_maxheight = height;
                }
            }
        };

        _pGridBandControlElement._calculateClientHeight = function (change_height)
        {
            var border = this.linkedcontrol.border || this.linkedcontrol._getCSSStyleValue("border", "enabled");
            var c_height = this.client_height + change_height + ((border) ? border._getBorderHeight() : 0);
            return c_height;
        };

        //_pGridBandControlElement.setElementBorder = function (border, bordertype)
        //{
        //    // update Border & Background SubElements
        //    this.border = border;
        //    this.bordertype = bordertype;
        //    this._setControlBorder(this.handle, border, bordertype, true);
        //    this._updateClientRect();
        //    this._client_elem._adjustPos();
        //};

        _pGridBandControlElement._getContainerMaxHeight = function ()
        {
            if (this._type == "body")
            {
                return this.container_maxheight;
            }
            else
            {
                return this.client_height;
            }
        };
        /*
        _pGridBandControlElement._getScrollLeft = function ()
        {
            return this.scroll_left;
        };
        */
        _pGridBandControlElement._getScrollTop = function ()
        {
            if (this._type == "body")
            {
                return this.scroll_top;
            }
            else
            {
                return 0;
            }
        };
        
        _pGridBandControlElement.setElementScrollMaxSize = function (width, height)
        {
            if (this._client_elem)
            {
                this._client_elem.setElementScrollMaxSize(width, height);
            }
        };
        
        _pGridBandControlElement._on_updateClientRect = function ()
        {
            var ret = 0;
            var client_left = 0;
            var client_top = 0;
            var client_width = this.inner_width;
            var client_height = this.inner_height;
            var border = this._cur_border = this.linkedcontrol.border || this.linkedcontrol._getCSSStyleValue("border", "enabled");

            if (border)
            {
                client_width += border._getBorderWidth();
                client_height += border._getBorderHeight();
            }

            var fix_height = this._fix_height;

            client_top += fix_height;
            client_height -= fix_height;

            if (this.client_left != client_left || this.client_top != client_top)
            {
                this.client_left = client_left;
                this.client_top = client_top;
                ret = 1;
            }
            if (this.client_width != client_width || this.client_height != client_height)
            {
                this.client_width = client_width;
                this.client_height = client_height;
                ret += 2;
            }

            return ret;
        };

        _pGridBandControlElement._updateClientSize = function ()
        {
            var client_left = 0;
            var client_top = 0;
            var client_width = this.inner_width;
            var client_height = this.inner_height;
            var border = this._cur_border = this.linkedcontrol.border || this.linkedcontrol._getCSSStyleValue("border", "enabled");

            if (border)
            {
                client_width += border._getBorderWidth();
                client_height += border._getBorderHeight();
            }

            var fix_height = this._fix_height;

            client_top += fix_height;
            client_height -= fix_height;

            var client_element_fix = this._client_elem_fix;
            if (client_element_fix)
            {
                client_element_fix.setElementPosition(client_left, 0);
                client_element_fix.setElementSize(client_width, fix_height);
            }

            var client_element = this._client_elem;
            if (client_element)
            {
                if (this.client_left != client_left || this.client_top != client_top)
                {
                    this.client_left = client_left;
                    this.client_top = client_top;
                    client_element.setElementPosition(client_left, client_top);
                }
                if (this.client_width != client_width || this.client_height != client_height)
                {
                    this.client_width = client_width;
                    this.client_height = client_height;
                    client_element.setElementSize(client_width, client_height);
                }
            }
            else
            {
                this.client_left = client_left;
                this.client_top = client_top;
                this.client_width = client_width;
                this.client_height = client_height;
            }
        };
        
        _pGridBandControlElement.setElementVScrollPos = function (vpos)
        {
            if (this._type == "body")
            {
                this._client_elem.setElementVScrollPos(vpos);
                this.scroll_top = vpos;
            }
        };

        _pGridBandControlElement._setOnScrollCallbackTarget = function (target, func)
        {
            if (this._type == "body")
            {
                this._client_elem._callback_onscroll = func;
                this._client_elem._grid = target;
            }
        };

        _pGridBandControlElement._setOnScrollCallbackTarget = function (target)
        {
            if (this._type == "body")
            {
                this._client_elem._grid = target;
            }
        };

        _pGridBandControlElement.setElementBorder = function (border)
        {
            var retn = nexacro.ControlElement.prototype.setElementBorder.call(this, border);
            this._cur_border = border;
            this._updateClientSize();
            this._client_elem._adjustPos();
            return retn;
        };

        //======================================================================
        // nexacro.GridBandContainerElement
        //======================================================================
        nexacro._GridBandContainerElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;
            this._grid = null;
        };

        var __pGridBandContainerElement = nexacro._createPrototype(nexacro._ContainerElement, nexacro._GridBandContainerElement);
        nexacro._GridBandContainerElement.prototype = __pGridBandContainerElement;
        // overide nexacro.Object
        __pGridBandContainerElement._type_name = "GridBandContainerElement";

        //==== defaule values =========//
        __pGridBandContainerElement._container_maxwidth = 0;
        __pGridBandContainerElement._container_maxheight = 0;

        __pGridBandContainerElement.destroy = function ()
        {
            nexacro._ContainerElement.prototype.destroy.call(this);
            this._grid = null;
        };

        __pGridBandContainerElement.setElementVScrollPos = function (vpos)
        {
            if (this._scroll_top != vpos || this.parent._reset_scrollpos)
            {
                this._scroll_top = vpos;

                if (!this.parent._no_setscroll)
                {
                    var handle = this.handle;
                    if (handle)
                    {
                        nexacro.__setElementHandleVScrollPos(handle, vpos);

                        if (this._grid)
                            this._grid._callback_onscroll(vpos);
                    }
                }
            }
        };

        __pGridBandContainerElement._adjustPos = function ()
        {
            this.setElementPosition(this.left, this.top);
        };

        __pGridBandContainerElement.setElementPosition = function (left, top)
        {
            var border = this.parent._cur_border;
            this.left = left;
            this.top = top;
            var handle = this.handle;
            if (handle)
            {
                if (border)
                {
                    left = left - border.left._width;
                    top = top - border.top._width;
                }
                nexacro.__setElementHandlePosition(handle, left, top);
            }
        };

        __pGridBandContainerElement.setElementSize = function (width, height)
        {
            var border = this.parent._cur_border;
            this.width = width;
            this.height = height;
            if (width < 0) width = 0;
            if (height < 0) height = 0;

            var handle = this.handle;
            if (handle)
            {
                if (border)
                {
                    width = width + border.left._width + border.right._width;
                    height = height + border.top._width + border.bottom._width;
                }
                if (width && height)
                    nexacro.__setElementHandleSize(handle, width, height);
                else
                    nexacro.__clearElementHandleSize(handle);
            }
        };
            
        __pGridBandContainerElement.create = function (win)
        {
            var retn = nexacro._ContainerElement.prototype.create.call(this, win);
            this._adjustPos();
            return retn;
        };
        

        //======================================================================
        // nexacro.GridRowControlElement
        //======================================================================

        nexacro.GridRowControlElement = function (parent_elem)
        {
            this.parent = parent_elem;
            this.parent_elem = parent_elem;

            this._client_left_element = null;
            this._client_body_element = new nexacro._ContainerElement(this);//, "body");
            this._client_right_element = null;
            this._use_translate_scroll = true;

            this._left_width = 0;
            this._right_width = 0;
            this._body_width = 0;
            this.scroll_left = 0;
        };

        var _pGridRowControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridRowControlElement);

        nexacro.GridRowControlElement.prototype = _pGridRowControlElement;

        _pGridRowControlElement._type_name = "GridRowControlElement";

        _pGridRowControlElement.create = function (win)
        {
            // if parent is control element
            var owner_elem = (this._is_nc_element) ? this.parent_elem : this.parent_elem.getContainerElement(this.linkedcontrol._fixed);
            if (owner_elem && owner_elem.handle)
            {
                if (!this.handle)
                {
                    this.owner_elem = owner_elem;
                    var win_handle = win.handle || owner_elem._getRootWindowHandle();
                    var handle = nexacro.__createControlElementHandle(this, win_handle, this.left, this.top, this.width, this.height);
                    nexacro.__setElementHandleId(handle, this.name);

                    nexacro.__setElementHandleIsControl(handle, this._is_control);

                    // append TO Parent Element
                    this.handle = this.dest_handle = handle;
                    nexacro.__setElementHandleCSSClassName(handle, this._getElementClassName());

                    this._refreshControl(handle);

                    if (this._hittest_type)
                        nexacro.__setElementHittestValue(handle, this._hittest_type);

                    if (this.direction)
                        nexacro.__setElementHandleRtlDirection(handle, this.direction);

                    if (this.mirror)
                        nexacro.__setElementHandleMirror(handle, this.mirror);

                    nexacro.__appendElementHandle((this._is_nc_element) ? owner_elem.handle : owner_elem.dest_handle, handle);
                }

                //container element create
                // no need set props for child --> only create it
                // props are already setted to child_elem
                if (this.handle)
                {
                    if (!this._client_body_element.handle)
                        this._client_body_element.create(win);
                    if (this._client_left_element && !this._client_left_element.handle)
                        this._client_left_element.create(win);
                    if (this._client_right_element && !this._client_right_element.handle)
                        this._client_right_element.create(win);

                    this._client_elem = this._client_body_element;
                }
            }
        };

        _pGridRowControlElement._on_destroy = function ()
        {
            // destroy client element
            this._client_body_element.destroy();

            if (this._client_left_element)
                this._client_left_element.destroy();

            if (this._client_right_element)
                this._client_right_element.destroy();

            this._client_body_element = null;
            this._client_left_element = null;
            this._client_right_element = null;
            this._client_elem = null;
        };

        _pGridRowControlElement.clearContents = function ()
        {
            if (this.handle)
            {
                // destroy handle of client element : keep parent relation
                this._client_body_element.clearContents();
                if (this._client_left_element)
                    this._client_left_element.clearContents();
                if (this._client_right_element)
                    this._client_right_element.clearContents();
            }
        };

        _pGridRowControlElement.getContainerElement = function (area)
        {
            if (area == 1)
                return this._client_left_element;
            else if (area == 2)
                return this._client_right_element;

            return this._client_body_element;
        };

        _pGridRowControlElement.setArea = function (leftwidth, rightwidth)
        {
            if (leftwidth > 0 && !this._client_left_element)
                this._client_left_element = new nexacro._ContainerElement(this);//, "left");

            if (rightwidth > 0 && !this._client_right_element)
                this._client_right_element = new nexacro._ContainerElement(this);//, "right");

            this._left_width = leftwidth;
            if (this._client_left_element)
            {
                this._client_left_element.setElementPosition(this.client_left, this.client_top);
                this._client_left_element.setElementSize(leftwidth, this.client_height);
            }

            this._right_width = rightwidth;
            if (this._client_right_element)
            {
                this._client_right_element.setElementPosition(this.client_width - rightwidth, this.client_top);
                this._client_right_element.setElementSize(rightwidth, this.client_height);
            }

            this._body_width = this.client_width - leftwidth - rightwidth;
            this._client_body_element.setElementPosition(leftwidth, this.client_top);
            this._client_body_element.setElementSize(this._body_width, this.height);
        };

        _pGridRowControlElement._updateClientRect = function ()
        {
            var ret = this._on_updateClientRect();
            if (ret & 1)
                this._on_change_clientPos(this.client_left, this.client_top);
            if (ret & 2)
                this._on_change_clientSize(this.client_width, this.client_height);

            if (ret)
                this.setArea(this._left_width, this._right_width);

            this._setContainerMaxWidth(this._client_body_element._scroll_maxwidth, this.height);
        };

        _pGridRowControlElement._setContainerMaxWidth = function (width)
        {
            this._client_body_element.setElementScrollMaxSize(width, this.height);
        };

        _pGridRowControlElement._calculateClientWidth = function (parent_client_width)
        {
            return parent_client_width - this._left_width - this._right_width;
        };

        _pGridRowControlElement._getContainerMaxWidth = function ()
        {
            return this._client_body_element._scroll_maxwidth;
        };

        /*
        _pGridRowControlElement._getScrollLeft = function ()
        {
            return this.scroll_left;
        };
        */
        _pGridRowControlElement.setElementHScrollPos = function (hpos)
        {
            this._client_body_element._setElementHScrollPos(hpos);
            this.scroll_left = hpos;
        };



        //======================================================================
        // nexacro.GridAreaContainerElement
        //======================================================================

        //nexacro.GridAreaContainerElement = function (parent_elem, areatype)
        //{
        //    this.parent = parent_elem;
        //    this.parent_elem = parent_elem;
        //    this._areatype = areatype;
        //};

        //var _pGridAreaContainerElement = nexacro._createPrototype(nexacro._ContainerElement, nexacro.GridAreaContainerElement);
        //nexacro.GridAreaContainerElement.prototype = _pGridAreaContainerElement;
        //// overide nexacro.Object
        //_pGridAreaContainerElement._type_name = "GridAreaContainerElement";

        ////==== defaule values =========//
        //_pGridAreaContainerElement._container_maxwidth = 0;
        //_pGridAreaContainerElement._container_maxheight = 0;


        //////////////////////////////////////////////////////////////////////////

    }
}

if (_process)
{
    delete _process;
    delete _pElement;
    delete _pTextBoxElement;
    delete _pIconElement;
    delete _pIconTextElement;
    delete _pImageElement;
    delete _pInputElement;
    delete _pTextAreaElement;
    delete _pControlElement;
    delete _pFrameControlElement;
    delete _pScrollableControlElement;
    delete __pContainerElement;
    delete __pFrameResizeBorderElement;
    delete _pModalOverlayElement;
    delete _pPluginElement;
    delete _pPluginObject;
    delete __pWebBrowserPluginElement;
    delete __pMediaPlayerPluginElement;
    delete _pCanvasElement;
    delete __pCanvasGradient;
    delete _pGoogleMapPluginElement;
    delete _pGridScrollableControlElement;
    delete _pGridBandControlElement;
    delete __pGridBandContainerElement;
    delete _pGridRowControlElement;
}