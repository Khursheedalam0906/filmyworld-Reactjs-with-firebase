import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import swal from "sweetalert";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const UserLogin = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        swal({
          title: "Logged in Successfully",
          icon: "success",
          button: false,
          timer: 3000,
        });
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: error.message,
          icon: "error",
          button: false,
          timer: 3000,
        });
      });
  };

  return (
    <div>
      <div>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-4">
              <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-pink-500">
                Login
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
                    onClick={UserLogin}
                  >
                    {loading ? <TailSpin height={24} color="white" /> : "Login"}
                  </button>
                </div>
                <div>
                  <p>
                    Do not have account?{" "}
                    <Link to="/signup">
                      <span className="text-blue-500">Sign up</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
