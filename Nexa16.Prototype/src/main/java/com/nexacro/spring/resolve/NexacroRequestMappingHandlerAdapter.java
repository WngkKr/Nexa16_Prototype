package com.nexacro.spring.resolve;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

public class NexacroRequestMappingHandlerAdapter extends RequestMappingHandlerAdapter {
	@Override
	public void afterPropertiesSet() {
		super.afterPropertiesSet();
		
		List<HandlerMethodArgumentResolver> argumentResolvers = getArgumentResolvers();
		
		if (argumentResolvers != null) {
			List<HandlerMethodArgumentResolver> tempArgumentResolvers = new ArrayList<HandlerMethodArgumentResolver>(argumentResolvers);

			int nexacroMethodArgumentResolverIndex = getNexacroMethodArgumentResolverIndex(tempArgumentResolvers);
			HandlerMethodArgumentResolver nexacroMethodArgumentResolver = tempArgumentResolvers.remove(nexacroMethodArgumentResolverIndex);
			if (nexacroMethodArgumentResolver != null) {
				tempArgumentResolvers.add(0, nexacroMethodArgumentResolver);
				setArgumentResolvers(tempArgumentResolvers);
			}
		}
	}

	/**
	 * getNexacroResolverIndex
	 * @param argumentResolverList
	 * @return
	 */
	private int getNexacroMethodArgumentResolverIndex(List<HandlerMethodArgumentResolver> argumentResolverList) {
		int size = argumentResolverList.size();
		for (int i = 0; i < size; i++) {
			if (argumentResolverList.get(i) instanceof NexacroMethodArgumentResolver) {
				return i;
			}
		}
		return -1;
	}
}
