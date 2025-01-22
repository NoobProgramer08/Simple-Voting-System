const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const register = document.querySelector("#register");
let voted = false;


btn.addEventListener('click',validateUser);
register.addEventListener('click',transferWindow);

function validateUser(e){
    e.preventDefault();
    const users = localStorage.getItem("User");
    const parsed = JSON.parse(users);
    if(localStorage.getItem("User") != undefined){
        
        parsed.forEach(element => {
            if(element.email == email.value && element.password == password.value){
                voted = element.voted;
                tempLogIn(voted);
                logIn();
                return;
            }
        }); 


        

    }else{
        if(parsed.email == email.value && parsed.password == password.value){
            logIn();

        }else{
            showErrorMessage();

        }
    }    
}

function logIn(){
    showMessage();

}
function showErrorMessage(){
    Swal.fire({
        title: "Account not found !!",
        icon: "error",
        draggable: true
        }).then((button) => {
            if(button.isConfirmed){
                return;
            }
        });
}
function showMessage(){
    Swal.fire({
        title: "Logged In !!",
        icon: "success",
        draggable: true
    }).then((button) => {
        (button.isConfirmed) ? window.location = "/docs/client.html" :"";
    });
}

function tempLogIn(voted){
    const loggedIn = {
        email:email.value,
        password:password.value,
        voted:voted
    }

    localStorage.setItem('logged',JSON.stringify(loggedIn));
}

function transferWindow(){
    window.location = "/docs/register.html";
}