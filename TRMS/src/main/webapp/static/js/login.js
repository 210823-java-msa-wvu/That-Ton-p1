// let userLoginObj;

async function login() {

    let url = "http://localhost:8080/TRMS/login";

    user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    console.log(user);

    localStorage.setItem("userLoginObj", JSON.stringify(user));
    localStorage.setItem("username", JSON.stringify(document.getElementById('username').value));

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.user)
    });
    console.log(res);

    // let resJson = await res.json()
    //     .then(res => {
    //         debugger;
    //         console.log(res);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
}

// function returnUser() {
//     return localStorage.getItem("userLoginObj");
// }

