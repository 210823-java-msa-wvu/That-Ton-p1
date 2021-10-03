package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.Reimbursement;
import services.ReimbursementServices;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ReimbursementController implements FrontController{

    private ReimbursementServices reimbursementServices = new ReimbursementServices();
    private ObjectMapper om = new ObjectMapper();
    @Override
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        // Getting the attribute we set in the RequestHandler's handle() method
        String path = (String) request.getAttribute("path");
        System.out.println("Path attribute: " + path);

        if (path == null || path.equals("")) { // http://localhost:8080/TRMS/reimbursements

            switch (request.getMethod()) {

                case "GET": {
                    System.out.println("Getting all reimbursements from the database...");
                    response.getWriter().write(om.writeValueAsString(reimbursementServices.getAllReimbursements()));
                    break;
                }

                case "POST": {
                    // then we would add the reimbursement (read from the request body) to the database
                    Reimbursement b = om.readValue(request.getReader(), Reimbursement.class);
                    reimbursementServices.createReimbursement(b);
                    break;
                }

            }


        } else {
            // Else -> there IS a path attribute that we need to use in our logic

            // save that attribute into an integer
            int reimbursementId = Integer.parseInt(path);
            Reimbursement b = null;

            switch (request.getMethod()) {
                // /books/1
                case "GET": {
                    b = reimbursementServices.getReimbursementById(reimbursementId);
                    if (b != null) {
                        response.getWriter().write(om.writeValueAsString(b));
                    } else {
                        response.sendError(404, "Reimbursement not found");
                    }
                    break;
                }

                case "PUT": {
                    b = om.readValue(request.getReader(), Reimbursement.class);
                    reimbursementServices.updateReimbursement(b);
                    break;
                }
                case "DELETE": {
                    reimbursementServices.deleteReimbursement(reimbursementId);
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
