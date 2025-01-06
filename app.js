const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
    for(let currCode in countryList)
        {
            // console.log(currCode,countryList[currCode]);//printing code and country list
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            if(select.name === "from" && currCode === "USD")
            {
                newOption.selected = "selected";
            }
            else if(select.name === "to" && currCode === "NPR")
            {
                newOption.selected = "selected";
            }

            select.append(newOption);
        }
        select.addEventListener("change",(evt) =>{
            updateFlag(evt.target);//target the element where changes is made
        })
}

const updateFlag = (element) =>{
    // console.log("country name changed",element)
    let currCode = element.value;
    // console.log(currCode)//currency code is selected
    let countryCode = countryList[currCode];
    // console.log(countryCode);//to generate counrty code
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png `
     //since image is in parent of the select [ie: element] then we can
     let img = element.parentElement.querySelector("img")
     img.src = newSrc;
}


btn.addEventListener("click", (evt) =>{
    evt.preventDefault();//commonly when we click button the page will be refreshed but using this will prevent button default behaviour
    updateExchangeRate();
})

const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    // console.log(amount)
    let amtValue = amount.value;
    // console.log(amtValue);//to print amount to be converted
    if(amtValue == "" || amtValue < 1)
    {
        amtValue = 1;
        amount.value = "1";
    } 
    console.log(fromCurr.value,toCurr.value)
    
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        
        let finalAmount = amtValue * rate;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "An error occurred. Please try again later.";
        console.error("Error fetching exchange rate:", error);
    }
}
window.addEventListener("load", () => {
    updateExchangeRate();
})