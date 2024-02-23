import { useEffect, useState } from "react";
import { imageDb, firestoreDb } from "./config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Tambahkan serverTimestamp dari firebase/firestore
import { v4 } from "uuid";
import Hondas from "./homedas";
import swal from "sweetalert";

import "./App.css";

function App() {
  const [img, setImg] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClik = async () => {
    if (img) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, img);

      const downloadUrl = await getDownloadURL(imgRef);

      // Add the data to Firestore with createdAt
      const docRef = await addDoc(collection(firestoreDb, "images"), {
        title,
        description,
        imgUrl: downloadUrl,
        createdAt: serverTimestamp(), // Gunakan serverTimestamp untuk mendapatkan waktu server Firestore
      });

      // Update the state with the new image URL
      setImgUrls((prevUrls) => [
        ...prevUrls,
        { title, description, imgUrl: downloadUrl },
      ]);

      // Clear the input fields after upload
      setImg("");
      setTitle("");
      setDescription("");
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const imgs = await listAll(ref(imageDb, "files"));
        const urls = await Promise.all(
          imgs.items.map((val) => getDownloadURL(val))
        );
        setImgUrls(urls);
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    };

    fetchImageUrls();
  }, [img]);

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
  };

  return (
    <div className="">
      <div className="conten-input">
        <div className="label-control">
          <label htmlFor="">Judul</label>
          <input
            className="input-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="label-control">
          <label htmlFor="">Diskripsi</label>
          <textarea
            className="input-control"
            rows="4"
            cols="30"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="label-control">
          <label for="myfile">Select a file:</label>
          <input
            type="file"
            className="myfile"
            onChange={(e) => setImg(e.target.files[0])}
            name="myfile"
          />
        </div>
        <button onClick={handleClik} style={buttonStyle}>Upload</button>
      </div>
      <Hondas />
      {/* <GetFotoes/> */}
    </div>
  );
}

export default App;
