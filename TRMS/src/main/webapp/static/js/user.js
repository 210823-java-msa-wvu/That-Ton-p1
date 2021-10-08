async function getUser() {
    let url = 'http://localhost:8080/TRMS/users';

    let res = await fetch(url)
    let data = await res.json()

        .then(data => {
            console.log(data);
            // populateData(data);
            localStorage.setItem("employeeID", JSON.stringify(data.employee_id));
            localStorage.setItem("title", JSON.stringify(data.title));
        })
        .catch(err => console.log(err));

}

// function populateData(data) {
//
// }
// document.getElementById("bencoApproval").innerHTML = eventJson.benco_approval;