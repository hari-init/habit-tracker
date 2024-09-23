
import TextBoxEmail from "../TextBoxEmail"
import TextBoxPassword from "../TextBoxPassword"
import Button from "../Button"

function LoginSignUp(props){
    return(
      <form className="card-body">
        <div className="form-control">
        <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body items-center ">
         <h2 className="card-title mb-4">{props.heading}</h2>
        <TextBoxEmail/>
        <TextBoxPassword/>
      {/* Confirm Password*/}
       {props.heading ==="SignUp"&& <TextBoxPassword/> }
          <div className="form-control card-actions justify-center">
          <Button classProp="btn btn-primary mt-4"  content={props.heading}  />
          </div>
         
          </div>
      </div>
      </div></form>
    )
}

export default LoginSignUp