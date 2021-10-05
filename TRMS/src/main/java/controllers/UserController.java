package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import services.UserServices;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class UserController implements FrontController {
    private UserServices userServices = new UserServices();
    ObjectMapper om = new ObjectMapper();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(session != null && session.getAttribute("username") != null){
            String username = (String) session.getAttribute("username");
            System.out.println(userServices.getByUsername(username));
            response.getWriter().write(om.writeValueAsString(userServices.getByUsername(username)));
        } else {
            assert false;
            session.invalidate();
            response.sendRedirect("static/index.html");
        }
    }
}
