import "./App.css";
import { Icon } from "@iconify/react";
import Button from "./components/Button";
import LoginSignUp from "./components/LoginSignUP/LoginSignUp";
import { useState } from "react";

function App() {
  const[ loginSignUpValue,setLoginSignUpValue]=useState("Login")
  function loginSignUp(value){
    setLoginSignUpValue(value)
  }
  return (
    <>
      <div class="flex items-center justify-center mt-5 ">
        <div class="card card-side bg-base-100 shadow-xl w-96">
          <Icon icon="meteocons:pollen-flower-fill" width={100} />
          <div class="card-body items-center">
            <h2 class="card-title">Habit Tracker</h2>
          </div>
        </div>
      </div>

      <div class="container mx-auto  mt-8 ">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="col-span-1">
          <div class="h-full p-10  flex flex-col justify-center ">
            <h3 class="text-xl font-bold">Establish habits </h3>
            <h4>you'll stay committed to.</h4>
            <Button classProp="btn btn-primary  mt-4"  content='Login' click={() => loginSignUp('Login')}/>
            <Button classProp="btn  mt-4"    content='SignUp' click={() => loginSignUp('SignUp')}/>         
            </div>
          </div>
          <div class="col-span-1  p-8 text-right">
            <LoginSignUp  heading={loginSignUpValue}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
