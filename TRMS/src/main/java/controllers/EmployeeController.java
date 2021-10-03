package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import services.EmployeeServices;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class EmployeeController implements FrontController{

    private ObjectMapper om = new ObjectMapper();
    private EmployeeServices employeeServices = new EmployeeServices();
    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.getWriter().write(om.writeValueAsString(employeeServices.getAllEmployees()));
    }
}
