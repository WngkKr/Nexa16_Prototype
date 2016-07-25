package nexacro.sample.web;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileDelete extends HttpServlet {

	private static final long serialVersionUID = -8082952093364368688L;
	private final Logger logger = LoggerFactory.getLogger(FileDelete.class);
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response	) throws ServletException, IOException {
		
		String successYN = "";
		String dir = null;
		String fileName = request.getParameter("file");
		request.setCharacterEncoding("utf-8");
		
		String contextRealPath = request.getSession().getServletContext().getRealPath("/");
		String path            = request.getParameter("path");
		String savePath        = contextRealPath + path;

		File directory = new File(savePath);
		
		// server setting change..
		fileName = new String(fileName.getBytes("iso8859-1"), "UTF-8");
		String inData = new String(fileName.getBytes("iso8859-1"), "UTF-8");

			
		if( directory.isDirectory()) {
			String[] dirlist = directory.list();
			
			if( dirlist == null) return;
			
			for( int i=0; i<dirlist.length; i++){
				
				if(logger.isDebugEnabled()) {
					logger.debug("directory.list() " + i + " "+ dirlist[i] );
					logger.debug(inData);
				}
				
				if (dirlist[i].equals(fileName)){
					String existsPath = directory.getAbsolutePath() + "/" + fileName;

					File f = new File(existsPath);

					if(f.exists()){
						
						boolean success = f.delete();
				
						if(success){
							logger.debug("delete the " + fileName);
							successYN = "0";
						}
						else {
							logger.error("can't delete the file");
							successYN = "-1^can't delete the file";
						}
					}
					else {
						logger.debug("not exist file");
						successYN = "-1^not exist file";
					}
				}
			}
			logger.debug("dir.getAbsolutePath(): "+directory.getAbsolutePath());
		}
		else {
			if(logger.isDebugEnabled()) {
				logger.debug("dir is not a directory");	
			}
			successYN = "-1^dir is not a directory";
			
			if(logger.isDebugEnabled()) {
				logger.debug("dir is not a directory");	
			}
		}
	}

}
