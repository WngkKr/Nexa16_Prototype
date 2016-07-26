//XJS=Comm.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        /**
         * @fileoverview 넥사크로  공통 Library
         * @author  copyright 2015 TOBESOFT {J}
         */
         
        /**
         * 공통 Callback 처리 Result 호출
         * @param {Object} jsonObject
         * @return {string}
         * @example
         *
         * @memberOf Comm
         */
        this.Comm_transactionCallback= function(oSvc,errorcode,errormsg)
        {
            new Iject.Controll.callback().transaction(oSvc,errorcode,errormsg);
        }
        
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
