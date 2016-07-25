package nexacro.sample.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import nexacro.sample.service.UserService;
import nexacro.sample.vo.UserVO;

import org.springframework.stereotype.Controller;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.spring.NexacroException;
import com.nexacro.spring.annotation.ParamDataSet;
import com.nexacro.spring.data.NexacroResult;

/**
 * Test를 위한 Controller Sample Class
 * 
 * @author Park SeongMin
 * @since 08.12.2015
 * @version 1.0
 * @see
 */
@Controller
public class UserController {

	// Name 정의
	// @Autowired(required = false) // Type 정의
	@Resource(name = "userService")
	private UserService	userService;

	@Resource
	private Validator	validator;

    @InitBinder
	public void initBinder(WebDataBinder dataBinder){
		dataBinder.setValidator(this.validator);
	}
    
    @RequestMapping(value = "/userSelectVO.do")
	public NexacroResult selectVo(@ParamDataSet(name = "ds_search", required = false) UserVO searchVo) {
        
        List<UserVO> userList = userService.selectUserVOList(searchVo);
        
        NexacroResult result = new NexacroResult();
        result.addDataSet("output1", userList);
        
        return result;
    }
	
	//Map처리 
	@RequestMapping(value = "/userModifyVO.do")
	public NexacroResult modifyVO(@ParamDataSet(name = "input1") List<Map> modifyList) throws NexacroException {
		
		//validate(modifyList);

		userService.modifyMultiUserMap(modifyList);

		NexacroResult result = new NexacroResult();

		return result;
	}
}
