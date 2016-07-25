package nexacro.sample.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.spring.annotation.ParamDataSet;
import com.nexacro.spring.annotation.ParamVariable;
import com.nexacro.spring.data.NexacroResult;
import com.nexacro.xapi.data.DataSet;

/**
 * <pre>
 * Test를 위한 Controller Sample Class
 * </pre>
 * 
 * @author Park SeongMin
 * @since 08.12.2015
 * @version 1.0
 * @see
 */
@Controller
public class SecureController {

    // Name 정의
    @RequestMapping(value = "/secureSelectVO.do")
     public NexacroResult secureData(@ParamVariable(name="id")  String paramValue , @ParamDataSet(name="dsInput") DataSet dsUnit) {
        NexacroResult result = new NexacroResult();
        return result;
    }
}
