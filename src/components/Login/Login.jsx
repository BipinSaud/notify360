import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg(" Please do fill all fields. ");
      return;
    }
    setErrorMsg("");
    console.log(values);

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/Profile");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="container">
      <div className="innerBox">
        <h1 className="heading">Login</h1>
        <InputControl
          label="Email"
          placeholder="Enter Your Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter Your Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="footer">
          <b className="error">{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Are you new here?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
