const navbarHeart = document.getElementById("heart");
const coinEl = document.getElementById("coin");
let coins = parseInt(coinEl.innerText);

const cardContainer = document.getElementById("card-container");

const aside = document.querySelector("aside");
const callHistoryContainer = document.createElement("div");
callHistoryContainer.id = "call-history-list";
callHistoryContainer.className = "mt-4 space-y-2";

const clearHistoryBtn = document.createElement("button");
clearHistoryBtn.innerText = "Clear History";
clearHistoryBtn.className =
  "btn btn-soft rounded-2xl py-2 bg-red-600 text-white hover:bg-red-700 ml-2";
clearHistoryBtn.addEventListener("click", () => {
  callHistoryContainer.innerHTML = "";
});

const historyTitleDiv = document.createElement("div");
historyTitleDiv.className = "flex justify-between items-center";
historyTitleDiv.innerHTML = `<p><i class="fa-regular fa-clock"></i> Call History</p>`;
historyTitleDiv.appendChild(clearHistoryBtn);

aside.appendChild(historyTitleDiv);
aside.appendChild(callHistoryContainer);

cardContainer.addEventListener("click", (e) => {
  const target = e.target;
  const card = target.closest(".max-w-xs");

  if (!card) return;

  // Heart icon click
  if (target.classList.contains("fa-heart")) {
    navbarHeart.innerText = parseInt(navbarHeart.innerText) + 1;
  }

  // Copy button click
  if (
    target.classList.contains("btn-soft") &&
    card.querySelector(".btn-soft:first-child") === target
  ) {
    const numberText = card.querySelector("h2").innerText;
    navigator.clipboard
      .writeText(numberText)
      .then(() => {
        alert(`Number ${numberText} copied to clipboard!`);
        navbarHeart.innerText = parseInt(navbarHeart.innerText) + 1;
        coinEl.innerText = parseInt(coinEl.innerText) + 1;
      })
      .catch((err) => console.error("Failed to copy: ", err));
  }

  // Call button click
  if (
    target.classList.contains("btn-soft") &&
    card.querySelector(".btn-soft:last-child") === target
  ) {
    const serviceName = card.querySelector("h1").innerText;
    const serviceNumber = card.querySelector("h2").innerText;

    if (coins < 20) {
      alert("Sorry! Not enough coins to make a call.");
      return;
    }

    coins -= 20;
    coinEl.innerText = coins;

    alert(`Calling ${serviceName} - ${serviceNumber}`);

    const now = new Date();
    const timeString = now.toLocaleString();

    const historyItem = document.createElement("div");
    historyItem.className = "p-2 bg-gray-100 rounded-md";
    historyItem.innerHTML = `<strong>${serviceName}</strong> - ${serviceNumber} at ${timeString}`;
    callHistoryContainer.appendChild(historyItem);
  }
});
