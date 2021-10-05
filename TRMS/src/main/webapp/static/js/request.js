async function getRequests() {

    let url = 'http://localhost:8080/TRMS/reimbursements';

    let res = await fetch(url)
    let eventJson = await res.json()

        .then(eventJson => {
            console.log(eventJson);
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
        })
        .catch(err => console.log(err));

}