async function getUser() {
    let url = 'http://localhost:8080/TRMS/users';

    let res = await fetch(url)
    let data = await res.json()

        .then(data => {
            console.log(data);
            // populateData(data);
        })
        .catch(err => console.log(err));

}

function populateData(data) {
    let employeeName = document.getElementById("employee_name");
    employeeName.innerHTML = "Welcome " + data.employee.first_name + " " + data.employee.last_name;
}
// document.getElementById("bencoApproval").innerHTML = eventJson.benco_approval;