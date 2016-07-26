//CSS=Login.css
    
(function() {
  return function() {
    var obj;   
    
    obj = new nexacro.Style_background("","img::Login_btnN.png","","0","0","0","0","true");
    this._addCss("Button.btn_Login_Login", "background", obj, ["normal", "disabed"]);

    obj = new nexacro.Style_border("0","none","","");
    this._addCss("Button.btn_Login_Login", "border", obj, ["normal", "disabed", "mouseover", "focused", "pushed"]);
    this._addCss("Button.btn_Login_Close", "border", obj, ["normal", "disabed", "mouseover", "focused", "pushed"]);
    this._addCss("CheckBox.chk_Login_Id", "border", obj, ["normal", "mouseover", "pushed", "focused"]);
    this._addCss("Div.div_Login_Bg", "border", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Edit.edi_Login_Id", "border", obj, ["normal", "diabled", "mouseover", "focused"]);
    this._addCss("Static.sta_Login_Inputbg", "border", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_bordertype("normal","0","0","true","true","true","true");
    this._addCss("Button.btn_Login_Login", "bordertype", obj, ["normal", "disabed", "mouseover", "focused", "pushed"]);
    this._addCss("Button.btn_Login_Close", "bordertype", obj, ["normal", "disabed", "mouseover", "focused", "pushed"]);
    this._addCss("CheckBox.chk_Login_Id", "bordertype", obj, ["normal", "mouseover", "pushed", "focused"]);
    this._addCss("Div.div_Login_Bg", "bordertype", obj, ["normal", "mouseover", "disabled"]);
    this._addCss("Edit.edi_Login_Id", "bordertype", obj, ["normal", "diabled", "mouseover", "focused"]);
    this._addCss("Static.sta_Login_Inputbg", "bordertype", obj, ["normal", "mouseover"]);

    obj = new nexacro.Style_background("","img::Login_btnO.png","","0","0","0","0","true");
    this._addCss("Button.btn_Login_Login", "background", obj, ["mouseover", "focused"]);

    obj = new nexacro.Style_background("","img::Login_btnP.png","","0","0","0","0","true");
    this._addCss("Button.btn_Login_Login", "background", obj, ["pushed"]);

    obj = new nexacro.Style_background("","img::login_closebtnN.png","","0","0","0","0","true");
    this._addCss("Button.btn_Login_Close", "background", obj, ["normal", "disabed"]);

    obj = new nexacro.Style_background("","img::login_closebtnO.png","","0","0","0","0","true");
    this._addCss("Button.btn_Login_Close", "background", obj, ["mouseover", "focused", "pushed"]);

    obj = new nexacro.Style_background("","","","0","0","0","0","true");
    this._addCss("CheckBox.chk_Login_Id", "background", obj, ["normal", "mouseover", "pushed", "focused"]);
    this._addCss("Edit.edi_Login_Id", "background", obj, ["normal", "diabled", "mouseover", "focused"]);

    obj = new nexacro.Style_font("9,Gulim");
    this._addCss("CheckBox.chk_Login_Id", "font", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_color("#e0e4ef");
    this._addCss("CheckBox.chk_Login_Id", "color", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("left middle");
    this._addCss("CheckBox.chk_Login_Id", "aling", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_background("#ffffffff","","","0","0","0","0","true");
    this._addCss("CheckBox.chk_Login_Id", "buttonbackground", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("1 solid #525252");
    this._addCss("CheckBox.chk_Login_Id", "buttonborder", obj, ["normal"]);

    obj = new nexacro.Style_bordertype("round","1","1","true","true","true","true");
    this._addCss("CheckBox.chk_Login_Id", "buttonbordertype", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("URL('img::chk_img.png')");
    this._addCss("CheckBox.chk_Login_Id", "buttonimage", obj, ["normal", "mouseover", "pushed"]);

    obj = new nexacro.Style_value("14");
    this._addCss("CheckBox.chk_Login_Id", "buttonsize", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_padding("2 0 0 5");
    this._addCss("CheckBox.chk_Login_Id", "textpadding", obj, ["normal", "mouseover", "pushed", "focused"]);

    obj = new nexacro.Style_value("1 solid #ff6600");
    this._addCss("CheckBox.chk_Login_Id", "buttonborder", obj, ["mouseover", "pushed"]);

    obj = new nexacro.Style_value("1 solid #043688");
    this._addCss("CheckBox.chk_Login_Id", "buttonborder", obj, ["focused"]);

    obj = new nexacro.Style_value("");
    this._addCss("CheckBox.chk_Login_Id", "buttonimage", obj, ["focused"]);

    obj = new nexacro.Style_accessibility("","true","all","","","");
    this._addCss("Div.div_Login_Bg", "accessibility", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_align("");
    this._addCss("Div.div_Login_Bg", "align", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_background("","img::Login_bg.png","","0","0","0","0","true");
    this._addCss("Div.div_Login_Bg", "background", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_color("");
    this._addCss("Div.div_Login_Bg", "color", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Div.div_Login_Bg", "cursor", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("");
    this._addCss("Div.div_Login_Bg", "font", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_gradation("");
    this._addCss("Div.div_Login_Bg", "gradation", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Div.div_Login_Bg", "linespace", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_value("");
    this._addCss("Div.div_Login_Bg", "opacity", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_padding("");
    this._addCss("Div.div_Login_Bg", "padding", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_shadow("");
    this._addCss("Div.div_Login_Bg", "shadow", obj, ["normal", "mouseover", "disabled"]);

    obj = new nexacro.Style_font("9, Verdana");
    this._addCss("Edit.edi_Login_Id", "font", obj, ["normal", "diabled", "mouseover", "focused"]);

    obj = new nexacro.Style_color("#c9c9c9");
    this._addCss("Edit.edi_Login_Id", "color", obj, ["normal", "diabled"]);

    obj = new nexacro.Style_padding("0 0 0 12");
    this._addCss("Edit.edi_Login_Id", "padding", obj, ["normal", "diabled", "mouseover", "focused"]);

    obj = new nexacro.Style_color("#222222");
    this._addCss("Edit.edi_Login_Id", "color", obj, ["mouseover", "focused"]);

    obj = new nexacro.Style_background("","img::Login_Input.png","stretch","5","0","0","0","true");
    this._addCss("Static.sta_Login_Inputbg", "background", obj, ["normal", "mouseover"]);

    obj = null;
    
//[add theme images]
  };
})();
