import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#071952" : "#088395",
    color: "white",
    width: "100%",  
    textAlign: "center",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", data);

      if (response.status === 200) {

        localStorage.setItem("token", response.data);
        console.log(response.data);

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;

        const response2 = await axios.get(`http://localhost:8080/users/${username}`);
        console.log(response2.data);

        localStorage.setItem('user', response2.data.fullName);
        localStorage.setItem('userId', response2.data.id);

        navigate("/");
      }
    } catch (error) {

      console.log("Login error:", error);
      alert('Username or Password Incorrect');
    }
  };


  return (
    <div className="container mt-5" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div className="card p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <div className="text-center mb-4">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              onChange={handleUsername}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={handlePassword}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Do not have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
