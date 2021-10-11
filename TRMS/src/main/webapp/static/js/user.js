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

    let xhttp = new XMLHttpRequest();
    let eid = localStorage.getItem("employeeID")

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //We have a successful and completed request and can now process the response.
            let employee = JSON.parse(this.responseText);
        }
    }

    let eurl = `http://localhost:8080/TRMS/employees/`

    //step 3
    xhttp.open("GET", eurl + eid, true);

    //step 4
    xhttp.send();

}
