import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);

  // Creating references for title and boxes using useRef
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return; // Prevents further moves if game is locked or box is filled
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt='x'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt='o'>`;
      data[num] = "o";
    }
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} alt="x">`;
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} alt="o">`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "TicTacToe Game in <span>React</span>";
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
    setCount(0);
  };

  return (
    <div className="container">
      <h1 ref={titleRef} className="title">
        TicTacToe Game in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button onClick={reset} className="reset">
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
