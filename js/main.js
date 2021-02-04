'use strict';

window.onload=function(){
    let inputBox = document.querySelector("input");
    let loading = document.getElementById("loading");

    inputBox.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            clearCards();
            console.log("User input: "+inputBox.value)
            fetchOpenWeather(inputBox.value);
        }
    });
};

function fetchFourSquareApi(userInput){
    const clientID = "ZCXBO3HBIWCGYD0U1203RBDRXTPHKXBBPCYV4TRUHEKIDQIR"
    const clientSecret = "1X4SB3KHTPVBK1VG3KEJJTNARF5CJTZUVAYVKGQWOVEL1L3I"
    let versionDate = dateToString();
    let cardParent = document.getElementById("cards");
    fetch("https://api.foursquare.com/v2/venues/search?near="+userInput+"&client_id="+clientID+"&client_secret="+clientSecret+"&v="+versionDate+"").then(resp => resp.json())
        .then(res => {
             Object.entries(res).forEach(entry => {
                const [key, value] = entry;
                if(key == "response"){
                    value["venues"].forEach(v => {
                        let lat = v["location"]["lat"]
                        let lng = v["location"]["lng"]
                        let name = v["name"].toString();
                        let address = "https://www.google.se/maps/@"+lat+","+lng+",20z"
                        let card = document.createElement("div");
                        let cardName = document.createElement("h3");
                        let cardImage = document.createElement("img")
                        let cardAddress = document.createElement("div")
                        let cardAddressURL = document.createElement("a")
                        

                        card.setAttribute("id", "card");
                        cardName.innerHTML = name;
                        cardImage.setAttribute("src", "img/placeholder.jpg")
                        cardImage.setAttribute("alt", "")
                        cardAddress.setAttribute("align", "center")
                        cardAddressURL.setAttribute("href", address)
                        cardAddressURL.setAttribute("target", "_blank")
                        cardAddressURL.innerHTML = '<p>Address</p>'
                        card.append(cardName)
                        card.append(cardImage)
                        card.append(cardAddress)
                        cardAddress.append(cardAddressURL)
                        cardParent.appendChild(card)
                    });
                };
            });            
        }).catch(error => console.log(error));                                                                
    }

function fetchOpenWeather(userInput){
    const apiKey = "8f406f1db4e51bc9de772cb2df5b29f1"
    let versionDate = dateToString();
    let cardParent = document.getElementById("cards");
    fetch("api.openweathermap.org/data/2.5/forecast/hourly?q="+userInput+"&appid="+apiKey+"").then(resp => resp.json())
        .then(res => {
             Object.entries(res).forEach(entry => {
                const [key, value] = entry;
                console.log(key, value)
                if(key == "response"){
                    value["venues"].forEach(v => {
                        //let lat = v["location"]["lat"] 
                    });
                };
            });            
        }).catch(error => console.log(error));                                                                
}

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


function clearCards() {

    //Hämta div-taggen som heter cards och ge den variablen cardParent
    var cardParent = document.getElementById("cards");

    //Hitta alla taggar under "cards"
    //Loopa igenom alla taggar som finns och ta bort dom
    var cardChildren = cardParent.childNodes;
    for(var i = cardChildren.length-1; i >= 0; i--){
        var cardChild = cardChildren[i];
        cardChild.parentNode.removeChild(cardChild);
    }
}