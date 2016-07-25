package nexacro.sample.web;

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nexacro.xapi.data.ColumnHeader;
import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataTypes;
import com.nexacro.xapi.data.PlatformData;
import com.nexacro.xapi.data.VariableList;
import com.nexacro.xapi.tx.HttpPlatformResponse;
import com.nexacro.xapi.tx.PlatformException;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

public class FileUpload extends HttpServlet{

	private static final long serialVersionUID = -4266180724832478686L;
	private static final Logger LOGGER = LoggerFactory.getLogger(FileUpload.class);
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String chkType = request.getHeader("Content-Type");
		
		LOGGER.debug("======================== 파일 처리 정보 출력 ========================");
		LOGGER.debug("파일 타입 : "+chkType);

		if( chkType == null ) return;

		request.setCharacterEncoding("utf-8");
		
		String contextRealPath = request.getSession().getServletContext().getRealPath("/");
		String path            = request.getParameter("path");
		String savePath        = contextRealPath + path;

		LOGGER.debug("파일 저장경로 : "+savePath);
		
		int maxSize = 500 * 1024 * 1024; // 최대 업로드 파일 크기 500MB(메가)로 제한

		PlatformData resData = new PlatformData();
		VariableList resVarList = resData.getVariableList();
		String sMsg = " A ";
		try {
			
			File filesForDir = new File(savePath);
			if (!filesForDir.exists()) {
				if (filesForDir.mkdirs()) {
					LOGGER.debug("성공!. 파일 저장 폴더 생성");
				}
				else {
					LOGGER.debug("실패!. 파일 저장 폴더 생성 ");
				}
			}
			
			MultipartRequest multi = new MultipartRequest(request, savePath, maxSize, "utf-8", new DefaultFileRenamePolicy());
			Enumeration<String> files = multi.getFileNames(); // 파일명 모두 얻기

			
			sMsg += "B ";
			DataSet ds = new DataSet("Dataset00");
			
			ds.addColumn(new ColumnHeader("fileName", DataTypes.STRING));
			ds.addColumn(new ColumnHeader("fileSize", DataTypes.LONG));
			ds.addColumn(new ColumnHeader("fileType", DataTypes.STRING));
			
			sMsg += "C ";

			String fileName="";

			while (files.hasMoreElements()) {
				sMsg += "D ";
				String name = (String)files.nextElement();
				String type = multi.getContentType(name);
				
				File f = multi.getFile(name);
				
				fileName = multi.getFilesystemName(name);
				
				LOGGER.debug("저장 파일 명:"+fileName);
				
				int row = ds.newRow();
				ds.set(row, "fileName", fileName);
				ds.set(row, "fileType", type);
				
				if (f != null) {
					ds.set(row, "fileSize", f.length());
				}		
				sMsg += row +" ";
			}
			
			resData.addDataSet(ds);
			resVarList.add("ErrorCode", 0);
			resVarList.add("ErrorMsg", fileName);
		}
		catch (Exception e) {
			resVarList.add("ErrorCode", -1);
			resVarList.add("ErrorMsg", sMsg + " " + e);
			e.printStackTrace();
		}

		LOGGER.debug("======================== 종료 파일 처리 정보 출력 ========================");
		
		HttpPlatformResponse res = new HttpPlatformResponse(response);
		res.setData(resData);
		
		try {
			res.sendData();
		} catch (PlatformException e) {
			LOGGER.error("데이터 전송 중 오류가 발생하였습니다.");
		}
	}

}
