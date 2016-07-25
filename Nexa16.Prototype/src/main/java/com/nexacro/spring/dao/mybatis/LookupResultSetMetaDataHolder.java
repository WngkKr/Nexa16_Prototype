package com.nexacro.spring.dao.mybatis;

import org.springframework.core.NamedThreadLocal;

/**
 * {@code LookupResultSetMetaDataConfig}를 위한 ThreadLocal holder 
 * @author Park SeongMin
 *
 */
class LookupResultSetMetaDataHolder {
	
	private static final ThreadLocal<LookupResultSetMetaDataConfig> CURRENTMYBATISCONFIG = new NamedThreadLocal<LookupResultSetMetaDataConfig>("Mybatis lookup Configuration");
	
	static void resetLookupResultSetMetaDataConfig() {
		CURRENTMYBATISCONFIG.remove();
	}

	static void setLookupResultSetMetaDataConfig(LookupResultSetMetaDataConfig config) {
		if (config == null) {
			resetLookupResultSetMetaDataConfig();
		}
		else {
			CURRENTMYBATISCONFIG.set(config);
		}
	}

	static LookupResultSetMetaDataConfig getLookupResultSetMetaDataConfig() {
		return CURRENTMYBATISCONFIG.get();
	}
	
	
}
