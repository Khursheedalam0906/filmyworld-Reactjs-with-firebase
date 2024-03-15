import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import swal from "sweetalert";

const Addmovie = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      // console.log(image.name);
    } else {
      setImage("");
    }
  };

  const addMovies = async () => {
    if (title !== "" && year !== "" && description !== "" && image !== "") {
      setLoading(true);
      const moviesRef = await ref(
        storage,
        `moviesImage/${image.name}-${new Date().toUTCString()}`
      );
      uploadBytes(moviesRef, image).then((snapshot) => {
        getDownloadURL(moviesRef).then((downloadURL) => {
          addDoc(collection(db, "movies"), {
            title,
            year,
            description,
            image: downloadURL,
            rating: 0,
            rated: 0,
          });
          setLoading(false);
          swal({
            icon: "success",
            title: "Successfully Added!",
            button: false,
            timer: 3000,
          });
          setTitle("");
          setYear("");
          setDescription("");
          setImage("");
        });
      });
    } else {
      swal({
        title: "Please enter all fields",
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container sm:px-5 px-12 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-pink-500">
              Add New Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Title
                  </label>
                  <input
                    required={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    id="title"
                    name="title"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="year"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Year
                  </label>
                  <input
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    type="number"
                    id="year"
                    name="year"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Image
                  </label>
                  <input
                    // value={image}
                    required
                    accept="image/*"
                    onChange={handleImage}
                    type="file"
                    id="image"
                    name="image"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    name="description"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg "
                  onClick={addMovies}
                >
                  {loading ? <TailSpin height={24} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
