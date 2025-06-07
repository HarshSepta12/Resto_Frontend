import React, { useState } from "react";

const Menu = () => {
const [item,setItems] = useState([]);

const data = [{
  id: 1,
  category: "Main Course",
  Title: "Panir"
}]

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h1>Our Menu</h1>
            <div className="d-flex justify-content-center alignitems-center gap-4 ">
              <h4>Fast Food</h4>
              <h4>Thali</h4>
              <h4>Starter</h4>
              <h4>Main Course</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
