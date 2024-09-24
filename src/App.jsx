import "./App.css";
import { Icon } from "@iconify/react";
import LoginSignUp from "./components/LoginSignUP/LoginSignUp";
import Home from "./components/Home";
import Header from './components/header';
import Sidebar from './components/Sidebar';
import Counter from './components/Counter/Counter';
import Footer from './components/footer';
import { useState } from "react";


function App() {
  
  
  const [loginSignUpValue, setLoginSignUpValue] = useState("Login");
  function loginSignUp(value) {
    setLoginSignUpValue(value);
  }
  return (
    <>
    <Header/>
    <div class="flex items-center justify-center mt-5">
        <div class="card card-side bg-base-100 shadow-xl w-full md:w-96">
          <Icon icon="meteocons:pollen-flower-fill" width={100} />
          <div class="card-body items-center">
            <h2 class="card-title">Habit Tracker</h2>
          </div>
        </div>
      </div>
      
      <div class="container mx-auto mt-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div class="col-span-1">
            <Home loginSignUp={loginSignUp} />
          </div>
          <div class="col-span-1 p-8 text-center lg:text-right">
            <LoginSignUp heading={loginSignUpValue} />
          </div>
        </div>
      </div>

      

      
     <Footer/>
    </>
  );
}

export default App;
