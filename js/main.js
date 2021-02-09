'use strict'

//Börja lyssna på keypress events EFTER att sidan laddats in
window.onload=function(){
    let inputBox = document.querySelector("input")
    let loading = document.getElementById("loading")

    inputBox.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            clearCards()
            var weather = document.getElementById("weather")
            var weatherChildren = weather.childNodes
            for(var i = weatherChildren.length-1; i >= 0; i--){
                var weatherChild = weatherChildren[i]
                weatherChild.parentNode.removeChild(weatherChild)
            }
            try{
                let errorH = document.getElementById("errorH")
                let errorH2 = document.getElementById("errorH2")

                if(errorH){
                    errorH.remove()
                }
                if(errorH2){
                    errorH2.remove()
                }
            }catch(Exception){
                if(Exception instanceof TypeError){
                    console.log(Exception.stack)
                }
            }
            console.log("User input: "+inputBox.value)
            fetchFourSquareApi(inputBox.value)
            fetchOpenWeatherApi(inputBox.value)
        }
    })
}

function fetchFourSquareApi(userInput){
    const clientID = "ZCXBO3HBIWCGYD0U1203RBDRXTPHKXBBPCYV4TRUHEKIDQIR"
    const clientSecret = "1X4SB3KHTPVBK1VG3KEJJTNARF5CJTZUVAYVKGQWOVEL1L3I"
    let versionDate = dateToString()
    let cardParent = document.getElementById("cards")

    //Hämta & gör om data till JSON-format
    //Söker efter sevärdigheter nära userInput
    //Använder v (venues) för att plocka ut data- 
    //ur min request
    //Får vi status koden 200 så går vi vidare med-
    //att skapa de superfina korten
    fetch("https://api.foursquare.com/v2/venues/search?near="+userInput+"&client_id="+clientID+"&client_secret="+clientSecret+"&v="+versionDate+"").then(resp => resp.json())
        .then(res => {
            if(res["meta"]["code"] == 200){
             Object.entries(res).forEach(entry => {
                const [key, value] = entry
                
                if(key == "response"){
                    value["venues"].forEach(v => {
                        let lat = v["location"]["lat"]
                        let lng = v["location"]["lng"]
                        let name = v["name"].toString()
                        let address = "https://www.google.se/maps/@"+lat+","+lng+",20z"
                        let card = document.createElement("div")
                        let cardName = document.createElement("h3")
                        let cardImage = document.createElement("img")
                        let cardAddress = document.createElement("div")
                        let cardAddressURL = document.createElement("a")
                        

                        card.setAttribute("id", "card")
                        cardName.innerHTML = name
                        cardImage.setAttribute("src", "img/placeholder.jpg")
                        cardImage.setAttribute("alt", name)
                        cardAddress.setAttribute("align", "center")
                        cardAddressURL.setAttribute("href", address)
                        cardAddressURL.setAttribute("target", "_blank")
                        cardAddressURL.innerHTML = '<p>Location</p>'
                        card.append(cardName)
                        card.append(cardImage)
                        card.append(cardAddress)
                        cardAddress.append(cardAddressURL)
                        cardParent.appendChild(card)
                    })
                }
            })
        }else{
            parent = document.getElementById("errorMessages")
            let errorH = document.createElement("h2")
            errorH.setAttribute("id", "errorH")
            errorH.innerText = '"'+userInput+'" not found in the city API'
            parent.append(errorH)
        }           
        })
        .catch(error => console.log(error))                                                                
    }

    
function fetchOpenWeatherApi(userInput){
    const apiKey = "8f406f1db4e51bc9de772cb2df5b29f1"
    let parent = document.getElementById("weather")

    //Skapar en request som frågar efter väder i staden userInput
    //Units=metric gör om till celsius, default vad kelvin
    //De kallar sin status_kod för "cod" av någon anledning
    //Här använder jag inget foreach entry som i förra
    //eftersom jag ville testa fler sätt att pilla med fetch
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=metric&lang=se&appid="+apiKey+"").then(resp => resp.json())
        .then(res => {
            if(res["cod"] == 200){
                let weatherType = document.createElement("h3")
                let weatherIcon = document.createElement("img")
                let weatherTemperature = document.createElement("p")

                weatherType.innerHTML = res["weather"][0]["description"]
                weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+res["weather"][0]["icon"]+"@2x.png")
                weatherTemperature.innerHTML = res["main"]["temp"].toString()+"°C"

                parent.append(weatherType)
                parent.append(weatherIcon)
                parent.append(weatherTemperature)
            }else{
                parent = document.getElementById("errorMessages")
                let errorH = document.createElement("h2")
                errorH.setAttribute("id", "errorH2")
                errorH.innerText = '"'+userInput+'" not found in the weather API'
                parent.append(errorH)
            }  
        })
        .catch(error => console.log(error))                                                           
}


//Behövde datum i foursquare requesten
//Så valde göra en funktion som gör parsar
//datumet till YYYYMMDD-format
function dateToString(){
    let today = new Date()
    let dateYear = today.getUTCFullYear()
    let dateMonth = today.getUTCMonth()
    let dateDay = today.getUTCDay()
    
    if(dateDay < 10){
        dateDay = "0"+dateDay
    }
    if(dateMonth < 10){
        dateMonth = "0"+dateMonth
    }
    return dateYear.toString()+dateMonth.toString()+dateDay.toString()
}

//Saxat ut min förra uppgift
//Plockar bort alla div-
//med id cards
function clearCards() {

    //Hämta div-taggen som heter cards och ge den variablen cardParent
    var cardParent = document.getElementById("cards")

    //Hitta alla taggar under "cards"
    //Loopa igenom alla taggar som finns och ta bort dom
    var cardChildren = cardParent.childNodes
    for(var i = cardChildren.length-1; i >= 0; i--){
        var cardChild = cardChildren[i]
        cardChild.parentNode.removeChild(cardChild);
    }
}
