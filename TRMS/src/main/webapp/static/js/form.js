document.getElementById("employee_name").innerHTML = "Welcome " + localStorage.getItem("username") + "!!!";

async function addForm(){
    let url = 'http://localhost:8080/TRMS/reimbursements';

    let eventType_input = document.getElementById("eventType").value;
    let location_input = document.getElementById("location").value;
    let description_input = document.getElementById("description").value;
    let start_time_input = document.getElementById("startTime").value;
    let end_time_input = document.getElementById("endTime").value;
    let gradingType_input = document.getElementById("gradingType").value;
    let grade_input = document.getElementById("grade").value;
    let cost_input = document.getElementById("cost").valueAsNumber;

    if(eventType_input == "UniversityCourses")
        cost_input = cost_input * 0.8;
    else if (eventType_input == "Seminars")
        cost_input = cost_input * 0.6;
    else if (eventType_input == "CertificationPrep")
        cost_input = cost_input * 0.75;
    else if (eventType_input == "Certification")
        cost_input = cost_input;
    else if (eventType_input == "TechnicalTraining")
        cost_input = cost_input * 0.9;
    else
        cost_input = cost_input * 0.3;

    if (cost_input > 1000)
        cost_input = 1000;

    let newForm = {
        "employee": {"employee_id": localStorage.getItem("employeeID")},
        "event_type": eventType_input,
        "event_location": location_input,
        "event_description": description_input,
        "start_date": start_time_input,
        "end_date": end_time_input,
        "grade_type": gradingType_input,
        "grade": grade_input,
        "amount": cost_input,
        "sup_approval": "",
        "head_approval": "",
        "benco_approval": ""
    }

    console.log(newForm);

    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(newForm),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.getElementById("evMessageBox").innerHTML = "Successfully submitted!";

}

function getEmployeeRequests() {
    let url = 'http://localhost:8080/TRMS/reimbursements/';

    document.getElementById("evMessageBox").innerHTML = "";

    let eid = localStorage.getItem("employeeID");
    let un = localStorage.getItem("username");

    console.log("Get all reimbursement requests from username " + un);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 & this.status == 200) {
            // console.log(this.response)
            let requests = JSON.parse(this.responseText)
            console.log(requests);

            const tableRow = document.getElementById("tableRow")
            tableRow.innerHTML = "";
            let count = 1;
            requests.forEach(res => {

                const content = `
                    <tr>
                        <th scope="row">${res.id}</th>
                        <td>${res.employee.first_name + " " + res.employee.last_name}</td>
                        <td>${res.event_type}</td>
                        <td>${res.event_location}</td>
                        <td>${res.event_description}</td>
                        <td>${res.start_date}</td>
                        <td>${res.end_date}</td>
                        <td>${res.grade_type}</td>
                        <td>${res.grade}</td>
                        <td>${"$"+res.amount}</td>
                        <td>${res.sup_approval}</td>
                        <td>${res.head_approval}</td>
                        <td>${res.benco_approval}</td>
                    </tr>

                `
                tableRow.innerHTML += content;
                count += 1;
                if(res.benco_approval == "Approve")
                    alert("Congratulation! Your request #" + res.id + " is approved!!!");
            })
        }
    };

    xhr.open("GET", url + eid, true);
    xhr.send();
}

function userLogout(){
    // Clear local storage
    localStorage.removeItem("username");
    localStorage.removeItem("userLoginObj");
    localStorage.removeItem("title");
    localStorage.removeItem("employeeID");

}