//CSS=TopFrame.css
    
(function() {
  return function() {
    var obj;   
    
    obj = new nexacro.Style_accessibility("","true","all","","","");
    this._addCss("Button.btn_TF_LeftMenuOpen", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "accessibility", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_TF_Open_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuOpen", "background", obj, ["normal"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Button.btn_TF_LeftMenuOpen", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Button.btn_TF_LeftMenuOpen", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "bordertype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#555555");
    this._addCss("Button.btn_TF_LeftMenuOpen", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_value("hand");
    this._addCss("Button.btn_TF_LeftMenuOpen", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Button.btn_TF_LeftMenuOpen", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "gradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "opacity", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "padding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_shadow("");
    this._addCss("Button.btn_TF_LeftMenuOpen", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_LeftMenuClose", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Logout", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_TF_Admin", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "shadow", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_TF_Open_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuOpen", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("","img::btn_TF_Open_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuOpen", "background", obj, ["pushed"]);

    obj = new nexacro.Style_background("","img::btn_TF_Open_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuOpen", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","img::btn_TF_Close_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuClose", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::btn_TF_Close_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuClose", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("","img::btn_TF_Close_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuClose", "background", obj, ["pushed"]);

    obj = new nexacro.Style_background("","img::btn_TF_Close_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_TF_LeftMenuClose", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("#0077dbff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Logout", "background", obj, ["normal"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Button.btn_TF_Logout", "color", obj, ["normal", "mouseover", "focused", "selected"]);

    obj = new nexacro.Style_font("8 Tahoma, Dotum");
    this._addCss("Button.btn_TF_Logout", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_TF_Admin", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_background("#0096e4ff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Logout", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("#005fbaff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Logout", "background", obj, ["pushed"]);

    obj = new nexacro.Style_color("#bacbd9");
    this._addCss("Button.btn_TF_Logout", "color", obj, ["pushed"]);

    obj = new nexacro.Style_background("#9d9d9dff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Logout", "background", obj, ["disabled"]);
    this._addCss("Button.btn_TF_Admin", "background", obj, ["disabled"]);

    obj = new nexacro.Style_color("#d3d3d3");
    this._addCss("Button.btn_TF_Logout", "color", obj, ["disabled"]);

    obj = new nexacro.Style_background("#0068bfff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Admin", "background", obj, ["normal"]);

    obj = new nexacro.Style_color("#bcddf9");
    this._addCss("Button.btn_TF_Admin", "color", obj, ["normal", "mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("#0083d0ff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Admin", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("#0053a2ff","img::btn_TF_Logout.png","repeat-x","0","0","0","0","true");
    this._addCss("Button.btn_TF_Admin", "background", obj, ["pushed"]);

    obj = new nexacro.Style_color("#89b0d4");
    this._addCss("Button.btn_TF_Admin", "color", obj, ["pushed"]);

    obj = new nexacro.Style_color("#cfcfcf");
    this._addCss("Button.btn_TF_Admin", "color", obj, ["disabled"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Static.sta_TF_Admin", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "align", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::sta_TF_Admin.png","","0","0","0","50","true");
    this._addCss("Static.sta_TF_Admin", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#000000");
    this._addCss("Static.sta_TF_Admin", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Static.sta_TF_Admin", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "cursor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "cursor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("bold 9 Gulim");
    this._addCss("Static.sta_TF_Admin", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Static.sta_TF_Admin", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "linespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("2 0 0 25");
    this._addCss("Static.sta_TF_Admin", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#e2e2e2ff","","","0","0","0","0","true");
    this._addCss("Static.sta_TF_TopBg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","0","none","","","1","solid","#ffffffff","","0","none","","");
    this._addCss("Static.sta_TF_TopBg", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_TF_TopBg2", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#0068bfff","","","0","0","0","0","true");
    this._addCss("Static.sta_TF_TopBg2", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = null;
    
//[add theme images]
  };
})();
