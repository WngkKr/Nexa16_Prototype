if (nexacro.MainFrame)
{
    var _pMainFrame = nexacro.MainFrame.prototype;
   
    _pMainFrame.createWindow = function ()
    {
        if (!this._isPreviewMode())
        {       	
            var _win = this._window;
            if (_win == null)
            {                
                _win = this._window = new nexacro._Window(this.name, null, true);
            }

            _win.create(null, this.name, this._adjust_width, this._adjust_height, this._adjust_left, this._adjust_top, this.resizable);
            _win.attachFrame(this, false);
            _win._setSystemMenuResizable(this.resizable);

            // for HTML5 reSize mainFrame()
            var width = nexacro._getMainWindowWidth(_win);
            var height = nexacro._getMainWindowHeight(_win);
            this._setSize(width, height);
        }
        else
        {
        	this._is_window = false;
            // MainFrame도 CSS Preview를 지원하는지?
        }
    };

    delete _pMainFrame;
}

if (nexacro.Frame)
{

	var _pFrame = nexacro.Frame.prototype;
	
	_pFrame.createCssDesignContents = function ()
	{		
		this.set_showtitlebar(true);
		this.set_showstatusbar(true);
		if (this.set_resizable)
			this.set_resizable(true);
		this.set_titletext("titletext");
		this.set_statustext("statustext");

	};

	_pFrame.updatePreviewPosition = function ()
	{
		var form = this.parent;
		
		// component align : center middle
		var offset_left = (form._adjust_width / 2) - (this._adjust_width / 2);
		var offset_top = (form._adjust_height / 2) - (this._adjust_height   / 2);

		this.move(offset_left, offset_top, this._adjust_width, this._adjust_height);
	};
}

if (nexacro.ChildFrame)
{
    var _pChildFrame = nexacro.ChildFrame.prototype;
  

    _pChildFrame.set_formurl = function (url)
    {
        var realurl = nexacro._getFDLLocation(url);
        if (this._formurl != realurl)
        {
            this.formurl = url;
            this._formurl = realurl;

            var form = this.form;
            if (form)
            {
                form.destroyComponent();
            }

            //form = new Form("form", "absolute", 0, 0, this._client_width, this._client_height, null, null, this);
            form = new nexacro.DesignForm("form", "absolute", 0, 0, this.client_width, this.client_height, null, null, this);
            form.opener = this.opener;
            this.form = form;
            this.form._url = this._formurl;
            this._is_loading = false;
            this.form.on_notify_init();
            this._is_loaded = true;

            return form;
        }
    };

    _pChildFrame.showDesign = function (str_id, _parent_frame, arr_arg, opener, _parent_handle)
    {
        var ret, parent_frame, id, arg;
        if (!(str_id instanceof nexacro.Frame) && str_id != null)
        {
            parent_frame = _parent_frame;
            id = str_id;
            this.id = id;
            this._arg = arr_arg;
            if (opener)
                this.opener = opener;
        }
        else
        {
            parent_frame = str_id;
            id = this.id;
            this._arg = _parent_frame;
            if (arr_arg)
                this.opener = arr_arg;
        }

        var child_frame;
        if (parent_frame)
            ret = parent_frame.addChild(id, this);

        if (ret == -1)
        {
            child_frame = parent_frame[id];
            if (child_frame && child_frame._window && !child_frame._window._is_alive)
            {
                if (child_frame._window.setActive)
                {
                    child_frame._window.setActive();
                }
                else
                {
                    child_frame._window.focus();
                }
                return;
            }
        }
        else
        {
            child_frame = this;
        }

        nexacro._registerPopupFrame(id, this);
        child_frame._is_window = true;
        child_frame._window_type = 2; // modeless

        var left = child_frame._adjust_left;
        var top = child_frame._adjust_top;
        var width = child_frame._adjust_width;
        var height = child_frame._adjust_height;

        var option;
        if (this.form)
        {
            this.form.opener = this.opener;
        }

        // TODO check parent window가 없으면 render나 메시지큐에서 문제가 좀 있는듯..한데 history를 알수가 없다. 
        var parent_window = new nexacro._Window(this.name, null, false);
        parent_window.handle = _parent_handle;

        //   var parent_window = parent_frame ? parent_frame._window : null;
        if (!this.autosize)
        {
            this._window = new nexacro._Window(this.name, parent_window, false);
            this._window.attachFrame(this, false);

            // TODO check; create Design Window
            this._window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);
            this.createComponent();
            this.on_created();

            if (this._is_created && this._control_element)
            {
                this._control_element._parent_elem = null;
                this._setInheritStyleValues(_parent_frame);
            }

            var pThis = this;

            // attach event
            nexacro._observeSysEvent(
                this._window.handle,
                "resize",
                "onresize",
                function () { if (pThis.form) pThis.form._on_designform_onsize(); });
        }
    };

    _pChildFrame.on_created = function (_window)
    {
        var ret = nexacro.Frame.prototype.on_created.call(this, _window);
        if (nexacro.isDesignMode)
        {
            //
            // TODO preview mode 체크?
            // preview일때 부모관계가 어떻게되는지...

            var design_form = this.form;
            if (design_form && design_form instanceof nexacro.DesignForm)
            {
                //design_form.style.set_background(design_form._outer_background_value);
                design_form.set_background(design_form._outer_background_value);
                
                //design_form.set_border("none"); // lym runtime_css에 none으로 설정

            }
        }

        return ret;
    };

    _pChildFrame._getWaitComponentElement = function ()
    {
    	var waitComp = this._waitcomp;
    	if (waitComp)
    	{
    		return waitComp.getElement();
    	}
    	return null;
    };

    delete _pChildFrame;

   
}

