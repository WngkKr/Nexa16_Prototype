package nexacro.sample.web;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileDownload extends HttpServlet {

	private static final long serialVersionUID = -1404504659327517912L;
	private final Logger logger = LoggerFactory.getLogger(FileDownload.class);

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String contextRealPath = request.getSession().getServletContext().getRealPath("/");
		String path            = request.getParameter("path");
		String savePath        = contextRealPath + path;

		logger.debug("======================== 시작 파일 처리 정보 출력 ========================");
		logger.debug("저장 경로:"+savePath);

		String name = request.getParameter("file");
		
		logger.debug("다운로드 파일명 :"+name);

		String filename = new String(name.getBytes("iso8859-1"), "UTF-8");

		byte[] buffer = new byte[1024];
		ServletOutputStream outStream = null;
		BufferedInputStream inStream = null;
		File fis = new File(savePath + "/" + filename);
		
		logger.debug(name+ "/" + filename+"||");
		
		if(fis.exists()){
			try{
				response.setContentType("utf-8");
				response.setContentType("application/octet;charset=utf-8");
				response.setHeader("Content-Disposition", "attachment;filename=" + filename);
				
		   		outStream = response.getOutputStream();
				inStream  = new BufferedInputStream(new FileInputStream(fis));

				int n = 0;
				while ((n = inStream.read(buffer, 0, 1024)) != -1) {
					outStream.write(buffer, 0, n);
				}// while
			}
			catch (IOException ioe) {
				//e.printStackTrace();
				logger.error("파일 생성 오류 발생");
			} finally {
				if (inStream != null) {
					try {
						inStream.close();
					} catch (Exception e) {
						logger.error("inStream.close() 오류 발생");
					}
				}
				if (outStream != null) {
					try {
						outStream.close();
					} catch (Exception e) {
						logger.error("outStream.close() 오류 발생");
					}
				}
			}
		}else{
				response.sendRedirect("unknownfile");
		}
		logger.debug("======================== 종료 파일 처리 정보 출력 ========================");
	}
}
