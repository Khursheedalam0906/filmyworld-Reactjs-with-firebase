import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  console.log("header", userData);
  return (
    <div className="sticky top-0 z-10 bg-slate-900 border-b-2 border-gray-500 h-16 flex items-center justify-between px-5">
      <Link to="/">
        <h3 className="sm:text-3xl text-xl text-red-500 font-bold">
          Filmy<span className="text-white">World</span>
        </h3>
      </Link>
      {userData ? (
        <div className="flex items-center">
          <Link to="/addmovie">
            <h3 className="sm:text-xl text-sm text-white font-bold flex items-center cursor-pointer">
              <AddIcon className="mr-1 text-purple-500" />
              Add New
            </h3>
          </Link>
          <a href="/login">
            <h4
              className="sm:text-base text-sm ml-2 bg-green-500 sm:px-2 px-1 py-1  rounded hover:bg-green-700 text-white font-semibold flex items-center cursor-pointer"
              onClick={handleSignout}
            >
              Signout
            </h4>
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <h3 className="text-md sm:text-xl bg-green-500 px-3 py-1 rounded hover:bg-green-700 text-white font-semibold flex items-center cursor-pointer">
              Login
            </h3>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
