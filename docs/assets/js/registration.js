const email = document.querySelector("#newEmail");
const password = document.querySelector("#newPassword");
const btn = document.querySelector("#register");
const signIn = document.querySelector("#signIn");


btn.addEventListener('click',validateUser);
signIn.addEventListener('click',transferWindow);




function validateUser(e){
    e.preventDefault();
    return  (email.value == "" || password.value == "") ?  showAlertMessage() : registerUser();

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
    
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "Sign in succesfull, wanna log in?",
    text: "You won't be able to revert this!",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Yes, sign me in!",
    cancelButtonText: "No, stay on page!",
    reverseButtons: true,

  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Signed in!",
        text: "You have been sign in",
        icon: "success"
      }).then((button) => {

        button.isConfirmed ? handleLogIn() : "";
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "You have stayed on page",
        icon: "success"
      });
    }
  });
}

function transferWindow(){
  window.location = "/docs/index.html"

}

function clearInputs(){
    email.value = "";
    password.value = "";

}

function handleLogIn(){
    const loggedIn = {
      email:email.value,
      password:password.value,
      voted:false
    }
    clearInputs();

    localStorage.setItem('logged',JSON.stringify(loggedIn));
    window.location = "/docs/assets/pages/client.html";
}