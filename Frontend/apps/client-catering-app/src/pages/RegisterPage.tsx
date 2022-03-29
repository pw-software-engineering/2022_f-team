import { FormInputComponent } from 'common-components'
import {Link} from "react-router-dom";
import "../style/RegisterFormStyle.css";

const RegisterPage = () => {
    return (
      <div>
        <form>
            <h1>Register</h1>
            <div className="button-div">
        <button>Register</button>
        <p className="role">
          Do you already have an account? 
          <Link to="/login" style={{color:"#539091"}}>Log in!</Link>
        </p>
        </div>
         </form>   
      </div>
    );
  };
  
  export default RegisterPage;