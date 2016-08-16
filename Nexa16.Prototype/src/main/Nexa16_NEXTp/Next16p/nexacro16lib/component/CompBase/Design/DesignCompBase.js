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

if (nexacro.Component)
{
    var _pComponent = nexacro.Component.prototype;
    
    _pComponent.on_create_popup_control_element = function (parent_elem)
    {
        var control_elem;
        var is_preview = this._is_window = this._isPreviewMode();
        if (is_preview)
        {
            control_elem = new nexacro.ControlElement(parent_elem);
            
        }
        else
        {
            this._is_popup_control = false;
            this._track_on = true;
            control_elem = new nexacro.ControlElement(this.parent._control_element);
        }
        //}
        //else
        //{
            //control_elem = new nexacro.PopupControlElement(parent_elem);
        //}
        
        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };
    
    /*
    // Not Preview Mode일 경우 아래 코드 사용 필요.. TODO
    nexacro.PopupScrollableControlElement.prototype.create = nexacro.ScrollableControlElement.prototype.create;
    */

    _pComponent.on_create_popupscrollable_control_element = function (parent_elem)
    {
        var control_elem;
        if (!this._isPreviewMode())
        {
            this._is_popup = false;
            this._is_window = false;
            this._track_on = true;

            //var control_elem = new nexacro.PopupScrollableControlElement(parent_elem);
            control_elem = new nexacro.PopupScrollableControlElement(this.parent._control_element);
            //var control_elem = new nexacro.ScrollableControlElement(this.parent._control_element);
        }
        else
        {
            control_elem = new nexacro.PopupScrollableControlElement(parent_elem);
        }

        control_elem.setLinkedControl(this);
        this._control_element = control_elem;
        return control_elem;
    };

    _pComponent._isPreviewMode = function ()
    {
        var temp = this;
        while (temp)
        {
            if (temp instanceof nexacro.DesignForm)
            {
                return temp._is_preview_mode;
            }
            temp = temp.parent;
        };

        return false;
    };

    _pComponent.set_initvalueid = function (initvalueid)
    {
        // 실제 initvalue 적용 인터페이스는 따로 있다.
        // 여기서는 단순 property setting만 수행
    	this.initvalueid = initvalueid;

        /*
    	var fn = this._type_name + initvalueid;
    	if (nexacro_init[fn])
    	{
			 nexacro_init[fn].call(this, this);
    	}
        */
    };

    _pComponent._getDesignForm = function ()
    {
        //trace("_getDesignForm");
        var temp = this;
        while (temp != null)
        {
            //trace("> " + temp + " / " + temp.name);
            if (temp instanceof nexacro.DesignForm)
                return temp;
            
            temp = temp.parent;
        }

        return null;
    };

    _pComponent._convToRate = function (val, parentsize)
    {        
        return parentsize ? (val * 100 / parentsize) : 0;
    };

    _pComponent.set_left = function (propVal)
    {        
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }

        if (propVal !== null && propVal !== undefined)
        {
            if (strVal.charAt(strVal.length - 1) == '%')
            {
                propVal = parseFloat(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
                propVal += "%";
            }
            else
            {
                propVal = parseInt(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
            }
        }

        if (this.left != propVal)
        {
            var root_form = this._getRootForm();
            var design_form = this._getDesignForm();
            var step_width = 0;
            var owner_positionstep = 0;

            if (design_form && this.parent == root_form)
            {
                owner_positionstep = design_form.get_owner_step_index(this);
                if (owner_positionstep > 0)
                {
                    step_width = design_form._inner_form._adjust_width;
                }
            }

            this.left = propVal;
            if (propVal === null || propVal === undefined)
            {                
                this._left = null;
                if (!this._width)
                {
                    this.set_width(this._adjust_width);
                }
            }

            // right, width exist width delete
            if (!nexacro._isNull(this.left) && !nexacro._isNull(this.right) && !nexacro._isNull(this.width))
            {
                this.width = null;
                this._width = null;
            }
            this._update_position(false, true);
        }
    };

    _pComponent.set_top = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }
        if (propVal !== null && propVal !== undefined)
        {
            if (strVal.charAt(strVal.length - 1) == '%')
            {
                propVal = parseFloat(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
                propVal += "%";
            }
            else
            {
                propVal = parseInt(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
            }
        }

        if (this.top != propVal)
        {
            this.top = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._top = null;
                if (!this._height)
                {
                    this.set_height(this._adjust_height);
                }
            }

            // bottom, height exist height delete
            if (!nexacro._isNull(this.top) && !nexacro._isNull(this.bottom) && !nexacro._isNull(this.height))
            {
                this.height = null;
                this._height = null;
            }

            this._update_position(false, true);
        }
    };

    _pComponent.set_right = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }
        if (propVal !== null && propVal !== undefined)
        {
            if (strVal.charAt(strVal.length - 1) == '%')
            {
                propVal = parseFloat(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
                propVal += "%";
            }
            else
            {
                propVal = parseInt(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
            }
        }

        if (this.right != propVal)
        {
            var root_form = this._getRootForm();
            var design_form = this._getDesignForm();
            var step_width = 0;
            var owner_positionstep = 0;

            if (design_form && this.parent == root_form)
            {
                owner_positionstep = design_form.get_owner_step_index(this);
                if (owner_positionstep > 0)
                {
                    step_width = design_form._inner_form._adjust_width;
                }
            }

            this.right = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._right = null;
                if (!this._width)
                {
                    this.set_width(this._adjust_width);
                }
            }

            if (!nexacro._isNull(this.right) && !nexacro._isNull(this.left) && !nexacro._isNull(this.width))
            {
                this.width = null;
                this._width = null;
            }

            this._update_position(true, true);
        }
    };


    _pComponent.set_bottom = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }
        if (propVal !== null && propVal !== undefined)
        {
            if (strVal.charAt(strVal.length - 1) == '%')
            {
                propVal = parseFloat(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
                propVal += "%";
            }
            else
            {
                propVal = parseInt(propVal);
                if (propVal && isNaN(propVal))
                {
                    return;
                }
            }
        }

        if (this.bottom != propVal)
        {
            this.bottom = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._bottom = null;
                if (!this._height)
                {
                    this.set_height(this._adjust_height);
                }
            }

            if (!nexacro._isNull(this.bottom) && !nexacro._isNull(this.top) && !nexacro._isNull(this.height))
            {
                this.height = null;
                this._height = null;
            }

            this._update_position(true, true);
        }
    };

    _pComponent.set_width = function (propVal)
    {        
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;            
        }
        
        if (propVal !== "auto")
        {            
            if (propVal !== null && propVal !== undefined)
            {
                if (strVal.charAt(strVal.length - 1) == '%')
                {
                    propVal = parseFloat(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                    propVal += "%";
                }
                else
                {
                    propVal = parseInt(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                }
            }
        }
          
        if (this.width != propVal)
        {
            var root_form = this._getRootForm();
            var design_form = this._getDesignForm();
            var step_width = 0;
            var owner_positionstep = 0;

            if (design_form && this.parent == root_form)
            {
                owner_positionstep = design_form.get_owner_step_index(this);
                if (owner_positionstep > 0)
                {
                    step_width = design_form._inner_form._adjust_width;
                }
            }

            this.width = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._width = null;

                var form = this._getForm();
                var leftbaseComp, rightbaseComp;
                var this_left, this_right;
                this_left = this._adjust_left;
                this_right = this_left + this._adjust_width;
                if (this._leftbase_component_id)
                {
                    leftbaseComp = this._getFormChildById(this._leftbase_component_id);
                    if (this._leftbase_position_type == "left")
                    {
                        this_left = this_left - leftbaseComp._adjust_left;
                    }
                    else
                    {
                        this_left = this_left - (leftbaseComp._adjust_left + leftbaseComp._adjust_width);
                    }
                }

                if (this._rightbase_component_id)
                {
                    rightbaseComp = this._getFormChildById(this._rightbase_component_id);
                    if (this._rightbase_position_type == "left")
                    {
                        this_right = this_right - rightbaseComp._adjust_left;
                    }
                    else
                    {
                        this_right = this_right - (rightbaseComp._adjust_left + rightbaseComp._adjust_width);
                    }
                }
                else
                {
                    this_right = form._adjust_width - this_right;
                }

                if (!this._left && !this._right)
                {

                    this.set_left(this_left);
                    this.set_right(this_right);
                }
                else if (this._left > -1 && !this._right)
                {
                    this.set_right(this_right);
                }
                else if (!this._left && this._right > -1)
                {
                    this.set_left(this_left);
                }
            }

            if (!nexacro._isNull(this.width) && !nexacro._isNull(this.left) && !nexacro._isNull(this.right))
            {
                this.right = null;
                this._right = null;
            }
            this._update_position(true, false);
        }
    };

    _pComponent.set_height = function (propVal)
    {
        var strVal = new String(propVal);
        if (strVal.trim() == "%")
        {
            propVal = null;
        }

        if (propVal !== "auto")
        {
            if (propVal !== null && propVal !== undefined)
            {
                if (strVal.charAt(strVal.length - 1) == '%')
                {
                    propVal = parseFloat(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                    propVal += "%";
                }
                else
                {
                    propVal = parseInt(propVal);
                    if (propVal && isNaN(propVal))
                    {
                        return;
                    }
                }
            }
        }

        if (this.height != propVal)
        {
            this.height = propVal;
            if (propVal === null || propVal === undefined)
            {
                this._width = null;

                var form = this._getForm();
                var topbaseComp, bottombaseComp;
                var this_top, this_bottom;
                this_top = this._adjust_top;
                this_bottom = this._adjust_top + this._adjust_height;
                if (this._topbase_component_id)
                {
                    topbaseComp = this._getFormChildById(this._topbase_component_id);
                    if (this._topbase_position_type == "top")
                    {
                        this_top = this_top - topbaseComp._adjust_top;
                    }
                    else
                    {
                        this_top = this_top - (topbaseComp._adjust_top + topbaseComp._adjust_height);
                    }
                }

                if (this._bottombase_component_id)
                {
                    bottombaseComp = this._getFormChildById(this._bottombase_component_id);
                    if (this._bottombase_position_type == "top")
                    {
                        this_bottom = this_bottom - bottombaseComp._adjust_top;
                    }
                    else
                    {
                        this_bottom = this_bottom - (bottombaseComp._adjust_top + bottombaseComp._adjust_height);
                    }
                }
                else
                {
                    this_bottom = form._adjust_height - this_bottom;
                }

                if (!this._top && !this._bottom)
                {
                    this.set_top(this_top);
                    this.set_bottom(this_bottom);
                }
                else if (this._top && !this._bottom)
                {
                    this.set_bottom(this_bottom);
                }
                else if (!this._top && this._bottom)
                {
                    this.set_top(this_top);
                }
            }

            if (!nexacro._isNull(this.height) && !nexacro._isNull(this.top) && !nexacro._isNull(this.bottom))
            {
                this.bottom = null;
                this._bottom = null;
            }
            this._update_position(true, false);
        }
    };

    // position base
    _pComponent.set_leftbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.leftbase != basePosition)
        {
            var old_base = this.leftbase;
            this.leftbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    // 지정가능한 position 외에는 튕겨냄.
                    if (!(position === "" || position == "left" || position == "right"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else if (this._leftbase_component_id)
            {
                baseComp = linkedId = this._leftbase_component_id;
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)  //comp가 없다면 동일 child가 아니다. 스펙문서 (지정가능한 Base Component는 자신기준의 Scope로 지정함: 동일 ChildList내의 Sibling 대상중 div00을 대상으로 찾음)
            {
                var _val;
                if (baseComp != null)
                {
                    _val = this._convToPixel(this.left, comp._adjust_width);

                    // 설정되어있는 baseposition을 제거하고 normal position형태로 되돌림
                    if (this._leftbase_position_type == "right")
                    {
                        _val += comp._adjust_left + comp._adjust_width;
                    }
                    else
                    {
                        _val += comp._adjust_left;
                    }

                    if (this.left)
                    {
                        if (typeof (this.left) == "string" && this.left.indexOf("%") >= 0)
                        {
                            this.left = this._convToRate(_val, this.parent ? this.parent._control_element.client_width : 0).toFixed(2) + "%";
                        }
                        else
                        {
                            this.left = _val;
                        }
                    }

                    comp._based_list.pop(this.id);
                    this._leftbase_component_id = null;
                    this._leftbase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    // position base 정보를 nexacro.Component에 저장함               
                    this._leftbase_component_id = linkedId; // "div00.left"의 div00을 지정
                    if (position)
                    {
                        this._leftbase_position_type = position; // "div00.left"의 left를 지정
                    }
                    else
                    {
                        this._leftbase_position_type = "right"; // base 속성 지정 시 sibling 대상만(left, right 생략 시) 지정 시 반대방향 position 으로 처리
                    }

                    if (old_base)
                    {
                        // positionbase가 설정되어 있는 상태에서 positionbase를 변경했을때
                        if (this._leftbase_position_type == "right")
                        {
                            _val = this._adjust_left - (comp._adjust_left + comp._adjust_width);
                        }
                        else
                        {
                            _val = this._adjust_left - comp._adjust_left;
                        }
                    }
                    else
                    {
                        // positionbase가 설정되어 있는 상태에서 positionbase를 변경했을때
                        _val = this._convToPixel(this.left, this.parent ? this.parent._control_element.client_width : 0);
                        if (this._leftbase_position_type == "right")
                        {
                            _val -= comp._adjust_left + comp._adjust_width;
                        }
                        else
                        {
                            _val -= comp._adjust_left;
                        }
                    }

                    if (this.left)
                    {
                        if (typeof (this.left) == "string" && this.left.indexOf("%") >= 0)
                        {
                            this.left = this._convToRate(_val, comp._adjust_width).toFixed(2) + "%";
                        }
                        else
                        {
                            this.left = _val;
                        }
                    }
                }

                if (nexacro._isNull(this.left) && nexacro._isNull(this.right))
                {
                    this._update_position(false, false);
                }
            }
        }
    };

    _pComponent.set_topbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.topbase != basePosition)
        {
            var old_base = this.topbase;
            this.topbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "top" || position == "bottom"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._topbase_component_id)
                {
                    baseComp = linkedId = this._topbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                var _val;
                if (baseComp != null)
                {
                    _val = this._convToPixel(this.top, comp._adjust_height);

                    if (this._topbase_position_type == "bottom")
                    {
                        _val += comp._adjust_top + comp._adjust_height;
                    }
                    else
                    {
                        _val += comp._adjust_top;
                    }

                    if (this.top)
                    {
                        if (typeof (this.top) == "string" && this.top.indexOf("%") >= 0)
                        {
                            this.top = this._convToRate(_val, this.parent ? this.parent._control_element.client_height : 0).toFixed(2) + "%";
                        }
                        else
                        {
                            this.top = _val;
                        }
                    }

                    comp._based_list.pop(this.id);
                    this._topbase_component_id = null;
                    this._topbase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._topbase_component_id = linkedId;
                    if (position)
                    {
                        this._topbase_position_type = position;
                    }
                    else
                    {
                        this._topbase_position_type = "bottom";
                    }

                    if (old_base)
                    {
                        if (this._topbase_position_type == "bottom")
                        {
                            _val = this._adjust_top - (comp._adjust_top + comp._adjust_height);
                        }
                        else
                        {
                            _val = this._adjust_top - comp._adjust_top;
                        }
                    }
                    else
                    {
                        _val = this._convToPixel(this.top, this.parent ? this.parent._control_element.client_height : 0);

                        if (this._topbase_position_type == "bottom")
                        {
                            _val -= comp._adjust_top + comp._adjust_height;
                        }
                        else
                        {
                            _val -= comp._adjust_top;
                        }
                    }

                    if (this.top)
                    {
                        if (typeof (this.top) == "string" && this.top.indexOf("%") >= 0)
                        {
                            this.top = this._convToRate(_val, comp._adjust_height).toFixed(2) + "%";
                        }
                        else
                        {
                            this.top = _val;
                        }
                    }
                    
                }

                if (nexacro._isNull(this.top) && nexacro._isNull(this.bottom))
                {
                    this._update_position(false, false);
                }
            }
        }
    };

    _pComponent.set_rightbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.rightbase != basePosition)
        {
            var old_base = this.rightbase;
            this.rightbase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "left" || position == "right"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._rightbase_component_id)
                {
                    baseComp = linkedId = this._rightbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                var _val;

                if (baseComp != null)
                {
                    _val = (this.right && this._right) ? this._convToPixel(this.right, comp._adjust_width) : null;

                    if (this.right)
                    {
                        if (typeof (this.right) == "string" && this.right.indexOf("%") >= 0)
                        {
                            this.right = this._convToRate(_val, this.parent ? this.parent._control_element.client_width : 0).toFixed(2) + "%";
                        }
                        else
                        {
                            this.right = _val;
                        }
                    }

                    comp._based_list.pop(this.id);
                    this._rightbase_component_id = null;
                    this._rightbase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._rightbase_component_id = linkedId;
                    if (position)
                    {
                        this._rightbase_position_type = position;
                    }
                    else
                    {
                        this._rightbase_position_type = "left";
                    }

                    if (old_base)
                    {
                        if (this._rightbase_position_type == "left")
                        {
                            _val = comp._adjust_left - (this._adjust_left + this._adjust_width);
                        }
                        else
                        {
                            _val = (comp._adjust_left + comp._adjust_width) - (this._adjust_left + this._adjust_width);
                        }
                    }
                    else
                    {
                        _val = this.right ? this._convToPixel(this.right, this.parent ? this.parent._control_element.client_width : 0) : this._adjust_left + this._adjust_width;
                        if (this._rightbase_position_type == "left")
                        {
                            _val = comp._adjust_left - _val;
                        }
                        else
                        {
                            _val = (comp._adjust_left + comp._adjust_width) - _val;
                        }
                    }

                    if (this.right)
                    {
                        if (typeof (this.right) == "string" && this.right.indexOf("%") >= 0)
                        {
                            this.right = this._convToRate(_val, comp._adjust_width).toFixed(2) + "%";
                        }
                        else
                        {
                            this.right = _val;
                        }
                    }
                }

                if (nexacro._isNull(this.right) && nexacro._isNull(this.left))
                {
                    this._update_position(false, false);
                }
            }
        }
    };

    _pComponent.set_bottombase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.bottombase != basePosition)
        {
            var old_base = this.bottombase;
            this.bottombase = basePosition;

            if (basePosition)
            {
                var idx = basePosition.indexOf(".");
                if (idx > 0)
                {
                    linkedId = basePosition.substr(0, idx);
                    position = basePosition.substr(idx + 1, basePosition.length);

                    if (!(position === "" || position == "top" || position == "bottom"))
                    {
                        return;
                    }
                }
                else
                {
                    linkedId = basePosition;
                }
            }
            else
            {
                if (this._bottombase_component_id)
                {
                    baseComp = linkedId = this._bottombase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                var _val;
                if (baseComp != null)
                {
                    _val = (this.bottom && this._bottom) ? this._convToPixel(this.bottom, comp._adjust_width) : null;

                    if (this.bottom)
                    {
                        if (typeof (this.bottom) == "string" && this.bottom.indexOf("%") >= 0)
                        {
                            this.bottom = this._convToRate(_val, this.parent ? this.parent._control_element.client_width : 0).toFixed(2) + "%";
                        }
                        else
                        {
                            this.bottom = _val;
                        }
                    }
                    

                    comp._based_list.pop(this.id);
                    this._bottombase_component_id = null;
                    this._bottombase_position_type = null;
                }
                else
                {
                    this._addBasedList(comp);

                    this._bottombase_component_id = linkedId;
                    if (position)
                    {
                        this._bottombase_position_type = position;
                    }
                    else
                    {
                        this._bottombase_position_type = "top";
                    }

                    if (old_base)
                    {
                        if (this._bottombase_position_type == "top")
                        {
                            _val = comp._adjust_top - (this._adjust_top + this._adjust_height);
                        }
                        else
                        {
                            _val = (comp._adjust_top + comp._adjust_height) - (this._adjust_top + this._adjust_height);
                        }
                    }
                    else
                    {
                        _val = this.bottom ? this._convToPixel(this.bottom, this.parent ? this.parent._control_element.client_width : 0) : this._adjust_top + this._adjust_height;
                        if (this._bottombase_position_type == "top")
                        {
                            _val = comp._adjust_top - _val;
                        }
                        else
                        {
                            _val = (comp._adjust_top + comp._adjust_height) - _val;
                        }
                    }

                    if (this.bottom)
                    {
                        if (typeof (this.bottom) == "string" && this.bottom.indexOf("%") >= 0)
                        {
                            this.bottom = this._convToRate(_val, comp._adjust_height).toFixed(2) + "%";
                        }
                        else
                        {
                            this.bottom = _val;
                        }
                    }
                }

                if (nexacro._isNull(this.bottom) && nexacro._isNull(this.top))
                {
                    this._update_position(false, false);
                }
            }
        }
    };

    _pComponent.set_widthbase = function (basePosition)
    {   
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.widthbase != basePosition)
        {
            this.widthbase = basePosition;

            /*
            if (basePosition)
            {
                linkedId = basePosition;
            }
            else
            {
                if (this._widthbase_component_id)
                {
                    baseComp = linkedId = this._widthbase_component_id;
                }
            }
            if (comp)
            {
                var _val;
                if (baseComp != null)
                {
                    // 기존에 설정된 basecomp가 있고. 부모 기준 크기로 변경.
                    _val = this._convToPixel(this._adjust_width, this.parent ? this.parent._adjust_width : 0);
                    comp._based_list.pop(this.id);
                    
                    this._widthbase_component_id = null;
                    this.width = _val;
                }
                else
                {
                    // 설정된 basecompnent로 변경
                    this._addBasedList(comp);
                    this._widthbase_component_id = basePosition;

                    if (typeof (this.width) == "string" && this.width.indexOf("%") >= 0) // %인 경우만 %로
                    {
                        _val = this._convToRate(this._adjust_width, comp._adjust_width);
                        this.width = _val + "%";
                    }
                }
            }
            */ 


            // base position 변경
            if (this._widthbase_component_id)
            {
                baseComp = this._getFormChildById(this._widthbase_component_id);
                if (baseComp)
                {
                    // 기존 baseComp 정보 삭제 
                    baseComp._based_list.pop(this.id);
                }
            }
            if (basePosition)
            {
                var base_comp = this._getFormChildById(basePosition);
                if (base_comp)
                {
                    // 설정된 basecompnent로 변경
                    this._addBasedList(base_comp);
                    this._widthbase_component_id = basePosition;

                    if (typeof (this.width) == "string" && this.width.indexOf("%") >= 0) // %인 경우만 %로
                    {
                        _val = this._convToRate(this._adjust_width, base_comp._adjust_width).toFixed(2);
                        this.width = _val + "%";
                    }
                }
            }
            else
            {
                this._widthbase_component_id = null;
                if (typeof (this.width) == "string" && this.width.indexOf("%") >= 0) // %인 경우만 %로
                {
                    _val = this._convToRate(this._adjust_width, this.parent ? this.parent._adjust_width : 0).toFixed(2);
                    this.width = _val + "%";
                }
            }
        }
    };

    _pComponent.set_heightbase = function (basePosition)
    {
        var baseComp = null;
        var linkedId = null;
        var position = null;

        if (this.heightbase != basePosition)
        {
            this.heightbase = basePosition;
            /*
            if (basePosition)
            {
                linkedId = basePosition;
            }
            else
            {
                if (this._heightbase_component_id)
                {
                    baseComp = linkedId = this._heightbase_component_id;
                }
            }

            var comp = this._getFormChildById(linkedId);
            if (comp)
            {
                var _val;
                if (baseComp != null)
                {
                    _val = this._convToPixel(this._adjust_height, this.parent ? this.parent._adjust_height : 0);                    
                    comp._based_list.pop(this.id);
                    
                    this._heightbase_component_id = null;
                    this.height = _val;                    
                }
                else
                {
                    this._addBasedList(comp);
                    this._heightbase_component_id = basePosition;
                    
                    if (typeof (this.height) == "string" && this.height.indexOf("%") >= 0) // %인 경우만 %로
                    {
                        _val = this._convToRate(this._adjust_height, comp._adjust_height);
                        this.height = _val + "%";
                    }
                }
            }
            */

            // base position 변경
            if (this._heightbase_component_id)
            {
                baseComp = this._getFormChildById(this._heightbase_component_id);
                if (baseComp)
                {
                    // 기존 baseComp 정보 삭제 
                    baseComp._based_list.pop(this.id);
                }
            }
            if (basePosition)
            {   
                var base_comp = this._getFormChildById(basePosition);
                if (base_comp)
                {
                    // 설정된 basecompnent로 변경
                    this._addBasedList(base_comp);
                    this._heightbase_component_id = basePosition;
                    if (typeof (this.height) == "string" && this.height.indexOf("%") >= 0) // %인 경우만 %로
                    {
                        _val = this._convToRate(this._adjust_height, base_comp._adjust_height).toFixed(2);
                        this.height = _val + "%";
                    }
                }
            }
            else
            {
                this._heightbase_component_id = null;
                if (typeof (this.height) == "string" && this.height.indexOf("%") >= 0) // %인 경우만 %로
                {
                    _val = this._convToRate(this._adjust_height, this.parent ? this.parent._adjust_height : 0).toFixed(2);
                    this.height = _val + "%";
                }
            }
        }
    };

    _pComponent._init_position = function (left, top, width, height, right, bottom)
    {
        // 2015.07.31 박현진
        // xml 기준의 정보를 갖고 초기화 할때 호출되는 함수이다.
        // xml에 저장된 정보는 모두 base 기준으로 재계산 된 값이므로 그냥 적용하면 됨

        // Frame은 재정의함.
        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var bsize = false, bmove = false;
        var update = false;
        
        //trace("_pComponent._init_position");

        this._adjustPosition(left, top, right, bottom, width, height, this.parent._control_element.client_width, this.parent._control_element.client_height);

        //trace("nl:" + left + ", nt:" + top + ", nw:" + width + ", nh:" + height + ", nr:" + right + ", nb:" + bottom);
        //trace("l:" + old_left + ", t:" + old_top + ", w:" + old_width + ", h:" + old_height);
        //trace("l2:" + this._adjust_left + ", t2:" + this._adjust_top + ", w2:" + this._adjust_width + ", h2:" + this._adjust_height);

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

        this.on_update_position(bsize, bmove, true);

        if (this._control_element)
        {   
            // lym
            //var pseudo = this._getResultPseudo(this._status, this._pseudo);
            //this._updateControl(this._control_element, pseudo);
            //this._updateContents(this._control_element, pseudo);

            this._updateControl(this._control_element);         
        }
    };

    _pComponent._rePositioning = function (left, top, width, height, right, bottom)
    {
        /* 
            positionbase가 걸려있는 컴포넌트임에도 Cy_DesignInterface::MoveComponent 에서 Rect계산을 부모기준으로 계산해서 넘겨주기때문에
            해당 좌표를 positionbase 기준으로 되돌릴때 사용하기 위함.
        */
        
        var old_left = this._adjust_left;
        var old_top = this._adjust_top;
        var old_width = this._adjust_width;
        var old_height = this._adjust_height;
        var bsize = false, bmove = false;
        var update = false;

        var base_comp;
        var _val;

        if (this._leftbase_component_id)
        {
            base_comp = this._getFormChildById(this._leftbase_component_id);
            if (base_comp)
            {
                if (this._leftbase_position_type == "right")
                    left -= base_comp._adjust_left + base_comp._adjust_width;
                else
                    left -= base_comp._adjust_left;
            }
        }
        if (this._topbase_component_id)
        {
            base_comp = this._getFormChildById(this._topbase_component_id);
            if (base_comp)
            {
                if (this._topbase_position_type == "bottom")
                    top -= base_comp._adjust_top + base_comp._adjust_height;
                else
                    top -= base_comp._adjust_top;
            }
        }
        //if (right && this._rightbase_component_id)
        //{
        //    base_comp = this._getFormChildById(this._rightbase_component_id);
        //    if (base_comp)
        //    {
        //        if (this._rightbase_position_type == "left")
        //            right -= (this.parent ? this.parent._client_width : 0) - base_comp._adjust_left;
        //        else
        //            right -= (this.parent ? this.parent._client_width : 0) - base_comp._adjust_left - base_comp._adjust_width;
        //    }
        //}
        if (this._bottombase_component_id)
        {
            base_comp = this._getFormChildById(this._bottombase_component_id);
            if (base_comp)
            {
                if (this._rightbase_position_type == "top")
                    bottom -= (this.parent ? this.parent._control_element.client_height : 0) - base_comp._adjust_top;
                else
                    bottom -= (this.parent ? this.parent._control_element.client_height : 0) - base_comp._adjust_top - base_comp._adjust_height;
            }
        }        
        
        this._adjustPosition(left, top, right, bottom, width, height, this.parent._control_element.client_width, this.parent._control_element.client_height);
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

        this.on_update_position(bsize, bmove, true);

        if (this._control_element)
        {   
            
            // lym
            //var pseudo = this._getResultPseudo(this._status, this._pseudo);
            //this._updateControl(this._control_element, pseudo);
            //this._updateContents(this._control_element, pseudo);

            this._updateControl(this._control_element);
        }
    };

    _pComponent._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight)
    {		    	
        // 1. Step 펼쳐보기에 대한 Offset 기능 추가
        var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
        nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);

        var form = this._getForm();
        var bRtl = this._isRtl(this.parent);
        // position base
        var this_name;
        var this_left, this_right, this_top, this_bottom;
        var base_left, base_right, base_top, base_bottom, base_width, base_height;
        var bLeftWidth, bRightWidth, bTopHeight, bBottomHeight;
        var _position_base_left, _position_base_right, _position_base_top, _position_base_bottom;
        var leftBaseComp, rightBaseComp, topBaseComp, bottomBaseComp;
        var leftWidth, rightWidth, topHeight, bottomHeight;

        this_left = this_right = this_top = this_bottom = 0;
        base_left = base_right = base_top = base_bottom = base_width = base_height = 0;
        leftBaseComp = rightBaseComp = topBaseComp = bottomBaseComp = null;
        _position_base_left = _position_base_right = _position_base_top = _position_base_bottom = null;
        leftWidth = rightWidth = topHeight = bottomHeight = 0;

        // 중앙정렬 (단순)
        if (this._left === null && this._right === null && this._width)
        {
            if (this._leftbase_component_id)
            {
                leftBaseComp = this._getFormChildById(this._leftbase_component_id);
                if (this._leftbase_position_type == "left")
                {
                    base_left = leftBaseComp._adjust_left;
                }
                else
                {
                    base_left = leftBaseComp._adjust_left + leftBaseComp._adjust_width;
                }
            }
            else
            {
                base_left = form._adjust_left;
            }

            if (this._rightbase_component_id)
            {
                rightBaseComp = this._getFormChildById(this._rightbase_component_id);
                if (this._rightbase_position_type == "left")
                {
                    base_right = rightBaseComp._adjust_left;
                }
                else
                {
                    base_right = rightBaseComp._adjust_left + rightBaseComp._adjust_width;
                }
            }
            else
            {
                base_right = form._adjust_left + form._adjust_width;
            }

            base_width = base_right - base_left;
            _position_base_left = _position_base_right = base_left + (base_width - this._width) / 2; // 부모크기를 기준으로 중앙정렬
        }
        if (this._top === null && this._bottom === null && this._height)
        {
            if (this._topbase_component_id)
            {
                topBaseComp = this._getFormChildById(this._topbase_component_id);
                if (this._topbase_position_type == "top")
                {
                    base_top = topBaseComp._adjust_top;
                }
                else
                {
                    base_top = topBaseComp._adjust_top + topBaseComp._adjust_height;
                }
            }
            else
            {
                base_top = form._adjust_top;
            }

            if (this._bottombase_component_id)
            {
                bottomBaseComp = this._getFormChildById(this._bottombase_component_id);
                if (this._bottombase_position_type == "top")
                {
                    base_bottom = bottomBaseComp._adjust_top;
                }
                else
                {
                    base_bottom = bottomBaseComp._adjust_top + bottomBaseComp._adjust_height;
                }
            }
            else
            {
                base_bottom = form._adjust_top + form._adjust_height;
            }

            base_height = base_bottom - base_top;
            _position_base_top = _position_base_bottom = base_top + (base_height - this._height) / 2; // 부모크기를 기준으로 중앙정렬
        }

        //////////////////////////////////////////////////////////
        // left width 구하기
        // right width 구하기
        // 자신의 위치 구하기
        if (this._leftbase_component_id && this._left !== null)
        {
            leftBaseComp = this._getFormChildById(this._leftbase_component_id);
            this_name = this.name;
            this_left = this._left;
            while (leftBaseComp && leftBaseComp._rightbase_component_id == this_name)
            {
                leftWidth += this_left + leftBaseComp._adjust_width;

                if (leftBaseComp._leftbase_component_id)
                {
                    this_name = leftBaseComp.name;
                    this_left = leftBaseComp._left;
                    leftBaseComp = leftBaseComp._getFormChildById(leftBaseComp._leftbase_component_id);
                }
                else if (leftBaseComp._left === null)
                {
                    bLeftWidth = true;
                    break;
                }
                else
                {
                    break;
                }   
            }

            if (!bLeftWidth)
            {
                baseComp = this._getFormChildById(this._leftbase_component_id);
                if (this._leftbase_position_type == "right")
                    _position_base_left = baseComp._adjust_left + baseComp._adjust_width + this._left;
                else
                    _position_base_left = baseComp._adjust_left + this._left;
            }
        }

        if (this._rightbase_component_id && this._right !== null)
        {
            rightBaseComp = this._getFormChildById(this._rightbase_component_id);
            this_name = this.name;
            this_right = this._right;

            while (rightBaseComp && rightBaseComp._leftbase_component_id == this_name)
            {
                rightWidth += this_right + rightBaseComp._adjust_width;

                if (rightBaseComp._rightbase_component_id)
                {
                    this_name = rightBaseComp.name;
                    this_right = rightBaseComp._right;
                    rightBaseComp = rightBaseComp._getFormChildById(rightBaseComp._rightbase_component_id);
                }
                else if (rightBaseComp._right === null)
                {
                    bRightWidth = true;
                    break;
                }
                else
                {
                    break;
                }   
            }

            if (!bRightWidth)
            {
                baseComp = this._getFormChildById(this._rightbase_component_id);
                this_right = this._right;
                if (this._rightbase_position_type == "left")
                {
                    _position_base_right = baseComp._adjust_left - this_right;
                }	
                else
                {
                    _position_base_right = baseComp._adjust_left + baseComp._adjust_width - this_right;
                }   
            }
        }

        if (this._topbase_component_id && this._top !== null)
        {
            topBaseComp = this._getFormChildById(this._topbase_component_id);
            this_name = this.name;
            this_top = this._top;

            while (topBaseComp && topBaseComp._bottombase_component_id == this_name)
            {
                topHeight += this_top + topBaseComp._adjust_height;

                if (topBaseComp._topbase_component_id)
                {
                    this_name = topBaseComp.name;
                    this_top = topBaseComp._top;
                    topBaseComp = topBaseComp._getFormChildById(topBaseComp._topbase_component_id);
                }
                else if (topBaseComp.top === null)
                {
                    bTopHeight = true;
                    break;
                }
                else
                {
                    break;
                }   
            }

            if (!bTopHeight)
            {
                baseComp = this._getFormChildById(this._topbase_component_id);
                if (this._topbase_position_type == "bottom")
                {
                    _position_base_top = baseComp._adjust_top + baseComp._adjust_height + this._top;
                }   
                else
                {
                    _position_base_top = baseComp._adjust_top + this._top;
                }   
            }
        }

        if (this._bottombase_component_id && this._bottom !== null)
        {
            bottomBaseComp = this._getFormChildById(this._bottombase_component_id);
            this_name = this.name;
            this_bottom = this._bottom;

            while (bottomBaseComp && bottomBaseComp._topbase_component_id == this_name)
            {
                bottomHeight += this_bottom + bottomBaseComp._adjust_height;

                if (bottomBaseComp._bottombase_component_id)
                {
                    this_name = bottomBaseComp.name;
                    this_bottom = bottomBaseComp._bottom;
                    bottomBaseComp = bottomBaseComp._getFormChildById(bottomBaseComp._bottombase_component_id);
                }
                else if (bottomBaseComp._bottom === null)
                {
                    bBottomHeight = true;
                    break;
                }
                else
                {
                    break;
                }   
            }

            if (!bBottomHeight)
            {
                baseComp = this._getFormChildById(this._bottombase_component_id);
                this_bottom = this._bottom;
                if (this._bottombase_position_type == "top")
                {
                    _position_base_bottom = baseComp._adjust_top - this_bottom;
                }   
                else
                {
                    _position_base_bottom = baseComp._adjust_top + baseComp._adjust_height - this_bottom;
                }
            }
        }

        if (bLeftWidth || bRightWidth)
        {
            if (this._width === null)
                this._width = this._adjust_width;
            _position_base_left = ((parentWidth - (leftWidth + this._width + rightWidth)) / 2) + leftWidth;
            _position_base_right = _position_base_left + this._width;
        }

        if (bTopHeight || bBottomHeight)
        {
            if (this._height === null)
                this._height = this._adjust_height;
            _position_base_top = ((parentHeight - (topHeight + this._height + bottomHeight)) / 2) + topHeight;
            _position_base_bottom = this._top + this._height;
        }

        if (this._width != null || (this._right != null && this._left != null))
        {
            
            this._adjust_width = this._width != null ? this._width : _position_base_right ? _position_base_right - (_position_base_left ? _position_base_left : this._left) :
                parentWidth - (_position_base_left ? _position_base_left : this._left) - this._right;

            if (this._minwidth)
            {
                if (this._adjust_width < this._minwidth) this._adjust_width = this._minwidth;
            }
            if (this._maxwidth)
            {
                if (this._adjust_width > this._maxwidth) this._adjust_width = this._maxwidth;
            }

        }

        if (this._height != null || (this._bottom != null && this._top != null))
        {
            this._adjust_height = this._height != null ? this._height : _position_base_bottom ? _position_base_bottom - (_position_base_top ? _position_base_top : this._top) :
                parentHeight - (_position_base_top ? _position_base_top : this._top) - this._bottom;

            if (this._minheight)
            {
                if (this._adjust_height < this._minheight) this._adjust_height = this._minheight;
            }
            if (this._maxheight)
            {
                if (this._adjust_height > this._maxheight) this._adjust_height = this._maxheight;
            }
        }

        var design_form = null;//this._getDesignForm();
        var scale = design_form ? design_form._getZoom() : 100;
        if (this._left != null || this._right != null || _position_base_left != null || _position_base_right != null)
        {
            //this._adjust_left_ltr = this._adjust_left = (this._left != null) ? (step_logical_offset + this._left) : (step_logical_offset + (parentWidth - this._right - this._adjust_width));
            //if (design_form)
            //{
            //    var temp = this._adjust_left_ltr;
            //    temp = design_form._root_left / (scale / 100) - design_form._scroll_left;
            //    this._adjust_left_ltr = this._adjust_left = temp;
            //}
            
            this._adjust_left_ltr = this._adjust_left = _position_base_left ? _position_base_left :
                this._left != null ? this._left : _position_base_right ? _position_base_right - this._adjust_width : parentWidth - this._right - this._adjust_width;
            this._adjust_left_ltr += step_logical_offset;
            this._adjust_left += step_logical_offset;
            if (design_form)
            {
                var temp = this._adjust_left_ltr;
                temp = design_form._root_left / (scale / 100) - design_form._scroll_left;
                this._adjust_left_ltr = this._adjust_left = temp;
            }

            if (bRtl)
            {
                // TODO 2014.05.23 .... to do.....

                this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
            }
        }

        if (this.top != null || this._bottom != null || _position_base_top != null || _position_base_bottom != null)
        {
            this._adjust_top = _position_base_top ? _position_base_top :
                this._top != null ? this._top : _position_base_bottom ? _position_base_bottom - this._adjust_height : parentHeight - this._bottom - this._adjust_height;
            if (design_form)
            {
                var temp = this._adjust_top;
                temp = design_form._root_top / (scale / 100) - design_form._scroll_top;
                this._adjust_top = temp;
            }
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

    _pComponent.createCssDesignContents = nexacro._emptyFn;
    _pComponent.destroyCssDesignContents = nexacro._emptyFn;



	// 컴포넌트 하위 컨트롤중에서 해당 idcssselector 를 가진 컨트롤을 리턴
    _pComponent.on_getChildObjectforCSSPreivew = function (idcssselector)
    {
    	return null;
    };

	//objpath = titlebar.minbutton
	//objpath = ""  이면 self 

	//status = disabled > mouseover > focused > deactivate > readonly > enable
	//statusvalue = true/ false

	//userstatus = pushed >  selected > readonly
	//userstatusvalue = true/ false

	
    _pComponent.showCssDesignContents = function (objpath, status, statusvalue, userstatus, userstatusvalue)
    {
    	var updateobj = null;
    	if (!objpath || objpath == "")
    	{
    		updateobj = this;
    	}
    	else
    	{
    		var objpaths = objpath.split(".");
    		var objcnt = objpaths.length;
			 
    		var parent = this;    		
    		for (var i = 0; i < objcnt; i++)
    		{
    			var idcssslector = objpaths[i];
    			updateobj = parent[idcssslector];
    			if (!updateobj)
    				updateobj = parent.on_getChildObjectforCSSPreivew(idcssslector);
    			if (updateobj)
    			{
    				parent = updateobj;    				
    			}
    		}
    	}

    	if (updateobj)
    	{
    		if (status)
    			updateobj._changeStatus(status, statusvalue);
    		if (userstatus)
    			updateobj._changeUserStatus(userstatus, userstatusvalue);
    	}
    };

    // Preview Form Component Move Position
    _pComponent.updatePreviewPosition = function()
    {
        // component align : center middle
        var form = this.parent;
        var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
        var offset_top = (form._adjust_height / 2) - (this._adjust_height / 2);

        this.move(offset_left, offset_top);
    };

    // Metainfo의 Default 값과 별개로 기본으로 세팅해줘야 할 Property를 세팅한다.
    // (taborder는 designform에서 직접 설정한다)
    _pComponent._initDesignDefaultProperty = function ()
    {
        if (this["set_text"])
        {
            this.set_text(this.name);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    _pComponent._refresh = function ()
    {
        this._makeCSSMapInfo();
    	var enabledselector = this._cssselector.enabled;
    	if (enabledselector)
    		control_elem.setElementCSSMapInfo(enabledselector.border, enabledselector.padding, enabledselector.edge);

        control_elem.setElementSize(this._adjust_width, this._adjust_height);
    };

    _pComponent._getBorderWidth = function ()
    {
        var str;
        var control_elem = this.getElement();
        if (control_elem)
            str = control_elem._getComputedStyleValue("border");

        var objBorder = nexacro.BorderObject(str);
        if ((typeof objBorder) == "object")
        {
            if (objBorder.left && objBorder.top && objBorder.right && objBorder.bottom)
                return [objBorder.left._width, objBorder.top._width, objBorder.right._width, objBorder.bottom._width];
        }
        return [0, 0, 0, 0];        
    };


    _pComponent._getClientInnerWidth = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            var width = control_elem.inner_width;
            if (control_elem._apply_client_padding)
            {
                var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;
                if (padding)
                {
                    width -= padding.left + padding.right;
                }
            }

            return width;
        }

        return 0;
    };

    _pComponent._getClientInnerHeight = function ()
    {
        var control_elem = this._control_element;
        if (control_elem)
        {
            var height = control_elem.inner_height;
            if (control_elem._apply_client_padding)
            {
                var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;
                if (padding)
                {
                    height -= padding.top + padding.bottom;
                }
            }

            return height;
        }
        return 0;
    };


    delete _pComponent;
}

if (nexacro.PopupControl)
{
    var _pPopupControl = nexacro.PopupControl.prototype;

    _pPopupControl._popupBy = function (from_comp, left, top, width, height)
    {
        if (!this._attached_comp || !from_comp)
            return;

        var p = {};
        if (from_comp._isPreviewMode())
        {
            if (from_comp instanceof nexacro._MenuItemControl)
            {
                p = { x: from_comp.parent._adjust_left, y: from_comp.parent._adjust_top };
            }
            else
            {
                p = { x: from_comp._adjust_left, y: from_comp._adjust_top };
            }
        }
        else
        {
            p = nexacro._getElementPositionInFrame(from_comp.getElement());
        }

        var win_left = p.x + left;
        var win_top = p.y + top;

        var _window = this._getWindow();
        if (_window && this._track_capture)
        {
            _window._setCaptureLock(this._attached_comp, true, false);
        }

        var control_elem = this._control_element;
        if (control_elem)
        {
            control_elem.setElementPosition(win_left, win_top);
            control_elem.setElementSize(width, height);
        }

        this.set_visible(true);
    };

    delete _pPopupControl;
}