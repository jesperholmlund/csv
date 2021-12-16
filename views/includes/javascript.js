class Cards {
  constructor(_id, card) {
    this.id = _id;
    this.card = card;
  }
}

const repeat = [];

let cards = document.querySelectorAll(".card");
cards.forEach((card, i, arr) => {
  card.addEventListener("click", () => {
    card.classList.toggle("bg-warning");
    let cardTxt = card.querySelector(".card-body").innerText;
    if (repeat.find((repeatCard) => repeatCard.id == i) == undefined) {
      repeat.push(new Cards(i, cardTxt));
    } else if (repeat.find((repeatCard) => repeatCard.id == i) != undefined) {
      let removeCardNmb = repeat.findIndex((removeCard) => removeCard.id == i);
      repeat.splice(removeCardNmb, 1);
    }
    document.getElementById("cardCounter").innerHTML = repeat.length;
  });
});

const cardListRepeat = document.getElementById("cardListRepeat");
const cardList = document.getElementById("cardList");
let startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  cardListRepeat.innerHTML = "";
  repeat.forEach((repeat) => {
    cardListRepeat.innerHTML += `<div class="card" style="width: 30em; height: 20em;" >
    <div class="card-header"></div>
    <div class="card-body align-middle">
      <p class="card-text">${repeat.card}</p>
    </div>
    <div class="card-footer">
    </div>
  </div>`;
  });
  startBtn.disabled = true;
  cardList.style.display = "none";
});
