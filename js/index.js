// Navbar heart element
const navbarHeart = document.getElementById("heart");

// সব card heart আইকন
const cardHearts = document.querySelectorAll("#card-container .fa-heart");

// click event listener
cardHearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    // Navbar heart count বাড়ানো
    let currentCount = parseInt(navbarHeart.innerText);
    currentCount++;
    navbarHeart.innerText = currentCount;

    // optional: click করা heart কে full heart এ convert করা
    heart.classList.remove("fa-regular");
    heart.classList.add("fa-solid", "text-red-500");
  });
});

// coin & heart element
const coinEl = document.getElementById("coin");

// coin value
let coins = parseInt(coinEl.innerText);

// card container
const cardContainer = document.getElementById("card-container");

// call history container
const callHistoryContainer = document.createElement("div");
callHistoryContainer.id = "call-history-list";
callHistoryContainer.className = "mt-4 space-y-2";
const aside = document.querySelector("aside");

// create clear history button
const clearHistoryBtn = document.createElement("button");
clearHistoryBtn.innerText = "Clear History";
clearHistoryBtn.className =
  "btn btn-soft rounded-2xl py-2 bg-red-600 text-white hover:bg-red-700 ml-2";
clearHistoryBtn.addEventListener("click", () => {
  callHistoryContainer.innerHTML = "";
});

// append title & history container
const historyTitleDiv = document.createElement("div");
historyTitleDiv.className = "flex justify-between items-center";
historyTitleDiv.innerHTML = `<p><i class="fa-regular fa-clock"></i> Call History</p>`;
historyTitleDiv.appendChild(clearHistoryBtn);
aside.appendChild(historyTitleDiv);
aside.appendChild(callHistoryContainer);

// add event listener to all call buttons
const callButtons = cardContainer.querySelectorAll("button.bg-green-600");

callButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // get card details
    const card = btn.closest(".max-w-xs");
    const serviceName = card.querySelector("h1").innerText;
    const serviceNumber = card.querySelector("h2").innerText;

    if (coins < 20) {
      alert("Sorry! Not enough coins to make a call.");
      return;
    }

    // reduce coins
    coins -= 20;
    coinEl.innerText = coins;

    // show alert
    alert(`Calling ${serviceName} - ${serviceNumber}`);

    // add to call history
    const historyItem = document.createElement("div");
    historyItem.className = "p-2 bg-gray-100 rounded-md";
    historyItem.innerHTML = `<strong>${serviceName}</strong> - ${serviceNumber}`;
    callHistoryContainer.appendChild(historyItem);
  });
});

// index.js

// Card container থেকে সব card নির্বাচন করা
const cards = document.querySelectorAll("#card-container .max-w-xs");

// Navbar heart এবং coin
const heartCount = document.getElementById("heart");
const coinCount = document.getElementById("coin");

// Call History section
const callHistory = document.querySelector("aside div");

// প্রতিটি card এর জন্য loop
cards.forEach((card) => {
  // Copy button
  const copyBtn = card.querySelector(".btn-soft:first-child"); // প্রথম button
  const numberText = card.querySelector("h2").innerText; // Hotline number

  copyBtn.addEventListener("click", () => {
    // Hotline number copy করা
    navigator.clipboard
      .writeText(numberText)
      .then(() => {
        alert(`Number ${numberText} copied to clipboard!`);

        // Heart count increase করা
        heartCount.innerText = parseInt(heartCount.innerText) + 1;

        // Coin count increase করা
        coinCount.innerText = parseInt(coinCount.innerText) + 1;
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  // Call button
  const callBtn = card.querySelector(".btn-soft:last-child"); // দ্বিতীয় button
  callBtn.addEventListener("click", () => {
    const now = new Date();
    const timeString = now.toLocaleString(); // Local time

    // Call History update
    const p = document.createElement("p");
    p.innerText = `Called ${numberText} at ${timeString}`;
    callHistory.appendChild(p);
  });
});
