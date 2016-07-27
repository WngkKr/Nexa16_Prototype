/**
*  인트라넷 고도화[Lexpeed3]구축 사업
*
*  @MenuPath 
*  @FileName LIB_COMMON
*  @Creator 송원창
*  @CreateDate 2016.04.15
*  @LastModifier 
*  @LastModifyDate 
*  @Version 1.0
*  @Outline 공통 함수 File Link, 공통변수 선언
*  @Desction 
* 			1) 공통 함수 File Link, 공통변수 선언 
* 
* 
************** 소스 수정 이력 *************************************************
*    date          Modifier            Description
*******************************************************************************
*  2016.04.15	   송원창			   최초 생성
*******************************************************************************
*/

var LIB_COMMON = nexacro.Form.prototype;

/*
include "LIB::LIB_COMP.xjs";		// 컴포넌트
include "LIB::LIB_DATASET.xjs";		// 데이터셋
include "LIB::LIB_DATE.xjs";		// 날짜
include "LIB::LIB_FORM.xjs";		// 화면
include "LIB::LIB_FORMAT.xjs";		// 포멧
include "LIB::LIB_GRID.xjs";		// 그리드
include "LIB::LIB_TRAN.xjs";		// 통신
include "LIB::LIB_UTIL.xjs";		// 유틸
include "LIB::LIB_VALIDATE.xjs";	// 정합성체크
*/
//----------------------------------------------------------------------
//그리드
//----------------------------------------------------------------------
LIB_COMMON.GC_GRID_RBTNDOWN_EVENT = "gDynaVar_OldRBtnDownEvent_";

LIB_COMMON.GC_DYNA_GRID_ONHEADCLICK	 = "dyna_var_SourceGridOnHeadClick_";
LIB_COMMON.GC_DYNA_GRID_CHECK_IDXS     = "dyna_var_Grid_CheckIdxs_";
LIB_COMMON.GC_DYNA_GRID_NONSORT_IDXS   = "dyna_var_Grid_NonSortIdxs_";

LIB_COMMON.GC_CONST_ASC_MARK  = " ▲";
LIB_COMMON.GC_CONST_DESC_MARK = " ▼";
LIB_COMMON.GC_CT_SEPARATOR    = "	";
