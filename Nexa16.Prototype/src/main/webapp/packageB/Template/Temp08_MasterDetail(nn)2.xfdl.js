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
            obj = new Dataset("Grid", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"순번\" type=\"STRING\" size=\"256\"/><Column id=\"Column01\" type=\"STRING\" size=\"256\"/><Column id=\"Column02\" type=\"STRING\" size=\"256\"/><Column id=\"Column03\" type=\"STRING\" size=\"256\"/><Column id=\"Column04\" type=\"STRING\" size=\"256\"/><Column id=\"Column05\" type=\"STRING\" size=\"256\"/><Column id=\"Column06\" type=\"STRING\" size=\"256\"/><Column id=\"Column07\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"순번\">1</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">전체</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">2</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">전체</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">3</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">전체</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">4</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">전체</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">5</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">6</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">7</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">8</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">9</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">10</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column0\"/></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">11</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">12</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">13</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">14</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">15</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">16</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">17</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">18</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">19</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">20</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">21</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">22</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">23</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">24</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">25</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">26</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"Column0\"/><Col id=\"순번\">27</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">28</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">29</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">30</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">31</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">32</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">33</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">34</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">35</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row><Row><Col id=\"순번\">36</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column02\">전체</Col><Col id=\"Column03\">2015-00-00</Col><Col id=\"Column04\">expand</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column07\">버튼</Col><Col id=\"Column0\"/></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Div("div_Search", "absolute", "0", "0", null, "43", "20", null, this);
            obj.set_taborder("0");
            obj.set_cssclass("div_WF_SearchBg");
            this.addChild(obj.name, obj);
            obj = new Edit("Edit04", "absolute", "104", "10", "132", "21", null, null, this.div_Search);
            obj.set_taborder("1");
            obj.set_cssclass("edt_WF_Search");
            this.div_Search.addChild(obj.name, obj);
            obj = new Button("Button06", "absolute", "235", "10", "21", "21", null, null, this.div_Search);
            obj.set_taborder("2");
            obj.set_cssclass("btn_WF_SearchSmall");
            this.div_Search.addChild(obj.name, obj);
            obj = new Combo("Combo00", "absolute", "371", "10", "152", "21", null, null, this.div_Search);
            this.div_Search.addChild(obj.name, obj);
            obj.set_taborder("3");
            obj = new Calendar("Calendar00", "absolute", "638", "10", "152", "21", null, null, this.div_Search);
            this.div_Search.addChild(obj.name, obj);
            obj.set_taborder("4");
            obj = new Button("Button05", "absolute", null, "8", "60", "25", "11", null, this.div_Search);
            obj.set_taborder("6");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.div_Search.addChild(obj.name, obj);
            obj = new Static("Static01", "absolute", "19", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("7");
            obj.set_text("조회라벨01");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);
            obj = new Static("Static02", "absolute", "286", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("8");
            obj.set_text("조회라벨02");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);
            obj = new Static("Static04", "absolute", "553", "10", "85", "21", null, null, this.div_Search);
            obj.set_taborder("10");
            obj.set_text("조회라벨03");
            obj.set_cssclass("sta_WF_SearchLabel");
            this.div_Search.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "2", "60", "250", "21", null, null, this);
            obj.set_taborder("1");
            obj.set_text("리스트 그리드");
            obj.set_cssclass("sta_WF_SubTitle1");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "517", "60", "312", "21", null, null, this);
            obj.set_taborder("13");
            obj.set_text("리스트 그리드");
            obj.set_cssclass("sta_WF_SubTitle1");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", null, "64", "100", "12", "319", null, this);
            obj.set_taborder("22");
            obj.set_text("Custom Button");
            obj.set_cssclass("btn_WF_Custom");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", null, "64", "65", "12", "254", null, this);
            obj.set_taborder("23");
            obj.set_text("행추가");
            obj.set_cssclass("btn_WF_Add");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", null, "64", "65", "12", "189", null, this);
            obj.set_taborder("24");
            obj.set_text("행삭제");
            obj.set_cssclass("btn_WF_Delete");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", null, "60", "79", "21", "109", null, this);
            obj.set_taborder("25");
            obj.set_text("다운로드");
            obj.set_cssclass("btn_WF_Download");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", null, "60", "67", "21", "43", null, this);
            obj.set_taborder("26");
            obj.set_text("업로드");
            obj.set_cssclass("btn_WF_Upload");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", null, "60", "21", "21", "20", null, this);
            obj.set_taborder("27");
            obj.set_cssclass("btn_WF_Extend");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "196", "64", "65", "12", null, null, this);
            obj.set_taborder("29");
            obj.set_text("행추가");
            obj.set_cssclass("btn_WF_Add");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "261", "64", "65", "12", null, null, this);
            obj.set_taborder("30");
            obj.set_text("행삭제");
            obj.set_cssclass("btn_WF_Delete");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "327", "60", "79", "21", null, null, this);
            obj.set_taborder("31");
            obj.set_text("다운로드");
            obj.set_cssclass("btn_WF_Download");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "405", "60", "67", "21", null, null, this);
            obj.set_taborder("32");
            obj.set_text("업로드");
            obj.set_cssclass("btn_WF_Upload");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "474", "60", "21", "21", null, null, this);
            obj.set_taborder("33");
            obj.set_cssclass("btn_WF_Extend");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "0", "86", "495", null, null, "20", this);
            obj.set_taborder("34");
            obj.set_binddataset("Grid");
            obj.set_scrollbars("autovert");
            obj.set_autofittype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"48\"/><Column size=\"153\"/><Column size=\"150\"/><Column size=\"152\"/><Column size=\"138\"/><Column size=\"143\"/><Column size=\"104\"/><Column size=\"80\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"28\"/><Row size=\"28\" band=\"summ\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"Column0\"/><Cell col=\"1\" text=\"No.\"/><Cell col=\"2\" cssclass=\"CellEssential\" text=\"Essential Edit\"/><Cell col=\"3\" text=\"Combo\"/><Cell col=\"4\" text=\"Calendar\"/><Cell col=\"5\" text=\"Expand\"/><Cell col=\"6\" text=\"Text\"/><Cell col=\"7\" text=\"Number\"/><Cell col=\"8\" text=\"Button\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"bind:Column0\"/><Cell col=\"1\" style=\"align:center middle;\" text=\"bind:순번\"/><Cell col=\"2\" displaytype=\"text\" edittype=\"text\" style=\"padding:3 3 3 3;\" text=\"bind:Column01\" editdisplay=\"display\"/><Cell col=\"3\" displaytype=\"combo\" edittype=\"combo\" style=\"padding:3 3 3 3;\" text=\"bind:Column02\" combodisplay=\"display\"/><Cell col=\"4\" displaytype=\"date\" edittype=\"date\" style=\"padding:3 3 3 3;\" text=\"bind:Column03\" calendardisplay=\"display\" calendardisplaynulltype=\"default\"/><Cell col=\"5\" displaytype=\"text\" edittype=\"expand\" style=\"padding:3 3 3 3;\" text=\"bind:Column04\" expandshow=\"show\" expandsize=\"21\" expandimage=\"URL('img::btn_WF_SearchSmall.png')\"/><Cell col=\"6\" style=\"padding:3 3 3 3;\" text=\"bind:Column05\"/><Cell col=\"7\" style=\"align:right middle;padding:3 3 3 3;\" text=\"bind:Column06\"/><Cell col=\"8\" displaytype=\"button\" edittype=\"button\" style=\"align:center middle;padding:3 3 3 3;\" text=\"bind:Column07\"/></Band><Band id=\"summary\"><Cell colspan=\"7\" style=\"align:center middl;\" text=\"합계\"/><Cell col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 11 0 0;\" text=\"321456789\" mask=\"###,###,###\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid02", "absolute", "515", "86", null, null, "20", "20", this);
            obj.set_taborder("36");
            obj.set_binddataset("Grid");
            obj.set_scrollbars("autovert");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"48\"/><Column size=\"153\"/><Column size=\"150\"/><Column size=\"152\"/><Column size=\"138\"/><Column size=\"143\"/><Column size=\"104\"/><Column size=\"80\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"28\"/><Row size=\"28\" band=\"summ\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"Column0\"/><Cell col=\"1\" text=\"No.\"/><Cell col=\"2\" cssclass=\"CellEssential\" text=\"Essential Edit\"/><Cell col=\"3\" text=\"Combo\"/><Cell col=\"4\" text=\"Calendar\"/><Cell col=\"5\" text=\"Expand\"/><Cell col=\"6\" text=\"Text\"/><Cell col=\"7\" text=\"Number\"/><Cell col=\"8\" text=\"Button\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"bind:Column0\"/><Cell col=\"1\" style=\"align:center middle;\" text=\"bind:순번\"/><Cell col=\"2\" displaytype=\"text\" edittype=\"text\" style=\"padding:3 3 3 3;\" text=\"bind:Column01\" editdisplay=\"display\"/><Cell col=\"3\" displaytype=\"combo\" edittype=\"combo\" style=\"padding:3 3 3 3;\" text=\"bind:Column02\" combodisplay=\"display\"/><Cell col=\"4\" displaytype=\"date\" edittype=\"date\" style=\"padding:3 3 3 3;\" text=\"bind:Column03\" calendardisplay=\"display\" calendardisplaynulltype=\"default\"/><Cell col=\"5\" displaytype=\"text\" edittype=\"expand\" style=\"padding:3 3 3 3;\" text=\"bind:Column04\" expandshow=\"show\" expandsize=\"21\" expandimage=\"URL('img::btn_WF_SearchSmall.png')\"/><Cell col=\"6\" style=\"padding:3 3 3 3;\" text=\"bind:Column05\"/><Cell col=\"7\" style=\"align:right middle;padding:3 3 3 3;\" text=\"bind:Column06\"/><Cell col=\"8\" displaytype=\"button\" edittype=\"button\" style=\"align:center middle;padding:3 3 3 3;\" text=\"bind:Column07\"/></Band><Band id=\"summary\"><Cell colspan=\"7\" style=\"align:center middle;\" text=\"합계\"/><Cell col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 11 0 0;\" text=\"321456789\" mask=\"###,###,###\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "1010", "0", "20", "876", null, null, this);
            obj.set_taborder("37");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "0", "856", "1010", "20", null, null, this);
            obj.set_taborder("38");
            obj.set_visible("false");
            obj.style.set_background("#ff7272ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "1010", "881", "33", "22", null, null, this);
            obj.set_taborder("39");
            obj.set_text("w20");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "1037", "858", "33", "22", null, null, this);
            obj.set_taborder("40");
            obj.set_text("h20");
            obj.set_visible("false");
            obj.style.set_color("red");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 0, 43, this.div_Search,
            	//-- Layout function
            	function(p) {
            		p.set_taborder("0");
            		p.set_cssclass("div_WF_SearchBg");

            	}
            );
            this.div_Search.addLayout(obj.name, obj);

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
        this.addIncludeScript("Temp08_MasterDetail(nn)2.xfdl", "Lib::Comm.xjs");
        this.registerScript("Temp08_MasterDetail(nn)2.xfdl", function() {
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

        this.loadIncludeScript("Temp08_MasterDetail(nn)2.xfdl");

       
    };
}
)();
