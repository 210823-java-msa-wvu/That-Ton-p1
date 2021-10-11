package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Employee;
import models.Reimbursement;
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
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        if (path == null || path.equals("")) { // http://localhost:8080/TRMS/reimbursements

            switch (request.getMethod()) {

                case "GET": {
                    System.out.println("Getting all reimbursements from the database...");
                    response.getWriter().write(om.writeValueAsString(employeeServices.getAllEmployees()));
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int employeeId = Integer.parseInt(path);
            Employee b = null;

            switch (request.getMethod()) {
                // /reimbursements/1
                case "GET": {
                    response.getWriter().write(om.writeValueAsString(employeeServices.searchEmployeeById(employeeId)));
                    break;
                }

                case "PUT": {
                    b = om.readValue(request.getReader(), Employee.class);
                    employeeServices.updateEmployee(b);
                    break;
                }

                default: {
                    response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                    break;
                }

            }
        }
    }
}
