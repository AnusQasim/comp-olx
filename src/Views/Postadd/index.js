// import React, { useState } from "react";
// import { postAd } from "../../Config/firebase";
// import { useNavigate } from "react-router-dom";
// import "./Post.css";

// function PostAdd() {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState();
//   const [desc, setdesc] = useState();
//   const [price, setPrice] = useState();
//   const [file, setFile] = useState(null);

//   const addData = () => {
//     postAd(title, desc, price, file[0]);
//     setTitle("");
//     setdesc("");
//     setPrice("");
//     setFile(null);
//     navigate("/");
//   };
//   const isDisabled = !title || !desc || !price || !file;
//   return (
//     <div className="main">
//       <h3>PostAdd</h3>
//       <div className="add">
//         <input
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Write your Title here"
//           value={title}
//         />
//         <input
//           onChange={(e) => setdesc(e.target.value)}
//           placeholder="Write your Description here"
//           value={desc}
//         />
//         <input
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Write your price here"
//           type="number"
//           value={price}
//         />
//         <input onChange={(e) => setFile(e.target.files)} type="file" />
//       </div>
//       <button className="bttn" onClick={addData} disabled={isDisabled}>
//         Submit
//       </button>
//     </div>
//   );
// }

// export default PostAdd;

import React, { useState } from "react";
import { postAd } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";
import "./Post.css";

function PostAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const addData = async () => {
    try {
      await postAd(title, description, price, file[0]);
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      navigate("/"); // Navigate to the dashboard route
    } catch (error) {
      console.error("Error posting ad:", error);
    }
  };

  const isDisabled = !title || !description || !price || !file;

  return (
    <div className="main">
      <h3>PostAdd</h3>
      <div className="add">
        {/* Input fields... */}
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your Title here"
          value={title}
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your Description here"
          value={description}
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Write your price here"
          type="number"
          value={price}
        />
        <input onChange={(e) => setFile(e.target.files)} type="file" />
      </div>
      <button className="bttn" onClick={addData} disabled={isDisabled}>
        Submit
      </button>
    </div>
  );
}

export default PostAdd;
