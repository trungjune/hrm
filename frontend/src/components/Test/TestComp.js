import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "../../redux/rtk/features/cart/cartSlice";

export default function TestComp() {
    const numOfCakes = useSelector((state) => state.account.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: "10rem", marginLeft: "10rem", fontSize: "2rem" }}>
      Hi there
      <h2>Number of cakes - {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>Order cake</button>
      <button onClick={() => dispatch(restocked(5))} >Restock cakes</button>
    </div>
  );
}
