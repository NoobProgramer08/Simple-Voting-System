const email = document.querySelector("#newEmail");
const password = document.querySelector("#newPassword");
const btn = document.querySelector("#register");


btn.addEventListener('click',validateUser);




function validateUser(e){
    e.preventDefault();
    return  (email.value == "" || password.value == "") ?  showAlertMessage():registerUser();

} 

function showAlertMessage() {

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Dont leave any blank inputs!",
    });
};

function registerUser(){
    let users = [];
    const newUser = {
        email:email.value,
        password:password.value,
        voted:false
    }

    if(localStorage.getItem("User") != undefined){
        users =  getUsers(users);
        users.push(newUser);

    }else{
        users.push(newUser);
    }
  
  localStorage.setItem("User",JSON.stringify(users));
    showSuccess();
}

function getUsers(users){
    const getUser = localStorage.getItem("User");
    const parsed =  JSON.parse(getUser);

    parsed.forEach((element) => {users.push(element)});

    console.log(users);
    
    return users;
}

function showSuccess(){
    

   Swal.fire({
        title: "Registration Successfull",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
}