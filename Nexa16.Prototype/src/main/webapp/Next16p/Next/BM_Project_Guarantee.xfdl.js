(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this._setPropInitFunc(function (obj)
            {
                obj.set_name("BM_Project_Guarantee");
                obj.set_titletext("New Form");
            });
            if (Form == this.constructor)
            {
                this._setFormPosition(0,0,1050,660);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Grid("Grid00","absolute","5","5","353",null,null,"5",this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"110\"/><Column size=\"110\"/><Column size=\"110\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell text=\"계약번호\"/><Cell col=\"1\" text=\"계약구분\"/><Cell col=\"2\" text=\"계약금액\"/></Band><Band id=\"body\"><Cell/><Cell col=\"1\"/><Cell col=\"2\"/></Band><Band id=\"summary\"><Cell colspan=\"2\" text=\"총 계약금액\"/><Cell col=\"2\"/></Band></Format></Formats>");
            });
            this.addChild(obj.name, obj);

            obj = new Div("Div01","absolute","363","170",null,"155","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","150",null,null,"0",this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("계약이행");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","152","0","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("증권번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","152","32","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("사서함번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","152","64","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("선급금");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","152","96","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행율");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","152","126","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","273","126","110","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","273","96","140","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","273","64","140","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","273","31","140","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","273","0","140","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","400","126","110","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","419","64","120","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("보험료");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","540","64","140","27",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","387","127","25","23",null,null,this.Div01.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("~");
            });
            this.Div01.addChild(obj.name, obj);

            obj = new Div("Div03","absolute","363","499",null,"155","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","150",null,null,"0",this.Div03.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("비고");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div03.addChild(obj.name, obj);

            obj = new TextArea("TextArea00","absolute","152","0",null,null,"0","0",this.Div03.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div03.addChild(obj.name, obj);

            obj = new Div("Div02","absolute","363","335",null,"155","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","150",null,null,"0",this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("하자이행");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","152","0","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("증권번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","152","32","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("사서함번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","152","64","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("선급금");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","152","96","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행율");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","152","126","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","273","126","110","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","273","96","140","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","273","64","140","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","273","31","140","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","273","0","140","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","400","126","110","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","419","64","120","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("보험료");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Edit("Edit04","absolute","540","64","140","27",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","387","127","25","23",null,null,this.Div02.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("~");
            });
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div00","absolute","363","5",null,"155","5",null,this);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
                obj.set_text("Div00");
            });
            this.addChild(obj.name, obj);

            obj = new Static("Static00","absolute","0","0","150",null,null,"0",this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("선급금이행");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static01","absolute","152","0","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("증권번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static02","absolute","152","32","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("사서함번호");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static03","absolute","152","64","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("선급금");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static04","absolute","152","96","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행율");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static05","absolute","152","126","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("이행기간");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit00","absolute","273","0","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static06","absolute","419","64","120","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("0");
                obj.set_text("보험료");
                obj.set_border("1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue , 1px solid cadetblue");
                obj.set_textAlign("center");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit01","absolute","273","31","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit02","absolute","273","64","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit03","absolute","273","96","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Edit("Edit05","absolute","540","64","140","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("1");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar00","absolute","273","126","110","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Calendar("Calendar01","absolute","400","126","110","27",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("2");
            });
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static07","absolute","387","127","25","23",null,null,this.Div00.form);
            obj._setPropInitFunc(function (obj)
            {
                obj.set_taborder("3");
                obj.set_text("~");
            });
            this.Div00.addChild(obj.name, obj);
            
            // Positionbase Setting
            this.Grid00.set_leftbase("");
            this.Grid00.set_topbase("");
            this.Grid00.set_bottombase("");
            this.Grid00.set_rightbase("");
            this.Grid00.set_widthbase("");
            this.Grid00.set_heightbase("");
            this.Div01.set_leftbase("");
            this.Div01.set_topbase("");
            this.Div01.set_bottombase("");
            this.Div01.set_rightbase("");
            this.Div01.set_widthbase("");
            this.Div01.set_heightbase("");
            this.Div01.form.Static00.set_leftbase("");
            this.Div01.form.Static00.set_topbase("");
            this.Div01.form.Static00.set_bottombase("");
            this.Div01.form.Static00.set_rightbase("");
            this.Div01.form.Static00.set_widthbase("");
            this.Div01.form.Static00.set_heightbase("");
            this.Div01.form.Static01.set_leftbase("");
            this.Div01.form.Static01.set_topbase("");
            this.Div01.form.Static01.set_bottombase("");
            this.Div01.form.Static01.set_rightbase("");
            this.Div01.form.Static01.set_widthbase("");
            this.Div01.form.Static01.set_heightbase("");
            this.Div01.form.Static02.set_leftbase("");
            this.Div01.form.Static02.set_topbase("");
            this.Div01.form.Static02.set_bottombase("");
            this.Div01.form.Static02.set_rightbase("");
            this.Div01.form.Static02.set_widthbase("");
            this.Div01.form.Static02.set_heightbase("");
            this.Div01.form.Static03.set_leftbase("");
            this.Div01.form.Static03.set_topbase("");
            this.Div01.form.Static03.set_bottombase("");
            this.Div01.form.Static03.set_rightbase("");
            this.Div01.form.Static03.set_widthbase("");
            this.Div01.form.Static03.set_heightbase("");
            this.Div01.form.Static04.set_leftbase("");
            this.Div01.form.Static04.set_topbase("");
            this.Div01.form.Static04.set_bottombase("");
            this.Div01.form.Static04.set_rightbase("");
            this.Div01.form.Static04.set_widthbase("");
            this.Div01.form.Static04.set_heightbase("");
            this.Div01.form.Static05.set_leftbase("");
            this.Div01.form.Static05.set_topbase("");
            this.Div01.form.Static05.set_bottombase("");
            this.Div01.form.Static05.set_rightbase("");
            this.Div01.form.Static05.set_widthbase("");
            this.Div01.form.Static05.set_heightbase("");
            this.Div01.form.Calendar00.set_leftbase("");
            this.Div01.form.Calendar00.set_topbase("");
            this.Div01.form.Calendar00.set_bottombase("");
            this.Div01.form.Calendar00.set_rightbase("");
            this.Div01.form.Calendar00.set_widthbase("");
            this.Div01.form.Calendar00.set_heightbase("");
            this.Div01.form.Edit00.set_leftbase("");
            this.Div01.form.Edit00.set_topbase("");
            this.Div01.form.Edit00.set_bottombase("");
            this.Div01.form.Edit00.set_rightbase("");
            this.Div01.form.Edit00.set_widthbase("");
            this.Div01.form.Edit00.set_heightbase("");
            this.Div01.form.Edit01.set_leftbase("");
            this.Div01.form.Edit01.set_topbase("");
            this.Div01.form.Edit01.set_bottombase("");
            this.Div01.form.Edit01.set_rightbase("");
            this.Div01.form.Edit01.set_widthbase("");
            this.Div01.form.Edit01.set_heightbase("");
            this.Div01.form.Edit02.set_leftbase("");
            this.Div01.form.Edit02.set_topbase("");
            this.Div01.form.Edit02.set_bottombase("");
            this.Div01.form.Edit02.set_rightbase("");
            this.Div01.form.Edit02.set_widthbase("");
            this.Div01.form.Edit02.set_heightbase("");
            this.Div01.form.Edit03.set_leftbase("");
            this.Div01.form.Edit03.set_topbase("");
            this.Div01.form.Edit03.set_bottombase("");
            this.Div01.form.Edit03.set_rightbase("");
            this.Div01.form.Edit03.set_widthbase("");
            this.Div01.form.Edit03.set_heightbase("");
            this.Div01.form.Calendar01.set_leftbase("");
            this.Div01.form.Calendar01.set_topbase("");
            this.Div01.form.Calendar01.set_bottombase("");
            this.Div01.form.Calendar01.set_rightbase("");
            this.Div01.form.Calendar01.set_widthbase("");
            this.Div01.form.Calendar01.set_heightbase("");
            this.Div01.form.Static06.set_leftbase("");
            this.Div01.form.Static06.set_topbase("");
            this.Div01.form.Static06.set_bottombase("");
            this.Div01.form.Static06.set_rightbase("");
            this.Div01.form.Static06.set_widthbase("");
            this.Div01.form.Static06.set_heightbase("");
            this.Div01.form.Edit04.set_leftbase("");
            this.Div01.form.Edit04.set_topbase("");
            this.Div01.form.Edit04.set_bottombase("");
            this.Div01.form.Edit04.set_rightbase("");
            this.Div01.form.Edit04.set_widthbase("");
            this.Div01.form.Edit04.set_heightbase("");
            this.Div03.set_leftbase("");
            this.Div03.set_topbase("");
            this.Div03.set_bottombase("");
            this.Div03.set_rightbase("");
            this.Div03.set_widthbase("");
            this.Div03.set_heightbase("");
            this.Div03.form.Static00.set_leftbase("");
            this.Div03.form.Static00.set_topbase("");
            this.Div03.form.Static00.set_bottombase("");
            this.Div03.form.Static00.set_rightbase("");
            this.Div03.form.Static00.set_widthbase("");
            this.Div03.form.Static00.set_heightbase("");
            this.Div03.form.TextArea00.set_leftbase("");
            this.Div03.form.TextArea00.set_topbase("");
            this.Div03.form.TextArea00.set_bottombase("");
            this.Div03.form.TextArea00.set_rightbase("");
            this.Div03.form.TextArea00.set_widthbase("");
            this.Div03.form.TextArea00.set_heightbase("");
            this.Div02.set_leftbase("");
            this.Div02.set_topbase("");
            this.Div02.set_bottombase("");
            this.Div02.set_rightbase("");
            this.Div02.set_widthbase("");
            this.Div02.set_heightbase("");
            this.Div02.form.Static00.set_leftbase("");
            this.Div02.form.Static00.set_topbase("");
            this.Div02.form.Static00.set_bottombase("");
            this.Div02.form.Static00.set_rightbase("");
            this.Div02.form.Static00.set_widthbase("");
            this.Div02.form.Static00.set_heightbase("");
            this.Div02.form.Static01.set_leftbase("");
            this.Div02.form.Static01.set_topbase("");
            this.Div02.form.Static01.set_bottombase("");
            this.Div02.form.Static01.set_rightbase("");
            this.Div02.form.Static01.set_widthbase("");
            this.Div02.form.Static01.set_heightbase("");
            this.Div02.form.Static02.set_leftbase("");
            this.Div02.form.Static02.set_topbase("");
            this.Div02.form.Static02.set_bottombase("");
            this.Div02.form.Static02.set_rightbase("");
            this.Div02.form.Static02.set_widthbase("");
            this.Div02.form.Static02.set_heightbase("");
            this.Div02.form.Static03.set_leftbase("");
            this.Div02.form.Static03.set_topbase("");
            this.Div02.form.Static03.set_bottombase("");
            this.Div02.form.Static03.set_rightbase("");
            this.Div02.form.Static03.set_widthbase("");
            this.Div02.form.Static03.set_heightbase("");
            this.Div02.form.Static04.set_leftbase("");
            this.Div02.form.Static04.set_topbase("");
            this.Div02.form.Static04.set_bottombase("");
            this.Div02.form.Static04.set_rightbase("");
            this.Div02.form.Static04.set_widthbase("");
            this.Div02.form.Static04.set_heightbase("");
            this.Div02.form.Static05.set_leftbase("");
            this.Div02.form.Static05.set_topbase("");
            this.Div02.form.Static05.set_bottombase("");
            this.Div02.form.Static05.set_rightbase("");
            this.Div02.form.Static05.set_widthbase("");
            this.Div02.form.Static05.set_heightbase("");
            this.Div02.form.Calendar00.set_leftbase("");
            this.Div02.form.Calendar00.set_topbase("");
            this.Div02.form.Calendar00.set_bottombase("");
            this.Div02.form.Calendar00.set_rightbase("");
            this.Div02.form.Calendar00.set_widthbase("");
            this.Div02.form.Calendar00.set_heightbase("");
            this.Div02.form.Edit00.set_leftbase("");
            this.Div02.form.Edit00.set_topbase("");
            this.Div02.form.Edit00.set_bottombase("");
            this.Div02.form.Edit00.set_rightbase("");
            this.Div02.form.Edit00.set_widthbase("");
            this.Div02.form.Edit00.set_heightbase("");
            this.Div02.form.Edit01.set_leftbase("");
            this.Div02.form.Edit01.set_topbase("");
            this.Div02.form.Edit01.set_bottombase("");
            this.Div02.form.Edit01.set_rightbase("");
            this.Div02.form.Edit01.set_widthbase("");
            this.Div02.form.Edit01.set_heightbase("");
            this.Div02.form.Edit02.set_leftbase("");
            this.Div02.form.Edit02.set_topbase("");
            this.Div02.form.Edit02.set_bottombase("");
            this.Div02.form.Edit02.set_rightbase("");
            this.Div02.form.Edit02.set_widthbase("");
            this.Div02.form.Edit02.set_heightbase("");
            this.Div02.form.Edit03.set_leftbase("");
            this.Div02.form.Edit03.set_topbase("");
            this.Div02.form.Edit03.set_bottombase("");
            this.Div02.form.Edit03.set_rightbase("");
            this.Div02.form.Edit03.set_widthbase("");
            this.Div02.form.Edit03.set_heightbase("");
            this.Div02.form.Calendar01.set_leftbase("");
            this.Div02.form.Calendar01.set_topbase("");
            this.Div02.form.Calendar01.set_bottombase("");
            this.Div02.form.Calendar01.set_rightbase("");
            this.Div02.form.Calendar01.set_widthbase("");
            this.Div02.form.Calendar01.set_heightbase("");
            this.Div02.form.Static06.set_leftbase("");
            this.Div02.form.Static06.set_topbase("");
            this.Div02.form.Static06.set_bottombase("");
            this.Div02.form.Static06.set_rightbase("");
            this.Div02.form.Static06.set_widthbase("");
            this.Div02.form.Static06.set_heightbase("");
            this.Div02.form.Edit04.set_leftbase("");
            this.Div02.form.Edit04.set_topbase("");
            this.Div02.form.Edit04.set_bottombase("");
            this.Div02.form.Edit04.set_rightbase("");
            this.Div02.form.Edit04.set_widthbase("");
            this.Div02.form.Edit04.set_heightbase("");
            this.Div00.set_leftbase("");
            this.Div00.set_topbase("");
            this.Div00.set_bottombase("");
            this.Div00.set_rightbase("");
            this.Div00.set_widthbase("");
            this.Div00.set_heightbase("");
            this.Div00.form.Static00.set_leftbase("");
            this.Div00.form.Static00.set_topbase("");
            this.Div00.form.Static00.set_bottombase("");
            this.Div00.form.Static00.set_rightbase("");
            this.Div00.form.Static00.set_widthbase("");
            this.Div00.form.Static00.set_heightbase("");
            this.Div00.form.Static01.set_leftbase("");
            this.Div00.form.Static01.set_topbase("");
            this.Div00.form.Static01.set_bottombase("");
            this.Div00.form.Static01.set_rightbase("");
            this.Div00.form.Static01.set_widthbase("");
            this.Div00.form.Static01.set_heightbase("");
            this.Div00.form.Static02.set_leftbase("");
            this.Div00.form.Static02.set_topbase("");
            this.Div00.form.Static02.set_bottombase("");
            this.Div00.form.Static02.set_rightbase("");
            this.Div00.form.Static02.set_widthbase("");
            this.Div00.form.Static02.set_heightbase("");
            this.Div00.form.Static03.set_leftbase("");
            this.Div00.form.Static03.set_topbase("");
            this.Div00.form.Static03.set_bottombase("");
            this.Div00.form.Static03.set_rightbase("");
            this.Div00.form.Static03.set_widthbase("");
            this.Div00.form.Static03.set_heightbase("");
            this.Div00.form.Static04.set_leftbase("");
            this.Div00.form.Static04.set_topbase("");
            this.Div00.form.Static04.set_bottombase("");
            this.Div00.form.Static04.set_rightbase("");
            this.Div00.form.Static04.set_widthbase("");
            this.Div00.form.Static04.set_heightbase("");
            this.Div00.form.Static05.set_leftbase("");
            this.Div00.form.Static05.set_topbase("");
            this.Div00.form.Static05.set_bottombase("");
            this.Div00.form.Static05.set_rightbase("");
            this.Div00.form.Static05.set_widthbase("");
            this.Div00.form.Static05.set_heightbase("");
            this.Div00.form.Edit00.set_leftbase("");
            this.Div00.form.Edit00.set_topbase("");
            this.Div00.form.Edit00.set_bottombase("");
            this.Div00.form.Edit00.set_rightbase("");
            this.Div00.form.Edit00.set_widthbase("");
            this.Div00.form.Edit00.set_heightbase("");
            this.Div00.form.Static06.set_leftbase("");
            this.Div00.form.Static06.set_topbase("");
            this.Div00.form.Static06.set_bottombase("");
            this.Div00.form.Static06.set_rightbase("");
            this.Div00.form.Static06.set_widthbase("");
            this.Div00.form.Static06.set_heightbase("");
            this.Div00.form.Edit01.set_leftbase("");
            this.Div00.form.Edit01.set_topbase("");
            this.Div00.form.Edit01.set_bottombase("");
            this.Div00.form.Edit01.set_rightbase("");
            this.Div00.form.Edit01.set_widthbase("");
            this.Div00.form.Edit01.set_heightbase("");
            this.Div00.form.Edit02.set_leftbase("");
            this.Div00.form.Edit02.set_topbase("");
            this.Div00.form.Edit02.set_bottombase("");
            this.Div00.form.Edit02.set_rightbase("");
            this.Div00.form.Edit02.set_widthbase("");
            this.Div00.form.Edit02.set_heightbase("");
            this.Div00.form.Edit03.set_leftbase("");
            this.Div00.form.Edit03.set_topbase("");
            this.Div00.form.Edit03.set_bottombase("");
            this.Div00.form.Edit03.set_rightbase("");
            this.Div00.form.Edit03.set_widthbase("");
            this.Div00.form.Edit03.set_heightbase("");
            this.Div00.form.Edit05.set_leftbase("");
            this.Div00.form.Edit05.set_topbase("");
            this.Div00.form.Edit05.set_bottombase("");
            this.Div00.form.Edit05.set_rightbase("");
            this.Div00.form.Edit05.set_widthbase("");
            this.Div00.form.Edit05.set_heightbase("");
            this.Div00.form.Calendar00.set_leftbase("");
            this.Div00.form.Calendar00.set_topbase("");
            this.Div00.form.Calendar00.set_bottombase("");
            this.Div00.form.Calendar00.set_rightbase("");
            this.Div00.form.Calendar00.set_widthbase("");
            this.Div00.form.Calendar00.set_heightbase("");
            this.Div00.form.Calendar01.set_leftbase("");
            this.Div00.form.Calendar01.set_topbase("");
            this.Div00.form.Calendar01.set_bottombase("");
            this.Div00.form.Calendar01.set_rightbase("");
            this.Div00.form.Calendar01.set_widthbase("");
            this.Div00.form.Calendar01.set_heightbase("");

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1050,660,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {

        };

        this.loadIncludeScript("BM_Project_Guarantee.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
