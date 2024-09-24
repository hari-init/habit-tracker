import Button from "./Button"

function Home({ loginSignUp }){
   
    return(
        <div class="h-full p-10  flex flex-col justify-center ">
        <h3 class="text-5xl font-bold text-left">Establish habits </h3>
        <h4 class="text-4xl font-bold text-left mt-2">you'll stay committed to.</h4>
        <p  class="text-left mt-2">Create an account and kickstart your habit-building journey.</p>
        <Button classProp="btn btn-primary  mt-4"  content='Login' click={() => loginSignUp('Login')}/>
        <Button classProp="btn  mt-4"    content='SignUp' click={() => loginSignUp('SignUp')}/>         
        </div>
    )
}

export default Home