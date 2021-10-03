function addForm(){

    let eventType_input = document.getElementById("eventType").value;
    let location_input = document.getElementById("location").value;
    let description_input = document.getElementById("description").value;
    let start_time_input = document.getElementById("startTime").value;
    let end_time_input = document.getElementById("endTime").value;
    let gradingType_input = document.getElementById("gradingType").value;
    let grade_input = document.getElementById("grade").value;
    let cost_input = document.getElementById("cost").value;


    let xhttp = new XMLHttpRequest();
    let url = `http://localhost:8080/TRMS/reimbursements`;

    xhttp.open("POST", url, true);

    xhttp.setRequestHeader('Content-type', 'application/json');

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {

            console.log("Successful Call");

        }
    };


    let newForm = {
        "employee_id": 2,
        "eventType" : eventType_input,
        "location" : location_input,
        "description" : description_input,
        "start_time" : start_time_input,
        "end_time" : end_time_input,
        "gradingType" : gradingType_input,
        "grade" : grade_input,
        "cost" : cost_input
    }
    console.log(newForm);

    //step 4
    newForm = JSON.stringify(newForm);
    xhttp.send(newForm);
    alert("Request Sent!");
    document.getElementById("evMessageBox").innerHTML = "Request Sent!";

}

function getForm() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        console.log("Current Ready State: " + this.readyState);

        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            console.log("Successful Call");

            console.log(this.responseText);
            let eventJson = JSON.parse(this.responseText);

            console.log(eventJson);
            //Inputting data into table
            document.getElementById("reimbursementid").innerHTML = eventJson.id;
            document.getElementById("employeeName").innerHTML = eventJson.employee.first_name;
            document.getElementById("eventTypeTable").innerHTML = eventJson.event_type;
            document.getElementById("locationTable").innerHTML = eventJson.event_location;
            document.getElementById("descriptionTable").innerHTML = eventJson.event_description;
            document.getElementById("startDate").innerHTML = eventJson.start_date;
            document.getElementById("endDate").innerHTML = eventJson.end_date;
            document.getElementById("gradeType").innerHTML = eventJson.grade_type;
            document.getElementById("gradeTable").innerHTML = eventJson.grade;
            document.getElementById("reimbursementAmount").innerHTML = eventJson.amount;
            document.getElementById("supApproval").innerHTML = eventJson.sup_approval;
            document.getElementById("headApproval").innerHTML = eventJson.head_approval;
            document.getElementById("bencoApproval").innerHTML = eventJson.benco_approval;
        }
    }

    let eventId = document.getElementById("EventIdInput").value;

    let url = `http://localhost:8080/TRMS/reimbursements/` + eventId;

    //step 3
    xhttp.open("GET", url, true);

    //step 4
    xhttp.send();

}

