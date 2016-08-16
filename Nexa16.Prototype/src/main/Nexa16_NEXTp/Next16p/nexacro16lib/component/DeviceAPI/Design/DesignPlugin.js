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

// ==================================================================================================================
// 제약사항
// 1. 경로를 입력하는 모든 프로퍼티에 대해서 절대경로 및 상대경로를 지원하지 못합니다. HTTP Full URL 을 사용해야 합니다.
// 2. Flash 를 로드 할 경우 movie 에 대해서 Service 형태(ex>Base::sample.swf)의 path 를 지원할 수 없습니다.
// 3. windowed(for Runtime), popupstyle 속성과 install() 함수는 지원할 수 없습니다.
// 4. WMode는 ActiveX 또는 Flash Object 가 지원하는 기능입니다.
// ==================================================================================================================
// nexacro.Plugin 부분
// 1. IE 이외의 브라우저 지원
//   비 IE 브라우저에서 플래시와 같은 Plugin을 사용하기 위해서는 embed tag를 사용해야 하고
//   embed tag는 IE가 아닌 경우에만 동적 생성 가능 (IE에서 동적으로 생성하여 object의 child로 append 할 경우 오류 발생함)
//   때문에 dynamic dom create 방식이 아닌 innerHTML 방식으로 디자인합니다
// 2. windowed 속성과 WMode
//   windowed 속성값은 ajax에 영향을 미치지 않습니다 (Runtime 을 위한 속성값임)
//   WMode 는 ActiveX 또는 Flash Object 가 지원하는 속성으로 해당 Object 가 WMode 를 지원하지 않으면
//   해당 설정값은 무의미합니다
// ==================================================================================================================
if (nexacro.Plugin)
{
    var _pPlugin = nexacro.Plugin.prototype;
        
    _pPlugin._type_name = "Plugin";

    _pPlugin.classid = "";
    _pPlugin.codebase = "";
    _pPlugin.code = "";
    _pPlugin.archive = "";

    _pPlugin.mimetype = "";
    _pPlugin.pluginsrc = "";
    _pPlugin.pluginpage = "";    
    _pPlugin.license = "";
    _pPlugin.lpkpath = "";

    _pPlugin.contents = "";    
    _pPlugin.adjustalpha = false;
    _pPlugin.usepersistdata = false;

    _pPlugin.windowed = false;
    _pPlugin.popupstyle = false;

    //==== internal properties =========//
    _pPlugin._obj_id = "";
    _pPlugin._obj_elem = null;
    _pPlugin._params = null;

    _pPlugin._event_params = null;
    _pPlugin._cell_elem = null;
    
    _pPlugin.set_name = function (id)
    {        
        this.id = this.name = id;
        if (this._cell_elem)
            this._cell_elem.setElementText(this.id);
    };

    // -- Override
    _pPlugin.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            var cellElem = new nexacro.TextBoxElement(control_elem, "icontext");
            this._cell_elem = cellElem;
            cellElem.setElementSize(control_elem.client_width, control_elem.client_height);

            cellElem.setElementTextAlign("center");
            cellElem.setElementVerticalAlign("middle");
            this.on_apply_text(this.name);
        }
    };

    _pPlugin.on_create_contents_command = function ()
    {
        return this._cell_elem.createCommand();
    };

    _pPlugin.on_attach_contents_handle = function (win)
    {
        if (this._cell_elem)
            this._cell_elem.attachHandle(win);
    };

    _pPlugin.on_created_contents = function (win)
    {   
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.create(win);
        }
    };

    _pPlugin.on_destroy_contents = function ()
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.destroy();
            this._cell_elem = null;
        }
    };
    _pPlugin.on_change_containerRect = function (width, height)
    {
        if (this._is_created_contents)
        {
            var cellElem = this._cell_elem;
            cellElem.setElementSize(width, height);
        }
    };

    _pPlugin.on_apply_text = function (text)
    {
        var cellElem = this._cell_elem;
        if (cellElem)
        {
            cellElem.setElementText(text);
        }
    };

    _pPlugin.createCssDesignContents = function ()
    {
        this.set_text("Plugin");
    };

    _pPlugin._setContents = function (str)
    {
        /*
        if (str.length)
        {
            if (str.indexOf("<Contents>") != 0)
            {
                str = "<Contents>" + str + "</Contents>";
            }
            var doc = nexacro._parseXMLDocument(str);
            if (doc)
            {
                this._params.clear();

                var elems = doc.getElementsByTagName("Param");
                if (elems)
                {
                    var len = elems.length;
                    for (var i = 0; i < len; i++)
                    {
                        var param = elems[i];
                        var name = param.getAttribute("name");
                        var value = param.getAttribute("value");

                        var obj_elem = this._obj_elem;
                        if (obj_elem)
                        {
                            obj_elem.setElementParam(name, value);
                        }
                        else
                        {
                            this._params.add_item(name, value);                            
                        }
                    }
                }

                // TODO : persist data 처리 - <_persistdata>/*base64encode data* /</_persistdata>
            }
        }
        */ 
    };

    // ==================================================================================================================
    // Properties
    // ==================================================================================================================    
 
    // ==================================================================================================================
    // Method
    // ==================================================================================================================  

    delete _pPlugin;
}
