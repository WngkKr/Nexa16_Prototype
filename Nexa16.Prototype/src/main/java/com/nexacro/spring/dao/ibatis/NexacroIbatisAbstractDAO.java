package com.nexacro.spring.dao.ibatis;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.nexacro.spring.dao.Dbms;
import com.nexacro.spring.dao.DbmsProvider;
import com.nexacro.spring.data.NexacroFirstRowHandler;

import egovframework.rte.psl.dataaccess.EgovAbstractDAO;
import egovframework.rte.psl.orm.ibatis.SqlMapClientTemplate;

/**
 * <p>nexacro platform 연동 시 추가적인 기능지원을 위한 EgovAbstractDAO를 확장한 클래스이다.
 * 
 * @author Park SeongMin
 * @since 08.06.2015
 * @version 1.0
 * @see
 */
public class NexacroIbatisAbstractDAO extends EgovAbstractDAO {

	protected final Logger logger = LoggerFactory.getLogger(NexacroIbatisAbstractDAO.class);

	@Resource(name = "dbmsProvider")
	private DbmsProvider dbmsProvider;

	/**
	 * 입력받은 값을 batch로 데이터를 삽입한다.
	 * @param queryId
	 * @param batchArgs
	 * @return batch count
	 * @throws SQLException
	 */
	public int batch(final String queryId, final List<Object> batchArgs) throws SQLException {
		final SqlMapClient sqlMapClient = getSqlMapClient();
		sqlMapClient.startBatch();

		Iterator<Object> batchs = batchArgs.iterator();
		
		while(batchs.hasNext()) {
			final Object args = batchs.next();
			sqlMapClient.insert(queryId, args);
		}
		return sqlMapClient.executeBatch();
	}
	
	@Override
	public List<?> list(final String queryId) {
		List<?> list = super.list(queryId);
		if (list == null || list.isEmpty()) {
			list = getNexacroMetaData(queryId, null, list);
		}
		return list;
	}

	@Override
	public List<?> list(final String queryId, final Object parameterObject) {
		List<?> list = super.list(queryId, parameterObject);
		if (list == null || list.isEmpty()) {
			list = getNexacroMetaData(queryId, parameterObject, list);
		}
		return list;
	}

	@Override
	public List<?> list(final String queryId, final int skipResults, final int maxResults) {
		List<?> list = super.list(queryId, skipResults, maxResults);
		
		if (list == null || list.isEmpty()) {
			list = getNexacroMetaData(queryId, null, list);
		}
		return list;
	}

	@Override
	public List<?> list(final String queryId, final Object parameterObject, final int skipResults, final int maxResults) {
		List<?> list = super.list(queryId, parameterObject, skipResults, maxResults);
		if (list == null || list.isEmpty()) {
			list = getNexacroMetaData(queryId, parameterObject, list);
		}
		return list;
	}

	@Override
	public List<?> listWithPaging(final String queryId, final Object parameterObject, final int pageIndex, final int pageSize) {
		List<?> listWithPaging = super.listWithPaging(queryId, parameterObject, pageIndex, pageSize);
		if (listWithPaging == null || listWithPaging.isEmpty()) {
			listWithPaging = getNexacroMetaData(queryId, parameterObject, listWithPaging);
		}
		return listWithPaging;
	}
	
	private List<?> getNexacroMetaData(final String queryId, final Object parameterObject,final List originalResult) {
	    return getSqlMapClientTemplateDelegator().queryForList(queryId, parameterObject);
    }
    
    public SqlMapClientTemplate getSqlMapClientTemplateDelegator() throws DataAccessException {
        final SqlMapClientTemplate clientTemplate = super.getSqlMapClientTemplate();
        Dbms dbms = dbmsProvider.getDbms(clientTemplate.getDataSource());
        return new SqlMapClientTemplateDelegator(clientTemplate, dbms);
    }
    
    public void queryWithFirstRowHandler(final String queryId, final Object parameterObject, final NexacroFirstRowHandler firstRowHandler, final String sendName, final int firstRowCount) {
    	final SqlMapClientRowHandler rowHandler = new SqlMapClientRowHandler(firstRowHandler, sendName, firstRowCount);
        getSqlMapClientTemplate().queryWithRowHandler(queryId, parameterObject, rowHandler);
        
        // send remain data..
        rowHandler.sendRemainData();
    }
}
