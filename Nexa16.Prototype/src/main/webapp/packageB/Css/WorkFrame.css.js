//CSS=WorkFrame.css
    
(function() {
  return function() {
    var obj;   
    
    obj = new nexacro.Style_accessibility("","true","all","","","");
    this._addCss("Button.btn_WF_CRUD", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Search", "accessibility", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_SearchSmall", "accessibility", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "accessibility", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "accessibility", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "accessibility", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "accessibility", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "accessibility", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_Title", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "accessibility", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("center middle");
    this._addCss("Button.btn_WF_CRUD", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "align", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "align", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "align", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "align", obj, ["normal"]);

    obj = new nexacro.Style_background("@gradation","","","0","0","0","0","true");
    this._addCss("Button.btn_WF_CRUD", "background", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Search", "background", obj, ["mouseover", "selected", "focused", "pushed"]);
    this._addCss("Button.btn_WF_SearchSmall", "background", obj, ["mouseover", "selected", "focused", "pushed"]);
    this._addCss("Button.btn_WF_ShuttleL", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "background", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#9e9e9eff","");
    this._addCss("Button.btn_WF_CRUD", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed"]);

    obj = new nexacro.Style_bordertype("round","3","3","true","true","true","true");
    this._addCss("Button.btn_WF_CRUD", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Search", "bordertype", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_color("#444444");
    this._addCss("Button.btn_WF_CRUD", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_value("hand");
    this._addCss("Button.btn_WF_CRUD", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Search", "cursor", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_SearchSmall", "cursor", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "cursor", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Button.btn_WF_CRUD", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "font", obj, ["normal", "disabled"]);
    this._addCss("Button.btn_WF_Add", "font", obj, ["normal", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "font", obj, ["normal", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "font", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "font", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "font", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss(".Cellgrd_WF_sum01", "font", obj, ["normal"]);
    this._addCss(".Cellgrd_WF_sum02", "font", obj, ["normal"]);
    this._addCss(".Cellgrd_WF_sum03", "font", obj, ["normal"]);
    this._addCss("Static.sta_WF_SearchLabel", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("linear 0,0 #ffffff 1,100 #f9f9f9");
    this._addCss("Button.btn_WF_CRUD", "gradation", obj, ["normal", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_WF_CRUD", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_WF_CRUD", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_WF_CRUD", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed"]);
    this._addCss("Button.btn_WF_Search", "opacity", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_SearchSmall", "opacity", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "opacity", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "opacity", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "opacity", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "opacity", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "opacity", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "opacity", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("1 0 0 0");
    this._addCss("Button.btn_WF_CRUD", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "padding", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_shadow("outer 0,1 1 #00000019");
    this._addCss("Button.btn_WF_CRUD", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Search", "shadow", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);

    obj = new nexacro.Style_gradation("linear 0,0 #ffffff 0,100 #dfdfdf");
    this._addCss("Button.btn_WF_CRUD", "gradation", obj, ["mouseover", "focused", "selected"]);
    this._addCss("Button.btn_WF_SearchSmall", "gradation", obj, ["mouseover", "selected", "focused"]);

    obj = new nexacro.Style_gradation("linear 0,0 #dfdfdf 0,100 #ffffff");
    this._addCss("Button.btn_WF_CRUD", "gradation", obj, ["pushed"]);
    this._addCss("Button.btn_WF_SearchSmall", "gradation", obj, ["pushed"]);

    obj = new nexacro.Style_border("1","solid","#9e9e9eff","","1","solid","#9e9e9eff","","1","solid","#7a7a7aff","","1","solid","#9e9e9eff","");
    this._addCss("Button.btn_WF_CRUD", "border", obj, ["disabled"]);

    obj = new nexacro.Style_value("30%");
    this._addCss("Button.btn_WF_CRUD", "opacity", obj, ["disabled"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Button.btn_WF_Search", "align", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Add", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "align", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Static.sta_WF_Title", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "align", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#2c4898ff","","","0","0","0","0","true");
    this._addCss("Button.btn_WF_Search", "background", obj, ["normal"]);

    obj = new nexacro.Style_border("1","solid","#21367eff","");
    this._addCss("Button.btn_WF_Search", "border", obj, ["normal", "mouseover", "selected", "pushed"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Button.btn_WF_Search", "color", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);

    obj = new nexacro.Style_font("bold 9 Gulim");
    this._addCss("Button.btn_WF_Search", "font", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Button.btn_WF_Search", "gradation", obj, ["normal", "disabled"]);
    this._addCss("Button.btn_WF_SearchSmall", "gradation", obj, ["normal", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "gradation", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "gradation", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "gradation", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "gradation", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_Title", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "gradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_Search.png')");
    this._addCss("Button.btn_WF_Search", "image", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);

    obj = new nexacro.Style_align("lefttext middle");
    this._addCss("Button.btn_WF_Search", "imagealign", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);

    obj = new nexacro.Style_padding("0 7 0 7");
    this._addCss("Button.btn_WF_Search", "padding", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);

    obj = new nexacro.Style_gradation("linear 0,0 #2c4898 0,100 #213a80");
    this._addCss("Button.btn_WF_Search", "gradation", obj, ["mouseover", "selected", "focused"]);

    obj = new nexacro.Style_border("1","dotted","#777777ff","");
    this._addCss("Button.btn_WF_Search", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_SearchSmall", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_ShuttleL", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_ShuttleR", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_ShuttleT", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_ShuttleB", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Custom", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Add", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Delete", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Download", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Upload", "border", obj, ["focused"]);
    this._addCss("Button.btn_WF_Extend", "border", obj, ["focused"]);

    obj = new nexacro.Style_gradation("linear 0,0 #041e65 0,100 #213571");
    this._addCss("Button.btn_WF_Search", "gradation", obj, ["pushed"]);

    obj = new nexacro.Style_background("#92a0c8ff","","","0","0","0","0","true");
    this._addCss("Button.btn_WF_Search", "background", obj, ["disabled"]);

    obj = new nexacro.Style_border("1","solid","#8c97bbff","");
    this._addCss("Button.btn_WF_Search", "border", obj, ["disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_WF_SearchSmall", "align", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "align", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Button.btn_WF_SearchSmall", "background", obj, ["normal", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "background", obj, ["normal", "mouseover", "focused"]);
    this._addCss("Grid.grd_WF_Tree>#body", "background", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#bdbdbdff","");
    this._addCss("Button.btn_WF_SearchSmall", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "border", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Button.btn_WF_SearchSmall", "bordertype", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "bordertype", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "bordertype", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "bordertype", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_Title", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "bordertype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("");
    this._addCss("Button.btn_WF_SearchSmall", "color", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_font("");
    this._addCss("Button.btn_WF_SearchSmall", "font", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "font", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "font", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "font", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_SearchSmall.png')");
    this._addCss("Button.btn_WF_SearchSmall", "image", obj, ["normal", "mouseover", "selected", "focused", "pushed"]);

    obj = new nexacro.Style_align("center middle");
    this._addCss("Button.btn_WF_SearchSmall", "imagealign", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "imagealign", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Button.btn_WF_SearchSmall", "padding", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "padding", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "padding", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "padding", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "padding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "padding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_shadow("");
    this._addCss("Button.btn_WF_SearchSmall", "shadow", obj, ["normal", "mouseover", "selected", "focused", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleL", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Custom", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Add", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Download", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "shadow", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_SearchBg", "shadow", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "shadow", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "shadow", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "shadow", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "shadow", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_SearchSmall_D.png')");
    this._addCss("Button.btn_WF_SearchSmall", "image", obj, ["disabled"]);

    obj = new nexacro.Style_gradation("linear 0,0 #fefefe 0,100 #ecedec");
    this._addCss("Button.btn_WF_ShuttleL", "gradation", obj, ["normal", "mouseover", "selected", "focused"]);
    this._addCss("Button.btn_WF_ShuttleR", "gradation", obj, ["normal", "mouseover", "selected", "focused"]);
    this._addCss("Button.btn_WF_ShuttleT", "gradation", obj, ["normal", "mouseover", "selected", "focused"]);
    this._addCss("Button.btn_WF_ShuttleB", "gradation", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleL.png')");
    this._addCss("Button.btn_WF_ShuttleL", "image", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_gradation("linear 0,0 #dad9da 0,100 #fdfcfd");
    this._addCss("Button.btn_WF_ShuttleL", "gradation", obj, ["pushed"]);
    this._addCss("Button.btn_WF_ShuttleR", "gradation", obj, ["pushed"]);
    this._addCss("Button.btn_WF_ShuttleT", "gradation", obj, ["pushed"]);
    this._addCss("Button.btn_WF_ShuttleB", "gradation", obj, ["pushed"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleL_P.png')");
    this._addCss("Button.btn_WF_ShuttleL", "image", obj, ["pushed"]);

    obj = new nexacro.Style_gradation("linear 0,0 #ffffff 0,100 #ececed");
    this._addCss("Button.btn_WF_ShuttleL", "gradation", obj, ["disabled"]);
    this._addCss("Button.btn_WF_ShuttleR", "gradation", obj, ["disabled"]);
    this._addCss("Button.btn_WF_ShuttleT", "gradation", obj, ["disabled"]);
    this._addCss("Button.btn_WF_ShuttleB", "gradation", obj, ["disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleL_D.png')");
    this._addCss("Button.btn_WF_ShuttleL", "image", obj, ["disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleR.png')");
    this._addCss("Button.btn_WF_ShuttleR", "image", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleR_P.png')");
    this._addCss("Button.btn_WF_ShuttleR", "image", obj, ["pushed"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleR_D.png')");
    this._addCss("Button.btn_WF_ShuttleR", "image", obj, ["disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleT.png')");
    this._addCss("Button.btn_WF_ShuttleT", "image", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleT_P.png')");
    this._addCss("Button.btn_WF_ShuttleT", "image", obj, ["pushed"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleT_D.png')");
    this._addCss("Button.btn_WF_ShuttleT", "image", obj, ["disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleB.png')");
    this._addCss("Button.btn_WF_ShuttleB", "image", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleB_P.png')");
    this._addCss("Button.btn_WF_ShuttleB", "image", obj, ["pushed"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_ShuttleB_D.png')");
    this._addCss("Button.btn_WF_ShuttleB", "image", obj, ["disabled"]);

    obj = new nexacro.Style_background("","","","0","0","0","0","true");
    this._addCss("Button.btn_WF_Custom", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "background", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","1","solid","#c9c9c9ff","","0","none","","","0","none","","");
    this._addCss("Button.btn_WF_Custom", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Add", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_color("#555555");
    this._addCss("Button.btn_WF_Custom", "color", obj, ["normal"]);
    this._addCss("Button.btn_WF_Add", "color", obj, ["normal"]);
    this._addCss("Button.btn_WF_Delete", "color", obj, ["normal"]);
    this._addCss("Button.btn_WF_Download", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "color", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "color", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_color("#2c4898");
    this._addCss("Button.btn_WF_Custom", "color", obj, ["mouseover", "selected", "pushed", "focused"]);
    this._addCss("Button.btn_WF_Add", "color", obj, ["mouseover", "selected", "pushed", "focused"]);
    this._addCss("Button.btn_WF_Delete", "color", obj, ["mouseover", "selected", "pushed", "focused"]);

    obj = new nexacro.Style_font("underline 9 Gulim");
    this._addCss("Button.btn_WF_Custom", "font", obj, ["mouseover", "selected", "pushed", "focused"]);
    this._addCss("Button.btn_WF_Add", "font", obj, ["mouseover", "selected", "pushed"]);
    this._addCss("Button.btn_WF_Delete", "font", obj, ["mouseover", "selected", "pushed"]);

    obj = new nexacro.Style_color("#b5b5b5");
    this._addCss("Button.btn_WF_Custom", "color", obj, ["disabled"]);
    this._addCss("Button.btn_WF_Add", "color", obj, ["disabled"]);
    this._addCss("Button.btn_WF_Delete", "color", obj, ["disabled"]);

    obj = new nexacro.Style_background("","img::btn_WF_Add.png","","0","0","0","50","true");
    this._addCss("Button.btn_WF_Add", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 20");
    this._addCss("Button.btn_WF_Add", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Delete", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_WF_Delete.png","","0","0","0","50","true");
    this._addCss("Button.btn_WF_Delete", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Button.btn_WF_Delete", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "border", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree>#body", "border", obj, ["normal", "mouseover"]);
    this._addCss("Static.sta_WF_Title", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("@gradation","img::btn_WF_Download.png","","0","0","0","50","true");
    this._addCss("Button.btn_WF_Download", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#c2c2c2ff","");
    this._addCss("Button.btn_WF_Download", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "border", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_bordertype("round","3","3","true","false","true","false");
    this._addCss("Button.btn_WF_Download", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_gradation("linear 0,0 #ffffff 0,100 #f8f8f8");
    this._addCss("Button.btn_WF_Download", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Extend", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Downsize", "gradation", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_padding("1 0 0 25");
    this._addCss("Button.btn_WF_Download", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);
    this._addCss("Button.btn_WF_Upload", "padding", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_background("@gradation","img::btn_WF_Upload.png","","0","0","0","50","true");
    this._addCss("Button.btn_WF_Upload", "background", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_bordertype("round","3","3","false","true","false","true");
    this._addCss("Button.btn_WF_Upload", "bordertype", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_Extend.png')");
    this._addCss("Button.btn_WF_Extend", "image", obj, ["normal", "mouseover", "selected", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_value("URL('img::btn_WF_Downsize.png')");
    this._addCss("Button.btn_WF_Downsize", "image", obj, ["normal", "mouseover", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_background("#f2f7f8ff","","","0","0","0","0","true");
    this._addCss("Div.div_WF_SearchBg", "background", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#8daab4ff","");
    this._addCss("Div.div_WF_SearchBg", "border", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_color("#333333");
    this._addCss("Div.div_WF_SearchBg", "color", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "color", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "color", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "color", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Div.div_WF_SearchBg", "cursor", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "cursor", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Edit.edt_WF_Search", "cursor", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Grid.grd_WF_Tree", "cursor", obj, ["normal"]);
    this._addCss("Static.sta_WF_Title", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "cursor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Div.div_WF_SearchBg", "stepalign", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Div.div_WF_WFBg", "stepalign", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_background("#f7f7f7ff","","","0","0","0","0","true");
    this._addCss("Div.div_WF_WFBg", "background", obj, ["normal", "mouseover", "focused", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 9 0 9");
    this._addCss("Edit.edt_WF_Search", "padding", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_value("#3da2df");
    this._addCss("Edit.edt_WF_Search", "selectbackground", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Edit.edt_WF_Search", "selectcolor", obj, ["normal", "mouseover", "focused", "disabled"]);

    obj = new nexacro.Style_background("#f3f3f3ff","","","0","0","0","0","true");
    this._addCss("Edit.edt_WF_Search", "background", obj, ["disabled"]);

    obj = new nexacro.Style_border("1","solid","#a3a7b4ff","");
    this._addCss("Grid.grd_WF_Tree", "border", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "border", obj, ["disabled"]);

    obj = new nexacro.Style_border("");
    this._addCss("Grid.grd_WF_Tree", "line", obj, ["normal"]);

    obj = new nexacro.Style_border("");
    this._addCss("Grid.grd_WF_Tree", "selectline", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "selectline", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_WF_Tree", "selectlinetype", obj, ["normal"]);
    this._addCss("Grid.grd_WF_Tree>#body", "selectlinetype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::img_WF_TreeClose.png')");
    this._addCss("Grid.grd_WF_Tree", "treeclosebuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_WF_Tree", "treecollapseimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_WF_Tree", "treeexpandimage", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('img::img_WF_TreeItem.png')");
    this._addCss("Grid.grd_WF_Tree", "treeitemimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_WF_Tree", "treeitemmargin", obj, ["normal"]);

    obj = new nexacro.Style_line("0","","","");
    this._addCss("Grid.grd_WF_Tree", "treelinetype", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('img::img_WF_TreeOpen.png')");
    this._addCss("Grid.grd_WF_Tree", "treeopenbuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Grid.grd_WF_Tree>#body", "cellalign", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#f8f8f9ff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground", obj, ["normal"]);

    obj = new nexacro.Style_background("#f8f8f9ff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground2", obj, ["normal"]);

    obj = new nexacro.Style_color("#333333");
    this._addCss("Grid.grd_WF_Tree>#body", "cellcolor", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_color("#333333");
    this._addCss("Grid.grd_WF_Tree>#body", "cellcolor2", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Grid.grd_WF_Tree>#body", "cellfont", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_WF_Tree>#body", "cellgradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_WF_Tree>#body", "cellgradation2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#eaeaeaff","");
    this._addCss("Grid.grd_WF_Tree>#body", "cellline", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_WF_Tree>#body", "celllinespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("exhor");
    this._addCss("Grid.grd_WF_Tree>#body", "celllinetype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 14");
    this._addCss("Grid.grd_WF_Tree>#body", "cellpadding", obj, ["normal"]);

    obj = new nexacro.Style_value("#f1f1ee");
    this._addCss("Grid.grd_WF_Tree>#body", "selectbackground", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_WF_Tree>#body", "selectborder", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#333333");
    this._addCss("Grid.grd_WF_Tree>#body", "selectcolor", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_font("");
    this._addCss("Grid.grd_WF_Tree>#body", "selectfont", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_WF_Tree>#body", "selectgradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#fdfbddff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground", obj, ["mouseover"]);

    obj = new nexacro.Style_background("#fdfbddff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground2", obj, ["mouseover"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Grid.grd_WF_Tree>#body", "cellpadding", obj, ["mouseover", "disabled"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground", obj, ["disabled"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Grid.grd_WF_Tree>#body", "cellbackground2", obj, ["disabled"]);

    obj = new nexacro.Style_color("#969696");
    this._addCss("Grid.grd_WF_Tree>#body", "cellcolor", obj, ["disabled"]);

    obj = new nexacro.Style_color("#969696");
    this._addCss("Grid.grd_WF_Tree>#body", "cellcolor2", obj, ["disabled"]);

    obj = new nexacro.Style_value("#ffffff");
    this._addCss("Grid.grd_WF_Tree>#body", "selectbackground", obj, ["disabled"]);

    obj = new nexacro.Style_color("#969696");
    this._addCss("Grid.grd_WF_Tree>#body", "selectcolor", obj, ["disabled"]);

    obj = new nexacro.Style_background("#ffefd8ff","","","0","0","0","0","true");
    this._addCss(".Cellgrd_WF_sum01", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("#fefff2ff","","","0","0","0","0","true");
    this._addCss(".Cellgrd_WF_sum02", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("#faf1ffff","","","0","0","0","0","true");
    this._addCss(".Cellgrd_WF_sum03", "background", obj, ["normal"]);

    obj = new nexacro.Style_font("bold 10 Gulim");
    this._addCss("Static.sta_WF_Title", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Static.sta_WF_Title", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle1", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SubTitle2", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_SearchLabel", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel02", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLine", "linespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::img_WF_Subtitle1.png","","0","0","0","50","true");
    this._addCss("Static.sta_WF_SubTitle1", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 13");
    this._addCss("Static.sta_WF_SubTitle1", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::img_WF_Subtitle2.png","","0","0","0","50","true");
    this._addCss("Static.sta_WF_SubTitle2", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 10");
    this._addCss("Static.sta_WF_SubTitle2", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::sta_WF_SearchLabel.png","","0","0","0","50","true");
    this._addCss("Static.sta_WF_SearchLabel", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("4 0 0 9");
    this._addCss("Static.sta_WF_SearchLabel", "padding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_WF_DetailLabel01", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#c9c9c9ff","");
    this._addCss("Static.sta_WF_DetailLabel01", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("1","solid","#e1dfdfff","");
    this._addCss("Static.sta_WF_DetailLabel02", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#444444ff","","","0","0","0","0","true");
    this._addCss("Static.sta_WF_DetailLine", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = null;
    
//[add theme images]
  };
})();
