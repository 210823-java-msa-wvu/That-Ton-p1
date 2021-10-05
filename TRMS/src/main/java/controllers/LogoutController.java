package controllers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LogoutController implements FrontController{
    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session != null) {
            session.invalidate();
            response.sendRedirect("static/index.html");
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
