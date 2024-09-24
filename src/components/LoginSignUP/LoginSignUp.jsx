import TextBoxEmail from '../TextBoxEmail';
import TextBoxPassword from '../TextBoxPassword';
import Button from '../Button';

const LoginSignUp = (props) => {
  return (
    <form className='card-body'>
      <div className='form-control'>
        <div className='card bg-base-100 w-full md:w-96 shadow-xl mx-auto'>
          <div className='card-body items-center text-center'>
            <h2 className='card-title mb-4 text-lg md:text-xl'>
              {props.heading}
            </h2>

            {/* Email Input */}
            <TextBoxEmail />

            {/* Password Input */}
            <TextBoxPassword />

            {/* Confirm Password only for SignUp */}
            {props.heading === 'SignUp' && <TextBoxPassword />}

            {/* Button Action */}
            <div className='form-control card-actions justify-center mt-4'>
              <Button classProp='btn-primary' content={props.heading} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginSignUp;
