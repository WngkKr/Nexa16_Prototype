package com.nexacro.spring.data.convert;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nexacro.spring.data.convert.NexacroConverter.ConvertiblePair;
import com.nexacro.spring.data.support.DataSetToListConverter;
import com.nexacro.spring.data.support.DataSetToObjectConverter;
import com.nexacro.spring.data.support.ListToDataSetConverter;
import com.nexacro.spring.data.support.ObjectToDataSetConverter;
import com.nexacro.spring.data.support.ObjectToVariableConverter;
import com.nexacro.spring.data.support.VariableToObjectConverter;

/**
 * <p>{@code NexacroConverter}를 등록하고 관리하는 Factory 클래스이다. 제공되는 {@code NexacroConverter}는 singleton 형식으로 관리된다.
 * 
 * @author Park SeongMin
 * @since 07.28.2015
 * @version 1.0
 * @see NexacroConverter
 */
public class NexacroConverterFactory {

    private static final Logger LOGGER = LoggerFactory.getLogger(NexacroConverterFactory.class);
    private static Set<NexacroConverter> converterSets = new HashSet<NexacroConverter>();
    
    // ConcurrentHashMap > Java5 or newer
    private static Map<ConvertiblePair, NexacroConverter> convertibleCacheMap = new ConcurrentHashMap<ConvertiblePair, NexacroConverter>();
    
    private static final NexacroConverterFactory INSTANCE = new NexacroConverterFactory(); 
    
    private NexacroConverterFactory() {
        addDefaultConverter();
    }
    
    private void addDefaultConverter() {
        NexacroConverterFactory.register(new DataSetToListConverter());
        NexacroConverterFactory.register(new ListToDataSetConverter());
        NexacroConverterFactory.register(new DataSetToObjectConverter());
        NexacroConverterFactory.register(new ObjectToDataSetConverter());
        NexacroConverterFactory.register(new VariableToObjectConverter());
        NexacroConverterFactory.register(new ObjectToVariableConverter());
    }
    
    public static NexacroConverterFactory getInstance() {
        return INSTANCE;
    }
    
    /**
     * <p>소스(source)에서 대상(target)으로 데이터 변환이 가능한 {@link NexacroConverter}를 반환한다.
     * <p>단, 변환 가능한 {@link NexacroConverter}가 존재하지 않을 경우 null을 반환한다.
     * @param source
     * @param target
     * @return nexacroConverter
     */
    public static NexacroConverter getConverter(Class source, Class target) {
        
        if(source == null || target == null) {
            throw new IllegalArgumentException("source and target class must not be null.");
        }
        
        NexacroConverter converter = findConvertibleCache(source, target);
        
        if(converter == null) {
            converter = findSupportedConverter(source, target);
        }
        
        if(converter == null) {
            return null;
        }
        
        return converter;
    }
    
    private static NexacroConverter findConvertibleCache(Class source, Class target) {
        ConvertiblePair convertiblePair = new ConvertiblePair(source, target);
        NexacroConverter converter = convertibleCacheMap.get(convertiblePair);
        return converter;
    }
    
    private static NexacroConverter findSupportedConverter(Class source, Class target) {
        
    	Iterator<NexacroConverter> converters = converterSets.iterator();
    	
    	while(converters.hasNext()) {
    		NexacroConverter converter = converters.next();
    		
    		boolean canConvertible = converter.canConvert(source, target);
            if(canConvertible) {
                ConvertiblePair pair = new ConvertiblePair(source, target); 
                convertibleCacheMap.put(pair, converter);
                LOGGER.debug("{} to {} converter({}) registered.", source.getName(), target.getName(), converter.getClass().getName());
                return converter;
            }
    	}
        
        return null;
    }
    
    public static void register(Set<NexacroConverter> converters) {
    	//block level synchronized
    	synchronized(NexacroConverterFactory.class) {
	        if(converters == null || converters.isEmpty()) {
	            return;
	        }
	        
	        Iterator<NexacroConverter> convert = converters.iterator();
	        
	        while(convert.hasNext()) {
	        	NexacroConverter nexacroConvert = convert.next();
	        	register(nexacroConvert);
	        }
    	}
    }
    
    public static void register(NexacroConverter converter) {
    	//block level synchronized
    	synchronized(NexacroConverterFactory.class) {
	        if(converter == null) {
	            throw new IllegalArgumentException(NexacroConverter.class.getName()+" must not be null.");
	        }
	        
	        if(converterSets.contains(converter)) {
	            return;
	        }
	        
	        if(LOGGER.isDebugEnabled()) {
	        	LOGGER.debug(converter.getClass() + " registered.");
	        }
	        converterSets.add(converter);
    	}
    }

    private static class NullConverter implements NexacroConverter {

        private final Class source;
        private final Class target;
        
        private NullConverter(Class source, Class target) {
            this.source = source;
            this.target = target;
        }
        
        public boolean canConvert(Class source, Class target) {
            return false;
        }
        
        public Object convert(Object source, ConvertDefinition definition) throws NexacroConvertException {
            throw new UnsupportedOperationException("Unsupported convert type. source="+source+", target="+target);
        }
        
        @Override
        public void addListener(NexacroConvertListener listener) {
        	//Override Method if necessary
        }
        
        @Override
        public void removeListener(NexacroConvertListener listener) {
        	//Override Method if necessary
        }
    }
}
