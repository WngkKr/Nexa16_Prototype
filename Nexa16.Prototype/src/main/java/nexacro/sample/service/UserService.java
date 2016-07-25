package nexacro.sample.service;

import java.util.List;
import java.util.Map;

import nexacro.sample.vo.UserVO;

/**
 * Test를 위한 Servlce Sample Intreface
 * 
 * @author Park SeongMin
 * @since 08.12.2015
 * @version 1.0
 * @see
 */
public interface UserService {

    List<UserVO> selectUserVOList(UserVO searchVO);

    void modifyMultiUserVO(List<UserVO> modifyList);

    //Map처리추가 
    void modifyMultiUserMap(List<Map> modifyMapList);
}
