import React from "react";
import Alphabet from "./Alphabet";
import Box from "./Box";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";
import recipes from "../../src/assets/list/recipes";
const DragDrop = () => {
  const [itemDropped, setItemDropped] = useState([]);
  const [itemMerged, setItemMerged] = useState([]);
  const [newItem, setNewItem] = useState();
  const [items, setItems] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      console.log(item);
      const position = monitor.getClientOffset();
      console.log(position);
      addItem(item, position);
    },
  }));

  //them item
  let indexItem = 0;
  const addItem = (item, position) => {
    setItemDropped((state) => {
      //tao id moi neu da co phan tu giống đã tồn tại
      if (state.length !== 0 && item.type !== "inTable") {
        const isValid = state.some((element) => element.id === item.id);
        if (isValid) {
          indexItem++;
          return state.concat({
            ...item,
            position,
            inSpace: "inTable",
            id: item.name + "-" + indexItem,
          });
        }
      }
      console.log(state);

      //thay đổi position
      const itemMove = state.find((element) => element.id === item.id);
      if (itemMove) {
        return state.map((element) => {
          if (element.id === item.id) return { ...element, position };
          return element;
        });
      }
      return state.concat({ ...item, position, inSpace: "inTable" });
    });
  };

  //gop item
  const groupingItem = (yourRecipe, yourPosition) => {
    const recipe1 = yourRecipe[0];
    const recipe2 = yourRecipe[1];
    const position1 = yourPosition[0];
    const position2 = yourPosition[1];
    const itemResuld = recipes.find(
      (item) =>
        (item[2].name1 === recipe1 && item[2].name2 === recipe2) ||
        (item[2].name1 === recipe2 && item[2].name2 === recipe1)
    );
    if (itemResuld) {
      console.log("c");
      console.log(itemResuld);
      const itemFind = {
        id: itemResuld[0],
        name: itemResuld[1],
        src: `/images/${itemResuld[1]}.png`,
        position: position1,
      };

      //add vào danh sách
      setItemMerged((state) =>
        state.concat({
          ...itemFind,
          id: "merge" + "-" + itemFind.name + "-" + Math.random() * (1000 - 1),
        })
      );

      //xóa các phần tử
      setItemDropped((state) => {
        const firstState = state.filter(
          (element) =>
            element.position.x !== position1.x &&
            element.position.y !== position1.y
        );
        const secondState = firstState.filter(
          (element) =>
            element.position.x !== position2.x &&
            element.position.y !== position2.y
        );
        return secondState;
      });

      //thêm element vào side
      console.log("b");
      console.log(itemFind);
      setNewItem({
        name: itemFind.name,
        id: itemFind.id,
        src: itemFind.src,
        type: "inBox",
      });
    }
  };

  useEffect(() => {
    const itemDroppedLength = itemDropped.length - 1;
    for (let i = 0; i < itemDroppedLength; i++) {
      if (
        Math.abs(
          itemDropped[i].position.x - itemDropped[itemDroppedLength].position.x
        ) <= 60 &&
        Math.abs(
          itemDropped[i].position.y - itemDropped[itemDroppedLength].position.y
        ) <= 60
      ) {
        const yourRecipe = [
          itemDropped[i].name,
          itemDropped[itemDroppedLength].name,
        ];
        const yourPosition = [
          itemDropped[i].position,
          itemDropped[itemDroppedLength].position,
        ];
        groupingItem(yourRecipe, yourPosition);
        return;
      }
    }

    setItems(
      itemDropped.map((item, index) => {
        return (
          <Item
            id={item.id}
            key={index}
            name={item.name}
            src={item.src}
            type="inTable"
            style={{
              position: "absolute",
              left: item.position.x,
              top: item.position.y,
              display: "gird",
              width: "50px",
            }}
          />
        );
      })
    );
  }, [itemDropped]);

  useEffect(() => {
    if (itemMerged.length > 0) {
      console.log("a");
      console.log(itemMerged);
      const itemDone = itemMerged[itemMerged.length - 1];
      const positionDone = itemMerged[itemMerged.length - 1].position;
      addItem(itemDone, positionDone);
    }
  }, [itemMerged]);

  return (
    <div ref={drop} className="drapdrop">
      <div className="drapdrop-detail">
        <Alphabet />
        <Box newItem={newItem} />
      </div>
      {items}
    </div>
  );
};

export default DragDrop;
