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
                this.set_name("MainFrame");
                this.set_classname("MainFrame");
                this.set_titletext("Main");
                this._setFormPosition(0,0,1280,819);
            }
            this.style.set_background("#edefeeff");

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("TodoList", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column1\">가나다라마</Col><Col id=\"Column0\">URL('img::icon_MF_List01.png')</Col></Row><Row><Col id=\"Column1\">가나다라마바사</Col><Col id=\"Column0\">URL('img::icon_MF_List02.png')</Col></Row><Row><Col id=\"Column1\">가나다라마바사아</Col><Col id=\"Column0\">URL('img::icon_MF_List01.png')</Col></Row><Row><Col id=\"Column1\">가나다라마바사아자</Col><Col id=\"Column0\">URL('img::icon_MF_List01.png')</Col></Row><Row><Col id=\"Column1\">가나다라마</Col><Col id=\"Column0\">URL('img::icon_MF_List03.png')</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Member", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/><Column id=\"Column6\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">URL('img::img_MF_person.png')</Col></Row><Row><Col id=\"Column1\"/><Col id=\"Column3\"/><Col id=\"Column5\"/><Col id=\"Column0\">URL('img::img_MF_person.png')</Col></Row><Row><Col id=\"Column0\">URL('img::img_MF_person.png')</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Notice", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Column0\">가나다라</Col><Col id=\"Column1\">20151229</Col></Row><Row><Col id=\"Column0\">가나다라마바</Col><Col id=\"Column1\">20151229</Col></Row><Row><Col id=\"Column0\">가나다라마바사아</Col><Col id=\"Column1\">20151229</Col></Row><Row><Col id=\"Column0\">가나다라마바</Col><Col id=\"Column1\">20151229</Col></Row><Row><Col id=\"Column0\">가나다라</Col><Col id=\"Column1\">20151229</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("CalSchedule", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"SUN\" type=\"STRING\" size=\"256\"/><Column id=\"MON\" type=\"STRING\" size=\"256\"/><Column id=\"TUE\" type=\"STRING\" size=\"256\"/><Column id=\"WED\" type=\"STRING\" size=\"256\"/><Column id=\"THU\" type=\"STRING\" size=\"256\"/><Column id=\"FRI\" type=\"STRING\" size=\"256\"/><Column id=\"SAT\" type=\"STRING\" size=\"256\"/><Column id=\"SUNCON1\" type=\"STRING\" size=\"256\"/><Column id=\"MONCON1\" type=\"STRING\" size=\"256\"/><Column id=\"TUECON1\" type=\"STRING\" size=\"256\"/><Column id=\"WEDCON1\" type=\"STRING\" size=\"256\"/><Column id=\"THUCON1\" type=\"STRING\" size=\"256\"/><Column id=\"FRICON1\" type=\"STRING\" size=\"256\"/><Column id=\"SATCON1\" type=\"STRING\" size=\"256\"/><Column id=\"SUNCON2\" type=\"STRING\" size=\"256\"/><Column id=\"MONCON2\" type=\"STRING\" size=\"256\"/><Column id=\"TUECON2\" type=\"STRING\" size=\"256\"/><Column id=\"WEDCON2\" type=\"STRING\" size=\"256\"/><Column id=\"THUCON2\" type=\"STRING\" size=\"256\"/><Column id=\"FRICON2\" type=\"STRING\" size=\"256\"/><Column id=\"SATCON2\" type=\"STRING\" size=\"256\"/><Column id=\"SUNCON3\" type=\"STRING\" size=\"256\"/><Column id=\"MONCON3\" type=\"STRING\" size=\"256\"/><Column id=\"TUECON3\" type=\"STRING\" size=\"256\"/><Column id=\"WEDCON3\" type=\"STRING\" size=\"256\"/><Column id=\"THUCON3\" type=\"STRING\" size=\"256\"/><Column id=\"FRICON3\" type=\"STRING\" size=\"256\"/><Column id=\"SATCON3\" type=\"STRING\" size=\"256\"/><Column id=\"SUNCON4\" type=\"STRING\" size=\"256\"/><Column id=\"MONCON4\" type=\"STRING\" size=\"256\"/><Column id=\"TUECON4\" type=\"STRING\" size=\"256\"/><Column id=\"WEDCON4\" type=\"STRING\" size=\"256\"/><Column id=\"THUCON4\" type=\"STRING\" size=\"256\"/><Column id=\"FRICON4\" type=\"STRING\" size=\"256\"/><Column id=\"SATCON4\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"WED\">1</Col><Col id=\"THU\">2</Col><Col id=\"FRI\">3</Col><Col id=\"SAT\">4</Col><Col id=\"SUN\">28</Col><Col id=\"MON\">29</Col><Col id=\"TUE\">30</Col></Row><Row><Col id=\"SAT\">11</Col><Col id=\"SUN\">5</Col><Col id=\"MON\">6</Col><Col id=\"TUE\">7</Col><Col id=\"WED\">8</Col><Col id=\"THU\">9</Col><Col id=\"FRI\">10</Col><Col id=\"MONCON1\">URL('img::icon_MF_GrdCon1.png')</Col><Col id=\"THUCON1\">URL('img::icon_MF_GrdCon1.png')</Col><Col id=\"MONCON2\">URL('img::icon_MF_GrdCon2.png')</Col><Col id=\"THUCON2\">URL('img::icon_MF_GrdCon2.png')</Col><Col id=\"SUNCON3\"/><Col id=\"MONCON4\">URL('img::icon_MF_GrdConEtc.png')</Col><Col id=\"MONCON3\">URL('img::icon_MF_GrdCon3.png')</Col></Row><Row><Col id=\"SAT\">18</Col><Col id=\"SUN\">12</Col><Col id=\"MON\">13</Col><Col id=\"TUE\">14</Col><Col id=\"WED\">15</Col><Col id=\"THU\">16</Col><Col id=\"FRI\">17</Col><Col id=\"FRICON1\">URL('img::icon_MF_GrdCon3.png')</Col></Row><Row><Col id=\"SAT\">25</Col><Col id=\"SUN\">19</Col><Col id=\"MON\">20</Col><Col id=\"TUE\">21</Col><Col id=\"WED\">22</Col><Col id=\"THU\">23</Col><Col id=\"FRI\">24</Col><Col id=\"MONCON1\">URL('img::icon_MF_GrdCon1.png')</Col><Col id=\"WEDCON1\">URL('img::icon_MF_GrdCon1.png')</Col><Col id=\"WEDCON2\">URL('img::icon_MF_GrdCon2.png')</Col><Col id=\"WEDCON3\">URL('img::icon_MF_GrdCon3.png')</Col><Col id=\"MONCON2\">URL('img::icon_MF_GrdCon3.png')</Col><Col id=\"WEDCON4\">URL('img::icon_MF_GrdConEtc.png')</Col></Row><Row><Col id=\"SAT\">1</Col><Col id=\"SUN\">26</Col><Col id=\"MON\">27</Col><Col id=\"TUE\">28</Col><Col id=\"WED\">29</Col><Col id=\"THU\">30</Col><Col id=\"FRI\">31</Col></Row><Row><Col id=\"SAT\">8</Col><Col id=\"SUN\">2</Col><Col id=\"MON\">3</Col><Col id=\"TUE\">4</Col><Col id=\"WED\">5</Col><Col id=\"THU\">6</Col><Col id=\"FRI\">7</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("Div00", "absolute", "20", "20", "414", "736", null, null, this);
            obj.set_taborder("0");
            obj.set_cssclass("div_MF_Article");
            this.addChild(obj.name, obj);
            obj = new Static("Static12", "absolute", "-4", "531", "416", "203", null, null, this.Div00);
            obj.set_taborder("0");
            obj.set_cssclass("sta_MF_TodoArea");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "36", "605", "80", "59", null, null, this.Div00);
            obj.set_taborder("2");
            obj.set_text("29");
            obj.set_cssclass("sta_MF_SelectDay");
            obj.set_usedecorate("true");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static00", "absolute", "22", "553", "127", "20", null, null, this.Div00);
            obj.set_taborder("1");
            obj.set_cssclass("sta_MF_TodoTitle");
            obj.set_text("To-do List");
            this.Div00.addChild(obj.name, obj);
            obj = new Combo("Combo00", "absolute", "269", "551", "124", "21", null, null, this.Div00);
            this.Div00.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj.set_text("전체보기");
            obj = new Grid("Grid00", "absolute", "151", "585", "243", "123", null, null, this.Div00);
            obj.set_taborder("5");
            obj.set_binddataset("TodoList");
            obj.set_cssclass("grd_MF_TodoList");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"23\"/><Column size=\"174\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"image\" text=\"bind:Column0\"/><Cell col=\"1\" displaytype=\"text\" text=\"bind:Column1\"/></Band></Format></Formats>");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", "252", "713", "20", "15", null, null, this.Div00);
            obj.set_taborder("6");
            obj.set_cssclass("btn_MF_TodoView");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "28", "673", "85", "19", null, null, this.Div00);
            obj.set_taborder("7");
            obj.set_cssclass("sta_MF_Number");
            obj.set_text("12");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "123", "97", "161", "47", null, null, this.Div00);
            obj.set_taborder("8");
            obj.set_text("2015.07.01");
            obj.set_cssclass("sta_MF_CalDate");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button01", "absolute", "92", "109", "24", "24", null, null, this.Div00);
            obj.set_taborder("9");
            obj.set_cssclass("btn_MF_CalPrev");
            this.Div00.addChild(obj.name, obj);
            obj = new Button("Button02", "absolute", "291", "109", "24", "24", null, null, this.Div00);
            obj.set_taborder("10");
            obj.set_cssclass("btn_MF_CalNext");
            this.Div00.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "97", "638", "18", "21", null, null, this.Div00);
            obj.set_taborder("11");
            obj.set_text("일");
            obj.set_cssclass("sta_MF_Day");
            this.Div00.addChild(obj.name, obj);
            obj = new Grid("Grid01", "absolute", "20", "138", "373", "376", null, null, this.Div00);
            obj.set_taborder("12");
            obj.set_cssclass("grd_MF_Cal");
            obj.set_binddataset("CalSchedule");
            obj.set_autofittype("col");
            obj.set_selecttype("area");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/><Column size=\"13\"/></Columns><Rows><Row size=\"40\" band=\"head\"/><Row size=\"16\"/><Row size=\"40\"/></Rows><Band id=\"head\"><Cell colspan=\"4\" style=\"color:#f96362ff;color2:#f96362ff;\" text=\"SUN\"/><Cell col=\"4\" colspan=\"4\" text=\"MON\"/><Cell col=\"8\" colspan=\"4\" text=\"TUE\"/><Cell col=\"12\" colspan=\"4\" text=\"WED\"/><Cell col=\"16\" colspan=\"4\" text=\"THU\"/><Cell col=\"20\" colspan=\"4\" text=\"FRI\"/><Cell col=\"24\" colspan=\"4\" style=\"color:#51b5baff;color2:#51b5baff;\" text=\"SAT\"/></Band><Band id=\"body\"><Cell rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SUNCON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SUNCON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SUNCON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080ff,1 solid #d8d8d8ff,0 none #808080ff,0 none #808080ff;\" text=\"bind:SUNCON4\"/><Cell row=\"1\" colspan=\"4\" style=\"color:#f96362ff;color2:#f96362ff;\" text=\"bind:SUN\"/></Cell><Cell col=\"4\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:MONCON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:MONCON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:MONCON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080,1 solid #d8d8d8ff,0 none #808080,0 none #808080;\" text=\"bind:MONCON4\"/><Cell row=\"1\" colspan=\"4\" style=\"padding: ;\" text=\"bind:MON\"/></Cell><Cell col=\"8\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:TUECON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:TUECON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:TUECON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080ff,1 solid #d8d8d8ff,0 none #808080ff,0 none #808080ff;\" text=\"bind:TUECON4\"/><Cell row=\"1\" colspan=\"4\" text=\"bind:TUE\"/></Cell><Cell col=\"12\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:WEDCON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:WEDCON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:WEDCON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080ff,1 solid #d8d8d8ff,0 none #808080ff,0 none #808080ff;\" text=\"bind:WEDCON4\"/><Cell row=\"1\" colspan=\"4\" text=\"bind:WED\"/></Cell><Cell col=\"16\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:THUCON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:THUCON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:THUCON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080ff,1 solid #d8d8d8ff,0 none #808080ff,0 none #808080ff;\" text=\"bind:THUCON4\"/><Cell row=\"1\" colspan=\"4\" text=\"bind:THU\"/></Cell><Cell col=\"20\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:FRICON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:FRICON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:FRICON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none #808080ff,1 solid #d8d8d8ff,0 none #808080ff,0 none #808080ff;\" text=\"bind:FRICON4\"/><Cell row=\"1\" colspan=\"4\" text=\"bind:FRI\"/></Cell><Cell col=\"24\" rowspan=\"2\" colspan=\"4\"><Cell displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SATCON1\"/><Cell col=\"1\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SATCON2\"/><Cell col=\"2\" displaytype=\"image\" style=\"line:0 none;\" text=\"bind:SATCON3\"/><Cell col=\"3\" displaytype=\"image\" style=\"line:0 none,1 solid #d8d8d8,0 none,0 none;\" text=\"bind:SATCON4\"/><Cell row=\"1\" colspan=\"4\" style=\"color:#51b5baff;color2:#51b5baff;\" text=\"bind:SAT\"/></Cell></Band></Format></Formats>");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "20", "0", "1260", "20", null, null, this);
            obj.set_taborder("1");
            obj.set_visible("false");
            obj.style.set_background("#74cfdcff");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "0", "0", "20", "818", null, null, this);
            obj.set_taborder("2");
            obj.set_visible("false");
            obj.style.set_background("#74cfdcff");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Div("Div01", "absolute", "444", "20", "836", "238", null, null, this);
            obj.set_taborder("3");
            obj.set_cssclass("div_MF_Article");
            this.addChild(obj.name, obj);
            obj = new Static("st_name", "absolute", "33", "60", "97", "130", null, null, this.Div01);
            obj.set_taborder("0");
            obj.set_cssclass("sta_MF_Name");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "174", "33", "218", "40", null, null, this.Div01);
            obj.set_taborder("1");
            obj.set_text("General Manager\r\n<b v='true'>C.C / Design Team</b>");
            obj.set_cssclass("sta_MF_Group");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "169", "109", "110", "21", null, null, this.Div01);
            obj.set_taborder("2");
            obj.set_text("최근 접속일");
            obj.set_cssclass("sta_MF_Label");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static03", "absolute", "169", "130", "110", "21", null, null, this.Div01);
            obj.set_taborder("3");
            obj.set_text("쪽지");
            obj.set_cssclass("sta_MF_Label");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "169", "151", "110", "21", null, null, this.Div01);
            obj.set_taborder("4");
            obj.set_text("메일");
            obj.set_cssclass("sta_MF_Label");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static05", "absolute", "169", "172", "110", "21", null, null, this.Div01);
            obj.set_taborder("5");
            obj.set_text("TodoList");
            obj.set_cssclass("sta_MF_Label");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static06", "absolute", "169", "193", "110", "21", null, null, this.Div01);
            obj.set_taborder("6");
            obj.set_text("결재대기");
            obj.set_cssclass("sta_MF_Label");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static07", "absolute", "279", "130", "96", "21", null, null, this.Div01);
            obj.set_taborder("7");
            obj.set_text("<b v='true'>25</b> 건");
            obj.set_cssclass("sta_MF_Data");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static08", "absolute", "279", "151", "96", "21", null, null, this.Div01);
            obj.set_taborder("8");
            obj.set_text("<b v='true'>4</b> 건");
            obj.set_cssclass("sta_MF_Data");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static09", "absolute", "279", "172", "96", "21", null, null, this.Div01);
            obj.set_taborder("9");
            obj.set_text("<b v='true'>6</b> 건");
            obj.set_cssclass("sta_MF_Data");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static10", "absolute", "279", "193", "96", "21", null, null, this.Div01);
            obj.set_taborder("10");
            obj.set_text("<b v='true'>1</b> 건");
            obj.set_cssclass("sta_MF_Data");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static11", "absolute", "279", "109", "96", "21", null, null, this.Div01);
            obj.set_taborder("11");
            obj.set_text("<b v='true'>2015.12.29</b>");
            obj.set_cssclass("sta_MF_Data");
            obj.set_usedecorate("true");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static12", "absolute", "51.68%", "0", null, "236", "10", null, this.Div01);
            obj.set_taborder("12");
            obj.set_cssclass("sta_MF_SearchArea");
            this.Div01.addChild(obj.name, obj);
            obj = new Edit("Edit00", "absolute", "52.88%", "16", null, "30", "13", null, this.Div01);
            obj.set_taborder("14");
            obj.set_cssclass("edi_MF_Search");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static13", "absolute", "52.88%", "16", "112", "30", null, null, this.Div01);
            obj.set_taborder("13");
            obj.set_text("Member Search");
            obj.set_cssclass("sta_MF_Search");
            this.Div01.addChild(obj.name, obj);
            obj = new Button("Button00", "absolute", null, "16", "30", "30", "13", null, this.Div01);
            obj.set_taborder("15");
            obj.set_cssclass("btn_MF_Search");
            this.Div01.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "53%", "57", "375", "160", null, null, this.Div01);
            obj.set_taborder("16");
            obj.set_cssclass("grd_MF_Member");
            obj.set_binddataset("Member");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"55\"/><Column size=\"12\"/><Column size=\"90\"/><Column size=\"15\"/><Column size=\"90\"/><Column size=\"12\"/><Column size=\"105\"/></Columns><Rows><Row size=\"24\"/><Row size=\"24\"/><Row size=\"5\"/></Rows><Band id=\"body\"><Cell rowspan=\"2\" displaytype=\"image\" text=\"bind:Column0\"/><Cell col=\"1\" colspan=\"6\" displaytype=\"text\" cssclass=\"Cellgrd_MF_Belong\" text=\"C.C / Design Team   홍길동 \"/><Cell row=\"1\" col=\"1\" style=\"padding: ;\" cssclass=\"Cellgrd_MF_Info\" text=\"T\"/><Cell row=\"1\" col=\"2\" displaytype=\"text\" text=\"02.2214.1234\"/><Cell row=\"1\" col=\"3\" cssclass=\"Cellgrd_MF_Info\" text=\"M\"/><Cell row=\"1\" col=\"4\" displaytype=\"text\" text=\"010.4568.9101\"/><Cell row=\"1\" col=\"5\" cssclass=\"Cellgrd_MF_Info\" text=\"E\"/><Cell row=\"1\" col=\"6\" displaytype=\"text\" text=\"tobe@toce.com\"/><Cell row=\"2\" colspan=\"7\"/></Band></Format></Formats>");
            this.Div01.addChild(obj.name, obj);
            obj = new Static("Static14", "absolute", "174", "93", "206", "10", null, null, this.Div01);
            obj.set_taborder("17");
            obj.set_cssclass("sta_MF_line");
            this.Div01.addChild(obj.name, obj);

            obj = new Div("Div02", "absolute", "444", "268", "413", "274", null, null, this);
            obj.set_taborder("4");
            obj.set_cssclass("div_MF_Article");
            this.addChild(obj.name, obj);
            obj = new Static("Static12", "absolute", "0", "8", null, "39", "0", null, this.Div02);
            obj.set_taborder("0");
            obj.set_cssclass("sta_MF_ChartTitle");
            obj.set_text("Chart A");
            this.Div02.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "8.52%", "22.43%", null, "66.91%", "24", null, this.Div02);
            obj.set_taborder("3");
            obj.style.set_background("transparent URL('img::img_MF_ChartGraphA.png')");
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div03", "absolute", "866", "268", "409", "274", null, null, this);
            obj.set_taborder("5");
            obj.set_cssclass("div_MF_Article");
            this.addChild(obj.name, obj);
            obj = new Static("Static12", "absolute", "0", "0", null, "39", "0", null, this.Div03);
            obj.set_taborder("0");
            obj.set_cssclass("sta_MF_ChartTitle");
            obj.set_text("Chart B");
            this.Div03.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "6.81%", "61", null, "182", "7.54%", null, this.Div03);
            obj.set_taborder("1");
            obj.style.set_background("transparent URL('img::img_MF_ChartGraphB.png')");
            this.Div03.addChild(obj.name, obj);

            obj = new Div("Div04", "absolute", "444", "552", "836", "204", null, null, this);
            obj.set_taborder("6");
            obj.set_cssclass("div_MF_Article");
            this.addChild(obj.name, obj);
            obj = new Tab("Tab00", "absolute", "-1", "1", null, null, "0", "0", this.Div04);
            obj.set_taborder("0");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            obj.set_cssclass("tab_MF_Notice");
            this.Div04.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Div04.Tab00);
            obj.set_text("tabpage1");
            obj.style.set_background("#fafafaff");
            this.Div04.Tab00.addChild(obj.name, obj);
            obj = new Grid("Grid00", "absolute", "27", "19", "358", "138", null, null, this.Div04.Tab00.tabpage1);
            obj.set_taborder("0");
            obj.set_cssclass("grd_MF_Notice");
            obj.set_binddataset("Notice");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"262\"/><Column size=\"95\"/></Columns><Rows><Row size=\"22\" band=\"head\"/><Row size=\"22\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" displaytype=\"text\" text=\"News\"/></Band><Band id=\"body\"><Cell cssclass=\"Cellgrd_MF_Notice\" text=\"bind:Column0\"/><Cell col=\"1\" displaytype=\"date\" cssclass=\"Cellgrd_MF_Right\" text=\"bind:Column1\"/></Band></Format></Formats>");
            this.Div04.Tab00.tabpage1.addChild(obj.name, obj);
            obj = new Grid("Grid01", "absolute", "455", "19", "358", "138", null, null, this.Div04.Tab00.tabpage1);
            obj.set_cssclass("grd_MF_Notice");
            obj.set_taborder("1");
            obj.set_binddataset("Notice");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"262\"/><Column size=\"95\"/></Columns><Rows><Row size=\"22\" band=\"head\"/><Row size=\"22\"/></Rows><Band id=\"head\"><Cell colspan=\"2\" displaytype=\"text\" text=\"Notice\"/></Band><Band id=\"body\"><Cell cssclass=\"Cellgrd_MF_Notice\" text=\"bind:Column0\"/><Cell col=\"1\" displaytype=\"date\" cssclass=\"Cellgrd_MF_Right\" text=\"bind:Column1\"/></Band></Format></Formats>");
            this.Div04.Tab00.tabpage1.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.Div04.Tab00);
            obj.set_text("tabpage2");
            obj.style.set_background("#fafafaff");
            this.Div04.Tab00.addChild(obj.name, obj);
            obj = new Tabpage("tabpage3", this.Div04.Tab00);
            obj.set_text("tabpage3");
            obj.style.set_background("#fafafaff");
            this.Div04.Tab00.addChild(obj.name, obj);
            obj = new Tabpage("tabpage4", this.Div04.Tab00);
            obj.set_text("tabpage4");
            obj.style.set_background("#fafafaff");
            this.Div04.Tab00.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "20", "20", "414", "86", null, null, this);
            obj.set_taborder("18");
            obj.set_cssclass("sta_MF_ScheduleArea");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "125", "36", "54", "54", null, null, this);
            obj.set_taborder("19");
            obj.set_cssclass("btn_MF_Cal");
            this.addChild(obj.name, obj);

            obj = new Static("Static07", "absolute", "1266", "22", "13", "234", null, null, this);
            obj.set_taborder("22");
            obj.set_visible("false");
            obj.style.set_background("#74cfdcff");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "200", "36", "55", "54", null, null, this);
            obj.set_taborder("20");
            obj.set_cssclass("btn_MF_List");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "275", "36", "54", "54", null, null, this);
            obj.set_taborder("21");
            obj.set_cssclass("btn_MF_New");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "57", "988", "54", "56", null, null, this);
            obj.set_taborder("35");
            obj.set_text("1");
            obj.style.set_background("#f1f1f1ff");
            obj.style.set_border("1 solid #d8d8d8ff");
            obj.style.set_color("#c8c8c8ff");
            obj.style.set_padding("25 0 0 0");
            obj.style.set_align("center top");
            obj.style.set_font("bold 9 Tahoma");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "112", "990", "30", "9", null, null, this);
            obj.set_taborder("36");
            obj.set_visible("false");
            obj.style.set_border("1 solid red,0 none #808080,0 none #808080,0 none #808080");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "150", "979", "155", "42", null, null, this);
            obj.set_taborder("37");
            obj.set_text("background: #f1f1f1\r\nborder : 1 solid #d8d8d8");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "130", "1042", "140", "42", null, null, this);
            obj.set_taborder("38");
            obj.set_text("font : bold 9 Tahoma\r\ncolor : #c8c8c8");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "83", "1030", "30", "24", null, null, this);
            obj.set_taborder("40");
            obj.set_visible("false");
            obj.style.set_border("0 none #808080,0 none #808080,1 solid red,1 solid red");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "380", "993", "30", "9", null, null, this);
            obj.set_taborder("41");
            obj.set_visible("false");
            obj.style.set_border("1 solid red,0 none #808080,0 none #808080,0 none #808080");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "325", "987", "54", "56", null, null, this);
            obj.set_taborder("45");
            obj.set_text("1");
            obj.style.set_background("#3586ccff");
            obj.style.set_border("1 solid #d8d8d8ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_padding("25 0 0 0");
            obj.style.set_align("center top");
            obj.style.set_font("bold 9 Tahoma");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "351", "1030", "30", "24", null, null, this);
            obj.set_taborder("44");
            obj.set_visible("false");
            obj.style.set_border("0 none #808080,0 none #808080,1 solid red,1 solid red");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "418", "979", "155", "42", null, null, this);
            obj.set_taborder("42");
            obj.set_text("background: #3586cc\r\nborder : 1 solid #d8d8d8");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "398", "1042", "140", "42", null, null, this);
            obj.set_taborder("43");
            obj.set_text("font : bold 9 Tahoma\r\ncolor : #ffffff");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "60", "947", "183", "28", null, null, this);
            obj.set_taborder("46");
            obj.set_text("Calendar_Disabled\r\n클래스 : Cellgrd_MF_disabled");
            obj.set_visible("false");
            obj.style.set_linespace("4");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "328", "955", "110", "19", null, null, this);
            obj.set_taborder("47");
            obj.set_text("Calendar_Selected");
            obj.set_visible("false");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 414, 736, this.Div00,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.set_cssclass("div_MF_Article");

            	}
            );
            this.Div00.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 836, 238, this.Div01,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("3");
            		p.set_cssclass("div_MF_Article");

            	}
            );
            this.Div01.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 413, 274, this.Div02,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("4");
            		p.set_cssclass("div_MF_Article");

            	}
            );
            this.Div02.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 409, 274, this.Div03,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("5");
            		p.set_cssclass("div_MF_Article");

            	}
            );
            this.Div03.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 807, 146, this.Div04.Tab00.tabpage1,
            	//-- Layout function
            	function(p) {
            		p.set_text("tabpage1");
            		p.style.set_background("#fafafaff");

            	}
            );
            this.Div04.Tab00.tabpage1.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 836, 204, this.Div04,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("6");
            		p.set_cssclass("div_MF_Article");

            	}
            );
            this.Div04.addLayout(obj.name, obj);

            //-- Default Layout
            obj = new Layout("default", "", 1280, 819, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("MainFrame");
            		p.style.set_background("#edefeeff");
            		p.set_titletext("Main");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("MainFrame.xfdl", "Lib::Comm.xjs");
        this.registerScript("MainFrame.xfdl", function() {
        /***********************************************************************************
        * SYSTEM      : 넥사크로플랫폼 PackageB
        * BUSINESS    : 넥사크로플랫폼 PackageB
        * FILE NAME   : MainFrame.xfdl
        * PROGRAMMER  : 
        * DATE        : 
        * DESCRIPTION : MainFrame
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
        this.MainFrame_onload = function(obj,e)
        {
        this.on_size();
        }

        
        /**
         * 사용자명 셋팅
         * @return 
         * @example
         *
         * @memberOf this
         */
        this.fn_set = function()
        {	
        	this.Div01.st_name.set_text(Iject.$["usernm"]);
        }

        this.MainFrame_onsize = function(obj,e)
        {
        	//this.Div01.
        	this.on_size();
        	
        	
        }

        //mainframe onsize
        this.on_size = function()
        {
           if(application.mainframe.width < 1303)
        	{
        	   this.Div01.set_width(840);
        	   this.Div02.set_width(417 + "px");
        	   this.Div03.set_left(866 + "px");	       
        	   this.Div03.set_width(417 + "px");
        	   this.Div04.set_width(840);
        	   
        	}
        	else
        	{
        	   this.Div01.set_right(14);
        	   this.Div02.set_right(33.05 + "%");
        	   this.Div03.set_left(67.66 + "%");
        	   this.Div03.set_right(15);
        	   this.Div04.set_right(15);
        	}
        }
        
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.MainFrame_onload, this);
            this.addEventHandler("onsize", this.MainFrame_onsize, this);
            this.Div01.Static07.addEventHandler("onclick", this.Div01_Static07_onclick, this);
            this.Div01.Static12.addEventHandler("onclick", this.Div01_Static12_onclick, this);

        };

        this.loadIncludeScript("MainFrame.xfdl");

       
    };
}
)();
