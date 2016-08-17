if (nexacro.LiteDBConnection)
{
    nexacro.LiteDBConnection = function (id, parent)
    {
        this.id = this.name = id;
        if (parent)
        {
            this.parent = parent;
        }
        // set property
        this.sqlstatement = "";                                                 // SQLStatement의 executeQuery 함수의 결과를 제어하는 Object
        this.busytimeout = 60000;												// SQLite 연결시 Table에 Lock이 걸렸을 경우 응답을 받기 위한 대기시간
        this.openflag = 1;														// Database를 open할때 사용될 Flag		
        this.datasource = "";													// 연결할 SQLite Database 경로
        this.preconnect = "false";
        this.async = "true";                                                    // 동기/비동기 여부


        this._event_list = {
            "onsuccess": 1, "onerror": 1
        };

        this.onsuccess = null;
        this.onerror = null;
    };
};

if (nexacro.LiteDBStatement)
{
    nexacro.LiteDBStatement = function (id, parent)
    {
        this.id = this.name = id;
        if (parent)
        {
            this.parent = parent;
        }

        this.query = "";
        this.ldbconnection = "";
        this.parameters = {};
        this.applyrowpos = -1;
        this.async = "true";

        this._event_list = {
            "onsuccess": 1, "onerror": 1
        };

        this.onsuccess = null;
        this.onerror = null;
    };
};