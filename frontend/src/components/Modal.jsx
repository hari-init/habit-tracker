import TextBox from "./textBox/TextBox";
import Button from "./Button";
const Modal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile</h3>
         
         <TextBox Name="Name"/>
         <TextBox Name="Location"/>
         <TextBox Name="Age"/>
         <TextBox Name="Gender"/>
         
          <div className="modal-action">
            <Button classProp="btn" click={onClose} content="Close"/>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  