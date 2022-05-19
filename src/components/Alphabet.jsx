import React from "react";

const Alphabet = () => {
  let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <ul className="alphabet">
      {alphabet.map((word, index) => (
        <li className="alphabet-item" key={index}>
          {word}
        </li>
      ))}
    </ul>
  );
};

export default Alphabet;
