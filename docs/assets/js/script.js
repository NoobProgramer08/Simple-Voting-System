const buttons = Array.from(document.querySelectorAll(".btn"));
let voted = false;

buttons.forEach((button) => button.addEventListener('click',getCurrency));

document.addEventListener('DOMContentLoaded', () => {
    countUsers();
    (getLogged()) ? voted = true : ""; (voted) ? disableButtons() : "";

    }
);

function getCurrency(event){
    const target = event.target.id; 
    handleVote(target);

    
}

function getLogged(){
    const getItems = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);

    return parsed.voted;
}


function handleVote(currency){
    let votes = 0;
    if(!voted){
        if(localStorage.getItem(`${currency}`) != undefined){
            votes = getPreviousVote(currency);
            addVote(currency,votes);
            return;
        }else{
            addVote(currency,0);
        }
    }

}


function getPreviousVote(currency,votes){
    const getItems = localStorage.getItem(`${currency}`);
    const parsed = JSON.parse(getItems);

    return parsed.voteCount;

}

function addVote(currency,votes){
    const newVote = {
        currency:currency,
        voteCount:votes+1,
    }

    localStorage.setItem(`${currency}`,JSON.stringify(newVote));

    
    Swal.fire({
        title: "Voted Successfully!",
        icon: "success",
        draggable: true
    });
    
    voted = true;

    if(voted){
        disableButtons();
        updateVoted();

    }

}

function disableButtons(){
    buttons.forEach((button) => {
        button.innerHTML = "Done Voting";
        button.style.backgroundColor = "#E63946";
        button.style.color =  "white";
    })
}

function updateVoted(){
    const getItems = localStorage.getItem("User");
    const getLoggedIn = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);
    const logs = JSON.parse(getLoggedIn);

    const changed = parsed.map((user) => {
        if(user.email == logs.email && user.password == logs.password){
            user.voted = true;

        }
        return user;
    });

    localStorage.setItem("User",JSON.stringify(changed));

    updateStatus();
}


function countUsers(){
    const getUsers = localStorage.getItem("User");
    const parsedUsers = JSON.parse(getUsers);
    
    const userCount = parsedUsers.reduce((acc,item) => {
        acc++
        return  acc;
    },0);
    
    document.querySelector("#totalUsers").textContent = userCount;

    countVoted(parsedUsers);


}

function countVoted(users){

    if(users.length != undefined){
        const voted =   users.reduce((acc,user) => {
            
            if(user.voted == true){
                acc++;
        

            }
            return acc;
        },0)
            
        
        document.querySelector("#doneVote").textContent = voted;
    }else{
        document.querySelector("#doneVote").textContent = 1;
    }
    

}

function updateStatus(){
    const getItems = localStorage.getItem("logged");
    const parsed = JSON.parse(getItems);

    const updated = {
        email:parsed.email,
        password:parsed.password,
        voted:true,
    }

    localStorage.setItem("logged",JSON.stringify(updated));
    
    

}