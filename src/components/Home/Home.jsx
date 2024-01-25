import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

function Home(props) {
  return (
    <>
      <div>
        {props.name ? (
          <>
            <p>Welcome - {props.name}</p>
            <Logout />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <br />
            <Link to="/signup">Signup</Link>
            <p>Login Please</p>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
