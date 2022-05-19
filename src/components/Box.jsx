import React from "react";
import { useEffect, useState } from "react";
import Item from "./Item";

const initList = [
  { id: 1, name: "fire", src: `/images/fire.png` },
  { id: 2, name: "water", src: `/images/water.png` },
  { id: 3, name: "air", src: `/images/air.png` },
  { id: 4, name: "earth", src: `/images/earth.png` },
];

const Box = (props) => {
  const [initItem, setInitial] = useState(initList);

  useEffect(() => {
    if (props.newItem) {
      setInitial((state) => {
        if (state.some((element) => element.name === props.newItem.name)) {
          return state;
        } else return state.concat(props.newItem);
      });
    }

    console.log(initItem.length);
  }, [props.newItem]);

  return (
    <div className="box">
      {initItem.map((item) => {
        return (
          <Item
            key={item.id}
            id={item.id}
            type="inBox"
            src={item.src}
            name={item.name}
            alt={item.name}
          />
        );
      })}
    </div>
  );
};

export default Box;
