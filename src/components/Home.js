// src/components/Home.js
import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { persistor } from "../redux/store";
import "./comp.css"
import { Header } from "./Header";
import { LeftsideBar } from "./LeftsideBar";
import { Notes } from "./Notes";


const Home = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user,"user")

  const [newNote, setnewNote] = useState(false)

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    persistor.purge();   
    navigate("/");
  };


  if (!user) return <Navigate to="/" />;

  return (
    <div className="dashboard">
        <div className="dashboardRow">
            <LeftsideBar setnewNote={setnewNote} newNote={newNote} handleLogout={handleLogout}/>
            <div className="dashboard_content">
                
                <Notes  setnewNote={setnewNote} newNote={newNote}  />
            </div>
        </div>
       
    </div>
  );
};

export default Home;
