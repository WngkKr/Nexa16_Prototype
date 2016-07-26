//CSS=LeftFrame.css
    
(function() {
  return function() {
    var obj;   
    
    obj = new nexacro.Style_accessibility("","true","all","","","");
    this._addCss("Button.btn_LF_Menu", "accessibility", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "accessibility", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "accessibility", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "accessibility", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "accessibility", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Tree>#body", "accessibility", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "accessibility", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "accessibility", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_Logo", "accessibility", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "accessibility", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_LF_Menu", "align", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "align", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "align", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "align", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "align", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "align", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::btn_LF_Menu_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Menu", "background", obj, ["normal", "mouseover", "selected", "focused"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Button.btn_LF_Menu", "border", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "border", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "border", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "border", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "border", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "border", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "border", obj, ["normal"]);
    this._addCss("Static.sta_LF_Logo", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Button.btn_LF_Menu", "bordertype", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "bordertype", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "bordertype", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "bordertype", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Tree>#body", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "bordertype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_Logo", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "bordertype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#96a4b7");
    this._addCss("Button.btn_LF_Menu", "color", obj, ["normal", "mouseover", "pushed", "selected", "focused"]);

    obj = new nexacro.Style_value("hand");
    this._addCss("Button.btn_LF_Menu", "cursor", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "cursor", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "cursor", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Static.sta_LF_Logo", "cursor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("bold 10 Tahoma");
    this._addCss("Button.btn_LF_Menu", "font", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "font", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "font", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Button.btn_LF_Menu", "gradation", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "gradation", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "gradation", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "gradation", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "gradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Tree>#body", "gradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "gradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "gradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_Logo", "gradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "gradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_LF_Menu", "image", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "image", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "image", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Button.btn_LF_Menu", "imagealign", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "imagealign", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "imagealign", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Button.btn_LF_Menu", "opacity", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "opacity", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "opacity", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "opacity", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "opacity", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "opacity", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "opacity", obj, ["normal"]);
    this._addCss("Static.sta_LF_Logo", "opacity", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "opacity", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Button.btn_LF_Menu", "padding", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "padding", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "padding", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "padding", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "padding", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "padding", obj, ["normal"]);
    this._addCss("Static.sta_LF_Logo", "padding", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_shadow("");
    this._addCss("Button.btn_LF_Menu", "shadow", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_Menu_S", "shadow", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "shadow", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Edit.edt_LF_Search", "shadow", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "shadow", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "shadow", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "shadow", obj, ["normal"]);
    this._addCss("Static.sta_LF_Logo", "shadow", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "shadow", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_LF_Menu_S.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Menu", "background", obj, ["pushed"]);
    this._addCss("Button.btn_LF_Menu_S", "background", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_LF_Menu_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Menu", "background", obj, ["disabled"]);

    obj = new nexacro.Style_color("#4b5764");
    this._addCss("Button.btn_LF_Menu", "color", obj, ["disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Button.btn_LF_Menu_S", "color", obj, ["normal", "mouseover", "pushed", "selected", "focused", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuOpen", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_RecentMenuClose", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);
    this._addCss("Button.btn_LF_Search", "color", obj, ["normal", "mouseover", "focused", "selected", "pushed", "disabled"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuOpen_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuOpen", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuOpen_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuOpen", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuOpen_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuOpen", "background", obj, ["pushed"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuOpen_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuOpen", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuClose_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuClose", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuClose_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuClose", "background", obj, ["mouseover", "focused", "selected"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuClose_P.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuClose", "background", obj, ["pushed"]);

    obj = new nexacro.Style_background("","img::btn_LF_RecentMenuClose_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_RecentMenuClose", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("","img::btn_LF_Search_N.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Search", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::btn_LF_Search_O.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Search", "background", obj, ["mouseover", "focused", "selected", "pushed"]);

    obj = new nexacro.Style_background("","img::btn_LF_Search_D.png","","0","0","0","0","true");
    this._addCss("Button.btn_LF_Search", "background", obj, ["disabled"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Edit.edt_LF_Search", "align", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Static.sta_LF_Logo", "align", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "align", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::edt_LF_Search_N.png","stretch","3","3","0","0","true");
    this._addCss("Edit.edt_LF_Search", "background", obj, ["normal"]);

    obj = new nexacro.Style_color("#718298");
    this._addCss("Edit.edt_LF_Search", "color", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Edit.edt_LF_Search", "cursor", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "cursor", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "cursor", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "cursor", obj, ["normal"]);
    this._addCss("Static.sta_LF_SearchBg", "cursor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("");
    this._addCss("Edit.edt_LF_Search", "font", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);
    this._addCss("Grid.grd_LF_Tree", "font", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "font", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "font", obj, ["normal"]);

    obj = new nexacro.Style_padding("0 25 0 13");
    this._addCss("Edit.edt_LF_Search", "padding", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_value("#e8e9ea");
    this._addCss("Edit.edt_LF_Search", "selectbackground", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_color("#161e2a");
    this._addCss("Edit.edt_LF_Search", "selectcolor", obj, ["normal", "mouseover", "pushed", "focused", "disabled"]);

    obj = new nexacro.Style_background("","img::edt_LF_Search_S.png","stretch","3","3","0","0","true");
    this._addCss("Edit.edt_LF_Search", "background", obj, ["mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_background("","img::edt_LF_Search_D.png","stretch","3","3","0","0","true");
    this._addCss("Edit.edt_LF_Search", "background", obj, ["disabled"]);

    obj = new nexacro.Style_background("#4b5b6eff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Tree", "background", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Tree>#body", "background", obj, ["normal"]);

    obj = new nexacro.Style_color("#333333");
    this._addCss("Grid.grd_LF_Tree", "color", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "color", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "color", obj, ["normal"]);
    this._addCss("Static.sta_LF_Logo", "color", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_LF_Tree", "line", obj, ["normal"]);

    obj = new nexacro.Style_border("");
    this._addCss("Grid.grd_LF_Tree", "selectline", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "selectline", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "selectline", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_LF_Tree", "selectlinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_Tree>#body", "selectlinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "selectlinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectlinetype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "selectlinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectlinetype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::grd_LF_CloseBtn.png')");
    this._addCss("Grid.grd_LF_Tree", "treeclosebuttonimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treeclosebuttonimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treeclosebuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_LF_Tree", "treecollapseimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treecollapseimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treecollapseimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_LF_Tree", "treeexpandimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treeexpandimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treeexpandimage", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('img::grd_LF_Item.png')");
    this._addCss("Grid.grd_LF_Tree", "treeitemimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treeitemimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treeitemimage", obj, ["normal"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_LF_Tree", "treeitemmargin", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treeitemmargin", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treeitemmargin", obj, ["normal"]);

    obj = new nexacro.Style_line("0","","","");
    this._addCss("Grid.grd_LF_Tree", "treelinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treelinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treelinetype", obj, ["normal"]);

    obj = new nexacro.Style_value("URL('img::grd_LF_OpenBtn.png')");
    this._addCss("Grid.grd_LF_Tree", "treeopenbuttonimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy", "treeopenbuttonimage", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "treeopenbuttonimage", obj, ["normal"]);

    obj = new nexacro.Style_border("1","solid","#e1e1e1ff","","0","none","","","0","none","","","1","solid","#c9c9c9ff","");
    this._addCss("Grid.grd_LF_Tree>#body", "border", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("left middle");
    this._addCss("Grid.grd_LF_Tree>#body", "cellalign", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellalign", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellalign", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_TreeBg.png","stretch","15","15","0","0","true");
    this._addCss("Grid.grd_LF_Tree>#body", "cellbackground", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::grd_LF_TreeBg.png","stretch","15","15","0","0","true");
    this._addCss("Grid.grd_LF_Tree>#body", "cellbackground2", obj, ["normal"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Grid.grd_LF_Tree>#body", "cellcolor", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellcolor", obj, ["mouseover"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellcolor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Grid.grd_LF_Tree>#body", "cellcolor2", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellcolor2", obj, ["mouseover"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellcolor2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("bold 9 Gulim");
    this._addCss("Grid.grd_LF_Tree>#body", "cellfont", obj, ["normal"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_LF_Tree>#body", "cellgradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellgradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellgradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_LF_Tree>#body", "cellgradation2", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellgradation2", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellgradation2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_LF_Tree>#body", "cellline", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellline", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellline", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Grid.grd_LF_Tree>#body", "celllinespace", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "celllinespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "celllinespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("exhor");
    this._addCss("Grid.grd_LF_Tree>#body", "celllinetype", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "celllinetype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "celllinetype", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 8");
    this._addCss("Grid.grd_LF_Tree>#body", "cellpadding", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellpadding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Grid.grd_LF_Tree>#body", "selectborder", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectborder", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectborder", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#0077e7");
    this._addCss("Grid.grd_LF_Tree>#body", "selectcolor", obj, ["normal"]);

    obj = new nexacro.Style_font("bold 9 Gulim");
    this._addCss("Grid.grd_LF_Tree>#body", "selectfont", obj, ["normal"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Grid.grd_LF_Tree>#body", "selectgradation", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectgradation", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectgradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#eff1faff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Tree>#body", "cellbackground", obj, ["mouseover", "pushed"]);

    obj = new nexacro.Style_color("#092d97");
    this._addCss("Grid.grd_LF_Tree>#body", "cellcolor", obj, ["mouseover", "pushed"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_Tree>#body", "cellbackground", obj, ["disabled"]);

    obj = new nexacro.Style_color("#b2b2b2");
    this._addCss("Grid.grd_LF_Tree>#body", "cellcolor", obj, ["disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_TreeBg2.png","stretch","15","15","0","0","true");
    this._addCss("Grid.grd_LF_TreeMy", "background", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeMy>#body", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("");
    this._addCss("Grid.grd_LF_TreeMy", "line", obj, ["normal"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu", "line", obj, ["normal"]);

    obj = new nexacro.Style_background("","img::grd_LF_TreeBg2.png","stretch","15","15","0","0","true");
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_TreeBg2.png","stretch","15","15","0","0","true");
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellbackground2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#8192aa");
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellcolor", obj, ["normal", "disabled"]);

    obj = new nexacro.Style_color("#8192aa");
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellcolor2", obj, ["normal", "disabled"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Grid.grd_LF_TreeMy>#body", "cellfont", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellfont", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::grd_LF_TreeBg_O.png') stretch 15,15");
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("#ffffff");
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectcolor", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectcolor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Grid.grd_LF_TreeMy>#body", "selectfont", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectfont", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_ResentMenuBg.png","stretch","20","20","0","0","true");
    this._addCss("Grid.grd_LF_TreeRecentMenu", "background", obj, ["normal"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_ResentMenuBg.png","stretch","20","20","0","0","true");
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::grd_LF_ResentMenuBg.png","stretch","20","20","0","0","true");
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellbackground2", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("0 0 0 0");
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "cellpadding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("URL('img::grd_LF_ResentMenuBgS.png') stretch 20,20");
    this._addCss("Grid.grd_LF_TreeRecentMenu>#body", "selectbackground", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::sta_LF_Logo.png","","0","0","0","0","true");
    this._addCss("Static.sta_LF_Logo", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("9 Gulim");
    this._addCss("Static.sta_LF_Logo", "font", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Static.sta_LF_Logo", "linespace", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Static.sta_LF_SearchBg", "linespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("#2c3949ff","","","0","0","0","0","true");
    this._addCss("Static.sta_LF_SearchBg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_border("0","none","","","0","none","","","1","double","#212b39ff","#3a4757ff","0","none","","");
    this._addCss("Static.sta_LF_SearchBg", "border", obj, ["normal", "mouseover", "disabled"]);

    obj = null;
    
//[add theme images]
  };
})();
