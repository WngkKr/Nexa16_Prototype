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

if (!nexacro.GridFormat)
{
    //==============================================================================
    // nexacro.GridFormat
    //==============================================================================
    // Grid's CellInfomation information
    nexacro.GridCellInfo = function (id, band, grid, type, idx)
    {
        this.id = this.name = id;
        this.parent = band;

        // property [name, bind, default]
        var _property_map = this._property_map = [
            ["displaytype", true, "normal"],
            ["edittype", true, "none"],
            ["tooltiptype", false, "none"],
            ["tooltiptext", true, ""],
            ["autosizecol", false, "default"],
            ["autosizerow", false, "default"],
            ["displayexpdec", true, -1],
            ["locale", true, ""],
            ["mask", true, ""],
            ["maskchar", false, "_"],
            ["suppress", true, 0],
            ["suppressalign", false, "first"],
            ["suppressedit", false, false],
            ["text", true, ""],
            ["expr", true, ""],
            ["subsumtext", true, ""],
            ["combodataset", true, ""],
            ["combocodecol", true, ""],
            ["combodatacol", true, ""],
            ["combodisplay", true, "edit"],
            ["combodisplaynulltext", true, ""],
            ["combodisplaynulltype", true, "none"],
            ["combodisplayrowcount", true, -1],
            ["combotype", true, "dropdown"],
            ["calendardisplay", true, "edit"],
            ["calendardisplaynulltext", true, ""],
            ["calendardisplaynulltype", true, "default"],
            ["calendarinnerdataset", true, ""],
            ["calendarbackgroundcolumn", true, ""],
            ["calendarbordercolumn", true, ""],
            ["calendardatecolumn", true, ""],
            ["calendartextcolorcolumn", true, ""],
            ["editacceptsenter", true, false],
            ["editacceptstab", true, false],
            ["editautoselect", true, false],
            ["editautoskip", true, false],
            ["editclipmode", true, "includespace"],
            ["editdisplay", true, "edit"],
            ["editfilter", true, "none"],
            ["editimemode", true, "none"],
            ["editlimit", true, -1],
            ["editlimitbymask", true, "decimal"],
            ["editscrollbartype", true, "none"],
            ["editscrolltype", true, "none"],
            ["edittrimtype", true, "none"],
            ["edituseime", true, "global"],
            ["expandchar", true, ""],
            ["expandimage", true, ""],
            ["expandshow", true, "hide"],
            ["expandsize", true, 16],
            ["treecheck", true, ""],
            ["treecollapseimage", true, ""],
            ["treeexpandimage", true, ""],
            ["treeitemimage", true, ""],
            ["treelevel", true, ""],
            ["treestartlevel", true, 0],
            ["treestate", true, ""],
            ["controlbuttonsize", true, -1],
            ["checkboxsize", true, -1],
            ["celltype", true, type],

            // normal style
            ["color", false, null],
            ["font", false, null],
            ["lineHeight", false, null],
            ["wordSpacing", false, null],
            ["letterSpacing", false, null],
            ["textDecoration", false, null],
            ["wordWrap", true, "none"],
            ["borderRadius", false, null],
            ["background", false, null],
            ["edge", false, null],
            ["cursor", false, null],
            ["opacity", false, null],
            ["boxShadow", false, null],
            ["margin", false, null],
            ["padding", false, null],
            ["textAlign", false, null],
            ["verticalAlign", false, null]
        ];

        var prop, bind, deft;
        for (var i = 0; i < _property_map.length; i++)
        {
            prop = _property_map[i][0];
            bind = _property_map[i][1];
            deft = _property_map[i][2];

            if (bind)
                this[prop] = new nexacro.BindableValue(deft);
            else
                this[prop] = deft;
        };

        this._grid = grid;
        this._cellidx = idx;
        this._col = 0;
        this._colspan = 0;
        this._row = 0;
        this._rowspan = 0;
        this._area = "";

        this._endcol = false;
        this._subcells = [];
        this._isSubCell = false;

        this._editingRow = -9; // edit가 활성되어있는 row를 담기 위한 변수
        this._is_use_bind_expr_style = false;

        this._imgWidthTemp = {};
        this._imgHeightTemp = {};

        this._suppress_infos = [];

        this._fakemerge_infos = null;

        // autosize용 (expr사용 안할시)
        this._cur1font_size = null;         // autosize시 grid에서 설정
        this._cur1selectfont_size = null;   // autosize시 grid에서 설정
        this._curfont = undefined;          // query시 설정
        this._curselfont = undefined;       // query시 설정
        this._curborder = undefined;        // query시 설정
        this._curpadding = undefined;       // query시 설정

        this._tempinnerds = null;
    };

    var _pGridCellInfo = nexacro._createPrototype(nexacro.Object, nexacro.GridCellInfo);
    nexacro.GridCellInfo.prototype = _pGridCellInfo;
    _pGridCellInfo._type_name = "GridCellInfo";
    
    _pGridCellInfo.destroy = function ()
    {
        this.parent = null;
        this._grid = null;
        this._subcells = null;
        this._imgWidthTemp = null;
        this._imgHeightTemp = null;
        this._suppress_infos = null;
        this._fakemerge_infos = null;
        this._tempinnerds = null;
        this._cur1font_size = null;
        this._cur1selectfont_size = null;
        this._curfont = null;
        this._curselfont = null;
        this._curborder = null;
        this._curpadding = null;

        var _property_map = this._property_map;
        var prop;

        for (var i = 0; i < _property_map.length; i++)
        {
            prop = _property_map[i][0];
            this[prop] = null;
        };
        this._property_map = null;
    };

    _pGridCellInfo._getValue = function (rowidx)
    {
        return this._getAttrValue(this.text, rowidx);
    };

    _pGridCellInfo._setValue = function (rowidx, v)
    {
        this._setAttrValue(this.text, rowidx, v);
    };

    _pGridCellInfo._getSuppressInfo = function (disprowidx, make)
    {
        if (disprowidx == undefined)
            return this._suppress_infos;

        if (disprowidx < 0) // head, summ
            disprowidx = 0;

        if (make && !this._suppress_infos[disprowidx])
        {
            var suppress_info = { text_proc: 0, border_proc: 0, middle: false, last: true };
            this._suppress_infos[disprowidx] = suppress_info;
        }
        return this._suppress_infos[disprowidx];
    };

    _pGridCellInfo._clearSuppressInfo = function ()
    {
        this._suppress_infos = [];
    };

    _pGridCellInfo._getDisplaytype = function (rowidx)
    {
        var dt = this.displaytype;
        var d = this._getAttrValue(dt, rowidx);

        if (d == "normal")
        {
            var t = this.text;
            if (t._bindtype == 1)
            {
                var dataset = this._grid._binddataset;
                if (!dataset) return "text";
                var colid = t._bindexpr;
                var coltype = dataset._getColumnType(colid);

                switch (coltype)
                {
                    case 1: //string
                        return "text";
                    case 2: //int
                    case 3: //float
                    case 4: //bigdecimal
                        return "number";
                    case 5: //date
                        return "date2";
                    case 6: //time
                        return "time";
                    case 7: //datetime
                        return "datetime";
                    default: //blob
                        return "none";
                }
            }
            else
            {
                return "text";
            }
        }
        return d;
    };

    _pGridCellInfo._getEdittype = function (rowidx)
    {
        var dt = this.edittype;
        var d = this._getAttrValue(dt, rowidx);

        if (d == "normal")
        {
            var t = this.text;
            if (t._bindtype == 1)
            {
                var dataset = this._grid._binddataset;
                if (!dataset) return "text";
                var colid = t._bindexpr;
                var colinfo = dataset._getColumnType(colid);
                if (!colinfo) return "text";

                var coltype = colinfo;

                switch (coltype)
                {
                    case 1: //string
                    case 2: //int
                    case 3: //float
                    case 4: //bigdecimal
                        return "text";
                    case 5: //date
                    case 6: //time
                    case 7: //datetime
                        return "date";
                    case 8: //blob
                        return "none";
                }
            }
            else
            {
                return "text";
            }
        }
        return d;
    };

    _pGridCellInfo._getWordwrap = function (rowidx)
    {
        var wordwrap = this._getAttrValue(this.wordWrap, rowidx);

        if (!wordwrap)
            wordwrap = "none";

        return wordwrap;
    };

    _pGridCellInfo._getAttrValue = function (attr, rowidx)
    {
        return this.parent._getAttrValue(attr, rowidx, this);
    };

    _pGridCellInfo._setAttrValue = function (attr, rowidx, v)
    {
        if (attr._bindtype == 1)
        {
            var grid = this._grid;
            var dataset = grid._binddataset;
            if (dataset)
            {
                dataset.setColumn(rowidx, attr._bindexpr, v);
            }
        }
    };

    _pGridCellInfo._query_status_align = function (rowidx, displayType, userstatus)
    {
        return this._grid._getCellStyleInfo(this._cellidx, "align", rowidx, userstatus == "selected");
    };

    _pGridCellInfo._query_status_background = function (rowidx, userstatus)
    {
        return this._grid._getCellStyleInfo(this._cellidx, "background", rowidx, userstatus == "selected");
    };

    _pGridCellInfo._query_status_border = function (rowidx, userstatus)
    {
        return this._grid._getCellStyleInfo(this._cellidx, "border", rowidx, userstatus == "selected");
    };

    _pGridCellInfo._query_status_color = function (rowidx, userstatus)
    {
        return this._grid._getCellStyleInfo(this._cellidx, "color", rowidx, userstatus == "selected");
    };

    _pGridCellInfo._query_status_font = function (rowidx, userstatus)
    {
        return this._grid._getCellStyleInfo(this._cellidx, "font", rowidx, userstatus == "selected");
    };

    _pGridCellInfo._query_status_treecontrol = function (rowidx, styleProp, status)
    {
        var val = "";
        if (styleProp == "treecollapseimage")
        {
            val = this._getTreeCollapseImage(rowidx);
        }
        else if (styleProp == "treeexpandimage")
        {
            val = this._getTreeExpandImage(rowidx);
        }
        else if (styleProp == "treeitemimage")
        {
            val = this._getTreeItemImage(rowidx);
        }
        if (!val)
        {
            var v = this._grid._getCSSStyleValue(styleProp, status);
            val = (v) ? v._value : "";
        }
        return val;
    };

    _pGridCellInfo._getCheckboxsize = function (rowidx)
    {
        var val = this._getAttrValue(this.checkboxsize, rowidx);
        
        if (val == null || val < 0)
            val = this._grid.cellcheckboxsize;
        else
            val = parseInt(val._value, 10);

        if (val == null || val < 0)
            val = 14;

        return val;
    };

    _pGridCellInfo._getControlButtonsize = function (rowidx)
    {
        var val = this._getAttrValue(this.controlbuttonsize, rowidx);

        if (val == null || val < 0)
            val = this._grid.cellcontrolbuttonsize;
        else
            val = parseInt(val._value, 10);

        if (val == null || val < 0)
            val = -1;

        return val;
    };

    _pGridCellInfo.set_background = function (val)
    {
        this.background = val;
    };

    _pGridCellInfo.set_color = function (val)
    {
        this.color = val;
    };

    _pGridCellInfo.set_font = function (val)
    {
        this.font = val;
    };

    _pGridCellInfo.set_lineHeight = function (val)
    {
        this.lineHeight = val;
    };

    _pGridCellInfo.set_wordSpacing = function (val)
    {
        this.wordSpacing = val;
    };

    _pGridCellInfo.set_letterSpacing = function (val)
    {
        this.letterSpacing = val;
    };

    _pGridCellInfo.set_textDecoration = function (val)
    {
        this.textDecoration = val;
    };

    _pGridCellInfo.set_wordWrap = function (val)
    {
        this.wordWrap._set(val);
    };

    _pGridCellInfo.set_borderRadius = function (val)
    {
        this.borderRadius = val;
    };
    
    _pGridCellInfo.set_edge = function (val)
    {
        this.edge = val;
    };

    _pGridCellInfo.set_border = function (val)
    {
        this.border = val;
    };

    _pGridCellInfo.set_opacity = function (val)
    {
        this.opacity = val;
    };

    _pGridCellInfo.set_cursor = function (val)
    {
        this.cursor = val;
    };

    _pGridCellInfo.set_boxShadow = function (val)
    {
        this.boxShadow = val;
    };

    _pGridCellInfo.set_margin = function (val)
    {
        this.margin = val;
    };
    
    _pGridCellInfo.set_padding = function (val)
    {
        this.padding = val;
    };

    _pGridCellInfo.set_textAlign = function (val)
    {
        this.textAlign = val;
    };

    _pGridCellInfo.set_verticalAlign = function (val)
    {
        this.verticalAlign = val;
    };

    _pGridCellInfo.set_displaytype = function (v)
    {
        if (v != this.displaytype)
        {
            var oldVal = this.displaytype._value;
            this.displaytype._set(v);
            this._grid._clearBindTypeFlag();

            if (oldVal == "tree")
            {
                this._grid._removeTreeCellinfo(this);
            }
            if (v == "tree")
            {
                this._grid._setTreeCellinfo(this);
            }
        }
    };

    _pGridCellInfo.set_edittype = function (v)
    {
        if (v != this.edittype)
        {
            this.edittype._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_tooltiptype = function (v)
    {
        if (v != this.tooltiptype)
        {
            if (!v)
                v = "";
            
            this.tooltiptype = v;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_tooltiptext = function (v)
    {
        if (v != this.tooltiptext._value)
        {
            if (!v)
                v = "";
            
            this.tooltiptext._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo._getTooltipText = function (rowidx)
    {
        var text = this._getAttrValue(this.tooltiptext, rowidx);
        if (!text || text == "")
        {
            var bandinfo = this.parent;
            text = bandinfo._getTooltipText(rowidx);
        }
        return text;
    };

    _pGridCellInfo.set_autosizecol = function (v)
    {
        var val = "default";
        switch (v)
        {
            case "none":
            case "limitmin":
            case "limitmax":
                val = v;
        }
        if (val != this.autosizecol)
        {
            this.autosizecol = val;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_autosizerow = function (v)
    {
        var val = "default";
        switch (v)
        {
            case "none":
            case "limitmin":
            case "limitmax":
            case "default":
                val = v;
        }
        if (val != this.autosizerow)
        {
            this.autosizerow = val;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_celltype = function (v)
    {
        var val = "none";
        switch (v)
        {
            case "head":
            case "body":
            case "summary":
                val = v;
        }
        if (val != this.celltype)
        {
            this.celltype = val;
            this._grid._clearBindTypeFlag();

            var bandinfo = this.parent;
            var bandctrl = bandinfo._bandctrl;
            var format = bandinfo.parent;

            if (bandinfo._bandctrl)
            {
                bandctrl._refresh_contents(true);
            }
        }
    };

    _pGridCellInfo.set_displayexpdec = function (v)
    {
        if (v != this.displayexpdec._value)
        {
            this.displayexpdec._set_intval(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_locale = function (v)
    {
        if (v != this.locale._value)
        {
            this.locale._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_mask = function (v)
    {
        if (v != this.mask._value)
        {
            this.mask._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_maskchar = function (v)
    {
        if (!v) v = "_";
        var val = v.toString().charAt(0);
        if (val != this.maskchar)
        {
            this.maskchar = val;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_suppress = function (v)
    {
        if (v != this.suppress._value)
        {
            this.suppress._set_intval(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_suppressalign = function (v)
    {
        if (v)
            v = v.toString().toLowerCase();

        var val = "first";
        switch (v)
        {
            case "first":
            case "last":
            case "middle":
            case "first,over":
            case "middle,over":
            case "last,over":
                val = v;
        }
        if (val != this.suppressalign)
        {
            this.suppressalign = val;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_suppressedit = function (v)
    {
        v = v ? true : false;
        if (v != this.suppressedit)
        {
            this.suppressedit = v;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_cssclass = function (v)
    {
         this.cssclass = v;
    };

    _pGridCellInfo.set_text = function (v)
    {
        if (v !== this.text._value)
        {
            this.text._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_expr = function (v)
    {
        if (v != this.expr._value)
        {
            var str = v.toString();
            var tag = str.substr(0, 4).toUpperCase();
            if (tag != "" && tag != "EXPR")
                v = "EXPR:" + v;
            this.expr._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_subsumtext = function (v)
    {
        if (v != this.subsumtext._value)
        {
            this.subsumtext._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodataset = function (v)
    {
        if (v != this.combodataset._value)
        {
            this.combodataset._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combocodecol = function (v)
    {
        if (v != this.combocodecol._value)
        {
            this.combocodecol._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodatacol = function (v)
    {
        if (v != this.combodatacol._value)
        {
            this.combodatacol._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodisplay = function (v)
    {
        if (v != this.combodisplay._value)
        {
            this.combodisplay._set_enumval(v, ["edit", "display"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodisplaynulltext = function (v)
    {
        if (v != this.combodisplaynulltext._value)
        {
            this.combodisplaynulltext._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodisplaynulltype = function (v)
    {
        if (v != this.combodisplaynulltype._value)
        {
            this.combodisplaynulltype._set_enumval(v, ["none", "nulltext"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combodisplayrowcount = function (v)
    {
        if (v != this.combodisplayrowcount._value)
        {
            this.combodisplayrowcount._set_intval(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_combotype = function (v)
    {
        if (v != this.combotype._value)
        {
            this.combotype._set_enumval(v, ["dropdown", "search", "filter"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendardisplay = function (v)
    {
        if (v != this.calendardisplay._value)
        {
            this.calendardisplay._set_enumval(v, ["edit", "display"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendardisplaynulltext = function (v)
    {
        if (v != this.calendardisplaynulltext._value)
        {
            this.calendardisplaynulltext._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendardisplaynulltype = function (v)
    {
        if (v != this.calendardisplaynulltype._value)
        {
            this.calendardisplaynulltype._set_enumval(v, ["default", "none", "nulltext", "nullmask"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendarinnerdataset = function (v)
    {
        if (v != this.calendarinnerdataset._value)
        {
            this.calendarinnerdataset._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendarbackgroundcolumn = function (v)
    {
        if (v != this.calendarbackgroundcolumn._value)
        {
            this.calendarbackgroundcolumn._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendarbordercolumn = function (v)
    {
        if (v != this.calendarbordercolumn._value)
        {
            this.calendarbordercolumn._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendardatecolumn = function (v)
    {
        if (v != this.calendardatecolumn._value)
        {
            this.calendardatecolumn._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_calendartextcolorcolumn = function (v)
    {
        if (v != this.calendartextcolorcolumn._value)
        {
            this.calendartextcolorcolumn._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editacceptsenter = function (v)
    {
        if (v != this.editacceptsenter._value)
        {
            this.editacceptsenter._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editacceptstab = function (v)
    {
        if (v != this.editacceptstab._value)
        {
            this.editacceptstab._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editautoselect = function (v)
    {
        if (v != this.editautoselect._value)
        {
            this.editautoselect._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editautoskip = function (v)
    {
        if (v != this.editautoskip._value)
        {
            this.editautoskip._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editclipmode = function (v)
    {
        if (v != this.editclipmode._value)
        {
            this.editclipmode._set_enumval(v, ["includespace", "excludespace"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editdisplay = function (v)
    {
        if (v != this.editdisplay._value)
        {
            this.editdisplay._set_enumval(v, ["edit", "display"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editfilter = function (v)
    {
        if (!v) return;

        var strval = ["alpha", "upper,number,nosign", "alpha,number", "alpha,number,nosign", "char", "digit", "integer", "lower", "lower,char", "lower,digit", "lower,digit,char", "lower,number", "lower,number,char", "lower,number,nosign", "none", "number", "number,char", "upper", "upper,char", "upper,digit", "upper,digit,char", "upper,number", "upper,number,char", "alpha,digit"];
        var arrstr = v.trim().split(",");

        for (var i = 0; i < strval.length; i++)
        {
            var a = true;
            var str = strval[i].split(",");

            if (arrstr.length != str.length)
                continue;

            for (var j = 0; j < arrstr.length; j++)
            {
                //array의 indexOf는 nexacro._indexOf로 바꿔준다. array의 indexOf는 성능저하가 있으므로 for loop로 대체한다. 
                if (nexacro._indexOf(strval[i], arrstr[j]) < 0)
                {
                    a = false;
                    break;
                }
            }
            if (a == true)
            {
                v = strval[i];
                break;
            }
        }

        if (v != this.editfilter._value)
        {
            this.editfilter._set_enumval(v, ["alpha", "upper,number,nosign", "alpha,number", "alpha,number,nosign", "char", "digit", "integer", "lower", "lower,char", "lower,digit", "lower,digit,char", "lower,number", "lower,number,char", "lower,number,nosign", "none", "number", "number,char", "upper", "upper,char", "upper,digit", "upper,digit,char", "upper,number", "upper,number,char", "alpha,digit"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editimemode = function (v)
    {
        if (v != this.editimemode._value)
        {
            this.editimemode._set_enumval(v, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editlimit = function (v)
    {
        if (v != this.editlimit._value)
        {
            this.editlimit._set_intval(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editlimitbymask = function (v)
    {
        if (v != this.editlimitbymask._value)
        {
            this.editlimitbymask._set_enumval(v, ["none", "integer", "decimal", "both"]);
            this._grid._clearBindTypeFlag();
        }
    };
    
    _pGridCellInfo.set_editscrollbartype = function (v)
    {
        if (v != this.editscrollbartype._value)
        {
            this.editscrollbartype._set_enumval(v, ["none", "auto", "fixed", "autoindicator", "indicator"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_editscrolltype = function (v)
    {
        if (v != this.editscrolltype._value)
        {
            this.editscrolltype._set_enumval(v, ["none", "both", "horizontal", "vertical"]);
            this._grid._clearBindTypeFlag();
        }
    };
    
    _pGridCellInfo.set_edittrimtype = function (v)
    {
        if (v != this.edittrimtype._value)
        {
            this.edittrimtype._set_enumval(v, ["none", "left", "right", "both"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_edituseime = function (v)
    {
        if (v != this.edituseime._value)
        {
            this.edituseime._set_enumval(v, ["global", "local", "local,keep", "none"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_expandchar = function (v)
    {
        if (v != this.expandchar._value)
        {
            this.expandchar._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_expandimage = function (v)
    {
        if (v != this.expandimage._value)
        {
            this.expandimage._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_expandshow = function (v)
    {
        if (v != this.expandshow._value)
        {
            this.expandshow._set_enumval(v, ["hide", "show"]);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_controlbuttonsize = function (v)
    {
        if (v != this.controlbuttonsize._value)
        {
            this.controlbuttonsize._set_intval(v);
            this._grid._clearBindTypeFlag();

            if (this.celltype == "head")
            {
                this._grid._refreshHead();
            }
            else if (this.celltype == "body")
            {
                this._grid._refreshBody();
            }
            else if (this.celltype == "summ")
            {
                this._grid._refreshSumm();
            }
        }
    };

    _pGridCellInfo.set_checkboxsize = function (v)
    {
        if (v != this.checkboxsize._value)
        {
            this.checkboxsize._set_intval(v);
            this._grid._clearBindTypeFlag();

            if (this.celltype == "head")
            {
                this._grid._refreshHead();
            }
            else if (this.celltype == "body")
            {
                this._grid._refreshBody();
            }
            else if (this.celltype == "summ")
            {
                this._grid._refreshSumm();
            }
        }
    };

    _pGridCellInfo.set_expandsize = function (v)
    {
        if (v != this.expandsize._value)
        {
            this.expandsize._set_intval(v);
            this._grid._clearBindTypeFlag();
            if (this.celltype == "head")
            {
                this._grid._refreshHead();
            }
            else if (this.celltype == "body")
            {
                this._grid._refreshBody();
            }
            else if (this.celltype == "summ")
            {
                this._grid._refreshSumm();
            }
        }
    };

    _pGridCellInfo.set_treecheck = function (v)
    {
        if (v != this.treecheck._value)
        {
            this.treecheck._set(v);
            this._grid._clearBindTypeFlag();
            this._grid._initTreeStates();

            if (this._grid._bodyBand)
            {
                this._grid._bodyBand._recreate_contents();
            }
        }
    };

    _pGridCellInfo.set_treecollapseimage = function (v)
    {
        if (v != this.treecollapseimage._value)
        {
            this.treecollapseimage._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_treeexpandimage = function (v)
    {
        if (v != this.treeexpandimage._value)
        {
            this.treeexpandimage._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_treeitemimage = function (v)
    {
        if (v != this.treeitemimage._value)
        {
            this.treeitemimage._set(v);
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridCellInfo.set_treelevel = function (v)
    {
        if (v != this.treelevel._value)
        {
            this.treelevel._set(v);
            this._grid._clearBindTypeFlag();
            this._grid._initTreeStates();

            if (this._grid._bodyBand)
            {
                this._grid._bodyBand._recreate_contents();
            }
        }
    };

    _pGridCellInfo.set_treestartlevel = function (v)
    {
        if (v != this.treestartlevel._value)
        {
            this.treestartlevel._set_intval(v);
            this._grid._clearBindTypeFlag();

            if (this._grid._bodyBand)
            {
                this._grid._bodyBand._recreate_contents();
            }
        }
    };

    _pGridCellInfo.set_treestate = function (v)
    {
        if (v != this.treestate._value)
            this.treestate._set(v);

        this._grid._clearBindTypeFlag();
        this._grid._initTreeStates();

        var rowidx = this._grid._getDataRow(this._grid.currentrow);

        if (this._getEdittype(rowidx) == "tree")
        {
            if (this._grid._bodyBand)
            {
                this._grid._bodyBand._recreate_contents();
            }
        }
        else
        {
            this._grid._refreshBody();
        }
    };

    _pGridCellInfo._getTreeCheck = function (rowidx)
    {
        return this._getAttrValue(this.treecheck, rowidx);
    };

    _pGridCellInfo._getTreeCollapseImage = function (rowidx)
    {
        return this._getAttrValue(this.treecollapseimage, rowidx);
    };

    _pGridCellInfo._getTreeExpandImage = function (rowidx)
    {
        return this._getAttrValue(this.treeexpandimage, rowidx);
    };

    _pGridCellInfo._getTreeItemImage = function (rowidx)
    {
        return this._getAttrValue(this.treeitemimage, rowidx);
    };

    _pGridCellInfo._getTreeLevel = function (rowidx)
    {
        var v = this._getAttrValue(this.treelevel, rowidx);
        v = parseInt(v) | 0;
        return v;
    };

    _pGridCellInfo._getTreeStartLevel = function (rowidx)
    {
        var v = this._getAttrValue(this.treestartlevel, rowidx);
        v = parseInt(v) | 0;
        return v;
    };

    _pGridCellInfo._getTreeState = function (rowidx)
    {
        return this._getAttrValue(this.treestate, rowidx);
    };

    _pGridCellInfo._setTreeCheck = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treecheck, rowidx, v);
    };

    _pGridCellInfo._setTreeCollapseImage = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treecollapseimage, rowidx, v);
    };

    _pGridCellInfo._setTreeExpandImage = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treeexpandimage, rowidx, v);
    };

    _pGridCellInfo._setTreeItemImage = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treeitemimage, rowidx, v);
    };

    _pGridCellInfo._setTreeLevel = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treelevel, rowidx, v);
    };

    _pGridCellInfo._setTreeStartLevel = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treestartlevel, rowidx, v);
    };

    _pGridCellInfo._setTreeState = function (rowidx, v)
    {
        return this._setTreeBindValue(this.treestate, rowidx, v);
    };

    _pGridCellInfo._setTreeBindValue = function (attr, rowidx, v)
    {
        if (attr._bindtype == 1)
        {
            var grid = this._grid;
            var dataset = grid._binddataset;
            if (dataset)
            {
                grid._binddataset._treeBindChanged = true;
                dataset.setColumn(rowidx, v);
            }
        }
    };

    _pGridCellInfo._getSuppress = function (rowidx)
    {
        return this._getAttrValue(this.suppress, rowidx);
    };

    _pGridCellInfo._getLocale = function (rowidx)
    {
        var locale = this._getAttrValue(this.locale, rowidx);
        if (!locale && this._grid)
        {
            locale = this._grid._getLocale();
        }

        return locale;
    };

    _pGridCellInfo._getDisplayText = function (rowidx)
    {
        var dt = this.displaytype;
        var d = this._getAttrValue(dt, rowidx);

        if (d == "normal")
        {
            var t = this.text;
            if (t._bindtype == 1)
            {
                var dataset = this._grid._binddataset;
                if (!dataset) return "text";
                var colid = t._bindexpr;
                var coltype = dataset._getColumnType(colid);

                switch (coltype)
                {
                    case 1: //string
                        return this._getDisplayText_text(rowidx);
                    case 2: //int
                    case 3: //float
                    case 4: //bigdecimal
                        return this._getDisplayText_number(rowidx);
                    case 5: //date
                        return this._getDisplayText_date2(rowidx);
                    case 6: //time
                        return this._getDisplayText_time(rowidx);
                    case 7: //datetime
                        return this._getDisplayText_datetime(rowidx);
                    default: //blob
                        return this._getDisplayText_none(rowidx);
                }
            }
            else
            {
                return this._getDisplayText_text(rowidx);
            }
        }
        else
        {
            if (d == "text")
                return this._getDisplayText_text(rowidx);
            else if (d == "exponent")
                return this._getDisplayText_exponent(rowidx);
            else if (d == "number")
                return this._getDisplayText_number(rowidx);
            else if (d == "currency")
                return this._getDisplayText_currency(rowidx);
            else if (d == "image")
                return this._getDisplayText_image(rowidx);
            else if (d == "date")
                return this._getDisplayText_date(rowidx);
            else if (d == "combo")
                return this._getDisplayText_combo(rowidx);
            else if (d == "button")
                return this._getDisplayText_button(rowidx);
            else if (d == "bar")
                return this._getDisplayText_bar(rowidx);
            else if (d == "checkbox")
                return this._getDisplayText_checkbox(rowidx);
            else if (d == "tree")
                return this._getDisplayText_tree(rowidx);
            else if (d == "none")
                return this._getDisplayText_none(rowidx);
        }
        return this._getDisplayText_text(rowidx);
    };

    _pGridCellInfo._getTextValueForDisp = function (rowidx)
    {
        if (this.expr._value != "")
        {
            return this._getAttrValue(this.expr, rowidx);
        }
        return this._getAttrValue(this.text, rowidx);
    };

    _pGridCellInfo._getDisplayText_text = function (rowidx)
    {
        var v = this._getTextValueForDisp(rowidx);
        if (v == undefined)
            v = "";
        else
            v = v.toString();
            
        var mask = this._getAttrValue(this.mask, rowidx);
        var maskobj = this._grid._maskstringtypeobj;

        if (mask && mask.length)
        {
            maskobj.setMask(mask);
            v = maskobj.applyMask(v);
        }

        return v;
    };

    
    _pGridCellInfo._getDisplayText_exponent = function (rowidx)
    {
        var v = this._getTextValueForDisp(rowidx);
        // TODO 지수 처리

        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._m_hascomma = false;
    _pGridCellInfo._getDisplayText_number = function (rowidx)
    {
        var v = this._getTextValueForDisp(rowidx);
        var mask = this._getAttrValue(this.mask, rowidx);
        var limittype = this._getAttrValue(this.editlimitbymask, rowidx);
        var locale = this._getLocale(rowidx);
        var maskobj = this._grid._masknumbertypeobj;
        
        if (mask && mask.length)
        {
            maskobj.setLimitType(limittype);
            maskobj.setLocale(locale);
            maskobj.setMask(mask);
            v = maskobj.applyMask(v);
        }

        return v;
    };

    _pGridCellInfo._getDisplayText_currency = function (rowidx)
    {
        var v = this._getTextValueForDisp(rowidx);
        var locale = this._getLocale(rowidx)

        if (!isNaN(v))
        {
            var nexanum = new nexacro.Number(v);
            v = nexanum.toLocaleCurrencyString(locale);
        }

        return v;
    };

    _pGridCellInfo._getDisplayText_image = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
        {
            return "";
        }
        var v = this._getTextValueForDisp(rowidx);
        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._getDisplayText_date = function (rowidx, colType)
    {
        var dataset = this._grid._binddataset;

        if (dataset && dataset.getRowCount() <= rowidx)
            return "";

        var v = this._getTextValueForDisp(rowidx);
        var date = undefined;
        var null_test = 0;
        var nullmask = false;
        var is_date_empty = false;
        var mask = this._getAttrValue(this.mask, rowidx);

        v = (v) ? v : "";

        if (v.constructor == Date)
        {
            date = v;
        }
        else
        {
            // 문자열로 변환
            var strVal = v.toString();

            for (var i = 0; i < strVal.length; i++)
            {
                if (strVal.charAt(i) != " ")
                {
                    null_test = 1;
                    break;
                }
            }

            if (null_test == 1)
            {
                if (colType == undefined)
                {
                    //coltype이 지정되지 않으면 value의 길이에 따라 coltype 지정
                    if (!mask && strVal.length <= 6) //time
                        colType = 0;
                    else if (!mask && strVal.length <= 8) //date
                        colType = 2;
                    else //datetime
                        colType = 1;
                }

                if (colType == 1)   //datetime
                    v._timecheck = true;

                date = this.__parseDate(strVal, colType, rowidx);
            }
            else
            {
                if (colType == 1)   //datetime
                    v._timecheck = true;

                if (this.calendardisplaynulltype._value == "nulltext")
                {
                    return this._getAttrValue(this.calendardisplaynulltext, rowidx);
                }
                else if (this.calendardisplaynulltype._value == "nullmask")
                {
                    nullmask = true;
                }
                else if (this.calendardisplaynulltype._value == "default")
                {
                    // skip
                }
                else
                {
                    return "";
                }
            }
        }

        if (date == null)
        {
            is_date_empty = true;
            date = new nexacro.Date();
            date.setFullYear(0);
            date.setMonth(0);
            date.setDate(1);
        }

        var dateStr;
        var locale = this._getLocale(rowidx);

        if (mask == "SHORTDATE" || mask == "LONGDATE")
        {

            var locale_info = nexacro.Locale.getLocaleInfo(locale);
            var format = "";

            if (mask == "SHORTDATE")
                format = locale_info.shortdate_format;
            else
                format = locale_info.longdate_format;

            if (format == "")
                format = nexacro.Locale._default_shortdate_format;

            var b_ltr_mark = (!this._grid._isRtl() && locale_info.direction == "rtl") ? true : false;

            dateStr = date.getLocaleFormatString(locale, format, b_ltr_mark);

        }
        else
        {
            var yyyy = date.getFullYear();
            if (yyyy == 0)
                yyyy = "0000";

            var MM = date.getMonth() + 1;
            MM = (MM < 10 ? "0" : "") + MM;
            /*
                    var displaycalendarctrl = this._grid._getDisplayCalendarCtrl();
            
                    var locale_info = nexacro.Locale.getLocaleInfo(locale);
                    displaycalendarctrl._datelistL = locale_info.weekday_names_long;
                    displaycalendarctrl._datelistS = locale_info.weekday_names_short;
            
                    var ddd = displaycalendarctrl._datelistS[date.getDay()];
                    var dddd = displaycalendarctrl._datelistL[date.getDay()];
            >>>>>>>>>>>>>>>>>>>>*/
            var ddd = date.getDay();
            //<<<<<<<<<<<<<<<<<<
            var dd = date.getDate();

            dd = (dd < 10 ? "0" : "") + dd;

            var yy = date.getYear() % 100;
            var M = +MM;
            var d = +dd;

            var hour = date.getHours();
            hour = (hour < 10 ? "0" : "") + hour;
            var h = +hour;

            var minute = date.getMinutes();
            minute = (minute < 10 ? "0" : "") + minute;
            var mn = +minute;

            var second = date.getSeconds();
            second = (second < 10 ? "0" : "") + second;

            var s = +second;

            if (is_date_empty)
            {
                hour = h = "00";
                minute = mn = "00";
                second = s = "00";
            }

            var format = mask;

            if (format == null || format.length == 0 || !format.match(/[yMdHhms]/))
            {
                format = "yyyy-MM-dd";
            }

            if (nullmask)
            {
                var maskchar1 = this.maskchar;
                var maskchar2 = maskchar1 + maskchar1;
                var maskchar3 = maskchar2 + maskchar1;
                var maskchar4 = maskchar3 + maskchar1;

                dateStr = format.replace("yyyy", maskchar4);
                dateStr = dateStr.replace("MM", maskchar2);
//              dateStr = dateStr.replace("dddd", "weekL");
                dateStr = dateStr.replace("ddd", "week");
                dateStr = dateStr.replace("dd", maskchar2);
                dateStr = dateStr.replace("yy", maskchar2);
                dateStr = dateStr.replace("M", maskchar1);
                dateStr = dateStr.replace("d", maskchar1);
                dateStr = dateStr.replace("tt", maskchar2);
                dateStr = dateStr.replace("HH", maskchar2);
                dateStr = dateStr.replace("hh", maskchar2);
                dateStr = dateStr.replace("H", maskchar1);
                dateStr = dateStr.replace("h", maskchar1);
                dateStr = dateStr.replace("mm", maskchar2);
                dateStr = dateStr.replace("m", maskchar1);
                dateStr = dateStr.replace("ss", maskchar2);
                dateStr = dateStr.replace("s", maskchar1);
                dateStr = dateStr.replace("weekL", maskchar4);
                dateStr = dateStr.replace("week", maskchar3);
            }
            else
            {
                dateStr = format.replace("yyyy", yyyy);
                dateStr = dateStr.replace("MM", MM);
                dateStr = dateStr.replace("dddd", "weekL");
                dateStr = dateStr.replace("ddd", "week");
                dateStr = dateStr.replace("dd", dd);
                dateStr = dateStr.replace("yy", yy);
                dateStr = dateStr.replace("M", M);
                dateStr = dateStr.replace("d", d);

                var hh = hour;
                var tt = "오전";
                if (hour > 12 && hour < 25)
                {
                    hh = hour < 22 ? "0" + (hour - 12) : hour - 12;
                    tt = "오후";
                }

                dateStr = dateStr.replace("tt", tt);
                dateStr = dateStr.replace("HH", hour);
                dateStr = dateStr.replace("hh", hh);
                dateStr = dateStr.replace("H", h);
                dateStr = dateStr.replace("h", h);
                dateStr = dateStr.replace("mm", minute);
                dateStr = dateStr.replace("m", mn);
                dateStr = dateStr.replace("ss", second);
                dateStr = dateStr.replace("s", s);
//              dateStr = dateStr.replace("weekL", dddd);
                dateStr = dateStr.replace("week", ddd);
            }
        }

        return dateStr;
    };

    _pGridCellInfo._getDisplayText_date2 = function (rowidx)
    {
        return this._getDisplayText_date(rowidx, 2);
        // 2이면 date;
    };

    _pGridCellInfo._getDisplayText_datetime = function (rowidx)
    {
        return this._getDisplayText_date(rowidx, 1);
        // 1이면 datetime;
    };

    _pGridCellInfo._getDisplayText_time = function (rowidx)
    {
        return this._getDisplayText_date(rowidx, 0);
        // 0이면 time;
    };

    _pGridCellInfo.__parseDate = function (v, dFlag, rowidx)
    {
        var regexp;
        switch (dFlag)
        {
            case 0: // time
                regexp = /(\d{6})/;
                break;
            case 1: // datetime
                regexp = /(\d{14})/;
                break;
            default: // date == 2;
                regexp = /(\d{8})/;
                break;
        }

        if (regexp.test(v) == false)
        {
            var mask = this._getAttrValue(this.mask, rowidx);
            if (mask && mask.length)
            {
                var tempcal = new nexacro.Calendar("tempcal", "absolute", 0, 0, 0, 0, null, null, this);
                tempcal._setValue(v);
                v = tempcal.value;
                delete tempcal;
            }
            else
            {
                return undefined;
            }
        }

        var date = new nexacro.Date();

        if (dFlag > 0)
        {
            var year = +v.substring(0, 4);
            var month = +v.substring(4, 6);
            var day = +v.substring(6, 8);


            if (month < 1 || month > 12)
            {
                return undefined;
            }
            if (day < 1)
            {
                return undefined;
            }

            if (dFlag == 1)
            {
                var hour = +v.substring(8, 10);
                var min = +v.substring(10, 12);
                var sec = +v.substring(12, 14);
            }
            else
            {
                var hour = 0;
                var min = 0;
                var sec = 0;
            }
        }
        else
        {
            var year = 1900;
            var month = 1;
            var day = 1;
            var hour = +v.substring(0, 2);
            var min = +v.substring(2, 4);
            var sec = +v.substring(4, 6);
        }
        date.setHours(hour, min, sec);
        date.setFullYear(year, month - 1, day);
        return date;
    };

    _pGridCellInfo._getDisplayText_combo = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
            return "";

        var combodataset = this._getAttrValue(this.combodataset, rowidx);
        var combocodecol = this._getAttrValue(this.combocodecol, rowidx);
        var combodatacol = this._getAttrValue(this.combodatacol, rowidx);
        if (combodataset && combodataset.length && combocodecol && combocodecol.length && combodatacol && combodatacol.length)
        {
            var grid = this._grid;
            var ds;
            var v = this._getTextValueForDisp(rowidx);
            var text;

            if (!this._tempinnerds)
            {
                ds = grid._findDataset(combodataset);
                this._tempinnerds = new nexacro.Dataset();
                this._tempinnerds.copyData(ds, false);  // user script에서 innerdataset 변경시 영향없도록 처리
            }

            ds = this._tempinnerds;

            text = ds.lookup(combocodecol, v, combodatacol);

            if (text)
                return text.toString();
        }
        if (this.combodisplaynulltype._value == "nulltext")
        {
            var v = this._getAttrValue(this.combodisplaynulltext, rowidx);
            return v;
        }
        return "";
    };

    _pGridCellInfo._getDisplayText_button = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
        {
            return "";
        }
        var v = this._getTextValueForDisp(rowidx);
        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._getDisplayText_bar = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
        {
            return "";
        }
        var v = this._getTextValueForDisp(rowidx);
        // TODO Bar
        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._getDisplayText_checkbox = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
        {
            return "";
        }
        var v = this._getTextValueForDisp(rowidx);
        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._getDisplayText_tree = function (rowidx)
    {
        var dataset = this._grid._binddataset;
        if (dataset && dataset.getRowCount() <= rowidx)
        {
            return "";
        }
        var v = this._getTextValueForDisp(rowidx);
        return (v) ? v.toString() : "";
    };

    _pGridCellInfo._getDisplayText_none = function (rowidx)
    {
        return "";
    };

    delete _pGridCellInfo;

    // ==============================================================================
    // Grid's BandInfomation information
    // ==============================================================================
    nexacro.GridBandInfo = function (id, parent, grid)
    {
        this.id = this.name = id;
        this.parent = parent;

        var _property_map = this._property_map = [
            ["tooltiptext", true, ""],
            ["tooltiptype", false, "none"],

            // normal style
            ["color", false, null],
            ["font", false, null],
            ["lineHeight", false, null],
            ["wordSpacing", false, null],
            ["letterSpacing", false, null],
            ["textDecoration", false, null],
            ["wordWrap", true, "none"],
            ["borderRadius", false, null],
            ["background", false, null],
            ["edge", false, null],
            ["cursor", false, null],
            ["opacity", false, null],
            ["boxShadow", false, null],
            ["margin", false, null],
            ["padding", false, null],
            ["textAlign", false, null],
            ["verticalAlign", false, null]
        ];

        var prop, bind, deft;
        for (var i = 0; i < _property_map.length; i++)
        {
            prop = _property_map[i][0];
            bind = _property_map[i][1];
            deft = _property_map[i][2];

            if (bind)
                this[prop] = new nexacro.BindableValue(deft);
            else
                this[prop] = deft;
        };

        this._grid = grid;
        this._bandctrl = null;
        this._noborder = false;
    };
    var _pGridBandInfo = nexacro._createPrototype(nexacro.Object, nexacro.GridBandInfo);
    nexacro.GridBandInfo.prototype = _pGridBandInfo;
    _pGridBandInfo._type_name = "GridBandInfo";

    _pGridBandInfo.destroy = function ()
    {
        this.parent = null;
        this._grid = null;
        this._bandctrl = null;
        
        var _property_map = this._property_map;
        var prop;

        for (var i = 0; i < _property_map.length; i++)
        {
            prop = _property_map[i][0];
            this[prop] = null;
        };
        this._property_map = null;
    };

    _pGridBandInfo.set_background = function (val)
    {
        this.background = val;
        this._bandctrl.set_background(val);
    };

    _pGridBandInfo.set_color = function (val)
    {
        this.color = val;

        if (this._bandctrl)
            this._bandctrl.set_color(val);
    };

    _pGridBandInfo.set_font = function (val)
    {
        this.font = val;

        if (this._bandctrl)
            this._bandctrl.set_font(val);
    };

    _pGridBandInfo.set_lineHeight = function (val)
    {
        this.lineHeight = val;

        if (this._bandctrl)
            this._bandctrl.set_lineHeight(val);
    };

    _pGridBandInfo.set_wordSpacing = function (val)
    {
        this.wordSpacing = val;

        if (this._bandctrl)
            this._bandctrl.set_wordSpacing(val);
    };

    _pGridBandInfo.set_letterSpacing = function (val)
    {
        this.letterSpacing = val;

        if (this._bandctrl)
            this._bandctrl.set_letterSpacing(val);
    };

    _pGridBandInfo.set_textDecoration = function (val)
    {
        this.textDecoration = val;

        if (this._bandctrl)
            this._bandctrl.set_textDecoration(val);
    };

    _pGridBandInfo.set_wordWrap = function (val)
    {
        this.wordWrap._set(val);

        if (this._bandctrl)
            this._bandctrl.set_wordWrap(val);
    };

    _pGridBandInfo.set_borderRadius = function (val)
    {
        this.borderRadius = val;

        if (this._bandctrl)
            this._bandctrl.set_borderRadius(val);
    };

    _pGridBandInfo.set_edge = function (val)
    {
        this.edge = val;

        if (this._bandctrl)
            this._bandctrl.set_edge(val);
    };

    _pGridBandInfo.set_border = function (val)
    {
        this.border = val;

        if (this._bandctrl)
            this._bandctrl.set_border(val);
    };

    _pGridBandInfo.set_opacity = function (val)
    {
        this.opacity = val;

        if (this._bandctrl)
            this._bandctrl.set_opacity(val);
    };

    _pGridBandInfo.set_cursor = function (val)
    {
        this.cursor = val;

        if (this._bandctrl)
            this._bandctrl.set_cursor(val);
    };

    _pGridBandInfo.set_boxShadow = function (val)
    {
        this.boxShadow = val;

        if (this._bandctrl)
            this._bandctrl.set_boxShadow(val);
    };

    _pGridBandInfo.set_margin = function (val)
    {
        this.margin = val;

        if (this._bandctrl)
            this._bandctrl.set_margin(val);
    };

    _pGridBandInfo.set_padding = function (val)
    {
        this.padding = val;

        if (this._bandctrl)
            this._bandctrl.set_padding(val);
    };

    _pGridBandInfo.set_textAlign = function (val)
    {
        this.textAlign = val;

        if (this._bandctrl)
            this._bandctrl.set_textAlign(val);
    };

    _pGridBandInfo.set_verticalAlign = function (val)
    {
        this.verticalAlign = val;

        if (this._bandctrl)
            this._bandctrl.set_verticalAlign(val);
    };

    _pGridBandInfo._set_backgroundimage = function (background, v)
    {
        v = v.toString();
        if (v.length >= 5)
        {
            if (v.substring(0, 3).toLowerCase() == "url")
            {
                var str = v.substr(4, 1);
                if (str == '\'' || str == '\"')
                {
                    v = v.substring(5, v.length - 2);
                }
                else
                {
                    v = v.substring(4, v.length - 1);
                }
            }
            else if (v.substring(0, 5).toLowerCase() != "theme")
            {
                var isBase64 = nexacro._checkBase64String(v);
                if (isBase64)
                {
                    if (v.substring(0, 10).toLowerCase() != "data:image")
                    {
                        v = "data:image;base64," + v;
                    }
                    else if (v.substring(0, 17).toLowerCase() != "data:image;base64")
                    {
                        var comma_idx = v.indexOf(",");
                        if (comma_idx > -1)
                        {
                            var tmp = v.slice(comma_idx + 1, v.legnth);
                            v = "data:image;base64," + tmp;
                        }
                    }
                }
            }
        }

        if (v != background.image)
        {
            background.set_image(v);
        }
        return background;
    };

    _pGridBandInfo.set_class = function (v)
    {
        if (v != this.cssclass)
        {
            this.cssclass = v;

            if (this._bandctrl)
            {
                this._bandctrl.set_class(v);
                this._grid._clearBindTypeFlag();
            }
        }
    };

    _pGridBandInfo.set_id = function (v) { };

    _pGridBandInfo.set_cssclass = function (v)
    {
        if (v != this.cssclass)
        {
            this.cssclass = v;

            if (this._bandctrl)
            {
                this._bandctrl.set_cssclass(v);
                this._grid._clearBindTypeFlag();
            }
        }
    };

    _pGridBandInfo.set_tooltiptype = function (v)
    {
        // TODO : Object로

        if (v != this.tooltiptype)
        {
            this.tooltiptype = v;
            this._grid._clearBindTypeFlag();
        }
    };

    _pGridBandInfo.set_tooltiptext = function (v)
    {
        if (v != this.tooltiptext._value)
        {
            this.tooltiptext._set(v);
            this._grid._clearBindTypeFlag();

            if (this._bandctrl)
                this._bandctrl.on_apply_prop_tooltip();
        }
    };

    _pGridBandInfo._getTooltipText = function (rowidx)
    {
        var text = this._getAttrValue(this.tooltiptext, rowidx);
        if (!text && text == "")
        {
            text = this._grid.tooltiptext;
            if (!text)
                text = "";
        }
        return text;
    };

    _pGridBandInfo._getAttrValue = function (attr, rowidx, cellinfo)
    {
        if (attr == undefined)
            return undefined;

        if (attr._bindtype == undefined)
        {
            return attr;
        }
        else if (attr._bindtype == 0)
        {
            return attr._value;
        }
        else
        {
            var grid = this._grid;
            var dataset = grid._binddataset;

            if (dataset == null)
                return undefined;

            if (attr._bindtype == 1)
            {
                return dataset.getColumn(rowidx, attr._bindexpr);
            }
            else
            {
                var bindexpr = attr._bindexpr;
                var val = attr._value;
                var s = val.toLowerCase().indexOf("bind:");
                if (s >= 0)
                {
                    bindexpr = bindexpr.substring(s, bindexpr.length);
                    bindexpr = dataset.getColumn(rowidx, bindexpr);
                }

                var exprfn = grid._exprcache[bindexpr];

                if (exprfn == null)
                {
                    exprfn = dataset._createExprFunc(bindexpr);
                    grid._exprcache[bindexpr] = exprfn;
                }
                if ((typeof exprfn) == "function")
                {
                    if (cellinfo)
                    {
                        cellinfo.col = cellinfo._col;
                        cellinfo.row = cellinfo._row;
                        return exprfn.call(cellinfo, rowidx, rowidx, grid, dataset);
                    }
                    else
                    {
                        return exprfn.call(this, rowidx, rowidx, grid, dataset);
                    }

                }
            }
        }

        return undefined;
    };

    _pGridBandInfo._setAttrValue = function (attr, rowidx, v)
    {
        if (attr._bindtype == 1)
        {
            var grid = this._grid;
            var dataset = grid._binddataset;
            if (dataset)
            {
                dataset.setColumn(rowidx, attr._bindexpr, v);
            }
        }
    };

    delete _pGridBandInfo;

    //==============================================================================
    // nexacro.GridFormat 
    //==============================================================================
    // Grid's Format information
    nexacro.GridFormat = function (id, grid)
    {
        this.id = id;
        this._grid = this.parent = grid;
        this._cols = [];

        this._headrows = null;
        this._bodyrows = null;
        this._summrows = null;

        this._headband = null;
        this._summband = null;
        this._bodyband = null;

        this._headcells = null;
        this._summcells = null;
        this._bodycells = null;

        this.leftWidth = 0;
        this.rightWidth = 0;
        this.bodyWidth = 0;

        this._orgleftWidth = 0;
        this._orgrightWidth = 0;
        this._orgbodyWidth = 0;

        this.endbodycol = 0;
        this.startrightcol = -1;

        this.headHeight = 0;
        this.summHeight = 0;
        this.bodyHeight = 0;

        this._formatElem = null;
        this._formatElemOrg = null;
    };

    var _pGridFormat = nexacro._createPrototype(nexacro.Object, nexacro.GridFormat);
    nexacro.GridFormat.prototype = _pGridFormat;

    _pGridFormat._type_name = "GridFormat";

    _pGridFormat.destroy = function ()
    {
        if (this._headband)
        {
            this._headband.destroy();
            this._headband = null;
        }

        if (this._summband)
        {
            this._summband.destroy();
            this._summband = null;
        }

        if (this._bodyband)
        {
            this._bodyband.destroy();
            this._bodyband = null;
        }

        if (this._headcells)
        {
            var cells = this._headcells;
            var len = cells.length;

            for (var i = 0; i < len ; i++)
                cells[i].destroy();

            this._headcells = null;
        }

        if (this._summcells)
        {
            var cells = this._summcells;
            var len = cells.length;

            for (var i = 0; i < len ; i++)
                cells[i].destroy();

            this._summcells = null;
        }

        if (this._bodycells)
        {
            var cells = this._bodycells;
            var len = cells.length;

            for (var i = 0; i < len ; i++)
                cells[i].destroy();

            this._bodycells = null;
        }
        this._headrows = null;
        this._bodyrows = null;
        this._summrows = null;
        this._formatElem = null;
        this._formatElemOrg = null;
        this._cols = null;
        this._grid = null;
        this.parent = null;
    };

    _pGridFormat._resetOrgColSize = function (is_keep_area, autofitcol_rate)
    {
        if (this._cols)
        {
            var _cols = this._cols;
            var _colsLen = this._cols.length;
            var leftwidth, bodywidth, rightwidth;

            leftwidth = bodywidth = rightwidth = 0;

            if (!autofitcol_rate.length)
            {
                for (var i = 0; i < _colsLen; i++)
                {
                    _cols[i].size = _cols[i].orgsize;
                    _cols[i].left = _cols[i].orgleft;
                    _cols[i].right = _cols[i].orgright;

                    if (_cols[i]._area == "left")
                        leftwidth += _cols[i].size;
                    else if (_cols[i]._area == "right")
                        rightwidth += _cols[i].size;
                    else
                        bodywidth += _cols[i].size;
                }
            }
            else
            {
                var left = 0;
                for (var i = 0; i < _colsLen; i++)
                {
                    if (_cols[i]._area == "left")
                    {
                        leftwidth += _cols[i].size;
                        continue;
                    }
                    else if (_cols[i]._area == "right")
                    {
                        rightwidth += _cols[i].size;
                        continue;
                    }

                    _cols[i].size = Math.round(autofitcol_rate[i] * this._orgbodyWidth);
                    _cols[i].left = left;
                    _cols[i].right = left + _cols[i].size;
                    left = _cols[i].right;
                    bodywidth += _cols[i].size;
                }
            }
        }

        if (is_keep_area)
        {
            this.leftWidth = leftwidth;
            this.rightWidth = rightwidth;
            this._bodyWidth = this.bodyWidth = bodywidth;
        }
        else
        {
            this.leftWidth = this._orgleftWidth;
            this.rightWidth = this._orgrightWidth;
            this._bodyWidth = this.bodyWidth = this._orgbodyWidth;
        }
    };

    _pGridFormat._rearrangeCols = function ()
    {
        var cols = this._cols;
        var cols_len = cols.length;

        for (var i = 0; i < cols_len; i++)
            cols[i].orgidx = i;
    };

    _pGridFormat._addLeftColumn = function (size)
    {
        var width = this.leftWidth + size;
        var orgwidth = this._orgleftWidth + size;
        var col = { size: size, left: this.leftWidth, right: width, _area: "left", orgsize: size, orgleft: this._orgleftWidth, orgright: orgwidth };
        var leftcnt = this._getColFixCnt("left");

        this._cols.splice(leftcnt, 0, col);
        this.leftWidth = width;
        this._orgleftWidth = orgwidth;
        return col;
    };

    _pGridFormat._addRightColumn = function (size)
    {
        var width = this.rightWidth + size;
        var orgwidth = this._orgrightWidth + size;
        var col = { size: size, left: this.rightWidth, right: width, _area: "right", orgsize: size, orgleft: this._orgrightWidth, orgright: orgwidth };
        this._cols.push(col);
        this.rightWidth = width;
        this._orgrightWidth = orgwidth;
        return col;
    };

    _pGridFormat._addBodyColumn = function (size)
    {
        var width = this.bodyWidth + size;
        var orgwidth = this._orgbodyWidth + size;
        var col = { size: size, left: this.bodyWidth, right: width, _area: "body", orgsize: size, orgleft: this._orgbodyWidth, orgright: orgwidth };
        var leftcnt = this._getColFixCnt("left");
        var bodycnt = this._getColFixCnt("body");

        this._cols.splice(leftcnt + bodycnt, 0, col);
        this.endbodycol = this._cols.length;
        this._bodyWidth = this.bodyWidth = width;
        this._orgbodyWidth = orgwidth;
        return col;
    };

    _pGridFormat._insertLeftColumn = function (size, addidx)
    {
        var width = this.leftWidth + size;
        var orgwidth = this._orgleftWidth + size;

        if (addidx >= this._cols.length)
            return this._addLeftColumn(size);

        var pcol = this._cols[addidx];
        var left = 0;
        var orgleft = 0;

        if (pcol)
        {
            left = pcol.left;
            orgleft = pcol.orgleft;
        }
        var right = left + size;
        var orgright = orgleft + size;

        var col = { size: size, left: left, right: right, _area: "left", orgsize: size, orgleft: orgleft, orgright: orgright };
        this._cols.splice(addidx, 0, col);

        this.leftWidth = width;
        this._orgleftWidth = orgwidth;

        this._adjustFormatColSize();
        return col;
    };

    _pGridFormat._insertRightColumn = function (size, addidx)
    {
        var width = this.rightWidth + size;
        var orgwidth = this._orgrightWidth + size;

        if (addidx >= this._cols.length)
            return this._addRightColumn(size);

        var pcol = this._cols[addidx];
        var left = 0;
        var orgleft = 0;

        if (pcol)
        {
            left = pcol.left;
            orgleft = pcol.orgleft;
        }
        var right = left + size;
        var orgright = orgleft + size;

        var col = { size: size, left: left, right: right, _area: "right", orgsize: size, orgleft: orgleft, orgright: orgright };
        this._cols.splice(addidx, 0, col);

        this.rightWidth = width;
        this._orgrightWidth = orgwidth;

        this._adjustFormatColSize();
        return col;
    };

    _pGridFormat._insertBodyColumn = function (size, addidx)
    {
        var width = this.bodyWidth + size;
        var orgwidth = this._orgbodyWidth + size;

        if (addidx >= this._cols.length)
            return this._addBodyColumn(size);

        var pcol = this._cols[addidx];
        var left = 0;
        var orgleft = 0;

        if (pcol)
        {
            left = pcol.left;
            orgleft = pcol.orgleft;
        }
        var right = left + size;
        var orgright = orgleft + size;

        var col = { size: size, left: left, right: right, _area: "body", orgsize: size, orgleft: orgleft, orgright: orgright };
        this._cols.splice(addidx, 0, col);

        this.endbodycol = this._cols.length;
        this._bodyWidth = this.bodyWidth = width;
        this._orgbodyWidth = orgwidth;

        this._adjustFormatColSize();
        return col;
    };

    _pGridFormat._moveColumn = function (fromcol, tocol, fromcolspan, tocolspan, cellmovingtype)
    {
        var from_col_info = this._cols[fromcol];
        var from_area = from_col_info._area;
        var from_left = from_col_info.left;
        var from_right = from_col_info.right;;

        if (!from_col_info || fromcol == tocol)
        {
            return false;
        }

        if (fromcol < tocol)
        {
            tocol += (tocolspan - 1);
        }

        var to_col_info = this._cols[tocol];

        switch (cellmovingtype)
        {
            case "col":
                break;
            case "col,band":
                if (from_col_info._area != to_col_info._area)
                    return false;
                break;
            case "col,merge":
            case "col,line":
            default:
                return false;
        }

        from_col_info._area = to_col_info._area;

        this._cols.splice(fromcol, 1);
        this._cols.splice(tocol, 0, from_col_info);

        if (fromcol > tocol)
        {
            for (var i = tocol; i < fromcol; i++)
            {
                this._cols[i].left = this._cols[i + 1].left;
                this._cols[i].right = this._cols[i + 1].right;
            }
        }
        else
        {
            for (var i = tocol; i > fromcol; i--)
            {
                this._cols[i].left = this._cols[i - 1].left;
                this._cols[i].right = this._cols[i - 1].right;
            }
        }

        this._cols[fromcol].left = from_left;
        this._cols[fromcol].right = from_right;

        this._adjustFormatColSize();

        this._moveContentsCol("body", this._bodycells, fromcol, tocol);
        this._moveContentsCol("head", this._headcells, fromcol, tocol);
        this._moveContentsCol("summ", this._summcells, fromcol, tocol);
        this._bodycells = this._reIndexCells(this._bodycells, this._bodyrows);
        this._headcells = this._reIndexCells(this._headcells, this._headrows);
        this._summcells = this._reIndexCells(this._summcells, this._summrows);

        return true;
    };

    _pGridFormat._addHeadRow = function (size)
    {
        if (this._headrows == null)
            this._headrows = [];
        var height = this.headHeight + size;
        var row = { size: size, top: this.headHeight, bottom: height, _area: "head", orgsize: size, orgtop: this.headHeight, orgbottom: height };
        this._headrows.push(row);
        this.headHeight = height;
        return row;
    };

    _pGridFormat._addSummRow = function (size)
    {
        if (this._summrows == null)
            this._summrows = [];
        var height = this.summHeight + size;
        var row = { size: size, top: this.summHeight, bottom: height, _area: "summ", orgsize: size, orgtop: this.summHeight, orgbottom: height };
        this._summrows.push(row);
        this.summHeight = height;
        return row;
    };

    _pGridFormat._addBodyRow = function (size)
    {
        if (this._bodyrows == null)
            this._bodyrows = [];
        var height = this.bodyHeight + size;
        var row = { size: size, top: this.bodyHeight, bottom: height, _area: "body", orgsize: size, orgtop: this.bodyHeight, orgbottom: height };
        this._bodyrows.push(row);
        this._body_height = this.bodyHeight = height;
        return row;
    };

    _pGridFormat._insertHeadRow = function (addidx, size)
    {
        var row = { size: size, top: 0, bottom: size, _area: "head", orgsize: size, orgtop: 0, orgbottom: size };

        if (this._headrows == null || this._headrows.length == 0)
        {
            this._headrows = [];
            this._headrows.push(row);
        }
        else
        {
            if (addidx > 0)
            {
                if (this._headrows.length < addidx)
                    addidx = this._headrows.length;

                row.top = this._headrows[addidx - 1].bottom;
                row.bottom = row.top + size;
            }
            this._headrows.splice(addidx, 0, row);
        }
        this.headHeight += size;
        this._adjustFormatRowSize(this._headrows);
        return row;
    };

    _pGridFormat._insertSummRow = function (addidx, size)
    {
        var row = { size: size, top: 0, bottom: size, _area: "summ", orgsize: size, orgtop: 0, orgbottom: size };

        if (this._summrows == null || this._summrows.length == 0)
        {
            this._summrows = [];
            this._summrows.push(row);
        }
        else
        {
            if (addidx > 0)
            {
                if (this._summrows.length < addidx)
                    addidx = this._summrows.length;

                row.top = this._summrows[addidx - 1].bottom;
                row.bottom = row.top + size;
            }
            this._summrows.splice(addidx, 0, row);
        }
        this.summHeight += size;
        this._adjustFormatRowSize(this._summrows);
        return row;
    };

    _pGridFormat._insertBodyRow = function (addidx, size)
    {
        var row = { size: size, top: 0, bottom: size, _area: "body", orgsize: size, orgtop: 0, orgbottom: size };

        if (this._bodyrows == null || this._bodyrows.length == 0)
        {
            this._bodyrows = [];
            this._bodyrows.push(row);
        }
        else
        {
            if (addidx > 0)
            {
                if (this._bodyrows.length < addidx)
                    addidx = this._bodyrows.length;

                row.top = this._bodyrows[addidx - 1].bottom;
                row.bottom = row.top + size;
            }
            else
            {
                addidx = 0;
            }
            this._bodyrows.splice(addidx, 0, row);
        }
        this.bodyHeight += size;
        this._body_height = this.bodyHeight;
        this._adjustFormatRowSize(this._bodyrows);
        return row;
    };

    _pGridFormat._addHeadCell = function (cell)
    {
        if (this._headcells == null)
            this._headcells = [];

        return this._addCell(this._headcells, cell);
    };

    _pGridFormat._addSummCell = function (cell)
    {
        if (this._summcells == null)
            this._summcells = [];

        return this._addCell(this._summcells, cell);
    };

    _pGridFormat._addBodyCell = function (cell)
    {
        if (this._bodycells == null)
            this._bodycells = [];

        return this._addCell(this._bodycells, cell);
    };

    _pGridFormat._addCell = function (cells, cell)
    {
        var scol = this._cols[cell._col];
        if (scol)
        {
            cell._area = scol._area;
            cells.push(cell);
            return cell;
        }
        return undefined;
    };

    _pGridFormat._insertHeadCell = function (cell, addidx, rowidx)
    {
        if (this._headcells == null)
            this._headcells = [];

        return this._insertCell(this._headcells, cell, addidx, rowidx);
    };

    _pGridFormat._insertSummCell = function (cell, addidx, rowidx)
    {
        if (this._summcells == null)
            this._summcells = [];

        return this._insertCell(this._summcells, cell, addidx, rowidx);
    };

    _pGridFormat._insertBodyCell = function (cell, addidx, rowidx)
    {
        if (this._bodycells == null)
            this._bodycells = [];

        return this._insertCell(this._bodycells, cell, addidx, rowidx);
    };

    _pGridFormat._insertCell = function (cells, cell, addidx, rowidx)
    {
        var scol = this._cols[cell._col];
        if (scol)
        {
            var cellsLen = cells.length;
            var cellinfo;
            var add;

            for (var i = 0; i < cellsLen; i++)
            {
                cellinfo = cells[i];
                if (cellinfo._col == addidx && cellinfo._row == rowidx)
                    add = i;

                if (cellinfo._col >= addidx && cellinfo._row == rowidx)
                {
                    cellinfo._col++;
                }
            }
            cell._area = scol._area;
            cells.splice(add, 0, cell);
            return cell;
        }
        return undefined;
    };

    _pGridFormat._arrayCopy = function (arr)
    {
        function cloneObj(obj)
    {
            var copy = {};
            for (var attr in obj)
        {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
            return copy;
        };

        var newarr = [];

        for (var i = 0; i < arr.length; i++)
        {
            newarr[i] = cloneObj(arr[i]);
        }
        return newarr;
    };

    _pGridFormat._getFormatStr = function ()
        {
        //      this._updateFormatStr(); 스펙변경시 todo
        return nexacro._documentToXml(this._formatElem);
    };

    _pGridFormat._getOrgFormatStr = function ()
    {
        return nexacro._documentToXml(this._formatElemOrg);
    };

    _pGridFormat._updateFormatStr = function ()
    {
        if (!this._grid.enableredraw)
            return;

        var hr = 0;
        var i = 0;
        var nColCount = 0;
        var nPvtCount = 0;
        var _cols = this._cols;
        var _headrows = this._headrows;
        var _bodyrows = this._bodyrows;
        var _summrows = this._summrows;
        var _headcells = this._headcells;
        var _bodycells = this._bodycells;
        var _summcells = this._summcells;
        var _headband = this._headband;
        var _bodyband = this._bodyband;
        var _summband = this._summband;

        if (_cols && _cols.length)
            nColCount = _cols.length;

        var strContents;

        if (nColCount > 0)
        {
            strContents = "<Format id=\"" + this.id + "\">\n";
            strContents += "<Columns>\n";
            {
                for (i = 0; i < nColCount; i++)
                {
                    if (_cols[i]._area != "body")
                        strContents += "<Column size=\"" + _cols[i].size + "\" band=\"" + _cols[i]._area + "\"/>\n";
                    else
                        strContents += "<Column size=\"" + _cols[i].size + "\"/>\n";
                }
            }
            strContents += "</Columns>\n";
            strContents += "<Rows>\n";
            {
                if (_headrows)
                {
                    var _headrowsLen = _headrows.length;
                    for (var i = 0; i < _headrowsLen; i++)
                    {
                        strContents += "<Row band=\"head\" size=\"" + _headrows[i].size + "\"/>\n";
                    }
                }
                if (_bodyrows)
                {
                    var _bodyrowsLen = _bodyrows.length;
                    for (var i = 0; i < _bodyrowsLen; i++)
                    {
                        strContents += "<Row band=\"body\" size=\"" + _bodyrows[i].size + "\"/>\n";
                    }
                }
                if (_summrows)
                {
                    var _summrowsLen = _summrows.length;
                    for (var i = 0; i < _summrowsLen; i++)
                    {
                        strContents += "<Row band=\"summ\" size=\"" + _summrows[i].size + "\"/>\n";
                    }
                }
            }
            strContents += "</Rows>\n";

            function _makePropstr(obj)
            {
                var xmlstr = ""
                var _property_map = obj._property_map;
                var prop, bind, deft;

                for (var i = 0; i < _property_map.length; i++)
                {
                    prop = _property_map[i][0];
                    bind = _property_map[i][1];
                    deft = _property_map[i][2];

                    if (bind)
                    {
                        if (obj[prop]._value != deft)
                            xmlstr += "\" " + prop + "=\"" + (typeof (obj[prop]._value) == "string" ? nexacro._encodeXml(obj[prop]._value) : obj[prop]._value);
                    }
                    else
                    {
                        if (obj[prop] != deft)
                            xmlstr += "\" " + prop + "=\"" + (typeof (obj[prop]) == "string" ? nexacro._encodeXml(obj[prop]) : obj[prop]);
                    }
                }
                return xmlstr;
            }

            function _makeCellstr(cells)
            {
                var cellsLen = cells.length;
                for (var i = 0; i < cellsLen; i++)
                {
                    strContents += "<Cell col=\"" + cells[i]._col;
                    strContents += "\" row=\"" + cells[i]._row;

                    if (cells[i]._colspan > 1)
                        strContents += "\" colspan=\"" + cells[i]._colspan;
                    if (cells[i]._rowspan > 1)
                        strContents += "\" rowspan=\"" + cells[i]._rowspan;

                    strContents += _makePropstr(cells[i]);

                    var subcells = cells[i]._subcells;
                    var subcellsLen = subcells.length;

                    if (subcellsLen > 0)
                    {
                        strContents += "\">\n";
                        _makeCellstr(subcells);
                        strContents += "</Cell>\n";
                    }
                    else
                    {
                        strContents += "\"/>\n";
                    }
                }
            }

            if (_headrows)
            {
                strContents += "<Band id=\"head" + _makePropstr(_headband) + "\">\n";
                _makeCellstr(_headcells);
                strContents += "</Band>\n";
            }
            if (_bodyrows)
            {
                strContents += "<Band id=\"body" + _makePropstr(_bodyband) + "\">\n";
                _makeCellstr(_bodycells);
                strContents += "</Band>\n";
            }
            if (_summrows)
            {
                strContents += "<Band id=\"summary" + _makePropstr(_summband) | "\">\n";
                _makeCellstr(_summcells);
                strContents += "</Band>\n";
            }
            strContents += "</Format>\n";
        }
        else
        {
            strContents = "<Format id=\"" + this.id + "\"></Format>\n";
        }

        // load contents
        var contentsElem = nexacro._parseXMLDocument(strContents);
        var format_elem = contentsElem.getElementsByTagName("Format");

        if (format_elem)
        {
            this._formatElem = format_elem[0];
        }
        return strContents;
    };

    _pGridFormat._loadFromDOM = function (formatElem)
    {
        var i, j, len, cnt, bandstr, sizestr, bandtype;
        var colstr, colval, colspanstr, colspan, rowstr, rowval, rowspanstr, rowspan, attrval;
        var bandobj, cellobj, bandElem, cellElem;

        this._formatElemOrg = formatElem.cloneNode(true);

        var columns = formatElem.getElementsByTagName("Column");
        len = columns.length;

        if (len == 0)
        {
            columns = formatElem.getElementsByTagName("Col");

            len = columns.length;
        }
        var areaflag = 0;

        this._formatElem = formatElem;

        for (i = 0; i < len; i++)
        {
            var columnElem = columns[i];
            bandstr = columnElem.getAttribute("band");
            sizestr = columnElem.getAttribute("size");
            if (areaflag == 0 && bandstr == "left")
            {
                this._addLeftColumn(parseInt(sizestr, 10));
            }
            else if (areaflag == 2 || bandstr == "right")
            {
                this._addRightColumn(parseInt(sizestr, 10));
                areaflag = 2;
            }
            else
            {
                this._addBodyColumn(parseInt(sizestr, 10));
                areaflag = 1;
            }
        }
        this._bodyWidth = this.bodyWidth;

        this._rearrangeCols();

        var rows = formatElem.getElementsByTagName("Row");
        len = rows.length;
        for (i = 0; i < len; i++)
        {
            var rowElem = rows[i];
            bandstr = rowElem.getAttribute("band");
            sizestr = rowElem.getAttribute("size");
            if (bandstr == "head")
                this._addHeadRow((parseInt(sizestr) | 0));
            else if (bandstr == "summ")
                this._addSummRow((parseInt(sizestr) | 0));
            else
                this._addBodyRow((parseInt(sizestr) | 0));
        }
        this._body_height = this.bodyHeight;

        var bands = formatElem.getElementsByTagName("Band");
        len = bands.length;

        function _setProp(obj, xmlelem)
        {
            var _property_map = obj._property_map;
            var prop;

            for (var k = 0; k < _property_map.length; k++)
            {
                prop = _property_map[k][0];
                attrval = xmlelem.getAttribute(prop);

                if (attrval)
                    obj["set_" + prop](attrval);
            }
        }

        for (i = 0; i < len; i++)
        {
            bandElem = bands[i];
            bandtype = bandElem.getAttribute("id");
            if (bandtype == "head")
            {
                if (this._headband == null)
                {
                    this._headband = new nexacro.GridBandInfo("head", this, this.parent);
                }
                bandobj = this._headband;
            }
            else if (bandtype == "summary")
            {
                if (this._summband == null)
                {
                    this._summband = new nexacro.GridBandInfo("summary", this, this.parent);
                }
                bandobj = this._summband;
            }
            else
            {
                bandtype = "body";
                if (this._bodyband == null)
                {
                    this._bodyband = new nexacro.GridBandInfo("body", this, this.parent);
                }
                bandobj = this._bodyband;
            }

            _setProp(bandobj, bandElem);

            var cells = bandElem.getElementsByTagName("Cell");
            cnt = cells.length;

            var parentcellobj = null;
            var childcnt = 0;
            var idx = -1;
            var subidx = 0;

            for (j = 0; j < cnt; j++)
            {
                if (childcnt > 0)
                {
                    cellobj = new nexacro.GridCellInfo(bandtype + idx + "_sub" + subidx, bandobj, this.parent, bandtype, subidx);
                }
                else
                {
                    idx++;
                    cellobj = new nexacro.GridCellInfo(bandtype + idx, bandobj, this.parent, bandtype, idx);
                }

                cellElem = cells[j];
                colstr = cellElem.getAttribute("col");
                rowstr = cellElem.getAttribute("row");
                colspanstr = cellElem.getAttribute("colspan");
                rowspanstr = cellElem.getAttribute("rowspan");
                colval = (colstr == null ? 0 : parseInt(colstr));
                rowval = (rowstr == null ? 0 : parseInt(rowstr));

                var subcells = cellElem.getElementsByTagName("Cell");

                var bandrowlen = 0;
                if (bandtype == "head" && this._headrows)
                    bandrowlen = this._headrows.length;
                else if (bandtype == "summary" && this._summrows)
                    bandrowlen = this._summrows.length;
                else if (bandtype == "body" && this._bodyrows)
                    bandrowlen = this._bodyrows.length;

                if (rowval >= bandrowlen)
                {
                    delete cellobj;
                    continue;
                }

                colspan = (colspanstr == null ? 1 : parseInt(colspanstr));
                rowspan = (rowspanstr == null ? 1 : parseInt(rowspanstr));
                cellobj._col = colval;
                cellobj._colspan = colspan;
                cellobj._row = rowval;
                cellobj._rowspan = rowspan;
                cellobj._endcol = ((colval + colspan) == this.endbodycol);

                _setProp(cellobj, cellElem);

                if (childcnt > 0)
                {
                    cellobj._isSubCell = true;
                    parentcellobj._subcells.push(cellobj);
                    childcnt--;
                    subidx++;
                }
                else
                {
                    subidx = 0;
                    if (subcells.length > 0)
                    {
                        childcnt = subcells.length;
                        parentcellobj = cellobj;
                    } else
                    {
                        parentcellobj = null;
                    }
                    if (bandtype == "head")
                        this._addHeadCell(cellobj);
                    else if (bandtype == "summary")
                        this._addSummCell(cellobj);
                    else
                        this._addBodyCell(cellobj);
                }
            }
        }
        this._bodycells = this._sortCellIdx(this._bodycells, this._bodyrows);
        this._headcells = this._sortCellIdx(this._headcells, this._headrows);
        this._summcells = this._sortCellIdx(this._summcells, this._summrows);
    };

    _pGridFormat._sortCellIdx = function (cells, rows)
    {
        if (!cells || !rows) return null;

        var newcells = [];
        var cellsLen = cells.length;
        var rowsLen = rows.length;
        var idx = 0;

        for (var i = 0; i < rowsLen; i++)
        {
            for (var j = 0; j < cellsLen; j++)
            {
                if (cells[j]._row == i)
                {
                    cells[j]._cellidx = idx++;
                    newcells.push(cells[j]);
                }
            }
        }
        return newcells;
    };

    _pGridFormat._adjustColSizing = function (idx, movepos)
    {
        if (movepos != 0)
        {
            var len = this._cols.length;

            if (len == 0 && !this._cols[idx])
                return false;

            var area = this._cols[idx]._area;

            if (area == "body")
                this.bodyWidth = this._bodyWidth = this._bodyWidth + movepos;
            else if (area == "left")
                this.leftWidth += movepos;
            else
                this.rightWidth += movepos;

            var col;
            var pos = 0;

            for (var i = 0; i < len; i++)
            {
                if (i < idx)
                {
                    continue;
                }
                else if (i == idx)
                {
                    col = this._cols[i];
                    if (col._area != area)
                        continue;

                    col.right += movepos;
                    col.size += movepos;
                }
                else
                {
                    col = this._cols[i];
                    if (col._area != area)
                        continue;

                    col.left += movepos;
                    col.right += movepos;
                }
            }
            this._updateFormatStr();
            return true;
        }
        return false;
    };

    _pGridFormat._adjustColWidth = function (bodywidth, autofitcol_rate)
    {
        if (bodywidth <= 0)
            return false;

        var retn = false;
        if (this._bodyWidth != bodywidth)
            retn = true;

        this._bodyWidth = bodywidth;
        var factor = bodywidth / this.bodyWidth;
        this.bodyWidth = this._bodyWidth;
        var len = this._cols.length;
        var col, bodylastcol, bodylastcolidx = -1;
        var pos = 0;
        var tot = 0;

        if (!autofitcol_rate.length)
        {
            for (var i = 0; i < len; i++)
            {
                col = this._cols[i];
                if (col._area != "body")
                    continue;

                col.left = pos;

                if (col.tempsize != undefined)
                {
                    col.size = col.tempsize;
                    col.tempsize = undefined;
                }

                col.size *= factor;

                autofitcol_rate[i] = col.size / bodywidth;

                if (col.size >= 0.5)
                    col.size = Math.round(col.size);

                tot += col.size;
                pos = pos + col.size;
                col.right = pos;

                if (col.size > 0)
                {
                    bodylastcol = col;
                    bodylastcolidx = i;
                }
            }
        }
        else
        {
            for (var i = 0; i < len; i++)
            {
                col = this._cols[i];
                if (col._area != "body")
                    continue;

                col.left = pos;
                col.size = bodywidth * autofitcol_rate[i];

                if (col.size >= 0.5)
                    col.size = Math.round(col.size);

                tot += col.size;
                pos = pos + col.size;
                col.right = pos;
                bodylastcol = col;
                bodylastcolidx = i;
            }
        }

        if (bodylastcol && bodylastcol.size > 0)    // 16/01/20 cmc
        {
            bodylastcol.tempsize = bodylastcol.size;
            bodylastcol.size += (bodywidth - tot); // 오차에 의해 공백이 생기는 만큼 메꿈.
            bodylastcol.right += (bodywidth - tot);

            if (bodylastcol.size <= 0)
            {
                bodylastcol.size = 1;
                bodylastcol.right = bodylastcol.left + bodylastcol.size;
            }
        }

        return retn;
    };

    _pGridFormat._adjustRowHeight = function (bodyheight)
    {
        if (bodyheight == 0)
            bodyheight = 0.1;

        if (this._body_height != bodyheight)
        {
            this._body_height = bodyheight;
            var factor = bodyheight / this.bodyHeight;
            this.bodyHeight = this._body_height;

            if (!this._rows)
                return true;

            var len = this._rows.length;
            var row;
            var pos = 0;

            for (var i = 0; i < len; i++)
            {
                row = this._rows[i];
                if (row._area != "body")
                    continue;

                row.top = pos;
                row.size = (row.size * factor);

                pos = pos + row.size;
                row.bottom = pos;
            }
            return true;
        }
        return false;
    };

    _pGridFormat._defaultColSize = 40;
    _pGridFormat._appendContentsCol = function (bandtype, bandobj, bandcells, bandrows, addfunc, col)
    {
        var cellsize = (bandcells) ? bandcells.length : 0;
        var rowsize = (bandrows) ? bandrows.length : 0;
        var cellobj = null;

        for (var i = 0; i < cellsize; i++)
        {
            bandcells[i]._endcol = false;

            if (bandcells[i]._col >= col)
                bandcells[i]._col++;
        }

        for (var i = 0; i < rowsize; i++)
        {
            cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
            cellobj.celltype = bandtype;
            cellobj._col = col;
            cellobj._colspan = 1;
            cellobj._row = i;
            cellobj._rowspan = 1;
            this[addfunc](cellobj);
            cellsize++;
        }
        bandcells[bandcells.length - 1]._endcol = true;

        this._arrangeCellIdx(bandtype);
        this._updateFormatStr();
    };

    _pGridFormat._arrangeCellIdx2 = function (bandcells, rowsize)
    {
        var j = 0;
        var cellobj;
        var cells = [];

        for (var k = 0; k < rowsize; k++)
        {
            for (var i = 0; i < bandcells.length; i++)
            {
                cellobj = bandcells[i];

                if (k == cellobj._row)
                {
                    cellobj._cellidx = j;
                    cells[j++] = cellobj;
                    bandcells.splice(i, 1);
                    i--;
                }
            }
        }
        return cells;
    };

    _pGridFormat._arrangeCellIdx = function (band)
    {
        var bandcells = this._bodycells;
        var bandrows = this._bodyrows;

        if (band == "body")
        {
            bandcells = this._bodycells;
            bandrows = this._bodyrows;
        }
        else if (band == "summ" || band == "summary")
        {
            bandcells = this._summcells;
            bandrows = this._summrows;
        }
        else if (band == "head")
        {
            bandcells = this._headcells;
            bandrows = this._headrows;
        }

        var rowsize = (bandrows) ? bandrows.length : 0;
        var cells = this._arrangeCellIdx2(bandcells, rowsize);

        if (band == "body")
        {
            this._bodycells = cells;
        }
        else if (band == "summ" || band == "summary")
        {
            this._summcells = cells;
        }
        else if (band == "head")
        {
            this._headcells = cells;
        }
    };

    _pGridFormat.appendContentsCol = function (strBand, bBandAppend)
    {
        var areatype = "body";

        if (bBandAppend == undefined)
            bBandAppend = true;

        bBandAppend = nexacro._toBoolean(bBandAppend);

        if (bBandAppend == false)
        {
            var rightcnt = this._getColFixCnt("right");
            if (rightcnt)
                areatype = "right";
            else
                areatype = "body";
        }
        else
        {
            if (strBand)
            {
                var areaidx = parseInt(strBand, 10);
                if (isFinite(areaidx))
                {
                    if (areaidx == -1)
                    {
                        areatype = "left";
                    }
                    else if (areaidx == -2)
                    {
                        areatype = "right";
                    }
                    else
                    {
                        areatype = "body";
                    }
                }
                else if (strBand.length)
                {
                    areatype = strBand.toLowerCase();
                }
            }
        }

        var col = this._cols.length;
        var colSize = this._defaultColSize;

        if (areatype == "left")
        {
            col = this._getColFixCnt("left");
            this._addLeftColumn(colSize);
        }
        else if (areatype == "right")
        {
            col = this._cols.length;
            this._addRightColumn(colSize);
        }
        else
        {
            col = this._getColFixCnt("left");
            col += this._getColFixCnt("body");
            this._addBodyColumn(colSize);
            this.endbodycol = this._cols.length;
        }

        if (this._bodyband)
        {
            var bandtype = "body";
            var bandobj = this._bodyband;
            var bandcells = this._bodycells;
            var bandrows = this._bodyrows;
            var addfunc = "_addBodyCell";
            this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
        }

        if (this._headband)
        {
            bandtype = "head";
            bandobj = this._headband;
            bandcells = this._headcells;
            bandrows = this._headrows;
            addfunc = "_addHeadCell";
            this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
        }

        if (this._summband)
        {
            bandtype = "summary";
            bandobj = this._summband;
            bandcells = this._summcells;
            bandrows = this._summrows;
            addfunc = "_addSummCell";
            this._appendContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, col);
        }
        this._rearrangeCols();
        return col;
    };

    _pGridFormat._moveContentsCol = function (bandtype, bandcells, fromcol, tocol, colspan1, colspan2)
    {
        if (!bandcells)
        {
            return;
        }

        var bandcellsLen = bandcells.length;
        var endcol = (this._cols) ? (this._cols.length - 1) : -1;
        var cellobj, _col;

        var areaInfos = {};
        var colIdx, fromIdx, toIdx;


        for (var i = 0; i < bandcellsLen; i++)
        {
            cellobj = bandcells[i];
            colIdx = cellobj._col;

            if (colIdx == fromcol)
                fromIdx = colIdx;
            if (colIdx == tocol)
                toIdx = colIdx;

            areaInfos[colIdx] = cellobj._area;
        }

        for (var i = 0; i < bandcellsLen; i++)
        {
            cellobj = bandcells[i];
            _col = cellobj._col;

            if (cellobj._orgcol == undefined)
                cellobj._orgcol = _col;

            if (_col == fromcol)
            {
                cellobj._area = areaInfos[tocol];
                cellobj._col = tocol;
            }
            else
            {
                if (fromcol < tocol)
                {
                    //move right
                    if (_col > fromcol && _col <= tocol)
                    {
                        cellobj._col--;
                    }
                }
                else
                {
                    //move left
                    if (_col < fromcol && _col >= tocol)
                    {
                        cellobj._col++;
                    }
                }
            }

            if (cellobj._col == endcol)
            {
                cellobj._endcol = true;
            }
            else
            {
                cellobj._endcol = false;
            }
        }

        this._arrangeCellIdx(bandtype);
        this._updateFormatStr();
    };

    _pGridFormat._reIndexCells = function (cells, rows)
    {
        if (!cells || !rows)
        {
            return;
        }

        var rowslen = rows.length;
        var cellslen = cells.length;

        var i = 0, j = 0, k = 0;
        var tmp = [], tmp2 = [];

        for (i = 0; i < rowslen; i++)
        {
            tmp = [];
            k = 0;
            for (j = 0; j < cellslen; j++)
            {
                if (cells[j]._row == i)
                {
                    tmp[k++] = cells[j];
                }
            }
            tmp.sort(function (a, b) { return a._col - b._col; });
            tmp2 = tmp2.concat(tmp);
        }

        for (i = 0; i < cellslen; i++)
        {
            tmp2[i]._cellidx = i;
        }
        return tmp2;
    };

    _pGridFormat._insertContentsCol = function (bandtype, bandobj, bandcells, bandrows, addfunc, insertidx)
    {
        var col = insertidx;
        var cellsize = bandcells.length;
        var rowsize = bandrows.length;
        var cellobj = null;
        var mergecells = [];

        for (var i = 0; i < cellsize; i++)
        {
            cellobj = bandcells[i];

            if (cellobj._col < insertidx && (cellobj._col + cellobj._colspan - 1) >= insertidx)
            {
                mergecells.push(cellobj);
            }
        }

        var mergecell;
        if (mergecells.length > 0)
        {
            for (var i = 0; i < mergecells.length; i++)
            {
                mergecell = mergecells[i];
                mergecell._colspan++;

                if (mergecell._subcells.length > 0)
                {
                    var subcol = col - mergecell._col;
                    cellobj = new nexacro.GridCellInfo(bandtype + cellsize + "_sub" + subcol, bandobj, this.parent, bandtype, mergecell._subcells.length);
                    cellobj.celltype = bandtype;
                    cellobj._col = subcol;
                    cellobj._colspan = 1;
                    cellobj._row = 0;
                    cellobj._rowspan = 1;
                    cellobj._isSubCell = true;
                    this._insertCell(mergecell._subcells, cellobj, subcol, 0);
                }

                for (var j = 0; j < cellsize; j++)
                {
                    cellobj = bandcells[j];

                    if (cellobj._col >= insertidx && cellobj._row == mergecell._row)
                    {
                        cellobj._col++;
                    }
                }
            }
        }

        for (var i = 0; i < rowsize; i++)
        {
            for (var j = 0; j < mergecells.length; j++)
            {
                mergecell = mergecells[j];
                if (mergecell._row == i)
                {
                    break;
                }
            }

            if (mergecell && mergecell._row == i)
                continue;

            cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
            cellobj.celltype = bandtype;
            cellobj._col = col;
            cellobj._colspan = 1;
            cellobj._row = i;
            cellobj._rowspan = 1;
            this[addfunc](cellobj, col, i);
            cellsize++;
        }

        var endcol = (this._cols) ? (this._cols.length - 1) : -1;

        cellsize = bandcells.length;
        for (var i = 0; i < cellsize; i++)
        {
            cellobj = bandcells[i];

            if (cellobj._col == endcol)
                cellobj._endcol = true;
            else
                cellobj._endcol = false;
        }
        this._arrangeCellIdx(bandtype);
        this._updateFormatStr();
    };

    _pGridFormat.insertContentsCol = function (strBand, nColIndex, bBandAppend)
    {
        var areatype = "body";

        if (bBandAppend == undefined)
            bBandAppend = true;

        bBandAppend = nexacro._toBoolean(bBandAppend);

        var lcnt = this._getColFixCnt("left");
        var bcnt = this._getColFixCnt("body");
        var rcnt = this._getColFixCnt("right");

        if (strBand != undefined)
        {
            var areaidx = parseInt(strBand, 10);

            if (isFinite(areaidx))
            {
                if (nColIndex != undefined)
                {
                    if (areaidx == -1)
                    {
                        areatype = "left";
                    }
                    else if (areaidx == -2)
                    {
                        areatype = "right";
                    }
                    else
                    {
                        areatype = "body";
                    }

                    if (nColIndex < 0)
                        nColIndex = 0;

                    if (bBandAppend)
                    {
                        if (areatype == "body")
                        {
                            nColIndex += lcnt;
                        }
                        else if (areatype == "right")
                        {
                            nColIndex += lcnt;
                            nColIndex += bcnt;
                        }

                        if (areatype == "left")
                        {
                            if (nColIndex > lcnt)
                                nColIndex = lcnt;
                        }
                        else if (areatype == "body")
                        {
                            if (nColIndex > lcnt + bcnt)
                                nColIndex = lcnt + bcnt;
                        }
                        else
                        {
                            if (nColIndex > lcnt + bcnt + rcnt)
                                nColIndex = lcnt + bcnt + rcnt;
                        }
                    }
                    else
                    {
                        if (nColIndex > this._cols.length)
                            nColIndex = this._cols.length;

                        if (nColIndex < lcnt)
                            areatype = "left";
                        else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt)
                            areatype = "right";
                        else
                            areatype = "body";
                    }
                }
                else
                {
                    if (areaidx < 0)
                        areaidx = 0;
                    else if (areaidx > this._cols.length)
                        areaidx = this._cols.length;

                    nColIndex = areaidx;
                }
            }
            else if (strBand.length)
            {
                areatype = strBand.toLowerCase();

                if (nColIndex == undefined)
                    return -1;
                else if (nColIndex < 0)
                    nColIndex = 0;

                if (bBandAppend)
                {
                    if (areatype == "body")
                    {
                        nColIndex += lcnt;
                    }
                    else if (areatype == "right")
                    {
                        nColIndex += lcnt;
                        nColIndex += bcnt;
                    }

                    if (areatype == "left")
                    {
                        if (nColIndex > lcnt)
                            nColIndex = lcnt;
                    }
                    else if (areatype == "body")
                    {
                        if (nColIndex > lcnt + bcnt)
                            nColIndex = lcnt + bcnt;
                    }
                    else
                    {
                        if (nColIndex > lcnt + bcnt + rcnt)
                            nColIndex = lcnt + bcnt + rcnt;
                    }
                }
                else
                {
                    if (nColIndex > this._cols.length)
                        nColIndex = this._cols.length;

                    if (nColIndex < lcnt)
                        areatype = "left";
                    else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt)
                        areatype = "right";
                    else
                        areatype = "body";
                }
            }
        }

        var colSize = this._defaultColSize;

        if (areatype == "left")
        {
            this._insertLeftColumn(colSize, nColIndex);
        }
        else if (areatype == "right")
        {
            this._insertRightColumn(colSize, nColIndex);
        }
        else
        {
            this._insertBodyColumn(colSize, nColIndex);
            this.endbodycol = this._cols.length;
        }

        if (this._bodyband)
        {
            var bandtype = "body";
            var bandobj = this._bodyband;
            var bandcells = this._bodycells;
            var bandrows = this._bodyrows;
            var addfunc = "_insertBodyCell";
            this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
        }

        if (this._headband)
        {
            bandtype = "head";
            bandobj = this._headband;
            bandcells = this._headcells;
            bandrows = this._headrows;
            addfunc = "_insertHeadCell";
            this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
        }

        if (this._summband)
        {
            bandtype = "summary";
            bandobj = this._summband;
            bandcells = this._summcells;
            bandrows = this._summrows;
            addfunc = "_insertSummCell";
            this._insertContentsCol(bandtype, bandobj, bandcells, bandrows, addfunc, nColIndex);
        }
        this._rearrangeCols();
        return nColIndex;
    };

    _pGridFormat._defaultRowSize = 24;
    _pGridFormat._appendContentsRow = function (bandtype, bandobj, bandcells, bandrows, rowfunc, addfunc)
    {
        var row = (bandrows) ? bandrows.length : 0;
        var rowSize = this._defaultRowSize;
        this[rowfunc](rowSize);
        var cellsize = (bandcells) ? bandcells.length : 0;
        var colsize = this._cols.length;
        var cellobj = null;

        if (colsize == 0)
        {
            this._addBodyColumn(this._defaultColSize);
            colsize = this._cols.length;
        }

        for (var i = 0; i < colsize; i++)
        {
            cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
            cellobj.celltype = bandtype;
            cellobj._col = i;
            cellobj._colspan = 1;
            cellobj._row = row;
            cellobj._rowspan = 1;
            cellobj._endcol = ((i + 1) == this.endbodycol);
            this[addfunc](cellobj);
            cellsize++;
        }
        this._updateFormatStr();
        return row;
    };

    _pGridFormat.appendContentsRow = function (strBand, bBandAppend)
    {
        var bandtype = "";

        if (strBand != undefined)
        {
            var bandidx = parseInt(strBand, 10);
            if (isFinite(bandidx))
            {
                if (bandidx == -1)
                    bandtype = "head";
                else if (bandidx == -2)
                    bandtype = "summ";
                else if (bandidx >= 0)
                    bandtype = "body";
            }
            else if (strBand.length)
            {
                bandtype = strBand.toLowerCase();
            }

            if (bandtype == "")
                return -1;
        }

        var row = -1;

        if (bandtype == "head")
        {
            if (this._headband == null)
                this._headband = new nexacro.GridBandInfo("head", "head", this, this.parent);

            var bandobj = this._headband;
            var bandcells = this._headcells;
            var bandrows = this._headrows;
            var rowfunc = "_addHeadRow";
            var addfunc = "_addHeadCell";
            row = this._appendContentsRow("head", bandobj, bandcells, bandrows, rowfunc, addfunc);
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband == null)
                this._summband = new nexacro.GridBandInfo("summary", "summ", this, this.parent);

            var bandobj = this._summband;
            var bandcells = this._summcells;
            var bandrows = this._summrows;
            var rowfunc = "_addSummRow";
            var addfunc = "_addSummCell";
            row = this._appendContentsRow("summary", bandobj, bandcells, bandrows, rowfunc, addfunc);
        }
        else if (bandtype == "body")
        {
            if (this._bodyband == null)
                this._bodyband = new nexacro.GridBandInfo("body", "body", this, this.parent);

            var bandobj = this._bodyband;
            var bandcells = this._bodycells;
            var bandrows = this._bodyrows;
            var rowfunc = "_addBodyRow";
            var addfunc = "_addBodyCell";
            row = this._appendContentsRow("body", bandobj, bandcells, bandrows, rowfunc, addfunc);
        }

        return row;
    };

    _pGridFormat._deleteRowCell = function (band, row)
    {
        var cells = this._bodycells;

        if (band == "head")
        {
            cells = this._headcells;
        }
        else if (band == "summ")
        {
            cells = this._summcells;
        }
        if (cells == null || cells.length == 0)
        {
            return undefined;
        }

        var colspan, rowspan;

        for (var i = 0; i < cells.length; i++)
        {
            if (cells[i]._row == row)
            {
                colspan = cells[i]._colspan;
                rowspan = cells[i]._rowspan;

                if (rowspan == 1)
                {
                    delete cells[i];
                    cells.splice(i, 1);
                    i--;
                }
                else
                {
                    var subcells = cells[i]._subcells;
                    var subcell;

                    for (var j = 0; j < subcells.length; j++)
                    {
                        subcell = subcells[j];
                        if (subcell._row + cells[i]._row == row)
                        {
                            delete subcell;
                            subcells.splice(j, 1);
                            for (var k = j; k < subcells.length; k++)
                            {
                                subcells[k]._cellidx--;
                            }
                            j--;
                        }
                        else if (subcell._row + cells[i]._row > row)
                        {
                            subcell._row--;
                        }
                        else if (subcell._row + cells[i]._row < row && (subcell._row + cells[i]._row + subcell._rowspan - 1) >= row)
                        {
                            subcell._rowspan--;
                        }
                    }
                    cells[i]._rowspan--;
                }
            }
            else if (cells[i]._row > row)
            {
                cells[i]._row--;
            }
            else
            {
                if ((cells[i]._row + cells[i]._rowspan - 1) >= row)
                {
                    var subcells = cells[i]._subcells;
                    var subcell;

                    for (var j = 0; j < subcells.length; j++)
                    {
                        subcell = subcells[j];
                        if (subcell._row + cells[i]._row == row)
                        {
                            delete subcell;
                            subcells.splice(j, 1);
                            for (var k = j; k < subcells.length; k++)
                            {
                                subcells[k]._cellidx--;
                            }
                            j--;
                        }
                        else if (subcell._row + cells[i]._row > row)
                        {
                            subcell._row--;
                        }
                        else if (subcell._row + cells[i]._row < row && (subcell._row + cells[i]._row + subcell._rowspan - 1) >= row)
                        {
                            subcell._rowspan--;
                        }
                    }
                    cells[i]._rowspan--;
                }
            }
        }
        this._arrangeCellIdx(band);
        this._updateFormatStr();
    };

    _pGridFormat._deleteRow = function (band, row)
    {
        band = band.toLowerCase();
        this._deleteRowCell(band, row);

        var rows = this._bodyrows;

        if (band == "head")
        {
            rows = this._headrows;
        }
        else if (band == "summ")
        {
            rows = this._summrows;
        }

        if (rows == null || rows.length == 0 || rows.length <= row)
            return -1;

        var size = rows[row].size;
        rows.splice(row, 1);

        var rowsLen = rows.length;
        for (var i = row; i < rowsLen; i++)
        {
            rows[i].top -= size;
            rows[i].bottom -= size;
        }
        if (band == "head")
            this.headHeight -= size;
        else if (band == "summ")
            this.summHeight -= size;
        else
            this._body_height = this.bodyHeight -= size;

        this._updateFormatStr(band);
        return row;
    };

    _pGridFormat.deleteContentsRow = function (strBand, nSubRowIndex, bBandIndex)
    {
        var bandtype = "";

        if (bBandIndex == undefined)
            bBandIndex = true;

        if (strBand != undefined)
        {
            var bandidx = parseInt(strBand, 10);
            if (isFinite(bandidx))
            {
                if (bandidx == -1)
                    bandtype = "head";
                else if (bandidx == -2)
                    bandtype = "summ";
                else if (bandidx >= 0)
                    bandtype = "body";
            }
            else if (strBand.length)
            {
                bandtype = strBand.toLowerCase();
            }

            if (bandtype == "")
                return -1;
        }
        return this._deleteRow(bandtype, nSubRowIndex);
    };

    _pGridFormat._insertContentsRow = function (bandtype, bandobj, bandcells, bandrows, rowfunc, addfunc, insertidx)
    {
        var rowSize = this._defaultRowSize;
        this[rowfunc](insertidx, rowSize);
        var cellsize = (bandcells) ? bandcells.length : 0;
        var colsize = this._cols.length;
        var cellobj = null;

        if (colsize == 0)
        {
            this._addBodyColumn(this._defaultColSize);
            colsize = this._cols.length;
        }

        var mergecells = [];
        for (var i = 0; i < cellsize; i++)
        {
            cellobj = bandcells[i];

            if (cellobj._row < insertidx)
            {
                if ((cellobj._row + cellobj._rowspan - 1) >= insertidx)
                    mergecells.push(cellobj);
            }
            else
            {
                cellobj._row++;
            }
        }

        if (mergecells.length > 0)
        {
            var mergecell, subcells;

            for (var i = 0; i < mergecells.length; i++)
            {
                mergecell = mergecells[i];
                subcells = mergecell._subcells;
                mergecell._rowspan++;

                if (subcells.length)
                {
                    for (var j = 0; j < subcells.length; j++)
                    {
                        if (subcells[j]._row >= insertidx - mergecell._row)
                            subcells[j]._row++;
                    }

                    for (var j = mergecell._col; j < mergecell._col + mergecell._colspan; j++)
                    {
                        cellobj = new nexacro.GridCellInfo(bandtype + mergecell._cellidx + "_sub" + subcells.length, bandobj, this.parent, bandtype, subcells.length);
                        cellobj.celltype = bandtype;
                        cellobj._col = j;
                        cellobj._colspan = 1;
                        cellobj._row = insertidx - mergecell._row;
                        cellobj._rowspan = 1;
                        cellobj._endcol = ((j + 1) == this.endbodycol);
                        this._addCell(subcells, cellobj);
                    }
                    mergecell._subcells = this._arrangeCellIdx2(subcells, mergecell._rowspan);
                }
            }

            for (var i = (mergecell._col + mergecell._colspan) ; i < colsize; i++)
            {
					cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
					cellobj.celltype = bandtype;
                cellobj._col = i;
					cellobj._colspan = 1;
					cellobj._row = insertidx;
					cellobj._rowspan = 1;
                cellobj._endcol = ((i + 1) == this.endbodycol);
					this[addfunc](cellobj);
					cellsize++;
				}
        }
        else
        {
            for (var i = 0; i < colsize; i++)
            {
                cellobj = new nexacro.GridCellInfo(bandtype + cellsize, bandobj, this.parent, bandtype, cellsize);
                cellobj.celltype = bandtype;
                cellobj._col = i;
                cellobj._colspan = 1;
                cellobj._row = insertidx;
                cellobj._rowspan = 1;
                cellobj._endcol = ((i + 1) == this.endbodycol);
                this[addfunc](cellobj);
                cellsize++;
            }
        }
        this._arrangeCellIdx(bandtype);
        this._updateFormatStr();
        return insertidx;
    };

    _pGridFormat.insertContentsRow = function (strBand, nSubRowIndex, bBandIndex)
    {
        var bandtype = "";

        if (bBandIndex == undefined)
            bBandIndex = true;

        if (strBand != undefined)
        {
            var bandidx = parseInt(strBand, 10);
            if (isFinite(bandidx))
            {
                if (bandidx == -1)
                    bandtype = "head";
                else if (bandidx == -2)
                    bandtype = "summ";
                else if (bandidx >= 0)
                    bandtype = "body";
            }
            else if (strBand.length)
            {
                bandtype = strBand.toLowerCase();
            }

            if (bandtype == "")
                return -1;
        }

        var row = -1;

        if (nSubRowIndex < 0)
            return -1;

        if (bandtype == "head")
        {
            if (this._headband == null)
                this._headband = new nexacro.GridBandInfo("head", "head", this, this.parent);

            var bandobj = this._headband;
            var bandcells = this._headcells;
            var bandrows = this._headrows;
            var rowfunc = "_insertHeadRow";
            var addfunc = "_addHeadCell";

            if (nSubRowIndex > bandrows.length)
                nSubRowIndex = bandrows.length;

            row = this._insertContentsRow("head", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband == null)
                this._summband = new nexacro.GridBandInfo("summary", "summ", this, this.parent);

            var bandobj = this._summband;
            var bandcells = this._summcells;
            var bandrows = this._summrows;
            var rowfunc = "_insertSummRow";
            var addfunc = "_addSummCell";

            if (nSubRowIndex > bandrows.length)
                nSubRowIndex = bandrows.length;

            row = this._insertContentsRow("summary", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
        }
        else
        {
            if (this._bodyband == null)
                this._bodyband = new nexacro.GridBandInfo("body", "body", this, this.parent);

            var bandobj = this._bodyband;
            var bandcells = this._bodycells;
            var bandrows = this._bodyrows;
            var rowfunc = "_insertBodyRow";
            var addfunc = "_addBodyCell";

            if (nSubRowIndex > bandrows.length)
                nSubRowIndex = bandrows.length;

            row = this._insertContentsRow("body", bandobj, bandcells, bandrows, rowfunc, addfunc, nSubRowIndex);
        }

        return row;
    };

    _pGridFormat._deleteColCell = function (col)
    {
        var hcells = this._headcells;
        var scells = this._summcells;
        var bcells = this._bodycells;
        var endcol = (this._cols) ? (this._cols.length - 1) : -1;

        if (!hcells && !scells && !bcells)
        {
            return undefined;
        }

        var delproc = function (cells, col)
        {
            if (!cells) return;

            for (var i = 0; i < cells.length; i++)
            {
                if (cells[i]._col == endcol)
                    cells[i]._endcol = true;
                else
                    cells[i]._endcol = false;

                if (cells[i]._col == col)
                {
                    var colspan = cells[i]._colspan;
                    var rowspan = cells[i]._rowspan;

                    if (colspan == 1)
                    {
                        delete cells[i];
                        cells.splice(i, 1);
                        for (var j = i; j < cells.length; j++)
                        {
                            cells[j]._cellidx--;
                        }
                        i--;
                    } else
                    {
                        var col = cells[i]._col;
                        cells[i]._colspan--;

                        delproc(cells[i]._subcells, 0);
                    }
                }
                else if (cells[i]._col > col)
                {
                    cells[i]._col--;
                }
                else
                {
                    if ((cells[i]._col + cells[i]._colspan - 1) >= col)
                    {
                        cells[i]._colspan--;

                        var idx = col - cells[i]._col;
                        delproc(cells[i]._subcells, idx);
                    }
                }
            }
        };

        delproc(hcells, col);
        delproc(scells, col);
        delproc(bcells, col);
    };

    _pGridFormat._deleteColumn = function (area, col)
    {
        var cols = this._cols;

        if (cols == null || cols.length == 0 || cols.length <= col)
            return -1;

        if (cols[col]._area != area)
            return -1;

        this._deleteColCell(col);
        var size = cols[col].size;
        cols.splice(col, 1);

        var colsLen = cols.length;

        if (area == "left")
        {
            for (var i = col; i < colsLen; i++)
            {
                if (cols[i]._area == "left")
                {
                    cols[i].left -= size;
                    cols[i].right -= size;
                }
            }
            this.leftWidth -= size;
        }
        else if (area == "right")
        {
            for (var i = col; i < colsLen; i++)
            {
                if (cols[i]._area == "right")
                {
                    cols[i].left -= size;
                    cols[i].right -= size;
                }
            }
            this.rightWidth -= size;
        }
        else
        {
            for (var i = col; i < colsLen; i++)
            {
                if (cols[i]._area == "body")
                {
                    cols[i].left -= size;
                    cols[i].right -= size;
                }
            }
            this.bodyWidth -= size;
            this._bodyWidth = this.bodyWidth;
            this.endbodycol = this._cols.length;
        }
        this._updateFormatStr();
        return col;
    };

    _pGridFormat._getColFixCnt = function (area)
    {
        var leftcnt = 0;
        var bodycnt = 0;
        var rightcnt = 0;
        var _cols = this._cols;
        var _colsLen = _cols.length;

        for (var i = 0; i < _colsLen; i++)
        {
            if (_cols[i]._area == "left")
                leftcnt++;
            else if (_cols[i]._area == "body")
                bodycnt++;
            else if (_cols[i]._area == "right")
                rightcnt++;
        }
        if (area == "left")
            return leftcnt;
        else if (area == "right")
            return rightcnt;
        else
            return bodycnt;
    };

    _pGridFormat.deleteContentsCol = function (strBand, nColIndex, bBandIndex)
    {
        if (bBandIndex == undefined)
            bBandIndex = false;

        var areatype = "body";
        if (strBand != undefined)
        {
            var areaidx = parseInt(strBand, 10);
            if (isFinite(areaidx))
            {
                if (nColIndex != undefined)
                {
                    if (areaidx == -1)
                        areatype = "left";
                    else if (areaidx == -2)
                        areatype = "right";
                    else
                        areatype = "body";

                    if (nColIndex < 0)
                        return -1;
                    else if (nColIndex > this._cols.length)
                        return -1;
                }
                else
                {
                    if (areaidx < 0)
                        return -1;
                    else if (areaidx > this._cols.length)
                        return -1;

                    nColIndex = areaidx;
                }
            }
            else if (strBand.length)
            {
                areatype = strBand.toLowerCase();
                if (nColIndex == undefined)
                    return -1;
            }
        }

        if (bBandIndex == true)
        {
            if (areatype == "body")
            {
                nColIndex += this._getColFixCnt("left");
            }
            else if (areatype == "right")
            {
                nColIndex += this._getColFixCnt("left");
                nColIndex += this._getColFixCnt("body");
            }
        }
        else
        {
            var lcnt = this._getColFixCnt("left");
            var bcnt = this._getColFixCnt("body");
            var rcnt = this._getColFixCnt("right");

            if (nColIndex < lcnt)
                areatype = "left";
            else if (nColIndex >= lcnt + bcnt && nColIndex < lcnt + bcnt + rcnt)
                areatype = "right";
            else
                areatype = "body";
        }

        if (this._cols.length <= nColIndex || nColIndex < 0)
            return -1;

        var retn = this._deleteColumn(areatype, nColIndex);
        this._rearrangeCols();
        return retn;
    };

    _pGridFormat.mergeContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell)
    {
        var bandtype = strBand.toLowerCase();
        if (bandtype != "head" && bandtype != "summ")
        {
            if (bandtype == "summary")
                bandtype = "summ";
            else
                bandtype = "body";
        }

        var startRow = parseInt(nStartRow, 10);
        var startCol = parseInt(nStartCol, 10);
        var endRow = parseInt(nEndRow, 10);
        var endCol = parseInt(nEndCol, 10);
        var firstCell = parseInt(nFirstCell, 10);

        if (!isFinite(startRow) || !isFinite(startCol) || !isFinite(endRow) || !isFinite(endCol))
        {
            return -1;
        }
        if (startCol > endCol || startRow > endRow)
        {
            return -1;
        }
        var colCount = this._cols.length;
        if (startCol < 0 || startCol >= colCount || endCol < 0 || endCol >= colCount)
        {
            return -1;
        }
        var bandrows = null;
        var bandcells = null;
        if (bandtype == "head")
        {
            bandrows = this._headrows;
            bandcells = this._headcells;
        }
        else if (bandtype == "summ")
        {
            bandrows = this._summrows;
            bandcells = this._summcells;
        }
        else
        {
            bandrows = this._bodyrows;
            bandcells = this._bodycells;
        }
        var cellCount = (bandcells) ? bandcells.length : 0;
        var rowCount = (bandrows) ? bandrows.length : 0;
        if (cellCount == 0)
        {
            return -1;
        }
        if (startRow < 0 || startRow >= rowCount || endRow < 0 || endRow >= rowCount)
        {
            return -1;
        }

        var area;
        var merged_check = -1;
        var merged_matrix = [];
        for (var i = 0; i < cellCount; i++)
        {
            var cell = bandcells[i];
            if ((cell._row >= startRow && cell._row <= endRow) && (cell._col >= startCol && cell._col <= endCol))
            {
                // 2개이상의 band를 포함한 영역은 merge 되지 않음(단일 band)
                if (area && area != bandcells[i]._area)
                {
                    return -1;
                }
                else
                {
                    area = bandcells[i]._area;
                }
                merged_matrix[i] = true;
                if (cell._rowspan > 1 || cell._colspan > 1)
                {
                    merged_check = i;
                }
            }
            else
            {
                merged_matrix[i] = false;
            }
        }

        if (merged_check >= 0 && bandcells[merged_check]._rowspan > endRow && bandcells[merged_check]._colspan > endCol)
        {
            return -1;
        }

        if (!firstCell || firstCell < 0)
            firstCell = 0;

        var cellidx = -1;
        var first = bandcells[firstCell]; // for keepsubcell == false
        var subcells = [];
        for (var i = cellCount - 1; i >= 0; i--)
        {
            var cell = bandcells[i];
            var row = cell._row;
            var col = cell._col;

            if (merged_matrix[i])
            {
                if (first._row < startRow || first._row > endRow || first._col < startCol || first._col > endCol)
                {
                    return -1;
                }

                if (bKeepSubCell)
                {
                    if (bandcells[i]._col == startCol && bandcells[i]._row == startRow)
                    {
                        // make parent merge cell
                        var cellinfo = new nexacro.GridCellInfo(bandcells[i].id, bandcells[i].parent, bandcells[i]._grid, bandcells[i].celltype, bandcells[i]._cellidx);
                        cellinfo._row = bandcells[i]._row;
                        cellinfo._rowspan = (endRow - startRow) + 1;
                        cellinfo._col = bandcells[i]._col;
                        cellinfo._colspan = (endCol - startCol) + 1;
                        cellinfo._isSubCell = false;
                        cellinfo._area = bandcells[i]._area;
                        cellinfo._endcol = bandcells[i]._endcol;

                        // insert FirstCell
                        subcells.unshift(bandcells[i]);

                        for (var j = 0; j < subcells.length; j++)
                        {
                            subcells[j]._col -= cellinfo._col;
                            subcells[j]._row -= cellinfo._row;
                            subcells[j]._cellidx = j;
                            subcells[j]._isSubCell = true;
                            subcells[j]._id = subcells[j].name = bandcells[i].id + "_sub" + j;
                        }

                        // insert bandcells & initialize subcells
                        cellinfo._subcells = subcells;
                        bandcells[i] = cellinfo;
                        subcells = [];
                        cellidx = i;
                    }
                    else
                    {
                        // current cell make by subcells
                        subcells.unshift(bandcells[i]);

                        // current cell is delete after make subcells
                        bandcells.splice(i, 1);
                    }
                }
                else
                {
                    if (bandcells[i]._col == startCol && bandcells[i]._row == startRow)
                    {
                        cellidx = bandcells[i]._cellidx;
                        first._row = bandcells[i]._row;
                        first._col = bandcells[i]._col;
                        first._rowspan = (endRow - startRow) + 1;
                        first._colspan = (endCol - startCol) + 1;
                        bandcells[i] = first;
                    }
                    else
                    {
                        bandcells.splice(i, 1);
                    }
                }
            }
        }

        var bandcellsLen = bandcells.length;
        for (var i = 0; i < bandcellsLen; i++)
        {
            bandcells[i]._cellidx = i;
        }

        return cellidx;
    };

    _pGridFormat.splitContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell)
    {
        var band_rows = null;
        var band_cells = null;
        var band_cols = this._cols;
        var band_type = strBand.toLowerCase();

        if (band_type == "head")
        {
            band_rows = this._headrows;
            band_cells = this._headcells;
        }
        else if (band_type == "summ")
        {
            band_rows = this._summrows;
            band_cells = this._summcells;
        }
        else
        {
            band_rows = this._bodyrows;
            band_cells = this._bodycells;
        }

        var row_count = (band_rows) ? band_rows.length : 0;
        var col_count = (band_cols) ? band_cols.length : 0;
        var cell_count = (band_cells) ? band_cells.length : 0;

        if (row_count > 0 && col_count > 0)
        {
            // 잘못 된 인자는 가까운 유효한 값으로 설정
            if (nStartRow < 0 || nEndRow >= row_count)
            {
                if (nStartRow < 0)
                {
                    nStartRow = 0;
                }
                else
                {
                    nEndRow = row_count - 1;
                }
            }
            if (nStartCol < 0 || nEndCol >= col_count)
            {
                if (nStartCol < 0)
                {
                    nStartCol = 0;
                }
                else
                {
                    nEndCol = col_count - 1;
                }
            }

            var matrix = [];
            var cell_idx = 0;
            var split_cell = 0;
            var subcells = null;
            var current_merge_col = null;
            var current_merge_row = null;

            for (var i = 0; i < cell_count; i++)
            {
                var row = band_cells[i]._row;
                var col = band_cells[i]._col;
                var area = band_cells[i]._area;

                subcells = band_cells[i]._subcells;
                current_merge_col = (band_cells[i]._colspan + band_cells[i]._col) - 1;
                current_merge_row = (band_cells[i]._rowspan + band_cells[i]._row) - 1;

                if (subcells.length > 0)
                {
                    if ((current_merge_col >= nStartCol && current_merge_col <= nEndCol) && (current_merge_row >= nStartRow && current_merge_row <= nEndRow))
                    {
                        for (var j = 0; j < subcells.length; j++)
                        {
                            split_cell++;

                            subcells[j]._row = row;
                            subcells[j]._col = col;
                            subcells[j]._area = area;
                            subcells[j]._cellidx = col + (col_count * row);

                            // subcell이 병합된 경우에도 변경없이 적용
                            var rowspan = subcells[j]._rowspan;
                            var colspan = subcells[j]._colspan;
                            if (col < band_cells[i]._col + (band_cells[i]._colspan - 1))
                            {
                                col = col + colspan;
                            }
                            else
                            {
                                row = row + rowspan;
                                col = band_cells[i]._col;
                            }
                            matrix.push(subcells[j]);
                        }
                    }
                    else // not split
                    {
                        band_cells[i]._cellidx = band_cells[i]._col + (band_cells[i]._row * col_count);
                        matrix.push(band_cells[i]);
                    }
                }
                else
                {
                    if (bMakeSubCell)
                    {
                        if ((current_merge_col >= nStartCol && current_merge_col <= nEndCol) && (current_merge_row >= nStartRow && current_merge_row <= nEndRow))
                        {
                            if ((band_cells[i]._rowspan * band_cells[i]._colspan) > 1)
                            {
                                var make_cell = null;
                                for (var j = 0; j < (band_cells[i]._rowspan * band_cells[i]._colspan) ; j++)
                                {
                                    split_cell++;
                                    make_cell = new nexacro.GridCellInfo(band_type + cell_idx, band_cells[i].parent, band_cells[i]._grid, band_cells[i].celltype, cell_idx);

                                    make_cell._row = row;
                                    make_cell._col = col;
                                    make_cell._area = area;
                                    make_cell._rowspan = 1;
                                    make_cell._colspan = 1;
                                    make_cell._cellidx = col + (col_count * row);
                                    make_cell.text = band_cells[i].text;

                                    if (col < band_cells[i]._col + (band_cells[i]._colspan - 1))
                                    {
                                        col++;
                                    }
                                    else
                                    {
                                        row++;
                                        col = band_cells[i]._col;
                                    }
                                    matrix.push(make_cell);
                                }
                            }
                            else //not split
                            {
                                matrix.push(band_cells[i]);
                            }
                        }
                        else //not split
                        {
                            matrix.push(band_cells[i]);
                        }
                    }
                    else // bMakeSubCell == false
                    {
                        matrix.push(band_cells[i]);
                    }
                }
            }

            // apply splitContentsCell
            if (split_cell > 0)
            {
                // cellindex sort
                matrix.sort(function (l, r) { return l._cellidx - r._cellidx; });

                // cellindex adjust
                for (var i = 0; i < matrix.length; i++)
                {
                    matrix[i]._cellidx = i;
                }

                if (band_type == "head")
                {
                    this._headcells = matrix;
                }
                else if (band_type == "summ")
                {
                    this._summcells = matrix;
                }
                else
                {
                    this._bodycells = matrix;
                }
                return split_cell;
            }
            // not splitContentsCell
        }
        return -1;
    };

    _pGridFormat.setBandProperty = function (strBand, strPropID, varValue)
    {
        var bandinfo = null;
        var bandtype = strBand.toLowerCase();

        if (bandtype == "head")
            bandinfo = this._headband;
        else if (bandtype == "summ" || bandtype == "summary")
            bandinfo = this._summband;
        else
            bandinfo = this._bodyband;

        if (bandinfo)
        {
            if (bandinfo["set_" + strPropID])
                bandinfo["set_" + strPropID](varValue);

            this._updateFormatStr();
            return bandinfo;
        }
        return undefined;
    };

    _pGridFormat.setSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID, varValue)
    {
        var cellinfo = null;
        var bandtype = strBand.toLowerCase();

        if (bandtype == "head")
        {
            if (this._headband)
                cellinfo = this._headcells[nCellIdx];
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband)
                cellinfo = this._summcells[nCellIdx];
        }
        else
        {
            if (this._bodyband)
                cellinfo = this._bodycells[nCellIdx];
        }

        if (cellinfo._subcells.length > nSubCellIdx && nSubCellIdx >= 0)
        {
            cellinfo = cellinfo._subcells[nSubCellIdx];

            if (cellinfo)
            {
                if (cellinfo["set_" + strPropID])
                    cellinfo["set_" + strPropID](varValue);

                this._updateFormatStr();
                return cellinfo;
            }
        }
    };

    _pGridFormat.setCellProperty = function (strBand, nCellIdx, strPropID, varValue)
    {
        var cellinfo = null;
        var bandtype = strBand.toLowerCase();

        if (bandtype == "head")
        {
            if (this._headband)
                cellinfo = this._headcells[nCellIdx];
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband)
                cellinfo = this._summcells[nCellIdx];
        }
        else
        {
            if (this._bodyband)
                cellinfo = this._bodycells[nCellIdx];
        }

        if (cellinfo)
        {
            if (cellinfo["set_" + strPropID])
                cellinfo["set_" + strPropID](varValue);

            this._updateFormatStr();
            return cellinfo;
        }
    };

    _pGridFormat.getSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID)
    {
        var cellinfo = null;
        var bandtype = strBand.toLowerCase();

        if (bandtype == "head")
        {
            if (this._headband)
                cellinfo = this._headcells[nCellIdx];
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband)
                cellinfo = this._summcells[nCellIdx];
        }
        else
        {
            if (this._bodyband)
                cellinfo = this._bodycells[nCellIdx];
        }

        if (cellinfo._subcells.length > nSubCellIdx && nSubCellIdx >= 0)
        {
            cellinfo = cellinfo._subcells[nSubCellIdx];

            if (cellinfo)
            {
                var prop = cellinfo[strPropID];
                if (prop == undefined)
                    prop = cellinfo["_" + strPropID];

                if (prop != undefined)
                {
                    var type = typeof (prop);

                    if (type == "number" || type == "string")
                    {
                        return prop;
                    }
                    else
                    {
                        var val;

                        if (strPropID == "expr")
                        {
                            val = prop._bindexpr;
                        }
                        else
                        {
                            if (prop._bindtype == 2)
                            {
                                val = prop._bindexpr;
                                if (val.indexOf("expr:") < 0)
                                    val = "expr:" + val;
                            }
                            else
                            {
                                val = prop._value;
                            }
                        }

                        if (val)
                            return val;
                        else
                            return prop;
                    }
                }
            }
        }
        return undefined;
    };

    _pGridFormat.getCellProperty = function (strBand, nCellIdx, strPropID)
    {
        var cellinfo = null;
        var bandtype = strBand.toLowerCase();
        if (bandtype == "head")
        {
            if (this._headband)
                cellinfo = this._headcells[nCellIdx];
        }
        else if (bandtype == "summ" || bandtype == "summary")
        {
            if (this._summband)
                cellinfo = this._summcells[nCellIdx];
        }
        else
        {
            if (this._bodyband)
                cellinfo = this._bodycells[nCellIdx];
        }

        if (cellinfo)
        {
            if (strPropID == "subcell")
                return cellinfo._subcells.length;

            var prop = cellinfo[strPropID];
            if (prop == undefined)
                prop = cellinfo["_" + strPropID];

            if (prop != undefined)
            {
                var type = typeof (prop);

                if (type == "number" || type == "string")
                {
                    return prop;
                }
                else
                {
                    var val;

                    if (prop instanceof nexacro.BindableValue)
                    {
                        if (strPropID == "expr")
                        {
                            val = prop._bindexpr;
                        }
                        else
                        {
                            if (prop._bindtype == 2)
                            {
                                val = prop._bindexpr;
                                if (val.indexOf("expr:") < 0)
                                    val = "expr:" + val;
                            }
                            else
                            {
                                val = prop._value;
                            }
                        }
                    }
                    else
                    {
                        val = prop;
                    }

                    return val;
                }
            }
        }
        return null;
    };

    _pGridFormat.getBandProperty = function (strBand, strPropID)
    {
        var bandinfo = null;
        var bandtype = strBand.toLowerCase();

        if (bandtype == "head")
            bandinfo = this._headband;
        else if (bandtype == "summ" || bandtype == "summary")
            bandinfo = this._summband;
        else
            bandinfo = this._bodyband;

        if (bandinfo)
        {
            var prop = bandinfo[strPropID];
            if (prop == undefined)
                prop = bandinfo["_" + strPropID];

            if (prop != undefined)
            {
                var type = typeof (prop);

                if (type == "number" || type == "string")
                {
                    return prop;
                }
                else
                {
                    var val;

                    if (strPropID == "expr")
                        val = prop._bindexpr;
                    else
                        val = prop._value;

                    if (val)
                        return val;
                    else
                        return prop;
                }
            }
        }
        return null;
    };

    _pGridFormat._adjustFormatColSize = function (is_change_area, no_update_xml)
    {
        var len = this._cols.length;
        var leftOffset = 0;
        var bodyOffset = 0;
        var rightOffset = 0;
        var col = null;

        for (var i = 0; i < len; i++)
        {
            col = this._cols[i];
            if (col._area == "left")
            {
                col.left = leftOffset;
                leftOffset += col.size;
                col.right = leftOffset;
            }
            else if (col._area == "right")
            {
                col.left = rightOffset;
                rightOffset += col.size;
                col.right = rightOffset;
            }
            else
            {
                col.left = bodyOffset;
                bodyOffset += col.size;
                col.right = bodyOffset;
            }
            // area 변경시 org 값도 수정되야함
            if (is_change_area)
            {
                col.orgleft = col.left;
                col.orgright = col.right;
            }
        }
        this.leftWidth = leftOffset;
        this._bodyWidth = this.bodyWidth = bodyOffset;
        this.rightWidth = rightOffset;

        if (!no_update_xml)
        this._updateFormatStr();
    };

    _pGridFormat._setColSize = function (nColIdx, nValue, noUpdate)
    {
        if (this._cols)
        {
            var column = this._cols[nColIdx];
            var size = parseFloat(nValue, 10);

            if (column && isFinite(size))
            {
                var oldSize = column.size;

                if (size != oldSize)
                {
                    column.size = size;
                    this._adjustFormatColSize(false, noUpdate);

                    return true;
                }
                return false;
            }
        }
    };

    _pGridFormat.setFormatColProperty = function (nColIdx, strPropID, nValue)
    {
        if (this._cols)
        {
            if (strPropID == "size")
            {
                var column = this._cols[nColIdx];
                var size = parseInt(nValue, 10);
                if (column && isFinite(size))
                {
                    var oldSize = column.size;
                    if (size != oldSize)
                    {
                        //format size를 변경한 것이기 때문에 orgsize도 동일하게 설정
                        column.size = column.orgsize = size;
                        this._adjustFormatColSize();
                        return true;
                    }
                    return false;
                }
            }
            else if (strPropID == "band")
            {
                var val = nValue.toLowerCase();
                var _cols = this._cols;
                var _colsLen = this._cols.length;
                var col, change = false;

                for (var i = 0; i < this._cols.length; i++)
                {
                    col = _cols[i];
                    if (val == "left")
                    {
                        if (i <= nColIdx && col._area != "left")
                        {
                            col._area = "left";
                            change = true;
                        }
                    }
                    else if (val == "right")
                    {
                        if (i >= nColIdx && col._area != "right")
                        {
                            col._area = "right";
                            change = true;
                        }
                    }
                    else
                    {
                        if ((i >= nColIdx && col._area == "left") || (i <= nColIdx && col._area == "right"))
                        {
                            col._area = "body";
                            change = true;
                        }
                    }
                }

                function _apply_area(cells)
                {
                    if (cells)
                    {
                        var cellsLen = cells.length;
                        var cellinfo;

                        for (var i = 0; i < cellsLen; i++)
                        {
                            cellinfo = cells[i];
                            if (val == "left")
                            {
                                if (cellinfo._col <= nColIdx)
                                    cellinfo._area = "left";
                            }
                            else if (val == "right")
                            {
                                if (cellinfo._col >= nColIdx)
                                    cellinfo._area = "right";
                            }
                            else
                            {
                                if ((cellinfo._col >= nColIdx && cellinfo._area == "left") || (cellinfo._col <= nColIdx && cellinfo._area == "right"))
                                    cellinfo._area = "body";
                            }
                        }
                    }
                }
                if (change)
                {
                    _apply_area(this._headcells);
                    _apply_area(this._bodycells);
                    _apply_area(this._summcells);
                    this._adjustFormatColSize(true);
                }
                return change;
            }
        }
        return false;
    };

    _pGridFormat.getFormatColProperty = function (nColIdx, strPropID)
    {
        if (this._cols)
        {
            if (strPropID == "size")
            {
                var column = this._cols[nColIdx];
                if (column)
                    return column.orgsize;
            }
            else if (strPropID == "band")
            {
                var column = this._cols[nColIdx];
                if (column)
                    return column._area;
            }
            else if (strPropID == "fix")
            {
                var column = this._cols[nColIdx];
                if (column)
                {
                    if (column._area == "left" || column._area == "right")
                        return "fixed";
                    else
                        return "";
                }
            }
        }
        return null;
    };

    _pGridFormat._adjustFormatRowSize = function (rows)
    {
        var len = rows.length;
        var bodyOffset = 0;
        var row = null;
        for (var i = 0; i < len; i++)
        {
            row = rows[i];
            row.top = bodyOffset;
            bodyOffset += row.size;
            row.bottom = bodyOffset;
        }
        return bodyOffset;
    };

    _pGridFormat.setFormatRowProperty = function (nRowIdx, strPropID, nValue)
    {
        if (strPropID == "size")
        {
            var size = parseInt(nValue, 10);
            if (isFinite(size))
            {
                var idx = nRowIdx;
                var headCount = (this._headrows) ? this._headrows.length : 0;

                if (idx < headCount)
                {
                    this._headrows[idx].size = size;
                    var height = this.headHeight;
                    this.headHeight = this._adjustFormatRowSize(this._headrows);

                    if (this.headHeight != height)
                        return true;

                    return false;
                }
                else
                {
                    idx -= headCount;
                }

                var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

                if (idx < bodyCount)
                {
                    this._bodyrows[idx].size = size;
                    var height = this.bodyHeight;
                    this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);

                    if (this.bodyHeight != height)
                        return true;

                    return false;
                }
                else
                {
                    idx -= bodyCount;
                }

                var summCount = (this._summrows) ? this._summrows.length : 0;

                if (idx < summCount)
                {
                    this._summrows[idx].size = size;
                    var height = this.summHeight;
                    this.summHeight = this._adjustFormatRowSize(this._summrows);

                    if (this.summHeight != height)
                        return true;

                    return false;
                }
            }
        }
        else if (strPropID == "band")
        {
            var idx = nRowIdx;
            var val = nValue.toLowerCase();

            return false;	// todo

            var headCount = (this._headrows) ? this._headrows.length : 0;
            if (idx < headCount)
            {
                var row = this._headrows[idx];

                if (val == "body")
                {
                    this._bodyrows.push(row);
                    this._headrows.splice(idx, 1);

                    this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
                    this.headHeight = this._adjustFormatRowSize(this._headrows);
                    return true;

                }
                else if (val == "summ" || val == "summary")
                {
                    this._summrows.push(row);
                    this._headrows.splice(idx, 1);

                    this.summHeight = this._adjustFormatRowSize(this._summrows);
                    this.headHeight = this._adjustFormatRowSize(this._headrows);
                    return true;
                }
            }
            else
            {
                idx -= headCount;
            }

            var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

            if (idx < bodyCount)
            {
                var row = this._bodyrows[idx];

                if (val == "head")
                {
                    this._headrows.push(row);
                    this._bodyrows.splice(idx, 1);

                    this.headHeight = this._adjustFormatRowSize(this._headrows);
                    this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
                    return true;
                }
                else if (val == "summ" || val == "summary")
                {
                    this._summrows.push(row);
                    this._bodyrows.splice(idx, 1);

                    this.summHeight = this._adjustFormatRowSize(this._summrows);
                    this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
                    return true;
                }
            }
            else
            {
                idx -= bodyCount;
            }
            var summCount = (this._summrows) ? this._summrows.length : 0;

            if (idx < summCount)
            {
                var row = this._summrows[idx];

                if (val == "head")
                {
                    this._headrows.push(row);
                    this._summrows.splice(idx, 1);

                    this.headHeight = this._adjustFormatRowSize(this._headrows);
                    this.summHeight = this._adjustFormatRowSize(this._summrows);
                    return true;
                }
                else if (val == "body")
                {
                    this._bodyrows.push(row);
                    this._summrows.splice(idx, 1);

                    this._body_height = this.bodyHeight = this._adjustFormatRowSize(this._bodyrows);
                    this.summHeight = this._adjustFormatRowSize(this._summrows);
                    return true;
                }
            }
        }
        return false;
    };

    _pGridFormat.getFormatRowProperty = function (nRowIdx, strPropID)
    {
        if (strPropID == "size")
        {
            var idx = nRowIdx;
            var headCount = (this._headrows) ? this._headrows.length : 0;

            if (idx < headCount)
                return this._headrows[idx].orgsize;
            else
                idx -= headCount;

            var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

            if (idx < bodyCount)
                return this._bodyrows[idx].orgsize;
            else
                idx -= bodyCount;

            var summCount = (this._summrows) ? this._summrows.length : 0;

            if (idx < summCount)
                return this._summrows[idx].orgsize;

        }
        else if (strPropID == "band")
        {
            var idx = nRowIdx;
            var headCount = (this._headrows) ? this._headrows.length : 0;

            if (idx < headCount)
                return "head";
            else
                idx -= headCount;

            var bodyCount = (this._bodyrows) ? this._bodyrows.length : 0;

            if (idx < bodyCount)
                return "body";
            else
                idx -= bodyCount;

            var summCount = (this._summrows) ? this._summrows.length : 0;

            if (idx < summCount)
                return "summ";
        }
        return null;
    };
    delete _pGridFormat;
};