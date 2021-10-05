async function getRequests() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        console.log("Current Ready State: " + this.readyState);

        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            console.log("Successful Call");

            console.log(this.responseText);
            let eventJson = JSON.parse(this.responseText);

            console.log(eventJson);
            document.getElementById("reimbursementid").innerHTML = eventJson.id;
            document.getElementById("employeeName").innerHTML = eventJson.employeeId;
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

    let url = `http://localhost:8080/TRMS/reimbursements`

    //step 3
    xhttp.open("GET", url, true);

    //step 4
    xhttp.send();

}
