package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import services.UserServices;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserController implements FrontController {
    private UserServices userServices = new UserServices();
    ObjectMapper om = new ObjectMapper();

    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.getWriter().write(om.writeValueAsString(userServices.getAllUsers()));
    }
}
