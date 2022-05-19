import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
const Item = (props) => {
  const [, drag] = useDrag(() => ({
    type: "ITEM",
    item: {
      id: props.id,
      src: props.src,
      name: props.name,
      type: props.type,
    },
  }));

  return (
    <div className="item" style={props?.style}>
      <img ref={drag} src={props.src} alt={props.alt} />
      <div className="item-name">{props.name}</div>
    </div>
  );
};

Item.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default Item;
