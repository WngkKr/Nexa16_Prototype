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
if (!nexacro.ImageViewer)
{
    //==============================================================================
    // nexacro.ImageViewer
    //==============================================================================
    nexacro.ImageViewer = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pImageViewer = nexacro._createPrototype(nexacro.Component, nexacro.ImageViewer);
    nexacro.ImageViewer.prototype = _pImageViewer;
    _pImageViewer._type_name = "ImageViewer";

    /* control */
    _pImageViewer._image = null;
    _pImageViewer._imagetext = null;

    /* default properties */
    _pImageViewer.text = "";
    _pImageViewer.image = "";
    _pImageViewer.imagealign = "center middle";
    _pImageViewer.imagewidth = 0;
    _pImageViewer.imageheight = 0;
    _pImageViewer.stretch = "none";

    /* accessibility */
    _pImageViewer._accessibility_role = "image";

    /* readonly property */
    _pImageViewer.set_imagewidth = nexacro._emptyFn;
    _pImageViewer.set_imageheight = nexacro._emptyFn;

    //===============================================================
    // nexacro.ImageViewer : Create & Update
    //===============================================================
    _pImageViewer.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (this.image)
            {
                this._createImageControl();
            }

            if (this._displaytext)
            {
                this._createImageTextControl();
            }
        }
    };

    _pImageViewer.on_created_contents = function (win)
    {
        if (this._image)
        {
            this._image.on_created(win);
        }

        if (this._imagetext)
        {
            this._imagetext.on_created(win);
        }
    };

    _pImageViewer.on_create_contents_command = function ()
    {
        var str = "";
        if (this._image)
        {
            str += this._image.createCommand();
        }

        if (this._imagetext)
        {
            str += this._imagetext.createCommand();
        }

        return str;
    };

    _pImageViewer.on_attach_contents_handle = function (win)
    {
        if (this._image)
        {
            this._image.attachHandle(win);
        }

        if (this._imagetext)
        {
            this._imagetext.attachHandle(win);
        }
    };

    _pImageViewer.on_destroy_contents = function ()
    {
        if (this._image)
        {
            this._image.destroy();
            this._image = null;
        }

        if (this._imagetext)
        {
            this._imagetext.destroy();
            this._imagetext = null;
        }
    };

    _pImageViewer.on_change_containerRect = function (width, height)
    {
        if (this._image)
        {
            this._image.resize(width, height);
        }

        if (this._imagetext)
        {
            this._imagetext.resize(width, height);
        }
    };
    //===============================================================
    // nexacro.ImageViewer : Override
    //===============================================================

    //===============================================================
    // nexacro.ImageViewer : Properties
    //===============================================================
    _pImageViewer.on_apply_text = function ()
    {
        var text = this._displaytext;
        var text_control = this._imagetext;
        var control_elem = this.getElement();
        if (control_elem && text)
        {
            this._createImageTextControl(false);
        }

        if (text_control)
        {
            text_control.set_text(text);
            if (!text)
            {
                text_control.set_visible(false);
            }
            else
            {
                text_control.set_visible(true);
            }
        }
    };

    _pImageViewer.set_image = function (v)
    {
        v = this._convertImageValue(v);
        if (this.image != v)
        {
            this.image = v;
            this.on_apply_image();
        }
    };

    _pImageViewer.on_apply_image = function ()
    {
        var control_elem = this.getElement();
        if (control_elem && this.image)
        {
            if (this.image)
            {
                this._createImageControl(false);
            }
        }

        if (this._image)
        {
            this._image.set_image(this.image);
        }
    };

    _pImageViewer.set_stretch = function (v)
    {
        if (this.stretch != v)
        {
            this.stretch = v;
            this.on_apply_stretch();
        }
    };

    _pImageViewer.on_apply_stretch = function ()
    {
        var image = this._image;
        if (image)
        {
            image.set_stretch(this.stretch);
        }
    };

    _pImageViewer.set_imagealign = function (v)
    {
        if (this.imagealign != v)
        {
            this.imagealign = v;
            this.on_apply_imagealign();
        }
    };

    _pImageViewer.on_apply_imagealign = function ()
    {
        var image = this._image;
        if (image)
        {
            image.set_imagealign(this.imagealign);
        }
    };

    _pImageViewer.on_apply_textAlign = function (halign)
    {
        if (this._imagetext)
        {
            this._imagetext.set_textAlign(halign);
        }
    };

    _pImageViewer.on_apply_verticalAlign = function (valign)
    {
        if (this._imagetext)
        {
            this._imagetext.set_verticalAlign(valign);
        }
    };

    //===============================================================
    // nexacro.ImageViewr : Methods
    //===============================================================

    //===============================================================
    // nexacro.ImageViewr : Events
    //===============================================================
    _pImageViewer.on_notify_onclick = function (obj, e)
    {
        return this.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, this, obj);
    };

    //===============================================================
    // nexacro.ImageViewr : Logical Part
    //===============================================================
    _pImageViewer._createImageControl = function (bCreateOnly)
    {
        var image_control = this._image;
        if (!image_control)
        {
            image_control = this._image = new nexacro._Image("image", "absolute", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, this);
            image_control._setControl();

            image_control.set_image(this.image);
            image_control._setNotifyFn(this, this._setImageSize);

            image_control.createComponent(bCreateOnly);

            image_control._setEventHandler("onclick", this.on_notify_onclick, this);
        }

        return image_control;
    };

    _pImageViewer._createImageTextControl = function (bCreateOnly)
    {
        var imagetext_control = this._imagetext;
        if (!imagetext_control)
        {
            imagetext_control = this._imagetext = new nexacro.Static("imagetext", "absolute", 0, 0, this._getClientWidth(), this._getClientHeight(), null, null, this);
            imagetext_control._setControl();

            imagetext_control.set_text(this._displaytext);

            imagetext_control.createComponent(bCreateOnly);

            imagetext_control._setEventHandler("onclick", this.on_notify_onclick, this);
        }

        return imagetext_control;
    };

    _pImageViewer._convertImageValue = function (v)
    {
        if (v)
        {
            if (v instanceof nexacro.Image)
            {
                v = v._base64str;
            }
            else
            {
                v = v.toString();

                var isBase64 = nexacro._checkBase64String(v);
                if (isBase64)
                {
                    if (v.substring(0, 10).toLowerCase() == "data:image")
                    {
                        if (v.substring(0, 17).toLowerCase() != "data:image;base64")
                        {
                            var comma_idx = v.indexOf(",");
                            if (comma_idx > -1)
                            {
                                var tmp = v.slice(comma_idx + 1, v.legnth);
                                v = "data:image;base64," + tmp;
                            }
                        }
                    }
                    else
                    {
                        v = "data:image;base64," + v;
                    }
                }
            }
        }

        return v;
    };

    _pImageViewer._setImageSize = function (width, height)
    {
        this.imagewidth = width;
        this.imageheight = height;
    };

    delete _pImageViewer;

    //==============================================================================
    // nexacro._Image
    //==============================================================================
    nexacro._Image = function (id, position, left, top, width, height, right, bottom, parent)
    {
        nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
    };

    var _pImage = nexacro._createPrototype(nexacro.Component, nexacro._Image);
    nexacro._Image.prototype = _pImage;
    _pImage._type_name = "Image";

    /* property */
    _pImage.image = "";
    _pImage.imagealign = "center middle";
    _pImage.imagewidth = 0;
    _pImage.imageheight = 0;
    _pImage.stretch = "none";

    /* internal variable */
    _pImage._img_elem = null;
    _pImage._imagealign = null;
    _pImage._notifyTarget = null;
    _pImage._notifyFn = null;
    _pImage._prewidth = 0;
    _pImage._preheight = 0;

    _pImage._is_focus_accept = false;

    /* status */
    _pImage._is_simple_control = true;

    //===============================================================
    // nexacro._Image : Create & Update
    //===============================================================
    _pImage.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._img_elem = new nexacro.ImageElement(control_elem, "image");
        }
    };

    _pImage.on_created_contents = function (win)
    {
        if (this._img_elem)
        {
            this._img_elem.create(win);
        }

        this.on_apply_image();
    };

    _pImage.on_create_contents_command = function ()
    {
        var ret = "";
        var img_elem = this._img_elem;
        if (img_elem)
        {
            this.on_apply_image();

            ret = img_elem.createCommand();
        }

        return ret;
    };

    _pImage.on_attach_contents_handle = function (win)
    {
        var img_elem = this._img_elem;
        if (img_elem)
        {
            img_elem.attachHandle(win);
        }
    };

    _pImage.on_destroy_contents = function ()
    {
        if (this._img_elem)
        {
            this._img_elem.destroy();
            this._img_elem = null;
        }

        this._imagealign = null;
        this._notifyTarget = null;
        this._notifyFn = null;
    };

    _pImage.on_change_containerRect = function (width, height)
    {
        if (this._img_elem)
        {
            this._updateElementPositions();
        }
    };

    //===============================================================
    // nexacro._Image : Properties
    //===============================================================
    _pImage.set_image = function (v)
    {
        if (this.image != v)
        {
            this.image = v;
            this.on_apply_image();
        }
    };

    _pImage.on_apply_image = function ()
    {
        this._load_image();
    };

    _pImage.set_imagealign = function (v)
    {
        if (this.imagealign != v)
        {
            this.imagealign = v;
            this.on_apply_imagealign();
        }
    };

    _pImage.on_apply_imagealign = function ()
    {
        this._imagealign = nexacro.AlignObject(this.imagealign);

        if (this._img_elem)
        {
            this._updateElementPositions();
        }
    };

    _pImage.set_stretch = function (v)
    {
        if (this.stretch != v)
        {
            this.stretch = v;
            this.on_apply_stretch();
        }
    };

    _pImage.on_apply_stretch = function ()
    {
        this._updateElementPositions();
    };

    //===============================================================
    // nexacro._Image : Logical Part
    //===============================================================
    _pImage._on_load_image = function (imgurl, w, h)
    {
        this._prewidth = w;
        this._preheight = h;

        this._setImageSize(w, h);
        this._load_image_completed(imgurl);
    };

    _pImage._load_image = function ()
    {
        var v = this.image.toString();
        var control_elem = this.getElement();
        if (control_elem)
        {
            var img_elem = this._img_elem;
            if (v)
            {
                if (this._getImageType() == "url")
                {
                    v = nexacro._getURIValue(v);
                    v = nexacro._getImageLocation(v, this._getRefFormBaseUrl());
                }

                var image_size = nexacro._getImageSize(v, this._on_load_image, this);
                if (image_size)
                {
                    this._prewidth = image_size.width;
                    this._preheight = image_size.height;
                    this._load_image_completed(v);
                }
            }
            else
            {
                if (img_elem)
                {
                    img_elem.setElementVisible(false);
                    img_elem.setElementImage("");
                    this._updateElementPositions();
                    this._setImageSize(0, 0);
                }
            }

            if (img_elem)
            {
                if (this.rtlimagemirroring)
                {
                    img_elem.setElementImageMirror(this.rtlimagemirroring);
                }
            }
        }
    };

    _pImage._load_image_completed = function (url)
    {
        var img_elem = this._img_elem;
        if (img_elem)
        {
            var bChange = true;
            var v = this.image;
            if (!v)
            {
                img_elem.setElementVisible(false);
                img_elem.setElementImage("");
                this._updateElementPositions();
                this._setImageSize(0, 0);
            }
            else
            {
                v = v.toString();
                if (this._getImageType() == "url")
                {
                    if (v.substring(0, 4).toLowerCase() == "url(")
                    {
                        v = v.substring(5, v.length - 2);
                    }

                    v = nexacro._getImageLocation(v, this._getRefFormBaseUrl());

                    if (v != url)
                    {
                        bChange = false;
                    }
                }

                if (bChange)
                {
                    url = nexacro.UrlObject(url);
                    img_elem.setElementVisible(true);
                    img_elem.setElementImage(url);

                    this._updateElementPositions();
                }
            }
        }
    };

    _pImage._updateElementPositions = function ()
    {
        var img_elem = this._img_elem;
        if (img_elem)
        {
            this._recalcImageSize();

            var halign = this._imagealign ? this._imagealign.halign : "center";
            var valign = this._imagealign ? this._imagealign.valign : "middle";

            var client_width = this._getClientWidth();
            var client_height = this._getClientHeight();

            var imgw = this.imagewidth;
            var imgh = this.imageheight;

            var imgpos_x, imgpos_y;

            switch (halign)
            {
                case "left":
                    imgpos_x = 0;
                    break;
                case "right":
                    imgpos_x = client_width - imgw;
                    break;
                default:
                    imgpos_x = Math.floor((client_width - imgw) / 2);
                    break;
            }

            switch (valign)
            {
                case "top":
                    imgpos_y = 0;
                    break;
                case "bottom":
                    imgpos_y = client_height - imgh;
                    break;
                default:
                    imgpos_y = Math.floor((client_height - imgh) / 2);
                    break;
            }

            img_elem.setElementPosition(imgpos_x, imgpos_y);
            img_elem.setElementSize(imgw, imgh);
        }
    };

    _pImage._recalcImageSize = function ()
    {
        var stretch = this.stretch;
        if (!stretch)
        {
            return;
        }

        var width = 0, height = 0;
        var image_width = 0, image_height = 0;
        var span_width = this._getClientWidth();
        var span_height = this._getClientHeight();

        if (stretch == "fit")
        {
            width = span_width;
            height = span_height;
        }
        else if (stretch == "fixaspectratio")
        {
            image_width = this._prewidth;
            image_height = this._preheight;

            var widthPer = span_width / image_width;
            var heightPer = span_height / image_height;

            if (widthPer <= heightPer)
            {
                width = span_width;
                height = Math.floor(image_height * widthPer);
            }
            else
            {
                width = Math.floor(image_width * heightPer);
                height = span_height;
            }
        }
        else
        {
            width = this._prewidth;
            height = this._preheight;
        }

        this._setImageSize(width, height);
    };

    _pImage._setNotifyFn = function (target, fn)
    {
        this._notifyTarget = target;
        this._notifyFn = fn;
    };

    _pImage._setImageSize = function (w, h)
    {
        this.imagewidth = w;
        this.imageheight = h;

        if (this._notifyTarget && this._notifyFn)
        {
            this._notifyFn.call(this._notifyTarget, w, h);
        }
    };

    _pImage._getImageType = function ()
    {
        var ret = "url";
        var v = this.image;
        if (v)
        {
            if (v.substring(0, 17).toLowerCase() == "data:image;base64")
            {
                ret = "base64";
            }
        }

        return ret;
    };

    delete _pImage;
}