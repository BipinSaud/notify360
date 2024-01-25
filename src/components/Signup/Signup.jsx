import "./Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../InputControl/InputControl";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg(" Please do fill all fields. ");
      return;
    }
    setErrorMsg("");
    console.log(values);

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
        console.log(user);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="container">
      <div className="innerBox">
        <h1 className="heading">Signup</h1>
        <InputControl
          label="UserName"
          placeholder="Enter Your UserName"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
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
          <button
            type="submit"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
          >
            Signup
          </button>
          <p>
            Already have an account?{""}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
