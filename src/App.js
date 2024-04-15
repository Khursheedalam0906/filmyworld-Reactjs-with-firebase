import { Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Addmovie from "./components/Addmovie";
import Details from "./components/Details";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, db } from "./firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { login } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Nopage from "./components/Nopage";
import Footer from "./components/Footer";

function App() {
  const userData = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const getData = async () => {
          const q = query(collection(db, "users"), where("uid", "==", uid));
          console.log(q);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            dispatch(
              login({
                name: doc.data().name,
                email: doc.data().email,
                uid: doc.data().uid,
              })
            );
          });
        };
        getData();
      } else {
        console.log("user not come");
      }
    });
  }, []);

  return (
    <div className="App relative">
      <Header />
      {userData ? (
        <>
          <Routes>
            <Route exact path="/" element={<Cards />} />
            <Route exact path="/addmovie" element={<Addmovie />} />
            <Route exact path="/details/:id" element={<Details />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<Nopage />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Cards />} />
            <Route exact path="/details/:id" element={<Details />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="*" element={<Nopage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
