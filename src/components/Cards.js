import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      onSnapshot(collection(db, "movies"), (doc) => {
        setData(doc.docs.map((doc) => ({ data: doc.data(), id: doc.id })));
        setLoading(false);
      });
    };
    getData();
  }, []);

  console.log(data);

  return (
    <div className="flex flex-wrap p-3 mt-2 justify-center ">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        <>
          {data.map((item) => (
            <Link to={`/details/${item?.id}`}>
              <div
                key={item?.id}
                className=" font-medium shadow-lg p-2 m-2 transition-all duration-500  hover:-translate-y-2 bg-slate-950 cursor-pointer md:mt-4 mt-1"
              >
                <img
                  className="h-48 w-[9.5rem]  sm:h-64 md:w-44"
                  src={item?.data?.image}
                  alt="cartImg"
                />
                <h1 className="text-xs sm:text:sm md:text-base pt-1">
                  <span className="text-gray-500 ">Name: </span>
                  {item?.data?.title.length > 15 ? (
                    <>{item?.data?.title.substring(0, 15) + "..."} </>
                  ) : (
                    <>{item?.data?.title}</>
                  )}
                </h1>
                <h1 className="flex items-center text-xs sm:text:sm md:text-base">
                  <span className="text-gray-500 pr-1">Rating:</span>
                  <ReactStars
                    count={5}
                    value={item?.data?.rating / item?.data?.rated}
                    size={15}
                    color2={"#ffd700"}
                    half={true}
                    edit={false}
                  />
                </h1>
                <h1 className="text-xs sm:text:sm md:text-base">
                  <span className="text-gray-500 text-xs sm:text:sm md:text-base">
                    Year:{" "}
                  </span>
                  {item?.data?.year}
                </h1>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Cards;
