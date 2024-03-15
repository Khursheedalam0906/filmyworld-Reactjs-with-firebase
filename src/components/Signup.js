import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import swal from "sweetalert";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(db, "users"), {
          name,
          email,
          uid: user.uid,
        });
        swal({
          text: "Successfully Register",
          icon: "success",
          button: false,
          timer: 3000,
        });
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-pink-500">
              Sign up
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap justify-center -m-2">
              <div className="p-2 w-80 sm:w-96 ">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-80 sm:w-96 ">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-80 sm:w-96">
                <div className="relative">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-white  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg "
                  onClick={handleSignup}
                >
                  {loading ? <TailSpin height={24} color="white" /> : "Signup"}
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-500">Login</span>
                  </Link>
                </p>
              </div>
              <div id="recaptcha-container"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
