const URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button");
const downs = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".message");
const copyButton = document.getElementById('copyButton');
let messageText= "";
for (let select of downs) {
  for (let currCode in countryList) {
    let newO = document.createElement("option");
    newO.innerText = currCode;
    newO.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newO.selected = "true";
    } else if (select.name == "to" && currCode == "INR") {
      newO.selected = "true";
    }
    select.append(newO);
  }

  select.addEventListener("change", (event) => {
    updateflg(event.target);
  });
}
const updateflg = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const BASE_URL = `${URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(BASE_URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  messageText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
  message.innerText = messageText;
  console.log(messageText);
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateRate();
});

window.addEventListener("load", () => {
  updateRate();
});

copyButton.addEventListener("click", ()=> {
    
    navigator.clipboard.writeText(messageText).then(() => {
        alert('Conversion result copied to clipboard!');
    }, (err) => {
        console.error('Failed to copy: ', err);
    });
});

