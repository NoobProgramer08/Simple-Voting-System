const table = document.querySelector("#table");

document.addEventListener('DOMContentLoaded',loadTable);


function loadTable(){
    const data = localStorage.getItem('Votes');
    let parsed = JSON.parse(data);
    let btc = 0, eth = 0, tht = 0 , xrp = 0;
    
    const voted =  parsed.forEach((data) => {
            if(data.currency === 'btc'){
                btc++;

            }else if(data.currency === 'eth'){
                eth++;

            }else if(data.currency === 'tht'){
                tht++

            }else if(data.currency === 'xrp'){
                xrp++;

            }
        
            
    });

    const currencies = [
        { name : "BTC", votecount : btc },
        { name : "ETH", votecount : eth },
        { name : "THT", votecount : tht },
        { name : "XRP", votecount : xrp },

    ]
        sortData(currencies);

}
function sortData(currencies){
    const sorted = currencies.sort((a,b) => {return b.votecount - a.votecount});
    handleTable(sorted);
    
    
}

function handleTable(currencies){
    let ranking = 1;
    currencies.forEach((data) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML =` <td>${ranking++}</td>
                            <td>${data.name}</td>
                            <td>${data.votecount}</td>`
        table.appendChild(newRow);
                            
    })


}