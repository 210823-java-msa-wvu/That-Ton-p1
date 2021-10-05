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
    let employeeId = document.getElementById('');
    employeeId.value = data.employee_id;
}