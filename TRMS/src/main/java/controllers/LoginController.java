package controllers;

import services.UserServices;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginController implements FrontController {

    private Logger log = LogManager.getLogger(LoginController.class);
    private UserServices userServices = new UserServices();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println("Username: " + username + " Password: " + password);
        if (userServices.login(username, password)) {
            if (userServices.checkTitle(username).equals("Employee") == true) {
                response.sendRedirect("static/form.html");
                System.out.println("Login successfully, welcome " + username + "!!!");
            }
            else if (userServices.checkTitle(username).equals("Supervisor") == true) {
                response.sendRedirect("static/request.html");
                System.out.println("Login successfully, welcome Supervisor " + username + "!!!");
            }
            else if (userServices.checkTitle(username).equals("Manager") == true) {
                response.sendRedirect("static/request.html");
                System.out.println("Login successfully, welcome Manager " + username + "!!!");
            }
            else {
                response.sendRedirect("static/request.html");
                System.out.println("Login successfully, welcome Benefit Coordinator " + username + "!!!");
            }
        }
        else {
            response.sendRedirect("static/failed.html");
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid login credentials");
        }
    }
}