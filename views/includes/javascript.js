class Cards {
  constructor(_id, card) {
    this.id = _id;
    this.card = card;
  }
}

let repeat = [];
let startBtn = document.getElementById("start");
startBtn.disabled = true;

let cards = document.querySelectorAll(".card");
cards.forEach((card, i, arr) => {
  card.addEventListener("click", () => {
    if ((startBtn.disabled = true)) {
      startBtn.disabled = false;
    }
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
startBtn.addEventListener("click", () => {
  cardList.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("bg-warning");
  });
  let i = 0;
  cardListRepeat.innerHTML = "";
  cardListRepeat.innerHTML = `<div id="card-${repeat[i].id}" class="card" style="width: 30em;" >
    <div class="card-header"></div>
    <div class="card-body align-middle">
      <p class="card-text">${repeat[i].card}</p>
    </div>
    <div class="card-footer">
    <button class="btn nextBtn">Next</button>
    </div>
  </div>`;
  let nextBtns = document.querySelectorAll(".nextBtn");
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", () => {
      i++;
      if (repeat[i] == undefined) {
        startBtn.disabled = false;
        cardList.style.display = "flex";
        repeat = [];
        document.getElementById("cardCounter").innerHTML = repeat.length;
        startBtn.disabled = true;
        cardListRepeat.innerHTML = "";
      } else if (repeat[i] != undefined) {
        nextBtn.parentNode.parentNode.querySelector(".card-body").innerText =
          repeat[i].card;
      }
    });
  });
  startBtn.disabled = true;
  cardList.style.display = "none";
});
FlexMasonry.init(".grid", {
  responsive: false,
  numCols: 3,
});
