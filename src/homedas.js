import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { firestoreDb } from "./config";

const Homedas = () => {
  const [discussionData, setDiscussionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const imagesRef = collection(firestoreDb, "images");
      const oderedQuery = query(imagesRef, orderBy("createAt"));

      console.log(oderedQuery, "ini data temeh");

      try {
        const querySnapshot = await getDocs(imagesRef);
        const discussionData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Data dari Firestore:", data);

          discussionData.push({
            title: data.title,
            description: data.description,
            imgUrl: data.imgUrl,
            createAt: data.createAt,
          });
        });
        setDiscussionData(discussionData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching discussions: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center">Discussion Data</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table id="customers">
          <thead>
            <tr>
              <th>Img</th>
              <th>Judul</th>
              <th>Diskripsi</th>
            </tr>
          </thead>
          <tbody>
            {discussionData.map((discussion, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={discussion.imgUrl}
                    alt={discussion.title}
                    height="100px"
                    width="100px"
                  />
                </td>
          
                <td>{discussion.title}</td>
                <td>{discussion.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Homedas;
