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
// nexacro Style Object Data
//==============================================================================

if (!nexacro._bInitCssObjects)
{
	"use strict";

	var _process = true;
	nexacro._bInitCssObjects = true;

	//==============================================================================
	// nexacro New Style Data Object
	//==============================================================================
	nexacro._CSSValueObject = function (v)
	{
		var val = v.trim();
		if (val)
		{
			this.value = val;
			var pos = val.search(/px|pt|cm|em|%/i);
			if (pos < 0)
				return null;
			this._unit = val.substr(pos).toLowerCase();
			var size = (+val.substring(0, pos));
			if (size != size)
				return null;
			this._sysvalue = size;
		}
	};

	var _pCSSValueObject = nexacro._createPrototype(nexacro.Object, nexacro._CSSValueObject);
	nexacro._CSSValueObject.prototype = _pCSSValueObject;
	_pCSSValueObject._type_name = "CSSValueObject";

	_pCSSValueObject.value = "";
	_pCSSValueObject._value = 0;
	_pCSSValueObject._unit = "";

	// override for value
	_pCSSValueObject.valueOf = function ()
	{
		return this.value;
	};
	_pCSSValueObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._CSSValueObject_caches = {};
	nexacro.CSSValueObject = function (val)
	{
		var obj = nexacro._CSSValueObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._CSSValueObject(val);
		if (obj)
		{
			nexacro._CSSValueObject_caches[val] = obj;
		}
		return obj;
	};


	//==============================================================================
	nexacro._ColorObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebColor(val);
			}
		}
	};

	var _pColorObject = nexacro._createPrototype(nexacro.Object, nexacro._ColorObject);
	nexacro._ColorObject.prototype = _pColorObject;
	_pColorObject._type_name = "ColorObject";

	_pColorObject.value = "";
	_pColorObject._sysvalue = "";

	// override for value
	_pColorObject.valueOf = function ()
	{
		return this.value;
	};
	_pColorObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._ColorObject_caches = {};
	nexacro.ColorObject = function (val)
	{
		var obj = nexacro._ColorObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._ColorObject(val);
		nexacro._ColorObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._FontObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
			    this.value = val;
			    this._sysvalue = val;

			    var parts = val.split(/\s+/);
			    var cnt = parts.length;

			    if (cnt > 0)
                {
			        var pos = -1;
			        var part;
			        while (part = parts.shift())
			        {
			            pos = part.search(/px|pt|cm|em|%/i);
			            if (pos > -1)
			                break;
			        }
				    if (pos < 0)
					    return null;
				    var unit = part.substr(pos, 2);
				    if (unit.charAt(1) == " " || unit.charAt(1) == "/")
					    this._unit = unit.substring(0, 1);
				    else
					    this._unit = unit.toLowerCase();
				    var spos = part.lastIndexOf(' ', pos);
				    var size = (+part.substring(spos + 1, pos));
				    if (size != size) // isNaN
					    return null;
				    this._size = size;
			    }                
			}
		}
	};

	var _pFontObject = nexacro._createPrototype(nexacro.Object, nexacro._FontObject);
	nexacro._FontObject.prototype = _pFontObject;
	_pFontObject._type_name = "FontObject";

	_pFontObject.value = "";
	_pFontObject._sysvalue = "";
	_pFontObject._size = "";
	_pFontObject._unit = "";

	// override for value
	_pFontObject.valueOf = function ()
	{
		return this.value;
	};
	_pFontObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._FontObject_caches = {};
	nexacro.FontObject = function (val)
	{
		var obj = nexacro._FontObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._FontObject(val);
		if (obj)
		{
		nexacro._FontObject_caches[val] = obj;
		}
		return obj;
	};

	//==============================================================================
	nexacro._TextDecorationObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
			}
		}
	};

	var _pTextDecorationObject = nexacro._createPrototype(nexacro.Object, nexacro._TextDecorationObject);
	nexacro._TextDecorationObject.prototype = _pTextDecorationObject;
	_pTextDecorationObject._type_name = "TextDecorationObject";

	_pTextDecorationObject.value = "";

	// override for value
	_pTextDecorationObject.valueOf = function ()
	{
		return this.value;
	};
	_pTextDecorationObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._TextDecorationObject_caches = {};
	nexacro.TextDecorationObject = function (val)
	{
		var obj = nexacro._TextDecorationObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._TextDecorationObject(val);
		nexacro._TextDecorationObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._BorderLineObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val && val.indexOf("none") < 0)
			{
				this.style = "solid";
				this.value = val;
				this._width = 0;

				var parts = new Array();
				var cur_idx = 0;
				var next_idx = -1;

				var color_start_idx = -1;
				var color_end_idx = -1;

				var part;

				function find_color(str, idx)
				{
				    if (!str)
				        return -1;

				    str = str.toLowerCase();

				    var values = ["rgb", "rgba", "hsl", "hsla"];
				    var len = values.length;
				    var n = -1;
				    for (var i = 0; i < len; i++)
				    {
				        n = str.indexOf(values[i], idx);
				        if (n >= 0)
				        {
				            return n;
				        }
				    }

				    return -1;
				}

				while (true)
				{
				    color_start_idx = find_color(val, cur_idx);
				    next_idx = val.indexOf(" ", cur_idx);

				    if (color_start_idx > 0 && color_start_idx < next_idx)
				    {
				        color_end_idx = val.indexOf(")", color_start_idx);
				        next_idx = val.indexOf(" ", color_end_idx);
				    }

				    if (next_idx > 0)
				    {
				        part = val.slice(cur_idx, next_idx);
				        cur_idx = next_idx + 1;
				    }
				    else
				    {
				        part = val.slice(cur_idx);
				        cur_idx = val.length + 1;
				    }

				    parts[parts.length] = part.trim();

				    if (cur_idx >= val.length)
				        break;

				}


				//var parts = val.split(/\s+/);
				var cnt = parts.length;
				for (var i = 0; i < cnt; i++)
				{
					var str = parts[i];

					switch (str)
					{
						case "thin":
							if (this.style != "none")
							{
								this.width = str;
								this._width = 1;
							}
							break;
						case "midium":
							if (this.style != "none")
							{
								this.width = str;
								this._width = 3;
							}
							break;
						case "thick":
							if (this.style != "none")
							{
								this.width = str;
								this._width = 5;
							}
							break;

						case "solid":
						case "double":
						case "dotted":
						case "dashed":
							this.style = str;
							break;

						default:
						    if (str.charAt(0) >= '0' && str.charAt(0) <= '9')
							{
								var wv = parseInt(str);
								if (wv == 0)
								{
									this.value = "none";
									this.width = "";
									this._width = 0;
									this.style = "none";
									this.color = "";
									return;
								}
								this.width = wv + "px";
								this._width = wv;
							}
							else
							{
								if (!this.color)
									this.color = nexacro._getSupportedWebColor(str);
							}
							break;
					}
				}
			}
		}
	};

	var _pBorderLineObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderLineObject);
	nexacro._BorderLineObject.prototype = _pBorderLineObject;
	_pBorderLineObject._type_name = "BorderLineObject";

	_pBorderLineObject.value = "none";
	_pBorderLineObject.width = "";
	_pBorderLineObject._width = 0;
	_pBorderLineObject.style = "none";
	_pBorderLineObject.color = "";

	// override for value
	_pBorderLineObject.valueOf = function ()
	{
		return this.value;
	};
	_pBorderLineObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._BorderLineObject_caches = {};
	nexacro.BorderLineObject = function (val)
	{
		var obj = nexacro._BorderLineObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._BorderLineObject(val);
		nexacro._BorderLineObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._BorderRadiusObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
			}
		}
	};

	var _pBorderRadiusObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderRadiusObject);
	nexacro._BorderRadiusObject.prototype = _pBorderRadiusObject;
	_pBorderRadiusObject._type_name = "BorderRadiusObject";

	_pBorderRadiusObject.value = "";

	// override for value
	_pBorderRadiusObject.valueOf = function ()
	{
		return this.value;
	};
	_pBorderRadiusObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._BorderRadiusObject_caches = {};
	nexacro.BorderRadiusObject = function (val)
	{
		var obj = nexacro._BorderRadiusObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._BorderRadiusObject(val);
		nexacro._BorderRadiusObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._BorderObject = function (v)
	{
		if (v && (typeof (v) == "string") && v != "none")
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;

				var parts = new Array();
				var cur_idx = 0;
				var next_idx = -1;

				var color_start_idx = -1;
				var color_end_idx = -1;

				var part;

				function find_color(str, idx)
				{
				    if (!str)
				        return -1;

				    str = str.toLowerCase();

				    var values = ["rgb", "rgba", "hsl", "hsla"];
				    var len = values.length;
				    var n = -1;
				    var ret = -1;
				    for (var i = 0; i < len; i++)
				    {
				        n = str.indexOf(values[i], idx);
				        if (n >= 0 )
				        {
				            if (ret >= 0)
				                ret = n < ret ? n : ret;
				            else
				                ret = n;
				        }
				    }

				    return ret;
				}

				while (true)
				{
				    color_start_idx = find_color(val, cur_idx);
				    next_idx = val.indexOf(",", cur_idx);

				    if (color_start_idx > 0 && color_start_idx < next_idx)
				    {
				        color_end_idx = val.indexOf(")", color_start_idx);
				        next_idx = val.indexOf(",", color_end_idx);
				    }

				    if (next_idx > 0)
				    {
				        part = val.slice(cur_idx, next_idx);
				        cur_idx = next_idx + 1;
				    }
				    else
				    {
				        part = val.slice(cur_idx);
				        cur_idx = val.length + 1;
				    }

				    parts[parts.length] = part.trim();

				    if (cur_idx >= val.length)
				        break;

				}
				
				var cnt = parts.length;
				switch (cnt)
				{
					case 1:
						this._single = true;
						this.top = this.right = this.bottom = this.left = nexacro.BorderLineObject(parts[0]);
						break;
					case 2:
						this._single = false;
						this.top = this.bottom = nexacro.BorderLineObject(parts[0]);
						this.left = this.right = nexacro.BorderLineObject(parts[1]);
						break;
					case 3:
						this._single = false;
						this.top = nexacro.BorderLineObject(parts[0]);
						this.left = this.right = nexacro.BorderLineObject(parts[1]);
						this.bottom = nexacro.BorderLineObject(parts[2]);
						break;
					case 4:
						this._single = false;
						this.top = nexacro.BorderLineObject(parts[0]);
						this.right = nexacro.BorderLineObject(parts[1]);
						this.bottom = nexacro.BorderLineObject(parts[2]);
						this.left = nexacro.BorderLineObject(parts[3]);
						break;
				}
			}
		}
	};

	var _pBorderObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderObject);
	nexacro._BorderObject.prototype = _pBorderObject;
	_pBorderObject._type_name = "BorderObject";

	_pBorderObject.value = "none";
	_pBorderObject._single = true;
	_pBorderObject.left = null;
	_pBorderObject.top = null;
	_pBorderObject.right = null;
	_pBorderObject.bottom = null;

	// override for value
	_pBorderObject.valueOf = function ()
	{
		return this.value;
	};
	_pBorderObject.toString = function ()
	{
		return this.value;
	};

	_pBorderObject._getBorderWidth = function ()
	{
		return (this.left ? this.left._width : 0) + (this.right ? this.right._width : 0);
	};
	_pBorderObject._getBorderHeight = function ()
	{
		return (this.top ? this.top._width : 0) + (this.bottom ? this.bottom._width : 0);
	};

	_pBorderObject._getBorderLeftWidth = function ()
	{
		return (this.left ? this.left._width : 0);
	};
	_pBorderObject._getBorderTopWidth = function ()
	{
		return (this.top ? this.top._width : 0) ;
	};
	
	// for object cache
	nexacro._BorderObject_caches = {};
	nexacro.BorderObject = function (val)
	{
	    var obj = nexacro._BorderObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._BorderObject(val);
		nexacro._BorderObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._BKGradientObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebGradient(val);
			}
		}
	};

	var _pBKGradientObject = nexacro._createPrototype(nexacro.Object, nexacro._BKGradientObject);
	nexacro._BKGradientObject.prototype = _pBKGradientObject;
	_pBKGradientObject._type_name = "BKGradientObject";

	_pBKGradientObject.value = "";
	_pBKGradientObject._sysvalue = "";

	// override for value
	_pBKGradientObject.valueOf = function ()
	{
		return this.value;
	};
	_pBKGradientObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._BKGradientObject_caches = {};
	nexacro.BKGradientObject = function (val)
	{
		var obj = nexacro._BKGradientObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._BKGradientObject(val);
		nexacro._BKGradientObject_caches[val] = obj;
		return obj;
	};


	

    //==============================================================================
    //set_background("red");	
	//set_background("linear-gradient(to right, blue, #e4e4e4)");  ==>gradient support ie10, HTML5  
    //set_background("url(theme://images/alert_confirm.png) no-repeat center top");	
    //set_background("url(theme://images/alert_confirm.png) left top no-repeat red");
    //set_background("red url(theme://images/alert_confirm.png) left top no-repeat");
	//set_background("transparent");
	nexacro._BackgroundObject = function (v, target)
	{	   
		if (v && (typeof (v) == "string"))
		{
		    var val = v.trim();
			if (val)
			{
			    this.value = val;
			    if (val == "none")
				{
					this.url = "none";
					return;
				}

				var props = val.split(/\s+/);
				var cnt = props.length;

				var bLoadColor = true;
				var bLoadImage = true;
				var bLoadGradient = true;
				var bLoadRepeat = true;
				var bLoadPos = true;
				for (var i = 0; i < cnt; i++)
				{
					var part = props[i];
					if (bLoadImage && part.substring(0, 3).toLowerCase() == "url")
					{
					    //bLoadColor = false;
					    bLoadImage = false;
					    var urlstr = part;

					    if (part.indexOf(")") < 0)  //for space
					    {
					        for (i++; i < cnt; i++)
					        {
					            urlstr += " " + props[i];
					            if (props[i].indexOf(")") >= 0)
					                break;
					        }
					    }

					    var url = /'.+'|".+"/.exec(urlstr);
					    if (!url)
					    {
					        url = /(.+)/.exec(urlstr)[0];
					        url = url.substring(4, url.length - 1).trim();
					    }
					    else
					    {
					        url = url[0];
					        url = url.replace(/\'|\"/g, '');
					    }

					    this.url = url;
					    this._sysbaseurl = nexacro._project_absolutepath;
					    this._sysurl = url.length > 0 ? nexacro._getSupportedImageUrl(url, this._sysbaseurl) : "";
					    continue;
					}


					if (bLoadRepeat && this._load_repeat(part))
					{
					    bLoadRepeat = false;
					    continue;
					}
					else if (bLoadPos && this._load_pos(part))
					{
					    bLoadPos = false;
					    if (i < (cnt - 1))
					    {
					        i++;
					        part = props[i];
					        this._load_pos2(part);
					    }
					    continue;
					}

					if (bLoadColor)
					{					    
					    if (part)
						{
						    bLoadColor = false;
						    var grstr = part;
						    var lcnt = nexacro.getMatchedCount(grstr, '(');
						    var rcnt = nexacro.getMatchedCount(grstr, ')');
						    if (lcnt != rcnt)
						    {
						        for (i++; i < cnt; i++)
						        {
						            grstr += " " + props[i];
						            lcnt += nexacro.getMatchedCount(grstr, '(');
						            rcnt += nexacro.getMatchedCount(grstr, ')');
						            if (lcnt == rcnt)
						            {
						                break;
						            }
						        }
						    }
						    var color = nexacro._getSupportedWebColor(grstr);
						    this.color = color;
						    this._syscolor = color;
							continue;
						}
					}
					
					if (bLoadGradient && (part.substring(0, 15).toLowerCase() == "linear-gradient"))
					{
						bLoadColor = false;
						bLoadImage = false;
						bLoadGradient = false;
						var grstr = part;
						var lcnt = nexacro.getMatchedCount(grstr, '(');
						var rcnt = nexacro.getMatchedCount(grstr, ')');
						if ((lcnt == 0) || (lcnt != rcnt))
						{
							for (i++; i < cnt; i++)
							{
								grstr += " " + props[i];
								lcnt += nexacro.getMatchedCount(grstr, '(');
								rcnt += nexacro.getMatchedCount(grstr, ')');
								if ((lcnt > 0) && (lcnt == rcnt))
								{
									break;
								}
							}
						}
						this.gradient = nexacro.BKGradientObject(grstr);
						continue;
					}

				}
			}
		}
	};

	var _pBackgroundObject = nexacro._createPrototype(nexacro.Object, nexacro._BackgroundObject);
	nexacro._BackgroundObject.prototype = _pBackgroundObject;
	_pBackgroundObject._type_name = "BackgroundObject";

	_pBackgroundObject.value = "";
	_pBackgroundObject.color = "";
	_pBackgroundObject.gradient = null;
	_pBackgroundObject.url = "";
	_pBackgroundObject.repeat = "no-repeat";
	_pBackgroundObject.pos_x = "left";
	_pBackgroundObject.pos_y = "top";
	_pBackgroundObject._syscolor = "";
	_pBackgroundObject._sysurl = "";
	_pBackgroundObject._sysbaseurl = "";
	
	// override for value
	_pBackgroundObject.valueOf = function ()
	{
		return this.value;
	};
	_pBackgroundObject.toString = function ()
	{
		return this.value;
	};

	_pBackgroundObject._load_repeat = function (str)
	{		
		if (str == "no-repeat" || str == "repeat" || str == "repeat-x" || str == "repeat-y")
		{
			this.repeat = str;
			return true;
		}
		return false;
	};

	_pBackgroundObject._load_pos = function (str)
	{
		if (str == "left" || str == "right" || str == "center")
		{
			this.pos_x = str;
			return true;
		}
		else if (str == "top" || str == "bottom")
		{
			this.pos_y = str;
			return false;
		}
		else if (str.search(/px|pt|cm|em|%/i) > 0)
		{
			this.pos_x = str;
			return true;
		}
		return false;
	};
	_pBackgroundObject._load_pos2 = function (str)
	{
		if (str == "top" || str == "bottom" | str == "center")
		{
			this.pos_y = str;
			return true;
		}
		else if (str == "left" || str == "right")
		{
			if (!this.pos_x)
				this.pos_x = str;
			return true;
		}
		else if (str.search(/px|pt|cm|em|%/i) > 0)
		{
			this.pos_y = str;
			return true;
		}
		return false;
	};

	// for object cache
	nexacro._BackgroundObject_caches = {};
	nexacro.BackgroundObject = function (val, target)
	{
		var obj = nexacro._BackgroundObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._BackgroundObject(val, target);
		nexacro._BackgroundObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._EdgeImageObject = function (v, target)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
			    this.value = val;
				var parts = val.split(/\s+/);
				var idx = 0;
				var cnt = parts.length;

				var part = parts[0];
				if (part.substring(0, 3).toLowerCase() == "url")
				{
					var image_url;
					var ch = part.charAt(4);
					if (ch == '\'' || ch == '\"') image_url = part.substring(5, part.lastIndexOf(ch));
					else image_url = part.substring(4, part.length - 1);
					this.url = image_url;
					this._sysbaseurl = nexacro._project_absolutepath;
					this._sysurl = nexacro._getSupportedImageUrl(image_url, this._sysbaseurl);
					idx++;
				}

				if (cnt >= 2)
				{
					part = parseInt(parts[1]);
					var edge = +(part);
					if (edge == edge) // !isFinite
					{
						this.edge_x = edge;

						part = parseInt(parts[2]);
						edge = +(part);
						if (edge == edge) // !isFinite
						{
							this.edge_y = edge;
						}
					}
				}
			}
		}
	};

	var _pEdgeImageObject = nexacro._createPrototype(nexacro.Object, nexacro._EdgeImageObject);
	nexacro._EdgeImageObject.prototype = _pEdgeImageObject;
	_pEdgeImageObject._type_name = "EdgeImageObject";

	_pEdgeImageObject.value = "";
	_pEdgeImageObject.url = "";
	_pEdgeImageObject.edge_x = 0;
	_pEdgeImageObject.edge_y = 0;
	_pEdgeImageObject._sysurl = "";

	// override for value
	_pEdgeImageObject.valueOf = function ()
	{
		return this.value;
	};
	_pEdgeImageObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._EdgeImageObject_caches = {};
	nexacro.EdgeImageObject = function (val, target)
	{
		var obj = nexacro._EdgeImageObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._EdgeImageObject(val, target);
		nexacro._EdgeImageObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._MarginObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;

				var parts = val.split(/\s+/);
				var cnt = parts.length;
				switch (cnt)
				{
					case 1:
						this.left = this.top = this.right = this.bottom = parseInt(parts[0]);
						break;
					case 2:
						this.top = this.bottom = parseInt(parts[0]);
						this.left = this.right = parseInt(parts[1]);
						break;
					case 3:
						this.top = parseInt(parts[0]);
						this.left = this.right = parseInt(parts[1]);
						this.bottom = parseInt(parts[2]);
						break;
					case 4:
						this.top = parseInt(parts[0]);
						this.right = parseInt(parts[1]);
						this.bottom = parseInt(parts[2]);
						this.left = parseInt(parts[3]);
						break;
				}
			}
		}
	};

	var _pMarginObject = nexacro._createPrototype(nexacro.Object, nexacro._MarginObject);
	nexacro._MarginObject.prototype = _pMarginObject;
	_pMarginObject._type_name = "MarginObject";

	_pMarginObject.value = "";
	_pMarginObject.left = 0;
	_pMarginObject.top = 0;
	_pMarginObject.right = 0;
	_pMarginObject.bottom = 0;

	// override for value
	_pMarginObject.valueOf = function ()
	{
		return this.value;
	};
	_pMarginObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._MarginObject_caches = {};
	nexacro.MarginObject = function (val)
	{
		var obj = nexacro._MarginObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._MarginObject(val);
		nexacro._MarginObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._PaddingObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;

				var parts = val.split(/\s+/);
				var cnt = parts.length;
				switch (cnt)
				{
					case 1:
						var tv = parseInt(parts[0]);
						this.left = this.top = this.right = this.bottom = (tv >= 0 ? tv : 0);
						break;
					case 2:
						var tv = parseInt(parts[0]);
						var rv = parseInt(parts[1]);
						this.top = this.bottom = (tv >= 0 ? tv : 0);
						this.left = this.right = (rv >= 0 ? rv : 0);
						break;
					case 3:
						var tv = parseInt(parts[0]);
						var rv = parseInt(parts[1]);
						var bv = parseInt(parts[2]);
						this.top = (tv >= 0 ? tv : 0);
						this.left = this.right = (rv >= 0 ? rv : 0);
						this.bottom = (bv >= 0 ? bv : 0);
						break;
					case 4:
						var tv = parseInt(parts[0]);
						var rv = parseInt(parts[1]);
						var bv = parseInt(parts[2]);
						var lv = parseInt(parts[3]);
						this.top = (tv >= 0 ? tv : 0);
						this.right = (rv >= 0 ? rv : 0);
						this.bottom = (bv >= 0 ? bv : 0);
						this.left = (lv >= 0 ? lv : 0);
						break;
				}
			}
		}
	};

	var _pPaddingObject = nexacro._createPrototype(nexacro.Object, nexacro._PaddingObject);
	nexacro._PaddingObject.prototype = _pPaddingObject;
	_pPaddingObject._type_name = "PaddingObject";

	_pPaddingObject.value = "";
	_pPaddingObject.left = 0;
	_pPaddingObject.top = 0;
	_pPaddingObject.right = 0;
	_pPaddingObject.bottom = 0;

	// override for value
	_pPaddingObject.valueOf = function ()
	{
		return this.value;
	};
	_pPaddingObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._PaddingObject_caches = {};
	nexacro.PaddingObject = function (val)
	{
		var obj = nexacro._PaddingObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._PaddingObject(val);
		nexacro._PaddingObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._AlignObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;

				var valarr = val.split(/\s+/);
				for (var i = 0, n = valarr.length; i < n; i++)
				{
					var tok = valarr[i];
					switch (tok)
					{
						case "left":
						case "center":
						case "right":
							this.halign = tok;
							break;
						case "top":
						case "middle":
						case "bottom":
							this.valign = tok;
							break;
					}
				}
			}
		}
	};

	var _pAlignObject = nexacro._createPrototype(nexacro.Object, nexacro._AlignObject);
	nexacro._AlignObject.prototype = _pAlignObject;
	_pAlignObject._type_name = "AlignObject";

	_pAlignObject.value = "";
	_pAlignObject.halign = "";
	_pAlignObject.valign = "";

	// override for value
	_pAlignObject.valueOf = function ()
	{
		return this.value;
	};
	_pAlignObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._AlignObject_caches = {};
	nexacro.AlignObject = function (val)
	{
		var obj = nexacro._AlignObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._AlignObject(val);
		nexacro._AlignObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._CursorObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebCursor(val);
			}
		}
	};

	var _pCursorObject = nexacro._createPrototype(nexacro.Object, nexacro._CursorObject);
	nexacro._CursorObject.prototype = _pCursorObject;
	_pCursorObject._type_name = "CursorObject";

	_pCursorObject.value = "auto";
	_pCursorObject._sysvalue = "default";

	// override for value
	_pCursorObject.valueOf = function ()
	{
		return this.value;
	};
	_pCursorObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._CursorObject_caches = {};
	nexacro.CursorObject = function (val)
	{
		var obj = nexacro._CursorObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._CursorObject(val);
		nexacro._CursorObject_caches[val] = obj;
		return obj;
	};


    //==============================================================================
    // opacity value range : 0 ~ 1
	nexacro._OpacityObject = function (v)
	{
		if (v)
		{
		    this.value = v;
		    this._sysvalue = v;
		/*	if ((v + "").indexOf(".") >= 0)
			{
			    this.value = v;
			    this._sysvalue = v;
			}
			else
			{			    
			    this.value = v;
			    this._sysvalue = v;
				//this._sysvalue = (parseInt(v) / 100);
			}
        */   
		}
	};

	var _pOpacityObject = nexacro._createPrototype(nexacro.Object, nexacro._OpacityObject);
	nexacro._OpacityObject.prototype = _pOpacityObject;
	_pOpacityObject._type_name = "Opacity";

	_pOpacityObject.value = 1;
	_pOpacityObject._sysvalue = 1;

	// override for value
	_pOpacityObject.valueOf = function ()
	{
		return this.value;
	};
	_pOpacityObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._OpacityObject_caches = {};
	nexacro.OpacityObject = function (val)
	{
		var obj = nexacro._OpacityObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._OpacityObject(val);
		nexacro._OpacityObject_caches[val] = obj;
		return obj;
	};


	//==============================================================================
	nexacro._ShadowObject = function (v)
	{
		if (v && (typeof (v) == "string"))
		{
			var val = v.trim();
			if (val)
			{
				this.value = val;
			}
		}
	};

	var _pShadowObject = nexacro._createPrototype(nexacro.Object, nexacro._ShadowObject);
	nexacro._ShadowObject.prototype = _pShadowObject;
	_pShadowObject._type_name = "ShadowObject";

	_pShadowObject.value = "";

	// override for value
	_pShadowObject.valueOf = function ()
	{
		return this.value;
	};
	_pShadowObject.toString = function ()
	{
		return this.value;
	};

	// for object cache
	nexacro._ShadowObject_caches = {};
	nexacro.ShadowObject = function (val)
	{
		var obj = nexacro._ShadowObject_caches[val];
		if (obj) return obj;
		obj = new nexacro._ShadowObject(val);
		nexacro._ShadowObject_caches[val] = obj;
		return obj;
	};
    
    //==============================================================================
	//UrlObject - Button
	nexacro._UrlObject = function (v, target)
	{
	    if (v && (typeof (v) == "string"))
	    {
	        var val = v.trim();
	        if (val)
	        {
	            this.value = val;
	            if (val.substring(0, 3).toLowerCase() == "url")
	            {
	                var url;
	                var ch = val.charAt(4);
	                if (ch == '\'' || ch == '\"') url = val.substring(5, val.lastIndexOf(ch));
	                else url = val.substring(4, val.length - 1);
	                this.url = url;
	                this._sysbaseurl = nexacro._project_absolutepath;
	                this._sysurl = nexacro._getSupportedImageUrl(url, this._sysbaseurl);
	            }
	            else
	            {
	                this.url = val;
	                this._sysbaseurl = nexacro._project_absolutepath;
	                this._sysurl = nexacro._getSupportedImageUrl(val, this._sysbaseurl);
	            }
	        }
	    }
	};

	var _pUrlObject = nexacro._createPrototype(nexacro.Object, nexacro._UrlObject);
	nexacro._UrlObject.prototype = _pUrlObject;
	_pUrlObject._type_name = "UrlObject";

	_pUrlObject.value = "";
	_pUrlObject.url = "";
	_pUrlObject._sysurl = "";
	_pUrlObject._sysbaseurl = "";

    // override for value
	_pUrlObject.valueOf = function ()
	{
	    return this.value;
	};

	_pUrlObject.toString = function ()
	{
	    return this.value;
	};

    // for object cache
	nexacro._UrlObject_caches = {};
	nexacro.UrlObject = function (val, target)
	{
		var obj = nexacro._UrlObject_caches[val];
	    if (obj) return obj;
	    obj = new nexacro._UrlObject(val, target);
	    nexacro._UrlObject_caches[val] = obj;
	    return obj;
	};
} //if ( !nexacro._bInitCssObjects )


if (_process)
{
	delete _process;
	delete _pColorObject;
	delete _pFontObject;
	delete _pTextDecorationObject;
	delete _pBorderLineObject;
	delete _pBorderObject;
	delete _pBorderRadiusObject;	
	delete _pMarginObject;
	delete _pPaddingObject;
	delete _pAlignObject;
	delete _pCursorObject;
	delete _pOpacityObject;
	delete _pShadowObject;
	delete _pUrlObject;
}
