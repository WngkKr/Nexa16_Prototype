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
                this.set_name("Guide01");
                this.set_classname("Guide01");
                this.set_titletext("New Form");
                this.set_cssclass("tab_bottom");
                this._setFormPosition(0,0,1024,3789);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Menu", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Caption\" type=\"STRING\" size=\"256\"/><Column id=\"Id\" type=\"STRING\" size=\"256\"/><Column id=\"Level\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Caption\">2depth Menu01</Col><Col id=\"Id\">00001</Col><Col id=\"Level\">0</Col></Row><Row><Col id=\"Caption\">3depth Menu01</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00002</Col></Row><Row><Col id=\"Caption\">3depth Menu02</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00003</Col></Row><Row><Col id=\"Caption\">3depth Menu03</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00004</Col></Row><Row><Col id=\"Caption\">3depth Menu04</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00005</Col></Row><Row><Col id=\"Caption\">3depth Menu05</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00006</Col></Row><Row><Col id=\"Caption\">3depth Menu06</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00007</Col></Row><Row><Col id=\"Caption\">2depth Menu02</Col><Col id=\"Id\">00008</Col><Col id=\"Level\">0</Col></Row><Row><Col id=\"Caption\">3depth Menu01</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00009</Col></Row><Row><Col id=\"Caption\">3depth Menu02</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00010</Col></Row><Row><Col id=\"Caption\">3depth Menu03</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00011</Col></Row><Row><Col id=\"Caption\">3depth Menu04</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00012</Col></Row><Row><Col id=\"Caption\">3depth Menu05</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00013</Col></Row><Row><Col id=\"Caption\">3depth Menu06</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00014</Col></Row><Row><Col id=\"Caption\">2depth Menu03</Col><Col id=\"Id\">00015</Col><Col id=\"Level\">0</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu01</Col><Col id=\"Id\">00016</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu02</Col><Col id=\"Id\">00017</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu03</Col><Col id=\"Id\">00018</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu04</Col><Col id=\"Id\">00019</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu05</Col><Col id=\"Id\">00020</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu06</Col><Col id=\"Id\">00021</Col></Row><Row><Col id=\"Caption\">2depth Menu04</Col><Col id=\"Id\">00022</Col><Col id=\"Level\">0</Col></Row><Row><Col id=\"Caption\">3depth Menu01</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00023</Col></Row><Row><Col id=\"Caption\">3depth Menu02</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00024</Col></Row><Row><Col id=\"Caption\">3depth Menu03</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00025</Col></Row><Row><Col id=\"Caption\">3depth Menu04</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00026</Col></Row><Row><Col id=\"Caption\">3depth Menu05</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00027</Col></Row><Row><Col id=\"Caption\">3depth Menu06</Col><Col id=\"Level\">1</Col><Col id=\"Id\">00028</Col></Row><Row><Col id=\"Caption\">2depth Menu05</Col><Col id=\"Id\">00029</Col><Col id=\"Level\">0</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu01</Col><Col id=\"Id\">00030</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu02</Col><Col id=\"Id\">00031</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu03</Col><Col id=\"Id\">00032</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu04</Col><Col id=\"Id\">00033</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu05</Col><Col id=\"Id\">00034</Col></Row><Row><Col id=\"Level\">1</Col><Col id=\"Caption\">3depth Menu06</Col><Col id=\"Id\">00035</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Grid", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"순번\" type=\"STRING\" size=\"256\"/><Column id=\"Column01\" type=\"STRING\" size=\"256\"/><Column id=\"Column02\" type=\"STRING\" size=\"256\"/><Column id=\"Column03\" type=\"STRING\" size=\"256\"/><Column id=\"Column04\" type=\"STRING\" size=\"256\"/><Column id=\"Column05\" type=\"STRING\" size=\"256\"/><Column id=\"Column06\" type=\"STRING\" size=\"256\"/><Column id=\"Column07\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"순번\">1</Col><Col id=\"Column05\">가</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">전체</Col><Col id=\"lev\">0</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">2</Col><Col id=\"Column05\">가나</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">가</Col><Col id=\"lev\">0</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">3</Col><Col id=\"Column05\">가나다</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">가나</Col><Col id=\"lev\">0</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">4</Col><Col id=\"Column05\">가나다라</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라</Col><Col id=\"Column04\">expand</Col><Col id=\"Column02\">가나다</Col><Col id=\"lev\">0</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">5</Col><Col id=\"Column05\">가나다라마</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">6</Col><Col id=\"Column05\">가나다라마바</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">7</Col><Col id=\"Column05\">가나다라마바사</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">8</Col><Col id=\"Column05\">가나다라마바사아</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">9</Col><Col id=\"Column05\">가나다라마바사아자</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row><Row><Col id=\"순번\">10</Col><Col id=\"Column05\">가나다라마바사아자차</Col><Col id=\"Column06\">1234567890</Col><Col id=\"Column01\">가나다라마바사아자차</Col><Col id=\"Column04\">expand</Col><Col id=\"Column07\">버튼</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Combo", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"txt\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"txt\">전체</Col><Col id=\"lev\">0</Col></Row><Row><Col id=\"txt\">가</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">가나</Col><Col id=\"lev\">2</Col></Row><Row><Col id=\"txt\">가나다</Col><Col id=\"lev\">3</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("Tree", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"txt\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"txt\">1 Depth Menu</Col><Col id=\"lev\">0</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">1 Depth Menu</Col><Col id=\"lev\">0</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">1 Depth Menu</Col><Col id=\"lev\">0</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row><Row><Col id=\"txt\">2 Depth Menu</Col><Col id=\"lev\">1</Col></Row></Rows>");
            this.addChild(obj.name, obj);

            obj = new Dataset("PopupMenu", this);
            obj.set_firefirstcount("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"idx\" type=\"STRING\" size=\"256\"/><Column id=\"lev\" type=\"STRING\" size=\"256\"/><Column id=\"UserData\" type=\"STRING\" size=\"256\"/><Column id=\"Caption\" type=\"STRING\" size=\"256\"/><Column id=\"enable\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"lev\">0</Col><Col id=\"UserData\">PopupMenu01</Col><Col id=\"Caption\">PopupMenu01</Col><Col id=\"idx\">1000</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu02</Col><Col id=\"Caption\">PopupMenu02</Col><Col id=\"lev\">0</Col><Col id=\"idx\">1001</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu01</Col><Col id=\"Caption\">PopupMenu01</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1002</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu02</Col><Col id=\"Caption\">PopupMenu02</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1003</Col><Col id=\"enable\">0</Col></Row><Row><Col id=\"UserData\">PopupMenu03</Col><Col id=\"Caption\">PopupMenu03</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1004</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu04</Col><Col id=\"Caption\">PopupMenu04</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1005</Col><Col id=\"enable\">0</Col></Row><Row><Col id=\"UserData\">PopupMenu05</Col><Col id=\"Caption\">PopupMenu05</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1006</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu03</Col><Col id=\"Caption\">PopupMenu03</Col><Col id=\"lev\">0</Col><Col id=\"idx\">1007</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu04</Col><Col id=\"Caption\">PopupMenu04</Col><Col id=\"lev\">0</Col><Col id=\"idx\">1008</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu01</Col><Col id=\"Caption\">PopupMenu01</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1009</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu02</Col><Col id=\"Caption\">PopupMenu02</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1010</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu03</Col><Col id=\"Caption\">PopupMenu03</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1011</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu04</Col><Col id=\"Caption\">PopupMenu04</Col><Col id=\"lev\">1</Col><Col id=\"idx\">1012</Col><Col id=\"enable\">1</Col></Row><Row><Col id=\"UserData\">PopupMenu05</Col><Col id=\"Caption\">PopupMenu05</Col><Col id=\"lev\">0</Col><Col id=\"idx\">1013</Col><Col id=\"enable\">1</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            
            // UI Components Initialize
            obj = new Static("Static00", "absolute", "0", "0", "1024", "53", null, null, this);
            obj.set_taborder("0");
            obj.set_text("Component KIT");
            obj.style.set_background("#2c4898ff");
            obj.style.set_color("#ffffffff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 11 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "0", "313", "111", "94", null, null, this);
            obj.set_taborder("1");
            obj.set_text("Edit");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "110", "313", "914", "94", null, null, this);
            obj.set_taborder("2");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static03", "absolute", "138", "329", "80", "21", null, null, this);
            obj.set_taborder("3");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static04", "absolute", "586", "329", "80", "21", null, null, this);
            obj.set_taborder("4");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static05", "absolute", "354", "329", "80", "21", null, null, this);
            obj.set_taborder("5");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static06", "absolute", "822", "329", "80", "21", null, null, this);
            obj.set_taborder("6");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00", "absolute", "138", "353", "127", "21", null, null, this);
            obj.set_taborder("7");
            obj.set_value("nexacro");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit01", "absolute", "354", "353", "127", "21", null, null, this);
            obj.set_taborder("9");
            obj.set_value("nexacro");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static09", "absolute", "586", "354", "10", "19", null, null, this);
            obj.set_taborder("11");
            obj.style.set_background("#fb635e80");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit02", "absolute", "586", "353", "127", "21", null, null, this);
            obj.set_taborder("12");
            obj.set_value("nexacro");
            obj.set_enable("true");
            obj.set_cssclass("readonly");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit03", "absolute", "822", "353", "127", "21", null, null, this);
            obj.set_taborder("14");
            obj.set_value("nexacro");
            obj.set_cssclass("essential");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static11", "absolute", "110", "406", "914", "94", null, null, this);
            obj.set_taborder("15");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static12", "absolute", "0", "406", "111", "94", null, null, this);
            obj.set_taborder("16");
            obj.set_text("MaskEdit");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static13", "absolute", "138", "422", "80", "21", null, null, this);
            obj.set_taborder("17");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static14", "absolute", "354", "422", "80", "21", null, null, this);
            obj.set_taborder("18");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static15", "absolute", "586", "422", "80", "21", null, null, this);
            obj.set_taborder("19");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static16", "absolute", "822", "422", "80", "21", null, null, this);
            obj.set_taborder("20");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00", "absolute", "138", "446", "127", "21", null, null, this);
            obj.set_taborder("21");
            obj.set_value("14.1");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit01", "absolute", "354", "446", "127", "21", null, null, this);
            obj.set_taborder("23");
            obj.set_value("14.1");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit02", "absolute", "586", "446", "127", "21", null, null, this);
            obj.set_taborder("25");
            obj.set_value("14.1");
            obj.set_cssclass("readonly");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit03", "absolute", "822", "446", "127", "21", null, null, this);
            obj.set_taborder("27");
            obj.set_value("14.1");
            obj.set_cssclass("essential");
            this.addChild(obj.name, obj);

            obj = new Static("Static21", "absolute", "110", "499", "914", "136", null, null, this);
            obj.set_taborder("29");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static22", "absolute", "0", "499", "111", "136", null, null, this);
            obj.set_taborder("30");
            obj.set_text("TextArea");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static23", "absolute", "138", "515", "80", "21", null, null, this);
            obj.set_taborder("31");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static24", "absolute", "354", "515", "80", "21", null, null, this);
            obj.set_taborder("32");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static25", "absolute", "586", "515", "80", "21", null, null, this);
            obj.set_taborder("33");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static26", "absolute", "822", "515", "80", "21", null, null, this);
            obj.set_taborder("34");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea00", "absolute", "138", "539", "127", "61", null, null, this);
            obj.set_taborder("35");
            obj.set_value("nexacro\r\nnexacro\r\nnexacro\r\nnexacro");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea01", "absolute", "354", "539", "127", "61", null, null, this);
            obj.set_taborder("38");
            obj.set_value("nexacro\r\nnexacro\r\nnexacro\r\nnexacro");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea02", "absolute", "586", "539", "127", "61", null, null, this);
            obj.set_taborder("41");
            obj.set_value("nexacro\r\nnexacro\r\nnexacro\r\nnexacro");
            obj.set_enable("true");
            obj.set_cssclass("readonly");
            obj.set_readonly("true");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea03", "absolute", "822", "539", "127", "61", null, null, this);
            obj.set_taborder("44");
            obj.set_value("nexacro\r\nnexacro\r\nnexacro\r\nnexacro");
            obj.set_readonly("false");
            obj.set_cssclass("essential");
            this.addChild(obj.name, obj);

            obj = new Static("Static28", "absolute", "1032", "341", "225", "32", null, null, this);
            obj.set_taborder("45");
            obj.set_text("padding 값이 스크롤에도 먹힘");
            obj.style.set_color("crimson");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static08", "absolute", "110", "634", "914", "326", null, null, this);
            obj.set_taborder("46");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static10", "absolute", "0", "634", "111", "326", null, null, this);
            obj.set_taborder("47");
            obj.set_text("Button\r\n/CRUD\r\n/Search\r\n/Shuttle");
            obj.style.set_linespace("5");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static18", "absolute", "138", "650", "80", "21", null, null, this);
            obj.set_taborder("48");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static19", "absolute", "354", "650", "80", "21", null, null, this);
            obj.set_taborder("49");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Button("Button00", "absolute", "138", "674", "36", "21", null, null, this);
            obj.set_taborder("52");
            obj.set_text("버튼");
            this.addChild(obj.name, obj);

            obj = new Button("Button01", "absolute", "354", "674", "36", "21", null, null, this);
            obj.set_taborder("53");
            obj.set_text("버튼");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button02", "absolute", "354", "725", "45", "25", null, null, this);
            obj.set_taborder("56");
            obj.set_text("버튼");
            obj.set_enable("false");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("Button03", "absolute", "138", "725", "45", "25", null, null, this);
            obj.set_taborder("57");
            obj.set_text("버튼");
            obj.set_cssclass("btn_WF_CRUD");
            this.addChild(obj.name, obj);

            obj = new Button("Button04", "absolute", "354", "780", "58", "25", null, null, this);
            obj.set_taborder("60");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button05", "absolute", "138", "780", "58", "25", null, null, this);
            obj.set_taborder("61");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit04", "absolute", "138", "835", "52", "21", null, null, this);
            obj.set_taborder("62");
            obj.set_value("검색");
            obj.set_cssclass("edt_WF_Search");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit05", "absolute", "354", "835", "52", "21", null, null, this);
            obj.set_taborder("64");
            obj.set_value("검색");
            obj.set_cssclass("edt_WF_Search");
            obj.set_autoskip("false");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button07", "absolute", "405", "835", "21", "21", null, null, this);
            obj.set_taborder("65");
            obj.set_cssclass("btn_WF_SearchSmall");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button08", "absolute", "138", "886", "29", "29", null, null, this);
            obj.set_taborder("66");
            obj.set_cssclass("btn_WF_ShuttleL");
            this.addChild(obj.name, obj);

            obj = new Button("Button10", "absolute", "170", "886", "29", "29", null, null, this);
            obj.set_taborder("68");
            obj.set_cssclass("btn_WF_ShuttleR");
            this.addChild(obj.name, obj);

            obj = new Static("Static20", "absolute", "110", "959", "914", "94", null, null, this);
            obj.set_taborder("70");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static29", "absolute", "0", "959", "111", "94", null, null, this);
            obj.set_taborder("71");
            obj.set_text("Combo");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static30", "absolute", "138", "975", "80", "21", null, null, this);
            obj.set_taborder("72");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static31", "absolute", "354", "975", "80", "21", null, null, this);
            obj.set_taborder("73");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static32", "absolute", "586", "975", "80", "21", null, null, this);
            obj.set_taborder("74");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static33", "absolute", "822", "975", "80", "21", null, null, this);
            obj.set_taborder("75");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00", "absolute", "138", "999", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Combo00_innerdataset = new Dataset("Combo00_innerdataset", this.Combo00);
            Combo00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro14</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro14.1</Col></Row></Rows>");
            obj.set_innerdataset(Combo00_innerdataset);
            obj.set_taborder("76");
            obj.set_text("Combo01");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("1");

            obj = new Combo("Combo01", "absolute", "354", "999", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Combo01_innerdataset = new Dataset("Combo01_innerdataset", this.Combo01);
            Combo01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro14</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro14.1</Col></Row></Rows>");
            obj.set_innerdataset(Combo01_innerdataset);
            obj.set_taborder("77");
            obj.set_text("Combo01");
            obj.set_visible("true");
            obj.set_enable("false");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("1");

            obj = new Combo("Combo02", "absolute", "586", "999", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Combo02_innerdataset = new Dataset("Combo02_innerdataset", this.Combo02);
            Combo02_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro14</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro14.1</Col></Row></Rows>");
            obj.set_innerdataset(Combo02_innerdataset);
            obj.set_taborder("78");
            obj.set_text("nexacro");
            obj.set_readonly("true");
            obj.set_cssclass("readonly");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("1");

            obj = new Combo("Combo03", "absolute", "822", "999", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Combo03_innerdataset = new Dataset("Combo03_innerdataset", this.Combo03);
            Combo03_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro14</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro14.1</Col></Row></Rows>");
            obj.set_innerdataset(Combo03_innerdataset);
            obj.set_taborder("79");
            obj.set_text("nexacro");
            obj.set_readonly("false");
            obj.set_cssclass("essential");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("1");

            obj = new Static("Static34", "absolute", "110", "1052", "914", "136", null, null, this);
            obj.set_taborder("80");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static35", "absolute", "0", "1052", "111", "136", null, null, this);
            obj.set_taborder("81");
            obj.set_text("ListBox");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static36", "absolute", "138", "1068", "80", "21", null, null, this);
            obj.set_taborder("82");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static37", "absolute", "354", "1068", "80", "21", null, null, this);
            obj.set_taborder("83");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new ListBox("ListBox00", "absolute", "138", "1092", "127", "61", null, null, this);
            this.addChild(obj.name, obj);
            var ListBox00_innerdataset = new Dataset("ListBox00_innerdataset", this.ListBox00);
            ListBox00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">nexacro</Col></Row></Rows>");
            obj.set_innerdataset(ListBox00_innerdataset);
            obj.set_taborder("85");
            obj.set_value("null");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");

            obj = new ListBox("ListBox01", "absolute", "354", "1092", "127", "61", null, null, this);
            this.addChild(obj.name, obj);
            var ListBox01_innerdataset = new Dataset("ListBox01_innerdataset", this.ListBox01);
            ListBox01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">2</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">3</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">4</Col><Col id=\"datacolumn\">nexacro</Col></Row></Rows>");
            obj.set_innerdataset(ListBox01_innerdataset);
            obj.set_taborder("86");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_enableevent("true");
            obj.set_enable("false");

            obj = new Static("Static40", "absolute", "110", "1187", "914", "94", null, null, this);
            obj.set_taborder("88");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static41", "absolute", "0", "1187", "111", "94", null, null, this);
            obj.set_taborder("89");
            obj.set_text("Spin");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static42", "absolute", "138", "1203", "80", "21", null, null, this);
            obj.set_taborder("90");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static43", "absolute", "354", "1203", "80", "21", null, null, this);
            obj.set_taborder("91");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static44", "absolute", "586", "1203", "80", "21", null, null, this);
            obj.set_taborder("92");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static45", "absolute", "822", "1203", "80", "21", null, null, this);
            obj.set_taborder("93");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin00", "absolute", "138", "1227", "127", "21", null, null, this);
            obj.set_taborder("94");
            obj.set_value("1");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin01", "absolute", "354", "1227", "127", "21", null, null, this);
            obj.set_taborder("95");
            obj.set_value("1");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin02", "absolute", "586", "1227", "127", "21", null, null, this);
            obj.set_taborder("96");
            obj.set_value("1");
            obj.set_readonly("true");
            obj.set_cssclass("readonly");
            this.addChild(obj.name, obj);

            obj = new Spin("Spin03", "absolute", "822", "1227", "127", "21", null, null, this);
            obj.set_taborder("97");
            obj.set_value("1");
            obj.set_cssclass("essential");
            this.addChild(obj.name, obj);

            obj = new Static("Static47", "absolute", "110", "52", "914", "262", null, null, this);
            obj.set_taborder("99");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static48", "absolute", "0", "52", "111", "262", null, null, this);
            obj.set_taborder("100");
            obj.set_text("Static");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static49", "absolute", "138", "82", "182", "40", null, null, this);
            obj.set_taborder("101");
            obj.set_text("가나다라마바사\r\nABCDEFGHIJKLMNOP\r\n0123456789");
            this.addChild(obj.name, obj);

            obj = new Static("Static50", "absolute", "354", "82", "188", "21", null, null, this);
            obj.set_taborder("102");
            obj.set_cssclass("sta_WF_Title");
            obj.set_text("대타이틀");
            this.addChild(obj.name, obj);

            obj = new Static("Static51", "absolute", "586", "82", "188", "21", null, null, this);
            obj.set_taborder("103");
            obj.set_text("서브 타이틀1");
            obj.set_cssclass("sta_WF_SubTitle1");
            this.addChild(obj.name, obj);

            obj = new Static("Static52", "absolute", "822", "83", "188", "21", null, null, this);
            obj.set_taborder("104");
            obj.set_text("서브 타이틀2");
            obj.set_cssclass("sta_WF_SubTitle2");
            this.addChild(obj.name, obj);

            obj = new Static("Static53", "absolute", "110", "1280", "914", "374", null, null, this);
            obj.set_taborder("105");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static54", "absolute", "0", "1280", "111", "374", null, null, this);
            obj.set_taborder("106");
            obj.set_text("Calendar");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static55", "absolute", "138", "1296", "80", "21", null, null, this);
            obj.set_taborder("107");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static56", "absolute", "354", "1296", "80", "21", null, null, this);
            obj.set_taborder("108");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static57", "absolute", "586", "1296", "80", "21", null, null, this);
            obj.set_taborder("109");
            obj.set_text("readonly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static58", "absolute", "822", "1296", "80", "21", null, null, this);
            obj.set_taborder("110");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Calendar("Calendar00", "absolute", "138", "1320", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("111");
            obj.set_value("20150707");
            obj.set_dateformat("yyyy-MM-dd");

            obj = new Calendar("Calendar01", "absolute", "354", "1320", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("112");
            obj.set_enable("false");
            obj.set_value("20150707");
            obj.set_dateformat("yyyy-MM-dd");

            obj = new Calendar("Calendar02", "absolute", "586", "1320", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("113");
            obj.set_enable("true");
            obj.set_readonly("true");
            obj.set_cssclass("readonly");
            obj.set_value("20150707");
            obj.set_dateformat("yyyy-MM-dd");

            obj = new Calendar("Calendar03", "absolute", "822", "1320", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("114");
            obj.set_value("20150707");
            obj.set_readonly("false");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_cssclass("essential");

            obj = new Calendar("Calendar04", "absolute", "138", "1371", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("115");
            obj.set_value("20150707");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_type("spin");

            obj = new Calendar("Calendar05", "absolute", "354", "1371", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("116");
            obj.set_value("20150707");
            obj.set_type("spin");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_enable("false");

            obj = new Calendar("Calendar06", "absolute", "586", "1371", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("117");
            obj.set_value("20150707");
            obj.set_type("spin");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_readonly("true");
            obj.set_cssclass("readonly");

            obj = new Calendar("Calendar07", "absolute", "822", "1371", "127", "21", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("118");
            obj.set_value("20150707");
            obj.set_type("spin");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_cssclass("essential");

            obj = new Calendar("Calendar08", "absolute", "138", "1441", "156", "181", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("119");
            obj.set_value("20150707");
            obj.set_dateformat("yyyy-MM-dd");
            obj.set_type("monthonly");

            obj = new Static("Static59", "absolute", "110", "1653", "914", "94", null, null, this);
            obj.set_taborder("120");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static60", "absolute", "0", "1653", "111", "94", null, null, this);
            obj.set_taborder("121");
            obj.set_text("CheckBox");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static61", "absolute", "138", "1669", "80", "21", null, null, this);
            obj.set_taborder("122");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static62", "absolute", "354", "1669", "80", "21", null, null, this);
            obj.set_taborder("123");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static63", "absolute", "586", "1669", "80", "21", null, null, this);
            obj.set_taborder("124");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox00", "absolute", "138", "1693", "127", "21", null, null, this);
            obj.set_taborder("128");
            obj.set_text("nexacro");
            obj.set_value("true");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox01", "absolute", "354", "1693", "127", "21", null, null, this);
            obj.set_taborder("129");
            obj.set_text("nexacro");
            obj.set_value("true");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new CheckBox("CheckBox02", "absolute", "586", "1693", "127", "21", null, null, this);
            obj.set_taborder("130");
            obj.set_text("nexacro");
            obj.set_value("true");
            obj.set_cssclass("essential");
            this.addChild(obj.name, obj);

            obj = new Static("Static64", "absolute", "110", "1746", "914", "94", null, null, this);
            obj.set_taborder("131");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static67", "absolute", "0", "1746", "111", "94", null, null, this);
            obj.set_taborder("132");
            obj.set_text("Div");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static68", "absolute", "138", "1772", "343", "41", null, null, this);
            obj.set_taborder("133");
            obj.set_text("Div는 일반적으로 Form을 로드할 때 사용한다.\r\n디자인 요소가 필요 할 경우 Class로 지정해서 사용한다.");
            obj.style.set_linespace("5");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static69", "absolute", "110", "1839", "914", "985", null, null, this);
            obj.set_taborder("134");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static70", "absolute", "0", "1839", "111", "985", null, null, this);
            obj.set_taborder("135");
            obj.set_text("Grid");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static71", "absolute", "110", "2823", "914", "136", null, null, this);
            obj.set_taborder("136");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static72", "absolute", "0", "2823", "111", "136", null, null, this);
            obj.set_taborder("137");
            obj.set_text("GroupBox");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static73", "absolute", "138", "2839", "80", "21", null, null, this);
            obj.set_taborder("138");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static74", "absolute", "354", "2839", "80", "21", null, null, this);
            obj.set_taborder("139");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new GroupBox("GroupBox00", "absolute", "138", "2863", "127", "61", null, null, this);
            obj.set_text("그룹박스");
            obj.set_taborder("140");
            this.addChild(obj.name, obj);

            obj = new GroupBox("GroupBox01", "absolute", "354", "2863", "127", "61", null, null, this);
            obj.set_text("그룹박스");
            obj.set_taborder("141");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static75", "absolute", "110", "2958", "914", "136", null, null, this);
            obj.set_taborder("142");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static76", "absolute", "0", "2958", "111", "136", null, null, this);
            obj.set_taborder("143");
            obj.set_text("ImageViewer");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static77", "absolute", "138", "2974", "80", "21", null, null, this);
            obj.set_taborder("144");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static78", "absolute", "354", "2974", "80", "21", null, null, this);
            obj.set_taborder("145");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00", "absolute", "138", "2998", "127", "61", null, null, this);
            obj.set_taborder("146");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer01", "absolute", "354", "2998", "127", "61", null, null, this);
            obj.set_taborder("147");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static79", "absolute", "110", "3093", "914", "136", null, null, this);
            obj.set_taborder("148");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static80", "absolute", "0", "3093", "111", "136", null, null, this);
            obj.set_taborder("149");
            obj.set_text("Menu");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Menu("Menu00", "absolute", "138", "3133", "831", "38", null, null, this);
            this.addChild(obj.name, obj);
            obj.set_taborder("150");
            obj.set_captioncolumn("Caption");
            obj.set_idcolumn("Id");
            obj.set_levelcolumn("Level");
            obj.set_innerdataset("@Menu");

            obj = new Static("Static81", "absolute", "110", "3228", "914", "94", null, null, this);
            obj.set_taborder("151");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static82", "absolute", "0", "3228", "111", "94", null, null, this);
            obj.set_taborder("152");
            obj.set_text("PopupDiv");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static83", "absolute", "138", "3254", "343", "41", null, null, this);
            obj.set_taborder("153");
            obj.set_text("PopupDiv는 일반적으로 Form을 로드할 때 사용한다.\r\n디자인 요소가 필요 할 경우 Class로 지정해서 사용한다.");
            obj.style.set_linespace("5");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static84", "absolute", "110", "3321", "914", "136", null, null, this);
            obj.set_taborder("154");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static85", "absolute", "0", "3321", "111", "136", null, null, this);
            obj.set_taborder("155");
            obj.set_text("PopupMenu");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static86", "absolute", "110", "3456", "914", "94", null, null, this);
            obj.set_taborder("156");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static87", "absolute", "0", "3456", "111", "94", null, null, this);
            obj.set_taborder("157");
            obj.set_text("ProgressBar");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new ProgressBar("ProgressBar00", "absolute", "138", "3496", "262", "14", null, null, this);
            obj.set_taborder("158");
            obj.set_pos("50");
            this.addChild(obj.name, obj);

            obj = new Static("Static88", "absolute", "138", "3472", "80", "21", null, null, this);
            obj.set_taborder("159");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new ProgressBar("ProgressBar01", "absolute", "586", "3496", "262", "14", null, null, this);
            obj.set_taborder("160");
            obj.set_pos("50");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static89", "absolute", "586", "3472", "80", "21", null, null, this);
            obj.set_taborder("161");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static90", "absolute", "110", "3549", "914", "94", null, null, this);
            obj.set_taborder("162");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Static("Static91", "absolute", "0", "3549", "111", "94", null, null, this);
            obj.set_taborder("163");
            obj.set_text("Radio");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static92", "absolute", "138", "3565", "80", "21", null, null, this);
            obj.set_taborder("164");
            obj.set_text("normal");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static93", "absolute", "354", "3565", "80", "21", null, null, this);
            obj.set_taborder("165");
            obj.set_text("disabled");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static94", "absolute", "586", "3565", "80", "21", null, null, this);
            obj.set_taborder("166");
            obj.set_text("essential");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Radio("Radio00", "absolute", "138", "3589", "162", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Radio00_innerdataset = new Dataset("Radio00_innerdataset", this.Radio00);
            Radio00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro</Col></Row></Rows>");
            obj.set_innerdataset(Radio00_innerdataset);
            obj.set_taborder("167");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_value("0");

            obj = new Radio("Radio01", "absolute", "354", "3589", "162", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Radio01_innerdataset = new Dataset("Radio01_innerdataset", this.Radio01);
            Radio01_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro</Col></Row></Rows>");
            obj.set_innerdataset(Radio01_innerdataset);
            obj.set_taborder("168");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("0");
            obj.set_direction("vertical");
            obj.set_enable("false");
            obj.set_index("0");

            obj = new Radio("Radio02", "absolute", "586", "3589", "162", "21", null, null, this);
            this.addChild(obj.name, obj);
            var Radio02_innerdataset = new Dataset("Radio02_innerdataset", this.Radio02);
            Radio02_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">nexacro</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">nexacro</Col></Row></Rows>");
            obj.set_innerdataset(Radio02_innerdataset);
            obj.set_taborder("169");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_value("0");
            obj.set_direction("vertical");
            obj.set_cssclass("essential");
            obj.set_index("0");

            obj = new Grid("Grid00", "absolute", "138", "1889", "844", "145", null, null, this);
            obj.set_taborder("170");
            obj.set_binddataset("Grid");
            obj.set_scrollbars("autoboth");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"50\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"71\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"28\"/><Row size=\"28\" band=\"summ\"/></Rows><Band id=\"head\"><Cell displaytype=\"checkbox\" style=\"align:center middle;\" text=\"Column0\"/><Cell col=\"1\" text=\"순번\"/><Cell col=\"2\" cssclass=\"CellEssential\" text=\"Column01\"/><Cell col=\"3\" text=\"Column02\"/><Cell col=\"4\" text=\"Column03\"/><Cell col=\"5\" text=\"Column04\"/><Cell col=\"6\" text=\"Column05\"/><Cell col=\"7\" text=\"Column06\"/><Cell col=\"8\" text=\"Column07\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"bind:Column0\"/><Cell col=\"1\" style=\"align:center middle;\" text=\"bind:순번\"/><Cell col=\"2\" displaytype=\"text\" edittype=\"text\" style=\"padding:3 3 3 3;\" text=\"bind:Column01\" editdisplay=\"display\" expandshow=\"hide\"/><Cell col=\"3\" displaytype=\"combo\" edittype=\"combo\" style=\"padding:3 3 3 3;\" text=\"bind:lev\" combodataset=\"Combo\" combocodecol=\"lev\" combodatacol=\"txt\" combodisplayrowcount=\"-1\" combodisplay=\"display\"/><Cell col=\"4\" displaytype=\"date\" edittype=\"date\" style=\"padding:3 3 3 3;\" text=\"bind:Column03\" editdisplay=\"display\" calendardisplay=\"display\"/><Cell col=\"5\" displaytype=\"text\" edittype=\"expand\" style=\"padding:3 0 3 2;\" text=\"bind:Column04\" editdisplay=\"display\" expandshow=\"show\" expandsize=\"21\" expandimage=\"URL('img::img_WF_Expand.png')\"/><Cell col=\"6\" style=\"padding:0 9 0 9;\" text=\"bind:Column05\"/><Cell col=\"7\" style=\"align:right middle;padding:0 9 0 9;\" text=\"bind:Column06\" mask=\"###,###,###\"/><Cell col=\"8\" displaytype=\"button\" edittype=\"button\" style=\"align:center middle;padding:3 3 3 3;\" text=\"bind:Column07\" editdisplay=\"edit\"/></Band><Band id=\"summary\"><Cell colspan=\"7\" style=\"align:center middle;\" text=\"합계\"/><Cell col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" text=\"321456789\" mask=\"###,###,###\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button12", "absolute", "576", "1866", "105", "12", null, null, this);
            obj.set_taborder("171");
            obj.set_text("Custom Button");
            obj.set_cssclass("btn_WF_Custom");
            this.addChild(obj.name, obj);

            obj = new Button("Button13", "absolute", "681", "1866", "66", "12", null, null, this);
            obj.set_taborder("172");
            obj.set_text("행추가");
            obj.set_cssclass("btn_WF_Add");
            this.addChild(obj.name, obj);

            obj = new Button("Button14", "absolute", "747", "1866", "67", "12", null, null, this);
            obj.set_taborder("173");
            obj.set_text("행삭제");
            obj.set_enable("true");
            obj.set_cssclass("btn_WF_Delete");
            this.addChild(obj.name, obj);

            obj = new Button("Button15", "absolute", "814", "1861", "79", "21", null, null, this);
            obj.set_taborder("174");
            obj.set_text("다운로드");
            obj.set_cssclass("btn_WF_Download");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new Button("Button16", "absolute", "892", "1861", "67", "21", null, null, this);
            obj.set_taborder("175");
            obj.set_text("업로드");
            obj.set_cssclass("btn_WF_Upload");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01", "absolute", "138", "2071", "220", "173", null, null, this);
            obj.set_taborder("178");
            obj.set_cssclass("grd_WF_Tree");
            obj.set_binddataset("Tree");
            obj.set_treeusecheckbox("false");
            obj.set_treeuseexpandkey("false");
            obj.set_treeuseline("false");
            obj.set_fillareatype("none");
            obj.set_treeinitstatus("expand,null");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"205\"/></Columns><Rows><Row size=\"26\"/></Rows><Band id=\"body\" style=\"cellpadding: ;\"><Cell displaytype=\"tree\" edittype=\"tree\" text=\"bind:txt\" treelevel=\"bind:lev\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static95", "absolute", "138", "2047", "80", "21", null, null, this);
            obj.set_taborder("179");
            obj.set_text("Tree Grid");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Static("Static97", "absolute", "0", "3642", "111", "147", null, null, this);
            obj.set_taborder("182");
            obj.set_text("Tab");
            obj.style.set_background("#f8f8f8ff");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#333333ff");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 10 Gulim");
            this.addChild(obj.name, obj);

            obj = new Static("Static98", "absolute", "110", "3642", "914", "147", null, null, this);
            obj.set_taborder("183");
            obj.style.set_border("1 solid #767676ff");
            obj.style.set_color("#2c4898ff");
            obj.style.set_align("center middle");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00", "absolute", "138", "3688", "710", "56", null, null, this);
            obj.set_taborder("184");
            obj.set_tabindex("0");
            obj.set_scrollbars("autoboth");
            this.addChild(obj.name, obj);
            obj = new Tabpage("tabpage1", this.Tab00);
            obj.set_text("Tab 01");
            this.Tab00.addChild(obj.name, obj);
            obj = new Tabpage("tabpage2", this.Tab00);
            obj.set_text("Tab 02");
            this.Tab00.addChild(obj.name, obj);
            obj = new Tabpage("tabpage3", this.Tab00);
            obj.set_text("Tab 03");
            this.Tab00.addChild(obj.name, obj);

            obj = new Static("Static99", "absolute", "1040", "3121", "225", "72", null, null, this);
            obj.set_taborder("185");
            obj.set_text("TabButton : 각 면에 다른색 border안됨\r\nIE에서 border bottom나옴\r\n수도값에 bold 쓰면 짤림");
            obj.set_visible("false");
            obj.style.set_linespace("5");
            obj.style.set_color("crimson");
            this.addChild(obj.name, obj);

            obj = new Static("Static100", "absolute", "138", "1418", "80", "21", null, null, this);
            obj.set_taborder("186");
            obj.set_text("monthly");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Button("Button17", "absolute", "202", "886", "29", "29", null, null, this);
            obj.set_taborder("187");
            obj.set_cssclass("btn_WF_ShuttleT");
            this.addChild(obj.name, obj);

            obj = new Button("Button18", "absolute", "234", "886", "29", "29", null, null, this);
            obj.set_taborder("188");
            obj.set_cssclass("btn_WF_ShuttleB");
            this.addChild(obj.name, obj);

            obj = new Button("Button06", "absolute", "189", "835", "21", "21", null, null, this);
            obj.set_taborder("193");
            obj.set_cssclass("btn_WF_SearchSmall");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid03", "absolute", "138", "2298", "844", "162", null, null, this);
            obj.set_taborder("203");
            obj.set_binddataset("Grid");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"50\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"86\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"32\" band=\"head\"/><Row size=\"28\"/><Row size=\"28\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" displaytype=\"checkbox\" style=\"align:center middle;\" text=\"Column0\"/><Cell col=\"1\" rowspan=\"2\" text=\"순번\"/><Cell col=\"2\" colspan=\"7\" cssclass=\"CellEssential\" text=\"Component\"/><Cell row=\"1\" col=\"2\" text=\"Edit\"/><Cell row=\"1\" col=\"3\" text=\"Combo\"/><Cell row=\"1\" col=\"4\" text=\"Calendar\"/><Cell row=\"1\" col=\"5\" text=\"Edit+Expand\"/><Cell row=\"1\" col=\"6\" text=\"Normal\"/><Cell row=\"1\" col=\"7\" text=\"Mask\"/><Cell row=\"1\" col=\"8\" text=\"Button\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"bind:Column0\"/><Cell col=\"1\" style=\"align:center middle;\" text=\"bind:순번\"/><Cell col=\"2\" displaytype=\"text\" edittype=\"text\" style=\"padding:3 3 3 3;\" text=\"bind:Column01\" editdisplay=\"display\" expandshow=\"hide\"/><Cell col=\"3\" displaytype=\"combo\" edittype=\"combo\" style=\"padding:3 3 3 3;\" text=\"bind:lev\" combodataset=\"Combo\" combocodecol=\"lev\" combodatacol=\"txt\" combodisplayrowcount=\"-1\" combodisplay=\"display\"/><Cell col=\"4\" displaytype=\"date\" edittype=\"date\" style=\"padding:3 3 3 3;\" text=\"bind:Column03\" editdisplay=\"display\" calendardisplay=\"display\"/><Cell col=\"5\" displaytype=\"text\" edittype=\"expand\" style=\"padding:3 0 3 2;\" text=\"bind:Column04\" editdisplay=\"display\" expandshow=\"show\" expandsize=\"21\" expandimage=\"URL('img::img_WF_Expand.png')\"/><Cell col=\"6\" style=\"padding:0 9 0 9;\" text=\"bind:Column05\"/><Cell col=\"7\" style=\"align:right middle;padding:0 9 0 9;\" text=\"bind:Column06\" mask=\"###,###,###\"/><Cell col=\"8\" displaytype=\"button\" edittype=\"button\" style=\"align:center middle;padding:3 3 3 3;\" text=\"bind:Column07\" editdisplay=\"edit\"/></Band><Band id=\"summary\"><Cell colspan=\"7\" style=\"align:center middle;\" text=\"합계\"/><Cell col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" text=\"321456789\" mask=\"###,###,###\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static105", "absolute", "140", "148", "255", "15", null, null, this);
            obj.set_taborder("204");
            obj.set_text("※ usedecorate =\"<b v='true'>true</b>\"");
            obj.set_usedecorate("true");
            obj.getSetter("class").set("sta_WF_Info_Orange");
            obj.style.set_color("#e37a0cff");
            this.addChild(obj.name, obj);

            obj = new TextArea("TextArea04", "absolute", "132", "174", "523", "119", null, null, this);
            obj.set_taborder("205");
            obj.set_value("fs 글자의 크기(fontsize)를 지정합니다.  ex)<fs v='12'></fs>\r\nfc 글자의 색상(fontcolor)를 지정합니다.  ex)<fc v='red'></fc><fc v='#FF00FF'></fc>\r\nff 글자의 종류(fontface)를 지정합니다.  ex)<ff v='굴림'></ff>\r\nb 굵은글씨를(bold)를 지정합니다. ex)<b v='true'></b>\r\ni 이텔릭체를 (italic)를 지정합니다.  ex)<i v='true'></i>\r\nu 언더라인을(underline)를 지정합니다.  ex)<u v='true'></u>\r\ns 취소선(strike)를 지정합니다.  ex)<s v='true'></s>");
            obj.set_readonly("true");
            obj.set_linespace("3");
            obj.style.set_border("0 none #808080");
            obj.style.set_color("#e37a0cff");
            this.addChild(obj.name, obj);

            obj = new Static("Static106", "absolute", "138", "2271", "162", "21", null, null, this);
            obj.set_taborder("206");
            obj.set_text("head 2단");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid04", "absolute", "138", "2514", "844", "266", null, null, this);
            obj.set_taborder("207");
            obj.set_binddataset("Grid");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"28\"/><Column size=\"50\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"120\"/><Column size=\"86\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"32\" band=\"head\"/><Row size=\"28\"/><Row size=\"28\" band=\"summ\"/><Row size=\"24\" band=\"summ\"/><Row size=\"24\" band=\"summ\"/><Row size=\"24\" band=\"summ\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" displaytype=\"checkbox\" style=\"align:center middle;\" text=\"Column0\"/><Cell col=\"1\" rowspan=\"2\" text=\"순번\"/><Cell col=\"2\" colspan=\"7\" cssclass=\"CellEssential\" text=\"Component\"/><Cell row=\"1\" col=\"2\" text=\"Edit\"/><Cell row=\"1\" col=\"3\" text=\"Combo\"/><Cell row=\"1\" col=\"4\" text=\"Calendar\"/><Cell row=\"1\" col=\"5\" text=\"Edit+Expand\"/><Cell row=\"1\" col=\"6\" text=\"Normal\"/><Cell row=\"1\" col=\"7\" text=\"Mask\"/><Cell row=\"1\" col=\"8\" text=\"Button\"/></Band><Band id=\"body\"><Cell displaytype=\"checkbox\" edittype=\"checkbox\" style=\"align:center middle;\" text=\"bind:Column0\"/><Cell col=\"1\" style=\"align:center middle;\" text=\"bind:순번\"/><Cell col=\"2\" displaytype=\"text\" edittype=\"text\" style=\"padding:3 3 3 3;\" text=\"bind:Column01\" editdisplay=\"display\" expandshow=\"hide\"/><Cell col=\"3\" displaytype=\"combo\" edittype=\"combo\" style=\"padding:3 3 3 3;\" text=\"bind:lev\" combodataset=\"Combo\" combocodecol=\"lev\" combodatacol=\"txt\" combodisplayrowcount=\"-1\" combodisplay=\"display\"/><Cell col=\"4\" displaytype=\"date\" edittype=\"date\" style=\"padding:3 3 3 3;\" text=\"bind:Column03\" editdisplay=\"display\" calendardisplay=\"display\"/><Cell col=\"5\" displaytype=\"text\" edittype=\"expand\" style=\"padding:3 0 3 2;\" text=\"bind:Column04\" editdisplay=\"display\" expandshow=\"show\" expandsize=\"21\" expandimage=\"URL('img::img_WF_Expand.png')\"/><Cell col=\"6\" style=\"padding:0 9 0 9;\" text=\"bind:Column05\"/><Cell col=\"7\" style=\"align:right middle;padding:0 9 0 9;\" text=\"bind:Column06\" mask=\"###,###,###\"/><Cell col=\"8\" displaytype=\"button\" edittype=\"button\" style=\"align:center middle;padding:3 3 3 3;\" text=\"bind:Column07\" editdisplay=\"edit\"/></Band><Band id=\"summary\"><Cell colspan=\"7\" style=\"padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum03\" text=\"소계03\"/><Cell col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum03\" text=\"1,000,000,000\" mask=\"###,###,###\"/><Cell row=\"1\" colspan=\"7\" style=\"padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum\" text=\"소계02\"/><Cell row=\"1\" col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum\" text=\"1,000,000,000\"/><Cell row=\"2\" colspan=\"7\" style=\"padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum01\" text=\"소계01\"/><Cell row=\"2\" col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" cssclass=\"Cellgrd_WF_sum01\" text=\"1,000,000,000\"/><Cell row=\"3\" colspan=\"7\" style=\"padding:0 9 0 9;\" text=\"합계\"/><Cell row=\"3\" col=\"7\" colspan=\"2\" style=\"align:right middle;padding:0 9 0 9;\" text=\"1,000,000,000\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static107", "absolute", "138", "2487", "162", "21", null, null, this);
            obj.set_taborder("208");
            obj.set_text("summ");
            obj.style.set_color("#2c4898ff");
            this.addChild(obj.name, obj);

            obj = new Button("Button21", "absolute", "961", "1861", "21", "21", null, null, this);
            obj.set_taborder("209");
            obj.set_cssclass("btn_WF_Extend");
            this.addChild(obj.name, obj);

            obj = new Button("Button22", "absolute", "1048", "1861", "21", "21", null, null, this);
            obj.set_taborder("210");
            obj.set_cssclass("btn_WF_Downsize");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button09", "absolute", "354", "886", "29", "29", null, null, this);
            obj.set_taborder("211");
            obj.set_cssclass("btn_WF_ShuttleL");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button11", "absolute", "386", "886", "29", "29", null, null, this);
            obj.set_taborder("212");
            obj.set_cssclass("btn_WF_ShuttleR");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button19", "absolute", "418", "886", "29", "29", null, null, this);
            obj.set_taborder("213");
            obj.set_cssclass("btn_WF_ShuttleT");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new Button("Button20", "absolute", "450", "886", "29", "29", null, null, this);
            obj.set_taborder("214");
            obj.set_cssclass("btn_WF_ShuttleB");
            obj.set_enable("false");
            this.addChild(obj.name, obj);

            obj = new PopupMenu("PopupMenu01", "absolute", "13.48%", "3351", null, "97", "74.41%", null, this);
            this.addChild(obj.name, obj);
            obj.set_innerdataset("@PopupMenu");
            obj.set_idcolumn("idx");
            obj.set_captioncolumn("Caption");
            obj.set_levelcolumn("lev");
            obj.set_enablecolumn("enable");
            obj.set_userdatacolumn("UserData");

            obj = new Button("Button23", "absolute", "13.48%", "3330", null, "21", "76.76%", null, this);
            obj.set_taborder("215");
            obj.set_text("PopupMenu");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 1024, 3789, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Guide01");
            		p.set_titletext("New Form");
            		p.set_cssclass("tab_bottom");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.addIncludeScript("Guide.xfdl", "Lib::Comm.xjs");
        this.registerScript("Guide.xfdl", function() {
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
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static08.addEventHandler("onclick", this.Static08_onclick, this);
            this.PopupMenu01.addEventHandler("onmenuclick", this.PopupMenu00_onmenuclick, this);

        };

        this.loadIncludeScript("Guide.xfdl");

       
    };
}
)();
