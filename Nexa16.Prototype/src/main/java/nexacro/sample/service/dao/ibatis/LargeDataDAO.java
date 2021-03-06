package nexacro.sample.service.dao.ibatis;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.nexacro.spring.dao.ibatis.NexacroIbatisAbstractDAO;
import com.nexacro.spring.data.NexacroFirstRowHandler;

/**
 * Test를 위한 DAO Sample Class
 *
 * @author Park SeongMin
 * @since 08.12.2015
 * @version 1.0
 * @see
 */
@Repository("largeDataDAO")
public class LargeDataDAO extends NexacroIbatisAbstractDAO {

    public void initData(int initDataCount) {
        List<Object> batchArgs = new ArrayList<Object>();
        for(int i=0; i<initDataCount; i++) {
            String value = "name-" + i;
            batchArgs.add(value);
        }

        try {
            batch("largeDataDAO.initData", batchArgs);
        } catch (SQLException sqle) {
        	logger.error("temproary data insert failed.");
        }
    }
    
    public void selectLargeData(NexacroFirstRowHandler firstRowHandler, String sendName, int firstRowCount) {
    	String queryId = "largeDataDAO.selectLargeData";
    	Object parameterObject = null;
    	queryWithFirstRowHandler(queryId, parameterObject, firstRowHandler, sendName, firstRowCount);
    }
    
}
