(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("Temp01_SingleDetail");
                this.set_classname("Temp01_SingleDetail");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,1030,876);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static51", "absolute", "2", "60", "250", "21", null, null, this);
            obj.set_taborder("1");
            obj.set_text("디테일 항목");
            obj.set_cssclass("sta_WF_SubTitle1");
            this.addChild(obj.name, obj);

            obj = new Div("div_Search", "absolute", "0", "0", null, "43", "20", null, this);
            obj.set_taborder("4");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Edit("Edit04", "absolute", "104", "10", "132", "21", null, null, this.div_Search);
            obj.set_taborder("11");
            obj.set_cssclass("edt_WF_Search");
            this.div_Search.addChild(obj.name, obj);
            obj = new Button("Button06", "absolute", "235", "10", "21", "21", null, null, this.div_Search);
            obj.set_taborder("12");
            obj.set_cssclass("btn_WF_SearchSmall");
            this.div_Search.addChild(obj.name, obj);
            obj = new Combo("Combo00", "absolute", "371", "10", "152", "21", null, null, this.div_Search);
            this.div_Search.addChild(obj.name, obj);
            obj.set_taborder("13");
            obj = new Calendar("Calendar00", "absolute", "638", "10", "152", "21", null, null, this.div_Search);
            this.div_Search.addChild(obj.name, obj);
            obj.set_taborder("14");
            obj = new Static("Static01", "absolute", "19", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("17");
            obj.set_text("조회라벨01");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "286", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("18");
            obj.set_text("조회라벨02");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "553", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("20");
            obj.set_text("조회라벨03");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);
            obj = new Button("Button05", "absolute", null, "8", "60", "25", "11", null, this.div_Search);
            obj.set_taborder("21");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_Search.addChild(obj.name, obj);

            obj = new Tab("Tab00", "absolute", "0", "85", null, null, "20", "20", this);
            obj.set_taborder("5");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            this.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Tab00);
            obj.set_text("Tab 01");
            this.Tab00.addChild(obj.name, obj);
            obj = new Div("div_Detail", "absolute", "0", "9", null, "372", "0", null, this.Tab00.tabpage1);
            obj.set_taborder("0");
            obj.set_scrollbars("none");
            this.Tab00.tabpage1.addChild(obj.name, obj);
            obj = new Static("Static41", "absolute", "0", "141", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("151");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "0", "1", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("50");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "0", "29", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("51");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "0", "57", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("52");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "0", "85", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("53");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "0", "113", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("54");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static05", "absolute", "0", "169", null, "29", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("55");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static06", "absolute", "0", "1", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("56");
            obj.set_text("Edit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static07", "absolute", "0", "29", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("57");
            obj.set_text("Combo");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static08", "absolute", "0", "85", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("58");
            obj.set_text("Spin");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static09", "absolute", "0", "57", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("59");
            obj.set_text("Calendar");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static10", "absolute", "0", "141", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("60");
            obj.set_text("MaskEdit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static11", "absolute", "0", "113", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("61");
            obj.set_text("CheckBox");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static12", "absolute", "0", "284", null, "88", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("82");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static13", "absolute", "0", "197", null, "88", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("83");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static14", "absolute", "0px", "0px", "0px", "0px", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("84");
            obj.set_cssclass("sta_WF_DetailLabel02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static15", "absolute", "0", "169", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("85");
            obj.set_text("Radio");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static16", "absolute", "0", "197", "107", "88", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("86");
            obj.set_text("TextArea");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static17", "absolute", "0", "284", "107", "88", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("87");
            obj.set_text("TextArea");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static19", "absolute", "254", "1", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("89");
            obj.set_text("Edit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static20", "absolute", "254", "29", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("90");
            obj.set_text("Combo");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static21", "absolute", "254", "57", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("91");
            obj.set_text("Calendar");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static22", "absolute", "254", "85", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("92");
            obj.set_text("Spin");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static23", "absolute", "254", "113", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("93");
            obj.set_text("CheckBox");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static24", "absolute", "254", "141", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("94");
            obj.set_text("MaskEdit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static25", "absolute", "254", "169", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("95");
            obj.set_text("Radio");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new MaskEdit("MaskEdit00", "absolute", "110", "145", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("96");
            obj.set_displaynulltext("123,456,789");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Radio("Radio00", "absolute", "110", "173", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            var Radio00_innerdataset = new Dataset("Radio00_innerdataset", this.Tab00.tabpage1.div_Detail.Radio00);
            Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">선택01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">선택02</Col></Row></Rows>");
            obj.set_innerdataset(Radio00_innerdataset);
            obj.set_taborder("97");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_value("2");
            obj.set_index("1");
            obj = new Spin("Spin00", "absolute", "110", "89", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("98");
            obj.set_value("987");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Calendar("Calendar00", "absolute", "110", "61", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("99");
            obj.set_displaynulltext("2015-00-00");
            obj = new Combo("Combo00", "absolute", "110", "33", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("100");
            obj.set_text("전체선택");
            obj.set_index("-1");
            obj = new Edit("Edit00", "absolute", "110", "5", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("101");
            obj.set_displaynulltext("Enabled");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox01", "absolute", "180", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("103");
            obj.set_text("체크02");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox00", "absolute", "110", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("104");
            obj.set_text("체크01");
            obj.set_value("true");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new MaskEdit("MaskEdit01", "absolute", "364", "145", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("105");
            obj.set_displaynulltext("123,456,789");
            obj.set_cssclass("essential");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Radio("Radio01", "absolute", "364", "173", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            var Radio01_innerdataset = new Dataset("Radio01_innerdataset", this.Tab00.tabpage1.div_Detail.Radio01);
            Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">선택01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">선택02</Col></Row></Rows>");
            obj.set_innerdataset(Radio01_innerdataset);
            obj.set_taborder("106");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("2");
            obj.set_direction("vertical");
            obj.set_cssclass("essential");
            obj.set_index("1");
            obj = new Spin("Spin01", "absolute", "364", "89", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("107");
            obj.set_value("987");
            obj.set_cssclass("essential");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Calendar("Calendar01", "absolute", "364", "61", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("108");
            obj.set_displaynulltext("2015-00-00");
            obj.set_cssclass("essential");
            obj = new Combo("Combo01", "absolute", "364", "33", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("109");
            obj.set_text("전체선택");
            obj.set_cssclass("essential");
            obj = new Edit("Edit01", "absolute", "364", "5", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("110");
            obj.set_displaynulltext("Enabled");
            obj.set_cssclass("essential");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox02", "absolute", "434", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("111");
            obj.set_text("체크02");
            obj.set_cssclass("essential");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox03", "absolute", "364", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("112");
            obj.set_text("체크01");
            obj.set_value("true");
            obj.set_cssclass("essential");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new MaskEdit("MaskEdit02", "absolute", "618", "145", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("113");
            obj.set_displaynulltext("123,456,789");
            obj.set_cssclass("readonly");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Radio("Radio02", "absolute", "618", "173", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            var Radio02_innerdataset = new Dataset("Radio02_innerdataset", this.Tab00.tabpage1.div_Detail.Radio02);
            Radio02_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">선택01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">선택02</Col></Row></Rows>");
            obj.set_innerdataset(Radio02_innerdataset);
            obj.set_taborder("114");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("2");
            obj.set_direction("vertical");
            obj.set_cssclass("readonly");
            obj.set_index("1");
            obj = new Spin("Spin02", "absolute", "618", "89", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("115");
            obj.set_value("987");
            obj.set_cssclass("readonly");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Calendar("Calendar02", "absolute", "618", "61", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("116");
            obj.set_displaynulltext("2015-00-00");
            obj.set_cssclass("readonly");
            obj = new Combo("Combo02", "absolute", "618", "33", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("117");
            obj.set_text("전체선택");
            obj.set_cssclass("readonly");
            obj = new Edit("Edit02", "absolute", "618", "5", "141", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("118");
            obj.set_displaynulltext("Enabled");
            obj.set_cssclass("readonly");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox04", "absolute", "688", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("119");
            obj.set_text("체크02");
            obj.set_cssclass("readonly");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox05", "absolute", "618", "118", "71", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("120");
            obj.set_text("체크01");
            obj.set_value("true");
            obj.set_cssclass("readonly");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static18", "absolute", "508", "1", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("121");
            obj.set_text("Edit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static26", "absolute", "508", "29", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("122");
            obj.set_text("Combo");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static27", "absolute", "508", "57", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("123");
            obj.set_text("Calendar");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static28", "absolute", "508", "85", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("124");
            obj.set_text("Spin");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static29", "absolute", "508", "113", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("125");
            obj.set_text("CheckBox");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static30", "absolute", "508", "141", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("126");
            obj.set_text("MaskEdit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static31", "absolute", "508", "169", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("127");
            obj.set_text("Radio");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new MaskEdit("MaskEdit03", "absolute", "872", "145", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("128");
            obj.set_displaynulltext("123,456,789");
            obj.set_enable("false");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Radio("Radio03", "absolute", "872", "173", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            var Radio03_innerdataset = new Dataset("Radio03_innerdataset", this.Tab00.tabpage1.div_Detail.Radio03);
            Radio03_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">선택01</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">선택02</Col></Row></Rows>");
            obj.set_innerdataset(Radio03_innerdataset);
            obj.set_taborder("129");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("2");
            obj.set_direction("vertical");
            obj.set_enable("false");
            obj.set_index("1");
            obj = new Spin("Spin03", "absolute", "872", "89", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("130");
            obj.set_value("987");
            obj.set_enable("false");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Calendar("Calendar03", "absolute", "872", "61", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("131");
            obj.set_displaynulltext("2015-00-00");
            obj.set_enable("false");
            obj = new Combo("Combo03", "absolute", "872", "33", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj.set_taborder("132");
            obj.set_text("전체선택");
            obj.set_enable("false");
            obj = new Edit("Edit03", "absolute", "872", "5", "134", "21", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("133");
            obj.set_displaynulltext("Enabled");
            obj.set_enable("false");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox06", "absolute", "936", "118", "70", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("134");
            obj.set_text("체크02");
            obj.set_enable("false");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new CheckBox("CheckBox07", "absolute", "872", "118", "65", "20", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("135");
            obj.set_text("체크01");
            obj.set_value("true");
            obj.set_enable("false");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static32", "absolute", "762", "1", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("136");
            obj.set_text("Edit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static33", "absolute", "762", "29", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("137");
            obj.set_text("Combo");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static34", "absolute", "762", "57", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("138");
            obj.set_text("Calendar");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static35", "absolute", "762", "85", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("139");
            obj.set_text("Spin");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static36", "absolute", "762", "113", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("140");
            obj.set_text("CheckBox");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static37", "absolute", "762", "141", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("141");
            obj.set_text("MaskEdit");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static38", "absolute", "762", "169", "107", "29", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("142");
            obj.set_text("Radio");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static39", "absolute", "508", "197", "107", "88", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("143");
            obj.set_text("TextArea");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static40", "absolute", "508", "284", "107", "88", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("144");
            obj.set_text("TextArea");
            obj.set_cssclass("sta_WF_DetailLabel01");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new TextArea("TextArea00", "absolute", "110", "201", "395", "80", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("145");
            obj.set_displaynulltext("가나다라마바사");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new TextArea("TextArea01", "absolute", "110", "288", "395", "80", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("146");
            obj.set_cssclass("readonly");
            obj.set_displaynulltext("가나다라마바사");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new TextArea("TextArea02", "absolute", "618", "288", "388", "80", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("147");
            obj.set_enable("false");
            obj.set_displaynulltext("가나다라마바사");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new TextArea("TextArea03", "absolute", "618", "201", "388", "80", null, null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("148");
            obj.set_cssclass("essential");
            obj.set_displaynulltext("가나다라마바사");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Static("Static42", "absolute", "0", "0", null, "2", "0", null, this.Tab00.tabpage1.div_Detail);
            obj.set_taborder("150");
            obj.set_cssclass("sta_WF_DetailLine");
            this.Tab00.tabpage1.div_Detail.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.Tab00);
            obj.set_text("Tab 02");
            this.Tab00.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "1010", "0", "20", "876", null, null, this);
            obj.set_taborder("10");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "0", "856", "1010", "20", null, null, this);
            obj.set_taborder("11");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "1010", "881", "33", "22", null, null, this);
            obj.set_taborder("12");
            obj.set_text("w20");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "1037", "858", "33", "22", null, null, this);
            obj.set_taborder("13");
            obj.set_text("h20");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 43, this.div_Search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("4");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.div_Search.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 372, this.Tab00.tabpage1.div_Detail,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.set_scrollbars("none");

            	}
            );
            this.Tab00.tabpage1.div_Detail.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 0, 0, this.Tab00.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("Tab 01");

            	}
            );
            this.Tab00.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1030, 876, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Temp01_SingleDetail");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Temp01_SingleDetail.xfdl", "Lib::Comm.xjs");
        this.registerScript("Temp01_SingleDetail.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : 
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : 
        *------------------------------------------------------------------
        * MODIFY DATE   PROGRAMMER			DESCRIPTION
        *------------------------------------------------------------------
        * 
        *------------------------------------------------------------------
        ***********************************************************************************/

        /***********************************************************************************
        * Common Library
        ***********************************************************************************/
        //include "Lib::Comm.xjs";

        
        /***********************************************************************************
        * Global/Local Variable
        ***********************************************************************************/

        
        /***********************************************************************************
        * Form Event
        ***********************************************************************************/
        /**
         * form onload 함수
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.form_onload = function(obj,e)
        {
          Iject.formOnload(obj);

        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.form_onload, this);

        };

        this.loadIncludeScript("Temp01_SingleDetail.xfdl");

       
    };
}
)();
