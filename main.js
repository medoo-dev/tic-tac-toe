let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let p = document.querySelector("main p");
const element = document.body;
const pseudoStyle = window.getComputedStyle(element, "::before");

let turn = "X";

boxes.forEach((box) => {
  function game() {
    box.onclick = function () {
      if (turn === "X" && box.innerHTML == "") {
        box.innerHTML = "X";
        turn = "O";
      } else if (turn === "O" && box.innerHTML == "") {
        box.innerHTML = "O";
        turn = "X";
      }
      win();
      p.innerHTML = turn;
    };
  }
  p.innerHTML = turn;
  game();
});

resetBtn.onclick = function () {
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
};

newGameBtn.onclick = function () {
  boxes.forEach((box) => (box.innerHTML = ""));
  turn = "X";
  msgContainer.style = `transform: translate(-50%, -50%) scale(0);
    transition: .2s;
    `;
  document.body.classList.remove("active");
  p.innerHTML = turn;
};

function win() {
  const winPatterns = [
    [0, 1, 2], // الصف الأول
    [3, 4, 5], // الصف الثاني
    [6, 7, 8], // الصف الثالث
    [0, 3, 6], // العمود الأول
    [1, 4, 7], // العمود الثاني
    [2, 5, 8], // العمود الثالث
    [0, 4, 8], // القطر الرئيسي
    [2, 4, 6], // القطر العكسي
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[b].innerHTML === boxes[c].innerHTML &&
      boxes[a].innerHTML != ""
    ) {
      if (turn == "X") {
        turn = "O";
      } else {
        turn = "X";
      }
      msgContainer.style = `
        transform: translate(-50%, -50%) scale(1);
        transition: .2s;
      `;
      document.body.classList.add("active");
      break;
    }

    for (let box of boxes) {
      if (
        box.innerHTML != "" &&
        boxes[a].innerHTML != boxes[b].innerHTML &&
        boxes[b].innerHTML != boxes[c].innerHTML
      ) {
        console.log("Yes");
      }
    }
  }
  msg.children[0].innerHTML = turn;
}
