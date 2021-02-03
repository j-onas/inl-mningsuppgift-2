const clientID = "ZCXBO3HBIWCGYD0U1203RBDRXTPHKXBBPCYV4TRUHEKIDQIR"
const clientSecret = "1X4SB3KHTPVBK1VG3KEJJTNARF5CJTZUVAYVKGQWOVEL1L3I"
const versionDate = dateToString();

window.onload=function(){
    var inputBox = document.querySelector("input");
    let timeOut = null;

    inputBox.addEventListener("keyup", function(){
        clearTimeout(timeOut);

        timeOut = setTimeout(function() {
            fetch("https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id="+clientID+"&client_secret="+clientSecret+"&v="+versionDate+"")
                                                                                                    .then(resp => resp.json())
                                                                                                    .then(res => console.log(res));
            console.log(inputBox.value)

        }, 1000);
        ;
    });
};


function dateToString(){
    let today = new Date();
    let dateYear = today.getUTCFullYear();
    let dateMonth = today.getUTCMonth();
    let dateDay = today.getUTCDay();
    
    if(dateDay < 10){
        dateDay = "0"+dateDay;
    }
    if(dateMonth < 10){
        dateMonth = "0"+dateMonth;
    }
    return dateYear.toString()+dateMonth.toString()+dateDay.toString();
}


