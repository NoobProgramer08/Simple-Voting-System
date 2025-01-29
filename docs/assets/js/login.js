const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn");
const register = document.querySelector("#register");
let voted = false;



btn.addEventListener('click',checkBlank);
register.addEventListener('click',transferWindow);


function checkBlank(){
    if(email.value === "" || password.value === ""){
        Swal.fire(({
            icon:"error",
            text:"Please dont leave any blank details",
        }));

    }else{
        validateUser();
    }
}




function validateUser(){

    const users = localStorage.getItem("User");
    let parsed = "";
    try{
    parsed = JSON.parse(users);
        
    }catch(error){
        showErrorMessage();

    }
    
    let found = false;
    
    if(localStorage.getItem("User") != undefined){
        parsed.forEach(element => {
            if(element.email == email.value && element.password == password.value){
                voted = element.voted;
                found = true;
                tempLogIn(voted);
                logIn();
                return;
            }
        }); 

        if(!found){
            Swal.fire({
                icon:"error",
                title:"Error",
                text:"Account not found!!"
            });

        }

    }else{
        if(parsed === null){
            showErrorMessage();

        }else{
            if(parsed.email == email.value && parsed.password == password.value){
                logIn();
    
            }else{
                showErrorMessage();
    
            }

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
    console.log("Logged in");
    Swal.fire({
        title: "Logged In !!",
        icon: "success",
        draggable: true
    }).then((button) => {
        (button.isConfirmed) ? window.location = "/docs/assets/pages/client.html" :"";
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
    window.location = "/docs/assets/pages/register.html";
}