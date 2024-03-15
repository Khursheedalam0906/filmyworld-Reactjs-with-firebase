import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";

const Details = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such doc");
      }
    }
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ThreeCircles height={40} color="white" />
        </div>
      ) : (
        <div className="p-4 px-8 mt-4 w-full flex flex-col sm:flex-row justify-center">
          <img
            className="h-72 sm:h-96 sm:sticky sm:top-24"
            src={data?.image}
            alt="DetailposterImg"
          />
          <div className="sm:ml-4 w-full sm:w-1/2 ">
            <h1 className="text-3xl font-bold text-gray-400 mt-4 sm:mt-0">
              {data?.title}
              <span className="text-xl"> ({data?.year})</span>
            </h1>
            <ReactStars
              size={20}
              half={true}
              value={data?.rating / data?.rated}
              edit={false}
            />
            <p className="mt-3 text-justify">{data?.description}</p>
            <Reviews
              id={id}
              prevRating={data?.rating}
              userRated={data?.rated}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
