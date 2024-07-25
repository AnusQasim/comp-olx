import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../Config/firebase";
// import { Header } from "../../components/header";
// import { Swati } from "../../components/header";
// import AutoSlider from "../../components/slider/slider";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);
  async function getproducts() {
    // fetch('https://dummyjson.com/products')
    // .then((res) => res.json() )
    // .then(res => setproducts(res.products))
    const res = await getAllProducts();
    console.log("res", res);
    setproducts(res);
  }

  console.log(products);

  return (
    <div>
      {/* <Header /> */}

      {/* <div>
        <AutoSlider />
      </div> */}
      <div id="card-parent">
        <div className="container-fluid mt-5 mb-6 ">
          <div className="row row-cols-1 row-cols-md-4 g-4 container-fluid cardDiv">
            {products.map((item) => {
              const { title, description, id, image, amount, brand } = item;
              return (
                <div key={id} className="col mb-4" id="card-s">
                  <div
                    className="card h-100"
                    onClick={() => navigate("detail/" + id)}
                  >
                    <img
                      src={image}
                      style={{ width: "40px", height: "150px" }}
                      className="card-img-top w-100"
                      alt={title}
                    />
                    <div className="card-body">
                      {/* <h3 className="card-text">{"Rs : "+amount}</h3> */}
                      <h3 className="card-text">{`Rs : ${amount}`}</h3>

                      <h4 className="card-title">{title}</h4>
                      <h4>{"Brand: " + brand}</h4>
                      <p className="card-text">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <AutoSlider /> */}

      {/* <Swati /> */}
    </div>
  );
}

export default Dashboard;
