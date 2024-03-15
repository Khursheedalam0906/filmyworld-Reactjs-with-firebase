import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { db } from "../firebase/firebaseConfig";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const Reviews = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);

  const user = useSelector((state) => state.user.value);

  const sendReview = async () => {
    setLoading(true);
    if (rating !== 0 && thought !== "") {
      try {
        addDoc(collection(db, "reviews"), {
          movieid: id,
          name: user.name,
          photoURL: "",
          rating,
          thought,
          timestamp: new Date().getTime(),
        });
        const docRef = doc(db, "movies", id);
        await updateDoc(docRef, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setLoading(false);
        setRating(0);
        setThought("");
        swal({
          title: "Successfully Added!",
          icon: "success",
          button: false,
          timer: 3000,
        });
      } catch (error) {
        setLoading(false);
        swal({
          title: "Please Login",
          icon: "error",
          button: false,
          timer: 3000,
        });
      }
    } else {
      setLoading(false);
      swal({
        title: "Please give rating & your thoughts",
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
  };

  useEffect(() => {
    setReviewLoading(true);
    const getData = async () => {
      let q = query(collection(db, "reviews"), where("movieid", "==", id));
      onSnapshot(q, (doc) => {
        setData(doc.docs.map((doc) => doc.data()));
        setReviewLoading(false);
      });
    };
    getData();
  }, []);

  return (
    <div className="mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        placeholder="Share your thoughts..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        className="w-full p-2 outline-none bg-slate-900"
      />
      <button
        className="bg-green-600 w-full p-2 flex justify-center mt-3"
        onClick={sendReview}
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>
      {reviewLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={12} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => (
            <div
              key={i}
              className="border-gray-600 bg-slate-900 border-b p-2 w-full mt-2"
            >
              <div className="flex items-center">
                <p className="text-blue-500">{e.name}</p>
                <p className="ml-3 text-xs ">
                  ( {new Date(e.timestamp).toLocaleString()} )
                </p>
              </div>
              <ReactStars size={15} half={true} value={e.rating} edit={false} />
              <p>{e.thought}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
